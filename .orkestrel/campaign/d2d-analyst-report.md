### Question 1: Browser-face classification

**Verdict: REPAIR.** Classify a browser face by target identity, not its output directory.

- Resolve the browser, Node import, and Node require targets with their existing runtime condition walks.
- Normalize each target against the installed package root.
- Set `entry.browser` when a browser target exists and matches no resolved Node target. With no Node target, the browser target is distinct. When any Node walk reaches the same file, the entry has no separate browser face.
- Keep the totality predicate unchanged.
- Remove `!entry.browser` from the Node import and Node require gates. A conditional export can publish a browser target and separate Node targets; every reachable target remains owed its drive.
- Keep the browser gate on `entry.browser`.
- Keep the core-only guard on `entry.browser`. A shared file does not trip it; a distinct browser target does.

**Files owned:** [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts), [tests/src/core/templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts), [tests/src/core/compilers.test.ts](/home/user/scaffold/tests/src/core/compilers.test.ts), [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md), [host.json](/home/user/scaffold/host.json), and [ROADMAP.md](/home/user/scaffold/ROADMAP.md).

**Propagation:** emitted-template for `tests/distribution.test.ts`; vendored-host for the guide.

**Pin:** Drive the lifted emitted classifier with a distinct browser target, a browser-only target, a browser target shared with Node import, and one shared with Node require. Assert that distinct browser and Node faces retain their respective runtime gates. The negative control replaces the distinct target with the Node import target; the browser classification and core-only guard must change.

### Question 2: The `commonjs` selector

**Verdict: REPAIR.** Decide CommonJS compile membership from the Node require walk’s runtime target.

- Resolve the target with `RUNTIME_CONDITIONS.commonjs`. Manifest key order remains authoritative.
- Admit `.cjs`, extensionless JavaScript, and `.node` targets.
- Refuse `.mjs`.
- For `.js`, read the nearest physical `package.json`; admit unless its `type` field is `module`.
- Refuse targets whose extension supplies no CommonJS-consumable module format.
- Keep declaration compatibility separate. Add a distinct internal boolean such as `typed` for the existing `.d.cts`, `.d.mts`, and `.d.ts` scope rule. `selectUntypable` must use that declaration fact, while `selectEntries` uses `entry.commonjs`.

The `module-sync` vector selects `./x.js` and admits it under a CommonJS package scope. The nested `node`/`default` vector selects `./index.cjs` without requiring a `require` key. A `.mjs` target and a `.js` target under `type: module` remain outside CommonJS compile probes.

**Files owned:** [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts), [tests/src/core/templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts), [tests/src/core/compilers.test.ts](/home/user/scaffold/tests/src/core/compilers.test.ts), [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md), [host.json](/home/user/scaffold/host.json), and [ROADMAP.md](/home/user/scaffold/ROADMAP.md).

**Propagation:** emitted-template, with vendored-host guide propagation.

**Pin:** Extend the lifted classifier test with the measured `module-sync` and nested `node` vectors, nested package scopes, `.cjs`, `.mjs`, and `.js` targets. The negative control changes a `.js` package scope from `commonjs` to `module`; membership must disappear. A target-existence-only implementation fails that control.

### Question 3: The `prepack` assertion

**Verdict: ADD.** Put this assertion in `registers proof scripts in the correct gate`:

```ts
const prepack = Object.getOwnPropertyDescriptor(scripts, 'prepack')?.value
expect(prepack).toBe(publishes ? 'npm run build' : undefined)
```

A manifest with `private` omitted or set to `false` publishes and must carry the exact indirection. A `private: true` target must omit it. A custom `build` command remains valid because `prepack` invokes the script by name; copying that custom command into `prepack` fails.

**Files owned:** [tests/config.test.ts](/home/user/scaffold/tests/config.test.ts), [host.json](/home/user/scaffold/host.json), and [ROADMAP.md](/home/user/scaffold/ROADMAP.md).

**Propagation:** vendored-host.

**Pin:** The vendored assertion is the fleet gate. Its negative control removes `prepack` from a publishing fixture manifest and must redden that named test; setting `private: true` must make the same manifest pass only when `prepack` is absent.

### Question 4: The factory signature

**Verdict: CHOOSE THE ARROW ADAPTER.** Keep every configurable factory at `(options?: UserConfig): UserConfig`. Emit project rows as contextually typed adapters:

```ts
(_environment) => srcCore()
```

The underscore is valid callback-signature conformance. Vitest invokes the adapter with `ConfigEnv`; the adapter invokes the factory without merging that value. The call happens during Vitest’s project resolution, so the project still receives the command-line mode and the release-mode distribution proof does not become a skip.

Reject `UserConfig | ConfigEnv`: the values describe different roles, and `mergeConfig` cannot consume the union truthfully without a discriminator. Reject separate named factory families: they duplicate project construction without adding a boundary beyond the inline adapter.

The root compiler and scaffold’s materialized root configuration move. Factory templates and the `configs/src/vite.core.config.ts`, `vite.server.config.ts`, and `vite.bin.config.ts` wrappers do not move. The vendored config proof must resolve a function row by invoking it and reading its project label; `row.name` no longer identifies an anonymous adapter.

**Files owned:** [src/core/compilers.ts](/home/user/scaffold/src/core/compilers.ts), [vite.config.ts](/home/user/scaffold/vite.config.ts), [tests/src/core/compilers.test.ts](/home/user/scaffold/tests/src/core/compilers.test.ts), [tests/src/core/templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts), [tests/config.test.ts](/home/user/scaffold/tests/config.test.ts), [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md), [host.json](/home/user/scaffold/host.json), and [ROADMAP.md](/home/user/scaffold/ROADMAP.md).

**Propagation:** emitted-template for generated `vite.config.ts`; vendored-host for the config proof and guide.

**Pin:** Load an emitted root configuration, invoke each project row with a sentinel `ConfigEnv`, and assert that `command`, `isPreview`, and `isSsrBuild` do not enter the returned configuration. Run a staged distribution project with `--mode release` and assert `import.meta.env.MODE === 'release'`. The negative control replaces the adapter with `distribution()`; the release-mode assertion must fail.

### Question 5: Seed history

**Verdict: DOCUMENTED EXCLUSION.** Do not ship seed history before a seed changes.

If a nonempty seed changes, put `SETUP_SEED_HISTORY` in `src/bin/constants.ts`. Use exact artifact paths as keys and frozen readonly arrays of trimmed prior nonempty seed text as values. `#setupQuestion` must compare against the current planned seed and that path’s historical values. Omit the empty-string seed: the existing empty-content predicate already treats empty and whitespace-only modules as unfilled.

Shipping an empty history mechanism creates no consumer-visible capability and expands maintained policy without a historical value to retain. State the limit directly in [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md): “`audit` compares each setup module only with the seed the installed scaffold release plans; it does not retain earlier seed bytes.” Close the roadmap row as documented.

**Files owned:** [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md), [tests/src/bin/CLI.test.ts](/home/user/scaffold/tests/src/bin/CLI.test.ts), [tests/guides.test.ts](/home/user/scaffold/tests/guides.test.ts), [host.json](/home/user/scaffold/host.json), and [ROADMAP.md](/home/user/scaffold/ROADMAP.md).

**Propagation:** vendored-host.

**Pin:** Keep the test proving that the planned global seed is silent. Add a case where different nonempty bytes raise the setup question, plus a presence assertion for the limit sentence. The behavioral case pins the documented limitation; the text assertion pins its disclosure.

### Question 6: Script refresh

**Verdict: MAKE `repair` AUTHORITATIVE FOR BLUEPRINT SCRIPT KEYS.** Do not add a verb and do not tie refresh to destructive `overwrite`. `overwrite` inherits the behavior because it already includes repair.

- Expand `blueprintToWritableScripts` to return every entry from `blueprintToScripts`.
- Treat each expected key as blueprint-owned. Repair appends a missing expected key and replaces a differing expected value.
- Preserve every script key absent from the expected map. An added `deploy` script survives. A customized `build`, `test`, or other expected key is not an extra and is restored.
- Remove the `accepted` predecessor model from `ManifestScript`; authoritative ownership makes it false and unnecessary.
- Add a non-blocking `scripts` target question under the `manifest` group. It names missing and differing expected keys. Do not encode it as an artifact `Finding`, because `package.json` remains birth-owned and the comparison concerns only its owned script region.
- Keep the existing audit exit semantics for non-blocking questions. A scoped audit excluding `manifest` omits the question, and a scoped repair excluding `manifest` must not change scripts.

For html, audit reports missing `test:probe` and `test:bench`. Repair appends their canonical commands, preserves intentional extra keys, and the terminal audit carries no script question.

**Files owned:** [src/core/types.ts](/home/user/scaffold/src/core/types.ts), [src/core/compilers.ts](/home/user/scaffold/src/core/compilers.ts), [src/core/validators.ts](/home/user/scaffold/src/core/validators.ts), [src/bin/CLI.ts](/home/user/scaffold/src/bin/CLI.ts), [tests/src/core/compilers.test.ts](/home/user/scaffold/tests/src/core/compilers.test.ts), [tests/src/core/validators.test.ts](/home/user/scaffold/tests/src/core/validators.test.ts), [tests/src/server/Materializer.test.ts](/home/user/scaffold/tests/src/server/Materializer.test.ts), [tests/src/bin/CLI.test.ts](/home/user/scaffold/tests/src/bin/CLI.test.ts), [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md), [host.json](/home/user/scaffold/host.json), and [ROADMAP.md](/home/user/scaffold/ROADMAP.md).

**Propagation:** dist-only for the compiler, materializer contract, and CLI behavior; vendored-host for the guide.

**Pin:** Build an html birth-cohort fixture without `test:probe` and `test:bench`, add an unrelated custom script, and alter an expected script. Audit must name the missing and differing expected keys. Repair must land the expected map, retain the unrelated key byte-for-byte, and clear the terminal script question. The negative control omits `test:bench` from the writable projection; the terminal question must remain.

LANE: objective COMPLETE.