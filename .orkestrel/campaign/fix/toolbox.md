# Fix dossier: toolbox

Verified fix-producing findings for the `toolbox` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s10-14 — DRIFT

14. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:81,138,317,327,375` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) + `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
    wrong: `isWorkflowLineage`, `isAgentFunction`, `isColumnSpec`, `isColumnKind`, and `isDatabaseDefinition` are all `(value: unknown) => value is T` total guards, and all five sit in `helpers.ts`. The package has no `core/validators.ts` at all. Unlike markdown's line predicates (finding 3), these are the real `Guard<T>` shape, so the kind table places them unambiguously.
    repair: Create `src/core/validators.ts`, move the five guards there, add `export * from './validators.js'` to `src/core/index.ts` between `errors.js` and `shapers.js`, and update the importers (`stores/DatabaseDefinitionStore.ts:7`, `factories.ts:109`, and `helpers.ts` itself for the `isColumnSpec` call at line 383). `isToolboxError` stays in `errors.ts` — the kind table puts error guards there.

## s10-15 — DRIFT-RESHAPE

15. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:353,361` rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("`*Shape`: `ContractShape` value/JSON-Schema blueprint, **not a function or type**") verdict=CONFIRMED
    wrong: `columnShape(spec: ColumnSpec): ContractShape` and `kindShape(kind: ColumnKind): ContractShape` are functions wearing the `*Shape` suffix the rule reserves for values. The collision is live inside this package: `shapers.ts:387` declares `columnKindShape` and `shapers.ts:392` declares `columnSpecShape` as values, so `columnShape` (function, `helpers.ts`) and `columnSpecShape` (value, `shapers.ts`) sit side by side in the barrel under one suffix carrying two meanings, and `columnShape(spec)` does not return `columnSpecShape`.
    repair: These compile a spec into a shape, so this is "right name, wrong file" inverted — rename and relocate. Move both into a new `src/core/compilers.ts` (the kind file for shape compilers) as `compileColumn(spec: ColumnSpec): ContractShape` and `compileColumnKind(kind: ColumnKind): ContractShape`, update `expandTables:345`, add the barrel row, and update `guides/toolbox.md:84-85`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The rule forbids the form in the same sentence that fixes it, and the collision is live inside one barrel, so the violation is real and the `compilers.ts` destination is the right kind. The repair as written says "update `expandTables:345`" - that is, leave the caller in `helpers.ts` and point it at

**Lane DRIFT-RESHAPE/high:** amend: move `expandTables` into `src/core/compilers.ts` with `compileColumn` and `compileColumnKind`. It is itself a compiler ('Compile a `TableSpec` into the `@orkestrel/database` `TableMap`'), and leaving it in `helpers.ts` would make the leaf import the new class-tier file. Update `guides/toolbox.md:83-85` for all three rows.

**Lane DRIFT/high:** stands

## s10-16 — DRIFT-RESHAPE

16. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:452,458` and `/home/user/fleet/toolbox/src/core/helpers.ts:361,344` rule=`AGENTS.md` § Design laws ("Named discriminants. Name the axis that varies ... never `kind` or `type`") + `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
    wrong: The axis a column varies on is named `Kind` in the type (`ColumnKind`) and `type` in the field (`ColumnSpec = ColumnKind | Readonly<{ type: ColumnKind; optional?: boolean }>`) — both words the design law names as the ones never to use. `helpers.ts:361` then takes a parameter literally called `kind`, and `helpers.ts:344` binds a loop variable `kind` to a value that is a `ColumnSpec`, not a `ColumnKind`, so the misnamed axis has already produced a misleading local.
    repair: Name the axis. Rename `ColumnKind` → `ColumnFormat` and the field `type` → `format`, so `ColumnSpec = ColumnFormat | Readonly<{ format: ColumnFormat; optional?: boolean }>`. Update `types.ts:452,458,466`, `helpers.ts:317-329,353-366`, `shapers.ts:387,392`, `guides/toolbox.md:84-86`, and the corresponding rows in the guide's type table. Fix the `helpers.ts:344` loop variable to `spec` in the same edit.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The finding's naming defect at helpers.ts:344 is real and unhuntable: a `ColumnSpec` bound to a local called `kind`. The rename half fails. The law and its naming specific are scoped to a discriminant's axis, and `type` here discriminates no union - it is a data field in a model-facing JSON Schema w

**Lane DRIFT-RESHAPE/medium:** amend: fix the naming defects that are real — rename the `helpers.ts:344` loop variable to `spec` and the `helpers.ts:361` parameter to match what it receives. Reject the `ColumnKind` → `ColumnFormat` and `type` → `format` rename: `shapers.ts:392` publishes `type` into the model-facing JSON Schema where it is the standard keyword, and `format` means something else there.

**Lane DRIFT/medium:** amend: stands, and extend the rename to the published JSON Schema `description` strings that spell 'A column type' (shapers.ts:389 and the ColumnSpec description beneath it) and to the model-facing rows in guides/toolbox.md, since those are the text the calling model reads.

## s10-17 — DRIFT

17. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:409,421,312-314` and `/home/user/fleet/toolbox/src/core/types.ts:449` rule=`.claude/rules/writing.md` § Claims and time ("Write the present tense for what exists") verdict=CONFIRMED
    wrong: Published TSDoc says "the {@link ToolboxErrorCode} the **upcoming** database tool should throw with" (`409`) and "the **upcoming** relation tool" (`421`); the `//` header at `312-314` says "the tool factories land in a later unit"; `types.ts:449` says "config-only, for the **upcoming** database / relation tools". `createDatabaseTool` exists at `factories.ts:1102` and `createRelationTool` at `factories.ts:1339`. The prose describes a tree from two revisions ago.
    repair: Present tense throughout: "the code {@link import('./factories.js').createDatabaseTool} throws with", "the code `createRelationTool` throws with". Delete "the tool factories land in a later unit" from `helpers.ts:313` and "for the upcoming database / relation tools" from `types.ts:449`.

## s10-18 — DRIFT-RESHAPE

18. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:409-418,421-430` rule=`.claude/rules/documentation.md` § Parity ("Falsify a prose claim the way you falsify a code claim") verdict=CONFIRMED
    wrong: Both first sentences say the function maps a caught error "to the {@link ToolboxErrorCode}". `databaseToolCode` returns `DatabaseErrorCode | undefined` (line 416) and `relationToolCode` returns `RelationErrorCode | undefined` (line 428) — upstream codes from `@orkestrel/database` and `@orkestrel/relation`, not this package's union. The `@returns` tags directly beneath (414, 426) correctly say "the granular `DatabaseErrorCode`", so each function's own TSDoc contradicts itself. `terminalToolCode:305` really does return `ToolboxErrorCode`, which is why the copied sentence went unnoticed.
    repair: Rewrite both first sentences to name the returned type, and rename the two functions to match what they return — `databaseErrorCode` and `relationErrorCode` — leaving `terminalToolCode` as the one that genuinely maps into this package's union. Update `factories.ts:101,107` and the `guides/toolbox.md` rows.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: rewrite both first sentences to name the returned type, and take the rename from finding s10-21's form rather than this one — `inferDatabaseCode` and `inferRelationCode`, not `databaseErrorCode` and `relationErrorCode`. Update `factories.ts:101,107` and the `guides/toolbox.md:88-89` rows.

**Lane DRIFT-RESHAPE/high:** amend: rewrite both first sentences to name the returned upstream code type; if the functions are renamed, use the verb form (`inferDatabaseCode` / `inferRelationCode`, matching finding 21's `inferTerminalCode`) rather than `databaseErrorCode` / `relationErrorCode`.

## s10-19 — DRIFT

19. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:507-509,552-553` rule=`.claude/rules/documentation.md` § Authority and workflow + `.agents/orchestration.md` § Check the brief before you send it ("Keep the brief's control identifiers inside the brief") verdict=CONFIRMED
    wrong: Published TSDoc on `DatabaseToolOptions` reads "SRC-2 of the 3-unit database / relation spine, built over the SRC-1 foundation", and `RelationToolOptions` reads "SRC-3 (the final unit) of the 3-unit database / relation spine". `SRC-1`, `SRC-2`, and `SRC-3` are campaign unit identifiers. They ship in `dist/src/core/index.d.ts` to consumers who have never seen the campaign, and they also state a count ("3-unit") that `AGENTS.md` § Writing forbids.
    repair: Delete both clauses. `DatabaseToolOptions` opens "Options for `createDatabaseTool` — the live handles, definition store, driver registry, key generator, row cap, timeout, and readonly gate the tool composes." `RelationToolOptions` opens "Options for `createRelationTool`."

## s10-20 — DRIFT

20. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:215,363` and `/home/user/fleet/toolbox/src/server/types.ts:7` rule=`AGENTS.md` § Writing ("**NEVER state a count.** ... Delete a count you find. Do not correct it.") verdict=CONFIRMED
    wrong: "a FLAT, descriptive tagged union over the **13** workspace edit / read / navigation actions" (`types.ts:215`); "The **seven-value** machine-readable code a thrown `ToolboxError` carries" (`types.ts:363`); "the exact **7-literal** union `@orkestrel/router`'s `Method` accepts" (`server/types.ts:7`). All three tally sets that grow, and all three ship in the published declaration files.
    repair: Delete each count rather than correcting it. "a FLAT, descriptive tagged union over the workspace edit, read, and navigation actions"; "The machine-readable code a thrown `ToolboxError` carries"; "The HTTP method literal a {@link TerminalRoute} declares — the same union `@orkestrel/router`'s `Method` accepts."

## s10-21 — DRIFT

21. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:55,71,167,305,416,428` rule=`.claude/rules/names.md` § Standalone helpers ("Module helpers ... default to `{verb}{Noun}`") verdict=CONFIRMED
    wrong: `workflowTag`, `agentTag`, `workflowToolSummary`, `terminalToolCode`, `databaseToolCode`, and `relationToolCode` are all noun phrases with no verb, so a reader cannot tell a helper call from a property read at the call site. The rule's one-word escape hatch ("valid only when its meaning and arguments are unmistakable: `delay`, `clamp`") does not cover a two- or three-word noun phrase.
    repair: `workflowTag` → `tagWorkflow`; `agentTag` → `tagAgent`; `workflowToolSummary` → `summarizeWorkflow`; `terminalToolCode` → `inferTerminalCode` (`infer*` is the project's derivation prefix). Combine with finding 18 for the other two. Update `factories.ts:94,101,107,108,110,111` and `guides/toolbox.md`.

## s10-22 — DRIFT-RESHAPE

22. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:102,511,545` rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("`*Of`: builder combining constituent parts into a container/guard/value") verdict=CONFIRMED
    wrong: The `*Of` form is fixed to a builder over constituent parts, like `arrayOf(guard)` or `boundsOf(min, max)`. `lineageOf(lineage)` takes a lineage and returns a validated frozen copy — a normalizer that throws. `relationManagerOf(managers, name)` and `relationModelOf(manager, name)` are registry lookups that throw on a miss. None of the three combines parts into a value. `queryOf:570` is the one legitimate use in the file, which makes the other three read as the same operation when they are not.
    repair: `lineageOf` → `normalizeLineage`; `relationManagerOf` → `resolveManager`; `relationModelOf` → `resolveModel`. Update `helpers.ts:117,127`, `factories.ts:99,105,106`, and the guide rows.

### Verification

**Judge (DRIFT-RESHAPE/high):** The `*Of` form is fixed to a builder over constituent parts, and none of the four combines parts. The finding exempts the wrong member: `queryOf` is a normalizer by its own first sentence and by its guide row, so "the one legitimate use in the file" misreads it. Either every one of them is an `*Of`

**Lane DRIFT-RESHAPE/high:** amend: rename all four, not three — add `queryOf` → `normalizeQuery`, since its own TSDoc calls it a normalizer exactly as `lineageOf`'s does. Prefer `resolveRelationManager` and `resolveRelationModel` over the bare `resolveManager` / `resolveModel` so the barrel keeps the domain qualifier beside the terminal manager concepts.

**Lane DRIFT/high:** stands

## s10-23 — DRIFT

23. package=toolbox file=`/home/user/fleet/toolbox/src/core/helpers.ts:570-586,626-632` rule=`.claude/rules/typescript.md` § Types + `AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`") verdict=CONFIRMED
    wrong: `queryOf`'s single parameter is a 15-line anonymous structural type declared inline in the signature, and `clampQuery` returns an inline `Readonly<{ query: QueryInput; limit: number }>`. Both are barrelled public exports whose input and output types a consumer cannot name, import, or build a value against.
    repair: Declare `DatabaseQueryInput` (the serialized wire query) and `ClampedQuery` in `src/core/types.ts`, annotate both signatures with them, and add the rows to `guides/toolbox.md`'s type table.

## s10-24 — DRIFT

24. package=toolbox file=`/home/user/fleet/toolbox/src/server/routes/` rule=`.claude/rules/architecture.md` § Kind or folder ("A word is either a centralized kind or a domain folder, never both. A folder named for a centralized kind ... is that kind's file, not a folder.") verdict=CONFIRMED
    wrong: `routes` is a centralized kind in the placement table ("Route tables → `*/routes.ts`"). `src/server/routes/` is a folder, and it holds two entity classes — `TerminalRoutes.ts` and `TerminalConnection.ts` — neither of which is a route table. The kind word is doing double duty exactly as the rule forbids.
    repair: Rename the folder to a domain folder: `src/server/terminals/`, holding `TerminalRoutes.ts` and `TerminalConnection.ts`. Update `server/index.ts:4`, `server/factories.ts:3`, `TerminalRoutes.ts:18`, the test paths that mirror it, and the `guides/toolbox.md` source links.

## s10-25 — DRIFT-RESHAPE

25. package=toolbox file=`/home/user/fleet/toolbox/src/server/types.ts:66` and `/home/user/fleet/toolbox/src/server/routes/TerminalRoutes.ts:30` rule=`.claude/rules/names.md` § Type-level identifiers ("Never pluralize type names") verdict=CONFIRMED
    wrong: `TerminalRoutesOptions` carries a pluralized entity (`TerminalRoutes`) inside a type name. The class `TerminalRoutes` is a plural entity name whose singular sibling `TerminalRoute` is a different concept in the same barrel, so the two names differ only by one letter while naming an owner and a record.
    repair: Rename the class to what it is — a route builder over one terminal manager. `TerminalRouteBuilder` with `TerminalRouteOptions`, or fold the class away entirely under finding 26. Either way the plural disappears from the type name.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The plural entity and its one-letter collision with the singular record type are real, and the fleet sweep turns up no sibling doing it, so nothing shelters it. The repair fails on its own rule: `Builder` appears in neither identifier table, and `TerminalRouteOptions` beside it would read as one rou

**Lane DRIFT-RESHAPE/medium:** amend: rename the class for the entity it owns — one terminal manager's wire bridge — rather than for its output, so the plural disappears and `TerminalRoute` keeps its meaning: `TerminalBridge` with `TerminalBridgeOptions`, keeping `createTerminalRoutes` as the factory that returns the routes. Reject `TerminalRouteBuilder`: `.claude/rules/names.md` § Type-level identifiers carries no `Builder` role suffix.

**Lane DRIFT/medium:** amend: stands, but the rename must keep `createTerminalRoutes` coherent — the barrelled factory returns `readonly TerminalRoute[]`, so `TerminalRouteBuilder` with `TerminalRouteOptions` works while any rename that also moves the factory name needs its own ruling. Strike the 'fold the class away under finding 26' branch.

## s10-26 — DRIFT

26. package=toolbox file=`/home/user/fleet/toolbox/src/server/types.ts:8` rule=`.claude/rules/names.md` § Type-level identifiers (`Union/enum-like → {Entity}{Noun}`) verdict=CONFIRMED
    wrong: `export type Method = 'GET' | 'POST' | ...` is a bare, entity-less type name published from `@orkestrel/toolbox/server`. A consumer importing the barrel receives a top-level `Method` that collides with every other package's method union and names no owning entity. (`@orkestrel/router` is not a declared dependency — `package.json:85-95` — so the local declaration itself is correct; only its name is not.)
    repair: Rename to `TerminalRouteMethod` and update `server/types.ts:25`, the guide's type table, and any consumer import.

## s10-28 — DRIFT

28. package=toolbox file=`/home/user/fleet/toolbox/src/server/routes/TerminalConnection.ts:14-16` rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: The class TSDoc states "`TerminalRoutes` builds the `accepts` predicate from its own token option and opens the stream, so no consumer can construct one." The stated reason is false: `accepts` is any `(string | undefined) => boolean`, and `stream` comes from `openStream()`, a public `@orkestrel/server` export (imported at `TerminalRoutes.ts:15`). A consumer holds every argument. What actually prevents construction is that the class is absent from `server/index.ts` and named in `tests/guides.test.ts:43`'s `INTERNAL` list.
    repair: Replace the reason with the true one: "Not exported from the `@orkestrel/toolbox/server` barrel — reach this behaviour through `createTerminalRoutes`."

## s10-29 — DRIFT

29. package=toolbox file=`/home/user/fleet/toolbox/src/core/stores/MemoryDefinitionStore.ts:7` rule=`.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: "The EXACT twin of {@link ... DatabaseDefinitionStore}" is false in two measurable ways. `MemoryDefinitionStore` `structuredClone`s on write (line 46) and on read (line 41); `DatabaseDefinitionStore` does neither, so caller-mutation isolation depends on the driver. And `DatabaseDefinitionStore.get` runs `isDatabaseDefinition` against the stored blob (line 70) and returns `undefined` for a malformed one, a rejection the memory store cannot make. `guides/toolbox.md:38` repeats the claim as "Both are exact twins — same `get` / `set` / `delete` behavior".
    repair: State the shared contract and the two differences. "Implements the same `DefinitionStoreInterface` contract as `DatabaseDefinitionStore`, backed by a process-lifetime `Map`. This store copies on write and on read; the table-backed store narrows an untrusted stored blob and reports `undefined` for a malformed one." Correct `guides/toolbox.md:38` in the same change.

## s10-31 — DRIFT-RESHAPE

31. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:501-503` and `/home/user/fleet/toolbox/src/core/stores/MemoryDefinitionStore.ts:39,44,50` rule=`.claude/rules/typescript.md` § Comments and API documentation + `.claude/rules/documentation.md` § Parity ("Document public methods under `## Methods`") verdict=CONFIRMED
    wrong: `DefinitionStoreInterface`'s three call signatures carry no TSDoc at all — no description, no `@param`, no `@returns` — on a public behavioral interface. `MemoryDefinitionStore`'s three public methods carry none either, while `DatabaseDefinitionStore`'s carry a one-line description without `@param` or `@returns`. Three sibling declarations of one contract, documented three ways.
    repair: Document each method on the interface with description, `@param`, and `@returns`, including the stated no-op behavior for `delete` of an absent id. Give both classes matching per-method TSDoc, and add the `## Methods` table to `guides/toolbox.md`'s `DefinitionStoreInterface` section (line 230).

### Verification

**Judge (DRIFT-RESHAPE/high):** The class half is real and unhunted: one implementation documents its methods with TSDoc descriptions and the other documents none, and neither carries `@param` or `@returns`. The interface half and the guide half both fail. The bare-signature interface shape is the one `@orkestrel/terminal` uses an

**Lane DRIFT-RESHAPE/high:** amend: give both classes' public methods matching TSDoc with description, `@param`, and `@returns`. Drop the interface-signature and guide items: `terminal/src/core/types.ts:609-613` sets the bare-signature precedent toolbox mirrors by design, and `guides/toolbox.md:230-236` already carries the `## Methods` table the repair asks for.

**Lane DRIFT/high:** stands

## s10-32 — DRIFT-RESHAPE

32. package=toolbox file=`/home/user/fleet/toolbox/src/core/constants.ts:69` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Value-level identifiers (`Constant → {QUALIFIER}_{NOUN}`) verdict=CONFIRMED
    wrong: `MAX_WORKFLOW_DEPTH` bounds the workflow tool's nesting, and every sibling bound in the same file uses the `<TOOL>_<NOUN>` scheme — `AGENT_TOOL_DEPTH:28`, `RELATION_TOOL_DEPTH:440`, `DATABASE_TOOL_LIMIT:388`, `RELATION_TOOL_LIMIT:437`. One of the five uses a `MAX_` prefix, so a reader looking for the workflow tool's depth bound alongside the others does not find it. `AGENT_TOOL_DEPTH:22-26` documents the pair as deliberately separate constants, which makes the naming split the only remaining inconsistency.
    repair: Rename to `WORKFLOW_TOOL_DEPTH` and update `constants.ts:22,61-69,81`, `factories.ts:76,188,197`, and the guide's constants table.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The scheme really does alternate inside one file, so a reader scanning the subject-qualified bounds does not find the workflow one. The proposed name misattributes it: `WORKFLOW_TOOL_DEPTH` reads as one tool's bound while the constant's own TSDoc documents the whole workflow → agent → workflow chain

**Lane DRIFT-RESHAPE/medium:** amend: rename to `WORKFLOW_CHAIN_DEPTH`, which drops the odd `MAX_` prefix and keeps what constants.ts:61-63 documents — a chain bound rather than one tool's. Update `constants.ts:22,61-69,81`, `factories.ts:76,188,197,242,246,486-490`, and the guide's constants table.

**Lane DRIFT/medium:** stands

## s10-33 — DRIFT

33. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:21,216,364,496`, `core/constants.ts:4`, `core/helpers.ts:156`, `core/factories.ts:398,539,668,771,819,917,1044,1048,1294,1298,1313,1427,1448,1561`, `core/shapers.ts:57,240,410,419,424,598`, `core/stores/DatabaseDefinitionStore.ts:33`, `core/stores/MemoryDefinitionStore.ts:10`, `server/types.ts:5`, `server/constants.ts:2` rule=`.claude/rules/writing.md` § Code tokens, references, and links + `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: Same defect as finding 9, at larger scale. `AGENTS §5`, `§4.4`, `§4.8`, `§9.2`, `§14`, `§21`, and `§22` are cited throughout, most of them inside `/** */` blocks that ship in `dist/src/core/index.d.ts` and `dist/src/server/index.d.ts`. `/home/user/scaffold/AGENTS.md` has no numbered sections, so none of these pointers resolves — and `§9.2` and `§22` name rules a reader cannot locate under any heading.
    repair: Delete each citation and keep the claim beside it. Where the rule is what makes the sentence make sense, restate the rule in one clause: `shapers.ts:410` becomes "the array form (multiple keys, positional) resolves FIRST, so a caller expressing one list-valued item reads the documented single-item form."

## s10-34 — DRIFT

34. package=toolbox file=`/home/user/fleet/toolbox/src/core/types.ts:513`, `core/constants.ts:48`, `core/helpers.ts:291,409,421`, `core/shapers.ts:74`, `core/factories.ts:535` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: `should` at `types.ts:513` ("a caller-constructed database it should manage"), `constants.ts:48` and `shapers.ts:74` ("the instructions the sub-agent should carry out" — model-facing text advertised to every LLM that calls the agent tool), and `helpers.ts:291,409,421` ("the factory should throw with"). `just` at `factories.ts:535` ("so the model can just start writing").
    repair: `types.ts:513` → "a caller-constructed database it manages alongside store-backed ones". `constants.ts:48` and `shapers.ts:74` → "the instructions the sub-agent carries out". `helpers.ts:291,409,421` → "the code the factory throws with". `factories.ts:535` → "so the model can start writing". Swept case-insensitively across `/home/user/fleet/toolbox/src/**/*.ts` for the full substitution table; the only other matches were `currently` at `types.ts:435`, `constants.ts:305,308`, and `factories.ts:913,919`, `shapers.ts:46`, every one of which means "at this moment" (the forms presently addressed to a terminal) rather than "as of this writing" — recorded as permitted, not reported.

## s10-38 — DRIFT

38. package=toolbox file=`/home/user/fleet/toolbox/src/**/*.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Per the dispatch, the fleet-wide first-sentence form is settled; toolbox is 42 imperative to 0 third-person — uniformly the wrong form, with no internal split. Files: `core/helpers.ts`, `core/factories.ts`, `core/errors.ts`, `core/databases/DatabaseResolver.ts`, `core/stores/DatabaseDefinitionStore.ts`, `server/factories.ts`, `server/routes/TerminalRoutes.ts`, `server/routes/TerminalConnection.ts`.
    repair: Convert every first sentence in those files to the `-s` form. Reported compactly per the dispatch; no per-symbol list.

