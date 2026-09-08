P1 — CONFIRMED. `createHeavyDraft` has only the call sites at `Probe.test.ts:785` and `:987,991`. The first case uses `configs/src/tsconfig.core.json` and is asserted to expire at the type stage before lint (`:787-809`). The serialization case creates a scratch workspace and project configs (`:839-851`, `:960-991`), so the custom workspace lint policy is absent. Corrected receipt candidates use `helpers.ts` (`:797-829`, `:997-1015`). The host run executed the named cases: `tmp/pass/d7n-probe-heavy-host.log.txt:1-16`.

P2 — CONFIRMED. The heavy fixture remains unchanged at `Probe.test.ts:43-59`, preserving its generated workload and deadline assertions. No successful real-workspace receipt candidate still uses it; the recovery candidate uses `src/core/after-type-expiry/helpers.ts` (`:797-829`). The landing ruling explicitly records this scope clarification in `.orkestrel/campaign/docs-parity/d7n-probe-tests-landing-verdict.md`.

P3 — CONFIRMED. The host receipt reports `Test Files 1 passed` and `Tests 2 passed | 24 skipped`, with the selection filter naming the two requested cases (`tmp/pass/d7n-probe-heavy-host.log.txt:1-16`). The previously missing format and lint evidence was independently run and retained in `.orkestrel/campaign/docs-parity/d7n-probe-tests-landing-verdict.md`.

No source defect or out-of-scope finding. Full package closure remains pending.

VERDICT: PASS
