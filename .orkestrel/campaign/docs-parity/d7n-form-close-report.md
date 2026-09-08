# Report — `d7n-form-close`

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Rewrote the twelve `FieldBase`-extending interface rows (`TextField`, `EditorField`, `PasswordField`, `NumberField`, `DateField`, `TimeField`, `DatetimeField`, `ColorField`, `ConfirmField`, `SelectField`, `CheckboxField`, `FileField`) in `guides/form.md`'s "Schema and fields" table to the extended-interface cell (`FieldBase plus { ... }`), reading each declaration in `src/core/types.ts:206-315`. Added Ruling 21's extended-interface sentence to that table's convention sentence. `FormSchema`, `FormGroup`, `FieldBase`, `FieldChoice`, `FieldRule`, `FieldError`, `EvaluationOptions`, and `FormOptions` declare no call-signature members, so their existing bare-brace cells needed no `plus` and were left unchanged. `FormInterface`'s cell already carried `plus` and its call-signature members and was left unchanged.
   ```diff
   -literal with a union's arms escaped as `\|`.
   +literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`,
   +with the members it adds after.
   ...
   -| `TextField`     | interface | `{ control, default?, placeholder? }`                 | ...
   +| `TextField`     | interface | `FieldBase plus { control, default?, placeholder? }`  | ...
   ```
   (and the same for the remaining eleven rows — full diff below).

2. **Member references.** No sites listed; `npm run docs` read `rows read: 1, disagreements found: 0` on the committed tip and again after every subsequent edit, so no `--to guide` re-convergence was needed.

3. **The drop-in's canon (Rulings 13 and 20).** Fixed line 3 of `tests/guides.test.ts` to the pilot's header sentence; line 2 already matched and the `INTERNAL` block already carried the pilot's sentence. Re-diffed the drop-in region from `const root = ` (line 105) through the manifest loop's closing brace (line 326, offset by the package's own 13-line README-fence case that sits before the loop, per the brief) against the pilot's same region: the only difference is the package's own file-scope README-fence case, appended after the pilot's cases and before the manifest loop, exactly as the brief allows.
   ```diff
   -// package's own, and are the only part a sibling package changes.
   +// package's own, as is the executed section that closes the file.
   ```
   Left the package's own paragraph (present lines 5-7, naming the flagship-fence transcription behavior) untouched: the brief's diff and acceptance criterion 3 scope the header check to lines 1-3 and to line 2 alone, and Ruling 21's "sea, markdown" example names only those two packages for that additional strike.

4. **Fence lead-ins (Ruling 21).** Added one lead-in sentence between each of the eight listed headings and their directly following fence: `Open a form, answer it, and settle it` (a titled fence — sentence names what the demonstration builds), `text`, `editor`, `date`, `time`, `datetime`, `color`, `confirm`. Re-scanned the whole file afterward for any other heading immediately followed by a fence line: none found.

5. **Propagation.** `npx oxfmt --write guides/form.md tests/guides.test.ts` ran clean; `npm run docs` read `rows read: 1, disagreements found: 0`; `-- --to guide` and `-- --to source` each read `written: 0`.

## Scoped validation

1. `git status --short` — `M guides/form.md`, `M tests/guides.test.ts` (owned files only).
2. `grep -n '| interface *| \`{[^\`]*:' guides/form.md` — no output. `grep -n '…' guides/form.md` — no output. Every `Shape`-carrying table's convention sentence sits between its heading and the table (verified by direct read at lines 50-53, 79-82, 97-99, 130, 164).
3. Drop-in region diff (`sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts` against `sed -n '105,329p' tests/guides.test.ts`) — only the appended README-fence case. `diff <(sed -n '1,3p' abort/tests/guides.test.ts) <(sed -n '1,3p' tests/guides.test.ts)` — no output (line 2 and line 3 both equal the pilot's).
4. `npx oxfmt --check guides/form.md tests/guides.test.ts` — "All matched files use the correct format." exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — exit 0, no output.
5. `npm run docs` — `rows read: 1, disagreements found: 0` exit 0. `npm run docs -- --to guide` — `rows read: 1, disagreements found: 0, written: 0, reported: 0` exit 0. `npm run docs -- --to source` — the same, `written: 0` exit 0.
6. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 51 passed (51)`, `Duration 660ms`, exit 0. `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, `Duration 785ms`, exit 0.

## Full diff

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 9bad149..9b8bd52 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -1,6 +1,6 @@
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
 //
 // The suite transcribes and executes the flagship fence set from `guides/form.md`. It name-checks
 // and parity-checks the remaining fences but does not run them. Change a flagship fence, change its

diff --git a/guides/form.md b/guides/form.md
index 560d371..33d1b94 100644
--- a/guides/form.md
+++ b/guides/form.md
@@ -25,6 +25,8 @@ the mechanisms the package uses on itself.
 
 ### Open a form, answer it, and settle it
 
+Builds a two-field sign-up form, fills both answers, submits, and awaits the settled result.
+
 ```ts
 import { createForm } from '@orkestrel/form'
 
@@ -49,7 +51,8 @@ worked through in [Controls](#controls).
 
 A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an
 optional member and `plus` introducing its call-signature members, and a type alias's own type
-literal with a union's arms escaped as `\|`.
+literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`,
+with the members it adds after.
 
 | API             | Kind      | Shape                                                                                                                                                                            | Summary                                                                                       |
 | --------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
@@ -59,18 +62,18 @@ literal with a union's arms escaped as `\|`.
 | `FieldBase`     | interface | `{ name, label?, help?, group?, hidden?, disabled?, locked?, rule?, meta? }`                                                                                                     | Declares what every field carries, whatever its control.                                      |
 | `FieldControl`  | type      | `'text' \| 'editor' \| 'password' \| 'number' \| 'date' \| 'time' \| 'datetime' \| 'color' \| 'confirm' \| 'select' \| 'checkbox' \| 'file'`                                     | Names the control a field presents to the person answering it.                                |
 | `FieldChoice`   | interface | `{ value, label, help?, disabled? }`                                                                                                                                             | Represents one option a `select` or `checkbox` field offers.                                  |
-| `TextField`     | interface | `{ control, default?, placeholder? }`                                                                                                                                            | Represents a single line of text.                                                             |
-| `EditorField`   | interface | `{ control, default?, placeholder? }`                                                                                                                                            | Represents text over many lines.                                                              |
-| `PasswordField` | interface | `{ control, mask? }`                                                                                                                                                             | Represents a secret, obscured as it is typed.                                                 |
-| `NumberField`   | interface | `{ control, default?, placeholder? }`                                                                                                                                            | Represents a number.                                                                          |
-| `DateField`     | interface | `{ control, default? }`                                                                                                                                                          | Represents a calendar date, held as the control's own `YYYY-MM-DD` string.                    |
-| `TimeField`     | interface | `{ control, default? }`                                                                                                                                                          | Represents a time of day, held as the control's own `HH:MM` string, with seconds optional.    |
-| `DatetimeField` | interface | `{ control, default? }`                                                                                                                                                          | Represents a date and a time of day together, with no zone, held as the control's own string. |
-| `ColorField`    | interface | `{ control, default? }`                                                                                                                                                          | Represents a color, held as the control's own six-digit `#rrggbb` string.                     |
-| `ConfirmField`  | interface | `{ control, default? }`                                                                                                                                                          | Represents a single on/off box, holding a boolean.                                            |
-| `SelectField`   | interface | `{ control, choices, default?, open? }`                                                                                                                                          | Represents one choice out of a list.                                                          |
-| `CheckboxField` | interface | `{ control, choices, default? }`                                                                                                                                                 | Represents any number of choices out of a list, holding the checked values.                   |
-| `FileField`     | interface | `{ control, accept?, multiple? }`                                                                                                                                                | Represents one or more files, by name.                                                        |
+| `TextField`     | interface | `FieldBase plus { control, default?, placeholder? }`                                                                                                                             | Represents a single line of text.                                                             |
+| `EditorField`   | interface | `FieldBase plus { control, default?, placeholder? }`                                                                                                                             | Represents text over many lines.                                                              |
+| `PasswordField` | interface | `FieldBase plus { control, mask? }`                                                                                                                                              | Represents a secret, obscured as it is typed.                                                 |
+| `NumberField`   | interface | `FieldBase plus { control, default?, placeholder? }`                                                                                                                             | Represents a number.                                                                          |
+| `DateField`     | interface | `FieldBase plus { control, default? }`                                                                                                                                           | Represents a calendar date, held as the control's own `YYYY-MM-DD` string.                    |
+| `TimeField`     | interface | `FieldBase plus { control, default? }`                                                                                                                                           | Represents a time of day, held as the control's own `HH:MM` string, with seconds optional.    |
+| `DatetimeField` | interface | `FieldBase plus { control, default? }`                                                                                                                                           | Represents a date and a time of day together, with no zone, held as the control's own string. |
+| `ColorField`    | interface | `FieldBase plus { control, default? }`                                                                                                                                           | Represents a color, held as the control's own six-digit `#rrggbb` string.                     |
+| `ConfirmField`  | interface | `FieldBase plus { control, default? }`                                                                                                                                           | Represents a single on/off box, holding a boolean.                                            |
+| `SelectField`   | interface | `FieldBase plus { control, choices, default?, open? }`                                                                                                                           | Represents one choice out of a list.                                                          |
+| `CheckboxField` | interface | `FieldBase plus { control, choices, default? }`                                                                                                                                  | Represents any number of choices out of a list, holding the checked values.                   |
+| `FileField`     | interface | `FieldBase plus { control, accept?, multiple? }`                                                                                                                                 | Represents one or more files, by name.                                                        |
 
 ### Answers and rules
 
@@ -263,6 +266,8 @@ exactly what "suggest these, accept anything" means.
 
 ### text
 
+Declares a `TextField` carrying a placeholder and a required-and-email rule.
+
 ```ts
 import type { TextField } from '@orkestrel/form'
 
@@ -277,6 +282,8 @@ const email: TextField = {
 
 ### editor
 
+Declares an `EditorField` bounded by a maximum-length rule.
+
 ```ts
 import type { EditorField } from '@orkestrel/form'
 
@@ -323,6 +330,8 @@ const volume: NumberField = {
 
 ### date
 
+Declares a `DateField` bounded by a minimum and a maximum calendar date.
+
 ```ts
 import type { DateField } from '@orkestrel/form'
 
@@ -336,6 +345,8 @@ const start: DateField = {
 
 ### time
 
+Declares a `TimeField` with a default and a minimum-and-maximum time-of-day rule.
+
 ```ts
 import type { TimeField } from '@orkestrel/form'
 
@@ -350,6 +361,8 @@ const opens: TimeField = {
 
 ### datetime
 
+Declares a `DatetimeField` bounded by a minimum date and time.
+
 ```ts
 import type { DatetimeField } from '@orkestrel/form'
 
@@ -363,6 +376,8 @@ const slot: DatetimeField = {
 
 ### color
 
+Declares a `ColorField` seeded with a default six-digit color.
+
 ```ts
 import type { ColorField } from '@orkestrel/form'
 
@@ -376,6 +391,8 @@ const brand: ColorField = {
 
 ### confirm
 
+Declares a `ConfirmField` a submit refuses to pass until it is required and checked.
+
 ```ts
 import type { ConfirmField } from '@orkestrel/form'
```

## Deviation report

None. No `Shape` cell needed an expression Ruling 12 could not carry, the equality case ran green under the default budget, no gate outside the owned files went red, and `npm run docs` closed at zero disagreements throughout.
