"""Applies each named mutation to the staged partial or barrel, rebuilds the cascade, runs the nav proof, and restores."""
import json, os, subprocess, sys
SC = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
STAGE = f'{SC}/nv-stage'
ENV = dict(os.environ, PATH=f'{SC}/npm11/node_modules/.bin:' + os.environ['PATH'])
NAV = 'src/styles/components/_nav.scss'
INDEX = 'src/styles/index.scss'

MUTATIONS = {
    'ring on :focus': (NAV, '.nav-link:focus-visible {\n\t\toutline: 0;', '.nav-link:focus {\n\t\toutline: 0;'),
    'forced-ring omitted': (NAV, '\t\t@include forced-ring;\n', ''),
    'tab margin-bottom dropped': (NAV, '\t\tmargin-bottom: calc(-1 * var(--bs-nav-tabs-border-width));\n\t\tborder: var(--bs-nav-tabs-border-width) solid transparent;', '\t\tborder: var(--bs-nav-tabs-border-width) solid transparent;'),
    'show item left out of the list': (NAV, '\t.nav-tabs .nav-link.active,\n\t.nav-tabs .nav-item.show .nav-link {', '\t.nav-tabs .nav-link.active {'),
    'tabs menu rule dropped': (NAV, '\t.nav-tabs .dropdown-menu {\n\t\tmargin-top: calc(-1 * var(--bs-nav-tabs-border-width));\n\t\tborder-top-left-radius: 0;\n\t\tborder-top-right-radius: 0;\n\t}\n', ''),
    'justified written as fill': (NAV, '\t\tflex-grow: 1;\n\t\tflex-basis: 0;\n', '\t\tflex: 1 1 auto;\n'),
    'pane display dropped': (NAV, '\t.tab-content > .tab-pane {\n\t\tdisplay: none;\n\t}\n', ''),
    'active pane display dropped': (NAV, '\t.tab-content > .active {\n\t\tdisplay: block;\n\t}\n', ''),
    'link color read past its slot': (NAV, '\t\tcolor: var(--bs-nav-link-color);\n\t\ttext-decoration: none;', '\t\tcolor: var(--bs-link-color);\n\t\ttext-decoration: none;'),
    'link color fixed to the palette': (NAV, '--bs-nav-link-color: var(--bs-link-color);', '--bs-nav-link-color: var(--vn-palette-blue);'),
    'nav loads after card': (INDEX, "@use 'components/nav';\n@use 'components/card';\n", "@use 'components/card';\n@use 'components/nav';\n"),
    'nav rule dropped': (NAV, '\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n', ''),
    'link padding read past its slots': (NAV, '\t\tpadding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);', '\t\tpadding: 0.5rem 1rem;'),
    'transition written without the mixin': (NAV, '\t\t@include transition(\n\t\t\t(color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out)\n\t\t);', '\t\ttransition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;'),
    'hover rule dropped': (NAV, '\t.nav-link:hover,\n\t.nav-link:focus {\n\t\tcolor: var(--bs-nav-link-hover-color);', '\t.nav-link:focus {\n\t\tcolor: var(--bs-nav-link-hover-color);'),
    'focus left out of the hover pair': (NAV, '\t.nav-link:hover,\n\t.nav-link:focus {\n\t\tcolor: var(--bs-nav-link-hover-color);', '\t.nav-link:hover {\n\t\tcolor: var(--bs-nav-link-hover-color);'),
    'disabled pointer refusal dropped': (NAV, '\t\tpointer-events: none;\n\t\tcursor: default;\n', ''),
    'disabled button left out': (NAV, '\t.nav-link.disabled,\n\t.nav-link:disabled {', '\t.nav-link.disabled {'),
    'tab hover dropped': (NAV, '\t.nav-tabs .nav-link:hover,\n\t.nav-tabs .nav-link:focus {', '\t.nav-tabs .nav-link:focus {'),
    'tab focus dropped': (NAV, '\t.nav-tabs .nav-link:hover,\n\t.nav-tabs .nav-link:focus {', '\t.nav-tabs .nav-link:hover {'),
    'pill show left out': (NAV, '\t.nav-pills .nav-link.active,\n\t.nav-pills .show > .nav-link {', '\t.nav-pills .nav-link.active {'),
    'underline show left out': (NAV, '\t.nav-underline .nav-link.active,\n\t.nav-underline .show > .nav-link {', '\t.nav-underline .nav-link.active {'),
    'underline hover dropped': (NAV, '\t.nav-underline .nav-link:hover,\n\t.nav-underline .nav-link:focus {', '\t.nav-underline .nav-link:focus {'),
    'underline focus dropped': (NAV, '\t.nav-underline .nav-link:hover,\n\t.nav-underline .nav-link:focus {', '\t.nav-underline .nav-link:hover {'),
    'bare fill link left out': (NAV, '\t.nav-fill > .nav-link,\n\t.nav-fill .nav-item {', '\t.nav-fill .nav-item {'),
    'item link width dropped': (NAV, '\t\twidth: 100%;\n', ''),
    'underline gap read past its slot': (NAV, '\t\tgap: var(--bs-nav-underline-gap);', '\t\tgap: 1rem;'),
    'underline stroke read through a space token': (NAV, '--bs-nav-underline-border-width: 0.125rem;', '--bs-nav-underline-border-width: var(--vn-space-1);'),
    'tab active paint dropped': (NAV, '\t\tbackground-color: var(--bs-nav-tabs-link-active-bg);\n', ''),
}

def run(cmd):
    return subprocess.run(cmd, cwd=STAGE, env=ENV, capture_output=True, text=True)

only = sys.argv[1:]
results = {}
for name, (rel, old, new) in MUTATIONS.items():
    if only and name not in only:
        continue
    path = f'{STAGE}/{rel}'
    pristine = open(path).read()
    assert pristine.count(old) == 1, (name, pristine.count(old))
    try:
        open(path, 'w').write(pristine.replace(old, new))
        build = run(['npm', 'run', 'build:src:styles'])
        if build.returncode != 0:
            results[name] = {'build': build.returncode, 'tail': build.stderr[-400:]}
            continue
        report = f'{SC}/nv-unit/mut-report.json'
        test = run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=json', f'--outputFile={report}', 'tests/src/styles/components/nav.test.ts', 'tests/src/styles/components/card.test.ts'])
        data = json.load(open(report))
        failed = [f"{os.path.basename(f['name'])} > {a['title']}" for f in data['testResults'] for a in f['assertionResults'] if a['status'] == 'failed']
        results[name] = {'exit': test.returncode, 'failed': failed, 'total': data['numTotalTests'], 'failedCount': data['numFailedTests']}
    finally:
        open(path, 'w').write(pristine)
    print(name, json.dumps(results[name]), flush=True)
rebuild = run(['npm', 'run', 'build:src:styles'])
print('restored build', rebuild.returncode)
json.dump(results, open(f'{SC}/nv-unit/mutations.json', 'w'), indent=1)
