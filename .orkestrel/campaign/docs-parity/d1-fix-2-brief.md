# Unit brief — D1-fix-2: the guide-readers fix round after audit round 2, in `@orkestrel/guide`

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sole writer in `/home/user/fleet/guide`, whose tree carries D1 and D1-fix uncommitted. Perform the assignment directly and spawn nothing. This brief succeeds `docs-d1-fix-brief.md` and `docs-d1-guide-readers-brief.md`, which stay in force wherever this brief is silent.

## Objective

The nameless-row check reads a cached `Guide` projection like every other catalog check, so the drop-in suite needs no second parse and no markdown import; the tag rule is stated in one term at every owned site; the transform's guide-only clauses are listed as guide-only; an indented `@word` inside a fenced example body no longer ends the tag search; the pairing rule is stated per title; and the prose the round-2 lanes found inaccurate is corrected.

## Read first

`/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-audit-2-subjective.md` (claim 1 and findings F1 to F3), `d1-audit-2-objective.md` (findings F1 to F6), `d1-audit-2-checker.md`, `d1-verify-2-report.md`; then the code as D1-fix left it: `src/core/helpers.ts` (`findUnnamed` at 1424, `collectSummaries` at 1663, `collectExamples` at 1689 to 1695, `extractExampleLines` at 1641, the TSDoc at 1626, `findDrift`'s fence leg at 1936), `src/core/Guide.ts` (the cached projections at 33 to 59), `src/core/types.ts` (`GuideInterface`, the `examples()` contracts at 345 and 360), `guides/guide.md` (the projection enumeration at 277 to 279, the transform at 316 to 333, the tag rule at 336 to 338, the pairing paragraph at 347 to 349, the Helpers rows at 99 and 117, the RN row at 464 to 470, the EX row at 487, the EQ row at 501, § Tests at 665 to 672), `tests/guides.test.ts` (the RN wiring at 24 and 93), `tests/src/core/helpers.test.ts`.

## Findings and rulings

1. **RN takes a raw document and forces the drop-in suite to re-parse** (subjective claim 1). Ruling: the nameless rows are a cached `Guide` projection like `tagline`. Rename `findUnnamed` to `extractUnnamed(document)` (a reader over the document, beside `extractTagline`); add `unnamed(): readonly string[]` to `GuideInterface` in `src/core/types.ts` with its contract, computed once in `Guide`'s constructor and cached; the RN check reads `expect(guide.unnamed()).toEqual([])` in `tests/guides.test.ts`, which drops its `createMarkdown` import and its second parse; the RN catalog row names `guide.unnamed()` as the finding list, writes the separator as space-pipe-space, replaces the sentence "leaves the documented surface carrying no name for SB or MB to miss" with one stating that such a row never enters `guide.surface()` or a `MethodGroup`, so no bijection leg can report it, and states RN's limit (objective F2): RN reads the rows of `## Surface` and `## Methods` tables, so a guide documenting its surface with H3 headings alone gives RN nothing to read and SB's guard covers that surface. The Helpers row, the `GuideInterface` Methods table, the class TSDoc, and § Tests follow.
2. **The projection enumeration omits `tagline`** (subjective F1) — add `tagline` and `unnamed` to `guides/guide.md:277-279`.
3. **The tag rule is worded two ways** (subjective F2, objective F3). Ruling: the term is "an `@example` tag opening a line at its first non-blank column"; replace "exact block-position `@example`" at `guides/guide.md:99`, `:245`, `:375`, `:487`, `src/core/helpers.ts:1626`, `src/core/types.ts:345`, `:360`, and wherever else `grep -rn "block-position" src guides tests` finds it; the README patch in your report names both README occurrences (`README.md:117`, `:144`) with the same replacement.
4. **`\|` is listed as a both-sides clause** (subjective F3) — move it into the guide-side sentence with emphasis, link, and image.
5. **The relaxed tag search truncates an indented `@word` inside a fenced example body** (objective F4). Ruling: a line inside a fenced body (between a line opening with three backticks or tildes and its closing marker, after unwrapping) is outside the tag search in `collectSummaries`, `collectExamples` (both the `@example` match and the next-tag search), and `extractExampleLines`; state the rule at `guides/guide.md:336-338`; add a fixture with an `@example` fence whose body carries `  @decorator()` and assert the example's code keeps that line and the paragraph and the next tag are unaffected. Record the failing-first reading.
6. **Two headings with the same text share one pairing** (objective F5) — state in the pairing paragraph and the EQ row that the pairing is per title across the document, not per heading, as the source side already states.
7. **Report citations** (objective F6) — your report gives every `file:line` from the tree as you leave it; note the two corrections to `d1-fix-report.md` (`collectTitles` row at `guides/guide.md:121`, the `findDrift` three-state TSDoc opening at `helpers.ts:1899`).
8. **Recorded, no change:** `collectTitles` versus `collectSummaries` naming (subjective F4); gate greenness resolved by the verifier.

## Scope

As the D1 brief; the same permitted commands; never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -rn "findUnnamed\|block-position\|createMarkdown" src tests/guides.test.ts guides` prints only the `@orkestrel/markdown` import inside `src/**` where it already stood before D1 (`src/core/Guide.ts`, `src/core/parsers.ts`, `src/core/helpers.ts`) and nothing in `tests/guides.test.ts` or `guides/guide.md`; `grep -n "unnamed(): readonly string\[\]" src/core/types.ts` prints one line.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with the finding-5 fixture and a `Guide.unnamed()` case present and green, and the finding-5 fixture shown red before its fix.
4. `npm run test:guides` exits 0 with RN reading the projection.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d1-fix-2-report.md`: per finding what changed with `file:line`, the failing-first reading for finding 5, the README patch for both occurrences, each criterion with exit code and last lines, `git status --short` and `git diff --stat` against `HEAD`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a ruling cannot be met without a compiler or parser in `src/**`, when a criterion needs an off-limits file, or when a gate fails outside the owned files. Wording inside a sentence and case naming are yours.
