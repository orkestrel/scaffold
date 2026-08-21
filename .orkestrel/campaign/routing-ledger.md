# Windows wave 2 — routing ledger

Bench liveness 2026-08-21: Codex Sol live (round-tripped, thread
`01a0232d-ebcd-7d62-a83c-54f12a214650`); Cursor Grok live (round-tripped through versioned entry
`2026.08.11-e8db854`). No substitutions forced.

| Unit | Role | Engine | Transport | Status |
| --- | --- | --- | --- | --- |
| Baseline measurement, junction/badname/readconfig probes | Orchestrator-owned instruments | — | host commands | done |
| Terrain absorption (test/probe/scaffold) | `grok` | Cursor Grok | versioned-entry CLI, journal `tmp/cursor/absorb-windows-wave.log` | done |
| Supervisor helper absorption | `grok` | Cursor Grok | versioned-entry CLI, journal `tmp/cursor/absorb-supervisor.log` | drafting |
| Design round 1 subjective lane (subjects A-C) | `planner` | Opus 5 | native subagent, clean context | running |
| Design round 1 objective lane (subjects A-C) | `analyst` | GPT-5.6 Sol | journaled `codex exec`, read-only, rooted at the projects parent; journal `tmp/codex/design-objective.jsonl`, thread `01a02339-cf6a-7ce1-89d0-41339e35717d` | running |
| Design round 2 (helper adoption) | `planner` + `analyst` | Opus 5 + Sol | same as round 1 | pending inventory |
| test implementation unit | `implementer` | Opus 5 | native subagent, sole writer in the test checkout | pending design |
| probe implementation unit | `implementer` | Opus 5 | native subagent, sole writer in the probe checkout | pending design |
| scaffold follow-on (dissolve `createWorkspace.link` workaround) | `implementer` or `builder` | per design | native | pending design |
| Audits | `analyst` (+ `reviewer` where shape changed, `checker` for mechanical criteria) | Sol (+ Opus) | journaled exec / native | pending |
| Gates | `verifier` | native cheap tier | native subagent | pending |

Later dispatches (2026-08-21, same session):

| Unit | Role | Engine | Transport | Status |
| --- | --- | --- | --- | --- |
| A1 test src `createLink` | `implementer` route `sol` | GPT-5.6 Sol | `codex exec` workspace-write rooted at test; journal `tmp/codex/unit-a1.jsonl` | landed, accepted |
| A2 test gates and proofs | `implementer` | Opus 5 | native | landed, accepted (`87 passed \| 8 skipped`) |
| A3 test guide | `implementer` | Opus 5 | native | running |
| T0 tarball swap | Orchestrator | — | tracked script | done; probe `9 failed \| 168 passed \| 3 skipped` |
| A4 scaffold workaround dissolution | `implementer` | Opus 5 | native | landed, accepted (baseline `350 \| 4` exact) |
| B probe refused-name classification | `implementer` | Opus 5 | native | running |
| C probe config-seam normalization | `implementer` | Opus 5 | native | queued after B |
| P-host probe fixture/bin adaptation | `implementer` | Opus 5 | native | queued after C |
| M1 toolbox shaper proofs | `builder` | Sonnet | native | running |
| M2 program foreign-result guards | `implementer` route `sol` | GPT-5.6 Sol | `codex exec` workspace-write rooted at program; journal `tmp/codex/unit-m2.jsonl` | running |
| Design round 2 lanes (helpers + waitForCondition) | `planner` + `analyst` | Opus 5 + Sol | native + `codex exec`; journal `tmp/codex/design2-objective.jsonl` | both landed; reconciled in `design2-reconciliation.md` |
| Design round 3 lanes (rulings S1-S12) | `planner` + `analyst` | Opus 5 + Sol | native + `codex exec`; journal `tmp/codex/design3-objective.jsonl` | running |
| w3 red re-proof | Orchestrator instrument | — | tracked script | done (2 reds named the removed file; restore clean) |
| H-wave (0.0.8 surface) | H-core → `sol`; H-server, H-browser-1, H-browser-2, H-guide → Opus `implementer` | per reconciliation | queued after A3, serial in the test checkout | pending |

Orchestrator-owned one-line edits (the "work directly on a one-line fix" class), each verified
by a parse or format/lint read-back: `prepack` lines in toolbox, agent, and qualifier
manifests (after the sweep unit skipped busy or just-written checkouts);
`--ignore-scripts` on probe's distribution pack (the S-docs carrier gap); mcp's matching flag
queued for when its live writer lands. U12's staging was also Orchestrator-copied from the
sol driver's six identical precedents rather than through a fresh driver dispatch.

Audit round (each subject: one claims brief, two blind lanes, reconciled by the Orchestrator):

| Subject | Lanes | Outcome |
| --- | --- | --- |
| process chain | `reviewer` (Opus) + `analyst` (Sol exec) | Both FAIL; reconciled; P4-fix (Sol) landed with failing-first pairs; authoritative host run `130 passed | 6 skipped` exit 0 — ROUND CLOSED |
| probe chain | `reviewer` (Opus) + `analyst` (Sol exec) | Both FAIL; reconciled; P-fix (Opus) landed with failing-first pairs and probe-pair discriminations; host `src:server` `143 passed | 2 skipped` exit 0 — ROUND CLOSED |
| scaffold chain | `reviewer` (Opus) + `analyst` (Sol exec) | Both FAIL; reconciled in `audit-scaffold-reconciliation.md`; fix round S-fix (Sol) running |
| distributed batch | `reviewer` (Opus, native) + `analyst` (Sol exec, parent-rooted; journal `tmp/codex/audit-batch-analyst.jsonl`) | Both FAIL; reconciled in `audit-batch-reconciliation.md`; claim-8 lane conflict settled by the Orchestrator's own source read (reviewer right); fixes: C-fix (Sol, contract), G-fix (Sol, program, queued), M-fix2/Q-fix/T-fix (Sonnet builders), brief flag + scaffold guide sentence Orchestrator-direct |
| test chain | `reviewer` (Opus, native, diff supplied) + `analyst` (Sol exec rooted at test; journal `tmp/codex/audit-test-analyst.jsonl`) | Both FAIL; reconciled in `audit-test-reconciliation.md`; fix round TA-fix (Opus implementer) running; lockfile referral settled green |
| fix rounds (P-fix by Sol; P4-fix + S-fix by Opus reviewer) | cross-engine per authorship; brief `audit-fixrounds-brief.md` | Both PASS; reconciled in `audit-fixrounds-reconciliation.md`; probe, process, and scaffold rounds CLOSED; findings routed to P5 (Sol, queued) and SF4 (builder, landed with discrimination quartet, policy 93 passed) |

Recorded deviation of the Orchestrator's own briefs: the probe audit brief assigned the
read-only reviewer lane git runs and probe writes its allowlist forbids (the reviewer deviated
correctly and ruled from source plus the established runs); the scaffold and batch briefs
carry the same defect for their reviewer lanes — their deviations are accepted as evidence
limits. Successor audit briefs supply the diff to read-only lanes explicitly.

Closing units (2026-08-21, after the batch and test reconciliations):

| Unit | Role | Engine | Outcome |
| --- | --- | --- | --- |
| TA-fix (test audit survivors) | `implementer` | Opus 5 | landed; audited by Sol — two-walk contrast mechanism BROKEN (64-layer rounding), `EPERM` pin non-binding |
| TAF2 (contrast soundness + `EPERM` fields) | `implementer` | Opus 5 | landed; `readLayers` leaf, 64-layer pin discriminates, plant control proved the old pin blind; host: browser `137`, server `107\|9`, core `67`, guides `13`, all exit 0 |
| P5 (process polish) | `sol` | GPT-5.6 Sol | first run stopped on an unscoped constant (amendment 1 granted it); landed; audited by Opus — `writableEnded` absorption, dead `#inputFault`, F7 routing BROKEN |
| P6 (P5 audit survivors) | `sol` | GPT-5.6 Sol | landed with both discrimination pairs; host `src:server` `130 passed \| 6 skipped` exit 0 |
| SF4 (fence-limit control) | `builder` | Sonnet | landed; discrimination quartet; policy `93 passed` |
| test release verifier | `verifier` | native | GREEN: full chain exit 0 at 0.0.8; committed `23e7530` |
| process release verifier | `verifier` | native | GREEN: full chain exit 0 at 0.0.5; committed `41cd9d1` |

The `EPERM` identity prescription was overruled on the record: object identity needs an
injection seam the mocking ban forbids; the host-populated `syscall`/`errno` fields are the
discriminator, per the originating finding's own "identity or distinguishing properties".

Routing deviations, recorded:

- Implementation units route to the native Opus `implementer` rather than the Sol `implementer`,
  although subjects B and C are objective work. Reason: each unit's acceptance runs Vitest
  projects in the subject repo, and the proofs create junctions and drive embedded runners whose
  child-process behaviour inside the bench sandbox is unmeasured on this Windows host; the bench
  laws forbid dispatching a unit that cannot prove its own work there. The engine split is kept by
  giving every such unit its adversarial audit on Sol (the writer's engine never audits itself).
- Tedious-work ladder never advanced past Grok this session.
