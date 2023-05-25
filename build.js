const esbuild = require("esbuild");
const prod = !process.argv.includes("--watch");
const opt = {
    // Bundle
    entryPoints: ["src/app.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "www/app.js",

    // Preact
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxImportSource: "preact",
    jsx: "automatic",
    loader: {
        ".js": "jsx"
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
        servedir: "www"
    });

    console.log(`Serving: http://${host}:${port}`);
})();