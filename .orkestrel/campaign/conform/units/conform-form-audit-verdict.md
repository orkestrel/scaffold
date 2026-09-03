# Audit verdict: unit conform-form

Subject: the uncommitted unit in `/home/user/fleet/form` (brief `briefs/conform-form-brief.md`, audit brief `briefs/conform-form-audit-brief.md`, fix briefs `briefs/conform-form-fix1-brief.md` and `briefs/conform-form-fix2-brief.md`, report `reports/conform-form-report.md`, evidence `units/conform-form.diff.txt` and `units/conform-form.status.txt`), implemented by a direct Opus `implementer` (`units/l2b/form-implement-direct.md`) after workflow `wf_075a2bf5-dad` (L2b) was stopped, audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2b/form-r1-distillate-luna.md`) | distillate; the lane's launch replaced the staged closure (the vendored SessionStart hook, session ledger) |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2b/form-objective-r1.md`) | FAIL 4 on the record (four rows without a recorded sweep); F1 to F3; R1, R2 |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2b/form-r1-checker-luna.md`) | PASS; F-SET-REFERENCES, F-DIRECTIONAL-REFERENCES |
| 2 | objective | `reviewer` on Claude Opus 5, reading the fixed report against the unchanged tree | PASS; F4, F5 on the record; R3 |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checker ran on GPT-5.6 Luna, the tedious-work ladder's second rung, after Grok 4.6's quota spent (session ledger).

Fix rounds: round 1 (`briefs/conform-form-fix1-brief.md`, `builder` on Claude Sonnet, report only) added the four sweep rows, corrected six guide pointers, recorded the R2 ruling, and listed the successor rows with their carrier; round 2 (`briefs/conform-form-fix2-brief.md`, `builder` on Claude Sonnet, report only) named the lines behind the form-obj-1 sweep row in place of a count and corrected two pointers.

## Rulings on the referrals and the findings outside the rows

- R1 (the `guides/form.md` mirrors in terminal and toolbox): the byte copy at each consumer's landing.
- R2 (applying corrected text where the refuter's literal was false): satisfied the deviation contract; each correction fixed a false literal without changing the repair.
- R3 (the successor carrier had no file): `briefs/followon/form-prose-brief.md` was written before landing; it carries F2 (`src/core/types.ts:109` `@throws` form), F3 and F-SET-REFERENCES (the counts at `guides/form.md:971`, `:1695`, `tests/setup.test.ts:104`), F-DIRECTIONAL-REFERENCES (the seven `above`/`below` sites), and the `should` literal at `tests/src/core/helpers.test.ts:242`.

## Structural claims

Claim 4's counts are read from the capture files under `/home/user/work/evidence/form-proofs/`; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settled on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/form`, every gate exit 0 and the audit clean (`units/land-conform.log`, `units/conform-form.audit.txt`), landed as `23c6fe0`.

## Terminal

PASS (round 2 objective, round 1 checker), accepted on the deciding run at landing.
