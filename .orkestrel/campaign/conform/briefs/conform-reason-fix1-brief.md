# Unit conform-reason fix round 1 — the two missing failing-first proofs and four record findings

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/reason`. Perform the assignment directly and spawn nothing. Every row below is fully specified by the objective lane's prescriptions; where a prescription and the tree disagree, stop and report rather than improvise.

## Objective

Close the first audit round's refutation of claim 4 (two behavioural rows without a failing-first proof) and its four record findings F-1 to F-4, so that the unit's report, its sweep record, and one guide spelling match the tree, with the gate chain green.

## Context

**Law.** `AGENTS.md` (§ TTTDD: "Insert a failing proof before fixing a defect: record the exact command and its failing count"; § Writing, no counts); `/home/user/scaffold/.claude/rules/tests.md` § Discovery; `writing.md`.

**The unit so far.** `conform-reason-brief.md` is the unit's brief and `conform-reason-report.md` its report; the tree carries the unit's uncommitted changes (51 status entries, all Owned). Round 1: the checker (Luna) PASS on every mechanical claim; the objective lane (Opus, from the Luna distillate) held claims 1, 2, 3, 5, 6, 7, 9, ruled claim 8's gate reading NOT-EVIDENCED, and refuted claim 4. Its full text is retained at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/reason-objective-r1.md`; read its claim 4 and its findings F-1 to F-4 in full before editing.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`, so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/reason run <script>`, `npm --prefix /home/user/fleet/reason test`, `npx vitest run …` behind a leading `cd /home/user/fleet/reason && ` with its output redirected into a file under `/home/user/work/evidence/reason-proofs/` (the one redirect this brief allows, in the form the rows quote), `git -C /home/user/fleet/reason status --short`, `git -C /home/user/fleet/reason diff`, and `node /home/user/scaffold/tmp/work/evidence.mjs reason`, one command per call, with no other chain, no `;` sequence, no `for` loop, no heredoc, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

**Measurements.** Every gate is green on the tree as it stands (report § Gates); `guides/reason.md:932` reads `// 41` and `tests/guides.test.ts:453` asserts `41`; `/home/user/work/evidence/reason-proofs/` holds `sweeps.txt` and the proof captures the report names.

## Unknowns

None; row 2 names the defect to plant.

## Scope

**Owned.** `guides/reason.md` (rows 1 and 6 only), `tests/guides.test.ts` (row 1's temporary control only; the file ends as it began), `src/core/parsers.ts` (row 2's temporary plant only; the file ends as it began), `/home/user/work/evidence/reason-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-reason-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, tag, publish, install, delete a file, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git rm`. Undo a temporary control by editing it back to the exact prior text.

## Rows

1. **reason-fix1-1 (claim 4, reason-obj-2).** Set `guides/reason.md:932`'s comment back to the old value (`// 40 — (10 + 25) + 5`, the text the diff removed; read the `-` line in `/home/user/work/evidence/conform-reason.diff` for the exact characters) and `tests/guides.test.ts:453` to `expect(result.value).toBe(40)`; run `cd /home/user/fleet/reason && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/reason-proofs/reason-obj-2-before.txt 2>&1` and read it red; restore both lines exactly to `41` and `toBe(41)`; run the same command into `reason-obj-2-after.txt` and read it green. Add the row to the report's failing-first table with the command, the failing count, and the passing count, naming both files.
2. **reason-fix1-2 (claim 4, reason-obj-1's parser suite).** In `src/core/parsers.ts` plant one defect the new `tests/src/core/parsers.test.ts` claims to catch: make the definition parser accept a definition carrying an extra key (find the check that refuses an unknown key and invert or remove it, recording the exact line before and after). Run `cd /home/user/fleet/reason && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/parsers.test.ts > /home/user/work/evidence/reason-proofs/reason-obj-1-parsers-control.txt 2>&1` and read it red; restore the line exactly; run the same command into `reason-obj-1-parsers-after.txt` and read it green. Record both counts under `reason-obj-1` in the report's failing-first table, naming both files. Where the planted defect does not redden the suite, stop and report (the suite then does not catch what it claims).
3. **reason-fix1-3 (F-1).** In the report, replace the sentence at the lines reading "Four rows call for re-propagation …" (the re-propagation paragraph) with: `Every row that names \`guides/reason.md\` moved it. Copy the file verbatim into \`/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md\`.`
4. **reason-fix1-4 (F-2).** Add an entry under the report's § Breaking naming the two changed runtime message strings at `src/core/reasoners/LogicalReasoner.ts:126` and `src/core/reasoners/InferentialReasoner.ts:299` (`through` where they emitted `via`; `guides/reason.md:1063` quotes the first) with the sentence: `No consumer edit. Grep over /home/user/fleet excluding node_modules finds these strings only in this package's source and tests and in the five vendored guides/reason.md mirrors, which the verbatim re-propagation carries.` Verify that grep yourself before writing the sentence (Grep tool, pattern the exact message text, path `/home/user/fleet`, excluding `node_modules`), and quote its result beside the entry.
5. **reason-fix1-5 (F-3).** Append to `/home/user/work/evidence/reason-proofs/sweeps.txt` and to the report's § Sweeps "Empty" list the four patterns the lane re-derived empty over the claim's population (`src/**`, `tests/**`, `README.md`, `guides/reason.md`, `guides/README.md`): `remove\((id|name|groupId[^)]*): string\): void`, `subjectToFacts\(subject: Subject, trace`, `(factToArityKey|factToKey|instantiateFact|findUnboundVariables)\(source`, and `premises: \[[^\]]*\], conclusion`. Run each with Grep over that population and record the result (expected empty) beside the pattern.
6. **reason-fix1-6 (F-4).** In `guides/reason.md:583` change `runtime behaviour around duplicates` to `runtime behavior around duplicates`.

## Method

Rows in order. Then `npm --prefix /home/user/fleet/reason run test:guides`, then the gate chain `format:check`, `lint:check`, `check`, `build`, `test`, one plain command each, reading each result; also `npm --prefix /home/user/fleet/reason run format:check > /home/user/work/evidence/reason-proofs/gate-format-check.txt 2>&1` so the missing format capture exists. Confirm with `git -C /home/user/fleet/reason diff` that `src/core/parsers.ts` and `tests/guides.test.ts` carry no hunk from this round beyond the unit's own (the controls were restored). Then `node /home/user/scaffold/tmp/work/evidence.mjs reason`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 1` section to `/home/user/scaffold/tmp/units/conform/conform-reason-report.md` naming each row and what closed it, with the control files and their counts; apply rows 3 to 5 inside the report where they say. Return the same content as your final message, with each gate command and its exit code. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a control does not read red, when a line the rows quote is not found as quoted, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. `reason-obj-2-before.txt` reads red and `reason-obj-2-after.txt` green; `reason-obj-1-parsers-control.txt` reads red and `reason-obj-1-parsers-after.txt` green; the report's failing-first table carries both rows.
2. The report carries the replaced re-propagation sentence, the § Breaking entry, and the four sweep patterns; `sweeps.txt` carries the patterns with their results.
3. `guides/reason.md` carries `behavior` at the line named and `41` at `:932`; `tests/guides.test.ts:453` asserts `41`; `src/core/parsers.ts` is unchanged by this round.
4. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0, and `gate-format-check.txt` exists with a result line.

## Review evidence

`/home/user/work/evidence/conform-reason.diff` and `conform-reason.status`; the report; the rows.
