# Unit m4-audit — subjective lane return

## Numbered verdicts

**1. Every added or changed prose sentence is TRUE against the live source — `BROKEN`.**

Three sentences are false against the code they describe.

- `/home/user/contract/src/core/compilers.ts:360-361` — "Every member is self-contained, so the compiler this call builds releases its working set before the call returns and nothing the caller keeps holds the owned graph." The second half is false. `/home/user/contract/src/core/ContractCompiler.ts:1319-1328` (`#auditOf`) and `1580-1591` (`#reportOf`) capture the owned node itself in the returned plan closure:

  ```ts
  const owned = this.#node(index)   // an element of #nodes — an owned-graph node
  case 'string': {
      const node: StringShape = owned
      return (value, path) => { /* … */ return createStringFaults(node, value, path) }
  }
  ```

  `#node` returns `this.#nodes[index]` (`ContractCompiler.ts:531-539`). So a caller keeping the bundle keeps `audit` and `explain`, and those retain owned-graph nodes by identity. Reachable through the shipped public API with the guide's own example: `createContract(objectShape({ id: stringShape({ min: 1 }) }))` retains the owned `StringShape` node through the root auditor's child chain. The source comment the sentence generalizes is carefully bounded and does not say this — `ContractCompiler.ts:203-206` says "nothing a compiled artifact does **at call time** reaches back into the **index** this class later releases", which is a statement about reaching instance state, not about node retention. `guides/contract.md:971` carries the same over-claim in weaker form: "a contract it returns holds nothing but its own six values."

  Why it matters: this is the campaign's own subject. The paragraph exists to tell a reader what a kept object retains, and it answers that question wrongly in the direction that under-reports retention.

  What right looks like: state what the source states. "Every member is self-contained, so the compiler this call builds releases its working set before the call returns and nothing the caller keeps reaches back into that compiler." Drop "holds the owned graph", or qualify it — the diagnostics close over the owned leaf nodes their faults describe.

  Referral to the objective lane: whether the audit/explain node capture is worth a code change rather than a prose change, and how much of the graph a root auditor transitively pins, is a retention-design question outside my lane. The prose defect stands either way.

- `/home/user/contract/src/core/types.ts:1078` — "Nothing is released before then." False. `#fail` calls `#release()` (`ContractCompiler.ts:365-369`), so a compiler whose declaration refuses releases the whole working set with no family built. Reachable by any refusing declaration (cycle, expansion bound, reentry). The package documents this behavior for its sibling engine at `guides/contract.md:1050` ("failure working-set release"). The guide's parallel sentence at `guides/contract.md:958` carries the retention point without the universal, so the fix is to delete the sentence and let the guide's shape stand: a read that leaves any family unbuilt releases nothing.

- `/home/user/contract/src/core/compilers.ts:357-359` — "so the refusal stays inside this function's own error attribution." Under its plain reading, false. `contain` passes a `ContractError` through by identity (`src/core/helpers.ts:877`, documented at `844-851`) and `#leave` adopts it by identity (`ContractCompiler.ts:351`), so a malformed declaration publishes the cloner's or validator's own message and never `createContract`'s door name. `guides/contract.md:491` publishes the opposite rule to the same reader: "a cloner or validator `ContractError` is adopted by identity rather than rewrapped." Say what is true and checkable: "A malformed declaration refuses at this call rather than at the first read of whichever member a caller happens to touch, so the failure arrives at the call the caller made — carrying the authoring door's own diagnosis, which this door adopts rather than rewraps."

Attacks that failed, for the record: the spread claim holds — `#buildContract` returns a frozen object literal of data properties (`ContractCompiler.ts:2064-2071`), so destructuring and spread both copy the exact values; "releases its working set before the call returns" holds — the getter's `#leave` → `#collect` → `#release` chain runs inside the call; `guides/contract.md:958`'s "holds all of it for as long as you keep the compiler" holds — I looked for a post-first-read failure that would release the set under a still-kept compiler and there is none, because `#prepare` is the only fallible phase and the raw-shape generator throw at `ContractCompiler.ts:2038-2047` sits inside a returned closure and fires at call time.

**2. No false universal was replaced by an unfalsifiable one — `CONFIRMED`.**

Attacked the two named sentences and both held. The `WeakMap` counterfactual at `guides/contract.md:491` names a fact about `WeakMap` semantics any reader can check and matches the source comment it derives from verbatim in substance (`ContractCompiler.ts:196-199`). The dropped `frozen` is genuinely gone: the replacement claims class-owned rather than per-instance peers, which is checkable at `ContractCompiler.ts:385-397` by a reader of the source, so it satisfies the claim's "a reader can check" arm even though a consumer cannot observe it. What the m4 change did introduce is a new **false** universal rather than an unfalsifiable one, which claim 1 carries; recorded here so the two are not double-counted.

**3. The executed fence transcribes faithfully — `CONFIRMED`.**

The load-bearing expression matches character-for-character across all three copies: `guides/contract.md:965`, `tests/guides.test.ts:292`, and the guard string at `tests/guides.test.ts:302`. The transcription asserts `true` and `false` (`tests/guides.test.ts:294-295`) against the fence comments at `guides/contract.md:967-968`. `CORE_GUIDE` resolves to `guides/contract.md` (`tests/guides.test.ts:189`), so the presence guard reads the guide and not the test file. Attacked the specifier mismatch — the fence imports `@orkestrel/contract` while the test imports `@src/core` — and it is mandated by `.claude/rules/documentation.md` § Guide examples, not drift.

**4. The fence and its transcription would catch what they claim — `BROKEN`.**

The pair does not discriminate on the lines that carry the fence's behavioral claims. The presence guard (`tests/guides.test.ts:301-303`) checks one string: the `const isTicket = …` declaration line. The fence's claims live on `guides/contract.md:967-968`, which no assertion reads.

Falsifying edit: change `guides/contract.md:967` from `isTicket({ id: 'T-1' }) // true` to `// false`. The transcription still asserts `true` and passes; the presence guard still matches the declaration line and passes. The guides project stays green with a `// false` beside a call that returns `true` — the exact defect `.claude/rules/documentation.md:36` names, in the mechanism built to catch it. The same holds for changing the fence's input value while keeping its comment.

Smallest correct fix: extend the presence guard to the claim lines, so each asserted value is bound to the comment that claims it.

```ts
expect(guideText).toContain("isTicket({ id: 'T-1' }) // true")
expect(guideText).toContain("isTicket({ id: '' }) // false")
```

Bound: the declaration-line half of the claim holds — an edit to the fence's constructor expression or its `min: 1` bound does redden the presence guard.

**5. TSDoc-only diffs in `types.ts` and `compilers.ts`, four files touched — `CONFIRMED`.**

The added text sits inside the existing TSDoc blocks in the live tree: `src/core/types.ts:1077-1084` inside the `ContractCompilerInterface` block that closes at `1091`, and `src/core/compilers.ts:353-361` inside the `createContract` block, before `@param` at `363`. Member, signature, and type lines are unmoved (`types.ts:1092-1107`, `compilers.ts:374-378`). The four-file bound rests on the `git status --porcelain` output in the report, which lists exactly `guides/contract.md`, `src/core/compilers.ts`, `src/core/types.ts`, `tests/guides.test.ts`; the guide hunk is elided in the supplied diff by the writer's own note, so that one file's line-level bound is the report's word plus the live text I read.

**6. The writer's handling of the false standing condition was sound — `CONFIRMED`.**

`.claude/rules/tests.md:70-72` mandates the transcription form the writer built, and `.claude/rules/documentation.md:36` names `tests/guides.test.ts` as its home, so establishing the mechanism inside that owned file is what the rules require rather than an improvisation. No off-limits file was needed: the guard reads `files[CORE_GUIDE]` from infrastructure already present at `tests/guides.test.ts:56-64`, and the two added imports (`objectShape`, `stringShape`) come from the barrel the file already imports. Stopping the unit to report the false condition would have been the wrong call, because the condition was false in the direction that left the objective reachable.

**7. Added prose follows the enumerated writing rules; the pre-existing list is accurate and out of scope — `CONFIRMED`.**

Swept the added text at `guides/contract.md:491, 958, 960-969, 971`, `src/core/types.ts:1077-1084`, and `src/core/compilers.ts:353-361` for `should`, `via`, temporal `once`/`Once`, `above`, `easy`, `simply`, `just`, `currently`, `leverage`, `in order to`, case-insensitively: no hits in added text. `via` and `above` occur throughout `src/core/types.ts` (lines 378, 409, 426, 796-845, 1105) but none in the added block.

Ruled on the count question rather than dropping it: "one of the six artifacts" (`958`) and "its own six values" (`971`) tally a set `AGENTS.md` § Writing would normally call a count. I record them as permitted. The number is fixed by a published interface rather than by an open set, the members are named by name two lines earlier at `956`, and the term is this package's established vocabulary in both prose and source (`guides/contract.md:490, 492, 941, 953, 1054`; `src/core/types.ts:1105`), so changing it in one paragraph would break one-concept-one-term. If the Orchestrator wants the vocabulary ruled on package-wide, that is a successor claim, not an m4 defect.

Two nits in the writer's pre-existing list that do not make it false: `once` inside the `ContractCompiler` Surface row is the "one time" sense throughout ("owns the declaration once", "compiles once however many parents point at it"), which `.claude/rules/writing.md` § Substitutions permits and directs you to record as permitted rather than as a hit; and the `above` in the `contract` member TSDoc is at `src/core/types.ts:1105` in the shipped tree, not the pre-change `1096` the report cites. The named `now runs on` (`491`), `above` (`guides/contract.md:956`), and `above` (`tests/guides.test.ts:263`) are all real, all pre-existing, and all correctly outside the named property.

One observation, not the break: `src/core/types.ts:1079` writes "for as long as you keep it" where the guide's parallel sentence at `958` names the noun ("for as long as you keep the compiler"). `.claude/rules/writing.md` § Sentence and paragraph order requires naming the noun where the reader could attach the pronoun elsewhere, and "that whole set" is in the same sentence. Fold it into the claim-1 fix on that paragraph.

**8. Parity holds; the added TSDoc contradicts no guide sentence and no test — `CONFIRMED`.**

Every backticked package symbol in the changed passages resolves to a real public export: `ContractCompiler`, `createContract`, `objectShape`, `stringShape`, all reachable from the barrel the test imports at `tests/guides.test.ts:24-33`. `WeakMap` at `guides/contract.md:491` is a host global in prose, outside the manifest symbol table the parity checks key off. No test contradicts the added TSDoc: `tests/src/core/ContractCompiler.test.ts:114-138` pins every root usable after release, and `140-147` states release mechanics publish nothing observable, so nothing there asserts against the new sentences. Noted, not counted here: the plain reading of the attribution sentence sits in tension with `guides/contract.md:491`'s adopt-by-identity rule, and claim 1 carries that as its single carrier.

## Findings outside the claims

**F1. The `flagship fences` block covers one fence while the guide carries untranscribed flagship fences that assert values.** `.claude/rules/tests.md:70` requires "Transcribe **each** flagship fence and assert the values its comments claim." `tests/guides.test.ts:284-305` transcribes only the fence m4 added. `guides/contract.md:927-937` asserts `contract.is(value) // false`, `contract.parse(value) // { id: 'a' }`, `contract.audit(value) // [{ reason: 'extra', path: ['debug'] }]`, and `contract.explain(value) // []`; `guides/contract.md:943-954` asserts `compiler.guard({ id: 'a' }) // true`, `compiler.guard === compiler.guard // true`, and `compiler.contract.is === compiler.guard // true`, and the guide itself calls that block "the proof" at `956`. Neither is transcribed, so both can go false with the suite green — the condition the mechanism m4 built exists to end. The block's plural name reads as coverage it does not have.

Scope ruling: this is not m4's to reopen. `AGENTS.md` fixes the enumerated scope at start, and m4's brief scoped the test file to "only what the fence mechanism requires". Route it as a successor unit against the capability that owns guide-fence proof, together with the claim-4 fix, which the same unit should carry.

VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 1 findings outside the claims
