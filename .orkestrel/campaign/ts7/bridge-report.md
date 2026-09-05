# Unit ts7-bridge — report

Stage 1 landed. Every in-process TypeScript API site in this repository now imports
`@typescript/typescript6`, the bridge is a declared development dependency and a
`BASE_DEV_DEPENDENCIES` row, `typescript` is untouched at `^6.0.3`, and every gate is green except
one assertion in an off-limits file. That one is a deviation, reported with its exact patch under
§ Deviations.

## The install and the bridge's version

```text
$ npm install --no-audit --no-fund
added 2 packages in 695ms
EXIT=0

$ node -e "console.log(require('@typescript/typescript6').version)"
6.0.3
EXIT=0

$ node -e "const ts=require('@typescript/typescript6'); console.log(typeof ts.createSourceFile, typeof ts.transpileModule, typeof ts.forEachChild, typeof ts.sys, typeof ts.canHaveModifiers, typeof ts.getModifiers, typeof ts.createProgram, typeof ts.getPreEmitDiagnostics, typeof ts.flattenDiagnosticMessageText)"
function function function object function function function function function
```

Every member the swapped sites call is present. The bridge lacks no member this repository uses.

## Touched files

| File                                              | Change                                                                                   |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `package.json`                                    | `"@typescript/typescript6": "^6.0.2"` in `devDependencies`, sorted after `@types/node`   |
| `package-lock.json`                               | `npm install` result: the bridge and its aliased `@typescript/old` compiler              |
| `src/core/constants.ts`                           | The `BASE_DEV_DEPENDENCIES` row plus a `@remarks` block on why the bridge is planned     |
| `src/core/templates.ts`                           | The generated distribution proof's import at the `{{launcher}}` line                     |
| `tests/setupPolicy.ts`                            | `import * as ts from '@typescript/typescript6'`                                          |
| `tests/guides.test.ts`                            | `import ts from '@typescript/typescript6'`                                               |
| `tests/distribution.test.ts`                      | `import ts from '@typescript/typescript6'`                                               |
| `tests/src/core/templates.test.ts`                | `import ts from '@typescript/typescript6'`                                               |
| `tests/src/bin/CLI.test.ts`                       | A `/@typescript%2Ftypescript6` packument row in `FLEET_RELEASE_REPLIES` and `AUDIT_REGISTRY` |
| `tests/src/core/fixtures/app-only-toolchain.txt`  | Snapshot gains the bridge row                                                            |
| `tests/src/core/fixtures/source-manifest.txt`     | Snapshot gains the bridge row                                                            |
| `tests/src/core/fixtures/setup-false-manifest.txt`| Snapshot gains the bridge row                                                            |
| `guides/scaffold.md`                              | One sentence in § Dependency floors naming the bridge and why                            |
| `host.json`                                       | Rebuilt by `npm run build`: the `tests/setupPolicy.ts` and `guides/scaffold.md` digests   |

## The import sweep

```text
$ grep -rn "from 'typescript'" src tests configs
grep-exit=1
```

No output. No runtime import and no `import type` from `'typescript'` remains in `src`, `tests`, or
`configs`. The remaining `typescript` occurrences in those trees are range literals and packument
paths in fixtures and TSDoc examples, which stage 2 owns.

## Gates

Run in the order `AGENTS.md` § Work process fixes, after the guide edit and a rebuild.

```text
$ npm run format:check                                            EXIT=0
$ npm run lint:check                                              EXIT=0
$ npm run check                                                   EXIT=0
$ npm run build                                                   EXIT=0
$ npm test                                                        EXIT=1
$ PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release   EXIT=0
```

`npm test` chains its projects with `&&`, so its red stops the chain at `test:src:bin`. Each
project in the chain, run on its own against the final tree:

```text
$ npm run test:src:core     EXIT=0   Test Files  9 passed (9)   Tests  390 passed (390)
$ npm run test:src:server   EXIT=0   Test Files  5 passed (5)   Tests  432 passed (432)
$ npm run test:src:bin      EXIT=1   Test Files  1 failed | 2 passed (3)   Tests  1 failed | 244 passed (245)
$ npm run test:policy       EXIT=0   Test Files  1 passed (1)   Tests  111 passed (111)
$ npm run test:config       EXIT=0   Test Files  1 passed (1)   Tests   46 passed (46)
$ npm run test:setup        EXIT=0   Test Files  2 passed (2)   Tests   69 passed (69)
$ npm run test:guides       EXIT=0   Test Files  1 passed (1)   Tests   17 passed (17)
```

The release-mode distribution proof, which packs scaffold and drives a generated core/server
workspace through its own `prepublishOnly` against the real registry:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release
Test Files  1 passed (1)
     Tests  5 passed (5)
Duration  39.58s
EXIT=0
```

That run is the proof the bridge row resolves from the registry inside a freshly generated
workspace, not only here.

The only red, in full:

```text
 FAIL  |src:bin| tests/src/bin/main.test.ts > scaffold > routes the configured npm registry through the process entry
AssertionError: expected 'FETCH: The registry named no release …' to be '' // Object.is equality

- Expected
+ Received

+ FETCH: The registry named no release for @typescript/typescript6.
+

 ❯ tests/src/bin/main.test.ts:139:28
```

## Red before, green after

The bridge row makes the generated `devDependencies` block false wherever a fixture registry or a
snapshot carries it. Each command below ran red on the swapped tree and green after the change the
same row names.

```text
$ npm run test:src:core        (before) EXIT=1  Snapshots 3 failed   Tests 3 failed | 387 passed (390)
$ npm run test:src:core -- -u  (fix)    EXIT=0  Snapshots 3 updated
$ npm run test:src:core        (after)  EXIT=0  Tests 390 passed (390)

$ npm run test:src:bin         (before) EXIT=1  Tests 38 failed | 207 passed (245)
$ npm run test:src:bin         (after)  EXIT=1  Tests  1 failed | 244 passed (245)
```

## Snapshot and fixture diffs

Each of the three file snapshots gained exactly the bridge row, in sorted position after
`@types/node`, and nothing else. `tests/src/core/compilers.test.ts` compares these against
`blueprintToDevDependencies` output, which now spreads the new `BASE_DEV_DEPENDENCIES` row.

```diff
--- a/tests/src/core/fixtures/app-only-toolchain.txt
+++ b/tests/src/core/fixtures/app-only-toolchain.txt
@@ -6,6 +6,7 @@
 	"@orkestrel/scaffold": "^0.0.63",
 	"@orkestrel/test": "^0.0.13",
 	"@types/node": "^26.4.0",
+	"@typescript/typescript6": "^6.0.2",
 	"@vitejs/plugin-vue": "^6.0.8",
 	"@vitest/browser-playwright": "^4.1.11",
 	"oxfmt": "^0.65.0",
```

`tests/src/core/fixtures/source-manifest.txt` and
`tests/src/core/fixtures/setup-false-manifest.txt` took the identical single-line insertion at
their own `devDependencies` block:

```diff
@@ -67,6 +67,7 @@
 		"@orkestrel/scaffold": "^0.0.63",
 		"@orkestrel/test": "^0.0.13",
 		"@types/node": "^26.4.0",
+		"@typescript/typescript6": "^6.0.2",
 		"oxfmt": "^0.65.0",
 		"oxlint": "^1.80.0",
 		"typescript": "^6.0.3",
```

Reason for each: the fixture is a byte-stable snapshot of a generated manifest, and the manifest's
`devDependencies` now carries the bridge. No range in any fixture moved; `typescript` still reads
`^6.0.3` in every one, which is why `tests/src/core/constants.test.ts` "emits a TypeScript range
bounded below 7" stayed green.

`host.json` was rebuilt by `build:inventory` and carries the two vendored digests the change moved:

```diff
-			"digest": "db25195432d3129b9f8e335a1bb63d5f0377aa5649d1623e006c0829c387bb30"   guides/scaffold.md
+			"digest": "89d72cb7a3f2a83867d79eb2015b7d8e276913f0505b14304357c9452694a06d"
-			"digest": "e33cc2f49a5bc201e339f50c59d280d36d06a5b687bc080a00b41f09577fa7c7"   tests/setupPolicy.ts
+			"digest": "060e99bfd14ccbd032404631342d1083bc76c6eb706e9c3b300ee158b18b221f"
```

`guides/scaffold.md` is a vendored host path, so the guide sentence moves every target's copy at its
next `repair`. That is the same propagation the `tests/setupPolicy.ts` swap relies on.

## Tree state

```text
$ git status --short
 M .orkestrel/campaign/ts7/ledger.md
 M .orkestrel/campaign/ts7/orchestrator-measurements.md
 M guides/scaffold.md
 M host.json
 M package-lock.json
 M package.json
 M src/core/constants.ts
 M src/core/templates.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupPolicy.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/fixtures/app-only-toolchain.txt
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
 M tests/src/core/templates.test.ts
?? .orkestrel/campaign/ts7/bridge-brief.md
?? .orkestrel/campaign/ts7/design-objective.md
?? .orkestrel/campaign/ts7/design-subjective.md
?? .orkestrel/campaign/ts7/probe-brief.md
?? .orkestrel/campaign/ts7/reconciliation.md
?? .orkestrel/campaign/ts7/seven-brief.md
```

Every path under `.orkestrel/campaign/ts7/` is the Orchestrator's, not this unit's. It was already
modified or untracked at the baseline, and this unit wrote none of it.

```text
$ git diff --stat
 .orkestrel/campaign/ts7/ledger.md                  |  1 +
 .../campaign/ts7/orchestrator-measurements.md      | 12 +++++++++
 guides/scaffold.md                                 |  3 +++
 host.json                                          |  6 ++---
 package-lock.json                                  | 29 ++++++++++++++++++++++
 package.json                                       |  1 +
 src/core/constants.ts                              | 10 +++++++-
 src/core/templates.ts                              |  2 +-
 tests/distribution.test.ts                         |  2 +-
 tests/guides.test.ts                               |  2 +-
 tests/setupPolicy.ts                               |  2 +-
 tests/src/bin/CLI.test.ts                          |  8 ++++++
 tests/src/core/fixtures/app-only-toolchain.txt     |  1 +
 tests/src/core/fixtures/setup-false-manifest.txt   |  1 +
 tests/src/core/fixtures/source-manifest.txt        |  1 +
 tests/src/core/templates.test.ts                   |  2 +-
 16 files changed, 74 insertions(+), 9 deletions(-)
```

## Acceptance criteria

| Criterion                                                                | State                                                            |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `grep -rn "from 'typescript'" src tests configs` returns nothing         | Met. No `import type` survives either, so none is reported.      |
| `format:check`, `lint:check`, `check`, `build` exit 0                    | Met.                                                             |
| `npm test` exits 0                                                       | Not met. One assertion in the off-limits `tests/src/bin/main.test.ts`. |
| `test:distribution -- --mode release` under npm 11 exits 0               | Met.                                                             |
| `package.json` declares the bridge; `BASE_DEV_DEPENDENCIES` carries it; `host.json` rebuilt | Met.                              |

## Deviations

### One off-limits file must gain a fixture-registry row

**Expected.** The brief's owned set closes every gate.

**Found.** `tests/src/bin/main.test.ts` holds its own literal fixture-registry route table, distinct
from the two in `tests/src/bin/CLI.test.ts`. The bridge is now a planned dependency, so `repair`
asks that fixture registry for it and the fixture serves no such path. The file is not in the owned
set and is therefore report-only, so this unit left it untouched.

**Evidence.**

```text
$ npm run test:src:bin
 FAIL  |src:bin| tests/src/bin/main.test.ts > scaffold > routes the configured npm registry through the process entry
AssertionError: expected 'FETCH: The registry named no release …' to be ''
+ FETCH: The registry named no release for @typescript/typescript6.
 ❯ tests/src/bin/main.test.ts:139:28
EXIT=1
```

The message is raised at `src/bin/helpers.ts:736`. The same shape in
`tests/src/bin/CLI.test.ts` accounted for the other reds in that project, and adding the row there
took `test:src:bin` from `38 failed | 207 passed (245)` to `1 failed | 244 passed (245)`.

**Exact patch.** Insert after the `'/@types%2Fnode'` entry at `tests/src/bin/main.test.ts:86-89`,
inside the `createUpstreamServer` call at line 74. Indentation is three tabs, matching its
siblings. `BASE_DEV_DEPENDENCIES` and `buildPackument` are already imported at lines 9 and 11, so
no import changes.

```diff
--- a/tests/src/bin/main.test.ts
+++ b/tests/src/bin/main.test.ts
@@ -86,6 +86,10 @@
 			'/@types%2Fnode': {
 				status: 200,
 				body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
 			},
+			'/@typescript%2Ftypescript6': {
+				status: 200,
+				body: buildPackument(BASE_DEV_DEPENDENCIES['@typescript/typescript6']?.slice(1) ?? ''),
+			},
 			'/oxfmt': {
 				status: 200,
 				body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
```

**Done and not done.** Every owned file is done and every other gate is green. `npm test` closes
when this patch lands.

**Hypothesis.** The brief's owned list was derived from the rehearsal, whose scratch copy never
reached `test:src:bin` because its build failed first, so `main.test.ts` was never observed red.

### Two ancillary decisions, taken and recorded

- **Row placement in `BASE_DEV_DEPENDENCIES`.** The brief says "beside `typescript`". The
  constant's rows are sorted and `blueprintToDevDependencies` sorts its output anyway, so placement
  in the constant changes no emitted byte. The row went to sorted position, after `@types/node`,
  which keeps the file's own order intact.
- **Guide placement.** The brief names § Dependency floors and § Generated workspace "where the
  toolchain rows are listed". § Generated workspace lists no toolchain rows; it describes the
  computed manifest. The sentence went to § Dependency floors alone, beside the paragraph that
  derives each installed row from scaffold's manifest.

### Not a deviation

`.orkestrel/campaign/ts7/` gained `probe-brief.md` and `seven-brief.md` while this unit ran. Those
are the Orchestrator's files, outside this unit's scope, and this unit did not write them.
