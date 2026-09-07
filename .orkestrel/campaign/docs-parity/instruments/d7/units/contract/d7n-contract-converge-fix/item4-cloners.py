from pathlib import Path

path = Path('src/core/types.ts')
text = path.read_text(encoding='utf8')

PAIRS = [
	(
		"""/**
 * Owns the state of one exact JSON snapshot operation.
 *
 * @remarks
 * Construction retains the source without observing it. The first""",
		"""/**
 * Settles one exact JSON snapshot of a retained source, then replays it.
 *
 * @remarks
 * Construction retains the source without observing it. The first""",
	),
	(
		"""/**
 * Owns the state of one JSON Schema snapshot operation.
 *
 * @remarks
 * Construction retains the schema without observing it. The first""",
		"""/**
 * Settles one JSON Schema snapshot of a retained schema, then replays it.
 *
 * @remarks
 * Construction retains the schema without observing it. The first""",
	),
	(
		"""/**
 * Owns the state of one contract-shape snapshot operation.
 *
 * @remarks
 * Construction retains the shape without observing it. The first""",
		"""/**
 * Settles one contract-shape snapshot of a retained shape, then replays it.
 *
 * @remarks
 * Construction retains the shape without observing it. The first""",
	),
]

for old, new in PAIRS:
	assert text.count(old) == 1, f'not unique: {old[:60]!r}'
	text = text.replace(old, new)

path.write_text(text, encoding='utf8')
print('ok')
