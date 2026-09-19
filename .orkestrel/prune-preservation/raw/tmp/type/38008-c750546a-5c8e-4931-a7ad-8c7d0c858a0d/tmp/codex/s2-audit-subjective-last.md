1. **BROKEN — Fence coverage.** At `tests/setupPolicy.ts:1122`, the sweep ignores parser errors. This input returned `[]`:

   ````markdown
   ```ts
   import { s2MissingValue } from "@orkestrel/test"
   const value =
   ```
   ````

   Removing `const value =` produced the expected violation naming `SKILL.md`, `@orkestrel/test`, and `s2MissingValue`. The valid import reaches the reader, but an incomplete statement elsewhere in its fence hides it. Refuse an unreadable relevant fence instead of accepting its empty AST. Preserve the documented exclusion of unrelated prose and non-Orkestrel imports.

2. **UNRESOLVED — Declaration reading.** The executed scan of installed `node_modules/@orkestrel/*` exports-map declaration targets found function declarations, variables, classes, interfaces, type aliases, and local export lists. None of those entries was refused. The supplied fixtures cover enums, extension mapping, aliases, type re-exports, and a star cycle.

   Named re-exports through a cycle remain unsettled. Add a fixture with these declarations:

   ```ts
   // entry.d.ts
   export declare const VALUE: string
   export { VALUE as ALIAS } from './bridge.js'
   // bridge.d.ts
   export { VALUE } from './entry.js'
   ```

   Assert that reading `entry.d.ts` returns `['ALIAS', 'VALUE']`. Run `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t "reads named re-exports through a cycle"`. The concern is that the ancestor branch returns an empty inventory before the named re-export checks its target.

3. **CONFIRMED — No runtime import.** Reading the installed browser declaration entry succeeded in plain Node. Inspection of the added reader found filesystem reads and parsing, with no package-runtime `import()`, `require`, or `createRequire` call. The existing static scaffold import does not evaluate the entry being inspected.

4. **UNRESOLVED — Out-of-base ruling.** Executed attacks against `@orkestrel/contract` and `@orkestrel/test/missing` produced explicit package and missing-entry violations. Neither was skipped.

   The wildcard-map vector needs a physical fixture. Give the fixture package an exports map containing `"./*": {"types": "./*.d.ts"}`, write `browser.d.ts`, and inspect a named import from its browser subpath. The documented unsupported-map boundary requires a violation. Settle this with `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t "refuses wildcard declaration entries"` after adding that fixture.

5. **CONFIRMED — Controls bind.** Direct execution of the control documents through `inspectSkillImports` matched their exact expected violation arrays. The missing binding names are absent from the installed declarations, and `@orkestrel/contract` is outside the base set. The exported-name control returned no violations. Exact diagnostic comparisons defeated the rival explanation that unrelated skill metadata caused the refusals. `S2-C3` is the positive control; the outside-population requirement applies to the negative controls.

6. **BROKEN — Documented coverage.** The guide at `guides/scaffold.md:1092` and the reader’s TSDoc claim coverage of every Markdown fence. The input under claim 1 silently passes, and none of the stated exclusions describes that behavior. Repair the reader and document its parse-failure diagnostic. Adding this gap to the exclusions would weaken the promised coverage.

7. **CONFIRMED — Vendored imports.** The added package import is `BASE_DEV_DEPENDENCIES` from the already imported `@orkestrel/scaffold` entry. The module retains its existing permitted imports and relative policy leaf. No `typescript` import remains. The vendored-import proof’s membership predicate admits the added import; the out-of-base `@orkestrel/console` control remains outside that predicate.

8. **CONFIRMED — Deleted refusal proof.** The surviving case imports this checkout’s root configuration, selects every registered callable factory, and applies the same sentinel and field assertions as the deleted case. Direct execution against those factories passed. A planted factory returning the sentinel failed the assertions. A factory registered only in this root configuration remains in the surviving population.

9. **BROKEN — Directive ownership.** `.claude/rules/documentation.md:94` owns the instruction to put taught symbols in named-import fences. `guides/scaffold.md:1099` repeats that obligation, and `tests/setupPolicy.ts:1109` repeats it again in TSDoc. This conflicts with the requirement to give a rule one home. Keep the directive in the documentation rule; replace the repeated obligations with a reference and retain the reader’s behavioral coverage description.

10. **CONFIRMED — Existing fixture coverage.** Every `SKILL_DECLARATION_REFUSALS` member is written into a declaration fixture and passed to the real reader. The supported-form fixture compares against literal expected names rather than recomputing the reader’s result. The Orchestrator’s supplied setup log records their passing execution. This confirms the existing fixture matrix, not the additional cycle vector under claim 2.

    My focused rerun, `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t Skill`, stopped before collection with `EPERM` while Vite attempted to write under `node_modules/.vite-temp`. That command produced no additional test evidence.

11. **CONFIRMED — Structural coherence.** The added readers use descriptive module-helper names and remain in shared setup infrastructure. The diff introduces no nested function declaration, prohibited assertion, suppression, or `any`. The installation parameter defaults preserve existing callers. These structural checks held; the behavioral and documentation findings prevent shipment.

**Findings fitting no claim**

- **F1 — Package self-resolution falsely reports a missing prerequisite.** In this scaffold checkout, Node resolves `@orkestrel/scaffold` to `dist/src/core/index.js`, and reading `dist/src/core/index.d.ts` confirms `BASE_DEV_DEPENDENCIES` is exported. Nevertheless, inspecting its valid named import reports:

  ```text
  skill fence import @orkestrel/scaffold has no installed declaration entry
  ```

  `readSkillExports` searches only `root/node_modules/<package>`. It misses the workspace’s own public entry, despite the workspace rule explicitly recognizing package self-resolution. When the workspace manifest names the requested package, resolve its declaration through that manifest’s exports map. Preserve exports-map restrictions and the refusal of genuinely missing entries.

**Attacked and held**

- Commented bindings, aliases, inline `type` bindings, and untagged and `typescript` fences reported missing names correctly.
- Default-only and namespace-only imports returned no violations, matching their documented exclusion. A mixed default-and-named import still checked the named binding.
- Every inspected installed declaration entry was readable. No installed namespace declaration supplied evidence for that additional attack.

VERDICT: FAIL 1, 2, 4, 6, 9; outside the claims: F1