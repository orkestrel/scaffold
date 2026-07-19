#!/usr/bin/env node
// ============================================================================
// scripts/build-host.mjs — stage the byte-copied host artifacts (HOST_PATHS)
// into dist/host/ and write dist/host/manifest.json
// ----------------------------------------------------------------------------
// Runs AFTER the src builds (dist/src/core/index.js must already exist — it
// is the source of truth for HOST_PATHS, so this script never hardcodes the
// list). Each HOST_PATHS entry (file or directory) is walked to per-file
// artifacts, staged into dist/host/<storage> with bytes preserved, and
// recorded in manifest.json under the dotfile-mapping rule:
//   - a leading-dot TOP-LEVEL FILE      -> dotfiles/<name-without-dot>
//   - a leading-dot DIRECTORY segment   -> that segment loses its dot
//   - an undotted path                  -> unchanged
// ============================================================================

import {
	existsSync,
	mkdirSync,
	readdirSync,
	rmSync,
	statSync,
	copyFileSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDir, '..')
const coreEntry = join(repoRoot, 'dist/src/core/index.js')
const hostDir = join(repoRoot, 'dist/host')
const manifestPath = join(hostDir, 'manifest.json')

if (!existsSync(coreEntry)) {
	process.stderr.write(
		`build-host: missing ${coreEntry} — run the src build first (npm run build:src)\n`,
	)
	process.exit(1)
}

const { HOST_PATHS } = await import(coreEntry)

/** Map a repo-relative path to its staging path under dist/host, per the dotfile-mapping rule. */
function pathToStorage(path) {
	const segments = path.split('/')
	if (segments.length === 1) {
		const name = segments[0]
		return name.startsWith('.') ? `dotfiles/${name.slice(1)}` : name
	}
	return segments.map((segment) => (segment.startsWith('.') ? segment.slice(1) : segment)).join('/')
}

/** Recursively collect every file under a repo-relative root, returning repo-relative file paths. */
function collectFiles(root) {
	const absolute = join(repoRoot, root)
	const stats = statSync(absolute)
	if (stats.isFile()) return [root]
	const files = []
	for (const entry of readdirSync(absolute, { withFileTypes: true })) {
		const childRelative = `${root}/${entry.name}`
		if (entry.isDirectory()) {
			files.push(...collectFiles(childRelative))
		} else if (entry.isFile()) {
			files.push(childRelative)
		}
	}
	return files
}

rmSync(hostDir, { recursive: true, force: true })

const entries = []
for (const hostPath of HOST_PATHS) {
	const absolute = join(repoRoot, hostPath)
	if (!existsSync(absolute)) {
		process.stderr.write(`build-host: missing host path ${hostPath}\n`)
		process.exit(1)
	}
	for (const file of collectFiles(hostPath)) {
		const storage = pathToStorage(file)
		const sourceAbsolute = join(repoRoot, file)
		const destinationAbsolute = join(hostDir, storage)
		mkdirSync(dirname(destinationAbsolute), { recursive: true })
		copyFileSync(sourceAbsolute, destinationAbsolute)
		const mode = statSync(sourceAbsolute).mode
		const executable = (mode & 0o100) !== 0
		entries.push({ storage, destination: file, executable })
	}
}

entries.sort((a, b) => (a.destination < b.destination ? -1 : a.destination > b.destination ? 1 : 0))

// A1: assert no two entries share a storage path BEFORE writing manifest.json —
// a collision would mean one destination's staged bytes silently overwrote
// another's during the copy loop above.
const byStorage = new Map()
for (const entry of entries) {
	const existing = byStorage.get(entry.storage)
	if (existing !== undefined) {
		process.stderr.write(
			`build-host: storage path collision at "${entry.storage}" — destinations "${existing}" and "${entry.destination}" both map to it\n`,
		)
		process.exit(1)
	}
	byStorage.set(entry.storage, entry.destination)
}

mkdirSync(hostDir, { recursive: true })
writeFileSync(manifestPath, `${JSON.stringify(entries, null, '\t')}\n`)

process.stdout.write(`build-host: staged ${entries.length} file(s) into dist/host\n`)
