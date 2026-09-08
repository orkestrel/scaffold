import re, pathlib

CODE = {
	'TOOL','DEPTH','DEADLOCK','EXPIRE','ANSWER','DATABASE','RELATION','TRANSITION','ABANDONED',
	'MISSING','MODALITY','PATTERN','RANGE','JSON','SSE','GET','POST','PUT','PATCH','HEAD','DELETE',
	'HTTP','URL','LLM','TTL','API','DSL','MCP','SQL','TLS','ESM','UUID','DOM','MIT','ID','JWT','DB',
	'AGENTS','README','TODO','UPPER','SNAKE','NOT_FOUND','UNKNOWN_RELATION','OPTIONS','TEXT',
}
WORD = re.compile(r'\b[A-Z]{2,}(?:-[A-Z]+)*\b')

def fix_segment(seg):
	def repl(m):
		w = m.group(0)
		if w in CODE or any(part in CODE for part in w.split('-')):
			return w
		return w.lower()
	return WORD.sub(repl, seg)

def fix_line(line):
	out = []
	# keep code spans and {@link} tags untouched
	for part in re.split(r'(`[^`]*`|\{@link[^}]*\})', line):
		if part.startswith('`') or part.startswith('{@link'):
			out.append(part)
		else:
			out.append(fix_segment(part))
	return ''.join(out)

changed = 0
for f in sorted(pathlib.Path('src').rglob('*.ts')):
	lines = f.read_text().split('\n')
	new = []
	for line in lines:
		s = line.strip()
		if s.startswith('*') or s.startswith('/**'):
			fixed = fix_line(line)
			if fixed != line:
				changed += 1
			new.append(fixed)
		else:
			new.append(line)
	f.write_text('\n'.join(new))
print('doc-comment lines changed:', changed)
