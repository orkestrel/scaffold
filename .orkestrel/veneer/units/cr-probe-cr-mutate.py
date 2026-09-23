# Applies each registry mutation to tests/setup.ts, runs `npm run test:setup`, records the failing
# cases, reverts the exact edit, and confirms the file's digest is restored before the next one.
import hashlib, pathlib, re, subprocess, sys

ROOT = pathlib.Path('/home/user/veneer-cr')
SETUP = ROOT / 'tests/setup.ts'
LAST = "\tObject.freeze({ scenario: 'form-control-text-focus', subject: 'Form control text' }),\n])\n"
MUTATIONS = [
    ('drop the driven table from the spread', [
        ("\t...CASCADE_KEYS,\n\t...DRIVEN_KEYS,\n])\n", "\t...CASCADE_KEYS,\n])\n"),
    ]),
    ('append a resting stem to the driven table', [
        (LAST, LAST[:-3] + "\tObject.freeze({ scenario: 'page-strip', subject: 'Page strip' }),\n])\n"),
    ]),
    ("give a row another subject's stem", [
        ("\tObject.freeze({ scenario: 'range-focus', subject: 'Range' }),\n",
         "\tObject.freeze({ scenario: 'range-focus', subject: 'Page strip' }),\n"),
    ]),
    ('add a grow spinner hover row', [
        ("\t| 'Glowing placeholder'\n", "\t| 'Glowing placeholder'\n\t| 'Grow spinner'\n"),
        (LAST, LAST[:-3] + "\tObject.freeze({ scenario: 'grow-spinner-hover', subject: 'Grow spinner' }),\n])\n"),
    ]),
]

def digest() -> str:
    return hashlib.sha256(SETUP.read_bytes()).hexdigest()

baseline = digest()
for name, edits in MUTATIONS:
    text = SETUP.read_text()
    mutated = text
    for old, new in edits:
        assert mutated.count(old) == 1, (name, old)
        mutated = mutated.replace(old, new)
    SETUP.write_text(mutated)
    try:
        run = subprocess.run(['npm', 'run', 'test:setup'], cwd=ROOT, capture_output=True, text=True)
    finally:
        SETUP.write_text(text)
    assert digest() == baseline, name
    out = run.stdout + run.stderr
    failed = sorted(set(re.findall(r'FAIL\s+.*?> (.+?)(?:\n|$)', out)))
    summary = [line.strip() for line in out.splitlines() if line.strip().startswith(('Tests ', 'Test Files '))]
    print(f'## {name}\nexit {run.returncode}\n' + '\n'.join(summary))
    for case in failed:
        print(f'  failing: {case}')
print('restored', digest() == baseline)
