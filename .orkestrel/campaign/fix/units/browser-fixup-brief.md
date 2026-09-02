# Unit browser-fixup — close the browser unit's audit findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; the substitution is
recorded). You perform the assignment directly and spawn nothing.

## Objective

`@orkestrel/browser` at commit `e7a2299` emits `drop` only when the transport ended without a
close request, publishes every drive method its concrete classes expose, documents each moved
type once and each parser and reader in one voice, and names the validator's input type in
`types.ts`.

## Context

**Findings, each with its ruling.** Apply in this order.

1. **Objective F1 — `drop` fires on an explicit teardown.** `src/core/CDPClient.ts:266` emits
   `drop` unconditionally from `#onClose`, the transport `close` handler wired at `:196`, while
   `src/server/transports/WebSocketCDPTransport.ts:276-279` emits transport `close` on every socket
   close, including the one `#close()` requests. `src/core/types.ts:44` documents "`drop` fires
   when the transport ended without a close request", so the shipped contract is false over the
   real transport. Ruling: `#close()` sets a `#` boolean before `await this.#transport.close()`,
   and `#onClose` emits `drop` only when that boolean is unset; `#onClose` still rejects every
   pending request and resets `#connected` and `#active` on both paths. Keep the TSDoc sentence.
   Tests, in `tests/src/core/CDPClient.test.ts`: add `expect(drop.count).toBe(0)` to the explicit
   teardown case at `:391-403`, and drive that case through a transport whose `close()` emits
   transport `close` the way the real transport does — extend the stub in `tests/setup.ts:117-120`
   so its `close()` emits `close` (protocol-faithful; keep every existing test green), or give the
   stub an option that does. The drop case keeps proving `drop.count === 1` when the transport
   ends without a request. Insert the failing proof first: with the transport emitting `close`,
   run the file before the guard lands and record the failing assertion and count, then land the
   guard and record the same command green.
2. **Objective F4 — one rule for every drive member.** The report refused removing
   `BrowserFrameInterface.assert`/`update` under
   `node_modules/@orkestrel/scaffold/dist/host/claude/rules/documentation.md:46` ("Each
   implementing class exposes exactly its interface methods—no missing or extra public
   behavior") and applied the same row's other half: `BrowserWebSocketInterface` lost
   `receive`/`transmit`/`fail`/`close` while `src/core/BrowserWebSocket.ts:44,48,52,56` keeps all
   four public, and `BrowserDownloadInterface` lost `update` while `src/core/BrowserDownload.ts:74`
   keeps it public. Ruling: the rule as written wins for all five members. Restore
   `receive(frame: BrowserWebSocketFrame): void`, `transmit(frame: BrowserWebSocketFrame): void`,
   `fail(message: string): void`, and `close(timestamp: number): void` on
   `BrowserWebSocketInterface` (`src/core/types.ts`, the interface at about `:1013`) and
   `update(progress: BrowserDownloadProgress): void` on `BrowserDownloadInterface` (about `:849`),
   each with a TSDoc line naming who drives it (the page's network manager; the owning page).
   Rewrite the two `@remarks` that now claim the contract "carries the identity and the emitter
   alone" / "the observed state and `cancel` alone" to state that the drive methods are on the
   contract because the class exposes exactly its interface. Restore the guide Methods rows for
   both interfaces; the pre-unit rows are readable with
   `git show e7a2299~1:guides/browser.md` (read-only). `tests/guides.test.ts:113-120` then
   enforces the class side for both; keep it green. Record the websocket and download half of
   s04-10 as refused under the same rule text the frame half quotes.
3. **Objective F2 — `BrowserSendOptions` documented twice.** `guides/browser.md:248` (Core Types)
   and `:879` (Extended types) both carry a row. Ruling: keep the Core Types row beside
   `BrowserFrameInterface`; delete the row at `:879`.
4. **Objective F3 and subjective change 2 — `BrowserDiagnosticsInterface` row.**
   `guides/browser.md:794` reads "Tracing/coverage/performance group." Ruling: name `tracing`,
   `coverage`, `performance`, and `profiler` in the form the `BrowserSelectorManagerInterface`
   row at `:878` uses.
5. **Objective F8 — `CDPClientOptions.error` has a second role.** `src/core/CDPClient.ts:68-70`
   passes `options.error` to the client's own `Emitter`, while `src/core/types.ts:62-64` describes
   it only as receiving a subscriber's throw with the CDP event method. Ruling: the remark states
   both paths — a CDP event subscriber's throw with the CDP method, and a lifecycle subscriber's
   throw with the lifecycle event name (`connect`, `close`, `drop`, `error`) as the second
   argument.
6. **Objective F9 and subjective change 4 — the validator's parameter type is inline twice.**
   `BrowserPointerOptions & BrowserClickOptions & BrowserDragOptions` at
   `src/core/helpers.ts:511` and `src/core/BrowserLocator.ts:463`. Ruling: declare the
   intersection once in `src/core/types.ts` under the browser input section as a named type,
   import it at both sites, and give it a guide Types row beside the other input option types.
   Recommended name `BrowserGestureOptions`; `BrowserInputOptions` is taken. Choose per
   `.claude/rules/names.md` and record the reason in the report.
7. **Subjective change 1 — one voice for coercers and readers.** The Extended helpers table
   (`guides/browser.md:518-556`) summarises every `parse*` coercer as "Decode …", the same word
   it uses for the throwing `read*` readers, while the Core helpers table (`:141-146`) states the
   distinction ("Coerce …, or `undefined`" against "Read …"). Ruling: every `parse*` row states
   what it coerces and that it returns `undefined` off-shape, in the Core table's form; every
   `read*` row states what it reads and that it throws. Restate the moved TSDoc first sentences
   in `src/core/parsers.ts` ("Decodes one …" at `:38` and its siblings) the same way, in the
   third-person `-s` form: "Coerces one … to a …, or `undefined` off-shape."
8. **Subjective change 3 — invariant 4.** `guides/browser.md:1269-1273` still heads
   "Screenshots never touch a filesystem in core." after the writer became
   `BrowserWriterInterface` because it also carries PDF, trace, and HAR bytes
   (`src/core/types.ts:151-163`), and the paragraph keeps `via` twice. Ruling: head the invariant
   for captured bytes, name screenshot, PDF, trace, and HAR as what the writer persists, and write
   `through`.
9. **Subjective referral to the objective lane — `Performance.disable`.**
   `src/core/types.ts` justifies removing `BrowserPerformanceInterface.destroy` with "Each call
   enables the Performance domain and disables it again". `tests/src/core/BrowserDiagnostics.test.ts:174-180`
   scripts replies for `Performance.enable` and `Performance.disable`. Ruling: that test asserts,
   from the stub transport's recorded `sent` messages, that `Performance.disable` was sent after
   `metrics()` resolved, and that it was sent when the metrics reply is scripted to fail.
10. **Pre-existing, owned, cheap.** `README.md:63` links `guides/src/browser.md`; the file is
    `guides/browser.md`. Ruling: `[`guides/browser.md`](guides/browser.md)`. The `BrowserWaitUntil`
    guide row omits `'commit'` (report's pre-existing finding). Ruling: the row lists every member
    of the union as `src/core/types.ts` declares it.

Recorded, no change: objective F5 (the `helpers.ts`↔`parsers.ts` cycle) is proven by the
Orchestrator by loading the built entries; F6 and F7 (the report's rename reason and the unnamed
third failing test) are report defects recorded in the verdict; the ratified
`validateBrowserActionOptions → validateBrowserInputOptions` rename and the
`BrowserPerformanceInterface.destroy` removal are in `breaking-radius.json` with no fleet consumer;
`parseBrowserChord` (a throwing `parse*` in `helpers.ts`), `evaluate(expression, timeout?)`'s
positional timeout, `findInStore`'s plurality, and the driver-interface split that would let the
drive methods leave the consumer contract are successor rows; import specifier order has no rule.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/documentation.md` § Parity;
`.claude/rules/typescript.md` (TSDoc third-person form where you touch a block);
`.claude/rules/tests.md`; `.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/browser` at commit `e7a2299`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings. Build a throwaway probe, if you need one, under the system temporary directory, never
under the checkout's `tmp/`.

**Standing conditions.** none.

## Unknowns

Whether the stub transport's `close()` emitting `close` reddens an existing test that counts
`drop`; report which tests moved and why.

## Scope

**Owned.** `src/core/types.ts`, `src/core/CDPClient.ts`, `src/core/helpers.ts`,
`src/core/BrowserLocator.ts`, `src/core/parsers.ts`, `src/core/BrowserWebSocket.ts`,
`src/core/BrowserDownload.ts`, `guides/browser.md`, `README.md`, `tests/setup.ts`,
`tests/src/core/CDPClient.test.ts`, `tests/src/core/BrowserDiagnostics.test.ts`,
`tests/src/core/BrowserWebSocket.test.ts`, `tests/src/core/BrowserDownload.test.ts`,
`tests/guides.test.ts` only if the `INTERNAL` list must move — each only at the sites the
findings name or the change makes false.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, stage, push, install, or
discarding `git` command (`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`).
Tree-wide `format` only to converge after `npm run lint`; then the non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order. Run the word-boundary sweep, then the case-insensitive inflected sweep, for `Decode`,
`Screenshots never`, `via`, and `guides/src/` over `src`, `tests`, `guides/browser.md`,
`README.md`, classifying every hit. Then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

After the build, run this probe and record its output:

```text
node -e "Promise.all([import('/home/user/fleet/browser/dist/src/core/index.js'), import('/home/user/fleet/browser/dist/src/server/index.js')]).then(([core, server]) => console.log(typeof core.parseBrowserRequest, typeof core.validateBrowserInputOptions, typeof server.createBrowserWriter))"
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the red-then-green record for finding 1 (command, failing assertion, count, then the
green run); the name chosen for finding 6 and its reason; the sweep and every hit classified;
each gate command with its exit code and an excerpt for any failure; the probe's output;
`git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the guard in finding 1 cannot be expressed without a second flag on the
transport, when restoring a drive method in finding 2 reddens a guides parity assertion you
cannot satisfy from the owned files, or when a gate fails for a cause you cannot attribute after
the re-run. Decide, record, and carry on from the wording of a sentence or the placement of a
row.

## Acceptance criteria

1. `client.close()` over a transport whose `close()` emits transport `close` emits `close` and
   not `drop`; the transport ending without a request emits `drop`; both pinned by executed
   assertions with the failing proof recorded.
2. `BrowserWebSocketInterface` declares `receive`, `transmit`, `fail`, `close` and
   `BrowserDownloadInterface` declares `update`; `tests/guides.test.ts` is green with their
   Methods rows present.
3. `rg -n 'BrowserSendOptions' guides/browser.md` returns one table row; the
   `BrowserDiagnosticsInterface` row names its four members; the `BrowserWaitUntil` row names
   `'commit'`.
4. The intersection type is declared once in `src/core/types.ts`, imported at both sites, and
   has a guide row; `rg -n 'BrowserPointerOptions & BrowserClickOptions' src` returns no hit
   outside `types.ts`.
5. No `parse*` summary in the guide or a `parsers.ts` first sentence reads "Decode"; the invariant
   heading names captured bytes and `via` is gone from the paragraph; `README.md` links
   `guides/browser.md`.
6. The gate chain exits 0 and the dist probe prints `function function function`.
7. `git status --short` lists only owned files.
