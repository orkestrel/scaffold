# Unit brief — D1-fix: the guide-readers fix round, in `@orkestrel/guide`

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent (the same engine as D1's writer; the round is audited afresh by two Opus reviewer lanes and a checker because the Codex bench is dark, recorded). Sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing. This brief succeeds `docs-d1-guide-readers-brief.md`, which stays in force wherever this brief is silent.

## Objective

The D1 readers close the audit's findings: a nameless table row is a finding, a compared pair with no text on either side is a drift, the transform is stated once for both sides, the over-indented tag is read, a heading's first fence is the compared one, and the names and the guide follow — with every existing criterion of the D1 brief still green.

## Read first

1. The D1 brief (`tmp/units/docs-d1-guide-readers-brief.md`), your predecessor's report (`tmp/units/docs-d1-guide-readers-report.md`), and the three audit lanes' verdicts with the verifier's report: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-audit-subjective.md`, `d1-audit-objective.md`, `d1-audit-checker.md`, `d1-verify-report.md`. Read the two FAIL lanes in full; every finding below cites them.
2. The rules the D1 brief names, and `.claude/rules/names.md` § Standalone helpers.
3. The code as D1 left it (uncommitted in this checkout; `git diff` shows it): `src/core/helpers.ts` (`extractCellText` at 962, `findColumnIndex` at 988, `extractSurface` at 1306 and its TSDoc at 1293, `extractMethods` at 1372, `normalizeComment` at 1462, `normalizeSummary` at 1487, `collectSummaries` at 1623, `collectExamples` at 1651, `extractFences` at 1763, `computeDrift` at 1836, `findDrift` at 1871, `collectTitled` at 1923), `src/core/types.ts`, `guides/guide.md` (§ The extraction model at 307 to 334, § The check catalog at 431 to 486, the Helpers table at 71 to 122, § Tests), `tests/src/core/helpers.test.ts`, `tests/guides.test.ts`.

## Findings and their rulings (each closes in this unit unless it says otherwise)

1. **A row with no code-span name is dropped silently** (`helpers.ts:1318`, `:1390`; subjective claim 3, objective claim 3). Ruling: it is a finding. Add `findUnnamed(document: MarkdownDocument): readonly string[]` to the `find*` family in `src/core/helpers.ts`, returning the flattened text of every row in a `## Surface` or `## Methods` table whose first cell carries no code span, in document order; give it a catalog row in `guides/guide.md` with a two-letter check id you choose beside SB and MB, the comparison named, and the guard stated (the table walk it reuses); wire it into this checkout's `tests/guides.test.ts` as an empty-array assertion; rewrite the TSDoc at `helpers.ts:1293-1294` (and the `extractMethods` twin) to say the reader skips such a row and the new check reports it. Tests: a positive control planting a nameless row in each section, and a negative control from outside the membership (a row whose name is a code span inside emphasis, which the reader accepts).
2. **A pair with no text on either side reports agreement** (`helpers.ts:1841`; objective claim 3, subjective claim 3, objective claim 8 on `guides/guide.md:467-469`). Ruling: the plan's decision 3 makes a table without a `Summary` column a finding, so a pair carrying no text on either side is a `Drift` with the key alone (`{ key }`), and SQ and MQ are non-vacuous by construction. Change `computeDrift` so `undefined` against `undefined` reports `{ key }`, reverse the `computeDrift` case "returns undefined when neither side carries text" into its opposite, add a `findDrift` case over a table with no `Summary` column against an undocumented declaration, keep the SQ paragraph's "never as agreement" and make its preceding sentence name the three states (guide text alone, source text alone, neither), and align the TSDoc at `helpers.ts:976-977` and on `computeDrift` and `findDrift` with that rule. State in `guides/guide.md` § Tests (this checkout's own gate) that this guide adopts the `Summary` column in a later change and its gate runs SB, MB, EX, and FI until then, so the catalog's SQ, MQ, and EQ rows describe checks this checkout does not yet wire (subjective finding 2, objective referral 3).
3. **The transform is stated per side while the code applies one form to both** (subjective claim 2: `helpers.ts:1329`, `:1394` through `:1489-1490`; the image descent at `:966` unnamed in the TSDoc at `:951-952` and the guide row at `:119`). Ruling: one transform, both sides, stated once. Rewrite `guides/guide.md:307-319` to list the clauses once for both sides — `{@link X}` and `{@link A.b}` to the code token of the target text, `{@link X | text}` to the code token of `text`, emphasis to its text, a link to its text, an image to its alternative text, `\|` unescaped, whitespace collapsed, ends trimmed, code spans kept — and note that a guide cell carrying a literal `{@link}` token rewrites the same way. Name the image descent in `extractCellText`'s TSDoc and its Helpers row. No code change.
4. **`collectTitled` breaks the `{verb}{Noun}` form** (subjective finding 1). Rename it `collectTitles` in code, tests, TSDoc, and the guide's Helpers row.
5. **The Helpers table appends rather than places** (subjective finding 3). Move the `extractCellText` row beside `extractCellLinks` and `findColumnIndex`, and place every other new row by topic.
6. **A block tag indented past one space after the marker is not recognized** (objective finding 1: `helpers.ts:1466` against `:1633` and `:1652`). Make `collectSummaries` and `collectExamples` tolerate leading whitespace before a tag after unwrapping (the paragraph ends at the first line whose first non-blank character opens a tag; `@example` is matched at the first non-blank column; the next-tag search likewise), and add a fixture with ` *   @param` and ` *   @example` proving the summary stops at the tag and the example is read.
7. **Several fences under one heading each compare against the same `@example`** (objective finding 2, subjective referral 3: `helpers.ts:1894-1904`, `:1936-1939`). Ruling: the first fence under a heading is the compared one, and a later fence under the same heading is outside the comparison. Make `findDrift`'s fence leg compare only the first fence per title, state the rule in `guides/guide.md` § the example pairing and in the EQ row, and add a fixture with two fences under one heading where the second differs from the block and reports nothing while the first still reports its own drift.
8. **`Drift.source` adds a sense of `source`** (subjective finding 4) — recorded, no change. **`findKindIndex`'s removal** (objective referral 1) — resolved by the Orchestrator's sweep: no TypeScript consumer anywhere in the fleet; the name appears only in the vendored `guides/guide.md` mirrors, which refresh from the published copy at the release. **Gate greenness** (subjective claim 9, objective referral 2) — resolved by the verifier's independent run, `GATES: GREEN`.

## Scope

As the D1 brief: owned `src/core/types.ts`, `src/core/helpers.ts`, `src/core/Guide.ts`, `src/core/sources/Source.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `src/core/constants.ts`, `guides/guide.md`, `tests/src/core/**`, `tests/guides.test.ts`; everything else off-limits; the same permitted commands; never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "collectTitled" src tests guides` prints nothing; `grep -n "export function findUnnamed\|export function collectTitles" src/core/helpers.ts` prints one line each.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with, present and green, the cases findings 1, 2, 6, and 7 name, each named for what it proves.
4. `npm run test:guides` exits 0 with the new check wired, the Helpers table placed, and the catalog and transform prose as ruled.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d1-fix-report.md`: per finding what changed with `file:line`, the check id chosen, each criterion with exit code and last lines, `git status --short` and `git diff --stat` (against `HEAD`, so the diff carries D1 and this round together), flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a ruling above cannot be met without a compiler or parser in `src/**`, when a criterion needs an off-limits file, or when a gate fails outside the owned files. The check id, the case wording, and the placement of prose inside a section are yours to decide and record.
