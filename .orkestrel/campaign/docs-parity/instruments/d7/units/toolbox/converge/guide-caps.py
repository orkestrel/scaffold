import re, pathlib

CODE = {
	'TOOL','DEPTH','DEADLOCK','EXPIRE','ANSWER','DATABASE','RELATION','TRANSITION','ABANDONED',
	'MISSING','MODALITY','PATTERN','RANGE','JSON','SSE','GET','POST','PUT','PATCH','HEAD','DELETE',
	'HTTP','URL','LLM','TTL','API','DSL','MCP','SQL','TLS','ESM','UUID','DOM','MIT','ID','JWT','DB',
	'AGENTS','README','TODO','UPPER','SNAKE','NOT_FOUND','UNKNOWN_RELATION','TEXT','OK',
}
WORD = re.compile(r'\b[A-Z]{2,}(?:-[A-Z]+)*\b')

def fix_seg(seg):
	def repl(m):
		w = m.group(0)
		if w in CODE or any(part in CODE for part in w.split('-')):
			return w
		return w.lower()
	return WORD.sub(repl, seg)

def fix_prose(line):
	out = []
	for part in re.split(r'(`[^`]*`)', line):
		out.append(part if part.startswith('`') else fix_seg(part))
	return ''.join(out)

p = pathlib.Path('guides/toolbox.md')
lines = p.read_text().split('\n')
infence = False
new = []
changed = []
for i, line in enumerate(lines, 1):
	if line.startswith('```'):
		infence = not infence
		new.append(line)
		continue
	if line.startswith('|'):
		new.append(line)
		continue
	if infence:
		idx = line.find('//')
		if idx == -1:
			new.append(line)
			continue
		fixed = line[:idx] + fix_prose(line[idx:])
	else:
		fixed = fix_prose(line)
	if fixed != line:
		changed.append(i)
	new.append(fixed)
p.write_text('\n'.join(new))
print('lines changed:', len(changed), changed[:40])
