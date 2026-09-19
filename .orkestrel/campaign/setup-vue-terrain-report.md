I'll read the brief first, then gather the evidence it asks for.I'll load the required rules, skill, and guides, then map the generated browser-setup compiler path.Capability-lane references next, then the compiler/template path that actually loads Vue in a generated `setup:browser` host.I'll read the failure log, generated host files, and the tests that actually exercise generated browser configs.Vue SFC loading for a generated `setup:browser` host is owned by the `appBrowser` factory, not by `setupBrowser`. The measured red is that split.

## Compiler path

`Compiler.compile` drafts configs through `blueprintToConfigArtifacts` → `blueprintToRootVite`. `tmp/release/scaffold-0.0.75` matches HEAD on this path.

- `blueprintToMachinery` (`src/core/compilers.ts:624-634`): `browser` is true when `src`, `app`, or `setup` includes `'browser'`. `vue` is true only when `app` includes `'browser'`.
- Root Vite (`compilers.ts:725-731`): `import vue from '@vitejs/plugin-vue'` is emitted only when `machinery.vue`. Playwright is emitted when `machinery.browser`.
- Project registration (`compilers.ts:804-836`): `appBrowser` if `app` has `'browser'`; `setupBrowser` if `setup` has `'browser'`. The factories are independent.
- Scripts (`compilers.ts:316-318`, `:357-358`): `check:app:browser` is `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`. `test:setup:browser` is `vitest … --project setup:browser`.
- Vue deps (`compilers.ts:223-227`, `src/core/constants.ts:560-577`): Playwright comes from `src/browser` or `setup: ['browser']`. `@vitejs/plugin-vue`, `vue`, and `vue-tsc` come only from `app.includes('browser')`. Those Vue rows are seeds, not packages this checkout installs (`guides/scaffold.md:1385-1388`, `tests/src/core/constants.test.ts:103-109`).

`@orkestrel/contract` does not own SFC transforms. The emitted config calls `@vitejs/plugin-vue` directly.

## Where Vue loading is owned

`vue()` sits only on `appBrowser` (`src/core/templates.ts:316-347`):

```320:320:src/core/templates.ts
		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
```

`setupBrowser` (`templates.ts:498-513`) has `resolve` and a Playwright `test` block. It has no `plugins` key and does not call `appBrowser`.

`srcBrowser` (`templates.ts:187-222`) has environment/output plugins only. No Vue.

`mergeOverride` (`templates.ts:115-143`) can append a named plugin from an override. Nothing in the compile path passes `vue()` into `setupBrowser`. The app wrapper calls `appBrowser()`, not `setupBrowser` (`templates.ts:832-836`).

Generated host `tmp/recovery/roughnotes/vite.config.ts:120-151` vs `:263-277` matches that split. The import at `:5` is present because `app/browser` is selected; `setupBrowser` still does not use it.

## Types and host selection

- `Environment` is `'core' | 'browser' | 'server'` on both axes (`src/core/types.ts:3`).
- `Blueprint.src` / `Blueprint.app` are independent (`types.ts:214-215`). `setup` is `readonly SetupRuntime[]` with `'node' | 'browser'` (`types.ts:223`, `:235`).
- `ViteMachinery.vue` is documented as app-browser SFC/HTML/dev-server machinery (`types.ts:91-108`).
- CLI `new --src` / `new --app` accept `core,browser,server` (`src/bin/helpers.ts:1119-1134`). `new` always sets `setup: []` (`src/bin/CLI.ts:234-239`, `guides/scaffold.md:596-598`).
- Repair infers `setup: ['browser']` from exact-case `tests/setupBrowser.test.ts` (`CLI.ts:967-974`). It infers `app: ['browser']` from a physical `app/browser/` directory (`helpers.ts:903-907`).
- Scaffold does not emit `tests/setupBrowser.test.ts` (`compilers.ts:1216-1234`; pinned `tests/src/core/compilers.test.ts:969-971`). It emits empty `app/browser/index.ts`, empty `main.ts`, and HTML `index.html`. No `App.vue` (`compilers.ts:1130-1156`).

`no browser` is a valid shape: omit `'browser'` on both axes and do not write `tests/setupBrowser.test.ts`.

## Measured failure

`tmp/recovery/roughnotes/tmp/units/setup-first.log.txt:12-19`: Vitest `--project setup:browser` hits `vite:import-analysis` on `app/browser/App.vue` at `</script>` and asks for `@vitejs/plugin-vue`.

Cause vector: `tests/setupBrowser.test.ts:18-80` imports `HomeView` from `@app/browser` and calls `mountView(HomeView)`. `app/browser/index.ts:10-16` re-exports `.vue` defaults. `tests/setupBrowser.ts:7-11` imports `vue` / `createApp`. Plugin-vue is installed (`package.json` carries `@vitejs/plugin-vue`). The `setup:browser` project still has no Vue plugin.

`app:browser` / journey compose through `appBrowser()` and therefore do load `.vue`. `setup:browser` does not.

## Wrapper repair: declared policy vs actual bytes

**Declared (HEAD and `tmp/release/scaffold-0.0.75`):**

- `configs/app/vite.browser.config.ts` is `group: 'configs'`, `ownership: 'content'` (`compilers.ts:990-1069`).
- Template bytes are `export default defineConfig(appBrowser())` (`templates.ts:832-836`; pinned `tests/src/core/compilers.test.ts:1589-1592`).
- `Ownership` (`types.ts:20-30`): `content` compares bytes and a write replaces stale; `birth` always reports aligned and writes only while absent.
- `inferDrift` (`src/core/helpers.ts:555-559`): birth → aligned; content mismatch → stale.
- `Materializer.repair` (`src/server/Materializer.ts:296-323`): restores `missing` regardless of ownership; replaces `stale` only where the artifact claims bytes.

**Birth-owned Vite wrapper is the journey file**, not the browser wrapper (`compilers.ts:1082-1089`; `guides/scaffold.md:973-974`; repair preserves adopter variants in `tests/src/bin/CLI.test.ts:1659-1697`).

**Guide:** `repair` restores a content-owned config to the canonical set (`guides/scaffold.md:1267-1271`). The guide names the journey wrapper as preserved. It does not name `configs/app/vite.browser.config.ts`.

**Actual generated file after the reported `repair --groups configs,manifest`:**

```1:6:tmp/recovery/roughnotes/configs/app/vite.browser.config.ts
import { defineConfig } from 'vite'
import { appBrowser } from '../../vite.config.ts'

export default defineConfig(appBrowser({
	optimizeDeps: { include: ['vue', 'bootstrap', '@popperjs/core', '@orkestrel/test', '@orkestrel/test/browser'] },
}))
```

That override cannot reach `setupBrowser`. Vitest `--config vite.config.ts --project setup:browser` uses the root factory. `dev` / `build:app:browser` use this wrapper.

## Existing proofs

**String / compile-text (no generated browser Vitest run):**

- `tests/src/core/compilers.test.ts:955-975` — `setupBrowser` include/setupFiles/Playwright/script; does not assert `vue()` on that factory.
- `tests/src/core/compilers.test.ts:1533-1538` — asserts `vue()` on `appBrowser` only.
- `tests/src/core/compilers.test.ts:1548-1620` — wrapper bytes are `appBrowser()` with no override.
- `tests/src/bin/CLI.test.ts:1639-1697` — real CLI repair; writes `export {}\n` as `setupBrowser.test.ts`; asserts labels; does not run Vitest.

**Real generated hosts (not Vue-in-`setup:browser`):**

- `tests/src/core/templates.test.ts:1021-1035` — stages generated `vite.config.ts` and runs `tsc`. Does not import a `.vue` file and does not run `setup:browser`.
- `tests/distribution.test.ts:926-932` — installs generated workspaces and runs gates; the app-only case is `{ app: ['core', 'server'] }` and states it does not reach a browser-carrying workspace.

**No existing test in this package materializes `app: ['browser']` plus `tests/setupBrowser.test.ts` that imports a `.vue` file and runs `npm run test:setup:browser`.** The red that exists is the roughnotes command in `tmp/recovery/roughnotes/tmp/units/setup-first.log.txt`.

## Guide contract

- `guides/README.md:19-22` — Blueprint reference owns `setup:browser`.
- `guides/scaffold.md:913-922` — `setup:browser` collects `tests/setupBrowser.test.ts` and loads setup modules through Chromium. No Vue plugin sentence.
- `guides/scaffold.md:922` — no setup proof for an empty seed.
- `.claude/rules/application.md:23-24` — `app/browser` uses Vue 3 when selected, `vue-tsc`, Chromium tests.
- `.claude/rules/workspace.md:136-148` — `setup:browser` proves `setupBrowser.ts` in Chromium; registered only when the exact-case proof exists.
- `.claude/rules/tests.md:62-66` — put `tests/setupBrowser.test.ts` in `setup:browser`; keep assertions on setup-infrastructure behavior.

## Contradictions

- Vue plugin import is selected by `app/browser`; Vue plugin *use* is only on `appBrowser`. `setup:browser` can still import adopter `.vue` files through `@app/browser` while Vite parses them as JS.
- Guide/rules describe `setup:browser` as a setup-helper proof. The roughnotes proof mounts `HomeView` (a `.vue` default).
- `configs/app/vite.browser.config.ts` is content-owned with template `appBrowser()`. The roughnotes file still carries an `optimizeDeps` override after a configs-group repair. Unanswered whether that repair compared equal bytes, skipped the path, or the override was written afterward. Either way, that wrapper is not the `setup:browser` compiler.

## Unanswered

- Whether any current `app:browser` / journey run in roughnotes is green on the same `.vue` graph (expected if they use `appBrowser()`, not verified here; this session ran no tests).
- Whether adding `vue()` to `setupBrowser` would survive the next `repair --groups configs`, given `vite.config.ts` is also content-owned (`compilers.ts:924-929`). Policy is quoted above; no ruling.