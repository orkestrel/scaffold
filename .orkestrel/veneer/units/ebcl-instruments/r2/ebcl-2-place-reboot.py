# Moves each class's button reboot case into the test file of the partial that writes its include:
# adds the reader and case-table imports and appends one describe block per file.
import re
root = 'tests/src/styles/components/'
files = {
	'close': ['btn-close'],
	'navbar': ['navbar-toggler'],
	'accordion': ['accordion-button'],
	'dropdown': ['dropdown-item'],
	'nav': ['nav-link'],
	'list-group': ['list-group-item'],
	'pagination': ['page-link'],
	'carousel': ['carousel-control-prev', 'carousel-control-next', 'carousel indicator'],
}
TITLE = "resolves the {name} button form apart from its counterpart on the same longhands, at the same button values, as the release does, at rest, hovered, pressed, under keyboard focus, and disabled"
BODY = """		const {{ veneer, release }} = await readFormDifferences(
			{pair},
			BUTTON_REBOOT_STATES,
			BUTTON_REBOOT_HOLDER_STYLE,
		)
		// A reading that told no button from its counterpart would pass by agreeing on nothing, and
		// the button appearance separates the two in every state on the release's page.
		for (const difference of Object.values(release))
			expect(Object.keys(difference)).toContain('appearance')
		expect(veneer).toEqual(release)
"""

def add_names(text, module, names):
	pattern = re.compile(r"import \{([^}]*)\} from '\.\./\.\./\.\./" + re.escape(module) + r"'")
	match = pattern.search(text)
	assert match, module
	current = [name.strip() for name in match.group(1).split(',') if name.strip()]
	merged = sorted(set(current) | set(names), key=str.lower)
	block = "import {\n" + ''.join(f"\t{name},\n" for name in merged) + "} from '../../../" + module + "'"
	return text[: match.start()] + block + text[match.end():]

for stem, names in files.items():
	path = root + stem + '.test.ts'
	text = open(path).read()
	text = add_names(text, 'setupBrowser.js', ['readFormDifferences'])
	text = add_names(text, 'setupStyles.js', ['BUTTON_REBOOT_CASES', 'BUTTON_REBOOT_HOLDER_STYLE', 'BUTTON_REBOOT_STATES'])
	if len(names) == 1:
		name = names[0]
		block = (
			f"\ndescribe('{name} button reboot', () => {{\n"
			f"\tit('{TITLE.format(name=name)}', async () => {{\n"
			f"\t\tconst pair = requireValue(\n\t\t\tBUTTON_REBOOT_CASES.find(({{ name }}) => name === '{name}'),\n\t\t\t'No {name} case',\n\t\t)\n"
			+ BODY.format(pair='pair')
			+ "\t})\n})\n"
		)
	else:
		listed = ''.join(f"\t\t'{name}',\n" for name in names)
		block = (
			"\ndescribe('carousel button reboot', () => {\n"
			"\tit.each(\n\t\t[\n" + listed + "\t\t].map((name) =>\n\t\t\trequireValue(\n\t\t\t\tBUTTON_REBOOT_CASES.find((pair) => pair.name === name),\n\t\t\t\t`No ${name} case`,\n\t\t\t),\n\t\t),\n\t)(\n"
			f"\t\t'{TITLE.format(name='$name')}',\n"
			"\t\tasync (pair) => {\n"
			+ '\n'.join(('\t' + line) if line else line for line in BODY.format(pair='pair').split('\n'))
			+ "\t\t},\n\t)\n})\n"
		)
	text = text.rstrip('\n') + '\n' + block
	open(path, 'w').write(text)
	print('placed', stem)
