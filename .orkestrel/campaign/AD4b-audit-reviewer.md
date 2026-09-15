<!-- AD4b — reviewer (Opus 5, native), subjective lane over AD4b-diff.patch.txt, the fix-round reports, and the tree. Retained from the completion notification, 2026-09-15 (535 s, 57 tool uses). -->

I hold the **SUBJECTIVE** lane for audit AD4b. I am read-only, so every behavioural falsification is referred rather than ruled.

## Per-claim verdicts

**1. CONFIRMED on the parts my lane judges.** `readPolicyDeclarations` (`tests/setupPolicy.ts:1678-1775`) reads each declarator of a multi-declarator `export const` (`:1739-1749`), `TSModuleDeclaration` beside function, class, interface, type alias, and enum (`:1751-1763`), export and re-export lists (`:1725-1736`), the namespace re-export alias (`:1691-1702`), and the relative star target (`:1703-1722`), and throws on every other form; each throw becomes one `surface` violation with a single vocabulary — `surface population incomplete: …` (`:1851-1861`, `:1947-1958`); `readPolicySurface` reports an unread barrel statement (`:1811-1843`). Executing the analyst's AD4 pins is referred.

**2. CONFIRMED on the design and the prose.** `HostStageOptions` groups `inventory`, `establish`, and `report` (`src/server/types.ts:98-111`); `stageHost` refuses an absent inventory unless `establish` (`src/server/helpers.ts:1642-1649`); the digest covers `surface` (`:1714-1719`). R4 as now stated (`.claude/rules/names.md:137`) is what `:1700-1713` enforces; the route to a wider baseline is named (`guides/scaffold.md:1530-1534`), and `npm run build` passes neither route (`package.json:90-91`).

**3. CONFIRMED.** `options?.report?.(message)` (`:1656`); `build:host` passes the sink; `build:inventory` passes none; the build log still reads the baseline line. F5 closed.

**4. CONFIRMED.** `readSurfaceBaseline(root, name = HOST_INVENTORY_PATH)` (`:1821-1826`); `INVENTORY_NAME` gone; `readSurfaceCollisions` names the prerequisite and refuses as `ScaffoldError('TARGET', …)` (`:1751-1758`, `:1776-1781`); `SEED_GUIDE_PATHS` (`src/core/constants.ts:217`, consumed at `src/core/compilers.ts:1608`); `CatalogResult.membership` one optional entity (`src/bin/types.ts:296-305`, guards at `src/bin/CLI.ts:469`, `:1425`); `field: 'guides'` with the path in the message (`src/server/Materializer.ts:692-693`); `createPolicySurfaceFixture` on `createPolicyScratch` (`tests/setupPolicy.ts:126`, `:2012`); `POLICY_SURFACE_BARREL_PATTERN` (`:83`); the `capture*` family in one verb. F1–F4, F6–F9 closed; AD4 claim 6 closed.

**5. BROKEN on one sentence; every other item confirmed.** Confirmed: the identity definition (with case) at `names.md:126` alone with `workspace.md:267-271` pointing at it; the grandfather paragraph at `names.md:130`; `workspace.md:276`; the `tests.md` fold (`:175`, `:225-233`); README `:51-58`, `:35-36`; the reflector claim (`guides/scaffold.md:1098-1108`); the policy setup table (`:1114-1134`); parity green.
- **Required — `guides/scaffold.md:1524`.** "`npm run build` is the release path, and it passes neither option." reads against the preceding paragraph's three options. Right: "…passes neither `HostStageOptions.inventory` nor `HostStageOptions.establish`."

**6. CONFIRMED.** `K-catalog-live.json.txt` reads live provenance with the declared guides skipped; `provenance.versions` is written only inside the resolved branch; the agent catalog and the `^0.0.19` re-pin are in the diff.

**7. BROKEN, one site.** `readSurfaceCollisions` routes through `@orkestrel/guide`; `stageHost`'s JSON comparison re-implements nothing; `createPolicyScratch` duplicates `@orkestrel/test/server`'s scratch by the express instruction of `.claude/rules/tests.md:177-179` (sanctioned).
- **Required — `tests/setupServer.ts:1104-1111`.** `captureScaffoldMessage` writes its own `try { call() } catch` while its sibling obtains the same value from the installed `captureError`. Right: `const error = captureError(call); return isScaffoldError(error) ? error.message : undefined`. `captureScaffoldRejection` keeps its `try`/`catch`. A test helper; it blocks no release.

**8. BROKEN on the supervisor half.** Confirmed: V4's build moved only `host.json`; every changed destination maps to a named unit.
- **Required — the landing record.** No ledger row or plan line named `guides/supervisor.md` in a landing pathspec at the time of reading; the file was untracked while committed `host.json` declares it. Right: a ledger row and a commit-plan line naming it explicitly, then a `npm run build` re-run confirming `host.json` unchanged.

**9. BROKEN on that one carrier.** Every other AD4 finding names a carrier that landed (claim 4 → `names.md:137` + `guides/scaffold.md:1512-1534`; claim 6 → U16; claim 8 → D4-7; F1–F10 → the sites under claim 4; the two Orchestrator rulings recorded).

**10. BROKEN. What must change first:** the untracked mirror's record and rebuild; the wave's order — `names.md:130` says clear a colliding setup export BEFORE adopting the scaffold release, while the brief's order adopts first (run each target's U14-* cleanup before its re-pin and `repair`, or amend the rule; pick one and land it with the release); the supervisor mirror's provenance — `guides/README.md:37` says mirrors are fetched from their repository's `main`, and `guides/supervisor.md` is a byte copy of a local checkout that has not pushed, so push the supervisor guide before the scaffold release or record the divergence.

## outside:

**G1 — `src/server/helpers.ts:1710` names the wrong condition.** The refusal reads `Staged Surface collisions exceed the inventory: …`, but the test at `:1702` is set inequality, and `host.json` carries names with three owners, so a guide that drops one owner produces a narrower collision and is told it exceeded the inventory. Right: `Staged Surface collisions differ from the inventory: ${name} staged (${owners}), recorded (${recorded ?? 'absent'})`. Whether a narrowing owner set ought to be accepted is behaviour — referred to the objective lane; the message is wrong under either answer.

**G2 — `tests/setupPolicy.ts:1851-1861` and `:1947-1958` are the same catch twice.** One exported helper — `collectPolicyDeclarations(root, path, text)` returning the declarations and the violation — called from both sites. Non-blocking.

**G3 — `guides/scaffold.md:1116` gives a rule an agency it does not have.** "The `surface` rule adds these exports…" Right: "These `tests/setupPolicy.ts` exports implement the `surface` rule: its declarations, its constants, its readers, and the fixtures its controls run against."

**G4 — `guides/README.md:60` keeps `repo` where the same file now writes `repository`.** One word: "in this repository".

**Observation, not a required change.** The `capture*` family's remaining asymmetry is my own AD4 prescription adopted verbatim; not reopening it.

VERDICT: FAIL 5 7 8 9 10

<!-- Orchestrator: 8/9 closed by the staged mirror and ledger row K-landing-pathspec (written after this lane read); 5, 7, G1–G4 and the analyst's namespace-default finding go to U17; 10's wave order is fixed in HANDOFF.md (cleanup before re-pin, per names.md:130); the supervisor push is an open item for landing (every checkout pushes at landing). G1's behavioural half: the Orchestrator rules a narrowed owner set is a shrink and U17 pins it. -->
