# Unit design-perf2 — subjective lane report (planner / Opus 5, clean context)

## 1. Rulings

**A1 packed-array fast path — ADOPT.**
Mechanism: `readArrayEntries` keeps one walk and compares each reflected member against a frozen module-level index-text table, falling through to `INTRINSICS.text(position)` past the table's end, then copies entries directly when every canonical index arrived in order and the reflected population equals `length`; the `Object.hasOwn` corroboration and the single indexed read stay. Do not build a second algorithm behind a size gate — a table that runs out must degrade only in speed, never in which code path answers.
Owned: `src/core/helpers.ts`, `src/core/constants.ts`, `tests/src/core/helpers.test.ts`.
Naming: one frozen `INDEX_TEXTS` constant in `constants.ts` and no companion limit constant. A separate `INDEX_TEXT_LIMIT` stores a fact `INDEX_TEXTS.length` already carries, and the Derive-state law refuses the second copy that can drift.
Tests: `readArrayEntries` answers identically at the table's last index and one index past it; a sparse view, an out-of-order reflected view, and a length/reflection disagreement each answer as today.
Contract: `guides/contract.md:216`. The guide row does not move; every clause it states still holds.
Probe first: the admission run under the 6-process rule.

**A2 lean `readValue` projection — TRANSFORM, then ADOPT.**
The probed form is inadmissible as written: bare `source.path` is an ordinary `Get` that walks to `Object.prototype`, which is exactly the defect `helpers.test.ts:573` pins. The surviving mechanism is an own-gated named projection — `INTRINSICS.own(source, 'path') ? source.path : undefined` for each of `path`, `shape`, `limit`, and `received` — assembled into one flat record, with the published `context` literal materialized only on refusal.
Rule on the behaviour difference in favour of the change. A context key the diagnostic never publishes carrying a throwing getter must not turn a read refusal into a different refusal about a field this package does not use. The reader doctrine binds a REQUIRED reader to refuse an incomplete **advertised** read; the advertised read is those field names, and nothing else. Narrowing the read to what is advertised is more faithful to the doctrine than the spread, not a relaxation of it.
Owned: `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, `guides/contract.md`.
Tests: a context carrying an unadvertised own key with a throwing getter still publishes the ordinary read refusal; the existing prototype-pollution case passes unchanged for every advertised field; a polluted `Object.prototype` still contributes nothing.
Contract: the reader doctrine at `guides/contract.md:5`. The guide moves: add the sentence naming the advertised field set as the whole read.
Probe first: grep the suite for a context fixture with an unadvertised own key, then run the `readValue` and auditor-context describes.

**A3b compile-time pattern capture — TRANSFORM.**
Refuse the bare fourth positional `RegExp`. The fault needs the rebuilt pattern and `readPatternSource`, so one value cannot carry the capture, and a loose tail parameter that silently overrides a field of the shape it sits beside gives the single source two truths for one fact.
Surviving mechanism: a `PatternCapture` plain data type in `src/core/types.ts` (`readonly pattern: RegExp`, `readonly source: string | undefined`), built at the compile site from the already-exported `readPattern` and `readPatternSource`, and passed as an optional trailing `capture` argument to `createStringFaults`. The helper stays the single construction site, declaration order `min`, `max`, `pattern` is untouched, and the shape accessor's fresh-`RegExp` contract is not read at all on the compiled path.
Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/ContractCompiler.ts`, `tests/src/core/helpers.test.ts`, `guides/contract.md`.
Tests: a supplied capture and the live shape produce byte-identical faults for the same shape, including the `limit` text; `shape.pattern` read twice from the shape still returns distinct objects; `lastIndex` on a caller's pattern never moves.
Contract: `guides/contract.md:391`, `395`, `700`, `597`. The guide moves: the `createStringFaults` row gains the capture argument and states that it is the same shape's pattern read once.
Probe first: 6-process admission on `audit`-deep and `explain`-deep; the medium families must not regress past 1.0.

**A6 lazy fault paths — TRANSFORM, probe before any unit.**
The probed ceiling is not reachable, and the reason is visible in the code: the auditor's object plan calls `readValue` with `context: { path, shape: 'object' }` at `ContractCompiler.ts:1555` and `1564` on every clean object, so the array must exist at every object container whatever the child plans do. Campaign one already excluded lazy `readValue` diagnostics, and that exclusion stands.
Surviving mechanism: a compiler-private trail record `{ parent, segment }` threaded through the plan signature, with one exported renderer that materializes the exact `readonly string[]` at each fault and at each container `readValue` context. On the medium fixture that removes the per-declared-field and per-index `pathOf` allocations and keeps one materialization per object node; the reporter, which makes no container `readValue` call on the clean path, keeps more of the saving than the auditor.
Do not overload `pathOf` with a second argument shape. A helper that runs a different algorithm depending on which shape its argument takes is the discriminator-parameter form the naming rule refuses; give the renderer its own name.
Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/ContractCompiler.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/ContractCompiler.test.ts`.
Tests: a shared faulted node still reports at every path the walk reached it through; no two faults share a path array identity; a caller-supplied root path still prefixes every fault; a published path exposes no caller iterator.
Contract: `helpers.test.ts:2407`, `compilers.test.ts:3773`, `ContractCompiler.test.ts:532`. The guide moves only if it names `pathOf` as the mechanism.
Probe first: a dist-level trail form that materializes at each fault and each container context, measured on clean and dirty deep fixtures. Refuse the row if that honest form reads above 0.95.

**A7 mask-based extra scan — TRANSFORM, ADOPT.**
The design reason outranks the measurement here: the extra-key fact is already computed in the presence pass through `INTRINSICS.own(positions, key)`, and the second loop recomputes the same fact through `matchesMember`. Two mechanisms answering one question is the drift the Derive-state law exists to stop.
Surviving mechanism: the presence pass notes that a key outside `positions` was seen, and the second loop runs only on that note. Treat the note as a hint, never as the verdict — `positions` is filled from `entries`, which skips a declared key whose child shape is absent, while `vocabulary` comes from `declaredKeys`. The second loop stays the sole decider of an `'extra'` fault, so fault order and population are unchanged by construction.
Owned: `src/core/ContractCompiler.ts`, `tests/src/core/compilers.test.ts`.
Tests: a closed object with an undeclared key reports `'extra'` at the same position in the same order; an open object still recurses into `additionalProperties`; a masked object with every key declared runs no second scan and answers identically at the mask width and one past it.
Contract: `PRESENCE_MASK_LIMIT` and the closed/open object rows. The guide does not move.
Probe first: 6-process admission, and a fixture with a declared property whose child shape is absent.

**A10 folded array guard — REFUSE.**
Refused on design as well as on measurement. `whereOf(arrayOf(item), bound)` composes published, tested combinators; a contained closure inside the compiler moves array-guard semantics into a second implementation of a rule the combinators own. The reading is inside the instrument's noise and the change costs the composition.

**A11 `preview` fast path — ADOPT, narrowed.**
Mechanism: for a string value, encode once through the captured `INTRINSICS.stringify` and return that result verbatim when its token length is strictly under `PREVIEW_LIMIT`; otherwise take the existing per-character walk. Apply the fast path only to the quoted string case — the symbol branch strips the quotes, and adding a `slice` dispatch to save a walk trades a diagnostic's speed for a caller-writable member on a published path.
Owned: `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`.
Tests: the fast path and the walk agree over a differential corpus covering ASCII, a control character, an escaped quote, a surrogate pair, a lone surrogate, and lengths at the cap, one under, and one over; a symbol still renders unquoted.
Contract: every `received` text. The guide does not move.
Probe first: derive the exact fits-predicate from `helpers.ts:1807` and `1817` rather than assuming it; the closing quote becomes an ellipsis at exactly `PREVIEW_LIMIT`.

**A8 ledger ceiling — REFUSE.** Below the bar, and the mechanism trades a documented cycle guarantee for noise.

**Lazy fault-array slot — REFUSE.** A clean container allocates one fresh array whether the slot opens at entry or at return, because the fresh-identity comment forbids a shared empty. The only form that saves anything returns a child's array as the parent's answer, which makes a parent's report and a leaf's report the same object. No probe needed.

**`oneOf` guard-first tally — REFUSE as a performance row; escalate as a contract question.** The reporter tallies `oneOf` with compiled guards (`ContractCompiler.ts:1976`) while its published law binds `explain` to `parse`, and its own leaves coerce through `parseString`. A value one variant accepts by coercion and no variant accepts by guard therefore gets a `matched: 0` report while `parse` succeeds. That is a defect probe, not a speed row, and it carries its own unit with its guide row if the fixture confirms it. Fixture: a `oneOf` of a string variant and a number variant, given a numeric string.

**Compile-tier heap — INTENTIONALLY EXCLUDED on evidence.** Lazy families are already the getter rule and `createContract` is documented eager lockstep; shared plan tables couple the `is` and `parse` domains the design splits; structural interning breaks node identity for cycles and `COMPILE_NODE_LIMIT` expansion counting. Record the exclusion rather than leaving the row open.

## 2. Units

Serialized, one writer at a time, each dispatched from a clean committed baseline. Every unit owns its own guide rows.

- **U1 admission probes (Orchestrator-owned).** 6-process re-reads of A1, A2, A3b, A7, and A11; the A6 trail-form ceiling probe; the `oneOf` coercion fixture; the A7 absent-child-shape fixture. Depends on nothing. Acceptance: each row reads a median across replicates and every replicate, recorded beside its parity result.
- **U2 A1.** Owns `helpers.ts`, `constants.ts`, `helpers.test.ts`. Depends on U1. Objective mechanical precision.
- **U3 A11.** Owns `helpers.ts`, `helpers.test.ts`. Depends on U2 (same file). Objective mechanical precision.
- **U4 A2.** Owns `helpers.ts`, `helpers.test.ts`, `guides/contract.md`. Depends on U3. Shape and documentation voice — it moves a doctrine sentence.
- **U5 A7.** Owns `ContractCompiler.ts`, `compilers.test.ts`. Depends on U1 only; runs after U4 for serialization. Objective mechanical precision.
- **U6 A3b.** Owns `types.ts`, `helpers.ts`, `ContractCompiler.ts`, `helpers.test.ts`, `guides/contract.md`. Depends on U4, U5. Shape and documentation voice — it names a public type and a parameter.
- **U7 A6, conditional on U1.** Owns `types.ts`, `helpers.ts`, `ContractCompiler.ts`, and the three test files. Depends on U6. Shape and documentation voice — it introduces a second path representation and its vocabulary.
- **U8 `oneOf` contract ruling, conditional on the U1 fixture.** Owns `ContractCompiler.ts`, `compilers.test.ts`, `guides/contract.md`. Shape and documentation voice.
- **U9 verification.** Independent gate run plus a fresh `ops` and `heap` capture against 0.0.15 baselines. Depends on every preceding unit.

## 3. Exit criterion draft

The campaign ends when each capability is implemented, repaired, retained, or excluded on recorded evidence:

- array-entry snapshot cost on the ordered dense view (A1) — implemented;
- read-diagnostic projection cost and the advertised-field rule (A2) — implemented, guide row moved;
- compiled string-refinement pattern cost (A3b) — implemented, or refused on its 6-process reading;
- diagnostic path materialization (A6) — implemented on an honest trail probe, or refused on that probe;
- undeclared-key detection on the masked object plan (A7) — implemented;
- invalid-value preview rendering (A11) — implemented;
- array-guard composition (A10), ledger reuse (A8), the lazy fault slot, and the compile tier — retained unchanged, each with its recorded reason;
- the `oneOf` reporter tally — ruled a defect and repaired, or ruled conforming, with the fixture recorded either way;
- gates green and a fresh `ops`/`heap` capture recorded against the 0.0.15 baselines.

## 4. Risks and missed candidates

- **Vocabulary representation, unprobed.** `matchesMember` allocates an argument list per call through `INTRINSICS.apply` (`helpers.ts:262`), and the literal leaf pays it on every `is`. `readGuardShape` already documents why a null-prototype record beat a `Map` on this exact reasoning; the same reasoning applies to the `Set` vocabulary and the package uses both. Frame: the extra-key row (A7) removes one site and leaves the pattern in place everywhere else. Evidence needed: a dist-level record-plus-`own` substitute for `collectMembers` and `matchesMember`, measured on the literal-heavy `is` fixture.
- **The shape-builder tier is unmeasured.** `ShapeValidator.#clear` allocates its whole working state twice per `validate` (`ShapeValidator.ts:162`, `166`), and every `*Shape` door reaches it. The ops harness measures compiled-family calls only, so a consumer building shapes in a loop pays a cost no candidate in this campaign covers. Evidence needed: an ops row for `objectShape` and `stringShape` construction.
- **The reporter compiles guards it may never need.** `#reportAt` builds a guard per `oneOf` variant at compile (`ContractCompiler.ts:1957`), so a reporter-only consumer retains a guard graph. Frame: the compile-tier row this campaign excludes. Evidence needed: retained heap of a `oneOf` reporter against its auditor.
- **Double intrinsic array probe.** The parser and auditor array plans call `INTRINSICS.array(value)` inside `readValue` and again inside `isArray`. Frame: the array path A1 also touches; measure it with A1 rather than after it.
- **A3b's capture can disagree with its shape.** An optional argument that carries a fact the primary argument also carries admits a caller that supplies a mismatched pair. The TSDoc and the test bind the package's own path; a lying external caller stays possible. Evidence that settles it: none — accept the cost with the row, or refuse the row.
- **Instrument risk.** Every admitted row rests on the 6-process rule, whose identity control still spreads 0.977–1.081 per replicate. A row admitted at a median near 0.95 is the one most likely to disappear in the U9 re-capture; order the units so the strongest readings land first.
