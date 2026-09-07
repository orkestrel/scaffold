# Report — P.2 `d7n-interpret-converge`

`guides/interpret.md` passes the equality gate. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`, and both write directions read `written: 0`.

Wall clock: the first recorded clock reading is 2026-09-07T21:15Z (taken during the reading pass, after the first `git log --oneline -1`); the last is 2026-09-07T21:31Z.

## Criterion 1 — red-first on the unconverged tree

Command: `PATH=/opt/npm11/bin:$PATH npm run test:guides`, after the gate cases landed and before any guide, README, or doc-block edit.

```
 Test Files  1 failed (1)
      Tests  3 failed | 95 passed (98)
```

Each failing case's first lines, verbatim:

- `tests/guides.test.ts > pairs at least one example title across the guide and the source`
  ```
  AssertionError: expected [ Array(1) ] to deeply equal []
  +   "guides/interpret.md pairs: guide [\"Surface\",\"Constants\",\"Errors\",\"Validators\",\"Helpers\",\"Helpers\",\"Helpers\",\"Parsers\",\"Factories\",\"NormalizerInterface\",\"ExtractorInterface\",\"ClarifierInterface\",\"ClarifierInterface\",\"FormatterInterface\",\"GeneratorInterface\",\"NarratorInterface\",\"RecordManagerInterface\",\"TemplateManagerInterface\",\"SubjectManagerInterface\",\"DefinitionManagerInterface\",\"InterpretContextInterface\",\"InterpretInterface\"] source []",
  ```
- `tests/guides.test.ts > opens the README with the guide tagline`
  ```
  AssertionError: expected undefined not to be undefined
      172|  expect(pitch).not.toBeUndefined()
  ```
- `tests/guides.test.ts > Interpret > keeps every compared summary and example equal to its source`
  ```
  AssertionError: expected [ …(179) ] to deeply equal []
  +   "guides/interpret.md type ProvenanceCategory: guide absent source \"Names how one `FieldMapping` / `Entity` value was obtained.\"",
  +   "guides/interpret.md type InterpretStage: guide absent source \"Names the fixed pipeline phases an `InterpretInterface#interpret` run produces one `StageRecord` for, in order.\"",
  ```

Gate cases added to `/home/user/fleet/interpret/tests/guides.test.ts`: the pin `pairs at least one example title across the guide and the source` and the README case `opens the README with the guide tagline` at file scope, the equality case `keeps every compared summary and example equal to its source` inside the manifest loop's `describe(entry.concept)` block directly after the methods loop and before `documents an example for every Surface function`. `findDrift` imported beside the existing readers; `GUIDE_SPEC` added; `README.md` added to `ROOT_FILES`; the header line reads "The constants that follow are this package's own"; the `INTERNAL` block reads "the assertion that follows it"; the package's own `// ── Flagship fence transcriptions` banner (which carried `below`) replaced by the pilot's "The EXECUTED half" comment.

Drop-in canonicity: `python3` unified diff of the region from `const root = new URL` to the flagship-fences comment, against `/home/user/fleet/abort/tests/guides.test.ts`, reports only this package's own flagship fixtures (`NoteRecord`, `ARITHMETIC`) as additions. Every other byte of that region is the pilot's.

## Criterion 2 — table headers and the class table

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`, or `Returns`. Header sets before and after, read by the comparison instrument:

```
headers baseline: [('API', 'Kind', 'Builds…'), ('API', 'Kind', 'Narrows to'), ('API', 'Kind', 'Summary'), ('Method', 'Returns', 'Behavior'), ('Type', 'Kind', 'Shape')]
headers new     : [('API', 'Kind', 'Shape', 'Summary'), ('API', 'Kind', 'Summary'), ('Method', 'Returns', 'Summary'), ('Type', 'Kind', 'Shape', 'Summary')]
```

- `### Types` gained `Summary` as its last column; the fleet `Shape` convention sentence (Ruling 15's wording) sits above it at `guides/interpret.md:74`.
- `### Constants` gained `Shape` carrying each constant's declared type, with "A `Shape` cell holds the constant's declared type." above it at `:139`.
- `### Validators` — `Narrows to` became `Shape` holding the narrowed type, and the table gained `Summary`; the fleet sentence plus "In a guard table a `Shape` cell holds the type the guard narrows to." sits above it at `:227`.
- `### Factories` — `Builds…` renamed `Summary`. Every `## Methods` table — `Behavior` renamed `Summary`.
- `### Entities` became `### Classes`; every row's `Kind` is `class`, and no class is documented under its own H3, so no row was added.

Hand-rebuild comparison against `git show HEAD:guides/interpret.md`, positional by table and row (instrument: `tmp/d7n-interpret-converge/compare2.py`):

```
table count baseline 20 new 20
differences outside Summary and Shape: []
```

Every first-column name, every `Kind` cell, and every `Returns` cell is byte-identical to the baseline in the same table and row position. No row was added or dropped (`rows only in baseline: []`, `rows only in the new guide: []`).

## Criterion 3 — doc blocks rewritten, then propagated

Command: `npm run docs -- --to guide` → `rows read: 1, disagreements found: 179, written: 179, reported: 0`, then `npx oxfmt --config .oxfmtrc.json --write guides/interpret.md`. `npm run docs` after: `rows read: 1, disagreements found: 0`.

Rows whose literal stayed in `Shape` (the type alias's own type literal, or the interface's bare member names, with the trailing em-dash clause removed into the doc block): `ProvenanceCategory`, `InterpretStage`, `InterpretErrorCode`, `NarratorFormatter`, `RecordFunction`, and every `{ … }` member-list row from `EntityMapping` through `InterpretOptions`.

Rows whose `Shape` cell was a prose description or a call signature and took the idiom: `InterpretEventMap` → `{ interpret, add, error, destroy }`; `RecordEventMap` → `{ add, remove, destroy }`; `TemplateManagerEventMap`, `SubjectManagerEventMap`, `DefinitionManagerEventMap` → `RecordEventMap`; `InterpretContextEventMap` → `{ add, clear, destroy }`; `RecordManagerInterface`, `TemplateManagerInterface`, `SubjectManagerInterface`, `DefinitionManagerInterface` → `{ emitter, count } plus …`; `InterpretContextInterface` → `{ emitter, session, subjects, definitions } plus …`; `InterpretInterface` → `{ emitter } plus …`; `NormalizerInterface`, `ExtractorInterface`, `ClarifierInterface`, `FormatterInterface`, `GeneratorInterface`, `NarratorInterface` → the bare member names with no braces, the form a members-only interface takes fleet-wide.

Doc blocks rewritten by hand, in `/home/user/fleet/interpret/src`:

- `constants.ts` — every default and confidence constant's description now names its literal (Ruling 18): `DEFAULT_INTERPRET_SIMILARITY` (0.8), `DEFAULT_INTERPRET_FLOOR` (0.3), `DEFAULT_INTERPRET_HISTORY` (16), `CONFIDENCE_EXACT`, `CONFIDENCE_ALIAS`, `CONFIDENCE_COLLECT`, `CONFIDENCE_POSITIONAL`, `CONFIDENCE_CARRIED`, `CONFIDENCE_DEFAULT`, `CONFIDENCE_COMPUTED`. `UNSAFE_FIELD_SEGMENTS` names its segments and drops the `ANY` emphasis. The slash pairs became `and`.
- `errors.ts` — `InterpretError`'s description absorbed the guide cell's fact: it now names the `InterpretErrorCode` and the optional `context` record.
- `validators.ts` — `isTemplate`'s remarks gained the `isSymbolicExpression` sentence the guide cell carried; `isProvenance`, `isAmbiguity`, and `isStageFailure` gained a `@remarks` carrying the checked-member list their cells carried (Ruling 7: reference material to `@remarks`, no sentence deleted).
- `factories.ts` — every `create*` description now states the contract it returns, so the guide's `Builds…` fact survives the column's removal.
- `Interpret.ts` — the class description absorbed "runs the `[normalize, extract, clarify, format, generate]` pipeline, owns the template registry and the context, and exposes the reverse direction".
- `Narrator.ts`, `managers/SubjectManager.ts`, `types.ts` (`Lexicon`, `NarratorInterface`) — the all-caps emphases `TOTAL`, `OWN`, and `DATA` corrected inside compared description paragraphs.
- `helpers.ts` — `digestValue`'s description re-wrapped; see § Seed and reader observations.
- `types.ts` — a doc block added to every call-signature member of `NormalizerInterface`, `ExtractorInterface`, `ClarifierInterface`, `FormatterInterface`, `GeneratorInterface`, `NarratorInterface`, `RecordManagerInterface`, `TemplateManagerInterface`, `SubjectManagerInterface`, `DefinitionManagerInterface`, `InterpretContextInterface`, and `InterpretInterface`, each with a description, `@param`, and `@returns`; `ClarifierInterface#clarify` also carries a `@remarks` holding the `{field}.{index}` sentence its cell carried. The overload notes stay off the second and third `remove` signatures, which the reader does not read.

Facts landed in guide prose rather than a cell (Ruling 7): none. Every fact a cell carried reached a description paragraph or a `@remarks`.

No code token moved: `git diff -U0 -- src` filtered to non-comment lines is empty.

## Criterion 4 — the titled pair

The pair is `createInterpret`'s `@example` in `src/core/factories.ts` and the `## Surface` fence in `guides/interpret.md`, titled `Interpret text against an added template`.

- `createInterpret` is the first `create*` the facts block lists, so it is the primary factory; its first demonstrating fence is the `## Surface` fence, whose heading is structural, so Ruling 9 applies: `### Interpret text against an added template` was added directly above that fence. No fence moved.
- Heading uniqueness: `grep -n '^#\+ Interpret text against an added template' guides/interpret.md` → `25:### Interpret text against an added template`.
- Fence body read before titling: `sed -n '25,70p' guides/interpret.md | grep -n '```\|\*/'` reported only the fence's own opening and closing runs, so the body carries no three-backtick run and no doc-comment terminator.
- Ruling 14: the fence was the fuller demonstration (it also reads `ambiguities` and `failures`, subscribes to the emitter, calls `describe`, and calls `destroy`); the block demonstrated a strict subset. The block was extended to the fence and nothing was deleted.
- Order: the block was titled first, then `npm run docs` read exactly one disagreement, the titled pair. Then `npm run docs -- --to source` → `rows read: 1, disagreements found: 1, written: 1, reported: 0`, followed by `npx oxfmt --write src/core/factories.ts`. Every other block stays untitled.

## Criterion 5 — the tagline, the pitch, and the opening prose

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries the same blockquote under its H1, line for line:

```
> A synchronous, deterministic bidirectional bridge between natural language and the
> `@orkestrel/reason` engine: a forward pipeline that normalizes raw text, classifies its
> intent, matches an added `Template`, clarifies the fields extraction left open, and
> generates a `Subject` and `Definition` pair ready for `Reason.reason`, plus a reverse
> direction that renders a `Definition`, a `Subject`, or a `ReasonResult` to
> display-neutral prose through a lexicon-driven `Narrator`.
```

The guide's opening paragraph (`guides/interpret.md:10-18`) carries the displaced sentences without restating the tagline's clauses: the LLM/provider/agent disclaimer and the `prompt`'s external audience; the reverse direction complementing rather than duplicating the raters' `describe*` family; each stage's own mechanism (`normalize`'s substitutions, `extract`'s template-agnostic classification and numeric mining, `clarify`'s carry-over, defaults, and dependency-ordered computed fields); the discriminant law naming `stage`, `category`, and `code`; and the `src/core` source line with the `@src/core` barrel.

The README's opening paragraph keeps the onboarding it alone carries and states no tagline clause: "Install the package, wire an orchestrator with the action and domain vocabularies your domain speaks, add the templates it answers, and call `interpret()` on each turn of raw text. Environment-agnostic — no I/O, and no browser or server assumptions. Part of the `@orkestrel` line."

Other prose sentences changed, all in files this unit owns:

- `guides/interpret.md` § Surface, after the fence — `SYNCHRONOUS` and `INCOMPLETE` lowered; "both yield" recast to "each yield" so the sentence names its members.
- `guides/interpret.md` § Validators intro — rewritten: `Rows below labeled "Open"` removed (`below` is a banned pointer, and the label moved out of the cells), replaced by "Each row's `Summary` names the posture its guard takes."
- `guides/interpret.md` §§ `NarratorInterface`, `RecordManagerInterface`, `TemplateManagerInterface`, `InterpretInterface` intros — `TOTAL`, `CONTENT`, `SYNCHRONOUS`, and `LAST` lowered; the slash-joined member lists in the `InterpretInterface` paragraph spelled with `and`.
- `README.md` § Usage paragraph — `INCOMPLETE` lowered and "both yield" recast to "each yield".
- `guides/interpret.md` gained a `## Tests` section naming every suite that proves it, descriptively and with no SQ/MQ/EQ/RQ identifier. Its `tests/guides.test.ts` row names the equality gate's checks: every `Summary` cell against its declaration's description paragraph, the titled `Interpret text against an added template` fence against the `@example` block of that title, and the README pitch against the guide's tagline.

## Criterion 6 — the seed reads zero

```
npm run docs                → rows read: 1, disagreements found: 0                     (exit 0)
npm run docs -- --to guide  → rows read: 1, disagreements found: 0, written: 0, reported: 0
npm run docs -- --to source → rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```
npx oxfmt --config .oxfmtrc.json --check guides/interpret.md README.md tests/guides.test.ts src/core
  → All matched files use the correct format.  (exit 0)
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
  → no output (exit 0)
npm run check      → exit 0
npm run test:guides → Test Files 1 passed (1) | Tests 98 passed (98)
npm run test:policy → Test Files 1 passed (1) | Tests 90 passed | 1 skipped (91)
```

Observation, not a criterion: `npm run test:src:core` → `Test Files 17 passed (17)`, `Tests 285 passed (285)`, `Duration 1.96s`, taken under the sibling-unit load described in the standing conditions.

`oxlint` first reported four `policy(no-banned-term)` hits on `src/core/types.ts` for `just` in the `@returns` lines I wrote ("The record just held"); those lines were reworded to "The stamped record the registry holds" and "The versioned, content-hashed record the registry holds", and the rerun exits 0.

## Criterion 8 — status

```
 M README.md
 M guides/interpret.md
 M src/core/Interpret.ts
 M src/core/Narrator.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/managers/SubjectManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json` and `package-lock.json` untouched; no vendored file touched; `guides/README.md` untouched.

Diffstat:

```
 README.md                           |  29 +-
 guides/interpret.md                 | 590 +++++++++++++++++++-----------------
 src/core/Interpret.ts               |   4 +-
 src/core/Narrator.ts                |   2 +-
 src/core/constants.ts               |  32 +-
 src/core/errors.ts                  |   3 +-
 src/core/factories.ts               |  53 +++-
 src/core/helpers.ts                 |   4 +-
 src/core/managers/SubjectManager.ts |   2 +-
 src/core/types.ts                   | 304 ++++++++++++++++++-
 src/core/validators.ts              |  19 +-
 tests/guides.test.ts                |  90 +++++-
 12 files changed, 784 insertions(+), 348 deletions(-)
```

## Seed and reader observations

- **A doc-block line wrap that splits a hyphenated compound propagates the split into the guide cell.** Seed line from the baseline worklist:
  `guides/interpret.md function digestValue: guide "Compute a canonical structural digest (FNV-1a, 8-hex-digit) of a pure-JSON value." source "Computes a canonical structural digest of a pure-JSON value — a key-order- stable FNV-1a hash rendered as an 8-hex-digit string."`
  `normalizeSummary` collapses the line break after `key-order-` to one space rather than rejoining the word, so `--to guide` would have written `key-order- stable` into the cell. Fixed here by re-wrapping `digestValue`'s description in `src/core/helpers.ts` so the compound sits on one line. The reader is behaving as its own doc block describes; the report names it so the guide's team can decide whether a hyphen at a wrap point deserves a rule.
- **`computeDrift` reports a pair as drift when neither side carries text**, which is what the seed line `guides/interpret.md NormalizerInterface.normalize: guide absent source absent` means. That is the documented behaviour, and it is what obliged this unit to write a doc block for every call-signature member rather than only for the members whose cells disagreed. No defect; recorded because the worklist's `absent source absent` rows read like a no-op and are not one.
- No reader returned a shape the brief does not describe, no cell was unlocatable after the headers changed, and no residual disagreement survived a doc-block rewrite.

## Ancillary decisions

- **The constants table carries only its own convention sentence.** Ruling 15 says a constants table "adds its own second sentence", but the fleet-wide first sentence speaks of interfaces and type aliases and is false above a constants table. `websocket/guides/websocket.md` and `table/guides/table.md`, both converged, carry the constants sentence alone, and this guide follows them. The guard table carries the fleet sentence followed by the guard sentence, the form `brief/guides/brief.md` carries.
- **A members-only interface's `Shape` cell holds the bare member names with no braces and no `plus`** (`normalize`, `extract`, `clarify`, `format`, `generate`, and the `NarratorInterface` list), matching `agent/guides/agent.md`'s converged `ChannelInterface` and `AuthorityInterface` rows. Braces with nothing in them would name no data member.
- **An unannotated numeric constant's `Shape` is `number`**, not its literal type, matching the converged `websocket` and `table` constants tables. The literal is the fact the description paragraph now carries.
- **The `### Interpret text against an added template` heading sits inside `## Surface`, above the existing fence**, so the paragraph after the fence now reads under it. The paragraph is about that demonstration, and no fence and no section moved.
- **The package's own flagship-fence fixtures stay between the manifest loop and the executed half.** Ruling 13 fixes the drop-in outside this package's constants; the fixtures and the flagship cases are package-owned, so only the shared harness was matched to the pilot.

## Deviations

None. No stop condition fired: every cell the seed had to locate was located, the titled body fit its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, and no residual disagreement survived under the comparator.

Instruments written for this unit live in `/home/user/fleet/interpret/tmp/d7n-interpret-converge/` (`docs2.py`, `members.py`, `guide.py`, `compare.py`, `compare2.py`, `base.md`, `probe.md`), inside the checkout, which git ignores.
