// @ts-check
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import starlight from "@astrojs/starlight";

export default defineConfig({
    integrations: [
        starlight({
            title: "guilds.js",
            plugins: [
                starlightTypeDoc({
                    entryPoints: ["../packages/guilds.js/src/index.ts"],
                    tsconfig: "../packages/guilds.js/tsconfig.json",
                    output: "api",
                }),
            ],
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/andrewdku/guilds.js",
                },
            ],
            sidebar: [
                { label: "Guide", autogenerate: { directory: "guide" } },
                typeDocSidebarGroup,
            ],
        }),
    ],
});
