## Q1 — the alias and the shell import

**Ruling: keep `import '../../src/styles/index.scss'` at `app/browser/main.ts:1`, unchanged.** It is not a compromise; under the vendored lint configuration it is the only legal form, and the `@src/styles` alias the rule documents would be illegal in the same position.

**Chosen shape** (`app/browser/main.ts:1-2`, no edit):

```ts
import '../../src/styles/index.scss'
import './styles/index.scss'
```

The package cascade loads first, then the shell's own overrides. That order is correct and stays.

**Options rejected**

- `import '../../src/styles/index.ts'` (or `.js`) — `import/no-unassigned-import` allows only stylesheet extensions, so an unassigned `.ts` import is a lint error (`.oxlintrc.json:43-48`).
- `import '@orkestrel/veneer/styles'` — resolves into `dist/`, so the private shell would depend on a build output of its own package, and `documentation.md` § Guide examples reserves published specifiers for guide fences.
- Add `@src/styles` to the root `tsconfig.json` `paths` — `tsconfig.json` is `ownership: 'content'` (`scaffold/src/core/compilers.ts:922-927`) and `repair` rewrites a stale content path (`scaffold/src/server/Materializer.ts:301-324`).

**Boundary, executed in memory on the candidates** (`veneer/configs/helpers.ts:311-313, 315-333, 335-371`), owner `app/browser`:

| Candidate | `environmentSourceError` | `environmentPathError` |
| --- | --- | --- |
| `'../../src/styles/index.scss'` | `stylesheet` true; the `/core` and `/server` branches do not fire for a `/browser` owner → `undefined` | target `src/styles/index.scss`: not app, not browser, not server; `/browser` branch tests `targetServer` only → `undefined` |
| `'../../src/styles/index.ts'` | `undefined` | `undefined` |
| `'@src/styles'` | `browserPackage` matches `@(?:app\|src)/browser` only, so no match → `undefined` | not path-like → not reached |

The environment boundary admits all three. The lint rule admits one.

**Guide sentence for the departure:** "The shell loads the package cascade through the relative stylesheet path `../../src/styles/index.scss`, because the root `tsconfig.json` is content-owned and carries no `@src/styles` alias. A generator that emits that alias must widen the `import/no-unassigned-import` allowlist in `.oxlintrc.json` in the same release: `import '@src/styles'` is an unassigned non-stylesheet import, and the vendored allowlist admits stylesheet paths alone."

## Q2 — the wrapper's composition

**Ruling: option (a), in the exact form the root's own `appJourney` factory already uses — spread a root factory's result and replace the differing fields by assignment.** Correct the census first: `configs/src/vite.styles.config.ts` and `configs/src/tsconfig.styles.json` are **not** content-owned. `blueprintToConfigArtifacts` claims a `configs/src/*` path only through `SRC_MATRIX[environment].configs` for each `blueprint.src` member (`scaffold/src/core/compilers.ts:948-970`), and `SRC_MATRIX` is closed on `core`, `browser`, `server`. Scaffold plans no styles config path, so `repair` never reaches either file and the package owns both outright. Nothing forces the leaf-only shape.

**Chosen shape** (`configs/src/vite.styles.config.ts`, whole file):

```ts
import { defineConfig } from 'vitest/config'
import { enforceBuildLog, outputBoundary } from '../helpers.js'
import { resolveWorkspacePath, srcBrowser } from '../../vite.config.ts'

const browser = srcBrowser()

// Replace the browser fields directly: `mergeOverride` cannot remove a base plugin, and the
// base's `outputBoundary('dist/src/browser')` throws on the styles output directory. What the
// base still supplies is the alias table, the disabled public directory, and the resolved
// Playwright provider, each of which the root resolves once for the whole workspace.
export default defineConfig({
	...browser,
	plugins: [
		outputBoundary('dist/src/styles'),
		{
			name: 'veneer-styles-rtl',
			enforce: 'post',
			generateBundle(_options, bundle) {
				const css = bundle['index.css']
				if (css?.type !== 'asset') throw new Error('The styles build emitted no index.css')
				// Every declaration is authored on the logical axis, which
				// `tests/setupStyles.test.ts` proves over the shipped cascade, so the two
				// directions share one byte stream.
				this.emitFile({ type: 'asset', fileName: 'index.rtl.css', source: css.source })
			},
		},
	],
	build: {
		emptyOutDir: true,
		outDir: 'dist/src/styles',
		lib: {
			entry: resolveWorkspacePath('src/styles/index.ts'),
			formats: ['es'],
			fileName: 'index',
			cssFileName: 'index',
		},
		rolldownOptions: { onLog: enforceBuildLog },
	},
	test: {
		...browser.test,
		name: { label: 'src:styles', color: 'cyan' },
		include: ['tests/src/styles/**/*.test.ts'],
		exclude: [],
		setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts', './tests/setupStyles.ts'],
	},
})
```

Three things this buys. The wrapper now imports the root config, which § Configuration authority requires (`workspace.md:61-68`). The alias table stops being re-derived — the root's module-local `resolve` (`veneer/vite.config.ts:34-40`) arrives through the spread instead of a second `tsconfig.compilerOptions.paths` reduction, so the two copies cannot drift. The Playwright provider stops being re-resolved — `browserOptions` is resolved once at `veneer/vite.config.ts:14` and arrives through `browser.test.browser`, instead of a second `resolveBrowser(resolvePinnedBrowser(), …)` call. The `../helpers.js` import that remains is the same leaf import the generated `configs/src/vite.browser.config.ts:2` carries beside its root import, so a leaf import beside the root import is the fleet's own generated form; a leaf import *instead of* the root import is what the rule refuses.

`enforceBuildLog` is added deliberately: it is the gate that turns a build warning into a failure, and every other build in this workspace carries it (`veneer/vite.config.ts:112, 141`). `sourcemap` and `minify` are left at Vite's lib defaults, exactly as today, so this refactor does not move the published byte set; whether the cascade should ship a sourcemap is a separate question with its own evidence.

**Options rejected**

- (b) keep declaring from the leaves — the wrapper imports `../helpers.js` and `../browsers.js` and no root config, which is what § Configuration authority (`workspace.md:68`) names, and it maintains a second alias table and a second browser resolution.
- `srcBrowser({ … })` through `mergeOverride` — `mergeOverride` cannot remove a base plugin (`veneer/vite.config.ts:54-62`), so `outputBoundary('dist/src/browser')` survives and `enforceOutputPath` throws on a `dist/src/styles` output (`veneer/configs/helpers.ts:373-377`).
- Add a `srcStyles` factory to the root `vite.config.ts` — `ownership: 'content'` (`scaffold/src/core/compilers.ts:929-934`), reverted by `repair`.
- Move the RTL plugin into `configs/helpers.ts` — that file is vendored and content-owned (`scaffold/src/core/constants.ts:139`), and `workspace.md:69-71` forbids a workspace-specific import there. The root's own `orkestrel-showcase-html` (`veneer/vite.config.ts:209-221`) establishes the inline named plugin object as the form; only its placement in a wrapper is the departure.

**Plugin name:** rename `veneer-logical-rtl` to `veneer-styles-rtl`. Every named plugin in this tree reads as owner plus subject plus artifact — `orkestrel-output-boundary`, `orkestrel-environment-boundary`, `orkestrel-showcase-html`. `logical-rtl` names the premise the plugin rests on; a reader reading a build failure needs what it emitted.

## Q3 — the project name

**Ruling: `{ label: 'src:styles', color: 'cyan' }`.** Every project the root registers uses the object form (`veneer/vite.config.ts:115, 150, 183, 252, 269, 283, 300, 317, 334, 351, 365, 386`); the bare string is the only one in the workspace and reads as an oversight rather than a decision.

The root's palette carries no host rule and no uniqueness rule: `src:core` magenta, `src:browser` yellow, `app:browser` blue, and `config` re-uses yellow while `setup:browser` re-uses blue. So the choice is legibility in the stream the label appears in, and `src:styles` never shares a stream with anything — it runs through its own `--config` (`package.json:64`). `cyan` is already proven valid in this file at `veneer/vite.config.ts:365`, and its one holder, `distribution`, runs from `prepublishOnly` in a separate invocation from `npm test`, so the two never print together.

**Options rejected:** the bare string — inconsistent with every sibling and gives the reporter no color; `blue` — would claim the `app:*` grouping for a `src:*` project; `red` — reads as failure in a test reporter.

## Q4 — the published surface

**Ruling: `./styles` stays the plain CSS string; add `./styles/rtl`; keep the ES wrapper emitted and unexported; keep `sideEffects` as it is.**

**Chosen shape** (`package.json:40`, one row added):

```json
"./styles": "./dist/src/styles/index.css",
"./styles/rtl": "./dist/src/styles/index.rtl.css",
```

`./styles` must stay a plain string target resolving to real CSS: `tests/distribution.test.ts:646-647` reads it through `createRequire(…).resolve(`${name}/styles`)` and writes the bytes to a `<link>`ed file, and `tests/distribution.test.ts:758-768` partitions a stylesheet subpath as "published for a reader rather than an importer". That is the contract the proof is written against, and it is also what a `<link>` consumer, a bundler consumer, and a Sass consumer all resolve identically.

`index.rtl.css` gets exported rather than dropped. It is a deliberate, proven output — `tests/setupStyles.test.ts:143-146` requires both directional files and `tests/setupStyles.test.ts:280-292` asserts `rtl` equals `ltr` — and Veneer's declared job is answering Bootstrap 5.3 contracts (`package.json:4`), of which `bootstrap.rtl.css` is one a migrating consumer's build references by name. Shipping bytes no specifier can address is the defect; the identity is the claim, and it has a test. Subpath vocabulary: `./styles/rtl` names the axis that varies against the entry it varies from. Rejected `./styles.rtl` (a dotted subpath reads as a file extension) and `./rtl` (drops the noun).

The ES wrapper stays emitted and unexported. `tests/conformance.test.ts:87-94` pins `styles/index.js` as a required build output and asserts its specifiers, and `workspace.md:99` lists the row's format as "ES wrapper", so it is documented and proven. Exporting it under an `import` condition of `./styles` is rejected: one specifier would then resolve to a JS module in a bundler and a CSS file under `require`, which is two artifacts behind one name, and it breaks the `require.resolve` reading the distribution proof takes.

`sideEffects: ["**/*.css"]` (`package.json:18-20`) stays. It is correct for the artifact a consumer can address, and it is exactly why the wrapper is not exported: making the wrapper reachable would oblige `sideEffects` to name it, or a bundler would tree-shake the import that exists only for its side effect.

## Q5 — build-before-test

**Ruling: the build-first ordering is right and stays. The defect is that a second project depends on the same artifact without saying so.**

`.claude/rules/styles.md:38` fixes the subject: "Verify every treatment against the shipped resolved cascade … the compiled output plus the stylesheet of every dependency the consumer loads." The proof's subject is the compiled artifact, so the proof reads the compiled artifact. A Vite-server compile of `src/styles/index.scss` is a different artifact from the lib build's output — different plugin chain, no `cssFileName`, and no `index.rtl.css` at all — so it would prove something the package does not ship. Rejected on that ground, along with an `@orkestrel/test` build helper: a grep of the installed package for an exported `build` returns nothing, so there is no such helper to route to.

**The finding the census missed.** `tests/setupStyles.ts:4` carries `import '../dist/src/styles/index.css'` at module scope, and `tests/setupStyles.test.ts:6` imports that module. The `setup` project collects `tests/setup*.test.ts` excluding `setupBrowser.test.ts` (`veneer/vite.config.ts:302-303`), so `setupStyles.test.ts` runs in **Node**, in a project whose script (`package.json:76`) builds nothing. On a clean `dist/`, `npm run test:setup` fails on an unresolved import. It passes today only because `npm test` happens to run `test:src:styles` before `test:setup` (`package.json:60`) — an ordering dependency nothing declares.

**Chosen shape:** move the cascade load from the module to the project that needs it, so `tests/setupStyles.ts` becomes a module of pure readers and the styles project declares its own artifact:

```ts
// configs/src/vite.styles.config.ts, inside test
setupFiles: [
	'./tests/setup.ts',
	'./tests/setupBrowser.ts',
	'./tests/setupStyles.ts',
	'./dist/src/styles/index.css',
],
```

with the `import '../dist/src/styles/index.css'` line deleted from `tests/setupStyles.ts:4`. The file's own remark at `tests/setupStyles.ts:284-287` already records that this module is loaded in Node as well as in the browser and that a Node project resolves a raw CSS import to an empty string; deleting the import is the change that remark is asking for.

That shape depends on Vitest accepting a stylesheet in `setupFiles`, which I have not run. **Fallback, if a probe says it does not:** keep the import where it is and chain the build into the script that needs it — `"test:setup": "npm run build:src:styles && vitest run … --project setup"` — so the dependency is stated where the failure happens rather than inherited from chain order.

Either way, no staleness gate is added. `AGENTS.md` § Minimal public API bars building the mechanism before a consumer needs it, and the `&&` in `test:src:styles` already closes the stale case for the scripted path.

## Q6 — what the guide records

**Ruling: a new `## Cascade` section in `guides/veneer.md`, placed between `## Examples` and `## Tokens`, with `guides/README.md:17` updated to name it.**

`guides/README.md:17-22` currently says "That guide's § Tokens is the reference for the stylesheet face", so a new H2 makes that sentence false and the same unit fixes it: § Cascade becomes the reference for the artifact and how it is produced, § Tokens stays the reference for what it declares. The README's decision that the styles face adds no concept-index row, and its `src/styles` directory-index row at line 31, are both already correct and need no change.

Placement reasoning: a reader finishing `## Examples` asks how to load the stylesheet; `## Tokens` then reads as that stylesheet's contents; `## Showcase` demonstrates it; `## Tests` proves it. Rejected: a subsection under `## Tokens` — the registry section's subsections are all token subjects, and build plumbing under a token heading is a second subject in one home. Rejected: a position before `## Tests` — it buries the consumer's loading instructions behind the maintainer's material.

**Contents, in order:**

- An opening paragraph naming the published artifact and one fence loading it through the published specifier, per `documentation.md` § Guide examples: `import '@orkestrel/veneer/styles'`, with the `@orkestrel/veneer/styles/rtl` sentence stating that the two files are byte-identical because every declaration is authored on the logical axis, and that a consumer needs no flip.
- `### Files` — a table of `src/styles/index.scss` (the sole compilation barrel), `src/styles/index.ts` (the side-effect entry and the build's lib entry), `configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`, `tests/setupStyles.ts`, `tests/src/styles/`.
- `### Build` — a table of `build:src:styles`, `check:src:styles`, `test:src:styles` with each one's contract, and the sentence that `test:src:styles` builds first because the proof's subject is the compiled cascade rather than the source graph.
- `### Departures from the workspace rows` — the numbered list that follows, each row with its cause, closing with the generator sentence. Named for its subject so it cannot be confused with the existing `### Departures from Bootstrap` at `guides/veneer.md:282`, which rules on product contracts rather than workspace rows.

Backtick discipline: the section names file paths and script names, never a bare identifier, so it adds nothing `tests/guides.test.ts` would read as a claimed public export.

## Q7 — what the census missed

1. **The styles config files are package-owned, not content-owned.** Stated under Q2; it is the finding that unlocks Q2 and the brief's Law section implies the opposite.
2. **`.oxlintrc.json` fences no `src/styles` environment.** The file carries a `no-restricted-imports` override for `src/core`, `src/browser`, `src/server`, `src/bin`, `app/core`, `app/browser`, `app/server` and none for `src/styles` (`.oxlintrc.json:122, 170, 214, 262, 306, 346, 390`), so the styles entry is fenced only by the generic `src/**` rules at lines 86, 95, and 109. The file is content-owned (`scaffold/src/core/constants.ts:145`), so Veneer cannot add the fence.
3. **The `import/no-unassigned-import` allowlist forecloses the documented alias.** Stated under Q1. This is the sharpest generator finding in the round: the alias row at `workspace.md:49` and the lint allowlist at `.oxlintrc.json:43-48` cannot both hold as written.
4. **`tests/config.test.ts` cannot see the axis.** Both per-environment loops iterate the literal `['core', 'browser', 'server']` (`veneer/tests/config.test.ts:111, 435`), and the plugin-drive list is the six generated owners (`2226-2229`). The vendored config proof therefore asserts nothing about the styles alias, wrapper, output directory, or scoped `lib`/`types` — confirming the brief's departure 7, and adding that the file is structurally incapable of covering it, not merely silent.
5. **`test:src` does not cover the styles axis.** `package.json:61` names `--project src:core --project src:browser` only, and `test` chains `test:src:styles` separately (`package.json:60`). `workspace.md:192` says to scope with `test:src`; the styles axis sits outside it because it runs through its own `--config`.
6. **The Node `setup` project silently depends on `build:src:styles`.** Stated under Q5.
7. **The `probe` workbench cannot name `src:styles`.** The project is unregistered in the root config, so `vitest --project src:styles` does not resolve there, and `guides/probe.md:479-509`'s inference that a test under `tests/src/<environment>/` names `src:<environment>` does not hold for this axis. A `prove` call about a styles case has no project to arm.
8. **`index.rtl.css` is outside the documented build-output row.** `workspace.md:99` lists `dist/src/styles` as "Compiled `index.css`", "ES wrapper", and names no second stylesheet.

**Present items the census read correctly:** `configs/src/tsconfig.styles.json` matches the `src:styles` typecheck scope row (`lib ["ESNext"]`, `types ["vite/client"]`, check-only — `workspace.md:216, 226`); `check:src` chains `check:src:styles` per `workspace.md:206`; `src/styles/index.ts` is the bare `import './index.scss'` entry per `workspace.md:35`; the project's setup file list matches `workspace.md:122`; and `workspace.md:190` ("Styles setup loads `setup.css` and the compiled cascade") is satisfied through composition, because `setup.css` arrives through `setupBrowser.ts` in the same list.

## Departures the pilot keeps

1. **No `@src/styles` alias; the shell imports the relative stylesheet.** *"The shell loads the package cascade through the relative stylesheet path `../../src/styles/index.scss`, because the root `tsconfig.json` is content-owned and carries no `@src/styles` alias. A generator that emits that alias must widen the `import/no-unassigned-import` allowlist in `.oxlintrc.json` in the same release: `import '@src/styles'` is an unassigned non-stylesheet import, and the vendored allowlist admits stylesheet paths alone."*
2. **The wrapper composes a sibling factory rather than its own.** *"`configs/src/vite.styles.config.ts` spreads the root's `srcBrowser()` result and replaces the plugins, the build, and the test fields, because the root `vite.config.ts` is content-owned and cannot carry a `srcStyles` factory. The spread is what keeps the alias table and the resolved browser provider single-sourced; `mergeOverride` cannot be used, because it cannot remove the browser output boundary and that plugin refuses the styles output directory."*
3. **The RTL plugin lives in the wrapper.** *"The `veneer-styles-rtl` plugin is declared inline in the styles wrapper, because `configs/helpers.ts` is vendored byte-identical to every workspace and the root `vite.config.ts` is content-owned, so a package-specific build plugin has no shared home."*
4. **No environment boundary owns `src/styles`.** *"The styles build carries `outputBoundary` and no `environmentBoundary`: the owner union in `configs/helpers.ts` names the six generated environments and no `src/styles`. `.oxlintrc.json` likewise fences every generated environment and not this one, so the styles entry is governed by the generic `src/**` rules. A generator that emits the axis adds both fences."*
5. **The axis has no root project registration.** *"`src:styles` is registered in its own wrapper rather than in the root projects list, so `vitest run --project src:styles` does not resolve and the `test` chain reaches the axis through `test:src:styles --config` instead of through `test:src`. The `probe` workbench cannot arm a `src:styles` case for the same reason."*
6. **The styles test builds before it runs.** *"`test:src:styles` runs `build:src:styles` first, because the proof's subject is the shipped cascade rather than the source graph, and no other `test:src:*` script needs a build."*
7. **The vendored config proof does not reach the axis.** *"`tests/config.test.ts` iterates the literal `core`, `browser`, `server` environment list, so it asserts nothing about the styles alias, wrapper, output directory, or scoped compiler options. Every fact in this section is proven by the styles suite and the distribution suite instead."*
8. **The build emits a second stylesheet the documented row does not name.** *"The build emits `index.rtl.css` beside `index.css`, exported as `@orkestrel/veneer/styles/rtl`. The two are byte-identical because every declaration is authored on the logical axis, which `tests/setupStyles.test.ts` proves; the file exists so a consumer migrating from Bootstrap's `bootstrap.rtl.css` finds the name their build already references."*

**The sentence a later generator reads:** *"Scaffold's `SRC_MATRIX` is closed on `core`, `browser`, and `server`, so a styles axis is hand-authored and its two configuration files are package-owned. Emitting the axis means adding five things scaffold does not have today: the `@src/styles` alias in the root `tsconfig.json`, the matching `import/no-unassigned-import` allowlist entry in `.oxlintrc.json`, a `src/styles` owner in `environmentBoundary` and a matching `.oxlintrc.json` fence, a `srcStyles` factory and project registration in the root `vite.config.ts`, and the `core`/`browser`/`server` environment lists in `tests/config.test.ts`. Until then, this section is the contract, and a generated axis must reproduce the file set and the script set it lists."*

## Writer routing

Two units, serialized, both dispatched after U3 exits, because U3 owns `tests/**` and `guides/` and every unit here touches one of them.

**U-styles-config → `sol` on GPT-5.6 Sol.** Owns `configs/src/vite.styles.config.ts`, the `package.json` `exports` row, `tests/setupStyles.ts:4`, and whichever of the `setupFiles` entry or the `test:setup` chain the probe selects. Every criterion is a resolved configuration, a build output set, or a runner collection behaviour, each independently checkable by running it: `npm run build:src:styles`, `npm run test:src:styles`, `npm run test:setup` from a cleaned `dist/`, `npm run test:config`, `npm run check:src:styles`, and `npm run test:distribution -- --mode release`. No naming or voice judgment remains in it once this ruling fixes the shape, and the failure mode it must avoid — a spread that silently drops `enforceBuildLog` or a plugin ordering that defeats `outputBoundary` — is exactly the mechanical-precision class. The Orchestrator settles the Vitest `setupFiles` stylesheet question with a throwaway probe before the brief is written, so the unit is not shipped a guess.

**U-styles-guide → `opus` on Opus 5.** Owns the `## Cascade` section in `guides/veneer.md`, the `guides/README.md:17-22` sentence, and the departure list with its generator sentence. Its whole content is placement, heading vocabulary, the one-guide rule, and prose that a scaffold author will read as a specification — the API-shape and documentation-voice class. It runs second because the config unit fixes the facts it states.

**Tensions this lane settled on judgment, for the objective lane to challenge:** the `cyan` label colour; the `veneer-styles-rtl` rename; exporting `./styles/rtl` rather than dropping the twin; leaving `sourcemap` and `minify` at Vite's defaults so the published byte set does not move; and the `setupFiles` stylesheet entry, which is a behavioural claim about Vitest that I did not run.
