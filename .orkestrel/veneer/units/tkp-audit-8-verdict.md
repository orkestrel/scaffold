# TOKEN-PROOFS audit round 8 — verdict

The Orchestrator's ruling on the check of TOKEN-PROOFS round 9 (`tkp-audit-8-claims.md`). One lane ran, `analyst` on
GPT-6 Astra (`tkp-audit-8-objective-verdict.md`, thread `01a0d76b-7eca-7dd1-a787-2b4457877d91`), because the round
checks the Orchestrator's own text and Astra wrote none of it.

**Verdict: FAIL 2; outside the claims: root-width-probe.** Round 10 applies two exact rewrites
(`token-proofs-brief-10.md`).

| Claim | Astra | Ruling |
| --- | --- | --- |
| 1 The Items | CONFIRMED | CONFIRMED |
| 2 The rewrites are true | BROKEN | BROKEN |
| 3 Gates | CONFIRMED | CONFIRMED |

- **Claim 2.** The border rewrite holds under every placement the lane attacked. Two of the Orchestrator's rewrites do
  not:
  - The stripe comment says a reading on an island "cannot tell where its value was declared". With an override on an
    ancestor, the island reads `5%` because it declares the stripe, and it would read the override without that
    declaration. The sentence holds only for the case's own readings, which set no override.
  - The `theme` paragraph says "an island inherits each one from its parent … unless an ancestor below the root
    overrides the name". An override on the island itself also moves the value.
- **root-width-probe (outside the claims).** The round-9 probe's root-token reading read an element whose ancestor sets
  the `--bs-border-width` alias, so it read `4px` with or without the root override. The finding invalidates that one
  reading, not the border rewrite.
- **The Orchestrator's reading.** `tkp-instruments/r10/tkp-10-reach-probe.mjs` asserts every reading in Chromium 141
  over the worktree's built cascade (`tkp-10-reach-probe.log.txt`, 2026-09-25 07:22 UTC, exit 0): a `.border` with no
  overriding ancestor reads `1px`, then `4px` after the token is set on the root; the token set on a plain element or
  on a `[data-bs-theme]` element below the root leaves a `.border` inside it at `1px` until the root override, when it
  reads `4px`; the alias set below the root draws `4px`; a light island nested in a dark one reads the root's radius
  with no override, and `20px` when the dark ancestor or the island itself sets `--bs-border-radius: 20px`; the stripe
  reads `5%` on the root, on a dark island, and on a light island under an ancestor that sets `17%`. The same probe
  with the root assignment deleted fails `bareAfterRoot` and `tokenScopeAfterRoot`
  (`tkp-10-reach-probe-plant.log.txt`, exit 1).
