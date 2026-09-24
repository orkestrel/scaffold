# FRAME-HELPERS audit, round 2 — the Orchestrator's reconciliation (2026-09-24)

Lanes that ran, blind to each other on `fh-audit-2-claims.md`: the objective lane, `analyst` on GPT-6 Astra (thread
`01a0d490-2903-7130-acf8-ebb9a71b934a`, `fh-audit-2-objective-verdict.md`), and `checker` on Sonnet for claims 3, 5, and 6
(`fh-audit-2-checker-verdict.md`). The subjective lane was not run, by the user's instruction to put implementation first,
because the round adds no frame and no behavior and its renames take the round-1 subjective verdict's own prescriptions.
Orchestrator evidence: `git apply --check` of `fh-shared.patch` in `/home/user/veneer-fh` exits 0.

| Claim | Objective | Checker | Ruling |
| --- | --- | --- | --- |
| 1 P1 | CONFIRMED | — | CONFIRMED |
| 2 F1 | CONFIRMED | — | CONFIRMED |
| 3 N1 and N2 | BROKEN | CONFIRMED (journey sites) | BROKEN: the helper proofs in `tests/setupBrowser.test.ts` bind focus readings as `whole`, `cropped`, `reading`, and `unpainted`, lift an element named `host`, and name a detached copy `copy`; the `focus` TSDoc example binds `reading` |
| 4 C1 | CONFIRMED | — | CONFIRMED |
| 5 Gates | CONFIRMED | CONFIRMED | CONFIRMED; the apply check settles the checker's open sub-clause |
| 6 W1 | BROKEN | CONFIRMED (sampled) | BROKEN: the page-strip comment names its item by position, and the `worn` token lacks its noun |

## Findings carried into round 3

- **N3.** Bind every focus reading in `tests/setupBrowser.test.ts` and in the `focus` TSDoc example as `focusReading`,
  in separate scopes where two would shadow; name the lifted element `specimen` and a detached copy `copied`, as the
  journey does.
- **W3.** Rewrite the page-strip comment to name the Page 1 link and its relation to the previous-page arrow; write "the
  `worn` parameter" in the `tests/setupBrowser.ts` documentation.

VERDICT: FAIL 3, 6 — round 3 on `b-frame-helpers-brief-3.md`, audited by the checker alone.
