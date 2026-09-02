# Unit breaking-contract — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s03-01** — applied: Interned the traversal spines. schemaNodeToShape/buildShapeFromNode/buildObjectShape became SchemaShaper #convert/#build/#buildObject with #visited and #memo fields; inferValue/inferArray/inferObject became ValueInferer #infer/#walkArray/#walkRecord with #visited, #memo, #breadth, #closed, #format fields; inferSamples/inferRecordSamples became SampleInferer #infer/#inferRecords with a class-owned SampleMemo. schemaToShape, valueToSchema, samplesToSchema keep their signatures and now own the read boundary, so a hostile traversal publishes the door's own name instead of a spine's. The three classes are interned: out of src/core/index.ts and named in the parity INTERNAL list in tests/guides.test.ts. canonicalizeValue could not become a class method and was folded into canonicalStringify instead — see deviations.
- **s03-06** — applied: ValueToSchemaOptions.maxDepth and maxProperties became limits.depth and limits.properties under a new exported ValueToSchemaLimits interface, matching the MultipartLimits precedent the ruling names. breadth is refused per the ruling. Both doors read the limits sub-record through readOptions, so a hostile getter or ownKeys trap on it refuses under the door's name instead of reaching the walk.
- **s03-10** — applied: validateShapeDepth renamed to validateShape across compilers.ts, and across every diagnostic message the shared declaration gate publishes (ShapeValidator.ts, ShapeCloner.ts, helpers.ts refuseExpansion, shapers.ts, constants.ts, types.ts), plus every test and guide row. The compilers.test.ts surface row now asserts the whole validate* export population rather than naming a removed spelling.
- **s03-13** — applied: ShapeValidatorInterface.expansion and ShapeValidator.expansion are number | undefined. #execute clears the field to undefined at entry and sets the measured count only after a successful pass, so undefined is the value before the first success and after a failure. refuseExpansion accepts number | undefined and refuses an absent measurement with a structure-coded ContractError rather than reading it as a small count.
- **s03-22** — applied: Grouped the proxy-visible operations under a frozen INTRINSICS.reflect sub-entity exactly as ruled: reflect.read/write/members/present/describe/define/prototype/apply/construct. The flat Object rows describe/define/prototype and the Number rows stay flat. Every in-package reader moved (121 call sites across 12 source files). The former flat keys reveal, declare, and parent no longer exist.
- **s03-23** — applied: createStringFaults, createNumberFaults, and createArrayFaults renamed to buildStringFaults, buildNumberFaults, and buildArrayFaults, with their TSDoc first sentences rewritten to the third-person form and their guide compiler rows updated.
- **s03-07-rename-half** — applied: isValidISOInstant renamed to matchesISOInstant, with the classifyFormat call sites, the guide row, tests/setup.ts, and the TSDoc first sentence and boolean @returns rewritten to the required forms.
- **s03-24** — applied: ShapeCloner, SchemaCloner, and JSONCloner took ContractCompiler's class-scoped frozen empty-peer pattern. Array peers (#pending, #sources) are static readonly frozen sentinels assigned at settlement; Map peers (#memo, #paths, #properties, #variants in ShapeCloner, #memo in SchemaCloner) are dropped to undefined instead, because Object.freeze reaches an array's writes and not a Map's — ContractCompiler's own stated reason for dropping its index. Each class gained one #unavailable() refusal and per-method narrowing at every dispatch. JSONCloner's #fail assigns the shared peer instead of truncating in place. The existing weak-reference retention tests in JSONCloner.test.ts, SchemaCloner.test.ts, and ShapeCloner.test.ts prove the release still releases.
- **s03-02** — applied: Moved the CONTRACT_CODES guide row out of the JSON table and into the ContractError section immediately after the ContractCode row, respaced to that table's column widths.
- **report-amendment** — stopped: Not done. Expected: mark s03-24 superseded in the Dispositions list. Found: the list lives at /home/user/scaffold/.orkestrel/campaign/fix/reports/contract.md line 28, which is outside /home/user/fleet/contract and inside the brief's off-limits set ('.orkestrel/**, ... and every file outside the repository'). Evidence: the row reads '- **s03-24** applied (src/core/ContractCompiler.ts): ...' and lines 76 and 83-84 of the same file already record the siblings as a successor unit and s03-24 as superseded by 7e762ab. Hypothesis: the amendment belongs to the Orchestrator's own retention pass, not to a unit scoped to the package checkout.

## Symbols moved

- validateShapeDepth → validateShape
- createStringFaults → buildStringFaults
- createNumberFaults → buildNumberFaults
- createArrayFaults → buildArrayFaults
- isValidISOInstant → matchesISOInstant
- ValueToSchemaOptions.maxDepth → ValueToSchemaOptions.limits.depth
- ValueToSchemaOptions.maxProperties → ValueToSchemaOptions.limits.properties
- INTRINSICS.reveal → INTRINSICS.reflect.describe
- INTRINSICS.declare → INTRINSICS.reflect.define
- INTRINSICS.parent → INTRINSICS.reflect.prototype
- INTRINSICS.read → INTRINSICS.reflect.read
- INTRINSICS.write → INTRINSICS.reflect.write
- INTRINSICS.members → INTRINSICS.reflect.members
- INTRINSICS.present → INTRINSICS.reflect.present
- INTRINSICS.apply → INTRINSICS.reflect.apply
- INTRINSICS.construct → INTRINSICS.reflect.construct
- schemaNodeToShape → removed (SchemaShaper #convert)
- buildShapeFromNode → removed (SchemaShaper #build)
- buildObjectShape → removed (SchemaShaper #buildObject)
- inferValue → removed (ValueInferer #infer)
- inferArray → removed (ValueInferer #walkArray)
- inferObject → removed (ValueInferer #walkRecord)
- inferSamples → removed (SampleInferer #infer)
- inferRecordSamples → removed (SampleInferer #inferRecords)
- canonicalizeValue → removed (folded into canonicalStringify)
- ValueToSchemaLimits → added (public interface)
- SchemaShaper → added (interned class, parity INTERNAL)
- ValueInferer → added (interned class, parity INTERNAL)
- SampleInferer → added (interned class, parity INTERNAL)
- ShapeValidatorInterface.expansion: number → number | undefined
- ShapeValidator.expansion: number → number | undefined
- refuseExpansion(expansion: number) → refuseExpansion(expansion: number | undefined)

## Files touched

- /home/user/fleet/contract/src/core/SchemaShaper.ts
- /home/user/fleet/contract/src/core/ValueInferer.ts
- /home/user/fleet/contract/src/core/SampleInferer.ts
- /home/user/fleet/contract/src/core/shapers.ts
- /home/user/fleet/contract/src/core/inferers.ts
- /home/user/fleet/contract/src/core/helpers.ts
- /home/user/fleet/contract/src/core/types.ts
- /home/user/fleet/contract/src/core/constants.ts
- /home/user/fleet/contract/src/core/compilers.ts
- /home/user/fleet/contract/src/core/validators.ts
- /home/user/fleet/contract/src/core/combinators.ts
- /home/user/fleet/contract/src/core/errors.ts
- /home/user/fleet/contract/src/core/ShapeValidator.ts
- /home/user/fleet/contract/src/core/ShapeCloner.ts
- /home/user/fleet/contract/src/core/SchemaCloner.ts
- /home/user/fleet/contract/src/core/JSONCloner.ts
- /home/user/fleet/contract/src/core/ContractCompiler.ts
- /home/user/fleet/contract/guides/contract.md
- /home/user/fleet/contract/tests/guides.test.ts
- /home/user/fleet/contract/tests/setup.ts
- /home/user/fleet/contract/tests/src/core/inferers.test.ts
- /home/user/fleet/contract/tests/src/core/shapers.test.ts
- /home/user/fleet/contract/tests/src/core/helpers.test.ts
- /home/user/fleet/contract/tests/src/core/compilers.test.ts
- /home/user/fleet/contract/tests/src/core/ShapeValidator.test.ts
- /home/user/fleet/contract/tests/src/core/ShapeCloner.test.ts
- /home/user/fleet/contract/tests/src/core/ContractCompiler.test.ts
- /home/user/fleet/contract/tests/src/core/cloners.test.ts
- /home/user/fleet/contract/tests/src/core/integration.test.ts

## Tests changed

- tests/guides.test.ts — the parity INTERNAL list now names 'class SampleInferer', 'class SchemaShaper', 'class ValueInferer', which is what makes the three engines intentionally stranded rather than forgotten.
- tests/src/core/inferers.test.ts — every direct-spine case re-expressed at its door: inferArray cases now drive valueToSchema with limits, inferSamples and inferRecordSamples cases drive samplesToSchema, and the published messages moved from 'inferArray: value could not be read' to 'valueToSchema: value could not be read' and from 'inferRecordSamples: samples must be a dense array' to 'samplesToSchema: samples must be a dense array'. The 'canonicalizeValue — direct' block became 'canonicalStringify — the walk at its door'. The depth-exhaustion case was rewritten to exercise the record branch's row budget (depth 0 reads no row, depth 1 widens the hostile column, depth 2 refuses) because the door reads its own sample container before the walk starts.
- tests/src/core/shapers.test.ts — the hostile-schema refusal is asked at schemaToShape at the root, inside properties, and inside items, and asserts 'schemaToShape: schema could not be read'.
- tests/src/core/compilers.test.ts — the validator-consolidation row asserts the whole validate* export population equals ['validateShape'] instead of naming a removed spelling, which keeps the no-alias claim without a dangling old name.
- tests/src/core/ShapeValidator.test.ts — expansion is undefined before the first successful validate() and after a failed one.
- tests/src/core/helpers.test.ts — added 'refuses an absent measurement rather than reading it as a small one' for refuseExpansion(undefined); added 'freezes the proxy-visible group the same way it freezes the table' and 'separates the reflective operations from their flat Object peers' for INTRINSICS.reflect; readSampleMemo reader labels moved to real door names.
- tests/src/core/integration.test.ts — the owned-member census literal moved 216 → 207, matching the nine removed exports.
- tests/setup.ts — dropped the canonicalizeValue coded-door row and the ancestor fixture it needed.

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 1853ms on 66 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- `npm run build` → exit 0 — ✓ 22 modules transformed. dist/src/core/index.cjs 392.69 kB │ gzip: 89.24 kB. ✓ built in 3.58s. Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — src:core 15 files / 1305 passed; policy 1 file / 111 passed; config 1 file / 46 passed; setup 2 files / 61 passed; guides 1 file / 65 passed. No failures, no skips.
- `node scratchpad/cycle.mjs (built-artifact load, both entry points)` → exit 0 — esm and cjs both: schemaToShape.type=object; samplesToSchema={"type":"object",...}; canonicalStringify={"a":2,"b":1}; matchesISOInstant=true; INTRINSICS.reflect.apply=function; limits honoured; still exported=[] for all nine removed spines, the four renamed spellings, and the three interned classes. Negative control on the same check reported ['validateShape','schemaToShape'] present.
- `grep -rn '\b<old-name>\b' src tests guides` → exit 0 — 0 hits each for schemaNodeToShape, buildShapeFromNode, buildObjectShape, inferValue, inferArray, inferObject, inferSamples, inferRecordSamples, canonicalizeValue, maxDepth, maxProperties, validateShapeDepth, createStringFaults, createNumberFaults, createArrayFaults, isValidISOInstant. Control: validateShape returns 429 hits, so the pattern population is real.

## Diff stat

```text
26 files changed, 1381 insertions(+), 2439 deletions(-) plus three new untracked files (src/core/SchemaShaper.ts 331 lines, src/core/ValueInferer.ts 254 lines, src/core/SampleInferer.ts 247 lines). Largest movers: src/core/inferers.ts -748, src/core/shapers.ts -458, tests/src/core/inferers.test.ts 410, tests/src/core/compilers.test.ts 358, src/core/helpers.ts 388, guides/contract.md 244, src/core/ShapeCloner.ts 233.
```

Status at return (writer's reading): `Every assigned row applied except the report amendment, which is stopped on scope. All five acceptance gates exit 0 and the removed-name sweep is clean with a working control.`
Built `dist/` moves: true

## Observations

- The three interned engines create module cycles (shapers.ts ↔ SchemaShaper.ts, inferers.ts ↔ ValueInferer.ts and SampleInferer.ts) because the door lives in its kind file and the engine must call that file's builders. Every cross-cycle reference is a hoisted function declaration used at call time, and the Vite build bundles src/core into one file, so the cycle does not survive into the artifact. Proved rather than argued: both published entry points were imported from dist and driven end to end.
- SampleMemo, buildSampleMemo, and readSampleMemo lost their consumer-facing purpose when the sample spines were interned — a caller now has no door to hand a memo to. They are still used internally by SampleInferer and their TSDoc was retargeted to the door, but removing three more public exports is a breaking change the plan did not rule on. Recorded against the capability that owns it, for a successor row.
- The published diagnostic for a hostile inference or inversion input now names the door rather than a spine: 'schemaToShape: schema could not be read' replaces 'schemaNodeToShape: schema could not be read', and the cause chain is one link shorter because the interned methods carry no boundary of their own. The message a door published was already the door's name in every case the door was the entry point; only the direct-call spelling disappeared.
- The whole-suite npm test run took 5.5s for src:core and under 2.3s for each cross-cutting project on this host, with no timing-suspect failure to report.
- ShapeCloner's and SchemaCloner's new #unavailable() guards are unreachable by construction: both cloners are eager and terminal, so every walk method runs before #settle and a settled cloner replays from #state. They are defense in depth on the same terms ContractCompiler states for its dropped index, and no test can reach them without breaking encapsulation.
- INTRINSICS.reflect is frozen on its own and the flat Object rows describe/define/prototype now share three words with their reflective peers. That collision is the point of the grouping — proxy visibility is the axis — and the new helpers.test.ts case pins each of the six identities so the two sets cannot silently swap.

## Deviations

- canonicalizeValue was folded into canonicalStringify rather than made a class # method. .claude/rules/architecture.md § Kind purity: 'Keep the leaf pair class-free. `helpers.ts` and `validators.ts` sit at the bottom of a module's graph: they import types, constants, errors, and each other, and they import no implementation class.' canonicalStringify is the door the ruling keeps unchanged and it lives in helpers.ts, so an owning class there would force helpers.ts to import an implementation class. The same rule is what the judge's amend applied when it struck helpers.ts:1452 from this row. The fold satisfies every part of the ruling: the spine leaves the published surface, no published signature carries a state parameter, and the door keeps its signature. The walk-local ancestor set made the `admitted` array and its restoring `finally` dead, and both were dropped with it.
- The ruling's 'group under limits' required a named type to match the MultipartLimits precedent, so ValueToSchemaLimits was added to src/core/types.ts and given its own guide row. That is a new public export the ledger did not enumerate; it exists only to carry the grouped leaves the ruling names.
- s03-13's retype forced refuseExpansion to accept number | undefined. Rather than narrowing at each of its two call sites, the refusal moved into the helper that owns the rule — .claude/rules/architecture.md wrapper test and the helper's own TSDoc both say the bound is 'written once because two boundaries apply it'. An absent measurement now refuses with 'validateShape: a validated shape measured no expansion' under code structure.
- The three interned engines are NOT barrelled. .claude/rules/architecture.md § Barrel exports: 'Intern it — out of the barrel, and named in the package's parity `INTERNAL` list — when its constructor requires a value only its owner produces, or when the public value is a projection of the instance rather than the instance.' Each engine returns a projection (a ContractShape or a JSONSchema) rather than the instance, the ledger's own verb for this row is 'intern', and barrelling them would replace nine removed doors with three new ones. They are named in the INTERNAL list, and the list's second parity assertion fails if any of them stops being stranded.
- s03-24's Map-typed peers were dropped to undefined rather than shared. ContractCompiler's own commit states the reason: 'Object.freeze reaches an array's writes and not a WeakMap's, so a shared empty map would be a class-lifetime cache that any write could fill with the caller's own shapes.' A Map has the same property, so sharing one would have been the pattern's name without its substance.
- Two literals moved because the change moved them: the owned-member census in tests/src/core/integration.test.ts and the matching '216 rows' sentence in guides/contract.md are now 207, which is 216 minus the nine removed exports. The test pins the guide's number deliberately, so both had to move together.
- The report amendment for s03-24 is stopped, not applied: /home/user/scaffold/.orkestrel/campaign/fix/reports/contract.md is outside the repository this unit owns and inside the brief's off-limits '.orkestrel/**' set.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/contract.diff`,
`tmp/units/breaking/contract.status`.
