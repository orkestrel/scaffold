# Report — unit browser-fixup (implementer, Opus 5; Sol dark)

Every finding closed, no deviation.

1. `drop` on an explicit teardown: `src/core/CDPClient.ts:62` adds the `#expected` field, set at
   `:210` (the connect-race teardown) and `:246` (`#close()`) before `await this.#transport.close()`,
   reset at `:88` on a fresh `connect()`; the guard at `:274` emits `drop` only when unset.
   `#onClose` still clears `#connected` and `#active` and rejects every pending request on both
   paths. `tests/setup.ts:117-124`: the stub's `close()` emits transport `close` when started.
   `tests/src/core/CDPClient.test.ts:391-406`. Red-then-green
   (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/CDPClient.test.ts`):
   baseline 36 passed; with the stub emitting `close` and the assertion in place, 1 failed | 35
   passed — `expect(drop.count).toBe(0)` at `:405`, `expected 1 to be +0`; after the guard, 36
   passed. The stub change reddened no existing test (`test:src` 514 passed both before and after).
2. Drive members restored: `BrowserWebSocketInterface` regains `receive`, `transmit`, `fail`,
   `close`; `BrowserDownloadInterface` regains `update`; both `@remarks` state the class exposes
   exactly its interface methods. `guides/browser.md:1233` and `:1261` add Methods groups with
   tables and fences (the pre-unit guide carried none, so these are new rather than restored);
   `tests/guides.test.ts` now enforces both class sides and passes.
3. `BrowserSendOptions`: the Extended-types row deleted; the Core Types row at `:248` kept.
4. `guides/browser.md:794` names `tracing`, `coverage`, `performance`, `profiler`.
5. `src/core/types.ts:62-69` states both `error` dispatch paths; `guides/browser.md:222` aligned.
6. `BrowserOperationOptions` declared in `src/core/types.ts` under `// === Browser input`, imported
   at `src/core/helpers.ts:511` and `src/core/BrowserLocator.ts:462`, guide row at `:845`. Not the
   recommended `BrowserGestureOptions`: the validator also answers for keyboard `press` and
   `type` (`src/core/BrowserKeyboard.ts:68,83`), typing is not a gesture, the package carries no
   "gesture" vocabulary, and "operation" is its own noun for the entity (`helpers.ts:501`,
   `types.ts:258`).
7. Every `parse*` guide row and the `src/core/parsers.ts` first sentences read "Coerces one … or
   `undefined` off-shape."; the throwing `read*` rows read "Throws a `BrowserError` off-shape.";
   the total readers (`readBrowserHeaders`, `readBrowserAXValue`, `readBrowserStack`,
   `readBrowserRemoteValue`, `readBrowserFrames`, `readRare*Data`, `readBrowserAttributes`) state
   what they skip rather than a false throw claim. `parseBrowserChord` keeps its throwing
   description as the recorded successor row.
8. Invariant 4 at `guides/browser.md:1322` heads "Captured bytes never touch a filesystem in
   core.", names screenshot, PDF, trace, and HAR, and writes `through`.
9. `tests/src/core/BrowserDiagnostics.test.ts:209` asserts `Performance.disable` follows
   `Performance.getMetrics` in `transport.sent`; `:228` proves the disable after a failed read.
   Control: with the `finally` removed from `BrowserPerformance.metrics`, both fail
   (`expected -1 to be greater than 1`, 2 failed | 7 passed); the file restored from a copy, absent
   from the status.
10. `README.md:63` links `guides/browser.md`; the `BrowserWaitUntil` row at `:230` lists `'commit'`.

Sweeps over `src`, `tests`, `guides/browser.md`, `README.md`: `Decode` word-boundary — the
`parsers.ts` count is 0; the imperative "Decode …" first sentences on the `helpers.ts` readers
(`:78,143,161,475,769,812,839,856,896,929,966,984,1041,1114,1127,1187,1204,1257,1287,1301,1377,1414`)
and the third-person "Decodes …" at `:1553,1578,1589,1610,1633` are pre-existing reader TSDoc
outside the ruling, recorded; `decodeBase64`, `bytesToText`, `TextDecoder`, `decodeURIComponent`,
`decodeAssetSource`, and "decoded" data nouns are the permitted sense. `Screenshots never` and
`guides/src/` — no hit. `via` — the two invariant-4 occurrences gone; the remaining hits
(`src/server/helpers.ts:57`, `src/server/types.ts:125,185`, `src/core/CDPClient.ts:183`,
`src/core/constants.ts:215`, `src/core/types.ts:329,369`, test files, and
`guides/browser.md:19,20,66,78,266,1161,1329,1334,1513`) are outside the named sites, recorded
for the voice wave.

Gates: format 0 to converge (lint:check was clean); format:check 0 (115 files), lint:check 0,
check 0, build 0, test 0 (src 515, policy 111, config 46, setup 42, guides 68). Dist probe:
`function function function`. Owned files only; no shared-file patch.

## Corrections by the Orchestrator (after the objective lane on the fix-up)

The `format` converge pass shifted lines after the writer took its handles. Resolved at
`9563556`: the `#expected` field is `src/core/CDPClient.ts:65`; the `#close()` set is `:248`; the
`connect()` reset is `:93`; the guard is `:272`; the stub's `close()` is `tests/setup.ts:121-128`;
`validateBrowserInputOptions`'s signature is `src/core/helpers.ts:508` with the import at `:18`;
the `Performance.disable` assertion is `tests/src/core/BrowserDiagnostics.test.ts:212-215` and the
failed-read case is `:233-248`.

Refusal record the ruling required: the websocket and download half of s04-10 (removing
`receive`, `transmit`, `fail`, `close` from `BrowserWebSocketInterface` and `update` from
`BrowserDownloadInterface`) is refused under the same rule text the frame half quotes,
`documentation.md:46`: "Each implementing class exposes exactly its interface methods—no missing
or extra public behavior." The members are restored at `src/core/types.ts:864-876` and
`:1029-1042`.
