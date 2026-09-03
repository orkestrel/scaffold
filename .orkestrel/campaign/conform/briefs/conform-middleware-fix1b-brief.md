# Unit conform-middleware fix round 1, part b — the red readings for middleware-obj-3

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/middleware`. Perform the assignment directly and spawn nothing.

## Objective

Take the failing-first readings row middleware-obj-3 owes (the first fix round's row middleware-fix1-1 could not plant them inside its scope), so that the unit's report carries a red reading for every behavioural row.

## Context

**What stands.** `conform-middleware-fix1-brief.md` ran at 15:22–15:35 UTC and closed its rows 2 to 5 and the obj-2 and obj-4 controls; it stopped on obj-3 because that row creates `tests/src/core/validators.test.ts`, `tests/src/server/parsers.test.ts`, and `tests/src/server/MultipartParser.test.ts`, whose subjects are `src/core/validators.ts` (`isMultipartBody`, `isSession`, `isSessionControl`), `src/server/parsers.ts` (`parseMultipartRequest`), and `src/server/MultipartParser.ts`, none of which that brief's Owned row named for a plant. Its result is at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/middleware-fix1-result.md`; read it.

**Standing condition.** `npm run check` and `npm test` redden on the tree as it stands at `tests/setup.ts:369`, `tests/src/core/factories.test.ts:167,170`, and `tests/src/core/stores/DatabaseSessionStore.test.ts:225` (`TableInterface<unknown>` not assignable to `TableInterface<SessionRow>`) and at runtime with `DatabaseError: Driver schema is invalid`. That is not this unit's defect: the closure re-staged at 15:22 UTC carries the landed `@orkestrel/contract` (whose `ContractShape` discriminant is `category`) beside the not-yet-landed `@orkestrel/database` (which still authors `type`), and database's own unit, running now, carries the consumer edit. Read those two reds as the standing condition, record them under § Deviations with the file:line and the message, and do not repair them. Every scoped project run that avoids the store fixtures reads green.

**Host.** POSIX shell; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/middleware run <script>`, `npx vitest run …` behind a leading `cd /home/user/fleet/middleware && ` with its output redirected into a file under `/home/user/work/evidence/middleware-proofs/`, `git -C /home/user/fleet/middleware status --short`, `git -C /home/user/fleet/middleware diff`, and `node /home/user/scaffold/tmp/work/evidence.mjs middleware`, one command per call, with no other chain, no `;` sequence, no `for` loop, no heredoc, and no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `src/core/validators.ts`, `src/server/parsers.ts`, `src/server/MultipartParser.ts` (temporary plants only; each file ends as it began, confirmed by `git diff` showing no hunk beyond the unit's own), `/home/user/work/evidence/middleware-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-middleware-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command. Undo a plant by editing the line back to its exact prior text.

## Rows

1. **obj-3, validators.** Plant one defect in `src/core/validators.ts` that `tests/src/core/validators.test.ts` claims to catch (invert one guard's refusal, recording the exact line before and after); run `cd /home/user/fleet/middleware && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/validators.test.ts > /home/user/work/evidence/middleware-proofs/obj-3-validators-control-red.txt 2>&1`, read it red; restore the line; run the same command into `obj-3-validators-green.txt`, read it green.
2. **obj-3, parsers.** The same for `src/server/parsers.ts` and `tests/src/server/parsers.test.ts` with `--project src:server`, into `obj-3-parsers-control-red.txt` and `obj-3-parsers-green.txt`.
3. **obj-3, MultipartParser.** The same for `src/server/MultipartParser.ts` and `tests/src/server/MultipartParser.test.ts` with `--project src:server`, into `obj-3-multipart-control-red.txt` and `obj-3-multipart-green.txt`.
4. **Record.** Add the three rows to the report's failing-first table with command, red count, green count, and files; add a line to § Fix round 1 stating that part b took obj-3's readings and naming the standing condition.

Where the project name differs from `src:core` or `src:server`, read `vite.config.ts` and use the project that includes the file; where a plant does not redden its suite, stop and report.

## Output

Return the three rows with their counts and files, the § Deviations line, and `git -C /home/user/fleet/middleware diff --stat` showing the three source files carry no hunk from this round. Then `node /home/user/scaffold/tmp/work/evidence.mjs middleware`.

## Acceptance criteria

1. Three red files and three green files exist with the counts recorded.
2. The three source files carry no hunk from this round.
3. The report's failing-first table carries obj-3's three rows and § Deviations names the standing condition.
