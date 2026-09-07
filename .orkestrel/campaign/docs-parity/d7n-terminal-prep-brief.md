# Brief — P.1 `d7n-terminal-prep` (terminal's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/terminal` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9078298`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

terminal's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== terminal 2026-09-07T16:42:50Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
95:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 862ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### terminal (9078298, version 0.0.14, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 33 unchanged, 0 removed in ..
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
   tests/setup.ts(17)
   tests/setupServer.ts(5)
   src/server/helpers.ts(4)
   src/core/types.ts(2)
   src/server/Terminal.ts(1)
   src/core/TerminalManager.ts(1)
   src/core/PromptClient.ts(1)
-- docs
   guides/terminal.md interface TerminalOptions: guide "`createTerminal` options — `input` / `output` / `theme`, all optional; a bare `createTerminal()` drives the real process streams. `output` is console's own `StreamTargetInterface`." source "Configures `import('./factories.js').createTerminal` — every member optional, so a bare `createTerminal()` walks a form over the real `process.stdin` / `process.stdout` with the default theme."
   guides/terminal.md interface InputStreamInterface: guide "The minimal input stream the driver reads — required `on` / `off`, optional `setRawMode` / `resume` / `pause` / `isTTY`." source "Represents the minimal input-stream shape the driver reads — exactly the slice of a Node `tty.ReadStream` / `process.stdin` it touches, and no more. A `TerminalOptions` `input` is narrowed to this through `import('./helpers.js').isInputStream`, never an assertion, so a test drives a whole form with a hand-built fake stream that emits scripted key chunks, never touches the real `process.stdin`, and asserts that raw mode is entered once and always cleaned up."
   guides/terminal.md function isInputStream: guide "Whether a value is a usable `InputStreamInterface` (callable `on` / `off`) — the input boundary guard, total." source "Checks whether `value` is a usable `InputStreamInterface` — a record with callable `on` / `off` `'data'` subscription methods. A total type guard: it NEVER throws and returns `false` for anything off-shape, so it narrows the one unavoidable input boundary (the real `process.stdin`, or a fake TTY a test injects) to the exact slice the driver reads — no `as`."
   guides/terminal.md function isReadable: guide "Whether a value is a Node readable stream (callable `read` / `pipe` / `on`) — narrows the input to the `node:readline` boundary." source "Checks whether `value` is a Node `NodeJS.ReadableStream` — a total structural guard checking for the callable `read` / `pipe` / `on` that `node:readline`'s `createInterface` requires as its `input`. The non-TTY fallback narrows the resolved input stream through this before handing it to readline (never an `as`), so a real piped `process.stdin` (or a `PassThrough` a test injects) crosses into the readline boundary honestly. Never throws; returns `false` for a minimal fake that isn't a full readable."
   guides/terminal.md function supportsRawMode: guide "Whether an input can be driven in RAW mode (`isTTY === true` AND a callable `setRawMode`) — selects raw mode over the readline fallback." source "Checks whether an input stream can be driven in RAW mode — it both reports `isTTY === true` AND exposes a callable `setRawMode`. The `import('./Terminal.js').Terminal` probes this to choose its path: `true` ⇒ the interactive raw-mode prompts (arrow-key navigation, live re-render); `false` ⇒ the `node:readline` line-input fallback (a piped / non-terminal stream cannot enter raw mode). Total — never throws."
   guides/terminal.md function lineCount: guide "How many terminal LINES a rendered view occupies — one more than its newline count. The basis of the in-place re-render." source "Counts the terminal LINES a rendered prompt `view` occupies — one more than its newline count (a view with no newline is a single line; N newlines span N+1 lines). The basis of the in-place re-render: the driver records the line count of the view it just wrote so the next redraw knows how far up to move the cursor before overwriting. Total; an empty string is one (empty) line."
   guides/terminal.md function renderCursorUp: guide "The cursor-UP sequence (`ESC[{count}A`), or `''` when `count <= 0`." source "Returns the cursor-UP control sequence that moves the cursor up `count` lines (`ESC[{count}A`) — or the empty string when `count` is zero or negative (no movement needed, and `ESC[0A` is a wasted write). The pure step the in-place re-render uses to climb back over the previous view before clearing it. Total."
   guides/terminal.md function redrawPrefix: guide "The reposition-and-clear prefix written before re-rendering in place — climb, return to column 0, erase to end of screen." source "Returns the full reposition-and-clear prefix to write BEFORE re-rendering a prompt view in place — given the line count of the PREVIOUS view, it moves the cursor up over those lines, returns it to column 0, and erases everything from there to the end of the screen, so the next view is drawn on a clean region (no orphaned rows from a taller previous view). Pure; the driver writes this immediately followed by the new view."
   guides/terminal.md function fieldToText: guide "Any field read as one LINE — `text` and the controls a terminal has no widget for — projected into the `TextField` the text reducer takes." source "Projects any field the walk reads as a LINE OF TEXT into the `TextField` the text reducer takes — `text` itself, and the controls a terminal has no widget for: `number`, `date`, `time`, `datetime`, `color`, and one `file` entry. The label carries that control's format cue from `CONTROL_HINTS`, and a declared `default` becomes the line a bare return submits. The projection carries no rule, because the AUTHORITATIVE form still evaluates the answer this line binds; it exists only so one reducer covers every one of them."
   guides/terminal.md function valueToText: guide "One held answer projected into read-only text — a scalar as itself, a boolean as `yes` / `no`, a list joined by commas, absence as nothing." source "Projects one held answer into the text a read-only line shows — a scalar as itself, a boolean as `yes` / `no` (the word the confirm reducer commits), and a list joined by commas. Absence renders as nothing, because a locked field nobody has answered has nothing to show."
   guides/terminal.md function filterEnabled: guide "The choices a field actually OFFERS — the form refuses a disabled choice at every door, so the walk never puts one in front of the cursor." source "Returns the choices a `select` or `checkbox` field actually OFFERS — the form refuses a disabled choice's value at every door, including a fill, so the walk never puts one in front of the cursor. Pair with `filterDisabled` to tell the reader what was withheld."
   guides/terminal.md function filterDisabled: guide "The choices a field SHOWS but refuses — the complement, so a withheld choice is named rather than silently missing." source "Returns the choices a `select` or `checkbox` field SHOWS but refuses — the complement of `filterEnabled`, rendered by `renderUnavailableLine` above the list so a reader sees why a declared choice is missing from it."
   guides/terminal.md function renderGroupHeader: guide "The section header the walk writes when it enters a new field group." source "Renders the section header the walk writes when it enters a new field group, painted by the `message` role."
   guides/terminal.md function renderLockedLine: guide "The read-only line a LOCKED field renders — its label, the locked mark, and the answer the form already holds." source "Renders the read-only line a LOCKED field shows — its label, the `LOCKED_MARK`, and the answer the form already holds. The walk writes this instead of a prompt, because the field is still validated and still submitted but must not be edited here."
   guides/terminal.md function renderSuggestionLine: guide "The line listing an OPEN select's offered values above its text prompt, because an open select admits an answer the list does not offer." source "Renders the line listing an OPEN select's offered values above its text prompt — a suggestion list, because an open select admits an answer the list does not offer."
   guides/terminal.md function renderUnavailableLine: guide "The line naming the choices a field shows but refuses, written above the list the walk drives." source "Renders the line naming the choices a field shows but refuses, written above the list the walk drives."
   guides/terminal.md function renderNumberedList: guide "The numbered choice list the non-TTY fallback prints, since a piped stream cannot navigate with arrow keys." source "Renders the numbered choice list the non-TTY fallback prints — a piped stream cannot navigate with arrow keys, so each offered choice is printed with the number the reader types back. One line per choice, with no trailing newline."
   guides/terminal.md const CSI_UP: guide "The cursor-UP TEMPLATE (`ESC[{count}A`), built from console's own `CSI` — `renderCursorUp` interpolates `{count}`." source "Holds the cursor-UP sequence TEMPLATE (`ESC[{count}A`) — `import('./helpers.js').renderCursorUp` interpolates the `{count}` placeholder with the number of lines to climb. Kept as a template so the count stays out of the constant."
   guides/terminal.md const CURSOR_HIDE: guide "The cursor-hide sequence — written before a redraw so the cursor does not flicker; paired with `CURSOR_SHOW`." source "Hides the cursor (`ESC[?25l`) — written before the driver starts redrawing a prompt so the cursor does not flicker across the view during an in-place re-render; paired with `CURSOR_SHOW`."
   guides/terminal.md const CURSOR_SHOW: guide "The cursor-show sequence — restored when a field settles or the walk ends." source "Shows the cursor (`ESC[?25h`) — restores the cursor after a prompt resolves / cancels (the `CURSOR_HIDE` pair)."
   guides/terminal.md const CLEAR_DOWN: guide "The erase-to-end-of-screen sequence — wipes a whole multi-line view before the new one." source "Erases from the cursor down to the end of the screen (`ESC[J`) — wipes the WHOLE previous (possibly multi-line `select` / `checkbox`) view in one write before the new view is rendered, so a redraw never leaves orphaned rows below."
   guides/terminal.md const CONTROL_HINTS: guide "The format cue `fieldToText` appends per control — the `(YYYY-MM-DD)` on a date label, and its siblings." source "Holds the format cue appended to a field's label for each control the walk reads as a line of text — the terminal has no date picker, no color well, and no file chooser, so the accepted shape is stated instead. A control with no entry needs none: `text` and `editor` accept any line, `password` masks one, and `confirm`, `select`, and `checkbox` are answered by key rather than by format. The form's own rules still decide whether the typed value is acceptable."
   guides/terminal.md const FILE_HINT: guide "The instruction shown above a multiple-file list — one path per line, blank to finish." source "Holds the instruction a `file` field with `multiple` shows before its entries — one path per line, and a blank line ends the list."
   guides/terminal.md const SUGGESTION_LEAD: guide "The lead word on an open select's suggestion line." source "Holds the lead on the line listing an open `select`'s offered values, which a typed answer may ignore."
   guides/terminal.md const UNAVAILABLE_LEAD: guide "The lead word on the line naming refused choices." source "Holds the lead on the line listing the choices a `select` or `checkbox` shows but refuses, so a reader sees why one is missing from the list below."
   guides/terminal.md const LOCKED_MARK: guide "The mark a locked field's read-only line carries." source "Holds the mark on a locked field's line — the walk renders its value and moves on, because the form refuses an edit there."
   guides/terminal.md const REFUSAL_MESSAGE: guide "The invalidation message the driver writes when an answer is one the control cannot hold." source "States what a field is told when the walk read an answer the control cannot hold — a word typed into a `number`, an off-list value typed into an open `select` whose choice is refused. The value binds as absence and this message is invalidated onto the field, so the walk re-asks it with the reason on screen."
   guides/terminal.md const FALLBACK_SELECT_HINT: guide "The prompt the non-TTY select fallback reads its index on." source "Holds the numbered-list prompt the non-TTY `import('./Terminal.js').Terminal` `select` fallback appends — a piped (non-terminal) stream cannot navigate with arrow keys, so the choices are printed numbered and the user types one number on a single readline line."
   guides/terminal.md const FALLBACK_CHECKBOX_HINT: guide "The prompt the non-TTY checkbox fallback reads its comma-separated indices on." source "Holds the comma-separated multi-select hint the non-TTY `checkbox` fallback shows (the user types one or more numbers)."
   guides/terminal.md const FALLBACK_EDITOR_HINT: guide "The hint the non-TTY editor shows, since ctrl-d is a raw-mode key and end of input finishes here." source "Holds the hint the non-TTY `editor` fallback shows — a piped stream has no ctrl-d, so end of input finishes the block."
   guides/terminal.md const FALLBACK_CONFIRM_HINT: guide "The hint the non-TTY confirm shows, since it reads a typed line rather than a single key." source "Holds the hint the non-TTY `confirm` fallback shows — a piped stream sends a whole line, so the answer is typed rather than pressed."
   guides/terminal.md TerminalInterface.ask: guide absent source absent
   guides/terminal.md PromptInterface.park: guide absent source absent
   guides/terminal.md PromptInterface.pending: guide absent source absent
   guides/terminal.md PromptInterface.answer: guide absent source absent
   guides/terminal.md PromptInterface.stop: guide absent source absent
   guides/terminal.md PromptInterface.destroy: guide absent source absent
   guides/terminal.md PromptClientInterface.connect: guide absent source absent
   guides/terminal.md PromptClientInterface.disconnect: guide absent source absent
   guides/terminal.md PromptClientInterface.destroy: guide absent source absent
   guides/terminal.md TerminalManagerInterface.terminal: guide absent source absent
   guides/terminal.md TerminalManagerInterface.terminals: guide absent source absent
   guides/terminal.md TerminalManagerInterface.add: guide absent source absent
   guides/terminal.md TerminalManagerInterface.ask: guide absent source absent
   guides/terminal.md TerminalManagerInterface.pending: guide absent source absent
   guides/terminal.md TerminalManagerInterface.answer: guide absent source absent
   guides/terminal.md TerminalManagerInterface.open: guide absent source absent
   guides/terminal.md TerminalManagerInterface.save: guide absent source absent
   guides/terminal.md TerminalManagerInterface.remove: guide absent source absent
   guides/terminal.md TerminalManagerInterface.destroy: guide absent source absent
   guides/terminal.md TerminalStoreInterface.get: guide absent source absent
   guides/terminal.md TerminalStoreInterface.set: guide absent source absent
   guides/terminal.md TerminalStoreInterface.delete: guide absent source absent
   guides/terminal.md InputStreamInterface.on: guide absent source absent
   guides/terminal.md InputStreamInterface.off: guide absent source absent
   guides/terminal.md InputStreamInterface.setRawMode: guide absent source absent
   guides/terminal.md InputStreamInterface.resume: guide absent source absent
   guides/terminal.md InputStreamInterface.pause: guide absent source absent
   guides/terminal.md pitch: readme absent tagline "The terminal side of a form. `@orkestrel/form` owns the document — the schema, the controls, the rules, the values, and the settle-once `answer` promise — and this package declares none of it a second time. What terminal owns is everything form has no opinion about: a key decoder, a presentation theme, the pure per-field reducers, the headless broker that PARKS a live form until somebody elsewhere answers it, the SSE bridge that carries a parked form to a machine with a keyboard, and the manager that routes parked forms between named endpoints. One contract; the local TTY, the headless broker, and the SSE bridge. `src/core` declares one driving contract, `TerminalInterface`, with one method: `ask(form)` returns the settled `FormValues`. A form reaches a person over each of them. The server `Terminal` (`src/server`) IMPLEMENTS the contract against a real TTY — raw-mode stdin, live in-place re-render, a `node:readline` fallback when piped — and is the only impure part of the stack. The headless `Prompt` broker implements no terminal at all: it parks the live form, emits a wire-safe record, and drives that same form to settlement when an answer arrives. The `PromptClient` bridge receives a form parked elsewhere, rebuilds it locally, and drives it through a local `TerminalInterface`. `PromptFormInterface` and its per-control prompt methods are gone: a form is one question however many fields it holds, so the contract needs one method and this package holds no second form vocabulary."
   rows read: 1, disagreements found: 176
   exit 1
-- check
   tests/guides.test.ts(183,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(186,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(190,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(205,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(220,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 22 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  22 failed | 38 passed (60)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 68ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 31 | summary 23 | banned 8 | tests/setup.ts(17) tests/setupServer.ts(5) src/server/helpers.ts(4) src/core/types.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+548,	+     "message": "prose carries no banned term: currently (delete, or give the date)",	+     "path": "guides/terminal.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for terminal (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/terminal`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9078298`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 31 | summary 23 | banned 8 | tests/setup.ts(17) tests/setupServer.ts(5) src/server/helpers.ts(4) src/core/types.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept  | Spec                         | Source                                                   | Tests                                                                            |
    9:| -------- | ---------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
    10:| Terminal | [`terminal.md`](terminal.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |
    20:| Directory    | Guide                        |
    21:| ------------ | ---------------------------- |
    22:| `src/core`   | [`terminal.md`](terminal.md) |
    23:| `src/server` | [`terminal.md`](terminal.md) |
- Guide `guides/terminal.md`: 1096 lines. Headings:
    1:# Terminal
    22:## The blank line binds as absence
    55:## Surface
    101:### The driving contract
    111:### Key decoding
    123:### Presentation
    140:### The field reducers
    174:### Untrusted display
    185:### The headless broker
    208:### The wire seam
    221:### The SSE bridge
    240:### The terminal manager
    254:### The terminal store
    270:### The terminal error
    282:### The core constants
    316:### The server Terminal
    329:### The server helpers
    352:### The server constants
    375:## Methods
    388:#### `TerminalInterface`
    396:#### `PromptInterface`
    408:#### `PromptClientInterface`
    418:#### `TerminalManagerInterface`
    435:#### `TerminalStoreInterface`
    445:#### `InputStreamInterface`
    458:## Contract
    603:## Patterns
    605:### Ask one form at this keyboard
    640:### Park a form, answer it from elsewhere
    675:### Bridge a parked form to a keyboard elsewhere
    705:### Mount the broker on your own HTTP spine
    723:### Narrow what arrives from the wire
    748:### Sanitize a schema you did not author
    772:### Drive the field reducers directly
    851:### Re-theme what a walk draws
    898:### Route forms between named endpoints
    951:### Persist endpoint config
    972:### Drive the walk over injected streams
    1043:## Tests
    1086:## See also
- Table headers in `guides/terminal.md` (a header row is the row before a `| ---` row):
    105: | API                 | Kind      | Summary                                                                                                                                    |
    116: | API           | Kind      | Summary                                                                                                                                      |
    128: | API                  | Kind      | Summary                                                                                                                                                     |
    146: | API                   | Kind      | Summary                                                                                                                                    |
    179: | API                   | Kind     | Summary                                                                                                                               |
    190: | API                   | Kind      | Summary                                                                                                                                        |
    213: | API                | Kind      | Summary                                                                                                        |
    227: | API                     | Kind      | Summary                                                                                                                                |
    245: | API                        | Kind      | Summary                                                                                                                                                |
    259: | API                           | Kind      | Summary                                                                                                               |
    276: | API                 | Kind     | Summary                                                                                                                                                                                                                                                                                                                                                 |
    289: | API                          | Kind  | Summary                                                                                                                                     |
    322: | API                    | Kind      | Summary                                                                                                                                                                              |
    334: | API                     | Kind     | Summary                                                                                                                                     |
    358: | API                      | Kind  | Summary                                                                                                            |
    392: | Method | Returns               | Behavior                                                                                                  |
    400: | Method    | Returns                                               | Behavior                                                                                                                          |
    412: | Method       | Returns         | Behavior                                                                                                               |
    422: | Method      | Returns                                   | Behavior                                                                                                                          |
    439: | Method   | Returns                                  | Behavior                                                                  |
    450: | Method       | Returns | Behavior                                                                     |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/terminal.md`):
    3: > The terminal side of a form. `@orkestrel/form` owns the document — the schema, the
    4: > controls, the rules, the values, and the settle-once `answer` promise — and this package declares
    5: > none of it a second time. What terminal owns is everything form has no opinion about: a key
    6: > decoder, a presentation theme, the pure per-field reducers, the headless broker that PARKS a live
    7: > form until somebody elsewhere answers it, the SSE bridge that carries a parked form to a machine
    8: > with a keyboard, and the manager that routes parked forms between named endpoints.
    9: >
    10: > **One contract; the local TTY, the headless broker, and the SSE bridge.**
    11: > [`src/core`](../src/core) declares one driving contract, `TerminalInterface`, with one method:
    12: > `ask(form)` returns the settled `FormValues`. A form reaches a person over each of them. The
    13: > server `Terminal` ([`src/server`](../src/server)) IMPLEMENTS the
    14: > contract against a real TTY — raw-mode stdin, live in-place re-render, a `node:readline` fallback
    15: > when piped — and is the only impure part of the stack. The headless `Prompt` broker implements no
    16: > terminal at all: it parks the live form, emits a wire-safe record, and drives that same form to
    17: > settlement when an answer arrives. The `PromptClient` bridge receives a form parked elsewhere,
    18: > rebuilds it locally, and drives it through a local `TerminalInterface`. `PromptFormInterface` and
    19: > its per-control prompt methods are gone: a form is one question however many fields it holds, so
    20: > the contract needs one method and this package holds no second form vocabulary.
- Opening prose after the blockquote (first two lines):
    22: ## The blank line binds as absence
    24: A bare return no longer answers `''`. It binds `undefined`.
- README (`README.md`) first lines:
    # @orkestrel/terminal
    
    The terminal side of a form, for the `@orkestrel` line. `@orkestrel/form` owns
    the document — the schema, the controls, the rules, the values, and the
    settle-once `answer` promise. This package owns what form has no opinion about:
    a key decoder, a theme, pure per-field reducers, and the surfaces one form
    can be answered on. The server `Terminal` implements the one driving contract
    against a real TTY (raw-mode stdin, live in-place re-render, a `node:readline`
    fallback when piped). The headless `Prompt` broker PARKS a live form until
    somebody elsewhere answers it. The `PromptClient` bridge carries a form parked
    elsewhere to this machine's keyboard over SSE. Built beside
    `@orkestrel/console` (the shared style engine), `@orkestrel/contract`,
- `## Patterns` fences, each with its nearest preceding heading:
    26: fence under "## The blank line binds as absence"
    60: fence under "## Surface"
    607: fence under "### Ask one form at this keyboard"
    642: fence under "### Park a form, answer it from elsewhere"
    677: fence under "### Bridge a parked form to a keyboard elsewhere"
    707: fence under "### Mount the broker on your own HTTP spine"
    725: fence under "### Narrow what arrives from the wire"
    750: fence under "### Sanitize a schema you did not author"
    774: fence under "### Drive the field reducers directly"
    853: fence under "### Re-theme what a walk draws"
    900: fence under "### Route forms between named endpoints"
    953: fence under "### Persist endpoint config"
    974: fence under "### Drive the walk over injected streams"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:48:export function createTerminal(options?: TerminalOptions): TerminalInterface {
    src/core/factories.ts:43:export function createPrompt(options?: PromptOptions): PromptInterface {
    src/core/factories.ts:70:export function createPromptClient(options: PromptClientOptions): PromptClientInterface {
    src/core/factories.ts:90:export function createTerminalManager(options?: TerminalManagerOptions): TerminalManagerInterface {
    src/core/factories.ts:107:export function createMemoryTerminalStore(): TerminalStoreInterface {
    src/core/factories.ts:126:export function createDatabaseTerminalStore(
    src/core/helpers.ts:144:export function createPromptTheme(options?: PromptThemeOptions): PromptTheme {
    src/core/helpers.ts:380:export function createInputState(
    src/core/helpers.ts:446:export function createPasswordState(
    src/core/helpers.ts:515:export function createConfirmState(
    src/core/helpers.ts:583:export function createSelectState(
    src/core/helpers.ts:674:export function createCheckboxState(
    src/core/helpers.ts:804:export function createEditorState(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/Terminal.ts:109:export class Terminal implements TerminalInterface {
    src/core/stores/DatabaseTerminalStore.ts:48:export class DatabaseTerminalStore implements TerminalStoreInterface {
    src/core/stores/MemoryTerminalStore.ts:35:export class MemoryTerminalStore implements TerminalStoreInterface {
    src/core/Prompt.ts:40:export class Prompt implements PromptInterface {
    src/core/PromptClient.ts:61:export class PromptClient implements PromptClientInterface {
    src/core/TerminalManager.ts:53:export class TerminalManager implements TerminalManagerInterface {
    src/core/errors.ts:19:export class TerminalError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/factories.ts:1
    src/server/helpers.ts:1
    src/core/stores/DatabaseTerminalStore.ts:1
    src/core/stores/MemoryTerminalStore.ts:1
    src/core/factories.ts:5
    src/core/Prompt.ts:1
    src/core/helpers.ts:5
    src/core/PromptClient.ts:1
    src/core/TerminalManager.ts:1
    src/core/types.ts:1
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    93:} from '@orkestrel/guide'
    119:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    130:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    175:		for (const group of guide.methods()) {
    176:			const members = source.methods(group.interface)
    183:					expect(findMissing(members, group.methods)).toEqual([])
    186:					expect(findMissing(group.methods, members)).toEqual([])
    190:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    205:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    208:		for (const group of guide.methods()) {
    218:							? source.examples(group.interface)
    219:							: source.examples(group.interface).concat(source.examples(entity))
    220:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    232:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1043:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.14"` → `"version": "0.0.15"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-terminal-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
