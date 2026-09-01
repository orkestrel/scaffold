# Fix report: contract

## Dispositions

- **s03-01** deferred_breaking: The corrected repair turns nine exported spines (schemaNodeToShape, buildShapeFromNode, buildObjectShape, inferValue, inferArray, inferObject, inferSamples, inferRecordSamples, canonicalizeValue) into `#` private methods and drops their state parameters from the published signatures. That removes exported symbols and makes a non-additive change to published call signatures. No half stands alone: keeping the module functions as doors would leave the state parameters in place, which is the finding's own complaint. helpers.ts:matchesJSONValue was struck from the unit by the lane and was not touched.
- **s03-02** applied (src/core/constants.ts, src/core/helpers.ts, src/core/errors.ts, guides/contract.md): Added `CONTRACT_CODES` as a frozen array in constants.ts beside JSON_SCHEMA_TYPES, routed readValue through collectMembers/matchesMember over it, and replaced isContractError's equality chain with an indexed loop over the same constant (errors.ts cannot import helpers.ts). This closes the missing 'expansion' member, so readValue(cb, r, { code: 'expansion' }) now carries 'expansion' instead of 'structure' — the behaviour ReadValueOptions.code: ContractCode already declares. No source call site passes that code, and no test pinned the old resolution. Added the guide Surface row for CONTRACT_CODES.
- **s03-03** applied (src/core/types.ts, src/core/combinators.ts, guides/contract.md): Declared `StringGuardOptions` in types.ts with readonly `min` / `max` / `pattern` and referenced it from stringOf. Chose the named type over Omit<StringShapeOptions,'description'> so the guard surface names its own contract. Readonly tightening on a parameter type accepts every previously accepted argument. Added the guide Types row.
- **s03-04** applied (src/core/types.ts, src/core/helpers.ts, guides/contract.md): Added `GuardShapeRead`, `BoundsRead`, and `EntryCollectorFunction` to types.ts and referenced them from readGuardShape, deriveLengthBounds / deriveRangeBounds, and collectEntries. Took the lane's corrected names: `EntryCollectorFunction` per the Type-level identifiers table, and the singular `BoundsRead` for the bounds pair, matching the ArrayRead / GuardShapeRead 'Read' precedent already in the file. Structurally identical types, so the published signatures are unchanged. Added the three guide Types rows.
- **s03-05** applied (src/core/types.ts): Moved the orphaned 'Stateful owner of one contract-shape snapshot operation' block from above ShapeProperty to directly above ShapeClonerInterface, so ShapeProperty keeps its own block and ShapeClonerInterface is documented like its JSONCloner and SchemaCloner siblings.
- **s03-06** deferred_breaking: Renaming the `maxDepth` and `maxProperties` keys of ValueToSchemaOptions to `depth` and `breadth` renames published option keys, which the breaking test defers whole. Re-verified in the current tree: types.ts still declares both compound keys.
- **s03-07** applied (src/core/inferers.ts, src/core/helpers.ts): Applied the move only: isValidISOInstant now lives in helpers.ts beside classifyFormat, which s03-08 required so helpers.ts never imports inferers.ts. The rename to matchesISOInstant is a rename of an exported symbol and is deferred as breaking — carry it to the work order with s03-01's and s03-23's renames. The barrel star-exports both files, so the published name is unchanged by the move.
- **s03-08** applied (src/core/inferers.ts, src/core/helpers.ts, guides/contract.md): Moved canonicalizeValue, encodeLeaf, canonicalStringify, and classifyFormat to helpers.ts under new 'Canonicalization' and 'Format classification' section headers, landing s03-07's move of isValidISOInstant in the same unit so helpers.ts imports nothing from inferers.ts. inferers.ts now imports canonicalStringify and classifyFormat from helpers.ts, and dropped the FORMAT_PATTERNS, matchesPattern, matchesRecordBrand, and isObject imports the move left unused. s03-01 is deferred, so canonicalizeValue moved as it stands, ancestors parameter included. Guide prose updated to state where the leaves live; their Surface rows stay in the Inferers section beside the doors that consume them.
- **s03-09** applied (src/core/shapers.ts, src/core/helpers.ts, guides/contract.md): Moved deriveLengthBounds and deriveRangeBounds to helpers.ts under a new 'Schema keyword derivation' header, with BoundsRead as their return type per s03-04. shapers.ts imports them and dropped the isInteger import the move left unused; helpers.ts gained it. Guide prose updated to state where they live.
- **s03-10** deferred_breaking: Renaming validateShapeDepth to validateShape renames an exported symbol. tests/src/core/compilers.test.ts:154 asserts that no `validateShape` export exists, and the guide rows and refuseExpansion remark are written to the current name. Deferred whole.
- **s03-11** applied (src/core/factories.ts, src/core/compilers.ts, src/core/index.ts, guides/contract.md): Took the lane's corrected repair: kept the name createContract and moved it to a new src/core/factories.ts, with a barrel row added to index.ts. It returns a ContractInterface entity rather than a compiled projection, so the factory kind file is where placement puts it, and the compiler-class import there is permitted — the class-free floor binds helpers.ts and validators.ts only. The barrel keeps the published name reachable unchanged. Guide prose in the Compilers section now states where the door lives. Its tests stay in compilers.test.ts: they are interleaved with the four-door agreement matrices, and splitting 99 assertions out of proofs about the doors' agreement with each other is a larger restructuring than this finding names.
- **s03-12** applied (src/core/errors.ts, src/core/helpers.ts, tests/src/core/integration.test.ts): Aligned ContractError's static block with pinMembers: it now reads the declared descriptor, takes the accessor branch, places through the answering INTRINSICS.declare, and corroborates with the same condition. Stated the exception in pinMembers's @remarks — errors.ts sits beneath helpers.ts in the graph, so calling the helper would invert the dependency, the same reason isContractError carries its own try/catch. tests/src/core/integration.test.ts's 'refuses to define its error class when a prototype pin cannot be installed' sabotaged Object.defineProperty; it now sabotages Reflect.defineProperty, which is the placement the aligned block dispatches through. Without that update the control could no longer report the silent-pin failure it exists for.
- **s03-13** deferred_breaking: Retyping ShapeValidatorInterface.expansion from `number` to `number | undefined` is a non-additive change to a published interface member's type, and returning undefined where 0 is documented is an observable behaviour change the guide row (line 488) currently pins the other way. Deferred whole.
- **s03-14** applied (src/core/ShapeValidator.ts): Renamed the `#phase` field to `#state`, so reads are `this.#state.phase` rather than `this.#phase.phase` and the field matches ContractCompiler's `#state` with its `phase` discriminant. A `#` private, so nothing published moves.
- **s03-15** applied (src/core/ShapeValidator.ts): The static-block comment now reads "`ShapeCloner`'s `#validateShape` and `validateShapeDepth`", naming the two symbols that actually reach ShapeValidator.prototype.validate. s03-10 is deferred, so both doors are named rather than collapsing to one.
- **s03-16** applied (src/core/helpers.ts): Took the lane's corrected repair: left the signature and behaviour of schemaToParameters unchanged and rewrote the @remarks sentence that called the undefined branch decorative. It now states what guide line 228 and helpers.test.ts:1817 already fix — a readable value satisfying the all-optional JSONSchema interface without being a plain record fails the isRecord guard and returns undefined.
- **s03-17** applied (src/core/parsers.ts): Folded FieldPath into the line-1 `import type` from './types.js' and deleted the second type import that sat after the value import of './constants.js'.
- **s03-18** applied (src/core/combinators.ts): Moved the recordOf and objectOf TSDoc blocks above their first overload signature and kept each overload group contiguous with its implementation, matching every other overloaded export in the file. Added @param and @returns to both while there, per s03-20.
- **s03-19** applied (src/core/combinators.ts): Deleted the duplicated `The` at the end of the recordOf remarks line and restored the missing ` *` prefix on the blank line inside the enumOf block.
- **s03-20** applied (src/core/validators.ts, src/core/combinators.ts, src/core/cloners.ts): Took the lane's corrected repair: added @param and @returns to every documented export lacking them across validators.ts (63 guards) and combinators.ts (22 builders, recordOf and objectOf included), and added @throws {ContractError} to ownShape, which already carried @param and @returns. Guard returns use the third-person boolean form the brief fixes, 'True if …; false otherwise'; first sentences were left alone because their voice is s03-21's wave. cloners.ts:180 was not treated as missing @param/@returns — the judge's correction, confirmed against the file.
- **s03-21** deferred_wave: The repair is first-sentence voice only, which the fleet migrates in a later dedicated wave. Nothing applied. Every TSDoc sentence written for another finding in this unit uses the third-person form.
- **s03-22** deferred_breaking: INTRINSICS is a published export whose keys a consumer reads, so renaming or regrouping describe/reveal, define/declare, and prototype/parent renames published members. Both lanes' amendments (rename each leaf for the distinguishing behaviour, keep the table flat) still rename published keys, so the finding defers whole.
- **s03-23** deferred_breaking: Renaming createStringFaults, createNumberFaults, and createArrayFaults to build* renames exported symbols. Re-verified: all three still carry the create* form in helpers.ts. Deferred whole.
- **s03-24** applied (src/core/ContractCompiler.ts): Deleted the #emptyStack, #emptyNodes, #emptyIndex, #emptyOrder, #emptySchemas, #emptyGuards, #emptyParsers, #emptyAudits, #emptyReports, and #emptySeeds fields with their constructor assignments, and #release now assigns `[]` and `new ContractCompiler.#weakMap()` directly. Took the first branch only, per the lane: the second is unavailable because the probe falsifies the premise the existing #release comment rests on. Rewrote that comment to state what is true — an array literal reads no caller-reachable binding, and the WeakMap is the constructor captured while the module evaluated. Observation outside this finding's named scope: ShapeCloner, SchemaCloner, and JSONCloner carry the same #empty* pattern and were left untouched.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1669ms on 63 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- npm run build: pass — ✓ 19 modules transformed. dist/src/core/index.cjs 403.56 kB | gzip: 92.91 kB. Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 15 files / 1291 tests passed; policy 111 passed; config 46 passed; setup 60 passed; guides 59 passed. No failures.

## Diffstat

```text
 guides/contract.md                 |  91 ++++----
 src/core/ContractCompiler.ts       |  50 ++---
 src/core/ShapeValidator.ts         |  21 +-
 src/core/cloners.ts                |   1 +
 src/core/combinators.ts            | 127 ++++++++---
 src/core/compilers.ts              |  40 ----
 src/core/constants.ts              |  36 ++-
 src/core/errors.ts                 |  40 ++--
 src/core/helpers.ts                | 437 +++++++++++++++++++++++++++++++++++--
 src/core/index.ts                  |   1 +
 src/core/inferers.ts               | 325 +--------------------------
 src/core/parsers.ts                |   3 +-
 src/core/shapers.ts                |  76 +------
 src/core/types.ts                  |  80 ++++++-
 src/core/validators.ts             | 189 ++++++++++++++++
 tests/src/core/integration.test.ts |  19 +-
 16 files changed, 924 insertions(+), 612 deletions(-)

Untracked, so absent from the preceding stat: src/core/factories.ts (45 lines, new).
```

- dist moves: true

## Deviations

Four things the Orchestrator should rule on rather than discover.

1. s03-07 was applied in half. The move to helpers.ts landed because s03-08 depends on it — moving classifyFormat without moving isValidISOInstant would make helpers.ts import inferers.ts, which the leaf-pair rule forbids. The rename to matchesISOInstant is a rename of an exported symbol and is deferred as breaking. The work order needs that rename carried alongside s03-01, s03-06, s03-10, s03-13, s03-22, and s03-23.

2. s03-12 required editing one test. tests/src/core/integration.test.ts's 'refuses to define its error class when a prototype pin cannot be installed' sabotaged Object.defineProperty to prove the corroborating descriptor read catches a silently-failed pin. Aligning the errors.ts block to the answering INTRINSICS.declare made that sabotage miss, so the control went green without proving anything; it now sabotages Reflect.defineProperty. That is a test rewritten because the repair required it, not a test loosened to pass.

3. s03-02 changes an observable published answer. readValue's inline code chain had lost 'expansion', so readValue(cb, r, { code: 'expansion' }) resolved to 'structure'. Routing it through CONTRACT_CODES fixes that. I classified it as a behaviour correction the package's own type already documents (ReadValueOptions.code is typed ContractCode), rather than as breaking: no source call site passes that code, and no test pinned the old resolution. If the campaign reads the declared type as insufficient documentation of intent, this one belongs in the work order instead.

4. Test file placement was left as it is. Symbols moved between modules inside src/core, so tests exercising them through the @src/core barrel now sit in a test file mirroring a different module: the canonicalization and format-classification proofs stay in inferers.test.ts, and createContract's 99 assertions stay in compilers.test.ts, where they are interleaved with the four-door agreement matrices. src/core/factories.ts therefore has no mirrored test file. Nothing in the policy or config suite reports any of this, and the dossier findings name no test move. Splitting those proofs is a larger restructuring than this unit's scope.

One observation outside every finding's scope: ShapeCloner, SchemaCloner, and JSONCloner carry the same #empty* preconstructed-peer family that s03-24 removed from ContractCompiler. The finding named ContractCompiler only, so the siblings were left untouched and belong to a successor unit.

## Reconciliation with contract main (2026-09-01)

The user published contract 0.0.14 and 0.0.15 from another session while this unit's changes sat
on the campaign branch. Merging `origin/main` (tip `3193da1`, "Bump to 0.0.15") into the branch
conflicted in two files. `src/core/ContractCompiler.ts`: main's "Share the release peers at
class scope" (`7e762ab`) resolves the same `#empty*` concern s03-24 addressed, with measured
class-owned frozen sentinels and a dropped index; main's version stands whole and **s03-24 is
superseded, not applied**. `src/core/compilers.ts`: main added the eager-bundle paragraph to the
`createContract` TSDoc that s03-11 moved to `src/core/factories.ts`; the paragraph is ported onto
the moved function verbatim and the removal stands. The published declaration surface of 0.0.15
against 0.0.13 is additive (`PRESENCE_MASK_LIMIT` added, nothing removed), so every dependent
re-pins without code change.
