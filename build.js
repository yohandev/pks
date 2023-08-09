const esbuild = require("esbuild");
const express = require("express");
const proxy = require("express-http-proxy");
const glob = require("tiny-glob");
const proc = require("node:child_process");

const opt = {
    serve: process.argv.includes("--serve"),
};

(async function() {
    const ui = await esbuild.context({
        // Bundle
        entryPoints: ["src/app.js"],
        outfile: "www/app.js",
        bundle: true,
        minify: true,
        sourcemap: true,
        external: ["assets/*"],

        // Preact
        jsxFactory: "h",
        jsxFragment: "Fragment",
        jsxImportSource: "preact",
        jsx: "automatic",
        loader: {
            ".js": "jsx",
        },

        // Defines
        define: {
            HOT_RELOAD: opt["serve"].toString(),
        },
    });
    const api = await esbuild.context({
        // Bundle
        entryPoints: await glob("src/api/**/*.js"),
        outdir: "www/api",
        bundle: true,
        minify: true,
        platform: "node",
        target: ["node10.19.0"],
        
        // Exectutable
        banner: {
            "js": "#!/usr/bin/env node"
        },
        outExtension: {
            ".js": ".cgi"
        },

        // Defines
        define: {
            ATHENA_BUILD: (!opt["serve"]).toString(),
        },
    });

    // Build once
    if (!opt["serve"]) {
        await Promise.all([ui.rebuild(), api.rebuild()]);
        await Promise.all([ui.dispose(), api.dispose()]);
        return;
    }
    // Serve
    await Promise.all([ui.watch(), api.watch()]);
    const { host, port } = await ui.serve({
        servedir: "www",
    });
    express()
        .use("/api/*", (req, res) => {
            proc.execFile("./www" + req.baseUrl, (_, stdout, stderr) => {
                console.error(stderr);
                res.socket.end(stdout);
            });
        })
        .use("/brothers", express.static("www/"))
        .use("/gallery", express.static("www/"))
        .use("/summer-housing", express.static("www/"))
        .use("/contact", express.static("www/"))
        .use("/rho", express.static("www/"))
        .use("/settings", express.static("www/"))
        .use("*", proxy(`${host}:${port}`, {
            proxyReqPathResolver: (req) => req.baseUrl
        }))
        .listen(8000);

    console.log("[🔥] Development server listening at http://localhost:8000");
})();