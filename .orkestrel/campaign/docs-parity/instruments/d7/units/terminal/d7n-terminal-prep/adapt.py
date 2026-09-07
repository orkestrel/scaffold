from pathlib import Path

target = Path('tests/guides.test.ts')
ref = Path('/home/user/fleet/abort/tests/guides.test.ts')
text = target.read_text()
reflines = ref.read_text().split('\n')

def block(a, b):
    return '\n'.join(reflines[a - 1:b]) + '\n'

pairs = [
    # methods loop
    ("""\t\tfor (const group of guide.methods()) {
\t\t\tconst members = source.methods(group.interface)
\t\t\tconst entity = group.interface.replace(/Interface$/, '')
\t\t\tdescribe(`${group.interface}`, () => {
\t\t\t\tit('documents at least one method', () => {
\t\t\t\t\texpect(group.methods.length).toBeGreaterThan(0)
\t\t\t\t})
\t\t\t\tit('documents every interface method', () => {
\t\t\t\t\texpect(findMissing(members, group.methods)).toEqual([])
\t\t\t\t})
\t\t\t\tit('documents no phantom method', () => {
\t\t\t\t\texpect(findMissing(group.methods, members)).toEqual([])
\t\t\t\t})
\t\t\t\tit(`${entity} exposes no undocumented method`, () => {
\t\t\t\t\tconst extra =
\t\t\t\t\t\tentity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
\t\t\t\t\texpect(extra).toEqual([])
\t\t\t\t})
\t\t\t})
\t\t}
""", block(146, 171)),
    # Surface function examples
    ("""\t\t\texpect(findUnexampled(names, fences, source.examples())).toEqual([])
""", block(200, 206)),
    # examples loop
    ("""\t\tfor (const group of guide.methods()) {
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
""", block(209, 228)),
]

for before, after in pairs:
    if text.count(before) != 1:
        raise SystemExit(f'not found exactly once:\n{before}')
    text = text.replace(before, after)

target.write_text(text)
print('ok')
