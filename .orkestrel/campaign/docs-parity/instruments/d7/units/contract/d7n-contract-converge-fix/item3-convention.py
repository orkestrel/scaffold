from pathlib import Path

path = Path('guides/contract.md')
text = path.read_text(encoding='utf8')

CANON = (
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an\n"
	"optional member and `plus` introducing its call-signature members, and a type alias's own type\n"
	"literal with a union's arms escaped as `\\|`."
)

types_old = "A `Shape` cell holds an interface's members in braces, and a type alias's value.\n"
shapes_old = (
	"A `Shape` cell holds an interface's members in braces, and a type alias's value. A resolver\n"
	"whose value is a multi-branch conditional carries none, and its `Summary` states what the\n"
	"resolution produces.\n"
)
shapes_new = (
	CANON
	+ " A resolver whose value is a multi-branch conditional carries\n"
	+ "none, and its `Summary` states what the resolution produces.\n"
)

assert text.count(shapes_old) == 1, 'shape-types convention sentence not unique'
text = text.replace(shapes_old, shapes_new)
assert text.count(types_old) == 1, 'types convention sentence not unique'
text = text.replace(types_old, CANON + '\n')

path.write_text(text, encoding='utf8')
print('ok')
