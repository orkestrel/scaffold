# Fix round 1 — unit conform-ndjson

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/ndjson`. Perform the assignment directly and spawn nothing.

## Subject

The unit brief is `/home/user/scaffold/tmp/units/conform/conform-ndjson-brief.md` (its Host paragraph's shell discipline binds this round too) and the writer's report is `/home/user/scaffold/tmp/units/conform/conform-ndjson-report.md`. The tree carries the unit's uncommitted changes on the baseline 40f19dd. A fix-round agent the Orchestrator stopped at 10:36 UTC on 2026-09-03 had read the tree and changed no file.

## The round-1 verdicts

- Objective lane (Claude Opus 5, the recorded substitution for the dark Sol bench): `/home/user/work/l1r/14-ndjson-objective-r1-a1bd73846b0eb3123.json` — `FAIL 8` and finding F1 outside the claims (the `RangeError` sentence in `README.md:25-26` and `guides/ndjson.md:23-24` is an ungated behavioural claim), with report-wording prescriptions for `:10`, `:12`, and `:131`.
- Checker (Claude Sonnet): `/home/user/work/l1r/13-ndjson-checker-r1-af20ceea6437b3adc.json` — `FAIL 3 9`.

Read both in full.

## Orchestrator rulings

1. **Claim 8** is structural: no read-only lane can take the gate run, and the deciding run at landing settles it. Re-run the gate chain bare (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`) and record each exit code in the report's § Gates.
2. **Checker claim 3** (ndjson-subj-8's vocabulary): the ruled vocabulary reaches a test's `describe` titles and comments. Edit `tests/src/core/NDJSONParser.test.ts:9-10` and `:135` from "non-object lines" to the `record` / `non-record` vocabulary the row fixed, re-run the old-name sweep over `src`, `tests`, `guides/ndjson.md`, `guides/README.md`, and `README.md`, and record the sweep with its pattern and paths. The row stays `applied`; strike the deviation that recorded it as unresolved.
3. **Checker claim 9** (probe residue): delete `tmp/probe/buffer.test.ts` and the empty `tmp/probe` directory. The Orchestrator retained the instrument at `/home/user/scaffold/.orkestrel/campaign/conform/units/ndjson-probe-buffer.test.ts` before this round, so the report's § Deviations names that path as where the probe lives.
4. **F1** is substantiated, and the Orchestrator rules neither of the lane's options. A gate that allocates a string up to the host's maximum length (roughly 512 MB peak, to be re-run alone before any red reading is believed) is not a gate this suite runs, and a claim the suite does not execute is not published. Recast `README.md:25-26` and `guides/ndjson.md:23-24` so each states only what an executed test proves: `max` bounds the buffered characters and a line past it is refused the way the suite asserts (name that test in the report), and drop the claim that the append throws a `RangeError` at the host's string-length limit. Where the narrowed never-throws sentence at `README.md:6` depended on that qualifier, scope it to the behaviour the suite drives rather than to an open set, and record the exact wording chosen in the report. Adopt the lane's three report-wording prescriptions (`:10`, `:12`, `:131`) verbatim.

## Method and output

Adopt the rulings, re-run the gate chain, rewrite `/home/user/scaffold/tmp/units/conform/conform-ndjson-report.md` so it describes the whole unit as it now stands with a `## Fix round 1` section naming each finding and what closed it, and refresh the evidence files `/home/user/work/evidence/conform-ndjson.diff` (`git diff HEAD` after `git add -N` on every created file) and `/home/user/work/evidence/conform-ndjson.status` (`git status --short`). Do not commit, stage beyond `git add -N`, push, install, or run any discarding git command. Return the structured output.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a ruling contradicts the tree in a way you cannot close inside Owned. Decide, record, and carry on from an ancillary question.
