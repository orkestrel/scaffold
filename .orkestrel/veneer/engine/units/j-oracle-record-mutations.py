"""J-ORACLE-RECORD per-plugin mutation run.

Each row names one mutation of tmp/probe/mutation.test.ts's MUTATIONS table. The row plants its
mutation in the in-memory compile of Veneer's source, never in a source file, records the row's
plugin under Veneer and under the planted Veneer, compares each against Bootstrap's saved fixture
through the real collectEngineDepartures comparison, and asserts that the planted recording adds
no departure on the row's named difference.

Rule: a failed case counts as KILLED only when the first line of its failure message names an
assertion failure: it starts with `AssertionError`, or with `expected `, the expect library's own
assertion message. Every other failure reads REFUSED, and so does a case that was not collected or a
run that reports a suite-level error. A passed case reads HELD only when the whole run reports
success, with no failed case, no failed suite, and no unhandled error; otherwise it reads REFUSED.
The CONTROL row plants an equivalent spelling and must read HELD. The BOOM row plants a thrown
`Error('boom')` and the UNBOUND row names a span the source lacks; both must read REFUSED.

Every source file a row names is hashed before the first row and after the last, and the run prints
the receipt `sources unchanged` when every digest matches, since no row writes a source file.

Run from the worktree root: python tmp/j-oracle/mutations.py
The log goes to tmp/j-oracle/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-oracle/mutation-report.json'
LOG = ROOT / 'tmp/j-oracle/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'
PROBE = 'tmp/probe/mutation.test.ts'
TITLE = 'oracle mutation adds no departure on the named difference under the planted mutation'

ROWS = [
    ('collapse.expanded', 'KILLED', 'Collapse writes the wrong aria-expanded value on each trigger'),
    ('alert.connected', 'KILLED', 'Alert completes its close without removing the alert'),
    ('tab.selected', 'KILLED', 'Tab leaves the outgoing control aria-selected="true"'),
    ('scrollspy.active', 'KILLED', 'ScrollSpy leaves the old link active'),
    ('dropdown.expanded', 'KILLED', 'Dropdown leaves the toggle aria-expanded="true" after closing'),
    ('carousel.current', 'KILLED', 'Carousel leaves aria-current on the outgoing indicator'),
    ('modal.hidden', 'KILLED', 'Modal leaves aria-hidden="true" on the open modal'),
    ('offcanvas.modal', 'KILLED', 'Offcanvas omits aria-modal="true" while open'),
    ('toast.showing', 'KILLED', 'Toast keeps the showing token after a completed show'),
    ('tooltip.described', 'KILLED', 'Tooltip writes a description id that names no tip'),
    ('popover.auto', 'KILLED', 'Popover marks its tip with another auto token than bs-popover-auto'),
    ('control.equivalent', 'HELD', 'CONTROL: Collapse writes aria-expanded through an equivalent spelling'),
    ('control.boom', 'REFUSED', 'BOOM: Collapse throws inside its trigger write'),
    ('control.unbound', 'REFUSED', 'UNBOUND: the row names a span Collapse.ts lacks'),
]

SOURCES = [
    'src/browser/Collapse.ts', 'src/browser/Alert.ts', 'src/browser/Tab.ts', 'src/browser/ScrollSpy.ts',
    'src/browser/Dropdown.ts', 'src/browser/Carousel.ts', 'src/browser/Modal.ts',
    'src/browser/Offcanvas.ts', 'src/browser/Toast.ts', 'src/browser/Tooltip.ts',
    'src/browser/constants.ts',
]

lines = []


def log(text):
    print(text, flush=True)
    lines.append(text)


def digests():
    return {path: hashlib.sha256((ROOT / path).read_bytes()).hexdigest() for path in SOURCES}


def classify(report):
    failed_suites = [suite for suite in report.get('testResults', []) if suite.get('status') == 'failed' and not suite.get('assertionResults')]
    cases = [case for suite in report.get('testResults', []) for case in suite.get('assertionResults', [])]
    matched = [case for case in cases if case.get('fullName') == TITLE]
    if len(matched) != 1:
        return 'REFUSED', f'collected {len(matched)} cases titled as the probe'
    case = matched[0]
    status = case.get('status')
    messages = case.get('failureMessages') or []
    first = messages[0].splitlines()[0] if messages else ''
    if status == 'failed':
        if first.startswith('AssertionError') or first.startswith('expected '):
            return 'KILLED', first
        return 'REFUSED', first
    if status == 'passed':
        whole = report.get('success') is True and report.get('numFailedTests') == 0 and report.get('numFailedTestSuites') == 0 and not failed_suites
        return ('HELD', 'the whole run reports success') if whole else ('REFUSED', 'the case passed inside a failing run')
    return 'REFUSED', f'status {status}'


def main():
    before = digests()
    for path, digest in before.items():
        log(f'digest {digest} {path}')
    results = []
    for row, expected, label in ROWS:
        REPORT.unlink(missing_ok=True)
        command = ['node', str(VITEST), 'run', '--config', 'vite.config.ts', '--no-cache', '--project', 'probe', '--reporter=json', f'--outputFile={REPORT}', PROBE]
        env = dict(__import__('os').environ, ORACLE_MUTATION=row)
        completed = subprocess.run(command, cwd=ROOT, env=env, capture_output=True, text=True, encoding='utf-8', errors='replace')
        if not REPORT.exists():
            verdict, detail = 'REFUSED', f'no report; exit {completed.returncode}'
        else:
            verdict, detail = classify(json.loads(REPORT.read_text(encoding='utf-8')))
        agrees = verdict == expected
        results.append((row, label, expected, verdict, agrees, completed.returncode, detail))
        log(f'{row}: {verdict} (expected {expected}, exit {completed.returncode}) {"ok" if agrees else "MISMATCH"} | {detail}')
    after = digests()
    log('sources unchanged' if after == before else 'SOURCES CHANGED')
    log('')
    log('| Row | Planted difference | Expected | Reading | Exit | First failure line |')
    log('| --- | --- | --- | --- | --- | --- |')
    for row, label, expected, verdict, agrees, code, detail in results:
        log(f'| {row} | {label} | {expected} | {verdict} | {code} | {detail} |')
    mismatches = [row for row, _, _, _, agrees, _, _ in results if not agrees]
    log(f'mismatches: {", ".join(mismatches) if mismatches else "none"}')
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    sys.exit(1 if mismatches or after != before else 0)


main()
