# Unit veneer-setup-1 — rename the misnamed CSSOM proof in `@orkestrel/veneer`

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell, working in `C:/Users/mikes/WebstormProjects/veneer`. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in the veneer checkout for this unit's duration. Never commit; the Orchestrator commits.

## Objective

`tests/setupBrowser.test.ts` carries only cases over `tests/setupStyles.ts` exports while `tests/setupBrowser.ts` exports nothing, so the proof is misnamed and `tests/setupStyles.ts` has no sibling proof. Rename the proof to `tests/setupStyles.test.ts`, make the `setup:browser` project collect both browser proofs, keep every gate the change touches green, and record the date on the roadmap.

## Context

- **Evidence.** `tests/setupBrowser.test.ts` (imports `adoptSheet`, `flattenRules`, `readLayerNames`, `readPlacement`, `scanSheetRules` from `./setupStyles.js` and nothing from `./setupBrowser.js`); `tests/setupBrowser.ts` (a `declare module 'vitest'` augmentation, no export); `vite.config.ts:194-206` (`setupBrowser` factory, `include: ['tests/setupBrowser.test.ts']`) and `:351-357` (the Node `setup` project, `include: ['tests/setup*.test.ts']`, `exclude: ['tests/setupBrowser.test.ts']`); `tests/config.test.ts` (grep `setupBrowser.test` for the cases that pin the include and exclude); `package.json` (`test:setup:browser`); `ROADMAP.md` § Proofs (the `setup`, `setup:browser` row) and § Scaffold propagation item 1 (the sentence "adopting the release renames it to `tests/setupStyles.test.ts`"). The scaffold rule this follows: `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` § Cross-cutting proofs as of 2026-09-30 (read-only): `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts` sit in `setup:browser`; every other root setup proof sits in `setup`, which excludes both; a root `tests/setup<Name>.ts` that declares an export has `tests/setup<Name>.test.ts`.
- **Law.** Veneer's own `AGENTS.md` and `.claude/rules/` (the vendored scaffold rules at veneer's adopted release); `.claude/rules/writing.md` for the roadmap sentence.
- **Host.** Windows 11, Node 24; `node_modules` installed. Never install.

## Unknowns

- Whether Vitest refuses an `include` entry that matches no file; `npm run test:setup:browser` after the rename settles it (the project lists `tests/setupBrowser.test.ts`, which no longer exists, beside the renamed file).

## Scope

- **Owned.** `tests/setupBrowser.test.ts` (moved with `git mv` to `tests/setupStyles.test.ts`), `vite.config.ts` (the `setupBrowser` factory's `include` and the `setup` project's `exclude` only), `tests/config.test.ts` (the cases that pin those two lists), `package.json` only if a script names the proof file, `ROADMAP.md` (the two sentences named under Context).
- **Off-limits.** `src/**`, `configs/**`, every other test, `.claude/**`, `AGENTS.md`, `.agents/**`, `guides/**`, `.orkestrel/**`, the scaffold checkout.
- **Tools and limits.** Read, patch, `git mv`, and the shell. Run: `git status --porcelain`, `git diff`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests vite.config.ts`, `npm run test:setup:browser`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never commit; never install.

## Execution

1. `git mv tests/setupBrowser.test.ts tests/setupStyles.test.ts`; the file's content stays as it is (it already imports `./setupStyles.js`); rename its `describe` label only if the label names `setupBrowser`.
2. `vite.config.ts`: `setupBrowser` factory `include: ['tests/setupBrowser.test.ts', 'tests/setupStyles.test.ts']`; the `setup` project `exclude: ['tests/setupBrowser.test.ts', 'tests/setupStyles.test.ts']`.
3. `tests/config.test.ts`: update the cases that pin those lists to the new lists, with a control that the `setup` project does not collect `tests/setupStyles.test.ts`.
4. `ROADMAP.md`: § Scaffold propagation item 1's last sentence becomes "The proof was renamed to `tests/setupStyles.test.ts` on 2026-09-30, ahead of the release." and the § Proofs row stays as it is.
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write vite.config.ts tests/config.test.ts tests/setupStyles.test.ts ROADMAP.md`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests vite.config.ts`, `npm run test:setup:browser`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, then `npx oxfmt --config .oxfmtrc.json --check` over the same files.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/veneer-setup-1-report.md` with: the files changed; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when Vitest refuses the absent include entry, when a config case outside the two lists reddens, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tests/setupStyles.test.ts` exists, `tests/setupBrowser.test.ts` does not, and `git status --porcelain` shows the rename.
2. `npm run test:setup:browser` collects the renamed proof in Chromium and exits 0; `npm run test:setup`, `npm run test:config`, and `npm run test:policy` exit 0; `tsc`, scoped lint, and scoped format exit 0.
3. `git status --porcelain` lists only owned files.

## Review evidence

The diff and `git status --porcelain`; the report file.
