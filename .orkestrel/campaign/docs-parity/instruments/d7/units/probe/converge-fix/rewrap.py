import pathlib, re, sys

WIDTH = 100
SKIP = {34, 147}  # the fleet-canonical Shape convention sentence, kept on one line
p = pathlib.Path('guides/probe.md')
lines = p.read_text().split('\n')

fenced = set()
inside = False
for i, line in enumerate(lines, 1):
	if line.startswith('```'):
		inside = not inside
		fenced.add(i)
		continue
	if inside:
		fenced.add(i)

BULLET = re.compile(r'^(\s*)([-*] |\d+\. )')
BREAKER = re.compile(r'^(\s*$|#|\||```)')

def is_break(line):
	return bool(BREAKER.match(line))

def block(n):
	start = n
	while start > 1:
		if BULLET.match(lines[start - 1]):
			break
		if is_break(lines[start - 2]) or BULLET.match(lines[start - 2]):
			break
		start -= 1
	end = n
	while end < len(lines):
		nxt = lines[end]
		if is_break(nxt) or BULLET.match(nxt):
			break
		end += 1
	return start, end

targets = sorted(
	{
		i
		for i, line in enumerate(lines, 1)
		if len(line) > WIDTH and not line.startswith('|') and i not in fenced and i not in SKIP
	}
)
blocks = sorted({block(n) for n in targets}, reverse=True)

for start, end in blocks:
	chunk = lines[start - 1 : end]
	m = BULLET.match(chunk[0])
	if m:
		head = m.group(0)
		indent = ' ' * len(head)
	else:
		head = re.match(r'^\s*', chunk[0]).group(0)
		indent = head
	words = ' '.join(line.strip() for line in chunk).split(' ')
	out, current = [], head
	for word in words:
		candidate = current + word if current in (head, indent) else current + ' ' + word
		if len(candidate) > WIDTH and current not in (head, indent):
			out.append(current)
			current = indent + word
		else:
			current = candidate
	out.append(current)
	for line in out[1:]:
		if BULLET.match(line) or line.lstrip().startswith(('#', '|', '>', '```')):
			sys.exit(f'block {start}-{end}: continuation line would read as markup: {line!r}')
	lines[start - 1 : end] = out

p.write_text('\n'.join(lines))
print(f'rewrapped blocks: {[b for b in reversed(blocks)]}')
