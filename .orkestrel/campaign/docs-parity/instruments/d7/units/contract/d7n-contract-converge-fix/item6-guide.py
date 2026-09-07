from pathlib import Path

path = Path('guides/contract.md')
text = path.read_text(encoding='utf8')

PAIRS = [
	(
		"The one bound the combinators carry is not itself a combinator, and its `Value` cell holds\n",
		"The bound the combinators carry is not itself a combinator, and its `Value` cell holds\n",
	),
	(
		"The one class documented in full under its own heading following this table.\n",
		"`ContractError` is documented in full under its own heading following this table.\n",
	),
	(
		"whole surface is seven readonly data properties — `schema` (a `JSONSchema`), `guard` (a\n",
		"whole surface is readonly data properties — `schema` (a `JSONSchema`), `guard` (a\n",
	),
	(
		"value the corresponding getter publishes — `contract.is` IS `compiler.guard`, by identity rather\nthan as a copy of it.\n",
		"value the corresponding getter publishes — `contract.is` is exactly `compiler.guard`, by\nidentity rather than as a copy of it.\n",
	),
	(
		"nodes the last SUCCESSFUL `validate()` found the retained declaration expands into, one per node\n",
		"nodes the last successful `validate()` found the retained declaration expands into, one per node\n",
	),
]

for old, new in PAIRS:
	assert text.count(old) == 1, f'not unique -> {old[:70]!r}'
	text = text.replace(old, new)

path.write_text(text, encoding='utf8')
print('ok')
