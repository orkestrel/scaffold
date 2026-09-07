#!/usr/bin/env python3
"""Re-render a Markdown table region with columns padded to their widest cell."""
import sys, pathlib, re

def split_row(row):
    parts = re.split(r'(?<!\\)\|', row)
    return [p for p in parts[1:-1]]

def render(cells, widths):
    return '|' + '|'.join(' ' + c.ljust(w) + ' ' for c, w in zip(cells, widths)) + '|'

def rewrite(path, start, end, transform):
    lines = pathlib.Path(path).read_text().split('\n')
    region = lines[start - 1:end]
    rows = [split_row(r) for r in region]
    body = [[c.strip() for c in r] for r in rows]
    sep_index = 1
    for i, r in enumerate(body):
        if i == sep_index:
            continue
        body[i] = transform(r, i)
    widths = [0] * len(body[0])
    for i, r in enumerate(body):
        if i == sep_index:
            continue
        for j, c in enumerate(r):
            widths[j] = max(widths[j], len(c))
    out = []
    for i, r in enumerate(body):
        if i == sep_index:
            out.append(render(['-' * w for w in widths], widths))
        else:
            out.append(render(r, widths))
    lines[start - 1:end] = out
    pathlib.Path(path).write_text('\n'.join(lines))
