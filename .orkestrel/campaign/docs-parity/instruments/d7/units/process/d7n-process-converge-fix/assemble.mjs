import { readFileSync, writeFileSync } from 'node:fs'

const dir = 'tmp/d7n-process-converge-fix/'
const read = (name) => readFileSync(dir + name, 'utf8').replace(/\n$/, '')
const ours = readFileSync('tests/guides.test.ts', 'utf8')
const lines = ours.split('\n')

const at = (text, label) => {
	const index = lines.indexOf(text)
	if (index < 0) throw new Error(`missing ${label}`)
	return index
}

const PILOT_HEADER = [
	"// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against",
	"// this repo's own `guides/README.md` manifest. The constants that follow are this",
	"// package's own, as is the executed section that closes the file.",
]
const INTERNALS_DOC = [
	'/**',
	' * Declarations deliberately kept out of a barrel, as `computeSymbolKey` strings, keyed by the face',
	' * whose module declares each one.',
	' *',
	" * `POPULATIONS` reads each row against that face's own barrel, and `INTERNAL` flattens every row",
	" * into the one scope a guide's source is read as.",
	' */',
]
const INTERNAL_DOC = [
	'/**',
	' * Declarations deliberately kept out of the barrel, as `computeSymbolKey` strings.',
	' *',
	' * A class that one-class-per-file evicted from its single consumer cannot become a',
	' * local, so it stays exported without being public. Naming it here is what makes that',
	' * intentional rather than forgotten — and the assertion that follows it fails when a name',
	' * here stops being stranded, so the list cannot rot.',
	' */',
]

// ── the head: header, imports, and the package's own constants ───────────────
const headerEnd = at('', 'header blank') // the first blank line closes the header comment
const importsAndConstants = lines.slice(headerEnd, at("const root = new URL('../', import.meta.url)", 'root'))
const head = PILOT_HEADER.concat(importsAndConstants)

let headText = head.join('\n')
const refusals = read('refusals.txt')
if (!headText.includes(refusals + '\n')) throw new Error('refusals block not found in head')
headText = headText.replace(refusals + '\n', '')

const oldInternalsDoc = [
	'/**',
	' * Declarations deliberately kept out of a barrel, as `computeSymbolKey` strings, keyed by the face whose',
	' * module declares each one.',
	' *',
	' * Naming one here is what makes it intentional rather than forgotten, and the assertions over this',
	' * table fail when a name here stops being stranded, so the table cannot rot.',
	' */',
].join('\n')
if (!headText.includes(oldInternalsDoc)) throw new Error('INTERNALS doc not found')
headText = headText.replace(oldInternalsDoc, INTERNALS_DOC.join('\n'))

const oldInternalDoc = "/** Every deliberately stranded declaration, read as one scope the way a guide's source is. */"
if (!headText.includes(oldInternalDoc)) throw new Error('INTERNAL doc not found')
headText = headText.replace(oldInternalDoc, INTERNAL_DOC.join('\n'))

// ── the region: the pilot's bytes plus this package's own block and cases ────
let region = read('pilot-region-exact.txt')
const faces = read('faces.txt').replaceAll('sourceManager.source(', 'sources.source(')
const own = read('own.txt')
const packageBlock = [faces, refusals, own].join('\n\n')

const afterReadme = '\n\nfor (const entry of manifest) {\n'
if (region.split(afterReadme).length - 1 !== 1) throw new Error('manifest loop anchor')
region = region.replace(afterReadme, `\n\n${packageBlock}\n${afterReadme}`)

const beforeImports = "\t\t}\n\n\t\tit('imports only real exports in every ```ts fence', () => {"
if (region.split(beforeImports).length - 1 !== 1) throw new Error('examples loop anchor')
region = region.replace(beforeImports, `\t\t}\n\n${read('insert-b.txt')}\n${beforeImports.slice(4)}`)

const endOfDescribe = '\t\t\texpect(missing).toEqual([])\n\t\t})\n\t})\n}'
if (region.split(endOfDescribe).length - 1 !== 1) throw new Error('describe end anchor')
region = region.replace(
	endOfDescribe,
	`\t\t\texpect(missing).toEqual([])\n\t\t})\n${read('insert-c.txt')}\n\t})\n}`,
)

// ── the tail: this package's own executed section ────────────────────────────
const loopStart = at('for (const entry of manifest) {', 'our loop')
let end = loopStart
while (lines[end] !== '}') end += 1
const tail = lines.slice(end + 1).join('\n')

writeFileSync('tests/guides.test.ts', `${headText}\n${region}\n${tail}`)
console.log('assembled')
