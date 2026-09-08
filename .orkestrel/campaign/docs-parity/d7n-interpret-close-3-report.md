# Report — `d7n-interpret-close-3`

## Diff

```diff
--- a/guides/interpret.md
+++ b/guides/interpret.md
@@ -122,12 +122,12 @@ A `Shape` cell holds an interface's data members as bare names in braces, `?` ma
 | `RecordOptions`              | interface | `{ id? }`                                                                                                                                                | Represents the per-call options for the record a manager's `add` mints.                                                                                                                                                      |
 | `InterpretContextOptions`    | interface | `{ session?, history?, on?, error? }`                                                                                                                    | Represents the options for `createInterpretContext` and the `InterpretContext` constructor.                                                                                                                                  |
 | `InterpretOptions`           | interface | `{ templates?, context?, normalizer?, extractor?, clarifier?, formatter?, generator?, similarity?, floor?, history?, narrator?, on?, error? }`           | Represents the options for `createInterpret` and the `Interpret` constructor.                                                                                                                                                |
-| `NormalizerInterface`        | interface | `normalize`                                                                                                                                              | Represents the `Normalizer` stage contract: raw text in, cleaned text + applied changes out.                                                                                                                                 |
-| `ExtractorInterface`         | interface | `extract`                                                                                                                                                | Represents the `Extractor` stage contract: template-agnostic intent classification + raw number mining.                                                                                                                     |
-| `ClarifierInterface`         | interface | `clarify`                                                                                                                                                | Represents the `Clarifier` stage contract: resolve carry-over, defaults, and computed fields against a set of already-assigned entities, surfacing ambiguities for anything required that stays unresolved.                  |
-| `FormatterInterface`         | interface | `format`                                                                                                                                                 | Represents the `Formatter` stage contract: render the refined natural-language prompt for a matched template.                                                                                                                |
-| `GeneratorInterface`         | interface | `generate`                                                                                                                                               | Represents the `Generator` stage contract: build the final subject/definition pair plus its field audit.                                                                                                                     |
-| `NarratorInterface`          | interface | `phrase, label, line, value, describe, narrate`                                                                                                          | Represents the `Narrator` contract — a stateless, total, lexicon-driven rendering engine for the reverse direction.                                                                                                          |
+| `NormalizerInterface`        | interface | `{} plus normalize`                                                                                                                                      | Represents the `Normalizer` stage contract: raw text in, cleaned text + applied changes out.                                                                                                                                 |
+| `ExtractorInterface`         | interface | `{} plus extract`                                                                                                                                        | Represents the `Extractor` stage contract: template-agnostic intent classification + raw number mining.                                                                                                                     |
+| `ClarifierInterface`         | interface | `{} plus clarify`                                                                                                                                        | Represents the `Clarifier` stage contract: resolve carry-over, defaults, and computed fields against a set of already-assigned entities, surfacing ambiguities for anything required that stays unresolved.                  |
+| `FormatterInterface`         | interface | `{} plus format`                                                                                                                                         | Represents the `Formatter` stage contract: render the refined natural-language prompt for a matched template.                                                                                                                |
+| `GeneratorInterface`         | interface | `{} plus generate`                                                                                                                                       | Represents the `Generator` stage contract: build the final subject/definition pair plus its field audit.                                                                                                                     |
+| `NarratorInterface`          | interface | `{} plus phrase, label, line, value, describe, narrate`                                                                                                  | Represents the `Narrator` contract — a stateless, total, lexicon-driven rendering engine for the reverse direction.                                                                                                          |
 | `TemplateManagerInterface`   | interface | `{ emitter, count } plus has, template, templates, add, remove, destroy`                                                                                 | Represents the template registry — a self-owning, versioned/hashed record-holder with the singular/plural accessor pair and the batch `remove` overloads.                                                                    |
 | `SubjectManagerInterface`    | interface | `{ emitter, count } plus has, subject, subjects, add, remove, destroy`                                                                                   | Represents the subject registry — a self-owning, versioned/hashed record-holder that mints its own record ids (a `Subject` carries none).                                                                                    |
 | `DefinitionManagerInterface` | interface | `{ emitter, count } plus has, definition, definitions, add, remove, destroy`                                                                             | Represents the definition registry — a self-owning, versioned/hashed record-holder.                                                                                                                                          |
@@ -224,7 +224,7 @@ published member conforms, because a foreign engine's return is not this package
 `interpret` return with `isInterpretation` before dereferencing `intent`, `entities`, or
 `ambiguities`. Each row's `Summary` names the posture its guard takes.
 
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.
+In a guard table a `Shape` cell holds the type the guard narrows to.
 
 | API                | Kind     | Shape            | Summary                                                                                                                                            |
 | ------------------ | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
```

(`npx oxfmt --write` realigned the table column widths in the same hunk; the content diff above is unaffected.)

## Acceptance criteria

1. `git status --short`

```
 M guides/interpret.md
```

Only `guides/interpret.md` is listed.

2. Guard sentence and `{} plus` checks

```
$ grep -c 'In a guard table' guides/interpret.md
1
$ grep -B2 'In a guard table' guides/interpret.md | grep -c "an interface's data members"
0
$ grep -c '{} plus ' guides/interpret.md
6
$ grep -nE '^\| `[A-Za-z]+Interface` +\| interface +\| `[a-z][^`{]*` ' guides/interpret.md
(no output)
```

3. `npx oxfmt --config .oxfmtrc.json --check guides/interpret.md`

```
Checking formatting...

All matched files use the correct format.
Finished in 756ms on 1 files using 4 threads.
```

Exit code 0.

4. `npm run docs`

```
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs
rows read: 1, disagreements found: 0
```

5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`

```
 RUN  v4.1.11 /home/user/fleet/interpret

··································································································

 Test Files  1 passed (1)
      Tests  98 passed (98)
   Start at  02:22:15
   Duration  928ms (transform 376ms, setup 375ms, import 233ms, tests 156ms, environment 0ms)
```
