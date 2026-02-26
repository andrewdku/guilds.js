// @ts-check
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import starlight from "@astrojs/starlight";
import rapideTheme from "starlight-theme-rapide";

export default defineConfig({
    site: "https://guilds.js.org",
    integrations: [
        starlight({
            title: "guilds.js",
            favicon: "public/favicon.ico",
            plugins: [
                starlightTypeDoc({
                    entryPoints: ["../package/src/index.ts"],
                    tsconfig: "../package/tsconfig.json",
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
