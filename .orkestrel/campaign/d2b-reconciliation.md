# D2b reconciliation — brief's remaining read-once doors

Lanes: planner (Opus 5, subjective) and analyst (GPT-5.6 Sol, journaled exec
`tmp/codex/d2b-analyst.jsonl`). Ruled by the Orchestrator, 2026-08-24.

## Rulings

1. **`assertBrief` stays a guard-with-identity.** Both lanes agree. The ownership law governs
   values pulled across a seam this package called; a value handed to an intake guard stays the
   caller's. The division sentence lands in `assertBrief`'s remarks and the guide's
   borrowed-engine law bounds itself away from the intake pair. Pin: the existing identity test
   plus the intake-contrast test (a counting-getter brief passes the guard by identity while
   `pinBrief`/`briefToMarkdown` refuse the same value).
2. **`parseBrief` closes by construction.** Both lanes agree. JSON text carries no caller
   identity, accessors, or aliases. Sentence carriers in `parsers.ts` remarks and the guide; the
   writer reads `parseJSONAs` in the installed `@orkestrel/contract` before writing the sentence.
   Pins: the existing round-trip and soundness tests plus the intake-contrast identity/non-identity
   pair.
3. **The seal-live arm closes in code — the objective direction, refined by the subjective
   lane's no-narrowing constraint.** The deciding fact: `structuredClone` already drops
   prototype-carried members and materializes getters, so the clone arm has always produced
   own-member snapshots; a capture arm aligned with clone semantics is consistent with the landed
   contract rather than narrower than it, and the seal-live arm was the odd one out. The
   mechanism: where `structuredClone` throws, CAPTURE — rebuild plain containers from own
   enumerable members (unknown own members survive), materialize each published member name
   missing from the own set by reading it once (stabilizes prototype-carried accessors on
   conforming class instances), carry an uncloneable leaf by reference, freeze the view, guard
   the view, and make every later read (`#draft`, stage records, `#blockage`) read only the
   view. The seal-live fallback and `#blockage`'s second `isLogicalResult` pass are removed; the
   gate returns an already-validated owned result. Honest prose replaces the flat "read exactly
   once": the replay is the captured view, exactly as the clone arm always produced; a
   prototype-carried member outside the published contract does not survive capture, as it never
   survived a structured clone. The capture helper is a `cloners.ts` export.
   Pins (merged from both lanes): shifting prototype-accessor interpretation produces the
   captured answers; an uncloneable admitted leaf with shifting declared getters produces the
   captured answers; a shifting `LogicalResult` uses the captured `conclusion` and `rules`; the
   class-instance admission test stays as the refusal-widening control; the `Entity.value`
   comparison stays as the foreign-contract control; the counting-verdict test stays as the
   clone-arm control; the capture unit records a red run against a build where capture is
   disabled.
4. **`deriveTask` is a defect; the live-between-calls contract stays.** The objective lane's
   semantics are exact: `Object.hasOwn` does not invoke a getter, so the plain-accessor case
   reads once already; the real vector is a `Proxy` whose descriptor trap and get trap disagree.
   Fix: one `getOwnPropertyDescriptor` capture per lookup — use the data value or invoke the
   getter once; no later indexed read; inherited keys stay refused. Pins: the disagreeing-proxy
   test (derives from the descriptor, never invokes the get trap), the accessor-evaluated-once
   test, the live-mutation-between-calls test, and the existing inherited-key control.
5. **The ROADMAP brief row deletes with no residue row.** With the seal arm replaced by capture,
   the debt closes in code; the intake division and JSON-construction facts are intentional
   boundaries carried as prose beside their pins.

## Units (serial in the brief checkout)

- B1 — `sol`: the capture mechanism. Owns `src/core/cloners.ts`, `src/core/BriefCompiler.ts`,
  `tests/setup.ts`, `tests/src/core/BriefCompiler.test.ts`.
- B2 — `sol`: the `deriveTask` descriptor capture. Owns `src/core/helpers.ts` (`deriveTask`
  only), `tests/src/core/helpers.test.ts`.
- B3 — `implementer` (Opus): the prose carriers and the intake-contrast pins. Owns
  `src/core/types.ts` remarks, `src/core/parsers.ts` remarks, `src/core/helpers.ts`
  (`assertBrief` remarks only), `guides/brief.md`, `tests/src/core/parsers.test.ts`.
- Audits: B1 and B2 by `reviewer`/`checker` (non-Sol); B3 by `analyst` (Sol). Gates: host chain.
