# rater-prose report

## Title now

`tests/src/core/validators.test.ts:35` reads `accepts the factor, group, and total stage literals`, naming each literal the case body asserts (`isStage('factor')`, `isStage('group')`, `isStage('total')`).

## Sweep

Command: `grep -rn -iE '\b(one|two|three|four|five|six|seven|eight|nine|ten)\b' /home/user/fleet/rater/tests/src`

Hits and rulings:

- `tests/src/core/validators.test.ts:150` — `rejects a non-array lines and a lines array containing one invalid entry`: singular-item reference to a specific entry, not a tally over a growable set. Permitted.
- `tests/src/core/factories.test.ts:39` — `Expected one rated line`: singular-item assertion message. Permitted.
- `tests/src/core/factories.test.ts:41` — `Expected one worksheet group`: singular-item assertion message. Permitted.
- `tests/src/core/factories.test.ts:48` — `Expected one recorded call`: singular-item assertion message. Permitted.
- `tests/src/core/helpers.test.ts:34` — `builds one evidence row from a check, applying a label when provided`: singular-item description of the function's output for one input. Permitted.
- `tests/src/core/Rater.test.ts:46` — `never evaluates an omitted line, even one authored alongside the rated ones`: singular-item reference. Permitted.
- `tests/src/core/Rater.test.ts:458` — `// rater sums the two MAX_VALUE amounts together.`: names the value the reader needs (how many amounts the case sums), not a tally over a growable set. Permitted.
- `tests/src/core/Rater.test.ts:594` — `throws DEFINITION for a rating-shaped input carrying one invalid line`: singular-item description. Permitted.

No hit states a count over a set anyone can add to. No further edit made.

## Gates

- `format:check` — exit 0.
- `lint:check` — exit 0.
- `check` — exit 0.
- `build` — exit 0.
- `test` — exit 0 (`config`: 46 passed; `setup`: 15 passed; `guides`: 26 passed; `src:core`: 131 passed; `policy`: 111 passed).

## Audit

`npx scaffold audit --offline`: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

## Status

`git -C /home/user/fleet/rater status --short` lists only `tests/src/core/validators.test.ts`.
