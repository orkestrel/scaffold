# Audit verdict — UTIL-PLACEMENT (`upl`), round 2 (the fix round)

Subject: `upl-2.diff`, `upl-2-status.txt`, `upl-shared-2.patch`, `upl-unlisted-2.patch`, and `b-utilities-upl-report-2.md` over `e4e6a40` in `/home/user/veneer-upl`, against `upl-audit-2-claims.md`.

## Lanes

- `analyst` on GPT-6 Astra (objective): `upl-audit-2-objective-verdict.md`, journal `tmp/codex/upl-audit-2-analyst.jsonl`, thread `01a0cf79-687d-7da1-b42f-ecd996394062`, `VERDICT: FAIL 1, 2, 3, 5, 7, 8; outside the claims: REPORT-COUNTS`.
- `reviewer` on Opus 5.5 (subjective): `upl-audit-2-subjective-verdict.md`, `VERDICT: FAIL 2, 8; outside the claims: F-CAP, F-FIXTURE, F-ROWS, F-SETUP, F-SHELL`.
- `checker` on Sonnet (claims 1, 6, 7, 8): `upl-audit-2-checker-verdict.md`, `VERDICT: PASS` (its finding on the captured diff's absolute headers was the Orchestrator's capture defect, repaired by regenerating `upl-2.diff` with relative paths).

## Reconciliation

Claims 4 and 6 are CONFIRMED by every lane; the round-1 rulings, D1, D2, and D3 stand, and D4 is recorded for the unit that owns the table cases.

Claim 1 holds on the delta and is BROKEN in the claims file (both lanes): the `Maximum sizes` move sits in `app/browser/constants.ts`, not the shell partial, which is unchanged from round 1. Recorded against the claims file; no carrier.

Claim 2 holds on the matrix (every mutation's log read against its assertion by both lanes, the associations regenerated in memory by the analyst) and is BROKEN on a clause the claims file added and the brief never asked for (the copy and the restoration digests in each log header; `mutate.py` writes neither). Carried as an evidence improvement: the header records the copy and a SHA-256 of the restored file.

Claim 3 is BROKEN in its wording and holds in its substance: the move is present and `maximum-outside-frame` reddens the shipped section proof, but viewport units stay viewport-relative inside the frame (the analyst's compile and the cap readings, `[[390,390],[192,192]]` before and after) — the frame contains and clips a viewport-sized box while the percentage caps resolve against their containing blocks. The round-1 ruling that the move makes the readings the frame's was a misconception, corrected here. The reviewer's F-CAP follows from it: the `.mw-100` width cap is neither visible nor measurable inside the clipping frame, because an uncapped `.vw-100` box is clipped at the frame's edge, which is the line's edge, so the capped and uncapped states paint and read the same. Carried: the line inside the frame narrows with the shipped `w-50` step (`<div class="viewport"><p class="w-50"><span class="placeholder vw-100 mw-100" …>`), the `SIZING_SPECIMENS` remark says why, and a section-run mutation dropping `mw-100` is logged red. The height cap (192 against 896) has no such problem.

Claim 5 is BROKEN (the analyst's in-memory execution of the placement binding case): emptying `OFFSET_EDGES`, emptying `VIEWPORT_SIZE_CASES`, or zeroing `STICKY_SCROLLER.offset` still passes, because the case validates only the supplied edges, compares projections of the same supplied population for the viewport cases, and freeze-checks the scroller without asserting its geometry. Carried: bind the required memberships independently of the tables (the offset edges from the inventory's `top-`, `bottom-`, `start-`, and `end-` names; the viewport cases from the inventory's `vw-100`, `vh-100`, `min-vw-100`, and `min-vh-100` names) and assert the scroller's geometry (a positive `offset` and a `style` carrying `overflow: auto`), with one logged control per gap (`edges-emptied`, `viewport-cases-emptied`, `scroller-offset-zero`).

Claim 7 is BROKEN in the claims file's wording (inverted: the record is red-before, green-after, which is the failing-first law) and holds on the frame runs (every frame mutation reaches the shipped proofs; the analyst's table); the analyst's note that the paint and sticky-scroll cases are not parameterized by variant is recorded — the section proofs run under one viewport and the journey covers the variants — and the round-3 report states the actual population.

Claim 8 is BROKEN (both lanes): the report's tallies ("One file outside the Shared row", "both patches", "both logs") contradict its own count-free assertion, its "A proof restates no table, fixture, or infix list" is false (F-FIXTURE: the translation box's inline style sits in two position cases, and `sizing.test.ts` restates the container the `PLACEMENT_CONTAINER` constant carries), and `round-delta-shared.diff` is stale against the final patch. Carried with the fixtures (`TRANSLATION_BOX` in `tests/setupStyles.ts`; the sizing case composing `PLACEMENT_CONTAINER`).

F-ROWS (the reviewer) is carried: the compatibility rows' bare tokens take their nouns ("reading the `--vn-stack-fixed` token", "reading the `--vn-stack-sticky` token"; "The official `.translate-middle`, `.translate-middle-x`, and `.translate-middle-y` selectors ship"). F-SETUP is carried: `SIZE_STEP_CASES` becomes `SIZING_STEP_CASES` (the file's `SIZE` names size variants), the `OFFSET_STEP_CASES` doc opens "Lists the position offset steps", "class stem" becomes "class prefix" throughout, and the `PLACEMENT_*` and `POSITION_*` names take their code-point positions in the export literal and the import list. F-SHELL is carried: the `_shell.scss` comment adds that the bounded height gives a percentage height or offset a definite height to resolve against. The reviewer's ledger-table-order referral (`#### position` between `placeholder` and `icon-link`) is ruled by reading `guides/veneer.md` § Departures' rule ("in the order the shipped keys sort"): the round-3 unit places the `#### position` table where that rule puts it and records the reading.

The reviewer's line-length nit is not carried. The `focus-dropped` equivalent mutation and `helper-in-components`'s narrowed associations are accepted as the analyst read them.

## Carriers

Every finding is carried by `upl-brief-3.md` (a fully specified round on `builder`, verified by `checker` and `analyst`): the cap's visibility and its mutation, the binding case's independent memberships and the scroller geometry with their controls, the fixtures, the row nouns, the setup names and order, the shell comment, the log headers, the ledger table's position, and the report's shape. The claims-file defects (claims 1, 2, and 7) are recorded against the claims file.

VERDICT: FAIL 3, 5, 8; outside the claims: F-CAP, F-FIXTURE, F-ROWS, F-SETUP, F-SHELL, REPORT-COUNTS — carried by the round-3 brief; claims 1, 2, and 7 recorded against the claims file
