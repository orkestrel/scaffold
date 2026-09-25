"""J-ORACLE-RECORD per-plugin mutation run, round 3.

Round 3 succeeds round 2's run (`tmp/j-oracle/round2-mutations.log.txt`), keeping its classifier
and its plant handling, and adds a row per facet round 3 adds: TAG, a tooltip tip's inner element
built as a `span`; ORDER, the tip's arrow and inner element swapped; and PLACEMENT, the title text
written beside the inner element instead of into it. The TEXT row now reads the content facet. No
fractional-scroll row is added: Chromium snaps an unzoomed element's scroll offset to whole pixels,
and no scenario zooms a scroller (`tmp/probe/fraction.test.ts`).

Round 2 succeeded round 1's run (`tmp/j-oracle/round1-mutations.log.txt`). It changed:
- the plant file's home: `tmp/j-oracle/mutation.test.ts`, beside this runner. The probe project
  collects only `tmp/probe/`, so each row copies the plant there as `tmp/probe/oracle-mutation.test.ts`
  and removes the copy afterwards;
- the classifier: it reads the failed suites before it counts a kill, so a kill inside a broken run
  reads REFUSED;
- the rows: one per facet round 2 adds (text, parent, scroll), and the SUITE row, which plants the
  collapse.expanded mutation beside `tmp/j-oracle/suite-fault.test.ts`, a file that fails while it is
  collected, and must read REFUSED.

Each row plants its mutation in the in-memory compile of Veneer's source, never in a source file,
records the row's plugin under Veneer and under the planted Veneer, compares each against Bootstrap's
saved fixture through the real collectEngineDepartures comparison, and asserts that the planted
recording adds no departure on the row's named difference.

Rule: a run with any failed suite other than the plant's, or with a suite error in the plant's own
suite, reads REFUSED whatever its case reports. Otherwise a failed case counts as KILLED only when
the first line of its failure message names an assertion failure: it starts with `AssertionError`,
or with `expected `, the expect library's own assertion message. Every other failure reads REFUSED,
and so does a case that was not collected. A passed case reads HELD only when the whole run reports
success, with no failed case and no failed suite. The CONTROL row plants an equivalent spelling and
must read HELD. The BOOM row plants a thrown `Error('boom')`, the UNBOUND row names a span the source
lacks, and the SUITE row runs a killing plant beside a failing suite; each must read REFUSED.

Every source file a row names is hashed before the first row and after the last, and the run prints
the receipt `sources unchanged` when every digest matches, since no row writes a source file.

Run from the worktree root: python tmp/j-oracle/mutations.py
The log goes to tmp/j-oracle/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-oracle/mutation-report.json'
LOG = ROOT / 'tmp/j-oracle/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'
PLANT = ROOT / 'tmp/j-oracle/mutation.test.ts'
FAULT = ROOT / 'tmp/j-oracle/suite-fault.test.ts'
PLANT_COPY = ROOT / 'tmp/probe/oracle-mutation.test.ts'
FAULT_COPY = ROOT / 'tmp/probe/oracle-suite-fault.test.ts'
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
    ('tooltip.text', 'KILLED', 'TEXT: Tooltip writes a wrong title into its tip'),
    ('tooltip.tag', 'KILLED', 'TAG: Tooltip builds its inner tip element as a span'),
    ('tooltip.order', 'KILLED', 'ORDER: Tooltip builds its tip with the inner element before the arrow'),
    ('tooltip.placement', 'KILLED', 'PLACEMENT: Tooltip writes its title beside the inner element'),
    ('dropdown.parent', 'KILLED', 'PARENT: Dropdown appends its menu to the body when it shows'),
    ('scrollspy.destination', 'KILLED', 'SCROLL: ScrollSpy scrolls one section past the one the link names'),
    ('control.equivalent', 'HELD', 'CONTROL: Collapse writes aria-expanded through an equivalent spelling'),
    ('control.boom', 'REFUSED', 'BOOM: Collapse throws inside its trigger write'),
    ('control.unbound', 'REFUSED', 'UNBOUND: the row names a span Collapse.ts lacks'),
    ('control.suite', 'REFUSED', 'SUITE: a killing Collapse plant beside a suite that fails to collect'),
]

SOURCES = [
    'src/browser/Collapse.ts', 'src/browser/Alert.ts', 'src/browser/Tab.ts', 'src/browser/ScrollSpy.ts',
    'src/browser/Dropdown.ts', 'src/browser/Carousel.ts', 'src/browser/Modal.ts',
    'src/browser/Offcanvas.ts', 'src/browser/Toast.ts', 'src/browser/Tooltip.ts',
    'src/browser/constants.ts', 'src/browser/helpers.ts',
]

lines = []


def log(text):
    print(text, flush=True)
    lines.append(text)


def digests():
    return {path: hashlib.sha256((ROOT / path).read_bytes()).hexdigest() for path in SOURCES}


def classify(report):
    suites = report.get('testResults', [])
    plant = [suite for suite in suites if Path(suite.get('name', '')).name == PLANT_COPY.name]
    others = [suite for suite in suites if Path(suite.get('name', '')).name != PLANT_COPY.name]
    broken = [suite for suite in others if suite.get('status') != 'passed']
    if broken:
        return 'REFUSED', f'{len(broken)} other suite(s) failed: {Path(broken[0].get("name", "")).name}'
    if len(plant) != 1:
        return 'REFUSED', f'collected {len(plant)} plant suites'
    if plant[0].get('message'):
        return 'REFUSED', f'the plant suite reports an error: {plant[0]["message"].splitlines()[0]}'
    matched = [case for case in plant[0].get('assertionResults', []) if case.get('fullName') == TITLE]
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
        whole = report.get('success') is True and report.get('numFailedTests') == 0 and report.get('numFailedTestSuites') == 0
        return ('HELD', 'the whole run reports success') if whole else ('REFUSED', 'the case passed inside a failing run')
    return 'REFUSED', f'status {status}'


def run_row(row):
    REPORT.unlink(missing_ok=True)
    shutil.copyfile(PLANT, PLANT_COPY)
    files = [str(PLANT_COPY.relative_to(ROOT)).replace('\\', '/')]
    if row == 'control.suite':
        shutil.copyfile(FAULT, FAULT_COPY)
        files.append(str(FAULT_COPY.relative_to(ROOT)).replace('\\', '/'))
    try:
        command = ['node', str(VITEST), 'run', '--config', 'vite.config.ts', '--no-cache', '--project', 'probe', '--reporter=json', f'--outputFile={REPORT}', *files]
        env = dict(os.environ, ORACLE_MUTATION=row)
        return subprocess.run(command, cwd=ROOT, env=env, capture_output=True, text=True, encoding='utf-8', errors='replace')
    finally:
        PLANT_COPY.unlink(missing_ok=True)
        FAULT_COPY.unlink(missing_ok=True)


def main():
    before = digests()
    for path, digest in before.items():
        log(f'digest {digest} {path}')
    log(f'plant {hashlib.sha256(PLANT.read_bytes()).hexdigest()} {PLANT.relative_to(ROOT)}')
    results = []
    selected = [row for row in ROWS if len(sys.argv) < 2 or row[0] in sys.argv[1:]]
    for row, expected, label in selected:
        completed = run_row(row)
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
