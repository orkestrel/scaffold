# Unit canon-tests — report (2026-09-01)

Writer: `builder` on Sonnet (native). Changed `.claude/rules/tests.md:247,249`: the
style-primitives list now reads `mount`, `render`, `build`, `readStyle`, `readToken`,
`readRootToken`, `readPixels`, `parseCSSColor`, `matchesColor`, `findRule`, and the sentence after
it names `readStyle()`. Gates: `format:check` 0, `lint:check` 0, `test:policy` 0 (111 passed);
`rg` for `rootToken|colorEqual|\brgba\b` returns no hit. `git status --short`: the one owned file.
The builder confirmed `parseCSSColor` already exported by the parallel fix-up's tree at the time
of its edit.

Orchestrator verification (mechanical, in place of a checker lane): every backticked name in the
sentence resolves to an export of `@orkestrel/test/browser` (`rg` over `src/browser/helpers.ts`
and `factories.ts` counts one declaration each); no old name survives in the file; the diff is the
two lines. Verdict: PASS (Orchestrator-verified; no lane dispatched for a two-line mechanical
edit, recorded here).
