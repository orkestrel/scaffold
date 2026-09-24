# Unit J-TOOLTIP round 5 — the landing round: the merge with main, two door repairs, and the promotion bound

Successor to `j-tooltip-brief-4.md` and `-4-resume.md`. What changed and why: round 4's audit (`j-tooltip-audit-4-verdict.md`) confirmed the E18 mechanism's build, occupancy, release, fill, and the round-3 carries, and found two intervals the mechanism still leaves open (the objective lane's claims 1 and 4) and one it deliberately left to `Placement` (claim 3), plus the reviewer's findings this brief names. The unit's branch must also merge Veneer `main` (`c21fd17`: J-HELPERS, J-TESTPIN, J-SNAPSHOT; J-OFFCANVAS may have landed too by the time you start — read `git log --oneline -3 main`), whose merge conflicts in `guides/veneer.md`, `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, and `tests/src/browser/index.test.ts` (the Orchestrator's dry run). This round resolves the merge, adopts the auditors' prescriptions, states the promotion bound, and lands.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent ac01697e5b3344cdc), a native Claude subagent, the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip`). Before you start, the Orchestrator has committed rounds 1 to 4 on the branch as the landing commit and run `git merge main`, which stopped on the conflicts; the guide's Compatibility table block is resolved by the Orchestrator's script, every other conflict is yours. Perform the assignment directly and spawn nothing. Do not commit: the Orchestrator commits the merge after the gates.

## Objective

The branch carries `main` with every conflict resolved and both sides kept (the tooltip's changes and main's helpers, snapshot, test-pin, and, where landed, offcanvas changes); the tooltip's own `closest` reads route through the landed `readClosest` and its other reads through the landed helpers where one matches; a rebuild's pre-show dispatch and old-tip discard read the existing tip's state; ordinary concealment removes no tip whose `shown` token a teardown reaction restored; the guide states the promotion bound; the reviewer's findings are folded; the full chain is green.

## Context

**The verdicts are the authority.** `j-tooltip-audit-4-verdict.md`; `j-tooltip-audit-4-objective-verdict.md` (claim 1: a settled shown tooltip, a one-shot `show.vn.tooltip` listener moving the existing tip into another connected container or removing its `shown` token, then `show()` — the dispatch step reads `shown` `undefined`, the old-tip discard's false report is ignored, and the call builds, links, promotes, and announces a replacement; claim 4: `animated: false`, a closing `beforetoggle` listener that adds the `shown` token back without moving the tip, `hide()` — `#discard` checks the parent only and removes the tip, `hidden` dispatches; claim 3: the promotion observation and its reservation to `Placement`), `j-tooltip-audit-4-subjective-verdict.md` (the findings and bounds this brief lists under R5), `j-tooltip-audit-4-checker-verdict.md` (the causal `since` in a `Tooltip.ts` comment; the completed-event dispatches as the design's bare calls).

**The landed helpers.** `main`'s `src/browser/helpers.ts` exports `readClosest(element, selector, root?)`, `readSiblings`, `readOutermost`, `readScrollbarWidth`, `readTarget(trigger, attributes, root?)`, and `matchesDisabled(element, token)` (J-HELPERS; `guides/veneer.md` § Helpers on `main`). The tooltip's own `closest` reads (the modal ancestor lookup in the constructor and any other `closest` call in `Tooltip.ts`) route through `readClosest`; the tooltip's `tmp/j-tooltip/` copies of `helpers.ts` from round 3 are the tooltip side of the conflict (`buildTip`, `fillSlot`, `writeContent`, the tooltip's helper additions), which stays beside the landed helpers.

**Law.** As round 4. Skill: none. Standing decisions: E6, E12, E13, E16 as amended, E17 as amended, E18, E19 where offcanvas has landed.

**Host and scoped tests.** As round 4, plus the landing chain once at the end: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:policy`, `npm run test:src:browser`, `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`, `npm run test:conformance`, `npm run test:setup`, each exit recorded in `tmp/j-tooltip/acceptance-5.sh`'s log. The `prove` MCP server is not reachable to a native subagent; record that you made no call.

## Obligations

- **L1 The merge.** Resolve every conflicted file keeping both sides: `guides/veneer.md` (main's § Helpers, § Ownership and restoration, the snapshot's Tab/Dropdown/Carousel/Modal sentences, and, where landed, `#### Offcanvas` and the offcanvas rows beside the tooltip's `#### Tooltip`, its Surface, Methods, and event rows, and its plugin row), `src/browser/helpers.ts` (main's traversal helpers beside the tooltip's build helpers, one import block, one export order), `tests/src/browser/helpers.test.ts`, `tests/src/browser/index.test.ts` (one export list carrying every name both sides assert, in the barrel's order). Then route the tooltip's `closest` reads through `readClosest` and delete any tooltip helper that duplicates a landed one (E6: the landed name wins, its callers updated). `types.ts` auto-merges; read it once for a duplicated declaration.
- **L2 The rebuild's doors (claim 1).** In `show`, when a tip is already held (`#tip !== undefined`), the pre-show dispatch step reads the existing tip's state (`#apply(change, true, …)`) so a listener that moves it or removes its token stops the call, and the old-tip discard's report stops the rebuild when it returns false (the tip was taken over or relocated). Red first: a settled shown tooltip, a one-shot `show` listener that moves the tip into another connected container, then `show()` resolving false with no replacement tip built and no `inserted` dispatched; the token variant (the listener removes `shown`) resolving false; record the red readings against round 4's source, then green. Rows: "the rebuild's dispatch reads no tip" and "the rebuild ignores the old tip's report".
- **L3 The teardown's token read (claim 4).** Ordinary concealment (`#conceal`) removes the tip only when, after the placement teardown, it is still in its container and carries no `shown` token; a tip whose token a closing `beforetoggle` listener restored is left shown where it is, `#discard` reports false, and no `hidden` dispatches. Destruction and the rebuild's old-tip discard keep their cleanup (a tip they hold is removed whatever its token). Shape: a boolean parameter on `#discard` naming which reading the caller wants, or two callers of one reading helper — one word, your choice, named in the report. Red first: `animated: false`, a closing `beforetoggle` listener adding `shown` back, `hide()` resolving false with the tip still connected and shown and no `hidden`; row: "the teardown reads no token".
- **L4 The promotion bound (claim 3).** `Placement` stays unchanged this round (E18's reservation; the fix is J-POPOVER's, which owns the tip's `Placement` work through the R12 seam). The `#### Tooltip` door paragraph and `TooltipInterface.show`'s remarks state the bound in one sentence each: a listener to the platform's opening `beforetoggle` that moves the tip during the promotion leaves it promoted and positioned where it moved it, the call resolving false, until destruction restores the placement; and the guide's departures list names it as the one interval the door mechanism does not cover.
- **L5 The reviewer's findings and the wording** (`j-tooltip-audit-4-subjective-verdict.md`; E18 is amended for the last two, see `decisions.md`).
  - S2: the `#### Tooltip` restoration sentence ("…because a nested call on the shared snapshot restores only the records saved since; J-SNAPSHOT-SHARED closes that bound") describes the bound J-SNAPSHOT closed on `main`; rewrite it to the closed behaviour the way `main`'s `#### Dropdown` and `#### Modal` state it (a `destroy` a reaction calls during the restoration writes back every target the interrupted restoration still owns), with no unit name.
  - S3: "a hide takes a show in flight over" is false before the show's token write (`#conceal` refuses while `shown` is false); the sentence reads that a hide started after the show's `shown` token write takes the show over, and before that write the hide resolves `false`.
  - ORC1: the value-ferrying arrays (`accepted.push(emitEvent(…))`, `built.push(buildTip(…))`, `left.push(this.#discard())`) go; a value-returning step uses the construction form E18 now admits — call, use the value, then `#holds(change, shown)` — as `#place` does: for example `if (!this.#discard() || !this.#holds(change, undefined)) return false`. The door semantics are unchanged; the instrument rows that mutate those steps are re-anchored.
  - ORC3 (B1, B2): "conceals it despite prevention" reads "hides it despite prevention" in `TooltipEventMap.hide` and the `hide` row; "may start another change" reads "can start another change" in the `shown`/`hidden` TSDoc, the class TSDoc, and the guide.
  - The causal `since` in the `Tooltip.ts` comment "binds no hooks of its own, since its events bubble…" becomes `because`.
  - Fold where you touch the sentence: B4 (the `show` remarks carve out the build's release-on-stop moves as the guide does), B7 (the two case titles), B9 (split the door paragraph after the release sentence). B5, B6, B8, B10, and B11 are carried to J-POPOVER in `plan.md`; leave them.
- **The instrument.** `tmp/j-tooltip/mutations-5.py`: round 4's rows plus L2's two rows and L3's row; every row records its first failure line; the log ends with the digest receipt. Run it once whole after the merge and the repairs.
- **The report.** As round 4, plus the merge's resolution per file (which side each hunk kept), the `closest` sites routed, and the landing chain's exit lines.

## Scope

**Owned.** Every conflicted file for its resolution; `src/browser/Tooltip.ts`; the Tooltip declarations in `src/browser/types.ts`; the `#### Tooltip` section and the tooltip rows of `guides/veneer.md`; `tests/src/browser/Tooltip.test.ts`; `src/browser/helpers.ts` and `tests/src/browser/helpers.test.ts` for the merge and the deduplication only; `tests/src/browser/index.test.ts` for the export list; `tmp/j-tooltip/**`.

**Off-limits.** `src/browser/Placement.ts`, `HostSnapshot.ts`, `Dropdown.ts`, `Offcanvas.ts`, `Backdrop.ts`, `Isolation.ts`, every other engine, `tests/setupBrowser.ts`, the vendored files, `ROADMAP.md`, `package.json`, `package-lock.json`, and every file not owned. A change one of them needs is a report-only patch.

**Tools and limits.** As round 4; no commit (the Orchestrator commits the merge), no install, push, or discarding git command; `git merge --abort` is barred too — a resolution you must undo, you undo by hand.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the `#discard` parameter's name, the bound sentences' words, the export order where the barrel decides it. Stop and report when a conflict's two sides contradict in behaviour (name the hunk and both readings), when a red-first case cannot be made red against round 4's source, or when a landing gate outside the owned files is red at the merge point (record it as standing and continue).

## Acceptance criteria

1. No unmerged path; `npm run check:src:browser`, `npm run check`, oxlint, and oxfmt exit 0.
2. `Tooltip.test.ts` green with L2's and L3's cases present and their red readings recorded; the tooltip's `closest` reads route through `readClosest`.
3. The instrument log: every row `EXACT` or `JOINED` (the id row `MISSED` with its reason) with its first failure line, `GREEN?` rows at 0 failed, the digest receipt.
4. The landing chain green once at the end, every exit recorded.
5. The status lists the owned files and the merge's files only.
