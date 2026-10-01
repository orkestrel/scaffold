# Propagation fix 5 report

The adopter runs the generated browser setup script successfully. Acceptance remains incomplete: its next step, `test:config`, fails. Work stopped under the brief's deviation contract.

## Adopter setup diff

The change in `tests/distribution.test.ts` reads the generated manifest, asserts the browser script's presence and the Node script's absence, and preserves every other step and exit assertion.

```diff
+			if (!isRecord(manifest.scripts)) {
+				throw new Error('The adopter declares no scripts')
+			}
+			expect(Object.hasOwn(manifest.scripts, 'test:setup:browser')).toBe(true)
+			expect(Object.hasOwn(manifest.scripts, 'test:setup')).toBe(false)
 			for (const script of [
 				'lint:check',
 				'check',
 				'build',
 				'test:src',
 				'test:app',
-				'test:setup',
-				'test:setup:browser',
+				...Object.keys(manifest.scripts).filter((name) => name === 'test:setup:browser'),
 				'test:config',
```

## Adopter readings

The packed CLI adopter reported:

| Step | Exit | Duration | Test reading |
| --- | --- | --- | --- |
| Pack and consumer install | 0 | not reported | none |
| Generate | 0 | not reported | none |
| Install | 0 | npm reported 7 s | none |
| `lint:check` | 0 | 925 ms | none |
| `check` | 0 | 11593 ms | none |
| `build` | 0 | 17450 ms | none |
| `test:src` | 0 | 9869 ms | core/browser/Vue: 3 passed; styles/themes: 2 passed; print: 1 passed |
| `test:app` | 0 | 2828 ms | 3 passed |
| `test:setup:browser` | 0 | 2152 ms | 3 passed |
| `test:config` | 1 | 6128 ms | 5 failed, 193 passed, 1 skipped |
| `test:policy` | not run | none | none |
| `test:journey` | not run | none | none |
| `test:journey:vue` | not run | none | none |
| `build:showcase` | not run | none | none |
| `build:showcase:vue` | not run | none | none |

The generated-script failure is quoted bare:

```text
adopter: test:config: exit 1, 6128 ms

> @orkestrel/paper@0.0.1 test:config
> vitest run --config vite.config.ts --no-cache --reporter=dot --project config


 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/propagation-adopter-xUgpkE/generated

··x·x··xxx·························································································································································································stdout | tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core and browser specifiers
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

stdout | tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core and browser specifiers
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

··-·

 Test Files  1 failed (1)
      Tests  5 failed | 193 passed | 1 skipped (199)
   Start at  01:36:45
   Duration  5.07s (transform 248ms, setup 16ms, import 914ms, tests 3.99s, environment 0ms)


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |config| tests/config.test.ts > selected faces > loads each selected sheet and framework wrapper and checks its packaging and browser project
AssertionError: expected '@use \'../tokens\';\n@use \'default\'…' to match /^@layer [^;]+;/u

- Expected:
/^@layer [^;]+;/u

+ Received:
"@use '../tokens';
@use 'default';
"

 ❯ tests/config.test.ts:231:79
    229|   if (loaded === null) throw new Error('Unloaded themes wrapper')
    230|   expect(loaded.config.build?.outDir).toBe('dist/src/styles/themes')
    231|   expect(readFileSync(resolve(root, 'src/styles/themes/index.scss'), '…
       |                                                                               ^
    232|    /^@layer [^;]+;/u,
    233|   )

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/5]⎯

 FAIL  |config| tests/config.test.ts > selected faces > resolves showcase and journey modes for every occupied application
AssertionError: expected 'C:\Users\mikes\AppData\Local\Temp\pro…' to be 'showcase' // Object.is equality

Expected: "showcase"
Received: "C:\Users\mikes\AppData\Local\Temp\propagation-adopter-xUgpkE\generated\showcase"

 ❯ tests/config.test.ts:299:41
    297|     )
    298|     if (loaded === null) throw new Error('Unloaded showcase wrapper')
    299|     expect(loaded.config.build?.outDir).toBe('showcase')
       |                                         ^
    300|     expect(loaded.config.build?.emptyOutDir).toBe(false)
    301|    }

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/5]⎯

 FAIL  |config| tests/config.test.ts > root configuration > registers every workspace project with its fixed include and setup files
Error: setup has no project factory or configuration
 ❯ tests/config.test.ts:646:11
    644|    })
    645|    if (row === undefined) {
    646|     throw new Error(`${requiredLabel} has no project factory or config…
       |           ^
    647|    }
    648|    const project: unknown = typeof row === 'function' ? Reflect.apply(…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/5]⎯

 FAIL  |config| tests/config.test.ts > root configuration > returns the invocation mode and no other invocation field from every registered project factory
AssertionError: expected [ { name: undefined, …(3) }, …(12) ] to strictly equal [ { name: undefined, …(3) }, …(12) ]

- Expected
+ Received

@@ -1,16 +1,16 @@
  [
    {
-     "callable": true,
+     "callable": false,
      "leaked": [],
-     "mode": "sentinel-mode",
+     "mode": undefined,
      "name": undefined,
    },
    {
-     "callable": true,
+     "callable": false,
      "leaked": [],
-     "mode": "sentinel-mode",
+     "mode": undefined,
      "name": undefined,
    },
    {
      "callable": true,
      "leaked": [],

 ❯ tests/config.test.ts:774:46
    772|   })
    773|   const forwarded = { callable: true, mode: 'sentinel-mode', leaked: […
    774|   expect(readings.slice(0, projects.length)).toStrictEqual(
       |                                              ^
    775|    projects.map((entry) => ({
    776|     name: typeof entry === 'function' ? entry.name : undefined,

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/5]⎯

 FAIL  |config| tests/config.test.ts > root configuration > requires and validates every selected target wrapper
AssertionError: expected [ 'vite/client' ] to strictly equal [ 'vite/client', 'vue' ]

- Expected
+ Received

  [
    "vite/client",
-   "vue",
  ]

 ❯ tests/config.test.ts:956:19
    954|        : ['node']
    955|     expect(lib).toStrictEqual(expectedLib)
    956|     expect(types).toStrictEqual(expectedTypes)
       |                   ^
    957|    }
    958|    for (const tests of journeys) {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/5]⎯
```

The adopter's closing reading was:

```text
adopter: wall time 65750 ms; scratch removed: true
```

Browser page stamp against `computeStamp`: none; not reached. Vue page stamp against `computeStamp`: none; not reached. CSS consumer result: none; not reached. Repair byte comparison: none; not reached. Stale audit finding: none; not reached.

The complete `npm run test:distribution` command exited 1 naturally: 1 failed, 9 passed, 1 skipped; Vitest duration 206.99 s; launcher duration 207572 ms; `capped=false`. The failing adopter assertion is `tests/distribution.test.ts:290:65`.

Before this edit, the fix-4 report records the same command exiting 1 with 1 failed, 9 passed, and 1 skipped at the missing `test:setup` script. This run passes that repaired step and fails later; the complete regression command is not green.

## Desk readings

Generated `guides/README.md` Vue faces and showcase pages: none.

Generated `package.json` showcase and journey scripts: none.

Generated root `vite.config.ts` factory-body reading and local bindings: none.

The prescribed generation follows distribution and was not run after the required stop.

## Commands and results

The validation sequence ran in the prescribed order until distribution failed:

| Command | Exit | Test count or result |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts` | 0 | none; scoped formatting completed |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npx oxlint --config .oxlintrc.json tests/distribution.test.ts` | 0 | none |
| `npm run build` | 0 | none; host and inventory regenerated |
| `npm run test:distribution` | 1 | 1 failed, 9 passed, 1 skipped |
| `npx oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts` | not run | none; required stop |
| `node dist/bin/main.js new desk --target <os.tmpdir()>/scaffold-fix-5 --src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print --offline` | not run | none; required stop |

The distribution command used the installed npm entry through the prescribed launcher:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/propagation-fix-5-distribution.log --errors tmp/units/propagation-fix-5-distribution.err --cap 900 -- node C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js run test:distribution
```

The launcher exited 1 without reaching its cap. The earlier comparable distribution measurement was 200842 ms.

The inspection and containment commands reported:

| Command | Exit | Test count or result |
| --- | --- | --- |
| `git status --porcelain` | 0 | none; starting and closing states recorded |
| `git diff` | 0 | none; starting campaign diff recorded |
| `node tmp/units/propagation-fix-5-state.ts` | 0 | none; starting hashes and owned-file bytes captured |
| `node tmp/units/propagation-fix-5-state.ts check` | 0 on each run | none; only `tests/distribution.test.ts` changed |
| `git diff --no-index -- tmp/units/propagation-fix-5-distribution-before.ts tests/distribution.test.ts` | 1 | none; expected setup-step diff |
| `git diff --no-index -- tmp/units/propagation-fix-5-host-before.json host.json` | 0 | none; byte-identical |
| `git diff --check` | 0 | none; no whitespace errors |
| `Test-Path C:/Users/mikes/AppData/Local/Temp/propagation-adopter-xUgpkE` | 0 | none; False |
| `Test-Path C:/Users/mikes/AppData/Local/Temp/scaffold-fix-5` | 0 | none; False |

Read-only `Get-Content`, `Get-Command`, `Test-Path`, and successful `rg` inspections exited 0 and ran no tests. The initial dependency declaration search also named the nonexistent `node_modules/@orkestrel/contract/dist/core/index.d.ts` path and exited 1; the successful follow-up read `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`.

## Ownership and cleanup

Changes outside the owned set: none. Starting campaign changes were preserved. The build regenerated `host.json` without changing its starting bytes. Unit records remain under `tmp/units/propagation-fix-5-*`.

The adopter directory was removed by its teardown, and its absence was independently confirmed. The `desk` directory was never created and its absence was confirmed. No unit-created scratch directory remains.

## Deviations and stop

Expected: every adopter step exits 0 and the downstream adopter and desk readings complete.

Found: generated `test:config` exits 1 with 5 failed, 193 passed, and 1 skipped. Its diagnostics concern the themes layer prelude, showcase output path, optional Node setup registration, project-factory mode forwarding, and Vue target types.

Evidence: the bare generated-script output quoted under Adopter readings, followed by the distribution assertion at `tests/distribution.test.ts:290:65`.

Done: setup-script selection repaired; scoped formatting, TypeScript, scoped lint, and build passed; distribution completed naturally; ownership and scratch cleanup checked.

Not done: a passing distribution run, downstream adopter readings, the final format check, and desk readings.

Hypothesis: the vendored configuration proof assumes shapes that differ from the generated full selection.

No repair outside the owned setup step was attempted. No subagent, commit, checkout dependency installation, tree-wide `npm test`, mutating lint, or tree-wide format command was used. Other deviations: none.
