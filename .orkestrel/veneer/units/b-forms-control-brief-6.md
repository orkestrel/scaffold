# Unit B-FORMS-CONTROL, round 6 — the round-5 prose findings

Successor to `b-forms-control-brief-5.md`. What changed and why: the round-5 audit
(`/home/user/scaffold/.orkestrel/veneer/units/bfo-5-audit-verdict.md`: analyst FAIL 4 with
STALE-GROUP-GUIDE outside the claims; reviewer FAIL 4, 5; checker PASS) found the guide's seam
sentence concluding "paints one line" twice, a `below` cross-reference in a comment the round-5
brief prescribed, and an unchanged § Input group classes paragraph that says the cascade ships no
rule for the text control, the select, or the floating label; the reviewer also asked that the
preceding-focus reason live in the range case alone and that the layout comment name what the
input-group proof holds. This round applies the exact text. The earlier briefs stay in place
unedited; the round-5 brief's Role, Host, Tools, Execution shape, and Deviation contract bind here
except where this brief states otherwise.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfo5` (the
worktree detached at `f82de43` with the round-5 writes uncommitted in the tree, the state the
round-5 audit ruled on). Perform the assignment directly and spawn nothing. Use absolute paths
under `/home/user/veneer-bfo5` for every command and file, and run every npm and npx command from
`/home/user/veneer-bfo5`. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every edit under § Edits is applied as written and the gates in § Acceptance criteria are green.

## Context

**Evidence.** Locate every site by its text. `guides/veneer.md` § Input group classes: the
paragraph opening "Every child after the first pulls back by `--bs-border-width`" (around line
1303) and the paragraph opening "The `.dropdown-toggle` corner rules stay withheld" (around line
1321); `tests/app/browser/integration.test.ts`: the plain-select focus case's comment opening
"The traversal starts from the `Range` specimen's control" (around line 1011), and the
input-group focus case's comments "The reading below uses the button's own border width" (around
line 1426) and "The traversal starts from the `Input group addons` specimen's control" (around
line 1435); `tests/src/styles/components/input-group.test.ts`: the comment "The same control
outside a group is no flex item; it takes the full width the `.form-control` rule gives it."
(around line 62).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,tests}.md`
(`writing.md` § Substitutions bans `below` as a cross-reference; a CSS property, value, function,
or `!important` token is its own noun per `bfo-3-audit-verdict.md` claim 2). Skill: none. Guide:
`guides/veneer.md` § Input group classes (the two paragraphs named).

**Installed primitives.** None needed.

**Host.** As the round-5 brief; no browser run is needed because no journey assertion changes.

**Standing conditions.** None.

## Unknowns

None the unit needs.

## Edits

Apply each exactly, once, and rewrap each changed paragraph or comment so no line passes 100
columns and no short line is left inside it.

1. `guides/veneer.md`, the paragraph opening "Every child after the first pulls back": replace
   "wide; a control's own border is the one the `.form-control` rule ships, so the seam paints one
   line, and the group squares" with "wide, and the group squares", then rewrap the whole
   paragraph.
2. `guides/veneer.md`, the paragraph opening "The `.dropdown-toggle` corner rules stay withheld":
   replace the sentence "This cascade ships no rule for the text control, the select, or the
   floating label on its own, so a grouped control keeps the browser's own border and focus
   outline, which the element layer leaves in place, and the group's rules; where that border is
   wider than `--bs-border-width`, the pull-back covers only its outer column." with "The
   `.form-control`, `.form-select`, and `.form-floating` rules ship, so a grouped control carries
   its own `--bs-border-width` border and focus ring under the group's rules.", then rewrap the
   whole paragraph.
3. `tests/app/browser/integration.test.ts`, the input-group focus case: replace "The reading below
   uses the button's own border width" with "The following reading uses the button's own border
   width".
4. Same file, the plain-select focus case: replace the whole comment that opens "The traversal
   starts from the `Range` specimen's control rather than from the document's own" and ends "stops
   at the first element it reaches twice." with "The traversal starts from the `Range` specimen's
   control rather than from the document's own start, for the reason the range slider case
   states."
5. Same file, the input-group focus case: replace the whole comment that opens "The traversal
   starts from the `Input group addons` specimen's control" and ends "the plain-select case
   states." with "The traversal starts from the `Input group addons` specimen's control rather
   than from the document's own start, for the reason the range slider case states."
6. `tests/src/styles/components/input-group.test.ts`: replace "The same control outside a group is
   no flex item; it takes the full width the `.form-control` rule gives it." with "The same control
   outside a group is no flex item, and the group's `width: 1%` stays scoped to the group's
   children, so the bare control takes the full width the `.form-control` rule gives it."

## Scope

**Owned.** `guides/veneer.md` (the two paragraphs named); `tests/app/browser/integration.test.ts`
(the three comments named); `tests/src/styles/components/input-group.test.ts` (the one comment
named).

**Shared (report-only).** None.

**Off-limits.** Every other line of the owned files and every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Apply § Edits, then run in this order and record each exit code:

1. `npx oxfmt --config .oxfmtrc.json --check` over the owned files.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files.
3. `npm run check`.
4. `npm run test:guides`.
5. `npm run test:policy`.
6. `git status --porcelain` and `git diff f82de43 --stat`.

## Output

Write `/home/user/veneer-bfo5/tmp/units/b-forms-control-report-6.md` with: the edits applied (the
final text of every changed sentence and comment); a gate table (command, exit, reading); the
status and stat outputs verbatim; deviations (expected, found, exact evidence, done or not done, at
most one hypothesis); and claims flagged as unverified. Return the same report as your final
message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing
by itself beyond where a rewrap breaks a line. Stop and report on any other conflict, including an
edit whose search text is not found once and exactly once.

## Acceptance criteria

1. Every edit under § Edits is applied as written (the diff against the round-5 tree shows the
   replacement text and the rewraps and no other change).
2. `oxfmt --check`, `oxlint`, and `npm run check` exit 0.
3. `npm run test:guides` and `npm run test:policy` exit 0.
4. The status lists the round-5 set and nothing else.

## Review evidence

The diff against `f82de43` and the status output, rendered by the Orchestrator at the unit's
return; the report `b-forms-control-report-6.md`.
