import shutil, subprocess, sys, os
root = '/home/user/test'
src = os.path.join(root, 'src/browser/helpers.ts')
keep = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/t4r3/helpers.ts.pristine'
shutil.copyfile(src, keep)
MUTATIONS = {
	'border-origin': ('\treturn padding + readClipMargin(element)\n}', '\treturn border + readClipMargin(element)\n}'),
	'content-ignored': ("\tif (margin.includes('content-box')) {", "\tif (margin.includes('content-box-never')) {"),
	'cap-removed': ('\t\t\tif (limit !== undefined && limit < bottom) bottom = limit\n', '\t\t\tif (limit !== undefined && limit < 0) bottom = limit\n'),
}
env = dict(os.environ)
env['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
cmd = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'src:browser', 'tests/src/browser/helpers.test.ts', '-t', 'clipsOverflow|readClipEdge|readClipMargin|measureContent']
try:
	for name, (old, new) in MUTATIONS.items():
		text = open(keep).read()
		assert text.count(old) == 1, name
		open(src, 'w').write(text.replace(old, new, 1))
		out = subprocess.run(cmd, cwd=root, env=env, capture_output=True, text=True, timeout=400)
		lines = [l for l in (out.stdout + out.stderr).splitlines() if ('FAIL' in l or 'Tests ' in l)]
		print('==', name, 'exit', out.returncode)
		print('\n'.join(lines))
		shutil.copyfile(keep, src)
finally:
	shutil.copyfile(keep, src)
