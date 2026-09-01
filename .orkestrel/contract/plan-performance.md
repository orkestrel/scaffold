# Plan — measured performance campaign for contract (reconciled 2026-09-01)

Reconciled by the Orchestrator from the subjective lane (planner, Opus 5) and the objective
lane (Opus 5 substituting the dark Sol bench; Codex excluded by the user's instruction). Lane
returns: `design-performance-subjective.md`, `design-performance-objective.md`, both blind on
`design-performance-brief.md`.

## Attribution corrections adopted

The objective lane's dist-line readings replace the labels in `probe-attribution-report.md`:
`index.js:2395` is the `attempt` arrow inside `readArrayEntries`; `index.js:6834` is the
`#trackGuard` closure; `index.js:7495` is the contained object-walk arrow. `index.js:2176`
stands as labeled (the eager diagnostics `attempt` in `readValue`).

## Collisions and the surviving mechanism

- Arrays: the objective order-aware sort-skip survives (smaller diff, every refusal untouched,
  the sort branch stays reachable and testable through a descending-`ownKeys` trap). The
  subjective certification-inside variant is the recorded successor if the A/B under-delivers.
  Both lanes refuse the brief's honest-packed form; the maximum-sparse pins and the
  length-domain doctrine refuse it outright.
- Presence: the objective bitmask survives (duplicate-immune, preserves the `enumerableKeys`
  lens, carries a named fallback past the mask width). The subjective counting form is refused
  by the duplicate-key question the mask dissolves. `Object.hasOwn` on the caller value is
  refused on the enumerability trap (a non-enumerable own required key would pass `is` while
  the parser treats it as missing). The compile-constant collection hoists ride with this row.
- Tracking ledger: the objective single-slot promotion survives (no graph analysis, exact memo
  semantics for every value graph, wins the common one-object case for every node). The
  subjective multiplicity predicate is recorded not taken: `#discover` records no sharing, and
  a propagation error would reintroduce the exponential walk silently.
- Diagnostic leaves: the objective unrefined-leaf refinement gate lands first (zero output
  change). The subjective refined-leaf capture is the conditional successor row, admitted only
  if the remaining `readValue` frame still clears its bar after the gate lands.
- Unions: the objective first-clean-report break for `anyOf` survives (no added compile cost).
  The subjective guard-first form is refused on its own stated compile-cost risk. `oneOf` is
  unchanged this campaign. The row ships with the behavior ruling (a later variant's coded
  refusal no longer throws), its guide sentence, and a new pin — or not at all.
- `attempt` containment: probe-only, LAST, on the tree the landed rows leave. Admission is the
  union of both lanes' bars: >= 15% median on medium `is` AND falling GC entries per million
  calls. Below that it is recorded refused; `attempt` stays everywhere regardless.
- Lazy `readValue` diagnostics: EXCLUDED by Orchestrator ruling. The eager projection is the
  reader doctrine's refusal (an unreadable advertised container refuses even when the read
  succeeds); changing observable refusal behavior to buy one family 5-9% is a rescope that
  belongs to the user. The behavioral probe records the shipped behavior as intended.

## Probe round (before any writer; all Orchestrator-owned host runs)

- P0 differential answer-parity instrument vs published 0.0.14 (all six artifacts, suite
  fixtures + generated declarations), with a seeded-difference control proven first.
- P1 `preview` call-count under deep-audit — zero calls refutes the union row.
- P2 WeakMap construction vs slot write, isolated (the pack measured reads, never construction).
- P3 M-B rerun, corrected form (keys array timed in every variant; bitmask candidate).
- P4 type-fixture extension: `createContract` tier and optional-key tier; exclusion stands
  within 2x of the t2 instantiation figure per equivalent key count and under 0.30 s check.
- P5 `readValue` hostile-options-with-successful-read behavioral record (for the exclusion).
- Per-unit dist-level surgical A/B gates each implementation unit at its declared threshold
  BEFORE the writer is dispatched; the A/B baseline is the tree the previous accepted row left.

## Units and routing ledger

Writers serialize in the contract checkout from committed checkpoints; every deciding timing
run is the Orchestrator's own host process after the unit exits. Sol is dark all campaign, so
every lane below that names Sol carries the recorded Opus substitution.

| Unit | Subject | Role / engine | Owns |
| --- | --- | --- | --- |
| U1 | Order-aware array snapshot | `implementer` / Opus 5 (Sol work class, substitution recorded) | `src/core/helpers.ts`, `tests/src/core/helpers.test.ts` |
| U2 | Presence bitmask + constant hoists | `implementer` / Opus 5 (substitution) | `src/core/ContractCompiler.ts`, `src/core/constants.ts`, `tests/src/core/compilers.test.ts` |
| U3 | Single-slot tracking ledger | `implementer` / Opus 5 (substitution) | `src/core/ContractCompiler.ts`, `tests/src/core/ContractCompiler.test.ts` |
| U4 | Unrefined-leaf refinement gate | `implementer` / Opus 5 (substitution) | `src/core/ContractCompiler.ts`, `guides/contract.md:596` precision |
| U5 | anyOf diagnostic short-circuit + ruling | `implementer` / Opus 5 (native subjective route: guide voice) | `src/core/ContractCompiler.ts`, `tests/src/core/compilers.test.ts`, `guides/contract.md` |
| U6 | Refined-leaf capture (conditional on post-U4 frame) | `implementer` / Opus 5 (substitution) | `src/core/ContractCompiler.ts` |
| U7 | `attempt` probe (conditional; implement only past its bar) | Orchestrator probe, then `implementer` / Opus 5 | probe: scratchpad; unit: `src/core/ContractCompiler.ts`, its test |

Audit per unit: an Opus lane that did not write it (clean context; `reviewer` for design fit,
a clean objective lane for correctness per the audit step's triggers), `checker` where criteria
are mechanical, `verifier` for authoritative gates. `orkestrel-falsify` shapes multi-round
audits.

Admission thresholds (declared here, before any run): U1 >= 8% medium `is`; U2 >= 6% medium
`is` and >= 4% deep `audit`; U3 >= 5% medium `is` with the 30-level chain under 1000 ms and
the alternating graph within 2x; U4 >= 4% deep `audit`; U5 `preview` probe fires and >= 5% on
the union fixture with <= 2% union-free regression; U6 >= 4% deep `audit` after U4; U7 >= 15%
medium `is` with falling GC entries. Every unit: zero P0 differences over the corpus. The A/B
harness identity spread (0.81-0.99 under load) is why no threshold under 4% exists anywhere in
this table.

## Exit criterion (fixed now; a re-baseline may change units, never this)

- Array snapshot cost: U1 implemented or refused at threshold.
- Presence machinery: U2 implemented or refused.
- Tracking-ledger allocation: U3 implemented or refused, with the test:443-510 control
  amendment (re-derived from a promotion-forcing value; the buildDelta half untouched).
- Clean-leaf diagnostic work: U4 implemented or refused; U6 by its condition.
- Union diagnostic fan-out: ruled by P1, then U5 implemented with ruling and pin, or refused.
- `attempt` containment: ruled by U7's probe at its bar; refused is a valid closure.
- Lazy `readValue` diagnostics: excluded on the reader doctrine, P5 recorded.
- Internal freezes: excluded (both lanes), the 47 ns recorded measured-and-unclaimed.
- De-Reflect: excluded on M-D.
- Type level: P4 tiers measured; exclusion confirmed at the declared threshold or a unit opened.
- Answer parity: P0 zero differences for every landed row, seeded control proven.
- Baselines restated: ops and heap instruments re-run on the accepted tree, recorded beside the
  2026-09-01 figures under the same coverage statement.
- Guide parity: union sentences restated where U5 lands; no nanosecond figures in the guide;
  the 177x headroom recorded as a bound, never a target.
- Gates green (`format:check`, `lint:check`, `check`, `build`, `test`), both repositories
  committed and pushed to `claude/method-memoization-contracts-yus26p`.
