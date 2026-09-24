# Unit JOURNEY-BUDGET (`jb`) — the resting-key journey case's timeout scales with its keys

## Role and engine

`builder` on Sonnet, a native subagent in the worktree `/home/user/veneer-jb` (branch `unit/jb` from the
session head `a9dff19`). The executor that opens this brief is that subagent.

## Objective

The journey case "reads every resting cascade key the same on its lifted frame as in the showcase, in
light and dark" in `tests/app/browser/integration.test.ts` takes a timeout derived from the length of
the `CASCADE_KEYS` table times one per-key budget constant, so the case's budget grows with the table
instead of sitting at the journey project's fixed `120_000` millisecond test timeout.

## Context

**Measurements, taken by the Orchestrator on this host at `a9dff19`
(`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/batch1-capture-rerun.log.txt`
and `resting-key-measure.log.txt` beside it).** The `CASCADE_KEYS` table in `tests/setup.ts` holds 98
entries. With the `CAPTURE=1` environment variable, the `journey:dark-390` project run alone at load
3.33 passes the case in 104978 ms. Without capture, the case alone passes in 17821 ms at load 2.02.
Under the batch verification chain at loads from 5.5 to 10.8, the case timed out in the `dark-1280`,
`light-390`, and `dark-390` capture runs, and once it timed out it kept running and every later case in
the `dark-390` run failed. Every landing that adds a resting key lengthens the case.

**The rule.** The per-key budget is 3000 ms: under capture the case spends about 1070 ms per key at
load 3.3, and the budget gives it room at loads near 10. Name the constant for what it bounds, state
in its TSDoc the measurement it rests on and what it multiplies, and declare it beside the
`CASCADE_KEYS` table in `tests/setup.ts`, the file that holds that table. Pass the product to the case
as Vitest's timeout argument for that one case. No other case's timeout changes, and the journey
config's `120_000` value stays.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,names,typescript,writing,architecture}.md`;
skill: none. The constant's name is one word or a descriptive `UPPER_SNAKE_CASE` module constant in the
file's existing style; follow the naming of `ORACLE_TIMEOUT` and `STAGE_TIMEOUT` in
`tests/setupServer.ts` and `tests/setupService.ts`.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Write
every log under the worktree's `tmp/units/` with the `jb` prefix, and nothing into the session
scratchpad or the system temporary directory.

## Unknowns

- Whether `tests/setup.test.ts` enumerates the module's exports (its export-list case names
  `CASCADE_KEYS`): if it does, add the constant there in the list's order and report it.

## Scope

**Owned.** `tests/setup.ts` (the constant and its TSDoc), `tests/setup.test.ts` (the export list, if it
enumerates), and `tests/app/browser/integration.test.ts` (the one case's timeout argument and its
import).

**Off-limits.** Every other file, including `configs/**`, the guide, `src/**`, `app/**`, the manifests,
and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`. Do not
run the journey with the `CAPTURE=1` variable: it rewrites committed frames.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-jb/tmp/units/jb-report.md` and the same text as the final message: the
diff; each gate's command exactly as it ran, its exit, and its result line; `jb.diff` and
`jb-status.txt` under `tmp/units/`. The report states no tally of a growable set and no temporal word,
and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when the change needs a file outside
the owned set. Decide, record, and carry on for the constant's exact name and where it sits beside the
table.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npm run lint:check` exit 0; `npm run check` exits 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`
   exits 0.
3. `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project
   'journey:light-1280*' -t 'reads every resting cascade key the same'` exits 0, and the case passes.

## Review evidence

`jb.diff`, `jb-status.txt`, and `jb-report.md`.
