import assert from 'node:assert/strict'
import { createParity } from '../../../guide/dist/src/core/index.js'
import { createParityFixture } from '../../../guide/tests/setup.ts'

const options = createParityFixture({ files: { 'README.md': undefined } })
const parity = createParity(options)
assert.equal(options.files['README.md'], undefined)
assert.notEqual(options.pitch, undefined)
assert.deepEqual(parity.inspect().input, [])
assert.deepEqual(parity.inspect().pitch, [
  { spec: 'README.md', text: 'README.md is absent from the inventory.' },
])
const observations = []
for (const direction of ['guide', 'source']) {
  const rewritten = parity.rewrite(direction)
  const fresh = createParity({
    ...options,
    files: { ...options.files, ...Object.fromEntries(rewritten.changes.map(({ path, content }) => [path, content])) },
  })
  assert.deepEqual(rewritten.changes, [])
  assert.deepEqual(fresh.inspect().pitch, parity.inspect().pitch)
  observations.push({ direction, changes: rewritten.changes, findings: rewritten.findings, pitch: fresh.inspect().pitch })
}
process.stdout.write(`${JSON.stringify(observations, null, 2)}\n`)
