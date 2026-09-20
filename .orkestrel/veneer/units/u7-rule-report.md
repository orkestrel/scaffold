# Unit U7-rule — report

## Diff

```diff
diff --git a/.claude/rules/architecture.md b/.claude/rules/architecture.md
index 048da7a7..dd254f64 100644
--- a/.claude/rules/architecture.md
+++ b/.claude/rules/architecture.md
@@ -49,7 +49,7 @@ Use only the centralized files an environment needs.
 - Extract local declarations by kind. “Only used here” and “not exported” are not exemptions.
 - Every declaration in a centralized file is exported. Fold away a trivial single-use declaration or export/test it; never leave it hidden.
 - The only permitted non-exported module-scope declarations are in a runtime entrypoint that must be self-contained and cannot import siblings, such as raw source loaded in a worker. Explain that necessity in a comment.
-- A runtime entry—`src/bin/main.ts`, `app/browser/main.ts`, `app/server/main.ts`—is a fixed name, not a centralized kind file. Both the data rule and the function rule reach it, so it declares no module-scope constant and no module-scope function: it imports what it needs and runs. The preceding self-contained exception covers only an entrypoint that cannot import siblings.
+- A runtime entry—`src/bin/main.ts`, `app/browser/main.ts`, `app/server/main.ts`, and a published side-effect entry `src/<environment>/auto.ts` that installs a document-level behaviour when imported—is a fixed name, not a centralized kind file. Both the data rule and the function rule reach it, so it declares no module-scope constant and no module-scope function: it imports what it needs and runs. The preceding self-contained exception covers only an entrypoint that cannot import siblings.
 - Perform a cleanup pass after implementation: no stray implementation-file declarations, non-exported/wrong-kind centralized declarations, prohibited nested declarations, duplicate implementations, compatibility aliases, superfluous wrappers, stale imports/barrel rows, or untested extracted functions.
 
 ## Kind purity
```

## Commands

`npm run test:policy`:

```
Test Files  1 passed (1)
     Tests  110 passed (110)
```

`npm run format:check`:

```
Checking formatting...

All matched files use the correct format.
Finished in 4086ms on 228 files using 16 threads.
```

## Git status

```
 M .claude/rules/architecture.md
```

## Deviations

None.
