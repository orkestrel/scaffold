import assert from 'node:assert/strict'
import { createParity } from '../../../guide/dist/src/core/index.js'
import {
  createParityFixture,
  PARITY_GUIDE,
  PARITY_SPEC,
  PARITY_TYPES,
} from '../../../guide/tests/setup.ts'

const intact = createParity(createParityFixture()).inspect()
assert.deepEqual(intact.fences, [])
assert.deepEqual(intact.examples, [])

const undocumentedMember = createParity(createParityFixture({
  files: {
    [PARITY_SPEC]: PARITY_GUIDE.replace('widget.render()', 'widget.paint()'),
    'src/core/types.ts': PARITY_TYPES.replace('@example', '@sample'),
  },
})).inspect()
assert.deepEqual(undocumentedMember.fences, [])
assert.deepEqual(undocumentedMember.methods, [])
assert.deepEqual(undocumentedMember.drift, [])
assert.deepEqual(undocumentedMember.examples, [{
  spec: PARITY_SPEC,
  text: `${PARITY_SPEC} has no example for WidgetInterface.render.`,
}])

const absentLanguage = createParity(createParityFixture({
  language: 'typescript',
})).inspect()
assert.deepEqual(absentLanguage.fences, [])

const refusedLanguage = createParity(createParityFixture({ languages: ['sh'] })).inspect()
assert.notDeepEqual(refusedLanguage.fences, [])

process.stdout.write(`${JSON.stringify({
  intact: { fences: intact.fences, examples: intact.examples },
  undocumentedMember: {
    fences: undocumentedMember.fences,
    methods: undocumentedMember.methods,
    drift: undocumentedMember.drift,
    examples: undocumentedMember.examples,
  },
  absentLanguage: absentLanguage.fences,
  refusedLanguage: refusedLanguage.fences,
}, null, 2)}\n`)
