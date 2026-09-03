# Unit relation-prose — the claim word outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/relation`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of relation, from the landed tip.

## Objective

`guarantee` leaves the guide and the test prose, each site reading the measured property as a bare noun phrase, with the gate chain and the guide parity project green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (never write `ensure`, `guarantee`, a superlative, or an effort adjective as a claim about behavior); `AGENTS.md` § Writing.

**Evidence** (the round-1 objective lane, `units/l3/relation-objective-r1.md` F3; line numbers from the pre-landing tree and can have moved): `guides/relation.md:339` ("The listener-isolation safety guarantee"), `:356` ("the emit-safety guarantee"), and `tests/src/core/Model.test.ts:261`. Rewrite each as the bare noun phrase — "listener isolation", "emit safety" — keeping the sentence's fact; the behaviour is pinned by `tests/src/core/Model.test.ts:349` and `:362`. Where a guide sentence is quoted by a presence guard in `tests/guides.test.ts`, change the guard in the same edit.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/relation run <script>`, `npm --prefix /home/user/fleet/relation test`, `cd /home/user/fleet/relation && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/relation status --short`, `git -C /home/user/fleet/relation diff`, `node /home/user/scaffold/tmp/work/evidence.mjs relation`, `cd /home/user/fleet/relation && npx scaffold audit --offline`, and `grep -rniE '<pattern>' /home/user/fleet/relation/src /home/user/fleet/relation/tests /home/user/fleet/relation/guides/relation.md /home/user/fleet/relation/README.md`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/relation.md`, `tests/src/core/Model.test.ts`, `tests/guides.test.ts` (a presence guard only).

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. The rewrites; `test:guides` green.
2. Sweep `\bguarantee(s|d)?\b|\bensure(s|d)?\b` case-insensitively over `src`, the non-vendored `tests`, `guides/relation.md`, and `README.md`, ruling every remaining hit by sense (a code identifier or a quoted fixture string is permitted).

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs relation`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/relation-prose-report.md`: per site the line now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep reads empty of claim words in the Owned files; `test:guides` exits 0.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
