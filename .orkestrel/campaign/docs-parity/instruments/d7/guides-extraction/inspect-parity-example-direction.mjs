import assert from 'node:assert/strict'
import { createParity } from '../../../guide/dist/src/core/index.js'
import { createParityFixture, PARITY_GUIDE, PARITY_SPEC } from '../../../guide/tests/setup.ts'

const changedGuide = PARITY_GUIDE.replace('createWidget()\n```', 'createWidget({ ready: true })\n```')
assert.notEqual(changedGuide, PARITY_GUIDE)
const options = createParityFixture({ files: { [PARITY_SPEC]: changedGuide } })
const parity = createParity(options)
const guideResult = parity.rewrite('guide')
const sourceResult = parity.rewrite('source')
assert.deepEqual(guideResult.findings, [])
assert.deepEqual(sourceResult.findings, [])
assert.deepEqual(guideResult.changes.map(({ path }) => path), [PARITY_SPEC])
assert.deepEqual(sourceResult.changes.map(({ path }) => path), ['src/core/factories.ts'])
assert.equal(guideResult.changes[0].content, PARITY_GUIDE)
assert.ok(sourceResult.changes[0].content.includes(' * createWidget({ ready: true })'))
assert.equal(options.files[PARITY_SPEC], changedGuide)
process.stdout.write(`${JSON.stringify({
  guide: { paths: guideResult.changes.map(({ path }) => path), authority: 'source', originalExampleRestored: true },
  source: { paths: sourceResult.changes.map(({ path }) => path), authority: 'guide', changedExampleCopied: true },
  inputPreserved: true,
}, null, 2)}\n`)
