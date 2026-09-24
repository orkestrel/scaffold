# Applies each E-ID-CODE round-2 mutation, runs the positional scan (and, for a table mutation, the setup pin),
# and restores the file byte for byte, checking the restore by SHA-256.
# Log: tmp/units/logs/r2-mutation-<id>.log.txt; summary on stdout.
import hashlib, subprocess, pathlib, re
root = pathlib.Path('/home/user/veneer-eic')
env = 'export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; '
mutations = [
	# A positional rule outside both tables: code inside a key.
	('m16-added-pair-kbd-code', 'src/styles/elements/_code.scss',
	 '\ta > code {\n\t\tcolor: inherit;\n\t}\n',
	 '\ta > code {\n\t\tcolor: inherit;\n\t}\n\n\tkbd code {\n\t\tcolor: inherit;\n\t}\n'),
	# A release pair dropped from its table.
	('m17-dropped-release-pair', 'tests/setupStyles.ts',
	 "\tObject.freeze(['kbd', 'kbd'] as const),\n])\n", '])\n'),
]
for ident, rel, old, new in mutations:
	path = root / rel
	original = path.read_bytes()
	before = hashlib.sha256(original).hexdigest()
	text = original.decode()
	assert text.count(old) == 1, (ident, 'site not unique')
	path.write_text(text.replace(old, new))
	log = root / f'tmp/units/logs/r2-mutation-{ident}.log.txt'
	try:
		subprocess.run(['bash', str(root / 'tmp/units/eic-run.sh'), str(log), 'tests/src/styles/index.test.ts'], cwd=root, capture_output=True)
		if rel.startswith('tests/'):
			out = subprocess.run(['bash', '-c', env + 'npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts; echo "exit $?"'], cwd=root, capture_output=True, text=True)
			with log.open('a') as handle:
				handle.write('\n===== setup project =====\n' + out.stdout + out.stderr)
	finally:
		path.write_bytes(original)
	after = hashlib.sha256(path.read_bytes()).hexdigest()
	body = log.read_text()
	failed = sorted(set(re.findall(r'^\s+× (.+?) \d+ms$', body, re.M)))
	errors = sorted(set(re.findall(r'^(AssertionError: .+)$', body, re.M)))
	counts = re.findall(r'^\s+Tests\s+(.+)$', body, re.M)
	print(ident, '| restore', 'identical' if before == after else 'DIFFERS', '| counts', counts)
	for name in failed: print('  failed:', name)
	for error in errors: print('  ', error)
