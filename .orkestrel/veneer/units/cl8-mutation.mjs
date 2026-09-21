import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { strictEqual } from 'node:assert/strict'

const path = 'src/styles/components/_grid.scss'
const snapshot = 'tmp/units/cl8-grid-before-control.scss'
const phase = process.argv[2]
const original = phase === 'plant' ? readFileSync(path) : readFileSync(snapshot)
const before = original.toString('utf8')
const needle = 'margin-inline: calc(-0.5 * var(--bs-gutter-x));'
strictEqual(before.split(needle).length, 2)
const mutated = before.replace(needle, 'margin-inline: calc(-0.25 * var(--bs-gutter-x));')
if (phase === 'plant') {
	writeFileSync(snapshot, original)
	writeFileSync(path, mutated)
} else {
	strictEqual(readFileSync(path, 'utf8'), mutated)
	writeFileSync(path, original)
	strictEqual(readFileSync(path).equals(original), true)
}
console.log(`Original SHA-256: ${createHash('sha256').update(original).digest('hex')}`)
console.log(`${phase} SHA-256: ${createHash('sha256').update(readFileSync(path)).digest('hex')}`)
if (phase !== 'plant') console.log('Restored partial is byte-identical to the pre-control snapshot.')
