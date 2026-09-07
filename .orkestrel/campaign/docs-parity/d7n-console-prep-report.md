# Report — `d7n-console-prep`

Wall clock: 2026-09-07T15:37:23Z (first command) → 2026-09-07T15:42:35Z (last command).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line:

```text
9 written, 38 unchanged, 0 removed in ..
```

`git status --short` after:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
@@ -130,21 +130,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -159,11 +165,18 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
@@ -172,9 +185,12 @@ for (const entry of manifest) {
 						.map((fence) => fence.code)
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change to the suite. The `findMissing` call whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, and `names` against `surface`) was left unchanged, per the brief.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named these diagnostics; each was fixed in place, no code token moved, no assertion value changed:

**`tests/setup.ts:9`** — `policy(no-malformed-summary)`: open the description with a third-person verb ending in `s`.

```diff
- * A recording {@link import('@src/core').SinkInterface} — a real `SinkInterface` whose `write`
- * records each `(text, level)` it receives, exposed as the `calls` tuple list. The shared form of
+ * Records each `(text, level)` a real {@link import('@src/core').SinkInterface}'s `write`
+ * receives, exposed as the `calls` tuple list. The shared form of
```

**`tests/setup.ts:22`** — `policy(no-malformed-summary)`.

```diff
- * Create a {@link RecordingSinkInterface} — a real `SinkInterface` built on {@link createRecorder}
+ * Creates a {@link RecordingSinkInterface} — a real `SinkInterface` built on {@link createRecorder}
```

**`tests/setup.ts:56`** — `policy(no-malformed-summary)`.

```diff
- * A zero-argument stand-in returning `label` — a distinct, referentially stable function value for
- * a test proving a lookup returns the identical reference it was given rather than a copy.
+ * Returns a zero-argument stand-in producing `label` — a distinct, referentially stable function
+ * value for a test proving a lookup returns the identical reference it was given rather than a
+ * copy.
```

**`tests/setupServer.ts:27`** — `policy(no-malformed-summary)`.

```diff
- * A fake {@link StreamTargetInterface} for the server console — a stand-in `process.stdout` /
+ * Fakes a {@link StreamTargetInterface} for the server console — a stand-in `process.stdout` /
```

**`tests/setupServer.ts:57`** — `policy(no-malformed-summary)`.

```diff
- * A recording stand-in for a raw `process.stdout.write` / `process.stderr.write` — a function
- * assignable to the Node stream `write` slot (so a test can `process.stdout.write = probe.write`
- * with no `as`) that records each chunk as text and returns a configurable backpressure boolean.
+ * Records each raw `process.stdout.write` / `process.stderr.write` chunk as text and returns a
+ * configurable backpressure boolean — a function assignable to the Node stream `write` slot (so a
+ * test can `process.stdout.write = probe.write` with no `as`).
```

**`tests/setupServer.ts:87`** — `policy(no-malformed-summary)`.

```diff
- * An OVERLOAD-AWARE recording stand-in for a raw `process.*.write`, beyond the chunk-only
- * `createWriteProbe`: it records each chunk's decoded text AND the encoding it was handed, and it
- * INVOKES the completion callback (in whichever Node overload position it arrives —
- * `write(chunk, cb)` or `write(chunk, encoding, cb)`). A `ProcessCapture` test installs it as the
- * current `process.stdout.write` / `process.stderr.write` BEFORE `start()` so the capture's
+ * Records each chunk's decoded text AND the encoding it was handed, and INVOKES the completion
+ * callback (in whichever Node overload position it arrives —
+ * `write(chunk, cb)` or `write(chunk, encoding, cb)`) — an OVERLOAD-AWARE recording stand-in for a
+ * raw `process.*.write`, beyond the chunk-only `createWriteProbe`. A `ProcessCapture` test installs
+ * it as the current `process.stdout.write` / `process.stderr.write` BEFORE `start()` so the capture's
```

**`src/core/constants.ts:128`** — `policy(no-malformed-summary)`: state what the symbol does without naming `ESC` in the first sentence.

```diff
- * Holds the ESC control character (`U+001B`) that begins every ANSI escape sequence. Built
+ * Holds the escape control character (`U+001B`) that begins every ANSI escape sequence. Built
```

**`src/core/constants.ts:134`** — `policy(no-malformed-summary)`: without naming `BEL`.

```diff
-/** Holds the BEL control character (`U+0007`) that can terminate an OSC sequence. */
+/** Holds the bell control character (`U+0007`) that can terminate an OSC sequence. */
```

**`src/core/constants.ts:411`** — `policy(no-malformed-summary)`: without naming `CAPTURE_LEVEL_MAP` in the first sentence.

```diff
  * Maps each {@link CaptureLevel} to its {@link LogLevel} for the optional sink forward — the projection the
  * Capture routes through when writing an intercepted call to a {@link
- * import('./types.js').SinkInterface} (`sink.write(text, CAPTURE_LEVEL_MAP[level])`). `warn` /
+ * import('./types.js').SinkInterface}. `sink.write(text, CAPTURE_LEVEL_MAP[level])` is the call
+ * this map backs. `warn` /
```

**`tests/src/core/helpers.test.ts:705`** — `policy(no-banned-term)`: replace `e.g.` with `for example`.

```diff
-// across the whole Unicode + escape spectrum, so any future change (e.g. teaching width
+// across the whole Unicode + escape spectrum, so any future change (for example teaching width
```

**`tests/setupBrowser.ts:6`** — `policy(no-malformed-summary)`.

```diff
-/** The three captured console methods plus the restore — a real call-recording
+/** Holds the three captured console methods plus the restore — a real call-recording
```

**`tests/setupBrowser.ts:19`** — `policy(no-malformed-summary)`.

```diff
- * Swap `console.log` / `warn` / `error` for recording callbacks and return them plus
+ * Swaps `console.log` / `warn` / `error` for recording callbacks and returns them plus
```

**`src/server/constants.ts:30`** — `policy(no-malformed-summary)`: without naming `STREAM_LEVEL_MAP` in the first sentence.

```diff
  * Maps each {@link StreamLevel} to its {@link LogLevel} for the optional sink forward — the projection a
  * process capture routes through when writing an intercepted chunk to a
- * {@link import('@src/core').SinkInterface}
- * (`sink.write(text, STREAM_LEVEL_MAP[level])`). `stderr` is conventionally the error/diagnostic
+ * {@link import('@src/core').SinkInterface}. `sink.write(text, STREAM_LEVEL_MAP[level])` is the
+ * call this map backs. `stderr` is conventionally the error/diagnostic
```

Re-running `npx oxlint --config .oxlintrc.json --deny-warnings .` after these edits produced no output (exit 0).

`npm run test:policy` after these edits: no `prose` failure in `guides/**` or `README.md`; both files stayed untouched by this unit (90 passed, 1 skipped — see criteria section).

## Item 4 — the bump

```diff
-	"version": "0.0.12",
+	"version": "0.0.13",
```

`package-lock.json` was not touched.

## Acceptance criteria

**1. `git status --short`.**

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/core/constants.ts
 M src/server/constants.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/core/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list, plus `tests/guides.test.ts` (item 2), plus the six files item 3 edited (`src/core/constants.ts`, `src/server/constants.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`, `tests/src/core/helpers.test.ts`), plus `package.json`'s version bump (item 4; `package.json` was already modified by `repair`'s `docs` script row, so no new row was added to the status list). Nothing else.

**2. Format, lint, check.**

`npm run format:check`:

```text
Checking formatting...

All matched files use the correct format.
Finished in 9517ms on 84 files using 4 threads.
```

Exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings .`: no output. Exit 0.

`npm run check`: every `tsc --noEmit` step (`tsconfig.json`, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.browser.json`, `configs/src/tsconfig.server.json`) completed with no diagnostics. Exit 0.

**3. Tests.**

`npm run test:guides`:

```text
 Test Files  1 passed (1)
      Tests  91 passed (91)
```

Exit 0. (P21's 43 failures were the record-shape mismatch alone; the drop-in adaptation in item 2 resolved them.)

`npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

Exit 0.

`npm run test:config`:

```text
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```

Exit 0.

**4. `npm run docs`.**

Exit 1 as expected (`rows read: 1, disagreements found: 207`). Verbatim worklist:

```text
guides/console.md type Color: guide "A named terminal color — the 8 base colors, their 8 bright variants, and `default` (the target's own ink, no code)." source "Names a terminal color — the 8 standard base colors, their 8 bright variants, and `default` (the target's own default ink, emitting no color code)."
guides/console.md type Attribute: guide "A text-style effect — `bold` / `dim` / `italic` / `underline` / `inverse` / `strikethrough`, the standard SGR effects." source "Names a text-style attribute — the standard SGR text effects."
guides/console.md interface Style: guide "Style as DATA — a frozen `{ foreground?, background?, attributes }` record; the one style value the whole system shares." source "Represents text style as data — a frozen, readonly record of a foreground color, a background color, and a set of text attributes. The single style value the whole console / terminal system shares; a `RendererInterface` renders it for one target."
guides/console.md interface RendererInterface: guide "The swappable style renderer — turns a `Style` + text into output for ONE target (ANSI default, browser `%c` at the same seam)." source "Declares a swappable style renderer — the seam that turns style data into output for one target. The cross-environment default is the ANSI renderer (SGR escape codes); a browser `%c` / CSS renderer implements the same contract over the same `Style` model, so it drops in without touching the style data (the browser branch)."
guides/console.md interface StylerOptions: guide "`createStyler` options — `renderer?` (the target, default ANSI) + `enabled?` (the no-color switch, default `true`)." source "Configures `createStyler`."
guides/console.md interface StylerInterface: guide "The fluent styling surface — a render FUNCTION carrying a chainable `Color` / `Attribute` accessor per token, immutable copy-on-write." source "Declares the fluent, composable styling surface — the consumer-facing API. It is both a function (call it with text to render the accumulated style) and a record of chainable accessors: every `Color` and `Attribute` is a getter returning a new styler with that token added, so `styler.red.bold('hi')` and `styler.red(styler.bold('hi'))` both work and nothing is mutated."
guides/console.md interface ThemeStatus: guide "One narrative outcome's presentation — the `icon` glyph a `StatusLevel` shows and the `Style` its line renders in." source "Represents one narrative outcome's presentation — the icon glyph a `StatusLevel` shows and the `Style` the line renders in."
guides/console.md interface Theme: guide "The app-wide semantic style vocabulary — `levels` / `statuses` / `accent` / `chrome`, each role bound to a `Style`." source "Represents the app-wide semantic style vocabulary — every role the console system styles, bound to a `Style` value. Pass one theme to a logger / reporter / spinner / progress and every surface speaks it."
guides/console.md interface ThemeOptions: guide "`createTheme` options — the roles to override on `DEFAULT_THEME`; a status supplies its whole copied `{ icon, style }` record." source "Holds the options for `createTheme` — the roles to override on `DEFAULT_THEME`."
guides/console.md class ANSIRenderer: guide "The cross-environment default `RendererInterface` — renders a `Style` as SGR escape codes (stateless, event-free)." source "Implements the cross-environment default `RendererInterface` — renders style data as ANSI SGR escape codes, exactly as `Scheduler` is the `setTimeout` default for its seam. It is the single styling output the whole console / terminal system uses in a terminal; the browser `%c` / CSS renderer implements the same contract over the same `Style`, so retargeting changes the renderer, never the style model."
guides/console.md function createStyler: guide "The fluent `StylerInterface` factory — ANSI by default; a `renderer` retargets it and `enabled: false` disables color." source "Creates the fluent, composable `StylerInterface` — the consumer-facing styling API. It builds a `import('./types.js').Style` under the hood and renders it through a `import('./types.js').RendererInterface` (the ANSI default), so `styler.red.bold('hi')` yields styled text. Chains are immutable, so a base styler is freely reusable."
guides/console.md function createTheme: guide "A `Theme` merged over `DEFAULT_THEME`, every style leaf snapshotted and deep-frozen, ready to share across entities." source "Creates a `Theme` — the app-wide semantic style vocabulary, merged role by role over `DEFAULT_THEME`. Hand one theme to a logger / reporter / spinner / progress and every surface speaks it; omit `options` for the defaults."
guides/console.md function freezeStyle: guide "One `Style` snapshotted and deeply frozen, including an independent frozen copy of its `attributes`." source "Snapshots and deeply freezes one `Style` value."
guides/console.md function strip: guide "Every ANSI escape sequence removed from a string, leaving the plain visible text (total, re-entrant)." source "Removes every ANSI escape sequence from `text`, returning the plain visible string."
guides/console.md function stripControls: guide "Every C0 control byte (except `\\t` / `\\n` / `\\r`) plus DEL removed — a SEPARATE pass from `strip`, so `width` stays untouched." source "Removes every non-printing C0 control character from `text` except `\\t` / `\\n` / `\\r` (meaningful whitespace), plus DEL — returning the sanitized string."
guides/console.md function width: guide "The VISIBLE width of a string — its length in code points after ANSI is stripped (the basis for terminal layout)." source "Measures how many visible columns `text` occupies — its length after ANSI escapes are stripped, counted in Unicode code points (so an astral character such as an emoji counts as one, not the two UTF-16 units `String.length` would report)."
guides/console.md type LogLevel: guide "The severity scale — `debug` < `info` < `warn` < `error`; a logger gates by THRESHOLD (styling is orthogonal)." source "Names the severity level of a `LogRecord` — one coherent, ascending-severity scale."
guides/console.md interface LogRecord: guide "One immutable, serializable log entry — `level` / `message` / `time` (+ `name?` / `data?`); every sink / transport consumes it." source "Represents one immutable, serializable log entry — the universal record the whole logging system carries. A `LoggerInterface` builds one per call, freezes it, retains a bounded tail of them, and emits it on `entry`; every sink / transport consumes this exact shape."
guides/console.md interface SinkInterface: guide "The minimal output primitive — the one seam text leaves the system through (`write(text, level?)`); swap it to retarget." source "Declares the minimal output primitive — the seam every formatted line is written through. A `Sink` is the one place text leaves the logging system; redirect output (to a file, a buffer, a test recorder, the browser `%c` path, a server TTY) by supplying a different `SinkInterface`, with no change to the logger."
guides/console.md interface WriterSet: guide "The three write targets a level-routing sink chooses between — `log` / `warn` / `error`, each of the backend's own member type." source "Groups the three write targets a level-routing sink chooses between — the normal target, the warning target, and the error target."
guides/console.md function selectWriter: guide "The `WriterSet` member a `LogLevel` routes to — the one level-to-target decision every sink backend shares." source "Selects the member of a `WriterSet` a `LogLevel` routes to — `error` to `error`, `warn` to `warn`, every other level and an omitted level to `log`."
guides/console.md function createConsoleSink: guide "The default console `SinkInterface` factory — level-routed, writing through the `console` methods SNAPSHOTTED at creation." source "Creates the default `SinkInterface` — a console sink that routes by level and writes through the `console` methods snapshotted at creation. The default output target behind the `import('./loggers/Logger.js').Logger`."
guides/console.md class Logger: guide "The observable, leveled logger — builds a frozen `LogRecord`, gates it, retains a bounded tail, emits `entry`, writes a styled line." source "Implements an observable, leveled logger — the entry point into the structured-logging pipeline. Each `debug` / `info` / `warn` / `error` call builds a frozen `LogRecord`, gates it by severity, retains a bounded tail of accepted records, always emits it on `entry` (the transport seam), and — unless `silent` — formats it into a styled line and writes it to its `SinkInterface`."
guides/console.md class LoggerManager: guide "An event-free registry of named loggers plus a convenience fan-out." source "Implements an event-free registry of named `Logger`s plus a convenience fan-out — the manager over the logging layer (a registry, never observable itself; each `Logger` owns its own `emitter`)."
guides/console.md type LoggerEventMap: guide "A logger's observable events — `entry(record)` for every accepted record (the transport seam)." source "Declares the observable events a `LoggerInterface` emits — the transport seam."
guides/console.md type LogFormatFunction: guide "The line layout a logger writes — `(record, styler, theme) => string`; `formatRecord` is the default (the event owns the record)." source "Represents the line layout a logger writes — one `LogRecord` plus the styling substrate in, one finished line out. `import('./helpers.js').formatRecord` is the default."
guides/console.md interface LoggerOptions: guide "`Logger` options — `on?` / `error?` / `level?` / `name?` / `sink?` / `styler?` / `theme?` / `format?` / `limit?` / `silent?`." source "Configures the `import('./loggers/Logger.js').Logger` constructor."
guides/console.md interface LoggerInterface: guide "The leveled logger — `emitter` / `level` / `name` data + `debug` / `info` / `warn` / `error` / `entries` / `clear` / `destroy`." source "Declares an observable, leveled logger — builds a frozen `LogRecord` per call, gates it by severity, retains a bounded tail, emits it on `entry`, and (unless silent) writes a styled line to its `SinkInterface`."
guides/console.md interface LoggerManagerOptions: guide "`LoggerManager` options — the `level?` / `sink?` / `styler?` / `theme?` / `format?` / `limit?` / `silent?` logger defaults." source "Configures the `import('./loggers/LoggerManager.js').LoggerManager` constructor."
guides/console.md interface LoggerManagerInterface: guide "The logger registry — a `count` data member + `register` / `logger` / `loggers` / the `debug`…`error` fan-out / `remove`." source "Declares an event-free registry of named `LoggerInterface`s plus a convenience fan-out — the manager over the logging layer. It mints + stores loggers keyed by `name`, looks them up, removes them, and broadcasts a one-off log to every registered logger."
guides/console.md type Alignment: guide "Horizontal alignment within a fixed-width cell — `left` / `center` / `right` (a conventional value set, not a toggle)." source "Names the horizontal text alignment within a fixed-width cell — the conventional three-value set a `ColumnSpec` (and the box / separator title) aligns by. A value pair / set, not a binary toggle, so it stays a union."
guides/console.md type BorderStyle: guide "A box-drawing border weight — `single` / `double` / `round` / `heavy` (each a full junction set in `BORDER_CHARS`)." source "Names a box-drawing border style — the four standard Unicode line weights the renderers frame with. Each selects a full junction set in `BORDER_CHARS` (corners, edges, and the `T` / cross junctions a table needs). A named, fixed set (an external-spec value family), never a toggle — so it stays a union."
guides/console.md interface BorderChars: guide "One complete box-drawing junction set for a `BorderStyle` — edges, corners, and the `T` / cross junctions a table needs." source "Represents one complete box-drawing junction set for a `BorderStyle` — every glyph the box / table renderers need to frame content and rule a table. Plain data (the value lives in `BORDER_CHARS`); the renderers read these so no glyph literal is hard-coded in a renderer."
guides/console.md interface SeparatorOptions: guide "`renderSeparator` options — `title?` / `width?` / `fill?` / `styler?` / `style?` (a horizontal rule, optionally titled)." source "Configures `import('./helpers.js').renderSeparator` — a horizontal rule, optionally carrying a centered title."
guides/console.md interface BoxOptions: guide "`renderBox` options — content/layout plus `styler?` / `style?`; a Reporter supplies chrome only when neither styling key is given." source "Configures `import('./helpers.js').renderBox` — content framed in box-drawing characters."
guides/console.md interface ColumnSpec: guide "One column of a `TableOptions` — its `label` and how its cells `align`." source "Represents one column of a `TableOptions` — its header label and how its cells align."
guides/console.md interface TableOptions: guide "`renderTable` options — `columns` / `rows` / `border?` / `styler?` / `style?`; a Reporter supplies chrome only when neither styling key is given." source "Configures `import('./helpers.js').renderTable` — a bordered grid of columns + rows with per-column alignment and width-aware sizing."
guides/console.md interface TreeNode: guide "One node of a tree — a `label` plus optional `children`, recursively." source "Represents one node of a `TreeOptions` tree — a label plus optional children, recursively."
guides/console.md interface TreeOptions: guide "`renderTree` options — `root` / `border?` / `styler?` / `style?`; a Reporter supplies chrome only when neither styling key is given." source "Configures `import('./helpers.js').renderTree` — a nested `TreeNode` tree drawn with box-drawing connectors."
guides/console.md type StatusLevel: guide "A narrative OUTCOME level — `success` / `error` / `warn` / `info`, each with its own icon + color (DISTINCT from `LogLevel`)." source "Names a narrative outcome level — the four states `ReporterInterface.status` reports, each with its own icon + color (`STATUS_ICONS` / `STATUS_COLORS`)."
guides/console.md interface StepPosition: guide "A step's place in a sequence — the `{ index, total }` a `step` renders as a `[2/5]` prefix." source "Represents where one step sits in a sequence — the `{ index, total }` a `ReporterInterface.step` renders as a `[2/5]` prefix."
guides/console.md interface ReporterOptions: guide "`Reporter` options — `sink?` / `styler?` / `theme?` / `width?` (the shared substrate, semantic roles, and layout width)." source "Configures the `import('./Reporter.js').Reporter` constructor."
guides/console.md interface ReporterInterface: guide "The narrative reporter — `section` / `step` / `timing` / `status` / `table` / `tree` / `box` / `line` / `blank`." source "Declares a lean, event-free narrative reporter — the composable verb set for human / build-run output (sections, steps, timings, outcomes, tables, trees, boxes), formatting through the shared `StylerInterface` + layout renderers and writing to a `SinkInterface`."
guides/console.md class Reporter: guide "The lean, event-free narrative reporter — formats through the shared styler + the pure renderers and writes to a sink." source "Implements a lean, event-free narrative reporter — the composable verb set for human / build-run output. Each verb formats its line through the shared `StylerInterface` and the pure layout renderers (`renderSeparator` / `renderBox` / `renderTable` / `renderTree`) and writes it to a `SinkInterface` — the same styler + sink substrate the logger uses, never a second colorizer."
guides/console.md function renderSeparator: guide "A horizontal rule, optionally carrying a centered title — pure `SeparatorOptions → string`, width-aware." source "Renders a horizontal rule — an optional centered title embedded in a line of fill characters, to a fixed visible width. Pure: same `SeparatorOptions` → same string."
guides/console.md function renderBox: guide "Content framed in box-drawing characters, optionally captioned — pure `BoxOptions → string`, width-aware." source "Renders `content` framed in box-drawing characters, optionally captioned, width-aware so styled content stays aligned inside the frame. Pure: same `BoxOptions` → same string."
guides/console.md function renderTable: guide "A bordered grid of columns + rows with per-column alignment and width-aware sizing — pure `TableOptions → string`." source "Renders a bordered grid of `columns` + `rows` with per-column alignment and width-aware column sizing. Pure: same `TableOptions` → same string."
guides/console.md function renderTree: guide "A nested `TreeNode` tree whose connectors derive from the chosen `border` set — pure `TreeOptions → string`." source "Renders a nested `TreeNode` tree with box-drawing connectors. Pure: same `TreeOptions` → same string."
guides/console.md function renderTreeChildren: guide "The connector-prefixed lines for a `TreeNode` list; its third options argument requires `border` and groups optional `styler` / `style`." source "Renders the connector-prefixed lines for a `TreeNode` list — the recursive core behind `renderTree`. Each child is drawn as `prefix` + its connector (`├─` for any but the last, `└─` for the last) + its label, with its own descendants recursed beneath under the carried guide (`│` under a non-last node, ` ` under the last)."
guides/console.md function renderBar: guide "A determinate progress-bar string (`█████░░░░░ 50% (5/10)`) rendered from a `BarOptions` — pure and width-aware." source "Renders a determinate progress bar string — a filled / empty glyph track followed by the percentage and the `(current/total)` count (`█████░░░░░ 50% (5/10)`). Pure: same `BarOptions` → same string. The animation-layer sibling of the `render*` renderers (box / table / tree / separator), shared so a `import('./types.js').ProgressInterface` and any direct caller draw the one bar — never a second, hand-rolled one."
guides/console.md function align: guide "Text padded (or truncated) to exactly N VISIBLE columns by an `Alignment` — the cell-fitting primitive the renderers align with." source "Pads (or, when over budget, truncates) `text` to exactly `columns` visible columns, positioning it by `alignment`. The width primitive the box / table renderers align every cell with."
guides/console.md function paint: guide "Text colored through an optional styler and optional by-value `Style` (verbatim when the styler is absent) — the shared styling primitive." source "Colors `text` through `styler`, or returns it verbatim when `styler` is `undefined` — the single optional-styling primitive every renderer applies to its border / title / connector glyphs (the one styler seam, shared, never re-hand-rolled per renderer)."
guides/console.md function repeatTo: guide "A (possibly multi-cell) unit tiled to exactly N VISIBLE columns, a trailing partial trimmed — the fill primitive for rules / edges." source "Repeats `unit` until it fills exactly `columns` visible columns, trimming a trailing partial unit so the run is never over-wide — the fill primitive the separator + box edges draw with."
guides/console.md function cellAt: guide "The cell at an index of a (possibly ragged) row — `''` past the end, so a short row pads instead of throwing." source "Returns the cell at `index` of a (possibly ragged) row — `''` when the row is shorter than the column count, so a short row pads out instead of throwing (the ragged-row guard `renderTable` reads every cell through)."
guides/console.md function meetsLevel: guide "Whether a record at one `LogLevel` passes a logger gated at a threshold — the level gate's severity comparison." source "Checks whether a record at `level` passes a logger gated at `threshold` — that is, its severity is at or above the threshold's."
guides/console.md function formatTime: guide "A record's epoch-ms `time` as an ISO-8601 timestamp — the timestamp portion of the formatted log line." source "Formats a `LogRecord`'s `time` (epoch milliseconds) as an ISO-8601 timestamp string."
guides/console.md function formatRecord: guide "One styled line built from `(record, styler, theme)` — the default human line layout a logger writes." source "Formats a `LogRecord` into a single styled line — the default human line layout a `import('./types.js').LoggerInterface` writes to its sink."
guides/console.md function formatDuration: guide "A millisecond duration as `…ms` (sub-second) or `…s` (2 d.p.) — the rendering behind `Reporter.timing`." source "Formats a millisecond duration as a compact human string — `…ms` below one second, `…s` (seconds to 2 decimal places) at or above one second. The timing rendering behind `import('./types.js').ReporterInterface.timing`."
guides/console.md function stringifyValue: guide "ONE captured console argument as a line fragment (Error → `name: message`, object → circular-safe JSON) — total." source "Stringifies one captured console argument into a line fragment — the per-argument rule behind `formatArgs`: an `Error` → `name: message`, a plain object / array → circular-safe JSON, anything else (string, number, boolean, `null`, `undefined`, symbol, function) → `String(value)`."
guides/console.md function formatArgs: guide "A captured `console.*` argument list as ONE space-joined line — the text of a `CapturedMessage` (total, never throws)." source "Stringifies a captured `console.*` argument list into one line — the text of a `import('./types.js').CapturedMessage`. Each argument is rendered by `stringifyValue` and the parts are space-joined, mirroring how a console concatenates its arguments."
guides/console.md type CaptureLevel: guide "One intercepted `console` method — `log` / `info` / `warn` / `error` / `debug` (names the ORIGINATING method, not a severity)." source "Identifies one intercepted `console` method — the names a `CaptureInterface` patches and reports under. A fixed set keyed off the universal `console.*` methods (`console.log` / `info` / `warn` / `error` / `debug`); a named value family (it indexes `CAPTURE_LEVEL_MAP` to a `LogLevel` for the optional sink forward), never a binary toggle — so it stays a union."
guides/console.md type ConsoleMethod: guide "The patched `console.*` method shape — a variadic `(...args) => void`; the boundary type the capture snapshots + swaps." source "Names the console-method shape a `CaptureInterface` snapshots and swaps at the patch boundary — a variadic sink of arbitrary arguments."
guides/console.md interface CapturedMessage: guide "One captured console call — an immutable, serializable `{ level, text, time }`; every consumer reads this exact shape." source "Represents one captured console call — an immutable, serializable record of a single intercepted `console.*` invocation. A `CaptureInterface` builds one per call, freezes it, buffers it (total + by level), and emits it on `capture`; every consumer reads this exact shape."
guides/console.md type CaptureEventMap: guide "A capture's observable events — `capture(message)` per intercepted call + the `start` / `stop` lifecycle signals." source "Declares the observable events a `CaptureInterface` emits."
guides/console.md interface CaptureOptions: guide "`Capture` options — `on?` / `error?` / `levels?` / `mirror?` / `sink?` / `limit?`." source "Configures the `import('./Capture.js').Capture` constructor."
guides/console.md interface CaptureInterface: guide "The console interceptor — `emitter` / `active` data + `start` / `stop` / `messages` (whole buffer or one level) / `clear` / `destroy`." source "Declares an observable console interceptor — it takes control of the global `console.*` on the read side: while `active`, every configured `console.x` call is captured as a frozen `CapturedMessage`, buffered (total + by level, bounded), emitted on `capture`, and — per options — mirrored to the real console, forwarded to a `SinkInterface`, or both."
guides/console.md interface CaptureResult: guide "The structured outcome of `createCaptureResult` — the wrapped function's `value` plus the `messages` it logged." source "Represents the structured outcome of `import('./factories.js').createCaptureResult` — the wrapped function's own return `value` plus the `CapturedMessage`s intercepted while it ran."
guides/console.md interface RetentionInterface: guide "The bounded, level-keyed retention buffer a capture keeps its records in — one capped total buffer plus one capped bucket per level." source "Declares the bounded, level-keyed retention buffer a capture keeps its records in — one capped total buffer plus one capped bucket per level configured at construction."
guides/console.md class Retention: guide "The bounded, level-keyed retention engine both captures compose — generic over the record type each carries, so neither can drift." source "Implements the bounded, level-keyed retention engine both captures buffer through — one capped total buffer plus one capped bucket per level, generic over the record type each capture carries."
guides/console.md class Capture: guide "The observable console interceptor — buffers (total + by level), emits `capture`, optionally mirrors + forwards to a sink." source "Implements an observable console interceptor — it takes control of the global `console.*` on the read side. While `active`, every configured `console.x` call is captured as a frozen `CapturedMessage`, buffered (total + by level, bounded), emitted on `capture`, and — per options — mirrored to the real console, forwarded to a `SinkInterface`, or both."
guides/console.md function createCaptureResult: guide "A function's `{ value, messages }` after running it with `console.*` captured for its duration (scoped, self-restoring; sync or async)." source "Runs `fn` with the global `console.*` captured for its duration, returning the function's `value` plus the `import('./types.js').CapturedMessage`s it logged — the scoped, self-restoring ergonomic form of the `Capture` class."
guides/console.md type ConsoleErrorCode: guide "The machine-readable error code a `ConsoleError` carries — `INVARIANT`, the only code the package throws." source "Names a machine-readable error code for a `import('./errors.js').ConsoleError`."
guides/console.md class ConsoleError: guide "Carries a `ConsoleErrorCode` and an optional `context` bag — thrown for an internal invariant violated at a defensive guard." source "Represents an error thrown by the console layer."
guides/console.md function isConsoleError: guide "Whether an unknown caught value is a `ConsoleError` — the narrowing guard for a `catch`." source "Narrows an unknown caught value to a `ConsoleError`."
guides/console.md interface BarOptions: guide "`renderBar` options — `current` / `total` / `width?` / `fill?` / `empty?` / `styler?` / `style?` (a determinate bar string)." source "Configures the pure `import('./helpers.js').renderBar` renderer — a determinate progress bar string (`█████░░░░░ 50% (5/10)`), width-aware and styler-optional."
guides/console.md type SpinnerEventMap: guide "A spinner's observable events — `frame(line)` per advance / outcome + the `start` / `stop` timer-lifecycle signals." source "Declares the observable events a `SpinnerInterface` emits."
guides/console.md interface SpinnerOptions: guide "`Spinner` options — `on?` / `error?` / `message?` / `frames?` / `interval?` / `sink?` / `styler?` / `theme?`." source "Configures the `import('./Spinner.js').Spinner` constructor."
guides/console.md interface SpinnerInterface: guide "The activity spinner — `emitter` / `active` / `message` data + `start` / `tick` / `update` / `succeed` / `fail` / `stop` / `destroy`." source "Declares a self-driving, observable activity spinner — a glyph cycle that advances on a periodic timer, writing each `\\r` + frame line to its `SinkInterface` and emitting it on `frame`. The line-overwrite is the sink's job (a TTY sink overwrites on the `\\r`; a plain sink degrades to a fresh line)."
guides/console.md class Spinner: guide "The self-driving, observable spinner — a timer-advanced glyph cycle writing `\\r` + a frame line to its sink; leak-free." source "Implements a self-driving, observable activity spinner — a glyph cycle that advances on a periodic timer, writing each `\\r` + frame line to its `SinkInterface` and emitting it on `frame`. The leading `\\r` is what an overwrite-capable sink (the TTY sink) redraws on; a plain sink degrades to a fresh, non-overwriting line — the line-overwrite is the sink's job, never the spinner's. Universal — `setInterval` + the one `StylerInterface` + the one `SinkInterface`, no `node:*`, no `process.stdout`."
guides/console.md interface ProgressReport: guide "One advance of a progress bar — the clamped `{ current, total }` the `update` event carries." source "Reports one advance of a `ProgressInterface` — the clamped `{ current, total }` payload carried by the `update` event of `ProgressEventMap`."
guides/console.md type ProgressEventMap: guide "A progress bar's observable events — `update({current,total})` per report + a `succeed` signal on a successful finish." source "Declares the observable events a `ProgressInterface` emits."
guides/console.md interface ProgressOptions: guide "`Progress` options — `on?` / `error?` / `total` / `message?` / `width?` / `fill?` / `empty?` / `sink?` / `styler?` / `theme?`." source "Configures the `import('./Progress.js').Progress` constructor."
guides/console.md interface ProgressInterface: guide "The progress bar — `emitter` / `active` / `succeeded` / `current` / `total` data + `update` / `succeed` / `fail` / `destroy`." source "Declares an update-driven, observable progress bar — `update(current)` recomputes the bar through `import('./helpers.js').renderBar`, writes `\\r` + bar to its `SinkInterface`, and emits the `{ current, total }` on `update`. The line-overwrite is the sink's job (a TTY sink overwrites on the `\\r`; a plain sink degrades to a fresh line). No self-timer — the caller drives it."
guides/console.md class Progress: guide "The update-driven, observable progress bar — recomputes + writes `\\r` + the bar on each `update`; no self-timer (the caller drives)." source "Implements an update-driven, observable progress bar — `update` recomputes the bar through `renderBar`, writes `\\r` + bar to its `SinkInterface`, and emits the `{ current, total }` on `update`. The leading `\\r` is what an overwrite-capable sink (the TTY sink) redraws on; a plain sink degrades to a fresh, non-overwriting line — the line-overwrite is the sink's job. Universal — the one `StylerInterface` + the one `SinkInterface`, no `node:*`, no `process.stdout`. No self-timer (unlike `import('./Spinner.js').Spinner`) — the caller drives it."
guides/console.md const FOREGROUND_CODES: guide "Each `Color`'s SGR FOREGROUND parameter (30–37 / 90–97); `default` is absent (emits no code)." source "Maps each `Color` to its SGR foreground parameter — the 8 base colors at 30–37 and their bright variants at 90–97. `default` is intentionally absent (it emits no code)."
guides/console.md const BACKGROUND_CODES: guide "Each `Color`'s SGR BACKGROUND parameter (40–47 / 100–107); `default` is absent." source "Maps each `Color` to its SGR background parameter — the 8 base colors at 40–47 and their bright variants at 100–107. `default` is intentionally absent (it emits no code)."
guides/console.md const ATTRIBUTE_CODES: guide "Each `Attribute`'s SGR \"on\" parameter (`bold` 1, `dim` 2, `italic` 3, `underline` 4, `inverse` 7, `strikethrough` 9)." source "Maps each `Attribute` to its SGR \"on\" parameter — `bold` 1, `dim` 2, `italic` 3, `underline` 4, `inverse` 7, `strikethrough` 9. The renderer composes several by joining their codes with `;` in one SGR sequence."
guides/console.md const EMPTY_STYLE: guide "The EMPTY `Style` (no colors, no attributes) — the neutral base a styler builds from; deeply frozen." source "Holds the empty `Style` — no foreground, no background, no attributes — frozen. The neutral starting point a base styler builds from, and what a renderer passes through unchanged (it carries no codes). Deeply frozen, so it is safe to share as the base."
guides/console.md const DEFAULT_THEME: guide "The default `Theme` — every role bound to its default `Style`, assembled from `LEVEL_COLORS` / `STATUS_ICONS` / `STATUS_COLORS`." source "Holds the default `Theme` — every role bound to its default `Style`, deeply frozen. The base `import('./factories.js').createTheme` merges over, and the theme every entity uses when none is supplied."
guides/console.md const COLORS: guide "Every named `Color` except `default` — the colors the styler exposes as chainable accessors." source "Lists every named `Color` except `default`, frozen — the colors the styler exposes as chainable accessors. The source of truth for the color axis; the styler drives its accessors from this array so the literals live in one place."
guides/console.md const ATTRIBUTES: guide "Every `Attribute` — the attributes the styler exposes as chainable accessors." source "Lists every `Attribute`, frozen — the attributes the styler exposes as chainable accessors. The source of truth for the attribute axis."
guides/console.md const RESET_CODE: guide "The SGR RESET parameter (`0`) — terminates a styled run." source "Holds the SGR RESET parameter (0) — terminates a styled run, clearing all colors and attributes."
guides/console.md const ESC: guide "The ESC control character (`U+001B`) beginning every ANSI escape sequence." source "Holds the escape control character (`U+001B`) that begins every ANSI escape sequence. Built with `String.fromCharCode` so no raw control character appears in source."
guides/console.md const BEL: guide "The BEL control character (`U+0007`) that can terminate an OSC sequence." source "Holds the bell control character (`U+0007`) that can terminate an OSC sequence."
guides/console.md const CSI: guide "The Control Sequence Introducer (`ESC[`) opening every SGR sequence." source "Holds the Control Sequence Introducer (`ESC[`) that opens every SGR sequence."
guides/console.md const RESET: guide "The full SGR reset sequence (`ESC[0m`) appended after a styled run." source "Holds the full SGR reset sequence (`ESC[0m`) appended after a styled run."
guides/console.md const ANSI_PATTERN: guide "The global `RegExp` matching any ANSI escape (CSI / OSC / DCS / PM / APC / SOS / nF / Fp / Fe / Fs) — `strip` removes every occurrence." source "Matches any ANSI/VT escape sequence — CSI (SGR color/style plus cursor/erase/scroll, including colon-parameterized SGR), OSC / DCS / PM / APC / SOS string sequences (titles, hyperlinks, device strings), the `nF` charset-select family, and the two-byte `Fp` / `Fe` / `Fs` sequences (for example `ESC 7`, `ESC D`, `ESC c` RIS). Global, so `strip` removes every occurrence."
guides/console.md const CONTROL_PATTERN: guide "The global `RegExp` matching a C0 control byte (except `\\t` / `\\n` / `\\r`) plus DEL — `stripControls` removes every occurrence." source "Matches every C0 control character except `\\t` / `\\n` / `\\r` (which are meaningful whitespace), plus DEL (`0x7F`) — the non-printing bytes `import('./helpers.js').stripControls` removes. Global, ASCII-only source (no raw control-character literal), so a scan builds a fresh `RegExp` the same way as `ANSI_PATTERN` to avoid a mutated `lastIndex`."
guides/console.md const LEVEL_SEVERITY: guide "Each `LogLevel`'s numeric severity — the ascending order (`debug` 0 < `info` 1 < `warn` 2 < `error` 3) the gate reads." source "Maps each `LogLevel` to its numeric severity — the ascending order the level gate compares through (`debug` 0 < `info` 1 < `warn` 2 < `error` 3). A record is kept when its level's severity is at or above the logger's threshold. The source of truth for level ordering."
guides/console.md const LEVEL_COLORS: guide "Each `LogLevel`'s default label `Color` — its VISUAL treatment (orthogonal to leveling); excludes `default`." source "Maps each `LogLevel` to its default label `Color` — the level's visual treatment, which is a styling choice orthogonal to the level itself (never a separate pseudo-level). The logger colors the level label through its styler with these; swapping a color never changes leveling. `debug` is cyan, `info` blue, `warn` yellow, `error` red."
guides/console.md const DEFAULT_LOG_LIMIT: guide "The default bounded-retention cap for a logger (`1000`); retention is always bounded." source "Sets the default bounded-retention cap for a `import('./types.js').LoggerInterface` — at most this many recent records are kept (oldest dropped first). Retention is always bounded — the oldest record is dropped after the cap is reached; a consumer overrides it through `options.limit`."
guides/console.md const DEFAULT_LOG_LEVEL: guide "The default `LogLevel` threshold a logger gates at — `info`." source "Sets the default `LogLevel` threshold a logger gates at when none is supplied — `info`."
guides/console.md const LOG_LEVELS: guide "Every `LogLevel` in ascending severity — the level axis (drives exhaustive tests)." source "Lists every `LogLevel`, in ascending severity order — the levels a logger exposes as methods and the manager fans out to. The source of truth for the level axis (drives exhaustive tests); aligned with `LEVEL_SEVERITY`."
guides/console.md const BORDER_CHARS: guide "The complete `BorderChars` junction set for each `BorderStyle` — the standard Unicode box-drawing glyphs." source "Holds the complete `BorderChars` junction set for each `BorderStyle` — the standard Unicode box-drawing glyphs at the four line weights. The renderers (`import('./helpers.js').renderBox` / `import('./helpers.js').renderTable`) look the style up here, so no glyph literal lives in a renderer. Deeply frozen."
guides/console.md const STATUS_ICONS: guide "Each `StatusLevel`'s icon glyph — `success` ✔, `error` ✖, `warn` ⚠, `info` ℹ." source "Maps each `StatusLevel` to its icon glyph — the leading mark a `import('./types.js').ReporterInterface.status` outcome line shows: `success` ✔, `error` ✖, `warn` ⚠, `info` ℹ. The narrative-outcome counterpart to a log level's label; frozen."
guides/console.md const STATUS_COLORS: guide "Each `StatusLevel`'s `Color` — `success` green, `error` red, `warn` yellow, `info` blue; excludes `default`." source "Maps each `StatusLevel` to its `Color` — the icon + message color a `status` line renders in (`success` green, `error` red, `warn` yellow, `info` blue). The visual treatment of a narrative outcome, colored through the reporter's styler; orthogonal to leveling, like `LEVEL_COLORS`. Excludes `default` so each value indexes a real styler accessor."
guides/console.md const STATUS_LEVELS: guide "Every `StatusLevel` — the outcomes a `status` line supports." source "Lists every `StatusLevel`, frozen — the outcomes a `status` line supports (drives exhaustive tests). The source of truth for the status axis; aligned with `STATUS_ICONS` / `STATUS_COLORS`."
guides/console.md const DEFAULT_WIDTH: guide "The default visible width for the width-aware renderers + the reporter's `section` rule — `80`." source "Sets the default visible column width for the width-aware renderers — the separator rule and a `import('./helpers.js').renderBox` with no explicit `width`, and the reporter's `section` rule. A sane terminal default (80 columns); a caller overrides it per-call or through `import('./types.js').ReporterOptions``.width`."
guides/console.md const DEFAULT_PADDING: guide "The default horizontal padding inside a box's edges — one cell." source "Sets the default horizontal padding inside a box's edges (`import('./helpers.js').renderBox`) — one cell."
guides/console.md const DEFAULT_BORDER: guide "The default `BorderStyle` when none is given — `single`." source "Sets the default `BorderStyle` the box / table renderers frame with when none is given — `single`."
guides/console.md const DEFAULT_ALIGN: guide "The default cell `Alignment` when none is given — `left`." source "Sets the default cell `Alignment` a `import('./types.js').ColumnSpec` uses when none is given — `left`."
guides/console.md const SEPARATOR_FILL: guide "The default fill character `renderSeparator` draws its rule with — `─`." source "Holds the default fill character `import('./helpers.js').renderSeparator` draws its rule with — `─`."
guides/console.md const SEPARATOR_TITLE_GAP: guide "The single padding cell on each side of a separator's embedded title." source "Holds the single padding cell on each side of a separator's embedded title (`title`) — keeps the title from butting against the rule. One space."
guides/console.md const SECOND_MS: guide "The millisecond threshold (`1000`) where `formatDuration` switches from `…ms` to `…s`." source "Sets the number of milliseconds at or above which `import('./helpers.js').formatDuration` (and so `Reporter.timing`) switches from a `…ms` rendering to a `…s` (seconds, 2 d.p.) rendering — exactly one second."
guides/console.md const CAPTURE_LEVELS: guide "Every `CaptureLevel` — the `console.*` methods a `Capture` intercepts by default (`log` / `info` / `warn` / `error` / `debug`)." source "Lists every `CaptureLevel`, frozen — the `console.*` methods a `import('./types.js').CaptureInterface` intercepts by default (and the source of truth for the capture-level axis; drives exhaustive tests). The universal console methods: `log`, `info`, `warn`, `error`, `debug`."
guides/console.md const DEFAULT_CAPTURE_LIMIT: guide "The default bounded-buffer cap for a `Capture` (`1000`) — total + each by-level bucket; always bounded." source "Sets the default bounded-buffer cap for a `import('./types.js').CaptureInterface` — at most this many recent `CapturedMessage`s are retained per buffer (the total buffer and each by-level bucket; oldest dropped first). Capture retention is always bounded so a long-running capture can never grow without bound (the same retention precedent as `DEFAULT_LOG_LIMIT`); a consumer overrides it through `options.limit`."
guides/console.md const CAPTURE_LEVEL_MAP: guide "Each `CaptureLevel`'s `LogLevel` for the optional sink forward (`log` → `info`, else the matching level)." source "Maps each `CaptureLevel` to its `LogLevel` for the optional sink forward — the projection the Capture routes through when writing an intercepted call to a `import('./types.js').SinkInterface`. `sink.write(text, CAPTURE_LEVEL_MAP[level])` is the call this map backs. `warn` / `error` / `debug` / `info` map to their matching `LogLevel`; `log` maps to `info` (a plain console log is informational — the default stream), so a stream-aware sink routes `warn` / `error` captures to the right stream. The source of truth for the capture-to-log projection."
guides/console.md const SPINNER_FRAMES: guide "The default spinner frame cycle — the ten braille-pattern glyphs (`⠋⠙⠹…`)." source "Holds the default spinner frame cycle a `import('./types.js').SpinnerInterface` advances through — the ten braille-pattern glyphs (U+2800 block) that read as a smoothly rotating dot, the universal terminal-spinner convention. Frozen; a consumer swaps the whole cycle through `options.frames`."
guides/console.md const DEFAULT_SPINNER_INTERVAL: guide "The default timer period between spinner frames — `80` ms (≈12.5 fps)." source "Sets the default timer period in milliseconds between a `import('./types.js').SpinnerInterface`'s frames — the `setInterval` interval `start()` arms. Eighty milliseconds (≈12.5 frames/second) is the conventional spinner cadence: fast enough to read as motion, slow enough not to thrash a terminal. A consumer overrides it through `options.interval`."
guides/console.md const BAR_FILL: guide "The default FILLED-cell glyph `renderBar` draws with — the full block `█`." source "Holds the default filled-cell glyph `import('./helpers.js').renderBar` draws the completed run of a progress bar with — the full block `█` (U+2588). A single visible cell; a consumer overrides it through `import('./types.js').BarOptions``.fill`."
guides/console.md const BAR_EMPTY: guide "The default EMPTY-cell glyph `renderBar` draws with — the light-shade block `░`." source "Holds the default empty-cell glyph `import('./helpers.js').renderBar` draws the remaining run of a progress bar with — the light-shade block `░` (U+2591). A single visible cell; a consumer overrides it through `import('./types.js').BarOptions``.empty`."
guides/console.md const DEFAULT_BAR_WIDTH: guide "The default visible cell count of a progress-bar TRACK — `30`." source "Sets the default visible cell count of a progress-bar track — the glyph run `import('./helpers.js').renderBar` fills (and a `import('./types.js').ProgressInterface` sizes its bar to). Thirty cells is a compact, terminal-friendly default; a consumer overrides it through `options.width`. Distinct from `DEFAULT_WIDTH` (the renderers' 80-column line width) — a bar track is one inline element, not a full-width rule."
guides/console.md interface BrowserPalette: guide "Partial browser CSS overrides — named `color?` / `attribute?` entries replace only those entries; every omission keeps its default." source "Holds partial browser CSS overrides for the core color and attribute axes. Omitted entries retain the built-in browser mappings, so one override changes only its named value."
guides/console.md interface BrowserSinkOptions: guide "`createBrowserSink` options — an optional partial `palette?` for the browser's named color and attribute CSS mappings." source "Configures `import('./factories.js').createBrowserSink`."
guides/console.md interface ConsoleOutput: guide "The `console.log`-ready output `ansiToConsole` produces — a `%c`-segmented `format` string + the parallel `styles` CSS array." source "Represents the `console.log`-ready output `import('./helpers.js').ansiToConsole` produces from an ANSI-styled string — a format string of `%c`-prefixed segments and the parallel array of CSS declarations, ready to spread into a browser `console` call as `console.log(format, ...styles)`."
guides/console.md interface StyleAccumulator: guide "The immutable scan state `ansiToConsole` replaces while translating SGR codes to CSS — an optional `foreground` / `background` plus a readonly attribute list." source "Represents the immutable accumulator `import('./helpers.js').ansiToConsole` carries across a run while translating SGR codes to CSS — a single `foreground` and `background` declaration (each channel replaceable by a later color of the same channel) plus an ordered, de-duplicated list of attribute declarations. An SGR reset drops both channels and empties the list; `import('./helpers.js').ansiToConsole` folds it into the `;`-joined CSS string a run emits."
guides/console.md function createBrowserSink: guide "The browser `%c` `SinkInterface` factory — level-routed ANSI translation with an optional partial `BrowserPalette`." source "Creates the browser `%c` `SinkInterface` — the browser output backend. `write(text, level?)` translates the ANSI-styled `text` into a browser `console` call (`console[method](format, ...styles)`) through `ansiToConsole`, so a DevTools console renders the same styling a terminal does. Drop it in as a logger / reporter / spinner sink (`new Logger({ sink: createBrowserSink() })`) to retarget the core output to the browser console with no change to the core."
guides/console.md function ansiToConsole: guide "ANSI text translated into a `%c` `ConsoleOutput`; an optional partial `BrowserPalette` overrides CSS per named lookup." source "Translates an ANSI-styled string into a browser `console.log`-ready `ConsoleOutput` — a `%c`-segmented format string and the parallel array of CSS declarations, so a DevTools console renders the same styling a terminal would (the browser sink calls `console[method](format, ...styles)`)."
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
guides/console.md function inferColumns: guide "Infers the width of a stream target — its live `columns` when a TTY, else the `DEFAULT_COLUMNS` fallback; total, re-read per call." source "Infers the width in character cells of a stream target — its live `columns` when it is a TTY, else the non-interactive `DEFAULT_COLUMNS` fallback. The basis a `import('./types.js').ServerSinkInterface` reports through `columns` so a `Reporter` / `Progress` can size its layout to the terminal."
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
guides/console.md LoggerManagerInterface.warn: guide absent source "Fans out an `warn` log to every registered logger."
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
EXIT 1
```

## Ancillary decisions

- The `src/core/constants.ts:411` and `src/server/constants.ts:30` diagnostics both flagged the identifier appearing in the sentence's inline code example (`CAPTURE_LEVEL_MAP[level]` / `STREAM_LEVEL_MAP[level]`), not a naming-the-symbol-as-subject issue. Resolved by splitting the sentence so the example clause follows a period, keeping the code span and every fact but moving the identifier out of the first sentence.
- Left the pre-existing typo "failureing" in `tests/src/core/helpers.test.ts:706` untouched — outside this unit's scope (only the banned term on line 705 was named by the diagnostic).
- Re-flowed the wrapped comment lines that shifted length in `tests/setupServer.ts` and `src/core/constants.ts` / `src/server/constants.ts` for readability before running `npm run format`, which then normalized final line wrapping; no additional text was added or removed beyond the diagnostic fix itself.
