import re
from pathlib import Path

path = Path('guides/contract.md')
lines = path.read_text(encoding='utf8').split('\n')

# Shape is the third column in each of these tables: | Name | Kind | Shape | Summary |
CELLS = {
	'isGeneratorFunction': '`(...args: unknown[]) => Generator<unknown, unknown, unknown>`',
	'isAsyncGeneratorFunction': '`(...args: unknown[]) => AsyncGenerator<unknown, unknown, unknown>`',
	'isZeroArgGenerator': '`() => Generator<unknown, unknown, unknown>`',
	'isZeroArgAsyncGenerator': '`() => AsyncGenerator<unknown, unknown, unknown>`',
	'Failure': '`{ success, error }`',
	'Success': '`{ success, value }`',
	'StringShape': '`{ category, min?, max?, pattern?, description? }`',
	'NumberShape': '`{ category, min?, max?, integer?, description? }`',
	'BooleanShape': '`{ category, description? }`',
	'NullShape': '`{ category, description? }`',
	'LiteralShape': '`{ category, values, description? }`',
	'ArrayShape': '`{ category, items, min?, max?, description? }`',
	'ObjectShape': '`{ category, properties, additionalProperties?, description? }`',
	'UnionShape': '`{ category, variants, mode?, description? }`',
	'OptionalShape': '`{ category, inner }`',
	'NullableShape': '`{ category, inner }`',
	'JSONShape': '`{ category, description? }`',
	'RawShape': '`{ category, schema }`',
}

seen = {name: 0 for name in CELLS}
for index, line in enumerate(lines):
	match = re.match(r'^\| `([A-Za-z]+)` +\| (function|interface) +\| ', line)
	if match is None:
		continue
	name = match.group(1)
	if name not in CELLS:
		continue
	cells = line.split('|')
	cells[3] = ' ' + CELLS[name] + ' '
	lines[index] = '|'.join(cells)
	seen[name] += 1

missing = [name for name, count in seen.items() if count != 1]
if missing:
	raise SystemExit(f'rows not matched exactly once: {missing} {seen}')
path.write_text('\n'.join(lines), encoding='utf8')
print('rewrote', len(CELLS), 'rows')
