# Unit propagation-1, continuation — align the two reddened proofs and finish the gates

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration. The Orchestrator reads `git status --porcelain` after the run.

## Objective

The previous run of this unit (report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-1-report.md`; brief: `tmp/units/propagation-1-brief.md`) wrote the surface and extension contract into the working tree and stopped at `npm run test:src:core` with 438 passed and 2 failed. The implementation is in the tree as uncommitted changes: do not redo it, read it. Align the two reddened proofs with the ruled behaviour, run every remaining gate the original brief names, and rewrite the report so it reports the finished unit.

## Context

- **The two failures.** `tests/src/core/constants.test.ts:104` ("seeds exactly the rows the manifest does not declare"): its table population omits `FRAMEWORK_MATRIX.vue.dependencies`, so the received set lacks `@vitejs/plugin-vue`, `vue`, and `vue-tsc` while the expected set retains them; add the framework rows to the population the case enumerates, keeping the assertion a membership over declared tables. `tests/src/core/templates.test.ts:643` ("fills every selected artifact without leaving a template token"): the fixture selects a browser application without an extension and expects `"types": ["vite/client", "vue"]`; under the ruled behaviour that fixture emits `["vite/client"]`. Change the expectation to the ruled text for the extension-free fixture and add the sibling fixture with `extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }]` expecting `["vite/client", "vue"]`, so both directions are asserted.
- **The type claim.** The previous `prove` call closed `no receipt` because the control failed beyond its declared type stage (its runtime guard assertion failed too). Form the claim once more with a control that fails at the type stage alone: the control file assigns `name: 'react'` to a `BrowserExtension` and does nothing at runtime that the guard would refuse differently from the case. Quote the closing line. If the second attempt also closes `no receipt`, say so and continue; the mirrored guard and parser tests stand.
- **Concurrent edits.** Instruction files under `.claude/`, `AGENTS.md`, and `.agents/skills/orkestrel-journey/` carry a finished rules unit's uncommitted changes; never touch them. `.orkestrel/scaffold/` is untracked and not yours.
- **Law.** As the original brief states.

## Unknowns

- Whether `npm run test:guides` executes a fence that constructs a blueprint without the new fields; if it reddens, report the fence and stop (the guide is `propagation-8`'s).

## Scope

- **Owned.** Everything the original brief owns, plus `tests/src/core/constants.test.ts` and `tests/src/core/templates.test.ts` for the two cases named under Context.
- **Off-limits.** As the original brief states, plus every instruction file.
- **Tools and limits.** As the original brief states.

## Execution

1. Read `git diff --stat` and the previous report; read the two failing cases and the source they assert.
2. Align the two cases as Context states.
3. Run, in order: `npx oxfmt --config .oxfmtrc.json --write tests/src/core/constants.test.ts tests/src/core/templates.test.ts`, `npx oxfmt --config .oxfmtrc.json --check <every owned file the previous report lists plus these two>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json src tests/src/core tests/src/bin`, `npm run test:src:core`, `npm run test:src:bin`, `npm run build`, `npm run test:config`, `npm run test:guides`.
4. Form the type claim as Context states.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-1-report.md` as the finished unit's report: the files changed (the previous list plus the two proofs); every new export with one line (carry the previous list); the `prove` closing line; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a gate reddens on something outside the owned set, when the guide's executable fences break, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Root `tsc`, scoped lint, and scoped format exit 0.
2. `npm run test:src:core`, `npm run test:src:bin`, `npm run build`, `npm run test:config`, and `npm run test:guides` exit 0.
3. `git status --porcelain` lists only owned files, the instruction files the rules unit changed, and `.orkestrel/scaffold/`; `tmp/probes/` holds nothing of yours.

## Review evidence

The diff and `git status --porcelain`; the report file.
