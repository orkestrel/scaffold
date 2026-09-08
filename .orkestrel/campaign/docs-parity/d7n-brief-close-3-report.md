# Report — `d7n-brief-close-3`

## Item 1 — Ruling 27, guard table convention text

```diff
--- a/guides/brief.md
+++ b/guides/brief.md
@@ -232,7 +232,7 @@ guards the same way with `@orkestrel/interpret`'s published `isInterpretation`,
 doors: the borrowed engine's return and a caller-supplied `interpretation`. A malformed value at
 either door records `INTERPRET_FAILED` instead of throwing out of `compile`.
 
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.
+In a guard table a `Shape` cell holds the type the guard narrows to.
 
 | API               | Kind  | Shape           | Summary                                                                                          |
 | ----------------- | ----- | --------------- | ------------------------------------------------------------------------------------------------ |
```

`tests/guides.test.ts` needed no edit; `git status --short` shows `guides/brief.md` alone.

## Criteria

1. `git status --short`
   ```
    M guides/brief.md
   ```

2. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/brief.md`
   ```
   (no output, exit 1)
   ```
   `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/brief.md`
   ```
   (no output, exit 0)
   ```
   `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)`
   ```
   (no output, exit 0)
   ```

3. `npx oxfmt --config .oxfmtrc.json --check guides/brief.md tests/guides.test.ts`
   ```
   Checking formatting...

   All matched files use the correct format.
   Finished in 837ms on 2 files using 4 threads.
   ```
   exit 0.

   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`
   exit 0 (no output).

4. `PATH=/opt/npm11/bin:$PATH npm run docs`
   ```
   rows read: 1, disagreements found: 0
   ```
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide`
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to source`
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```

5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`
   ```
    RUN  v4.1.11 /home/user/fleet/brief

   ·······································

    Test Files  1 passed (1)
         Tests  39 passed (39)
      Start at  03:06:53
      Duration  971ms (transform 387ms, setup 407ms, import 227ms, tests 180ms, environment 0ms)
   ```
   exit 0.
