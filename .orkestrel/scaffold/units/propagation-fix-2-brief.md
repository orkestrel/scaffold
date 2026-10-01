# Unit propagation-fix-2 — admit Vite's `development` mode in the application resolver

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The guide unit's pass 2 (`tmp/units/propagation-8-report.md` § Deviations) found that the emitted `showcase` dev script runs `vite --config configs/app/vite.showcase.config.ts` with no `--mode`, so Vite serves in `development` mode, and `resolveApplication` in `configs/helpers.ts` maps only `undefined`, `production`, and `test` to `browser` and throws `The application mode "development" is not declared.` for the base dev server. Make `development` resolve to `browser` like `production` and `test` (ruling 4's fallback names the modes Vite assigns by itself, and `development` is the one it assigns to `serve`), prove it, and retire the limit the guide documented in its place.

## Context

- **Evidence.** `configs/helpers.ts` (`resolveApplication`, about `:74`; read its TSDoc and the fallback set), `src/core/compilers.ts` (the `showcase` script, about `:521`), the config proof's `resolveApplication` cases in `tests/config.test.ts` (added by `propagation-4`; grep `resolveApplication`), the guide's limit "The base showcase dev server refuses its default mode" in `guides/scaffold.md` and the two assertions in `tests/guides.test.ts` under `builds one stamped showcase page per application mode` that pin the refusal (`development` refused) and the limit sentence's presence.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; `configs/helpers.ts`, `tests/config.test.ts`, and `guides/**` are vendored, so `npm run build` precedes `npm run test:config`, `npm run test:src:bin`, and `npm run test:guides`; this checkout is a generated target (no template change here, so no identity regeneration is expected; if one is needed, regenerate and quote).
- **Law.** `AGENTS.md`; `.claude/rules/typescript.md` (TSDoc states the fallback set); `.claude/rules/documentation.md` (a limit sentence that no longer holds is deleted with its assertion; the executed assertion that would break if the claim went false stays).

## Unknowns

- none

## Scope

- **Owned.** `configs/helpers.ts` (`resolveApplication` and its TSDoc alone), `tests/config.test.ts` (the `resolveApplication` cases alone), `guides/scaffold.md` (the limit entry alone, and the sentence in § The browser surface that states the fallback modes, if one names them), `tests/guides.test.ts` (the two assertions alone: `development` now resolves to `browser`, and the limit's presence guard is deleted), `host.json` (regenerated only).
- **Off-limits.** Everything else.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json configs tests/config.test.ts tests/guides.test.ts`, `npm run build`, `npm run test:config`, `npm run test:guides`, `npm run test:policy`. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install; never commit.

## Execution

1. `resolveApplication`: `development` joins the `browser` fallback; the TSDoc names all four (`undefined`, `development`, `production`, `test`); the undeclared-mode refusal keeps its message.
2. `tests/config.test.ts`: the `development` case resolves to `browser`; the undeclared-mode control stays.
3. `guides/scaffold.md`: delete the limit entry; where the fallback modes are listed, name `development`. `tests/guides.test.ts`: `resolveApplication('development', …)` asserts `browser`; delete the limit's presence guard; keep the undeclared refusal assertion.
4. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json configs tests/config.test.ts tests/guides.test.ts`, `npm run build`, `npm run test:config`, `npm run test:guides`, `npm run test:policy`, then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-2-report.md` with: the files changed; the diff of `resolveApplication`; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when `test:guides` reddens on anything other than the two assertions you change, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, scoped lint, and scoped format exit 0.
2. `npm run build`, `test:config`, `test:guides`, and `test:policy` exit 0.
3. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone.

## Review evidence

The diff of the owned files and the report.
