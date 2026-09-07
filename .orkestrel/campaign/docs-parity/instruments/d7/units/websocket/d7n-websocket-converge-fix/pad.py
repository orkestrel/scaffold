from pathlib import Path
import re

p = Path('guides/websocket.md')
lines = p.read_text(encoding='utf8').split('\n')
SPLIT = re.compile(r'(?<!\\)\|')


def cells(line):
    parts = SPLIT.split(line)
    assert parts[0].strip() == '' and parts[-1].strip() == '', line
    return [part.strip() for part in parts[1:-1]]


out = []
index = 0
padded = 0
while index < len(lines):
    if not lines[index].startswith('|'):
        out.append(lines[index])
        index += 1
        continue
    end = index
    while end + 1 < len(lines) and lines[end + 1].startswith('|'):
        end += 1
    table = [cells(line) for line in lines[index:end + 1]]
    width = len(table[0])
    assert all(len(row) == width for row in table), table[0]
    body = [table[0]] + table[2:]
    widths = [max(len(row[column]) for row in body) for column in range(width)]
    rendered = []
    for position, row in enumerate(body):
        rendered.append('| ' + ' | '.join(row[column].ljust(widths[column]) for column in range(width)) + ' |')
        if position == 0:
            rendered.append('| ' + ' | '.join('-' * widths[column] for column in range(width)) + ' |')
    if rendered != lines[index:end + 1]:
        padded += 1
    out.extend(rendered)
    index = end + 1

p.write_text('\n'.join(out), encoding='utf8')
print(f'tables repadded: {padded}')
