# U1-author audit — numbered claims

Subject: the Veneer checkout `C:/Users/mikes/WebstormProjects/veneer` at the commit the dispatch
names (U1-author runs 3 to 5 on Astra, landed as `f5d31f8`, `9d64c66`, and the run-5 commit), its
report `tmp/codex/u1-author-report.md`, and the diff from `a5de4c4` to that commit. Rule on every
claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE`, each with the evidence (file and line, or the
command and its output) that decides it. Read the actual diff and status, never the report alone.

1. **Styles axis.** `configs/src/vite.styles.config.ts` declares the `src:styles` browser project
   directly (not through a generated factory), imports `outputBoundary` from `../helpers.js` and
   `resolveBrowser` from `../browsers.js`, includes only `tests/src/styles/**/*.test.ts`, lists
   `./tests/setup.ts`, `./tests/setupBrowser.ts`, `./tests/setupStyles.ts` as setup files, and its
   library build emits `dist/src/styles/index.css` and `index.rtl.css`. `src/styles/index.ts` is
   exactly `import './index.scss'`. `index.scss` loads `tokens` and `theme` and never `mixins`.
   `_mixins.scss` emits no top-level CSS.
2. **ColorMode engine.** `src/browser/color-mode/ColorMode.ts` holds one class with `#` fields and
   no module-scope declaration; it implements every member of `ColorModeInterface` in
   `src/browser/types.ts` and no other public member; `apply('light')` removes `data-bs-theme`
   rather than writing `light`; `destroy` removes the attribute only when the controller wrote it;
   construction applies a stored valid scheme and leaves the root untouched otherwise; `mode` is
   derived from the attribute on each read and stored nowhere. Each behavior has a proof in
   `tests/src/browser/color-mode/ColorMode.test.ts` against a real DOM and a real `Storage`.
3. **Kind placement.** Types are only in `types.ts`, constants only in `constants.ts`, the guard
   only in `validators.ts`, the factory only in `factories.ts`, across `src/browser` and
   `app/browser`; no `any`, no `as` outside `as const`, no non-null `!`, no `@ts-` or
   `eslint-disable` comment anywhere in the diff.
4. **No listener on import.** `tests/src/browser/index.test.ts` records
   `EventTarget.prototype.addEventListener` for the import's duration only, restores it in
   `finally`, asserts zero calls targeting `document` or `window`, and carries a control proving a
   module that adds a document listener is caught.
5. **Shell.** `app/browser/showcases/Showcase.ts` builds the header, the `Dark mode` button with
   `aria-pressed`, and the `Showcase` region; the button's handler calls the controller's `toggle`
   and mirrors the mode into `aria-pressed`; `destroy` removes what it built and its listeners;
   the app reaches the engine through `@src/browser`; no `vue`, `bootstrap`, or `.vue` file exists
   under `app/`.
6. **Setup helpers reuse primitives.** `tests/setupBrowser.ts` declares the `ProvidedContext`
   augmentation, `mountShowcase`, and `applyTheme`, each built from installed exports
   (`clickAccessible`, `waitForState`, `waitForAnimations`, `mount`, `build`); no helper in
   `tests/setup*.ts` re-implements an installed `@orkestrel/test` or `@orkestrel/contract` export.
7. **Journeys.** `tests/app/browser/integration.test.ts` declares and asserts the families
   `journey`, `refusal`, `matrix`, and `capture`; proves arrival through `readPerception`, the
   toggle through `aria-pressed`, `data-bs-theme`, and a `background-color` that differs between
   modes after `waitForAnimations`, keyboard reach through `traverseAccessible`, one refusal for an
   absent `Sign in` control with the exact voice, the matrix over every provided variant through
   `applyTheme`, and the capture family with registry `['home', 'home-dark']`, always-on filename
   and placement proofs, and the disk proof under the flag; the report records the two mutations
   red and the restore green.
8. **Conformance controls.** `tests/setupConformance.ts` exports `readForbiddenDependency`,
   `readForbiddenSource`, `readEscapingImport`, `readImportClosure`, `readSpecifiers`,
   `readFileDigest`, the three digests, and `FORBIDDEN_RUNTIME`, each proved in
   `tests/setupConformance.test.ts` with a rejecting control; `tests/conformance.test.ts` asserts
   the version and digests, the manifest sections, the source sweep over `src/**`, `app/**`, and
   `tests/**`, the closure from the three barrels under `src/`, and the built `.js` and `.d.ts`
   specifiers; the report records `PLANT-VUE`, `PLANT-ESCAPE`, `PLANT-TYPE`, and
   `PLANT-BOOTSTRAP` red and green and the Orchestrator's `PLANT-PEER` reading.
9. **Distribution.** `tests/distribution.test.ts` keeps every generated case and adds a
   `[requires the registry]` case that loads the installed package's `./styles` through a
   `<link>`, asserts `link.sheet` and the layer order through a `CSSLayerStatementRule`.
10. **Guides.** `guides/veneer.md` documents every export of `src/browser` in `## Surface` with
    `Summary` cells equal to their TSDoc description paragraphs, a `## Methods` group for
    `ColorModeInterface` (`apply`, `toggle`, `destroy`), a `ts` fence importing `createColorMode`
    from `@orkestrel/veneer/browser`, and `## Tests` links that resolve; the README pitch equals
    the tagline; `test:guides` is green.
11. **Scope honesty.** Across `a5de4c4..HEAD`, no vendored or content-owned path changed except
    the repair-vendored `tests/setupPolicy.ts` at `f5d31f8`; `package.json` and the lockfile are
    unchanged; no dependency was added; every changed path is in the briefs' owned lists.
12. **Names.** Every public TypeScript name the unit declared (`ColorMode`, `ColorModeInterface`,
    `ColorModeOptions`, `ColorScheme`, `createColorMode`, `isColorScheme`, `COLOR_MODE_ATTRIBUTE`,
    `COLOR_MODE_KEY`, `Showcase`, `ShowcaseInterface`, `createShowcase`, and the setup exports) is
    absent from every hosted guide's `Surface` rows in
    `node_modules/@orkestrel/scaffold/dist/host/guides/*.md`; every interface member is one word.
13. **Report honesty.** Every gate reading in the report's final table reproduces (exit code and
    counts) when the command is run on the same commit on managed Chromium.
