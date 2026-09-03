# Unit conform-template fix round 1 — bring the report to the landed tree

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/template` (for one temporary control only) and of the unit's report. Perform the assignment directly and spawn nothing.

## Objective

Close the first audit round's refutations of claims 1, 3, and 4 and its findings F1 to F3 and referrals R1 and R2: the report still describes the tree before the `template-setup` unit landed template-obj-5 and fleet-F1, so its dispositions, deviation evidence, sweep record, proofs, gates, files-touched list, and acceptance criteria are brought to the tree as it stands, the setup row gets its red reading, and the ruling's rationale is stated as the unit's own measurement found it.

## Context

**Law.** `AGENTS.md` § TTTDD and § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time; `.agents/orchestration.md` § Dispatch anatomy (a corrected unit names the pair it supersedes).

**The unit so far.** `conform-template-brief.md` (with its § Successor note) is the unit's brief and `conform-template-report.md` its report, written by the successor implementer at 14:50 UTC before the `template-setup` builder landed template-obj-5 and fleet-F1 at 14:52–14:54 (`/home/user/scaffold/tmp/units/followon/template-setup-brief.md` and `template-setup-report.md`). That builder changed the two rows' dispositions and added § Ruling, and nothing else in the report moved. Round 1 (Grok-first): the objective lane (Opus, from the Luna distillate) held claims 2, 5, 6, 7, 9 and refuted 1, 3, 4 on the report's stale state, with F1–F3 and R1–R2; its full text is at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/template-objective-r1.md`. Read it in full before editing. The Luna checker is queued and rules on the report as you leave it.

**The Orchestrator's rulings.** R1: the setup ruling stands, and its rationale is stated as the measurement found it — the installed scaffold's plan infers the `setup` project and the `test:setup` script from the presence of `tests/setup.test.ts`, and the audit refuses a `tests/setup.ts` that no proof covers (emitter, 13:04 UTC, after its unit deleted the proof and kept the module); `tests/setup.ts` stays because it is `setupFiles[0]` of every project, a structural file `AGENTS.md` keeps, so the one audit-clean shape with the structural file in place is the proof plus the axis, and the proof's assertion (loading the module first contributes nothing to any project) is the guard the axis exists to run. R2: the report names `template-setup-brief.md` and `template-setup-report.md` as the pair that landed the two rows and supersedes their earlier disposition.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`, so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/template run <script>` with its output redirected into a file under `/home/user/work/evidence/template-proofs/` where a row asks for a capture, `npm --prefix /home/user/fleet/template test` (likewise), `git -C /home/user/fleet/template status --short`, `git -C /home/user/fleet/template diff`, `node /home/user/scaffold/tmp/work/evidence.mjs template`, and `cd /home/user/fleet/template && npx scaffold audit --offline`, one command per call, with no other chain, no `;` sequence, no `for` loop, no heredoc, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-template-report.md`; `/home/user/work/evidence/template-proofs/**`; `tests/setup.ts` for row 3's temporary plant only (the file ends as it began).

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command. Undo the plant by editing the line back to its exact prior text.

## Rows

1. **Claim 1 (dispositions).** In the report: strike the `stopped` sentence at lines 3-4 and state instead that every row landed, template-obj-5 and fleet-F1 through the `template-setup` unit; retitle the § Deviation heading at line 132 to record the row as closed under § Ruling (keep the deviation's history as the measurement it was); replace the Exact-evidence block at lines 146-150 with the landed state (`tests/setup.ts:1-5` a header comment, `tests/setup.test.ts:1-13` the export-free proof, `vite.config.ts:75-84,133` and `package.json:52,66` carrying the axis).
2. **Claim 3 (sweeps).** Re-run every sweep the report's § Sweeps records over the landed tree, with the population `src`, `tests`, `README.md`, `guides/README.md`, `guides/template.md` (Grep tool, excluding `node_modules` and the vendored mirrors `guides/contract.md`, `guides/emitter.md`, `guides/guide.md`), and rewrite the rows with the results; replace the `isBrowserVuePath` row (line 92) with its empty result.
3. **Claim 4 (the setup row's red reading).** Plant one extra export in `tests/setup.ts` (for example `export const planted = 1` on its last line), run `npm --prefix /home/user/fleet/template run test:setup > /home/user/work/evidence/template-proofs/template-obj-5-control-red.txt 2>&1`, read it red; remove the planted line exactly; run the same into `template-obj-5-green.txt`, read it green (1 passed). Record the row in the report's failing-first table with command, counts, and files.
4. **F1 (gates).** Re-run the gate chain on the landed tree — `format:check`, `lint:check`, `check`, `build`, `test`, each captured into `/home/user/work/evidence/template-proofs/gate-<script>-landed.txt` — and `cd /home/user/fleet/template && npx scaffold audit --offline`; rewrite § Gates with these readings, each naming its command and file, and state that the earlier `gate-test.txt` (14:40, `setup 2 passed`) predates the setup landing.
5. **F2 (files touched).** Rewrite line 38 to name the `template-setup` unit as the writer of the setup pair and this unit's successor implementer as the writer of nothing, and add `tests/setup.test.ts` (rewritten as the export-free proof) and `tests/setup.ts` (the helper removed) to the changed-set list at lines 41-56, matching `/home/user/work/evidence/conform-template.status` entry for entry.
6. **F3 (acceptance criteria).** Drop the `isBrowserVuePath` exception from criterion 6 (lines 195-196) and make criterion 7's enumeration (lines 197-201) match the status file.
7. **R1 (the ruling's rationale).** Rewrite § Ruling (lines 176-184) so its rationale reads as the Orchestrator's ruling above states it, keeping the measurement at lines 155-163 as the evidence it rests on.
8. **R2 (supersession).** Add one sentence at the head of the report naming `/home/user/scaffold/tmp/units/followon/template-setup-brief.md` and `template-setup-report.md` as the pair that landed template-obj-5 and fleet-F1 and supersedes their earlier disposition.

## Method

Rows in order; then `node /home/user/scaffold/tmp/work/evidence.mjs template`. Confirm with `git -C /home/user/fleet/template diff -- tests/setup.ts` that the plant is gone.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 1` section to the report naming each row and what closed it. Return the same content as your final message, with each gate command and its exit code. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when the plant does not read red, when a line the rows quote is not found as quoted, or when a gate reddens.

## Acceptance criteria

1. The report carries one disposition per row, the landed evidence, re-run sweeps, the setup row's control, the landed-tree gates, the corrected files-touched list and criteria, the restated ruling, and the supersession sentence.
2. `template-obj-5-control-red.txt` reads red and `template-obj-5-green.txt` green; `tests/setup.ts` carries no hunk from this round.
3. Every gate exits 0 on the landed tree and the audit prints its single zero-drift line.

## Review evidence

`/home/user/work/evidence/conform-template.diff` and `conform-template.status`; the report; the rows.
