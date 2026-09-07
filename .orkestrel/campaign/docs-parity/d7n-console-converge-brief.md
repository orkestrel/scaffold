# Brief — P.2 `d7n-console-converge` (console under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/console` from the committed baseline `f93a2f4` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.13`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/console.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/console/guides/console.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-console-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/console.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/console.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/console.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/console.md function escapePercent: guide "A text segment with every literal `%` doubled to `%%` — the escape that keeps the console from reading a stray `%` as a directive." source "Doubles every literal `%` in `text` to `%%` — the `%`-escape that keeps a browser console from reading a stray `%` (for example in `50%` or `%s`) as a format directive. The single escape the `ansiToConsole` translation applies to every text segment before assembling the format string (so only the `%c`s it inserts are real directives)."
guides/console.md function scanParameters: guide "The numeric codes of an SGR parameter list (`'1;31'` → `[1, 31]`) — a bare / empty field becomes a `0` reset." source "Walks an SGR parameter list (the `;`-separated numeric string captured by `SGR_PATTERN`) and returns its numeric codes — `'1;31'` → `[1, 31]`. It is total: every input yields a code list. An empty list (a bare `ESC[m`) yields `[0]`, because the SGR spec treats a parameterless sequence as a reset; an empty field within a list (`'1;;4'`) likewise counts as a `0` reset, matching the spec, and a non-numeric field yields `NaN`, which the caller then ignores."
guides/console.md const COLOR_HEX: guide "Each named `Color`'s hex value — the 16 standard terminal colors a browser console renders the same names as." source "Maps each named `Color` to its hex value — the 16 standard terminal colors a browser DevTools console renders the same `Color` names as. The source of truth for the browser color axis: the ANSI renderer maps a `Color` name to an SGR number, and this maps the same name to the CSS color the `%c` sink paints with, so a browser shows the same 16 colors a terminal does."
guides/console.md const ATTRIBUTE_CSS: guide "Each text-attribute SGR number → its CSS declaration (`bold` → `font-weight:bold`, …; `inverse` best-effort)." source "Maps each text-`Attribute`'s SGR \"on\" number to its equivalent CSS declaration — the browser counterpart to the terminal's SGR text effects (`bold` 1 → `font-weight:bold`, `dim` 2 → `opacity:0.6`, `italic` 3 → `font-style:italic`, `underline` 4 → `text-decoration:underline`, `inverse` 7 → best-effort, `strikethrough` 9 → `text-decoration:line-through`). Keyed by the SGR number (derived from core's `ATTRIBUTE_CODES`) so the sink looks a parameter up directly while scanning a run."
guides/console.md const DIRECTIVE: guide "The browser console directive (`%c`) that switches the active style — one prefixes every styled run." source "Names the browser console directive that switches the active style — one `%c` prefixes every styled run in the `import('./types.js').ConsoleOutput` format string, consuming the next entry of the parallel CSS array. The single source of truth for the directive token."
guides/console.md const SGR_PATTERN: guide "The global `RegExp` matching one SGR sequence and CAPTURING its parameters — the scanner walks every styled run." source "Matches one SGR sequence (`ESC[ <params> m`) and captures its `;`-separated numeric parameters — the subset of ANSI `import('@src/core').strip` cares about that carries style (color / attribute / reset), as opposed to cursor / erase / OSC sequences. Global, so the scanner walks every SGR run in a string; built from core's `ESC` so no control-character literal appears in source (the codebase idiom). The capture group is the parameter list (`''` for a bare `ESC[m`, which the spec treats as a reset)."
guides/console.md interface StreamTargetInterface: guide "The minimal writable-stream shape the server sink + capture address — `write(text)` + optional `isTTY` / `columns`." source "Declares the minimal writable-stream shape the server sink and process capture address — exactly the slice of a Node `tty.WriteStream` / `process.stdout` they touch, and no more. A `ServerSinkOptions` target and a `ProcessCaptureInterface`'s patched streams are narrowed to this through `import('./validators.js').isStreamTarget` (narrow the boundary, never `as`), so a test can drive either with a hand-built fake stream that never touches the real `process` streams."
guides/console.md interface ServerSinkOptions: guide "`createServerSink` options — `stdout?` / `stderr?` / `styled?` / `environment?` / `columns?`; all optional." source "Holds the options for `import('./factories.js').createServerSink` — all optional, so a bare `createServerSink()` writes to the real process streams."
guides/console.md interface ServerSinkInterface: guide "A `SinkInterface` exposing the `stdout` target's construction-time `styled` fact and the terminal's live or fixed `columns` width." source "Declares a `SinkInterface` that also exposes the target terminal's `columns` width — the shape `import('./factories.js').createServerSink` returns. It is a drop-in `SinkInterface` (so a `Logger` / `Reporter` / `Spinner` / `Progress` takes it as `sink`) whose extra `columns` getter lets a consumer size a `Reporter`'s layout to the live terminal. Its `styled` fact lets the same consumer enable or disable its styler for the `stdout` target."
guides/console.md type StreamLevel: guide "Which process stream a `CapturedChunk` came from — `stdout` / `stderr` (the \"level\" axis of `ProcessCaptureInterface`)." source "Names which process stream a `CapturedChunk` came from — the \"level\" axis of the process-stream `ProcessCaptureInterface`, the server analogue of the core `Capture`'s `CaptureLevel`."
guides/console.md type StreamWriteFunction: guide "The patched `process.*.write` method shape — `NodeJS.WriteStream['write']` verbatim; the boundary type the capture snapshots + swaps." source "Names the process-stream `write` method a `ProcessCaptureInterface` snapshots and swaps at the patch boundary — the write-side analogue of `import('@src/core').ConsoleMethod`."
guides/console.md type StreamWriteCallback: guide "The optional write-completion callback `process.*.write` accepts — `(error?) => void`; the wrapper forwards it to the mirror." source "Names the completion callback `process.*.write` accepts as its last argument — the Node `write` callback shape, and the `StreamWriteFunction` companion."
guides/console.md interface CapturedChunk: guide "One intercepted process-stream write — an immutable `{ level, text, time }`; the server analogue of `CapturedMessage`." source "Represents one intercepted process-stream write — the immutable, serializable record a `ProcessCaptureInterface` buffers and emits, the server analogue of the core `CapturedMessage`."
guides/console.md type ProcessCaptureEventMap: guide "A process capture's observable events — `capture(chunk)` per write + the `start` / `stop` signals." source "Declares the observable events a `ProcessCaptureInterface` emits — mirrors the core `Capture`'s `CaptureEventMap`, but the captured record is a `CapturedChunk` (stream-keyed)."
guides/console.md interface ProcessCaptureOptions: guide "`ProcessCapture` options — `on?` / `error?` / `levels?` / `mirror?` / `sink?` / `limit?`." source "Holds the options for the `import('./ProcessCapture.js').ProcessCapture` constructor — every field optional, so a bare `new ProcessCapture()` buffers both streams without mirroring or forwarding."
guides/console.md interface ProcessCaptureInterface: guide "The raw process-stream interceptor — `emitter` / `active` data + `start` / `stop` / `messages` (whole buffer or one stream) / `clear` / `destroy`." source "Declares an observable interceptor of the raw process output streams — the server's \"own all output\" capture. Where the core `Capture` patches `console.*` (the high-level read side), this patches `process.stdout.write` / `process.stderr.write` (the low-level stream), so it catches direct `process.stdout.write`, third-party library output, and child-process pipes — everything that reaches the streams, not only `console.*`."
guides/console.md class ProcessCapture: guide "The observable interceptor of `process.stdout.write` / `process.stderr.write` — owns ALL server output; never throws, bounded." source "Implements an observable interceptor of the raw process output streams — it takes control of `process.stdout.write` / `process.stderr.write` on the write side. While `active`, every write to a configured `StreamLevel` is captured as a frozen `CapturedChunk`, buffered (total + per-stream, bounded), emitted on `capture`, and — per options — mirrored to the real stream, forwarded to a `SinkInterface`, or both."
guides/console.md function createServerSink: guide "The server `ServerSinkInterface` factory — per-target construction-time color inference, level routing, and plain-target stripping." source "Creates the server TTY `ServerSinkInterface` — the server output backend, the env-symmetric sibling of `createBrowserSink` / core's `createConsoleSink`. `write(text, level?)` routes by level to the process streams and uses construction-time styled facts: it sends ANSI straight to a styled target (with a leading `\\r` overwriting a terminal line natively) but `import('@src/core').strip`s ANSI to clean text for a plain target."
guides/console.md function isStreamTarget: guide "Whether a value is a usable `StreamTargetInterface` (a record with a callable `write`) — the boundary guard, total." source "Checks whether `value` is a usable `StreamTargetInterface` — a record with a callable `write`. A total type guard: it never throws and returns `false` for anything off-shape, so it narrows the one unavoidable boundary (the real `process.stdout` / `process.stderr`, or a fake stream a test injects) to the exact slice the sink + capture touch — no `as`."
guides/console.md function inferColumns: guide "The width of a stream target — its live `columns` when a TTY, else the `DEFAULT_COLUMNS` fallback; total, re-read per call." source "Infers the width in character cells of a stream target — its live `columns` when it is a TTY, else the non-interactive `DEFAULT_COLUMNS` fallback. The basis a `import('./types.js').ServerSinkInterface` reports through `columns` so a `Reporter` / `Progress` can size its layout to the terminal."
guides/console.md function inferStyled: guide "One target's styled fact: `FORCE_COLOR`, then non-empty `NO_COLOR`, then `isTTY === true`; pure and global-free." source "Infers whether one stream target receives styled output. The result is a construction-time target fact for `import('./factories.js').createServerSink`; this helper is pure and never reads process globals itself."
guides/console.md function decodeChunk: guide "One `process.*.write` chunk (`string` / `Uint8Array`) decoded to text — TOTAL, never throws (so the capture wrapper can't crash)." source "Decodes one `process.stdout.write` / `process.stderr.write` chunk to a string — total, never throws. The process write signature accepts `string | Uint8Array` plus an optional encoding; the capture wrapper reuses this so intercepting a raw stream write can never crash the host (a throw inside `process.stdout.write` would take the program down)."
guides/console.md function isBufferEncoding: guide "Whether a value is a `BufferEncoding` accepted by `Buffer.toString` — backs `decodeChunk`'s encoding handling." source "Checks whether `encoding` is a `BufferEncoding` accepted by `Buffer.prototype.toString` — a total guard used by `import('./helpers.js').decodeChunk` to honor a process-write `encoding` argument only when it is a real Node encoding (otherwise utf-8 is assumed)."
guides/console.md const STREAM_LEVELS: guide "The two process streams a capture intercepts by default, in `stdout`-then-`stderr` order — the `StreamLevel` universe." source "Lists the two process streams a `import('./types.js').ProcessCaptureInterface` can intercept, in `stdout`-then-`stderr` order — the `StreamLevel` universe and the default configured set."
guides/console.md const DEFAULT_STREAM_LIMIT: guide "The default bounded-buffer cap for a process capture (`1000`) — total + each per-stream bucket; always bounded." source "Sets the default bounded-buffer cap for a `import('./types.js').ProcessCaptureInterface` — at most this many recent `import('./types.js').CapturedChunk`s are retained per buffer (the total buffer and each per-stream bucket; oldest dropped first). Mirrors the core `Capture`'s `DEFAULT_CAPTURE_LIMIT`; a consumer overrides it through `options.limit`."
guides/console.md const DEFAULT_COLUMNS: guide "The terminal width a server sink reports when the `stdout` stream is not a TTY and no explicit width was given — `80`." source "Sets the terminal width `import('./factories.js').createServerSink` reports through `import('./types.js').ServerSinkInterface.columns` when the `stdout` stream is not a TTY (so `.columns` is `undefined`) and no explicit `options.columns` was supplied — the conventional 80-column default a non-interactive context (a pipe, a CI log) assumes."
guides/console.md const STREAM_LEVEL_MAP: guide "Each `StreamLevel`'s `LogLevel` for the optional sink forward — `stdout` → `info`, `stderr` → `error`." source "Maps each `StreamLevel` to its `LogLevel` for the optional sink forward — the projection a process capture routes through when writing an intercepted chunk to a `import('@src/core').SinkInterface`. `sink.write(text, STREAM_LEVEL_MAP[level])` is the call this map backs. `stderr` is conventionally the error/diagnostic stream → `error`; `stdout` is the normal output stream → `info`. The source of truth for the stream-to-log projection (the server analogue of the core `CAPTURE_LEVEL_MAP`)."
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
```

## Facts for console (taken 2026-09-07T15:48Z by facts.sh)

- Checkout `/home/user/fleet/console`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `f93a2f4`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    133:			const members = source.methods(group.interface).map((method) => method.name)
    141:					expect(findMissing(members, documented)).toEqual([])
    144:					expect(findMissing(documented, members)).toEqual([])
    150:							: findMissing(
    151:									source.methods(entity).map((method) => method.name),
    169:				findUnexampled(
    172:					source.examples().map((example) => example.name),
    177:		for (const group of guide.methods()) {
    188:							? source.examples(group.interface).map((example) => example.name)
    192:									.concat(source.examples(entity).map((example) => example.name))
    193:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    205:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 685:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/console.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/console.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-console-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
