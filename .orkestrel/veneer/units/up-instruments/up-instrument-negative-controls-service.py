# Runs each negative control of the Tailwind contract against the validation copy: applies the edit
# to every named file, rebuilds the styles cascade, runs the service project, records the exits, the
# summary line, and the failing case names, then restores every edited file byte for byte.
import subprocess, sys, re, os, json
BASE = '/home/user/veneer-up/tmp/probe/base'
LOG = sys.argv[1]
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
LINES = ['tests/setup.css', 'tests/fixtures/tailwind/consumer.css', 'tests/fixtures/tailwind/preflight.css', 'guides/veneer.md']
TAIL = 'border-1 border-2 border-3 border-4 border-5");'
CONTROLS = [
 ('rounded-written-onto-line', [(p, TAIL, 'border-1 border-2 border-3 border-4 border-5 rounded");') for p in LINES]),
 ('border-width-dropped-from-line', [(p, ' border-1 border-2 border-3 border-4 border-5");', '");') for p in LINES]),
 ('rounded-importance-dropped', [('src/styles/utilities/_border.scss', "\t\t@include utility(rounded, border-radius, $radii, $infix);\n", "\t\t@include utility(rounded, border-radius, map.remove($radii, null), $infix);\n\t\t@if $infix == '' {\n\t\t\t.rounded {\n\t\t\t\tborder-radius: var(--bs-border-radius);\n\t\t\t}\n\t\t}\n")]),
]
def run(cmd):
    p = subprocess.run(cmd, shell=True, cwd=BASE, env=ENV, capture_output=True, text=True)
    return p.returncode, p.stdout + p.stderr
with open(LOG, 'a') as log:
    for name, edits in CONTROLS:
        originals = {}
        for path, old, new in edits:
            full = os.path.join(BASE, path)
            text = originals.setdefault(path, open(full).read()) if path not in originals else open(full).read()
            assert old in text, (name, path)
            open(full, 'w').write(text.replace(old, new))
        try:
            build, _ = run('npm run build:src:styles')
            code, out = run('npm run test:service')
        finally:
            for path, text in originals.items():
                open(os.path.join(BASE, path), 'w').write(text)
        summary = [l.strip() for l in out.splitlines() if re.match(r'\s*(Tests|Test Files)\s', l)]
        failing = sorted(set(l.strip() for l in out.splitlines() if ' FAIL ' in l))
        errors = [l.strip()[:300] for l in out.splitlines() if 'AssertionError' in l][:6]
        log.write(json.dumps({'control': name, 'sites': sorted(originals), 'command': 'npm run build:src:styles && npm run test:service', 'build_exit': build, 'test_exit': code, 'summary': summary, 'failing': failing, 'errors': errors}, indent=1) + '\n')
        log.flush()
        print(name, build, code, summary)
    code, _ = run('npm run build:src:styles')
    log.write(json.dumps({'restored': True, 'rebuild_exit': code}) + '\n')
