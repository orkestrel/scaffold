# Replays a unit's mutation instrument unchanged and records the first failure message of each
# killed case, so a kill caused by a broken plant (an unbound identifier, a syntax error) is visible.
# Usage: python causes.py <instrument.py> <out.txt>
import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path

SCRATCH = Path(__file__).resolve().parent
instrument = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve()

spec = importlib.util.spec_from_file_location('instrument', instrument)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

report = SCRATCH / 'cause-report.json'
module.LOG = SCRATCH / 'cause-instrument.log.txt'
causes = []
BROKEN = re.compile(r'ReferenceError|is not defined|SyntaxError|Transform failed|Failed to parse|Cannot access .* before initialization|is not a function', re.I)


def run(test, case):
    if report.exists():
        report.unlink()
    subprocess.run(
        ['node', str(module.VITEST), 'run', '--config', 'vite.config.ts', '--no-cache', '--project', 'src:browser', '--reporter=json', f'--outputFile={report.as_posix()}', test],
        cwd=module.ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if not report.exists():
        causes.append((case, 'NO REPORT', ''))
        return 'NO REPORT'
    data = json.loads(report.read_text(encoding='utf-8'))
    found = [r for s in data.get('testResults', []) for r in s.get('assertionResults', []) if r.get('fullName') == case]
    if len(found) != 1:
        causes.append((case, f'NOT COLLECTED ({len(found)})', ''))
        return f'NOT COLLECTED ({len(found)})'
    messages = found[0].get('failureMessages', [])
    first = messages[0].splitlines()[0] if messages else ''
    causes.append((case, found[0]['status'], first))
    return found[0]['status']


module.run = run
try:
    module.main()
except SystemExit as exit:
    code = exit.code
lines = [f'instrument {instrument}', f'instrument exit={code}']
broken = 0
for case, status, first in causes:
    flag = 'BROKEN' if BROKEN.search(first) else 'ok'
    if flag == 'BROKEN':
        broken += 1
    lines.append(f'{flag} | {status} | {case[:90]} | {first[:220]}')
lines.append(f'broken {broken}')
out.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print('\n'.join(lines))
