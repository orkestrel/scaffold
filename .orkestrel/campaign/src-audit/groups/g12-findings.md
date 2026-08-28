# Findings for group g12

Packages: rater. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s17-01

1. package=`rater`, `relation`, `template`, `worker`, `websocket` file=`rater/src/core/types.ts:135,167`, `rater/src/core/validators.ts:51,82`, `rater/src/core/constants.ts:6`, `rater/src/core/Rater.ts:38,39,80`, `relation/src/core/types.ts:18,172,184,191,214`, `relation/src/core/Model.ts:38,54`, `relation/src/core/errors.ts:3`, `template/src/core/types.ts:6,7,110,140,161,172`, `template/src/core/TemplateManager.ts:22,156`, `template/src/core/constants.ts:3`, `template/src/core/errors.ts:3`, `template/src/core/helpers.ts:18`, `worker/src/core/types.ts:6,18,21,61,67,82`, `worker/src/core/Worker.ts:28,36,50`, `worker/src/server/types.ts:13,16`, `worker/src/server/helpers.ts:11,13`, `websocket/src/server/types.ts:12,16,94,102,144`, `websocket/src/server/constants.ts:3`, `websocket/src/server/helpers.ts:213`, `websocket/src/server/NodeWebSocket.ts:58,62` rule=`.claude/rules/writing.md` § Structure ("Identity numbering… is data") + `AGENTS.md` § Writing ("NEVER name a list item by its position") + `.claude/rules/documentation.md` § Authority and workflow ("Do not create competing instruction copies in guides") verdict=CONFIRMED
   wrong: Published TSDoc and source comments cite `AGENTS §2`, `§5`, `§7`, `§8`, `§9.1`, `§9.2`, `§10`, `§12`, `§13`, `§14`, `§21`, `§22`, and `§4.5` — section numbers the current `AGENTS.md` does not have, so a consumer reading the shipped `.d.ts` is pointed at a document structure that no longer exists, and an agent reading the source is pointed at nothing.
   repair: Delete every `AGENTS §N` / `(§N)` parenthetical. Where the clause carried real content, restate the behavior directly (`Total guard: adversarial input returns false, never throws`); where it carried only the citation, delete the clause.

## s17-03

3. package=`rater` file=`rater/src/core/helpers.ts:24,50,78,112,142,175,210,244,300,339,372`, `rater/src/core/validators.ts:32,48,79,109,140,171,202,232,267,298`, `rater/src/core/factories.ts:5`, `rater/src/core/errors.ts:31`; also `relation/src/core/helpers.ts:18,30,148,164,180,191,202,231`, `relation/src/core/errors.ts:33`, `template/src/core/helpers.ts:23,52,84,169`, `template/src/core/Template.ts:78,101,122,181`, `websocket/src/server/helpers.ts:12,29,50,70,136,176,208,233,262`, `workspace/src/core/helpers.ts:12,30,47,64,89,104,120,139,157,175,195,211,233,250,270,293` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The first TSDoc sentence of these public exports is imperative or a bare fragment — `Build a {@link LineDefinition}`, `Determine whether a value is…`, `Narrow a caught value…`, `Whether a value is a canonical…`, `Compute the byte size…` — where the rule fixes third person with an `-s` verb. `codec/src/core/helpers.ts` and `validators.ts` get this right throughout (`Encodes`, `Decodes`, `Measures`, `Checks whether`), so the correct form is already settled in the fleet.
   repair: Rewrite each first sentence in third person: `Builds a…`, `Checks whether…`, `Narrows a caught value…`, `Computes the byte size…`. Nothing else in the block changes.

## s17-04

4. package=`rater` file=`rater/src/core/helpers.ts:40,68,95,227` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Entity/value factories → `*/factories.ts`) + § Kind purity ("Every exported function in `factories.ts` is named `create*`") + `.claude/rules/names.md` § Fixed derivation/construction forms verdict=CONFIRMED
   wrong: `lineDefinition`, `ratingDefinition`, `evidenceCheck`, and `worksheetStep` take constituent parts and return a fresh value record with no computation over an evaluated result — they are value factories sitting in `helpers.ts` under noun-phrase names. `lineDefinition('base', 'Base', rate)` returns `{ id, name, rate, ...overrides }` and nothing else.
   repair: Move all four to `rater/src/core/factories.ts` and rename to `createLineDefinition`, `createRatingDefinition`, `createEvidence`, `createStep`. Update `helpers.ts`'s internal callers (`checkEvidence` calls `evidenceCheck`; `worksheetSteps` calls `worksheetStep`), the `@example` fences, and the guide's Helpers table rows.

## s17-05

5. package=`rater` file=`rater/src/core/helpers.ts:158,191,318,357` rule=`.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
   wrong: `worksheetFactor`, `worksheetGroup`, `resultsWorksheet`, and `ratedLine` are noun-noun and adjective-noun compounds, not the `{verb}{Noun}` form the rule fixes for a module helper, and none is a one-word helper whose meaning is unmistakable. `resultsWorksheet` and `ratedLine` additionally read as data, not as calls.
   repair: Rename to the projection form the rule already fixes for a whole-to-view derivation — `joinWorksheetFactor`, `joinWorksheetGroup`, `resultToWorksheet`, `resultToLine` — or to `{verb}{Noun}`. Update `Rater.ts:27,117`, the guide's Helpers table, and the fences.

## s17-06

6. package=`rater` file=`rater/src/core/helpers.ts:95` and `rater/src/core/helpers.ts:130` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Standalone helpers ("Reject vague helpers") verdict=CONFIRMED
   wrong: `evidenceCheck(check, actual, met, labels)` and `checkEvidence(checks, results, labels)` are word-order reversals of each other sitting adjacent in one file. A consumer cannot predict from either name which builds one `Evidence` from one `Check` and which builds a list from a factor's checks; the names encode the difference only by argument order.
   repair: Make the singular/plural axis carry the difference under one term, in the same edit as finding 4: `createEvidence(check, actual, met, labels)` for the row and `createEvidences(checks, results, labels)` — or keep the list builder as a helper named `collectEvidence`. Either way the two names must differ by the thing that differs.

## s17-07

7. package=`rater` file=`rater/src/core/types.ts:12` rule=`.claude/rules/names.md` § Type-level identifiers (Union/enum-like → `{Entity}{Noun}`) verdict=CONFIRMED
   wrong: `Stage` is a literal union published from the package barrel with no entity prefix. It names a worksheet derivation step's stage, so the entity is `Worksheet`; a consumer importing `Stage` from `@orkestrel/rater` gets a name that says nothing about what it stages.
   repair: Rename to `WorksheetStage`, and rename its guard `isStage` → `isWorksheetStage`. Update `types.ts:83`, `helpers.ts:15,228`, `validators.ts:8,45,221`, and the guide's Types and Guards rows.

## s17-08

8. package=`rater` file=`rater/src/core/types.ts:117` rule=`AGENTS.md` § Design laws ("Derive state") verdict=CONFIRMED
   wrong: `LineResult.success` is an exact second copy of `LineResult.worksheet.success` — `ratedLine` (`helpers.ts:365,367`) writes `result.success` into both, so the two can only ever disagree by a bug, and a consumer has no way to know which is authoritative.
   repair: Drop `success` from `LineResult` and let consumers read `line.worksheet.success`, updating `Rater.ts:89` (`results.every((entry) => entry.worksheet.success)`), `validators.ts:284-294`, `sumAmounts`'s TSDoc, and the guide's `LineResult` row.