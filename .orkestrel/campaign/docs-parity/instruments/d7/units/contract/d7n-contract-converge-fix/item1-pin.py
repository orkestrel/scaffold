from pathlib import Path

path = Path('tests/guides.test.ts')
text = path.read_text(encoding='utf8')

old_pin = """\tconst fences = guide.fences()
\tconst headings = fences.map((fence) => fence.title).filter((title) => title !== undefined)
\tconst paired = fences.filter((fence) => fence.title !== undefined && titled.has(fence.title))
"""
new_pin = """\tconst headings: string[] = []
\tconst paired: string[] = []
\tfor (const fence of guide.fences()) {
\t\tif (fence.title === undefined) continue
\t\theadings.push(fence.title)
\t\tif (titled.has(fence.title)) paired.push(fence.title)
\t}
"""
assert text.count(old_pin) == 1, 'pin block not unique'
text = text.replace(old_pin, new_pin)

old_doc = ' * intentional rather than forgotten — and the second assertion below fails when a name\n'
new_doc = ' * intentional rather than forgotten — and the assertion that follows it fails when a name\n'
assert text.count(old_doc) == 1, 'INTERNAL doc line not unique'
text = text.replace(old_doc, new_doc)

path.write_text(text, encoding='utf8')
print('ok')
