import { createHash } from 'node:crypto'
import { access, lstat, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { execute } from '@orkestrel/process/server'

export const PACKAGES = Object.freeze([
	'abort',
	'agent',
	'brief',
	'browser',
	'budget',
	'codec',
	'console',
	'contract',
	'csv',
	'database',
	'emitter',
	'form',
	'guide',
	'html',
	'indexeddb',
	'interpret',
	'lsp',
	'markdown',
	'mcp',
	'middleware',
	'msg',
	'ndjson',
	'ollama',
	'pool',
	'probe',
	'process',
	'program',
	'qualifier',
	'queue',
	'rater',
	'reason',
	'relation',
	'router',
	'scaffold',
	'sea',
	'server',
	'sqlite',
	'sse',
	'table',
	'template',
	'terminal',
	'test',
	'timeout',
	'tool',
	'toolbox',
	'websocket',
	'worker',
	'workflow',
	'workspace',
])

export const MANIFEST_FIELDS = Object.freeze([
	'engines',
	'os',
	'cpu',
	'exports',
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'optionalDependencies',
	'bundledDependencies',
	'bundleDependencies',
	'overrides',
	'packageManager',
])

export const DEPENDENCY_FIELDS = Object.freeze([
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'optionalDependencies',
	'overrides',
])

export const LOCK_FIELDS = Object.freeze([
	'version',
	'resolved',
	'integrity',
	'link',
	'peer',
	'optional',
	'dev',
	'engines',
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'optionalDependencies',
])

export const NPM_FIELDS = Object.freeze([
	'name',
	'version',
	'path',
	'resolved',
	'integrity',
	'invalid',
	'extraneous',
	'missing',
	'optional',
	'problems',
])

export const DIST_PATHS = Object.freeze(['dist/src/core/index.js', 'dist/src/server/index.js'])

export const GIT_COMMANDS = Object.freeze({
	status: Object.freeze(['status', '--porcelain']),
	branch: Object.freeze(['branch', '--show-current']),
	head: Object.freeze(['rev-parse', 'HEAD']),
	origin: Object.freeze(['rev-parse', 'origin/main']),
	ancestor: Object.freeze(['merge-base', '--is-ancestor', 'origin/main', 'HEAD']),
})

export const COMPLETENESS_COMPONENTS = Object.freeze([
	'local',
	'git',
	'npm',
	'attestations',
	'registry',
	'drift',
])

export function isRecord(input) {
	return input !== null && typeof input === 'object' && !Array.isArray(input)
}

export function describeError(error) {
	return error instanceof Error ? error.message : String(error)
}

export function selectManifest(manifest) {
	const selected = {}
	if (!isRecord(manifest)) return selected
	for (const field of ['name', 'version', ...MANIFEST_FIELDS]) {
		if (Object.hasOwn(manifest, field)) selected[field] = manifest[field]
	}
	return selected
}

export function selectLock(entry) {
	const selected = {}
	if (!isRecord(entry)) return selected
	for (const field of LOCK_FIELDS) {
		if (Object.hasOwn(entry, field)) selected[field] = entry[field]
	}
	return selected
}

export function validateDependencyMaps(subject, manifest) {
	const reasons = []
	if (!isRecord(manifest)) return { valid: false, reasons: [`${subject} was not an object`] }
	for (const field of DEPENDENCY_FIELDS) {
		if (Object.hasOwn(manifest, field) && !isRecord(manifest[field])) {
			reasons.push(`${subject} ${field} was not an object`)
		}
	}
	return { valid: reasons.length === 0, reasons }
}

export function validateManifestReading(manifest, expected, version) {
	const reasons = []
	if (!isRecord(manifest)) return { valid: false, reasons: ['manifest was not an object'] }
	if (manifest.name !== expected) reasons.push(`manifest identity differs from ${expected}`)
	if (typeof manifest.version !== 'string' || manifest.version.length === 0) {
		reasons.push('manifest version is invalid')
	} else if (version !== undefined && manifest.version !== version) {
		reasons.push(`manifest version differs from ${version}`)
	}
	const maps = validateDependencyMaps('manifest', manifest)
	reasons.push(...maps.reasons)
	return { valid: reasons.length === 0, reasons }
}

export function projectNpmTree(node, expected, inherited = []) {
	const reasons = [...inherited]
	if (!isRecord(node)) {
		return {
			valid: false,
			projection: { expected, failure: 'npm tree node was not an object' },
			reasons: [...reasons, `${expected ?? 'npm root'} was not an object`],
		}
	}
	const projection = {}
	const name = typeof node.name === 'string' && node.name.length > 0 ? node.name : expected
	if (name === undefined) reasons.push('npm root name is absent')
	else projection.name = name
	if (expected !== undefined && name !== expected) {
		reasons.push(`${expected} node identity differs from npm dependency key`)
	}
	for (const field of NPM_FIELDS) {
		if (Object.hasOwn(node, field) && field !== 'name') projection[field] = node[field]
	}
	const optionalAbsence = node.missing === true && node.optional === true
	if (!optionalAbsence && (typeof node.version !== 'string' || node.version.length === 0)) {
		reasons.push(`${name ?? expected ?? 'npm root'} version is absent`)
	}
	if (!optionalAbsence && (typeof node.path !== 'string' || node.path.length === 0)) {
		reasons.push(`${name ?? expected ?? 'npm root'} path is absent`)
	}
	if (Object.hasOwn(node, 'dependencies')) {
		if (!isRecord(node.dependencies)) {
			reasons.push(`${name ?? expected ?? 'npm root'} dependencies was not an object`)
		} else {
			const dependencies = {}
			for (const [dependencyName, dependency] of Object.entries(node.dependencies)) {
				const child = projectNpmTree(dependency, dependencyName)
				dependencies[dependencyName] = child.projection
				reasons.push(...child.reasons)
			}
			projection.dependencies = dependencies
		}
	}
	return { valid: reasons.length === 0, projection, reasons }
}

export function computeSHA256(bytes) {
	return createHash('sha256').update(bytes).digest('hex')
}

export async function executeCommand(command, arguments_, options = {}) {
	try {
		const result = await execute(
			{ file: command, arguments: arguments_ },
			{
				workspace: options.cwd,
				timeout: options.timeout ?? 30_000,
				limit: options.limit ?? 16 * 1024 * 1024,
				strict: false,
			},
		)
		const observed = result.code !== null || result.signal !== null
		return {
			stdout: result.stdout,
			stderr: result.stderr,
			exit: result.code,
			signal: result.signal,
			timedout: result.expired,
			overflow: result.truncated,
			failed: result.failed,
			termination: {
				requested: result.expired || result.aborted,
				observed,
				exit: result.code,
				signal: result.signal,
			},
		}
	} catch (error) {
		return {
			stdout: '',
			stderr: describeError(error),
			exit: null,
			signal: null,
			timedout: false,
			overflow: false,
			failed: true,
			termination: { requested: false, observed: false, exit: null, signal: null },
		}
	}
}

export async function readJSON(path) {
	const bytes = await readFile(path)
	return { json: JSON.parse(bytes.toString('utf8')) }
}

export async function digestFile(path) {
	try {
		const bytes = await readFile(path)
		return { path, sha256: computeSHA256(bytes) }
	} catch (error) {
		return { path, failure: describeError(error) }
	}
}

export async function digestOptionalFile(path) {
	try {
		const bytes = await readFile(path)
		return { path, sha256: computeSHA256(bytes) }
	} catch (error) {
		if (error instanceof Error && error.code === 'ENOENT') return { path, absent: true }
		return { path, failure: describeError(error) }
	}
}

export async function readGitReading(checkout) {
	const reading = {}
	for (const [name, arguments_] of Object.entries(GIT_COMMANDS)) {
		reading[name] = await executeCommand('git', ['-C', checkout, ...arguments_])
	}
	return reading
}

export async function readSnapshot(checkout) {
	return {
		manifest: await digestFile(join(checkout, 'package.json')),
		lockfile: await digestFile(join(checkout, 'package-lock.json')),
		git: await readGitReading(checkout),
	}
}

export function inferLockPathName(path) {
	const match = /(?:^|\/)node_modules\/@orkestrel\/([^/]+)$/.exec(path)
	return match === null ? undefined : `@orkestrel/${match[1]}`
}

export function inferLockPackageName(path, entry) {
	const declared = isRecord(entry) && typeof entry.name === 'string' ? entry.name : undefined
	if (declared?.startsWith('@orkestrel/')) return declared
	return inferLockPathName(path)
}

export function selectOrkestrelLocks(lockfile) {
	const selected = {}
	if (!isRecord(lockfile) || !isRecord(lockfile.packages)) return selected
	for (const [path, entry] of Object.entries(lockfile.packages)) {
		if (!isRecord(entry)) continue
		const name = inferLockPackageName(path, entry)
		if (typeof name === 'string' && name.startsWith('@orkestrel/')) {
			selected[path] = {
				name,
				...(typeof entry.name === 'string' && entry.name !== name ? { declared: entry.name } : {}),
				...selectLock(entry),
			}
		}
	}
	return selected
}

export function validateOrkestrelLocks(lockfile) {
	const reasons = []
	if (!isRecord(lockfile) || !isRecord(lockfile.packages)) {
		return { valid: false, reasons: ['lockfile packages map is invalid'] }
	}
	for (const [path, entry] of Object.entries(lockfile.packages)) {
		const name = inferLockPackageName(path, entry)
		if (typeof name !== 'string' || !name.startsWith('@orkestrel/')) continue
		if (!isRecord(entry)) {
			reasons.push(`lockfile entry ${path} was not an object`)
			continue
		}
		if (typeof entry.name === 'string' && entry.name !== name) {
			reasons.push(`lockfile entry ${path} identity differs from its node_modules path`)
		}
		const maps = validateDependencyMaps(`lockfile entry ${path}`, entry)
		reasons.push(...maps.reasons)
	}
	return { valid: reasons.length === 0, reasons }
}

export async function readLocalPackage(checkout, expected) {
	const reasons = []
	let manifest
	let lockfile
	try {
		manifest = (await readJSON(join(checkout, 'package.json'))).json
	} catch (error) {
		reasons.push(`manifest could not be read: ${describeError(error)}`)
	}
	try {
		lockfile = (await readJSON(join(checkout, 'package-lock.json'))).json
	} catch (error) {
		reasons.push(`lockfile could not be read: ${describeError(error)}`)
	}
	const manifestValidation = validateManifestReading(manifest, expected)
	reasons.push(...manifestValidation.reasons)
	let lockRoot
	if (!isRecord(lockfile) || !isRecord(lockfile.packages) || !isRecord(lockfile.packages[''])) {
		reasons.push('lockfile root is invalid')
	} else {
		lockRoot = lockfile.packages['']
		const version =
			isRecord(manifest) && typeof manifest.version === 'string' ? manifest.version : undefined
		const lockValidation = validateManifestReading(lockRoot, expected, version)
		reasons.push(...lockValidation.reasons.map((reason) => `lockfile root ${reason}`))
		const lockEntries = validateOrkestrelLocks(lockfile)
		reasons.push(...lockEntries.reasons)
	}
	return {
		valid: reasons.length === 0,
		reasons,
		manifest: selectManifest(manifest),
		lockfile: {
			root: selectLock(lockRoot),
			packages: selectOrkestrelLocks(lockfile),
		},
	}
}

export async function attestInstalledNode(node, expected) {
	if (!isRecord(node)) {
		return typeof expected === 'string' && expected.startsWith('@orkestrel/')
			? { expected, observed: false, valid: false, failure: 'npm node was not an object' }
			: undefined
	}
	const explicit = typeof node.name === 'string' ? node.name : undefined
	const name = explicit ?? expected
	const orkestrel =
		(typeof name === 'string' && name.startsWith('@orkestrel/')) ||
		(typeof expected === 'string' && expected.startsWith('@orkestrel/'))
	if (!orkestrel) return undefined
	if (explicit !== undefined && expected !== undefined && explicit !== expected) {
		return {
			expected,
			actual: explicit,
			observed: false,
			valid: false,
			failure: 'npm node identity differs from its dependency key',
		}
	}
	if (node.missing === true && node.optional === true && typeof node.path !== 'string') {
		return {
			expected: name,
			observed: false,
			optional: true,
			absence: 'optional npm node is absent',
			valid: true,
		}
	}
	if (typeof node.path !== 'string' || node.path.length === 0) {
		return {
			expected: name,
			observed: false,
			valid: false,
			failure: 'npm node has no installed path',
		}
	}
	const manifestPath = join(node.path, 'package.json')
	const attestation = {
		expected: name,
		path: node.path,
		manifest: manifestPath,
		observed: true,
		valid: false,
	}
	try {
		const manifest = (await readJSON(manifestPath)).json
		attestation.package = selectManifest(manifest)
		const validation = validateManifestReading(manifest, name, node.version)
		if (!validation.valid) {
			attestation.reasons = validation.reasons
			attestation.failure = 'installed manifest identity or version differs from npm node'
			return attestation
		}
		attestation.dist = {}
		for (const relative of DIST_PATHS) {
			const digest = await digestOptionalFile(join(node.path, relative))
			if (typeof digest.sha256 === 'string') attestation.dist[relative] = digest.sha256
			else if (digest.failure !== undefined) {
				attestation.failure = `installed artifact could not be attested: ${digest.failure}`
				return attestation
			}
		}
		attestation.valid = true
	} catch (error) {
		attestation.failure = describeError(error)
	}
	return attestation
}

export async function collectInstalledAttestations(node, expected, attestations, reasons) {
	const attestation = await attestInstalledNode(node, expected)
	if (attestation !== undefined) {
		const key = attestation.path ?? attestation.expected
		attestations[key] = attestation
		if (!attestation.valid)
			reasons.push(attestation.failure ?? `${attestation.expected} was not attested`)
	}
	if (!isRecord(node) || !Object.hasOwn(node, 'dependencies')) return
	if (!isRecord(node.dependencies)) {
		reasons.push(`${expected ?? 'npm root'} dependencies was not an object during attestation`)
		return
	}
	for (const [name, child] of Object.entries(node.dependencies)) {
		await collectInstalledAttestations(child, name, attestations, reasons)
	}
}

export async function attestInstalledTree(node, expected) {
	const attestations = {}
	const reasons = []
	await collectInstalledAttestations(node, expected, attestations, reasons)
	return { attestations, valid: reasons.length === 0, reasons }
}

export async function readNpmTree(checkout, cli, expected) {
	const result = await executeCommand(process.execPath, [cli, 'ls', '--all', '--json', '--long'], {
		cwd: checkout,
		timeout: 120_000,
		limit: 32 * 1024 * 1024,
	})
	const reasons = []
	let raw
	let projection
	let attestations = { valid: false, reasons: ['npm JSON was not parsed'], attestations: {} }
	try {
		raw = JSON.parse(result.stdout)
		projection = projectNpmTree(raw, expected)
		attestations = await attestInstalledTree(raw, expected)
	} catch (error) {
		result.parse = describeError(error)
		reasons.push(`npm JSON could not be parsed: ${result.parse}`)
	}
	if (
		result.exit !== 0 ||
		result.signal !== null ||
		result.timedout ||
		result.overflow ||
		result.failed
	) {
		reasons.push('npm tree command did not complete successfully')
	}
	if (projection === undefined || !projection.valid) {
		reasons.push(...(projection?.reasons ?? ['npm tree projection is incomplete']))
	}
	if (!attestations.valid) {
		reasons.push(
			...(attestations.reasons.length > 0
				? attestations.reasons
				: ['installed attestations are incomplete']),
		)
	}
	return { ...result, raw, projection, attestations, valid: reasons.length === 0, reasons }
}

export function projectRegistryPayload(name, url, status, timestamp, payload) {
	const reasons = []
	if (!isRecord(payload)) {
		return {
			name,
			url,
			status,
			timestamp,
			valid: false,
			reasons: ['registry payload was not an object'],
		}
	}
	const tags = payload['dist-tags']
	const versions = payload.versions
	if (!isRecord(tags)) reasons.push('registry dist-tags map is invalid')
	if (!isRecord(versions)) reasons.push('registry versions map is invalid')
	const latest =
		isRecord(tags) && typeof tags.latest === 'string' && tags.latest.length > 0
			? tags.latest
			: undefined
	if (latest === undefined) reasons.push('registry latest tag is absent')
	const release = latest !== undefined && isRecord(versions) ? versions[latest] : undefined
	if (latest !== undefined && !isRecord(release)) reasons.push('registry latest release is absent')
	const manifest = selectManifest(release)
	if (isRecord(release)) {
		const validation = validateManifestReading(release, name, latest)
		reasons.push(...validation.reasons.map((reason) => `registry release ${reason}`))
		if (isRecord(release.dist)) {
			if (typeof release.dist.integrity === 'string') manifest.integrity = release.dist.integrity
			if (typeof release.dist.shasum === 'string') manifest.shasum = release.dist.shasum
		}
	}
	return {
		name,
		url,
		status,
		timestamp,
		tags,
		versions: isRecord(versions) ? Object.keys(versions) : [],
		latest,
		manifest,
		valid: reasons.length === 0,
		reasons,
	}
}

export async function fetchPackument(name) {
	const controller = new AbortController()
	const timer = setTimeout(() => controller.abort(), 30_000)
	const url = `https://registry.npmjs.org/${encodeURIComponent(name)}`
	const timestamp = new Date().toISOString()
	try {
		const response = await fetch(url, {
			headers: { accept: 'application/vnd.npm.install-v1+json' },
			signal: controller.signal,
		})
		const payload = await response.json()
		if (!response.ok) {
			return {
				name,
				url,
				status: response.status,
				timestamp,
				failure: `registry returned HTTP ${response.status}`,
				valid: false,
				reasons: [`registry returned HTTP ${response.status}`],
			}
		}
		return projectRegistryPayload(name, url, response.status, timestamp, payload)
	} catch (error) {
		const failure = describeError(error)
		return { name, url, timestamp, failure, valid: false, reasons: [failure] }
	} finally {
		clearTimeout(timer)
	}
}

export function validateGitReading(reading) {
	const reasons = []
	if (!isRecord(reading))
		return { valid: false, ancestor: false, reasons: ['Git reading was not an object'] }
	for (const name of ['status', 'branch', 'head', 'origin']) {
		const command = reading[name]
		if (
			!isRecord(command) ||
			command.exit !== 0 ||
			command.signal !== null ||
			command.timedout !== false ||
			command.overflow !== false ||
			command.failed === true
		) {
			reasons.push(`git ${name} did not complete successfully`)
		}
	}
	const ancestor = reading.ancestor
	if (
		!isRecord(ancestor) ||
		![0, 1].includes(ancestor.exit) ||
		ancestor.signal !== null ||
		ancestor.timedout !== false ||
		ancestor.overflow !== false
	) {
		reasons.push('git ancestor did not return a valid ancestry reading')
	}
	return {
		valid: reasons.length === 0,
		ancestor: isRecord(ancestor) && ancestor.exit === 0,
		reasons,
	}
}

export function validateSnapshotReading(snapshot, label) {
	const reasons = []
	if (!isRecord(snapshot)) return { valid: false, reasons: [`${label} snapshot was not an object`] }
	if (!isRecord(snapshot.manifest) || typeof snapshot.manifest.sha256 !== 'string') {
		reasons.push(`${label} manifest digest is absent`)
	}
	if (!isRecord(snapshot.lockfile) || typeof snapshot.lockfile.sha256 !== 'string') {
		reasons.push(`${label} lockfile digest is absent`)
	}
	const git = validateGitReading(snapshot.git)
	reasons.push(...git.reasons.map((reason) => `${label} ${reason}`))
	return { valid: reasons.length === 0, reasons }
}

export function compareSnapshots(before, after) {
	const reasons = []
	const initial = validateSnapshotReading(before, 'initial')
	const final = validateSnapshotReading(after, 'final')
	reasons.push(...initial.reasons, ...final.reasons)
	let changed = false
	if (initial.valid && final.valid) {
		if (before.manifest.sha256 !== after.manifest.sha256) {
			changed = true
			reasons.push('manifest bytes changed during collection')
		}
		if (before.lockfile.sha256 !== after.lockfile.sha256) {
			changed = true
			reasons.push('lockfile bytes changed during collection')
		}
		if (before.git.status.stdout !== after.git.status.stdout) {
			changed = true
			reasons.push('Git status changed during collection')
		}
	}
	return { valid: reasons.length === 0, changed, reasons }
}

export function evaluateCompleteness(reading) {
	const reasons = []
	for (const name of COMPLETENESS_COMPONENTS) {
		const component = reading[name]
		if (!isRecord(component) || component.valid !== true) {
			const retained =
				isRecord(component) && Array.isArray(component.reasons)
					? component.reasons.filter((reason) => typeof reason === 'string' && reason.length > 0)
					: []
			reasons.push(...(retained.length > 0 ? retained : [`${name} is incomplete`]))
		}
	}
	return { complete: reasons.length === 0, reasons }
}

export async function collectInventory(root, output, cli) {
	const summary = {
		root,
		output,
		npm: cli,
		cachedOrigin: 'origin/main is a cached reading; this instrument does not fetch or refresh it.',
		packages: {},
	}
	for (const short of PACKAGES) {
		const checkout = join(root, short)
		const record = { package: `@orkestrel/${short}`, checkout, complete: false }
		try {
			record.before = await readSnapshot(checkout)
			record.local = await readLocalPackage(checkout, record.package)
			record.git = validateGitReading(record.before.git)
			record.npm = await readNpmTree(checkout, cli, record.package)
			record.attestations = record.npm.attestations
			record.registry = await fetchPackument(record.package)
			record.after = await readSnapshot(checkout)
			record.drift = compareSnapshots(record.before, record.after)
			const completeness = evaluateCompleteness(record)
			record.complete = completeness.complete
			record.reasons = completeness.reasons
		} catch (error) {
			record.failure = describeError(error)
			record.reasons = [record.failure]
		}
		const target = join(output, `${short}.json`)
		await writeFile(target, `${JSON.stringify(record, undefined, '\t')}\n`, 'utf8')
		summary.packages[short] = { path: pathToFileURL(target).href, complete: record.complete }
	}
	summary.complete = Object.values(summary.packages).every((entry) => entry.complete)
	const summaryPath = join(output, 'summary.json')
	await writeFile(summaryPath, `${JSON.stringify(summary, undefined, '\t')}\n`, 'utf8')
	return { path: summaryPath, complete: summary.complete }
}

export async function validateOutputPath(output) {
	try {
		await lstat(output)
		throw new Error(`output directory already exists: ${output}`)
	} catch (error) {
		if (!(error instanceof Error) || error.code !== 'ENOENT') throw error
	}
}

export async function validateInputs(root, output, cli) {
	for (const path of [root, cli]) await access(path)
	if (!(await stat(root)).isDirectory()) throw new Error(`fleet root is not a directory: ${root}`)
	if (!(await stat(cli)).isFile()) throw new Error(`npm CLI path is not a file: ${cli}`)
	await validateOutputPath(output)
}

export async function executeMain(arguments_) {
	if (arguments_.length !== 3) {
		throw new Error(
			'usage: node layer-inventory.mjs <fleet-root> <output-directory> <npm-cli-path>',
		)
	}
	const [rootArgument, outputArgument, cliArgument] = arguments_
	const root = resolve(rootArgument)
	const output = resolve(outputArgument)
	const cli = resolve(cliArgument)
	await validateInputs(root, output, cli)
	await mkdir(output)
	const result = await collectInventory(root, output, cli)
	console.log(result.path)
	console.log(result.complete ? 'complete' : 'incomplete')
	process.exitCode = result.complete ? 0 : 1
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	executeMain(process.argv.slice(2)).catch((error) => {
		console.error(describeError(error))
		process.exitCode = 1
	})
}
