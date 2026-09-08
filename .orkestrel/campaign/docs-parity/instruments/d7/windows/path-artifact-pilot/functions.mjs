import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
import { PATHS, SENTINELS, STALE } from './constants.mjs'

export function assertSelection(plan) {
	const paths = plan.artifacts.map((artifact) => artifact.path).toSorted()
	const expected = [...PATHS].toSorted()
	if (JSON.stringify(paths) !== JSON.stringify(expected)) throw new Error('Selected plan paths differ from the required paths.')
}

export async function createOutput(output) {
	if (!isAbsolute(output)) throw new Error('Output path must be absolute.')
	try {
		await mkdir(output)
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === 'EEXIST') throw new Error('Output path is occupied.')
		throw error
	}
}

export function createPlan(plan) {
	return {
		artifacts: plan.artifacts.filter((artifact) => PATHS.includes(artifact.path)),
		blueprint: plan.blueprint,
		groups: plan.groups,
	}
}

export async function readBytes(root, paths) {
	const readings = {}
	for (const path of paths) readings[path] = (await readFile(join(root, path))).toString('base64')
	return readings
}

export async function writeFixtures(root, entries) {
	for (const entry of entries) {
		const path = join(root, entry.path)
		await mkdir(dirname(path), { recursive: true })
		await writeFile(path, entry.value)
	}
}

export async function assertHost(root, host, paths) {
	for (const path of paths) {
		const actual = await readFile(join(root, path))
		const expected = await readFile(join(host, path))
		if (!actual.equals(expected)) throw new Error(`Written path differs from packed host: ${path}`)
	}
}

export async function assertBytes(root, expected) {
	for (const [path, value] of Object.entries(expected)) {
		if ((await readFile(join(root, path))).toString('base64') !== value) throw new Error(`Sentinel changed: ${path}`)
	}
}

export async function writeReceipt(output, name, value) {
	await writeFile(join(output, name), `${JSON.stringify(value, undefined, '\t')}\n`)
}

export async function run(output) {
	await createOutput(output)
	const require = createRequire(import.meta.url)
	const manifestPath = require.resolve('@orkestrel/scaffold/package.json')
	const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
	const installed = dirname(manifestPath)
	const host = resolve(installed, 'dist', 'host')
	const target = join(output, 'target')
	const occupied = join(output, 'occupied')
	const blueprint = createBlueprint('contract', { src: ['core'] })
	const compiler = new Compiler()
	const materializer = new Materializer({ host })
	try {
		const scaffolding = compiler.compile(blueprint, ['tests'])
		if (scaffolding.plan === undefined) throw new Error('Compiler returned no plan.')
		let rejected = false
		try {
			assertSelection(scaffolding.plan)
		} catch (error) {
			rejected = error instanceof Error
		}
		if (!rejected) throw new Error('Unfiltered plan was accepted by the selection control.')
		const plan = createPlan(scaffolding.plan)
		assertSelection(plan)
		await writeFixtures(target, STALE)
		await writeFixtures(target, SENTINELS)
		await writeFile(occupied, 'occupied sentinel\n')
		const occupiedBefore = await readFile(occupied, 'utf8')
		let occupiedRejected = false
		try {
			await createOutput(occupied)
		} catch (error) {
			occupiedRejected = error instanceof Error
		}
		if (!occupiedRejected) throw new Error('Occupied output was accepted.')
		if ((await readFile(occupied, 'utf8')) !== occupiedBefore) throw new Error('Occupied output changed.')
		const sentinelsBefore = await readBytes(target, SENTINELS.map((entry) => entry.path))
		const audit = materializer.audit(plan, target)
		const repair = materializer.repair(plan, audit, target)
		assertSelection({ artifacts: repair.written.map((path) => ({ path })) })
		await assertHost(target, host, PATHS)
		await assertBytes(target, sentinelsBefore)
		const settled = materializer.audit(plan, target)
		const repeat = materializer.repair(plan, settled, target)
		if (settled.findings.some((finding) => finding.drift === 'stale' || finding.drift === 'missing')) throw new Error('Settled audit retains selected drift.')
		if (repeat.written.length !== 0) throw new Error('Settled repair wrote selected paths.')
		const sentinelsAfter = await readBytes(target, SENTINELS.map((entry) => entry.path))
		await writeReceipt(output, 'installed.json', { path: installed, version: manifest.version })
		await writeReceipt(output, 'selection.json', { paths: PATHS })
		await writeReceipt(output, 'audit.json', audit)
		await writeReceipt(output, 'repair.json', repair)
		await writeReceipt(output, 'sentinels.json', { after: sentinelsAfter, before: sentinelsBefore })
		await writeReceipt(output, 'controls.json', { occupied: occupiedRejected, selection: rejected })
		await writeReceipt(output, 'settled.json', { audit: settled, repair: repeat })
	} finally {
		materializer.destroy()
		compiler.destroy()
	}
}
