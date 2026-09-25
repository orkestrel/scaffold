# Unit J-CONCERNS-B — close Dropdown's motion cell and Popover's cancellation cell

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium through Vitest's browser mode.

## Objective

Dropdown's motion concern and Popover's cancellation concern each end with a proof, or with a ruling and a case that pins it. The kickoff brief's acceptance item 3 requires every plugin to cover lifecycle, cancellation, focus, motion, and cleanup (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/j-engine-session-brief.md`). The exit ledger's Design 4 row names these two cells as the last open ones (`engine/plan.md` § Exit criterion).

## Context

**The rule for each cell.** J-CONCERNS-A's rule applies unchanged (`units/j-concerns-a-brief.md` § The rule for each cell). A cell closes in one of three ways:
- an existing case proves it: name it, name the mutation that reddens it, and say whether its assertions tell that mutation apart from the passing case;
- a new proof case;
- a ruling that the concern does not apply, with the Bootstrap source line and a case that pins the non-application.

Every added case reads red against a named mutation of the engine source before it counts. A proof that reads red against the unmutated source is a defect: record it, fix it in the owned source file, and record it green. Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.

**Dropdown motion (D-MOTION).** E32's third amendment rules that `Dropdown` completes synchronously, as Bootstrap 5.3.8's does:
- `dropdown.js` triggers `shown.bs.dropdown` and `hidden.bs.dropdown` without waiting on a transition;
- a menu entry animation is cascade feedback.

The cell closes with a case that pins the non-application:
- `shown.vn.dropdown` dispatches before any animation the menu runs has finished, and so does `hidden.vn.dropdown`;
- a planted menu transition does not delay either event;
- the mutation that reddens it makes the show wait on the menu's animations.

**Popover cancellation (P-CANCEL).** `tooltip.js`, which Bootstrap's popover extends, returns from `show` when `showEvent.defaultPrevented` (around line 197) and from `hide` when `hideEvent.defaultPrevented` (around line 248). At `b867c96`, `tests/src/browser/Popover.test.ts` has cases for a prevented platform close:
- around line 902: "promotes the tip again once when a listener prevents the hide a platform close starts …";
- around line 962: "hides the tip with its events when a listener cancels the promotion again …".

It has none for a prevented `show.vn.popover`, or for a prevented `hide.vn.popover` started by `hide()`. Rule whether `Tooltip.test.ts`'s prevention cases already prove the popover profile. If they don't, add Popover cases:
- a prevented show writes nothing and dispatches no `shown`;
- a prevented `hide()` leaves the tip shown and dispatches no `hidden`.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `names.md`, and `browser.md`.
- `engine/decisions.md` § E9, § E11, § E24 with every amendment, and § E32 with all three amendments.
- Skill: none. Guide: `guides/veneer.md` § Dropdown and § Popover, read-only.

**Installed primitives.** `@orkestrel/test` and the existing helpers in `tests/setupBrowser.ts`. A helper that duplicates one is a defect. A reusable helper belongs in `tests/setupBrowser.ts`, which is off-limits here, so return it as a patch.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b`, on `unit/concerns-b`, cut from Veneer `main` at `b867c96`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-concerns-b/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** None beyond each case's red reading against its mutation.

**Control identifiers.** D-MOTION and P-CANCEL name the cells. Keep them in this brief and your report. Name each test for what it proves.

**Standing conditions.**
- The styles session's four button-reboot cases read red on `main` on this host. They are not this unit's.
- Other units write in their own worktrees:
  - J-ORACLE-FIX-OFFCANVAS owns `Offcanvas.ts`, `Isolation.ts`, and `helpers.ts`;
  - J-RELEASE-CORE owns `Lifetime.ts`, `HostSnapshot.ts`, and `Button.ts`.
  - This unit touches none of them.

## Unknowns

- Whether the popover profile's prevention runs through the same `Tooltip` path the tooltip cases prove. Read the profile, and report it.

## Scope

**Owned.**
- `tests/src/browser/Dropdown.test.ts` and `tests/src/browser/Popover.test.ts`.
- `src/browser/Dropdown.ts` and `src/browser/Popover.ts`, only to fix a defect a proof reads red.
- `tmp/j-concerns-b/`.

**Shared (report-only).** `guides/veneer.md`, where a fix makes a sentence false. `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, where a helper is reusable.

**Off-limits.**
- Every other `src/**` and `tests/**` file, including `Tooltip.ts` and `Placement.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Nothing, unless a defect fix changes behaviour. Then run every case in the two owned files and `Tooltip.test.ts`, and report each case the fix turns red.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- each cell's closure: the case title, whether it existed or was added, the mutation, and its red reading, which names an assertion;
- any defect found, with its red reading, its fix, and its green reading;
- the files touched;
- the report-only patches;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a fix needs an off-limits file. You decide the case titles, where each case sits, and whether an existing case closes a cell.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. Each cell closes by one of the three ways, and each added case reads red against its named mutation by an assertion.
3. `Dropdown.test.ts`, `Popover.test.ts`, and `Tooltip.test.ts` pass in scoped runs.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the mutations, and gives the audit lanes the diff, the status, your report, and its replay.
