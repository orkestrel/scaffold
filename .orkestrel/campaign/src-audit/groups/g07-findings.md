# Findings for group g07

Packages: form, table. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s14-16

16. package=form file=`/home/user/fleet/form/src/core/Form.ts:97-103`, `:116-121`, `:127-132`, `:160-165`, `:283-288`, `:457-462`, `:599-604`; `helpers.ts:435-440`, `:456-461`; `parsers.ts:28-33`, `:53-58`, `:67-72`, `:137-142` rule=`.claude/rules/architecture.md` § System constraints (centralize any pattern repeated twice), § Kind purity verdict=CONFIRMED
    wrong: one six-line `Object.defineProperty(target, name, { value, enumerable: true, configurable: true, writable: true })` idiom — the prototype-safe record write — is copied across three files. It is non-trivial (its whole point is bypassing a `__proto__` setter) and reusable, so the rule requires one exported, unit-tested implementation with every duplicate routed through it. I checked the installed `@orkestrel/contract` declaration for an existing primitive: it exports `appendEntries` for the array form of this defect and nothing for the record form, so a local helper is correct rather than a reimplementation.
    repair: add `export function defineEntry(target: Record<string, T>, name: string, value: T): void` to `helpers.ts` (or a name the package prefers in `{verb}{Noun}` form), route all thirteen sites through it, and unit-test it against a `__proto__` key. Note `parsers.ts:137-142` writes `configurable: false, writable: false` and must keep that difference — give it its own second helper or a parameter, and do not flatten the two.

## s14-17

17. package=form file=`/home/user/fleet/form/src/core/validators.ts:130-239` rule=`.claude/rules/architecture.md` § Kind purity, § System constraints verdict=CONFIRMED
    wrong: `isFormField` carries the permitted-key allowlist per control as inline array literals, and the `FieldBase` prefix (`control`, `name`, `label`, `help`, `group`, `hidden`, `disabled`, `locked`, `rule`, `meta`) is written out verbatim in each branch. That is module data living inside a guard, duplicated per control, and it silently drifts from `FieldBase` and the variant interfaces in `types.ts` the moment a member is added. The policy sweep cannot see it because the literals are function-scoped.
    repair: declare a frozen `FIELD_KEYS: Readonly<Record<FieldControl, readonly string[]>>` in `constants.ts`, composed from one `FIELD_BASE_KEYS` constant plus each control's own members, and have `isFormField` read `FIELD_KEYS[control]`. Table's single inline list at `table/src/core/validators.ts:93` is genuinely single-use and correctly folded into its caller, so it is not the same finding.

## s14-18

18. package=form file=`/home/user/fleet/form/src/core/validators.ts:417-427` rule=`AGENTS.md` § Design laws (derive state); `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
    wrong: `isFieldError` spells the named-rule list out as `literalOf('required', 'minimum', …)`, a third copy of a fact already stated by `FieldRule`'s members (`types.ts:140-151`, from which `FieldRuleName` is derived at line 160) and by `RULE_MESSAGES`'s keys (`constants.ts:27-37`). Adding a rule to `FieldRule` leaves this guard rejecting a `FieldError` the package itself produces, and nothing fails.
    repair: add `export const RULE_NAMES: readonly FieldRuleName[] = Object.freeze(Object.keys(RULE_MESSAGES))` to `constants.ts` — `RULE_MESSAGES` is already typed `Record<FieldRuleName, string>`, so the compiler holds it complete — and have `isFieldError` build its `rule` guard from that one source.

## s14-19

19. package=form file=`/home/user/fleet/form/src/core/Form.ts:140` rule=`.claude/rules/patterns.md` § Stateful emitters verdict=CONFIRMED
    wrong: the emitter is constructed as `new Emitter<FormEventMap>(options)`, handing the whole `FormOptions` — including `values` and `messages`, which the emitter has no business receiving — to a dependency, where the rule fixes the initialization as the `on` and `error` pair alone. The comment at lines 137-139 justifies it by `exactOptionalPropertyTypes`, but `server/src/server/Server.ts:151-154` and `table/src/core/Table.ts:78-81` both solve that exact problem with the conditional-spread form, so the fleet already has one answer and this file uses a second.
    repair: replace with the conditional-spread form the two sibling packages use, so `FormOptions` and `EmitterOptions` stop being structurally coupled.

## s14-20

20. package=form file=`/home/user/fleet/form/src/core/helpers.ts:137` rule=`AGENTS.md` § Design laws (one concept, one term); `.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
    wrong: `appliesRule` is a boolean predicate whose name reads as an imperative that applies a rule rather than an assertion that one applies, and it is the one predicate in this file outside the `matches*` family the same file establishes (`matchesField:56`, `matchesAnswer:122`, `matchesValue:477`, `matchesValues:530`). The rule fixes one project-wide meaning per helper prefix and forbids alternating terms for one concept.
    repair: rename to `matchesRule(control, rule)` and update its call sites in `evaluateField` and `auditSchema`.

## s14-21

21. package=form file=`/home/user/fleet/form/src/core/helpers.ts:185-191`, `:225-231`, `:263-269`, `:283-289`, `:298-304`, `:309-315`, `:321-327`, `:331-337`, `:345-351`, `:359-365`, `:376-382` rule=`.claude/rules/architecture.md` § System constraints (centralize any pattern repeated twice) verdict=CONFIRMED
    wrong: `evaluateField` repeats one `errors.push(Object.freeze({ field: field.name, message: formatMessage(rule, operand, messages), rule }))` construction throughout its body, varying only the rule name and the operand. The value construction is a factory, and repeating it inline is what makes the function long enough to hide its logic.
    repair: add `createFieldError(field: FormField, rule: FieldRuleName, limit: number | string | undefined, messages?: …): FieldError` to `factories.ts` — a factory constructing a value, so `create*` is the required form and `factories.ts` the required file — and reduce each site to one `errors.push(createFieldError(...))` line. Keep the `custom` push at line 388 separate: it carries the validator's own message and no rule name.

## s14-22

22. package=form file=`/home/user/fleet/form/src/core/validators.ts:271` (`isBoundedJSONRecord(meta)`), `cloners.ts:42` (`cloneJSONRecord(field.meta)`), `helpers.ts:792` (`attempt(() => node[key])` inside `auditSchema`) rule=`.claude/rules/patterns.md` § Foreign contracts verdict=CONFIRMED
    wrong: a caller-supplied `meta` record — foreign data this package carries but does not own until it clones — is read on the guard path, again on the audit walk, and again on the clone, and `Form`'s constructor runs all three in sequence (`Form.ts:80-90`). The rule fixes the discipline as own at arrival, validate the owned copy, and read the foreign object exactly once, because no result may depend on the read count. A `meta` carrying an accessor answers each read independently, so the value validated need not be the value stored.
    repair: clone `meta` once at the boundary and run the guard and the audit against the owned copy: have `Form`'s constructor take ownership through `cloneFormSchema` first, then validate and audit the owned schema. Whether an accessor-bearing `meta` is reachable through the shipped API and what it can achieve is a correctness question for the objective lane; this finding rules only that the read discipline the rule fixes is not followed.

## s14-23

23. package=table file=`/home/user/fleet/table/src/core/index.ts:10-15` rule=`.claude/rules/architecture.md` § Barrel exports verdict=CONFIRMED
    wrong: all six manager classes are barrelled, and none can be constructed by a consumer: each constructor demands the table's `Emitter` instance plus closures over `Table`'s `#`-private fields (`SelectionManager.ts:22-28`, `PaginationManager.ts:25-33`, `RowManager.ts:34-42`). The rule interns a class whose constructor requires a value only its owner produces. `Table.ts` is the only place in the whole checkout that writes `new SelectionManager`, `new PaginationManager`, or any sibling — even the tests named in the guide (`tests/src/core/tables/SelectionManager.test.ts`) drive them through `Table` and never import the class. The guide nevertheless publishes all six as Surface rows (`guides/table.md:107-118`) with no runnable example, which the rule names as drift parity cannot see, and `tests/guides.test.ts:67` declares `INTERNAL` empty.
    repair: delete the six rows from `src/core/index.ts`, delete the six class rows (not the interface rows) from `guides/table.md:107-118`, and name the six class names in `INTERNAL` at `tests/guides.test.ts:67`. Findings 24-26 are the alternative route: fixing them makes the managers constructible from values a consumer holds, at which point they can stay barrelled — rule on that before interning.

## s14-24

24. package=table file=`/home/user/fleet/table/src/core/tables/SelectionManager.ts:1-89` and `/home/user/fleet/table/src/core/tables/ExpansionManager.ts:1-89` rule=`.claude/rules/architecture.md` § System constraints; `AGENTS.md` § Design laws (minimal public API, one shared engine) verdict=CONFIRMED
    wrong: the two files are the same class written twice. Same fields, same constructor, same `keys` getter, same `clear` and `toggle` bodies, same `#change` private method, same `computeKeys` helper; the only differences are the emitted event name, the add-verb name, and the doc wording. Their interfaces (`types.ts:614-672` and `:687-739`) are likewise identical apart from `select` versus `expand`. The guide states the duplication outright at `guides/table.md:763-764`: "Both hold `TableKey` sets and nothing else, and both offer the same three verbs."
    repair: collapse to one exported `KeyManager` class over one `KeyManagerInterface` (`keys`, one add-verb, `remove`, `toggle`), taking the event name as constructor data — an event name uniformly emitted is data, not a behavior-selecting literal — and type both `TableInterface.selection` and `TableInterface.expansion` with it. If the domains must keep distinct verbs, the second acceptable form is one shared `KeyManager` held by composition with each public method translating its own verb; do not keep two engines.

## s14-25

25. package=table file=`/home/user/fleet/table/src/core/tables/SortManager.ts:53-99` and `/home/user/fleet/table/src/core/tables/FilterManager.ts:57-106` rule=`.claude/rules/architecture.md` § System constraints (centralize any pattern repeated twice) verdict=CONFIRMED
    wrong: `set` and `remove` implement one column-keyed list engine twice — normalize the input to a list, validate each entry's column, replace the entry whose `column` matches or append it, compare against the previous list, commit, and emit the axis event. The bodies differ only in the validation call and the pagination clamp `FilterManager` adds.
    repair: extract the shared list operations into exported leaves in `helpers.ts` — one that replaces-or-appends entries keyed by `column`, one that removes entries whose `column` is in a set, and one that compares two term lists — and have both managers compose them with their own validation and their own emit. Both leaves are pure, referentially transparent, and independently testable, so `helpers.ts` is their correct home.

## s14-26

26. package=table file=`/home/user/fleet/table/src/core/tables/PaginationManager.ts:25-33` and `/home/user/fleet/table/src/core/Table.ts:83-144` rule=`.claude/rules/patterns.md` § Options; `.claude/rules/names.md` § Rejected naming; `.claude/rules/architecture.md` § Class order verdict=CONFIRMED
    wrong: `PaginationManager` takes seven positional parameters, four of which — `readPage`, `writePage`, `readLimit`, `writeLimit` — encode grouping through a prefix, which is exactly the compound form the options rule forbids (`serverPort`, `databasePath`) and which the name rules bar as compound members where grouping supplies the context. The parameters exist only because the pagination state lives on `Table` (`#page`, `#limit`) rather than on the manager that owns that axis, so the manager reaches its own state through injected accessors and `Table` reaches back through `#clamp` (Table.ts:266-271). Every manager carries the same inversion; `PaginationManager` is where it is worst.
    repair: give each manager its own `#` state and let `Table` reach it through the manager's own methods rather than through closures. For pagination that removes `readPage`, `writePage`, `readLimit`, and `writeLimit` and leaves the manager owning `#page` and `#limit`, with the clamp as its own method `Table` calls; `Table.clear()` then resets each axis by calling its manager. Where a manager genuinely needs a table-owned read, group the remaining constructor arguments into one options object keyed by entity noun, never a positional list.

## s14-27

27. package=table file=`/home/user/fleet/table/src/core/types.ts:641`, `:648`, `:656`, `:708`, `:715`, `:723` rule=`AGENTS.md` § Design laws (one concept, one term); `.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `clear` carries two meanings in one package. On `SelectionManagerInterface` and `ExpansionManagerInterface` it removes named members, in the same overload shape (`(): void`, `(key): boolean`, `(keys): boolean`) that `RowManagerInterface`, `SortManagerInterface`, and `FilterManagerInterface` all spell `remove`. On `TableInterface.clear` (line 841) it carries the fixed lifecycle meaning, resetting state without destroying the entity. The guide restates the collision at `guides/table.md:764` ("`clear` removes"). The vocabulary exemption the guide grants at lines 754-759 covers `ascending`, `descending`, `offset`, and `limit`, and reaches neither this nor finding 28.
    repair: rename `SelectionManagerInterface.clear` and `ExpansionManagerInterface.clear` to `remove` on the interfaces, both classes, and the guide, leaving `clear` to mean the whole-entity reset it means on `TableInterface`. Fold this into finding 24's collapse if that repair lands first.

## s14-28

28. package=table file=`/home/user/fleet/table/src/core/types.ts:766` and `:831` rule=`.claude/rules/names.md` § Tallies verdict=CONFIRMED
    wrong: the package publishes two `count` properties measuring different things — `PaginationManagerInterface.count` counts pages, `TableInterface.count` counts the rows the filter admits — and neither name says which. The rule permits a lone unambiguous `count` and requires each fact to be named once several tallies coexist.
    repair: rename `PaginationManagerInterface.count` to `pages`, which reads unambiguously beside the existing `page` and needs no doc to disambiguate, and leave `TableInterface.count` alone. Update `PaginationManager.ts:63`, `move` at line 71, `resize` at line 89, `Table.#clamp` at line 267, and the guide's Surface and example rows.

## s14-29

29. package=table file=`/home/user/fleet/table/src/core/validators.ts:109` (`cloneJSONRecord(meta)` inside `isTableColumn`), `helpers.ts:372` (`cloneJSONRecord(column.meta)` inside `auditTable`), `cloners.ts:31` (`cloneJSONRecord(column.meta)`) rule=`.claude/rules/patterns.md` § Foreign contracts verdict=CONFIRMED
    wrong: `Table`'s constructor path reads a caller-supplied `meta` record at least three times — the structural guard clones it and discards the clone purely to test ownability, the audit clones it again and discards it again, and `cloneSchema` clones it a third time to keep it — while the rule fixes the discipline as read the foreign object exactly once and depend on no result of the read count. Discarding a completed clone inside a total guard also puts allocation and a full foreign-object traversal inside `validators.ts`, which the validation rules keep free of side effects.
    repair: clone the schema once at the boundary, then guard and audit the owned copy: reorder `Table`'s constructor (`Table.ts:63-72`) to `cloneSchema` first and validate that, and delete the discard-clone at `validators.ts:109-110`, whose only purpose is a probe the owning clone already performs. Whether a getter-bearing `meta` is reachable through the shipped API is a correctness question for the objective lane; this finding rules only on the read discipline.