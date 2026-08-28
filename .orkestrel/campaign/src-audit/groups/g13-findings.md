# Findings for group g13

Packages: template, relation, worker, websocket, workspace, codec. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s17-02

2. package=`template`, `relation`, `websocket` file=`template/src/core/helpers.ts:41,72,104,116,183`, `template/src/core/factories.ts:20,40`, `template/src/core/errors.ts:41`, `template/src/core/TemplateManager.ts:39`, `relation/src/core/factories.ts:19`, `websocket/src/server/factories.ts:22` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
   wrong: Published `@example` fences import from the in-repository aliases `@src/core` and `@src/server`, which resolve to nothing for any consumer — the rule reserves those aliases for source and tests. `codec`, `rater`, `workspace`, and `worker/src/core` all use the published specifier in their fences, so these three packages are the drift.
   repair: Replace `'@src/core'` with `'@orkestrel/template'` and `'@orkestrel/relation'` respectively, and `'@src/server'` with `'@orkestrel/websocket/server'`. In `template/src/core/helpers.ts:104` the prose reference to a "`@src/core` sibling" becomes the package name it means.

## s17-09

9. package=`relation` file=`relation/src/core/helpers.ts:23` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) + § Kind purity verdict=CONFIRMED
   wrong: `isRelationDescriptor(value: unknown): value is RelationDescriptor` is a total `Guard<T>` over `unknown` living in `helpers.ts`; the package has no `validators.ts` at all. This is exactly the "coercer misfiled as a guard" class the policy sweep cannot see.
   repair: Create `relation/src/core/validators.ts`, move `isRelationDescriptor` there unchanged, add `export * from './validators.js'` to `index.ts` after `./errors.js`, and import it in `helpers.ts` from `./validators.js`. The barrel star-exports both, so the published surface is identical.

## s17-10

10. package=`relation` file=`relation/src/core/Model.ts:169,170,171,191,196,203,212,225,231,239,344,377,410,411,417,468,478,480` rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: Every read of an optional `ResolvedRelation` member is written `resolved.source ?? ''`, `resolved.through ?? ''`, `resolved.target ?? ''`, `resolved.tag ?? ''`, `resolved.label ?? ''`. The empty string is a manufactured sentinel that flows straight into a query as a column or table name, so an absent field becomes a silent query against `''` rather than a refusal.
    repair: Split `ResolvedRelation` in `types.ts` into a discriminated union on `relationship` where each arm declares exactly the members that arm requires (`through` carries required `through` / `source` / `target`; `morph` carries required `key` / `tag` / `label`). `resolveRelation` already validates each arm's members at `helpers.ts:87-144`, so the narrow is free and every `?? ''` deletes.

## s17-11

11. package=`relation` file=`relation/src/core/types.ts:265` and `relation/src/core/RelationManager.ts:73` rule=`.claude/rules/patterns.md` § Managers § Accessors verdict=CONFIRMED
    wrong: The accessor pair is `model(name): ModelInterface` and `models(): readonly string[]`. The plural accessor returns identifiers where the singular returns the entity, so the pattern's own shape — `entity(key)` / `entities()` — is broken and a consumer calling `models()` gets the wrong kind of thing.
    repair: Make `models(): readonly ModelInterface[]` return `[...this.#resolved.keys()].map((name) => this.model(name))`, and expose the id list, if a consumer needs it, as a separate `names(): readonly string[]`. Update the interface, the guide's Methods row, and the guide fence.

## s17-12

12. package=`relation` file=`relation/src/core/index.ts:6` (class at `relation/src/core/Model.ts:47`) rule=`.claude/rules/architecture.md` § Barrel exports ("Intern it … when its constructor requires a value only its owner produces"; "A row obliges a documented, runnable example") verdict=CONFIRMED
    wrong: `Model` is barrelled, but its constructor takes eight positional arguments including `resolved: ReadonlyMap<string, ResolvedRelation>` and `lookup: (model: string) => RelationContext | undefined` — a closure over the registry that only `RelationManager.#vend` produces. No consumer can construct it, and its class TSDoc carries no `@example`, which the barrel row obliges. `ModelInterface`, not `Model`, is what the public `RelationManager.model()` signature names.
    repair: Remove `export * from './Model.js'` from `index.ts` and add `Model` to the package's parity `INTERNAL` list. `Model.ts` keeps its `export` for `RelationManager.ts` to import.

## s17-13

13. package=`relation` file=`relation/src/core/Model.ts:251,307` rule=`.claude/rules/architecture.md` § Functions and orchestration (the leaf test, case 2) verdict=CONFIRMED
    wrong: `#field(record, column)` and `#attached(values)` reach no `#` state and no sibling method — both are pure self-contained computations (a `Reflect.get` projection and a tally over a value list). The rule sends a pure referentially-transparent leaf to a centralized helper so it is independently testable; keeping them private hides two leaves the package's own tests cannot reach.
    repair: Move both to `relation/src/core/helpers.ts` as `readColumn(record: unknown, column: string): unknown` and `countAttached(values: ReadonlyArray<Row | readonly Row[] | undefined>): number`, import them in `Model.ts`, and add a unit test for each. `#index` and `#group` stay private — they call the leaf and are the class's own spine.

## s17-14

14. package=`template` file=`template/src/core/helpers.ts:189` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Shape values → `*/shapers.ts`) + `.claude/rules/names.md` § Fixed derivation/construction forms (`*Shape` is a value, "not a function or type") verdict=CONFIRMED
    wrong: `placeholderShape` is a function producing a `ContractShape`, so it is a shaper sitting in `helpers.ts`, and its name takes the `*Shape` form the rule reserves for a shape **value**. Both halves are wrong at once.
    repair: Create `template/src/core/shapers.ts`, move the function there, rename it to the verb form its file implies (`shapePlaceholders`), add `export * from './shapers.js'` to `index.ts`, and update `Template.ts:14,74` and the guide's surface row.

## s17-15

15. package=`template` file=`template/src/core/helpers.ts:135-156` and `template/src/core/Template.ts:157-173` rule=`AGENTS.md` § Work process step 5 (Consolidate) + `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `fillTemplate` and `Template#validate` each carry their own copy of the token scan — fresh `RegExp` from `FILL_PATTERN`, trim the raw token, find the declared placeholder by exact name, fall back to `token.split('.')`, resolve through `resolveSafeField`, then apply `required !== false`. `Template.ts:127-131` states the two must agree exactly; nothing but hand-maintenance makes them.
    repair: Extract one exported leaf in `helpers.ts` — `scanTokens(content, values, placeholders): readonly { token, value, declared, required }[]` — walking the pattern once, and have `fillTemplate` build its output and `validate` build its `missing` list from that one walk. Unit-test the leaf.

## s17-16

16. package=`template` file=`template/src/core/types.ts:185` and `template/src/core/TemplateManager.ts:71` rule=`.claude/rules/names.md` § Tallies ("A lone unambiguous tally is `count`") + § General vocabulary ("Do not alternate `count`/`length`/`size`/`total`") verdict=CONFIRMED
    wrong: `TemplateManagerInterface.size` is the manager's only tally, so the rule fixes it as `count`. `RelationManagerInterface.count`, `WorkspaceManagerInterface.count`, `WorkspaceInterface.count`, and `WorkerInterface.count` all use `count` for the same fact, so `size` is a lone synonym across the slice.
    repair: Rename to `count` in `types.ts:185` and `TemplateManager.ts:71`, and update the guide's `TemplateManagerInterface` surface row and the `## Methods` preamble at `guides/template.md:146`.

## s17-17

17. package=`template` file=`template/src/core/types.ts:190` and `template/src/core/TemplateManager.ts:113` rule=`.claude/rules/patterns.md` § Managers § Accessors (`entity(key): EntityInterface | undefined`) + `.claude/rules/typescript.md` § Errors and outcomes ("Optional missing lookup → Return `undefined`") verdict=CONFIRMED
    wrong: `template(id): TemplateInterface` throws `TemplateError` coded `NOTFOUND` for an unknown id where the accessor pattern and the outcome table both fix `undefined`. `guides/template.md:185` labels this row "AGENTS §9.1 singular accessor" — the guide asserts conformance to the very rule the signature breaks, so the drift is documented as compliance.
    repair: Return `TemplateInterface | undefined` from `template(id)` and delete `#throwNotFound`. Keep the throw only where a value is required to proceed — `fill` / `validate` / `parameters` by id — and say so in the guide row rather than claiming the accessor pattern.

## s17-18

18. package=`template` file=`template/src/core/types.ts:194-197` and `template/src/core/TemplateManager.ts:174,198` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `remove()` with no argument and `clear()` both empty the registry, differing only in which event fires (`remove` per instance versus one `clear`). A consumer has two public verbs for one outcome and no way to predict which one the package means.
    repair: Drop the no-argument `remove()` overload from the interface and the implementation, leaving `remove(id)` / `remove(ids)` for the targeted forms and `clear()` as the sole remove-all. Emit `remove` per instance from inside `clear()` before emitting `clear`, so no observation is lost.

## s17-19

19. package=`template` file=`template/src/core/types.ts:183` (class at `template/src/core/TemplateManager.ts:46`) rule=`.claude/rules/patterns.md` § Stateful emitters (step 7: "Call `this.#emitter.destroy()` last in the entity's `destroy()`") verdict=CONFIRMED
    wrong: `TemplateManager` owns an `Emitter` (`TemplateManager.ts:48`) but neither `TemplateManagerInterface` nor the class declares `destroy()`, so a consumer has no way to release the listeners wired through `options.on`. `Rater`, `Worker`, and `Workspace` in this same slice all declare `destroy()` for exactly this reason.
    repair: Add `destroy(): void` to `TemplateManagerInterface`, implement it as `this.#templates.clear()` then `this.#emitter.destroy()` last, and add its `## Methods` row to the guide.

## s17-20

20. package=`template` file=`template/src/core/types.ts:188` and `template/src/core/helpers.ts:125` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") + `AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`") verdict=CONFIRMED
    wrong: Two public signatures declare their options shape inline: `register(template, options?: { readonly replace?: boolean })` and `fillTemplate(content, values, options?: TemplateFillOptions & { readonly placeholders?: readonly TemplatePlaceholder[] })`. Both are public option bags with no name a consumer can import or a guide row can reference.
    repair: Declare `TemplateRegisterOptions { readonly replace?: boolean }` and `TemplateFillContext extends TemplateFillOptions { readonly placeholders?: readonly TemplatePlaceholder[] }` in `types.ts`, and reference them from both signatures.

## s17-21

21. package=`template` file=`template/src/core/types.ts:76` and `template/src/core/Template.ts:178` rule=`AGENTS.md` § Design laws ("Derive state. … Do not store a second flag or label that can drift") verdict=CONFIRMED
    wrong: `TemplateValidationResult.valid` is written as `missing.length === 0` at `Template.ts:178` — a stored flag whose whole content is a derivation of the sibling field one line above it.
    repair: Remove `valid` from `TemplateValidationResult`; consumers read `result.missing.length === 0`. Update the guide's `TemplateValidationResult` surface row and any fence asserting `valid`.

## s17-22

22. package=`template` file=`template/src/core/Template.ts:33-40` rule=`.claude/rules/architecture.md` § Class order (private `#` fields, then constructor, then "Public interface: getters, then methods") verdict=CONFIRMED
    wrong: `Template` declares eight public data members as plain instance fields assigned in the constructor body, where the class-order rule's public tier is getters over `#` fields. Every other class in the slice — `Rater`, `Model`, `Worker`, `Workspace`, `WorkspaceManager`, `NodeWebSocket`, `Thread` — holds its state in `#` fields and exposes readonly getters, so `Template` is the single outlier and its fields are the only ones a consumer can see the storage of.
    repair: Move `id`, `name`, `content`, `placeholders`, `summary`, `description`, `category`, and `tags` to `#` fields and expose each through a readonly getter typed as `TemplateInterface` declares it. `definition()` reads the `#` fields directly.

## s17-23

23. package=`worker` file=`worker/src/server/validators.ts:15` rule=`.claude/rules/patterns.md` § Validation and contracts (`validators.ts` holds "Total `is*` guards: `(unknown) => value is T`") + `.claude/rules/architecture.md` § Kind purity ("Wrong file, right name → move it") verdict=CONFIRMED
    wrong: `isReply(value: unknown, id: string): value is Reply` takes a second correlation argument, so it is not the total single-argument `Guard<T>` `validators.ts` is defined to hold — it is a correlated predicate, the same class as the rule's own `isVacant` example, which the rule sends to `helpers.ts`.
    repair: Move `isReply` to `worker/src/server/helpers.ts` and delete `validators.ts` with its barrel row, or keep the file and give it a genuine `Guard<Reply>`. The barrel star-exports `helpers.js` already, so the published surface is unchanged either way.

## s17-24

24. package=`worker` file=`worker/src/server/factories.ts:87` and `worker/src/server/NodeWorker.ts:16` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Value-level identifiers (Factory `create{Entity}`) verdict=CONFIRMED
    wrong: `createNodeWorker` is the `create{Entity}` form for entity `NodeWorker`, but it returns `WorkerInterface<TInput, TResult>` and never a `NodeWorker`. The class named `NodeWorker` is a bound-method builder whose only public method is `build()`. One name therefore denotes two unrelated things in one directory, and the factory's own TSDoc has to say "Returns the plain {@link WorkerInterface}" to undo the name.
    repair: Rename the class to what it is — `NodeWorkerBuilder`, or `ThreadWorkerSource` — leaving `createNodeWorker` as the factory whose entity is the thread-backed worker. `NodeWorker.ts` renames to match, and `factories.ts:7,90` follows.

## s17-25

25. package=`worker` file=`worker/src/server/types.ts:13` (type at `worker/src/server/types.ts:19`, published through `worker/src/server/index.ts:1`) rule=`.claude/rules/architecture.md` § Barrel exports ("If a declaration should not be public, make it a true local or runtime-private detail … Never leave an intentional reusable export stranded") verdict=CONFIRMED
    wrong: `Reply`'s own TSDoc says "Internal plumbing rather than public call surface", yet it is exported from `types.ts` and star-exported by the server barrel, so `@orkestrel/worker/server` publishes a type the package declares non-public. The barrel and the documentation state opposite things about the same symbol.
    repair: Decide one way in the same edit. Either drop the "internal plumbing" sentence and document `Reply` as the published wire envelope with an `@example`, or move the type into `helpers.ts`-local scope and name it in the package's parity `INTERNAL` list.

## s17-26

26. package=`websocket` file=`websocket/src/server/types.ts:31,75,86` rule=`AGENTS.md` § Design laws ("Minimal public API. Add or substantively expand a capability with its first real consumer; do not speculate") + `.claude/rules/architecture.md` § Wrapper test ("Delete … rename-only helpers/getters") verdict=CONFIRMED
    wrong: `WebSocketCloseCode`, `WebSocketMessage`, and `WebSocketClose` are published through the barrel and listed in `guides/websocket.md:88,91,92`, and no signature in `src/` uses any of them. `NodeWebSocketEventMap.close` inlines `readonly [code: number | undefined, reason: string | undefined]` rather than referencing `WebSocketClose`; `WebSocketCloseCode` is a bare alias for `number` that adds nothing at all; nothing produces or consumes `WebSocketMessage`.
    repair: Delete `WebSocketCloseCode` and `WebSocketMessage` outright, and either use `WebSocketClose` in the `close` event tuple or delete it too. Remove the three guide Surface rows in the same change.

## s17-27

27. package=`websocket` file=`websocket/src/server/helpers.ts:192` rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("`is*`: total `Guard<T>`; never throws; returns false off-shape") verdict=CONFIRMED
    wrong: `isWebSocketFrameCanonical(buffer): boolean | undefined` is tri-state — it returns `undefined` while the length prefix is still incomplete — under a name the rule reserves for a total predicate. `NodeWebSocket.ts:233-236` has to compare against `false` explicitly because `undefined` is not falsy in the sense the name implies, and a caller writing the obvious `if (!isWebSocketFrameCanonical(buffer))` fails an incomplete buffer as a protocol error.
    repair: Rename to the family this file already uses for a fact read off a partial buffer — `measureWebSocketFrame` returns `number | undefined` for exactly the same reason — giving `readWebSocketCanonical` or `checkWebSocketCanonical`. Update `NodeWebSocket.ts:14,233` and the guide's row at `guides/websocket.md:51`.

## s17-28

28. package=`websocket` file=`websocket/src/server/helpers.ts:287,290,293`, `websocket/src/server/NodeWebSocket.ts:89,93,96,99,102,181,196,201` rule=`.claude/rules/typescript.md` § Errors and outcomes ("Programmer error or invalid argument → Throw an `AppError`"; "Error classes expose a machine-readable `code`"; "Every public error class ships with a guard") verdict=CONFIRMED
    wrong: Eleven invalid-argument paths across the public surface throw a bare `RangeError` with a prose message and no `code`, so a consumer cannot branch on the failure. `websocket` has no `errors.ts` at all, while `rater`, `relation`, `template`, and `workspace` each ship a coded error class plus its guard for the same class of misuse.
    repair: Add `websocket/src/server/errors.ts` with `WebSocketError` carrying `code: WebSocketErrorCode` and optional `context`, plus `isWebSocketError`; declare `WebSocketErrorCode` in `types.ts` (`'OPCODE' | 'MASK' | 'PAYLOAD' | 'TIMEOUT' | 'KEY' | 'PROTOCOL' | 'CODE' | 'REASON'`); throw it from all eleven sites; add the barrel row and the guide's Errors section.

## s17-29

29. package=`workspace` file=`workspace/src/core/helpers.ts:75,100` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
    wrong: `isFile(value: unknown): value is FileInterface` and `isWorkspaceSnapshot(value: unknown): value is WorkspaceSnapshot` are total `Guard<T>`s over `unknown` sitting in `helpers.ts`; the package has no `validators.ts`. `isText`, `isBinary`, and `isValidRange` are correctly placed — they narrow a typed argument, so they are predicates rather than guards — which makes the two misplaced ones stand out rather than blend in.
    repair: Create `workspace/src/core/validators.ts`, move `isFile` and `isWorkspaceSnapshot` there together (the second calls the first), add `export * from './validators.js'` to `index.ts`, and update the import in `workspaces/stores/DatabaseWorkspaceStore.ts:7`.

## s17-30

30. package=`workspace` file=`workspace/src/core/factories.ts:59,77` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates, pass-through factories") verdict=CONFIRMED
    wrong: `createTextContent(text, language)` returns `{ text, language }` and `createBinaryContent(data, mime)` returns `{ data, mime }`. Neither adds a boundary, invariant, composition, translation, lifecycle, or narrower contract — the return type is the union, which is wider than the literal a consumer writes by hand, so the factory gives back less type information than the object literal it replaces.
    repair: Delete both and update every call site to the object literal, including the `@example` at `factories.ts:32` and the guide fences. If the arm selection is judged worth naming, keep them only after tagging the union so the factory has an invariant to establish.

## s17-31

31. package=`workspace` file=`workspace/src/core/types.ts:11`, `workspace/src/core/factories.ts:77`, `workspace/src/core/helpers.ts:60,117`, `workspace/src/core/types.ts:3` rule=`.claude/rules/names.md` § Rejected naming ("Generic words: `data`, `info`, `item`, `thing`, `obj`") verdict=CONFIRMED
    wrong: The binary arm of `FileContent` names its member `data`, an explicitly rejected generic word, while the text arm names its member `text` for exactly what it holds. The member holds base64, and the sibling helper `decodedSize(base64: string)` already knows that.
    repair: Rename the member to `base64` in `types.ts:11`, `factories.ts:77-78`, `helpers.ts:60,61,117`, `isFile`'s check at `helpers.ts:83`, the guide's `FileContent` row and its `{ data, mime }` prose at `guides/workspace.md:200`, and the `@example` fences that spell the literal.

## s17-32

32. package=`workspace` file=`workspace/src/core/helpers.ts:150` rule=`.claude/rules/names.md` § Standalone helpers (`{verb}{Noun}`) verdict=CONFIRMED
    wrong: `decodedSize` is adjective-noun, not `{verb}{Noun}`, and it is the only helper in the file that breaks the form — its neighbours are `inferLanguage`, `computeSize`, `countLines`, `clampPosition`, `clampRange`, `offsetAt`, `sliceRange`, `spliceRange`, and `escapeRegExp`.
    repair: Rename to `computeDecodedSize`, matching the `compute*` prefix the rule fixes for a deterministic calculation and the sibling `computeSize` it feeds. Update `helpers.ts:117` and the guide row at `guides/workspace.md:88`.

## s17-33

33. package=`workspace` file=`workspace/src/core/constants.ts:5` rule=`.claude/rules/typescript.md` § Comments and API documentation + `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: The TSDoc link is written `{@link import('./helpers.js').inferLanguage}`. A TSDoc declaration reference is not a TypeScript type expression, so this resolves to nothing and ships as literal text in the generated documentation.
    repair: Write `{@link inferLanguage}`.

## s17-34

34. package=`workspace` file=`workspace/src/core/Workspace.ts:221` rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: `move(from, to?)` falls back to `this.#move(from, to ?? '')`, so a missing destination silently becomes a move to the path `''` rather than a refusal. The same `?? ''` sentinel appears at `Workspace.ts:183,198,208` for absent `content`, where it silently writes an empty file.
    repair: In `#move`, refuse an absent destination — the overload set already requires it when `from` is a string, so `if (to === undefined) return false` is the honest branch. For `write` / `prepend` / `append`, take the same decision explicitly rather than through a sentinel.

## s17-35

35. package=`codec` file=`codec/src/core/index.ts:1-2` (declarations at `codec/src/core/constants.ts:9,15,92,98,136`) rule=`.claude/rules/architecture.md` § Barrel exports ("Expose every intentional top-level source export through its correct environment barrel") verdict=EXEMPT
    wrong: `constants.ts` exports `BASE64_ALPHABET`, `BASE64_LOOKUP`, `HEX_ALPHABET`, `HEX_LOOKUP`, and `WINDOWS_1252_HIGH`, and `index.ts` omits `./constants.js`, so five top-level source exports are outside the barrel.
    repair: None — `guides/codec.md:63-64` states the exception and its reason ("the alphabets and the reverse lookups behind them are module data, not public API, because publishing an alphabet invites hand-rolling the coding it belongs to"), repeated for the code page at `guides/codec.md:106-107`. The centralized-file rule forces the `export` keyword and the guide rules the capability non-public; this is the only reachable state.

## s17-36

36. package=`relation` file=`relation/src/core/types.ts:133` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") verdict=EXEMPT
    wrong: `RelationProps = Record<string, Row | readonly Row[] | undefined>` is a published mutable record type.
    repair: None — `types.ts:129-131` states the exception ("This is the mutable bag a `Model` fills while populating a record set; `Loaded<T>` is a base row intersected with its `Readonly` form"), and the public read shape `Loaded<T>` at `types.ts:144` is readonly.

## s17-37

37. package=`workspace` file=`workspace/src/core/Workspace.ts:116,218,231`, `workspace/src/core/WorkspaceManager.ts:112` rule=`.claude/rules/patterns.md` § Managers § Batch operations ("An id list applies to those items and returns true only when all succeed") verdict=EXEMPT
    wrong: `has(paths)` returns true when **any** path is present, and `move(mapping)` / `remove(paths)` / `WorkspaceManager.remove(ids)` return true when **any** one succeeded — the inverse of the rule's all-succeed contract. `template`'s `remove(ids)` implements the all-or-nothing form, so the two packages ship opposite batch semantics under the same signature.
    repair: None inside this unit — `guides/workspace.md:298,337,348,411` states the exception and its reason ("any present", "any one removal counts", "`remove` mirrors that leniency, reporting whether anything was actually dropped"). This is a rule-versus-guide conflict, referred below.

## s17-38

38. package=`workspace` file=`workspace/src/core/Workspace.ts:101` versus `Workspace.ts:102-106` rule=`.claude/rules/typescript.md` § Errors and outcomes verdict=EXEMPT
    wrong: `read(path)` returns `undefined` for a binary file while `read(path, range)` throws `WorkspaceError` coded `MODALITY` for the same file, so one method reports one condition two ways depending on arity, and the declared `ReadResult | undefined` return never produces `undefined` on that path.
    repair: None — `guides/workspace.md:308` states the exception with its reason ("A ranged read of binary content is the one that throws `MODALITY`, because the caller…"), and `guides/workspace.md:269` documents the code.