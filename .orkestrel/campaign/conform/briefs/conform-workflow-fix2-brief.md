# Unit conform-workflow fix round 2 — two malformed doc blocks, the `e.g.` sites, a counted test name, two local fixtures

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 2 and 4 and its findings O1 and O2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-objective-r1-sol.md`). R2 is ruled: the toolbox patches the report carries under Shared-file patches apply at toolbox's own unit, dispatched after this package lands. Fix rounds 1 to 1d stand; do not re-edit their sites except where an item names one.

## Context

`/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`e.g.` → `for example`; a pattern for `e.g.` ends at the period, never at a word boundary after it); `/home/user/scaffold/AGENTS.md` § Writing (no count in a test name); `/home/user/scaffold/.claude/rules/tests.md` § Shared test infrastructure (a test file imports fixture factories from a setup module; `tests/setup.ts` is host-independent).

Standing conditions: the checkout carries the conform-workflow unit's uncommitted edits (59 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:setup`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- **Claim 2** — `src/core/Workflow.ts:40` ("observable * ROOT") and `src/core/types.ts:661` ("A `type` alias * so"): the citation removal left a stray ` * ` mid-sentence; rejoin each sentence so the doc block reads as prose. Sweep `\w \* \w` over `src` and `tests` for any other mid-line asterisk inside a doc block and rule every hit.
- **Claim 4** — `src/core/types.ts:306,834,959,1920,2337`, `src/core/phases/Phase.ts:46`, `src/core/tasks/Task.ts:45`, `src/core/WorkflowRunner.ts:462`: `e.g.` → `for example` (recast the sentence where the substitution reads badly). Re-run `\be\.g\.` and `\bi\.e\.` over `src`, `tests`, `guides/workflow.md`, `guides/README.md`, and `README.md` and record the result; correct the report's earlier row that recorded `\be\.g\.\b` as empty.
- **O1** — `tests/guides.test.ts:253`: the case named "reads a count of 2 back…" is renamed for what it proves ("reads the documented positional collection fence"); the assertion body keeps its value.
- **O2** — `tests/src/core/Collection.test.ts:13-24`: move `buildTasks` and `buildCollection` to `tests/setup.ts` as exported, documented factories (host-independent; if either needs a host module, `tests/setupServer.ts` instead) and import them; add their proofs to `tests/setup.test.ts` in the form that file uses; run `npm run test:setup` and the scoped `src:core` run over `Collection.test.ts` green.
- **Report** — append `## Fix round 2` naming the objective lane's file, each item with `file:line`, and the sweeps.

## Scope

Owned: `src/core/Workflow.ts:40`, `src/core/types.ts` (the `:661` block and the `e.g.` lines), `src/core/phases/Phase.ts:46`, `src/core/tasks/Task.ts:45`, `src/core/WorkflowRunner.ts:462`, `tests/guides.test.ts:253`, `tests/src/core/Collection.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each rewritten doc sentence with `file:line`; each `e.g.` rewrite with `file:line`; the renamed case; the moved factories with their new `file:line` and proofs; the sweeps with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:setup`, and the scoped `src:core` run.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a factory needs a host module beyond what `tests/setupServer.ts` offers, or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact rejoined sentence.

## Acceptance criteria

1. `grep -rnE "\be\.g\.|\bi\.e\." src tests guides/workflow.md guides/README.md README.md` returns nothing.
2. The two doc blocks read as sentences; the mid-line asterisk sweep returns only permitted hits.
3. `tests/src/core/Collection.test.ts` declares no fixture factory; `tests/setup.test.ts` proves the moved ones.
4. The gates and scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
