# Audit verdict — UTIL-PLACEMENT (`upl`), round 4 (the evidence round)

Subject: the round-4 claims in `upl-audit-4-claims.md` over the worktree `/home/user/veneer-upl`, `upl-4.diff`, `upl-4-status.txt`, `upl-shared-4.patch`, `upl-unlisted-4.patch`, `b-utilities-upl-report-4.md`, and `upl-instruments-4/`. The unit was written by `builder` on Sonnet from a fully specified brief; the round ran the objective lane and the checker, no subjective lane (recorded here as the round's own reason: the brief fixed every shape and name).

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-21.sh`) | `upl-audit-4-objective-verdict.md` | `FAIL 2, 6; outside the claims: REPORT-COUNTS` |
| Checker | `checker` on Sonnet | `upl-audit-4-checker-verdict.md` | `FAIL none; outside the claims: a code token followed by a digest` |

## Reconciliation

1. **Delta and scope: CONFIRMED** in both lanes; the objective lane reconstructed the patches against the base and matched both delta artifacts.
2. **The geometric cap mutation: CONFIRMED on the evidence; the run-list clause corrected.** The `max-width-rule-dropped` log records the Sizing section proof red at the width comparison (`390` against `195`, `1280` against `640`), the specimen still selectable; the selector-removal mutation is kept as selector evidence beside it; the cap readings match round 3. The claim's clause that the mutation sits in `mutate.py`'s run list is false, because the round-4 runner takes its mutation from the command line and keeps no list; the invocation is reconstructed from the log header in `upl-audit-4-settling.txt`.
3. **The round-2 setup controls re-run: CONFIRMED** in both lanes, each control's distinguishing assertion matched to its round-2 log.
4. **The translation fixture's binding: CONFIRMED.**
5. **The gates: CONFIRMED** in both lanes, on a first run with no self-correction.
6. **Law and report: BROKEN, record-only.** The code-law checks hold. The report's gate commands omit the `run` subcommand the runner uses, its account of the unretained `TS2724` run gives an origin the round-3 report contradicts (the round-3 report described a fresh-copy run; no log verifies either), and tokens stand without nouns; the checker adds a patch name followed by a digest. Counts (both lanes): record-only.

## Ruling

The code claims and the proof evidence hold in both lanes. UTIL-PLACEMENT is accepted for landing on the session branch after TOGGLES: `upl-resolve.py` (the `@source` token union and the file-table union), `land-seams.py`, `upl-unlisted-4.patch` beside the shared patch, the regeneration, and the chain.

VERDICT: PASS (claim 2's wording corrected and settled; claim 6 record-only)
