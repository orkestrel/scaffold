# Brief — P.2 `d7n-terminal-converge` (terminal under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/terminal` from the committed baseline `3f9a081` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.15`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/terminal.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/terminal/guides/terminal.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-terminal-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/terminal.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/terminal.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/terminal.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/terminal.md interface TerminalInterface: guide "The one driving contract — `ask(form)` walks a form to settlement and returns its `FormValues`. Implemented here by the server `Terminal`." source "Declares the contract for asking a form of a human at a keyboard — one method, because a form is one question however many fields it holds. The server `Terminal` implements it against a real TTY; a `PromptClientInterface` holds one to answer forms parked elsewhere."
guides/terminal.md type PromptStatus: guide "Where one field's reducer stands after a key — `active` / `submit` / `cancel`. Names its axis, never `kind`." source "Names where one field's reducer stands after a key. `active`: keep asking, because the key was consumed or the answer was refused. `submit`: the field resolved with its `value`. `cancel`: the user aborted with ctrl-c. Names its axis, never `kind`."
guides/terminal.md interface PromptStep: guide "One reducer step's output — the next `state`, the rendered `view`, the `status`, and, on `submit` only, the candidate `value` (data-only)." source "Represents the result of one reducer step — the next `state`, the rendered `view`, the `status`, and, on `submit`, the resolved `value`. The whole contract between a pure reducer and the impure driver: the driver applies the next `state`, writes the `view`, and reads `value` on `submit`."
guides/terminal.md interface KeyEvent: guide "One decoded keypress — the OPTIONAL `name` plus `sequence` / `ctrl` / `meta` / `shift` (data-only)." source "Represents one decoded keypress — the TTY-agnostic representation of a single key, the output of `parseKey`. A driver reads `name` and the modifier flags to decide its transition; `sequence` is preserved so a printable character round-trips and an unknown escape is never lost."
guides/terminal.md function parseKey: guide "One keypress's bytes (`string` / `Uint8Array`) decoded into a `KeyEvent` — TOTAL; an unrecognized sequence carries no `name`, never a throw." source "Decodes one keypress's bytes into a `KeyEvent` — total, never throws. A `Uint8Array` is read as UTF-8; the resulting string is matched against the known control bytes and the CRLF pair (`CONTROL_NAMES`) and escape sequences (`SEQUENCE_NAMES`), falling back to a single printable character. An unrecognized sequence carries NO `name`, with the raw `sequence` preserved."
guides/terminal.md function isPrintable: guide "Whether a single character is printable — `parseKey`'s character fallback test, excluding the C0 controls and DEL." source "Checks whether a single character is a printable (non-control) character — used by `parseKey`'s char fallback."
guides/terminal.md function editLine: guide "One line-editing key applied to a text buffer (the input / password / editor shared editing) — `undefined` when the key does not edit." source "Applies a single line-editing `KeyEvent` to a text buffer — the editing shared by input / password / editor. A printable key appends its character; `backspace` drops the last character; `space` appends a space; ctrl-u clears the line."
guides/terminal.md type PromptIcon: guide "One glyph slot a rendered field draws — `question` / `pointer` / `dot` / `selected` / `checked` / `unchecked` / `success` / `error`." source "Names one glyph slot a rendered field draws — the icon axis of a `PromptTheme`. A named value set, not a toggle, so it stays a union."
guides/terminal.md type PromptRole: guide "One semantic styling slot — `question` / `pointer` / `message` / `content` / `success` / `error` / `selected` / `focus` / `hint` / `muted` / `description`." source "Names one styling slot a rendered field paints through — the semantic axis of a `PromptTheme`. A role says what a fragment MEANS; the theme decides what that meaning looks like, so a consumer re-maps styled output by naming roles rather than reimplementing a renderer."
guides/terminal.md interface PromptTheme: guide "A resolved presentation — a glyph for every `PromptIcon` and a console `Style` for every `PromptRole` (data-only, deeply frozen)." source "Represents a resolved PRESENTATION — the glyph for every `PromptIcon` and the console `Style` for every `PromptRole`. Plain JSON data with no functions, so it crosses the wire with the form it decorates. Built by `createPromptTheme`."
guides/terminal.md interface PromptThemeOptions: guide "The PARTIAL theme an option bag carries — every icon and role optional, merged leaf by leaf over the default (data-only)." source "Represents the PARTIAL `PromptTheme` an option bag carries — every icon and every role is optional, and `createPromptTheme` merges what is supplied over `DEFAULT_PROMPT_THEME` leaf by leaf. Supplying one icon or one role leaves every other slot at its default."
guides/terminal.md function createPromptTheme: guide "A partial theme merged over `DEFAULT_PROMPT_THEME` — supplied leaves replace, the rest keep their default; each style is frozen by console." source "Builds a complete `PromptTheme` by merging a partial one over `DEFAULT_PROMPT_THEME`, leaf by leaf — each supplied icon replaces that glyph, each supplied role replaces that `Style`, and everything else keeps its default. Each supplied style is snapshotted through the console module's own `freezeStyle`, so the result is deeply frozen and a caller mutating its own attribute list afterwards cannot reach into a built theme."
guides/terminal.md function renderPromptHeader: guide "The styled question header (`? label`) every active field view leads with, themed by the `question` + `message` roles." source "Renders the styled question header (`? message`) — the leading line every active prompt view shares, themed by the `question` + `message` roles."
guides/terminal.md function renderHintedHeader: guide "The question header plus a key hint painted with the `hint` role — the header alone when no hint is supplied." source "Renders a question header followed by a key hint painted with the `hint` role, or the header alone when no hint is supplied."
guides/terminal.md function renderSubmitHeader: guide "The styled committed header (`✔ label`) a field shows once it has an answer, themed by the `success` + `message` roles." source "Renders the styled submit line (`✔ message`) — the committed header an interactive prompt shows after it resolves, themed by the `success` + `message` roles."
guides/terminal.md function renderErrorLine: guide "The styled failure line (`✖ message`) the driver writes for each refused field before it asks again." source "Renders the styled failure line (`✖ message`) a form driver appends for a refused field."
guides/terminal.md interface InputState: guide "One text field's reducer state — the sanitized label, the default, the styler, the theme, and the typed value (data-only)." source "Represents the immutable state a text field's reducer carries — built by `createInputState`, rendered by `renderInputView`, and advanced by `reduceInput`."
guides/terminal.md function createInputState: guide "A `TextField`'s initial state — the sanitized label, the declared default, the styler, and the resolved theme." source "Builds the initial text-field key state."
guides/terminal.md function renderInputView: guide "A text state rendered — header, pointer, and the typed value (or the default shown as a hint)." source "Renders a text-field key state as a styled view."
guides/terminal.md function reduceInput: guide "The text reducer — printable extends, backspace shrinks, ctrl-u clears, return submits (an empty line falling back to the default)." source "Advances an input prompt by one `KeyEvent` — the pure `(state, key) → PromptStep<string>` reducer. Printable characters extend the value; backspace shrinks it; ctrl-u clears it; ctrl-c cancels; return produces the candidate value, with an empty line falling back to the default."
guides/terminal.md interface PasswordState: guide "One password field's reducer state — the text state with the mask glyph in place of a default (data-only)." source "Represents the immutable state a password field's reducer carries — the text state with the mask glyph in place of a default, because a secret is never seeded from the schema."
guides/terminal.md function createPasswordState: guide "A `PasswordField`'s initial state — like the text state, plus the mask glyph each character renders as." source "Builds the initial password-field key state."
guides/terminal.md function renderPasswordView: guide "A password state rendered — the value replaced by the mask repeated, so the real value is never echoed." source "Renders a password-field key state as a styled view."
guides/terminal.md function reducePassword: guide "The password reducer — identical line editing to `reduceInput`, with a masked view and a masked committed line." source "Advances a password prompt by one `KeyEvent` — the pure `(state, key) → PromptStep<string>` reducer. Identical line-editing to `reduceInput` (printable extends, backspace shrinks, ctrl-u clears, ctrl-c cancels) but the view masks the value. Return produces the candidate value."
guides/terminal.md interface ConfirmState: guide "One confirm field's reducer state — the label, the default answer, the styler, and the theme; no typed value (data-only)." source "Represents the immutable state a confirm field's reducer carries. It holds no typed value, because the answer is the key itself."
guides/terminal.md function createConfirmState: guide "A `ConfirmField`'s initial state — the sanitized label and the declared default answer." source "Builds the initial confirm-field key state."
guides/terminal.md function renderConfirmView: guide "A confirm state rendered — the header plus the yes/no group, the DEFAULT letter capitalized and painted by the `selected` role." source "Renders a confirm-field key state as a styled view. The selected role paints the default letter."
guides/terminal.md function reduceConfirm: guide "The confirm reducer — `y` submits true, `n` submits false, return takes the default, any other key is ignored." source "Advances a confirm prompt by one `KeyEvent` — the pure `(state, key) → PromptStep<boolean>` reducer. `y` / `Y` submits `true`, `n` / `N` submits `false`, return on an empty line submits the `default`, ctrl-c cancels; any other key is ignored (stays active)."
guides/terminal.md interface SelectState: guide "One select field's reducer state — the offered choices and the focused index (data-only)." source "Represents the immutable state a select field's reducer carries."
guides/terminal.md function createSelectState: guide "A `SelectField`'s initial state — the offered choices with the focus pre-placed on the declared default." source "Builds the initial select-field key state."
guides/terminal.md function renderSelectView: guide "A select state rendered — a MULTI-LINE view, one row per choice, the focused row marked and its help shown." source "Renders a select-field key state as a multi-line styled view."
guides/terminal.md function reduceSelect: guide "The select reducer — up / down (and `k` / `j`) move the focus WRAPPING, return submits the focused choice's `value`." source "Advances a select prompt by one `KeyEvent` — the pure `(state, key) → PromptStep<string>` reducer. `up` / `down` (and `k` / `j`) move the focus, WRAPPING at the ends; return submits the focused choice's `value`; ctrl-c cancels. An empty choice list can never submit (a higher layer guards against it); any other key is ignored."
guides/terminal.md interface CheckboxState: guide "One checkbox field's reducer state — the select state plus the ticked indices in tick order (data-only)." source "Represents the immutable state a checkbox field's reducer carries — the select state plus the ticked set."
guides/terminal.md function createCheckboxState: guide "A `CheckboxField`'s initial state — the choices, with every value in the field's `default` list pre-checked." source "Builds the initial checkbox-field key state."
guides/terminal.md function renderCheckboxView: guide "A checkbox state rendered — one box per choice plus the selected count." source "Renders a checkbox-field key state as a multi-line styled view."
guides/terminal.md function reduceCheckbox: guide "The checkbox reducer — space toggles the focused box, return submits the checked values in choice order; the form applies the count rules." source "Advances a checkbox prompt by one `KeyEvent` — the pure `(state, key) → PromptStep<readonly string[]>` reducer. `up` / `down` (and `k` / `j`) move the focus (wrapping); `space` toggles the focused index in the checked set; return submits the checked values in choice order; ctrl-c cancels. The form applies selection-count rules."
guides/terminal.md function toggleIndex: guide "One index toggled in a readonly index list — copy-on-write, the primitive `reduceCheckbox` calls." source "Toggles `index` in a readonly index list — copy-on-write, returning the new sorted-by-insertion list."
guides/terminal.md interface EditorState: guide "One editor field's reducer state — the committed lines and the line in progress, kept apart (data-only)." source "Represents the immutable state an editor field's reducer carries — the committed lines and the line still being typed, kept apart so a return commits one without ending the field."
guides/terminal.md function createEditorState: guide "An `EditorField`'s initial state — committed lines empty, the declared default held for an empty finish." source "Builds the initial editor-field key state."
guides/terminal.md function renderEditorView: guide "An editor state rendered — the finish hint, the committed lines, and the line in progress." source "Renders an editor-field key state as a multi-line styled view with its finish hint."
guides/terminal.md function reduceEditor: guide "The editor reducer — return commits a line, ctrl-d finishes (joining the lines, falling back to the default when empty)." source "Advances an editor prompt by one `KeyEvent` — the pure `(state, key) → PromptStep<string>` reducer. Printable characters extend the current line; backspace shrinks it; return commits the current line and starts a fresh one; ctrl-d FINISHES (joining all lines, falling back to the default when empty); ctrl-c cancels. The form validates the candidate after the driver fills it."
guides/terminal.md function sanitizeDisplayText: guide "One single-line display slot cleaned — console's ANSI `strip` and C0 `stripControls`, plus tab, line feed, and carriage return." source "Sanitizes text for one single-line display slot. Composes console's ANSI `strip` and C0 `stripControls` passes with removal of tab, line feed, and carriage return."
guides/terminal.md function sanitizeSchema: guide "Every terminal-readable string in a parsed schema cleaned, with every identity and answer string verbatim; field metadata is dropped." source "Sanitizes every terminal-readable string in a parsed form schema."
guides/terminal.md function sanitizeThemeIcons: guide "Every glyph a wire-supplied theme carries, cleaned. A role needs no pass: its colors and attributes are fixed name sets." source "Sanitizes every glyph a wire-supplied `PromptThemeOptions` carries for a single-line display slot. Only the icons need it: a role is guard-narrowed to a console `Style`, whose colors and attributes are fixed name sets, so no role can carry a byte a terminal would act on."
guides/terminal.md interface PromptInterface: guide "The broker — `emitter` / `count` data plus `park` / `pending` / `answer` / `stop` / `destroy`." source "Declares the headless form BROKER — parks a live form until somebody elsewhere answers it. The headless arm of the local-TTY / headless / remote trio: there is no terminal here, so a transport forwards each `pending` record to whoever can answer, and `answer` drives the parked form to settlement."
guides/terminal.md class Prompt: guide "The observable broker — parks live forms, applies remote answers to the authoritative instance, abandons on timeout, release, or teardown." source "Implements the headless form broker. It parks live forms, exposes their serialized schemas, and applies remote answers to the authoritative form."
guides/terminal.md function createPrompt: guide "The `PromptInterface` broker's factory." source "Creates the headless `PromptInterface` broker. It parks live forms and applies remote answers to the authoritative instances."
guides/terminal.md interface PromptOptions: guide "`createPrompt` options — `on` / `error` / `timeout` / `timer` / `cap` (data-only)." source "Configures `createPrompt` and every `PromptInterface` broker, including one a `TerminalManagerInterface` mounts per endpoint."
guides/terminal.md interface ParkRequest: guide "The parking envelope — `from` / `to`, the attribution edge a `TerminalManagerInterface` stamps; a direct caller passes no request (data-only)." source "Represents the parking envelope — everything the broker needs about a park that the form itself does not say."
guides/terminal.md interface PendingForm: guide "One form PARKED — `id` / `schema` / `status` / `time` / optional `from` / `to`; the wire-safe record a transport carries (data-only)." source "Represents one form PARKED by the broker — an id-keyed, wire-safe record of a live form awaiting a remote answer. The value a `pending` listener receives and the broker serializes over SSE to a `PromptClientInterface`."
guides/terminal.md type PendingFormStatus: guide "The TICKET's status — `pending` / `answered` / `expired`. The form it carries has its own status; the two are separate facts." source "Names the lifecycle status of a parked `PendingForm` — where the TICKET stands, which is not where the form stands. A ticket is `pending` until somebody answers it; the form it carries has its own status, and the two are separate facts about separate entities."
guides/terminal.md interface ParkedForm: guide "The broker's per-form record — the authoritative live `form`, its wire `pending` record, and the `cancel` for its expiry deadline (data-only)." source "Represents one parked form's runtime state inside the broker — the live form, the wire-safe record the broker exposes, and the cancel for its expiry timer."
guides/terminal.md type AnswerError: guide "Why `answer` refused — `{ reason: 'unknown' }`, or `{ reason: 'rejected', errors }` carrying the authoritative form's own `FieldError` list." source "Explains why `PromptInterface.answer` refused. Names its axis with `reason`."
guides/terminal.md type PromptEventMap: guide "The broker's events — `pending(form)` / `answer(id, values)` / `expire(id)`; errors are `unknown`, and there is no listener-error event." source "Declares the broker's event map — lean, errors `unknown`, no listener-error event."
guides/terminal.md function isPendingForm: guide "An unknown wire value narrowed to a `PendingForm` — the ENVELOPE only; `parseForm` owns the schema payload." source "Narrows an unknown wire value to a `PendingForm` envelope."
guides/terminal.md const isPendingFormStatus: guide "An unknown value narrowed to a `PendingFormStatus`." source "Narrows an unknown value to a `PendingFormStatus`."
guides/terminal.md type TimerHandler: guide "One injected timer — arms a deadline after `ms` and returns a `TimerCancelFunction`; the broker's expiry seam and the client's backoff seam." source "Represents one injected timer — arms a deadline `callback` to fire after `ms`, returning a `TimerCancelFunction` that cancels it. The broker's timeout seam: the default wraps the host `setTimeout` and `clearTimeout`; a test injects a deterministic timer that captures the callback and fires it on demand, with no real time and no global patching."
guides/terminal.md type TimerCancelFunction: guide "The cancel for a pending deadline — idempotent, safe after the timer fired." source "Cancels a pending `TimerHandler` deadline — idempotent, safe to call after the timer fired."
guides/terminal.md function defaultTimer: guide "The default `TimerHandler` — a thin host `setTimeout` / `clearTimeout` wrapper." source "Implements the default `TimerHandler` — a thin host `setTimeout` / `clearTimeout` wrapper that arms `callback` after `ms` and returns a `TimerCancelFunction`. The deadline seam behind both the `Prompt` broker (its expiry) and the `PromptClient` (its reconnect backoff); a test injects a deterministic timer instead, so neither entity touches real time."
guides/terminal.md interface WireEvent: guide "One SSE-shaped frame — the `event` name, its already-stringified `data`, and an optional `id` (data-only)." source "Represents one SSE-shaped wire frame — the `event` name, its already-stringified `data` payload, and an optional `id`. The transport-neutral shape `serializePending`, `serializeExpire`, and `serializeDestroy` build, with no `http` dependency."
guides/terminal.md const isWireEvent: guide "An unknown value narrowed to a `WireEvent` — the guard a consumer's own transport applies to an inbound frame." source "Narrows an unknown value to a transport-neutral `WireEvent`."
guides/terminal.md function serializePending: guide "The `pending` frame for a parked form — `id` the form's own id." source "Serializes a parked `PendingForm` into a `WireEvent`."
guides/terminal.md function serializeExpire: guide "The `expire` frame for a parked form that expired or was released — `data` the JSON `{ id }` payload." source "Serializes a parked prompt's expiry or release into a `WireEvent`."
guides/terminal.md function serializeDestroy: guide "The `destroy` frame a broker or manager sends when it is going away — no payload." source "Serializes the `WireEvent` a broker or manager sends when it is going away."
guides/terminal.md interface PromptClientInterface: guide "The bridge — `emitter` / `url` / `connected` data plus `connect` / `disconnect` / `destroy`." source "Declares the SSE form BRIDGE — the client-side counterpart to `PromptInterface`. It receives serialized `PendingForm` records from a remote broker, rebuilds each schema locally, drives it through a `TerminalInterface`, and POSTs the answer back, so a human at this machine answers forms a broker parked elsewhere."
guides/terminal.md class PromptClient: guide "The observable bridge — ingests without waiting on a render, drives one form at a time, and retries an authoritative refusal." source "Implements the SSE form bridge. It ingests serialized forms from a remote broker, renders them through a local terminal, and posts answers back without blocking the event stream."
guides/terminal.md function createPromptClient: guide "The `PromptClientInterface` bridge's factory." source "Creates the SSE prompt `PromptClientInterface` BRIDGE — it connects to a remote broker's SSE endpoint, dispatches each received form to a local `TerminalInterface`, and POSTs the answer back. Universal — `fetch` / SSE are web-standard."
guides/terminal.md interface PromptClientOptions: guide "`createPromptClient` options — `url` / `terminal` required, plus `token` / `reconnect` / `delay` / `on` / `error` / `fetch` / `timer`." source "Configures `createPromptClient` and the `PromptClientInterface`."
guides/terminal.md type PromptClientEventMap: guide "The client's events — `connect` / `disconnect` / `expire(id)` / `error(unknown)`." source "Declares the client's event map — lean, errors `unknown`, no listener-error event."
guides/terminal.md type FetchHandler: guide "A minimal `fetch` — the subset the client uses (open the stream, POST an answer); injected so a test drives it with no network." source "Represents a minimal `fetch` — the subset of the global `fetch` a `PromptClientInterface` uses: open the SSE stream, POST an answer. Injected so a test drives the client with a scripted `Response` instead of a real network."
guides/terminal.md interface FetchInit: guide "The request init the client passes its `FetchHandler` — `method` / `headers` / `body` / `signal` (data-only)." source "Represents the request init a `PromptClientInterface` passes to its `FetchHandler` — the `RequestInit` fields it actually sets."
guides/terminal.md function globalFetch: guide "The default `FetchHandler` — the global `fetch` adapted to that minimal shape." source "Implements the default `FetchHandler` — the global `fetch`, adapted to the minimal injected shape the `PromptClient` uses."
guides/terminal.md function isAbortError: guide "Whether a caught value is an `AbortError`, so a deliberate `disconnect` exits quietly instead of reconnecting." source "Checks whether a caught value is an `AbortError` — the `PromptClient` distinguishes a deliberate `disconnect` / teardown (an aborted `fetch`) from a real fault, so it exits its connect loop quietly instead of emitting `error` / reconnecting."
guides/terminal.md function isInsecureRemote: guide "Whether a URL is a non-loopback `http://` endpoint — the client warns once when a `token` would cross it in cleartext." source "Checks whether `url` is an INSECURE remote endpoint — a plain `http://` URL whose host is NOT a loopback address. Pure string parsing (no `URL` global), so it stays total on malformed input."
guides/terminal.md interface TerminalManagerInterface: guide "The registry — `emitter` / `count` data plus `terminal` / `terminals` / `add` / `ask` / `pending` / `answer` / `open` / `save` / `remove` / `destroy`." source "Declares a registry of named `PromptInterface` brokers, one per endpoint, so several parties (agents, tools, humans) can ask forms of each other BY NAME, attributed with a `from` → `to` edge on every parked record."
guides/terminal.md class TerminalManager: guide "The observable registry — mints and reuses named brokers, attributes each ask, refuses `TARGET` and `DEADLOCK`, persists config." source "Registers named `PromptInterface` brokers (one per endpoint), so several parties can `ask` forms of each other by NAME with a `from` → `to` attribution edge on every parked form, and a transitive DEADLOCK check across all in-flight asks."
guides/terminal.md function createTerminalManager: guide "The registry's factory. It returns `TerminalManagerInterface`, implemented exactly by `TerminalManager`." source "Creates the multi-endpoint `TerminalManager` — a named registry of `PromptInterface` brokers so several parties can `ask` prompts of each other by name, with a transitive DEADLOCK check across every in-flight ask."
guides/terminal.md interface TerminalManagerOptions: guide "`createTerminalManager` options — `store`, the manager-wide `timeout` / `timer` / `cap` default, and `on` / `error` (data-only)." source "Configures `createTerminalManager` and the `TerminalManagerInterface`."
guides/terminal.md type TerminalManagerEventMap: guide "The manager's events — every mounted broker's `pending(form)` / `answer(to, id, values)` / `expire(to, id)`, attributed by name." source "Declares the manager's event map — the name-attributed re-emission of every mounted broker's events, so a caller subscribes once for ALL endpoints instead of once per broker."
guides/terminal.md type TerminalAnswerError: guide "Why a manager `answer` refused — an `AnswerError`, plus `{ reason: 'target' }` when no endpoint is mounted under that name." source "Explains why a `TerminalManagerInterface.answer` call refused — an `AnswerError` from the endpoint's own broker, or `target` when no endpoint is mounted under that name. That is the same condition `TerminalErrorCode`'s `TARGET` names for `TerminalManagerInterface.ask`, so one word carries it on both doors. One discriminant, `reason`, across every member."
guides/terminal.md interface TerminalStoreInterface: guide "The store contract — async `get` / `set` / `delete`, keyed by the snapshot's own `id`." source "Declares the point-access persistence seam for a `TerminalManagerInterface`'s endpoint configs. Every primitive is async; deleting an absent id is a no-op."
guides/terminal.md interface TerminalSnapshot: guide "One endpoint's persisted config — `id` (the endpoint name) and its optional `timeout` (data-only)." source "Represents one endpoint's persisted CONFIG snapshot — `id` is the endpoint name and `timeout` its configured default. Parked forms are process-bound and are never resurrected, so `open` always restores an EMPTY broker."
guides/terminal.md interface TerminalSnapshotRow: guide "One opaque persisted row — `id` plus `snapshot: unknown`, the shape a `TableInterface`-backed store reads and writes." source "Represents one opaque persisted row — the shape a table-backed store reads and writes. The store is a `TableInterface<TerminalSnapshotRow>`, and `snapshot` is narrowed with `isTerminalSnapshot` on read."
guides/terminal.md const isTerminalSnapshot: guide "A stored value narrowed back to a `TerminalSnapshot` on read — a non-empty `id` and an optional numeric `timeout`." source "Narrows an unknown value to a `TerminalSnapshot` — the read boundary a store applies to an untrusted persisted row."
guides/terminal.md class MemoryTerminalStore: guide "The in-memory twin — a process-lifetime `Map`; no idle TTL, no eviction." source "Implements the in-memory `TerminalStoreInterface` — a process-lifetime `Map` of `TerminalSnapshot`s keyed by endpoint id, the DEFAULT store `createMemoryTerminalStore` builds. The EXACT twin of `DatabaseTerminalStore`."
guides/terminal.md class DatabaseTerminalStore: guide "The database twin — one opaque JSON column over a `TableInterface`, narrowed with `isTerminalSnapshot` on read." source "Implements a `TerminalStoreInterface` backed by one table of the `databases` layer — an endpoint's durable CONFIG state IS a row, so persistence reduces to keyed point-access (`get` / `set` / `delete`) over a `TableInterface`, the driver-pluggable twin of the plain-`Map` `MemoryTerminalStore`."
guides/terminal.md function createMemoryTerminalStore: guide "The in-memory store's factory." source "Creates the in-memory `TerminalStoreInterface` — a process-lifetime `Map` of endpoint config snapshots, the default store backing a `TerminalManagerInterface`'s `open` / `save`."
guides/terminal.md function createDatabaseTerminalStore: guide "The database-backed store's factory (default driver: an in-memory `@orkestrel/database` driver)." source "Creates a `TerminalStoreInterface` backed by one table of the `databases` layer — the driver-pluggable twin of `createMemoryTerminalStore`, storing each endpoint's config snapshot as one opaque JSON column."
guides/terminal.md type TerminalErrorCode: guide "The machine-readable condition — `EXPIRE` (a park reached a destroyed broker) / `CANCEL` (ctrl-c at the driver) / `DRIVER` (the fallback was given an input it cannot read) / `DEADLOCK` (an ask would close a `from` → `to` cycle) / `TARGET` (an unknown endpoint) / `LIMIT` (the broker's `cap`) / `DESTROYED` (a call reached a destroyed manager)." source "Names the machine-readable condition carried by a `TerminalError` — the axis a `catch` branches on. Names its axis (the failure condition), never `kind`."
guides/terminal.md class TerminalError: guide "The error those conditions throw or reject with — a `code` plus an optional `context` bag." source "Represents the error the terminal surfaces for its own refusals: parking on a destroyed or full broker, an unusable driver stream, a manager routing fault, or a ctrl-c cancellation. A parked form's own lifecycle failures reject through the form's `answer` with the form package's error, never with this one."
guides/terminal.md function isTerminalError: guide "An unknown caught value narrowed to a `TerminalError`, so a caller can branch on `error.code`." source "Narrows an unknown caught value to a `TerminalError`."
guides/terminal.md const RETURN: guide "Carriage return (`\\r`, U+000D) — Enter on most terminals." source "Names the carriage return byte (`\\r`, U+000D) — Enter on most terminals."
guides/terminal.md const NEWLINE: guide "Line feed (`\\n`, U+000A) — Enter on some terminals, and in pasted input." source "Names the line feed byte (`\\n`, U+000A) — Enter on some terminals / pasted input."
guides/terminal.md const TAB: guide "Tab (U+0009)." source "Names the tab byte (`\\t`, U+0009)."
guides/terminal.md const BACKSPACE: guide "Backspace (U+0008) — Ctrl+H, and Backspace on some terminals." source "Names the backspace byte (BS, U+0008) — Ctrl+H / some terminals' Backspace."
guides/terminal.md const DELETE: guide "Delete (U+007F) — the usual Backspace byte on a Unix TTY." source "Names the delete byte (DEL, U+007F) — the usual Backspace byte on a Unix TTY."
guides/terminal.md const SPACE: guide "Space (U+0020)." source "Names the space byte (U+0020)."
guides/terminal.md const CTRL_C: guide "Ctrl+C (U+0003) — cancel." source "Names the Ctrl+C byte (ETX, U+0003) — interrupt / cancel."
guides/terminal.md const CTRL_D: guide "Ctrl+D (U+0004) — the editor's finish key." source "Names the Ctrl+D byte (EOT, U+0004) — end-of-transmission / finish (the editor's commit key)."
guides/terminal.md const CTRL_U: guide "Ctrl+U (U+0015) — clear the current line." source "Names the Ctrl+U byte (NAK, U+0015) — clear the current line."
guides/terminal.md const CTRL_A: guide "Ctrl+A (U+0001) — move to start of line." source "Names the Ctrl+A byte (SOH, U+0001) — move to start of line."
guides/terminal.md const CTRL_E: guide "Ctrl+E (U+0005) — move to end of line." source "Names the Ctrl+E byte (ENQ, U+0005) — move to end of line."
guides/terminal.md const KEY_SS3: guide "The Single Shift Three lead (`ESCO`) — the alternate arrow-key prefix some terminals emit, built from console's own `ESC`." source "Names the Single Shift Three lead (`ESCO`) — the alternate arrow-key prefix some terminals emit (`ESC O A`). Built from the console module's own `ESC`; the navigation keys' CSI lead is that module's `CSI`, which this package reuses rather than redeclaring."
guides/terminal.md const SEQUENCE_NAMES: guide "The escape-SEQUENCE to key-NAME table `parseKey` consults — both forms of the arrows, plus home / end / delete." source "Holds the exact escape SEQUENCE → canonical key NAME table `parseKey` consults for the navigation / editing keys. Covers BOTH the CSI form (`ESC[A`…) and the SS3 form (`ESCOA`…) of the arrows, plus the `home` / `end` / `delete` CSI sequences (with their numeric-tilde variants). The source of truth for the multi-byte key decode; frozen."
guides/terminal.md const CONTROL_NAMES: guide "The control-BYTE (or CRLF pair) to key-descriptor table `parseKey` consults — each entry's canonical `name` and whether it is a ctrl combo." source "Holds the control BYTE (or CRLF pair) → key descriptor table `parseKey` consults for the one-byte keys and the two-byte CRLF Enter chunk. Each entry carries the canonical `name` and whether it is a `ctrl` combination. The source of truth for that decode; frozen."
guides/terminal.md const DEFAULT_MASK: guide "The glyph a password field renders each character as when it declares no `mask` — `*`." source "Names the default mask glyph `createPasswordState` uses — `*`."
guides/terminal.md const PROMPT_ICONS: guide "The terminal-owned glyphs `DEFAULT_PROMPT_THEME` is assembled from, beside console's own success and error marks." source "Holds the default glyphs `DEFAULT_PROMPT_THEME` assembles its `icons` from. Read only when the default theme is assembled; a view reads its resolved theme and never this constant. Frozen."
guides/terminal.md const PROMPT_ROLES: guide "Every `PromptRole` in one frozen list — the role axis's source of truth, walked when a partial theme is merged." source "Holds every `PromptRole`, in one frozen list — the role axis's source of truth. `createPromptTheme` walks it to merge a partial theme, and a consumer building a complete role map reads it rather than retyping every name."
guides/terminal.md const DEFAULT_PROMPT_THEME: guide "The theme every field renders with unless options supply another — the default glyphs and a `Style` per role." source "Holds the `PromptTheme` every prompt renders with unless its options supply another — the glyph set assembled from `PROMPT_ICONS` plus the console `STATUS_ICONS` `success` / `error` marks, and the console `Style` each role is painted with. Deeply frozen through the console module's own `freezeStyle`; the baseline `createPromptTheme` merges a partial theme over."
guides/terminal.md const DEFAULT_PROMPT_TIMEOUT_MS: guide "How long the broker parks an unanswered form before abandoning it — 5 minutes." source "Holds how long (ms) the `PromptInterface` broker parks an unanswered prompt before it expires — 5 minutes."
guides/terminal.md const DEFAULT_RECONNECT_DELAY_MS: guide "How long the client waits before each reconnect attempt — 2 seconds." source "Holds how long (ms) the `PromptClientInterface` waits before each reconnect attempt — 2 seconds."
guides/terminal.md const SSE_EVENTS: guide "The `event:` names the broker emits and the client dispatches on — `pending` / `expire` / `destroy`." source "Holds the SSE `event:` names the broker emits and the `PromptClientInterface` dispatches on. Frozen; the source of truth for the wire event vocabulary."
guides/terminal.md const HEADER_TOKEN: guide "The auth-token request header the client sends when a `token` is configured." source "Names the auth-token request header the `PromptClientInterface` sends."
guides/terminal.md const ACCEPT_EVENT_STREAM: guide "The `Accept` header value that opens the broker's stream (`text/event-stream`)." source "Names the `Accept` header value that opens the broker's SSE stream."
guides/terminal.md const SSE_BUFFER_LIMIT: guide "How many characters the client's SSE parser buffers before treating the stream as hostile — 1 MiB." source "Sets the maximum number of characters the `PromptClientInterface` lets its SSE parser buffer before treating the stream as hostile — 1 MiB, comfortably above any legitimate prompt payload. Passed as the `limit` to `createSSEParser` so an unterminated or oversized `data:` field cannot grow the buffer without bound (a memory-exhaustion guard)."
guides/terminal.md class Terminal: guide "The interactive driver — walks one form's fields, binds each answer through the form's own `fill`, re-asks what the form refused." source "Implements `TerminalInterface` for a human at this machine's keyboard — the interactive form DRIVER, and the only impure part of the terminal stack. `ask` walks one form's fields in schema order, feeds raw-mode stdin bytes through `parseKey` into the matching pure reducer, renders each returned view in place, and binds every answer through the form's own `fill`. It owns no form logic: the schema, the rules, the values, and the settlement all belong to the form it is given, and this class owns only raw mode, the cursor, and the re-render."
guides/terminal.md function createTerminal: guide "The `TerminalInterface` driver's factory over the resolved streams — the env-symmetric sibling of `createPrompt` and `createPromptClient`." source "Creates the interactive terminal form driver — the local-keyboard arm of the terminal trio, beside the core headless `createPrompt` broker and the SSE `createPromptClient` bridge. Where the broker PARKS a live form until somebody elsewhere answers it, a `Terminal` answers one HERE: it walks the form's fields in schema order, drives each control's pure reducer over raw-mode stdin, binds every answer through the form's own `fill`, and submits. It is the only impure part of the terminal stack."
guides/terminal.md interface TerminalOptions: guide "`createTerminal` options — `input` / `output` / `theme`, all optional; a bare `createTerminal()` drives the real process streams. `output` is console's own `StreamTargetInterface`." source "Configures `createTerminal` — every member optional, so a bare `createTerminal()` walks a form over the real `process.stdin` / `process.stdout` with the default theme."
guides/terminal.md interface InputStreamInterface: guide "The minimal input stream the driver reads — required `on` / `off`, optional `setRawMode` / `resume` / `pause` / `isTTY`." source "Represents the minimal input-stream shape the driver reads — exactly the slice of a Node `tty.ReadStream` / `process.stdin` it touches, and no more. A `TerminalOptions` `input` is narrowed to this through `isInputStream`, never an assertion, so a test drives a whole form with a hand-built fake stream that emits scripted key chunks, never touches the real `process.stdin`, and asserts that raw mode is entered once and always cleaned up."
guides/terminal.md function isInputStream: guide "Whether a value is a usable `InputStreamInterface` (callable `on` / `off`) — the input boundary guard, total." source "Checks whether `value` is a usable `InputStreamInterface` — a record with callable `on` / `off` `'data'` subscription methods. A total type guard: it NEVER throws and returns `false` for anything off-shape, so it narrows the one unavoidable input boundary (the real `process.stdin`, or a fake TTY a test injects) to the exact slice the driver reads — no `as`."
guides/terminal.md function isReadable: guide "Whether a value is a Node readable stream (callable `read` / `pipe` / `on`) — narrows the input to the `node:readline` boundary." source "Checks whether `value` is a Node `NodeJS.ReadableStream` — a total structural guard checking for the callable `read` / `pipe` / `on` that `node:readline`'s `createInterface` requires as its `input`. The non-TTY fallback narrows the resolved input stream through this before handing it to readline (never an `as`), so a real piped `process.stdin` (or a `PassThrough` a test injects) crosses into the readline boundary honestly. Never throws; returns `false` for a minimal fake that isn't a full readable."
guides/terminal.md function supportsRawMode: guide "Whether an input can be driven in RAW mode (`isTTY === true` AND a callable `setRawMode`) — selects raw mode over the readline fallback." source "Checks whether an input stream can be driven in RAW mode — it both reports `isTTY === true` AND exposes a callable `setRawMode`. The `Terminal` probes this to choose its path: `true` ⇒ the interactive raw-mode prompts (arrow-key navigation, live re-render); `false` ⇒ the `node:readline` line-input fallback (a piped / non-terminal stream cannot enter raw mode). Total — never throws."
guides/terminal.md function lineCount: guide "How many terminal LINES a rendered view occupies — one more than its newline count. The basis of the in-place re-render." source "Counts the terminal LINES a rendered prompt `view` occupies — one more than its newline count (a view with no newline is a single line; N newlines span N+1 lines). The basis of the in-place re-render: the driver records the line count of the view it wrote so the next redraw knows how far up to move the cursor before overwriting. Total; an empty string is one (empty) line."
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
guides/terminal.md const CSI_UP: guide "The cursor-UP TEMPLATE (`ESC[{count}A`), built from console's own `CSI` — `renderCursorUp` interpolates `{count}`." source "Holds the cursor-UP sequence TEMPLATE (`ESC[{count}A`) — `renderCursorUp` interpolates the `{count}` placeholder with the number of lines to climb. Kept as a template so the count stays out of the constant."
guides/terminal.md const CURSOR_HIDE: guide "The cursor-hide sequence — written before a redraw so the cursor does not flicker; paired with `CURSOR_SHOW`." source "Hides the cursor (`ESC[?25l`) — written before the driver starts redrawing a prompt so the cursor does not flicker across the view during an in-place re-render; paired with `CURSOR_SHOW`."
guides/terminal.md const CURSOR_SHOW: guide "The cursor-show sequence — restored when a field settles or the walk ends." source "Shows the cursor (`ESC[?25h`) — restores the cursor after a prompt resolves / cancels (the `CURSOR_HIDE` pair)."
guides/terminal.md const CLEAR_DOWN: guide "The erase-to-end-of-screen sequence — wipes a whole multi-line view before the new one." source "Erases from the cursor down to the end of the screen (`ESC[J`) — wipes the WHOLE previous (possibly multi-line `select` / `checkbox`) view in one write before the new view is rendered, so a redraw never leaves orphaned rows below."
guides/terminal.md const CONTROL_HINTS: guide "The format cue `fieldToText` appends per control — the `(YYYY-MM-DD)` on a date label, and its siblings." source "Holds the format cue appended to a field's label for each control the walk reads as a line of text — the terminal has no date picker, no color well, and no file chooser, so the accepted shape is stated instead. A control with no entry needs none: `text` and `editor` accept any line, `password` masks one, and `confirm`, `select`, and `checkbox` are answered by key rather than by format. The form's own rules still decide whether the typed value is acceptable."
guides/terminal.md const FILE_HINT: guide "The instruction shown above a multiple-file list — one path per line, blank to finish." source "Holds the instruction a `file` field with `multiple` shows before its entries — one path per line, and a blank line ends the list."
guides/terminal.md const SUGGESTION_LEAD: guide "The lead word on an open select's suggestion line." source "Holds the lead on the line listing an open `select`'s offered values, which a typed answer may ignore."
guides/terminal.md const UNAVAILABLE_LEAD: guide "The lead word on the line naming refused choices." source "Holds the lead on the line listing the choices a `select` or `checkbox` shows but refuses, so a reader sees why one is missing from the list below."
guides/terminal.md const LOCKED_MARK: guide "The mark a locked field's read-only line carries." source "Holds the mark on a locked field's line — the walk renders its value and moves on, because the form refuses an edit there."
guides/terminal.md const REFUSAL_MESSAGE: guide "The invalidation message the driver writes when an answer is one the control cannot hold." source "States what a field is told when the walk read an answer the control cannot hold — a word typed into a `number`, an off-list value typed into an open `select` whose choice is refused. The value binds as absence and this message is invalidated onto the field, so the walk re-asks it with the reason on screen."
guides/terminal.md const FALLBACK_SELECT_HINT: guide "The prompt the non-TTY select fallback reads its index on." source "Holds the numbered-list prompt the non-TTY `Terminal` `select` fallback appends — a piped (non-terminal) stream cannot navigate with arrow keys, so the choices are printed numbered and the user types one number on a single readline line."
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
```

## Facts for terminal (taken 2026-09-07T21:13Z by facts.sh)

- Checkout `/home/user/fleet/terminal`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `3f9a081`, status: clean
- `package.json`: version `0.0.15`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    src/server/Terminal.ts:108:export class Terminal implements TerminalInterface {
    src/core/stores/DatabaseTerminalStore.ts:48:export class DatabaseTerminalStore implements TerminalStoreInterface {
    src/core/stores/MemoryTerminalStore.ts:35:export class MemoryTerminalStore implements TerminalStoreInterface {
    src/core/Prompt.ts:40:export class Prompt implements PromptInterface {
    src/core/PromptClient.ts:62:export class PromptClient implements PromptClientInterface {
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
    176:			const members = source.methods(group.interface).map((method) => method.name)
    184:					expect(findMissing(members, documented)).toEqual([])
    187:					expect(findMissing(documented, members)).toEqual([])
    193:							: findMissing(
    194:									source.methods(entity).map((method) => method.name),
    212:				findUnexampled(
    215:					source.examples().map((example) => example.name),
    220:		for (const group of guide.methods()) {
    225:					? source.examples(group.interface).map((example) => example.name)
    229:							.concat(source.examples(entity).map((example) => example.name))
    236:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    248:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1043:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-terminal-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/terminal.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/terminal.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-terminal-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
