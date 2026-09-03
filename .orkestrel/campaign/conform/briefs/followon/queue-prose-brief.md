# Unit queue-prose — the prose sites outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/queue`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of queue, from the landed tip.

## Objective

Close the prose findings the conformance audit recorded outside its rows: the positional `below` pointers and the `four-method` tally leave the test comments, with the gate chain green.

## Context

**Law.** `AGENTS.md` § Writing (never state a count over a growable set; never name a list item by its position); `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`following`, never `below`).

**Evidence.** The round-1 Luna checker's F-1 to F-3 (`units/l3/queue-r1-checker-luna.result.md`) and the unit's own observations (`reports/conform-queue-report.md`). Sites on the pre-landing tree, read 19:52 UTC; line numbers can have moved:

- `tests/src/core/stores/DatabaseQueueStore.test.ts:194`: "property access below compiles with NO `as`" — replace `below` with `following`.
- `tests/src/core/stores/MemoryQueueStore.test.ts:12`: "The cases cover the four-method" — delete `four-method` so the sentence reads "The cases cover the surface and its semantics." (read the whole sentence across its line break first).
- `tests/guides.test.ts:47`: "the second assertion below fails when a name" — replace with "the internal-name assertion fails when a name". This file is the guide-test drop-in the package owns after generation; the same header sentence in scaffold's template is scaffold's own row.
- `src/core/types.ts:106`: the doc sentence over `QueueContext` still reads "Represents the per-attempt execution handle a queue handler receives." (the round-1 objective lane's F-4) — rewrite as "Represents the per-attempt context a queue handler receives.", matching `guides/queue.md:75`.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/queue run <script>`, `npm --prefix /home/user/fleet/queue test`, `git -C /home/user/fleet/queue status --short`, `git -C /home/user/fleet/queue diff`, `node /home/user/scaffold/tmp/work/evidence.mjs queue`, `cd /home/user/fleet/queue && npx scaffold audit --offline`, and `grep -rn <pattern> /home/user/fleet/queue/tests`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/src/core/stores/DatabaseQueueStore.test.ts`, `tests/src/core/stores/MemoryQueueStore.test.ts`, `tests/guides.test.ts` (the one comment sentence).

**Off-limits.** Everything else. Never edit a vendored file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. Apply the three rewrites the Evidence names.
2. Sweep `\babove\b|\bbelow\b` and `\b(one|two|three|four|five|six|seven|eight|nine|ten)-?(method|member|step|case|stage|row)` case-insensitively over `tests/**/*.ts` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, and rule every remaining hit by sense.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs queue`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/queue-prose-report.md`: per site the line now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweeps read empty of banned senses in the Owned files.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
