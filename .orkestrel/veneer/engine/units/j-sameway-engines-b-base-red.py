"""Runs the finished owned test files against the base commit's source bytes, then restores the work.

The base is `8bc940d`, J-CASCADE's landing, which HEAD names. Each owned source is replaced by its
bytes at HEAD, read through `git show`, the four owned test files run once through the real
`src:browser` Vitest project with the JSON reporter, and every source is then written back from the
bytes read before the run and checked against their SHA-256 digests. The log lists each failed case
with the first line of its failure message.

Run from the worktree root: python tmp/j-engines-b/base-red.py
The log goes to tmp/j-engines-b/base-red.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOG = ROOT / 'tmp/j-engines-b/base-red.log.txt'
REPORT = ROOT / 'tmp/j-engines-b/base-red-report.json'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'
SOURCES = [
    'src/browser/Dropdown.ts',
    'src/browser/Tooltip.ts',
    'src/browser/Popover.ts',
    'src/browser/Placement.ts',
]
TESTS = [
    'tests/src/browser/Dropdown.test.ts',
    'tests/src/browser/Tooltip.test.ts',
    'tests/src/browser/Popover.test.ts',
    'tests/src/browser/Placement.test.ts',
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def first_line(text):
    for line in text.splitlines():
        if line.strip():
            return line.strip()[:200]
    return ''


def main():
    sink = []
    head = subprocess.run(['git', 'rev-parse', '--short', 'HEAD'], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    sink.append(f'base HEAD {head}')
    work = {path: (ROOT / path).read_bytes() for path in SOURCES}
    try:
        for path in SOURCES:
            base = subprocess.run(['git', 'show', f'HEAD:{path}'], cwd=ROOT, capture_output=True, check=True).stdout
            (ROOT / path).write_bytes(base)
            sink.append(f'base {path} {digest(base)}')
        if REPORT.exists():
            REPORT.unlink()
        subprocess.run(
            ['node', str(VITEST), 'run', '--config', 'vite.config.ts', '--no-cache', '--project', 'src:browser',
             '--reporter=json', f'--outputFile={REPORT.relative_to(ROOT).as_posix()}', *TESTS],
            cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False,
        )
    finally:
        for path, data in work.items():
            (ROOT / path).write_bytes(data)
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    failed = 0
    total = 0
    for suite in report.get('testResults', []):
        if suite.get('message'):
            sink.append(f'SUITE ERROR {suite.get("name")}: {first_line(suite["message"])}')
        for result in suite.get('assertionResults', []):
            total += 1
            if result['status'] != 'failed':
                continue
            failed += 1
            message = first_line('\n'.join(result.get('failureMessages', [])))
            sink.append(f'RED | {result["fullName"]} | {message}')
    sink.append(f'Tests {failed} failed | {total - failed} passed ({total})')
    restored = all(digest((ROOT / path).read_bytes()) == digest(data) for path, data in work.items())
    sink.append('restored byte for byte' if restored else 'RESTORE FAILED')
    text = '\n'.join(sink) + '\n'
    print(text, end='')
    LOG.write_bytes(text.encode('utf-8'))


if __name__ == '__main__':
    main()
