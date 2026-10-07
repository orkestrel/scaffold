# Audit verdict: browser's API series `51cf268..ae1c9a1` (2026-10-06)

**Lanes:** workflow `api-falsify` (run `wf_92b6692e-f17`) ran two lanes, both Opus 5.5, because GPT-6 Astra wrote every audited line. Both read one claims file, scaffold `tmp/units/api-claims.md` (12 claims), each in a clean context and blind to the other. Their verdicts are in `falsify/`.

- Objective: `FAIL 2 4 10 11 12; outside F1 F2`.
- Subjective: `FAIL 2 9 10 11 12; outside F1 F2 F3`.

## Rulings

| Item | Ruling |
| --- | --- |
| Claim 1, MCP text | Ruling E covers the text change. Claim 1 is restated to exclude it |
| Claim 1, crash flake | **Probe:** run the browse renderer-crash case 20 times at `51cf268` and 20 times at HEAD, each beside a discovery scan. Report the failure rates. A higher rate at HEAD makes it a defect of this series |
| Claim 2, timeout misfits | **Fixed by the collapse:** the `navigate` load timeout and the clock, tracing, and registry deadlines all become `TIMEOUT`, with the operation in `context` |
| Claim 2, stale `BROWSER_` names in TSDoc | **Fix** `TOOLSET_ENDED` (`server/types.ts:414-415`), and `DOCUMENT` and `DOCUMENT_OWN` (`browser/factories.ts:16-17`) |
| Claim 4, closed page | **Fix:** `isBrowserPage` is total over lifecycle state and never reads a member that asserts. It requires exactly the members the toolset uses, so `recorder` drops out. A closed page is `true`. A proxy over a real page that hides any one required key is `false`, one case per key |
| **Code synonyms** (subjective claim 9) | **Collapse each concept to one code,** with the subject or operation in `context`:<br>• `CLOSED` absorbs `CONTEXT_CLOSED`, `PAGE_CLOSED`, `DESTROYED`, and `TOOLSET_ENDED`;<br>• `TIMEOUT` absorbs `NAVIGATION_TIMEOUT` and `WAIT_TIMEOUT`;<br>• `ARGUMENT` absorbs `JOURNEY_ARGUMENT`, `TOOLSET_ARGUMENT`, and `SERVER_OPTIONS`.<br>The shared file store raises store-neutral `STORE_*` codes where it serves both stores. The guide's code table and Contract 7 follow |
| Public manager classes | **Made internal:** the 18 owner-built manager and input classes. Their interfaces stay public. This also closes forging an observation through a public constructor (subjective claim 5) |
| Owner-only types | **Inlined:** `BrowserFrameLocation`, `BrowserWebSocketDriver`, and each constructor input or private state that one class alone uses. A type two classes share stays in `types.ts` with a remark naming its owners |
| `assertBrowserPage` | **Renamed** in the package's `validate*` form, `validateBrowserPageOpen` |
| `BrowserWalkOptions` | **Renamed** for the traversal (`BrowserTraversalOptions`), and the `order` bullet deleted |
| `depth`/`breadth`, `listed`/`found` | **Kept,** a conflict between the plan and the naming rule settled for the plan. The same interface already returns sequences from noun methods (`descendants`, `ancestors`), and the pool names its tallies `idle` and `active` |
| Recorder `started` | **Renamed** `active`, one term with the clock, HAR, and the diagnostics |
| `createBrowserHAREntry` | **Renamed** `buildBrowserHAREntry`, because it assembles plain data |
| Objective F1, `network.apply` and explicit `undefined` | **Fix:** `apply` sets only supplied fields, and `undefined` means not supplied. A `clear()` method resets headers, offline, and credentials. Emulation adapts |
| Objective F2, the lock-reclaim race | **Fix in code:** serialize each name within one process before the file lock, so empty-lock reclaim cannot race in-process. The exactly-one-writer pin stays |
| Subjective F1, context options | **Split:** `BrowserContextOptions` (the wrapper, with no `proxy` or `origins`) and `BrowserIsolateOptions` (with `proxy` and `origins`, and no `id`) |
| Subjective F2, `cookies.remove({})` | **Refuse an empty filter** with `ARGUMENT` |
| Subjective F3, `BrowserJourneyToolsetInterface` | **Removed from the published contract,** because no consumer can reach it |
| Subjective A4, `exclusive: false` with `revision` | **Allowed:** `exclusive: false` equals omission |
| Subjective A5 | Each declaration sits in its section, and the `BrowserToolsetOptions` remarks list every key |
| Claims 10 and 11, stale docs | **Fix every sentence the lanes list:**<br>• `codegen`, the drive methods, frame `assert` and `update`;<br>• run store `snapshot`, `BrowserCookieFilter` "for clearing", `BrowserPage` creation, a standalone `BrowserFrame`;<br>• the `BrowserClock` test title;<br>• Contract 29;<br>• the discovery fence's bindings.<br>Reorder the Surface so each concept table runs entity, then interface, then options, with every decoder and compiler in the protocol layer |
| Claim 12, binding | **Add:** the per-key guard cases; a malformed network body; a `createBrowserContext` case asserting `client.connected` after `destroy` and `close` |
| Objective advisory, journey edit with a custom store | **Recorded, no change:** the custom-store contract permits it |
