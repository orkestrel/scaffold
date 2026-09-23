"""Applies one named mutation to the validation copy's carousel specimens, runs the section proof,
records the failing count, and restores the constants byte for byte."""
import hashlib, pathlib, re, subprocess, sys, os
BASE = pathlib.Path('/home/user/veneer-ca/tmp/probe/base')
FILE = BASE / 'app/browser/constants.ts'
LOG = pathlib.Path('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/ca/section-mutations.log.txt')
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
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
}
def run(name):
    original = FILE.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    text = original.decode()
    for old, new in MUTATIONS.get(name, []):
        assert old in text, (name, old)
        text = text.replace(old, new)
    try:
        FILE.write_text(text)
        test = subprocess.run(['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser', 'tests/app/browser/sections/CarouselSection.test.ts'], cwd=BASE, env=ENV, capture_output=True, text=True)
        out = re.sub(r'\x1b\[[0-9;]*m', '', test.stdout + test.stderr)
        tests = re.search(r'Tests\s+(.*)', out)
        failed = sorted(set(re.findall(r'FAIL .*?CarouselSection\.test\.ts[^>]*> CarouselSection > (.*)', out)))
    finally:
        FILE.write_bytes(original)
    assert hashlib.sha256(FILE.read_bytes()).hexdigest() == digest
    with LOG.open('a') as log:
        log.write(f'## {name}\nexit={test.returncode} {tests.group(1) if tests else "no tally"}\n')
        for f in failed: log.write(f'  red: {f}\n')
    print(name, test.returncode, tests.group(1) if tests else None, len(failed))
for name in sys.argv[1:]:
    run(name)
