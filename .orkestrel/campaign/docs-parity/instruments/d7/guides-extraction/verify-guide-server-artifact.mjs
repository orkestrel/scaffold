import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isRecord, parseJSON } from '@orkestrel/contract'

const scaffold = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const pass = resolve(scaffold, 'tmp', 'pass')
const packed = resolve(pass, 'packed')
const guide = resolve(scaffold, '..', 'guide')
const require = createRequire(import.meta.url)
const [input, output] = process.argv.slice(2)
const entries = [
	'dist/src/core/index.js',
	'dist/src/core/index.d.ts',
	'dist/src/server/index.js',
	'dist/src/server/index.d.ts',
]

function fail(message) {
	throw new Error(message)
}

function resolveBelow(inputPath, parent, label) {
	if (!isAbsolute(inputPath)) fail(`${label} must be absolute.`)
	const path = resolve(inputPath)
	const suffix = relative(parent, path)
	if (
		suffix === '' ||
		isAbsolute(suffix) ||
		suffix === '..' ||
		suffix.startsWith('..\\') ||
		suffix.startsWith('../')
	) {
		fail(`${label} must resolve below ${parent}.`)
	}
	return path
}

function readMetadata(text, label) {
	const metadata = parseJSON(text)
	if (!isRecord(metadata)) fail(`${label} package metadata is not a JSON record.`)
	if (metadata.name !== '@orkestrel/guide') fail(`${label} package metadata names another package.`)
	if (metadata.version !== '0.0.18') fail(`${label} package metadata has an unexpected version.`)
	if (!isRecord(metadata.exports) || !Object.hasOwn(metadata.exports, './server')) {
		fail(`${label} package metadata has no ./server export.`)
	}
	return metadata
}

async function readHash(root, entry) {
	const path = resolve(root, entry)
	const content = await readFile(path)
	return { path, sha256: createHash('sha256').update(content).digest('hex') }
}

async function compareEntry(entry, packageRoot, canonicalRoot, installedRoot) {
	const packageFile = await readHash(packageRoot, entry)
	const canonicalFile = await readHash(canonicalRoot, entry)
	const installedFile = await readHash(installedRoot, entry)
	if (packageFile.sha256 !== canonicalFile.sha256 || packageFile.sha256 !== installedFile.sha256) {
		fail(`Artifact entry differs: ${entry}`)
	}
	return { entry, packed: packageFile, canonical: canonicalFile, installed: installedFile }
}

if (input === undefined || output === undefined) fail('Expected absolute pack evidence and output paths.')
const pack = resolveBelow(input, packed, 'Pack evidence')
const evidence = resolveBelow(output, pass, 'Evidence output')
const packageRoot = resolve(pack, 'extract', 'package')
const installedMetadataPath = require.resolve('@orkestrel/guide/package.json')
const installedRoot = dirname(installedMetadataPath)
const installedServer = import.meta.resolve('@orkestrel/guide/server')
const [packedText, canonicalText, installedText] = await Promise.all([
	readFile(resolve(packageRoot, 'package.json'), 'utf8'),
	readFile(resolve(guide, 'package.json'), 'utf8'),
	readFile(installedMetadataPath, 'utf8'),
])
const metadata = {
	packed: readMetadata(packedText, 'Packed'),
	canonical: readMetadata(canonicalText, 'Canonical'),
	installed: readMetadata(installedText, 'Installed'),
}

if (JSON.stringify(metadata.packed.exports['./server']) !== JSON.stringify(metadata.installed.exports['./server'])) {
	fail('Packed and installed ./server exports differ.')
}
if (JSON.stringify(metadata.packed.exports['./server']) !== JSON.stringify(metadata.canonical.exports['./server'])) {
	fail('Packed and canonical ./server exports differ.')
}

const module = await import(installedServer)
if (typeof module.GuideCommand !== 'function') fail('Installed Guide server exports no GuideCommand function.')
await mkdir(evidence, { recursive: true })
const files = []
for (const entry of entries) files.push(await compareEntry(entry, packageRoot, guide, installedRoot))
const result = {
	files,
	metadata: {
		packed: {
			dependencies: metadata.packed.dependencies,
			devDependencies: metadata.packed.devDependencies,
			exports: metadata.packed.exports,
			peerDependencies: metadata.packed.peerDependencies,
		},
		canonical: {
			dependencies: metadata.canonical.dependencies,
			devDependencies: metadata.canonical.devDependencies,
			exports: metadata.canonical.exports,
			peerDependencies: metadata.canonical.peerDependencies,
		},
		installed: {
			dependencies: metadata.installed.dependencies,
			devDependencies: metadata.installed.devDependencies,
			exports: metadata.installed.exports,
			peerDependencies: metadata.installed.peerDependencies,
		},
	},
	module: { url: installedServer, GuideCommand: typeof module.GuideCommand },
}
await writeFile(resolve(evidence, 'artifact.json'), `${JSON.stringify(result, undefined, '\t')}\n`)
process.stdout.write('Guide server artifact comparison completed.\n')
