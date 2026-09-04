# Audit verdict — unit form-prose (2026-09-03)

Subject: the uncommitted follow-on in `/home/user/fleet/form` on the landed tip `23c6fe0` (brief `briefs/followon/form-prose-brief.md`, fix brief `briefs/followon/form-prose-fix1-brief.md`, audit briefs `briefs/followon/form-prose-audit-brief.md` and `briefs/followon/form-prose-r2-audit-brief.md`, report `units/followon/form-prose-report.md`, evidence `/home/user/work/evidence/conform-form.diff` and `conform-form.status`). Writer: `builder` on Claude Sonnet for the unit and for fix round 1.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/form-prose-checker-luna.md`) | FAIL 5; O-TESTS-GUIDE-DIRECTIONAL, O-POLICY-DIRECTIONAL outside the claims |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/followon/form-prose-r2-checker-luna.md`), after fix round 1 | PASS |

The objective and subjective lanes did not run: the unit applies prose replacements the brief quotes, so the round's judgment is mechanical and the checker is the lane that rules it. Both lanes ran on GPT-5.6 Luna, the tedious-work ladder's second rung, because Grok 4.6 exhausts within minutes of a real lane today (session ledger).

## Rulings on the round-1 verdict

- Claim 5 (a changed Surface row): the `FormInterface` row at `guides/form.md:91` is the brief's row 2, so the claim's wording was wrong and the unit was not; the round-2 brief names the row.
- O-TESTS-GUIDE-DIRECTIONAL (`above`, `below`, a count, and an ordinal in the comments of `tests/guides.test.ts`): closed by fix round 1, held by the round-2 checker.
- O-POLICY-DIRECTIONAL (`tests/policy.test.ts:544`): the vendored host inventory's, carried by the scaffold row in `ledgers/followons.md`.

## Structural claims

Claims 2, 4, 6, and 8 are not held by the checker. Claim 8's gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/form`, recorded in `units/followon/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (round 2 checker after fix round 1), the deciding run at landing read every gate exit 0 (landed as form `ca4aa7b`).
