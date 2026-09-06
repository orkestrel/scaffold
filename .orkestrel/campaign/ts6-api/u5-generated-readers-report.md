# Report — U5 generated-readers (scaffold)

## Departure from a fixed item: the drives load through `createRequire`, not `import()`

The brief's § Drives fixes `import(pathToFileURL(file).href)`. That call cannot coexist with the
brief's own acceptance criterion 2.

- **Expected**: the scratch `.mjs` is loaded with `import(pathToFileURL(file).href)`.
- **Found**: `npm run lint:check` exits 1 on exactly that call, in both owned test files.

  ```text
  tests/src/core/templates.test.ts:339:40: error import(no-dynamic-require): Expected a literal string or immutable template literal
  tests/guides.test.ts:363:41: error import(no-dynamic-require): Expected a literal string or immutable template literal
  ```

  `.oxlintrc.json` sets `"import/no-dynamic-require": ["error", { "esmodule": true }]` at the root
  with no `tests/**` override, and the file is off-limits. A probe over the four spellings the rule
  might admit found none:

  ```text
  $ npx oxlint --config .oxlintrc.json --no-ignore --deny-warnings <probe>.ts
  <probe>.ts:4:22  import(url)      → error
  <probe>.ts:7:22  import(`${url}`) → error
  <probe>.ts:10:22 import(spec)     → error   (spec is a const bound to a literal)
                   import('./fixed.mjs') → clean
  ```

- **Decision taken, as an ancillary choice about the loader call**: the load runs through
  `createRequire(import.meta.url)`, which is the repository's own recorded resolution for this
  rule. `configs/helpers.ts:681` states it at the deferred api-extractor load: "a variable specifier
  reddens `import/no-dynamic-require`, so the literal `createRequire` call is the form that clears
  every gate". Node loads an ES module through `require` from 22.12.0 on, and
  `MINIMUM_NODE_VERSION` (`src/core/constants.ts:482`) is `'22.12.0'`.
- **What the departure does not change**: the module is still a scratch `.mjs` transformed by
  `transformWithOxc`, still written per drive into a directory `mkdtemp` names, still loaded in
  process as an ES module, and the call list is still a second `.mjs` that imports the first. No
  string is evaluated, no `vm` remains, and no compiler specifier remains.
- **Overrule path**: adding a `tests/**` override for `import/no-dynamic-require` to
  `.oxlintrc.json` restores the brief's literal call. That file belongs to U2.

## The reader's signature and home

`tests/setupServer.ts`, exported and tested in `tests/setupServer.test.ts`.

```ts
export function readStatements(source: string, name: string): readonly TestStatement[]

export interface TestStatement {
	readonly syntax: ESTree.Statement['type']
	readonly exported: 'value' | 'type' | undefined
	readonly specifier: string | undefined
	readonly declarations: readonly TestDeclaration[]
	readonly text: string
	readonly body: readonly TestStatement[]
}

export interface TestDeclaration {
	readonly name: string
	readonly parameters: readonly string[]
	readonly returns: string | undefined
}
```

- `parseSync(name, source)` comes from `vite`, and a non-empty `errors` is refused with
  `The parser refused ${name}: ${first.message}`.
- `syntax` names the declaration a named export wraps rather than the wrapper, so
  `canHaveModifiers`/`getModifiers` with `ExportKeyword` becomes the `ExportNamedDeclaration`
  unwrap plus `exported`. `exported` carries `exportKind`, defaulted to `'value'`, for a named,
  default, or star export.
- `parameters` and `returns` are source slices of the parser's own spans: each parameter node, and
  the `returnType.typeAnnotation` node. A function declaration reports its own; a variable
  declarator reports its arrow or function-expression initializer's.
- `body` carries a function declaration's own statements, projected the same way, which is what
  `buildDistributionClassification` walks for `buildStage`.
- **Field added beyond the brief's list**: `specifier`. `extractDeclarations` needs the proof's
  `node:` imports and must leave its `vitest` import behind, and deciding that from the statement's
  text would be the text scan the plan refuses. The parser returns the specifier, so the reader
  exposes it.

Read from it: `extractDeclarations`, `buildDistributionClassification`, and `findParameters` in
`tests/src/core/templates.test.ts`, and the declaration lift in `tests/guides.test.ts`.
`readDeclaredNames` is gone; `statement.declarations` replaces it. No regular expression reads a
declaration in either file.

## The drives' scratch shapes

`driveClassifier(source, calls)` in `tests/src/core/templates.test.ts` is async and takes module
text rather than a path, so the staging functions no longer touch the filesystem
(`stageClassifier` collapsed into `extractDeclarations`; `stageDistributionClassifier` and
`stageDistributionClassification` became `buildDistributionClassifier` and
`buildDistributionClassification`). Each drive:

1. `createScratch({ parent: ensureTmpRoot(), prefix: 'scaffold-e2-drive-' })` — `mkdtemp` gives the
   unique name per drive, so the loader keys each module on a path it has not seen;
2. `transformWithOxc(source, 'classifier.ts', { target: 'esnext' })` → `classifier.mjs`;
3. `drive.mjs` = `import * as classifier from './classifier.mjs'` plus
   `export const answers = [<calls>]`;
4. `createRequire(import.meta.url)(join(workspace.path, 'drive.mjs'))`, then
   `structuredClone(driven.answers)`;
5. `workspace.destroy()` in `finally`.

The lifted module carries the emitted proof's own value imports whose specifier starts with
`node:` — `node:child_process`, `node:fs`, `node:module`, `node:os`, `node:path`, `node:url` — which
is what replaces the injected `dirname`, `existsSync`, `join`, `readFileSync`, `statSync`. The
proof's `vitest` import is left behind, because it belongs to the suite around the declarations
rather than to the declarations. `tests/guides.test.ts` builds the same pair inline for its own six
lifted functions, which are self-contained and need no import.

`tests/guides.test.ts` writes its pair into an OS temporary directory and
`tests/src/core/templates.test.ts` under the repository's `tmp/`; both load.

## Controls

- **The lift's control stays**: `refuses to lift a declaration the emitted proof does not carry`
  (`tests/src/core/templates.test.ts`) asserts `extractDeclarations(content, ['resolveTarget',
  'resolveNothing'])` throws `declares no resolveNothing`. `tests/guides.test.ts` keeps
  `expect(declared).toStrictEqual(names)`, which fails on a name the proof stopped declaring.
- **The pattern-missing control** is
  `reads a wrapped declaration an anchored signature pattern reports nothing for`
  (`tests/setupServer.test.ts`). The same anchored pattern reports the printed signature and
  reports `null` for the formatter-wrapped one; the reader reports both, with both parameters and
  the return type.
- **The refusal control** is `refuses a source the parser reports an error for`, paired with a
  valid source through the same call so the refusal is not vacuous.
- **The drive's own mutation probe.** With `[true, false]` changed to `[false, false]` in
  `classifies native addon targets as modules`:

  ```text
  $ npx vitest run … --project src:core tests/src/core/templates.test.ts -t 'classifies native addon targets'
  -   false,
  +   true,
  Tests  1 failed | 31 skipped (32)
  ```

  Restored, and `grep -n "expect(answers).toStrictEqual(\[true, false\])"` reports line 1331 again.
- **Module freshness across drives** is proved structurally by the suite: a run drives both
  `buildDistributionClassifier` (no `classifyStage`) and `buildDistributionClassification` (with
  it), and every drive answers, which a cached module could not do.
- **The `findParameters` blind control stays** and fires: the sweep plants a parameter into every
  emitted `vite.config.ts` and asserts `blind` is empty.

## Criteria

**1. Neither test nor the setup module names a compiler specifier.**

```text
$ grep -n "from 'typescript'\|node:vm\|runInNewContext" tests/guides.test.ts tests/src/core/templates.test.ts tests/setupServer.ts
exit=1 (no output)
```

**2. Formatter, lint, and typecheck.**

```text
$ npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts tests/src/core/templates.test.ts tests/setupServer.ts tests/setupServer.test.ts
All matched files use the correct format.
Finished in 6ms on 4 files using 4 threads.
exit=0

$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.bin.json
exit=0
```

**3. `npm run test:setup`.**

```text
Test Files  2 passed (2)
     Tests  73 passed (73)
  Duration  1.78s
exit=0
```

The three added rows are `reads the export kind, the bindings, and the source slice of each
top-level statement`, `refuses a source the parser reports an error for`, and `reads a wrapped
declaration an anchored signature pattern reports nothing for`.

**4. `npm run test:guides` and `npm run test:src:core`.**

```text
$ npm run test:guides
Test Files  1 passed (1)
     Tests  17 passed (17)
  Duration  3.24s
exit=0

$ npm run test:src:core
Test Files  9 passed (9)
     Tests  385 passed (385)
  Duration  15.21s
exit=0
```

`385 passed` equals the count U4's report recorded before this change, and `17 passed` is the
guides project's own count, so every classifier drive returns the answers the tests recorded and no
row was lost.

## The brief's unknown, answered

`parseSync` reports an arrow initializer's return type at
`declarations[0].init.returnType.typeAnnotation`, and slicing that node's span yields `UserConfig`.
Measured against the real generated `vite.config.ts` (a `src: ['core']` blueprint), through a probe
run in the `src:core` project and then removed:

```text
CONFIG {"type":"ExportNamedDeclaration","exportKind":"value","inner":"VariableDeclaration",
  "declName":{"type":"Identifier","name":"policy",…},"initType":"ArrowFunctionExpression",
  "initReturn":{"type":"TSTypeAnnotation","typeAnnotation":{"type":"TSTypeReference",
    "typeName":{"type":"Identifier","name":"UserConfig",…,"start":1589,"end":1599},…}},"initParams":"[]"}
```

`srcCore`, `policy`, `config`, `distribution`, and `probe` all read the same way, and the planted
parameter lands at `init.params` with the return type unmoved.

Two further readings from the same probe:

- The generated `vite.config.ts` also carries an exported **function declaration**,
  `resolveWorkspacePath(relativePath: string): string`, which declares a parameter. The
  `UserConfig` return-type filter is what keeps it out of `findParameters`, exactly as it kept it
  out before; nothing exempts it by name. The comment on `findParameters` now says so.
- The emitted proof's value imports are `node:child_process`, `node:fs`, `node:module`, `node:os`,
  `node:path`, `node:url`, and `vitest`; its type-only imports are `node:child_process` and
  `vitest`. That is the population the `node:` filter draws from.

## One input changed, and why

`findParameters(CONFIG_TEMPLATES.factories.app.browser)` read raw template text carrying
`{{showcasePlugins}}` and `{{plugins}}`. `ts.createSourceFile` recovered from that; `parseSync`
refuses it (`The parser refused vite.config.ts: Unexpected token`), which is the refusal the brief
fixes. The assertion now reads the same declaration out of an emitted `vite.config.ts` for an
`app: ['browser']` blueprint, and asserts the declaration is present before asserting the empty
finding, so the empty finding is not vacuous:

```ts
const browser = requireValue(
	buildModules(createBlueprint('sample', { app: ['browser'] })).get('vite.config.ts'),
)
expect(browser).toContain('function applicationBrowser(showcase: boolean): UserConfig {')
expect(findParameters(browser)).toStrictEqual([])
```

## Observations, reported rather than acted on

- `npm run test:policy` (77 passed), `npm run test:src:server` (432 passed), and
  `npm run test:src:bin` (245 passed) all exit 0. They are named because `tests/setupServer.ts` is a
  setup file for the `src:server` and `src:bin` projects and now imports `vite`, and because the
  policy sweep reads `tests/**` paths. None is a criterion of this brief.
- `tests/guides.test.ts` and `tests/src/core/templates.test.ts` still each carry their own lift and
  their own drive of the same emitted classifier, and the two tests they sit in overlap. The brief
  fixes `extractDeclarations` inside `tests/src/core/templates.test.ts`, so consolidating the lift
  and the drive into `tests/setupServer.ts` is a successor unit, not this one.
- Two tests lost a scratch workspace that existed only to stage a file
  (`classifies native addon targets as modules`, `skips invalid package targets only inside
  fallback arrays`), because staging no longer writes.

## Tree state

```text
$ git status --short
 M tests/guides.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/templates.test.ts

$ git diff --stat
 tests/guides.test.ts             |  70 +++++---
 tests/setupServer.test.ts        | 124 ++++++++++++++
 tests/setupServer.ts             | 139 ++++++++++++++++
 tests/src/core/templates.test.ts | 345 ++++++++++++++++++---------------------
 4 files changed, 462 insertions(+), 216 deletions(-)
```

No file outside the brief's owned set was written. `tmp/` holds no leftover scratch from this unit.

## Flagged claims

- The `createRequire` load is a departure from a fixed item of the brief, resolved by the
  repository's own precedent rather than by the Orchestrator. It is the first section of this
  report for that reason.
- `require` of an ES module is a Node 22.12.0 capability. The suites prove it on this host
  (v22.22.2); no other Node version was exercised. A workspace on the declared floor exactly is
  untested here.
- Module freshness per drive is proved structurally by two lifts with different exports both
  answering in one run, not by a dedicated assertion.
- `structuredClone` is kept on the drive's answers, so the assertions compare same-realm plain
  values exactly as they did under the `vm` drive. Whether it is still needed now that the module
  loads in this realm was not measured.
- The reader projects `body` for a function declaration alone. Every other statement reports an
  empty `body`, which the interface states and the setup test asserts, but a caller expecting a
  block statement's own children gets nothing.
