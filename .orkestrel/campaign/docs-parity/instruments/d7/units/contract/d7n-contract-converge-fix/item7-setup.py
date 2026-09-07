from pathlib import Path

path = Path('tests/setup.ts')
text = path.read_text(encoding='utf8')
old = '/** Carries one hostile RegExp scalar population on a type-correct string shape. */\n'
new = '/** Represents a type-correct string shape carrying one hostile RegExp scalar population. */\n'
assert text.count(old) == 1
path.write_text(text.replace(old, new), encoding='utf8')
print('ok')
