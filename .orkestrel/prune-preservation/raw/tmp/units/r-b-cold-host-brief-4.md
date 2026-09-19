# Unit r-b-cold-host — bind journey cache evidence to project configuration

## Role and engine

Act as native builder on Terra.

## Objective

Author a successor cold journey instrument that applies the cache override to each actual appJourney result and proves the resolved cache is the requested absent path.

## Context

**Evidence.** Parent ran tmp/probe/run-r-b-cold-host.ps1. App browser exited0 with164passed/61.06s and created its requested node_modules/.vite-r-b-cold-host-app-* tree. Every journey variant exited0, but all requested journey cache paths remained absent. Existing journey-cold.config.ts merges cacheDir at the root only. Actual configs/app/vite.journey.config.ts has `projects: VARIANTS.map((variant) => () => appJourney(variant, VARIANTS))`. Generated appJourney takes variant/variants without override, returns an appBrowser-derived UserConfig.

**Law.** Read canonical AGENTS.md, orchestration, applicable typescript/names/architecture/tests/workspace/portability/quality/writing rules; prove-journey skill and required references; recovery guides/README.md. Preserve types-first/no assertions/no any/no new dependencies/no source fakes. Follow deviation protocol.

**Installed primitives.** Read installed vite/vitest config declarations and actual generated appJourney. Use mergeConfig directly. Read @orkestrel/test core JourneyVariant and contract guards if needed; duplicate matching helper/guard/wait logic is a defect.

**Host.** Windows PowerShell, canonical Scaffold root. Unrestricted files; no network or approvals needed.

**Measurements.** First run logs: tmp/units/r-b-cold-host-parent.log.txt and recovery tmp/units/r-b-cold-host/*-6fd3e1d6b4384dd6a5123b43c0fb3fba.log.txt. Do not call the prior journey runs cold. Parent owns runtime replay.

**Control identifiers.** active-cache, outer-only-control. Test titles remain behavioral.

**Standing conditions.** Frozen dirty source is under audit. Parent may run source controls serially. Author instruments only and do not execute suites. Existing scripts/reports/logs remain unchanged.

## Unknowns

Report exact type/config shape obstruction; do not substitute duplicated hardcoded variants or silent default-cache reuse.

## Scope

**Owned.** New tmp/probe/run-r-b-cold-host-2.ps1; recovery tmp/probe/r-b-final-host/journey-cold-2.config.ts and minimal centralized scratch helpers if needed; tmp/units/r-b-cold-host-report-4.md.

**Shared (report-only).** Actual journey wrapper, generated vite.config.ts and node_modules declarations.

**Off-limits.** Source/tests/config wrapper edits, predecessor instrument edits, installs, commits, publication, deletion, execution of tests and delegation. You are not alone; preserve edits.

**What asserts the state this change ends.** Prior parent log marked only requested paths absent, not resolved use. Preserve that historical output. Successor runner must fail without a resolved project cache receipt and actual produced cache content.

**Tools and limits.** Author owned instruments, syntax/type validation only. Parent executes after reviewing. Use no new packages.

## Execution

Perform directly; spawn nothing.

## Output

Return exact implementation and control commands, parser/type validation, and any unresolved active-cache evidence. Write the report.

## Deviation contract

Stop if the actual wrapper shape differs from the quoted source. Resolve temporary helper placement and framework config typing within ownership; record the choice.

## Acceptance criteria

- Compose the actual wrapper's project callbacks with a project-level cache override, preserving actual variants/provide/browser settings. A temporary derived copy of the actual wrapper is acceptable if exact bounded replacements/import rebasing are checked; do not invent a second variant inventory.
- Add a configResolved instrument to the generated project that compares resolved cacheDir to the requested absolute path, throws with expected/actual on mismatch, and prints a unique marker on equality. Keep any framework-required signature exception explicit.
- Provide a negative-control mode that omits only the project-level cacheDir while leaving the observer; root should get the named expected/actual cache refusal before test startup. Preserve all source.
- Runner creates unique absent guarded node_modules cache paths, runs that negative control on one named journey project, requires the refusal, then runs the same project unmodified green and each remaining actual variant green. Record command/exit/resolved-marker/cache-contents. Fail if no active cache directory with files exists after the positive. Do not repeat already valid app-browser proof.
- Restore environment in finally, preserve CAPTURE, avoid native stderr-as-PowerShell failure, inspect actual LASTEXITCODE, preserve every log and old instrument. No deletion or moving.
- PowerShell parser and scoped temporary-config TypeScript check pass. Do not execute runtime controls.

**Observations, not criteria.** Parent owns actual cache and browser results; no green claimed from authored script alone.

## Review evidence

Supply actual generated config, source-wrapper preservation/hash strategy, syntax/type outputs and exact root execution command.

## Successor correction before runtime

Parent read the authored config: cacheDir comparisons use raw strings although Vite normalizes path separators; source wrapper variant definitions are copied without an exact source guard; helper functions are unexported and callback method is nested under createCacheObserver. Before execution, use node:path resolve to compare normalized absolute paths and write active expected path marker matching the runner. Guard exact source wrapper SHA256 before each runner launch against the current measured wrapper, and record the copied variant block as an exact matched snapshot of that wrapper. This is a retained derived instrument, not a second source of variants. Use exported module-scope helpers or the approved centralized scratch files; a framework callback passed directly as an argument is allowed, but avoid a hidden nested method in a factory. Validate file arrays as arrays even when empty or scalar. Test the path comparator synchronously with Windows forward/backslash versions as equal and a different directory as refused, without a browser run. Test marker recognition against wrapped diagnostics or emit a short unique stdout refusal marker plus actual expected/actual path evidence before throwing. Preserve preceding reports. Parent will run runtime proof after source controls close.

## Runtime correction: Vitest owns a cache descendant

Parent ran the successor. The negative outer-only mode refused as designed. The active project then resolved its cache below the requested root at vitest/3e6b3a059dd240fffb50a08a91fc07695db57ae2 and was refused by exact equality. This is a legitimate Vitest-generated descendant, not default-cache reuse. Preserve tmp/units/r-b-cold-host-parent-2.log.txt. The invariant now requires normalized actual cache equal to or contained under the requested unique absent root. Compare node:path relative(expected, actual), accepting empty or a relative path that neither equals dot-dot nor begins dot-dot plus separator; reject absolute relative results (different volume) and prefix siblings. Do not use string-prefix containment. Remove a pure rename wrapper around resolve if present; use native resolve directly. Observer records expected root and actual resolved child; active marker still names requested root so runner verifies it, with actual path separately recorded. Keep physical files under requested root required. Synchronous controls cover equal/slash variation, nested vitest cache accepted, sibling/prefix-sibling/parent/different-volume refused. Parent owns runtime. Change only owned instrument paths, preserve prior reports.
