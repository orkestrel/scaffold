# Unit breaking-agent — apply the deferred breaking repairs in agent

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to agent — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/agent.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/agent.md`:

- **referral s18 ProviderDelta** (rename): Rename ProviderDelta.type to channel; ollama constructs both union members and must move with the agent rename. — edits: ProviderDelta.type rename → channel [src/core/types.ts:98] — after: s08-12 — guide: guides/agent.md ProviderDelta Types row
- **s08-12** (rename): Rename ProviderDelta.type to channel and AgentChunk.type to category; the false-compliance TSDoc clause is already gone. — edits: ProviderDelta.type rename → channel [src/core/types.ts:98]; AgentChunk.type rename → category [src/core/types.ts:791] — guide: guides/agent.md ProviderDelta and AgentChunk Types rows and every chunk.type / delta.type fence
- **s08-13** (event): Rename the AgentEventMap compactError event; the replacement verb is not settled. — edits: AgentEventMap.compactError rename [src/core/types.ts:931] — guide: guides/agent.md AgentEventMap row and compactError emitter fences
- **s08-14** (option-key): Rename allowPartial to partial on AgentQueueOptions and AgentRunnerOptions. — edits: AgentQueueOptions.allowPartial rename → partial [src/core/types.ts:1462]; AgentRunnerOptions.allowPartial rename → partial [src/core/types.ts:1484] — guide: guides/agent.md AgentQueueOptions and AgentRunnerOptions Types rows
- **s08-19** (rename): Rename fencedFile to renderFencedFile; the AgentContext.#fenced call site is already gone. — edits: fencedFile rename → renderFencedFile [src/core/helpers.ts:306] — guide: guides/agent.md fencedFile Surface row
- **s08-22** (remove): Delete CompactionState; the per-run holder that replaces its box is not shared across lanes. — edits: CompactionState remove [src/core/types.ts:865] — guide: guides/agent.md CompactionState Types row
- **s08-23** (rename): Rename InstructionManagerInterface description to open and format to render, and rename framing; ContextSectionSourceInterface carries the same trio, and the replacement for framing is not settled. — edits: InstructionManagerInterface.description rename → open [src/core/types.ts:367]; InstructionManagerInterface.format rename → render [src/core/types.ts:383]; InstructionManagerInterface.framing rename [src/core/types.ts:376]; InstructionManager.description rename → open [src/core/instructions/InstructionManager.ts:76]; InstructionManager.format rename → render [src/core/instructions/InstructionManager.ts:106]; InstructionManager.framing rename [src/core/instructions/InstructionManager.ts:81]; ContextSectionSourceInterface.description rename → open [src/core/types.ts:446]; ContextSectionSourceInterface.format rename → render [src/core/types.ts:450]; ContextSectionSourceInterface.framing rename [src/core/types.ts:448] — guide: guides/agent.md InstructionManagerInterface and ContextSectionSourceInterface rows and the build-cascade prose
- **s08-28** (rename): Rename ScopeConfiguration to ScopeFilter on the type and at ScopeInput, ScopeInterface.narrow, and Scope.narrow. — edits: ScopeConfiguration rename → ScopeFilter [src/core/types.ts:489] — guide: guides/agent.md ScopeConfiguration Types row (ScopeInput and ScopeInterface.narrow name it)
- **s08-29** (rename): Rename ConversationSummarizer to ConversationSummaryHandler; the summarize option key stays. — edits: ConversationSummarizer rename → ConversationSummaryHandler [src/core/types.ts:1506] — guide: guides/agent.md ConversationSummarizer Types row

The fix-round audit findings for this package that this unit also carries:

- s08-16: dispose and apply as breaking — rename MessageInterface, ContextFormatInterface, AuthorityContextInterface, SectionInterface to the bare {Entity} data form (InstructionInterface stays: the bare name is the class)
- s08-24: collapse the Conversation constructor to constructor(options?: ConversationOptions), delete the seed ?? options.snapshot precedence and its TSDoc paragraph; ConversationManager.add is the in-package caller
- s08-21: AgentContext.#attach reads no # field and calls no sibling — extract it as an exported helper beside attachImages, or fold it; the ContextSectionSourceInterface members follow the s08-23 rename
- report amendment: relabel s08-12 as applied with the deferred remainder named

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s08-12 is the sole carrier of `ProviderDelta.type` → `channel`; `referral s18 ProviderDelta` closes as satisfied by it. `AgentChunk.type` → `category`. Ollama is the downstream constructor of both members.
- s08-13: `compactError` → `fault`, carrying `[error: unknown]`; its TSDoc states that the run still settles through `error`. Stop and report if `AgentEventMap` already carries `fault`.
- s08-22: `CompactionState` goes; the run state lives in `#run` and `#trim` changes.
- s08-23: `description` → `open`, `format` → `render`, then `framing` → `format`, on `InstructionManagerInterface` and `ContextSectionSourceInterface` and both guide tables.
- s08-14, s08-19, s08-28, s08-29: as the ledger has them (`partial` replaces `allowPartial` on both option types; `renderFencedFile`; `ScopeFilter`; `ConversationSummaryHandler`).
- Audit carriers: s08-16 → the data types take the bare `{Entity}` form while `InstructionInterface` stays; s08-24 → `constructor(options?: ConversationOptions)` with the seed precedence and its paragraph deleted; s08-21 → `AgentContext.#attach` ruled under the leaf test on its post-extraction shape; the truncated judge note repair is dossier-only.
- Carry: budget's `consumer`; workflow's `behavior`, `IdleInterface`, and interned classes; workspace's binary member; database's renames.

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
`guides/agent.md`.

**Host.** Linux, bash. Repository /home/user/fleet/agent on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`. Build a throwaway probe, where you need one, under the system temporary directory, never under the checkout's `tmp/`.

**Measurements.** `abort`, `budget`, `contract`, `database`, `emitter`, `guide`, `html`, `indexeddb`, `markdown`, `queue`, `sqlite`, `test`, `timeout`, `tool`, `workflow`, `workspace` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** L0 landed: @orkestrel/contract at 2c15840 (main's latest reconciled; traversal spines interned with no state parameter on any door; ValueToSchemaOptions.limits.depth/.properties with ValueToSchemaLimits; INTRINSICS.reflect.{read,write,members,present,describe,define,prototype,apply,construct} replacing the flat reveal/declare/parent and the flat Reflect keys; validateShape, buildStringFaults/buildNumberFaults/buildArrayFaults with a trailing pattern argument, matchesISOInstant, ownPattern; expansion is number | undefined), @orkestrel/msg (category discriminants, MSG_CATEGORY_*), @orkestrel/sse (clear() replaces reset()). L1 landed: @orkestrel/budget (BudgetOptions.consumer replaces consume), @orkestrel/csv (renderTSV gone; ParseOptions.comment has no false arm; parseInteger/parseReal/parseBoolean in parsers.ts), @orkestrel/html (HTMLHandlerMap, HTMLSanitizeOptions, HTMLDistillOptions; the create*Contract doors deleted), @orkestrel/ndjson (clear() replaces reset()), @orkestrel/indexeddb at bf4730e (no published query parameter admits null; IndexedDBStoreInterface.path is KeyPath | undefined; rangeExactKey and rangeBetweenKeys are deleted and callers use IDBKeyRange.only and IDBKeyRange.bound; IndexedDBCursorInterface.value is Row | undefined; IndexedDBUpgradeContext carries only transaction/old/version/stores/indexes with stores.names/create/drop/open and indexes.create/drop; IndexedDBRecordStoreInterface is the shared keyed record surface), @orkestrel/sqlite at 5a9340b (SQLiteDatabaseInterface.exec is execute). L2 landed: @orkestrel/console at 77ab53f (the pass-through factories createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, createProgress are deleted and the classes are constructed directly; withCapture is createCaptureResult in factories; DEFAULT_CAPTURE_LEVELS is removed in core and server and callers read CAPTURE_LEVELS or STREAM_LEVELS; the server DEFAULT_CAPTURE_LIMIT is DEFAULT_STREAM_LIMIT; LEVELS is LOG_LEVELS; columnsOf is inferColumns; Spinner success/failure are succeed/fail and Progress failure is fail), @orkestrel/database at 2ded05a (driverFindings is scanDriver; compileWhere, compileOrder, compilePage are compileWhereSQL, compileOrderSQL, compilePageSQL; matchesFuzzy and escapeLike are removed; INDEXABLE_STORAGE is a frozen readonly array; the IndexedDB column.remove migration fails closed with MIGRATION on a non-record stored value), @orkestrel/markdown at 9c0dfc7 (isWhitespace is isFlankingWhitespace), @orkestrel/process at 8aa5dce (ProcessChild is ProcessChildInterface), @orkestrel/reason at c363201 (isSubject is removed, narrow with isRecord from @orkestrel/contract; every bare-noun value constructor is create{Entity} in factories, such as createCheck, createRule, createFact, createEquation, createInference, createStaticFactor, createFieldFactor, createLookupFactor, createRangeFactor, createFactorGroup, createQuantitativeDefinition, createLogicalDefinition, createSymbolicDefinition, createInferentialDefinition; the managers' collection setter is seat(items), and seat(variables) on the variable manager; isWithinBounds is matchesBounds; the append/prepend/replace helpers name their parameter by its domain noun), @orkestrel/template at 8fdc167 (TemplateManagerInterface.size is count; remove(ids) removes each present id and reports true only when every id was present; template(id) returns TemplateInterface | undefined and only fill, validate, and parameters throw NOTFOUND; remove keeps its no-argument overload), @orkestrel/websocket at abcf675 (WebSocketCloseCode, WebSocketMessage, WebSocketClose are removed; isWebSocketFrameCanonical is parseWebSocketCanonical; a WebSocketError with code OPTION, LIMIT, CLOSE, or FRAME and the guard isWebSocketError replace every RangeError createNodeWebSocket, ping, close, and encodeWebSocketFrame threw, so a consumer catching RangeError from them narrows with isWebSocketError instead; the published surface otherwise unchanged). @orkestrel/middleware (a reshaped session and multipart surface) and @orkestrel/table are in flight and sit in no L3 closure. W-DEV landed in @orkestrel/test (readStyle, readToken, readRootToken, readPixels, parseCSSColor, matchesColor; PortfolioInterface.placements) and @orkestrel/guide (helpers renamed verb-first; Source.methods follows extends, so an extending interface's Methods table must list inherited members). Every one of these is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs <package>`); this checkout's tests/guides.test.ts already imports the renamed guide helpers. Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install. L3 landed: @orkestrel/qualifier at a8f71dc (QualificationValidationResult and isQualificationValidationResult are removed and validate returns reason's ReasonValidationResult, narrowed with isReasonValidationResult from @orkestrel/reason; findMissingReferences, findEmptyLogicalPasses, findUnreadDerivations are describeMissingReferences, describeEmptyLogicalPasses, describeUnreadDerivations; QualifierError.context is QualifierErrorContext | undefined with pass, definition, and cause members), @orkestrel/rater at 350608e (worksheetFactor, worksheetGroup, resultsWorksheet, ratedLine, evidenceCheck, checkEvidence are buildWorksheetFactor, buildWorksheetGroup, buildWorksheet, buildLineResult, buildEvidence, buildEvidenceRows; LineResult.success is removed and a reader derives it from LineResult.worksheet.success; RatingResult.success stands), @orkestrel/relation at e675bd0 (RelationManagerInterface.models() is names(); ResolvedRelation is a union of ResolvedBelongs, ResolvedMany, ResolvedOne, ResolvedThrough, ResolvedMorph discriminated on relationship), @orkestrel/sea at 62b6f40 (parsePEOffset is readPEOffset; runShell is executeShell; SEAProgressHandler is SEACompressionHandler; buildELFNoteHeader returns the declared ELFNoteHeader whose member is total), @orkestrel/server at 522ed4c (openStream is the Stream class with the createStream factory and enqueueStreamText is folded into it; appendCookie is removed and a caller uses headers.append('set-cookie', cookie); codingQuality, languageQuality, ipv6Network, clientRateKey are computeCodingQuality, computeLanguageQuality, computeIPv6Network, computeClientKey; ConnectionInfo is Connection; ServerError with ServerErrorCode 'STATUS' and isServerError are added; resolveCoding is the shared coding-selection leaf), @orkestrel/terminal at 4ea17d7 (KeyEvent.name is optional and an undecoded key carries none; TerminalManagerInterface.terminals() returns readonly PromptInterface[] and no names accessor exists; the view and header helpers are render*; isRawCapable is supportsRawMode; SSE_EVENTS.destroy and serializeDestroy replace the shutdown wire word; TimerCancelFunction and ParkedForm are the declared types), @orkestrel/interpret at 738bb5b (register/unregister are add/remove with the overload set and InterpretEventMap.add; TemplateManagerInterface.size is count; ManagerAddOptions is RecordOptions; GeneratorOptions, createTemplate, INVALID_TEMPLATE, INTERPRET_ID, deriveAggregateField, and the empty DEFAULT_* records are removed; Intent.action and Intent.domain are optional; InterpretOptions.narrator groups the narrator options; canonicalizeNode is exported; a computation addresses one numeric element of an array-valued field as {field}.{index}), @orkestrel/workspace at e564c2d (FileContent's binary arm member is base64; decodedSize is computeDecodedSize; an empty batch reports true), @orkestrel/template at 8fdc167 (remove(ids) removes each present id and reports true only when every id was present). @orkestrel/browser at 35443be (the read* coercers are parse* in parsers.ts and return undefined off-shape while the read* readers throw or skip; ScreenshotWriterInterface and createScreenshotWriter are BrowserWriterInterface and createBrowserWriter; BrowserActionOptions lost delay, button, count, position, steps to the operation-specific option types and BrowserOperationOptions names the validator's input; validateBrowserActionOptions is validateBrowserInputOptions; CDPClientInterface carries emitter with CDPClientEventMap and CDPClientOptions.on; BrowserFlight is BrowserTransition; BrowserPerformanceInterface lost active, start, stop, destroy to diagnostics.profiler; BrowserFilterOptions and BrowserTextResultOptions are removed; findAllInStore, findAllEnvOverrides, findAllInstallPaths, probeAllPathNames are findInStore, findEnvOverrides, findInstallPaths, probePathNames; guardEvaluateExpression is removed; BrowserDialog, BrowserDownload, BrowserFileChooser, BrowserHandle, BrowserRoute, BrowserWorker leave the barrel; drop fires only for a close the client did not request). @orkestrel/mcp at 51775d1 (HTTPClientTransport, HTTPClientTransportOptions, decodeEvent, readEventStream, buildResponseError, and the wire header constants ship from @orkestrel/mcp only; serveMCP and serveMCPScope are createScopeServer(options, scope?) returning ScopeServerInterface with ScopeServerOptions and ScopeInterface; createReadableStream is removed; bridgeMessageTransport is createDuplexServerTransport; EventStoreEntry is MCPSessionEvent; the middleware options type is MCPSessionMiddlewareOptions and MCPSessionOptions is the entity's { capacity?, ttl? }; inferHeaderIssue(request, invocation) and inferSessionHeaderIssue(request, version); MCPClientTransportInterface and MCPClientTransportEventMap are MCPMessageTransportInterface and MCPMessageTransportEventMap; the default client and server names are @orkestrel/mcp). Every one of these, and every earlier layer's tip named in l3-standing.txt, is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs <package>`). Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install. L4 landed: @orkestrel/brief at bc0f767 (BriefManagerInterface.size is count; add takes interpret's RecordOptions; the example(input, result, note?) signature stands, refused as written; the guide states no count over a set), @orkestrel/program at 7ef860d (programDefinition, noticeDefinition, aggregateDefinition, emptySums, emptyTallies are buildProgramDefinition, buildNotice, buildAggregateDefinition, buildEmptySums, buildEmptyTallies; copyJSONValue is removed and the metadata copy is structuredClone; buildProgramDefinition deep-copies metadata alone and stores the rest by reference), PENDING at L5 start, fill from the accepted tip: @orkestrel/workflow (UnitOutcome removed and Runner settles through the package Result helpers; createDeferred and DeferredInterface removed for Promise.withResolvers; Phase, Task, Controller, TaskController leave the barrel; description is string | undefined on the workflow, phase, and task interfaces; workflowSnapshotContext is locateSnapshotContext; WorkflowFault.origin dropped; the persisted task field run is behavior; IdleAPI is IdleInterface; the run holder is RunHolderInterface; createWorkflowTree in factories). worker, queue, and lsp adopted clean on the accepted tips (check 0, test 0); probe's check is 0 and its test red is the standing container failure of the Oxlint language-server arm, ruled on 2026-08-28. Every one of these, and every earlier layer's tip named in l3-standing.txt and l4-standing.txt, is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs <package>`). Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install. Standing condition: @orkestrel/workflow is staged from its landed checkpoint bcf8ab4 while its audit runs; a workflow fix-up re-stages this checkout before this unit's audit..

## Unknowns

Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan's ruling for each is stated in the row summary above, and where it is not, stop and report the row..

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/agent.md`, `guides/README.md` rows for this package, the package's own `README.md`
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
5. `guides/agent.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
