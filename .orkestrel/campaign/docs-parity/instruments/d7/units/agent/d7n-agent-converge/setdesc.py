import re, sys, textwrap, pathlib

def find_block(lines, idx):
    """Return (start, end) of the doc block immediately above line idx, or None."""
    j = idx - 1
    while j >= 0 and lines[j].strip() == '':
        j -= 1
    if j < 0 or not lines[j].strip().endswith('*/'):
        return None
    end = j
    while j >= 0 and not lines[j].strip().startswith('/**'):
        j -= 1
    return (j, end)

def set_desc(path, anchor, text, indent=''):
    p = pathlib.Path(path)
    lines = p.read_text().split('\n')
    hits = [i for i, l in enumerate(lines) if l.startswith(anchor)]
    if len(hits) != 1:
        raise SystemExit(f'anchor {anchor!r} matched {len(hits)} lines in {path}')
    span = find_block(lines, hits[0])
    if span is None:
        raise SystemExit(f'no doc block above {anchor!r} in {path}')
    start, end = span
    body = lines[start:end + 1]
    # strip the fence
    inner = []
    for l in body:
        t = l.strip()
        if t.startswith('/**'):
            t = t[3:].strip()
        if t.endswith('*/'):
            t = t[:-2].rstrip()
        if t.startswith('*'):
            t = t[1:]
            if t.startswith(' '):
                t = t[1:]
        inner.append(t)
    # find the first block-tag line
    cut = len(inner)
    for i, l in enumerate(inner):
        if l.lstrip().startswith('@'):
            cut = i
            break
    tail = inner[cut:]
    while tail and tail[0].strip() == '':
        tail = tail[1:]
    width = 100 - len(indent) - 3
    wrapped = textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)
    out = [f'{indent}/**']
    for l in wrapped:
        out.append(f'{indent} * {l}'.rstrip())
    if tail:
        out.append(f'{indent} *')
        for l in tail:
            out.append(f'{indent} * {l}'.rstrip() if l.strip() else f'{indent} *')
    out.append(f'{indent} */')
    lines[start:end + 1] = out
    p.write_text('\n'.join(lines))

if __name__ == '__main__':
    set_desc(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else '')
