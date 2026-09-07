from pathlib import Path

path = Path('tests/guides.test.ts')
text = path.read_text(encoding='utf8')

old_header = """// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, and are the only part a sibling package changes. The flagship-fence
// transcriptions at the end of the file assert the values each fence's comments claim:
// change a fence, change the transcription beside it.
"""
new_header = """// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, and are the only part a sibling package changes.
"""
assert old_header in text
text = text.replace(old_header, new_header, 1)

old_internal = """ * intentional rather than forgotten — and the `names no symbol internal that the barrel
 * already exports` assertion fails when a name here stops being stranded, so the list
 * cannot rot.
"""
new_internal = """ * intentional rather than forgotten — and the assertion that follows it fails when a name
 * here stops being stranded, so the list cannot rot.
"""
assert old_internal in text
text = text.replace(old_internal, new_internal, 1)

old_loop = """\t\t\tconst documented = group.methods.map((method) => method.name)
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
"""
new_loop = """\t\t\tconst documented = group.methods.map((method) => method.name)
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
"""
assert old_loop in text
text = text.replace(old_loop, new_loop, 1)

old_tail = """// Duplex pair `tests/setupServer.ts` builds, which is the same real bidirectional socket
// without the listener.
"""
new_tail = """// Duplex pair `tests/setupServer.ts` builds, which is the same real bidirectional socket
// without the listener. Change a fence, change the transcription beside it.
"""
assert old_tail in text
text = text.replace(old_tail, new_tail, 1)

path.write_text(text, encoding='utf8')
print('w1 ok')
