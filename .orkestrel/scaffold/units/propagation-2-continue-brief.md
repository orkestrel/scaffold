# Unit propagation-2, continuation — regenerate the checkout's root configuration, align the owned proofs, finish the gates

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The previous run of this unit (report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-2-report.md`; brief: `tmp/units/propagation-2-brief.md`, whose Execution, Scope, and Tree state sections still bind) implemented the styles surface in the generator and stopped at `npm run test:src:core` with 442 passed and 7 failed: one ownership gap and six owned alignments. The implementation is in the tree as uncommitted changes: do not redo it, read it. Close the seven, finish consolidation, run the full gate sequence and the scratch generation, and rewrite the report as the finished unit's.

## Context

- **The ownership gap.** `tests/src/core/compilers.test.ts:1562` is the configuration identity proof: this checkout is itself a generated target, and the proof requires each root configuration file the proof names to equal the text the generator plans for this checkout's own derived blueprint. The `setup` project template changed (it excludes `tests/setupStyles.test.ts` and carries `pool: 'threads'` with `isolate: false`), so root `vite.config.ts:254` no longer matches. Regenerate every root file that proof compares (`vite.config.ts`; `tsconfig.json` and `package.json` too if the proof names them and they differ) by the mechanism the proof compares against, write the generated text, and quote the resulting `git diff` of each regenerated root file in the report. Change nothing in those files by hand.
- **The six owned alignments**, from the report: `tests/src/core/compilers.test.ts:126` uses `toHaveProperty('.')`, which the assertion library cannot read (assert the `exports` record's `'.'` key through `Object.hasOwn` or `expect(exports['.'])`); `:1103` names only `setupBrowser.test.ts` for the setup runtime (both browser proofs map to the browser runtime); `:1158` and `:2020` omit the emitted `optimizeDeps` field on the browser global-setup and browser factory expectations (add the ruled field); `tests/src/core/templates.test.ts:756`, the formatter fixed-point assertion, reports formatting differences in the emitted CSSOM helper's conditional expressions (make the `tests/setupStyles.ts` seed text an `oxfmt` fixed point: format a scratch copy with `npx oxfmt --config .oxfmtrc.json --write` and put the formatted bytes in the template).
- **Consolidation.** Before the gates: no nested function in the emitted or the generator code, no superfluous wrapper, every new compiler helper exported and tested, `templates.ts` data only.
- **Gate order and tree state.** As the original brief's Tree state bullet states: `npm run build` before `npm run test:config`; no file outside the owned set changes from its state at your start, and `host.json` differs by regeneration alone.

## Unknowns

- Whether regenerating root `vite.config.ts` changes anything beyond the `setup` project block; the diff you quote settles it.

## Scope

- **Owned.** As the original brief, plus root `vite.config.ts` (regenerated only), and `tsconfig.json` and `package.json` only if the identity proof names them and the generator's text differs (regenerated only; report the diff).
- **Off-limits.** As the original brief; the other units' uncommitted changes.
- **Tools and limits.** As the original brief, plus the generator's own CLI against this checkout only through `node dist/bin/main.js audit --offline --json` to read what differs; write the root files from the generator's output and never through `repair` on this checkout, so nothing outside the identity set moves.

## Execution

1. Read the report and the diff of the owned files.
2. Regenerate the identity set and quote its diff.
3. Close the six alignments.
4. Consolidate.
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests/src`, `npm run test:src:core`, `npm run test:src:bin`, `npm run build`, `npm run test:config`, `npm run test:guides` (guide drift alone is expected; quote it), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
6. Generate the scratch target as the original brief's step 5 states, read the emitted tree against the seed list, quote the listing, and delete the directory.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-2-report.md` as the finished unit's report: the files changed; every new export with one line (carry the previous list); the identity-set diff; the scratch listing; the `prove` closing line already obtained; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when regenerating the identity set changes a root file beyond what the template change explains, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set. `npm run test:guides` is read as an observation during this unit, because the guide is being rewritten in parallel by another unit: quote every failure line it prints and continue.

## Acceptance criteria

1. Root `tsc`, both scoped checks, scoped lint, and scoped format exit 0.
2. `npm run test:src:core`, `npm run test:src:bin`, `npm run build`, and `npm run test:config` exit 0; `npm run test:guides` fails on guide drift alone.
3. The scratch target holds every seed and wrapper the ruling names for its selection, and nothing else under `src/styles`, `src/print`, `configs/src/`, and `tests/`.
4. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; `tmp/probes/` and `tmp/scratch-styles/` hold nothing of yours.

## Review evidence

The diff of the owned files and the report.
