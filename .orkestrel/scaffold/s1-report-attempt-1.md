# Unit S1 report — stopped on scope, with the change's mechanics proved

**Deviation. Nothing written to an owned file. The tree is unchanged:** `git status --short` reports
only the untracked `.orkestrel/scaffold/` the launch baseline already carried, and `git diff --stat`
is empty.

The brief's change cannot be delivered inside the brief's scope. Two files the change makes false
are outside it: `src/core/compilers.ts` is named off-limits, and `tests/src/core/compilers.test.ts`
is in neither list. Each needs a scope grant.

I did not stop before working. Every mechanic the successor unit needs is settled by a run, in the
sections that follow: the `mergeOverride` shape, its typecheck, both hazards proved red then green,
and the vendored ruling.

## 1. The deviation

**Expected:** `src/core/templates.ts` carries the generated `appBrowser` / `appShowcase` shape, so
restructuring it plus the owned tests and this repository's own configs closes the unit.

**Found:** `src/core/templates.ts` holds the browser factory's skeleton and its `{{plugins}}`,
`{{showcasePlugins}}`, `{{showcaseBuild}}` and `{{showcaseFactory}}` placeholders. Every string that
fills them is a literal in `src/core/compilers.ts`, and every one of those strings depends on the
`showcase` boolean parameter the change deletes.

### Evidence A — the fills are in the off-limits file

`src/core/compilers.ts`, read directly:

| Fill | Line | What it carries |
| ---- | ---- | --------------- |
| `showcasePlugins` | 795 | `const showcasePlugins: PluginOption[] = showcase ? [ … ] : []` |
| `plugins` | 821 | the array ending `...showcasePlugins,` |
| `showcaseBuild` | 828 | `...(showcase ? { cssMinify … } : { assetsInlineLimit: 0 })` |
| `showcaseFactory` | 841 | `export function appShowcase(): UserConfig {` / `return applicationBrowser(true)` |
| `viteTypes` | 915 | `machinery.showcase ? 'PluginOption, UserConfig' : 'UserConfig'` |

Run through the built generator rather than read off the template — `node` against
`dist/src/core/index.js`, calling `blueprintToRootVite(createBlueprint('sample', { app: ['browser'],
showcase: true }))` — the emitted browser span is:

```ts
function applicationBrowser(showcase: boolean): UserConfig {
	const output = showcase ? 'dist/showcase' : 'dist/app/browser'
	const showcasePlugins: PluginOption[] = showcase
		? [viteSingleFile({ /* options */ }), { name: 'orkestrel-showcase-html' /* hook */ }]
		: []
	return {
		resolve,
		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue(), ...showcasePlugins],
		// root, publicDir
		build: {
			...(showcase ? { cssMinify: 'lightningcss', minify: 'oxc' /* and more */ } : { assetsInlineLimit: 0 }),
			// emptyOutDir, outDir, rolldownOptions
		},
		// test
	}
}

export function appBrowser(): UserConfig {
	return applicationBrowser(false)
}

export function appShowcase(): UserConfig {
	return applicationBrowser(true)
}
```

Deleting `applicationBrowser` deletes the `showcase` identifier, so `showcasePlugins`,
`showcaseBuild` and `showcaseFactory` each reference a binding that no longer exists. No template
restructure reaches them: `fillTemplate` substitutes a caller-supplied string, and the caller is the
off-limits file. Criterion 3 fails on the `showcaseFactory` string alone, which spells
`applicationBrowser(true)` and sits in a file I may not write.

### Evidence B — an unscoped test file the change makes false

`tests/src/core/compilers.test.ts` is in neither the owned nor the off-limits list, and it pins the
shape the change inverts.

- Line 1128, `seals every application browser factory against a caller argument`:
  `expect(config).toContain('export function appBrowser(): UserConfig {')` and
  `expect(config).toContain('return applicationBrowser(false)')`.
  Run: `npx vitest run --project src:core -t "seals every application browser factory against a
  caller argument"` → `Tests 1 passed | 411 skipped (412)`, 2026-09-16 19:28:40. It is live, and the
  change reddens it.
- Line 1351, `wires the build-log guard into every bundle-emitting factory`, slices the emitted
  configuration at `configuration.indexOf('function applicationBrowser')`. With the function gone the
  index is `-1` and the slice assertion goes false.

That test's own comment states the repository's reason for sealing the factory: "Vitest calls a
project row with its own environment record, so a factory that declared a parameter merged those
fields into the configuration it returned." The change replaces that defence-by-absence with the
`mergeOverride` refusal. That is a deliberate inversion of a standing invariant, not an oversight,
and the file recording it must be granted to whoever performs it.

### Evidence C — the same invariant is swept in an owned file

`tests/src/core/templates.test.ts:929`, `declares every emitted project factory without a parameter
list`, sweeps every emitted configuration across every selection through `findParameters` and
requires no value-exported `UserConfig`-returning declaration to carry a parameter, with a planted
control. Run: `npx vitest run --project src:core -t "declares every emitted project factory without
a parameter list"` → `Tests 1 passed | 411 skipped (412)`, 2026-09-16 19:28:46.

This file is owned, so it is mine to invert — but it is the change's largest test edit and the
successor brief must name it. The inversion is: every emitted project factory declares exactly
`override?: UserConfig`, and the control is a factory that declares none.

**Hypothesis:** the off-limits line "Every `src/` file other than `templates.ts`" was written to
fence the library's runtime source. Criterion 3's own wording — "`applicationBrowser` appears nowhere
in the generator" — reads the generator as templates plus compilers, which is where it lives.

## 2. Criteria — done / not done

| # | Criterion | State |
| - | --------- | ----- |
| 1 | `format:check`, `lint:check` clean | not done — nothing written |
| 2 | `check` passes, no `any`/`as`/`!`/suppression | the added code is proved clean: `npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --noUncheckedIndexedAccess --verbatimModuleSyntax --allowImportingTsExtensions --target esnext --module esnext --moduleResolution bundler --skipLibCheck --types node,vitest/globals tmp/probe/override.test.ts` → `TSC_EXIT=0`. Not done as a tree gate |
| 3 | `applicationBrowser` gone | blocked — its surviving spelling is a string literal at `src/core/compilers.ts:844` |
| 4 | Every factory takes `override?`, wrappers pass it | blocked for the app browser factory; reachable for every other factory and every wrapper |
| 5 | Generated output proven, red first | not done — the assertion target does not exist yet |
| 6 | Both hazards closed, each with a red control | done as mechanics, in a probe — see § 4 |
| 7 | This repository's own adoption, `dist/` compared | not done |
| 8 | `npm test` exits 0, vendored files unedited | not run — no change to validate. No vendored file touched |
| 9 | Vendored `tests/config.test.ts` ruling | done — see § 5 |

## 3. The shape the successor writes

Ruled: `mergeOverride` goes in the generated `vite.config.ts` itself, emitted from
`CONFIG_TEMPLATES.root.vite`, and is exported. That is where the target put it, and it moves nothing
vendored — `configs/helpers.ts` is published in `dist/host/configs/`, so putting it there would
oblige a re-propagation and a `repair` visit to every target for no gain.

It must not name `PluginOption`, because the root template's `{{viteTypes}}` fill emits that type
only for a showcase selection while `mergeOverride` is emitted for every selection. This shape avoids
it and typechecks — `TSC_EXIT=0`, the run recorded in § 2:

```ts
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (override === undefined || 'command' in override) return base
	const merged: UserConfig = mergeConfig(base, override)
	if (merged.plugins === undefined) return merged
	const flattened = merged.plugins.flat()
	const selected = new Map<unknown, (typeof flattened)[number]>()
	for (const plugin of flattened) {
		selected.set(
			typeof plugin === 'object' && plugin !== null && 'name' in plugin ? plugin.name : plugin,
			plugin,
		)
	}
	return { ...merged, plugins: [...selected.values()] }
}
```

`Map` semantics give the rule the brief names for free: `set` on a present key replaces the value and
keeps the original insertion position, so each plugin name keeps its first position and its last
value. `flat()` runs at depth 1 rather than `flat(Infinity)`, because `PluginOption` is recursive and
the deeper call raises `TS2589`. The target measured the same thing.

Each factory then reads:

```ts
export const srcCore = (override?: UserConfig): UserConfig =>
	mergeOverride({ /* the configuration it declares today */ }, override)
```

and the browser pair composes:

```ts
export function appBrowser(override?: UserConfig): UserConfig {
	const browser: UserConfig = { /* the non-showcase branch, verbatim */ }
	return mergeOverride(browser, override)
}

export function appShowcase(override?: UserConfig): UserConfig {
	const showcase: UserConfig = {
		plugins: [outputBoundary('dist/showcase'), viteSingleFile({ /* options */ }), { name: 'orkestrel-showcase-html' /* hook */ }],
		build: { outDir: resolveWorkspacePath('dist/showcase'), cssMinify: 'lightningcss', minify: 'oxc' /* and the rest of the showcase branch */ },
	}
	return appBrowser(mergeOverride(showcase, override))
}
```

The showcase output boundary carries the plugin name the browser boundary carries,
`orkestrel-output-boundary`, so selection replaces it in place instead of leaving both. Proved in
§ 4.

**One build difference the successor must rule on, and I could not:** today the showcase branch sets
no `assetsInlineLimit`, so Vite's default applies, while the non-showcase branch sets `0`. Under
composition the showcase inherits `assetsInlineLimit: 0` from `appBrowser` unless it restates the
default. `vite-plugin-singlefile` with `useRecommendedBuildConfig: true` writes its own
`assetsInlineLimit`, so the inherited value might never be read — but that is a claim about a third
party's config hook, and the deviation contract forbids changing what a generated workspace builds.
Settle it with a showcase build, not by reading the plugin.

## 4. The hazards — both red, then green

Instrument: `tmp/probe/override.test.ts` (gitignored; retain it from there). Command:
`npm run test:probe`.

**Red**, 2026-09-16 19:29:48, against the naive implementation — `mergeConfig(base, override)` with
no guard and no selection: `Tests 2 failed | 3 passed (5)`.

- `carries one plugin per name in every configuration it returns` — the override's
  `orkestrel-output-boundary` landed beside the base's rather than replacing it, so a showcase
  boundary sits next to the browser boundary.
- `keeps Vitest invocation fields out of project configurations` —
  `AssertionError: expected 'sentinel-command' to be undefined`.

**Green**, 2026-09-16 19:29:58, after the § 3 shape: `Tests 5 passed (5)`.

The controls stay in the file and pass, so each defence is load-bearing rather than decorative. The
test `reports what a bare merge does instead` asserts that `mergeConfig(appBrowser(), { plugins:
[outputBoundary('dist/other')] })` yields the plugin name sequence `orkestrel-output-boundary`,
`orkestrel-environment-boundary`, `orkestrel-output-boundary`, and that `mergeConfig(appBrowser(),
SENTINEL)` lands `command: 'sentinel-command'`.

No plugin helper this repository emits returns more than one plugin, and each name is distinct —
`outputBoundary` is `orkestrel-output-boundary` (`configs/helpers.ts:409`), `declarationRollup` is
`orkestrel-declaration-rollup` (line 648), `environmentBoundary` is `orkestrel-environment-boundary`
(line 851). So selection drops nothing a wrapper declares today.

## 5. The vendored ruling — `tests/config.test.ts` does not change

**Ruling: it stays as it is, and it becomes load-bearing. `dist/host` does not move on its account.**
No re-propagation and no `repair` visit is owed for this change.

Evidence, from reading the file and running its logic against the new shape:

- `tests/config.test.ts:367`, `keeps Vitest invocation fields out of project configurations`, calls
  every registered project factory through `Reflect.apply(factory, undefined, [sentinel])` with
  `{ command, isPreview, isSsrBuild, mode, sentinel }` and requires none of those keys on the
  returned object. `mergeOverride` returns `base` for any value carrying `command`, so nothing lands.
  The probe replicates that loop verbatim against `appBrowser(override?)` and `appShowcase(override?)`
  and passes — the `keeps Vitest invocation fields` row of the green run in § 4. That test's own
  control factory, which spreads the sentinel, still throws.
- `tests/config.test.ts:404`, `requires and validates every selected target wrapper`, loads each
  wrapper through `loadConfigFromFile` and reads only `loaded.config.build?.outDir` against the
  expected path. It never reads wrapper source text, so moving the merge from the wrapper into the
  factory is invisible to it as long as `build.outDir` resolves unchanged — which it does, because
  the wrapper passes the same object it merges today.
- `tests/config.test.ts:201` and `:324` select a factory by name and call it with no argument, so
  `override` is `undefined` and the factory returns its base.
- `tests/config.test.ts:345`, `emits every project as a factory so the release mode reaches its
  proof`, requires each row to be a function. Unchanged.
- `configs/policy.ts` carries no rule that reads a `vite.config.ts` factory declaration. Pattern
  `UserConfig|vite.config` over that one file returns no match.

`tests/policy.test.ts` and `tests/setupPolicy.ts` were not touched and have no stake in the factory
signature.

## 6. Wrapper semantics — no generated wrapper changes what it composes

Compared per wrapper, before and after, from the template text:

| Wrapper | Before | After | Difference |
| ------- | ------ | ----- | ---------- |
| `configs/src/vite.core.config.ts` | `mergeConfig(srcCore(), { publicDir, plugins: [outputBoundary, environmentBoundary, declarationRollup], build })` | `srcCore({ the same object })` | none. `srcCore` declares no `plugins`, so selection has one instance of each name to keep |
| `configs/src/vite.browser.config.ts` | `mergeConfig(srcBrowser(), { plugins: [declarationRollup] })` | `srcBrowser({ plugins: [declarationRollup] })` | none. `orkestrel-declaration-rollup` collides with neither `orkestrel-output-boundary` nor `orkestrel-environment-boundary` |
| `configs/src/vite.server.config.ts` | `mergeConfig(srcServer(), { plugins: [declarationRollup] })` | `srcServer({ plugins: [declarationRollup] })` | none, same reason |
| `configs/src/vite.bin.config.ts` | `mergeConfig(srcBin(), { build: { rolldownOptions: { output: { banner, paths } } } })` | `srcBin({ the same object })` | none. The override carries no `plugins` |
| `configs/app/vite.browser.config.ts` | `defineConfig(appBrowser())` | unchanged | none |
| `configs/app/vite.server.config.ts` | `defineConfig(appServer())` | unchanged | none |
| `configs/app/vite.showcase.config.ts` | `defineConfig(appShowcase())` | unchanged | none |

The only behavioural difference the move introduces anywhere is plugin-name selection, and no wrapper
today adds a plugin its base already declares. The brief calls this latent, and the reading confirms
it: moving the merge inside the factory is what closes the trap before a wrapper falls into it.

`import { mergeConfig } from 'vite'` leaves every `configs/` wrapper and moves to the generated
`vite.config.ts`, which the successor must reflect in each wrapper template's import line.

## 7. Observations

- Scaffold's own checkout has no `app` axis and no `configs/src/vite.browser.config.ts`. Its own
  adoption covers `srcCore`, `srcServer`, `srcBin`, `policy`, `config`, `setup`, `guides`,
  `distribution`, `probe`, and the core, server and bin wrappers. The brief's owned list names a
  browser wrapper that does not exist here; drop that line from the successor.
- `tests/src/bin/CLI.test.ts:1626` and `:1691` assert `appShowcase` absent and present by selection.
  Both survive the change, because the showcase factory is still emitted for exactly the showcase
  selection.
- `tests/src/core/compilers.test.ts:949` and `:971` use `'projects: [appBrowser(), policy, config,
  probe],'` as a control for an evaluated project row. That survives too.
- `tmp` is excluded from `tsconfig.json`, so `npm run check` never typechecks a probe. The § 3 shape
  was typechecked by the standalone `tsc` run recorded in § 2 instead. The probe needs
  `/// <reference types="vitest/config" />` for its `test` block, which the generated file gets from
  its own `import { defineConfig } from 'vitest/config'`.
- Durations: the sealing test 1.12s; the parameter sweep 1.75s; the probe 499ms red and 435ms green.
- `dist/host` did not move, because nothing vendored was touched.

## 8. What I did not close

Everything the two scope grants gate. To re-dispatch, add to owned files:

- `src/core/compilers.ts` — the `showcasePlugins`, `plugins`, `showcaseBuild`, `showcaseFactory` and
  `viteTypes` fills.
- `tests/src/core/compilers.test.ts` — `seals every application browser factory against a caller
  argument` at line 1128 is replaced by its inverse, and `wires the build-log guard into every
  bundle-emitting factory` at line 1351 takes a new slice boundary.

Then the successor carries § 3's shape, § 4's instrument and its red, § 5's ruling, and § 6's table,
and re-derives none of them. The `assetsInlineLimit` question in § 3 is the one open decision, and it
needs a showcase build to settle.

I did not bump a version, publish, commit, install, or edit a vendored file.
