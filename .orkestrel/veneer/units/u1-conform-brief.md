# Unit U1-conform — the built Veneer tree brought to scaffold's placement, naming, and test rules

## Role and engine

`opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold repair`;
no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`, `git reset`,
or `git clean`.

## Objective

Close every accepted finding of the first-half tree conformance audit
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/veneer-conformance-verdict.md`, with the
reviewer's report `units/veneer-conformance-reviewer-report.md` beside it for the sites and the
quoted rules), so the tree U1 built follows the law U3's files were held to.

## Law

Veneer's own `AGENTS.md` resolves its law against the scaffold checkout beside it. Read completely
before editing: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.agents/orchestration.md`
§ Permission floor; `.claude/rules/architecture.md` (§ Centralized-file pattern, § Declaration
placement, § Wrapper test, § Class order, § Entity subfolders, § Barrel exports), `names.md`
(§ Files and folders, § Helper prefixes, § Fixed lifecycle vocabulary), `tests.md`, `styles.md`,
`workspace.md`, `application.md`, `typescript.md`, `writing.md`, `documentation.md`.

## Context

**The tree.** `HEAD` is U3's landing commit (the Orchestrator names it in the dispatch message);
the working tree is clean at start except `tmp/`. `node_modules` carries the U6 Test tarball and
the scaffold tip tarball, installed `--no-save` in one command.

**Fleet convention, measured.** A lone class sits flat at its environment root
(`scaffold/src/core/Compiler.ts`, `console/src/core/Capture.ts`,
`roughnotes/app/browser/MemoryStorage.ts`); a family nests in a lowercase plural folder
(`console/src/core/loggers/Logger.ts`, `LoggerManager.ts`). No fleet package has a `fixtures/`
folder holding TypeScript. Every factory in `console/src/*/factories.ts` composes a default or a
collaborator; none is `return new X(options)`.

**Content-owned files.** The root `tsconfig.json`, `vite.config.ts`, and every
`configs/src/*.config.ts` and `configs/app/*.config.ts` scaffold plans are restored by `repair`;
edit none. Scaffold emits no styles axis (`guides/scaffold.md`), so the shell's deep relative
import of `src/styles/index.scss` and the whole-configuration styles wrapper are recorded bounds,
not items here.

**Host.** Windows, Git Bash, `npm run <name>`, managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`.

## Unknowns

- Whether the installed `@orkestrel/test/browser` `render` records what it mounts (this decides
  nothing here; U3 settled its helpers).
- Whether the load-time listener control can live in a `tests/setup*.ts` module without the
  `setup` project's include (`tests/setup*.test.ts`) or `repair`'s selection (exact-case
  `tests/setupBrowser.ts`, `tests/setupServer.ts`) reading it as something else. Read
  `guides/scaffold.md` § Reading a target first and name the module for what it does (a listener
  control the recorder proof imports); report the name you chose and why the selection ignores it.

## Scope

**Owned.** `src/browser/**`, `app/browser/**`, `tests/src/browser/**`, `tests/app/browser/**`,
`tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`,
`tests/distribution.test.ts`, `guides/veneer.md` (§ Surface rows for the renamed and deleted
exports, and one sentence under the shell's section), `guides/README.md` (the rows those changes
touch). **Shared (report-only).** `package.json` (return the exact patch removing
`@tailwindcss/vite` and `tailwindcss`; the Orchestrator applies it and runs `npm install`).
**Off-limits.** Every content-owned and vendored path, `src/core/**`, `src/styles/**`,
`tests/src/styles/**`, `tests/src/core/**`, `tests/setup.ts`, `tests/setupBrowser.ts`,
`tests/setupStyles*.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/config.test.ts`.

## Execution

Perform the assignment directly and spawn nothing. Placement first, then names, then the tests,
then the shell, then the guide; run the narrowest project after each step.

1. **Flatten the lone classes.** Move `src/browser/color-mode/ColorMode.ts` to
   `src/browser/ColorMode.ts` and `app/browser/showcases/Showcase.ts` to `app/browser/Showcase.ts`;
   move their tests to `tests/src/browser/ColorMode.test.ts` and `tests/app/browser/Showcase.test.ts`;
   update `src/browser/index.ts`, `app/browser/index.ts`, and every import; delete both folders.
2. **One term for the mode axis.** Rename the union `ColorScheme` to `ColorModeState` and the
   guard `isColorScheme` to `isColorModeState` at every site (`src/browser/types.ts`,
   `validators.ts`, the class, the shell, the tests, the guide rows); set `COLOR_MODE_KEY` to
   `'color-mode'`.
3. **Delete the pass-through factories.** Remove `createColorMode` and `createShowcase`, their
   barrel rows, `src/browser/factories.ts`, `app/browser/factories.ts`, and
   `tests/src/browser/factories.test.ts`, folding that file's cases (the document-root default,
   the threaded root and storage) into `tests/src/browser/ColorMode.test.ts`; callers construct
   directly. Remove the guide's `Surface` rows for both.
4. **The shell entry.** `app/browser/main.ts` imports `Showcase` from `./Showcase.js`, never from
   its own barrel; `app/browser/index.html` titles the document `Veneer`; the `Showcase`
   constructor keeps to the host, the controller, and the `#` field assignments and calls one
   `#mount()` that builds and appends the tree.
5. **The shell stylesheet.** `app/browser/styles/index.scss` declares the app's cascade-layer order;
   `app/browser/styles/_shell.scss` wraps its rules in the app's own layer and replaces the
   deferred-work comment with a present-tense statement of what the shell owns. Author logical
   properties only; no literal color outside `src/styles/_tokens.scss`.
6. **Conformance and distribution.** Move the built-artifact case (the one reading `dist/src` and
   requiring a prior build) from `tests/conformance.test.ts` into `tests/distribution.test.ts`,
   where the packed stage supplies the built files; `tests/conformance.test.ts` keeps the Bootstrap
   identity and runtime-boundary cases. In `tests/setupConformance.ts` rename by the helper-prefix
   table: `readSpecifiers` → `extractSpecifiers`, `readForbiddenSource` → `scanForbiddenSource`,
   `readForbiddenDependency` → `scanForbiddenDependency`, `readEscapingImport` →
   `scanEscapingImport`, `readImportClosure` → `collectImportClosure`, `readFileDigest` →
   `computeFileDigest`; keep `readManifestMember`; rename `WORKSPACE_PATH` to `WORKSPACE_ROOT`;
   update every importer and the export-set assertion in `tests/setupConformance.test.ts`.
7. **The listener control.** Move the load-time listener control out of
   `tests/src/browser/fixtures/constants.ts` into a `tests/setup*.ts` module named for what it
   does (per the unknown), keeping the exported `AbortController` and the load-time listener;
   repoint the dynamic import in `tests/src/browser/index.test.ts`; delete
   `tests/src/browser/fixtures/`. Keep the control distinct from the inline one in
   `tests/setupBrowser.test.ts`; do not touch that file.
8. **The guide.** Under the shell's section of `guides/veneer.md`, one sentence: the shell is
   framework-free by design so the published CSS and engine are proved with no framework between
   them, while scaffold mandates the Vue toolchain for an `app/browser` environment. Update the
   `Surface` rows for the rename and the deletions. Keep `test:guides` green.
9. **The manifest patch.** Return, in the report, the exact `package.json` diff removing
   `@tailwindcss/vite` and `tailwindcss` (`postcss` stays; U3 consumes it). Do not apply it.
10. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
    `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
    `test:setup:browser`, `test:conformance`, `test:guides`; then
    `PLAYWRIGHT_CHANNEL=msedge npm run test:src` and `PLAYWRIGHT_CHANNEL=msedge npm run test:app`.
    Record each command's final lines. `test:distribution` needs the registry; the Orchestrator
    runs it and `scaffold audit`.

## Output

Write `u1-conform-report.md` and return its content: the diff summary per file; the
placement table (every owned file with the rule row that places it); the listener-control
module's name and the selection reading behind it; each gate's final lines on both engines; the
manifest patch; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a `repair` selection that would read the control module as a setup module. Decide, record,
and carry on from: the control module's exact name within the meaning fixed here, case order,
TSDoc and guide wording, the shell layer's name.

## Acceptance criteria

1. No lone class sits in a subfolder under `src/browser/` or `app/browser/`; no `fixtures/` folder
   holds TypeScript; `src/browser/factories.ts` and `app/browser/factories.ts` are absent.
2. `ColorScheme`, `isColorScheme`, `createColorMode`, `createShowcase`, `WORKSPACE_PATH`, and every
   `read*` name item 6 renames appear nowhere under `src/`, `app/`, `tests/`, or `guides/`.
3. `tests/conformance.test.ts` passes on a checkout with no `dist/src` built.
4. `format:check`, `lint:check`, `check`, `build` exit 0; every test project exits 0 on managed
   Chromium; `test:src` and `test:app` exit 0 on Edge.
5. `git status --porcelain` shows only owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; `guides/veneer.md`.
