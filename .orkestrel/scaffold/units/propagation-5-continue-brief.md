# Unit propagation-5, continuation — anchor the root-file lint override, then finish the vendored proofs

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration (a guide unit edits `guides/**` and `tests/guides.test.ts` in parallel; never touch those).

## Objective

The previous run of this unit (report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-5-report.md`; brief: `tmp/units/propagation-5-brief.md`, whose Execution, Scope, Tree state, and gate-order sections still bind) replaced the Vue lint-block regex matrix in `tests/config.test.ts:1953` with a proof that drives the real Oxlint binary, and that proof found a defect in the vendored `.oxlintrc.json` that predates this campaign: the trailing override at `:560-580` lists `"*.{cjs,cts,js,mjs,mts,ts}"` among its `files`, a slashless pattern Oxlint matches against basenames at any depth, so that override's `no-restricted-imports` (the `typescript` refusal alone) replaces every environment block's restriction for every TypeScript file in the tree, and no environment import boundary has been enforced by lint. Repair the override so it reaches root files alone, prove the repair through the real binary over every environment block, and then finish the original brief: the face enumerations with their mutation controls, the root setup mirror in the sweep with its controls, the veneer reading, and the gates.

## Context

- **The defect's evidence.** The previous report § Deviations: the original configuration reports no restriction for `src/vue/control.ts` importing `node:fs`; removing the slashless glob from the scratch copy restores `eslint(no-restricted-imports)`; disabling the Vue rule removes it again (`tmp/units/propagation-5-import-{original,scoped,disabled}.json`). `git show HEAD:.oxlintrc.json` carries the same override, so the gap is in every fleet target that vendors this file; the release that carries the repair closes it through `repair`.
- **The repair's shape.** The override exists to refuse `typescript` from root-level files (`vite.config.ts` and its kind) and from `tests/**`, `configs/**`, and `scripts/**`. Keep that intent. Find the pattern form the real binary matches at the root alone: probe `./*.{cjs,cts,js,mjs,mts,ts}` first, then a leading-slash form, then an explicit enumeration of the root files the generator emits (`vite.config.ts` and whatever else the templates write at the root with those extensions), and adopt the first form that (a) refuses `typescript` from a root file, (b) leaves `src/vue/control.ts`'s `node:fs` refusal intact, and (c) still refuses `typescript` from `tests/**`, `configs/**`, and `scripts/**`. Read the Oxlint documentation in `node_modules/oxlint/` for the override glob semantics before probing; name the source you read. The template the generator emits for `.oxlintrc.json` is the vendored file itself (`HOST_PATHS`; `blueprintToHostArtifacts` plans it without generated content), so one edit serves the checkout and every target.
- **The proof's reach.** The real-linter case covers refused and admitted imports at `src/vue`, `app/vue`, `src/browser`, `app/browser`, `src/core`, `app/core`, `src/server`, `app/server`, and `src/bin` (nine owner paths, 106 files per run, each fixture carrying a `debugger` statement so an uncollected file cannot pass). Keep that reach: after the repair, every refused direction in every block must produce `eslint(no-restricted-imports)` and every admitted one none, with the disabled-restriction mutation reddening the refusal assertion, and add a root-file case (a root `probe.config.ts` importing `typescript` is refused; importing `node:fs` is admitted) with a control that a `src/core` file importing `typescript` is refused by its own block's `typescript` rule, if the block carries one, or report that it does not.
- **Everything else** as the original brief: the vendored face enumerations in `tests/config.test.ts` (`collectSheets`, `collectFrameworks`, the per-face cases, the showcase and journey cases, the `setup:browser` membership, the `optimizeDeps` set) with their mutation controls in a scratch copy under `tmp/`; the root setup mirror in `tests/setupPolicy.ts` with its five controls in `tests/setupPolicy.test.ts`, no name-based exemption; the veneer reading (read-only); the gates in the corrected order (`npm run build` before `test:src:bin`, `test:config`, and `test:policy`; the host-drift rerun rule for the parallel guide edits).
- **Law.** As the original brief, plus `.claude/rules/application.md` (the toolchain enforces the boundary through `no-restricted-imports`; none of its tools is replaceable by a custom parser) and `.claude/rules/workspace.md` § Policy instruments.

## Unknowns

- Which pattern form Oxlint's override matcher anchors at the root; the probe settles it, and the report quotes the three readings per candidate form.

## Scope

- **Owned.** As the original brief, plus `.oxlintrc.json` for the trailing override's `files` list alone (no rule or block elsewhere), and `host.json` (regenerated only).
- **Off-limits.** As the original brief; `guides/**` and `tests/guides.test.ts` (the parallel guide unit); every environment block of `.oxlintrc.json`.
- **Tools and limits.** As the original brief, plus `node node_modules/oxlint/bin/oxlint` with explicit file arguments and `--no-ignore` against scratch fixtures under `tmp/`.

## Execution

1. Read the previous report and the three JSON readings; read the Oxlint override glob documentation; probe the candidate forms through the real binary and adopt the first that meets (a), (b), and (c).
2. Edit the trailing override's `files` list to the adopted form; rerun the real-linter case and the root-file case.
3. Implement the rest of the original brief's steps 1 to 3 (face enumerations and controls; the root setup mirror and controls; the veneer reading).
4. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests` (read it bare; the repaired override may surface a boundary hit the old config hid, in `tests/**` or elsewhere), `npm run lint:check` (the same, tree-wide; report every hit with its file and line and stop if one is outside your owned set), `npm run build`, `npm run test:setup`, `npm run test:policy`, `npm run test:config`, `npm run test:src:bin`, `npm run test:guides` (observation), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-5-report.md` as the finished unit's report: the files changed; the adopted pattern form with the three readings per candidate; every case added with its control; the veneer reading; the architecture sentence (report only); each command, its exit code, and its test count; every lint hit the repaired override surfaced; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when no candidate form anchors at the root, when `lint:check` surfaces a boundary hit in a file outside your owned set (quote it; that is a real finding for the Orchestrator), when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Root `tsc`, scoped lint, scoped format, and `lint:check` exit 0, or `lint:check`'s hits are quoted and the stop is taken.
2. `npm run build`, `test:setup`, `test:policy`, `test:config`, and `test:src:bin` exit 0 with every new case and control; `test:guides` is quoted.
3. The real-linter proof refuses every refused direction in every environment block and the root `typescript` import, admits every admitted one, and reddens under the disabled-restriction mutation.
4. No file outside the owned set differs from its state at your start except the guide unit's files; `host.json` differs by regeneration alone; `tmp/probes/` and every scratch directory are empty at the close.

## Review evidence

The diff of the owned files and the report.
