# Unit breaking-terminal — apply the deferred breaking repairs in terminal

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to terminal — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/terminal.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/terminal.md`:

- **s12-48** (mixed): Make KeyEvent.name optional and stop parseKey from returning the empty-string sentinel. — edits: KeyEvent.name change [src/core/types.ts:35]; parseKey change [src/core/helpers.ts:79] — guide: guides/terminal.md KeyEvent/parseKey rows that pin name: '' as intended
- **s12-52** (signature): Change terminals() to return readonly PromptInterface[] and expose names as a separate names() accessor. — edits: TerminalManagerInterface.terminals change [src/core/types.ts:670]; TerminalManager.terminals change [src/core/TerminalManager.ts:103] — guide: guides/terminal.md TerminalManagerInterface.terminals Methods row
- **s12-54** (rename): Rename the noun-phrase render/filter helpers to verb-noun form; rawCapable's replacement and whether the *Reduce family or a class promotion rides along are not settled. — edits: promptHeader rename → renderPromptHeader [src/core/helpers.ts:294]; hintedHeader rename → renderHintedHeader [src/core/helpers.ts:308]; submitHeader rename → renderSubmitHeader [src/core/helpers.ts:319]; errorLine rename → renderErrorLine [src/core/helpers.ts:324]; inputView rename → renderInputView [src/core/helpers.ts:353]; passwordView rename → renderPasswordView [src/core/helpers.ts:410]; confirmView rename → renderConfirmView [src/core/helpers.ts:470]; selectView rename → renderSelectView [src/core/helpers.ts:531]; checkboxView rename → renderCheckboxView [src/core/helpers.ts:616]; editorView rename → renderEditorView [src/core/helpers.ts:725]; rawCapable rename [src/server/helpers.ts:100]; enabledChoices rename → filterEnabled [src/server/helpers.ts:210]; disabledChoices rename → filterDisabled [src/server/helpers.ts:222]; groupHeader rename → renderGroupHeader [src/server/helpers.ts:227]; lockedLine rename → renderLockedLine [src/server/helpers.ts:242]; suggestionLine rename → renderSuggestionLine [src/server/helpers.ts:253]; unavailableLine rename → renderUnavailableLine [src/server/helpers.ts:263]; numberedList rename → renderNumberedList [src/server/helpers.ts:282] — guide: guides/terminal.md Surface rows and fences for the view/header helpers and rawCapable
- **s12-55** (mixed): Rename serializeShutdown to serializeDestroy and change SSE_EVENTS.shutdown from 'shutdown' to 'destroy'. — edits: serializeShutdown rename → serializeDestroy [src/core/helpers.ts:867]; SSE_EVENTS.shutdown rename → destroy [src/core/constants.ts:214] — guide: guides/terminal.md serializeShutdown Surface row and SSE_EVENTS.shutdown wire vocabulary
- **s12-58** (rename): Rename TimerCancel to TimerCancelFunction. — edits: TimerCancel rename → TimerCancelFunction [src/core/types.ts:376] — guide: guides/terminal.md TimerCancel Surface row and callable-types sentence
- **s12-59** (rename): Rename Parked to ParkedForm. — edits: Parked rename → ParkedForm [src/core/types.ts:388] — guide: guides/terminal.md Parked Surface row and data-only sentence

The fix-round audit findings for this package that this unit also carries:

none

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s12-48: `KeyEvent.name` is optional with no `''` sentinel; the guide sentences and the test that pinned it move to the new contract.
- s12-52: `terminals()` returns `readonly PromptInterface[]`; no separate names accessor is added; every caller including the TARGET message moves.
- s12-54: `supportsRawMode` (`isRawCapable` is refused: `is*` is a total guard). The `*Reduce` widening is outside the row and is reported as an observation.
- s12-55: the shutdown event value and `serializeShutdown` carry the destroy vocabulary; the report states that the wire word every deployed PromptClient dispatches on changes.
- s12-58 and s12-59: `TimerCancelFunction` and `ParkedForm`.
- Carry: console's `succeed`/`fail` at Terminal.ts and its constants; sse's `clear()`; database's renames.

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
`guides/terminal.md`.

**Host.** Linux, bash. Repository /home/user/fleet/terminal on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`. Build a throwaway probe, where you need one, under the system temporary directory, never under the checkout's `tmp/`.

**Measurements.** `console`, `contract`, `database`, `emitter`, `form`, `guide`, `html`, `indexeddb`, `markdown`, `sqlite`, `sse`, `test` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** L0 landed: @orkestrel/contract at 2c15840 (main's latest reconciled; traversal spines interned with no state parameter on any door; ValueToSchemaOptions.limits.depth/.properties with ValueToSchemaLimits; INTRINSICS.reflect.{read,write,members,present,describe,define,prototype,apply,construct} replacing the flat reveal/declare/parent and the flat Reflect keys; validateShape, buildStringFaults/buildNumberFaults/buildArrayFaults with a trailing pattern argument, matchesISOInstant, ownPattern; expansion is number | undefined), @orkestrel/msg (category discriminants, MSG_CATEGORY_*), @orkestrel/sse (clear() replaces reset()). L1 landed: @orkestrel/budget (BudgetOptions.consumer replaces consume), @orkestrel/csv (renderTSV gone; ParseOptions.comment has no false arm; parseInteger/parseReal/parseBoolean in parsers.ts), @orkestrel/html (HTMLHandlerMap, HTMLSanitizeOptions, HTMLDistillOptions; the create*Contract doors deleted), @orkestrel/ndjson (clear() replaces reset()), @orkestrel/indexeddb at bf4730e (no published query parameter admits null; IndexedDBStoreInterface.path is KeyPath | undefined; rangeExactKey and rangeBetweenKeys are deleted and callers use IDBKeyRange.only and IDBKeyRange.bound; IndexedDBCursorInterface.value is Row | undefined; IndexedDBUpgradeContext carries only transaction/old/version/stores/indexes with stores.names/create/drop/open and indexes.create/drop; IndexedDBRecordStoreInterface is the shared keyed record surface), @orkestrel/sqlite at 5a9340b (SQLiteDatabaseInterface.exec is execute). L2 landed: @orkestrel/console at 77ab53f (the pass-through factories createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, createProgress are deleted and the classes are constructed directly; withCapture is createCaptureResult in factories; DEFAULT_CAPTURE_LEVELS is removed in core and server and callers read CAPTURE_LEVELS or STREAM_LEVELS; the server DEFAULT_CAPTURE_LIMIT is DEFAULT_STREAM_LIMIT; LEVELS is LOG_LEVELS; columnsOf is inferColumns; Spinner success/failure are succeed/fail and Progress failure is fail), @orkestrel/database at 2ded05a (driverFindings is scanDriver; compileWhere, compileOrder, compilePage are compileWhereSQL, compileOrderSQL, compilePageSQL; matchesFuzzy and escapeLike are removed; INDEXABLE_STORAGE is a frozen readonly array; the IndexedDB column.remove migration fails closed with MIGRATION on a non-record stored value), @orkestrel/markdown at 9c0dfc7 (isWhitespace is isFlankingWhitespace), @orkestrel/process at 8aa5dce (ProcessChild is ProcessChildInterface), @orkestrel/reason at c363201 (isSubject is removed, narrow with isRecord from @orkestrel/contract; every bare-noun value constructor is create{Entity} in factories, such as createCheck, createRule, createFact, createEquation, createInference, createStaticFactor, createFieldFactor, createLookupFactor, createRangeFactor, createFactorGroup, createQuantitativeDefinition, createLogicalDefinition, createSymbolicDefinition, createInferentialDefinition; the managers' collection setter is seat(items), and seat(variables) on the variable manager; isWithinBounds is matchesBounds; the append/prepend/replace helpers name their parameter by its domain noun), @orkestrel/template at 2eccc62 (TemplateManagerInterface.size is count; template(id) returns TemplateInterface | undefined and only fill, validate, and parameters throw NOTFOUND; remove keeps its no-argument overload), @orkestrel/websocket at abcf675 (WebSocketCloseCode, WebSocketMessage, WebSocketClose are removed; isWebSocketFrameCanonical is parseWebSocketCanonical; a WebSocketError with code OPTION, LIMIT, CLOSE, or FRAME and the guard isWebSocketError replace every RangeError createNodeWebSocket, ping, close, and encodeWebSocketFrame threw, so a consumer catching RangeError from them narrows with isWebSocketError instead; the published surface otherwise unchanged). @orkestrel/middleware (a reshaped session and multipart surface) and @orkestrel/table are in flight and sit in no L3 closure. W-DEV landed in @orkestrel/test (readStyle, readToken, readRootToken, readPixels, parseCSSColor, matchesColor; PortfolioInterface.placements) and @orkestrel/guide (helpers renamed verb-first; Source.methods follows extends, so an extending interface's Methods table must list inherited members). Every one of these is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs terminal`); this checkout's tests/guides.test.ts already imports the renamed guide helpers. Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install..

## Unknowns

Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan's ruling for each is stated in the row summary above, and where it is not, stop and report the row..

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/terminal.md`, `guides/README.md` rows for this package, the package's own `README.md`
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
5. `guides/terminal.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
