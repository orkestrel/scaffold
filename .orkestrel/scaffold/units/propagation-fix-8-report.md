# Propagation fix 8 report

The harness restores the emitted `@orkestrel/scaffold` range after installation. The packed adopter completes, the distribution suite passes, and the `desk` readings match the brief.

## Harness diff

The change against the captured starting file is:

```diff
@@ -232,7 +232,8 @@
 				throw new Error('The adopter declares no development dependencies')
 			}
 			// Install the release being proved instead of the registry version the emitted range names.
-			expect(manifest.devDependencies['@orkestrel/scaffold']).toBe(
+			const emitted = manifest.devDependencies['@orkestrel/scaffold']
+			expect(emitted).toBe(
 				`^${readManifestVersion(readFileSync(join(root, 'package.json'), 'utf8'))}`,
 			)
 			const specifier = `file:${relative(target, archive).replaceAll('\\', '/')}`
@@ -258,6 +259,25 @@
 			expect(parseJSON(requireValue(workspace.read('generated/package-lock.json')))).toMatchObject({
 				packages: { 'node_modules/@orkestrel/scaffold': { resolved: specifier } },
 			})
+			const refused = await execute(
+				{
+					file: process.execPath,
+					arguments: [entry, 'repair', '--target', target, '--offline', '--json'],
+				},
+				{ workspace: target, signal, strict: false, timeout: 60_000 },
+			)
+			console.info(
+				`adopter: file range control: exit ${String(refused.code)}\n${refused.stdout}${refused.stderr}`,
+			)
+			expect(refused.code).toBe(1)
+			expect(parseJSON(refused.stdout)).toMatchObject({
+				error: { code: 'FETCH', message: 'A declared dependency names no concrete floor.' },
+			})
+			// Offline repair reads the declared floor; the tarball override belongs only to installation.
+			workspace.write('generated/package.json', `${JSON.stringify(manifest, undefined, '\t')}\n`)
+			expect(parseJSON(requireValue(workspace.read('generated/package.json')))).toMatchObject({
+				devDependencies: { '@orkestrel/scaffold': emitted },
+			})
 			if (!isRecord(manifest.scripts)) {
 				throw new Error('The adopter declares no scripts')
 			}
```

The restoration assertion passes for `^0.0.81`. The harness writes the captured generated manifest back after npm installation; it leaves the installed dependencies and npm's lockfile in place.

## Adopter readings

The complete step readings from `tmp/units/propagation-fix-8-distribution.log` are:

| Step | Exit or result | Duration | Test count |
| --- | --- | --- | --- |
| Pack and consumer install | 0 | not emitted | none |
| Generate | 0 | not emitted | none |
| Install | 0 | npm reported 7 s | none |
| File range refusal control | 1, expected `FETCH` | not emitted | none |
| Emitted range restoration | assertion passed | not emitted | none |
| `lint:check` | 0 | 938 ms | none |
| `check` | 0 | 12088 ms | none |
| `build` | 0 | 17680 ms | none |
| `test:src` | 0 | 12476 ms | 3 passed; 2 passed; 1 passed |
| `test:app` | 0 | 2800 ms | 3 passed |
| `test:setup:browser` | 0 | 2066 ms | 3 passed |
| `test:config` | 0 | 6457 ms | 198 passed, 1 skipped |
| `test:policy` | 0 | 3887 ms | 117 passed, 1 skipped |
| `test:journey` | 0 | 2605 ms | 2 passed |
| `test:journey:vue` | 0 | 2665 ms | 2 passed |
| `build:showcase` | 0 | 830 ms | none |
| `build:showcase:vue` | 0 | 928 ms | none |
| Browser and Vue stamps | assertions passed | not emitted | none |
| CSS consumer | 0 | not emitted | none |
| Repair | 0 | not emitted | none |
| Repair byte comparison | assertion passed | not emitted | none |
| Stale audit | 1, expected stale wrapper | not emitted | none |

The pre-restoration control prints:

```text
adopter: file range control: exit 1
{"error":{"code":"FETCH","message":"A declared dependency names no concrete floor."}}
```

Both stamps pass equality against `computeStamp(page)`:

```text
adopter: showcase/browser.html: stamp 3e5c85d79843f2d662932905224a448415f5dca889149a818945ff34023a77b3
adopter: showcase/vue.html: stamp db8b98b747ce086fd540ae1109eb3db132738b13d8a2b3d32d7c4421b47bd2d1
```

The CSS consumer prints:

```text
adopter: CSS consumer: exit 0
["@layer theme, reset, base, elements, components, utilities;/*$vite$:1*/@layer theme, reset, base, elements, components, utilities;/*$vite$:1*/@layer theme, reset, base, elements, components, utilities;/*$vite$:1*//*$vite$:1*/"]
```

Repair exits 0 and reports `"written":["configs/src/vite.print.config.ts"]`. The existing byte comparison passes before the drift control is written:

```ts
expect(readFileSync(join(target, wrapper))).toEqual(original)
```

The stale audit exits 1. Its wrapper finding, with the hexadecimal `observed` payload omitted, is:

```json
{"path":"configs/src/vite.print.config.ts","group":"configs","ownership":"content","drift":"stale"}
```

The terminal readings are:

```text
adopter: wall time 84094 ms; scratch removed: true
Test Files  1 passed (1)
Tests       10 passed | 1 skipped (11)
Duration    225.03s
exit=0 signal=none capped=false duration_ms=225596
```

The preceding run recorded in `propagation-fix-7-report.md` used the same `npm run test:distribution` command and reported `1 failed | 9 passed | 1 skipped (11)` at the dependency-floor refusal. This unit's run reports `10 passed | 1 skipped (11)`. The retained control independently reproduces the refusal inside the passing run.

## Desk readings

The prescribed generation command exits 0:

```text
node dist/bin/main.js new desk --target C:\Users\mikes\AppData\Local\Temp\scaffold-fix-5 --src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print --offline
desk generation exit: 0
```

The generated `guides/README.md` lists the Vue faces, their tests, and the showcase pages. These lines are quoted from their respective lists:

```markdown
    - [`src/vue`](../src/vue)
    - [`app/vue`](../app/vue)
    - [`tests/src/vue`](../tests/src/vue)
    - [`tests/app/vue`](../tests/app/vue)
  - Showcase:
    - [`showcase/browser.html`](../showcase/browser.html)
    - [`showcase/vue.html`](../showcase/vue.html)
```

The generated manifest carries these showcase and journey scripts:

```json
{
  "test:journey": "vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot",
  "test:journey:vue": "vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --mode vue",
  "showcase": "vite --config configs/app/vite.showcase.config.ts",
  "build:showcase": "vite build --config configs/app/vite.showcase.config.ts",
  "showcase:vue": "vite --config configs/app/vite.showcase.config.ts --mode vue",
  "build:showcase:vue": "vite build --config configs/app/vite.showcase.config.ts --mode vue"
}
```

Reading the complete generated `vite.config.ts` finds no function declaration or function-valued local binding inside a factory body outside the admitted positions. The factory-local bindings `project`, `output`, `application`, `showcase`, and `browser` hold configuration objects or values. The filename callbacks and external resolver are module-scope functions. The `writeBundle` method belongs to the object returned by the module-scope `createShowcaseNaming` function, an admitted position. Relevant declarations are:

```ts
function resolveSourceExternal(id: string): boolean {
function resolveBrowserFilename(): string {
function resolveVueFilename(): string {
function createShowcaseNaming(application: string): PluginOption {
	return {
		name: 'orkestrel-showcase-name',
		enforce: 'post',
		writeBundle(options) {
```

The full generated root configuration is retained in `tmp/units/propagation-fix-8-desk.log`. Cleanup prints:

```text
desk scratch removed: true
exit=0 signal=none capped=false duration_ms=1819
```

## Commands and scope

The commands report these results:

| Command | Exit | Test count |
| --- | --- | --- |
| `git status --porcelain` | 0 on each invocation | none |
| `git diff --stat` | 0 | none |
| `git diff --binary`, captured by the state script | 0 | none |
| `node tmp/units/propagation-fix-8-state.ts` | 0 | none; 372 paths captured |
| `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts` | 0 | none |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npx oxlint --config .oxlintrc.json tests/distribution.test.ts` | 0 | none |
| `npm run build` | 0 | none; inventory reported 196 entries |
| `npm run test:distribution` | 0 | 10 passed, 1 skipped |
| `npx oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts` | 0 | none |
| Prescribed `node dist/bin/main.js new desk ... --offline` | 0 | none |
| `node tmp/units/propagation-fix-8-desk.ts` | 0 | none |
| `node tmp/units/propagation-fix-8-read.ts` | 0 | none; projects large audit JSON to wrapper findings |
| `node tmp/units/propagation-fix-8-state.ts compare` | 0 on each invocation | none; only `tests/distribution.test.ts` changed |
| `git diff --no-index -- tmp/units/propagation-fix-8-before-tests-distribution.test.ts tests/distribution.test.ts` | 1, expected difference | none |
| `git diff --no-index -- tmp/units/propagation-fix-8-before-host.json host.json` | 0 | none |
| `git diff --check` | 0 | none |
| `Test-Path` on the adopter and desk scratch directories | 0; both returned `False` | none |

Read-only `Get-Content`, `rg`, and path inspections exited 0 and ran no tests. The state script also runs `git ls-files --cached --others --exclude-standard -z`, which exited 0.

The journaled invocations were:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/propagation-fix-8-build.log --errors tmp/units/propagation-fix-8-build.err --cap 300 -- node C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js run build
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/propagation-fix-8-distribution.log --errors tmp/units/propagation-fix-8-distribution.err --cap 900 -- node C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js run test:distribution
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/propagation-fix-8-desk.log --errors tmp/units/propagation-fix-8-desk.err --cap 120 -- node tmp/units/propagation-fix-8-desk.ts
```

Each launcher exited 0 without reaching its cap. Their measured durations were 12763 ms for build, 225596 ms for distribution, and 1819 ms for desk. Distribution ran bare to natural completion; the journal reader only reduced the large JSON responses afterward.

Only `tests/distribution.test.ts` differs from the captured starting tree. The build regenerated `host.json` without changing its starting bytes. Existing campaign changes remain intact. Unit evidence is under `tmp/units/propagation-fix-8-*`. No unit-created scratch directory remains.

## Deviations

No implementation or acceptance deviation. Supplemental state capture, journal reading, byte comparisons, and whitespace checks provide the requested ownership and report evidence. The build prints its API Extractor compiler-version advisory and existing output-format warning; distribution prints the existing Node `DEP0190` warning. All required commands pass.

No subagent, checkout installation, commit, tree-wide `npm test`, mutating lint, or tree-wide formatting was performed.
