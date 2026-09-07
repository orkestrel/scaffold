# R1 — the drop-in: canonical header line, the INTERNAL sentence, and the hoisted `examples`.
from pathlib import Path

path = Path('tests/guides.test.ts')
text = path.read_text(encoding='utf8')

OLD_HEAD = """// The guides-parity gate: `@orkestrel/guide`'s checks run against this repository's own
// `guides/README.md` manifest, and every flagship fence in `guides/router.md` that this project
// can execute is transcribed here and asserted against what its comments claim. Name resolution
// is not a behavioural proof, so a fence documenting a value the code contradicts is exactly what
// the transcriptions catch. Change a fence, change its transcription.
//
// This project runs in Node with the browser disabled, so it cannot execute a fence that touches
// `window`: the `@orkestrel/router/browser` fences are transcribed in
// `tests/src/browser/Navigator.test.ts` instead, and the `@orkestrel/router/server` fences are
// covered by `tests/src/server/handlers.test.ts` over real `node:http` sockets.
"""

NEW_HEAD = """// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, and are the only part a sibling package changes. Every flagship fence in
// `guides/router.md` that this project can execute is transcribed at the end of the file and
// asserted against what its comments claim: name resolution is not a behavioural proof, so a
// fence documenting a value the code contradicts is exactly what the transcriptions catch.
// Change a fence, change its transcription.
//
// This project runs in Node with the browser disabled, so it cannot execute a fence that
// touches `window`: the `@orkestrel/router/browser` fences are transcribed in
// `tests/src/browser/Navigator.test.ts` instead, and the `@orkestrel/router/server` fences
// are covered by `tests/src/server/handlers.test.ts` over real `node:http` sockets.
"""

OLD_INTERNAL = " * intentional rather than forgotten — and the following second assertion fails when a name\n"
NEW_INTERNAL = " * intentional rather than forgotten — and the assertion that follows it fails when a name\n"

OLD_LOOP = """\t\tfor (const group of guide.methods()) {
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

NEW_LOOP = """\t\tfor (const group of guide.methods()) {
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

for old, new in ((OLD_HEAD, NEW_HEAD), (OLD_INTERNAL, NEW_INTERNAL), (OLD_LOOP, NEW_LOOP)):
	if text.count(old) != 1:
		raise SystemExit(f'no unique match: {old[:60]!r} ({text.count(old)})')
	text = text.replace(old, new)

path.write_text(text, encoding='utf8')
print('item1 applied')
