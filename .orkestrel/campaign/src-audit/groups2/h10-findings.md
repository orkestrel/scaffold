# Findings for group h10 (verification round 2)

Packages: markdown, toolbox. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it. Note: scaffold lives at /home/user/scaffold, every other package at /home/user/fleet/<name>.

## s10-01

1. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:31` rule=`.claude/rules/architecture.md` § Kind purity ("Keep the leaf pair class-free") verdict=CONFIRMED
   wrong: `helpers.ts` imports `createProjection` from `./factories.js`, and `factories.ts:14` imports the `Markdown` implementation class, so the leaf file consumes a class-importing file the rule says "sits above them ... and is never consumed by them".
   repair: Move `createProjection` out of `factories.ts` — it constructs a plain value under an invariant, not an entity, so `shapers.ts` or a new `core/cloners.ts` is its kind file; leave `createMarkdown` and the contract factories in `factories.ts`. Update the two importers (`helpers.ts:31`, and `factories.ts` itself if it still needs it) and the `guides/markdown.md:174` row.

## s10-02

2. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:1580-1584` rule=`.claude/rules/architecture.md` § Kind purity ("they import no implementation class") verdict=CONFIRMED
   wrong: `renderHTML` does `new HTML(markdownToHTML(node)).sanitize(...)`, so `helpers.ts` imports and drives the `HTML` class from `@orkestrel/html` (imported at line 45). A file that constructs a class is not a leaf.
   repair: Move `renderHTML` to a class-driving kind file — `core/compilers.ts` (it compiles a markdown AST to a sanitized HTML string through a class pipeline) — keeping the pure `markdownToHTML` projection in `helpers.ts`. `core/index.ts` star-exports both, so the published surface is unchanged.

## s10-03

3. package=markdown file=`/home/user/fleet/markdown/src/core/validators.ts:54,71,88,104,121,148,172,194` rule=`.claude/rules/architecture.md` § Kind purity + `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
   wrong: `isWhitespace`, `isEscapable`, `isBlankLine`, `isQuote`, `isFenceClose`, `isFenceWhitespace`, `isThematicBreak`, and `isTableStart` are boolean line predicates over `string`, not `(unknown) => value is T` guards. Architecture states the case directly — "`isVacant` is a predicate rather than a `Guard<T>`, so both stay in `helpers.ts`". `isFenceClose(line, marker)` and `isTableStart(header, delimiter)` take two parameters, which no `Guard<T>` can.
   repair: This is "wrong file, right name → move it": relocate the eight predicates to `core/helpers.ts` and delete their imports from `helpers.ts:32-41`. The move also deletes the `validators.ts` → `helpers.ts` edge at `validators.ts:33` (`splitTableRow`), so the leaf cycle disappears. Leave the node guards (`isHeadingNode` … `isMarkdownDocument`) where they are.

## s10-04

4. package=markdown file=`/home/user/fleet/markdown/src/core/factories.ts:99,118,135,154,173` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete ... pass-through factories, and wrappers around semantically identical ... declared-dependency primitives") verdict=CONFIRMED
   wrong: `createTextContract`, `createCodeSpanContract`, `createLineBreakContract`, `createCodeBlockContract`, and `createThematicBreakContract` each are exactly `return createContract(<shape>)`. The installed declaration is `createContract<S extends ContractShape>(shape: S): ContractInterface<Infer<S>>` (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:1425`), so the wrapper narrows nothing — a consumer holding the barrelled `textShape` writes `createContract(textShape)` and gets the identical type. The set is also arbitrary: `tableAlignShape` and `listItemMatchShape` get no factory, which `guides/markdown.md:569` records as "compiles five of them".
   repair: Delete all five functions, delete their `guides/markdown.md` rows (173–177 region) and the `@example` blocks that go with them, and change the guide's contract section to show `createContract(textShape)` against the already-public shapes.

## s10-05

5. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:884-886` rule=`.claude/rules/documentation.md` § Parity ("Falsify a prose claim the way you falsify a code claim") verdict=CONFIRMED
   wrong: `scanInline`'s `@param depth` states the depth is "incremented by one on every recursive descent through {@link scanLink} / {@link scanEmphasis}". `scanInline` (line 902) delegates to `scanInlineSource`, which calls `locateLink` (1006) and `locateEmphasis` (1020) and recurses into itself (998, 1012, 1026). `scanLink` and `scanEmphasis` have no caller anywhere in `src/` — the engine moved and the docs did not. `guides/markdown.md:240` repeats the same false claim.
   repair: Rewrite the `@param depth` on `scanInline:884-886` and on `scanInlineSource` to name `scanInlineSource`'s own recursion as the descent, and correct `guides/markdown.md:240` to match. Then rule on `scanLink`/`scanEmphasis` separately: they are a second, independently maintained construction site for `link` and `emphasis` nodes (`helpers.ts:757`, `865`) that the engine never uses, and `scanLink` omits the `coalesceText` the engine applies at `helpers.ts:1011`. Either route them through the engine or state in `guides/markdown.md:819-834` that they are standalone leaves whose output is not coalesced.

## s10-06

6. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:331-333,366-368,637-641,682-686,778-789,1075-1079,1128-1134` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") + `AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts` before implementation") verdict=CONFIRMED
   wrong: Seven public exports declare their return shape inline as an anonymous structural type — `extractHeading` returns `{ level; text; offset } | undefined`, `extractFence` returns `{ marker; lang } | undefined`, `scanCode` returns `{ value; end } | undefined`, `locateLink` returns `{ close; end } | undefined`, `locateEmphasis` returns a four-field object, `collectTable` and `collectList` return `{ node; next }`. `ListItemMatch` in `types.ts:25` shows the package already knows the right shape for exactly this kind of value; these seven did not follow it. A consumer cannot name any of these return types.
   repair: Declare `HeadingMatch`, `FenceMatch`, `CodeSpanMatch`, `LinkBounds`, `EmphasisBounds`, `TableCollection`, and `ListCollection` in `core/types.ts` beside `ListItemMatch`, annotate the seven signatures with them, and add the rows to `guides/markdown.md`'s type table.

## s10-07

7. package=markdown file=`/home/user/fleet/markdown/src/core/helpers.ts:596-598,936-941` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/typescript.md` § Immutability ("Never mutate caller-owned inputs") verdict=CONFIRMED
   wrong: The package collects provenance two ways. `parseProvenance` (`parsers.ts:210`) returns a `MarkdownParseResult` tuple carrying the span map, while `coalesceText`, `scanInlineSource`, `collectTable`, and `collectList` take a mutable `Map<MarkdownNode, MarkdownSpan>` out-parameter and write into the caller's object. Both are public. A consumer reading the barrel meets one concept under two mechanisms and must learn which functions mutate what they are handed.
   repair: Pick the tuple. Have `scanInlineSource`, `collectTable`, and `collectList` return `readonly [nodes, spans]` and let the caller merge, or — if the recorder is genuinely load-bearing for the parse's performance — state in each `@param spans` that the argument is mutated and say in `guides/markdown.md` that the recorder form is the internal-composition path while `parseProvenance` is the consumer path.

## s10-08

8. package=markdown file=`/home/user/fleet/markdown/src/core/validators.ts:54,148` rule=`.claude/rules/names.md` § General vocabulary ("Do not alternate ... Name the axis") verdict=CONFIRMED
   wrong: `isWhitespace` (space, tab, newline) and `isFenceWhitespace` (adds `\r`, `\f`, `\v`, and accepts `undefined`) are two different whitespace definitions whose names do not name the axis that separates them. A caller cannot predict which one to use, and the difference is discoverable only by reading both bodies.
   repair: Name the axis in the identifier: `isInlineWhitespace` for the flanking-rule test and `isSpaceCharacter` for the regex-`\s`-equivalent test, or fold the narrow one into the broad one if the flanking rule tolerates `\r`/`\f`/`\v`.

## s10-09

9. package=markdown file=`/home/user/fleet/markdown/src/core/factories.ts:87,106,142,161` and `/home/user/fleet/markdown/src/core/helpers.ts:1596` rule=`.claude/rules/writing.md` § Code tokens, references, and links + `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
   wrong: Published TSDoc — text that ships in `dist/src/core/index.d.ts` and shows in a consumer's editor — cites "AGENTS §14" and "AGENTS §14 parse↔render soundness". `/home/user/scaffold/AGENTS.md` has no numbered sections; its headings are named (`## Design laws`, `## Non-negotiable rules`, and so on). Every one of these pointers resolves to nothing, for this repository's own agents and for consumers who have no `AGENTS.md` at all.
   repair: Delete the citation and keep the claim it decorates. `factories.ts:87` becomes "a guard, coercing parser, JSON Schema, and seeded generator from one shape declaration." Where the rationale matters, name the property rather than the document. Apply the same edit to the `//` header comments at `types.ts:5`, `helpers.ts:66`, `validators.ts:35,355`, and `shapers.ts:10`.

## s10-10

10. package=markdown file=`/home/user/fleet/markdown/src/core/types.ts:477`, `/home/user/fleet/markdown/src/core/parsers.ts:193`, `/home/user/fleet/markdown/src/core/helpers.ts:2669`, `/home/user/fleet/markdown/src/core/Markdown.ts:178` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: `via` at `types.ts:477` ("Cancellable via the returned stream's own `cancel()`"), `parsers.ts:193` ("into a typed `MarkdownDocument` AST via the block phase"), and `helpers.ts:2669` ("into a `T` via a total catamorphism"); `should` at `Markdown.ts:178` ("other environments should use the reader loop above instead").
    repair: `via` → `through`. `Markdown.ts:178` → "other environments use the reader loop shown earlier". Pattern swept case-insensitively over `/home/user/fleet/markdown/src/**/*.ts` for the full substitution table; no other row matched.

## s10-11

11. package=markdown file=`/home/user/fleet/markdown/src/core/validators.ts:203,209,216,221,228,232,238,245,249,257,261,269,275,283,287,295,299,311,315,323,327,332,340` and `/home/user/fleet/markdown/src/core/parsers.ts:199,210,227` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable") verdict=CONFIRMED
    wrong: Every node guard in `validators.ts` (`isHeadingNode` through `isImageNode`) carries a description and nothing else — no `@param`, no `@returns`. `isHeadingNode:203`, `isTableNode:232`, and `isLinkNode:327` additionally carry no `@example` while their eleven siblings do, so the same kind of symbol is documented three different ways in one file. In `parsers.ts`, `parseDocument:199`, `parseProvenance:210`, and `parseInline:227` carry `@param`/`@returns` but no `@example`, while `parseBlocks:46` does.
    repair: Give each node guard `@param node - The AST node to test` and `@returns True if the node is a {@link X}; false otherwise` (the boolean-return form `.claude/rules/typescript.md` fixes), and add the three missing `@example` blocks in each file so the file is internally uniform.

## s10-12

12. package=markdown file=`/home/user/fleet/markdown/src/core/types.ts:12-19,253-259` rule=`AGENTS.md` § Design laws ("Absence is `undefined` ... Use `null` only when an external format distinguishes it from omission") verdict=EXEMPT
    wrong: `TableAlign` uses `null` in `TableNode.align` for a bare `---` delimiter, which is a sentinel-shaped choice.
    repair: None. The exception is stated in TSDoc at `types.ts:14-18` and again at `253-258` — the positional array needs one entry per column, JSON cannot carry `undefined` in an array, and the bare delimiter is an explicit marker rather than an omission. Recorded, not dropped.

## s10-13

13. package=markdown file=`/home/user/fleet/markdown/src/core/*.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Per the dispatch, the fleet-wide first-sentence form is settled; markdown is mixed at 43 imperative to 20 third-person. Files carrying imperative first sentences: `core/helpers.ts`, `core/validators.ts`, `core/factories.ts`. `core/parsers.ts` and `core/Markdown.ts` are third-person throughout, so the split runs inside the package rather than across it.
    repair: Convert the imperative first sentences in those three files to the `-s` form. Reported compactly per the dispatch; no per-symbol list.

### `@orkestrel/toolbox`

## s10-14

14. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:81,138,317,327,375` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) + `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
    wrong: `isWorkflowLineage`, `isAgentFunction`, `isColumnSpec`, `isColumnKind`, and `isDatabaseDefinition` are all `(value: unknown) => value is T` total guards, and all five sit in `helpers.ts`. The package has no `core/validators.ts` at all. Unlike markdown's line predicates (finding 3), these are the real `Guard<T>` shape, so the kind table places them unambiguously.
    repair: Create `src/core/validators.ts`, move the five guards there, add `export * from './validators.js'` to `src/core/index.ts` between `errors.js` and `shapers.js`, and update the importers (`stores/DatabaseDefinitionStore.ts:7`, `factories.ts:109`, and `helpers.ts` itself for the `isColumnSpec` call at line 383). `isToolboxError` stays in `errors.ts` — the kind table puts error guards there.

## s10-15

15. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:353,361` rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("`*Shape`: `ContractShape` value/JSON-Schema blueprint, **not a function or type**") verdict=CONFIRMED
    wrong: `columnShape(spec: ColumnSpec): ContractShape` and `kindShape(kind: ColumnKind): ContractShape` are functions wearing the `*Shape` suffix the rule reserves for values. The collision is live inside this package: `shapers.ts:387` declares `columnKindShape` and `shapers.ts:392` declares `columnSpecShape` as values, so `columnShape` (function, `helpers.ts`) and `columnSpecShape` (value, `shapers.ts`) sit side by side in the barrel under one suffix carrying two meanings, and `columnShape(spec)` does not return `columnSpecShape`.
    repair: These compile a spec into a shape, so this is "right name, wrong file" inverted — rename and relocate. Move both into a new `src/core/compilers.ts` (the kind file for shape compilers) as `compileColumn(spec: ColumnSpec): ContractShape` and `compileColumnKind(kind: ColumnKind): ContractShape`, update `expandTables:345`, add the barrel row, and update `guides/toolbox.md:84-85`.

## s10-16

16. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:452,458` and `/home/user/fleet/toolbox/src/core/helpers.ts:361,344` rule=`AGENTS.md` § Design laws ("Named discriminants. Name the axis that varies ... never `kind` or `type`") + `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
    wrong: The axis a column varies on is named `Kind` in the type (`ColumnKind`) and `type` in the field (`ColumnSpec = ColumnKind | Readonly<{ type: ColumnKind; optional?: boolean }>`) — both words the design law names as the ones never to use. `helpers.ts:361` then takes a parameter literally called `kind`, and `helpers.ts:344` binds a loop variable `kind` to a value that is a `ColumnSpec`, not a `ColumnKind`, so the misnamed axis has already produced a misleading local.
    repair: Name the axis. Rename `ColumnKind` → `ColumnFormat` and the field `type` → `format`, so `ColumnSpec = ColumnFormat | Readonly<{ format: ColumnFormat; optional?: boolean }>`. Update `types.ts:452,458,466`, `helpers.ts:317-329,353-366`, `shapers.ts:387,392`, `guides/toolbox.md:84-86`, and the corresponding rows in the guide's type table. Fix the `helpers.ts:344` loop variable to `spec` in the same edit.

## s10-17

17. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:409,421,312-314` and `/home/user/fleet/toolbox/src/core/types.ts:449` rule=`.claude/rules/writing.md` § Claims and time ("Write the present tense for what exists") verdict=CONFIRMED
    wrong: Published TSDoc says "the {@link ToolboxErrorCode} the **upcoming** database tool should throw with" (`409`) and "the **upcoming** relation tool" (`421`); the `//` header at `312-314` says "the tool factories land in a later unit"; `types.ts:449` says "config-only, for the **upcoming** database / relation tools". `createDatabaseTool` exists at `factories.ts:1102` and `createRelationTool` at `factories.ts:1339`. The prose describes a tree from two revisions ago.
    repair: Present tense throughout: "the code {@link import('./factories.js').createDatabaseTool} throws with", "the code `createRelationTool` throws with". Delete "the tool factories land in a later unit" from `helpers.ts:313` and "for the upcoming database / relation tools" from `types.ts:449`.

## s10-18

18. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:409-418,421-430` rule=`.claude/rules/documentation.md` § Parity ("Falsify a prose claim the way you falsify a code claim") verdict=CONFIRMED
    wrong: Both first sentences say the function maps a caught error "to the {@link ToolboxErrorCode}". `databaseToolCode` returns `DatabaseErrorCode | undefined` (line 416) and `relationToolCode` returns `RelationErrorCode | undefined` (line 428) — upstream codes from `@orkestrel/database` and `@orkestrel/relation`, not this package's union. The `@returns` tags directly beneath (414, 426) correctly say "the granular `DatabaseErrorCode`", so each function's own TSDoc contradicts itself. `terminalToolCode:305` really does return `ToolboxErrorCode`, which is why the copied sentence went unnoticed.
    repair: Rewrite both first sentences to name the returned type, and rename the two functions to match what they return — `databaseErrorCode` and `relationErrorCode` — leaving `terminalToolCode` as the one that genuinely maps into this package's union. Update `factories.ts:101,107` and the `guides/toolbox.md` rows.

## s10-19

19. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:507-509,552-553` rule=`.claude/rules/documentation.md` § Authority and workflow + `.agents/orchestration.md` § Check the brief before you send it ("Keep the brief's control identifiers inside the brief") verdict=CONFIRMED
    wrong: Published TSDoc on `DatabaseToolOptions` reads "SRC-2 of the 3-unit database / relation spine, built over the SRC-1 foundation", and `RelationToolOptions` reads "SRC-3 (the final unit) of the 3-unit database / relation spine". `SRC-1`, `SRC-2`, and `SRC-3` are campaign unit identifiers. They ship in `dist/src/core/index.d.ts` to consumers who have never seen the campaign, and they also state a count ("3-unit") that `AGENTS.md` § Writing forbids.
    repair: Delete both clauses. `DatabaseToolOptions` opens "Options for `createDatabaseTool` — the live handles, definition store, driver registry, key generator, row cap, timeout, and readonly gate the tool composes." `RelationToolOptions` opens "Options for `createRelationTool`."

## s10-20

20. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:215,363` and `/home/user/fleet/toolbox/src/server/types.ts:7` rule=`AGENTS.md` § Writing ("**NEVER state a count.** ... Delete a count you find. Do not correct it.") verdict=CONFIRMED
    wrong: "a FLAT, descriptive tagged union over the **13** workspace edit / read / navigation actions" (`types.ts:215`); "The **seven-value** machine-readable code a thrown `ToolboxError` carries" (`types.ts:363`); "the exact **7-literal** union `@orkestrel/router`'s `Method` accepts" (`server/types.ts:7`). All three tally sets that grow, and all three ship in the published declaration files.
    repair: Delete each count rather than correcting it. "a FLAT, descriptive tagged union over the workspace edit, read, and navigation actions"; "The machine-readable code a thrown `ToolboxError` carries"; "The HTTP method literal a {@link TerminalRoute} declares — the same union `@orkestrel/router`'s `Method` accepts."

## s10-21

21. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:55,71,167,305,416,428` rule=`.claude/rules/names.md` § Standalone helpers ("Module helpers ... default to `{verb}{Noun}`") verdict=CONFIRMED
    wrong: `workflowTag`, `agentTag`, `workflowToolSummary`, `terminalToolCode`, `databaseToolCode`, and `relationToolCode` are all noun phrases with no verb, so a reader cannot tell a helper call from a property read at the call site. The rule's one-word escape hatch ("valid only when its meaning and arguments are unmistakable: `delay`, `clamp`") does not cover a two- or three-word noun phrase.
    repair: `workflowTag` → `tagWorkflow`; `agentTag` → `tagAgent`; `workflowToolSummary` → `summarizeWorkflow`; `terminalToolCode` → `inferTerminalCode` (`infer*` is the project's derivation prefix). Combine with finding 18 for the other two. Update `factories.ts:94,101,107,108,110,111` and `guides/toolbox.md`.

## s10-22

22. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:102,511,545` rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("`*Of`: builder combining constituent parts into a container/guard/value") verdict=CONFIRMED
    wrong: The `*Of` form is fixed to a builder over constituent parts, like `arrayOf(guard)` or `boundsOf(min, max)`. `lineageOf(lineage)` takes a lineage and returns a validated frozen copy — a normalizer that throws. `relationManagerOf(managers, name)` and `relationModelOf(manager, name)` are registry lookups that throw on a miss. None of the three combines parts into a value. `queryOf:570` is the one legitimate use in the file, which makes the other three read as the same operation when they are not.
    repair: `lineageOf` → `normalizeLineage`; `relationManagerOf` → `resolveManager`; `relationModelOf` → `resolveModel`. Update `helpers.ts:117,127`, `factories.ts:99,105,106`, and the guide rows.

## s10-23

23. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:570-586,626-632` rule=`.claude/rules/typescript.md` § Types + `AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`") verdict=CONFIRMED
    wrong: `queryOf`'s single parameter is a 15-line anonymous structural type declared inline in the signature, and `clampQuery` returns an inline `Readonly<{ query: QueryInput; limit: number }>`. Both are barrelled public exports whose input and output types a consumer cannot name, import, or build a value against.
    repair: Declare `DatabaseQueryInput` (the serialized wire query) and `ClampedQuery` in `src/core/types.ts`, annotate both signatures with them, and add the rows to `guides/toolbox.md`'s type table.

## s10-24

24. package=toolbox file=`/home/user/fleet/toolbox/src/server/routes/` rule=`.claude/rules/architecture.md` § Kind or folder ("A word is either a centralized kind or a domain folder, never both. A folder named for a centralized kind ... is that kind's file, not a folder.") verdict=CONFIRMED
    wrong: `routes` is a centralized kind in the placement table ("Route tables → `*/routes.ts`"). `src/server/routes/` is a folder, and it holds two entity classes — `TerminalRoutes.ts` and `TerminalConnection.ts` — neither of which is a route table. The kind word is doing double duty exactly as the rule forbids.
    repair: Rename the folder to a domain folder: `src/server/terminals/`, holding `TerminalRoutes.ts` and `TerminalConnection.ts`. Update `server/index.ts:4`, `server/factories.ts:3`, `TerminalRoutes.ts:18`, the test paths that mirror it, and the `guides/toolbox.md` source links.

## s10-25

25. package=toolbox file=`/home/user/fleet/toolbox/src/server/types.ts:66` and `/home/user/fleet/toolbox/src/server/routes/TerminalRoutes.ts:30` rule=`.claude/rules/names.md` § Type-level identifiers ("Never pluralize type names") verdict=CONFIRMED
    wrong: `TerminalRoutesOptions` carries a pluralized entity (`TerminalRoutes`) inside a type name. The class `TerminalRoutes` is a plural entity name whose singular sibling `TerminalRoute` is a different concept in the same barrel, so the two names differ only by one letter while naming an owner and a record.
    repair: Rename the class to what it is — a route builder over one terminal manager. `TerminalRouteBuilder` with `TerminalRouteOptions`, or fold the class away entirely under finding 26. Either way the plural disappears from the type name.

## s10-26

26. package=toolbox file=`/home/user/fleet/toolbox/src/server/types.ts:8` rule=`.claude/rules/names.md` § Type-level identifiers (`Union/enum-like → {Entity}{Noun}`) verdict=CONFIRMED
    wrong: `export type Method = 'GET' | 'POST' | ...` is a bare, entity-less type name published from `@orkestrel/toolbox/server`. A consumer importing the barrel receives a top-level `Method` that collides with every other package's method union and names no owning entity. (`@orkestrel/router` is not a declared dependency — `package.json:85-95` — so the local declaration itself is correct; only its name is not.)
    repair: Rename to `TerminalRouteMethod` and update `server/types.ts:25`, the guide's type table, and any consumer import.

## s10-27

27. package=toolbox file=`/home/user/fleet/toolbox/src/server/routes/TerminalConnection.ts:44-52` and `/home/user/fleet/toolbox/src/core/databases/DatabaseResolver.ts:32-37` rule=`.claude/rules/patterns.md` § Options ("Group related settings beneath the configured entity noun") + `.claude/rules/names.md` § Split instead of compounding verdict=CONFIRMED
    wrong: `TerminalConnection`'s constructor takes seven positional parameters — `manager`, `name`, `request`, `stream`, `accepts`, `timer`, `keepalive` — of which the last three are configuration rather than subject. `DatabaseResolver`'s takes four with two optional, and the package's own guide proves the cost: `guides/toolbox.md:265` must write `new DatabaseResolver(new Map(), { memory: createMemoryDriver }, undefined, store)`, passing a positional `undefined` to reach the fourth slot. Grouping options is the shape this project uses everywhere else, including `TerminalRoutes` two files away.
    repair: Declare `TerminalConnectionOptions` (`stream`, `accepts`, `timer`, `keepalive`) and `DatabaseResolverOptions` (`drivers`, `generator`, `store`) in the matching `types.ts`, and reduce the constructors to `(manager, name, request, options)` and `(handles, options)`. Update `TerminalRoutes.ts:94-102`, `factories.ts` at the `DatabaseResolver` construction site, and `guides/toolbox.md:265,279`.

## s10-28

28. package=toolbox file=`/home/user/fleet/toolbox/src/server/routes/TerminalConnection.ts:14-16` rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: The class TSDoc states "`TerminalRoutes` builds the `accepts` predicate from its own token option and opens the stream, so no consumer can construct one." The stated reason is false: `accepts` is any `(string | undefined) => boolean`, and `stream` comes from `openStream()`, a public `@orkestrel/server` export (imported at `TerminalRoutes.ts:15`). A consumer holds every argument. What actually prevents construction is that the class is absent from `server/index.ts` and named in `tests/guides.test.ts:43`'s `INTERNAL` list.
    repair: Replace the reason with the true one: "Not exported from the `@orkestrel/toolbox/server` barrel — reach this behaviour through `createTerminalRoutes`."

## s10-29

29. package=toolbox file=`/home/user/fleet/toolbox/src/core/stores/MemoryDefinitionStore.ts:7` rule=`.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: "The EXACT twin of {@link ... DatabaseDefinitionStore}" is false in two measurable ways. `MemoryDefinitionStore` `structuredClone`s on write (line 46) and on read (line 41); `DatabaseDefinitionStore` does neither, so caller-mutation isolation depends on the driver. And `DatabaseDefinitionStore.get` runs `isDatabaseDefinition` against the stored blob (line 70) and returns `undefined` for a malformed one, a rejection the memory store cannot make. `guides/toolbox.md:38` repeats the claim as "Both are exact twins — same `get` / `set` / `delete` behavior".
    repair: State the shared contract and the two differences. "Implements the same `DefinitionStoreInterface` contract as `DatabaseDefinitionStore`, backed by a process-lifetime `Map`. This store copies on write and on read; the table-backed store narrows an untrusted stored blob and reports `undefined` for a malformed one." Correct `guides/toolbox.md:38` in the same change.

## s10-30

30. package=toolbox file=`/home/user/fleet/toolbox/src/core/stores/DatabaseDefinitionStore.ts:50`, `/home/user/fleet/toolbox/src/core/stores/MemoryDefinitionStore.ts:36`, `/home/user/fleet/toolbox/src/core/types.ts:500` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Value-level identifiers verdict=CONFIRMED
    wrong: Two implementations of one interface are named on two different axes. `MemoryDefinitionStore` names its backend; `DatabaseDefinitionStore` names its payload — and its payload is `DatabaseDefinition`, which is exactly what the memory store holds too. So `DatabaseDefinitionStore` reads as "the store of `DatabaseDefinition`s", which describes both. Meanwhile the interface they share is `DefinitionStoreInterface`, which drops the `Database` qualifier its own payload type carries.
    repair: Vary one axis. Rename the interface to `DatabaseDefinitionStoreInterface` and the classes to `MemoryDefinitionStore` and `TableDefinitionStore` (it holds one `TableInterface`, per `DatabaseDefinitionStore.ts:51`). Update `types.ts:500`, both class files, `factories.ts:1010,1029,55,21`, `databases/DatabaseResolver.ts:2,22,36`, `core/index.ts:8-9`, and `guides/toolbox.md:31-32,38,42-43,197,230`.

## s10-31

31. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:501-503` and `/home/user/fleet/toolbox/src/core/stores/MemoryDefinitionStore.ts:39,44,50` rule=`.claude/rules/typescript.md` § Comments and API documentation + `.claude/rules/documentation.md` § Parity ("Document public methods under `## Methods`") verdict=CONFIRMED
    wrong: `DefinitionStoreInterface`'s three call signatures carry no TSDoc at all — no description, no `@param`, no `@returns` — on a public behavioral interface. `MemoryDefinitionStore`'s three public methods carry none either, while `DatabaseDefinitionStore`'s carry a one-line description without `@param` or `@returns`. Three sibling declarations of one contract, documented three ways.
    repair: Document each method on the interface with description, `@param`, and `@returns`, including the stated no-op behavior for `delete` of an absent id. Give both classes matching per-method TSDoc, and add the `## Methods` table to `guides/toolbox.md`'s `DefinitionStoreInterface` section (line 230).

## s10-32

32. package=toolbox file=`/home/user/fleet/toolbox/src/core/constants.ts:69` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Value-level identifiers (`Constant → {QUALIFIER}_{NOUN}`) verdict=CONFIRMED
    wrong: `MAX_WORKFLOW_DEPTH` bounds the workflow tool's nesting, and every sibling bound in the same file uses the `<TOOL>_<NOUN>` scheme — `AGENT_TOOL_DEPTH:28`, `RELATION_TOOL_DEPTH:440`, `DATABASE_TOOL_LIMIT:388`, `RELATION_TOOL_LIMIT:437`. One of the five uses a `MAX_` prefix, so a reader looking for the workflow tool's depth bound alongside the others does not find it. `AGENT_TOOL_DEPTH:22-26` documents the pair as deliberately separate constants, which makes the naming split the only remaining inconsistency.
    repair: Rename to `WORKFLOW_TOOL_DEPTH` and update `constants.ts:22,61-69,81`, `factories.ts:76,188,197`, and the guide's constants table.

## s10-33

33. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:21,216,364,496`, `core/constants.ts:4`, `core/helpers.ts:156`, `core/factories.ts:398,539,668,771,819,917,1044,1048,1294,1298,1313,1427,1448,1561`, `core/shapers.ts:57,240,410,419,424,598`, `core/stores/DatabaseDefinitionStore.ts:33`, `core/stores/MemoryDefinitionStore.ts:10`, `server/types.ts:5`, `server/constants.ts:2` rule=`.claude/rules/writing.md` § Code tokens, references, and links + `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: Same defect as finding 9, at larger scale. `AGENTS §5`, `§4.4`, `§4.8`, `§9.2`, `§14`, `§21`, and `§22` are cited throughout, most of them inside `/** */` blocks that ship in `dist/src/core/index.d.ts` and `dist/src/server/index.d.ts`. `/home/user/scaffold/AGENTS.md` has no numbered sections, so none of these pointers resolves — and `§9.2` and `§22` name rules a reader cannot locate under any heading.
    repair: Delete each citation and keep the claim beside it. Where the rule is what makes the sentence make sense, restate the rule in one clause: `shapers.ts:410` becomes "the array form (multiple keys, positional) resolves FIRST, so a caller expressing one list-valued item reads the documented single-item form."

## s10-34

34. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:513`, `core/constants.ts:48`, `core/helpers.ts:291,409,421`, `core/shapers.ts:74`, `core/factories.ts:535` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: `should` at `types.ts:513` ("a caller-constructed database it should manage"), `constants.ts:48` and `shapers.ts:74` ("the instructions the sub-agent should carry out" — model-facing text advertised to every LLM that calls the agent tool), and `helpers.ts:291,409,421` ("the factory should throw with"). `just` at `factories.ts:535` ("so the model can just start writing").
    repair: `types.ts:513` → "a caller-constructed database it manages alongside store-backed ones". `constants.ts:48` and `shapers.ts:74` → "the instructions the sub-agent carries out". `helpers.ts:291,409,421` → "the code the factory throws with". `factories.ts:535` → "so the model can start writing". Swept case-insensitively across `/home/user/fleet/toolbox/src/**/*.ts` for the full substitution table; the only other matches were `currently` at `types.ts:435`, `constants.ts:305,308`, and `factories.ts:913,919`, `shapers.ts:46`, every one of which means "at this moment" (the forms presently addressed to a terminal) rather than "as of this writing" — recorded as permitted, not reported.

## s10-35

35. package=toolbox file=`/home/user/fleet/toolbox/src/core/databases/DatabaseResolver.ts:69,79` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `set` and `delete` each carry `@returns Nothing` on a `void` method. The tag is required "where applicable"; on a `void` return it states nothing the signature does not, and it is the only place in either package that does this.
    repair: Delete both `@returns Nothing` lines.

## s10-36

36. package=toolbox file=`/home/user/fleet/toolbox/src/core/index.ts:7`, `/home/user/fleet/toolbox/src/server/index.ts:4` rule=`.claude/rules/architecture.md` § Barrel exports ("Intern it ... when the public value is a projection of the instance rather than the instance") verdict=EXEMPT
    wrong: `createTerminalRoutes` (`server/factories.ts:31`) returns `new TerminalRoutes(manager, options).routes()` — a projection of the instance — which reads as an intern trigger, and `DatabaseResolver` is likewise reached through `createDatabaseTool` in normal use.
    repair: None. Both classes are documented as intentional public API with runnable examples at `guides/toolbox.md:238-241,248-251,258-266,275-279`, and the competing clause ("Barrel that class when a consumer can construct it from values they already hold") is satisfied — a consumer holds a `TerminalManagerInterface` and a driver record. Recorded rather than dropped; the constructor ergonomics of both are finding 27's subject.

## s10-37

37. package=toolbox file=`/home/user/fleet/toolbox/src/server/types.ts:53-56` rule=`AGENTS.md` § Design laws ("No polling architecture") verdict=EXEMPT
    wrong: `TerminalConnection.#tick` (`TerminalConnection.ts:114-121`) re-validates the presented token on every keepalive tick, so token revocation is detected by a periodic timer rather than by an event.
    repair: None. The limit and its exact cost are stated in TSDoc at `server/types.ts:53-56` — "the revocation window equals the keepalive interval — a token rejected/expired between ticks keeps streaming until the next one." The tick itself is the SSE comment ping the protocol requires, not a poll added for this check. Recorded rather than dropped.

## s10-38

38. package=toolbox file=`/home/user/fleet/toolbox/src/**/*.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Per the dispatch, the fleet-wide first-sentence form is settled; toolbox is 42 imperative to 0 third-person — uniformly the wrong form, with no internal split. Files: `core/helpers.ts`, `core/factories.ts`, `core/errors.ts`, `core/databases/DatabaseResolver.ts`, `core/stores/DatabaseDefinitionStore.ts`, `server/factories.ts`, `server/routes/TerminalRoutes.ts`, `server/routes/TerminalConnection.ts`.
    repair: Convert every first sentence in those files to the `-s` form. Reported compactly per the dispatch; no per-symbol list.