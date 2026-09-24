# J-SCROLLSPY round 3: resolves the merge conflicts in the small source files by keeping both
# units. Each block is replaced by an explicit resolution; the script refuses a file whose block
# count differs from the brief's.
import re
import sys

BLOCK = re.compile(r'<<<<<<< HEAD\n(.*?)=======\n(.*?)>>>>>>> main\n', re.S)


def resolve(path, resolutions):
    text = open(path, encoding='utf-8').read()
    blocks = BLOCK.findall(text)
    if len(blocks) != len(resolutions):
        sys.exit(f'{path}: {len(blocks)} blocks, {len(resolutions)} resolutions')
    iterator = iter(resolutions)
    text = BLOCK.sub(lambda match: next(iterator)(match.group(1), match.group(2)), text)
    open(path, 'w', encoding='utf-8', newline='\n').write(text)
    print(f'{path}: {len(blocks)} resolved')


def main_then_head(head, main):
    return main + '\n' + head


def union_lines(head, main):
    lines = sorted(set(head.splitlines()) | set(main.splitlines()), key=lambda line: line.strip())
    return '\n'.join(lines) + '\n'


resolve('src/browser/index.ts', [lambda head, main: main + head])
resolve('src/browser/parsers.ts', [
    lambda head, main: "import { boundsOf, instanceOf, isInstance, parseArray, parseJSON, parseNumber } from '@orkestrel/contract'\n",
])
resolve('src/browser/validators.ts', [union_lines])
resolve('src/browser/constants.ts', [union_lines, main_then_head])
