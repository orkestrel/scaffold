# Unit J-CONCERNS-A — close ScrollSpy's and Button's five-concern proof gaps

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium through Vitest's browser mode.

## Objective

ScrollSpy and Button each end with a proof, or a ruling with evidence, for every one of lifecycle, cancellation, focus, motion, and cleanup. The kickoff brief's acceptance item 3 requires it (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/j-engine-session-brief.md`, around line 288).

## Context

**The gap reading.** The EXIT-EVIDENCE Grok lane (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/rebaseline-0925-exit.md`, its five-concern table) found no case for:
- ScrollSpy's cancellation, focus, and motion;
- Button's focus and motion.

That lane reads; it does not rule. Its ScrollSpy motion cell may be wrong: at `0865c67`, the cases titled `scrolls the host smoothly to the section a clicked link names, preventing the click, ...` and `scrolls the document smoothly when the host does not clip its overflow` exist in `tests/src/browser/ScrollSpy.test.ts`. Rule each cell yourself.

**What the source does, read at Veneer `0865c67` with `git grep`.**
- `ScrollSpy.ts` dispatches its activate event with `emitEvent(this.#host, SCROLL_SPY_EVENTS.activate, { relatedTarget: link }, false)`, around line 309. Its `#scrollTo` method, around line 373, calls `event.preventDefault()` and scrolls with `behavior: 'smooth'`.
- `Button.ts` dispatches its toggle event with `emitEvent(this.#host, BUTTON_EVENTS.toggle, { pressed: this.pressed }, false)`, around line 109. Neither file names `focus`, `transition`, or reduced motion.
- `tests/src/browser/Button.test.ts` has the case `dispatches the completed state once as a bubbling non-cancelable event`.

**What Bootstrap 5.3.8 does**, read in `node_modules/bootstrap/js/src/`:
- `scrollspy.js` triggers `activate.bs.scrollspy` and never reads `defaultPrevented` from it (around line 233). Its smooth branch prevents the click and scrolls with `behavior: 'smooth'` (around lines 128 to 142).
- `button.js` triggers no event. Its data API prevents the click (around line 58).
- Neither file moves focus or waits on a transition.

**The rule for each cell.** Close each missing cell in one of three ways:
- **An existing case already proves it.** Name the case by its title. Name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- **Add a proof case**, where the concern applies.
- **Rule that the concern does not apply.** Give the Bootstrap source line, and add a case that pins the non-application. For example, preventing the activate event changes nothing, or activation leaves `document.activeElement` where it was. A ruling with no case that would break does not close a cell.

Every case you add reads red against a named mutation of the engine source before it counts. Record each mutation and its red reading. Revert the mutation exactly.

**A proof that reads red against the unmutated source is a defect.** Record the failing command and its count. Fix the defect in the owned source file, then record the same command green. If the fix needs a file outside your owned set, stop and report.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, all under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `names.md`, and `browser.md`.
- `engine/decisions.md` § E9 and § E11 (Bootstrap end states, not event names or timing), and § E24 and § E25 (the host-change record rule).
- Skill: none. Guide: `guides/veneer.md` § ScrollSpy and § Button, read-only.

**Installed primitives.** `@orkestrel/test` and the existing helpers in `tests/setupBrowser.ts`. Read those helpers before writing one. A helper that duplicates one is a defect. A reusable helper belongs in `tests/setupBrowser.ts`, which is off-limits here, so return it as a patch.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a` on branch `unit/concerns-a`, cut from Veneer `main` `0865c67` with `node_modules` installed. Chromium 153 is installed for Playwright. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-concerns-a/` and run the file: no heredoc, no `python -`, no `node -e`.

**Run scoped.** Run one test file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts`. The `src:browser` project is the one the `test:src:browser` script runs.

**Control identifiers.** S-CANCEL, S-FOCUS, S-MOTION, B-FOCUS, and B-MOTION name the cells. Keep them in this brief and your report. Name each test for what it proves, never for its cell.

**Standing conditions.**
- Other units are changing `Collapse`, `Toast`, `Tab`, `Carousel`, `Dropdown`, `Tooltip`, `Popover`, `Placement`, and `src/browser/helpers.ts` in other worktrees. Touch none of them.
- `guides/veneer.md` is shared with the styles session.

## Unknowns

- Whether Chromium's `scrollTo({ behavior: 'smooth' })` honours `prefers-reduced-motion`, and whether Bootstrap's does. Measure it on this host if S-MOTION's ruling rests on it, and report the reading.
- Whether a focus proof for ScrollSpy's smooth click needs a real pointer. The trusted verbs in `@orkestrel/test`'s browser entry are available. Report which one you used.

## Scope

**Owned.**
- `tests/src/browser/ScrollSpy.test.ts` and `tests/src/browser/Button.test.ts`.
- `src/browser/ScrollSpy.ts` and `src/browser/Button.ts`, only to fix a defect a proof reads red.
- `tmp/j-concerns-a/`.

**Report-only (return an exact patch against your tip).** `guides/veneer.md`, where a fix makes a sentence false. `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, where a helper is reusable.

**Off-limits.** Every other `src/**` and `tests/**` file, including `tests/src/browser/Delegate.test.ts` and `src/browser/Delegate.ts`. Also the vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`. The `scaffold repair` command restores the vendored files.

**What asserts the state this change ends.** Nothing, unless a defect fix changes behaviour. Then run every case in the two owned test files and `tests/src/browser/Delegate.test.ts`, and report each case the fix turns red. `Delegate.test.ts` stays off-limits: report its patch.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- a table per cell: the cell, its closure (an existing case, an added case, or a ruling), the case title, the Bootstrap line for a ruling, the mutation, and its red reading verbatim;
- any defect found: the failing command, its count, the fix, and the green reading;
- the report-only patches, exact;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a change needs an off-limits file. You decide and record:
- the case titles and where each case sits;
- which closure each cell takes, within the rule for each cell;
- which trusted verb drives a case.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. Each of S-CANCEL, S-FOCUS, S-MOTION, B-FOCUS, and B-MOTION is closed by an existing case, an added case, or a ruling that carries a case, and the output table names it.
3. Every added case read red against its named mutation, and the mutation was reverted exactly.
4. The two owned test files pass in a scoped run.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work on `unit/concerns-a`, replays the mutations, and gives the audit lanes the commit's diff, `git status`, your report, and its own replay.
