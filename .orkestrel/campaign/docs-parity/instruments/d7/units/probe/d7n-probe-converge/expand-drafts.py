import re

PATH = 'src/core/types.ts'
PATTERN = re.compile(
	r"""^( \* )(\t+)\{ (path: '[^']+'), (text: "(?:[^"\\]|\\.)*") \},$""",
	re.M,
)


def expand(match: 're.Match[str]') -> str:
	lead, tabs, path, text = match.group(1), match.group(2), match.group(3), match.group(4)
	inner = tabs + '\t'
	return f"{lead}{tabs}{{\n{lead}{inner}{path},\n{lead}{inner}{text},\n{lead}{tabs}}},"


source = open(PATH).read()
rewritten, count = PATTERN.subn(expand, source)
print('expanded', count)
open(PATH, 'w').write(rewritten)
