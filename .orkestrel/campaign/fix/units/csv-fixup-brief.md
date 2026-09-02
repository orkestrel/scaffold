# Unit csv-fixup — close the csv unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Every behavior claim the csv guide and parser TSDoc make about `@orkestrel/contract`'s parsers
is pinned by an executed assertion, and every finding the objective lane adds below is closed as
ruled.

## Context

**Finding from the checker lane (claim 5), with its ruling.** The guide's Parsers table
(`/home/user/fleet/csv/guides/csv.md:164-165`) and the TSDoc at
`/home/user/fleet/csv/src/core/parsers.ts:115,127,142` state measured comparisons against
`@orkestrel/contract`: `parseInteger('007')` reads as `7` there while this package's
`parseInteger` refuses a leading zero; `parseNumber('007.5')` reads as `7.5`; contract's
`parseBoolean` accepts `'1'` and `'0'`. No test executes `@orkestrel/contract` to pin those
values (`tests/src/core/parsers.test.ts` imports only from `@src/core`). Ruling
(`.claude/rules/documentation.md` § Parity: a prose claim about behavior gets an executed
assertion): add to `tests/src/core/parsers.test.ts` one `describe` that imports `parseInteger`,
`parseNumber`, and `parseBoolean` from `@orkestrel/contract` (a declared runtime dependency,
staged at its campaign tip) and asserts each comparison the prose states, side by side with this
package's own result on the same input. Where the staged contract's actual value differs from
the prose, correct the prose to the measured value and say so in the report.

**Findings from the objective lane**, appended below under "Objective findings" when they
arrive, each with its ruling.

**Law.** `AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/tests.md` (real
implementations, no mocks).

**Host.** Linux, bash. Repository `/home/user/fleet/csv` at commit `f73364d`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, `node_modules` installed with the closure staged
(`@orkestrel/contract` at the campaign tip; run `node /home/user/work/verify-stage.mjs csv`).
Do not run `npm install`.

**Standing conditions.** none.

## Unknowns

Whether the staged contract's `parseInteger`, `parseNumber`, and `parseBoolean` return what the
prose states; the test settles it and the report quotes the values.

## Scope

**Owned.** `tests/src/core/parsers.test.ts`; `guides/csv.md` and `src/core/parsers.ts` only where
a measured value contradicts the prose; any file an objective finding below names.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Write the tests, run
`npm run test:src` and quote the result, correct any prose the measurement contradicts, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the test titles and the measured values; any prose corrected (before and after);
each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when `@orkestrel/contract` does not export one of the three parsers, or when a gate
fails for a cause you cannot attribute.

## Acceptance criteria

1. `tests/src/core/parsers.test.ts` imports the three parsers from `@orkestrel/contract` and
   asserts each comparison the guide's Parsers table and the TSDoc state.
2. The prose and the measured values agree.
3. The gate chain exits 0.
4. `git status --short` lists only owned files.

## Objective findings

The objective lane passed every claim it held; two of its findings outside the claims carry here:

2. **`guides/csv.md:90`**, the `DEFAULT_PARSE_OPTIONS` constants row, still reads "The resolved
   default `ParseOptions`" while the constant is typed `Required<Omit<ParseOptions, 'comment'>>`
   and declares no `comment` member (the TSDoc at `src/core/constants.ts:10-15` draws the
   distinction). Ruling: the row states the exception — the resolved defaults for every parse
   option except `comment`, which has no default because its absence is the off state.
3. **`tests/src/core/helpers.test.ts:36-38`** header comment claims the file "Mirrors every
   exported `helpers.ts` symbol" while the tokenizer and table-builder leaves' describes live in
   `parsers.test.ts` (pre-existing drift the unit's report records). Ruling: correct the comment to
   name what the file covers; do not move the describes (the mirror drift is recorded for the
   next change).

Acceptance criteria 5 and 6 follow: 5. the constants row states the `comment` exception; 6. the
helpers test header names what the file covers.
