"""Applies one named mutation to the validation copy's carousel specimens in `app/browser/constants.ts`,
runs the shipped section proof, writes one log per mutation, and restores the constants byte for byte.

Usage: python3 mutate-section.py NAME [NAME ...]; the name `none` runs the unmutated control."""
import hashlib, os, pathlib, re, subprocess, sys

W = pathlib.Path('/home/user/veneer-ca')
BASE = W / 'tmp/probe/base'
FILE = BASE / 'app/browser/constants.ts'
LOGS = pathlib.Path(os.environ.get('CA_LOGS', str(W / 'tmp/units/ca-instruments-2/logs/section-mutations')))
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
PROOF = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser', 'tests/app/browser/sections/CarouselSection.test.ts']
MUTATIONS = {
    'advancing-direction-dropped': [('class="carousel-item active carousel-item-start"', 'class="carousel-item active"'), ('class="carousel-item carousel-item-next carousel-item-start"', 'class="carousel-item carousel-item-next"')],
    'inverted-class-dropped': [('class="carousel carousel-dark"', 'class="carousel"')],
    'slide-class-added': [('id="pier-carousel" class="carousel"', 'id="pier-carousel" class="carousel slide"')],
    'aria-current-dropped': [('data-bs-slide-to="0" class="active" aria-current="true" aria-label="Pier 1"', 'data-bs-slide-to="0" class="active" aria-label="Pier 1"')],
    'control-label-dropped': [(' aria-label="Previous pier"', '')],
    'indicator-target-dropped': [('data-bs-target="#chart-carousel" data-bs-slide-to="1"', 'data-bs-slide-to="1"')],
    'inline-style-added': [('<div id="tide-carousel" class="carousel carousel-fade">', '<div id="tide-carousel" class="carousel carousel-fade" style="height: 200px">')],
    'fade-class-dropped': [('class="carousel carousel-fade"', 'class="carousel"')],
    'captions-dropped': [('<div class="carousel-caption"><h5>South pier</h5><p>Ferries leave on the hour.</p></div>', '')],
    # Visible text laid out after the picture inside the captioned specimen's resting slide.
    'stray-block': [('alt="North pier at dawn" width="800" height="400"><div class="carousel-caption">', 'alt="North pier at dawn" width="800" height="400"><p>Tide table</p><div class="carousel-caption">')],
    # The captioned specimen's resting picture: the shape's fill raised from #6c757d to a light gray.
    'path-lightened': [("fill=\\'%236c757d\\'/%3E%3C/svg%3E\" alt=\"North pier at dawn\"", "fill=\\'%23dee2e6\\'/%3E%3C/svg%3E\" alt=\"North pier at dawn\"")],
}


def strip(text):
    return re.sub(r'\x1b\[[0-9;]*m', '', text)


def run(name):
    original = FILE.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    text = original.decode()
    header = [f'# section mutation {name}', f'file: {FILE.relative_to(BASE)} sha256 {digest}']
    if name == 'none':
        header += ['edit: none (the unmutated control)']
    for old, new in MUTATIONS.get(name, []):
        assert text.count(old) == 1, (name, old)
        text = text.replace(old, new)
        header += ['edit before:', old, 'edit after:', new if new else '(removed)']
    try:
        FILE.write_text(text)
        test = subprocess.run(PROOF, cwd=BASE, env=ENV, capture_output=True, text=True)
    finally:
        FILE.write_bytes(original)
    assert hashlib.sha256(FILE.read_bytes()).hexdigest() == digest
    out = strip(test.stdout + test.stderr)
    run_line = next((line.strip() for line in out.splitlines() if line.strip().startswith('RUN ')), 'no RUN line')
    tally = next((line.strip() for line in out.splitlines() if line.strip().startswith('Tests ')), 'no tally')
    red = sorted(set(re.findall(r'FAIL .*?CarouselSection\.test\.ts(?::\d+:\d+)? > CarouselSection > (.*)', out)))
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
