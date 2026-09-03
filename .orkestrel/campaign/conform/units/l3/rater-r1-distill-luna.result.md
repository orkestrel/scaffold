I’m auditing the supplied tree, diff, report, controls, and cited rules read-only. I’ll return only the brief’s named sections, with current line pointers and sweep results.## Question
For every conform-rater row, compare the current tree, unit diff, and writer report.

## Evidence

### Per-row entries

**rater-obj-1**
- **Site now.** `README.md:20` is `- Node.js >= 22.12.0`; context: `README.md:19` `## Requirements`, `README.md:21` `- ESM ... through the exports field`.
- **Diff at the site.** `conform-rater.diff:5` — `@@ -17,13 +17,13 @@ npm install @orkestrel/rater`; the `+` lines contain the operative `- Node.js >= 22.12.0`.
- **Old form sweep.** Pattern `\bNode\.js >= 24\b`, paths `src`, `tests`, `guides/rater.md`, `guides/README.md`, `README.md`: no hit.
- **Report reading.** `applied` — “`README.md:20` reads `- Node.js >= 22.12.0`, matching `package.json:92-94`.” The cited line matches.
- **Proof reading.** Documentation row; report records the replacement and no failing control. The old-form sweep agrees.

**rater-obj-2**
- **Site now.** The block begins at `tests/guides.test.ts:198`; `:197` is the explanatory comment and `:199` is the Surface case title. The repaired worksheet assertion is at `:280-285`.
- **Diff at the site.** `conform-rater.diff:409` — `@@ -168,3 +168,117 @@ for (const entry of manifest) {`; the `+` lines add `describe('flagship fences', ...)`, imports, and assertions.
- **Old form sweep.** Pattern `\bworksheetSteps\(definition, result, \[\]\)`, same paths: no hit.
- **Report reading.** `applied` — “`flagship fences` block appended to `tests/guides.test.ts`; red then green, see § Failing-first controls.” The block and assertions exist.
- **Proof reading.** `/home/user/work/evidence/rater-proofs/rater-obj-2-red.txt`: `Tests 1 failed | 25 passed (26)`, with `expected [ 'total' ] ... [ 'factor', 'group', 'total' ]`. Green control: `Tests 26 passed (26)` in `rater-obj-2-green.txt`.

**rater-obj-3**
- **Site now.** `tests/src/core/factories.test.ts:63-65` contains the three-line `captureError` proof; context is `:62` `rater.destroy()` and `:66` the test closure.
- **Diff at the site.** `conform-rater.diff:851` — `@@ -59,14 +59,9 @@ describe('factories — createRater destroy semantics', () => {`; the `+` lines contain `captureError`, `isRaterError`, and the `DESTROYED` assertion verbatim.
- **Old form sweep.** Pattern `\b(let thrown|try|catch|RaterError)\b` scoped to the changed proof, same paths: the local `try`/`catch` and `RaterError` use are absent; `RaterError` remains in unrelated intended proofs.
- **Report reading.** `applied` — “`factories.test.ts` DESTROYED proof now runs through `captureError`; the local `try`/`catch` and `RaterError` import are gone.” The cited proof matches.
- **Proof reading.** `/home/user/work/evidence/rater-proofs/rater-obj-3-after.txt`: `Tests 131 passed (131)`. No failing-first control is recorded, matching the report’s explicit exception.

**rater-obj-4**
- **Site now.** `tests/setup.ts:155` declares `StubEngine`; `:154` contains its TSDoc and `:156` its first private field. Its methods occupy `:168-192`.
- **Diff at the site.** `conform-rater.diff:606` — `@@ -150,6 +151,47 @@ ...`; `:654` — `@@ -157,21 +199,7 ...`. The `+` lines contain the class, overloaded `reason`, no-op members, and `return new StubEngine(result)`.
- **Old form sweep.** Pattern `function reason|const reason|reason:`, changed setup region and same paths: no nested local declaration remains.
- **Report reading.** `applied` — “`createStubEngine`'s nested overloaded `function reason` replaced by the `StubEngine` class; red then green.” The current setup matches.
- **Proof reading.** `rater-obj-4-red.txt`: `Tests 2 failed | 13 passed (15)`, both array-overload assertions. Green control: `Tests 15 passed (15)`.

**rater-subj-1**
- **Site now.** `src/core/helpers.ts:40` is `export function buildLineDefinition(`; `:39` is `*/`, `:41` is `id: string`. `:68` is `buildRatingDefinition`; `:228` is `buildWorksheetStep`; `:264` is `buildWorksheetSteps`.
- **Diff at the site.** Relevant headers: `:207` `@@ -32,12 +32,12 ...`; `:223` `@@ -57,15 +57,15 ...`; `:253` `@@ -79,7 +79,8 ...`; `:270` `@@ -251,16 +252,16 ...`; `:290` `@@ -270,7 +271,7 ...`; `:299` `@@ -281,11 +282,17 ...`; `:319` `@@ -328,7 +335,7 ...`; `:328` `@@ -347,9 +354,9 ...`; `:340` `@@ -376,10 +383,10 ...`. The operative `build*` names appear in the `+` lines.
- **Old form sweep.** Exact pattern `\b(lineDefinition|ratingDefinition|worksheetStep|worksheetSteps)\b`, paths `src`, `tests`, `guides/rater.md`, `guides/README.md`, `README.md`: no hit. Case-insensitive inflection sweep finds only distinct type references: `LineDefinition` at `guides/rater.md:69,114,144`, `README.md:52`, `src/core/helpers.ts:12,24,29,44,45,71`, `src/core/types.ts:27,39,47,173`, `src/core/validators.ts:4,48,55,65`, `src/core/Rater.ts:9,76,78,101,110`, and `tests/setup.ts:16,98,116,129`; `RatingDefinition` at `guides/rater.md:50,53,70,115,145,276,291`, `README.md:52`, `src/core/helpers.ts:14,50,55,72,73`, `src/core/types.ts:40,43,174`, `src/core/validators.ts:6,79,86,95`, `src/core/Rater.ts:14,77,78,101`, and `tests/src/core/validators.test.ts:685`. No old helper identifier is present.
- **Report reading.** `applied` — “Four helpers renamed to the `build*` form across source, tests, guide, and README; old-name sweeps read empty.” The semantic old-name sweep agrees.
- **Proof reading.** Naming row; the exact and inflection sweeps above agree with the report’s distinction between helper names and type names.

**rater-subj-2**
- **Site now.** The repaired fence is `guides/rater.md:223-228`; `:222` closes the group block and `:229` starts the worksheet construction comment.
- **Diff at the site.** `conform-rater.diff:166` — `@@ -216,11 +220,15 @@ if (result.reasoning === 'quantitative') {`; the `+` lines contain `definition.groups.map((entry) => buildWorksheetGroup(entry, result.groups))`.
- **Old form sweep.** Pattern `worksheetSteps\(definition, result, \[\]\)`, same paths: no hit.
- **Report reading.** `applied` — “`guides/rater.md` now passes the joined groups to `buildWorksheetSteps`; the transcription that failed against `[]` passes.” The cited fence matches.
- **Proof reading.** Uses the shared behavioral control: red `1 failed | 25 passed (26)` and green `26 passed (26)`. The sweep agrees.

**rater-subj-3**
- **Site now.** `guides/README.md:3` omits the section citation; `:2` is `# Guides` and `:4` is blank. `:45` reads the coding-contract wording.
- **Diff at the site.** `conform-rater.diff:35` — `@@ -1,6 +1,6 @@`; `:43` — `@@ -42,4 +42,4 @@ ...`. Both operative replacements are in the `+` lines.
- **Old form sweep.** Pattern `AGENTS\s+§\s*\d+`, same paths: no hit.
- **Report reading.** `applied` — “Both `AGENTS §22` citations replaced in `guides/README.md`; the `§\d` sweep over owned files reads empty.” The cited lines match.
- **Proof reading.** Documentation row; the citation sweep agrees.

**rater-subj-4**
- **Site now.** `guides/rater.md:113` names `'factor'`, `'group'`, and `'total'`; `:112` is the table separator and `:114` is the `isLineDefinition` row.
- **Diff at the site.** `conform-rater.diff:96` — `@@ -99,18 +99,18 @@ try {`; the `+` line contains the member names and no count.
- **Old form sweep.** Pattern `\bthree\b`, same paths: one residual hit at `tests/src/core/validators.test.ts:35`, `accepts the three stage literals`; no hit in `guides/rater.md`.
- **Report reading.** `applied` — “The `isStage` Checks cell names the literals instead of tallying them; the table is formatter-clean.” The cited guide line matches; the test-title residual is separately recorded by the report.
- **Proof reading.** Placement/documentation row; the guide-site sweep agrees, with the test-title residual outside the changed guide site.

**rater-subj-5**
- **Site now.** `guides/rater.md:102-103` reads “The guards take their posture from who produces the value.” Context is `:101` ending the preceding sentence and `:104` beginning the authored-definition sentence.
- **Diff at the site.** `conform-rater.diff:71` — `@@ -99,18 +99,18 @@ try {`; the replacement sentence appears in the `+` lines.
- **Old form sweep.** Pattern `\btwo postures\b`, same paths: no hit.
- **Report reading.** `applied` — “The Validators paragraph reads "The guards take their posture from who produces the value."; paragraph re-wrapped.” The current paragraph matches.
- **Proof reading.** Documentation row; the phrase sweep agrees.

**rater-subj-6**
- **Site now.** `tests/guides.test.ts:2` reads “The constants that follow”; `:58-60` names the assertion instead of its position. Context for `:58` is `:57` ending the preceding sentence and `:61` closing the comment.
- **Diff at the site.** `conform-rater.diff:357` — `@@ -1,5 +1,5 @@`; `:397` — `@@ -32,8 +55,9 @@ ...`. Both replacements appear in `+` lines.
- **Old form sweep.** Patterns `The four constants below` and `second assertion below`, same paths: no hit.
- **Report reading.** `applied` — “`tests/guides.test.ts` header reads "The constants that follow"; the positional reference names the assertion.” The current comments match.
- **Proof reading.** Documentation row; the exact phrase sweeps agree.

**rater-subj-7**
- **Site now.** `src/core/helpers.ts:82-83` gives both boolean branches; `:81` documents `actual` and `:84` documents `labels`. The parameter remains at `:99`.
- **Diff at the site.** `conform-rater.diff:243` — `@@ -79,7 +79,8 @@ export function ratingDefinition(`; the fixed boolean wording appears in the `+` lines.
- **Old form sweep.** Pattern `Whether the check was met \(absent when not yet evaluated\)`, same paths: no hit.
- **Report reading.** `applied` — “`buildEvidence`'s `@param met` states both branches in the fixed boolean form.” The current TSDoc matches.
- **Proof reading.** Documentation row; the old TSDoc sweep agrees.

**rater-subj-8**
- **Site now.** `README.md:21` uses “through”; `:20` contains the Node requirement and `:22` is blank. Test titles use “through” at `tests/src/core/Rater.test.ts:393` and `:517`.
- **Diff at the site.** `conform-rater.diff:5` — `@@ -17,13 +17,13 ...`; `:726` — `@@ -390,7 +390,7 ...`; `:771` — `@@ -514,7 +514,7 ...`. Each `+` line contains the replacement.
- **Old form sweep.** Pattern `\bvia\b`, same paths: no hit.
- **Report reading.** `applied` — “`via` replaced in `README.md:21` and in the two `Rater.test.ts` titles; the `\bvia\b` sweep over owned files reads empty.” The cited lines match.
- **Proof reading.** Documentation row; the sweep agrees.

**fleet-F1**
- **Site now.** `isBrowserVuePath` has no hit in `tests/setup.ts` or the checkout. The source tree has only `src/core`; no browser environment or `tests/setupBrowser.ts` exists.
- **Diff at the site.** No hunk applies; the helper is already absent.
- **Old form sweep.** Pattern `\bisBrowserVuePath\b`, paths `src`, `tests`, excluding `node_modules`: no hit.
- **Report reading.** `noop` — “`tests/setup.ts` declares no `isBrowserVuePath` ... and the workspace has no browser environment.” The tree agrees.
- **Proof reading.** No control file is required for a noop; the path and environment sweeps agree.

**fleet-F2**
- **Site now.** No implementation class has a public `readonly id: string` before private fields. `Rater` has only `#` fields at `src/core/Rater.ts:48-52`; `RaterError` has no `id`; `StubEngine` starts with `#result` at `tests/setup.ts:156`.
- **Diff at the site.** No hunk applies; the ruled shape is absent.
- **Old form sweep.** Pattern `readonly id: string` plus class-field ordering, paths `src`, `tests`, excluding `node_modules`: interface-only hits at `src/core/types.ts:28,44,63,73,92,114`; no matching implementation class.
- **Report reading.** `noop` — “No implementation class has the shape.” The class and interface readings agree.
- **Proof reading.** No control file is required for a noop.

### Across the unit

**Scope.** Every status path is `owned` under the brief’s Scope:
`README.md`, `guides/README.md`, `guides/rater.md`, `src/core/helpers.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/Rater.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, and `tests/src/core/validators.test.ts`. No `shared` or `off-limits` path appears. Every diff file has at least one row naming its `Where`; no unowned diff hunk exists.

**Residue.** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over `+` lines in `conform-rater.diff`: the only matches are construction lines containing `new` when the pattern is applied case-insensitively:
- `tests/guides.test.ts:216` — `throw new RaterError('DESTROYED', 'Rater has been destroyed')`
- `tests/guides.test.ts:219` — `if (!isRaterError(error)) throw new Error(...)`
- `tests/guides.test.ts:279` — `throw new Error('expected a quantitative result')`
- `tests/setup.test.ts:178` — `const stub = new StubEngine(canned)`
- `tests/setup.ts:202` — `return new StubEngine(result)`
- `tests/src/core/factories.test.ts:63` — `throw new Error('expected a RaterError')`

No `.skip`, `.only`, `.todo`, retry, timeout, `TODO`, `FIXME`, `console.`, or `debugger` hit is present. The same pattern over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, returns no hit.

**Parity.**
- `RaterInterface` call signatures: `src/core/types.ts:173` `rate(lines...)`, `:174` `rate(definition...)`, `:175` `destroy()`. Guide rows: `guides/rater.md:276-277` list `rate` and `destroy`. Its readonly `emitter` property is at `src/core/types.ts:172`; the guide names it in the `RaterInterface` Surface row at `guides/rater.md:80` and explicitly keeps it off the method table at `:263`.
- The added `StubEngine` implements external `ReasonInterface`. Installed declaration members are `node_modules/@orkestrel/reason/dist/src/core/index.d.ts:4639-4647`: `emitter`, overloaded `reason`, `register`, `reasoner`, `reasoners`, `supports`, `validate`, and `destroy`. `tests/setup.ts:165-192` contains each corresponding member. No guide Methods row is expected because `StubEngine` is test infrastructure, not a published entity.
- Readonly data properties in the local interface are represented in the guide Surface rows: `LineDefinition`, `RatingDefinition`, `Evidence`, `Step`, `Worksheet`, `LineResult`, and `RatingResult` at `guides/rater.md:69-77`; `RaterInterface.emitter` at `:80`.
- Guide identifiers added or changed by the diff resolve through the barrel `src/core/index.ts:1-7`: `buildLineDefinition`, `buildRatingDefinition`, `buildWorksheetStep`, `buildWorksheetSteps`, `Stage`, `LineDefinition`, `RatingDefinition`, `Evidence`, `Step`, `Worksheet`, `LineResult`, `RatingResult`, `Rater`, and `RaterInterface` are exported through the star-exported modules. `FactorResult`, `GroupResult`, `QuantitativeDefinition`, and `QuantitativeResult` resolve from `@orkestrel/reason`, not the rater barrel.

**Gates.** The report records:
- `npm run format:check` — exit `0`
- `npm run lint:check` — exit `0`
- `npm run check` — exit `0`
- `npm run build` — exit `0`
- `npm test` — exit `0`

The corresponding evidence files are `gate-1-format-check.txt` through `gate-5-test.txt`.

**Breaking.** The report lists:
- `lineDefinition` → `buildLineDefinition`
- `ratingDefinition` → `buildRatingDefinition`
- `worksheetStep` → `buildWorksheetStep`
- `worksheetSteps` → `buildWorksheetSteps`

The report names `@orkestrel/program` as the consumer and supplies exact edits for its tests, README, guide, and refreshed `guides/rater.md` mirror. Pattern `\b(lineDefinition|ratingDefinition|worksheetStep|worksheetSteps)\b` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/rater`, and guide mirrors, returns no hit.

**Writing sweep.** Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` over added prose lines in `guides/**`, `README.md`, source doc comments, and test titles/comments: no hit. Pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hit.

## Distillate

rater-obj-1: `README.md:20` aligned | diff present yes | old form hits 0 | report matches yes  
rater-obj-2: `tests/guides.test.ts:198-306` flagship fences present | diff present yes | old form hits 0 | report matches yes  
rater-obj-3: `tests/src/core/factories.test.ts:63-65` uses `captureError` | diff present yes | old form hits 0 | report matches yes  
rater-obj-4: `tests/setup.ts:155-202` uses `StubEngine` | diff present yes | old form hits 0 | report matches yes  
rater-subj-1: four `build*` helpers present | diff present yes | old form hits 0 semantic hits | report matches yes  
rater-subj-2: `guides/rater.md:223-228` passes joined groups | diff present yes | old form hits 0 | report matches yes  
rater-subj-3: `guides/README.md:3,45` has no `AGENTS §22` | diff present yes | old form hits 0 | report matches yes  
rater-subj-4: `guides/rater.md:113` names literals | diff present yes | old form hits 1 outside guide at `tests/src/core/validators.test.ts:35` | report matches yes  
rater-subj-5: `guides/rater.md:102-103` removes “two postures” | diff present yes | old form hits 0 | report matches yes  
rater-subj-6: `tests/guides.test.ts:2,58-60` uses non-positional wording | diff present yes | old form hits 0 | report matches yes  
rater-subj-7: `src/core/helpers.ts:82-83` uses fixed boolean wording | diff present yes | old form hits 0 | report matches yes  
rater-subj-8: `README.md:21` and test titles use “through” | diff present yes | old form hits 0 | report matches yes  
fleet-F1: helper absent and no browser environment | diff present no | old form hits 0 | report matches yes  
fleet-F2: no matching class shape | diff present no | old form hits 0 | report matches yes  

Scope: all status paths are owned; no shared or off-limits path appears.  
Residue: no prohibited residue; six `new` construction hits occur on added code lines.  
Writing hits: none.  
Parity: local public symbols are barrelled and guide Surface/Methods rows align; `StubEngine` matches the external interface member names and has no published guide row.

## Unknowns

- A fresh independent gate run was not performed; the gate readings come from the supplied evidence files.
- The supplied diff and status are the audit inputs; no additional current Git status was obtained after reading them.

## Journal

## Deviation

No file was created, changed, or deleted. The supplied evidence, tree files, rules, report, controls, diff, and status were readable. No required sweep was unreachable.