# Hoists the mapped `examples` binding to the examples loop's own scope (S1) and
# converges the INTERNAL doc block on Ruling 13's canonical wording.
from pathlib import Path

path = Path('tests/guides.test.ts')
text = path.read_text()

old_block = """\t\tfor (const group of guide.methods()) {
\t\t\tconst entity = group.interface.replace(/Interface$/, '')
\t\t\tconst documented = group.methods.map((method) => method.name)
\t\t\tdescribe(`${group.interface} examples`, () => {
\t\t\t\tit('documents an example for every method', () => {
\t\t\t\t\tconst fences = guide
\t\t\t\t\t\t.fences()
\t\t\t\t\t\t.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
\t\t\t\t\t\t.map((fence) => fence.code)
\t\t\t\t\tconst examples =
\t\t\t\t\t\tentity === group.interface
\t\t\t\t\t\t\t? source.examples(group.interface).map((example) => example.name)
\t\t\t\t\t\t\t: source
\t\t\t\t\t\t\t\t\t.examples(group.interface)
\t\t\t\t\t\t\t\t\t.map((example) => example.name)
\t\t\t\t\t\t\t\t\t.concat(source.examples(entity).map((example) => example.name))
\t\t\t\t\texpect(findUnexampled(documented, fences, examples)).toEqual([])
\t\t\t\t})
\t\t\t})
\t\t}
"""

new_block = """\t\tfor (const group of guide.methods()) {
\t\t\tconst entity = group.interface.replace(/Interface$/, '')
\t\t\tconst documented = group.methods.map((method) => method.name)
\t\t\tconst examples =
\t\t\t\tentity === group.interface
\t\t\t\t\t? source.examples(group.interface).map((example) => example.name)
\t\t\t\t\t: source
\t\t\t\t\t\t\t.examples(group.interface)
\t\t\t\t\t\t\t.map((example) => example.name)
\t\t\t\t\t\t\t.concat(source.examples(entity).map((example) => example.name))
\t\t\tdescribe(`${group.interface} examples`, () => {
\t\t\t\tit('documents an example for every method', () => {
\t\t\t\t\tconst fences = guide
\t\t\t\t\t\t.fences()
\t\t\t\t\t\t.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
\t\t\t\t\t\t.map((fence) => fence.code)
\t\t\t\t\texpect(findUnexampled(documented, fences, examples)).toEqual([])
\t\t\t\t})
\t\t\t})
\t\t}
"""

assert text.count(old_block) == 1, 'examples block not matched'
text = text.replace(old_block, new_block)

old_doc = ' * intentional rather than forgotten — and the second assertion below fails when a name\n'
new_doc = ' * intentional rather than forgotten — and the assertion that follows it fails when a name\n'
assert text.count(old_doc) == 1, 'INTERNAL doc line not matched'
text = text.replace(old_doc, new_doc)

path.write_text(text)
print('tests/guides.test.ts rewritten')
