import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

types_pairs = [
(
"""/** Represents a calendar date, held as the control's own string. */""",
"""/** Represents a calendar date, held as the control's own `YYYY-MM-DD` string. */"""),
(
"""/** Represents a time of day, held as the control's own string. */""",
"""/** Represents a time of day, held as the control's own `HH:MM` string, with seconds optional. */"""),
(
"""/** Represents a color, held as the control's own string. */""",
"""/** Represents a color, held as the control's own six-digit `#rrggbb` string. */"""),
(
"""/**
 * Represents one or more files.
 *
 * @remarks
 * `accept` lists the media types and extensions the control offers, in the form the host
 * expects.
 */""",
"""/**
 * Represents one or more files, by name.
 *
 * @remarks
 * A value is the names alone: bytes never enter the document. `accept` lists the media types
 * and extensions the control offers, in the form the host expects.
 */"""),
(
"""	/**
	 * Fails a field from outside, for what the rules cannot see.
	 *
	 * @param name - The field's name.
	 * @param message - What to tell the person.
	 */""",
"""	/**
	 * Fails a field from outside, for what the rules cannot see.
	 *
	 * @remarks
	 * One field holds one external failure, so a second call replaces the first, and the failure
	 * lasts until that field is filled again or the form is cleared.
	 *
	 * @param name - The field's name.
	 * @param message - What to tell the person.
	 */"""),
(
"""	 * @remarks
	 * A request from inside a listener defers teardown until the outermost mutation batch closes,
	 * so an in-flight settlement can win and leave the form `settled` rather than `abandoned`.
	 */""",
"""	 * @remarks
	 * Tearing down twice does nothing the second time. A request from inside a listener defers
	 * teardown until the outermost mutation batch closes, so an in-flight settlement can win and
	 * leave the form `settled` rather than `abandoned`.
	 */"""),
]

form_pairs = [
(
"""/**
 * Represents a form: a schema, the answers given against it, and the errors they carry.
 *
 * @remarks
 * The form owns its schema, so a later edit to the schema the caller passed changes nothing here.""",
"""/**
 * Implements `FormInterface` exactly, over an owned schema, the answers given against it, and the
 * errors they carry.
 *
 * @remarks
 * The form owns its schema, so a later edit to the schema the caller passed changes nothing here."""),
]

validators_pairs = [
(
"""/**
 * Determines whether an unknown value has a form field value shape.
 *
 * @param input - The value to inspect.""",
"""/**
 * Determines whether an unknown value has a form field value shape.
 *
 * @remarks
 * A string, a finite number, a boolean, and a list of strings each qualify. A number that is not
 * finite does not, so `NaN` and `Infinity` are refused.
 *
 * @param input - The value to inspect."""),
(
"""/**
 * Determines whether an unknown value is one exact structural form schema.
 *
 * @param input - The value to inspect.""",
"""/**
 * Determines whether an unknown value is one exact structural form schema.
 *
 * @remarks
 * Structure alone is read. Domain soundness — a duplicate name, a bound no answer satisfies, a
 * breached budget — is {@link auditSchema}'s question.
 *
 * @param input - The value to inspect."""),
]

helpers_pairs = [
(
"""/**
 * Checks whether a value has the shape required by one field control.
 *
 * @param field - The field that owns the value.""",
"""/**
 * Checks whether a value has the shape required by one field control.
 *
 * @remarks
 * Every write and every seeded value passes through this gate, and it reads `STRING_LIMIT` and
 * `LIST_LIMIT` before it consults the control, so no regular expression sees an over-long value.
 *
 * @param field - The field that owns the value."""),
(
"""/**
 * Computes the values explicitly seeded by a schema.
 *
 * @param schema - The schema whose defaults to collect.""",
"""/**
 * Computes the values explicitly seeded by a schema.
 *
 * @remarks
 * `password` and `file` declare no default, so a field of either control never appears in the
 * result.
 *
 * @param schema - The schema whose defaults to collect."""),
(
"""/**
 * Resolves and interpolates one rule message.
 *
 * @param rule - The rule whose message to resolve.""",
"""/**
 * Resolves and interpolates one rule message.
 *
 * @remarks
 * A replacement in `messages` is read first and {@link RULE_MESSAGES} supplies the copy otherwise,
 * and `{limit}` in whichever text wins is replaced with the rule's operand.
 *
 * @param rule - The rule whose message to resolve."""),
]

parsers_pairs = [
(
"""/**
 * Parses one answer against its field control.
 *
 * @param field - The field that defines the accepted value.""",
"""/**
 * Parses one answer against its field control.
 *
 * @remarks
 * A numeric string coerces to a number for a `number` field, and `'true'` and `'false'` coerce to
 * a boolean for a `confirm` field. Every other value must already have its control's shape.
 *
 * @param field - The field that defines the accepted value."""),
]

apply('src/core/types.ts', types_pairs)
apply('src/core/Form.ts', form_pairs)
apply('src/core/validators.ts', validators_pairs)
apply('src/core/helpers.ts', helpers_pairs)
apply('src/core/parsers.ts', parsers_pairs)
