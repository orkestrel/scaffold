# Applies each E-ID-CODE round-4 mutation, runs the named proof, and restores the file byte for byte, checking the
# restore by SHA-256. A styles proof rebuilds the cascade through tmp/units/eic-run.sh; a Content proof runs the
# app:browser section suite, which compiles the SCSS itself.
# Log: tmp/units/logs/r4-mutation-<id>.log.txt, with the restore check appended; summary on stdout.
import hashlib, subprocess, pathlib, re
root = pathlib.Path('/home/user/veneer-eic')
env = 'export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; '
E = 'src/styles/elements/'
close = '\t}\n}\n'
content = 'npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/ContentSection.test.ts'
mutations = [
	('m21-var-drop-corner', E + '_var.scss', '\t\t@include code-surface(var(--vn-surface-raised));\n', '\t\tbackground-color: var(--vn-surface-raised);\n', 'styles', ['tests/src/styles/elements/var.test.ts']),
	('m22-readd-a-code', E + '_code.scss', close, '\t}\n\n\ta > code {\n\t\tcolor: inherit;\n\t}\n}\n', 'content', None),
	('m23-readd-pre-code', E + '_code.scss', close, '\t}\n\n\tpre code {\n\t\tpadding: 0;\n\t\tbackground-color: transparent;\n\t}\n}\n', 'content', None),
	('m24-readd-kbd-kbd', E + '_kbd.scss', close, '\t}\n\n\tkbd kbd {\n\t\tborder: 0;\n\t}\n}\n', 'content', None),
]
for ident, rel, old, new, runner, tests in mutations:
	path = root / rel
	original = path.read_bytes()
	before = hashlib.sha256(original).hexdigest()
	text = original.decode()
	assert text.count(old) == 1, (ident, 'site not unique')
	path.write_text(text.replace(old, new))
	log = root / f'tmp/units/logs/r4-mutation-{ident}.log.txt'
	try:
		if runner == 'styles':
			subprocess.run(['bash', str(root / 'tmp/units/eic-run.sh'), str(log), *tests], cwd=root, capture_output=True)
		else:
			out = subprocess.run(['bash', '-c', env + content + '; echo "exit=$?"'], cwd=root, capture_output=True, text=True)
			log.write_text(out.stdout + out.stderr)
	finally:
		path.write_bytes(original)
	after = hashlib.sha256(path.read_bytes()).hexdigest()
	verdict = 'identical' if before == after else 'DIFFERS'
	with log.open('a') as handle:
		handle.write(f'\nrestore {rel}: before {before} after {after} {verdict}\n')
	body = log.read_text()
	failed = sorted(set(re.findall(r'^\s+× (.+?)(?: \d+ms)?$', body, re.M)))
	errors = sorted(set(re.findall(r'^(AssertionError: .+)$', body, re.M)))
	counts = re.findall(r'^\s+Tests\s+(.+)$', body, re.M)
	print(ident, '|', rel, '| restore', verdict, after[:12], '| counts', counts)
	for name in failed: print('  failed:', name)
	for error in errors: print('  ', error)
