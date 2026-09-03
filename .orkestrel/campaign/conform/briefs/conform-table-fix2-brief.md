# Unit conform-table fix round 2 — the two guide sites the transformation dropped, and the record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 2's refutations of claims 2, 4, and 9 and its findings F1 and F2: the guide's Guards paragraph names the third `SCHEMA` message the constructor rethrows, the `SCHEMA` table row is scoped to stable reads, the new sentence claims no uniqueness, the tally in a test title is gone with the number-word sweep recorded, and the report states the row's current state with a regenerated diffstat, with the gate chain green.

## Context

**Law.** `.claude/rules/documentation.md` § Parity; `AGENTS.md` § Writing (no count over a growable set); `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (no superlative or uniqueness claim the reader cannot check).

**The unit so far.** `conform-table-brief.md` is the unit's brief (row table-subj-2 at its § Rows item 5 names three guide sites: `guides/table.md:224-230`, `:173-176`, `:1296-1298`), `conform-table-report.md` its report with a `## Fix round 1` section. Round 2: the Luna checker refuted claims 1 and 9 on the two untouched sites (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-r2-checker-luna.md`); the objective lane (Opus, from the Luna distillate) refuted claims 2, 4, and 9 and named F1, F2, R1, R2; read `/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r2.md` in full before editing.

**The Orchestrator's rulings.** R1: the Guards paragraph and the `SCHEMA` row were dropped, not struck — the fix-round-1 brief scoped Owned to lines 226-228 without a ruling on the other two sites; this round carries them. F2: the uniqueness claim entered through the fix brief's wording and is struck. R2 (whether `Table` should carry a read-count dependency on `column.meta`): a design brief for the next matrix, recorded in `ledgers/followons.md`; not this unit's.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save` (re-staged 16:21 UTC); never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/table run <script>`, `npm --prefix /home/user/fleet/table test`, `cd /home/user/fleet/table && npx vitest run …` with output captured under `/home/user/work/evidence/table-proofs/`, `git -C /home/user/fleet/table status --short`, `git -C /home/user/fleet/table diff`, `git -C /home/user/fleet/table diff --stat HEAD`, `node /home/user/scaffold/tmp/work/evidence.mjs table`, `cd /home/user/fleet/table && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. A note appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Scope

**Owned.** `guides/table.md` (lines 172-175, 226-230, and 1298 only), `tests/src/core/Table.test.ts` (the title at line 29 only), `tests/guides.test.ts` (only a presence guard quoting a changed guide line), `/home/user/work/evidence/table-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-table-report.md`.

**Off-limits.** Every other file, `src/**` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **The Guards paragraph.** At `guides/table.md:172-175`, after the sentence naming `The schema is not a table schema`, add: `` It also names `column "<key>" has metadata that cannot be owned` when the column's `meta` answers the guard's read and the clone's read differently, the message `cloneSchema` raises and the constructor rethrows unchanged. `` Read the paragraph first and fit the sentence to it.
2. **The `SCHEMA` row.** At `guides/table.md:1298`, replace `which the guard and the audit refuse first` with `which the guard and the audit refuse first for every schema whose reads are stable`.
3. **F2.** At `guides/table.md:228-230`, delete `is the one path that` so the clause reads `` a `meta` that answers the guard's read with ownable JSON and the clone's read with something no clone can own reaches it, and it refuses with `column "<key>" has metadata that cannot be owned` ``.
4. **F1.** At `tests/src/core/Table.test.ts:29`, rename the case `exposes exactly the seven interface member sets` to `exposes each interface member set exactly`. Then run the case-insensitive sweep `\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b` with the Grep tool over `src/**/*.ts` and `tests/**/*.ts` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, and record every hit with its ruling in the report's § Sweeps (an arity or an example magnitude stays; a tally over a growable set is a defect to fix under this row).
5. **The sweep row.** Record in § Sweeps the pattern `createTable never reaches it|which the guard and the audit refuse first` over `{src,tests,guides}/**/*.{ts,md}` plus `README.md`, read empty after rows 2 and 3.
6. **Presence guards.** Grep `tests/guides.test.ts` for any string quoting the three changed guide lines; where a guard quotes one, change the guard's string to the new text. Run `npm --prefix /home/user/fleet/table run test:guides > /home/user/work/evidence/table-proofs/table-subj-2c-guides.txt 2>&1` and read it green.
7. **The record.** In the report, relabel the deviation heading at line 103 as `## Deviation — row table-subj-2 as first attempted`; rewrite its "Done or not done" paragraph to state what stands: the fixture and the prescribed assertion are refuted, `src/core/Table.ts` is unchanged, and the row landed as § Fix round 1 and this round record; regenerate the § Files touched diffstat from `git -C /home/user/fleet/table diff --stat HEAD`; record R1's ruling (the two sites were dropped, now carried) and R2's carrier under `## Fix round 2`.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each (converging with `lint` then `format` only where a check reddens on an owned file), then `cd /home/user/fleet/table && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs table`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 2` section to the report naming each row and the line now at its site, the sweeps with their rulings, each gate command with its exit code, and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a quoted line is not at the line named or two lines either side, when a presence guard cannot be matched to its guide line, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The three guide sites carry the new text; `test:guides` reads green in `table-subj-2c-guides.txt`.
2. The test title carries no tally and the number-word sweep is recorded with a ruling per hit.
3. The report's deviation states the current state and the diffstat matches `git diff --stat HEAD`.
4. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0, and the audit prints its single zero-drift line.

## Review evidence

`/home/user/work/evidence/conform-table.diff` and `conform-table.status`; the report; the captures.
