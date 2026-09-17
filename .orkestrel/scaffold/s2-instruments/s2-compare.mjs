import { readFileSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const before = readFileSync('tmp/units/s2-captures/before.json')
const after = readFileSync('tmp/units/s2-captures/after.json')
assert.deepEqual(after, before)
// Extra trailing whitespace is outside the generator's captured artifact population.
const control = Buffer.concat([after, Buffer.from(' ')])
writeFileSync('tmp/units/s2-captures/control.json', control)
assert.throws(() => assert.deepEqual(control, before))
console.log('Capture bytes match; the extra-byte control fails the same comparison.')
