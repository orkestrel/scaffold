# Unit B-SWEEP-2 — the amended floor of `findDuplication`, and the plant that pins it

Successor of `tmp/units/b-sweep-brief.md` (ran; report `tmp/units/b-sweep-report.md`). What changed
and why: D15 was amended after B-PASSIVE-C measured a 3-of-7-and-5 coincidence
(`.card-img-overlay` against `.ratio > *`), moving the relative arm's floor from 2 shared
declarations to 4; the first round was dispatched before the amendment reached it and landed the
original floor. The exported name is `findDuplication`: the first round's deviation 1 found that
`findDuplicates` collides with `@orkestrel/reason`'s hosted surface under the policy gate, and the
Orchestrator accepted the rename, so every `findDuplicates` in the design verdict reads as
`findDuplication`.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bsw`, a git worktree
detached at `aca0423` carrying the first round's uncommitted writes in `tests/setupServer.ts`,
`tests/setupServer.test.ts`, and `tests/setupStyles.test.ts`. Perform the assignment directly and
spawn nothing. Use absolute paths under `/home/user/veneer-bsw` for every command and file; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

`findDuplication` in `/home/user/veneer-bsw/tests/setupServer.ts` selects under the amended
predicate `(count >= 4 && count * 2 > smallest) || count >= 6`, its TSDoc states the amended arms,
and `describe('findDuplication')` in `/home/user/veneer-bsw/tests/setupServer.test.ts` pins each
boundary from both sides on real scratch trees.

## Context

**Ruling.** `/home/user/veneer-bsw/tmp/units/b-sweep-design-verdict.md`: § Rulings (D15) and
§ Amendment (2026-09-22, after B-PASSIVE-C returned). The amendment wins over ruling 3 and ruling 4
where they disagree; where the verdict and the tree disagree, stop and report.

**Evidence.** `tests/setupServer.ts`: `findDuplication` directly after `scanStyleBlocks` (around
line 660; the predicate line reads `return (count >= 2 && count * 2 > smallest) || count >= 6`),
its TSDoc `@remarks` naming the relative arm's floor of 2. `tests/setupServer.test.ts`:
`describe('findDuplication')` (around line 279 onward) with cases shaped (2, 2, 2) reported,
(3, 6, 6) refused then (3, 5, 6) reported, (2, 5, 6) refused then (2, 3, 6) reported, (6, 12, 14)
reported then (5, 12, 14) refused, and the sweep case with (2, 5, 6) and (3, 6, 6) in one tree; the
export inventory already lists `findDuplication`. `tests/setupStyles.test.ts` around line 373: the
gate case `repeats no partial's written declaration block in another partial` already asserts
`findDuplication(sweep.shared)` equal to `[]`; it needs no change.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,writing}.md`. Skill: none. Guide: none
(no sentence in `guides/veneer.md` names the sweep).

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`node_modules` installed, `dist/` built by the first round (the `setup` project reads it). Sibling
units and gate chains share the container; a `test:setup` timeout is a timing reading you report,
never a defect you diagnose. `prettier` must never run; `oxfmt` is the formatter.

**Measurement.** Before editing, run
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`
from `/home/user/veneer-bsw` and record the reading (green expected: the first round's cases pass
under the floor they were written for).

**Control identifiers.** none; name every test for what it proves.

## Unknowns

none.

## Obligations

1. **The predicate.** Change the predicate line to
   `return (count >= 4 && count * 2 > smallest) || count >= 6` and nothing else in the function
   body. Rewrite the `@remarks` so it states: the relative arm takes an overlap of at least 4
   declarations that is more than half of whichever block writes fewer, so one block is most of the
   other; a whole copy of a two- or three-declaration rule sits under that floor and passes as a
   coincidence, which is the recorded boundary; the absolute arm takes an overlap of at least 6
   declarations, a width no accidental agreement here reaches, the largest overlap two partials wrote
   independently being 3 declarations measured across `src/styles` and the family partials on
   2026-09-22; `scanStyleBlocks` keeps reporting every intersection, so an auditor reads the refused
   ones in its result. Keep the summary, `@param`, `@returns`, and `@example` as they are.
2. **The plant.** Replace the cases in `describe('findDuplication')` with these, each building a real
   scratch tree through `createScratch`, destroying it in `finally`, and calling the real
   `scanStyleBlocks(scratch.path)` before `findDuplication`; name each case for what it proves:
   - (4, 4, 4): a four-declaration block in `_origin.scss` copied whole into `components/_echo.scss`
     is reported with an exact `toEqual` naming both paths, both lines, and all four declarations
     on each side and in the intersection (the shape of the first round's first case).
   - (3, 6, 6) refused, then (4, 6, 6) reported: two six-declaration blocks sharing three read `[]`;
     rewritten in the same case so they share four, the intersection is reported with those four
     declarations.
   - (2, 2, 2) and (3, 3, 3) in one tree refused: a two-declaration block copied whole and a
     three-declaration block copied whole read `[]` from `findDuplication`, while
     `scanStyleBlocks(scratch.path).shared` lists both intersections with their declarations (the
     recorded boundary, and the measurement unmoved).
   - (4, 8, 8) refused, then (4, 7, 8) reported: the tie at the floor reads `[]`; one block narrowed
     to seven in the same case, the same four declarations are reported (this pins `>` against
     `>=`).
   - (6, 12, 14) reported, then (5, 12, 14) refused: keep the first round's absolute-arm case.
   - The sweep unmoved: keep the first round's case with (2, 5, 6) and (3, 6, 6) in one tree,
     asserting `sweep.shared` lists each intersection and `findDuplication(sweep.shared)` is `[]`.
3. **The mutation table.** After the cases pass, apply each mutation to `tests/setupServer.ts` as a
   transient edit, run the scoped command from § Measurement, record the reading, and revert it by
   the exact reverse edit (confirm with `git diff --stat` that only the intended change remains):
   floor `4` to `3`; floor `4` to `5`; `>` to `>=`; absolute `6` to `5`; the absolute arm dropped;
   a predicate returning `[]`; a predicate returning every intersection. Name in the report which
   case reddens under each. A mutation no case reddens is a finding, not a fix: report it.

## Scope

- Owned: `tests/setupServer.ts` (obligation 1 only), `tests/setupServer.test.ts` (obligation 2
  only).
- Shared (report-only): none.
- Off-limits: `tests/setupStyles.test.ts` (already correct), `src/**`, `guides/**`,
  `tests/setupStyles.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, and `npm run test:policy`, all from
`/home/user/veneer-bsw`.

## Output

Write `/home/user/veneer-bsw/tmp/units/b-sweep-report-2.md` and return the same text: the
before-and-after scoped readings with counts, the mutation table (mutation, reading, the case that
reddens or the statement that none does), the touched files, the gate exits, `git status
--porcelain`, `git diff aca0423 --stat`, and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names. Settle yourself: case titles, fixture
declarations and selector names, the `@remarks` sentence order.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the six cases of obligation 2 present.
3. `npm run test:policy` exits 0.
4. `git status --porcelain` lists only `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
   `tests/setupStyles.test.ts` (the third unchanged by this round).

**Observations, not criteria.** none.

## Review evidence

The report and the diff of the owned files.
