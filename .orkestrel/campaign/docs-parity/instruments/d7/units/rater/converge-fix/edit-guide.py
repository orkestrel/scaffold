from pathlib import Path

p = Path('guides/rater.md')
t = p.read_text(encoding='utf8')


def swap(text: str, old: str, new: str) -> str:
	assert text.count(old) == 1, old[:80]
	return text.replace(old, new)


# Item 2 — the failed-line paragraph in § Surface takes the two domain rules.
t = swap(
	t,
	"""to. `total` is derived from every line's `amount` by a `TotalHandler` (default
`sumAmounts`, overridable through `RaterOptions.total`), and only a line that
succeeded carries an `amount`.
""",
	"""to. `total` is derived from every line's `amount` by a `TotalHandler` (default
`sumAmounts`, overridable through `RaterOptions.total`). A `LineResult` carries an
`amount` only when its `worksheet.success` is `true`, and a `RatingResult`'s `success`
is `true` only when every line's `worksheet.success` is `true`.
""",
)

# Item 2 — the Types table keeps the note it alone carries.
t = swap(
	t,
	"""`RaterInterface`'s `emitter` is a `readonly` data member and stays in this table's
`Shape` cell; the interface's call-signature members are documented under
[Methods](#methods). A `LineResult` carries an `amount` only when its
`worksheet.success` is `true`, and a `RatingResult`'s `success` is `true` only when
every line's `worksheet.success` is.
""",
	"""`RaterInterface`'s `emitter` is a `readonly` data member and stays in this table's
`Shape` cell; the interface's call-signature members are documented under
[Methods](#methods).
""",
)

# Item 3 — the Errors fence takes a lead-in.
t = swap(
	t,
	"""| `isRaterError` | function | Narrows a caught value to a `RaterError`.                       |

```ts
import { isRaterError, RaterError } from '@orkestrel/rater'
""",
	"""| `isRaterError` | function | Narrows a caught value to a `RaterError`.                       |

The `isRaterError` guard narrows a caught value, so a handler reads the `code` member
off it:

```ts
import { isRaterError, RaterError } from '@orkestrel/rater'
""",
)

# Item 1 — the guard table takes the `Shape` column under Ruling 20's guard sentence.
t = swap(
	t,
	"""What each guard checks, and what it leaves unchecked, is documented on the guard's own
declaration.

| API                  | Kind     | Summary                                                                |
| -------------------- | -------- | ---------------------------------------------------------------------- |
| `isStage`            | const    | Determines whether a value is a `Stage` literal.                       |
| `isLineDefinition`   | function | Determines whether a value is an exact `LineDefinition` record.        |
| `isRatingDefinition` | function | Determines whether a value is an exact `RatingDefinition` record.      |
| `isEvidence`         | function | Determines whether a value is an open result-side `Evidence` object.   |
| `isWorksheetFactor`  | function | Determines whether a value is an open `WorksheetFactor` result object. |
| `isWorksheetGroup`   | function | Determines whether a value is an open `WorksheetGroup` result object.  |
| `isStep`             | function | Determines whether a value is an open `Step` result object.            |
| `isWorksheet`        | function | Determines whether a value is an open `Worksheet` result object.       |
| `isLineResult`       | function | Determines whether a value is an open `LineResult` object.             |
| `isRatingResult`     | function | Determines whether a value is an open `RatingResult` object.           |

```ts
import { isLineDefinition, isRatingDefinition, isStage } from '@orkestrel/rater'
""",
	"""In a guard table a `Shape` cell holds the type the guard narrows to.

| API                  | Kind     | Shape              | Summary                                                                |
| -------------------- | -------- | ------------------ | ---------------------------------------------------------------------- |
| `isStage`            | const    | `Stage`            | Determines whether a value is a `Stage` literal.                       |
| `isLineDefinition`   | function | `LineDefinition`   | Determines whether a value is an exact `LineDefinition` record.        |
| `isRatingDefinition` | function | `RatingDefinition` | Determines whether a value is an exact `RatingDefinition` record.      |
| `isEvidence`         | function | `Evidence`         | Determines whether a value is an open result-side `Evidence` object.   |
| `isWorksheetFactor`  | function | `WorksheetFactor`  | Determines whether a value is an open `WorksheetFactor` result object. |
| `isWorksheetGroup`   | function | `WorksheetGroup`   | Determines whether a value is an open `WorksheetGroup` result object.  |
| `isStep`             | function | `Step`             | Determines whether a value is an open `Step` result object.            |
| `isWorksheet`        | function | `Worksheet`        | Determines whether a value is an open `Worksheet` result object.       |
| `isLineResult`       | function | `LineResult`       | Determines whether a value is an open `LineResult` object.             |
| `isRatingResult`     | function | `RatingResult`     | Determines whether a value is an open `RatingResult` object.           |

Each guard answers `true` for a value of its own shape:

```ts
import { isLineDefinition, isRatingDefinition, isStage } from '@orkestrel/rater'
""",
)

# Item 3 — the titled fence takes a lead-in naming what the demonstration builds.
t = swap(
	t,
	"""#### Create a rater

```ts
""",
	"""#### Create a rater

The demonstration builds a rater on the engine that rater owns, then destroys both:

```ts
""",
)

# Item 3 — the Methods fence takes a lead-in.
t = swap(
	t,
	"""| `destroy` | `void`         | Destroys an owned engine and then the emitter, and does nothing on a later call.                          |

```ts
import { buildLineDefinition, createRater } from '@orkestrel/rater'
""",
	"""| `destroy` | `void`         | Destroys an owned engine and then the emitter, and does nothing on a later call.                          |

The array-of-lines and rating-definition forms of `rate` each take one subject and
return equal results for the same lines:

```ts
import { buildLineDefinition, createRater } from '@orkestrel/rater'
""",
)

p.write_text(t, encoding='utf8')
print('ok')
