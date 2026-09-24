# MODAL round 2: mutations for every case this round adds or edits, run on the validation copy
# tmp/probe/md-base and restored after each run. Output: tmp/units/md-mutations-2.log.txt.
import subprocess, re, os
os.chdir('/home/user/veneer-md/tmp/probe/md-base')
env=dict(os.environ)
env['PATH']='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:'+env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
STYLES=['npx','vitest','run','--config','configs/src/vite.styles.config.ts','--no-cache','--reporter=verbose']
APP=['npx','vitest','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','app:browser']
X='src/styles/_mixins.scss'
mutations=[
 ('M6 mixin fill declaration dropped', X, '\tbackground-color: $color;\n', '', True, STYLES+['tests/src/styles/mixins.test.ts']),
 ('M6 mixin placement declaration dropped', X, '\tleft: 0;\n\tz-index: $zindex;', '\tz-index: $zindex;', True, STYLES+['tests/src/styles/mixins.test.ts']),
 ('M6 fixture fill passed as the black token', 'tests/src/styles/fixtures/mixins.scss', 'overlay-backdrop(7, var(--vn-palette-teal), 0.25)', 'overlay-backdrop(7, var(--vn-palette-black-base), 0.25)', False, STYLES+['tests/src/styles/mixins.test.ts']),
 ('M6 shared dialog markup without its footer', 'tests/setupStyles.ts', '<div class="modal-footer"><button type="button" class="btn btn-secondary">Hold</button><button type="button" class="btn btn-primary">Release</button></div>', '', False, STYLES+['tests/src/styles/components/modal.test.ts']),
 ('M1 specimen names without the direction word', 'app/browser/constants.ts', 'name: `Fullscreen modal ${step} down`,', 'name: `Fullscreen modal ${step}`,', False, APP+['tests/app/browser/sections/ModalSection.test.ts']),
]
for name,f,old,new,build,cmd in mutations:
    src=open(f).read()
    assert src.count(old)==1,(name,src.count(old))
    open(f,'w').write(src.replace(old,new,1))
    try:
        bcode='n/a'
        if build:
            bcode=subprocess.run(['npm','run','build:src:styles'],env=env,capture_output=True,text=True).returncode
        r=subprocess.run(cmd,env=env,capture_output=True,text=True)
        out=r.stdout+r.stderr
        tl=[l.strip() for l in out.split('\n') if 'Tests ' in l and ('passed' in l or 'failed' in l)]
        print(f'== mutation: {name}')
        print(f'   site: {f}: {old!r} -> {new!r}')
        print(f'   command: {"npm run build:src:styles && " if build else ""}{" ".join(cmd)}')
        print(f'   build exit={bcode} test exit={r.returncode} summary={tl}')
        for l in out.split('\n'):
            if '×' in l: print('    failing:', l.strip()[:240])
    finally:
        open(f,'w').write(src)
subprocess.run(['npm','run','build:src:styles'],env=env,capture_output=True,text=True)
print('== restored: every mutated file rewritten from its read copy; build:src:styles re-run')
