# The Orchestrator's release-path mutation probe for J-POPOVER claim 8 (the objective lane's prescription):
# each mutation removes one path of the build's single release site in Tooltip.ts, runs the Tooltip suite
# alone, records the failing cases, and restores the file byte for byte.
import hashlib
import json
import pathlib
import re
import subprocess
import sys

TREE = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/popover')
TARGET = TREE / 'src/browser/Tooltip.ts'
LOG = pathlib.Path(sys.argv[1])

SITE = "\t\t\tif (!filled) this.#release((_element, slot) => !tip.contains(slot))"
OCCUPY = "\t\t\t\tif (!this.#occupy(change, tip, selector, value)) return undefined"
FINALLY = "\t\t} finally {\n\t\t\t// A build that stops or throws"

MUTATIONS = [
    ('R1 the build releases nothing it moved into an unfinished tip', SITE, "\t\t\tif (!filled && tip === null) this.#release((_element, slot) => !tip.contains(slot))"),
    ('R2 a slot write whose door fails stops the build without releasing', OCCUPY, "\t\t\t\tif (!this.#occupy(change, tip, selector, value)) {\n\t\t\t\t\tfilled = true\n\t\t\t\t\treturn undefined\n\t\t\t\t}"),
    ('R3 a throwing step stops the build without releasing', FINALLY, "\t\t} catch (error) {\n\t\t\tfilled = true\n\t\t\tthrow error\n\t\t} finally {\n\t\t\t// A build that stops or throws"),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def run():
    result = subprocess.run(
        'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/Tooltip.test.ts',
        cwd=TREE, shell=True, capture_output=True, text=True, encoding='utf-8', errors='replace',
    )
    text = re.sub(r'\x1b\[[0-9;]*m', '', result.stdout + result.stderr)
    failed = sorted(set(re.findall(r'^\s*[×✗x]\s+.*?Tooltip\s*>\s*(.+?)(?:\s+\d+ms)?$', text, re.M)))
    counts = re.findall(r'Tests\s+(.+)', text)
    return result.returncode, failed, counts[-1] if counts else 'no count', text


original = TARGET.read_bytes()
lines = [f'digest before: {digest(original)}']
try:
    for label, old, new in MUTATIONS:
        source = original.decode('utf-8')
        if source.count(old) != 1:
            lines.append(f'SKIPPED {label}: the site occurs {source.count(old)} times')
            continue
        TARGET.write_bytes(source.replace(old, new).encode('utf-8'))
        code, failed, count, text = run()
        TARGET.write_bytes(original)
        verdict = 'RED' if code != 0 and failed else ('HELD' if code == 0 else 'ERROR')
        lines.append(f'{verdict} exit={code} | {label} | {count}')
        for name in failed:
            lines.append(f'    failed: {name}')
        if verdict == 'ERROR':
            lines.append('    tail: ' + text[-800:].replace('\n', ' | '))
    code, failed, count, _ = run()
    lines.append(f'GREEN? exit={code} | unmutated Tooltip suite | {count}')
finally:
    TARGET.write_bytes(original)
after = TARGET.read_bytes()
lines.append(f'digest after: {digest(after)}')
lines.append('receipt: restored byte for byte' if after == original else 'receipt: NOT RESTORED')
LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
print('\n'.join(lines))
