# Applies one mutation at a time to the validation copy, runs the named proof, records the failing
# cases, and restores the exact text before the next mutation.
import subprocess, sys, os, re, hashlib
S='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
C=S+'/co-unit-check'; T=S+'/co-unit-tools'
env=dict(os.environ); env['PATH']=S+'/npm11/node_modules/.bin:'+env['PATH']
PARTIAL='src/styles/components/_collapse.scss'
STYLES=['npx','vitest','run','--config','configs/src/vite.styles.config.ts','--no-cache','--reporter=verbose','tests/src/styles/components/collapse.test.ts']
SECTION=['npx','vitest','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','app:browser','tests/app/browser/sections/CollapseSection.test.ts']
CONF=['npm','run','test:conformance']
M=[
 ('hiding rule without :not(.show)', PARTIAL, '.collapse:not(.show) {', '.collapse {', True, STYLES),
 ('closing rule without overflow', PARTIAL, '\t\toverflow: hidden;\n', '', True, STYLES),
 ('closing rule without height 0', PARTIAL, '\t.collapsing {\n\t\theight: 0;\n', '\t.collapsing {\n', True, STYLES),
 ('horizontal rule as a descendant selector', PARTIAL, '.collapsing.collapse-horizontal {', '.collapsing .collapse-horizontal {', True, STYLES),
 ('bare transitions without the mixin', PARTIAL, None, None, True, STYLES),
 ('a dark-island retune of the hiding rule', PARTIAL, '\t.collapsing {\n', "\t[data-bs-theme='dark'] .collapse:not(.show) {\n\t\tdisplay: block;\n\t}\n\n\t.collapsing {\n", True, STYLES),
 ('shown specimen drops show', 'app/browser/constants.ts', '<div class="collapse show"><div class="card-body">Left', '<div class="collapse"><div class="card-body">Left', False, SECTION),
 ('horizontal shown specimen drops show', 'app/browser/constants.ts', '<div class="collapse collapse-horizontal show">', '<div class="collapse collapse-horizontal">', False, SECTION),
 ('ledger: a duration off the recorded value', PARTIAL, 'height 0.35s ease', 'height 0.3s ease', True, CONF),
]
only=sys.argv[1:] 
out=open(T+'/logs/mutations.log.txt','a')
for i,(name,path,old,new,build,cmd) in enumerate(M):
    if only and str(i) not in only: continue
    p=C+'/'+path
    orig=open(p).read()
    digest=hashlib.sha256(orig.encode()).hexdigest()
    if old is None:
        s=orig.replace('@include transition(height 0.35s ease);','transition: height 0.35s ease;').replace('@include transition(width 0.35s ease);','transition: width 0.35s ease;')
    else:
        assert orig.count(old)==1,(name,orig.count(old))
        s=orig.replace(old,new)
    assert s!=orig
    open(p,'w').write(s)
    try:
        if build:
            b=subprocess.run(['npm','run','build:src:styles'],cwd=C,env=env,capture_output=True,text=True)
            assert b.returncode==0,b.stdout[-2000:]+b.stderr[-2000:]
        r=subprocess.run(cmd,cwd=C,env=env,capture_output=True,text=True,timeout=400)
        text=r.stdout+r.stderr
        fails=sorted(set(re.findall(r'[×✗] [^\n]*?> ([^\n]*?)(?: \d+ms)?\n',text)))
        counts=re.findall(r'Tests\s+[^\n]*',text)
        extra=[l for l in text.split('\n') if 'collapse' in l and '|' in l and 'Veneer' not in l][:6]
        out.write(f'== {name}: exit={r.returncode} {counts[-1] if counts else ""}\n')
        for f in fails: out.write(f'   red: {f}\n')
        for e in extra: out.write(f'   row: {e.strip()}\n')
        out.flush()
        print(name, r.returncode, counts[-1] if counts else '', fails)
    finally:
        open(p,'w').write(orig)
        assert hashlib.sha256(open(p).read().encode()).hexdigest()==digest
if any(m[4] for i,m in enumerate(M) if not only or str(i) in only):
    b=subprocess.run(['npm','run','build:src:styles'],cwd=C,env=env,capture_output=True,text=True)
    print('restored build', b.returncode)
