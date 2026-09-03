# Audit verdict — unit conform-csv (2026-09-03)

Workflows: round 1 and fix round 1 in `wf_c7b5931c-88f` (`instruments/layer.workflow.js`, stopped 10:36 UTC after csv's fix round had returned); rounds 2 and 3 with fix round 2 in `wf_6380885b-9c1` (`instruments/fixaudit.workflow.js`). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writer: `implementer` on Claude Opus 5. Subject: the unit's uncommitted changes on the baseline 6b7a3c5. Brief: `briefs/conform-csv-brief.md` (successor of `conform-csv-brief-1.md`); report: `reports/conform-csv-report.md`; evidence: `units/conform-csv.diff.txt`, `units/conform-csv.status.txt`; lane verdicts: `units/l1/11-csv-checker-r1-*.json`, `units/l1/12-csv-objective-r1-*.json`, `units/fa1/*-csv-*-r2-*.json`, `units/fa1/*-csv-*-r3-*.json`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | FAIL 4 8 (F1, F2) | PASS | fix round 1 closed F1 and F2 |
| 2 | FAIL 4 (no finding; referrals R-A to R-D) | PASS | fix round 2 re-took every control, adopted R-A, R-B, R-D |
| 3 | FAIL 4 (claim 4 UNRESOLVED; OBJ-1 one-sentence header comment; referrals R-C and the moved `via`) | PASS | round budget spent; OBJ-1 applied at landing |

## Orchestrator's rulings

- **Claim 4** is structural for a read-only lane in this unit: every defect-naming test is in the diff and every sweep was re-run by the lane; only the control counts are the writer's transcriptions, re-taken alone in fix round 2. The deciding run at landing is the independent green; the red readings stand as the unit's own record. From the next generated brief the template asks each unit to capture its control runs to files under the evidence directory, the form msg's fix round 3 established, so that this seam closes inside the unit.
- **OBJ-1** (`tests/guides.test.ts:2-3` still told a sibling package that the constants are the only package-specific part, after the unit added the `flagship fences` block): applied at landing as the lane prescribed, with `that follow` in place of the banned `below` — "The constants that follow and the `flagship fences` block are this package's own; a sibling package rewrites each of them." — a one-line comment edit the Orchestrator made directly and the landing's format gate reads.
- **R-C** (the local `isRecord` at `tests/distribution.test.ts:159`; its only gate packs and installs): its own follow-on unit with `npm run test:distribution` as the gate (`ledgers/followons.md`).
- **The moved `via`** (`tests/src/core/helpers.test.ts:850`, relocated verbatim by csv-obj-14): a verbatim-move row carries the text it moves; the vocabulary fix is the follow-on unit's, alongside R-A and R-B.
- Round 2's R-A, R-B, and R-D were adopted in fix round 2 (`src/core/validators.ts:19` `through`, `src/core/CSV.ts:207` `because`, the report bullet).

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit. csv-subj-5 (`BlankPolicy` deleted, `blanks` boolean) has no fleet consumer.

Terminal: `VERDICT: PASS`
