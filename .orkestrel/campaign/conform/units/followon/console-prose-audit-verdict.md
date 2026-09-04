# Audit verdict — unit console-prose (2026-09-03)

Subject: the uncommitted follow-on in `/home/user/fleet/console` on the tip `d9262d0` (brief `briefs/followon/console-prose-brief.md`, fix brief `briefs/followon/console-prose-fix1-brief.md`, audit briefs `briefs/followon/console-prose-audit-brief.md` and `briefs/followon/console-prose-r2-audit-brief.md`, report `units/followon/console-prose-report.md`, evidence `/home/user/work/evidence/conform-console.diff` and `conform-console.status`). Writer: `builder` on Claude Sonnet for the unit and for fix round 1.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/console-prose-checker-luna.md`) | FAIL 3 (`new` and `now` sites) |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/followon/console-prose-r2-checker-luna.md`), after fix round 1 | PASS |

The objective and subjective lanes did not run: the unit applies the substitution table and the nested-function rule to sites the conformance audit recorded outside its rows, so the round's judgment is mechanical and the checker is the lane that rules it. Both lanes ran on GPT-5.6 Luna, the tedious-work ladder's second rung, because Grok 4.6 exhausts within minutes of a real lane today (session ledger).

## Rulings on the round-1 refutation

- `new` at the sites the lane listed (`src/core/Styler.ts`, `src/core/types.ts`, `src/browser/types.ts`, `src/core/Spinner.ts`, `tests/src/core/Spinner.test.ts`) names a fresh instance or a replacement idea, the construction or replacement-idea sense form's round 1 ruled permitted; the sites stay.
- `now` marking a moment in an execution order (`src/core/factories.ts`, `src/browser/factories.ts`, and the test comments and one case title the fix brief lists) is rewritten to name the moment; fix round 1 applied every site and the round-2 sweep reads only `Date.now`, `performance.now`, and literal test data.

## Structural claims

Claims 2, 4, 6, and 8 are not held by the checker. Claim 8's gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/console`, recorded in `units/followon/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (round 2 checker after fix round 1), the deciding run at landing read every gate exit 0 (landed as console `9d49336`).
