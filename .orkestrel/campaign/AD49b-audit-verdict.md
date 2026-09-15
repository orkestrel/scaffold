# AD4-9b — audit verdict (D4-9b: the overload pin's name, controls, door, and the collision key)

Round of 2026-09-15 on the 0.0.69 release tree. Subject: `D49b-diff.patch.txt`,
`D49b-scaffold-overload-pin-report.md`, gates `D49b-scaffold-gates-orchestrator.log.txt`, probes
`P23-d49b-key-probe.md` and `P24-d49b-merging-probe.md`. Brief: `AD49b-audit-brief.md`.

## Lanes

| Lane | Engine | Ran | Verdict |
| --- | --- | --- | --- |
| checker (mechanical) | Sonnet | yes — `AD49b-audit-checker.md` | PASS (claims 1–6 confirmed; 7 and 8 referred) |
| analyst (objective) | GPT-6 Astra | yes — `AD49b-audit-analyst.md` (thread `01a0a629-efaa-7fa1-843f-d6b22064e49f`) | FAIL 7, 8 |
| reviewer (subjective, the cross-engine lane) | Opus 5 | yes — `AD49b-audit-reviewer.md` | FAIL 7 |

A Sonnet builder wrote D4-9b; the analyst and the reviewer are engines that did not write it.

## Reconciliation

- Claims 1–6: confirmed by every lane with file:line; the key replay taken by the Orchestrator
  (P23b), not from the writer's report.
- Claim 7, the merging vector (Astra): closed by P24 — interface merging, function + namespace
  merging, and an overload each report one violation per name per file per owner at the first
  declaration's line; distinct files and distinct owners still report one each. The reviewer's
  source reading agrees (the coarser key merges only byte-identical duplicates).
- Claim 7, the report's prose (both lanes: `below`, `above`, a tally, `new`, off-by-one citations):
  substantiated and recorded; NOT adopted as an edit — the writer's report is retained verbatim
  as evidence, and the writing rules bind the prose the campaign authors (the verdicts, the
  commit message, the handoff), which carry the corrected wording.
- Claim 8 (Astra held; the reviewer SHIP): the release-mode distribution evidence is in
  `K-scaffold-release-69b.log.txt` (prepublishOnly exit 0; the distribution project 5 passed /
  1 skipped); the release record corrected — the retained commit draft
  `commit-scaffold-release-69.draft.txt` names the shipped pin and carries the collision-key line;
  the Orchestrator's digest note in the report now states the sequence (the floor refresh landed
  after D4-9 returned and before D4-9b started). SHIP.
- Outside, recommended (the reviewer): move `reports an overloaded export's collision once` into
  `describe('inspectPolicySurface evidence')` — carried forward to the next unit that owns
  `tests/setupPolicy.test.ts` (the file is not vendored; the placement was the brief's).
- Carry-forward: `export declare global {}` reads a declaration named `global` (P22) — for the
  next unit owning the reader's accepted list.

The code ships as scaffold 0.0.69: records checkpoint 4, then the release commit.

VERDICT: PASS
