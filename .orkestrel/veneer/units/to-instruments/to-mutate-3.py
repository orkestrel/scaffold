#!/usr/bin/env python3
"""Round 3 mutation log: edits one TOAST_SLOT_CASES row in the validation copy at a time, runs the
proof named for the run, records the site, the command, the exit, the summary, and the failing case
names in tmp/units/to-mutations-3.log.txt, and restores the file after each run."""
import subprocess, os, re, sys
W='/home/user/veneer-to'
B=W+'/tmp/probe/base'
LOG=W+'/tmp/units/to-mutations-3.log.txt'
env=dict(os.environ)
env['PATH']='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:'+env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
STYLES=['npx','vitest','run','--config','configs/src/vite.styles.config.ts','--no-cache','--reporter=verbose','tests/src/styles/components/toast.test.ts']
SETUP=['npx','vitest','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','setup','tests/setupStyles.test.ts']
STY='tests/setupStyles.ts'
ROW="property: '--bs-toast-spacing', token: TOKEN_NAMES.gutter.x"
M={
 'none, style proof': (None, STYLES),
 'spacing row names the --vn-size-6 token, style proof': (ROW.replace('gutter.x','size[6]'), STYLES),
 'spacing row names the --vn-gap-4 token, style proof': (ROW.replace('gutter.x','gap[4]'), STYLES),
 'spacing row names the --vn-size-6 token, setup proof': (ROW.replace('gutter.x','size[6]'), SETUP),
 'spacing row names the --vn-gap-4 token, setup proof': (ROW.replace('gutter.x','gap[4]'), SETUP),
 'padding-x row names the --vn-space-8 token, style proof': ("property: '--bs-toast-padding-x', token: TOKEN_NAMES.space[8]", STYLES),
}
OLD={k:(ROW if 'spacing' in k else "property: '--bs-toast-padding-x', token: TOKEN_NAMES.space[6]") for k in M}
names=sys.argv[1:] or list(M)
with open(LOG,'a') as log:
    for name in names:
        new, cmd = M[name]; old=OLD[name]
        path=os.path.join(B,STY); text=open(path).read()
        if new is not None:
            assert text.count(old)==1, name
            open(path,'w').write(text.replace(old,new))
        try:
            r=subprocess.run(cmd,cwd=B,env=env,capture_output=True,text=True)
            out=r.stdout+r.stderr
            fails=sorted(set(re.findall(r'^\s*[×✗] .*?> (.*?)(?: \d+ms)?$', out, re.M)))
            summary=[l.strip() for l in out.splitlines() if re.match(r'\s*Tests\s', l)]
            log.write(f'== mutation: {name}\n   site: {STY}\n   old: {old if new else None!r}\n   new: {new!r}\n   command: {" ".join(cmd)}\n   exit: {r.returncode}\n   summary: {summary}\n   failing:\n')
            for f in fails: log.write(f'     - {f}\n')
            log.write('\n')
            print(name, r.returncode, summary, fails)
        finally:
            open(path,'w').write(text)
