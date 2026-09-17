# Unit S1 report — config factories take their overrides

Done. Every generated config factory accepts `override?: UserConfig` and returns its base merged
with it, `applicationBrowser` is gone, `appShowcase` composes on `appBrowser`, no generated wrapper
calls `mergeConfig`, and this repository runs the shape it generates. The gate chain is green in
order and `npm test` exits 0. No vendored file changed and `dist/host` did not move.

## 1. Criteria — done / not done

| # | Criterion | State |
| - | --------- | ----- |
| 1 | `format:check`, `lint:check` clean | done. `All matched files use the correct format`, 224 files; `oxlint --deny-warnings .` reports nothing |
| 2 | `check` passes, no `any`/`as`/`!`/suppression | done. `npm run check` runs root `tsc` plus `check:src:core`, `check:src:server`, `check:src:bin`, all silent. A pattern sweep over the added lines for `as <Type>`, `as unknown`, `: any`, `<any>`, `ts-ignore`, `ts-expect-error`, `ts-nocheck`, `eslint-disable`, `oxlint-disable` and a trailing `!` returns nothing |
| 3 | `applicationBrowser` gone | done. `grep -rn applicationBrowser src/ tests/ configs/ vite.config.ts guides/` returns one line: `tests/src/core/compilers.test.ts:1153`, the assertion that it is absent |
| 4 | Every factory takes `override?`, wrappers pass it | done. § 2 and § 3 |
| 5 | Generated output proven, red first | done. § 4 records the command and both counts |
| 6 | Both hazards closed, each with a red control | done. § 5 |
| 7 | This repository's own adoption, `dist/` compared | done. § 7. The two builds are byte-identical across 187 files |
| 8 | `npm test` exits 0, vendored files unedited | done. `EXIT=0`; per-project counts in § 8 |
| 9 | No vendored file changed, `dist/host` did not move | done. § 6 |
| 10 | The two sealed cases inverted, each keeping its control | done. § 9 |

## 2. The generated shape

Every factory is a function declaration that names its configuration, then merges:

```ts
export function srcCore(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		// the configuration it declared before, verbatim, one tab deeper
	}
	return mergeOverride(project, override)
}
```

That form covers `srcCore`, `srcBrowser`, `srcServer`, `srcBin`, `appCore`, `appServer`, `policy`,
`config`, `setup`, `guides`, `conformance`, `service`, `distribution`, `probe`, and `integration`.

`mergeOverride` is emitted from the root template for every selection, exported, and placed above the
factories:

```ts
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (override === undefined || 'command' in override) return base
	const merged: UserConfig = mergeConfig(base, override)
	if (merged.plugins === undefined) return merged
	const selected = new Map<unknown, PluginOption>()
	for (const plugin of merged.plugins.flat()) {
		const name: unknown =
			typeof plugin === 'object' && plugin !== null && 'name' in plugin ? plugin.name : plugin
		selected.set(name, plugin)
	}
	return { ...merged, plugins: [...selected.values()] }
}
```

The browser pair:

```ts
export function appBrowser(override?: UserConfig): UserConfig {
	const output = 'dist/app/browser'
	const project: UserConfig = {
		resolve,
		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		build: { assetsInlineLimit: 0, emptyOutDir: true, outDir: resolveWorkspacePath(output), /* rolldownOptions */ },
		test: { /* the app:browser project, unchanged */ },
	}
	return mergeOverride(project, override)
}

export function appShowcase(override?: UserConfig): UserConfig {
	const output = 'dist/showcase'
	const showcase: UserConfig = {
		plugins: [outputBoundary(output), viteSingleFile({ /* options */ }), { name: 'orkestrel-showcase-html' /* hook */ }],
		build: { assetsInlineLimit: 4096, cssMinify: 'lightningcss', minify: 'oxc', modulePreload: false,
			outDir: resolveWorkspacePath(output), reportCompressedSize: false, sourcemap: false, target: 'esnext' },
	}
	return appBrowser(mergeOverride(showcase, override))
}
```

`appShowcase` declares only the output boundary and the build options a showcase changes. It restates
neither the aliases, the root, the input, the environment boundary, the Vue plugin, nor the test
block. The plugin order it produces — `orkestrel-output-boundary`, `orkestrel-environment-boundary`,
the Vue plugin, `viteSingleFile`, `orkestrel-showcase-html` — is the order the deleted
`applicationBrowser(true)` produced, because name selection keeps each name's first position and its
last value, so the showcase boundary lands in the browser boundary's place.

Two template mechanics were retired with `applicationBrowser`: the `{{showcasePlugins}}`,
`{{plugins}}` and `{{showcaseBuild}}` fills, and the `{{viteTypes}}` fill. `mergeOverride` names
`PluginOption` and `mergeConfig` for every selection, so the emitted head is now fixed at
`import type { PluginOption, UserConfig } from 'vite'` followed by `import { mergeConfig } from 'vite'`.

### The one emitted value that is not a pure recomposition

`assetsInlineLimit` in `appShowcase`. Before the change the showcase branch set none and read Vite's
default, while the browser branch set `0`. Composed on `appBrowser`, a showcase would inherit `0`
unless it restates the default, and `0` stops asset inlining — the opposite of what a single-file
showcase wants. `appShowcase` therefore restates `4096`, which is Vite 8.3.0's documented default,
read from the installed package: `node_modules/vite/dist/node/cli.js:765` declares
`--assetsInlineLimit <number>` as `static asset base64 inline threshold in bytes (default: 4096)`.
The effective value a generated showcase builds with is unchanged.

I could not settle this with a real showcase build, and § 10 records that. The brief's other reading
— that `vite-plugin-singlefile` with `useRecommendedBuildConfig` writes its own value and makes the
inherited one unread — stays unmeasured, and the restatement makes the answer not matter.

## 3. The wrappers — before and after

| Wrapper | Before | After | Semantic difference |
| ------- | ------ | ----- | ------------------- |
| `configs/src/vite.core.config.ts` | `mergeConfig(srcCore(), { publicDir, plugins: [outputBoundary, environmentBoundary, declarationRollup], build })` | `srcCore({ the same object })` | none. `srcCore` declares no `plugins`, so selection has one instance of each name to keep |
| `configs/src/vite.browser.config.ts` | `mergeConfig(srcBrowser(), { plugins: [declarationRollup] })` | `srcBrowser({ plugins: [declarationRollup] })` | none. `orkestrel-declaration-rollup` collides with neither `orkestrel-output-boundary` nor `orkestrel-environment-boundary` |
| `configs/src/vite.server.config.ts` | `mergeConfig(srcServer(), { plugins: [declarationRollup] })` | `srcServer({ plugins: [declarationRollup] })` | none, same reason |
| `configs/src/vite.bin.config.ts` | `mergeConfig(srcBin(), { build: { rolldownOptions: { output: { banner, paths } } } })` | `srcBin({ the same object })` | none. The override carries no `plugins` |
| `configs/app/vite.browser.config.ts` | `defineConfig(appBrowser())` | unchanged | none |
| `configs/app/vite.server.config.ts` | `defineConfig(appServer())` | unchanged | none |
| `configs/app/vite.showcase.config.ts` | `defineConfig(appShowcase())` | unchanged | none |

`import { mergeConfig } from 'vite'` left every wrapper and moved to the root configuration. Each
wrapper's first line is now `import { defineConfig } from 'vite'`, asserted for every emitted wrapper
of both browser selections.

## 4. Generated output, red first

Command: `npx vitest run --project src:core tests/src/core/compilers.test.ts tests/src/core/templates.test.ts`

The red run restores `src/core/templates.ts` and `src/core/compilers.ts` from `HEAD` — the generator
before this change — and leaves the tests at their new state. 2026-09-16.

- **Red:** `Tests 13 failed | 139 passed (152)`
- **Green:** `Tests 152 passed (152)`

The named cases in the red run:

- `emits every browser workspace configuration for a showcase selection and for none` — the new proof, which asserts every emitted `configs/**/vite.*.config.ts` whole for `{ src: ['core'], app: ['core','browser'], showcase: true }` and for the same selection without a showcase, plus the exact emitted `mergeOverride`, `appBrowser` and `appShowcase` spans;
- `gives every application browser factory the caller override` and `declares every emitted project factory with the override parameter` — the two inverted cases, § 9;
- `emits browser configurations their own typecheck accepts` — the real-`tsc` proof over staged workspaces;
- `keeps this repository byte-identical to every configuration it generates`, `writes each selection-dependent span the way the formatter leaves it`, `wires the build-log guard into every bundle-emitting factory`, `imports the configuration helpers a selection actually reaches`, `gives every bin project its contended-suite timeout and reason`, `registers the conformance and live-service projects only when their fact is set`, and the three `blueprintToScripts config projects` cases — every existing proof that pins the emitted factory shape.

The generator files were restored from a pre-run copy and verified identical afterwards.

## 5. The hazards

Both are closed by `mergeOverride` in the emitted configuration, and both are proved three ways: the
retained probe instrument, the new suite cases, and the controls inside those cases.

### The retained instrument, red then green

Instrument: `tmp/probe/override.test.ts`. Command: `npm run test:probe`. 2026-09-16.

- **Red**, with `mergeOverride` replaced by `override === undefined ? base : mergeConfig(base, override)`: `Tests 2 failed | 3 passed (5)`. The two reds are `carries one plugin per name in every configuration it returns` and `keeps Vitest invocation fields out of project configurations`.
- **Green**, with the guarded merge restored: `Tests 5 passed (5)`.

The instrument is back at its green content.

### The suite cases

`tests/src/core/compilers.test.ts`, `describe('the generated configuration under its own hazards')`.
Both cases drive this checkout's own `vite.config.ts` exports, which
`keeps this repository byte-identical to every configuration it generates` pins to the generator's
output, against the real vendored `outputBoundary` and `environmentBoundary` plugins.

- `refuses the Vitest invocation record a project row is called with` states the population — the eight factories this checkout registers as project rows — then calls each through `Reflect.apply(factory, undefined, [sentinel])` and requires no sentinel field on the result. **Its control** is `mergeConfig(distribution(), sentinel)`, which must land `command: 'sentinel-command'` and `mode: 'sentinel-mode'`: that is the damage the refusal prevents, asserted as damage.
- `carries one plugin per name through every override it merges` holds three plugin instances and checks identity, so it reads which instance survived rather than how many did: the override's boundary takes position 0 and the base's environment boundary keeps position 1. It then repeats the rule through the real `srcServer` factory. **Its control** is `mergeConfig({ plugins: [declared, environment] }, { plugins: [replacement] })`, which must return three plugins with the base's boundary still at position 0 and the override's at position 2.

The vendored `tests/config.test.ts` case `keeps Vitest invocation fields out of project
configurations` is now load-bearing rather than defensive: it drives every registered row of this
repository's own configuration through the refusal and passes unchanged — `npm run test:config`,
`Tests 172 passed | 1 skipped (173)`.

## 6. The vendored ruling — `tests/config.test.ts` does not change

It stays as it is, and `dist/host` does not move on its account. No re-propagation and no `repair`
visit is owed.

Evidence:

- `git status --short configs/helpers.ts configs/policy.ts tests/config.test.ts tests/policy.test.ts tests/setupPolicy.ts host.json package.json` reports no lines.
- `npm run build` regenerates `host.json`, the committed inventory that carries a SHA-256 digest for each of the 172 vendored entries. After the build `git diff --stat host.json` reports no lines, so every vendored byte is identical to the baseline.
- `npm run test:config` passes whole against the new shape: the sentinel loop, `requires and validates every selected target wrapper` (which reads `loaded.config.build?.outDir` through `loadConfigFromFile` and never reads wrapper source), `emits every project as a factory so the release mode reaches its proof`, and the cases that call a factory by name with no argument.

## 7. This repository's own adoption, and the `dist/` comparison

`vite.config.ts` and `configs/src/vite.core.config.ts`, `vite.server.config.ts`, `vite.bin.config.ts`
were replaced with the bytes `blueprintToConfigArtifacts` emits for
`createBlueprint('scaffold', { src: ['core','server'], bin: true, guides: true, setup: true })`, which
is the blueprint the byte-identical proof compares against. This checkout has no `app` axis, so its
adoption covers `srcCore`, `srcServer`, `srcBin`, `policy`, `config`, `setup`, `guides`,
`distribution`, `probe`, and the core, server and bin wrappers.

The `dist/` comparison isolates the configuration change from the source change. Both builds ran
against the same sources; only the four configuration files differed.

- Build under the baseline configuration (restored from `HEAD`), then `find dist -type f | sort | xargs sha256sum`.
- Build under the new configuration, same command.
- `diff` of the two digest lists: no output. **187 files, byte-identical.**

A third build under the new configuration reproduced the second exactly, so the comparison is not
reading build nondeterminism. The four configuration files were restored from a pre-run copy and
verified identical afterwards.

## 8. Gates

Run in order, 2026-09-16, `EXIT=0` for the chain.

| Gate | Result |
| ---- | ------ |
| `npm run format:check` | `All matched files use the correct format`, 224 files |
| `npm run lint:check` | no diagnostics |
| `npm run check` | root `tsc` plus the three scoped projects, all silent |
| `npm run build` | `build-host: staged 172 file(s) into dist/host`; `build-inventory: staged 172 file(s) into host.json` |
| `npm test` | `EXIT=0` |

`npm test` per project: `src:core` 415 passed; `src:server` 466 passed, 7 skipped; `src:bin` 257
passed; `policy` 102 passed; `config` 172 passed, 1 skipped; `setup` 118 passed, 3 skipped; `guides`
23 passed.

Diffstat:

```text
 configs/src/vite.bin.config.ts    |   4 +-
 configs/src/vite.core.config.ts   |   4 +-
 configs/src/vite.server.config.ts |   4 +-
 src/core/compilers.ts             | 162 +++++-----
 src/core/templates.ts             | 602 +++++++++++++++++++++-----------------
 tests/src/core/compilers.test.ts  | 358 ++++++++++++++++++++---
 tests/src/core/templates.test.ts  | 151 ++++++----
 vite.config.ts                    | 389 +++++++++++++-----------
 8 files changed, 1047 insertions(+), 627 deletions(-)
```

Touched files:

- `src/core/templates.ts` — the root template gains the `mergeOverride` span and the fixed import head; every factory takes `override?: UserConfig` and returns `mergeOverride(project, override)`; the browser factory is static and `applicationBrowser` is deleted; every `configs/` wrapper passes its configuration as the factory's argument.
- `src/core/compilers.ts` — the `showcasePlugins`, `plugins`, `showcaseBuild` and `viteTypes` fills are gone; `showcaseFactory` now carries the whole `appShowcase` declaration; the `external`, `output`, `exclude` and `global` fills are re-indented one tab for the factory bodies' new depth.
- `tests/src/core/templates.test.ts` — the parameter sweep is inverted and its helpers rewritten; the real-`tsc` controls are inverted.
- `tests/src/core/compilers.test.ts` — the sealing case is inverted; the emitted-shape assertions follow the new text; two new cases add the whole-output proof and the two hazard proofs.
- `vite.config.ts`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `configs/src/vite.bin.config.ts` — this repository's own adoption, taken verbatim from the generator.

## 9. The two inverted cases

Each was sealed against a parameter on purpose. Each is now its inverse, keeps its planted control,
and carries the reason the parameter is safe.

### `tests/src/core/compilers.test.ts` — was `seals every application browser factory against a caller argument`

Now `gives every application browser factory the caller override`. It asserts
`export function appBrowser(override?: UserConfig): UserConfig {`,
`return mergeOverride(project, override)`,
`export function appShowcase(override?: UserConfig): UserConfig {`,
`return appBrowser(mergeOverride(showcase, override))`, and that `applicationBrowser` is absent. Its
comment carries the reason forward: Vitest calls a project row with its own environment record, that
record lands in the override position, `mergeOverride` refuses a value carrying `command`, and the
vendored `tests/config.test.ts` drives every registered row through that refusal. The case keeps its
original control — `appShowcase` is generated inline while `appBrowser` comes from the template, so
one spelling drifting from the other is what it catches.

### `tests/src/core/templates.test.ts` — was `declares every emitted project factory without a parameter list`

Now `declares every emitted project factory with the override parameter`. The reader `findParameters`
became `findRefused`, which reports every value-exported `UserConfig`-returning declaration whose
parameter list is neither `override?: UserConfig` nor, for `mergeOverride` alone,
`base: UserConfig, override?: UserConfig`. The one exemption is not taken on trust: the case reads
`mergeOverride`'s declaration through the same parser and asserts its parameters, its return type and
that it is value-exported, and reads `appBrowser`'s the same way.

The planted control is inverted with it. `plantParameter` became `sealParameter`, which takes the
override back out of the emitted `policy` factory — the shape this rule replaced — and the sweep
requires that plant to be reported in every emitted `vite.config.ts` it walks, so an empty finding is
a finding rather than a module the parser skipped.

The real-`tsc` controls in `emits browser configurations their own typecheck accepts` are inverted
too. The old control passed an argument to a factory that declared none and required
`Expected 0 arguments, but got 1`; the new one passes `appBrowser({ unreachable: false })` and
requires `'unreachable' does not exist in type 'UserConfig'`, which additionally proves the parameter
carries the real type rather than an open one. The showcase-only control moved from the deleted
`const showcasePlugins: PluginOption[]` annotation to `const showcase: UserConfig`, and still
produces `Parameter 'html' implicitly has an 'any' type`.

## 10. Observations

- **`assetsInlineLimit` was not settled by a build.** A generated showcase workspace needs `vue`, `@vitejs/plugin-vue`, `vite-plugin-singlefile` and `playwright`, none of which this checkout installs, and the permission floor bars installing them. The settling command is, in a generated workspace with a browser app and `showcase: true` and its dependencies installed: `npm run build:showcase`, then compare `dist/showcase/index.html` before and after removing `assetsInlineLimit: 4096` from `appShowcase`. The restatement makes the emitted build identical to today's either way, so nothing a generated workspace builds depends on the answer.
- **The generated `vite.config.ts` is produced at scaffold time and is not restored by `repair`,** so existing workspaces keep their current factories until regenerated. This change reaches them only through `new`.
- **The formatter needed no coaxing.** `is an oxfmt fixed point across the emitted content corpus` passed on the first run after the template rewrite, over every blueprint in its corpus.
- **Durations.** `npm run build` about 13 s; `tests/src/core/templates.test.ts` 10.45 s; `tests/src/core/compilers.test.ts` about 20 s; the probe 5 tests in well under a second each way.
- **`dist/host` did not move**, and no `guides/` prose describes the factory signatures or the wrapper merge shape — `grep -n "mergeConfig\|appShowcase" guides/*.md` returns nothing, and `npm run test:guides` passes 23 of 23.
- Two test imports are renamed to avoid `no-shadow`, which `oxlint --deny-warnings` treats as failures: `config as configProject`, `distribution as distributionProject`, and the same form for `guides`, `policy`, `setup`, `probe`. That is an ancillary decision recorded rather than escalated.

## 11. What I did not close

Nothing in scope. The `assetsInlineLimit` build reading in § 10 is the one measurement I could not
take here; it changes no emitted byte and belongs to whoever next has a generated showcase workspace
with its dependencies installed.

I did not bump a version, publish, commit, push, install, or edit a vendored file.
