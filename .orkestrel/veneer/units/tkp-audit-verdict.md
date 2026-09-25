# TOKEN-PROOFS audit — verdict

The Orchestrator reconciled this round on 2026-09-25. Both lanes ran on `tkp-audit-claims.md`, blind to each other.

- **Objective lane:** `analyst` on GPT-6 Astra, thread `01a0d6d9-49dd-7480-a767-e144cb4364cb`, exit 0
  (`tkp-audit-objective-verdict.md`). `VERDICT: FAIL 3, 6; outside the claims: none`.
- **Subjective lane:** `reviewer` on Opus 5.5 (`tkp-audit-subjective-verdict.md`).
  `VERDICT: FAIL 2, 3, 6; outside the claims: F-CUSTOMIZATION-REACH`.
- **No checker ran.** The claims are proof and design claims the lanes rule; nothing in them is a verbatim prescription.

## Claims

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1 Coverage | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Each proof reads the consumer, and each plant kills it | CONFIRMED, noting the decoration plant cut the rest and hover rules together | UNRESOLVED on the link button's hover decoration assertion | UNRESOLVED on that one assertion: no plant cuts the `.btn-link:hover` decoration alone, so the hover leg of the redecoration case is not shown to be load-bearing. Every other assertion is killed by its own plant on both lanes |
| 3 The form cases' mode-scope ancestor | UNRESOLVED | UNRESOLVED | UNRESOLVED: the mechanism holds on both lanes from source, but the reading that a plain ancestor moves nothing is only in the writer's report. `.claude/rules/quality.md` § Instruments requires the settling instrument to stay as a test |
| 4 Real input | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 The stacking rows | CONFIRMED | CONFIRMED | CONFIRMED; both lanes note that the value case does not read the Alias cell, and both confirm the cell from source |
| 6 Gates | UNRESOLVED | UNRESOLVED | CONFIRMED by the Orchestrator's re-run after the unit exited (`tkp-instruments/logs/tkp-test-policy-orchestrator.log.txt`): `npm run test:policy` reads `Tests 109 passed \| 1 skipped (110)` and exit 0 at a load average of 7.35 on 4 CPUs. The writer's load clause had no log; this run replaces it |

## Findings outside the claims

- **F-CUSTOMIZATION-REACH, accepted (subjective lane, BROKEN).** § Customization says every tier and every `--bs-*`
  alias derived from a token follows an override in the reader's own unlayered rule. The `theme-tokens` mixin
  declares those aliases and tiers at `:root` and at each `[data-bs-theme]` scope, where they resolve and are inherited
  as values. So an override on any other element moves only the rules that read the token themselves. D51 rules the
  contract.

## Carrier

TOKEN-PROOFS round 2 (`token-proofs-brief-2.md`, `opus` on Opus 5.5):
- claim 2's hover-only decoration plant;
- claim 3's control cases, adopted as tests;
- F-CUSTOMIZATION-REACH's § Customization correction under D51.

Its audit runs `analyst` on GPT-6 Astra, the engine that did not write it.

## Ruling

FAIL 2 and 3 on evidence, and F-CUSTOMIZATION-REACH on the guide. Every proof that ran is sound on both lanes.
