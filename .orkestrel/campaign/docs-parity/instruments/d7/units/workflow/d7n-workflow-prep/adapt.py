from pathlib import Path

p = Path('tests/guides.test.ts')
text = p.read_text()

edits = [
(
"""\t\tfor (const group of guide.methods()) {
\t\t\tconst members = source.methods(group.interface)
\t\t\tconst entity = group.interface.replace(/Interface$/, '')
""",
"""\t\tfor (const group of guide.methods()) {
\t\t\tconst members = source.methods(group.interface).map((method) => method.name)
\t\t\tconst documented = group.methods.map((method) => method.name)
\t\t\tconst entity = group.interface.replace(/Interface$/, '')
""",
),
(
"""\t\t\t\t\texpect(findMissing(members, group.methods)).toEqual([])""",
"""\t\t\t\t\texpect(findMissing(members, documented)).toEqual([])""",
),
(
"""\t\t\t\t\texpect(findMissing(group.methods, members)).toEqual([])""",
"""\t\t\t\t\texpect(findMissing(documented, members)).toEqual([])""",
),
(
"""\t\t\t\t\tconst extra =
\t\t\t\t\t\tentity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
""",
"""\t\t\t\t\tconst extra =
\t\t\t\t\t\tentity === group.interface
\t\t\t\t\t\t\t? []
\t\t\t\t\t\t\t: findMissing(
\t\t\t\t\t\t\t\t\tsource.methods(entity).map((method) => method.name),
\t\t\t\t\t\t\t\t\tdocumented,
\t\t\t\t\t\t\t\t)
""",
),
(
"""\t\t\texpect(findUnexampled(names, fences, source.examples())).toEqual([])
""",
"""\t\t\texpect(
\t\t\t\tfindUnexampled(
\t\t\t\t\tnames,
\t\t\t\t\tfences,
\t\t\t\t\tsource.examples().map((example) => example.name),
\t\t\t\t),
\t\t\t).toEqual([])
""",
),
(
"""\t\tfor (const group of guide.methods()) {
\t\t\tconst entity = group.interface.replace(/Interface$/, '')
\t\t\tdescribe(`${group.interface} examples`, () => {
\t\t\t\tit('documents an example for every method', () => {
\t\t\t\t\tconst fences = guide
\t\t\t\t\t\t.fences()
\t\t\t\t\t\t.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
\t\t\t\t\t\t.map((fence) => fence.code)
\t\t\t\t\tconst examples =
\t\t\t\t\t\tentity === group.interface
\t\t\t\t\t\t\t? source.examples(group.interface)
\t\t\t\t\t\t\t: source.examples(group.interface).concat(source.examples(entity))
\t\t\t\t\texpect(findUnexampled(group.methods, fences, examples)).toEqual([])
\t\t\t\t})
\t\t\t})
\t\t}
""",
"""\t\tfor (const group of guide.methods()) {
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
""",
),
]

for index, (before, after) in enumerate(edits):
    count = text.count(before)
    if count != 1:
        raise SystemExit(f'edit {index}: found {count} occurrences')
    text = text.replace(before, after)

p.write_text(text)
print('applied')
