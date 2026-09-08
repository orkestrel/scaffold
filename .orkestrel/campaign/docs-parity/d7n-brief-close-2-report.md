# Report — `d7n-brief-close-2`

## Diff

```diff
diff --git a/guides/brief.md b/guides/brief.md
index fbfa6b1..c61debe 100644
--- a/guides/brief.md
+++ b/guides/brief.md
@@ -309,22 +309,24 @@ over the same values and fails the moment they diverge, and `createBriefContract
 `ContractInterface<Brief>` return type makes the compiler prove `Infer<typeof briefShape>`
 is exactly `Brief`.
 
-| API              | Kind  | Summary                                                                                            |
-| ---------------- | ----- | -------------------------------------------------------------------------------------------------- |
-| `textShape`      | const | Describes a single-line string of any length, including empty — the shape mirror of `isText`.      |
-| `lineShape`      | const | Describes a non-empty single-line string — the shape mirror of `isLine`.                           |
-| `taskShape`      | const | Describes the `Task` shape — closed operation and domain vocabularies plus a non-empty statement.  |
-| `referenceShape` | const | Describes the `Reference` shape — a path and the note that justifies listing it.                   |
-| `manifestShape`  | const | Describes the `Manifest` shape — disjoint reference partitions.                                    |
-| `outcomeShape`   | const | Describes the `Outcome` shape — a one-based rank, the result text, and whether it gates done.      |
-| `givenShape`     | const | Describes the `Given` shape — one categorized context fact.                                        |
-| `exampleShape`   | const | Describes the `Example` shape — one input to output exemplar.                                      |
-| `citationShape`  | const | Describes the `Citation` shape — a name, a locator, and why the source is cited.                   |
-| `gapShape`       | const | Describes the `Gap` shape — an unknown, whether it blocks, and the candidates that would close it. |
-| `riskShape`      | const | Describes the `Risk` shape — a closed severity, the risk, and its mitigation.                      |
-| `outputShape`    | const | Describes the `Output` shape — a closed format plus its optional refinements.                      |
-| `proofShape`     | const | Describes the `Proof` shape — the claim and the command that settles it.                           |
-| `briefShape`     | const | Describes the whole `Brief` shape, section shapes composed.                                        |
+A `Shape` cell holds the constant's declared type.
+
+| API              | Kind  | Shape                                                                                                                                                           | Summary                                                                                            |
+| ---------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
+| `textShape`      | const | `StringShape`                                                                                                                                                   | Describes a single-line string of any length, including empty — the shape mirror of `isText`.      |
+| `lineShape`      | const | `StringShape`                                                                                                                                                   | Describes a non-empty single-line string — the shape mirror of `isLine`.                           |
+| `taskShape`      | const | `ObjectShape<{ operation, domain, statement }>`                                                                                                                 | Describes the `Task` shape — closed operation and domain vocabularies plus a non-empty statement.  |
+| `referenceShape` | const | `ObjectShape<{ path, note }>`                                                                                                                                   | Describes the `Reference` shape — a path and the note that justifies listing it.                   |
+| `manifestShape`  | const | `ObjectShape<{ read, edit, locked, forbidden }>`                                                                                                                | Describes the `Manifest` shape — disjoint reference partitions.                                    |
+| `outcomeShape`   | const | `ObjectShape<{ rank, text, required }>`                                                                                                                         | Describes the `Outcome` shape — a one-based rank, the result text, and whether it gates done.      |
+| `givenShape`     | const | `ObjectShape<{ category, name, value }>`                                                                                                                        | Describes the `Given` shape — one categorized context fact.                                        |
+| `exampleShape`   | const | `ObjectShape<{ input, output, note? }>`                                                                                                                         | Describes the `Example` shape — one input to output exemplar.                                      |
+| `citationShape`  | const | `ObjectShape<{ name, url, note }>`                                                                                                                              | Describes the `Citation` shape — a name, a locator, and why the source is cited.                   |
+| `gapShape`       | const | `ObjectShape<{ field, question, blocking, candidates? }>`                                                                                                       | Describes the `Gap` shape — an unknown, whether it blocks, and the candidates that would close it. |
+| `riskShape`      | const | `ObjectShape<{ severity, text, mitigation }>`                                                                                                                   | Describes the `Risk` shape — a closed severity, the risk, and its mitigation.                      |
+| `outputShape`    | const | `ObjectShape<{ format, sections?, include?, exclude? }>`                                                                                                        | Describes the `Output` shape — a closed format plus its optional refinements.                      |
+| `proofShape`     | const | `ObjectShape<{ text, command }>`                                                                                                                                | Describes the `Proof` shape — the claim and the command that settles it.                           |
+| `briefShape`     | const | `ObjectShape<{ task, authority, manifest, outcomes, rules, invariants, givens, examples, assumptions, citations, gaps, risks, output, proofs, trace?, hash? }>` | Describes the whole `Brief` shape, section shapes composed.                                        |
 
 ```ts
 import {
```

## Criteria

1. `git status --short`

```
 M guides/brief.md
```

2. `grep -c "A \`Shape\` cell holds the constant's declared type." guides/brief.md`

```
2
```

`grep -n '^| API *| Kind *| Shape *| Summary' guides/brief.md`

```
144:| API                      | Kind  | Shape                               | Summary                                                                         |
237:| API               | Kind  | Shape           | Summary                                                                                          |
314:| API              | Kind  | Shape                                                                                                                                                           | Summary                                                                                            |
```

Line 144 is the Constants table, line 237 is the Guards table, line 314 is the Shapers table. Every Shapers row carries a non-empty `Shape` cell.

3. `npx oxfmt --config .oxfmtrc.json --check guides/brief.md`

```
Checking formatting...

All matched files use the correct format.
Finished in 981ms on 1 files using 4 threads.
exit=0
```

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
 Test Files  1 passed (1)
      Tests  39 passed (39)
```
