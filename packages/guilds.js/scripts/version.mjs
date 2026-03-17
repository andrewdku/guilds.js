import fs from "node:fs"
import path from "node:path"
import url from "node:url"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const { version } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "..", "package.json"))
)

fs.appendFileSync(
    path.resolve(__dirname, "..", "dist", "index.cjs"),
    `\nexports.version = "${version}";\n`
)

fs.appendFileSync(
    path.resolve(__dirname, "..", "dist", "index.d.cts"),
    `\nexport declare const version = "${version}";\n`
)

console.log(`Version: ${version}`)
