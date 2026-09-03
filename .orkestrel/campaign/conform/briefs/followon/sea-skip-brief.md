# Unit sea-skip — the integration proof skips only on the host binary's applicability limit

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/sea`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of sea (`0c4a239`), from the landed tip.

## Objective

`tests/integration.test.ts`'s stage-hooks proof skips only when the running Node binary leaves no room for the injection, and a defect the injector reports under `INJECT` fails the proof. The applicability limit becomes its own `SEAErrorCode` member, raised at the two sites that measure it, documented in the guide, and proved from the injector's own tests, with the gate chain green.

## Context

**Law.** `AGENTS.md` (types first; real domain states only; absence is `undefined`; no compatibility shim); `/home/user/scaffold/.claude/rules/patterns.md` § Errors and the error-code conventions the package already follows in `src/server/types.ts` and `src/server/errors.ts`; `/home/user/scaffold/.claude/rules/tests.md` (a skip names a platform mechanism, never a class of failure); `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/writing.md`.

**The finding.** The round-1 and round-2 objective lanes' R2 (`units/l3/sea-objective-r1.md`, `units/l3/sea-objective-r2.md`): the proof at `tests/integration.test.ts:203-206` (landed tip) reads `if (isSEAError(error) && error.code === 'INJECT') { context.skip(); return }`, and its comment at `:166-170` names the intent — a PE whose header has less slack than one section entry needs, or a Mach-O whose first section sits too close to its load-command table — while `INJECT` is also the code of every defect report the injector raises (`src/server/injectors/Injector.ts:847`, `:1026`, `:1229` `#verifyELFNoteMapping`, `:1325`, `:1332`, `:1402`, `:1465`, `:1636` `#verifyMachOSection`). A defect in the injector therefore reads as a skip.

**The two applicability sites** (landed tip; line numbers can have moved): `Injector.ts:280-290`, "No room in PE header for a new section entry", context `{ executable, availableHeaderSpace, requiredHeaderSpace }`; `Injector.ts:1375-1385`, "Not enough header space for new Mach-O load command", context `{ executable, firstSectionOffset, requiredOffset }`. Both measure the host binary's layout before any write.

**Design.** Add one member to `SEAErrorCode` for the applicability limit — `ROOM` unless the doc list at `src/server/types.ts:340-370` makes another single word the obvious fit; record the choice — with its doc line beside `INJECT`'s, raise it at the two sites, and narrow the proof's skip to that code. The option of keying the skip on context fields is refused: a consumer deciding whether to retry on another host needs the same distinction, and a code is the contract for it. Widening the published union is a breaking change for an exhaustive switch; sweep `SEAErrorCode` and `'INJECT'` over every fleet checkout's `src`, `app`, and `tests` (`/home/user/fleet/*/{src,app,tests}`, excluding `node_modules`) and record every consumer under § Breaking.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/sea run <script>`, `npm --prefix /home/user/fleet/sea test`, `cd /home/user/fleet/sea && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>`, `cd /home/user/fleet/sea && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/sea status --short`, `git -C /home/user/fleet/sea diff`, `node /home/user/scaffold/tmp/work/evidence.mjs sea`, `cd /home/user/fleet/sea && npx scaffold audit --offline`, and `grep -rn <pattern> /home/user/fleet --include=*.ts --exclude-dir=node_modules`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `src/server/types.ts` (the union and its doc list), `src/server/injectors/Injector.ts` (the two raise sites), `guides/sea.md` (the code's row in the error-code table and any Failures row that names the limit), `tests/integration.test.ts`, `tests/src/server/injectors/**`, `tests/setupServer.ts` where the injector proofs' fixtures live, `tests/guides.test.ts` where a guide sentence it transcribes changes.

**Off-limits.** Everything else, `package.json` included. Never edit a vendored file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. **Types.** Add the member and its doc line to `SEAErrorCode`; run `npm --prefix /home/user/fleet/sea run check` and record that the two raise sites still typecheck (a string literal union widens without error) before changing them.
2. **Raise sites.** Change the code at the two applicability sites and nowhere else. Keep the messages and context.
3. **Proof of the raise.** From the injector's existing fixtures under `tests/setupServer.ts` and `tests/src/server/injectors/**`, build a PE fixture whose header slack is smaller than `PE_SECTION_HEADER_SIZE` and a Mach-O fixture whose first section sits inside the room a new load command needs, and assert each raises the new code with its context. Write the assertion first against `INJECT` and read it red, then apply row 2 and read it green; capture both readings under `/home/user/work/evidence/sea-skip-proofs/`.
4. **The skip.** Narrow `tests/integration.test.ts`'s condition to the new code and rewrite the comment so it names the code. Plant a defect once — make `#verifyELFNoteMapping` throw unconditionally on a copy of the condition — run the integration project, read the proof red rather than skipped, and restore by editing; capture the reading.
5. **Guide.** Add the code's row and, where the guide's Failures or Behavior tables describe the room limit, name the code there; run `npm --prefix /home/user/fleet/sea run test:guides`.
6. **Breaking.** Record the union widening and the consumer sweep's result.
7. **Sweeps.** Record `'INJECT'` over `tests/integration.test.ts` (empty), the new code over `src` and `tests` (the two raise sites, the proofs, and the skip), and the writing sweep of `.claude/rules/writing.md` § Substitutions over every line you added.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs sea`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/sea-skip-report.md`: the code chosen and why, per row the sites changed with the line now, the red and green readings with their commands and capture files, the consumer sweep, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the existing fixtures cannot produce a binary that hits an applicability site without a new fixture generator outside Owned, when a fleet consumer switches exhaustively on `SEAErrorCode`, or when a gate reddens on something the rows did not touch. The code's name is yours to settle and record.

## Acceptance criteria

1. `SEAErrorCode` carries the member; the two applicability sites raise it; no other site does.
2. The integration proof's condition names the new code and no other; the planted defect reads as a failure, captured.
3. Both applicability proofs read red before row 2 and green after, captured.
4. `test:guides` exits 0; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
