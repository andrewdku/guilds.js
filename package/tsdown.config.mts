import { defineConfig } from "tsdown"

export default defineConfig({
    cjsDefault: true,
    clean: true,
    dts: true,
    entry: ["src/**/*.ts"],
    format: "cjs",
    minify: false,
    name: "guilds.js",
    platform: "node",
    removeNodeProtocol: false,
    shims: true,
    skipNodeModulesBundle: true,
    target: "node20",
})
