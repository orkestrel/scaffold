# A10 review verdict — Opus reviewer on b6737f7..4f67735, fix at 182408f

REVIEW: FAIL 3,4 — claims 1, 2, 5 CONFIRMED (grouped policy lawful; url the sanctioned
acronym and the provider's own option; parseApplicationURL airtight incl. the
trimmed-not-href ruling preserving the operator's base string; diff hygiene clean).

Refuted and fixed at 182408f, each on the reviewer's own prescription:

- R3 (claim 3): keep_alive '5m' was simultaneously the policy default and the provider
  default, so the wire assertion could not bind the keep→keepAlive translation. Now 30m,
  and the mutation probe binds it: pass-through removed → wire carried 5m → assertion
  failed; restored → passes.
- R1/R2 (claim 4): README.md documented dead APP_MODEL and denied the endpoint capability
  (outside parity scope, which is why gates stayed green); guide's timeout row leaked the
  internal campaign label 'A8'. Both corrected.
- R4: one word for one concept — local variable and parity row say url.
- R5: the executed parser roster fence gains parseApplicationURL + its import.
- Voice (S2/S4/S5/S6): calibration remarks re-voiced (no date, no jargon); keep's return
  doc stops asserting an unenforced provider coupling; guide paragraph re-wrapped; test
  spacing fixed. S1 confirmed url as the right word. S3 (keep grammar deferred to the
  provider) and S7 (live-stream-based proof instead of raised APP_LIMIT) recorded, not
  acted — S7 travels to the settlement-card/proof capability for a later change.
- Referrals: oversize URL refusal case added; 'url' in defaults.agent === false pins
  genuine absence; the proof's cap raised to 20s for loaded suites; the calibration
  provenance sentence resolved by S2's wording (the >120s figure is E1's real-server
  four-lane observation).

Final: app:core 117/117, app:server 218/218, parity 374/374, tree-wide format clean,
check green. A10 chain: 4f67735 (unit + integration) → 182408f (fix round).
A10 ACCEPTED. Exit item 9's capability (deadline covers cold load) closed with the
measured default; ALL implementation units A1-A10 complete.
