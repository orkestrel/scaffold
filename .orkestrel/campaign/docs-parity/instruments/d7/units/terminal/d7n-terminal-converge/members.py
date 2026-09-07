import re
import pathlib

WIDTH = 100
TAB = 2


def wrap(text, indent):
    limit = WIDTH - (indent * TAB + 3)
    guarded = re.sub(r'\{@link[^}]*\}', lambda m: m.group(0).replace(' ', '\x00'), text)
    lines, current = [], ''
    for word in [w.replace('\x00', ' ') for w in guarded.split(' ')]:
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


def block(text, indent):
    pad = '\t' * indent
    if indent * TAB + len('/** ') + len(text) + len(' */') <= WIDTH:
        return f'{pad}/** {text} */\n'
    out = [f'{pad}/**']
    for line in wrap(text, indent):
        out.append(f'{pad} * {line}')
    out.append(f'{pad} */')
    return '\n'.join(out) + '\n'


def document(path, interface, member, text, indent=1):
    """Gives one interface member the doc block whose description a `Summary` cell carries."""
    p = pathlib.Path(path)
    source = p.read_text()
    head = re.search(r'^export interface %s\b[^{]*\{$' % re.escape(interface), source, re.M)
    assert head is not None, (path, interface)
    close = source.index('\n}\n', head.end())
    pattern = re.compile(r'^(\t{%d})(readonly )?%s(?=[(:?<])' % (indent, re.escape(member)), re.M)
    m = pattern.search(source, head.end(), close)
    assert m is not None, (path, interface, member)
    before = source[: m.start()]
    if before.rstrip().endswith('*/'):
        return
    p.write_text(before + block(text, indent) + source[m.start() :])
