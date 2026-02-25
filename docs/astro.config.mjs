// @ts-check
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import starlight from "@astrojs/starlight";
import rapideTheme from "starlight-theme-rapide";

export default defineConfig({
    site: "https://andrewdku.github.io/guilds.js/",
    base: "/guilds.js/",
    integrations: [
        starlight({
            title: "guilds.js",
            favicon: "./src/assets/logo-round.png",
            plugins: [
                starlightTypeDoc({
                    entryPoints: ["../packages/guilds.js/src/index.ts"],
                    tsconfig: "../packages/guilds.js/tsconfig.json",
                    output: "api",
                }),
                rapideTheme(),
            ],
            expressiveCode: { themes: ["vitesse-dark"] },
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/andrewdku/guilds.js",
                },
            ],
            sidebar: [
                typeDocSidebarGroup,
                { label: "Guide", autogenerate: { directory: "guide" } },
            ],
        }),
    ],
});
