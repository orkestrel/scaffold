"""Applies one named mutation at a time to the staged accordion partial or tokens, rebuilds the
styles, runs the accordion proof, records the failing case titles, and restores the files.

Round 2: supersedes ac-instruments/mutate.py. The stage is tmp/probe/base, addressed from this
file's own directory unless the STAGE variable names another copy, and the mutation
`button-padding-literal` is added."""
import json, os, re, subprocess, sys

STAGE = os.environ.get('STAGE') or os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'probe', 'base')
PARTIAL = os.path.join(STAGE, 'src/styles/components/_accordion.scss')
TOKENS = os.path.join(STAGE, 'src/styles/_tokens.scss')
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])

ASSET_ROWS = "\t'toggler-icon': '--bs-navbar-toggler-icon-bg',\n"
RESTORED_ROWS = ASSET_ROWS + "\t'accordion-icon': '--bs-accordion-btn-icon',\n\t'accordion-active-icon': '--bs-accordion-btn-active-icon',\n"
DARK_RULE = re.compile(r"\n\t// The release gives each chevron.*?\n\t\}\n", re.S)

def drop(selector):
    pattern = re.compile(r"\n\t" + re.escape(selector) + r" \{[^}]*\}\n")
    return lambda s: pattern.sub('\n', s, count=1) if pattern.search(s) else fail(selector)

def fail(what):
    raise SystemExit('mutation target not found: ' + what)

def swap(old, new):
    return lambda s: s.replace(old, new, 1) if old in s else fail(old)

MUTATIONS = {
    'not-collapsed-inverted': swap('.accordion-button:not(.collapsed) {', '.accordion-button.collapsed {'),
    'not-collapsed-after-inverted': swap('.accordion-button:not(.collapsed)::after {', '.accordion-button.collapsed::after {'),
    'one-icon-for-both': swap('background-image: var(--bs-accordion-btn-active-icon);', 'background-image: var(--bs-accordion-btn-icon);'),
    'first-item-dropped': drop('.accordion-item:first-of-type'),
    'first-button-dropped': drop('.accordion-item:first-of-type > .accordion-header .accordion-button'),
    'later-top-border-dropped': drop('.accordion-item:not(:first-of-type)'),
    'last-item-dropped': drop('.accordion-item:last-of-type'),
    'last-button-dropped': drop('.accordion-item:last-of-type > .accordion-header .accordion-button.collapsed'),
    'last-button-unqualified': swap('.accordion-item:last-of-type > .accordion-header .accordion-button.collapsed {', '.accordion-item:last-of-type > .accordion-header .accordion-button {'),
    'last-panel-dropped': drop('.accordion-item:last-of-type > .accordion-collapse'),
    'flush-item-dropped': drop('.accordion-flush > .accordion-item'),
    'flush-first-dropped': drop('.accordion-flush > .accordion-item:first-child'),
    'flush-last-dropped': drop('.accordion-flush > .accordion-item:last-child'),
    'flush-collapsed-dropped': swap(',\n\t.accordion-flush > .accordion-item > .accordion-header .accordion-button.collapsed {', ' {'),
    'flush-radius-dropped': swap('\t.accordion-flush > .accordion-item > .accordion-collapse,\n\t.accordion-flush > .accordion-item > .accordion-header .accordion-button,\n\t.accordion-flush > .accordion-item > .accordion-header .accordion-button.collapsed {\n\t\tborder-radius: 0;\n\t}\n', ''),
    'flush-panel-dropped': swap('\t.accordion-flush > .accordion-item > .accordion-collapse,\n', '\t'),
    'item-dropped': drop('.accordion-item'),
    'body-dropped': drop('.accordion-body'),
    'chevron-dropped': drop('.accordion-button::after'),
    'dark-rule-dropped': lambda s: DARK_RULE.sub('\n', s, count=1),
    'focus-shadow-dropped': swap('\t\tbox-shadow: var(--bs-accordion-btn-focus-box-shadow);\n', ''),
    'focus-lift-dropped': swap('\t\tz-index: 3;\n', ''),
    'hover-lift-dropped': drop('.accordion-button:hover'),
    'forced-ring-omitted': swap('\t\t@include forced-ring;\n', ''),
    'button-motion-outside-mixin': swap('@include transition(var(--bs-accordion-transition));', 'transition: var(--bs-accordion-transition);'),
    'chevron-motion-outside-mixin': swap('@include transition(var(--bs-accordion-btn-icon-transition));', 'transition: var(--bs-accordion-btn-icon-transition);'),
    'active-bg-literal': swap('background-color: var(--bs-accordion-active-bg);', 'background-color: var(--bs-primary-bg-subtle);'),
    'button-padding-literal': swap('padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);', 'padding: 1rem 1.25rem;'),
    'padding-y-literal': swap('--bs-accordion-btn-padding-y: var(--vn-space-8);', '--bs-accordion-btn-padding-y: 1rem;'),
    'header-margin-dropped': drop('.accordion-header'),
    'header-margin-changed': swap('\t\tmargin-bottom: 0;\n', '\t\tmargin-bottom: 1rem;\n'),
}

TOKEN_MUTATIONS = {
    'asset-rows-kept': (swap(ASSET_ROWS, RESTORED_ROWS), None),
    'retune-left-at-theme-scope': (swap(ASSET_ROWS, RESTORED_ROWS), lambda s: DARK_RULE.sub('\n', s, count=1)),
}

def run(name, partial_edit, tokens_edit):
    partial, tokens = open(PARTIAL).read(), open(TOKENS).read()
    try:
        if partial_edit: open(PARTIAL, 'w').write(partial_edit(partial))
        if tokens_edit: open(TOKENS, 'w').write(tokens_edit(tokens))
        build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=STAGE, env=ENV, capture_output=True, text=True)
        if build.returncode != 0:
            return {'mutation': name, 'build': build.returncode}
        test = subprocess.run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=verbose', 'tests/src/styles/components/accordion.test.ts'], cwd=STAGE, env=ENV, capture_output=True, text=True)
        failed = sorted(set(re.findall(r'FAIL .*?> accordion classes > (.*)$', test.stdout + test.stderr, re.M)))
        tally = re.findall(r'Tests\s+(.*)', test.stdout)
        return {'mutation': name, 'exit': test.returncode, 'tally': tally[-1] if tally else '', 'failed': failed}
    finally:
        open(PARTIAL, 'w').write(partial)
        open(TOKENS, 'w').write(tokens)

names = sys.argv[1:]
for name in names:
    if name in MUTATIONS:
        result = run(name, MUTATIONS[name], None)
    else:
        tokens_edit, partial_edit = TOKEN_MUTATIONS[name]
        result = run(name, partial_edit, tokens_edit)
    print(json.dumps(result), flush=True)
