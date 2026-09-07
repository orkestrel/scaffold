"""Replaces one doc block's description paragraph, rewrapped to the block's width."""

import re
import pathlib

WIDTH = 100
TAB = 2


def wrap(text, indent):
    prefix_cols = indent * TAB + 3  # ' * '
    limit = WIDTH - prefix_cols
    guarded = re.sub(r'\{@link[^}]*\}', lambda m: m.group(0).replace(' ', '\x00'), text)
    words = [word.replace('\x00', ' ') for word in guarded.split(' ')]
    lines = []
    current = ''
    for word in words:
        if current == '':
            current = word
        elif len(current) + 1 + len(word) <= limit:
            current += ' ' + word
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def set_description(path, symbol, text, member=False):
    p = pathlib.Path(path)
    source = p.read_text()
    if member:
        pattern = re.compile(
            r'(?P<block>/\*\*(?:[^*]|\*(?!/))*\*/)(?P<gap>\n)(?P<indent>\t*)'
            + re.escape(symbol)
            + r'(?=[(<?])'
        )
    else:
        pattern = re.compile(
            r'(?P<block>/\*\*(?:[^*]|\*(?!/))*\*/)(?P<gap>\n)(?P<indent>\t*)export '
            r'(?:abstract )?(?:async )?(?:function|const|class|interface|type) '
            + re.escape(symbol)
            + r'\b'
        )
    matches = list(pattern.finditer(source))
    assert len(matches) == 1, (path, symbol, len(matches))
    m = matches[0]
    block = m.group('block')
    indent = len(m.group('indent'))
    body = block[3:-2]
    raw = body.split('\n')
    stripped = [re.sub(r'^\s*\*[ \t]?', '', line) for line in raw]
    # Locate where the description paragraph ends.
    start = 0
    while start < len(stripped) and stripped[start].strip() == '':
        start += 1
    end = start
    while end < len(stripped):
        s = stripped[end].strip()
        if s == '' or s.startswith('@'):
            break
        end += 1
    rest = stripped[end:]
    while rest and rest[0].strip() == '':
        rest = rest[1:]
    while rest and rest[-1].strip() == '':
        rest = rest[:-1]
    pad = '\t' * indent
    lines = wrap(text, indent)
    if not rest and len(lines) == 1 and indent * TAB + len('/** ') + len(text) + len(' */') <= WIDTH:
        rebuilt = f'/** {text} */'
    else:
        out = ['/**']
        for line in lines:
            out.append(f'{pad} * {line}')
        if rest:
            out.append(f'{pad} *')
            for line in rest:
                out.append((f'{pad} * {line}').rstrip())
        out.append(f'{pad} */')
        rebuilt = '\n'.join(out)
    source = source[: m.start('block')] + rebuilt + source[m.end('block') :]
    p.write_text(source)
