# Unit sea-skip fix round 1 — every host layout the injector cannot write into reports `ROOM`

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/sea`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutation of claim 2 and its findings F1 and F2 (`units/followon/sea-skip-objective-r1.md`): the two Mach-O `__LINKEDIT` layout limits report `ROOM`, the code's doc line and the guide paragraph state what `ROOM` covers and what `INJECT` keeps, each new raise site has a red-then-green proof, and the Mach-O fixture's `tightHeaders` key becomes `tight`.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` (real domain states only; boolean behaviour; single-word option keys; types first); `/home/user/scaffold/.claude/rules/patterns.md` § Options; `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/writing.md`.

**The ruling on R1.** `ROOM` names the one state a caller branches on: the host binary's layout refuses the injection before any byte moves, so the build is retried on another host rather than filed as a defect. That state includes a Mach-O with no `__LINKEDIT` segment (`src/server/injectors/Injector.ts:1332`) and a `__LINKEDIT` segment carrying sections (`:1402`), both read from the host's load commands before the mutation loop. Both raise `ROOM`. The doc line at `src/server/types.ts:353` widens to name the layout limit rather than the room alone — for example `` `ROOM`     — host binary layout the injector cannot write into: no room for the entry, or a `__LINKEDIT` layout it does not support. `` — keeping the em-dash column its siblings use. `INJECT` keeps the defect reports (`:1228`, `:1465`, `:1636`), the `overwrite`-gated "already exists" refusals (`:1026`, `:1325`), and the malformed resource directory (`:847`).

**F1, the guide.** `guides/sea.md:36`'s trailing clause ("so you can retry a `ROOM` build on another host and read an `INJECT` code as a defect") overclaims while `:1332` and `:1402` report `INJECT`. After the raise sites change, rewrite the paragraph so it names the four layouts `ROOM` covers (the PE header slack, the Mach-O load-command room, the missing `__LINKEDIT`, the sectioned `__LINKEDIT`), states that the measurements ride in `context` where the injector takes one, and states what `INJECT` keeps: a defect the injector reports after writing, an `overwrite` refusal, and a malformed resource directory. Claim only what the proofs execute.

**Proofs.** `tests/src/server/injectors/Injector.test.ts` carries no case for `:1332` or `:1402`. `tests/setupServer.ts`'s `buildMachoFixture` (`MachoFixtureOptions` at `:713`) builds the Mach-O fixture; give it what the two cases need under single-word keys that name the fact (a boolean for whether the `__LINKEDIT` segment is emitted; a number for the sections the `__LINKEDIT` command declares), read `tests/setupServer.test.ts` for the fixture's own proofs and extend them for the new options. Each new case asserts `ROOM` and reads red against `INJECT` before row 2 and green after; capture both readings under `/home/user/work/evidence/sea-skip-proofs/fix1-*.txt`.

**F2, the key.** `MachoFixtureOptions.tightHeaders` (`tests/setupServer.ts:713`, read at `:723`, used at `tests/src/server/injectors/Injector.test.ts:301` and `tests/setupServer.test.ts:354`) becomes `tight`, matching the PE fixture's key; sweep `tightHeaders` over `src`, `tests`, and `guides` afterwards (empty).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/sea run <script>`, `npm --prefix /home/user/fleet/sea test`, `cd /home/user/fleet/sea && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>`, `cd /home/user/fleet/sea && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/sea status --short`, `git -C /home/user/fleet/sea diff`, `node /home/user/scaffold/tmp/work/evidence.mjs sea`, `cd /home/user/fleet/sea && npx scaffold audit --offline`, and `grep -rn <pattern> /home/user/fleet/sea/src /home/user/fleet/sea/tests /home/user/fleet/sea/guides`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`; capture a runner with `> /home/user/work/evidence/sea-skip-proofs/<name>.txt 2>&1`.

**Standing condition.** The tree carries the sea-skip unit's uncommitted edits; leave every edit outside the Sites as it is.

## Scope

**Owned.** `src/server/types.ts` (the doc line), `src/server/injectors/Injector.ts` (the two raise sites), `guides/sea.md` (the `ROOM` paragraph), `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/server/injectors/Injector.test.ts`, `tests/integration.test.ts` (its comment, where the widened coverage changes what it states), `/home/user/scaffold/tmp/units/followon/sea-skip-report.md`.

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **Types.** The doc line.
2. **Raise sites.** `:1332` and `:1402` raise `ROOM`; messages and context unchanged.
3. **Proofs.** The fixture options, their own proofs, and the two `ROOM` cases, red before row 2 and green after, captured.
4. **Guide.** The paragraph; `test:guides` green.
5. **F2.** The key rename and its sweep.
6. **Report.** Append a `## Fix round 1` section: each finding, the edit that closes it, the captures with their commands, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order (row 3's red reading before row 2); then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs sea`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the fixture cannot produce a Mach-O reaching `:1332` or `:1402` without a builder change outside Owned, or when a gate reddens on something the rows did not touch. The fixture option names are yours to settle under the naming law and record.

## Acceptance criteria

1. `grep -n "'INJECT'" src/server/injectors/Injector.ts` lists only `:847`, `:1026`, `:1228`, `:1325`, `:1465`, `:1636` (line numbers as they stand after the edits); `\bROOM\b` lists the four raise sites, the type and doc line, the proofs, the skip and its comment, and the guide paragraph.
2. The two new cases are captured red and green; `tightHeaders` sweeps empty.
3. `test:guides` exits 0; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
