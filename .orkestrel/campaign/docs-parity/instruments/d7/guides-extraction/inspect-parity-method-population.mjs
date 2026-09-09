import assert from 'node:assert/strict'
import { createParity } from '../../../guide/dist/src/core/index.js'
import { createParityFixture, PARITY_GUIDE, PARITY_SPEC } from '../../../guide/tests/setup.ts'

const intact = createParity(createParityFixture()).inspect()
assert.deepEqual(intact.methods, [])
const start = PARITY_GUIDE.indexOf('## Methods\n')
const end = PARITY_GUIDE.indexOf('## Patterns\n')
assert.ok(start >= 0 && end > start)
const omitted = PARITY_GUIDE.slice(0, start) + PARITY_GUIDE.slice(end)
const parity = createParity(createParityFixture({ files: { [PARITY_SPEC]: omitted } }))
const rows = parity.rows()
assert.ok(rows[0])
assert.deepEqual(rows[0].guide.methods(), [])
assert.notDeepEqual(rows[0].source.methods('WidgetInterface'), [])
assert.deepEqual(parity.inspect().methods, [])

const altered = createParity(createParityFixture({
  files: { [PARITY_SPEC]: PARITY_GUIDE.replace('| `render` | Renders the widget. |', '| `missing` | Renders the widget. |') },
})).inspect()
assert.notDeepEqual(altered.methods, [])
process.stdout.write(`${JSON.stringify({
  omittedGroups: rows[0].guide.methods(),
  sourceMethods: rows[0].source.methods('WidgetInterface'),
  omittedReport: parity.inspect().methods,
  alteredReport: altered.methods,
}, null, 2)}\n`)
