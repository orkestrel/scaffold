# Unit ts7-seven — report

`typescript` is at `^7.0.2`, the declaration rollup override is in the checked-in configs and the
templates that seed them, the browser fork holds a Vue workspace at the 6 major, every range literal
the move made false is updated, `host.json` is rebuilt, and the prose is amended. The whole gate
chain is green.

The release-mode distribution proof is red, and its cause is neither a missing bridge nor a missing
override: `@orkestrel/probe@0.0.12` declares the optional peer `typescript@^6.0.3`, so npm refuses
`ERESOLVE` in the generated workspace. That is reconciliation R6's open item, it is outside this
unit's owned files, and it is reported under § Deviations with its exact evidence and its control.

## The install and the compiler version

```text
$ npm install --no-audit --no-fund
added 1 package, and changed 1 package in 1s
EXIT=0
(warning: ERESOLVE overriding peer dependency — peerOptional typescript@"^6.0.3" from @orkestrel/probe@0.0.12)

$ npx tsc --version
Version 7.0.2
EXIT=0

$ node -p "require('./node_modules/typescript/package.json').version"
7.0.2

$ ls node_modules/typescript/lib
getExePath.d.ts  getExePath.js  tsc.js  version.cjs  version.d.cts
```

That listing is the rollup failure's cause, read directly: the installed `typescript` package's
`lib/` folder carries no `lib.*.d.ts` file at the 7 major.

## Gates

Run in the order `AGENTS.md` § Work process fixes, against the final tree.

```text
$ npm run format:check                                                   EXIT=0
$ npm run lint:check                                                     EXIT=0
$ npm run check                                                          EXIT=0
$ npm run build                                                          EXIT=0
$ npm test                                                               EXIT=0
$ PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release   EXIT=1
```

`npm test` chains its projects with `&&` and every one of them passed:

```text
test:src:core     Test Files  9 passed (9)   Tests  391 passed (391)
test:src:server   Test Files  5 passed (5)   Tests  432 passed (432)
test:src:bin      Test Files  3 passed (3)   Tests  245 passed (245)
test:policy       Test Files  1 passed (1)   Tests  111 passed (111)
test:config       Test Files  1 passed (1)   Tests   46 passed (46)
test:setup        Test Files  2 passed (2)   Tests   69 passed (69)
test:guides       Test Files  1 passed (1)   Tests   17 passed (17)
```

The distribution proof's red, in full:

```text
 FAIL  |distribution| tests/distribution.test.ts > installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]
AssertionError: expected 1 to be +0 // Object.is equality
 ❯ tests/distribution.test.ts:905:33
 Test Files  1 failed (1)
      Tests  1 failed | 4 passed (5)
```

Line 905 asserts the exit status of the generated workspace's `npm install`.

## Red before, green after

Each command below ran red on the moved tree and green after the change named beside it.

```text
$ npm run test:src:core        (before) EXIT=1  Snapshots 2 failed  Tests 5 failed | 385 passed (390)
$ npm run test:src:core        (after)  EXIT=0  Tests 391 passed (391)

$ npm run test:src:bin         (before) EXIT=1  Tests 6 failed | 239 passed (245)
$ npm run test:src:bin         (after)  EXIT=0  Tests 245 passed (245)

$ npm run test:guides          (before) EXIT=1  Tests 1 failed | 16 passed (17)
$ npm run test:guides          (after)  EXIT=0  Tests 17 passed (17)
```

The core reds were the range assertions in `tests/src/core/compilers.test.ts`, the emitted-range
assertion in `tests/src/core/constants.test.ts`, and the manifest snapshots. The bin reds were the
`CLI audit` rows quoting the planned range and the fixture registry's single-version `typescript`
packument. The guides red was the parity claim over the new `APP_BROWSER_TYPESCRIPT_RANGE` export.

`npm run build` reproduced the rehearsal's rollup failure once, from the templates rather than the
override: the comment's backticks closed the template literal in `src/core/templates.ts`, and the
transform reported `[PARSE_ERROR] Expected ',' or '}' but found 'Identifier'` at
`src/core/templates.ts:567:10`. Escaping the backticks inside the template strings closed it, and no
`Unable to follow symbol` error appeared at any point with the override in place.

## The override's form

The brief specifies `invokeOptions.typescriptCompilerFolder: undefined`. That form does not
typecheck here:

```text
$ npm run check
configs/src/vite.core.config.ts(25,6): error TS2375: Type '{ typescriptCompilerFolder: undefined; }' is not assignable to type 'ExtractorInvokeOptions' with 'exactOptionalPropertyTypes: true'.
    Type 'undefined' is not assignable to type 'string'.
configs/src/vite.server.config.ts(18,6): error TS2375: (the same)
EXIT=1
```

The landed form is `typescriptCompilerFolder: ''`, which reaches the same branch.
`@microsoft/api-extractor` applies the option under a truthiness test, so an empty folder leaves the
default library location alone:

```text
node_modules/@microsoft/api-extractor/lib-esm/api/CompilerState.js:101
    if (options && options.typescriptCompilerFolder) {
        const typescriptCompilerLibFolder = path.join(options.typescriptCompilerFolder, 'lib');
        compilerHost.getDefaultLibLocation = () => typescriptCompilerLibFolder;
    }
```

`grep -rn "typescriptCompilerFolder" node_modules/@microsoft/api-extractor/lib-esm/api/*.js` returns
that guard and the line inside it, and nothing else, so the option reaches no other code path. The
build is green and the declaration rollup carries the doc blocks.

Two alternatives were rejected. Pointing the option at `@typescript/typescript6` fails, because that
package's `lib/` carries `typescript.js` and `typescript.d.ts` and no library files. Pointing it at
`@typescript/old` — the real `typescript@6` the bridge aliases, whose `lib/` does carry them — would
make a vendored configuration depend on another package's private alias and on npm's hoisting.

## Touched files

| File                                               | Change                                                                                          |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `package.json`                                     | `"typescript": "^7.0.2"`                                                                        |
| `package-lock.json`                                | The `npm install` result                                                                        |
| `configs/src/vite.core.config.ts`                  | `bundleTypes.invokeOptions.typescriptCompilerFolder`, beside the existing `extractorConfig`     |
| `configs/src/vite.server.config.ts`                | `bundleTypes: true` became the object carrying that option                                      |
| `src/core/templates.ts`                            | The same edit in the core, browser, and server `dts` templates, with the comment's backticks escaped |
| `src/core/constants.ts`                            | `APP_BROWSER_TYPESCRIPT_RANGE`, beside `APP_BROWSER_DEV_DEPENDENCIES`                           |
| `src/core/compilers.ts`                            | `blueprintToDevDependencies` spreads that range for an `app/browser` blueprint; one `@remarks` paragraph |
| `tests/src/core/constants.test.ts`                 | The emitted-range proof split into the shared range and the browser ceiling                     |
| `tests/src/core/compilers.test.ts`                 | The shared pin in the peer-floor rows                                                           |
| `tests/src/bin/CLI.test.ts`                        | The planned range in the `CLI audit` messages and fixture manifests; the `/typescript` packument serves both majors |
| `tests/src/core/fixtures/source-manifest.txt`      | Snapshot                                                                                        |
| `tests/src/core/fixtures/setup-false-manifest.txt` | Snapshot                                                                                        |
| `guides/scaffold.md`                               | The `APP_BROWSER_TYPESCRIPT_RANGE` Surface row and one § Dependency floors paragraph            |
| `PROPOSAL.md`                                      | The pin, the candidate-table row, and the control and fallback readers                          |
| `ROADMAP.md`                                       | The scaffold retirement rows, the browser limit, and the fleet visit                            |
| `host.json`                                        | Rebuilt: the `guides/scaffold.md` digest and the root digest                                    |

## Snapshot and fixture diffs

Both manifest snapshots took the same single-line change, and nothing else.

```diff
--- a/tests/src/core/fixtures/source-manifest.txt
+++ b/tests/src/core/fixtures/source-manifest.txt
@@ -70,7 +70,7 @@
 		"@typescript/typescript6": "^6.0.2",
 		"oxfmt": "^0.65.0",
 		"oxlint": "^1.80.0",
-		"typescript": "^6.0.3",
+		"typescript": "^7.0.2",
 		"vite": "^8.2.2",
```

`tests/src/core/fixtures/setup-false-manifest.txt` took the identical insertion at its own
`devDependencies` block. Reason for each: the fixture is a byte-stable snapshot of a generated
manifest, and the manifest's `typescript` row now derives from a 7 floor.

`tests/src/core/fixtures/app-only-toolchain.txt` did not move, and that is the fork's proof. Its
blueprint is `buildBlueprint({ src: [], app: ['core', 'browser'], bin: false })`, so
`blueprintToDevDependencies` emits the ceiling and the fixture still reads `"typescript": "^6.0.3"`
at line 15.

`host.json` was rebuilt by `build:inventory`, and carries the vendored digest the guide edit moved:

```diff
-			"digest": "a96b221d4403d61bf6b688eafee7fd2594f822adaab4d52d6a40c03221173b19"   guides/scaffold.md
+			"digest": "ba5a18699b9818d80cd35b5d3acd289391b9adfb6551d3cfcbe74df53985dab8"
-	"digest": "36b651d7ec58300eb0441fe8eae6961e6dfc0de216567a1bba61571b6f5e5964"           root
+	"digest": "f82c70ae51bba20804b30b865e875238e585d2e3aa9720068cdf7e05c5f3f647"
```

The core declaration rollup measures 231344 bytes against the 6.0.3 build's 229169. The difference is
template text: `CONFIG_TEMPLATES` is a frozen literal, so its inferred type embeds the Vite templates
in the rollup, and those templates gained the override and its comment.

## The one product reading the fork changed

A workspace that selects `app/browser` declares major 6 while the registry serves major 7. The
fixture registry in `tests/src/bin/CLI.test.ts` published a single `typescript` version, so the
declared-major lookup found no release, `releasesToExit` returned `EXIT_DRIFT` for a failed lookup,
and `helpers.ts:719` raised `FETCH: The registry named no release for …`, which refused the `configs`
write the proof reads. A throwaway probe under `tmp/probe/` reproduced the refusal and printed that
message; the probe was deleted.

The repair is in the fixture, not the product: the registry publishes both majors, so the fixture
serves both. With that, `repair` writes the configuration and exits `EXIT_CLEAN`, which is what the
proof asserted before the move. The offline reading confirms the fork is internally consistent — the
same probe under `--offline` returned `"questions":[]` and a `typescript` release row reading
`"range":"^6.0.3","lookup":"found","latest":"6.0.3"`, because the floor comparison reads the planned
range rather than the shared one.

## Prose changed

`guides/scaffold.md` § Dependency floors gained one paragraph after the `@typescript/typescript6`
sentence:

> `typescript` is a 7 floor, and the declaration rollup analyses with the compiler
> `@microsoft/api-extractor` bundles rather than with it. Each published `src` environment's Vite
> configuration therefore clears the `typescriptCompilerFolder` invoke option: `unplugin-dts` points
> that option at the installed `typescript` package's root, which carries no `lib.*.d.ts` file at the
> 7 major, and the rollup then resolves no global type. A workspace that selects `app/browser` takes
> `APP_BROWSER_TYPESCRIPT_RANGE` instead of the shared floor, because it checks its Vue sources with
> `vue-tsc` and `vue-tsc` has no TypeScript 7 support (`vuejs/language-tools` issue 5381). That
> workspace's `audit` reports the shared major as a non-blocking `dependencies` question, which is the
> crossed-major reading every foreign row earns; take it as the record of the limit rather than as an
> instruction to raise the range, and the range goes when `vue-tsc` supports 7.

Its § Constants table gained one row:

> | `APP_BROWSER_TYPESCRIPT_RANGE`    | const | The TypeScript range a private Vue browser application takes instead of the shared one.          |

`PROPOSAL.md`, § The constraints every option must satisfy, in the opening paragraph:

> before: `typescript` `6.0.3` stays on the development edge unless you rule otherwise
>
> after: `typescript` `7.0.2` and its `@typescript/typescript6` bridge stay on the development edge
> unless you rule otherwise

`PROPOSAL.md`, Option 1's control path:

> before: The TypeScript compiler API stays the **control** the scanner is measured against —
> `ts.getJSDocTags`, `ts.getJSDocCommentsAndTags`, `Symbol.getDocumentationComment` — and is never a
> shipped import, because a `scaffold` verb importing `typescript` would move it onto scaffold's
> runtime edge (C1, C5).
>
> after: The TypeScript compiler API stays the **control** the scanner is measured against —
> `typescript/unstable/ast`'s `getJSDocTags` and `typescript/unstable/sync`'s
> `Symbol.getDocumentationComment(checker)`, which returns a string rather than display parts and read
> the summary and every tag over the core project in 61 ms — and is never a shipped import, because a
> `scaffold` verb importing `typescript` would move it onto scaffold's runtime edge (C1, C5).

`PROPOSAL.md`, Option 3 § Mechanism:

> before: **The dependency delta is none.** oxfmt `0.65.0`, oxlint `1.80.0`, and `typescript` `6.0.3`
> are all declared already.
>
> after: **The dependency delta is none.** oxfmt `0.65.0`, oxlint `1.80.0`, `typescript` `7.0.2`, and
> the `@typescript/typescript6` bridge are all declared already.

`PROPOSAL.md`, Option 3's risk row for a missed doc block:

> before: Where the scan proves unsound, the reader becomes `ts.getJSDocCommentsAndTags`
> (`typescript.d.ts:8889`) and `ts.displayPartsToString` (`:11426`), which a Vitest sweep can import at
> no dependency cost because `typescript` is already a development dependency.
>
> after: Where the scan proves unsound, the reader becomes `typescript/unstable/sync`'s
> `Symbol.getDocumentationComment(checker)`, which a Vitest sweep can import at no dependency cost
> because `typescript` is already a development dependency. `ts.getJSDocCommentsAndTags` and
> `ts.displayPartsToString` are gone at the 7 major.

`PROPOSAL.md`, constraint C12:

> before: `typescript` `6.0.3` already exposes the JSDoc readers named under C5
>
> after: `typescript` `7.0.2` already exposes the JSDoc readers through its `unstable/ast` and
> `unstable/sync` entries

`PROPOSAL.md`, the candidate table's `typescript` row:

> before: | `typescript` | `6.0.3`, development edge | JSDoc through `ts.getJSDocTags`
> (`typescript.d.ts:8750`), `ts.getJSDocCommentsAndTags` (`:8889`), `Symbol.getDocumentationComment`
> (`:6548`), `ts.displayPartsToString` (`:11426`) | … |
>
> after: | `typescript` | `7.0.2`, development edge | JSDoc through `typescript/unstable/ast`'s
> `getJSDocTags` and `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)` | … |

`ROADMAP.md` § 1 gained the browser limit and the retirement rows under **scaffold**, and the fleet
visit under **fleet**. The browser row, in full:

> - **scaffold**: a generated workspace that selects `app/browser` holds `typescript` at
>   `APP_BROWSER_TYPESCRIPT_RANGE` while every other workspace takes the shared 7 floor, because
>   `vue-tsc` has no TypeScript 7 support (`vuejs/language-tools` issue 5381, open since
>   2026-05-26) and it is the checker that workspace's own `check:app:browser` script runs. Delete
>   the range, its spread in `blueprintToDevDependencies`, and the guide paragraph naming it when
>   `vue-tsc` runs against 7; that release is the trigger. No fleet package selects that
>   environment, measured 2026-09-05.

The retirement rows carry R1 (the AST-shaped policy rules to the oxlint `policy` plugin), R2 (the
ESNext fence transpile to `node:module`'s `stripTypeScriptTypes`, with the CommonJS transpile staying
on the bridge), and R3 (the checker-level readers to `typescript/unstable/sync`, each with its 7.1
re-read obligation and the `Symbol` import rename). The fleet row carries R7's per-target order, its
`probe` prerequisite, and the trigger.

## Tree state

```text
$ git status --short
 M PROPOSAL.md
 M ROADMAP.md
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M guides/scaffold.md
 M host.json
 M package-lock.json
 M package.json
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/templates.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
```

```text
$ git diff --stat
 PROPOSAL.md                                      |  61 ++--
 ROADMAP.md                                       |  41 +++
 configs/src/vite.core.config.ts                  |   5 +
 configs/src/vite.server.config.ts                |   8 +-
 guides/scaffold.md                               |  12 +
 host.json                                        |   4 +-
 package-lock.json                                | 375 ++++++++++++++++++++++-
 package.json                                     |   2 +-
 src/core/compilers.ts                            |   8 +
 src/core/constants.ts                            |  10 +
 src/core/templates.ts                            |  21 +-
 tests/src/bin/CLI.test.ts                        |  37 ++-
 tests/src/core/compilers.test.ts                 |   4 +-
 tests/src/core/constants.test.ts                 |  22 +-
 tests/src/core/fixtures/setup-false-manifest.txt |   2 +-
 tests/src/core/fixtures/source-manifest.txt      |   2 +-
 16 files changed, 557 insertions(+), 57 deletions(-)
```

Every path is in the brief's owned set. Nothing outside it moved.

## Acceptance criteria

| Criterion                                                                                     | State                                                          |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `npx tsc --version` prints `Version 7.0.2`                                                    | Met.                                                           |
| The full gate chain exits 0                                                                   | Met.                                                           |
| The release-mode distribution proof exits 0                                                   | Not met. `@orkestrel/probe`'s optional peer; see § Deviations. |
| `git diff` shows the override in each config and each template, the fork, and no change outside the owned files | Met.                             |

## Deviations

### The generated workspace cannot install while `@orkestrel/probe` pins the 6 major

**Expected.** The release-mode distribution proof exits 0, per acceptance criterion 2.

**Found.** The generated workspace's `npm install` refuses `ERESOLVE`. `@orkestrel/probe@0.0.12`
declares `typescript@^6.0.3` as an optional peer, and the workspace installs `typescript@7.0.2`. The
cause is neither a missing bridge nor a missing override, so the deviation contract applies.

**Evidence.** The generated manifest, emitted from this tree and installed in a scratch directory
outside the repository:

```text
$ node -e "…blueprintToManifest(createBlueprint('sample', { src: ['core', 'server'] }))…"
		"@orkestrel/probe": "^0.0.12",
		"@typescript/typescript6": "^6.0.2",
		"typescript": "^7.0.2",

$ PATH=/opt/npm11/bin:$PATH npm install --ignore-scripts --no-audit --no-fund
npm error code ERESOLVE
npm error While resolving: @orkestrel/probe@0.0.12
npm error Found: typescript@7.0.2
npm error   dev typescript@"^7.0.2" from the root project
npm error Could not resolve dependency:
npm error peerOptional typescript@"^6.0.3" from @orkestrel/probe@0.0.12
npm error Conflicting peer dependency: typescript@6.0.3
INSTALL_EXIT=1
```

The same refusal reaches this repository's own manifest on a clean install, under npm 10 as well as
npm 11:

```text
$ cp package.json <scratch>/ && cd <scratch> && npm install --ignore-scripts --no-audit --no-fund
npm error code ERESOLVE
npm error   peerOptional typescript@"^6.0.3" from @orkestrel/probe@0.0.12
NPM10_EXIT=1
```

The in-place `npm install` at the start of this unit succeeded because it resolved against the
existing `package-lock.json`, where npm downgraded the same conflict to
`npm warn ERESOLVE overriding peer dependency`. So the committed lockfile installs and a fresh clone
does not.

**The control**, drawn from outside the claim: the same manifest with the `@orkestrel/probe` row
removed and nothing else changed.

```text
$ node -e "…delete m.devDependencies['@orkestrel/probe']…" && npm install --ignore-scripts --no-audit --no-fund
added 148 packages in 10s
CONTROL_EXIT=0
```

Every other row resolves against `typescript@7.0.2`, the bridge included. `@orkestrel/probe` is the
whole conflict.

**Done and not done.** Every owned file is done and every other gate is green. The distribution
proof closes when `probe` widens that optional peer to `^6.0.3 || ^7.0.0`, which is reconciliation
R6 and a `probe` release on its own account. `@orkestrel/probe` is not in this unit's owned set, and
`BASE_DEV_DEPENDENCIES` dropping the row or the manifest gaining an `overrides` entry are product
decisions the brief does not authorize.

**Hypothesis.** The reconciliation ordered the `probe` release before the fleet visit (R7) and read
scaffold's own move as independent of it. Scaffold is itself a `probe` consumer and generates
workspaces that are consumers too, so the release is a prerequisite of this stage rather than of the
fleet visit.

### Ancillary decisions, taken and recorded

- **The override's value.** `undefined` does not typecheck under `exactOptionalPropertyTypes`, so
  the landed value is `''`, which reaches the same api-extractor branch. § The override's form
  carries the reading and the rejected alternatives.
- **The browser constant's shape.** The brief says "the browser-workspace constant beside
  `APP_BROWSER_DEV_DEPENDENCIES`". The value is one range rather than a table, so
  `APP_BROWSER_TYPESCRIPT_RANGE` is a string and `blueprintToDevDependencies` spreads
  `{ typescript: APP_BROWSER_TYPESCRIPT_RANGE }`. A one-row frozen record would have been a
  container around a single value, and the name it needed did not fit the guide table's column.
  The constant stays outside `TABLES` in `tests/src/core/constants.test.ts`, because every table
  there derives from the manifest and this range deliberately does not; it is proven through the
  emitted range instead, which is what a workspace receives.
- **`tests/src/bin/CLI.test.ts`'s `typescript` packument.** The brief scoped the range literals. The
  fixture's single-version packument is a second thing the move made false, reported under § The one
  product reading the fork changed. Both registry maps in that file now serve both majors.
- **`PROPOSAL.md` beyond the three named sentences.** Constraint C12 and the candidate table's
  `typescript` row state the same pin and the same removed members, so both were amended. The
  measurement in C5 — `dist/src/core/index.d.ts` at 229169 bytes — was left as the reading it was,
  taken before this move.
- **`README.md`.** The brief names it "where it names the range". It names no TypeScript range:
  `grep -ci typescript README.md` returns `0`. No edit was made.
- **`tests/src/bin/helpers.test.ts`.** The brief names line 344. Its `typescript` rows are inert
  fixture data passed to `releasesToExit`, `releasesToQuestions`, and
  `manifestToWritableDependencies`, none of which reads the planned range, and `npm run test:src:bin`
  is green with the file untouched. No edit was made.
- **A throwaway probe.** `tmp/probe/ts7.test.ts` settled why the app-browser repair stopped writing,
  rather than reasoning about it. It was deleted; `tmp/probe/` no longer exists.
