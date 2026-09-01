# Unit m4-audit — objective lane return

**Lane held: OBJECTIVE** — truth of every added sentence against the live source, what the fence and its transcription actually bind, and what the code permits. (Sol bench dark; this lane ran on the harness engine. My own engine wrote the subject, so every added sentence was attacked against source rather than read.)

---

**1. Every added or changed prose sentence is TRUE against the live source — BROKEN.**

Falsified at `/home/user/contract/src/core/compilers.ts:359-361`, final clause of the added `createContract` paragraph:

> "Every member is self-contained, so the compiler this call builds releases its working set before the call returns and nothing the caller keeps holds the owned graph."

The last clause is false, and the inference in it is backwards: self-containment is achieved BY capturing owned nodes into the artifact closures.

- `/home/user/contract/src/core/ContractCompiler.ts:1322` — `#auditOf` case `'string'`: `const node: StringShape = owned`, and the returned closure calls `createStringFaults(node, …)` at call time. `owned` is `#nodes[index]`, the owned clone (`#node`, `:531-532`).
- Same capture at `:1331` (`NumberShape`, auditor), `:1363` (`ArrayShape`, auditor), `:1583`, `:1593`, `:1626` (reporter family).
- The published roots wrap those exact plans: `#exposeAudit(this.#auditAt(this.#node(0)))` at `:1289`, `#exposeReport(...)` at `:1556`. `#buildContract` (`:2064-2071`) puts them in the frozen bundle as `audit` and `explain`.

Exact input: `const contract = createContract(stringShape({ min: 1 }))`. The caller keeps `contract`; `contract.audit` closes over the owned root node — the entire owned graph. Worse for a composite root: `createContract(arrayShape(objectShape({ id: stringShape() })))` captures the owned `ArrayShape`, whose `items` reaches the owned object node and everything beneath it, so the whole owned declaration is retained for the contract's life. `#release` (`:385-397`) drops only the compiler's own references.

Why it matters: this is the unit whose purpose is publishing the true retention rule, and the sentence tells a consumer the opposite of what a long-lived contract retains. It is also the sentence a reader sizing memory would act on.

Smallest correct fix: strike `and nothing the caller keeps holds the owned graph`, or state what holds — the auditor and reporter plans close over the owned leaf and array nodes they read their bounds from, so a kept contract retains those nodes and, through an array node's `items`, the subgraph beneath them.

Bound against over-correction: the guard family captures no owned node (`#guardOf` object case builds `map`/`required`/`closed` at `:877-908`, array case composes child guards at `:867-871`; `#trackGuard` at `:589-614` closes over `plan`/`memo` and reaches statics through the class name, never `this`). So the guide's guard-centred advice at `guides/contract.md:958-971` and its fence comment "the compiler it came from is unreachable the moment that expression finishes" are correct and must not be rewritten. The emitted `schema` is a separate frozen graph, not the owned graph.

Second, lesser falsification, same claim — `/home/user/contract/src/core/types.ts:1078`: "Nothing is released before then." State that contradicts it: a compiler that settles on a failure releases the whole working set before any family exists — `#leave` → `#fail` (`:349-359`) → `#release` (`:367`), reachable from any getter with a malformed declaration. Low severity (a settled compiler is unusable and retains less than the sentence claims), but it is a universal the paragraph two above it already contradicts. Fix: drop the sentence, or qualify it with the failure path; the clause after it carries the meaning on its own.

Attacks that FAILED, and are therefore bounded as correct:
- The spread claim (`compilers.ts:353-355`): `#buildContract` (`:2064`) freezes a plain object literal of data properties, so destructuring and spread copy those exact values. TRUE.
- The refusal-attribution claim (`compilers.ts:356-359`): `createContract` reads `.contract`, which builds all six, so a malformed declaration refuses at the call. `contain` (`helpers.ts:874-883`) rethrows a `ContractError` by identity and republishes a host failure under the door name — the refusal is raised inside this function's boundary. TRUE as written. (Observation, pre-existing and out of scope: `createContract` carries no `@throws` tag while `contain`'s own TSDoc at `helpers.ts:853-854` states its population is exactly the doors whose TSDoc carries one; `compilers.ts` has `@throws` only at `:68` and `:213`.)
- The release sentence at `guides/contract.md:491`: "empty peers the class owns instead of to per-instance ones" matches the static frozen peers at `ContractCompiler.ts:150-180`; "the node index is dropped outright" matches `:389`; the `WeakMap` rationale matches `:196-199`; "What stays is the six roots, the optional frozen bundle, and terminal state" matches `#release`. TRUE.
- `guides/contract.md:958`: "releases its working set … after every family exists" matches `#collect` (`:374-379`); "holds all of it for as long as you keep the compiler" TRUE.

**2. No false universal replaced by an unfalsifiable one — CONFIRMED.**
Attacked the two named sentences. The dropped `frozen`: the guide now claims only class ownership of the peers, which `ContractCompiler.ts:150-166` shows a reader directly; the freeze qualification stays where it is checkable (`:143-149`). The `WeakMap` counterfactual rests on two facts a reader can check without running the package — `Object.freeze` does not reach `WeakMap.prototype.set`, and a `static` field lives for the class's lifetime — so it states a reason, not an unfalsifiable promise. Claim 1's break is itself evidence for this claim: the new retention sentences were falsifiable, and one of them was falsified.

**3. The transcription is faithful — CONFIRMED.**
`tests/guides.test.ts:292` is byte-identical to `guides/contract.md:965` in the load-bearing expression. `:294-295` assert exactly the values the fence's comments claim at `guides/contract.md:967-968` (`true` for `{ id: 'T-1' }`, `false` for `{ id: '' }`), and those are the code's real answers (`stringOf` refinement composed at `ContractCompiler.ts:842-846`). Attacked the transcription for a values mismatch and for a stale expression; neither reproduces. The binding's incompleteness is ruled under claim 4 rather than double-counted here.

**4. The fence and its transcription catch what they claim — BROKEN.**
Direction code→guide holds: a change making the guard accept `{ id: '' }` reddens `tests/guides.test.ts:295`. Direction guide→code does not. The only assertion reading the guide is the substring at `:301-303`, and it covers the construction line alone.

Exact state: edit `guides/contract.md:968` to `isTicket({ id: '' }) // true`. The guide then documents a value the code contradicts — the precise failure `.claude/rules/tests.md:70-72` and `.claude/rules/documentation.md` name — and nothing reddens. The transcription still passes (it asserts the truth), the presence guard still passes (its substring is untouched), and no other check in the file reads fence comment text: `fenceImports` reads imports (`:154-164`), `findUnexampled` reads names (`:125-135`), `resolveLink` reads links (`:166-180`), `runtime parity` reads prototypes (`:223-277`).

Why it matters: this is the repository's first executed fence and the pattern every later fence will copy, so the hole propagates.

Smallest correct fix, in `tests/guides.test.ts` beside `:301`: add `expect(guideText).toContain("isTicket({ id: 'T-1' }) // true")` and `expect(guideText).toContain("isTicket({ id: '' }) // false")`.

Bound against over-correction: guard the value-claiming lines only. Do not assert the whole fence block as one substring — a formatter re-wrap of the fence would then redden the suite for an edit that changes no claim.

**5. TSDoc-only diffs in the two source files, four files touched — CONFIRMED.**
Verified directly in the tree: the `types.ts` insertion sits at `:1077-1084` inside the `@remarks` block, and `ContractCompilerInterface` (`:1092-1107`) carries its declared members unchanged; the `compilers.ts` insertion sits at `:353-361` inside `@remarks`, with the signature and body at `:374-378` unchanged. Added-line counts in the tree match the reported diffstat (9 and 9). The "only these four files" half rests on the supplied `git status --porcelain`, which is the evidence the subject type requires and which the round's established facts pair with a clean pre-change tree at `fcdd4d0`; I hold no exec tool and did not re-derive it.

**6. Handling of the false standing condition — CONFIRMED.**
`tests/guides.test.ts` carried no fence-execution mechanism before this unit: every check in `:66-277` reads source text or a prototype. Establishing the transcription inside the owned test file is what `.claude/rules/tests.md:70-72` mandates and what `.claude/rules/documentation.md` requires (executed assertion, substring kept only as a presence guard). Attacked for a needed change outside the owned files and found none: the two added imports (`:31-32`) join the existing `@src/core` list, the block sits beside `runtime parity` with no configuration change, and the alias import is correct because `documentation.md` reserves `@src/*` for source and tests. Continuing rather than stopping was right — the brief's deviation contract triggers only if the mechanism required an off-limits file.

**7. Writing rules on new prose, and the accuracy of the left-alone list — BROKEN.**
The prose sweep itself is clean. Patterns swept case-insensitively across `should`, `via`, `once`, `above`, `currently`, `now`, `new`, `latest`, `just`, `simply`, `easy`, `ensure`, `guarantee`, `leverage`, `utilize`, `in order to`, over exactly the added text at `guides/contract.md:958-971`, `src/core/types.ts:1077-1084`, and `src/core/compilers.ts:353-361`: no hit. The fence is introduced by a complete sentence, the em dashes are spaced, and `The following block` is the permitted form.

The break is in the report's left-alone list. `/home/user/scaffold/tmp/units/m4-retention-prose-report.md:185` cites the `above` in the `contract` member TSDoc as `src/core/types.ts:1096`. In the tree the report describes, `:1096` is `readonly guard: Guard<Infer<S>>`; the `above` is at `:1105`. The citation is the pre-change number, unshifted by the unit's own 9-line insertion. Same defect at `:184`, which cites `compilers.ts:368` for `createContract`'s body — that body is at `:377` post-change; `:368` is now an `@example` line. Systematic, not a typo.

Why it matters: a later unit or the Orchestrator following either pointer lands on an unrelated line. Fix: `types.ts:1105` and `compilers.ts:377`. The package needs no edit.

Observation, not a break: the added guide sentence carries `six` ("one of the six artifacts"), as does the rewritten sentence at `:491` ("all six roots", "the six roots"). This is the guide's and the source's established vocabulary for a fixed published set (`ContractInterface`), inherited from the surrounding paragraph at `:939`; treating it as a count would reprice on every edit, which `.claude/rules/quality.md` § Rounds and verdicts tells me to drop rather than to chase.

**8. Parity holds; the added TSDoc contradicts no guide sentence and no test — CONFIRMED.**
Every backticked API in the changed passages resolves: `ContractCompiler`, `createContract`, `objectShape`, `stringShape` are barrel exports, and the fence at `:960-969` imports through `@orkestrel/contract`, which `fenceImports` checks. `WeakMap` at `:491` sits in the Summary column, not the API column `guide.surface()` reads, so it is outside the documented-surface population. No test asserts anything the added TSDoc contradicts: `tests/src/core/ContractCompiler.test.ts:114` pins that every root stays usable after release, and `:140-147` records explicitly that release mechanics publish nothing a test can observe. The claim-1 falsification is against the source, not against a guide sentence or a test — which is why nothing in the suite caught it.

Answer to the brief's Unknown: no other passage in `guides/contract.md` states the ContractCompiler release wording. Pattern `releas|preconstructed|peer|working set|drops the|dropped outright` over `/home/user/contract/guides/*.md`. Inside `contract.md` the hits are `:265`, `:273`, `:332-344`, `:478`, `:491`, `:501`, `:539`, `:595`, `:651-663`, `:958`, `:1050-1061`. The `preconstructed` hits at `:334`, `:336`, `:657`, `:663` describe `SchemaCloner` and `ShapeCloner` per-instance replacement state, a different mechanism this change did not touch; `:501` uses `release` for a version and for the per-call memo; `:1054` names release only as test coverage. Hits in `probe.md`, `scaffold.md`, and `test.md` are vendored sibling-package mirrors and are outside this subject.

---

**Findings outside the claims:** none substantiated.

VERDICT: FAIL — 3 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
