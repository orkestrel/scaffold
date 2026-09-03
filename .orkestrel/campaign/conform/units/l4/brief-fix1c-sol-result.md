## Assertions
- `tests/guides.test.ts:417` — task: `{ operation: 'refactor', domain: 'code', statement: 'Refactor useForm to native browser form APIs.' }`
- `tests/guides.test.ts:422` — authority: `[{ path: 'AGENTS.md', note: 'project law; wins every conflict' }]`
- `tests/guides.test.ts:425` — manifest: exact documented `read`, `edit`, `locked`, and `forbidden` references
- `tests/guides.test.ts:436` — outcomes: documented ranked texts, each with `required: true`
- `tests/guides.test.ts:443` — rules: `['No new dependencies.']`
- `tests/guides.test.ts:444` — invariants: `['useForm public method names and signatures in types.ts.']`
- `tests/guides.test.ts:448` — givens: `[{ category: 'convention', name: 'indentation', value: 'tabs' }]`
- `tests/guides.test.ts:451` — examples: `[{ input: '<input required>', output: 'validity read from el.validity' }]`
- `tests/guides.test.ts:454` — assumptions: `['Validation message wording is preserved.']`
- `tests/guides.test.ts:455` — citation: `{ name: 'MDN Constraint Validation', url: 'https://developer.mozilla.org/', note: 'the native validity behavior being adopted' }`
- `tests/guides.test.ts:462` — gap: `{ field: 'rules', question: 'Should validation message wording change?', blocking: false }`
- `tests/guides.test.ts:469` — risk: `{ severity: 'medium', text: 'native validation differs subtly', mitigation: 'assert message and state in tests' }`
- `tests/guides.test.ts:476` — output: `{ format: 'diff', include: ['updated useForm.ts'] }`
- `tests/guides.test.ts:477` — proofs: `[{ text: 'type-check and lint pass', command: 'npm run check' }]`
- `tests/guides.test.ts:480` — output format: `'diff'`
- `tests/guides.test.ts:481` — trace: `undefined`
- `tests/guides.test.ts:482` — hash: `undefined`
- `tests/guides.test.ts:483` — gate rules length: `7`

## Red and green counts
- Red: `1 failed | 19 passed (20)` — `/home/user/work/evidence/brief-proofs/fix1c-red.txt`
- Green: `20 passed (20)` — `/home/user/work/evidence/brief-proofs/fix1c-green.txt`

## `git status --short`
```text
 M README.md
 M guides/brief.md
 M src/core/BriefCompiler.ts
 M src/core/BriefManager.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/BriefCompiler.test.ts
 M tests/src/core/BriefManager.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/validators.test.ts
```

## Exit codes
- `npm run format:check`: `0`
- `npm run lint:check`: `0`
- `npm run check`: `0`
- `npm run test:guides`: `0`