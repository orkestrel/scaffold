# J-TOOLTIP landing audit (round 6) — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the tooltip landing in `tmp/worktrees/tooltip` — rounds 1 to 4 as `4a10b51`, round 5 as the merge commit `0807a4f`, the second merge with `main` `2d95b37` staged and open — per `j-tooltip-brief-5.md`, `-6.md`, the reports `j-tooltip-report-5.md` and `-6.md`, and `j-tooltip-audit-claims-6.md` over the landing diff `j-tooltip-6.diff`.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec` read-only; thread `01a0d450-d77f-79b0-9f4d-63313198b817`, 33 commands, 473 s) | `j-tooltip-audit-6-objective-verdict.md` | `VERDICT: FAIL 5; outside the claims: none` |
| Checker | `checker`, Sonnet (native, read-only) | `j-tooltip-audit-6-checker-verdict.md` | `VERDICT: UNRESOLVED (5, 6)` — no claim failed; both clauses closed by the Orchestrator in that file |
| Subjective | `reviewer` | not run | The landing round changed no shape: the merge resolution keeps both sides, the two door repairs adopted the round-4 objective lane's prescriptions, and the sentences follow the round-4 subjective lane's own findings; the subjective lane read the mechanism whole in round 4 (`j-tooltip-audit-4-subjective-verdict.md`). Recorded under the user's landing instruction. |

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 The merge keeps both sides | CONFIRMED by both lanes (the retained diff equals the staged diff against `MERGE_HEAD`; no reverted `main` line; the Surface table's 283 rows without a duplicate; the barrel's exports equal the sorted assertion list). | — |
| 2 `readClosest` routing | CONFIRMED by both lanes; the helper's root bound and HTML-only match are the landed contract. | — |
| 3 The rebuild's doors | CONFIRMED. The objective lane bounds the whole-file red: it binds the relocation regression to the former implementation, and the two `EXACT` rows bind the token read and the discard report; a row pinning the dispatch's container read alone would assert the old placement stays promoted when the dispatch stops the rebuild. The stale relocated tip from an earlier stopped show proceeding to a fresh show is the stated undo boundary. | The dispatch-container row: J-POPOVER's instrument (carried) |
| 4 The teardown's token read | CONFIRMED by both lanes. | — |
| 5 The promotion bound, the sentences, the construction form | **FAIL** on two sentences: the `show` remark's "start a hide" overstates (a hide asked from `inserted` before the fresh tip's token write is refused and the show completes; the passing case around lines 673 to 679 expects it), and the guide's "a hide started before that write resolves `false`" excludes the settled-tip rebuild, whose old tip carries the token during the `show` dispatch. The promotion bound, the construction form, the restoration case, and the Bootstrap comparison hold (the checker's Bootstrap clause closed by the Orchestrator's read of `tooltip.js` lines 212 to 217). | Round 7 (`j-tooltip-brief-7.md`), the two sentences only |
| 6 Instrument, chains, scope | CONFIRMED by both lanes; the checker's gates clause closed when `j-tooltip-gates-6.log.txt` landed (twelve exits at 0). The Orchestrator's replay of the round-5 instrument over the merged tree follows round 7 and precedes the landing chain. | The replay |

## Deviations

- No subjective lane at the landing round, with the reason in the Lanes table.
- Round 7 is a two-sentence contract correction the objective lane prescribed; it closes on `test:guides` and the format check, and the landing chain runs after it.

VERDICT: FAIL 5; round 7 corrects the two sentences; then the replay, the landing chain, and the push
