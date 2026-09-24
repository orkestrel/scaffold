#!/usr/bin/env python3
"""Applies one mutation at a time to the copy's toast specimens, runs the section proof, and records
the failing cases; restores the constants after each run."""
import subprocess, os, re, json, sys
B='/home/user/veneer-to/tmp/probe/base'
P=B+'/app/browser/constants.ts'
env=dict(os.environ)
env['PATH']='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:'+env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
text=open(P).read()
def once(old,new):
    def f(s):
        assert s.count(old)>=1, old
        return s.replace(old,new,1)
    return f
M={
 'container-outside-frame': once("'<div class=\"viewport\"><div class=\"toast-container top-0 end-0\">", "'<div><div class=\"toast-container top-0 end-0\">"),
 'status-role': once('role="alert" aria-live="assertive"', 'role="status" aria-live="polite"'),
 'toast-without-show': once('<div class="toast show" role="alert"', '<div class="toast" role="alert"'),
 'inline-style': once('<div class="toast-body">The north pier', '<div class="toast-body" style="color: red">The north pier'),
 'unnamed-close': once('11 minutes ago</small><button type="button" class="btn-close" aria-label="Close">', '11 minutes ago</small><button type="button" class="btn-close">'),
 'off-center': once('toast-container top-50 start-50 translate-middle', 'toast-container top-50 start-50 translate-middle-y'),
}
for name in sys.argv[1:] or list(M):
    open(P,'w').write(M[name](text))
    try:
        r=subprocess.run(['npx','vitest','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','app:browser','tests/app/browser/sections/ToastSection.test.ts'],cwd=B,env=env,capture_output=True,text=True)
        out=r.stdout+r.stderr
        fails=sorted(set(re.findall(r'^\s*[×✗] .*?> (.*?)(?: \d+ms)?$', out, re.M)))
        summary=[l.strip() for l in out.splitlines() if l.strip().startswith('Tests ')]
        print(json.dumps({'mutation':name,'exit':r.returncode,'summary':summary,'failing':fails}))
    finally:
        open(P,'w').write(text)
