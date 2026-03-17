#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"
import url from "node:url"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const { version } = JSON.parse(
    await fs.readFile(
        path.resolve(__dirname, "..", "packages", "guilds.js", "package.json"),
        "utf8"
    )
)

await fs.appendFile(
    path.resolve(__dirname, "..", "packages", "guilds.js", "dist", "index.cjs"),
    `\nexports.version = "${version}";\n`
)

await fs.appendFile(
    path.resolve(__dirname, "..", "packages", "guilds.js", "dist", "index.d.cts"),
    `\nexport declare const version = "${version}";\n`
)

console.log(`Version: ${version}`)
