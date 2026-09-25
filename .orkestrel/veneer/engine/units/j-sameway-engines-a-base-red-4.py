"""J-SAMEWAY-ENGINES-A round 4: runs the round's test files against dc2a1a7's sources, then restores the unit's sources.

Successor of `tmp/j-engines-a/base-red.py` (round 2, base 7511b82, the four engine sources). What
changed: the base is dc2a1a7, the round-3 tip this round starts from, and the replaced set grows to
every source this round touches: the four engines, `helpers.ts`, `HostSnapshot.ts`, and `types.ts`.

Two runs, each through the real `src:browser` Vitest project with the JSON reporter:
- PURE: every replaced source is dc2a1a7's bytes. It runs the four engine test files and
  `HostSnapshot.test.ts`.
- LEAF: as PURE, and the tip's `readHostPriority` function text is appended to dc2a1a7's
  `helpers.ts`. It runs `helpers.test.ts`. The test file imports `readHostPriority`, which dc2a1a7
  does not export, and a missing named export fails the whole file at import with a SyntaxError; the
  appended leaf lets the file load, so each case reads dc2a1a7's `recordHostChange`,
  `rewindHostChanges`, and `writeHostValue`. The PURE reading of the helpers file is logged as well.

The log lists every failing case with the first line of its failure message, and each run's
suite-level errors and whether its output names unhandled errors. Every replaced source is restored
from the bytes read before the run, and the log ends with `restored byte for byte` when every digest
matches.

Run from the worktree root: python tmp/j-engines-a/base-red-4.py
The log goes to tmp/j-engines-a/base-red-4.log.txt as well as to standard output.
"""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-engines-a/base-red-4-report.json'
LOG = ROOT / 'tmp/j-engines-a/base-red-4.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'
BASE = 'dc2a1a7'
HELPERS = 'src/browser/helpers.ts'
SOURCES = [
    'src/browser/Collapse.ts',
    'src/browser/Toast.ts',
    'src/browser/Tab.ts',
    'src/browser/Carousel.ts',
    HELPERS,
    'src/browser/HostSnapshot.ts',
    'src/browser/types.ts',
]
ENGINE_TESTS = [
    'tests/src/browser/Collapse.test.ts',
    'tests/src/browser/Toast.test.ts',
    'tests/src/browser/Tab.test.ts',
    'tests/src/browser/Carousel.test.ts',
    'tests/src/browser/HostSnapshot.test.ts',
]
HELPERS_TEST = 'tests/src/browser/helpers.test.ts'
LEAF = re.compile(
    r'/\*\*\n \* Reads the priority an inline property carries.*?\nexport function readHostPriority\(.*?\n}\n',
    re.S,
)


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


def run(label, tests, sink):
    if REPORT.exists():
        REPORT.unlink()
    completed = subprocess.run(
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
            *tests,
        ],
        cwd=ROOT,
        capture_output=True,
        check=False,
    )
    output = (completed.stdout + completed.stderr).decode('utf-8', 'replace')
    emit(f'### {label}: {" ".join(tests)}', sink)
    emit('| Failing case | First line of its failure message |', sink)
    emit('| --- | --- |', sink)
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    for suite in report.get('testResults', []):
        if suite.get('message'):
            emit(f'| SUITE ERROR {Path(suite.get("name")).name} | {first_line(suite["message"]).replace("|", "\\|")} |', sink)
        for result in suite.get('assertionResults', []):
            if result.get('status') == 'failed':
                message = first_line('\n'.join(result.get('failureMessages', [])))
                emit(f'| {result.get("fullName")} | {message.replace("|", "\\|")} |', sink)
    emit(
        f'{label}: Tests {report.get("numFailedTests")} failed | {report.get("numPassedTests")} passed '
        f'({report.get("numTotalTests")}); failed suites {report.get("numFailedTestSuites")}; '
        f'unhandled errors named: {"yes" if "Unhandled Error" in output else "no"}; exit {completed.returncode}',
        sink,
    )


def main():
    sink = []
    originals = {path: (ROOT / path).read_bytes() for path in SOURCES}
    recorded = {path: digest(data) for path, data in originals.items()}
    found = LEAF.findall(originals[HELPERS].decode('utf-8'))
    if len(found) != 1:
        emit(f'LEAF ANCHOR ({len(found)})', sink)
        LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
        sys.exit(1)
    leaf = found[0]
    try:
        bases = {}
        for path in SOURCES:
            base = subprocess.run(
                ['git', 'show', f'{BASE}:{path}'], cwd=ROOT, capture_output=True, check=True
            ).stdout
            bases[path] = base
            (ROOT / path).write_bytes(base)
            emit(f'base {path} {digest(base)}', sink)
        run('PURE', ENGINE_TESTS, sink)
        run('PURE', [HELPERS_TEST], sink)
        overlaid = bases[HELPERS] + b'\n' + leaf.encode('utf-8')
        (ROOT / HELPERS).write_bytes(overlaid)
        emit(f'leaf-overlaid {HELPERS} {digest(overlaid)} (dc2a1a7 plus the appended readHostPriority text)', sink)
        run('LEAF', [HELPERS_TEST], sink)
    finally:
        for path, data in originals.items():
            (ROOT / path).write_bytes(data)
    restored = all(digest((ROOT / path).read_bytes()) == recorded[path] for path in SOURCES)
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored else 1)


if __name__ == '__main__':
    main()
