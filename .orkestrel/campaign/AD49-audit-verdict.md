# AD4-9 — audit verdict (D4-9, the scaffold surface reader accepts an exported function overload)

Round of 2026-09-15 on the 0.0.69 release tree. Subject: `D49-diff.patch.txt`,
`D49-scaffold-overload-reader-report.md`, gates `D49-scaffold-gates-orchestrator.log.txt`.
Brief: `AD49-audit-brief.md`.

## Lanes

| Lane | Engine | Ran | Verdict |
| --- | --- | --- | --- |
| checker (mechanical) | Sonnet | yes — `AD49-audit-checker.md` | PASS (claims 1–5 confirmed; the writer's red-then-green UNRESOLVED as independent evidence) |
| reviewer (subjective, the cross-engine lane) | Opus 5 | yes — `AD49-audit-reviewer.md` | FAIL 3 |
| analyst (objective) | GPT-6 Astra | not run | the unit is a one-line accepted-list extension with a pin, fully prescribed; the objective questions (which spelling reaches which refusal; the red reading) were settled by the Orchestrator's probe P22 rather than by a bench lane |

The builder that wrote D4-9 ran on Sonnet, the checker's engine; the reviewer on Opus is the
engine that did not write it, so the fix-round rule holds through the reviewer.

## Reconciliation

- Claim 3 FAIL upheld. The brief named a `TSExportAssignment` control the pin never had; the
  checker read the `export default 1` control as that control. The reviewer's reading stands: the
  pin's only control reaches the statement refusal, never the declaration refusal D4-9 widened.
  P22 measured the spellings (`export import Legacy = require('node:path')` reaches the declaration
  refusal as `TSImportEqualsDeclaration`; `export = 1` the statement refusal) and took the red
  reading by mutation (1 failed, 30 passed with the accepted-list line removed; 31 passed restored).
- Outside, required (the pin's name states the property its assertion refutes): carried by D4-9b.
- Outside, recommended (the matrix row as the door; the blank line and the block's place; the
  collision key without `line`): all carried by D4-9b — the key change is inside D4-9's capability
  because overloads threw before D4-9, so the per-line multiplicity is D4-9's own consequence.
- Outside, recommended (`via` and the orphan fragment in the retained report body): the fragment
  is the Orchestrator's retention artifact and is annotated; the writer's prose stays verbatim as
  evidence — not adopted for the report, and the substitution row binds prose the campaign authors.
- Carry-forward (the barred `git stash`): ledgered at D4-9; the red reading it produced is replaced
  by P22 (b).

Successor: D4-9b (`D49b-scaffold-overload-pin-brief.md`, builder on Sonnet); its audit is round
AD4-9b, reviewer on Opus 5 plus analyst on Astra plus checker.

VERDICT: FAIL 3
