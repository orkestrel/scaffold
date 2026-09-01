# Unit design-performance — subjective lane return (planner, Opus 5)

Returned 2026-09-01. Lane held shape, taste, ergonomics, design fit. Verbatim distillate of its
rulings; the full argument text is in the session transcript and the reconciliation quotes what
it rests on.

## Thesis

Three tiers: door (caller-supplied shape/options/random — `contain`/`readValue` untouched),
compile (capture every declaration-derived fact once), call (caller-supplied value — hostile
machinery entire). Admit only strategies that move work from the call tier to the compile tier.

## Strategies

- S1 compile-time required-key presence replaces per-call `collectMembers`/`matchesMember` in
  the object plans of is/parse/audit/explain (audit's `collectMembers(declaredKeys)` at
  ContractCompiler.ts:1443-1444 rebuilds a compile-time constant per call). Predict 10-15%
  medium is. Admit >= 6% on medium is, zero S7 differences. Pre-probe: can a hostile ownKeys
  trap make `Object.keys` return a duplicate key (the counting argument rests on it).
  Unit: objective engine; owns ContractCompiler.ts + its test.
- S2 ordinary-case certification INSIDE `readArrayEntries` (helpers.ts:1023-1059): leading pass
  accepts exactly canonical ascending indices + 'length', copies by index, returns same frozen
  shape; any disagreement falls to the existing walk byte-for-byte. One lens, early agreement
  test — not a fast path beside a fallback. Predict 10-20% medium is, 15-30% deep is/audit.
  Admit >= 10x isolated on the certification form, >= 5% medium is at library level, zero S7
  differences over sparse/extra-key/non-canonical/length-liar/Proxy corpus. Keeps a guarded
  bench block beside the helpers test recording the magnitude. Unit: objective engine; owns
  helpers.ts + its test; parallel with S7.
- S3 multiplicity predicate for tracking: extend `#discover` to record per node whether it can
  be applied to one object more than once per call (occurrence > 1, or a path traverses an
  array items edge, or parent carries the fact; reverse pass over #order). `#repeats` becomes
  that fact. REFUTES the brief's tree-declaration predicate: ContractCompiler.test.ts:394-414
  (30-level array chain, tree declaration, shared VALUE graph, < 1000 ms pin; comment records
  524286 reads / 4.4 s / 8.4 s without memo) and :382-392 buildCountedSlots. Admit >= 2% medium
  is, chain under 1000 ms, counted-slots pins green, zero S7 differences.
  Mechanism-pin ruling: test :443-510's `calledMany > calledFew` half is an implementation pin;
  restate with array-nested added nodes so it discriminates under the new predicate; its
  buildDelta === 0 half stays. Unit: objective engine; owns ContractCompiler.ts + test; after S1.
- S5 compile-time capture of declaration fields in leaf plans (pattern source/flags, min, max,
  integer, expected kind); public create*Faults helpers keep their readValue door. Predict
  6-12% deep audit. Admit >= 4% deep audit, fault content/order/codes identical. Unit:
  objective engine; owns ContractCompiler.ts; after S3.
- S6 diagnostic union asks the compiled guard first (audit anyOf: guard acceptance returns
  empty; oneOf: count guard matches, build reports only when count != 1; explain anyOf: guard
  acceptance implies parse identity). Re-roots row 6: preview 3.1% on valid deep audit is the
  losing variants' fully built discarded reports, not misfiring fault text. Predict 15-40% deep
  audit on union shapes, zero without. Admit >= 10% union fixture, <= 2% regression union-free,
  zero S7 differences; compile-cost delta reported and bounded by full-contract figures.
  Guide rows (compileAuditor/compileReporter union sentences) restated in the same unit.
  Unit: Opus implementer (spans correctness and documentation voice); owns ContractCompiler.ts,
  its test, guides/contract.md; after S5.
- S4 one containment per compiled plan (try/catch in the returned closure replaces
  attempt-closure + Result per plan body); `attempt` itself unchanged everywhere else. M-A
  unresolved-in-isolation is why this decides at library level only. Admit >= 5% medium is AND
  falling GC entries per million calls (PerformanceObserver gc); else refused and recorded.
  Acceptance form: containment count per compiled plan exactly one, outermost; adversarial
  never-throws test extended to every plan kind and family. Unit: Opus implementer; owns
  ContractCompiler.ts + test; last.
- S7 differential answer parity vs published 0.0.14 dist, one process loading both, all six
  artifacts answer-for-answer over suite fixtures + generated declarations (width, depth,
  sparsity, sharing, union arity). Control: seeded difference must be reported before any
  clean reading counts. Campaign instrument only, never in the package tree. Unit: objective
  engine; campaign instruments; parallel with S2. Deciding timing runs belong to the
  Orchestrator on the host after each unit exits.

## Excluded

- E1 de-Reflect (M-D tie inside identity spread; guide publishes INTRINSICS limit as a limit).
- E2 dropping the internal freeze from enumerableKeys/readArrayEntries: frozen returns are
  documented public behavior (guides/contract.md:216,219); 47 ns is ~2% of a medium is call;
  a second unfrozen key lens contradicts "THE package-wide runtime property view" and drifts.
  Recorded measured-and-unclaimed.
- E3 type-level work stays excluded on typefixture.out; coverage limits recorded (createContract
  generic instantiation not exercised; typeToString hover cost unmeasured).
- E4 the 177x headroom is a bound, never a target (the hand guard omits brand test, exotic-view
  refusal, corroboration, containment).
- E5 guard-first at the audit/explain DOORS (distinct from S6): a bet on the caller's mix that
  doubles work on the input audit exists for; product policy belongs to the caller.

## Order

Wave A parallel, disjoint: S7 + S2. Wave B strictly serial on ContractCompiler.ts from
committed checkpoints: S1 -> S3 -> S5 -> S6 -> S4 (S4 last because it rewrites every plan
body's containment and is the row most likely refused at its own probe).

## Exit

Each capability ends implemented, refused-at-threshold-and-recorded, or intentionally excluded
with evidence: presence machinery (S1), array reads (S2), containment allocation (S4, attempt
retained either way), internal freeze (E2 excluded), declaration re-reads (S5), valid-walk
fault work resolved to union fan-out (S6), type level (E3 excluded), de-Reflect (E1 excluded),
tracking memo repaired to multiplicity (S3, tree predicate recorded refuted), answer parity
(S7 zero differences with seeded control), guide parity (union sentences + one principle line;
no nanosecond figures in the guide), public surface retained unchanged.

## Verdict

S2 is the single highest-value strategy (10-20% medium is, 15-30% deep is/audit, unconditional
across array-bearing shapes, on the pack's largest mechanism ratio); S1 the most certain; S6
the largest conditional.
