## Question
For every row of `unit conform-template`, what does the tree carry now, what did its diff change, and do the report’s readings match the tree?

## Evidence

### Per-row evidence

**template-obj-1**

- **Rule:** “When one entity grows a family (entity + manager or sibling implementations), nest only its class files in a lowercase plural folder.” — `/home/user/scaffold/.claude/rules/architecture.md:209`
- **Site now:** `Template` is at `src/core/templates/Template.ts:35`, with `#contract` immediately above at `:38` and `id` below at `:39`. `TemplateManager` is at `src/core/templates/TemplateManager.ts:47`, with `#templates` below at `:48`. The barrel exports `./templates/Template.js` and `./templates/TemplateManager.js` at `src/core/index.ts:6-7`; factories import the same paths at `src/core/factories.ts:7-8`. Mirrored tests are at `tests/src/core/templates/Template.test.ts:1` and `tests/src/core/templates/TemplateManager.test.ts:1`. Guide links are at `guides/template.md:237` and `:239`.
- **Diff at site:** `@@ -8,12 +8,12 @@` in the moved `Template.ts`; `@@ -10,18 +10,18 @@` in the moved `TemplateManager.ts`; `@@ -4,8 +4,8 @@` in `factories.ts`; `@@ -3,6 +3,6 @@` in `index.ts`; rename-only hunks for both test files; and the guide-link changes at `@@ -224,27 +225,29 @@`. The operative paths appear verbatim in `+import { Template } from './templates/Template.js'`, `+import { TemplateManager } from './templates/TemplateManager.js'`, and the two `+export *` lines.
- **Old form sweep:** Pattern `src/core/Template\.ts|src/core/TemplateManager\.ts|tests/src/core/Template\.test\.ts|tests/src/core/TemplateManager\.test\.ts|['"]\./Template\.js['"]|['"]\./TemplateManager\.js['"]`, over `src`, `tests`, `guides/template.md`, `guides/README.md`, and `README.md`, case-insensitive: one allowed hit at `src/core/templates/TemplateManager.ts:18` (`./Template.js`); no stale root paths, old test paths, or stale barrel paths. The class names were preserved, not renamed.

**template-obj-2**

- **Rule:** “Measure an elapsed interval with `performance.now()`, never `Date.now()`.” — `/home/user/scaffold/.claude/rules/tests.md:38`
- **Site now:** `tests/src/core/helpers.test.ts:198` reads `const start = performance.now()`; `:200` reads `const elapsed = performance.now() - start`; the second pair is at `:234` and `:236`, with budget assertions at `:202` and `:238`.
- **Diff at site:** `@@ -197,9 +195,9 @@` and `@@ -233,9 +231,9 @@`; the four `+` lines use `performance.now()`. The operative repair is present verbatim.
- **Old form sweep:** Pattern `Date\.now`, over the named source, test, and guide paths: no hit.
- **Report reading:** The table says `applied`: “`tests/src/core/helpers.test.ts:198,200,234,236` read `performance.now()`; the `Date.now` sweep is empty.” — `/home/user/scaffold/tmp/units/conform/conform-template-report.md:17`. This matches the tree.
- **Proof reading:** No `template-obj-2` control file exists under `/home/user/work/evidence/template-proofs/`; the report records no failing-first command or counts for this row.

**template-obj-3**

- **Rule:** “Transcribe each flagship fence and assert the values its comments claim.” — `/home/user/scaffold/.claude/rules/tests.md:70-72`
- **Site now:** `tests/guides.test.ts:197` starts `describe('flagship fences', ...)`, with fence assertions through `:299`. The corrected guide fence is `guides/template.md:228`: `templates.validate('greeting', {}).missing // ['name']`.
- **Diff at site:** `@@ -168,3 +188,114 @@` adds the transcription block; `@@ -224,27 +225,29 @@` changes the fence value. The repair is present in `+expect(templates.validate('greeting', {}).missing).toEqual(['name'])`.
- **Old form sweep:** Pattern `templates\.validate\('greeting', \{\}\)\.missing // \[\]`, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`tests/guides.test.ts:192-301` transcribes each value-claiming fence; `guides/template.md:228` corrected to `['name']`.” — report `:18`. This matches the tree.
- **Proof reading:** `template-obj-3-control-old-fence-red.txt` records `1 failed | 30 passed (31)` at `template-obj-3-control-old-fence-red.txt:30`; `template-obj-3-fences-green.txt` records `1 passed` and `31 passed (31)` at `:8-9`. The report’s recorded command is `npm run test:guides`.

**template-obj-4**

- **Rule:** “Never assert an implementation against itself.” — `/home/user/scaffold/.claude/rules/tests.md:35`
- **Site now:** `tests/src/core/helpers.test.ts:170` pins `toBe('-0')`; surrounding cases remain at `:169` and `:171-174`.
- **Diff at site:** `@@ -169,7 +167,7 @@`; the operative `+...toBe('-0')` line is present.
- **Old form sweep:** Pattern `toBe\(formatValue\(-0, 'en-US'\)\)`, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`tests/src/core/helpers.test.ts:170` pins the host literal `'-0'`, with no call to `formatValue`.” — report `:19`. This matches the tree.
- **Proof reading:** `template-obj-4-control-plain-zero-red.txt` records `1 failed | 43 passed (44)` at `:30`; `template-obj-4-control-minus-zero.txt` records `1 passed` and `44 passed (44)` at `:50`. The report’s recorded command is `npm run test:src:core`.

**template-obj-5**

- **Rule:** “Add or substantively expand a capability with its first real consumer; do not speculate.” — `/home/user/scaffold/AGENTS.md:70-71`
- **Site now:** `tests/setup.ts:1-5` retains the structural setup module and no longer declares `isBrowserVuePath`. `tests/setup.test.ts:1` imports the module, and `:9-11` assert `Object.keys(setup)` is empty. The `setup` project remains at `vite.config.ts:75-84` and `:133`; `test:setup` remains at `package.json:66`, and the test chain still includes it at `package.json:52`.
- **Diff at site:** `@@ -1,14 +1,13 @@` rewrites `tests/setup.test.ts`; `@@ -1,10 +1,4 @@` removes the helper from `tests/setup.ts`. There is no diff hunk removing the setup project or script required by this row’s operative repair.
- **Old form sweep:** Pattern `isBrowserVuePath`, over `src`, `tests`, `guides/template.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** The report is internally inconsistent. Its opening says the row is “stopped”; its table says `applied` and claims “the helper is gone and `tests/setup.test.ts` is the export-free proof”; its deviation says “The subject is untouched in the tree” — report `:1-8`, `:20-21`, and `:136-151`. The table’s tree observation matches the current tree; the stopped/untouched statements do not. The row’s full operative repair does not match because the setup axis remains.
- **Proof reading:** No `template-obj-5` control file exists. The report records `npm run test:setup` with `2 passed`, but no failing-first control.

**template-obj-6**

- **Rule:** “NEVER name a list item by its position. Write the item's name, never its ordinal or its number.” — `/home/user/scaffold/AGENTS.md:174`
- **Site now:** Current sites are:
  - `src/core/types.ts:6-7` — “Types are the source of truth; every discriminant names its axis…”
  - `src/core/types.ts:156` — “Declares the template contract — exact bijection with `Template`.”
  - `src/core/types.ts:186` — push observation surface without section numbering.
  - `src/core/types.ts:207` — “initial event listeners.”
  - `src/core/types.ts:220` — “singular/plural accessors and batch overloads.”
  - `src/core/templates/TemplateManager.ts:23-24` — “singular/plural accessors, batch `remove` overloads, and emitter ownership.”
  - `src/core/templates/TemplateManager.ts:109` — “Returns one registered `TemplateInterface` by id.”
  - `src/core/errors.ts:3`, `src/core/constants.ts:3`, `src/core/helpers.ts:17`, `tests/setup.ts:1`, and `tests/src/core/helpers.test.ts:14` contain the revised prose.
  - `guides/template.md:6`, `:39`, `:52`, `:96`, `:158`, `:167`, `:194`, `:208-209` contain the revised guide prose and rows.
  - `guides/README.md:3` and `:40` contain the revised index prose.
- **Diff at site:** The relevant hunk headers are `@@ -1,6 +1,6 @@` and `@@ -35,4 +37,4 @@` in `guides/README.md`; `@@ -2,8 +2,8 @@`, `@@ -36,11 +36,11 @@`, `@@ -49,7 +49,7 @@`, `@@ -93,8 +93,8 @@`, `@@ -152,10 +152,10 @@`, `@@ -164,7 +164,7 @@`, `@@ -191,7 +191,7 @@`, and `@@ -201,18 +201,19 @@` in `guides/template.md`; plus the source and test comment hunks at `conform-template.diff:233`, `:247`, `:292`, `:380`, `:415`, `:516`, `:562`, `:571`, `:790`, and `:806`. The operative rewritten text is present.
- **Old form sweep:** Patterns `AGENTS\s*§|§\s*[0-9]`, case-insensitive, over `src`, `tests`, `guides/template.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** The table says `applied`: “Section-number citations gone from source, tests, and this package's guides; the `AGENTS §` and `§ <number>` sweeps are empty.” — report `:25`. This matches the tree.

**template-subj-1**

- **Rule:** “ALWAYS finish the requested implementation: no empty stubs, deferred logic, or concealed follow-up work.” — `/home/user/scaffold/AGENTS.md:46`
- **Site now:** `README.md:3-9` carries the package description. `README.md:17-20` carries the Requirements section.
- **Diff at site:** `@@ -1,6 +1,12 @@` replaces the placeholder with the description; `@@ -8,14 +14,28 @@` adds Requirements. The operative description and dependency names appear in the `+` lines.
- **Old form sweep:** Pattern `TODO: one-line description`, case-insensitive, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`README.md:3-9` carries the real description; `## Requirements` added at `:17-20`.” — report `:26`. This matches the tree.

**template-subj-2**

- **Rule:** “Falsify a prose claim the way you falsify a code claim.” — `/home/user/scaffold/.claude/rules/documentation.md:37`
- **Site now:** `README.md:25-30` imports both factories and constructs a valid template and manager; `:34-37` documents the `missing` policy.
- **Diff at site:** `@@ -8,14 +14,28 @@`; the invalid `createTemplate({ id: 'example' })` line is removed and the worked call is present in `+` lines.
- **Old form sweep:** Pattern `createTemplate\(\{ id: 'example' \}\)`, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`README.md:24-37` runs the worked call the guide proves, plus the `missing` behaviour paragraph.” — report `:27`. This matches the tree.

**template-subj-4**

- **Rule:** “Name the noun after `this`, `these`, or `it` wherever the reader could attach the pronoun to another referent.” — `/home/user/scaffold/.claude/rules/writing.md:38-40`
- **Site now:** `guides/README.md:19-24` supplies the reason: “it is kept here so a reader can see the guard, combinator, parser, and shape-DSL primitives every template contract compiles through without leaving this guide set.” The later back-reference remains at `:27`.
- **Diff at site:** `@@ -19,7 +19,9 @@`; the operative paragraph is present in `+` lines.
- **Old form sweep:** Pattern `it is kept here for the same reason`, case-insensitive, over the named paths: no hit at the first paragraph; the intended later `for the same reason` sentence is not the removed first-paragraph form.
- **Report reading:** The table says `applied`: “`guides/README.md:19-24` states its own reason; the `emitter.md` paragraph's back-reference now has an antecedent.” — report `:28`. This matches the tree.

**template-subj-5**

- **Rule:** “A parity failure identifies drift; never suppress or weaken the test.” — `/home/user/scaffold/.claude/rules/documentation.md:34`
- **Site now:** `guides/template.md:43` reads `` `{ missing?, locale? }` — per-call overrides for `fill`. ``; `src/core/types.ts:70` still describes the same options for `fill`.
- **Diff at site:** `@@ -36,11 +36,11 @@`; the `+` line removes `/ validate` verbatim.
- **Old form sweep:** Pattern `overrides for \`fill\` / \`validate\``, case-insensitive, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`guides/template.md:43` reads `` `{ missing?, locale? }` — per-call overrides for `fill`. ``” — report `:29`. This matches the tree.

**template-subj-7**

- **Rule:** “Claim only what the reader can check.” — `/home/user/scaffold/.claude/rules/writing.md:38-40`
- **Site now:** `src/core/helpers.ts:25-30` explains `String(value)` matching; `:139` says values format “through `formatValue`”; `:148-152` describes bare interpolation and the token-class limit without the foreign symbol.
- **Diff at site:** `@@ -23,10 +23,11 @@`, `@@ -135,7 +136,7 @@`, and `@@ -144,11 +145,11 @@`; the foreign-name removals and replacement text are present in `+` lines.
- **Old form sweep:** Pattern `interpolateMessage`, case-insensitive, over the named paths: no hit. Pattern `interpolat`, case-insensitive, has only permitted “interpolation” hits at `src/core/helpers.ts:149`, `guides/template.md:248`, and `tests/src/core/helpers.test.ts:17`.
- **Report reading:** The table says `applied`: “`src/core/helpers.ts:148-152` states the rule without a foreign name; `:27-30` states the `String(value)` match.” — report `:31`. This matches the tree.

**template-subj-8**

- **Rule:** “Every backticked API in a guide resolves to a real public export.” — `/home/user/scaffold/.claude/rules/documentation.md:31`
- **Site now:** `guides/template.md:248-250` names bare interpolation and the `{` token-class limit. `tests/src/core/helpers.test.ts:17` names bare interpolation; `:50-53` names the token-class limit without `interpolateMessage`.
- **Diff at site:** Guide hunk `@@ -224,27 +225,29 @@`; test hunk `@@ -11,11 +11,10 @@` and `@@ -48,11 +47,10 @@`. The operative guide and describe replacements are present.
- **Old form sweep:** Pattern `interpolateMessage`, case-insensitive, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`guides/template.md:246-250`; `tests/src/core/helpers.test.ts:17,50,51,52-53`; the false attribution dropped with the name.” — report `:32`. The cited current guide lines are shifted to `:248-250`, but the content matches.
- **Report line check:** The report’s `guides/template.md:246-250` pointer is not exact after the tree moved the text; current `:246-247` is the test-file link and `:248-250` is the described behavior.

**template-subj-9**

- **Rule:** “Write a default as `Default: …` and a thrown error as `Thrown when …`.” — `/home/user/scaffold/.claude/rules/typescript.md:79`; “State a prerequisite and the failure behavior wherever the symbol has either.” — `:80`
- **Site now:** `@throws` appears at `src/core/templates/Template.ts:27` and `:110`; `src/core/factories.ts:17` and `:38`; `src/core/templates/TemplateManager.ts:85` and `:234`. Existing `NOTFOUND` tags remain at `:233`, `:246`, and `:257`.
- **Diff at site:** Factory additions are under `@@ -14,6 +14,7 @@` and `@@ -34,5 +35,6 @@`; Template additions under `@@ -22,7 +22,9 @@` and `@@ -105,6 +107,7 @@`; manager additions under `@@ -82,6 +82,7 @@` and `@@ -209,6 +231,7 @@`. The operative `Thrown when …` text is present. No `@throws` was added to `fillTemplate` or `formatValue`, as allowed by the amended repair.
- **Old form sweep:** No name, phrase, or path is removed or renamed by this row; an `@throws` presence sweep over the listed symbols finds all required additions.
- **Report reading:** The table says `applied`: “`@throws` in `Thrown when …` form on `register`, the `Template` class block, `Template#fill`, both factories, and the `MISSING` line beside `NOTFOUND` on `TemplateManager#fill`.” — report `:29-30`. This matches the tree.

**template-subj-10**

- **Rule:** “Re-read the prose last, against what actually shipped.” — `/home/user/scaffold/.claude/rules/documentation.md:39`
- **Site now:** `src/core/types.ts:40-42` states that `category` and `tags` are query fields and `summary` and `description` are carried metadata.
- **Diff at site:** `@@ -37,8 +37,10 @@`; the replacement text appears in `+` lines.
- **Old form sweep:** Pattern `catalog metadata for`, case-insensitive, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`src/core/types.ts:39-42` names the query fields and the carried fields separately.” — report `:30`. The current start is `:40`, but the reading matches.

**template-subj-11**

- **Rule:** “Private methods and overload-specific notes use single-line `//` comments, not public TSDoc.” — `/home/user/scaffold/.claude/rules/typescript.md:83`
- **Site now:** `src/core/templates/TemplateManager.ts:155` reads “Removes one, several, or every registered template.” The overload note is a `//` comment at `:168-169`, immediately before the overloads at `:170-172`.
- **Diff at site:** `@@ -152,8 +152,7 @@` removes the declaration-order clause; `@@ -166,6 +165,8 @@` adds the single-line comment.
- **Old form sweep:** Pattern `array overload declared first`, case-insensitive, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`src/core/TemplateManager.ts:155` summary trimmed; the declaration-order note is a `//` comment at `:168-169`; signatures unmoved.” — report `:30-31`. The path is stale after the move, but the content matches at `src/core/templates/TemplateManager.ts`.

**template-subj-12**

- **Rule:** “The table replaces `via` with `through` or `by using`.” — `/home/user/scaffold/.claude/rules/writing.md:95`
- **Site now:** `src/core/templates/Template.ts:25` and `:139`, `src/core/helpers.ts:25` and `:139`, and `tests/src/core/helpers.test.ts:51-53` use the revised wording. `tests/src/core/templates/TemplateManager.test.ts:355` says “through hooks”.
- **Diff at site:** Template move hunk `@@ -22,7 +22,9 @@` and `@@ -133,7 +136,7 @@`; helpers hunks `@@ -23,10 +23,11 @@` and `@@ -135,7 +136,7 @@`; helper-test hunk `@@ -48,11 +47,10 @@`; manager-test hunk `@@ -316,7 +352,7 @@`. The operative replacements are present.
- **Old form sweep:** Pattern `\b(via|we|our|ours|let's)\b`, case-insensitive, over the named paths: no hit.
- **Report reading:** The table says `applied`: “`via` replaced at `src/core/templates/Template.ts:25,139`, `src/core/helpers.ts:25,139`; `our` dropped at `tests/src/core/helpers.test.ts:51-53`; `through hooks` at `tests/src/core/templates/TemplateManager.test.ts:355`.” — report `:32`. This matches the tree.

**template-subj-14**

- **Rule:** “Call `this.#emitter.destroy()` last in the entity's `destroy()`.” — `/home/user/scaffold/.claude/rules/patterns.md:79`
- **Site now:** `src/core/types.ts:249` declares `destroy(): void`. `src/core/templates/TemplateManager.ts:206-210` documents it, and `:221-224` clears templates before calling `this.#emitter.destroy()`. The guide method row is `guides/template.md:213`; the fence line is `:232`; tests are at `tests/src/core/templates/TemplateManager.test.ts:309-343`.
- **Diff at site:** Guide additions are in `@@ -201,18 +201,19 @@` and `@@ -224,27 +225,29 @@`; interface addition in `@@ -242,6 +246,7 @@`; implementation/tests in `@@ -201,6 +202,27 @@` and `@@ -306,6 +306,42 @@`. The `+destroy(): void`, implementation, guide row, fence line, and tests are present.
- **Old form sweep:** No symbol is renamed or removed; `destroy` is an additive API. No old-form hit applies.
- **Report reading:** The table says `applied`: “`destroy(): void` on `TemplateManagerInterface` (`types.ts:249`), implemented at `TemplateManager.ts:221-224`, guide row `:213` and fence line `:232`, tests at `TemplateManager.test.ts:309-343`.” — report `:33`. This matches the tree after resolving moved paths.
- **Proof reading:** `template-subj-14-types-red.txt` records TS2420 and TS2741 at `:4-7`; `template-subj-14-types-green.txt` is clean at `:1-10`. The report records `npm run check`. No failing-first behavioral control for `destroy()` is present.

### Fleet rows

**fleet-F1**

- **Site now:** `tests/setup.ts:1-5` has no `isBrowserVuePath`; `tests/setup.test.ts:1` imports the module and `:9-11` assert no exports. There is no browser environment in the package tree.
- **Diff at site:** `@@ -1,14 +1,13 @@` rewrites the proof; `@@ -1,10 +1,4 @@` removes the helper. The F1 repair is present.
- **Report reading:** The table says `applied`: “Carries template-obj-5; the export-free proof shape.” — report `:34`. This matches the tree.

**fleet-F2**

- **Site now:** No implementation class has a public `readonly id: string` before private fields. `Template` has private fields at `src/core/templates/Template.ts:36-38` before public `id` at `:39`; `TemplateManager` has only private fields at `src/core/templates/TemplateManager.ts:48-50`; `TemplateError` has no `id` field at `src/core/errors.ts:17-19`.
- **JSON serialization sweep:** `JSON.stringify` appears only in `tests/distribution.test.ts:49`, `:52`, `:479`, and `:617`; no class instance serialization occurs in the package’s source, tests, or guides.
- **Report reading:** The table says `noop`: “No class in the package has the shape…” — report `:34-35`. This matches the tree.

### Across the unit

**Scope**

The status evidence lists these paths, all under `Owned`:

- `README.md`
- `guides/README.md`
- `guides/template.md`
- `src/core/constants.ts`
- `src/core/errors.ts`
- `src/core/factories.ts`
- `src/core/helpers.ts`
- `src/core/index.ts`
- `src/core/Template.ts -> src/core/templates/Template.ts`
- `src/core/TemplateManager.ts -> src/core/templates/TemplateManager.ts`
- `src/core/types.ts`
- `tests/guides.test.ts`
- `tests/setup.ts`
- `tests/src/core/helpers.test.ts`
- `tests/src/core/Template.test.ts -> tests/src/core/templates/Template.test.ts`
- `tests/src/core/TemplateManager.test.ts -> tests/src/core/templates/TemplateManager.test.ts`

No `Shared` or `Off-limits` path appears in the status evidence. The diff additionally changes `tests/setup.test.ts`, which is Owned but absent from `conform-template.status`.

All diff hunks map to a row’s named site or its moved destination. No uncovered-file hunk was identified. The hunk inventory is recorded by file in `conform-template.diff:5-924`, including the `tests/setup.test.ts` hunk at `:763`.

**Residue**

- Diff `+`-line pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hits.
- Tree pattern over `src/**/*.ts` and `tests/**/*.ts`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: no hits.
- The excluded vendored files contain unrelated matches, including `tests/distribution.test.ts:44,684`, `tests/setupPolicy.ts:1236-2687`, and `tests/config.test.ts:687,945,950`; these are outside the requested population.

**Parity**

| Entity | Interface call-signature members in `src/core/types.ts` | Guide method rows |
|---|---|---|
| `TemplateInterface` | `definition()` `:177`; `fill()` `:178`; `validate()` `:179`; `parameters()` `:180` | `definition` `:172`; `fill` `:173`; `validate` `:174`; `parameters` `:175` |
| `TemplateManagerInterface` | `register()` `:237-240`; `template()` `:241`; `templates()` `:242`; `find()` `:243`; `has()` `:244`; `remove()` `:245-247`; `clear()` `:248`; `destroy()` `:249`; `fill()` `:250`; `validate()` `:251`; `parameters()` `:252` | `register` `:207`; `template` `:208`; `templates` `:209`; `find` `:210`; `has` `:211`; `remove` `:212`; `clear` `:213`; `destroy` `:214`; `fill` `:215`; `validate` `:216`; `parameters` `:217` |

Readonly interface data properties are represented in the guide’s Surface rows: `TemplateInterface` names `id`, `name`, `content`, `placeholders`, and catalog metadata at `guides/template.md:50`; `TemplateManagerInterface` names `emitter` and `count` at `:52`.

Added guide backticked API references resolve through the barrel:

- Exported by `src/core/index.ts:1-8`: `TemplateManagerEventMap`, `TemplateFillOptions`, `TemplateManagerInterface`, `TemplateInterface`, `Template`, `TemplateError`, and `UNSAFE_FIELD_SEGMENTS`.
- `destroy`, `register`, `template`, `templates`, `find`, `has`, `remove`, `clear`, `fill`, `validate`, `parameters`, `Template#fill`, `#validate`, `TemplateFillOptions.missing`, `MISSING`, `__proto__`, `constructor`, and `prototype` are member names, properties, or values, not standalone barrel exports.
- External package identifiers `@orkestrel/contract` and `@orkestrel/emitter` are not exports of this barrel.

**Gates**

The report’s `§ Gates` table records:

- `npm --prefix /home/user/fleet/template run format:check` — exit `0`
- `npm --prefix /home/user/fleet/template run lint:check` — exit `0`
- `npm --prefix /home/user/fleet/template run check` — exit `0`
- `npm --prefix /home/user/fleet/template run build` — exit `0`
- `npm --prefix /home/user/fleet/template test` — exit `0`
- `npx scaffold audit --offline` — exit `0`

The report gives the audit summary: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.` — report `:99-109`. The gate evidence file independently contains the whole-suite reading at `/home/user/work/evidence/template-proofs/gate-test.txt:10-70`.

**Breaking**

The report names only the added `destroy(): void` contract at `src/core/types.ts:249`. It states that direct external implementers of `TemplateManagerInterface` would need `destroy()`, while the fleet closure names none. No published symbol was renamed or removed, so the requested old-published-name fleet sweep has no applicable target. `Template` and `TemplateManager` moved internally while retaining their barrel exports.

**Writing sweep**

- Pattern over diff `+` lines in `guides/**`, `README.md`, source doc comments, and test titles/comments: one relevant hit, `src/core/templates/TemplateManager.ts:216`, where the TSDoc example contains `new TemplateManager()`.
- No other banned-word hit was found in prose, guide text, test titles, or test comments.
- Growable-count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hit.
- The report does not contain a separate writing-sweep block.

## Distillate

template-obj-1: `src/core/templates/Template.ts:35`, `src/core/templates/TemplateManager.ts:47`, barrel `src/core/index.ts:6-7` | diff present yes | old form hits 1 allowed same-folder import | report matches yes  
template-obj-2: `tests/src/core/helpers.test.ts:198,200,234,236` | diff present yes | old form hits 0 | report matches yes  
template-obj-3: `tests/guides.test.ts:197-299`, `guides/template.md:228` | diff present yes | old form hits 0 | report matches yes  
template-obj-4: `tests/src/core/helpers.test.ts:170` | diff present yes | old form hits 0 | report matches yes  
template-obj-5: `tests/setup.ts:1-5`, `tests/setup.test.ts:1,9-11`, setup axis retained | diff present partial | old form hits 0 | report matches no  
template-obj-6: cited source, test, and guide prose sites with current lines listed above | diff present yes | old form hits 0 | report matches yes  
template-subj-1: `README.md:3-9,17-20` | diff present yes | old form hits 0 | report matches yes  
template-subj-2: `README.md:25-37` | diff present yes | old form hits 0 | report matches yes  
template-subj-4: `guides/README.md:19-24` | diff present yes | old form hits 0 | report matches yes  
template-subj-5: `guides/template.md:43` | diff present yes | old form hits 0 | report matches yes  
template-subj-7: `src/core/helpers.ts:25-30,139,148-152` | diff present yes | old form hits 0 | report matches yes  
template-subj-8: `guides/template.md:248-250`, helper tests `:17,50-53` | diff present yes | old form hits 0 | report matches yes  
template-subj-9: `Template.ts:27,110`, `TemplateManager.ts:85,234`, factories `:17,38` | diff present yes | old form hits 0 | report matches yes  
template-subj-10: `src/core/types.ts:40-42` | diff present yes | old form hits 0 | report matches yes  
template-subj-11: `TemplateManager.ts:155,168-169` | diff present yes | old form hits 0 | report matches yes  
template-subj-12: revised wording at all named sites, including manager test `:355` | diff present yes | old form hits 0 | report matches yes  
template-subj-14: `types.ts:249`, manager `:206-224`, guide `:214,232`, tests `:309-343` | diff present yes | old form hits 0 | report matches yes  
fleet-F1: export-free setup proof and helper removal | diff present yes | old form hits 0 | report matches yes  
fleet-F2: no matching public-`id` class shape | diff present no-op | old form hits 0 | report matches yes  

Scope tags: every status-listed path is `owned`; no `shared` or `off-limits` status path appears. `tests/setup.test.ts` is an Owned diff path missing from the status evidence.

Residue: diff `+` lines 0 hits; restricted tree sweep 0 hits.

Writing hits: `src/core/templates/TemplateManager.ts:216` — `new`; count-pattern hits 0.

Parity: `TemplateInterface` has `definition`, `fill`, `validate`, `parameters`; the guide lists the same rows. `TemplateManagerInterface` has `register`, `template`, `templates`, `find`, `has`, `remove`, `clear`, `destroy`, `fill`, `validate`, `parameters`; the guide lists the same rows. Readonly data properties are named in the guide Surface rows.

## Unknowns

- `template-obj-2`: no dedicated failing-first control file exists.
- `template-obj-5`: no dedicated control file exists; the report gives conflicting dispositions and evidence.
- `template-subj-14`: only typecheck red/green controls exist; no behavioral failing-first control for `destroy()`.
- The host `node -p "(-0).toLocaleString('en-US')"` probe was not independently rerun; the predecessor’s control evidence records the resulting `'-0'` fixture.
- The current `git status --short` could not be independently rerun in this read-only lane; `conform-template.status` omits the changed `tests/setup.test.ts` shown by `conform-template.diff`.

## Journal

Leave this line for the driver.

## Deviation

The evidence set is inconsistent: `conform-template.diff` contains the `tests/setup.test.ts` edit at `:759-784`, but `conform-template.status` does not list that Owned file. The report also says `template-obj-5` is both stopped and applied, and its “subject is untouched” statement conflicts with the current tree at `tests/setup.ts:1-5` and `tests/setup.test.ts:1,9-11`.

No unread file or off-scope tree path was identified.