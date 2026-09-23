# Audit verdict — ACCORDION (`ac`), round 2 (the fix round)

Subject: the round-2 claims in `ac-audit-2-claims.md` over the worktree `/home/user/veneer-ac` (the owned files over `a658879`), `ac-2.diff`, `ac-2-status.txt`, `ac-shared-2.patch`, `b-collapse-ac-report-2.md`, and `ac-instruments-2/`. The unit was written by `opus` on Opus 5.5.

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (thread `01a0cf8c-1554-7542-b52d-9b55d220dffb`, `codex-queue-15.sh`) | `ac-audit-2-objective-verdict.md` | `FAIL 8; outside the claims: none` |
| Subjective | `reviewer` on Opus 5.5 | `ac-audit-2-subjective-verdict.md` | `FAIL 7, 8; outside the claims: REC-1` |
| Checker | `checker` on Sonnet | `ac-audit-2-checker-verdict.md` | `PASS` |

Every lane ran on the one claims file, blind.

## Reconciliation

1. **Delta and scope: CONFIRMED** in every lane; the objective lane ran the apply check (exit 0) and matched every base hash, closing the reviewer's referral.
2. **The failing-first evidence: CONFIRMED** in every lane. The empty-partial control, the green control, the `button-padding-literal` mutation, and every round-1 mutation are distinguished by named assertions; the objective lane's in-memory compile matches the built selector list.
3. **The specimen headers (S1): CONFIRMED.** Every header is the `h2` element; the section and binding cases redden on the `h3` mutation.
4. **The plain variant's name (S2): CONFIRMED.** `Accordion base` throughout; the stale-specimen mutation reddens.
5. **Token nouns in the guide: CONFIRMED.**
6. **Token nouns elsewhere and the comment sweep: CONFIRMED.**
7. **The gates: CONFIRMED; one clause of the claim struck.** Every gate log carries its command and exit; the objective lane read the final chain and the per-gate logs. The reviewer's UNRESOLVED rests on the report's parenthetical that a recursive comparison of the mutation copy against the final copy "reported no difference", which no instrument retains and which the report contradicts at its line 190. Ruling: the clause is struck from the claim; the gates ran on the final copy (`gates-final.sh` captures each exit), and the copy-equivalence ruling given in the brief stands. No carrier.
8. **Law and report: BROKEN, record-only.** The code-law checks hold in every lane. Both lanes find bare code tokens in the report's prose ("The instrument is `empty-partial.sh`", "`mutate.py` writes", "the output of `built-selectors.mjs`", "`compare.py` reads", "`gates-final.sh` ran", the instrument list). The report is a retained record, not shipped product, and the user's standing instruction puts implementation before prose rounds; the finding is recorded here, the round-2 report stays as audited, and every later brief's report item names the token-noun rule so the class does not recur. No fix round.

## Findings outside the claims

- **REC-1** (reviewer): round 1's `ac.diff` had been overwritten by the round-2 capture. Fixed by the Orchestrator before this reconciliation: `ac.diff` (and NAVBAR's `nb.diff`) restored from the retaining commit with worktree-relative headers, in scaffold commit `497d3cff`; each round's capture is written only to its own file.

## Ruling

The code claims hold in every lane. ACCORDION round 2 is accepted for landing. The reviewer's landing observation stands: the accordion capture frames are read at the landing's regeneration.

VERDICT: PASS (claim 8 record-only; REC-1 fixed)
