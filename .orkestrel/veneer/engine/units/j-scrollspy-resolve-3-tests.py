# J-SCROLLSPY round 3: rebuilds the three conflicted test files from main's side plus this unit's
# additions, read from the unit's committed side (HEAD, 6d8bd13), so no hunk is resolved by hand.
import re
import subprocess


def show(ref, path):
    return subprocess.run(['git', 'show', f'{ref}:{path}'], capture_output=True, text=True,
                          encoding='utf-8', check=True).stdout


def write(path, text):
    assert '<<<<<<<' not in text and '>>>>>>>' not in text
    open(path, 'w', encoding='utf-8', newline='\n').write(text)
    print(f'{path}: rebuilt')


def add_import(text, names, source="'@src/browser'"):
    match = re.search(r'import \{\n(.*?)\} from ' + re.escape(source) + r'\n', text, re.S)
    present = [line.strip().rstrip(',') for line in match.group(1).splitlines() if line.strip()]
    merged = sorted(set(present) | set(names), key=str.lower)
    block = 'import {\n' + ''.join(f'\t{name},\n' for name in merged) + '} from ' + source + '\n'
    return text[:match.start()] + block + text[match.end():]


# validators.test.ts: main's file, the guard import, and this unit's describe block appended.
path = 'tests/src/browser/validators.test.ts'
main = show('MERGE_HEAD', path)
head = show('HEAD', path)
block = head[head.index("describe('isScrollSpyEvent'"):]
write(path, add_import(main, ['isScrollSpyEvent']).rstrip('\n') + '\n\n' + block)

# Delegate.test.ts: main's file, the ScrollSpy imports, and this unit's five scan cases appended.
path = 'tests/src/browser/Delegate.test.ts'
main = show('MERGE_HEAD', path)
head = show('HEAD', path)
start = head.index("\tit('acquires a scrollspy for every host its root holds at construction")
cases = head[start:head.rindex('})\n')]
assert main.endswith('\t})\n})\n')
text = add_import(main, ['ScrollSpy', 'SCROLL_SPY_SELECTORS'])
write(path, text[:-3] + '\n' + cases + '})\n')

# index.test.ts: main's file with this unit's names added to the sorted export list.
path = 'tests/src/browser/index.test.ts'
main = show('MERGE_HEAD', path)
match = re.search(r'expect\(names\)\.toStrictEqual\(\[\n(.*?)\t\t\]\)', main, re.S)
names = [line.strip().strip(',').strip("'") for line in match.group(1).splitlines() if line.strip()]
names += ['SCROLL_SPY_ATTRIBUTES', 'SCROLL_SPY_CLASSES', 'SCROLL_SPY_DEFAULTS', 'SCROLL_SPY_EVENTS',
          'SCROLL_SPY_SELECTORS', 'ScrollSpy', 'isScrollSpyEvent', 'parseRootMargin', 'parseThreshold']
listing = ''.join(f"\t\t\t'{name}',\n" for name in sorted(set(names)))
write(path, main[:match.start(1)] + listing + main[match.end(1):])
