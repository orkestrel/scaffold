# Report — P.2 `d7n-terminal-converge` (terminal under the equality gate)

`implementer` on Claude Opus 5. Checkout `/home/user/fleet/terminal`, baseline `3f9a081`.
Wall clock: `2026-09-07T21:16Z` to `2026-09-07T21:37Z`.

## Criterion 1 — red-first on the unconverged tree

Command: `PATH=/opt/npm11/bin:$PATH npm run test:guides`, run after adding the gate cases and
before any convergence. Reading: `Tests  3 failed | 60 passed (63)`.

The three failing cases, verbatim first lines:

```text
FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/terminal.md pairs: guide [\"The blank line binds as absence\",\"Surface\",\"Ask one form at this keyboard\",\"Park a form, answer it from elsewhere\",\"Bridge a parked form to a keyboard elsewhere\",\"Mount the broker on your own HTTP spine\",\"Narrow what arrives from the wire\",\"Sanitize a schema you did not author\",\"Drive the field reducers directly\",\"Re-theme what a walk draws\",\"Route forms between named endpoints\",\"Persist endpoint config\",\"Drive the walk over injected streams\"] source []",

FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:185:20 — expect(pitch).not.toBeUndefined()

FAIL  |guides| tests/guides.test.ts > Terminal > keeps every compared summary and example equal to its source
AssertionError: expected [ …(175) ] to deeply equal []
+   "guides/terminal.md interface TerminalInterface: guide \"The one driving contract — `ask(form)` walks a form to settlement and returns its `FormValues`. Implemented here by the server `Terminal`.\" source \"Declares the contract for asking a form of a human at a keyboard — one method, because a form is one question however many fields it holds. The server `Terminal` implements it against a real TTY; a `PromptClientInterface` holds one to answer forms parked elsewhere.\"",
+   "guides/terminal.md type PromptStatus: guide \"Where one field's reducer stands after a key — `active` / `submit` / `cancel`. Names its axis, never `kind`.\" source \"Names where one field's reducer stands after a key. `active`: keep asking, because the key was consumed or the answer was refused. `submit`: the field resolved with its `value`. `cancel`: the user aborted with ctrl-c. Names its axis, never `kind`.\"",
```

After convergence the same command reads `Tests  63 passed (63)`.

No control was planted for the lint reading; the Orchestrator takes that after this unit exits.

## Criterion 2 — headers, and the class rows

Every table now heads `Summary` beside `Kind` or `Returns` alone. Header-row census of
`guides/terminal.md`: `('API', 'Kind', 'Summary')` on fifteen tables, `('Method', 'Returns',
'Summary')` on six. The six `Behavior` headers under `## Methods` are the rename; nothing else in a
header row moved.

`### Classes` (Ruling 5, as Ruling 16 fixes its trigger) fires on nothing here. The guide carries no
`### Entities` heading, no all-class table (every Surface table that carries a `class` row also
carries an `interface`, `function`, `type`, or `const` row), and no class documented under its own
H3 — `Prompt`, `PromptClient`, `TerminalManager`, `MemoryTerminalStore`, `DatabaseTerminalStore`,
`TerminalError`, and `Terminal` each already carry a Surface row, which the passing DOC ↔ SOURCE
bijection case confirms.

Non-`Summary` cells against the baseline: rebuilt every row of `git show HEAD:guides/terminal.md`
and of the current file by splitting on a pipe not preceded by a backslash, then compared every cell
but the last. Reading: `baseline rows 196 current rows 196` / `non-Summary cell differences: 0`.

## Criterion 3 — doc blocks rewritten, then propagated

Direction was Ruling 6's: every block whose cell carried information the block lacked was rewritten
verb-first first, then `npm run docs -- --to guide` carried the descriptions across.

`PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` →
`rows read: 1, disagreements found: 176, written: 175, reported: 1` (the reported line is the pitch,
which the seed leaves to hand). Two later single-row propagations followed the two prose-truth
corrections named beneath, each reading `written: 1`.

**Blocks rewritten by hand.** In `src/core/types.ts`: `PromptRole`, `PromptTheme`,
`PromptThemeOptions`, `SelectState`, `PromptStep`, `TerminalInterface`, `PendingFormStatus`,
`PendingForm`, `AnswerError`, `PromptInterface`, `PromptClientInterface`,
`TerminalManagerEventMap`, `TerminalManagerInterface`, `TerminalSnapshot`. In
`src/core/helpers.ts`: `parseKey`, `isPrintable`, `renderErrorLine`, `createInputState`,
`renderInputView`, `createPasswordState`, `renderPasswordView`, `createConfirmState`,
`renderConfirmView`, `createSelectState`, `renderSelectView`, `reduceSelect`,
`createCheckboxState`, `renderCheckboxView`, `toggleIndex`, `createEditorState`,
`renderEditorView`, `reduceEditor`, `editLine`, `sanitizeSchema`, `isInsecureRemote`,
`serializePending`, `serializeExpire`, `serializeDestroy`. In `src/core/factories.ts`:
`createPromptClient`, `createTerminalManager`, `createDatabaseTerminalStore`. In
`src/core/validators.ts`: `isPendingForm`, `isWireEvent`, `isTerminalSnapshot`. In
`src/core/errors.ts`: `isTerminalError`. In `src/core/constants.ts`: `SEQUENCE_NAMES`,
`CONTROL_NAMES`, `PROMPT_ICONS`, `SSE_EVENTS`, `HEADER_TOKEN`, `ACCEPT_EVENT_STREAM`,
`DEFAULT_PROMPT_TIMEOUT_MS`. In `src/server/constants.ts`: `CSI_UP`, `CLEAR_DOWN`,
`SUGGESTION_LEAD`, `UNAVAILABLE_LEAD`. In `src/server/helpers.ts`: `isInputStream`, `isReadable`,
`supportsRawMode`, `lineCount`, `renderCursorUp`, `redrawPrefix`, `fieldToText`, `filterEnabled`,
`filterDisabled`, `renderLockedLine`, `renderSuggestionLine`. In `src/server/factories.ts`:
`createTerminal`. The class blocks: `Prompt`, `PromptClient`, `TerminalManager`,
`MemoryTerminalStore`, `DatabaseTerminalStore`, `Terminal`.

**Member blocks the gate required and the source did not carry.** Renaming `Behavior` to `Summary`
turned every `## Methods` row from `guide absent source absent` into a compared pair, so each
call-signature member gained a description paragraph; the readonly data members beside them gained
one too, matching the pilot's shape at `/home/user/fleet/abort/src/core/types.ts:24-38`.
`TerminalInterface.ask`; `PromptInterface` `emitter`, `count`, `park`, `pending`, `answer`, `stop`,
`destroy`; `PromptClientInterface` `emitter`, `url`, `connected`, `connect`, `disconnect`,
`destroy`; `TerminalManagerInterface` `emitter`, `count`, `terminal`, `terminals`, `add`, `ask`,
`pending`, `answer`, `open`, `save`, `remove`, `destroy`; `TerminalStoreInterface` `get`, `set`,
`delete`; `InputStreamInterface` `on`, `off`, `setRawMode`, `resume`, `pause`, `isTTY`. Each
overloaded member (`pending`, `stop`, `remove`) carries its block on the first overload, which is
where `locateComment` reaches it.

**Rows whose literal stayed in `Shape`.** None. `guides/terminal.md` carries no `Shape`, `Signature`,
or `Value` column anywhere, so Ruling 12's idiom and Ruling 18's constants sentence had no cell to
govern here. See § Observations for what that leaves open.

**Ruling 7 landings in guide prose.** None. Every member enumeration a cell carried already sat in
its block's `@remarks` bullets, so the description kept the summary and the enumeration stayed where
a reader reaches it from the declaration; no fact needed a home in the guide body beside its table.

**Prose truth corrected against the code, not carried across.**

- `PromptStep`: the block read "on `submit`, the resolved `value`" while its own `@remarks` and the
  guide's Contract both say the value is a candidate the form validates afterwards. Rewritten to
  "on `submit` alone, the candidate `value`".
- `DEFAULT_PROMPT_TIMEOUT_MS` and `SSE_EVENTS`' `expire` bullet said the broker parks and expires a
  "prompt". `park` takes a form. Rewritten to "form".
- `createTerminalManager` said parties "`ask` prompts of each other"; the manager's `ask` takes a
  form. Rewritten to "forms".

**Counts and all-caps emphasis.** Corrected in `guides/terminal.md`, `README.md`, and every block
rewritten. `TerminalInterface`'s "one method, because a form is one question" became "`ask` and
nothing beside it, because a form is one question"; `PendingFormStatus`'s "the two are separate
facts" became "each is a separate fact about a separate entity". The emphasis words lowered in the
guide and the README: `ABSENCE`, `DECLARED`, `THIS`, `PARK`, `AUTHORITATIVE`, `DATA`, `CANDIDATE`,
`PRINT`, `BY NAME`, `CONFIG`, `FORM`, `LIVE`, `WITH`, `STAYS`, `RETAINS`, `OUT OF BAND`, `LEAVES
THE FORM`, `INJECTED`, `NAMES`, `VALUES`, `DEFAULT`, `SCREEN`, `BOTH`, `LOCAL`, `SOURCE`'s and
`TIME` in claim 8, `ONLY`, `NO`, `OPEN`, `EDIT`, `NOT`, `LAST`, `COLUMN`, `END`, `WITHIN`,
`IDENTITY`, `DISPLAY`, `ANSWER`, `MULTI-LINE`, `EMPTY`, `FIRST`, `NAME`. Kept as themselves: the
acronyms, the `TerminalErrorCode` literals (`EXPIRE`, `CANCEL`, `DRIVER`, `DEADLOCK`, `TARGET`,
`LIMIT`, `DESTROYED`), the constant names, form's `ABANDONED`, and the pilot's own
`**DOC ↔ SOURCE bijection.**` label. Three document pointers also went: "Everything below is
exported" → "Everything that follows is exported"; "stay in its Surface row above" → "stay in its
Surface row and are not repeated here"; "Each line below comes back" → "Each line that follows comes
back". `PromptInterface.count`'s new block lost `currently` after
`policy/no-banned-term` flagged it (`src/core/types.ts:506:2: error policy(no-banned-term): Replace
currently in this comment: delete, or give the date.`), which is the only lint hit the work produced.

No code token moved. Evidence: `git diff -U0 src/` with every changed line stripped of its sign and
leading whitespace, filtered to lines that do not open with `*`, `/**`, `*/`, or `//`, returns
nothing.

## Criterion 4 — the titled pair

The pair is `createTerminal`'s `@example` in `/home/user/fleet/terminal/src/server/factories.ts`
and the fence under `### Ask one form at this keyboard` in `guides/terminal.md`. `createTerminal` is
the first `create*` the facts block lists and it carries an `@example`, so Ruling 3's primary-factory
branch applies and Ruling 17's class branch does not.

Heading choice, recorded as the ancillary decision the deviation contract leaves to me: three fences
demonstrate `createTerminal` — the one under `## The blank line binds as absence`, the one under
`## Surface`, and the one under `### Ask one form at this keyboard`. The first two demonstrate the
absence rule and the whole surface rather than the factory, and `## Surface` is a structural heading
Ruling 9 would have me deepen. `### Ask one form at this keyboard` is already worded as the
demonstration it shows, so it takes the title and no fence moved and no heading was added.
`grep -n '^#\+ Ask one form at this keyboard' guides/terminal.md` returns `601:### Ask one form at
this keyboard` and the phrase occurs once in the file.

Fence bodies read before titling: the `### Ask one form at this keyboard` fence carries no
three-backtick run and no `*/`, so it was not disqualified.

Ruling 14 applied, nothing deleted from either side. The fence demonstrated more than the block (a
`minimum` rule, a `password` field, a `select` with `help`, and the ctrl-c `catch` that names
`isTerminalError`); the block demonstrated a `text` field carrying `rule: { required: true, email:
true }` that the fence lacked. The fence gained that row —
`{ control: 'text', name: 'email', label: 'Email', rule: { required: true, email: true } },` — and
the `email` rule is real (`node_modules/@orkestrel/form/dist/src/core/index.d.ts:376` names
`email`, `url`, `integer`, and `alphanumeric`).

Runs, in the brief's order. Titling the block, then `npm run docs` on the converged summaries:
`rows read: 1, disagreements found: 1` naming the `Ask one form at this keyboard` pair alone. Then
`PATH=/opt/npm11/bin:$PATH npm run docs -- --to source`:
`wrote src/server/factories.ts` / `rows read: 1, disagreements found: 1, written: 1, reported: 0`.
`--to source` never ran on an unconverged tree, so no `{@link}` was flattened and no remark was
repeated into a description. Every other `@example` in the package stays untitled.

## Criterion 5 — the tagline, the pitch, and the opening prose

The H1 blockquote is now one noun phrase in plain text, with no link and no bold, and the README
carries the identical text under its H1 with the same line breaks:

```text
> The terminal side of a form: a key decoder, a presentation theme, the pure per-field reducers,
> the headless broker that parks a live form until somebody elsewhere answers it, the SSE bridge
> that carries a parked form to a machine with a keyboard, and the manager that routes parked
> forms between named endpoints.
```

The guide's opening prose, new after the blockquote and before `## The blank line binds as absence`,
carries the displaced sentences without restating the tagline's clauses: `@orkestrel/form` owning
the document and this package declaring none of it a second time; `src/core` declaring
`TerminalInterface` whose `ask(form)` returns the settled `FormValues`, with the local TTY, the
headless broker, and the SSE bridge each reaching a person over it; the server `Terminal` in
`src/server` implementing that contract against a real TTY with its raw-mode stdin, in-place
re-render, and `node:readline` fallback, as the only impure part of the stack; and
`PromptFormInterface` and its per-control prompt methods being gone. The broker's and the bridge's
own sentences from the old blockquote were dropped rather than folded, because the tagline now
carries exactly what they said and `### The headless broker` and `### The SSE bridge` carry the
rest.

The README's opening paragraph keeps the onboarding it alone carries — membership of the
`@orkestrel` line and the packages it is built beside (`@orkestrel/console` as the shared style
engine, `@orkestrel/contract`, `@orkestrel/emitter`, `@orkestrel/database`, `@orkestrel/sse`) —
and states the `@orkestrel/form` ownership sentence without restating a tagline clause. The bold
`**One contract; the local TTY, the headless broker, and the SSE bridge.**` line is gone, its claim
folded into the opening prose as plain text.

## Criterion 6 — the seed

```text
npm run docs                    → rows read: 1, disagreements found: 0                      (exit 0)
npm run docs -- --to guide      → rows read: 1, disagreements found: 0, written: 0, reported: 0
npm run docs -- --to source     → rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```text
npx oxfmt --config .oxfmtrc.json --check .                                → exit 0 ("All matched files use the correct format." on 69 files)
npx oxlint --config .oxlintrc.json --deny-warnings src tests/guides.test.ts → exit 0
npm run check                                                            → exit 0
npm run test:guides                                                      → Tests  63 passed (63)
npm run test:policy                                                      → Tests  90 passed | 1 skipped (91)
```

Observations, not criteria: `npm run test:src:core` → `Tests  97 passed (97)`;
`npm run test:src:server` → `Tests  29 passed (29)`. Nothing timed out; the host stayed responsive
throughout.

## Criterion 8 — status

`git status --short` lists nineteen entries, every one an owned file:

```text
 M README.md
 M guides/terminal.md
 M src/core/Prompt.ts
 M src/core/PromptClient.ts
 M src/core/TerminalManager.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/stores/DatabaseTerminalStore.ts
 M src/core/stores/MemoryTerminalStore.ts
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/Terminal.ts
 M src/server/constants.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

`package.json` and `package-lock.json` are untouched; `@orkestrel/guide` stays declared at `^0.0.17`.
Every instrument this unit wrote sits under `/home/user/fleet/terminal/tmp/d7n-terminal-converge/`,
which git ignores.

Diffstat: `19 files changed, 703 insertions(+), 489 deletions(-)`.

## The drop-in and the gate cases

`tests/guides.test.ts` now matches the pilot byte for byte outside its constants block. Proof, run
over both files: the slab from `const root = new URL(` to the close of the manifest loop is
`identical`, and the header comment is identical once the pilot's `The constants below are this` is
read with Ruling 13's amendment applied.

Two corrections to terminal's copy that the diff produced:

- The header's third line read `// package's own, and are the only part a sibling package changes.`
  The pilot reads `// package's own, as is the executed section that closes the file.` The pilot is
  the canon and its sentence is also the true one here, because this file closes with its own
  `guide fences` block. Adopted the pilot's line. The package sentences the old header carried about
  that block moved into the comment directly above `describe('guide fences')`, so nothing was lost.
- `const root = resolveRoot(import.meta)` became `const root = new URL('../', import.meta.url)`, the
  pilot's form, and `resolveRoot` left the `@orkestrel/test` import. Both expressions return the same
  `URL`.

The `INTERNAL` doc block now reads "the assertion that follows it fails when a name here stops being
stranded". The equality case sits directly after the methods loop and before the examples case,
which is named `documents an example for every Surface function`. `ROOT_FILES` reads
`Object.freeze(['AGENTS.md', 'README.md'])` under the pilot's "Root-level files these checks read"
comment, and `GUIDE_SPEC` is `'guides/terminal.md'`. The pin is the guard-and-continue loop with no
local type predicate and the both-sides failure line; the README case guards each side with
`not.toBeUndefined()` before `toBe`. Each case is named for what it proves.

## § Tests

The `tests/guides.test.ts` bullet in `## Tests` now names the equality gate descriptively and
carries no SQ/MQ/EQ/RQ identifier: every `Summary` cell against its declaration's description
paragraph, the titled `Ask one form at this keyboard` fence against the `@example` block of that
title (pinned so the titled pair cannot be retired silently), and the README pitch against this
guide's tagline, plus the flagship fences and the values their comments claim. The guide already
carried a `## Tests` section, so none was added.

## Reader and seed defects met

None. `replaceCell` located every one of the 175 cells the first `--to guide` run carried, including
each `## Methods` row the header rename had just made compared. `replaceExample` wrote the titled
body on the first attempt. No reader returned a shape the brief does not describe, and no residual
disagreement survived a doc-block rewrite under the P16 comparator: a `{@link}` compared as its
target's code token throughout, and the `import('./module.js').` part dropped as the brief said it
would, so `{@link import('./helpers.js').parseKey}` compares against the guide's `` `parseKey` ``.

## Observations for the Orchestrator

**Ruling 15 has an open trigger in this package that this unit's fixed scope and acceptance criteria
do not reach.** Ruling 15 reads: "Where a `## Surface` table carries an interface or type-alias row,
that table heads `Shape` between `Kind` and `Summary`." Every `## Surface` table in
`guides/terminal.md` that carries an `interface` or `type` row — `### The driving contract`,
`### Key decoding`, `### Presentation`, `### The field reducers`, `### The headless broker`,
`### The wire seam`, `### The SSE bridge`, `### The terminal manager`, `### The terminal store`,
`### The terminal error`, `### The server Terminal` — heads `API | Kind | Summary` and no `Shape`.
Ruling 18's `### Constants` sentence is open the same way on `### The core constants` and
`### The server constants`.

I did not add the column, for these reasons: the brief's § What is fixed states the `Shape`
obligation conditionally ("Where a table carries `Shape`, state the fleet's one `Shape` idiom …"),
acceptance criterion 2 is satisfied without it, and adding it here is not mechanical — terminal
groups its Surface rows by concept rather than by kind, so every table is mixed and a `Shape` column
would sit empty on each `function` and `class` row, unlike the pilot's split `### Classes` /
`### Types` tables where the column has a clean population. That is a table-shape design decision
with a real judgment load and a large blast radius, and it belongs in a successor brief that says
which shape the fleet wants for a concept-grouped guide. The member enumerations the old cells
carried were not lost in the meantime: each one already sits in its declaration's `@remarks`, which
is where Ruling 7 puts reference material and where the row's name leads a reader.

**`createPrompt`'s cell says "the authoritative instances" while `Prompt`'s says "the authoritative
form".** Both are true — the factory serves many brokers, the class serves one — so I left them.
Flagging it in case the reconciliation wants one term.

## Deviation state

No deviation. Nothing in the stop list was met: every cell the seed had to locate was located, the
block held the titled body, no test outside `tests/guides.test.ts` reddened, no vendored file needed
an edit, no reader returned an undescribed shape, and no residual disagreement survived.
