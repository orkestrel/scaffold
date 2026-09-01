# Checker brief — U3k Orchestrator edits

## Role and engine

`checker` on Sonnet, native Claude subagent, read-only (Read, Grep, Glob). Perform the assignment directly and spawn nothing. Return the Checklist shape from your role file.

## Subject

The Orchestrator edit unit U3k (`/home/user/scaffold/tmp/units/u3k-orchestrator-edits-brief.md`, report `-report.md`) on the U3 tree of `/home/user/contract` over checkpoint 163490f. The pre-U3k diff is `/home/user/scaffold/tmp/units/u3j-diff.patch`; the diff after U3k and the status are appended in § Evidence.

## Acceptance criteria to check (one piece of evidence each)

1. The two edits landed verbatim as the brief states them: quote `tests/src/core/helpers.test.ts:3288` and `src/core/helpers.ts:1954-1955` from the tree.
2. They are the only differences between `u3j-diff.patch` and the appended diff: list every differing line.
3. Vocabulary: `grep -n "twice per call\|on every call" src/core/helpers.ts guides/contract.md tests/src/core/helpers.test.ts` — every hit either carries the declared-pattern condition ("when the shape declares one") or describes something other than the pattern accessor's read count (name each hit and rule it). Sweep the two edited lines with `\b(above|below)\b` and `\b(should|simply|easy|easier|just|currently|now|via|e\.g\.|i\.e\.|etc\.)\b`, case-insensitive.
4. The TSDoc line at `src/core/helpers.ts:1955` stays within the width its neighbours use (compare its length with the surrounding `@param` continuation lines).

## Evidence

Governing files: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`.

**Status.** `git -C /home/user/contract status --porcelain`:
```
 M guides/contract.md
 M src/core/ContractCompiler.ts
 M src/core/combinators.ts
 M src/core/helpers.ts
 M tests/setup.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
```

**Diff.** `git -C /home/user/contract diff` (the whole U3 tree over 163490f, U3k included):
```diff
diff --git a/guides/contract.md b/guides/contract.md
index a6d49f2..f6e1cbe 100644
--- a/guides/contract.md
+++ b/guides/contract.md
@@ -241,6 +241,7 @@ The safe JSON surface keeps text parsing lazy: `parseJSON` returns `unknown`, wh
 | `readPatternSource`     | function | Read a pattern's source text through the accessor captured from `RegExp.prototype`, answering `undefined` when the result is not a string and THROWING for a receiver that carries no pattern internal slots — which is exactly what makes it the total brand test `isRegExp` is spelled with. A replaced `source` getter reports for every pattern in the realm, and made `compileSchema` publish `pattern: ".*"` inside a frozen schema.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
 | `readPatternFlags`      | function | The flags half of `readPatternSource`, on the same captured-accessor terms.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
 | `readPattern`           | function | Rebuild a caller's regular expression as a stateless pattern this package owns, stripping the stateful `g` / `y` flags with an INDEXED character filter rather than `String.prototype.replaceAll` — itself a caller-writable member whose substitute answering `'i'` made `matchOf(/^abc$/)` accept `'ABC'`, a case-insensitive pattern the developer never wrote.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+| `ownPattern`            | function | The one pattern construction the compiled string leaves and `stringOf` share: `readPattern` taken through `readValue` under the reader that asked, so an unreadable source or flags refuses as `<reader>: pattern could not be read` with code `pattern` and `{ shape: 'string' }` context instead of the host's raw `TypeError`. Stripping `g` and `y` is what makes one rebuild answer every value alike, so a compiled door takes the read while the plan is built and holds the rebuild for the plan's life.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
 | `pinMembers`            | function | Pin every own member of a class prototype as a non-writable, non-configurable data property, and VERIFY the pin took. Membership answers live in no class method, but a class this package exports still has methods its own modules dispatch through — `cloneShape` reaches `ShapeCloner.prototype.clone`, and one assignment there made `compileSchema`, `audit` and `explain` publish whatever the caller chose while none of those doors was touched. Every exported class calls it from a `static` block, so the pin is installed while the class is DEFINED; because the pin is itself a live dispatch, an unverified install refuses instead of passing silently.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
 | `refuseExpansion`       | function | Refuse a validated declaration whose measured `expansion` exceeds `COMPILE_NODE_LIMIT`. TWO boundaries apply the compilers' emitted-node bound over a `ShapeValidatorInterface.expansion` count — the eager `validateShapeDepth` and `ContractCompiler` preparation — and both raise this one refusal, which keeps `validateShapeDepth`'s name because that gate OWNS the rule and its exact diagnostic is public API. The same reason `ShapeCloner` publishes the gate's depth wording rather than inventing a second vocabulary: two constructions of one refusal are two messages waiting to drift apart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
 
@@ -252,7 +253,7 @@ Membership is the answer a validation package exists to be right about, and it i
 
 So `matchesMember` / `admitMember` / `collectMembers` own literal, enum and key membership; `matchesVisited` / `admitVisited` / `omitVisited` own cycle and visitation membership; `matchesPattern` / `readPattern` / `readPatternSource` / `readPatternFlags` own pattern membership; and `readSetEntries` / `readMapEntries` read a caller's own `Set` / `Map` through the captured `forEach` rather than through a replaceable iterator. Collection construction is by INDEX rather than from an iterable, because `new Set(values)` reads `Symbol.iterator` off the argument and `add` off the instance — two replaceable dispatches added to remove one.
 
-The scope claim, stated so it can be checked rather than trusted: **no membership answer this package publishes — literal, enum, pattern, set, map, intersection, record key, declared key, or schema keyword — is decided by a property lookup on any object a caller can reach.** The standing proof is `tests/src/core/integration.test.ts`, which sweeps every membership door against every lying host member, against both accessors of `RegExp.prototype`, and against every writable prototype member of every value this package exports as a constructor. That last population is **216 rows**, not none: an earlier sentence here said it was "empty, because each of those classes pins its prototype while it is defined", which ran a true claim about the CLASSES together with a false one about the population. The rule draws from every exported callable, and an ordinary exported FUNCTION's `.prototype.constructor` is writable and always will be — so the corpus is one row per exported plain function and zero rows per exported class. The sweep asserts what it always asserted, that no door consults any of them. The number was **205** here for one round after eight more functions were exported, because the sentence claiming it could not drift was describing a pin the suite did not have: the suite asserted the SHAPE of the corpus (non-empty, every row a `.prototype.constructor`, no class contributing one) and never its size. Both are pinned now, so the next export that moves this number fails a test instead of quietly falsifying this paragraph.
+The scope claim, stated so it can be checked rather than trusted: **no membership answer this package publishes — literal, enum, pattern, set, map, intersection, record key, declared key, or schema keyword — is decided by a property lookup on any object a caller can reach.** The standing proof is `tests/src/core/integration.test.ts`, which sweeps every membership door against every lying host member, against both accessors of `RegExp.prototype`, and against every writable prototype member of every value this package exports as a constructor. That last population is not empty: an earlier sentence here said it was "empty, because each of those classes pins its prototype while it is defined", which ran a true claim about the CLASSES together with a false one about the population. The rule draws from every exported callable, and an ordinary exported FUNCTION's `.prototype.constructor` is writable and always will be — so the corpus is one row per exported plain function and zero rows per exported class. The sweep asserts what it always asserted, that no door consults any of them. The suite pins the corpus's composition against the barrel rather than against a remembered number: every exported plain function contributes exactly one row, every row is a `.prototype.constructor`, and no exported class contributes any. A count stated here drifted for a round after further functions were exported, which is why no number stands here.
 
 What that claim does NOT cover is named rather than left to be discovered: the load-order precondition below, and a caller who replaces a door's own method and then calls that door, which is their arrangement rather than this package's defect.
 
@@ -590,23 +591,23 @@ schemaToParameters(valueToSchema(row)) // the open record a tool advertises as `
 
 Two diagnostics, one for each artifact that answers yes-or-no. `compileReporter` is the counterpart of `compileParser`: instead of a coerced value it returns every structured `Fault` a value has against a shape — MIRROR-PARSE semantics, so it reuses the exact leaf parsers/guards `compileParser` uses and the soundness invariant `explain(v).length === 0 ⟺ parse(v) !== undefined` holds structurally for READABLE input (`explain` mirrors `parse`'s coercion leniency, not the stricter `is`). `compileAuditor` is the counterpart of `compileGuard`: instead of a `boolean` it returns every `AuditFault` a value has against the STRICT domain, reusing the leaf guards `compileGuard` uses, so `audit(v).length === 0 ⟺ is(v)`. Each report mirrors exactly one artifact, and neither mirrors both, because `is` and `parse` accept different values — which is the subject of the next section. Before either pair compiles, `validateShapeDepth` rejects structural and bound-domain malformations; the laws are evaluated only for a valid declaration. Both biconditionals span two separate calls, so both require STABLE reads; the parse biconditional additionally requires the read to succeed rather than raise its coded refusal (see Domains).
 
-| API                   | Kind      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
-| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `compileAuditor`      | function  | shape + value (+ optional path) → `readonly AuditFault[]`, self-recursive — the diagnostic for the domain `is` and `schema` describe. It mirrors the strict guard rather than `parse`'s coercion: `audit(v).length === 0` if and only if `is(v)` for a readable, stably-read value (see Domains), so a coercible leaf faults here and not in `explain`. Closed-object extras report `'extra'` without reading their value; a constraining tail recurses. Union acceptance comes from strict per-variant audit emptiness, and an `anyOf` union settles on the FIRST variant whose audit is empty, in declaration order: no later variant plan runs, so a refusal a later variant would have raised for that value, such as an object variant's prototype probe, is never reached. That is the stop `is` and `parse` already make at the first accepting variant, so `is`, `parse` and `audit` agree on a value one variant accepts and a later one cannot read. A `oneOf` union audits every variant, because its verdict is the match count rather than the first acceptance, and that same value still reaches the same coded refusal there. Every report is capped at `FAULT_LIMIT`. Arrays use the shared owned sparse snapshot and stop once `FAULT_LIMIT` faults exist, so even a native-maximum sparse length performs no absent source-index reads. Failed container reflection/value reads throw the shared coded refusal with the current `{ path, shape }`; unreadability is never reported as a type mismatch. |
-| `compileReporter`     | function  | shape + value (+ optional path) → `readonly Fault[]`, self-recursive. A leaf that fails to coerce reports one `'type'` fault; a coercible leaf that violates a refinement reports one `'constraint'` fault per violated refinement. An absent required object key reports `'missing'`; a present key recurses. Closed-object extras never fault (parse drops them); a constraining `additionalProperties` shape recurses extras against it. An `anyOf` union returns the empty report at the FIRST variant that reports nothing, in declaration order, and runs no later variant plan — the auditor's stop, mirrored. An `anyOf` union with no matching variant reports one `'variant'` summary plus the closest variant's own faults (fewest faults; ties favor the lowest index); a `oneOf` union runs every variant plan and reports `'oneOf'` with the raw guard-match count (0 also appends the closest variant's faults, ≥2 stands alone). Arrays report from the shared owned sparse snapshot: owned holes retain per-index faults while hostile absent source indices are never read, and failed snapshots retain the existing root array type fault. Faults are collected in stable pre-order and capped at `FAULT_LIMIT`; other hostile getter or `Proxy` failures remain one top-level type fault.                                                                                                                                                                                                             |
-| `createStringFaults`  | function  | string shape + string + path → `readonly Fault[]` — the SINGLE source of the string refinement report, consumed by `compileReporter` and `compileAuditor` alike wherever the declaration carries a refinement; a leaf that declares none has no refinement question, so its compiled plan answers empty past the type test without entering the helper. The two doors differ only in how they obtain the string (the reporter coerces through `parseString`, the auditor demands a primitive) and used to agree on every constraint afterwards by carrying two copies of the same twenty-one lines, which is one edit away from two contracts. Faults come out in declaration order — `min`, then `max`, then `pattern` — because report order is public. The pattern is applied through an OWNED stateless rebuild (`readPattern`) asked through `matchesPattern`, so a caller's `lastIndex` never moves and no caller-writable member decides whether the value matched. Its whole body reads the caller's SHAPE, so it runs through the same `readValue` boundary `shapeToKind` uses and refuses an unreadable declaration as `createStringFaults: shape could not be read`. The compiled doors gate a non-`RegExp` `pattern` and a non-finite bound long before the helper sees them, so the package's own path never arrives here off-domain — but the door is published, and a shape a `StringShape` annotation merely vouched for reaches it unchecked.                                                            |
-| `createNumberFaults`  | function  | number shape + number + path → `readonly Fault[]` — the numeric sibling of `createStringFaults`, shared by the same two doors. `expected` is the DECLARATION's kind (`'integer'` when `integer: true`, else `'number'`), never the value's, and order is `integer`, then `min`, then `max`. An unreadable shape is refused as `createNumberFaults: shape could not be read`, through the same boundary and for the same reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
-| `createArrayFaults`   | function  | array shape + length + path → `readonly Fault[]` — the length half of the array report, taking the LENGTH rather than the array because both doors have already read their entries through `readArrayEntries` and must report the count that read observed rather than re-asking the caller's value. Order is `min`, then `max`. An unreadable shape is refused as `createArrayFaults: shape could not be read`, through the same boundary and for the same reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
-| `selectClosestFaults` | function  | reports → the closest one — the union summary both doors append their closest variant's faults to. "Closest" is the SHORTEST report and an earlier variant wins a tie, so a union's diagnostic follows declaration order rather than whichever variant a later comparison happened to visit. The winner is returned BY IDENTITY, never copied, so the summary carries the exact fault objects the variant produced; no report at all yields a frozen empty collection rather than `undefined`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
-| `shapeToKind`         | function  | shape → `FaultKind` — projects a `ContractShape` to the kind it describes (`numberShape` → `'integer'` when `integer: true`, else `'number'`; `optionalShape` / `nullableShape` project through their inner shape; `rawShape` → `'json'`). A hand-authored node carrying an unrecognized discriminant is REFUSED as `shapeToKind: shape could not be read`, not answered out of type: the switch had no `default` and returned `undefined`, which made a non-optional declared return type a lie at a public export. The discriminant is only half of it — this is a REQUIRED reader over the whole node, so a `type` that cannot be read at all raises the identical refusal, and an `optional` / `nullable` whose inner projection refuses surfaces under the OUTER name with the inner failure as `cause`. The reader that owns the projection is the one that names it, at whatever depth the projection actually failed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
-| `preview`             | function  | value → `string` — a short, TOTAL preview for a `Fault`'s `received` field. String and narrowed-symbol text is printable JSON-escaped content: strings retain outer quotes, symbols use intrinsic `String(value)` without retrieving mutable `Symbol.prototype.toString` and omit only the escaping quotes. A string takes its answer from one whole-string encode when the string is within `PREVIEW_LIMIT` code units and that encode fits the same limit; every other string and every symbol renders through one bounded indexed encoder that appends complete escaped code-point tokens within `PREVIEW_LIMIT`. Neither path retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping. Arrays render as `array`; every other host renders as its bare `typeof` tag. It never traverses or stringifies a container and does not promise grapheme-cluster preservation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
-| `FAULT_LIMIT`         | const     | `64` — the maximum entries a single `explain` OR `audit` report ever returns, frozen. It bounds both reporting surfaces: `compileReporter` and `compileAuditor` each slice every recursive call to it, so the cap holds at every nesting level, and a diagnostic surface sized off this constant is right about `audit` too.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
-| `PREVIEW_LIMIT`       | const     | `64` — the maximum code-unit budget for complete encoded tokens in a `preview`; a clipped result adds one trailing `…`, frozen.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
-| `Fault`               | type      | discriminated union on `reason`: `'type'` (`{ path, expected, received }`), `'missing'` (`{ path, expected }`), `'constraint'` (`{ path, expected, constraint, limit?, received }`), `'variant'` (`{ path, variants }`), `'oneOf'` (`{ path, matched }`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
-| `ExtraFault`          | interface | `{ readonly reason: 'extra'; readonly path: FieldPath }` — a key present on a value that its closed object shape does not declare; the final path segment is the offending key, and no value is read or carried.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
-| `AuditFault`          | type      | `Fault \| ExtraFault` — every fault a strict audit reports: the existing structured faults plus undeclared-key faults.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
-| `FaultKind`           | type      | `'string' \| 'number' \| 'integer' \| 'boolean' \| 'null' \| 'literal' \| 'array' \| 'object' \| 'union' \| 'json'` — the kind a fault expected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
-| `FaultConstraint`     | type      | `'min' \| 'max' \| 'pattern' \| 'integer'` — the refinement a `'constraint'` fault violates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+| API                   | Kind      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
+| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `compileAuditor`      | function  | shape + value (+ optional path) → `readonly AuditFault[]`, self-recursive — the diagnostic for the domain `is` and `schema` describe. It mirrors the strict guard rather than `parse`'s coercion: `audit(v).length === 0` if and only if `is(v)` for a readable, stably-read value (see Domains), so a coercible leaf faults here and not in `explain`. Closed-object extras report `'extra'` without reading their value; a constraining tail recurses. Union acceptance comes from strict per-variant audit emptiness, and an `anyOf` union settles on the FIRST variant whose audit is empty, in declaration order: no later variant plan runs, so a refusal a later variant would have raised for that value, such as an object variant's prototype probe, is never reached. That is the stop `is` and `parse` already make at the first accepting variant, so `is`, `parse` and `audit` agree on a value one variant accepts and a later one cannot read. A `oneOf` union audits every variant, because its verdict is the match count rather than the first acceptance, and that same value still reaches the same coded refusal there. Every report is capped at `FAULT_LIMIT`. Arrays use the shared owned sparse snapshot and stop once `FAULT_LIMIT` faults exist, so even a native-maximum sparse length performs no absent source-index reads. Failed container reflection/value reads throw the shared coded refusal with the current `{ path, shape }`; unreadability is never reported as a type mismatch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+| `compileReporter`     | function  | shape + value (+ optional path) → `readonly Fault[]`, self-recursive. A leaf that fails to coerce reports one `'type'` fault; a coercible leaf that violates a refinement reports one `'constraint'` fault per violated refinement. An absent required object key reports `'missing'`; a present key recurses. Closed-object extras never fault (parse drops them); a constraining `additionalProperties` shape recurses extras against it. An `anyOf` union returns the empty report at the FIRST variant that reports nothing, in declaration order, and runs no later variant plan — the auditor's stop, mirrored. An `anyOf` union with no matching variant reports one `'variant'` summary plus the closest variant's own faults (fewest faults; ties favor the lowest index); a `oneOf` union runs every variant plan and reports `'oneOf'` with the raw guard-match count (0 also appends the closest variant's faults, ≥2 stands alone). Arrays report from the shared owned sparse snapshot: owned holes retain per-index faults while hostile absent source indices are never read, and failed snapshots retain the existing root array type fault. Faults are collected in stable pre-order and capped at `FAULT_LIMIT`; other hostile getter or `Proxy` failures remain one top-level type fault.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+| `createStringFaults`  | function  | string shape + string + path (+ optional pre-captured pattern) → `readonly Fault[]` — the SINGLE source of the string refinement report, consumed by `compileReporter` and `compileAuditor` alike wherever the declaration carries a refinement; a leaf that declares none has no refinement question, so its compiled plan answers empty past the type test without entering the helper. The two doors differ only in how they obtain the string (the reporter coerces through `parseString`, the auditor demands a primitive) and used to agree on every constraint afterwards by carrying two copies of the same twenty-one lines, which is one edit away from two contracts. Faults come out in declaration order — `min`, then `max`, then `pattern` — because report order is public. The declaration's pattern is applied through an OWNED stateless rebuild (`readPattern`, taken through `ownPattern`) asked through `matchesPattern`, so the shape's own pattern never moves a caller's `lastIndex` and no caller-writable member decides whether the value matched. Stripping `g` and `y` is what makes that rebuild reusable — it carries no `lastIndex` an answer could move — so `compileAuditor` and `compileReporter` read the declaration's `pattern` accessor once while the plan is built and hand the rebuild down as the trailing argument, instead of minting a `RegExp` per answered value. Supply the rebuild of this same shape's own pattern, built through `readPattern`, and the report matches the omitted form, `limit` text included, because `readPattern` preserves `source` exactly; the helper applies whatever pattern it is handed and never re-reads `shape.pattern`, so a supplied pattern decides the match, the `limit` text, and whether a pattern fault is reported at all, and a `g` or `y` pattern makes repeated answers for one value disagree. The `limit` text is read from the applied rebuild, so it names the pattern that decided the match. Left to rebuild, the helper asks the shape's `pattern` accessor once for the presence test that decides whether a pattern was declared at all, and once more for the rebuild that decides the match and names the `limit` when one was. Its whole body reads the caller's SHAPE, so it runs through the same `readValue` boundary `shapeToKind` uses and refuses an unreadable declaration as `createStringFaults: shape could not be read`. The compiled doors gate a non-`RegExp` `pattern` and a non-finite bound long before the helper sees them, so the package's own path never arrives here off-domain — but the door is published, and a shape a `StringShape` annotation merely vouched for reaches it unchecked. |
+| `createNumberFaults`  | function  | number shape + number + path → `readonly Fault[]` — the numeric sibling of `createStringFaults`, shared by the same two doors. `expected` is the DECLARATION's kind (`'integer'` when `integer: true`, else `'number'`), never the value's, and order is `integer`, then `min`, then `max`. An unreadable shape is refused as `createNumberFaults: shape could not be read`, through the same boundary and for the same reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+| `createArrayFaults`   | function  | array shape + length + path → `readonly Fault[]` — the length half of the array report, taking the LENGTH rather than the array because both doors have already read their entries through `readArrayEntries` and must report the count that read observed rather than re-asking the caller's value. Order is `min`, then `max`. An unreadable shape is refused as `createArrayFaults: shape could not be read`, through the same boundary and for the same reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
+| `selectClosestFaults` | function  | reports → the closest one — the union summary both doors append their closest variant's faults to. "Closest" is the SHORTEST report and an earlier variant wins a tie, so a union's diagnostic follows declaration order rather than whichever variant a later comparison happened to visit. The winner is returned BY IDENTITY, never copied, so the summary carries the exact fault objects the variant produced; no report at all yields a frozen empty collection rather than `undefined`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+| `shapeToKind`         | function  | shape → `FaultKind` — projects a `ContractShape` to the kind it describes (`numberShape` → `'integer'` when `integer: true`, else `'number'`; `optionalShape` / `nullableShape` project through their inner shape; `rawShape` → `'json'`). A hand-authored node carrying an unrecognized discriminant is REFUSED as `shapeToKind: shape could not be read`, not answered out of type: the switch had no `default` and returned `undefined`, which made a non-optional declared return type a lie at a public export. The discriminant is only half of it — this is a REQUIRED reader over the whole node, so a `type` that cannot be read at all raises the identical refusal, and an `optional` / `nullable` whose inner projection refuses surfaces under the OUTER name with the inner failure as `cause`. The reader that owns the projection is the one that names it, at whatever depth the projection actually failed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+| `preview`             | function  | value → `string` — a short, TOTAL preview for a `Fault`'s `received` field. String and narrowed-symbol text is printable JSON-escaped content: strings retain outer quotes, symbols use intrinsic `String(value)` without retrieving mutable `Symbol.prototype.toString` and omit only the escaping quotes. A string takes its answer from one whole-string encode when the string is within `PREVIEW_LIMIT` code units and that encode fits the same limit; every other string and every symbol renders through one bounded indexed encoder that appends complete escaped code-point tokens within `PREVIEW_LIMIT`. Neither path retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping. Arrays render as `array`; every other host renders as its bare `typeof` tag. It never traverses or stringifies a container and does not promise grapheme-cluster preservation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
+| `FAULT_LIMIT`         | const     | `64` — the maximum entries a single `explain` OR `audit` report ever returns, frozen. It bounds both reporting surfaces: `compileReporter` and `compileAuditor` each slice every recursive call to it, so the cap holds at every nesting level, and a diagnostic surface sized off this constant is right about `audit` too.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+| `PREVIEW_LIMIT`       | const     | `64` — the maximum code-unit budget for complete encoded tokens in a `preview`; a clipped result adds one trailing `…`, frozen.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
+| `Fault`               | type      | discriminated union on `reason`: `'type'` (`{ path, expected, received }`), `'missing'` (`{ path, expected }`), `'constraint'` (`{ path, expected, constraint, limit?, received }`), `'variant'` (`{ path, variants }`), `'oneOf'` (`{ path, matched }`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+| `ExtraFault`          | interface | `{ readonly reason: 'extra'; readonly path: FieldPath }` — a key present on a value that its closed object shape does not declare; the final path segment is the offending key, and no value is read or carried.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+| `AuditFault`          | type      | `Fault \| ExtraFault` — every fault a strict audit reports: the existing structured faults plus undeclared-key faults.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
+| `FaultKind`           | type      | `'string' \| 'number' \| 'integer' \| 'boolean' \| 'null' \| 'literal' \| 'array' \| 'object' \| 'union' \| 'json'` — the kind a fault expected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
+| `FaultConstraint`     | type      | `'min' \| 'max' \| 'pattern' \| 'integer'` — the refinement a `'constraint'` fault violates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
 
 ### Domains
 
diff --git a/src/core/ContractCompiler.ts b/src/core/ContractCompiler.ts
index 33575b7..8efa939 100644
--- a/src/core/ContractCompiler.ts
+++ b/src/core/ContractCompiler.ts
@@ -39,6 +39,7 @@ import {
 	enumerableKeys,
 	limitEntries,
 	matchesMember,
+	ownPattern,
 	pathOf,
 	pinMembers,
 	preview,
@@ -1425,13 +1426,23 @@ export class ContractCompiler<
 			// is its own array, because a report's identity is the caller's.
 			case 'string': {
 				const node: StringShape = owned
-				const refined =
-					owned.min !== undefined || owned.max !== undefined || owned.pattern !== undefined
+				// The clone's `pattern` is an ACCESSOR that mints a fresh frozen
+				// `RegExp` per read, so the plan reads it once and carries its
+				// stateless rebuild into every answer instead of rebuilding one per
+				// value. The rebuild is safe to share exactly because `readPattern`
+				// strips `g` and `y`: it holds no `lastIndex` an answer could move.
+				// `ownPattern` takes that read, and this door publishes only a
+				// `ContractError`, so an unreadable source or flags refuses with the
+				// same `pattern` code and `{ shape: 'string' }` context the schema leaf
+				// publishes.
+				const declared = owned.pattern
+				const refined = owned.min !== undefined || owned.max !== undefined || declared !== undefined
+				const pattern = declared === undefined ? undefined : ownPattern(declared, 'compileAuditor')
 				return (value, path) => {
 					if (!isString(value)) {
 						return [{ reason: 'type', path, expected: 'string', received: preview(value) }]
 					}
-					return refined ? createStringFaults(node, value, path) : []
+					return refined ? createStringFaults(node, value, path, pattern) : []
 				}
 			}
 			case 'number': {
@@ -1739,14 +1750,17 @@ export class ContractCompiler<
 			// what an unrefined declaration has to say about it.
 			case 'string': {
 				const node: StringShape = owned
-				const refined =
-					owned.min !== undefined || owned.max !== undefined || owned.pattern !== undefined
+				// The same one-time pattern read the auditor's leaf takes, for the same
+				// accessor and the same reason; see `#auditOf`.
+				const declared = owned.pattern
+				const refined = owned.min !== undefined || owned.max !== undefined || declared !== undefined
+				const pattern = declared === undefined ? undefined : ownPattern(declared, 'compileReporter')
 				return (value, path) => {
 					const parsed = parseString(value)
 					if (parsed === undefined) {
 						return [{ reason: 'type', path, expected: 'string', received: preview(value) }]
 					}
-					return refined ? createStringFaults(node, parsed, path) : []
+					return refined ? createStringFaults(node, parsed, path, pattern) : []
 				}
 			}
 			case 'number': {
diff --git a/src/core/combinators.ts b/src/core/combinators.ts
index 0369108..795665f 100644
--- a/src/core/combinators.ts
+++ b/src/core/combinators.ts
@@ -32,6 +32,7 @@ import {
 	holds,
 	matchesMember,
 	matchesPattern,
+	ownPattern,
 	readArrayEntries,
 	readGuardShape,
 	readMapEntries,
@@ -1033,14 +1034,7 @@ export function stringOf(options?: {
 		if (source !== undefined && !isRegExp(source)) {
 			throw new ContractError('stringOf: pattern must be a RegExp', { code: 'pattern' })
 		}
-		const pattern =
-			source === undefined
-				? undefined
-				: readValue(() => readPattern(source), 'stringOf', {
-						subject: 'pattern',
-						code: 'pattern',
-						context: { shape: 'string' },
-					})
+		const pattern = source === undefined ? undefined : ownPattern(source, 'stringOf')
 		if (min === undefined && max === undefined && pattern === undefined) {
 			return isString
 		}
diff --git a/src/core/helpers.ts b/src/core/helpers.ts
index 80f40fe..2e1262b 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -626,6 +626,39 @@ export function readPattern(pattern: RegExp): RegExp {
 	return new INTRINSICS.pattern(source, stateless)
 }
 
+/**
+ * Rebuilds a declaration's regular expression as a stateless pattern this
+ * package owns, and refuses an unreadable one under the reader's own name.
+ *
+ * @remarks
+ * The one construction the compiled string leaves and `stringOf` share.
+ * {@link readPattern} strips `g` and `y`, so the result carries no `lastIndex`
+ * an answer could move and one rebuild answers every value alike — which is
+ * what lets a compiled door take the read while the plan is built and hold the
+ * rebuild for the plan's life, instead of minting a `RegExp` per answered
+ * value. The read runs through {@link readValue}, so a source or flags that
+ * cannot be read refuses with this module's uniform `pattern` diagnostic under
+ * the reader that asked, rather than with the host's raw `TypeError`.
+ *
+ * @param pattern - The declaration's regular expression to rebuild
+ * @param reader - The public reader name the diagnostic carries
+ * @returns An owned, stateless equivalent of the declaration's pattern
+ * @throws {ContractError} Thrown when the pattern's source or flags cannot be
+ *         read, coded `pattern` as `<reader>: pattern could not be read`
+ *
+ * @example
+ * ```ts
+ * ownPattern(/^a+$/gy, 'stringOf') // /^a+$/
+ * ```
+ */
+export function ownPattern(pattern: RegExp, reader: string): RegExp {
+	return readValue(() => readPattern(pattern), reader, {
+		subject: 'pattern',
+		code: 'pattern',
+		context: { shape: 'string' },
+	})
+}
+
 /**
  * Pin every own member of a class prototype as a non-configurable member —
  * non-writable too when it is a data property — and verify the pin took.
@@ -1886,10 +1919,18 @@ export function preview(value: unknown): string {
  * two contracts. Faults come out in declaration order — `min`, then `max`, then
  * `pattern` — because a report is read top to bottom and its order is public.
  *
- * The pattern is applied through an OWNED stateless rebuild
- * ({@link readPattern}) and asked through {@link matchesPattern}, so a caller's
- * `lastIndex` never moves and no caller-writable member decides whether the
- * value matched.
+ * The declaration's pattern is applied through an OWNED stateless rebuild
+ * ({@link readPattern}) asked through {@link matchesPattern}, so the shape's own
+ * pattern never moves a caller's `lastIndex` and no caller-writable member
+ * decides whether the value matched. The rebuild is stateless precisely because
+ * `g` and `y` are stripped, so one rebuilt pattern answers identically for every
+ * value and every call — which is what lets a compiled door build it once
+ * ({@link ownPattern}) and hand it down through `pattern` instead of rebuilding
+ * it on each answer. The `limit` text is read from the applied rebuild, so it
+ * names the pattern that decided the match. Left to rebuild, the helper asks
+ * the shape's `pattern` accessor once for the presence test that decides
+ * whether a pattern was declared at all, and once more for the rebuild that
+ * decides the match and names the `limit` when one was.
  *
  * The whole body reads the caller's SHAPE, so it runs through the same
  * {@link readValue} boundary {@link shapeToKind} uses and refuses an
@@ -1904,6 +1945,14 @@ export function preview(value: unknown): string {
  * @param shape - The string shape whose refinements are checked
  * @param value - The already-obtained string to check
  * @param path - The path every produced fault is rooted at
+ * @param pattern - The one-time stateless rebuild that decides the pattern
+ *                  refinement. Must be a {@link readPattern} result for this
+ *                  shape's own pattern; supplied, it decides the match, the
+ *                  `limit` text, and whether a pattern fault is reported at
+ *                  all, and `shape.pattern` is not read. A pattern carrying `g`
+ *                  or `y` moves the caller's `lastIndex` and makes repeated
+ *                  answers for one value disagree. Default: rebuilt from
+ *                  `shape.pattern` on every call, when the shape declares one
  * @returns A fresh array of faults, empty when the value satisfies every refinement
  * @throws {ContractError} When the shape's refinement fields cannot be read
  *
@@ -1917,6 +1966,7 @@ export function createStringFaults(
 	shape: StringShape,
 	value: string,
 	path: readonly string[],
+	pattern?: RegExp,
 ): readonly Fault[] {
 	return readValue(
 		() => {
@@ -1941,8 +1991,17 @@ export function createStringFaults(
 					received: preview(value),
 				}
 			}
-			if (shape.pattern !== undefined && !matchesPattern(readPattern(shape.pattern), value)) {
-				const limit = readPatternSource(shape.pattern)
+			// The bounds are read from the shape on every call because a number is
+			// what the fault carries. The pattern is not: rebuilding it allocates a
+			// `RegExp` per answer, so a caller holding the same shape for the life of
+			// a compiled door supplies the rebuild once and this reads it instead.
+			// Whatever arrives is what decides the match and names the fault's `limit`,
+			// so a rebuild of this shape's own pattern reports exactly what the
+			// shape's own read would: `readPattern` preserves `source` exactly.
+			const stateless =
+				pattern ?? (shape.pattern === undefined ? undefined : readPattern(shape.pattern))
+			if (stateless !== undefined && !matchesPattern(stateless, value)) {
+				const limit = readPatternSource(stateless)
 				faults[faults.length] = {
 					reason: 'constraint',
 					path,
diff --git a/tests/setup.ts b/tests/setup.ts
index 0b72823..43ae2c3 100644
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -781,12 +781,11 @@ export const TERMINAL_MEMBERS: readonly TerminalIntrinsic[] = Object.freeze(
  * rule draws from every exported callable, and an ordinary function's
  * `.prototype.constructor` is writable and always will be. The sweep's value is
  * unchanged and is what it always was — no door may consult any of these members
- * — but the corpus it sweeps is 213 rows, not none, and
- * `documents its own composition` in the integration suite pins both that shape
- * and that size. The size pin is the later repair: this number read 205 for a
- * round after eight more functions were exported, because the suite asserted
- * only that the corpus was non-empty and constructor-shaped, and a count nobody
- * asserts is a count that drifts.
+ * — but the corpus it sweeps is not empty, and `documents its own composition`
+ * in the integration suite pins its composition against the barrel: one row
+ * per exported plain function, derived from the exports rather than remembered
+ * as a number, because a remembered count drifted for a round after further
+ * functions were exported and no assertion failed.
  *
  * Control drawn from OUTSIDE this rule: {@link TERMINAL_MEMBERS}, whose holders
  * are host prototypes this package never declared, and — for the sweep itself —
diff --git a/tests/src/core/compilers.test.ts b/tests/src/core/compilers.test.ts
index 4e68a8a..bbae3c1 100644
--- a/tests/src/core/compilers.test.ts
+++ b/tests/src/core/compilers.test.ts
@@ -3915,6 +3915,49 @@ describe('compileReporter — string constraint faults', () => {
 	})
 })
 
+describe('compiled string leaves — the pattern fault both doors publish', () => {
+	it('the auditor and the reporter report one pattern fault with the same limit and path', () => {
+		const shape = stringShape({ pattern: /^[a-z]+$/ })
+		const fault = {
+			reason: 'constraint',
+			path: ['properties', 'name'],
+			expected: 'string',
+			constraint: 'pattern',
+			limit: '^[a-z]+$',
+			received: '"A1"',
+		}
+
+		expect(compileAuditor(shape, 'A1', ['properties', 'name'])).toEqual([fault])
+		expect(compileReporter(shape, 'A1', ['properties', 'name'])).toEqual([fault])
+	})
+
+	it('one compiled plan answers every value alike however many answers came before', () => {
+		// The plan reads the declaration's `pattern` accessor once and carries the
+		// stateless rebuild into every answer, so a value's report must not depend on
+		// which values the same plan answered earlier.
+		const contract = createContract(stringShape({ min: 2, pattern: /^[a-z]+$/ }))
+		const clean: readonly Fault[] = []
+		const dirty = [
+			{
+				reason: 'constraint',
+				path: [],
+				expected: 'string',
+				constraint: 'pattern',
+				limit: '^[a-z]+$',
+				received: '"AB"',
+			},
+		]
+
+		expect(contract.audit('abc')).toEqual(clean)
+		expect(contract.audit('AB')).toEqual(dirty)
+		expect(contract.audit('abc')).toEqual(clean)
+		expect(contract.audit('AB')).toEqual(dirty)
+		expect(contract.explain('abc')).toEqual(clean)
+		expect(contract.explain('AB')).toEqual(dirty)
+		expect(contract.explain('abc')).toEqual(clean)
+	})
+})
+
 describe('compileReporter — number/integer faults', () => {
 	it('a coercible numeric string reports no fault', () => {
 		const shape = integerShape({ min: 0, max: 10 })
diff --git a/tests/src/core/helpers.test.ts b/tests/src/core/helpers.test.ts
index e74f942..9579bbc 100644
--- a/tests/src/core/helpers.test.ts
+++ b/tests/src/core/helpers.test.ts
@@ -68,6 +68,7 @@ import {
 	matchesPattern,
 	matchesVisited,
 	omitVisited,
+	ownPattern,
 	pathOf,
 	pinMembers,
 	readMapEntries,
@@ -2975,6 +2976,35 @@ describe('captured pattern reads', () => {
 	})
 })
 
+describe('ownPattern', () => {
+	it("rebuilds a pattern statelessly and refuses through the reader's coded error when the pattern cannot be read", () => {
+		const caller = /^[a-z]+$/gy
+		const owned = ownPattern(caller, 'stringOf')
+
+		expect(owned.source).toBe('^[a-z]+$')
+		expect(matchesPattern(owned, 'abc')).toBe(true)
+		expect(matchesPattern(owned, 'abc')).toBe(true)
+		expect(matchesPattern(owned, 'ABC')).toBe(false)
+		expect(matchesPattern(owned, 'abc')).toBe(true)
+		expect(caller.lastIndex).toBe(0)
+		expect(owned.lastIndex).toBe(0)
+		// Controls: the caller really carried the stateful flags, and the rebuild
+		// really dropped them, so the preceding repeated answers are the strip rather
+		// than a caller that never advanced.
+		expect(caller.flags).toBe('gy')
+		expect(owned.flags).toBe('')
+
+		// A Proxy carries no pattern internal slots, so the captured `source`
+		// getter refuses the receiver and the reader's own name reaches the caller
+		// instead of the host's raw `TypeError`.
+		const refusal = captureContractError(() => ownPattern(new Proxy(/^a$/, {}), 'stringOf'))
+
+		expect(refusal.message).toBe('stringOf: pattern could not be read')
+		expect(refusal.code).toBe('pattern')
+		expect(refusal.context).toEqual({ shape: 'string' })
+	})
+})
+
 describe('pinned prototypes', () => {
 	it('pins every own prototype member and refuses when the pin cannot be verified', () => {
 		class Widget {
@@ -3181,6 +3211,148 @@ describe('createStringFaults', () => {
 		expect(pattern.global).toBe(true)
 	})
 
+	it('reports the same faults from a supplied rebuild as from the shape itself', () => {
+		// A contradictory declaration is the only one a single length can violate on
+		// every axis at once, so it is what pins the whole order in one report.
+		const shape: StringShape = { type: 'string', min: 4, max: 2, pattern: /^[0-9]+$/ }
+		const supplied = createStringFaults(shape, 'abc', ['items'], readPattern(/^[0-9]+$/))
+
+		expect(supplied).toEqual([
+			{
+				reason: 'constraint',
+				path: ['items'],
+				expected: 'string',
+				constraint: 'min',
+				limit: 4,
+				received: '"abc"',
+			},
+			{
+				reason: 'constraint',
+				path: ['items'],
+				expected: 'string',
+				constraint: 'max',
+				limit: 2,
+				received: '"abc"',
+			},
+			{
+				reason: 'constraint',
+				path: ['items'],
+				expected: 'string',
+				constraint: 'pattern',
+				limit: '^[0-9]+$',
+				received: '"abc"',
+			},
+		])
+		expect(createStringFaults(shape, 'abc', ['items'])).toEqual(supplied)
+	})
+
+	it("applies the supplied pattern rather than the shape's own to decide the match", () => {
+		const shape: StringShape = { type: 'string', pattern: /^a$/ }
+		expect(createStringFaults(shape, 'b', [], readPattern(/^b$/))).toEqual([])
+
+		// Control: the same value against the same shape without the supplied
+		// rebuild does fault, so the preceding empty report is the argument being
+		// applied rather than a value that was never checked at all.
+		expect(faultsToConstraints(createStringFaults(shape, 'b', []))).toEqual(['pattern'])
+	})
+
+	it('answers repeatedly from one rebuild of a global caller pattern without moving lastIndex', () => {
+		// The rebuild is what a caller holding one shape for many values supplies
+		// once, so it has to be reusable: `g` on the caller's own object advances
+		// `lastIndex` per `exec`, and stripping it is what makes a single shared
+		// pattern answer the same way on every call.
+		const caller = /^[a-z]+$/g
+		const shape: StringShape = { type: 'string', pattern: /^[a-z]+$/ }
+		const stateless = readPattern(caller)
+
+		expect(createStringFaults(shape, 'abc', [], stateless)).toEqual([])
+		expect(createStringFaults(shape, 'abc', [], stateless)).toEqual([])
+		expect(createStringFaults(shape, 'ABC', [], stateless)).toEqual([
+			{
+				reason: 'constraint',
+				path: [],
+				expected: 'string',
+				constraint: 'pattern',
+				limit: '^[a-z]+$',
+				received: '"ABC"',
+			},
+		])
+		expect(createStringFaults(shape, 'abc', [], stateless)).toEqual([])
+		expect(caller.lastIndex).toBe(0)
+		expect(stateless.lastIndex).toBe(0)
+		// Controls: the caller really carried `g`, and the rebuild really dropped it.
+		expect(caller.global).toBe(true)
+		expect(stateless.global).toBe(false)
+	})
+
+	it("reads a hand-rolled shape's pattern accessor twice per call when the shape declares one, for the presence test and for the rebuild that names the limit", () => {
+		// A hand-rolled declaration is what can count the reads at all: the
+		// package's own clone answers with a fresh frozen `RegExp` per read, and a
+		// plain literal observes nothing. The accessor answers with the same
+		// pattern every time, so a differing read count is the only thing this can
+		// report.
+		let reads = 0
+		const shape: StringShape = {
+			type: 'string',
+			get pattern() {
+				reads += 1
+				return /^[0-9]+$/
+			},
+		}
+		const first = createStringFaults(shape, 'abc', [])
+
+		expect(first).toEqual([
+			{
+				reason: 'constraint',
+				path: [],
+				expected: 'string',
+				constraint: 'pattern',
+				limit: '^[0-9]+$',
+				received: '"abc"',
+			},
+		])
+		// The rebuild that applied the pattern is also what the `limit` text is
+		// read from, so the accessor answers one read for it and one for the
+		// presence test that decides whether a pattern was declared at all.
+		expect(reads).toBe(2)
+
+		expect(createStringFaults(shape, 'abc', [])).toEqual(first)
+		expect(reads).toBe(4)
+	})
+
+	it('answers from a supplied rebuild without asking the shape for its pattern', () => {
+		// A counting accessor is the only instrument that separates applying the
+		// supplied rebuild from rebuilding out of the shape regardless: the reports
+		// are identical either way, so only the read count binds the promise.
+		let reads = 0
+		const shape: StringShape = {
+			type: 'string',
+			get pattern() {
+				reads += 1
+				return /^[0-9]+$/
+			},
+		}
+		const supplied = createStringFaults(shape, 'abc', [], readPattern(/^[0-9]+$/))
+
+		expect(supplied).toEqual([
+			{
+				reason: 'constraint',
+				path: [],
+				expected: 'string',
+				constraint: 'pattern',
+				limit: '^[0-9]+$',
+				received: '"abc"',
+			},
+		])
+		expect(reads).toBe(0)
+
+		// Control: the omitted form asks the same accessor, so a count that stayed
+		// at zero is the supplied rebuild being applied rather than an accessor
+		// that cannot count.
+		expect(createStringFaults(shape, 'abc', [])).toEqual(supplied)
+		expect(reads).toBe(2)
+	})
+
 	it('returns a fresh array per call and mutates neither the shape nor the path', () => {
 		const path = ['items']
 		const shape: StringShape = { type: 'string', min: 3 }
diff --git a/tests/src/core/integration.test.ts b/tests/src/core/integration.test.ts
index ec465a8..01077f1 100644
--- a/tests/src/core/integration.test.ts
+++ b/tests/src/core/integration.test.ts
@@ -16,6 +16,7 @@ import {
 	cloneJSONValue,
 	compileGenerator,
 	compileSchema,
+	ContractCompiler,
 	ContractError,
 	createContract,
 	enumOf,
@@ -55,6 +56,7 @@ import {
 	valueToSchema,
 	validateShapeDepth,
 } from '@src/core'
+import * as core from '@src/core'
 import type { TerminalIntrinsic, TerminalLie } from '../../setup.js'
 import {
 	buildTree,
@@ -959,18 +961,31 @@ describe('no caller-reachable member decides a membership answer', () => {
 		// `.prototype.constructor` is writable, so the corpus is one row per
 		// exported plain function and zero rows per exported class.
 		expect(OWNED_MEMBERS.length).toBeGreaterThan(0)
-		// The SIZE, not just the shape. `toBeGreaterThan(0)` survived eight new
-		// exports while the guide and this file both went on saying 205, which is
-		// the drift a shape-only assertion cannot see. This literal is the number
-		// `guides/src/contract.md` states; a new export moves it, and moving it
-		// must be a deliberate edit in both places rather than a silent one here.
-		expect(OWNED_MEMBERS.length).toBe(216)
+		// The COMPOSITION, not a remembered size. A literal here went stale for a
+		// round after further functions were exported, and the guide's copy of the
+		// same number drifted with it: a count nobody derives is a count that
+		// drifts. Derive it instead. Every exported plain function — every exported
+		// function that is not one of the package's classes — contributes exactly
+		// one row, so the corpus is as large as that set and no larger.
+		const owners = [
+			ContractCompiler,
+			JSONCloner,
+			SchemaCloner,
+			ShapeCloner,
+			ShapeValidator,
+			ContractError,
+		]
+		const plain = captured.names(core).filter((name) => {
+			const exported: unknown = captured.get(core, name)
+			return typeof exported === 'function' && !owners.some((owner) => owner === exported)
+		})
+		expect(OWNED_MEMBERS.length).toBe(plain.length)
 		expect(
 			OWNED_MEMBERS.filter((member) => !member.label.endsWith('.prototype.constructor')).map(
 				(member) => member.label,
 			),
 		).toEqual([])
-		for (const owner of [JSONCloner, SchemaCloner, ShapeCloner, ShapeValidator, ContractError]) {
+		for (const owner of owners) {
 			expect(OWNED_MEMBERS.some((member) => member.label.startsWith(`${owner.name}.`))).toBe(false)
 		}
 	})
```

## Output

The Checklist: one line per criterion with met or not met and its evidence; a terminal `Verdict: PASS` or `Verdict: FAIL`; referrals, or `Referrals: none`.

## Deviation contract

Report a diff that differs from the appended one as a deviation with the exact evidence; do not investigate further.
