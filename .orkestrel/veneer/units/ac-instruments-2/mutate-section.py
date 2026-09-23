"""Applies one named mutation to the staged accordion specimens, runs the section proof, records the
failing case titles, and restores the constants.

Round 2: supersedes ac-instruments/mutate-section.py. The stage is tmp/probe/base, addressed from
this file's own directory."""
import json, os, re, subprocess, sys

STAGE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'probe', 'base')
CONSTANTS = os.path.join(STAGE, 'app/browser/constants.ts')
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
MUTATIONS = {
    'flush-class-dropped': ('<div class="accordion accordion-flush">', '<div class="accordion">'),
    'collapsed-dropped-over-hidden-panel': ('aria-controls="accordion-returns"', 'aria-controls="accordion-returns" data-probe'),
    'show-added-under-collapsed': ('<div class="accordion-collapse collapse" id="accordion-warranty">', '<div class="accordion-collapse collapse show" id="accordion-warranty">'),
    'aria-expanded-disagrees': ('aria-expanded="false" aria-controls="accordion-refunds"', 'aria-expanded="true" aria-controls="accordion-refunds"'),
}
for name in sys.argv[1:]:
    old, new = MUTATIONS[name]
    source = open(CONSTANTS).read()
    try:
        if name == 'collapsed-dropped-over-hidden-panel':
            target = '<button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="accordion-returns">'
            assert source.count(target) == 1
            mutated = source.replace(target, '<button class="accordion-button" type="button" aria-expanded="false" aria-controls="accordion-returns">')
        else:
            assert source.count(old) == 1, old
            mutated = source.replace(old, new)
        open(CONSTANTS, 'w').write(mutated)
        test = subprocess.run(['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser', 'tests/app/browser/sections/AccordionSection.test.ts'], cwd=STAGE, env=ENV, capture_output=True, text=True)
        failed = sorted(set(re.findall(r'FAIL .*?> AccordionSection > (.*)$', test.stdout + test.stderr, re.M)))
        tally = re.findall(r'Tests\s+(.*)', test.stdout)
        print(json.dumps({'mutation': name, 'exit': test.returncode, 'tally': tally[-1] if tally else '', 'failed': failed}), flush=True)
    finally:
        open(CONSTANTS, 'w').write(source)
