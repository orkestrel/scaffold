# Report — `d7n-template-converge`

Wall clock: 2026-09-07T15:56:31Z (first command) to 2026-09-07T16:08:53Z (last gate command).

## Criterion 1 — the three cases read red on the unconverged tree

`npm run test:guides` → `Test Files 1 failed (1)` / `Tests 3 failed | 31 passed (34)`.

The equality case, `Template > keeps every compared summary and example equal to its source`, `AssertionError: expected [ …(46) ] to deeply equal []`, its first lines:

```
"guides/template.md type MissingPolicy: guide absent source \"Names how `TemplateInterface#fill` handles an unresolved required placeholder.\"",
"guides/template.md type TemplateFillValues: guide absent source \"Represents the values a `TemplateInterface#fill` / `#validate` call resolves placeholders against.\"",
"guides/template.md type TemplateManagerEventMap: guide absent source \"Declares the push observation surface of a `TemplateManagerInterface` — an id-keyed registry, so `register` / `remove` are the events (never ordered-list `append`/`prepend`).\"",
```

and its last lines:

```
"guides/template.md TemplateManagerInterface.fill: guide absent source absent",
"guides/template.md TemplateManagerInterface.validate: guide absent source absent",
"guides/template.md TemplateManagerInterface.parameters: guide absent source absent",
```

The pin, `pairs at least one example title across the guide and the source`, `AssertionError: expected [ Array(1) ] to deeply equal []`:

```
"guides/template.md pairs: guide [\"Surface\",\"Constants\",\"Errors\",\"Helpers\",\"Shapers\",\"Factories\",\"TemplateInterface\",\"TemplateManagerInterface\"] source []"
```

The README case, `opens the README with the guide tagline`: `AssertionError: expected undefined not to be undefined` at the `expect(pitch).not.toBeUndefined()` guard.

The equality case's 46 lines equal the brief's 47-line worklist minus the `pitch` row, which `findDrift` does not carry: the seed compares the pitch itself, outside the reader.

## Criterion 2 — the headers, the class rows

Header renames, each the only change to its row:

| Table | Before | After |
| --- | --- | --- |
| `### Types` | `Type \| Kind \| Shape` | `Type \| Kind \| Shape \| Summary` |
| `### Factories` | `API \| Kind \| Builds…` | `API \| Kind \| Summary` |
| `#### TemplateInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |
| `#### TemplateManagerInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |

`### Constants`, `### Errors`, `### Helpers`, `### Shapers`, and the entities table already headed `Summary` beside `Kind` alone and were not rebuilt.

`### Entities` → `### Classes`: every row's `Kind` is `class` (`Template`, `TemplateManager`). Neither class is documented under its own H3, so no row was added; both already carry rows in that table.

**Decision, recorded: no `Value` column on `### Constants`.** The literals the old cells carried (`'error'`, `'en-US'`, `['__proto__', 'constructor', 'prototype']`, and the `FILL_PATTERN` source) all sit in the `ts` fence directly under that table, which `tests/guides.test.ts > flagship fences > carries the documented default data (Constants)` executes and asserts. A `Value` column would restate an executed fence, so the literals stay where a test proves them.

### The `Shape` idiom

Stated under the `### Types` table, worded against the rows that remain: "A `Shape` cell holds an interface's members in braces, and a type alias's value."

### The hand rebuild's baseline comparison

The `### Types` table was rebuilt by hand; every other table was edited in place. Rows were split on a pipe not preceded by a backslash. Comparison against `git show HEAD:guides/template.md`, table by table and row by row in position:

```
tables baseline: [(Type,Kind,Shape, 16), (API,Kind,Summary, 4), (API,Kind,Summary, 2), (API,Kind,Summary, 4), (API,Kind,Summary, 1), (API,Kind,Builds…, 2), (API,Kind,Summary, 2), (Method,Returns,Behavior, 4), (Method,Returns,Behavior, 11)]
tables now     : [(Type,Kind,Shape,Summary, 16), (API,Kind,Summary, 4), (API,Kind,Summary, 2), (API,Kind,Summary, 4), (API,Kind,Summary, 1), (API,Kind,Summary, 2), (API,Kind,Summary, 2), (Method,Returns,Summary, 4), (Method,Returns,Summary, 11)]
positional non-Summary cells compared: 108
positional differences: every one a `Shape` cell, listed following; no `Kind`, `Returns`, or first-column cell differs; no table's row count changed
```

The `Shape` cells that changed, all in the one table the brief names:

- Thirteen rows lost only the clause after the em dash, the literal untouched: `MissingPolicy`, `TemplateFillValues`, `TemplateErrorCode`, `TemplatePlaceholder`, `TemplateDefinition`, `TemplateFillOptions`, `TemplateFillContext`, `TemplateTokenResolution`, `TemplateRegisterOptions`, `TemplateValidationResult`, `TemplateOptions`, `TemplateQuery`, `TemplateManagerOptions`.
- Three rows carried prose and no literal, so the literal was supplied to match the stated idiom:
  - `TemplateManagerEventMap`: `` `TemplateManager`'s push observation surface — `register(template)` · `remove(template)` · `clear()`. `` → `` `{ register: [template], remove: [template], clear: [] }` ``
  - `TemplateInterface`: `` The template contract — `id` / `name` / `content` / `placeholders` / catalog metadata + `definition` / `fill` / `validate` / `parameters`. `` → `` `{ id, name, content, placeholders, summary?, description?, category?, tags?, definition, fill, validate, parameters }` ``
  - `TemplateManagerInterface`: `` The registry contract — `emitter` / `count` + `register` / `template` / `templates` / `find` / `has` / `remove` / `clear` / `destroy` / `fill` / `validate` / `parameters`. `` → `` `{ emitter, count, register, template, templates, find, has, remove, clear, destroy, fill, validate, parameters }` ``

Every clause removed from a `Shape` cell is carried by the row's doc block: `MissingPolicy` through `TemplateManagerOptions` by their description paragraphs, `TemplateRegisterOptions`'s `replace` rule by its `@remarks`, and the two interfaces' member lists by the `Shape` cell itself plus the per-member blocks added under criterion 3.

## Criterion 3 — the doc blocks, then `--to guide`

`npm run docs -- --to guide` → `rows read: 1, disagreements found: 47, written: 46, reported: 1`; the one reported line is the titled example pair, refused with `the guide fence owns an example`, which is the seed declining to write an example into a `Summary` cell. Then `npx oxfmt --write guides/template.md`, then `npm run docs` → `rows read: 1, disagreements found: 1` (the example pair alone). A second `--to guide` after the `four` correction described following → `written: 1`.

### Blocks rewritten by hand, and why

| Declaration | File | Why |
| --- | --- | --- |
| `TemplateInterface` | `src/core/types.ts` | The old description read `exact bijection with `Template``, which names a relationship rather than the contract; the member list it lacked moved into `Shape`. Member doc blocks added for `definition`, `fill`, `validate`, `parameters` — the Methods rows read `guide absent source absent` because the interface members carried none. The old block's `@remarks` sentences describing each member moved into those member blocks; the remaining remark states the `Template` bijection. |
| `TemplateManagerInterface` | `src/core/types.ts` | Same: member blocks added for `register`, `template`, `templates`, `find`, `has`, `remove`, `clear`, `destroy`, `fill`, `validate`, `parameters`. Every `@remarks` sentence of the old interface block survives — the `CONFLICT` rule in `register`'s remarks, the batch-`remove` rule in `remove`'s, the teardown rule in `destroy`'s, and the unknown-id split kept on the interface block because it is the axis the members share. |
| `TemplateError` | `src/core/errors.ts` | The guide cell carried the code and the `context` field, which the description lacked; the description now names both. Per Ruling 7 the remark sentence "`context`, when present, carries the offending id / name." was pruned, because the description now repeats it. |
| `createTemplate`, `createTemplateManager` | `src/core/factories.ts` | `Creates a template.` and `Creates a template registry.` were thinner than the cells they replaced, and would have read as one sentence twice. Each now states the contract it returns and the class backing it, distinctly. |
| `Template` | `src/core/templates/Template.ts` | The guide cell carried "Implements `TemplateInterface` exactly", which the block lacked. |
| `TemplateManager` | `src/core/templates/TemplateManager.ts` | The description was one sentence carrying the accessors, the batch overloads, and emitter ownership; per Ruling 7 those moved into `@remarks` (no sentence deleted) and the description gained the class bijection the guide cell carried. |
| `UNSAFE_FIELD_SEGMENTS` | `src/core/constants.ts` | The description carried the all-caps `ANY`, and a description paragraph becomes a `Summary` cell, so the emphasis would have shipped into the guide. |
| `TemplateInterface` (second pass) | `src/core/types.ts` | `the four calls over it` states a count of a set that can grow. Replaced with the members named: `` the `definition`, `fill`, `validate`, and `parameters` calls over it ``. |

No row kept its literal in `Shape` by exception: every `Shape` cell holds the type's literal or its members in braces, as the idiom sentence states.

## Criterion 4 — the titled pair

The pair is `createTemplate`'s `@example` in `src/core/factories.ts` and the `#### Create a template and a registry` fence in `guides/template.md`.

`createTemplate` is the first `create*` the facts block lists, so it is the primary factory. The heading whose first fence demonstrates it is the structural `### Factories`, so Ruling 9 applies: `#### Create a template and a registry` was added directly above that fence, the `### Factories` heading stays, and no fence moved. The heading is worded as the demonstration the fence shows — the fence creates a template and then a seeded registry.

Uniqueness, heading-scoped: `grep -c '^#\+ Create a template and a registry' guides/template.md` → `1`.

Fence body read before titling: the block between `#### Create a template and a registry` and its closing fence carries no three-backtick run and no doc-comment terminator — its only backticks are the ```` ```ts ```` opener and the ```` ``` ```` closer. The `## Surface` fence, which also demonstrates `createTemplate`, was not taken: its heading is `Surface` and inserting a heading directly above that fence would strand the section's opening prose above it, while `### Factories` carries a table and no prose between it and its fence.

The block was titled first, then `--to source` ran last, after `npm run docs` read the summaries at zero disagreements:

```
npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

`written: 1` — the titled example alone, as the brief predicts for a converged tree.

**Observation:** `--to source` carried the guide fence's import line into the doc block, so `createTemplate`'s `@example` now imports through `@orkestrel/template` while every other block in `src/**` imports through `@src/core`. That is what the gate requires — the block equals the fence, and `.claude/rules/documentation.md` § Guide examples fixes the published specifier for a guide fence — so the divergence is the gate's, not a defect. Every other block stays untitled and untouched by the seed.

## Criterion 5 — the tagline, the opening prose, the pitch

The guide's H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

> A named, versionable template layer: `{{name}}` tokens in a `content`
> string, resolved against a values record by a single-pass fill engine, and
> registered and looked up by id through a self-owning `TemplateManager`.

`registered/looked-up` became `registered and looked up`. `README.md` lines 3 to 5 are byte-identical to `guides/template.md` lines 3 to 5 (`diff` reports no difference), so the line breaks match.

The displaced sentences fold into a new opening paragraph after the blockquote in `guides/template.md`, restating none of the tagline's clauses: the `validate` prediction sentence, the prototype-pollution sentence, and the `Source:` / barrel sentences. `(`__proto__` / `constructor` / `prototype`)` became `(`__proto__`, `constructor`, `prototype`)`, because the slashes read as a count-free list better as commas.

The README's opening paragraph keeps the onboarding it alone carries and restates no tagline clause. Before:

> A stateful template registry and filler with typed placeholders — `{{name}}` tokens in a `content` string, resolved against a values record by a single-pass fill engine, and registered and looked up by id through `TemplateManager`. Every fill lookup refuses a prototype-pollution-unsafe field path: any segment in `UNSAFE_FIELD_SEGMENTS` (`__proto__`, `constructor`, `prototype`) is refused before the record is ever read. Part of the `@orkestrel` line.

After:

> Declare a template with the `createTemplate` function, fill it against the values record your caller supplies, and register it in a `TemplateManager` where several templates are looked up by id. Reach for `validate` where you need to know which placeholders a fill would reject before you run it. Part of the `@orkestrel` line.

`npm run test:guides` ran after the README edit and is green (objective lane's M9).

## § Tests

`guides/template.md` § Tests gained a `tests/guides.test.ts` bullet naming the checks descriptively, with no SQ/MQ/EQ/RQ identifier: the `## Surface` ↔ `src/core` bijection, the two interface ↔ class method bijections, and the equality gate — every `Summary` cell against its declaration's description paragraph, the titled `Create a template and a registry` fence against the `@example` block of that title, and the README pitch against the guide's tagline — plus the flagship fences.

## Voice sweep over the prose this unit owns

Patterns swept case-insensitively over `guides/template.md` and `README.md`:

- All-caps emphasis, `(^|[^A-Za-z`/])(ALL|ANY|ONE|NOT|EVERY|LISTED|RAW|FIRST|SEEDS|WITHOUT|NEVER|MUST)([^A-Za-z`]|$)`: no hit remains. The hits that existed sat in the `TemplateManagerInterface` Methods cells (`Look up ONE`, `List ALL`, `Remove LISTED … ONE … ALL`) and in `UNSAFE_FIELD_SEGMENTS`'s cell (`ANY`); each was corrected at its doc block, so `--to guide` carried the correction into the cell.
- Substitution-table terms, `\b(should|simply|easi(ly|er)|easy|just|currently|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|sanity check|dummy|blacklist|whitelist|master|slave|please)\b`: no hit.
- Count words, `\b(one|two|three|four|five|six|seven|eight|nine|ten|both)\b`: every remaining hit is an indefinite determiner in a permitted sense (`one placeholder`, `one table per type`, `one absent id`, `one registered template`). The single count found — `the four calls over it` in `TemplateInterface`'s description — was removed at its doc block and re-propagated.

No rewritten sentence borrows a sibling export's name as its product noun.

## Criterion 6 — the seed

```
npm run docs                    rows read: 1, disagreements found: 0                       exit 0
npm run docs -- --to guide      rows read: 1, disagreements found: 0, written: 0, reported: 0   exit 0
npm run docs -- --to source     rows read: 1, disagreements found: 0, written: 0, reported: 0   exit 0
```

## Criterion 7 — the gates

Scoped to the owned paths `README.md guides/template.md src/core/constants.ts src/core/errors.ts src/core/factories.ts src/core/types.ts src/core/templates/Template.ts src/core/templates/TemplateManager.ts tests/guides.test.ts`:

```
npx oxfmt --check <owned>                                       exit 0  (All matched files use the correct format; 9 files)
npx oxlint --config .oxlintrc.json --deny-warnings <owned>      exit 0  (no diagnostic)
npm run check                                                   exit 0
npm run test:guides       Tests  34 passed (34)                 exit 0
npm run test:policy       Tests  90 passed | 1 skipped (91)     exit 0
```

Observation, not a criterion: `npm run test:src:core` → `Test Files 5 passed (5)` / `Tests 128 passed (128)`, exit 0.

The three cases that read red under criterion 1 are among the 34 passing.

## Criterion 8 — `git status --short`

```
 M README.md
 M guides/template.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/templates/Template.ts
 M src/core/templates/TemplateManager.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, every vendored file, and every `src/**` code line outside a doc block are untouched. No lint control was planted.

## Diffstat

```
 README.md                             |  14 +--
 guides/template.md                    | 175 ++++++++++++++++++----------------
 src/core/constants.ts                 |   4 +-
 src/core/errors.ts                    |   7 +-
 src/core/factories.ts                 |  15 ++-
 src/core/templates/Template.ts        |   2 +-
 src/core/templates/TemplateManager.ts |  11 ++-
 src/core/types.ts                     |  93 ++++++++++++++----
 tests/guides.test.ts                  |  75 ++++++++++++++-
 9 files changed, 270 insertions(+), 126 deletions(-)
```

## Touched files

- `/home/user/fleet/template/guides/template.md` — the tagline reduced to one noun phrase with the displaced sentences folded into new opening prose; the `Types` table rebuilt with a `Summary` column and a `Shape` idiom sentence; `Builds…` and both `Behavior` headers renamed `Summary`; `### Entities` → `### Classes`; `#### Create a template and a registry` added above the Factories fence; the `TemplateManagerInterface` paragraph trimmed to the coded outcomes the cells do not carry; § Tests gained the `tests/guides.test.ts` bullet.
- `/home/user/fleet/template/README.md` — the guide's blockquote added under the H1 and the opening paragraph rewritten as onboarding alone.
- `/home/user/fleet/template/src/core/types.ts` — member doc blocks added to both interfaces; both interface descriptions rewritten; the member `@remarks` sentences relocated from the interface blocks.
- `/home/user/fleet/template/src/core/errors.ts` — `TemplateError`'s description names the code and `context`; the repeated remark sentence pruned.
- `/home/user/fleet/template/src/core/factories.ts` — both factory descriptions rewritten distinctly; `createTemplate`'s `@example` titled and its body written from the guide fence by `--to source`.
- `/home/user/fleet/template/src/core/constants.ts` — the all-caps emphasis removed from `UNSAFE_FIELD_SEGMENTS`'s description.
- `/home/user/fleet/template/src/core/templates/Template.ts` — the class description states the exact `TemplateInterface` implementation.
- `/home/user/fleet/template/src/core/templates/TemplateManager.ts` — the description split per Ruling 7, the accessors and emitter ownership moved to `@remarks`.
- `/home/user/fleet/template/tests/guides.test.ts` — the `findDrift` import, `GUIDE_SPEC`, `README.md` in `ROOT_FILES`, the `own` manifest binding, and the three cases.

## Reader and seed defects met

None. The seed and the `0.0.18` readers behaved as the brief describes: `findDrift` reported a pair with neither side carrying text as drift (the fifteen `guide absent source absent` method rows), `--to guide` reached every `Summary` cell it located and reported only the example pair it correctly declines to write into a cell, `--to source` on the converged tree wrote the titled example alone, and `replaceCell` disturbed no cell outside the written column (the 108-cell positional comparison under criterion 2). No residual disagreement needed a P16 comparator ruling: the run reads `disagreements found: 0` outright.

## Deviations

None. The one ancillary matter decided and recorded: the `### Constants` table takes no `Value` column, because the fence beneath it already carries every literal and a test executes that fence.
