# Acceptance — `@orkestrel/contract` paired-harness performance campaign (2026-09-01)

Goal: improve on the memoization campaign's 0.0.15 tree with evidence-first rows, each proved at dist level before a writer, pinned by tests, audited adversarially, and gated independently. Plan and routing ledger: `plan-perf2.md`. Sol excluded all campaign by the user's instruction; Opus 5 ran every lane through the `reviewer` and `planner` role files, recorded per round. Grok ran absorption (`s2-scout-distillate.md`, `r3-research-distillate.md`).

## Exit criterion, ruled

| Capability | Ruling | Evidence |
| --- | --- | --- |
| Array snapshot cost on the exactly-canonical view | Implemented (U1 + U1f, contract e81ba64) | `multi-u1f.out`; `array-hostile-u1f.out` and `array-reads-u1f.out` identical to 0.0.15 beyond the intended trap counts; `u1-audit-verdict.md` |
| `readValue` success-path diagnostic cost | Implemented (U2 + U2f, contract 163490f) with every eager read and every published throw preserved | `multi-u2.out`; `readvalue-hostile-u2f.out` identical to 0.0.15 except the intended alternating-subject repair; `u2-audit-verdict.md` |
| Invalid-value preview rendering | Implemented (U2), `received` text unchanged | `preview-boundary-u2f.out` identical to 0.0.15; `multi-u2.out` explain-invalid |
| Compiled string-refinement pattern cost | Implemented (U3 + U3f + U3g + the Orchestrator edit units + U3i + U3j + U3k, contract c13cfae) with the guide row moved; the supplied-rebuild promise pinned by a counting accessor; the export census recast from a remembered number to a property derived from the barrel | `multi-u3f-vs-u2f.out`, `pattern-faults-u3f.out` identical to 0.0.15, `u3i-f1-mutation.out`, `census-derived-u3final.out`, `u3-audit-verdict.md` |
| Diagnostic path materialization | Refused on the honest probe (1.07–1.11) | `multi-a6trail.out`, `parity-content-a6trail.out` |
| Masked extra scan, folded array guard, ledger, lazy slot, `oneOf` tally, compile tier, builder tier, `Result` class | Retained unchanged with the recorded reason; seams carried to the scaffold `ROADMAP.md` contract row | `plan-perf2.md` § Candidate rulings; `multi-a7.out`, `multi-a5.out`, `oneof-coercion.out`, `builder-ops-015.out` |
| Answer parity IDENTICAL for every landed row; final paired A/B and ops/heap restated on the accepted tree | Met: `parity-final.out` and `parity-content-final.out` both `PARITY: IDENTICAL` against the 0.0.15 dist; A/B and ops and heap restated in the following section | `parity-final.out`, `parity-content-final.out`, `multi-final.out`, `ops-final.out`, `heap-final.out` |
| Gates green by an independent `verifier`; both repositories committed and pushed to `claude/method-memoization-contracts-yus26p` | Met: `verifier` GREEN on the shipped tree (run 5: `src:core` 1324, `policy` 111, `config` 46, `setup` 61, `guides` 65); contract c13cfae pushed; scaffold fad485e (ROADMAP row) and the commit carrying this record pushed | `u3-final-verifier-report-5.md`; scaffold fad485e and the commit carrying this record, contract c13cfae |

## Final measurements (accepted tree vs the 0.0.15 dist, 6 fresh processes, load order swapped)

| Family | Ratio (median, 6 replicates) | Worst replicate |
| --- | --- | --- |
| is-medium | 0.926 | 0.936 |
| parse-medium | 0.875 | 0.878 |
| audit-medium | 0.850 | 0.918 |
| explain-medium (invalid) | 0.750 | 0.765 |
| is-deep | 0.949 | 0.956 |
| parse-deep | 0.908 | 0.936 |
| audit-deep | 0.763 | 0.814 |
| explain-deep (invalid) | 0.798 | 0.842 |
| is-list48 | 0.856 | 0.860 |
| audit-list48 | 0.817 | 0.846 |

Record: `multi-final.out` (replicates under `multi-final/`). Ops restated on the accepted tree (`ops-final.out` against `ops-015.out`, ns/op, median of 7 rounds): medium `is` 1562 from 2100, `parse` 1742 from 2204, `audit` 2837 from 4802, `explain` 2227 from 3262; deep `is` 6116 from 6383, `parse` 6164 from 6597, `audit` 9821 from 13731, `explain` 7022 from 8897; `generate` unchanged within noise (5695 from 5813; 17039 from 16870). Heap per call unchanged within noise (`heap-final.out` against `heap-015.out`): medium contract 13756 B from 13681 B, deep guard-only 18870 B from 18840 B; the control array reads 8248 B against an 8192 B payload.

Identity control in the same session: `multi-final-identity.out`, the 0.0.15 dist against a byte-identical copy of itself in the same session: is-medium median 1.006 (0.909–1.019), audit-medium 0.989 (0.966–1.053), audit-deep 1.017 (0.935–1.048); one replicate reached −9 %, wider than the ±8 % certification recorded in `plan-perf2.md`, and every admitted family's worst replicate sits at or under 0.956, outside that band.

## Remaining risk

- The `readValue` success-path deferral and the compiled-door pattern wire are unobservable from the published surface; each rests on the paired A/B and the retained instruments (`u3-door-wire*.mjs`, `u3-wire-mutation.out`), not on a suite pin.
- The compiled doors' plan-time `pattern` refusal is unreachable while `ShapeCloner#captureString` mints the clone's pattern from captured strings; a change there surfaces a `compileAuditor`-named message from `createContract`.
- `guides/contract.md` line 256 carries a pre-existing temporal `now` ("Both are pinned now") in a sentence the census bump touched only by its literal; it belongs to the guide's next prose edit.
- Timing admission rests on the harness certification (identity 1.00–1.03, planted 6 % slowdown read at median 1.06); a host with a different noise floor needs its own certification before reusing the bar.
