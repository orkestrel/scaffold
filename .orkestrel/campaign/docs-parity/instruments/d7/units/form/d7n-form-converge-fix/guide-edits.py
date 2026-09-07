# Applies items 1, 2, 3, 4, 6, and item 8's prose to guides/form.md.
# Every replacement asserts it matched exactly once, so a drifted anchor stops the run.
import re
import sys

PATH = 'guides/form.md'
text = open(PATH, encoding='utf8').read()


def replace_once(source, old, new, label):
	count = source.count(old)
	if count != 1:
		sys.exit(f'{label}: anchor matched {count} times')
	return source.replace(old, new)


def split_row(line):
	# A markdown row: leading and trailing pipe, cells between. A pipe escaped as `\|`
	# stays inside its cell.
	body = line.strip()
	assert body.startswith('|') and body.endswith('|'), body
	cells = re.split(r'(?<!\\)\|', body[1:-1])
	return [cell.strip() for cell in cells]


def build_row(cells):
	return '| ' + ' | '.join(cells) + ' |'


def rewrite_table(block, transform):
	lines = block.split('\n')
	out = []
	for line in lines:
		if line.startswith('|'):
			cells = split_row(line)
			if set(''.join(cells)) <= set('-: '):
				out.append(build_row(['---'] * len(transform(cells, True))))
			else:
				out.append(build_row(transform(cells, False)))
		else:
			out.append(line)
	return '\n'.join(out)


CONSTANT_SHAPES = {
	'`FIELD_CONTROLS`': '`readonly FieldControl[]`',
	'`FIELD_BASE_KEYS`': '`readonly string[]`',
	'`FIELD_KEYS`': '`Readonly<Record<FieldControl, readonly string[]>>`',
	'`FORM_STATUSES`': '`readonly FormStatus[]`',
	'`RULE_MESSAGES`': '`Readonly<Record<FieldRuleName, string>>`',
	'`EMAIL_PATTERN`': '`Readonly<RegExp>`',
	'`URL_PATTERN`': '`Readonly<RegExp>`',
	'`ALPHANUMERIC_PATTERN`': '`Readonly<RegExp>`',
	'`INTEGER_PATTERN`': '`Readonly<RegExp>`',
	'`COLOR_PATTERN`': '`Readonly<RegExp>`',
	'`DATE_PATTERN`': '`Readonly<RegExp>`',
	'`TIME_PATTERN`': '`Readonly<RegExp>`',
	'`DATETIME_PATTERN`': '`Readonly<RegExp>`',
	'`PATTERN_LIMIT`': '`number`',
	'`FIELD_LIMIT`': '`number`',
	'`GROUP_LIMIT`': '`number`',
	'`CHOICE_LIMIT`': '`number`',
	'`LIST_LIMIT`': '`number`',
	'`NAME_LIMIT`': '`number`',
	'`STRING_LIMIT`': '`number`',
	'`TEXT_LIMIT`': '`number`',
	'`NODE_LIMIT`': '`number`',
}

GUARD_SHAPES = {
	'`isFieldControl`': '`FieldControl`',
	'`isFormStatus`': '`FormStatus`',
	'`isFieldValue`': '`FieldValue`',
	'`isFieldChoice`': '`FieldChoice`',
	'`isFieldRule`': '`FieldRule`',
	'`isFormField`': '`FormField`',
	'`isFormGroup`': '`FormGroup`',
	'`isFormSchema`': '`FormSchema`',
	'`isFormValues`': '`FormValues`',
	'`isFieldError`': '`FieldError`',
}


def insert_shape(shapes):
	def transform(cells, separator):
		if separator:
			return cells + ['---']
		if cells[0] == 'API':
			return [cells[0], cells[1], 'Shape', cells[2]]
		key = cells[0]
		if key not in shapes:
			sys.exit(f'no Shape for row {key}')
		return [cells[0], cells[1], shapes[key], cells[2]]

	return transform


def drop_options(cells, separator):
	if separator:
		return cells[:2] + cells[3:]
	return cells[:2] + cells[3:]


# Item 1 — the Constants table gains `Shape`, under its own convention sentence.
start = text.index('### Constants')
end = text.index('### Guards')
block = text[start:end]
rewritten = rewrite_table(block, insert_shape(CONSTANT_SHAPES))
rewritten = replace_once(
	rewritten,
	"""value must have. The budgets are numbers, and each one's
value is stated where its section works it through: the ceilings in [Budgets](#budgets) beside the
unit each counts, and `PATTERN_LIMIT` in
[Patterns and where trust lives](#patterns-and-where-trust-lives).

| API""",
	"""value must have. Each budget's row names its ceiling.
[Budgets](#budgets) then works each ceiling through beside the unit it counts, and
[Patterns and where trust lives](#patterns-and-where-trust-lives) does the same for `PATTERN_LIMIT`.

A `Shape` cell holds the constant's declared type.

| API""",
	'constants sentence',
)
text = text[:start] + rewritten + text[end:]

# Item 2 — the Guards table gains `Shape`, under the guard sentence.
start = text.index('### Guards')
end = text.index('### Helpers')
block = text[start:end]
rewritten = rewrite_table(block, insert_shape(GUARD_SHAPES))
rewritten = replace_once(
	rewritten,
	"""domain soundness is `auditSchema`'s question.

| API""",
	"""domain soundness is `auditSchema`'s question.

In a guard table a `Shape` cell holds the type the guard narrows to.

| API""",
	'guard sentence',
)
text = text[:start] + rewritten + text[end:]

# Item 3 — the Controls table drops `Its own options`.
start = text.index('| Control    | Value')
end = text.index('### text')
block = text[start:end]
text = text[:start] + rewrite_table(block, drop_options) + text[end:]

# Item 4 — an invariant is named by its title, never by its position.
text = replace_once(
	text,
	"""Regular-expression **time** is not bounded here, exactly as
Contract 10 states: a source within `PATTERN_LIMIT` can still backtrack catastrophically, and
evaluating an untrusted pattern spends the caller's thread.""",
	"""Regular-expression **time** is not bounded here, exactly as
the "Guards are total and parsers refuse" invariant under [Contract](#contract) states: a source
within `PATTERN_LIMIT` can still backtrack catastrophically, and evaluating an untrusted pattern
spends the caller's thread.""",
	'contract 10 reference',
)
text = replace_once(
	text,
	"""previous error list in place. Contract 4 states the exact partial-state boundary.""",
	"""previous error list in place. The "Errors are current after completed evaluation" invariant under
[Contract](#contract) states the exact partial-state boundary.""",
	'contract 4 reference',
)

# Item 6 — the opening paragraph leads with its thesis.
text = replace_once(
	text,
	"""Nothing here renders, reads a keyboard, or opens a socket. **A terminal prompt and a browser form
are the same abstraction.** Both ask a person a set of questions, hold partial answers, check them
against rules, and finish once.""",
	"""**A terminal prompt and a browser form are the same abstraction.** Both ask a person a set of
questions, hold partial answers, check them against rules, and finish once.""",
	'opening thesis',
)
text = replace_once(
	text,
	"""Rendering is the browser's contribution, and it lives in the
browser, not here. This package ships the document both hosts share.""",
	"""Rendering is the browser's contribution, and it lives in the
browser, not here. Nothing here renders, reads a keyboard, or opens a socket. This package ships the
document both hosts share.""",
	'opening close',
)

# Item 8 — the Methods prose keeps only the all-or-nothing check.
text = replace_once(
	text,
	"""`fill` takes one name and one value, or a whole record. `disable` and `enable` each take no argument
for every field, one name for one field, or a list of names for those. A record and a list are
checked in full before anything moves, so a refused call changes nothing.""",
	"""A record and a list are checked in full before anything moves, so a refused call changes nothing.""",
	'methods prose',
)

open(PATH, 'w', encoding='utf8').write(text)
print('guide edits applied')
