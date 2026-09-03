# Unit conform-sea fix round 2 — the sea-subj-7 control row, the status claim, the sweeps pointer

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-sea-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/sea`.

## Objective

Close the round-2 objective lane's refutation of claim 4 and its findings F1 and F2 (`units/l3/sea-objective-r2.md`), all on the record: the sea-subj-7 control row names the scoped command and the counts its own capture files carry; the opening status claim and § Shared-file patches record the Orchestrator's `package.json` hunks; the fix-round pointer names the section that carries its sweeps.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing (no count in authored prose; a runner tally reported with its run is a measurement); `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links.

**The lane's readings, 19:4x UTC.** Line numbers can have moved; read each site before changing it.

- `report.md:76`, the sea-subj-7 row of § Failing-first controls, records `npm run test:src`, "not run red", and `186 passed (186)`. The captures read otherwise: `/home/user/work/evidence/sea-proofs/sea-subj-7-red.txt:8,24,42` reddens the destroyed-state cases with the guard planted out, `2 failed | 17 passed (19)`, and `sea-subj-7-green.txt:7` reads `19 passed (19)`, from the scoped command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/seas/SEA.test.ts`. The fix-round section at `report.md:211-220` states the true counts without naming a command.
- `report.md:3-4` states that `git status --short` lists only files under Owned, while `/home/user/work/evidence/conform-sea.status:4` lists `package.json`. That entry is the Orchestrator's hunks of 18:56 UTC — the `"seal"` keyword removed and `engines.node` raised to `>=24.8.0` — with `README.md:106` the same Orchestrator row (sea-subj-19).
- § Shared-file patches (`report.md:152-169`) returns the `"seal"` keyword deletion as outstanding; the tree already carries it, applied by the Orchestrator.
- `report.md:221` reads "Recorded under the amended § Sweeps", while § Sweeps (`report.md:85-104`) is unchanged and the fix round's sweeps sit in `### Sweeps (fix round 1)` at `report.md:228-238`.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `cat /home/user/work/evidence/sea-proofs/sea-subj-7-red.txt`, `cat /home/user/work/evidence/sea-proofs/sea-subj-7-green.txt`, and `cat /home/user/work/evidence/conform-sea.status`, one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-sea-report.md`.

**Off-limits.** Everything else.

## Rows

1. Rewrite the sea-subj-7 row so its command cell reads the scoped `npx vitest run` command named in the Context, its red cell `2 failed, 17 passed (19)` with the guard planted out of `src/server/seas/SEA.ts`, its green cell `19 passed (19)` with the guard restored, and its files cell `sea-subj-7-red.txt`, `sea-subj-7-green.txt`. Read both captures first and take the counts from them.
2. Rewrite `report.md:3-4` so it states that `git status --short` lists the unit's Owned paths plus `package.json`, which carries the Orchestrator's hunks of 18:56 UTC (the `"seal"` keyword removed for sea-subj-2, `engines.node` raised to `>=24.8.0` for sea-subj-19), with `README.md` the same row's carrier.
3. Rewrite the § Shared-file patches paragraph so it records that the keyword deletion was applied by the Orchestrator at 18:56 UTC in the same edit as sea-subj-19, and keep the diff block as the record of what was applied.
4. Rewrite the `report.md:221` sentence as "Recorded under § Sweeps (fix round 1)."
5. Append a `## Fix round 2` section naming the rows rewritten and the capture files read.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. The sea-subj-7 row's command and counts match `sea-subj-7-red.txt` and `sea-subj-7-green.txt`.
2. The opening status claim and § Shared-file patches agree with `conform-sea.status`.
3. The report's authored prose states no count; no file under `/home/user/fleet` changed.
