# U2 audit round 1 — subjective lane verdict (reviewer / Opus 5, blind; immutable)

**Lane held: SUBJECTIVE** (design fit, naming, TSDoc and guide voice, test-design coherence). The engine that wrote U2 is my own engine; I attacked accordingly.

## Numbered verdicts

**1. CONFIRMED.** Attack tried and failed: I looked for a read of `options` that U2 moved, added, or dropped. The one structural change is that the spread is now conditional on `source !== undefined` (`src/core/helpers.ts:774-783`); `{...undefined}` copies nothing and cannot throw, so the guard changes no read. Order in the tree is `options?.context` (:761), the own-only spread (:774-783), `options?.code` (:784), `options?.subject` (:802) — identical to the diff's `-` side, all inside the eager `attempt`. The hostile record's getter lines are identical on 0.0.15 and the U2 build.

**2. CONFIRMED.** Attack tried and failed: I looked for a way the relocated assembly changes a published refusal or escapes containment. The assembly at :819-827 reads `owned.path` / `.shape` / `.limit` / `.received`, and `owned` is an object literal that always owns all four names as data properties (:777-782), so no prototype walk occurs and no caller accessor can run; the inner conditional spreads use `CreateDataProperty`, which ignores an `Object.prototype` setter. The 25-vector record diffs empty.

**3. CONFIRMED.** The mechanism that produces this property is byte-unchanged, and the record's pollution and inherited-field vectors are identical on both builds.

**4. CONFIRMED**, on the published-object reading. A success path still builds the `owned` projection (:774-783), required by claims 1 and 3. What the mechanism promises — no published `context` object and no `ContractError` on success — holds (:814-835), and identity is pinned at `tests/src/core/helpers.test.ts:686`. Record for the successor brief: write "no published context object".

**5. CONFIRMED.** Boundary cases derived by hand against the walk and the fast path: `'x'.repeat(62)` fast path (encode 64); `'x'.repeat(63)` walk; `'x'.repeat(64)` walk; `'\n'.repeat(31)` fast path at exactly 64; `'\n'.repeat(30) + 'xxx'` walk; `'\n'.repeat(32)` walk — all match the added assertions and the record. The predicate is pinned against loosening.

**6. CONFIRMED.** The gate is `quoted && source.length <= PREVIEW_LIMIT` (:1837); a symbol fails `quoted`; record lines identical.

**7. CONFIRMED.** A loosened predicate reddens the boundary test; a prototype-assembled context reddens `projects its refusal context from OWN context fields only`; wrong key order or a retained caller object reddens `:659`/`:666`. Deleting either mechanism leaves the suite green — a property of a behaviour-neutral optimization. On the brief's sub-question: a timing-ratio assertion does belong in this suite — `.claude/rules/tests.md` § Test contract sanctions pinning a runtime-chosen result as the property it must have, names "the second call is faster" as such a property, and requires `performance.now()`; the guarded-`bench` form is unreachable because `package.json:70` collects `tmp/probe/**` only. Observation: the threshold literal `expect(rendering * 20).toBeLessThan(encoding)` carries no record of the margin it was drawn from (about 2600); one sentence in the comment beside it closes that.

**8. CONFIRMED.** Both test hunks are pure insertions; the pins at `:573` and `:603` read unchanged; 221 → 228 matches the added tests.

**9. CONFIRMED.** The `readValue` row (`guides/contract.md:215`) still holds; the `preview` row (`:602`) matches :1837-1866; one guide line changed; documenting an unobservable routing decision is in voice for that table (`:212` precedent).

**10. CONFIRMED.** Status and diff agree on the three files.

**11. BROKEN.** Two grounds.

**(a) `src/core/helpers.ts:1794-1798` states the pre-change model while the same diff corrected the guide's parallel sentence.** The TSDoc summary still reads "One bounded indexed encoder appends only complete escaped code-point tokens within {@link PREVIEW_LIMIT}" as *the* string mechanism, unqualified, while the unit rewrote the guide's parallel sentence at `:602` to "every other string and every symbol renders through one bounded indexed encoder". Right: apply the guide's qualifier to that sentence — "Every other string and every symbol renders through one bounded indexed encoder that appends only complete escaped code-point tokens within {@link PREVIEW_LIMIT}" — and leave :1804-1817 as the derivation behind it.

**(b) `src/core/helpers.ts:1809`, `:1811`, `:1817` give one term two referents.** The added paragraph names the encoder as bare `stringify` three times; every other TSDoc reference in `src/core` writes `JSON.stringify`, and the code calls `INTRINSICS.stringify`; bare `stringify` is also the `INTRINSICS` member name. Breaks "One concept, one term" and `.claude/rules/writing.md` § Code tokens (a code token followed by a noun). Right: write `JSON.stringify` in all three places, followed by a noun where the sentence allows — "what one `JSON.stringify` call returns".

What held in claim 11: `owned` as the record's field name; no nested function, no helper, no `any`, no `as`, no `!`; the comments at :770-773 and :815-817 earn their place.

## Findings fitting no claim

None.

## Referral to the objective lane (not a finding, not counted)

`src/core/helpers.ts:802` reads `options.subject` twice — `isString(options?.subject) ? options.subject : 'value'` — and the second read's value is consumed at `:829` inside a template literal that evaluates outside the `attempt`. An accessor returning a string on the first read and a non-string on the second yields a `subject` typed `string` holding a non-string, whose `toString` then runs outside containment. Unchanged by U2 and present on 0.0.15; the hostile record covers a throwing `subject` getter but no alternating one.

VERDICT: FAIL — 1 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
