# U-styles-config audit — numbered claims (both lanes and the checker)

Subject: the U-styles-config working tree in `C:/Users/mikes/WebstormProjects/veneer` on `a05e9ff`
(brief `.orkestrel/veneer/units/u-styles-config-brief.md`, report `units/u-styles-config-report.md`,
instruments under `units/u-styles-config-instruments/`). Astra (`sol`) wrote the unit, so the
lanes are swapped: the `reviewer` on Opus holds the OBJECTIVE lane and the `analyst` on Astra the
SUBJECTIVE lane and is told its engine wrote the work. This file alone fixes the claim numbers.
The Orchestrator rendered the diff over `a05e9ff` at `units/u-styles-config-diff.patch.txt` (no
file is untracked) and the status at `tmp/audit/u-styles-config-status.txt`. Rule on every claim
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text); read the rendered diff and the live files, never the report alone. The design the unit
implements is `.orkestrel/veneer/styles-axis-design-verdict.md`. Law: scaffold's `AGENTS.md`,
`.claude/rules/workspace.md`, `tests.md`, `typescript.md`, `styles.md`, `writing.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **The wrapper composes the root.** `configs/src/vite.styles.config.ts` imports
   `'../../vite.config.ts'` (`resolveWorkspacePath`, `srcBrowser`) and `'../helpers.js'`
   (`outputBoundary`) and nothing else from the workspace; it declares no alias table, imports no
   `tsconfig.json`, no `fileURLToPath`, no `../browsers.js`, and resolves no browser; `const
   browser = srcBrowser()`; `external` and `output` are destructured out of
   `browser.build?.rolldownOptions ?? {}` so `rolldownOptions` keeps `onLog: enforceBuildLog`;
   the config spreads `...browser` and replaces `plugins` (`outputBoundary('dist/src/styles')`
   and the RTL plugin object, byte-identical to `a05e9ff`), `build` (`outDir`, `emptyOutDir`,
   `lib` with `entry: resolveWorkspacePath('src/styles/index.ts')`, `formats`, `fileName`,
   `cssFileName`, and `rolldownOptions`), and `test` (`...browser.test`, `name: { label:
   'src:styles', color: 'cyan' }`, `include`, `exclude: []`, `setupFiles` ending in
   `'./dist/src/styles/index.css'`); the comment states why the fields are replaced rather than
   merged (`mergeOverride` cannot remove the browser output boundary, which refuses this output
   directory); the spread carries `browser.test.browser` (provider, `instances`,
   `fileParallelism: false`) as the report's config reading records.
2. **The bytes did not move.** `dist/src/styles/index.css` is
   `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1` and `index.js` is
   `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` (the empty file) before and
   after the rewrite (`units/u-styles-config-instruments/baseline-digests.txt`,
   `rewrite-digests.txt`); every RTL byte and the RTL tests are untouched.
3. **The controls bind.** `PLANT-BOUNDARY` (outDir `dist/src/stylez`) reddened
   `build:src:styles` on `[orkestrel-output-boundary] Build output must use its exact configured
   workspace directory` and the wrapper was restored with a byte comparison; `PLANT-SETUP` (the
   import put back, `dist/` absent) reddened `test:setup` on `Cannot find module
   '../dist/src/styles/index.css' imported from tests/setupStyles.ts` in both
   `tests/setupStyles.test.ts` and `tests/setupConformance.test.ts`, and the module was restored
   with a byte comparison (`plant-*.log.txt`, `*-restore.log.txt`); the control ran with all of
   `dist/` removed through `npm run clean` because the sandbox refused a targeted deletion
   (report deviation 2), which changes the control's ordering and nothing about what it proves;
   no test is named for a control.
4. **The setup load.** `tests/setupStyles.ts` imports no stylesheet (the line-4 import is gone);
   its two remarks (the `BOOTSTRAP_CASCADE_PATH` block and the `extractBootstrapVariables` block)
   say the module is loaded by the Node `setup` project and the browser `src:styles` project,
   imports no stylesheet, and that the styles project loads the built cascade through its
   `setupFiles`; `test:conformance` is green with `dist/` absent; `test:setup` with `dist/` absent
   reds in exactly two cases of the off-limits `tests/setupStyles.test.ts` — `requires the
   directional outputs from npm run build:src:styles` (lines 167 to 168, `existsSync` over the two
   built files) and `ships an RTL cascade that needs no flipping, over a cascade that declares
   treatments` (lines 318 to 319, `readFileSync` over them) — which read the artifacts by U3's
   accepted design and pass after `build:src:styles`; the brief's criterion 3 overstated the
   reach of the import removal (the Orchestrator's error, ruled here), and the unit stopped at
   the boundary correctly.
5. **The scripts.** `package.json` `test:src` is `vitest run --config vite.config.ts --no-cache
   --reporter=dot --project src:core --project src:browser && npm run test:src:styles`; `test`
   names `test:src:styles` nowhere and keeps the rest of its chain in order; no other script or
   dependency line changed.
6. **Law over the diff.** No `any`, non-null assertion, type assertion, `@ts-` directive,
   `eslint-disable`, or default export beyond the config file's required `export default`; the
   underscore-prefixed `_external` and `_output` pass `lint:check`; the added comment and the two
   rewritten remarks sweep clean under `writing.md` (no banned row, no count, a noun after every
   code token); the formatter's layout of the destructuring is the committed one (`format:check`
   green).
7. **Scope honesty.** `tmp/audit/u-styles-config-status.txt` lists exactly
   `configs/src/vite.styles.config.ts`, `package.json`, and `tests/setupStyles.ts`; the report and
   instruments sit under the ignored `tmp/`.
8. **Gates (ruled by the Orchestrator from the retained verifier report).** With `dist/` absent,
   `test:conformance` green and `test:setup` red on the two artifact cases alone; then format,
   lint, check, build; `test:src` reports `src:core`, `src:browser`, and `src:styles`; the whole
   `npm test` chain exits 0; `test:distribution` green; `test:src:styles`, `test:src`, and
   `test:setup:browser` exit 0 on Edge; `scaffold audit` exits 0 with the `setup` question for
   `tests/setupListeners.ts` and the three advisory dependency lines alone.
