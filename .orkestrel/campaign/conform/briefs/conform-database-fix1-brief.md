# Unit conform-database fix round 1 — the three untranscribed fences, the report cell, and a helper name

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/database`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 1's refutation of claims 2 and 9 (database-obj-6's directive — transcribe each fence carrying a value comment — is met only to its minimum, and the report cell claims every fence), its finding F1 (a dangling proof pointer in the report), and its referral R1 (a test helper named for a format it does not carry), with the gate chain green.

## Context

**Law.** `.claude/rules/documentation.md` § Parity (execute the flagship fences; a substring check is a presence guard, never the proof); `.claude/rules/tests.md`; `.claude/rules/names.md` (a helper is named for what it does).

**The unit so far.** `conform-database-brief.md` with `conform-database-brief-addendum.md` is the unit's brief and `conform-database-report.md` its report. Round 1 (Grok-first): the Luna checker held claims 1, 3, 5, 7, 9 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/database-r1-checker-luna.md`); the objective lane (Opus, from the Luna distillate) held every claim but 2 and 9 and named F1 and R1 to R3; read `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/database-objective-r1.md` in full before editing. The existing transcriptions are the pattern to follow: `tests/guides.test.ts:355-537`, each naming its guide line beside the executed assertion.

**The Orchestrator's rulings.** R1: the helper at `tests/src/server/factories.test.ts:22` is renamed `databasePath` (it yields the SQLite database path; `tempDatabasePath` is format-neutral). R2: the `now` and `via` sites carry to `briefs/followon/database-prose-brief.md`. R3: `configs/browsers.ts` is the Orchestrator's post-exit repair; the report was true when written and the verdict file records it. The `configs/browsers.ts` stale row in the offline audit is settled at landing; report the audit's output as read and do not stop on it.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save` (re-staged 17:09 UTC); never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/database run <script>`, `npm --prefix /home/user/fleet/database test`, `cd /home/user/fleet/database && npx vitest run …` with output captured under `/home/user/work/evidence/database-proofs/`, `git -C /home/user/fleet/database status --short`, `git -C /home/user/fleet/database diff`, `node /home/user/scaffold/tmp/work/evidence.mjs database`, `cd /home/user/fleet/database && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. A note appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/src/server/factories.test.ts`, `/home/user/work/evidence/database-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-database-report.md`.

**Off-limits.** Every other file, `src/**` and `guides/**` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command. Never use a mock, spy, fake, or fake clock.

## Rows

1. **The three fences.** In `tests/guides.test.ts`'s `flagship fences` blocks, add one executed transcription for each of `guides/database.md:1548` (`planMigration(deployed, declared)` with its `{ from: 0, to: 1, steps: [...] }` value comment — assert the fields the comment names and the steps' shape), `:1771` (`// [] — a fully conformant driver` — assert the empty array), and `:1472-1473` (`boundary.accepting // true`, then `await boundary.track(async () => 42) // 42`), each naming its guide line beside the assertion as the existing cases do, host-independent, in the `guides` project, with a presence guard over the fence line where the existing cases carry one. Prove each: before adding, run `cd /home/user/fleet/database && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/database-proofs/fix1-fences-before.txt 2>&1` and read the count; after adding, the same into `fix1-fences-after.txt` read green with three more cases; then plant one wrong value comment in a copy of the fence expectation inside the test (never in the guide) to read one case red into `fix1-fences-control-red.txt`, restore it, and read green again.
2. **Claim 9, the cell.** In the report's disposition table, restate database-obj-6's note as the fences transcribed (name the guide lines) and the remaining exclusions with their reason (the `conditionToRange` / `selectPlan` claims at `guides/database.md:2376` and `:2383`, and the browser fences), the way `conform-database-report.md:200` names the browser one.
3. **F1.** At `conform-database-report.md:10`, replace the "see § Behavioural proofs" pointer for database-subj-2 with `tests/src/core/Table.test.ts:953` (the case constructing the database with `error: errors.handler` at `:958`), or add that row to § Behavioural proofs with the same pointer.
4. **R1.** In `tests/src/server/factories.test.ts`, rename `jsonPath` (declared at `:22`, used at `:79`) to `databasePath`; run `cd /home/user/fleet/database && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts > /home/user/work/evidence/database-proofs/fix1-factories.txt 2>&1` and read it green.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each (converging with `lint` then `format` only where a check reddens on an owned file), then `cd /home/user/fleet/database && npx scaffold audit --offline` (report its output as read), then `node /home/user/scaffold/tmp/work/evidence.mjs database`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 1` section to the report naming each row and what closed it, the three runs with their counts and files, each gate command with its exit code, and the audit's output as read. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a fence's value cannot be asserted host-independently, when the control does not read red, or when a gate other than the audit reddens on something the rows did not touch.

## Acceptance criteria

1. Three new cases read green in `fix1-fences-after.txt`, one read red in `fix1-fences-control-red.txt`.
2. The report cell names the transcribed fences and the exclusions; the database-subj-2 pointer resolves.
3. `factories.test.ts` carries `databasePath` and no `jsonPath`.
4. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0.

## Review evidence

`/home/user/work/evidence/conform-database.diff` and `conform-database.status`; the report; the captures.
