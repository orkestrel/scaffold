# Report — `d7n-template-converge-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/template` from `cf8858e`. Wall clock 2026-09-07T20:44:14Z to 2026-09-07T20:52:01Z (7m47s). Every item closed; no deviation.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/template/guides/template.md` | The Ruling 15 convention sentence between `### Types` and its table, the Ruling 12 / 19 `Shape` cells, the Ruling 18 `Shape` column and constants sentence on `### Constants`, the extended titled fence |
| `/home/user/fleet/template/src/core/constants.ts` | Emphasis capitals reworded; `DEFAULT_MISSING_POLICY`, `DEFAULT_LOCALE`, and `UNSAFE_FIELD_SEGMENTS` descriptions name their literals |
| `/home/user/fleet/template/src/core/factories.ts` | `createTemplate`'s titled `@example` carries the extended fence, written by `npm run docs -- --to source` |
| `/home/user/fleet/template/src/core/helpers.ts` | Emphasis capitals reworded in the `resolveSafeField` and `fillTemplate` remarks |
| `/home/user/fleet/template/src/core/templates/Template.ts` | `validate`'s remarks read as a comma list rather than capitalized conjunctions |
| `/home/user/fleet/template/src/core/templates/TemplateManager.ts` | Class remarks reworded; the class `find` block takes the interface block's wording |
| `/home/user/fleet/template/tests/guides.test.ts` | The Factories transcription seeds the same templates the fence seeds and asserts `find` and `has` |

Diffstat:

```text
 guides/template.md                    | 64 ++++++++++++++++++++---------------
 src/core/constants.ts                 | 22 +++++++-----
 src/core/factories.ts                 |  9 ++++-
 src/core/helpers.ts                   |  8 ++---
 src/core/templates/Template.ts        |  2 +-
 src/core/templates/TemplateManager.ts | 10 +++---
 tests/guides.test.ts                  | 12 ++++++-
 7 files changed, 79 insertions(+), 48 deletions(-)
```

## Item P1 — the `Shape` idiom and its placement

The convention sentence moved from under the `### Types` table to between the heading and the table, in Ruling 15's wording:

```diff
 ### Types
+
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.

 | Type                       | Kind      | Shape …
-
-A `Shape` cell holds an interface's members in braces, and a type alias's
-value.
```

The cells Ruling 12 and Ruling 19 move:

```diff
-| `TemplateManagerEventMap`  | type      | `{ register: [template], remove: [template], clear: [] }`
+| `TemplateManagerEventMap`  | type      | `{ register, remove, clear }`
-| `TemplateInterface`        | interface | `{ id, name, content, placeholders, summary?, description?, category?, tags?, definition, fill, validate, parameters }`
+| `TemplateInterface`        | interface | `{ id, name, content, placeholders, summary?, description?, category?, tags? } plus definition, fill, validate, parameters`
-| `TemplateManagerInterface` | interface | `{ emitter, count, register, template, templates, find, has, remove, clear, destroy, fill, validate, parameters }`
+| `TemplateManagerInterface` | interface | `{ emitter, count } plus register, template, templates, find, has, remove, clear, destroy, fill, validate, parameters`
```

Every other row already held bare names with `?` and needs no `plus`, because each of those declarations is data-only; `MissingPolicy`, `TemplateFillValues`, and `TemplateErrorCode` already held their own type literal with `\|` escaping.

The `### Constants` table heads `Shape` with each declared type, under the constants sentence, and the literals stay in the executed fence:

```diff
+A `Shape` cell holds the constant's declared type.
+
-| API                      | Kind  | Summary
+| API                      | Kind  | Shape               | Summary
-| `FILL_PATTERN`           | const | Holds the single-pass …
+| `FILL_PATTERN`           | const | `RegExp`            | Holds the single-pass …
+| `DEFAULT_MISSING_POLICY` | const | `MissingPolicy`     | Holds `'error'`, the default `missing` policy …
+| `DEFAULT_LOCALE`         | const | `'en-US'`           | Holds `'en-US'`, the default `locale` …
+| `UNSAFE_FIELD_SEGMENTS`  | const | `readonly string[]` | Lists the prototype-pollution-unsafe field-path segments `'__proto__'`, `'constructor'`, and `'prototype'` …
```

Each literal a reader needs is named in the declaration's description paragraph in `src/core/constants.ts` and carried into the cell by `npm run docs -- --to guide`. No other table carries an interface or type-alias row: `### Errors` holds a class and a guard, and `### Helpers`, `### Shapers`, `### Factories`, and `### Classes` hold functions and classes.

## Item P2 — all-caps in the blocks

```diff
-* Global-flagged, two-alternative pattern: a match of the FIRST alternative
+* Global-flagged, two-alternative pattern: a match of the first alternative
-* RAW (untrimmed) token text between the braces; every call site trims it
+* untrimmed token text between the braces; every call site trims it
-* resolves `'name'`. The pattern intentionally does NOT wrap the token in
+* resolves `'name'`. The pattern deliberately does not wrap the token in
-* string `path` becomes a single-segment array); if ANY segment appears in
+* string `path` becomes a single-segment array); if any segment appears in
-* lookup is refused and `undefined` is returned WITHOUT ever calling
+* lookup is refused and `undefined` is returned without ever calling
-* back to the token split on `.`); ANY path segment in `UNSAFE_FIELD_SEGMENTS`
+* back to the token split on `.`); any path segment in `UNSAFE_FIELD_SEGMENTS`
-* token but collects EVERY unresolved required token (an undeclared token, or
+* token but collects every unresolved required token (an undeclared token, or
-* only when the value is unresolved AND no `fallback` is declared AND the
+* only when the value is unresolved, no `fallback` is declared, and the
-* overwritten. `options.templates` SEEDS the registry at construction
-* WITHOUT emitting `register` — only calls to `register` after construction
-* emit. The batch `remove(ids)` form removes every present id and returns
+* overwritten. `options.templates` seeds the registry at construction without
+* emitting `register` — only calls to `register` after construction emit.
+* The batch `remove(ids)` form removes every present id and returns
-* Filters registered templates by name / category / tag — every supplied
-* field must match (logical AND).
+* Filters registered templates by `name`, `category`, and `tag` — every
+* supplied field must match.
```

Every fact survives each rewrite. `helpers.ts:143` carried `EVERY` rather than the `WITHOUT` the brief named, and takes the same treatment.

Sweep of every owned block, ruling each hit:

```console
$ grep -nE '\b[A-Z]{3,}\b' src/core/*.ts src/core/templates/*.ts | grep -vE "MISSING|NOTFOUND|INVALID|CONFLICT|JSON|UUID|BCP|UNSAFE_FIELD_SEGMENTS|UPPER_SNAKE_CASE|FILL_PATTERN|DEFAULT_"
(no output)
```

Every excluded hit is a real token: the `TemplateErrorCode` members `MISSING`, `NOTFOUND`, `INVALID`, and `CONFLICT`; the constant identifiers; `JSON`, `UUID`, and `BCP-47`.

## Item P3 — the titled fence

The titled fence keeps its `#### Create a template and a registry` heading and now shows what the `## Surface` fence does not — a registry seeded with several templates, then `find` and `has`:

```diff
 const templates = createTemplateManager({
-	templates: [{ id: 'greeting', name: 'greeting', content: 'Hi {{name}}' }],
+	templates: [
+		{ id: 'greeting', name: 'greeting', content: 'Hi {{name}}', category: 'mail' },
+		{ id: 'farewell', name: 'farewell', content: 'Bye {{name}}', category: 'mail' },
+		{ id: 'alert', name: 'alert', content: 'Alert: {{reason}}', category: 'ops' },
+	],
 })
 templates.fill('greeting', { name: 'Ada' }) // 'Hi Ada'
+templates.find({ category: 'mail' }).map((one) => one.id) // ['greeting', 'farewell']
+templates.has('alert') // true
+templates.has('missing') // false
```

`npm run docs -- --to source` carried the body into `createTemplate`'s `@example Create a template and a registry` block in `src/core/factories.ts`; no line was deleted from either side.

The executed case that pins the fence, `builds a working template and a seeded registry (Factories)`, keeps every assertion it had and gains the new ones:

```diff
 expect(templates.fill('greeting', { name: 'Ada' })).toBe('Hi Ada')
+expect(templates.find({ category: 'mail' }).map((one) => one.id)).toEqual([
+	'greeting',
+	'farewell',
+])
+expect(templates.has('alert')).toBe(true)
+expect(templates.has('missing')).toBe(false)
```

The added assertion binds. Reducing the expected `find` result to `['greeting']` reddens the suite:

```console
$ npm run test:guides
AssertionError: expected [ 'greeting', 'farewell' ] to deeply equal [ 'greeting' ]
 Test Files  1 failed (1)
      Tests  1 failed | 33 passed (34)
```

Restoring the expectation returns the suite to `Tests 34 passed (34)`.

## Item P4 — propagation

`npx oxfmt --write` ran over each written file after each write direction. The convergence sequence and its readings:

```console
$ npm run docs                       # after the doc-block rewrites
guides/template.md const DEFAULT_MISSING_POLICY: guide "…when unspecified." source "Holds `'error'`, the default…"
rows read: 1, disagreements found: 3
$ npm run docs -- --to guide
rows read: 1, disagreements found: 3, written: 3, reported: 0
$ npm run docs                       # after the fence rewrite
guides/template.md Create a template and a registry: guide "…templates.has('missing') // false" source "…templates.fill('greeting', { name: 'Ada' }) // 'Hi Ada'"
rows read: 1, disagreements found: 1
$ npm run docs -- --to source
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

## Acceptance criteria

Criterion 1 — `git status --short` lists owned files only. The instruments sit under the git-ignored `tmp/`.

```console
$ git status --short
 M guides/template.md
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/templates/Template.ts
 M src/core/templates/TemplateManager.ts
 M tests/guides.test.ts
$ git check-ignore -v tmp/d7n-template-converge-fix/apply-guide.py
.gitignore:11:tmp	tmp/d7n-template-converge-fix/apply-guide.py
```

Criterion 2 — format, lint, and typecheck exit 0.

```console
$ npx oxfmt --check guides/template.md src/core/constants.ts src/core/factories.ts src/core/helpers.ts src/core/templates/Template.ts src/core/templates/TemplateManager.ts tests/guides.test.ts
All matched files use the correct format.
Finished in 311ms on 7 files using 4 threads.
exit=0
$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
exit=0
$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
exit=0
```

Criterion 3 — `npm run docs` at zero, both write directions at `written: 0`.

```console
$ npm run docs
rows read: 1, disagreements found: 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

Criterion 4 — the convention sentence's placement and the greps.

```console
$ grep -n -A2 '^### Types$' guides/template.md | head -4
34:### Types
35-
36-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
$ grep -n '| interface *| `{[^`]*:' guides/template.md      # exit 1, no output
$ grep -n 'register: \[' guides/template.md                 # exit 1, no output
$ grep -nE '\b(FIRST|RAW|ANY|WITHOUT)\b' src/core/constants.ts src/core/helpers.ts   # exit 1, no output
```

The `### Constants` table carries its own sentence between the heading and the table: "A `Shape` cell holds the constant's declared type."

Criterion 5 — the guides and policy suites.

```console
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  34 passed (34)
   Duration  581ms (transform 174ms, setup 16ms, import 313ms, tests 117ms, environment 0ms)
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  594ms (transform 180ms, setup 21ms, import 230ms, tests 230ms, environment 0ms)
```

## Ancillary decisions

- The `### Constants` table carries the constants sentence alone, not the fleet interface sentence beside it. The brief reads "under Ruling 12's constants sentence", and the converged packages `browser`, `database`, `table`, and `test` each put that sentence alone above a constants table.
- `FILL_PATTERN`'s description names no literal. Its value is neither an opcode, a status code, a version string, nor a default, which is what Ruling 18 names; the executed fence demonstrates `.source` and the `@remarks` block stays the reference.
- The `## Methods` intro sentence naming the `readonly` data members stays. It states the rule those members follow rather than only listing them, in the form the pilot `abort` and `budget` guides keep.
- The class-level `find` block in `TemplateManager.ts` dropped "(logical AND)" and took the interface block's wording; the parenthetical restated the clause before it.

## Instruments

Under `/home/user/fleet/template/tmp/d7n-template-converge-fix/`: `apply-guide.py` (the guide edits), `fix-constants-columns.py` (the `Shape` and `Kind` cell order its predecessor wrote reversed), `acceptance.log.txt` (the criteria chain), `oxlint.log.txt`, `probe-table.md` (the probe that established oxfmt formats Markdown tables, so a table written ragged aligns on `--write`).

## Deviation state

None. No gate outside the owned files went red, and every `Shape` cell is expressible in Ruling 12's idiom.
