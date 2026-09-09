import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { isRecord, parseJSON } from '@orkestrel/contract'

const modulePath = fileURLToPath(import.meta.url)
const scaffold = resolve(dirname(modulePath), '..', '..')
const guide = resolve(scaffold, '..', 'guide')
const core = await import(pathToFileURL(resolve(scaffold, 'dist', 'src', 'core', 'index.js')).href)
const server = await import(pathToFileURL(resolve(scaffold, 'dist', 'src', 'server', 'index.js')).href)

const [targetInput, output, mode] = process.argv.slice(2)

function fail(message) {
	throw new Error(message)
}

function readString(record, key) {
	const value = record[key]
	if (typeof value !== 'string') fail(`Guide package metadata has no string ${key} field.`)
	return value
}

async function readFileState(path) {
	try {
		return (await stat(path)).isFile()
	} catch {
		return false
	}
}

async function readDirectoryState(path) {
	try {
		return (await stat(path)).isDirectory()
	} catch {
		return false
	}
}

async function writeEvidence(path, value) {
	await writeFile(resolve(output, path), `${JSON.stringify(value, undefined, '\t')}\n`)
}

function validateInputs() {
	if (targetInput === undefined || output === undefined || mode === undefined) {
		fail('Expected absolute Guide target, evidence output, and preview or apply mode.')
	}
	if (!isAbsolute(targetInput) || resolve(targetInput) !== guide) fail('Target must resolve to the canonical sibling Guide checkout.')
	if (!isAbsolute(output)) fail('Evidence output must be absolute.')
	if (mode !== 'preview' && mode !== 'apply') fail('Mode must be preview or apply.')
}

async function validateScope(target) {
	const expected = {
		setup: await readFileState(resolve(target, 'tests', 'setup.test.ts')),
		guides: await readFileState(resolve(target, 'tests', 'guides.test.ts')),
		core: await readDirectoryState(resolve(target, 'src', 'core')),
		server: await readDirectoryState(resolve(target, 'src', 'server')),
		browser: await readDirectoryState(resolve(target, 'src', 'browser')),
		app: await readDirectoryState(resolve(target, 'app')),
		bin: await readDirectoryState(resolve(target, 'src', 'bin')),
		global: await readFileState(resolve(target, 'tests', 'setupGlobal.ts')),
		service: await readFileState(resolve(target, 'tests', 'setupService.ts')),
		integration: await readFileState(resolve(target, 'tests', 'integration.test.ts')),
		conformance: await readFileState(resolve(target, 'tests', 'conformance.test.ts')),
		showcase: await readFileState(resolve(target, 'configs', 'app', 'vite.showcase.config.ts')),
	}
	if (!expected.setup || !expected.guides || !expected.core || !expected.server) {
		fail('Guide lacks a required source or test scope.')
	}
	if (
		expected.browser ||
		expected.app ||
		expected.bin ||
		expected.global ||
		expected.service ||
		expected.integration ||
		expected.conformance ||
		expected.showcase
	) {
		fail('Guide scope differs from the recorded server-configuration shape.')
	}
	return expected
}

validateInputs()
const target = resolve(targetInput)
const manifestText = await readFile(resolve(target, 'package.json'), 'utf8')
const manifest = parseJSON(manifestText)
if (!isRecord(manifest)) fail('Guide package metadata is not a JSON record.')
if (readString(manifest, 'name') !== '@orkestrel/guide') fail('Guide package metadata names another package.')
if (readString(manifest, 'version') !== '0.0.18') fail('Guide package metadata has an unexpected version.')
if (!isRecord(manifest.engines) || typeof manifest.engines.node !== 'string') fail('Guide package metadata has no string engines.node field.')

const scope = await validateScope(target)
await mkdir(output, { recursive: true })

const dependencies = core.manifestToDependencies(manifestText)
const blueprint = core.createBlueprint('guide', {
	src: ['core', 'server'],
	dependencies: dependencies.runtime,
	peers: dependencies.peer,
	version: manifest.version,
	engines: manifest.engines.node,
	setup: true,
	guides: true,
	app: [],
	bin: false,
	global: false,
	service: false,
	integration: false,
	conformance: false,
	showcase: false,
})
const compiler = new core.Compiler()
let materializer

try {
	materializer = new server.Materializer({ host: resolve(scaffold, 'dist', 'host') })
	const compiled = compiler.compile(blueprint, ['configs', 'tests'])
	await writeEvidence('blueprint.json', blueprint)
	await writeEvidence('questions.json', compiled.questions)
	await writeEvidence('scope.json', scope)
	if (compiled.plan === undefined) fail('Compiler returned no plan.')
	if (compiled.questions.some((question) => question.blocking)) fail('Compiler returned blocking questions.')
	const audit = materializer.audit(compiled.plan, target)
	await writeEvidence('plan.json', compiled.plan)
	await writeEvidence('audit.json', audit)
	if (mode === 'preview') {
		process.stdout.write(`${JSON.stringify(audit, undefined, '\t')}\n`)
	} else {
		const repair = materializer.repair(compiled.plan, audit, target)
		const terminal = materializer.audit(compiled.plan, target)
		await writeEvidence('repair.json', repair)
		await writeEvidence('terminal-audit.json', terminal)
	}
} finally {
	if (materializer !== undefined) materializer.destroy()
	compiler.destroy()
}
