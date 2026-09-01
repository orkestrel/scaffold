# Unit U3 — report (implementer / Opus 5)

## Touched files

- `src/core/helpers.ts` — `createStringFaults` gains a trailing `pattern` parameter; the check and the `limit` read the supplied rebuild, falling back to rebuilding from the shape; TSDoc records the parameter and its default.
- `src/core/ContractCompiler.ts` — the auditor and reporter `case 'string'` blocks read the clone's `pattern` accessor once, rebuild it inside a `readValue` boundary coded `pattern`, and pass it as the fourth argument; `readPattern` added to the `./helpers.js` import list.
- `tests/src/core/helpers.test.ts` — three pins on the supplied rebuild.
- `tests/src/core/compilers.test.ts` — two pins on the compiled doors' pattern fault.
- `guides/contract.md` — the `createStringFaults` row states the optional pre-captured pattern and the compiled doors' one-time capture.

## Mechanism as landed

`createStringFaults` takes the stateless rebuild of the shape's own pattern as an optional trailing argument and applies it, reading `readPatternSource` off that same rebuild for the `limit`, and rebuilds from `shape.pattern` exactly as before when the argument is omitted. The auditor and reporter string leaves read the clone's `pattern` accessor once while the plan is built, rebuild it through `readValue` so an unreadable source or flags refuses as a `ContractError` coded `pattern`, and hand that one rebuild to every answer — safe to share because `readPattern` strips `g` and `y`, so it carries no `lastIndex` an answer could move.

## New signature

```ts
export function createStringFaults(shape: StringShape, value: string, path: readonly string[], pattern?: RegExp): readonly Fault[]
```

## Diffstat

`guides/contract.md | 34 +++++++++---------`, `src/core/ContractCompiler.ts | 39 +++++++++++++++++----`, `src/core/helpers.ts | 21 ++++++++++--`, `tests/src/core/compilers.test.ts | 43 +++++++++++++++++++++++`, `tests/src/core/helpers.test.ts | 74 ++++++…`; 5 files changed, 185 insertions(+), 26 deletions(-). `git diff -w guides/contract.md` reports 2 insertions and 2 deletions: the `createStringFaults` row and the separator's width; the rest of that file's diff is `oxfmt` re-padding the table, run scoped as `npx oxfmt --config .oxfmtrc.json --write guides/contract.md`.

## Scoped commands and counts

Both suites run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`.

| Run | `tests/src/core/helpers.test.ts` | `tests/src/core/compilers.test.ts` |
| --- | --- | --- |
| Baseline at `163490f` | 229 passed (229) | 257 passed (257) |
| Mutation | 1 failed / 231 passed (232) | not run |
| Final | 232 passed (232) | 259 passed (259) |

The compilers suite reports `Duration 6.84s` on the final run, against `6.99s` at the baseline.

## Failing-first test

The mutation replaced the `stateless` binding with `shape.pattern === undefined ? undefined : readPattern(shape.pattern)`, discarding the supplied argument. It reddened exactly one pin, `applies the supplied pattern instead of re-reading the shape` at `tests/src/core/helpers.test.ts:3221`, reporting the `^a$` pattern fault where the supplied `/^b$/` accepts `'b'`. Restoring the binding returned the suite to 232 passed.

Tests added: `reports the same faults from a supplied rebuild as from the shape itself`; `applies the supplied pattern instead of re-reading the shape`; `answers repeatedly from one rebuild of a global caller pattern without moving lastIndex`; `the auditor and the reporter report one pattern fault with the same limit and path`; `one compiled plan answers every value alike however many answers came before`.

## Acceptance criteria

`npm run format:check` exit 0; `npm run lint:check` exit 0; `npm run check` exit 0; scoped helpers and compilers suites green with the mutation red then green; `npm run test:guides` exit 0, 65 passed; `git status --porcelain` lists only owned files (`guides/contract.md`, `src/core/ContractCompiler.ts`, `src/core/helpers.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`). Observations: `npm test` exits 0; `tmp/` empty.

## Guide row as changed

The `createStringFaults` row now reads (abridged to the moved clauses): "string shape + string + path (+ optional pre-captured pattern) → `readonly Fault[]` — the SINGLE source of the string refinement report … Stripping `g` and `y` is what makes that rebuild reusable — it carries no `lastIndex` an answer could move — so `compileAuditor` and `compileReporter` read the declaration's `pattern` accessor once while the plan is built and hand the rebuild down as the trailing argument, instead of minting a `RegExp` per answered value. Omit the argument and the helper rebuilds from the shape on every call; the report is identical either way, `limit` text included, because `readPattern` preserves `source` exactly. …"

## Deviation

No stop-and-report deviation. Two ancillary decisions recorded, both inside the fixed mechanism:

1. The compile-time capture binds `owned.pattern` to a local `const` before the `readValue` call rather than reading it inside the callback, and `refined` reuses that binding: the brief's literal form loses the `owned.pattern !== undefined` narrowing inside the arrow function, and the clone's `pattern` is an accessor that mints a fresh `RegExp` per read, so the literal form would read it twice per leaf. The landed form reads the accessor once per leaf and keeps `readPattern` — the operation that can throw — inside the `readValue` boundary.
2. `const stateless` sits immediately before the pattern check, not at the top of the `readValue` body, preserving the baseline's field read order — `min`, then `max`, then `pattern` — so a shape carrying both an unreadable bound and an unreadable pattern still refuses with the bound's thrown value as its `cause`.
