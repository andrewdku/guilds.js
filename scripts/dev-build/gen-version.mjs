#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises"

try {
    const packageJsonPath = "./packages/guilds.js/package.json"
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"))

    const now = new Date()
    const year = now.getUTCFullYear()
    const month = String(now.getUTCMonth() + 1).padStart(2, "0")
    const day = String(now.getUTCDate()).padStart(2, "0")
    const hours = String(now.getUTCHours()).padStart(2, "0")
    const minutes = String(now.getUTCMinutes()).padStart(2, "0")
    const versionString = `${packageJson.version}-dev.${year}${month}${day}${hours}${minutes}`

    packageJson.version = versionString
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

    console.log(`Dev version string: ${versionString}`)
} catch (error) {
    console.error(`Error generating dev version: ${error}`)
    process.exit(1)
}
