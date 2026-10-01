# Unit propagation-fix-8 — restore the emitted scaffold range after the adopter installs the pack

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The packed adopter in `tests/distribution.test.ts` (report: `tmp/units/propagation-fix-7-report.md` § Adopter readings) now passes every generated script, both page stamps, and the CSS consumer, and fails at its wrapper repair with `FETCH: A declared dependency names no concrete floor.`: the harness replaces the emitted `@orkestrel/scaffold` caret range in the generated manifest with a `file:` tarball specifier (`tests/distribution.test.ts:238-241`) so the pack installs, and `repair --offline` then reads a range with no concrete version (`dependenciesToFloors`, `src/bin/helpers.ts:426`; `src/bin/CLI.ts:750`; `versionsToRefusal`, `src/bin/helpers.ts:677`). A real adopter declares the caret range the generator emits, so the harness restores that range after the install (the installed `node_modules` stays as installed), runs the adopter to completion, and takes the `desk` readings.

## Context

- **The harness step.** `tests/distribution.test.ts` around `:230-250`: the tarball specifier, the manifest rewrite, the install. After `npm install` succeeds, write the emitted caret range back into `package.json` (read the range the generator emitted before the rewrite and restore it exactly; keep `package-lock.json` as npm wrote it, because `repair --offline` reads the manifest's declared range and the bundled floor, not the lockfile). Add an assertion that the manifest's range after restoration equals the emitted one, and a control that the pre-restoration `file:` form is what `repair --offline` refuses with `FETCH` (so the reason the restoration exists is pinned).
- **Oracle law.** The adopter changes only where its harness, not the generator, causes a failure; this is that case; it changes nothing about what it asserts of the generated workspace.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; `npm run build` before `npm run test:distribution`; `host.json` differs by regeneration alone (`tests/distribution.test.ts` is not vendored).
- **Law.** `AGENTS.md`, `.claude/rules/tests.md`.

## Unknowns

- Whether `repair --offline` after the restoration resolves the floor from the bundled data for the pack's own version (the generated range names the generator's version); if the floor refuses for another reason, quote it bare and stop.

## Scope

- **Owned.** `tests/distribution.test.ts` for the install-and-restore step and its two assertions alone; `host.json` (regenerated only).
- **Off-limits.** Everything else.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts` and `--check`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests/distribution.test.ts`, `npm run build`, `npm run test:distribution` (bare, to natural completion), and the `desk` scratch under `os.tmpdir()` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Change the harness step as Context states.
2. Run, in order: `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests/distribution.test.ts`, `npm run build`, `npm run test:distribution` (quote the adopter's complete step table, both stamps, the CSS consumer result, the repair byte comparison, the stale audit finding, and the wall time), then `npx oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts`.
3. The `desk` scratch readings `propagation-fix-5-brief.md` step 3 prescribes, quoted; delete the directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-8-report.md` with: the diff of the harness step; the adopter's readings; the `desk` readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a later adopter step fails for a cause outside the owned set (quote it bare), when the `desk` readings disagree with the rulings, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, scoped lint, and scoped format exit 0.
2. `npm run build` and `npm run test:distribution` exit 0 with the adopter complete and every reading quoted.
3. The `desk` readings match.
4. No file outside the owned set differs from its state at your start; no scratch directory remains.

## Review evidence

The diff and the report.
