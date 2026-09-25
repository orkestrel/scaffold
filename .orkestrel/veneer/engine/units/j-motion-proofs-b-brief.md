# Unit J-MOTION-PROOFS-B — Collapse, Toast, Tab, and Carousel proofs read the rendered motion

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

The Collapse, Toast, Tab, and Carousel proofs stay green whatever motion values the styles session ships, and still fail when an engine completes before the motion it moves has settled.

## Context

**The ruling.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E32 with its amendment is this unit's law:
- no pinned duration, easing, or transitioned property list;
- a positive duration read on each element the engine moves;
- no running animation on any moved element at each completion event;
- a motion-factor case stated as a ratio of two readings;
- the shipped cascade, never a test-local copy.

Every one of the four engines waits on a transition before its completion event, so the completion bullet binds each.

**The pattern to follow.** J-MOTION-PROOFS-A converted Modal, Offcanvas, Backdrop, and Alert the same way. Its report is `units/j-motion-proofs-a-report.md` and `-report-2.md`, and its diff is `units/j-motion-proofs-a.diff`. It added the shared reader `readDuration(element)` to `tests/setupBrowser.ts`, which returns the longest declared transition duration in milliseconds. Read a declared duration through `readDuration`, never inline.

**What pins a literal.** The J-MOTION-PROOFS-A checker's search at `beb7cd8` found these `transitionDuration` reads (`units/j-motion-proofs-a-audit-checker-verdict.md`, claim 6). Locate each by the case around it, because the lines move:
- `Toast.test.ts`, around lines 65, 71, 74, 155, 167, and 269;
- `Tab.test.ts`, around lines 64, 69, 72, 484, and 496;
- `Collapse.test.ts`, around lines 57, 424, and 456;
- `Carousel.test.ts`, around lines 105 and 410.

Find every other pin in the four files by reading them.

**The styles session's Toast finding.** The Toast proof allows an animation still running at `shown`. The finding is the objective lane's reading in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` § Pending shared changes for the engine session, around the `shown` case. The motion ruling adds a `scale(0.98)` toast entry beside the fade.
- Make the proof read no running animation on the toast at `shown` and at `hidden`.
- If `Toast`'s completion fires while an animation runs, the defect is the engine's. Fix it in `Toast.ts` with a red-first case, and settle on every element it moves.

**The plant.** Prove the conversion survives the motion ruling: plant its values in a scratch copy of the cascade, as J-MOTION-PROOFS-A's `plant.sh` does (`units/j-motion-proofs-a-plant.sh`). The values are:
- the collapse panel on `--vn-motion-panel` with `--vn-ease-panel`;
- `.fade` on `--vn-ease-out`;
- a `scale(0.98)` toast entry;
- the carousel item on `--vn-motion-slide`.

Run the four files against the plant, and record the reading. Then remove the plant. It never reaches an owned file.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `names.md`, and `browser.md`.
- `engine/decisions.md` § E24, § E25, § E32, and § E34.
- Skill: none. Guide: `guides/veneer.md` § Collapse, § Toast, § Tab, and § Carousel, read-only.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b` is cut from Veneer `main` `1290162`, which holds J-SAMEWAY-ENGINES-A (the `HostWrite` returns), J-MOTION-PROOFS-A (`readDuration` in `tests/setupBrowser.ts`), and the styles session's E-ID-MOTION-FADE (`.fade` on `ease-out`, and `sampleTransition`). `node_modules` is installed.
- A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-motion-proofs-b/` and run the file: no heredoc, no `python -`, no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Standing conditions.**
- J-SAMEWAY-ENGINES-B owns `Dropdown`, `Tooltip`, `Popover`, `Placement`, and their tests in another worktree. J-MOTION-PROOFS-C takes `Tooltip.test.ts`, `Popover.test.ts`, and `Dropdown.test.ts` after that unit lands.
- On this host, `tests/src/styles/elements/button.test.ts` reads red on `main` as a standing row (`units/host-chromium-153-reading.md`). It is not this unit's.

## Unknowns

- Whether `Collapse`, `Tab`, or `Carousel` completes while a motion it moves still runs under the planted values. A converted proof that finds one is a defect of the engine: stop and report it with the failing reading, rather than fixing an engine the brief does not grant, unless it is `Toast`.

## Scope

**Owned.**
- `tests/src/browser/Collapse.test.ts`, `Toast.test.ts`, `Tab.test.ts`, and `Carousel.test.ts`.
- `src/browser/Toast.ts`, only to fix a completion that fires before its motion settles.
- `tmp/j-motion-proofs-b/`.

**Report-only (return an exact patch against your tip).** `guides/veneer.md`, for each sentence your change makes false.

**Off-limits.**
- Every other file. That includes `tests/setupBrowser.ts`: return a patch if a shared helper is needed, and duplicate none.
- The vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`, which the `scaffold repair` command restores.

**What asserts the state this change ends.** Every pin listed under § Context. Find the rest by running the four files after each change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- a table of every converted pin: the file, the case title, what it pinned, and what it reads now;
- the Toast finding's ruling, with any engine fix and its red and green readings;
- the plant run's reading, and the plant's removal;
- a mutation table: for each converted completion proof, the mutation that makes it fail, with the red reading;
- the report-only patches;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a change needs an off-limits file. You decide and record:
- the case titles;
- whether a control reading of an element with no transition stays;
- how a completion case reads the settled state.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. No owned test pins a duration, an easing, or a transitioned property list, and every declared duration a proof reads comes through `readDuration`.
3. The Toast proof reads no running animation on the toast at `shown` and at `hidden`.
4. The four owned test files pass in scoped runs, unplanted and against the plant. So does `npm run test:app`, because the showcase drives these engines and reads their completion. A case there that reads an engine's state right after awaiting an element's animations races the engine's settle; J-MOTION-PROOFS-A round 5 found one in `EngineSection.test.ts`. Such a case waits for the engine's completion event. Where you do not own the file, return a patch.
5. Every mutation in the table reddens its proof by an assertion.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the plant and the mutations, and gives the audit lanes the diff, the status, your report, and its replay.
