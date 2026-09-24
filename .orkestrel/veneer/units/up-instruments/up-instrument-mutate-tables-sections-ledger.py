# Runs each named mutation of a case table, a specimen, or a partial against the validation copy:
# applies one edit, rebuilds the cascade where the command reads it, runs the named command, records
# the exits, the summary line, and the failing case names, then restores the edited file byte for byte.
import subprocess, sys, re, os, json
BASE = '/home/user/veneer-up/tmp/probe/base'
LOG = sys.argv[1]
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
BIND = 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "binds the paint"'
SECTIONS = 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/BackgroundSection.test.ts tests/app/browser/sections/BorderSection.test.ts'
CONF = 'npm run build:src && npm run test:conformance'
MUTATIONS = [
 ('fill-table-wrong-alias', 'tests/setupStyles.ts', "Object.freeze({ key: 'body-secondary', alias: '--bs-secondary-bg-rgb' }),", "Object.freeze({ key: 'body-secondary', alias: '--bs-tertiary-bg-rgb' }),", BIND),
 ('radius-side-corners-reordered', 'tests/setupStyles.ts', "Object.freeze({ name: 'end', corners: Object.freeze(['top-right', 'bottom-right']) }),", "Object.freeze({ name: 'end', corners: Object.freeze(['bottom-right', 'top-right']) }),", BIND),
 ('opacity-table-step-dropped', 'tests/setupStyles.ts', "\tObject.freeze({ step: '10', alpha: 0.1 }),\n", "", BIND),
 ('caption-drift', 'app/browser/constants.ts', "<figcaption class=\"figure-caption\">${classes}</figcaption>", "<figcaption class=\"figure-caption\">${classes.replace('bg-', 'fill-')}</figcaption>", SECTIONS),
 ('opacity-specimen-step-dropped', 'app/browser/constants.ts', "swatches: ['100', '75', '50', '25', '10'].map((step) => `bg-success bg-opacity-${step}`),", "swatches: ['100', '75', '50', '25'].map((step) => `bg-success bg-opacity-${step}`),", SECTIONS),
 ('rounded-circle-ledger', 'src/styles/utilities/_border.scss', "circle: 50%,", "circle: 49%,", CONF),
]
def run(cmd):
    p = subprocess.run(cmd, shell=True, cwd=BASE, env=ENV, capture_output=True, text=True)
    return p.returncode, p.stdout + p.stderr
with open(LOG, 'a') as log:
    for name, path, old, new, cmd in MUTATIONS:
        full = os.path.join(BASE, path)
        original = open(full).read()
        assert old in original, name
        open(full, 'w').write(original.replace(old, new, 1))
        try:
            code, out = run(cmd)
        finally:
            open(full, 'w').write(original)
        summary = [l.strip() for l in out.splitlines() if re.match(r'\s*(Tests|Test Files)\s', l)]
        failing = sorted(set(l.strip() for l in out.splitlines() if ' FAIL ' in l))
        log.write(json.dumps({'mutation': name, 'site': path, 'command': cmd, 'test_exit': code, 'summary': summary, 'failing': failing}, indent=1) + '\n')
        log.flush()
        print(name, code, summary, [f.split('>')[-1].strip()[:90] for f in failing])
    code, _ = run('npm run build:src')
    log.write(json.dumps({'restored': True, 'rebuild_exit': code}) + '\n')
