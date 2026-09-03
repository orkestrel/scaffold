# Unit conform-table fix round 3 — the sweep record, the anchored assertion, and the report's citations

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 3's refutation of claim 4 (the report's fix-round-2 sweep record states a hit that does not exist and sits outside § Sweeps), its F3 (the guide's "rethrows unchanged" claim is pinned only by a substring assertion), and its F4 (stale citations in the report), with the gate chain green. Round 3 held every other claim (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r3.md`; read claim 4, F3, F4, and R-A in full before editing).

## Context

**Law.** `.claude/rules/documentation.md` § Parity (the executed assertion that breaks when the prose claim goes false); `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`earlier`, never `below`).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/table run <script>`, `npm --prefix /home/user/fleet/table test`, `git -C /home/user/fleet/table status --short`, `git -C /home/user/fleet/table diff`, `node /home/user/scaffold/tmp/work/evidence.mjs table`, `cd /home/user/fleet/table && npx scaffold audit --offline`, one command per call, output captured only under `/home/user/work/evidence/table-proofs/`, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/src/core/Table.test.ts` (the assertion at line 114 only), `/home/user/work/evidence/table-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-table-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **Claim 4, the sweep record.** In the report's `## Fix round 2` section (around lines 310-317), delete the statement that the pattern matches `guides/table.md:226`; the phrase `createTable never reaches it` exists on no single line of the checkout. Add a § Sweeps row (after line 84) recording, each re-run with the Grep tool over `{src,tests,guides}/**/*.{ts,md}` plus `README.md` and excluding `node_modules`: `is the one path that` (expect no hit); `refuse first\.` (expect no hit); the alternation `createTable never reaches it|which the guard and the audit refuse first` with its actual hits (expect only `guides/table.md:1301`, ruled the row-2 result); and the number-word sweep's hits other than `one` by `file:line` with each ruled an arity or an example magnitude (the round-3 lane read `src/core/types.ts:277`, `:393`, `:855`, `src/core/helpers.ts:128`, `:132`, `:173`, `tests/guides.test.ts:708`, `tests/src/core/helpers.test.ts:243`; write what you read).
2. **F3, the anchored assertion.** At `tests/src/core/Table.test.ts:114`, change `toThrow('column "id" has metadata that cannot be owned')` to `toThrow(/^column "id" has metadata that cannot be owned$/)`, so a wrapping prefix such as the one at `src/core/Table.ts:68` would fail it. Run `npm --prefix /home/user/fleet/table run test:src > /home/user/work/evidence/table-proofs/table-fix3-test-src.txt 2>&1` and read it green.
3. **F4, the citations.** At report line 18, cite `guides/table.md:229-233` for the scoped sentence and name the two sites fix round 2 added (`:175-178`, `:1301`); at line 162, replace "per the evidence below" with "per the evidence recorded earlier in this section"; at line 33 add the title rename at `tests/src/core/Table.test.ts:29`; at line 37 add the Guards-paragraph sentence and the scoped `SCHEMA` row. Read each line first; they can have moved.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/table && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs table`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 3` section to the report naming each row and what closed it, the sweep results as read, each gate command with its exit code, and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted line is not within two lines of the line named, or when a gate reddens.

## Acceptance criteria

1. § Sweeps carries the row with results as read; no fabricated hit remains in the report.
2. The assertion is anchored and `test:src` reads green in `table-fix3-test-src.txt`.
3. The report's citations name the lines the tree carries.
4. Every gate exits 0 and the audit prints its single zero-drift line.
