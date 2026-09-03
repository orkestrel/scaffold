# Unit browser-prose — the substitution left in the server test fixture

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/browser`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of browser (`81a580c`), from the landed tip.

## Objective

`via` leaves the TSDoc in `tests/setupServer.ts`, and the substitution sweep over the non-vendored tests reads clean, with the gate chain green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`via` → `through`, `by using`); `AGENTS.md` § Writing.

**Evidence** (`reports/conform-browser-report.md` § Observations for the next matrix): `tests/setupServer.ts` carries `via` in a TSDoc block; browser-subj-8 scoped itself to `src`. Read the file for the site.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/browser run <script>`, `npm --prefix /home/user/fleet/browser test`, `git -C /home/user/fleet/browser status --short`, `git -C /home/user/fleet/browser diff`, `node /home/user/scaffold/tmp/work/evidence.mjs browser`, `cd /home/user/fleet/browser && npx scaffold audit --offline`, and `grep -rniE '<pattern>' /home/user/fleet/browser/tests`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. `npm test` runs the module suites and the guide parity; the `service` project runs against a real Chromium only under `test:service` and is not part of this unit's gates.

## Scope

**Owned.** `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. Replace `via` by sense at every site the sweep `\bvia\b|e\.g\.|\bi\.e\.|\bsimply\b|\bjust\b|\bshould\b` (case-insensitive) over the Owned files returns, ruling every hit that is a permitted sense (a code identifier, a quoted fixture string) as permitted.
2. Record the sweep with its rulings.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs browser`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/browser-prose-report.md`: per site the line now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a gate reddens on something the row did not touch.

## Acceptance criteria

1. The sweep reads empty of banned senses in the Owned files.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
