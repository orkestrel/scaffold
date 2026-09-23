# CLOSE-MOTION (`cm`) audit — reconciled verdict

Round: `cm` round 1 (`close-motion-brief.md`; report `close-motion-report.md`) over `cm.diff` and `cm-status.txt` against `88684bc`. Lanes: `analyst` on GPT-6 Astra (objective; `cm-audit-analyst-verdict.md`, session `01a0ce1a-04d5-7323-be6e-553b34c2acb3`; it loaded the module in Node and read the exported value and the tables' conditions), `checker` on Sonnet (mechanical, claims 1, 3, 4, 6; `cm-audit-checker-verdict.md`). The reviewer lane did not run by design (ruling R11: a `builder` unit from exact text, audited objectively and mechanically). Every citation sampled resolves in the file it names.

| Claim | Analyst | Checker | Ruling |
| --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED (the module loaded; a wrong-preference control rejected) | — | holds |
| 3 | BROKEN on the report's classification omitting the oracle inventory | CONFIRMED (the greps rerun; the inventory named as fixture) | holds on the tree; the report's omission is noted against the report, which is retained as returned; the claims file names the inventory as fixture |
| 4 | BROKEN on the carrier: the button-group split named off-limits but unassigned | CONFIRMED, naming the second multi-line split site in the same file | holds on the tree; the carrier is the B-PASSIVE-PROSE row, which fold 44 extends with both sites |
| 5 | CONFIRMED (each mutation's failing assertion named) | — | holds |
| 6 | BROKEN (the report's count and "now"; the head comment's two file tokens without nouns) | CONFIRMED (the diff's new prose) | broken on the head comment: fixed at landing as an integration edit (`cm-probe-cm-integration.py`, `cm-integration.diff`), verified by the landing checker; the report's prose faults are noted against the report, retained as returned |

The unit lands after the integration edit's check.

VERDICT: FAIL 6 (one site, fixed at landing as an integration edit); outside the claims: none
