# Applies each E-ID-CODE mutation to one owned partial, rebuilds, runs the owned proofs, and restores the partial
# byte for byte, checking the restore by SHA-256. Log: tmp/units/logs/mutation-<id>.log.txt; summary on stdout.
import hashlib, subprocess, pathlib, re
root = pathlib.Path('/home/user/veneer-eic')
tests = ['tests/src/styles/elements/code.test.ts', 'tests/src/styles/elements/pre.test.ts',
         'tests/src/styles/elements/kbd.test.ts', 'tests/src/styles/elements/samp.test.ts']
E = 'src/styles/elements/'
mutations = [
	('m01-pre-code-font-size', E + '_code.scss', '\t\tfont-size: inherit;\n\t\tcolor: inherit;\n\t\tword-break', '\t\tcolor: inherit;\n\t\tword-break'),
	('m02-pre-code-color', E + '_code.scss', '\t\tfont-size: inherit;\n\t\tcolor: inherit;\n', '\t\tfont-size: inherit;\n'),
	('m03-pre-code-word-break', E + '_code.scss', '\t\tword-break: normal;\n', ''),
	('m04-pre-code-padding', E + '_code.scss', '\t\tword-break: normal;\n\t\tpadding: 0;\n', '\t\tword-break: normal;\n'),
	('m05-pre-code-background', E + '_code.scss', '\t\tpadding: 0;\n\t\tbackground-color: transparent;\n\t\tborder-radius: 0;\n', '\t\tpadding: 0;\n\t\tborder-radius: 0;\n'),
	('m06-pre-code-radius', E + '_code.scss', '\t\tborder-radius: 0;\n', ''),
	('m07-link-code-rule', E + '_code.scss', '\n\ta > code {\n\t\tcolor: inherit;\n\t}\n', '\n'),
	('m08-link-code-hover', E + '_code.scss', '\ta > code {', '\ta:not(:hover) > code {'),
	('m09-nested-key-size', E + '_kbd.scss', '\t\tfont-size: 1em;\n', ''),
	('m10-nested-key-padding', E + '_kbd.scss', '\tkbd kbd {\n\t\tpadding: 0;\n', '\tkbd kbd {\n'),
	('m11-nested-key-border', E + '_kbd.scss', '\t\tborder: 0;\n', ''),
	('m12-nested-key-background', E + '_kbd.scss', '\t\tfont-size: 1em;\n\t\tbackground-color: transparent;\n', '\t\tfont-size: 1em;\n'),
	('m13-kbd-border-hook', E + '_kbd.scss', 'border: var(--bs-border-width) solid', 'border: var(--vn-border-width) solid'),
	('m14-pre-border-hook', E + '_pre.scss', 'border: var(--bs-border-width) solid', 'border: var(--vn-border-width) solid'),
	('m15-samp-radius', E + '_samp.scss', '\t\t@include code-surface(var(--vn-surface-raised));\n', '\t\tbackground-color: var(--vn-surface-raised);\n'),
]
for ident, rel, old, new in mutations:
	path = root / rel
	original = path.read_bytes()
	before = hashlib.sha256(original).hexdigest()
	text = original.decode()
	assert text.count(old) == 1, (ident, 'site not unique')
	path.write_text(text.replace(old, new))
	log = root / f'tmp/units/logs/mutation-{ident}.log.txt'
	try:
		subprocess.run(['bash', str(root / 'tmp/units/eic-run.sh'), str(log), *tests], cwd=root, capture_output=True)
	finally:
		path.write_bytes(original)
	after = hashlib.sha256(path.read_bytes()).hexdigest()
	body = log.read_text()
	failed = sorted(set(re.findall(r'^\s+× (.+?) \d+ms$', body, re.M)))
	errors = sorted(set(re.findall(r'^(AssertionError: .+)$', body, re.M)))
	counts = re.findall(r'^\s+Tests\s+(.+)$', body, re.M)
	print(f'{ident} | {rel} | {counts} | failed={failed} | {errors} | restore {"identical" if before == after else "DIFFERS"} {after[:12]}')
