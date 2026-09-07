"""Writes one doc block above each interface member named in the work file."""
import re, sys, textwrap

FILES = ['src/core/types.ts', 'src/server/types.ts']
WIDTH = 88

def wrap(text):
	body = textwrap.wrap(text, width=WIDTH)
	if len(body) == 1 and len(body[0]) <= WIDTH - 6:
		return ['\t/** ' + body[0] + ' */']
	return ['\t/**'] + ['\t * ' + line for line in body] + ['\t */']

work = {}
for raw in open('tmp/d7n-browser-converge/methods.tsv'):
	key, _, text = raw.rstrip('\n').partition('\t')
	work[key] = text

written = []
for path in FILES:
	lines = open(path).read().split('\n')
	out = []
	current = None
	depth = 0
	for line in lines:
		head = re.match(r'^export interface (\w+)', line)
		if head is not None:
			current = head.group(1)
			depth = 0
			out.append(line)
			depth += line.count('{') - line.count('}')
			continue
		if current is not None:
			if depth == 1:
				member = re.match(r'^\t(?:readonly )?(\w+)(\??)[(<]', line)
				if member is not None:
					key = f'{current}.{member.group(1)}'
					text = work.get(key)
					if text is not None and not out[-1].rstrip().endswith('*/'):
						out.extend(wrap(text))
						written.append(key)
			depth += line.count('{') - line.count('}')
			if depth <= 0:
				current = None
		out.append(line)
	open(path, 'w').write('\n'.join(out))

missing = [k for k in work if k not in written]
print('written', len(written))
print('missing', missing)
