# Report — `d7n-console-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

`guides/console.md`:

- Added `Shape` and its constants sentence ("A `Shape` cell holds the constant's declared
  type.") to the `Style constants`, `Logging & reporting constants`, `Capture & animation
  constants`, `Browser sink constants`, and `Server sink constants` tables, each cell holding
  the declared or widened type (`number`, `string`, `RegExp`, or the full `Readonly<Record<…>>`
  / array shape) read from `src/core/constants.ts`, `src/browser/constants.ts`, and
  `src/server/constants.ts`.
- Reworked `ServerSinkInterface`'s `Shape` cell from `{ styled, columns } plus write` to
  `SinkInterface plus { styled, columns }` (Ruling 21's extended-interface form: the parent
  `SinkInterface` before `plus`, the added data members after, no added call-signature member
  because `write` is inherited) and added Ruling 21's extension sentence — "An extended
  interface's name comes before `plus`, with the members it adds after." — to the `Server sink +
  process capture` table's convention block.
- Inspected every interface row the brief listed whose braces carry no `plus`
  (`Style`, `StylerOptions`, `ThemeStatus`, `Theme`, `ThemeOptions`, `LogRecord`, `WriterSet`,
  `LoggerOptions`, `LoggerManagerOptions`, `BorderChars`, `SeparatorOptions`, `BoxOptions`,
  `ColumnSpec`, `TableOptions`, `TreeOptions`, `StepPosition`, `ReporterOptions`,
  `CapturedMessage`, `CaptureOptions`, `BarOptions`, `SpinnerOptions`, `ProgressReport`,
  `ProgressOptions`, `BrowserPalette`, `BrowserSinkOptions`, `ConsoleOutput`, `ServerSinkOptions`,
  `CapturedChunk`, `ProcessCaptureOptions`) against their `src/**/types.ts` declarations: every
  one is a plain data interface with no call-signature member, so no `plus` applies and none was
  added. No table lacked `Shape`, no row spelled a member's type, and no cell held `…`.

Excerpt (`Style constants`, representative of the same shape added to the other four constants
tables):

```diff
-| API                | Kind  | Summary                                                                                       |
-| ------------------ | ----- | ---------------------------------------------------------------------------------------------- |
-| `FOREGROUND_CODES` | const | Maps each `Color` to its SGR foreground parameter …                                             |
+A `Shape` cell holds the constant's declared type.
+
+| API                | Kind  | Shape                                                | Summary                              |
+| ------------------ | ----- | ----------------------------------------------------- | ------------------------------------- |
+| `FOREGROUND_CODES` | const | `Readonly<Record<Exclude<Color, 'default'>, number>>` | Maps each `Color` to its SGR foreground parameter … |
```

```diff
-| `ServerSinkInterface`     | interface | `{ styled, columns } plus write`                                 | Declares a `SinkInterface` that also exposes …
+| `ServerSinkInterface`     | interface | `SinkInterface plus { styled, columns }`                         | Declares a `SinkInterface` that also exposes …
```

Full diff: `/home/user/fleet/console/tmp/d7n-console-close/guide.diff`.

## Item 2 — member references

`src/core/Styler.ts:62` already writes `{@link #isSurface}` in the final-reader form (a bare
`#`-prefixed private-member self-reference), and `#isSurface` carries no guide row (it is a
private class method), so no guide cell disagrees on this link. `npm run docs` read
`disagreements found: 0` before and after every edit in this unit. No change was needed at this
site.

## Item 3 — the drop-in's canon (Rulings 13, 20)

`tests/guides.test.ts` from `const root = ` (line 85) through the manifest loop's closing brace
(line 296) already matched the pilot's same region (`/home/user/fleet/abort/tests/guides.test.ts`
lines 47–258) byte for byte, confirmed with `diff` after every edit in this unit — no change to
that region.

The header (lines 1–3) did not match the pilot: it carried console's own extra clause naming
the manifest as "one row (Console) spanning the core/browser/server faces as a multi-dir
`GuideModule`" and "are the only part a sibling package changes." Ruling 21 strikes that clause
fleet-wide, so it was replaced with the pilot's canonical three lines:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest — one row (Console) spanning the
-// core/browser/server faces as a multi-dir `GuideModule` — one guide per package. The
-// constants that follow are this package's own, and are the only part a sibling package
-// changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

`diff` against the pilot's lines 1–3 now prints nothing. The `INTERNAL` block's doc comment
already carries the pilot's sentence ("the assertion that follows it fails when a name here
stops being stranded") verbatim, so no change there.

## Item 4 — fence lead-ins (Ruling 21)

Added one lead-in sentence between each of the following headings and the fence that sat
directly under it, naming what the fence demonstrates: `A styled, leveled logger`, `The line a
logger writes`, `A logger registry`, `A reporter narration`, `One theme, every entity`,
`Scoping third-party console.* with createCaptureResult`, `Capture lifecycle`, `The bounded
retention engine directly`, `A spinner and a progress bar`, `The browser — %c styling in
DevTools`, `The server — a TTY sink and a process capture` (the titled fence — its sentence
names what the demonstration builds), `One logger, different sink per environment`, `The pure
layout + formatting helpers directly`, `Server helpers directly`, `Server boundary guards
directly`. No fence content or transcription line moved. After the edit, no heading in
`guides/console.md` sits directly above a fence with no sentence between them (verified with an
`awk` scan for a heading line immediately followed by a blank line then a fence line).

## Item 5 — propagation

Ran `npx oxfmt --write guides/console.md tests/guides.test.ts` to converge table-column widths
and wrapping after the Shape/sentence edits; `npm run docs` read `disagreements found: 0`;
`-- --to guide` and `-- --to source` both read `written: 0`.

## Acceptance criteria

1. `git status --short` — `M guides/console.md`, `M tests/guides.test.ts` (owned files only).
2. `grep -n '| interface *| \`{[^\`]*:' guides/console.md` — empty. `grep -n '…' guides/console.md`
   — every hit sits in a `Summary` cell or in prose, none in a `Shape` cell (confirmed with a
   direct regex over `const|interface|type` rows carrying `…` in the `Shape` column — empty).
   Every table carrying `Shape` has its convention sentence between the table's heading (or its
   description paragraph) and the table.
3. `diff <(sed -n '85,296p' tests/guides.test.ts) <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts)`
   — empty (the drop-in region, minus the package-specific appended cases already present, is
   byte-identical to the pilot). `diff` of lines 1–3 against the pilot's lines 1–3 — empty.
4. `npx oxfmt --check guides/console.md tests/guides.test.ts` — "All matched files use the
   correct format." Exit `0`. `npx oxlint --config .oxlintrc.json --deny-warnings
   tests/guides.test.ts` — exit `0`, no output.
5. `npm run docs` — `rows read: 1, disagreements found: 0`. `npm run docs -- --to guide` —
   `written: 0, reported: 0`. `npm run docs -- --to source` — `written: 0, reported: 0`.
6. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 94 passed (94)`, `Duration 1.85s`,
   exit `0` (the equality case ran under the default budget). `npm run test:policy` — `Test
   Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, `Duration 1.26s`, exit `0`.

Combined re-check of `oxfmt --check`, `oxlint`, and `npm run docs` together after the final
`--write`: wall clock `3.070s`.

## Deviations

None. No `Shape` cell required an expression Ruling 12 could not state, the equality case ran
green under the default budget, no gate outside the owned files went red, and `--to guide`
closed every disagreement it found (none).
