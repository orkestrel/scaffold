import re, pathlib, sys

CODE = {
	'TOOL','DEPTH','DEADLOCK','EXPIRE','ANSWER','DATABASE','RELATION','TRANSITION','ABANDONED',
	'MISSING','MODALITY','PATTERN','RANGE','JSON','SSE','GET','POST','PUT','PATCH','HEAD','DELETE',
	'HTTP','URL','LLM','TTL','API','DSL','MCP','SQL','TLS','ESM','UUID','DOM','MIT','ID','JWT','DB',
	'AGENTS','README','TODO','UPPER','SNAKE','NOT_FOUND','UNKNOWN_RELATION','OPTIONS','TEXT',
}

def scan(paths):
	hits = {}
	for f in paths:
		text = f.read_text()
		for n, line in enumerate(text.split('\n'), 1):
			stripped = line.strip()
			if not (stripped.startswith('*') or stripped.startswith('/**')):
				continue
			# drop code spans and inline code before scanning
			bare = re.sub(r'`[^`]*`', '', line)
			bare = re.sub(r'\{@link[^}]*\}', '', bare)
			for w in re.findall(r'\b[A-Z]{2,}(?:-[A-Z]+)*\b', bare):
				if w in CODE:
					continue
				hits.setdefault(w, []).append(f'{f}:{n}')
	return hits

paths = sorted(pathlib.Path('src').rglob('*.ts'))
hits = scan(paths)
for w in sorted(hits, key=lambda k: -len(hits[k])):
	print(f'{w:22} {len(hits[w])}')
