import { strict as assert } from 'node:assert'
import { constants, copyFileSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'

const root = realpathSync(resolve())
assert.equal(root, realpathSync(resolve(import.meta.dirname, '../..')))
const destination = resolve(root, '.orkestrel/agent/instruments/results/l14/custody')
const paths = [
	'tmp/units/aggregate-final-daemon-deployment.json',
	'tmp/units/aggregate-final-daemon-start.json',
	'tmp/units/aggregate-final-calibration-command-plan-2.json',
	'tmp/units/aggregate-final-calibration-run.ts',
	'tmp/units/aggregate-final-calibration-driver-report.md',
	'tmp/units/aggregate-final-calibration-sequence.jsonl',
	'tmp/units/aggregate-final-calibration-root.jsonl',
	'tmp/units/aggregate-final-calibration-root.err',
	'tmp/units/aggregate-final-calibration-fit-report.md',
	'tmp/units/aggregate-final-calibration-fit-assess.mjs',
	'tmp/units/aggregate-final-calibration-fit-assess.ts',
	'tmp/units/aggregate-final-label-custody-report.md',
	'tmp/units/aggregate-final-label-wrap.ts',
	'tmp/units/aggregate-final-label-wrap-report.md',
	'tmp/units/aggregate-final-adjudication-decisions.json',
	'tmp/units/aggregate-final-adjudication-apply.ts',
	'tmp/units/aggregate-final-adjudication-receipt.json',
	'tmp/units/aggregate-final-fit-reading.ts',
	'.orkestrel/agent/instruments/harness/.build/build-manifest.json',
]
for (const alias of ['a', 'b', 'c', 'd']) for (const suffix of ['.json', '-report.md']) paths.push(`tmp/units/aggregate-final-label-${alias}${suffix}`)
for (const alias of ['a', 'b', 'c', 'd']) {
	paths.push(`tmp/units/aggregate-final-label-custody-${alias}-receipt.json`)
	paths.push(`tmp/units/aggregate-final-approved-${alias}.json`)
}
for (const key of ['q2', 'g2', 'g4', 'q4']) for (const channel of ['stdout', 'stderr']) paths.push(`tmp/units/aggregate-final-calibration-fit-${key}-launch.${channel}.txt`)
const deployment: unknown = JSON.parse(readFileSync(paths[0] ?? '', 'utf8'))
assert(isRecord(deployment) && Array.isArray(deployment.controls) && Array.isArray(deployment.models))
const references: unknown[] = [deployment.receipt, ...deployment.controls]
for (const model of deployment.models) {
	assert(isRecord(model))
	references.push(model.metadata)
}
for (const value of references) {
	assert(isRecord(value) && typeof value.path === 'string' && typeof value.hash === 'string')
	assert.equal(hashFile(value.path).hash, value.hash)
	if (value.path.startsWith('tmp/')) paths.push(value.path)
}
const entries = [...new Set(paths)].map((path) => {
	const source = resolve(root, path)
	assert.equal(realpathSync(source), source)
	const local = relative(root, source)
	assert(local !== '..' && !local.startsWith(`..${sep}`) && !isAbsolute(local))
	assert(statSync(source).isFile())
	const target = resolve(destination, 'files', local)
	const distance = relative(destination, target)
	assert(!distance.startsWith('..') && !isAbsolute(distance))
	return { original: local.replaceAll('\\', '/'), retained: relative(root, target).replaceAll('\\', '/'), hash: hashFile(source).hash, bytes: statSync(source).size }
})
for (const [alias, key] of [['a', 'q2'], ['b', 'g2'], ['c', 'g4'], ['d', 'q4']]) {
	const original = `tmp/units/aggregate-final-label-${alias}-packet.jsonl`
	const retained = `.orkestrel/agent/instruments/results/l14/calibration/${key}/generation/packet.jsonl`
	const hash = hashFile(original).hash
	assert.equal(hashFile(retained).hash, hash)
	entries.push({ original, retained, hash, bytes: statSync(original).size })
}
mkdirSync(destination)
for (const entry of entries) {
	if (entry.retained.includes('/custody/files/')) {
		mkdirSync(dirname(resolve(root, entry.retained)), { recursive: true })
		copyFileSync(entry.original, entry.retained, constants.COPYFILE_EXCL)
	}
	assert.equal(hashFile(entry.original).hash, entry.hash)
	assert.equal(hashFile(entry.retained).hash, entry.hash)
}
writeFileSync(resolve(destination, 'restoration.json'), `${JSON.stringify({ captured: new Date().toISOString(), root, instruction: 'Restore retained bytes to the original root-relative paths only in a matching checkout; verify SHA256. Do not rewrite historical manifests or request bodies. This map preserves paths, not a new execution authorization.', entries }, undefined, 2)}\n`, { flag: 'wx' })
console.log(JSON.stringify({ entries: entries.length, bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0), index: hashFile(resolve(destination, 'restoration.json')) }))
