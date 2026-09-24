# J-TAB round 4: moves isDisabled from validators.ts to helpers.ts (E16 amended to Kind purity's home
# for a predicate that is not a Guard<T>), its cases from validators.test.ts to helpers.test.ts, its
# imports, its guide Surface row to the helpers rows, and re-anchors the instrument rows naming it.
import pathlib, re

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab')


def read(path):
    return (ROOT / path).read_bytes().decode('utf-8')


def write(path, text):
    (ROOT / path).write_bytes(text.encode('utf-8'))


def cut(text, start, end):
    a = text.index(start)
    b = text.index(end, a)
    return text[:a] + text[b:], text[a:b]


# Source.
V, H = 'src/browser/validators.ts', 'src/browser/helpers.ts'
validators = read(V)
validators, block = cut(validators, '/**\n * Checks whether an element is disabled', '/**\n * Checks whether a DOM event carries a boolean pressed state.')
assert 'export function isDisabled' in block
write(V, validators)
helpers = read(H)
helpers = helpers.rstrip('\n') + '\n\n' + block.rstrip('\n') + '\n'
write(H, helpers)

# The delegate's import.
D = 'src/browser/Delegate.ts'
delegate = read(D)
for old, new in [
    ("import { isAttributeName, isClassToken, isDisabled, isSelector } from './validators.js'",
     "import { isAttributeName, isClassToken, isSelector } from './validators.js'"),
    ("\tcomputeNeighbor,\n\treadControls,", "\tcomputeNeighbor,\n\tisDisabled,\n\treadControls,"),
]:
    assert delegate.count(old) == 1, old
    delegate = delegate.replace(old, new)
write(D, delegate)

# Tests.
VT, HT = 'tests/src/browser/validators.test.ts', 'tests/src/browser/helpers.test.ts'
vtest = read(VT)
vtest, cases = cut(vtest, "describe('isDisabled', () => {", "describe('isButtonEvent', () => {")
assert vtest.count('\tisDisabled,\n') == 1
vtest = vtest.replace('\tisDisabled,\n', '')
write(VT, vtest)
htest = read(HT)
assert htest.count('\temitEvent,\n') == 1
htest = htest.replace('\temitEvent,\n', '\temitEvent,\n\tisDisabled,\n')
htest = htest.rstrip('\n') + '\n\n' + cases.rstrip('\n') + '\n'
write(HT, htest)

# The guide: the Surface row moves from the validators rows to the end of the helpers rows (after
# readControls, the last helpers row before the validators rows begin).
G = 'guides/veneer.md'
guide = read(G)
row = next(line for line in guide.split('\n') if line.startswith('| `isDisabled`'))
guide = guide.replace(row + '\n', '', 1)
anchor = next(line for line in guide.split('\n') if line.startswith('| `readControls`'))
guide = guide.replace(anchor + '\n', anchor + '\n' + row + '\n', 1)
write(G, guide)

# The instrument rows naming isDisabled: the ones mutating its body move from V to H.
M = 'tmp/j-tab/mutations-3.py'
instrument = read(M)
instrument = instrument.replace("[(V, \"\\t\\telement.matches(':disabled') ||", "[(H, \"\\t\\telement.matches(':disabled') ||")
instrument = instrument.replace("[(V, \" && element.getAttribute('disabled') !== 'false')\"", "[(H, \" && element.getAttribute('disabled') !== 'false')\"")
instrument = instrument.replace("('the disabled reading ignores the platform state', VT,", "('the disabled reading ignores the platform state', HT,")
instrument = instrument.replace("('the disabled reading ignores the token', VT,", "('the disabled reading ignores the token', HT,")
instrument = instrument.replace("[(V, '\\t\\telement.classList.contains(token) ||\\n'", "[(H, '\\t\\telement.classList.contains(token) ||\\n'")
write('tmp/j-tab/mutations-4.py', instrument.replace('mutation-report-3.json', 'mutation-report-4.json').replace('mutations-3.log.txt', 'mutations-4.log.txt'))
print('ok')
