# Unit nested-1, continuation — implement the admission the tester now expects

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The previous run of this unit (report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/nested-1-report.md`; brief: `tmp/units/nested-1-brief.md`, whose Ruling, Law, and Execution sections still bind) wrote the tester cases into `tests/config.test.ts` and recorded the regression baseline: `npm run test:config` with 183 collected, 8 failed, 174 passed, 1 skipped, the 8 being the added cases red before the fix. Implement the ruled admission in `configs/policy.ts`, land the four law sentences, correct the one expectation the report names, and run the gates in the corrected order, so the same command passes after the fix.

## Context

- **Tree state.** The checkout carries uncommitted changes from earlier campaign units (`git status --porcelain` lists them: `src/**`, `tests/src/**`, `tests/setup.ts`, instruction files, `host.json`, and the untracked `.orkestrel/scaffold/`). Never touch, revert, stash, or clean them. Record `git status --porcelain` and `git diff --stat` at your start; the acceptance criterion is that no file outside your owned set differs at your end from that start, and that `host.json` differs only by regeneration.
- **Gate order.** `tests/config.test.ts` and `configs/policy.ts` are vendored host files whose bytes `host.json` inventories, and the config proof's first case refuses a stale inventory. Run `npm run build` (whose `build:inventory` step regenerates `host.json`) before `npm run test:config`, and again after the last edit to either file.
- **The expectation to correct.** The added inner-binding control expects column 14 while the baseline diagnostic reports column 13 on line 3; set the expectation to what the rule reports once the admission is implemented, and keep it a single diagnostic for the inner binding alone.
- **The `computed` field.** The existing rule rejects a computed-key property because the climb never admitted it. After the climb exists, confirm from the tester that `create({ [key]: () => 1 })` stays reported, through `property.computed === true` if Oxlint exposes it, or by refusing a `Property` whose `key` is not an `Identifier` or a string `Literal`. Report which.
- **Everything else** as the original brief states: the climb through parentheses, `init` non-method properties, and array elements; position decides and the name does not; `isPolicyVisitor` and its sentence retire; the four law sentences; `host.json` regenerated.

## Unknowns

- Whether `npm run lint:check` reports a nested-function hit elsewhere in the tree once named function expressions are admitted; it can only report fewer. Read it bare.

## Scope

- **Owned.** As the original brief: `configs/policy.ts`, `tests/config.test.ts` (the `no-nested-functions` tester block only), `AGENTS.md:60`, `.claude/rules/architecture.md:169`, the one visitor-exception sentence in `.claude/rules/workspace.md` § Policy instruments, `.agents/skills/orkestrel-harden/references/centralization.md:31-32`, `host.json` (regenerated only).
- **Off-limits.** Everything else, including the other units' uncommitted changes.
- **Tools and limits.** As the original brief states.

## Execution

1. Read the report, the diff of `tests/config.test.ts`, and `configs/policy.ts:517-600` and `:850-862`.
2. Implement the admission and delete `isPolicyVisitor` (and `isPolicyAnonymous` if nothing else reads it; grep first).
3. Land the four law sentences; sweep them for the substitution table.
4. Correct the column expectation.
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write configs/policy.ts tests/config.test.ts AGENTS.md .claude/rules/architecture.md .claude/rules/workspace.md .agents/skills/orkestrel-harden/references/centralization.md`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json configs tests/config.test.ts`, `npm run build`, `npm run test:config`, `npm run test:policy`, `npm run lint:check`, then `npx oxfmt --config .oxfmtrc.json --check` over the same six files.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/nested-1-report.md` as the finished unit's report: the files changed; each predicate changed or deleted with one line; the tester's valid and invalid counts; the regression pair (the baseline command and its 8 failures, the same command green after); each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the Oxlint AST lacks a field the climb needs and no refusal by key shape substitutes, when `npm run lint:check` reports a hit the ruling does not cover, when a gate refuses the tree for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. The user's example passes the tester; the local binding, declaration, spread, computed key, accessor body, and nested inner binding still fail it.
2. `tsc`, scoped lint, scoped format, `build`, `test:config`, `test:policy`, and `lint:check` exit 0.
3. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone.

## Review evidence

The diff of the owned files and the report.
