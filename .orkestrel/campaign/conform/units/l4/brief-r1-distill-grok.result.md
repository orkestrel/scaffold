I'll read the brief in full first, then follow its instructions exactly in read-only mode.The brief is a read-only distillate. I'll load the unit rows, audit claims, report, and evidence next.I'll gather current sites, the unit diff, law quotes, and old-form sweeps in parallel.Sites for the remaining rows, law quotes, and old-form sweeps are next.# Question

For every row of unit conform-brief, what does the tree at `/home/user/fleet/brief` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

# Evidence

Law sentences the rows cite: `Place \`import type\` declarations before value imports.` (`/home/user/scaffold/.claude/rules/typescript.md:17`). `**Absence is \`undefined\`.** Never invent sentinels such as \`'none'\`, \`'unset'\`, \`'unknown'\`, \`''\`, or \`-1\`.` (`/home/user/scaffold/AGENTS.md:63`). `A proof that covers the workspace instead of one module has a fixed location, so no package invents its own` (`tests.md:48-49`); table row `tests/guides.test.ts` (`tests.md:55`); `Transcribe each flagship fence and assert the values its comments claim.` (`tests.md:70`). `That proof has a home: \`tests/guides.test.ts\` executes the flagship fences` (`documentation.md:37`). `Falsify a prose claim the way you falsify a code claim.` (`documentation.md:37`). `Re-read the prose last, against what actually shipped.` (`documentation.md:39`). `Module helpers have no owning entity at the call site, so default to \`{verb}{Noun}\`` (`names.md:85`). `A one-word helper is valid only when its meaning and arguments are unmistakable: \`delay\`, \`clamp\`, \`tokenize\`, \`similarity\`.` (`names.md:89`). `` `build*` assembles a composite value from parts `` (`names.md:96`). `Helper | camelCase \`{verb}{Noun}\`` (`names.md:163`). `Properties are nouns; methods are verbs.` (`names.md:114`). `Generic words: \`data\`, \`info\`, \`item\`, \`thing\`, \`obj\`.` (`names.md:221`). `Describe a boolean parameter as "If \`true\`, …; if \`false\`, …"` (`typescript.md:77-78`). `Every public export has complete TSDoc: description, \`@param\`, \`@returns\`, and \`@example\` where applicable.` (`typescript.md:74`). `Write a default as "Default: …"` (`typescript.md:79`). `One concept, one term. Do not alternate synonyms.` (`AGENTS.md:60`). `` `*/types.ts` is authoritative for public APIs. Implementation and tests conform to it. `` (`AGENTS.md:10`). Class order: `#` private fields first, then constructor, then public getters then methods (`architecture.md:183-185`).

## brief-obj-1

1. **Site now.** Brief `:1` type-first in all named modules (brief line → now):
   - `helpers.ts` brief `:1` value `attempt` → now types `:1-21`, values `:22-34`. Context: none before file start; `:1` `import type { Ambiguity, Entity, Intent } from '@orkestrel/interpret'`; `:2` `import type { LogicalDefinition, …`.
   - `cloners.ts` brief `:3` type after values → now `:1` `import type { Brief } from './types.js'`; `:2` `import { attempt, cloneJSONRecord }`; `:3` `import { BriefError }`.
   - `validators.ts` brief `:20` late type → now types `:1-19`, values `:20-30`. `:1` `import type { Guard }`; `:19` `} from './types.js'`; `:20` `import {`.
   - `parsers.ts` brief `:2` type after value → now `:1` `import type { Brief }`; `:2` `import { parseJSONAs }`; `:3` `import { isBrief }`.
   - `factories.ts` brief `:6` late type → now types `:1-8`, values `:9-12`. `:1` `import type { ContractInterface }`; `:8` `} from './types.js'`; `:9` `import { createContract }`.
   - `BriefCompiler.ts` brief `:3` type after `Emitter` → now types `:1-16`, values `:17-39`. `:1` `import type { EmitterInterface }`; `:16` `} from './types.js'`; `:17` `import { Emitter }`.
   - `BriefManager.ts` brief `:3` type after `Emitter` → now types `:1-9`, values `:10-13`. `:1` `import type { EmitterInterface }`; `:9` `} from './types.js'`; `:10` `import { Emitter }`.
   - `tests/setup.ts` brief `:3`/`:14` interleaved → now types `:1-19`, values `:20-30`. `:1` `import type { Brief, …`; `:19` `} from '@orkestrel/reason'`; `:20` `import {`.
   - `tests/setup.test.ts` brief `:2` type after value → now `:1` `import type { ReasonResult }`; `:2` `import { BriefError, briefToSubject, buildGateDefinition }`; `:3` `import { describe, expect, it }`.
   - `tests/src/core/BriefCompiler.test.ts` brief `:16` late type → now types `:1-2`, values `:3-16`. `:1` `import type { BriefInput, Briefing, Gap, Outcome }`; `:2` `import type { Interpretation }`; `:3` `import {`.
   Left-alone files still type-first: `shapers.ts:1`, `constants.ts:1-2`, `errors.ts:1`, `src/core/index.ts` (no imports), `integration.test.ts:1`, `helpers.test.ts:1-2`.

2. **Diff at the site.** Hunks: `helpers.ts @@ -1,17 +1,5` and `@@ -31,10 +19,22` (first `+` `import { attempt }`); `cloners.ts @@ -1,6 +1,6` (`+import type { Brief }`); `validators.ts @@ -1,22 +1,4` and `@@ -35,6 +17,24`; `parsers.ts @@ -1,5 +1,5` (`+import { parseJSONAs }`); `factories.ts @@ -1,8 +1,4` and `@@ -10,6 +6,10`; `BriefCompiler.ts @@ -1,16 +1,33` and `@@ -18,25 +35,8`; `BriefManager.ts @@ -1,9 +1,5` and `@@ -11,6 +7,10`; `tests/setup.ts @@ -1,5 +1,4`; `tests/setup.test.ts @@ -1,5 +1,5`; `BriefCompiler.test.ts @@ -1,25 +1,25`. Operative repair (move `import type` above value imports, specifiers unchanged) is present in those `+` lines.

3. **Old form sweep.** Row removes/renames no name. No pattern. Hits: none.

4. **Report reading.** Table: `applied` (`conform-brief-report.md:63`). Sentence: “Every `import type` declaration now precedes every value import in the modules the row names” (`:80-86`). Cited modules now carry that order (sites above). Sweep command the report names was not re-run as `grep`; tree import lines match the claim.

5. **Proof reading.** Placement row. Report sweep: `grep -n "^import" …` lists type before value (`:88-91`). Field-3 agrees (no old name; order holds). Gates named: `format:check` / `lint:check` / `check` exit 0 in `brief-proofs/obj1-format-check.txt`, `obj1-lint-check.txt`, `obj1-check.txt`.

## brief-obj-3

1. **Site now.** Brief `helpers.ts:1244-1249` → `deriveStatement` at `:1266-1270` (`export function deriveStatement(text: string): string | undefined {` / `if (collapsed.length === 0) return undefined`). Context `:1265` `*/` `:1267` `const collapsed = collapseWhitespace(text)`. Brief `:1304-1305` → `:1326-1327` (`const statement = deriveStatement(text)` / `return statement === undefined ? undefined : buildTask(operation, domain, statement)`). TSDoc `@returns` `:1256`; example `deriveStatement('') // undefined` `:1263`. Test `helpers.test.ts:1010-1011` `toBeUndefined()`. Guide Helpers `:469` states `` `undefined` for empty or whitespace-only text ``.

2. **Diff.** `helpers.ts @@ -1231,19 +1253,19` (`+ * @returns The statement, or \`undefined\`…`, `+ * deriveStatement('') // undefined`, `+export function deriveStatement(text: string): string | undefined {`, `+	if (collapsed.length === 0) return undefined`); `@@ -1302,7 +1324,7` (`+	return statement === undefined ? undefined : buildTask(operation, domain, statement)`). Verbatim repair text present on those `+` lines (builder name is `buildTask`, as brief-subj-1). Guide `@@ -460,7 +466,7` (`+…; \`undefined\` for empty or whitespace-only text.`).

3. **Old form.** Patterns over `src`, `tests`, `guides/brief.md`, `guides/README.md`, `README.md`:
   - `deriveStatement('') // ''`: no hit.
   - `@returns The statement, or \`''\``: no hit.
   - `expect(deriveStatement('   ')).toBe('')`: no hit.
   - `statement.length === 0 ? undefined`: no hit.
   - `return ''`: `tests/setup.ts:236`, `:303`, `:366` (fixture getters, not `deriveStatement`).

4. **Report.** `applied` (`:64`). “`deriveStatement` is now `(text: string): string | undefined` at `src/core/helpers.ts:1266` and returns `undefined` at `:1268`” (`:98-101`). Tree: `:1266` signature and `:1268` `return undefined` match. `deriveTask` close matches `:1327`.

5. **Proof.** Command `npm --prefix /home/user/fleet/brief run test:src:core`. Red: `Tests  1 failed | 282 passed (283)` (`brief-proofs/obj3-control-red.txt:33`); green: `Tests  283 passed (283)` (`obj3-control-green.txt:11`). Files exist; readings match the report.

## brief-obj-4

1. **Site now.** Brief `integration.test.ts:132-198` — block gone. File now ends after two describes: `:20` `describe('text to brief to projections'` and `:68` `describe('the blocked brief and its answer'`. Symbol moved to `tests/guides.test.ts:336-341` (header comment) and `:342` `describe('the guide fences, executed', () => {` after `describe.each` closer `:334`. Guide Tests row `:1226` names “the executed flagship fences”.

2. **Diff.** `tests/guides.test.ts @@ -305,3 +332,164` (current diff; report’s `+80` grew in fix rounds). First `+` of the move: `+// The parity checks earlier in this file prove…`. `integration.test.ts` loses the block (hunks at file end, last `---` lines `expect(briefToDispatch(pinned).authority)`). Repair names (`buildBrief`, `createBriefCompiler`, `findBlockingGaps`, …) present in `+` lines (`diff:1907+`). Guide `@@ -1198,10 +1223,10` (`+…and the executed flagship fences…`).

3. **Old form.** Pattern `the guide fences, executed` over named paths: `tests/guides.test.ts:342` only. No hit in `integration.test.ts`.

4. **Report.** `applied` (`:65`). “The whole `describe('the guide fences, executed')` block… now sits at the end of `tests/guides.test.ts`” (`:119-128`). Location sweep cites `:335` (`:144-145`); tree line is `:342`. Import list in the report omits names now imported at `tests/guides.test.ts:28-39` (`buildCitation`, `buildExample`, `buildGiven`, `buildGap`, `buildOutput`, `buildRisk`).

5. **Proof.** `test:guides` 18 before (`subj1-test-guides.txt:11` `Tests  18 passed (18)`), 20 after (`obj4-guides-after.txt:11` `Tests  20 passed (20)`). `test:src:core` 283 (`obj3-control-green.txt:11`) then 281 (`obj4-src-after.txt:11`). Planted red: `Tests  1 failed | 19 passed (20)` (`obj4-guides-planted-red.txt:35`); plant removed: `Tests  20 passed (20)` (`obj4-guides-plant-removed-green.txt:11`). Field-3 agrees the string lives only in `guides.test.ts`.

## brief-subj-1

1. **Site now.** Brief `helpers.ts:51` etc. now `buildTask:51`, `buildReference:69`, `buildManifest:86`, `buildOutcome:112`, `buildGiven:131`, `buildExample:150`, `buildCitation:173`, `buildGap:194`, `buildRisk:220`, `buildOutput:239`, `buildProof:265`, `buildBrief:288`, `buildGateDefinition:338`. Fixtures: `tests/setup.ts:47` `buildReadyTask`, `:52` `buildReadyManifest`, `:65` `buildReadyBrief`. README `:20-22` `buildOutcome` / `buildProof` / `buildTask`.

2. **Diff.** Many hunks; operative renames in `helpers.ts @@ -43,17 +43,17` (`+ * import { buildTask }`, `+export function buildTask`); `@@ -61,29 +61,29` `buildReference`; through `@@ -384,7 +388,7` / `@@ -398,13 +402,13` `gateDefinition`→`buildGateDefinition` (refuter form, not finder’s `buildGate`). Collision: `tests/setup.ts @@ -56,11 +62,11` / `@@ -68,10 +74,10` `buildReady*`. Verbatim new names present on `+` lines.

3. **Old form.** Paths: `src`, `tests`, `guides/brief.md`, `guides/README.md`, `README.md` (no `node_modules`).
   - Word-boundary call form `\b(task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition)\(`: `src/core/BriefManager.ts:74` `brief(id: string)`; `src/core/types.ts:509` `brief(id: string)`; `tests/src/core/BriefManager.test.ts:76,77,97,119,147,369` `registry.brief(`; `guides/brief.md:706` `registry.brief(`; `src/core/BriefCompiler.ts:331` `` `${…} blocking gap(s)` ``; `tests/src/core/BriefCompiler.test.ts:158` `'1 blocking gap(s)'`; `guides/brief.md:991` `'1 blocking gap(s)'`.
   - `export function (task|reference|…|gateDefinition)\(`: no hit.
   - Inflection `\bgateDefinitions?(ed|ing)?\b` `-i`: no hit.
   - `buildReadyTask|buildReadyManifest|buildReadyBrief`: hits in `tests/setup.ts`, `tests/setup.test.ts`, `tests/src/core/*` as listed by the earlier sweep (fixtures, not old published names).

4. **Report.** `applied` (`:66`). Rename list including `gateDefinition`→`buildGateDefinition` (`:149-153`). Remaining-hit list (`:176-181`) matches the call-form hits above. `types.ts:168` now `buildCitation`; `:228` now `buildBrief`.

5. **Proof.** Naming row. Report’s call-form sweep and inflection sweep agree with field 3. `test:guides` `Tests  18 passed (18)` (`subj1-test-guides.txt:11`); `npm test` `Tests  283/111/46/27/18` (`subj1-test.txt:15,29,43,57,71`).

## brief-subj-2

1. **Site now.** Brief `guides/brief.md:352` still `:352-353`: `Value builders — every builder returns a FRESH object and OMITS absent optional keys entirely,` / `so its SHAPE round-trips the exact-record validators named earlier.` Context `:350` `### Builders` `:355` `Builders are structural`.

2. **Diff.** `guides/brief.md @@ -334,103 +334,109` (`+Value builders — every builder returns a FRESH object…` / `+so its SHAPE round-trips the exact-record validators named earlier.`). Clause `following the reasons idiom` absent from `+`. Original row text ended “validators above”; tree has “named earlier” (fix round 1, report `:424`).

3. **Old form.** `reasons idiom` / `Lowercase value builders`: no hit in `src`, `tests`, `guides/brief.md`, `guides/README.md`, `README.md`. (`guides/reason.md` still has lowercase builders; that path is outside the named sweep set.)

4. **Report.** `applied` (`:67`). Opening sentence quoted (`:199-201`) matches `:352-353` except the report Rows paragraph does not include “named earlier”; Fix round 1 (`:424`) does.

5. **Proof.** Documentation row. Report sweep empty; field 3 empty on the named paths.

## brief-subj-3

1. **Site now.** Brief `guides/brief.md:144` still `:144` description cell “One or more spaces and nothing else — the one exemplar side `exampleToLines` must not pad; an EMPTY side is padded like any other, because CommonMark strips a fully-blank span to nothing while an unpadded empty span leaves an unclosed backtick run.” Context `:143` `SINGLE_LINE_PATTERN` `:145` (table end). `constants.ts:119` `export const BLANK_PATTERN = /^ +$/` (brief cited `:120`).

2. **Diff.** `guides/brief.md @@ -130,18 +130,18` (`+| \`BLANK_PATTERN\` … One or more spaces and nothing else — …`). Repair text present verbatim on that `+` line (`diff:91`).

3. **Old form.** `Empty or all spaces`: no hit on named paths.

4. **Report.** `applied` (`:68`). Quotes the new cell (`:208-211`) and `constants.ts:119`; both match.

5. **Proof.** Documentation row. Sweep empty; field 3 agrees.

## brief-subj-4

1. **Site now.** Brief `helpers.ts:879` → `:895` `export function assertBrief(value: unknown): Brief {`. Body `:896` `if (!isBrief(value))`, `:899` `return value`. Doc `:883` `@param value - The candidate brief value.` `:885` `@throws … when \`value\` fails \`isBrief\``. Context `:894` `*/` `:896` `if (!isBrief(value))`.

2. **Diff.** `helpers.ts @@ -864,23 +880,23` (`+ * @param value - The candidate brief value.`, `+ * @throws … when \`value\` fails`, `+export function assertBrief(value: unknown): Brief {`, `+	if (!isBrief(value)) {`, `+	return value`). Verbatim.

3. **Old form.** `assertBrief(data`: no hit. `\b(data|info|item|items|thing|obj|cfg|msg|doc)\b` in `src/`: `BriefCompiler.ts:220,288` (prose “foreign data”); `helpers.ts:391,397,468,866,906,915` (prose); `constants.ts:27` `'data'` domain literal; `cloners.ts:125` prose; `types.ts:33` `'data'`, `:96` “one thing”; `errors.ts:8` “off-contract data”. No `data:` parameter on `assertBrief`.

4. **Report.** `applied` (`:69`). “`assertBrief(value: unknown)`” (`:217-218`) matches `:895`.

5. **Proof.** Naming row. Report’s identifier sweep vs field 3: same remaining prose/literal hits, no parameter `data`.

## brief-subj-5

1. **Site now.** Brief `helpers.ts:100` → `:100-101` `` @param required - If `true`, the outcome gates "done"; if `false`, it is desirable but not `` / `blocking. Default: \`true\`.` Context `:99` `@param text` `:102` `@returns`.

2. **Diff.** `helpers.ts @@ -93,27 +93,28` (`+ * @param required - If \`true\`, the outcome gates "done"; if \`false\`, it is desirable but not` / `+ *   blocking. Default: \`true\`.`). Verbatim (split across two lines).

3. **Old form.** `Whether the outcome gates`: no hit on named paths.

4. **Report.** `applied` (`:70`). Cites `:100-101` (`:226-227`); tree matches.

5. **Proof.** Documentation row. Old “Whether” form gone.

## brief-subj-6

1. **Site now.** Brief `:1160` → `:1176` `` @param turns - The turn cap. Default: `DEFAULT_BRIEF_TURNS`. ``. Also `:101` `Default: \`true\`.`; `:182-183` `Default: \`blocking: false\`.`; `:273-275` `Default: \`[]\` for every absent collection and \`buildOutput('markdown')\``.

2. **Diff.** `@@ -93,27 +93,28` (required Default); `@@ -160,37 +161,37` (`+ *   OMITTED entirely. Default: \`blocking: false\`.`); `@@ -253,42 +257,42` (`+ *   fill them. Default: \`[]\` … \`buildOutput('markdown')\``); `@@ -1157,14 +1173,14` (`+ * @param turns - The turn cap. Default: \`DEFAULT_BRIEF_TURNS\`.`). Verbatim.

3. **Old form.** `defaults to` on named paths: `guides/brief.md:367,368,372,376,683`. `src/core`: no `defaults to`; only `Default:` at `helpers.ts:101,183,274,1176`. `guides/README.md` / `README.md` / `src` / `tests`: no `defaults to` in `src` or `tests` from this sweep (guide hits only).

4. **Report.** `applied` (`:71`). Sweep “only `Default:` lines — `helpers.ts:101`, `:183`, `:274`, `:1176`” (`:232-234`). Those four match. Report “No `defaults to` remains” is true of `src/core`, not of `guides/brief.md:367+`.

5. **Proof.** Documentation row. Field 3 finds `defaults to` still in `guides/brief.md` (outside the row’s `src/core` rewrite list).

## brief-subj-7

1. **Site now.** `BriefCompiler.ts:192` `gate(brief: Brief): LogicalResult {` (brief `:192` unchanged number); body `:202` `briefToSubject(brief), buildGateDefinition()`. Context `:191` blank, `:193` `this.#refuseDestroyed()`. `BriefManager.ts:84` `add(brief: Brief, options?: RecordOptions)` (brief `:84` same); `:86` `this.#stage(brief, …)`. `types.ts:478` `gate(brief: Brief): LogicalResult`; `:511` `add(brief: Brief, options?: RecordOptions)`.

2. **Diff.** `BriefCompiler.ts @@ -189,7 +189,7` (`+	gate(brief: Brief): LogicalResult {`); `@@ -199,7 +199,7` (`+			this.#own(this.#reason.reason(briefToSubject(brief), buildGateDefinition()), [`). `BriefManager.ts @@ -81,9 +81,9` (`+	add(brief: Brief, options?: RecordOptions): BriefRecord {`, `+		const record = this.#stage(brief, this.#records, options)`). Parameter text `brief` present on `+`.

3. **Old form.** `gate(source:` / `add(source:`: no hit. Helper leaves still use `source: Brief` (outside this row).

4. **Report.** `applied` (`:72`). Cites `types.ts:478` and `:511` (`:238-239`); both still those lines; implementations match.

5. **Proof.** Naming row. `source` parameter gone from those two methods.

## brief-subj-8

1. **Site now.** Brief `helpers.ts:149` → `:150` `export function buildExample(input: string, output: string, note?: string): Example {`; `:151` `return note === undefined ? { input, output } : { input, output, note }`. Doc `:139` `@param output - The expected output for that input.` Context `:149` `*/` `:151` return.

2. **Diff.** `helpers.ts @@ -160,37 +161,37` (`+export function buildExample(input: string, output: string, note?: string): Example {`, `+	return note === undefined ? { input, output } : { input, output, note }`). `@param output` in the same region. Verbatim (on `buildExample`).

3. **Old form.** `result: string` as this parameter: no hit. `example(input: string, result`: no hit.

4. **Report.** `applied` (`:73`). Signature and body (`:245-247`) match `:150-151`.

5. **Proof.** Naming row. Old `result` parameter gone.

## brief-subj-9

1. **Site now.** Brief `validators.ts:47` → `@param`/`@returns` on each guard, e.g. `:47-48` `@param value` / `@returns True if \`value\` is a string holding no line terminator…`; `isLine:57-58`, `isTaskOperation:65-66`, … `isBrief:251`. Eighteen `@returns True if` lines: `:48,58,66,74,82,90,98,110,124,137,149,165,180,192,208,220,236,251`. Eighteen `@param value - The value to inspect.` (count 18).

2. **Diff.** `validators.ts @@ -43,33 +43,72` and later hunks at `@@ -80,6 +119,9`, `@@ -88,14 +130,24`, `@@ -108,6 +160,9`, `@@ -118,14 +173,24`, `@@ -136,14 +201,24`, `@@ -154,7 +229,12`, `@@ -166,6 +246,9`. `+ * @param value - The value to inspect.` and `+ * @returns True if \`value\` is …` present.

3. **Old form.** Row adds tags rather than renaming. Pre-repair “description only”: every listed guard now has `@param`/`@returns`.

4. **Report.** `applied` (`:74`). Counts 18/18/18 (`:258-263`) match the file.

5. **Proof.** Documentation row. Report’s `grep -c` counts agree with field 1.

## fleet-F1

1. **Site now.** `isBrowserVuePath` not declared in `tests/setup.ts`. No `src/browser` directory in this package’s `src` (only `src/core`). No `tests/setupBrowser.ts` in this checkout’s tests root. `tests/setup.ts` still has many exports (not export-free).

2. **Diff.** No hunk deletes `isBrowserVuePath` (name never in the diff).

3. **Old form.** `isBrowserVuePath` over `*.ts`/`*.md`/`*.json` excluding `node_modules`: no hit.

4. **Report.** `noop` (`:75`). “`tests/setup.ts` declares no `isBrowserVuePath`” (`:267-271`). Matches.

5. **Proof.** Placement/absence. Sweep agrees (no hit). Browser-path strings in fixtures (`src/browser/composables/useForm.ts`) are example paths, not the helper.

## fleet-F2

1. **Site now.** `BriefError` `errors.ts:23-25` `readonly code` / `readonly context?`, no `id`. `BriefCompiler:64-72` all `#` fields (`readonly #emitter` … `#destroyed`). `BriefManager:34-37` `#emitter`, `#records`, `#destroyed`. Sole `readonly id: string` in `src`: `types.ts:410` on interface `BriefRecord`.

2. **Diff.** No class-field `id` → `#id` hunk.

3. **Old form.** Public class field `readonly id: string`: no hit on a class. Interface hit `types.ts:410`.

4. **Report.** `noop` (`:76`). Classes read (`:275-280`) match.

5. **Proof.** Pattern absent; field 3 agrees.

## Across the unit

**Scope.** Status paths (`conform-brief.status`), tagged against brief § Scope:

| path | tag |
| --- | --- |
| `README.md` | owned |
| `guides/brief.md` | owned |
| `src/core/BriefCompiler.ts` | owned |
| `src/core/BriefManager.ts` | owned |
| `src/core/cloners.ts` | owned |
| `src/core/constants.ts` | owned |
| `src/core/factories.ts` | owned |
| `src/core/helpers.ts` | owned |
| `src/core/parsers.ts` | owned |
| `src/core/types.ts` | owned |
| `src/core/validators.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/src/core/BriefCompiler.test.ts` | owned |
| `tests/src/core/BriefManager.test.ts` | owned |
| `tests/src/core/factories.test.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/integration.test.ts` | owned |
| `tests/src/core/parsers.test.ts` | owned |
| `tests/src/core/shapers.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |

No status path is `shared` or `off-limits`. Off-limits vendored tests (`setupPolicy.ts`, `policy.test.ts`, `config.test.ts`, `distribution.test.ts`) are absent from status.

Diff hunks whose **file** no row’s Where names (Where files: `helpers.ts`, `cloners.ts`, `validators.ts`, `parsers.ts`, `factories.ts`, `BriefCompiler.ts`, `BriefManager.ts`, `integration.test.ts`, `guides.test.ts`, `guides/brief.md`, `types.ts`, `setup.ts`, `setup.test.ts`, `BriefCompiler.test.ts`, `README.md`):

- `src/core/constants.ts @@ -67,7 +67,6` — no `+` line (deletion `-	'complete',`)
- `src/core/constants.ts @@ -81,7 +80,7` `+/** Holds \`'gate'\` — the id of the \`buildGateDefinition()\` logical definition. */`
- `tests/src/core/BriefManager.test.ts @@ -1,65 +1,67` first `+` is in the import rewrite (fixture `buildReadyBrief` / `buildReadyTask`)
- same file `@@ -68,7 +70,7` … `@@ -361,7 +368,7` (fixture renames; e.g. `+		expect(registry.add(pinBrief(buildReadyBrief())).version).toBe(1)`)
- `tests/src/core/factories.test.ts @@ -1,7 +1,7` `+import { buildAdversarialValues, buildReadyBrief, buildReadyInput } from '../../setup.js'`
- `@@ -28,7 +28,7` `@@ -37,7 +37,7` `@@ -48,7 +48,7` `@@ -60,7 +60,7`
- `tests/src/core/helpers.test.ts @@ -2,20 +2,30` `+	buildBrief,` (after dropping `brief`)
- and further helpers.test hunks `@@ -23,24 +33,14` through the markdown/derivations hunks (first `+` typically `buildExample` / `buildReadyBrief` / `buildGateDefinition`)
- `tests/src/core/parsers.test.ts` — `Binary files a/tests/src/core/parsers.test.ts and b/tests/src/core/parsers.test.ts differ` (no `@@`)
- `tests/src/core/shapers.test.ts @@ -27,7 +27,7` `+import { buildReadyBrief } from '../../setup.js'`
- `@@ -301,7 +301,7` `+		expect(briefShape.category).toBe('object')`
- `tests/src/core/validators.test.ts @@ -17,7 +17,7` `+import { buildAdversarialValues, buildReadyBrief } from '../../setup.js'`

**Residue.** Diff `+` lines for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hit. Tree `src/`: no hit. Tree `tests/` excluding vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`: `tests/src` no hit; `tests/guides.test.ts` no hit; `tests/setup.ts` no hit; `tests/setup.test.ts` no hit. (Vendored files, excluded, do contain `TODO`/`debugger`/`timeout`/`console.info`/`skip`.)

**Parity.** Entities the diff touches in `src/**/types.ts` or class files: `BriefCompiler` / `BriefCompilerInterface`, `BriefManager` / `BriefManagerInterface`; TSDoc-only on `Citation`/`Brief` (Example’s file neighborhood, Proof).

Call-signature members `types.ts` vs `guides/brief.md` `## Methods`:

| member | types.ts | Methods table |
| --- | --- | --- |
| `compile` | `473-478` interface; method `BriefCompiler.ts:107` | `guides/brief.md:643` |
| `gate` | `types.ts:478` | `:644` |
| `destroy` (compiler) | implied on interface `:479` | `:645` |
| `has` | `types.ts:508` | `:691` |
| `brief` | `types.ts:509` | `:692` |
| `briefs` | `types.ts:510` | `:693` |
| `add` | `types.ts:511` | `:694` |
| `remove` | `types.ts:512-514` | `:695` |
| `destroy` (manager) | `types.ts:515` | `:696` |

Readonly data: `BriefCompilerInterface` `types.ts:474-476` `emitter` / `interpret` / `reason` — getters `BriefCompiler.ts:95,99,103`; guide Surface `:119` and Methods prose `:630-631`. `BriefManagerInterface` `types.ts:506-507` `emitter` / `count` — getters `BriefManager.ts:61,65`; Surface `:122`; Methods prose `:631`. `BriefRecord.id` `types.ts:410` — Surface `:116` `{ id, brief, version, hash }`. `Example.output` `types.ts:139` — Surface `:100`. `Proof` `text`/`command` `types.ts:220-221` — Surface `:105`.

Backticked identifiers on diff `+` guide/src-doc lines include `buildTask`, `buildReference`, `buildManifest`, `buildOutcome`, `buildGiven`, `buildExample`, `buildCitation`, `buildGap`, `buildRisk`, `buildOutput`, `buildProof`, `buildBrief`, `buildGateDefinition`, `deriveStatement`. Barrel `src/core/index.ts:1-11` is `export *` from `helpers.js`, `BriefCompiler.js`, `BriefManager.js`, `types.js`, etc., so those helper/class exports are re-exported. No `src/index.ts`. `guides/README.md`: no `buildTask`/`buildBrief`/`gateDefinition`/`deriveStatement` hits.

**Gates.** Report § Gates (`conform-brief-report.md:315-321`):

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm --prefix /home/user/fleet/brief run format:check` | 0 | `brief-proofs/final-1-format-check.txt` |
| `npm --prefix /home/user/fleet/brief run lint:check` | 0 | `brief-proofs/final-2-lint-check.txt` |
| `npm --prefix /home/user/fleet/brief run check` | 0 | `brief-proofs/final-3-check.txt` |
| `npm --prefix /home/user/fleet/brief run build` | 0 | `brief-proofs/final-4-build.txt` |
| `npm --prefix /home/user/fleet/brief test` | 0 | `brief-proofs/final-5-test.txt` |

Those files exist. `final-5-test.txt` Tests lines: `281`, `111`, `46`, `27`, `20` passed (`:15,:29,:43,:57,:71`). Evidence files do not print an `exit 0` token; they show the commands completing with passing summaries.

**Breaking.** Report § Breaking (`:334-367`): thirteen builder renames `task`→`buildTask` … `gateDefinition`→`buildGateDefinition`; `deriveStatement` return `string | undefined`; `buildExample` second parameter `output`; class parameter names onto `brief`. Word-boundary sweep of distinctive old published name `gateDefinition` over `/home/user/fleet/interpret`, `/home/user/fleet/reason`, `/home/user/fleet/contract`, `/home/user/fleet/guide`, `/home/user/fleet/test`, `/home/user/scaffold/src`: no hit. Same name in `/home/user/fleet/brief` is gone (only `buildGateDefinition`). Common-noun old names (`task`, `brief`, `output`, …) remain as types/members inside brief; not re-swept as full `\btask\b` over every fleet package (see Unknowns).

**Writing sweep** over diff `+` lines (pattern as specified), prose files `guides/**`, `README.md`, src doc comments, test titles/comments:

Banned-word hits (`-i` `\b(should|simply|easy|…|new|…)\b` on `+` lines):
- `conform-brief.diff:238` `+			buildOutcome(2, 'tests cover the new code paths'),`
- `:265` `+		rules: ['No new dependencies.'],`
- `:277` `+		gaps: [buildGap('rules', 'Should validation message wording change?')],`
- `:412` `+		buildGap('output', 'Should the result land as a diff or full files?', {`
- `:1039` `+ * buildGap('rules', 'Should validation message wording change?') // blocking: false`
- `:1959` `+					buildOutcome(2, 'tests cover the new code paths'),`
- `:1961` `+				rules: ['No new dependencies.'],`
- `:1973` `+				gaps: [buildGap('rules', 'Should validation message wording change?')],`
- `:2010` `+			{ rank: 2, text: 'tests cover the new code paths', required: true },`
- `:2012` `+		expect(draft.rules).toStrictEqual(['No new dependencies.'])`
- `:2033` `+				question: 'Should validation message wording change?',`

Count-over-set hits:
- `conform-brief.diff:1908` `+// every parity assertion stayed passing. These two tests transcribe the guide's flagship fences` → `two tests`.

No other count-pattern hit on `+` lines. Tree `guides/brief.md:367,368,372,376` still contain `defaults to` (pre-existing / table text on `+` builder rows in the same large hunk).

# Distillate

- brief-obj-1: type-first imports now at helpers.ts:1, cloners.ts:1, validators.ts:1, parsers.ts:1, factories.ts:1, BriefCompiler.ts:1, BriefManager.ts:1, setup.ts:1, setup.test.ts:1, BriefCompiler.test.ts:1 | diff present yes | old form hits 0 | report matches yes
- brief-obj-3: deriveStatement helpers.ts:1266 returns undefined:1268; deriveTask:1327 | diff present yes | old form hits 3 (`return ''` setup.ts:236,303,366, not this function) | report matches yes
- brief-obj-4: block at guides.test.ts:342 (brief integration.test.ts:132 gone) | diff present yes | old form hits 1 (new home :342) | report matches no (`:335` vs now `:342`)
- brief-subj-1: build* at helpers.ts:51–338; fixtures buildReady* setup.ts:47,52,65 | diff present yes | old form hits 11 call-sites (registry `brief(` / `gap(s)` strings) | report matches yes
- brief-subj-2: guides/brief.md:352–353 “Value builders” / “named earlier” | diff present yes | old form hits 0 on named paths | report matches yes (fix-round wording, not original “above”)
- brief-subj-3: guides/brief.md:144; BLANK_PATTERN constants.ts:119 | diff present yes | old form hits 0 | report matches yes
- brief-subj-4: assertBrief(value) helpers.ts:895 | diff present yes | old form hits 0 as parameter; prose/literal `\bdata\b` remains | report matches yes
- brief-subj-5: helpers.ts:100–101 If true/false Default | diff present yes | old form hits 0 | report matches yes
- brief-subj-6: Default: helpers.ts:101,183,274,1176 | diff present yes | old form hits 5 `defaults to` in guides/brief.md:367,368,372,376,683 | report matches no if the “no defaults to remains” sentence is read outside src/core
- brief-subj-7: gate(brief) BriefCompiler.ts:192; add(brief) BriefManager.ts:84; types.ts:478,511 | diff present yes | old form hits 0 on those methods | report matches yes
- brief-subj-8: buildExample(… output …) helpers.ts:150–151 | diff present yes | old form hits 0 | report matches yes
- brief-subj-9: 18 `@param` / 18 `@returns` validators.ts | diff present yes | old form hits 0 | report matches yes
- fleet-F1: isBrowserVuePath absent | diff present no (noop) | old form hits 0 | report matches yes
- fleet-F2: no class `readonly id`; BriefRecord.id types.ts:410 | diff present no (noop) | old form hits 1 interface | report matches yes

Scope tags: 22 status paths all `owned`; 0 `shared`; 0 `off-limits`.

Residue: diff `+` 0 hits; tree src 0; owned tests 0.

Writing: 11 banned-word `+` hits (`new`/`Should`); 1 count hit (`two tests` at guides.test.ts header `+`).

Parity: compiler methods compile/gate/destroy types.ts:477-479 ↔ guide:643-645; manager has/brief/briefs/add/remove/destroy types.ts:508-515 ↔ guide:691-696; data emitter/interpret/reason and emitter/count named at guide:119,122,630-631; barrel `src/core/index.ts:1-11` re-exports helpers/classes.

# Unknowns

- `tests/src/core/parsers.test.ts` is a binary diff (`conform-brief.diff:4464-4466`); no `@@` hunks or `+` lines readable, so first-`+` listing for that file is unreachable.
- Full word-boundary `\btask\b` / `\bbrief\b` / `\boutput\b` (and inflections) over every `/home/user/fleet/*/src` and `*/tests` plus `/home/user/scaffold/src` was not enumerated hit-by-hit; those tokens are ordinary domain words. Distinctive `gateDefinition` was swept in interpret, reason, contract, guide, test, and scaffold/src with no hit.
- Workspace-rooted search for `from '@orkestrel/brief'` under `/home/user/fleet` returned only the brief checkout; other fleet `package.json` files exist (48 packages) but their src/tests were not each opened for old import specifiers.
- Gate evidence files do not record a numeric exit code; the report’s `0` is not independently printed in `final-*-*.txt`.
- `guides.test.ts` describe line moved between the report’s `:335` and now `:342` during fix rounds; exact historical line at report-write time was not reconstructed beyond the current tree.
- Inflection sweep of the thirteen common builder nouns (`tasks`, `tasked`, `tasking`, …) over the named paths was not dumped in full (would list every `Task`/`Brief`/`output` member). Call-form `\bname\(` and `gateDefinition` inflections were.

# Journal

# Deviation

No file created, edited, or deleted in this lane; no command that changes the tree. Unreadable as unified hunks: `tests/src/core/parsers.test.ts` (binary in `conform-brief.diff`). Sweeps not run as live `grep` in a shell (Read/Grep only): same patterns executed via the Grep tool over the named paths. Fleet-wide old-name sweep incomplete for common nouns as under Unknowns.