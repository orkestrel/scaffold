Porcelain could not be recaptured in this session (the status command was refused). The checkout was clean at session start; this lane wrote nothing.

---

### 1. Emitted distribution proof — browser-face detection

**Template source.** The emitted `tests/distribution.test.ts` is `ARTIFACT_TEMPLATES.tests.distribution.proof` in `src/core/templates.ts`. `blueprintToTestArtifacts` fills it and claims the path by presence.

```1108:1114:src/core/templates.ts
		distribution: Object.freeze({
			proof: `// The artifact a consumer installs, measured rather than described. This workspace
			// is packed and installed into a throwaway consumer, and every following claim is read
			// off that installed tree: the exports map it publishes, the declarations it ships,
			// and the module objects a real runtime hands a consumer. Nothing here names this
			// package, one of its exports, or how many there are, so the proof stays true as
			// the published surface moves.
```

```1313:1328:src/core/compilers.ts
	if (blueprint.src.length > 0) {
		const browser = blueprint.src.includes('browser')
		const distribution = ARTIFACT_TEMPLATES.tests.distribution
		artifacts.push({
			path: DISTRIBUTION_TEST_PATH,
			group: 'tests',
			ownership: 'presence',
			origin: 'template',
			content: fillTemplate(distribution.proof, {
				types: browser ? distribution.types : '',
				transport: browser ? distribution.transport : '',
				launcher: browser ? distribution.launcher : '',
				helpers: browser ? distribution.helpers : '',
				drive: browser ? distribution.drive : '',
				guard: browser ? '' : distribution.guard,
			}),
		})
	}
```

**Classifier.** Prefix constant, then `Entry.browser` from the Vite/browser condition walk’s target.

```1145:1150:src/core/templates.ts
// The built output directory a browser face is published from. Every selection here
// reads this prefix off the export TARGET and never off the subpath name. A
// workspace whose only published face is the browser one publishes that face at the
// root subpath, so a rule keyed on the subpath name drives a browser bundle through
// Node and the miss is silent.
const BROWSER_OUTPUT = './dist/src/browser/'
```

```1642:1657:src/core/templates.ts
		const module = resolveTarget(entry, RUNTIME_CONDITIONS.browser)
		entries.push({
			subpath,
			specifier: subpath === '.' ? name : `\${name}\${subpath.slice(1)}`,
			mapping: entry,
			declaration: {
				// ...
			},
			browser: module !== undefined && module.startsWith(BROWSER_OUTPUT),
			module: imported !== undefined,
			commonjs,
			required,
		})
```

`RUNTIME_CONDITIONS.browser` is `['module', 'browser', 'production', 'import']` at `src/core/templates.ts:1177-1181`.

**Consumers of `entry.browser`.**

- Totality: a driven entry with no Node import, no require, and no browser flag reddens.

```1739:1742:src/core/templates.ts
		const unreachable = stage.entries.filter(
			(entry) => !entry.module && !entry.required && !entry.browser,
		)
		expect(unreachable.map((entry) => entry.subpath)).toStrictEqual([])
```

- Node import drive retires when `entry.browser` is true.

```1788:1789:src/core/templates.ts
		it.runIf(entry.module && !entry.browser)(
			'publishes what it declares to a Node import, and no more',
```

- Node require drive retires when `entry.browser` is true.

```1800:1801:src/core/templates.ts
		it.runIf(!entry.browser && entry.required)(
			'publishes what it declares to a Node require, and no more',
```

- Browser drive (filled only when the blueprint publishes `src` browser).

```1921:1922:src/core/templates.ts
		it.runIf(entry.browser)(
			'publishes what it declares to a real browser, and no more [requires a browser]',
```

- Core-only guard (filled when the blueprint does **not** publish `src` browser): any `entry.browser` reddens.

```1960:1963:src/core/templates.ts
	it('publishes no browser face this proof cannot drive [requires the registry]', (context) => {
		const stage = requireStage(context)
		const faces = stage.entries.filter((entry) => entry.browser)
		expect(faces.map((entry) => entry.subpath)).toStrictEqual([])
```

**State.** Classification is prefix-on-resolved-target, not “did the walk hit the `browser` condition name.” Scaffold’s own `tests/distribution.test.ts` is a different, presence-owned proof and does not contain `BROWSER_OUTPUT`.

---

### 2. Emitted distribution proof — `commonjs` selector

**Condition-name sets.**

```1177:1192:src/core/templates.ts
const RUNTIME_CONDITIONS = Object.freeze({
	module: Object.freeze(['node-addons', 'node', 'import', 'module-sync']),
	commonjs: Object.freeze(['node-addons', 'node', 'require', 'module-sync']),
	browser: Object.freeze(['module', 'browser', 'production', 'import']),
})
const BUNDLER_CONDITIONS = Object.freeze({
	module: ['types', 'import'],
	commonjs: ['types', 'require'],
})
const DECLARATION_CONDITIONS = Object.freeze({
	module: ['types', 'node', 'import'],
	commonjs: ['types', 'node', 'require'],
	browser: BUNDLER_CONDITIONS.module,
})
```

**Walk helper.** `resolvePackageTarget` continues only through names in the supplied list (`default` always). `resolveTarget` and `resolveDeclaration` call it.

```1335:1354:src/core/templates.ts
function resolvePackageTarget(
	entry: unknown,
	conditions: readonly string[],
): TargetResolution | undefined {
	if (typeof entry === 'string') return { target: entry }
	if (isList(entry)) {
		for (const member of entry) {
			const resolved = resolvePackageTarget(member, conditions)
			if (resolved !== undefined && isPackageTarget(resolved.target)) return resolved
		}
		return undefined
	}
	if (!isRecord(entry)) return undefined
	for (const [condition, nested] of Object.entries(entry)) {
		if (condition !== 'default' && !conditions.includes(condition)) continue
		const resolved = resolvePackageTarget(nested, conditions)
		if (resolved !== undefined) return resolved
	}
	return undefined
}
```

**Selector.** `selectEntries` keeps an entry if the walk under the driver’s condition list hits a target, and, when that list includes `require`, if `entry.commonjs` is true.

```1489:1496:src/core/templates.ts
function selectEntries(entries: readonly Entry[], conditions: readonly string[]): readonly Entry[] {
	return entries.filter(
		(entry) =>
			resolveTarget(entry.mapping, conditions) !== undefined &&
			(!conditions.includes('require') || entry.commonjs),
	)
}
```

`entry.commonjs` is set from `resolvesCommonJS`, which walks `DECLARATION_CONDITIONS.commonjs` then reads the declaration’s format (`.d.cts` / `.d.mts` / `.d.ts` + nearest `type`).

```1438:1444:src/core/templates.ts
function resolvesCommonJS(entry: unknown, installed: string): boolean {
	const declaration = resolveDeclaration(entry, DECLARATION_CONDITIONS.commonjs, installed)
	if (declaration === undefined) return false
	if (declaration.endsWith('.d.cts')) return true
	if (declaration.endsWith('.d.mts')) return false
	return declaration.endsWith('.d.ts') && readPackageType(installed, declaration) !== 'module'
}
```

```1639:1657:src/core/templates.ts
		const imported = resolveTarget(entry, RUNTIME_CONDITIONS.module)
		const commonjs = resolvesCommonJS(entry, installed)
		const required = resolveTarget(entry, RUNTIME_CONDITIONS.commonjs) !== undefined
		const module = resolveTarget(entry, RUNTIME_CONDITIONS.browser)
		entries.push({
			// ...
			module: imported !== undefined,
			commonjs,
			required,
		})
```

**Where the walk feeds CommonJS consumer checks.**

- Compile probe: each resolution’s `conditions[format]` (including `.commonjs`) goes through `selectEntries`, then `writeConsumerProbe` / `compileConsumer`.

```1765:1771:src/core/templates.ts
		for (const driver of RESOLUTIONS) {
			for (const [extension, format] of FORMATS) {
				const written = selectEntries(stage.entries, driver.conditions[format])
				if (written.length === 0) continue
				const specifiers = written.map((entry) => entry.specifier)
				const probe = writeConsumerProbe(stage, \`probe.\${driver.label}.\${extension}\`, specifiers)
```

- Runtime require drive uses `entry.required` (the `RUNTIME_CONDITIONS.commonjs` walk, which includes `module-sync`) and `entry.declaration.commonjs`.

```1800:1808:src/core/templates.ts
		it.runIf(!entry.browser && entry.required)(
			'publishes what it declares to a Node require, and no more',
			(context) => {
				const declaration = entry.declaration.commonjs
				// ...
				const published = driveRuntime(requireStage(context), entry.specifier, CJS_DRIVER)
```

- `selectUntypable` uses `entry.required` plus an explicit `require` key plus `!entry.commonjs` (`src/core/templates.ts:1501-1508`), asserted at `src/core/templates.ts:1743-1744`.

**State.** CommonJS membership is still gated by which condition **names** the walker is allowed to enter. `resolvesCommonJS` then filters on declaration format. The `module-sync` name lives only on the runtime condition list used for `entry.required`.

---

### 3. Vendored `tests/config.test.ts` template

**There is no `templates.ts` emission for this suite.** It is a host path. Core plans it as presence; hydration turns it into content. `blueprintToTestArtifacts` does not emit it.

```143:145:src/core/constants.ts
	'tests/setupPolicy.ts',
	'tests/policy.test.ts',
	'tests/config.test.ts',
```

```1175:1176:src/core/compilers.ts
 * `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are
 * fleet-invariant host artifacts and therefore do not appear here.
```

```1498:1504:src/core/compilers.ts
export function nameToHostArtifacts(name: string): readonly Artifact[] {
	return selectHostPaths(HOST_PATHS, name).map((path): Artifact => ({
		path,
		group: inferGroup(path),
		ownership: 'presence',
		origin: 'host',
	}))
}
```

Scaffold’s materialized copy **is** that same file: `/home/user/scaffold/tests/config.test.ts`. Guide: `guides/scaffold.md:929-931`.

**Scripts assertion block** (`it('registers proof scripts in the correct gate')`). Publishing vs private is `private !== true`. The always-on trio is `test:config`’s exact command, `test` containing `npm run test:config`, and `prepublishOnly` existing iff the package publishes. Optional proofs (`distribution`, `integration`, `conformance`, `service`) are asserted only from the registered project set. There is no `prepack` assertion in this file.

```441:498:tests/config.test.ts
	it('registers proof scripts in the correct gate', () => {
		const manifest: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
		// ...
		const publishes = Object.getOwnPropertyDescriptor(manifest, 'private')?.value !== true
		const test = Object.getOwnPropertyDescriptor(scripts, 'test')?.value
		const config = Object.getOwnPropertyDescriptor(scripts, 'test:config')?.value
		// ...
		const publish = Object.getOwnPropertyDescriptor(scripts, 'prepublishOnly')?.value
		// ...
		expect(config).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project config',
		)
		expect(typeof test === 'string' && test.includes('npm run test:config')).toBe(true)
		// ...
		expect(typeof publish === 'string' && publish.includes('npm run test:distribution')).toBe(
			hasDistribution && publishes,
		)
		expect(typeof publish === 'string').toBe(publishes)
```

Service gate split (same test): `test` gets `test:service` when `hasService && !publishes`; `prepublishOnly` gets it when `hasService && publishes` (`tests/config.test.ts:529-534`).

**State.** The vendored suite and scaffold’s copy are one file. Publishing is `private !== true`. `prepack` is not asserted here.

---

### 4. Generated `vite.config.ts` factory signature

**Declarations** (`(options?: UserConfig): UserConfig`) live in `CONFIG_TEMPLATES.factories`:

| Factory | Site |
|---|---|
| `srcCore` | `src/core/templates.ts:103` |
| `srcBrowser` | `src/core/templates.ts:125` |
| `srcServer` | `src/core/templates.ts:163` |
| `srcBin` | `src/core/templates.ts:198` |
| `appCore` | `src/core/templates.ts:241` |
| `appBrowser` | `src/core/templates.ts:288` |
| `appServer` | `src/core/templates.ts:292` |
| `policy` | `src/core/templates.ts:324` |
| `config` | `src/core/templates.ts:339` |
| `setup` | `src/core/templates.ts:357` |
| `guides` | `src/core/templates.ts:372` |
| `conformance` | `src/core/templates.ts:390` |
| `service` | `src/core/templates.ts:408` |
| `distribution` | `src/core/templates.ts:426` |
| `probe` | `src/core/templates.ts:448` |
| `integration` | `src/core/templates.ts:466` |

Related, different signatures: `applicationBrowser(showcase: boolean): UserConfig` at `src/core/templates.ts:258`; `appShowcase(): UserConfig` filled in `src/core/compilers.ts:802-807` into `{{showcaseFactory}}` (`src/core/templates.ts:291`). Root import is `import type { {{viteTypes}} } from 'vite'` (`src/core/templates.ts:63`).

**Bare references into `test.projects`.** `blueprintToRootVite` pushes factory **names**, never calls.

```817:821:src/core/compilers.ts
		// The row is the factory itself, never a call of it. Vitest reads
		// `import.meta.env.MODE` as the command line's `--mode` only inside a project
		// it calls, so an evaluated row silently turns the release-mode publish gate
		// into a skip.
		projects.push('appBrowser')
```

Push sites: `srcCore` `src/core/compilers.ts:685`, `srcBrowser` `:709`, `srcServer` `:742`, `srcBin` `:746`, `appCore` `:750`, `appBrowser` `:821`, `appServer` `:825`, `policy` `:828`, `config` `:830`, `setup` `:833`, `guides` `:837`, `conformance` `:841`, `service` `:845`, `distribution` `:849`, `integration` `:857`, `probe` `:860`. Joined into `test.projects` at `:862-867`, filled at `:889`.

**Scaffold’s own `vite.config.ts`:** `srcCore` `:32`, `srcServer` `:54`, `srcBin` `:105`, `policy` `:146`, `config` `:161`, `guides` `:179`, `distribution` `:195`, `probe` `:217`; `projects: [srcCore, srcServer, srcBin, policy, config, guides, distribution, probe]` at `:238`. This package does not declare `srcBrowser`, `app*`, `setup`, `conformance`, `service`, or `integration`.

**`configs/`** do not declare the factory type. They **call** it with a `UserConfig` object (or with no args):

- Templates: `srcCore({...})` `src/core/templates.ts:612`, `srcBrowser({...})` `:657`, `srcServer({...})` `:681`, `srcBin({...})` `:706`, `appBrowser()` `:722`, `appServer()` `:727`, `appShowcase()` `:732`.
- Materialized: `configs/src/vite.core.config.ts:6-7`, `configs/src/vite.server.config.ts:9-10`, `configs/src/vite.bin.config.ts:9-10`.

**State.** Every selected factory is typed as `(options?: UserConfig)` and registered as a bare identifier. Wrappers pass `UserConfig` literals (or call with no argument). Changing the declared parameter to the `ConfigEnv` Vitest actually passes would retouch those factory declarations, the `projects` join, scaffold’s `vite.config.ts`, and the wrapper call sites.

---

### 5. Birth-owned `tests/setup*.ts` seeds

**Ownership mark.** `blueprintToTestArtifacts` plans each selected setup module with `ownership: 'birth'` and seed text from `ARTIFACT_TEMPLATES.tests.setup` (empty string) or `.global`.

```1086:1088:src/core/templates.ts
	tests: Object.freeze({
		setup: '',
		global: `export function setup(): void {}
```

```1203:1253:src/core/compilers.ts
export function blueprintToTestArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const artifacts: ContentArtifact[] = [
		{
			path: 'tests/setup.ts',
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.tests.setup,
		},
	]
	if (blueprint.src.includes('browser') || blueprint.app.includes('browser')) {
		artifacts.push({
			path: 'tests/setupBrowser.ts',
			// ...
			ownership: 'birth',
			content: ARTIFACT_TEMPLATES.tests.setup,
		})
	}
	// setupServer.ts, tests/setupService.ts: same seed, birth
	if (blueprint.global) {
		artifacts.push({
			path: GLOBAL_SETUP_PATH, // tests/setupGlobal.ts
			ownership: 'birth',
			content: ARTIFACT_TEMPLATES.tests.global,
		})
	}
```

Guide restates the set: `guides/scaffold.md:918-927`.

**`audit` / `repair` vs seed.** `inferDrift` never compares birth-owned bytes; the verdict is always `aligned`. `artifactToFinding` / `planToFindings` use that. `Materializer.repair` writes only `missing` or `stale`, so a birth-owned path is always skipped.

```481:485:src/core/helpers.ts
export function inferDrift(artifact: Artifact, observed?: string): Exclude<Drift, 'foreign'> {
	if (artifact.ownership === 'birth') return 'aligned'
	if (observed === undefined) return 'missing'
	if (artifact.ownership === 'presence') return 'aligned'
	return observed === artifactToHex(artifact) ? 'aligned' : 'stale'
}
```

```174:177:src/core/Compiler.ts
	 * Ownership decides each verdict, not absence. A birth-owned path is never
	 * compared and reads `aligned` against a target holding nothing, while a
	 * content-owned path with no bytes to read is `missing`.
```

```305:309:src/server/Materializer.ts
		for (const artifact of hydrated.artifacts) {
			const drift = drifted.get(artifact.path)
			if (drift !== 'missing' && drift !== 'stale') {
				skipped.push(artifact.path)
				continue
```

**Current-seed comparison (not history).** `CLI.#setupQuestion` treats a module as filled when trimmed text differs from **this** blueprint’s planned seed at that path. `audit` reports it; writing verbs do not.

```1285:1326:src/bin/CLI.ts
	// A module counts as filled when its text differs from the seed this blueprint
	// plans at that same path, with both sides read trimmed.
	#setupQuestion(target: string, blueprint: Blueprint): TargetQuestion | undefined {
		// ...
		const seeds = new Map(
			blueprintToTestArtifacts(blueprint).map(({ path, content }) => [path, content.trim()]),
		)
		const modules = entries
			.filter((path) => {
				// root tests/setup*.ts, not .test.ts, not HOST_PATHS
				const content = (readFileText(tests, path) ?? '').trim()
				return content !== '' && content !== (seeds.get(`tests/${path}`) ?? '')
			})
```

Guide names the release-skew limit: `guides/scaffold.md:640-646` — a target keeps the seed of the release that materialized it; a later planned-seed move raises the question against a module scaffold wrote.

**Mechanism that would have to hold seed history.** `#setupQuestion`’s `seeds` map is built only from the current `blueprintToTestArtifacts` contents (`ARTIFACT_TEMPLATES.tests.setup` and `.global`). There is no list, table, or versioned store of prior seeds. Treating “any seed the blueprint has ever planned at that path” as unfilled would have to live in that comparison (and in the seed constants it reads).

---

### Unknowns

- Live `git -C /home/user/scaffold status --porcelain` could not be run here (the command was refused before and after). Session-start git status showed a clean tree on `claude/new-session-hxonen`. This lane made no writes.
- Whether `resolvesCommonJS` already closed either ROADMAP CommonJS vector is not settled from these sites alone: the compile selector still first requires a hit under a named condition list, and `entry.required` still uses a list that includes `module-sync`.
- Scaffold’s own `tests/distribution.test.ts` is not the emitted template; no check was made of whether a generated copy exists elsewhere under `tmp/` or a packed tree.
