# Unit breaking-browser — apply the deferred breaking repairs in browser

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to browser — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/browser.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/browser.md`:

- **s04-01** (rename): Create src/core/parsers.ts, move every read* coercer that returns T | undefined into it, and rename each to parse*; parseCodegenActionPayload moves unchanged. — edits: readBrowserRequest rename → parseBrowserRequest [src/core/helpers.ts:188]; readBrowserResponse rename → parseBrowserResponse [src/core/helpers.ts:229]; readBrowserResponseRecord rename → parseBrowserResponseRecord [src/core/helpers.ts:257]; readBrowserTiming rename → parseBrowserTiming [src/core/helpers.ts:301]; readBrowserTimingRange rename → parseBrowserTimingRange [src/core/helpers.ts:325]; readBrowserSecurity rename → parseBrowserSecurity [src/core/helpers.ts:619]; readBrowserRequestFailure rename → parseBrowserRequestFailure [src/core/helpers.ts:644]; readBrowserWebSocketFrame rename → parseBrowserWebSocketFrame [src/core/helpers.ts:662]; readBrowserBindingCall rename → parseBrowserBindingCall [src/core/helpers.ts:714]; readBrowserAXString rename → parseBrowserAXString [src/core/helpers.ts:1087]; readBrowserCookiePartition rename → parseBrowserCookiePartition [src/core/helpers.ts:1463]; readBrowserConsoleMessage rename → parseBrowserConsoleMessage [src/core/helpers.ts:1577]; readBrowserPageError rename → parseBrowserPageError [src/core/helpers.ts:1622]; readBrowserDownloadStart rename → parseBrowserDownloadStart [src/core/helpers.ts:1645]; readBrowserDownloadProgress rename → parseBrowserDownloadProgress [src/core/helpers.ts:1669]; readCodegenNavigateAction rename → parseCodegenNavigateAction [src/core/helpers.ts:1825]; readNumberArray rename → parseNumberArray [src/core/helpers.ts:2018]; readSnapshotString rename → parseSnapshotString [src/core/helpers.ts:2032]; readBrowserRect rename → parseBrowserRect [src/core/helpers.ts:2100] — guide: guides/browser.md Surface rows for the read* coercers
- **s04-02** (rename): After s04-01, rename the remaining throw-on-malformed decodeRare* and decodeBrowser* helpers to the read* prefix; leave decodeBase64/encodeBase64. — edits: decodeRareStringData rename → readRareStringData [src/core/helpers.ts:2044]; decodeRareBooleanData rename → readRareBooleanData [src/core/helpers.ts:2068]; decodeRareIntegerData rename → readRareIntegerData [src/core/helpers.ts:2079]; decodeBrowserAttributes rename → readBrowserAttributes [src/core/helpers.ts:2120]; decodeBrowserSnapshot rename → readBrowserSnapshot [src/core/helpers.ts:2144] — after: s04-01 — guide: guides/browser.md Surface rows for the decode* snapshot/rare-data helpers
- **s04-05** (remove): Drop BrowserDiscoveryResult.found and .connection, leaving endpoint and browser as the discovery answer. — edits: BrowserDiscoveryResult.found remove [src/server/types.ts:35]; BrowserDiscoveryResult.connection remove [src/server/types.ts:38] — guide: guides/browser.md BrowserDiscoveryResult Types row
- **s04-06** (rename): Rename ScreenshotWriterInterface to BrowserWriterInterface and createScreenshotWriter to createBrowserWriter. — edits: ScreenshotWriterInterface rename → BrowserWriterInterface [src/core/types.ts:130]; createScreenshotWriter rename → createBrowserWriter [src/server/factories.ts:41] — guide: guides/browser.md ScreenshotWriterInterface Types row and createScreenshotWriter factory row
- **s04-07** (mixed): Delete the BrowserFilterOptions alias and retype BrowserLocatorInterface.filter to take BrowserLocatorFilter. — edits: BrowserFilterOptions remove [src/core/types.ts:539]; BrowserLocatorInterface.filter change [src/core/types.ts:558] — guide: guides/browser.md BrowserFilterOptions Types row and BrowserLocatorInterface.filter Methods row
- **s04-09** (mixed): Split text(options?: { all?: boolean }) into text(): Promise<string> and texts(): Promise<readonly string[]>, and delete BrowserTextResultOptions. — edits: BrowserLocatorInterface.text change [src/core/types.ts:575]; BrowserLocator.text change [src/core/BrowserLocator.ts:288]; BrowserTextResultOptions remove [src/core/types.ts:542] — guide: guides/browser.md BrowserLocatorInterface.text Methods row and BrowserTextResultOptions Types row
- **s04-10** (remove): Move receive/transmit/fail/close, update, and assert off the published observation interfaces onto the concrete classes only. — edits: BrowserWebSocketInterface.receive remove [src/core/types.ts:909]; BrowserWebSocketInterface.transmit remove [src/core/types.ts:910]; BrowserWebSocketInterface.fail remove [src/core/types.ts:911]; BrowserWebSocketInterface.close remove [src/core/types.ts:912]; BrowserDownloadInterface.update remove [src/core/types.ts:757]; BrowserFrameInterface.assert remove [src/core/types.ts:1418]; BrowserFrameInterface.update remove [src/core/types.ts:1419] — guide: guides/browser.md Methods rows for BrowserWebSocketInterface, BrowserDownloadInterface, and BrowserFrameInterface drive methods
- **s04-11** (rename): Rename fail so the method and the error event share one term; close(timestamp) stays. — edits: BrowserWebSocketInterface.fail rename [src/core/types.ts:911]; BrowserWebSocket.fail rename [src/core/BrowserWebSocket.ts:44] — after: s04-10 — guide: guides/browser.md BrowserWebSocketInterface.fail Methods row
- **s04-12** (mixed): Delete the four one-line singular wrappers and rename the surviving plurals, reusing probePathNames and findInStore with plural return types. — edits: findEnvOverride remove [src/server/helpers.ts:175]; findInstallPath remove [src/server/helpers.ts:222]; probePathNames remove [src/server/helpers.ts:232]; findInStore remove [src/server/helpers.ts:300]; findAllEnvOverrides rename → findEnvOverrides [src/server/helpers.ts:182]; findAllInstallPaths rename → findInstallPaths [src/server/helpers.ts:227]; probeAllPathNames rename → probePathNames [src/server/helpers.ts:237]; findAllInStore rename → findInStore [src/server/helpers.ts:305] — guide: guides/browser.md Surface rows and fence lines for the find*/probe* path helpers
- **s04-18** (rename): Rename BrowserScreenshotOptions.type to format, and CDPTarget.type plus BrowserNode.type to category. — edits: CDPTarget.type rename → category [src/core/types.ts:61]; BrowserScreenshotOptions.type rename → format [src/core/types.ts:252]; BrowserNode.type rename → category [src/core/types.ts:1445] — guide: guides/browser.md CDPTarget, BrowserScreenshotOptions, and BrowserNode Types rows
- **s04-19** (option-key): Move button, count, position, steps, and delay off BrowserActionOptions onto operation-specific option types, narrowing the accepted options of the methods that currently take the flat bag. — edits: BrowserActionOptions.delay remove [src/core/types.ts:218]; BrowserActionOptions.button remove [src/core/types.ts:219]; BrowserActionOptions.count remove [src/core/types.ts:220]; BrowserActionOptions.position remove [src/core/types.ts:221]; BrowserActionOptions.steps remove [src/core/types.ts:222] — guide: guides/browser.md BrowserActionOptions Types row and the locator/frame method rows that accept it
- **s04-20** (rename): Rename BrowserMedia.color to scheme and media to output; leave colors as the forced-colors key. — edits: BrowserMedia.media rename → output [src/core/types.ts:1216]; BrowserMedia.color rename → scheme [src/core/types.ts:1217] — guide: guides/browser.md BrowserMedia Types row
- **s04-21** (remove): Intern BrowserRoute, BrowserHandle, BrowserFileChooser, BrowserWorker, BrowserDialog, and BrowserDownload by removing their barrel rows. — edits: BrowserDialog remove [src/core/BrowserDialog.ts:11]; BrowserDownload remove [src/core/BrowserDownload.ts:14]; BrowserFileChooser remove [src/core/BrowserFileChooser.ts:7]; BrowserHandle remove [src/core/BrowserHandle.ts:9]; BrowserRoute remove [src/core/BrowserRoute.ts:15]; BrowserWorker remove [src/core/BrowserWorker.ts:10] — guide: guides/browser.md Surface rows for the interned classes; interfaces stay public via BrowserPageEventMap
- **s04-22** (rename): Rename the exported guardEvaluateExpression to compileGuardedEvaluateExpression; the move into compilers.ts already landed under s04-03. — edits: guardEvaluateExpression rename → compileGuardedEvaluateExpression [src/core/compilers.ts:245] — guide: guides/browser.md guardEvaluateExpression compiler/helper Surface row
- **s04-26** (signature): Add a required emitter member to CDPClientInterface; CDPClientOptions.on/error already landed. — edits: CDPClientInterface.emitter change [src/core/types.ts:80] — guide: guides/browser.md CDPClientInterface Methods/Types rows
- **s04-29** (signature): Change fetchCDPTargets to return Promise<Result<readonly CDPTarget[], BrowserError>> instead of Promise<readonly CDPTarget[]>. — edits: fetchCDPTargets change [src/server/helpers.ts:425] — guide: guides/browser.md fetchCDPTargets helper Surface row
- **s04-35** (remove): Drop connected from BrowserInterface and Browser; keep status. — edits: BrowserInterface.connected remove [src/server/types.ts:239]; Browser.connected remove [src/server/Browser.ts:131] — guide: guides/browser.md BrowserInterface.connected Methods row
- **s04b-04** (rename): Rename BrowserCookieManagerInterface.list and the class method to cookies(urls?). — edits: BrowserCookieManagerInterface.list rename → cookies [src/core/types.ts:1158]; BrowserCookieManager.list rename → cookies [src/core/BrowserCookieManager.ts:24] — guide: guides/browser.md BrowserCookieManagerInterface Methods row (guide never names list today; renamed member owes a Surface row)
- **s04b-05** (signature): Replace send's positional session/timeout tail with a trailing options object on CDPClientInterface and BrowserFrameInterface; the sessionId→session parameter rename already landed. — edits: CDPClientInterface.send change [src/core/types.ts:84]; CDPClient.send change [src/core/CDPClient.ts:85]; BrowserFrameInterface.send change [src/core/types.ts:1410]; BrowserFrame.send change [src/core/BrowserFrame.ts:185] — guide: guides/browser.md CDPClientInterface.send and BrowserFrameInterface.send Methods rows plus a Surface row for CDPSendOptions
- **s04b-10** (rename): Rename the BrowserSelector literal and BrowserSelectorManagerInterface.test method from test to testId. — edits: BrowserSelector.test rename → testId [src/core/types.ts:507]; BrowserSelectorManagerInterface.test rename → testId [src/core/types.ts:596]; BrowserSelectorManager.test rename → testId [src/core/BrowserSelectorManager.ts:57] — guide: guides/browser.md BrowserSelectorManagerInterface Surface/Methods row the renamed member owes
- **s04b-12** (mixed): Extract start, stop, and active off BrowserPerformanceInterface onto a BrowserProfilerInterface peer exposed as diagnostics.profiler. — edits: BrowserPerformanceInterface.active remove [src/core/types.ts:477]; BrowserPerformanceInterface.start remove [src/core/types.ts:479]; BrowserPerformanceInterface.stop remove [src/core/types.ts:480]; BrowserPerformance.active remove [src/core/BrowserPerformance.ts:22]; BrowserPerformance.start remove [src/core/BrowserPerformance.ts:35]; BrowserPerformance.stop remove [src/core/BrowserPerformance.ts:59] — guide: guides/browser.md BrowserPerformance mixed-shape description and BrowserDiagnostics Methods rows

The fix-round audit findings for this package that this unit also carries:

- s04b-11: move BrowserPagesFunction beside BrowserEmulationManagerInterface under the context-state section, BrowserTeardownFunction beside its helper's section; TSDoc 'Returns the context's live pages at call time'
- s04-21 example half: add a runnable @example to every class that stays barrelled after the interning rows land
- s04b-07: rename BrowserFlight/BrowserFlightInterface/BrowserFlightFunction to BrowserTransition/BrowserTransitionInterface/BrowserTransitionFunction and the attempt accessor to pending (new, unpublished symbols); fix the guide table order for the two rows
- s04b-08: move the settleBrowserTeardown guide row into alphabetical position and add it to the import fence and usage lines
- s04-24: restate the BROWSER_WAIT_POLL_INTERVAL_MS row as the interval every DOM wait polls at
- settleBrowserTeardown: retain the first failure with a settled boolean so a thrown undefined or null is kept
- report amendment: record the BrowserCodegen #start/#stop extension under s04b-06 with its rule clause

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s04-01 lands before s04-02: the coercers take `parse*` names in `parsers.ts` before the live readers take `read*`; `decodeBase64`/`encodeBase64` are untouched.
- s04-10 lands before s04-11 and s04-21: `fail` leaves the interface, then stays a bare verb on the class (`error` is a noun and methods are bare verbs).
- s04b-05: the client takes `CDPSendOptions` with `session` and `timeout`; the frame takes a timeout-only options type and never accepts a `session` it ignores.
- s04b-12: `diagnostics.profiler` as a `BrowserProfilerInterface` peer manager.
- s04-21: the interned classes leave the barrel, enter `INTERNAL`, and lose their `@example` blocks.
- s04-26: the required `emitter` member lands on `CDPClientInterface`; the report states that this breaks a foreign implementation.
- Audit carriers: s04b-07 → `BrowserTransition`, `BrowserTransitionInterface`, `BrowserTransitionFunction`, and `pending` replace the flight vocabulary everywhere including the guide; s04b-11 placement and the at-call-time clause; guide row order; `BROWSER_WAIT_POLL_INTERVAL_MS` row prose; `settleBrowserTeardown` captures the first failure with a settled boolean, proved by a test that throws `undefined` and one that throws `null`.
- Every other row applies exactly as its ledger edits list. The Playwright browser project result is an observation, not a criterion.
- Carrier from the W-DEV sweep: @orkestrel/guide's parity now resolves an interface's methods through its `extends` chain, so `documents every interface method` fails where an extending interface's Methods table omits inherited call-signature members (`BrowserPageInterface` and any sibling the failing test names). List every inherited call-signature member in the extending interface's table (documentation.md: the table's methods exactly match the interface's call-signature members), or restructure the interface; `test:guides` is red in this checkout until then.

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
`guides/browser.md`.

**Host.** Linux, bash. Repository /home/user/fleet/browser on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`. Build a throwaway probe, where you need one, under the system temporary directory, never under the checkout's `tmp/`.

**Measurements.** `contract`, `emitter`, `guide`, `html`, `markdown`, `test`, `websocket` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** L0 landed: @orkestrel/contract at 2c15840 (main's latest reconciled; traversal spines interned with no state parameter on any door; ValueToSchemaOptions.limits.depth/.properties with ValueToSchemaLimits; INTRINSICS.reflect.{read,write,members,present,describe,define,prototype,apply,construct} replacing the flat reveal/declare/parent and the flat Reflect keys; validateShape, buildStringFaults/buildNumberFaults/buildArrayFaults with a trailing pattern argument, matchesISOInstant, ownPattern; expansion is number | undefined), @orkestrel/msg (category discriminants, MSG_CATEGORY_*), @orkestrel/sse (clear() replaces reset()). L1 landed: @orkestrel/budget (BudgetOptions.consumer replaces consume), @orkestrel/csv (renderTSV gone; ParseOptions.comment has no false arm; parseInteger/parseReal/parseBoolean in parsers.ts), @orkestrel/html (HTMLHandlerMap, HTMLSanitizeOptions, HTMLDistillOptions; the create*Contract doors deleted), @orkestrel/ndjson (clear() replaces reset()), @orkestrel/indexeddb at bf4730e (no published query parameter admits null; IndexedDBStoreInterface.path is KeyPath | undefined; rangeExactKey and rangeBetweenKeys are deleted and callers use IDBKeyRange.only and IDBKeyRange.bound; IndexedDBCursorInterface.value is Row | undefined; IndexedDBUpgradeContext carries only transaction/old/version/stores/indexes with stores.names/create/drop/open and indexes.create/drop; IndexedDBRecordStoreInterface is the shared keyed record surface), @orkestrel/sqlite at 5a9340b (SQLiteDatabaseInterface.exec is execute). L2 landed: @orkestrel/console at 77ab53f (the pass-through factories createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, createProgress are deleted and the classes are constructed directly; withCapture is createCaptureResult in factories; DEFAULT_CAPTURE_LEVELS is removed in core and server and callers read CAPTURE_LEVELS or STREAM_LEVELS; the server DEFAULT_CAPTURE_LIMIT is DEFAULT_STREAM_LIMIT; LEVELS is LOG_LEVELS; columnsOf is inferColumns; Spinner success/failure are succeed/fail and Progress failure is fail), @orkestrel/database at 2ded05a (driverFindings is scanDriver; compileWhere, compileOrder, compilePage are compileWhereSQL, compileOrderSQL, compilePageSQL; matchesFuzzy and escapeLike are removed; INDEXABLE_STORAGE is a frozen readonly array; the IndexedDB column.remove migration fails closed with MIGRATION on a non-record stored value), @orkestrel/markdown at 9c0dfc7 (isWhitespace is isFlankingWhitespace), @orkestrel/process at 8aa5dce (ProcessChild is ProcessChildInterface), @orkestrel/reason at c363201 (isSubject is removed, narrow with isRecord from @orkestrel/contract; every bare-noun value constructor is create{Entity} in factories, such as createCheck, createRule, createFact, createEquation, createInference, createStaticFactor, createFieldFactor, createLookupFactor, createRangeFactor, createFactorGroup, createQuantitativeDefinition, createLogicalDefinition, createSymbolicDefinition, createInferentialDefinition; the managers' collection setter is seat(items), and seat(variables) on the variable manager; isWithinBounds is matchesBounds; the append/prepend/replace helpers name their parameter by its domain noun), @orkestrel/template at 2eccc62 (TemplateManagerInterface.size is count; template(id) returns TemplateInterface | undefined and only fill, validate, and parameters throw NOTFOUND; remove keeps its no-argument overload), @orkestrel/websocket at abcf675 (WebSocketCloseCode, WebSocketMessage, WebSocketClose are removed; isWebSocketFrameCanonical is parseWebSocketCanonical; a WebSocketError with code OPTION, LIMIT, CLOSE, or FRAME and the guard isWebSocketError replace every RangeError createNodeWebSocket, ping, close, and encodeWebSocketFrame threw, so a consumer catching RangeError from them narrows with isWebSocketError instead; the published surface otherwise unchanged). @orkestrel/middleware (a reshaped session and multipart surface) and @orkestrel/table are in flight and sit in no L3 closure. W-DEV landed in @orkestrel/test (readStyle, readToken, readRootToken, readPixels, parseCSSColor, matchesColor; PortfolioInterface.placements) and @orkestrel/guide (helpers renamed verb-first; Source.methods follows extends, so an extending interface's Methods table must list inherited members). Every one of these is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs browser`); this checkout's tests/guides.test.ts already imports the renamed guide helpers. Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install..

## Unknowns

Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan's ruling for each is stated in the row summary above, and where it is not, stop and report the row..

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/browser.md`, `guides/README.md` rows for this package, the package's own `README.md`
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
5. `guides/browser.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
