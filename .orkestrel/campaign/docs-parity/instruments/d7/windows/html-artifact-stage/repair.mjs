import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, isAbsolute, resolve } from 'node:path'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
import { PATHS } from './constants.mjs'
import { assertBytes, assertHost, assertSelection, createOutput, createPlan, readBytes, writeReceipt } from './functions.mjs'
import { PRESERVED } from './foundation-constants.mjs'
import functions from '../html-artifact-stage/functions.cjs'

const [stage, target, output] = process.argv.slice(2)

if (stage === undefined || target === undefined || output === undefined) throw new Error('Expected fresh HTML stage, HTML target, and absent evidence output paths.')
if (!isAbsolute(stage) || !isAbsolute(target) || !isAbsolute(output)) throw new Error('HTML stage, target, and evidence output paths must be absolute.')

if (resolve(target) !== resolve(stage, 'html')) throw new Error('HTML target is not the stage child.')

await createOutput(output)

const { hashFile } = functions

const require = createRequire(import.meta.url)
const manifestPath = require.resolve('@orkestrel/scaffold/package.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const installed = dirname(manifestPath)
const host = resolve(installed, 'dist', 'host')
const compiler = new Compiler()
const materializer = new Materializer({ host })

try {
	if (hashFile(resolve(host, 'manifest.json')) !== '60f6f1612933be6c5eb022e803e0b0fdf0d50452de8307d2688a3b832df0cf78') throw new Error('Installed scaffold host manifest hash differs from the accepted preparation hash.')
	if (hashFile(resolve(host, 'tests', 'setupPolicy.ts')) !== 'ebe2777780193eed9d8d0641d6326535a6b5084d88aee0b6361d0b2409281ded') throw new Error('Installed scaffold setup policy hash differs from the accepted preparation hash.')
	if (hashFile(resolve(host, 'tests', 'config.test.ts')) !== 'b880877803d909f83bc2ba4110d795cfecf620402696272e967bb55b90b66578') throw new Error('Installed scaffold config test hash differs from the accepted preparation hash.')
	const preservedBefore = await readBytes(target, PRESERVED)
	const hostMembers = await readBytes(host, PATHS)
	const scaffolding = compiler.compile(createBlueprint('html', { src: ['core'] }), ['tests'])
	if (scaffolding.plan === undefined) throw new Error('Compiler returned no plan.')
	const plan = createPlan(scaffolding.plan)
	assertSelection(plan)
	const audit = materializer.audit(plan, target)
	const repair = materializer.repair(plan, audit, target)
	if (!repair.written.every((path) => PATHS.includes(path))) throw new Error('Repair wrote a path outside the selected paths.')
	await assertHost(target, host, PATHS)
	await assertBytes(target, preservedBefore)
	const settled = materializer.audit(plan, target)
	if (settled.findings.some((finding) => finding.drift === 'stale' || finding.drift === 'missing')) throw new Error('Settled audit retains selected drift.')
	const preservedAfter = await readBytes(target, PRESERVED)
	await writeReceipt(output, 'installed.json', { path: installed, version: manifest.version })
	await writeReceipt(output, 'host-members.json', hostMembers)
	await writeReceipt(output, 'audit.json', audit)
	await writeReceipt(output, 'repair.json', repair)
	await writeReceipt(output, 'settled.json', settled)
	await writeReceipt(output, 'preserved.json', { after: preservedAfter, before: preservedBefore })
} finally {
	materializer.destroy()
	compiler.destroy()
}
