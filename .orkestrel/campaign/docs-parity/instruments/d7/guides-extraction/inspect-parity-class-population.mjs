import assert from 'node:assert/strict'
import { createParity } from '../../../guide/dist/src/core/index.js'
import { createParityFixture, PARITY_GUIDE, PARITY_SPEC, PARITY_TYPES } from '../../../guide/tests/setup.ts'

const guide = PARITY_GUIDE.replace(
  '| `render` | Renders the widget. |',
  '| `render` | Renders the widget. |\n| `open` | Opens the widget. |',
)
const types = PARITY_TYPES.replace('\trender(): void', '\trender(): void\n\t/** Opens the widget. */\n\topen(): void')
const parity = createParity(createParityFixture({
  files: { [PARITY_SPEC]: guide, 'src/core/types.ts': types },
}))
const row = parity.rows()[0]
assert.ok(row)
const contract = row.source.methods('WidgetInterface').map(member => member.name)
const implementation = row.source.methods('Widget').map(member => member.name)
assert.notDeepEqual(implementation, [])
assert.notDeepEqual(implementation, contract)
assert.deepEqual(parity.inspect().methods, [])
process.stdout.write(`${JSON.stringify({ contract, implementation, methods: parity.inspect().methods }, null, 2)}\n`)
