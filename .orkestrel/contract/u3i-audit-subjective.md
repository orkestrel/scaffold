# U3i audit — subjective lane (`reviewer`, Opus 5; blind, read-only; immutable return; brief `u3i-audit-brief.md`)

I held the **SUBJECTIVE** lane (shape, naming, ergonomics, design fit, guide voice, conceptual coherence). The text under audit was written by the Orchestrator on Opus 5, my own engine, and I attacked it on that basis.

## Numbered verdicts

**1. BROKEN** — the read-count sentence overstates what the accessor answers, in the one case the package's own compiled path reaches most often.

Attack: I read the shipped statement against the shipped branch rather than against the test that motivated it. `src/core/helpers.ts:2001-2002`:

```ts
const stateless =
    pattern ?? (shape.pattern === undefined ? undefined : readPattern(shape.pattern))
```

The reads are: 0 when `pattern` is supplied; 2 when it is omitted **and** a pattern is declared; **1 when it is omitted and no pattern is declared** — the `=== undefined` test short-circuits the ternary and `readPattern` never runs.

The prose states the middle case as unconditional. `src/core/helpers.ts:1930-1933` and the identical sentence at `guides/contract.md:598`:

> Left to rebuild, the helper asks the shape's `pattern` accessor twice per call: once for the presence test that decides whether a pattern was declared at all, and once for the rebuild that both decides the match and names the `limit`.

Falsifying input: `createStringFaults({ type: 'string', min: 4, get pattern() { reads += 1; return undefined } }, 'abc', [])` → `reads === 1`. This is not a contrived shape. `ContractCompiler` enters the helper whenever `owned.min !== undefined || owned.max !== undefined || declared !== undefined` (the auditor and reporter string leaves), so every min-only or max-only string declaration the package compiles takes exactly that path — and the guide row for `createStringFaults` says so itself two sentences earlier ("a leaf that declares none has no refinement question... without entering the helper", which excludes only the wholly unrefined leaf).

Why it matters: this is the second revision of one sentence, and round 2 broke its predecessor for stating the count wrongly in the other direction ("read once per call"). A read-count sentence that names the reads but not the condition gating the second one is the same defect with a new number. The unit's own pin (`helpers.test.ts:3288`) exercises only the declared-pattern shape, so nothing in the suite would catch this.

What right looks like — in both `src/core/helpers.ts` and the `createStringFaults` guide row, replace the sentence with one that carries the condition:

> Left to rebuild, the helper asks the shape's `pattern` accessor once for the presence test that decides whether a pattern was declared at all, and once more for the rebuild that decides the match and names the `limit` when one was.

**2. CONFIRMED** — the renamed title states what its body asserts.

Attack: I read the title at `tests/src/core/helpers.test.ts:3288` against its body (`expect(reads).toBe(2)` at 3317, `toBe(4)` at 3320) and against the surrounding read-count pins in this suite (`helpers.test.ts:210, 487, 692, 1220`; `shapers.test.ts:932`), which all use the `let reads = 0` plus counting-getter form and name the case in the title. The body's shape declares a pattern, so "twice per call" is true of the case the body runs, and the title's trailing clause ("for the presence test and for the rebuild that names the limit") bounds it to a declared pattern. Held. Carry the claim-1 correction into this title if the fix changes the wording, so the title and the prose stay one vocabulary.

**3. CONFIRMED** — the added pin binds the promise.

Attack: I tried to find a passing implementation that re-reads `shape.pattern`. `helpers.test.ts:3323-3354` asserts the exact fault object, then `expect(reads).toBe(0)`, then re-calls the omitted form and asserts `reads` reached 2. The control is drawn from the same accessor under the same conditions, so a zero count cannot be an accessor that never counts — the rival reading `.claude/rules/quality.md` § Instruments requires excluding. Nothing else in the call reaches the shape's `pattern`: `readValue` receives a thunk and touches no member of `shape`. The brief's § Evidence F1 mutation record on the U3i tree (`1 failed | 493 passed`, the single failure being this test with `expected 2 to be +0`, restored at sha256 `1f04e8c1…`) is the failing-instrument proof, and I accept it as supplied evidence rather than deriving it. Held — and see finding A, which is what that same record exposes about its neighbour.

**4. CONFIRMED** — the membership paragraph states the property and no count.

Attack: I read `guides/contract.md:256` for a count in every form the brief's § Unknowns names. No numeral survives in the recast text. "one row per exported plain function" and "contributes exactly one row" are per-item ratios, not tallies over a set anyone can add to, so they satisfy `AGENTS.md` § Writing rather than evading it. No ordinal names a list position. The three stated properties are each true of the recast test: `OWNED_MEMBERS.length === plain.length` (982), every label ending `.prototype.constructor` (983-987), and no owner contributing (988-990).

Ruling on the `both` the § Unknowns asked about: `both accessors of `RegExp.prototype`` in the same paragraph is a `both` whose sentence does not name its members, and `RegExp.prototype` carries more accessors than the two the package captures, so the phrase reads as a fact about the host that is false. It is unchanged text from before checkpoint `163490f` — it appears identically on the `-` and `+` sides of the guide hunk — so it does not falsify this claim, which is about the census. Record it for a successor.

**5. CONFIRMED** — the derivation is a second mechanism, not a restatement.

Attack: I tried to show the equality is a tautology by comparing the two derivations line by line. `tests/setup.ts:796-814` builds the corpus by taking `captured.names(core)`, keeping functions, reading `.prototype`, and keeping own members whose descriptor reports `writable === true`. `tests/src/core/integration.test.ts:978-982` takes the same names, keeps functions, and subtracts `owners`. The shared half is the population; the corpus's own half — the prototype walk and the writability test — is not re-derived anywhere in the assertion. So the equality disagrees exactly when a plain function contributes zero or more than one writable prototype member, or a class contributes any, which is the property the guide states. This clears `.claude/rules/tests.md` line 35 ("Never assert an implementation against itself"). `owners` (970-977) feeds both the filter at 980 and the loop at 988, so the class list has one home. `ContractCompiler` is present at 971, which is what makes the totals reconcile.

**6. CONFIRMED** — the `OWNED_MEMBERS` TSDoc states the property and no number.

Attack: I read `tests/setup.ts:784-788` for a surviving numeral or ordinal and found none, then checked that the property is stated in full across the block rather than half-stated: the edited sentences carry "one row per exported plain function", and the unchanged sentences at 776-778 carry the `.prototype.constructor` identity and the zero-rows-per-class half. One vocabulary with the guide and the test. See finding C for one word inside it.

**7. CONFIRMED** — scope holds, and the class loop still runs.

Attack: I matched the supplied `git status --porcelain` against the U3i brief's owned-file list and read each landed hunk. The five files the claim names carry U3i's content edits; `src/core/ContractCompiler.ts`, `src/core/combinators.ts`, and `tests/src/core/compilers.test.ts` are modified only by the earlier U3 hunks. The guide's second table is rewritten across every row, but the change is column padding from `npm run format` — comparing the `-` and `+` rows for `compileAuditor`, `compileReporter`, `createNumberFaults`, `createArrayFaults`, `selectClosestFaults`, `shapeToKind`, `preview`, and each constant and type row shows identical content. The census loop survives at `integration.test.ts:988-990`, now reading `owners`.

Bounded observation, not a falsification: `expect(OWNED_MEMBERS.length).toBe(216)` was an assertion of the base tree and it is gone. The derived pin no longer reddens when a plain function is exported, where the literal did. That loss is the adopted F2 finding itself, and `.claude/rules/quality.md` § Rounds and verdicts prescribes it ("A subject that reprices itself on every edit — a count, a census, a total over prose — has no closing condition... recast it as the property the tally stood in for"). Neither the guide nor the TSDoc claims the test still catches a new export, so no prose overclaims the weaker pin. Nothing silent was loosened.

**8. CONFIRMED** — no banned construct entered.

Attack: I read every added line in `helpers.test.ts:3323-3354` and `integration.test.ts:959-990` for the banned set. `const exported: unknown = captured.get(core, name)` narrows through `typeof`, with no `as` and no `any`; the only `!` is the logical negation in `!owners.some(...)`; no `@ts-` directive; no `vi.fn`, spy, or module replacement. The two anonymous arrows are callbacks passed directly as arguments, which `AGENTS.md` § Design laws permits. The counting getter is the suite's established recorder form, not a mock of project-owned behaviour: the identical `let reads = 0` plus getter shape appears in `inferers.test.ts:1301`, `cloners.test.ts:528`, `combinators.test.ts:327`, `ShapeCloner.test.ts:665`, `shapers.test.ts:647`, `validators.test.ts:188`, and five prior sites in `helpers.test.ts`. It is a recorder over a hand-rolled data stub, which `.claude/rules/tests.md` line 28 names as the sanctioned instrument.

## Findings outside the claims

**A. `tests/src/core/helpers.test.ts:3249` — the title claims the property only the new pin measures, and the round's own mutation record proves it does not catch it.**

The test reads:

```ts
it('applies the supplied pattern instead of re-reading the shape', () => {
	const shape: StringShape = { type: 'string', pattern: /^a$/ }
	expect(createStringFaults(shape, 'b', [], readPattern(/^b$/))).toEqual([])
	// Control: ...
	expect(faultsToConstraints(createStringFaults(shape, 'b', []))).toEqual(['pattern'])
})
```

The body proves the supplied pattern **decided the match**. It asserts nothing about whether the shape was read. An implementation that reads `shape.pattern`, discards the result, and applies the supplied rebuild passes it unchanged.

Falsifying evidence, from this round's own record: the brief § Evidence states that under the eager-rebuild mutation the single failing test was `answers from a supplied rebuild without asking the shape for its pattern`. That mutation is exactly "re-read the shape" — and the test whose title names that defect passed under it. `.claude/rules/tests.md` § Discovery and adequacy audit requires that each assertion "would fail for the defect it claims to catch"; this one does not.

The design cost is larger than the mechanical one. The suite now carries two adjacent titles making one promise — `applies the supplied pattern instead of re-reading the shape` (3249) and `answers from a supplied rebuild without asking the shape for its pattern` (3323) — with only the second measuring it. A reader who trusts the first stops looking, which is how the promise went unpinned for a round in the first place.

What right looks like: rename 3249 to what its body asserts — `applies the supplied pattern rather than the shape's own to decide the match` — and let 3323 own the read-count promise alone. One concept, one term, one owner.

**B. `guides/contract.md:256` — the recast's closing clause misassigns its subject, and the sentence after it restates the point.**

Shipped: "...so an export that changes the population is derived by the test instead of copied into this paragraph."

Read literally, an export is derived by the test and copied into a paragraph. Neither is true of an export; what the test derives is the population, and what used to be copied into the paragraph was the number. The head noun and the predicate belong to different subjects. This is the sentence carrying the paragraph's whole justification for standing without a number, so a reader who stumbles on it stumbles on the argument.

The sentence immediately following — "A count stated here drifted for a round after further functions were exported, which is why no number stands here." — makes the same point again and makes it correctly, so the paragraph closes twice.

What right looks like: strike the trailing clause and let the correct sentence close the paragraph:

> The suite pins the corpus's composition against the barrel rather than against a remembered number: every exported plain function contributes exactly one row, every row is a `.prototype.constructor`, and no exported class contributes any. A count stated here drifted for a round after further functions were exported, which is why no number stands here.

**C. `tests/setup.ts:788` — "nobody's assertion noticed" gives an assertion a human faculty.**

`.claude/rules/writing.md` § Voice and actor: "Give software no human faculties. A component reports, returns, detects, or refuses; it never knows, thinks, wants, or sees." An assertion is code; it fails or it passes. The predecessor sentence this replaced carried no faculty, so the revision introduced one.

What right looks like: "...because a remembered count drifted for a round after further functions were exported and no assertion failed." That names the observable event and is checkable.

## Observations, not findings

- `a count nobody derives is a count that drifts` (`integration.test.ts:966-967`) is an aphorism, which `AGENTS.md` § Writing bans. I do not raise it as a finding: U3i relocated a near-identical pre-existing aphorism out of `tests/setup.ts` rather than adding one, and this register is the established voice of the package's guide and comments (`guides/contract.md:246`, "two constructions of one refusal are two messages waiting to drift apart"). Ruling on it is a ruling on the package's prose register, which belongs to a design round, not a fix round.
- `guides/contract.md:258` uses `below` ("the load-order precondition below"), which `.claude/rules/writing.md` § Code tokens, references, and links forbids. It is unchanged context in the guide hunk and predates checkpoint `163490f`; the file carries 22 `above`/`below` hits overall. Outside this subject.

VERDICT: FAIL — 1 broken, 0 unresolved, 0 not-evidenced, 3 findings outside the claims
