# Unit breaking-interpret — apply the deferred breaking repairs in interpret

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to interpret — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/interpret.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/interpret.md`:

- **s12-25** (mixed): Delete GeneratorOptions and the discarded createGenerator(_options?) parameter, leaving createGenerator(): GeneratorInterface. — edits: GeneratorOptions remove [src/core/types.ts:507]; createGenerator change [src/core/factories.ts:173] — guide: guides/interpret.md GeneratorOptions Types row and createGenerator factory row
- **s12-26** (mixed): Replace createTemplate(data: Template): Template with a throwing unknown-in helper under a new name, widening the parameter so the guard is reachable. — edits: createTemplate rename [src/core/factories.ts:291] — guide: guides/interpret.md createTemplate factory row and parseTemplate pairing note
- **s12-29** (mixed): Rename InterpretInterface.register/unregister to add/remove, rename the InterpretEventMap row to add, and give remove the remove()/remove(id)/remove(ids) overload set. — edits: InterpretInterface.register rename → add [src/core/types.ts:823]; InterpretInterface.unregister rename → remove [src/core/types.ts:824]; Interpret.register rename → add [src/core/Interpret.ts:324]; Interpret.unregister rename → remove [src/core/Interpret.ts:330]; InterpretEventMap.register rename → add [src/core/types.ts:352] — guide: guides/interpret.md InterpretInterface register/unregister Methods rows and InterpretEventMap register row
- **s12-30** (mixed): Make Intent.action and Intent.domain optional and return undefined for an unmatched axis in classifyIntent; drop the private -1 accumulator clause. — edits: Intent.action change [src/core/types.ts:153]; Intent.domain change [src/core/types.ts:154] — guide: guides/interpret.md Intent Types row and classifyIntent examples
- **s12-34** (option-key): Group lexicon and formatters under a narrator key on InterpretOptions, removing those top-level option keys. — edits: InterpretOptions.lexicon remove [src/core/types.ts:653]; InterpretOptions.formatters remove [src/core/types.ts:654] — guide: guides/interpret.md InterpretOptions Types row for lexicon/formatters
- **s12-35** (behavior): Stop destroy() from tearing down a caller-supplied options.context; current consumers of that teardown are an unresolved referral. — edits: InterpretInterface.destroy change [src/core/types.ts:829]; Interpret.destroy change [src/core/Interpret.ts:355] — guide: guides/interpret.md InterpretInterface.destroy Methods row and Interpret class TSDoc teardown sentence
- **s12-37** (behavior): Stop Generator.generate from unconditionally writing Sum/Count/Average/Minimum/Maximum onto a consumer's subject; the opt-in mechanism is not settled. — edits: GeneratorInterface.generate change [src/core/types.ts:697] — guide: guides/interpret.md Generator TSDoc/Methods rows that document the unconditional Sum/Count/Average/Minimum/Maximum fields
- **s12-38** (remove): Delete the empty DEFAULT_ABBREVIATIONS, DEFAULT_CORRECTIONS, DEFAULT_ACTIONS, DEFAULT_DOMAINS, and DEFAULT_VERBS exports; leave DEFAULT_CONTRACTIONS. — edits: DEFAULT_ABBREVIATIONS remove [src/core/constants.ts:88]; DEFAULT_CORRECTIONS remove [src/core/constants.ts:91]; DEFAULT_ACTIONS remove [src/core/constants.ts:94]; DEFAULT_DOMAINS remove [src/core/constants.ts:97]; DEFAULT_VERBS remove [src/core/constants.ts:100] — guide: guides/interpret.md Constants rows for the empty DEFAULT_* records
- **s12-39** (remove): Delete the unused INTERPRET_ID export and its guide rows. — edits: INTERPRET_ID remove [src/core/constants.ts:31] — guide: guides/interpret.md INTERPRET_ID Constants rows
- **s12-42** (rename): Rename size to count on RecordManagerInterface, TemplateManagerInterface, SubjectManagerInterface, and DefinitionManagerInterface together. — edits: RecordManagerInterface.size rename → count [src/core/types.ts:592]; TemplateManagerInterface.size rename → count [src/core/types.ts:739]; SubjectManagerInterface.size rename → count [src/core/types.ts:756]; DefinitionManagerInterface.size rename → count [src/core/types.ts:770] — guide: guides/interpret.md manager Methods rows for size; same drift recorded in program, brief, middleware, msg, pool, and template as a separate fleet unit
- **s12-43** (rename): Rename ManagerAddOptions to RecordOptions in a coordinated publish with @orkestrel/brief; shipping interpret alone breaks brief at its next re-pin. — edits: ManagerAddOptions rename → RecordOptions [src/core/types.ts:612] — guide: guides/interpret.md ManagerAddOptions Types row; brief must rename the same import in the same wave
- **s12-45** (signature): Close the mismatch where canonicalize publishes visited then documents it as internal; the leaf-vs-promotion branches share no repair. — edits: canonicalize change [src/core/helpers.ts:573] — guide: guides/interpret.md canonicalize helper Surface row

The fix-round audit findings for this package that this unit also carries:

- s12-21: delete the parenthetical at src/core/helpers.ts:201-202 and re-prove with separate sweeps for 'AGENTS' and '§' over src/

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s12-26: delete `createTemplate`; the class raises its own `NOTFOUND` when `parseTemplate` returns `undefined`. No throwing twin beside the parser.
- s12-37: bind through the existing `Template.computations` and delete the unconditional emission; a string list of aggregate names is a behavior-selecting magic string and is refused.
- s12-42: `count` on every manager interface including the landed `RecordManagerInterface`, consistently with template and brief.
- s12-43: `ManagerAddOptions` → `RecordOptions`; the report names brief as the paired consumer.
- s12-45: public `canonicalize(value)` takes one parameter; `canonicalizeNode(value, ancestors)` is exported as the recursive leaf and tested.
- s12-25, s12-29, s12-30, s12-34, s12-35, s12-38, s12-39: as the ledger has them (`GeneratorOptions` gone; `add`/`remove` with the overload set replace `register`/`unregister`; `Intent.action` and `Intent.domain` optional with guarded reads and no `-1`; narrator settings under one `narrator` key; the empty default records and `INTERPRET_ID` gone).
- Audit carrier: a wrap-tolerant sweep for `AGENTS` and for the section sign returns no hit under `src`.

**Vocabulary.** The naming rule text this phase lands in scaffold's `.claude/rules/names.md`; this
checkout's vendored copy predates it, so apply the text as quoted here:

From `.claude/rules/names.md` § Standalone helpers (scaffold, landed 2026-09-01, fix rounds applied):

- A helper prefix has one project-wide meaning:
  - `extract*` extracts structure.
  - `infer*` derives.
  - `compute*` calculates deterministically.
  - `matches*` is a predicate.
  - `build*` assembles a composite value from parts and is neither a factory nor a combinator named for its constituents; see `create*` and `*Of` in § Fixed derivation/construction forms.
  - `read*` obtains a value from a live host object, a stream position, or a byte layout, returns it or throws, and never coerces; a coercing helper is `parse*` in § Fixed derivation/construction forms.
  - `resolve*` picks the effective value from options and defaults.
  - `scan*` walks a structure and returns its findings.
  - `describe*` takes a finding and returns the human-readable message that names it.
  - `normalize*` returns the canonical form of a value of the same type.
  - `collect*` gathers members into a collection.
  - `render*` produces text or markup from a value that is not a finding.
  - `supports*` is a capability predicate and narrows no type.

From § Fixed derivation/construction forms:

- A form's contract binds a new name; `.claude/rules/architecture.md` § Kind purity names the retained names that keep a form outside its file, such as `createWriteDirectory` and `isVacant`.
- `is*`: total `Guard<T>`; never throws; returns false off-shape.
- `parse*`: coercion producing `T | undefined`; cross-type conversion never belongs in a guard.
- `create*`: the factory form; `.claude/rules/architecture.md` § Kind purity states what a factory is and where it lives.
- `*Of`: combinator named for its constituents, combining them into a container/guard/value, such as `arrayOf(guard)` or `boundsOf(min, max)`.

From § General vocabulary:

- An option key, constant, or member that transliterates an external protocol field, format field, or engine pragma keeps the external wording in this project's casing, and its TSDoc names the source it mirrors: the `foreignKeys` key mirrors the `PRAGMA foreign_keys` statement, and the `keepAlive` key mirrors the Ollama `keep_alive` field.
- Mirror no banned word: a mirrored name never uses `kind` or `type` as a member name, and never uses a word § Rejected naming lists. A Compound File Binary (CFB) directory entry's object-type byte takes a named discriminant.

Unchanged and still binding, § Fixed lifecycle vocabulary: `clear` resets state without destroying the entity (`reset` is a banned synonym); `execute` runs a unit of work (`run` and `exec` are banned synonyms); `destroy` ends the entity (`shutdown` is a banned synonym). § Tallies: a lone unambiguous tally is `count`. Placement: `.claude/rules/architecture.md` § Kind purity decides what a factory is and where every function lives; the name form follows placement.

External consumers of each moved symbol (for the record
only; their units follow): `.orkestrel/campaign/fix/breaking-radius.json`.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/quality.md`, `.claude/rules/workspace.md`,
`.claude/rules/portability.md` (vendored in the repository under `.claude/rules/`, or, where the checkout carries no such directory, the installed copy at `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` that its `AGENTS.md` pointer names); skill
`orkestrel-harden-package` in its structural lane with `references/centralization.md`; guide
`guides/interpret.md`.

**Host.** Linux, bash. Repository /home/user/fleet/interpret on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`. Build a throwaway probe, where you need one, under the system temporary directory, never under the checkout's `tmp/`.

**Measurements.** `contract`, `emitter`, `guide`, `html`, `markdown`, `reason`, `template`, `test` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** L0 landed: @orkestrel/contract at 2c15840 (main's latest reconciled; traversal spines interned with no state parameter on any door; ValueToSchemaOptions.limits.depth/.properties with ValueToSchemaLimits; INTRINSICS.reflect.{read,write,members,present,describe,define,prototype,apply,construct} replacing the flat reveal/declare/parent and the flat Reflect keys; validateShape, buildStringFaults/buildNumberFaults/buildArrayFaults with a trailing pattern argument, matchesISOInstant, ownPattern; expansion is number | undefined), @orkestrel/msg (category discriminants, MSG_CATEGORY_*), @orkestrel/sse (clear() replaces reset()). L1 landed: @orkestrel/budget (BudgetOptions.consumer replaces consume), @orkestrel/csv (renderTSV gone; ParseOptions.comment has no false arm; parseInteger/parseReal/parseBoolean in parsers.ts), @orkestrel/html (HTMLHandlerMap, HTMLSanitizeOptions, HTMLDistillOptions; the create*Contract doors deleted), @orkestrel/ndjson (clear() replaces reset()), @orkestrel/indexeddb at bf4730e (no published query parameter admits null; IndexedDBStoreInterface.path is KeyPath | undefined; rangeExactKey and rangeBetweenKeys are deleted and callers use IDBKeyRange.only and IDBKeyRange.bound; IndexedDBCursorInterface.value is Row | undefined; IndexedDBUpgradeContext carries only transaction/old/version/stores/indexes with stores.names/create/drop/open and indexes.create/drop; IndexedDBRecordStoreInterface is the shared keyed record surface), @orkestrel/sqlite at 5a9340b (SQLiteDatabaseInterface.exec is execute). L2 landed: @orkestrel/console at 77ab53f (the pass-through factories createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, createProgress are deleted and the classes are constructed directly; withCapture is createCaptureResult in factories; DEFAULT_CAPTURE_LEVELS is removed in core and server and callers read CAPTURE_LEVELS or STREAM_LEVELS; the server DEFAULT_CAPTURE_LIMIT is DEFAULT_STREAM_LIMIT; LEVELS is LOG_LEVELS; columnsOf is inferColumns; Spinner success/failure are succeed/fail and Progress failure is fail), @orkestrel/database at 2ded05a (driverFindings is scanDriver; compileWhere, compileOrder, compilePage are compileWhereSQL, compileOrderSQL, compilePageSQL; matchesFuzzy and escapeLike are removed; INDEXABLE_STORAGE is a frozen readonly array; the IndexedDB column.remove migration fails closed with MIGRATION on a non-record stored value), @orkestrel/markdown at 9c0dfc7 (isWhitespace is isFlankingWhitespace), @orkestrel/process at 8aa5dce (ProcessChild is ProcessChildInterface), @orkestrel/reason at c363201 (isSubject is removed, narrow with isRecord from @orkestrel/contract; every bare-noun value constructor is create{Entity} in factories, such as createCheck, createRule, createFact, createEquation, createInference, createStaticFactor, createFieldFactor, createLookupFactor, createRangeFactor, createFactorGroup, createQuantitativeDefinition, createLogicalDefinition, createSymbolicDefinition, createInferentialDefinition; the managers' collection setter is seat(items), and seat(variables) on the variable manager; isWithinBounds is matchesBounds; the append/prepend/replace helpers name their parameter by its domain noun), @orkestrel/template at 2eccc62 (TemplateManagerInterface.size is count; template(id) returns TemplateInterface | undefined and only fill, validate, and parameters throw NOTFOUND; remove keeps its no-argument overload), @orkestrel/websocket at abcf675 (WebSocketCloseCode, WebSocketMessage, WebSocketClose are removed; isWebSocketFrameCanonical is parseWebSocketCanonical; a WebSocketError with code OPTION, LIMIT, CLOSE, or FRAME and the guard isWebSocketError replace every RangeError createNodeWebSocket, ping, close, and encodeWebSocketFrame threw, so a consumer catching RangeError from them narrows with isWebSocketError instead; the published surface otherwise unchanged). @orkestrel/middleware (a reshaped session and multipart surface) and @orkestrel/table are in flight and sit in no L3 closure. W-DEV landed in @orkestrel/test (readStyle, readToken, readRootToken, readPixels, parseCSSColor, matchesColor; PortfolioInterface.placements) and @orkestrel/guide (helpers renamed verb-first; Source.methods follows extends, so an extending interface's Methods table must list inherited members). Every one of these is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs interpret`); this checkout's tests/guides.test.ts already imports the renamed guide helpers. Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install..

## Unknowns

Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan's ruling for each is stated in the row summary above, and where it is not, stop and report the row..

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/interpret.md`, `guides/README.md` rows for this package, the package's own `README.md`
(it ships in `files` and its fences name the surface), and the parity `INTERNAL` list where the
package keeps one.

**Shared (report-only).** none.

**Off-limits.** `package.json`, `package-lock.json`, `AGENTS.md`, `.claude/**`, `.agents/**`,
`.codex/**`, `.cursor/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, vendored
dependency guide mirrors (`guides/<other-package>.md`), `.orkestrel/**`, `tmp/**`, and every file
outside the repository.

**What asserts the state this change ends.** Every test that names a renamed or removed symbol,
every guide row and fence that spells it, every `@example`, the parity test's `INTERNAL` list, and
any fixture or snapshot carrying the old name. Derive the set by running the suite after the
rename; the red tests are the list.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, stage, push, install, or
discarding `git` command. Tree-wide `format` is allowed only to converge after `npm run lint`,
then the non-mutating chain proves the state.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Work row by row in the
listed order (a row's `prerequisite` rows first). For each: re-verify the symbol at its ledger
location, apply the rename or removal with every in-package consumer, rewrite the TSDoc first
sentence in the third-person form where you touch a block, move the guide row and every fence,
and update or remove the tests that named the old surface. Sweep prose too: a renamed interface member or helper also appears in backticks, in `{@link}` targets, and in guide sentences, and the parity test resolves only exports, so run a word-boundary search for every old name over `src`, `tests`, and `guides` after the rename, run it again case-insensitively for the name's inflected forms (`-s`, `-ed`, `-ing`, and the noun a verb becomes), because a test title or a sentence that used the old name as an English verb or plural hides from the bare boundary, and classify every hit before you report. TTTDD binds: change `types.ts` first
where the row moves a contract. Where a row removes a capability, delete its tests and guide
rows with it. After the last row, run the centralization sweep from `references/centralization.md`
over the files you touched, then the gate chain:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per row — applied, or refused with the rule text that refuses it, or stopped
with the deviation; the symbols moved (`from → to`, or removed); files touched; the tests
changed; the gate results with an excerpt for any failure; `git diff --stat`; whether the built
`dist/` moves (always yes for a rename). Delivered as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a row's target name collides with an existing export, when two rows move the
same symbol differently, when a rename would require a change in an off-limits file, or when the
gate chain fails for a cause you cannot attribute. Decide, record, and carry on from the placement
of a moved block within its file and the wording of a rewritten TSDoc sentence.

## Acceptance criteria

1. `grep -rn '\b<old-name>\b' src tests guides` returns no hit for any renamed or removed symbol
   (excluding a deliberate "renamed from" note in a commit-facing comment, which this unit does not
   write).
2. `npm run check` exits 0.
3. `npm run lint:check` and `npm run format:check` exit 0.
4. `npm run build` exits 0 and `npm test` exits 0.
5. `guides/interpret.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
