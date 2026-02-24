import { defineConfig } from "tsdown";

export default defineConfig({
    cjsDefault: true,
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    minify: false,
    removeNodeProtocol: false,
    shims: true,
    skipNodeModulesBundle: true,
    target: false,
});
