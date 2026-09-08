# Report — `d7n-form-close-2` (form: the closing checker's findings)

## Item 1 — Ruling 26: `createForm` and `isFormError`

```diff
 A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an
 optional member and `plus` introducing its call-signature members, and a type alias's own type
-literal with a union's arms escaped as `\|`. A class row and a function row carry none.
+literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature,
+and a guard row's the type it narrows to. A class row's `Shape` cell holds the interface it
+implements, or its constructor signature where it implements none.

 | API             | Kind      | Shape                                                                                                                                                                         | Summary                                                                                                            |
 | --------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
-| `Form`          | class     |                                                                                                                                                                               | Implements `FormInterface` exactly, over an owned schema, the answers given against it, and the errors they carry. |
+| `Form`          | class     | `FormInterface`                                                                                                                                                               | Implements `FormInterface` exactly, over an owned schema, the answers given against it, and the errors they carry. |
 | `FormInterface` | interface | `{ emitter, schema, values, baseline, errors, touched, disabled, status, valid, dirty, answer } plus field, fill, touch, invalidate, disable, enable, submit, clear, destroy` | Declares the contract a form exposes: the state it holds and the calls that move it.                               |
-| `createForm`    | function  |                                                                                                                                                                               | Opens a form against a schema.                                                                                     |
+| `createForm`    | function  | `(schema: FormSchema, options?: FormOptions) => FormInterface`                                                                                                                | Opens a form against a schema.                                                                                     |
 | `FormOptions`   | interface | `{ on?, error?, values?, messages? }`                                                                                                                                         | Describes how to open a form.                                                                                      |
 | `FormStatus`    | type      | `'editing' \| 'settled' \| 'abandoned'`                                                                                                                                       | Represents where a form sits in its life.                                                                          |
 | `FormResult`    | type      | `Result<FormValues, readonly FieldError[]>`                                                                                                                                   | Reports what a submit answers with: the values, or every error that stopped them.                                  |
 | `FormEventMap`  | type      | `{ fill, validate, disable, enable, submit, clear, abandon }`                                                                                                                 | Lists everything a form announces.                                                                                 |
-| `FormError`     | class     |                                                                                                                                                                               | Represents an error raised by the form domain.                                                                     |
+| `FormError`     | class     | `new (code: FormErrorCode, message: string, context?: JSONRecord) => FormError`                                                                                              | Represents an error raised by the form domain.                                                                     |
 | `FormErrorCode` | type      | `'SCHEMA' \| 'FIELD' \| 'CONTROL' \| 'SETTLED' \| 'ABANDONED'`                                                                                                                | Names the machine-readable code a form error carries.                                                              |
-| `isFormError`   | function  |                                                                                                                                                                               | Determines whether an unknown value is a form error.                                                               |
+| `isFormError`   | function  | `FormError`                                                                                                                                                                   | Determines whether an unknown value is a form error.                                                               |
```

`createForm`'s cell holds its signature read from `src/core/factories.ts:33`
(`export function createForm(schema: FormSchema, options?: FormOptions): FormInterface`).
`isFormError`'s cell holds the type it narrows to, `FormError`, read from its predicate at
`src/core/errors.ts:45` (`input is FormError`).

## Item 2 — Ruling 28: `Form` and `FormError`

Included in the same hunk above. `Form`'s cell holds `FormInterface`, the interface it implements
(`src/core/Form.ts:56`, `export class Form implements FormInterface`). `FormError` implements no
package interface, so its cell holds its constructor signature, read from
`src/core/errors.ts:29` (`constructor(code: FormErrorCode, message: string, context?: JSONRecord)`).
The table's convention sentence gained both the function-row and the class-row sentences from
Rulings 26 and 28, in that order, after the existing `Shape`-idiom sentence.

## Item 3 — Rulings 21 and 22: the second Park-as-Promise fence

```diff
 await parked // { name: 'Ada' }
 ```

+### Abandoning a parked answer
+
+Destroying a form before it settles rejects every parked `answer` with a `FormError` coded
+`ABANDONED`, which the parked task recovers through `isFormError`.
+
 ```ts
 import { createForm, isFormError } from '@orkestrel/form'
```

Chose the heading `### Abandoning a parked answer`, at the same `###` level as the sibling heading
`### Park-as-Promise: \`answer\`` (Ruling 22), naming what the fence demonstrates: destroying a
form before it settles and recovering the rejection through `isFormError`. Added a one-sentence
lead-in per Ruling 21.

## Criteria

1. `git status --short` → `M guides/form.md` (only). No other file touched.
2. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/form.md` → no output
   (exit 1). `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/form.md` → no output (exit 0).
   `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` →
   no output (exit 0); `tests/guides.test.ts` was not edited by this unit.
3. `npx oxfmt --config .oxfmtrc.json --check guides/form.md tests/guides.test.ts` →
   "All matched files use the correct format." (exit 0). `npx oxlint --config .oxlintrc.json
   --deny-warnings tests/guides.test.ts` → exit 0, no output.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` → `rows read: 1, disagreements found: 0`.
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` → `rows read: 1, disagreements found: 0,
   written: 0, reported: 0`. `PATH=/opt/npm11/bin:$PATH npm run docs -- --to source` → `rows read: 1,
   disagreements found: 0, written: 0, reported: 0`. Neither write direction changed the tree
   (`git status --short` unchanged at `M guides/form.md`).
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` → `Test Files 1 passed (1)`, `Tests 51 passed
   (51)`, exit 0.

No deviation. `guides/form.md` was reformatted in place by the required `npx oxfmt --write` pass
(table column widths only); content is unchanged from the hunks shown above.
