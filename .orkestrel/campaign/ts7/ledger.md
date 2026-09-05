# Campaign ts7 — routing ledger

Goal: move the line from TypeScript 6.0.3 to 7.0.2 as the type gate, keep the declaration build and every in-process API site working through Microsoft's `@typescript/typescript6` bridge in the meantime, and plan the retirement of the in-process API uses afterwards. Opened 2026-09-05 on the owner's instruction ("look up what I'm talking about … let me know the alternative in the meantime … move from 6.0.3 to the latest 7 version, and do that change first").

Bench state at dispatch: Codex dark (`codex: command not found`; the objective lane runs on Opus as `reviewer`, the recorded substitution). Cursor Grok live (`agent` 2026.09.02, `cursor-grok-4.6-high`); its web tools are rejected in this container, so web rows run on the native `researcher`.

| Unit | Role | Engine | Transport | Brief | Return | Provenance |
| --- | --- | --- | --- | --- | --- | --- |
| ts7-absorb | `grok` | Cursor Grok | `agent -p --mode=ask` through the docs-proposal campaign's `grok-lane.sh` | `absorb-brief.md` | `absorb-distillate.md` | journal `tmp/cursor/ts7-absorb.jsonl`, session `ba7e8284-5cd4-45b9-9844-46b3782a5ba3`, 11:10:40 to 11:20:54, exit 0, containment clean |
| ts7-research | `researcher` | Sonnet | native subagent | `research-brief.md` | `research-report.md` | web rows; ladder step Grok → Sonnet recorded in the docs-proposal campaign |
| Orchestrator probes | Orchestrator | — | tracked commands and scratch installs | — | `orchestrator-measurements.md` | `instruments/tsc7-probe.sh`, `api-probe.mjs`, `dts-probe.sh`, `dts-probe-2.sh` |
| rehearsal | Orchestrator | — | `instruments/rehearsal.sh` over a `git archive` copy in the scratchpad | — | appended to `orchestrator-measurements.md` | typescript 7.0.2 plus the bridge, imports re-pointed, every gate run outside the repository |
| ts7-design (subjective) | `planner` | Opus 5 | Workflow `wf_61ea54af-596`, node `ts7-design:subjective` | `design-brief.md` | `design-subjective.md` | the migration plan |
| ts7-design (objective) | `reviewer` | Opus 5 | same run, node `ts7-design:objective` | `design-brief.md` | `design-objective.md` | objective lane on Opus, the recorded substitution for the dark Sol bench |
