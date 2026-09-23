# Audit verdict — T4 TEST-CLIP and TEST-MATRICES in `@orkestrel/test` (accepted 2026-09-23, 22:08 UTC)

Subject: `/home/user/test` from the 0.0.20 release `936bc4a` to `474fd9f` on the branch `claude/inspiring-allen-t4qzv1`: T4 rounds 1 to 3 (`10a9b3d`, `7104241`, the clip-edge repair of `measureContent`), rounds 4 to 7 (`11054f2`, `0c2c626`, `afb728c`, `474fd9f`, its documentation), and TEST-MATRICES (`46336ac`) with its fixes (`7911f63`, `bfbb5f4`, `af1a25e`).

## Lanes

| Round | Lane | Engine | Verdict |
| --- | --- | --- | --- |
| 3 | objective (`analyst`) | GPT-6 Astra | `t4-audit-3-analyst-verdict.md`: FAIL 3, 4, 5 |
| 3 | mechanical (`checker`) | Sonnet | `t4-audit-3-checker-verdict.md`: PASS, gate sub-clauses unresolved |
| 4 | objective (`analyst`) | GPT-6 Astra | `t4-audit-4-analyst-verdict.md`: FAIL 1, 2 |
| 5 | objective (`analyst`) | GPT-6 Astra | `t4-audit-5-analyst-verdict.md`: FAIL 2, 3, one finding outside |
| TEST-MATRICES | mechanical (`checker`) | Sonnet | `tm-audit-checker-verdict.md`: FAIL 4, 6 |
| TEST-MATRICES | objective (`analyst`) | GPT-6 Astra | `tm-audit-analyst-verdict.md`: FAIL 1, 4, 5, two findings outside |
| 6 and the fixes | objective (`analyst`) | GPT-6 Astra | `t4-audit-6-analyst-verdict.md`: FAIL 1 (linked identifiers), two findings outside; every behavioural, scope, and gate claim confirmed |
| 7 | mechanical (`checker`) | Sonnet | `t4-audit-7-checker-verdict.md`: PASS |

The subjective lane did not run on these rounds. The subject is a measurement repair and a test-table move with no API shape to argue, and every round from 4 on corrected documentation the objective lane ruled on sentence by sentence.

## Reconciliation

- Round 3's claim 3 (execution unevidenced) is settled by the Orchestrator's mutation run `t4-audit-3-mutations.log.txt` (each mutation reddens a named case; the checkout pristine after) and the full chain `t4-audit-3-gates.log.txt`; round 4's lane confirmed both.
- Round 3's claim 5 (the report's banned tokens) is settled by `t4-r4-report.diff`.
- Every documentation finding from rounds 3 to 6 is carried by rounds 4 to 7 (`t4-r4-brief.md` to `t4-r7-brief.md`); round 6 swept the whole surface once, and round 7 closed the linked identifiers, the boolean return form, and a fixture count, confirmed by the checker.
- TEST-MATRICES: the guides runner's import is repaired by `7911f63` (`tm-fix-brief.md`); the `REFUSAL` record by `bfbb5f4`; the empty scenario list, the ping summary, the summary verb, and the consumer count by `af1a25e`. The claim-1 finding on `BUNDLER_CONDITIONS` is dropped on the record: the table moved with every consumer that reads it, which round 6's lane confirmed.
- The scenario tables whose rows carry fixture callbacks, and the test files' local fixture classes and helpers, are carried to a later `@orkestrel/test` change (`tm-fixture-population.txt`), outside this campaign's styles scope.

## Gates

`t4-r6-full-gates.log.txt` records `format:check`, `lint:check`, `check`, `build`, and `test` exiting 0 at `af1a25e`; `t4-r7-gates.log.txt` records the scoped gates at `474fd9f`, a comment-only change over it. The release's own `prepublishOnly` run is the authoritative chain at the release commit.

VERDICT: PASS
