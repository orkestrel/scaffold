# Unit B-FORMS-GROUP, round 3 — the prose fixes the fix-round audit named

Successor to `tmp/units/b-forms-group-brief-3.md`. What changed and why: the fix-round audit
(`/home/user/scaffold/.orkestrel/veneer/units/bfg-fix-audit-verdict.md`) confirmed every claim and
named three prose defects outside the claims: a journey comment that overclaims the button's coverage
of the seam, a stale comment in the section proof after D29, and two guide sentences that credit the
element layer with a border it does not write. This round closes exactly those, with the wording
fixed here. The earlier briefs stay in place unedited and bind where this one is silent.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfg` (detached at
`2c10329`, the round-1 and round-2 writes uncommitted in the tree). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-bfg` for every command and file, and
run every npm and npx command from `/home/user/veneer-bfg`. Do not commit, push, install, or run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The four sentences under § Obligations read as written there, nothing else changes, and
`npx oxfmt --check` over the three owned files, `npm run check`, `npm run test:guides`, and
`npm run test:app` exit 0.

## Context

**Evidence.** Read verbatim by the reviewer lane on 2026-09-23 (line numbers approximate):
`tests/app/browser/integration.test.ts:1165-1167` says the button "covers that shared edge until the
control is lifted past it"; `tests/app/browser/sections/InputGroupSection.test.ts:45-46` says "the
journey reaches the plain group's control"; `guides/veneer.md:810` says "a grouped control carries
the element layer's chrome and the group's rules alone"; `guides/veneer.md:793` says "so two
neighbours paint one line". The geometry behind them: the grouped control wears the browser's default
`2px` inset border (no `.form-control` partial ships yet), the button pulls back by `1px`
(`margin-left: calc(var(--bs-border-width) * -1)`), so the button's leading border paints over the
outer column of the control's trailing border; the rest frame `input-group-button--light-1280.png`
shows that two-tone seam (x 1192 `118,118,118`, x 1193 `69,85,108`).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,tests,documentation}.md`.

**Installed primitives.** none touched; this unit adds no code.

**Host.** bash; `/home/user/veneer-bfg`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
`prettier` must never run, `oxfmt` is the formatter.

**Measurements.** The round-2 gates exited 0 per `tmp/units/b-forms-group-report-3.md` (the Set
literal and the `validation.test.ts` reds are the Orchestrator's integration edits).

**Control identifiers.** none.

**Standing conditions.** The round-1 and round-2 writes are present and uncommitted; touch nothing
outside the four sentences. The guide's tables are `oxfmt`-padded; every edit is inside prose.
Rewrap only the paragraph a changed line lengthens past 100 columns.

## Unknowns

none.

## Obligations

1. `tests/app/browser/integration.test.ts`, the input group focus journey's comment: replace the
   clause that the button "covers that shared edge until the control is lifted past it" with "and
   it pulls back by one border width over the control's trailing border, so the button's leading
   border paints over the outer column of that border until the control is lifted past it".
2. `tests/app/browser/sections/InputGroupSection.test.ts`, the comment saying the journey reaches
   the plain group's control: replace it with "the journey reaches the control beside the grouped
   button by name through keyboard traversal, which a shared name would resolve to another
   control".
3. `guides/veneer.md` around line 810: replace "a grouped control carries the element layer's chrome
   and the group's rules alone" with "a grouped control keeps the browser's own border and focus
   outline, which the element layer leaves in place, and the group's rules; where that border is
   wider than `--bs-border-width`, the pull-back covers only its outer column".
4. `guides/veneer.md` around line 793: after "so two neighbours paint one line", add the clause
   "where each neighbour's border is one `--bs-border-width` wide; a control whose border the
   browser still draws paints two columns at its seam until the `form-control` key ships its border".
5. In `tmp/units/b-forms-group-report-4.md`, restate the report's ROADMAP patch with one added
   B-FORMS-CONTROL carrier row: "B-FORMS-CONTROL recaptures the input-group frames and confirms the
   one-line seam once `.form-control` ships its border, and rewrites the two seam sentences of
   `### Input group classes` to the one-line reading", and with the B-FORMS row's audit clause
   removed (the Orchestrator writes that row at the landing).

## Scope

**Owned.** `tests/app/browser/integration.test.ts` (the one comment), `tests/app/browser/sections/InputGroupSection.test.ts`
(the one comment), `guides/veneer.md` (the two sentences), `tmp/units/b-forms-group-report-4.md`.

**Shared (report-only).** `ROADMAP.md` (the patch restated per obligation 5).

**Off-limits.** every other file and every other passage of the owned files.

**What asserts the state this change ends.** `npm run test:guides` reads the guide; `npm run
test:app` runs the section proof; nothing asserts the comment text.

**Tools and limits.** Read, Grep, Edit, Bash; scoped `npx oxfmt --check` only; no `npm install`; no
git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-group-report-4.md`: the exact diff of the owned files (this round's hunks),
the restated ROADMAP patch, and the gate exits. Return as your final message the report path, the
`git status --short` output, and the gate exits. No process diary.

## Deviation contract

Stop and report on any replacement whose source text is not found once. Decide, record, and carry
on from the rewrap of a paragraph a changed line lengthens past 100 columns.

## Acceptance criteria

1. `grep -n` for each of the four source phrases returns nothing and for a distinctive fragment of
   each replacement returns one line (paste the results in the report).
2. `npx oxfmt --check guides/veneer.md tests/app/browser/integration.test.ts tests/app/browser/sections/InputGroupSection.test.ts`
   exits 0.
3. `npm run check` exits 0.
4. `npm run test:guides` and `npm run test:app` exit 0.

**Observations, not criteria.** none.

## Review evidence

A code change: the actual diff and the actual `git status --short`.
