"""Applies one named mutation to the validation copy's carousel partial, rebuilds the styles, runs
the shipped carousel proof, writes one log per mutation, and restores the partial byte for byte.

Usage: python3 mutate.py NAME [NAME ...]; the name `none` runs the unmutated control.
Each log carries the mutation's exact before and after text, the proof's `RUN` line, the `Tests`
tally, the exit code, and every red case title, and the full proof output after them."""
import hashlib, os, pathlib, re, subprocess, sys

W = pathlib.Path('/home/user/veneer-ca')
BASE = W / 'tmp/probe/base'
PARTIAL = BASE / 'src/styles/components/_carousel.scss'
LOGS = W / 'tmp/units/ca-instruments-2/logs/mutations'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
PROOF = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot', 'tests/src/styles/components/carousel.test.ts']
MUTATIONS = {
    'item-display-block': ('\t\tposition: relative;\n\t\tdisplay: none;\n\t\tfloat: left;', '\t\tposition: relative;\n\t\tdisplay: block;\n\t\tfloat: left;'),
    'active-display-dropped': ('\t.carousel-item.active,\n\t.carousel-item-next,', '\t.carousel-item-next,'),
    'next-display-dropped': ('\t.carousel-item.active,\n\t.carousel-item-next,\n\t.carousel-item-prev {', '\t.carousel-item.active,\n\t.carousel-item-prev {'),
    'prev-display-dropped': ('\t.carousel-item-next,\n\t.carousel-item-prev {\n\t\tdisplay: block;', '\t.carousel-item-next {\n\t\tdisplay: block;'),
    'next-guard-dropped': ('.carousel-item-next:not(.carousel-item-start),', '.carousel-item-next,'),
    'prev-guard-dropped': ('.carousel-item-prev:not(.carousel-item-end),', '.carousel-item-prev,'),
    'active-end-dropped': ('.carousel-item-next:not(.carousel-item-start),\n\t.active.carousel-item-end {', '.carousel-item-next:not(.carousel-item-start) {'),
    'active-start-dropped': ('.carousel-item-prev:not(.carousel-item-end),\n\t.active.carousel-item-start {', '.carousel-item-prev:not(.carousel-item-end) {'),
    'fade-item-opacity-dropped': ('\t\topacity: 0;\n\t\ttransition-property: opacity;', '\t\ttransition-property: opacity;'),
    'fade-active-dropped': ('\t.carousel-fade .carousel-item.active,\n', ''),
    'fade-incoming-dropped': ('\t.carousel-fade .carousel-item-next.carousel-item-start,\n', ''),
    'fade-prev-incoming-dropped': ('\t.carousel-fade .carousel-item-prev.carousel-item-end {', '\t.carousel-fade .carousel-item-prev-unused.carousel-item-end {'),
    'fade-delay-dropped': ('@include transition(opacity 0s 0.6s);', '@include transition(opacity 0s);'),
    'fade-bare-transition': ('@include transition(opacity 0s 0.6s);', 'transition: opacity 0s 0.6s;'),
    'item-bare-transition': ('@include transition(transform 0.6s ease-in-out);', 'transition: transform 0.6s ease-in-out;'),
    'control-bare-transition': ('@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-standard));', 'transition: opacity var(--vn-motion-feedback) var(--vn-ease-standard);'),
    'indicator-bare-transition': ('@include transition(opacity 0.6s ease);', 'transition: opacity 0.6s ease;'),
    'control-literal-duration': ('@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-standard));', '@include transition(opacity 0.15s ease);'),
    'control-literal-filter': ('filter: var(--bs-carousel-control-icon-filter);', 'filter: invert(1) grayscale(100);'),
    'prev-left-dropped': ('\t.carousel-control-prev {\n\t\tleft: 0;\n\t}\n', ''),
    'next-right-dropped': ('\t.carousel-control-next {\n\t\tright: 0;\n\t}\n', ''),
    'hover-dropped': ('\t.carousel-control-prev:hover,\n\t.carousel-control-prev:focus,\n\t.carousel-control-next:hover,\n\t.carousel-control-next:focus {', '\t.carousel-control-prev:focus,\n\t.carousel-control-next:focus {'),
    'focus-dropped': ('\t.carousel-control-prev:hover,\n\t.carousel-control-prev:focus,\n\t.carousel-control-next:hover,\n\t.carousel-control-next:focus {', '\t.carousel-control-prev:hover,\n\t.carousel-control-next:hover {'),
    'icons-swapped': None,
    'indicator-border-box': ('\t\tbox-sizing: content-box;\n\t\tflex: 0 1 auto;', '\t\tbox-sizing: border-box;\n\t\tflex: 0 1 auto;'),
    'indicator-literal-inset': ('margin-bottom: var(--vn-space-8);', 'margin-bottom: 1rem;'),
    'active-pip-dropped': ('\t.carousel-indicators .active {\n\t\topacity: 1;\n\t}\n', ''),
    'caption-literal-white': ('color: var(--bs-carousel-caption-color);', 'color: #fff;'),
    'dark-omits-filter': ("\t\t--bs-carousel-control-icon-filter: #{map.get(tokens.$dark, 'carousel-icon-filter')};\n", ''),
    'pointer-event-dropped': ('\t.carousel.pointer-event {\n\t\ttouch-action: pan-y;\n\t}\n', ''),
    'carousel-position-dropped': ('\t.carousel {\n\t\tposition: relative;\n\t}\n', ''),
    'track-overflow-dropped': ('\t\twidth: 100%;\n\t\toverflow: hidden;\n', '\t\twidth: 100%;\n'),
    'clearfix-dropped': ("\t.carousel-inner::after {\n\t\tdisplay: block;\n\t\tclear: both;\n\t\tcontent: '';\n\t}\n", ''),
    'extra-rule': ('\t.carousel-caption {', '\t.carousel-caption p {\n\t\tmargin: 0;\n\t}\n\n\t.carousel-caption {'),
}


def swap_icons(text):
    prev = re.search(r"\.carousel-control-prev-icon \{\n\t\tbackground-image: (url\([^\n]*\));", text)
    nxt = re.search(r"\.carousel-control-next-icon \{\n\t\tbackground-image: (url\([^\n]*\));", text)
    a, b = prev.group(1), nxt.group(1)
    return text.replace(a, '@@PREV@@').replace(b, a).replace('@@PREV@@', b), a, b


def strip(text):
    return re.sub(r'\x1b\[[0-9;]*m', '', text)


def run(name):
    original = PARTIAL.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    text = original.decode()
    header = [f'# mutation {name}', f'partial: {PARTIAL.relative_to(BASE)} sha256 {digest}']
    if name == 'icons-swapped':
        text, a, b = swap_icons(text)
        header += ['edit: the previous and the next background-image URIs exchanged']
    elif name == 'none':
        header += ['edit: none (the unmutated control)']
    else:
        old, new = MUTATIONS[name]
        assert text.count(old) == 1, name
        text = text.replace(old, new)
        header += ['edit before:', old, 'edit after:', new if new else '(removed)']
    try:
        PARTIAL.write_text(text)
        build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True)
        assert build.returncode == 0, build.stdout + build.stderr
        test = subprocess.run(PROOF, cwd=BASE, env=ENV, capture_output=True, text=True)
    finally:
        PARTIAL.write_bytes(original)
    assert hashlib.sha256(PARTIAL.read_bytes()).hexdigest() == digest
    out = strip(test.stdout + test.stderr)
    run_line = next((line.strip() for line in out.splitlines() if line.strip().startswith('RUN ')), 'no RUN line')
    tally = next((line.strip() for line in out.splitlines() if line.strip().startswith('Tests ')), 'no tally')
    red = sorted(set(re.findall(r'FAIL .*?carousel\.test\.ts(?::\d+:\d+)? > (.*)', out)))
    LOGS.mkdir(parents=True, exist_ok=True)
    body = header + ['command: ' + ' '.join(PROOF), run_line, tally, f'exit={test.returncode}']
    body += [f'red: {title}' for title in red]
    body += ['restored: sha256 matches', '--- proof output ---', out]
    (LOGS / f'{name}.log.txt').write_text('\n'.join(body) + '\n')
    print(f'{name}\texit={test.returncode}\t{tally}')
    for title in red:
        print(f'\tred: {title}')


for name in sys.argv[1:]:
    run(name)
