# Fix dossier: table

Verified fix-producing findings for the `table` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s14-23 — DRIFT-RESHAPE

23. package=table file=`/home/user/fleet/table/src/core/index.ts:10-15` rule=`.claude/rules/architecture.md` § Barrel exports verdict=CONFIRMED
    wrong: all six manager classes are barrelled, and none can be constructed by a consumer: each constructor demands the table's `Emitter` instance plus closures over `Table`'s `#`-private fields (`SelectionManager.ts:22-28`, `PaginationManager.ts:25-33`, `RowManager.ts:34-42`). The rule interns a class whose constructor requires a value only its owner produces. `Table.ts` is the only place in the whole checkout that writes `new SelectionManager`, `new PaginationManager`, or any sibling — even the tests named in the guide (`tests/src/core/tables/SelectionManager.test.ts`) drive them through `Table` and never import the class. The guide nevertheless publishes all six as Surface rows (`guides/table.md:107-118`) with no runnable example, which the rule names as drift parity cannot see, and `tests/guides.test.ts:67` declares `INTERNAL` empty.
    repair: delete the six rows from `src/core/index.ts`, delete the six class rows (not the interface rows) from `guides/table.md:107-118`, and name the six class names in `INTERNAL` at `tests/guides.test.ts:67`. Findings 24-26 are the alternative route: fixing them makes the managers constructible from values a consumer holds, at which point they can stay barrelled — rule on that before interning.

### Verification

**Judge (DRIFT-RESHAPE/high):** The drift is real on the rule's unconditional clause: six barrelled classes, zero `@example` in any of the six files, no guide fence constructing one, and an empty `INTERNAL`. The guide even states the intern condition as fact and admits the missing example ("Their constructors are not a documented

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: keep the finding's three steps (drop the six rows from `src/core/index.ts`, drop the six class rows from `guides/table.md:107-118` while keeping the interface rows, name the six in `INTERNAL` at `tests/guides.test.ts:67`) and add the step it omits — re-point the class imports in `tests/src/core/Table.test.ts:1-16` at `src/core/tables/*.js` directly. Rule on findings 24 and 26 before this unit runs, since either may make a manager constructible.

## s14-24 — DRIFT-RESHAPE

24. package=table file=`/home/user/fleet/table/src/core/tables/SelectionManager.ts:1-89` and `/home/user/fleet/table/src/core/tables/ExpansionManager.ts:1-89` rule=`.claude/rules/architecture.md` § System constraints; `AGENTS.md` § Design laws (minimal public API, one shared engine) verdict=CONFIRMED
    wrong: the two files are the same class written twice. Same fields, same constructor, same `keys` getter, same `clear` and `toggle` bodies, same `#change` private method, same `computeKeys` helper; the only differences are the emitted event name, the add-verb name, and the doc wording. Their interfaces (`types.ts:614-672` and `:687-739`) are likewise identical apart from `select` versus `expand`. The guide states the duplication outright at `guides/table.md:763-764`: "Both hold `TableKey` sets and nothing else, and both offer the same three verbs."
    repair: collapse to one exported `KeyManager` class over one `KeyManagerInterface` (`keys`, one add-verb, `remove`, `toggle`), taking the event name as constructor data — an event name uniformly emitted is data, not a behavior-selecting literal — and type both `TableInterface.selection` and `TableInterface.expansion` with it. If the domains must keep distinct verbs, the second acceptable form is one shared `KeyManager` held by composition with each public method translating its own verb; do not keep two engines.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplication is exact - my own token-normalized diff of the two files leaves only doc wording - so "Centralize any pattern repeated twice" is violated beyond the already-shared `computeKeys` leaf. The finding's PRIMARY repair is harmful: typing both `TableInterface.selection` and `TableInterface.

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: take the finding's second form only. Extract the shared shell — the five fields, the `keys` getter, and `#change` — into one exported key-set engine each manager composes, and keep `SelectionManager` and `ExpansionManager` as separate classes with their own domain verbs (`select` / `expand`), their own event (`select` / `expand`), and their own interfaces. Do not collapse the two interfaces onto `TableInterface.selection` and `TableInterface.expansion`.

## s14-25 — DRIFT

25. package=table file=`/home/user/fleet/table/src/core/tables/SortManager.ts:53-99` and `/home/user/fleet/table/src/core/tables/FilterManager.ts:57-106` rule=`.claude/rules/architecture.md` § System constraints (centralize any pattern repeated twice) verdict=CONFIRMED
    wrong: `set` and `remove` implement one column-keyed list engine twice — normalize the input to a list, validate each entry's column, replace the entry whose `column` matches or append it, compare against the previous list, commit, and emit the axis event. The bodies differ only in the validation call and the pagination clamp `FilterManager` adds.
    repair: extract the shared list operations into exported leaves in `helpers.ts` — one that replaces-or-appends entries keyed by `column`, one that removes entries whose `column` is in a set, and one that compares two term lists — and have both managers compose them with their own validation and their own emit. Both leaves are pure, referentially transparent, and independently testable, so `helpers.ts` is their correct home.

## s14-29 — DRIFT-RESHAPE

29. package=table file=`/home/user/fleet/table/src/core/validators.ts:109` (`cloneJSONRecord(meta)` inside `isTableColumn`), `helpers.ts:372` (`cloneJSONRecord(column.meta)` inside `auditTable`), `cloners.ts:31` (`cloneJSONRecord(column.meta)`) rule=`.claude/rules/patterns.md` § Foreign contracts verdict=CONFIRMED
    wrong: `Table`'s constructor path reads a caller-supplied `meta` record at least three times — the structural guard clones it and discards the clone purely to test ownability, the audit clones it again and discards it again, and `cloneSchema` clones it a third time to keep it — while the rule fixes the discipline as read the foreign object exactly once and depend on no result of the read count. Discarding a completed clone inside a total guard also puts allocation and a full foreign-object traversal inside `validators.ts`, which the validation rules keep free of side effects.
    repair: clone the schema once at the boundary, then guard and audit the owned copy: reorder `Table`'s constructor (`Table.ts:63-72`) to `cloneSchema` first and validate that, and delete the discard-clone at `validators.ts:109-110`, whose only purpose is a probe the owning clone already performs. Whether a getter-bearing `meta` is reachable through the shipped API is a correctness question for the objective lane; this finding rules only on the read discipline.

### Verification

**Judge (DRIFT-RESHAPE/high):** I reproduced the exploit, and it falsifies the EXCEPTION at its own premise. The guide claims the guard, the constructor, and the parser cannot disagree about which schemas a table can be opened against; with a Proxy `meta` carrying a `get` trap over a data-descriptor target, `isTableSchema` returns

**Lane DRIFT-RESHAPE/high:** amend: keep the ownability probe in `isTableColumn` - it is pinned published behavior at tests/src/core/validators.test.ts:77 and :100. Fix the read count in `Table`'s constructor instead: own the schema first through a total step that maps a non-`TableError` throw to `TableError('SCHEMA', 'The table schema is unusable: The schema is not a table schema')`, then run `isStructuralTableSchema` and `auditTable` against the owned copy and store that same object, mirroring the guard-then-own-then-guard order `parseTable` already uses at parsers.ts:21-28.

**Lane EXCEPTION/high:** drop

