# Unit B-FORMS-GROUP-READ — the input-group floating corners read against each field's own twin

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfx` (a git
worktree on branch `unit/bfx`, clean at its head, with FLOATING, SELECT, and the FLOATING-SELECT
reading present; `node_modules` installed). Perform the assignment directly and spawn nothing. Use
absolute paths under `/home/user/veneer-bfx` for every command and file, and run every npm and npx
command from `/home/user/veneer-bfx`. Do not commit, push, install, or run `git checkout`, `git
restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The case "squares the control or select inside a floating wrapper on the side its neighbour sits"
in `tests/src/styles/components/input-group.test.ts` reads each field's kept corner against its own
ungrouped twin's radius, so it is green with the shipped `.form-select` radius and stays green when
the control family ships its own.

## Context

**Evidence.** Read on 2026-09-23 (line numbers approximate; locate by text): the case around line
243 of `tests/src/styles/components/input-group.test.ts` loads `INPUT_GROUP_ROUNDING`
(`tests/setupStyles.ts` around line 4388: `@layer elements { .form-control, .form-select {
border-radius: 7px } }`), mounts `INPUT_GROUP_FLOATING_CASES` and an ungrouped control and select,
reads `round` (the ungrouped control's `border-top-left-radius`) and `selected` (the ungrouped
select's), asserts `expect(selected).toBe(round)`, and compares every field's corners to
`corners.map((kept) => kept * round)`. Since the SELECT landing the shipped `.form-select` rule in
the components layer carries `border-radius: var(--bs-border-radius)` (6px), which outranks the
fixture's elements-layer 7px, so `selected` reads 6 against `round` 7 and the case is red
(`expected 6 to be 7`). D31 retires the fixture when the control ships its own radius (carrier
B-FORMS-CLOSE, after CONTROL lands).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,typescript,writing}.md`;
D31 in `/home/user/veneer-bfx/tmp/units/decisions-round-2.md`. Skill: none. Guide:
`guides/veneer.md` (report-only).

**Installed primitives.** `@orkestrel/test`: `readPixels`, `requireValue`; add no helper.

**Host.** as every unit in this worktree: npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; `prettier` must never run; run `npm run build:src`
before every browser reading.

**Measurements.** The case is red at dispatch with `selected` 6 and `round` 7 (the B-FORMS-MIXIN
unit's reading of 2026-09-23, byte-identical CSS).

**Control identifiers.** none.

**Standing conditions.** none.

## Unknowns

- none.

## Obligations

1. In the case, keep `round` and `selected` and assert each is greater than 0; remove
   `expect(selected).toBe(round)`; rewrite the comment before the mount to state that the last box
   holds the same control and select outside a group, each the radius its own kind's kept corner is
   read against, because the select ships its radius from its own rule while the control reads the
   fixture's until the control family lands; compare each field's corners to
   `corners.map((kept) => kept * (field.matches('.form-select') ? selected : round))`.
2. Failing-first: run the scoped browser command before the edit and record the red (`expected 6
   to be 7`); after the edit record the green. Mutation: swap the two references (the select read
   against `round`, the control against `selected`); the case must redden because the radii differ;
   reverse exactly; record green.
3. Run `npx oxfmt --config .oxfmtrc.json --write` over the owned file.

## Scope

**Owned.** `tests/src/styles/components/input-group.test.ts` (the one case).

**Shared (report-only).** `ROADMAP.md` (the D31 row stays; return its text only if the change
makes it false).

**Off-limits.** every other file.

**What asserts the state this change ends.** The input-group proof; derived by running it.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned file, `npx oxlint --config
.oxlintrc.json --deny-warnings` over it, `npm run check`, `npm run build:src`, and
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
tests/src/styles/components/input-group.test.ts tests/src/styles/components/form-select.test.ts`,
all from `/home/user/veneer-bfx`.

## Output

Write `/home/user/veneer-bfx/tmp/units/b-forms-group-read-report.md` and return the same text: the
site; the failing-first and mutation record; the gate exits with counts; `git status --porcelain`;
and deviations per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. No
process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on the case staying red after the edit or the mutation failing to redden. Decide,
record, and carry on from the comment's wording.

## Acceptance criteria

1. `npx oxfmt --check`, the scoped `oxlint`, and `npm run check` exit 0.
2. `npm run build:src` and the scoped browser run exit 0 with every case passing; the record shows
   the red before the edit and the mutation's red.
3. `git status --porcelain` lists the one owned file and nothing else.

## Review evidence

The report and the diff of the owned file against the worktree's head.
