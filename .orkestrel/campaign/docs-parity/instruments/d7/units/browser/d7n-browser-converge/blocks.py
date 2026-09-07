"""Replaces the description paragraph of the doc block above each named export."""
import re, sys, textwrap

FILES = [
	'src/core/types.ts', 'src/core/constants.ts', 'src/core/errors.ts', 'src/core/factories.ts',
	'src/core/helpers.ts', 'src/core/parsers.ts', 'src/core/compilers.ts',
	'src/server/types.ts', 'src/server/constants.ts', 'src/server/errors.ts',
	'src/server/factories.ts', 'src/server/helpers.ts',
	'src/core/CDPClient.ts', 'src/core/BrowserContext.ts', 'src/core/BrowserFrame.ts',
	'src/core/BrowserPage.ts', 'src/core/BrowserCodegen.ts', 'src/core/BrowserSnapshot.ts',
	'src/server/Browser.ts', 'src/server/transports/WebSocketCDPTransport.ts',
	'src/server/writers/FileBrowserWriter.ts',
]
WIDTH = 92

def render(text, indent, single):
	body = textwrap.wrap(text, width=WIDTH - len(indent.expandtabs(2)))
	if single and len(body) == 1 and len(body[0]) <= WIDTH - len(indent.expandtabs(2)) - 6:
		return [f'{indent}/** {body[0]} */']
	return [f'{indent}/**'] + [f'{indent} * {line}' for line in body] + [f'{indent} */']

work = {}
for raw in open(sys.argv[1]):
	key, _, text = raw.rstrip('\n').partition('\t')
	if key.startswith('#') or key == '':
		continue
	work[key] = text

done = set()
for path in FILES:
	try:
		lines = open(path).read().split('\n')
	except FileNotFoundError:
		continue
	moved = False
	for key, text in work.items():
		kind, _, name = key.partition(' ')
		pattern = re.compile(rf'^export (?:async )?(?:declare )?{kind} {re.escape(name)}\b')
		at = next((i for i, l in enumerate(lines) if pattern.match(l)), None)
		if at is None:
			continue
		end = at - 1
		while lines[end].strip() == '':
			end -= 1
		assert lines[end].rstrip().endswith('*/'), (path, key, lines[end])
		start = end
		while not lines[start].lstrip().startswith('/**'):
			start -= 1
		indent = lines[start][:len(lines[start]) - len(lines[start].lstrip())]
		# the description runs to the first blank comment line, or to the block's end
		stop = start + 1
		if lines[start].rstrip().endswith('*/'):
			stop = end + 1
		else:
			while stop <= end and lines[stop].strip() != '*' and not lines[stop].strip().startswith('*/'):
				stop += 1
		tail = [] if stop > end else lines[stop:end + 1]
		block = render(text, indent, not tail)
		if tail:
			block = block[:-1] + tail
		lines[start:end + 1] = block
		done.add(key)
		moved = True
	if moved:
		open(path, 'w').write('\n'.join(lines))

missing = [k for k in work if k not in done]
print('rewritten', len(done))
if missing:
	print('MISSING', missing)
