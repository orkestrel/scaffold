// Compare the rebuilt dist/ against the published tarball on material content. Run from the
// publishing package's root after its build:
//   node .agents/skills/orkestrel-publish/scripts/compare.ts [--package NAME] [--version V] [--tarball PATH] [--dist dist] [--json]
// The package defaults to the manifest's name and the version to what the registry serves; --tarball
// compares against a local .tgz instead of fetching. Sourcemaps are excluded, a text file differs
// only when it differs with all whitespace removed, and a binary file differs on any byte. The
// summary lists the paths added, removed, and changed. Exit 0 when nothing material differs, 3 when
// something does, 2 when the tarball cannot be read, 64 on usage.
import { existsSync, readFileSync } from 'node:fs'
import { relative } from 'node:path'
import { gunzipSync } from 'node:zlib'
import {
	listFiles,
	readMissingFlags,
	readOption,
	runNpm,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const BLOCK = 512
const PACKAGE_PREFIX = 'package/'

interface Manifest {
	readonly name: string | undefined
	readonly version: string | undefined
}

function readManifest(): Manifest {
	if (!existsSync('package.json')) return { name: undefined, version: undefined }
	let parsed: unknown
	try {
		parsed = JSON.parse(readFileSync('package.json', 'utf8'))
	} catch {
		return { name: undefined, version: undefined }
	}
	if (typeof parsed !== 'object' || parsed === null) return { name: undefined, version: undefined }
	const record = Object.fromEntries(Object.entries(parsed))
	return {
		name: typeof record.name === 'string' ? record.name : undefined,
		version: typeof record.version === 'string' ? record.version : undefined,
	}
}

function readField(text: string): string | undefined {
	const stripped = text.replace(/^"|"$/gu, '')
	return stripped === '' ? undefined : stripped
}

function readHeaderText(header: Buffer, start: number, length: number): string {
	const slice = header.subarray(start, start + length)
	const end = slice.indexOf(0)
	return slice.subarray(0, end === -1 ? slice.length : end).toString('utf8')
}

function readPaxPath(data: Buffer): string | undefined {
	let offset = 0
	while (offset < data.length) {
		const space = data.indexOf(0x20, offset)
		if (space === -1) return undefined
		const length = Number(data.subarray(offset, space).toString('utf8'))
		if (!Number.isFinite(length) || length <= 0) return undefined
		const record = data.subarray(space + 1, offset + length - 1).toString('utf8')
		if (record.startsWith('path=')) return record.slice('path='.length)
		offset += length
	}
	return undefined
}

function readTar(archive: Buffer): ReadonlyMap<string, Buffer> {
	const files = new Map<string, Buffer>()
	let offset = 0
	let overrideName: string | undefined
	while (offset + BLOCK <= archive.length) {
		const header = archive.subarray(offset, offset + BLOCK)
		if (header.every((byte) => byte === 0)) break
		const size = Number.parseInt(readHeaderText(header, 124, 12).trim() || '0', 8)
		const type = String.fromCharCode(header[156] ?? 0)
		const magic = readHeaderText(header, 257, 6)
		const prefix = magic.startsWith('ustar') ? readHeaderText(header, 345, 155) : ''
		const shortName = readHeaderText(header, 0, 100)
		const name = overrideName ?? (prefix === '' ? shortName : `${prefix}/${shortName}`)
		const data = archive.subarray(offset + BLOCK, offset + BLOCK + size)
		overrideName = undefined
		if (type === 'x') overrideName = readPaxPath(data)
		else if (type === 'L') overrideName = readHeaderText(data, 0, data.length)
		else if (type === '0' || type === '\0') files.set(name, Buffer.from(data))
		offset += BLOCK + Math.ceil(size / BLOCK) * BLOCK
	}
	return files
}

// A dist tree holds nothing a walk skips, so every emitted file counts.
const NOTHING_SKIPPED: ReadonlySet<string> = new Set()

function readNpmValue(args: readonly string[]): string | undefined {
	const result = runNpm(args)
	return result.status === 0 ? readField(result.stdout.trim()) : undefined
}

function isMaterial(path: string): boolean {
	return !path.endsWith('.map')
}

function differs(left: Buffer, right: Buffer): boolean {
	if (left.includes(0) || right.includes(0)) return !left.equals(right)
	return left.toString('utf8').replace(/\s+/gu, '') !== right.toString('utf8').replace(/\s+/gu, '')
}

async function main(argv: readonly string[]): Promise<number> {
	const missing = readMissingFlags(argv, ['--package', '--version', '--tarball', '--dist'])
	if (missing.length > 0) {
		console.error(`compare: ${missing.join(', ')} given with no value`)
		return 64
	}
	const manifest = readManifest()
	const name = readOption(argv, '--package') ?? manifest.name
	const dist = readOption(argv, '--dist') ?? 'dist'
	const tarball = readOption(argv, '--tarball')
	if (
		name === undefined ||
		!existsSync(dist) ||
		(argv.includes('--tarball') && tarball === undefined)
	) {
		console.error(
			'usage: compare.ts [--package NAME] [--version V] [--tarball PATH] [--dist dist] [--json]',
		)
		return 64
	}
	let version = readOption(argv, '--version')
	let archive: Buffer
	if (tarball !== undefined) {
		if (!existsSync(tarball)) {
			console.error(`compare: ${tarball} does not exist`)
			return 2
		}
		archive = readFileSync(tarball)
	} else {
		version ??= readNpmValue(['view', name, 'version', '--json'])
		const url =
			version === undefined
				? undefined
				: readNpmValue(['view', `${name}@${version}`, 'dist.tarball', '--json'])
		if (version === undefined || url === undefined) {
			console.error(
				`compare: the registry served no tarball for ${name}${version === undefined ? '' : `@${version}`}`,
			)
			return 2
		}
		const fetched = await fetchTarball(url)
		if (fetched === undefined) {
			console.error(`compare: fetching ${url} failed`)
			return 2
		}
		archive = fetched
	}
	const published = new Map<string, Buffer>()
	let entries: ReadonlyMap<string, Buffer>
	try {
		entries = readTar(gunzipSync(archive))
	} catch (error) {
		console.error(
			`compare: the tarball could not be read: ${error instanceof Error ? error.message : String(error)}`,
		)
		return 2
	}
	for (const [path, content] of entries) {
		const prefixed = `${PACKAGE_PREFIX}${dist}/`
		if (path.startsWith(prefixed) && isMaterial(path))
			published.set(path.slice(prefixed.length), content)
	}
	const local = new Map<string, Buffer>()
	for (const { path } of listFiles(dist, NOTHING_SKIPPED)) {
		const key = relative(dist, path).split('\\').join('/')
		if (isMaterial(key)) local.set(key, readFileSync(path))
	}
	const added = [...local.keys()].filter((key) => !published.has(key)).sort()
	const removed = [...published.keys()].filter((key) => !local.has(key)).sort()
	const changed = [...local.keys()]
		.filter((key) => {
			const other = published.get(key)
			const mine = local.get(key)
			return other !== undefined && mine !== undefined && differs(mine, other)
		})
		.sort()
	const material = added.length + removed.length + changed.length > 0
	const summary = {
		package: name,
		version,
		tarball,
		dist,
		compared: published.size,
		added,
		removed,
		changed,
		material,
	}
	if (argv.includes('--json')) console.log(JSON.stringify(summary))
	else {
		console.log(
			`compare: ${name}${version === undefined ? '' : `@${version}`} — ${published.size} published file(s), ${added.length} added, ${removed.length} removed, ${changed.length} changed`,
		)
		for (const path of added) console.log(`compare: added ${path}`)
		for (const path of removed) console.log(`compare: removed ${path}`)
		for (const path of changed) console.log(`compare: changed ${path}`)
	}
	return material ? 3 : 0
}

async function fetchTarball(url: string): Promise<Buffer | undefined> {
	try {
		const response = await fetch(url)
		if (!response.ok) return undefined
		return Buffer.from(await response.arrayBuffer())
	} catch {
		return undefined
	}
}

main(process.argv.slice(2)).then((code) => {
	process.exitCode = code
})
