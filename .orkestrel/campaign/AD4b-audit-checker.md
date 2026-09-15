<!-- AD4b — checker (Sonnet, native), mechanical lane over AD4b-diff.patch.txt, the fix-round reports, and the V4 verifier report, with the AD4 walk. Retained from the completion notification, 2026-09-15 (202 s, 52 tool uses). -->

# MECHANICAL lane (checker, Sonnet), audit AD4b

1. CONFIRMED — `readPolicyDeclarations` handles namespace, multi-declarator `const`/`let`, enum, class, interface, type, function, export lists, and star barrels: pin cases at `tests/setupPolicy.ts:69-74` (`POLICY_SURFACE_EXPORT_CASES`); D4-5's report shows 14 pins red→green.
2. CONFIRMED — `HostStageOptions.establish` gate at `src/server/helpers.ts:1643-1649`; growth refused / shrink accepted at `:1699-1713`; digest covers `surface` at `:1714-1719`. `guides/scaffold.md:1524-1534` states `npm run build` passes neither option and "review reads a widened or re-established baseline as a diff of that file".
3. CONFIRMED — `options?.report?.(message)` at `src/server/helpers.ts:1656`; `build:host` passes `{report: (message) => console.error(message)}`; V4's build log carries the baseline line.
4. CONFIRMED — `readSurfaceBaseline(root, name = HOST_INVENTORY_PATH)` at `:1821-1823`; `INVENTORY_NAME` absent; `readSurfaceCollisions` throws `ScaffoldError('TARGET', 'Surface reflection requires the module @orkestrel/guide', …)` at `:1776-1780` with the prerequisite in `@remarks`; `SEED_GUIDE_PATHS` at `src/core/constants.ts:217`, consumed at `src/core/compilers.ts:1608`; `CatalogResult.membership` at `src/bin/types.ts:297`; `Question.field: 'guides'` at `src/server/Materializer.ts:692-693`; `createPolicyScratch` the sole scratch mechanism; `POLICY_SURFACE_BARREL_PATTERN` at `:83`; the capture family in one verb.
5. CONFIRMED — `names.md:137` states the shrink-only invariant; the identity definition (with case) at `names.md:126` alone; `workspace.md:267-280` keeps the narrowed line, the evidence-location bullet, and the general closure sentence; `tests.md:171-223` moved the directive into § Shared test infrastructure; `guides/README.md:34-58` fixed; the reflector claim at `guides/scaffold.md:1508-1522` matches D4-5; the policy setup table is `###` with a selection-rule lede (`:1114-1118`); `test:guides` 23 passed.
6. CONFIRMED — ledger row `K-catalog-live` matches the brief; the floor path matches V4's recorded `audit` reading.
7. CONFIRMED — no re-implementation found; `@orkestrel/guide` pinned to `^0.0.19`.
8. UNRESOLVED — `host.json` is build-owned-only per V4's status. But `guides/supervisor.md` remains untracked and the ledger records no landing-commit row naming it in a pathspec — the same open item AD4's claim 11 raised.
9. BROKEN — every other FAIL and F1–F10 from AD4 closes with a named `file:line` or ruling; the one exception is claim 11 (`guides/supervisor.md`), still open per claim 8.
10. NOT-EVIDENCED as stated; what must change first: scaffold's landing commit must add `guides/supervisor.md` to its explicit pathspec and re-run `npm run build` to confirm `host.json` is unchanged; the fleet-target `surface` exposure is a process ruling for the Orchestrator.

outside: none beyond the carried-forward `guides/supervisor.md` landing gap.

VERDICT: FAIL 8 9 10

<!-- Orchestrator: `guides/supervisor.md` staged (`git add`, reads `A`) on 2026-09-15 after this verdict; the landing pathspec is recorded in the ledger row `K-landing-pathspec` and the commit follows the AD4b analyst and reviewer verdicts. -->
