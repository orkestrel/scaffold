"""Applies each named mutation to a source file, runs one test file, records the reading, and restores the file byte for byte.

Usage: python tmp/j-motion-proofs-b/mutate.py <mutations.json> <name> [<name> ...]

A copy of J-MOTION-PROOFS-A's `mutate-3.py`, changed only to write its logs under this unit's
`mutations/` folder. A mutation may name the Vitest `project` its test runs in, and `src:browser`
stays the default. Each mutation names a `file`, a `test` file, and either an `old`/`new` pair
replaced exactly once or a `base` commit whose copy of the file stands in. The script refuses a
mutation whose `old` text is absent or repeated, and checks the file's SHA-256 digest after the
restore.
"""

import hashlib
import json
import pathlib
import re
import subprocess
import sys

root = pathlib.Path(__file__).resolve().parents[2]
spec = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
out = pathlib.Path(__file__).resolve().parent / 'mutations'
out.mkdir(exist_ok=True)

for name in sys.argv[2:]:
    mutation = spec[name]
    target = root / mutation['file']
    original = target.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    if 'base' in mutation:
        mutated = subprocess.run(
            ['git', 'show', f"{mutation['base']}:{mutation['file']}"],
            cwd=root, capture_output=True, check=True,
        ).stdout
    else:
        text = original.decode('utf-8')
        count = text.count(mutation['old'])
        if count != 1:
            print(name, 'REFUSED: old text found', count, 'times')
            continue
        mutated = text.replace(mutation['old'], mutation['new']).encode('utf-8')
    try:
        target.write_bytes(mutated)
        command = (
            'npx vitest run --config vite.config.ts --no-cache --project '
            + mutation.get('project', 'src:browser')
            + ' '
            + mutation['test']
        )
        run = subprocess.run(command, cwd=root, shell=True, capture_output=True, timeout=560)
        log = run.stdout.decode('utf-8', 'replace') + run.stderr.decode('utf-8', 'replace')
    finally:
        target.write_bytes(original)
    restored = hashlib.sha256(target.read_bytes()).hexdigest() == digest
    (out / f'{name}.log.txt').write_text(log, encoding='utf-8', newline='\n')
    plain = re.sub(r'\x1b\[[0-9;]*m', '', log)
    failed = re.findall(r'FAIL .*?> (.*)', plain)
    errors = [line.strip() for line in plain.splitlines() if line.startswith(('AssertionError', 'Error'))]
    summary = [line.strip() for line in plain.splitlines() if 'Tests  ' in line]
    print(f'== {name}: exit {run.returncode}, restored {restored}')
    print('   ', summary[-1] if summary else 'no summary')
    for title in failed:
        print('    FAIL', title)
    for error in errors:
        print('     ', error[:220])
