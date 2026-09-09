import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGuide, createSource } from '@orkestrel/guide'

const modulePath = fileURLToPath(import.meta.url)
const scaffold = resolve(dirname(modulePath), '..', '..')
const pass = resolve(scaffold, 'tmp', 'pass')
const guide = resolve(scaffold, '..', 'guide')
const controls = resolve(scaffold, '.orkestrel', 'campaign', 'docs-parity', 'evidence', 'd7n-guides-api-example-red', 'entries')
const [outputInput] = process.argv.slice(2)

function fail(message) {
	throw new Error(message)
}

function resolveBelow(path, root, label) {
	if (!isAbsolute(path)) fail(`${label} must be absolute.`)
	const resolved = resolve(path)
	const suffix = relative(root, resolved)
	if (suffix === '' || isAbsolute(suffix) || suffix === '..' || suffix.startsWith('..\\') || suffix.startsWith('../')) {
		fail(`${label} must resolve below ${root}.`)
	}
	return resolved
}

function createOutput(path) {
	try {
		mkdirSync(path)
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === 'EEXIST') fail('Evidence output already exists.')
		throw error
	}
}

function writeFixture(root, path, content) {
	const destination = resolve(root, path)
	mkdirSync(dirname(destination), { recursive: true })
	writeFileSync(destination, content)
}

function createFixture(root) {
	writeFixture(root, 'package.json', '{"name":"@scope/package","private":true,"type":"module"}\n')
	writeFixture(root, 'README.md', '# Package\n\n> Package guide fixture.\n')
	writeFixture(root, 'guides/README.md', '# Guides\n\n## By concept\n\n| Concept | Spec | Source | Tests |\n| --- | --- | --- | --- |\n| Package | [`package.md`](package.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/guides.test.ts`](../tests/guides.test.ts) |\n')
	writeFixture(root, 'guides/package.md', '# Package\n\n## Surface\n')
	writeFixture(root, 'src/core/index.ts', 'export const packageValue = true\n')
	writeFixture(root, 'src/server/index.ts', 'export const serverValue = true\n')
	writeFixture(root, 'vite.config.ts', "import { defineConfig } from 'vitest/config'\n\nexport default defineConfig({ test: { projects: [{ test: { name: 'guides', include: ['tests/guides.test.ts'], environment: 'node' } }] } })\n")
}

function readGuideEntry() {
	const document = createGuide(readFileSync(resolve(guide, 'guides', 'guide.md'), 'utf8'))
	const matches = document.fences().filter((fence) => fence.title === 'Run the shared server command')
	if (matches.length !== 1) fail('Guide command fence is absent or ambiguous.')
	return matches[0].code
}

function readClassEntry() {
	const path = 'src/server/GuideCommand.ts'
	const source = createSource({ files: { [path]: readFileSync(resolve(guide, path), 'utf8') }, module: 'src/server' })
	const matches = source.examples().filter((example) => example.name === 'GuideCommand')
	if (matches.length !== 1) fail('GuideCommand class example is absent or ambiguous.')
	return matches[0].code
}

function runEntry(root, entry, label) {
	writeFixture(root, 'tests/guides.test.ts', entry)
	const result = spawnSync(process.execPath, ['--experimental-strip-types', 'tests/guides.test.ts'], {
		cwd: root,
		encoding: 'utf8',
		env: Object.fromEntries(Object.entries(process.env).filter(([name]) => name !== 'VITEST')),
		timeout: 30_000,
		windowsHide: true,
	})
	return {
		argv: [process.execPath, '--experimental-strip-types', 'tests/guides.test.ts'],
		cwd: root,
		error: result.error === undefined ? undefined : result.error.message,
		label,
		signal: result.signal,
		status: result.status,
		stderr: result.stderr,
		stdout: result.stdout,
	}
}

function retainEntry(output, name, entry) {
	writeFixture(output, `entries/${name}.ts`, entry)
	return { sha256: createHash('sha256').update(entry).digest('hex') }
}

if (outputInput === undefined) fail('Expected an absolute evidence output path.')
const output = resolveBelow(outputInput, pass, 'Evidence output')
createOutput(output)
const fixture = mkdtempSync(resolve(pass, 'guides-api-example-'))
createFixture(fixture)
const guideEntry = readGuideEntry()
const classEntry = readClassEntry()
const unregisteredEntry = readFileSync(resolve(controls, 'documented.ts'), 'utf8')
const registeredEntry = readFileSync(resolve(controls, 'positive-control.ts'), 'utf8')
const hashes = {
	class: retainEntry(output, 'class', classEntry),
	guide: retainEntry(output, 'guide', guideEntry),
	registered: retainEntry(output, 'registered-control', registeredEntry),
	unregistered: retainEntry(output, 'unregistered-control', unregisteredEntry),
}
const classResult = runEntry(fixture, classEntry, 'class')
const guideResult = runEntry(fixture, guideEntry, 'guide')
const registeredResult = runEntry(fixture, registeredEntry, 'registered-control')
const unregisteredResult = runEntry(fixture, unregisteredEntry, 'unregistered-control')
const evidence = {
	class: classResult,
	fixture,
	guide: guideResult,
	hashes,
	registered: registeredResult,
	unregistered: unregisteredResult,
}
writeFileSync(resolve(output, 'evidence.json'), `${JSON.stringify(evidence, undefined, '\t')}\n`)
const unregisteredText = `${unregisteredResult.stdout}${unregisteredResult.stderr}`
if (guideResult.status !== 0 || classResult.status !== 0 || registeredResult.status !== 0 || unregisteredResult.status !== 1 || !unregisteredText.includes('No test suite found')) {
	process.exitCode = 1
}
