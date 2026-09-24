# J-MODAL audit round 4 (the landing round) — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 9 tool uses, 94 s; retained verbatim from the subagent's return)

# Checker verdict — J-MODAL round-4 audit (landing round + round-5 pass)

**Role:** `checker` on Sonnet, native Claude subagent with `Read`/`Grep`/`Glob`, mechanical conformance only.

## Per-claim mechanical verdicts

**Claim 1 (lock lifetime read).** UNRESOLVED. The report's fixture description and instrument row name match the claim's text (`j-modal-report-4.md:5-11`), but I did not execute the red/green logs or the instrument; the only evidence for the pass/fail counts is the report's own quoted numbers, which is writer self-report and does not confirm.

**Claim 2 (normalization paragraph).** UNRESOLVED on the guide prose parity with the installed normalizer's actual behavior — the paragraph in `j-modal-report-4.md:14-18` reads consistently, but confirming it against Bootstrap's real `Manipulator` requires running `normalize-probe.log.txt`, which I did not execute and cannot treat report text as independent evidence for.

**Claim 3 (completed-event row, targeted readings).** UNRESOLVED for the same reason: `j-modal-report-4.md:20-31` quotes commands and outputs, but a quoted command and its exit code inside a report evidences nothing until a lane that ran it supplies the reading.

**Claim 4 (merge keeps both units).** MET in part, NOT MET in part. `guides/veneer.md`, `constants.ts`, `index.ts`, etc. are asserted merged correctly per the report (`j-modal-report-4.md:34-43`), but the status evidence (`j-modal-5-status.txt`) contradicts a mechanical sub-claim below — see the status-scope finding.

**Claim 5 (one delegate).** UNRESOLVED. Requires running `Delegate.test.ts`'s 109-case suite; the "0 failed of 109" figure is self-reported in `j-modal-report-4.md:89` and `j-modal-gates-4.log.txt`, which I read but did not execute.

**Claim 6 (second pass).** Partially checked: `isInstance` guard usage confirmed MET (see checklist). `ModalVocabulary`'s presence in `types.ts` and staged status not independently re-verified beyond the status file read.

**Claim 7 (gates, instrument, scope).** NOT MET on the off-limits/scope sub-clause — see checklist below. Other sub-clauses (gate green counts, instrument row counts) UNRESOLVED, self-reported only.

## Checklist

| Item | Status | Evidence |
|---|---|---|
| Status lists only the brief's owned files, no off-limits file | **NOT MET** | `j-modal-5-status.txt:1` shows `M ROADMAP.md`, explicitly off-limits per `j-modal-brief-4.md:38` ("Off-limits: … `ROADMAP.md`"). Lines 16-26 show `A src/browser/Alert.ts`, `M Button.ts`, `A Carousel.ts`, `M Collapse.ts`, `A Dropdown.ts`, `A Placement.ts`, `A ScrollSpy.ts`, `A Swipe.ts`, `A Tab.ts` — every one of these is named off-limits verbatim in the brief's Scope section. `helpers.ts` (line 28) is also off-limits absent a stated TSDoc-clause exception, none recorded. Lines 2-14, 33-47, 63-66, 91 additionally list `app/browser/*`, `src/styles/*`, and `tests/app/browser/*` files with no relationship to Modal named anywhere in the brief or report. |
| No `.bs.` wire name outside `constants.ts` and guide prose | **MET** | `Grep` for `\.bs\.` across `src/browser` returned no matches. |
| Every invoked element guard reads `isInstance(x, HTMLElement)` or a subclass/`Element` | **MET** | `Grep` for `isInstance` across `src/browser` (output above) shows every element-typed guard narrowing to `HTMLElement`, `Element`, or an `HTMLElement` subclass (`HTMLAnchorElement`, `HTMLAreaElement`, `HTMLInputElement`, `HTMLTextAreaElement`); no guard narrows an element to a non-`Element` type. |
| Report records no `prove` call | **MET** | `j-modal-report-4.md:3` and `j-modal-report-5.md:3` each state "I made no `prove` MCP call (the server is not reachable from a subagent)." |
| Mutation rows, case titles, digests, gate counts | **UNRESOLVED** | Only the writer's report and log names are available; no execution or independent read of `j-modal-mutations-4.log.txt`, `j-modal-red-4.log.txt`, `j-modal-green-4.log.txt`, `j-modal-targeted-4.log.txt`, or `j-modal-gates-4/5.log.txt` was performed in this pass. A quoted command/exit code inside the report evidences nothing per the brief's own instruction. |
| Barrel exports match `index.test.ts`; guide § Surface parity; Summary-cell parity; banned-term sweep; shared-file patch scope | **UNRESOLVED** | Not reached within this pass; requires reading `tests/src/browser/index.test.ts`, `guides/veneer.md`, and running the substitution sweep, none of which were completed. |
| Orchestrator's replay log (`j-modal-mutations-5-orchestrator.log.txt`) | **UNRESOLVED (not a FAIL)** | Absent by design per the brief's note; the lanes read the worktree before the replay runs. |

## Not-met items, re-dispatchable

- Re-dispatch a unit to reconcile `j-modal-5-status.txt` against `j-modal-brief-4.md` § Scope: either the status evidence is the wrong file (a full-tree status rather than the Modal unit's scoped status), or the merge genuinely staged off-limits files, and the Orchestrator must determine which before accepting round 4/5. Name and resolve each off-limits path listed above.

## Referrals

- Whether the extra files in `j-modal-5-status.txt` (app/browser sections, styles utilities, setup files) belong to a separate concurrent campaign whose status was captured in the same snapshot, rather than genuine scope creep by the Modal unit, is a judgment call for the Orchestrator, who holds the full campaign context this checker does not.
- Every UNRESOLVED item above needs a lane (or a re-run of this checker with execution access, which this role does not have) to actually run the named logs/commands rather than read the writer's report of them.

VERDICT: FAIL — claim 4/7's status-scope sub-clause NOT MET (off-limits files `ROADMAP.md`, `Alert.ts`, `Button.ts`, `Carousel.ts`, `Collapse.ts`, `Dropdown.ts`, `Placement.ts`, `ScrollSpy.ts`, `Swipe.ts`, `Tab.ts`, `helpers.ts`, plus unrelated `app/browser`/`styles` files, appear in `j-modal-5-status.txt`); claims 1, 2, 3, 5, and the remainder of claims 6-7 are UNRESOLVED pending execution evidence beyond the writer's self-report.

---

The Orchestrator's readings, taken in the worktree after the lane returned:

- **The status-scope clause is misread.** `j-modal-5-status.txt` is the status of an open merge, and the claims file's Subject and claim 7 state so: the staged entries for `ROADMAP.md`, the landed engines, `helpers.ts`, and the app, styles, setup, and fixture files are the merge's content from `main`. Every one of the off-limits files the lane names compares equal to `MERGE_HEAD` (`git diff --cached --quiet MERGE_HEAD -- <file>` exits 0 for `ROADMAP.md`, `Alert.ts`, `Button.ts`, `Carousel.ts`, `Collapse.ts`, `Dropdown.ts`, `Placement.ts`, `ScrollSpy.ts`, `Swipe.ts`, `Tab.ts`, `helpers.ts`, and `HostSnapshot.ts`), and all 66 staged app, styles, setup, and fixture entries compare equal to `MERGE_HEAD` too; the only browser files that differ from `main` are the unit's own (`Modal.ts`, `Backdrop.ts`, `ScrollLock.ts`, `Isolation.ts`, their tests) and the files the brief owns. The brief's off-limits list bounds the writer's edits, which touched none of them. The clause holds; the lane's `FAIL` is discarded on that reading, not balanced.
- **The retained logs the lane declined to read** were read by the Orchestrator: `j-modal-mutations-4.log.txt` holds 112 rows each `EXACT` or `JOINED`, none `MISSED`, and ends `receipt: restored byte for byte`; `j-modal-gates-4.log.txt` records every listed gate at exit 0. The lane's `UNRESOLVED` clauses are therefore settled by the record it was handed, and the objective lane's verdict rules on the mechanisms.
- The `prove` clause is the writer's self-report and is accepted as such.
