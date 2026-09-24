#!/usr/bin/env python3
"""Round-2 mutation log: applies one mutation at a time to the validation copy, runs the proof that
owns the edited case, records the site, the command, the exit, the summary, and the failing case
names, and restores the file after each run."""
import subprocess, os, re, sys
B='/home/user/veneer-to/tmp/probe/base'
LOG='/home/user/veneer-to/tmp/units/to-mutations-2.log.txt'
env=dict(os.environ)
env['PATH']='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:'+env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
SECTION=['npx','vitest','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','app:browser','tests/app/browser/sections/ToastSection.test.ts']
SETUP=['npx','vitest','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','setup','tests/setupStyles.test.ts']
STYLES=['npx','vitest','run','--config','configs/src/vite.styles.config.ts','--no-cache','--reporter=verbose','tests/src/styles/components/toast.test.ts']
SEC='tests/app/browser/sections/ToastSection.test.ts'
CON='app/browser/constants.ts'
STY='tests/setupStyles.ts'
GEO_OLD="""				const framed = TOAST_SPECIMENS.filter(({ markup }) =>
					markup.includes('class="viewport"'),
				).map(({ name }) => name)"""
M={
 'none (section proof)': (SEC, None, None, SECTION),
 'T5 geometry derivation drops a framed specimen': (SEC, GEO_OLD, GEO_OLD+'.slice(1)', SECTION),
 'T5 container derivation drops a framed specimen': (SEC, "const framed = TOAST_SPECIMENS.filter(({ markup }) => markup.includes('class=\"viewport\"'))", "const framed = TOAST_SPECIMENS.filter(({ markup }) => markup.includes('class=\"viewport\"')).slice(1)", SECTION),
 'T5 stacked container rendered outside the frame': (CON, "'<div class=\"viewport\"><div class=\"toast-container top-0 end-0\">", "'<div><div class=\"toast-container top-0 end-0\">", SECTION),
 'T5 centered container placed off center (translate-middle-y)': (CON, 'toast-container top-50 start-50 translate-middle"', 'toast-container top-50 start-50 translate-middle-y"', SECTION),
 'T5 stacked container carries an unshipped placement class (top-25)': (CON, 'toast-container top-0 end-0', 'toast-container top-25 end-0', SECTION),
 'none (setup proof)': (STY, None, None, SETUP),
 'T6 padding-x row names --vn-space-8': (STY, "property: '--bs-toast-padding-x', token: TOKEN_NAMES.space[6]", "property: '--bs-toast-padding-x', token: TOKEN_NAMES.space[8]", SETUP),
 'T6 font-size row names --vn-size-3': (STY, "property: '--bs-toast-font-size', token: TOKEN_NAMES.size[2]", "property: '--bs-toast-font-size', token: TOKEN_NAMES.size[3]", SETUP),
 'T6 spacing row names --vn-space-12, read by the style proof': (STY, "property: '--bs-toast-spacing', token: TOKEN_NAMES.gutter.x", "property: '--bs-toast-spacing', token: TOKEN_NAMES.space[12]", STYLES),
 'T6 spacing row names --vn-space-12 (same 1.5rem length)': (STY, "property: '--bs-toast-spacing', token: TOKEN_NAMES.gutter.x", "property: '--bs-toast-spacing', token: TOKEN_NAMES.space[12]", SETUP),
}
names=sys.argv[1:] or list(M)
with open(LOG,'a') as log:
    for name in names:
        rel, old, new, cmd = M[name]
        path=os.path.join(B,rel); text=open(path).read()
        if old is not None:
            assert text.count(old)==1, (name, text.count(old))
            open(path,'w').write(text.replace(old,new))
        try:
            r=subprocess.run(cmd,cwd=B,env=env,capture_output=True,text=True)
            out=r.stdout+r.stderr
            fails=sorted(set(re.findall(r'^\s*[×✗] .*?> (.*?)(?: \d+ms)?$', out, re.M)))
            summary=[l.strip() for l in out.splitlines() if re.match(r'\s*Tests\s', l)]
            log.write(f'== mutation: {name}\n   site: {rel}\n   old: {old!r}\n   new: {new!r}\n   command: {" ".join(cmd)}\n   exit: {r.returncode}\n   summary: {summary}\n   failing:\n')
            for f in fails: log.write(f'     - {f}\n')
            log.write('\n')
            print(name, r.returncode, summary, fails)
        finally:
            open(path,'w').write(text)
