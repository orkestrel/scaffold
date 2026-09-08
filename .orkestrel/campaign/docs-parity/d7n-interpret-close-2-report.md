# Report — `d7n-interpret-close-2`

Both observations closed. `npm run docs` reads `rows read: 1, disagreements found: 0`, and both
write directions read `written: 0`.

## Item 1 — the published specifier

Every doc-block `@example` under `src/core/**` importing `from '@src/core'` now imports
`from '@orkestrel/interpret'`. Files touched: `src/core/stages/Formatter.ts`,
`src/core/stages/Extractor.ts`, `src/core/stages/Normalizer.ts`, `src/core/stages/Generator.ts`,
`src/core/stages/Clarifier.ts`, `src/core/validators.ts`, `src/core/helpers.ts`,
`src/core/managers/RecordManager.ts`, `src/core/managers/SubjectManager.ts`,
`src/core/managers/DefinitionManager.ts`, `src/core/managers/TemplateManager.ts`,
`src/core/InterpretContext.ts`, `src/core/parsers.ts`, `src/core/Narrator.ts`,
`src/core/errors.ts`, `src/core/Interpret.ts`. One example hunk (representative):

```diff
  * @example
  * ```ts
- * import { Formatter } from '@src/core'
+ * import { Formatter } from '@orkestrel/interpret'
```

`src/core/factories.ts` and `src/core/types.ts` already carried the published specifier (or none)
and needed no edit for this item.

## Item 2 — the slash pairs in compared cells

`src/core/types.ts`:

```diff
 /**
- * Names how one {@link FieldMapping} / {@link Entity} value was obtained.
+ * Names how one {@link FieldMapping} or {@link Entity} value was obtained.
```

```diff
 /**
- * Names the coded misuse / failure conditions thrown as an {@link InterpretError} or
+ * Names the coded misuse or failure conditions thrown as an {@link InterpretError} or
```

```diff
  * Represents the push observation surface shared by every record registry — an id-keyed
- * collection, so `add` / `remove` are the events (never ordered-list
+ * collection, so `add` and `remove` are the events (never ordered-list
```

Each `/` read as a value's alternatives (`or`) or as a paired set both members of which the
sentence asserts (`and`). No other `/` in `src/core/types.ts` was touched — the brief named these
three cells only, and the closing observation in the fix report scoped the rest to a later
capability.

`npm run docs -- --to guide` then carried the three cells into `guides/interpret.md`
(`rows read: 1, disagreements found: 3, written: 3, reported: 0`), and
`npx oxfmt --config .oxfmtrc.json --write guides/interpret.md src/core` reflowed the guide's
tables.

## Criteria

### 1 — `git status --short` and the non-comment diff

```
git status --short
 M guides/interpret.md
 M src/core/Interpret.ts
 M src/core/InterpretContext.ts
 M src/core/Narrator.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/managers/DefinitionManager.ts
 M src/core/managers/RecordManager.ts
 M src/core/managers/SubjectManager.ts
 M src/core/managers/TemplateManager.ts
 M src/core/parsers.ts
 M src/core/stages/Clarifier.ts
 M src/core/stages/Extractor.ts
 M src/core/stages/Formatter.ts
 M src/core/stages/Generator.ts
 M src/core/stages/Normalizer.ts
 M src/core/types.ts
 M src/core/validators.ts

git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
  (no output)  exit 1
```

Owned files only, and no non-comment line moved in `src`.

### 2 — the mechanical greps

```
grep -rn "from '@src/core'" src/core
  (no output)  exit 1

grep -nE "\`(FieldMapping|add)\` / \`|misuse / failure" guides/interpret.md
  (no output)  exit 1
```

### 3 — format and lint

```
npx oxfmt --config .oxfmtrc.json --check guides/interpret.md src/core
  All matched files use the correct format.
  Finished in 765ms on 21 files using 4 threads.
  exit 0

npx oxlint --config .oxlintrc.json --deny-warnings src/core
  (no output)
  exit 0
```

### 4 — `npm run docs`, both directions

```
npm run docs -- --to guide
  rows read: 1, disagreements found: 0, written: 0, reported: 0

npm run docs -- --to source
  rows read: 1, disagreements found: 0, written: 0, reported: 0

npm run docs
  rows read: 1, disagreements found: 0
```

### 5 — the suite

```
PATH=/opt/npm11/bin:$PATH npm run test:guides
   Test Files  1 passed (1)
        Tests  98 passed (98)
  exit 0
```

## Deviations

None.
