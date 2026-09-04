I'll start by reading the brief and the repository contracts it depends on.Next I’ll load the unit brief, audit brief, writer’s report, and evidence files so the per-row map can be built from those sources.I’ll map each row’s current sites, then sweep the tree and the evidence diff for old forms, residue, and report pointers.Flagship-fences didn’t match as named; I’ll read the current sites and keep sweeping old names, residue, and proofs.I’ll read the remaining contract sites, proof summaries, and the sweeps the brief still needs.## Question

For every row of unit conform-program, what does the tree at `/home/user/fleet/program` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

### program-obj-1

1. **Site now.** Brief `tests/setup.ts:445` (nested `function reason` inside `createRecordingEngine`) is gone. Symbol now: `class RecordingReason` at `tests/setup.ts:92` beside `FixedReason` at `:42`; factory at `:609`.

```91:93:tests/setup.ts
}

class RecordingReason implements RecordingEngineInterface {
	readonly #inner: ReasonInterface
```

```608:611:tests/setup.ts
}

export function createRecordingEngine(options?: ReasonOptions): RecordingEngineInterface {
	return new RecordingReason(options)
}
```

Overload + `isArray<Subject>` implementation: `tests/setup.ts:112-122`. `destroy` increments then forwards: `:144-147`. `get destroyCount`: `:108-110`.

2. **Diff at the site.** `tests/setup.ts @@ -78,6 +89,64 @@` (class inserted after `FixedReason`); `@@ -435,53 +607,7 @@` (factory body replaced). Operative repair present in `+` lines: `+class RecordingReason implements RecordingEngineInterface {` (diff 2133); `+	return new RecordingReason(options)` (diff 2361); `+		if (isArray<Subject>(subjectsOrSubject)) {` (diff 2158). Nested `function reason` appears only on `-` lines (diff 2321-2331).

3. **Old form sweep.** Removed form: nested `function reason` / local engine object. Pattern `\bfunction reason\b` over `src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src`, `guides/program.md`, `guides/README.md`, `README.md`: no hit. Inflections `reasons?|reasoned|reasoning` not applied to the nested-declaration shape (the remaining `reason` members are interface methods).

4. **Report reading.** Disposition `applied`. Sentence: "`tests/setup.ts:92` declares `class RecordingReason implements RecordingEngineInterface`; `createRecordingEngine` at `tests/setup.ts:609` returns `new RecordingReason(options)`. The nested `function reason` is gone. `isArray<Subject>` from `@orkestrel/contract` narrows the overload implementation." Cited `:92` and `:609` now carry that. `tests/setup.ts:92` is the class; `:609` is the factory.

5. **Proof reading.** Report: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`; red `1 failed, 84 passed (85)` — `program-obj-1-red2.txt`; green `85 passed (85)` — `program-obj-1-green2.txt`. Files exist. `/home/user/work/evidence/program-proofs/program-obj-1-red2.txt`: `Tests  1 failed | 84 passed (85)`; FAIL `createRecordingEngine > counts every destroy, so a suite can prove an owned engine was released once`. `/home/user/work/evidence/program-proofs/program-obj-1-green2.txt`: `Tests  85 passed (85)`. Tree case at `tests/setup.test.ts:313-321` calls `destroy` twice and asserts `destroyCount` `2`.

### program-obj-2

1. **Site now.** Brief `tests/setup.ts:494` (`const record = …`) is gone. `recordEvents` is at `tests/setup.ts:618-649`; each `on` callback inlines `names.push('<event>')`.

```617:624:tests/setup.ts
export function recordEvents(program: ProgramInterface): EventRecorderInterface {
	const names: Array<keyof ProgramEventMap> = []
	program.emitter.on('qualify', () => {
		names.push('qualify')
	})
	program.emitter.on('rate', () => {
		names.push('rate')
```

2. **Diff at the site.** `tests/setup.ts @@ -491,16 +617,27 @@`. Repair text present as split `+` lines: `+	program.emitter.on('qualify', () => {` / `+		names.push('qualify')` (diff 2379-2380), same for `rate`, `determine`, `decide`, `execute`, `aggregate`, `destroy`. `-	const record = (name: keyof ProgramEventMap) => {` (diff 2369).

3. **Old form sweep.** Pattern `const record = \(name: keyof ProgramEventMap\)` over the named paths: no hit. `recordEvents` remains as the exported helper.

4. **Report reading.** `applied`. "`tests/setup.ts:618-640` contains `recordEvents`; each `program.emitter.on` subscription pushes its own event name inline, and no local `record` arrow remains." `:618` starts the function; the last `on('destroy')` is `:638-640`; the return object continues to `:649`. The cited range carries the inlined pushes.

5. **Proof reading.** Same setup command; red `1 failed, 84 passed (85)` — `program-obj-2-red.txt`; green `85 passed (85)` — `program-obj-2-green.txt`. Files exist. Red: `Tests  1 failed | 84 passed (85)`; FAIL `recordEvents > records every wired event name, in the order the emitter fired it`. Green: `Tests  85 passed (85)`.

### program-obj-3

1. **Site now.** Brief `tests/guides.test.ts:1` still opens the file (imports). Added suite: `describe('flagship fences')` at `tests/guides.test.ts:192-266`.

```191:195:tests/guides.test.ts
// beside it.
describe('flagship fences', () => {
	const guideText = requireValue(files[CORE_GUIDE], `Missing file: ${CORE_GUIDE}`)

	it('returns the Surface fence values for an eligible and an ineligible subject', () => {
```

Assertions `eligible.status` / `rating?.total` / `ineligible` / batch `result.count` / tallies: `:230-249`. `program.destroy()` in `finally`: `:250-252`. Presence guards: `:255-265`.

2. **Diff at the site.** `tests/guides.test.ts @@ -168,3 +181,86 @@`. First `+` of the added suite region includes the flagship block (diff 1769+). Repair name `describe('flagship fences')` present verbatim as `+describe('flagship fences', () => {`. Finder's `describe('guides/program.md fences')` is not in `+` lines.

3. **Old form sweep.** Additive row; no renamed symbol. No old-name sweep population.

4. **Report reading.** `applied`. "`tests/guides.test.ts:192-268` contains `describe('flagship fences')`, the executed Surface and batch assertions, cleanup under `finally`, and the presence guards." `:192` is the `describe`; file ends at `:266` (`}`), not `:268`. Cited end line does not exist as content.

5. **Proof reading.** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`; red `1 failed, 25 passed (26)` — `program-obj-3-red.txt`; green `26 passed (26)` — `program-obj-3-green.txt`. Files exist. Red: `Tests  1 failed | 25 passed (26)`; FAIL `flagship fences > carries the batch fence lines the transcription copies`. Green: `Tests  26 passed (26)`.

### program-obj-4

1. **Site now.** Brief `tests/src/core/programs/ProgramManager.test.ts:43` (hand-rolled capture) is gone. Current first capture: `:40`. Import: `:6`.

```5:7:tests/src/core/programs/ProgramManager.test.ts
import { captureError, createRecorder } from '@orkestrel/test'
import {
	buildStandardProgramDefinition,
```

```39:41:tests/src/core/programs/ProgramManager.test.ts
		it('throws DUPLICATE when adding a program with an existing id', () => {
			expect(captureError(() => manager.add(standardProgramDefinition))).toMatchObject({
				code: 'DUPLICATE',
```

`factories.test.ts:7` and `helpers.test.ts:5` import `captureError`. `Program.test.ts:15` already had it. Cleanup `try/finally` remains at `tests/setup.test.ts:100-104` and `:110+`.

2. **Diff at the site.** `tests/src/core/programs/ProgramManager.test.ts @@ -3,35 +3,32 @@` (import + `buildStandardProgramDefinition`); `@@ -40,27 +37,20 @@` (first capture collapse). `Program.test.ts @@ -402,28 +402,21 @@` moves `JSON.parse('"subject"')` inside the thunk (diff 3527-3531). Repair one-liner `expect(captureError(() => manager.add(standardProgramDefinition))).toMatchObject({ code: 'DUPLICATE', context: 'standard' })` — `+` has the `captureError` call (diff ~3812+); `context: 'standard'` is in the tree at `ProgramManager.test.ts:40-42` area.

3. **Old form sweep.** `\blet error: unknown\b` over `tests/src`, `tests/setup.ts`, `tests/setup.test.ts`: no hit. `expect.unreachable` over `tests/src`, `tests/setup.ts`, `tests/setup.test.ts`: no hit (vendored `tests/config.test.ts` still has it; outside the report's named sweep paths). Inflections N/A.

4. **Report reading.** `applied`. Imports at the three cited files: `ProgramManager.test.ts:6`, `factories.test.ts:7`, `helpers.test.ts:5` match. Sweep claim matches this sweep.

5. **Proof reading.** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`; red `1 failed, 73 passed (74)` — `program-obj-4-red.txt`; green `74 passed (74)` — `program-obj-4-green.txt`. Files exist. Red: `Tests  1 failed | 73 passed (74)`; FAIL `helpers > assertProgramSubject > throws RESERVED with the offending key as context`. Green: `Tests  74 passed (74)`.

### program-obj-5

1. **Site now.** Brief `tests/src/core/helpers.test.ts:78` local classes are gone. Moved: `tests/setup.ts:400` `OffContractValidationResult`, `:414` `OffContractQualifier` (was `ScriptedQualifier`), `:434` `OffContractReason` (was `ScriptedReason`); factories `:532-542`; `buildQualificationResult` `:544-558`; `buildStandardProgramDefinition` `:690-692`. `helpers.test.ts` imports `buildQualificationResult` at `:49`, `createOffContractQualifier` `:53`, `createOffContractReason` `:54`. `ProgramManager.test.ts:8` imports `buildStandardProgramDefinition`.

2. **Diff at the site.** `tests/setup.ts @@ -328,6 +397,81 @@` (classes); `@@ -385,6 +529,34 @@` (factories); `@@ -547,17 +686,22 @@` (`buildStandardProgramDefinition`). `tests/src/core/helpers.test.ts @@ -73,98 +63,7 @@` deletes the local block. Repair names `createOffContractQualifier` / `createOffContractReason` (not finder's `createScripted*`) appear as `+export function createOffContractQualifier` / `+export function createOffContractReason` (diff 2284, 2288). `+export function buildQualificationResult(` and `+export function buildStandardProgramDefinition(id: string)` present.

3. **Old form sweep.** `\b(ScriptedQualifier|ScriptedReason|buildQualification|buildDefinition)\b` over the named paths: no hit (`buildQualificationSubject` / `buildQualificationResult` do not match `\bbuildQualification\b`). Case-insensitive inflections `scriptedqualifier(s|es|ed|ing)` etc.: no hit.

4. **Report reading.** `applied`. Cited `:400`, `:414`, `:434`, `:532-548`, `:690` carry those declarations.

5. **Proof reading.** Setup command; red `1 failed, 84 passed (85)` — `program-obj-5-red.txt`; green `85 passed (85)` — `program-obj-5-green.txt`. Files exist. Red: `Tests  1 failed | 84 passed (85)`; FAIL `buildStandardProgramDefinition > names the definition after the given id and reuses the standard pair by identity`. Green: `Tests  85 passed (85)`. Report also records proofs in `tests/setup.test.ts` for the five exports (`:552+`).

### program-obj-6

1. **Site now.** Brief `tests/src/core/factories.test.ts:113` moved. Current case:

```97:109:tests/src/core/factories.test.ts
		})

		it('defaults validate to true', () => {
			// Empty id and name pass `assertProgramDefinition` and fail only
			// `validateProgramDefinition`, so the definition separates the two branches.
			const definition = buildProgramDefinition('', '', standardQualification, standardRating)
			const validating = createProgramManager()
			expect(captureError(() => validating.add(definition))).toMatchObject({ code: 'DEFINITION' })
			validating.destroy()

			const permissive = createProgramManager({ validate: false })
			expect(permissive.add(definition).id).toBe('')
			permissive.destroy()
```

2. **Diff at the site.** `tests/src/core/factories.test.ts @@ -67,53 +62,50 @@` (rewritten body in this hunk). Repair's exact `captureError(() => createProgramManager().add(definition))` is not verbatim; `+` uses `validating.add` after `const validating = createProgramManager()`. `{ validate: false }` branch is present.

3. **Old form sweep.** No renamed symbol. Old body was `manager.size === 0` (also `program-subj-4`).

4. **Report reading.** `applied`. "`tests/src/core/factories.test.ts:97-108` proves the default validation branch…" `:97` is `})` closing the prior case; the `it` starts at `:98`; `permissive.destroy()` is `:108`. Start line does not carry the case title.

5. **Proof reading.** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts`; red `1 failed, 6 passed (7)` — `program-obj-6-red.txt`; green `7 passed (7)` — `program-obj-6-green.txt`. Files exist. Red: `Tests  1 failed | 6 passed (7)`; FAIL `factories > createProgramManager > defaults validate to true`. Green: `Tests  7 passed (7)`.

### program-obj-8

1. **Site now.** Brief `tests/setup.ts:989` (`isBrowserVuePath`) deleted. File now ends with `buildHostileSubject` at `:1125-1130`. `tests/setup.test.ts` import list at `:28-89` has no `isBrowserVuePath`. No `describe('isBrowserVuePath')`.

2. **Diff at the site.** `tests/setup.ts @@ -978,15 +1122,9 @@` deletes the helper (`-export function isBrowserVuePath`). `tests/setup.test.ts @@ -67,7 +73,6 @@` drops the import; `@@ -898,16 +1004,3 @@` deletes the `describe` (no `+` line). Repair deletion present.

3. **Old form sweep.** `\bisBrowserVuePath\b` over named paths: no hit. Inflections `isbrowservuepath(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied`. Sweep claim matches this sweep.

5. **Proof reading.** Placement/naming row. Report sweep `grep -rn isBrowserVuePath` empty; this sweep agrees (no hit).

### program-obj-9

1. **Site now.** Brief `src/core/helpers.ts:624` moved to `:619-620`. Collapse still present.

```602:621:src/core/helpers.ts
 * @remarks
 * The key is the resolved field coerced with `String` — `undefined` collapses
 * to the empty string, so a subject missing the field and a subject whose
 * field is literally `''` land in the SAME partition, and a numeric `1`
 * collides with the string `'1'`.
…
export function formatGroupKey(subject: Subject, partition: FieldPath): string {
	return String(resolveField(subject, partition) ?? '')
}
```

Guide: `guides/program.md:350` still states missing field and `''` share a partition.

2. **Diff at the site.** `src/core/helpers.ts @@ -620,8 +616,8 @@` retargets the parameter name `by` → `partition` (subj-13), not the `?? ''` collapse. Operative repair: no change to the collapse. `+	return String(resolveField(subject, partition) ?? '')` keeps the sentinel.

3. **Old form sweep.** No removal.

4. **Report reading.** `noop (EXEMPT)`. "`src/core/helpers.ts:600-620` and `guides/program.md:350`." `:600-620` spans the TSDoc + function (collapse at `:620`). `:350` carries the guide sentence.

5. **Proof reading.** Documentation/exempt row. Report: no control. Sweep N/A (no old form).

### program-subj-1

1. **Site now.** Brief sites rewritten; AGENTS parentheticals gone at the package-owned locations:

| Brief Where | Now |
|---|---|
| `guides/README.md:3` | `:3` `A dual-axis index into this repository's guides — by concept, and by directory.` |
| `guides/README.md:58` | `:58` `- [\`AGENTS.md\`](../AGENTS.md) — the rules.` |
| `guides/program.md:29` | `:29` `> Surfaced through the \`@src/core\` barrel.` (emitter citation dropped at `:28`) |
| `:93` | `:93-94` `The array overload is declared FIRST and performs one aggregate-aware batch execution:` |
| `:154` | `:153-154` `every optional key is omitted rather than \`undefined\`, and each name is single-word within its entity.` |
| `:404` | `:402-403` `The array overload is declared first. \`execute\` is the correct verb` |
| `:426` | `:423` `The manager follows the singular/plural accessor and batch-removal conventions.` |
| `src/core/types.ts:194` | `:194` `Describes the push observation surface of a {@link ProgramInterface}.` |
| `:239` | overload note is `//` at `:251`, not at `:239` (`export interface ProgramInterface {`) |
| `:253` | EventMap type is `:359-364`; sentence at `:359` |
| `:284` | manager interface lead-in `:391` `Defines an ordered manager over compiled programs, sharing one qualifier and rater.` |
| `helpers.ts:129` | `:125-126` `Explicit policy, not an opaque precedence reduce: global` |
| `ProgramManager.ts:21` | `:21-22` `Manages compiled {@link ProgramInterface} programs in order, sharing one` |
| `ProgramManager.ts:122` | overload `//` at `:242` |
| `Program.ts:148` | overload `//` at `:179` |

2. **Diff at the site.** `guides/README.md @@ -1,6 +1,6 @@` `+A dual-axis index… directory.` (no `AGENTS §22`); `@@ -55,4 +55,4 @@` `+- [\`AGENTS.md\`](../AGENTS.md) — the rules.` `guides/program.md @@ -26,7 +26,7 @@`, `@@ -90,8 +90,8 @@`, `@@ -148,10 +148,10 @@`, `@@ -401,7 +399,7 @@`, `@@ -422,8 +420,7 @@`. `src/core/types.ts @@ -191,7 +191,7 @@`. Verbatim finder rewrites for README `:3` and `:58` are in the `+` lines.

3. **Old form sweep.** `AGENTS §` over `src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src`, `guides/program.md`, `guides/README.md`, `README.md`: no hit. Vendored `guides/reason.md`, `guides/emitter.md`, `guides/rater.md`, `guides/guide.md`, `guides/qualifier.md` still contain `AGENTS §` (off-limits mirrors).

4. **Report reading.** `applied`. Cites `types.ts:193,239,250,361`, `helpers.ts:125`, `ProgramManager.ts:21,235`, `Program.ts:166`, `program.md:29,93,153,401,423`, `guides/README.md:3,58`. Match: `:193` (EventMap sentence), `helpers.ts:125`, `ProgramManager.ts:21`, `program.md:29,93,153`, `guides/README.md:3,58`. Miss: `types.ts:239` is `export interface ProgramInterface {` not the execute-order sentence (`:251`); `:250` is `readonly emitter`; `:361` is `readonly add:…` inside EventMap (`:359` is the sentence); `ProgramManager.ts:235` is the `labels` spread (`:242` is the `//` note); `Program.ts:166` is `@example` of `get emitter` (`:179` is the `//` note); `program.md:401` is `#### \`ProgramInterface\`` (sentence at `:402`).

5. **Proof reading.** Report `AGENTS §` sweep empty on the named paths; this sweep agrees.

### program-subj-2

1. **Site now.** Brief `src/core/constants.ts:17-23` (`STATUS_PRECEDENCE`) deleted. `STATUSES` remains `:8-14`. Consumers: `helpers.ts:850` `for (const status of STATUSES)`; `validators.ts:266` `STATUSES.every`; import `helpers.ts:36`, `validators.ts:35`; TSDoc `helpers.ts:836` `{@link STATUSES}`, `validators.ts:251` `{@link STATUSES}`. `completeTallies` literal `:826-832`. `Program.test.ts:13` imports `STATUSES`; `:1011-1014` asserts `Object.keys(result.tallies)` vs `[...STATUSES]`. Guide constants table has no `STATUS_PRECEDENCE` row (`guides/program.md:164-168`).

2. **Diff at the site.** `src/core/constants.ts @@ -13,15 +13,6 @@` (`-export const STATUS_PRECEDENCE`). `helpers.ts @@ -849,8 +847,7 @@`; `validators.ts @@ -32,7 +32,7 @@` and `@@ -263,7 +263,7 @@`. Guide `@@ -163,19 +163,16 @@` deletes the row. Repair's exact guide sentence "`STATUSES` declares status membership: the `Status` union, the `isStatus` guard, and the complete tally record all derive from it, so a status is authored once. `completeTallies` fixes the key order of a tally record." is **not** verbatim in `+` lines. Present instead (diff 188-191): `+declares status membership for the \`Status\` union and the \`isStatus\` guard.` / `+\`completeTallies\` writes every \`Status\` member as a literal record, and \`isTallies\`` / `+checks membership through \`STATUSES\`.`

3. **Old form sweep.** `\bSTATUS_PRECEDENCE\b` over named paths: no hit. Inflections `status_precedence(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied (BREAKING)`. Cited `helpers.ts:850`, `validators.ts:266`, imports `:36`/`:35`, TSDoc `:836`/`:251`, `Program.test.ts:13,1010-1014` — `:1010` is `describe('tallies shape')`; the `it` is `:1011`; `[...STATUSES]` is `:1014`. Those lines carry `STATUSES`.

5. **Proof reading.** Report word-boundary sweep empty; this sweep agrees.

### program-subj-3

1. **Site now.** Brief `helpers.ts:206` / `:999`: `buildNoticeDeterminations` at `:202`; `buildLimitDeterminations` at `:242`; `buildNotice` still at `:996` area (`export function buildNotice` near `:996`). Calls: `Program.ts:39-40` imports; `:342` `buildNoticeDeterminations`; `:360` and `:433` `buildLimitDeterminations`. Guide rows `guides/program.md:286-287`. Tests `helpers.test.ts:19-20`, `:246`, `:916`.

2. **Diff at the site.** `helpers.ts @@ -198,12 +194,12 @@` and `@@ -218,14 +214,14 @@` (`buildNotices` → `buildNoticeDeterminations`); `@@ -238,12 +234,12 @@` / `@@ -262,7 +258,7 @@` (`buildLimits` → `buildLimitDeterminations`). `Program.ts @@ -36,14 +36,14 @@`. Guide `@@ -286,8 +283,8 @@`. Verbatim new names in `+` lines: `+export function buildNoticeDeterminations(`, `+export function buildLimitDeterminations(`.

3. **Old form sweep.** `\b(buildNotices|buildLimits)\b` over named paths: no hit. Inflections `buildnotices|buildlimits` + `s|es|ed|ing`: no hit. `buildNotice` (singular) remains.

4. **Report reading.** `applied (BREAKING)`. "`buildNoticeDeterminations` and `buildLimitDeterminations` are declared at `src/core/helpers.ts:202,242`." Those lines are the `export function` declarations. "`Program.ts:39-40,329,347,420`" — imports `:39-40` match; calls are `:342`, `:360`, `:433`, not `:329,347,420`.

5. **Proof reading.** Report sweep empty; this sweep agrees.

### program-subj-4

1. **Site now.** Brief `types.ts:287` `size` → `readonly count` at `src/core/types.ts:403`. Implementation `get count()` at `ProgramManager.ts:118-121`. Tests read `manager.count` at `ProgramManager.test.ts:24,31,101,137,162,168,207,312` and `factories.test.ts:93`.

2. **Diff at the site.** `src/core/types.ts @@ -281,16 +388,186 @@` (interface rebuild includes `readonly count`). `ProgramManager.ts @@ -74,30 +81,143 @@` (`get count`). Repair `readonly count: number` / `get count(): number` present in `+` lines.

3. **Old form sweep.** `\.size\b` over named paths: `src/core/helpers.ts:537` `lines.size` (`Set`); `tests/setup.test.ts:479` `new Set(…).size`. No `manager.size`. `\bsize\b` over `guides/program.md`: no hit. Inflections `sizes|sized|sizing` over `src`+`tests/src`: no hit.

4. **Report reading.** `applied (BREAKING)`. "`types.ts:404` declares `readonly count`" — `:403` is `readonly count: number`; `:404` is `/**`. "`ProgramManager.ts:111` implements `get count()`" — `:111` is `import { createProgramManager }`; getter is `:118`. Test lines `:24,31,101,137,162,168,207,312` do read `manager.count`.

5. **Proof reading.** Report `.size` two Set hits at `helpers.ts:537`, `setup.test.ts:477`; this sweep: `:537` and `setup.test.ts:479`. Same files; setup.test line drifted by 2.

### program-subj-5

1. **Site now.** Brief `src/core/errors.ts:44`:

```43:45:src/core/errors.ts
/**
 * Determines whether a caught value is a {@link ProgramError}.
 *
```

2. **Diff at the site.** `src/core/errors.ts @@ -41,7 +41,7 @@`. Verbatim `+ * Determines whether a caught value is a {@link ProgramError}.`

3. **Old form sweep.** `Checks whether` over `src`: no hit.

4. **Report reading.** `applied`. Cited `:44` carries that sentence.

5. **Proof reading.** Report sweep empty over `src`; this sweep agrees.

### program-subj-6

1. **Site now.** Brief `types.ts:242-251` / `:285-296` are now fully documented members: `ProgramInterface` `src/core/types.ts:239-357` (`id` `:241`, `name` `:243`, `definition` `:245`, `emitter` `:250`, `execute` `:282`/`:313`, `validate` `:337`, `destroy` `:356`); `ProgramManagerInterface` `:392-573` (`emitter` `:396`, `count` `:403`, `has` `:421`, `program` `:439`, `programs` `:460`, `add` `:490`, `remove` `:514`/`:532`/`:552`, `destroy` `:572`). Class mirrors: `Program.ts` data `:86-91`, `get emitter` `:175`, execute TSDoc `:180+`; `ProgramManager.ts` `get emitter` `:98`, `get count` `:118`, methods follow. Overload `//` comments: `types.ts:251`, `types.ts:491`, `Program.ts:179`, `ProgramManager.ts:242`.

2. **Diff at the site.** `types.ts @@ -234,23 +235,128 @@` and `@@ -281,16 +388,186 @@`; `Program.ts @@ -141,12 +157,87 @@`, `@@ -154,11 +245,52 @@`; `ProgramManager.ts @@ -74,30 +81,143 @@`, `@@ -119,9 +239,67 @@`. Repair's complete-block requirement is in those `+` hunks (`@param`, `@returns`, `@throws {@link ProgramError}`, `@example` importing `@orkestrel/program`).

3. **Old form sweep.** Additive documentation; no old name. Report later sweep `@throws` / `Thrown when` is a fix-round measurement, not an old-name removal.

4. **Report reading.** `applied`. "`ProgramInterface` (`src/core/types.ts:242-358`)" — interface starts `:239`; last member `destroy` `:356`; `:358` is blank. "`ProgramManagerInterface` (`:393-567`)" — interface starts `:392`; `destroy` `:572`. "`Program.ts:86-280`" — data members start `:86`; batch `execute` TSDoc starts `:180`; `:280` is inside that `@example`. "`ProgramManager.ts:77-325`" — `:77` is `for (const definition of options?.programs ?? []) this.add(definition)`; getters start `:84`. Overload notes cited at `Program.ts:166` and `ProgramManager.ts:235` do not hold the `//` comments (`:179` / `:242`).

5. **Proof reading.** Report records `@throws … Thrown when` counts; not re-run as a behavioural control. Old-form N/A.

### program-subj-7

1. **Site now.** Brief `guides/program.md:151`:

```150:152:guides/program.md
| `ProgramManagerOptions`   | interface | `{ qualifier?, rater?, engine?, programs?, validate?, labels?, on?, error? }`.                                                                 |
| `ProgramManagerInterface` | interface | `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`.                                                           |
```

2. **Diff at the site.** `guides/program.md @@ -148,10 +148,10 @@`. Verbatim Shape cell in the `+` line (diff 162).

3. **Old form sweep.** Phrase "Ordered program manager with singular/plural accessors and lifecycle": no hit in `guides/program.md`. `\bsize\b` over `guides/program.md`: no hit.

4. **Report reading.** `applied`. Cited `:151` carries that Shape cell.

5. **Proof reading.** Report `\bsize\b` over `guides/program.md` empty; this sweep agrees.

### program-subj-8

1. **Site now.** Brief `guides/program.md:318-328` import block now starts at `:315-321`:

```314:321:guides/program.md
```ts
import {
	assertProgramDefinition,
	assertProgramSubject,
	decideEligibility,
	hasReservedKey,
	selectProgramLines,
} from '@orkestrel/program'
```

Call remains `:326` `assertProgramDefinition(definition)`.

2. **Diff at the site.** `guides/program.md @@ -316,6 +313,7 @@`. Verbatim `+	assertProgramDefinition,` (diff 245) before `assertProgramSubject`.

3. **Old form sweep.** Additive import; no old name. Presence pattern `^\s*assertProgramDefinition,` hits `guides/program.md:316`.

4. **Report reading.** `applied`. "`guides/program.md:316` — `assertProgramDefinition,` is the first entry". `:316` is that line.

5. **Proof reading.** Report presence at `:316`; this sweep agrees.

### program-subj-9

1. **Site now.** Brief `README.md:24`:

```23:25:README.md
- Node.js >= 22.12.0
- ESM (`import`) and CommonJS (`require`) through the `exports` field
```

2. **Diff at the site.** `README.md @@ -21,15 +21,15 @@`. Verbatim `+- Node.js >= 22.12.0`.

3. **Old form sweep.** `Node\.js >= 24` over `README.md`: no hit.

4. **Report reading.** `applied`. `:24` carries that text. `package.json` not in the status file.

5. **Proof reading.** Report sweep empty; this sweep agrees.

### program-subj-10

1. **Site now.**

```182:184:src/core/helpers.ts
 * Resolves authored {@link Notice} values into unconditionally-applied `notice`
 * {@link Determination} values.
```

```217:221:src/core/helpers.ts
 * Converts a logical result's applied rules into `limit` {@link Determination} values.
…
 * are plain {@link LogicalDefinition} definitions with no program-authored ruling map, so a
```

```21:22:src/core/programs/ProgramManager.ts
 * Manages compiled {@link ProgramInterface} programs in order, sharing one
```

```985:985:src/core/helpers.ts
 * @param message - The message template, carrying optional `{{token}}` placeholders
```

`guides/program.md:138`: `` batch sums (`FieldPath` values) ``.

2. **Diff at the site.** `helpers.ts @@ -184,8 +180,8 @@`, `@@ -218,14 +214,14 @@`, `@@ -1015,7 +1012,7 @@`; `ProgramManager.ts @@ -18,7 +18,7 @@`; `program.md @@ -132,10 +132,10 @@`. Repair strings appear on those `+` lines (`{@link Notice} values`, `{@link Determination} values`, `{@link LogicalDefinition} definitions`, `{@link ProgramInterface} programs`, `` `{{token}}` placeholders ``, `` `FieldPath` values ``).

3. **Old form sweep.** `\{@link [^}]+\}s|`FieldPath`s|`\{\{token\}\}`s` over `src` and `guides/program.md`: no hit.

4. **Report reading.** `applied`. Cited `helpers.ts:183-184,217,221,985`, `ProgramManager.ts:21`, `program.md:138` carry the rewritten forms.

5. **Proof reading.** Report that pattern empty; this sweep agrees.

### program-subj-11

1. **Site now.** `helpers.ts:814` `@returns A record carrying every {@link Status}`. `validators.ts:344-345` `This guard therefore checks the program-owned members directly`. `guides/program.md:170-171` `The reserved keys exist only for composed program execution`. `:533` `(a decision gate, listed later)`. `:552-553` `A \`decision\` is present only when every gate holds:`.

2. **Diff at the site.** `helpers.ts @@ -813,7 +811,7 @@`; `validators.ts @@ -341,7 +341,7 @@`; `program.md @@ -163,19 +163,16 @@` (reserved keys), `@@ -533,7 +530,7 @@`, `@@ -552,8 +549,8 @@`. Finder rewrites present on those `+` lines.

3. **Old form sweep.** Count phrases `all five statuses` / `three program-owned` / `two reserved keys` / `four decision gates` / `all four gates`: no hit on named paths. Report's `\b(above|below)\b`: `tests/setup.ts:916` `'above'`; `tests/setup.test.ts:806` `above the given threshold`; `Program.test.ts:983` `'below'`; `validators.test.ts:132` `'above'`; `guides/program.md:877`, `:901` `'above'`. Report's `two subjects` pattern: `Program.test.ts:968` `it('carries two subjects sharing the same id as two distinct results', () => {`.

4. **Report reading.** `applied`. Cited `helpers.ts:814`, `validators.ts:344-345`, `program.md:171,533,553` match. "`guides/program.md:176` names its members" — `:176` is blank; the `ELIGIBILITY_DECISIONS` / `STATUSES` / `completeTallies` / `isTallies` sentences are `:172-175`. `above|below`: report `setup.test.ts:804` vs tree `:806`.

5. **Proof reading.** Report `above|below` paths agree except `setup.test.ts:804`→`:806`. Count `two subjects` at `Program.test.ts:968` present. Numeral-count pattern `\b[0-9]+ (elements|members|…)\b`: no hit on named paths (agrees with report empty).

### program-subj-12

1. **Site now.** `README.md:25` `through the \`exports\` field`. `guides/program.md:701` `exact shape through \`isProgramDefinition\``. `helpers.test.ts:1035` `through real qualification`. `tests/setup.ts:1125` `OWN keys through JSON parsing`.

2. **Diff at the site.** `README.md @@ -21,15 +21,15 @@`; `program.md @@ -704,7 +698,7 @@`; `helpers.test.ts @@ -1109,7 +1032,7 @@`; `setup.ts @@ -978,15 +1122,9 @@`. Verbatim `through` replacements on those `+` lines.

3. **Old form sweep.** `\bvia\b` over `src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src`, `guides/program.md`, `guides/README.md`, `README.md`: no hit. Inflections `vias|viaed|viaing`: no hit. Vendored `guides/*.md` still contain `via`.

4. **Report reading.** `applied`. Cited `README.md:25`, `program.md:701`, `helpers.test.ts:1035`, `setup.ts:1125` carry `through`.

5. **Proof reading.** Report `\bvia\b` empty on those paths; this sweep agrees.

### program-subj-13

1. **Site now.** Brief `types.ts:52` and `:93`: `readonly partition?: FieldPath` at both. `@remarks` `:47` `` `partition` — the field a batch partitions on ``. Reads: `helpers.ts:575-576`, `:619-620`, `:709`/`:714`, `:753`/`:758`, `:1024`; `validators.ts:113-115`; `Program.ts:389`, `:395`. Tests: `setup.ts:902`; `setup.test.ts:827`, `:836`; `Program.test.ts:911`, `:935`; `validators.test.ts:128`; `helpers.test.ts:618`, `:1088`. Guide: `program.md:135`, `:138`, `:260`, `:361`, `:711`, `:868`.

2. **Diff at the site.** `types.ts @@ -44,12 +44,12 @@` `+	readonly partition?: FieldPath`; `@@ -87,10 +87,10 @@`. Many helpers/validators/tests hunks. Repair name `partition` verbatim on `+` lines (`+ * \`partition\` — the field a batch partitions on; omitted skips partitioning.`).

3. **Old form sweep.** `by\?:|\.by\b|[{,] by:` over `src`, `tests`, `guides/program.md`: no hit. English `\bby\b` remains in prose (`by id`, `by status`, `keyed by`). Inflections `bys|byed|bying` not used as the member.

4. **Report reading.** `applied (BREAKING)`. `types.ts:52,93` match. Implementation range `helpers.ts:575-576,600-620,691-758,1008-1024` — `:575-576` and `:1024` are partition reads; `:1008` is `@param input - Optional partition field`. `validators.ts:112-115` — key `'partition'` is `:114-115`. `Program.ts:382` is `#aggregate(subjects…)` header; reads are `:389` and `:395`. `setup.test.ts:832-834` is the `describe`/`it` title; the assertion is `:836`. `helpers.test.ts:1088` is `Object.hasOwn(aggregate, 'partition')`.

5. **Proof reading.** Report member-shaped `by` sweep empty; this sweep agrees.

### program-subj-14

1. **Site now.** Brief `types.ts:221` / `:269-270` moved. Current:

```218:220:src/core/types.ts
 * created and owned when omitted. `validate` — if `true`, the program validates
 * the definition at construction; if `false`, it compiles the definition
 * unvalidated. Default: {@link DEFAULT_PROGRAM_VALIDATE}. `labels` —
```

```374:376:src/core/types.ts
 * `validate` — if `true`, the manager validates each seeded and added
 * definition; if `false`, it compiles each definition unvalidated.
 * Default: {@link DEFAULT_PROGRAM_VALIDATE}. `labels` — field-to-label
```

`factories.ts:15-17` also uses the boolean form plus `Default:`.

2. **Diff at the site.** `types.ts @@ -215,8 +215,9 @@` and `@@ -265,10 +371,11 @@`; `factories.ts @@ -12,8 +12,9 @@` (no row Where). Repair's exact "`validate` — validate the definition at construction. Default: …" is **not** verbatim; `+` lines use the boolean `if \`true\` … if \`false\` … Default:` form.

3. **Old form sweep.** `\(default ` over `src` and `guides/program.md`: no hit (vendored `guides/rater.md` still has `(default \``).

4. **Report reading.** `applied`. "`types.ts:219,376-377`". `:219` is `the definition at construction; if \`false\`…` (no `Default:`); `Default:` is `:220` and `:376`. `:377` is the `labels` sentence.

5. **Proof reading.** Report `\(default ` empty over `src guides/program.md`; this sweep agrees for those paths.

### program-subj-16

1. **Site now.** Brief `helpers.ts:873` → `export function tallySubject` at `:870`. `@example` `:865-867`. Import `Program.ts:46`; call `:397`. `helpers.test.ts:32` import, `:767` call. Guide `guides/program.md:305`.

2. **Diff at the site.** `helpers.ts @@ -865,12 +862,12 @@`. `Program.ts` import/call hunks. Guide `@@ -305,7 +302,7 @@`. Verbatim `+export function tallySubject(` / `+\`tallySubject\``.

3. **Old form sweep.** `\btallyProgram\b` over named paths: no hit. Inflections `tallyprogram(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied (BREAKING)`. "`helpers.ts:870`" matches. "`Program.ts:46,384`" — import `:46` matches; call is `:397` not `:384` (`:384` is `for (const subject of subjects)`). `helpers.test.ts:32,767` match. `program.md:305` matches.

5. **Proof reading.** Report sweep empty; this sweep agrees.

### fleet-F1

1. **Site now.** Helper absent (see program-obj-8). `tests/setup.ts` has no header comment naming `isBrowserVuePath` (file starts with imports). Module still exports fixtures (not export-free). `tests/setup.test.ts` is not a sole `adds no export` case.

2. **Diff at the site.** Same deletion hunks as program-obj-8. No second edit hunk unique to fleet-F1.

3. **Old form sweep.** Same as program-obj-8: no hit.

4. **Report reading.** `applied by program-obj-8`. Folded-into-obj-8 sentence matches the tree (helper gone; setup still has exports; `vite.config.ts` / scripts not in the status file).

5. **Proof reading.** Same empty `isBrowserVuePath` sweep; agrees.

### fleet-F2

1. **Site now.** `Program` (`src/core/programs/Program.ts:73-84` `#` fields, then public `id` `:87`). `ProgramManager` (`:37-48`) has no `id`. `ProgramError` (`src/core/errors.ts:23-41`) has `code` / `context`, no `id`, no `#` field. Shape "public `readonly id` ahead of `#` fields" is absent.

2. **Diff at the site.** No hunk introduces `get id()` / `#id` for this row. `JSON.stringify` of a `Program` instance: owned tests have `tests/setup.test.ts:533` `JSON.stringify(wrapped)` on `createResultClass`, not `Program`.

3. **Old form sweep.** No rename.

4. **Report reading.** `noop`. "`Program` (`:73-90`) declares every `#` field before `id`, `name`, and `definition`." `:73` is `export class Program`; `#` fields `:74-84`; `id` `:87`. `ProgramManager.ts:37-48` no `id`. `ProgramError.ts:23-41` no `#` / `id`.

5. **Proof reading.** noop with classes read; matches the field-order evidence.

---

### Across the unit

**Scope.** Status paths vs brief § Scope:

| Status path | Tag |
|---|---|
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/program.md` | owned |
| `src/core/constants.ts` | owned |
| `src/core/errors.ts` | owned |
| `src/core/factories.ts` | owned (`src/**`) |
| `src/core/helpers.ts` | owned |
| `src/core/programs/Program.ts` | owned |
| `src/core/programs/ProgramManager.ts` | owned |
| `src/core/types.ts` | owned |
| `src/core/validators.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/programs/Program.test.ts` | owned |
| `tests/src/core/programs/ProgramManager.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |

No off-limits path in the status file. No `package-lock.json` / `node_modules` / `.claude/**`.

Hunks whose **file** no row **Where** names (`file @@ hunk` + first `+` line):

- `src/core/factories.ts @@ -12,8 +12,9 @@` → `+ * If \`options.validate\` is \`true\`, the program validates the definition at`
- `tests/setup.test.ts @@ -1,7 +1,7 @@` → `+// the \`src:core\` suites stand on. Each following contract is asserted against a hand-written`
- `tests/setup.test.ts @@ -19,9 +19,10 @@` → `+import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'`
- `tests/setup.test.ts @@ -39,6 +40,8 @@` → `+	buildQualificationResult,`
- `tests/setup.test.ts @@ -50,6 +53,9 @@` → `+	createOffContractQualifier,`
- `tests/setup.test.ts @@ -67,7 +73,6 @@` → no `+` line (`-	isBrowserVuePath,`)
- `tests/setup.test.ts @@ -173,11 +178,11 @@` → `+		const dangling = createQualificationDefinition(`
- `tests/setup.test.ts @@ -311,6 +316,8 @@` → `+		engine.destroy()`
- `tests/setup.test.ts @@ -457,7 +464,7 @@` → `+	it('matches the hand-written fixture table', () => {`
- `tests/setup.test.ts @@ -542,6 +549,105 @@` → `+describe('createOffContractValidationResult', () => {`
- `tests/setup.test.ts @@ -616,7 +722,7 @@` → `+	it('give the property rating distinct scoped lines', () => {`
- `tests/setup.test.ts @@ -718,7 +824,7 @@` → `+		expect(program.aggregate?.partition).toBeUndefined()`
- `tests/setup.test.ts @@ -727,7 +833,7 @@` → `+		expect(batchAggregateProgramDefinition.aggregate?.partition).toBe('location')`
- `tests/setup.test.ts @@ -898,16 +1004,3 @@` → no `+` line (deleted `describe('isBrowserVuePath')`)
- `tests/src/core/programs/Program.test.ts @@ -1,7 +1,7 @@` → `+import { buildLineDefinition, buildRatingDefinition, createRater } from '@orkestrel/rater'`
- `… @@ -10,7 +10,7 @@` → `+import { STATUSES } from '@src/core'`
- `… @@ -61,7 +61,7 @@` → `+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'`
- `… @@ -247,8 +247,8 @@` → `+				buildRatingDefinition('owned-rating', 'Owned rating', [`
- `… @@ -402,28 +402,21 @@` → `+			expect(captureError(() => program.execute({ id: 'x', aggregate: {} }))).toMatchObject({`
- `… @@ -431,8 +424,8 @@` → `+				createQualificationDefinition('q', 'Q', [], {`
- `… @@ -442,33 +435,22 @@` → `+				createQualificationDefinition('q', 'Q', [gates], {`
- `… @@ -629,14 +611,9 @@` → `+			expect(captureError(() => program.execute(eligibleSubject))).toMatchObject({`
- `… @@ -745,14 +722,9 @@` → `+			expect(`
- `… @@ -779,14 +751,9 @@` → `+			expect(`
- `… @@ -836,14 +803,9 @@` → `+			expect(captureError(() => program.execute(eligibleSubject))).toMatchObject({`
- `… @@ -884,7 +846,11 @@` → `+					createQualificationDefinition(`
- `… @@ -911,7 +877,11 @@` → `+					createQualificationDefinition(`
- `… @@ -932,13 +902,13 @@` → `+					createQualificationDefinition(`
- `… @@ -956,9 +926,13 @@` → `+					createQualificationDefinition(`
- `… @@ -1015,7 +989,11 @@` → `+					createQualificationDefinition(`
- `… @@ -1030,10 +1008,10 @@` → `+		it('always exposes tallies in STATUSES order', () => {`
- `… @@ -1053,14 +1031,11 @@` → `+			expect(`
- `tests/src/core/validators.test.ts @@ -31,8 +31,8 @@` → `+import { createQualificationDefinition } from '@orkestrel/qualifier'`
- `… @@ -125,7 +125,7 @@` → `+						partition: 'location',`
- `… @@ -490,8 +490,8 @@` → `+				createQualificationDefinition('qualification', 'Qualification', []),`

**Residue.** Diff `+` lines matching `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hit. Tree `src` + `tests/src` + `tests/setup.ts` + `tests/setup.test.ts` + `tests/guides.test.ts` (excluding vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`): same pattern: no hit.

**Parity.**

`ProgramInterface` call-signature members vs `## Methods` `#### ProgramInterface`:

| Member | `types.ts` | `guides/program.md` |
|---|---|---|
| `execute` (batch) | `:282` | `:407` `execute` |
| `execute` (single) | `:313` | same row `:407` |
| `validate` | `:337` | `:408` |
| `destroy` | `:356` | `:409` |

Readonly data vs Surface `:148`: `id` `:241`, `name` `:243`, `definition` `:245`, `emitter` `:250` — Surface names `id` / `name` / `definition` / `emitter`.

`ProgramManagerInterface`:

| Member | `types.ts` | `guides/program.md` |
|---|---|---|
| `has` | `:421` | `:427` |
| `program` | `:439` | `:428` |
| `programs` | `:460` | `:429` |
| `add` | `:490` | `:430` |
| `remove` (ids / id / none) | `:514`, `:532`, `:552` | `:431` |
| `destroy` | `:572` | `:432` |

Readonly data vs Surface `:151`: `emitter` `:396`, `count` `:403` — Surface names `emitter` / `count`.

`AggregateInput` / `AggregateDefinition` (diff-touched, no Methods table): `partition` `types.ts:52`, `:93`; Surface `:135`, `:138`.

Barrel `src/core/index.ts:1-8` is `export *` from `types`, `constants`, `errors`, `validators`, `helpers`, `factories`, `Program`, `ProgramManager`. Backticked identifiers on guide `+` prose/table lines that name package symbols: `partition`, `count`, `STATUSES`, `completeTallies`, `isTallies`, `Status`, `buildNoticeDeterminations`, `buildLimitDeterminations`, `tallySubject`, `assertProgramDefinition`, `isProgramDefinition`, `emitter`, `has`, `program`, `programs`, `add`, `remove`, `destroy`, `FieldPath` — all except `FieldPath` (contract) and property names `partition`/`count`/`emitter`/method names (not barrel bindings) are re-exported through that barrel. `ruleToPremises` on a `+` line (`program.md` helpers prose) is a qualifier export, not this barrel.

**Gates.** Report § Gates quoted:

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | `gate-2-lint-check.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

Those files exist under `/home/user/work/evidence/program-proofs/`. `gate-5-test.txt` `Tests` lines: `216 passed (216)`, `111 passed (111)`, `46 passed (46)`, `85 passed (85)`, `26 passed (26)`.

**Breaking.** Report entries: `STATUS_PRECEDENCE` → `STATUSES`; `ProgramManagerInterface.size` → `count`; `AggregateInput.by` / `AggregateDefinition.by` → `partition`; `buildNotices` → `buildNoticeDeterminations`; `buildLimits` → `buildLimitDeterminations`; `tallyProgram` → `tallySubject`. Consumers: none. Word-boundary sweep of `STATUS_PRECEDENCE`, `buildNotices`, `buildLimits`, `tallyProgram` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src` (excluding `node_modules`, `/home/user/fleet/program`, vendored `guides/program.md` mirrors): no hit.

**Writing sweep.** Population: diff `+` lines in `guides/**`, `README.md`, `src/**` doc comments, `tests/**` titles and comments. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` (case-insensitive): no hit in that prose population. Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit. (JS `new X(` appears on `+` lines in `tests/setup.ts` fixture **bodies**, outside titles/comments: e.g. `+		throw new Error('Unexpected qualification')` at the `createOffContractQualifier` block.)

## Distillate

- program-obj-1: site now `tests/setup.ts:92` class / `:609` factory | diff present yes | old form hits 0 | report matches yes
- program-obj-2: site now `tests/setup.ts:618` | diff present yes | old form hits 0 | report matches yes
- program-obj-3: site now `tests/guides.test.ts:192` | diff present yes | old form hits 0 | report matches no (`:192-268` vs file end `:266`)
- program-obj-4: site now `ProgramManager.test.ts:40` + imports | diff present yes | old form hits 0 | report matches yes
- program-obj-5: site now `tests/setup.ts:400,414,434,532-548,690` | diff present yes | old form hits 0 | report matches yes
- program-obj-6: site now `factories.test.ts:98` | diff present yes (not verbatim one-liner) | old form hits 0 | report matches no (`:97-108` vs `it` at `:98`)
- program-obj-8: site now deleted | diff present yes | old form hits 0 | report matches yes
- program-obj-9: site now `helpers.ts:619-620` / `program.md:350` | diff present no (collapse unchanged) | old form hits 0 | report matches yes
- program-subj-1: site now citations stripped; several brief lines moved | diff present yes | old form hits 0 (owned paths) | report matches no (cited `:239,:250,:361,:235,:166,:401`)
- program-subj-2: site now `STATUS_PRECEDENCE` gone; `STATUSES` at consumers | diff present yes (guide sentence not verbatim repair) | old form hits 0 | report matches yes
- program-subj-3: site now `helpers.ts:202,242` | diff present yes | old form hits 0 | report matches no (`Program.ts:329,347,420` vs `:342,:360,:433`)
- program-subj-4: site now `types.ts:403` / `ProgramManager.ts:118` | diff present yes | old form hits 2 (`.size` on `Set` at `helpers.ts:537`, `setup.test.ts:479`) | report matches no (`types.ts:404`, `ProgramManager.ts:111`)
- program-subj-5: site now `errors.ts:44` | diff present yes | old form hits 0 | report matches yes
- program-subj-6: site now interface+class TSDoc | diff present yes | old form hits 0 | report matches no (range and overload-comment lines)
- program-subj-7: site now `program.md:151` | diff present yes | old form hits 0 | report matches yes
- program-subj-8: site now `program.md:316` | diff present yes | old form hits 0 | report matches yes
- program-subj-9: site now `README.md:24` | diff present yes | old form hits 0 | report matches yes
- program-subj-10: site now helpers/ProgramManager/program.md token prose | diff present yes | old form hits 0 | report matches yes
- program-subj-11: site now count prose rewritten | diff present yes | old form hits 0 (banned counts); `above|below` 6 operator hits; `two subjects` at `Program.test.ts:968` | report matches no (`program.md:176` blank; `setup.test.ts:804` vs `:806`)
- program-subj-12: site now four `through` sites | diff present yes | old form hits 0 | report matches yes
- program-subj-13: site now `types.ts:52,93` `partition` | diff present yes | old form hits 0 (member shape) | report matches no (`Program.ts:382` vs `:389,:395`; `setup.test.ts:832-834` vs `:836`)
- program-subj-14: site now `types.ts:220,:376` `Default:` | diff present yes (boolean form, not finder one-liner) | old form hits 0 | report matches no (`:219` lacks `Default:`)
- program-subj-16: site now `helpers.ts:870` | diff present yes | old form hits 0 | report matches no (`Program.ts:384` vs `:397`)
- fleet-F1: site now folded into obj-8 | diff present yes (same deletion) | old form hits 0 | report matches yes
- fleet-F2: site now `#` fields before `id` on `Program` | diff present no | old form hits 0 | report matches yes

Scope tags: 18 status paths, all `owned`; 0 `shared`; 0 `off-limits`. Extra owned file with no row Where: `src/core/factories.ts`, `tests/setup.test.ts`, `tests/src/core/programs/Program.test.ts`, `tests/src/core/validators.test.ts`.

Residue: diff `+` skip/only/todo/retry/timeout/TODO/FIXME/console./debugger: no hit. Tree src+owned tests: no hit.

Writing: prose `+` banned-English: no hit. Count-over-growable-set on those `+` lines: no hit.

Parity: `ProgramInterface` methods `execute`/`validate`/`destroy` align with `program.md:407-409`; data `id`/`name`/`definition`/`emitter` with Surface `:148`. `ProgramManagerInterface` methods `has`/`program`/`programs`/`add`/`remove`/`destroy` align with `:427-432`; data `emitter`/`count` with Surface `:151`.

## Unknowns

- Fleet-wide word-boundary sweep of English `size` and `by` (as distinct from member-shaped `by?:` / `manager.size` / `STATUS_PRECEDENCE` and the four unique helper names) was not enumerated hit-by-hit across every `/home/user/fleet/*/src` file.
- `program-obj-4` exact `context: 'standard'` on the first `+` line of the ProgramManager hunk was not re-quoted from the diff body (tree has `toMatchObject` at `ProgramManager.test.ts:40`).
- Vendored `guides/<dep>.md` `AGENTS §` / `via` hits were observed and excluded; not listed line-by-line.

## Journal

## Deviation

No tree change from this lane (read-only Grep/Read). Every named input file opened. Sweeps run with Grep over the brief's paths; no command mutated the tree.