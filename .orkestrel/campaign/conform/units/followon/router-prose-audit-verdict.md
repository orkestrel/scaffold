# Audit verdict: unit router-prose

Subject: the follow-on unit in `/home/user/fleet/router` on the landed tip `8c78fd9` (brief `briefs/followon/router-prose-brief.md`, report `units/followon/router-prose-report.md`, result `units/followon/router-prose-result.md`), a `builder` on Claude Sonnet: the `U1`, `U3`, and `U6` unit citations in `src/core/types.ts`, `src/core/constants.ts`, and `tests/src/core/Dispatcher.test.ts` read the facts they stood on, and the tally at `tests/guides.test.ts:38` names the core, browser, and server faces.

## Lanes

No lane ran. The unit changes doc and comment lines in four files, and the Orchestrator read the diff (`git -C /home/user/fleet/router diff`: prose hunks only, no statement changed) against the brief's rows and `.claude/rules/writing.md` § Claims and time. Dispatching a checker for citation rewrites spends a lane on what one read settles; `.agents/orchestration.md` § Orchestrator and executor names a one-line fix as direct work. The deviation from the audit step — no checker, no objective lane — is recorded here with that reason.

## Rulings

- The `u1` fixture literals (`{ userId: 'u1' }`) the unit-citation sweep returned are data, permitted.
- The two tally senses the number-word sweep found outside the Owned files — `tests/src/core/parsers.test.ts:11` ("every one of the seven registrable methods") and `tests/src/core/Router.test.ts:462` ("across the three files") — are a next-matrix prose row for router (`ledgers/followons.md`), outside this unit's fixed scope.
- The brief's standing condition named the `configs/browsers.ts` baseline drift, which router's landing had already repaired; the audit's zero-drift line is the tree's state and the unit's deviation note records the mismatch.

## Structural claims

The gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/router`, recorded in `units/land-followon.log`, and the landing commit named in the state table.

## Terminal

PASS (Orchestrator's read of the prose-only diff), pending the deciding run at landing.
