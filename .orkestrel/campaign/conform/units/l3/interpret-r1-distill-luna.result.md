## Question

For every row of `unit conform-interpret`, the current tree, diff, sweeps, report readings, and proofs were compared.

## Evidence

- **interpret-obj-1 — applied.** `tests/guides.test.ts:238-730` contains flagship fence tests; `guides/interpret.md:51-57,339`; `src/core/helpers.ts:150-159` all carry `85%.`. Diff hunks `conform-interpret.diff:600-1173,212-220,232-239` add the transcriptions and correct the value. The old `85%` transcription has no hit across `src`, `tests`, both guides, and `README.md`. The report says “Flagship fence transcriptions…” (`conform-interpret-report.md:10`), matching the tree. Proofs: `interpret-obj-1-red.txt` records `2 failed | 93 passed (95)`; `interpret-obj-1-green.txt` records `95 passed (95)`.

- **interpret-obj-2 — applied.** `tests/setup.ts:148-159` defines `createCorpusExtractor`; `tests/setup.test.ts:210-217`, `tests/src/core/Interpret.test.ts:85-110`, `tests/src/core/integration.test.ts:22-60`, and `tests/src/core/validators.test.ts:568-574` use it. Diff hunks `conform-interpret.diff:1296-1313,1348-1373,1717-1779,2117-2200` contain the repair. The old `corpusExtractor` and duplicate `new Extractor({ actions: INTERPRET_ACTIONS, domains: INTERPRET_DOMAINS })` forms have no hit in the package. The report says “every duplicate assembly routed through it” (`conform-interpret-report.md:11`), matching the tree. Proofs: `interpret-obj-2-red.txt` records `1 failed | 30 passed (31)`; `interpret-obj-2-green.txt` records `31 passed (31)`.

- **interpret-obj-3 — applied.** The fixture declarations are annotated with `Entity` in `tests/src/core/stages/Generator.test.ts:11,31,41,55,73,88,103,125,143,172,186,202,215` and `Formatter.test.ts:32,43,66,93,108`; `Narrator.test.ts:270-279` annotates `LogicalResult`. Diff hunks `conform-interpret.diff:1854-2102` remove the test assertions. The `as const` sweep over `tests` returns no hits. The report says “`as const` deleted at every test site” (`conform-interpret-report.md:11`), matching the tree. Proofs: `interpret-obj-3-check.txt` exits `0`; `interpret-obj-3-src.txt` records `284 passed (284)`.

- **interpret-obj-4 — applied.** `tests/setup.ts:1-30` has no Vitest import or restore hook. Diff hunk `conform-interpret.diff:1232-1285` removes them. `restoreAllMocks` and `isBrowserVuePath` have no hit in `tests`; the remaining `vi.` hits are excluded vendored strings in `tests/config.test.ts`. The report says the hook was deleted (`conform-interpret-report.md:11`), matching the tree. Proofs: `interpret-obj-4-src.txt` records `284 passed (284)`; `interpret-obj-4-setup.txt` records `31 passed (31)`.

- **interpret-obj-5 — applied.** `src/core/helpers.ts:280-287` uses `tokenPattern`, `matchAll`, and the rightmost position; regression cases are at `tests/src/core/helpers.test.ts:206-224`. Diff hunks `conform-interpret.diff:372-382,1645-1679` contain the implementation and tests. The old `lowerText.indexOf(token)` form has no hit. The report says `assignEntities` now uses a whole-word rightmost anchor (`conform-interpret-report.md:11`), matching the tree. Proofs: `interpret-obj-5-red.txt` records `2 failed | 281 passed (283)`; `interpret-obj-5-green.txt` records `283 passed (283)`.

- **interpret-obj-6 — applied.** `README.md:3,22-26` states the dependency, Node, and module-format facts; `src/core/types.ts:4-5` no longer says zero-dependency. Diff hunks `conform-interpret.diff:5-28,502-510` contain the corrections. The old `zero-dependency`, `ESM-only`, and `Node.js >= 22` claims have no hit in the package; `@orkestrel/template` appears at `README.md:26`. The report says the README and module claims were corrected (`conform-interpret-report.md:11`), matching the tree. This is a documentation sweep row; no behavioral proof is required.

- **interpret-obj-7 — applied.** `src/core/stages/Normalizer.ts:59-70` returns `NormalizeResult`. Diff hunk `conform-interpret.diff:484-497` replaces the inline structural type. The old inline return annotation has no hit. The report says `Normalizer#applyStage` returns the declared type (`conform-interpret-report.md:11`), matching the tree.

- **interpret-subj-3 — applied, breaking.** `ExtractResult` and `ClarifyResult` at `src/core/types.ts:245-254` and `Interpretation` at `:285-298` have no `complete` member. Construction sites are `src/core/Interpret.ts:300-316,478-491`, `src/core/stages/Extractor.ts:37-40`, and `src/core/stages/Clarifier.ts:98-101`; `isInterpretation` at `src/core/validators.ts:370-380` no longer checks it. Guide shapes are at `guides/interpret.md:51-70,90-96,559-635,932-938`. Diff hunks `conform-interpret.diff:520-575,276-296,408-468,1174-1231,1344-1564,1715-2200` carry the repair. The member-form sweep for `complete:` and `.complete` returns no hits in the package. Legitimate prose and absence assertions remain at `guides/interpret.md:69,96`, `tests/src/core/Interpret.test.ts:99-100`, and related test titles. The report marks the row applied and breaking (`conform-interpret-report.md:12,161-170`), matching the tree. Proofs: `interpret-subj-3-red.txt` records `1 failed | 283 passed (284)`; `interpret-subj-3-green.txt` records `284 passed (284)`; `interpret-subj-3-check.txt` exits `0`; `interpret-subj-3-setup-green.txt` records `30 passed (30)`.

- **interpret-subj-4 — applied, breaking.** `src/core/helpers.ts:808-818` exports `renderSubject`; `guides/interpret.md:323,375,400`; `tests/src/core/helpers.test.ts:618-630`; and `src/core/index.ts:5` expose the replacement. Diff hunks `conform-interpret.diff:322-408,1617-1715` rename it in place. The word-boundary and inflection sweep for `describeSubject` returns no hits across `src`, `tests`, both guides, and `README.md`. The report says the published export was renamed without a shim (`conform-interpret-report.md:174-182`), matching the tree. Proof: `interpret-subj-4-guides.txt` records `73 passed (73)`.

- **interpret-subj-5 — applied.** `guides/README.md:3,55`, `tests/setup.ts:5-14,37-41,100-106,275-280,321-326`, `tests/src/core/Narrator.test.ts:20-25`, `tests/src/core/stages/Normalizer.test.ts:4-7`, and `tests/src/core/validators.test.ts:25-31` use rule-file or `AGENTS.md` references. Diff hunks `conform-interpret.diff:29-47,1232-1285,1574-1584,2105-2117,2117-2145` contain the replacements. The `AGENTS §` sweep returns no hits. Remaining `design §` references are at `tests/src/core/Interpret.test.ts:30`, `integration.test.ts:19`, `Clarifier.test.ts:12`, `Extractor.test.ts:5`, and manager tests; they are outside this row’s named form. The report says every numbered `AGENTS §N` citation was replaced (`conform-interpret-report.md:12`), matching the tree.

- **interpret-subj-6 — applied.** `guides/interpret.md:216` reads “is rejected loudly”. Diff hunk `conform-interpret.diff:194-203` contains the change. The `should` sweep over the package returns no hits. The report says the prose now reads `is rejected loudly` (`conform-interpret-report.md:12`), matching the tree.

- **interpret-subj-7 — applied.** The changed source prose is at `src/core/types.ts:25,425-430,802`, `src/core/helpers.ts:90,207,216,791`, `src/core/stages/Clarifier.ts:35,194`, `src/core/stages/Generator.ts:16`, and `src/core/InterpretContext.ts:23`. Diff hunks `conform-interpret.diff:502-575,296-309,324-408,408-448,469-482` contain the substitutions. The banned source-form sweep has no `via`, `e.g.`, or `simply` hits; only frequency-sense `once` remains at `src/core/types.ts:347,351`. The report says the source substitutions were cleared while frequency `once` remained (`conform-interpret-report.md:12`), matching the tree.

- **interpret-subj-11 — noop.** `src/core/types.ts:640-658` retains `readonly narrator?: NarratorOptions`, and its rationale is at `:640-644`; no implementation or diff hunk changes it. The report records the operative repair as `None` (`conform-interpret-report.md:12,28-33`). The noop evidence matches the tree.

- **fleet-F1 — noop.** `isBrowserVuePath` has no hit. `src/browser/**`, `app/browser/**`, and `tests/setupBrowser.ts` do not exist. `tests/setup.ts:1-30` retains the setup header and `tests/setup.test.ts:210-217` contains the corpus-helper case, not a browser helper. The report’s noop evidence (`conform-interpret-report.md:34-38`) matches the tree.

- **fleet-F2 — noop.** Implementation classes begin at `src/core/Interpret.ts:95`, `InterpretContext.ts:41`, `Narrator.ts:36`, `stages/{Normalizer,Extractor,Clarifier,Generator}.ts:28-71`, the manager files, and `errors.ts:18`; none declares a public `readonly id: string` before private fields. `JSON.stringify` occurs only in helper canonicalization and unrelated parser/distribution tests; no test or `guides/interpret.md` fence serializes a candidate class instance. The report’s noop evidence (`conform-interpret-report.md:38-41`) matches the tree.

### Across the unit

**Scope.** Every path in `conform-interpret.status` is owned:

- `README.md`; `guides/README.md`; `guides/interpret.md`
- `src/core/Interpret.ts`; `src/core/InterpretContext.ts`; `src/core/constants.ts`; `src/core/helpers.ts`; `src/core/stages/Clarifier.ts`; `src/core/stages/Extractor.ts`; `src/core/stages/Generator.ts`; `src/core/stages/Normalizer.ts`; `src/core/types.ts`; `src/core/validators.ts`
- `tests/guides.test.ts`; `tests/setup.test.ts`; `tests/setup.ts`; `tests/src/core/Interpret.test.ts`; `tests/src/core/Narrator.test.ts`; `tests/src/core/factories.test.ts`; `tests/src/core/helpers.test.ts`; `tests/src/core/integration.test.ts`; `tests/src/core/stages/Clarifier.test.ts`; `tests/src/core/stages/Extractor.test.ts`; `tests/src/core/stages/Formatter.test.ts`; `tests/src/core/stages/Generator.test.ts`; `tests/src/core/stages/Normalizer.test.ts`; `tests/src/core/validators.test.ts`

No shared or off-limits path is listed. Every diff hunk belongs to a row’s `Where` path; there is no unscoped `file @@ hunk`.

**Residue.** The diff `+`-line sweep for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` returns no hits. The same sweep over `src` and non-vendored `tests` returns no hits. The excluded vendored files contain their own fixtures and are outside the residue population.

**Parity.**

| Entity | Interface members in `src/core/types.ts` | Guide method rows |
|---|---|---|
| `NormalizerInterface` | `normalize` (`:664-665`) | `normalize` (`guides/interpret.md:535,539`) |
| `ExtractorInterface` | `extract` (`:669-670`) | `extract` (`:548,552`) |
| `ClarifierInterface` | `clarify` (`:678-686`) | `clarify` (`:565,569`) |
| `GeneratorInterface` | `generate` (`:707-708`) | `generate` (`:673,677`) |
| `InterpretContextInterface` | `previous`, `entities`, `add`, `clear`, `destroy` (`:802-811`) | matching rows (`:904,913-917`) |
| `InterpretInterface` | `interpret`, `add`, `remove` overloads, `template`, `templates`, `describe`, `narrate`, `destroy` (`:835-846`) | matching rows (`:942,957-964`) |

Readonly data properties remain documented in the guide’s Surface and Entities sections: result fields at `src/core/types.ts:232-298` correspond to `guides/interpret.md:90-96`; `InterpretContext` properties at `:803-806` correspond to `guides/interpret.md:529-530,904-917`; `Interpret.emitter` at `:836` is named at `guides/interpret.md:60,529`.

The API identifiers added in the guide’s Types table—`ProvenanceCategory`, `InterpretStage`, `InterpretErrorCode`, `EntityMapping`, `FieldDefault`, `ComputedField`, `Template`, `Provenance`, `Intent`, `Entity`, `Ambiguity`, `FieldMapping`, `TextChange`, `StageRecord`, `StageFailure`, `NormalizeResult`, `ExtractResult`, `ClarifyResult`, `FormatResult`, `GenerateResult`, `Interpretation`, `TemplateRecord`, `SubjectRecord`, `DefinitionRecord`, `InterpretEventMap`, `RecordEventMap`, `TemplateManagerEventMap`, `SubjectManagerEventMap`, `DefinitionManagerEventMap`, `InterpretContextEventMap`, `NarratorFormatter`, `Lexicon`, `NarratorOptions`, `NormalizerOptions`, `ExtractorOptions`, `ClarifierOptions`, `FormatterOptions`, `TemplateManagerOptions`, `SubjectManagerOptions`, `DefinitionManagerOptions`, `RecordStamp`, `RecordFunction`, `RecordManagerOptions`, `RecordManagerInterface`, `RecordOptions`, `InterpretContextOptions`, `InterpretOptions`, `NormalizerInterface`, `ExtractorInterface`, `ClarifierInterface`, `FormatterInterface`, `GeneratorInterface`, `NarratorInterface`, `TemplateManagerInterface`, `SubjectManagerInterface`, `DefinitionManagerInterface`, `InterpretContextInterface`, and `InterpretInterface`—are exported through `src/core/index.ts:1-19`. `renderSubject` is exported through the same barrel at `:5`. `AGENTS.md` and `@orkestrel/template` are documentation links or dependency names, not local barrel symbols.

**Gates.** The report records:

| Gate | Command | Exit |
|---|---|---|
| format:check | `npm --prefix /home/user/fleet/interpret run format:check` | `0` |
| lint:check | `npm --prefix /home/user/fleet/interpret run lint:check` | `0` |
| check | `npm --prefix /home/user/fleet/interpret run check` | `0` |
| build | `npm --prefix /home/user/fleet/interpret run build` | `0` |
| test | `npm --prefix /home/user/fleet/interpret test` | `0` |

These are quoted from `conform-interpret-report.md:130-145`. The report also records `npx scaffold audit --offline` exit `0` at `:145-146`.

**Breaking.** The report identifies `interpret-subj-3` and `interpret-subj-4` as published-surface changes (`conform-interpret-report.md:161-182`).

- `@orkestrel/brief` must remove `'complete'` from `brief/src/core/constants.ts:70`, remove `complete` from extract fixtures at `brief/tests/setup.ts:93,170`, remove getters at `brief/tests/setup.ts:242,313,380`, replace reads at `brief/tests/setup.test.ts:109,144`, and refresh `brief/guides/interpret.md` from the released guide (`conform-interpret-report.md:190-250`).
- The symbol-consumer sweep for `describeSubject` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `interpret` and guide mirrors, returns no hits.
- The contract-shaped `complete` hits outside `interpret` are the named `brief` consumer sites above. Other hits belong to unrelated APIs, including `browser/src/core/types.ts:841`, `sea/src/server/types.ts:417`, workflow task APIs, and scaffold catalog result types.

**Writing sweep.** The diff `+`-line sweep over prose files for `should`, `simply`, `easy`, `easier`, `just`, `currently`, `now`, `new`, `latest`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `please`, `sanity`, `dummy`, `ensure`, and `guarantee`, plus growable-set count phrases, returns no prose hits. Code-only matches such as `new RegExp` and the test input `calculate please` are not prose lines.

## Distillate

- `interpret-obj-1: tests/guides.test.ts:238-730 | diff present yes | old form hits 0 | report matches yes`
- `interpret-obj-2: tests/setup.ts:148-159 and consumers at tests/setup.test.ts:210-217 | diff present yes | old form hits 0 | report matches yes`
- `interpret-obj-3: typed Entity/LogicalResult fixtures in Generator, Formatter, Narrator tests | diff present yes | old form hits 0 | report matches yes`
- `interpret-obj-4: tests/setup.ts:1-30 has no spy hook | diff present yes | old form hits 0 | report matches yes`
- `interpret-obj-5: src/core/helpers.ts:280-287 uses rightmost whole-word scan | diff present yes | old form hits 0 | report matches yes`
- `interpret-obj-6: README.md:3,22-26 and src/core/types.ts:4-5 carry corrected claims | diff present yes | old form hits 0 | report matches yes`
- `interpret-obj-7: Normalizer.ts:59 returns NormalizeResult | diff present yes | old form hits 0 | report matches yes`
- `interpret-subj-3: result records and constructors omit the stored complete member | diff present yes | old member-form hits 0 | report matches yes`
- `interpret-subj-4: helpers.ts:808 exports renderSubject | diff present yes | old form hits 0 | report matches yes`
- `interpret-subj-5: numbered AGENTS citations replaced by rule references | diff present yes | old form hits 0 | report matches yes`
- `interpret-subj-6: guides/interpret.md:216 says is rejected loudly | diff present yes | old form hits 0 | report matches yes`
- `interpret-subj-7: changed source prose uses through/for example/after | diff present yes | banned-form hits 0 | report matches yes`
- `interpret-subj-11: narrator option group retained at types.ts:656 | diff present no | old form hits 0 | report matches yes`
- `fleet-F1: isBrowserVuePath absent and no browser axis exists | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: no implementation class has the named public id-field shape | diff present no | old form hits 0 | report matches yes`

Scope tags: every status path is `owned`; shared paths and off-limits paths have no diff hunks.

Residue: no added or tree residue hits for the prohibited pattern over the stated populations.

Writing hits: none in added prose lines.

Parity: interface methods and guide method tables match for `NormalizerInterface`, `ExtractorInterface`, `ClarifierInterface`, `GeneratorInterface`, `InterpretContextInterface`, and `InterpretInterface`; changed result shapes omit `complete` in both source and guide.

## Unknowns

None in the package row evidence. The unrelated word-boundary occurrences of `complete` in other packages were classified as unrelated APIs rather than `@orkestrel/interpret` consumers.

## Journal

Leave this line for the driver.

## Deviation

No tree change was observed during the read-only review. No package file was inaccessible, and no required package sweep was unavailable.