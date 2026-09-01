# U3 audit round 2 — subjective lane (`reviewer`, Opus 5; blind, read-only; immutable return; brief `u3f-audit-brief.md`, ruled against `u3-final2-diff.patch`)

I held the **SUBJECTIVE** lane: shape, naming, ergonomics, design fit, guide voice, and conceptual coherence. I ruled against the final tree (`tmp/units/u3-final2-diff.patch`, status `tmp/units/u3-final2-status.txt`), reading `src/core/helpers.ts`, `src/core/ContractCompiler.ts`, `src/core/combinators.ts`, `src/core/cloners.ts`, `src/core/shapers.ts`, `src/core/index.ts`, `guides/contract.md`, and the three test files first-hand. I did not open the round-2 objective lane's verdict.

## 1. CONFIRMED

`ownPattern` at `src/core/helpers.ts:654-660` is exactly `readValue(() => readPattern(pattern), reader, { subject: 'pattern', code: 'pattern', context: { shape: 'string' } })`. Each site passes its own name: `src/core/combinators.ts:1037` (`'stringOf'`), `src/core/ContractCompiler.ts:1440` (`'compileAuditor'`), `:1757` (`'compileReporter'`).

Attacks that failed: I compared the removed `stringOf` block against the helper body field by field — `subject`, `code`, and `context` are identical, so `stringOf: pattern could not be read` / `pattern` / `{ shape: 'string' }` is byte-preserved. I then hunted a fourth site the consolidation should have absorbed and found two near-misses that are genuinely different rather than missed: `matchOf` at `combinators.ts:990` deliberately publishes no `context` (claim 2), and `stringShape` at `shapers.ts:125-144` reads `source`, `flags`, and rendered `text` separately to refuse flags, so it cannot return a rebuilt `RegExp`. I also checked whether the two compiled doors changed an observable refusal: `ContractCompiler.ts:422` runs `ownShape` before any leaf compiles, so the pattern `ownPattern` sees is the clone's own freshly minted `RegExp` and its captured-accessor read cannot fail. The new refusal sites are unreachable through the package's own path, and the byte-identical pattern-fault record in § Evidence covers the published set.

## 2. CONFIRMED

`matchOf` at `src/core/combinators.ts:985-996` is absent from the diff and still calls `readValue(() => readPattern(pattern), 'matchOf', { subject: 'pattern', code: 'pattern' })` with no `context`. Attack: I tested whether the consolidation should have swallowed it anyway. It must not — `matchOf(pattern)` builds a standalone string guard with no `StringShape` behind it, so `{ shape: 'string' }` would be a fabricated context. The exclusion is a real conceptual boundary, and `ownPattern`'s own summary ("Rebuilds a **declaration's** regular expression") carries it.

## 3. BROKEN

**Falsifying input.** Call `createStringFaults` with a counting `pattern` accessor and no supplied rebuild. The accessor answers **twice** per call. The shipped guide row at `guides/contract.md:597` and the shipped TSDoc at `src/core/helpers.ts:1929-1931` both say: "The `limit` text is read from the applied rebuild, so it names the pattern that decided the match; the shape's `pattern` is read once per call for that rebuild." The natural English parse of that clause — the adjunct `for that rebuild` modifying the whole clause — states a per-call read count of 1. The code at `helpers.ts:1999-2000` reads `shape.pattern` for the `=== undefined` test and again for `readPattern(shape.pattern)`, and the package's own test asserts the real number: `expect(reads).toBe(2)` at `tests/src/core/helpers.test.ts:3317`, rising to `4` after a second call at `:3320`.

The brief's claim 3 had to supply the parenthetical "(plus the `=== undefined` test)" to make the statement checkable. That parenthetical is exactly what the shipped prose omits, and that gap is the drift: the charitable reading lives in the brief, not in the artifact a developer reads.

**Why it matters.** This row's whole subject in this change is read counts. A developer who instruments a hostile or counting `pattern` accessor to size the cost of `explain`/`audit` gets 2 where the guide promised 1, and `.claude/rules/documentation.md` requires a prose claim about behaviour to be falsified the way a code claim is. The test title carries the same misreading into the runner output: `"reads a hand-rolled shape's pattern accessor once per call for the rebuild that also names the limit"` sits beside `expect(reads).toBe(2)`, against this suite's own established form where a "reads … once" title pairs with `toBe(1)` (`helpers.test.ts:220`, `:1229`). A maintainer reading `expected 3 to be 2` on a test whose name says "once" cannot reconcile the two without opening the file.

**What right looks like.** State the total in both the guide row and the TSDoc, naming what each read buys: "the shape's `pattern` accessor answers twice per call — once for the presence test, and once for the rebuild that both decides the match and names the `limit`." Rename the test to what it asserts, for example `reads a hand-rolled shape's pattern accessor twice per call — the presence test and the rebuild that names the limit`.

Every other statement in claim 3's list holds and I attacked each: the supplied argument decides the match, the `limit`, and whether a pattern fault is reported at all, because `stateless !== undefined` is the only gate at `helpers.ts:2001` — I confirmed a supplied pattern produces a pattern fault against a shape declaring none. `shape.pattern` is genuinely unread when a pattern is supplied, by `??` short-circuit at `helpers.ts:1999`. The "must be a `readPattern` result for this shape's own pattern" obligation is stated on the interface at `helpers.ts:1946-1953` and in the guide row, which is what round 1's accepted ruling prescribed, and the shipped artifact matches that ruling.

## 4. CONFIRMED

The `lastIndex` promise is qualified in both places and true there. TSDoc `helpers.ts:1922-1924`: "so **the shape's own pattern** never moves a caller's `lastIndex`"; guide `contract.md:597` carries the same qualification; and the counter-case is stated on the parameter itself at `helpers.ts:1950-1952`: "A pattern carrying `g` or `y` moves the caller's `lastIndex` and makes repeated answers for one value disagree."

Attack: I searched the changed prose for a surviving unqualified promise and found none, then checked the compiled doors independently — `ContractCompiler.ts:1440` and `:1757` capture through `ownPattern`, which strips `g`/`y` at `helpers.ts:620-626`, so the compiled path cannot move a caller's `lastIndex` even if validation were bypassed. I also verified the warning is not vacuous: `matchesPattern` at `helpers.ts:590-592` dispatches the captured `exec`, which does advance `lastIndex` on a `g` receiver.

## 5. CONFIRMED

The read-count pin binds on the supplied mutation evidence: reverting the `limit` read to `shape.pattern` (the checkpoint's three-read shape) fails only that test with `expected 3 to be 2`, and the sha256-identical restore returns `234 passed (234)`. Attack: I checked the pin for the failure mode where an instrument reports a number consistent with two readings. It is not — the test also asserts the exact fault including `limit: '^[0-9]+$'`, so a rebuild that never applied would fail on content rather than on count, and the second `expect(reads).toBe(4)` pins per-call cost rather than first-call cost. The pin's scope is the helper's omitted path only; see finding F1 for what it does not reach.

## 6. CONFIRMED

`tests/src/core/helpers.test.ts:2979-3006` asserts `stringOf: pattern could not be read`, code `pattern`, context `{ shape: 'string' }` from `ownPattern(new Proxy(/^a$/, {}), 'stringOf')`, and asserts repeated matching from one `gy` rebuild with `caller.lastIndex` and `owned.lastIndex` both `0`.

Attack: I checked whether the refusal half could pass for the wrong reason — a `Proxy` over a `RegExp` carries no `[[OriginalSource]]` slot, so the captured `source` getter throws a host `TypeError`, which is exactly the raw error `ownPattern` exists to translate. I checked the stateless half for a vacuous control — it carries two: `expect(caller.flags).toBe('gy')` and `expect(owned.flags).toBe('')`, so a caller that never carried the stateful flags would fail rather than pass silently.

## 7. CONFIRMED

On the supplied Orchestrator records: the 324-line pattern-fault record identical to 0.0.15 and parity IDENTICAL in both forms, taken on the U3f tree. I could not execute, so this rests on that evidence; my corroboration is structural — the fault object at `helpers.ts:2003-2010` is unchanged in field order and in the `...(limit === undefined ? {} : { limit })` spread, and `readPatternSource(stateless)` returns the same text as `readPatternSource(shape.pattern)` because `readPattern` at `helpers.ts:614-627` reconstructs from the exact `source` string.

## 8. BROKEN

**Falsifying input.** `tests/src/core/integration.test.ts:967` reads `expect(OWNED_MEMBERS.length).toBe(217)`; the diff at `tmp/units/u3-final2-diff.patch:485-486` shows it was `toBe(216)`. That is a pre-existing pin, and it was edited by this change.

**Why it matters and what right looks like.** The pin was not *weakened* — it is still an exact-count assertion, and the guide's matching numeral moved with it at `guides/contract.md:256` — and the edit is *required*, because `ownPattern` is a new exported plain function and `src/core/index.ts:4` re-exports `./helpers.js` wholesale, so the census grows by one. The defect is in the claim, not the code. Restate claim 8 in the successor brief as: "No pre-existing pin was weakened. The only pre-existing pin edited is the export census at `integration.test.ts:967` and its guide numeral, which the added export obliges; it retains its exact-count form. The suites' counts otherwise rose only by the added tests." See finding F2 for the design question that edit raises.

## 9. CONFIRMED

The name holds and its stated reason is true, which I checked rather than accepted: the U3f report grounds `ownPattern` in `own{Noun}` as the package's established form for "return a copy this package owns", and `ownShape` exists at `src/core/cloners.ts:180`, reached from `ContractCompiler.ts:79`, `:422` and named across `compilers.ts` and `constants.ts`. So `ownPattern` joins a family rather than inventing a verb, and it reads correctly beside `readPattern`, which returns the same kind of value without the coded refusal.

Attack: I tested the rival reading that `own` is a synonym for `read` in a module whose whole pattern family is `read*` — `readPattern`, `readPatternSource`, `readPatternFlags`, `readValue`. It is not: `read*` names the act of getting a value through a captured accessor, and `own*` names returning a package-owned copy, which is precisely the difference between `readPattern` and `ownPattern`. The two `own*` functions differ in that `ownShape` names its own refusal while `ownPattern` takes a `reader` and publishes under the public door's name — deliberate, documented at `helpers.ts:644`, and correct, because the package's uniform diagnostic names the door a consumer called.

The TSDoc at `helpers.ts:629-660` carries `@throws {ContractError} Thrown when …` and the stateless rationale in `@remarks`. I checked its third-person "Rebuilds …" against the file's imperative neighbours and against `.claude/rules/typescript.md:75`, which requires the third person with an `-s` verb: the new symbol follows the rule and the neighbours are pre-existing drift, so this is not a defect of this change.

The guide row at `guides/contract.md:244` sits directly after `readPattern` and every clause in it is true of the code. The leaf comment at `ContractCompiler.ts:1434-1437` is true of the schema leaf: `ContractCompiler.ts:729-731` throws an explicit `new ContractError` with `code: 'pattern'` and `context: { shape: 'string' }`, not through `readValue`, and the comment claims agreement on code and context only — correctly, because the messages differ (`compileSchema: pattern source could not be read`).

## 10. BROKEN

**Falsifying input.** `git status` on the final tree (`tmp/units/u3-final2-status.txt`) lists ` M tests/src/core/integration.test.ts`, and the diff carries its hunk at `u3-final2-diff.patch:477-489`. Claim 10's enumeration does not include that path, and its "touches only" wording makes the file's presence a falsification. `src/core/types.ts` and `src/core/index.ts` are untouched as claimed, and `tests/src/core/combinators.test.ts` is absent, which the claim permits.

**What right looks like.** The edit itself is correct and obliged by the added export. Add `tests/src/core/integration.test.ts` (the export census pin) and the `guides/contract.md` census numeral to the successor claim's enumerated set, so the file list describes the tree the round is ruling on.

## 11. CONFIRMED

I swept the added source, test, and prose for `any`, `as`, `!` non-null, `@ts-` directives, mocks, and spies and found none. The only anonymous functions added are `() => readPattern(pattern)` at `helpers.ts:655`, passed directly as an argument, and object-literal accessors in the tests (`helpers.test.ts:3297`), which are members rather than nested declarations — both permitted forms, and the accessor form matches the file's own precedent at `:212` and `:1222`. `new Proxy(/^a$/, {})` is hostile input over a real `RegExp`, not a behavioural fake of project-owned behaviour. No `above` or `below` cross-reference survives in the added prose; the Orchestrator's three comment edits closed the last of them, and I confirmed the replacements read "the preceding repeated answers", "the preceding empty report", and "names the fault's `limit`".

One conjunct is satisfied only under the guide's house convention, and I record it rather than pass over it: "every code token is followed by a noun" is not literally true of the added prose (`` `readPattern` taken through `readValue` ``, "the compiled string leaves and `stringOf` share"), but the same form governs every pre-existing row of both tables, so the strict reading would falsify the guide wholesale rather than this change. The sharp half of that rule holds without exception — no added code token is inflected, pluralized, possessivized, or used as an English verb.

## Findings outside the claims

**F1 — the promise this whole change exists for has no executed assertion.** `src/core/helpers.ts:1949-1950` publishes, on a public `@param`, that when a pattern is supplied "`shape.pattern` is not read", and `guides/contract.md:597` repeats it as "the helper applies whatever pattern it is handed and never re-reads `shape.pattern`". No test asserts it. `helpers.test.ts:3242-3250` proves the supplied pattern *decides* the answer but never counts shape reads, and the counting accessor at `:3288-3320` exercises only the omitted path.

*Falsifying mutation, which the suite does not catch.* Replace `helpers.ts:1999-2000` with an eager rebuild:

```ts
const rebuilt = shape.pattern === undefined ? undefined : readPattern(shape.pattern)
const stateless = pattern ?? rebuilt
```

Every report stays identical, `expect(reads).toBe(2)` at `:3317` still passes because the omitted path is unchanged, the compilers suite still passes because reports are equal — and the documented promise is false, the compiled door mints a `RegExp` per answered value again, and the campaign's entire subject silently regresses to the checkpoint's cost. Only the out-of-band A/B measurement would notice, and that is not a gate.

*What right looks like.* Extend the existing counting-accessor test, or add one beside it, that supplies the rebuild and asserts the shape was never asked:

```ts
expect(createStringFaults(shape, 'abc', [], readPattern(/^[0-9]+$/))).toEqual(first)
expect(reads).toBe(0)
```

with the omitted-path call kept as the control that proves the accessor can count at all. `.claude/rules/quality.md` § Instruments requires the instrument that settled a claim to become the regression guard before the work it settled is accepted, and `.claude/rules/documentation.md` requires the executed assertion that breaks when a prose claim goes false.

**F2 — the change corrects a count the writing law says to delete.** `guides/contract.md:256` states "That last population is **217 rows**", raised from **216** by this diff, and pins the same numeral a second time at `tests/src/core/integration.test.ts:967`. `AGENTS.md` § Writing names this case exactly: "NEVER state a count. A number answering 'how many' about a set anyone can add to is a count — rules, rows, members, exports, files … Delete a count you find. **Do not correct it.**" `.claude/rules/quality.md` § Rounds and verdicts adds the same ruling for the instrument: "A subject that reprices itself on every edit — a count, a census, a total over prose — has no closing condition and is not a seam. Drop the claim, or recast it as the property the tally stood in for."

*Falsifying input.* Export one more plain function from any module `src/core/index.ts` re-exports. Two artifacts go false at once and must both be hand-edited, and the paragraph's own history records that this already happened twice (205, then 216). The comment at `integration.test.ts:963-966` institutionalizes the manual double edit as the design, and it names the wrong file while doing so (`guides/src/contract.md` does not exist; the guide is `guides/contract.md`).

*What right looks like.* Delete the numerals from `guides/contract.md:256` and keep the property the tally stood in for, which the same paragraph already states correctly: the corpus is one row per exported plain function and zero rows per exported class. Replace the literal at `integration.test.ts:967` with the derived assertion — compute the expected population from the barrel's own exported plain functions and assert equality — so the pin recomputes instead of being remembered. That closes the seam permanently rather than repricing it on every export.

## Bounded: what is not broken

The consolidation itself is sound and the shape is right. `ownPattern`'s body, its three call sites, its exclusion of `matchOf` and `stringShape`, its name, its TSDoc, its guide row, and the corrected leaf comment all hold under attack. The optional fourth parameter's trust obligation is round 1's accepted ruling and the shipped artifact matches it — the obligation is stated on the interface at `helpers.ts:1946-1953` and in the guide row, which is what that ruling prescribed. Three pre-existing conditions I checked and am not charging to this change: the imperative TSDoc summaries throughout `helpers.ts` contradict `.claude/rules/typescript.md:75` and `ownPattern` is the only conformant one; `guides/contract.md:258` uses a banned `below` cross-reference; and `integration.test.ts:965` names a nonexistent guide path. The first two predate the diff entirely; the third sits in a file this change touched and belongs with F2's fix.

VERDICT: FAIL — 3 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims
