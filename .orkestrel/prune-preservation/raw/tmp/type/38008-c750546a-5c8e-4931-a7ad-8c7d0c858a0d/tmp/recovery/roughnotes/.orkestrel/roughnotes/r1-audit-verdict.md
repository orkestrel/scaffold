# Unit R1 — audit verdict

Round one of the hardened-merge port, 2026-09-16. Subject: unit R1, which replaced this workspace's
`mergeOverride` with the version `@orkestrel/scaffold` committed at `f83ee063` and added a
conformance case per behaviour the hardening adds.

**Ruling: REJECT, with fix round R2 dispatched.** Both lanes rejected. Both confirmed the ported
bodies are byte-identical to scaffold's committed copies, and neither found a fault in the merge
itself. Every defect was in the prose the port wrote around it, or in one instrument.

Retained late. This verdict was written during the session's debrief rather than at the round's
close, which is the retention defect the debrief's objective lane recorded as O1.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `analyst` — GPT-5.6 Sol, Codex bench, `gpt-6-astra`, read-only | REJECT | `r1-audit-objective-report.md` |
| Subjective | `reviewer` — Opus 5, native subagent, clean context | REJECT | `r1-audit-subjective-report.md` |
| Gates | `verifier` — Sonnet | GREEN | `r1-verify-report.md` |

Unit R1 was written by Opus 5, so the objective lane ran on Sol — the engine that did not write the
work.

## Findings carried to R2

| Finding | Source | Carrier |
| ------- | ------ | ------- |
| The `@returns` line claims base entries survive replacement | both lanes, converging; the objective lane refuted it by executing the extracted source | R2 item 1 |
| The discriminant case's control cannot fail for any implementation | subjective Finding 2 | R2 item 2 |
| The `tests/config.test.ts` sentence is true in scaffold and false here | subjective Finding 3 | R2 item 3 |
| The added test helpers are reusable module-scope declarations | objective, plus subjective Finding 4 on the same helpers | R2 item 4 |
| The nested case's count reads as a claim the merge does not make | subjective Finding 5 | R2 item 5 |
| The body-comparison instrument's control uses the wrong operands | subjective Finding 4 | R2 item 6 |

## Where the lanes disagreed, and the ruling

**The position mutation reddens two cases.** The objective lane wanted the retained instrument
scoped so it reddens exactly its named case. The subjective lane ruled the overlap honest, because
the base-repeat case cannot assert its behaviour unless replacement happens first, and a separate
mutation isolates that case alone.

**Ruling: the subjective reading wins.** Every added behaviour has at least one mutation that
isolates it, and the unit disclosed the overlap rather than letting it pass as coverage. Scoping the
instrument would hide the overlap rather than resolve it.

## Recorded, not carried

- **The interpreter the retained instruments need is unnamed.** The scripts are Python and the
  package declares a Node toolchain. Python 3.14.7 resolves on this host and earlier units in this
  checkout already retained Python instruments. Recorded in the retention rather than ported.
- **`@returns` and `@remarks` state the same replacement rules in two vocabularies.** Carried to the
  upstream carry-back, where `@remarks` can move too.
- **The nested residual.** A nested override entry can still reach Vite as a duplicate name. That is
  scaffold's committed contract; naming the consequence belongs upstream rather than in a local
  fork.

## Deviations this round

- **The brief enumerated `tmp/units/` for instruments while `.claude/rules/tests.md` mandates
  `tmp/probe/` for a runtime probe.** The unit placed its probes correctly and the subjective lane
  ruled the brief's enumeration at fault. Orchestrator dispatch error.
- **The claim list asserted that every new case controls against the first draft.** The position
  case correctly controls against bare `mergeConfig` instead. Orchestrator wording error, caught by
  the objective lane.

VERDICT: REJECT — fix round R2 dispatched.
