import { spawn } from 'node:child_process'
import { closeSync, existsSync, mkdirSync, openSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readIdentity, readSnapshot, requireAdoption, requireSnapshot, requireTarget } from './adopt-roughnotes-registry.mjs'

const EVIDENCE_ROOT = 'C:\\Users\\mikes\\WebstormProjects\\scaffold\\tmp\\units\\roughnotes-registry-gates-evidence'
const CONTROL_CHILD = 'C:\\Users\\mikes\\WebstormProjects\\scaffold\\tmp\\units\\roughnotes-registry-gates-author-evidence\\control-child.mjs'
const RECOVERY_ROOT = 'C:\\Users\\mikes\\WebstormProjects\\scaffold\\tmp\\recovery\\roughnotes'
const INTEGRITY = 'sha512-'
const GATES = ['format:check', 'lint:check', 'check', 'build', 'test']
const NODE_PATH = 'C:\\Users\\mikes\\scoop\\apps\\nodejs-lts\\current\\node.exe'
const NPM_ENTRY = 'C:\\Users\\mikes\\scoop\\apps\\nodejs-lts\\current\\node_modules\\npm\\bin\\npm-cli.js'

function requireRun(run) {
	if (typeof run !== 'string' || !/^[a-z][a-z0-9-]{0,79}$/.test(run)) throw new Error('Supply a bounded run name')
}

function writeRecord(directory, name, value) {
	writeFileSync(join(directory, name), `${JSON.stringify(value, undefined, 2)}\n`, { flag: 'wx' })
}

function readRegistryIntegrity(identity) {
	const integrity = identity.lock.scaffold?.integrity
	if (typeof integrity !== 'string' || !integrity.startsWith(INTEGRITY)) throw new Error('Scaffold lock integrity is unavailable')
	return integrity
}

function createDirectory(run) {
	mkdirSync(EVIDENCE_ROOT, { recursive: true })
	const directory = join(EVIDENCE_ROOT, run)
	if (existsSync(directory)) throw new Error('Run evidence already exists; refusing replacement')
	mkdirSync(directory)
	return directory
}

function createEnvironment(capture) {
	const environment = { ...process.env }
	delete environment.CAPTURE
	if (capture) environment.CAPTURE = '1'
	return environment
}

async function runChild(directory, name, script, capture) {
	const stdoutPath = join(directory, `${name}.stdout.log.txt`)
	const stderrPath = join(directory, `${name}.stderr.log.txt`)
	const stdout = openSync(stdoutPath, 'wx')
	const stderr = openSync(stderrPath, 'wx')
	const started = new Date().toISOString()
	const clock = performance.now()
	const argumentsList = script === CONTROL_CHILD ? [CONTROL_CHILD] : [NPM_ENTRY, 'run', script]
	try {
		const result = await new Promise((resolveChild, rejectChild) => {
			const child = spawn(NODE_PATH, argumentsList, { cwd: RECOVERY_ROOT, env: createEnvironment(capture), shell: false, stdio: ['ignore', stdout, stderr], windowsHide: true })
			child.once('error', rejectChild)
			child.once('close', (exit, signal) => resolveChild({ pid: child.pid, exit, signal }))
		})
		const record = { name, script, capture, executable: NODE_PATH, arguments: argumentsList, started, ended: new Date().toISOString(), elapsed: performance.now() - clock, ...result, stdout: stdoutPath, stderr: stderrPath }
		writeRecord(directory, `${name}.json`, record)
		return record
	} finally {
		closeSync(stdout)
		closeSync(stderr)
	}
}

async function runControl(directory) {
	const child = await runChild(directory, 'control', CONTROL_CHILD, false)
	const successor = { name: 'successor', skipped: child.exit !== 0 || child.signal !== null }
	writeRecord(directory, 'successor.json', successor)
	if (child.exit !== 7 || child.signal !== null || !successor.skipped) throw new Error('Failing-child control did not record exit 7 and skip its successor')
}

export async function execute(run) {
	requireRun(run)
	requireTarget()
	const directory = createDirectory(run)
	let before
	try {
		const identity = readIdentity()
		const integrity = readRegistryIntegrity(identity)
		requireAdoption(identity, integrity)
		before = { source: readSnapshot(), identity }
		writeRecord(directory, 'before.json', before)
		for (const script of GATES) {
			const record = await runChild(directory, script.replace(':', '-'), script, false)
			if (record.exit !== 0 || record.signal !== null) {
				const after = { source: readSnapshot(), identity: readIdentity() }
				writeRecord(directory, 'after.json', after)
				requireSnapshot(before.source, after.source)
				requireAdoption(after.identity, readRegistryIntegrity(after.identity))
				writeRecord(directory, 'terminal.json', { success: false, failed: script, exit: record.exit, signal: record.signal, time: new Date().toISOString() })
				return typeof record.exit === 'number' && record.exit > 0 ? record.exit : 1
			}
		}
		const capture = await runChild(directory, 'test-journey', 'test:journey', true)
		const after = { source: readSnapshot(), identity: readIdentity() }
		writeRecord(directory, 'after.json', after)
		requireSnapshot(before.source, after.source)
		requireAdoption(after.identity, readRegistryIntegrity(after.identity))
		if (capture.exit !== 0 || capture.signal !== null) {
			writeRecord(directory, 'terminal.json', { success: false, failed: 'test:journey', exit: capture.exit, signal: capture.signal, time: new Date().toISOString() })
			return typeof capture.exit === 'number' && capture.exit > 0 ? capture.exit : 1
		}
		writeRecord(directory, 'terminal.json', { success: true, gates: GATES, capture: 'test:journey', time: new Date().toISOString() })
		return 0
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error)
		writeRecord(directory, 'terminal.json', { success: false, message, time: new Date().toISOString() })
		return 1
	}
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
	if (process.argv[2] === '--control' && process.argv.length === 4) {
		const directory = createDirectory(process.argv[3])
		await runControl(directory)
	} else if (process.argv.length === 3) {
		process.exitCode = await execute(process.argv[2])
	} else {
		process.stderr.write(`Usage: ${fileURLToPath(import.meta.url)} RUN | --control RUN\n`)
		process.exitCode = 1
	}
}
