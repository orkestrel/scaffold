# J-MODAL red-first reading: puts the base commit's bytes back in every owned source file (deleting the
# unit's new ones), runs each owned test file whole against that source, records what it reports,
# then writes the unit's bytes back and checks every digest, writing the receipt into the log.
import hashlib, json, pathlib, re, subprocess

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal')
LOG = ROOT / 'tmp/j-modal/red.log.txt'
COMMAND = ['node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
           '--reporter=dot', '--project', 'src:browser']
CHANGED = ['src/browser/Delegate.ts', 'src/browser/constants.ts', 'src/browser/validators.ts',
           'src/browser/parsers.ts', 'src/browser/index.ts']
CREATED = ['src/browser/Modal.ts', 'src/browser/Backdrop.ts', 'src/browser/ScrollLock.ts',
           'src/browser/Isolation.ts']
TESTS = ['tests/src/browser/Modal.test.ts', 'tests/src/browser/Backdrop.test.ts',
         'tests/src/browser/ScrollLock.test.ts', 'tests/src/browser/Isolation.test.ts',
         'tests/src/browser/Delegate.test.ts', 'tests/src/browser/validators.test.ts',
         'tests/src/browser/parsers.test.ts', 'tests/src/browser/index.test.ts']


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def base(path):
    return subprocess.run(['git', 'show', f'HEAD:{path}'], cwd=ROOT, capture_output=True,
                          check=True).stdout


def main():
    owned = CHANGED + CREATED
    before = {path: digest(path) for path in owned}
    saved = {path: (ROOT / path).read_bytes() for path in owned}
    lines = [f'digest before: {json.dumps(before)}']
    try:
        for path in CHANGED:
            (ROOT / path).write_bytes(base(path))
        for path in CREATED:
            (ROOT / path).unlink()
        for test in TESTS:
            done = subprocess.run(COMMAND + [test], cwd=ROOT, capture_output=True, text=True,
                                  encoding='utf-8', errors='replace', timeout=600)
            text = re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)
            summary = [line.strip() for line in text.splitlines()
                       if line.strip().startswith(('Test Files', 'Tests ', 'FAIL', 'Error:', 'SyntaxError'))]
            line = f'exit={done.returncode} | {" ".join(COMMAND[1:])} {test} | {" / ".join(summary[:6])}'
            print(line, flush=True)
            lines.append(line)
    finally:
        for path, data in saved.items():
            (ROOT / path).write_bytes(data)
    after = {path: digest(path) for path in owned}
    receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
    lines.append(f'digest after: {json.dumps(after)}')
    lines.append(f'receipt: {receipt}')
    print(lines[-1], flush=True)
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
