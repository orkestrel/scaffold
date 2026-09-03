# Unit conform-database fix round 2 — the exclusion citations, an inert transcription named, and a ruling recorded

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/database`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 2's refutation of claim 9 (the database-obj-6 cell attributes `conditionToRange` to a `selectPlan` line), its F3 (the boundary transcription is a type-conformance transcription and is not marked as one), and record the Orchestrator's ruling on F2, with the gate chain green. Round 2 held every other claim (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/database-objective-r2.md`; read claim 9, F2, F3, and R3 before editing).

## Context

**The Orchestrator's rulings.** F2: `databasePath` keeps its noun form, sanctioned by the `tempDatabasePath` precedent it wraps (`.claude/rules/names.md` admits the form where the module already carries it); record the ruling in the report. R3: the report's two audit readings (`1 of 45` at the unit's exit, `0 of 45` after the Orchestrator's `scaffold repair`) are consistent and stay as written, with one sentence naming the repair between them.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/database run <script>`, `npm --prefix /home/user/fleet/database test`, `git -C /home/user/fleet/database status --short`, `git -C /home/user/fleet/database diff`, `node /home/user/scaffold/tmp/work/evidence.mjs database`, `cd /home/user/fleet/database && npx scaffold audit --offline`, one command per call, output captured only under `/home/user/work/evidence/database-proofs/`, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/guides.test.ts` (one comment line ahead of the boundary case near line 446 only), `/home/user/scaffold/tmp/units/conform/conform-database-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **Claim 9.** In the report's database-obj-6 cell (line 24), replace the exclusion clause so it reads: `` Excluded, with reason: `guides/database.md:2372` (`conditionToRange`), `:2376` and `:2383` (`selectPlan`) `` — read the three guide lines first and write what they carry.
2. **F3.** Ahead of the boundary case in `tests/guides.test.ts` (around line 446, the case transcribing `guides/database.md:1465-1473`), add one comment stating that the case is a type-conformance transcription of a caller-supplied literal, which the fence's compile proves, and not behavioural cover of an implementor; name `tests/src/core/DatabaseContext.test.ts` and `tests/src/core/TransactionScope.test.ts` as the suites that drive real implementors.
3. **F2 and R3, the record.** Under the report's `## Fix round 1` section, add a `Fix round 2` lead recording rows 1 and 2, the F2 ruling quoted from § Context, and one sentence between the two audit readings naming the Orchestrator's `scaffold repair` of `configs/browsers.ts` as what moved the count.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/database && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs database`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Return the `Fix round 2` lead with each gate command and its exit code and the audit's summary line as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted line is not within two lines of the line named, or when a gate reddens.

## Acceptance criteria

1. The cell names `:2372` for `conditionToRange` and `:2376`, `:2383` for `selectPlan`.
2. The comment sits ahead of the boundary case and names the two suites.
3. Every gate exits 0 and the audit prints its single zero-drift line.
