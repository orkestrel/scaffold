I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.The brief is a read-only distillate. Next I’ll load the unit brief, audit brief, report, evidence, and the cited law.Inputs are loaded. Next I’ll map each row against the tree, the diff, and the report, then run the named sweeps.I’ll sweep the tree and the evidence diff for each row’s current site and old names.## Question

For every row of unit conform-toolbox, what does the tree at `/home/user/fleet/toolbox` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences the rows cite (quote only):

- architecture.md:292: `Centralize any pattern repeated twice.`
- architecture.md:53: `Perform a cleanup sweep after implementation: no stray implementation-file declarations, non-exported/wrong-kind centralized declarations, prohibited nested declarations, duplicate implementations, compatibility aliases, superfluous wrappers, stale imports/barrel rows, or untested extracted functions.`
- architecture.md:266–269: `Barrel that class when a consumer can construct it from values they already hold. Intern it — out of the barrel, and named in the package's parity INTERNAL list — when its constructor requires a value only its owner produces, or when the public value is a projection of the instance rather than the instance.`
- architecture.md:298: `No deprecation aliases, compatibility shims, or backward-compatibility branches; update all consumers atomically.`
- names.md:98: `` `resolve*` picks the effective value from options and defaults. ``
- names.md:85: `Module helpers have no owning entity at the call site, so default to {verb}{Noun}`
- names.md:91–93: `A helper prefix has one project-wide meaning:` / `` `infer*` derives. ``
- names.md:215: `` `execute` | Run primary work to completion ``
- names.md:217: `Never introduce synonyms such as cancel, reset, or run for these meanings.`
- names.md:122: `A declared wire body — a type whose members transliterate an external wire format field for field — keeps the external field names, type and kind included, and its TSDoc names the format it transliterates.`
- tests.md:70–71: `Transcribe each flagship fence and assert the values its comments claim. Name resolution is not a behavioural proof, so a fence documenting a value the code contradicts passes every parity assertion.`
- tests.md:55: `tests/guides.test.ts | Every documented API exists, every public API is documented, and every executable fence returns what the guide says it returns`
- tests.md:174: `@orkestrel/test owns the helpers every workspace repeats: the call recorder, the real delay, the JSON and async collectors, and the owned scratch directory.`
- tests.md:181: `Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.`
- tests.md:185: `Test files import shared infrastructure rather than declaring local fixture factories.`
- tests.md:13–14: `Mirror module/application structure: tests/{src,app}/[environment]/[domain]/[module].test.ts.`
- tests.md:83–84: `A test the mirror rule flags is a misplaced test until its placement is checked. Move it to the location its scope names.`
- tests.md:305: `confirm each assertion would fail for the defect it claims to catch, and that it fails rather than passes when its population is empty;`
- tests.md:37: `Assert a runtime-chosen result as the property it must have, not as the number one run produced.`
- writing.md:41–42: `Write the present tense for what exists. Do not write currently, now, new, latest, or soon; where time matters, give the version or the date.`
- writing.md:11–13: `Write must for a requirement, can for an option or an ability, and might for a possibility.` / `Never write should`
- writing.md:90: `` `should` | `must`, `can`, `might`, or the imperative ``
- documentation.md:34: `A parity failure identifies drift; never suppress or weaken the test.`
- documentation.md:23: `` `AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides. ``
- typescript.md:87: `Do not document speculative future product behavior unless requested.`
- typescript.md:77: `Every public export has complete TSDoc: description, @param, @returns, and @example where applicable.`
- typescript.md:80–81: `Describe a boolean parameter as "If true, …; if false, …", and a boolean return as "True if …; false otherwise".`
- AGENTS.md:60: `One concept, one term. Do not alternate synonyms. Lifecycle verbs have fixed meanings.`
- AGENTS.md:65: `Named discriminants. Name the axis that varies (relationship, command, category), never kind or type.`
- AGENTS.md:72: `No compatibility shims. This is greenfield. Update every consumer in the same change.`
- AGENTS.md:172: `NEVER state a count.`
- AGENTS.md:173: `NEVER name a list item by its position. Write the item's name, never its ordinal or its number.`
- AGENTS.md:186: `State the finding as the rule. Never record how it was found, which session found it, what was tried first, or what a probe proved.`

### toolbox-obj-1

1. **Site now.** Brief `shapers.ts:599` (duplicate of `:411`) — `relationKeyShape` is gone. Surviving `keyShape` is `src/core/shapers.ts:409–416` (brief `:410`/`:411`). Context: `:408` tableSpec close; `:409` TSDoc “for the database tool and the relation tool”; `:410` `export const keyShape`; `:417` blank. `'load'` arm `key: keyShape` is `:635` (brief `:645`). Guide Surface `keyShape` is `guides/toolbox.md:129`; no `relationKeyShape` row.
2. **Diff at the site.** `src/core/shapers.ts` `@@ -407,7 +406,7 @@` `+/** Describes one key value for the database tool and the relation tool — …`; `@@ -595,15 +594,6 @@` deletes `relationKeyShape` (no `+` body); `@@ -642,7 +632,7 @@` `+		key: keyShape,`. Guide `@@ -88,56 +87,56 @@` `+| `keyShape`             | const | One row key value for the database and relation tools — …` and drops the `relationKeyShape` row. Repair text present verbatim on those `+` lines.
3. **Old form sweep.** Pattern `\brelationKeyShape\b` and case-insensitive `relationKeyShape(s|ed|ing)?` over `src`, `tests`, `guides/toolbox.md`, `guides/README.md`, `README.md`: no hit.
4. **Report reading.** Disposition `applied`. Sentence: “`relationKeyShape` and its TSDoc deleted from `src/core/shapers.ts`; the `'load'` arm reads `key: keyShape`; the `keyShape` TSDoc names the database tool and the relation tool; the guide's `relationKeyShape` Surface row deleted and the `keyShape` row reworded.” Tree carries that at `shapers.ts:409–416`, `:635`, `guides/toolbox.md:129`. Sweep empty matches.
5. **Proof reading.** Placement/naming. Report sweep `\brelationKeyShape\b` empty. Field 3 agrees (no hit).

### toolbox-obj-2

1. **Site now.** Brief `factories.ts:1370` is now `:1371` `const effective = resolveLimit(call.limit, cap)` (`:1370` include; `:1372` `model.find`). `'links'` `:1391` `const effective = resolveLimit(undefined, cap)` (brief `:1391–1392`). `helpers.ts` brief `:464` clamp is now `:490` `const limit = resolveLimit(query?.limit, cap)`; leaf `:459–461` `export function resolveLimit`. Guide Surface `:96`.
2. **Diff at the site.** `src/core/helpers.ts` `@@ -434,14 +434,40 @@` first `+` is the `resolveLimit` TSDoc; `+export function resolveLimit(requested: number | undefined, cap: number): number {` and `+	return Math.max(0, Math.min(requested ?? cap, cap))`; `@@ -461,6 +487,6 @@` `+	const limit = resolveLimit(query?.limit, cap)`. `src/core/factories.ts` `@@ -1367,7 +1368,7 @@` `+						const effective = resolveLimit(call.limit, cap)`; `@@ -1387,15 +1388,16 @@` `+						const effective = resolveLimit(undefined, cap)`. Verbatim repair body present.
3. **Old form sweep.** `\bMath\.min\(call\.limit \?\? cap, cap\)\b` and `mirroring clampQuery's idiom`: no hit. No renamed symbol besides the inline form.
4. **Report reading.** `applied`. “`resolveLimit` added to `src/core/helpers.ts` with a full TSDoc block carrying an `@example`; `clampQuery` and both relation-tool arms route through it.” Matches `:448–461`, `:490`, `:1371`, `:1391`. Guide row `:96` present (refuter: Surface row, no fence).
5. **Proof reading.** Behavioural. Report: `npm --prefix /home/user/fleet/toolbox run test:src:core` red `5 failed | 414 passed (419)`, `TypeError: resolveLimit is not a function` (`toolbox-obj-2-red.txt`); green `419 passed (419)` (`toolbox-obj-2-green.txt`). Files exist. `toolbox-obj-2-red.txt:13` `TypeError: resolveLimit is not a function`; `:74` `Tests  5 failed | 414 passed (419)`. `toolbox-obj-2-green.txt:11` `Tests  419 passed (419)`.

### toolbox-obj-3

1. **Site now.** Brief whole file `tests/guides.test.ts:1–175`. File still opens at `:1` with the drop-in header. `INTERNAL` `:58–61` includes `'class TerminalBridge'`. `describe('flagship fences')` `:198–253` (appended after the drop-in). Existing parity loop still present above `:193`.
2. **Diff at the site.** `tests/guides.test.ts` `@@ -173,3 +191,63 @@` first `+` `+// Change a fence, change the transcription beside it.`; `+describe('flagship fences', () => {` then `expect(tagWorkflow('release')).toBe('workflow:release')`, `deriveWorkflowDepth`, `isAgentFunction`, `completeTaskDraft`, `expandInclude`, `clampQuery` `limit === 100` / `query.limit === 101`, endpoint fence `expect(result.value).toEqual({ id: '1', name: 'Ada' })`. Operative repair text present. Also includes finder's `createWorkflowDraftContract().parse(...)`.
3. **Old form sweep.** Row adds; no name removed. no hit.
4. **Report reading.** `applied`. “`describe('flagship fences')` added … transcribing the ancestry-tag, draft-completion, `expandInclude`, `clampQuery`, and endpoint-bridge fences.” Matches `:198–252`.
5. **Proof reading.** Behavioural. Report: `npm run test:guides` red `1 failed | 27 passed (28)` (`toolbox-obj-3-red.txt`); green `28 passed (28)` (`toolbox-obj-3-green.txt`). Files exist. `toolbox-obj-3-red.txt:33` `Tests  1 failed | 27 passed (28)`; green `:11` `Tests  28 passed (28)`.

### toolbox-obj-4

1. **Site now.** Brief `factories.test.ts:203–210` `thrownOf` — gone. Import `:59` `import { captureError, createRecorder, waitForAbort, waitForDelay } from '@orkestrel/test'`. Call sites e.g. `:259` `captureError(`. `rejectionOf` remains above the deleted helper (diff kept it).
2. **Diff at the site.** `tests/src/core/factories.test.ts` `@@ -200,15 +197,6 @@` deletes `thrownOf` (no `+`); `@@ -60,9 +56,10 @@` adds `captureError` to the `@orkestrel/test` import; `@@ -268,7 +256,7 @@` `+		const error = captureError(() => createToolFunction(tools, WORKFLOW_TOOL_NAME))`. Repair present.
3. **Old form sweep.** `\bthrownOf\b` and inflections: no hit.
4. **Report reading.** `applied`. “`thrownOf` deleted … `captureError` added … all 8 call sites now read `captureError(`. `rejectionOf` kept local …” Tree: import `:59`; `thrownOf` absent; `rejectionOf` still in file (diff context around `:1807`).
5. **Proof reading.** Behavioural. Report red: `npx vitest run … factories.test.ts` `4 failed`, `ReferenceError: captureError is not defined` (`toolbox-obj-4-red.txt`). Green: “exit 0 in the full gate, `456 passed (456)` (`gate-test-final.txt`)”. `toolbox-obj-4-red.txt:8` `ReferenceError: captureError is not defined`; `:58` `Tests  4 failed | 196 passed (200)`. No `toolbox-obj-4-green.txt`. `gate-test-final.txt:15` `Tests  456 passed (456)`.

### toolbox-obj-5

1. **Site now.** Brief `factories.test.ts:1476–1497` `createFakeTimer` — gone. `TestTimerInterface` / `createTestTimer` now `tests/setup.ts:296–309` (moved from `setupServer.ts:3–37`; `setupServer.ts` now starts with `readAvailable` `:7`). Core factories bindings `:1518` / `:2021` `const timer = createTestTimer()`. `tests/src/server/terminals/TerminalBridge.test.ts:7` `import { createTestTimer } from '../../../setup.js'`; `:8` `readAvailable` from setupServer. Same for `TerminalConnection.test.ts:6`. Proofs in `tests/setup.test.ts:185–200`.
2. **Diff at the site.** `tests/src/core/factories.test.ts` `@@ -1473,33 +1463,6 @@` deletes `createFakeTimer`; `@@ -1552,14 +1515,14 @@` `+		const timer = createTestTimer()`. `tests/setup.ts` `@@ -291,3 +292,39 @@` adds the fixture. `tests/setupServer.ts` `@@ -1,41 +1,3 @@` removes it. `tests/setup.test.ts` `@@ -180,4 +181,29 @@` `+	it('createTestTimer arms deadlines without a real host timer…'`. `tests/src/server/terminals/TerminalConnection.test.ts` `@@ -3,7 +3,8 @@` `+import { createTestTimer } from '../../../setup.js'`.
3. **Old form sweep.** `\bcreateFakeTimer\b`: no hit. Remaining `fake` bindings (not the deleted helper name): `tests/src/server/terminals/TerminalBridge.test.ts:68,:225,:289,:384` `const fake = createTestTimer()`.
4. **Report reading.** `applied`. Move, delete, `fake` → `timer` on the two core factories sites, re-pointed server imports, proofs moved. Core sites match. Report does not mention leftover `fake` in `TerminalBridge.test.ts`.
5. **Proof reading.** Behavioural. Report: `npm --prefix … run test:setup` red `1 failed | 16 passed (17)` (`toolbox-obj-5-red.txt`); green `17 passed (17)` (`toolbox-obj-5-green.txt`). Files exist. red `:33` `Tests  1 failed | 16 passed (17)`; green `:11` `Tests  17 passed (17)`.

### toolbox-obj-6

1. **Site now.** Brief: no `tests/src/core/validators.test.ts`. File exists (`tests/src/core/validators.test.ts:1–165`). Guards: `isWorkflowLineage` describe `:18`; `isAgentFunction` `:37`; `isColumnPrimitive` `:58`; `isColumnSpec` `:76`; `isDatabaseDefinition` `:101`. `helpers.test.ts` `describe('workflow lineage helpers')` `:61` is construction-only (`normalizeLineage` / `extendLineage`); no `isColumnKind`/`isColumnSpec`/`isDatabaseDefinition` there. Guide Tests bullet `:949`.
2. **Diff at the site.** `tests/src/core/validators.test.ts` `@@ -0,0 +1,165 @@` first `+import {`. `tests/src/core/helpers.test.ts` `@@ -66,23 +59,6 @@` and `@@ -124,32 +100,13 @@` remove guard cases; `@@ -338,136 +295,52 @@` drops the column/definition describes.
3. **Old form sweep.** Validator describes in `helpers.test.ts`: no hit for `isColumnKind`/`isColumnSpec`/`isDatabaseDefinition`/`isWorkflowLineage`/`isAgentFunction` in that file. New names live in `validators.test.ts`.
4. **Report reading.** `applied`. “`tests/src/core/validators.test.ts` created with the `isWorkflowLineage`, `isAgentFunction`, `isColumnPrimitive`, `isColumnSpec`, and `isDatabaseDefinition` describes; … mixed `workflow lineage helpers` block … split …” Matches `:18–101` and `helpers.test.ts:61`.
5. **Proof reading.** Behavioural. Report: validators file red `3 failed | 10 passed (13)` under planted `isColumnKind` (`toolbox-obj-6-red.txt`); green `419 passed (419)` (`toolbox-obj-6-green.txt`). Files exist. red `:67` `Tests  3 failed | 10 passed (13)`; green `:11` `Tests  419 passed (419)`. Plant name `isColumnKind` is the pre-subj-7 identifier.

### toolbox-obj-7

1. **Site now.** Brief: no `TerminalBridge.test.ts`. File exists `tests/src/server/terminals/TerminalBridge.test.ts:1` (header `:11`); `findRoute` `:17`; `describe('TerminalBridge — …')` `:30`. `tests/src/server/factories.test.ts:9–16` only the two-route case. Status `RM tests/src/server/factories.test.ts -> tests/src/server/terminals/TerminalBridge.test.ts` plus `A tests/src/server/factories.test.ts`.
2. **Diff at the site.** `tests/src/server/terminals/TerminalBridge.test.ts` `@@ -0,0 +1,872 @@` first `+import type { TerminalRoute } from '@src/server'`. `tests/src/server/factories.test.ts` `@@ -1,29 +1,10 @@` then `@@ -33,846 +14,4 @@` leaves the two-route case.
3. **Old form sweep.** Row is a move. Bridge cases no longer in `tests/src/server/factories.test.ts` (file is 17 lines). no hit of the old whole-file subject there.
4. **Report reading.** `applied`. git mv, new factories file “only the two-route case”, guide bullet. Matches `factories.test.ts:9–16`, `guides/toolbox.md:956`, status `RM`/`A`.
5. **Proof reading.** Behavioural. Report: `npm --prefix … run test:src:server` red `3 failed | 34 passed (37)` in `TerminalBridge.test.ts` (`toolbox-obj-7-red.txt`); green `37 passed (37)` (`toolbox-obj-7-green.txt`). Files exist. red `:71` `Tests  3 failed | 34 passed (37)`; green `:11` `Tests  37 passed (37)`.

### toolbox-obj-8

1. **Site now.** Brief `factories.test.ts:3935–3950`. Now `:3897–3913` `it('many executes with identical args return identical results'` collects results, `expect(first).toEqual(args)`, loop `expect(result).toEqual(first)`. No `performance.now`, no `toBeLessThan(1000)`, no `(v8)`.
2. **Diff at the site.** `@@ -3932,20 +3894,21 @@` `+	it('many executes with identical args return identical results', async () => {` `+		const results: unknown[] = []` deletes `elapsed` / `toBeLessThan(1000)`. Repair present. No `bench()` `+` lines.
3. **Old form sweep.** `(v8)`, `toBeLessThan(1000)`, `stay fast and behave identically`: no hit.
4. **Report reading.** `applied`. Timing gone; deep-equal; renamed; no `bench()`. Matches `:3897–3913`.
5. **Proof reading.** Behavioural. Report red: factories.test.ts `-t "many executes…"` `1 failed | 199 skipped (200)` (`toolbox-obj-8-red.txt`); green via `gate-test-final.txt` `456 passed`. red `:32` `Tests  1 failed | 199 skipped (200)`. No `toolbox-obj-8-green.txt`.

### toolbox-subj-1

1. **Site now.** Brief `src/server/index.ts:4` barrel row — gone. File is three lines `:1–3` (`types`, `constants`, `factories`). Class remains `src/server/terminals/TerminalBridge.ts:20–27` with intern sentence `:24–25`. Options `src/server/types.ts:67` `export interface TerminalRoutesOptions`. Guide Lifecycle `:47–52` names `DatabaseResolver` alone; no `#### TerminalBridge` under Methods (`:241–261` only `DefinitionStoreInterface` and `DatabaseResolver`). Surface `:232` `TerminalRoutesOptions`. `tests/guides.test.ts:59` `'class TerminalBridge'`.
2. **Diff at the site.** `src/server/index.ts` `@@ -1,4 +1,3 @@` `-export * from './terminals/TerminalBridge.js'`. `TerminalBridge.ts` `@@ -21,12 +21,8 @@` `+ * Not exported from the `@orkestrel/toolbox/server` barrel — reach this behaviour through` `+ * `createTerminalRoutes`.`. `src/server/types.ts` `@@ -64,7 +64,7 @@` `+export interface TerminalRoutesOptions {`. `tests/guides.test.ts` `@@ -40,7 +55,10 @@` adds `'class TerminalBridge'`. Guide hunks delete Lifecycle row, Methods table, fence.
3. **Old form sweep.** `\bTerminalBridgeOptions\b`: no hit. `\bTerminalBridge\b` remains as interned class/test/guide Tests bullet (`TerminalBridge.ts:27`, `factories.ts:3,:31`, `guides.test.ts:59`, `TerminalBridge.test.ts:11,:30`, `guides/toolbox.md:956`).
4. **Report reading.** `applied`. Barrel deleted, INTERNAL, intern TSDoc, rename, guide deletions. Matches `index.ts:1–3`, `TerminalBridge.ts:24–25`, `types.ts:67`, `guides.test.ts:59`, `guides/toolbox.md:47–52,:232`.
5. **Proof reading.** Naming. Report “Sweep below” (old names list includes `TerminalBridgeOptions`). Field 3: `TerminalBridgeOptions` empty; `TerminalBridge` identifier remains by design.

### toolbox-subj-2

1. **Site now.** Brief `helpers.ts:265` / `:278`. Now `:265` `export function inferDatabaseCode` (context `:257–259` still `{@link inferTerminalCode}`; `:264` blank). `:278` `export function inferRelationCode`. Guide Surface was `:91–92`; now `inferDatabaseCode` / `inferRelationCode` in the Helpers table (diff `+| `inferDatabaseCode``). `helpers.test.ts:298` describe title uses the new names.
2. **Diff at the site.** `src/core/helpers.ts` `@@ -262,7 +262,7 @@` `+export function inferDatabaseCode…`; `@@ -275,7 +275,7 @@` `+export function inferRelationCode…`. factories import/call hunks `+				const relation = inferRelationCode(error)` / `+				const database = inferDatabaseCode(error)`. Guide `+| `inferDatabaseCode`` / `+| `inferRelationCode``.
3. **Old form sweep.** `\bdatabaseToolCode\b|\brelationToolCode\b` and inflections: no hit.
4. **Report reading.** `applied`. Rename at declarations, factories, guide, tests. Matches `:265,:278`, factories `:1398` region / `:1411` region, `helpers.test.ts:20,:24,:298`.
5. **Proof reading.** Naming. Report old-name sweep includes `databaseToolCode|relationToolCode`: empty. Field 3 agrees.

### toolbox-subj-3

1. **Site now.** Brief `guides/toolbox.md:5`. `:5` now `to `@orkestrel/workflow`, whose runner owns` (no `0.0.8`). Invariants: workflow-runner wording around `:292`; agent around `:302`; invariant 23 `:332` names `schemaToShape` without a version numeral (`grep 0.0.` over `guides/toolbox.md`: no hit).
2. **Diff at the site.** `guides/toolbox.md` `@@ -2,7 +2,7 @@` `+`… to `@orkestrel/workflow`, whose runner owns…``. Later invariant hunks `@@ -305,17 +289,17 @@` and `@@ -345,9 +329,9 @@`.
3. **Old form sweep.** `0.0.8`, `0.0.4`, `PRE-0.0.7`, `@orkestrel/workflow` 0.0.8 in `src`, `tests`, `guides/toolbox.md`, `guides/README.md`, `README.md`: no hit.
4. **Report reading.** `applied`. Version numeral gone from `:5` and invariants 4/6/8/23. `:5` matches. Invariant numbers in the guide have shifted (23 is now `:332`).
5. **Proof reading.** Documentation. Report sweep of version numerals: field 3 agrees (no hit in owned paths).

### toolbox-subj-4

1. **Site now.** Brief `tests/setup.ts:38`. Now `:39` `ones (AGENTS' no-mocks rule — one shared data builder…)` (`:38` still “ones”). `:163` / `:204` same phrase. `shapers.test.ts:19` `AGENTS' narrow-untrusted-input-with-guards rule`; titles `:25,:69,:133,:266` `the export-and-test-reusable-logic law in AGENTS` (not the possessive form). Store tests `:21` / `:9` `AGENTS' Stores rule`. `helpers.test.ts:43` `AGENTS' no-mocks rule`. `TerminalBridge.test.ts:14` same. `validators.test.ts:14` same.
2. **Diff at the site.** `tests/setup.ts` `@@ -35,7 +36,7 @@` `+ * ones (AGENTS' no-mocks rule — …`. `tests/src/core/shapers.test.ts` `@@ -16,13 +16,13 @@` `+// (AGENTS' narrow-untrusted-input-with-guards rule);`. Title hunks replace `AGENTS §5`.
3. **Old form sweep.** `AGENTS §` over `src`, `tests`, `guides/toolbox.md`, `guides/README.md`, `README.md`: no hit. (Hits remain in vendored `guides/workflow.md` etc., outside the named paths.)
4. **Report reading.** `applied`. Replacements listed; ancillary that four `it()` titles use `the export-and-test-reusable-logic law in AGENTS`. Tree matches those titles at `shapers.test.ts:25,:69,:133,:266`.
5. **Proof reading.** Documentation. Report `AGENTS §`: empty. Field 3 agrees on owned paths.

### toolbox-subj-5

1. **Site now.** Brief `constants.ts:317`. `:317–319` `Holds the name {@link import('./factories.js').createDatabaseTool} advertises by default — the key` / `a model calls…`. No `@remarks` SRC-1 block (export `:320`). `:322–325` summary names `createDatabaseTool`. `:331` description same. `:226–227` `AGENT_TOOL_SUMMARY` / `WORKFLOW_TOOL_SUMMARY` / `WORKSPACE_TOOL_SUMMARY` (no `Net-new:`). Section comments: `factories.ts:995` `// === Database definition stores`; `:1041` `// === Database tool`; `:1291` `// === Relation tool`; `helpers.ts:408` `// === Database-tool operation leaves`; `shapers.ts:383` `// === Database tool shape`; `:589` `// === Relation tool shape (createRelationTool call args)` with body kept `:591–595`. `factories.ts:998–1000` DEFAULT-store sentence.
2. **Diff at the site.** `src/core/constants.ts` `@@ -314,27 +314,23 @@` present-tense rewrite; `@@ -223,8 +223,8 @@` drops `Net-new:`. factories/helpers/shapers section-comment hunks.
3. **Old form sweep.** `upcoming`, `SRC-1`, `SRC-2`, `SRC-3`, `Net-new` over `src`/`tests`/`guides/toolbox.md`: no hit.
4. **Report reading.** `applied`. Present tense, remarks deleted, named constants, section comments. Matches the sites above. Report `factories.ts:998` is the doc-block start; the DEFAULT-store clause is `:999–1000`.
5. **Proof reading.** Documentation. Report sweep of campaign labels: field 3 agrees.

### toolbox-subj-6

1. **Site now.** Brief `types.ts:677` `invoke`. Now `src/core/types.ts:679` `readonly execute: EndpointHandler` (`:675` `export interface EndpointDefinition`; `:678` `samples`; `:680` `}`). Handler doc `:644–647` `EndpointDefinition.execute` / `execute: (args) => definition.execute(args)`. Guide Surface `:217` `{ name, description, samples, execute }`. Fence uses `execute:` (`guides.test.ts:239` transcription).
2. **Diff at the site.** `src/core/types.ts` `@@ -658,23 +660,23 @@` `+	readonly execute: EndpointHandler`. factories call-site hunks `definition.execute`. Guide `:217`/`:218` and fence.
3. **Old form sweep.** `\binvoke\b` in `src`: `src/core/shapers.ts:126` `The registered behavior name to invoke`; `src/core/types.ts:138` `workflow function names that invoke them`. `tests`: no hit. `guides/toolbox.md`: no hit. `invoke:` / `\.invoke\(`: no hit. Inflection `invokes`/`invoked`/`invoking`: `TerminalBridge.test.ts:12` `invoked DIRECTLY` (header).
4. **Report reading.** `applied`. Member renamed; tests/guide updated. Matches `:679`, `:217`. Report notes leftover prose `invoke`; tree still has `shapers.ts:126`, `types.ts:138`.
5. **Proof reading.** Naming. Report `symbol\.kind|\.invoke\(|invoke:` empty. Field 3 agrees for those patterns; `\binvoke\b` still hits the two prose lines the report named.

### toolbox-subj-7

1. **Site now.** Brief `types.ts:461` `type` / `:455` `ColumnKind`. Now `:455` `export type ColumnPrimitive`; `:461–463` `ColumnSpec` with `primitive: ColumnPrimitive`. `validators.ts:63` `isColumnSpec`; `:67` `isColumnPrimitive(value.primitive)`; `:78` `isColumnPrimitive`. `compilers.ts:46` `spec.primitive`; `:59` `compileColumnPrimitive`. `shapers.ts:386` `columnPrimitiveShape`. Guide Guards `:69–70`, Types `:205–206`.
2. **Diff at the site.** `src/core/types.ts` `@@ -451,14 +451,16 @@` `+export type ColumnPrimitive` / `+	| Readonly<{ primitive: ColumnPrimitive; optional?: boolean }>`. validators/compilers/shapers/constants/tests hunks rename dependents.
3. **Old form sweep.** `ColumnKind|isColumnKind|compileColumnKind|columnKindShape` over named paths: no hit. Case-insensitive inflections: no hit.
4. **Report reading.** `applied`. Full rename including model-facing JSON `"primitive"`. Matches `constants.ts:345` `"primitive": "string"`, validators test `:58,:76`.
5. **Proof reading.** Naming. Report old-name sweep includes those symbols: empty. Field 3 agrees.

### toolbox-subj-8

1. **Site now.** Brief `guides/toolbox.md:29`. `:29` `Build the `operation`-discriminated `ToolInterface` (create/tables/get/records/count/aggregate/add/set/update/remove/destroy)` — no `11-arm`. `:24` `Build the workspace-editing` — no `13-operation`. Shape rows `:121` region (diff) now “The `operation`-discriminated union”. Invariant 16 `:318` `bounded to the primitives 'string' / 'integer' / 'number' / 'boolean'`. `factories.ts` union tally gone. `constants.ts:226–227` names the three summaries. Leftover test titles: `tests/src/core/shapers.test.ts:263` `describe('workspaceToolShape — the 13-op discriminated union'`; `:382` `describe('databaseToolShape — the 11-op discriminated union'`.
2. **Diff at the site.** Guide `@@ -18,20 +18,20 @@` and shape-table hunk delete numerals. `src/core/factories.ts` `@@ -510,7 +511,7 @@` `the operation-discriminated union`. `constants.ts` `@@ -223,8 +223,8 @@` named constants.
3. **Old form sweep.** `13-operation|11-arm|13-arm|5-arm|13-op|11-op|all 11|11 operations|four primitive` over named paths: hits `tests/src/core/shapers.test.ts:263` (`13-op`), `:382` (`11-op`). Guide/src: no hit.
4. **Report reading.** `applied`. “Every named tally deleted…” and “Three further sites … recorded under § Sweeps.” Report numeral sweep claimed empty for `\b[0-9]+ (…|operations|arms|…)\b`. Hyphenated `13-op` / `11-op` in test titles are outside that pattern and still in the tree.
5. **Proof reading.** Documentation. Report count-numeral sweep empty vs field 3: two leftover describe titles. Does not agree on those titles.

### toolbox-subj-9

1. **Site now.** Brief `guides/toolbox.md:348`. Invariant 23 is now `:332` and contains `so treat sample data intended for schema inference as untrusted content whenever the resulting schema will be advertised to other agents.` Brief test `factories.test.ts:873` moved: `tests/src/server/terminals/TerminalBridge.test.ts:867` `this abort is a no-op` (`:866` lead-in `Because`; `:868` `throw`).
2. **Diff at the site.** Guide invariant hunk; TerminalBridge.test.ts comment `+		// … this abort is a no-op`.
3. **Old form sweep.** `\bshould\b` case-insensitive over named paths: `tests/src/server/terminals/TerminalBridge.test.ts:387,:390,:418` identifier `shouldThrow` only. `guides/toolbox.md`: no hit.
4. **Report reading.** `applied`. Imperative clause; comment `this abort is a no-op` at reported `:866`. Tree comment is `:867`. `shouldThrow` sites match report `:387,:390,:418`.
5. **Proof reading.** Documentation. Report should sweep: three `shouldThrow` hits. Field 3 agrees. Guide `should` gone: agrees.

### toolbox-subj-11

1. **Site now.** Brief `types.ts:704`. Now `:706–709` `validate: false` when the endpoint's own handler validates… `execute` then passes … unchanged, unchecked and unstripped.` Section comment `:619–630` names `schemaToShape` without dating. `factories.ts:1561` `the raw-passthrough opt-out`. Guide `:332` `disables that enforcement:` (no PRE-0.0.7 / escape hatch). Option and branch kept (`EndpointToolOptions.validate` `:714`).
2. **Diff at the site.** `src/core/types.ts` `@@ -686,23 +688,25 @@` replacement sentence on `+` lines. factories framing hunk. Guide invariant 23 hunk.
3. **Old form sweep.** `PRE-0.0.7|pre-0.0.7|escape hatch`: no hit in named paths.
4. **Report reading.** `applied`. Mechanism stated; compatibility framing deleted; option kept. Matches `:706–709`, `:1561`, `:332`.
5. **Proof reading.** Documentation. Report sweep of compatibility framing: field 3 agrees.

### toolbox-subj-12

1. **Site now.** Brief `validators.ts:57`. Now `:57–61` description plus `@param value` `:60` and `@returns True if … ColumnPrimitive … { primitive, optional } …; false otherwise` `:61`. `isColumnPrimitive` `:72–76` `@param`/`@returns True if … 'boolean'; false otherwise`. `isDatabaseDefinition` `:82–90` `@param` `:89` `@returns True if value is a complete {@link DatabaseDefinition}; false otherwise`. `compilers.ts:38–43` `compileColumn` `@param spec` / `@returns … optionalShape`; `:52–57` `compileColumnPrimitive` `@param primitive` / `@returns The matching primitive…`.
2. **Diff at the site.** `src/core/validators.ts` `@@ -54,18 +54,28 @@` and `@@ -75,6 +85,9 @@`. `src/core/compilers.ts` `@@ -35,18 +35,30 @@` adds `@param`/`@returns` using renamed identifiers.
3. **Old form sweep.** Row expands docs; no name removed. no hit.
4. **Report reading.** `applied`. Complete TSDoc using renamed identifiers. Matches `:60–61,:75–76,:89–90` and `compilers.ts:42–43,:56–57`.
5. **Proof reading.** Documentation. No old-name sweep required. TSDoc present as claimed.

### fleet-F1

1. **Site now.** Where: `tests/setup.ts` `isBrowserVuePath`. Helper absent. `tests/setup.ts:1–22` host-independent imports; exports include `createTestDatabase` `:28`, `createTestDefinition` `:44`, `createTestTimer` `:309`, stores/providers — not export-free. No `src/browser`, no `app/`, no `tests/setupBrowser.ts`.
2. **Diff at the site.** No hunk adds/deletes `isBrowserVuePath`.
3. **Old form sweep.** `isBrowserVuePath`: no hit.
4. **Report reading.** `noop`. “helper does not exist … no browser environment … `tests/setup.ts` keeps its other exports”. Matches.
5. **Proof reading.** Report `grep -rn "isBrowserVuePath" src tests vite.config.ts` exits 1. Field 3 agrees (no hit).

### fleet-F2

1. **Site now.** Classes: `DatabaseResolver.ts:18–22` opens `#handles`, `#drivers`, `#generator`, `#store` (no public `readonly id`). `MemoryDefinitionStore.ts:40` `#definitions`. `DatabaseDefinitionStore` uses `#` fields. `TerminalBridge.ts:28–36` all `#`. `TerminalConnection.ts:18+` `#`. `errors.ts` `ToolboxError` `readonly code`, no `#id`.
2. **Diff at the site.** No class-order `id` hunks.
3. **Old form sweep.** Not a rename. Public `readonly id: string` data field ahead of `#` on those classes: not present.
4. **Report reading.** `noop`. Classes listed; all open with `#` except `ToolboxError` `readonly code`. Matches the files read.
5. **Proof reading.** Report: no `JSON.stringify` question. No class of the named shape.

### Scope

Status paths (`/home/user/work/evidence/conform-toolbox.status`), tagged against brief § Scope:

| Path | Tag |
| --- | --- |
| `guides/toolbox.md` | owned |
| `src/core/compilers.ts` | owned |
| `src/core/constants.ts` | owned |
| `src/core/factories.ts` | owned |
| `src/core/helpers.ts` | owned |
| `src/core/shapers.ts` | owned |
| `src/core/types.ts` | owned |
| `src/core/validators.ts` | owned |
| `src/server/factories.ts` | owned |
| `src/server/index.ts` | owned |
| `src/server/terminals/TerminalBridge.ts` | owned |
| `src/server/types.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/setupServer.test.ts` | owned |
| `tests/setupServer.ts` | owned |
| `tests/src/core/compilers.test.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/shapers.test.ts` | owned |
| `tests/src/core/stores/DatabaseDefinitionStore.test.ts` | owned |
| `tests/src/core/stores/MemoryDefinitionStore.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |
| `tests/src/server/factories.test.ts` | owned |
| `RM tests/src/server/factories.test.ts -> tests/src/server/terminals/TerminalBridge.test.ts` | owned |
| `tests/src/server/terminals/TerminalConnection.test.ts` | owned |

No status path is shared or off-limits. `guides/README.md`, `README.md`, `package.json`, `vite.config.ts`, `tsconfig.json` are not in the status file.

Diff hunks whose file no row **Where** names (`file @@ hunk` + first `+` line):

- `src/core/compilers.ts @@ -1,6 +1,6 @@` `+import type { ColumnPrimitive, ColumnSpec, TableSpec } from './types.js'`
- `src/core/compilers.ts @@ -12,7 +12,7 @@` `+// walk over the spec, and the `compileColumn` / `compileColumnPrimitive` leaves it maps with.`
- `src/core/compilers.ts @@ -35,18 +35,30 @@` (TSDoc/`compileColumnPrimitive` body; first `+` is the expanded `@param`/`@returns` block)
- `src/server/factories.ts @@ -1,5 +1,5 @@` `+import type { TerminalRoute, TerminalRoutesOptions } from './types.js'`
- `src/server/factories.ts @@ -26,7 +26,7 @@` (options type on `createTerminalRoutes`)
- `src/server/types.ts @@ -31,7 +31,7 @@` `+ * Represents the `token` gate {@link TerminalRoutesOptions} may configure — …`
- `src/server/types.ts @@ -39,8 +39,8 @@` `+ * Represents the options {@link import('./factories.js').createTerminalRoutes} takes — …`
- `src/server/types.ts @@ -64,7 +64,7 @@` `+export interface TerminalRoutesOptions {`
- `tests/setup.test.ts @@ -4,6 +4,7 @@` `+	createTestTimer,`
- `tests/setup.test.ts @@ -35,7 +36,7 @@` / `@@ -54,7 +55,7 @@` (fixture `primitive`)
- `tests/setup.test.ts @@ -180,4 +181,29 @@` `+	it('createTestTimer arms deadlines without a real host timer and fires only the requested index', () => {`
- `tests/setupServer.test.ts @@ -1,32 +1,7 @@` `+import { readAvailable } from './setupServer.js'`
- `tests/src/core/compilers.test.ts @@ -1,4 +1,4 @@` `+import { compileColumn, compileColumnPrimitive, expandTables } from '@src/core'`
- `tests/src/core/helpers.test.ts @@ -1,8 +1,8 @@` `+	LifecycleStatus,`
- `tests/src/core/helpers.test.ts` further hunks `@@ -13,26 +13,20 @@`, `@@ -44,10 +38,9 @@`, `@@ -66,23 +59,6 @@`, `@@ -124,32 +100,13 @@`, `@@ -338,136 +295,52 @@`
- `tests/src/core/shapers.test.ts @@ -16,13 +16,13 @@` `+// (AGENTS' narrow-untrusted-input-with-guards rule); these tests pin the guard accept/reject`
- `tests/src/core/stores/DatabaseDefinitionStore.test.ts @@ -18,7 +18,7 @@` (AGENTS' Stores rule)
- `tests/src/core/stores/MemoryDefinitionStore.test.ts @@ -6,7 +6,7 @@` `+// runs (AGENTS' Stores rule — point-access, own-id set, no-op delete-of-absent), asserted here`
- `tests/src/server/factories.test.ts @@ -1,29 +1,10 @@` ` import { createTerminalManager }` (first `+` after deletions is the trimmed import set / header)
- `tests/src/server/factories.test.ts @@ -33,846 +14,4 @@` (truncation to two-route case)
- `tests/src/server/terminals/TerminalConnection.test.ts @@ -3,7 +3,8 @@` `+import { createTestTimer } from '../../../setup.js'`

### Residue

Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` (`/home/user/work/evidence/conform-toolbox.diff`):

- `:219` `TaskDraft` … `retries?, timeout?`
- `:246` `DatabaseToolOptions` … `timeout?`
- `:433` factories Tests bullet … `timeout validation`
- `:1929` `manager.add('reviewer', { timeout: 10, timer: timer.timer })`
- `:1950` `manager.add('t9', { timeout: 10, timer: timer.timer })`
- `:3805` `manager.add('assistant', { timeout: 5, timer: fake.timer })`
- `:3833` `// own timeout timer at index 0…`
- `:3838` `// Expire: fire the FIRST parked prompt's own timeout timer…`
- `:4371` `manager.add('assistant', { timeout: 5, timer: churn.timer })`

No `+` hit for `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, `debugger`.

Tree `src` and `tests` excluding vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

- `src/core/errors.ts:33` `console.log(error.code)`
- `src/core/errors.ts:66` `console.log(error.code)`
- `timeout`/`retry` as domain fields: `tests/src/core/factories.test.ts:1520,:2024,:2610,:2613,:2616,:2621,:2625,:2626`; `tests/src/core/shapers.test.ts:220–223`; `tests/src/server/terminals/TerminalBridge.test.ts:70,:98,:103,:636`; `tests/setupServer.ts:12,:16`; `tests/src/core/helpers.test.ts:182,:191,:201,:205,:210`

No `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `debugger` in that population.

### Parity

Entities the diff touches in `src/**/types.ts` or a class file:

**`DefinitionStoreInterface`** (`src/core/types.ts:505–509`) call-signatures: `get` `:506`, `set` `:507`, `delete` `:508`. Guide Methods `guides/toolbox.md:249–251` `get`/`set`/`delete`. Readonly data: none. Surface `:210` `{ get, set, delete }`.

**`EndpointDefinition`** (`src/core/types.ts:675–680`) function-typed member `execute` `:679` (not a method table). No `#### EndpointDefinition` Methods table. Readonly data: `name` `:676`, `description` `:677`, `samples` `:678`. Surface `:217` `{ name, description, samples, execute }`.

**`EndpointToolOptions`** (`:711–715`) data `format?` `:712`, `enum?` `:713`, `validate?` `:714`. Surface `:218`. No Methods table.

**`ColumnSpec` / `ColumnPrimitive`** (`:455,:461–463`) data-only. Surface `:205–206`. No Methods table.

**`WorkflowToolResult`** (`:1020–1024` region) `status` now `LifecycleStatus`. No Methods table.

**`AgentFunctionOptions` / `WorkflowToolOptions`** `functions?: WorkflowRegistry`. Surface createWorkflowFunctions row `:21` `WorkflowRegistry`.

**`TerminalRoutesOptions`** (`src/server/types.ts:67–73`) data `path?` `:68`, `token?` `:69`, `keepalive?` `:70`, `timer?` `:71`, `limit?` `:72`. Surface `guides/toolbox.md:232`. No Methods table. No `#### TerminalBridge` Methods table (deleted; diff `@@ -261,12 +260,6 @@`).

**`TerminalBridge` class** (`src/server/terminals/TerminalBridge.ts:27`) public call-signature `routes()` `:65`; constructor `:44`. `#` fields `:28–36`. Guide Methods: no table. Lifecycle entities table: no `TerminalBridge` row (`:50–52` `DatabaseResolver` only).

**`DatabaseResolver`** (class file not in the diff; guide still has Methods `:257–261`: `has` `:257`, `get` `:258`, `set` `:259`, `delete` `:260`, `resolve` `:261` beside class `:50,:60,:71,:81,:91`).

Barrel: `src/core/index.ts:1–11` `export *` types/constants/errors/validators/shapers/helpers/compilers/factories/DatabaseResolver/stores. `src/server/index.ts:1–3` types/constants/factories — no TerminalBridge.

Backticked identifiers on guide `+` sentences (diff `guides/toolbox.md`), barrel check:

| Identifier | Barrel |
| --- | --- |
| `resolveLimit` | yes, via `src/core/index.ts:6` → helpers |
| `inferDatabaseCode` / `inferRelationCode` | yes, same |
| `ColumnPrimitive` / `columnPrimitiveShape` / `compileColumnPrimitive` / `isColumnPrimitive` | yes, types/shapers/compilers/validators |
| `TerminalRoutesOptions` | yes, `src/server/index.ts:1` → types |
| `createTerminalRoutes` | yes, `src/server/index.ts:3` → factories |
| `DatabaseResolver` | yes, `src/core/index.ts:9` |
| `WorkflowRegistry` | not a toolbox export (imported from `@orkestrel/workflow`) |
| `schemaToShape` / `samplesToSchema` / `schemaToObject` | not toolbox exports (`@orkestrel/contract`) |
| `definition.execute` / `EndpointDefinition` / `EndpointToolOptions` | `EndpointDefinition`/`EndpointToolOptions` yes via `src/core/index.ts:1`; `execute` is a member |

### Gates

Report § Gates quoted:

| Gate | Exit | File |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-format-check-final.txt` |
| `npm run lint:check` | 0 | `gate-lint-check-final.txt` |
| `npm run check` | 0 | `gate-check-final.txt` |
| `npm run build` | 0 | `gate-build-final.txt` |
| `npm test` | 0 | `gate-test-final.txt` — `456 passed` (src), `111 passed` (policy), `46 passed` (config), `17 passed` (setup), `28 passed` (guides) |

Proof-file readings (files do not print `exit_code`): `gate-format-check-final.txt` “All matched files use the correct format.”; `gate-lint-check-final.txt` command header only (`oxlint --deny-warnings .`) with no diagnostics; `gate-check-final.txt` runs `tsc --noEmit` for root, `src:core`, `src:server`; `gate-build-final.txt` `✓ built in 3.06s`; `gate-test-final.txt:15` `Tests  456 passed (456)`; `:29` `111 passed`; `:43` `46 passed`; `:57` `17 passed`; `:71` `28 passed`.

### Breaking

Report § Breaking: no in-fleet consumer of `@orkestrel/toolbox`; external 0.0.11 loses `relationKeyShape`; `ColumnKind`→`ColumnPrimitive` and `type`→`primitive`; `databaseToolCode`→`inferDatabaseCode` / `relationToolCode`→`inferRelationCode`; `EndpointDefinition.invoke`→`execute`; `TerminalBridgeOptions`→`TerminalRoutesOptions` and `TerminalBridge` interned.

Word-boundary sweep of those old published names over `/home/user/scaffold/src` and `/home/user/fleet/{agent,workflow,tool,terminal}/src` plus a path=`/home/user/fleet` search of `*.{ts,md}`: no hit. Toolbox own tree also no hit for the old names (interned `TerminalBridge` remains as a class identifier, not a barrel export).

### Writing sweep

Population: diff `+` lines in `guides/**`, `README.md`, doc comments in `src/**`, test titles and comments in `tests/**`. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` and count `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`.

Count pattern on `+` lines: no hit.

Banned-word hits on `+` lines in that prose population (diff line → current tree where mapped):

- `conform-toolbox.diff:157` / `guides/toolbox.md:137` `expanded via `expandInclude``
- `:223` / `guides/toolbox.md:190` `via `expandSteps``
- `:305` invariant 4 `+` line — same class as current `:292` (hit from `via` / composition prose on the rewritten invariant)
- `:317` invariant 8 `+` line — current `:302` (`via its seeded `add``)
- `:346` / `guides/toolbox.md:332` `(e.g. `7` sent for a string slot arrives as `'7'`)`
- `:349` / `:334` `via `createForm``
- `:447` / `:956` `currently-pending` and `via an injected `timer``
- `:567` / `src/core/constants.ts:345` `define a new database` (description string, not a `/**` block)
- `tests/src/core/shapers.test.ts` `+` comment `AGENTS' narrow-untrusted-input-with-guards rule` — no banned token
- `tests/src/server/terminals/TerminalBridge.test.ts` title `POST 401s when a function token now rejects…` (tree `:320`)
- same file comment `Expire it via the injected timer` (tree `:646`)
- same file comment `which now also detaches` (tree `:854`)

`+` test *bodies* also matched `\bnew\b` (`new Request`, `new Error`, `new AbortController`) at many TerminalBridge.test.ts / validators.test.ts / guides.test.ts / helpers.test.ts lines; those are statements, not titles or comments.

## Distillate

- toolbox-obj-1: `shapers.ts:410` keyShape / `:635` key: keyShape; `relationKeyShape` gone | diff present yes | old form hits 0 | report matches yes
- toolbox-obj-2: `helpers.ts:459` resolveLimit; `factories.ts:1371,:1391`; `clampQuery` `:490` | yes | 0 | yes
- toolbox-obj-3: `tests/guides.test.ts:198` flagship fences | yes | 0 | yes
- toolbox-obj-4: `thrownOf` gone; `captureError` `factories.test.ts:59` | yes | 0 | yes (green file is `gate-test-final.txt`, not a per-row green)
- toolbox-obj-5: `createTestTimer` `setup.ts:309`; core bindings `timer`; `TerminalBridge.test.ts` still `fake` at `:68,:225,:289,:384` | yes | 4 (`fake` bindings) | yes on claimed sites
- toolbox-obj-6: `tests/src/core/validators.test.ts` exists; helpers lineage construction `:61` | yes | 0 | yes
- toolbox-obj-7: `TerminalBridge.test.ts` exists; `factories.test.ts` two-route only | yes | 0 | yes
- toolbox-obj-8: `factories.test.ts:3897` identical-results; no timing | yes | 0 | yes (green via `gate-test-final.txt`)
- toolbox-subj-1: `src/server/index.ts` no TerminalBridge export; `TerminalRoutesOptions` `types.ts:67`; intern TSDoc `:24–25` | yes | 0 for Options; `TerminalBridge` id remains | yes
- toolbox-subj-2: `inferDatabaseCode` `:265`; `inferRelationCode` `:278` | yes | 0 | yes
- toolbox-subj-3: `guides/toolbox.md:5` no version numeral | yes | 0 | yes
- toolbox-subj-4: `AGENTS §` gone in owned paths; titles use non-possessive form | yes | 0 | yes
- toolbox-subj-5: `constants.ts:317` present tense; SRC/Net-new gone | yes | 0 | yes
- toolbox-subj-6: `types.ts:679` `execute`; prose `invoke` `:126,:138` | yes | 2 prose | yes (report named those)
- toolbox-subj-7: `ColumnPrimitive` `:455`; `primitive` `:463` | yes | 0 | yes
- toolbox-subj-8: guide numerals gone; `shapers.test.ts:263,:382` `13-op`/`11-op` remain | yes | 2 | no vs “every named tally deleted”
- toolbox-subj-9: invariant 23 `:332` imperative; abort comment `:867` not `:866`; `shouldThrow` `:387,:390,:418` | yes | 3 (`shouldThrow`) | no on cited `:866`
- toolbox-subj-11: `types.ts:706–709` mechanism; no PRE-0.0.7 | yes | 0 | yes
- toolbox-subj-12: validators/compilers `@param`/`@returns` | yes | 0 | yes
- fleet-F1: `isBrowserVuePath` absent | diff absent | 0 | yes (noop)
- fleet-F2: no public `readonly id` ahead of `#` | diff absent | 0 | yes (noop)

Scope: every status path owned; none shared/off-limits.

Residue: diff `+` timeout/retry as option/comment only; tree `console.log` `errors.ts:33,:66`; many `timeout`/`retry` domain hits in tests; no `.skip`/`.only`/`.todo`/TODO/FIXME/debugger in non-vendored `src`/`tests`.

Writing: `via`/`currently`/`now`/`new`/`e.g.` hits listed above; count-over-growable-set on `+` lines: no hit.

Parity: `DefinitionStoreInterface` methods `get`/`set`/`delete` align with `guides/toolbox.md:249–251`; `DatabaseResolver` `has`/`get`/`set`/`delete`/`resolve` align with `:257–261`; `EndpointDefinition.execute` is Surface `:217` only; `TerminalBridge.routes()` `:65` has no Methods table; `TerminalRoutesOptions` Surface `:232`; `resolveLimit`/`inferDatabaseCode`/`inferRelationCode`/`ColumnPrimitive`/`TerminalRoutesOptions` barrelled; `TerminalBridge` not barrelled (`src/server/index.ts:1–3`).

## Unknowns

- Numeric process exit codes for the five gate files: the captures do not record `exit_code`; the report states `0`.
- `gate-lint-check-final.txt` has only the oxlint command header; whether the capture truncated a trailing “0 warnings” line is unread.
- `toolbox-obj-4-green.txt` and `toolbox-obj-8-green.txt` are absent; green reading is only `gate-test-final.txt`.
- Full `/home/user/fleet/*/tests` breaking sweep in one pass: Grep is workspace-rooted at toolbox; sibling `src` samples plus a `/home/user/fleet` `*.{ts,md}` search returned no old-name hit, but every `*/tests` directory was not enumerated file-by-file.
- Which banned token on the long invariant-4 `+` line (`diff:305`) fired the writing regex: the line is truncated in the grep display.
- `src/core/compilers.ts @@ -35,18 +35,30 @@` first `+` line not fully quoted (hunk starts after `return tables`).

## Journal

## Deviation

No tree change from this lane (Read/Grep/Glob only). Every named input file opened. Sweeps that could not be a single host `rg` over every fleet checkout `src`+`tests` are recorded under Unknowns. `guides/<dependency>.md` mirrors were excluded from owned-path old-form sweeps as the unit brief places them off-limits.