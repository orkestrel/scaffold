# Report — U3-fix (scaffold)

## Edits

1. **Seeds mirror the real configs** (`src/core/templates.ts`, `vites.src.core`/`server`/`browser`).
   `core` and `server` now mirror the checked-in `configs/src/vite.{core,server}.config.ts` files.
   `browser` takes the server seed's shape with `tsconfig.browser.json` and `srcBrowser`.
   ```diff
   -			core: `import { defineConfig, mergeConfig } from 'vite'
   -import dts from 'vite-plugin-dts'
   -import { environmentBoundary, outputBoundary } from '../helpers.js'
   +			core: `import { defineConfig, mergeConfig } from 'vite'
   +import { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'
    import { peers, srcCore, resolveWorkspacePath } from '../../vite.config.ts'
   @@
   -			dts({
   -				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
   -				bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: ['node'] } } } } },
   -			}),
   +			declarationRollup({
   +				project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
   +				types: ['node'],
   +			}),
   ```
   `browser` and `server` seeds dropped `dts(...)`/`beforeWriteFile`/`{{replacement}}` for a direct
   `declarationRollup({ project, rewrite: rewriteCoreSpecifier })` call and a two-sentence comment.
   Mirrors the checked-in `vite.core.config.ts`/`vite.server.config.ts` byte for byte; `browser` has
   no checked-in counterpart in this core/server-only workspace and takes the prescribed shape.

2. **The renderer** (`src/core/compilers.ts`). Browser and server branches assign the seed directly;
   `nameToRewrite` import removed.
   ```diff
   -	nameToRewrite,
    	serializeTypeScriptString,
   @@
   -			} else if (path === 'configs/src/vite.browser.config.ts') {
   -				content = fillTemplate(CONFIG_TEMPLATES.vites.src.browser, {
   -					replacement: nameToRewrite(blueprint.name),
   -				})
   -			} else if (path === 'configs/src/tsconfig.browser.json') {
   +			} else if (path === 'configs/src/vite.browser.config.ts') {
   +				content = CONFIG_TEMPLATES.vites.src.browser
   +			} else if (path === 'configs/src/tsconfig.browser.json') {
    				content = CONFIG_TEMPLATES.tsconfigs.src.browser
   -			} else if (path === 'configs/src/vite.server.config.ts') {
   -				content = fillTemplate(CONFIG_TEMPLATES.vites.src.server, {
   -					replacement: nameToRewrite(blueprint.name),
   -				})
   +			} else if (path === 'configs/src/vite.server.config.ts') {
   +				content = CONFIG_TEMPLATES.vites.src.server
   ```

3. **`nameToRewrite` deleted** from `src/core/helpers.ts` with its TSDoc (41 lines removed);
   deleted its `describe` block, its `import`, and the now-unused `MAX_NAME_LENGTH`/`isNumber`
   imports from `tests/src/core/helpers.test.ts` (both imports lost their only reader once the
   block was gone; kept to satisfy `oxlint --deny-warnings`); deleted its row from
   `guides/scaffold.md`. `matchesPrintWidth` and `serializeTypeScriptString` keep readers elsewhere
   in `src/core/compilers.ts`, so neither moved.

4. **Compilers test expectations** (`tests/src/core/compilers.test.ts`). Replaced
   `explains the declaration rewrite in every emitted published face` (asserting `vite-plugin-dts
   rolls this face…`/`beforeWriteFile`) with `reaches core through the rewrite in every emitted
   published face`, asserting `declarationRollup({`, `rewrite: rewriteCoreSpecifier,`, and the new
   comment sentence. Also removed `joins the declaration rewrite only while the line it prints fits
   the width` (56 lines net): it drove `blueprintToConfigArtifacts` through per-name wrapping
   behaviour that only `nameToRewrite` produced, and the seeds no longer vary by name, so nothing it
   asserted can occur post-fix. Flagged: the brief named only the 1404–1420 expectations; deleting
   the width test is a consequence of edit 3, not separately prescribed, and I judged it necessary
   to close the red gate it would otherwise leave (nothing in `blueprintToConfigArtifacts` output
   varies with name length anymore).

5. **Scratch emit leaves the output** (`configs/helpers.ts`). Scratch is now
   `mkdtempSync(join(tmpdir(), 'orkestrel-declarations-'))`; `rollup` (the published `index.d.ts`)
   stays under the face's real output. Imports gained `mkdtempSync` (`node:fs`), `tmpdir`
   (`node:os`), `join` (`node:path`). TSDoc's scratch-location sentence rewritten to name the host
   temporary directory and to state why keeping the scratch outside the output protects a sibling
   `declarations` folder.
   ```diff
   -			const scratch = resolvePath(output, 'declarations')
   +			const scratch = mkdtempSync(join(tmpdir(), 'orkestrel-declarations-'))
    			const rollup = resolvePath(output, 'index.d.ts')
   ```

6. **One `createRequire`** (`configs/helpers.ts`). `const load = createRequire(import.meta.url)`
   bound once at the top of `closeBundle`; both call sites (`load.resolve('typescript/bin/tsc')`,
   `load('@microsoft/api-extractor')`) use it. Comment added directly above the extractor load
   naming why the literal `createRequire` call is the form used.

7. **Named members** (`configs/helpers.ts`, `isExtractorModule` TSDoc). `@returns` and `@remarks`
   now name `Extractor.invoke` and `ExtractorConfig.prepare` instead of "both callable entry
   points"/"both entry points". `grep -n 'both' configs/helpers.ts` finds two remaining lines
   (444, 606-607), neither inside this TSDoc block.

8. **The skip control** (`tests/config.test.ts`). Captured `extractorPath` beside
   `extractorResolved`. Split the fixed `node_modules/@microsoft/api-extractor` assertion into two
   dedicated tests — `finds the resolved extractor on disk` (`existsSync(extractorPath)`, run when
   resolved) and `rejects resolving the unavailable extractor` (keeps the original throw assertion,
   run when unresolved) — because inlining both branches as one `if`/`else` inside the existing test
   tripped `vitest/no-conditional-expect` under `--deny-warnings`. This is a mechanical
   consequence of the lint gate, not a change to the prescribed behaviour.

9. **The real-build proof** (`tests/config.test.ts`). `rolls one face into a single declaration and
   rewrites its core specifier` now drives the `rewritten` and `kept` faces through a real Vite
   `build()` (`root`, `configFile: false`, `logLevel: 'silent'`, `publicDir: false`,
   `build.write: true`, `build.lib.entry` the fixture server entry, `formats: ['es']`, `external`
   matching `node:`/`@orkestrel/`) with `declarationRollup({ project, rewrite: rewriteCoreSpecifier
   })`/`declarationRollup({ project })` in `plugins`. The `serve` control keeps driving
   `configResolved`/`closeBundle` directly through `Reflect.apply`. Every original assertion is
   kept and extended to both faces (one `index.d.ts`, no `declarations` folder, no `idle` output,
   rewritten specifier present/`@src/core` absent with `rewrite`, `@src/core` present/package name
   absent without it). `it.skipIf(!extractorResolved)` unchanged.

10. **The guard's true branch** (`tests/config.test.ts`). Added a positive `isExtractorModule` case:
    a hand-built object whose `Extractor`/`ExtractorConfig` are functions carrying `invoke`/
    `prepare` (`Object.assign(() => undefined, { invoke: () => undefined })`), asserted `true`,
    beside the three existing `false` cases.

11. **The rule's waiver** (`.claude/rules/workspace.md` § Configuration authority). The sentence
    that lets `configs/policy.ts` keep its own types, data, and functions in one file now names
    `configs/helpers.ts` too and calls both "vendored leaves", re-wrapped at 100 columns.

## Acceptance criteria

1. `grep -n -E "vite-plugin-dts|dts\(|beforeWriteFile|\{\{replacement\}\}|nameToRewrite" src/core/templates.ts src/core/compilers.ts src/core/helpers.ts configs/helpers.ts`
   — exit 1, no output (grep's own no-match exit code; prints nothing as required).
   `grep -n 'both' configs/helpers.ts` — exit 0, prints lines 444, 606, 607, none inside the
   `isExtractorModule` TSDoc.

2. `npx oxfmt --config .oxfmtrc.json --check <every owned file>` — exit 0:
   `All matched files use the correct format. Finished in 734ms on 9 files using 4 threads.`
   `npx oxlint --config .oxlintrc.json --deny-warnings <every owned .ts file>` — exit 0 (no output).
   `npm run check` — exit 0 (root `tsc`, `check:src:core`, `check:src:server`, `check:src:bin` all
   ran clean).

3. `npm run test:src:core` — exit 0: `Test Files 9 passed (9)`, `Tests 385 passed (385)`, including
   `blueprintToRootVite fixed proofs > keeps this repository byte-identical to every configuration
   it generates`.

4. `npm run test:guides` — exit 0: `Test Files 1 passed (1)`, `Tests 17 passed (17)`.

5. `npm run build:src:core` — exit 0 (`✓ built in 701ms`, declaration copied to `.d.cts`).
   `npm run build:src:server` — exit 0 (`✓ built in 535ms`, declaration copied to `.d.cts`).
   `cmp dist/src/server/index.d.ts .../scaffold-server/rollup.d.ts` — exit 0, identical.
   `cmp dist/src/core/index.d.ts .../scaffold-core/rollup.d.ts` — exit 1, differs at char 113056.
   `find dist/src/core dist/src/server -name '*.d.ts'` lists `dist/src/core/index.d.ts` and
   `dist/src/server/index.d.ts` alone; no scratch or `declarations` folder under either.

6. `npm run test:config` — exit 1: `Test Files 1 failed (1)`, `Tests 1 failed | 110 passed | 1
   skipped (112)`. The one failure is exactly the named exception:
   `root configuration > keeps the committed host inventory aligned with the vendored checkout
   bytes` — `The committed host inventory is stale at .claude/rules/workspace.md,
   configs/helpers.ts, guides/scaffold.md, tests/config.test.ts`, which the criterion says the
   verifier's `build` closes. The skipped test is the extractor-unresolved counterpart of edit 8's
   split, correctly inapplicable because the extractor resolves in this tree.

## `git status --short`

```
 M .claude/rules/workspace.md
 M .orkestrel/campaign/ts6-api/ledger.md
 M configs/helpers.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M guides/scaffold.md
 M host.json
 M src/core/compilers.ts
 M src/core/helpers.ts
 M src/core/templates.ts
 M tests/config.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
?? .orkestrel/campaign/ts6-api/instruments/commit-u2.sh
?? .orkestrel/campaign/ts6-api/instruments/u7-integration.sh
?? .orkestrel/campaign/ts6-api/u3-audit-*.md
?? .orkestrel/campaign/ts6-api/u3-declaration-rollup-report.md
?? .orkestrel/campaign/ts6-api/u3-declaration-rollup.diff.txt
?? .orkestrel/campaign/ts6-api/u3-declaration-rollup.status.txt
?? .orkestrel/campaign/ts6-api/u3-fix-brief.md
?? .orkestrel/campaign/ts6-api/u3-verify-*.md
?? .orkestrel/campaign/ts6-api/u7-*.md
?? .orkestrel/campaign/ts6-api/u7-probe-typestage.diff.txt
?? .orkestrel/campaign/ts6-api/u7-probe-typestage.status.txt
```
`configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, and `host.json` were
already modified before this unit started (U3's prior uncommitted edits, per the brief's host
facts); this unit did not touch them. The `.orkestrel/campaign/ts6-api/` untracked files predate
this dispatch.

## `git diff --stat`

```
 .claude/rules/workspace.md            |   5 +-
 .orkestrel/campaign/ts6-api/ledger.md |  10 ++
 configs/helpers.ts                    | 304 +++++++++++++++++++++++++++++++++-
 configs/src/vite.core.config.ts       |  17 +-
 configs/src/vite.server.config.ts     |  19 +--
 guides/scaffold.md                    |   1 -
 host.json                             |   6 +-
 src/core/compilers.ts                 |   9 +-
 src/core/helpers.ts                   |  41 -----
 src/core/templates.ts                 |  56 ++-----
 tests/config.test.ts                  | 243 +++++++++++++++++++++++++++
 tests/src/core/compilers.test.ts      |  56 +------
 tests/src/core/helpers.test.ts        |  89 +---------
 13 files changed, 598 insertions(+), 258 deletions(-)
```
The large `configs/helpers.ts` count includes prior uncommitted content from U3's original pass,
not only this unit's edits (imports, scratch location, `createRequire` binding, two TSDoc
passages).

## What I could not close

- **Criterion 5's core `cmp`.** `dist/src/core/index.d.ts` embeds `CONFIG_TEMPLATES.vites.src.*` as
  literal string types (core's public API re-exports the template constants), so its declaration
  rollup necessarily changed byte for byte the moment the seeds changed — which is this unit's
  entire objective. The comparison target,
  `/tmp/claude-0/.../scratchpad/ts6/u1/scaffold-core/rollup.d.ts`, was captured before any of U3's
  seed changes landed and still carries the `dts(...)`/`beforeWriteFile`/`{{replacement}}` seed
  text. `dist/src/server/index.d.ts` does not re-export these constants and matches its U1 copy
  exactly, confirming the divergence is confined to the changed seed strings and not a build
  regression. I did not regenerate or otherwise alter the comparison target — that is not among the
  owned files — and did not weaken the fix to force a byte match against stale reference bytes.
  **Flagged as unresolved**: this criterion, as literally stated, cannot pass without either a
  fresh reference copy or a criterion restated against `test:src:core`'s live parity assertion
  (which does pass and is the mechanism that actually proves the seeds match the checked-in
  configs).
- **Criterion 6's host-inventory row.** Red exactly as the criterion names, deferred to the
  verifier's `build`.

## Claims I flag

- The deletion of the `joins the declaration rewrite only while the line it prints fits the width`
  test (edit 4 region) was not itself named in the brief's edit list, only its consequence (removing
  `nameToRewrite`) was. I judged deleting it correct because no code path can produce the behaviour
  it asserts once `nameToRewrite` is gone, and leaving it in place would red the gate for reasons
  unrelated to any of this unit's edits.
- The `MAX_NAME_LENGTH`/`isNumber` import removals in `tests/src/core/helpers.test.ts` are a similar
  mechanical consequence of deleting the `nameToRewrite` describe block, not separately named.
- Splitting the skip-control assertion into two `it` blocks (edit 8) changes the test's shape from
  what a literal reading of "the unresolved branch keeps its throw assertion" might suggest (one
  test, one `if`/`else`); I judged this necessary to satisfy `vitest/no-conditional-expect` under
  `--deny-warnings`, keeping both assertions' substance and applicability conditions intact.
