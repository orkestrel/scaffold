# Unit 13 report — compose the browser config factories

Done. `vite.config.ts` is the only file changed: 90 insertions, 7 deletions.
`configs/app/vite.browser.config.ts` needed no edit, and `tests/config.test.ts` is unedited.

## 1. Criteria

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `oxfmt --check` on owned files | done | `npx oxfmt --config .oxfmtrc.json --check vite.config.ts configs/app/vite.browser.config.ts` → `All matched files use the correct format.` |
| 2 | `oxlint --deny-warnings` on owned files | done | same paths, no diagnostic, `EXIT=0` |
| 3 | `npm run check` | done | `tsc --noEmit -p tsconfig.json`, `check:app:core`, `check:app:browser` all silent, exit 0 |
| 4 | `applicationBrowser` gone, no module-private function carries the browser configuration | done | `grep -rn "applicationBrowser" vite.config.ts configs/ tests/ app/` → no match, exit 1. `grep -n "^function " vite.config.ts` → no match; every function in the file is exported |
| 5 | `appBrowser(override?)` and `appShowcase(override?)` exported, showcase built from browser | done | `appShowcase` body is `appBrowser(mergeOverride(showcase, override))`; it declares only `plugins` and `build.outDir` |
| 6 | A test proves the override reaches the configuration and that showcase differs only where a showcase differs, red first | measured, not retained | `npm run test:probe` red `4 failed \| 2 passed (6)`, green `7 passed (7)`. The proof file is `tmp/probe/override.test.ts`, which the scope leaves unretained — see § 7 |
| 7 | The Vue plugin appears exactly once in every returned configuration, including under an override carrying plugins | done | probe test `carries the Vue plugin exactly once in every configuration it returns` asserts `1` for `appBrowser()`, `appShowcase()`, `appBrowser({plugins:[vue()]})`, `appShowcase({plugins:[vue()]})`, plus `1` output boundary in `appShowcase()`. Control test asserts a bare `mergeConfig` yields `2` |
| 8 | `npm run build` succeeds and writes `dist/app/browser` | done | `built in 3.56s`, `BUILD_EXIT=0`, `ls dist/app/browser` → `assets`, `index.html` |
| 9 | `npm test` exits 0 with `tests/config.test.ts` unedited | done | `TEST_EXIT=0` (2026-09-16 19:11:43 → 19:13:03). Config project `46 passed (46)`; policy `111 passed (111)`. `git status --short` → `M vite.config.ts` only |
| 10 | `npm run test:journey` green for every journey project | done | `Test Files 4 passed (4)`, `Tests 76 passed \| 4 skipped (80)`, `JOURNEY_EXIT=0`, 39.14s |

## 2. The shape

```ts
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig
export function appBrowser(override?: UserConfig): UserConfig
export function appShowcase(override?: UserConfig): UserConfig
```

`appBrowser` declares the browser configuration as a local `browser` value and returns
`mergeOverride(browser, override)`. Nothing is module-private any more: `applicationBrowser` is
deleted and its body is `appBrowser`'s own.

`appShowcase` declares only what a showcase changes:

```ts
const showcase: UserConfig = {
	plugins: [outputBoundary(output)],
	build: { outDir: resolveWorkspacePath(output) },
}
return appBrowser(mergeOverride(showcase, override))
```

The caller's override merges onto the showcase's own change first, then that result merges onto the
browser configuration. So a showcase restates neither the aliases, the plugins, the `optimizeDeps`
list, the root, nor the remaining build options.

`mergeOverride` is exported rather than module-private because it carries reusable logic, which
`AGENTS.md` § Design laws requires exported and tested.

`journey` now calls `appBrowser()` and still spreads the result and replaces the `test` block, so
its projects are unchanged. It does not pass an override, and its TSDoc says why: `mergeOverride`
concatenates arrays, so an override would add the journey suite beside the browser include and keep
the exclusion that leaves that suite out. The four journey projects run green.

## 3. The merge

Measured from `node_modules/vite/dist/node/chunks/node.js:2806` (`mergeConfigRecursively`) and
confirmed by the probe, for the fields this configuration carries:

| Field | What `mergeConfig` does | Consequence here |
| ----- | ----------------------- | ---------------- |
| `plugins`, `optimizeDeps.include`, `test.include`, `test.exclude`, `test.setupFiles`, `test.browser.instances` | concatenates both arrays | an override adds to the list rather than replacing it; the probe asserts `optimizeDeps.include` carries `bootstrap-icons` and `vue` after an override |
| `resolve.alias` | `mergeAlias`, a record merge | an override adds an alias and keeps the declared ones |
| `build`, `test`, `test.name`, `test.browser`, `optimizeDeps` | recursive object merge | an override changing `build.emptyOutDir` keeps `build.outDir` |
| `build.outDir`, `root`, `publicDir`, `build.assetsInlineLimit`, `test.fileParallelism`, `test.name.label` | scalar overwrite | a showcase changes only `build.outDir` |
| a key whose override value is `null` or `undefined` | skipped | an absent override field never clears a declared one |
| a key `UserConfig` does not declare, such as `command` | copied through unchanged | this is the invocation-record hazard, handled next |

Array concatenation is wrong for `plugins`, so `mergeOverride` selects one plugin per name after
merging: each name keeps the position its first instance held and the last instance's value. An
override replaces a plugin the base declares instead of duplicating it. That is also what makes
`appShowcase` work — the showcase output boundary carries the same plugin name as the browser
boundary, `orkestrel-output-boundary`, so it replaces it in place, and the returned plugin names and
their order are identical to `appBrowser()`'s.

**The plugin proof.** `tmp/probe/override.test.ts` asserts `vite:vue` appears exactly once in
`appBrowser()`, `appShowcase()`, `appBrowser({ plugins: [vue()] })`, and
`appShowcase({ plugins: [vue()] })`, and that `orkestrel-output-boundary` appears exactly once in
`appShowcase()`. A control test in the same file proves the selection is load-bearing: a bare
`mergeConfig(appBrowser(), { plugins: [vue()] })` carries `vite:vue` twice.

**The invocation record.** Vitest calls every registered project factory with
`{ command, mode, isPreview, isSsrBuild }` — measured at
`node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11365`. `appBrowser` is registered in
`projects`, so a factory that also takes an override receives that record in the same position, and
a bare merge lands `command` and `mode` in the returned project. `tests/config.test.ts` has a test
for exactly that, `keeps Vitest invocation fields out of project configurations`, which calls every
factory with a sentinel carrying those keys. So `mergeOverride` refuses a value carrying `command`,
which no `UserConfig` declares, and merges nothing. Both halves are proved: the probe's control
shows a bare merge landing `command: 'serve'` and `mode: 'sentinel-mode'`, and the unedited config
project passes `46 passed (46)`.

## 4. The failing proof

Command: `npm run test:probe` (`vitest run --config vite.config.ts --no-cache --reporter=verbose
--project probe`). The probe file is `tmp/probe/override.test.ts`; `tmp/probe/manifest.test.ts` is a
pre-existing probe from another unit and accounts for one passing test in both counts.

- **Red**, against the signature that ignores its override, 2026-09-16 19:08:34:
  `Tests 4 failed | 2 passed (6)`. Failing:
  - `browser configuration factories > merges an override into the returned browser configuration` —
    `expected true to be false` on `build.emptyOutDir`, the override never reached the result.
  - `browser configuration factories > builds the showcase on the browser configuration, changing only its output` —
    `TypeError: appShowcase is not a function`.
  - `browser configuration factories > merges an override into the showcase configuration` — same TypeError.
  - `browser configuration factories > carries the Vue plugin exactly once in every configuration it returns` — same TypeError.
- **Green**, after the change, 2026-09-16 19:10:43: `Tests 6 passed (6)`, and `7 passed (7)` after
  the bare-merge control test was added.

## 5. `appShowcase`'s consumer

`appShowcase` has no caller today, and that is the expected end state for this unit. It is not new
capability: the tree already carried the showcase branch inside `applicationBrowser(showcase)`, with
`applicationBrowser(false)` called twice and `applicationBrowser(true)` never. This unit converts a
capability hidden behind a boolean into a named one.

To use it, a workspace adds `configs/app/vite.showcase.config.ts`:

```ts
import { defineConfig } from 'vite'
import { appShowcase } from '../../vite.config.ts'

export default defineConfig(appShowcase())
```

Per `guides/scaffold.md`, that wrapper's presence is what makes a workspace a showcase workspace
(`SHOWCASE_CONFIG_PATH`, line 164; the selection passages at lines 571 and 589). `tests/config.test.ts`
already reads it: line 372 adds the wrapper to the required set when the file exists, and line 415
requires its resolved output to be `dist/showcase`, which `appShowcase()` produces. A single-file
showcase build would also need the development dependency `SHOWCASE_DEV_DEPENDENCIES` names and a
`build:showcase` script. This unit adds none of them, as the deviation contract directs.

## 6. Observations

- `vue()` returns one plugin named `vite:vue`, so plugin selection by name reaches it directly.
- `mergeConfig`'s declared return type is `Record<string, any>`. `mergeOverride` annotates the result
  `UserConfig` at the binding, so no `any` propagates and no assertion is needed.
- `merged.plugins.flat(Infinity)` fails typecheck with `TS2589: Type instantiation is excessively
  deep and possibly infinite`, because `PluginOption` is recursive. `flat()` at depth 1 typechecks
  and covers the shape a caller writes. A plugin nested more than one array deep in an override is
  not deduplicated.
- Durations: `npm run build` 3.56s; `npm run test:journey` 39.14s wall clock 19:11:00 → 19:11:41;
  `npm test` 19:11:43 → 19:13:03. The Sass deprecation warnings appear as the standing condition
  describes.
- The showcase configuration inherits the browser `test` block, including the `app:browser` label.
  It is inert for a build, and the browser wrapper already carries the same block, so removing it
  would be a difference a showcase does not need.

## 7. What I did not close

**Criterion 6's proof is measured but not retained.** It lives in `tmp/probe/override.test.ts`,
which the `probe` workbench collects and `npm test` never runs, and `tmp` is gitignored. No owned
file can carry it:

- The scope grants `tests/config.test.ts` only for a factory rename and tells me to stop rather than
  edit it. No rename was needed, so I did not touch it. That file is where the retained proof
  belongs: it already imports `vite.config.js` and already exercises `appBrowser` through the
  sentinel test.
- A new root-level test file would belong to no project. `tests/config.test.ts` derives the project
  set from the labels `policy`, `config`, `guides`, `conformance`, `distribution`, `integration`,
  plus `tests/setup*.test.ts`; a file named anything else is collected by nothing. Making one run
  would mean registering a project and adding a script to `package.json`, which is off-limits.

Carry this forward as a successor unit that adds the override, composition, and single-plugin
assertions to `tests/config.test.ts`, owned by whoever may edit that file.

**Not attempted, per the deviation contract:** `configs/app/vite.showcase.config.ts`, a showcase
script, and a showcase dependency.
