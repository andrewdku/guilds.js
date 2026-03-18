#!/usr/bin/env node

import { appendFile, readFile } from "node:fs/promises"
import path from "node:path"
import url from "node:url"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const { version } = JSON.parse(
    await readFile(
        path.resolve(__dirname, "..", "packages", "guilds.js", "package.json"),
        "utf8"
    )
)

await appendFile(
    path.resolve(__dirname, "..", "packages", "guilds.js", "dist", "index.cjs"),
    `\nexports.version = "${version}";\n`
)

await appendFile(
    path.resolve(__dirname, "..", "packages", "guilds.js", "dist", "index.d.cts"),
    `\nexport declare const version = "${version}";\n`
)

console.log(`Version string: ${version}`)
