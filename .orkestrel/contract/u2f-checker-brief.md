# Checker brief — U2 + U2f mechanical conformance (closing the U2 audit's fix round)

## Role and engine

`checker` on Sonnet, native Claude subagent, read-only (Read, Grep, Glob). Perform the assignment directly and spawn nothing. Return the Checklist shape from your role file (Verdict, Checklist item → met / not met → evidence, not-met items as re-dispatchable instructions, Referrals).

## Subject

The combined U2 + U2f working tree of `/home/user/contract` over checkpoint e81ba64: `readValue` builds its published context and error only on refusal and reads `options.subject` once; `preview` takes a whole-string encode for a short quoted string. Briefs: `/home/user/scaffold/tmp/units/u2-readvalue-preview-brief.md`, `/home/user/scaffold/tmp/units/u2f-brief.md`; round-1 verdict: `/home/user/scaffold/.orkestrel/contract/u2-audit-verdict.md`. The diff and status are appended in § Evidence.

## Acceptance criteria to check (one piece of evidence each)

1. `src/core/helpers.ts` `preview` TSDoc: the sentence "One bounded indexed encoder appends only complete escaped code-point tokens" no longer appears unqualified; the summary states the whole-string case first and then "Every other string and every symbol renders through one bounded indexed encoder …"; the derivation paragraph contains no bare `` `stringify` `` token (every occurrence reads `` `JSON.stringify` `` followed by a noun); the TSDoc agrees with the `preview` row of `guides/contract.md` (line 602).
2. `readValue` reads `options?.subject` exactly once, inside the eager `attempt`, into a local consumed by the record; `options?.code` is read once; the own-only spread over `context` stays inside the eager `attempt`; the published `context` object and the `ContractError` are built only in the refusal branch.
3. The `readValue` describe in `tests/src/core/helpers.test.ts` contains the pin `refuses through its own error when a subject accessor changes its answer between reads`, asserting a `ContractError` narrowed with `instanceof`, the message `door: thing could not be read`, and a single getter read; the three U2 `readValue` pins and the four U2 `preview` pins are present; the timing pin's threshold line carries the margin comment.
4. No pre-existing test was edited or removed (the test-file diff over e81ba64 is additive apart from the U2f comment line).
5. Names and forbidden syntax: every added identifier and test name follows `.claude/rules/names.md` and `.claude/rules/tests.md`; no `any`, `as`, `!` non-null, `@ts-` directive, nested function outside the two allowed anonymous forms, mock, or spy; added prose carries no `above`/`below` cross-reference and follows `.claude/rules/writing.md` § Code tokens (a code token followed by a noun).
6. Scope honesty: the diff touches only `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, and `guides/contract.md`.
7. Guide parity: exactly one guide row changed (`preview`, line 602); the `readValue` row (line 215) and the `PREVIEW_LIMIT` row remain true of the code.

## Evidence

**Unit reports.** `/home/user/scaffold/tmp/units/u2-readvalue-preview-report.md` (U2) and `/home/user/scaffold/tmp/units/u2f-report.md` (U2f). Round-1 lane verdicts: `/home/user/scaffold/.orkestrel/contract/u2-audit-subjective.md`, `u2-audit-objective.md`.

**Orchestrator records on the U2f tree.** Read-once mutation (the record's `subject` rebuilt from a second `options.subject` read) reddens exactly `refuses through its own error when a subject accessor changes its answer between reads` (1 failed / 228 passed of 229), restored exactly → 229 passed. Hostile `readValue` record versus 0.0.15 differs on exactly one line, the alternating-subject vector: baseline `THREW Error … "hostile toString"`, U2f `THREW ContractError code=structure msg="door: thing could not be read" … cause="boom"`. Preview record identical. Parity IDENTICAL in both forms. `grep -c` of bare `` `stringify` `` in `helpers.ts`: 0; of the superseded sentence: 0.

**Status.** `git -C /home/user/contract status --porcelain`:
```
 M guides/contract.md
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```

**Diff.** `git -C /home/user/contract diff` (complete, combined U2 + U2f over e81ba64):
```diff
diff --git a/guides/contract.md b/guides/contract.md
index be02b37..a6d49f2 100644
--- a/guides/contract.md
+++ b/guides/contract.md
@@ -599,7 +599,7 @@ Two diagnostics, one for each artifact that answers yes-or-no. `compileReporter`
 | `createArrayFaults`   | function  | array shape + length + path → `readonly Fault[]` — the length half of the array report, taking the LENGTH rather than the array because both doors have already read their entries through `readArrayEntries` and must report the count that read observed rather than re-asking the caller's value. Order is `min`, then `max`. An unreadable shape is refused as `createArrayFaults: shape could not be read`, through the same boundary and for the same reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
 | `selectClosestFaults` | function  | reports → the closest one — the union summary both doors append their closest variant's faults to. "Closest" is the SHORTEST report and an earlier variant wins a tie, so a union's diagnostic follows declaration order rather than whichever variant a later comparison happened to visit. The winner is returned BY IDENTITY, never copied, so the summary carries the exact fault objects the variant produced; no report at all yields a frozen empty collection rather than `undefined`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
 | `shapeToKind`         | function  | shape → `FaultKind` — projects a `ContractShape` to the kind it describes (`numberShape` → `'integer'` when `integer: true`, else `'number'`; `optionalShape` / `nullableShape` project through their inner shape; `rawShape` → `'json'`). A hand-authored node carrying an unrecognized discriminant is REFUSED as `shapeToKind: shape could not be read`, not answered out of type: the switch had no `default` and returned `undefined`, which made a non-optional declared return type a lie at a public export. The discriminant is only half of it — this is a REQUIRED reader over the whole node, so a `type` that cannot be read at all raises the identical refusal, and an `optional` / `nullable` whose inner projection refuses surfaces under the OUTER name with the inner failure as `cause`. The reader that owns the projection is the one that names it, at whatever depth the projection actually failed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
-| `preview`             | function  | value → `string` — a short, TOTAL preview for a `Fault`'s `received` field. String and narrowed-symbol text is printable JSON-escaped content: strings retain outer quotes, symbols use intrinsic `String(value)` without retrieving mutable `Symbol.prototype.toString` and omit only the escaping quotes. One bounded indexed encoder appends complete escaped code-point tokens within `PREVIEW_LIMIT`; it never retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping. Arrays render as `array`; every other host renders as its bare `typeof` tag. It never traverses or stringifies a container and does not promise grapheme-cluster preservation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+| `preview`             | function  | value → `string` — a short, TOTAL preview for a `Fault`'s `received` field. String and narrowed-symbol text is printable JSON-escaped content: strings retain outer quotes, symbols use intrinsic `String(value)` without retrieving mutable `Symbol.prototype.toString` and omit only the escaping quotes. A string takes its answer from one whole-string encode when the string is within `PREVIEW_LIMIT` code units and that encode fits the same limit; every other string and every symbol renders through one bounded indexed encoder that appends complete escaped code-point tokens within `PREVIEW_LIMIT`. Neither path retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping. Arrays render as `array`; every other host renders as its bare `typeof` tag. It never traverses or stringifies a container and does not promise grapheme-cluster preservation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
 | `FAULT_LIMIT`         | const     | `64` — the maximum entries a single `explain` OR `audit` report ever returns, frozen. It bounds both reporting surfaces: `compileReporter` and `compileAuditor` each slice every recursive call to it, so the cap holds at every nesting level, and a diagnostic surface sized off this constant is right about `audit` too.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
 | `PREVIEW_LIMIT`       | const     | `64` — the maximum code-unit budget for complete encoded tokens in a `preview`; a clipped result adds one trailing `…`, frozen.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
 | `Fault`               | type      | discriminated union on `reason`: `'type'` (`{ path, expected, received }`), `'missing'` (`{ path, expected }`), `'constraint'` (`{ path, expected, constraint, limit?, received }`), `'variant'` (`{ path, variants }`), `'oneOf'` (`{ path, matched }`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
diff --git a/src/core/helpers.ts b/src/core/helpers.ts
index 4b0e335..80f40fe 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -767,24 +767,22 @@ export function readValue<T>(callback: () => T, reader: string, options?: ReadVa
 		// prototype chose what a refusal this module authored published and
 		// retained the caller's object by identity. Spread copies own enumerable
 		// properties only through the spec's own copy operation, so the projection
-		// stays own-only without dispatching through a replaceable global.
-		const owned = {
-			path: undefined,
-			shape: undefined,
-			limit: undefined,
-			received: undefined,
-			...source,
-		}
-		const context =
+		// stays own-only without dispatching through a replaceable global. The
+		// copy stays EAGER because performing it is what refuses a hostile
+		// context: a throwing getter on any own key — advertised or not — must
+		// refuse this call whether or not the callback goes on to succeed.
+		const owned =
 			source === undefined
 				? undefined
 				: {
-						...(owned.path === undefined ? {} : { path: owned.path }),
-						...(owned.shape === undefined ? {} : { shape: owned.shape }),
-						...(owned.limit === undefined ? {} : { limit: owned.limit }),
-						...(owned.received === undefined ? {} : { received: owned.received }),
+						path: undefined,
+						shape: undefined,
+						limit: undefined,
+						received: undefined,
+						...source,
 					}
 		const requested = options?.code
+		const subject = options?.subject
 		const code: ContractCode =
 			requested === 'bound' ||
 			requested === 'range' ||
@@ -802,9 +800,9 @@ export function readValue<T>(callback: () => T, reader: string, options?: ReadVa
 				: 'structure'
 		return {
 			reader: isString(reader) ? reader : 'readValue',
-			subject: isString(options?.subject) ? options.subject : 'value',
+			subject: isString(subject) ? subject : 'value',
 			code,
-			context,
+			owned,
 		}
 	})
 	if (!diagnostics.success) {
@@ -815,11 +813,24 @@ export function readValue<T>(callback: () => T, reader: string, options?: ReadVa
 	}
 	const outcome = attempt(callback)
 	if (!outcome.success) {
+		// Only a refusal publishes a context, so the published object is assembled
+		// in this branch rather than beside the copy. `owned` already holds copied
+		// values, so assembling it outside the contained read cannot throw.
+		const owned = diagnostics.value.owned
+		const context =
+			owned === undefined
+				? undefined
+				: {
+						...(owned.path === undefined ? {} : { path: owned.path }),
+						...(owned.shape === undefined ? {} : { shape: owned.shape }),
+						...(owned.limit === undefined ? {} : { limit: owned.limit }),
+						...(owned.received === undefined ? {} : { received: owned.received }),
+					}
 		throw new ContractError(
 			`${diagnostics.value.reader}: ${diagnostics.value.subject} could not be read`,
 			{
 				code: diagnostics.value.code,
-				...(diagnostics.value.context === undefined ? {} : { context: diagnostics.value.context }),
+				...(context === undefined ? {} : { context }),
 				cause: outcome.error,
 			},
 		)
@@ -1781,15 +1792,32 @@ export function sanitizeDepth(value: number | undefined): number {
  * @remarks
  * A primitive renders as printable text: a string retains its quoted JSON
  * representation, while a narrowed symbol renders through intrinsic `String`
- * and receives the same escaping without outer quotes. One bounded indexed
- * encoder appends only complete escaped code-point tokens within
- * {@link PREVIEW_LIMIT}; clipping therefore never retrieves the mutable string
- * iterator or splits an escape/surrogate pair before its trailing `…`, and
- * enormous primitive text is not fully traversed. A number / boolean / bigint
- * renders via `String`; `null` and `undefined` render as their own name. An
- * array renders as `'array'`. Every other host — a plain object, a function, a
- * class instance, a `Map` — is NEVER traversed or stringified; it renders as
- * its bare `typeof` tag (`'object'` / `'function'`).
+ * and receives the same escaping without outer quotes. A string of at most
+ * {@link PREVIEW_LIMIT} code units takes its answer from one whole-string
+ * encode when that encode fits the same limit, and the length predicate
+ * deciding it is exact rather than approximate. Every other string and every
+ * symbol renders through one bounded indexed encoder that appends only
+ * complete escaped code-point tokens within {@link PREVIEW_LIMIT}; clipping
+ * therefore never retrieves the mutable string iterator or splits an
+ * escape/surrogate pair before its trailing `…`, and enormous primitive text
+ * is not fully traversed. A number / boolean / bigint renders via `String`;
+ * `null` and `undefined` render as their own name. An array renders as
+ * `'array'`. Every other host — a plain object, a function, a class instance,
+ * a `Map` — is NEVER traversed or stringified; it renders as its bare
+ * `typeof` tag (`'object'` / `'function'`).
+ *
+ * The indexed encoder appends every token and closes with the quote exactly
+ * when the escaped inner length is at most `PREVIEW_LIMIT - 2`, which is
+ * character for character what one `JSON.stringify` call returns. At an inner
+ * length of `PREVIEW_LIMIT - 1` the indexed encoder appends every token and
+ * closes with `…` instead, while one `JSON.stringify` call over that same
+ * string measures `PREVIEW_LIMIT + 1` — so the predicate refuses that string
+ * and every longer one, and each of them renders through the indexed encoder.
+ * Escaping never shrinks text, so the leading `source.length` gate admits
+ * every string the predicate could accept while keeping enormous primitive
+ * text out of the whole-string encode. A symbol renders through the indexed
+ * encoder because its unquoted text is not what a `JSON.stringify` call
+ * returns.
  *
  * @param value - The value to preview
  * @returns A short descriptive string, always safe to embed in a diagnostic
@@ -1809,6 +1837,10 @@ export function preview(value: unknown): string {
 	if (isString(value) || isSymbol(value)) {
 		const quoted = isString(value)
 		const source = INTRINSICS.text(value)
+		if (quoted && source.length <= PREVIEW_LIMIT) {
+			const whole = INTRINSICS.stringify(source)
+			if (whole.length <= PREVIEW_LIMIT) return whole
+		}
 		let text = quoted ? '"' : ''
 		let index = 0
 		while (index < source.length) {
diff --git a/tests/src/core/helpers.test.ts b/tests/src/core/helpers.test.ts
index 1ff5ddc..e74f942 100644
--- a/tests/src/core/helpers.test.ts
+++ b/tests/src/core/helpers.test.ts
@@ -619,6 +619,102 @@ describe('readValue', () => {
 		expect(Object.values(error.context ?? {})).not.toContain(stolen)
 		expect(error.message).toBe('stringShape: options could not be read')
 	})
+
+	it('refuses the read when any own context field throws, advertised or not', () => {
+		// The copy takes every OWN enumerable key, so a key `ContractErrorContext`
+		// never advertises is read at the same moment as one it does. A reader
+		// consulting the four consumed names BY NAME would let the unadvertised
+		// getter through and go on to publish a refusal built from a context
+		// nothing could finish reading.
+		const reason = Object.freeze({ stage: 'context read' })
+		const observed = ['path', 'detail'].map((key) => {
+			const context: ContractErrorContext = {}
+			Object.defineProperty(context, key, { enumerable: true, get: throwSentinel(reason) })
+			const error = captureContractError(() => readValue(() => 42, 'example', { context }))
+			return [key, error.message, error.code, error.cause === reason]
+		})
+
+		expect(observed).toEqual([
+			['path', 'readValue: options could not be read', 'structure', true],
+			['detail', 'readValue: options could not be read', 'structure', true],
+		])
+	})
+
+	it('publishes carried context fields in one canonical order and retains no caller object', () => {
+		const reason = Object.freeze({ stage: 'read' })
+		const carried: ContractErrorContext = {
+			received: '"sample"',
+			limit: 8,
+			shape: 'string',
+			path: ['values', 'name'],
+		}
+		const error = captureContractError(() =>
+			readValue(throwSentinel(reason), 'example', {
+				subject: 'array',
+				code: 'bound',
+				context: carried,
+			}),
+		)
+
+		expect(Object.keys(error.context ?? {})).toEqual(['path', 'shape', 'limit', 'received'])
+		expect(error.context).toEqual({
+			path: ['values', 'name'],
+			shape: 'string',
+			limit: 8,
+			received: '"sample"',
+		})
+		expect(error.context).not.toBe(carried)
+		expect(error.code).toBe('bound')
+		expect(error.message).toBe('example: array could not be read')
+		expect(error.cause).toBe(reason)
+
+		const partial = captureContractError(() =>
+			readValue(throwSentinel(reason), 'example', { context: { received: 'null', path: ['id'] } }),
+		)
+
+		expect(Object.keys(partial.context ?? {})).toEqual(['path', 'received'])
+	})
+
+	it('returns the callback value by identity when every context field is carried', () => {
+		const value = Object.freeze({ id: 1 })
+		const read = readValue(() => value, 'example', {
+			subject: 'record',
+			code: 'clone',
+			context: { path: ['values'], shape: 'object', limit: 4, received: 'object' },
+		})
+
+		expect(read).toBe(value)
+		expect(readValue(() => undefined, 'example')).toBeUndefined()
+	})
+
+	it('refuses through its own error when a subject accessor changes its answer between reads', () => {
+		let reads = 0
+		const options = {
+			get subject() {
+				reads += 1
+				return reads === 1
+					? 'thing'
+					: {
+							toString() {
+								throw new Error('hostile toString')
+							},
+						}
+			},
+		}
+		const error = captureContractError(() =>
+			Reflect.apply(readValue, undefined, [
+				() => {
+					throw new Error('hostile read')
+				},
+				'door',
+				options,
+			]),
+		)
+
+		expect(error).toBeInstanceOf(ContractError)
+		expect(error.message).toBe('door: thing could not be read')
+		expect(reads).toBe(1)
+	})
 })
 
 describe('readArrayEntries', () => {
@@ -2392,6 +2488,63 @@ describe('preview', () => {
 		expect(preview([1, 2, 3])).toBe('array')
 		expect(preview(() => 1)).toBe('function')
 	})
+
+	it('renders a string by its escaped length at, on, and past the clip boundary', () => {
+		// The ESCAPED inner length decides the answer, never the input length. At
+		// two under `PREVIEW_LIMIT` the render closes with the quote, and one
+		// character further it closes with the clip mark instead.
+		expect(preview('x'.repeat(62))).toBe(`"${'x'.repeat(62)}"`)
+		expect(preview('x'.repeat(63))).toBe(`"${'x'.repeat(63)}…`)
+		expect(preview('x'.repeat(64))).toBe(`"${'x'.repeat(63)}…`)
+		expect(preview('\n'.repeat(31))).toBe(`"${'\\n'.repeat(31)}"`)
+		expect(preview(`${'\n'.repeat(30)}xxx`)).toBe(`"${'\\n'.repeat(30)}xxx…`)
+		expect(preview('\n'.repeat(32))).toBe(`"${'\\n'.repeat(31)}…`)
+	})
+
+	it('escapes a lone surrogate and keeps a short astral pair whole', () => {
+		const pair = `a${String.fromCodePoint(0x1f600)}b`
+
+		expect(preview('\ud800')).toBe('"\\ud800"')
+		expect(preview('a\udc00b')).toBe('"a\\udc00b"')
+		expect(preview(pair)).toBe(`"${pair}"`)
+		expect(preview(pair).isWellFormed()).toBe(true)
+	})
+
+	it('renders a symbol unquoted at a length a string renders quoted', () => {
+		expect(preview(Symbol('sample'))).toBe('Symbol(sample)')
+		expect(preview(Symbol('line\n'))).toBe('Symbol(line\\n)')
+		expect(preview('sample')).toBe('"sample"')
+	})
+
+	it('renders text far past the limit without encoding the text it never renders', () => {
+		// The clipped answer is the same whether or not the whole string was
+		// encoded first, so the promise that enormous primitive text is never
+		// fully encoded is a cost relationship rather than an output difference.
+		// The lowest reading of several is taken on each side, so a scheduler
+		// stall lengthens one reading instead of deciding the comparison. The
+		// encoded length is asserted as well, because a control that skipped the
+		// work would make the comparison meaningless.
+		const huge = '\n'.repeat(2_000_000)
+		let rendering = Number.POSITIVE_INFINITY
+		let encoding = Number.POSITIVE_INFINITY
+		let rendered = ''
+		let encoded = ''
+		for (let round = 0; round < 3; round += 1) {
+			const renderStart = performance.now()
+			rendered = preview(huge)
+			rendering = Math.min(rendering, performance.now() - renderStart)
+			const encodeStart = performance.now()
+			encoded = INTRINSICS.stringify(huge)
+			encoding = Math.min(encoding, performance.now() - encodeStart)
+		}
+
+		expect(rendered).toBe(`"${'\\n'.repeat(31)}…`)
+		expect(encoded.length).toBe(4_000_002)
+		// The threshold is 20 times; the gate measured about 2600 times on an
+		// idle host, so a red reading here is host noise or a lost gate, and
+		// the Orchestrator's idle re-run decides which.
+		expect(rendering * 20).toBeLessThan(encoding)
+	})
 })
 
 describe('shapeToKind', () => {
```
