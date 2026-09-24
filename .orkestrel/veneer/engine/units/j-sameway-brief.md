# Unit J-SAMEWAY — the Modal and Offcanvas takeover rules, whole: agreement, one identity per change, and the sub-component writes

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration` (branch `unit/integration`: J-INTEGRATION rounds 1 to 3 through `7fd28dc`, merged over Veneer `main` `3acad4c` (J-GUARDS) as `4b62bca`; `node_modules` matches the merged lockfile). The work is objective and routed native because its proofs run in a browser, which the Astra bench sandbox cannot launch (E24). This unit is J-INTEGRATION's round 4: its landing lands both.

## Objective

Implement E24 and its J-REENTRY-SWEEP amendment in `Modal` and `Offcanvas`, so every door of a show or hide ends the page in one coherent state, whether the host moves the `shown` token toward the change, against it, or a reaction starts, supersedes, or destroys a change inside any write.

## Context

**Read first, in order.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `documentation.md` in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`: `decisions.md` § E13, § E18, § E22 with its amendment, and § E24 with its J-REENTRY-SWEEP amendment (binding; where this brief and E24 differ, E24 wins and you stop to report); then `units/j-sameway-design-planner-proposal.md` (its door tables and proof matrix S1 to S3 are the adopted proof shape) and `units/j-sameway-design-analyst-proposal.md` (its call-local expected end, which E24 adopts over the planner's lifetime-only doors); then the sweep's four maps `units/j-reentry-sweep-modal-show-report.md`, `-modal-hide-report.md`, `-offcanvas-show-report.md`, `-offcanvas-hide-report.md`, and their probe files `units/j-reentry-sweep-probe-<lens>.test.ts` (executed cases at `e0dee7e`; reuse their fixtures). Line numbers in those records were read at `7fd28dc` or `e0dee7e`; find each site by its symbol. Skill: none.

**What E24 requires, restated as obligations.**
- **A1 Agreement.** After a call's pre-change event is accepted, a host token at the call's own end is agreement: skip the call's own token write, complete every other write in order under the options, dispatch the completed event, resolve `true` (or `false` when destroyed by then).
- **A2 The call's expected end.** From the moment the call observes the token at its end (its own write or the host's earlier one), every later door requires that end, and a reversal runs E22's returning step, bounded by the writes the call made. Before that moment a door reads the lifetime and whether a call of its own superseded it. No stored duplicate of `shown`.
- **A3 Refusal and prevention.** The already-at-end refusal before any event stays; a prevented pre-change event starts nothing. Inside the pre-change dispatch a nested engine call supersedes the outer one (outer resolves `false`, writes nothing) and a direct token write is agreement, told apart by comparing the change identity read before the dispatch with the one after it, without moving the identity before the dispatch.
- **A4 One identity per change, carried by the call.** Every write of a change, its returning step included, reads the identity its call set when the change started, never an identity re-read after consumer code ran (sweep rows MS-1 to MS-4, MS-68, OS-1, OS-5, OS-84).
- **A5 The backdrop's show stops with its owner.** A backdrop show in flight for a change, including the returning step's re-insertion, writes its `show` token only while the owner's change holds (sweep rows MH-S1 to MH-S5, MH-57, OH-1, OH-2, OH-76, OH-81). Choose the mechanism (for example a `Backdrop.hide` that takes an in-flight show over even before its token is written, or an owner read the backdrop's show takes), state why, and keep `BackdropInterface` minimal.
- **A6 The closing destruction is a door.** The hide's closing `backdrop?.destroy()` runs consumer code once a consumer put the removed backdrop back; read the change after it before `#changing` clears and the completed event dispatches (sweep rows OH-92, OH-93), in both engines; the comment calling it inert goes.
- **Conforming, no change:** a restoration already running inside `Isolation.destroy`, `ScrollLock.destroy`, or `HostSnapshot.restore` when a reaction destroys the owner completes (MS-5, MS-67, MH-5, MH-33, MH-39).

**Proofs (red first on your base, recorded with the command and the failing count, then green).** Each case asserts what a user perceives: the resolved values, computed `display` (or `transform` and `visibility`), `aria-hidden`, `aria-modal`, `role`, the backdrop's connection and tokens, the isolated sibling's `inert`, `modal-open` and the body overflow, `document.activeElement`, and the event list.
- A1 to A3: the planner proposal's S1 and S2 matrices per engine (one row per door before the token write, the pre-change event row included), S3 (an early write then a reversal after the token step), and the Modal guard ("runs one show and one `shown` when a listener's `show` completes at once"); the analyst proposal's prevention and refusal rows.
- A4 to A6: one case per sweep row class, each reading the stale write the sweep read in a failing assertion before the fix.
- The cases whose assertions E24 reverses (the planner proposal lists them: the Offcanvas "stops each write sequence…" rows for `show`/`aria-modal`, `show`/`role`, `show`/`showing` present, and `hide`/`hiding` present; the row `show`/`insertion`/`token`; the lock-construction takeover cases): rewrite each to the E24 reading, and name every other expectation your run finds reversed.
- Row tables that several cases share go in `tests/setupBrowser.ts` (tests.md: data tables in a setup file), as the H1 and H2 matrices' successors; return that hunk as an exact patch too.

**Host.** Windows 11; Git Bash (`npm` and `npx` resolve to the `.cmd` shims); Chromium 153.0.8010.12. Write each multi-step program to a file and run the file; no heredoc, no `node -e`.

**Measurements.** Take first: whether Chromium 153 runs `attributeChangedCallback` for a `class` write that leaves the value unchanged (the planner's risk: it decides whether "skip the token write" is observable), and the red reading of each seed case on your base.

**Standing conditions.** J-SNAPSHOT-SHARED writes `HostSnapshot.ts`, `Tab.ts`, `Alert.ts`, `Tooltip.ts`, and the `HostSnapshotInterface` slice of `types.ts` in another worktree beside you. On your base `4b62bca`, `check:src:browser` exits 0 and `Modal.test.ts`, `Offcanvas.test.ts`, and `Backdrop.test.ts` pass (105 tests, the Orchestrator's run); J-GUARDS's landing ran the whole browser suite green on `3acad4c`. `HostSnapshot.test.ts` prints an uncaught `DOMTokenList` error on purpose in one passing case.

## Unknowns

- The A5 mechanism, and whether it touches `BackdropInterface`: settle it by a case, and report the exact interface change if any.
- Whether the Modal's closing destruction can run consumer code the way the Offcanvas's does (A6): run it.

## Scope

**Owned.** `src/browser/Modal.ts`, `src/browser/Offcanvas.ts`, `src/browser/Backdrop.ts`; `tests/src/browser/Modal.test.ts`, `Offcanvas.test.ts`, `Backdrop.test.ts`; `src/browser/types.ts` for the `Modal*`, `Offcanvas*`, and `Backdrop*` declarations' TSDoc and members only; `guides/veneer.md` for `#### Modal`, `#### Offcanvas`, the `Backdrop` section, and their Surface and Methods rows only; `tmp/j-sameway/**`.

**Shared (report-only).** `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`: add only your row tables and their export-list names, and return the exact hunk; the styles session is told before the landing applies it.

**Off-limits.** `HostSnapshot.ts`, `Isolation.ts`, `ScrollLock.ts`, `Tab.ts`, `Alert.ts`, `Tooltip.ts`, `Popover.ts`, every other engine, `Delegate.ts`, `helpers.ts`, `validators.ts`, `constants.ts`, `sanitizers/**`; `tests/setupPolicy.ts`, `tests/policy.test.ts`; `src/styles/**`, `tests/src/styles/**`, `app/**`; `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`. A fix that needs one of them is a stop.

**What asserts the state this change ends.** The reversed expectations named under Proofs; `tests/guides.test.ts` for each changed Summary cell; `tests/src/browser/index.test.ts` if an export changes; the whole browser suite, which the unit runs once.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build` beyond the builds the acceptance chain runs. Write the acceptance chain to `tmp/j-sameway/acceptance.sh` and run the file.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Your final message: the files touched; the measurements; per obligation A1 to A6, the cases that pin it with their red and green readings verbatim; each `types.ts` change as its own diff block; the A5 mechanism and why; the reversed expectations you rewrote; the `tests/setupBrowser.ts` hunk; the mutation table copied from the log; the acceptance output verbatim; `git status --short`; the deviation state.

## Deviation contract

Follow `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol. Stop and report on: a door whose E24 reading contradicts E22 or E13 in a case; an off-limits file a fix needs; a reversed expectation outside the owned tests. Decide, record, and carry on for: the order of cases and rows; the A5 mechanism within the owned files; comment and summary wording.

## Acceptance criteria

1. `npm run check:src:browser`, oxlint, and oxfmt over the owned files, and `npm run check`, exit 0.
2. No door before a call observes its end reads the token; each token step writes only when the host has not; the identity every write reads is the one its call set.
3. Every case under Proofs read red on the base (command and count) and reads green.
4. The mutation instrument `tmp/j-sameway/mutations.py` (whole-file runs, recorded digests, one row per mechanism: each skip, each expected-end read, the pre-dispatch identity comparison, the carried identity, the A5 stop, the A6 door) reddens each row's named case; one control row survives (`HELD`); `restored byte for byte`.
5. `test:guides` and `test:policy` exit 0, and the TSDoc, the guide, and the cases state one rule: no sentence calls an early host write a takeover.
6. The status lists only owned files and the shared setup files.

**Observations, not criteria.** The whole `test:src:browser` run and `test:setup:browser`, each once, with their `Tests` lines.

## Review evidence

The Orchestrator captures the diff and status, runs the scoped gates and the instrument, and audits with `analyst` on Astra (objective), `reviewer` on Opus 5.5 (subjective), and `checker` on Sonnet.
