# Checker brief — U1 + U1f mechanical conformance (closing the U1 audit's fix round)

## Role and engine

`checker` on Sonnet, native Claude subagent, read-only (Read, Grep, Glob). Perform the assignment directly and spawn nothing. Return the Checklist shape from your role file (Verdict, Checklist item → met / not met → evidence, not-met items as re-dispatchable instructions, Referrals).

## Subject

The combined U1 + U1f working tree of `/home/user/contract` over baseline 3193da1 (0.0.15): a direct-copy path in `readArrayEntries` for an exactly canonical reflected population, with no index-text table. Briefs: `/home/user/scaffold/tmp/units/u1-packed-brief.md`, `/home/user/scaffold/tmp/units/u1f-table-brief.md`; verdict of round 1: `/home/user/scaffold/.orkestrel/contract/u1-audit-verdict.md`. The diff and status are appended in § Evidence.

## Acceptance criteria to check (one piece of evidence each)

1. `git diff src/core/constants.ts` is empty (no `INDEX_TEXTS`, no module-evaluation statement); `grep -rn INDEX_TEXTS src tests guides` finds nothing; `grep -rn -E '^(for|if|while) ' src/core/*.ts` finds nothing.
2. `readArrayEntries` in `src/core/helpers.ts`: reads `length` once and `INTRINSICS.members` once before any decision; decides canonicality with one predicate (`members.length === length + 1`, `members[length] === 'length'`, every `members[position] === INTRINSICS.text(position)`); on a canonical population fills `new INTRINSICS.list(length)` by indexed assignment with `INTRINSICS.own(value, key)` before each single indexed read, freezes entries and result, returns `dense: true`; otherwise runs the pre-existing walk unchanged; no spread, `slice`, `Array.from`, or `for…of` over the caller's value; no size gate.
3. The `readArrayEntries` TSDoc remark and the guide row (`guides/contract.md`, the `readArrayEntries` row) state the direct copy accurately, contain no `INDEX_TEXTS` clause, read "arrive in ascending order, or are sorted numerically", and contain no `above`/`below` cross-reference in added prose (`.claude/rules/writing.md` § Code tokens, references, and links).
4. `tests/src/core/helpers.test.ts`: the added tests are exactly the extra-own-string-key case, the own-symbol-key case, and the disowning cases asserting the message `Array index views disagree` on the first and on the last index; the table test and the restating five-member parity test are absent; no pre-existing test was edited or removed (the diff of the test file is additive apart from those two deletions, which were themselves U1 additions).
5. Every added identifier and test name follows `.claude/rules/names.md` and `.claude/rules/tests.md` (a test is named for what it proves; no control identifier; no `any`, no `as`, no `!`, no nested function outside the two allowed anonymous forms, no mock or spy).
6. Scope honesty: the diff touches only `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, and `guides/contract.md` (constants.ts returns to baseline).
7. Guide parity: no other guide row moved; the `readArrayEntries` row's remaining clauses are true of the code.

## Evidence

**Unit reports.** `/home/user/scaffold/tmp/units/u1-packed-report.md` (U1) and `/home/user/scaffold/tmp/units/u1f-table-report.md` (U1f). Round-1 lane verdicts: `/home/user/scaffold/.orkestrel/contract/u1-audit-subjective.md`, `u1-audit-objective.md`.

**Status.** `git -C /home/user/contract status --porcelain`:
```
 M guides/contract.md
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```

**Diff.** `git -C /home/user/contract diff` (complete, combined U1 + U1f over 3193da1):
```diff
diff --git a/guides/contract.md b/guides/contract.md
index c42a2d1..be02b37 100644
--- a/guides/contract.md
+++ b/guides/contract.md
@@ -213,7 +213,7 @@ The safe JSON surface keeps text parsing lazy: `parseJSON` returns `unknown`, wh
 | `sortValues`            | function | Order primitive keys or indices ascending, on an OWNED copy, through the captured `Array.prototype.sort`. Every schema this package emits is ordered so the same input produces the same bytes; a `sort` that empties its receiver made `valueToSchema({ b: 1, a: 2 })` publish `{ type: 'object', additionalProperties: false }` — a success with the caller's properties silently gone. The comparison is `<` / `>` on primitives, which dispatches through nothing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
 | `pathOf`                | function | Build a diagnostic path from an existing path plus further segments, without array iteration; an absent segment is omitted, so an optional level needs no branch at the call site. `[...path, key]` reads better and retrieves `Array.prototype[Symbol.iterator]` at the moment of use — and the damaging installation there is not a thrower but a LIAR: an iterator yielding one extra value turns a refusal this package authored into `path: ['INJECTED', 'properties', 'INJECTED']`, so a caller writes their own text into a published diagnostic. An indexed walk plus a rest parameter dispatches through nothing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
 | `readValue`             | function | The sole required-read refusal constructor layered over `attempt`: returns a successful callback value, but converts every failed read into `ContractError` with the single message shape `<reader>: <subject> could not be read` and the exact thrown value as `cause`. Its trailing `ReadValueOptions` carries `subject`, `code`, and copied `context`, so the reader owning a public boundary retains its `{ shape }` / `{ path }`. The copy reads OWN fields only: a context that omits `path`, `shape`, `limit`, or `received` publishes that field as absent rather than resolving it through `Object.prototype`, which any caller can write, so no refusal this module authors carries — or retains by identity — a value its caller never supplied. Hostile diagnostic inputs fall back to stable vocabulary without inspecting the thrown value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
-| `readArrayEntries`      | function | Snapshot a caller `readonly T[]` through one reflected-population lens, returning `Result<ArrayRead<T>>`; its default failure channel is `unknown`, and a failed length, `Reflect.ownKeys`, reflected membership, or reflected value read retains the exact thrown value. `length` and the reflected key population are each captured once. Canonical reflected indices below `4294967295` must be below the captured length, are sorted numerically, corroborated with `Object.hasOwn`, and read once. The frozen `entries` are one native sparse array of the captured length: reading a hole yields `undefined`, but own membership stays absent; `dense` means the reflected canonical count equals length. Work and indexed source reads are proportional to reflected population, so consumers must require `dense` or carry an independent bound before length-driven work. A descriptor-only index omitted from reflection is deliberately outside this lens and remains a hole; `4294967295` is metadata, not an array index. Caller-defined iteration is ignored. Backs `arrayOf`, guarded `parseArray`, JSON matching/canonicalization, `inferArray`, the compiled array parser, reporter, and strict array audit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
+| `readArrayEntries`      | function | Snapshot a caller `readonly T[]` through one reflected-population lens, returning `Result<ArrayRead<T>>`; its default failure channel is `unknown`, and a failed length, `Reflect.ownKeys`, reflected membership, or reflected value read retains the exact thrown value. `length` and the reflected key population are each captured once. Canonical reflected indices below `4294967295` must be below the captured length, arrive in ascending order, or are sorted numerically, corroborated with `Object.hasOwn`, and read once. The frozen `entries` are one native sparse array of the captured length: reading a hole yields `undefined`, but own membership stays absent; `dense` means the reflected canonical count equals length. Work and indexed source reads are proportional to reflected population, so consumers must require `dense` or carry an independent bound before length-driven work. A reflected population that is exactly the canonical indices in ascending order followed by `length` is copied straight by index under the same `Object.hasOwn` corroboration, and answers with the same entries, the same `dense` fact, and the same refusals as the walk. A descriptor-only index omitted from reflection is deliberately outside this lens and remains a hole; `4294967295` is metadata, not an array index. Caller-defined iteration is ignored. Backs `arrayOf`, guarded `parseArray`, JSON matching/canonicalization, `inferArray`, the compiled array parser, reporter, and strict array audit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
 | `readGuardShape`        | function | Snapshot a combinator's readable own string guard declarations into one null-prototype guard record and key list, then collect the selected optional-key mode. The supplied reader name owns the shared `shape` and `optional` read refusals. Backs both `recordOf` and `objectOf`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
 | `holds`                 | function | Invoke a zero-arg predicate through the `attempt` boundary — `true` only when the callback returns the boolean literal `true`; a throw (or any non-`true` return) is `false`. Backs the `instanceof`-based validators and every container combinator's element walk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
 | `enumerableKeys`        | function | Snapshot an object's own enumerable **string** keys through the `attempt` boundary, returning a frozen owned list or `undefined` when enumeration throws. THE package-wide runtime property view — compiled guards, parsers, reporters, schema inference, and owned schema cloning all read an object through this one lens, which is the key set `JSON.stringify` serializes (no inherited, symbol, or non-enumerable keys).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
diff --git a/src/core/helpers.ts b/src/core/helpers.ts
index 691406a..4b0e335 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -1004,12 +1004,15 @@ export function matchesRecordBrand(value: unknown): boolean {
  * frozen native snapshot retains actual holes: reading one yields `undefined`,
  * while own membership remains absent. Its work is proportional to the
  * reflected population, so a length-driven consumer must require `dense` or
- * carry an independent bound. Caller-defined iteration is ignored. A
- * descriptor-only index omitted from reflection is deliberately outside this
- * lens and remains a hole. Failure retains the exact thrown value when length,
- * reflection, membership, or indexed value observation throws; a non-native
- * length or view disagreement is also failure. `4294967295` is metadata rather
- * than an array index.
+ * carry an independent bound. A population that is exactly the canonical
+ * indices in ascending order followed by `length` is copied straight by index
+ * under the same per-index corroboration, and answers with the same entries,
+ * the same `dense` fact, and the same refusals as the walk. Caller-defined
+ * iteration is ignored. A descriptor-only index omitted from reflection is
+ * deliberately outside this lens and remains a hole. Failure retains the exact
+ * thrown value when length, reflection, membership, or indexed value
+ * observation throws; a non-native length or view disagreement is also
+ * failure. `4294967295` is metadata rather than an array index.
  *
  * @param value - The array whose reflected indexed entries to read
  * @returns A successful frozen entry snapshot with its dense fact, or a
@@ -1026,11 +1029,28 @@ export function readArrayEntries<T>(value: readonly T[]): Result<ArrayRead<T>> {
 		if (!INTRINSICS.safe(length) || length < 0 || length > 2 ** 32 - 1) {
 			throw new INTRINSICS.error('Array length is outside the native array domain')
 		}
+		const members = INTRINSICS.members(value)
+		// One canonicality question, asked once: the reported population is the
+		// ascending index texts and `length`, and nothing else. The scan stops at
+		// the first disagreement, so a population that fails the question pays for
+		// the prefix it shares with a canonical one before it walks.
+		let matched = 0
+		while (matched < length && members[matched] === INTRINSICS.text(matched)) matched += 1
+		if (matched === length && members.length === length + 1 && members[length] === 'length') {
+			const packed = new INTRINSICS.list<T | undefined>(length)
+			for (let index = 0; index < length; index += 1) {
+				const key = members[index]
+				if (key === undefined || !INTRINSICS.own(value, key)) {
+					throw new INTRINSICS.error('Array index views disagree')
+				}
+				packed[index] = value[index]
+			}
+			return INTRINSICS.freeze({ entries: INTRINSICS.freeze(packed), dense: true })
+		}
 		const collected: number[] = []
 		const keys: string[] = []
 		let ascending = true
 		let previous = -1
-		const members = INTRINSICS.members(value)
 		for (let position = 0; position < members.length; position += 1) {
 			const key = members[position]
 			if (!isString(key)) continue
diff --git a/tests/src/core/helpers.test.ts b/tests/src/core/helpers.test.ts
index 5dea66b..1ff5ddc 100644
--- a/tests/src/core/helpers.test.ts
+++ b/tests/src/core/helpers.test.ts
@@ -703,6 +703,82 @@ describe('readArrayEntries', () => {
 		expect(outcome.value.dense).toBe(true)
 	})
 
+	it('snapshots an array carrying an extra own string key like a plain array', () => {
+		const annotated: number[] = [1, 2]
+		Object.defineProperty(annotated, 'note', { value: 'metadata', enumerable: true })
+		const outcome = readArrayEntries(annotated)
+		const plain = readArrayEntries([1, 2])
+
+		expect(Reflect.ownKeys(annotated)).toEqual(['0', '1', 'length', 'note'])
+		expect(outcome.success).toBe(true)
+		if (!outcome.success) throw outcome.error
+		if (!plain.success) throw plain.error
+		expect(outcome.value.entries).toEqual(plain.value.entries)
+		expect(outcome.value.dense).toBe(plain.value.dense)
+		expect(outcome.value.dense).toBe(true)
+		expect(Reflect.ownKeys(outcome.value.entries)).toEqual(['0', '1', 'length'])
+	})
+
+	it('snapshots an array carrying an own symbol key like a plain array', () => {
+		const marked: number[] = [1, 2]
+		Object.defineProperty(marked, Symbol('mark'), { value: 'metadata', enumerable: true })
+		const outcome = readArrayEntries(marked)
+		const plain = readArrayEntries([1, 2])
+
+		expect(Reflect.ownKeys(marked).length).toBe(4)
+		expect(outcome.success).toBe(true)
+		if (!outcome.success) throw outcome.error
+		if (!plain.success) throw plain.error
+		expect(outcome.value.entries).toEqual(plain.value.entries)
+		expect(outcome.value.dense).toBe(plain.value.dense)
+		expect(outcome.value.dense).toBe(true)
+		expect(Object.getOwnPropertySymbols(outcome.value.entries)).toEqual([])
+	})
+
+	it('refuses a canonical population that disowns its last index', () => {
+		// The reported population is exactly the canonical indices then `length`,
+		// so the direct copy answers it — and every index is still corroborated
+		// against its own membership read rather than taken from the report. The
+		// refusal is pinned to its exact message, so a refusal arriving from
+		// another cause cannot stand in for this one.
+		const disowning = new Proxy([1, 2], {
+			getOwnPropertyDescriptor(target, property) {
+				return property === '1' ? undefined : Reflect.getOwnPropertyDescriptor(target, property)
+			},
+		})
+
+		expect(Reflect.ownKeys(disowning)).toEqual(['0', '1', 'length'])
+		expect(Object.hasOwn(disowning, '1')).toBe(false)
+
+		const outcome = readArrayEntries(disowning)
+		expect(outcome.success).toBe(false)
+		if (outcome.success) throw new Error('a disowned last index was accepted')
+		const refusal = outcome.error
+		if (!(refusal instanceof Error)) throw refusal
+		expect(refusal.message).toBe('Array index views disagree')
+	})
+
+	it('refuses a canonical population that disowns its first index', () => {
+		// The first index is pinned beside the last: a corroboration reaching only
+		// one end of the population still refuses the other, and one end alone
+		// would read as covered.
+		const disowning = new Proxy([1, 2], {
+			getOwnPropertyDescriptor(target, property) {
+				return property === '0' ? undefined : Reflect.getOwnPropertyDescriptor(target, property)
+			},
+		})
+
+		expect(Reflect.ownKeys(disowning)).toEqual(['0', '1', 'length'])
+		expect(Object.hasOwn(disowning, '0')).toBe(false)
+
+		const outcome = readArrayEntries(disowning)
+		expect(outcome.success).toBe(false)
+		if (outcome.success) throw new Error('a disowned first index was accepted')
+		const refusal = outcome.error
+		if (!(refusal instanceof Error)) throw refusal
+		expect(refusal.message).toBe('Array index views disagree')
+	})
+
 	it('fails a non-native advertised length', () => {
 		const hostile = new Proxy([], {
 			get(target, property, receiver) {
```
