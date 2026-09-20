# U-styles-guide audit — numbered claims (both lanes and the checker)

Subject: the U-styles-guide working tree in `C:/Users/mikes/WebstormProjects/veneer` on `fbbda43`
(brief `.orkestrel/veneer/units/u-styles-guide-brief.md`, report `units/u-styles-guide-report.md`).
Native Opus 5 wrote the unit, so the `analyst` on Astra holds the OBJECTIVE lane and the
`reviewer` on Opus the SUBJECTIVE lane and is told its engine wrote the work. This file alone
fixes the claim numbers. The Orchestrator rendered the diff over `fbbda43` at
`units/u-styles-guide-diff.patch.txt` (no file is untracked) and the status at
`tmp/audit/u-styles-guide-status.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or
`UNDECIDABLE` and the deciding evidence (`file:line` or exact text); read the rendered diff and
the live files, never the report alone; a claim about what a file, script, or configuration does
is ruled against that artifact. The design is `.orkestrel/veneer/styles-axis-design-verdict.md`
(its Q2 reason for assignment over the merger is false; `u-styles-config-audit-verdict.md` records
the true one, which the guide carries). Law: scaffold's `AGENTS.md` § Writing,
`.claude/rules/writing.md`, `documentation.md`, `workspace.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **Place and shape.** `guides/veneer.md` carries `## Styles` between `## Examples` and
   `## Tokens` (line 73), with `### Files`, `### Scripts`, and `### Departures from the workspace
   rows` under it and nothing else at that level; the opening paragraph names the published
   artifact (`build:src:styles` compiles `src/styles/index.scss` to `dist/src/styles/index.css`;
   the manifest's `exports` map names that file under `./styles`; `sideEffects` lists `**/*.css`),
   a `ts` fence reads `import '@orkestrel/veneer/styles'`, and the sentences that follow state that
   the specifier resolves to standalone CSS and that a `<link>` consumer serves the resolved file;
   each fact is true against `package.json` and the tree.
2. **The files table.** The table under `### Files` carries, in this order, `src/styles/index.scss`,
   `src/styles/index.ts`, `configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`,
   `tests/setupStyles.ts`, `tests/src/styles/`, each with a role true against the file; the
   paragraphs beneath it are true against the tree: the barrel's `@use` rules name the token,
   theme, and element partials and `_mixins.scss` reaches the build through the token and theme
   partials rather than through the barrel; `src/styles/index.ts` imports `./index.scss` and
   nothing else; the wrapper replaces the plugins, the output directory, the library entry, and the
   test fields and declares `src:styles`; the check-only project extends the root `tsconfig.json`,
   narrows `lib` to `ESNext` and `types` to `vite/client` over `src/styles/**/*.ts`, and emits
   nothing; the setup module imports no stylesheet and the styles project loads the built cascade
   through its `setupFiles`.
3. **The scripts table.** `build:src:styles`, `check:src:styles`, and `test:src:styles` with the
   contracts and parent chains the table states, true against `package.json` `scripts`, and the
   sentence that `test:src:styles` builds first because the proof's subject is the compiled
   cascade.
4. **The departures.** Each of the six numbered departures and the closing generator paragraph is
   true against the tree: no `@src/styles` alias in `tsconfig.json` `paths`, and the
   `import/no-unassigned-import` allowlist in `.oxlintrc.json` admits stylesheet suffixes alone,
   with `app/browser/main.ts` line 1 importing `../../src/styles/index.scss`; the root declares no
   styles factory, the wrapper spreads `srcBrowser` and replaces by assignment, and the stated
   reason is the true one (the `mergeOverride` helper keeps a base plugin no override names, so
   `environmentBoundary('src/browser')` would stay, and it concatenates every other array) with no
   claim about the output boundary; `environmentBoundary` is planted on `src/core`, `src/browser`,
   and `app/browser` alone and no `.oxlintrc.json` override names `src/styles`; the root's
   `projects` list registers no `src:styles`, `--project src:styles` at the root is refused
   (`No projects matched the filter`, the report's run), and `test:src:styles` reaches the project
   with `--config`; `tests/config.test.ts` is vendored (present under the installed scaffold's
   `dist/host/tests/`) and asserts nothing about the axis; `tests/setup.css` is absent and Veneer
   declares no Tailwind dependency; the installed scaffold's `SRC_MATRIX` is closed on `core`,
   `browser`, and `server`, and the generator paragraph lists what emitting the axis would add.
5. **The README paragraph.** `guides/README.md` line 17 onward names § Styles as the reference for
   the stylesheet face's build and loading and § Tokens for what that face declares; it says the
   face adds no concept-index row because it publishes CSS and no TypeScript surface, and that the
   concept-index rows are the parity targets `tests/guides.test.ts` drives; both statements are
   true against `tests/guides.test.ts` and the index.
6. **Writing and parity law.** The section names no `index.rtl.css` and no `rtl`; it carries no
   relative link (the link check resolves against the inventory patterns `src/**/*.ts`,
   `tests/**/*.ts`, `guides/*.md`, `*.md`, `package.json`, so a link to a `.scss` or a `configs/`
   file would report broken) and names paths as code spans; every code token is followed by a
   noun; no count over a growable set (the brief's "two configuration files" recast as the named
   members); no banned substitution-table row; the fence language is `ts`; every backticked API
   name resolves to a real export or a real script or path; `test:guides` is green.
7. **Scope honesty.** `tmp/audit/u-styles-guide-status.txt` lists exactly `guides/README.md` and
   `guides/veneer.md`; the report and instruments sit under the ignored `tmp/`.
8. **Gates (ruled by the Orchestrator from the retained verifier report).** `format:check`,
   `test:guides`, `test:policy`, `build`, and the whole `npm test` chain exit 0; `scaffold audit`
   exits 0 with the `setup` question for `tests/setupListeners.ts` and the three advisory
   dependency lines alone.
