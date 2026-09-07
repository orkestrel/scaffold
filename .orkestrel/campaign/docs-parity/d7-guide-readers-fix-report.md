# Report — U1-fix `d7-guide-readers-fix`

## Items (diff hunks)

### 1. `guides/guide.md`, EQ row

```diff
-  body and fence language together. The block is a declaration head's own — a `type`, `interface`,
+  body and fence language together. The block is an exported declaration head's own — a `type`, `interface`,
```

### 2. `src/core/helpers.ts`, `extractExamples` doc block

```diff
- * grammar heads, so comment and template payload cannot qualify and the head grammar stays the
- * one every reader here shares. A member key carries a dot and a head key does not, so a
- * member's block belongs to {@link extractExampleMethods} instead. A head carrying several
- * blocks contributes each.
+ * grammar admits at column zero, so comment and template payload cannot qualify and the head
+ * grammar stays the one every reader here shares. A member key carries a dot and a head key
+ * does not, so a member's block belongs to {@link extractExampleMethods} instead. A head
+ * carrying several blocks contributes each.
```

Re-wrapped by hand under 100 columns; `npm run format` does not re-wrap comments.

### 3. `src/core/types.ts`, `examples(name)` overload description

```diff
- * no-argument overload instead, so the overloads split the axis at the
- * declaration head against its members.
+ * no-argument overload instead.
```

### 4. `tests/src/core/helpers.test.ts`, untitled class-head control

```diff
-		expect(extractExamples(source)).toEqual([{ name: 'Widget', code: 'new Widget()' }])
+		expect(extractExamples(source)).toStrictEqual([{ name: 'Widget', code: 'new Widget()' }])
```

### 5. `guides/guide.md`, § The extraction model

```diff
 contribute the first block of a title rather than one block each.
+`collectTitles` reads a module's head blocks before its documented members' blocks, so where a head
+and a member carry one title the head's block answers.
```

## Criteria

1. `git diff --stat`:
   ```
   guides/guide.md                | 4 +++-
   src/core/helpers.ts            | 8 ++++----
   src/core/types.ts              | 3 +--
   tests/src/core/helpers.test.ts | 2 +-
   4 files changed, 9 insertions(+), 8 deletions(-)
   ```
   No other file listed. Each hunk in `guides/guide.md`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/src/core/helpers.test.ts` corresponds to one of the five items (`guides/guide.md` carries two: items 1 and 5).

2. `npm run format:check`:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 3014ms on 81 files using 4 threads.
   ```
   exit 0.

   `npm run lint:check`:
   ```
   (no violations reported)
   ```
   exit 0.

   `npm run check`:
   ```
   > tsc --noEmit --project tsconfig.json && npm run check:src
   > tsc --noEmit -p configs/src/tsconfig.core.json
   ```
   exit 0.

3. `npm run test:src:core`:
   ```
   Test Files  8 passed (8)
        Tests  598 passed (598)
   ```
   exit 0.

   `npm run test:guides`:
   ```
   Test Files  1 passed (1)
        Tests  51 passed (51)
   ```
   exit 0.

   `npm run test:policy`:
   ```
   Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
   ```
   exit 0.

No deviations. All five before-texts were found verbatim and replaced. All gates green.
