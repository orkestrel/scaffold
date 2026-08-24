Work complete. Report follows.

---

# SD4 — zero-parameter project factories

## What changed (owned files)

**`/home/user/scaffold/src/core/templates.ts`** — every emitted project factory sealed.

- `:64` root config import drops `mergeConfig`: `import { defineConfig } from 'vitest/config'`. Nothing in an emitted root configuration merges any more, so leaving the binding would emit an unused import into every generated workspace and fail its own `noUnusedLocals` and `no-unused-vars`.
- `:103, :121, :155, :186, :225, :272, :300, :311, :325, :336, :350, :364, :378, :396, :410` — `srcCore`, `srcBrowser`, `srcServer`, `srcBin`, `appCore`, `appServer`, `policy`, `config`, `setup`, `guides`, `conformance`, `service`, `distribution`, `probe`, `integration` are now `export const NAME = (): UserConfig => ({ … })`. The `mergeConfig(base, options ?? {})` spine is gone and each body is dedented two levels.
- `:268` `export function appBrowser(): UserConfig { return applicationBrowser(false) }`. `applicationBrowser(showcase: boolean)` is untouched: it is not exported and not a project row.
- `:399` `probe` label color `'gray'` → `'black'` (forced; see deviation 3).
- `:546/:552`, `:587/:597`, `:612/:621`, `:637/:646` — the four wrappers compose: `import { defineConfig, mergeConfig } from 'vite'` and `defineConfig(mergeConfig(srcCore(), { … }))`. `:574` annotates `fileName: (format: string)`, because the override object is no longer contextually typed by the factory parameter.

**`/home/user/scaffold/src/core/compilers.ts`** — fill indentation only, no structural change (deviation 2).

- `:707-712`, `:731-738` external-predicate continuation lines 6 tabs → 4.
- `:713-715`, `:739-751` `output` fills 5 tabs → 3 (array element lines with them).
- `:716`, `:720`, `:753`, `:868` `exclude` and `globalSetup` fills 4 tabs → 2.

**`/home/user/scaffold/vite.config.ts`** — the same seal on this package's own eight factories (`:32, :50, :97, :134, :145, :159, :171, :189`), `mergeConfig` dropped from `:2`, `probe` color at `:192`. The `projects` row at `:196` is unchanged: bare identifiers.

**`/home/user/scaffold/configs/src/vite.core.config.ts` `:1, :7, :29`**, **`vite.server.config.ts` `:1, :10`**, **`vite.bin.config.ts` `:1, :10`** — `mergeConfig(factory(), { … })` with `mergeConfig` imported beside `defineConfig`.

**`/home/user/scaffold/tests/src/core/templates.test.ts`** — the new pin and its controls.

- `:539` `findParameters` reads exported declarations returning `UserConfig` off the TypeScript parser, not off text. `:567` `plantParameter` re-opens `policy`, which every emitted root configuration declares.
- `:908` new test `declares every emitted project factory without a parameter list`: template-text control (`:914-918`), then the sweep over every module of the selection matrix with a per-module plant control (`:920-931`) so an empty finding cannot be an unread module.
- `:997` the existing emitted-workspace typecheck test inverts into the seal's control: planting `appBrowser({ publicDir: false })` into a project row must now report `Expected 0 arguments, but got 1`. Its template assertions at `:998-1002` follow the new declaration.

`tests/src/core/fixtures/` was **not** touched: `setup-false-manifest.txt` is the only fixture there and carries a manifest, no generated config text (`grep -l 'UserConfig\|mergeConfig\|srcCore' tests/src/core/fixtures/` → no match).

## Failing-first evidence

Instrument red against the pre-change sources (`src/core/templates.ts` and `src/core/compilers.ts` temporarily restored from `HEAD`, then restored):

```
× declares every emitted project factory without a parameter list 16ms
AssertionError: expected 'export const policy = (options?: User…' not to be 'export const policy = (options?: User…'
 Tests  1 failed | 27 skipped (28)
```

The membership rule's own reach, measured on the same baseline sources by a throwaway probe (`tmp/probe/factory-parameters.test.ts`, deleted):

```
+   "srcCore", "srcBrowser", "srcServer", "srcBin", "appCore", "appBrowser",
+   "appServer", "policy", "config", "distribution", "integration", "probe",
 Tests  1 failed | 5 passed (6)
```

Same probe against the post-change sources: `Test Files 3 passed (3) | Tests 6 passed (6)`. Probe deleted; the two pre-existing probes (`sd0-vector-probe.test.ts`, `sd1-classifier-table.test.ts`) are untouched.

## Gate tails

1. Scoped format and lint over all seven owned files: `oxfmt --check` → `All matched files use the correct format.` exit 0; `oxlint` exit 0.
2. `npm run check` — **red on four pre-existing errors**, none in an owned file:

```
tests/src/bin/CLI.test.ts(1745,11): error TS7053: … '"test:probe"' can't be used to index type '{ deploy: string; }'.
tests/src/bin/CLI.test.ts(1746,11): … '"test:bench"' …
tests/src/bin/CLI.test.ts(1826,11): … '"test:probe"' … '{ 'test:config': string; }'.
tests/src/bin/CLI.test.ts(1827,11): … '"test:bench"' …
```

I measured the identical four at baseline commit `1b39fa0` before making any edit, by restoring `vite.config.ts` and re-running the same command. Because root `tsc` fails first, `check:src` never runs under `check`, so I ran it directly: `npm run check:src` → `check:src exit:0` (core, server, bin).

3. `npm run test:src:core`:

```
Test Files  1 failed | 7 passed (8)
     Tests  8 failed | 352 passed (360)
```

All eight failures are in `tests/src/core/compilers.test.ts`, which the brief makes off-limits. Scoped to the file I own: `npx vitest run --project src:core tests/src/core/templates.test.ts` → `Test Files 1 passed (1) | Tests 28 passed (28)`, including the oxfmt fixed-point over the emitted corpus (which is what proved the fill indentation above) and the emitted-workspace typecheck control.

4. `npm run test:config`:

```
host-inventory: entries=108
Test Files  1 passed (1)
     Tests  44 passed (44)
```

The name-keyed factory lookup still resolves every row, and Vitest ran that project from a zero-parameter row, so no runtime rejection.

5. Extra reading, not required by the brief: a throwaway probe loaded all three materialized wrappers through `loadConfigFromFile` and asserted the factory's fields (`onLog`, `sourcemap`, `publicDir`, `test.name`) and the wrapper's own (`lib`, `external`) both survive the compose — passed; its negative control (wrong label) reported red. Probe deleted.

## Diffstat and status

```
 configs/src/vite.bin.config.ts    |   4 +-
 configs/src/vite.core.config.ts   |   6 +-
 configs/src/vite.server.config.ts |   4 +-
 src/core/compilers.ts             |  62 ++--
 src/core/templates.ts             | 580 +++++++++++++++++---------------------
 tests/src/core/templates.test.ts  |  86 +++++-
 vite.config.ts                    | 342 ++++++++++------------
 7 files changed, 530 insertions(+), 554 deletions(-)
```

```
 M configs/src/vite.bin.config.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M src/core/compilers.ts
 M src/core/templates.ts
 M tests/src/core/templates.test.ts
 M vite.config.ts
?? .orkestrel/campaign/g-sd7-directional.md
```

The untracked campaign file is not mine; it was present before this unit wrote anything.

## Digest half — verified, nothing to regenerate

- `grep -n 'options?: UserConfig\|UserConfig' guides/scaffold.md` → no match. `grep -n 'srcCore\|appBrowser\|appShowcase\|factory\|factories' guides/scaffold.md` → one hit, `:760`, quoting the runtime message `integration has no project factory or configuration`, which names no parameter. No guide sentence names the factory parameter, so the deviation contract's first stop condition did not fire.
- `grep -n vite host.json` → no match. `grep -n 'configs' host.json` → only `configs/helpers.ts` (`:526`) and `configs/policy.ts` (`:532`). No owned file is inventoried, `host.json` is unchanged, and the config suite's inventory check passed at 108 entries.

## Deviations

**1. Eight assertions in the off-limits `tests/src/core/compilers.test.ts` pin the old signature.** They are report-only. Exact patch, verified against the real emitted bytes (`external:` at 3 tabs with 4-tab continuations, `srcBrowser` `provider:` at 3 tabs, `applicationBrowser` `provider:` unchanged at 4):

`:457`
```
-		expect(configuration).toContain('export const setup = (options?: UserConfig): UserConfig =>')
+		expect(configuration).toContain('export const setup = (): UserConfig => ({')
```
`:537`
```
-		expect(configuration).toContain('export const guides = (options?: UserConfig): UserConfig =>')
+		expect(configuration).toContain('export const guides = (): UserConfig => ({')
```
`:564-566`
```
-		expect(configuration).toContain(
-			'export const distribution = (options?: UserConfig): UserConfig =>',
-		)
+		expect(configuration).toContain('export const distribution = (): UserConfig => ({')
```
`:1025-1037`
```
-	// `appBrowser` is a project row, so Vitest calls it and the signature has to accept
-	// the argument it is called with. `appShowcase` is registered nowhere and is reached
-	// only by the showcase wrapper's own call, so it stays argument-free. The seal is the
-	// signature rather than a runtime refusal beside it. `appShowcase` is generated inline
-	// here while `appBrowser` comes from the template, so one spelling drifting from the
-	// other is the failure this catches.
-	it('opens the registered browser factory and seals the unregistered showcase one', () => {
+	// Neither factory takes an argument. `appBrowser` is a project row, so Vitest calls
+	// it with its own environment record, and a parameter there merged those fields into
+	// the configuration it returned. `appShowcase` is registered nowhere and is reached
+	// only by the showcase wrapper's own call. `appShowcase` is generated inline here
+	// while `appBrowser` comes from the template, so one spelling drifting from the other
+	// is the failure this catches.
+	it('seals every application browser factory against a caller argument', () => {
 		const config = blueprintToRootVite(buildBlueprint({ app: ['browser'], showcase: true }))
 		expect(config).toContain('export function appShowcase(): UserConfig {')
-		expect(config).toContain('export function appBrowser(options?: UserConfig): UserConfig {')
-		expect(config).toContain('return mergeConfig(applicationBrowser(false), options ?? {})')
+		expect(config).toContain('export function appBrowser(): UserConfig {')
+		expect(config).toContain('return applicationBrowser(false)')
 		expect(config).not.toContain('never[]')
 		expect(config).not.toContain('overrides are not permitted')
 	})
```
`:1197-1215` (four strings in one test)
```
-		expect(measured).toContain(
-			'export const conformance = (options?: UserConfig): UserConfig =>\n\tmergeConfig(\n',
-		)
+		expect(measured).toContain('export const conformance = (): UserConfig => ({\n\tresolve,\n')
 		expect(measured).toContain("include: ['tests/conformance.test.ts']")
-		expect(measured).toContain("setupFiles: ['./tests/setup.ts'],\n\t\t\t\tenvironment: 'node',")
+		expect(measured).toContain("setupFiles: ['./tests/setup.ts'],\n\t\tenvironment: 'node',")
…
-		expect(live).toContain(
-			'export const service = (options?: UserConfig): UserConfig =>\n\tmergeConfig(\n',
-		)
+		expect(live).toContain('export const service = (): UserConfig => ({\n\tresolve,\n')
…
-		expect(live).toContain('\t\t\t\tfileParallelism: false,\n')
+		expect(live).toContain('\t\tfileParallelism: false,\n')
```
`:1253` (inside the import-span assertion string)
```
-			"import type { UserConfig } from 'vite'\nimport { defineConfig, mergeConfig } from 'vitest/config'\nimport manifest…
+			"import type { UserConfig } from 'vite'\nimport { defineConfig } from 'vitest/config'\nimport manifest…
```
`:1318`
```
-		expect(published).toContain('\t\t\t\t\tprovider: playwright(browserOptions),\n')
+		expect(published).toContain('\t\t\tprovider: playwright(browserOptions),\n')
```
(`:1319`, the `application` line at four tabs, stays as it is.)
`:1332-1343` — each of the four external spans loses two tabs from the `external:` line and two from every continuation, for example:
```
-			"\t\t\t\t\texternal: (id: string) =>\n\t\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
+			"\t\t\texternal: (id: string) =>\n\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
```
The other three follow the same rule; their inner clause lists are unchanged.

**2. `src/core/compilers.ts` was touched for a reason the brief's clause does not name.** The brief grants the file "only if a factory emission site literally carries the parameter text". No site does — `appShowcase` was already zero-parameter and the `projects` join is untouched. But the fills in `blueprintToRootVite` carry hard-coded tab depths sized for the old `mergeConfig(\n\t\t{\n\t\t\t…` nesting, so sealing the factories makes those fills false and the emitted configuration mis-indented. The file is on the owned list, so I made the indentation change rather than shipping generated code the vendored `format:check` refuses; the emitted corpus's oxfmt fixed-point test is what fixed the exact depths. No behaviour, selection, or structure in that file moved.

**3. `probe`'s label color `'gray'` is not a valid `LabelColor` and had to change.** `mergeConfig` returned `Record<string, any>`, so the literal was never checked. With `(): UserConfig` the checker reads it: `vite.config.ts(192,27): error TS2322: Type '"gray"' is not assignable to type 'LabelColor | undefined'.` The declaration is `type LabelColor = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white"` (`node_modules/vitest/dist/chunks/traces.d.D2T_R8rx.d.ts:35`). I took `'black'`, the only member no other project uses. Nothing else pinned `'gray'`: it appeared at exactly two sites, both owned.

**4. `npm run check` was already red at the baseline.** The four `tests/src/bin/CLI.test.ts` errors reproduce on commit `1b39fa0` with my `vite.config.ts` reverted, so they arrived with the script-refresh unit rather than with this one. The file is off-limits here and I have not diagnosed it. This criterion cannot close through owned files alone.

**5. Ruling 4's second pin is not carried by this unit.** The ruling names "a sentinel-env invocation test asserting env fields do not enter the returned config" beside the emitted-template check. The compile-time half now exists as the `Expected 0 arguments` control at `tests/src/core/templates.test.ts:997`, but a JavaScript caller can still reach a row with `Reflect.apply(row, undefined, [env])`, so the runtime claim is not vacuous. Its home is the root-configuration proof `tests/config.test.ts`, which this brief marks vendored and off-limits, so it needs a carrier in a vendored-host unit. I wrote no patch for it, because a vendored edit re-propagates across the fleet and is SD3-class work.

Everything else in the brief closed. No commits, installs, or tree-wide mutating commands were run.