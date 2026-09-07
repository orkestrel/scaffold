from pathlib import Path

EDITS = {
	'src/core/combinators.ts': [
		(
			""" * A CALLABLE instance passes. The only exclusion is a bad CONSTRUCTOR, never a callable
 * VALUE: an `isObject` pre-filter made `instanceOf(Function)(() => {})` answer `false`
 * while {@link isInstance}, the helper this is built on, answered `true` for the same
 * pair.""",
			""" * A callable instance passes. The exclusion is a bad constructor, never a callable
 * value: an `isObject` pre-filter made `instanceOf(Function)(() => {})` answer `false`
 * while {@link isInstance}, the helper this is built on, answered `true` for the same
 * pair.""",
		),
		(
			""" * Each member is contained SEPARATELY, so a throwing member is a non-match rather than
 * a veto over its sibling.""",
			""" * Each member is contained on its own, so a throwing member is a non-match rather than
 * a veto over its sibling.""",
		),
		(
			""" * The negation applies to the CONTAINED verdict, so a throwing guard is a non-match and""",
			""" * The negation applies to the contained verdict, so a throwing guard is a non-match and""",
		),
		(
			""" * states: a throwing EXCLUSION is a non-match, so the complement passes.""",
			""" * states: a throwing exclusion is a non-match, so the complement passes.""",
		),
	],
	'src/core/helpers.ts': [
		(
			""" * holds, and asked as a MODULE BINDING rather than as a property: `set.has(value)` asks""",
			""" * holds, and asked as a module binding rather than as a property: `set.has(value)` asks""",
		),
		(
			""" * A broken source is a fault of the SOURCE rather than of the shape, so the refusal""",
			""" * A broken source is the source's fault rather than the shape's, so the refusal""",
		),
	],
	'src/core/shapers.ts': [
		(
			""" * A present `min` or `max` must be FINITE. `NaN` and `±Infinity` throw a `bound` {@link""",
			""" * A present `min` or `max` must be finite. `NaN` and `±Infinity` throw a `bound` {@link""",
		),
	],
	'src/core/types.ts': [
		(
			""" * It declares no call-signature member, so its whole surface is seven readonly data
 * properties: `schema` (a {@link JSONSchema}), `guard` (a `Guard<Infer<S>>`), `parser`""",
			""" * It declares no call-signature member, so its whole surface is readonly data
 * properties: `schema` (a {@link JSONSchema}), `guard` (a `Guard<Infer<S>>`), `parser`""",
		),
		(
			""" * each holding the exact value the corresponding getter publishes — `contract.is` IS
 * `compiler.guard`, by identity rather than as a copy.""",
			""" * each holding the exact value the corresponding getter publishes — `contract.is` is
 * exactly `compiler.guard`, by identity rather than as a copy.""",
		),
	],
	'guides/contract.md': [
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
			"value the corresponding getter publishes — `contract.is` IS `compiler.guard`, by identity\nrather than as a copy of it.\n",
			"value the corresponding getter publishes — `contract.is` is exactly `compiler.guard`, by\nidentity rather than as a copy of it.\n",
		),
		(
			"nodes the last SUCCESSFUL `validate()` found the retained declaration expands into, one per node\n",
			"nodes the last successful `validate()` found the retained declaration expands into, one per node\n",
		),
	],
}

for name, pairs in EDITS.items():
	path = Path(name)
	text = path.read_text(encoding='utf8')
	for old, new in pairs:
		assert text.count(old) == 1, f'{name}: not unique -> {old[:70]!r}'
		text = text.replace(old, new)
	path.write_text(text, encoding='utf8')
	print('edited', name)
