I'll read the brief in full first, then follow its instructions exactly and return only the sections it names.I'll load the unit brief, audit brief, report, and evidence files next so the per-row map can be built from those sources.I'll gather current tree sites, the unit diff, and the named law sentences in parallel so each row can be mapped without editing anything.The first sweeps show several sites have moved; I'll read those current regions and pull the matching diff hunks next.I'll pull remaining current sites, diff hunks, and the old-form / residue / writing sweeps next.## Question

For every row of unit conform-program, what does the tree at `/home/user/fleet/program` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law quotes are the sentence each row cites. Sweeps below cover `src`, `tests`, `guides/program.md`, `guides/README.md`, and `README.md` unless a field names another population; `node_modules/**` excluded.

### program-obj-1

Law: architecture.md:161–163 “Never declare or assign a function inside another function or method. This bans local `function`, `function*`, and `const fn = () => ...`, regardless of caller count. The only in-body function expressions allowed are an anonymous callback passed directly as an argument and an anonymous function returned directly as the result (the factory/combinator pattern).”

1. **Site now.** Brief `tests/setup.ts:445` is no longer the nested `function reason`. Current `:445` is OffContractReason’s implementation parameter:

```443:447:tests/setup.ts
	reason(
		_subjectsOrSubject: readonly Subject[] | Subject,
		_definition: Definition,
	): readonly ReasonResult[] | ReasonResult {
```

Symbol moved: `class RecordingReason` beside `FixedReason` at `:92`; `createRecordingEngine` at `:609` is `return new RecordingReason(options)`. `FixedReason` is now `:42` (brief said line 31). Overload body uses `isArray<Subject>` (`tests/setup.ts:20`, `:118`).

2. **Diff at the site.** `tests/setup.ts` `@@ -78,6 +89,64 @@` adds the class (`+class RecordingReason implements RecordingEngineInterface {`). `@@ -435,53 +607,7 @@` replaces the nested `function reason` body with `+	return new RecordingReason(options)`. Repair text present verbatim on that `+` line.

3. **Old form sweep.** Removed form: nested `function reason`. Pattern `\bfunction reason\b` over `src` `tests` `guides/program.md` `guides/README.md` `README.md`: no hit. Inflections `function reasons|reasoned|reasoning` not required for a nested declaration; `const record` is obj-2.

4. **Report reading.** Disposition `applied`. Sentence: “`tests/setup.ts:92` declares `class RecordingReason implements RecordingEngineInterface`; `createRecordingEngine` at `tests/setup.ts:609` returns `new RecordingReason(options)`. The nested `function reason` is gone. `isArray<Subject>` from `@orkestrel/contract` narrows the overload implementation.” Those lines now carry that text (`:92`, `:609–610`, `:118`).

5. **Proof reading.** Report: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` — red `1 failed, 84 passed (85)` `program-obj-1-red.txt`; green `85 passed (85)` `program-obj-1-green.txt`. Files exist. Red: `Tests  1 failed | 84 passed (85)` and `FAIL  |setup| tests/setup.test.ts > createRecordingEngine > counts every destroy, so a suite can prove an owned engine was released once`. Green: `Tests  85 passed (85)`.

### program-obj-2

Law: architecture.md:161–162 “Never declare or assign a function inside another function or method. This bans local `function`, `function*`, and `const fn = () => ...`, regardless of caller count.”

1. **Site now.** Brief `:494` is no longer `const record = …`. Current `:494` is `export function createFixedRater`. `recordEvents` is at `:618–640`; each subscription inlines `names.push('<event>')`.

```618:624:tests/setup.ts
export function recordEvents(program: ProgramInterface): EventRecorderInterface {
	const names: Array<keyof ProgramEventMap> = []
	program.emitter.on('qualify', () => {
		names.push('qualify')
	})
```

2. **Diff at the site.** `tests/setup.ts` `@@ -491,16 +617,27 @@`. `+` lines include `+		names.push('qualify')` through `destroy`. Repair text present.

3. **Old form sweep.** Pattern `const record = \(name` over named paths: no hit. `\brecordEvents\b` remains (kept name).

4. **Report reading.** `applied`. “`tests/setup.ts:618-640` contains `recordEvents`; each `program.emitter.on` subscription pushes its own event name inline, and no local `record` arrow remains.” Matches `:618–640`.

5. **Proof reading.** Same setup command. Red `program-obj-2-red.txt`: `Tests  1 failed | 84 passed (85)`; `FAIL  |setup| tests/setup.test.ts > recordEvents > records every wired event name, in the order the emitter fired it`. Green `program-obj-2-green.txt`: `Tests  85 passed (85)`.

### program-obj-3

Law: tests.md:70 “Transcribe each flagship fence and assert the values its comments claim.” documentation.md:37 “That proof has a home: `tests/guides.test.ts` executes the flagship fences”.

1. **Site now.** Brief `tests/guides.test.ts:1` still opens the file:

```1:3:tests/guides.test.ts
// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants declared next are this
// package's own, and are the only part a sibling package changes.
```

Added block: `describe('flagship fences'` at `:192`; assertions `:231–249`; `program.destroy()` in `finally` `:250–252`; presence guards `:255–265`.

2. **Diff at the site.** `tests/guides.test.ts` `@@ -1,8 +1,19 @@` first `+` is the constants-comment rewrite; `@@ -168,3 +181,86 @@` first `+describe('flagship fences', () => {`. Repair text present (`flagship fences`, `eligible.status`, `result.count ===` as `toBe(2)`, presence `toContain`).

3. **Old form sweep.** No name removed. no hit.

4. **Report reading.** `applied`. “`tests/guides.test.ts:192-268` contains `describe('flagship fences')`, the executed Surface and batch assertions, cleanup under `finally`, and the presence guards.” `describe` is `:192`; block ends `:266`. Cited range carries that content.

5. **Proof reading.** Report: guides project command; red `1 failed, 25 passed (26)` `program-obj-3-red.txt`; green `26 passed (26)`. Red file: `Tests  1 failed | 25 passed (26)`; `FAIL  |guides| tests/guides.test.ts > flagship fences > carries the batch fence lines the transcription copies`. Green: `Tests  26 passed (26)`.

### program-obj-4

Law: tests.md:174 “`@orkestrel/test` owns the helpers every workspace repeats… Write a helper of your own only where the package exports none for the job.” tests.md:181 “Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.” tests.md:186 “Never reimplement a framework helper in tests or fixtures; import the real parser, signer, flattener, or other helper.”

1. **Site now.** Brief `ProgramManager.test.ts:43` is now the `context` line of a `captureError` assertion:

```40:44:tests/src/core/programs/ProgramManager.test.ts
			expect(captureError(() => manager.add(standardProgramDefinition))).toMatchObject({
				code: 'DUPLICATE',
				context: 'standard',
			})
```

Imports: ProgramManager.test.ts:6, factories.test.ts:7, helpers.test.ts:5; Program.test.ts:15 already had it.

2. **Diff at the site.** `ProgramManager.test.ts` `@@ -40,27 +37,20 @@` first `+` is the `captureError` DUPLICATE expect. Same conversion hunks in factories.test.ts, helpers.test.ts, Program.test.ts. Repair text present (`captureError`, `toMatchObject({ code: 'DUPLICATE', context: 'standard' })`). JSON.parse-inside-thunk present: Program.test.ts diff `+					const subject: Subject = JSON.parse('"subject"')`.

3. **Old form sweep.** `let error: unknown` over `src` `tests` `guides/program.md` `guides/README.md` `README.md`: no hit. `expect.unreachable` in `tests/src`: no hit. Hits remain in vendored `tests/config.test.ts:1042,1212` (off-limits / excluded by report population). Inflections n/a.

4. **Report reading.** `applied`. Sweep claim: `grep -rn "let error: unknown\|expect.unreachable" tests/src tests/setup.ts tests/setup.test.ts` returns nothing. Agrees for those paths. Cleanup in setup.test.ts still uses `captureError` at `:565,:594,:597` (not the try/finally blocks the row left alone).

5. **Proof reading.** Report: helpers.test.ts src:core command; red `1 failed, 73 passed (74)`; green `74 passed (74)`. Files: red `Tests  1 failed | 73 passed (74)`; `FAIL  |src:core| tests/src/core/helpers.test.ts > helpers > assertProgramSubject > throws RESERVED with the offending key as context`. Green: `Tests  74 passed (74)`.

### program-obj-5

Law: tests.md:180 “Extract a fixture, recorder, event factory, async wait, renderer, scenario/data builder, protocol fixture, or DOM builder as soon as it could serve another test.” :182 “Export every reusable helper, fixture type, factory, constant, and guard from setup files.” :185 “Test files import shared infrastructure rather than declaring local fixture factories.”

1. **Site now.** Brief `helpers.test.ts:78` no longer declares local classes. Current `:78` is `describe('assertProgramSubject'`. Classes/factories in setup.ts: `OffContractValidationResult` `:400`, `OffContractQualifier` `:414`, `OffContractReason` `:434`, `createOffContractValidationResult` `:532`, `createOffContractQualifier` `:536`, `createOffContractReason` `:540`, `buildQualificationResult` `:544`, `buildStandardProgramDefinition` `:690`. setup.test.ts proofs `:550–645`.

2. **Diff at the site.** `tests/setup.ts` `@@ -328,6 +397,81 @@` first `+class OffContractValidationResult`. `@@ -385,6 +529,34 @@` factories. `helpers.test.ts` `@@ -73,98 +63,7 @@` deletes locals. Repair names present on `+` lines. Not merged into `FixedReason`.

3. **Old form sweep.** `\bScriptedQualifier\b` `\bScriptedReason\b` `\bbuildQualification\b` `\bbuildDefinition\b` over named paths: no hit. Inflection `-i` `(scriptedqualifier|scriptedreason|buildqualification|builddefinition)(s|es|ed|ing)`: no hit. `OffContractValidationResult` remains as the moved class (`tests/setup.ts:400`).

4. **Report reading.** `applied`. Pointers `:400`, `:414`, `:434`, `:532-548`, `:690` match.

5. **Proof reading.** Setup command; red `1 failed, 84 passed (85)` `program-obj-5-red.txt`; `FAIL  |setup| tests/setup.test.ts > buildStandardProgramDefinition > names the definition after the given id and reuses the standard pair by identity`. Green: `Tests  85 passed (85)`. Sweep in field 3 agrees (old names gone).

### program-obj-6

Law: tests.md:305 “confirm each assertion would fail for the defect it claims to catch, and that it fails rather than passes when its population is empty”.

1. **Site now.** Brief `factories.test.ts:113` no longer exists (file ends `:111`). Body moved to `:98–109`:

```98:109:tests/src/core/factories.test.ts
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

2. **Diff at the site.** `factories.test.ts` `@@ -67,53 +62,50 @@` contains `it('defaults validate to true'` with `+			expect(captureError(() => validating.add(definition))).toMatchObject({ code: 'DEFINITION' })` and `{ validate: false }`. Repair text present.

3. **Old form sweep.** No renamed symbol. `manager.size === 0` body removed (see subj-4).

4. **Report reading.** `applied`. “`tests/src/core/factories.test.ts:97-108` proves the default validation branch…” The `it` is at `:98`; claimed body is there (`:98–109`). One-line pointer drift.

5. **Proof reading.** factories.test.ts command; red `1 failed, 6 passed (7)`; `FAIL  |src:core| tests/src/core/factories.test.ts > factories > createProgramManager > defaults validate to true`. Green: `Tests  7 passed (7)`.

### program-obj-8

Law: architecture.md:288 “Build or substantively expand a capability with its first real consumer; do not speculate.” architecture.md:294 “Do not expand the capability set without concrete need.” AGENTS.md Design laws: “Minimal public API. Add or substantively expand a capability with its first real consumer; do not speculate.”

1. **Site now.** Brief `tests/setup.ts:989` is no longer `isBrowserVuePath`. Current `:989` is gate/authority error-propagation remarks on `buildBrokenLogicalDefinition`. Helper deleted; setup.test.ts import and `describe('isBrowserVuePath')` deleted.

2. **Diff at the site.** `tests/setup.ts` `@@ -978,15 +1122,9 @@` deletes `isBrowserVuePath` (`-export function isBrowserVuePath`). `tests/setup.test.ts` `@@ -67,7 +73,6 @@` `-	isBrowserVuePath,`; `@@ -898,16 +1002,3 @@` deletes the describe (no `+` line). Operative deletion present in `-` lines.

3. **Old form sweep.** `isBrowserVuePath` over named paths: no hit. `-i` `isbrowservuepath(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied`. Sweep claim empty: agrees.

5. **Proof reading.** Not behavioural. Report sweep empty; field 3 agrees.

### program-obj-9

Law: AGENTS.md Design laws: “**Absence is `undefined`.** Never invent sentinels such as `'none'`, `'unset'`, `'unknown'`, `''`, or `-1`.”

1. **Site now.** Brief `helpers.ts:624` was `String(resolveField(subject, by) ?? '')`. Function is now `:619–620`; collapse remains with `partition`:

```602:620:src/core/helpers.ts
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

Guide: `guides/program.md:350` still states missing field and `''` land in the same partition.

2. **Diff at the site.** `helpers.ts` `@@ -620,8 +616,8 @@` / `@@ -610,7 +606,7 @@` rename `by` → `partition` only. `+	return String(resolveField(subject, partition) ?? '')`. Repair “No change” for the sentinel: the `?? ''` collapse is still on a `+` line only because the parameter was renamed (subj-13). Obj-9 operative repair (no change to the collapse) is present as retention.

3. **Old form sweep.** Row removes nothing. no hit for a removed name.

4. **Report reading.** `noop (EXEMPT)`. “The documented collapse remains at `src/core/helpers.ts:600-620` and `guides/program.md:350`.” Remarks start `:602`; function `:619`; guide `:350`. Matches.

5. **Proof reading.** Not behavioural. No old-form-to-remove sweep. Field 3 agrees.

### program-subj-1

Law: writing.md:38 “Claim only what the reader can check.” documentation.md:23 “`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.”

1. **Site now** (brief → current):
- `guides/README.md:3` still `:3` — “A dual-axis index into this repository's guides — by concept, and by directory.”
- `guides/README.md:58` still `:58` — “- [`AGENTS.md`](../AGENTS.md) — the rules.”
- `guides/program.md:29` now `:29` is the emitter/source line without `(AGENTS §13)` (`:29` `> Program`'s typed `emitter`. Source: [`src/core`](../src/core).`).
- `:93` “The array overload is declared FIRST and performs one aggregate-aware batch”
- `:154` “Every public data member is `readonly`…” (AGENTS parenthetical dropped at `:153` “within its entity.”)
- `:404` / `:426` → `:402` / `:423` prose without `(AGENTS §9.2)` / `(AGENTS §9)`
- `types.ts:194` → `:193` “Describes the push observation surface of a {@link ProgramInterface}.”
- `:239` “The array-of-subjects `execute` overload is declared FIRST so a subject list”
- `:253` ProgramManagerEventMap → `:361` “Describes the push observation surface of a {@link ProgramManagerInterface}.”
- `:284` ProgramManagerInterface → `:392` “Defines an ordered manager over compiled programs, sharing one qualifier and rater.”
- `helpers.ts:129` → `:125` “Explicit policy, not an opaque precedence reduce: global”
- `ProgramManager.ts:21` “Manages compiled {@link ProgramInterface} programs in order, sharing one”
- `ProgramManager.ts:122` overload comment → `:235` `// Array overload first so an id list resolves to the batch form.`
- `Program.ts:148` → `:166` `// Array overload first so a subject list resolves to the batch form.`

2. **Diff at the site.** `guides/README.md` `@@ -1,6 +1,6 @@` `+A dual-axis index… directory.` `@@ -55,4 +55,4 @@` `+- [\`AGENTS.md\`](../AGENTS.md) — the rules.` `types.ts` `@@ -191,7 +191,7 @@` strips `(AGENTS §13)`. Repair text present verbatim on those `+` lines.

3. **Old form sweep.** `AGENTS §` over `src` `tests/setup.ts` `tests/setup.test.ts` `tests/guides.test.ts` `tests/src` `guides/program.md` `guides/README.md` `README.md`: no hit. Hits remain in vendored `guides/qualifier.md`, `guides/reason.md`, `guides/rater.md`, `guides/guide.md`, `guides/emitter.md` (shared / off-limits mirrors). Inflections n/a.

4. **Report reading.** `applied`. Lists `types.ts:193,239,250,361`. `:193` and `:239` and `:361` match stripped citations. `:250` is now ProgramInterface.emitter TSDoc (“Holds the typed observation surface…”), not an AGENTS site; original `:253` is `:361`. Pointer `:250` does not name the ProgramManagerEventMap sentence.

5. **Proof reading.** Report `AGENTS §` sweep empty on owned paths: agrees with field 3 for owned paths.

### program-subj-2

Law: AGENTS.md “**Derive state.** Compute facts from existing fields. Do not store a second flag or label that can drift.” “**One concept, one term.** Do not alternate synonyms.” documentation.md:37 “Falsify a prose claim the way you falsify a code claim. The parity test proves a name exists, never that a sentence about behavior is true.”

1. **Site now.** Brief `constants.ts:17-23` no longer holds `STATUS_PRECEDENCE`. Current file ends `STATUSES` at `:8–14`, then `ELIGIBILITY_DECISIONS` at `:17`. Consumers: `helpers.ts:36` import `STATUSES`; `:850` `for (const status of STATUSES)`; `validators.ts:35` import; `:266` `STATUSES.every`. `completeTallies` literal `:826–832`. `Program.test.ts:13` `import { STATUSES }`; `:1011–1014` `STATUSES` order.

2. **Diff at the site.** `constants.ts` `@@ -13,15 +13,6 @@` deletes `STATUS_PRECEDENCE`. `helpers.ts` `@@ -849,8 +847,7 @@` / validators `@@ -263,7 +263,7 @@` `+		STATUSES.every`. Repair present.

3. **Old form sweep.** `\bSTATUS_PRECEDENCE\b` over named paths: no hit. `-i` `status_precedence(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied (BREAKING)`. “`src/core/helpers.ts:850` and `src/core/validators.ts:266` iterate `STATUSES`”; TSDoc `helpers.ts:836` `{@link STATUSES}` and `validators.ts:251` match. `Program.test.ts:13,1010-1014`: import `:13`; `it` `:1011`; `[...STATUSES]` `:1014`.

5. **Proof reading.** Naming row. Field 3 agrees (empty).

### program-subj-3

Law: names.md:8 “Names are public API. A consumer can predict them without documentation.” AGENTS.md “**One concept, one term.** Do not alternate synonyms.”

1. **Site now.** Brief `helpers.ts:206` / `:999`. `buildNoticeDeterminations` `:202`; `buildLimitDeterminations` `:242`; `buildNotice` still at `:995` area. Program.ts imports `:39–40`; calls `:329`, `:347`, `:420`.

2. **Diff at the site.** `helpers.ts` `@@ -198,12 +194,12 @@` `+export function buildNoticeDeterminations`; `@@ -238,12 +234,12 @@` `+export function buildLimitDeterminations`. Repair names present. `buildNotices` not reintroduced.

3. **Old form sweep.** `\bbuildNotices\b` `\bbuildLimits\b`: no hit. Inflections `buildnotices(s|es|ed|ing)` `buildlimits(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied (BREAKING)`. `:202,:242` and Program.ts `:39-40,329,347,420` match.

5. **Proof reading.** Naming. Field 3 agrees.

### program-subj-4

Law: names.md:189–190 “A lone unambiguous tally is `count`. When several distinct tallies coexist, name each fact: a pool may expose `size`, `idle`, and `active`.”

1. **Site now.** Brief `types.ts:287` → `:404` `readonly count: number`. `ProgramManager.ts:81` → `:111` `get count(): number`.

2. **Diff at the site.** `types.ts` `@@ -281,16 +389,186 @@` `-	readonly size: number` / `+	readonly count: number`. `ProgramManager.ts` `@@ -74,30 +74,143 @@` `+	get count(): number {`. Present.

3. **Old form sweep.** `\bsize\b` in `src`: `src/core/helpers.ts:537` `lines.size` (Set). In `tests`: `tests/setup.test.ts:477` `new Set(…).size`. `guides/program.md`: no hit. Inflections `sizes|sized|sizing` in `src`/`tests`: no hit.

4. **Report reading.** `applied (BREAKING)`. `:404` and `:111` match. Listed test lines all read `manager.count`.

5. **Proof reading.** Report `\.size\b` two Set.prototype.size hits: agrees with field 3.

### program-subj-5

Law: AGENTS.md “**One concept, one term.** Do not alternate synonyms.”

1. **Site now.** Brief `errors.ts:44` still `:44`: ` * Determines whether a caught value is a {@link ProgramError}.`

2. **Diff at the site.** `errors.ts` `@@ -41,7 +41,7 @@` `+ * Determines whether a caught value is a {@link ProgramError}.` Verbatim.

3. **Old form sweep.** `Checks whether` over `src`: no hit.

4. **Report reading.** `applied`. Sentence matches `:44`. Sweep empty: agrees.

5. **Proof reading.** Sweep agrees.

### program-subj-6

Law: typescript.md:74 “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.” :80 “State a prerequisite and the failure behavior wherever the symbol has either.”

1. **Site now.** Brief `types.ts:242-251` / `:285-296` expanded. `ProgramInterface` `:242–358` with member blocks; `ProgramManagerInterface` `:393–573`. Mirrored on `Program.ts:86+` and `ProgramManager.ts:77+`. Overload `//` comments `Program.ts:166`, `ProgramManager.ts:235` without AGENTS citations.

2. **Diff at the site.** `types.ts` `@@ -236,21 +236,129 @@` and `@@ -281,16 +389,186 @@` add the blocks. Repair present (third-person, `@throws {@link ProgramError}`, `@example` from `@orkestrel/program`).

3. **Old form sweep.** No removed name. no hit.

4. **Report reading.** `applied`. Ranges `types.ts:242-358` and `:393-567` match member TSDoc (destroy is `:573`). Program `:86-280` and ProgramManager `:77-325` carry mirrored blocks.

5. **Proof reading.** Report `@throws` counts are a separate sweep, not field 3’s old-name sweep.

### program-subj-7

Law: documentation.md:46 “Readonly data properties remain in the interface's `## Surface` row.”

1. **Site now.** Brief `guides/program.md:151` still `:151`: `` `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`. ``

2. **Diff at the site.** `guides/program.md` `@@ -148,10 +148,10 @@` that Shape cell `+`. Verbatim including `count`.

3. **Old form sweep.** `\bsize\b` over `guides/program.md`: no hit.

4. **Report reading.** `applied`. Matches `:151`.

5. **Proof reading.** Report empty `\bsize\b` on the guide: agrees.

### program-subj-8

Law: documentation.md:57 “Code fences import through the package's published specifier.”

1. **Site now.** Brief `:318-328` → import first entry at `:316`:

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

`:326` still calls `assertProgramDefinition(definition)`.

2. **Diff at the site.** `@@ -316,6 +313,7 @@` `+	assertProgramDefinition,`. Verbatim.

3. **Old form sweep.** No removed name. Presence pattern `^\s*assertProgramDefinition,` hits `guides/program.md:316`.

4. **Report reading.** `applied`. “`guides/program.md:316` — `assertProgramDefinition,` is the first entry”. Matches.

5. **Proof reading.** Report presence at `:316`: agrees.

### program-subj-9

Law: writing.md:38 “Claim only what the reader can check.”

1. **Site now.** Brief `README.md:24` still `:24`: `- Node.js >= 22.12.0`

2. **Diff at the site.** `README.md` `@@ -21,15 +21,15 @@` `+- Node.js >= 22.12.0`. Verbatim. `package.json` not in the diff.

3. **Old form sweep.** `Node\.js >= 24` over `README.md`: no hit.

4. **Report reading.** `applied`. Matches `:24`.

5. **Proof reading.** Sweep empty: agrees.

### program-subj-10

Law: writing.md:48–49 “Put a code token in backticks and follow it with a noun: the `parse` method, the `vite.config.ts` file, the `--check` flag. Never inflect, pluralize, or possessivize a code token, and never use one as an English verb.”

1. **Site now.** `helpers.ts:183–184` “{@link Notice} values” / “{@link Determination} values”; `:217` “{@link Determination} values”; `:221` “{@link LogicalDefinition} definitions”; `:985` “optional `{{token}}` placeholders”; `ProgramManager.ts:21` “{@link ProgramInterface} programs”; `guides/program.md:138` “(`FieldPath` values)”.

2. **Diff at the site.** `helpers.ts` `@@ -184,8 +180,8 @@` `+ * Resolves authored {@link Notice} values into unconditionally-applied `notice`` / `+ * {@link Determination} values.` ProgramManager `@@ -18,7 +18,7 @@` `+ * Manages compiled {@link ProgramInterface} programs in order, sharing one`. Repair present including helpers.ts `:985` `+ * @param message - The message template, carrying optional \`{{token}}\` placeholders`.

3. **Old form sweep.** `\{@link [^}]+\}s` `` `FieldPath`s `` `` `\{\{token\}\}`s `` over `src` `guides/program.md`: no hit (vendored `guides/reason.md:560` has `FieldPath`s; off-limits mirror).

4. **Report reading.** `applied`. Listed lines match (`:183-184,217,221,985`, ProgramManager `:21`, guide `:138`).

5. **Proof reading.** Report empty on that pattern over `src guides/program.md`: agrees for those paths.

### program-subj-11

Law: AGENTS.md Writing: “**NEVER state a count.** A number answering "how many" about a set anyone can add to is a count — … Delete a count you find. Do not correct it.”

1. **Site now.** `helpers.ts:814` `@returns A record carrying every {@link Status}`; `validators.ts:344–345` “checks the program-owned members directly”; `guides/program.md:171` “The reserved keys exist only…”; `:533` “(a decision gate, listed later)”; `:553` “when every gate holds:”. `:176` still names members (`completeTallies` / `isTallies` / `STATUSES`).

2. **Diff at the site.** `helpers.ts` `@@ -813,7 +811,7 @@` `+ * @returns A record carrying every {@link Status}`. validators `@@ -341,7 +341,7 @@` `+ * alias… checks the`. program.md `@@ -533,7 +530,7 @@` and `@@ -552,8 +549,8 @@`. Repair present.

3. **Old form sweep.** `all five statuses|three program-owned|two reserved keys|four decision gates|all four gates`: no hit.

4. **Report reading.** `applied`. Pointers `:814`, `:344-345`, `:171,533,553` match (`:553` is the “every gate holds” line).

5. **Proof reading.** Report’s `above|below` and number-word sweeps are extra; field 3’s removed phrases are gone. Remaining `two subjects` title at `Program.test.ts:968` is the report’s permitted hit.

### program-subj-12

Law: writing.md:95 table row `` `via` `` → `` `through`, `by using` ``.

1. **Site now.** `README.md:25` “through the `exports` field”; `guides/program.md:701` “exact shape through `isProgramDefinition`”; `helpers.test.ts:1035` “through real qualification”; `tests/setup.ts:1125` “OWN keys through JSON parsing”.

2. **Diff at the site.** README `@@ -21,15 +21,15 @@` `+… through the \`exports\` field`. program.md `@@ -704,7 +698,7 @@` `+1. exact shape through \`isProgramDefinition\``. setup.ts `@@ -978,15 +1122,9 @@` `+/** … through JSON parsing. */`. Repair present. helpers.test.ts title `+` in its hunk.

3. **Old form sweep.** `\bvia\b` over `src` `tests` `guides/program.md` `guides/README.md` `README.md`: no hit. Hits remain in vendored guides (`guides/reason.md`, `guides/contract.md`, `guides/emitter.md`, `guides/guide.md`).

4. **Report reading.** `applied`. `:25`, `:701`, `:1035`, `:1125` match.

5. **Proof reading.** Report `via` empty on owned paths: agrees.

### program-subj-13

Law: names.md:112 “Describe what a thing is, not its implementation.” :114 “Properties are nouns; methods are verbs.”

1. **Site now.** Brief `types.ts:52` / `:93` still those lines: `readonly partition?: FieldPath` on `AggregateInput` and `AggregateDefinition`. `@remarks` `:47` uses `partition`.

2. **Diff at the site.** `types.ts` `@@ -44,12 +44,12 @@` `+	readonly partition?: FieldPath`; `@@ -87,10 +87,10 @@` same on AggregateDefinition. Present.

3. **Old form sweep.** `\bby\?:|\.by\b|[{,] by:` over `src` `tests` `guides/program.md`: no hit. Inflections `bys|byed|bying` not swept as English noise; member spellings empty.

4. **Report reading.** `applied (BREAKING)`. `:52,93` match.

5. **Proof reading.** Report that pattern empty: agrees.

### program-subj-14

Law: typescript.md:79 “Write a default as "Default: …" and a thrown error as "Thrown when …".”

1. **Site now.** Brief `:221` / `:269-270` → `:219` and `:376–377`: “Default: {@link DEFAULT_PROGRAM_VALIDATE}.”

2. **Diff at the site.** `types.ts` `@@ -216,7 +216,7 @@` `+ * construction. Default: {@link DEFAULT_PROGRAM_VALIDATE}. \`labels\` —`. Verbatim.

3. **Old form sweep.** `\(default ` over `src` `guides/program.md`: no hit.

4. **Report reading.** `applied`. “`:219,376-377`”: matches.

5. **Proof reading.** Sweep empty: agrees.

### program-subj-16

Law: names.md:85 “Module helpers have no owning entity at the call site, so default to `{verb}{Noun}`” plus names.md:112 “Describe what a thing is, not its implementation.”

1. **Site now.** Brief `helpers.ts:873` → `:870` `export function tallySubject`. `@example` `:865`. Program.ts `:46` import, `:384` call. helpers.test.ts `:32`, `:767`. `guides/program.md:305`.

2. **Diff at the site.** `helpers.ts` `@@ -865,12 +862,12 @@` `+export function tallySubject(`. Present.

3. **Old form sweep.** `\btallyProgram\b`: no hit. `-i` `tallyprogram(s|es|ed|ing)`: no hit.

4. **Report reading.** `applied (BREAKING)`. Pointers match.

5. **Proof reading.** Sweep empty: agrees.

### fleet-F1

Where: `isBrowserVuePath` residue; fold into program-obj-8.

1. **Site now.** Helper absent. `tests/setup.ts` has no header clause naming it (file opens with imports). Not export-free (`createRecordingEngine` etc. remain). `vite.config.ts` / `test:setup` not in this diff.

2. **Diff at the site.** Same deletions as program-obj-8. No second edit hunk unique to fleet-F1.

3. **Old form sweep.** `isBrowserVuePath`: no hit (same as obj-8).

4. **Report reading.** `applied by program-obj-8`. “Folded into that row… No second edit… stop condition does not apply.” Diff shows one deletion site, not a second.

5. **Proof reading.** Placement. Field 3 agrees.

### fleet-F2

Law: architecture.md:183–186 Class order: “`#` private fields… Constructor… Public interface: getters, then methods.”

1. **Site now.** `Program` `:73–91`: all `#` fields then `readonly id/name/definition` (public fields after `#`, not ahead). `ProgramManager` `:37–48`: no `id`. `ProgramError` (`errors.ts:23–41` class body): no `#` field and no `id`. Shape “public `readonly id` ahead of `#` fields” absent.

2. **Diff at the site.** No hunk that introduces `readonly #id` / `get id()`. Program.ts `@@ -83,8 +83,11 @@` is TSDoc on existing public fields.

3. **Old form sweep.** No rename. JSON.stringify of a Program instance: `tests/setup.test.ts:531` `JSON.stringify(wrapped)` is `createResultClass`, not Program.

4. **Report reading.** `noop`. “`Program` (`…:73-90`) declares every `#` field before `id`…” Matches `:73–91`. ProgramManager `:37-48` no `id`. ProgramError no `#`/`id`.

5. **Proof reading.** Noop with classes read: agrees.

---

### Scope

Status paths vs brief § Scope:

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
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/programs/Program.test.ts` | owned |
| `tests/src/core/programs/ProgramManager.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |

None shared. None off-limits. `package.json`, `package-lock.json`, `node_modules`, `.claude/**`, vendored tests, vendored `guides/<dep>.md` not in the status file.

Hunks whose **file** no row **Where** names (`file @@ hunk` + first `+` line):

`tests/setup.test.ts`
- `@@ -1,7 +1,7 @@` `+// the \`src:core\` suites stand on. Each following contract is asserted against a hand-written`
- `@@ -19,9 +19,10 @@` `+import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'`
- `@@ -39,6 +40,8 @@` `+	buildQualificationResult,`
- `@@ -50,6 +53,9 @@` `+	createOffContractQualifier,`
- `@@ -67,7 +73,6 @@` (import drop; no `+`)
- `@@ -173,11 +178,11 @@` `+		const dangling = createQualificationDefinition(`
- `@@ -457,7 +462,7 @@` `+	it('matches the hand-written fixture table', () => {`
- `@@ -542,6 +547,105 @@` `+describe('createOffContractValidationResult', () => {`
- `@@ -616,7 +720,7 @@` `+	it('give the property rating distinct scoped lines', () => {`
- `@@ -718,7 +822,7 @@` `+		expect(program.aggregate?.partition).toBeUndefined()`
- `@@ -727,7 +831,7 @@` `+		expect(batchAggregateProgramDefinition.aggregate?.partition).toBe('location')`
- `@@ -898,16 +1002,3 @@` (describe deleted; no `+`)

`tests/src/core/programs/Program.test.ts`
- `@@ -1,7 +1,7 @@` `+import { buildLineDefinition, buildRatingDefinition, createRater } from '@orkestrel/rater'`
- `@@ -10,7 +10,7 @@` `+import { STATUSES } from '@src/core'`
- `@@ -61,7 +61,7 @@` `+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'`
- `@@ -247,8 +247,8 @@` `+				buildRatingDefinition('owned-rating', 'Owned rating', [`
- `@@ -402,28 +402,21 @@` `+			expect(captureError(() => program.execute({ id: 'x', aggregate: {} }))).toMatchObject({`
- `@@ -431,8 +424,8 @@` `+				createQualificationDefinition('q', 'Q', [], {`
- `@@ -442,33 +435,22 @@` `+				createQualificationDefinition('q', 'Q', [gates], {` then `+			expect(captureError(() => createProgram(withPass))).toMatchObject({`
- `@@ -629,14 +611,9 @@` `+			expect(captureError(() => program.execute(eligibleSubject))).toMatchObject({`
- `@@ -745,14 +722,9 @@` `+			expect(` / `+				captureError(() => createProgram(buildEligibilityOnlyNoticeMissingScopeDefinition())),`
- `@@ -779,14 +751,9 @@` `+			expect(` / `+				captureError(() => program.execute([eligibleSubject, { id: 'x', aggregate: {} }])),`
- `@@ -836,14 +803,9 @@` `+			expect(captureError(() => program.execute(eligibleSubject))).toMatchObject({`
- `@@ -884,7 +846,11 @@` `+					createQualificationDefinition(`
- `@@ -911,7 +877,11 @@` `+					createQualificationDefinition(`
- `@@ -932,13 +902,13 @@` `+					createQualificationDefinition(`
- `@@ -956,9 +926,13 @@` `+					createQualificationDefinition(`
- `@@ -1015,7 +989,11 @@` `+					createQualificationDefinition(`
- `@@ -1030,10 +1008,10 @@` `+		it('always exposes tallies in STATUSES order', () => {`
- `@@ -1053,14 +1031,11 @@` `+			expect(`

`tests/src/core/validators.test.ts`
- `@@ -31,8 +31,8 @@` `+import { createQualificationDefinition } from '@orkestrel/qualifier'`
- `@@ -125,7 +125,7 @@` `+						partition: 'location',`
- `@@ -490,8 +490,8 @@` `+				createQualificationDefinition('qualification', 'Qualification', []),`

### Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hit.

Tree `src`: no hit.

Tree `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`: no hit. Hits only in those excluded files (`distribution.test.ts:44,684`; `setupPolicy.ts` TODO/debugger fixtures; `config.test.ts:687,945,950`).

### Parity

**ProgramInterface** call signatures (`src/core/types.ts`) vs `guides/program.md` `#### ProgramInterface` Methods:

| Member | types.ts | Methods |
| --- | --- | --- |
| `execute` (batch) | `:284` | `:407` `execute` |
| `execute` (one) | `:315` | same row |
| `validate` | `:339` | `:408` |
| `destroy` | `:358` | `:409` |

Readonly data vs Surface `:148`: `id` `:244`, `name` `:246`, `definition` `:248`, `emitter` `:253` — Surface names `id` / `name` / `definition` / `emitter`.

**ProgramManagerInterface** vs `#### ProgramManagerInterface` Methods:

| Member | types.ts | Methods |
| --- | --- | --- |
| `has` | `:422` | `:427` |
| `program` | `:440` | `:428` |
| `programs` | `:461` | `:429` |
| `add` | `:491` | `:430` |
| `remove` (ids) | `:515` | `:431` |
| `remove` (id) | `:533` | same |
| `remove` () | `:553` | same |
| `destroy` | `:573` | `:432` |

Readonly vs Surface `:151`: `emitter` `:397`, `count` `:404`. Entities `:393–394` name the classes, not the data members.

Barrel `src/core/index.ts:1–8` is `export *` from `types.js`, `constants.js`, `errors.js`, `validators.js`, `helpers.js`, `factories.js`, `programs/Program.js`, `programs/ProgramManager.js`.

Backticked identifiers in **added guide sentences** (guides/program.md, guides/README.md, README.md `+` lines) vs barrel:

| Identifier | Barrel? |
| --- | --- |
| `import` / `require` / `exports` | no (README English/Node) |
| `AGENTS.md` | no (path) |
| `Program` | yes (`export *` Program.js) |
| `emitter` | member, not a top-level export |
| `src/core` | path |
| `partition` | member on types, not a standalone export |
| `buildAggregateDefinition` | yes (helpers) |
| `FieldPath` | no (`import type` only in `types.ts:1`) |
| `ProgramManagerInterface` | yes (types) |
| `count` `has` `program` `programs` `add` `remove` `destroy` | members |
| `undefined` / `Object.freeze` | language |
| `ELIGIBILITY_DECISIONS` `STATUSES` | yes (constants) |
| `Status` | yes (types) |
| `isStatus` | yes (`validators.ts:65` via export *) |
| `completeTallies` `isTallies` | yes |
| `buildNoticeDeterminations` `buildLimitDeterminations` `tallySubject` | yes (helpers) |
| `execute` | member |
| `limit` `decision` `status` `unrated` | literals/members |
| `assertProgramDefinition` `isProgramDefinition` | yes |
| `assertProgramSubject` `decideEligibility` `hasReservedKey` `selectProgramLines` | yes (pre-existing fence names) |

Sibling fence names `createQualificationDefinition` `createRuling` `buildLineDefinition` `buildRatingDefinition` are not this package’s barrel.

### Gates

Report § Gates, verbatim:

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | `gate-2-lint-check.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

Those files exist under `/home/user/work/evidence/program-proofs/`. They do not print an `exit_code=` line. Observed summaries: format-check “All matched files use the correct format.”; lint-check banner then empty diagnostics; check `tsc --noEmit` then `check:src:core`; build copies `index.d.ts` to `index.d.cts`; test `Tests  216 passed (216)` / policy `111` / (config continues in file) / setup (report 85) / guides `Tests  26 passed (26)`.

### Breaking

Report § Breaking (consumers: none; `"@orkestrel/program"` in no other fleet `package.json`):

| Removed or renamed | Replacement |
| --- | --- |
| `STATUS_PRECEDENCE` (const) | `STATUSES` |
| `ProgramManagerInterface.size` | `.count` |
| `AggregateInput.by`, `AggregateDefinition.by` | `partition` |
| `buildNotices` | `buildNoticeDeterminations` |
| `buildLimits` | `buildLimitDeterminations` |
| `tallyProgram` | `tallySubject` |

Word-boundary sweep of distinctive old names over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/program`, vendored `guides/program.md` mirrors:

- `STATUS_PRECEDENCE`: no hit (`/home/user/fleet`, `/home/user/scaffold/src`)
- `buildNotices`: no hit
- `buildLimits`: no hit
- `tallyProgram`: no hit
- `by?: FieldPath`: no hit
- `get size(): number`: `/home/user/fleet/pool/src/core/Pool.ts:88`
- `readonly size: number`: `sea/tests/setupServer.ts:660,886`; `sea/src/server/types.ts:522`; `lsp/src/core/types.ts:437,444`; `workspace/src/core/types.ts:39`; `browser/src/core/types.ts:1137`; `pool/src/core/types.ts:67`; `middleware/src/core/types.ts:611`; `middleware/src/server/types.ts:119,120`

### Writing sweep

Pattern (case-insensitive) `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` on diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles and comments:

- guides/** / README.md / src TSDoc `+` lines: no hit
- growable-set count `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on `+` lines: no hit

Unfiltered `+` hits for `\bnew\b` (constructor statements in `tests/setup.ts` / `tests/setup.test.ts`, not titles/comments): `new Error('Unexpected qualification')`, `new Error('Unexpected reasoning')`, `new Error('Unexpected reasoner registration')`, `return new OffContractValidationResult()`, `return new OffContractQualifier()`, `return new OffContractReason()`, `return new RecordingReason(options)` — tree: `tests/setup.ts:422,447,451,426,533,537,541,610`; `tests/setup.test.ts` OffContract expects.

## Distillate

- program-obj-1: site now `tests/setup.ts:92,:609` (brief `:445` gone) | diff present yes | old form hits 0 | report matches yes
- program-obj-2: site now `tests/setup.ts:618-640` (brief `:494` gone) | diff present yes | old form hits 0 | report matches yes
- program-obj-3: site now `tests/guides.test.ts:192-266` (brief `:1` still header) | diff present yes | old form hits 0 | report matches yes
- program-obj-4: site now `ProgramManager.test.ts:40` (brief `:43` context line) | diff present yes | old form hits 0 owned | report matches yes
- program-obj-5: site now `tests/setup.ts:400+,:532+,:690` (brief `helpers.test.ts:78` gone) | diff present yes | old form hits 0 | report matches yes
- program-obj-6: site now `factories.test.ts:98-109` (brief `:113` EOF) | diff present yes | old form hits 0 | report matches yes with `:97` vs `:98` drift
- program-obj-8: site now deleted (brief `setup.ts:989` is other remarks) | diff present yes (deletion) | old form hits 0 | report matches yes
- program-obj-9: site now `helpers.ts:619-620` collapse kept | diff present no (sentinel); param rename is subj-13 | old form hits 0 | report matches yes (noop EXEMPT)
- program-subj-1: sites stripped; `types.ts:193,:239,:361,:392` | diff present yes | old form hits 0 owned | report matches yes except cited `:250` is now emitter TSDoc
- program-subj-2: `STATUS_PRECEDENCE` gone; `STATUSES` at `helpers.ts:850` `validators.ts:266` | diff present yes | old form hits 0 | report matches yes
- program-subj-3: `helpers.ts:202,:242` | diff present yes | old form hits 0 | report matches yes
- program-subj-4: `types.ts:404` `ProgramManager.ts:111` | diff present yes | old form hits 2 (`Set.size` `helpers.ts:537` `setup.test.ts:477`) | report matches yes
- program-subj-5: `errors.ts:44` | diff present yes | old form hits 0 | report matches yes
- program-subj-6: `types.ts:242-358,:393-573` | diff present yes | old form hits 0 | report matches yes
- program-subj-7: `guides/program.md:151` | diff present yes | old form hits 0 | report matches yes
- program-subj-8: `guides/program.md:316` | diff present yes | old form hits 0 | report matches yes
- program-subj-9: `README.md:24` | diff present yes | old form hits 0 | report matches yes
- program-subj-10: `helpers.ts:183-184,:217,:221,:985` | diff present yes | old form hits 0 owned | report matches yes
- program-subj-11: `helpers.ts:814` `validators.ts:344` `program.md:171,:533,:553` | diff present yes | old form hits 0 | report matches yes
- program-subj-12: `README.md:25` `program.md:701` `helpers.test.ts:1035` `setup.ts:1125` | diff present yes | old form hits 0 owned | report matches yes
- program-subj-13: `types.ts:52,:93` | diff present yes | old form hits 0 | report matches yes
- program-subj-14: `types.ts:219,:376-377` | diff present yes | old form hits 0 | report matches yes
- program-subj-16: `helpers.ts:870` | diff present yes | old form hits 0 | report matches yes
- fleet-F1: applied by obj-8 | diff present yes (same deletion) | old form hits 0 | report matches yes
- fleet-F2: noop; `#` fields first on Program | diff present no | old form hits 0 | report matches yes

Scope tags: 18 status paths all `owned`; 0 shared; 0 off-limits. Extra-Where files: `tests/setup.test.ts`, `tests/src/core/programs/Program.test.ts`, `tests/src/core/validators.test.ts`.

Residue: diff `+` no hit; owned `src`/`tests` no hit.

Writing: prose `+` population no hit; growable-set `+` no hit; `\bnew\b` constructor `+` lines in setup fixtures as listed.

Parity: ProgramInterface methods `execute`/`validate`/`destroy` bijection with `guides/program.md:407-409`; ProgramManagerInterface `has`/`program`/`programs`/`add`/`remove`/`destroy` with `:427-432`; Surface data `id/name/definition/emitter` and `emitter/count`. Barrel `src/core/index.ts:1-8` `export *`. `FieldPath` in added guide prose is not a program barrel export.

## Unknowns

- Gate proof files do not record a numeric exit code; the report’s `0` is not in those files’ text.
- Bare `\bsize\b` / `\bby\b` across every fleet `src`/`tests` file was not fully enumerated; published-member spellings `readonly size: number`, `get size(): number`, and `by?: FieldPath` were.
- Inflection sweeps for `by` (`bys`/`byed`/`bying`) were not run as a separate pass.
- `tests/guides.test.ts` first-grep miss for `describe('flagship fences')` was overcome by a direct read; the block is at `:192`.
- Shell listing `/home/user/fleet` was rejected; sibling greps used absolute paths (`/home/user/fleet/pool/...`, `/home/user/scaffold/src`).

## Journal


## Deviation

No file was created, edited, or deleted in this lane. The tree was not mutated. One Shell call (`ls /home/user/fleet` plus fleet `rg`) was rejected by the harness; those fleet readings were taken with Grep instead. Gate files were readable. Vendored `guides/*.md` mirrors were readable and were excluded from owned old-form sweeps as the brief’s tree/owned population requires.