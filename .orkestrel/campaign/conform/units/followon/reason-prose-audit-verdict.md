# Audit verdict — unit reason-prose (2026-09-03)

Subject: the uncommitted follow-on in `/home/user/fleet/reason` on the landed tip `803e4f6` (brief `briefs/followon/reason-prose-brief.md`, audit briefs `briefs/followon/reason-prose-audit-brief.md` and `briefs/followon/reason-prose-r2-audit-brief.md`, report `units/followon/reason-prose-report.md` with its two `## Orchestrator correction` sections, evidence `/home/user/work/evidence/conform-reason.diff` and `conform-reason.status`). Writer: `builder` on Claude Sonnet; two one-line corrections by the Orchestrator.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/reason-prose-checker-luna.md`) | FAIL 5, 9 |
| 2 | checker | `checker` on GPT-5.6 Luna, a fourth concurrent bench lane (`units/followon/reason-prose-r2-checker-luna.md`) | FAIL 1 |
| 3 | checker | `checker` on GPT-5.6 Luna (`units/followon/reason-prose-r3-checker-luna.md`), the round-2 brief re-run | PASS |

The objective and subjective lanes did not run: the unit applies the `Default:` form, the substitution table, and the count rule to sites the conformance audit recorded outside its rows, so the round's judgment is mechanical and the checker is the lane that rules it. Every lane ran on GPT-5.6 Luna, the tedious-work ladder's second rung, because Grok 4.6 exhausts within minutes of a real lane today (session ledger).

## Rulings

- Round 1, claim 5: the changed Surface and method rows at `guides/reason.md:387` and `:552` are the brief's manager-tally row and the factories table's re-padding follows its `default:` cells; the claim's wording was wrong and the round-2 brief names the rows.
- Round 1, claim 9: the unit rewrote the `@param id` line at `tests/setup.ts:164` while recording every `tests/**` `@param` site as outside row 1; the Orchestrator reverted the line by `sed` at 18:19 UTC (an Orchestrator-owned one-line correction, recorded in the report).
- Round 2, claim 1: `src/core/factories.ts:775` carried `default \`1\`` inside a parenthetical, a form the row's `defaults to` sweep did not match; the Orchestrator rewrote it to the `Default:` form by `sed` at 18:33 UTC and swept the file empty (recorded in the report). The round-3 checker held every claim it holds.
- The `//` module comment at `src/core/factories.ts:519`, the `defaults to` sites in `tests/**`, and the fixed fixture length in `Transformer.test.ts` stay, as the brief permits.

## Structural claims

Claims 2, 4, 6, and 8 are not held by the checker. Claim 8's gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/reason`, recorded in `units/followon/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (round 3 checker after two Orchestrator corrections), the deciding run at landing read every gate exit 0 (landed as reason `ccd2baf`).
