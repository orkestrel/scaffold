"""Takes the red reading of the unit's proofs against the dispatch baseline's sources.

Writes each owned source file back to its bytes at HEAD and sets the unit's created source files
aside, runs each proof file the unit adds to or creates through the src:browser project, records
Vitest's JSON counts, then writes every owned source back byte for byte and checks the digests.
The test files stay as the unit wrote them, so the reading is the proofs against the code the
unit started from.
"""

import hashlib
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-tooltip/red-report.json'
LOG = ROOT / 'tmp/j-tooltip/red.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
CHANGED = [
    'src/browser/constants.ts',
    'src/browser/helpers.ts',
    'src/browser/index.ts',
    'src/browser/parsers.ts',
    'src/browser/types.ts',
    'src/browser/validators.ts',
]
CREATED = ['src/browser/Tooltip.ts', 'src/browser/sanitizers/NativeSanitizer.ts']
TESTS = [
    'tests/src/browser/Tooltip.test.ts',
    'tests/src/browser/sanitizers/NativeSanitizer.test.ts',
    'tests/src/browser/helpers.test.ts',
    'tests/src/browser/parsers.test.ts',
    'tests/src/browser/validators.test.ts',
    'tests/src/browser/index.test.ts',
]


def digest(path: str) -> str:
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(test: str) -> str:
    if REPORT.exists():
        REPORT.unlink()
    done = subprocess.run(VITEST + [test], cwd=ROOT, capture_output=True, text=True,
                          encoding='utf-8', errors='replace', timeout=1200)
    if not REPORT.exists():
        tail = re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)[-400:]
        return f'exit={done.returncode} | {test} | no report | {tail!r}'
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    cases = [case for result in report['testResults'] for case in result['assertionResults']]
    failed = [case for case in cases if case['status'] == 'failed']
    suites = [result for result in report['testResults'] if result['status'] == 'failed']
    messages = [re.sub(r'\s+', ' ', result.get('message', ''))[:200] for result in suites]
    return (f'exit={done.returncode} | {test} | {len(failed)} failed of {len(cases)} cases | '
            f'{report["numFailedTestSuites"]} failed of {report["numTotalTestSuites"]} suites | '
            f'suite messages: {messages}')


def main() -> None:
    owned = CHANGED + CREATED
    before = {path: digest(path) for path in owned}
    saved = {path: (ROOT / path).read_bytes() for path in owned}
    lines = [f'digest before: {json.dumps(before)}']
    try:
        for path in CHANGED:
            baseline = subprocess.run(['git', 'show', f'HEAD:{path}'], cwd=ROOT, capture_output=True,
                                      check=True).stdout
            (ROOT / path).write_bytes(baseline)
        for path in CREATED:
            (ROOT / path).unlink()
        for test in TESTS:
            line = f'RED {run(test)}'
            print(line, flush=True)
            lines.append(line)
    finally:
        for path, data in saved.items():
            (ROOT / path).parent.mkdir(parents=True, exist_ok=True)
            (ROOT / path).write_bytes(data)
    for test in TESTS:
        line = f'GREEN {run(test)}'
        print(line, flush=True)
        lines.append(line)
    after = {path: digest(path) for path in owned}
    receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
    lines.append(f'digest after: {json.dumps(after)}')
    lines.append(f'receipt: {receipt}')
    print(lines[-1], flush=True)
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
