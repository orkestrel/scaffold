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
	parseJsonRecord,
	readString,
	runNpm,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const BLOCK = 512
const PACKAGE_PREFIX = 'package/'

interface Manifest {
	readonly name: string | undefined
	readonly version: string | undefined
}

interface Source {
	readonly archive: Buffer | undefined
	readonly version: string | undefined
	readonly failure: string | undefined
}

interface TarState {
	readonly next: number
	readonly name: string | undefined
	readonly files: ReadonlyArray<readonly [string, Buffer]>
	readonly done: boolean
}

function readManifest(): Manifest {
	if (!existsSync('package.json')) return { name: undefined, version: undefined }
	try {
		const record = parseJsonRecord(readFileSync('package.json', 'utf8'))
		return { name: readString(record, 'name'), version: readString(record, 'version') }
	} catch {
		return { name: undefined, version: undefined }
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

function readPaxPath(data: Buffer, offset = 0): string | undefined {
	if (offset >= data.length) return undefined
	const space = data.indexOf(0x20, offset)
	if (space === -1) return undefined
	const length = Number(data.subarray(offset, space).toString('utf8'))
	if (!Number.isFinite(length) || length <= 0) return undefined
	const record = data.subarray(space + 1, offset + length - 1).toString('utf8')
	return record.startsWith('path=')
		? record.slice('path='.length)
		: readPaxPath(data, offset + length)
}

// A tar entry occupies a header block and the data blocks its size names, so a step ignores every
// block offset an earlier entry already consumed.
function stepTar(archive: Buffer, state: TarState, offset: number): TarState {
	if (state.done || offset < state.next) return state
	const header = archive.subarray(offset, offset + BLOCK)
	if (header.every((byte) => byte === 0)) return { ...state, done: true }
	const size = Number.parseInt(readHeaderText(header, 124, 12).trim() || '0', 8)
	const type = String.fromCharCode(header[156] ?? 0)
	const magic = readHeaderText(header, 257, 6)
	const prefix = magic.startsWith('ustar') ? readHeaderText(header, 345, 155) : ''
	const shortName = readHeaderText(header, 0, 100)
	const name = state.name ?? (prefix === '' ? shortName : `${prefix}/${shortName}`)
	const data = archive.subarray(offset + BLOCK, offset + BLOCK + size)
	const next = offset + BLOCK + Math.ceil(size / BLOCK) * BLOCK
	return {
		next,
		name:
			type === 'x'
				? readPaxPath(data)
				: type === 'L'
					? readHeaderText(data, 0, data.length)
					: undefined,
		files:
			type === '0' || type === '\0' ? [...state.files, [name, Buffer.from(data)]] : state.files,
		done: !Number.isFinite(next),
	}
}

function readTar(archive: Buffer): ReadonlyMap<string, Buffer> {
	const offsets = Array.from(
		{ length: Math.floor(archive.length / BLOCK) },
		(_, index) => index * BLOCK,
	)
	// A later entry of the same name replaces an earlier one at the earlier position, as a map write does.
	return new Map(
		offsets.reduce<TarState>((state, offset) => stepTar(archive, state, offset), {
			next: 0,
			name: undefined,
			files: [],
			done: false,
		}).files,
	)
}

function unpackTar(archive: Buffer): ReadonlyMap<string, Buffer> | Error {
	try {
		return readTar(gunzipSync(archive))
	} catch (error) {
		return error instanceof Error ? error : new Error(String(error))
	}
}

async function readSource(
	name: string,
	requested: string | undefined,
	tarball: string | undefined,
): Promise<Source> {
	if (tarball !== undefined) {
		return existsSync(tarball)
			? { archive: readFileSync(tarball), version: requested, failure: undefined }
			: { archive: undefined, version: requested, failure: `${tarball} does not exist` }
	}
	const version = requested ?? readNpmValue(['view', name, 'version', '--json'])
	const url =
		version === undefined
			? undefined
			: readNpmValue(['view', `${name}@${version}`, 'dist.tarball', '--json'])
	if (version === undefined || url === undefined) {
		return {
			archive: undefined,
			version,
			failure: `the registry served no tarball for ${name}${version === undefined ? '' : `@${version}`}`,
		}
	}
	const fetched = await fetchTarball(url)
	return fetched === undefined
		? { archive: undefined, version, failure: `fetching ${url} failed` }
		: { archive: fetched, version, failure: undefined }
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
	const source = await readSource(name, readOption(argv, '--version'), tarball)
	const { archive, version } = source
	if (archive === undefined) {
		console.error(`compare: ${source.failure}`)
		return 2
	}
	const entries = unpackTar(archive)
	if (entries instanceof Error) {
		console.error(`compare: the tarball could not be read: ${entries.message}`)
		return 2
	}
	const prefixed = `${PACKAGE_PREFIX}${dist}/`
	const published = new Map(
		[...entries].flatMap(([path, content]) =>
			path.startsWith(prefixed) && isMaterial(path)
				? [[path.slice(prefixed.length), content] as const]
				: [],
		),
	)
	const local = new Map(
		listFiles(dist, NOTHING_SKIPPED).flatMap(({ path }) => {
			const key = relative(dist, path).split('\\').join('/')
			return isMaterial(key) ? [[key, readFileSync(path)] as const] : []
		}),
	)
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
