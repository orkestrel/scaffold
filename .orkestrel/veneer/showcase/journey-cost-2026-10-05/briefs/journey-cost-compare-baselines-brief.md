# Unit journey-cost-compare-baselines: the Journal and lines gates agree with at least one baseline

Route: astra (implementation). You are the sole writer of `/home/user/veneer/tmp/units/journey-cost/compare.ts` and its proof material under `/home/user/veneer/tmp/units/journey-cost/`. No other process writes those files. The tool is an ignored unit instrument, not package source, and `/home/user/veneer/AGENTS.md`'s non-negotiables still bind its code.

## Objective

`compare.ts` requires the candidate's `## Resolved values` rows, its logged lines, and its Journal to agree with every supplied baseline. The two J-B0 runs disagree with each other on the Journal by one entry, because a host-bound journey failure in run 1 (J8 at light-390) ended that journey before it wrote `drive live components: Open the end panel`, while run 2 passed J8 and wrote it. No candidate can agree with both. The Orchestrator rules: rows agree with every baseline; lines and Journal agree with at least one baseline, and the report names which baseline matched each of the two gates. Implement that rule, keep every other gate as it is, and prove it.

## Governing texts (read first)

- `/home/user/veneer/tmp/units/journey-cost/README.md` § Compare evidence (the gate list and the sentence "Rows, lines, and Journal must agree with every baseline", which you rewrite to the ruling).
- `/home/user/veneer/tmp/units/journey-cost/compare.ts` (the usage line, the baseline loop, the Journal and lines multiset gates, the report writer, and exit codes 0, 64, 67).
- The two runs: `/home/user/veneer/tmp/units/journey-cost/runs/jb0-1` and `/home/user/veneer/tmp/units/journey-cost/runs/jb0-2`, and the existing comparison `/home/user/veneer/tmp/units/journey-cost/compare/jb0-1-vs-jb0-2.md` (read-only; it shows the one Journal difference and the failure-cause differences that stay).
- The proof material the tool already has: `/home/user/veneer/tmp/units/journey-cost/fixtures/`, `proofs.json`, and the "Reproduce the proofs" section of the README; `/home/user/veneer/tmp/units/journey-cost/report-tools-2.md` names how the proofs are run. Follow that shape for the new proof.
- The verdict's gate table: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/verdict.md` lines 20-27 (the rows gate keeps J-B0's order for untouched rows; the line gate compares multisets per line name and reading variant; the Journal is a multiset after timing entries are removed).
- Rules: `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/architecture.md` (no nested functions), `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/writing.md`.

## Scope

- **Owned.** `compare.ts`; the README's § Compare evidence sentence and the usage line it quotes; the proof fixture(s) and `proofs.json` entries the new proof needs. The report folder `/home/user/veneer/tmp/units/journey-cost/lane-compare/`.
- **Off-limits.** `run.ts`, `measure.ts`, `mutations.ts`, every run folder under `runs/` and `gates/`, `evidence/`, `mutation-targets.json`, `host-bound.md`, and everything outside `tmp/units/journey-cost/`.

## The change

1. Rows: unchanged. The candidate's rows (multiset and untouched order) must agree with every baseline, as before.
2. Lines and Journal: the candidate passes each of the two gates when at least one baseline agrees with it on that gate. When none agrees, the report lists the differences against every baseline, as it does today. When one agrees, the report's summary names the matching baseline for that gate ("Lines: agree with BASELINE_DIR"; "Journal: agree with BASELINE_DIR").
3. Failure causes: unchanged (a candidate tuple may occur in any baseline).
4. The usage line and the README sentence state the rule.

## Proof

- A fixture pair where two baselines differ by one Journal entry and the candidate equals one of them: exit 0, the report names the matched baseline. The same candidate against only the other baseline: exit 67 with the Journal difference listed. A candidate that agrees with neither: exit 67 listing differences against both. Build the fixture from the existing fixture shape, not from the live runs.
- The live check: `node compare.ts --baseline runs/jb0-1 --baseline runs/jb0-2 --candidate runs/jb0-2 --host-bound host-bound.md --registration 96/6 --out lane-compare/live-check.md` exits 67 for the popover title (not host-bound) and the failure-cause rows, and its Journal and lines gates read "agree with runs/jb0-2". Report the exact gate lines.
- Both proofs run twice with byte-identical reports (`cmp`).

## Host

Node only. `compare.ts` and its proofs load no browser and read a few megabytes, so they run directly, outside the queue. Launch nothing else.

## Forbidden

Installs, commits, pushes, credentials, destructive commands, edits outside the owned files, a change to any gate other than the two named, a change to the exit-code contract, a second writer.

## Deviation contract

Stop and report when: the rows gate would also need the at-least-one rule to pass the live check (report why; do not change it); the existing proofs stop passing; the fixture shape cannot express two baselines.

## Return shape

Report file `/home/user/veneer/tmp/units/journey-cost/lane-compare/report.md` with: the diff of `compare.ts` and the README summarized by function; the proof commands with exit codes and `cmp` results; the live check's gate lines; deviations. Your final message is a short summary naming the report path.
