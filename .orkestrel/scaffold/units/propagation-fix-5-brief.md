# Unit propagation-fix-5 — run the setup scripts the generated manifest declares, then finish the adopter

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The packed adopter in `tests/distribution.test.ts` (report: `tmp/units/propagation-fix-4-report.md` § Packed adopter readings) now passes `lint:check`, `check`, `build`, `test:src`, and `test:app` in the generated full selection and fails at its own unconditional `npm run test:setup` with `Missing script: "test:setup"`: the selection seeds `tests/setupStyles.test.ts` (a browser proof) and no Node setup proof, so the generator registers `setup:browser` and `test:setup:browser` and neither the Node `setup` project nor `test:setup`, as `.claude/rules/workspace.md` § Test project matrix states. Make the adopter run the setup scripts the generated manifest declares and assert the planned presence and absence, run the adopter to completion with every downstream reading, and take the `desk` scratch readings.

## Context

- **The adopter's step list.** `tests/distribution.test.ts`, the case `runs the complete selection through a packed CLI adopter and repairs its wrapper` (the failing assertion is at `:286` in the fix-4 reading); read how it lists the scripts it runs. Replace the fixed `test:setup` and `test:setup:browser` entries with a reading of the generated `package.json` scripts: assert that `test:setup:browser` is declared (the seeded browser proof registers it) and `test:setup` is not (no Node setup proof is seeded for this selection), then run the declared one. Keep every other step as it is; keep the assertion that each run exits 0.
- **The oracle law.** The adopter is the proof of the generated workspace; it changes only where it asks for what the plan does not emit, which is this case, and the change asserts the plan's shape rather than loosening it.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; `npm run build` before `npm run test:distribution`; `host.json` differs by regeneration alone (`tests/distribution.test.ts` is not vendored, so no digest changes are expected).
- **Law.** `AGENTS.md`, `.claude/rules/tests.md`.

## Unknowns

- Whether a later adopter step fails for another reason; each is quoted bare and is a stop.

## Scope

- **Owned.** `tests/distribution.test.ts` for the adopter's setup-script step alone; `host.json` (regenerated only).
- **Off-limits.** Everything else.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts` and `--check`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests/distribution.test.ts`, `npm run build`, `npm run test:distribution` (bare, to natural completion), and the `desk` scratch generation under `os.tmpdir()` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Change the adopter's setup step as Context states.
2. Run, in order: `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests/distribution.test.ts`, `npm run build`, `npm run test:distribution` (quote the adopter's complete step table with exit codes and durations, both page stamps against `computeStamp`, the CSS consumer result, the repair byte comparison, the stale audit finding, and the wall time), then `npx oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts`.
3. Generate `node dist/bin/main.js new desk --target <os.tmpdir()>/scaffold-fix-5 --src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print --offline`; quote three readings: the generated `guides/README.md` lists the Vue faces and the showcase pages; the generated `package.json` carries the showcase and journey scripts; the generated root `vite.config.ts` declares no function inside a factory body outside the admitted positions (read it; name any local binding you find); delete the directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-5-report.md` with: the diff of the adopter's setup step; the adopter's readings; the three `desk` readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a generated script fails for another reason (quote it bare), when the `desk` readings disagree with the rulings, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, scoped lint, and scoped format exit 0.
2. `npm run build` and `npm run test:distribution` exit 0 with the adopter complete and its readings quoted.
3. The three `desk` readings match.
4. No file outside the owned set differs from its state at your start; no scratch directory remains.

## Review evidence

The diff and the report.
