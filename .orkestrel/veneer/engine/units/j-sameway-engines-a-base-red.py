"""Runs the four owned test files against 8bc940d's engine sources, then restores the unit's sources.

The engine sources of Collapse, Toast, Tab, and Carousel are replaced by the bytes `git show`
prints for 8bc940d; the test files stay the unit's. Each owned file runs through the real
`src:browser` Vitest project with the JSON reporter, and the log lists every failing case with the
first line of its failure message. Every replaced source is restored from the bytes read before the
run, and the log ends with `restored byte for byte` when every digest matches.

Run from the worktree root: python tmp/j-engines-a/base-red.py
The log goes to tmp/j-engines-a/base-red.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-engines-a/base-red-report.json'
LOG = ROOT / 'tmp/j-engines-a/base-red.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'
BASE = '8bc940d'
SOURCES = [
    'src/browser/Collapse.ts',
    'src/browser/Toast.ts',
    'src/browser/Tab.ts',
    'src/browser/Carousel.ts',
]
TESTS = [
    'tests/src/browser/Collapse.test.ts',
    'tests/src/browser/Toast.test.ts',
    'tests/src/browser/Tab.test.ts',
    'tests/src/browser/Carousel.test.ts',
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def first_line(text):
    for line in text.splitlines():
        if line.strip():
            return line.strip()[:220]
    return ''


def run(sink):
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
            *TESTS,
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    for suite in report.get('testResults', []):
        if suite.get('message'):
            emit(f'SUITE ERROR {suite.get("name")}: {first_line(suite["message"])}', sink)
        for result in suite.get('assertionResults', []):
            if result.get('status') == 'failed':
                message = first_line('\n'.join(result.get('failureMessages', [])))
                emit(f'| {result.get("fullName")} | {message.replace("|", "\\|")} |', sink)
    emit(
        f'Tests {report.get("numFailedTests")} failed | {report.get("numPassedTests")} passed '
        f'({report.get("numTotalTests")})',
        sink,
    )


def main():
    sink = []
    originals = {path: (ROOT / path).read_bytes() for path in SOURCES}
    recorded = {path: digest(data) for path, data in originals.items()}
    try:
        for path in SOURCES:
            base = subprocess.run(
                ['git', 'show', f'{BASE}:{path}'], cwd=ROOT, capture_output=True, check=True
            ).stdout
            (ROOT / path).write_bytes(base)
            emit(f'base {path} {digest(base)}', sink)
        emit('| Failing case on the base sources | First line of its failure message |', sink)
        emit('| --- | --- |', sink)
        run(sink)
    finally:
        for path, data in originals.items():
            (ROOT / path).write_bytes(data)
    restored = all(digest((ROOT / path).read_bytes()) == recorded[path] for path in SOURCES)
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored else 1)


if __name__ == '__main__':
    main()
