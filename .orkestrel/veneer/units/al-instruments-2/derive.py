# Derives each partial mutation from the shipped `_alert.scss` file in the worktree, one edit per
# mutation, and writes it to mutations/<name>.scss beside this script.
import pathlib

here = pathlib.Path(__file__).resolve().parent
source = pathlib.Path('/home/user/veneer-al/src/styles/components/_alert.scss').read_text()

heading = '\t.alert-heading {\n\t\tcolor: inherit;\n\t}\n\n'
link = '\t.alert-link {\n\t\tfont-weight: 700;\n\t\tcolor: var(--bs-alert-link-color);\n\t}\n\n'
loop = '\t@each $role in tokens.$aliased {\n\t\t.alert-#{$role} {\n'
warning = (
	'\n\t.alert-warning {\n\t\t--bs-alert-color: #664d03;\n\t\t--bs-alert-bg: #fff3cd;\n'
	'\t\t--bs-alert-border-color: #ffe69c;\n\t\t--bs-alert-link-color: #664d03;\n\t}\n}\n'
)

edits = {
	'slot-literal': [('--bs-alert-padding-x: var(--vn-space-8);', '--bs-alert-padding-x: 1rem;')],
	'literal-padding': [
		('padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);', 'padding: 1rem 1rem;')
	],
	'position-dropped': [('\t\tposition: relative;\n', '')],
	'heading-dropped': [(heading, '')],
	'link-dropped': [(link, '')],
	'dismissible-literal': [('padding-right: var(--vn-space-24);', 'padding-right: 3rem;')],
	'close-left': [('\t\tright: 0;\n', '\t\tleft: 0;\n')],
	'close-plain-alert': [('\t.alert-dismissible .btn-close {', '\t.alert .btn-close {')],
	'lift-sunk': [('\t\tz-index: 2;\n', '\t\tz-index: -1;\n')],
	'lift-dropped': [('\t\tz-index: 2;\n', '')],
	'role-alias': [
		(loop, '\t@each $role in tokens.$aliased {\n\t\t$source: if($role == info, primary, $role);\n\t\t.alert-#{$role} {\n'),
		('var(--bs-#{$role}-', 'var(--bs-#{$source}-'),
	],
	'role-literal': [('\t}\n}\n', '\t}\n' + warning)],
	'loop-roles': [('@each $role in tokens.$aliased', '@each $role in tokens.$roles')],
}

for name, pairs in edits.items():
	text = source
	for old, new in pairs:
		if old not in text:
			raise SystemExit(f'{name}: no match for {old!r}')
		if name != 'role-alias' and text.count(old) != 1:
			raise SystemExit(f'{name}: ambiguous match for {old!r}')
		text = text.replace(old, new)
	(here / 'mutations' / f'{name}.scss').write_text(text)
	print(name)
