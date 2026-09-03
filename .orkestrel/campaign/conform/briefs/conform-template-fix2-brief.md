# Unit conform-template fix round 2 — the report's last contradictions and the ruling's falsified clause

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of the unit's report. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 2's refutation of claims 1 and 3 and its referral R1 in `/home/user/scaffold/tmp/units/conform/conform-template-report.md`: the deviation entry still says the setup rows were not done, the sweep rows' population omits `README.md`, and § Ruling rests on a clause the unit's own measurement falsified. No file under `/home/user/fleet/template` changes.

## Context

**Law.** `AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time.

**Evidence.** The round-2 objective verdict (FAIL 1, 3; R1, R2), quoted per row.

**The Orchestrator's ruling on R1.** The clause "the audit refuses a `tests/setup.ts` that no proof covers" is struck as stated; the precise fact is that the audit refuses an uncovered `tests/setup.ts` while the `setup` axis is declared (emitter, 13:04 UTC, whose unit deleted the proof and kept the project and the script), and this unit measured that with the proof deleted the plan infers neither the project nor the script, so an uncovered `tests/setup.ts` with no axis is audit-clean too. The ruling therefore rests on the structural reason alone: `tests/setup.ts` stays as `setupFiles[0]` of every project, so the export-free proof is what guards that loading it first contributes nothing, and the axis the plan infers from the proof's presence is the mechanism that runs the guard. Two shapes are audit-clean; the fleet keeps the one that runs the guard.

**Host.** Read with the Read and Grep tools; change the report with the Edit tool only. Sweeps run with the Grep tool over `/home/user/fleet/template`. Run no npm, npx, or git command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-template-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`. Never commit, stage, push, install, or run a git command.

## Rows

1. **Claim 1.** At report lines 166-168, replace the "Done or not done. Not done. No edit was made for either row …" sentence with: `**Done or not done.** Done. The \`template-setup\` unit landed both rows; this unit made no edit.` At lines 164-165, change "`npm run test:setup` reads `2 passed`" to `1 passed`, citing `/home/user/work/evidence/template-proofs/gate-test-landed.txt:57`. Read the lines first; they can have moved by a line or two.
2. **Claim 3.** At the sweep rows around lines 96, 100, and 101 whose population reads `{src,tests,guides}/**/*.{ts,md}`, restate the population as `src`, `tests`, `README.md`, `guides/README.md`, `guides/template.md`; mark the `isBrowserVuePath` row case-insensitive; re-run each of those three patterns with the Grep tool over that population (excluding `node_modules` and the vendored mirrors `guides/contract.md`, `guides/emitter.md`, `guides/guide.md`) and record the result you read.
3. **R1.** In § Ruling (around lines 190-198) and in the row cell at line 24, strike the clause that the audit refuses a `tests/setup.ts` no proof covers and restate the ruling as the Orchestrator's ruling above states it, keeping the measurement at lines 170-178 as the evidence it rests on and naming both audit-clean shapes.
4. **R2.** Under § Deviations, add one sentence: `Orchestrator's ruling (audit round 2): the row-3 control planted its export in \`tests/setup.ts\`, a file this unit's status lists, because the proof's subject is that file's own export set and no other file can redden it; the plant's removal is verified by the diff, and the plant rule's exception for a proof over the planted file's own surface carries to scaffold's L3 unit.`

## Method

Rows in order. Re-read the edited sections once against the tree before returning.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Append a `Fix round 2` lead with one line per row to the report's `## Fix round 1` section. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not within three lines of the line named.

## Acceptance criteria

1. The report carries no "Not done" or "2 passed" reading for the setup rows.
2. The three sweep rows name the full population and the results read.
3. § Ruling names both audit-clean shapes and rests on the structural reason; the row cell agrees.
4. No file outside Owned changed.
