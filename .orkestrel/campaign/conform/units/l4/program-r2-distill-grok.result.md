I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.The brief names several inputs. I’ll load the unit brief, audit brief, report, and evidence next.I’ll gather current sites, the unit diff, proof files, and the cited rule sentences in parallel.I’ll read the current sites the rows name, plus the proof summaries and the cited rule sentences.Next I’ll pin current line numbers against the report citations, then run the old-form and residue sweeps.## Question

For every row of unit conform-program, what does the tree at `/home/user/fleet/program` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

### program-obj-1

Rule quote (architecture.md § Functions and orchestration): "Never declare or assign a function inside another function or method. This bans local `function`, `function*`, and `const fn = () => ...`, regardless of caller count. The only in-body function expressions allowed are an anonymous callback passed directly as an argument and an anonymous function returned directly as the result (the factory/combinator pattern)."

1. **Site now.** Brief `tests/setup.ts:445` (nested `function reason`) is gone. The class sits beside `FixedReason` (`tests/setup.ts:42`). Current:

```91:93:tests/setup.ts
}

class RecordingReason implements RecordingEngineInterface {
	readonly #inner: ReasonInterface
```

`createRecordingEngine` body:

```608:611:tests/setup.ts
export function createRecordingEngine(options?: ReasonOptions): RecordingEngineInterface {
	return new RecordingReason(options)
}
```

Overload implementation uses `isArray<Subject>` at `tests/setup.ts:118-121`. Import: `tests/setup.ts:20` `import { isArray } from '@orkestrel/contract'`.

2. **Diff at the site.** `tests/setup.ts` `@@ -78,6 +89,64 @@` adds `class RecordingReason` (`+class RecordingReason implements RecordingEngineInterface {`). `@@ -435,53 +607,7 @@` replaces the nested `function reason` with `+	return new RecordingReason(options)`. Operative repair text present verbatim on that `+` line. `+		if (isArray<Subject>(subjectsOrSubject)) {` is in the class hunk.

3. **Old form sweep.** Removed nested `function reason` / local `function reason`. Pattern `\bfunction reason\b` over `src`, `tests`, `guides/program.md`, `guides/README.md`, `README.md` (exclude `node_modules`): no hit. Inflections `function reasons|reasoned|reasoning` as a nested declaration: no hit of the nested-declaration form.

4. **Report reading.** Disposition `applied`. Sentence: "`tests/setup.ts:81` declares `class RecordingReason implements RecordingEngineInterface` beside `FixedReason`; `createRecordingEngine` at `:481` is `return new RecordingReason(options)`. The nested `function reason` is gone. `isArray<Subject>` from `@orkestrel/contract` narrows the overload implementation (closes the `program-obj-7` clause the repair names). `tests/setup.test.ts` `createRecordingEngine` assertions are unchanged." Cited `:81` now is inside `FixedReason.destroy`; class is `:92`. Cited `:481` now is not `createRecordingEngine` (`:609`). Substance of the class/`return new RecordingReason(options)`/`isArray` holds at the current lines.

5. **Proof reading.** Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`. Report red `1 failed, 84 passed (85)` / green `85 passed (85)`. File `/home/user/work/evidence/program-proofs/program-obj-1-red.txt` exists: `Tests  1 failed | 84 passed (85)`; FAIL line `createRecordingEngine > counts every destroy, so a suite can prove an owned engine was released once`. Green file: `Tests  85 passed (85)`.

### program-obj-2

Rule quote: "Never declare or assign a function inside another function or method. This bans local `function`, `function*`, and `const fn = () => ...`, regardless of caller count."

1. **Site now.** Brief `tests/setup.ts:494` (`const record = …`) is gone. Current `recordEvents`:

```617:625:tests/setup.ts
export function recordEvents(program: ProgramInterface): EventRecorderInterface {
	const names: Array<keyof ProgramEventMap> = []
	program.emitter.on('qualify', () => {
		names.push('qualify')
	})
	program.emitter.on('rate', () => {
		names.push('rate')
	})
```

Same inline `names.push('<event>')` for determine, decide, execute, aggregate, destroy through `:640`.

2. **Diff at the site.** `@@ -491,16 +617,27 @@`. Minus `const record = (name: keyof ProgramEventMap) => {`. Plus `program.emitter.on('qualify', () => {` / `names.push('qualify')` and the six siblings. Operative repair text present on those `+` lines.

3. **Old form sweep.** Removed `const record = (name: keyof ProgramEventMap) =>`. Pattern that assignment: no hit. Residual `\bconst record\b`: `src/core/programs/Program.ts:409`, `tests/setup.test.ts:535`, `tests/src/core/helpers.test.ts:753` (different bindings). Inflections of the helper name `record` as `-s/-ed/-ing` are not the removed arrow.

4. **Report reading.** Disposition `applied`. Sentence: "`tests/setup.ts:508-528` — the `const record = …` arrow is gone and each of the `program.emitter.on` subscriptions pushes its own name inline." Cited `:508-528` is not that region now (`recordEvents` is `:618-649`). Inline pushes are present.

5. **Proof reading.** Same setup command. Report red `1 failed, 84 passed (85)` / green `85 passed (85)`. `program-obj-2-red.txt`: `Tests  1 failed | 84 passed (85)`; FAIL `recordEvents > records every wired event name, in the order the emitter fired it`. Green: `Tests  85 passed (85)`.

### program-obj-3

Rule quote (tests.md § Cross-cutting proofs): "Transcribe each flagship fence and assert the values its comments claim. Name resolution is not a behavioural proof, so a fence documenting a value the code contradicts passes every parity assertion. Change a fence, change the transcription beside it." Table: `tests/guides.test.ts` proves "every executable fence returns what the guide says it returns". documentation.md: "That proof has a home: `tests/guides.test.ts` executes the flagship fences".

1. **Site now.** Brief `tests/guides.test.ts:1` still opens the file; the added suite is after the parity loop:

```191:195:tests/guides.test.ts
beside it.
describe('flagship fences', () => {
	const guideText = requireValue(files[CORE_GUIDE], `Missing file: ${CORE_GUIDE}`)

	it('returns the Surface fence values for an eligible and an ineligible subject', () => {
```

Assertions `eligible.status` / `rating?.total` / ineligible / batch `result.count` etc. at `:231-249`; `program.destroy()` in `finally` at `:250-252`; presence guards `:255-265`.

2. **Diff at the site.** `@@ -168,3 +181,86 @@` first `+` of the suite: `+describe('flagship fences', () => {`. Repair name `describe('flagship fences')` present. Also `@@ -1,8 +1,19 @@` (header/imports).

3. **Old form sweep.** No name removed. no hit (nothing to rename).

4. **Report reading.** Disposition `applied`. Sentence: "`tests/guides.test.ts:206-260` adds `describe('flagship fences')` beside the parity suite…". Cited `:206` is `createQualificationDefinition(`, not `describe`. `describe('flagship fences')` is `:192`. Presence guards and transcription exist.

5. **Proof reading.** Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`. Report red `1 failed, 25 passed (26)` / green `26 passed (26)`. `program-obj-3-red.txt`: `Tests  1 failed | 25 passed (26)`; FAIL `flagship fences > carries the batch fence lines the transcription copies`. Green: `Tests  26 passed (26)`.

### program-obj-4

Rule quote (tests.md § Shared test infrastructure): "`@orkestrel/test` owns the helpers every workspace repeats… Write a helper of your own only where the package exports none for the job." / "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form." / "Never reimplement a framework helper in tests or fixtures; import the real parser, signer, flattener, or other helper."

1. **Site now.** Brief `ProgramManager.test.ts:43` is no longer a try/catch. Current:

```36:44:tests/src/core/programs/ProgramManager.test.ts
	describe('add', () => {
		it('throws DUPLICATE with the id string as context', () => {
			const manager = createProgramManager()
			manager.add(standardProgramDefinition)
			expect(captureError(() => manager.add(standardProgramDefinition))).toMatchObject({
				code: 'DUPLICATE',
				context: 'standard',
			})
```

Imports: `ProgramManager.test.ts:6`, `factories.test.ts:7`, `helpers.test.ts:5`, `Program.test.ts:15`. `toSatisfy` at `factories.test.ts:27-30`. `JSON.parse('"subject"')` inside thunk at `Program.test.ts:415-418`.

2. **Diff at the site.** `ProgramManager.test.ts` `@@ -40,27 +37,20 @@` first `+` `expect(captureError(() => manager.add(standardProgramDefinition))).toMatchObject({`. `Program.test.ts` `@@ -402,28 +402,21 @@` first `+` `expect(captureError(() => program.execute({ id: 'x', aggregate: {} }))).toMatchObject({`. `JSON.parse` inside thunk on `+					const subject: Subject = JSON.parse('"subject"')`. `captureError` present in `+` lines. factories/helpers hunks likewise.

3. **Old form sweep.** `let error: unknown` over field-3 paths: no hit. `expect.unreachable`: `tests/config.test.ts:1042`, `tests/config.test.ts:1212` only (vendored). Inflections of that block: no other `let error: unknown` hit.

4. **Report reading.** Disposition `applied`. Sentence claims the replacement, the three imports, `factories.test.ts:30` `toSatisfy`, `Program.test.ts:410` JSON.parse in thunk, setup.test.ts cleanup untouched, sweep empty. `toSatisfy` is `:27` not `:30`. JSON.parse is `:416` not `:410`. `let error: unknown` empty matches. `expect.unreachable` still in vendored `tests/config.test.ts`.

5. **Proof reading.** Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`. Report red `1 failed, 73 passed (74)` / green `74 passed (74)`. `program-obj-4-red.txt`: `Tests  1 failed | 73 passed (74)`; FAIL `helpers > assertProgramSubject > throws RESERVED with the offending key as context`. Green: `Tests  74 passed (74)`.

### program-obj-5

Rule quote: "Extract a fixture, recorder, event factory, async wait, renderer, scenario/data builder, protocol fixture, or DOM builder as soon as it could serve another test." / "Export every reusable helper, fixture type, factory, constant, and guard from setup files." / "Test files import shared infrastructure rather than declaring local fixture factories." / "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form."

1. **Site now.** Brief `helpers.test.ts:78` local classes are gone (`:78` is now `it('throws RESERVED…')`). Moved to `tests/setup.ts`: `class OffContractValidationResult` `:400`, `OffContractQualifier` `:414`, `OffContractReason` `:434`, `createOffContractValidationResult` `:532`, `createOffContractQualifier` `:536`, `createOffContractReason` `:540`, `buildQualificationResult` `:544`, `buildStandardProgramDefinition` `:690`. `FixedReason` remains `:42` unmerged. Proofs in `tests/setup.test.ts` `describe('createOffContractValidationResult')` `:550` and siblings `:560`, `:580`, `:604`, `:634`.

2. **Diff at the site.** `tests/setup.ts` `@@ -328,6 +397,81 @@` first `+class OffContractValidationResult implements ReasonValidationResult {`. `@@ -385,6 +529,34 @@` factories including `+export function buildQualificationResult(`. `@@ -547,17 +686,22 @@` `+export function buildStandardProgramDefinition(id: string): ProgramDefinition {`. `helpers.test.ts` `@@ -73,98 +63,7 @@` deletes the locals. Names `createOffContractQualifier` / `createOffContractReason` / `buildQualificationResult` / `buildStandardProgramDefinition` present in `+` lines. Not merged into `FixedReason`.

3. **Old form sweep.** `\bScriptedQualifier\b` `\bScriptedReason\b` `\bbuildQualification\b` `\bbuildDefinition\b` over field-3 paths: no hit. Case-insensitive inflections `(scriptedqualifier|scriptedreason|buildqualification|builddefinition)(s|es|ed|ing)?`: no hit (`buildQualificationResult` / `buildQualificationSubject` / `buildStandardProgramDefinition` do not match the old word-boundary names).

4. **Report reading.** Disposition `applied`. Cited class/factory lines (`:353`, `:367`, `:388`, `:472`, `:476`, `:480`, `:484`, `:604`) do not match now (`:400`, `:414`, `:434`, `:532`, `:536`, `:540`, `:544`, `:690`). Names and "FixedReason was not merged" hold.

5. **Proof reading.** Setup command as obj-1. Report red `1 failed, 84 passed (85)` / green `85 passed (85)`. `program-obj-5-red.txt`: `Tests  1 failed | 84 passed (85)`; FAIL `buildStandardProgramDefinition > names the definition after the given id and reuses the standard pair by identity`. Green: `Tests  85 passed (85)`. Sweep agreement: old names empty, agrees with report's empty sweep for those identifiers.

### program-obj-6

Rule quote (tests.md § Discovery and adequacy audit): "confirm each assertion would fail for the defect it claims to catch, and that it fails rather than passes when its population is empty".

1. **Site now.** Brief `factories.test.ts:113` moved. Current:

```97:109:tests/src/core/factories.test.ts
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
		})
```

`it('seeds programs from options')` remains immediately above (`:91-96`).

2. **Diff at the site.** `factories.test.ts` `@@ -67,53 +62,50 @@` contains the rewritten case. `+		it('defaults validate to true', () => {` and `+			expect(captureError(() => validating.add(definition))).toMatchObject({ code: 'DEFINITION' })` and `+			expect(permissive.add(definition).id).toBe('')` present.

3. **Old form sweep.** No rename. The old body `manager.size === 0` is gone (see subj-4). no hit for that assertion.

4. **Report reading.** Disposition `applied`. Sentence cites `factories.test.ts:97-108`. Current `it(…)` is `:98-108`; `:97` is blank. Body matches the sentence.

5. **Proof reading.** Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts`. Report red `1 failed, 6 passed (7)` / green `7 passed (7)`. `program-obj-6-red.txt`: `Tests  1 failed | 6 passed (7)`; FAIL `factories > createProgramManager > defaults validate to true`. Green: `Tests  7 passed (7)`.

### program-obj-8

Rule quote (architecture.md § System constraints): "Build or substantively expand a capability with its first real consumer; do not speculate." / "Do not expand the capability set without concrete need." AGENTS.md: "Minimal public API. Add or substantively expand a capability with its first real consumer; do not speculate."

1. **Site now.** Brief `tests/setup.ts:989` `isBrowserVuePath` is gone. That line region is now hostile-subject / eligibility-only fixtures (`:1023-1028`). No `isBrowserVuePath` in the tree. `tests/setup.test.ts` has no `describe('isBrowserVuePath')`; import list has `isSubjectArray` at `:76` and no `isBrowserVuePath`.

2. **Diff at the site.** `tests/setup.ts` `@@ -978,15 +1122,9 @@` deletes `export function isBrowserVuePath`. `tests/setup.test.ts` `@@ -67,7 +73,6 @@` `-	isBrowserVuePath,` and `@@ -898,16 +1002,3 @@` `-describe('isBrowserVuePath', () => {`. Deletion present; no `+isBrowserVuePath`.

3. **Old form sweep.** `\bisBrowserVuePath\b` over field-3 paths: no hit. Case-insensitive `isbrowservuepath(s|es|ed|ing)?`: no hit.

4. **Report reading.** Disposition `applied`. Sentence: deleted from setup.ts / describe and import deleted / grep empty. Absence matches. No remaining `file:line` of the helper to check.

5. **Proof reading.** Placement/naming row. Report sweep `grep -rn isBrowserVuePath` empty. Field-3 sweep agrees (no hit).

### program-obj-9

Rule quote (AGENTS.md § Design laws): "**Absence is `undefined`.** Never invent sentinels such as `'none'`, `'unset'`, `'unknown'`, `''`, or `-1`."

1. **Site now.** Brief `helpers.ts:624` moved to `:619-620`. Remarks at `:599-606`:

```618:621:src/core/helpers.ts
export function formatGroupKey(subject: Subject, partition: FieldPath): string {
	return String(resolveField(subject, partition) ?? '')
}
```

Guide still states the collapse: `guides/program.md:350`.

2. **Diff at the site.** helpers hunks `@@ -610,7 +606,7 @@` and `@@ -620,8 +616,8 @@` rename `by` → `partition` on this function; the `?? ''` expression is unchanged (context, not a `+` of a new sentinel). Operative repair is "No change" for the sentinel: no `+` line replaces `?? ''`.

3. **Old form sweep.** No name removed for this row. no hit.

4. **Report reading.** Disposition `noop (EXEMPT)`. Sentence: no change; limit at `src/core/helpers.ts:601-605` and `guides/program.md:349`. Remarks are `:603-606`; guide sentence is `:350`. `?? ''` still present. Disposition matches the tree.

5. **Proof reading.** Documentation/exempt row. Report points at remarks/guide; those sentences exist (line numbers drifted by 1–2).

### program-subj-1

Rule quote (writing.md): "Claim only what the reader can check." (documentation.md): "`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides."

1. **Site now.** Brief sites vs current (citation gone; sentences intact):

- `guides/README.md:3` "A dual-axis index into this repository's guides — by concept, and by directory." (`:2` `# Guides`, `:4` blank)
- `guides/README.md:58` "- [`AGENTS.md`](../AGENTS.md) — the rules." (`:57` `## See also`)
- `guides/program.md:28` "`Program`'s typed `emitter`. Source: [`src/core`](../src/core)." (brief `:29`)
- `guides/program.md:93` "The array overload is declared FIRST and performs one aggregate-aware batch"
- `guides/program.md:155` "and each name is single-word within its entity. Qualifier"
- `src/core/types.ts:194` "Describes the push observation surface of a {@link ProgramInterface}."
- `src/core/types.ts:239-240` "The array-of-subjects `execute` overload is declared FIRST so a subject list / resolves to one aggregate-aware batch execution."
- `src/core/types.ts:360` "Describes the push observation surface of a {@link ProgramManagerInterface}."
- `src/core/types.ts:391` "Defines an ordered manager over compiled programs, sharing one qualifier and rater."
- `src/core/helpers.ts:125-126` "Explicit policy, not an opaque precedence reduce: global"
- `src/core/programs/ProgramManager.ts:21-22` "Manages compiled {@link ProgramInterface} programs in order, sharing one"
- `src/core/programs/Program.ts:166` `// Array overload first so a subject list resolves to the batch form.`
- `src/core/programs/ProgramManager.ts:231` `// Array overload first so an id list resolves to the batch form.`

2. **Diff at the site.** README `@@ -1,6 +1,6 @@` `+A dual-axis index… by directory.` `@@ -55,4 +55,4 @@` `+- [`AGENTS.md`](../AGENTS.md) — the rules.` program.md `@@ -26,7 +26,7 @@` drops `(AGENTS §13)`. types `@@ -191,7 +191,7 @@` `+ * Describes the push observation surface of a {@link ProgramInterface}.` Same pattern on other sites. Verbatim repair strings present on those `+` lines.

3. **Old form sweep.** `AGENTS §` over field-3 paths (`src`, `tests`, `guides/program.md`, `guides/README.md`, `README.md`): no hit. (Hits exist only in other `guides/*.md` mirrors, outside this sweep population.) Inflections not applicable to `§N`.

4. **Report reading.** Disposition `applied`. Sentence lists `types.ts:193,238,252,384`, `helpers.ts:127`, `ProgramManager.ts:21,225`, `Program.ts:165`, `program.md:29,93,153,401,423`, `guides/README.md:3`, `:58` reads the rules. README `:3` and `:58` match. Several src/guide citations are off by a few lines vs current (e.g. Program.ts comment is `:166` not `:165`; ProgramManager overload comment is `:231` not `:225`). Sweep empty on owned population matches.

5. **Proof reading.** Report sweep `grep -rn "AGENTS §"` over package-owned files empty. Field-3 sweep agrees. (Mirrors still contain `AGENTS §`; they are off-limits / outside field-3 paths.)

### program-subj-2

Rule quote: "**Derive state.** Compute facts from existing fields. Do not store a second flag or label that can drift." / "**One concept, one term.** Do not alternate synonyms." documentation.md: "Falsify a prose claim the way you falsify a code claim. The parity test proves a name exists, never that a sentence about behavior is true."

1. **Site now.** Brief `constants.ts:17-23` `STATUS_PRECEDENCE` is gone. File ends the `STATUSES` array at `:14` then `ELIGIBILITY_DECISIONS` at `:16-21`. `helpers.ts:36` imports `STATUSES`; loop `:850` `for (const status of STATUSES)`. `validators.ts:35` `import { STATUSES } from './constants.js'`; `isTallies` `:264-267` uses `STATUSES.every`. `{@link STATUSES}` at `helpers.ts:837`, `validators.ts:251`. `Program.test.ts:13` `import { STATUSES } from '@src/core'`; `:1011-1014` `Object.keys(result.tallies)).toEqual([...STATUSES])`. Guide Constants has no `STATUS_PRECEDENCE` row (`guides/program.md:164-168`); prose `:172-175`.

2. **Diff at the site.** `constants.ts` `@@ -13,15 +13,6 @@` deletes `export const STATUS_PRECEDENCE`. helpers `@@ -31,14 +31,9 @@` `+import { AGGREGATE_KEY, ELIGIBILITY_DECISIONS, OUTCOME_KEY, STATUSES } from './constants.js'`. validators `@@ -32,7 +32,7 @@` `+import { STATUSES } from './constants.js'`. `+ * Every {@link Status} in {@link STATUSES} is required and checked.` program.md deletes the Constants row and rewrites prose. Repair names present in `+` / deletions.

3. **Old form sweep.** `\bSTATUS_PRECEDENCE\b` field-3 paths: no hit. Case-insensitive `status_precedence(s|es|ed|ing)?`: no hit.

4. **Report reading.** Disposition `applied (BREAKING)`. Sentence: deleted; helpers `:846` / validators `:260` iterate `STATUSES`; links `:832` / `:245`; `Program.test.ts:13`. Current iterate lines `:850` and `:266`; links `:837` and `:251`. Import lines `:36` and `:35` match. `Status` type import narrowed: `constants.ts:1` `import type { Decision } from './types.js'` matches the oxlint follow-up.

5. **Proof reading.** Naming row. Report empty sweep. Field-3 sweep agrees.

### program-subj-3

Rule quote (names.md preamble): "Names are public API. A consumer can predict them without documentation." AGENTS.md: "**One concept, one term.** Do not alternate synonyms."

1. **Site now.** Brief `helpers.ts:206` / `:999`: declarations are `buildNoticeDeterminations` `:202` and `buildLimitDeterminations` `:242`. `buildNotice` remains `:996`. `Program.ts:39-40` imports; calls `:328`, `:346`, `:419`. Guide rows `:286-287`. `helpers.test.ts` import `:19-20`; describes `:246`, `:916`, `:989`.

2. **Diff at the site.** helpers `@@ -198,12 +194,12 @@` / `@@ -218,14 +214,14 @@` rename `buildNotices` → `buildNoticeDeterminations`; sibling hunks rename `buildLimits` → `buildLimitDeterminations`. program.md `@@ -286,8 +283,8 @@` `+| `buildNoticeDeterminations` |`. Verbatim new names on `+` lines. No `+buildNotices`.

3. **Old form sweep.** `\bbuildNotices\b` `\bbuildLimits\b` field-3 paths: no hit. Inflections `buildnotices(s|es|ed|ing)?` `buildlimits(s|es|ed|ing)?`: no hit (`buildLimitDeterminations` / `buildNoticeDeterminations` do not match).

4. **Report reading.** Disposition `applied (BREAKING)`. Sentence: rename in helpers; `Program.ts:39-40`, `:281`, `:299`, `:409`; guide `:286-287`. Current calls are `:328`, `:346`, `:419` not `:281/:299/:409`. Import `:39-40` and guide `:286-287` match. `buildNotice` unchanged at `:996`.

5. **Proof reading.** Naming row. Report empty sweep. Field-3 sweep agrees.

### program-subj-4

Rule quote (names.md § Tallies): "A lone unambiguous tally is `count`. When several distinct tallies coexist, name each fact: a pool may expose `size`, `idle`, and `active`."

1. **Site now.** Brief `types.ts:287` `readonly size` is gone. Current:

```397:402:src/core/types.ts
	readonly emitter: EmitterInterface<ProgramManagerEventMap>
	/**
	 * Holds how many programs the manager has compiled.
	 *
	 * @throws {@link ProgramError} `'DESTROYED'` after `destroy`
	 */
	readonly count: number
```

`ProgramManager.ts:110` `get count(): number {`. Tests use `manager.count` e.g. `factories.test.ts:93`, `ProgramManager.test.ts:24`, `:31`.

2. **Diff at the site.** types `@@ -281,16 +388,179 @@` `-	readonly size: number` `+	readonly count: number`. ProgramManager `@@ -74,30 +74,139 @@` includes `get count()`. `+	readonly count: number` present verbatim.

3. **Old form sweep.** `\.size\b` field-3 paths: `src/core/helpers.ts:537` (`lines.size`), `tests/setup.test.ts:477` (`Set(…).size`), plus vendored `tests/setupPolicy.ts:1325`, `:1528`, `tests/config.test.ts:42`, `:687`. `\bsizes\b|\bsized\b|\bsizing\b` in field-3 owned files (`src`, `guides/program.md`, `README.md`, non-mirror tests listed above aside from vendored guides): no hit in `src` / `guides/program.md` / `README.md` / `tests/src` / `tests/guides.test.ts` / `tests/setup.ts`. Guide `size` as manager tally: no hit.

4. **Report reading.** Disposition `applied (BREAKING)`. Sentence: `types.ts:387` `readonly count`; `ProgramManager.ts:118` `get count()`; tests `factories.test.ts:96,104`; ProgramManager.test listed sites. Current `readonly count` is `:402` not `:387` (`:387` is `on?:`). `get count()` is `:110` not `:118`. `factories.test.ts:93` has `manager.count`; `:104` is the captureError line. Titles now say `count` (`ProgramManager.test.ts:20`, `:157`).

5. **Proof reading.** Naming row. Report `.size` two Set hits at `helpers.ts:536` and `setup.test.ts:477`. Current Set hits: `helpers.ts:537`, `setup.test.ts:477`. Agrees aside from helpers line +1. Extra vendored `.size` hits exist under `tests/` (field-3 includes them).

### program-subj-5

Rule quote: "**One concept, one term.** Do not alternate synonyms."

1. **Site now.** Brief `errors.ts:44` now:

```43:45:src/core/errors.ts
/**
 * Determines whether a caught value is a {@link ProgramError}.
 *
```

2. **Diff at the site.** `@@ -41,7 +41,7 @@` `+ * Determines whether a caught value is a {@link ProgramError}.` Verbatim.

3. **Old form sweep.** `Checks whether` / `checking whether` / `checked whether` over field-3 paths: no hit.

4. **Report reading.** Disposition `applied`. Sentence: `src/core/errors.ts:44` reads that sentence. **That line now carries it.** Sweep empty in `src` matches.

5. **Proof reading.** Documentation row. Sweep agrees (no hit).

### program-subj-6

Rule quote (typescript.md): "Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable." / "State a prerequisite and the failure behavior wherever the symbol has either."

1. **Site now.** Brief `types.ts:242-251` / `:285-296` are now fully blocked interfaces: `ProgramInterface` `:242-358` (members with blocks from `:243`), `ProgramManagerInterface` `:392-566`. Implementing docs on `Program.ts` (e.g. `:86-91` data, `:162` `get emitter`, `:166` overload `//` comment then execute block) and `ProgramManager.ts` (`:77` emitter block, `:95` count block, `:231` overload `//`).

2. **Diff at the site.** types `@@ -236,21 +236,128 @@` and `@@ -281,16 +388,179 @@` add the blocks. Program `@@ -141,12 +144,87 @@` etc. ProgramManager `@@ -74,30 +74,139 @@`. `+	/** Holds the authored id of the definition this program compiled. */` and `@example` / `@throws {@link ProgramError}` present. Overload notes stay `//` on `+	// Array overload first so a subject list resolves to the batch form.`

3. **Old form sweep.** No rename. no hit.

4. **Report reading.** Disposition `applied`. Sentence cites `types.ts:242-352` and `:386-556`, Program/ProgramManager member lines. Interfaces start at `:242` and `:392` (not `:386`). Member line citations (Program `:150`, `:168`…; ProgramManager `:76`, `:92`, `:111`…) do not all match current numbers (`get emitter` ProgramManager is `:91`; `get count` `:110`). TSDoc is present on members. `@example` imports `'@orkestrel/program'`.

5. **Proof reading.** Documentation row. Report does not record an old-name sweep for this row (no old name). N/A agreement.

### program-subj-7

Rule quote (documentation.md § Parity): "Readonly data properties remain in the interface's `## Surface` row."

1. **Site now.** Brief `guides/program.md:151`:

```150:152:guides/program.md
| `ProgramManagerOptions`   | interface | `{ qualifier?, rater?, engine?, programs?, validate?, labels?, on?, error? }`.                                                                 |
| `ProgramManagerInterface` | interface | `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`.                                                           |
```

Sibling `:148` still names `id` / `name` / `definition` / `emitter`.

2. **Diff at the site.** `@@ -148,10 +148,10 @@` `+| `ProgramManagerInterface` | interface | `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`.                                                           |`. Verbatim `count` (not `size`).

3. **Old form sweep.** Phrase "Ordered program manager with singular/plural accessors and lifecycle": no hit. Manager tally `size` in `guides/program.md`: no hit.

4. **Report reading.** Disposition `applied`. Sentence: `:151` Shape cell reads that backtick list. **That line now carries it.**

5. **Proof reading.** Documentation row. Sweep of old Shape prose: no hit; agrees.

### program-subj-8

Rule quote (documentation.md § Guide examples): "Code fences import through the package's published specifier."

1. **Site now.** Brief `guides/program.md:318-328`:

```314:326:guides/program.md
```ts
import {
	assertProgramDefinition,
	assertProgramSubject,
	decideEligibility,
	hasReservedKey,
	selectProgramLines,
} from '@orkestrel/program'

hasReservedKey({ id: 'r1' }) // false
…
assertProgramDefinition(definition) // throws ProgramError('MISSING' | 'DUPLICATE') at construction, regardless of options.validate
```

2. **Diff at the site.** `@@ -316,6 +313,7 @@` `+	assertProgramDefinition,` as first import entry. Verbatim.

3. **Old form sweep.** No name removed. no hit.

4. **Report reading.** Disposition `applied`. Sentence: `guides/program.md:316` first import entry. Current first entry is `:316`. **Matches.**

5. **Proof reading.** Documentation row. No old-form name. Presence of the import is the proof; tree has it.

### program-subj-9

Rule quote (writing.md): "Claim only what the reader can check."

1. **Site now.** Brief `README.md:24`:

```23:25:README.md
- Node.js >= 22.12.0
- ESM (`import`) and CommonJS (`require`) through the `exports` field
```

2. **Diff at the site.** `@@ -21,15 +21,15 @@` `+- Node.js >= 22.12.0`. Verbatim.

3. **Old form sweep.** `Node.js >= 24` over field-3 paths: no hit.

4. **Report reading.** Disposition `applied`. Sentence: `README.md:24` reads `- Node.js >= 22.12.0`. **That line now carries it.**

5. **Proof reading.** Documentation row. Sweep agrees (no hit for `>= 24`).

### program-subj-10

Rule quote (writing.md): "Put a code token in backticks and follow it with a noun: the `parse` method, the `vite.config.ts` file, the `--check` flag. Never inflect, pluralize, or possessivize a code token, and never use one as an English verb."

1. **Site now.** Brief sites:

- `helpers.ts:183-184` "Resolves authored {@link Notice} values into unconditionally-applied `notice` / {@link Determination} values."
- `helpers.ts:217` "Converts a logical result's applied rules into `limit` {@link Determination} values."
- `helpers.ts:221` "are plain {@link LogicalDefinition} definitions with no program-authored ruling map, so a"
- `ProgramManager.ts:21` "Manages compiled {@link ProgramInterface} programs in order, sharing one"
- `guides/program.md:138` "`{ fields, partition?, gates? }` — batch sums (`FieldPath` values)"
- `helpers.ts:985` "The message template, carrying optional `{{token}}` placeholders"

2. **Diff at the site.** helpers `@@ -184,8 +180,8 @@` Notice/Determination rewrites; `@@ -218,14 +214,14 @@` Determination/LogicalDefinition; ProgramManager `@@ -18,7 +18,7 @@`; program.md types row; `@@ -985,7 +982,7 @@` `+ * @param message - The message template, carrying optional `{{token}}` placeholders`. Verbatim repair strings present.

3. **Old form sweep.** `\{@link \w+\}s` / `` `FieldPath`s `` / `` `{{token}}`s `` over `src` and `guides/program.md`: no hit.

4. **Report reading.** Disposition `applied`. Sentence cites `helpers.ts:185-186`, `:219`, `:223`, ProgramManager `:21`, program.md `:138`, helpers `:982`. Current text is at `:183-184`, `:217`, `:221`, ProgramManager `:21` (matches), program.md `:138` (matches), helpers `:985` not `:982`. Substance matches; two helpers citations drifted.

5. **Proof reading.** Documentation row. Plural-token sweep empty; agrees.

### program-subj-11

Rule quote (AGENTS.md § Writing): "**NEVER state a count.** A number answering \"how many\" about a set anyone can add to is a count — rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets. Name the members, or write the sentence without the number. … Delete a count you find. Do not correct it."

1. **Site now.**

- `helpers.ts:814` `@returns A record carrying every {@link Status}`
- `validators.ts:344-345` "This guard therefore checks the / program-owned members directly"
- `guides/program.md:170-171` "The reserved keys exist only for composed / program execution"
- `guides/program.md:533` "(a decision gate, listed later)"
- `guides/program.md:552-553` "A `decision` is present only when / every gate holds:"
- `guides/program.md:176` still uses `both` in "both the per-subject authority…" wait — that `both` is `helpers.ts:220` not program.md:176. program.md:172-175 is the STATUSES prose; `:176` is blank before `### Errors`. Report left `both` at `program.md:176`; current `both` at `:220` in helpers (authority and gates), not `:176`.

2. **Diff at the site.** helpers `@@ -813,7 +811,7 @@` `+ * @returns A record carrying every {@link Status}`. validators `@@ -341,7 +341,7 @@`. program.md `@@ -163,19 +163,16 @@` reserved-keys sentence; `@@ -533,7 +530,7 @@`; `@@ -552,8 +549,8 @@`. Verbatim finder rewrites present.

3. **Old form sweep.** Exact old phrases `five statuses` / `three program-owned` / `two reserved` / `four decision` / `all four gates`: no hit. Pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` over `src` and `guides/program.md`: no hit.

4. **Report reading.** Disposition `applied`. Sentence cites `helpers.ts:810`, `validators.ts:338`, program.md `:171`, `:533`, `:553`, `both` at `:176` left alone. Current `@returns` is `:814` not `:810`; validators prose `:344-345` not `:338`; program.md `:170-171`, `:533`, `:552-553`. `both` is not at `program.md:176`.

5. **Proof reading.** Report count-word sweep empty for the `\d+ (elements|…)` pattern; field-3 `src` + `guides/program.md` growable-set pattern empty. Agrees for those patterns. Report also records leftover counts at `tests/setup.test.ts:465`, `:723` (tree: `:465` not re-read here; `:723` is `give the property rating two lines…`).

### program-subj-12

Rule quote (writing.md § Substitutions): table row `` `via` `` → `` `through`, `by using` ``.

1. **Site now.** `README.md:25` "through the `exports` field". `guides/program.md:701` "exact shape through `isProgramDefinition`". `helpers.test.ts:1035` `it('derives unrated for zero-line programs through real qualification'`. `tests/setup.ts:1125` "OWN keys through JSON parsing".

2. **Diff at the site.** README `@@ -21,15 +21,15 @@` `+… through the `exports` field`. program.md `@@ -704,7 +698,7 @@` `+1. exact shape through `isProgramDefinition`. helpers.test `@@ -1109,7 +1032,7 @@` `+		it('derives unrated for zero-line programs through real qualification', () => {`. setup.ts `@@ -978,15 +1122,9 @@` `+/** … OWN keys through JSON parsing. */`. `through` present; no `+via`.

3. **Old form sweep.** `\bvia\b` case-insensitive over `src`, `tests`, `guides/program.md`, `guides/README.md`, `README.md`: no hit. Inflections of `via` N/A.

4. **Report reading.** Disposition `applied`. Sentence: README `:25`, program.md `:704`, helpers.test `:1046`, setup.ts `:1024`. README `:25` matches. program.md current `:701` not `:704`. helpers.test `:1035` not `:1046`. setup.ts `:1125` not `:1024`. Word `through` is at those current lines.

5. **Proof reading.** Report `\bvia\b` empty. Field-3 sweep agrees.

### program-subj-13

Rule quote (names.md): "Describe what a thing is, not its implementation." / "Properties are nouns; methods are verbs."

1. **Site now.** Brief `types.ts:52` and `:93`:

```51:54:src/core/types.ts
export interface AggregateInput {
	readonly partition?: FieldPath
	readonly gates?: LogicalDefinition
}
```

```91:94:src/core/types.ts
export interface AggregateDefinition {
	readonly fields: readonly FieldPath[]
	readonly partition?: FieldPath
	readonly gates?: LogicalDefinition
}
```

`@remarks` `:47` "`partition` — the field a batch partitions on". `formatGroupKey` param `:609` `partition`. `isAggregateDefinition` keys `:114-115` `partition`. `Program.ts:375` `definition?.partition`; `:381` `definition.partition`. `tests/setup.ts:902` `{ partition: 'location' }`. `setup.test.ts:825`, `:834`.

2. **Diff at the site.** types `@@ -44,12 +44,12 @@` `+ * `partition` — the field a batch partitions on…` `+	readonly partition?: FieldPath`. `@@ -87,10 +87,10 @@` same on `AggregateDefinition`. helpers/validators/Program/tests/guide hunks replace `by` with `partition`. `+	readonly partition?: FieldPath` verbatim.

3. **Old form sweep.** Word-boundary `\bby\b` over field-3 paths — hits (English preposition, not the member):  
`src/core/helpers.ts:94,232,494,630,664,688,691,731,892,944`; `src/core/programs/ProgramManager.ts:137`; `src/core/programs/Program.ts:174`; `src/core/types.ts:33,44,57,215,220,261,377,421`; `src/core/errors.ts:4`; `guides/program.md:27,134,135,578,604,645,694,709,712,728`; `tests/setup.ts:1119`; `tests/setup.test.ts:10,14,635,658,832,874,909`; `tests/src/core/programs/Program.test.ts:875`; `tests/src/core/helpers.test.ts:884`; `tests/src/core/factories.test.ts:17`; vendored `tests/distribution.test.ts:267,268,335,349,706`; `tests/setupPolicy.ts:38,57,65,127,171,249,445,673,797,1147,1203,1239,1410,1731,1742,2341,2623,2790`; `tests/policy.test.ts:281,491,497,502`; `tests/config.test.ts:129,203,278,498`.  
Member/key forms `by?:` / `[{,] by:` / `\.by\b` as aggregate field: no hit. Inflections `bys|byed|bying`: no extra member form.

4. **Report reading.** Disposition `applied (BREAKING)`. Sentence: `types.ts:51` and `:92` `partition`, remarks `:46` and `:62`, helpers reads, validators `:112-115`, `Program.ts:373` and `:379`, tests `setup.ts:781`, `setup.test.ts:726,735`, guide sites. Current types `:52` and `:93` (interface `partition` lines). `Program.ts` reads `:375`, `:381` not `:373/:379`. `setup.ts:902` not `:781`. `setup.test.ts:825,:834` not `:726,:735`. `isAggregateDefinition` `:112-115` matches the validator citation band. Guide `:135`, `:138` now carry `partition`.

5. **Proof reading.** Report `\bby\?|\.by\b|[{,] by:` empty. Member-form sweep agrees. Word-boundary `\bby\b` is not empty (English `by`); report did not claim `\bby\b` empty.

### program-subj-14

Rule quote (typescript.md): "Write a default as \"Default: …\" and a thrown error as \"Thrown when …\"."

1. **Site now.**

```217:219:src/core/types.ts
 * owned when omitted. `validate` — validate the definition at
 * construction. Default: {@link DEFAULT_PROGRAM_VALIDATE}. `labels` —
 * field-to-label overrides for determination premises, keyed by dot-joined
```

```375:376:src/core/types.ts
 * `validate` — validate each seeded and added definition at construction.
 * Default: {@link DEFAULT_PROGRAM_VALIDATE}. `labels` — field-to-label
```

2. **Diff at the site.** `@@ -216,7 +216,7 @@` `+ * construction. Default: {@link DEFAULT_PROGRAM_VALIDATE}. `labels` —`. Manager options hunk the same `Default:` form. Verbatim.

3. **Old form sweep.** `(default ` over `src`: no hit.

4. **Report reading.** Disposition `applied`. Sentence: `types.ts:217-218` and `:369-370`. Current ProgramOptions Default is `:218-219` (`:217` is still the engine sentence). Manager Default is `:375-376` not `:369-370`. The `Default:` text is present.

5. **Proof reading.** Documentation row. `(default ` empty in `src`; agrees.

### program-subj-16

Rule quote (names.md § Standalone helpers): "Module helpers have no owning entity at the call site, so default to `{verb}{Noun}`" / "Describe what a thing is, not its implementation."

1. **Site now.** Brief `helpers.ts:873`:

```869:870:src/core/helpers.ts
export function tallySubject(
```

`@example` `:865-867` uses `tallySubject`. `Program.ts:46` import; `:383` call. `helpers.test.ts:32` import; `:767` call. Guide `:305`.

2. **Diff at the site.** helpers `@@ -865,12 +862,12 @@` `+ * tallySubject(…)` `+export function tallySubject(`. program.md `@@ -305,7 +302,7 @@` `` `tallySubject` ``. Verbatim. No `+tallyProgram`.

3. **Old form sweep.** `\btallyProgram\b` field-3 paths: no hit. Inflections `tallyprogram(s|es|ed|ing)?`: no hit.

4. **Report reading.** Disposition `applied (BREAKING)`. Sentence: helpers `:867` / example `:862`; Program `:46` and `:381`; helpers.test `:32` and `:770`; guide `:305`. Current export `:870`; example `:867`; Program call `:383`; helpers.test call `:767`; import `:32` and guide `:305` match.

5. **Proof reading.** Naming row. Empty sweep agrees.

### fleet-F1

1. **Site now.** `isBrowserVuePath` absent (see program-obj-8). `tests/setup.ts` is not export-free (many exports). Header does not name `isBrowserVuePath`.

2. **Diff at the site.** Same deletion hunks as program-obj-8. No second independent edit hunk.

3. **Old form sweep.** Same as program-obj-8: no hit.

4. **Report reading.** Disposition `applied by program-obj-8`. Sentence: folded; no header clause; not export-free; no second edit; setup axis kept. Absence of helper matches. Did not inspect `vite.config.ts` / `test:setup` beyond the report (those files are not in the status list).

5. **Proof reading.** Same empty `isBrowserVuePath` sweep; agrees.

### fleet-F2

Rule quote (architecture.md § Class order): "`#` private fields: context, options, state/result, child managers." then constructor, then "Public interface: getters, then methods."

1. **Site now.** `Program.ts:73-91`: all `#` fields (`#emitter` … `#destroyed`) then `readonly id` / `name` / `definition` (public data fields, not ahead of `#`). `ProgramManager.ts:37-48`: only `#` fields, no `id`. `ProgramError` `src/core/errors.ts:23-41`: no `#` field, no `id`.

2. **Diff at the site.** No hunk converts `readonly id` to `#id` + getter. Shape-absent noop: no repair `+` text.

3. **Old form sweep.** No rename. no hit.

4. **Report reading.** Disposition `noop`. Sentence: `Program.ts:74-89` `#` first then `readonly id`; ProgramManager `:38-48` `#` only; ProgramError no `id`. Current Program `#` block `:74-84`, public fields `:87-91`. ProgramManager `:38-48` matches. Classes named match.

5. **Proof reading.** Placement row. Report lists classes read; tree matches that shape. No `JSON.stringify` of Program instances checked in this lane (row says to read before applying; disposition is noop).

---

### Scope

Status paths (`/home/user/work/evidence/conform-program.status`), tagged against the brief § Scope:

| Path | Tag |
| --- | --- |
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/program.md` | owned |
| `src/core/constants.ts` | owned |
| `src/core/errors.ts` | owned |
| `src/core/helpers.ts` | owned |
| `src/core/programs/Program.ts` | owned |
| `src/core/programs/ProgramManager.ts` | owned |
| `src/core/types.ts` | owned |
| `src/core/validators.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.test.ts` | owned (named in fleet-F1 Where) |
| `tests/setup.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/programs/Program.test.ts` | owned |
| `tests/src/core/programs/ProgramManager.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |

No status entry is shared or off-limits. 18 paths, all owned.

Hunks whose **Where** field names no file (Repair/Wrong may still name them):

`tests/src/core/programs/Program.test.ts`
- `@@ -1,7 +1,7 @@` first `+`: `import { buildLineDefinition, buildRatingDefinition, createRater } from '@orkestrel/rater'`
- `@@ -10,7 +10,7 @@` first `+`: `import { STATUSES } from '@src/core'`
- `@@ -61,7 +61,7 @@` first `+`: `import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'`
- `@@ -247,8 +247,8 @@` first `+`: `buildRatingDefinition('owned-rating', 'Owned rating', [`
- `@@ -402,28 +402,21 @@` first `+`: `expect(captureError(() => program.execute({ id: 'x', aggregate: {} }))).toMatchObject({`
- `@@ -431,8 +424,8 @@` first `+`: `createQualificationDefinition('q', 'Q', [], {`
- `@@ -442,33 +435,22 @@` first `+`: `createQualificationDefinition('q', 'Q', [gates], {`
- `@@ -629,14 +611,9 @@` first `+`: `expect(captureError(() => program.execute(eligibleSubject))).toMatchObject({`
- `@@ -745,14 +722,9 @@` first `+`: `expect(`
- `@@ -779,14 +751,9 @@` first `+`: `expect(`
- `@@ -836,14 +803,9 @@` first `+`: `expect(captureError(() => program.execute(eligibleSubject))).toMatchObject({`
- `@@ -884,7 +846,11 @@` first `+`: `createQualificationDefinition(`
- `@@ -911,7 +877,11 @@` first `+`: `createQualificationDefinition(`
- `@@ -932,13 +902,13 @@` first `+`: `createQualificationDefinition(`
- `@@ -956,9 +926,13 @@` first `+`: `createQualificationDefinition(`
- `@@ -1015,7 +989,11 @@` first `+`: `createQualificationDefinition(`
- `@@ -1030,10 +1008,10 @@` first `+`: `it('always exposes tallies in STATUSES order', () => {`
- `@@ -1053,14 +1031,11 @@` first `+`: `expect(`

`tests/src/core/validators.test.ts`
- `@@ -31,8 +31,8 @@` first `+`: `import { createQualificationDefinition } from '@orkestrel/qualifier'`
- `@@ -125,7 +125,7 @@` first `+`: `partition: 'location',`
- `@@ -490,8 +490,8 @@` first `+`: `createQualificationDefinition('qualification', 'Qualification', []),`

### Residue

Diff `+` lines vs `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hit.

Tree `src` and `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`: no hit. (Excluded files do contain `TODO`/`debugger`/`console.`/`timeout`/`skip` as their own fixtures.)

### Parity

**ProgramInterface** call-signature members (`src/core/types.ts`) vs `guides/program.md` `## Methods` / `#### \`ProgramInterface\``:

| Member | types.ts | Methods table |
| --- | --- | --- |
| `execute` | `:284` (array), `:315` (single) | `:407` |
| `validate` | `:338` | `:408` |
| `destroy` | `:357` | `:409` |

Readonly data: `id` `:244`, `name` `:246`, `definition` `:248`, `emitter` `:253`. Surface row `guides/program.md:148` `` `id` / `name` / `definition` / `emitter` + `execute` / `validate` / `destroy` ``.

**ProgramManagerInterface** call-signature members vs `#### \`ProgramManagerInterface\``:

| Member | types.ts | Methods table |
| --- | --- | --- |
| `has` | `:419` | `:427` |
| `program` | `:436` | `:428` |
| `programs` | `:456` | `:429` |
| `add` | `:486` | `:430` |
| `remove` | `:509` (array), `:526` (id), `:545` (all) | `:431` |
| `destroy` | `:565` | `:432` |

Readonly data: `emitter` `:396`, `count` `:402`. Surface row `guides/program.md:151` `` `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy` ``.

Barrel `src/core/index.ts:1-8` is `export *` from `types`, `constants`, `errors`, `validators`, `helpers`, `factories`, `programs/Program`, `programs/ProgramManager`.

Backticked identifiers in **added** guide/README sentences (diff `+` in `guides/**`, `README.md`), and barrel export:

| Identifier | In added sentence | Barrel exports? |
| --- | --- | --- |
| `emitter` | program.md tagline / Surface | no (member) |
| `src/core` | link text | n/a (path) |
| `count` | Surface row | no (member) |
| `has` `program` `programs` `add` `remove` `destroy` | Surface row | `Program`/`ProgramManager` classes exported; members are not separate exports |
| `ELIGIBILITY_DECISIONS` `STATUSES` `Status` `isStatus` `completeTallies` `isTallies` | Constants prose | yes (`constants` / `types` / `validators` / `helpers` star-exports) |
| `buildNoticeDeterminations` `buildLimitDeterminations` `tallySubject` | Helpers table | yes (`helpers`) |
| `assertProgramDefinition` | import first entry | yes (`helpers`) |
| `partition` | types/fence/validation list | no (member) |
| `isProgramDefinition` | validation list | yes (`validators`) |
| `FieldPath` | AggregateDefinition summary | no (`import type` in `types.ts:1`, not re-exported) |
| `decision` `status` | notices/authority prose | `Status` type yes; `decision` is a field name |
| `import` `require` `exports` | README requirements | no (English/npm tokens) |
| `AGENTS.md` | README see-also (kept) | no |
| `createQualificationDefinition` `createRuling` `buildLineDefinition` `buildRatingDefinition` | fences | no (dependency fences, not this barrel) |
| `ruleToPremises` | helpers prose hunk | no (qualifier export) |

### Gates

Report § Gates, verbatim:

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | `gate-2-lint-check.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

Those five files exist under `/home/user/work/evidence/program-proofs/`. Observed summaries: format-check "All matched files use the correct format."; lint-check header only; check `tsc --noEmit` then `check:src:core`; build vite production; `gate-5-test.txt` `src:core` `Tests  216 passed (216)`, policy `111`, config `46`, setup `85`, guides `26`. Files do not themselves print `exit 0`.

### Breaking

Report § Breaking, published surface:

| Removed or renamed | Replacement |
| --- | --- |
| `STATUS_PRECEDENCE` (const) | `STATUSES`, which carries the same literals in the same order |
| `ProgramManagerInterface.size` | `ProgramManagerInterface.count` |
| `AggregateInput.by`, `AggregateDefinition.by` | `partition` on each |
| `buildNotices` | `buildNoticeDeterminations` |
| `buildLimits` | `buildLimitDeterminations` |
| `tallyProgram` | `tallySubject` |

Consumers: report "none". Word-boundary sweeps excluding `/home/user/fleet/program`, `node_modules`, and vendored `guides/program.md` mirrors:

- `\bSTATUS_PRECEDENCE\b` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`: no hit
- `\bbuildNotices\b`: no hit
- `\bbuildLimits\b`: no hit
- `\btallyProgram\b`: no hit
- `\bsize\b` / `\.size\b`: hits in other packages are `Set`/`Map`/stat/`section.size` etc. (tool listed 50 then truncated). No listed hit is `ProgramManagerInterface.size` / `manager.size` as this package's member. Sample: `workflow/src/core/WorkflowManager.ts:71` `return this.#workflows.size`; `brief/src/core/BriefManager.ts:66` `return this.#records.size`.
- `\bby\b`: not fully enumerated fleet-wide (volume). Member form `by?: FieldPath` was the finding's fleet search; not re-run to completion here.

### Writing sweep

Population: diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles and comments in `tests/**`.

Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` on those prose `+` lines: no hit.  
(The same pattern on **all** diff `+` lines hits only constructor code, not titles/comments/docs: `tests/setup.test.ts` `new Error('Unexpected qualification')` / `'Unexpected reasoning'` / `'Unexpected reasoner registration'`; `tests/setup.ts` `throw new Error(…)` / `return new OffContractValidationResult()` / `new OffContractQualifier()` / `new OffContractReason()` / `return new RecordingReason(options)`.)

Growable-set count `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on diff `+` lines: no hit.

## Distillate

- program-obj-1: site now `tests/setup.ts:92` `RecordingReason` / `:609` `return new RecordingReason(options)` | diff present yes | old form hits 0 | report matches no (cited `:81`/`:481`)
- program-obj-2: site now `tests/setup.ts:618-640` inline `names.push` | diff present yes | old form hits 0 (arrow gone) | report matches no (cited `:508-528`)
- program-obj-3: site now `tests/guides.test.ts:192` `describe('flagship fences')` | diff present yes | old form hits 0 | report matches no (cited `:206-260` for describe)
- program-obj-4: site now `ProgramManager.test.ts:40` `captureError` | diff present yes | old form hits 2 (`expect.unreachable` vendored `tests/config.test.ts:1042,1212`) | report matches no (`:30` `toSatisfy` is `:27`; JSON.parse is `:416` not `:410`)
- program-obj-5: site now `tests/setup.ts:400-544,690` factories | diff present yes | old form hits 0 | report matches no (cited class/factory lines drifted)
- program-obj-6: site now `factories.test.ts:98-108` | diff present yes | old form hits 0 | report matches no (cited `:97-108`; `it` is `:98`)
- program-obj-8: site now absent | diff present yes (deletion) | old form hits 0 | report matches yes (absence)
- program-obj-9: site now `helpers.ts:619-620` still `?? ''` | diff present no (sentinel) | old form hits 0 | report matches no (cited `:601-605`/`:349`; now `:603-606`/`:350`)
- program-subj-1: site now citations stripped; README `:3,:58` match | diff present yes | old form hits 0 (field-3) | report matches no (several src/guide lines drifted)
- program-subj-2: site now `STATUS_PRECEDENCE` absent; `STATUSES` loops `:850`/`:266` | diff present yes | old form hits 0 | report matches no (iterate/link lines drifted)
- program-subj-3: site now `buildNoticeDeterminations` `:202` / `buildLimitDeterminations` `:242` | diff present yes | old form hits 0 | report matches no (Program.ts call lines drifted)
- program-subj-4: site now `types.ts:402` `count` / `ProgramManager.ts:110` `get count` | diff present yes | old form hits 6 (`\.size` Set/Map in field-3 including vendored) | report matches no (cited `:387`/`:118`)
- program-subj-5: site now `errors.ts:44` "Determines whether…" | diff present yes | old form hits 0 | report matches yes
- program-subj-6: site now TSDoc on both interfaces | diff present yes | old form hits 0 | report matches no (interface/member line band drifted)
- program-subj-7: site now `guides/program.md:151` `emitter` / `count` + methods | diff present yes | old form hits 0 | report matches yes
- program-subj-8: site now `guides/program.md:316` `assertProgramDefinition,` | diff present yes | old form hits 0 | report matches yes
- program-subj-9: site now `README.md:24` `Node.js >= 22.12.0` | diff present yes | old form hits 0 | report matches yes
- program-subj-10: site now noun-after-token at helpers/ProgramManager/guide | diff present yes | old form hits 0 | report matches no (helpers `:982` is `:985`)
- program-subj-11: site now count phrases rewritten | diff present yes | old form hits 0 (exact old phrases; growable-set pattern empty in `src`+`program.md`) | report matches no (`both` not at `program.md:176`)
- program-subj-12: site now `through` at README `:25`, program.md `:701`, helpers.test `:1035`, setup.ts `:1125` | diff present yes | old form hits 0 | report matches no (three of four citations drifted)
- program-subj-13: site now `types.ts:52,:93` `partition` | diff present yes | old form hits 73 (`\bby\b` English); member form 0 | report matches no (many cited lines drifted)
- program-subj-14: site now `Default:` at `types.ts:218-219` and `:375-376` | diff present yes | old form hits 0 | report matches no (cited `:217-218`/`:369-370`)
- program-subj-16: site now `tallySubject` `helpers.ts:870` | diff present yes | old form hits 0 | report matches no (export/call lines drifted)
- fleet-F1: site now folded into obj-8 | diff present yes | old form hits 0 | report matches yes (folded; helper absent)
- fleet-F2: site now `#` fields before public `id` on `Program` | diff present no | old form hits 0 | report matches yes (shape absent)

Scope tags: 18 status paths, all `owned`; 0 `shared`; 0 `off-limits`. Extra Where-less hunks: `tests/src/core/programs/Program.test.ts` (18 hunks), `tests/src/core/validators.test.ts` (3 hunks).

Residue: diff `+` skip/only/todo/retry/timeout/TODO/FIXME/console./debugger: 0. Tree `src`+`tests` minus four vendored files: 0.

Writing: prose `+` banned-word hits 0; growable-set count on `+` lines 0.

Parity: `ProgramInterface` methods `execute`/`validate`/`destroy` match table `:407-409`; data on Surface `:148`. `ProgramManagerInterface` methods `has`/`program`/`programs`/`add`/`remove`/`destroy` match table `:427-432`; data `emitter`/`count` on Surface `:151`. Added-guide backticks: barrel yes for `STATUSES`, `ELIGIBILITY_DECISIONS`, `Status`, `isStatus`, `completeTallies`, `isTallies`, `buildNoticeDeterminations`, `buildLimitDeterminations`, `tallySubject`, `assertProgramDefinition`, `isProgramDefinition`; barrel no for members `emitter`/`count`/`partition`/`has`/… and for `FieldPath` (types.ts import-only).

## Unknowns

- fleet-F2: whether any test/guide `JSON.stringify`s a `Program` instance (row's pre-apply check); not swept.
- fleet-F1: `vite.config.ts` `setup` project and `package.json` `test:setup` not in the status file; not opened.
- Breaking `\bsize\b` / `\bby\b` across `/home/user/fleet/*/src` and `*/tests`: `.size` listing truncated at 50; `\bby\b` not fully listed outside program.
- Gate **process** exit codes: quoted from the report; proof files show successful output only, no `exit_code` footer.
- Inflection sweeps of awkward concatenations (`buildNoticesed`, `STATUS_PRECEDENCEing`, `bying`) inferred empty from the case-insensitive name greps; not every concatenation compiled as a separate pattern string.
- Report leftover count sites `tests/setup.test.ts:465` and `tests/guides.test.ts:48` / `guides/program.md:932` not re-read line-by-line in this pass (`:723` was read and still has "two lines").
- `program-obj-7` is named in obj-1's repair and report but is not a row in this brief.

## Journal

## Deviation

No tree change from this lane (read-only; no create/edit/delete; no mutating command). Every named input file was readable. Sweeps that did not run to a complete hit list: fleet-wide `\bby\b`, and fleet-wide `\bsize\b` past the first 50 `.size` hits. Diff writing-word grep over all `+` lines was filtered down to prose categories after the fact; constructor `new` lines were excluded as non-prose.