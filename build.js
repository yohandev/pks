const esbuild = require("esbuild");
const http = require("node:http");
const proc = require("node:child_process");

const prod = !process.argv.includes("--watch");
const opt = {
    // Bundle
    entryPoints: ["src/app.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "www/app.js",
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
    define: { PROD: prod.toString() },
};

(async () => {
    if (prod) {
        return await esbuild.build(opt);
    }
    const ctx = await esbuild.context(opt);
    await ctx.watch();
    const { host, port } = await ctx.serve({
        servedir: "www",
    });
    const proxy = http.createServer((req, res) => {
        // Intercept API calls
        // It's an easy hack to emulate what Scripts does on Athena
        if (req.url.startsWith("/api/")) {
            proc.execFile("./www" + req.url, (_, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr);
                }
                res.socket.end(stdout);
            });
            return;
        }

        // Pipe the request to esbuild
        req.pipe(http.request({
            hostname: host,
            port: port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        }, (res2) => {
            res.writeHead(res2.statusCode, res2.headers);
            res2.pipe(res, { end: true });
        }));
    });
    proxy.listen(3000);

    console.log(`Serving: http://${host}:3000`);
})();