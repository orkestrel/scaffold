import re, sys, json
# usage: sweep.py FILE -> JSON list of hits
VERBS = 'is are reads writes carries names sits holds follows loads ships keeps takes returns emits paints binds drives records refuses omits moves leaves stays becomes means covers lists adds declares compiles resolves matches includes uses sets has have does can may will reaches answers renders mounts'.split()
TOKEN = re.compile(r'(``[^`]+``|`[^`]+`)(,| (?:' + '|'.join(VERBS) + r')\b)')
LINK = re.compile(r'\[([^\]]+)\]\(([^)\s]+)\)')
path = sys.argv[1]
lines = open(path, encoding='utf8').read().split('\n')
hits, fence, section, sub = [], False, '', ''
# Build blocks of consecutive non-blank lines outside fences, joined, with an offset map to lines.
block, starts = [], []
def flush():
    if not block: return
    text = ''
    offsets = []
    for n, l in block:
        offsets.append((len(text), n))
        text += (l.strip() if text else l) + ' '
    kind = 'table' if block[0][1].lstrip().startswith('|') else ('heading' if block[0][1].startswith('#') else 'prose')
    def line_of(pos):
        ln = offsets[0][1]
        for off, n in offsets:
            if off <= pos: ln = n
        return ln
    for m in TOKEN.finditer(text):
        tail = text[m.end():m.end()+40]
        hits.append({'rule': 'token', 'line': line_of(m.start()), 'section': heading, 'kind': kind,
                     'quote': (m.group(0) + tail.split(' ')[0] if m.group(2) == ',' else m.group(0)).strip(),
                     'context': text[max(0, m.start()-60):m.end()+240]})
    for m in LINK.finditer(text):
        before = text[max(0, m.start()-12):m.start()]
        if kind in ('prose','table') and not re.search(r'\bsee\s+$', before, re.I) and not re.search(r'(,|\band)\s+$', before):
            hits.append({'rule': 'link', 'line': line_of(m.start()), 'section': heading, 'kind': kind,
                         'quote': m.group(0), 'context': text[max(0, m.start()-60):m.end()+20]})
    block.clear()
heading = ''
for i, l in enumerate(lines, 1):
    if l.startswith('```'):
        flush(); fence = not fence; continue
    if fence: continue
    if not l.strip():
        flush(); continue
    if l.startswith('#'):
        flush(); heading = l.strip(); block.append((i, l)); flush(); continue
    block.append((i, l))
flush()
json.dump(hits, sys.stdout, indent=0)
