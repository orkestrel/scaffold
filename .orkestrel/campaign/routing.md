# Routing ledger

## Absorb — closed

| Unit | Role | Engine | Subject | Result |
| ---- | ---- | ------ | ------- | ------ |
| A1–A4 | `grok` | Cursor Grok `cursor-grok-4.6-high` | `tests/setup.ts`, 55 files | complete, 0 missing |
| B1–B2 | `grok` | Cursor Grok `cursor-grok-4.6-high` | `tests/setupServer.ts`, 27 files | complete, 0 missing |
| C1–C2 | `grok` | Cursor Grok `cursor-grok-4.6-high` | `tests/setupBrowser.ts`, 15 files | complete, 0 missing |
| D1 | `grok` | Cursor Grok `cursor-grok-4.6-high` | styles and specialty modules, 14 files | complete, 0 missing |

All nine lanes verified against a unique `(repo, name)` join. Every lane covered every symbol its
files declare. Four lanes reported symbols the Orchestrator's own index could not see; each was
confirmed real and the index was corrected rather than the reports doubted.

## Design — in flight

| Lane | Role | Engine | Transport | Handle |
| ---- | ---- | ------ | --------- | ------ |
| Subjective | `planner` | Opus 5 | native subagent | dispatched 2026-08-21 |
| Objective | `analyst` | GPT-5.6 Sol | journaled `codex exec`, sandbox `read-only` | thread `01a0255c-f1f8-70a2-8cd2-f10f7e8dfcce`, journal `tmp/design/analyst.jsonl` |

Both lanes hold one identical brief at `tmp/design/design-brief.md`, run blind to each other, and
return proposals. Neither accepts. The Orchestrator reconciles.

## Substitution — U3 transport, 2026-08-21

The Sol exec's sandbox denies loopback listeners, so the real-`node:http` subject of U3 is
unmeasurable there; the unit stopped correctly with `EPERM` evidence and a clean tree. U3 reroutes
to the native Opus 5 `implementer` per the bench law on loopback denial. The bench itself stays
live. In the audit round Sol still audits U3 as the non-writing engine; its lane receives executed
evidence the Orchestrator produces on the host, per the read-only-lane rule in the quality law.
