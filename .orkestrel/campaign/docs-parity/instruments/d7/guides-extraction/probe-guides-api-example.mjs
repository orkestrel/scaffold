import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const modulePath = fileURLToPath(import.meta.url)
const scaffold = resolve(dirname(modulePath), '..', '..')
const pass = resolve(scaffold, 'tmp', 'pass')
const guide = resolve(scaffold, '..', 'guide')
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

function writeFixture(root, path, content) {
	const destination = resolve(root, path)
	mkdirSync(dirname(destination), { recursive: true })
	writeFileSync(destination, content)
}

function readSnippet() {
	const guidePath = resolve(guide, 'guides', 'guide.md')
	const text = readFileSync(guidePath, 'utf8')
	const markers = [...text.matchAll(/^### Run the shared server command\r?\n\r?\n```ts\r?\n/gm)]
	if (markers.length !== 1 || markers[0].index === undefined) fail('Guide command marker is absent or ambiguous.')
	const codeStart = markers[0].index + markers[0][0].length
	const ending = /\r?\n```/g
	ending.lastIndex = codeStart
	const close = ending.exec(text)
	if (close === null || close.index < codeStart) fail('Guide command fence has no closing marker.')
	const codeEnd = close.index
	return text.slice(codeStart, codeEnd)
}

function createOutput(path) {
	try {
		mkdirSync(path)
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === 'EEXIST') fail('Evidence output already exists.')
		throw error
	}
}

function createFixture(root, entry) {
	writeFixture(root, 'package.json', '{"name":"@scope/package","private":true,"type":"module"}\n')
	writeFixture(root, 'README.md', '# Package\n\n> Package guide fixture.\n')
	writeFixture(
		root,
		'guides/README.md',
		'# Guides\n\n## By concept\n\n| Concept | Spec | Source | Tests |\n| --- | --- | --- | --- |\n| Package | [`package.md`](package.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/guides.test.ts`](../tests/guides.test.ts) |\n',
	)
	writeFixture(root, 'guides/package.md', '# Package\n\n## Surface\n')
	writeFixture(root, 'src/core/index.ts', 'export const packageValue = true\n')
	writeFixture(root, 'src/server/index.ts', 'export const serverValue = true\n')
	writeFixture(
		root,
		'vite.config.ts',
		"import { defineConfig } from 'vitest/config'\n\nexport default defineConfig({ test: { projects: [{ test: { name: 'guides', include: ['tests/guides.test.ts'], environment: 'node' } }] } })\n",
	)
	writeFixture(root, 'tests/guides.test.ts', entry)
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
		error: result.error === undefined ? undefined : result.error.message,
		label,
		signal: result.signal,
		status: result.status,
		stderr: result.stderr,
		stdout: result.stdout,
	}
}

function createCallbackImport(snippet) {
	return snippet.replace("import { expect } from 'vitest'\n", '').replace('}).execute(async ({ files, report, root, rows }) => {', "}).execute(async ({ files, report, root, rows }) => {\n\tconst { expect } = await import('vitest')")
}

function createPositiveImport(snippet) {
	const callback = createCallbackImport(snippet)
	return callback.replace(
		'\texpect(root.length).toBeGreaterThan(0)\n\texpect(Object.keys(files).length).toBeGreaterThan(0)\n\texpect(rows.length).toBeGreaterThan(0)\n\texpect(report.input).toEqual([])',
		"\tconst { it } = await import('vitest')\n\tit('checks the documented inventory', () => {\n\t\texpect(root.length).toBeGreaterThan(0)\n\t\texpect(Object.keys(files).length).toBeGreaterThan(0)\n\t\texpect(rows.length).toBeGreaterThan(0)\n\t\texpect(report.input).toEqual([])\n\t})",
	)
}

function runObservation(root) {
	const driver = [
		"import { GuideCommand } from '@orkestrel/guide/server'",
		"import { readInventory } from '@orkestrel/test/server'",
		"const command = new GuideCommand({ root: new URL('./', import.meta.url), patterns: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'], modules: { '@scope/package': ['src/core', 'src/server'] }, languages: ['ts'], language: 'ts', reader: readInventory, runner: async () => { throw new Error('runner creation failed') } })",
		"let outcome = 'fulfilled'",
		'try { await command.execute(async () => {}) } catch (error) { outcome = `rejected:${error instanceof Error ? error.message : String(error)}` }',
		'process.stdout.write(JSON.stringify({ outcome, exitCode: process.exitCode }) + "\\n")',
	].join('\n')
	writeFixture(root, 'observation.mjs', driver)
	const result = spawnSync(process.execPath, ['observation.mjs'], {
		cwd: root,
		encoding: 'utf8',
		env: Object.fromEntries(Object.entries(process.env).filter(([name]) => name !== 'VITEST')),
		timeout: 30_000,
		windowsHide: true,
	})
	return {
		argv: [process.execPath, 'observation.mjs'],
		error: result.error === undefined ? undefined : result.error.message,
		signal: result.signal,
		status: result.status,
		stderr: result.stderr,
		stdout: result.stdout,
	}
}

if (outputInput === undefined) fail('Expected an absolute evidence output path.')
const output = resolveBelow(outputInput, pass, 'Evidence output')
createOutput(output)
const fixture = mkdtempSync(resolve(pass, 'guide-api-example-'))
const snippet = readSnippet()
const callbackEntry = createCallbackImport(snippet)
const positiveEntry = createPositiveImport(snippet)
if (callbackEntry === snippet || positiveEntry === callbackEntry || !positiveEntry.includes("it('checks the documented inventory'")) {
	fail('Documented-command transformations did not produce distinct entries.')
}
writeFixture(output, 'entries/documented.ts', snippet)
writeFixture(output, 'entries/callback-import.ts', callbackEntry)
writeFixture(output, 'entries/positive-control.ts', positiveEntry)
createFixture(fixture, snippet)
const documented = runEntry(fixture, snippet, 'documented')
const callback = runEntry(fixture, callbackEntry, 'callback-import')
const positive = runEntry(fixture, positiveEntry, 'positive-control')
const observation = runObservation(fixture)
const evidence = {
	documented,
	fixture,
	observation,
	positive,
	callback,
	snippet: { sha256: createHash('sha256').update(snippet).digest('hex') },
}
writeFileSync(resolve(output, 'evidence.json'), `${JSON.stringify(evidence, undefined, '\t')}\n`)
if (positive.status !== 0) process.exitCode = 1
