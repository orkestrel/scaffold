# Unit J-TOOLTIP round 4 — the door mechanism under the E18 ruling, with the round-3 carries

Successor to `j-tooltip-brief-3.md`. What changed and why: round 3's audit (`j-tooltip-audit-3-verdict.md`) failed claims 1, 6, 7, and 8 and carried O1, and the door class had recurred through three rounds, so the design round J-TOOLTIP-DOORS ruled on the mechanism (`j-tooltip-doors-verdict.md`, E18). This round implements that ruling in place of a fourth local repair, and carries the round-3 instrument and fixture repairs beside it.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent a48b1f17b0f574e7a), a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip`, base `e8251cf`, rounds 1 to 3 uncommitted). Perform the assignment directly and spawn nothing.

## Objective

Every write, dispatch, element move, and sanitizer call inside a Tooltip change runs as one `#apply` step whose door is read after it, so a missing door is impossible by omission; the discard and the completion read ownership before they act; the interface and the guide promise exactly that; the three round-3 counterexamples and the ruling's other cases are red first and then green; the round-3 instrument and fixture repairs land; the scoped gates are green.

## Context

**The ruling is the authority.** Read `j-tooltip-doors-verdict.md` whole: § The ruling (E18) fixes the invariant, the constraint, and the interface sentences verbatim; § Where they differ, and the ruling fixes the predicate's shape, the `Placement` bound, the single-step `buildTip`, no new members beyond `#apply`, and the content-first resolution. Read the two lane rulings it reconciles for the door table and the proof shape: `j-tooltip-doors-subjective-verdict.md` (parts 3 to 6: the mechanism, the door table, the guide paragraph, P1 to P7) and `j-tooltip-doors-objective-verdict.md` (parts 4 and 6: the door table with the failure action per interval, the proof table with its "Proof limit" paragraph). Where the two lane rulings disagree, the reconciled verdict wins; where the verdict is silent, the subjective lane's part 3 is the shape to build.

**Round 3's verdicts.** `j-tooltip-audit-3-verdict.md` (the per-claim rulings and the carriers) and `j-tooltip-audit-3-objective-verdict.md` (claim 1's two counterexamples with their reaction ordering, claim 6's invalid-configuration reading, claim 7's fixture reading, claim 8's door-trace table, O1).

**The siblings' idiom.** `Modal.#apply` (`C:/Users/mikes/WebstormProjects/veneer/src/browser/Modal.ts`, around line 386) and `Dropdown.#apply(change, shown, write)` (`Dropdown.ts`, around line 291): one write, then `#holds`. Tooltip's `#apply` takes the same positions.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/architecture.md`, `patterns.md`, `names.md`, `typescript.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md` § Rounds and verdicts. Skill: none. Standing decisions: E6, E12, E13, E16 as amended, E17 as amended, E18 (this ruling).

**Host.** Windows 11, Git Bash; the worktree root; `npm.cmd` and `npx.cmd` resolve as `npm` and `npx`; Chromium 153 through Playwright; `npm run test:src:browser -- <file>` runs one file. The `prove` MCP server is not reachable to a subagent; record that you made no call. `HostSnapshot.test.ts` prints a stderr `DOMTokenList` line from an existing case; it is not a failure.

**Scoped tests (the user's instruction).** Run one test file per obligation while you work; run the whole browser suite once before the report; run no build, no conformance, and no setup proof this round (the landing round runs them). Re-run instrument rows only where the row or its case changed, and re-run the whole instrument once at the end.

## Unknowns

- Whether a detached tip built by fragment parsing is ever upgraded, so that the token and id writes in the build can run a reaction. Do not settle it by argument: keep the instrument rows for those writes and report whether each reddens its case (a row that cannot redden because no reaction can run there is reported as such, not deleted).
- Whether `Placement`'s constructor writes after a relocating opening `beforetoggle` are observable in a way the invariant forbids. `Placement` is off-limits this round; report what P3's recorder observes on the relocated tip after the show resolves `false`, as an observation for the audit's claim on the promotion step.

## Obligations

- **T1 The primitive.** Add `#apply(change, shown, write)`: run `write()`, return `#holds(change, shown)`. Replace `#holds(change, tip)` with `#holds(change, shown: boolean | undefined)`: always the lifetime and `#change === change`; when `shown` is a boolean, also `#tip !== undefined`, `#tip.parentElement === #container`, and the tip carries the `shown` token exactly when `shown` is true. Remove `#holding`. In `show`, `#conceal`, `#build`, and `#occupy`, every platform write, dispatch, element move, and sanitizer call is the anonymous callback of one `#apply`, one step per call; constructions (`#place`) construct, publish, then read `#holds`; pure reads and field writes sit between steps. After every await, read `#holds`.
- **T2 The build.** Resolve every content value first, reading `#holds(change, undefined)` after each function call, so a destroying or taking-over function stops the build before any element moves. Then `#apply` around `buildTip` (one step), each token write and the id as separate steps, `#occupy` per slot (the occupant's `#release` and `fillSlot` as steps, the origin record published between them, before the move), and `#apply` around the final `#release`. A step that fails in occupancy or at the final release returns the unfinished tip's content and returns `undefined`; a content function or sanitizer that throws mid-build returns the unfinished tip's content before the error propagates.
- **T3 Publication and promotion.** `show` publishes `#tip` and `#container`, then `#apply(append)`, `#apply(#link)`, `#apply(inserted)`, so every read after publication includes the container; the promotion constructs the placement, publishes it, then reads `#holds(change, false)`; `#apply(shown token)`; `#holds(change, true)` after the wait; the completion reads the full door before it releases the change and dispatches `shown`.
- **T4 Discard and conceal.** `#discard(): boolean` captures the tip and its container before clearing the fields, runs the placement teardown, removes the tip only when `tip.parentElement === container`, unlinks the id while the tooltip is live whatever happened to the tip, and returns whether the tip left the document (no tip, or `tip.parentNode === null`). `#conceal` reads the door after the hide dispatch, `#apply` around the token removal, `#holds(change, false)` after the wait, stops on a false `#discard` with no `hidden`, and reads the full door before it releases the change and dispatches `hidden`. `show`'s old-tip discard and `destroy` ignore the report. Destruction, a hide's removal, and a content element's return move a node only while it is still where the tooltip put it (the one undo rule; `#release` already has it).
- **T5 `fill`.** `fill` called while a change is in flight refuses before it releases anything; a `fill` whose returned element's connection reaction destroys the tooltip resolves `false` (kept).
- **T6 The interface and the guide.** The five sentences in `j-tooltip-doors-verdict.md` § The ruling (E18) → Interface, verbatim, on `TooltipInterface.show` and `hide` `@remarks`, `TooltipEventMap.inserted`, `shown`, `hidden`, and `hide` (O1). The `#### Tooltip` door paragraph is the subjective lane's part 5 with this sentence added after "…is left there, and every attribute the tooltip wrote is still restored.": "The change is released before its completed event is dispatched, so a listener may start another change, and that change is never undone." The class TSDoc says the same in its own paragraph; the E13 sentences stay verbatim. The guide's event table row for `hide` carries the O1 exception.
- **T7 The proofs, red first.** In `Tooltip.test.ts`: P1 (final-release destruction), P2 (teardown relocation through an `inserted` listener's closing `beforetoggle`; two mutations), P3 (promotion relocation through an opening `beforetoggle`), P4 (a custom-element trigger whose `attributeChangedCallback` for `aria-describedby` destroys the tooltip; the recorder is a plain `addEventListener` for `inserted`), P5 (`inserted` listener relocation), P6 (content before writes, with a `MutationObserver` on the first element's home), P7 (destroy leaves a moved tip; `aria-describedby` restored), a `fill`-during-build refusal case, a throwing content function case (the moved elements are home after the throw), and the completed-event re-entry case (a `hidden` listener's `show()` is accepted and survives). Each case's setup and assertions follow the subjective lane's part 6; record the red reading (command and count) before the mechanism and the green reading after. Re-point the retained door cases (around lines 1258, 1287, 1310, 1374 in the round-3 file).
- **T8 The instrument, `tmp/j-tooltip/mutations-4.py`.** Carry every round-3 row that still names a live line, and add: the mutation per P1 to P7 and the three added cases; the two central-predicate rows (drop the container clause from `#holds`; drop the token clause); "the completion releases after dispatch" (move the release after the dispatch: the re-entry case reddens); the round-3 carries: the claim-2 timing control (capture the origin before the move, publish after; assert restoration immediately after the nested `destroy()` returns), the claim-4 row deleting `#failed.add` with the assertion it reddens (add a call-count assertion to the repeated-invalid-input case), the claim-6 `href` row corrected (move `href` from the `a` element's local list to the global list; the failure lands at the per-element output assertion, not at the configuration), and the claim-7 fixture (the effective modal ancestor carries `x-modal` only; a default-`modal` decoy sits elsewhere and the case distinguishes their hide events; the case describes the fixture's string values as conflicting values). Every row records the failing assertion's first line; the log ends with the digest receipt.
- **T9 The report.** As in round 3: obligations with their cases, red and green readings verbatim, the `types.ts` diff, the guide paragraph, the instrument table verbatim, the scoped chain's exit lines, `git status --short`, `git diff --stat`, the Unknowns' observations, and the deviation state. No process diary.

## Scope

**Owned.** `src/browser/Tooltip.ts`; the Tooltip declarations in `src/browser/types.ts` (`TooltipInterface`, `TooltipEventMap`, `TooltipOptions`); the `#### Tooltip` section and the Tooltip rows of the event table in `guides/veneer.md`; `tests/src/browser/Tooltip.test.ts`; the `href` row's case in `tests/src/browser/NativeSanitizer.test.ts` only where the corrected row needs an assertion it lacks; `tmp/j-tooltip/**`.

**Off-limits.** `src/browser/Placement.ts`, `helpers.ts`, `HostSnapshot.ts`, `Dropdown.ts`, every other engine, `tests/setupBrowser.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `ROADMAP.md`, the vendored files, and every file not owned. A change one of them needs is a report-only patch.

**Tools and limits.** No install, commit, push, publish, or discarding git command; no tree-wide `format` or lint `--fix`. Scoped checks: `npm run check:src:browser`, `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`, `npm run test:src:browser -- tests/src/browser/Tooltip.test.ts` (and the sanitizer file for its row), then once: `npm run test:src:browser`, `npm run test:guides`, `npm run test:policy`. Write the chain to `tmp/j-tooltip/acceptance-4.sh` and run the file.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message, per T9.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: step granularity where a platform call is one method (`replaceChildren` is one step), the order of the new cases in the file, the instrument row names, and the fixture's decoy placement. Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when the mechanism needs a `Placement`, `helpers.ts`, or `HostSnapshot` change (return it as a report-only patch and finish everything else), when a Dropdown case reddens, or when a P-case cannot be made red against the round-3 source.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run check`, oxlint, and oxfmt exit 0.
2. `Tooltip.test.ts` green with the T7 cases present, each with a recorded red reading.
3. The instrument log: every row `EXACT` or `JOINED` with its failing assertion's first line, or reported as unreachable with the reason (the two build-write rows only), `GREEN?` rows at 0 failed, the digest receipt.
4. `npm run test:src:browser`, `npm run test:guides`, and `npm run test:policy` exit 0 once at the end.
5. The status lists the owned files only; no `any`, `as`, non-null `!`, `@ts-` directive, `eslint-disable`, access modifier, default export, or nested function declaration outside an anonymous callback in the added lines; `Tooltip.ts` holds one class plus imports.
6. In `show`, `#conceal`, `#build`, and `#occupy`, every platform call sits inside an `#apply` callback or is a construction followed by `#holds` (the checker's mechanical claim).

## Review evidence

The Orchestrator takes `git diff HEAD` (new files intent-to-add) and `git status --short` after the report, runs the scoped gates, and names both in the round-4 audit brief.
