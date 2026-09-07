# Prints every `Shape` cell of every Surface table that carries the column, one per line,
# so criterion 4's patterns run over the cells rather than over the whole guide.
import re, sys
from pathlib import Path

CELL = re.compile(r'(?<!\\)\|')
rows = []
column = None
for line in Path('guides/router.md').read_text(encoding='utf8').split('\n'):
	if not line.startswith('|'):
		column = None
		continue
	cells = [c.strip() for c in CELL.split(line.strip())[1:-1]]
	if 'Shape' in cells:
		column = cells.index('Shape')
		continue
	if column is None or cells[0].startswith('---'):
		continue
	rows.append(f'{cells[0]}\t{cells[column]}')
sys.stdout.write('\n'.join(rows) + '\n')
