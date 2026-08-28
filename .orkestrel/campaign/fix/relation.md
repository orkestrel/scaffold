# Fix dossier: relation

Verified fix-producing findings for the `relation` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s17-09 — DRIFT

9. package=`relation` file=`relation/src/core/helpers.ts:23` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) + § Kind purity verdict=CONFIRMED
   wrong: `isRelationDescriptor(value: unknown): value is RelationDescriptor` is a total `Guard<T>` over `unknown` living in `helpers.ts`; the package has no `validators.ts` at all. This is exactly the "coercer misfiled as a guard" class the policy sweep cannot see.
   repair: Create `relation/src/core/validators.ts`, move `isRelationDescriptor` there unchanged, add `export * from './validators.js'` to `index.ts` after `./errors.js`, and import it in `helpers.ts` from `./validators.js`. The barrel star-exports both, so the published surface is identical.

## s17-10 — DRIFT-RESHAPE

10. package=`relation` file=`relation/src/core/Model.ts:169,170,171,191,196,203,212,225,231,239,344,377,410,411,417,468,478,480` rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: Every read of an optional `ResolvedRelation` member is written `resolved.source ?? ''`, `resolved.through ?? ''`, `resolved.target ?? ''`, `resolved.tag ?? ''`, `resolved.label ?? ''`. The empty string is a manufactured sentinel that flows straight into a query as a column or table name, so an absent field becomes a silent query against `''` rather than a refusal.
    repair: Split `ResolvedRelation` in `types.ts` into a discriminated union on `relationship` where each arm declares exactly the members that arm requires (`through` carries required `through` / `source` / `target`; `morph` carries required `key` / `tag` / `label`). `resolveRelation` already validates each arm's members at `helpers.ts:87-144`, so the narrow is free and every `?? ''` deletes.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: split `ResolvedRelation` into a union discriminated on `relationship` covering ALL five arms — `belongs` (required `column`), `many` / `one` (required `key`), `through` (required `through`/`source`/`target`), `morph` (required `key`/`tag`/`label`) — then delete every `?? ''`; state the defect as a type-model sentinel rather than a runtime query defect.

**Lane DRIFT-RESHAPE/medium:** amend: split `ResolvedRelation` on `relationship` into all five arms — `belongs` requires `column`; `many` and `one` require `key`; `through` requires `through`/`source`/`target`; `morph` requires `key`/`tag`/`label` — and change `Model.#through` to return the `through` arm so `link`/`unlink`/`links` narrow too.

## s17-11 — DRIFT-RESHAPE

11. package=`relation` file=`relation/src/core/types.ts:265` and `relation/src/core/RelationManager.ts:73` rule=`.claude/rules/patterns.md` § Managers § Accessors verdict=CONFIRMED
    wrong: The accessor pair is `model(name): ModelInterface` and `models(): readonly string[]`. The plural accessor returns identifiers where the singular returns the entity, so the pattern's own shape — `entity(key)` / `entities()` — is broken and a consumer calling `models()` gets the wrong kind of thing.
    repair: Make `models(): readonly ModelInterface[]` return `[...this.#resolved.keys()].map((name) => this.model(name))`, and expose the id list, if a consumer needs it, as a separate `names(): readonly string[]`. Update the interface, the guide's Methods row, and the guide fence.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The shape deviation is real and the TSDoc claims conformance it does not have, so this is not an exception. The finding's repair is the wrong fix: `ModelInterface` defaults its row type, so an entity array erases the typing that is the singular accessor's whole point, and the manager holds no instan

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: rename `models()` to `names(): readonly string[]` — the list the guide already describes — and strike the 'Follows the manager accessor pattern' sentence at types.ts:259. Do not add an entity-returning plural until a consumer needs one (AGENTS.md § Design laws, Minimal public API).

## s17-13 — DRIFT

13. package=`relation` file=`relation/src/core/Model.ts:251,307` rule=`.claude/rules/architecture.md` § Functions and orchestration (the leaf test, case 2) verdict=CONFIRMED
    wrong: `#field(record, column)` and `#attached(values)` reach no `#` state and no sibling method — both are pure self-contained computations (a `Reflect.get` projection and a tally over a value list). The rule sends a pure referentially-transparent leaf to a centralized helper so it is independently testable; keeping them private hides two leaves the package's own tests cannot reach.
    repair: Move both to `relation/src/core/helpers.ts` as `readColumn(record: unknown, column: string): unknown` and `countAttached(values: ReadonlyArray<Row | readonly Row[] | undefined>): number`, import them in `Model.ts`, and add a unit test for each. `#index` and `#group` stay private — they call the leaf and are the class's own spine.

