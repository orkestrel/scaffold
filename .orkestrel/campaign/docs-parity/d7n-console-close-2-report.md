# Report — `d7n-console-close-2`

## Item 1 — Ruling 26, function/guard `Shape` cells

Filled every empty `Shape` cell for a `function` row across the `### Styling`, `### Logging`,
`### Reporting`, `### Capture`, `### Errors`, `### Browser sink`, and `### Server sink + process
capture` tables with the declaration's signature as a type literal, read from `src/core/helpers.ts`,
`src/core/factories.ts`, `src/browser/helpers.ts`, `src/browser/factories.ts`, and
`src/server/helpers.ts`. Each guard row (`isConsoleError`, `isStreamTarget`, `isBufferEncoding`)
holds the type it narrows to, read from its `value is X` return type. Added the convention sentence
"A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to." to
every table carrying such a row.

```diff
-| `selectWriter`           | function  |                                                                                    | Selects the member of a `WriterSet` ...
+| `selectWriter`           | function  | `<T>(level: LogLevel \| undefined, writers: WriterSet<T>) => T`                    | Selects the member of a `WriterSet` ...
...
-| `isConsoleError`   | function |               | Narrows an unknown caught value to a `ConsoleError` — the guard a `catch` branches on.
+| `isConsoleError`   | function | `ConsoleError`                                                                                               | Narrows an unknown caught value to a `ConsoleError` — the guard a `catch` branches on.
...
-| `isStreamTarget`          | function  |                                                                  | Checks whether `value` is a usable `StreamTargetInterface` ...
+| `isStreamTarget`          | function  | `StreamTargetInterface`                                                                        | Checks whether `value` is a usable `StreamTargetInterface` ...
```

`createCaptureResult` is overloaded (a sync overload, an async overload, and the implementation
signature); its `Shape` cell holds the implementation signature's own type literal,
`` <T>(fn: () => T \| Promise<T>, options?: CaptureOptions) => CaptureResult<T> \| Promise<CaptureResult<T>> ``,
which is the one call signature that covers both public overloads without inventing a union form no
row elsewhere in the fleet has a precedent for.

## Item 2 — Ruling 28, class `Shape` cells

Filled every empty `Shape` cell for a `class` row (`ANSIRenderer`, `Logger`, `LoggerManager`,
`Reporter`, `Retention`, `Capture`, `ConsoleError`, `Spinner`, `Progress`, `ProcessCapture`) with the
interface it implements, read from each class's own `implements` clause:

- `ANSIRenderer implements RendererInterface` → `` `RendererInterface` ``
- `Logger implements LoggerInterface` → `` `LoggerInterface` ``
- `LoggerManager implements LoggerManagerInterface` → `` `LoggerManagerInterface` ``
- `Reporter implements ReporterInterface` → `` `ReporterInterface` ``
- `Retention<T> implements RetentionInterface<T>` → `` `RetentionInterface` `` (generic annotation
  dropped, matching how the interface's own Surface row and `normalizeIdentifier`'s bare-name
  convention read it elsewhere)
- `Capture implements CaptureInterface` → `` `CaptureInterface` ``
- `Spinner implements SpinnerInterface` → `` `SpinnerInterface` ``
- `Progress implements ProgressInterface` → `` `ProgressInterface` ``
- `ProcessCapture implements ProcessCaptureInterface` → `` `ProcessCaptureInterface` ``

`ConsoleError extends Error` and implements no package interface, so its cell holds its constructor
signature as a type literal, read from `src/core/errors.ts`:
`` new (code: ConsoleErrorCode, message: string, context?: Readonly<Record<string, unknown>>) => ConsoleError ``.

Added the convention sentence "A class row's `Shape` cell holds the interface it implements, or its
constructor signature where it implements none." to every table carrying such a row (`### Styling`,
`### Logging`, `### Reporting`, `### Capture`, `### Errors`, `### Animations`, `### Server sink +
process capture`).

```diff
-| `ANSIRenderer`      | class     |                                                                                                                                                                                                                                                      | Implements the cross-environment default `RendererInterface` ...
+| `ANSIRenderer`      | class     | `RendererInterface`                                                                                                                                                                                                                                  | Implements the cross-environment default `RendererInterface` ...
...
-| `ConsoleError`     | class    |               | Carries a `ConsoleErrorCode` and an optional `context` bag ...
+| `ConsoleError`     | class    | `new (code: ConsoleErrorCode, message: string, context?: Readonly<Record<string, unknown>>) => ConsoleError` | Carries a `ConsoleErrorCode` and an optional `context` bag ...
```

`### Browser sink` carries only function rows, so it takes only item 1's sentence.
`### Animations` carries only class rows, so it takes only item 2's sentence.

## Item 3 — Ruling 19, event-map `Shape` cells

Rewrote the five tuple-payload event-map `Shape` cells to Ruling 12's bare member-name form, leaving
the payload types in each declaration:

```diff
-| `LoggerEventMap`         | type      | `{ entry: [record: LogRecord] }`                                                   | ...
+| `LoggerEventMap`         | type      | `{ entry }`                                                                        | ...
-| `CaptureEventMap`     | type      | `{ capture: [message: CapturedMessage]; start: []; stop: [] }`   | ...
+| `CaptureEventMap`     | type      | `{ capture, start, stop }`                                                                                  | ...
-| `SpinnerEventMap`   | type      | `{ frame: [line: string]; start: []; stop: [] }`                                      | ...
+| `SpinnerEventMap`   | type      | `{ frame, start, stop }`                                                              | ...
-| `ProgressEventMap`  | type      | `{ update: [progress: ProgressReport]; succeed: [] }`                                 | ...
+| `ProgressEventMap`  | type      | `{ update, succeed }`                                                                 | ...
-| `ProcessCaptureEventMap`  | type      | `{ capture: [chunk: CapturedChunk]; start: []; stop: [] }`       | ...
+| `ProcessCaptureEventMap`  | type      | `{ capture, start, stop }`                                                                                       | ...
```

## Acceptance criteria

1. `git status --short` → `M guides/console.md` (only the owned file; `tests/guides.test.ts` needed
   no change because it already matched the pilot byte for byte on lines 1-3).
2. `grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/console.md` → no output (exit
   1, meaning no match). The fence sweep
   `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/console.md`
   → no output. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)`
   → no output.
3. `npx oxfmt --config .oxfmtrc.json --check guides/console.md tests/guides.test.ts` →
   `All matched files use the correct format.` exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, no output.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` → `rows read: 1, disagreements found: 0`.
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` →
   `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `PATH=/opt/npm11/bin:$PATH npm run docs -- --to source` →
   `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` →
   `Test Files  1 passed (1)`, `Tests  94 passed (94)`, `Duration  820ms`, exit 0.

## Files changed

- `guides/console.md` — filled every empty `function`/`class`/guard `Shape` cell per Rulings 26 and
  28, added the two convention sentences to each affected table, and rewrote the five tuple-payload
  event-map `Shape` cells per Ruling 19. No `Summary` cell was moved by hand; `npx oxfmt --write`
  realigned table column widths after the cell edits.
- `tests/guides.test.ts` — unchanged (already canonical against the pilot).

No deviation.

---

Orchestrator's annotation (2026-09-08, closure): the checker ruled claim 2 FAIL on this report's prose alone (a count stated about a growable set, and for form a citation line a few lines off its declaration); every item and every substantive citation was verified against the diff and the tree, and the tree is authoritative.
