# J-ISINSTANCE audit — the Orchestrator's reconciled verdict and the unit's acceptance (2026-09-24)

Subject: the J-ISINSTANCE unit on Veneer `main` at `e24e2c3` (the unit's edits uncommitted at the reading), brief `j-isinstance-brief.md`, report `j-isinstance-report.md`, diff `j-isinstance.diff` (150 lines over `src/browser/Button.ts`, `Collapse.ts`, `Delegate.ts`, `parsers.ts`, `validators.ts`), status `j-isinstance-status.txt`. Lanes that ran: the checker on Sonnet (`j-isinstance-audit-checker-verdict.md`: items 1 to 7 met with evidence; item 8 `UNRESOLVED` on artifacts written in the same action as its launch, met on the retained report and status) and the Orchestrator's gate run on `main` (`j-isinstance-gates.log.txt`: `check:src:browser`, oxlint, `format:check`, `lint:check`, the tree-wide `check`, `build`, `test:app` 117 of 117, `test:guides` 19 of 19, `test:policy` 109 and 1 skipped, `test:conformance` 22 of 22, `test:setup` 267 of 267 all exit 0; `test:src` exit 1 on the two standing host rows alone, the accordion and navbar `background-size` proofs of `host-chromium-153-reading.md`, with 1074 of 1076 passing). The adversarial lanes were **not run**: the unit is a fully specified mechanical swap with no design load, as its brief and the routing ledger fix.

## Rulings

- The nine invoked sites read `isInstance(x, HTMLElement)`; the four predicate-passed `instanceOf(HTMLElement)` sites stay; every import is used; the two event guards' class half reads `isInstance(value, CustomEvent)`, whose `detail` the checkout's TypeScript narrows to `unknown` (the builder's throwaway probe, its error naming `unknown`); the `isButtonEvent` remark states the routing as it is. CONFIRMED by the checker and the gates.
- The brief's site list was measured before the collapse landing and named two `Delegate.ts` sites where the landed tree has four; the unit re-measured as the brief instructed and swapped all four, a guard-detail difference inside the owned file, correctly not a stop.

## Acceptance

J-ISINSTANCE is accepted and lands on `main` as its own commit with `j-isinstance-landing-message.txt`; the push follows, the chain read green except the standing rows (E5). The W2 briefs already instruct the invoked `isInstance` form, so no W2 unit adds a site the swap must revisit.

VERDICT: FAIL none; outside the claims: none
