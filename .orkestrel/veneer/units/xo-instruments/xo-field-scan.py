# Lists every backticked token in a TSDoc block that names a field of the table the block documents,
# where the words after the token (or after the series it opens) do not supply the noun `field`.
import re, sys
path = sys.argv[1]
text = open(path).read()
pattern = re.compile(r'/\*\*(?P<doc>(?:(?!\*/).)*?)\*/\n(?:export (?:const|interface) (?P<name>\w+)(?P<body>.*?)(?=\n/\*\*|\nexport |\Z))', re.S)
for match in pattern.finditer(text):
	doc, name, body = match.group('doc'), match.group('name'), match.group('body')
	keys = set(re.findall(r'(?:\{\s*|,\s*|\n\s*)(?:readonly\s+)?([a-zA-Z]\w*)\??:\s', body))
	if not keys:
		continue
	line = text[:match.start()].count('\n') + 1
	for token in re.finditer(r'`([^`]+)`', doc):
		if token.group(1) not in keys:
			continue
		after = doc[token.end():]
		# Skip past a series of tokens joined by commas and `and` or `or`.
		series = re.match(r'((?:,?\s*(?:\*\s*)?(?:and|or)?\s*(?:\*\s*)?`[^`]+`)*)\s*(?:\*\s*)?([A-Za-z-]+)?', after)
		follower = (series.group(2) or '').lower()
		if follower in ('field', 'fields', 'key', 'keys', 'member', 'members', 'property', 'properties'):
			continue
		context = doc[max(0, token.start() - 40):token.end() + 40].replace('\n', ' ')
		print(f'{name} (doc at line {line}): `{token.group(1)}` -> {follower!r} :: {context}')
