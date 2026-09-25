# TOKEN-PROOFS audit round 7 — verdict

The Orchestrator's ruling on the check of TOKEN-PROOFS round 8 (`tkp-audit-7-claims.md`). One lane ran, `analyst` on
GPT-6 Astra (`tkp-audit-7-objective-verdict.md`, thread `01a0d752-eb24-7bc2-a7f7-3a4fcdc58e91`), because the round
checks the Orchestrator's own text and Astra wrote none of it. No subjective lane ran: the round rules Items the
Orchestrator wrote and a truth sweep, and neither asks a design question.

**Verdict: FAIL 2; outside the claims: none.** Round 9 applies the three rewrites this verdict rules
(`token-proofs-brief-9.md`).

| Claim | Astra | Ruling |
| --- | --- | --- |
| 1 The Items | CONFIRMED | CONFIRMED |
| 2 Every stop and every repeated declaration is stated truly | BROKEN | BROKEN |
| 3 Gates | CONFIRMED | CONFIRMED |

- **Claim 2.** The sweep read every sentence of the class in `guides/veneer.md` and `tests/src/styles/tokens.test.ts`.
  The round's own text and the § Customization mechanism held under every placement the lane attacked. Three older
  sentences, none in this unit's diff, are false:
  - The stripe case's comment in `tokens.test.ts` (the case "resolves the stripe percentage to the retained Bootstrap
    tint in each mode") says a mode island inherits the `:root` value. Each mode scope declares the stripe again.
  - The `theme` key paragraph in § Tokens › § Departures says a light island inherits each dropped name from the `:root` selector
    "through every island around it", so a nested light island reads the document value. An override on an ancestor
    below the root reaches the island.
  - The § Styles › § Border utilities paragraph says "a retuned width token widens every default border". The `--bs-border-width`
    alias is declared at the `:root` selector alone, so the token retuned below the root moves no border.
- **The Orchestrator's reading.** `tkp-instruments/r9/tkp-9-reach-probe.mjs` runs each case in Chromium 141 over the
  worktree's built cascade (`tkp-9-reach-probe.log.txt`, 2026-09-25 about 07:07 UTC): the token set below the root
  leaves `.border` at `1px`, the alias set below the root draws `4px`, and the token set on the root draws `4px`; a
  light island inside a dark ancestor that sets `--bs-border-radius: 20px` reads `20px`, while the root reads
  `calc(.375rem * 1)`; the root's stripe set to `17%` leaves an island at `5%`. The built cascade declares
  `--vn-state-stripe` in the `:root`, light, and dark scopes, and `--bs-border-width` and `--bs-border-radius` once.
- **Carrier.** The three sentences are this unit's capability, where an override reaches, so round 9 carries them. The
  round-7 sweep covered both files whole, so its findings close the class there. The round-9 check rules the Items
  and does not repeat the sweep.
