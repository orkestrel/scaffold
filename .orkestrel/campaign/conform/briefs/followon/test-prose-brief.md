# Unit test-prose — the workflow type the guide names by its old alias

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/test`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of workflow, from test's landed tip.

## Objective

The `guides/test.md` row that names `@orkestrel/workflow`'s `TaskStatus` names the type workflow publishes after its conformance landing, `LifecycleStatus`, or drops the type name, with the gate chain and the guide parity project green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (claim only what the reader can check); `/home/user/scaffold/.claude/rules/documentation.md` § Parity.

**Evidence** (the workflow reconcile lane, `units/l4/workflow-reconcile-luna.md`, workflow-subj-10's breaking sweep): `guides/test.md:1358` reads "… so it does not restate `TaskStatus`." in the row about a statechart transition table; workflow-subj-10 collapses `TaskStatus`, `PhaseStatus`, and `WorkflowStatus` into `LifecycleStatus`. Read `reports/conform-workflow-report.md` § Breaking for the landed name before editing, and rewrite the clause to name it.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/test run <script>`, `npm --prefix /home/user/fleet/test test`, `cd /home/user/fleet/test && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/test status --short`, `git -C /home/user/fleet/test diff`, `node /home/user/scaffold/tmp/work/evidence.mjs test`, `cd /home/user/fleet/test && npx scaffold audit --offline`, and `grep -rn 'TaskStatus\|PhaseStatus\|WorkflowStatus\|WorkflowFunctions' /home/user/fleet/test/guides/test.md /home/user/fleet/test/README.md /home/user/fleet/test/src /home/user/fleet/test/tests`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/test.md` (the one clause), `tests/guides.test.ts` (a presence guard only, where one quotes the clause).

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. The clause; `test:guides` green.
2. The sweep named in Host, ruling every hit.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs test`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/test-prose-report.md`: the clause now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when the clause is not found within three lines of the line named, or when a gate reddens on something the row did not touch.

## Acceptance criteria

1. The sweep returns no old alias in the package's own prose; `test:guides` exits 0.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
