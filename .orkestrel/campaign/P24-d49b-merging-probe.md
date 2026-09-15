# P24 — the collision key across declaration merging, with distinct-file and distinct-owner controls

Orchestrator probe, 2026-09-15 ~17:50Z, on the 0.0.69 release tree after D4-9b (the Astra vector
of AD4-9b claim 7). Instrument `P24-d49b-merging.test.ts.txt` (run under `tmp/probe/` through the
`probe` project, removed after the reading); log `P24.log.txt`. Each case plants a hosted guide per
owner claiming `waitForCondition` and the named setup files, runs `inspectPolicyWorkspace`, and
lists every `surface name belongs to one package: waitForCondition` violation as `path:line (owner)`.

| Case | Violations read |
| --- | --- |
| interface merging, one file, one owner (`export interface waitForCondition` twice) | `tests/setupServer.ts:1 (other)` |
| function + namespace merging, one file, one owner | `tests/setupServer.ts:1 (other)` |
| overload of three signatures, one file, one owner | `tests/setupServer.ts:1 (other)` |
| control: distinct files, one owner | `tests/setupBrowser.ts:1 (other)`, `tests/setupServer.ts:1 (other)` |
| control: one file, distinct owners | `tests/setupServer.ts:1 (other)`, `tests/setupServer.ts:1 (third)` |

So D4-9b's key (`path`, `name`, `owner`) reports one violation per name per file per owner for
every merged form, at the first declaration's line, and still one per file and one per owner where
those differ. The merging element of AD4-9b claim 7 closes on this reading.
