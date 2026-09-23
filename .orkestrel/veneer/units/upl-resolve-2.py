#!/usr/bin/env python3
"""upl-resolve-2.py: resolve the UTIL-PLACEMENT round-4 patches' three-way conflicts on the session tip (the TOGGLES
landing over e4e6a40), read from diff3-style blocks (`git -c merge.conflictStyle=diff3 apply --3way`, each block
carrying ours, base, and theirs). Supersedes upl-resolve.py, whose union rules dropped a side's deletions. Rules:
(A) an `@source not inline("…")` line on every side resolves to ours' tokens minus every base token either side
removed, plus the tokens theirs added, each once; (B) a block whose ours and theirs lines are table rows is left as
ours then theirs, because table-merge3.py rebuilds each conflicted table whole from the base afterwards; (C) a prose
block is merged sentence by sentence: the base sentences with ours' and theirs' insertions, deletions, and
replacements applied where the other side left that region equal (ours' insertion first at a shared anchor), refused
by name where both sides change one base region differently, and the enclosing paragraph re-flowed at 100 columns;
(L) a block whose every line on every side is one Markdown link item ending in `,` or `, and` (the guide's § Tests
list) resolves to ours' items then theirs' items absent from ours, every item ending in `,` and the last in `, and`;
(D) every other block keeps ours then theirs (an append conflict at a landed insertion point). `table-merge3.py`,
`land-seams.py`, and `sort-inventories.py` follow. Prints each file's block count and each rule C merge's shape."""
import re, sys, subprocess, difflib, textwrap
files = [l[3:] for l in subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True).stdout.split('\n') if l.startswith('UU')]
pat = re.compile(r'<<<<<<< ours\n(.*?)\|\|\|\|\|\|\| base\n(.*?)=======\n(.*?)>>>>>>> theirs\n', re.S)
src = re.compile(r'^(\s*@source not inline\(")([^"]*)("\).*)$')
MARK = '\x00REFLOW\x00'
link = re.compile(r'^(\[[^\]]+\]\([^)]+\)),( and)?$')
def is_links(ls):
	return bool(ls) and all(link.match(l) for l in ls)
def links(ol, tl):
	items = [link.match(l).group(1) for l in ol]
	for l in tl:
		item = link.match(l).group(1)
		if item not in items:
			items.append(item)
	return ''.join(item + (', and\n' if i == len(items) - 1 else ',\n') for i, item in enumerate(items))
def lines(s):
	return [l for l in s.strip('\n').split('\n')] if s.strip('\n') else []
def tokens(o, b, t):
	mo, mb, mt = src.match(o), src.match(b), src.match(t)
	if not (mo and mb and mt) or len({mo.group(1), mb.group(1), mt.group(1)}) != 1 or len({mo.group(3), mb.group(3), mt.group(3)}) != 1:
		sys.exit('source line shape differs: ' + repr(o[:60]))
	a, base, c = mo.group(2).split(), mb.group(2).split(), mt.group(2).split()
	removed = {x for x in base if x not in a or x not in c}
	out = [x for x in a if x not in removed]
	for x in c:
		if x not in out and x not in removed:
			out.append(x)
	return mo.group(1) + ' '.join(out) + mo.group(3) + '\n'
def is_table(ls):
	return bool(ls) and all(l.startswith('| ') or l.startswith('|-') or l.startswith('| -') for l in ls)
def is_prose(ls):
	return bool(ls) and not any(l.startswith(('|', '```', '- ', '* ', '#', '\t', ' ')) for l in ls) and not any(src.match(l) for l in ls)
def sentences(ls):
	flat = ' '.join(l.strip() for l in ls)
	return [s for s in re.split(r'(?<=[.!?])\s+(?=[A-Z`(])', flat) if s]
def merge(b, o, t):
	co = [(i1, i2, o[j1:j2]) for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, b, o, autojunk=False).get_opcodes() if tag != 'equal']
	ct = [(i1, i2, t[j1:j2]) for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, b, t, autojunk=False).get_opcodes() if tag != 'equal']
	for a1, a2, _ in co:
		for b1, b2, _ in ct:
			if a1 == a2 and b1 == b2:
				continue
			if a1 < b2 and b1 < a2:
				return None
			if (a1 == a2 and b1 < a1 < b2) or (b1 == b2 and a1 < b1 < a2):
				return None
	out, pos = [], 0
	for i1, i2, r, side in sorted([(i1, i2, r, 0) for i1, i2, r in co] + [(i1, i2, r, 1) for i1, i2, r in ct], key=lambda x: (x[0], x[3])):
		out += b[pos:i1]
		out += r
		pos = max(pos, i2)
	out += b[pos:]
	return out, len(co), len(ct)
report = []
for f in files:
	s = open(f).read()
	shapes = []
	def resolve(m):
		ours, base, theirs = m.group(1), m.group(2), m.group(3)
		ol, bl, tl = lines(ours), lines(base), lines(theirs)
		if len(ol) == 1 and len(bl) == 1 and len(tl) == 1 and src.match(ol[0]) and src.match(tl[0]):
			return tokens(ol[0], bl[0], tl[0])
		if is_links(ol) and is_links(bl) and is_links(tl):
			shapes.append('link list')
			return links(ol, tl)
		if is_table(ol) and is_table(tl):
			shapes.append('table (rebuilt by table-merge3.py)')
			return ours + theirs
		if is_prose(ol) and is_prose(bl) and is_prose(tl):
			merged = merge(sentences(bl), sentences(ol), sentences(tl))
			if merged is None:
				sys.exit(f'prose collision refused in {f}: ours {ol[0][:70]!r} theirs {tl[0][:70]!r}')
			out, no, nt = merged
			shapes.append(f'prose: base {len(sentences(bl))} sentences, ours changed {no} region(s), theirs changed {nt}')
			return MARK + ' '.join(out) + '\n'
		return ours + theirs
	n = len(pat.findall(s))
	s2 = pat.sub(resolve, s)
	if '<<<<<<<' in s2 or '>>>>>>>' in s2 or '|||||||' in s2:
		sys.exit(f'unresolved markers in {f}')
	if MARK in s2:
		paragraphs = s2.split('\n\n')
		for i, p in enumerate(paragraphs):
			if MARK in p:
				flat = ' '.join(l.strip() for l in p.replace(MARK, '').split('\n') if l.strip())
				paragraphs[i] = textwrap.fill(flat, width=100, break_long_words=False, break_on_hyphens=False)
		s2 = '\n\n'.join(paragraphs)
	open(f, 'w').write(s2)
	report.append(f'{f}: {n} block(s)' + (' — ' + '; '.join(shapes) if shapes else ''))
print('\n'.join(report))
