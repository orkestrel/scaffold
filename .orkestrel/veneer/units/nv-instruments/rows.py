"""Formats a guide table row to the column widths of the table it joins, and inserts rows after an anchor."""
import re, sys

def widths(sep_line):
    cells = sep_line.strip().strip('|').split('|')
    return [len(c) - 2 for c in cells]

def row(cells, ws):
    out = []
    for c, w in zip(cells, ws):
        if len(c) > w:
            raise SystemExit(f'cell wider than column ({len(c)} > {w}): {c[:60]}')
        out.append(' ' + c.ljust(w) + ' ')
    return '|' + '|'.join(out) + '|'

def table_sep(lines, index):
    # Walks up from a row to the separator line of its table.
    i = index
    while not re.match(r'^\|\s*-', lines[i]):
        i -= 1
    return lines[i]
