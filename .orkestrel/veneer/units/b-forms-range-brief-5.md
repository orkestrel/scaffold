# Unit B-FORMS-RANGE-5 — the thumb reads the palette entry

Successor of `tmp/units/b-forms-range-brief-4.md` (ran; report `tmp/units/b-forms-range-report-4.md`).
What changed and why: round 4 closed findings 2 to 10 and stopped on finding 1 because the fix
makes `FORM_RANGE_CASES` in `tests/setupStyles.ts` false, and that file was off-limits — a scope
error in the round-4 brief (the owned set was drawn from the files the finding names rather than from
the files its result makes false). This round grants that file and lands the patch set the round-4
report carries as Patches A to E, plus the last `unavailable` site.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfr`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfr`
for every command and file, and run every npm and npx command from `/home/user/veneer-bfr`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The range thumb's resting fill and held tint read `--vn-palette-blue` (and `--vn-palette-white-base`)
in the partial, the case table, the ledger rows, the guide, and the proof, with the proof red under
the role token restored and green after; every site names the disabled state `disabled`.

## Context

**Law and design.** As the round-4 brief states (`tmp/units/b-forms-range-brief-4.md` § Context);
family ruling 4 is the tokenizing ceiling. Skill: none. Guide: `guides/veneer.md` § Form range
classes.

**The patch set.** `tmp/units/b-forms-range-report-4.md` § The patch set for finding 1: Patch A (the
partial), Patch B (`FORM_RANGE_CASES` in `tests/setupStyles.ts`, around line 2763: the four `reads`
entries naming `--vn-color-primary-base` take `--vn-palette-blue`), Patch C (the four `form-range`
ledger rows, Veneer cell, `tokenized`, repadded to the table's column), Patch D (the fill bullet in
§ Form range classes, in that section's voice), Patch E (the fill case in `form-range.test.ts` binds
the resting thumb rule's declared value to `var(--vn-palette-blue)` through `readRules`, and drops
`TOKEN_NAMES.color.primary.base` from its loop). Also `FORM_RANGE_MARKUP` (around line 2842): the
middle control's accessible name reads `Disabled range value`.

**Host and standing conditions.** As in the round-4 brief. `npm run test:setup` is red at baseline on
the sweep case alone until B-SWEEP-2 lands.

**Control identifiers.** none.

## Unknowns

none.

## Obligations

1. Apply Patches A to E and the `FORM_RANGE_MARKUP` name, exactly as the report states them, and
   run `npm run build:src`, `npm run test:src:styles`, `npm run test:setup` (sweep red alone), and
   `npm run test:conformance`; all green apart from the named baseline red.
2. Mutation: the role token restored in the resting thumb rule of the partial; run
   `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts`
   and record red; revert by the exact reverse edit; record green; record the partial's SHA-256
   before the plant and after the revert.

## Scope

- Owned: `src/styles/components/_form-range.scss`, `tests/setupStyles.ts` (the `FORM_RANGE_CASES`
  `reads` entries and the `FORM_RANGE_MARKUP` name only), `guides/ledger/departures.md` (the four
  rows only), `guides/veneer.md` (the fill bullet only),
  `tests/src/styles/components/form-range.test.ts` (the fill case only).
- Off-limits: every other file.
- Tools and limits: Read, Grep, Glob, Edit, Bash. No tree-wide `format`, `lint --fix`, or `build`
  beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, and the runs of obligation 1, all from `/home/user/veneer-bfr`.

## Output

Write `/home/user/veneer-bfr/tmp/units/b-forms-range-report-5.md` and return the same text: the
diff of each owned file, the mutation's red and green readings with the commands, the gate exits with
counts, `git status --porcelain`, the SHA-256 pair, and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names. Settle yourself: the ledger cells'
padding, the bullet's exact wording within Patch D's sense.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles`, `npm run test:conformance` exit 0; `npm run test:setup` reports the
   sweep case as its only red.
3. The mutation ran red and the revert green, the partial byte-identical.
4. `git status --porcelain` lists only the RANGE unit's paths.

## Review evidence

The report and the diff.
