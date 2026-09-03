# Unit conform-workflow fix round 1 — one banned `now`, three stale locals, one nested arrow

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 checker's refutations of claims 1 and 3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-r1-checker-luna.result.md`) and the nested arrow the unit recorded outside its rows (`/home/user/scaffold/tmp/units/conform/conform-workflow-report.md` § Observations), before the round's distill and objective lanes read the tree.

## Context

Read first: `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`now` deleted or dated) and § Claims and time; `/home/user/scaffold/AGENTS.md` § Design laws (one concept, one term; no nested functions); `/home/user/scaffold/.claude/rules/architecture.md` § Functions and orchestration.

Standing conditions: the checkout carries the conform-workflow unit's uncommitted edits (58 files); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- **Claim 1** — `guides/workflow.md:105`: "now inserted" → "inserted before" (or the sentence's own tense without `now`); then sweep `\bnow\b`, case-insensitive, over `guides/workflow.md`, `guides/README.md`, `README.md`, and `src`, and rule every hit (a `now` that names a value, such as `performance.now()`, is a code token and permitted).
- **Claim 3** — `tests/src/core/helpers.test.ts:206-210`: the locals `taskStatus`, `phaseStatus`, and `workflowStatus` carry the vocabulary of the deleted tier aliases; rename each for what it holds (a status read from a task, a phase, and a workflow position — for example `fromTask`, `fromPhase`, `fromWorkflow`) and keep the case's assertions. Re-run the case-insensitive old-name sweep `\b(WorkflowFunctions|TaskStatus|PhaseStatus|WorkflowStatus|TASK_STATUSES|TERMINAL_TASK_STATUSES|PHASE_STATUSES|WORKFLOW_STATUSES|RunnerValue|RunnerFailure|WorkflowHooks|PhaseHooks|TaskHooks|createGate|TestGateInterface|QueueExecution)(s|es|ed|ing)?\b` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, and `README.md`, and record it with every surviving hit ruled (`derivePhaseStatus` and `deriveWorkflowStatus` are retained helper names).
- **The nested arrow** — `tests/src/core/RunHolder.test.ts:41`: `readActive` is declared inside a test body; inline `holder.runner` at its reads, or move the accessor to `tests/setup.ts` as an exported helper if it carries logic. Sweep `^\s+(const|let)\s+\w+\s*=\s*(async\s*)?\(.*\)\s*(:[^=]+)?=>` over `tests/src/core/RunHolder.test.ts` afterwards and rule every hit.
- **Report** — append `## Fix round 1` naming the checker's file, each item, the sweeps, and the sites.

## Scope

Owned: `guides/workflow.md` (`:105`), `tests/src/core/helpers.test.ts` (`:204-212`), `tests/src/core/RunHolder.test.ts`, `tests/setup.ts` (only if the accessor moves there), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each rewritten site with `file:line`; the three sweeps with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, and the scoped `src:core` runs over the two test files.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: the exact local names.

## Acceptance criteria

1. `grep -n "now inserted" guides/workflow.md` returns nothing; the `now` sweep returns only code tokens.
2. The old-name sweep returns only the two retained helper names.
3. `tests/src/core/RunHolder.test.ts` declares no function inside a test body.
4. The gates and scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
