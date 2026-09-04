# Unit conform-workflow fix round 3 — the counted comment, the false sweep rows, the diffstat and § Breaking counts, the setup-fixture control, the moved citation

## Role and engine

`implementer` on Claude Opus 5 (native Claude Code subagent; the Sol bench is dark on the Cursor account's API-model usage limit, recorded in the campaign ledger), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-workflow-report.md` and the capture directory `/home/user/work/evidence/workflow-proofs/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's findings O1, O2, O3, O5, and O6 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-objective-r2.md`; the round-2 checker passed every claim). O4 is ruled: the Orchestrator's landing run executes the full gate chain on the tree this round leaves; it is not this unit's work. R1 is ruled: the behavioural change to `WorkflowManagerInterface.remove(ids[])` earns a row in the report's § Breaking as a behavioural change with no fleet consumer. R2 stays open with toolbox's own unit, as the report records at `:420`.

## Context

`/home/user/scaffold/AGENTS.md` § Writing (never state a count; delete a count you find) and § TTTDD (a failing proof precedes the fix: the exact command and its failing count, then the same command green); `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.claude/rules/writing.md`; the unit brief's Method step 2 (`/home/user/scaffold/tmp/units/conform/conform-workflow-brief.md`): a row that adds, moves, or extracts a helper or a fixture is behavioural, and its proof is the helper's own test read red with the helper's body planted wrong and green with it.

Standing conditions: the checkout carries the conform-workflow unit's uncommitted edits (59 paths under `git status --short`). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing, and undo the planted control by editing the exact lines back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`, `tee`.

## Sites and edits

- **O1** — `tests/guides.test.ts:2-3`: delete the number, so the comment reads "The constants below are this package's own, and are the only part a sibling package changes." Do not correct the number.
- **O2** — the report's Sweeps table, rows `:102` and `:103`: correct both in place, the way the `\be\.g\.\b` row at `:108` was corrected. Row `:102` (`§` over `guides/workflow.md`, `guides/README.md`, `README.md`) records the hits `guides/README.md:89` and `guides/workflow.md:1462`, the named-section citation form the row prescribes, whose cited sections exist (`AGENTS.md` § Design laws, `.claude/rules/names.md` § Fixed lifecycle vocabulary, `.claude/rules/typescript.md` § Errors and outcomes, `.claude/rules/documentation.md` § Parity). Row `:103` (`§[0-9]` over the checkout minus `node_modules`) records the vendored mirrors by name — re-run it and list every file it hits; the lane read `budget`, `queue`, `timeout`, `abort`, `contract`, `database`, `emitter`, and `guide`. State the conclusion each row supports.
- **O3** — report `:76`: replace "58 files changed: 57 modified, 1 added (`tests/src/core/Collection.test.ts`)." with a sentence without a number: `git status --short` lists only files under Owned; `tests/src/core/Collection.test.ts` is added and every other path modified. Report `:140`: replace "Four rows move the published surface." with "These rows move the published surface:" ahead of the table, keeping the consumer sentence.
- **O5** — the failing-first control for `buildTasks` (`tests/setup.ts:438`) and `buildCollection` (`tests/setup.ts:458`). Plant both wrong in one edit: replace `compileGuard(taskUpdateShape)` in `buildCollection` with a permissive stand-in that accepts every update, and make `buildTasks` return the same tree on every call (hoist one `createWorkflow(buildWorkflowDefinition())` into a module-level constant it reads). Run `npm run test:setup` and capture its output to `/home/user/work/evidence/workflow-proofs/o5-setup-control-red.txt`; it must fail, and the failing cases must include `buildTasks > mints a fresh tree per call` and at least one `buildCollection` case. Restore both bodies by editing the exact lines back, run the same command, and capture it to `/home/user/work/evidence/workflow-proofs/o5-setup-control-green.txt`. Confirm with `git diff --stat` that `tests/setup.ts` shows the same line delta as before the plant. Record the command, both files, and the red and green counts in the report beside the fixture rows under § Fix round 2's gate table.
- **O6** — report `:44`: re-point `isBrowserVuePath` to `tests/setup.ts:523` and its `describe` block to `tests/setup.test.ts:423`; open both lines and confirm before writing.
- **R1** — report § Breaking: add a row after the table, or a sentence under it, stating that `workflow-subj-6` changes the value `WorkflowManagerInterface.remove(ids[])` returns for a partial batch from `true` to `false` and for an empty batch from `false` to `true`, with no fleet consumer.
- **Report** — append `## Fix round 3` naming the verdict file, each edit with `file:line` before and after, the control's command and both captures with their counts, and the two rulings (O4 to the landing run, R1 recorded).

## Scope

Owned: `tests/guides.test.ts:2-3`; `tests/setup.ts:438-460` for the control only, restored byte-for-byte; `/home/user/work/evidence/workflow-proofs/o5-*.txt`; the report. Shared: none. Off-limits: every other line, every other edit the unit made, and the vendored set named under Standing conditions.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each edit with `file:line`, before and after; the corrected sweep rows as written; the control command with the red count and the green count and both capture paths; `git diff --stat` for `tests/setup.ts` before the plant and after the restore; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:setup`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the planted control does not fail, when the restored run does not pass, when a gate reddens, or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence.

## Acceptance criteria

1. `sed -n 2,3p tests/guides.test.ts` carries no numeral; `grep -nE '\b(58|57|Four) ' /home/user/scaffold/tmp/units/conform/conform-workflow-report.md` returns nothing at `:76` or `:140`.
2. Report rows `:102` and `:103` name the hits the sweeps return on the tree.
3. `o5-setup-control-red.txt` shows a failing `npm run test:setup`; `o5-setup-control-green.txt` shows the same command passing; `tests/setup.ts` matches its pre-plant content.
4. The gates and `npm run test:setup` exit 0; `git status --short` lists the unit's 59 paths and nothing new.
