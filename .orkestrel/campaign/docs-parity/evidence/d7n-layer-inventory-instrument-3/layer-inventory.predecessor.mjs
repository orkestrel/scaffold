import { createHash } from 'node:crypto'
import { access, lstat, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { pathToFileURL } from 'node:url'

export const PACKAGES = [
	'abort', 'agent', 'brief', 'browser', 'budget', 'codec', 'console', 'contract', 'csv',
	'database', 'emitter', 'form', 'guide', 'html', 'indexeddb', 'interpret', 'lsp', 'markdown',
	'mcp', 'middleware', 'msg', 'ndjson', 'ollama', 'pool', 'probe', 'process', 'program',
	'qualifier', 'queue', 'rater', 'reason', 'relation', 'router', 'scaffold', 'sea', 'server',
	'sqlite', 'sse', 'table', 'template', 'terminal', 'test', 'timeout', 'tool', 'toolbox',
	'websocket', 'worker', 'workflow', 'workspace',
]

export const MANIFEST_FIELDS = [
	'engines', 'os', 'cpu', 'exports', 'dependencies', 'devDependencies', 'peerDependencies',
	'peerDependenciesMeta', 'optionalDependencies', 'bundledDependencies', 'bundleDependencies',
	'overrides', 'packageManager',
]

export function value(input) {
	return input !== null && typeof input === 'object' && !Array.isArray(input)
}

export function message(error) {
	return error instanceof Error ? error.message : String(error)
}

export function selectManifest(manifest) {
	const selected = {}
	if (!value(manifest)) return selected
	for (const field of ['name', 'version', ...MANIFEST_FIELDS]) {
		if (Object.hasOwn(manifest, field)) selected[field] = manifest[field]
	}
	return selected
}

export function selectLock(entry) {
	const selected = {}
	if (!value(entry)) return selected
	for (const field of ['version', 'resolved', 'integrity', 'link', 'peer', 'optional', 'dev', 'engines', 'dependencies', 'devDependencies', 'peerDependencies', 'peerDependenciesMeta', 'optionalDependencies']) {
		if (Object.hasOwn(entry, field)) selected[field] = entry[field]
	}
	return selected
}

export function projectTree(node, expected, reasons = []) {
	if (!value(node)) return { valid: false, projection: { expected, failure: 'npm tree node was not an object' }, reasons: [...reasons, `${expected ?? 'npm root'} was not an object`] }
	const projected = {}
	if (typeof node.name === 'string') projected.name = node.name
	else if (expected !== undefined) projected.name = expected
	else reasons.push('npm root name is absent')
	if (expected !== undefined && projected.name !== expected) reasons.push(`${expected} node identity differs from npm dependency key`)
	for (const field of ['name', 'version', 'path', 'resolved', 'integrity', 'invalid', 'extraneous', 'missing', 'problems']) {
		if (Object.hasOwn(node, field)) projected[field] = node[field]
	}
	if (value(node.dependencies)) {
		const dependencies = {}
		for (const [name, dependency] of Object.entries(node.dependencies)) {
			const child = projectTree(dependency, name)
			dependencies[name] = child.projection
			reasons.push(...child.reasons)
		}
		projected.dependencies = dependencies
	}
	return { valid: reasons.length === 0, projection: projected, reasons }
}

export function sha256(bytes) {
	return createHash('sha256').update(bytes).digest('hex')
}

export function packagePath(root, name) {
	return join(root, name)
}

export function packageName(name) {
	return `@orkestrel/${name}`
}

export function captureOutput(target, chunk, state) {
	const bytes = Buffer.from(chunk)
	state.size += bytes.length
	if (state.size <= state.limit) {
		target.push(bytes)
		return false
	}
	else {
		state.overflow = true
		return true
	}
}

export async function terminateProcess(child) {
	if (process.platform !== 'win32' || child.pid === undefined) return { method: 'child.kill', result: child.kill() }
	return sleepResult('taskkill', ['/PID', String(child.pid), '/T', '/F'], { timeout: 10_000, limit: 1024 * 1024 })
}

export function sleepResult(command, args, options = {}) {
	return new Promise((resolveResult) => {
		const child = spawn(command, args, { cwd: options.cwd, shell: false, windowsHide: true })
		const stdout = []
		const stderr = []
		const state = { size: 0, timedout: false, overflow: false, limit: options.limit ?? 16 * 1024 * 1024, termination: undefined }
		const settle = (exit, signal) => resolveResult({ stdout: Buffer.concat(stdout).toString('utf8'), stderr: Buffer.concat(stderr).toString('utf8'), exit, signal, timedout: state.timedout, overflow: state.overflow, termination: state.termination })
		const timer = setTimeout(async () => {
			state.timedout = true
			state.termination = await terminateProcess(child)
			setTimeout(() => settle(undefined, undefined), 10_000)
		}, options.timeout ?? 30_000)
		child.stdout.on('data', (chunk) => {
			if (captureOutput(stdout, chunk, state)) void terminateProcess(child).then((result) => { state.termination = result })
		})
		child.stderr.on('data', (chunk) => {
			if (captureOutput(stderr, chunk, state)) void terminateProcess(child).then((result) => { state.termination = result })
		})
		child.on('error', (error) => {
			clearTimeout(timer)
			resolveResult({ stdout: '', stderr: message(error), exit: undefined, signal: undefined, timedout: state.timedout, overflow: state.overflow, termination: state.termination })
		})
		child.on('close', (exit, signal) => {
			clearTimeout(timer)
			settle(exit, signal)
		})
	})
}

export async function readJson(path) {
	const bytes = await readFile(path)
	return { json: JSON.parse(bytes.toString('utf8')) }
}

export async function digest(path) {
	try {
		const bytes = await readFile(path)
		return { path, sha256: sha256(bytes) }
	} catch (error) {
		return { path, failure: message(error) }
	}
}

export async function git(checkout) {
	const commands = {
		status: ['status', '--porcelain'],
		branch: ['branch', '--show-current'],
		head: ['rev-parse', 'HEAD'],
		origin: ['rev-parse', 'origin/main'],
		ancestor: ['merge-base', '--is-ancestor', 'origin/main', 'HEAD'],
	}
	const result = {}
	for (const [name, args] of Object.entries(commands)) result[name] = await sleepResult('git', ['-C', checkout, ...args])
	return result
}

export async function snapshot(checkout) {
	return {
		manifest: await digest(join(checkout, 'package.json')),
		lockfile: await digest(join(checkout, 'package-lock.json')),
		git: await git(checkout),
	}
}

export function matchingLocks(lockfile) {
	const selected = {}
	if (!value(lockfile) || !value(lockfile.packages)) return selected
	for (const [path, entry] of Object.entries(lockfile.packages)) {
		if (!value(entry)) continue
		const name = typeof entry.name === 'string' ? entry.name : path.includes('node_modules/@orkestrel/') ? `@orkestrel/${basename(path)}` : undefined
		if (typeof name === 'string' && name.startsWith('@orkestrel/')) selected[path] = { name, ...selectLock(entry) }
	}
	return selected
}

export async function attest(node, expected) {
	const name = value(node) && typeof node.name === 'string' ? node.name : expected
	if (typeof name !== 'string' || !name.startsWith('@orkestrel/')) return undefined
	if (!value(node) || typeof node.path !== 'string') return { expected: name, absence: 'unresolved npm node', valid: false }
	const manifest = join(node.path, 'package.json')
	const attestation = { expected: name, path: node.path, manifest, valid: false }
	try {
		const read = await readJson(manifest)
		attestation.package = selectManifest(read.json)
		if (attestation.package.name !== name || attestation.package.version !== node.version) {
			attestation.failure = 'installed manifest identity or version differs from npm node'
			return attestation
		}
		attestation.dist = {}
		for (const relative of ['dist/src/core/index.js', 'dist/src/server/index.js']) {
			const hash = await digest(join(node.path, relative))
			if (!Object.hasOwn(hash, 'failure')) attestation.dist[relative] = hash.sha256
		}
		attestation.valid = true
	} catch (error) {
		attestation.failure = message(error)
	}
	return attestation
}

export async function attestTree(node, expected, attestations = {}, reasons = []) {
	const item = await attest(node, expected)
	if (item !== undefined) {
		attestations[item.path ?? item.expected] = item
		if (!item.valid) reasons.push(item.failure ?? `${item.expected} was unresolved`)
	}
	if (value(node) && value(node.dependencies)) {
		for (const [name, child] of Object.entries(node.dependencies)) await attestTree(child, name, attestations, reasons)
	}
	return { attestations, valid: reasons.length === 0, reasons }
}

export async function npm(checkout, cli) {
	const result = await sleepResult(process.execPath, [cli, 'ls', '--all', '--json', '--long'], { cwd: checkout, timeout: 120_000, limit: 32 * 1024 * 1024 })
	let raw
	let projection
	let attestations = { valid: false, reasons: ['npm JSON was not parsed'] }
	try {
		raw = JSON.parse(result.stdout)
		projection = projectTree(raw)
		attestations = await attestTree(raw)
	} catch (error) {
		result.parse = message(error)
	}
	return { ...result, raw, projection, attestations, valid: result.exit === 0 && result.signal === null && !result.timedout && !result.overflow && result.parse === undefined && projection?.valid === true && attestations.valid }
}

export async function packument(name) {
	const controller = new AbortController()
	const timer = setTimeout(() => controller.abort(), 30_000)
	const url = `https://registry.npmjs.org/${encodeURIComponent(name)}`
	try {
		const response = await fetch(url, { headers: { accept: 'application/vnd.npm.install-v1+json' }, signal: controller.signal })
		const payload = await response.json()
		if (!response.ok) return { name, url, status: response.status, timestamp: new Date().toISOString(), failure: `registry returned HTTP ${response.status}`, valid: false }
		if (!value(payload)) return { name, url, status: response.status, timestamp: new Date().toISOString(), failure: 'registry payload was not an object', valid: false }
		const latest = value(payload['dist-tags']) && typeof payload['dist-tags'].latest === 'string' ? payload['dist-tags'].latest : undefined
		const release = latest !== undefined && value(payload.versions) ? payload.versions[latest] : undefined
		const manifest = selectManifest(release)
		if (value(release) && value(release.dist)) {
			if (typeof release.dist.integrity === 'string') manifest.integrity = release.dist.integrity
			if (typeof release.dist.shasum === 'string') manifest.shasum = release.dist.shasum
		}
		const valid = latest !== undefined && value(release) && manifest.name === name && manifest.version === latest
		return { name, url, status: response.status, timestamp: new Date().toISOString(), tags: payload['dist-tags'], versions: value(payload.versions) ? Object.keys(payload.versions) : [], latest, manifest, valid, reasons: valid ? [] : ['registry latest tag does not name an available expected manifest'] }
	} catch (error) {
		return { name, url, timestamp: new Date().toISOString(), failure: message(error), valid: false }
	} finally {
		clearTimeout(timer)
	}
}

export function validateGit(reading) {
	const reasons = []
	for (const name of ['status', 'branch', 'head', 'origin']) {
		const command = reading[name]
		if (!value(command) || command.exit !== 0 || command.signal !== null || command.timedout || command.overflow) reasons.push(`git ${name} did not complete successfully`)
	}
	const ancestor = reading.ancestor
	if (!value(ancestor) || ![0, 1].includes(ancestor.exit) || ancestor.signal !== null || ancestor.timedout || ancestor.overflow) reasons.push('git ancestor did not return a valid ancestry reading')
	return { valid: reasons.length === 0, ancestor: ancestor?.exit === 0, reasons }
}

export function validateLocal(manifest, lockfile, expected) {
	const reasons = []
	if (!value(manifest) || manifest.name !== expected || typeof manifest.version !== 'string') reasons.push('manifest identity or version is invalid')
	if (!value(lockfile) || !value(lockfile.packages) || !value(lockfile.packages[''])) reasons.push('lockfile root is invalid')
	return { valid: reasons.length === 0, reasons }
}

export function evaluateCompleteness(reading) {
	const reasons = []
	for (const name of ['local', 'git', 'npm', 'attestations', 'registry']) {
		const item = reading[name]
		if (!value(item) || item.valid !== true) reasons.push(...(value(item) && Array.isArray(item.reasons) ? item.reasons : [`${name} is incomplete`]))
	}
	if (reading.changed) reasons.push('package bytes or git status changed during collection')
	return { complete: reasons.length === 0, reasons }
}

export async function collect(root, output, cli) {
	const summary = { root, output, npm: cli, cachedOrigin: 'origin/main is a cached reading; this instrument does not fetch or refresh it.', packages: {} }
	for (const short of PACKAGES) {
		const checkout = join(root, short)
		const record = { package: `@orkestrel/${short}`, checkout, complete: true }
		try {
			const before = await snapshot(checkout)
			const manifest = await readJson(join(checkout, 'package.json'))
			const lockfile = await readJson(join(checkout, 'package-lock.json'))
			record.local = { ...validateLocal(manifest.json, lockfile.json, record.package), manifest: selectManifest(manifest.json), lockfile: { root: selectLock(value(lockfile.json) && value(lockfile.json.packages) ? lockfile.json.packages[''] : undefined), packages: matchingLocks(lockfile.json) } }
			record.before = before
			record.git = validateGit(before.git)
			record.npm = await npm(checkout, cli)
			record.registry = await packument(record.package)
			record.after = await snapshot(checkout)
			record.changed = JSON.stringify(record.before) !== JSON.stringify(record.after)
			const completeness = evaluateCompleteness({ ...record, attestations: record.npm.attestations, changed: record.changed || before.manifest.failure !== undefined || before.lockfile.failure !== undefined })
			record.complete = completeness.complete
			record.reasons = completeness.reasons
		} catch (error) {
			record.failure = message(error)
			record.complete = false
		}
		const target = join(output, `${short}.json`)
		await writeFile(target, `${JSON.stringify(record, undefined, '\t')}\n`, 'utf8')
		summary.packages[short] = { path: pathToFileURL(target).href, complete: record.complete }
	}
	summary.complete = Object.values(summary.packages).every((entry) => entry.complete)
	const path = join(output, 'summary.json')
	await writeFile(path, `${JSON.stringify(summary, undefined, '\t')}\n`, 'utf8')
	return { path, complete: summary.complete }
}

export async function validateOutput(output) {
	try {
		await lstat(output)
		throw new Error(`output directory already exists: ${output}`)
	} catch (error) {
		if (!(error instanceof Error) || error.code !== 'ENOENT') throw error
	}
}

export async function validate(root, output, cli) {
	for (const path of [root, cli]) await access(path)
	if (!(await stat(root)).isDirectory()) throw new Error(`fleet root is not a directory: ${root}`)
	if (!(await stat(cli)).isFile()) throw new Error(`npm CLI path is not a file: ${cli}`)
	await validateOutput(output)
}

export async function main(args) {
	if (args.length !== 3) throw new Error('usage: node layer-inventory.mjs <fleet-root> <output-directory> <npm-cli-path>')
	const [rootArg, outputArg, cliArg] = args
	const root = resolve(rootArg)
	const output = resolve(outputArg)
	const cli = resolve(cliArg)
	await validate(root, output, cli)
	await mkdir(output)
	const result = await collect(root, output, cli)
	console.log(result.path)
	console.log(result.complete ? 'complete' : 'incomplete')
	process.exitCode = result.complete ? 0 : 1
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	main(process.argv.slice(2)).catch((error) => {
		console.error(message(error))
		process.exitCode = 1
	})
}
