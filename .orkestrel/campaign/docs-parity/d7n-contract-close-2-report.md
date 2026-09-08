# Report — `d7n-contract-close-2`

Checkout: `/home/user/fleet/contract`, from tip `c519a4b`. Instruments retained at
`tmp/d7n-contract-close-2/` inside that checkout (`contract.md.diff`, `acceptance.log.txt`).

## Item 1 — Ruling 26, function-row `Shape` cells

Filled every empty `Shape` cell in the JSON table, the `ContractCode` table, the Compilers table,
the Inferers table, and the Reporting table for both function rows (signature as a type literal
read from `src/core/*.ts`) and guard rows (the narrowed type). Each affected table's convention
paragraph gained the sentence "A function row's `Shape` cell holds its signature, and a guard row's
the type it narrows to." Acceptance criterion 2's grep additionally reaches `const` rows sharing
those tables, so each empty constant cell took its declared type (`readonly JSONSchemaType[]`,
`readonly ContractCode[]`, `number` for every numeric cap, and
`` Readonly<Record<'uuid' \| 'email' \| 'uri', RegExp>> `` for `FORMAT_PATTERNS`) under the same
general principle Ruling 18 states for a constants table, without adding a dedicated constants
sentence to a mixed table (mirroring how Ruling 20 withholds the guard sentence from a mixed table).

```diff
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an
-optional member and `plus` introducing its call-signature members, and a type alias's own type
-literal with a union's arms escaped as `\|`.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an
+optional member and `plus` introducing its call-signature members, and a type alias's own type
+literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature, and
+a guard row's the type it narrows to.

-| `isJSONPrimitive`     | function  |                                          | Determines whether a value is a primitive JSON value. |
+| `isJSONPrimitive`     | function  | `JSONPrimitive`                          | Determines whether a value is a primitive JSON value. |
...
-| `parseJSONAs`         | function  |                                          | Parses a JSON string and validates the result against a guard. |
+| `parseJSONAs`         | function  | `<T>(value: string, guard: Guard<T>) => T \| undefined` | Parses a JSON string and validates the result against a guard. |
-| `JSON_SCHEMA_TYPES`   | const     |                                          | Lists the seven standard JSON Schema `type` names, frozen. |
+| `JSON_SCHEMA_TYPES`   | const     | `readonly JSONSchemaType[]`              | Lists the seven standard JSON Schema `type` names, frozen. |
```

Same pattern applied to `isContractError` (guard, `ContractError`), `CONTRACT_CODES` (const,
`readonly ContractCode[]`), `validateShape`/`compileGuard`/`compileParser`/`compileSchema`/
`compileGenerator`/`createContract` (function signatures, generic overloads collapsed to their
typed form, e.g. `` `<S extends ContractShape>(shape: S) => Guard<Infer<S>>` `` for `compileGuard`),
the four Compilers-table constants, every Inferers-table function/const, and every Reporting-table
function/const (`compileAuditor`, `compileReporter`, `buildStringFaults`, `buildNumberFaults`,
`buildArrayFaults`, `selectClosestFaults`, `shapeToKind`, `preview`, `FAULT_LIMIT`,
`PREVIEW_LIMIT`).

## Item 2 — Ruling 28, class-row `Shape` cells

Filled `JSONCloner` → `` `JSONClonerInterface` ``, `SchemaCloner` → `` `SchemaClonerInterface` ``,
`ShapeCloner` → `` `ShapeClonerInterface` `` (each confirmed against its `implements` clause in
`src/core/*.ts`), `ShapeValidator` → `` `ShapeValidatorInterface` ``, and `ContractCompiler` →
`` `ContractCompilerInterface` ``. The Cloners table's convention paragraph gained "A class row's
`Shape` cell holds the interface it implements, or its constructor signature where it implements
none."; the Compilers table's paragraph gained both the class sentence and the function/guard
sentence, since it carries both populations.

```diff
-| `JSONCloner`            | class     |                 | Owns the state of one exact JSON snapshot operation. |
+| `JSONCloner`            | class     | `JSONClonerInterface` | Owns the state of one exact JSON snapshot operation. |
```

## Item 3 — Rulings 21 and 22, fence lead-ins and the sibling heading

- `### Compiling a contract`'s second fence (the undeclared-key audit) took its own heading,
  `### Auditing an undeclared key`, with a lead-in sentence naming what it demonstrates.
- Added a lead-in sentence before each fence the checker flagged with no sentence between it and
  the preceding table or fence: the two fences in the Cloners section (`JSONCloner`/`cloneJSONRecord`
  demonstration, `SchemaCloner` graph-identity demonstration), and the fence directly under the
  `#### ShapeClonerInterface` Methods table.

```diff
+This constructs a `JSONCloner` directly and clones a record through `cloneJSONRecord`, showing
+that each snapshot is independently owned.
+
 ```ts
 import type { JSONClonerInterface } from '@orkestrel/contract'
```

```diff
+### Auditing an undeclared key
+
+This audits a value against a closed object shape, showing that `parse` drops an undeclared key
+that `audit` still reports.
+
 ```ts
 import { createContract, objectShape, stringShape } from '@orkestrel/contract'
```

## Acceptance criteria

1. `git status --short` → ` M guides/contract.md` only.
2. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/contract.md` → no output.
   `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/contract.md` → no output.
   `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` → no output (already byte-identical; `tests/guides.test.ts` was untouched).
3. `npx oxfmt --config .oxfmtrc.json --check guides/contract.md tests/guides.test.ts` → "All matched files use the correct format." exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, no output.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` → `rows read: 1, disagreements found: 0`.
   `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` → `Test Files  1 passed (1)`, `Tests  70 passed (70)`.

No `Summary` cell was moved by hand; `oxfmt --write` only reflowed table-column padding and
paragraph wrapping.

## Scope note

Only `guides/contract.md` changed. `tests/guides.test.ts` already matched the pilot on the checked
lines and needed no edit for this unit's items.
