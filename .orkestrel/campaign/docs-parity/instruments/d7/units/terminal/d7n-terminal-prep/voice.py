from pathlib import Path

edits = {
    'tests/setup.ts': [
        ('/** A manually driven timer used at broker and reconnect boundaries. */',
         '/** Describes a manually driven timer used at broker and reconnect boundaries. */'),
        ('/** Create an injected timer that fires only when the test calls `flush`. */',
         '/** Creates an injected timer that fires only when the test calls `flush`. */'),
        ('/** Build a finite protocol-faithful SSE response from inert event data. */',
         '/** Builds a finite protocol-faithful SSE response from inert event data. */'),
        ('/** Build one JSON response from inert test data. */',
         '/** Builds one JSON response from inert test data. */'),
        ('/** Fold raw key strings through a real reducer. */',
         '/** Folds raw key strings through a real reducer. */'),
        ('/** The immutable observation captured when a recording terminal receives a live form. */',
         '/** Holds the immutable observation captured when a recording terminal receives a live form. */'),
        (""" * A real TerminalInterface implementation for tests. It accepts scripted answers as inert data,
 * drives each supplied live form through its real fill and submit methods, and records the form at
 * the interface boundary. Deferred mode leaves the form live until `release` or external destroy.""",
         """ * Implements a real TerminalInterface for tests. It accepts scripted answers as inert data,
 * drives each supplied live form through its real fill and submit methods, and records the form at
 * the interface boundary. Deferred mode leaves the form live until `release` or external destroy."""),
        ('/** Build a recording TerminalInterface and expose its observations and release control. */',
         '/** Builds a recording TerminalInterface and exposes its observations and release control. */'),
        ('/** A compact valid schema used by broker and client fixtures. */',
         '/** Builds a compact valid schema used by broker and client fixtures. */'),
        ('/** Build one form covering every supported field control. */',
         '/** Builds one form covering every supported field control. */'),
        ('/** Build one valid pending-form envelope around a supplied schema. */',
         '/** Builds one valid pending-form envelope around a supplied schema. */'),
        ('/** Add ANSI, C0, whitespace controls, and DEL around one clean string. */',
         '/** Adds ANSI, C0, whitespace controls, and DEL around one clean string. */'),
        ('/** Add a valid OSC ANSI sequence and C0 bytes around regex source without making it uncompilable. */',
         '/** Adds a valid OSC ANSI sequence and C0 bytes around regex source without making it uncompilable. */'),
        (""" * A valid schema with hostile bytes in every schema string position terminal can render or use to
 * relate rendered records. It covers every field control and every control-specific string slot.""",
         """ * Builds a valid schema with hostile bytes in every schema string position terminal can render or
 * use to relate rendered records. It covers every field control and every control-specific string
 * slot."""),
        (""" * The wire-valid hostile schema used end to end. Form intentionally refuses control bytes inside
 * format-constrained date, time, datetime, and color defaults, so those invalid authored values
 * remain in the direct sanitizer fixture above and are omitted at the parse boundary here.""",
         """ * Builds the wire-valid hostile schema used end to end. Form intentionally refuses control bytes
 * inside format-constrained date, time, datetime, and color defaults, so those invalid authored
 * values remain in the direct sanitizer fixture earlier in this module and are omitted at the parse
 * boundary here."""),
        ('/** One shared store-contract case used by both store implementations. */',
         '/** Names one shared store-contract case every store implementation must satisfy. */'),
        ('/** Shared point-store cases. */',
         '/** Lists the shared point-store cases. */'),
    ],
    'tests/setupServer.ts': [
        ('/** A recording output stream. */', '/** Holds a recording output stream. */'),
        ('/** Create an injected output stream that records every written byte. */',
         '/** Creates an injected output stream that records every written byte. */'),
        ('/** A recording TTY backed by a real EventEmitter. */',
         '/** Describes a recording TTY backed by a real EventEmitter. */'),
        ('/** Create an ended readable stream containing scripted lines. */',
         '/** Creates an ended readable stream containing scripted lines. */'),
        ('/** Concatenate all raw output bytes. */', '/** Concatenates all raw output bytes. */'),
    ],
    'src/core/types.ts': [
        (' * - **`connected`** reflects whether the stream is currently open.',
         ' * - **`connected`** reflects whether the stream is open.'),
        (""" * Represents one opaque persisted row — the shape a `TableInterface<TerminalSnapshotRow>`-backed store reads
 * and writes. `snapshot` is narrowed with {@link import('./validators.js').isTerminalSnapshot} on
 * read.""",
         """ * Represents one opaque persisted row — the shape a table-backed store reads and writes. The store
 * is a `TableInterface<TerminalSnapshotRow>`, and `snapshot` is narrowed with
 * {@link import('./validators.js').isTerminalSnapshot} on read."""),
    ],
    'src/core/TerminalManager.ts': [
        (' * - **`ask`.** The target must already be mounted via {@link add} — `ask` never auto-adds it;',
         ' * - **`ask`.** The target must already be mounted through {@link add} — `ask` never auto-adds it;'),
    ],
    'src/core/PromptClient.ts': [
        (""" * - **Refusal retry.** A structured `rejected` response seeds a new rendering form with the values
 *   just submitted, applies every {@link FieldError} through `invalidate`, and asks again. No retry""",
         """ * - **Refusal retry.** A structured `rejected` response seeds a new rendering form with the values
 *   the refused attempt submitted, applies every {@link FieldError} through `invalidate`, and asks
 *   again. No retry"""),
    ],
    'src/server/Terminal.ts': [
        (' * - **Visibility is honored.** A `hidden` field and a field currently in `form.disabled` are',
         ' * - **Visibility is honored.** A `hidden` field and a field in `form.disabled` are'),
    ],
    'src/server/helpers.ts': [
        (""" * — a piped, non-TTY stream is still a valid input, just one the driver reads through the readline
 * fallback rather than raw mode.""",
         """ * — a piped, non-TTY stream is still a valid input, one the driver reads through the readline
 * fallback rather than raw mode."""),
        (""" * re-render: the driver records the line count of the view it just wrote so the next redraw knows how
 * far up to move the cursor before overwriting.""",
         """ * re-render: the driver records the line count of the view it wrote so the next redraw knows how
 * far up to move the cursor before overwriting."""),
        (""" * the prefix is just a carriage return + clear-down — the prompt draws from the current line. For a""",
         """ * the prefix is a carriage return + clear-down — the prompt draws from the current line. For a"""),
        (' * @param previousLines - The line count of the view currently on screen (from {@link lineCount})',
         ' * @param previousLines - The line count of the view on screen (from {@link lineCount})'),
    ],
}

for name, pairs in edits.items():
    path = Path(name)
    text = path.read_text()
    for before, after in pairs:
        if text.count(before) != 1:
            raise SystemExit(f'{name}: not found exactly once ({text.count(before)}):\n{before}')
        text = text.replace(before, after)
    path.write_text(text)
    print(f'{name}: {len(pairs)} applied')
