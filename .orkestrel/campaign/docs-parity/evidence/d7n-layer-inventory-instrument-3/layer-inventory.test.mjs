import assert from 'node:assert/strict'
import { test, after } from 'node:test'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { fileURLToPath } from 'node:url'
import * as inventory from './layer-inventory.mjs'

const TEST_DIRECTORY = dirname(fileURLToPath(import.meta.url))
const SOURCE_PATH = join(TEST_DIRECTORY, 'layer-inventory.mjs')
const CHILD_FIXTURE = join(TEST_DIRECTORY, 'd7n-layer-inventory-instrument-3', 'child.mjs')
const SCRATCH_PREFIX = 'layer-inventory-instrument-3-'
const SCRATCH_ROOT = await mkdtemp(join(tmpdir(), SCRATCH_PREFIX))

function createCommandResult(exit = 0) {
	return {
		stdout: '',
		stderr: '',
		exit,
		signal: null,
		timedout: false,
		overflow: false,
		failed: exit !== 0,
	}
}

function createGitReading(ancestor = 0) {
	return {
		status: createCommandResult(),
		branch: createCommandResult(),
		head: createCommandResult(),
		origin: createCommandResult(),
		ancestor: createCommandResult(ancestor),
	}
}

function createCompleteReading() {
	return {
		local: { valid: true, reasons: [] },
		git: { valid: true, reasons: [] },
		npm: { valid: true, reasons: [] },
		attestations: { valid: true, reasons: [] },
		registry: { valid: true, reasons: [] },
		drift: { valid: true, reasons: [] },
	}
}

async function writePackageFixture(target, name, version, dependencies = {}) {
	await mkdir(target, { recursive: true })
	await writeFile(
		join(target, 'package.json'),
		`${JSON.stringify({ name, version, dependencies })}\n`,
		'utf8',
	)
}

async function removeScratch(target) {
	const temporaryRoot = resolve(tmpdir())
	const resolved = resolve(target)
	const remainder = relative(temporaryRoot, resolved)
	if (remainder.startsWith('..') || remainder === '' || !remainder.startsWith(SCRATCH_PREFIX)) {
		throw new Error(`refused scratch removal outside the owned prefix: ${resolved}`)
	}
	await rm(resolved, { recursive: true })
}

after(async () => {
	await removeScratch(SCRATCH_ROOT)
})

test('uses descriptive module helpers without assigned nested callbacks', async () => {
	const source = await readFile(SOURCE_PATH, 'utf8')
	const wrappers = [
		...source.matchAll(
			/export function (?:value|message|packagePath|packageName|sleepResult|terminateProcess)\b/g,
		),
	].map((match) => match[0])
	const nested = [...source.matchAll(/\n\t+(?:const|let|var) \w+ = (?:async )?\([^\n]*=>/g)].map(
		(match) => match[0].trim(),
	)
	assert.deepEqual({ wrappers, nested }, { wrappers: [], nested: [] })
})

test('projects keyed npm identity and rejects malformed dependency maps', () => {
	const projected = inventory.projectNpmTree(
		{
			name: '@orkestrel/root',
			version: '0.0.1',
			path: join(SCRATCH_ROOT, 'root'),
			dependencies: {
				'@orkestrel/contract': { version: '0.0.16', path: join(SCRATCH_ROOT, 'contract') },
			},
		},
		'@orkestrel/root',
	)
	assert.equal(projected.projection.dependencies['@orkestrel/contract'].name, '@orkestrel/contract')
	assert.equal(projected.valid, true)

	const malformed = inventory.projectNpmTree(
		{
			name: '@orkestrel/root',
			version: '0.0.1',
			path: join(SCRATCH_ROOT, 'root'),
			dependencies: [],
		},
		'@orkestrel/root',
	)
	assert.equal(malformed.valid, false)
	assert.match(malformed.reasons.join('\n'), /dependencies/)
})

test('projects registry latest and release validity from the payload', () => {
	assert.equal(typeof inventory.projectRegistryPayload, 'function')
	const timestamp = '2026-09-08T00:00:00.000Z'
	const url = 'https://registry.npmjs.org/%40orkestrel%2Fcontract'
	const absentLatest = inventory.projectRegistryPayload(
		'@orkestrel/contract',
		url,
		200,
		timestamp,
		{
			name: '@orkestrel/contract',
			'dist-tags': {},
			versions: {},
		},
	)
	assert.equal(absentLatest.valid, false)
	assert.match(absentLatest.reasons.join('\n'), /latest/)

	const absentRelease = inventory.projectRegistryPayload(
		'@orkestrel/contract',
		url,
		200,
		timestamp,
		{
			name: '@orkestrel/contract',
			'dist-tags': { latest: '0.0.16' },
			versions: {},
		},
	)
	assert.equal(absentRelease.valid, false)
	assert.match(absentRelease.reasons.join('\n'), /release/)
})

test('reads local manifest and lock roots and rejects malformed dependency maps', async () => {
	assert.equal(typeof inventory.readLocalPackage, 'function')
	const checkout = join(SCRATCH_ROOT, 'local')
	await writePackageFixture(checkout, '@orkestrel/local', '0.0.1', {
		'@orkestrel/contract': '^0.0.16',
	})
	await writeFile(
		join(checkout, 'package-lock.json'),
		`${JSON.stringify({
			name: '@orkestrel/local',
			version: '0.0.1',
			packages: {
				'': {
					name: '@orkestrel/local',
					version: '0.0.1',
					dependencies: { '@orkestrel/contract': '^0.0.16' },
				},
			},
		})}\n`,
		'utf8',
	)
	assert.equal((await inventory.readLocalPackage(checkout, '@orkestrel/local')).valid, true)

	await writeFile(
		join(checkout, 'package.json'),
		`${JSON.stringify({
			name: '@orkestrel/local',
			version: '0.0.1',
			dependencies: [],
		})}\n`,
		'utf8',
	)
	const malformed = await inventory.readLocalPackage(checkout, '@orkestrel/local')
	assert.equal(malformed.valid, false)
	assert.match(malformed.reasons.join('\n'), /dependencies/)

	await writePackageFixture(checkout, '@orkestrel/local', '0.0.1', {
		'@orkestrel/contract': '^0.0.16',
	})
	await writeFile(
		join(checkout, 'package-lock.json'),
		`${JSON.stringify({
			name: '@orkestrel/local',
			version: '0.0.1',
			packages: {
				'': {
					name: '@orkestrel/local',
					version: '0.0.1',
					dependencies: { '@orkestrel/contract': '^0.0.16' },
				},
				'node_modules/@orkestrel/contract': {
					name: '@orkestrel/contract',
					version: '0.0.16',
					dependencies: [],
				},
			},
		})}\n`,
		'utf8',
	)
	const malformedLock = await inventory.readLocalPackage(checkout, '@orkestrel/local')
	assert.equal(malformedLock.valid, false)
	assert.match(malformedLock.reasons.join('\n'), /lockfile.*dependencies/)
})

test('attests installed identity and preserves an absent optional node', async () => {
	const installed = join(SCRATCH_ROOT, 'installed')
	await writePackageFixture(installed, '@orkestrel/contract', '0.0.16')
	const accepted = await inventory.attestInstalledNode(
		{ name: '@orkestrel/contract', version: '0.0.16', path: installed },
		'@orkestrel/contract',
	)
	assert.equal(accepted.valid, true)
	assert.equal(accepted.observed, true)

	const disagreement = await inventory.attestInstalledNode(
		{ name: '@orkestrel/contract', version: '0.0.15', path: installed },
		'@orkestrel/contract',
	)
	assert.equal(disagreement.valid, false)
	assert.match(disagreement.failure, /identity or version/)

	const optional = await inventory.attestInstalledNode(
		{ version: '0.0.1', missing: true, optional: true },
		'@orkestrel/optional',
	)
	assert.equal(optional.valid, true)
	assert.equal(optional.observed, false)
	assert.match(optional.absence, /optional/)
})

test('does not infer an Orkestrel lock identity from foreign ancestry', () => {
	const selected = inventory.selectOrkestrelLocks({
		packages: {
			'node_modules/@orkestrel/contract': { version: '0.0.16' },
			'node_modules/@orkestrel/contract/node_modules/foreign': { version: '1.0.0' },
			'node_modules/@orkestrel/mismatch': { name: 'foreign', version: '1.0.0' },
		},
	})
	assert.equal(selected['node_modules/@orkestrel/contract'].name, '@orkestrel/contract')
	assert.equal(
		Object.hasOwn(selected, 'node_modules/@orkestrel/contract/node_modules/foreign'),
		false,
	)
	assert.equal(selected['node_modules/@orkestrel/mismatch'].name, '@orkestrel/mismatch')
	assert.equal(
		inventory.validateOrkestrelLocks({
			packages: {
				'node_modules/@orkestrel/mismatch': { name: 'foreign', version: '1.0.0' },
			},
		}).valid,
		false,
	)
})

test('distinguishes negative ancestry from failed Git readings', () => {
	const negative = inventory.validateGitReading(createGitReading(1))
	assert.equal(negative.valid, true)
	assert.equal(negative.ancestor, false)

	const failed = createGitReading()
	failed.head = createCommandResult(1)
	assert.equal(inventory.validateGitReading(failed).valid, false)
})

test('supplies a fallback reason for every invalid completeness component', () => {
	const reading = createCompleteReading()
	reading.registry = { valid: false, reasons: [] }
	assert.deepEqual(inventory.evaluateCompleteness(reading), {
		complete: false,
		reasons: ['registry is incomplete'],
	})
})

test('refuses an occupied output path and admits only absent paths', async () => {
	const absent = join(SCRATCH_ROOT, 'absent-output')
	await inventory.validateOutputPath(absent)
	const occupied = join(SCRATCH_ROOT, 'occupied-output')
	await mkdir(occupied)
	await assert.rejects(inventory.validateOutputPath(occupied), /already exists/)
})

test('settles real child timeout and buffer boundaries with partial evidence', async () => {
	const overflow = await inventory.executeCommand(process.execPath, [CHILD_FIXTURE, 'flood'], {
		timeout: 5_000,
		limit: 64,
	})
	assert.equal(overflow.overflow, true)
	assert.equal(Buffer.byteLength(overflow.stdout), 64)
	assert.equal(overflow.exit, 0)

	const started = performance.now()
	const timeout = await inventory.executeCommand(process.execPath, [CHILD_FIXTURE, 'wait'], {
		timeout: 100,
		limit: 64,
	})
	const duration = performance.now() - started
	assert.equal(timeout.timedout, true)
	assert.equal(timeout.stdout, 'started')
	assert.equal(timeout.termination.requested, true)
	assert.equal(timeout.termination.observed, true)
	assert.ok(duration < 15_000, `child timeout exceeded the settlement bound: ${duration}ms`)
})
