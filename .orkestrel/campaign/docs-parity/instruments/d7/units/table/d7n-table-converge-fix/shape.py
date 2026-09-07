"""Insert the `Shape` column into every Surface table that Ruling 15 names.

Splits each table row on an unescaped pipe, inserts one cell after `Kind`, and writes
the convention sentence as its own paragraph directly above the table.
"""

import re
import sys

PATH = 'guides/table.md'

CONVENTION = (
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
    "optional member and `plus` introducing its call-signature members, and a type alias's own "
    "type literal with a union's arms escaped as `\\|`."
)
CONSTANTS = "A `Shape` cell holds the constant's declared type."

SHAPES = {
    'TableKey': '`string`',
    'TableCell': '`string \\| number \\| boolean`',
    'TableRow': '`Readonly<Record<string, TableCell>>`',
    'ColumnCell': "`'text' \\| 'number' \\| 'flag' \\| 'choice'`",
    'ColumnChoice': '`{ value, label, help? }`',
    'ColumnBase': '`{ key, label?, help?, hidden?, meta? }`',
    'TextColumn': '`{ cell, key, label?, help?, hidden?, meta? }`',
    'NumberColumn': '`{ cell, key, label?, help?, hidden?, meta? }`',
    'FlagColumn': '`{ cell, key, label?, help?, hidden?, meta? }`',
    'ChoiceColumn': '`{ cell, choices, key, label?, help?, hidden?, meta? }`',
    'TableColumn': '`TextColumn \\| NumberColumn \\| FlagColumn \\| ChoiceColumn`',
    'TableSchema': '`{ name?, label?, help?, key, columns }`',
    'TableTerm': '`{ column }`',
    'TableDirection': "`'ascending' \\| 'descending'`",
    'TableOrder': '`{ column, direction }`',
    'FilterOperator': "`'contains' \\| 'between' \\| 'equals'`",
    'ContainsFilter': '`{ column, operator, text }`',
    'BetweenFilter': '`{ column, operator, minimum, maximum }`',
    'EqualsFilter': '`{ column, operator, value }`',
    'TableFilter': '`ContainsFilter \\| BetweenFilter \\| EqualsFilter`',
    'CellComparator': '`(left: TableCell \\| undefined, right: TableCell \\| undefined) => number`',
    'CellMatcher': '`(cell: TableCell \\| undefined, filter: TableFilter) => boolean`',
    'Table': '',
    'TableInterface': (
        '`{ emitter, schema, rows, sort, filter, selection, expansion, pagination, view, count,'
        ' destroyed } plus clear, destroy`'
    ),
    'createTable': '',
    'TableOptions': '`{ on?, error?, rows?, comparators?, matchers?, limit? }`',
    'TableEventMap': '`{ write, remove, sort, filter, select, expand, paginate, clear }`',
    'RowManagerInterface': '`{} plus row, rows, add, update, move, remove`',
    'SortManagerInterface': '`{} plus order, orders, set, remove`',
    'FilterManagerInterface': '`{} plus filter, filters, set, remove`',
    'SelectionManagerInterface': '`{ keys } plus select, clear, toggle`',
    'ExpansionManagerInterface': '`{ keys } plus expand, clear, toggle`',
    'PaginationManagerInterface': '`{ page, limit, offset, count } plus move, resize`',
    'TableError': '',
    'TableErrorCode': "`'SCHEMA' \\| 'COLUMN' \\| 'KEY' \\| 'CELL' \\| 'DESTROYED'`",
    'isTableError': '',
    'COLUMN_CELLS': '`readonly ColumnCell[]`',
    'COLUMN_LIMIT': '`number`',
    'CHOICE_LIMIT': '`number`',
    'NAME_LIMIT': '`number`',
    'STRING_LIMIT': '`number`',
    'TEXT_LIMIT': '`number`',
    'NODE_LIMIT': '`number`',
}

SECTIONS = {
    '### Rows, cells, and columns': CONVENTION,
    '### The lens': CONVENTION,
    '### The table': CONVENTION,
    '### Constants': CONSTANTS,
}

SPLIT = re.compile(r'(?<!\\)\|')


def cells(line):
    parts = SPLIT.split(line)
    return [part.strip() for part in parts[1:-1]]


def render(values):
    return '| ' + ' | '.join(values) + ' |'


def rewrite(lines, start, name):
    """Rewrites one table in place, returning the count of body rows touched."""
    header = cells(lines[start])
    if 'Shape' in header:
        return 0
    at = header.index('Kind') + 1
    header.insert(at, 'Shape')
    lines[start] = render(header)
    rule = cells(lines[start + 1])
    rule.insert(at, '---')
    lines[start + 1] = render(rule)
    index = start + 2
    touched = 0
    while index < len(lines) and lines[index].startswith('|'):
        row = cells(lines[index])
        key = row[0].strip('`')
        if key not in SHAPES:
            raise SystemExit(f'{name}: no shape declared for row {key}')
        row.insert(at, SHAPES[key])
        lines[index] = render(row)
        index += 1
        touched += 1
    return touched


def main():
    text = open(PATH, encoding='utf8').read()
    lines = text.split('\n')
    total = 0
    for name, sentence in SECTIONS.items():
        head = lines.index(name)
        start = next(i for i in range(head, len(lines)) if lines[i].startswith('| '))
        total += rewrite(lines, start, name)
        lines.insert(start, '')
        lines.insert(start, sentence)
    open(PATH, 'w', encoding='utf8').write('\n'.join(lines))
    sys.stdout.write(f'body rows given a Shape cell: {total}\n')


main()
