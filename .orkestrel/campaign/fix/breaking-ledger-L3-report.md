**Question**

For every breaking work-order row under L3, name the exact published symbols the remaining repair moves, verified in current package source, so a script can compute each row’s consumer blast radius.

**Evidence**

Work order L3: `.orkestrel/campaign/fix/work-order.md`. Findings: `.orkestrel/campaign/fix/{browser,guide,interpret,mcp,qualifier,rater,relation,sea,server,terminal,workspace}.md` under each `## <id>`. Writer notes: `.orkestrel/campaign/fix/reports/` for those packages. Dossier lines are stale; symbols below are current `src/` hits under `/home/user/fleet/<package>/src/**`.

- **browser s04-01** — coercers still `read*` returning `T | undefined`: `readBrowserRequest` `helpers.ts:188`, `readBrowserResponse` `:229`, `readBrowserResponseRecord` `:257`, `readBrowserTiming` `:301`, `readBrowserTimingRange` `:325`, `readBrowserSecurity` `:619`, `readBrowserRequestFailure` `:644`, `readBrowserWebSocketFrame` `:662`, `readBrowserBindingCall` `:714`, `readBrowserAXString` `:1087`, `readBrowserCookiePartition` `:1463`, `readBrowserConsoleMessage` `:1577`, `readBrowserPageError` `:1622`, `readBrowserDownloadStart` `:1645`, `readBrowserDownloadProgress` `:1669`, `readCodegenNavigateAction` `:1825`, `readNumberArray` `:2018`, `readSnapshotString` `:2032`, `readBrowserRect` `:2100`. `parseCodegenActionPayload` already `parse*` at `:1790` (move-only). No `parsers.ts`.
- **browser s04-02** — `decodeRareStringData` `helpers.ts:2044`, `decodeRareBooleanData` `:2068`, `decodeRareIntegerData` `:2079`, `decodeBrowserAttributes` `:2120`, `decodeBrowserSnapshot` `:2144`. Prerequisite s04-01.
- **browser s04-05** — `BrowserDiscoveryResult.found` / `.connection` `server/types.ts:35,38`.
- **browser s04-06** — `ScreenshotWriterInterface` `core/types.ts:130`; `createScreenshotWriter` `server/factories.ts:41`.
- **browser s04-07** — `BrowserFilterOptions` `types.ts:539`; `BrowserLocatorInterface.filter` `:558`.
- **browser s04-09** — `BrowserLocatorInterface.text` `types.ts:575`; `BrowserLocator.text` `BrowserLocator.ts:288`; `BrowserTextResultOptions` `types.ts:542`.
- **browser s04-10** — `BrowserWebSocketInterface.receive/transmit/fail/close` `types.ts:909-912`; `BrowserDownloadInterface.update` `:757`; `BrowserFrameInterface.assert/update` `:1418-1419`. Class methods: `BrowserWebSocket.ts:44,48`, `BrowserDownload.ts:74`, `BrowserFrame.ts:208,214`.
- **browser s04-11** — `fail` still published: interface `types.ts:911`, class `BrowserWebSocket.ts:44`. `close(timestamp)` stays `:912` / `:48`.
- **browser s04-12** — deletes `findEnvOverride` `server/helpers.ts:175`, `findInstallPath` `:222`, `probePathNames` `:232`, `findInStore` `:300`; surviving plurals `findAllEnvOverrides` `:182`, `findAllInstallPaths` `:227`, `probeAllPathNames` `:237`, `findAllInStore` `:305`.
- **browser s04-18** — `CDPTarget.type` `types.ts:61`; `BrowserScreenshotOptions.type` `:252`; `BrowserNode.type` `:1445`.
- **browser s04-19** — `BrowserActionOptions.delay/button/count/position/steps` `types.ts:218-222`.
- **browser s04-20** — `BrowserMedia.media` / `.color` `types.ts:1216-1217`; `.colors` stays `:1220`.
- **browser s04-21** — barrel still star-exports `BrowserDialog` `index.ts:13`, `BrowserDownload` `:14`, `BrowserFileChooser` `:17`, `BrowserHandle` `:20`, `BrowserRoute` `:34`, `BrowserWorker` `:37`. Class exports: `BrowserDialog.ts:11`, `BrowserDownload.ts:14`, `BrowserFileChooser.ts:7`, `BrowserHandle.ts:9`, `BrowserRoute.ts:15`, `BrowserWorker.ts:10`.
- **browser s04-22** — `guardEvaluateExpression` now `compilers.ts:245` (s04-03 move landed).
- **browser s04-26** — `CDPClientInterface` still has no `emitter` `types.ts:80-92`. `CDPClientOptions.error` already present `:45`.
- **browser s04-29** — `fetchCDPTargets` `server/helpers.ts:425` returns `Promise<readonly CDPTarget[]>`.
- **browser s04-35** — `BrowserInterface.connected` `server/types.ts:239`; `Browser.connected` `Browser.ts:131`.
- **browser s04b-04** — `BrowserCookieManagerInterface.list` `types.ts:1158`; `BrowserCookieManager.list` `BrowserCookieManager.ts:24`.
- **browser s04b-05** — `CDPClientInterface.send` `types.ts:84`; `CDPClient.send` `CDPClient.ts:85`; `BrowserFrameInterface.send` `types.ts:1410`; `BrowserFrame.send` `BrowserFrame.ts:185`. No `CDPSendOptions`.
- **browser s04b-10** — `BrowserSelector` includes `'test'` `types.ts:507`; `BrowserSelectorManagerInterface.test` `:596`; `BrowserSelectorManager.test` `BrowserSelectorManager.ts:57`.
- **browser s04b-12** — `BrowserPerformanceInterface.active/start/stop` `types.ts:477-480`; class `BrowserPerformance.ts:22,35,59`.
- **guide s15-16 / s15-17** — `moduleKey` `helpers.ts:607`, `symbolKey` `:663`, `missingSymbols` `:724`, `fenceImports` `:774`, `firstCode` `:887`, `cellLinks` `:909`, `identifierOf` `:933`, `kindIndex` `:951`, `exportsFrom` `:984`, `hiddenFrom` `:1028`, `declarationBody` `:1091`, `memberMethods` `:1135`, `sectionBlocks` `:1160`, `examplesFrom` `:1433`, `exampleMethods` `:1464`.
- **interpret s12-25** — `GeneratorOptions` `types.ts:507`; `createGenerator` `factories.ts:173`.
- **interpret s12-26** — `createTemplate` `factories.ts:291`.
- **interpret s12-29** — `InterpretInterface.register/unregister` `types.ts:823-824`; `InterpretEventMap.register` `:352`; class `Interpret.ts:324,330`.
- **interpret s12-30** — `Intent.action` / `.domain` required `types.ts:153-154`.
- **interpret s12-34** — `InterpretOptions.lexicon` / `.formatters` `types.ts:653-654` beside `formatter` `:648`.
- **interpret s12-35** — `Interpret.destroy` `Interpret.ts:355` always calls `#context.destroy()` `:358`; `InterpretInterface.destroy` `types.ts:829`.
- **interpret s12-37** — `GeneratorInterface.generate` `types.ts:697`; emission at `Generator.ts:108-115`. `EntityMapping` has no `aggregates` `types.ts:81`.
- **interpret s12-38** — `DEFAULT_ABBREVIATIONS` `constants.ts:88`, `DEFAULT_CORRECTIONS` `:91`, `DEFAULT_ACTIONS` `:94`, `DEFAULT_DOMAINS` `:97`, `DEFAULT_VERBS` `:100`.
- **interpret s12-39** — `INTERPRET_ID` `constants.ts:31`.
- **interpret s12-42** — `size` on `RecordManagerInterface` `types.ts:592`, `TemplateManagerInterface` `:739`, `SubjectManagerInterface` `:756`, `DefinitionManagerInterface` `:770`.
- **interpret s12-43** — `ManagerAddOptions` `types.ts:612`.
- **interpret s12-45** — `canonicalize` `helpers.ts:573` still takes `visited`.
- **mcp s01-01** — `HTTPClientTransport` `browser/transports/HTTPClientTransport.ts:83`, `server/transports/HTTPClientTransport.ts:82`; face barrels `browser/index.ts:4`, `server/index.ts:6`; core barrel does not re-export either face.
- **mcp s01-02** — `decodeEvent` `browser/helpers.ts:47`, `server/helpers.ts:306`; `readEventStream` `browser/helpers.ts:69`, `server/helpers.ts:268`.
- **mcp s01-03** — `createScopeMessageListener` `browser/helpers.ts:133`, `serveMCPScope` `:178`, `serveMCP` `:214`.
- **mcp s01-04** — comment half applied. Remaining: `DEFAULT_MCP_CLIENT_NAME = 'taverna'` `core/constants.ts:235`; `DEFAULT_MCP_SERVER_NAME = 'taverna'` `browser/constants.ts:43`.
- **mcp s01-07** — `MCPSessionOptions` `server/types.ts:180`; `MCPSession` constructor `MCPSession.ts:69`; `createMCPSession` `middlewares.ts:95`.
- **mcp s01-09** — `createReadableStream` `server/helpers.ts:58`.
- **mcp s01-10** — `MCPClientTransportEventMap` `core/types.ts:2356`; `MCPClientTransportInterface` `:2380`; implementers `StdioServerTransport.ts:50`, `WebSocketServerTransport.ts:49`.
- **mcp s01-11** — `bridgeMessageTransport` `server/helpers.ts:471`.
- **mcp s01-18** — `EventStoreEntry` `server/types.ts:249`; `MCPSessionInterface.replay` `:216`.
- **mcp s01-19** — `inferHeaderIssue` `server/inferers.ts:87` still `reference: JSONRPCInvocation | MCPVersion`.
- **qualifier s16-27** — `QualificationValidationResult` `types.ts:114`; `isQualificationValidationResult` `validators.ts:172`; `QualifierInterface.validate` `types.ts:200`.
- **qualifier s16-30** — `findMissingReferences` `helpers.ts:578`, `findEmptyLogicalPasses` `:722`, `findUnreadDerivations` `:758`.
- **qualifier s16-32** — `QualifierError.context` `errors.ts:15`; constructor third param `context?: unknown` `:17`.
- **rater s17-05** — `worksheetFactor` `helpers.ts:158`, `worksheetGroup` `:191`, `resultsWorksheet` `:318`, `ratedLine` `:357`.
- **rater s17-06** — `evidenceCheck` `helpers.ts:95`, `checkEvidence` `:130`.
- **rater s17-08** — `LineResult.success` `types.ts:117`. `RatingResult.success` stays `:131`.
- **relation s17-10** — `ResolvedRelation` interface `types.ts:92` with optional `column/key/through/source/target/tag/label` `:96-102`.
- **sea s12-03** — `parsePEOffset` `server/helpers.ts:474`.
- **sea s12-05** — `runShell` `server/helpers.ts:153`.
- **sea s12-07** — `buildELFNoteHeader` return `{ header, entryTotal }` `server/helpers.ts:982,985`.
- **sea s12-17** — `SEAProgressHandler` `server/types.ts:66`.
- **server s14-01** — `enqueueStreamText` `server/helpers.ts:1197`, `openStream` `:1247`.
- **server s14-03** — `appendCookie` `server/helpers.ts:329`.
- **server s14-11** — `ServerInterface.start` `types.ts:711`; reject `Server.ts:192`.
- **server s14-12** — `codingQuality` `helpers.ts:652`, `languageQuality` `:771`, `ipv6Network` `:1093`, `clientRateKey` `:1142`.
- **server s14-14** — `ConnectionInfo` `types.ts:108`.
- **terminal s12-48** — `KeyEvent.name: string` `types.ts:35`; `parseKey` `helpers.ts:79`.
- **terminal s12-52** — `TerminalManagerInterface.terminals` `types.ts:670`; `TerminalManager.terminals` `TerminalManager.ts:103` returns `readonly string[]`.
- **terminal s12-54** — `promptHeader` `helpers.ts:294`, `hintedHeader` `:308`, `submitHeader` `:319`, `errorLine` `:324`, `inputView` `:353`, `passwordView` `:410`, `confirmView` `:470`, `selectView` `:531`, `checkboxView` `:616`, `editorView` `:725`; `inputReduce` `:365`, `passwordReduce` `:423`, `confirmReduce` `:483`, `selectReduce` `:558`, `checkboxReduce` `:648`, `editorReduce` `:742`; server `rawCapable` `server/helpers.ts:100`, `enabledChoices` `:210`, `disabledChoices` `:222`, `groupHeader` `:227`, `lockedLine` `:242`, `suggestionLine` `:253`, `unavailableLine` `:263`, `numberedList` `:282`.
- **terminal s12-55** — `serializeShutdown` `helpers.ts:867`; `SSE_EVENTS.shutdown: 'shutdown'` `constants.ts:214`.
- **terminal s12-58** — `TimerCancel` `types.ts:376`.
- **terminal s12-59** — `Parked` `types.ts:388`.
- **workspace s17-31** — `FileContent` binary arm `data` `types.ts:11`.
- **workspace s17-32** — `decodedSize` `helpers.ts:102`.

**Distillate**

```json
[
  {
    "package": "browser",
    "id": "s04-01",
    "kind": "rename",
    "edits": [
      { "symbol": "readBrowserRequest", "action": "rename", "to": "parseBrowserRequest", "file": "src/core/helpers.ts:188" },
      { "symbol": "readBrowserResponse", "action": "rename", "to": "parseBrowserResponse", "file": "src/core/helpers.ts:229" },
      { "symbol": "readBrowserResponseRecord", "action": "rename", "to": "parseBrowserResponseRecord", "file": "src/core/helpers.ts:257" },
      { "symbol": "readBrowserTiming", "action": "rename", "to": "parseBrowserTiming", "file": "src/core/helpers.ts:301" },
      { "symbol": "readBrowserTimingRange", "action": "rename", "to": "parseBrowserTimingRange", "file": "src/core/helpers.ts:325" },
      { "symbol": "readBrowserSecurity", "action": "rename", "to": "parseBrowserSecurity", "file": "src/core/helpers.ts:619" },
      { "symbol": "readBrowserRequestFailure", "action": "rename", "to": "parseBrowserRequestFailure", "file": "src/core/helpers.ts:644" },
      { "symbol": "readBrowserWebSocketFrame", "action": "rename", "to": "parseBrowserWebSocketFrame", "file": "src/core/helpers.ts:662" },
      { "symbol": "readBrowserBindingCall", "action": "rename", "to": "parseBrowserBindingCall", "file": "src/core/helpers.ts:714" },
      { "symbol": "readBrowserAXString", "action": "rename", "to": "parseBrowserAXString", "file": "src/core/helpers.ts:1087" },
      { "symbol": "readBrowserCookiePartition", "action": "rename", "to": "parseBrowserCookiePartition", "file": "src/core/helpers.ts:1463" },
      { "symbol": "readBrowserConsoleMessage", "action": "rename", "to": "parseBrowserConsoleMessage", "file": "src/core/helpers.ts:1577" },
      { "symbol": "readBrowserPageError", "action": "rename", "to": "parseBrowserPageError", "file": "src/core/helpers.ts:1622" },
      { "symbol": "readBrowserDownloadStart", "action": "rename", "to": "parseBrowserDownloadStart", "file": "src/core/helpers.ts:1645" },
      { "symbol": "readBrowserDownloadProgress", "action": "rename", "to": "parseBrowserDownloadProgress", "file": "src/core/helpers.ts:1669" },
      { "symbol": "readCodegenNavigateAction", "action": "rename", "to": "parseCodegenNavigateAction", "file": "src/core/helpers.ts:1825" },
      { "symbol": "readNumberArray", "action": "rename", "to": "parseNumberArray", "file": "src/core/helpers.ts:2018" },
      { "symbol": "readSnapshotString", "action": "rename", "to": "parseSnapshotString", "file": "src/core/helpers.ts:2032" },
      { "symbol": "readBrowserRect", "action": "rename", "to": "parseBrowserRect", "file": "src/core/helpers.ts:2100" }
    ],
    "guide": "guides/browser.md Surface rows for the read* coercers",
    "prerequisite": [],
    "summary": "Create src/core/parsers.ts, move every read* coercer that returns T | undefined into it, and rename each to parse*; parseCodegenActionPayload moves unchanged."
  },
  {
    "package": "browser",
    "id": "s04-02",
    "kind": "rename",
    "edits": [
      { "symbol": "decodeRareStringData", "action": "rename", "to": "readRareStringData", "file": "src/core/helpers.ts:2044" },
      { "symbol": "decodeRareBooleanData", "action": "rename", "to": "readRareBooleanData", "file": "src/core/helpers.ts:2068" },
      { "symbol": "decodeRareIntegerData", "action": "rename", "to": "readRareIntegerData", "file": "src/core/helpers.ts:2079" },
      { "symbol": "decodeBrowserAttributes", "action": "rename", "to": "readBrowserAttributes", "file": "src/core/helpers.ts:2120" },
      { "symbol": "decodeBrowserSnapshot", "action": "rename", "to": "readBrowserSnapshot", "file": "src/core/helpers.ts:2144" }
    ],
    "guide": "guides/browser.md Surface rows for the decode* snapshot/rare-data helpers",
    "prerequisite": ["s04-01"],
    "summary": "After s04-01, rename the remaining throw-on-malformed decodeRare* and decodeBrowser* helpers to the read* prefix; leave decodeBase64/encodeBase64."
  },
  {
    "package": "browser",
    "id": "s04-05",
    "kind": "remove",
    "edits": [
      { "symbol": "found", "action": "remove", "member": "BrowserDiscoveryResult", "file": "src/server/types.ts:35" },
      { "symbol": "connection", "action": "remove", "member": "BrowserDiscoveryResult", "file": "src/server/types.ts:38" }
    ],
    "guide": "guides/browser.md BrowserDiscoveryResult Types row",
    "prerequisite": [],
    "summary": "Drop BrowserDiscoveryResult.found and .connection, leaving endpoint and browser as the discovery answer."
  },
  {
    "package": "browser",
    "id": "s04-06",
    "kind": "rename",
    "edits": [
      { "symbol": "ScreenshotWriterInterface", "action": "rename", "to": "BrowserWriterInterface", "file": "src/core/types.ts:130" },
      { "symbol": "createScreenshotWriter", "action": "rename", "to": "createBrowserWriter", "file": "src/server/factories.ts:41" }
    ],
    "guide": "guides/browser.md ScreenshotWriterInterface Types row and createScreenshotWriter factory row",
    "prerequisite": [],
    "summary": "Rename ScreenshotWriterInterface to BrowserWriterInterface and createScreenshotWriter to createBrowserWriter."
  },
  {
    "package": "browser",
    "id": "s04-07",
    "kind": "mixed",
    "edits": [
      { "symbol": "BrowserFilterOptions", "action": "remove", "file": "src/core/types.ts:539" },
      { "symbol": "filter", "action": "change", "member": "BrowserLocatorInterface", "file": "src/core/types.ts:558" }
    ],
    "guide": "guides/browser.md BrowserFilterOptions Types row and BrowserLocatorInterface.filter Methods row",
    "prerequisite": [],
    "summary": "Delete the BrowserFilterOptions alias and retype BrowserLocatorInterface.filter to take BrowserLocatorFilter."
  },
  {
    "package": "browser",
    "id": "s04-09",
    "kind": "mixed",
    "edits": [
      { "symbol": "text", "action": "change", "member": "BrowserLocatorInterface", "file": "src/core/types.ts:575" },
      { "symbol": "text", "action": "change", "member": "BrowserLocator", "file": "src/core/BrowserLocator.ts:288" },
      { "symbol": "BrowserTextResultOptions", "action": "remove", "file": "src/core/types.ts:542" }
    ],
    "guide": "guides/browser.md BrowserLocatorInterface.text Methods row and BrowserTextResultOptions Types row",
    "prerequisite": [],
    "summary": "Split text(options?: { all?: boolean }) into text(): Promise<string> and texts(): Promise<readonly string[]>, and delete BrowserTextResultOptions."
  },
  {
    "package": "browser",
    "id": "s04-10",
    "kind": "remove",
    "edits": [
      { "symbol": "receive", "action": "remove", "member": "BrowserWebSocketInterface", "file": "src/core/types.ts:909" },
      { "symbol": "transmit", "action": "remove", "member": "BrowserWebSocketInterface", "file": "src/core/types.ts:910" },
      { "symbol": "fail", "action": "remove", "member": "BrowserWebSocketInterface", "file": "src/core/types.ts:911" },
      { "symbol": "close", "action": "remove", "member": "BrowserWebSocketInterface", "file": "src/core/types.ts:912" },
      { "symbol": "update", "action": "remove", "member": "BrowserDownloadInterface", "file": "src/core/types.ts:757" },
      { "symbol": "assert", "action": "remove", "member": "BrowserFrameInterface", "file": "src/core/types.ts:1418" },
      { "symbol": "update", "action": "remove", "member": "BrowserFrameInterface", "file": "src/core/types.ts:1419" }
    ],
    "guide": "guides/browser.md Methods rows for BrowserWebSocketInterface, BrowserDownloadInterface, and BrowserFrameInterface drive methods",
    "prerequisite": [],
    "summary": "Move receive/transmit/fail/close, update, and assert off the published observation interfaces onto the concrete classes only."
  },
  {
    "package": "browser",
    "id": "s04-11",
    "kind": "rename",
    "edits": [
      { "symbol": "fail", "action": "rename", "member": "BrowserWebSocketInterface", "file": "src/core/types.ts:911" },
      { "symbol": "fail", "action": "rename", "member": "BrowserWebSocket", "file": "src/core/BrowserWebSocket.ts:44" }
    ],
    "guide": "guides/browser.md BrowserWebSocketInterface.fail Methods row",
    "prerequisite": ["s04-10"],
    "summary": "Rename fail so the method and the error event share one term; close(timestamp) stays."
  },
  {
    "package": "browser",
    "id": "s04-12",
    "kind": "mixed",
    "edits": [
      { "symbol": "findEnvOverride", "action": "remove", "file": "src/server/helpers.ts:175" },
      { "symbol": "findInstallPath", "action": "remove", "file": "src/server/helpers.ts:222" },
      { "symbol": "probePathNames", "action": "remove", "file": "src/server/helpers.ts:232" },
      { "symbol": "findInStore", "action": "remove", "file": "src/server/helpers.ts:300" },
      { "symbol": "findAllEnvOverrides", "action": "rename", "to": "findEnvOverrides", "file": "src/server/helpers.ts:182" },
      { "symbol": "findAllInstallPaths", "action": "rename", "to": "findInstallPaths", "file": "src/server/helpers.ts:227" },
      { "symbol": "probeAllPathNames", "action": "rename", "to": "probePathNames", "file": "src/server/helpers.ts:237" },
      { "symbol": "findAllInStore", "action": "rename", "to": "findInStore", "file": "src/server/helpers.ts:305" }
    ],
    "guide": "guides/browser.md Surface rows and fence lines for the find*/probe* path helpers",
    "prerequisite": [],
    "summary": "Delete the four one-line singular wrappers and rename the surviving plurals, reusing probePathNames and findInStore with plural return types."
  },
  {
    "package": "browser",
    "id": "s04-18",
    "kind": "rename",
    "edits": [
      { "symbol": "type", "action": "rename", "to": "category", "member": "CDPTarget", "file": "src/core/types.ts:61" },
      { "symbol": "type", "action": "rename", "to": "format", "member": "BrowserScreenshotOptions", "file": "src/core/types.ts:252" },
      { "symbol": "type", "action": "rename", "to": "category", "member": "BrowserNode", "file": "src/core/types.ts:1445" }
    ],
    "guide": "guides/browser.md CDPTarget, BrowserScreenshotOptions, and BrowserNode Types rows",
    "prerequisite": [],
    "summary": "Rename BrowserScreenshotOptions.type to format, and CDPTarget.type plus BrowserNode.type to category."
  },
  {
    "package": "browser",
    "id": "s04-19",
    "kind": "option-key",
    "edits": [
      { "symbol": "delay", "action": "remove", "member": "BrowserActionOptions", "file": "src/core/types.ts:218" },
      { "symbol": "button", "action": "remove", "member": "BrowserActionOptions", "file": "src/core/types.ts:219" },
      { "symbol": "count", "action": "remove", "member": "BrowserActionOptions", "file": "src/core/types.ts:220" },
      { "symbol": "position", "action": "remove", "member": "BrowserActionOptions", "file": "src/core/types.ts:221" },
      { "symbol": "steps", "action": "remove", "member": "BrowserActionOptions", "file": "src/core/types.ts:222" }
    ],
    "guide": "guides/browser.md BrowserActionOptions Types row and the locator/frame method rows that accept it",
    "prerequisite": [],
    "summary": "Move button, count, position, steps, and delay off BrowserActionOptions onto operation-specific option types, narrowing the accepted options of the methods that currently take the flat bag."
  },
  {
    "package": "browser",
    "id": "s04-20",
    "kind": "rename",
    "edits": [
      { "symbol": "media", "action": "rename", "to": "output", "member": "BrowserMedia", "file": "src/core/types.ts:1216" },
      { "symbol": "color", "action": "rename", "to": "scheme", "member": "BrowserMedia", "file": "src/core/types.ts:1217" }
    ],
    "guide": "guides/browser.md BrowserMedia Types row",
    "prerequisite": [],
    "summary": "Rename BrowserMedia.color to scheme and media to output; leave colors as the forced-colors key."
  },
  {
    "package": "browser",
    "id": "s04-21",
    "kind": "remove",
    "edits": [
      { "symbol": "BrowserDialog", "action": "remove", "file": "src/core/BrowserDialog.ts:11" },
      { "symbol": "BrowserDownload", "action": "remove", "file": "src/core/BrowserDownload.ts:14" },
      { "symbol": "BrowserFileChooser", "action": "remove", "file": "src/core/BrowserFileChooser.ts:7" },
      { "symbol": "BrowserHandle", "action": "remove", "file": "src/core/BrowserHandle.ts:9" },
      { "symbol": "BrowserRoute", "action": "remove", "file": "src/core/BrowserRoute.ts:15" },
      { "symbol": "BrowserWorker", "action": "remove", "file": "src/core/BrowserWorker.ts:10" }
    ],
    "guide": "guides/browser.md Surface rows for the interned classes; interfaces stay public via BrowserPageEventMap",
    "prerequisite": [],
    "summary": "Intern BrowserRoute, BrowserHandle, BrowserFileChooser, BrowserWorker, BrowserDialog, and BrowserDownload by removing their barrel rows."
  },
  {
    "package": "browser",
    "id": "s04-22",
    "kind": "rename",
    "edits": [
      { "symbol": "guardEvaluateExpression", "action": "rename", "to": "compileGuardedEvaluateExpression", "file": "src/core/compilers.ts:245" }
    ],
    "guide": "guides/browser.md guardEvaluateExpression compiler/helper Surface row",
    "prerequisite": [],
    "summary": "Rename the exported guardEvaluateExpression to compileGuardedEvaluateExpression; the move into compilers.ts already landed under s04-03."
  },
  {
    "package": "browser",
    "id": "s04-26",
    "kind": "signature",
    "edits": [
      { "symbol": "emitter", "action": "change", "member": "CDPClientInterface", "file": "src/core/types.ts:80" }
    ],
    "guide": "guides/browser.md CDPClientInterface Methods/Types rows",
    "prerequisite": [],
    "summary": "Add a required emitter member to CDPClientInterface; CDPClientOptions.on/error already landed."
  },
  {
    "package": "browser",
    "id": "s04-29",
    "kind": "signature",
    "edits": [
      { "symbol": "fetchCDPTargets", "action": "change", "file": "src/server/helpers.ts:425" }
    ],
    "guide": "guides/browser.md fetchCDPTargets helper Surface row",
    "prerequisite": [],
    "summary": "Change fetchCDPTargets to return Promise<Result<readonly CDPTarget[], BrowserError>> instead of Promise<readonly CDPTarget[]>."
  },
  {
    "package": "browser",
    "id": "s04-35",
    "kind": "remove",
    "edits": [
      { "symbol": "connected", "action": "remove", "member": "BrowserInterface", "file": "src/server/types.ts:239" },
      { "symbol": "connected", "action": "remove", "member": "Browser", "file": "src/server/Browser.ts:131" }
    ],
    "guide": "guides/browser.md BrowserInterface.connected Methods row",
    "prerequisite": [],
    "summary": "Drop connected from BrowserInterface and Browser; keep status."
  },
  {
    "package": "browser",
    "id": "s04b-04",
    "kind": "rename",
    "edits": [
      { "symbol": "list", "action": "rename", "to": "cookies", "member": "BrowserCookieManagerInterface", "file": "src/core/types.ts:1158" },
      { "symbol": "list", "action": "rename", "to": "cookies", "member": "BrowserCookieManager", "file": "src/core/BrowserCookieManager.ts:24" }
    ],
    "guide": "guides/browser.md BrowserCookieManagerInterface Methods row (guide never names list today; renamed member owes a Surface row)",
    "prerequisite": [],
    "summary": "Rename BrowserCookieManagerInterface.list and the class method to cookies(urls?)."
  },
  {
    "package": "browser",
    "id": "s04b-05",
    "kind": "signature",
    "edits": [
      { "symbol": "send", "action": "change", "member": "CDPClientInterface", "file": "src/core/types.ts:84" },
      { "symbol": "send", "action": "change", "member": "CDPClient", "file": "src/core/CDPClient.ts:85" },
      { "symbol": "send", "action": "change", "member": "BrowserFrameInterface", "file": "src/core/types.ts:1410" },
      { "symbol": "send", "action": "change", "member": "BrowserFrame", "file": "src/core/BrowserFrame.ts:185" }
    ],
    "guide": "guides/browser.md CDPClientInterface.send and BrowserFrameInterface.send Methods rows plus a Surface row for CDPSendOptions",
    "prerequisite": [],
    "summary": "Replace send's positional session/timeout tail with a trailing options object on CDPClientInterface and BrowserFrameInterface; the sessionId→session parameter rename already landed."
  },
  {
    "package": "browser",
    "id": "s04b-10",
    "kind": "rename",
    "edits": [
      { "symbol": "test", "action": "rename", "to": "testId", "member": "BrowserSelector", "file": "src/core/types.ts:507" },
      { "symbol": "test", "action": "rename", "to": "testId", "member": "BrowserSelectorManagerInterface", "file": "src/core/types.ts:596" },
      { "symbol": "test", "action": "rename", "to": "testId", "member": "BrowserSelectorManager", "file": "src/core/BrowserSelectorManager.ts:57" }
    ],
    "guide": "guides/browser.md BrowserSelectorManagerInterface Surface/Methods row the renamed member owes",
    "prerequisite": [],
    "summary": "Rename the BrowserSelector literal and BrowserSelectorManagerInterface.test method from test to testId."
  },
  {
    "package": "browser",
    "id": "s04b-12",
    "kind": "mixed",
    "edits": [
      { "symbol": "active", "action": "remove", "member": "BrowserPerformanceInterface", "file": "src/core/types.ts:477" },
      { "symbol": "start", "action": "remove", "member": "BrowserPerformanceInterface", "file": "src/core/types.ts:479" },
      { "symbol": "stop", "action": "remove", "member": "BrowserPerformanceInterface", "file": "src/core/types.ts:480" },
      { "symbol": "active", "action": "remove", "member": "BrowserPerformance", "file": "src/core/BrowserPerformance.ts:22" },
      { "symbol": "start", "action": "remove", "member": "BrowserPerformance", "file": "src/core/BrowserPerformance.ts:35" },
      { "symbol": "stop", "action": "remove", "member": "BrowserPerformance", "file": "src/core/BrowserPerformance.ts:59" }
    ],
    "guide": "guides/browser.md BrowserPerformance mixed-shape description and BrowserDiagnostics Methods rows",
    "prerequisite": [],
    "summary": "Extract start, stop, and active off BrowserPerformanceInterface onto a BrowserProfilerInterface peer exposed as diagnostics.profiler."
  },
  {
    "package": "guide",
    "id": "s15-16",
    "kind": "rename",
    "edits": [
      { "symbol": "moduleKey", "action": "rename", "to": "computeModuleKey", "file": "src/core/helpers.ts:607" },
      { "symbol": "symbolKey", "action": "rename", "to": "computeSymbolKey", "file": "src/core/helpers.ts:663" },
      { "symbol": "missingSymbols", "action": "rename", "to": "findMissingSymbols", "file": "src/core/helpers.ts:724" },
      { "symbol": "fenceImports", "action": "rename", "to": "extractFenceImports", "file": "src/core/helpers.ts:774" },
      { "symbol": "firstCode", "action": "rename", "to": "findFirstCode", "file": "src/core/helpers.ts:887" },
      { "symbol": "cellLinks", "action": "rename", "to": "extractCellLinks", "file": "src/core/helpers.ts:909" },
      { "symbol": "identifierOf", "action": "rename", "to": "normalizeIdentifier", "file": "src/core/helpers.ts:933" },
      { "symbol": "kindIndex", "action": "rename", "to": "findKindIndex", "file": "src/core/helpers.ts:951" },
      { "symbol": "exportsFrom", "action": "rename", "to": "extractExports", "file": "src/core/helpers.ts:984" },
      { "symbol": "hiddenFrom", "action": "rename", "to": "extractHidden", "file": "src/core/helpers.ts:1028" },
      { "symbol": "declarationBody", "action": "rename", "to": "extractDeclarationBody", "file": "src/core/helpers.ts:1091" },
      { "symbol": "memberMethods", "action": "rename", "to": "extractMemberMethods", "file": "src/core/helpers.ts:1135" },
      { "symbol": "sectionBlocks", "action": "rename", "to": "selectSectionBlocks", "file": "src/core/helpers.ts:1160" },
      { "symbol": "examplesFrom", "action": "rename", "to": "extractExamples", "file": "src/core/helpers.ts:1433" },
      { "symbol": "exampleMethods", "action": "rename", "to": "extractExampleMethods", "file": "src/core/helpers.ts:1464" }
    ],
    "guide": "guides/guide.md Surface rows for the helpers; identifierOf also named in the normalize-every-identifier sentence",
    "prerequisite": [],
    "summary": "Rename the noun-phrase helpers to verb-noun form, with fenceImports → extractFenceImports and identifierOf → normalizeIdentifier in one fleet pass that also updates every package's tests/guides.test.ts."
  },
  {
    "package": "guide",
    "id": "s15-17",
    "kind": "rename",
    "edits": [
      { "symbol": "identifierOf", "action": "rename", "to": "normalizeIdentifier", "file": "src/core/helpers.ts:933" }
    ],
    "guide": "guides/guide.md identifierOf Surface row and the normalize-every-identifier sentence",
    "prerequisite": ["s15-16"],
    "summary": "Rename identifierOf to normalizeIdentifier as the s15-16 entry for that helper, not a second pass."
  },
  {
    "package": "interpret",
    "id": "s12-25",
    "kind": "mixed",
    "edits": [
      { "symbol": "GeneratorOptions", "action": "remove", "file": "src/core/types.ts:507" },
      { "symbol": "createGenerator", "action": "change", "file": "src/core/factories.ts:173" }
    ],
    "guide": "guides/interpret.md GeneratorOptions Types row and createGenerator factory row",
    "prerequisite": [],
    "summary": "Delete GeneratorOptions and the discarded createGenerator(_options?) parameter, leaving createGenerator(): GeneratorInterface."
  },
  {
    "package": "interpret",
    "id": "s12-26",
    "kind": "mixed",
    "edits": [
      { "symbol": "createTemplate", "action": "rename", "file": "src/core/factories.ts:291" }
    ],
    "guide": "guides/interpret.md createTemplate factory row and parseTemplate pairing note",
    "prerequisite": [],
    "summary": "Replace createTemplate(data: Template): Template with a throwing unknown-in helper under a new name, widening the parameter so the guard is reachable."
  },
  {
    "package": "interpret",
    "id": "s12-29",
    "kind": "mixed",
    "edits": [
      { "symbol": "register", "action": "rename", "to": "add", "member": "InterpretInterface", "file": "src/core/types.ts:823" },
      { "symbol": "unregister", "action": "rename", "to": "remove", "member": "InterpretInterface", "file": "src/core/types.ts:824" },
      { "symbol": "register", "action": "rename", "to": "add", "member": "Interpret", "file": "src/core/Interpret.ts:324" },
      { "symbol": "unregister", "action": "rename", "to": "remove", "member": "Interpret", "file": "src/core/Interpret.ts:330" },
      { "symbol": "register", "action": "rename", "to": "add", "member": "InterpretEventMap", "file": "src/core/types.ts:352" }
    ],
    "guide": "guides/interpret.md InterpretInterface register/unregister Methods rows and InterpretEventMap register row",
    "prerequisite": [],
    "summary": "Rename InterpretInterface.register/unregister to add/remove, rename the InterpretEventMap row to add, and give remove the remove()/remove(id)/remove(ids) overload set."
  },
  {
    "package": "interpret",
    "id": "s12-30",
    "kind": "mixed",
    "edits": [
      { "symbol": "action", "action": "change", "member": "Intent", "file": "src/core/types.ts:153" },
      { "symbol": "domain", "action": "change", "member": "Intent", "file": "src/core/types.ts:154" }
    ],
    "guide": "guides/interpret.md Intent Types row and classifyIntent examples",
    "prerequisite": [],
    "summary": "Make Intent.action and Intent.domain optional and return undefined for an unmatched axis in classifyIntent; drop the private -1 accumulator clause."
  },
  {
    "package": "interpret",
    "id": "s12-34",
    "kind": "option-key",
    "edits": [
      { "symbol": "lexicon", "action": "remove", "member": "InterpretOptions", "file": "src/core/types.ts:653" },
      { "symbol": "formatters", "action": "remove", "member": "InterpretOptions", "file": "src/core/types.ts:654" }
    ],
    "guide": "guides/interpret.md InterpretOptions Types row for lexicon/formatters",
    "prerequisite": [],
    "summary": "Group lexicon and formatters under a narrator key on InterpretOptions, removing those top-level option keys."
  },
  {
    "package": "interpret",
    "id": "s12-35",
    "kind": "behavior",
    "edits": [
      { "symbol": "destroy", "action": "change", "member": "InterpretInterface", "file": "src/core/types.ts:829" },
      { "symbol": "destroy", "action": "change", "member": "Interpret", "file": "src/core/Interpret.ts:355" }
    ],
    "guide": "guides/interpret.md InterpretInterface.destroy Methods row and Interpret class TSDoc teardown sentence",
    "prerequisite": [],
    "summary": "Stop destroy() from tearing down a caller-supplied options.context; current consumers of that teardown are an unresolved referral."
  },
  {
    "package": "interpret",
    "id": "s12-37",
    "kind": "behavior",
    "edits": [
      { "symbol": "generate", "action": "change", "member": "GeneratorInterface", "file": "src/core/types.ts:697" }
    ],
    "guide": "guides/interpret.md Generator TSDoc/Methods rows that document the unconditional Sum/Count/Average/Minimum/Maximum fields",
    "prerequisite": [],
    "summary": "Stop Generator.generate from unconditionally writing Sum/Count/Average/Minimum/Maximum onto a consumer's subject; the opt-in mechanism is not settled."
  },
  {
    "package": "interpret",
    "id": "s12-38",
    "kind": "remove",
    "edits": [
      { "symbol": "DEFAULT_ABBREVIATIONS", "action": "remove", "file": "src/core/constants.ts:88" },
      { "symbol": "DEFAULT_CORRECTIONS", "action": "remove", "file": "src/core/constants.ts:91" },
      { "symbol": "DEFAULT_ACTIONS", "action": "remove", "file": "src/core/constants.ts:94" },
      { "symbol": "DEFAULT_DOMAINS", "action": "remove", "file": "src/core/constants.ts:97" },
      { "symbol": "DEFAULT_VERBS", "action": "remove", "file": "src/core/constants.ts:100" }
    ],
    "guide": "guides/interpret.md Constants rows for the empty DEFAULT_* records",
    "prerequisite": [],
    "summary": "Delete the empty DEFAULT_ABBREVIATIONS, DEFAULT_CORRECTIONS, DEFAULT_ACTIONS, DEFAULT_DOMAINS, and DEFAULT_VERBS exports; leave DEFAULT_CONTRACTIONS."
  },
  {
    "package": "interpret",
    "id": "s12-39",
    "kind": "remove",
    "edits": [
      { "symbol": "INTERPRET_ID", "action": "remove", "file": "src/core/constants.ts:31" }
    ],
    "guide": "guides/interpret.md INTERPRET_ID Constants rows",
    "prerequisite": [],
    "summary": "Delete the unused INTERPRET_ID export and its guide rows."
  },
  {
    "package": "interpret",
    "id": "s12-42",
    "kind": "rename",
    "edits": [
      { "symbol": "size", "action": "rename", "to": "count", "member": "RecordManagerInterface", "file": "src/core/types.ts:592" },
      { "symbol": "size", "action": "rename", "to": "count", "member": "TemplateManagerInterface", "file": "src/core/types.ts:739" },
      { "symbol": "size", "action": "rename", "to": "count", "member": "SubjectManagerInterface", "file": "src/core/types.ts:756" },
      { "symbol": "size", "action": "rename", "to": "count", "member": "DefinitionManagerInterface", "file": "src/core/types.ts:770" }
    ],
    "guide": "guides/interpret.md manager Methods rows for size; same drift recorded in program, brief, middleware, msg, pool, and template as a separate fleet unit",
    "prerequisite": [],
    "summary": "Rename size to count on RecordManagerInterface, TemplateManagerInterface, SubjectManagerInterface, and DefinitionManagerInterface together."
  },
  {
    "package": "interpret",
    "id": "s12-43",
    "kind": "rename",
    "edits": [
      { "symbol": "ManagerAddOptions", "action": "rename", "to": "RecordOptions", "file": "src/core/types.ts:612" }
    ],
    "guide": "guides/interpret.md ManagerAddOptions Types row; brief must rename the same import in the same wave",
    "prerequisite": [],
    "summary": "Rename ManagerAddOptions to RecordOptions in a coordinated publish with @orkestrel/brief; shipping interpret alone breaks brief at its next re-pin."
  },
  {
    "package": "interpret",
    "id": "s12-45",
    "kind": "signature",
    "edits": [
      { "symbol": "canonicalize", "action": "change", "file": "src/core/helpers.ts:573" }
    ],
    "guide": "guides/interpret.md canonicalize helper Surface row",
    "prerequisite": [],
    "summary": "Close the mismatch where canonicalize publishes visited then documents it as internal; the leaf-vs-promotion branches share no repair."
  },
  {
    "package": "mcp",
    "id": "s01-01",
    "kind": "mixed",
    "edits": [
      { "symbol": "HTTPClientTransport", "action": "remove", "file": "src/browser/transports/HTTPClientTransport.ts:83" },
      { "symbol": "HTTPClientTransport", "action": "remove", "file": "src/server/transports/HTTPClientTransport.ts:82" }
    ],
    "guide": "guides/mcp.md HTTPClientTransport Surface rows on the browser and server faces",
    "prerequisite": [],
    "summary": "Move HTTPClientTransport to core and drop it from the browser and server barrels, unifying the non-ok send fork so one face's reject/swallow behaviour changes."
  },
  {
    "package": "mcp",
    "id": "s01-02",
    "kind": "remove",
    "edits": [
      { "symbol": "decodeEvent", "action": "remove", "file": "src/browser/helpers.ts:47" },
      { "symbol": "readEventStream", "action": "remove", "file": "src/browser/helpers.ts:69" },
      { "symbol": "decodeEvent", "action": "remove", "file": "src/server/helpers.ts:306" },
      { "symbol": "readEventStream", "action": "remove", "file": "src/server/helpers.ts:268" }
    ],
    "guide": "guides/mcp.md Helpers tables for decodeEvent and readEventStream on both faces",
    "prerequisite": [],
    "summary": "Move decodeEvent and readEventStream to core; architecture.md forbids a compatibility re-export, so both names leave the browser and server entry points."
  },
  {
    "package": "mcp",
    "id": "s01-03",
    "kind": "rename",
    "edits": [
      { "symbol": "serveMCPScope", "action": "rename", "file": "src/browser/helpers.ts:178" },
      { "symbol": "serveMCP", "action": "rename", "file": "src/browser/helpers.ts:214" }
    ],
    "guide": "guides/mcp.md browser export table for serveMCP and serveMCPScope",
    "prerequisite": [],
    "summary": "Move serveMCP and serveMCPScope into browser/factories.ts under create* names; createScopeMessageListener moves with them but is already create*."
  },
  {
    "package": "mcp",
    "id": "s01-04",
    "kind": "behavior",
    "edits": [
      { "symbol": "DEFAULT_MCP_CLIENT_NAME", "action": "change", "file": "src/core/constants.ts:235" },
      { "symbol": "DEFAULT_MCP_SERVER_NAME", "action": "change", "file": "src/browser/constants.ts:43" }
    ],
    "guide": "guides/mcp.md Constants tables that pin the taverna default wire identity",
    "prerequisite": [],
    "summary": "Change DEFAULT_MCP_CLIENT_NAME and DEFAULT_MCP_SERVER_NAME from 'taverna' to this package's own identity; the comment half already landed."
  },
  {
    "package": "mcp",
    "id": "s01-07",
    "kind": "mixed",
    "edits": [
      { "symbol": "MCPSessionOptions", "action": "rename", "to": "MCPSessionMiddlewareOptions", "file": "src/server/types.ts:180" }
    ],
    "guide": "guides/mcp.md Types rows for MCPSessionOptions",
    "prerequisite": [],
    "summary": "Rename the current MCPSessionOptions to MCPSessionMiddlewareOptions and rebind MCPSessionOptions to the session entity's { capacity, ttl } shape."
  },
  {
    "package": "mcp",
    "id": "s01-09",
    "kind": "remove",
    "edits": [
      { "symbol": "createReadableStream", "action": "remove", "file": "src/server/helpers.ts:58" }
    ],
    "guide": "guides/mcp.md createReadableStream export row, fenced example, and parity entry",
    "prerequisite": [],
    "summary": "Delete createReadableStream from @orkestrel/mcp/server."
  },
  {
    "package": "mcp",
    "id": "s01-10",
    "kind": "rename",
    "edits": [
      { "symbol": "MCPClientTransportEventMap", "action": "rename", "to": "MCPMessageTransportEventMap", "file": "src/core/types.ts:2356" },
      { "symbol": "MCPClientTransportInterface", "action": "rename", "to": "MCPMessageTransportInterface", "file": "src/core/types.ts:2380" }
    ],
    "guide": "guides/mcp.md Types rows and the Methods bijection list for MCPClientTransportInterface",
    "prerequisite": [],
    "summary": "Rename MCPClientTransportInterface and MCPClientTransportEventMap to the role-neutral MCPMessageTransport* names."
  },
  {
    "package": "mcp",
    "id": "s01-11",
    "kind": "rename",
    "edits": [
      { "symbol": "bridgeMessageTransport", "action": "rename", "to": "createMessageTransportBridge", "file": "src/server/helpers.ts:471" }
    ],
    "guide": "guides/mcp.md bridgeMessageTransport helper/factory rows",
    "prerequisite": [],
    "summary": "Move bridgeMessageTransport to server/factories.ts and rename it createMessageTransportBridge."
  },
  {
    "package": "mcp",
    "id": "s01-18",
    "kind": "rename",
    "edits": [
      { "symbol": "EventStoreEntry", "action": "rename", "to": "MCPSessionEvent", "file": "src/server/types.ts:249" }
    ],
    "guide": "guides/mcp.md EventStoreEntry Types rows",
    "prerequisite": [],
    "summary": "Rename EventStoreEntry to MCPSessionEvent, the unit MCPSessionInterface.replay returns."
  },
  {
    "package": "mcp",
    "id": "s01-19",
    "kind": "signature",
    "edits": [
      { "symbol": "inferHeaderIssue", "action": "change", "file": "src/server/inferers.ts:87" }
    ],
    "guide": "guides/mcp.md inferHeaderIssue helper Surface row",
    "prerequisite": [],
    "summary": "Split inferHeaderIssue(request, JSONRPCInvocation | MCPVersion) into inferHeaderIssue(request, invocation) and inferSessionHeaderIssue(request, version)."
  },
  {
    "package": "qualifier",
    "id": "s16-27",
    "kind": "mixed",
    "edits": [
      { "symbol": "QualificationValidationResult", "action": "remove", "file": "src/core/types.ts:114" },
      { "symbol": "isQualificationValidationResult", "action": "remove", "file": "src/core/validators.ts:172" },
      { "symbol": "validate", "action": "change", "member": "QualifierInterface", "file": "src/core/types.ts:200" }
    ],
    "guide": "guides/qualifier.md isQualificationValidationResult validator row and fences that import the alias",
    "prerequisite": [],
    "summary": "Delete QualificationValidationResult and isQualificationValidationResult, and retype QualifierInterface.validate to ReasonValidationResult from @orkestrel/reason."
  },
  {
    "package": "qualifier",
    "id": "s16-30",
    "kind": "rename",
    "edits": [
      { "symbol": "findMissingReferences", "action": "rename", "file": "src/core/helpers.ts:578" },
      { "symbol": "findEmptyLogicalPasses", "action": "rename", "file": "src/core/helpers.ts:722" },
      { "symbol": "findUnreadDerivations", "action": "rename", "file": "src/core/helpers.ts:758" }
    ],
    "guide": "guides/qualifier.md helper table rows for the three find* message producers",
    "prerequisite": [],
    "summary": "Stop findMissingReferences, findEmptyLogicalPasses, and findUnreadDerivations from sharing find*'s locate meaning; replacement names or a return-type change to id lists are not settled."
  },
  {
    "package": "qualifier",
    "id": "s16-32",
    "kind": "mixed",
    "edits": [
      { "symbol": "context", "action": "change", "member": "QualifierError", "file": "src/core/errors.ts:15" },
      { "symbol": "QualifierError", "action": "change", "file": "src/core/errors.ts:17" }
    ],
    "guide": "guides/qualifier.md QualifierError sentence that context is optional",
    "prerequisite": [],
    "summary": "Narrow QualifierError.context and the constructor's third parameter from unknown to a structured optional record, and pass { definition } instead of a bare string from Qualifier.qualify."
  },
  {
    "package": "rater",
    "id": "s17-05",
    "kind": "rename",
    "edits": [
      { "symbol": "worksheetFactor", "action": "rename", "file": "src/core/helpers.ts:158" },
      { "symbol": "worksheetGroup", "action": "rename", "file": "src/core/helpers.ts:191" },
      { "symbol": "resultsWorksheet", "action": "rename", "file": "src/core/helpers.ts:318" },
      { "symbol": "ratedLine", "action": "rename", "file": "src/core/helpers.ts:357" }
    ],
    "guide": "guides/rater.md Helpers table rows and fences for the four builders",
    "prerequisite": [],
    "summary": "Rename worksheetFactor, worksheetGroup, resultsWorksheet, and ratedLine; the two lanes share no replacement names."
  },
  {
    "package": "rater",
    "id": "s17-06",
    "kind": "rename",
    "edits": [
      { "symbol": "evidenceCheck", "action": "rename", "file": "src/core/helpers.ts:95" },
      { "symbol": "checkEvidence", "action": "rename", "file": "src/core/helpers.ts:130" }
    ],
    "guide": "guides/rater.md Helpers rows and fence for evidenceCheck/checkEvidence",
    "prerequisite": [],
    "summary": "Rename evidenceCheck and checkEvidence so the singular/plural axis carries the difference under one term; replacement names are not settled."
  },
  {
    "package": "rater",
    "id": "s17-08",
    "kind": "remove",
    "edits": [
      { "symbol": "success", "action": "remove", "member": "LineResult", "file": "src/core/types.ts:117" }
    ],
    "guide": "guides/rater.md LineResult row and the success: false, no amount prose; leave RatingResult.success",
    "prerequisite": [],
    "summary": "Drop LineResult.success so consumers read line.worksheet.success; the competing keep-and-document-equality repair is recorded, not applied."
  },
  {
    "package": "relation",
    "id": "s17-10",
    "kind": "type",
    "edits": [
      { "symbol": "ResolvedRelation", "action": "change", "file": "src/core/types.ts:92" },
      { "symbol": "column", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:96" },
      { "symbol": "key", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:97" },
      { "symbol": "through", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:98" },
      { "symbol": "source", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:99" },
      { "symbol": "target", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:100" },
      { "symbol": "tag", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:101" },
      { "symbol": "label", "action": "change", "member": "ResolvedRelation", "file": "src/core/types.ts:102" }
    ],
    "guide": "guides/relation.md ResolvedRelation Types row",
    "prerequisite": [],
    "summary": "Split ResolvedRelation into a five-arm union discriminated on relationship so optional members are required on their arm and extends ResolvedRelation stops compiling."
  },
  {
    "package": "sea",
    "id": "s12-03",
    "kind": "rename",
    "edits": [
      { "symbol": "parsePEOffset", "action": "rename", "to": "readPEOffset", "file": "src/server/helpers.ts:474" }
    ],
    "guide": "guides/sea.md parsePEOffset Surface row",
    "prerequisite": [],
    "summary": "Rename parsePEOffset to readPEOffset."
  },
  {
    "package": "sea",
    "id": "s12-05",
    "kind": "rename",
    "edits": [
      { "symbol": "runShell", "action": "rename", "to": "executeShell", "file": "src/server/helpers.ts:153" }
    ],
    "guide": "guides/sea.md runShell Surface row",
    "prerequisite": [],
    "summary": "Rename runShell to executeShell."
  },
  {
    "package": "sea",
    "id": "s12-07",
    "kind": "rename",
    "edits": [
      { "symbol": "entryTotal", "action": "rename", "to": "total", "member": "buildELFNoteHeader", "file": "src/server/helpers.ts:985" }
    ],
    "guide": "guides/sea.md buildELFNoteHeader Surface row",
    "prerequisite": [],
    "summary": "Rename buildELFNoteHeader's returned entryTotal member to total; whether to declare ELFNoteHeader in types.ts is not settled."
  },
  {
    "package": "sea",
    "id": "s12-17",
    "kind": "rename",
    "edits": [
      { "symbol": "SEAProgressHandler", "action": "rename", "to": "SEACompressionHandler", "file": "src/server/types.ts:66" }
    ],
    "guide": "guides/sea.md SEAProgressHandler Types row",
    "prerequisite": [],
    "summary": "Rename SEAProgressHandler to SEACompressionHandler."
  },
  {
    "package": "server",
    "id": "s14-01",
    "kind": "mixed",
    "edits": [
      { "symbol": "openStream", "action": "rename", "to": "createStream", "file": "src/server/helpers.ts:1247" },
      { "symbol": "enqueueStreamText", "action": "remove", "file": "src/server/helpers.ts:1197" }
    ],
    "guide": "guides/server.md openStream and enqueueStreamText Surface rows and the Methods parity sentence",
    "prerequisite": [],
    "summary": "Replace openStream with createStream in factories.ts; whether enqueueStreamText is deleted and whether a Stream class exists are not settled, and @orkestrel/mcp plus @orkestrel/toolbox must move in the same change."
  },
  {
    "package": "server",
    "id": "s14-03",
    "kind": "remove",
    "edits": [
      { "symbol": "appendCookie", "action": "remove", "file": "src/server/helpers.ts:329" }
    ],
    "guide": "guides/server.md appendCookie Surface row",
    "prerequisite": [],
    "summary": "Delete appendCookie; callers use headers.append('set-cookie', cookie)."
  },
  {
    "package": "server",
    "id": "s14-11",
    "kind": "mixed",
    "edits": [
      { "symbol": "start", "action": "change", "member": "ServerInterface", "file": "src/server/types.ts:711" },
      { "symbol": "start", "action": "change", "member": "Server", "file": "src/server/Server.ts:192" }
    ],
    "guide": "guides/server.md ServerInterface.start Methods row",
    "prerequisite": [],
    "summary": "Reject a wrong-state start() with a new code-bearing error class instead of a bare Error; the class name and its relation to HTTPError are not settled."
  },
  {
    "package": "server",
    "id": "s14-12",
    "kind": "rename",
    "edits": [
      { "symbol": "codingQuality", "action": "rename", "to": "computeCodingQuality", "file": "src/server/helpers.ts:652" },
      { "symbol": "languageQuality", "action": "rename", "to": "computeLanguageQuality", "file": "src/server/helpers.ts:771" },
      { "symbol": "ipv6Network", "action": "rename", "to": "computeIPv6Network", "file": "src/server/helpers.ts:1093" },
      { "symbol": "clientRateKey", "action": "rename", "file": "src/server/helpers.ts:1142" }
    ],
    "guide": "guides/server.md Surface rows for the four helpers; clientRateKey also imported by @orkestrel/middleware",
    "prerequisite": [],
    "summary": "Rename codingQuality, languageQuality, and ipv6Network to computeCodingQuality, computeLanguageQuality, and computeIPv6Network; clientRateKey keeps a client qualifier whose exact verb-noun form is not settled."
  },
  {
    "package": "server",
    "id": "s14-14",
    "kind": "rename",
    "edits": [
      { "symbol": "ConnectionInfo", "action": "rename", "to": "Connection", "file": "src/server/types.ts:108" }
    ],
    "guide": "guides/server.md ConnectionInfo Surface row, ConnectionStateFunction row, and the other named guide sites; @orkestrel/middleware plus its vendored guides/server.md mirror",
    "prerequisite": [],
    "summary": "Rename ConnectionInfo to Connection; ConnectionStateFunction keeps its name and only its parameter type changes."
  },
  {
    "package": "terminal",
    "id": "s12-48",
    "kind": "mixed",
    "edits": [
      { "symbol": "name", "action": "change", "member": "KeyEvent", "file": "src/core/types.ts:35" },
      { "symbol": "parseKey", "action": "change", "file": "src/core/helpers.ts:79" }
    ],
    "guide": "guides/terminal.md KeyEvent/parseKey rows that pin name: '' as intended",
    "prerequisite": [],
    "summary": "Make KeyEvent.name optional and stop parseKey from returning the empty-string sentinel."
  },
  {
    "package": "terminal",
    "id": "s12-52",
    "kind": "signature",
    "edits": [
      { "symbol": "terminals", "action": "change", "member": "TerminalManagerInterface", "file": "src/core/types.ts:670" },
      { "symbol": "terminals", "action": "change", "member": "TerminalManager", "file": "src/core/TerminalManager.ts:103" }
    ],
    "guide": "guides/terminal.md TerminalManagerInterface.terminals Methods row",
    "prerequisite": [],
    "summary": "Change terminals() to return readonly PromptInterface[] and expose names as a separate names() accessor."
  },
  {
    "package": "terminal",
    "id": "s12-54",
    "kind": "rename",
    "edits": [
      { "symbol": "promptHeader", "action": "rename", "to": "renderPromptHeader", "file": "src/core/helpers.ts:294" },
      { "symbol": "hintedHeader", "action": "rename", "to": "renderHintedHeader", "file": "src/core/helpers.ts:308" },
      { "symbol": "submitHeader", "action": "rename", "to": "renderSubmitHeader", "file": "src/core/helpers.ts:319" },
      { "symbol": "errorLine", "action": "rename", "to": "renderErrorLine", "file": "src/core/helpers.ts:324" },
      { "symbol": "inputView", "action": "rename", "to": "renderInputView", "file": "src/core/helpers.ts:353" },
      { "symbol": "passwordView", "action": "rename", "to": "renderPasswordView", "file": "src/core/helpers.ts:410" },
      { "symbol": "confirmView", "action": "rename", "to": "renderConfirmView", "file": "src/core/helpers.ts:470" },
      { "symbol": "selectView", "action": "rename", "to": "renderSelectView", "file": "src/core/helpers.ts:531" },
      { "symbol": "checkboxView", "action": "rename", "to": "renderCheckboxView", "file": "src/core/helpers.ts:616" },
      { "symbol": "editorView", "action": "rename", "to": "renderEditorView", "file": "src/core/helpers.ts:725" },
      { "symbol": "rawCapable", "action": "rename", "file": "src/server/helpers.ts:100" },
      { "symbol": "enabledChoices", "action": "rename", "to": "filterEnabled", "file": "src/server/helpers.ts:210" },
      { "symbol": "disabledChoices", "action": "rename", "to": "filterDisabled", "file": "src/server/helpers.ts:222" },
      { "symbol": "groupHeader", "action": "rename", "to": "renderGroupHeader", "file": "src/server/helpers.ts:227" },
      { "symbol": "lockedLine", "action": "rename", "to": "renderLockedLine", "file": "src/server/helpers.ts:242" },
      { "symbol": "suggestionLine", "action": "rename", "to": "renderSuggestionLine", "file": "src/server/helpers.ts:253" },
      { "symbol": "unavailableLine", "action": "rename", "to": "renderUnavailableLine", "file": "src/server/helpers.ts:263" },
      { "symbol": "numberedList", "action": "rename", "to": "renderNumberedList", "file": "src/server/helpers.ts:282" }
    ],
    "guide": "guides/terminal.md Surface rows and fences for the view/header helpers and rawCapable",
    "prerequisite": [],
    "summary": "Rename the noun-phrase render/filter helpers to verb-noun form; rawCapable's replacement and whether the *Reduce family or a class promotion rides along are not settled."
  },
  {
    "package": "terminal",
    "id": "s12-55",
    "kind": "mixed",
    "edits": [
      { "symbol": "serializeShutdown", "action": "rename", "to": "serializeDestroy", "file": "src/core/helpers.ts:867" },
      { "symbol": "shutdown", "action": "rename", "to": "destroy", "member": "SSE_EVENTS", "file": "src/core/constants.ts:214" }
    ],
    "guide": "guides/terminal.md serializeShutdown Surface row and SSE_EVENTS.shutdown wire vocabulary",
    "prerequisite": [],
    "summary": "Rename serializeShutdown to serializeDestroy and change SSE_EVENTS.shutdown from 'shutdown' to 'destroy'."
  },
  {
    "package": "terminal",
    "id": "s12-58",
    "kind": "rename",
    "edits": [
      { "symbol": "TimerCancel", "action": "rename", "to": "TimerCancelFunction", "file": "src/core/types.ts:376" }
    ],
    "guide": "guides/terminal.md TimerCancel Surface row and callable-types sentence",
    "prerequisite": [],
    "summary": "Rename TimerCancel to TimerCancelFunction."
  },
  {
    "package": "terminal",
    "id": "s12-59",
    "kind": "rename",
    "edits": [
      { "symbol": "Parked", "action": "rename", "to": "ParkedForm", "file": "src/core/types.ts:388" }
    ],
    "guide": "guides/terminal.md Parked Surface row and data-only sentence",
    "prerequisite": [],
    "summary": "Rename Parked to ParkedForm."
  },
  {
    "package": "workspace",
    "id": "s17-31",
    "kind": "rename",
    "edits": [
      { "symbol": "data", "action": "rename", "to": "base64", "member": "FileContent", "file": "src/core/types.ts:11" }
    ],
    "guide": "guides/workspace.md FileContent row and { data, mime } prose",
    "prerequisite": [],
    "summary": "Rename the FileContent binary arm member from data to base64."
  },
  {
    "package": "workspace",
    "id": "s17-32",
    "kind": "rename",
    "edits": [
      { "symbol": "decodedSize", "action": "rename", "to": "computeDecodedSize", "file": "src/core/helpers.ts:102" }
    ],
    "guide": "guides/workspace.md decodedSize Surface row",
    "prerequisite": [],
    "summary": "Rename decodedSize to computeDecodedSize."
  }
]
```

**Unknowns**

- **browser s04-11** — replacement for `fail`. Finding: `observeError` (or fold into the network manager). Both DRIFT-RESHAPE lanes: rename `fail` to `error` (or the event to `fail`); keep single-word names on the class after s04-10. `close(timestamp)` stays in every correction.
- **browser s04b-05** — frame `send` options. One lane: `CDPSendOptions` on the client only, and a timeout-only trailing type on `BrowserFrameInterface.send`. The other: honour `session` on the frame as an override, or declare the narrower timeout-only type; never accept and ignore `session`.
- **browser s04b-12** — finding nested `performance.profile`; reshaped repair is a `BrowserProfilerInterface` peer on `BrowserDiagnosticsInterface` as `profiler`.
- **interpret s12-26** — replacement name and placement. Finding/work order: `ensureTemplate` in helpers.ts. DRIFT/medium: `assertTemplate` in helpers.ts. DRIFT-RESHAPE/medium: keep `createTemplate` in factories.ts and only widen to `value: unknown`.
- **interpret s12-37** — opt-in mechanism. Finding: `aggregates?: readonly string[]` on `EntityMapping`, or a `ComputedField`. DRIFT-RESHAPE: bind through existing `Template.computations` and delete the unconditional emission; Judge refuses the string list as a magic-string selector without a ruling.
- **interpret s12-45** — DRIFT: public `canonicalize` one parameter plus exported `canonicalizeNode(value, ancestors)`. DRIFT-RESHAPE: keep one export and rename `visited` to a supported `ancestors`. Judge: neither branch closes the mismatch.
- **mcp s01-03** — `create*` names for `serveMCP` / `serveMCPScope`. Finding says only “the `create*` form”; `createMCPServer` already exists.
- **qualifier s16-30** — finding: `describeMissingReferences` / `describeEmptyLogicalPasses` / `describeUnreadDerivations`. DRIFT-RESHAPE: keep `find*` and change the return to located ids, or pick a third prefix that is neither `find*` nor `describe*`.
- **qualifier s16-32** — context type. One lane: `readonly context?: Readonly<Record<string, unknown>>`. The other: named `QualifierErrorContext` with `pass` / `definition` / `cause`.
- **rater s17-05** — one lane: `joinWorksheetFactor` / `joinWorksheetGroup` / `joinWorksheet` / `buildLineResult`. The other: keep `worksheetFactor` / `worksheetGroup` and rename only `resultsWorksheet` → `worksheet`, `ratedLine` → `lineResult`.
- **rater s17-06** — `buildEvidence` / `buildEvidenceRows` versus `evidence` / `collectEvidence`.
- **rater s17-08** — DRIFT: drop `LineResult.success`. EXCEPTION (dropped as a lane, still recorded): keep the member, set it from the worksheet, document equality. Both lanes keep `RatingResult.success`.
- **sea s12-07** — DRIFT: declare `ELFNoteHeader` in `types.ts`. DRIFT-RESHAPE: keep the inline return type. Member rename to `total` is shared.
- **server s14-01** — one lane requires `src/server/Stream.ts` and deletes `enqueueStreamText`. The other forbids a class, keeps the closure in `factories.ts`, and either folds `enqueueStreamText` or retains it with a unit test.
- **server s14-11** — new error class name, and whether a `code`-keyed class may sit beside this package’s `status`-keyed `HTTPError`.
- **server s14-12** — fourth helper: `computeClientRateKey` versus `computeClientKey`. Both reject the finding’s `computeRateKey`.
- **terminal s12-54** — `rawCapable`: finding/`isRawCapable` versus reshape/`supportsRawMode`. Reshape also widens to the `*Reduce` family (`inputReduce` `helpers.ts:365` and siblings) or a class promotion of the create/view/reduce trio.

**Deviation**

None. Read-only; no edits. Scaffold `src/` was not the home of these packages; symbols were verified under `/home/user/fleet/<package>/src/**` as the brief names.
