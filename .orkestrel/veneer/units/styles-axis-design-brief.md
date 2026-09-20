# U-styles design round — the styles-environment pilot's exact shape

## Role and engine

Two lanes read this one brief, blind to each other, each clean-context, each performing the
assignment directly and spawning nothing, editing nothing, running nothing that writes:

- `planner` on native Opus 5 — the SUBJECTIVE lane: shape, naming, ergonomics, what a consumer
  and a later scaffold generator should find, which departure reads as the right one.
- `analyst` on Astra through `codex exec` read-only — the OBJECTIVE lane: what the tools, the
  content-owned files, and the rules actually permit; execute what can be executed in memory or
  with read-only commands.

## Objective

Rule on the exact shape of Veneer's hand-authored `src/styles` environment so that it matches
`.claude/rules/workspace.md`'s documented rows as far as scaffold's content-owned root files
allow, follows every other convention, and records each forced departure so a later scaffold
generator can read the pilot. The user's decision (2026-09-20): Veneer is the pilot; implement
nothing in scaffold. Return a ruling per question, each with the option chosen, the options
rejected and why, and the rule or measurement it rests on.

## Law

Read completely from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`;
`.claude/rules/workspace.md` (every row naming `styles`: § Environments, § Aliases,
§ Configuration authority, § Build outputs, § Test project matrix, § Typecheck scopes, the
build/check alignment list); `.claude/rules/architecture.md`; `.claude/rules/tests.md`;
`.claude/rules/styles.md`; `.claude/rules/documentation.md`; `.claude/rules/writing.md`;
`guides/scaffold.md` § Reading a target and the paragraph "Scaffold emits no styles axis". The
Grok map of scaffold's environment compilers is at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/s1-scout-report.md`: `SRC_MATRIX`
is closed on `core`, `browser`, `server`; `'styles'` is refused as a `--src` value; the root
`tsconfig.json`, `vite.config.ts`, and every `configs/src/vite.<env>.config.ts` and
`configs/src/tsconfig.<env>.json` scaffold plans are content-owned and `repair` restores them.

## Context — the axis as measured on 2026-09-20

Subject checkout `C:/Users/mikes/WebstormProjects/veneer`. A writer (U3) is live there and owns
`src/styles/**`, `src/core/**`, `tests/src/styles/**`, `tests/setup*.ts`, and the guides; read
those for shape only and propose no edit to their content. The files this round rules on are
`configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`, `src/styles/index.ts`,
`app/browser/main.ts` (its first line), `package.json`, and the guide section to add.

Present and matching the rule:

- `src/styles/index.ts` is `import './index.scss'` (§ Environments).
- `configs/src/tsconfig.styles.json` extends the root, sets `lib` `["ESNext"]`, `types`
  `["vite/client"]`, `noEmit`, and includes `../../src/styles/**/*.ts` (§ Typecheck scopes,
  check-only).
- `package.json` scripts: `check:src:styles` (`tsc --noEmit -p configs/src/tsconfig.styles.json`)
  chained in `check:src`; `build:src:styles` (`vite build --config configs/src/vite.styles.config.ts`)
  chained in `build:src`; `test:src:styles` (`npm run build:src:styles && vitest run --config
  configs/src/vite.styles.config.ts --no-cache --reporter=dot`) chained in `test`.
- The build emits `dist/src/styles/index.js` (ES wrapper), `index.css`, and `index.rtl.css`
  (a post plugin `veneer-logical-rtl` copies the bytes because every declaration is logical).
- The `src:styles` Vitest project runs on Playwright Chromium with `setup.ts`, `setupBrowser.ts`,
  `setupStyles.ts`, `fileParallelism: false`, include `tests/src/styles/**/*.test.ts`.
- `tests/setupStyles.ts` loads the built cascade with `import '../dist/src/styles/index.css'` at
  module scope, which is why `test:src:styles` builds first.
- `package.json`: `"exports": { "./styles": "./dist/src/styles/index.css" }`, `"sideEffects":
  ["**/*.css"]`.

Departures, each with its cause:

1. **No `@src/styles` alias.** The root `tsconfig.json` `paths` carry `@src/core`, `@src/browser`,
   `@app/browser`, `@orkestrel/veneer`, `@orkestrel/veneer/browser` — the generated set — and the
   root `vite.config.ts` derives `resolve.alias` from it. Both are content-owned. The shell,
   `app/browser/main.ts:1`, imports `'../../src/styles/index.scss'`. `environmentBoundary` in
   `configs/helpers.ts:845` takes an owner union of the six generated environments and no
   `src/styles`; `isStylesheetPath` (`configs/helpers.ts:311`) exempts stylesheet sources.
2. **The wrapper imports leaves, not the root.** `configs/src/vite.styles.config.ts` imports
   `outputBoundary` from `../helpers.js` and `resolveBrowser`, `resolvePinnedBrowser` from
   `../browsers.js`, re-derives the alias table from `tsconfig.json`, resolves the browser
   provider itself, and declares the whole project inline. The generated
   `configs/src/vite.browser.config.ts` is `defineConfig(srcBrowser({ plugins: [...] }))` over the
   root's `srcBrowser` factory (`vite.config.ts:125-165`), which carries `resolve`, `publicDir`,
   `plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')]`, the lib
   build to `dist/src/browser`, and the `src:browser` test project. `mergeOverride`
   (`vite.config.ts:63`) wraps `mergeConfig`, which concatenates arrays, so an override cannot
   remove a plugin or replace `include` and `setupFiles`; `outputBoundary` throws on a mismatched
   `outDir`. The root exports `resolveWorkspacePath`, `peers`, `mergeOverride`, and the project
   factories; `resolve` and `browserOptions` are module-local. `workspace.md` § Configuration
   authority says each `configs/src/*.config.ts` imports the root config rather than a leaf.
3. **Project name shape.** The wrapper's `test.name` is the bare string `'src:styles'`; every root
   project uses `{ label, color }`.
4. **The `./styles` export and the twins.** The export resolves to `index.css`; `index.js` (the ES
   wrapper) and `index.rtl.css` are emitted and unexported; `sideEffects` is `["**/*.css"]`.
   `workspace.md` § Build outputs lists `dist/src/styles` as "Compiled `index.css`, ES wrapper" and
   says styles ship CSS, not declarations.
5. **`test:src:styles` builds before it tests.** No other `test:src:*` script builds; the root
   `test` chain does not run `build` first.
6. **The root projects list cannot register `src:styles`**, so `vitest run --project src:styles`
   at the root does not exist and the wrapper is run through `--config` alone.
7. **`tests/config.test.ts`** (vendored, reads the live workspace shape) pins the generated
   environments' aliases, projects, and scoped configs and says nothing about a styles axis.

## Questions

Rule on each, in order.

- **Q1 — the alias and the shell import.** Under content-owned roots, what is the right import in
  `app/browser/main.ts` for the package's own stylesheet: the relative `../../src/styles/index.scss`,
  the relative `../../src/styles/index.ts` entry, or something else that resolves without a root
  alias? What does the environment boundary say about an `app/browser` module importing
  `src/styles` (read `environmentSourceError` and `isStylesheetPath` and execute them in memory
  on the candidates)? State the departure sentence the guide records for when scaffold generates
  `@src/styles`.
- **Q2 — the wrapper's composition.** Which is right for `configs/src/vite.styles.config.ts`:
  (a) compose the root's `srcBrowser()` and then replace, by assignment rather than merge, the
  fields the styles build differs in (`plugins`, `build`, `test.name`, `test.include`,
  `test.setupFiles`), so the root supplies `resolve` and the browser provider; (b) keep declaring
  from the leaves as today; (c) another composition. Weigh the letter of § Configuration authority
  ("imports the root config rather than a leaf") against what `mergeOverride` permits, what
  `outputBoundary` and `environmentBoundary` do to a styles build, and what stays readable to the
  next maintainer. Name the exact code shape.
- **Q3 — the project name.** `{ label: 'src:styles', color: <which> }` following the root's
  palette, or the bare string? Read how the root assigns colours.
- **Q4 — the published surface.** What should `exports["./styles"]` resolve to — the CSS, the ES
  wrapper, or a conditions object naming both — and should `index.rtl.css` be exported (as
  `./styles/rtl`?) or dropped from the build? What must `sideEffects` list so a bundler keeps the
  CSS when a consumer imports the wrapper? Read how `tests/distribution.test.ts` proves the
  `./styles` entry today and what a vanilla consumer would write.
- **Q5 — build-before-test.** Is `test:src:styles` running `build:src:styles` first the right
  shape, given `tests/setupStyles.ts` imports the built CSS at module scope, or must the styles
  project load the cascade another way (Vite compiling `src/styles/index.scss` in the test
  server, the `build` helper `@orkestrel/test/browser` exports)? Consider what the other browser
  projects do and what a stale `dist/` does to a proof.
- **Q6 — what the guide records.** Where in `guides/veneer.md` does the pilot describe its axis
  (a section name, its place among the existing sections, what it lists: the files, the scripts,
  the departures with causes, the sentence a later generator needs), consistent with
  `documentation.md` and the one-guide rule?
- **Q7 — anything the census missed.** Walk every `workspace.md` row again — `.oxlintrc` import
  restrictions, the policy sweep, lint over SCSS, `tests/config.test.ts`'s reach, the
  `configs/helpers.ts` leaf constraint — and name any further departure or any present item the
  census misread.

## Output

For each question: the ruling, the option chosen with its exact shape (code or text), the options
rejected with one reason each, and the rule or measurement (`file:line`) it rests on. Then a
numbered list of departures the pilot keeps, each with the sentence the guide records. Then the
writer the unit should route to (`opus` for shape and voice, `sol` for mechanical precision) and
why. No process diary.
