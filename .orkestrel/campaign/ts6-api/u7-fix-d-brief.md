# Unit brief — U7-fix-d: the round-2 findings and the expiry budget (probe)

Follows `u7-fix-c-brief.md`. Carries the U7 round-2 findings (`u7-fix-audit-subjective.md` F1 to F8; `u7-fix-audit-objective.md` F1, F2, F5) and the verifier's red row (`u7-fix-verify-report.md` § 6, twice green alone: `u7-probe-solo.log.txt`, `u7-fix-probe-solo.log.txt`). Every edit is a lane's prescription or the Orchestrator's ruling on one, fully specified.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/fleet/probe` for the life of this unit.

## Objective

Close every substantiated finding of the U7 round-2 audit: the two sentences that still state the superseded classification rule, the ragged and overrun lines, the skip's form, the overlay remarks, the digest's ordering on the direct entry point, the untested drafted-`.json` and no-diagnostic branches, the fixture label, and the expiry case's budget.

## Context

- Read first: `/home/user/scaffold/AGENTS.md` (the same contract governs probe; probe's checkout carries no `.claude/rules/` directory, so read the rules at `/home/user/scaffold/.claude/rules/`: `tests.md`, `typescript.md`, `writing.md`, `names.md`), then `src/server/stages/TypeStage.ts` in full.
- The tree is dirty with U7 and fixes a, b, c, uncommitted; commit nothing.
- Host: Linux, Node 22.22.2, `typescript` 6.0.3 in the workspace. Scoped test command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`; give `TypeStage.test.ts` and `Probe.test.ts` a 600000 ms timeout in the foreground. Run no whole-suite gate.
- `TypeStage.#drafts` holds workspace-relative paths; `#place` returns that spelling; `#inspect` computes the project groups before it places anything.
- The fixture helper `createScratch` (used throughout `TypeStage.test.ts`) writes files and links `node_modules`; the cases `separates a malformed project from a candidate type error by the diagnostic, not the exit` and `refuses every inspection while a declared project is malformed` are the shapes to copy.

## Scope

Owned: `src/server/stages/TypeStage.ts`, `src/server/stages/RuntimeStage.ts` (the comment at about lines 699 to 705 only), `src/server/types.ts` (the `OverlayInterface` remarks only), `src/core/types.ts` (the `ProbeInterface.destroy` `@returns` line only), `guides/probe.md` (the sentences edits 1, 5, 6, and 7 name only), `tests/src/server/stages/TypeStage.test.ts`, `tests/src/server/helpers.test.ts` (one case name, edit 12), `tests/src/server/Probe.test.ts` (edit 13 only).

Off-limits: every other file and line, in particular `package.json`, `package-lock.json`, every vendored file, `src/server/helpers.ts`, `src/server/parsers.ts`, and `tmp/` beyond `tmp/units/`.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`.

## Edits

1. **The superseded rule, two sentences.** `guides/probe.md` (about line 261, the `TypeStageInterface` method table's `inspect` row): "A diagnostic naming a project file, and one naming no file at all, raises a `workspace` / `malformed` failure." gains the exception: "…, unless the `.json` file is one the claim itself drafted." `src/server/stages/TypeStage.ts` class TSDoc (about lines 65 to 68): the sentence "A diagnostic naming a project file, and one naming no file at all, is the target tree's own configuration fault and raises rather than reporting" gains the same exception in the same words.
2. **`destroy`'s `@returns`.** `src/core/types.ts` (about line 478): "@returns A promise that settles when every engine has released its resources" becomes "@returns A promise that settles after every stage has released its resources".
3. **Ragged and overrun lines.** Re-wrap `src/server/types.ts` about lines 135 to 137 (the `OverlayInterface` remarks paragraph) to the file's width; re-wrap `src/server/stages/RuntimeStage.ts` about lines 699 to 705 (the comment that grew when `#walk` became `collectWorkspaceFiles`) to the block's width. Edit 7 rewrites the overlay remarks first; wrap after.
4. **The skip's form.** `tests/src/server/stages/TypeStage.test.ts`: `it.skipIf(!LINKS)` becomes `it.runIf(LINKS)`, matching the suite's `it.runIf(DIRECTORY_LINKS)` in `RuntimeStage.test.ts`; `LINKS` and its comment are unchanged.
5. **A guide bullet over the wrap.** `guides/probe.md` about line 1004: re-wrap the bullet from "warm it started" to its end at 100 columns.
6. **The dangling digest sentence.** `guides/probe.md` about lines 707 to 709: split the sentence so the canonicalization is its own sentence: "… read against the mirrored copy of the project with the mirror as the current directory, so the digest and the check read one set of files. `computeDigest` canonicalizes the record: …" (keep the paragraph's remaining words).
7. **The overlay's readers.** `src/server/types.ts` `OverlayInterface` remarks (about lines 132 to 134): replace the sentence naming "the lint stage's document protocol and the runtime stage's module resolver" with: "The runtime stage's module resolver reads one candidate set through its adapter and is the stage that holds an overlay; the type stage writes each draft into its mirror and the lint stage opens each draft as a document, so neither holds one." Keep the rest of the remarks.
8. **The digest's ordering on the direct entry point.** In `TypeStage.#inspect`, resolve every selected project's configuration before any draft is placed: after the groups are computed and before `#refresh` and the `#place` calls, `for (const selected of groups.keys()) await this.#configure(selected)` (with `this.#refuseDestroyed()` after the loop, matching the method's pattern). Update the `#inspect` comment to say the configuration is read before the drafts land so a claim drafting its own project file cannot move the digest, which is the invariant `src/server/types.ts` (about lines 257 to 258) and `src/core/types.ts` (about lines 261 to 263) state. Pin it with a `TypeStage.test.ts` case: a scratch workspace holding `projects/tsconfig.extra.json` (`{"compilerOptions":{"strict":true}}`); one stage resolves that project and records digest A; a second, fresh stage inspects a claim naming that project whose drafts include `projects/tsconfig.extra.json` with `strict` set to `false` and a source file the project includes, then resolves the project; assert the second stage's digest equals A. Name the case for what it proves.
9. **The drafted-`.json` branch, pinned.** Add a `TypeStage.test.ts` case over a scratch workspace whose `tsconfig.json` sets `resolveJsonModule: true` beside the fixture's usual strict options: the claim drafts `src/settings.json` with malformed text (`{ "name": \n`) and `src/reader.ts` (`export const READING = 1\n`), naming `tsconfig.json`; assert the inspection returns (does not throw) and its issues carry one `claimant` issue whose `path` is `src/settings.json`. If the compiler reports the malformed JSON with no location, stop and report the exact stdout under Deviation.
10. **The no-diagnostic branch, pinned.** Add a `TypeStage.test.ts` case over a scratch workspace whose `node_modules/typescript` is a protocol-faithful stub written by the test (no link to the real `node_modules`): `package.json` `{"name":"typescript","version":"6.0.3","bin":{"tsc":"bin/tsc"}}` and `bin/tsc` a Node script that prints `{"compilerOptions":{"strict":true},"files":[]}` and exits 0 when its arguments include `--showConfig`, and otherwise prints nothing and exits with code 3. Assert that `inspect` over a trivial draft rejects with a `ProbeError` carrying `origin: 'instrument'`, `code: 'malformed'`, and the message `The compiler reported no diagnostic and exited 3`. Add a sibling case whose stub instead ends itself with `process.kill(process.pid, 'SIGTERM')` on the check run, asserting the message `The compiler reported no diagnostic and was ended by a signal`. Where `resolveWorkspaceBinary` or the stage refuses the stub for a reason the brief did not name, stop and report it.
11. **`#check`'s reading, stated once.** Confirm the `#check` comment names the rule edit 10 pins (no diagnostic and a non-zero or absent status is the instrument's fault; diagnostics decide otherwise); leave it if it does.
12. **The fixture's label.** In `tests/src/server/helpers.test.ts`, rename the `scanDiagnostics` case that the round called the non-BMP fixture (about lines 836 to 846) to what it proves: the one-based line and column lowered to zero-based over three located lines; drop any "non-BMP" wording from its name and comment.
13. **The expiry case's budget.** In `tests/src/server/Probe.test.ts`, the case `expires only the active inspection, cleans its revision, and serves a queued claim`: `deadline: 15_000` becomes `deadline: PROBE_DEADLINE` (import `PROBE_DEADLINE` from `@src/core` if the file does not already), the message assertion `'The runtime stage exceeded 15000 ms'` becomes the template over `PROBE_DEADLINE`, and the comment above the case states: the budget is the package default, which clears the type stage's warm with the room a contended host needs; a budget near the warm's floor records the arming control's expiry ahead of the hanging claim's, which a saturated host showed twice on 2026-09-06. Change no other budget.

## Unknowns

- Edit 9: whether 6.0.3 reports malformed JSON in a `files` entry with a location (`src/settings.json(2,1): error TS1005…`) — run the case and report the stdout shape either way.
- Edit 10: whether `resolveWorkspaceBinary` accepts the stub's `bin` map as written — run and report.

## Output

Write `tmp/units/ts6-u7-fix-d-report.md` with: the file list touched; per edit one to three sentences and the exact command and last lines of each scoped run; the unknowns answered; every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a sentence is not where the brief says, when edit 9 or 10 meets the refusal it names, when a scoped run reddens a case outside the edits, or when an edit needs a file you do not own. Wrapping and comment wording are yours.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check <each owned file>` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <each owned source and test file>` exits 0.
3. `grep -n "skipIf(!LINKS)\|every engine has released\|non-BMP\|deadline: 15_000" tests/src/server/stages/TypeStage.test.ts src/core/types.ts tests/src/server/helpers.test.ts tests/src/server/Probe.test.ts` prints nothing.
4. `npx tsc --noEmit --project tsconfig.json` and `npx tsc --noEmit -p configs/src/tsconfig.server.json` exit 0.
5. The scoped runs of `tests/src/server/stages/TypeStage.test.ts`, `tests/src/server/helpers.test.ts`, and `tests/src/server/Probe.test.ts -t "expires only the active inspection"` exit 0; report each duration; a timing-class failure is an observation with the case name, re-run alone by the Orchestrator.
6. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` exits 0.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
