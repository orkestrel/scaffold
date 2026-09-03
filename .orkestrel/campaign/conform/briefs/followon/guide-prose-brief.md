# Unit guide-prose — the elided fence output

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of guide (`be14c1b`), from the landed tip.

## Objective

The `## Patterns` fence in `guides/guide.md` whose output comment ends in `...` marks its omission with a comment in the sample's language, and its transcription in `tests/guides.test.ts` follows, with the guide parity project green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Examples, numbers, and abbreviations (mark omitted code with a comment in the sample's language, never with `...`); `/home/user/scaffold/.claude/rules/documentation.md` § Parity.

**Evidence** (the round-2 objective lane, `units/l3/guide-objective-r2.md` F-3; line numbers from the pre-landing tree and can have moved): `guides/guide.md:524` ends `…, jsdoc: undefined }, ...]`, and `tests/guides.test.ts:347` transcribes that string inside the presence guard. End the fence comment at the first record and add a following line comment naming what is elided (for example `// … one record per remaining export`), then update the transcription's presence guard in the same edit so `test:guides` stays green.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/guide run <script>`, `npm --prefix /home/user/fleet/guide test`, `cd /home/user/fleet/guide && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/guide status --short`, `git -C /home/user/fleet/guide diff`, `node /home/user/scaffold/tmp/work/evidence.mjs guide`, `cd /home/user/fleet/guide && npx scaffold audit --offline`, and `grep -rn '\.\.\.' /home/user/fleet/guide/guides/guide.md`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/guide.md` (the one fence comment), `tests/guides.test.ts` (the one presence guard).

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. The fence comment and its transcription; `test:guides` green.
2. Sweep `\.\.\.` over `guides/guide.md` inside fences and rule every remaining hit (a spread operator in code is permitted; an elision in prose or an output comment is not).

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs guide`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/guide-prose-report.md`: the fence and the guard now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when the fence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. No output comment in a `guides/guide.md` fence ends in `...`; `test:guides` exits 0.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
