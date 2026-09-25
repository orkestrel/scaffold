# Unit J-SAMEWAY-ENGINES-B, round 5 — what reports the `ResizeObserver` loop the frame waits drain

**What changed from `j-sameway-engines-b-brief-4.md`, and why.** Round 4's audit ruled FAIL 4 (`units/j-sameway-engines-b-audit-4-verdict.md`). Claim 4 asked whether the frame wait the round added hides an engine defect. No executed reading answered it. The same audit found two release defects: the replacement path in `Dropdown.show`, and `Tooltip`'s discard reading `tip.id`. Decision E35 gives both to J-RELEASE-POPUPS as their one carrier, so this round does not touch them. This round carries claim 4 only. Its objective widens to every site that waits a frame for the same Chromium report, because the pattern is the question and not one case.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the reading runs in Chromium, which the Astra bench sandbox cannot start.

## Objective

Name, with an executed reading, what reports `ResizeObserver loop completed with undelivered notifications` when a second placement of the same trigger is built inside the frame the first was built and restored in. Then rule on it:
- **If Veneer's own code causes the loop,** fix it red first, and remove the waits the fix makes unnecessary. For example, a placement write might change the size of an element that a placement observes.
- **If the report is the platform's notification with no Veneer write feeding it,** keep the waits. Replace each one's comment with the measured cause, and name the reading.

## Context

**Evidence.**
- Round 4's report, `units/j-sameway-engines-b-report-4.md`, item 4: run back to back in one file run, the two new cases made Chromium report the loop, and either case alone reported none. The first case now ends with `await waitForFrame()`.
- The objective lane's reading (`units/j-sameway-engines-b-audit-4-objective-verdict.md`, claim 4) is from source, not a run. `Placement` observes the reference, not the tip. Its resize callback calls `update`, which writes the tip's side attribute and arrow properties. Destruction disconnects the observer. The lane found no direct feedback path.
- The sites that wait a frame for this report at `3bb9afb`, located by their comments:
  - `tests/src/browser/Tooltip.test.ts`, around line 2396: "A second placement of the same trigger inside the frame the first was built and restored in makes Chromium report a ResizeObserver loop, so the next call waits a frame."
  - `tests/src/browser/Tooltip.test.ts`, around line 3147: the same comment, before a teardown.
  - `tests/src/browser/Tooltip.test.ts`, around line 3373: the wait round 4 added, with the comment "a ResizeObserver loop, so the case ends a frame later."
  - `tests/src/browser/Popover.test.ts`, around line 794: the same comment as the first site.
- `src/browser/Placement.ts`: the constructor's `ResizeObserver`, its callback, `update`, and `destroy`. Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `browser.md`, and `quality.md` § Probes before arguments.
- `engine/decisions.md` § E18, § E24 with every amendment, and § E35.
- Skill: none. Guide: `guides/veneer.md` § Placement, read-only unless the fix changes a sentence there.

**Installed primitives.** `@orkestrel/test` for every wait and recorder: `waitForFrame` is already imported by these files. Read its declaration under `node_modules/@orkestrel/test` before you write a helper.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b`, on `unit/engines-b` at `3bb9afb`, with `node_modules` installed.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-sameway-engines-b/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Take these before any edit, and record each reading:
1. For each site, remove the wait in a scratch copy under `tmp/probe/`. Run the copy five times. Record how often the loop is reported, and in which case.
2. Name the observer the report comes from. A probe may record the native `ResizeObserver` callbacks it sees: which observer, which target, and what each callback writes. It may not replace the behaviour Veneer owns. Record whether any callback's write changes the size of an element a live observer watches.
3. Record whether one placement built on a fresh trigger, with no earlier placement in the frame, ever reports the loop.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- `tests/src/styles/elements/button.test.ts` reads red on `main` on this host, as a standing row. It is not this unit's.
- Do not touch the replacement path in `Dropdown.show`, `Tooltip`'s `#discard`, `#rehide`, or `#link`, or any other release station. J-RELEASE-POPUPS owns those under E35.

## Unknowns

- Whether the report depends on the earlier placement's restoration writing the trigger's inline `anchor-name` or positioning while the next placement's observer is live. Measurement 2 answers it.

## Scope

**Owned.**
- `tests/src/browser/Tooltip.test.ts` and `tests/src/browser/Popover.test.ts`: the four waits and their comments, plus any red-first case the fix needs.
- `src/browser/Placement.ts`: only if measurement 2 names a Veneer write as the cause, and only the observer, its callback, `update`, or `destroy`.
- `guides/veneer.md` § Placement: only a sentence the fix makes false.
- `tmp/j-sameway-engines-b/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including `Dropdown.ts`, `Tooltip.ts`, and `Popover.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** The four waits and their comments. If the fix changes `Placement`, every case in `Placement.test.ts`, `Dropdown.test.ts`, `Tooltip.test.ts`, and `Popover.test.ts`: run all four files after the change. A red case outside the owned files is a stop.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- each measurement's reading;
- the ruling: a Veneer cause or the platform's report, with the evidence;
- the files touched;
- for a fix: the red-first case's title, its red reading at `3bb9afb` naming the assertion or the reported error, its green reading, and the mutation that brings the report back;
- for a kept wait: each site's rewritten comment;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the cause lies in an off-limits file, or when the fix would change a release station E35 gives to J-RELEASE-POPUPS. You decide how the probe records the callbacks, and each comment's wording.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. Each of the four sites carries either no wait, because the fix removed the cause, or a wait whose comment names the measured cause.
3. `Tooltip.test.ts` and `Popover.test.ts` pass in five consecutive whole-file runs each, with no reported loop. If `Placement.ts` changed, so do `Placement.test.ts` and `Dropdown.test.ts`.
4. For a fix, the red-first case reads red at `3bb9afb` and green after, and its mutation brings the report back.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the measurements, and gives the audit lane the diff, the status, your report, and its replay.
