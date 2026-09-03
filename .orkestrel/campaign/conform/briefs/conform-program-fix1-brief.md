# Unit conform-program fix round 1 — isolated controls, the presence guard, the `@throws` rows, two prose sites, cleanup under failure

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/program`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 2 and 4, its findings O1 and O2, and its referral R1 as ruled here (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r1-sol.md`). The round-1 checker passed with prose findings outside the rows (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-r1-checker-luna.result.md`), carried by a later follow-on, not this round.

## Context

Read first: `/home/user/scaffold/AGENTS.md` § Writing and § TTTDD; `/home/user/scaffold/.claude/rules/tests.md` § Test contract (a regression test records the exact command and its failing count before the fix and the same command's passing count after; the revert that proves a repair reddens exactly the test that names the defect) and § Discovery and adequacy audit (cleanup runs after an assertion failure); `/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time; the unit brief `/home/user/scaffold/tmp/units/conform/conform-program-brief.md` rows program-obj-3 and program-subj-6; the unit's report `/home/user/scaffold/tmp/units/conform/conform-program-report.md` § Failing-first controls.

Standing conditions: the checkout carries the conform-program unit's uncommitted edits (18 files, all inside the unit's Owned scope); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile (an npm shim on `PATH` refuses install-class subcommands). Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>` with `<project>` one of `src:core`, `setup`, `guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/program-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 2a, the presence guard** — `tests/guides.test.ts:253-256` guards the fence tail while `:195-250` transcribes the fence's setup too. Extend the presence guard to every fence input and documented value the transcription reuses (the population rule: a guard carries every fence input and documented value a transcription reuses), in the form the block already uses.
- **Claim 2b, one `@throws` per code** — `src/core/types.ts:267-270` lists `DESTROYED`, `MISMATCH`, and `RESERVED` under one `@throws` tag. Split into one `@throws {@link ProgramError}` row per code, each stating when it is thrown ("Thrown when …"), and mirror the split on the class member in `src/core/programs/Program.ts`. Sweep `@throws` over `src` for any other row that names more than one code and split it the same way; record the sweep.
- **Claim 4, isolated controls** — the report's three batched controls (`obj1-obj2-obj5-setup-red.txt`, `obj4-obj6-src-core-red.txt`, `obj3-guides-red.txt`) plant several defects in one run. For each of program-obj-1, program-obj-2, program-obj-5, program-obj-4, program-obj-6, and program-obj-3, plant its defect alone (the plant the report names for it), run the narrowest command that collects the test naming it — `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` for obj-1, obj-2, obj-5; `--project src:core <the one test file>` for obj-4 and obj-6; `--project guides tests/guides.test.ts` for obj-3 — capture it red as `<row>-red.txt`, restore the line by editing, run the same command, and capture it green as `<row>-green.txt`. Each red names the test that names the defect and nothing else fails. Replace the report's controls table with one row per plant carrying the exact command, the red count, the green count, and the two capture names; keep the paragraphs naming each plant.
- **O1** — `src/core/types.ts:457` and `src/core/programs/ProgramManager.ts:187`: "the new program's id" → "After appending the program, the `add` event fires with its id." (or the same fact in the member's own sentence shape).
- **O2** — `tests/guides.test.ts:227-250`: put the execution and the assertions in `try` with `program.destroy()` in `finally`, so an assertion failure still releases the program.
- **R1, ruled** — `guides/program.md:173-176` states that the complete tally record derives from `STATUSES` while `completeTallies` at `src/core/helpers.ts:824-830` writes every status as a literal. Prose states what the code does: rewrite the sentence so it says `completeTallies` writes every `Status` member as a literal record and `isTallies` checks membership through `STATUSES`. Do not change the code.
- **Report** — append `## Fix round 1` naming the objective lane's file, each item, the sites, the sweeps, and the captures.

## Scope

Owned: `tests/guides.test.ts`, `src/core/types.ts` (the `@throws` rows and `:457`), `src/core/programs/Program.ts` (the mirrored `@throws` rows), `src/core/programs/ProgramManager.ts` (`:187`), `guides/program.md` (`:173-176`), the plant sites named in the report for the six controls (restored to their current text after each capture), `/home/user/scaffold/tmp/units/conform/conform-program-report.md`. Off-limits: every other file and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing. Take the six controls first, so a plant never overlaps an edit this round makes; then the edits; then the gates.

## Output

Return, as your final message: the controls table as rewritten; the presence guard's new members with `file:line`; each split `@throws` row with `file:line`; the O1 sentences; the O2 shape; the R1 sentence; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped `guides`, `setup`, and `src:core` runs over the files you touched.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a plant reddens a test other than the one naming its defect, when a gate reddens on a file outside Owned, or when `completeTallies` and the guide disagree in a way the R1 ruling does not cover. Decide, record, and carry on for an ancillary question: the exact wording of a `@throws` row, which assertions the `try` wraps.

## Acceptance criteria

1. Six red captures each name one failing test and six green captures each pass the same command; the report's controls table cites them.
2. `grep -rnE "@throws" src` shows one code per row.
3. `tests/guides.test.ts` guards every fence input the transcription reuses and releases the program under `finally`.
4. `grep -rnwE "new" src/core/types.ts src/core/programs/ProgramManager.ts` shows no temporal `new` in a doc comment.
5. `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
