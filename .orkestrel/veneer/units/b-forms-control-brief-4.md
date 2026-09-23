# Unit B-FORMS-CONTROL, round 4 — the two-sentence micro-round

Successor to `/home/user/veneer-bfo/tmp/units/b-forms-control-brief-3.md`. What changed and why:
the round-3 audit (`/home/user/scaffold/.orkestrel/veneer/units/bfo-3-audit-verdict.md`: analyst
FAIL 2, 3 with REPORT-TRAIL-START; reviewer FAIL 3, 5 with R1 to R3; checker PASS) left two
sentences in the `FORM_CONTROL_CASES` remark: one leaves two rung tokens on a pronoun, and one
claims that an empty `reads` map establishes Bootstrap's values where the Node case proves only
that the rule reads no custom property. This round applies the exact replacement text. The earlier
briefs stay in place unedited; the round-1 brief's Context, Execution, Output, and Deviation
contract bind here except where this brief states otherwise.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfo` (detached at
`2c10329`, the round-1 to round-3 writes uncommitted in the tree, the state the round-3 audit ruled
on). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bfo` for every command and file, and run every npm and npx command from
`/home/user/veneer-bfo`. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Both edits under § Edits are applied as written and the gates in § Acceptance criteria are green.

## Context

**Evidence.** `tests/setupStyles.ts`, the `FORM_CONTROL_CASES` doc block's `@remarks` text
(around lines 3808 to 3821 at the round-3 tree; locate it by the text quoted under § Edits).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation}.md`.
Skill: none. Guide: none owned.

**Installed primitives.** None needed.

**Host.** Linux, bash, npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.

**Standing conditions.** `npm run test:setup` is red only on the shipped-key Set literal in
`tests/setupServer.test.ts` (the Orchestrator's integration edit); do not touch it.

## Unknowns

None the unit needs.

## Edits

Apply each exactly, once, and rewrap the changed paragraph so no line passes 100 columns.

1. Replace "for a\n `declared` or `compiled` one, followed by ` !important` where the release
   writes that priority." (the clause inside the `values` paragraph; its line break may sit
   elsewhere) with "for a `declared` reading or a `compiled` reading, followed by ` !important`
   where the release writes that priority."
2. Replace the whole `reads` paragraph, "The `reads` map is keyed by property. A property the map
   leaves out is the claim that its declaration writes no `var()`, so an empty map separates a rule
   holding Bootstrap's own values from one this package routed onto tokens, and a token moved from
   the property that consumes it onto another declaration of the same rule reads as a different
   row.", with "The `reads` map is keyed by property. A property the map leaves out is the claim
   that its declaration writes no `var()`, so an empty map states that the rule reads no custom
   property and leaves its literals to the value assertions. A token moved from the property that
   consumes it onto another declaration of the same rule reads as a different row."

## Scope

**Owned.** `tests/setupStyles.ts` (the `FORM_CONTROL_CASES` doc block's `@remarks` text).

**Shared (report-only).** None.

**Off-limits.** Every other line of `tests/setupStyles.ts` and every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Apply § Edits, then run in this order and record each exit code:

1. `npx oxfmt --config .oxfmtrc.json --check tests/setupStyles.ts`.
2. `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts`.
3. `npm run check`.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`.
5. `git status --porcelain` and `git diff 2c10329 --stat`.

## Output

Write `/home/user/veneer-bfo/tmp/units/b-forms-control-report-4.md` with: the two edits applied
(the final text of each changed sentence); a gate table (command, exit, reading); the corrected
evidence statement for the range journey deviation in these terms: the failed walk started at the
document's start, crossed the `Form control date` specimen, and stopped there because
`document.activeElement` stays on the date control while Tab steps through its fields, so the
walk reached the date control twice; the repaired walk starts at the `Form control readonly`
specimen's control; the retained trails are
`/home/user/scaffold/.orkestrel/veneer/units/bfo-journey-1-<variant>.log.txt`; the status and stat
outputs verbatim; deviations (expected, found, exact evidence, done or not done, at most one
hypothesis); and claims flagged as unverified. Return the same report as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing
by itself beyond where the rewrap breaks a line. Stop and report on any other conflict, including
an edit whose search text is not found once and exactly once.

## Acceptance criteria

1. Both edits are applied as written (the diff against the round-3 tree shows the replacement
   text and the rewrap and no other change).
2. `oxfmt --check`, `oxlint`, and `npm run check` exit 0.
3. The scoped `tests/setupStyles.test.ts` run exits 0.
4. The status lists the round-3 set and nothing else.

## Review evidence

The diff against `2c10329` and the status output, rendered by the Orchestrator at the unit's
return; the report `b-forms-control-report-4.md`.
