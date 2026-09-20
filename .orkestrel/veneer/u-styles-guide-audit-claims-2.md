# U-styles-guide audit round 2 — numbered claims (the objective lane and the checker)

Subject: the U-styles-guide working tree in `C:/Users/mikes/WebstormProjects/veneer` on `fbbda43`
after brief 2 (`.orkestrel/veneer/units/u-styles-guide-brief-2.md`, report
`units/u-styles-guide-report-2.md`), on top of the round-1 tree that
`u-styles-guide-audit-verdict.md` ruled on. Native Opus 5 wrote brief 2, so the `analyst` on Astra
holds the OBJECTIVE lane; the subjective lane is not run for prose its own lane specified, as the
round-1 verdict records. This file alone fixes the claim numbers. The Orchestrator rendered the
diff over `fbbda43` at `units/u-styles-guide-diff-2.patch.txt` and the status at
`tmp/audit/u-styles-guide-status-2.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or
`UNDECIDABLE` and the deciding evidence (`file:line` or exact text); read the rendered diff and
the live files, never the report alone; a sentence about a file, script, or configuration is ruled
against that artifact. Round 1 confirmed everything outside the sentences brief 2 rewrites. Law:
scaffold's `AGENTS.md` § Writing, `.claude/rules/writing.md`, `documentation.md`, `workspace.md`.

1. **The count.** The section opens "Veneer publishes its cascade through a standalone stylesheet
   subpath, `./styles`." and the paragraph's facts (the `build:src:styles` script compiles the
   `src/styles/index.scss` barrel to the `dist/src/styles/index.css` stylesheet; `exports` names
   the file under the subpath; `sideEffects` lists the `**/*.css` pattern) are true against
   `package.json` and the wrapper.
2. **The proof subject.** The sentence after the scripts table says the `test:src:styles` script
   builds first because the proof's subject is the compiled cascade, the project loads the
   `dist/src/styles/index.css` file through its `setupFiles` array, the cases that read the
   shipped cascade read the rules the browser resolved from that file, the mixin proofs compile
   their own fixture partial `tests/src/styles/fixtures/mixins.scss`, and the token proofs also
   drive declarations the case writes; each clause is true against `configs/src/vite.styles.config.ts`,
   `tests/src/styles/mixins.test.ts`, and `tests/src/styles/tokens.test.ts`.
3. **The boundary attribution.** The environment-boundary departure says the root's `srcBrowser`
   and `appBrowser` factories plant the `environmentBoundary` plugin on the `src/browser` and
   `app/browser` environments and the `configs/src/vite.core.config.ts` wrapper plants it on the
   `src/core` environment; true against `vite.config.ts` lines 129 and 170 and
   `configs/src/vite.core.config.ts` line 10, with `srcCore()` installing no plugin.
4. **The coverage sentence.** The `tests/config.test.ts` departure closes: the proofs under the
   `tests/src/styles/` directory prove the cascade, the tokens, the theme, the mixins, and the
   elements, and no proof asserts the alias, the project registration, or the configuration
   plugins for the axis; that gap is a departure recorded, not covered; true against the files
   under `tests/src/styles/` and `tests/config.test.ts`.
5. **The replaced fields and the rows.** The `### Files` paragraph on the wrapper lists the build
   options among the replaced fields (keeping the root's build-log handler and dropping the
   browser externals and output paths), true against `configs/src/vite.styles.config.ts` lines 5
   to 10 and `vite.config.ts` lines 140 to 146; the departures' opening sentence names the
   workspace rows by their keys (`src/styles/` in the environment table, `@src/styles` in the
   alias table, the matching build-output, test-project, and scoped-check rows), true against
   `.claude/rules/workspace.md`; the departures are a bulleted list.
6. **The register.** Every backticked token in the section (`## Styles` to the line before
   `## Tokens`) is followed by a noun, except a table row's key cell, a list member sharing the
   trailing noun of the members after it, and an appositive whose noun comes first (report 2's
   § Item 2 lists every token and its noun); no count over a growable set; no `rtl`; no relative
   link; no banned substitution-table row; `test:guides` green.
7. **Scope honesty.** `tmp/audit/u-styles-guide-status-2.txt` equals the round-1 status; the only
   blob pair that differs from `units/u-styles-guide-diff.patch.txt` is `guides/veneer.md`, and
   every changed line sits between `## Styles` and `## Tokens`.
8. **Gates (ruled by the Orchestrator from the retained verifier report).** `format:check`,
   `test:guides`, `test:policy`, `build`, and the whole `npm test` chain exit 0; `scaffold audit`
   exits 0 with the `setup` question and the three advisory lines alone.
