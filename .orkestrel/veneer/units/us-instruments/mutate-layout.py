# Mutations for the Layout proof, run in the probe copy at tmp/probe/tree (built by probe-tree.sh):
# each edits the probe copy's app/browser/constants.ts from a backup, runs the Layout proof, and
# copies the backup back. Logs go to tmp/probe/layout-<name>.log.txt.
import os, re, shutil, subprocess
root = '/home/user/veneer-us'
tree = f'{root}/tmp/probe/tree'
env = dict(os.environ)
env['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + env['PATH']
PATH = 'app/browser/constants.ts'
RESPONSIVE = '<div class="row row-cols-auto g-0 gap-1 gap-md-3 row-gap-lg-5 column-gap-xl-2"><div>Resize for gap steps</div><div>Column gap</div><div class="col-12">Row gap on wrap</div></div>'
mutations = [
  ('row-cols-2', RESPONSIVE, '<div class="row row-cols-2 g-0 gap-1 gap-md-3 row-gap-lg-5 column-gap-xl-2"><div>Resize for gap steps</div><div>Column gap</div><div>Row gap on wrap</div></div>'),
  ('no-wrap', RESPONSIVE, '<div class="row row-cols-auto g-0 gap-1 gap-md-3 row-gap-lg-5 column-gap-xl-2"><div>Resize for gap steps</div><div>Column gap</div><div>Row gap on wrap</div></div>'),
  ('responsive-card', RESPONSIVE, '<div class="row row-cols-auto g-0 gap-1 gap-md-3 row-gap-lg-5 column-gap-xl-2"><div>Resize for gap steps</div><div>Column gap</div><div class="col-12 card">Row gap on wrap</div></div>'),
  ('steps-card', '<div>Gap ${String(step)}</div><div>Neighbor</div>', '<div class="card"><div class="card-body">Gap ${String(step)}</div></div><div class="card"><div class="card-body">Neighbor</div></div>'),
  ('steps-unframed', '`<div class="container-fluid"><div class="row row-cols-auto g-0 gap-${String(step)}"><div>Gap ${String(step)}</div><div>Neighbor</div></div></div>`', '`<div class="row row-cols-auto g-0 gap-${String(step)}"><div>Gap ${String(step)}</div><div>Neighbor</div></div>`'),
]
os.chdir(tree)
results = []
for name, old, new in mutations:
    text = open(PATH).read()
    assert text.count(old) == 1, name
    shutil.copy(PATH, f'{root}/tmp/probe/constants.ts.bak')
    open(PATH, 'w').write(text.replace(old, new))
    try:
        r = subprocess.run(['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser', 'tests/app/browser/sections/LayoutSection.test.ts'], capture_output=True, text=True, env=env)
        out = re.sub(r'\x1b\[[0-9;]*m', '', r.stdout + r.stderr)
        open(f'{root}/tmp/probe/layout-{name}.log.txt', 'w').write(out)
        fails = sorted(set(re.findall(r'FAIL .*?> LayoutSection > (.*)', out)))
        tally = re.findall(r'Tests +(.*)', out)
        results.append((name, r.returncode, tally, fails))
    finally:
        shutil.copy(f'{root}/tmp/probe/constants.ts.bak', PATH)
for name, code, tally, fails in results:
    print(f'== {name}: exit={code} {tally}')
    for f in fails: print('   ', f)
