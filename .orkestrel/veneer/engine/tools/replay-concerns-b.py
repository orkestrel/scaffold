# The Orchestrator's replay of J-CONCERNS-B at 7ab04db (2026-09-25). The unit mutated the engines by hand, so this
# instrument scripts the four mutations its report names as exact replacements. It applies each one, runs the named
# test file, restores the source byte for byte, and records the failing cases with their error classes. It also runs
# the three whole files unmutated. Run from the worktree root: python <this file>.
import hashlib
import re
import subprocess
from pathlib import Path

ROOT = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\concerns-b')
LOG = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\units\j-concerns-b-replay.log.txt')
IMPORT_OLD = "\trewindHostWrites,\n} from './helpers.js'"
IMPORT_NEW = "\trewindHostWrites,\n\tsettleAnimations,\n} from './helpers.js'"

MUTATIONS = [
    (
        'd-motion-show',
        'src/browser/Dropdown.ts',
        [
            (IMPORT_OLD, IMPORT_NEW),
            (
                "\t\t\tthis.#changing = false\n\t\t\temitEvent(host, DROPDOWN_EVENTS.shown, { click: undefined }, false)",
                "\t\t\tawait settleAnimations(menu, this.#controller.signal)\n\t\t\tthis.#changing = false\n"
                "\t\t\temitEvent(host, DROPDOWN_EVENTS.shown, { click: undefined }, false)",
            ),
        ],
        'tests/src/browser/Dropdown.test.ts',
    ),
    (
        'd-motion-hide',
        'src/browser/Dropdown.ts',
        [
            (IMPORT_OLD, IMPORT_NEW),
            (
                "\t\t\temitEvent(host, DROPDOWN_EVENTS.hidden, { click }, false)",
                "\t\t\tvoid settleAnimations(menu, this.#controller.signal).then(() =>\n"
                "\t\t\t\temitEvent(host, DROPDOWN_EVENTS.hidden, { click }, false),\n\t\t\t)",
            ),
        ],
        'tests/src/browser/Dropdown.test.ts',
    ),
    (
        'p-cancel-show',
        'src/browser/Tooltip.ts',
        [
            (
                "if (!accepted || this.#blocked()) return false",
                "if ((!accepted && this.#profile.popover !== 'manual') || this.#blocked()) return false",
            )
        ],
        'tests/src/browser/Popover.test.ts',
    ),
    (
        'p-cancel-hide',
        'src/browser/Tooltip.ts',
        [("return this.#conceal(false)", "return this.#conceal(this.#profile.popover === 'manual')")],
        'tests/src/browser/Popover.test.ts',
    ),
]


def run(test):
    result = subprocess.run(
        f'npx vitest run --config vite.config.ts --no-cache --project src:browser {test}',
        cwd=ROOT,
        shell=True,
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
    )
    out = re.sub(r'\x1b\[[0-9;]*m', '', result.stdout + result.stderr)
    tally = next((line.strip() for line in out.splitlines() if re.match(r'\s+Tests\s', line)), '')
    failed = [line.strip() for line in out.splitlines() if re.match(r'\s+×', line)]
    errors = {name: out.count(name) for name in ('AssertionError', 'TypeError', 'ReferenceError', 'SyntaxError')}
    return result.returncode, tally, failed, errors


lines = ['# J-CONCERNS-B replay (2026-09-25) at 7ab04db']
for test in ('tests/src/browser/Dropdown.test.ts', 'tests/src/browser/Popover.test.ts', 'tests/src/browser/Tooltip.test.ts'):
    code, tally, failed, errors = run(test)
    lines.append(f'unmutated {test}: exit {code}; {tally}')
for name, file, edits, test in MUTATIONS:
    path = ROOT / file
    original = path.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    text = original.decode('utf-8')
    for old, new in edits:
        assert text.count(old) == 1, (name, old[:60], text.count(old))
        text = text.replace(old, new, 1)
    path.write_bytes(text.encode('utf-8'))
    try:
        code, tally, failed, errors = run(test)
    finally:
        path.write_bytes(original)
    restored = hashlib.sha256(path.read_bytes()).hexdigest() == digest
    lines.append(f'## {name} ({file} -> {test}): exit {code}; {tally}; errors {errors}; restored {restored}')
    lines.extend(f'  {case}' for case in failed)
if name == 'tooltip-both':
    pass
# The unit's claim that the tooltip cases cannot see a popover-only defect: both Tooltip mutations at once, Tooltip.test.ts.
path = ROOT / 'src/browser/Tooltip.ts'
original = path.read_bytes()
text = original.decode('utf-8')
for _, file, edits, _ in MUTATIONS[2:]:
    for old, new in edits:
        text = text.replace(old, new, 1)
path.write_bytes(text.encode('utf-8'))
try:
    code, tally, failed, errors = run('tests/src/browser/Tooltip.test.ts')
finally:
    path.write_bytes(original)
lines.append(f'## both Tooltip mutations -> Tooltip.test.ts: exit {code}; {tally}; restored {path.read_bytes() == original}')
status = subprocess.run('git status --short', cwd=ROOT, shell=True, capture_output=True, text=True).stdout
lines.append('--- the tree after the replay')
lines.append(status.rstrip())
LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print('\n'.join(lines))
