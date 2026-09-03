# Unit conform-interpret — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green on the final tree, the
offline audit reports no drift, and `git status --short` lists only files under Owned.

## Row dispositions

| Row               | Disposition | What landed                                                                                                          |
| ----------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| interpret-obj-1   | applied     | Flagship fence transcriptions in `tests/guides.test.ts`; the false `tokenize` claim corrected in guide and TSDoc     |
| interpret-obj-2   | applied     | `createCorpusExtractor` exported from `tests/setup.ts`; every duplicate assembly routed through it                    |
| interpret-obj-3   | applied     | `as const` deleted at every test site, each fixture annotated at its declaration                                     |
| interpret-obj-4   | applied     | The `afterEach(() => vi.restoreAllMocks())` hook and its `vitest` import deleted from `tests/setup.ts`               |
| interpret-obj-5   | applied     | `assignEntities` anchors a keyword on a whole-word rightmost occurrence                                              |
| interpret-obj-6   | applied     | README dependency, engine, and module-format claims corrected; `zero-dependency` dropped from `types.ts`             |
| interpret-obj-7   | applied     | `Normalizer#applyStage` returns the declared `NormalizeResult`                                                       |
| interpret-subj-3  | applied     | `complete` removed from `ExtractResult`, `ClarifyResult`, and `Interpretation` — BREAKING                            |
| interpret-subj-4  | applied     | `describeSubject` renamed to `renderSubject` in place — BREAKING                                                     |
| interpret-subj-5  | applied     | Every numbered `AGENTS §N` citation replaced with the rule file and heading it names                                 |
| interpret-subj-6  | applied     | `guides/interpret.md` Validators prose reads `is rejected loudly`                                                    |
| interpret-subj-7  | applied     | `e.g.`, `via`, `simply`, and temporal `once` cleared from `src`; the frequency-sense `once` kept                     |
| interpret-subj-11 | noop        | The row's operative repair is `None`; the `narrator` option group is the deliberate shape `types.ts:642-644` states  |
| fleet-F1          | noop        | `isBrowserVuePath` is absent from this workspace                                                                     |
| fleet-F2          | noop        | No implementation class declares a public `readonly id: string` data field                                           |

### noop evidence

- **interpret-subj-11.** The refuter's operative repair is `None`, and the finder's alternative is a
  breaking option-type change no rule requires. `src/core/types.ts` keeps
  `readonly narrator?: NarratorOptions` with the `@remarks` that state why the key groups wording
  settings rather than taking a `NarratorInterface`. Nothing edited.
- **fleet-F1.** `grep -rnE "isBrowserVuePath" tests --include=*.ts` over
  `/home/user/fleet/interpret` returns nothing. `tests/setup.ts` never declared the helper, and this
  workspace carries no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`. The `setup`
  project, the `test:setup` script, and its step in the `test` chain are untouched, and
  `tests/setup.test.ts` still proves every `tests/setup.ts` export.
- **fleet-F2.** `grep -rnE "^\treadonly [a-z]|^export class" src --include=*.ts` reads every
  implementation class — `Formatter`, `Extractor`, `Normalizer`, `Generator`, `Clarifier`,
  `RecordManager`, `SubjectManager`, `DefinitionManager`, `TemplateManager`, `InterpretContext`,
  `Narrator`, `Interpret`, and the errors-file `InterpretError`. The only public data field in the
  whole of `src` is `InterpretError.code`, which is not the `id` shape the row names. Nothing edited.

## Files touched

| File                                            | Change                                                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `src/core/types.ts`                             | Dropped `complete` from the three result records, stated the derivation in the `Interpretation` `@remarks`, dropped `zero-dependency`, applied the substitutions |
| `src/core/helpers.ts`                           | Whole-word rightmost keyword anchor in `assignEntities`; renamed `describeSubject` to `renderSubject`; corrected the `tokenize` and `assignEntities` examples; applied the substitutions |
| `src/core/constants.ts`                         | `DEFAULT_LEXICON` `@remarks` names `renderSubject`                                                        |
| `src/core/validators.ts`                        | Dropped `complete: isBoolean` from `isInterpretation`                                                     |
| `src/core/Interpret.ts`                         | Dropped the `complete` key from both result assemblies                                                    |
| `src/core/InterpretContext.ts`                  | Temporal `once` became `after`                                                                            |
| `src/core/stages/Extractor.ts`                  | `extract` returns `{ intent, numbers }`; `@example` follows                                               |
| `src/core/stages/Clarifier.ts`                  | `clarify` returns `{ entities, ambiguities }`; `@example` follows; applied the substitutions              |
| `src/core/stages/Normalizer.ts`                 | `#applyStage` returns the declared `NormalizeResult`                                                      |
| `src/core/stages/Generator.ts`                  | `via` became `through`                                                                                    |
| `guides/interpret.md`                           | Surface, Types, Constants, Helpers, Validators, and Methods rows and fences follow every landed row        |
| `guides/README.md`                              | Dropped both numbered `AGENTS §N` citations                                                               |
| `README.md`                                     | Dropped `zero-dependency`, named `@orkestrel/template`, corrected the engine floor and the module formats |
| `tests/guides.test.ts`                          | Added the flagship fence transcription section                                                            |
| `tests/setup.ts`                                | Added `createCorpusExtractor`; deleted the spy hook; dropped `complete`; replaced the numbered citations   |
| `tests/setup.test.ts`                           | Added the `createCorpusExtractor` case; recast the `complete` assertions                                   |
| `tests/src/core/helpers.test.ts`                | Added the whole-word, rightmost, and anchor-order pins; renamed to `renderSubject`; replaced the citation  |
| `tests/src/core/Interpret.test.ts`              | Added the no-stored-flag case; recast every `complete` assertion; routed to `createCorpusExtractor`         |
| `tests/src/core/integration.test.ts`            | Recast the `complete` assertions; routed both assemblies to `createCorpusExtractor`                        |
| `tests/src/core/validators.test.ts`             | Dropped the `complete` fixtures and probe; routed to `createCorpusExtractor`; replaced the citation         |
| `tests/src/core/factories.test.ts`              | Recast the `complete` assertions                                                                          |
| `tests/src/core/stages/Extractor.test.ts`       | Recast the completeness case onto `numbers` and `intent.confidence`                                        |
| `tests/src/core/stages/Clarifier.test.ts`       | Recast the `complete` assertions onto `ambiguities` and the absent flag                                    |
| `tests/src/core/stages/Generator.test.ts`       | Annotated every fixture as `Entity`; deleted every `as const`                                             |
| `tests/src/core/stages/Formatter.test.ts`       | Annotated every fixture as `Entity`; deleted every `as const`                                             |
| `tests/src/core/stages/Normalizer.test.ts`      | Replaced the numbered citation                                                                            |
| `tests/src/core/Narrator.test.ts`               | Annotated the result as `LogicalResult`; deleted the `as const`; replaced the numbered citation            |

Diffstat: 27 files changed, 2203 diff lines recorded in
`/home/user/work/evidence/conform-interpret.diff`.

## Failing-first controls

Every runner output is captured under `/home/user/work/evidence/interpret-proofs/`.

| Row              | Command                       | Red                              | Green                | Files                                                     |
| ---------------- | ----------------------------- | -------------------------------- | -------------------- | --------------------------------------------------------- |
| baseline         | `npm run test:src`            | —                                | 281 passed (281)     | `baseline-test-src.txt`                                   |
| interpret-obj-5  | `npm run test:src`            | 2 failed \| 281 passed (283)     | 283 passed (283)     | `interpret-obj-5-red.txt`, `interpret-obj-5-green.txt`     |
| interpret-subj-3 | `npm run test:src`            | 1 failed \| 283 passed (284)     | 284 passed (284)     | `interpret-subj-3-red.txt`, `interpret-subj-3-green.txt`   |
| interpret-obj-2  | `npm run test:setup`          | 1 failed \| 30 passed (31)       | 31 passed (31)       | `interpret-obj-2-red.txt`, `interpret-obj-2-green.txt`     |
| interpret-obj-1  | `npm run test:guides`         | 2 failed \| 93 passed (95)       | 95 passed (95)       | `interpret-obj-1-red.txt`, `interpret-obj-1-green.txt`     |

Failing-first test names, in the order they first read red:

- `assignEntities > anchors a keyword on a whole word, never on the same letters inside a longer word`
- `assignEntities > anchors a repeated keyword on its rightmost occurrence, as the contract states`
- `Interpret > pipeline > stores no completeness flag, so a reader derives it from ambiguities and failures`
- `createCorpusExtractor > returns a real Extractor, distinct per call, so one suite cannot reach another`
- `flagship fences > Helpers: the text leaves return the strings the fence prints`
- `flagship fences > Helpers: the extraction and matching leaves return the fence values`

Rows whose proof is a gate rather than a red test, with the reading that closes them:

- **interpret-obj-3.** `npm run check` exit 0 (`interpret-obj-3-check.txt`) and `npm run test:src`
  284 passed (284) (`interpret-obj-3-src.txt`). Deleting an `as const` that the declaration's
  annotation replaces must change no value, and the suite reads the same count as before it.
- **interpret-obj-4.** `npm run test:src` 284 passed (284) (`interpret-obj-4-src.txt`) and
  `npm run test:setup` 31 passed (31) (`interpret-obj-4-setup.txt`) — the counts the same runs
  reported with the hook present, which is what makes the hook dead.
- **interpret-subj-3** also read `npm run check` exit 0 (`interpret-subj-3-check.txt`) and
  `npm run test:setup` 30 passed (30) (`interpret-subj-3-setup-green.txt`) at the point the contract
  moved.
- **interpret-subj-4.** `npm run test:guides` 73 passed (73) (`interpret-subj-4-guides.txt`) — the
  parity suite resolves `renderSubject` from the barrel, from the guide row, and from the fence
  import list.

## Sweeps

Every pattern ran under `/home/user/fleet/interpret` over the population named beside it.

| Pattern                                                    | Population                                                    | Result                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `grep -rnw "describeSubject"`                              | `src`, `guides/interpret.md`, `guides/README.md`, `README.md`, `tests` | empty                                                              |
| `grep -rniE "describeSubject(s\|ed\|ing)?"`                | the same population                                            | empty                                                                        |
| `grep -rnE "AGENTS[[:space:]]*§\|§[0-9]"`                  | the same population                                            | no `AGENTS §` hit; the remaining `§` hits are `design §N` references         |
| `grep -rniE "\bshould\b\|\bsimply\b\|\bvia\b\|e\.g\.\|i\.e\."` | the same population                                        | no hit in `src`, `guides/interpret.md`, `guides/README.md`, or `README.md`   |
| `grep -rniE "\bshould\b\|\bsimply\b\|\bvia\b\|e\.g\.\|i\.e\.\|\bonce\b"` | `src`                                            | only `types.ts:347` and `:351`, the frequency-sense `once` the row permits   |
| `grep -rniE "zero-dependency\|ESM-only\|no CommonJS build\|Node\.js >= 22$"` | `src`, `tests`, `README.md`, `guides/interpret.md`, `guides/README.md` | one hit, `tests/distribution.test.ts:60`, the unrelated declaration-extension comment "an ESM-only one `.d.mts`" describing the `require` condition's file naming, not the removed package-format claim; every obj-6 form is gone |
| `grep -rniE "\bcomplete(s\|d\|ing)?\b"`                     | `src`, `tests`, `README.md`, `guides/interpret.md`, `guides/README.md` | no member access and no literal key; `types.ts:277` and `guides/interpret.md:69` derive the flag from `ambiguities` and `failures`; `Interpret.test.ts:99-100`, `Clarifier.test.ts:28`, and `Extractor.test.ts:43` assert the flag absent; the remaining hits (`Generator.ts:13`, `InterpretContext.ts:19`, `types.ts:347,355,396,799`, `Interpret.ts:456`, `setup.ts:276`, `validators.test.ts:560,563`, `Interpret.test.ts:69`, `integration.test.ts:55`, `setupPolicy.ts:105,228,231,311,314,1201,1208,1380`, `setup.test.ts:290`, `guides/interpret.md:96,677,915,957`) are the English adjective or an inflection of it; `guides/README.md` carries no hit |
| `grep -rn "as const"`                                      | `src`, `tests`                                                 | empty                                                                        |
| `grep -rnE "\bvi\.\|isBrowserVuePath"`                     | `tests`                                                        | only the vendored `tests/config.test.ts` string fixtures                     |
| `grep -rnE "^\treadonly [a-z]\|^export class"`             | `src`                                                          | `InterpretError.code` is the only public data field                          |

## Gates

Each command ran once against the final tree, in this order.

| Gate                    | Command                                                | Exit | Reading                                                                   |
| ----------------------- | ------------------------------------------------------ | ---- | ------------------------------------------------------------------------- |
| format:check            | `npm --prefix /home/user/fleet/interpret run format:check` | 0 | `gate-1-format-check.txt`                                                 |
| lint:check              | `npm --prefix /home/user/fleet/interpret run lint:check`   | 0 | `gate-2-lint-check.txt`                                                   |
| check                   | `npm --prefix /home/user/fleet/interpret run check`        | 0 | `gate-3-check.txt`                                                       |
| build                   | `npm --prefix /home/user/fleet/interpret run build`        | 0 | `gate-4-build.txt`; emitted `dist/src/core/index.d.cts`                   |
| test                    | `npm --prefix /home/user/fleet/interpret test`             | 0 | `gate-5-test.txt`; `src:core` 285, `policy` 111, `config` 46, `setup` 31, `guides` 95, all passed |
| audit                   | `npx scaffold audit --offline`                             | 0 | `gate-6-audit.txt`: `0 of 34 planned paths drifted from the plan.`        |

No gate reported a failure, so there is no failure excerpt to quote.

`format:check` and `lint:check` each failed before the final tree, and each was converged rather
than suppressed:

- `format:check` reported `guides/interpret.md`. Converged with
  `npx oxfmt --config .oxfmtrc.json guides/interpret.md`, which reflowed the Types table my row
  edits widened. Re-run exit 0.
- `lint:check` reported `vitest(no-conditional-expect)` in `tests/guides.test.ts` — the Errors
  fence transcription put `expect` inside a `catch`. Rewritten around `captureError` from
  `@orkestrel/test`, which keeps the fence's throw-and-narrow shape without a conditional assertion.
  Re-run exit 0. No directive was added and no rule was disabled.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own
exec. The Orchestrator's run after this unit exits is the deciding one.

## Breaking

`interpret-subj-3` and `interpret-subj-4` each move the published surface, so
`@orkestrel/interpret` earns a version bump before the consumer wave.

### interpret-subj-3 — `complete` removed from the published result records

`ExtractResult.complete`, `ClarifyResult.complete`, and `Interpretation.complete` are gone.
Completeness now derives: an interpretation is complete when `ambiguities` and `failures` are both
empty. `isInterpretation` no longer checks the flag.

Consumer: `@orkestrel/brief`. Its typecheck reddens on `INTERPRETATION_MEMBERS` until the row is
deleted. The exact edits are under § Shared-file patches.

### interpret-subj-4 — `describeSubject` renamed to `renderSubject`

The published export `describeSubject` no longer exists; `renderSubject` replaces it in place, in
`src/core/helpers.ts`, with the same signature `(subject: Subject, narrator: NarratorInterface):
string`. No compatibility alias and no re-export.

Consumer: none imports the symbol. `@orkestrel/brief` imports only `Interpretation`,
`InterpretInterface`, `RecordOptions`, `Intent`, `createInterpret`, `digestValue`, and
`isInterpretation`, so nothing in the fleet reddens. The rename still removes a published export, so
it earns the bump on its own account, and `brief/guides/interpret.md` is a vendored mirror that
refreshes from the released guide.

## Shared-file patches

I edited none of these. Carry each to `@orkestrel/brief`'s own unit, after
`@orkestrel/interpret` publishes and `brief` re-pins.

**`/home/user/fleet/brief/src/core/constants.ts`** — delete the `'complete'` row at line 70, inside
the `INTERPRETATION_MEMBERS` array that carries `satisfies ReadonlyArray<keyof Interpretation>`:

```diff
 	'stages',
 	'failures',
-	'complete',
 	'confidence',
 	'digest',
 ] satisfies ReadonlyArray<keyof Interpretation>)
```

**`/home/user/fleet/brief/tests/setup.ts`** — drop the key from the `extract` stub at line 93:

```diff
-			extract: () => ({ intent: { action, domain, confidence: 1 }, numbers: [3], complete: true }),
+			extract: () => ({ intent: { action, domain, confidence: 1 }, numbers: [3] }),
```

and from the `buildForeignInterpret` stub at lines 167-171:

```diff
 			extract: () => ({
 				intent: { action: 'migrate', domain: 'code', confidence: 1 },
 				numbers: [],
-				complete: false,
 			}),
```

and delete the `complete` getter from each interpretation fixture that carries one —
`AccessorInterpretation` at line 242, `ShiftingAccessorInterpretation` at line 313, and
`ShiftingForeignInterpretation` at line 380. Each reads:

```diff
-	get complete(): boolean {
-		return false
-	}
-
```

`AccessorInterpretation` does not declare `implements Interpretation`, and the other two do, so a
class getter for a removed member typechecks either way. Deleting them is what stops the fixture
restating a contract the package no longer publishes.

**`/home/user/fleet/brief/tests/setup.test.ts`** — recast each read onto the fields the flag derived
from. Line 109, inside `buildInterpret registers the matched template and completes the pipeline`,
where line 110 already asserts `ambiguities`:

```diff
-		expect(result.complete).toBe(true)
+		expect(result.failures).toEqual([])
 		expect(result.ambiguities).toEqual([])
```

Line 144, inside `AccessorInterpretation reports every member through a prototype getter`:

```diff
-		expect(interpretation.complete).toBe(false)
+		expect(interpretation.failures).toEqual([])
```

That case's own subject is that every member is a prototype getter, which `failures` carries as well
as `complete` did, and the `Object.keys(interpretation)` assertion beside it is untouched.

**`/home/user/fleet/brief/guides/interpret.md`** — a vendored byte-identical mirror. Refresh it from
the released `@orkestrel/interpret` guide rather than editing it; the removal of `complete` and the
rename to `renderSubject` each move it.

## Deviations

The deviation contract did not fire. No row's repair contradicted a rule, collided with an existing
name, required a file outside Owned, or required a consumer edit to keep this package's own gates
green.

Ancillary decisions I made and carried on from, as the contract allows:

1. **A second false documented claim, found by the row's own instrument.** The obj-1 transcription
   read red on a case beyond the one the row predicts. Beside the `tokenize` defect the row names, the `assignEntities`
   `@example` in `src/core/helpers.ts` claimed the returned order
   `[{ name: 'age', … }, { name: 'score', … }]` while the function returns `[score, age]` — keyword
   anchors land before the positional fallback. The evidence is in
   `interpret-obj-1-red.txt`: `expected [ 'score', 'age' ] to deeply equal [ 'age', 'score' ]`. This
   is the same defect class the row's cited rule names, in a file I own, so I corrected the example
   and pinned the real vector with `assignEntities > returns keyword-anchored entities before
   positionally filled ones` in `tests/src/core/helpers.test.ts`. I also narrowed the transcription
   itself to the values the guide fence actually claims: that fence line carries no `//` comment, so
   asserting an order there was my over-reach, and it now asserts the name-to-value pairs only.
2. **A fourth site of the corpus-extractor assembly.** The obj-2 row named the declaration in
   `Interpret.test.ts` and two sites in `integration.test.ts`. `tests/src/core/validators.test.ts:569`
   carried the identical `new Extractor({ actions: INTERPRET_ACTIONS, domains: INTERPRET_DOMAINS })`
   expression, and its suite's subject is `isInterpretation` rather than the extractor. I routed it
   through `createCorpusExtractor` too, under the row's own cited rule. I deliberately left the
   `createExtractor({ actions: INTERPRET_ACTIONS, … })` calls in
   `tests/src/core/factories.test.ts` alone: that suite's subject is `createExtractor` itself, so
   routing them through the shared fixture would delete the factory's own proof.
3. **TSDoc voice for the new helper.** The brief asked for `createCorpusExtractor`'s doc block "in
   the file's existing form", and `tests/setup.ts` uses imperative openers (`Build`, `Seed`,
   `Narrow`). `.claude/rules/typescript.md` § Comments and API documentation requires the third
   person with an `-s` verb, and a rule outranks a sibling's existing shape, so the block opens
   `Creates the corpus Extractor …`.
4. **Placement and case names.** The `createCorpusExtractor` case sits between the
   `INTERPRET_DOMAINS` block and the corpus-builder block in `tests/setup.test.ts`; the flagship
   fence section sits at the end of `tests/guides.test.ts` in the codec shape. Both are the
   contract's "where a paragraph sits" class.
5. **An `above` in a comment I was already rewriting.** `tests/src/core/validators.test.ts` said
   "The NO_TEMPLATE round trip above"; `.claude/rules/writing.md` § Code tokens, references, and
   links forbids `above` as a document reference. I rewrote that sentence for the `complete` removal
   anyway, so it now reads "The preceding NO_TEMPLATE round trip".

## Findings recorded, not acted on

Each sits outside this brief's enumerated scope. Recorded against the capability that owns it, for a
successor unit.

- **`via` in `tests/`.** Row interpret-subj-7's population is `src`, and `src` is clean. The word
  survives in `tests/setup.ts:323`, `tests/src/core/stages/Clarifier.test.ts:13` and `:111`,
  `tests/src/core/stages/Normalizer.test.ts:24`, `tests/src/core/Narrator.test.ts:25`, and
  `tests/src/core/factories.test.ts:91`, `:183`, `:198`, and `:217`, plus one `e.g.` at
  `tests/src/core/Narrator.test.ts:455`. Same substitution table, a population the row did not name.
- **`design §N` and `ledger N` citations.** Row interpret-subj-5's subject is the numbered
  `AGENTS §N` form, which is now gone. Comments in `tests/src/core/stages/Clarifier.test.ts:12`,
  `tests/src/core/stages/Extractor.test.ts:5`, `tests/src/core/Interpret.test.ts:30`,
  `tests/src/core/integration.test.ts:19`, and the three manager suites still cite a `design §N`
  document that is not in this repository, so those citations resolve to nothing either.
- **The `as const` in the `guides/interpret.md` Helpers fence.** The fence at the `scoreTemplate`
  example writes `reasoning: 'symbolic' as const` inside an unannotated literal. Row obj-3's site
  list is the TypeScript test files, so the guide fence keeps it; a reader copying that fence copies
  the form the rule rejects.
- **`Interpretation.stages` prose.** `src/core/types.ts` and `guides/interpret.md` both state that
  `stages` "always holds exactly five records". That is a count over a set the `InterpretStage` union
  can grow, and `AGENTS.md` § Writing bans it. It is prose the rows did not name.

## Fix round 1

Closed the round-1 objective lane's refutation of claim 4 (`units/l3/interpret-objective-r1.md`
§ Required change R-1). § Sweeps now carries the interpret-obj-6 row and a widened `complete` row.

1. **Added the interpret-obj-6 row.** `grep -rniE "zero-dependency|ESM-only|no CommonJS build|Node\.js
   >= 22$"` over `src`, `tests`, `README.md`, `guides/interpret.md`, and `guides/README.md` returns
   one hit — `tests/distribution.test.ts:60`, an unrelated comment describing the `require`
   condition's `.d.mts` declaration extension, not the removed package-format claim. Every one of the
   row's old forms is gone.
2. **Rewrote the `complete` row.** Ran `grep -rniE "\bcomplete(s|d|ing)?\b"` at a word boundary over
   the inflections, over `src`, `tests`, `README.md`, `guides/interpret.md`, and `guides/README.md`
   — `guides/README.md` now in the population. Every hit is ruled by sense: the derivation sentence
   at `types.ts:277` and `guides/interpret.md:69`; the absence assertions at `Interpret.test.ts:99-100`,
   `Clarifier.test.ts:28`, and `Extractor.test.ts:43`; and the English adjective or its inflections
   at every remaining site. `guides/README.md` carries no hit.
