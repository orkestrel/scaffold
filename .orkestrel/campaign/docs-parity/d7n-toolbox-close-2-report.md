# Report — `d7n-toolbox-close-2` (toolbox: the closing checker's findings)

## Item 1 — Ruling 27, the guard table's convention text (`guides/toolbox.md`)

```diff
--- a/guides/toolbox.md
+++ b/guides/toolbox.md
@@ -64,7 +64,7 @@ Concrete `DefinitionStoreInterface` implementations (AGENTS' Stores rule, point-
 
 The total `(value: unknown) => value is T` guards this package applies at its untrusted boundaries — an authored lineage, a frozen agent adapter, the small-model column DSL, and a persisted database definition read back from a store.
 
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.
+In a guard table a `Shape` cell holds the type the guard narrows to.
 
 | API                    | Kind     | Shape                | Summary                                                                                                                                                                                                                                                                                                                                                                                         |
 | ---------------------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
```

The `### Validators` table is toolbox's one dedicated guard table (every row a guard), and it carried the doubled interface-plus-guard sentence Ruling 27 names. `tests/guides.test.ts` needed no edit: it was already byte-identical to the pilot's file outside the package's own constants, so the file appears in owned scope but carries no hunk.

## Acceptance criteria

1. `git status --short`

```
 M guides/toolbox.md
```

Owned files only.

2. Empty-`Shape`-cell sweep, fence sweep, and pilot-diff of `tests/guides.test.ts`'s first three lines:

```
$ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/toolbox.md
(no output, exit 1)

$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/toolbox.md
(no output)

$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no output)
```

3. `npx oxfmt --config .oxfmtrc.json --check guides/toolbox.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`:

```
Checking formatting...

All matched files use the correct format.
Finished in 952ms on 2 files using 4 threads.
oxfmt exit:0
oxlint exit:0
```

4. `PATH=/opt/npm11/bin:$PATH npm run docs`:

```
> @orkestrel/toolbox@0.0.13 docs
> node --experimental-strip-types scripts/docs.ts

rows read: 1, disagreements found: 0
```

Both write directions:

```
$ node --experimental-strip-types scripts/docs.ts --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ node --experimental-strip-types scripts/docs.ts --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`:

```
> @orkestrel/toolbox@0.0.13 test:guides
> vitest run --config vite.config.ts --no-cache --reporter=dot --project guides

 Test Files  1 passed (1)
      Tests  31 passed (31)
   Start at  03:01:22
   Duration  1.14s (transform 389ms, setup 121ms, import 620ms, tests 243ms, environment 0ms)
```

No deviation. `npx oxfmt --config .oxfmtrc.json --write guides/toolbox.md tests/guides.test.ts` ran before the checks and produced no working-tree change beyond the hand-applied edit.
