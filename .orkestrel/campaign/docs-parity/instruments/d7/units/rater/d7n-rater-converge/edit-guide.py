import pathlib

path = pathlib.Path('/home/user/fleet/rater/guides/rater.md')
text = path.read_text()


def sub(old, new):
    global text
    assert text.count(old) == 1, (text.count(old), old[:90])
    text = text.replace(old, new)


TAGLINE = """> A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored
> lines, each a plain reason `QuantitativeDefinition` joined to display metadata, rated
> against one subject to produce a `LineResult` per line — an `amount` and its
> `Worksheet` audit trail — and one `RatingResult` carrying every line's outcome and a
> derived `total`."""

# The tagline and the opening prose the displaced sentences fold into.
sub("""> A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored
> **lines** — each a plain reason `QuantitativeDefinition` joined to display metadata —
> are rated against a **subject** (a plain data record) to produce a `LineResult` per
> line (an `amount` plus its `Worksheet` audit trail) and one `RatingResult` (every
> line's outcome plus a derived `total`). The caller decides WHICH lines to rate for a
> subject — `Rater` only rates the lines it is given and reports what each one resolved
> to; it performs NO evaluation arithmetic of its own. Rating never mutates its inputs:
> every result is a fresh object. `Rater` either receives an injected `ReasonInterface`
> (never destroyed by `Rater`) or builds and OWNS its own quantitative-only engine
> (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch
> a quantitative definition — one it cannot dispatch surfaces the engine's own error,
> never wrapped by this package. Every `rate` call fires once through `Rater`'s typed
> `emitter`. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.

## Surface""",
    TAGLINE + """

A subject is a plain data record, and the caller decides which lines to rate for it:
`Rater` rates the lines it is handed, reports what each one resolved to, and performs no
evaluation arithmetic of its own. Rating never mutates its inputs, so every result is a
fresh object. A rater either receives an injected `ReasonInterface`, which it never
destroys, or builds and owns its own quantitative-only engine (`bail: false`) and
destroys that engine in `destroy()`. An injected engine must be able to dispatch a
quantitative definition: one it cannot dispatch surfaces the engine's own error, which
this package never wraps. Every `rate` call fires once through the rater's typed
`emitter`. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.

## Surface""")

# The Surface prose after the quick-start fence.
sub("""`rate` dispatches by input shape — the array-of-lines overload is declared FIRST so a
plain line list resolves to that form; a `RatingDefinition` resolves the same way
through its own `lines`. Both overloads rate exactly ONE subject — there is no batch
overload, and the subject must be a plain record or `rate` throws `RaterError`
`'MISMATCH'`; an input that is neither an array of lines nor a `RatingDefinition`
throws `RaterError` `'DEFINITION'`. A line that fails to resolve (a missing lookup
entry, a failed required factor) is a rating FAILURE reported on its own `LineResult`
(`worksheet.success: false`, no `amount`, a populated `worksheet.errors`) — the caller decides
what to do with a failed line; `Rater` only reports exactly what each line resolved
to. `total` is derived from every line's `amount` by a `TotalHandler` (default
`sumAmounts`, overridable through `RaterOptions.total`) and counts only the lines
that succeeded.""",
    """`rate` dispatches by input shape — the array-of-lines overload is declared first so a
plain line list resolves to that form; a `RatingDefinition` resolves the same way
through its own `lines`. Each overload rates exactly one subject — there is no batch
overload, and the subject must be a plain record or `rate` throws `RaterError`
`'MISMATCH'`; an input that is neither an array of lines nor a `RatingDefinition`
throws `RaterError` `'DEFINITION'`. A line that fails to resolve (a missing lookup
entry, a failed required factor) is a rating failure reported on its own `LineResult`
(`worksheet.success: false`, no `amount`, a populated `worksheet.errors`) — the caller decides
what to do with a failed line, and `Rater` reports exactly what each line resolved
to. `total` is derived from every line's `amount` by a `TotalHandler` (default
`sumAmounts`, overridable through `RaterOptions.total`), and only a line that
succeeded carries an `amount`.""")

path.write_text(text)
print('guide prose written')
