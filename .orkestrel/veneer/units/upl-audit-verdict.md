# Audit verdict — UTIL-PLACEMENT (`upl`), round 1 (2026-09-23)

Subject: `upl.diff`, `upl-status.txt`, `upl-shared.patch`, `upl-consumer.patch` (against `e4e6a40`), the report `b-utilities-upl-report.md`; claims `upl-audit-claims.md`; brief `b-utilities-upl-brief.md`. Lanes: the objective lane `analyst` on GPT-6 Astra (`upl-audit-objective-verdict.md`; thread `01a0cf39-fd25-7bb0-8290-ff0a33a6153b`, launched through `codex-queue-8.sh` after a live probe at 17:04 UTC); the subjective lane `reviewer` on Opus 5.5 (`upl-audit-subjective-verdict.md`); `checker` on Sonnet (`upl-audit-checker-verdict.md`); blind on one claims file. The writer was `opus` on Opus 5.5, so the objective lane is the auditor engine that did not write it.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The partials and the cascade | CONFIRMED (an in-memory compilation reproduced the inventory and the ledger rows) | CONFIRMED | — | CONFIRMED |
| 3 The proofs | BROKEN (the matrix attributes the helper-placement mutation to cases it does not redden; two precedence mutations have no log; the frame runs' population is the Position proof alone) | UNRESOLVED (the two unlogged mutations; a stale log) | — | BROKEN: the matrix's attribution, the missing logs, the stated scope |
| 4 The sections and the specimens | CONFIRMED (the frame assertions distinguish the named mutations) | BROKEN (`Maximum sizes` renders `.vw-100` outside the frame against family ruling 8; the frame mutation logs cite a superseded proof) | — | BROKEN on the `Maximum sizes` placement, and the frame mutations are re-run against the shipped proof |
| 5 The registry | CONFIRMED | CONFIRMED (F1: the hidden-host convention undocumented) | CONFIRMED | CONFIRMED; F1 carried |
| 6 Tailwind | CONFIRMED (the table reproduced through the installed compiler) | CONFIRMED | — | CONFIRMED |
| 7 The guide and the shared patch | BROKEN (bare class tokens as sentence subjects) | BROKEN (the nouns; the § Showcase frame paragraph; the § Tailwind cause; wording) | CONFIRMED (the apply sub-part settled by the Orchestrator) | BROKEN on the nouns, the frame paragraph, and the cause clause |
| 8 Law and report | BROKEN (the nested function in the consumer patch; the case tables in the proofs) | BROKEN (the same; duplicated fixtures; comment counts) | BROKEN (the case tables) | BROKEN |

Outside the claims: F1 and F2 (subjective), REPORT-COUNTS (objective), and the subjective referrals (`.scroller`, the `.viewport` name, the landed Gap section's bare tokens).

## Rulings

- **Claim 3.** Round 2 rewrites the matrix so each case names a mutation that falsifies it (the helper-placement mutation on the utility-precedence and layer-escape cases only), runs and retains `visibility-order-reversed` and `fixed-important`, re-runs the frame mutations against the shipped `PositionSection.test.ts` with their population stated, and states each run's population.
- **Claim 4.** The `Maximum sizes` specimen's `.vw-100` box moves inside the specimen's `.viewport` element beside the height cap (family ruling 8), with the `SIZING_SPECIMENS` remark and the § Showcase sentence following.
- **Claim 7.** Every class token used as a sentence subject or object in `### Position utilities`, `### Sizing utilities`, `### Visibility utilities`, and the § Showcase frame paragraph takes its noun ("the `.top-50` class places…"; "an element carrying the `.position-absolute` and `.position-relative` classes resolves the `absolute` value"); the frame paragraph leads with the frame, names the set of specimens that render inside "the shell's `viewport` class" as shipped, and drops the region-order sentence; the § Tailwind clause states that a longhand another name declares can move for a reason outside the equality, which is why the consumer case reads each element on its own name's longhands; the three wording fixes the subjective lane names apply ("each resolved value"; "sets aside a width or height the element declares, so the box takes its content's size"; "including a box inside an invisible ancestor").
- **Claim 8.** The step, edge, position-value, and hidden-reading tables and one container fixture per shape move to `tests/setupStyles.ts` as frozen, documented, qualified constants bound by a freeze case in `tests/setupStyles.test.ts`; the infix names derive from `GRID_BREAKPOINT_CASES`; the focused start control becomes a builder in `tests/setupBrowser.ts` (report-only; recorded for the engine session as a pending shared change) imported by `VisibilitySection.test.ts` and `visually-hidden.test.ts`; the consumer patch inlines `longhands.get(name) ?? []` at its uses; the partial comments name the edge entries and the single-value maps without a count; the round-2 report states no count.
- **F1.** The `CASCADE_KEYS` remark in `tests/setup.ts` gains one sentence: a key that clips its element to one pixel names its positioned host through `:has(> …)` and reads the host's `position`, and the helper's cascade proof reads the hidden box itself.
- **F2.** The ruling on § Deviations item 1 stands on intent and is re-issued against round 2's corrected consumer patch.
- **Referrals.** The `.scroller` shell class retires when UTIL-FLOW ships `overflow-auto` (carrier: the UTIL-FLOW brief). The `.viewport` class keeps its name (M3's name; the frame paragraph's wording carries the distinction). The landed `### Gap utilities` section's bare tokens are CLOSE-OUT's prose sweep (recorded in the plan).
- **Claims 1, 2, 5, and 6.** Closed.

## Carriers

Every finding is carried by `upl-brief-2.md` (the fix round on `opus`, audited by `analyst` on Astra as the objective lane, `reviewer` as the subjective lane, and a checker): claims 3, 4, 7, and 8, F1, F2, and the report's counts. The `.scroller` retirement is UTIL-FLOW's; the Gap section's nouns are CLOSE-OUT's.

VERDICT: FAIL 3, 4, 7, 8; outside the claims: F1, F2, REPORT-COUNTS — carried by the fix round; the `.scroller` retirement — UTIL-FLOW; the Gap section's nouns — CLOSE-OUT
