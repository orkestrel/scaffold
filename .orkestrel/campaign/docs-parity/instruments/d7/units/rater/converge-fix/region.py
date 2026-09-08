import sys
from pathlib import Path

lines = Path(sys.argv[1]).read_text(encoding='utf8').splitlines()
start = next(i for i, l in enumerate(lines) if l.startswith('const root = '))
loop = next(i for i, l in enumerate(lines) if l.startswith('for (const entry of manifest) {'))
end = next(i for i, l in enumerate(lines) if i > loop and l == '}')
print(f'{sys.argv[1]}: lines {start + 1}..{end + 1}', file=sys.stderr)
sys.stdout.write('\n'.join(lines[start:end + 1]) + '\n')
