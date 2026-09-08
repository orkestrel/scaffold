# Report — `d7n-reason-close-2`

## Item 1 — `### Validators` table gains a `Shape` column

Diff (`/home/user/fleet/reason/tmp/d7n-reason-close-2/reason-md.diff.txt`), inserted the guard sentence "In a guard table a `Shape` cell holds the type the guard narrows to." between the section's prose and the table, and added `Shape` between `Kind` and `Summary` on every row, each cell holding the type read from `src/core/validators.ts`'s own `Guard<X>` and `value is X` annotations (`isReasoning: Guard<Reasoning>` → `` `Reasoning` ``, `isCheck(value): value is Check` → `` `Check` ``, … through `isDefinitionBuilder(value): value is DefinitionBuilderInterface` → `` `DefinitionBuilderInterface` `` and `isSubjectBuilder(value): value is SubjectBuilderInterface` → `` `SubjectBuilderInterface` ``):

```diff
-| API                        | Kind     | Summary                                                                                                                                                 |
-| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `isReasoning`              | const    | Determines whether a value is a `Reasoning` literal.                                                                                                    |
...
-| `isSubjectBuilder`         | function | Determines whether a value is a `SubjectBuilder` entity — the brand-guarded stateful workspace, not the plain `Subject` data record.                    |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API                        | Kind     | Shape                              | Summary                                                                                                                                                 |
+| -------------------------- | -------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `isReasoning`              | const    | `Reasoning`                        | Determines whether a value is a `Reasoning` literal.                                                                                                    |
...
+| `isSubjectBuilder`         | function | `SubjectBuilderInterface`          | Determines whether a value is a `SubjectBuilder` entity — the brand-guarded stateful workspace, not the plain `Subject` data record.                    |
```

Full hunk retained at `/home/user/fleet/reason/tmp/d7n-reason-close-2/reason-md.diff.txt`. No `Summary` cell moved by hand; only the new `Shape` cells and the sentence were inserted. `tests/guides.test.ts` is unchanged (already at the pilot's bytes from the earlier closing unit).

## Acceptance criteria

1. `git status --short` (in `/home/user/fleet/reason`):
   ```
    M guides/reason.md
   ```
   Owned files only.

2. Empty-`Shape`-cell sweep, fence sweep, and drop-in header diff:
   ```
   $ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/reason.md
   (no output, exit 1)
   $ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/reason.md
   (no output, exit 0)
   $ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
   (no output, exit 0)
   ```

3. Format and lint:
   ```
   $ npx oxfmt --config .oxfmtrc.json --check guides/reason.md tests/guides.test.ts
   Checking formatting...

   All matched files use the correct format.
   Finished in 1280ms on 2 files using 4 threads.
   (exit 0)
   $ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
   (no output, exit 0)
   ```

4. Docs parity, both directions:
   ```
   $ PATH=/opt/npm11/bin:$PATH npm run docs
   rows read: 1, disagreements found: 0
   $ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   $ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```

5. Guide test:
   ```
   $ PATH=/opt/npm11/bin:$PATH npm run test:guides
    RUN  v4.1.11 /home/user/fleet/reason
    vitest run --config vite.config.ts --no-cache --reporter=dot --project guides
   ·································································································
    Test Files  1 passed (1)
         Tests  97 passed (97)
    Duration  1.56s (transform 577ms, setup 635ms, import 349ms, tests 400ms, environment 0ms)
   ```
