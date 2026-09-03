# Unit rater-prose — the counted title outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/rater`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of rater (`a8bfe52`), from the landed tip.

## Objective

The test title at `tests/src/core/validators.test.ts:35`, `accepts the three stage literals`, names the literals or drops the number, and the suite stays green.

## Context

**Law.** `AGENTS.md` § Writing (never state a count over a set anyone can add to; name the members, or write the sentence without the number).

**Evidence.** `reports/conform-rater-report.md` § Observations and the round-1 objective lane (`units/l3/rater-objective-r1.md`). The title sits in `describe('validators — isStage', …)`; its cases assert `isStage('factor')`, `isStage('group')`, and the remaining literal in turn. Read the case body for the literals before rewriting.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/rater run <script>`, `npm --prefix /home/user/fleet/rater test`, `git -C /home/user/fleet/rater status --short`, `git -C /home/user/fleet/rater diff`, `node /home/user/scaffold/tmp/work/evidence.mjs rater`, `cd /home/user/fleet/rater && npx scaffold audit --offline`, and `grep -rn <pattern> /home/user/fleet/rater/tests/src`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/src/core/validators.test.ts`.

**Off-limits.** Everything else.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. Rewrite the title to name the literals (for example `accepts the factor, group, and … stage literals`) or to read `accepts every stage literal`.
2. Sweep `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b` case-insensitively over `tests/src/**/*.ts` and rule every hit by sense (a value the reader needs is permitted; a tally over a growable set is not).

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs rater`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/rater-prose-report.md`: the title now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a gate reddens on something the row did not touch.

## Acceptance criteria

1. The title states no count; the sweep's remaining hits are each ruled permitted.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the Owned path.
