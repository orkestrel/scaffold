# Unit toolbox-migration — align toolbox to the re-pinned fleet surfaces

Role and engine: `sol` (GPT-5.6 Sol implementer; objective, constraint-heavy migration).

## Objective

`/workspace/toolbox` compiles and passes all five gates against its freshly re-pinned
dependencies — terminal 0.0.10, workflow 0.0.13, and the rest of the current registry set —
with every consumer call site moved to the new published APIs.

## Context

- Repo: `/workspace/toolbox`, branch `claude/orkestrel-fleet-orchestration-b0t5cy`.
- **Standing condition — the tree is dirty.** The wave visit already applied `scaffold overwrite`
  and re-pinned every `@orkestrel` range in `package.json` (installed to match), then stopped at
  the failing `check` gate. Keep those changes; build on them; do not revert pins.
- The failing gate: `npm run check` → `tsc --noEmit` errors in `src/core/factories.ts`,
  `src/core/helpers.ts`, `src/server/routes/TerminalConnection.ts`,
  `src/server/routes/TerminalRoutes.ts`, `tests/src/core/factories.test.ts`,
  `tests/src/core/helpers.test.ts`, `tests/src/server/factories.test.ts`. Full list: run the gate.
- Authority for every replacement: the exact installed declarations under
  `/workspace/toolbox/node_modules/@orkestrel/terminal/dist/` and
  `/workspace/toolbox/node_modules/@orkestrel/workflow/dist/`. Known renames from a first read:
  `PromptType` → `PromptStep`; `restoreWorkflow` → `createRestoredWorkflow` or
  `createRecoveredWorkflow` (read both declarations and pick by semantics);
  `PendingPrompt` and `isAnswerPayload` no longer exist — find the successors in the installed
  surface; `TerminalAnswerError` is now a record (`{ reason: ... }`), not a string; one factory's
  arity dropped from 4 to 3 (about twenty call sites) — read the declaration for which parameter
  moved and where it went.
- Read before editing: `/home/user/scaffold/AGENTS.md` (vendored identically in toolbox),
  `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/tests.md`.
- Non-negotiables restated: no `any`, no `as`, no non-null `!`, no `@ts-*` suppressions, no
  new dependencies, single-word entity members, real implementations in tests.
- Host: Linux, bash. Network available for npm but no installs should be needed.

## Unknowns

- The intended successor for each removed terminal export — the installed `.d.ts` answers it;
  report the mapping you chose per symbol in the output.
- Whether `PendingForm`'s new shape changes toolbox's form flow beyond property renames — if the
  flow itself must change semantically, that is a deviation: stop and report.

## Scope

- Owned: `/workspace/toolbox/src/**`, `/workspace/toolbox/tests/**` (except vendored
  `tests/setupPolicy.ts` and `tests/policy.test.ts`), `/workspace/toolbox/app/**` if present.
- Off-limits: `package.json`, `package-lock.json`, `node_modules/`, `guides/` mirrors,
  `.claude/`, `.agents/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
  `vite.config.ts`, `tsconfig.json`. Do not commit, push, or install.
- Validation: scoped and read-only — `npm run check`, `npm run lint:check`, `npm run test` are
  yours to run; do not run mutating `format` or `lint --fix`.

## Execution

Perform the migration directly; spawn nothing.

## Output

1. Per-symbol mapping: old export → chosen successor, one line each, with the declaration line
   (`file:line` in the installed `.d.ts`) that justified it.
2. Changed-file list with one line per file on what moved.
3. Gate evidence: the exact commands run and their exit codes (`check`, `lint:check`, `test`).
4. Any deviation encountered, per the contract below.

## Deviation contract

Stop and report if the migration requires editing an off-limits file, a semantic redesign of the
form flow, or a new type that belongs in a dependency rather than toolbox. Ancillary choices
(local variable names, test phrasing) are yours to decide and record.

## Acceptance criteria

- `npm run check` exits 0.
- `npm run lint:check` exits 0.
- `npm run test` exits 0.
- No suppression directives, no `as`, no `any`, no `!` introduced.
- Every removed-export consumer moved to a real installed successor, none reimplemented locally.

## Review evidence

Return the actual `git diff --stat` and `git status --short` output with your report; the
Orchestrator audits the full diff and runs the authoritative gates independently.
