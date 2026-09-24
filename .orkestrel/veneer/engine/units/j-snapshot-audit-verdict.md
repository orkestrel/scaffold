# J-SNAPSHOT audit round 1 — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the J-SNAPSHOT round-1 tree in `tmp/worktrees/snapshot` (base `afae42c`), per `j-snapshot-brief.md`, `j-snapshot-report.md`, and `j-snapshot-audit-claims.md`.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec` read-only; thread `01a0d3da-3dd7-7b33-b3ca-b502320afc33`, 25 commands, 422 s) | `j-snapshot-audit-objective-verdict.md` | `VERDICT: FAIL 2, 4; outside the claims: none` |
| Subjective | `reviewer`, Opus 5.5 (native, read-only; the writer's engine, so the objective lane is the cross-engine auditor) | `j-snapshot-audit-subjective-verdict.md` | `VERDICT: FAIL 4, 5; outside the claims: F2` |
| Checker | `checker`, Sonnet (native, read-only) | `j-snapshot-audit-checker-verdict.md` | `VERDICT: FAIL none; outside the claims: F1` |

Citations spot-checked by line in `HostSnapshot.ts`, `HostSnapshot.test.ts`, and `types.ts`: they resolve. The objective lane executed nothing; its claim-2 finding is a derivation with a concrete control, carried as a red-first obligation.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 The shared presence record | CONFIRMED by both lanes. The subjective lane's R1 (a button destroyed while a collapse on the same trigger is live leaves `class=""` until the collapse destroys, where `main` removed it) is a real partial-state regression the "last holder judges" rule causes; its proposal — every departure judges removal against the shared first reading, the record forgotten at the last holder — closes the four interleavings and the partial state. **Ruled adopted.** R2 (a snapshot that saves during its own restoration and never restores pins the record) dissolves under it. | Round 2 (S1') |
| 2 The re-entry hand-off | Mechanism CONFIRMED by both lanes. **FAIL on the proof:** the Dropdown reproduction's `MutationObserver` discards deliveries, so an empty `takeRecords()` after the awaited `hide()` cannot distinguish no late write from an already-delivered one; the fix retains deliveries in a recorder, asserts neither delivered nor queued records, and adds the late-write negative control. | Round 2 (S2') |
| 3 The contract sentences | CONFIRMED on the letter. R4: `#### Tab` and `#### Carousel` name a campaign unit in the published guide; the sentences are reworded to state the bound without a unit name, and `plan.md` keeps J-SNAPSHOT-SHARED as the carrier. | Round 2 (S3') |
| 4 Instrument, gates, scope | UNRESOLVED on the Orchestrator's replay only, settled at the landing round's instrument per the pipeline. R3 (a possible `Map<any, any>` widening from `?? new Map()` in `#join` and the landed `#publish`) is closed by an explicit type argument, with a scratch typecheck showing whether the widening was real. | Round 2 (S4') and the landing replay |
| 5 The shape | **FAIL.** F1: `#hold`/`#join` and `#depart`/`#leave` name one membership action at two layers, each static with one caller passing `this`; fold into instance `#join(element, attribute)` and `#leave(element, attribute): boolean`. F3 and the checker's F1: temporal `once` in the `types.ts` remarks, the guide paragraph, and one case title. | Round 2 (S5') |

## Outside the claims

- F2 (subjective): four retained case titles describe the removed presence mechanism; retitle for what each proves. Round 2.
- Bounds (subjective, wording): the class remarks' first paragraph lacks the judging qualifier; the `#pending` comment says "has run" for a mark set before the write; the `#publish` comment keeps the older throw sentence; "judges" gives software a faculty; the instrument row name "the lifetime read dropped" versus the report's term; folded into round 2 as bounds.

## Deviations

- Dispatch defect (recorded): the generated lane briefs carried the component template's delegate-route focus, subject files, and the gate script's component greps; the reviewer ruled on neither. The snapshot patch script left those fields; the round-2 briefs are generated with the same script and patched, and this note names the leftover.
- The objective lane reports `mcp__probe__prove` visible to the Codex exec, contrary to the brief's statement that it is unreachable; the statement holds for native subagents only. The brief template's sentence is corrected in the next generated briefs.

VERDICT: FAIL 2, 5; outside the claims: F2; round 2 under `j-snapshot-brief-2.md` (S1' judging rule, S2' proof repair, S3' sentences, S4' type argument, S5' fold and wording, F2 retitles); replay at the landing round
