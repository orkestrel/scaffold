# Report — `d7n-tool-close-2` (tool: the closing checker's findings)

## Item 1 — the `### Validators` table takes `Shape`

```diff
diff --git a/guides/tool.md b/guides/tool.md
index c6439ab..4312596 100644
--- a/guides/tool.md
+++ b/guides/tool.md
@@ -61,11 +61,12 @@ method row.
 
 ### Validators
 
-The call-envelope guard, from [`validators.ts`](../src/core/validators.ts).
+The call-envelope guard, from [`validators.ts`](../src/core/validators.ts). In a guard table a
+`Shape` cell holds the type the guard narrows to.
 
-| Name         | Kind     | Signature                               | Summary                                                                                                              |
-| ------------ | -------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
-| `isToolCall` | function | `(value: unknown) => value is ToolCall` | Determines whether an unknown value is structurally a `ToolCall`, staying total for malformed and adversarial input. |
+| Name         | Kind     | Shape      | Summary                                                                                                              |
+| ------------ | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
+| `isToolCall` | function | `ToolCall` | Determines whether an unknown value is structurally a `ToolCall`, staying total for malformed and adversarial input. |
 
 ### Helpers
```

The `Signature` column is gone. The `Shape` cell holds `ToolCall`, the type `isToolCall`
narrows to (`value is ToolCall` in `src/core/validators.ts:24`). The guard sentence from
Ruling 20 and the pilot's `guides/abort.md:46-48` sits between the section's lead-in sentence
and the table, worded as the pilot's. No other file changed; `tests/guides.test.ts` already
matches the pilot's `abort` drop-in on lines 1-3 and needed no edit.

## Criteria

1. `git status --short`

```
 M guides/tool.md
```

Owned files only.

2. Empty-`Shape` sweep, fence-lead-in sweep, and the drop-in header diff:

```
$ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/tool.md
(no output)
$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/tool.md
(no output)
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no output, exit 0)
```

3. Format and lint:

```
$ npx oxfmt --config .oxfmtrc.json --check guides/tool.md tests/guides.test.ts
Checking formatting...
All matched files use the correct format.
Finished in 664ms on 2 files using 4 threads.
(exit 0)
$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
(exit 0)
```

4. Docs convergence, both directions and the plain read:

```
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0
$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

5. Guide test suite:

```
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  30 passed (30)
   Duration  492ms (transform 136ms, setup 27ms, import 250ms, tests 55ms, environment 0ms)
```
