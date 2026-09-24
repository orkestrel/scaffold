# J-HELPERS audit round 3 — the reconciled verdict (2026-09-24)

Subject: the J-HELPERS unit after round 3 in `tmp/worktrees/helpers` (`unit/helpers` from `e8251cf`), claimed in `j-helpers-audit-claims-3.md`. Lanes, blind on one claims file: the objective lane on GPT-6 Astra (`j-helpers-audit-3-objective-verdict.md`, thread `01a0d36c-005f-7303-8279-849fb4281c8a`, journal `tmp/codex/j-helpers-audit-3.jsonl`) and the checker on Sonnet (`j-helpers-audit-3-checker-verdict.md`). The subjective lane was not run in this round: round 2's subjective lane produced the findings this round closes, and round 3's wording follows that lane's own text; the Orchestrator read the round-3 hunks for the claims. The Orchestrator's replay of the round-3 instrument ran after the lanes returned, in three parts (`j-helpers-mutations-3-orchestrator-1.log.txt`: the helpers and ScrollSpy rows; `-2.log.txt`: the Delegate and Dropdown rows; `-3.log.txt`: the first row of each earlier part, which the instrument had read as its log-name argument and skipped), and reproduced every one of the instrument's rows as its log names it, each part ending `receipt: restored byte for byte` with the Orchestrator's own digest agreeing.

## Per-claim reconciliation

| Claim | Objective | Checker | Ruling |
| --- | --- | --- | --- |
| 1 `readOutermost` domain | CONFIRMED, attacked with a document root, a fragment root, a matching root, mixed lists, and an SVG ancestor | CONFIRMED | Confirmed; the replay reproduced the four `readOutermost` rows. |
| 2 Dropdown light dismissal | CONFIRMED, with the bound that the red log stops at the outside-click assertion and the Tab half is proven by the green case and the shared path | CONFIRMED on the instrument rows; the red and green logs not opened | Confirmed; the replay reproduced "light dismissal reads the disabled predicate" (`EXACT`) and the refusal row (`JOINED`, both cases). |
| 3 the two `closest` reads | CONFIRMED | CONFIRMED for ScrollSpy; the Delegate hunk not opened | Confirmed; the Orchestrator read the Delegate hunk when writing the claim, and the objective lane attacked it. |
| 4 wording | CONFIRMED, with the landing bound that the `types.ts` patch integrates at landing | CONFIRMED | Confirmed; the patch file `tmp/j-helpers/patches/types.diff` carries the round-3 wording and `w2-land-1.sh` applies it. |
| 5 round-2 state stands | CONFIRMED from the retained diffs | UNRESOLVED (not diffed by the checker) | Confirmed: the Orchestrator's own comparison of the round-2 and round-3 added lines per file shows changes only in `helpers.ts` (`readOutermost`, the `readClosest` and `matchesDisabled` descriptions, the `readScrollbarWidth` remark) and `Delegate.ts` (the `#locate` fallback), beside the `Dropdown.ts` and `ScrollSpy.ts` items of claims 2 and 3. |
| 6 gates, instrument, scope | UNRESOLVED pending the replay; every other clause confirmed | CONFIRMED | Confirmed by the replay. |

## Referrals ruled

- The checker's `instanceOf(HTMLElement)` referral: the `filter` predicate form is the one the standing conditions permit for a `filter` or `find` callback; `isInstance(x, HTMLElement)` is required only for an immediately invoked check. Met.
- The objective lane's landing bound: the `types.ts` patch integrates at the landing step, as every W2 landing did.
- The `Popover*` TSDoc mirror the J-TOOLTIP report returned is carried to J-POPOVER (plan § Carried findings), not to this unit.

## The landing

`w2-land-1.sh helpers` applies the patch, commits the unit with `j-helpers-landing-message.txt`, and merges `main` (which moved only by the roadmap commit `a9cbeec` since the cut). A conflict-free merge that brings no engine change needs no landing round and no landing lane; `w2-land-2b.sh helpers` runs the integration gates and fast-forwards `main`, the verifier's chain runs on `main` against `host-chromium-153-reading.md`, and the push follows.

VERDICT: PASS — the unit lands
