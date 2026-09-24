# Measures whether the identity conjunct of Modal.#holds is reachable: drops it, runs every modal-facing
# test file whole, records the failing cases, and restores the bytes with a digest receipt.
import hashlib, json, pathlib, subprocess

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal')
REPORT = ROOT / 'tmp/j-modal/identity-report.json'
LOG = ROOT / 'tmp/j-modal/identity.log.txt'
PATH = ROOT / 'src/browser/Modal.ts'
OLD = '!this.#controller.signal.aborted && this.#change === change && this.shown === shown'
NEW = '!this.#controller.signal.aborted && this.shown === shown'
original = PATH.read_bytes()
before = hashlib.sha256(original).hexdigest()
lines = []
try:
    text = original.decode('utf-8')
    assert text.count(OLD) == 1
    PATH.write_bytes(text.replace(OLD, NEW).encode('utf-8'))
    for test in ['tests/src/browser/Modal.test.ts', 'tests/src/browser/Delegate.test.ts']:
        if REPORT.exists():
            REPORT.unlink()
        done = subprocess.run(['node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts',
                               '--no-cache', '--project', 'src:browser', '--reporter=json',
                               f'--outputFile={REPORT}', test], cwd=ROOT, capture_output=True, timeout=600)
        report = json.loads(REPORT.read_text(encoding='utf-8'))
        cases = [case for result in report['testResults'] for case in result['assertionResults']]
        failed = [case['title'] for case in cases if case['status'] == 'failed']
        lines.append(f'exit={done.returncode} | {test} | {len(failed)} failed of {len(cases)} | {failed}')
finally:
    PATH.write_bytes(original)
after = hashlib.sha256(PATH.read_bytes()).hexdigest()
lines.append('receipt: ' + ('restored byte for byte' if after == before else 'DIGEST MISMATCH'))
LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
print('\n'.join(lines))
