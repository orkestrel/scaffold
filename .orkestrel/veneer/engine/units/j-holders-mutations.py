"""J-HOLDERS mutation instrument.

Each row plants one mutation in exact source spans, runs the one test file it names through the real
`src:browser` Vitest project with the JSON reporter, and reads the named case's status and failure
message from the report.

A kill counts only when the case is collected, fails, and its first failure message opens with
`AssertionError`, the error the expect library raises for a failed assertion. Every other failure
reads REFUSED, whatever it names: a thrown `Error`, a `ReferenceError`, a `TypeError`, a syntax or
transform error, or an unbound identifier. A case the run does not collect reads NOT COLLECTED.

Row readings:
- KILLED: the case failed on an assertion.
- REFUSED: the case failed on anything else.
- HELD: the case passed.
- NOT COLLECTED: the report names the case zero times or more than once.

A row passes when its reading equals its expected reading. The kill rows expect KILLED, the control
row expects HELD, and the demonstration row plants `throw new Error('boom')` and expects REFUSED.

Every source a row mutates is checked against its recorded SHA-256 digest before any row runs,
written back from the bytes read before the row after it runs, and checked against the recorded
digest again at the end, which prints `restored byte for byte`.

Run from the worktree root: python tmp/j-holders/mutations.py
The log goes to tmp/j-holders/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-holders/mutation-report.json'
LOG = ROOT / 'tmp/j-holders/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

# SHA-256 of each source a row mutates, recorded on the finished unit before the instrument's run.
RECORDED = {
    'src/browser/Modal.ts': '15b550f149cde09fe898872394423fecb72ba0727805296288e4b97ba97b0d51',
    'src/browser/Isolation.ts': '88fa9828002d74f90f08c4bcb2447a97f2dfd8c49e85ff05249c2a220e77086b',
    'src/browser/ScrollLock.ts': 'cfc2ab1deaf9e7facba222fe8e2dbeb49b29fe8d727d224696c98dd8bc50cb45',
    'src/browser/ColorMode.ts': '7b9269f3d9a1540422da4fc0ea771eebff00011e79a686954ffc770d8bb7f956',
}

MODAL = 'src/browser/Modal.ts'
ISOLATION = 'src/browser/Isolation.ts'
LOCK = 'src/browser/ScrollLock.ts'
COLOR = 'src/browser/ColorMode.ts'

OPEN_CASE = 'Modal adds the open token again when a later modal shows on a body that lost it, and the last hide writes back the body class the first show found'
ANCESTOR_CASE = 'Isolation keeps an inert ancestor clear while any isolation inside it lives, and restores it at the last release'
SPARE_CASE = 'Isolation keeps an element another live isolation claimed inert interactive while a sparing isolation lives, and hands it back when that isolation ends'
SELECTORS_CASE = 'ScrollLock compensates the elements the selectors of the lock that wrote match, and refuses a selector that fails to parse'
SIGNAL_CASE = 'ScrollLock leaves no listener on the signal of a lock it refuses for a missing body, so aborting that signal later runs none of it, writes nothing, and throws nothing'
PERSIST_CASE = 'ColorMode puts the root reading back, absent or present, and rethrows the same error when persisting the stored mode throws during construction'

# (id, obligation, mutation, edits, test file, case full name, expected reading)
ROWS = [
    (
        'H1-LAST',
        'H1',
        'the last modal to hide relinquishes the open record without writing the body back',
        [(MODAL, '\t\tif (!this.#apply(change, false, () => this.#open.restore())) {\n', '\t\tif (!this.#apply(change, false, () => this.#open.clear())) {\n')],
        'tests/src/browser/Modal.test.ts',
        OPEN_CASE,
        'KILLED',
    ),
    (
        'H2-LAST',
        'H2',
        'the last isolation to release an element never writes the inert record back',
        [(ISOLATION, '\t\tthis.#claimed.clear()\n\t\tthis.#snapshot.restore()\n', '\t\tthis.#claimed.clear()\n')],
        'tests/src/browser/Isolation.test.ts',
        ANCESTOR_CASE,
        'KILLED',
    ),
    (
        'H2-ORDER',
        'H2',
        'a release leaves the element to the shared record alone, handing it to no remaining claim',
        [(ISOLATION, "\t\tIsolation.#claims.set(element, claims)\n\t\telement.toggleAttribute('inert', newest.inert)\n", '\t\tIsolation.#claims.set(element, claims)\n')],
        'tests/src/browser/Isolation.test.ts',
        SPARE_CASE,
        'KILLED',
    ),
    (
        'H3-MEASURE',
        'H3',
        'every lock measures and writes its own targets instead of joining the first lock',
        [(LOCK, '\t\tif (held !== undefined) {\n', '\t\tif (held !== undefined && false) {\n')],
        'tests/src/browser/ScrollLock.test.ts',
        SELECTORS_CASE,
        'KILLED',
    ),
    (
        'H5-SIGNAL',
        'H5',
        'a lock refused for a missing body keeps its abort listener on the caller signal',
        [(LOCK, "\t\t\tthis.#controller.abort()\n\t\t\tthrow new AppError('ScrollLock requires a document with a body'", "\t\t\tthrow new AppError('ScrollLock requires a document with a body'")],
        'tests/src/browser/ScrollLock.test.ts',
        SIGNAL_CASE,
        'KILLED',
    ),
    (
        'H5-PRESENT',
        'H5',
        'a failed persist puts back only an absent reading, removing a present attribute',
        [(COLOR, '\t\t\tthis.destroy()\n\t\t\tthrow error\n', '\t\t\tthis.#root.removeAttribute(this.#attributes.theme)\n\t\t\tthrow error\n')],
        'tests/src/browser/ColorMode.test.ts',
        PERSIST_CASE,
        'KILLED',
    ),
    (
        'H5-IDENTITY',
        'H5',
        'a failed persist rethrows a copy of the storage error with the same message',
        [(COLOR, '\t\t\tthis.destroy()\n\t\t\tthrow error\n', "\t\t\tthis.destroy()\n\t\t\tthrow new Error(error instanceof Error ? error.message : 'stop')\n")],
        'tests/src/browser/ColorMode.test.ts',
        PERSIST_CASE,
        'KILLED',
    ),
    (
        'CONTROL',
        'control',
        'a show adds the open token whether or not the body carries it, which leaves the same token list',
        [(MODAL, '\t\t\tif (!document.body.classList.contains(open)) document.body.classList.add(open)\n', '\t\t\tdocument.body.classList.add(open)\n')],
        'tests/src/browser/Modal.test.ts',
        OPEN_CASE,
        'HELD',
    ),
    (
        'BOOM',
        'demonstration',
        "isolation destruction throws new Error('boom'), a failure that is not an assertion",
        [(ISOLATION, '\t\tthis.#claimed.clear()\n\t\tthis.#snapshot.restore()\n', "\t\tthis.#claimed.clear()\n\t\tthrow new Error('boom')\n")],
        'tests/src/browser/Isolation.test.ts',
        ANCESTOR_CASE,
        'REFUSED',
    ),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def read_case(case):
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    found = [
        result
        for suite in report.get('testResults', [])
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case
    ]
    if len(found) != 1:
        return f'NOT COLLECTED ({len(found)})', ''
    result = found[0]
    messages = result.get('failureMessages') or []
    first = messages[0].splitlines()[0] if messages and messages[0] else ''
    if result.get('status') == 'passed':
        return 'HELD', ''
    if result.get('status') != 'failed':
        return f'NOT COLLECTED ({result.get("status")})', first
    if first.startswith('AssertionError'):
        return 'KILLED', first
    return 'REFUSED', first


def run(test, case):
    if REPORT.exists():
        REPORT.unlink()
    subprocess.run(
        [
            'node',
            str(VITEST),
            'run',
            '--config',
            'vite.config.ts',
            '--no-cache',
            '--project',
            'src:browser',
            '--reporter=json',
            f'--outputFile={REPORT.relative_to(ROOT).as_posix()}',
            test,
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return read_case(case) if REPORT.exists() else ('NO REPORT', '')


def main():
    sink = []
    originals = {path: (ROOT / path).read_bytes() for path in RECORDED}
    for path, recorded in RECORDED.items():
        actual = digest(originals[path])
        if actual != recorded:
            emit(f'DIGEST MISMATCH {path}: recorded {recorded}, found {actual}', sink)
            LOG.write_text('\n'.join(sink) + '\n', encoding='utf-8')
            sys.exit(2)
        emit(f'digest {path} {actual}', sink)
    emit('| Row | Obligation | Mutation | Case | Expected | Reading | Failure message | Verdict |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- | --- |', sink)
    failures = []
    for row, obligation, mutation, edits, test, case, expected in ROWS:
        message = ''
        try:
            texts = {path: originals[path].decode('utf-8') for path, _, _ in edits}
            for path, old, new in edits:
                count = texts[path].count(old)
                if count != 1:
                    raise ValueError(f'{path}: anchor found {count} times')
                texts[path] = texts[path].replace(old, new)
            for path, text in texts.items():
                (ROOT / path).write_bytes(text.encode('utf-8'))
            reading, message = run(test, case)
        except ValueError as error:
            reading = f'ANCHOR ({error})'
        finally:
            for path in {path for path, _, _ in edits}:
                (ROOT / path).write_bytes(originals[path])
        verdict = 'PASS' if reading == expected else 'FAIL'
        if verdict == 'FAIL':
            failures.append(row)
        shown = message.replace('|', '\\|')
        emit(f'| {row} | {obligation} | {mutation} | {test} > {case} | {expected} | {reading} | {shown} | {verdict} |', sink)
    restored = all(digest((ROOT / path).read_bytes()) == recorded for path, recorded in RECORDED.items())
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit('rows failing: ' + (', '.join(failures) if failures else 'none'), sink)
    LOG.write_text('\n'.join(sink) + '\n', encoding='utf-8')
    sys.exit(0 if restored and not failures else 1)


if __name__ == '__main__':
    main()
