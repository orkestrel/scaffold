# Unit table-prose — the directional references outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of table, from the landed tip.

## Objective

Close the `above` and `below` document references fix round 4's sweep recorded outside its owned lines, so `guides/table.md` and the source comment in `tests/guides.test.ts` read as `.claude/rules/writing.md` § Code tokens, references, and links fixes, with the guide parity test and the gate chain green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding`, `following`, `earlier`, `later`; never `above` or `below`).

**Evidence.** The fix-round-4 sweep in `reports/conform-table-report.md` § Fix round 4 (`units/l2b/table-fix4-result.md`): `guides/table.md:56`, `:106`, `:195`, `:227`, `:488`, `:1495`, and `tests/guides.test.ts:233`; the permitted hits at `README.md:77` and `tests/src/core/tables/PaginationManager.test.ts:39` stay.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/table run <script>`, `npm --prefix /home/user/fleet/table test`, `cd /home/user/fleet/table && npx oxfmt --config .oxfmtrc.json guides/table.md` (to converge a format failure), `git -C /home/user/fleet/table status --short`, `git -C /home/user/fleet/table diff`, `node /home/user/scaffold/tmp/work/evidence.mjs table`, `cd /home/user/fleet/table && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/table.md`, `tests/guides.test.ts` (the comment at line 233 and any presence guard quoting a sentence this unit changes).

**Off-limits.** Everything else.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. Rewrite each of the seven sites with the rule's form fitted to its sentence ("Everything in this guide is exported", "the readonly state in the `## Surface` rows", "the core's hostile-reflection boundary described later", "the line every refusal described later is measured against", "the preceding worked examples executed", "Each following test transcribes"), reading each line first; the line numbers are from the landed tip and can have moved. Where a presence guard in `tests/guides.test.ts` quotes a changed sentence, change the guard's string.
2. Record the case-insensitive sweep `\b(above|below)\b` over `guides/table.md`, `README.md`, `src/**`, and `tests/**` (excluding `node_modules` and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), ruling every remaining hit by sense.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs table`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/table-prose-report.md`: per site the line now, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep reads empty of document-reference senses in the Owned files.
2. `test:guides` exits 0 with every presence guard matching.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
