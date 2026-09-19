import { createHash } from 'node:crypto'
import { closeSync, copyFileSync, existsSync, lstatSync, mkdirSync, openSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const CANONICAL_ROOT = 'C:\\Users\\mikes\\WebstormProjects\\scaffold'
const RECOVERY_ROOT = join(CANONICAL_ROOT, 'tmp', 'recovery', 'roughnotes')
const EXPECTED_BRANCH = 'recovery/journey-20260918'
const EXPECTED_HEAD = '86a9ef6bc4620fdf36c47af1f4c530693357eb86'
const NODE_PATH = 'C:\\Users\\mikes\\scoop\\apps\\nodejs-lts\\current\\node.exe'
const NPM_ENTRY = join(dirname(NODE_PATH), 'node_modules', 'npm', 'bin', 'npm-cli.js')
const EVIDENCE_ROOT = join(CANONICAL_ROOT, 'tmp', 'units', 'roughnotes-registry-adoption-evidence')
const REGISTRY_URL = 'https://registry.npmjs.org/@orkestrel%2fscaffold/0.0.75'
const INSTALL_ARGUMENTS = ['install', '--save-dev', '@orkestrel/scaffold@^0.0.75', '@orkestrel/test@^0.0.18', '--ignore-scripts', '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org']

export function requireRegistry(record, version, integrity) {
	if (record === null || typeof record !== 'object' || record.name !== '@orkestrel/scaffold' || record.version !== version || record.dist === null || typeof record.dist !== 'object' || record.dist.integrity !== integrity) {
		throw new Error('Registry name, version, or integrity mismatch')
	}
	return record
}

export function requireSnapshot(before, after) {
	if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('Protected source or deletion snapshot changed')
}

export function matchesSensitivePath(name) {
	return name.split('/').some((segment) => segment === '.codex' || segment === '.git' || segment === '.npmrc' || segment === '.mcp.json' || segment.startsWith('.env') || /^(?:auth\.json|credentials(?:\..*)?|.*\.(?:pem|key|p12|pfx))$/i.test(segment))
}

export function readGit(argumentsList) {
	const result = spawnSync('git', ['-C', RECOVERY_ROOT, ...argumentsList], { encoding: 'utf8', windowsHide: true, timeout: 30000, maxBuffer: 8 * 1024 * 1024 })
	if (result.error || result.status !== 0) throw new Error(`Git reading failed: ${result.error?.message ?? result.stderr}`)
	return result.stdout
}

export function requireTarget() {
	if (process.platform !== 'win32') throw new Error('This instrument requires the dispatched Windows host')
	if (resolve(realpathSync(RECOVERY_ROOT)) !== resolve(RECOVERY_ROOT)) throw new Error('Unexpected physical recovery target')
	if (resolve(realpathSync(readGit(['rev-parse', '--show-toplevel']).trim())) !== resolve(RECOVERY_ROOT)) throw new Error('Unexpected Git target')
	if (readGit(['branch', '--show-current']).trim() !== EXPECTED_BRANCH) throw new Error('Unexpected recovery branch')
	if (readGit(['rev-parse', 'HEAD']).trim() !== EXPECTED_HEAD) throw new Error('Unexpected recovery HEAD')
	if (!lstatSync(NODE_PATH).isFile() || !lstatSync(NPM_ENTRY).isFile()) throw new Error('Node executable or npm JavaScript entry unavailable')
}

export function resolveSource(name) {
	const target = resolve(RECOVERY_ROOT, name)
	const location = relative(resolve(RECOVERY_ROOT), target)
	if (isAbsolute(location) || location === '..' || location.startsWith(`..${sep}`)) throw new Error('Source path leaves recovery target')
	return target
}

export function readSnapshot() {
	const names = [...new Set([...readGit(['ls-files', '-z']).split('\0').filter((name) => name.length > 0), 'tests/setupBrowser.test.ts'])].sort()
	const entries = []
	for (const name of names) {
		if (name === 'package.json' || name === 'package-lock.json') continue
		if (matchesSensitivePath(name)) {
			entries.push({ path: name, excluded: true })
			continue
		}
		const target = resolveSource(name)
		if (!existsSync(target)) {
			entries.push({ path: name, absent: true })
			continue
		}
		if (!lstatSync(target).isFile()) throw new Error(`Protected path is not a regular file: ${name}`)
		const physical = relative(realpathSync(RECOVERY_ROOT), realpathSync(target))
		if (isAbsolute(physical) || physical === '..' || physical.startsWith(`..${sep}`)) throw new Error(`Protected path resolves outside recovery: ${name}`)
		entries.push({ path: name, sha256: createHash('sha256').update(readFileSync(target)).digest('hex') })
	}
	return entries
}

export function readIdentity() {
	const manifest = JSON.parse(readFileSync(join(RECOVERY_ROOT, 'package.json'), 'utf8'))
	const lock = JSON.parse(readFileSync(join(RECOVERY_ROOT, 'package-lock.json'), 'utf8'))
	const scaffold = JSON.parse(readFileSync(join(RECOVERY_ROOT, 'node_modules', '@orkestrel', 'scaffold', 'package.json'), 'utf8'))
	const test = JSON.parse(readFileSync(join(RECOVERY_ROOT, 'node_modules', '@orkestrel', 'test', 'package.json'), 'utf8'))
	return {
		manifest: { name: manifest.name, private: manifest.private, scaffold: manifest.devDependencies?.['@orkestrel/scaffold'], test: manifest.devDependencies?.['@orkestrel/test'] },
		lock: { root: lock.packages?.[''], scaffold: lock.packages?.['node_modules/@orkestrel/scaffold'], test: lock.packages?.['node_modules/@orkestrel/test'] },
		installed: { scaffold: { name: scaffold.name, version: scaffold.version, bin: scaffold.bin }, test: { name: test.name, version: test.version } },
		branch: readGit(['branch', '--show-current']).trim(),
		head: readGit(['rev-parse', 'HEAD']).trim(),
		status: readGit(['status', '--short'])
	}
}

export function requireAdoption(identity, integrity) {
	if (identity.manifest.name !== 'roughnotes' || identity.manifest.private !== true || identity.manifest.scaffold !== '^0.0.75' || identity.manifest.test !== '^0.0.18') throw new Error('Manifest identity or ranges mismatch')
	if (identity.lock.root?.devDependencies?.['@orkestrel/scaffold'] !== '^0.0.75' || identity.lock.root?.devDependencies?.['@orkestrel/test'] !== '^0.0.18') throw new Error('Lock root ranges mismatch')
	for (const [name, version] of [['scaffold', '0.0.75'], ['test', '0.0.18']]) {
		const locked = identity.lock[name]
		const installed = identity.installed[name]
		if (locked?.link === true || locked?.version !== version || locked?.resolved !== `https://registry.npmjs.org/@orkestrel/${name}/-/${name}-${version}.tgz`) throw new Error(`Registry lock resolution mismatch: ${name}`)
		if (installed.name !== `@orkestrel/${name}` || installed.version !== version) throw new Error(`Installed package identity mismatch: ${name}`)
		const directory = join(RECOVERY_ROOT, 'node_modules', '@orkestrel', name)
		if (!lstatSync(directory).isDirectory() || lstatSync(directory).isSymbolicLink() || resolve(realpathSync(directory)) !== resolve(directory)) throw new Error(`Installed package uses linked resolution: ${name}`)
	}
	if (identity.lock.scaffold.integrity !== integrity) throw new Error('Scaffold lock integrity mismatch')
}

export async function readRegistry() {
	const response = await fetch(REGISTRY_URL, { redirect: 'error', signal: AbortSignal.timeout(30000), headers: { accept: 'application/json' } })
	if (!response.ok) throw new Error(`Exact registry release unavailable: HTTP ${response.status}`)
	const reader = response.body?.getReader()
	if (!reader) throw new Error('Registry response has no body')
	const chunks = []
	let size = 0
	try {
		while (true) {
			const result = await reader.read()
			if (result.done) break
			size += result.value.byteLength
			if (size > 1024 * 1024) throw new Error('Registry response exceeds byte limit')
			chunks.push(Buffer.from(result.value))
		}
	} finally {
		await reader.cancel()
	}
	return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

export function writeEvidence(directory, name, record) {
	writeFileSync(join(directory, name), `${JSON.stringify(record, undefined, 2)}\n`, { flag: 'wx' })
}

export function readManifests() {
	return ['package.json', 'package-lock.json'].map((name) => ({ path: name, sha256: createHash('sha256').update(readFileSync(join(RECOVERY_ROOT, name))).digest('hex') }))
}

export async function executeInstall(directory) {
	const stdout = openSync(join(directory, 'npm.stdout.log.txt'), 'wx')
	let stderr
	try {
		stderr = openSync(join(directory, 'npm.stderr.log.txt'), 'wx')
		return await new Promise((resolveExit, rejectExit) => {
			const child = spawn(NODE_PATH, [NPM_ENTRY, ...INSTALL_ARGUMENTS], { cwd: RECOVERY_ROOT, shell: false, windowsHide: true, stdio: ['ignore', stdout, stderr] })
			console.log(`npm PID ${child.pid}`)
			child.once('error', rejectExit)
			child.once('close', (code, signal) => resolveExit({ code, signal, pid: child.pid }))
		})
	} finally {
		closeSync(stdout)
		if (stderr !== undefined) closeSync(stderr)
	}
}

export async function executeAdoption(version, integrity, run) {
	let directory
	let before
	let install
	let mutated = false
	try {
		if (version !== '0.0.75' || typeof integrity !== 'string' || !/^sha512-[A-Za-z0-9+/]{86}==$/.test(integrity) || typeof run !== 'string' || !/^[a-z][a-z0-9-]{0,79}$/.test(run)) throw new Error('Supply version 0.0.75, verified sha512 integrity, and a bounded run name')
		requireTarget()
		const destination = join(EVIDENCE_ROOT, run)
		if (existsSync(destination)) throw new Error('Run evidence already exists; refusing replacement')
		mkdirSync(destination)
		directory = destination
		const registry = await readRegistry()
		writeEvidence(directory, 'registry.json', registry)
		requireRegistry(registry, version, integrity)
		before = { identity: readIdentity(), source: readSnapshot(), manifests: readManifests() }
		if (before.identity.manifest.name !== 'roughnotes' || before.identity.manifest.private !== true) throw new Error('Unexpected recovery package identity')
		writeEvidence(directory, 'before.json', before)
		copyFileSync(join(RECOVERY_ROOT, 'package.json'), join(directory, 'package.before.json'), 1)
		copyFileSync(join(RECOVERY_ROOT, 'package-lock.json'), join(directory, 'package-lock.before.json'), 1)
		writeEvidence(directory, 'command.json', { executable: NODE_PATH, entry: NPM_ENTRY, arguments: INSTALL_ARGUMENTS, target: RECOVERY_ROOT, integrity, version })
		requireTarget()
		requireSnapshot(before.source, readSnapshot())
		requireSnapshot(before.manifests, readManifests())
		mutated = true
		install = await executeInstall(directory)
		writeEvidence(directory, 'npm.exit.json', install)
		const after = { identity: readIdentity(), source: readSnapshot() }
		writeEvidence(directory, 'after.json', after)
		requireSnapshot(before.source, after.source)
		if (install.code !== 0) throw new Error(`npm failed with native exit ${install.code}; partial state retained`)
		requireTarget()
		requireAdoption(after.identity, integrity)
		writeEvidence(directory, 'terminal.json', { success: true, mutated, install, version, integrity, time: new Date().toISOString() })
		console.log(`Registry adoption succeeded; evidence ${directory}`)
		return 0
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error)
		if (directory) {
			try {
				writeEvidence(directory, 'source.after.json', readSnapshot())
			} catch (observation) {
				writeEvidence(directory, 'source-reading-failure.json', { message: observation instanceof Error ? observation.message : String(observation) })
			}
			try {
				if (!existsSync(join(directory, 'after.json'))) writeEvidence(directory, 'after.json', { identity: readIdentity(), source: readSnapshot() })
			} catch (observation) {
				writeEvidence(directory, 'after-reading-failure.json', { message: observation instanceof Error ? observation.message : String(observation) })
			}
			writeEvidence(directory, 'terminal.json', { success: false, mutated, install, message, time: new Date().toISOString(), rollback: false })
		}
		console.error(`Registry adoption refused or failed: ${message}; evidence ${directory ?? 'not created'}`)
		return typeof install?.code === 'number' && install.code > 0 ? install.code : 1
	}
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
	if (process.argv.length !== 5) {
		console.error(`Usage: ${fileURLToPath(import.meta.url)} VERSION VERIFIED_INTEGRITY RUN`)
		process.exitCode = 1
	} else {
		process.exitCode = await executeAdoption(process.argv[2], process.argv[3], process.argv[4])
	}
}
