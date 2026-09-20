# U1-conform audit — numbered claims (both lanes and the checker)

Subject: the U1-conform working tree in `C:/Users/mikes/WebstormProjects/veneer` on `d8b0e65`
(brief `.orkestrel/veneer/units/u1-conform-brief.md`, report `units/u1-conform-report.md`), plus
the Orchestrator's manifest step that applied the report's patch (`@tailwindcss/vite` and
`tailwindcss` removed, `npm install`, the `@orkestrel/test` tarball reinstalled). Native Opus 5
wrote the unit, so the `analyst` on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the
SUBJECTIVE lane and is told its engine wrote the work. This file alone fixes the claim numbers.
The Orchestrator rendered the diff over `d8b0e65` including every added file at
`units/u1-conform-diff.patch.txt` and the status at `tmp/audit/u1-conform-status.txt`. Rule on
every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line`
or exact text); read the rendered diff and the live files, never the report alone. The audit that
produced the findings is `.orkestrel/veneer/veneer-conformance-verdict.md` with the reviewer's
report beside it (`units/veneer-conformance-reviewer-report.md`). Law: scaffold's `AGENTS.md`,
`.claude/rules/architecture.md`, `names.md`, `tests.md`, `styles.md`, `application.md`,
`typescript.md`, `writing.md`, `documentation.md`, `workspace.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **Placement.** `src/browser/ColorMode.ts` and `app/browser/Showcase.ts` sit flat at their
   environment roots with `tests/src/browser/ColorMode.test.ts` and
   `tests/app/browser/Showcase.test.ts` mirroring them; `src/browser/color-mode/`,
   `app/browser/showcases/`, `tests/src/browser/fixtures/`, `src/browser/factories.ts`,
   `app/browser/factories.ts`, and `tests/src/browser/factories.test.ts` are gone; every owned
   file's placing row in the report's placement table is the row that places it, and no
   `fixtures/` folder holds TypeScript.
2. **Names.** `ColorScheme` is `ColorModeState` and `isColorScheme` is `isColorModeState` at every
   site; `COLOR_MODE_KEY` is `'color-mode'`; `readSpecifiers`, `readForbiddenSource`,
   `readForbiddenDependency`, `readEscapingImport`, `readImportClosure` are `extractSpecifiers`,
   `scanForbiddenSource`, `scanForbiddenDependency`, `scanEscapingImport`, `collectImportClosure`
   per the helper-prefix table; `readFileDigest` is `computeArtifactDigest` because
   `computeFileDigest` belongs to scaffold under `names.md` § Fleet name ownership and the
   contracts differ (Veneer's throws on an absent path, asserted in
   `tests/setupConformance.test.ts`); `WORKSPACE_PATH` is `WORKSPACE_ROOT`; none of the old names
   appears under `src/`, `app/`, `tests/`, or `guides/`; the one stale term left is the case title
   `executes the scheme-validation example verdicts` in `tests/guides.test.ts`, outside the
   unit's grant and carried by the Orchestrator.
3. **The shell entry.** `app/browser/main.ts` imports `Showcase` from `./Showcase.js` and reads
   `void new Showcase(document.body)` with a comment stating the discard is deliberate
   (`no-new` refuses the bare statement; a module-scope binding is barred in a runtime entry);
   `app/browser/index.html` titles the document `Veneer`; the `Showcase` constructor keeps to the
   host, the controller, and the `#` field assignments and calls one `#mount()`.
4. **The shell stylesheet.** `app/browser/styles/index.scss` declares `@layer shell;` and loads the
   partial through `meta.load-css('shell')` because Sass refuses a `@layer` statement before a
   `@use` rule (the report's probe); `_shell.scss` wraps its rules in `@layer shell` and its
   comment states in the present tense what the shell owns; every declaration is logical;
   `Canvas` and `CanvasText` are CSS system colours, not literal values, and the shell's `body`
   rule overrides the published `elements` layer's body paint (the writer's deviation 7, recorded
   as a bound for a successor owning `app/browser/styles/**` and `tests/setupBrowser.ts`).
5. **Conformance and distribution.** The built-artifact case is in `tests/distribution.test.ts`
   against `stage.installed`; `tests/conformance.test.ts` keeps the Bootstrap identity and
   runtime-boundary cases and imports nothing it no longer uses; `npm run test:conformance` on a
   tree with no `dist/` fails only on `tests/setupStyles.ts:4` (the stylesheet side-effect import
   U-styles-config removes) and passes with `dist/src/styles` alone built (the report's two
   readings), so criterion 3 closes with U-styles-config, carried.
6. **The listener control.** `tests/setupListeners.ts` owns the load-time document listener and
   its `AbortController`, exported as `ENTRY_LISTENER_CONTROL`; `tests/src/browser/index.test.ts`
   imports it dynamically inside the recorded action and aborts it after; `tests/setupBrowser.test.ts`
   is untouched; the `setup` project's include (`tests/setup*.test.ts`, `vite.config.ts`) and
   `repair`'s exact-path selection (`guides/scaffold.md` § Reading a target) ignore the module;
   `scaffold audit` raises its `setup` question for it and exits 0 (the Orchestrator accepts the
   question: a same-stem proof cannot run in the Node `setup` project and the behaviour is proved
   in `src:browser`).
7. **The guide.** `guides/veneer.md` renames the `Surface` rows, strikes the factory rows, constructs
   the class in its examples, follows the moved and deleted proofs in `## Tests`, and carries one
   sentence under `## Showcase` recording that the shell is framework-free so the published CSS
   and engine are proved with no framework between them while scaffold mandates Vue for an
   `app/browser` environment; that sentence and every changed sentence sweep clean under
   `writing.md`; `test:guides` is green; `guides/README.md` is unchanged and names no renamed or
   deleted export.
8. **Law over the diff.** No `any`, non-null assertion, type assertion, `@ts-` directive,
   `eslint-disable`, default export, nested function, parameter property, or access modifier;
   readonly public shapes; every barrel holds `export *` rows alone; the two granted files changed
   on their granted lines alone (`tests/guides.test.ts`: the import and two calls;
   `tests/setupBrowser.ts`: the destructure and the construction).
9. **Scope honesty.** `tmp/audit/u1-conform-status.txt` lists the owned files, the two granted
   files, the five new files, `package.json` and `package-lock.json` from the Orchestrator's
   manifest step, and nothing else.
10. **Gates (ruled by the Orchestrator from the retained verifier report).** On the tree with the
    manifest step applied: the whole chain exits 0 on managed Chromium; `test:distribution` green;
    `test:src` and `test:app` exit 0 on Edge; `scaffold audit` exits 0 with the `setup` question
    for `tests/setupListeners.ts` and the three advisory dependency lines alone.
