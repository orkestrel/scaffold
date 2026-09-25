# Applies each E-ID-CODE round-3 mutation, rebuilds, runs the named proofs (and, for a re-added contextual rule, the
# conformance project), and restores the file byte for byte, checking the restore by SHA-256.
# Log: tmp/units/logs/r3-mutation-<id>.log.txt; summary on stdout.
import hashlib, subprocess, pathlib, re
root = pathlib.Path('/home/user/veneer-eic')
env = 'export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; '
E = 'src/styles/elements/'
T = 'tests/src/styles/'
close = '\t}\n}\n'
mutations = [
	('m13-kbd-border-hook', E + '_kbd.scss', 'border: var(--bs-border-width) solid', 'border: var(--vn-border-width) solid', [T + 'elements/kbd.test.ts'], False),
	('m14-pre-border-hook', E + '_pre.scss', 'border: var(--bs-border-width) solid', 'border: var(--vn-border-width) solid', [T + 'elements/pre.test.ts'], False),
	('m15-samp-radius', E + '_samp.scss', '\t\t@include code-surface(var(--vn-surface-raised));\n', '\t\tbackground-color: var(--vn-surface-raised);\n', [T + 'elements/samp.test.ts'], False),
	('m18-readd-pre-code', E + '_code.scss', close, '\t}\n\n\tpre code {\n\t\tfont-size: inherit;\n\t\tcolor: inherit;\n\t}\n}\n', [T + 'index.test.ts'], True),
	('m19-readd-a-code', E + '_code.scss', close, '\t}\n\n\ta > code {\n\t\tcolor: inherit;\n\t}\n}\n', [T + 'index.test.ts'], True),
	('m20-readd-kbd-kbd', E + '_kbd.scss', close, '\t}\n\n\tkbd kbd {\n\t\tfont-size: 1em;\n\t}\n}\n', [T + 'index.test.ts'], True),
]
for ident, rel, old, new, tests, conformance in mutations:
	path = root / rel
	original = path.read_bytes()
	before = hashlib.sha256(original).hexdigest()
	text = original.decode()
	assert text.count(old) == 1, (ident, 'site not unique')
	path.write_text(text.replace(old, new))
	log = root / f'tmp/units/logs/r3-mutation-{ident}.log.txt'
	try:
		subprocess.run(['bash', str(root / 'tmp/units/eic-run.sh'), str(log), *tests], cwd=root, capture_output=True)
		if conformance:
			out = subprocess.run(['bash', '-c', env + 'npm run test:conformance; echo "exit $?"'], cwd=root, capture_output=True, text=True)
			with log.open('a') as handle:
				handle.write('\n===== conformance project =====\n' + out.stdout + out.stderr)
	finally:
		path.write_bytes(original)
	after = hashlib.sha256(path.read_bytes()).hexdigest()
	body = log.read_text()
	failed = sorted(set(re.findall(r'^\s+× (.+?) \d+ms$', body, re.M)))
	errors = sorted(set(re.findall(r'^(AssertionError: .+)$', body, re.M)))
	counts = re.findall(r'^\s+Tests\s+(.+)$', body, re.M)
	print(ident, '|', rel, '| restore', 'identical' if before == after else 'DIFFERS', after[:12], '| counts', counts)
	for name in failed: print('  failed:', name)
	for error in errors: print('  ', error)
