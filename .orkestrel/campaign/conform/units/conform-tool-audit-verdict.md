# Audit verdict — unit conform-tool (2026-09-03)

Workflow `wf_f5789004-34f` (`instruments/layer.workflow.js`, the L1b slice). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writer: `implementer` on Claude Opus 5. Subject: the unit's uncommitted changes on the baseline b6320ce. Brief: `briefs/conform-tool-brief.md`; report: `reports/conform-tool-report.md`; evidence: `units/conform-tool.diff.txt`, `units/conform-tool.status.txt`; lane verdicts: `units/l1b/*-tool-*.json`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | PASS (F1, F2 carried, not blocking; referrals R1, R2) | PASS | accepted |

## Orchestrator's rulings

- **F1** (the never-a-throw claim that tool-obj-3 qualified at `src/core/types.ts:72-74` and `guides/tool.md:234-236` still stands unqualified at `src/core/types.ts:134`, `src/core/tools/ToolManager.ts:17-19`, `guides/tool.md:30-31`, and `guides/tool.md:248-249`): the package contradicts itself and the published declaration surface carries the wrong half. The lane offers the qualification at the four homes or the code branch the refuter refused; the Orchestrator takes the qualification, with the exact sentence the unit wrote at `types.ts:72-74` as the model, in tool's follow-on builder unit (`briefs/followon/tool-brief.md`) landed after this unit.
- **F2** (`tests/guides.test.ts:2-3` count and `below`; `:36` positional reference and `below`): the follow-on unit carries the lane's exact rewrites.
- **R1** (`src/core/tools/Tool.ts:27-34` declares public `readonly` data fields ahead of the `#execute` field): fleet-F2's trigger stays narrow; `ToolInterface` requires those members as readonly data properties, so the getter conversion is not the repair. Recorded for the next matrix in `ledgers/followons.md`.
- **R2** (`guides/README.md` § Dependency reference lists `contract.md`, `guide.md`, and `scaffold.md` while `probe.md` and `test.md` sit unlisted): the follow-on unit lists both mirrors in the file's existing form.
- The report's three observations are the same items (the tagline, the header comment, the mirror list) and are closed by the same unit.

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit; the follow-on unit lands on its own deciding run.

Terminal: `VERDICT: PASS`
