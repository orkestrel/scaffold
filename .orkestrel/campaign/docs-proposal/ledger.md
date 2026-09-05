# Campaign docs-proposal — routing ledger

Goal: `PROPOSAL.md` at the scaffold repository root presenting the owner's top three options for a single-source documentation pipeline (TSDoc, guides, the `@orkestrel/guide` checks, oxlint, oxfmt, one voice for humans and agents), pushed to `main`. Opened 2026-09-05 on the owner's instruction; the owner asked for Grok absorption and primary-source research first.

Exit criterion: `PROPOSAL.md` carries three options, each with a mechanism, a worked example on real scaffold code, an edit-cost account, a statement of which existing checks survive, a migration path, and falsifiable claims; the file passes `npm run format:check` and the writing rules; the records sit in this folder; both are on `main`.

Bench state at dispatch: Codex dark (`codex: command not found`; every objective lane runs on Opus as `reviewer`, the recorded substitution). Cursor Grok live (`agent` 2026.09.02, model `cursor-grok-4.6-high`); its web tools are rejected inside this container.

| Unit | Role | Engine | Transport | Brief | Return | Provenance |
| --- | --- | --- | --- | --- | --- | --- |
| docs-absorb | `grok` | Cursor Grok | `agent -p --mode=ask` through `instruments/grok-lane.sh` | `absorb-brief.md` | `absorb-distillate.md` | journal `tmp/cursor/docs-absorb.jsonl`, session `3c23a60d-927d-40a3-814a-d1b103821790`, 04:30:22 to 04:37:30, exit 0, containment clean |
| docs-research | `grok` | Cursor Grok | same | `research-brief.md` | `research-distillate.md` | journal `tmp/cursor/docs-research.jsonl`, session `43b1dc08-413c-41f2-ab96-6a65e288c597`, 04:37:30 to 04:42:26, exit 0, containment clean; web rows unreached (`User Rejected`) |
| docs-research-web | `researcher` | Sonnet | native subagent | `research-web-brief.md` | `research-web-report.md` | ladder step Grok → Sonnet recorded in `orchestrator-measurements.md`; Luna unavailable with the Codex bench dark |
| docs-ecosystem | `orkestrel` | Sonnet | native subagent | `ecosystem-brief.md` | `ecosystem-report.md` | two unknowns settled by the Orchestrator under § Settled |
| Orchestrator probes | Orchestrator | — | tracked commands | — | `orchestrator-measurements.md` | oxfmt Markdown check, core declaration build, `tsc --declaration` probe; the `ROADMAP.md` trailing space fixed as `a74686b8` |

Design round, writer, audit, and verifier rows are appended as they dispatch.

| docs-design (Lens A) | `planner` | Opus 5 | Workflow `wf_50dace1e-3ab`, node `design:A` | `design-brief.md` | `design-A-report.md` | subjective: TSDoc as the single source, guides generated |
| docs-design (Lens B) | `planner` | Opus 5 | same run, node `design:B` | `design-brief.md` | `design-B-report.md` | subjective: authored narrative with generated reference regions |
| docs-design (Lens C) | `planner` | Opus 5 | same run, node `design:C` | `design-brief.md` | `design-C-report.md` | subjective: one voice for humans and agents, prose law in lint and format |
| docs-design (Lens O) | `reviewer` | Opus 5 | same run, node `design:O` | `design-brief.md` | `design-O-report.md` | objective lane on Opus, the recorded substitution for the dark Sol bench; constraints, cost model, falsification, criteria |
| docs-proposal | `implementer` | Opus 5 | native subagent | `proposal-brief.md` | `proposal-report.md` | writes `PROPOSAL.md` from `reconciliation.md`; the Orchestrator's reconciliation is the unit's ruling input |
| docs-proposal-audit (subjective) | `reviewer` | Opus 5 | Workflow `wf_9d14854c-0b0`, node `audit:subjective` | `proposal-audit-brief.md` | `proposal-audit-subjective.md` | design fit, voice, coherence; claims 5, 9, 10, 12 |
| docs-proposal-audit (objective) | `reviewer` | Opus 5 | same run, node `audit:objective` | `proposal-audit-brief.md` | `proposal-audit-objective.md` | objective lane on Opus, the recorded substitution for the dark Sol bench; claims 1 to 5, 9 |
| docs-proposal-audit (checker) | `checker` | Sonnet | same run, node `audit:checker` | `proposal-audit-brief.md` | `proposal-audit-checker.md` | additive mechanical lane; claims 1, 6, 7, 8, 11 |
| docs-proposal-fix | `implementer` | Opus 5 | native subagent | `proposal-fix-brief.md` | `proposal-fix-report.md` | fix round 1 carrying every round-1 finding with its lane's prescription |
