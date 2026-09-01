# Unit design-performance — adversarial design round: measured performance campaign for contract

## Role and engine

TWO separate clean-context lanes, blind to each other, SAME brief:

- Subjective lane: `planner` role, Opus 5.
- Objective lane: Opus 5 standing in for the dark Sol bench (Codex excluded by the user's
  instruction on 2026-09-01; substitution recorded in the routing ledger). You hold the
  OBJECTIVE perspective: correctness, constraints, what the code and contracts actually permit.

You are a native subagent reading this brief: perform the assignment directly yourself and
spawn nothing. You are read-only — propose; never edit, never accept.

## Objective

Propose the strategy set, unit decomposition, and acceptance criteria for a measured
performance campaign over `@orkestrel/contract` 0.0.14 (runtime hot paths and type level),
grounded ONLY in the evidence pack. Every proposed strategy must name its evidence, its
predicted magnitude, the probe that must confirm it before implementation, and the documented
guarantee it must not weaken.

## Context — read all of it

- Coding law: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`,
  `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
  `.claude/rules/names.md`, `.claude/rules/quality.md` (all under `/home/user/scaffold/`).
- Subject source: `/home/user/contract/src/core/` (read-only). Its tests pin observable
  behavior: `/home/user/contract/tests/`.
- Evidence pack, all under `/home/user/scaffold/.orkestrel/contract/`:
  - `baseline-perf-report.md` — hot-path ns/op per family, compile-path heap, tsc diagnostics.
  - `probe-attribution-report.md` — CPU-profile attribution with source mapping.
  - `probe-mechanisms-report.md` — isolated mechanism magnitudes (76x array walk, 4.4x
    presence, 2.8x freeze, Reflect.apply NO-WIN, attempt unresolved-in-isolation).
  - `headroom.out` — hand-hardened medium guard 16 ns/op vs contract 2911 ns/op (177x bound),
    spot parity AGREES on the invalid set including a hostile prototype.
  - `research-runtime-distillate.md` — R1: benchmark methodology, V8 technique catalog with
    conditions, prior art (Zod 4 / Valibot / ArkType). Its URLs are canonical-from-knowledge
    (its sandbox refused live fetches); treat each technique as probe-verified locally, not
    URL-verified.
  - `research-types-distillate.md` — R2: type-level metrics and techniques (tsc diagnostics
    semantics, instantiation-reduction catalog, prior art).
  - `typefixture.out` with `typefixture/` sources — consumer-side `Infer` cost per tier,
    tsc 6.0.2, incremental off.
  - `scout-hotpath-distillate.md` — S1: independent per-call source map per family; cross-check
    against the attribution report where they disagree.

## Hard constraints (violating any is a refused design)

- Zero new dependencies. Native APIs and the existing toolchain only.
- Every documented guarantee stays: guards never throw on hostile input (they return false);
  exotic views and hostile prototypes are refused, not crashed; parse returns `T | undefined`;
  audit/explain fault content and stable pre-order; replay identity of getters and bundle;
  frozen publications stay frozen; caller-owned inputs never mutated; read-stability
  preconditions as documented. The existing test suite's observable pins stay green UNMODIFIED
  except where a test pins an internal mechanism rather than observable behavior — name any
  such test explicitly and argue it.
- AGENTS.md non-negotiables (no `any`, no assertions, no nested named functions, centralized
  kinds, single-word public APIs) bind every proposed edit.
- Public API shape changes require a majority-evidence argument that the campaign's goal cannot
  be met inside the current API; default is NO public surface change.
- Every strategy is probed BEFORE implementation: name the probe design (dist-level surgical
  A/B in scratchpad, isolated pattern probe, or `prove` receipt for type claims) and the
  threshold that admits it (declare thresholds before runs, per `.claude/rules/tests.md`).

## Candidate rows (extend, merge, refute — with evidence)

1. Object-guard presence machinery: per-call fresh `Set` + membership applies → compile-time
   required-key list with direct own checks. Evidence: attribution 9.2% + M-B 4.4x.
2. Array element reads: per-call defensive snapshot (own names, numeric/text round-trip, sort,
   fresh list, double freeze) → honest packed fast path with the defensive walk as fallback on
   anomaly. Evidence: attribution 8.6% sortValues + M-C 76x.
3. Per-call `attempt` closure + `Result` on hot paths → non-allocating containment (direct
   try/catch in compiled closures). Evidence: attempt 5.6% of deep audit, GC ~10% on guard
   loops; M-A unresolved in isolation — needs the dist-level probe first.
4. `enumerableKeys` per-call `Object.freeze` of an internal fresh array → unfrozen internal
   copy. Evidence: M-E 2.8x on the isolated op; semantics ruling needed on why it freezes.
5. Per-call shape accessor re-reads (`get pattern`, `readPatternFlags`) → compile-time capture
   into the closure. Evidence: attribution 2.6% + 1.4% on deep audit.
6. `preview` string work reached on a VALID audit walk. Evidence: attribution 3.1%. Find why
   fault-text machinery runs when there are no faults; propose the cut.
7. Type level: MEASURED HEALTHY — the consumer fixture (`typefixture.out`, tiers from a
   no-library control through wide-30-keys, depth-8, and union-of-8 `Infer` use) reads 2530
   instantiations / 0.13 s at the medium+deep tier and 2690 / 0.13 s at the union tier, linear
   scaling, controls discriminating (control tier 2 instantiations; shapes-without-Infer 325).
   Default ruling: intentionally exclude type-level strategy work on this evidence. Refute only
   with a concrete consumer pattern the fixture missed, and name it.
8. EXCLUDED already, keep excluded unless you refute the probe: de-Reflect of intrinsic
   dispatch (M-D tie at ~17.7 ns).
9. Cycle-tracking memo on tree declarations: `#trackGuard` (`ContractCompiler.ts:589-614`)
   wraps EVERY repeating node (object, array, union, optional, nullable) and allocates a fresh
   `WeakMap` per top-level call per tracked node (the `filled !== scope` refill), plus recall
   and retain applies — pure overhead when the declaration graph is a tree with no shared
   children and no cycles, which the compiler can decide at COMPILE time from its node index
   (`#discover` records sharing). Candidate: skip tracking for tree declarations; keep it
   exactly as-is when sharing or cycles exist. Same reasoning for `#trackFaults`.

## Unknowns

- Whether any test pins the per-call defensive mechanisms as observable behavior (a test that
  feeds an exotic array view and expects refusal is a GUARANTEE, not a mechanism pin — the
  fast-path/fallback split must keep it green).
- Which shapes of DELIBERATE hostile input the fallback must still refuse — enumerate from
  tests and TSDoc, not from imagination.
- (Resolved to row 9: flat shapes DO pay the tracking memo on every object and array node.)

## Output (exact shape, returned as your final message)

- `Strategies`: numbered rows; per row: mechanism, evidence pointers, predicted magnitude at
  library level, probe design + admission threshold, guarantee-preservation argument, unit
  decomposition (owned files), risks.
- `Excluded`: rows you refuse, each with the evidence that refuses it.
- `Order`: implementation order with dependencies and why.
- `Exit`: the campaign's exit criterion as enumerated closable capabilities.
- `Verdict`: one line — the single highest-value strategy and its predicted magnitude.
