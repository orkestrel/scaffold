# Unit conform-table fix round 4 — two directional references in shipped guide prose

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 4's F5: the unit's tally-deletion rewrite introduced `below` at `guides/table.md:1172-1173`, and the rewrapped line at `:1218` carries `above` in the same banned sense; both read as `.claude/rules/writing.md` § Code tokens, references, and links fixes, with `format:check` and `test:guides` green. Round 4 held every claim (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r4.md`; read F5 before editing). The Orchestrator rules the rewrapped line owned: one vocabulary in one file.

## Context

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/table run <script>`, `npm --prefix /home/user/fleet/table test`, `npx oxfmt --config .oxfmtrc.json guides/table.md` (behind `cd /home/user/fleet/table && `, to converge a format failure), `git -C /home/user/fleet/table status --short`, `git -C /home/user/fleet/table diff`, `node /home/user/scaffold/tmp/work/evidence.mjs table`, `cd /home/user/fleet/table && npx scaffold audit --offline`, one command per call, output captured only under `/home/user/work/evidence/table-proofs/`, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/table.md` (lines 1172-1173 and 1218 only), `tests/guides.test.ts` (only a presence guard quoting a changed line), `/home/user/scaffold/tmp/units/conform/conform-table-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. `guides/table.md:1172-1173`: "It reports the domain faults listed below and every budget breach above." becomes "It reports the domain faults listed following and every budget breach stated earlier."
2. `guides/table.md:1218`: "the `## Surface` rows above" becomes "the `## Surface` rows stated earlier".
3. Grep `tests/guides.test.ts` for either old sentence; where a presence guard quotes one, change the guard's string. Run `npm --prefix /home/user/fleet/table run test:guides > /home/user/work/evidence/table-proofs/table-fix4-guides.txt 2>&1` and read it green.
4. Record a `\b(above|below)\b` sweep (case-insensitive) over `guides/table.md`, `README.md`, `src/**`, and `tests/**` (excluding `node_modules` and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) in the report's § Sweeps, ruling every remaining hit by sense (an architectural or a magnitude sense stays; a document reference is a defect to fix under this row where it sits in an Owned line, and a finding to record where it sits outside Owned).

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/table && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs table`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 4` section to the report naming each row and the line now at its site, the sweep with its rulings, each gate command with its exit code, and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not within two lines of the line named, or when a gate reddens.

## Acceptance criteria

1. The two lines carry the replacements; `test:guides` reads green in `table-fix4-guides.txt`.
2. The sweep is recorded with a ruling per hit.
3. Every gate exits 0 and the audit prints its single zero-drift line.
