# Applies item 1's budget literals to src/core/constants.ts and items 5, 7, and 8 to
# src/core/types.ts. Doc blocks only: no code token moves.
import sys

def replace_once(source, old, new, label):
	count = source.count(old)
	if count != 1:
		sys.exit(f'{label}: anchor matched {count} times')
	return source.replace(old, new)


CONSTANTS = 'src/core/constants.ts'
text = open(CONSTANTS, encoding='utf8').read()

BUDGETS = [
	('PATTERN_LIMIT', 'Caps the accepted source length for an authored regular expression', '256'),
	('FIELD_LIMIT', 'Caps the number of fields one schema may declare', '512'),
	('GROUP_LIMIT', 'Caps the number of groups one schema may declare', '64'),
	(
		'CHOICE_LIMIT',
		'Caps the number of choices one `select` or `checkbox` field may offer',
		'1024',
	),
	('LIST_LIMIT', 'Caps the number of entries one list-valued answer may hold', '1024'),
	(
		'NAME_LIMIT',
		'Caps the length, in UTF-16 code units, of a schema, group, or field name',
		'128',
	),
	('STRING_LIMIT', 'Caps the length, in UTF-16 code units, of any single retained string', '65536'),
	(
		'TEXT_LIMIT',
		'Caps the total length, in UTF-16 code units, of every string one schema retains',
		'1048576',
	),
	(
		'NODE_LIMIT',
		'Caps the total number of records, arrays, and leaves one schema retains',
		'16384',
	),
]

for name, sentence, literal in BUDGETS:
	text = replace_once(
		text,
		f'/** {sentence}. */\nexport const {name} = {literal}\n',
		f'/** {sentence}, at {literal}. */\nexport const {name} = {literal}\n',
		f'{name} literal',
	)

open(CONSTANTS, 'w', encoding='utf8').write(text)

TYPES = 'src/core/types.ts'
text = open(TYPES, encoding='utf8').read()

# Item 7 — `FormInterface`'s description names the contract, so it reads as the
# interface beside `Form`'s "Implements `FormInterface` exactly, …".
text = replace_once(
	text,
	""" * Represents a form: a schema, the answers given against it, and the errors they carry.
 *
 * @remarks
 * `valid` is true when the last completed evaluation found no error,""",
	""" * Declares the contract a form exposes: the state it holds and the calls that move it.
 *
 * @remarks
 * `valid` is true when the last completed evaluation found no error,""",
	'FormInterface description',
)

# Item 8 — the first declared overload of each family states the family.
text = replace_once(
	text,
	"""	/**
	 * Answers several fields at once.
	 *
	 * @param values - The answers to write, each keyed by its field name.
	 */
	fill(values: FormValues): void""",
	"""	/**
	 * Answers one field, or several at once.
	 *
	 * @param values - The answers to write, each keyed by its field name.
	 */
	fill(values: FormValues): void""",
	'fill family',
)
text = replace_once(
	text,
	"""	/**
	 * Takes every field out of the form.
	 *
	 * @remarks""",
	"""	/**
	 * Takes one field, several fields, or every field out of the form.
	 *
	 * @remarks""",
	'disable family',
)
text = replace_once(
	text,
	"""	/**
	 * Puts every field back into the form.
	 *
	 * @remarks""",
	"""	/**
	 * Puts one field, several fields, or every field back into the form.
	 *
	 * @remarks""",
	'enable family',
)

# Item 5 — `clear`'s description stands on its own; the `baseline` reference moves
# into `@remarks`, where the row's reader is no longer inside the row.
text = replace_once(
	text,
	"""	 * Returns every answer to {@link FormInterface.baseline}, the answers the form opened with.
	 *
	 * @remarks
	 * The runtime disabled overlay resets with them,""",
	"""	 * Returns every answer to the ones the form opened with.
	 *
	 * @remarks
	 * Those answers are {@link FormInterface.baseline}. The runtime disabled overlay resets with
	 * them,""",
	'clear description',
)

open(TYPES, 'w', encoding='utf8').write(text)
print('source edits applied')
