1. **Viable declaration mechanisms**

   **A. Workspace-owned JSON: `.orkestrel/policy.json` — recommended**

   Use the exact schema `{ "functions": ["app/browser/composables"] }`. The vendored `<workspace>/tests/setupPolicy.ts` should load it from the `root` passed to `inspectPolicyWorkspace(root)`: `root → join(root, '.orkestrel/policy.json') → readFileSync → JSON.parse → exact-shape validation`. This uses filesystem resolution, not TypeScript module resolution. The real policy proof already calls `inspectPolicyWorkspace(process.cwd())`, so it supplies the workspace root directly ([tests/policy.test.ts](/home/user/scaffold/tests/policy.test.ts:294), [dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:710)).

   Register `.orkestrel/policy.json` in `HOST_PATHS` and `WORKSPACE_OWNED_PATHS`. Ship an empty default. Add a manifest entry with storage `orkestrel/policy.json` and destination `.orkestrel/policy.json`. `HOST_PATHS` currently determines the host artifacts a plan receives, while `WORKSPACE_OWNED_PATHS` currently contains only `.gitignore` ([src/core/constants.ts](/home/user/scaffold/src/core/constants.ts:109), [src/core/constants.ts](/home/user/scaffold/src/core/constants.ts:157), [src/core/compilers.ts](/home/user/scaffold/src/core/compilers.ts:1361)).

   **B. Workspace-owned TypeScript module: `tests/setupPolicyConfig.ts`**

   Export the exact identifier `FUNCTIONS`, containing the readonly folder list. The vendored policy imports it as `./setupPolicyConfig.js`. From `<workspace>/tests/setupPolicy.ts`, that resolves to `<workspace>/tests/setupPolicyConfig.ts` through the same Vite/TypeScript ESM mapping already used when `tests/policy.test.ts` imports `./setupPolicy.js`; the manifest confirms that the physical destination is `tests/setupPolicy.ts` ([tests/policy.test.ts](/home/user/scaffold/tests/policy.test.ts:1), [dist/host/manifest.json](/home/user/scaffold/dist/host/manifest.json:489)).

   This file should also be a presence-owned `HOST_PATHS` member with an empty default. A missing module then fails during Vitest’s import loading. Invalid TypeScript fails during transformation. A missing or malformed `FUNCTIONS` export and nonexistent targets still require an explicit runtime validator.

   **C. Existing `package.json` with `orkestrel.functions`**

   Store the list under the exact field `orkestrel.functions`. The vendored policy reads `join(root, 'package.json')`, parses the JSON, and validates that nested field. The shipped configuration proof already reads and validates `package.json` this way, so no module-resolution assumption is involved ([tests/config.test.ts](/home/user/scaffold/tests/config.test.ts:360)).

   This is viable only with an explicit migration. Scaffold currently generates `package.json` through `blueprintToManifest`, but an existing workspace owns that file after creation ([src/core/compilers.ts](/home/user/scaffold/src/core/compilers.ts:418), [src/core/Compiler.ts](/home/user/scaffold/src/core/Compiler.ts:277)). The existing manifest writer updates only already-declared dependency ranges and deliberately leaves every other field alone ([src/server/Materializer.ts](/home/user/scaffold/src/server/Materializer.ts:353)).

   The vendored-host `dist/host/manifest.json` is not a fourth option. It is package-wide inventory with only `entries`, `roots`, and `digest`; `Materializer` reads it from scaffold’s installed host root rather than from the consumer workspace ([src/server/types.ts](/home/user/scaffold/src/server/types.ts:45), [src/server/Materializer.ts](/home/user/scaffold/src/server/Materializer.ts:142)). It therefore cannot carry per-workspace declarations.

2. **Guarantees, limits, compatibility, audit, and published surfaces**

   **A. `.orkestrel/policy.json`**

   - Guarantee: exact JSON validation can reject unknown keys, non-string entries, duplicates, absolute paths, traversal, paths outside `app` or `src`, and declared directories that do not exist. The loader should throw at the start of `inspectPolicyWorkspace(root)`, before its current source and mirror scans. No such hook exists today; the current method immediately combines those two scans ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:710)).
   - Missing declaration: `readPolicy(root)` throws. Malformed JSON or schema: it throws. Missing/non-directory target: it throws. The final repository-policy assertion then fails loudly instead of receiving an empty violation list ([tests/policy.test.ts](/home/user/scaffold/tests/policy.test.ts:294)).
   - Containment: JSON executes no workspace code. The policy consumes only `functions`; it cannot alter the central-file registers, disable other rules, or supply callbacks. Each matched direct module still receives the stricter one-matching-named-function inspection; current code applies that inspection after relaxing only the ordinary function-placement rejection ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:518), [dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:601)).
   - Limit: an unrestricted folder list still lets the workspace reclassify any syntactically allowed folder. Code cannot prove that the owner intended that folder to hold functions instead of classes.
   - Zero-domain compatibility: an empty shipped file, `{ "functions": [] }`, preserves existing policy behavior. Because the file is presence-owned, `audit` reports it missing before upgrade repair; `repair` creates it, then preserves all later workspace edits. That is the behavior already implemented for workspace-owned paths ([src/server/Materializer.ts](/home/user/scaffold/src/server/Materializer.ts:228), [tests/src/server/Materializer.test.ts](/home/user/scaffold/tests/src/server/Materializer.test.ts:349)).
   - Audit: the declaration is a planned, presence-owned path. It is neither foreign nor invisible. Present bytes are not compared; absence is reported as missing. This is correct because scaffold owns the requirement that the declaration exist, while the workspace owns its value.
   - Surface: this changes both surfaces. `dist/host` changes through `tests/setupPolicy.ts`, `tests/policy.test.ts`, the new JSON file, and the manifest’s entry/path set. `dist/src` changes because exported `HOST_PATHS` and `WORKSPACE_OWNED_PATHS` change; both are present in the published core entry ([dist/src/core/index.js](/home/user/scaffold/dist/src/core/index.js:4776)). The “What a bump obliges” vendored rule requires a scaffold bump when any vendored byte or vendored path changes, whether or not `dist/src` also moves ([.agents/orchestration.md](/home/user/scaffold/.agents/orchestration.md:605), [.agents/orchestration.md](/home/user/scaffold/.agents/orchestration.md:635)).

   **B. `tests/setupPolicyConfig.ts`**

   - Guarantee: missing or syntactically invalid modules fail during Vitest loading. A validator must still reject an absent export, accessors, non-array values, duplicates, invalid paths, and nonexistent directories before the workspace scan.
   - Containment: after validation, the imported list can be limited to the same narrow reclassification as mechanism A.
   - Limit: importing a workspace-owned TypeScript file executes arbitrary top-level Node code before validation. This mechanism therefore cannot guarantee that the declaration itself only declares function domains.
   - Zero-domain compatibility: an empty presence-owned module preserves existing workspaces when it is shipped and repaired atomically. Without that seed, every zero-domain workspace fails module resolution.
   - Audit: when added to `HOST_PATHS` and `WORKSPACE_OWNED_PATHS`, it is a planned presence-owned path, not unexpected. If left unplanned, it stays invisible because `Materializer` snapshots planned paths plus files beneath declared host directory roots, and `tests` is not currently such a root ([src/server/Materializer.ts](/home/user/scaffold/src/server/Materializer.ts:515), [dist/host/manifest.json](/home/user/scaffold/dist/host/manifest.json:499)).
   - Surface: like mechanism A, it moves both `dist/host` and `dist/src` because it adds a vendored path and changes the exported ownership/path registers.

   **C. `package.json#orkestrel.functions`**

   - Guarantee: JSON parsing and exact nested-field validation are non-executable and can enforce the same path rules as mechanism A.
   - Missing declaration: the policy must throw. Malformed package JSON, malformed field, or nonexistent target must also throw at the start of `inspectPolicyWorkspace`.
   - Containment: the field cannot directly alter other policy rules. The same semantic reclassification limit remains if arbitrary folder paths are accepted.
   - Zero-domain compatibility: existing workspaces lack the field and therefore fail until migrated to `"functions": []`. Treating absence as an empty list would preserve compatibility but would violate the required fail-loud behavior. Current `repair` cannot add the field because `package.json` is birth-owned and its later writer edits dependency ranges only ([src/core/Compiler.ts](/home/user/scaffold/src/core/Compiler.ts:282), [src/server/Materializer.ts](/home/user/scaffold/src/server/Materializer.ts:364)).
   - Audit: there is no new path. The field is not unexpected. It also remains invisible to audit’s semantic accounting because audit treats the planned `package.json` artifact as birth-owned and does not parse workspace-owned fields ([src/core/types.ts](/home/user/scaffold/src/core/types.ts:20), [src/core/Compiler.ts](/home/user/scaffold/src/core/Compiler.ts:283)).
   - Surface: a manual-only field changes `dist/host` policy bytes but no path set. A supported rollout that generates the empty field for new workspaces also changes `blueprintToManifest`, so `dist/src` moves too. Existing workspaces would still require a new manifest-region migration mechanism or a manual edit.

3. **Recommendation**

   Choose `.orkestrel/policy.json`, seed `{ "functions": [] }`, and make it a presence-owned planned artifact.

   Add a strict loader at the start of `inspectPolicyWorkspace(root)`. Pass its validated folder set into source inspection instead of keeping mutable module-global state. Preserve the current eligibility boundary: direct lower-camel `.ts` modules only, excluding `index.ts`, `main.ts`, and centralized filenames ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:187)). Raise configuration errors before any glob runs. Add explicit negative proofs for missing config, malformed config, traversal, duplicate folders, and nonexistent targets.

   The strongest objection is semantic containment: a validated path still does not prove that the folder should be a function domain. The mechanism can guarantee that declarations only enable the strict function-module shape; it cannot guarantee that a consumer did not intentionally reclassify a folder that should contain classes. Closing that objection requires an owner-approved path vocabulary, such as permitting only named `composables` directories in browser environments.

4. **Owner rulings still required**

   - Define the allowed target vocabulary. Decide whether any contained `app`/`src` directory may be declared, or only `app/browser/composables` and `src/browser/composables`.
   - Decide whether declared symlinks are accepted, whether targets must be physical directories inside the real workspace, and whether an empty declared directory is valid.
   - Decide whether nested modules belong to a function domain. Current matching covers direct children only ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:192)).
   - Decide whether registering a folder name should continue banning that stem globally. Current shipped logic derives every registered folder’s basename and rejects a source file with that stem anywhere in the workspace ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:523)).
   - Confirm that a declaration file is mandatory even for zero domains. The recommended empty seed satisfies backward compatibility, but this mandatory-file contract should be explicit.
   - Resolve the baseline discrepancy: the current shipped policy already hard-codes `app/browser/composables`, as does the consumer copy ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:104), [/workspace/supervisor/tests/setupPolicy.ts](/workspace/supervisor/tests/setupPolicy.ts:63)). A per-workspace implementation must remove that global value and place it only in the declaring workspace’s configuration.

5. **Existing-code boundary ruling**

   Scaffold currently has no consumer-config seam in the shipped policy. Its function-domain register is a frozen constant, `isFunctionDomainPath` reads that constant directly, and `inspectPolicyWorkspace` accepts only a root path ([dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:104), [dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:192), [dist/host/tests/setupPolicy.ts](/home/user/scaffold/dist/host/tests/setupPolicy.ts:716)). Therefore every viable design needs a new policy loader or import plus validation; no existing manifest field, argument, configuration value, or environment hook already provides the requested declaration.