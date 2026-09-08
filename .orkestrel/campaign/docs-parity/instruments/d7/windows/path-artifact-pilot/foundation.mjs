import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, isAbsolute, resolve } from 'node:path'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
import { PATHS } from './constants.mjs'
import { assertBytes, assertHost, assertSelection, createOutput, createPlan, readBytes, writeReceipt } from './functions.mjs'
import { FLEET, PRESERVED, SLUGS } from './foundation-constants.mjs'

const [slug, output] = process.argv.slice(2)

if (slug === undefined || output === undefined) throw new Error('Expected package slug and absent absolute evidence output path.')
if (!SLUGS.includes(slug)) throw new Error('Package slug is outside the foundation visit.')
if (!isAbsolute(output)) throw new Error('Evidence output path must be absolute.')

const target = resolve(FLEET, slug)

await createOutput(output)

const require = createRequire(import.meta.url)
const manifestPath = require.resolve('@orkestrel/scaffold/package.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const installed = dirname(manifestPath)
const host = resolve(installed, 'dist', 'host')
const compiler = new Compiler()
const materializer = new Materializer({ host })

try {
	const preservedBefore = await readBytes(target, PRESERVED)
	const hostMembers = await readBytes(host, PATHS)
	const scaffolding = compiler.compile(createBlueprint(slug, { src: ['core'] }), ['tests'])
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
