# Report — G1 `d7n-guide-pitch-row`

## Item 1 — the catalog row

```diff
--- a/guides/guide.md
+++ b/guides/guide.md
@@ -573,6 +573,12 @@ guard so a renamed heading fails loudly instead of passing on an empty extractio
   first fence a title reaches is the compared one, and every later fence of that title is outside the
   comparison, whether it sits under the same heading or under a second heading of the same text. A title one side alone carries is outside
   the comparison too, and an untitled `@example` stays EX's presence evidence.
+- **RQ — README pitch equality.** The blockquote under the README's H1 equals the guide's
+  tagline, both read through `createGuide(text).tagline()`. The pair is outside `findDrift`, which
+  compares a guide against its source: the drop-in's README case is the gate, and `npm run docs`
+  reports the pair beside the drift rows and never writes it. Guard: both sides read a defined
+  tagline before the comparison, so a README without a blockquote reddens rather than passing on
+  `undefined`.
 - **FI — Fence-import reality.** Every `import { ... } from 'specifier'` in a `guide.fences()`
   fence of the checked language, for a **self** specifier (this repo's own package name / path
   alias), imports only names that exist in `source.surface()`. `extractFenceImports` parses the
```

## Item 2 — § Tests

```diff
@@ -808,7 +814,7 @@ resolveLink('index.ts', './root.ts') // 'root.ts'
 ## Tests
 
 This repository runs the catalog against itself. Its `tests/guides.test.ts` wires RN, SB, MB, LI,
-TE, NV, FL, EX, FI, SQ, MQ, and EQ. Every `## Surface` and `## Methods` table here heads its
+TE, NV, FL, EX, FI, SQ, MQ, EQ, and RQ. Every `## Surface` and `## Methods` table here heads its
 compared column `Summary`, so `findDrift` reads every row this guide documents and the equality
 case asserts the whole worklist empty; `Kind`, `Shape`, `Signature`, `Value`, and `Returns` are the
 data columns beside it and stay unread. EQ compares a `## Patterns` fence only where an `@example`
```

## Item 3 — README's `## Checks` list

The pitch check was not named there before this edit, so the clause was added:

```diff
--- a/README.md
+++ b/README.md
@@ -122,6 +122,8 @@ declaration.
   doc-block description paragraph, every documented method's cell equals its
   member's, and every titled guide fence equals the `@example` block of that
   title. `findDrift` names both sides of each disagreement.
+- **README pitch equality** — the blockquote under the README's H1 equals the
+  guide's tagline, both read through `createGuide(text).tagline()`.
 
 ## API
```

## Acceptance criteria

1. `git diff --stat` (after `npm run format`):

```
README.md       | 2 ++
guides/guide.md | 8 +++++++-
2 files changed, 9 insertions(+), 1 deletion(-)
```

Lists `guides/guide.md` and `README.md` and no other file.

2. `npx oxfmt --config .oxfmtrc.json --check guides/guide.md README.md`:

```
Checking formatting...

All matched files use the correct format.
Finished in 966ms on 2 files using 4 threads.
```

Exit 0.

3. `npm run build && npm run docs`:

```
✓ built in 943ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts

> @orkestrel/guide@0.0.18 docs
> node --experimental-strip-types scripts/docs.ts

rows read: 1, disagreements found: 0
```

Exit 0, `rows read: 1, disagreements found: 0`.

4. `npm run test:guides`:

```
 Test Files  1 passed (1)
      Tests  54 passed (54)
```

Exit 0.

`npm run test:policy`:

```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

Exit 0.

## Deviation

None. The EQ bullet sat at the named location and every gate read green.
