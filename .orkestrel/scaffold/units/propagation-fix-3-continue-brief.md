# Unit propagation-fix-3, continuation — finish every drafted ruling and run the sequence

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The previous run of this unit (report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-3-report.md`; brief: `tmp/units/propagation-fix-3-brief.md`, whose Context, Scope, Execution, and Output sections still bind where this brief is silent) drafted most rulings into the tree (its § Rulings and proof status table says, per item, what is drafted, what is partial, and what is not implemented) and stopped on item 13D because the Vue setup fixture is the constant `GENERATED_VUE_SETUP_FILES` in `tests/setupServer.ts:1045-1056`, outside its owned set. The drafts are in the tree as uncommitted changes: do not redo them, read them. Own that fixture, finish every item the table marks partial or not implemented, reconcile the templates with the identity set, run the full sequence to green, and rewrite the report as the finished unit's.

## Context

- **The table.** The previous report's § Rulings and proof status is the work list. Items marked "Unrun" need their gate; items marked "Partial" or "Not implemented" need the work: 11a's remaining hand-rolled allocations, 11b's formatting and verification, 11e's seeded proof and emitted-format follow-up, F1's identity regeneration, F5's cases and guide description, the writable-region showcase scripts with their predecessor cases, the factory-binding hoisting (the browser and server external callbacks, the emitted plugin indentation, the snapshots), the global-setup referral (the seeded proof proves the seeded `setup` with a control that can fail), and 13A, 13B, 13C, 13D.
- **13D's fixture.** `tests/setupServer.ts:1045` declares `GENERATED_VUE_SETUP_FILES`; `:1046` names `app/browser/SetupComponent.vue`; `:1056` imports `../app/browser/SetupComponent.vue`; `tests/distribution.test.ts:1362` writes those entries into a workspace generated for the fixture. Change the fixture to the campaign's shape: the SFC under `app/vue/SetupComponent.vue`, the import from `../app/vue/SetupComponent.vue`, the generating command carrying `--extend browser:vue`, and `tests/setupServer.test.ts` if it asserts the fixture's paths. The fixture's `tests/setupBrowser.ts` import of `vue` is then resolvable because the `vue` extension declares it.
- **Whitespace.** `git diff --check` reported `tests/setupPolicy.ts:3890: new blank line at EOF.`; the formatter write clears it.
- **Identity set and tree state.** As the original brief: regenerate every materialized configuration the templates changed (`vite.config.ts` for the hoisted factory bindings and the browser and server external callbacks; `configs/src/vite.bin.config.ts` for F1), quote each diff; `npm run build` before `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution`.

## Unknowns

- Whether the hoisted factory bindings change the emitted-format fixed-point cases in `tests/src/core/templates.test.ts`; run them first and align the emitted text to the formatter's output (format a scratch copy, copy the bytes back), never the other way.

## Scope

- **Owned.** As the original brief, plus `tests/setupServer.ts` for `GENERATED_VUE_SETUP_FILES` alone and `tests/setupServer.test.ts` for its assertions on that fixture alone.
- **Off-limits.** As the original brief, minus those two.
- **Tools and limits.** As the original brief.

## Execution

1. Read the previous report's table and the diff of the owned files (`git diff -- <owned files>`).
2. Finish every partial or unimplemented item, 13D included.
3. Regenerate the identity set from the compiler's output; quote each diff.
4. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `git diff --check`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:server`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests configs`, `npm run test:src:core`, `npm run test:src:server`, `npm run build`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution` (bare, to natural completion; quote the adopter's step table, page stamps, CSS consumer result, repair and audit readings, and wall time), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
5. The scratch generation of the original brief's last step, with its three readings, then delete the directory.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-3-report.md` as the finished unit's report: the files changed; each ruling and the case that pins it, every one executed; the identity-set diffs; the adopter's readings; the three scratch readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

As the original brief, plus: stop when a drafted item cannot be finished without a file outside the owned set, naming the file and the line.

## Acceptance criteria

As the original brief, every gate executed and green, `test:distribution` included with the adopter complete.

## Review evidence

The diff of the owned files and the report.
