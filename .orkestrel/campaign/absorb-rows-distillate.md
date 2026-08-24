## 1. Setup-project registration

The emitted root `vite.config.ts` is **baked per target**. The compiler includes the `setup` factory only when `blueprint.setup` is true (`/home/user/scaffold/src/core/compilers.ts:845-847`). The factory template itself always globs `tests/setup*.test.ts` (`/home/user/scaffold/src/core/templates.ts:325-334`); that glob is the project's include, not the decision to register the project.

`blueprint.setup` is computed at audit/compile time from exact-case files named `setup*.test.ts` directly under `tests/` (`/home/user/scaffold/src/bin/CLI.ts:983-991`). `Blueprint.setup` is a structural boolean (`/home/user/scaffold/src/core/types.ts:188-192`, `:217`). `createBlueprint` defaults it false (`/home/user/scaffold/src/core/factories.ts:58`).

`test:setup` is emitted at `/home/user/scaffold/src/core/compilers.ts:375` as `${vitest} --project setup`, and chained from `test` at `:347`.

**Adopted targets.** Probe has a setup proof (`/home/user/orkestrel/probe/tests/setup.test.ts:3-7`) and a baked `setup` factory plus `setup` in `projects` (`/home/user/orkestrel/probe/vite.config.ts:159-168`, `:217`). Abort has `tests/setup.ts` and no `tests/setup.test.ts`; its `projects` list has no `setup` (`/home/user/orkestrel/abort/vite.config.ts:122`) and `package.json` has no `test:setup` (`/home/user/orkestrel/abort/package.json:56`).

## 2. Fleet setup inventory

Every named package has `tests/setup.ts`. Only **process** also has `tests/setup.test.ts` (`/home/user/orkestrel/process/tests/setup.test.ts`) — already proven. Process also carries `tests/setupServer.ts`. Queue's `tests/setup.ts` has no export lines; its comment says fleet helpers live in `@orkestrel/test` (`/home/user/orkestrel/queue/tests/setup.ts:1-8`).

Exports from each `tests/setup.ts` export line:

- **abort** — `isBrowserVuePath`
- **agent** — `ScriptedTurn`, `ScriptedCall`, `DeltasOf`, `ScriptedProviderOptions`, `ScriptedProviderInterface`, `createScriptedProvider`, `createToolCall`, `createTokenUsage`, `addTool`, `loopTool`, `createAgentJob`, `createStubSummarizer`, `RecordingSchedulerInterface`, `createRecordingScheduler`, `buildConversationSnapshot`, `assertConversationStoreContract`
- **brief** — `FIRST_RULE`, `CAPTURED_RULE`, `buildTask`, `buildManifest`, `buildBrief`, `buildReadyInput`, `buildInterpret`, `buildFailingInterpret`, `buildForeignInterpret`, `AccessorInterpretation`, `ShiftingAccessorInterpretation`, `ShiftingForeignInterpretation`, `buildShiftingInterpret`, `buildAccessorInterpret`, `buildAdversarialValues`, `readErrorCode`, `buildPermissiveEvaluator`, `buildCountingReason`, `buildStableReason`, `buildShiftingReason`, `ShiftingLogicalResult`, `buildSilentReason`, `readConclusion`, `readErrorContext`, `buildInheritedActions`
- **budget** — `captureContractError`, `selectCharge`, `isBrowserVuePath`
- **csv** — `TEST_SEED`, `assertAndNarrow`, `buildQuotedField`, `buildRaggedCSV`, `buildMixedNewlineCSV`, `buildInferenceTraps`
- **emitter** — `isBrowserVuePath`
- **form** — `AnswerCase`, `ChangedCase`, `SchemaCase`, `ANSWER_CASES`, `CHANGED_CASES`, `STRING_FIELDS`, `MATRIX_RULES`, `RULE_APPLICABILITY`, `MATRIX_FIELDS`, `MATRIX_VALUES`, `createFieldBudgetSchema`, `createGroupBudgetSchema`, `createChoiceBudgetSchema`, `createNameBudgetCases`, `createStringBudgetCases`, `createTextBudgetSchema`, `createTextPopulationSchema`, `passValidation`, `createSequenceValidator`, `createNodeBudgetSchema`, `createNodePopulationSchema`, `createCheckboxLimit`
- **html** — `TEST_SEED`, `buildHTMLPageInput`, `isBrowserVuePath`, `buildDeepHTMLInput`, `buildHTMLRoundtripCorpus`, `buildHTMLCommentEnumeration`, `throwHostileHTMLAccess`, `returnHTMLNonIterator`, `buildHostileHTMLAllowlists`, `buildShadowedHTMLAllowlist`, `HTMLSanitizerCase`, `buildHTMLSanitizerCorpus`, `buildEncodedHTMLSchemeCorpus`, `HTMLEntityURLCase`, `buildHTMLEntityURLCorpus`, `URLSafetyCase`, `buildURLSafetyCorpus`, `URL_SAFETY_GROUPS`, `buildDeepHTMLDocument`, `buildBranchingHTMLElement`, `buildDiamondHTMLDocument`, `buildSharedHTMLPreDocument`, `buildHTMLAttributeInput`, `buildMixedHTMLInput`, `buildDeepHTMLNode`, `buildCyclicHTMLNode`, `throwHostileHTMLGetter`, `buildHostileHTMLNode`, `buildRevokedHTMLNode`, `buildHostileHTMLPrototype`, `extractHTMLText`, `hasAdjacentHTMLText`, `measureHTMLDepth`
- **interpret** — `expectSymbolic`, `EXTREME_NUMBERS`, `TRICKY_KEYS`, `buildInterpretTemplate`, `INTERPRET_ACTIONS`, `INTERPRET_DOMAINS`, `buildInsuranceTemplate`, `buildEligibilityTemplate`, `buildLoanTemplate`, `buildStatisticsTemplate`, `buildInterpretation`, `seedInterpretContext`, `isBrowserVuePath`
- **markdown** — `TEST_SEED`, `firstBlock`, `assertHeadingNode`, `assertListNode`, `assertTableNode`, `assertParagraphNode`, `assertCodeBlockNode`, `assertBlockquoteNode`, `assertEmphasisNode`, `assertCodeSpanNode`, `assertLinkNode`, `assertInlineNode`, `inlineText`, `buildProjection`, `projectHTML`, `MARKDOWN_FIXPOINT_CORPUS`, `PROJECTION_CORPUS`, `buildCyclicNode`, `buildHostileNode`, `buildDeepInlineNode`, `buildDeepBlockNode`, `buildDeepQuoteInput`, `buildDeepListInput`, `buildDeepEmphasisInput`, `isBrowserVuePath`
- **msg** — `asciiBytes`, `patchBytes`, `buildEml`, `buildNestedMultipart`, `isBrowserVuePath`
- **ndjson** — `LF`, `CR`, `TAB`, `FF`, `VT`, `BACKSLASH`, `feedAll`, `chunkings`, `partition`, `isBrowserVuePath`
- **pool** — `PoolEvent`, `POOL_EVENTS`
- **process** — `export {}` (`/home/user/orkestrel/process/tests/setup.ts:4`); already proven
- **program** — `createFixedQualifier`, `createFixedRater`, `createFixedEngine`, `createQualificationResultClass`, `createMalformedQualificationResult`, `createMalformedRatingResult`, `createMalformedLogicalResult`, `createResultClass`, `RecordingRaterCall`, `RecordingRaterInterface`, `createRecordingRater`, `isSubjectArray`, `RecordingEngineInterface`, `createRecordingEngine`, `EventRecorderInterface`, `recordEvents`, `baseRate`, `baseLine`, `standardRating`, `standardQualification`, `standardProgramDefinition`, `eligibleSubject`, `ineligibleSubject`, `referralProgramDefinition`, `referralSubject`, `scopedProgramDefinition`, `frameSubject`, `coastalReferralSubject`, `failedQualificationProgramDefinition`, `conditionalProgramDefinition`, `conditionalSubject`, `emptyLinesProgramDefinition`, `emptyCollectionsProgramDefinition`, `noticeProgramDefinition`, `buildAuthorityProgram`, `conditionalAuthority`, `cleanAuthority`, `scopedReferralProgramDefinition`, `unratedAuthority`, `batchAggregateProgramDefinition`, `batchSubjects`, `buildAggregateGateProgram`, `buildCarrierProgram`, `cloneSubject`, `createQuantOnlyEngine`, `buildBrokenLogicalDefinition`, `zeroPassQualification`, `brokenAggregateGateProgramDefinition`, `brokenAuthorityProgramDefinition`, `eligibilityOnlyProgramDefinition`, `eligibilityOnlyConditionalProgramDefinition`, `eligibilityOnlyReferralProgramDefinition`, `eligibilityOnlyWithAuthorityProgramDefinition`, `buildEligibilityOnlyNoticeMissingScopeDefinition`, `eligibilityOnlyBatchSubjects`, `failedQualificationWithAuthorityProgramDefinition`, `allLinesScopedOutProgramDefinition`, `buildLargeBatch`, `sharedIdBatchSubjects`, `buildHostileSubject`, `isBrowserVuePath`
- **qualifier** — `buildCyclicRecord`, `buildDeepRecord`, `buildHostileRecord`, `buildGatesDefinition`, `buildReferralDefinition`, `buildCapExcessGatesDefinition`, `buildScopedWindDefinition`, `buildConditionDefinition`, `buildEvidenceSnapshotDefinition`, `buildContinuingLogicalDefinition`, `createFailingEngine`, `isBrowserVuePath`
- **queue** — none
- **rater** — `TestTotalRecorderInterface`, `createTotalRecorder`, `deepFreeze`, `EXTREME_NUMBERS`, `createSubject`, `createStaticRate`, `createLine`, `createQuoteRate`, `createLookupFailureLine`, `createCheckFailureLine`, `createEngine`, `createStubEngine`, `createWorksheet`, `createLineResult`
- **reason** — `expectQuantitative`, `expectLogical`, `expectSymbolic`, `expectInferential`, `deepFreeze`, `BASIC_SUBJECT`, `NESTED_SUBJECT`, `DRIVER_SUBJECT`, `buildStaticDefinition`, `createThrowingReasoner`, `runTwice`, `sequence`, `repeatValue`, `EXTREME_NUMBERS`, `TRICKY_KEYS`, `sparse`, `deepCompound`, `deepAddition`, `INTEGER_KEY_SUBJECT`, `ADVERSARIAL_SYMBOL_KEY`, `ADVERSARIAL_VALUE_SUBJECT`, `buildSubjects`
- **relation** — `INTEGRATION_TABLES`, `INTEGRATION_RELATIONS`, `isBrowserVuePath`, `FaultDriver`
- **sse** — `LF`, `CR`, `TAB`, `feedAll`, `chunkings`, `partition`, `buildRepeated`, `expectSSEError`
- **table** — `compareTextNaturally`, `matchTextLoosely`, `compareTextByLength`, `createFilterAdmissibilityVectors`, `createTableSchema`, `createTableRows`, `createTableFixture`, `readTableError`, `readDestroyedWrites`, `createColumnBudgetSchema`, `createChoiceBudgetSchema`, `createTextBudgetSchema`, `createNodeBudgetSchema`
- **template** — `isBrowserVuePath`
- **timeout** — `isBrowserVuePath`
- **tool** — `createToolCall`, `isBrowserVuePath`
- **workspace** — `createThrowingGetterRecord`, `createRevokedProxy`, `buildWorkspaceSnapshot`, `assertWorkspaceStoreContract`

## 3. Published surface per package

Each `files` array is `["dist/src", "README.md"]`:

- test: `/home/user/orkestrel/test/package.json:13-16`
- mcp: `/home/user/orkestrel/mcp/package.json:22-25`
- brief: `/home/user/orkestrel/brief/package.json:22-25`
- html: `/home/user/orkestrel/html/package.json:23-26`
- process: `/home/user/orkestrel/process/package.json:21-24`
- middleware: `/home/user/orkestrel/middleware/package.json:25-28`

## 4. mcp send site

`StdioServerTransport.send` is `/home/user/orkestrel/mcp/src/server/transports/StdioServerTransport.ts:99-101`: `this.#output.write(\`${JSON.stringify(message)}\n\`)` with no return check and no callback. Input gets `#failure` on `error` (`:96`); `#output` has no `error` subscription.

The class has no options interface. Constructor is `(input, output)` (`:60-64`). Factory options are `StdioServerOptions` at `/home/user/orkestrel/mcp/src/server/types.ts:478-481` (`input?`, `output?`).

Other transport classes with `send`:

- **StdioClientTransport** (`.../StdioClientTransport.ts:168-181`) — awaits `child.send`; throws when the answer is false. Options: `/home/user/orkestrel/mcp/src/server/types.ts:373-398`.
- **WebSocketServerTransport** (`.../WebSocketServerTransport.ts:85-89`) — `this.#socket.send(...)`; comment: closed connection is a silent no-op.
- **WebSocketClientTransport** server (`.../WebSocketClientTransport.ts:119-123`) — throws if no socket; otherwise `socket.send` with no write-result check. Options: `types.ts:353-356`.
- **HTTPClientTransport** server (`.../HTTPClientTransport.ts:118-126`, `#exchange` `:151-155`) — fetch failure emits `error` and returns; `send` does not throw. Options: `types.ts:296-301`.
- **WebSocketClientTransport** browser (`.../browser/transports/WebSocketClientTransport.ts:118-126`) — silent return if closed; queues if not `OPEN`; no write-result check. Options: `/home/user/orkestrel/mcp/src/browser/types.ts:49-52`.
- **HTTPClientTransport** browser (`.../browser/transports/HTTPClientTransport.ts:121-129`) — same fetch-error emit-and-return as server. Options: `browser/types.ts:73-78`.
- **MessagePortTransport** (`.../browser/transports/MessagePortTransport.ts:82-85`) — silent return if closed; else `postMessage` with no try/catch. Options: `browser/types.ts:90-91`.

Tests covering `StdioServerTransport.send`: `/home/user/orkestrel/mcp/tests/src/server/transports/StdioServerTransport.test.ts:128-154` (`writes one newline-terminated JSON line per send`, `writes one line per sequential send`). Other suites call `send` as protocol traffic, not as a write-failure proof for this class.

## 5. brief constants site

Array literal of `Interpretation` member names: `/home/user/orkestrel/brief/src/core/BriefCompiler.ts:284-299` inside `#read`. Members: `text`, `normalized`, `intent`, `entities`, `subject`, `definition`, `mappings`, `ambiguities`, `prompt`, `stages`, `failures`, `complete`, `confidence`, `digest`.

`Interpretation` lives at `/home/user/orkestrel/interpret/src/core/types.ts:280-295`.

`src/core/constants.ts` currently exports `TASK_OPERATIONS`, `TASK_DOMAINS`, `OUTPUT_FORMATS`, `RISK_SEVERITIES`, `DEFAULT_BRIEF_TURNS`, `GATE_ID`, `LINE_BREAK_PATTERN`, `SINGLE_LINE_PATTERN`, `BLANK_PATTERN` (`/home/user/orkestrel/brief/src/core/constants.ts:4-88`).

Consumers of that literal: `#own(..., members)` at `BriefCompiler.ts:304` and `captureValue(live, members)` at `:327`. `captureValue` itself is `/home/user/orkestrel/brief/src/core/cloners.ts:30`; its tests pass other member lists.

## 6. process test sites

Weak negative assertion: `/home/user/orkestrel/process/tests/src/server/ProcessManager.test.ts:200-206` in `refuses a launch whose own options destroyed the registry mid-construction` (`:150-154`). Comment: `This branch proves only that the marker stays absent during the window. A change that stopped spawning the child would also pass it.` Then `expect(markerValid).toBe(true)` with `markerValid = !existsSync(marker)` on non-win32.

Spawning proof in shared `src:server`: `/home/user/orkestrel/process/tests/src/server/Process.test.ts` (opens with `createProcess({ command: childCommand('chatty'), ... })` at `:13-18`). Collected by project `src:server` (`/home/user/orkestrel/process/vite.config.ts:87-94`, include `tests/src/server/**/*.test.ts`). Spawns `/home/user/orkestrel/process/tests/src/server/fixtures/child.mjs` via `childCommand` / `process.execPath` (`/home/user/orkestrel/process/tests/setupServer.ts:9-11`). The same include also collects `ProcessManager.test.ts`, `execution/execute.test.ts`, `executeSync.test.ts`, `detach.test.ts`, and `helpers.test.ts`.

## 7. html sites

`tests/setup.ts` exports: same html list as Q2 (`/home/user/orkestrel/html/tests/setup.ts:11-812`).

Size assertions of `2_125`:

- exhaustive-decode: `/home/user/orkestrel/html/tests/src/core/helpers.test.ts:61-63` (`decodes every semicolon-terminated WHATWG named entity exactly`)
- entity audit: `:90-93` (`audits every security-relevant generated entity value against the reviewed set`; comment that table size guards the sweep's population)

`NAMED_ENTITIES` declared `/home/user/orkestrel/html/src/core/constants.ts:378-2504` as `export const NAMED_ENTITIES: Readonly<Record<string, string>> = Object.freeze({ ... })`.

## 8. middleware sites

Request-tally: `countActiveFileRequests` at `/home/user/orkestrel/middleware/tests/setupServer.ts:234-236`. Closed-handle: `detectClosedHandle` at `:253`.

Consuming suite: `/home/user/orkestrel/middleware/tests/src/server/helpers.test.ts:40-41` (imports) and `:1053-1117` (uses). `middlewares.test.ts` imports other `setupServer` symbols, not these two (`:33-40`).

`package.json` `test` chain: `/home/user/orkestrel/middleware/package.json:71` — `npm run test:src && npm run test:policy && npm run test:config && npm run test:guides`. No `test:setup`.

## 9. test guide residue

Residue headings in `/home/user/orkestrel/test/guides/test.md` (opening fences under the heading until the next `###`):

- Capture a throw, then assert on it — `:1363` — 1 fence (SyntaxError / thrown-`undefined` claims at `:1372-1377`)
- Wait for a named condition — `:1469` — 2 fences (`retryUntil` in the first at `:1490` and the second at `:1526`)
- Copy a JSON value — `:1544` — 1 fence
- Prove a guard is total — `:1568` — 1 fence
- Prove a wire fixpoint — `:1618` — 1 fence
- Read a source inventory — `:1636` — 1 fence
- Own a temporary directory — `:1676` — 2 fences (scratch-directory)
- Give everything back in one hook — `:1760` — 1 fence
- Answer a real request on a loopback port — `:1791` — 1 fence
- Probe what the host supports — `:1869` — 1 fence
- Refuse an escaping path in your own fixture — `:1932` — 1 fence
- Build and mount a fixture — `:1952` — 1 fence
- Drive an interface the way a person does — `:1987` — 1 fence
- Drive a field the component listens to — `:2018` — 1 fence
- Read the tokens and colors a theme declares — `:2101` — 1 fence (theme-token)
- Find a rule in the cascade — `:2129` — 1 fence
- Remove an IndexedDB database — `:2157` — 1 fence
- Place a capture portfolio — `:2221` — 1 fence

`below` near Threat model: `/home/user/orkestrel/test/guides/test.md:1089` — `Read rule 7 against the \`createScratch\` paragraphs below and rule 6 against the \`readInventory\` one.`

Transcription pattern in `/home/user/orkestrel/test/tests/guides.test.ts:160-165`: a carrier opens with `guides/test.md → <section> → "<heading>"`; routed-away carriers are asserted by presence of that line. Example: `:177-185` asserts the `contrast` / `readRing` / `createJournal` marker lines. Same marker form in `/home/user/orkestrel/test/tests/src/browser/helpers.test.ts:1398-1399` (`contrast`) and `:1416-1417` (`readRing`), and `/home/user/orkestrel/test/tests/src/browser/factories.test.ts:469-470` (`createJournal`).

## 10. test:guides planned value

Composed at `/home/user/scaffold/src/core/compilers.ts:306` (`const vitest = 'vitest run --config vite.config.ts --no-cache --reporter=dot'`) and `:376` (`scripts['test:guides'] = \`${vitest} --project guides\``). Planned value therefore includes `--no-cache`.

Neighbouring planned `test:*` from the same `vitest` string: `test:policy` `:373`, `test:config` `:374`, `test:setup` `:375`, `test:conformance` `:377`. Separate `--no-cache` spellings: `test:probe` `:378-379` (`--reporter=verbose`), `test:bench` `:380` (`vitest bench`).
