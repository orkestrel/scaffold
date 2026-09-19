# Scaffold fix round S4-3 and S5-2 — closure record (Orchestrator, 2026-09-17)

The fix-round verdict (`s-fix-audit-verdict.md`) routed its findings to S4-3 (`sol`, checkpoint
`f540107b`) and S5-2 (`opus`, checkpoint `ca09788c`), each adopting the lanes' prescriptions, and
named three closure instruments in place of a third adversarial round. Their readings:

| Instrument | Reading | Record |
| ---------- | ------- | ------ |
| Orchestrator reproduction, re-run of `f2-probe.sh` against the CLI rebuilt at `f540107b` | The indirect chain, the grouped chain, and the Playwright `--config` script each draw no question; the absent-configuration remedy names the chain invocation; the earliest-fact-first order stands as the guide states; the setup-proof `repair` refusal is unchanged and is the order S5-2 teaches | `s-fix-audit-reproduction/after/` |
| Mutation probe against the S4 pin (claim 7 of the S audit) | `A_core_EXIT=1`, `B_core_EXIT=1`, `base_core_EXIT=0`; tree restored | `s-fix-c7-mutations-summary.txt` |
| S4-3's own controls | `-c` cases, the grouped chain, the Playwright script, the remedy message: each red before its ruling and green after | `s4-report-3.md` |
| S5-2's own controls | The cp1252 clause, the restatements, the activation order, the term sweep: each red at `f540107b` through `git show` and green after | `s5-2-report.md` |
| `checker` over the mechanical criteria | MET on every criterion; the one UNMET rested on the absent word "classifier", ruled MET on the sentence the guide carries (`guides/scaffold.md:652-654`) | `s-close-checker-report.md` |
| Orchestrator gate readings after each build | S4-3: every stage exit 0, `bin 267 passed (267)`; S5-2: every stage exit 0 | `s4-3-gates-summary.txt`, `s5-2-gates-summary.txt` |
| Independent `verifier` over the authoritative chain at `ca09788c` | `GATES: GREEN` — format, lint, check, build, the seven test projects (`425`, `466 | 7 skipped`, `267`, `110`, `173 | 1 skipped`, `162 | 3 skipped`, `23`), and the distribution proof in release mode (`6 passed | 1 skipped`), each exit 0; no anomaly | `s-verify-report.md` |

## Rulings closed

- S audit claims 1, 7, 10, 23, F1, F4 (S4 and S4-3) and 5, 12, 16, 17, 18, 19, 20, 22, 23, F2,
  F3 (S5 and S5-2): closed.
- Fix-round claims 2, 3, 7, 8, 14, 15, F-A, F-B, F-C: closed. Claim 4: a documented limit, stated in
  the guide. Claim 13: closed by the activation order. Claim 17: closed by claim 3's fix.
- Unresolved and carried, not fixed: S audit claim 4 (`capture` under a real browser) and the
  fix-round's browser-execution note, both taken in the roughnotes adoption unit's acceptance
  (`test:journey` with and without `CAPTURE`).

## Seam budget

The generator's manifest-question seam consumed the S audit round and one fix round (S4 → S4-2 →
S4-3); the skill's directive seam consumed the same two rounds (S3 → S5 → S5-2). Neither reached the
third round `.claude/rules/quality.md` § Rounds and verdicts budgets. A further finding at either
seam opens it as a design question, not a fourth repair.
