# Report — `d7n-console-converge`

Wall clock: 2026-09-07T15:49:18Z (first command) → 2026-09-07T16:21:50Z (last command).

## Criterion 1 — red-first on the unconverged tree

Added to `tests/guides.test.ts` before any convergence: `findDrift` imported beside the existing
readers; `README.md` added to `ROOT_FILES`; the `CONSOLE_GUIDE` constant renamed `GUIDE_SPEC` and
reused by the pin, the README case, and the flagship-fence block; the `own` manifest-row binding;
the pin and the README case at file scope; the equality case inside the manifest loop's
`describe(entry.concept)`.

`npm run test:guides` → `Test Files 1 failed (1)`, `Tests 3 failed | 91 passed (94)`.

**`pairs at least one example title across the guide and the source`** (`tests/guides.test.ts:133`):

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+ [
+   "guides/console.md pairs: guide [\"Surface\",\"A styled, leveled logger\",\"The line a logger writes\",\"A logger registry\",\"A reporter narration\",\"One theme, every entity\",\"Scoping third-party console.* with createCaptureResult\",\"Capture lifecycle\",\"The bounded retention engine directly\",\"A spinner and a progress bar\",\"The browser — %c styling in DevTools\",\"The server — a TTY sink and a process capture\",\"One logger, different sink per environment (the cross-env one-liner)\",\"The pure layout + formatting helpers directly\",\"Server helpers directly\",\"Server boundary guards directly\"] source []",
+ ]
```

**`opens the README with the guide tagline`** (`tests/guides.test.ts:147`):

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:147:20
    147|  expect(pitch).not.toBeUndefined()
```

**`Console > keeps every compared summary and example equal to its source`**
(`tests/guides.test.ts:228`):

```text
AssertionError: expected [ …(206) ] to deeply equal []
+ [
+   "guides/console.md type Color: guide \"A named terminal color — the 8 base colors, their 8 bright variants, and `default` (the target's own ink, no code).\" source \"Names a terminal color — the 8 standard base colors, their 8 bright variants, and `default` (the target's own default ink, emitting no color code).\"",
+   "guides/console.md type Attribute: guide \"A text-style effect — `bold` / `dim` / `italic` / `underline` / `inverse` / `strikethrough`, the standard SGR effects.\" source \"Names a text-style attribute — the standard SGR text effects.\"",
+   "guides/console.md interface Style: guide \"Style as DATA — a frozen `{ foreground?, background?, attributes }` record; the one style value the whole system shares.\" source \"Represents text style as data — a frozen, readonly record of a foreground color, a background color, and a set of text attributes. …\"",
```

After convergence: `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 94 passed (94)`.

## Criterion 2 — headers and class rows

Renamed the `Behavior` header to `Summary` in every `## Methods` table (guide lines 305, 313, 319,
325, 337, 350, 364, 372, 382, 394, 403 in the converged file). Every `## Surface` table already
headed `Summary`. Verified over the converged guide: 24 header rows, every one ending `Summary`,
every middle column `Kind` or `Returns`, nothing else.

```text
55,78,99,136,154,164,181,202,225,240,255,266,290: ['API', 'Kind', 'Summary']
305,313,319,325,337,350,364,372,382,394,403: ['Method', 'Returns', 'Summary']
non-conforming: []
```

No `### Classes` work applies here, and the report states why rather than claiming a rename:
`grep -n '^### Entities' guides/console.md` returns nothing; no table's `Kind` column is uniformly
`class` (every `## Surface` table mixes `type`, `interface`, `class`, `function`, and `const`); and
no class is documented under its own H3 — this guide's H3 sections are thematic (`### Styling`,
`### Logging`, …) and its H4 sections are the `## Methods` interface subsections
(`#### \`RendererInterface\`` and siblings), so every class already carries a row.

No table carries a `Shape` or `Signature` column, so no `Shape` convention sentence was written.

## Criterion 3 — the doc blocks, then `--to guide`

**Rewritten by hand before propagation, because the cell carried what the block lacked.**
`type Attribute`, `type LogLevel`, `type StatusLevel`, `type StreamLevel`, `type StreamWriteFunction`,
`type StreamWriteCallback`, `type LogFormatFunction`, `type LoggerEventMap`, `type CaptureEventMap`,
`type SpinnerEventMap`, `type ProgressEventMap`, `type ProcessCaptureEventMap`, `type ConsoleErrorCode`;
`interface Theme`, `interface ThemeOptions`, `interface StylerOptions`, `interface LogRecord`,
`interface WriterSet`, `interface LoggerOptions`, `interface LoggerManagerOptions`,
`interface BorderChars`, `interface SeparatorOptions`, `interface BoxOptions`, `interface TableOptions`,
`interface TreeOptions`, `interface ReporterOptions`, `interface CaptureOptions`,
`interface CapturedMessage`, `interface CaptureResult`, `interface BarOptions`,
`interface SpinnerOptions`, `interface ProgressOptions`, `interface BrowserPalette`,
`interface BrowserSinkOptions`, `interface ServerSinkOptions`, `interface ProcessCaptureOptions`,
`interface CapturedChunk`; `class ConsoleError`; `function isConsoleError`, `function freezeStyle`,
`function stripControls`, `function createStyler`, `function paint`, `function renderTree`,
`function renderTreeChildren`, `function inferStyled`, `function ansiToConsole`,
`function createBrowserSink`; `const DEFAULT_THEME`, `const DEFAULT_LOG_LIMIT`, `const SECOND_MS`,
`const DEFAULT_CAPTURE_LIMIT`, `const SPINNER_FRAMES`, `const DEFAULT_SPINNER_INTERVAL`,
`const DEFAULT_BAR_WIDTH`, `const DEFAULT_STREAM_LIMIT`; and the members
`SinkInterface.write`, `LoggerManagerInterface.register` / `.logger` / `.loggers` / `.remove`,
`RetentionInterface.add` / `.records`, `CaptureInterface.messages`,
`ProcessCaptureInterface.messages`, `ProgressInterface.update`.

`LoggerManagerInterface.register`, `.logger`, `.loggers`, and `.remove` carried no doc comment at
all — the first `npm run docs` reported each as `guide absent source absent`. Each gained a
description; `remove`'s sits on its first overload, which is the signature `collectMembers` reads.

**Ruling 7 splits — reference material moved to `@remarks`, every sentence kept.** `class Progress`,
`class Spinner`, `class ANSIRenderer`, `const ATTRIBUTE_CSS`, `const BORDER_CHARS`,
`const DEFAULT_BAR_WIDTH`, `const DEFAULT_CAPTURE_LIMIT`, `const DEFAULT_STREAM_LIMIT`,
`const DEFAULT_THEME`, `interface StreamTargetInterface`, `interface ServerSinkInterface`,
`interface ProcessCaptureInterface`, `interface StyleAccumulator`, `interface BorderChars`,
`type Alignment`, `type BorderStyle`, `type CaptureLevel`, `function createServerSink`,
`function createBrowserSink`, `function createStyler`, `function scanParameters`,
`function renderBar`, `function renderTreeChildren`, `function inferStyled`, `SinkInterface.write`.
The longest surviving cell is `class ProcessCapture` at 410 characters, inside the range the
accepted `guide` package's own converged cells occupy (`/home/user/fleet/guide/guides/guide.md:210`
is 477). A remark sentence the description now repeats was pruned in `ConsoleErrorCode`,
`StylerOptions`, `LoggerManagerOptions`, and `ThemeOptions`.

**Seed defect met — the `{@link import('…')}` form.** The P16 comparator renders a `{@link}` as its
target's code token, so a block written `{@link import('./types.js').Style}` produced this cell
text, from the first `npm run docs`:

```text
guides/console.md function createStyler: guide "The fluent `StylerInterface` factory — ANSI by default; a `renderer` retargets it and `enabled: false` disables color." source "Creates the fluent, composable `StylerInterface` — the consumer-facing styling API. It builds a `import('./types.js').Style` under the hood and renders it through a `import('./types.js').RendererInterface` (the ANSI default), so `styler.red.bold('hi')` yields styled text. …"
```

The reader behaves as the brief describes; the defect is this package's link form, which resolves
in an editor only through the `import()` path because the named symbol is not imported into the
file. 66 such tags inside description paragraphs were rewritten to a plain code span (`` `Style` ``),
which the comparator normalizes identically and which leaves no unresolvable `{@link}` behind. The
39 remaining tags sit in `@remarks` and `@param`, which the comparison never reads, and were left
alone. No further reader or seed defect was met: `replaceCell` rewrote every located cell, and
`--to guide` reported no row it could not reach.

**The propagation.** `npm run docs -- --to guide` →
`rows read: 1, disagreements found: 207, written: 206, reported: 1` (the one report is the titled
fence, which `--to guide` correctly declines: `the guide fence owns an example`). Then
`npx oxfmt --config .oxfmtrc.json --write guides/console.md`, then `npm run docs` →
`rows read: 1, disagreements found: 1`. A second `--to guide` after the count corrections read
`disagreements found: 6, written: 5, reported: 1`, and a third after the `ProgressInterface.update`
correction read `written: 1`.

**Non-`Summary` cells against the baseline** (`git show HEAD:guides/console.md`, compared
positionally so the duplicated `messages` row key cannot alias):

```text
rows compared: 230, rows after: 230, non-final cells mismatched: 0
```

No non-`Summary` cell moved. No table row was rebuilt by hand, so the escaped-pipe hazard did not
arise; the `\|` split rule was applied in the comparator itself.

## Criterion 4 — the titled pair

The pair is `createServerSink`'s `@example` block in `src/server/factories.ts` and the
`### The server — a TTY sink and a process capture` fence in `guides/console.md`. `createServerSink`
is the first `create*` the facts block lists, and that fence is the one demonstrating it.

Heading uniqueness, heading-scoped:

```text
$ grep -n '^#\+ The server — a TTY sink and a process capture' guides/console.md
617:### The server — a TTY sink and a process capture
```

The heading is already worded as the demonstration it shows, sits at `###` under `## Patterns`, and
is not structural, so Ruling 9's deeper heading was not needed and no fence moved.

Fence body read before titling: no three-backtick run and no `*/` inside it (the section between
the heading and the next `###` contains exactly the fence's own opening and closing delimiters).
The block was titled first — `grep -rn "@example \S" src/` then returned exactly
`src/server/factories.ts:37: * @example The server — a TTY sink and a process capture`, and no other
block carries a title.

`--to source` ran last, after `npm run docs` read `disagreements found: 0` over the summaries:

```text
$ npm run docs -- --to source
wrote src/server/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

The titled example alone was written, as the brief's csv precedent requires.

## Criterion 5 — the tagline, the opening prose, the README

The blockquote, identical in both files with the same line breaks, one noun phrase in plain text
and code spans, no link and no bold:

```text
> A unified output-control system for a terminal, a browser, and a server: a style engine over
> frozen `Style` data, structured logging whose record and `entry` event are the transport seam,
> narrative reporting, console and stream capture, and live animations — one engine, environment
> sinks, with the platform backend swapped at the `Sink` seam.
```

**The guide's opening prose** (new, between the blockquote and `## Surface`) carries the displaced
sentences without restating the tagline's clauses: the core/environment split with each backend
named (`ANSIRenderer` with `createConsoleSink`, `createBrowserSink`, `createServerSink` and its
color-detection precedence); the entity roll-call (`Logger`, `Reporter`, `Capture`,
`ProcessCapture`, `Spinner`, `Progress`); the transport sentence ("A record reaches a file, JSON, or
a remote transport off the `entry` and `capture` events rather than off a second code path"); and
the whole `\r` animation-degrade paragraph with the `Source:` links, moved down verbatim in
substance. The style-as-data clause and the `Sink`-seam clause were not repeated, because the
tagline carries them.

**The README's opening paragraph** was replaced by the onboarding it alone carries and nothing the
tagline states:

```text
Install the package, build a `Logger` or a `Reporter`, and swap its `sink` to move the same code
between a terminal, a browser, and a server. Part of the `@orkestrel` line, built to sit beside
`@orkestrel/emitter` (observable lifecycle), reusing it as it takes shape.
```

Nothing else in the README moved. The pitch pair closed at the first `npm run docs` after the edit
(`disagreements found: 206`, the pitch row gone).

**Voice sweep over prose I own.** All-caps emphasis removed from `guides/console.md` throughout —
the section intros (`DATA`, `ARE`, `LAYOUT`, `READ`, `PRODUCERS`, `OVERWRITE`, `OUTPUT`, `RAW`,
`DETECTION`), the `## Methods` intro (`CALLABLE`, `VALUE`), every `## Contract` item (`ONCE`,
`PRESENT`, `SAME`, `SINK`, `THRESHOLD`, `STYLING`, `ONE`, `THAT`, `SNAPSHOTS`, `AFTERWARD`,
`BEFORE`, `WRITE`, `OWN`, `AND`, `ALWAYS`, `EXACT`, `LONE`, `VISIBLE`, `WHOLE`, `TOTAL`,
`PROCESS-GLOBAL`, `NON-REENTRANT`, `NOT`), the `DOC ↔ SOURCE` bijection headings (now sentence
case), the § Tests entry for `LoggerManager`, and the fence comments (`SAME`, `ALL`, `AND`, `NOT`,
`BEFORE`, `THIS`, `WRITE`). Every all-caps token left in the file is an identifier, an acronym, or
an exported constant name (`ANSI`, `SGR`, `TTY`, `CSS`, `ESC`, `CSI`, `OSC`, `DCS`, `APC`, `SOS`,
`DEL`, `BEL`, `RIS`, `CJK`, `CRLF`, `POSIX`, `UTF`, `ISO`, `ECMA`, `ASCII`, `API`, `JSON`, `GET`,
`WARN`, `INFO`, `INVARIANT`, `RESET`, `COLORS`, `ATTRIBUTES`, `DIRECTIVE`, `README`, `AGENTS`).
`README.md` carries none (`ANSI`, `CJS`, `ESM`, `GET`, `JSON`, `LICENSE`, `MIT` only).

Counts in prose corrected: `the three write targets` → the members named (`WriterSet`), `the two
process streams` → the members named (`STREAM_LEVELS`), `the four line weights` → `each line
weight` (`BORDER_CHARS`), `the ten braille-pattern glyphs` → the glyphs shown (`SPINNER_FRAMES`),
`the two environment backends` → the backends named, `both captures` → `the console capture and the
process capture` (twice: `Retention`'s doc block and the § Tests entry), `Both are universal` → `A
Spinner and a Progress are both universal`, `a backend folding two levels onto one target` → `several
levels`, and `reporter.blank(3) — three` → `reporter.blank(3) writes a run of 3`. `the 8 base
colors` / `the 16 standard terminal colors` were kept: the ANSI palette is a closed external
standard nobody can add to, so those numbers are values rather than counts.

One substitution-table hit was corrected in a compared description: `Ignored once terminal`
(temporal `once`) on `ProgressInterface.update` → `Ignored after a terminal succeed or fail`. Every
remaining `once` in the guide reads as the permitted "a single time" or the idiom "at once"; the
only `new` outside a `new Entity()` expression is `a new styler`, the adjective sense.

No rewritten sentence borrows a sibling export's name as its product noun; `class ANSIRenderer`'s
description lost the cross-package `Scheduler` precedent to `@remarks` for exactly that reason.

## Criterion 6 — the seed

```text
$ npm run docs
rows read: 1, disagreements found: 0
exit 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

| Command | Reading |
| --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check guides/console.md README.md tests/guides.test.ts src/` | `All matched files use the correct format.` over 30 files, exit 0 |
| `npx oxlint --config .oxlintrc.json --deny-warnings guides/console.md README.md tests/guides.test.ts src/` | no output, exit 0 |
| `npm run check` | every `tsc --noEmit` project clean, exit 0 |
| `npm run test:guides` | `Test Files 1 passed (1)`, `Tests 94 passed (94)` |
| `npm run test:policy` | `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)` |
| `npm run test:src:core` (observation) | `Test Files 11 passed (11)`, `Tests 451 passed (451)` |

## Criterion 8 — status

```text
 M README.md
 M guides/console.md
 M src/browser/constants.ts
 M src/browser/factories.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/Progress.ts
 M src/core/Retention.ts
 M src/core/Spinner.ts
 M src/core/Styler.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/renderers/ANSIRenderer.ts
 M src/core/types.ts
 M src/server/constants.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M src/server/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`,
`tests/src/**`, and every vendored file are untouched.

Diffstat:

```text
 README.md            |  16 +-
 guides/console.md    | 621 ++++++++++++++++++++++++-------------------
 tests/guides.test.ts |  84 ++++++-
 src/** (19 files)    | 391 insertions(+), 270 deletions(-)
 22 files changed, 798 insertions(+), 584 deletions(-)
```

`git diff -U0 -- src/` filtered to lines outside a `/**`, ` *`, or ` */` prefix returns nothing: no
code token moved, only doc blocks.

## Ancillary decisions

- **`CONSOLE_GUIDE` renamed `GUIDE_SPEC`.** The brief names a `GUIDE_SPEC` constant for the spec
  path; this file already carried `CONSOLE_GUIDE` holding the same string for the flagship-fence
  block. Two constants for one path is the drift the naming law forbids, so the existing one was
  renamed and all three consumers (the pin, the README case, the flagship block) use it.
- **Two transcription guards updated.** `carries the server fence lines the transcription copies`
  and `carries the capture fence lines the transcription copies` assert fence comments verbatim, and
  the all-caps sweep changed two of them. Per `.claude/rules/tests.md` ("Change a fence, change the
  transcription beside it") the two substrings were updated in `tests/guides.test.ts`
  (`captured AND still shown` → `captured and still shown`; `does NOT stop interception` →
  `interception is unaffected`). No test outside `tests/guides.test.ts` went red at any point.
- **The `{@link}` rewrite is confined to description paragraphs.** A `@remarks` or `@param` tag the
  comparison never reads keeps its `import()` link, so the editor navigation there is unchanged.
- **`### Logging & reporting constants` kept its ampersand.** The substitution table carries no row
  for `&`, and renaming a heading risks the fence-title pairing for no rule.

## Observations, not criteria

- **Temporal `once` and causal `since` remain in `src/**` `@remarks` blocks** — `src/core/Progress.ts:33`
  (`ignored once \`active\` is false`), `src/core/helpers.ts:362`, `:625`, `:703`,
  `src/core/types.ts:604`, `:1005`. All sit outside the compared description paragraphs and outside
  this unit's named sweep (`guides/console.md` and `README.md`), and `oxlint --deny-warnings` over
  `src/` is clean, because `writing.md` records `once` and `since` as rows the rule leaves unmatched.
  Carried as a finding for whoever owns the source-comment sweep.
- **The timing-free suites above are this unit's own readings** inside its exec. The authoritative
  whole-chain run belongs to the independent `verifier`.

## Deviation state

No deviation. Every stop condition the brief names was checked and none fired: the seed located
every cell after the header rename (only the pitch was reported, and it closed on the tagline edit);
the titled body fit its block with no `*/` or three-backtick collision; no test outside
`tests/guides.test.ts` went red; no vendored file needed an edit; the readers returned the shapes
the brief describes; and no residual disagreement survived a doc-block rewrite under the P16
comparator.

---

**Orchestrator annotation (audit, 2026-09-07):** the audit read counts in this report's prose and in the prep report (the slice-6 lanes cite the lines). The tree is authoritative; the reports stand annotated.
