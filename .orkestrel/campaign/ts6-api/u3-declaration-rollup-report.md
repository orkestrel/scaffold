# Report — U3 declaration-rollup (scaffold)

`declarationRollup` landed in `configs/helpers.ts` and both published faces now roll up through the
workspace `tsc` run as a process plus api-extractor's own engine. `vite-plugin-dts` appears in no
`configs/` file. Each face's roll-up is **byte-identical** to the copy U1 produced (`cmp` exit 0 on
core and on server), so the recipe reproduces U1's measurement exactly rather than only after
normalization.

Two things did not close inside this unit: the vendored host inventory (`host.json`, off-limits) and
criterion 1's literal grep wording. Both are stated in full further on.

## The plugin as landed

`configs/helpers.ts`, beside `outputBoundary` and `environmentBoundary`.

- **Options** — `DeclarationRollupOptions`: `project` (the face's absolute tsconfig path), optional
  `types` (the `types` the extractor's own program reads; defaults to the face's resolved `types`;
  core passes `['node']`), optional `rewrite` (`(content: string) => string`, applied to the final
  roll-up alone).
- **Hook** — `closeBundle`, guarded by `command === 'build'` recorded at `configResolved`.
  Measured on 2026-09-06, vite 8.2.2, Node v22.22.2, over a two-format lib build:

  ```text
  generateBundle: outDir=false index.js=false names=-
  writeBundle:    outDir=true  index.js=true  names=index.js
  generateBundle: outDir=true  index.js=true  names=index.js
  writeBundle:    outDir=true  index.js=true  names=index.cjs|index.js
  closeBundle:    outDir=true  index.js=true  names=index.cjs|index.js
  ```

  `writeBundle` runs once per format and fires before the second format exists; `closeBundle` runs
  once, after every format is on disk. `closeBundle` is therefore the hook, and a scratch folder
  under the face's `dist` output is safe there: `emptyOutDir` has already run, and nothing writes
  into that output afterwards.
- **Steps** — resolve `typescript/bin/tsc` through `createRequire`; read `tsc --showConfig -p
  <project>` and parse the face's `lib`, `types`, and `rootDir`; spawn `process.execPath` with
  `<tsc> -p <project> --declaration --emitDeclarationOnly --noEmit false --outDir <output>/declarations`;
  compute the emitted entry as `<scratch>/<relative(rootDir, libEntry with .ts → .d.ts)>`; load the
  extractor inside the hook; `ExtractorConfig.prepare` then `Extractor.invoke` with
  `localBuild: true`; refuse a result whose `succeeded` is not `true`; apply `rewrite`; remove the
  scratch folder in a `finally`.
- **The exact override** — `buildExtractorOverride(entry, lib, types)` returns the whole option set
  handed to the extractor, and nothing else the face resolved:

  ```ts
  {
  	compilerOptions: {
  		types,                        // options.types ?? the face's resolved types
  		lib,                          // the face's own resolved lib
  		target: 'ESNext',
  		module: 'ESNext',
  		moduleResolution: 'bundler',
  		skipLibCheck: true,
  		strict: true,
  	},
  	files: [entry],
  }
  ```

  No `paths`, no `rootDir`, no `typescriptCompilerFolder`, no `$schema`. The surrounding
  `configObject` carries `projectFolder` = workspace root, `packageJsonFullPath` = the workspace
  `package.json`, `configObjectFullPath` = `<root>/api-extractor.json`, `bundledPackages: []`,
  `dtsRollup.untrimmedFilePath` = `<outDir>/index.d.ts`, `apiReport`, `docModel`, and
  `tsdocMetadata` disabled, and all three message reporters at `logLevel: 'none'`.
- **Consumers** — `configs/src/vite.core.config.ts` passes `project` and `types: ['node']`;
  `configs/src/vite.server.config.ts` passes `project` and `rewrite: rewriteCoreSpecifier`. Neither
  imports `vite-plugin-dts`. The `.d.cts` copy stays in the npm scripts, untouched.
- **New exports** — `ProjectScope`, `ExtractorOverride`, `ExtractorModule`,
  `DeclarationRollupOptions`, `isStringList`, `isExtractorModule`, `readCompilerOutput`,
  `parseProjectScope`, `buildExtractorOverride`, `rewriteCoreSpecifier`, `declarationRollup`. Every
  one is exported and tested. `configs/` permits only the three leaf files, so there is no
  `configs/types.ts` and no `configs/validators.ts`; the types and the two guards live in
  `configs/helpers.ts` because that is the only home the workspace rules leave open.

## The rewrite ruling

`rewrite` has **no default**. A face that omits it ships the roll-up as the extractor wrote it. The
core face omits it; the server face passes the exported `rewriteCoreSpecifier`, which reads the
workspace package name through the existing `packageManifestName(WORKSPACE_ROOT)` helper and
replaces both `@src/core` and `(?:\.\./)+core/index\.[jt]s` with it.

A default that always ran was measured and refused. The core face's own roll-up quotes `@src/core`
in prose:

```text
$ grep -n "@src/core\|\.\./core/index" dist/src/core/index.d.ts
2647:        * spellings produce: an `@src/core` alias resolves to the core source module and
```

A blanket rewrite corrupts that documentation line and moves the shipped core roll-up beyond the
`import` → `import type` class the bump plan measured. The core face therefore passes no `rewrite`,
and the plugin applies none.

`nameToRewrite` in `src/core/helpers.ts` is **not** reused. Its contract is a source-text generator
that returns the ternary consequent a seeded `vite.*.config.ts` template fills a `{{replacement}}`
span with; it is not a `(content: string) => string`. The two contracts do not fit, and the file is
off-limits here (U6 owns it). Because the server face now names a function instead of inlining a
replacement, the seeded template no longer needs a `{{replacement}}` span at all — that is an
observation for U6, not work done here.

## Criteria

### 1. `vite-plugin-dts` absent from `configs/`; api-extractor reached only inside the hook

```text
$ grep -rn 'vite-plugin-dts' configs/
exit=1                                    (no output)

$ grep -n 'api-extractor' configs/helpers.ts
674:				const loaded: unknown = createRequire(import.meta.url)('@microsoft/api-extractor')
702:					configObjectFullPath: resolvePath(WORKSPACE_ROOT, 'api-extractor.json'),
exit=0
```

The first half closes. The second half closes on its stated purpose and **not** on its literal
wording, in two ways I flag rather than claim:

- **The load is a literal `createRequire(...)('@microsoft/api-extractor')` call inside the hook, not
  `await import(...)`.** The brief fixed `await import()`; both gates refuse every form of it. A
  literal `await import('@microsoft/api-extractor')` reddens `tsc` in a workspace that does not
  install the package, which is exactly the app-only workspace the vendored leaf must typecheck in;
  a variable specifier clears `tsc` but reddens lint. Both measured, each with a control:

  ```text
  # literal import(), package absent — the control, which must fail
  control.ts(2,22): error TS2307: Cannot find module '@absent/package-under-probe'
  exit=2
  # variable specifier alone — passes
  exit=0

  $ npm run lint:check          # with the variable specifier
  configs/helpers.ts:674:42: error import(no-dynamic-require): Expected a literal string or
    immutable template literal
  exit=1

  # literal createRequire(import.meta.url)('<package>'), package absent
  exit=0                        (same control file still reddens: TS2307, exit=2)
  ```

  `createRequire` with a literal argument clears both: TypeScript does not module-resolve a
  `NodeRequire` call, and the lint rule accepts a literal. The load stays deferred and inside the
  hook, never at module scope, so the brief's stated reason — "the leaf must resolve in an app-only
  workspace that declares no api-extractor" — is met. Suppressing either diagnostic was not
  considered.
- **Two lines match the grep, not one.** The second is `configObjectFullPath`, the extractor's own
  config-file token path, which U1 passed as `join(projectFolder, 'api-extractor.json')`. It is a
  path literal, not a reach into the package. I kept U1's exact value rather than substituting
  another in-workspace path, because recipe fidelity to the run that produced the byte-identical
  baseline is worth more than a grep count. Changing it is a one-line successor if the round rules
  otherwise.

### 2. Format, lint, typecheck

```text
$ npx oxfmt --config .oxfmtrc.json --check configs/helpers.ts configs/src/vite.core.config.ts \
    configs/src/vite.server.config.ts tests/config.test.ts
All matched files use the correct format.
Finished in 6ms on 4 files using 4 threads.
exit=0

$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
exit=0                                    (no diagnostics)

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.bin.json
exit=0                                    (root, core, server, and bin all silent)
```

### 3. Both faces build, ship one declaration each, and match U1

Run from a removed `dist/src/core` and `dist/src/server`.

```text
$ npm run build:src:core
exit=0
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts

$ npm run build:src:server
exit=0
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts

$ ls -l dist/src/core/index.d.ts dist/src/server/index.d.ts
-rw-r--r-- 1 root root 229194 Sep  6 04:26 dist/src/core/index.d.ts
-rw-r--r-- 1 root root 137481 Sep  6 04:26 dist/src/server/index.d.ts

$ find dist/src/core dist/src/server -name '*.d.ts' | sort
dist/src/core/index.d.ts
dist/src/server/index.d.ts

$ U1=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1
$ diff -w <(grep -vE '^\s*$|^\s*//|^\s*/\*|^\s*\*' $U1/scaffold-core/rollup.d.ts) \
          <(grep -vE '^\s*$|^\s*//|^\s*/\*|^\s*\*' dist/src/core/index.d.ts)
core-diff-exit=0                          (no output)
$ diff -w <(grep -vE '^\s*$|^\s*//|^\s*/\*|^\s*\*' $U1/scaffold-server/rollup.d.ts) \
          <(grep -vE '^\s*$|^\s*//|^\s*/\*|^\s*\*' dist/src/server/index.d.ts)
server-diff-exit=0                        (no output)

$ cmp $U1/scaffold-core/rollup.d.ts dist/src/core/index.d.ts
core-cmp-exit=0
$ cmp $U1/scaffold-server/rollup.d.ts dist/src/server/index.d.ts
server-cmp-exit=0
```

`cmp` is stronger than the criterion asked for: both roll-ups are byte-identical to U1's copies,
CRLF included. The scratch folder is gone from each output (`dist/src/<face>/declarations` does not
exist), and the only other files under each face are `index.js`, `index.cjs`, their maps, and the
`index.d.cts` copy the npm script makes.

### 4. `npm run test:config`

```text
$ npm run test:config
 FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory
   aligned with the vendored checkout bytes
Error: The committed host inventory is stale at configs/helpers.ts, tests/config.test.ts

 Test Files  1 failed (1)
      Tests  1 failed | 109 passed (110)
exit=1
```

**This criterion does not close, for the reason the brief already named.** `host.json` digests every
vendored file, and two of this unit's four owned files — `configs/helpers.ts` and
`tests/config.test.ts` — are vendored. `host.json` is off-limits and `npm run build`, which
regenerates it through `build:inventory`, is barred here. The case closes when the verifier runs
`build`; it is the same case U2 carried through three rounds for the same reason.

Baseline before any edit, taken on the committed tree: `Tests 108 passed (108)`, exit 0. After:
`1 failed | 109 passed (110)` — the two new cases, and the one inventory case whose input I changed.

Both new cases, verbose reporter:

```text
 ✓ configuration helpers > reads the compiler scope and fixed extractor override a declaration
   roll-up requires 188ms
 ✓ configuration helpers > rolls one face into a single declaration and rewrites its core
   specifier 1694ms
```

## The proof, and the defect it caught first

`rolls one face into a single declaration and rewrites its core specifier` builds a real fixture
face under the workspace's own `tmp/` (a `source/core` interface, a `source/server` module importing
it through an `@src/core` alias, and a standalone tsconfig), then drives the real plugin's
`configResolved` and `closeBundle` three times: with `rewrite`, without it, and under
`command: 'serve'`. It asserts that exactly one `.d.ts` exists under the output, that the scratch
tree is gone, that the serve run writes nothing at all, that the roll-up carries the fixture's
declaration and the package specifier and no `@src/core` — and, as the control, that the run without
`rewrite` carries `@src/core` and not the package name. The fixture is removed in a `finally`; `tmp/`
holds no residue after the run.

`reads the compiler scope and fixed extractor override a declaration roll-up requires` proves the
leaves: `parseProjectScope` over the real `tsc --showConfig` output of `configs/src/tsconfig.core.json`,
compared against the committed project file as a second mechanism that could disagree (the compiler
lowercases every resolved library name, so the comparison folds case), and `undefined` for malformed
text, for a config with no `rootDir`, and for a non-string `lib` member; `readCompilerOutput`
throwing on an absent project; `isStringList` and `isExtractorModule` over their false cases; the
exact `buildExtractorOverride` record; `rewriteCoreSpecifier` over both spellings and over a sibling
specifier it must leave alone; and the resolution mechanism the roll-up proof's skip reads.

The roll-up proof ran red before it ran green, and it caught a real defect rather than only
confirming the design:

```text
 FAIL  configuration helpers > rolls one face into a single declaration and rewrites its core specifier
Error: [orkestrel-declaration-rollup] The declaration extractor exposes no entry point
 ❯ closeBundle configs/helpers.ts:671:12
 Tests  2 failed | 108 passed (110)          # 04:22:50, before the fix
```

The guard read the loaded module through `Object.getOwnPropertyDescriptor`. That works for the
value Vite's config loading hands back and fails for the value the test's loader hands back.
Measured shape from the failing run:

```text
SHAPE object [object Object] ConsoleMessageId,CompilerState,Extractor,ExtractorResult,
  ExtractorConfig,ExtractorLogLevel descriptor=undefined get=function default=object
```

The members are reachable through `[[Get]]` and not as own properties. `isExtractorModule` and the
`succeeded` read now use `Reflect.get`, which is correct for either shape, and the case went green:
`1 failed | 109 passed (110)`, the remaining failure being the inventory case alone.

## Conditional skip

The roll-up proof is `it.skipIf(!extractorResolved)`. `extractorResolved` is the result of
`createRequire(import.meta.url).resolve('@microsoft/api-extractor')` at module scope; only a
workspace publishing source from `src` installs that package, and `tests/config.test.ts` is vendored
into every target including app-only ones. The skip cites that named mechanism rather than a
workspace shape, and the always-run case asserts that `require.resolve` rejects an absent package and
that `extractorResolved` agrees with the package directory's existence.

## Touched files

| File | Change |
| --- | --- |
| `configs/helpers.ts` | Added `ProjectScope`, `ExtractorOverride`, `ExtractorModule`, `DeclarationRollupOptions`, `isStringList`, `isExtractorModule`, `readCompilerOutput`, `parseProjectScope`, `buildExtractorOverride`, `rewriteCoreSpecifier`, and the `declarationRollup` plugin; imports `spawnSync`, `createRequire`, `readFileSync`, `rmSync`, `writeFileSync` |
| `configs/src/vite.core.config.ts` | Replaced the `vite-plugin-dts` call with `declarationRollup({ project, types: ['node'] })` |
| `configs/src/vite.server.config.ts` | Replaced the `vite-plugin-dts` call and its inline `beforeWriteFile` with `declarationRollup({ project, rewrite: rewriteCoreSpecifier })` |
| `tests/config.test.ts` | Added the extractor-resolution probe, the new helper names to the required-export list, and the two proofs |

```text
$ git status --short
 M .orkestrel/campaign/ts6-api/ledger.md
 M configs/helpers.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M tests/config.test.ts
?? .orkestrel/campaign/ts6-api/instruments/commit-u2.sh
?? .orkestrel/campaign/ts6-api/u7-audit-brief.md
?? .orkestrel/campaign/ts6-api/u7-integration-brief.md
?? .orkestrel/campaign/ts6-api/u7-probe-typestage-report.md
?? .orkestrel/campaign/ts6-api/u7-probe-typestage.diff.txt
?? .orkestrel/campaign/ts6-api/u7-probe-typestage.status.txt
?? .orkestrel/campaign/ts6-api/u7-verify-brief.md

$ git diff --stat
 .orkestrel/campaign/ts6-api/ledger.md |   3 +
 configs/helpers.ts                    | 291 +++++++++++++++++++++++++++++++++-
 configs/src/vite.core.config.ts       |  17 +-
 configs/src/vite.server.config.ts     |  19 +--
 tests/config.test.ts                  | 203 ++++++++++++++++++++++++
 5 files changed, 506 insertions(+), 27 deletions(-)
```

`.orkestrel/campaign/ts6-api/ledger.md` and every untracked `u7-*` entry are the Orchestrator's, not
this unit's: the ledger rows added are this unit's own dispatch row and U7's return. This unit wrote
only the four owned files.

## What did not close

- **The vendored host inventory.** `npm run test:config` exits 1 on `keeps the committed host
  inventory aligned with the vendored checkout bytes`, because two owned files are vendored and
  `host.json` is off-limits. The verifier's `build` regenerates it.
- **Criterion 1's literal wording.** Two lines match `grep -n 'api-extractor' configs/helpers.ts`,
  and neither is an `import(` expression. The reasons and the measurements are under criterion 1.
- **`src/core/templates.ts`, `src/core/constants.ts`, `package.json`, `guides/scaffold.md`.** They
  still name `vite-plugin-dts`, and `tests/src/core/compilers.test.ts` still asserts the seeded
  template's `beforeWriteFile` text. All are U6's and off-limits here, so the workspace's own configs
  and its seeded templates now disagree until U6 lands.

## Claims I flag

- **The `it.skipIf` branch is proven only in the direction that ran.** The skip's condition is
  asserted, and `require.resolve` is proven to reject an absent package, but no run of this suite has
  taken the skipped branch, because scaffold installs the extractor. The first app-only target's
  `test:config` is where that branch is first exercised.
- **`config.build.lib.entry` is read only in its string form.** A face declaring an array or a record
  of entries yields an empty `source`, and the hook throws
  `The face must build one TypeScript library entry`. Every face in this fleet declares one string
  entry; a multi-entry face would need a design decision this unit did not take.
- **The `@src/core` and `../core/index.[jt]s` replacement is textual and unanchored.** It rewrites
  those spellings wherever they appear in a face's roll-up, prose included. That is exactly what U1
  measured and what the shipped server roll-up already carries, and it is why the core face passes no
  `rewrite` — but a future server-face symbol whose documentation quotes `@src/core` would be
  rewritten too.
- **`newlineKind` is left unset, so the roll-up ships CRLF**, as the published tarball already does
  (3419 of 3419 lines in the shipped core roll-up carry `\r`). That is the recipe U1 fixed and the
  byte-identical match depends on it. Changing it would move every published roll-up's bytes beyond
  the `import` → `import type` class the bump plan measured.
- **The `configObjectFullPath` value `api-extractor.json` is carried from U1 unchanged, not
  re-derived.** I did not measure whether `ExtractorConfig.prepare` accepts another basename.
