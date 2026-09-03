## `@throws` sweep

- `grep -rnE '@throws \{@link ProgramError\} Thrown when' src`: 38 matches.
- `grep -rnE '@throws' src`: 40 matches.
- Unmatched: pre-existing `src/core/helpers.ts:451,453`, outside Owned.

## Prose sites

- `tests/setup.test.ts:4` — “Each following contract is asserted”
- `tests/setup.test.ts:465` — “matches the hand-written fixture table”
- `tests/setup.test.ts:723` — “give the property rating distinct scoped lines”
- `tests/guides.test.ts:48` — “the internal-symbol assertion fails when”
- `guides/program.md:932` — “as the preceding example shows”
- `tests/src/core/programs/ProgramManager.test.ts:157` — prescribed generated-collection title

## Claim 3 sweep

Full retired-name inflection pattern over `src tests guides/program.md guides/README.md README.md`: empty.

## Claim 4 sweeps

- `AGENTS §`, `Checks whether`, `size`, stale Node requirement, pluralized code tokens, `via`, `(default `, and `from '@src`: empty.
- `assertProgramDefinition,`: imported at `guides/program.md:316`.
- `@throws`: measurements recorded above.

## Pointers refreshed

The report’s disposition and row pointers were refreshed, including:

- `RecordingReason`: `tests/setup.ts:92`
- `createRecordingEngine`: `tests/setup.ts:609`
- `ProgramManagerInterface.count`: `src/core/types.ts:404`
- `ProgramManager.count`: `src/core/programs/ProgramManager.ts:111`

## Writing sweeps

- `above|below`: only reason-engine comparison operators.
- Targeted count sweep: `tests/src/core/programs/Program.test.ts:968`, permitted because it names the fixed subject and result pairs.

## Git status

```text
 M README.md
 M guides/README.md
 M guides/program.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M src/core/programs/ProgramManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/programs/Program.test.ts
 M tests/src/core/programs/ProgramManager.test.ts
 M tests/src/core/validators.test.ts
```

## Verification

- `npm run format:check`: exit 0
- `npm run lint:check`: exit 0
- `npm run check`: exit 0
- `src:core` Program run: exit 0
- `src:core` ProgramManager run: exit 0
- `setup` run: exit 0
- `guides` run: exit 0