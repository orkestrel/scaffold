from pathlib import Path

p = Path('tests/guides.test.ts')
t = p.read_text(encoding='utf8')

pairs = [
    (
        "// package's own, and are the only part a sibling package changes.",
        "// package's own, as is the executed section that closes the file.",
    ),
    (
        "it('returns equal results from both Methods fence rate overloads', () => {",
        "it('returns equal results from the array-of-lines and rating-definition `rate` overloads', () => {",
    ),
]
for old, new in pairs:
    assert t.count(old) == 1, old
    t = t.replace(old, new)
p.write_text(t, encoding='utf8')
print('ok')
