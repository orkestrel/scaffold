# Plan — second contract performance campaign (reconciled 2026-09-01)

Reconciled by the Orchestrator from the subjective lane (`planner`, Opus 5) and the objective lane (Opus 5 through the `planner` role file, the recorded substitute for the Sol `analyst` bench the user excluded). Lane returns: `design-perf2-subjective-report.md`, `design-perf2-objective-report.md`, both blind on `design-perf2-brief.md`. Grok (`cursor-grok-4.6-high`, CLI 2026.08.31) was live and ran S2 and R3; the `orkestrel` lane was skipped on known ground (the package declares no runtime dependency).

## Instrument and admission rule (declared before any unit)

Paired in-process A/B (`ab-inproc3.mjs`) run in 6 fresh processes with load order swapped (`ab-multi.sh`), aggregated as the per-process median B/A. Certification: identity medians 1.004–1.029 with replicate spread 0.945–1.087; a planted four-extra-`Object.keys` slowdown reads median 1.063 on medium `is` with every replicate ≥ 1.030. Admission for a row: median ≤ 0.95 AND every replicate ≤ 0.98 on the family it targets; answer parity IDENTICAL over the 1062-comparison differential (the sabotaged copy reads 16 differences). Regression bar on a non-target family: median ≥ 1.05 with every replicate ≥ 1.02. CPU pinning was tried and added nothing.

## Rulings

| Row | Ruling | Ground |
| --- | --- | --- |
| A1 packed-array fast path | ADOPT (unit U1) | 6-process: is-medium 0.919 (max 0.956), parse-medium 0.903, is-list48 0.823 (max 0.829), audit-list48 0.912; parity IDENTICAL. Both lanes adopt; the table is a substitute for `INTRINSICS.text` only, indexed writes only, own corroboration kept, no size gate switching algorithms. |
| A2 lean `readValue` | TRANSFORM → A2c (unit U2) | Named-read forms are refused by both lanes (`helpers.test.ts:573` prototype-pollution pins; the own-only spread also carries the unadvertised-key throw). A2c keeps every eager read and builds the context and error only on refusal: 6-process audit-medium 0.866 (max 0.895), audit-deep 0.871 (max 0.887), parse-medium 0.959; parity IDENTICAL. The own-gated named form (A2b) read 0.913/0.911 and is dropped as slower and doctrine-bearing. |
| A11 `preview` fast path | ADOPT, narrowed (unit U2) | 6-process explain-medium (invalid) 0.819 (max 0.836); boundary corpus IDENTICAL. Both lanes: quoted strings only, gated on `source.length ≤ PREVIEW_LIMIT` before the whole-string encode, symbols keep the walk. |
| A3b compile-time pattern capture | ADOPT (unit U3) | 6-process audit-deep 0.908 (max 0.945), explain-deep 0.887 (max 0.910); parity IDENTICAL. Additive optional trailing `pattern` parameter on `createStringFaults` carrying the stateless rebuild of the same shape's pattern; `readPatternSource` of that rebuild yields the same `limit` text, so one value carries both facts and the subjective lane's separate capture type is not needed. Capture sits inside a compile-time `readValue`. The helper keeps reading `min`/`max` from the shape. |
| A6 lazy fault paths | PROBE first (Orchestrator), unit only past 0.95 | Ceiling 0.88 was measured with broken paths and without the reporter's field sites (the "explain unchanged" control was an artifact of the bound patch, not evidence about the mechanism). Honest form: trail record, materialized at every fault, every container `readValue` context, and every refined-leaf helper call. |
| A7 mask-based extra scan | REFUSE on measurement | 6-process audit-medium 0.972 (max 1.013), audit-deep 0.962. Recorded design observation: `positions` and the declared vocabulary are the same key set (an absent child shape is refused at validation through every door — `absent-child.out`). |
| A10 folded array guard | REFUSE | Both lanes: inside noise (0.976/0.972) and it restates published combinator composition. |
| A8 ledger ceiling | REFUSE | Ceiling 0.954–0.980 under the bar; documented reuse guarantee. |
| Lazy fault-array slot | REFUSE | A clean container must return a fresh array either way; no allocation is saved. |
| `oneOf` guard-first tally | REFUSE | Objective lane: guide line 271 (every door performs the read). The subjective lane's defect claim (reporter tally vs `parse` on coercible values) is refuted by probe: the `explain`/`parse` law HOLDS on six fixtures (`oneof-coercion.out`). |
| Compile-tier heap | EXCLUDE on evidence | `createContract` is documented eager lockstep; no byte target; interning breaks node identity. |
| Builder tier (missed candidate) | EXCLUDE from scope, carry to ROADMAP with measurement | `stringShape()` 15.6 µs, `objectShape(medium)` 76.6 µs, `compileGuard(medium)` 82.5 µs, `createContract(medium)` 114.6 µs (`builder-ops-015.out`). Outside the enumerated hot-path scope. |
| `Result` allocation class (missed candidate) | EXCLUDE on prior evidence | First campaign measured inline try/catch at 0.992 on the object guard; escape analysis elides the inlined result. Carry as a seam with that reading. |

## Units and routing ledger

Writers serialize in the contract checkout from committed checkpoints (baseline 3193da1); every deciding timing run is the Orchestrator's own host process after the unit exits. Sol is excluded all campaign by the user's instruction, so every unit below that names Sol's work class carries the recorded Opus substitution.

| Unit | Rows | Role / engine | Owns |
| --- | --- | --- | --- |
| U1 | A1 | `implementer` / Opus 5 (objective work class; substitution recorded) | `src/core/helpers.ts` (`readArrayEntries`), `src/core/constants.ts` (`INDEX_TEXTS`), `tests/src/core/helpers.test.ts`, `guides/contract.md` (constant row, `readArrayEntries` row) |
| U2 | A2c + A11 | `implementer` / Opus 5 (substitution) | `src/core/helpers.ts` (`readValue`, `preview`), `tests/src/core/helpers.test.ts`, `guides/contract.md` (`readValue` row precision if any) |
| U3 | A3b | `implementer` / Opus 5 (substitution; documentation-voice tail native) | `src/core/helpers.ts` (`createStringFaults`), `src/core/ContractCompiler.ts` (auditor and reporter string leaves), `tests/src/core/helpers.test.ts`, `tests/src/core/compilers.test.ts`, `guides/contract.md` (`createStringFaults` row) |
| P-A6 | A6 probe | Orchestrator | scratchpad instrument; a unit U4 only if admitted |
| Audit | per unit | `reviewer` / Opus 5 (design fit) and a clean objective Opus lane (substitution) when claims span correctness and shape; `checker` where criteria are mechanical | — |
| Verify | gates | `verifier` / Sonnet | — |

Admission at unit acceptance re-measures the SOURCE build against the 0.0.15 dist under the 6-process rule on the unit's target families, plus parity IDENTICAL.

## Exit criterion (fixed now)

- Array snapshot cost on the exactly-canonical view: U1 implemented.
- `readValue` success-path diagnostic cost: U2 implemented with every eager read and every published throw preserved.
- Invalid-value preview rendering: U2 implemented, `received` text unchanged.
- Compiled string-refinement pattern cost: U3 implemented with the guide row moved.
- Diagnostic path materialization: probed honestly; implemented past 0.95 or refused on that probe.
- Masked extra scan, folded array guard, ledger, lazy slot, `oneOf` tally, compile tier, builder tier, `Result` class: retained unchanged with the recorded reason; forward seams carried to the scaffold ROADMAP contract row.
- Answer parity IDENTICAL for every landed row; final paired A/B and ops/heap restated on the accepted tree.
- Gates green (`format:check`, `lint:check`, `check`, `build`, `test`) by an independent `verifier`; both repositories committed and pushed to `claude/method-memoization-contracts-yus26p`.
