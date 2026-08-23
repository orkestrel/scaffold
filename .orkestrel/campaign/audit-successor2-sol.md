## Numbered verdicts

Re-attacked originals: 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, and 16.

1. **CONFIRMED** — The moved proof still derives `browser` from the resolved import target at `src/core/templates.ts:1396-1402`. No subpath-name rule selects the browser branch.

2. **BROKEN** — A package exporting `{"./feature":["./feature"]}` without a declaration passes the generated partition while Node loads the extensionless CommonJS target. `collectTargets` rejects arrays and returns no files at `src/core/templates.ts:1258-1262`; `isModule` recognizes only `.js`, `.mjs`, and `.cjs` at `src/core/templates.ts:1268-1270`. The subpath enters `excluded`, `undeclared` remains empty, and no target existence assertion reaches it. The probe drove `require('runtime-package/feature')` successfully and proved an absent subpath throws as its control. Recurse through export arrays and classify extensionless runtime targets as modules.

3. **CONFIRMED** — The fix round did not change presence ownership. A present replacement remains aligned, while an absent distribution proof remains missing.

4. **CONFIRMED** — The refusal loop rules on every named script before edits at `src/core/compilers.ts:1762-1769`. Empty insertion changes only the scripts-object interior, and the existing reverse-ordered edit application preserves exterior bytes. The probe confirmed that tab-indented, space-indented, inline, and split-brace regions compose through insertion and append; reversing script order changed the result as the control.

5. **BROKEN** — The original claim says every workspace carrying a setup proof is silent. The repaired predicate deliberately removed that rule. A workspace carrying `tests/setup.test.ts` and an uncovered filled `tests/setupServer.ts` reports the server module at `src/bin/CLI.ts:1314-1327`. Amend the claim to require silence only when a proof of the same stem covers each filled module.

6. **CONFIRMED** — `blueprintToTestArtifacts` still emits one presence-owned distribution proof when `blueprint.src` is nonempty and none otherwise. The added browser guard changes the publishing variant’s content without adding another artifact.

7. **CONFIRMED** — The supplied current-tip evidence establishes `prepublishOnly` and its distribution install path at `07f9a96`. This sandbox cannot repeat the registry install, but the fix round’s direct independent run is retained evidence rather than a writer report.

8. **CONFIRMED** — The repaired proof adds bucket names and fixed runtime suffixes, but emits no package name, export name, or moving surface tally. Package names and subpaths still come from the installed manifest.

9. **BROKEN** — The guide says an untyped subpath is excluded only when it names no runtime target at `guides/scaffold.md:1453-1458`. The array-wrapped extensionless target from claim 2 is runtime-loadable but enters `excluded`. Extend the classifier or state the narrower suffix-based boundary and its unsupported runtime shapes.

10. **CONFIRMED** — The fix adds name-set partition equality, not a moving cardinality. The earlier ruling on the archive singleton and nonempty-entry floor still holds.

11. **BROKEN** — The campaign record already supplies a derivable structural assertion: every root setup module must be named by root configuration or imported by a non-setup module. It measured green across the available fleet and can redden when configuration leaves a setup module unreachable. The narrowed guide correctly distinguishes this structural property from setup behavior, but the original claim’s unrestricted assertion challenge remains false. Narrow the claim to behavioral assertions about helpers.

12. **CONFIRMED** — The current chain moves vendored bytes in `.agents/orchestration.md`, `guides/scaffold.md`, and `tests/config.test.ts`; `host.json` moves with their digests. The vendored-byte release ruling still holds.

13. **CONFIRMED** — `package.json` and `package-lock.json` contain no dependency change. The only `typescript` import under `src/` remains generated template text at `src/core/templates.ts:1130`. `host.json` records the moved vendored members.

14. **BROKEN** — The assertion still detects silence, not arbitrary narrowing. An extractor retaining one claim-shaped body per declaration leaves `printing` equal to `DECLARATIONS.map(...)` while dropping the remaining bodies. The corrected comment admits this at `tests/distribution.test.ts:467-472`, but the original claim still says the assertion detects narrowing. Amend the claim to “goes silent,” or add an independently derived per-declaration membership instrument.

15. **CONFIRMED** — `fenced` is still captured before injected controls at `tests/distribution.test.ts:314`, and only ordinals below it increment `printed` at `tests/distribution.test.ts:332`. Control-only narrowing cannot mask a silent declaration.

16. **CONFIRMED** — The replacement avoids repricing on added examples and detects equal-size redistribution that a tally misses. The unit report explicitly records that partial loss can leave a declaration present, so the coverage it gives up is named.

17. **CONFIRMED** — The successor brief directly establishes that `prepublishOnly` and every contained gate exited successfully at `07f9a96`. The brief forbids re-running that established evidence.

18. **BROKEN** — The predicate compares trimmed text, not bytes. With `tests/setupGlobal.ts` containing its exact seed plus a trailing space and newline, the probe reported no setup question. Appending `export const marker = true` made the same path report one, proving the predicate was reached. Exact reversion to seed is also indistinguishable from untouched seed, while an older nonempty seed can differ from the current blueprint’s seed without maintainer authorship. Compare exact text rather than `trim()` and narrow the claim to current-byte equality; provenance across reversion or seed-version changes requires recorded seed identity.

19. **BROKEN** — The array-wrapped extensionless export from claim 2 is a published runtime surface that escapes `isModule`. Node loaded it through the package export, while the generated proof collects no target and classifies the subpath as excluded. Recurse through valid export arrays and admit extensionless runtime modules.

20. **CONFIRMED** — A core-only variant emits the guard and omits the browser launcher, bundler imports, and `configs/browsers.ts`. The supplied real-workspace checks establish that unconditional emission fails resolution because the core-only manifest declares none of those browser dependencies.

21. **UNRESOLVED** — The decisive test requires a grandchild npm process, which this sandbox denies. Source inspection cannot decide whether the unit’s empty streams came from a deterministic resolver case or a resource-level spawn failure. Run the exact peer-resolution test on a host permitting grandchildren, recording `status`, `signal`, `error`, `stdout`, and `stderr` under an idle run and controlled contention.

22. **BROKEN** — Vitest calls each project function with `{command, mode, isPreview, isSsrBuild}`. The generated `appBrowser(options?: UserConfig)` merges that `ConfigEnv` into the returned project at `src/core/templates.ts:288-290`. The probe loaded the real generated configuration and showed that the no-argument result lacks those keys while Vitest’s call adds them. Accept a `ConfigEnv` parameter and ignore it, returning `applicationBrowser(false)` unchanged.

23. **CONFIRMED** — The probe inserted `alpha` into empty tab-indented, space-indented, inline, and split-brace regions, then appended `beta` through the existing path. Every result matched inserting `alpha` and `beta` together. Reversing the combined order differed as the control.

24. **CONFIRMED** — The probe gave `#projectQuestion` the accepted predecessor with the distribution script absent; projection produced no projects advisory. A customized predecessor caused region refusal and retained the advisory. The projection is correct in the silent and firing directions attacked.

25. **BROKEN** — The guide states that the setup question fires when module bytes differ from the planned seed at `guides/scaffold.md:625-627`. The trailing-whitespace probe supplied differing bytes with no matching proof, but no question fired because implementation trims each side. State that comparison is over trimmed text or compare exact bytes.

## Findings fitting no claim

None.

VERDICT: FAIL — 9 broken, 1 unresolved, 0 not-evidenced, 0 findings outside the claims