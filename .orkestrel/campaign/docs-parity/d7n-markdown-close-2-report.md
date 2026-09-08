# Report — `d7n-markdown-close-2`

## Items

### Item 1 — Ruling 20, the `### Validators` guard table

```diff
-| Guard                 | Kind     | Signature                                           | Summary                                                                                                                                                                    |
-| --------------------- | -------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `isHeadingNode`       | function | `(node: MarkdownNode) => node is HeadingNode`       | Determines whether a node is a heading block.                                                                                                                              |
-| `isParagraphNode`     | function | `(node: MarkdownNode) => node is ParagraphNode`     | Determines whether a node is a paragraph block.                                                                                                                            |
-| `isListNode`          | function | `(node: MarkdownNode) => node is ListNode`          | Determines whether a node is a list block.                                                                                                                                 |
-| `isTableNode`         | function | `(node: MarkdownNode) => node is TableNode`         | Determines whether a node is a GFM table block.                                                                                                                            |
-| `isCodeBlockNode`     | function | `(node: MarkdownNode) => node is CodeBlockNode`     | Determines whether a node is a fenced code block.                                                                                                                          |
-| `isBlockquoteNode`    | function | `(node: MarkdownNode) => node is BlockquoteNode`    | Determines whether a node is a blockquote block.                                                                                                                           |
-| `isThematicBreakNode` | function | `(node: MarkdownNode) => node is ThematicBreakNode` | Determines whether a node is a thematic break (horizontal rule) block.                                                                                                     |
-| `isTextNode`          | function | `(node: MarkdownNode) => node is TextNode`          | Determines whether a node is a plain text run.                                                                                                                             |
-| `isEmphasisNode`      | function | `(node: MarkdownNode) => node is EmphasisNode`      | Determines whether a node is an emphasis run (`*em*` / `**strong**`).                                                                                                      |
-| `isCodeSpanNode`      | function | `(node: MarkdownNode) => node is CodeSpanNode`      | Determines whether a node is an inline code span.                                                                                                                          |
-| `isLineBreakNode`     | function | `(node: MarkdownNode) => node is LineBreakNode`     | Determines whether a node is a GFM hard line break.                                                                                                                        |
-| `isLinkNode`          | function | `(node: MarkdownNode) => node is LinkNode`          | Determines whether a node is a link.                                                                                                                                       |
-| `isImageNode`         | function | `(node: MarkdownNode) => node is ImageNode`         | Determines whether a node is an image.                                                                                                                                     |
-| `isInlineNode`        | const    | `Guard<InlineNode>`                                 | Determines whether an arbitrary value is a valid `InlineNode` — a text run, emphasis, code span, hard break, link, or image, recursively validated.                        |
-| `isBlockNode`         | const    | `Guard<BlockNode>`                                  | Determines whether an arbitrary value is a valid `BlockNode` — a heading, paragraph, list, table, code block, blockquote, or thematic break, recursively validated.        |
-| `isMarkdownNode`      | const    | `Guard<MarkdownNode>`                               | Determines whether an arbitrary value is a valid `MarkdownNode` — the `MarkdownDocument` root, a `BlockNode`, a `ListItemNode`, or an `InlineNode`, recursively validated. |
-| `isMarkdownDocument`  | const    | `Guard<MarkdownDocument>`                           | Determines whether an arbitrary value is a valid `MarkdownDocument` — the parsed-AST root `parseDocument` returns, recursively validated.                                  |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| Guard                 | Kind     | Shape               | Summary                                                                                                                                                                    |
+| --------------------- | -------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `isHeadingNode`       | function | `HeadingNode`       | Determines whether a node is a heading block.                                                                                                                              |
+| `isParagraphNode`     | function | `ParagraphNode`     | Determines whether a node is a paragraph block.                                                                                                                            |
+| `isListNode`          | function | `ListNode`          | Determines whether a node is a list block.                                                                                                                                 |
+| `isTableNode`         | function | `TableNode`         | Determines whether a node is a GFM table block.                                                                                                                            |
+| `isCodeBlockNode`     | function | `CodeBlockNode`     | Determines whether a node is a fenced code block.                                                                                                                          |
+| `isBlockquoteNode`    | function | `BlockquoteNode`    | Determines whether a node is a blockquote block.                                                                                                                           |
+| `isThematicBreakNode` | function | `ThematicBreakNode` | Determines whether a node is a thematic break (horizontal rule) block.                                                                                                     |
+| `isTextNode`          | function | `TextNode`          | Determines whether a node is a plain text run.                                                                                                                             |
+| `isEmphasisNode`      | function | `EmphasisNode`      | Determines whether a node is an emphasis run (`*em*` / `**strong**`).                                                                                                      |
+| `isCodeSpanNode`      | function | `CodeSpanNode`      | Determines whether a node is an inline code span.                                                                                                                          |
+| `isLineBreakNode`     | function | `LineBreakNode`     | Determines whether a node is a GFM hard line break.                                                                                                                        |
+| `isLinkNode`          | function | `LinkNode`          | Determines whether a node is a link.                                                                                                                                       |
+| `isImageNode`         | function | `ImageNode`         | Determines whether a node is an image.                                                                                                                                     |
+| `isInlineNode`        | const    | `InlineNode`        | Determines whether an arbitrary value is a valid `InlineNode` — a text run, emphasis, code span, hard break, link, or image, recursively validated.                        |
+| `isBlockNode`         | const    | `BlockNode`         | Determines whether an arbitrary value is a valid `BlockNode` — a heading, paragraph, list, table, code block, blockquote, or thematic break, recursively validated.        |
+| `isMarkdownNode`      | const    | `MarkdownNode`      | Determines whether an arbitrary value is a valid `MarkdownNode` — the `MarkdownDocument` root, a `BlockNode`, a `ListItemNode`, or an `InlineNode`, recursively validated. |
+| `isMarkdownDocument`  | const    | `MarkdownDocument`  | Determines whether an arbitrary value is a valid `MarkdownDocument` — the parsed-AST root `parseDocument` returns, recursively validated.                                  |
```

The `Signature` column is gone, replaced with `Shape` holding the type each `value is X` predicate narrows to (read from `src/core/validators.ts`), and the guard sentence from Ruling 20/15 sits between the section's prose and the table.

### Item 2 — Ruling 25, the `### Shapers` constants table

```diff
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+A `Shape` cell holds the constant's declared type.

-| Shaper               | Kind  | Shape                                         | Summary                                                                                                                                                                                                       |
-| -------------------- | ----- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `textShape`          | const | `{ element, value }`                          | Describes the shape of a `TextNode` — a plain-text leaf inline run.                                                                                                                                           |
-| `codeSpanShape`      | const | `{ element, value }`                          | Describes the shape of a `CodeSpanNode` — an inline code span (\`\` \`code\` \`\`).                                                                                                                           |
-| `lineBreakShape`     | const | `{ element }`                                 | Describes the shape of a `LineBreakNode` — a GFM hard line-break leaf.                                                                                                                                        |
-| `codeBlockShape`     | const | `{ element, lang?, code }`                    | Describes the shape of a `CodeBlockNode` — a fenced code block. `lang` is optional (absent when the opening fence carries no info-string).                                                                    |
-| `thematicBreakShape` | const | `{ element }`                                 | Describes the shape of a `ThematicBreakNode` — a horizontal rule. Carries no fields beyond its `element` discriminant.                                                                                        |
-| `tableAlignShape`    | const | `'left' \| 'right' \| 'center'`               | Describes the shape of a `TableAlign` — the per-column GFM table alignment literal. Absence is no member of it, so the shape refuses the `null` a bare `---` delimiter takes in a `TableNode`'s `align` list. |
-| `listItemMatchShape` | const | `{ ordered, start, content, indent, marker }` | Describes the shape of `ListItemMatch` — the parsed parts of a single list-item line the block phase's list detector returns. Fully non-recursive (no nested node fields), so every field shapes directly.    |
+| Shaper               | Kind  | Shape                                                      | Summary                                                                                                                                                                                                       |
+| -------------------- | ----- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `textShape`          | const | `ObjectShape<{ element, value }>`                          | Describes the shape of a `TextNode` — a plain-text leaf inline run.                                                                                                                                           |
+| `codeSpanShape`      | const | `ObjectShape<{ element, value }>`                          | Describes the shape of a `CodeSpanNode` — an inline code span (\`\` \`code\` \`\`).                                                                                                                           |
+| `lineBreakShape`     | const | `ObjectShape<{ element }>`                                 | Describes the shape of a `LineBreakNode` — a GFM hard line-break leaf.                                                                                                                                        |
+| `codeBlockShape`     | const | `ObjectShape<{ element, lang?, code }>`                    | Describes the shape of a `CodeBlockNode` — a fenced code block. `lang` is optional (absent when the opening fence carries no info-string).                                                                    |
+| `thematicBreakShape` | const | `ObjectShape<{ element }>`                                 | Describes the shape of a `ThematicBreakNode` — a horizontal rule. Carries no fields beyond its `element` discriminant.                                                                                        |
+| `tableAlignShape`    | const | `LiteralShape<'left' \| 'right' \| 'center'>`              | Describes the shape of a `TableAlign` — the per-column GFM table alignment literal. Absence is no member of it, so the shape refuses the `null` a bare `---` delimiter takes in a `TableNode`'s `align` list. |
+| `listItemMatchShape` | const | `ObjectShape<{ ordered, start, content, indent, marker }>` | Describes the shape of `ListItemMatch` — the parsed parts of a single list-item line the block phase's list detector returns. Fully non-recursive (no nested node fields), so every field shapes directly.    |
```

Cells now hold each shaper's declared return type read from `src/core/shapers.ts:32,49,66,84,103,123,139` (`objectShape({...})` → `ObjectShape<{ members }>` in bare-member, declaration-order form with `?` on the optional `lang`; `literalShape([...])` → `LiteralShape<'left' | 'right' | 'center'>`), under the constants sentence Ruling 20/25 fixes for a values table (Shapers is a `const`-value table, so it takes the constants sentence, not Ruling 15's interface/alias sentence). No `Summary` cell was touched.

`tests/guides.test.ts` needed no edit: the closure checker's Claim 4 already confirmed the drop-in matches the pilot byte-for-byte outside the constants block.

## Scoped validation

1. `git status --short` → `M guides/markdown.md` (owned file only).
2. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/markdown.md` → no output (exit 1, no empty `Shape` cell).
   `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/markdown.md` → no output.
   `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` → no output (exit 0).
3. `npx oxfmt --config .oxfmtrc.json --check guides/markdown.md tests/guides.test.ts` → `All matched files use the correct format.` exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, no output.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` → `rows read: 1, disagreements found: 0`.
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `git status --short` after both write directions still reads `M guides/markdown.md` only.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` → `Test Files 1 passed (1)`, `Tests 63 passed (63)`, `Duration 1.16s`.

## Shared-file patches

None. Both owned files stayed inside their granted scope; `tests/guides.test.ts` needed no change.

## Deviation report

None. Both `Shape` cells expressed cleanly under Rulings 25, 26, and 28 (the Validators table is a dedicated guard table under Ruling 20/15; the Shapers table is a constants table under Ruling 25), `npm run docs` reported no disagreement, and no gate outside the owned files went red.
