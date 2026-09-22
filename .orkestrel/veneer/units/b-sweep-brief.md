# Unit B-SWEEP — `findDuplicates` beside the block sweep, and the recalibrated gate

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bsw`, a git worktree detached at `aca0423` (Veneer's session branch and `main`).
Perform the assignment directly and spawn nothing. Do not commit, push, install, or run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

`tests/setupServer.ts` exports `findDuplicates(shared)`, the pure leaf that selects from
`scanStyleBlocks`'s reading the intersections that are duplication rather than coincidence under
the predicate ruling D15 fixes; `tests/setupServer.test.ts` proves it over real scratch trees from
both sides of each boundary; and the styles gate in `tests/setupStyles.test.ts` asserts the
selected subset is empty under a title naming what it proves.

## Context

**Ruling.** `./tmp/units/b-sweep-design-verdict.md` (D15) is the design; its rulings 2, 3, 4, and 6
bind this unit. Where this brief and the verdict disagree, the verdict wins; where the verdict and
the tree disagree, stop and report.

**Evidence.** `tests/setupServer.ts`: `scanStyleBlocks(root)` (around line 568; the pair loop with
`if (declarations.length >= 2)` around line 647 stays exactly as it is), `StyleBlock`,
`StyleOverlap`, `StyleSweepResult` (around lines 258 to 292), the `@example` around line 565
reading `scanStyleBlocks().shared // [] after shared blocks move into mixins`, and `findDrift`
elsewhere in the tree as the naming precedent for selecting an offending subset.
`tests/setupServer.test.ts`: `describe('scanStyleBlocks')` with scratch-tree cases built on
`createScratch` (around line 98 onward; the fixtures carry two-declaration blocks and prove the
tokenizer: comments, interpolation, quoting, whitespace folding); the export inventory case around
line 353. `tests/setupStyles.test.ts` around line 365: the case `carries no shared written
declaration block across style partials` asserting `sweep.shared` equal to `[]`. The tree at
`aca0423` reports no intersection, so the gate is green before and after this change; the scratch
cases carry the falsification.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,styles,writing}.md`.
`styles.md` carries the coincidence line D15 added beside "If a pattern appears in at least two
partials". Skill: none. Guide: `guides/veneer.md` (read; no sentence names the sweep — confirm with
`grep -n "scanStyleBlocks\|shared written declaration" guides/veneer.md`, and if one does, own it).

**Installed primitives.** `@orkestrel/test/server` (`createScratch`, as the existing cases use it);
`@orkestrel/contract` guards. A helper whose job an installed export does is a defect.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`node_modules` installed from this worktree's lockfile. Sibling units and gate chains share the
container; a `test:setup` timeout is a timing reading you report, never a defect you diagnose.
`prettier` must never run; `oxfmt` is the formatter.

**Measurements.** Before editing, run `npm run test:setup` and record the reading (green expected).

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** `tests/setupServer.ts` is also edited by a sibling unit in another
worktree (the `attributeSelector` ladder); place `findDuplicates` directly after `scanStyleBlocks`
and touch nothing else in the file beyond the `@example` and the new function.

## Unknowns

none.

## Obligations

1. **`findDuplicates`.** `export function findDuplicates(shared: readonly StyleOverlap[]): readonly StyleOverlap[]`
   directly after `scanStyleBlocks`, returning the overlaps where, with `shared` the overlap's
   declaration count and `left` and `right` the two blocks' distinct declaration counts,
   `(shared >= 2 && shared * 2 > Math.min(left, right)) || shared >= 6`. TSDoc in the file's voice:
   the summary, `@param`, `@returns`, and `@remarks` stating the two arms in prose (one block is
   most of the other, or the overlap is too large for coincidence), that the absolute arm's number
   rests on a measured maximum coincidence of 3 read on 2026-09-22 across the tree and the family
   partials, and that `scanStyleBlocks` keeps reporting every intersection so an auditor can read
   the refused ones. Move the `[]` `@example` onto `findDuplicates`; give `scanStyleBlocks` an
   `@example` showing a coincidence in its reading.
2. **The plant.** `describe('findDuplicates')` in `tests/setupServer.test.ts` over scratch trees
   under the system temporary directory through `createScratch`, destroyed in `finally`, each case
   calling the real `scanStyleBlocks(scratch.path)` then `findDuplicates`: a copied two-declaration
   block in `_origin.scss` and `components/_echo.scss` reported with both paths, both lines, and both
   declarations; the tie of three shared declarations between two six-declaration blocks refused,
   and in the same case one block shortened to five so the same three are reported; a two-of-five
   against six pair refused beside its positive twin; a six-shared pair inside twelve- and
   fourteen-declaration blocks reported by the absolute arm, beside a five-shared twin refused; and
   the measurement unmoved (`scanStyleBlocks(scratch.path).shared` lists every intersection the
   refused cases included). Add `findDuplicates` to the export inventory at its sorted position.
3. **The gate.** In `tests/setupStyles.test.ts`, retitle the case to `repeats no partial's written
   declaration block in another partial` and change its last assertion to
   `expect(findDuplicates(sweep.shared)).toEqual([])`, importing `findDuplicates`; keep the file and
   folder assertions.

## Scope

- Owned: `tests/setupServer.ts` (obligation 1 only), `tests/setupServer.test.ts` (obligation 2
  only), `tests/setupStyles.test.ts` (obligation 3 only).
- Shared (report-only): none.
- Off-limits: `src/**`, `guides/**` unless the grep in § Law names a sentence, `tests/setupStyles.ts`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, every other file.
- What asserts the state this change ends: the export inventory in `tests/setupServer.test.ts`
  (owned); the gate case (owned).
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped `npx oxfmt` over owned
files, then `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`,
and `npm run test:policy`.

## Output

Write `tmp/units/b-sweep-report.md` and return the same text: the before and after `test:setup`
readings with counts, each plant case's reading and the mutation it distinguishes (name the
mutation and say whether the assertions distinguish it), the touched files, the gate exits,
`git status --porcelain`, `git diff aca0423 --stat`, and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names. Settle yourself: case titles, fixture
declarations, the doc-block wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the `findDuplicates` cases present and the inventory updated.
3. `npm run test:policy` exits 0.
4. `git status --porcelain` lists only the three owned files.

**Observations, not criteria.** none.

## Review evidence

The report and the diff of every owned file.
