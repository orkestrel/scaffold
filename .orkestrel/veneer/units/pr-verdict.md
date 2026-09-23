# Audit verdict — PROOF-RESOLVER (`pr`)

Subject: the claims in `pr-audit-claims.md` over the worktree `/home/user/veneer-pr` (the change over `518faf0` in `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `guides/veneer.md`), `pr.diff`, `pr-status.txt`, and `proof-resolver-report.md`. The unit was written by `builder` on Sonnet from a fully specified brief (`proof-resolver-brief.md`).

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (thread `01a0cf92-e6d7-7e51-8633-9d82e03ca817`, `codex-queue-16.sh`) | `pr-audit-objective-verdict.md` | `FAIL 6; outside the claims: none` |
| Checker | `checker` on Sonnet | `pr-check-verdict.md` | `FAIL 6; outside the claims: none` |

A builder unit from a fully specified brief runs the checker and the objective lane; no subjective lane is dispatched, because the brief fixed every shape and name (recorded here as the round's own reason).

## Reconciliation

1. **Delta and scope: CONFIRMED** in both lanes.
2. **The predicate: CONFIRMED.** `isProofFile` is exported between `isDeparture` and `matchSelectorKey`, refuses spaces, backticks, absolute paths, and `tests/setup.ts`, and accepts `tests/../tests/setupServer.test.ts` as the specified pattern permits (recorded; the pattern is the brief's).
3. **The resolver branch: CONFIRMED.** The objective lane ran the type-stripped source in read-only Node: the existing plugin proof is accepted, the missing proof refused, a non-file proof still reaches the recording lookup, and every existing compatibility row returns the base's result.
4. **The proof: CONFIRMED.** Each named case distinguishes its mutation (branch removed, existence check dropped, category guard inverted, suffix loosened).
5. **The guide: CONFIRMED.** One sentence after the specified anchor; every table line byte-identical.
6. **The report and the law: BROKEN, record-only, with one correction recorded here.** The code-law checks hold in both lanes. The report's prose states counts ("four failures", "two files", "sole failure"), a temporal "new", and positional references ("criterion 2"). The objective lane also finds a misattribution at `proof-resolver-report.md:41`: with the base module unchanged and the changed test file, the export-surface assertion fails because `isProofFile` is absent from the base's export list, so the red-first run's remaining failures are the export-surface case and the standing built-entry case, not the environment alone. That correction is recorded here as the record of the red-first reading. The report is a retained record, not shipped product; the finding is recorded and the report stays as audited.

## Ruling

The code claims hold in both lanes. PROOF-RESOLVER is accepted for landing on the session branch with scoped gates (the setup-server proofs, `test:conformance`, `test:guides`, `test:policy`, `check`, `lint:check`, `format:check`; the built-entry case reads on the chain after the base builds, which it does from `55ca0cd`).

VERDICT: PASS (claim 6 record-only, with the attribution corrected in this verdict)
