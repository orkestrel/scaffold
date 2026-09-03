# Unit conform-console fix round 1 — the first audit round's four broken claims and two findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing.

## Objective

Close the first audit round's refutations of claims 2, 3, 4, and 5 and its findings F1 and F2, and land the Orchestrator's rulings on referrals R1 and R2, so that every runnable fence of `guides/console.md` is transcribed and asserted, every row's proof or sweep is recorded with pattern and paths, and the tree carries no new rule violation, with the gate chain green.

## Context

**Law.** `AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md` (§ Cross-cutting proofs, § Discovery, the helper placement rules at its lines 170-174 and 192), `architecture.md` (no nested functions, lines 161-163), `documentation.md` § Parity, `writing.md` § Substitutions.

**The unit so far.** `conform-console-brief.md` is the unit's brief and `conform-console-report.md` its report; the tree carries the unit's uncommitted changes (38 status entries, all Owned). Round 1: the checker (Sonnet) PASS on every mechanical claim; the objective lane (Opus, reading the Luna distillate) held claims 1, 6, 7, 9, ruled claim 8's gate reading NOT-EVIDENCED, and refuted claims 2, 3, 4, and 5 with two findings and four referrals. Its full text is retained at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/console-objective-r1.md`; read it in full before editing, and adopt each prescription it gives verbatim unless a row below says otherwise.

**Rulings on the referrals.** R1: `LoggerManager.remove(names)` returning `true` only when every name was present is a runtime behaviour change a consumer branching on the value observes; add a row under the report's § Breaking naming the symbol, the change, and the consumers (the reconcile sweep found no fleet source consumer of `createLoggerManager`; re-run that grep over `/home/user/fleet/*/src` excluding `node_modules` and quote it), with `No consumer edit` where that holds. R2: the sync half of the moved `createCaptureResult` example belongs on the sync overload's doc block (`src/core/factories.ts:183-190`); split the example so each overload's block shows its own call, the async one awaited. R3 and R4 are carried by the Orchestrator to a follow-on unit; change nothing for them.

**Host.** POSIX shell; `node_modules` holds the fleet closure re-staged from the packed tips at 15:14 UTC (`npm install --no-save`), so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/console run <script>`, `npm --prefix /home/user/fleet/console test`, `npx …` behind a leading `cd /home/user/fleet/console && ` with its output redirected into a file under `/home/user/work/evidence/console-proofs/` where a row asks for a capture, `git -C /home/user/fleet/console status --short`, `git -C /home/user/fleet/console diff`, `git -C /home/user/fleet/console add -N …`, and `node /home/user/scaffold/tmp/work/evidence.mjs console`, one command per call, with no other chain, no `;` sequence, no `for` loop, no heredoc, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

**Measurements.** Every gate is green on the tree as it stands (report § Gates, captures under `/home/user/work/evidence/console-proofs/`).

## Unknowns

How the server fence (`guides/console.md:598-620`) is driven under the test runner: the lane prescribes `createRecordingSink`; where the fence needs a real child process, use the package's own test fixtures (read `tests/setupServer.ts` and `tests/src/server/ProcessCapture.test.ts` for the precedent) and record the choice.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/src/browser/helpers.test.ts` (row 3's control only; the file ends as it began), `src/core/helpers.ts` (row 6 only), `src/core/factories.ts` (row 8 only), `/home/user/work/evidence/console-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-console-report.md`.

**Shared (report-only).** Every other file; every other fleet checkout.

**Off-limits.** `src/**` beyond the two files named, `guides/**`, `README.md`, `.claude/**`, `.codex/**`, `.cursor/**`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/**`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `node_modules/**`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, push, tag, publish, install, delete a file, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git rm`. Never add a dependency. Never suppress a diagnostic. Never leave a TODO, a skipped test, or a deferred row.

## Rows

1. **console-fix1-1 (claims 2 and 5).** In `tests/guides.test.ts`'s `flagship fences` block, transcribe the guide's opening fence (`guides/console.md:11-26`, asserting its three commented values) and the server fence (`:598-620`, asserting `forced.styled` and `capture.messages('stderr')`), and cover `inferColumns` (`:671`), so that every runnable fence of `guides/console.md` is executed and every commented value asserted. Prove each transcription the way the round proves a fence: edit the fence's commented value in the guide, run `npm --prefix /home/user/fleet/console run test:guides` into `console-proofs/fix1-fence-<name>-control-red.txt`, read it red, restore the guide line exactly, read green.
2. **console-fix1-2 (claim 3).** Re-run the two narrow sweeps over the five required paths (`src`, `tests`, `guides/console.md`, `guides/README.md`, `README.md`, excluding `node_modules`): `complet(e|es|ed|ing|ion)` case-insensitive and `\b(out|err)\s*:`, and record each in the report's § Sweeps with its pattern and paths, ruling every hit (the lane names the permitted-sense hits at `src/core/constants.ts:465`, `tests/src/core/factories.test.ts:377`, and the `!== ''` guards).
3. **console-fix1-3 (claim 4, console-obj-3).** Give `tests/src/browser/helpers.test.ts:243-248` (`Date.now()` → `performance.now()`) a control: plant a truncating reading (a body that returns an integer millisecond as `Date.now()` did) in the helper under test, run the browser suite's script into `console-proofs/console-obj-3-control-red.txt`, read it red, restore the line exactly, read green into `console-obj-3-green.txt`; where no red is producible, record exactly why with the command run.
4. **console-fix1-4 (claim 4, the sweep rows).** For each of console-obj-6, console-obj-7, console-obj-8, console-obj-9, console-subj-6, console-subj-7, console-subj-10, console-subj-11, console-subj-13, console-subj-14, and console-subj-15, record in the report the sweep that proves the old form gone (a word-boundary search over the old name or path, and a case-insensitive search over its inflections), with pattern and paths, and every hit ruled.
5. **console-fix1-5 (F1).** Move `visible` from inside the `describe('flagship fences')` callback (`tests/guides.test.ts:218-220`) to `tests/setup.ts` as an exported host-independent helper with its doc comment, import it in `tests/guides.test.ts`, and add its case to `tests/setup.test.ts`; record `npm run test:setup` and `test:guides` green.
6. **console-fix1-6 (F2).** `src/core/helpers.ts:127`: rewrite `i.e. its severity is` as `that is, its severity is`; then re-run the substitution sweep with `e\.g\.|i\.e\.` added over `src/**/*.ts`, `tests/**/*.ts`, `guides/console.md`, `guides/README.md`, and `README.md`, recording pattern, paths, and every hit ruled.
7. **console-fix1-7 (R1).** Add the § Breaking row for `LoggerManager.remove(names)` as the ruling states, with the consumer grep quoted.
8. **console-fix1-8 (R2).** Split the `createCaptureResult` example across the two overload doc blocks in `src/core/factories.ts:160-190` as the ruling states; `npm run check` and `test:guides` stay green.

## Method

Rows in order. Then the gate chain `format:check`, `lint:check`, `check`, `build`, `test`, one plain command each, reading each result (run the mutating `lint` and then `format` only to converge, then prove with the checks). Then `node /home/user/scaffold/tmp/work/evidence.mjs console`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Rewrite `/home/user/scaffold/tmp/units/conform/conform-console-report.md` so it describes the whole unit as it now stands, with a `## Fix round 1` section naming each row and what closed it, the control files with their counts, the sweeps with their patterns and paths, the § Breaking row, and each gate command with its exit code; then regenerate the evidence files with `node /home/user/scaffold/tmp/work/evidence.mjs console`. Return the structured content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a fence cannot be driven under the runner without a mock, behavioural fake, or fake clock; when a control does not read red; or when a gate reddens on something the rows did not touch. Decide, record, and carry on for an ancillary choice such as the transcription's helper names.

## Acceptance criteria

1. Every runnable fence of `guides/console.md` has a transcription in `tests/guides.test.ts` whose control read red; the files are named.
2. The report's § Sweeps carries a pattern and paths for every row the lane listed and for the two re-run sweeps.
3. `tests/guides.test.ts` declares no nested function; `tests/setup.test.ts` covers `visible`.
4. `src/core/helpers.ts` carries no `i.e.`; the § Breaking row and the split example exist.
5. `format:check`, `lint:check`, `check`, `build`, and `test` each exit 0.

**Observations, not criteria.** The whole-suite timing under concurrent load; the Orchestrator takes the deciding run at landing.

## Review evidence

`/home/user/work/evidence/conform-console.diff` and `conform-console.status`; the report; the rows.
