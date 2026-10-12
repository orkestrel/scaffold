import { strict as assert } from 'node:assert'
import { constants, copyFileSync, existsSync, mkdirSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'

const root = realpathSync(resolve())
assert.equal(root, realpathSync(resolve(import.meta.dirname, '../..')))
assert(existsSync('tmp/units/aggregate-final-q4-cell-report.md'))
const destination = resolve(root, '.orkestrel/agent/instruments/results/l14/custody')
const prefixes = ['aggregate-final-q4-cell', 'aggregate-final-cell-driver-q4-think0', 'aggregate-final-gauge-criterion', 'aggregate-final-qualification-direction']
const originals = readdirSync(resolve(root, 'tmp/units'))
	.filter(name => prefixes.some(prefix => name.startsWith(prefix)))
	.map(name => `tmp/units/${name}`)
originals.push('tmp/units/aggregate-final-retain-q4-preparation.ts', 'tmp/units/aggregate-final-evaluation-lookup-report.md', 'tmp/units/aggregate-final-q4-pilot-brief.md', 'tmp/claude/aggregate-final-qualification-direction-brief.md')
const entries = originals.map(original => {
	const source = resolve(root, original)
	assert.equal(realpathSync(source), source)
	assert(statSync(source).isFile())
	const target = resolve(destination, 'files', original)
	const distance = relative(destination, target)
	assert(distance !== '..' && !distance.startsWith(`..${sep}`) && !isAbsolute(distance))
	return { original, retained: relative(root, target).replaceAll('\\', '/'), hash: hashFile(source).hash, bytes: statSync(source).size }
})
for (const entry of entries) {
	assert(!existsSync(entry.retained))
	mkdirSync(dirname(entry.retained), { recursive: true })
	copyFileSync(entry.original, entry.retained, constants.COPYFILE_EXCL)
	assert.equal(hashFile(entry.retained).hash, entry.hash)
	assert.equal(hashFile(entry.original).hash, entry.hash)
}
const index = resolve(destination, 'restoration-q4-preparation.json')
writeFileSync(index, `${JSON.stringify({ captured: new Date().toISOString(), root, instruction: 'Retain the closed Qwen preparation, operational failure, and independent criterion/design findings exactly. Restore temporary references only in a matching checkout and verify hashes. No frozen result is relabeled.', entries }, undefined, 2)}\n`, { flag: 'wx' })
console.log(JSON.stringify({ entries: entries.length, bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0), index: hashFile(index) }))
