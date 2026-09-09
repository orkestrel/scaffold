import { readFile, stat, writeFile } from 'node:fs/promises'
import { execFile as executeFile } from 'node:child_process'
import { promisify } from 'node:util'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { isRecord, parseJSON } from '@orkestrel/contract'

const execFile = promisify(executeFile)
const modulePath = fileURLToPath(import.meta.url)
const scaffold = resolve(dirname(modulePath), '..', '..')
const guide = resolve(scaffold, '..', 'guide')
const installed = resolve(guide, 'node_modules', '@orkestrel', 'scaffold')
const [targetInput, output, mode] = process.argv.slice(2)

function fail(message) {
	throw new Error(message)
}

function assertBelow(root, path) {
	const suffix = relative(root, path)
	if (suffix === '' || suffix.startsWith('..') || isAbsolute(suffix)) fail('Installed Scaffold path escapes the Guide installation.')
}

function readString(record, key) {
	const value = record[key]
	if (typeof value !== 'string') fail(`Guide package metadata has no string ${key} field.`)
	return value
}

function selectPlan(plan) {
	const artifacts = plan.artifacts.filter((artifact) => artifact.path === 'scripts')
	if (artifacts.length !== 1 || artifacts[0]?.origin !== 'host' || artifacts[0].ownership !== 'presence') fail('Compiled scripts artifact differs from the expected host presence root.')
	const expected = ['.claude/agents/orkestrel.md', '.claude/settings.json', 'scripts']
	const paths = plan.artifacts.map((artifact) => artifact.path).toSorted()
	if (JSON.stringify(paths) !== JSON.stringify(expected)) fail('Compiled orchestration membership differs from the previewed scope.')
	return plan
}

function assertForeign(audit) {
	const paths = audit.findings.filter((finding) => finding.drift === 'foreign').map((finding) => finding.path)
	if (JSON.stringify(paths) !== JSON.stringify(['scripts/docs.ts'])) fail('Foreign audit paths differ from scripts/docs.ts.')
}

async function writeEvidence(name, value) {
	await writeFile(resolve(output, name), `${JSON.stringify(value, undefined, '\t')}\n`)
}

async function readWorktree() {
	const tracked = await execFile('git', ['-C', guide, 'ls-files', '-z'], { encoding: 'buffer', windowsHide: true })
	const status = await execFile('git', ['-C', guide, 'status', '--porcelain=v1'], { encoding: 'utf8', windowsHide: true })
	return {
		dirty: status.stdout.split('\n').filter((line) => line.length > 0).map((line) => line.slice(3)),
		tracked: tracked.stdout.toString('utf8').split('\0').filter((path) => path.length > 0),
	}
}

async function isFile(path) {
	try {
		return (await stat(path)).isFile()
	} catch {
		return false
	}
}

async function isDirectory(path) {
	try {
		return (await stat(path)).isDirectory()
	} catch {
		return false
	}
}

if (targetInput === undefined || output === undefined || mode === undefined) fail('Expected canonical Guide target, evidence output, and mode.')
if (!isAbsolute(targetInput) || resolve(targetInput) !== guide) fail('Target must be the canonical Guide checkout.')
if (!isAbsolute(output)) fail('Evidence output must be absolute.')
if (mode !== 'preview' && mode !== 'apply') fail('Mode must be preview or apply.')
assertBelow(resolve(guide, 'node_modules'), installed)

const manifestText = await readFile(resolve(guide, 'package.json'), 'utf8')
const manifest = parseJSON(manifestText)
if (!isRecord(manifest)) fail('Guide package metadata is not a JSON record.')
if (readString(manifest, 'name') !== '@orkestrel/guide') fail('Guide package metadata names another package.')
if (readString(manifest, 'version') !== '0.0.18') fail('Guide package metadata has an unexpected version.')
if (!isRecord(manifest.engines) || typeof manifest.engines.node !== 'string') fail('Guide package metadata has no engines.node string.')
if (
	!(await isDirectory(resolve(guide, 'src', 'core'))) ||
	!(await isDirectory(resolve(guide, 'src', 'server'))) ||
	!(await isFile(resolve(guide, 'tests', 'setup.test.ts'))) ||
	!(await isFile(resolve(guide, 'tests', 'guides.test.ts'))) ||
	(await isDirectory(resolve(guide, 'src', 'browser'))) ||
	(await isDirectory(resolve(guide, 'app'))) ||
	(await isDirectory(resolve(guide, 'src', 'bin'))) ||
	(await isFile(resolve(guide, 'tests', 'setupGlobal.ts'))) ||
	(await isFile(resolve(guide, 'tests', 'setupService.ts'))) ||
	(await isFile(resolve(guide, 'tests', 'integration.test.ts'))) ||
	(await isFile(resolve(guide, 'tests', 'conformance.test.ts'))) ||
	(await isFile(resolve(guide, 'configs', 'app', 'vite.showcase.config.ts')))
) fail('Guide scope differs from the accepted core/server shape.')
const installedManifest = parseJSON(await readFile(resolve(installed, 'package.json'), 'utf8'))
if (!isRecord(installedManifest) || readString(installedManifest, 'name') !== '@orkestrel/scaffold' || readString(installedManifest, 'version') !== '0.0.64') fail('Installed Scaffold identity differs from the accepted release.')

const core = await import(pathToFileURL(resolve(installed, 'dist', 'src', 'core', 'index.js')).href)
const server = await import(pathToFileURL(resolve(installed, 'dist', 'src', 'server', 'index.js')).href)
const dependencies = core.manifestToDependencies(manifestText)
const blueprint = core.createBlueprint('guide', {
	app: [],
	bin: false,
	conformance: false,
	dependencies: dependencies.runtime,
	engines: manifest.engines.node,
	global: false,
	guides: true,
	integration: false,
	peers: dependencies.peer,
	service: false,
	setup: true,
	showcase: false,
	src: ['core', 'server'],
	version: manifest.version,
})
const compiler = new core.Compiler()
let materializer

try {
	materializer = new server.Materializer({ host: resolve(installed, 'dist', 'host') })
	const compiled = compiler.compile(blueprint, ['orchestration'])
	await writeEvidence('blueprint.json', blueprint)
	await writeEvidence('questions.json', compiled.questions)
	if (compiled.questions.some((question) => question.blocking)) fail('Compiler returned blocking questions.')
	if (compiled.plan === undefined) fail('Compiler returned no plan.')
	await writeEvidence('plan.json', compiled.plan)
	const plan = selectPlan(compiled.plan)
	await writeEvidence('selected-plan.json', plan)
	const audit = materializer.audit(plan, guide)
	await writeEvidence('audit.json', audit)
	assertForeign(audit)
	if (audit.findings.some((finding) => !finding.path.startsWith('scripts/') && finding.drift !== 'aligned')) fail('Non-script orchestration drift is outside this application.')
	const worktree = await readWorktree()
	await writeEvidence('worktree.json', worktree)
	if (!worktree.tracked.includes('scripts/docs.ts')) fail('Guide does not track scripts/docs.ts.')
	if (mode === 'preview') {
		process.stdout.write(`${JSON.stringify({ removal: ['scripts/docs.ts'], writes: plan.artifacts.map((artifact) => artifact.path) })}\n`)
	} else {
		if (worktree.dirty.length > 0) fail('Guide worktree must be clean before apply.')
		const removal = materializer.remove(plan, audit, worktree, guide)
		await writeEvidence('removal.json', removal)
		if (JSON.stringify(removal.removed) !== JSON.stringify(['scripts/docs.ts'])) fail('Removal differs from scripts/docs.ts.')
		const repairAudit = materializer.audit(plan, guide)
		const repair = materializer.repair(plan, repairAudit, guide)
		const declaration = materializer.declare({ pins: { development: [], runtime: [] }, scripts: core.blueprintToWritableScripts(blueprint) }, guide)
		const terminal = materializer.audit(plan, guide)
		await writeEvidence('repair.json', repair)
		await writeEvidence('declaration.json', declaration)
		await writeEvidence('terminal-audit.json', terminal)
		if (terminal.findings.some((finding) => finding.drift === 'stale' || finding.drift === 'missing' || finding.drift === 'foreign')) fail('Terminal audit retains selected drift.')
		const changed = await execFile('git', ['-C', guide, 'status', '--porcelain=v1'], { encoding: 'utf8', windowsHide: true })
		await writeEvidence('changed.json', changed.stdout.split('\n').filter((line) => line.length > 0))
	}
} finally {
	if (materializer !== undefined) materializer.destroy()
	compiler.destroy()
}
