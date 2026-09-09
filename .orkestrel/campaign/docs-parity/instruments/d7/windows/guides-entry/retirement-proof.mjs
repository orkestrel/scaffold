import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const RETIRED_PATH = 'scripts/docs.ts'
const RETIRED_BYTES = 'console.log("retired guides entry")\n'
const MOVED_BYTES = 'console.log("moved after audit")\n'
const CUSTOM_PATH = 'scripts/custom-guides.mjs'
const CUSTOM_BYTES = 'console.log("custom guides command")\n'
const DIRTY_BYTES = 'console.log("custom guides command changed")\n'
const GUIDES_PATH = 'scripts/guides.ts'
const CAMPAIGN_TRAILERS = [
	'Co-Authored-By: Claude <noreply@anthropic.com>',
	'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743',
].join('\n')

function renderError(error) {
	if (error instanceof Error) return error.stack ?? error.message
	return String(error)
}

function resolveInside(workspace, ...parts) {
	const root = resolve(workspace)
	const candidate = resolve(root, ...parts)
	if (candidate === root || !candidate.startsWith(`${root}${sep}`)) {
		throw new Error(`Refused a fixture path outside ${root}: ${candidate}`)
	}
	return candidate
}

function writeFixture(workspace, fixture, path, content) {
	const destination = resolveInside(workspace, fixture, ...path.split('/'))
	mkdirSync(dirname(destination), { recursive: true })
	writeFileSync(destination, content, 'utf8')
}

function runGit(workspace, target, arguments_) {
	const checked = resolveInside(workspace, target)
	assert.equal(checked, resolve(target), 'Git target must stay inside the fresh workspace')
	const result = spawnSync('git', ['-C', checked, ...arguments_], {
		encoding: 'utf8',
		windowsHide: true,
	})
	if (result.error !== undefined) throw result.error
	if (result.status !== 0) {
		const diagnostic = typeof result.stderr === 'string' ? result.stderr.trim() : ''
		throw new Error(`git -C ${checked} ${arguments_.join(' ')} failed: ${diagnostic}`)
	}
	if (typeof result.stdout !== 'string') throw new Error('Git returned no text output')
	return result.stdout
}

function readGitRecords(workspace, target, arguments_) {
	return runGit(workspace, target, arguments_)
		.split('\0')
		.filter((record) => record.length > 0)
}

function readWorktree(workspace, target) {
	const tracked = readGitRecords(workspace, target, ['ls-files', '-z'])
	const dirty = readGitRecords(workspace, target, [
		'status',
		'--porcelain=v1',
		'--untracked-files=all',
		'-z',
	]).map((record) => (record.length > 3 && record[2] === ' ' ? record.slice(3) : record))
	return { tracked, dirty }
}

function commitFixture(workspace, target, label, paths) {
	runGit(workspace, target, ['add', '--', ...paths])
	const staged = readGitRecords(workspace, target, ['diff', '--cached', '--name-only', '-z'])
	assert.deepEqual(staged.toSorted(), paths.toSorted(), `${label} must stage only its named paths`)
	runGit(workspace, target, [
		'-c',
		'user.name=Claude',
		'-c',
		'user.email=noreply@anthropic.com',
		'commit',
		'--quiet',
		'--no-gpg-sign',
		'--message',
		`Prepare the ${label} retirement fixture`,
		'--message',
		CAMPAIGN_TRAILERS,
	])
	return runGit(workspace, target, ['rev-parse', 'HEAD']).trim()
}

function createFixture(workspace, label, trackedRetired) {
	const target = resolveInside(workspace, label)
	mkdirSync(target, { recursive: false })
	runGit(workspace, target, ['init', '--quiet'])
	writeFixture(workspace, label, RETIRED_PATH, RETIRED_BYTES)
	writeFixture(workspace, label, CUSTOM_PATH, CUSTOM_BYTES)
	if (!trackedRetired) {
		writeFixture(workspace, label, '.git/info/exclude', `/${RETIRED_PATH}\n`)
	}
	const paths = trackedRetired ? [RETIRED_PATH, CUSTOM_PATH] : [CUSTOM_PATH]
	const revision = commitFixture(workspace, target, label, paths)
	const state = readWorktree(workspace, target)
	assert.equal(state.tracked.includes(CUSTOM_PATH), true, `${label} must track ${CUSTOM_PATH}`)
	assert.equal(
		state.tracked.includes(RETIRED_PATH),
		trackedRetired,
		`${label} has the wrong tracked state for ${RETIRED_PATH}`,
	)
	assert.deepEqual(state.dirty, [], `${label} must start clean`)
	return { target, revision }
}

function loadEntry(root, ...parts) {
	const entry = resolve(root, ...parts)
	if (!existsSync(entry) || !statSync(entry).isFile()) {
		throw new Error(`The caller-supplied scaffold root carries no built entry at ${entry}`)
	}
	return pathToFileURL(entry).href
}

async function loadScaffold(root) {
	const core = await import(loadEntry(root, 'dist', 'src', 'core', 'index.js'))
	const server = await import(loadEntry(root, 'dist', 'src', 'server', 'index.js'))
	assert.equal(typeof core.Compiler, 'function', 'The built core barrel must export Compiler')
	assert.equal(typeof core.createBlueprint, 'function', 'The built core barrel must export createBlueprint')
	assert.equal(typeof core.isScaffoldError, 'function', 'The built core barrel must export isScaffoldError')
	assert.equal(typeof server.Materializer, 'function', 'The built server barrel must export Materializer')
	return {
		Compiler: core.Compiler,
		Materializer: server.Materializer,
		createBlueprint: core.createBlueprint,
		isScaffoldError: core.isScaffoldError,
	}
}

function compilePlan(api, compiler) {
	const blueprint = api.createBlueprint('guides-retirement-proof', { src: ['core'] })
	const scaffolding = compiler.compile(blueprint, ['orchestration'])
	if (scaffolding.plan === undefined) {
		throw new Error(`The orchestration blueprint was blocked: ${JSON.stringify(scaffolding.questions)}`)
	}
	assert.deepEqual(scaffolding.plan.groups, ['orchestration'])
	assert.equal(
		scaffolding.plan.artifacts.some((artifact) => artifact.path === GUIDES_PATH),
		true,
		`The selected plan must carry ${GUIDES_PATH}`,
	)
	assert.equal(
		scaffolding.plan.artifacts.some((artifact) => artifact.path === RETIRED_PATH),
		false,
		`The selected plan must not own ${RETIRED_PATH}`,
	)
	return scaffolding.plan
}

function auditFixture(materializer, plan, target) {
	const audit = materializer.audit(plan, target)
	assert.deepEqual(audit.questions, [], 'Materializer audit must settle the fixture without questions')
	let retired
	for (const finding of audit.findings) {
		if (finding.path === RETIRED_PATH) retired = finding
		if (finding.path === CUSTOM_PATH) {
			assert.fail(`${CUSTOM_PATH} must stay outside the plan's foreign populations`)
		}
		if (finding.drift === 'foreign') {
			assert.equal(finding.path, RETIRED_PATH, 'No unrelated host or canon path may be foreign')
		}
	}
	assert.notEqual(retired, undefined, `Audit must discover ${RETIRED_PATH}`)
	assert.equal(retired.drift, 'foreign', `${RETIRED_PATH} must be foreign`)
	assert.equal(retired.group, 'orchestration', `${RETIRED_PATH} must belong to orchestration`)
	return audit
}

function expectTargetRefusal(api, action, message) {
	try {
		action()
	} catch (error) {
		assert.equal(api.isScaffoldError(error), true, 'Refusal must be a ScaffoldError')
		assert.equal(error.code, 'TARGET', 'Refusal must use TARGET')
		assert.match(error.message, message)
		return error
	}
	assert.fail('Materializer.remove unexpectedly accepted the fixture')
}

function assertPreserved(target, retiredBytes, customBytes) {
	assert.equal(readFileSync(join(target, RETIRED_PATH), 'utf8'), retiredBytes)
	assert.equal(readFileSync(join(target, CUSTOM_PATH), 'utf8'), customBytes)
}

function record(evidence, label, target, path, status) {
	const line = `case=${label} target=${target} path=${path} status=${status}`
	evidence.push(line)
	process.stdout.write(`${line}\n`)
}

function proveCleanTracked(context) {
	const fixture = createFixture(context.workspace, 'clean-tracked', true)
	const audit = auditFixture(context.materializer, context.plan, fixture.target)
	const worktree = readWorktree(context.workspace, fixture.target)
	assert.deepEqual(worktree.dirty, [])
	const result = context.materializer.remove(context.plan, audit, worktree, fixture.target)
	assert.deepEqual(result.removed, [RETIRED_PATH])
	assert.equal(existsSync(join(fixture.target, RETIRED_PATH)), false)
	assert.equal(readFileSync(join(fixture.target, CUSTOM_PATH), 'utf8'), CUSTOM_BYTES)
	const after = readWorktree(context.workspace, fixture.target)
	assert.equal(after.dirty.includes(RETIRED_PATH), true)
	record(context.evidence, 'clean-tracked', fixture.target, RETIRED_PATH, 'removed')
	record(context.evidence, 'clean-tracked', fixture.target, CUSTOM_PATH, 'preserved-tracked')
	record(context.evidence, 'clean-tracked', fixture.target, '.git/HEAD', `fixture-retained-${fixture.revision}`)
}

function proveUntracked(context) {
	const fixture = createFixture(context.workspace, 'untracked-ignored', false)
	const audit = auditFixture(context.materializer, context.plan, fixture.target)
	const worktree = readWorktree(context.workspace, fixture.target)
	assert.deepEqual(worktree.dirty, [])
	assert.equal(worktree.tracked.includes(RETIRED_PATH), false)
	const result = context.materializer.remove(context.plan, audit, worktree, fixture.target)
	assert.deepEqual(result.removed, [])
	assert.deepEqual(result.skipped, [RETIRED_PATH])
	assertPreserved(fixture.target, RETIRED_BYTES, CUSTOM_BYTES)
	record(context.evidence, 'untracked-ignored', fixture.target, RETIRED_PATH, 'preserved-untracked')
	record(context.evidence, 'untracked-ignored', fixture.target, CUSTOM_PATH, 'preserved-tracked')
	record(context.evidence, 'untracked-ignored', fixture.target, '.git/HEAD', `fixture-retained-${fixture.revision}`)
}

function proveDirty(context) {
	const fixture = createFixture(context.workspace, 'dirty-tree', true)
	const audit = auditFixture(context.materializer, context.plan, fixture.target)
	writeFixture(context.workspace, 'dirty-tree', CUSTOM_PATH, DIRTY_BYTES)
	const worktree = readWorktree(context.workspace, fixture.target)
	assert.equal(worktree.dirty.includes(CUSTOM_PATH), true)
	const error = expectTargetRefusal(
		context.api,
		() => context.materializer.remove(context.plan, audit, worktree, fixture.target),
		/carries uncommitted changes/u,
	)
	assertPreserved(fixture.target, RETIRED_BYTES, DIRTY_BYTES)
	record(context.evidence, 'dirty-tree', fixture.target, RETIRED_PATH, `preserved-refused-${error.code}`)
	record(context.evidence, 'dirty-tree', fixture.target, CUSTOM_PATH, 'preserved-dirty')
	record(context.evidence, 'dirty-tree', fixture.target, '.git/HEAD', `fixture-retained-${fixture.revision}`)
}

function proveMoved(context) {
	const fixture = createFixture(context.workspace, 'moved-after-audit', true)
	const audit = auditFixture(context.materializer, context.plan, fixture.target)
	const auditedWorktree = readWorktree(context.workspace, fixture.target)
	assert.deepEqual(auditedWorktree.dirty, [])
	writeFixture(context.workspace, 'moved-after-audit', RETIRED_PATH, MOVED_BYTES)
	const movedWorktree = readWorktree(context.workspace, fixture.target)
	assert.equal(movedWorktree.dirty.includes(RETIRED_PATH), true)
	const error = expectTargetRefusal(
		context.api,
		() => context.materializer.remove(context.plan, audit, auditedWorktree, fixture.target),
		/moved since its audit/u,
	)
	assertPreserved(fixture.target, MOVED_BYTES, CUSTOM_BYTES)
	record(
		context.evidence,
		'moved-after-audit',
		fixture.target,
		RETIRED_PATH,
		`preserved-refused-${error.code}`,
	)
	record(context.evidence, 'moved-after-audit', fixture.target, CUSTOM_PATH, 'preserved-tracked')
	record(
		context.evidence,
		'moved-after-audit',
		fixture.target,
		'.git/HEAD',
		`fixture-retained-${fixture.revision}`,
	)
}

function writeEvidence(workspace, evidence) {
	const path = resolveInside(workspace, 'evidence.log')
	writeFileSync(path, `${evidence.join('\n')}\n`, 'utf8')
	return path
}

async function main() {
	if (process.argv.length !== 3) {
		throw new Error('Usage: node prove.mjs <installed-or-built-scaffold-root>')
	}
	const scaffold = resolve(process.argv[2])
	const host = resolve(scaffold, 'dist', 'host')
	if (!existsSync(host) || !statSync(host).isDirectory()) {
		throw new Error(`The caller-supplied scaffold root carries no built host at ${host}`)
	}
	const workspace = mkdtempSync(join(tmpdir(), 'scaffold-guides-retirement-'))
	const evidence = []
	record(evidence, 'instrument', workspace, 'workspace', 'retained')
	let compiler
	let materializer
	try {
		const api = await loadScaffold(scaffold)
		compiler = new api.Compiler()
		materializer = new api.Materializer({ host })
		const plan = compilePlan(api, compiler)
		record(evidence, 'plan', workspace, GUIDES_PATH, 'selected-orchestration')
		const context = { api, evidence, materializer, plan, workspace }
		proveCleanTracked(context)
		proveUntracked(context)
		proveDirty(context)
		proveMoved(context)
		record(evidence, 'instrument', workspace, RETIRED_PATH, 'pass')
	} catch (error) {
		record(
			evidence,
			'instrument',
			workspace,
			RETIRED_PATH,
			`failed-${renderError(error).replaceAll(/\r?\n/gu, ' ')}`,
		)
		const evidencePath = writeEvidence(workspace, evidence)
		process.stderr.write(`evidence=${evidencePath}\n`)
		throw error
	} finally {
		if (materializer !== undefined) materializer.destroy()
		if (compiler !== undefined) compiler.destroy()
	}
	const evidencePath = writeEvidence(workspace, evidence)
	process.stdout.write(`evidence=${evidencePath}\n`)
}

function reportFailure(error) {
	process.stderr.write(`${renderError(error)}\n`)
	process.exitCode = 1
}

main().catch(reportFailure)
