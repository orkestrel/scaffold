# Unit B-FORMS-CONTROL, round 5 — the landing's consequences in the sibling proofs

Successor to `b-forms-control-brief-4.md`. What changed and why: CONTROL landed on the session
branch (`4bd3230`, repaired at `cd4fdd2` and `f82de43`), and the landing chain's regeneration and
gates read three consequences the CONTROL worktree could not see because its base predates the
select and input-group regions: the plain-select and input-group focus journeys walk from the
document's start, cross the `Form control date` specimen, and stop there (the installed
`driveTraversal` walk stops at the first element it reaches twice), so their frames go missing and
the portfolio cases redden; the input-group layout proof holds a bare `.form-control` to less than
its container's width, which the shipped `width: 100%` makes false; and one test comment and one
guide sentence say the control's border is the browser's own until the `form-control` key ships.
This round repairs the sibling proofs with the pattern the family's own cases use and rewrites the
two sentences. The earlier briefs stay in place unedited; the round-1 brief's Execution, Output,
and Deviation contract bind here except where this brief states otherwise.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfo5` (a worktree
detached at `f82de43`, the session branch tip, with `node_modules` installed by the Orchestrator).
Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bfo5` for every command and file, and run every npm and npx command from
`/home/user/veneer-bfo5`. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every edit under § Edits is applied as written, the two repaired journeys reach their controls and
place their frames in every variant, the input-group layout proof is green, and the gates in
§ Acceptance criteria are green.

## Context

**Evidence.** The chain's readings at `f82de43` (the regeneration log
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/regen-bfo.log.txt` and
the gate log `main-bfo-gates.log.txt`; read-only for you):

```text
FAIL journey > reaches the plain select through the keyboard and rings it with the focus binding the button carries
Error: Interactive target "Warehouse" is not reachable through forward Tab traversal: … > TEXTAREA: > INPUT: > INPUT:
FAIL journey > reaches the input group control beside a button through the keyboard and lifts it over the button
Error: Interactive target "Dispatch address" is not reachable through forward Tab traversal: … > TEXTAREA: > INPUT: > INPUT:
FAIL portfolio > expands one filename per scenario and variant, and places every registered scenario
AssertionError: expected [ 'active-page', …(127) ] to strictly equal [ 'active-page', …(129) ]   (form-select-base-focus and input-group-button-focus missing)
FAIL input group layout > lays the group out as a wrapping flex row whose controls take the free space
AssertionError: expected 600 to be less than 600   (tests/src/styles/components/input-group.test.ts:64)
```

The showcase mounts the regions in this order (`app/browser/Showcase.ts`): … FormCheck,
FormFloating, FormControl, FormRange, FormSelect, Card, ListGroup, Badge, Breadcrumb, Close,
InputGroup. The `Form range` region's specimens are `Range` and `Range disabled`; the `Form select`
region's first specimen is `Form select base`; the `Input group` region's specimens are
`Input group plain`, `Input group addons`, `Input group button`, `Input group large`,
`Input group small`, and `Input group validation`. The pattern to copy is the range focus case in
`tests/app/browser/integration.test.ts` (around line 902, "reaches the range slider through the
keyboard and leaves its ring to the thumb"): it reads a `preceding` element from an earlier
specimen with `requireValue(readSpecimen(mounted.host, '…').querySelector<HTMLElement>('…'), '…')`,
calls `preceding.focus()`, and then `traverseAccessible(readName(control))`, with a comment stating
the reason.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,writing,documentation}.md`.
Skill: none. Guide: `guides/veneer.md` § Input group classes (the one sentence named under § Edits).

**Installed primitives.** `traverseAccessible`, `readSpecimen`, `readName`, and `requireValue` are
already imported in `integration.test.ts`; add no import and no helper.

**Host.** Linux, bash, npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; `dist/` may be absent, so run `npm run build:src` before the browser proofs.
A `CAPTURE=1` journey run of one variant takes about two minutes.

**Standing conditions.** None.

## Unknowns

None the unit needs.

## Edits

Apply each exactly, once. Wrap a comment you write so no line passes 100 columns.

1. `tests/app/browser/integration.test.ts`, the case "reaches the plain select through the keyboard
   and rings it with the focus binding the button carries": replace the comment line
   "// Tab traversal is what earns `:focus-visible`, which is the state the ring reader measures."
   and the statement `const reached = await traverseAccessible(readName(control))` that follows it
   with:

   ```ts
   // Tab traversal is what earns `:focus-visible`, which is the state the ring reader measures.
   // The traversal starts from the `Range` specimen's control rather than from the document's own
   // start: a walk from the start crosses the `Form control date` specimen, whose control keeps
   // focus on itself while Tab steps through its date fields, and the installed `driveTraversal`
   // walk stops at the first element it reaches twice.
   const preceding = requireValue(
   	readSpecimen(mounted.host, 'Range').querySelector<HTMLElement>('.form-range'),
   	'The "Range" specimen renders no .form-range',
   )
   preceding.focus()
   const reached = await traverseAccessible(readName(control))
   ```

2. Same file, the case "reaches the input group control beside a button through the keyboard and
   lifts it over the button": replace the comment sentence "The reading below uses the button's own
   border width, because the control's border is the browser's own until the `form-control` key
   ships its border." with "The reading below uses the button's own border width, which is the
   width the group's pull-back is written in." (rewrap the comment), and replace the statement
   `const reached = await traverseAccessible(readName(control))` in that case with:

   ```ts
   // The traversal starts from the `Input group addons` specimen's control rather than from the
   // document's own start, for the reason the plain-select case states.
   const preceding = requireValue(
   	readSpecimen(mounted.host, 'Input group addons').querySelector<HTMLElement>('.form-control'),
   	'The "Input group addons" specimen renders no .form-control',
   )
   preceding.focus()
   const reached = await traverseAccessible(readName(control))
   ```

3. `tests/src/styles/components/input-group.test.ts`, the case "lays the group out as a wrapping
   flex row whose controls take the free space": replace "// The same control outside a group is no
   flex item and keeps its own intrinsic width." with "// The same control outside a group is no
   flex item; it takes the full width the `.form-control` rule gives it." and
   `expect(bare.getBoundingClientRect().width).toBeLessThan(600)` with
   `expect(bare.getBoundingClientRect().width).toBe(600)`.
4. `guides/veneer.md` § Input group classes: replace "a control whose border the browser still
   draws paints two columns at its seam until the `form-control` key ships its border, and the
   group squares each corner a neighbour touches" with "a control's own border is the one the
   `.form-control` rule ships, so the seam paints one line, and the group squares each corner a
   neighbour touches"; rewrap the paragraph so no line passes 100 columns.

## Scope

**Owned.** `tests/app/browser/integration.test.ts` (the two cases named); `tests/src/styles/components/input-group.test.ts`
(the two lines named); `guides/veneer.md` (the one sentence named).

**Shared (report-only).** None.

**Off-limits.** Every other line of the owned files and every other file, including `src/**`,
`app/**`, `tests/setup*.ts`, `package.json`, `package-lock.json`, `ROADMAP.md`, and the vendored
files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Apply § Edits, then run in this order and record each exit code:

1. `npx oxfmt --config .oxfmtrc.json --check` over the owned files.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files.
3. `npm run check`.
4. `npm run build:src`.
5. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts`.
6. `npm run test:guides`.
7. `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` and the same for
   `dark-1280`, `light-390`, and `dark-390`; each must exit 0, and the frames
   `form-select-base-focus--<variant>.png` and `input-group-button-focus--<variant>.png` must exist
   under `tmp/capture/states/` after its run (list them).
8. `git status --porcelain` and `git diff f82de43 --stat`.

## Output

Write `/home/user/veneer-bfo5/tmp/units/b-forms-control-report-5.md` with: the edits applied (the
final text of every changed comment and sentence); a gate table (command, exit, reading, with the
journey passed counts per variant and the frame listing); the status and stat outputs verbatim;
deviations (expected, found, exact evidence, done or not done, at most one hypothesis); and claims
flagged as unverified. Return the same report as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing
by itself beyond where a rewrap breaks a line. Stop and report on any other conflict, including a
journey that still reports an unreachable target (report the trail's last element).

## Acceptance criteria

1. Every edit under § Edits is applied as written (the diff against `f82de43` shows the replacement
   text and no other change).
2. `oxfmt --check`, `oxlint`, and `npm run check` exit 0.
3. The scoped `input-group.test.ts` run and `npm run test:guides` exit 0.
4. Each variant's `CAPTURE=1` journey run exits 0 and leaves the two named frames.
5. The status lists the owned files and nothing else.

## Review evidence

The diff against `f82de43` and the status output, rendered by the Orchestrator at the unit's
return; the report `b-forms-control-report-5.md`; the frames the runs left.
