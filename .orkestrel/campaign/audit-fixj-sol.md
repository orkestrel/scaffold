1. **A1 — BROKEN.** The `.node` classifier and firing control hold, but `guides/scaffold.md` still defines runtime targets as extensionless, `.js`, `.mjs`, or `.cjs`. Add `.node` to that rule before claiming guide parity.

2. **A2 — BROKEN.** An emitted-source probe used this legitimate export entry:
   ```ts
   {
   	node: {
   		import: { types: './node.d.mts', default: './node.mjs' },
   		require: { types: './node.d.cts', default: './node.cjs' },
   	},
   	default: { types: './default.d.ts', default: './default.js' },
   }
   ```
   The emitted `readDeclarations` returned `./default.d.ts` for import and require. TypeScript 6.0.3 with `nodenext` resolved `./node.d.mts` and `./node.d.cts`; Node loaded the corresponding `node` runtime branches. The probe failed with the exact default-versus-node difference. The direct consumers were all enumerated: Node import reads `declaration.module`, Node require reads `declaration.commonjs`, and the browser reads `declaration.module`. The missed site is the declaration model itself. Carry declarations per driven resolver: Node import with `types,node,import`, Node require with `types,node,require`, and browser/bundler with its actual conditions. Adding `node` to the shared module field would break browser resolution.

3. **A3 — CONFIRMED.** The exact emitted selector passed the reachability matrix: module-only entered `.ts`, CommonJS-only entered `.cts`, dual entered each, and unreachable entered neither. TypeScript resolved a dual fixture to `.d.mts` from `.ts` and `.d.cts` from `.cts` under `node16`, `nodenext`, and `bundler`, with no diagnostics. Each populated selection reaches its adjacent absent-subpath control. A2 remains a separate condition-model defect.

4. **A4 — CONFIRMED.** A Node v22.22.2 probe compared the emitted predicate with actual fallback behavior for outside and absolute targets, dot and parent segments, `node_modules`, percent-encoded variants, empty segments, encoded separators, malformed encodings, queries, and fragments. It reported no mismatch. Its deliberately wrong valid-target control reported `MODULE_NOT_FOUND` instead of fallback, proving the instrument could distinguish the rival behavior. Invalid array members were omitted while standalone invalid targets remained visible, matching the established Node reading.

5. **A5 — CONFIRMED.** A generated non-browser distribution artifact contained the revised comment, the adjacent `it.runIf(entry.module && !entry.browser)` predicate, and the adjacent `it.runIf(!entry.browser && entry.commonjs)` predicate. It contained no stale `` `it.runIf(!entry.browser)` retires `` text.

6. **A6 — CONFIRMED.** The Orchestrator edit only joined the `module:` key and its unchanged conditional expression onto one line. TypeScript parses the same property and expression. The supplied post-edit scoped run passed the emitted-corpus fixed-point test. That test’s deliberately unformatted control changed under oxfmt, while every emitted artifact remained byte-identical.

7. **A7 — CONFIRMED.** `blueprintToTestArtifacts` gives the changed distribution proof one shape axis: whether published `src` includes `browser`. The corpus includes non-browser and browser-publishing blueprints. Workspace name, app selection, `bin`, integration, global setup, showcase, and vendors do not alter J1 through J5’s distribution spans. The formatter control changed outside the emitted population, and the supplied corpus run passed after the Orchestrator edit.

8. **A8 — CONFIRMED.** J1 newly refuses only a loadable native-addon surface without declarations. J2 refuses a runtime format whose matching declaration is absent. J3 runs the CommonJS proof previously skipped for dual entries. J4 removes only fallback targets Node itself skips. J5 and A6 change prose or formatting. The dual-format compiler probe passed under every configured resolution. The A2 `node`-condition shape was already misread before FIX-J, so it is a surviving defect, not a widened refusal.

9. **A9 — BROKEN.** The change leaves its emitted vocabulary internally false. The `Entry` comment still says “the declaration” after the field became a per-format record. The `readDeclaration` comment says the function reads each condition set and advances to the next, but the function reads one supplied set; `readDeclarations` performs the separate calls. Correct the declaration model from A2, then make these comments describe its final ownership once. This change must not ship as written.

VERDICT: FAIL — 3 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims