## Question

For every `unit conform-form` row, the tree, diff, report, and evidence align as mapped below.

## Evidence

### Per-row evidence

**form-obj-1**

- Law: “Data tables and case matrices belong in a setup file at any size; test registration does not.” “Test files import shared infrastructure rather than declaring local fixture factories.”
- Site now: The builders are exported from `tests/setup.ts:250-330`; `tests/setup.test.ts:241-262` proves them; `tests/src/core/helpers.test.ts:53-54,1413-1414` imports and uses the two required builders.

```249:253:tests/setup.ts
}

export function createMatrixField(control: FieldControl, rule: FieldRule): FormField {
	const field = MATRIX_FIELDS[control]
	return { ...field, rule }
}
```

- Diff: `tests/setup.ts @@ -1,5 +1,6 @@`, `@@ -246,6 +247,91 @@`; `tests/setup.test.ts @@ -5,7 +5,9 @@`, `@@ -23,6 +25,8 @@`, `@@ -233,6 +237,32 @@`; `tests/src/core/helpers.test.ts @@ -1,6 +1,5 @@`, `@@ -43,7 +42,6 @@`, `@@ -52,6 +50,8 @@`, `@@ -60,87 +60,6 @@`. The operative move, exports, imports, and proof are present in `+` lines.
- Old-form sweep: Word-boundary pattern `\b(createMatrixField|createMinimumCase|createMaximumCase|createMatrixCase)\b` over `src/**/*.ts`, `tests/**/*.ts`, `guides/form.md`, `guides/README.md`, and `README.md` found 14 expected references in `tests/setup.ts`, `tests/setup.test.ts`, and `tests/src/core/helpers.test.ts`. Case-insensitive inflection pattern `(createMatrixField|createMinimumCase|createMaximumCase|createMatrixCase)(s|ed|ing)?` over the same paths found the same 14 references and no stale declaration in `helpers.test.ts`.
- Report: “Builders moved to `tests/setup.ts`, exported, and proved from `tests/setup.test.ts`.” The tree matches this statement.
- Proof: `form-obj-1-absent.txt` records exit 1 with `1 failed, 13 passed`; `form-obj-1-green.txt` records exit 0 with `14 passed`; `form-obj-1-planted.txt` records exit 1 with `1 failed, 13 passed`; `form-obj-1-restored.txt` records exit 0 with `14 passed`. The control files exist and contain the matching `Tests` summaries.

**form-obj-2**

- Law: “Delete one-line delegates, pass-through factories, rename-only helpers/getters, compatibility aliases, and wrappers around semantically identical platform or declared-dependency primitives.”
- Site now: `receiveAnswer` is absent. The test title is at `tests/src/core/parsers.test.ts:463`, and the direct promise read is at `:474`.

```462:475:tests/src/core/parsers.test.ts
describe('answer parking', () => {
	it('resolves answer with the submitted values snapshot', async () => {
		const form = new Form({
			fields: [
				{ control: 'text', name: 'name', rule: { required: true } },
			],
		})
		const parked = form.answer
```

- Diff: `@@ -15,11 +15,6 @@`, `@@ -465,7 +460,7 @@`, and `@@ -476,10 +471,9 @@`. The wrapper deletion, direct read, title, and removed suspension are present in `+`/`-` lines.
- Old-form sweep: Word-boundary pattern `\b(receiveAnswer|resumes a parked awaiter)\b` over the required paths found no hit. Case-insensitive inflection pattern `receiveAnswers?|receiveAnswered|receiveAnswering|resumes a parked awaiters?|resumed a parked awaiter|resuming a parked awaiter` found no hit.
- Report: “`receiveAnswer` deleted, call site reads `form.answer`, test title rewritten.” The tree matches this statement.
- Proof: `form-obj-2-srccore.txt` exists and records exit 0, `9` files, and `183` passed tests.

**form-subj-1**

- Law: “NEVER state a count.” “Delete a count you find. Do not correct it.”
- Site now: The primary guide site is `guides/form.md:53`; the changed source site is `src/core/types.ts:182`.

```52:55:guides/form.md
| `FormGroup`     | interface | A named section of a form — `name` / `label` / optional `help`. Grouping arranges a form and changes no answer.                           |
| `FormField`     | type      | Any field a schema can declare — the union discriminated on `control`.                                                                    |
| `FieldBase`     | interface | What every field carries whatever its control — `name` / `label` / `help` / `group` / `hidden` / `disabled` / `locked` / `rule` / `meta`. |
| `FieldControl`  | type      | The control a field presents — the discriminant that fixes the field's options and its value shape.                                       |
```

- Current changed regions include `README.md:3,8,60-63`; `guides/form.md:53,55,91-92,102-104,111,145,207-217,288,437,467,512-513,520,555,714-715,745,761,777-790,824-825,958,1003-1004,1029,1238,1285,1321,1391-1392,1542,1658,1679,1696`; and `src/core/types.ts:11-14,182-185`.
- Diff: The guide hunks are `@@ -50`, `-88`, `-99`, `-143`, `-160`, `-185`, `-286`, `-435`, `-464`, `-510`, `-551`, `-713`, `-743`, `-759`, `-775`, `-820`, `-954`, `-999`, `-1025`, `-1109`, `-1234`, `-1270`, `-1281`, `-1317`, `-1387`, `-1536`, `-1654`, `-1675`, and `-1692`; the README hunks are `@@ -1,13 +1,13 @@` and `@@ -57,11 +57,11 @@`; the source hunk is `src/core/types.ts @@ -8,10 +8,10 @@` and `@@ -179,7 +179,7 @@`.
- The operative text appears in the `+` lines except for the two corrected deviations recorded by the report: `src/core/types.ts:182` uses “`hidden`, `locked`, and `disabled`”, and `guides/form.md:761` uses “the schema door and the value door”.
- Old-form sweep: Composite case-insensitive pattern covering the removed count phrases (`twelve-member`, `nine methods`, `seven events`, `Three of the mappings`, `Four properties define`, `three visibility switches`, `one of nine`, `Three things stay unbounded`, `Four rules say`, `Seven events`, `exactly two things`, `two whole-schema ceilings`, `three bounds`, `one verb with three overloads`, `two read together`, and the other listed forms) over the required paths found no hit.
- A broader word-boundary sweep for `\b(twelve|nine|eight|seven|six|five|four|three|two|one)\b` still finds permitted values, arities, formats, test data, and the report’s recorded outside-scope findings, including `guides/form.md:971`, `:1695`, and `tests/setup.test.ts:104`.
- Report: “Counts deleted at every listed site, plus the refuter's added sites.” The changed content matches, but the report’s new-anchor pointers `guides/form.md:513` and `:959` are stale; the current lines are `:512` and `:958`.
- Proof reading: This is a documentation/naming row. The report records the count and anchor sweeps. The composite old-form sweep agrees; the broader sweep agrees with the report’s permitted and outside-scope findings.

**form-subj-2**

- Law: “`guides/README.md` is the map: maintain both a concept index and a directory index.” “A vendored dependency guide is a mirror.”
- Site now: `guides/README.md:20-35` contains one dependency-reference table covering `contract.md`, `emitter.md`, `guide.md`, `probe.md`, `scaffold.md`, and `test.md`.

```20:25:guides/README.md
## Dependency reference

Each row names a byte-identical mirror of the guide for a declared dependency, documenting **that
package's** surface rather than anything sourced here. Each is kept beside this guide set so a
reader can see the primitives this workspace is built from without leaving it.
```

- Diff: `@@ -19,17 +19,18 @@`. The complete introductory sentence and six-row table are present in `+` lines.
- Old-form sweep: Pattern `guide\.md|scaffold\.md` over the required paths finds only the expected table entries at `guides/README.md:28` and `:30`; pattern for the removed unlabeled mirror paragraphs finds no hit.
- Report: “`## Dependency reference` is one table over every mirror in `guides/`.” The tree and mirror inventory agree.
- Proof reading: The report does not record a named row-specific sweep. The independent mirror inventory and stale-paragraph sweep agree with the tree.

**form-subj-3**

- Law: “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.”
- Site now: The primary Surface site is `guides/form.md:92`; all listed Summary cells are noun phrases at `:165-178`, `:189-192`, and `:201-203`.

```90:92:guides/form.md
| `Form`          | class     | A form — a schema, the answers given against it, and the errors they carry. Implements `FormInterface` exactly. |
| `FormInterface` | interface | The form contract — the readonly state below plus the methods in `## Methods`.                                  |
| `createForm`    | function  | A form opened against a schema. The schema is copied, and the copy is what the form asks.                       |
```

- Diff: `@@ -88,8 +88,8 @@`, `@@ -160,24 +160,24 @@`, `@@ -185,37 +184,37 @@`, and `@@ -?` parser-table hunk `@@ -?` represented by the evidence diff’s `@@ -?` blocks at the Surface and parser sections. All listed replacement summaries are present in `+` lines.
- Old-form sweep: Case-sensitive and case-insensitive patterns for the removed imperative summaries (`Open a form against`, `Write one own enumerable entry`, `Resolve one rule's failure text`, `Build one frozen named-rule failure`, `Project a schema into JSON`, `Audit a structurally valid schema`, `Own one field value`, `Own a field's choices`, `Own one field`, `Own a whole schema`, `Parse unknown wire data`, `Parse one answer`, and `Parse a strict answer record`) found no hit.
- Report: “Each listed Surface Summary cell is a noun phrase; API and Kind cells untouched.” The tree matches the content claim.
- Proof reading: The report does not record a named old-summary sweep. The independent sweep agrees.

**form-subj-4**

- Law: “Document an options object as one `@param`; describe its short fields under `@remarks`.” “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.”
- Site now: `EvaluationOptions` is declared at `src/core/types.ts:424`; `FormOptions` at `:446`. Their comment blocks contain no interface-level `@param options` tag.

```405:410:src/core/types.ts
/**
 * Describes how to check a schema against a set of answers.
 *
 * @remarks
 * `messages` replaces the default message of a rule, keyed by {@link FieldRuleName}.
```

- Diff: `@@ -405,7 +405,6 @@` and `@@ -430,7 +429,6 @@`. Both exact tags are removed in `-` lines; no replacement tag was added to either interface.
- Old-form sweep: Pattern `@param options - The (evaluation's|form's) settings\.` over the required paths found no hit. The legitimate function tag remains at `src/core/factories.ts:8`.
- Report: “The `@param options` tag is gone from both interface blocks.” The tree matches.
- Proof reading: The report records the applied change but no explicit old-tag sweep. The independent sweep agrees.

**form-subj-5**

- Law: “Write the present tense for what exists. Do not write `currently`, `now`, `new`, `latest`, or `soon`.”
- Site now: The source replacements are at `src/core/types.ts:106,475,490`, `src/core/Form.ts:145,173`, and `src/core/helpers.ts:481`; guide replacements are at `guides/form.md:102,104,1696`.

```105:107:src/core/types.ts
 *
 * @param value - The value the field holds, or `undefined` when nobody has answered it.
 * @param values - Every answer the form holds, so a rule can read its siblings.
```

- Diff: `src/core/types.ts @@ -103,7 +103,7 @@`, `@@ -474,7 +474,7 @@`, `@@ -489,7 +489,7 @@`; `src/core/Form.ts @@ -142,7 +142,7 @@`, `@@ -170,7 +170,7 @@`; `src/core/helpers.ts @@ -474,7 +478,7 @@`; `guides/form.md @@ -99,17 +99,16 @@`, `@@ -510,16 +509,15 @@`, and `@@ -1692,7 +1693,7 @@`. The operative replacements are present.
- Old-form sweep: Pattern `currently|right now|held now|fields currently|answers now|holds now`, case-insensitive, over the required paths finds only the permitted contrast at `guides/form.md:1256`. A word-boundary `\b(now|currently)\b` sweep additionally finds `guides/form.md:1297` and local identifiers `src/core/helpers.ts:498,500`.
- Report: “The hedges are gone; the two permitted-sense sites are retained.” The content matches. The report’s guide pointers `:1257` and `:1298` are each one line after the current sites.
- Proof reading: The report records four remaining expected hits. The independent sweep agrees after correcting those two line pointers.

**form-subj-6**

- Law: “Write `must` for a requirement, `can` for an option or an ability, and `might` for a possibility.” “Never write `should`.”
- Site now: Contract 13 is at `guides/form.md:1657-1658`.

```1657:1658:guides/form.md
13. **`auditSchema` returns diagnostics, not a contract.** The list's emptiness is the promise. The
    wording of its strings is not: never parse them.
```

- Diff: `@@ -1654,7 +1655,7 @@`; the imperative replacement is present in `+` lines.
- Old-form sweep: Pattern `consumer should parse|shoulds|shouldn't`, case-insensitive, over the required paths found no hit. A broader `\bshould\b` sweep finds the permitted test-string literal `tests/src/core/helpers.test.ts:242`, `membership should not run`.
- Report: “Contract 13 states the obligation in the imperative.” The tree matches.
- Proof reading: The report records one broader hit and rules it as a test string. The independent sweep agrees.

**form-subj-7**

- Law: “Delete a barrel row whose class no consumer can construct, and delete its `@example` with it.” “Every public export has complete TSDoc.”
- Site now: `FormError` has an example at `src/core/errors.ts:4-16`.

```4:16:src/core/errors.ts
/**
 * Represents an error raised by the form domain.
 *
 * @example
 * ```ts
 * const error = new FormError('FIELD', 'The schema declares no field named "nickname"', {
 * 	field: 'nickname',
 * })
 *
 * error.code // 'FIELD'
 * error.context // { field: 'nickname' }
 * ```
 */
```

- Diff: `@@ -1,7 +1,19 @@`; the exact runnable construction and reads are present in `+` lines.
- Old-form sweep: No name, phrase, or path was removed or renamed. The old-form hit count is 0.
- Report: “`FormError` carries a runnable `@example`.” The tree matches.
- Proof reading: No removal sweep applies; the added example is visible in the source and `FormError` remains exported through `src/core/index.ts:3`.

**form-subj-8**

- Law: “State a prerequisite and the failure behavior wherever the symbol has either.”
- Site now: `evaluateField` carries the tag at `src/core/helpers.ts:228-229`; `evaluateForm` carries it at `:392-393`.

```226:230:src/core/helpers.ts
 * @param messages - Optional rule-specific message replacements.
 * @returns Every failure in rule order.
 * @throws Thrown when a {@link FieldValidator} supplied through {@link FieldRule.custom} throws:
 *   its own value escapes unchanged, because this helper adds no boundary around it.
 */
```

- Diff: `@@ -225,6 +225,8 @@` and `@@ -387,6 +389,8 @@`; the refuter’s amended `@throws` text is present verbatim in both `+` blocks.
- Old-form sweep: Pattern for the finder’s old `@throws A ... escapes` wording over the required paths found no hit. No name, phrase, or path was removed or renamed; stale old-form hits: 0.
- Report: “`evaluateField` and `evaluateForm` each carry the `@throws` tag.” The tree matches.
- Proof reading: The report records no explicit row-specific sweep. The independent old-tag sweep agrees.

**fleet-F1**

- Law: The row requires deletion only when `isBrowserVuePath` exists in a browser workspace.
- Site now: `isBrowserVuePath` is absent; `src` contains only `core`, `app` is absent, and no `tests/setupBrowser.ts` exists. The alternate export-free ruling does not apply because `tests/setup.ts` exports the fixture infrastructure used by the suites.
- Diff: No hunk applies. This is a `noop`.
- Old-form sweep: Case-insensitive word-boundary pattern `isBrowserVuePath` and inflection pattern `isBrowserVuePaths|isBrowserVuePathed|isBrowserVuePathing` over the required paths found no hit.
- Report: “The helper is absent and this workspace has no browser environment.” The tree evidence agrees.

**fleet-F2**

- Law: The row applies only to an implementation class with a public `readonly id: string` field.
- Site now: `Form` is at `src/core/Form.ts:55` and has only `#` fields; `FormError` is at `src/core/errors.ts:17` and has `code` and `context`, not `id`. No `readonly id: string` declaration exists.
- Diff: No hunk applies. This is a `noop`; the `JSON.stringify` pre-check is not applicable.
- Old-form sweep: Word-boundary pattern `readonly id: string` and case-insensitive inflection sweep over the required paths found no hit.
- Report: “Neither class declares a public `readonly id: string` field.” The tree evidence agrees.

### Scope

The status file lists these paths, all `owned` under the brief’s scope:

`README.md`, `guides/README.md`, `guides/form.md`, `src/core/Form.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/helpers.test.ts`, and `tests/src/core/parsers.test.ts`.

No `shared` or `off-limits` path appears. No diff hunk is outside a row’s repair scope.

The diff hunks outside the rows’ primary `Where` paths are:

- `README.md @@ -1,13 +1,13 @@`, `@@ -57,11 +57,11 @@`
- `guides/README.md @@ -19,17 +19,18 @@`
- `src/core/Form.ts @@ -142,7 +7,7 @@`, `@@ -170,7 +170,7 @@`
- `src/core/errors.ts @@ -1,7 +1,19 @@`
- `src/core/helpers.ts @@ -225,6 +225,8 @@`, `@@ -387,7 +389,8 @@`, `@@ -474,7 +478,7 @@`
- `src/core/types.ts @@ -8,10 +8,10 @@`, `@@ -103,7 +103,7 @@`, `@@ -179,7 +179,7 @@`, `@@ -405,7 +405,6 @@`, `@@ -430,7 +429,6 @@`, `@@ -474,7 +472,7 @@`, `@@ -489,7 +487,7 @@`
- `tests/setup.test.ts @@ -5,7 +5,9 @@`, `@@ -23,6 +25,8 @@`, `@@ -233,6 +237,32 @@`
- `tests/setup.ts @@ -1,5 +1,6 @@`, `@@ -246,6 +247,91 @@`
- `tests/src/core/helpers.test.ts @@ -1,6 +1,5 @@`, `@@ -43,7 +42,6 @@`, `@@ -52,6 +50,8 @@`, `@@ -60,87 +60,6 @@`
- `tests/src/core/parsers.test.ts @@ -15,11 +15,6 @@`, `@@ -465,7 +460,7 @@`, `@@ -476,10 +471,9 @@`

### Residue

- Diff `+`-line sweep for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` found no matches.
- Tree sweep over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, found no matches.
- Diff `+`-line hits for the requested writing residue include:
  - `guides/form.md` diff line 537 / current line 1679: “More temporal controls with more lexical patterns and no new idea.”
  - `src/core/errors.ts` diff line 586 / current line 9: `const error = new FormError(...)`
- The `new` hits are permitted construction or replacement-idea senses. The count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` found no diff `+`-line match.
- No `TODO`, `FIXME`, debug call, retry, timeout, or test-control residue entered the diff.

### Parity

`src/core/index.ts:1-9` star-exports `types`, `constants`, `errors`, `validators`, `helpers`, `cloners`, `parsers`, `factories`, and `Form`.

| Entity | Type signature members | Guide methods | Readonly data properties | Guide surface |
|---|---|---|---|---|
| `FormInterface` / `Form` | `field`, `fill`, `touch`, `invalidate`, `disable`, `enable`, `clear`, `submit`, `destroy` at `src/core/types.ts:518-612`; `Form` implements the same methods at `src/core/Form.ts:218-462` | `guides/form.md:1524-1532` lists the same members | `emitter`, `schema`, `values`, `baseline`, `errors`, `touched`, `disabled`, `status`, `valid`, `dirty`, `answer` at `src/core/types.ts:472-511` | `guides/form.md:90-99` identifies `FormInterface`; `:101-105` names the readonly properties |

The diff changes only documentation for `FieldControl`, `FieldValidator`, `FieldError`, `EvaluationOptions`, `FormOptions`, `FormInterface`, and `Form`; no call signature or readonly property changed.

Backticked API identifiers added or changed in guide prose resolve through the barrel where they are package exports: `FormField`, `FieldControl`, `FormInterface`, `createForm`, `RULE_MESSAGES`, `defineEntry`, `freezeEntry`, `matchesField`, `matchesAnswer`, `appliesRule`, `evaluateField`, `evaluateForm`, `computeDefaults`, `matchesValue`, `extractChanges`, `matchesValues`, `formatMessage`, `createFieldError`, `serializeForm`, `extractGroups`, `auditSchema`, `cloneValue`, `cloneChoices`, `cloneFormField`, `cloneFormSchema`, `parseForm`, `parseValue`, `parseValues`, `PATTERN_LIMIT`, `TEXT_LIMIT`, `NODE_LIMIT`, `FormStatus`, and `FormError`. The other backticked terms are field/rule literals or syntax tokens, including `control`, `minimum`, `maximum`, `step`, `custom`, `meta`, `__proto__`, and `{limit}`, or external mirror names under `guides/README.md`; they are not standalone exports from `@orkestrel/form`.

### Gates

The report’s § Gates records these readings:

| Command | Exit | Report reading |
|---|---:|---|
| `npm run format:check` | 0 | “All matched files use the correct format.” |
| `npm run lint:check` | 0 | “no diagnostic” |
| `npm run check` | 0 | “root `tsc --noEmit` then `check:src:core`, both silent” |
| `npm run build` | 0 | “`dist/src/core` emitted, declarations copied to `index.d.cts`” |
| `npm test` | 0 | `src:core` 183, `policy` 111, `config` 46, `setup` 14, `guides` 48, all passed |

The corresponding capture files exist under `/home/user/work/evidence/form-proofs/`. The build capture also records the API Extractor TypeScript-version warning while exiting 0.

### Breaking

The report states: “None. No row renames or removes a published symbol.” The tree confirms that the barrel, Surface API column, and Methods table remain unchanged. No fleet-wide old-symbol sweep applies.

## Distillate

- `form-obj-1`: site now `tests/setup.ts:250-330`, `tests/setup.test.ts:241-262` | diff present yes | old form hits 14 expected moved references | report matches yes
- `form-obj-2`: site now `tests/src/core/parsers.test.ts:463,474` | diff present yes | old form hits 0 | report matches yes
- `form-subj-1`: site now `README.md:3,8,60-63`, `guides/form.md:53-1696`, `src/core/types.ts:11-185` | diff present yes | old form hits 0 composite stale phrases | report matches yes for content; cited anchor lines are stale
- `form-subj-2`: site now `guides/README.md:20-35` | diff present yes | old form hits 0 | report matches yes
- `form-subj-3`: site now `guides/form.md:92,165-178,189-192,201-203` | diff present yes | old form hits 0 | report matches yes
- `form-subj-4`: site now `src/core/types.ts:424,446` | diff present yes | old form hits 0 | report matches yes
- `form-subj-5`: site now `src/core/types.ts:106,475,490`, `src/core/Form.ts:145,173`, `src/core/helpers.ts:481`, `guides/form.md:102,104,1696` | diff present yes | old form hits 1 permitted `holds now` site | report matches yes for content; two guide pointers are stale
- `form-subj-6`: site now `guides/form.md:1657-1658` | diff present yes | old form hits 0 stale contract phrases | report matches yes
- `form-subj-7`: site now `src/core/errors.ts:4-16` | diff present yes | old form hits 0 | report matches yes
- `form-subj-8`: site now `src/core/helpers.ts:228-229,392-393` | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: helper absent; no browser environment | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: no class has public `readonly id: string` | diff present no | old form hits 0 | report matches yes

Scope tags: all status paths are `owned`; no `shared` or `off-limits` status path appears.

Residue: no forbidden diff or in-scope tree hits; diff writing hits are `new` at `guides/form.md:1679` and `src/core/errors.ts:9`; count-pattern hits: none.

Writing sweep: pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|please|sanity|dummy|ensure|guarantee)\b`, case-insensitive, over added prose/doc-comment/test-comment lines found the two permitted `new` hits above. The growable-count pattern found no hit.

Parity: `FormInterface` call signatures and readonly properties match the guide; all package API identifiers in changed guide prose remain reachable through `src/core/index.ts:1-9`.

## Unknowns

No named tree file or row was unreadable. No additional unknown remains in the supplied evidence. The report does not record explicit row-specific sweeps for `form-subj-2`, `form-subj-3`, `form-subj-4`, `form-subj-7`, or `form-subj-8`; those sweeps were independently performed above.

## Journal

Journal —

## Deviation

- No file was created, edited, or deleted.
- No command was run during this read-only pass.
- The supplied status shows only the 11 expected owned files.
- The report’s current-line references for the renamed guide anchor and two retained `now` sites are stale: `guides/form.md:513` → `:512`, `:959` → `:958`, `:1257` → `:1256`, and `:1298` → `:1297`.
- No sweep or file read was blocked.