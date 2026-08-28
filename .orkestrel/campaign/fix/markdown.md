# Fix dossier: markdown

Verified fix-producing findings for the `markdown` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s10-01 — DRIFT-RESHAPE

1. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:31` rule=`.claude/rules/architecture.md` § Kind purity ("Keep the leaf pair class-free") verdict=CONFIRMED
   wrong: `helpers.ts` imports `createProjection` from `./factories.js`, and `factories.ts:14` imports the `Markdown` implementation class, so the leaf file consumes a class-importing file the rule says "sits above them ... and is never consumed by them".
   repair: Move `createProjection` out of `factories.ts` — it constructs a plain value under an invariant, not an entity, so `shapers.ts` or a new `core/cloners.ts` is its kind file; leave `createMarkdown` and the contract factories in `factories.ts`. Update the two importers (`helpers.ts:31`, and `factories.ts` itself if it still needs it) and the `guides/markdown.md:174` row.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: do not move `createProjection` to `shapers.ts` or `cloners.ts` — the rule's own sentence puts both above the leaves, so the edge survives. Either move `createProjection` into `helpers.ts` (its only consumers are the projection leaves there, and the rule's `createWriteDirectory` precedent permits a `create*` name outside `factories.ts`), or split the class-importing `createMarkdown` into its own file so the leaf never reaches a class.

**Lane DRIFT-RESHAPE/medium:** amend: take only the class-free-destination branch. Either create `core/cloners.ts` (types + constants + EMPTY_PROJECTION only, matching brief/database/form) and rename the export to the cloner form, or fold the builder into `core/helpers.ts` as the pure leaf it is (architecture.md's 'Wrong file, right name → move it', with `createWriteDirectory` as the precedent for a `create*` that builds a plain value). Do not move it to `shapers.ts`. Record that the published symbol moves either way.

## s10-02 — DRIFT

2. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:1580-1584` rule=`.claude/rules/architecture.md` § Kind purity ("they import no implementation class") verdict=CONFIRMED
   wrong: `renderHTML` does `new HTML(markdownToHTML(node)).sanitize(...)`, so `helpers.ts` imports and drives the `HTML` class from `@orkestrel/html` (imported at line 45). A file that constructs a class is not a leaf.
   repair: Move `renderHTML` to a class-driving kind file — `core/compilers.ts` (it compiles a markdown AST to a sanitized HTML string through a class pipeline) — keeping the pure `markdownToHTML` projection in `helpers.ts`. `core/index.ts` star-exports both, so the published surface is unchanged.

### Verification

**Judge (DRIFT/medium):** The banned act is stated flatly and the code performs it: `helpers.ts` imports `HTML` and constructs it. The objective lane's precedent citations are real, and precedent is not an exemption - console and mcp import their OWN module's classes into `helpers.ts`, which is the worse form of the same def

**Lane DRIFT-RESHAPE/medium:** amend: keep `renderHTML` in `helpers.ts` beside `markdownToHTML` and `renderMarkdown`; do not create a `compilers.ts` for a renderer. Close the leaf edge at its cause — add a function-form whole-document sanitizer to `@orkestrel/html` and call it — or scope the rule sentence to a module's own implementation classes, since the enumerated permitted imports already do not cover the `@orkestrel/contract` function imports every fleet `helpers.ts` makes.

**Lane DRIFT/medium:** amend: stands, with the barrel row added — `core/index.ts` must gain `export * from './compilers.js'` as part of the move, since it carries no compilers row today.

## s10-03 — DRIFT

3. package=markdown file=`/home/user/fleet/markdown/src/core/validators.ts:54,71,88,104,121,148,172,194` rule=`.claude/rules/architecture.md` § Kind purity + `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
   wrong: `isWhitespace`, `isEscapable`, `isBlankLine`, `isQuote`, `isFenceClose`, `isFenceWhitespace`, `isThematicBreak`, and `isTableStart` are boolean line predicates over `string`, not `(unknown) => value is T` guards. Architecture states the case directly — "`isVacant` is a predicate rather than a `Guard<T>`, so both stay in `helpers.ts`". `isFenceClose(line, marker)` and `isTableStart(header, delimiter)` take two parameters, which no `Guard<T>` can.
   repair: This is "wrong file, right name → move it": relocate the eight predicates to `core/helpers.ts` and delete their imports from `helpers.ts:32-41`. The move also deletes the `validators.ts` → `helpers.ts` edge at `validators.ts:33` (`splitTableRow`), so the leaf cycle disappears. Leave the node guards (`isHeadingNode` … `isMarkdownDocument`) where they are.

## s10-05 — DRIFT

5. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:884-886` rule=`.claude/rules/documentation.md` § Parity ("Falsify a prose claim the way you falsify a code claim") verdict=CONFIRMED
   wrong: `scanInline`'s `@param depth` states the depth is "incremented by one on every recursive descent through {@link scanLink} / {@link scanEmphasis}". `scanInline` (line 902) delegates to `scanInlineSource`, which calls `locateLink` (1006) and `locateEmphasis` (1020) and recurses into itself (998, 1012, 1026). `scanLink` and `scanEmphasis` have no caller anywhere in `src/` — the engine moved and the docs did not. `guides/markdown.md:240` repeats the same false claim.
   repair: Rewrite the `@param depth` on `scanInline:884-886` and on `scanInlineSource` to name `scanInlineSource`'s own recursion as the descent, and correct `guides/markdown.md:240` to match. Then rule on `scanLink`/`scanEmphasis` separately: they are a second, independently maintained construction site for `link` and `emphasis` nodes (`helpers.ts:757`, `865`) that the engine never uses, and `scanLink` omits the `coalesceText` the engine applies at `helpers.ts:1011`. Either route them through the engine or state in `guides/markdown.md:819-834` that they are standalone leaves whose output is not coalesced.

### Verification

**Judge (DRIFT/high):** The engine's descent path is `scanInlineSource` into itself, and the pair the TSDoc names is unreachable from any src caller, so the sentence at 884-886 is false and ships in the declaration file. The repair's core is right. Two of its edges are not: `scanInlineSource`'s tag is already correct, and

**Lane DRIFT-RESHAPE/high:** amend: correct `@param depth` on `scanInline` and `scanInlineSource` to name `scanInlineSource`'s own recursion, and correct `guides/markdown.md:240`. Do not route `scanLink` / `scanEmphasis` through the engine — record their uncoalesced output at `guides/markdown.md:819-834` instead.

**Lane DRIFT/high:** stands

## s10-06 — DRIFT

6. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:331-333,366-368,637-641,682-686,778-789,1075-1079,1128-1134` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") + `AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts` before implementation") verdict=CONFIRMED
   wrong: Seven public exports declare their return shape inline as an anonymous structural type — `extractHeading` returns `{ level; text; offset } | undefined`, `extractFence` returns `{ marker; lang } | undefined`, `scanCode` returns `{ value; end } | undefined`, `locateLink` returns `{ close; end } | undefined`, `locateEmphasis` returns a four-field object, `collectTable` and `collectList` return `{ node; next }`. `ListItemMatch` in `types.ts:25` shows the package already knows the right shape for exactly this kind of value; these seven did not follow it. A consumer cannot name any of these return types.
   repair: Declare `HeadingMatch`, `FenceMatch`, `CodeSpanMatch`, `LinkBounds`, `EmphasisBounds`, `TableCollection`, and `ListCollection` in `core/types.ts` beside `ListItemMatch`, annotate the seven signatures with them, and add the rows to `guides/markdown.md`'s type table.

## s10-08 — DRIFT-RESHAPE

8. package=markdown file=`/home/user/fleet/markdown/src/core/validators.ts:54,148` rule=`.claude/rules/names.md` § General vocabulary ("Do not alternate ... Name the axis") verdict=CONFIRMED
   wrong: `isWhitespace` (space, tab, newline) and `isFenceWhitespace` (adds `\r`, `\f`, `\v`, and accepts `undefined`) are two different whitespace definitions whose names do not name the axis that separates them. A caller cannot predict which one to use, and the difference is discoverable only by reading both bodies.
   repair: Name the axis in the identifier: `isInlineWhitespace` for the flanking-rule test and `isSpaceCharacter` for the regex-`\s`-equivalent test, or fold the narrow one into the broad one if the flanking rule tolerates `\r`/`\f`/`\v`.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The code facts hold and the defect is real, but not for the reason the finding gives: its rule field is a splice of two bullets that govern synonym alternation and discriminant axes, and one of its supporting claims is refuted by the TSDoc and the guide rows. What survives is narrower - a barrelled

**Lane DRIFT-RESHAPE/medium:** amend: rename `isWhitespace` to `isFlankingWhitespace` — the axis its own TSDoc names — and leave `isFenceWhitespace` as it stands, so both predicates carry their axis and neither name understates its character set. Reject `isSpaceCharacter`. Update the `guides/markdown.md:137` row with the rename.

**Lane INVALID/medium:** drop

## s10-09 — DRIFT

9. package=markdown file=`/home/user/fleet/markdown/src/core/factories.ts:87,106,142,161` and `/home/user/fleet/markdown/src/core/helpers.ts:1596` rule=`.claude/rules/writing.md` § Code tokens, references, and links + `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
   wrong: Published TSDoc — text that ships in `dist/src/core/index.d.ts` and shows in a consumer's editor — cites "AGENTS §14" and "AGENTS §14 parse↔render soundness". `/home/user/scaffold/AGENTS.md` has no numbered sections; its headings are named (`## Design laws`, `## Non-negotiable rules`, and so on). Every one of these pointers resolves to nothing, for this repository's own agents and for consumers who have no `AGENTS.md` at all.
   repair: Delete the citation and keep the claim it decorates. `factories.ts:87` becomes "a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration." Where the rationale matters, name the property rather than the document. Apply the same edit to the `//` header comments at `types.ts:5`, `helpers.ts:66`, `validators.ts:35,355`, and `shapers.ts:10`.

## s10-10 — DRIFT

10. package=markdown file=`/home/user/fleet/markdown/src/core/types.ts:477`, `/home/user/fleet/markdown/src/core/parsers.ts:193`, `/home/user/fleet/markdown/src/core/helpers.ts:2669`, `/home/user/fleet/markdown/src/core/Markdown.ts:178` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: `via` at `types.ts:477` ("Cancellable via the returned stream's own `cancel()`"), `parsers.ts:193` ("into a typed `MarkdownDocument` AST via the block phase"), and `helpers.ts:2669` ("into a `T` via a total catamorphism"); `should` at `Markdown.ts:178` ("other environments should use the reader loop above instead").
    repair: `via` → `through`. `Markdown.ts:178` → "other environments use the reader loop shown earlier". Pattern swept case-insensitively over `/home/user/fleet/markdown/src/**/*.ts` for the full substitution table; no other row matched.

## s10-11 — DRIFT

11. package=markdown file=`/home/user/fleet/markdown/src/core/validators.ts:203,209,216,221,228,232,238,245,249,257,261,269,275,283,287,295,299,311,315,323,327,332,340` and `/home/user/fleet/markdown/src/core/parsers.ts:199,210,227` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable") verdict=CONFIRMED
    wrong: Every node guard in `validators.ts` (`isHeadingNode` through `isImageNode`) carries a description and nothing else — no `@param`, no `@returns`. `isHeadingNode:203`, `isTableNode:232`, and `isLinkNode:327` additionally carry no `@example` while their eleven siblings do, so the same kind of symbol is documented three different ways in one file. In `parsers.ts`, `parseDocument:199`, `parseProvenance:210`, and `parseInline:227` carry `@param`/`@returns` but no `@example`, while `parseBlocks:46` does.
    repair: Give each node guard `@param node - The AST node to test` and `@returns True if the node is a {@link X}; false otherwise` (the boolean-return form `.claude/rules/typescript.md` fixes), and add the three missing `@example` blocks in each file so the file is internally uniform.

## s10-13 — DRIFT

13. package=markdown file=`/home/user/fleet/markdown/src/core/*.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Per the dispatch, the fleet-wide first-sentence form is settled; markdown is mixed at 43 imperative to 20 third-person. Files carrying imperative first sentences: `core/helpers.ts`, `core/validators.ts`, `core/factories.ts`. `core/parsers.ts` and `core/Markdown.ts` are third-person throughout, so the split runs inside the package rather than across it.
    repair: Convert the imperative first sentences in those three files to the `-s` form. Reported compactly per the dispatch; no per-symbol list.

### `@orkestrel/toolbox`

