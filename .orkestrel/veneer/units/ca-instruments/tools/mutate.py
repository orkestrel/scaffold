"""Applies one named mutation to the validation copy's carousel partial, rebuilds the styles, runs
the carousel proof, records the failing count, and restores the partial byte for byte."""
import hashlib, pathlib, re, subprocess, sys, os
BASE = pathlib.Path('/home/user/veneer-ca/tmp/probe/base')
PARTIAL = BASE / 'src/styles/components/_carousel.scss'
LOG = pathlib.Path('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/ca/mutations.log.txt')
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
MUTATIONS = {
    'item-display-block': ('\t\tposition: relative;\n\t\tdisplay: none;\n\t\tfloat: left;', '\t\tposition: relative;\n\t\tdisplay: block;\n\t\tfloat: left;'),
    'next-guard-dropped': ('.carousel-item-next:not(.carousel-item-start),', '.carousel-item-next,'),
    'prev-guard-dropped': ('.carousel-item-prev:not(.carousel-item-end),', '.carousel-item-prev,'),
    'fade-delay-dropped': ('@include transition(opacity 0s 0.6s);', '@include transition(opacity 0s);'),
    'item-bare-transition': ('@include transition(transform 0.6s ease-in-out);', 'transition: transform 0.6s ease-in-out;'),
    'control-bare-transition': ('@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-standard));', 'transition: opacity var(--vn-motion-feedback) var(--vn-ease-standard);'),
    'indicator-bare-transition': ('@include transition(opacity 0.6s ease);', 'transition: opacity 0.6s ease;'),
    'control-literal-duration': ('@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-standard));', '@include transition(opacity 0.15s ease);'),
    'control-literal-filter': ('filter: var(--bs-carousel-control-icon-filter);', 'filter: invert(1) grayscale(100);'),
    'icons-swapped': None,
    'indicator-border-box': ('\t\tbox-sizing: content-box;\n\t\tflex: 0 1 auto;', '\t\tbox-sizing: border-box;\n\t\tflex: 0 1 auto;'),
    'indicator-literal-inset': ('margin-bottom: var(--vn-space-8);', 'margin-bottom: 1rem;'),
    'caption-literal-white': ('color: var(--bs-carousel-caption-color);', 'color: #fff;'),
    'dark-omits-filter': ("\t\t--bs-carousel-control-icon-filter: #{map.get(tokens.$dark, 'carousel-icon-filter')};\n", ''),
    'pointer-event-dropped': ('\t.carousel.pointer-event {\n\t\ttouch-action: pan-y;\n\t}\n', ''),
    'focus-dropped': ('\t.carousel-control-prev:hover,\n\t.carousel-control-prev:focus,\n\t.carousel-control-next:hover,\n\t.carousel-control-next:focus {', '\t.carousel-control-prev:hover,\n\t.carousel-control-next:hover {'),
    'clearfix-dropped': ("\t.carousel-inner::after {\n\t\tdisplay: block;\n\t\tclear: both;\n\t\tcontent: '';\n\t}\n", ''),
    'active-end-dropped': ('.carousel-item-next:not(.carousel-item-start),\n\t.active.carousel-item-end {', '.carousel-item-next:not(.carousel-item-start) {'),
    'active-start-dropped': ('.carousel-item-prev:not(.carousel-item-end),\n\t.active.carousel-item-start {', '.carousel-item-prev:not(.carousel-item-end) {'),
    'fade-item-opacity-dropped': ('\t\topacity: 0;\n\t\ttransition-property: opacity;', '\t\ttransition-property: opacity;'),
    'fade-incoming-dropped': ('\t.carousel-fade .carousel-item-next.carousel-item-start,\n', ''),
    'fade-bare-transition': ('@include transition(opacity 0s 0.6s);', 'transition: opacity 0s 0.6s;'),
    'prev-left-dropped': ('\t.carousel-control-prev {\n\t\tleft: 0;\n\t}\n', ''),
    'active-pip-dropped': ('\t.carousel-indicators .active {\n\t\topacity: 1;\n\t}\n', ''),
    'carousel-position-dropped': ('\t.carousel {\n\t\tposition: relative;\n\t}\n', ''),
    'hover-dropped': ('\t.carousel-control-prev:hover,\n\t.carousel-control-prev:focus,\n\t.carousel-control-next:hover,\n\t.carousel-control-next:focus {', '\t.carousel-control-prev:focus,\n\t.carousel-control-next:focus {'),
    'fade-prev-incoming-dropped': ('\t.carousel-fade .carousel-item-prev.carousel-item-end {', '\t.carousel-fade .carousel-item-prev-unused.carousel-item-end {'),
    'active-display-dropped': ('\t.carousel-item.active,\n\t.carousel-item-next,', '\t.carousel-item-next,'),
    'track-overflow-dropped': ('\t\twidth: 100%;\n\t\toverflow: hidden;\n', '\t\twidth: 100%;\n'),
    'extra-rule': ('\t.carousel-caption {', '\t.carousel-caption p {\n\t\tmargin: 0;\n\t}\n\n\t.carousel-caption {'),
}
def run(name):
    original = PARTIAL.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    text = original.decode()
    if name == 'icons-swapped':
        prev = re.search(r"(\.carousel-control-prev-icon \{\n\t\tbackground-image: )(url\([^\n]*\));", text)
        nxt = re.search(r"(\.carousel-control-next-icon \{\n\t\tbackground-image: )(url\([^\n]*\));", text)
        a, b = prev.group(2), nxt.group(2)
        text = text.replace(a, '@@PREV@@').replace(b, a).replace('@@PREV@@', b)
    elif name != 'none':
        old, new = MUTATIONS[name]
        assert text.count(old) == 1, name
        text = text.replace(old, new)
    try:
        PARTIAL.write_text(text)
        build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True)
        assert build.returncode == 0, build.stdout + build.stderr
        test = subprocess.run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot', 'tests/src/styles/components/carousel.test.ts'], cwd=BASE, env=ENV, capture_output=True, text=True)
        out = re.sub(r'\x1b\[[0-9;]*m', '', test.stdout + test.stderr)
        tests = re.search(r'Tests\s+(.*)', out)
        failed = sorted(set(re.findall(r'FAIL .*?carousel\.test\.ts[^>]*> (.*)', out)))
    finally:
        PARTIAL.write_bytes(original)
    assert hashlib.sha256(PARTIAL.read_bytes()).hexdigest() == digest
    with LOG.open('a') as log:
        log.write(f'## {name}\nexit={test.returncode} {tests.group(1) if tests else "no tally"}\n')
        for f in failed: log.write(f'  red: {f}\n')
    print(name, test.returncode, tests.group(1) if tests else None, len(failed))
for name in sys.argv[1:]:
    run(name)
