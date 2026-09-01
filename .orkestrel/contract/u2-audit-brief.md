# Audit brief — U2 `readValue` success-path allocations and the bounded `preview` fast path (round 1)

## Subject and chain

Branch `claude/method-memoization-contracts-yus26p` of `@orkestrel/contract`, tip = the U2 working tree over the U1 checkpoint (U1: packed-array fast path in `readArrayEntries`, audited and accepted). U2 claims two behaviour-preserving changes in `src/core/helpers.ts`: `readValue` keeps every eager read and builds its published context object and `ContractError` only on refusal; `preview` renders a short quoted string through one whole-string `JSON.stringify` when the source is at most `PREVIEW_LIMIT` characters and the encoded form fits, and keeps the per-character walk otherwise. Assume this chain has one more.

## What the round decides

Whether U2 is committed as the campaign's second checkpoint and whether unit U3 dispatches on top of it. A finding here is worth more than a clean pass: the alternative is a consumer meeting a changed refusal or a changed `received` text after 0.0.16 is published.

## Already established by the Orchestrator directly (do not re-run)

- The dist-level surgeries A2c and A11 read, in 6 fresh processes with load order swapped: audit-medium 0.866 (every replicate ≤ 0.895), audit-deep 0.871 (≤ 0.887), parse-medium 0.959; explain-medium on an invalid value 0.819 (≤ 0.836); answer parity IDENTICAL over 1062 comparisons for each; the sabotaged control reads 16 differences.
- On the 0.0.15 dist and on the A2c dist, 27 honest and hostile option records through `readValue` and a compiled auditor print identical lines (`readvalue-hostile-*.out`): the same refusal message, code, context keys in order, and cause for every vector, including a throwing getter on an unadvertised own context key, a non-enumerable throwing getter, throwing `code`/`subject`/`context` getters, an inherited field through the prototype, a polluted `Object.prototype` on each advertised field, `null` and string options.
- On the 0.0.15 dist and on the A11 dist, 41 `preview` samples print identical lines (`preview-boundary-*.out`): escapes, surrogate pairs, a lone surrogate, control characters, lengths 61 through 65 and 200, a 1,000,000-character string, quote-only strings at encoded lengths 60 through 66, symbols at 64 and 65, and every non-string kind.
- The Orchestrator re-ran both instruments on the U2 SOURCE build and diffed them against the baseline records; see § Evidence.

## Lanes

Two blind lanes on this identical brief, each a fresh clean-context Opus 5 subagent through the `reviewer` role file: the SUBJECTIVE lane (design fit, naming, TSDoc and guide voice, coherence) and the OBJECTIVE lane (correctness, constraints, what the code and the pins permit; the recorded substitute for the excluded Sol `analyst`). Both lanes are read-only; every executed record they need is in § Evidence. The engine that wrote U2 is Opus 5, the same engine as both lanes: attack the work harder for that reason, and say which lane you held.

## Numbered falsifiable claims

1. `readValue` performs exactly the reads it performed on 0.0.15, at the same point, in the same order: `options?.context`, then the own-only spread over `context` (every own enumerable key, advertised or not), then `options?.code`, then `options?.subject`, all inside the eager `attempt`, before the callback runs.
2. Every refusal `readValue` publishes is byte-identical to 0.0.15: the same message shape, the same `code` narrowing (an unknown code falls to `structure`), the same `context` keys in the same order with absent fields omitted, and the same `cause` identity.
3. A polluted `Object.prototype` field named `path`, `shape`, `limit`, or `received` still contributes nothing to a published context, and an inherited field on a context object still contributes nothing.
4. A successful read returns the callback's exact value and allocates no context object and no error (attack: find a success path that still builds one).
5. `preview` returns, for every string, the same text as 0.0.15, including at the encoded-length boundary (`PREVIEW_LIMIT - 2`, `PREVIEW_LIMIT - 1`, `PREVIEW_LIMIT`), for escape sequences that expand a single character to two or six tokens, for surrogate pairs and lone surrogates, and for a string whose `length` is at most `PREVIEW_LIMIT` while its encoded form exceeds it.
6. `preview` never fully encodes a string longer than `PREVIEW_LIMIT` characters (the documented "enormous primitive text is not fully traversed" promise holds), and symbols keep the per-character walk and render unquoted.
7. The added tests bind both mechanisms: the writer's two mutation probes (the `...source` spread removed; the `source.length` gate removed) each turn a named test red, and the Orchestrator's reproduction agrees.
8. No pin at `tests/src/core/helpers.test.ts` for `readValue` (`:524–620`, including the pollution cases at `:573` and the door case at `:603`) or for `preview` was edited or weakened; the scoped suite's count rose only by the added tests.
9. The guide's `readValue` row (line 215) and `preview` row (line 602) remain true of the code; any sentence the unit changed is accurate and every other row is untouched.
10. The diff touches only `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, and (if at all) `guides/contract.md`.
11. Naming, TSDoc voice, and the flat diagnostic record's field names follow `AGENTS.md` and the rule files; the code introduces no nested function, no hidden helper, no `any`, and no assertion.

## Unknowns

None named by the Orchestrator; name any you find as UNRESOLVED with what would settle it.

## Instructions

- CONFIRMED requires naming the attack you tried that failed, against the evidence supplied.
- A claim you cannot decide from the evidence is UNRESOLVED, not CONFIRMED — say what would settle it.
- Do not hedge toward an imagined consensus; the other lane is blind to you.
- Return exactly the `orkestrel-falsify` verdict shape: numbered verdicts in this order, findings fitting no claim, and one terminal `VERDICT:` line. No process diary.

## Evidence

**Unit report.** `/home/user/scaffold/tmp/units/u2-readvalue-preview-report.md` (read it; it carries the mechanisms, the writer's counts, the guide sentence replaced, and one recorded decision: the `preview` not-fully-encoded pin is a timing-ratio assertion because removing the length gate changes no output).

**Status.** `git -C /home/user/contract status --porcelain`:
```
 M guides/contract.md
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```

**Mutation reproductions (Orchestrator).** With the `...source,` spread line deleted from the eager projection, the scoped helpers suite reports `Tests 5 failed | 223 passed (228)`: `carries structured context and contains hostile diagnostic options`, `projects its refusal context from OWN context fields only`, `keeps a caller value out of a builder refusal it never received`, `refuses the read when any own context field throws, advertised or not`, `publishes carried context fields in one canonical order and retains no caller object`; restored exactly (sha256 of `helpers.ts` identical) → `228 passed (228)`. With the `source.length <= PREVIEW_LIMIT` gate removed, `Tests 1 failed | 227 passed (228)`: `renders text far past the limit without encoding the text it never renders` (`expected 274.6 to be less than 13.7`); restored exactly → `228 passed (228)`.

**readValue hostile record.** 25 vectors through `readValue` and a compiled auditor print identical lines on 0.0.15 and on the U2 build (`diff` empty). Baseline lines:
```
success plain: returned 7
success full context: returned "v"
failure full context: THREW ContractError code=bound msg="door: thing could not be read" contextKeys=path,shape,limit,received context={"path":["a","b"],"shape":"string","limit":3,"received":"\"x\""} cause="boom"
failure partial context: THREW ContractError code=structure msg="door: thing could not be read" contextKeys=shape context={"shape":"object"} cause="boom"
failure no context: THREW ContractError code=structure msg="door: thing could not be read" contextKeys=- context=undefined cause="boom"
failure no options: THREW ContractError code=structure msg="door: value could not be read" contextKeys=- context=undefined cause="boom"
failure unknown code: THREW ContractError code=structure msg="door: value could not be read" contextKeys=path context={"path":[]} cause="boom"
failure non-string reader/subject: THREW ContractError code=structure msg="readValue: value could not be read" contextKeys=- context=undefined cause="boom"
advertised getter throws on success: THREW ContractError code=structure msg="readValue: options could not be read" contextKeys=- context=undefined cause="path-getter"
unadvertised getter throws on success: THREW ContractError code=structure msg="readValue: options could not be read" contextKeys=- context=undefined cause="extra-getter"
unadvertised getter throws on failure: THREW ContractError code=structure msg="readValue: options could not be read" contextKeys=- context=undefined cause="extra-getter"
non-enumerable unadvertised getter: returned 1
code getter throws: THREW ContractError code=structure msg="readValue: options could not be read" contextKeys=- context=undefined cause="code-getter"
subject getter throws: THREW ContractError code=structure msg="readValue: options could not be read" contextKeys=- context=undefined cause="subject-getter"
context getter throws: THREW ContractError code=structure msg="readValue: options could not be read" contextKeys=- context=undefined cause="context-getter"
inherited field via prototype: THREW ContractError code=structure msg="door: value could not be read" contextKeys=shape context={"shape":"s"} cause="boom"
Object.prototype.path polluted, failure with other fields: THREW ContractError code=structure msg="door: value could not be read" contextKeys=shape context={"shape":"s"} cause="boom"
Object.prototype.shape polluted, failure with other fields: THREW ContractError code=structure msg="door: value could not be read" contextKeys=shape context={"shape":"own"} cause="boom"
Object.prototype.limit polluted, failure with other fields: THREW ContractError code=structure msg="door: value could not be read" contextKeys=shape context={"shape":"s"} cause="boom"
Object.prototype.received polluted, failure with other fields: THREW ContractError code=structure msg="door: value could not be read" contextKeys=shape context={"shape":"s"} cause="boom"
context is null: THREW ContractError code=structure msg="door: value could not be read" contextKeys= context={} cause="boom"
options is a string: THREW ContractError code=structure msg="door: value could not be read" contextKeys=- context=undefined cause="boom"
auditor prototype-trap refusal: THREW ContractError code=structure msg="compileAuditor: object could not be read" contextKeys=path,shape context={"path":["root"],"shape":"object"} cause="proto"
auditor ownKeys-trap refusal: THREW ContractError code=structure msg="compileAuditor: object could not be read" contextKeys=path,shape context={"path":[],"shape":"object"} cause="keys"
```

**preview boundary record.** 41 samples print identical lines on 0.0.15 and on the U2 build (`diff` empty). Baseline lines (truncated at 110 characters):
```
empty: "\"\""
short: "\"guest\""
quote: "\"a\\\"b\""
backslash: "\"a\\\\b\""
newline: "\"a\\nb\""
tab: "\"\\t\""
control: "\"\\u0001x\""
del: "\"\""
pair: "\"😀\""
pairs40: "\"😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀�
lone: "\"\\ud800\""
loneTrail: "\"\\udc00x\""
accented70: "\"ééééééééééééééééééééééééééééééééééééééééééééééé�
len61: "\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\""
len62: "\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\""
len63: "\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx…"
len64: "\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx…"
len65: "\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx…"
len200: "\"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx…"
huge: "\"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy…"
escapes30: "\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"
escapes31: "\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"
escapes32: "\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"
escapes33: "\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"\\\"
controlEscape10: "\"\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\""
controlEscape11: "\"\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001\\u0001…"
sym: "Symbol(s)"
sym64: "Symbol(yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy…"
sym65: "Symbol(zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz…"
symQuote: "Symbol(a\\\"b)"
num: "42"
neg0: "0"
nan: "NaN"
big: "10n"
bool: "true"
nul: "null"
undef: "undefined"
arr: "array"
obj: "object"
fn: "function"
```

**Answer parity.** Identity-sensitive and content forms both read `PARITY: IDENTICAL` over 1062 comparisons for the U2 build against 0.0.15.

**6-process paired A/B.** Against the 0.0.15 dist (the declared admission reading):
```
audit-medium: median 0.833 min 0.809 max 0.854 replicates ab-1=0.854 ab-2=0.833 ab-3=0.844 ba-1=0.829 ba-2=0.809 ba-3=0.814
audit-deep: median 0.864 min 0.798 max 0.886 replicates ab-1=0.864 ab-2=0.878 ab-3=0.857 ba-1=0.798 ba-2=0.886 ba-3=0.848
explain-medium: median 0.751 min 0.716 max 0.762 replicates ab-1=0.762 ab-2=0.751 ab-3=0.735 ba-1=0.740 ba-2=0.716 ba-3=0.754
explain-deep: median 0.930 min 0.917 max 0.949 replicates ab-1=0.934 ab-2=0.917 ab-3=0.922 ba-1=0.923 ba-2=0.930 ba-3=0.949
parse-medium: median 0.883 min 0.847 max 0.898 replicates ab-1=0.898 ab-2=0.879 ab-3=0.883 ba-1=0.847 ba-2=0.898 ba-3=0.870
```
Against the U1 checkpoint build (isolates U2; one medium-audit replicate reads 0.982):
```
audit-medium: median 0.887 min 0.810 max 0.982 replicates ab-1=0.884 ab-2=0.810 ab-3=0.883 ba-1=0.982 ba-2=0.887 ba-3=0.959
audit-deep: median 0.899 min 0.816 max 0.944 replicates ab-1=0.899 ab-2=0.816 ab-3=0.864 ba-1=0.944 ba-2=0.864 ba-3=0.930
explain-medium: median 0.776 min 0.768 max 0.801 replicates ab-1=0.782 ab-2=0.775 ab-3=0.768 ba-1=0.775 ba-2=0.776 ba-3=0.801
explain-deep: median 0.969 min 0.953 max 0.989 replicates ab-1=0.989 ab-2=0.953 ab-3=0.967 ba-1=0.980 ba-2=0.954 ba-3=0.969
parse-medium: median 0.943 min 0.908 max 0.949 replicates ab-1=0.919 ab-2=0.908 ab-3=0.945 ba-1=0.943 ba-2=0.949 ba-3=0.910
```

**Build.** `npm run build` exit 0 on the U2 tree.

**Diff.** `git -C /home/user/contract diff` (complete, over checkpoint e81ba64):
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
index 4b0e335..546587f 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -767,22 +767,19 @@ export function readValue<T>(callback: () => T, reader: string, options?: ReadVa
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
 		const code: ContractCode =
@@ -804,7 +801,7 @@ export function readValue<T>(callback: () => T, reader: string, options?: ReadVa
 			reader: isString(reader) ? reader : 'readValue',
 			subject: isString(options?.subject) ? options.subject : 'value',
 			code,
-			context,
+			owned,
 		}
 	})
 	if (!diagnostics.success) {
@@ -815,11 +812,24 @@ export function readValue<T>(callback: () => T, reader: string, options?: ReadVa
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
@@ -1791,6 +1801,21 @@ export function sanitizeDepth(value: number | undefined): number {
  * class instance, a `Map` — is NEVER traversed or stringified; it renders as
  * its bare `typeof` tag (`'object'` / `'function'`).
  *
+ * A string of at most {@link PREVIEW_LIMIT} code units takes its answer from one
+ * whole-string encode when that encode fits the same limit, and the length
+ * predicate deciding it is exact rather than approximate. The indexed encoder
+ * appends every token and closes with the quote exactly when the escaped inner
+ * length is at most `PREVIEW_LIMIT - 2`, which is character for character what
+ * one `stringify` returns. At an inner length of `PREVIEW_LIMIT - 1` the indexed
+ * encoder appends every token and closes with `…` instead, while one
+ * `stringify` of that same string measures `PREVIEW_LIMIT + 1` — so the
+ * predicate refuses that string and every longer one, and each of them renders
+ * through the indexed encoder. Escaping never shrinks text, so the leading
+ * `source.length` gate admits every string the predicate could accept while
+ * keeping enormous primitive text out of the whole-string encode. A symbol
+ * renders through the indexed encoder because its unquoted text is not what
+ * `stringify` returns.
+ *
  * @param value - The value to preview
  * @returns A short descriptive string, always safe to embed in a diagnostic
  *
@@ -1809,6 +1834,10 @@ export function preview(value: unknown): string {
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
index 1ff5ddc..7276e91 100644
--- a/tests/src/core/helpers.test.ts
+++ b/tests/src/core/helpers.test.ts
@@ -619,6 +619,73 @@ describe('readValue', () => {
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
 })
 
 describe('readArrayEntries', () => {
@@ -2392,6 +2459,60 @@ describe('preview', () => {
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
+		expect(rendering * 20).toBeLessThan(encoding)
+	})
 })
 
 describe('shapeToKind', () => {
```
