# Reads every round-2 mutation log and prints, per log, each failing case with the first line of
# its AssertionError, and whether every edited file was restored byte for byte.
import glob
import re

for path in sorted(glob.glob('tmp/units/r2/lret-mutation-*.log.txt')):
    text = open(path).read()
    name = path.split('lret-mutation-')[1].removesuffix('.log.txt')
    restored = 'restore FAILED' not in text and 'byte-identical' in text
    exit_line = next((line for line in text.split('\n') if line.startswith('exit=')), 'exit=?')
    blocks = re.split(r'\n (?:FAIL) ', text)
    kills = []
    for block in blocks[1:]:
        title = block.split('\n', 1)[0]
        error = next((line for line in block.split('\n') if line.startswith('AssertionError') or line.startswith('TypeError') or line.startswith('Error')), '')
        kills.append((title.split(' > ')[-1], error[:160]))
    print(f'## {name} | {exit_line} | restored={restored}')
    for title, error in kills:
        print(f'  - {title} :: {error}')
