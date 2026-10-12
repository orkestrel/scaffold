import { strict as assert } from 'node:assert'
import { constants, copyFileSync, existsSync, mkdirSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'

const root = realpathSync(resolve())
assert.equal(root, realpathSync(resolve(import.meta.dirname, '../..')))
assert(existsSync('tmp/units/aggregate-final-g2-pilot-report-2.md'))
const destination = resolve(root, '.orkestrel/agent/instruments/results/l14/custody')
const originals = readdirSync(resolve(root, 'tmp/units'))
	.filter(name => name.startsWith('aggregate-final-g2-pilot') || name.startsWith('aggregate-final-q4-endurance-') || name.startsWith('aggregate-final-endurance-size') || name === 'aggregate-final-cell-driver-check-addendum.md')
	.map(name => `tmp/units/${name}`)
originals.push('tmp/units/aggregate-final-retain-g2-pilot.ts')
const entries = originals.map(original => {
	const source = resolve(root, original)
	assert.equal(realpathSync(source), source)
	assert(statSync(source).isFile())
	const target = resolve(destination, 'files', original)
	const distance = relative(destination, target)
	assert(distance !== '..' && !distance.startsWith(`..${sep}`) && !isAbsolute(distance))
	return { original, retained: relative(root, target).replaceAll('\\', '/'), hash: hashFile(source).hash, bytes: statSync(source).size }
})
let copied = 0
for (const entry of entries) {
	if (!existsSync(entry.retained)) {
		mkdirSync(dirname(entry.retained), { recursive: true })
		copyFileSync(entry.original, entry.retained, constants.COPYFILE_EXCL)
		copied += 1
	}
	assert.equal(hashFile(entry.retained).hash, entry.hash)
	assert.equal(hashFile(entry.original).hash, entry.hash)
}
const index = resolve(destination, 'restoration-g2-pilot.json')
writeFileSync(index, `${JSON.stringify({ captured: new Date().toISOString(), root, instruction: 'Preserve these closed preparation and offline launcher receipts exactly. Restore original temporary paths only in a matching checkout and verify each hash. This index supplements earlier restoration indices without rewriting them.', entries }, undefined, 2)}\n`, { flag: 'wx' })
console.log(JSON.stringify({ entries: entries.length, copied, bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0), index: hashFile(index) }))
