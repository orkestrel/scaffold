# Fix dossier: rater

Verified fix-producing findings for the `rater` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s17-01 — DRIFT-RESHAPE

1. package=`rater`, `relation`, `template`, `worker`, `websocket` file=`rater/src/core/types.ts:135,167`, `rater/src/core/validators.ts:51,82`, `rater/src/core/constants.ts:6`, `rater/src/core/Rater.ts:38,39,80`, `relation/src/core/types.ts:18,172,184,191,214`, `relation/src/core/Model.ts:38,54`, `relation/src/core/errors.ts:3`, `template/src/core/types.ts:6,7,110,140,161,172`, `template/src/core/TemplateManager.ts:22,156`, `template/src/core/constants.ts:3`, `template/src/core/errors.ts:3`, `template/src/core/helpers.ts:18`, `worker/src/core/types.ts:6,18,21,61,67,82`, `worker/src/core/Worker.ts:28,36,50`, `worker/src/server/types.ts:13,16`, `worker/src/server/helpers.ts:11,13`, `websocket/src/server/types.ts:12,16,94,102,144`, `websocket/src/server/constants.ts:3`, `websocket/src/server/helpers.ts:213`, `websocket/src/server/NodeWebSocket.ts:58,62` rule=`.claude/rules/writing.md` § Structure ("Identity numbering… is data") + `AGENTS.md` § Writing ("NEVER name a list item by its position") + `.claude/rules/documentation.md` § Authority and workflow ("Do not create competing instruction copies in guides") verdict=CONFIRMED
   wrong: Published TSDoc and source comments cite `AGENTS §2`, `§5`, `§7`, `§8`, `§9.1`, `§9.2`, `§10`, `§12`, `§13`, `§14`, `§21`, `§22`, and `§4.5` — section numbers the current `AGENTS.md` does not have, so a consumer reading the shipped `.d.ts` is pointed at a document structure that no longer exists, and an agent reading the source is pointed at nothing.
   repair: Delete every `AGENTS §N` / `(§N)` parenthetical. Where the clause carried real content, restate the behavior directly (`Total guard: adversarial input returns false, never throws`); where it carried only the citation, delete the clause.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and neither lane disputes it: /home/user/scaffold/AGENTS.md carries only named headings and exactly one '§' (line 87, itself a named reference), while rater's initial-commit AGENTS.md was numbered, so every cited number now resolves to nothing and ships in the published .d.ts.

**Lane DRIFT-RESHAPE/high:** amend: keep the direction (delete the citation, restate the behavior where the clause carried content) but scope the sweep to AGENTS references only — match `AGENTS §N` plus the bare `(§N)` sites enumerated in the finding, and preserve every `RFC 6455 §N` citation (websocket/src/server/helpers.ts:16,33,78,182,234, constants.ts:14,22,25,28,31,34,37,52,55,58,61,64,76, types.ts:30,44,45,63,125, NodeWebSocket.ts:333,412). Where a section must still be named, name it as the canon does (`AGENTS.md § Design laws`), not by number. Add the guides to the unit — rater/guides/rater.md:15,47,98,136,254,258,261 carry the same dangling numbers in published documentation.

**Lane DRIFT/high:** stands - with the scope observation that the rater slice is a fraction of a fleet-wide population across 30 packages, and a per-package fix leaves the same dangling reference shipping from every sibling.

## s17-03 — DRIFT

3. package=`rater` file=`rater/src/core/helpers.ts:24,50,78,112,142,175,210,244,300,339,372`, `rater/src/core/validators.ts:32,48,79,109,140,171,202,232,267,298`, `rater/src/core/factories.ts:5`, `rater/src/core/errors.ts:31`; also `relation/src/core/helpers.ts:18,30,148,164,180,191,202,231`, `relation/src/core/errors.ts:33`, `template/src/core/helpers.ts:23,52,84,169`, `template/src/core/Template.ts:78,101,122,181`, `websocket/src/server/helpers.ts:12,29,50,70,136,176,208,233,262`, `workspace/src/core/helpers.ts:12,30,47,64,89,104,120,139,157,175,195,211,233,250,270,293` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The first TSDoc sentence of these public exports is imperative or a bare fragment — `Build a {@link LineDefinition}`, `Determine whether a value is…`, `Narrow a caught value…`, `Whether a value is a canonical…`, `Compute the byte size…` — where the rule fixes third person with an `-s` verb. `codec/src/core/helpers.ts` and `validators.ts` get this right throughout (`Encodes`, `Decodes`, `Measures`, `Checks whether`), so the correct form is already settled in the fleet.
   repair: Rewrite each first sentence in third person: `Builds a…`, `Checks whether…`, `Narrows a caught value…`, `Computes the byte size…`. Nothing else in the block changes.

## s17-05 — DRIFT-RESHAPE

5. package=`rater` file=`rater/src/core/helpers.ts:158,191,318,357` rule=`.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
   wrong: `worksheetFactor`, `worksheetGroup`, `resultsWorksheet`, and `ratedLine` are noun-noun and adjective-noun compounds, not the `{verb}{Noun}` form the rule fixes for a module helper, and none is a one-word helper whose meaning is unmistakable. `resultsWorksheet` and `ratedLine` additionally read as data, not as calls.
   repair: Rename to the projection form the rule already fixes for a whole-to-view derivation — `joinWorksheetFactor`, `joinWorksheetGroup`, `resultToWorksheet`, `resultToLine` — or to `{verb}{Noun}`. Update `Rater.ts:27,117`, the guide's Helpers table, and the fences.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: take the `{verb}{Noun}` branch the finding offers as its alternative and drop the `{noun}To{Noun}` branch. Rename to `joinWorksheetFactor`, `joinWorksheetGroup`, `joinWorksheet`, `buildLineResult` — `join*` for the definition-plus-result derivations, matching the guide's own verbs. Widen the update set beyond `Rater.ts:27,117` to the intra-file callers at helpers.ts:204, 323, 366, the `@example` fences at helpers.ts:152, 185, 254, 311, 350, 380, guides/rater.md:145-150 and the fences at 183-225, tests/src/core/helpers.test.ts, and the removed-symbol list at tests/src/core/Rater.test.ts:93-141. Fold into one `helpers.ts` rename unit with s17-04 and s17-06.

**Lane DRIFT-RESHAPE/medium:** amend: keep `worksheetFactor` and `worksheetGroup` unchanged — they are the convention. Rename only the two strays onto that same convention: `resultsWorksheet` → `worksheet` and `ratedLine` → `lineResult`, each named for the type it returns, matching reason's one-word value builders (`check`, `bounds`, `fact`, `rule`). Update `Rater.ts:27,117`, the guide's Helpers table rows and fences, and the `@example` blocks. If a verb form is preferred instead, apply it to the whole builder family in one edit — `lineDefinition`, `ratingDefinition`, `worksheetStep`, `worksheetFactor`, `worksheetGroup` included — never to two of seven.

## s17-06 — DRIFT-RESHAPE

6. package=`rater` file=`rater/src/core/helpers.ts:95` and `rater/src/core/helpers.ts:130` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Standalone helpers ("Reject vague helpers") verdict=CONFIRMED
   wrong: `evidenceCheck(check, actual, met, labels)` and `checkEvidence(checks, results, labels)` are word-order reversals of each other sitting adjacent in one file. A consumer cannot predict from either name which builds one `Evidence` from one `Check` and which builds a list from a factor's checks; the names encode the difference only by argument order.
   repair: Make the singular/plural axis carry the difference under one term, in the same edit as finding 4: `createEvidence(check, actual, met, labels)` for the row and `createEvidences(checks, results, labels)` — or keep the list builder as a helper named `collectEvidence`. Either way the two names must differ by the thing that differs.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: keep both functions in `rater/src/core/helpers.ts` and rename in place to `buildEvidence(check, actual, met, labels)` and `buildEvidenceRows(checks, results, labels)` — one verb, the singular/plural axis carried by the noun, matching each function's own TSDoc ("Build an {@link Evidence} row" / "Build evidence rows"). Drop the `createEvidence`/`createEvidences` naming and drop the coupling to s17-04's move. Update helpers.ts:137, the fences at helpers.ts:89 and :124, guides/rater.md:143-144 and the fence at 169-177, tests/src/core/helpers.test.ts, and the removed-symbol list at tests/src/core/Rater.test.ts:93-141; add the retired names to that list as aa14a45 did for `premiseCheck` and `checkPremises`.

**Lane DRIFT-RESHAPE/high:** amend: keep both functions in `helpers.ts` and rename onto the package's builder convention — `evidenceCheck` → `evidence` (named for the `Evidence` row it returns, matching reason's one-word `check`, `fact`, `bounds`) and `checkEvidence` → `collectEvidence` (`{verb}{Noun}`, and `collect*` is already fleet vocabulary in contract's `collectMembers` and `collectEntries`). Do not introduce `createEvidences`, and do not couple this edit to s17-04.

## s17-08 — DRIFT-RESHAPE

8. package=`rater` file=`rater/src/core/types.ts:117` rule=`AGENTS.md` § Design laws ("Derive state") verdict=CONFIRMED
   wrong: `LineResult.success` is an exact second copy of `LineResult.worksheet.success` — `ratedLine` (`helpers.ts:365,367`) writes `result.success` into both, so the two can only ever disagree by a bug, and a consumer has no way to know which is authoritative.
   repair: Drop `success` from `LineResult` and let consumers read `line.worksheet.success`, updating `Rater.ts:89` (`results.every((entry) => entry.worksheet.success)`), `validators.ts:284-294`, `sumAmounts`'s TSDoc, and the guide's `LineResult` row.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The duplication is real and undocumented, so EXCEPTION fails its evidentiary bar, but the finding's repair is harmful, so DRIFT fails too. On the violation: `ratedLine` writes `success: result.success` and `worksheet: resultsWorksheet(...)`, and `resultsWorksheet` writes `success: result.success` fr

**Lane DRIFT/medium:** amend: direction stands — drop `success` from `LineResult` and read `line.worksheet.success`. Widen the update set well beyond the four sites named. Source: types.ts:112-118 and its `@remarks` at 104-111 (which states `amount` is present only when `success` is `true`), helpers.ts:367, validators.ts:284-294, Rater.ts:89, and `sumAmounts`'s TSDoc at helpers.ts:372-387. Tests: tests/setup.ts:194 (the `success: amount !== undefined` fixture line), tests/src/core/helpers.test.ts:214,225, tests/src/core/validators.test.ts:558,603, and tests/src/core/Rater.test.ts:174,186,382,401,428,447,484,561,584. Guide: guides/rater.md:53 ("`success: false`, no `amount`"), :73 (the `LineResult` row), and :118 (the `isLineResult` row). Leave `RatingResult.success` alone — it is an aggregate over lines, not a second copy of one flag.

**Lane EXCEPTION/medium:** drop - if the coincidence is worth closing at all, close it at the source rather than on the interface: have `ratedLine` build the worksheet first and set `success` from it, and state in the `LineResult` remarks that a `Rater`-produced line's `success` equals its `worksheet.success` while a borrowed implementation's need not.

