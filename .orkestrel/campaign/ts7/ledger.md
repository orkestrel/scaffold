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
| ts7-bridge | `implementer` | Opus 5 | native subagent, sole writer in `/home/user/scaffold` | `bridge-brief.md` | `bridge-report.md` | stage 1 of R2: the bridge as a drop-in with `typescript` still at 6.0.3 |
| ts7-probe | `implementer` | Opus 5 | native subagent, sole writer in `/home/user/fleet/probe` | `probe-brief.md` | `probe-report.md` | R6: the loader's resolution order, the widened optional peer, type imports from the bridge |
| ts7-bridge integration | Orchestrator | — | the unit's exact returned patch applied to `tests/src/bin/main.test.ts` | `bridge-report.md` § Deviations | `npm run test:src:bin` 245 passed, `npm test` exit 0 | the fixture registry's bridge row, off-limits to the unit |
| ts7-seven | `implementer` | Opus 5 | native subagent, sole writer in `/home/user/scaffold` | `seven-brief.md` | `seven-report.md` | stage 2 of R2: `typescript` 7.0.2, the rollup override (`typescriptCompilerFolder: ''`), the browser fork, the literals, the prose; deviation: the release-mode distribution proof refuses on `@orkestrel/probe@0.0.12`'s optional peer `typescript@^6.0.3` (`ERESOLVE` on a fresh install), so the `probe` release precedes landing on `main` |
| ts7-probe-2 | `implementer` | Opus 5 | native subagent, sole writer in `/home/user/fleet/probe` | `probe-2-brief.md` | `probe-2-report.md` | successor: `#support()` reads every major the peer range names; the off-limits test row split |
| ts7-audit-scaffold (subjective) | `reviewer` | Opus 5 | Workflow `wf_947dba29-54e`, node `audit:subjective` | `audit-scaffold-brief.md` | `audit-scaffold-subjective.md` | stage 2's shape, prose, voice |
| ts7-audit-scaffold (objective) | `reviewer` | Opus 5 | same run, node `audit:objective` | `audit-scaffold-brief.md` | `audit-scaffold-objective.md` | objective lane on Opus, the recorded substitution for the dark Sol bench |
| ts7-audit-scaffold (checker) | `checker` | Sonnet | same run, node `audit:checker` | `audit-scaffold-brief.md` | `audit-scaffold-checker.md` | additive mechanical lane |
| ts7-verify-scaffold | `verifier` | Sonnet | same run, node `verify` | `verify-scaffold-brief.md` | `verify-scaffold-report.md` | the chain at `6c46f547`; the distribution proof's known red |
| ts7-audit-probe (subjective, objective, checker) | `reviewer`, `reviewer`, `checker` | Opus 5, Opus 5, Sonnet | Workflow `wf_218bbb85-35e` | `audit-probe-brief.md` | `audit-probe-{subjective,objective,checker}.md` | the two probe units and the Orchestrator's receipt-fence fix |
| probe deciding run | Orchestrator | — | `instruments/probe-decide.sh` | — | `decide-*.log.txt` under the probe checkout, summarized in `orchestrator-measurements.md` | the gates after both probe units exited; a contended reading is re-run alone |
