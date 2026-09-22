# F5b ACCOUNTING-LEDGER — checker lane verdict (`checker` on Sonnet, 2026-09-22)

Lane: mechanical. Worktree `/home/user/veneer-f5b` (`07fc3c3` plus the unit's writes and two grants).

- Claim 6 CONFIRMED: `grep -i rtl tests/setupServer.ts` hits only `partly` (`:1588`); `tests/setupServer.test.ts` and `tests/conformance.test.ts` carry no hit; `"rtl"` absent from `inventory.json`; the `bootstrap.rtl.css` digest entry stays at `inventory.json:5`; no `tmp/probe/` file; the digests were not recomputed (the claim requires the report to state them, which it does).
- Claim 8 CONFIRMED: `_body.scss:10` reads `text-align: var(--bs-body-text-align);`; the only other `src/styles/**` hunks are the two `_button.scss` files the evidence index discloses as the grant.
- Claim 9 UNRESOLVED (partial): `No reader parses` absent; `### Departures` names `readDepartures` and its gate (`f5b.diff:91-98`), `### Additions` names `readAdditions` (`:1114-1115`); `test:guides` unproved because the gate log had no exit line yet.
- Claim 10 UNRESOLVED: the gate log held only the `format:check` header at read time.
- Claim 11 BROKEN as written: the status lists ten files where the claim enumerates seven; the three others (`src/styles/components/_button.scss`, `src/styles/elements/_button.scss`, `tests/setupStyles.test.ts`) are the disclosed grant and the disclosed scope-note deviation; nothing outside those; a claims-text correction at landing.
- Claim 12 CONFIRMED (bounded): no banned term over the diff; numerals in the sampled added lines are CSS values, not counts.
- Outside the claims: a bounded sample of the `### Additions` `reason` cells found none contradicting its partial; a full sweep of the 125 rows was not completed and stays open for the reconciling lane.

VERDICT: FAIL 10, 11; outside the claims: none
