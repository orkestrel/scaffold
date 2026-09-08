import pathlib

path = pathlib.Path('/home/user/fleet/rater/guides/rater.md')
text = path.read_text()


def sub(old, new):
    global text
    assert text.count(old) == 1, (text.count(old), old[:90])
    text = text.replace(old, new)


SHAPE_SENTENCE = (
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an\n"
    "optional member and `plus` introducing its call-signature members, and a type alias's own\n"
    "type literal with a union's arms escaped as `\\|`.\n"
)

TYPES_OLD_START = text.index('### Types\n')
TYPES_OLD_END = text.index('### Errors\n')
TYPES_NEW = """### Types

""" + SHAPE_SENTENCE + """
| Type | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `Stage` | type | `'factor' \\| 'group' \\| 'total'` | Names a worksheet derivation step stage. |
| `RaterErrorCode` | type | `'DEFINITION' \\| 'MISMATCH' \\| 'DESTROYED'` | Names a coded `RaterError` programmer-error code. |
| `TotalHandler` | type | `(lines: readonly LineResult[]) => number \\| undefined` | Represents a pure total port over resolved lines. |
| `LineDefinition` | interface | `{ id, name, description?, rate, metadata? }` | Represents one rateable line — a quantitative definition joined to display metadata. |
| `RatingDefinition` | interface | `{ id, name, description?, lines, metadata? }` | Represents a pure authored rating — a named, ordered set of lines. |
| `Evidence` | interface | `{ field?, label?, comparison?, expected?, actual?, met? }` | Represents a checked-evidence row rendered into a display-neutral sentence. |
| `WorksheetFactor` | interface | `{ id, name?, description?, applied, value?, evidence }` | Represents a resolved quantitative factor, joined to its authored metadata. |
| `WorksheetGroup` | interface | `{ id, name?, description?, applied, value, factors }` | Represents a resolved quantitative group, joined to its authored metadata. |
| `Step` | interface | `{ stage, id?, name?, value, expression? }` | Represents a display-neutral worksheet derivation step. |
| `Worksheet` | interface | `{ id, name, aggregation, precision?, value, groups, steps, trace, errors, success }` | Represents a quantitative definition joined to its result — the rating audit trail. |
| `LineResult` | interface | `{ id, name, amount?, worksheet }` | Represents one line's rating outcome. |
| `RatingResult` | interface | `{ lines, total?, success }` | Represents a rated outcome across every line of one `rate` call. |
| `RaterEventMap` | type | `{ rate }` | Represents the push observation surface of a `RaterInterface`. |
| `RaterOptions` | interface | `{ on?, error?, engine?, total?, labels? }` | Configures `createRater` and the `Rater` constructor. |
| `RaterInterface` | interface | `{ emitter } plus rate, destroy` | Represents the rating orchestrator over the shared quantitative reasoning engine. |

`emitter` is a `readonly` data member of `RaterInterface` and keeps its Surface row here;
the interface's call-signature members are documented under [Methods](#methods).
`amount` is present on a `LineResult` only when its `worksheet.success` is `true`, and
`success` is `true` on a `RatingResult` only when every line's is.

"""
text = text[:TYPES_OLD_START] + TYPES_NEW + text[TYPES_OLD_END:]

# The Errors table, with the family fact the cells can no longer carry.
sub("""| API            | Kind     | Summary                                                                                    |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| `RaterError`   | class    | Carries a `RaterErrorCode` (`DEFINITION` / `MISMATCH` / `DESTROYED`) + optional `context`. |
| `isRaterError` | function | Narrow a caught value to a `RaterError`.                                                   |
""",
    """Every `RaterError` carries a `code` — `'DEFINITION'`, `'MISMATCH'`, or `'DESTROYED'` —
and an optional `context` record of structured detail beside its message.

| API | Kind | Summary |
| --- | --- | --- |
| `RaterError` | class | Represents a coded programmer error thrown by the rating layer. |
| `isRaterError` | function | Narrows a caught value to a `RaterError`. |
""")

# The Validators table: one compared column, the per-guard reference in each doc block.
VAL_OLD_START = text.index('| API                  | Kind     | Checks')
VAL_OLD_END = text.index('```ts\nimport { isLineDefinition, isRatingDefinition, isStage }')
VAL_NEW = """What each guard checks, and what it leaves unchecked, is documented on the guard's own
declaration.

| API | Kind | Summary |
| --- | --- | --- |
| `isStage` | const | Determines whether a value is a `Stage` literal. |
| `isLineDefinition` | function | Determines whether a value is an exact `LineDefinition` record. |
| `isRatingDefinition` | function | Determines whether a value is an exact `RatingDefinition` record. |
| `isEvidence` | function | Determines whether a value is an open result-side `Evidence` object. |
| `isWorksheetFactor` | function | Determines whether a value is an open `WorksheetFactor` result object. |
| `isWorksheetGroup` | function | Determines whether a value is an open `WorksheetGroup` result object. |
| `isStep` | function | Determines whether a value is an open `Step` result object. |
| `isWorksheet` | function | Determines whether a value is an open `Worksheet` result object. |
| `isLineResult` | function | Determines whether a value is an open `LineResult` object. |
| `isRatingResult` | function | Determines whether a value is an open `RatingResult` object. |

"""
text = text[:VAL_OLD_START] + VAL_NEW + text[VAL_OLD_END:]

# The Helpers table.
HELP_OLD_START = text.index('| API                     | Kind     | Summary')
HELP_OLD_END = text.index('Definition building — ')
HELP_NEW = """| API | Kind | Summary |
| --- | --- | --- |
| `buildLineDefinition` | function | Builds a fresh `LineDefinition` from a line id, a display name, and the line's quantitative rating definition, with `overrides` merged over those defaults. |
| `buildRatingDefinition` | function | Builds a fresh `RatingDefinition` from a rating id, a display name, and the rating's ordered lines, with `overrides` merged over those defaults. |
| `buildEvidence` | function | Builds an `Evidence` row from an evaluated `Check`. |
| `buildEvidenceRows` | function | Builds one evidence row per authored check of a quantitative factor, joined to that check's evaluated result. |
| `buildWorksheetFactor` | function | Joins one authored quantitative factor to its evaluated `FactorResult`. |
| `buildWorksheetGroup` | function | Joins one authored quantitative group to its evaluated `GroupResult`. |
| `buildWorksheetStep` | function | Builds one display-neutral `Step` row. |
| `buildWorksheetSteps` | function | Builds the ordered `Step` rows for a resolved `Worksheet`. |
| `buildWorksheet` | function | Joins a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail. |
| `buildLineResult` | function | Builds a rated `LineResult` from a line's evaluated `QuantitativeResult`. |
| `sumAmounts` | function | Sums defined line amounts. |

"""
text = text[:HELP_OLD_START] + HELP_NEW + text[HELP_OLD_END:]

# The definition-building fence keeps only what the descriptions do not carry.
sub("""Definition building — `id`, `name`, and the required member, with `overrides` merged over
them; each returns a fresh object and omits absent optional keys entirely:""",
    """Each definition builder returns a fresh object and omits an absent optional key
entirely:""")

# The Factories table, and the demonstrating fence's own heading.
sub("""| API           | Kind     | Builds…                                                                   |
| ------------- | -------- | ------------------------------------------------------------------------- |
| `createRater` | function | A `RaterInterface` — the rating orchestrator, seeded from `RaterOptions`. |
""",
    """| API | Kind | Summary |
| --- | --- | --- |
| `createRater` | function | Creates a rating orchestrator over the shared quantitative engine, seeded from `RaterOptions` and returning a `RaterInterface`. |
""")

sub("""`createRater` returns a live entity that owns an engine unless one is injected, so every
rater is destroyed when its work is done.

```ts
import { createRater } from '@orkestrel/rater'""",
    """`createRater` returns a live entity that owns an engine unless one is injected, so every
rater is destroyed when its work is done.

#### Create a rater

```ts
import { createRater } from '@orkestrel/rater'""")

# Ruling 5: an all-class table takes the Classes heading.
sub("""### Entities

| API     | Kind  | Summary                                                                                                                                       |
| ------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Rater` | class | The rating orchestrator — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary. |
""",
    """### Classes

| API | Kind | Summary |
| --- | --- | --- |
| `Rater` | class | Orchestrates rating — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary. |
""")

# The Methods prose and table.
sub("""The array-of-lines overload of `rate` is declared FIRST so a plain line list resolves
to that form; both overloads rate exactly ONE subject. `destroy()` is idempotent — it
destroys an OWNED engine (never an injected one), then the emitter LAST. Afterwards
every other method throws `RaterError` `'DESTROYED'`.

| Method    | Returns        | Behavior                                                                                        |
| --------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `rate`    | `RatingResult` | Rate an array of lines — or a `RatingDefinition` — against ONE subject, over the shared engine. |
| `destroy` | `void`         | Idempotent teardown — an OWNED engine, then the emitter LAST.                                   |
""",
    """The array-of-lines overload of `rate` is declared first so a plain line list resolves
to that form; each overload rates exactly one subject. `destroy()` is idempotent — it
destroys an owned engine (never an injected one), then the emitter last. Afterwards
every other method throws `RaterError` `'DESTROYED'`.

| Method | Returns | Summary |
| --- | --- | --- |
| `rate` | `RatingResult` | Rates an array of lines, or a rating definition, against one subject over the shared quantitative engine. |
| `destroy` | `void` | Destroys an owned engine and then the emitter, and does nothing on a later call. |
""")

# The Methods prose above the interface heading.
sub("""The public methods of `RaterInterface` — one table, keyed by its backticked name,
every call-signature member listed (the `readonly` data member `emitter` stays off the
method table). `Rater` exposes exactly its interface's methods, so this doubles as the
per-instance method surface.""",
    """The public methods of `RaterInterface` — one table, keyed by its backticked name, every
call-signature member listed, and the `readonly` data member `emitter` left off it.
`Rater` exposes exactly its interface's methods, so this doubles as the per-instance
method surface.""")

path.write_text(text)
print('tables written')
