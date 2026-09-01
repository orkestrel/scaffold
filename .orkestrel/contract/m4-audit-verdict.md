# m4-audit — reconciled verdict (2026-09-01)

Round over the m4-retention-prose change (uncommitted on contract fcdd4d0). Lanes: subjective
and objective, clean-context Opus 5 subagents (Sol recorded dark), blind, one brief; `checker`
on Sonnet for the mechanical claim. Blind returns retained verbatim (`m4-audit-subjective.md`,
`m4-audit-objective.md`, `m4-audit-checker.md`). Terminal lines: subjective FAIL, objective
FAIL, checker CONFIRMED on its slice.

## Reconciled rulings, by claim

1. BROKEN (both lanes; convergent vectors, each verified against source):
   - The `createContract` TSDoc clause "nothing the caller keeps holds the owned graph" is
     false: the auditor and reporter plans capture the owned nodes they read their bounds from
     (`#auditOf` and `#reportOf` leaf and array cases), so a kept contract retains those nodes
     and, through an array node's `items`, the subgraph beneath them. Bound against
     over-correction, from the objective lane: the GUARD family captures no owned node, so the
     guide's guard-centred advice and its fence stand. The guide sentence "a contract it
     returns holds nothing but its own six values" carries the same over-claim. Carrier: m4fix.
   - The `ContractCompilerInterface` TSDoc sentence "Nothing is released before then" is a
     false universal: settlement through `#fail` releases the working set with no family
     built. Both lanes prescribe deletion. Carrier: m4fix.
   - The attribution sentence split the lanes: the objective confirmed its technical reading
     (the refusal fires inside the call), the subjective broke its plain reading (the error
     carries the authoring door's diagnosis, adopted by identity, never rewrapped under this
     door's name — both lanes agree on that mechanism). An added sentence a reasonable reader
     takes the false way is a prose defect; it is rewritten to the unambiguous form. Carrier:
     m4fix.
2. CONFIRMED (both lanes).
3. CONFIRMED (both lanes; transcription byte-identical in the load-bearing expression).
4. BROKEN (both lanes, same vector and same minimal fix): the presence guard binds only the
   construction line, so an edit turning a fence comment false stays green — the exact defect
   the mechanism exists to end. Fix: bind the two value-claiming lines; do not assert the whole
   block (formatter re-wrap would false-redden). Carrier: m4fix.
5. CONFIRMED (objective and checker).
6. CONFIRMED (both lanes): the brief's standing condition was false — the repository had no
   fence-execution mechanism — and the writer establishing it inside the owned file is what
   the rules mandate. The false condition was the Orchestrator's brief defect; recorded.
7. SPLIT: the added-prose sweep is clean in both lanes (patterns and populations named in each
   return). The objective substantiated systematic stale line pointers in the writer's
   left-alone list — pre-change numbers unshifted by the unit's own insertions. The report is
   immutable; the corrected pointers are these: the `contract` member TSDoc `above` sits at
   `src/core/types.ts:1105`, and the `createContract` body sits at `src/core/compilers.ts:377`.
   The six-vocabulary question both lanes met is recorded as permitted (a fixed published
   surface, the guide's and source's established term); ruling it package-wide is a successor
   claim, not this round's.
8. CONFIRMED (both lanes; the Unknown answered — no other passage carries the old release
   wording; search patterns and populations recorded in the objective return).

## Finding outside the claims

- Subjective F1, substantiated: the guide's compiling-a-contract flagship fences assert values
  (`contract.is` / `parse` / `audit` / `explain`; `compiler.guard` and the identity
  equalities) and none is transcribed, so those fences can go false with the suite green — the
  condition the m4 mechanism exists to end. Correctly ruled outside m4's fixed scope; routed
  with the claim-4 fix. Carrier: m4fix.

## Closure route

m4fix adopts the lanes' prescriptions (prose rewrites bounded by the objective lane's
guard-family bound; the presence-guard extension; the flagship transcriptions). Closure: a
mutation probe on the guide's claim lines (a comment flipped false must redden the suite,
restored must green it) plus the scoped gates, recorded in the fix unit's report. Every lane
and the checker ran; nothing was skipped.
