#!/usr/bin/env node

import { readFile } from "node:fs/promises"
import { execSync } from "node:child_process"

try {
    const { name, version } = JSON.parse(
        await readFile("./packages/guilds.js/package.json", "utf8")
    )

    const versions = JSON.parse(
        execSync(`pnpm view ${name} versions --json`, {
            encoding: "utf8",
        }) ?? "[]"
    )

    const devVersions = versions
        .map((version) => {
            const match = version.match(/^\d+\.\d+\.\d+-dev\.(\d{12})$/)

            if (!match) {
                return null
            }

            return {
                version,
                ts: Number(match[1]),
            }
        })
        .filter(Boolean)
        .sort((a, b) => a.ts - b.ts)

    if (devVersions.length < 1) {
        console.log("No dev version to deprecate.")
        process.exit(0)
    }

    const previous = devVersions.at(-1)?.version

    if (!previous || previous === version) {
        console.log("No dev version to deprecate.")
        process.exit(0)
    }

    let deprecatedMsg = ""

    try {
        deprecatedMsg = execSync(`pnpm view ${name}@${previous} deprecated`, {
            encoding: "utf8",
        }).trim()
    } catch {}

    if (deprecatedMsg) {
        console.log(`${name}@${previous} is already deprecated.`)
        process.exit(0)
    }

    console.log(`Deprecating ${name}@${previous}...`)
    execSync(`pnpm deprecate "${name}@${previous}" "outdated dev build"`, {
        stdio: "inherit",
        env: { ...process.env },
    })
} catch (error) {
    console.error(`Deprecation failed: ${error.message ?? error}`)
    process.exit(1)
}
