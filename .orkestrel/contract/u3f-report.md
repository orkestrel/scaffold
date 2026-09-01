# Unit U3f — report (implementer / Opus 5)

All edits landed and the scoped gates are green.

## Helper

`export function ownPattern(pattern: RegExp, reader: string): RegExp` in `src/core/helpers.ts:654`, beside `readPattern`. Body is exactly the prescribed `readValue(() => readPattern(pattern), reader, { subject: 'pattern', code: 'pattern', context: { shape: 'string' } })`. Name reason: `.claude/rules/names.md` § Standalone helpers takes `{verb}{Noun}`, and `own` is the package's established verb for "return a copy this package owns" (`ownShape` in `src/core/cloners.ts`).

## Call sites as landed

- `src/core/combinators.ts:1037`: `const pattern = source === undefined ? undefined : ownPattern(source, 'stringOf')`
- `src/core/ContractCompiler.ts:1440`: `const pattern = declared === undefined ? undefined : ownPattern(declared, 'compileAuditor')`
- `src/core/ContractCompiler.ts:1757`: `const pattern = declared === undefined ? undefined : ownPattern(declared, 'compileReporter')`

`matchOf` is untouched (`combinators.ts:990`). `readPattern` is dropped from the `ContractCompiler.ts` import list and kept in `combinators.ts` for `matchOf`.

## `createStringFaults` `@param` as landed

`@param pattern - The one-time stateless rebuild that decides the pattern refinement. Must be a {@link readPattern} result for this shape's own pattern; supplied, it decides the match, the `limit` text, and whether a pattern fault is reported at all, and `shape.pattern` is not read. A pattern carrying `g` or `y` moves the caller's `lastIndex` and makes repeated answers for one value disagree. Default: rebuilt from `shape` on every call`

The remark's `lastIndex` sentence is qualified to the declaration's pattern and carries the prescribed `limit` sentence; the unconditional "the report is the same either way" is gone.

## Guide row sentences as landed (`guides/contract.md:597`)

"The declaration's pattern is applied through an OWNED stateless rebuild (`readPattern`, taken through `ownPattern`) asked through `matchesPattern`, so the shape's own pattern never moves a caller's `lastIndex` and no caller-writable member decides whether the value matched." … "Supply the rebuild of this same shape's own pattern, built through `readPattern`, and the report matches the omitted form, `limit` text included, because `readPattern` preserves `source` exactly; the helper applies whatever pattern it is handed and never re-reads `shape.pattern`, so a supplied pattern decides the match, the `limit` text, and whether a pattern fault is reported at all, and a `g` or `y` pattern makes repeated answers for one value disagree. The `limit` text is read from the applied rebuild, so it names the pattern that decided the match; the shape's `pattern` is read once per call for that rebuild."

The `ownPattern` Helper-table row sits at `guides/contract.md:244`, directly after `readPattern`; `oxfmt --write guides/contract.md` re-padded both tables.

## Suite evidence

Prefix `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`: helpers 232 → 234 passed; combinators 123 → 123; compilers 259 → 259; ContractCompiler 24 passed.

Read-count pin red first, with `-t "reads a hand-rolled shape's pattern accessor"`: with `const limit = readPatternSource(shape.pattern)` restored (the checkpoint's three-read shape) it failed `1 failed | 233 skipped (234)` on `expected 2, received 3` at `helpers.test.ts:3317`; with `readPatternSource(stateless)` restored the same command reported `1 passed | 233 skipped (234)`. The `ownPattern` pin binds by construction (a `Proxy` receiver refuses the captured `source` getter) and runs green inside the 234.

Gates: `npm run format:check` green; `npm run lint:check` green; `npm run check` green; `npm run test:guides` 65 passed; `npm run test:policy` 111 passed. `npm test` not run.

## Scope

`git status --porcelain`: ` M guides/contract.md`, ` M src/core/ContractCompiler.ts`, ` M src/core/combinators.ts`, ` M src/core/helpers.ts`, ` M tests/src/core/compilers.test.ts`, ` M tests/src/core/helpers.test.ts`. `git diff --stat`: 6 files changed, 285 insertions(+), 37 deletions(-). `tests/src/core/combinators.test.ts` needed no change. `tmp/` empty.

## Deviations

**Acceptance criterion 1 is internally unsatisfiable; the objective it states is met.** `grep -c "readValue(() => readPattern" src/core/combinators.ts src/core/ContractCompiler.ts` reports `combinators.ts:1`, `ContractCompiler.ts:0`; the single hit is `matchOf` at `combinators.ts:990`, which the same criterion requires present and lists off-limits. The inline construction is gone from the three sites. Nothing was changed in response.

Decided and carried on from: `ownPattern`'s TSDoc first sentence is third person ("Rebuilds …") and its throw clause reads `@throws {ContractError} Thrown when …`, following `.claude/rules/typescript.md` over the file's imperative/`When …` forms; the read-count pin title kept verbatim with a comment naming both reads; the inline comment above the pattern branch in `createStringFaults` tightened to drop the unconditional promise; the auditor leaf's comment lead-in trimmed so the prescribed clause reads as one sentence; both new test titles use double quotes because each contains an apostrophe (`shapers.test.ts:1285` precedent).
