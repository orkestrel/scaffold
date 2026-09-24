#!/usr/bin/env python3
"""Applies one named mutation at a time to the validation copy, rebuilds the styles, runs the toast
proof, and records the failing cases; restores the file after each run."""
import subprocess, sys, os, re, json
B='/home/user/veneer-to/tmp/probe/base'
S=B+'/src/styles/components/_toast.scss'
I=B+'/src/styles/index.scss'
env=dict(os.environ)
env['PATH']='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:'+env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
M={
 'no-partial': (I, "@use 'components/toast';\n", ''),
 'container-literal-1090': (S, "	.toast-container {\n		--bs-toast-zindex: var(--vn-stack-toast);", "	.toast-container {\n		--bs-toast-zindex: 1090;"),
 'toast-variable-dropped': (S, "	.toast {\n		--bs-toast-zindex: var(--vn-stack-toast);\n", "	.toast {\n"),
 'not-show-dropped': (S, "	.toast:not(.show) {\n		display: none;\n	}\n", ""),
 'showing-dropped': (S, "	.toast.showing {\n		opacity: 0;\n	}\n", ""),
 'last-child-qualifier-dropped': (S, ".toast-container > :not(:last-child) {", ".toast-container > * {"),
 'header-full-radius': (S, "		border-top-left-radius: calc(var(--bs-toast-border-radius) - var(--bs-toast-border-width));\n		border-top-right-radius: calc(var(--bs-toast-border-radius) - var(--bs-toast-border-width));", "		border-top-left-radius: var(--bs-toast-border-radius);\n		border-top-right-radius: var(--bs-toast-border-radius);"),
 'combinator-on-toast': (S, "	.toast-header .btn-close {", "	.toast .btn-close {"),
 'body-block-inset':  (S, "		padding: var(--bs-toast-padding-x);\n		word-wrap", "		padding: var(--bs-toast-padding-y) var(--bs-toast-padding-x);\n		word-wrap"),
 'gap-on-density-step': (S, '		--bs-toast-spacing: var(--vn-gutter-x);', '		--bs-toast-spacing: var(--vn-space-12);'),
 'literal-colour': (S, "		--bs-toast-bg: rgba(var(--bs-body-bg-rgb), 0.85);", "		--bs-toast-bg: rgba(255, 255, 255, 0.85);"),
}
names=sys.argv[1:] or list(M)
for name in names:
    path, old, new = M[name]
    text=open(path).read()
    assert text.count(old)==1, name
    open(path,'w').write(text.replace(old,new))
    try:
        b=subprocess.run(['npm','run','build:src:styles'],cwd=B,env=env,capture_output=True,text=True)
        r=subprocess.run(['npx','vitest','run','--config','configs/src/vite.styles.config.ts','--no-cache','--reporter=verbose','tests/src/styles/components/toast.test.ts'],cwd=B,env=env,capture_output=True,text=True)
        out=r.stdout+r.stderr
        fails=sorted(set(re.findall(r'^\s*[×✗] (.*?)(?: \d+ms)?$', out, re.M)))
        summary=[l.strip() for l in out.splitlines() if l.strip().startswith('Tests ')]
        print(json.dumps({'mutation':name,'build':b.returncode,'exit':r.returncode,'summary':summary,'failing':fails}))
    finally:
        open(path,'w').write(text)
b=subprocess.run(['npm','run','build:src:styles'],cwd=B,env=env,capture_output=True,text=True)
print('restored build', b.returncode)
