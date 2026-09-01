# U3 audit round 1 — objective lane verdict (Opus 5 through the reviewer role file, substituting the excluded Sol analyst; blind; immutable)

Lane held: **OBJECTIVE** (correctness, constraints, what the code and the pins actually permit), on Opus 5 as the recorded substitute for the excluded Sol `analyst`. I could not execute; every ruling is derived from the supplied executed records plus first-hand reading of `/home/user/contract` source, tests, and `guides/contract.md`, and I name the bound of each.

### 1. `createStringFaults(shape, value, path)` without the fourth argument behaves exactly as on 0.0.15 — **BROKEN**

The change reduces the number of `Get` operations on `shape.pattern` from three to two, and that is observable through the published door. Baseline: the `!== undefined` test, the `readPattern` argument, the `readPatternSource` argument. Landed (`src/core/helpers.ts:1957-1960`): `const stateless = pattern ?? (shape.pattern === undefined ? undefined : readPattern(shape.pattern))`, then `readPatternSource(stateless)` — two reads.

Falsifying input, through the published export: a shape whose `pattern` getter throws on its third read. Baseline refuses with `ContractError: createStringFaults: shape could not be read`; landed returns a pattern fault. A refusal became an answer. The weaker variant falsifies the `limit` text alone: a getter answering `/^a$/` on reads 1 and 2 and `/^ZZZ$/` on read 3 published `limit: '^ZZZ$'` on the baseline and publishes `limit: '^a$'` now.

Smallest correct fix: **none in code.** The landed behaviour is the better one and consistent with the package's own capture doctrine (`helpers.ts:530-531`). Correct the claim — U3 reduces the shape reads from three to two and makes the `limit` text self-consistent with the pattern that decided the match — and add a pin beside the existing `createStringFaults` hostile-shape pins asserting a counting `pattern` accessor is read exactly twice per call. Bound: the removed lines of the supplied diff over `163490f`; no 0.0.15 artifact reachable from this session.

### 2. With the fourth argument: supplied pattern decides match and `limit`, `shape.pattern` unread, `min`/`max` still read, order kept — **CONFIRMED**

`??` cannot evaluate its right operand while `pattern` is present; `readPatternSource` takes `stateless`; `const stateless` sits after both bound blocks (`:1931`, `:1941`, `:1957`); a `null` fourth argument takes the fallback.

### 3. Compiled reports byte-identical to 0.0.15 — **CONFIRMED**

The only movable text is `limit`, now read from the rebuild. `ShapeCloner.ts:439-444` already builds the clone's pattern from captured `sourceText` and `flags`, so `readPattern` rebuilding it cannot move the source; no `RegExp` has `''` as source; `ShapeValidator` refuses a flagged string pattern before any plan is built, so on the compiled path `readPattern` strips nothing; `readPattern` on a frozen genuine `RegExp` cannot throw. Executed corroboration: empty `diff` over the 324-line record; `PARITY: IDENTICAL`. Coverage bound: the instrument samples what it enumerates; the universal form rests on the code argument.

### 4. Capture inside a `readValue` boundary; reader and code named — **CONFIRMED**

`ContractCompiler.ts:1442-1446` (`compileAuditor`, subject `pattern`, code `pattern`, context `{ shape: 'string' }`) and `:1766-1770` (`compileReporter`). The accessor read at `:1437`/`:1761` sits outside `readValue` but cannot escape: `#auditOf`/`#reportOf` run under `#enter` and `#leave` (`:352-369`) wraps any non-`ContractError`; and the accessor is total (`ShapeCloner.ts:443-445` mints from two captured primitives).

### 5. Shape accessor contract untouched; a caller's `RegExp` never has `lastIndex` moved by a compiled door — **CONFIRMED** as scoped to a compiled door

`ShapeCloner.ts` not in the diff; guide lines 391, 395, 700 unchanged and true. Both compiled leaves pass `readPattern(declared)`; `declared` is the clone's own minted object. Evidence: `caller lastIndex untouched by audit door: 0`. The unscoped form is false; see claims 9 and 11.

### 6. No string-refinement fault literal in `ContractCompiler.ts` — **CONFIRMED**

`constraint` appears nowhere in the file; both string leaves route through `createStringFaults` (`:1451`, `:1776`).

### 7. Added tests bind the mechanism; mutation reddens the supplied-pattern test — **CONFIRMED** for the mutation the claim names

Reproduction reads `Tests 1 failed | 231 passed (232)` naming `applies the supplied pattern instead of re-reading the shape`, and `232 passed (232)` after a sha256-identical restore; the test carries its own negative control. The wider reading does not hold; see F2.

### 8. No pin edited or weakened; counts rose only by the added tests — **CONFIRMED**

Both test hunks are pure additions (74 and 43 added lines, no `-`); the 26 deletions account exactly as `guides/contract.md` 17 + `ContractCompiler.ts` 6 + `helpers.ts` 3. Counts 229 → 232 and 257 → 259.

### 9. Guide `createStringFaults` row accurate; every other clause true — **BROKEN**

The new-parameter text is accurate. One pre-existing clause is no longer true on the supplied-argument path (`guides/contract.md:597`): "The pattern is applied through an OWNED stateless rebuild (`readPattern`) asked through `matchesPattern`, so a caller's `lastIndex` never moves and no caller-writable member decides whether the value matched." Falsifying input: `const caller = /^abc$/g; createStringFaults({ type: 'string', pattern: /^abc$/ }, 'abc', [], caller)` three times → `[]` with `lastIndex` 3, then a pattern fault with `lastIndex` 0, then `[]`. `helpers.ts:1958` binds `stateless` to the supplied object without `readPattern`, and `matchesPattern` (`:590-592`) applies the captured `exec`, which advances `lastIndex` on a `g` pattern. The row's final sentence advertises that this door defends an unchecked shape while the change makes it trust an unchecked `RegExp`.

Smallest correct fix, in `guides/contract.md:597`: qualify the clause to the shape-derived path and state the supplied-argument obligation — "The declaration's pattern is applied through an OWNED stateless rebuild (`readPattern`) asked through `matchesPattern`, so the shape's own pattern never moves a caller's `lastIndex` and no caller-writable member decides whether the value matched. A supplied `pattern` is applied as given: pass a `readPattern` result, because a `g` or `y` pattern makes repeated answers for one value disagree." No code change is required; the code alternative — refuse a supplied pattern whose `readPatternFlags` reports `g` or `y`, one flags read per compiled plan — is a design choice outside my lane.

### 10. Only the five named files; `types.ts` untouched — **CONFIRMED**

`types.ts` declares no function-signature type for any `create*Faults` helper.

### 11. Parameter name, type, TSDoc, placement follow the rules — **BROKEN, on the TSDoc alone**

`pattern?: RegExp` is one word, absence is `undefined`, no `any`/assertion, no nested function beyond the named exceptions, vocabulary coherent (`declared`, `pattern`, `stateless`); the eight duplicated lines between `#auditOf` and `#reportOf` follow the file's established per-leaf shape. The TSDoc fails two requirements: `helpers.ts:1889-1892` still asserts unconditionally that a caller's `lastIndex` never moves (falsified by the claim-9 input; `.claude/rules/writing.md` § Claims), and the `@param pattern` at `:1911-1912` states the prerequisite as a description and omits the failure behaviour (`.claude/rules/typescript.md:80`). Smallest correct fix: qualify the sentence as for claim 9 and extend the `@param` — "Must be a {@link readPattern} result for this shape's own pattern. A pattern carrying `g` or `y` moves the caller's `lastIndex` and makes repeated answers for one value disagree."

## Findings outside the claims

**F1. The auditor leaf's comment mis-states which boundary the schema leaf uses.** `ContractCompiler.ts:1434-1436` says the read runs through "the same boundary the schema leaf uses for the same accessor"; the schema leaf (`:727-733`) reads with a bare `readPatternSource` and throws an explicit `ContractError('compileSchema: pattern source could not be read', …)`, never `readValue`; the two agree only on the code and the context. Fix: replace the final clause with what is true — "so an unreadable source or flags refuses with the same `pattern` code and `{ shape: 'string' }` context the schema leaf publishes." The reporter leaf's comment at `:1759-1760` inherits the error by reference.

**F2. The compiler half of U3 carries no regression pin, and the added compilers tests cannot detect its removal.** Reverting the compile-time capture leaves every test green because the reports are identical either way; both added compilers tests assert report content only. The honest limit: no behavioural test can pin the capture (unobservable through the public surface; counting `RegExp` constructions would need a substitute the non-negotiables forbid). The only instrument that can fail is the paired A/B (audit-deep 0.914 against the U2 checkpoint, every replicate ≤ 0.962). Fix: retain that A/B script and output under `.orkestrel/contract/` and record in the unit report that the capture is guarded by measurement rather than by a test.

VERDICT: FAIL — 3 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims
