# Unit design-performance — objective lane return (Opus 5 substituting dark Sol)

Returned 2026-09-01. Lane held correctness, constraints, what code and contracts permit.
Condensed record; the full argument is in the session transcript and the reconciliation names
what it rests on.

## Attribution corrections (dist lines read directly)

- `index.js:2395` (23.4% of medium is) = the `attempt` arrow inside `readArrayEntries`
  (helpers.ts:1023-1024), not generic protected-read machinery.
- `index.js:6834` (11.0%) = the closure `#trackGuard` returns (ContractCompiler.ts:589-592).
- `index.js:7495` (10.1% of deep audit) = the contained object-walk arrow holding both
  `collectMembers` calls (ContractCompiler.ts:1442).
- `index.js:2176` (9.1% of deep audit) confirmed: the eager diagnostics `attempt` in
  `readValue` (helpers.ts:759-760).

## Strategies

- S1 order-aware array snapshot INSIDE `readArrayEntries`: sort only when reflected arrival is
  not ascending; reuse the computed key string for the own-membership re-check. Keeps
  reflection, both freezes, every refusal. Predict 8-13% medium is (explicitly not 76x — M-C's
  unreflected walk is refused). Admit >= 8% medium is; fixture outcomes identical over packed,
  sparse, native-maximum-sparse, descending-ownKeys proxy, throwing-index proxy. Owns
  helpers.ts + helpers.test.ts (descending-trap case).
- S2 presence bitmask: compile-time null-prototype `positions` record; per call OR
  `1 << positions[key]` over the captured keys, compare to the full mask; named constants.ts
  bound with the current collection form as fallback past 32 required keys. Hoist the
  compile-constant collections (`collectMembers(declaredKeys)` at :1444, `known` at
  :1691-1696). REFUSES hasOwn-on-value (answers true for non-enumerable own keys that
  `enumerableKeys` excludes — guard would accept what the parser treats as missing).
  Duplicate-immune by construction. M-B ruled unfair (keys array timed in one variant only) —
  rerun corrected. Predict 6-11% medium is, 5-8% deep audit. Admit >= 6% / >= 4%; four-door
  matrix identical. Owns ContractCompiler.ts, constants.ts, compilers.test.ts cases.
- S3 single-slot call ledger: keep tracking on every repeating node; represent the per-scope
  memo as an inline one-entry slot (scope tag, value, answer), promote to WeakMap on the second
  distinct object, carrying the entry. Refutes candidate row 9 both halves: the ledger defends
  the VALUE graph (ContractCompiler.ts:556-561 records a tree declaration measuring 524286
  reads / 4.4 s), and `#discover` records nothing about sharing (line 457 skips the repeat).
  Pack gap: map CONSTRUCTION never measured — isolated probe first. Predict 5-9% medium is.
  Admit >= 5%; 30-level chain < 1000 ms; hostile alternating graph (two distinct objects per
  level) within 2x of shared; control amendment at ContractCompiler.test.ts:443-510 (re-derive
  the calledFew/calledMany control from a value that forces promotion; buildDelta === 0 half
  untouched). Owns ContractCompiler.ts + its test.
- S4 compile-time refinement gate on diagnostic leaves: unrefined string/number/array nodes
  skip create*Faults and return a fresh empty list; refined nodes keep the helper unchanged
  (its readValue door exists for caller-supplied shapes; the compiled door's shape is the
  package's own frozen clone). Predict 5-9% deep audit. Admit >= 4%; reports byte-identical
  over the four-door matrix. No shared frozen empty array (publication identity is a separate
  ruling). Owns ContractCompiler.ts + guide precision at contract.md:596.
- S5 anyOf diagnostic short-circuit: break the variant loop at the first clean report when
  `exclusive` is false; oneOf keeps its tally. Re-roots preview 3.1%: the losing variant's
  complete report built at :1507 and discarded at :1514-1515; guard and parser already stop at
  first accept. GATE: preview call-count probe under deep-audit BEFORE any edit — zero calls
  refutes the row. Behavior change stated plainly: a later variant's coded refusal (hostile
  prototype probe at :1424) no longer throws; nothing pins the throw; ships with the ruling in
  the guide and a new pin, or not at all. Admit >= 5% deep audit union fixture. Owns
  ContractCompiler.ts, compilers.test.ts, guide union row.
- S6 lazy readValue diagnostics: move the eager diagnostic projection into the failure branch.
  NEEDS a doctrine ruling first (is the options record an advertised read per
  guides/contract.md:5); behavioral probe of the shipped door first; sequence last; drop if
  the ruling goes the other way. Predict 5-9% deep audit.
- S7 extend the type fixture BEFORE recording the exclusion: a createContract tier (the
  documented primary entry point — no existing tier calls it) and an optionalShape-carrying
  wide tier (the InferObject branch no tier reaches). Exclusion stands when both stay within
  2x of t2's 2530 instantiations per equivalent key count and check under 0.30 s.

## Excluded

- Honest-packed fast path (row 2 as written): undetectable anomaly without the reflection it
  skips; refused by the native-maximum-sparse pins (helpers.test.ts:636, compilers.test.ts:3406,
  :3791) and the length-domain doctrine (helpers.ts:1006-1008). S1 survives.
- Dropping the enumerableKeys freeze (row 4): frozen list is a documented public return
  (helpers.ts:1144, contract.md:219, helpers.test.ts:989-1000 — a guarantee pin); 47 ns does
  not buy a public contract change.
- Tree-declaration tracking skip (row 9 as written): both halves fail; S3 survives.
- De-Reflect (row 8): M-D tie.
- attempt -> try/catch (row 3): not admitted to the implementation order; probe-only, LAST,
  against the tree S1-S3 leave (they remove most of the allocation inventory the GC argument
  rests on); admission >= 15% medium is; the containment's earlier deletion is recorded as a
  defect at helpers.ts:709-716.

## Order

S7 immediately in parallel; then S1, S2, S3 (one writer at a time, each A/B against the tree
the previous row left); S4; S5 only if its preview probe fires; S6 last and only after its
ruling; the row-3 probe after S1-S3 on the moved baseline.

## Exit

Every capability implemented, repaired, retained, or intentionally excluded on evidence;
answer-identical fixture receipts per landed row; baselines re-run on the accepted tree and
recorded beside the 2026-09-01 figures; the 177x headroom stays a bound, never a target.

## Verdict

S1 order-aware snapshot: predicted 8-13% of medium is, single largest correctly-attributed
frame, one file, preserves every array refusal — all it removes is a sort of an already-sorted
list.
