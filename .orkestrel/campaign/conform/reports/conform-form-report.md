# Unit conform-form — report

Every row landed. The gate chain is green at exit 0 for `format:check`, `lint:check`, `check`,
`build`, and `test`. `git status --short` lists only files under Owned. Two corrections to a row's
operative text are recorded under § Deviations; neither stopped the unit.

## Row dispositions

| Row         | Disposition | Note                                                                                     |
| ----------- | ----------- | ---------------------------------------------------------------------------------------- |
| form-obj-1  | applied     | Builders moved to `tests/setup.ts`, exported, and proved from `tests/setup.test.ts`.     |
| form-obj-2  | applied     | `receiveAnswer` deleted, call site reads `form.answer`, test title rewritten.            |
| form-subj-1 | applied     | Counts deleted at every listed site, plus the refuter's added sites.                     |
| form-subj-2 | applied     | `## Dependency reference` is one table over every mirror in `guides/`.                   |
| form-subj-3 | applied     | Each listed Surface Summary cell is a noun phrase; API and Kind cells untouched.         |
| form-subj-4 | applied     | The `@param options` tag is gone from both interface blocks.                             |
| form-subj-5 | applied     | The hedges are gone; the two permitted-sense sites are retained.                         |
| form-subj-6 | applied     | Contract 13 states the obligation in the imperative.                                     |
| form-subj-7 | applied     | `FormError` carries a runnable `@example`.                                               |
| form-subj-8 | applied     | `evaluateField` and `evaluateForm` each carry the `@throws` tag.                         |
| fleet-F1    | noop        | The helper is absent and this workspace has no browser environment. Evidence below.      |
| fleet-F2    | noop        | Neither class declares a public `readonly id: string` field. Evidence below.             |

### fleet-F1 evidence

A search for `isBrowserVuePath` over the whole checkout `/home/user/fleet/form`, `node_modules`
included, returns no match. `tests/setup.ts` declares no such helper and its header carries no clause
naming one, `tests/setup.test.ts` has no `describe('isBrowserVuePath', …)` block, and this workspace
has no browser environment: `ls /home/user/fleet/form/src` lists `core` alone, `/home/user/fleet/form/app`
does not exist, and `ls /home/user/fleet/form/tests/setup*.ts` lists `setup.test.ts`, `setup.ts`, and
`setupPolicy.ts` with no `setupBrowser.ts`. The alternate export-free ruling does not apply either:
`tests/setup.ts` exports the answer, change, control, matrix, and budget fixtures the suites import.

### fleet-F2 evidence

The classes read are `Form` at `/home/user/fleet/form/src/core/Form.ts:55` and `FormError` at
`/home/user/fleet/form/src/core/errors.ts:17`; a search for `class \w+` over `src` finds no other.
`Form` declares only `#` fields — `#emitter`, `#schema`, `#messages`, `#baseline`, `#values`,
`#touched`, `#disabled`, `#invalidations`, `#resolvers`, `#errors`, `#status`, `#batchDepth`,
`#evaluation`, `#pending`. `FormError` declares `readonly code: FormErrorCode` and
`readonly context?: JSONRecord`. A search for `readonly id: string` over `src` returns no match, so
no class has the shape the row repairs and the `JSON.stringify` pre-check never fires.

## Files touched

| File                             | Change                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `README.md`                      | form-subj-1: the control, budget, and event counts deleted; both paragraphs rewrapped.        |
| `guides/README.md`               | form-subj-2: the mirror paragraphs replaced by one table over every mirror in `guides/`.      |
| `guides/form.md`                 | form-subj-1, -3, -5, -6: counts deleted, Surface summaries made noun phrases, hedges deleted, Contract 13 made imperative, the visibility-switch heading and its link renamed. |
| `src/core/types.ts`              | form-subj-1, -4, -5: the member tallies named out, the two interface `@param options` tags deleted, the `currently`/`right now` hedges deleted. |
| `src/core/Form.ts`               | form-subj-5: the `values` and `disabled` getter doc hedges deleted.                            |
| `src/core/helpers.ts`            | form-subj-5, -8: the `extractChanges` `@param` hedge deleted; `@throws` added to `evaluateField` and `evaluateForm`. |
| `src/core/errors.ts`             | form-subj-7: `FormError` given a runnable `@example`.                                          |
| `tests/setup.ts`                 | form-obj-1: `createMatrixField`, `createMinimumCase`, `createMaximumCase`, and `createMatrixCase` moved in and exported; `FieldRule` added to the type import. |
| `tests/setup.test.ts`            | form-obj-1: one case proving the moved builders; `appliesRule`, `evaluateField`, `createMatrixCase`, and `createMatrixField` imported. |
| `tests/src/core/helpers.test.ts` | form-obj-1: the four builders deleted; `FieldRule` and `MATRIX_FIELDS` dropped from the imports and the two used builders added. |
| `tests/src/core/parsers.test.ts` | form-obj-2: `receiveAnswer` and the stranded `await Promise.resolve()` deleted, the call site reads `form.answer`, the test title rewritten. |

Diffstat:

```text
 README.md                      |  26 ++---
 guides/README.md               |  23 ++--
 guides/form.md                 | 237 +++++++++++++++++++++--------------------
 src/core/Form.ts               |   4 +-
 src/core/errors.ts             |  14 ++-
 src/core/helpers.ts            |   6 +-
 src/core/types.ts              |  18 ++--
 tests/setup.test.ts            |  30 ++++++
 tests/setup.ts                 |  86 +++++++++++++++
 tests/src/core/helpers.test.ts |  85 +--------------
 tests/src/core/parsers.test.ts |  10 +-
 11 files changed, 292 insertions(+), 247 deletions(-)
```

Most of `guides/form.md`'s line count is `oxfmt` re-padding the Surface, Rules, Rendering, and
Errors table columns the edited cells resized; the prose and cell edits are the rows listed earlier.

## Failing-first proof, form-obj-1

The row moves fixture builders, so § Method step 2 makes it behavioural. The command is
`npm --prefix /home/user/fleet/form run test:setup` throughout. Each capture is a plain redirect of
that command into `/home/user/work/evidence/form-proofs/`.

| Stage                                                              | Result                     | Capture                     |
| ------------------------------------------------------------------ | -------------------------- | --------------------------- |
| Case added, builders still in `helpers.test.ts`                    | exit 1, 1 failed, 13 passed | `form-obj-1-absent.txt`    |
| Builders moved and exported, imports repaired                      | exit 0, 14 passed          | `form-obj-1-green.txt`     |
| Negative control: `createMatrixField` returns the rule with `required: undefined` | exit 1, 1 failed, 13 passed | `form-obj-1-planted.txt`   |
| Plant reverted                                                     | exit 0, 14 passed          | `form-obj-1-restored.txt`  |

The absent-helper run failed with `TypeError: createMatrixCase is not a function or its return value
is not iterable` at `tests/setup.test.ts:244`, so the case was collected and executed rather than
skipped. The planted run failed on the assertion itself, with the diff naming `field.rule.required`
and the `failing` rule list, so the assertion is load-bearing and not only the import.

`npm --prefix /home/user/fleet/form run test:src:core` after the move: exit 0, 9 files, 183 passed
(`form-obj-1-srccore.txt`).

## Proof, form-obj-2

Not behavioural: the row deletes a wrapper and adds no helper. `npm --prefix /home/user/fleet/form
run test:src:core` after the deletion is exit 0, 9 files, 183 passed (`form-obj-2-srccore.txt`) —
the same count as before it, because `receiveAnswer` registered no case. The wrapper's own assertion
at `parsers.test.ts:483` (`expect(await parked)`) still runs and still passes against
`const parked = form.answer`.

## Sweeps

Every sweep ran through the Grep tool over the glob
`{README.md,guides/README.md,guides/form.md,src/**/*.ts,tests/**/*.ts}` in `/home/user/fleet/form`,
which is the package's own prose and code and excludes the vendored guide mirrors.

| Sweep                                                | Pattern                                                                             | Result                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| form-obj-2, the deleted wrapper                      | `receiveAnswer`, case-insensitive, over the whole checkout                          | no match                                  |
| form-obj-2, inflections                              | `resumes a parked awaiter\|receiveAnswers\|receiveAnswered\|receiveAnswering`, case-insensitive | no match                       |
| form-subj-1, the deleted counts                      | `\b(twelve\|eleven\|nine\|eight\|seven\|six\|five\|four\|three\|two)\b`, case-insensitive | no listed site remains; the residue is ruled below |
| form-subj-6, the softener                            | `\b(should\|shoulds\|shouldn't)\b`, case-insensitive                                | one hit, ruled below                      |
| form-subj-5, the hedges                              | `\b(currently\|now\|nowadays)\b`, case-insensitive                                  | four hits, all expected                   |
| form-subj-1, the renamed anchor                      | `three-visibility\|three visibility\|the-three`, case-insensitive                   | no match                                  |
| form-subj-1, the new anchor                          | `visibility switches`                                                               | `guides/form.md:512` link and `:958` heading, and nothing else |
| form-obj-1, the relocated builders                   | `\b(createMatrixField\|createMinimumCase\|createMaximumCase\|createMatrixCase)\b`, over `{README.md,guides/README.md,guides/form.md,src/**/*.ts,tests/**/*.ts}` | hits only in `tests/setup.ts`, `tests/setup.test.ts`, and `tests/src/core/helpers.test.ts` — the export declarations and the three call sites, and nothing outside those files |
| form-subj-2, the removed mirror paragraphs           | `devDependency powering this repository's guides-parity suite\|devDependency that generates and repairs this workspace's vendored configuration`, over the same glob | no match |
| form-subj-3, the old imperative Summary openings     | `\b(Open a form against\|Write one own enumerable entry\|Resolve one rule's\|Build one frozen\|Project a schema into\|Audit a structurally\|Own one field\|Own a field's\|Own a whole schema\|Parse unknown wire\|Parse one answer\|Parse a strict answer)\b`, over the same glob | no match |
| form-subj-4, the interface `@param options` tag      | `@param options - The (evaluation's\|form's) settings\.`, over the same glob        | two hits, both expected survivors: `src/core/factories.ts:8` and `src/core/Form.ts:75`, the constructor-adjacent function and the class constructor that actually take the options object — the row deleted the tag only from the two interfaces at `types.ts:408` and `:433`, never from the functions that carry it correctly |

Every guide pointer in this table and in this section was re-read against the tree as it stands
before recording it, not carried forward from the refuter's citation.

The `receiveAnswer` sweep is not a vacuous pass: the same tool run for `receiveAbandonment` over
`tests/` returns `parsers.test.ts:18` and `:487`, so the search reaches the file the deleted symbol
lived in.

The `currently|now` hits are `src/core/helpers.ts:498` and `:500`, which are the local identifier
`now` the refuter exempts, and `guides/form.md:1256` and `:1297`, which are the two sites the
refuter struck as permitted senses — the contrast against "what the submit decided", and the fence
comment marking the state after the `submit()` call. Both are retained unchanged, recorded here as
permitted rather than dropped, per `.claude/rules/writing.md` § Substitutions.

Every remaining number-word hit is a value the reader needs or a fixed arity rather than a tally of
a growable set: `six-digit` and `four-digit year` are format facts, `roughly two megabytes` is a
size, `a payload four times over FIELD_LIMIT` is a ratio reported with its reading, `comparing two
field values` and `custom receives two arguments` are the declared arities of `matchesValue`,
`extractChanges`, `matchesValues`, and `FieldValidator`, and `'two'`, `'Two'`, and `'twelve'` are
test data. `tests/setupPolicy.ts` and `tests/config.test.ts` are off-limits vendored files. The
sites outside those classes are listed under § Findings outside this unit's rows.

## Gates

Each command is `npm --prefix /home/user/fleet/form run <script>`, read bare, captured to
`/home/user/work/evidence/form-proofs/`.

| Gate                  | Exit | Reading                                                                       | Capture                  |
| --------------------- | ---- | ----------------------------------------------------------------------------- | ------------------------ |
| `npm run format:check` | 0    | `All matched files use the correct format.` over 48 files                    | `gate-format-check.txt` |
| `npm run lint:check`   | 0    | no diagnostic                                                                 | `gate-lint-check.txt`   |
| `npm run check`        | 0    | root `tsc --noEmit` then `check:src:core`, both silent                       | `gate-check.txt`        |
| `npm run build`        | 0    | `dist/src/core` emitted, declarations copied to `index.d.cts`                | `gate-build.txt`        |
| `npm test`             | 0    | `src:core` 183, `policy` 111, `config` 46, `setup` 14, `guides` 48, all passed | `gate-test.txt`         |

`npm test` ran with no other unit writing this checkout. Per § Acceptance criteria's observation
note, the deciding whole-suite run is the Orchestrator's after this unit exits.

`guides/form.md` and `guides/README.md` were formatted with the single-file command
`cd /home/user/fleet/form && npx oxfmt --config .oxfmtrc.json --write guides/form.md guides/README.md README.md`,
which re-aligns the markdown tables the edits resized. No tree-wide mutating command ran.

## Breaking

None. No row renames or removes a published symbol. The barrel, the `## Surface` API column, and
every `## Methods` row are byte-identical to the baseline; only Summary prose, TSDoc, and test
internals moved. `tests/guides.test.ts` proves it: the surface bijection assertions pass unchanged
at 48 cases.

## Shared-file patches

None. Every edit landed inside Owned. No consumer-side edit is obliged, because no exported name,
signature, or behaviour changed.

## Deviations

Orchestrator's ruling (audit round 1): applying the corrected text and recording each correction
here satisfied the deviation contract, because each correction fixed a false literal in the
refuter's text without changing the repair.

Neither item stopped the unit. Both are corrections to a row's operative replacement text where that
text states a fact the code contradicts, which is the same class of correction the refuter itself
applied to the finder at form-subj-1's `:1284` and `:1390`. Both are recorded here rather than
absorbed.

**form-subj-1, `src/core/types.ts:182`.** The row's operative repair writes
"`hidden`, `readonly`, and `disabled` differ in what they remove."

- Expected: a replacement naming the visibility switches this package declares.
- Found: `readonly` is not one of them. `FieldBase` declares `readonly locked?: boolean` at
  `src/core/types.ts:199` and no `readonly` member, and the very sentence being edited continues
  "`locked` renders it unwritable" two lines later.
- Done: the line now reads "`hidden`, `locked`, and `disabled` differ in what they remove." The
  count is deleted, which is the property the row names.
- Not done: the literal `readonly` spelling. Writing it would name a member the package does not
  have, against `.claude/rules/documentation.md` § Parity and `.claude/rules/writing.md` § Claims.
- Hypothesis: the refuter transcribed `locked` as `readonly` from the switch's rendering obligation.

**form-subj-1, `guides/form.md:762`.** The row's operative repair writes
"They bind at the parse door and the evaluation door."

- Expected: a replacement naming the doors the following paragraphs name.
- Found: the guide names them "**The schema door reports.**" at `:764` and "**The value door
  refuses.**" at `:769`. Neither is called the parse door or the evaluation door, and the sentence
  introduces those two paragraphs directly.
- Done: the line now reads "They bind at the schema door and the value door, and which door a limit
  sits at is the whole story."
- Not done: the literal replacement text, which would have contradicted the two paragraphs it
  introduces.
- Hypothesis: the refuter named the doors from the mechanism rather than from the guide's own
  headings.

### Ancillary decisions, recorded and carried on from

These are the deviation contract's ancillary class — wording and placement inside an edit the row
already fixed — so the unit decided them and continued.

- **form-subj-4, the stranded blank comment line.** The row directs deleting each `@param options`
  line "together with the blank comment line each leaves stranded". Neither block strands one: at
  `types.ts:405-409` and `:429-434` the `@param` line sits directly above `@remarks`, and the blank
  ` *` line above it separates the description from `@remarks` exactly as every other block in the
  file does. Only the `@param` lines were deleted, and each block now runs description, blank,
  `@remarks`, `@example`, which is what the row's stated goal asks for.
- **form-subj-1, `guides/form.md:1237`.** The accepted replacement "These rules say what the submit
  does about it" leaves `these` with a rival referent in a guide whose subject is `FieldRule`. The
  line reads "The rules that follow say what the submit does about it", which satisfies
  `.claude/rules/writing.md` § Sentence and paragraph order and mirrors the form the refuter
  accepted at `:438` ("The properties that follow define it").
- **form-subj-1, `guides/form.md:716`.** The refuter offered its recast "for example". The line now
  reads "`PATTERN_LIMIT` bounds the source this package will compile, and the wire boundary keeps a
  schema data only. Each is deliberate." Both named mechanisms are the ones the next two paragraphs
  detail: `PATTERN_LIMIT` at `:718-720`, and the data-only wire boundary at `:723-726`. The
  refuter's own example named "the absent time bound" as a thing that bounds the rule, which the
  paragraph at `:722` denies.
- **form-subj-1, `guides/form.md:788`.** Deleting "Three things stay unbounded" leaves "The third is
  the structural **read**…" naming a list item by its position, which `AGENTS.md` § Writing bans.
  That clause is a mechanical consequence of the row's own edit, so it moved with it: the sentence
  now opens "The structural **read** at the parse door is unbounded for a different reason".
- **form-subj-1, `guides/form.md:467`.** Naming `FormSchema`, `FormGroup`, and `FieldChoice` in
  place of "the other three" repeated the list the preceding clause had just given. The two
  sentences were merged so the members are named once.
- **Paragraph rewrapping.** `oxfmt` re-aligns markdown tables but does not reflow prose, so each
  paragraph an edit lengthened or shortened was rewrapped by hand to the file's own column bound.
  A search for `^[^|].{100,}$` over the three markdown files returns 12 lines longer than 100
  characters, 11 of them unchanged baseline lines, so the rewrapping matches the bound already in
  use.

## Findings outside this unit's rows

Recorded against the row that owns them, for the next change, not reopened here per
`.claude/rules/quality.md` § Completion.

- **form-subj-1 owns these.** Three counts over growable sets survive in the package's own prose and
  appear in neither the finder's site list nor the refuter's additions.
  - `guides/form.md:971`, "`fill` refuses none of the three switches" — the same switch set whose
    heading this unit renamed. The heading rename does not make the line false, so it was left.
  - `guides/form.md:1695`, "persistence is a host loop over those two" — the members `values` and
    `parseValues` are named in the same sentence, so this is the weaker case.
  - `tests/setup.test.ts:104`, "The two routes disagree on any arithmetic slip" — a doc comment in
    an owned test file, members named in the preceding sentence.
- **form-subj-6 owns this.** `tests/src/core/helpers.test.ts:242` throws
  `new Error('membership should not run')`. It is a string literal inside a `custom` validator stub
  rather than developer-facing prose, which is why the refuter's bounded sweep did not return it.
- **Not this campaign's.** `guides/form.md:91` ("the readonly state below"), `:1274` ("as the
  section above sets out"), and `:823` ("any budget above") point with `above` and `below`, which
  `.claude/rules/writing.md` § Code tokens, references, and links replaces with `preceding`,
  `following`, `earlier`, or `later`. No row names them and each sits in a sentence this unit did
  not otherwise rewrite.

## Successor rows

Carrier for every row in this section: `briefs/followon/form-prose-brief.md` (a `builder` unit after
landing).

- **F2.** `src/core/types.ts:109` opens its `@throws` outside the `Thrown when …` form
  `.claude/rules/typescript.md` fixes. Rewrite the opening to
  `@throws Thrown when a {@link FieldValidator} …`, keeping the remaining sentences.
- **F3 and F-SET-REFERENCES.** `guides/form.md:971` "none of the three switches" becomes "none of
  `hidden`, `locked`, and `disabled`". `guides/form.md:1695` "those two" becomes "`values` and
  `parseValues`". `tests/setup.test.ts:104` "The two routes" becomes "The measurement and the
  budget builders". The `should` string literal at `tests/src/core/helpers.test.ts:242` is already
  disclosed in this report's § Findings outside this unit's rows and carries no further row here.
- **F-DIRECTIONAL-REFERENCES.** `guides/form.md:41, 91, 449, 824, 1275, 1513, 1710` use `above` or
  `below` as document references; the replacements in order are "in this guide", "in the
  `## Surface` rows", "following budgets", "named budget", "preceding section", "preceding
  `## Surface` rows", and "preceding flagship fences".
- **R1.** The `guides/form.md` mirrors in `/home/user/fleet/terminal` and `/home/user/fleet/toolbox`
  are refreshed byte-for-byte at those consumers' landings, never by this unit.

## Fix round 1

- **Claim 4, the four sweep rows.** § Sweeps gains four rows — form-obj-1, form-subj-2,
  form-subj-3, and form-subj-4 — each read against the tree with the Grep tool over the glob the
  table's header names; closed above.
- **F1, the six pointers.** `guides/form.md:513`/`:959`, `:1257`/`:1298`, and `:972`/`:1696` are
  corrected to `:512`/`:958`, `:1256`/`:1297`, and `:971`/`:1695`, each re-read against the tree
  before recording; closed above in § Sweeps, in the `currently|now` paragraph, and in § Findings
  outside this unit's rows.
- **R2, the ruling.** The Orchestrator's ruling that applying the corrected text satisfied the
  deviation contract is recorded under § Deviations; closed above.
- **Successor rows.** F2, F3, F-SET-REFERENCES, F-DIRECTIONAL-REFERENCES, and R1 are listed under
  § Successor rows with their carrier; closed above.

## Review evidence

- `/home/user/work/evidence/conform-form.diff` — `git diff HEAD`, 1011 lines.
- `/home/user/work/evidence/conform-form.status` — `git status --short`, 11 entries, every one under
  Owned: `README.md`, `guides/README.md`, `guides/form.md`, `src/core/Form.ts`, `src/core/errors.ts`,
  `src/core/helpers.ts`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/setup.ts`,
  `tests/src/core/helpers.test.ts`, `tests/src/core/parsers.test.ts`.
- `/home/user/work/evidence/form-proofs/` — the runner captures named above.
