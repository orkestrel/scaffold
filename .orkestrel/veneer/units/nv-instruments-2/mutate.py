"""Applies each named mutation to the validation copy, runs the proof that reads it, logs the failed cases, and restores.

A `styles` mutation edits the partial or the barrel, rebuilds the cascade with `npm run build:src:styles`,
and runs `nav.test.ts` with `card.test.ts` beside it. A `setup` mutation edits the guide or the case
tables and runs `npm run test:setup`. Each mutation writes `mutation-<slug>.log.txt` in this
directory; the unmutated control writes `mutation-control.log.txt`.
Usage: python3 mutate.py [name ...]   (no names runs the control and every mutation)
"""
import json, os, re, subprocess, sys

I = os.path.dirname(os.path.abspath(__file__))
BASE = '/home/user/veneer-nv/tmp/probe/base'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
NAV = 'src/styles/components/_nav.scss'
INDEX = 'src/styles/index.scss'
GUIDE = 'guides/veneer.md'
TABLES = 'tests/setupStyles.ts'

S, T = 'styles', 'setup'
MUTATIONS = {
    # The link and its states.
    'nav rule dropped': (S, NAV, '\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tpadding-left: 0;\n\t\tmargin-bottom: 0;\n\t\tlist-style: none;\n', ''),
    'link padding read past its slots': (S, NAV, '\t\tpadding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);', '\t\tpadding: 0.5rem 1rem;'),
    'transition written without the mixin': (S, NAV, '\t\t@include transition(\n\t\t\t(color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out)\n\t\t);', '\t\ttransition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;'),
    'link hover left out': (S, NAV, '\t.nav-link:hover,\n\t.nav-link:focus {\n\t\tcolor: var(--bs-nav-link-hover-color);', '\t.nav-link:focus {\n\t\tcolor: var(--bs-nav-link-hover-color);'),
    'link focus left out': (S, NAV, '\t.nav-link:hover,\n\t.nav-link:focus {\n\t\tcolor: var(--bs-nav-link-hover-color);', '\t.nav-link:hover {\n\t\tcolor: var(--bs-nav-link-hover-color);'),
    'ring on focus rather than focus-visible': (S, NAV, '\t.nav-link:focus-visible {\n\t\toutline: 0;', '\t.nav-link:focus {\n\t\toutline: 0;'),
    'forced-ring omitted': (S, NAV, '\t\t@include forced-ring;\n', ''),
    'disabled anchor left out': (S, NAV, '\t.nav-link.disabled,\n\t.nav-link:disabled {', '\t.nav-link:disabled {'),
    'disabled button left out': (S, NAV, '\t.nav-link.disabled,\n\t.nav-link:disabled {', '\t.nav-link.disabled {'),
    'link color read past its slot': (S, NAV, '\t\tcolor: var(--bs-nav-link-color);\n\t\ttext-decoration: none;', '\t\tcolor: var(--bs-link-color);\n\t\ttext-decoration: none;'),
    'link color fixed to the palette': (S, NAV, '--bs-nav-link-color: var(--bs-link-color);', '--bs-nav-link-color: var(--vn-palette-blue);'),
    # The tabs.
    'tabs strip border dropped': (S, NAV, '\t\tborder-bottom: var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color);\n', ''),
    'tab margin dropped': (S, NAV, '\t\tmargin-bottom: calc(-1 * var(--bs-nav-tabs-border-width));\n\t\tborder: var(--bs-nav-tabs-border-width) solid transparent;', '\t\tborder: var(--bs-nav-tabs-border-width) solid transparent;'),
    'tab hover left out': (S, NAV, '\t.nav-tabs .nav-link:hover,\n\t.nav-tabs .nav-link:focus {', '\t.nav-tabs .nav-link:focus {'),
    'tab focus left out': (S, NAV, '\t.nav-tabs .nav-link:hover,\n\t.nav-tabs .nav-link:focus {', '\t.nav-tabs .nav-link:hover {'),
    'tab active paint dropped': (S, NAV, '\t\tbackground-color: var(--bs-nav-tabs-link-active-bg);\n', ''),
    'tab show item left out': (S, NAV, '\t.nav-tabs .nav-link.active,\n\t.nav-tabs .nav-item.show .nav-link {', '\t.nav-tabs .nav-link.active {'),
    'tabs menu rule dropped': (S, NAV, '\t.nav-tabs .dropdown-menu {\n\t\tmargin-top: calc(-1 * var(--bs-nav-tabs-border-width));\n\t\tborder-top-left-radius: 0;\n\t\tborder-top-right-radius: 0;\n\t}\n', ''),
    # The pills.
    'pill slots dropped': (S, NAV, '\t\t--bs-nav-pills-border-radius: var(--bs-border-radius);\n\t\t--bs-nav-pills-link-active-color: var(--vn-palette-white-base);\n\t\t--bs-nav-pills-link-active-bg: var(--vn-palette-blue);\n', ''),
    'pill radius dropped': (S, NAV, '\t.nav-pills .nav-link {\n\t\tborder-radius: var(--bs-nav-pills-border-radius);\n\t}\n', ''),
    'pill active left out': (S, NAV, '\t.nav-pills .nav-link.active,\n\t.nav-pills .show > .nav-link {', '\t.nav-pills .show > .nav-link {'),
    'pill show left out': (S, NAV, '\t.nav-pills .nav-link.active,\n\t.nav-pills .show > .nav-link {', '\t.nav-pills .nav-link.active {'),
    # The underline.
    'underline gap read past its slot': (S, NAV, '\t\tgap: var(--bs-nav-underline-gap);', '\t\tgap: 1rem;'),
    'underline stroke read through a space token': (S, NAV, '--bs-nav-underline-border-width: 0.125rem;', '--bs-nav-underline-border-width: var(--vn-space-1);'),
    'underline link rule dropped': (S, NAV, '\t.nav-underline .nav-link {\n\t\tpadding-right: 0;\n\t\tpadding-left: 0;\n\t\tborder-bottom: var(--bs-nav-underline-border-width) solid transparent;\n\t}\n', ''),
    'underline hover left out': (S, NAV, '\t.nav-underline .nav-link:hover,\n\t.nav-underline .nav-link:focus {', '\t.nav-underline .nav-link:focus {'),
    'underline focus left out': (S, NAV, '\t.nav-underline .nav-link:hover,\n\t.nav-underline .nav-link:focus {', '\t.nav-underline .nav-link:hover {'),
    'underline active left out': (S, NAV, '\t.nav-underline .nav-link.active,\n\t.nav-underline .show > .nav-link {', '\t.nav-underline .show > .nav-link {'),
    'underline show left out': (S, NAV, '\t.nav-underline .nav-link.active,\n\t.nav-underline .show > .nav-link {', '\t.nav-underline .nav-link.active {'),
    # The rows.
    'bare fill link left out': (S, NAV, '\t.nav-fill > .nav-link,\n\t.nav-fill .nav-item {', '\t.nav-fill .nav-item {'),
    'fill item left out': (S, NAV, '\t.nav-fill > .nav-link,\n\t.nav-fill .nav-item {', '\t.nav-fill > .nav-link {'),
    'bare justified link left out': (S, NAV, '\t.nav-justified > .nav-link,\n\t.nav-justified .nav-item {', '\t.nav-justified .nav-item {'),
    'justified item left out': (S, NAV, '\t.nav-justified > .nav-link,\n\t.nav-justified .nav-item {', '\t.nav-justified > .nav-link {'),
    'justified written as fill': (S, NAV, '\t\tflex-grow: 1;\n\t\tflex-basis: 0;\n', '\t\tflex: 1 1 auto;\n'),
    'filled item link left out': (S, NAV, '\t.nav-fill .nav-item .nav-link,\n\t.nav-justified .nav-item .nav-link {', '\t.nav-justified .nav-item .nav-link {'),
    'justified item link left out': (S, NAV, '\t.nav-fill .nav-item .nav-link,\n\t.nav-justified .nav-item .nav-link {', '\t.nav-fill .nav-item .nav-link {'),
    # The panes and the barrel.
    'pane display dropped': (S, NAV, '\t.tab-content > .tab-pane {\n\t\tdisplay: none;\n\t}\n', ''),
    'active pane display dropped': (S, NAV, '\t.tab-content > .active {\n\t\tdisplay: block;\n\t}\n', ''),
    'nav loads after card': (S, INDEX, "@use 'components/nav';\n@use 'components/card';\n", "@use 'components/card';\n@use 'components/nav';\n"),
    # The withheld navbar names.
    'navbar deferral row deleted': (T, GUIDE, '| `.navbar-nav .nav-link.show`                                                     | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |\n', ''),
    'navbar name added to the shipped list': (T, TABLES, "\t'.card-header-tabs .nav-link.active',\n])", "\t'.card-header-tabs .nav-link.active',\n\t'.navbar-nav .nav-link.show',\n])"),
}

STYLES_RUN = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=json']
STYLES_FILES = ['tests/src/styles/components/nav.test.ts', 'tests/src/styles/components/card.test.ts']


def run(cmd):
    return subprocess.run(cmd, cwd=BASE, env=ENV, capture_output=True, text=True)


def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def measure(kind):
    report = f'{BASE}/tmp-mutation-report.json'
    if kind == S:
        build = run(['npm', 'run', 'build:src:styles'])
        if build.returncode != 0:
            return {'build': build.returncode, 'tail': build.stderr[-600:]}
        test = run(STYLES_RUN + [f'--outputFile={report}'] + STYLES_FILES)
    else:
        test = run(['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=json', f'--outputFile={report}', '--project', 'setup'])
    data = json.load(open(report))
    os.remove(report)
    failed = [f"{os.path.basename(f['name'])} > {a['title']}" for f in data['testResults'] for a in f['assertionResults'] if a['status'] == 'failed']
    return {'exit': test.returncode, 'failed': failed, 'failedCount': data['numFailedTests'], 'total': data['numTotalTests']}


def write(name, command, result):
    with open(f'{I}/mutation-{slug(name)}.log.txt', 'w') as log:
        log.write(f'mutation: {name}\n{command}\n{json.dumps(result, indent=1)}\n')
    print(name, '::', result.get('exit', result.get('build')), result.get('failedCount'), flush=True)


only = sys.argv[1:]
if not only:
    for kind in (S, T):
        run(['npm', 'run', 'build:src:styles'])
        write(f'control {kind}', 'unmutated', measure(kind))
for name, (kind, rel, old, new) in MUTATIONS.items():
    if only and name not in only:
        continue
    path = f'{BASE}/{rel}'
    pristine = open(path).read()
    assert pristine.count(old) == 1, (name, pristine.count(old))
    try:
        open(path, 'w').write(pristine.replace(old, new))
        result = measure(kind)
    finally:
        open(path, 'w').write(pristine)
    write(name, f'{rel}: {old!r} -> {new!r}', result)
print('restored build', run(['npm', 'run', 'build:src:styles']).returncode)
