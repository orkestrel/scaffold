# Unit conform-database fix round 3 — an example's missing import and a fence citation

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/database`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 checker's F1 (the `DriverIterator` TSDoc example uses `Row` without importing it) and F2 (the `auditDriver` transcription cites the fence's comment line where the call sits one line earlier), with the gate chain green. The checker's refutations of claims 7 and 9 rest on `configs/browsers.ts`, the Orchestrator's own `scaffold repair` refresh, and are ruled in the verdict file; F3 and F4 (`now`, `via`) carry to `briefs/followon/database-prose-brief.md`.

## Context

**Law.** `.claude/rules/documentation.md` § Guide examples (a published example imports through the published specifier and compiles as written); `.claude/rules/typescript.md` (TSDoc examples).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/database run <script>`, `npm --prefix /home/user/fleet/database test`, `git -C /home/user/fleet/database status --short`, `git -C /home/user/fleet/database diff`, `node /home/user/scaffold/tmp/work/evidence.mjs database`, `cd /home/user/fleet/database && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `src/core/DriverIterator.ts` (the `@example` block only), `tests/guides.test.ts` (the `auditDriver` transcription's citation only), `/home/user/scaffold/tmp/units/conform/conform-database-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **F1.** In the `@example` of `src/core/DriverIterator.ts` (around line 17-30), add `import type { Row } from '@orkestrel/database'` ahead of the value import so the example compiles as written; where `tests/guides.test.ts` or the guide transcribes that example, keep them aligned.
2. **F2.** At `tests/guides.test.ts:441`, cite `guides/database.md:1770-1771` (the `auditDriver` call and its `// []` value comment) and align the report's database-obj-6 cell to the same span.
3. **Record.** Append a `Fix round 3` lead under the report's `## Fix round 1` section naming rows 1 and 2 and the ruling that claims 7 and 9's refutations rest on the Orchestrator's `configs/browsers.ts` refresh.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/database && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs database`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Return the `Fix round 3` lead with each gate command and its exit code and the audit's summary line as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when the example's import cannot be added without changing its behaviour, or when a gate reddens.

## Acceptance criteria

1. The example imports `Row`; the transcription cites `:1770-1771`.
2. Every gate exits 0 and the audit prints its single zero-drift line.
