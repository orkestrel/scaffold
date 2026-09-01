# Unit design-memoization — objective lane return

**Lane:** objective — correctness, constraints, invariants, and what the code and contracts actually permit. Held on Opus 5 because the Sol bench is dark (substitution recorded in the brief). I did not argue naming, ergonomics, or API taste.

---

# Rulings

## Candidate: lazy bundle — REJECT

Four independent grounds, each sufficient.

1. **Deferred refusal escapes the door's containment.** `createContract` is `contain(() => new ContractCompiler(shape).contract, 'createContract')` (`/home/user/contract/src/core/compilers.ts:368`). Today every compile failure leaves that call wrapped by the `createContract` door. Under a lazy bundle `contain` wraps only the accessor object's construction; a refusal raised at first member read arrives after `contain` returned, so it carries no door attribution. That changes the error surface for every consumer named in the ecosystem report.
2. **The ownership snapshot moves from call time to first-read time.** `types.ts:998-1002` defines LOCKSTEP as "derived from one owned snapshot of the shape." `#prepare` (`ContractCompiler.ts:373-394`) is what takes that snapshot through `ownShape(source)`. A lazy bundle defers `#prepare` past the `createContract` return, so a caller that mutates the declaration between the call and first use gets a different snapshot than the same program gets on 0.0.13. The lockstep guarantee's temporal anchor is the call; moving it is a behavioural change no type delta records.
3. **It inverts the retention it was raised to fix.** The eager bundle holds only compiled closures, and each closes over the child entries it needs rather than over the compiler (`ContractCompiler.ts:160-163`), so the `ContractCompiler` instance is collectable the moment `createContract` returns. A lazy bundle must retain the compiler for the bundle's whole life — the shell the probe measured at 1152 B, plus, per the probe's small-shape inversion (1951 B bundle against 2324 B guard-only), the node index and plan arrays a partial consumer never releases. A long-lived partially-used lazy bundle retains strictly more than today's eager one.
4. **Zod's caching form is measured unavailable here.** The probe recorded `TypeError: Cannot define property parse, object is not extensible` for a self-overwriting getter on a frozen instance, and `Object.isFrozen(bundle)` is pinned at `tests/src/core/ContractCompiler.test.ts:103`.

Correcting the brief's framing on one point: the pins at `tests/src/core/ContractCompiler.test.ts:102-109` and `181-182` are **survivable** under a lazy bundle built from own enumerable accessors frozen in place, and `ContractInterface` (`types.ts:1017-1052`) needs no delta because a getter-backed property satisfies a `readonly` data member. The pins are not what kills this seam. Grounds 1 through 3 are.

## Candidate: shared release sentinels — ADOPT, extended

The correctness question the brief raises ("prove nothing ever mutates a sentinel after release") resolves cleanly. Every writer of `#nodes`, `#order`, `#stack`, and the plan arrays sits behind `#prepare` (`ContractCompiler.ts:373-394`), which raises `ContractCompiler: the retained declaration is unavailable` whenever `#source` is undefined — and `#release` clears `#source` in the same assignment run that installs the sentinels (`357-369`). The two release callers are `#collect` (347-352), which fires only when every root exists so each `#buildX` short-circuits on its cached root (`586-588`, `743-745`, `916-918`, and the same shape at 1212, 1478, 1740), and `#fail` (338-342), which settles the compiler so `#enter` throws before any build (303). No write reaches a sentinel.

A static field initialises while the class is defined — the same moment `static readonly #weakMap` is captured (`ContractCompiler.ts:127`) — so the sentinels are allocated strictly earlier than the constructor and inherit exactly the module-ordering limit the class comment at 121-127 already states and does not defend. `#release` still assigns preconstructed peers only and constructs nothing, so its stated invariant (354-356) holds unchanged.

## Candidate: per-family release — REJECT as stated; corrected form deferred

**As stated it is incorrect.** Releasing `#guards` when `#guard` exists breaks the union path: `#parserOf` reads child guards at `ContractCompiler.ts:1150`, `#reportOf` at `1688`, and `#seedOf` at `1933`, all through `#guardAt` (`758-765`). A consumer reading `guard` then `parse` on a union declaration would meet `ContractCompiler: a child guard is unavailable` (761).

**The corrected form does not close the finding it was raised for.** The probe's small-shape inversion is dominated by `#nodes`, `#index`, and `#order`, which a partial consumer must keep because any later getter's build loop reads them. Per-plan release cannot touch them without abandoning "pay for artifacts as you ask for them" (`guides/contract.md:939-941`). The corrected rule — release `#schemas` after `#schema`, `#parsers` after `#parser`, `#audits` after `#auditor`, `#reports` after `#reporter`, `#seeds` after `#generator`, `#guards` only after `guard`, `parser`, `reporter`, and `generator` all exist — buys a partial release for extra branching in a path that runs after every build. Defer it; the trigger that reopens it is a measurement showing plan arrays dominating a released compiler's retained heap.

## Candidate: retain the current design — ADAPT

The compiler already is the memoized lazy door: each getter caches its root and replays it, and `createContract` is that class with every artifact requested. That much is right, and it is why the bundle seam is the wrong place to adopt anything. But "documentation only, no code change" is falsified by the seam the candidates miss.

## Seam the candidates miss: the per-node tracking memo is allocated dead — ADOPT

`#trackGuard` allocates a `WeakMap` at build time (`ContractCompiler.ts:524`) and `#trackFaults` does the same (`559`). **Neither is ever read.** Inside the returned closure, `ContractCompiler.#scope` is at least 1 on every path — an opening call increments `#visits` and assigns it (`529-530`), and a non-opening call inherits a nonzero outer scope — while `filled` starts at 0. So `filled !== scope` holds on the first call, the refresh branch (`534-537`, `569-572`) replaces the memo, and the build-time instance is discarded before line `538`/`573` ever reads one.

This is not a design preference. It is an allocation that is provably unreachable as a read, and it **escapes into the published artifact**: the tracked closure captures `memo`, and the closure is what `compileGuard`, `compileAuditor`, `compileReporter`, and the bundle's `is`, `audit`, and `explain` hand out. The compiler is collected; the dead `WeakMap` is retained by the artifact until its first call, and forever if the artifact is never called. One per node where `#repeats` holds (`516-520`: array, object, union, optional, nullable), per tracking family.

## Seam the candidates miss: the reentry poison per entry — DEFER

`#enter` constructs a `ContractError` on every entry (`311-314`), and a reentry settles the compiler terminally (`305-306` → `#leave` `321` → `#fail` `338`), so at most one poison is ever thrown. Caching it per compiler on first entry is observationally identical and still precedes observation, as the comment at `308-310` requires. The saving is one `Error` allocation per getter read beyond the first, it does not reach the `createContract` path the guide leads with, and the probe did not measure it. Reopen it if a measurement attributes a material share of the multi-getter path to it.

---

# Proposal

Recommended set, in dispatch order: M1, then M2, then M4. M3 is named for the record and excluded on evidence.

## M1 — remove the dead tracking-memo allocation

- **Type-contract delta:** none. `src/core/types.ts` is untouched.
- **Seam:** `/home/user/contract/src/core/ContractCompiler.ts:522-547` (`#trackGuard`) and `555-581` (`#trackFaults`).
- **Change:** declare `memo` as `WeakMap<object, boolean> | undefined` and `WeakMap<object, readonly T[]> | undefined`, initialised to `undefined`; widen the existing refresh condition at `534` and `569` to `memo === undefined || filled !== scope`. TypeScript narrows `memo` to non-undefined at the merge point, so the reads at `538`/`573` and the writes at `541`/`576` need no assertion and no guard. This satisfies "Absence is `undefined`" and adds no field, no static, and no shared mutable collection.
- **Pins moved:** none. Every terrain-report pin — own-key order and freeze (`tests/src/core/ContractCompiler.test.ts:102-103`), per-root and bundle replay identity (`94-100`, `104-109`), the getter set (`47-56`), terminal replay through `contract` (`181-182`), the `get contract()` TSDoc (`ContractCompiler.ts:270-277`), the getter-order comment (`1989-1990`), `guides/contract.md:906`, `941`, `953`, and the `createContract` TSDoc (`compilers.ts:349-352`) — reads the same after the change.
- **Effect against the probe:** removes retained heap from the deep-shape readings (guard-only 18878 B, `createContract` 52512 B) and from every artifact `compileGuard`, `compileAuditor`, and `compileReporter` publish. The probe report gives no per-node decomposition of those figures, so the magnitude is unmeasured and this unit measures it.
- **Acceptance, cheap first:**
  1. `npm run lint:check` and `npm run check` exit 0.
  2. `grep -n 'new ContractCompiler.#weakMap()' src/core/ContractCompiler.ts` reports the constructor's index pair and the in-closure refresh sites at `535` and `570`, and no initialiser on either `let memo` declaration.
  3. The diff contains no `as`, no `!`, and no suppression comment.
  4. `npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts tests/src/core/integration.test.ts` is green at the same pass counts as the pre-change run the unit records first.
  5. A test in `tests/src/core/ContractCompiler.test.ts` proves per-call memo isolation survives: compile one guard over a shape with a shared object child, call it twice with the same value mutated between calls, and assert the second call answers against the mutated value rather than a retained verdict.
  6. **Observation, not a criterion:** the unit re-runs `.orkestrel/contract/contract-baseline.mjs` on Node v22.22.2 and reports its deep-shape medians beside the recorded 18878 B and 52512 B. The Orchestrator takes the deciding reading after the unit exits.

## M2 — hoist the release sentinels onto the class

- **Type-contract delta:** none. `src/core/types.ts` is untouched.
- **Seam:** field declarations `ContractCompiler.ts:142-182`, constructor `189-219`, `#release` `357-369`, `#locate` `465-474`, and the existing `static {}` block at `2009`.
- **Change:** convert each `readonly #emptyX` array field to `static readonly #emptyX` and freeze each through `INTRINSICS.freeze` in the `static {}` block; drop `#emptyIndex` entirely and type `#index` as `WeakMap<ContractShape, number> | undefined`, with `#release` assigning `undefined` at `361` and `#locate` raising its existing coded refusal (`468-471`) when the index is undefined. Declare each sentinel with its mutable element type and freeze it in a separate statement, because `Object.freeze` returns `readonly T[]` and no assertion is permitted.
- **Pins moved:** none. Every released field is a `#` private with no observable identity; no test in `tests/src/core/integration.test.ts` reads them.
- **Effect against the probe:** targets the measured 1152 B cold-constructor shell, which the probe attributes to "the paired empty release siblings (arrays and WeakMap instances) per instance" and estimates a shared-sentinel design "could remove most of." The probe does not decompose the 1152 B, so the estimate is the probe's and this unit measures the result. The shell is paid once per `compileGuard`, `compileParser`, `compileAuditor`, `compileReporter`, `compileGenerator`, and `compileSchema` call, each of which builds a fresh compiler and drops it (`compilers.ts:329`).
- **Acceptance, cheap first:**
  1. `npm run lint:check` and `npm run check` exit 0.
  2. The diff contains no `as`, no `!`, no suppression comment, and no construction inside `#release`.
  3. `npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts tests/src/core/integration.test.ts` is green at the recorded pre-change counts, including the release test at `112-136` and the terminal-replay test at `169-183`.
  4. A test proves sentinel sharing does not cross-contaminate: drive two compilers over different declarations past release, then assert each still answers its own guard, parser, and schema correctly, and that a third compiler constructed afterwards refuses a malformed declaration with its own coded error.
  5. A test proves the released-then-reused path still refuses: settle a compiler through `#fail` by reading a malformed declaration, then assert every later getter rethrows that exact error by identity (extends the existing `181-182` assertions to the remaining getters).
  6. **Observation:** re-run `contract-baseline.mjs` and report the `new ContractCompiler` cold column against the recorded 1152 B for all three shapes.

## M3 — narrow `#collect` per plan array — EXCLUDED on evidence

Recorded so the exclusion is auditable, not dispatched. Correct form and its defect are under the candidate ruling. Reopen on a measurement attributing a material share of a released compiler's retained heap to plan arrays rather than to `#nodes`, `#index`, and `#order`.

## M4 — publish the retention rule the compiler door implies

- **Type-contract delta:** TSDoc only, on `ContractCompilerInterface` in `src/core/types.ts:1054-1082`. No member, no signature, no property changes.
- **Seam:** `types.ts:1054-1082` and `guides/contract.md:939-941`.
- **Change:** state the rule the code holds and the published prose omits — a compiler retains the owned graph, the node index, and the traversal order until every artifact exists, so a compiler read for one artifact and kept alive retains its working set for its whole life, while a compiler that is read and dropped (the standalone `compile*` pattern) retains nothing. State the rule without a heap figure, because a published guide must not carry a number its reader cannot reproduce.
- **Pins moved:** none behaviourally. `guides/contract.md:939-941` gains a following paragraph; the sentences at `906`, `941`, and `953` stand unchanged.
- **Acceptance, cheap first:**
  1. `npm run lint:check` exits 0.
  2. `npx vitest run tests/guides.test.ts` is green; any added fence executes rather than sitting inert.
  3. The parity test covering `guides/contract.md` is green and no backticked API in the added prose resolves to a non-export.
  4. The added prose carries no numeral from the probe report.

## Destructuring, answered for this proposal

`const { parse, is, audit, explain, generate, schema } = createContract(shape)` keeps working, and so does `{ ...contract }`. Nothing in M1, M2, or M4 touches `#buildContract` (`1986-2007`): the bundle stays a frozen plain object of own data properties, and each member is a self-contained compiled closure that closes over the child entries it needs rather than over a receiver (`ContractCompiler.ts:160-163`), so a destructured member carries no `this` dependency. The eager bundle is what makes destructuring free; the rejected lazy bundle is what would have made a spread compile every artifact at the spread site.

---

# Risks

Ranked by the damage times the plausibility of the condition that realizes it.

1. **M1's behaviour-preservation argument is wrong about `#scope`.** Condition: some reachable path enters the tracked closure with `ContractCompiler.#scope` equal to `filled` on a first call, making the build-time memo readable rather than dead. Settle it before implementing, with a test that counts memo constructions across a call sequence over a shared value graph. Acceptance criterion 5 of M1 is the guard; a red result there means the ruling was wrong and M1 stops.
2. **The saving is too small to justify the release wave.** Condition: the M1 and M2 re-runs report reductions inside the probe's own under-5-percent round-to-round variance. Then the campaign ships M4 alone, which obliges no consumer. Take the deciding readings yourself after each unit exits, as medians of 3 with the CONTROL_ARRAY control passing, because a unit's own reading is taken under its own exec's resident load.
3. **The release cascade lands on a fleet with a disagreeing pin.** Condition: `@orkestrel/supervisor` still declares `@orkestrel/contract` `^0.0.11` while every other consumer declares `^0.0.13` (ecosystem report). An install graph holding both installs two copies and the compiler reads them as distinct types. Settle with `npm ls @orkestrel/contract` against a real install graph before any publish, not after. This risk exists whether or not this campaign ships; shipping surfaces it.
4. **M2's static sentinels change the class's initialisation-order exposure.** Condition: a consumer module evaluated before `ContractCompiler` replaces an array intrinsic in a way that reaches an array literal. It does not — `[]` uses the intrinsic prototype regardless of `globalThis.Array` — so the exposure is the same limit `constants.ts` states and `ContractCompiler.ts:121-127` records. Evidence that would settle it: the existing intrinsic-hardening sweep in `tests/src/core/integration.test.ts` extended to run with the array and `WeakMap` globals replaced before the class is imported.
5. **A consumer depends on `createContract` refusing at the call.** Inert under this proposal, because the lazy bundle is rejected. Recorded so a later reconsideration of that seam inherits the finding rather than rediscovering it.
6. **M4's prose outlives the code it describes.** Condition: a later change to `#collect` moves the retention rule and the guide is not scoped with it. Evidence needed: the added sentence names a behaviour a test can break, so pair it with the release test at `tests/src/core/ContractCompiler.test.ts:112-136`.

---

# Exit criterion

The campaign ends when each capability below is implemented, repaired, retained, or intentionally excluded on evidence, and the gates `npm run format:check → npm run lint:check → npm run check → npm run build → npm test` are green from an independent `verifier`.

- **Dead tracking-memo allocation** — removed from `#trackGuard` and `#trackFaults`, with the compile-time-to-first-call move proved by a test and the heap direction reported against the probe's deep-shape readings. (M1, implemented.)
- **Per-compiler release-sentinel allocation** — moved to class scope and frozen, with cross-compiler isolation proved by a test and the cold-constructor reading reported against 1152 B. (M2, implemented.)
- **Lazy bundle at `createContract`** — excluded on evidence, with the containment, snapshot-anchor, retention, and freeze grounds recorded in the commit message. (Excluded.)
- **Per-family plan release** — excluded on evidence, with the `#guardAt` consumer defect and the node-index dominance recorded, and the measurement that reopens it named. (Excluded.)
- **Per-entry reentry poison** — excluded on evidence, with the measurement that reopens it named. (Excluded.)
- **Partial-consumer retention rule** — published in `ContractCompilerInterface` TSDoc and the compiler section of `guides/contract.md`, with parity and the guide-fence suite green. (M4, implemented.)
- **Fleet pin disagreement** — `@orkestrel/supervisor`'s `@orkestrel/contract` range read from its own `package.json` and reported, so the user's release decision is taken against the real graph. (Repaired or reported; not this campaign's to fix.)

The release itself is not in the exit criterion. Any accepted unit moves `dist/` materially and puts `contract` in the next wave; the wave is the user's decision, and the L1 through L6 cascade the ecosystem report enumerates follows it rather than this campaign.

---

# Flagged

Claims of mine the evidence slice does not fully ground.

- **The `| undefined` form in M1 type-checks without an assertion.** I reasoned it from TypeScript's control-flow narrowing at the merge point after `if (memo === undefined || filled !== scope) { memo = new … }`. The lane is read-only and ran no compiler. The unit must confirm it against `npm run check` before relying on it; the fallback is a local `const active` narrowed inside the branch.
- **A frozen shared empty array makes a post-release write a loud TypeError.** True for a strict-mode indexed write on a frozen array, and ES modules are strict. Not executed here.
- **The size of every saving.** Neither M1 nor M2 has a measured magnitude. The probe report decomposes neither the 1152 B shell nor the deep-shape readings, and I did not run its instruments. Every effect statement is a direction, not a size.
- **The consumer artifact-usage argument.** Labelled as an argument from the package's own API rather than a measurement: `guides/contract.md:906` and `917` lead with `createContract`, `939-940` presents `ContractCompiler` as the door for one artifact, and each standalone `compile*` function builds a fresh compiler and takes one root (`compilers.ts:329`). No fleet-wide usage reading exists, and the ecosystem report leaves it open.
- **`#stack` is drained to empty by `#discover`'s loop, so its sentinel buys nothing on the success path.** Read from the loop condition at `ContractCompiler.ts:398`; I did not read the loop body's truncation in full, so the claim rests on the loop's exit condition alone. It affects only how M2 justifies keeping the stack sentinel, not whether M2 is safe.
- **No test or guide pins the compiler shell's allocation.** Derived from a grep of `tests/src/core/integration.test.ts` for `release`, `Array.prototype`, and `WeakMap`, and from reading `tests/src/core/ContractCompiler.test.ts:1-200`. I did not read the whole test tree.
- **The reentry poison is thrown at most once per compiler.** Derived from `#enter` at `303-306` and `#fail` at `338-342`. Not executed.
