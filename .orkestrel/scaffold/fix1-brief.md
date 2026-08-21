# scaffold readiness fix unit 1 — the objective half

## Role and engine

Sol `implementer`, GPT-5.6 Sol, inside `codex exec --sandbox workspace-write` at `/home/user/scaffold`.

## Objective

Close SR13 and SR14 from the `tmp/readiness-matrix.md` file: delete the pass-through factories, and make `remove` re-derive its candidate set from the plan as its contract already promises.

## Context

- Read before editing: the `AGENTS.md` file, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`, the `guides/scaffold.md` guide, and the `tmp/readiness-matrix.md` file.
- The tree is committed and clean at dispatch. `node_modules` is installed. The gates are `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`.
- Standing conditions of this sandbox: no network; a process one level below a test may be denied `EPERM`; the policy suite spawns git and may fail here — record such a denial with its exact command and continue; the Orchestrator takes the reading on the host.
- The findings:
  - **SR13**: `createCompiler` (src/core/factories.ts), `createMaterializer`, and `createUpstream` (src/server/factories.ts) each only invoke their public constructor. The Consolidation rule in `.claude/rules/architecture.md` deletes pass-through factories. Delete the factories and update every consumer — src, tests, and guide fences — to construct the class directly. Sweep for every consumer before editing: a test, a guide fence, and a barrel export each go false when the symbol goes.
  - **SR14**: `remove(audit, repository, target)` (src/server/Materializer.ts:399) filters caller-supplied `finding.drift === 'foreign'` labels and re-derives only bytes, while its TSDoc (src/server/types.ts:219) and the guide (guides/scaffold.md:820-822) promise `remove` re-derives every verdict itself. A fabricated audit naming a tracked path with its current bytes is accepted and deleted. Types first: add the plan to the `remove` contract, re-derive the current candidate set the way `audit` derives it, compare the derivation with the supplied preview, and refuse on mismatch before opening the transaction. Keep the existing tracked, protected, dirty, and byte preconditions. Update `MaterializerInterface`, the implementation, every call site (`bin`, tests, guide), and the TSDoc so prose and code state the same contract.
  - The proof for SR14 runs red first: a test that fabricates an audit naming a tracked file with its current bytes and shows `remove` deletes it today, then refuses after the fix. Name the test for what it proves, not for the finding row.
- The `dist/host` vendored surface: `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored copies — off-limits. `remove` and `repair` behavior tests live under `tests/src/server/`.

## Unknowns

- Whether the derivation `audit` performs is directly reusable by `remove` without duplication is yours to read; route both through one shared derivation rather than a second copy, and report the shape you chose.
- Whether the scoped vitest proofs run inside this sandbox is unknown; report the outcome with exact commands either way.

## Scope

- Owned: `src/`, `tests/src/`, `guides/scaffold.md`, `README.md`, `bin/` if call sites live there.
- Off-limits: `package.json`, `vite.config.ts`, `tsconfig.json`, `.claude/`, `.agents/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `templates/`, `ROADMAP.md`, `tmp/` except your own report file.
- Permission limits: no commit, no push, no install, no `git checkout`/`restore`/`stash`/`reset`/`clean`, no secrets.

## Execution

You perform this assignment directly and spawn no agent.

## Output

Write your report to the `tmp/fix1-report.md` file: what changed with file:line, the SR13 consumer sweep with its pattern and paths, the SR14 contract as landed (signature plus the derivation-compare shape), the red and green readings with exact commands (or the sandbox denial), and any claim of your own you flag. End with the diffstat. No process diary.

## Deviation contract

A conflict with the primary objective — the contract change breaks a consumer you cannot edit, or the shared derivation cannot be extracted without an off-limits file — stops the unit with a report: expected, found, exact evidence, done or not done, one hypothesis at most. An ancillary choice (parameter order, test placement) is yours to decide and record.

## Acceptance criteria (in order)

1. `npm run lint:check` exits 0.
2. `npm run check` exits 0.
3. `npm run format:check` exits 0 (run `npm run format` first if needed).
4. `rg -n "createCompiler|createMaterializer|createUpstream" src/ tests/ guides/ README.md bin/ 2>/dev/null` returns no hit.
5. The fabricated-audit refusal proof exists with its red and green readings recorded (or the sandbox denial recorded with exact commands).
6. The `remove` TSDoc, the guide's `remove` prose, and the implementation state the same contract; quote the landed signature in the report.
7. Scoped vitest runs over the files you touched pass, or their denial is recorded. Whole-suite, policy, and timing readings are observations, never criteria.

## Review evidence

Return the actual `git diff --stat` and `git status --short` output in the report. The full diff stays in the tree for the auditor.
