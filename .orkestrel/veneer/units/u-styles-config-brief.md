# Unit U-styles-config — the styles wrapper composed from the root, the setup load, the scripts

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Objective

Make Veneer's hand-authored styles axis match the shape the design round fixed
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/styles-axis-design-verdict.md`): the
wrapper composes the root's `srcBrowser()` and replaces the fields the styles build differs in; the
project is named like every root project; the built cascade loads through the styles project's
`setupFiles` rather than at module scope in `tests/setupStyles.ts`; `test:src` reaches the axis.
The published byte set of `dist/src/styles` must not move.

## Law

Read from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/workspace.md`
(§ Environments, § Aliases, § Configuration authority, § Build outputs, § Test project matrix,
§ Typecheck scopes); `.claude/rules/tests.md`; `.claude/rules/typescript.md`;
`.claude/rules/writing.md`. Veneer's own `AGENTS.md` says its law resolves against that checkout.

## Context

**The tree.** `HEAD` is the U1-conform landing commit (named in the dispatch message); the
working tree is clean except `tmp/`. `node_modules` carries the U6 Test tarball and the scaffold
tip tarball installed `--no-save`; `dist/` is built.

**Measured facts.**

- The root `vite.config.ts` (content-owned; never edit) exports `resolveWorkspacePath`, `peers`,
  `mergeOverride`, and the project factories; `srcBrowser()` (`vite.config.ts:125-165`) returns
  `resolve` (the alias table derived from `tsconfig.json`), `publicDir: false`,
  `plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')]`, a lib build
  to `dist/src/browser` whose `rolldownOptions` carry `onLog: enforceBuildLog`, `external`, and
  `output`, and the `src:browser` test project with the resolved Playwright provider and
  `fileParallelism: false`. `mergeOverride` wraps `mergeConfig`, which concatenates arrays, so it
  cannot remove a plugin; `outputBoundary` throws on a mismatched `outDir`.
- The generated `configs/src/vite.browser.config.ts` imports the root as
  `'../../vite.config.ts'` and a leaf as `'../helpers.js'`; match both spellings.
- `configs/src/vite.styles.config.ts` and `configs/src/tsconfig.styles.json` are package-owned:
  scaffold plans no styles path, and `scaffold audit` reports no drift for them.
- The Orchestrator's probe (`units/styles-axis-probe.md` beside the verdict): a stylesheet path in
  a browser project's `setupFiles` is injected as an inline sheet and its custom properties resolve
  on the document element before the test body runs.
- `tests/setupStyles.ts:4` is `import '../dist/src/styles/index.css'`; its remarks at lines 285
  and 557 describe that import resolving to an empty string in Node. The module is loaded by the
  Node `setup` project (`tests/setupStyles.test.ts`) and by the browser `src:styles` project.
- `package.json:60-64,76`: `test` chains `test:src` and then `test:src:styles` separately;
  `test:src` runs `--project src:core --project src:browser`; `test:src:styles` runs
  `build:src:styles` first; `test:setup` builds nothing.
- `tests/src/styles/tokens.test.ts:5` imports `index.rtl.css?raw` from `dist/`; leave it and every
  RTL byte alone (the user's ruling: no work on RTL).

**Host.** Windows. Your exec shell is PowerShell with script execution disabled: run scripts as
`npm.cmd run <name>`; a `.ps1` file is refused. Browser projects run inside this sandbox on this
host (Playwright Chromium launches). Edge runs are the verifier's. `git status` warns about a
missing global ignore file; the exit code is still 0. Write instruments under `tmp/u-styles/`.

**Controls.** `PLANT-BOUNDARY`: set the wrapper's `outDir` to `dist/src/stylez`; `npm.cmd run
build:src:styles` must fail on the output boundary; restore. `PLANT-SETUP`: put the
`import '../dist/src/styles/index.css'` line back into `tests/setupStyles.ts`, remove
`dist/src/styles`, run `npm.cmd run test:setup`; it must fail to resolve the import; restore the
file from a copy taken before planting and prove the restore with a byte comparison. Name no test
for a control.

## Unknowns

- Whether spreading `browser.test` carries a `browser.instances` array whose identity the root
  reuses across projects in one process. This unit runs the styles project alone through
  `--config`, so report what the spread carries and note nothing further.

## Scope

**Owned.** `configs/src/vite.styles.config.ts`; `tests/setupStyles.ts` (the import at line 4 and
the two remark sentences alone); `package.json` `scripts` (`test` and `test:src` alone).
**Off-limits.** Everything else: the root `tsconfig.json` and `vite.config.ts`, every
`configs/src/*` and `configs/app/*` scaffold plans, `configs/helpers.ts`, `configs/browsers.ts`,
`configs/policy.ts`, `configs/src/tsconfig.styles.json` (already conformant), `src/**`,
`tests/src/**`, `tests/setup.ts`, `tests/setupBrowser*.ts`, `tests/setupStyles.test.ts`,
`guides/**`, `README.md`, the `package.json` dependency blocks.

## Execution

Perform the assignment directly and spawn nothing. Take the byte digests first.

1. **Baseline.** Record the SHA-256 of `dist/src/styles/index.css` and `dist/src/styles/index.js`
   after `npm.cmd run build:src:styles` on the unchanged tree.
2. **The wrapper.** Rewrite `configs/src/vite.styles.config.ts` to this shape, keeping the existing
   RTL plugin object byte-for-byte:

   ```ts
   import { defineConfig } from 'vitest/config'
   import { outputBoundary } from '../helpers.js'
   import { resolveWorkspacePath, srcBrowser } from '../../vite.config.ts'

   const browser = srcBrowser()
   const { external: _external, output: _output, ...rolldownOptions } =
   	browser.build?.rolldownOptions ?? {}

   // The root supplies the alias table, the disabled public directory, and the resolved
   // Playwright provider once for the workspace; the fields a styles build differs in are
   // replaced by assignment because `mergeOverride` cannot remove the browser output boundary,
   // which refuses this output directory.
   export default defineConfig({
   	...browser,
   	plugins: [outputBoundary('dist/src/styles'), /* the existing RTL plugin object, unchanged */],
   	build: {
   		outDir: 'dist/src/styles',
   		emptyOutDir: true,
   		lib: {
   			entry: resolveWorkspacePath('src/styles/index.ts'),
   			formats: ['es'],
   			fileName: 'index',
   			cssFileName: 'index',
   		},
   		rolldownOptions,
   	},
   	test: {
   		...browser.test,
   		name: { label: 'src:styles', color: 'cyan' },
   		include: ['tests/src/styles/**/*.test.ts'],
   		exclude: [],
   		setupFiles: [
   			'./tests/setup.ts',
   			'./tests/setupBrowser.ts',
   			'./tests/setupStyles.ts',
   			'./dist/src/styles/index.css',
   		],
   	},
   })
   ```

   No `tsconfig.json` import, no `../browsers.js` import, no `fileURLToPath`, no second alias
   derivation, no second provider resolution. Rebuild and compare the two digests with item 1;
   they must be equal.
3. **The setup load.** Delete `import '../dist/src/styles/index.css'` from `tests/setupStyles.ts`
   and rewrite the two remark sentences so they say the module is loaded by the Node `setup`
   project and the browser `src:styles` project, imports no stylesheet, and that the styles
   project loads the built cascade through its `setupFiles`.
4. **The scripts.** `test:src` becomes
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:browser && npm run test:src:styles`;
   `test` drops its separate `npm run test:src:styles &&` segment and keeps the rest of its chain
   in order.
5. **Controls.** Run `PLANT-BOUNDARY` and `PLANT-SETUP` red, restore, prove each restore.
6. **Gates**, each with its final lines: `npm.cmd run check:src:styles`; `npm.cmd run lint:check`;
   `npm.cmd run format:check`; with `dist/src/styles` removed, `npm.cmd run test:setup` (green:
   the dependency is gone); `npm.cmd run test:src:styles` (rebuilds, then the browser project);
   `npm.cmd run test:src` (three projects reported); `npm.cmd run test:config`;
   `npm.cmd run test:setup:browser`; `npm.cmd run test:guides`. `test:distribution` and the Edge
   runs are the Orchestrator's verifier's.

## Output

Write `u-styles-config-report.md` and return its content: the diff per file; the two
digest pairs; each control's red reading and its restore proof; the unknown's reading; each gate's
final lines; deviations with expected, found, exact evidence, done or not done, and at most one
hypothesis.

## Deviation contract

Stop and report on: a digest that differs after the rewrite; a gate red after your own fix inside
owned files; a need to edit an off-limits file; a `setupFiles` stylesheet that does not apply.
Decide, record, and carry on from: the comment wording, the order of the replaced fields.

## Acceptance criteria

1. `configs/src/vite.styles.config.ts` imports `'../../vite.config.ts'` and `'../helpers.js'` and
   nothing else from the workspace; it declares no alias table and resolves no browser.
2. `dist/src/styles/index.css` and `index.js` digests equal the baseline.
3. `tests/setupStyles.ts` imports no stylesheet; `npm.cmd run test:setup` exits 0 with
   `dist/src/styles` absent.
4. `npm.cmd run test:src` runs `src:core`, `src:browser`, and `src:styles`; `npm.cmd run test`'s
   chain names `test:src:styles` nowhere.
5. Every gate in item 6 exits 0; both controls reddened and are removed.
6. `git status --porcelain` shows only the three owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
