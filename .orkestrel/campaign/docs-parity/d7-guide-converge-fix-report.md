# Report — U2-fix `d7-guide-converge-fix`

Every item landed. One item-1 clause deviated on a physical constraint and is recorded in § Deviation; the fact it carries landed in a form the doc block can hold. All acceptance criteria are green.

## Deviation — item 1's `@returns` text cannot be written as briefed

**Expected.** The brief's item 1: replace `and for code the emitted fence cannot enclose` in the `replaceExample` doc block's `@returns` with `and for code the emitted fence cannot enclose or the doc block cannot hold — a body carrying `*/``.

**Found.** The before-text was present and matched verbatim. The instructed after-text spells `*/` inside a `/** … */` block, which ends that block at the terminator. The file stops parsing there. Written exactly as briefed, `npm run check` reported:

```text
src/core/helpers.ts(2795,5): error TS1443: Module declaration names may only use ' or " quoted strings.
src/core/helpers.ts(2798,2): error TS1109: Expression expected.
src/core/helpers.ts(2802,32): error TS1005: ';' expected.
src/core/helpers.ts(2802,52): error TS1002: Unterminated string literal.
src/core/helpers.ts(2835,1): error TS1128: Declaration or statement expected.
```

The instruction is self-defeating in the exact way its own sentence describes: a doc block cannot hold `*/`, so no doc block can spell the refusal reason literally. The codebase's only device for the terminator inside a block is the split-string trick the `replaceExample` `@example` already uses (`'/**' + … + '/'`), which the R2 ruling on claim 5 refused as a quoting trick the prose must not teach.

**Decided.** The clause names the terminator instead of spelling it, so the fact survives and the block parses. The block now reads `and for code the emitted fence cannot enclose or the doc block cannot hold — a body carrying the doc-comment terminator`. Nothing else about item 1 changed: the guard, the test, and the guide sentence landed as briefed, and `guides/guide.md` spells `*/` literally in both places (items 1 and 2), because Markdown holds it.

**Done vs not done.** Item 1 done, with that one clause's spelling changed. Items 2 to 7 done as briefed.

## Items

### 1 — the `*/` guard

`src/core/helpers.ts:2802`, in `replaceExample`:

```diff
 	if (example.code.includes('```')) return undefined
+	if (example.code.includes('*/')) return undefined
```

`src/core/helpers.ts:2790-2792`, the `@returns`:

```diff
 * @returns The block's raw text with that body replaced, or `undefined` for a text that is no
- * doc block, for a title no `@example` tag carries, and for code the emitted fence cannot enclose
+ * doc block, for a title no `@example` tag carries, and for code the emitted fence cannot
+ * enclose or the doc block cannot hold — a body carrying the doc-comment terminator
```

`tests/src/core/helpers.test.ts:4008-4022`, after `returns undefined for code the emitted fence cannot enclose`: `it('returns undefined for code carrying the comment terminator the block cannot hold', …)` with `code: '/**\n * Walks.\n */'`, `language: 'ts'`, asserting `toBeUndefined()`, under a comment naming why the block cannot hold that body.

`guides/guide.md:630-634`, rewrapped by hand at 97 columns:

```diff
-Every replacer reports a miss the same way. `undefined` means "not replaced", and it covers a
-key that reaches no row, a table carrying no `Summary` column, a title no fence or tag carries, a
-text that is no doc block, a summary carrying no word, and code the emitted three-backtick fence
-cannot enclose. A caller reports the key it could not place instead of writing a file it could not
-read back.
+Every replacer reports a miss the same way. `undefined` means "not replaced", and it covers a key
+that reaches no row, a table carrying no `Summary` column, a title no fence or tag carries, a text
+that is no doc block, a summary carrying no word, and code the emitted three-backtick fence cannot
+enclose or the doc block cannot hold, a body carrying `*/`. A caller reports the key it could not
+place instead of writing a file it could not read back.
```

The `replaceExample` cell did not move: the description paragraph is untouched and the seed reported no disagreement for it.

### 2 — § Tests names the exclusion

`guides/guide.md:815-819`. Line `:814` is unchanged; the reflow starts at `:815`.

```diff
 three-backtick doc-block fence cannot enclose, and a class's constructor-door block stay outside
-it; a case beside the equality one pins that at least one title pairs, so retiring the example half
-reddens the suite. Converge either side with `npm run docs`, never by weakening the case.
+three-backtick doc-block fence cannot enclose, a fence whose body carries the doc-comment
+terminator `*/`, and a class's constructor-door block stay outside it; a case beside the equality
+one pins that at least one title pairs, so retiring the example half reddens the suite. Converge
+either side with `npm run docs`, never by weakening the case.
```

### 3 — `EXPORT_KEYWORDS`'s remark

`src/core/constants.ts:7-9`. The sentence names its members, and the remark is rewrapped at 99 columns because the insertion reflows the paragraph.

```diff
- * One frozen list feeds all three, so a keyword cannot be admitted by one and refused by
- * another. Comment and template payload is excluded before reflection, and
- * `enum` is outside this population rather than forbidden by general package
- * policy.
+ * One frozen list feeds the type, the guard, and the shape, so a keyword cannot be admitted by one
+ * and refused by another. Comment and template payload is excluded before reflection, and `enum`
+ * is outside this population rather than forbidden by general package policy.
```

### 4 — Ruling 7 over the widest cells

Each block keeps the sentences stating what the declaration does and returns, and moves the rest verbatim and in order into an `@remarks` placed after the description and before `@param` (before `@returns` for `SourceInterface.exports`, which takes no parameter). No sentence was deleted; each moved sentence was rewrapped only.

| Declaration | Split point — the last sentence kept | Cell before | Cell after |
| --- | --- | --- | --- |
| `extractExports` (`src/core/helpers.ts:1069-1071`) | "Extracts the module-scope exports declared in one file's source text — the declaration keys `collectKeys` reports, each split back into the keyword and name that built it, deduped by (keyword, name)." | 819 | 199 |
| `extractHidden` (`:1118-1120`) | "Extracts the module-scope declarations lacking the `export` keyword in one file's source text — the mirror image of `extractExports`'s grammar, anchored the same way (column 0, so an indented inner declaration never matches)." | 819 | 225 |
| `extractSourceComments` (`:1828`) | "Extracts every eligible genuine JSDoc block paired with the physical record it documents." | 819 | 89 |
| `SourceInterface.exports` (`src/core/types.ts:264-265`) | "Lists every direct declaration in the selected module keys matching `export (async )?(function*?\|class\|const\|interface\|type) Name`, by (name, keyword)." | 745 | 155 |

Widths are the `Summary` cell's characters, measured on `guides/guide.md` before the change at `1a32bb4` and after `npm run build && npm run docs -- --to guide && npm run format`.

What moved into `@remarks`, by declaration:

- `extractExports`: the grammar the keys match and the generator case; the `extractSourceLines` scanning clause; the population sentence.
- `extractHidden`: the scanned-keyword sentence and the `let`/`var` exclusion; the `extractSourceLines` scanning clause; the `enum` sentence.
- `extractSourceComments`: the opener-eligibility sentence; the returned-once sentence; the aligned-records sentence naming the one walk every doc-block reader goes through.
- `SourceInterface.exports`: the module-key definition; the inventory-key constraints; the comment/template projection clause; the `enum` sentence.

The seed rewrote exactly those four cells (`rows read: 1, disagreements found: 4, written: 4, reported: 0`), and a padding-insensitive comparison against `1a32bb4` reports no other table row's content moved. Each rewritten cell reads as its declaration's first sentences and nothing else.

Observation, not carried further: the column pads to its widest member, so the two tables narrowed rather than reaching the short rows' width. The Helpers table's row width fell from 966 to 792 and its widest cell is now `extractExamples` at 643; the `SourceInterface` table's row width fell from 789 to 551 and its widest cell is now `hidden` at 505. Neither is in this unit's scope.

### 5 — `exists`'s orientation

`src/core/types.ts:347-349`, after the description paragraph and before `@param`, so the compared paragraph is unchanged and the cell does not move:

```diff
  * in the inventory.
  *
+ * @remarks
+ * A directory counts so a guide's link to a directory resolves.
+ *
  * @param relative - The workspace-root-relative path to look up
```

### 6 — the opening paragraph

`guides/guide.md:6-21`. The packaging sentence moved to the end of the paragraph, after the `parseManifest` sentence, and the whole paragraph is rewrapped by hand. Lines now run 91 to 97 columns, with the paragraph's final line at 26. The link to `src/core` stays inside the paragraph, so the `links()` guard's population is unchanged.

```diff
-A guide is a contract, not prose. This package is published through `@orkestrel/guide` and its
-source is [`src/core`](../src/core). `createGuide(markdown)` parses a guide's
-source once (through `@orkestrel/markdown`) into a `GuideInterface` — its `## Surface` identifiers
+A guide is a contract, not prose. `createGuide(markdown)` parses a guide's source once (through
+`@orkestrel/markdown`) into a `GuideInterface` — its `## Surface` identifiers (keyword-tagged),
```

```diff
-`parseManifest` reads a `guides/README.md`'s
-`## By concept` table into the list of `{ concept, spec, source, tests }` entries a suite
-iterates to run this check once per documented concept.
+`parseManifest` reads a `guides/README.md`'s `## By concept` table into the list of
+`{ concept, spec, source, tests }` entries a suite iterates to run this check once per documented
+concept. This package is published through `@orkestrel/guide` and its source is
+[`src/core`](../src/core).
```

### 7 — `Shape` notations

The Types intro at `guides/guide.md:27-28` gains a line; the Types table's `Shape` cells carry an interface's property names and a type alias's value, so the sentence names both rather than property names alone:

```diff
 The manifest/extraction shapes every check is built from, from [`types.ts`](../src/core/types.ts).
+A `Shape` cell lists an interface's property names alone, and a type alias's value.
```

The Shapers intro at `guides/guide.md:157-159` gains a sentence, and its paragraph is rewrapped because the insertion reflows it:

```diff
 [`shapers.ts`](../src/core/shapers.ts) — every documented data type here is
-non-recursive, so each shapes directly.
+[`shapers.ts`](../src/core/shapers.ts) — every documented data type here is non-recursive, so
+each shapes directly. A `Shape` cell lists the shaped object's properties with their types.
```

## Acceptance criteria

### 1 — the guard case red then green

Red, with the test in the tree and the guard absent, `npm run test:src:core`:

```text
 ❯ tests/src/core/helpers.test.ts:4021:43
    4021|   expect(replaceExample(TAGGED, example)).toBeUndefined()

 Test Files  1 failed | 7 passed (8)
      Tests  1 failed | 598 passed (599)
```

Green, with the guard landed, the same command:

```text
 Test Files  8 passed (8)
      Tests  599 passed (599)
```

### 2 — `git diff --stat` lists the owned files and no other

```text
 guides/guide.md                | 209 +++++++++++++++++++++--------------------
 src/core/constants.ts          |   7 +-
 src/core/helpers.ts            |  62 ++++++------
 src/core/types.ts              |  23 +++--
 tests/src/core/helpers.test.ts |  13 +++
 5 files changed, 168 insertions(+), 146 deletions(-)
```

`git status --porcelain` lists the same paths as modified and nothing untracked.

### 3 — `format:check`, `lint:check`, `check`

```text
$ npm run format:check
All matched files use the correct format.
Finished in 2999ms on 81 files using 4 threads.
EXIT=0

$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
EXIT=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT=0
```

### 4 — the suites

```text
$ npm run test:src:core
 Test Files  8 passed (8)
      Tests  599 passed (599)
   Duration  2.73s

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  54 passed (54)
   Duration  2.23s

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.13s
```

`test:src:core` matches the brief's expected 599 passed.

### 5 — the seed round-trips

```text
$ npm run build && npm run docs
rows read: 1, disagreements found: 0
EXIT=0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`npm run docs` prints its summary line unconditionally and printed no drift line; the criterion's "no line printed" reads as that.

### 6 — the report

This file names each item's hunk or split point, gives item 4's split points and its widths before and after, and states no count in prose. Numbers appear only as a measurement reported with the run that produced it, a character width, a line number, or a duration.
