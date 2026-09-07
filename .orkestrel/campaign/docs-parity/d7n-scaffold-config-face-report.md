# Report — `d7n-scaffold-config-face`

## Deviation report

**Expected:** Item 1's expected root is `resolve(root, 'src/<face>')` for the walked `face`, so the scratch-copy proof against `/home/user/fleet/sqlite` (server-only) resolves `face === 'server'` and passes with `scope.root === resolve(root, 'src/server')`.

**Found:** The scratch-copy run resolves `face === 'server'` correctly (the walk and the reworded errors work as specified), but the root assertion fails:

```text
$ cd <scratch-copy> && npm run test:config
FAIL |config| tests/config.test.ts > configuration helpers > reads the compiler scope and fixed extractor override a declaration roll-up requires
AssertionError: expected '.../p24-sqlite-config/src' to be '.../p24-sqlite-config/src/server'
Test Files  1 failed (1)
     Tests  1 failed | 171 passed | 1 skipped (173)
```

**Evidence:** `sqlite`'s single-face project sets `rootDir` to the shared `src` directory, not `src/<face>`:

```json
// /home/user/fleet/sqlite/configs/src/tsconfig.server.json
"rootDir": "../../src",
"outDir": "../../dist/src"
```

against scaffold's own multi-face project:

```json
// /home/user/scaffold/configs/src/tsconfig.core.json
"rootDir": "../../src/core",
"outDir": "../../dist/src/core"
```

`configHelpers.parseProjectScope` reads `rootDir` from the compiler's own `--showConfig` output, so `scope.root` reflects each workspace's actual committed value rather than a `src/<face>` convention. A single-face target's `configs/src/tsconfig.<face>.json` need not scope `rootDir` under a per-face subdirectory, so the item 1 root derivation `resolve(root, 'src/<face>')` does not hold for every workspace shape the case must pass in, which is the objective this unit exists to satisfy.

**Done / not done:**
- Face walk, reworded errors, and derived project path (item 1's first half): done, and pass in both scaffold's own tree and the scratch copy.
- The `resolve(root, 'src/<face>')` root assertion (item 1's second half): not done — it is the literal text the brief specifies, but it reds the target case in a real vendored server-only shape, so the objective ("passes in every workspace shape the host vendors it into") is not met as written.
- Item 2 (scratch-copy proof): done; ran without touching `/home/user/fleet/sqlite`.

**Hypothesis:** The expected root must be read the same way `scope.root` is — from the workspace's own `rootDir`, or compared only against the compiler's own reading through a second independent mechanism — rather than assumed as `src/<face>`; that is a design decision for the case, not one `builder` should improvise per the deviation protocol.

## Changes

- `/home/user/scaffold/tests/config.test.ts` (the target case only, `:2139-2201`): walks `['core', 'browser', 'server']` (comment names `ENVIRONMENTS` in `src/core/constants.ts` as the order's source) to the first face whose `configs/src/tsconfig.<face>.json` exists via `existsSync` (added to the existing `node:fs` import), throws `The workspace declares no face project` when none exists, binds `face` once and derives `project` from it, rewords the three `The core project …` throws to `The ${face} project …`, and changes the root assertion to `resolve(root, `src/${face}`)`. Nothing else in the case changed: `parseProjectScope` refusals, the `--showConfig` failure on an absent project, the `isStringList` checks, and the extractor-override assertion are untouched.

### Hunk

```diff
@@
-	it('reads the compiler scope and fixed extractor override a declaration roll-up requires', () => {
-		const compiler = createRequire(import.meta.url).resolve('typescript/bin/tsc')
-		const project = resolve(root, 'configs/src/tsconfig.core.json')
-		const declared: unknown = JSON.parse(readFileSync(project, 'utf8'))
-		if (typeof declared !== 'object' || declared === null) {
-			throw new Error('The core project is not a TypeScript configuration record')
-		}
+	it('reads the compiler scope and fixed extractor override a declaration roll-up requires', () => {
+		const compiler = createRequire(import.meta.url).resolve('typescript/bin/tsc')
+		// The order mirrors ENVIRONMENTS in src/core/constants.ts; a server-only workspace vendors
+		// no core project, so this walks to the first face the workspace actually carries.
+		const faces = ['core', 'browser', 'server']
+		const face = faces.find((candidate) =>
+			existsSync(resolve(root, `configs/src/tsconfig.${candidate}.json`)),
+		)
+		if (face === undefined) throw new Error('The workspace declares no face project')
+		const project = resolve(root, `configs/src/tsconfig.${face}.json`)
+		const declared: unknown = JSON.parse(readFileSync(project, 'utf8'))
+		if (typeof declared !== 'object' || declared === null) {
+			throw new Error(`The ${face} project is not a TypeScript configuration record`)
+		}
 		const declaredOptions: unknown = Object.getOwnPropertyDescriptor(
 			declared,
 			'compilerOptions',
 		)?.value
 		if (typeof declaredOptions !== 'object' || declaredOptions === null) {
-			throw new Error('The core project carries no compiler options')
+			throw new Error(`The ${face} project carries no compiler options`)
 		}
 		const declaredLib: unknown = Object.getOwnPropertyDescriptor(declaredOptions, 'lib')?.value
 		const declaredTypes: unknown = Object.getOwnPropertyDescriptor(declaredOptions, 'types')?.value
 		if (!configHelpers.isStringList(declaredLib) || !configHelpers.isStringList(declaredTypes)) {
-			throw new Error('The core project declares no lib or types')
+			throw new Error(`The ${face} project declares no lib or types`)
 		}
@@
-		expect(scope.root).toBe(resolve(root, 'src/core'))
+		expect(scope.root).toBe(resolve(root, `src/${face}`))
```

## Scoped validation

1. `git status --short` in `/home/user/scaffold`:
```
 M tests/config.test.ts
```
Only the owned file changed (the Orchestrator's `.orkestrel/` records are absent here).

2. `npm run format:check`:
```
All matched files use the correct format.
Finished in 9517ms on 223 files using 4 threads.
```
Exit `0`.

`npx oxlint --config .oxlintrc.json --deny-warnings tests/config.test.ts`: no output, exit `0`.

3. `npm run test:config` in `/home/user/scaffold`:
```
Test Files  1 failed (1)
     Tests  1 failed | 171 passed | 1 skipped (173)
```
The failure is `keeps the committed host inventory aligned with the vendored checkout bytes` (`tests/config.test.ts:640`), unrelated to the target case: editing `tests/config.test.ts` (a vendored file) changes the digest `host.json` commits over that file's bytes (`tests/config.test.ts:716-731`), and `host.json` (`git log -1` at `584ebdf5`, predating this edit) is off-limits to `builder` and requires `npm run build:inventory`, a build-class command outside this unit's scope. The target case itself passes here, resolving `face === 'core'`.

4. Scratch-copy proof, `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/p24-sqlite-config` (copied from `/home/user/fleet/sqlite`, `node_modules` carried by the copy, edited `tests/config.test.ts` copied over):
```
$ npm run test:config
FAIL |config| tests/config.test.ts > configuration helpers > reads the compiler scope and fixed extractor override a declaration roll-up requires
AssertionError: expected '.../p24-sqlite-config/src' to be '.../p24-sqlite-config/src/server'
Test Files  1 failed (1)
     Tests  1 failed | 171 passed | 1 skipped (173)
```
The face walk resolves `face === 'server'` correctly (proved by the error text naming `src/server` as the expected value). The case reds only on the root assertion, per the Deviation report. `/home/user/fleet/sqlite` was not touched; the copy is the sole write under the scratchpad.

## Shared-file patches

None. `host.json` is off-limits to this unit; regenerating it belongs to a unit scoped to that file (or to a run of `npm run build`).
