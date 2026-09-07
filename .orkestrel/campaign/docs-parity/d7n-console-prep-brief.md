# Brief — P.1 `d7n-console-prep` (console's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/console` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b1dad83`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

console's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== console 2026-09-07T15:33:16Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
100:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### console (b1dad83, version 0.0.12, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 38 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupServer.ts(3)
   tests/setup.ts(3)
   src/core/constants.ts(3)
   tests/setupBrowser.ts(2)
   tests/src/core/helpers.test.ts(1)
   src/server/constants.ts(1)
-- docs
   guides/console.md function inferStyled: guide "One target's styled fact: `FORCE_COLOR`, then non-empty `NO_COLOR`, then `isTTY === true`; pure and global-free." source "Infers whether one stream target receives styled output. The result is a construction-time target fact for `import('./factories.js').createServerSink`; this helper is pure and never reads process globals itself."
   guides/console.md function decodeChunk: guide "One `process.*.write` chunk (`string` / `Uint8Array`) decoded to text — TOTAL, never throws (so the capture wrapper can't crash)." source "Decodes one `process.stdout.write` / `process.stderr.write` chunk to a string — total, never throws. The process write signature accepts `string | Uint8Array` plus an optional encoding; the capture wrapper reuses this so intercepting a raw stream write can never crash the host (a throw inside `process.stdout.write` would take the program down)."
   guides/console.md function isBufferEncoding: guide "Whether a value is a `BufferEncoding` accepted by `Buffer.toString` — backs `decodeChunk`'s encoding handling." source "Checks whether `encoding` is a `BufferEncoding` accepted by `Buffer.prototype.toString` — a total guard used by `import('./helpers.js').decodeChunk` to honor a process-write `encoding` argument only when it is a real Node encoding (otherwise utf-8 is assumed)."
   guides/console.md const STREAM_LEVELS: guide "The two process streams a capture intercepts by default, in `stdout`-then-`stderr` order — the `StreamLevel` universe." source "Lists the two process streams a `import('./types.js').ProcessCaptureInterface` can intercept, in `stdout`-then-`stderr` order — the `StreamLevel` universe and the default configured set."
   guides/console.md const DEFAULT_STREAM_LIMIT: guide "The default bounded-buffer cap for a process capture (`1000`) — total + each per-stream bucket; always bounded." source "Sets the default bounded-buffer cap for a `import('./types.js').ProcessCaptureInterface` — at most this many recent `import('./types.js').CapturedChunk`s are retained per buffer (the total buffer and each per-stream bucket; oldest dropped first). Mirrors the core `Capture`'s `DEFAULT_CAPTURE_LIMIT`; a consumer overrides it through `options.limit`."
   guides/console.md const DEFAULT_COLUMNS: guide "The terminal width a server sink reports when the `stdout` stream is not a TTY and no explicit width was given — `80`." source "Sets the terminal width `import('./factories.js').createServerSink` reports through `import('./types.js').ServerSinkInterface.columns` when the `stdout` stream is not a TTY (so `.columns` is `undefined`) and no explicit `options.columns` was supplied — the conventional 80-column default a non-interactive context (a pipe, a CI log) assumes."
   guides/console.md const STREAM_LEVEL_MAP: guide "Each `StreamLevel`'s `LogLevel` for the optional sink forward — `stdout` → `info`, `stderr` → `error`." source "Maps each `StreamLevel` to its `LogLevel` for the optional sink forward — the projection a process capture routes through when writing an intercepted chunk to a `import('@src/core').SinkInterface` (`sink.write(text, STREAM_LEVEL_MAP[level])`). `stderr` is conventionally the error/diagnostic stream → `error`; `stdout` is the normal output stream → `info`. The source of truth for the stream-to-log projection (the server analogue of the core `CAPTURE_LEVEL_MAP`)."
   guides/console.md RendererInterface.render: guide absent source "Renders `text` wrapped in the target codes for `style`. The empty style (no colors, no attributes) and the empty string both return `text` unchanged — no wrapping."
   guides/console.md StylerInterface.render: guide absent source "Renders `text` in `style` merged over the accumulated style — the by-value counterpart of the accessor chain, and the door a `Theme` role is applied through."
   guides/console.md SinkInterface.write: guide absent source "Writes one already-formatted chunk of output. `text` receives one line without its terminator — the sink's target supplies it (for example `console.log`; the server TTY sink appends one) — unless `text` begins with `\\r`: that is an in-place redraw frame (the Spinner / Progress animation protocol), written verbatim. A tick frame carries no terminator; a final frame carries its own. `level` is the originating record's `LogLevel` — supplied so a stream-aware sink can route (for example `error` to `stderr`); a plain sink ignores it."
   guides/console.md LoggerInterface.debug: guide absent source "Logs at `debug` — dropped unless the logger's `level` is `debug`."
   guides/console.md LoggerInterface.info: guide absent source "Logs at `info`."
   guides/console.md LoggerInterface.warn: guide absent source "Logs at `warn`."
   guides/console.md LoggerInterface.error: guide absent source "Logs at `error`."
   guides/console.md LoggerInterface.entries: guide absent source "Returns the bounded tail of recent `LogRecord`s, oldest first (capped at `limit`)."
   guides/console.md LoggerInterface.clear: guide absent source "Drops every retained record (does not touch listeners)."
   guides/console.md LoggerInterface.destroy: guide absent source "Tears down — clears retention and destroys the emitter."
   guides/console.md LoggerManagerInterface.register: guide absent source absent
   guides/console.md LoggerManagerInterface.logger: guide absent source absent
   guides/console.md LoggerManagerInterface.loggers: guide absent source absent
   guides/console.md LoggerManagerInterface.debug: guide absent source "Fans out a `debug` log to every registered logger."
   guides/console.md LoggerManagerInterface.info: guide absent source "Fans out an `info` log to every registered logger."
   guides/console.md LoggerManagerInterface.warn: guide absent source "Fans out a `warn` log to every registered logger."
   guides/console.md LoggerManagerInterface.error: guide absent source "Fans out an `error` log to every registered logger."
   guides/console.md LoggerManagerInterface.remove: guide absent source absent
   guides/console.md ReporterInterface.section: guide absent source "Writes a titled separator block — a section heading framed by a horizontal rule."
   guides/console.md ReporterInterface.step: guide absent source "Writes a step line, optionally prefixed with its `[index/total]` `StepPosition`."
   guides/console.md ReporterInterface.timing: guide absent source "Writes a timing line — `label … 1.23s` (sub-second shown as `…ms`)."
   guides/console.md ReporterInterface.status: guide absent source "Writes an icon + colored outcome line for `level` (`error` routes to the error stream)."
   guides/console.md ReporterInterface.table: guide absent source "Renders a `TableOptions` grid through `import('./helpers.js').renderTable` and writes it."
   guides/console.md ReporterInterface.tree: guide absent source "Renders a `TreeOptions` tree through `import('./helpers.js').renderTree` and writes it."
   guides/console.md ReporterInterface.box: guide absent source "Renders a `BoxOptions` frame through `import('./helpers.js').renderBox` and writes it."
   guides/console.md ReporterInterface.line: guide absent source "Writes one raw line, colored through the styler if any styling is embedded — no prefix, no icon."
   guides/console.md ReporterInterface.blank: guide absent source "Writes `count` blank lines (default `1`)."
   guides/console.md RetentionInterface.add: guide absent source "Retains one record — appends it to the total buffer and to its level's bucket, evicting the oldest of each past the cap."
   guides/console.md RetentionInterface.records: guide absent source "Returns a copy of the whole retained buffer, oldest first."
   guides/console.md RetentionInterface.clear: guide absent source "Drops every retained record from the total buffer and every bucket."
   guides/console.md CaptureInterface.start: guide absent source "Snapshots the configured `console.*` and installs the interceptors — a no-op when already `active`."
   guides/console.md CaptureInterface.stop: guide absent source "Restores the snapshot-original `console.*` — a no-op when not `active`."
   guides/console.md CaptureInterface.messages: guide absent source "Returns a copy of the whole captured buffer, oldest first (capped at `limit`)."
   guides/console.md CaptureInterface.clear: guide absent source "Drops every buffered message (total + by level); does not stop interception."
   guides/console.md CaptureInterface.destroy: guide absent source "Tears down — `stop()` (restoring `console`) then destroys the emitter."
   guides/console.md SpinnerInterface.start: guide absent source "Arms the periodic timer and renders the first frame — a no-op when already `active`."
   guides/console.md SpinnerInterface.tick: guide absent source "Advances one frame: builds the line, emits `frame`, and writes `\\r` + line to the sink."
   guides/console.md SpinnerInterface.update: guide absent source "Changes the message; re-renders immediately when `active` so the change shows at once."
   guides/console.md SpinnerInterface.succeed: guide absent source "Stops with a success line — clears the timer, writes + emits `✔ message` + newline."
   guides/console.md SpinnerInterface.fail: guide absent source "Stops with an error line — clears the timer, writes + emits `✖ message` + newline (error stream)."
   guides/console.md SpinnerInterface.stop: guide absent source "Clears the timer and leaves the current line (no final write) — a no-op when not `active`."
   guides/console.md SpinnerInterface.destroy: guide absent source "Tears down — `stop()` then destroys the emitter."
   guides/console.md ProgressInterface.update: guide absent source "Reports progress: clamps `current`, re-renders the bar, emits `update`, writes `\\r` + bar. Ignored once terminal."
   guides/console.md ProgressInterface.succeed: guide absent source "Finishes successfully — renders a full bar + newline, emits a final `update` then `succeed`."
   guides/console.md ProgressInterface.fail: guide absent source "Finishes unsuccessfully — renders the bar at its current fill + newline to the error stream (no `succeed`)."
   guides/console.md ProgressInterface.destroy: guide absent source "Tears down — destroys the emitter."
   guides/console.md ProcessCaptureInterface.start: guide absent source "Begins intercepting the configured process streams (idempotent; emits `start`)."
   guides/console.md ProcessCaptureInterface.stop: guide absent source "Restores the pristine `process.*.write` references (idempotent; emits `stop`)."
   guides/console.md ProcessCaptureInterface.messages: guide absent source "Returns a copy of the full captured buffer, oldest first (capped at `limit`)."
   guides/console.md ProcessCaptureInterface.clear: guide absent source "Drops every buffered chunk (total + per-stream); interception is unaffected."
   guides/console.md ProcessCaptureInterface.destroy: guide absent source "Stops interception (restoring the streams) and tears down the emitter."
   guides/console.md pitch: readme absent tagline "One unified output-control system for a terminal, a browser, and a server. Over one shared substrate it composes a style engine (text style is DATA, rendered by a swappable renderer), structured logging (a leveled `Logger` whose record + `entry` event ARE the transport seam), narrative reporting (a `Reporter` of sections / steps / timings / tables / trees / boxes), console & stream capture (take control of `console.*` / `process.*` on the read side), and live animations (a self-driving `Spinner`, an update-driven `Progress`). The unifying ideas: style as data (a `Style` is a frozen record, not a baked escape string), the `Sink` seam (the one place text leaves the system — swap it to retarget), and the `entry` / `capture` event as the transport seam (records flow to file / JSON / remote transports off an emitter, never a second code path). The design is one engine, environment sinks. The cross-environment core owns the contract and all the universal logic; each environment provides only the platform output backend at the `Sink` seam: ANSI / SGR escape codes are the default (the `ANSIRenderer` + the `createConsoleSink`), the browser translates ANSI to `console.log('%c…', css)` at the sink (`createBrowserSink`), and the server writes to the real `process` streams with styling selected per target at construction by the precedence in the color-detection contract (`createServerSink`). The animations push the line-OVERWRITE decision down to the sink too: a `Spinner` / `Progress` writes a leading `\\r` + its frame to EVERY sink, and each sink decides what that means — the server TTY sink writes it verbatim and the terminal redraws in place, core's console sink also writes it verbatim and `console.log` terminates the call so the frame lands on a fresh line, and the browser sink strips the `\\r` for the same fresh-line degrade. The same code, a live redraw or a clean fallback per environment. Source: `src/core` (surfaced through `@src/core`), with the browser sink in `src/browser` (`@src/browser`) and the server sink + process capture in `src/server` (`@src/server`)."
   rows read: 1, disagreements found: 207
   exit 1
-- check
   tests/guides.test.ts(140,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(143,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(147,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(162,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(177,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 43 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  43 failed | 48 passed (91)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 13 | summary 12 | banned 1 | tests/setupServer.ts(3) tests/setup.ts(3) src/core/constants.ts(3) tests/setupBrowser.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for console (taken 2026-09-07T15:36Z by facts.sh)

- Checkout `/home/user/fleet/console`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b1dad83`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 13 | summary 12 | banned 1 | tests/setupServer.ts(3) tests/setup.ts(3) src/core/constants.ts(3) tests/setupBrowser.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec                       | Source                                                                                    | Tests                                                                                                                         |
    9:| ------- | -------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
    10:| Console | [`console.md`](console.md) | [`src/core`](../src/core), [`src/browser`](../src/browser), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/browser`](../tests/src/browser), [`tests/src/server`](../tests/src/server) |
    14:| Directory     | Guide                      |
    15:| ------------- | -------------------------- |
    16:| `src/core`    | [`console.md`](console.md) |
    17:| `src/browser` | [`console.md`](console.md) |
    18:| `src/server`  | [`console.md`](console.md) |
- Guide `guides/console.md`: 710 lines. Headings:
    1:# Console
    7:## Surface
    30:### Styling
    53:### Logging
    74:### Reporting
    111:### Capture
    129:### Errors
    139:### Animations
    156:### Style constants
    177:### Logging & reporting constants
    200:### Capture & animation constants
    215:### Browser sink
    230:### Browser sink constants
    241:### Server sink + process capture
    265:### Server sink constants
    276:## Methods
    282:#### `RendererInterface`
    288:#### `StylerInterface`
    296:#### `SinkInterface`
    302:#### `LoggerInterface`
    314:#### `LoggerManagerInterface`
    327:#### `ReporterInterface`
    341:#### `RetentionInterface`
    349:#### `CaptureInterface`
    359:#### `SpinnerInterface`
    371:#### `ProgressInterface`
    380:#### `ProcessCaptureInterface`
    390:## Contract
    415:## Patterns
    417:### A styled, leveled logger
    434:### The line a logger writes
    449:### A logger registry
    461:### A reporter narration
    488:### One theme, every entity
    508:### Scoping third-party `console.*` with `createCaptureResult`
    525:### Capture lifecycle
    539:### The bounded retention engine directly
    557:### A spinner and a progress bar
    584:### The browser — `%c` styling in DevTools
    596:### The server — a TTY sink and a process capture
    622:### One logger, different sink per environment (the cross-env one-liner)
    635:### The pure layout + formatting helpers directly
    666:### Server helpers directly
    674:### Server boundary guards directly
    685:## Tests
    706:## See also
- Table headers in `guides/console.md` (a header row is the row before a `| ---` row):
    34: | API                 | Kind      | Summary                                                                                                                                |
    57: | API                      | Kind      | Summary                                                                                                                              |
    78: | API                  | Kind      | Summary                                                                                                                                           |
    115: | API                   | Kind      | Summary                                                                                                                                 |
    133: | API                | Kind     | Summary                                                                                                                      |
    143: | API                 | Kind      | Summary                                                                                                                               |
    160: | API                | Kind  | Summary                                                                                                                                 |
    181: | API                   | Kind  | Summary                                                                                                                |
    204: | API                        | Kind  | Summary                                                                                                                         |
    219: | API                  | Kind      | Summary                                                                                                                                                        |
    234: | API             | Kind  | Summary                                                                                                          |
    245: | API                       | Kind      | Summary                                                                                                                                            |
    269: | API                    | Kind  | Summary                                                                                                                |
    284: | Method   | Returns  | Behavior                                                                                               |
    292: | Method   | Returns  | Behavior                                                                                                                  |
    298: | Method  | Returns | Behavior                                                                                                                                                                                                                                  |
    304: | Method    | Returns                | Behavior                                                              |
    316: | Method     | Returns                        | Behavior                                                                                       |
    329: | Method    | Returns | Behavior                                                                           |
    343: | Method    | Returns        | Behavior                                                                                                                   |
    351: | Method     | Returns                      | Behavior                                                                                                                            |
    361: | Method    | Returns | Behavior                                                                                      |
    373: | Method    | Returns | Behavior                                                                                                 |
    382: | Method     | Returns                    | Behavior                                                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/console.md`):
    3: > One unified output-control system for a terminal, a browser, and a server. Over one shared substrate it composes a **style engine** (text style is DATA, rendered by a swappable renderer), **structured logging** (a leveled `Logger` whose record + `entry` event ARE the transport seam), **narrative reporting** (a `Reporter` of sections / steps / timings / tables / trees / boxes), **console & stream capture** (take control of `console.*` / `process.*` on the read side), and **live animations** (a self-driving `Spinner`, an update-driven `Progress`). The unifying ideas: **style as data** (a `Style` is a frozen record, not a baked escape string), the **`Sink` seam** (the one place text leaves the system — swap it to retarget), and the **`entry` / `capture` event** as the transport seam (records flow to file / JSON / remote transports off an emitter, never a second code path).
    4: >
    5: > The design is **one engine, environment sinks**. The cross-environment core owns the contract and all the universal logic; each environment provides only the platform output backend at the `Sink` seam: ANSI / SGR escape codes are the default (the `ANSIRenderer` + the `createConsoleSink`), the browser translates ANSI to `console.log('%c…', css)` at the sink (`createBrowserSink`), and the server writes to the real `process` streams with styling selected per target at construction by the precedence in the color-detection contract (`createServerSink`). The animations push the line-OVERWRITE decision down to the sink too: a `Spinner` / `Progress` writes a leading `\r` + its frame to EVERY sink, and each sink decides what that means — the server TTY sink writes it verbatim and the terminal redraws in place, core's console sink also writes it verbatim and `console.log` terminates the call so the frame lands on a fresh line, and the browser sink strips the `\r` for the same fresh-line degrade. The same code, a live redraw or a clean fallback per environment. Source: [`src/core`](../src/core) (surfaced through `@src/core`), with the browser sink in [`src/browser`](../src/browser) (`@src/browser`) and the server sink + process capture in [`src/server`](../src/server) (`@src/server`).
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: Build a styled, leveled logger and a narrative reporter over the shared substrate; the SAME code retargets to any environment by swapping the `sink`:
- README (`README.md`) first lines:
    # @orkestrel/console
    
    A unified output-control system for the `@orkestrel` line — one
    environment-agnostic engine composing style, logging, reporting, capture, and
    animation over a shared substrate:
    a **style engine** (`Styler` + `ANSIRenderer`, style as data), **structured
    logging** (`Logger`, `LoggerManager`), **narrative reporting** (`Reporter`),
    **console & stream capture** (`Capture`, `ProcessCapture`), and **live
    animations** (`Spinner`, `Progress`). Built to sit beside `@orkestrel/emitter`
    (observable lifecycle), reusing it as it takes shape.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    11: fence under "## Surface"
    419: fence under "### A styled, leveled logger"
    436: fence under "### The line a logger writes"
    451: fence under "### A logger registry"
    463: fence under "### A reporter narration"
    490: fence under "### One theme, every entity"
    510: fence under "### Scoping third-party `console.*` with `createCaptureResult`"
    527: fence under "### Capture lifecycle"
    541: fence under "### The bounded retention engine directly"
    559: fence under "### A spinner and a progress bar"
    586: fence under "### The browser — `%c` styling in DevTools"
    598: fence under "### The server — a TTY sink and a process capture"
    624: fence under "### One logger, different sink per environment (the cross-env one-liner)"
    637: fence under "### The pure layout + formatting helpers directly"
    668: fence under "### Server helpers directly"
    676: fence under "### Server boundary guards directly"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/server/factories.ts:50:export function createServerSink(options?: ServerSinkOptions): ServerSinkInterface {
    src/server/ProcessCapture.ts:68:export class ProcessCapture implements ProcessCaptureInterface {
    src/browser/factories.ts:51:export function createBrowserSink(options?: BrowserSinkOptions): SinkInterface {
    src/core/Styler.ts:31:export class Styler {
    src/core/Capture.ts:48:export class Capture implements CaptureInterface {
    src/core/Progress.ts:44:export class Progress implements ProgressInterface {
    src/core/Spinner.ts:49:export class Spinner implements SpinnerInterface {
    src/core/factories.ts:46:export function createStyler(options?: StylerOptions): StylerInterface {
    src/core/factories.ts:80:export function createTheme(options?: ThemeOptions): Theme {
    src/core/factories.ts:124:export function createConsoleSink(): SinkInterface {
    src/core/factories.ts:173:export function createCaptureResult<T>(
    src/core/factories.ts:198:export function createCaptureResult<T>(fn: () => T, options?: CaptureOptions): CaptureResult<T>
    src/core/factories.ts:202:export function createCaptureResult<T>(
    src/core/Reporter.ts:47:export class Reporter implements ReporterInterface {
    src/core/Retention.ts:31:export class Retention<T extends { readonly level: string }> implements RetentionInterface<T> {
    src/core/loggers/Logger.ts:52:export class Logger implements LoggerInterface {
    src/core/loggers/LoggerManager.ts:44:export class LoggerManager implements LoggerManagerInterface {
    src/core/renderers/ANSIRenderer.ts:25:export class ANSIRenderer implements RendererInterface {
    src/core/errors.ts:15:export class ConsoleError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/validators.ts:1
    src/server/factories.ts:1
    src/server/helpers.ts:2
    src/server/ProcessCapture.ts:1
    src/browser/factories.ts:1
    src/browser/helpers.ts:3
    src/core/Styler.ts:1
    src/core/Capture.ts:1
    src/core/Progress.ts:1
    src/core/Spinner.ts:1
    src/core/factories.ts:5
    src/core/helpers.ts:15
    src/core/Reporter.ts:1
    src/core/Retention.ts:1
    src/core/loggers/Logger.ts:1
    src/core/loggers/LoggerManager.ts:1
    src/core/types.ts:1
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    78:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    87:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    132:		for (const group of guide.methods()) {
    133:			const members = source.methods(group.interface)
    140:					expect(findMissing(members, group.methods)).toEqual([])
    143:					expect(findMissing(group.methods, members)).toEqual([])
    147:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    162:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    165:		for (const group of guide.methods()) {
    175:							? source.examples(group.interface)
    176:							: source.examples(group.interface).concat(source.examples(entity))
    177:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    189:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 685:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.12"` → `"version": "0.0.13"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-console-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
