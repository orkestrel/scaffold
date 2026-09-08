import { readFileSync, writeFileSync } from 'node:fs'

const PILOT = '/home/user/fleet/abort/tests/guides.test.ts'
const OURS = 'tests/guides.test.ts'

const cut = (lines, from, to) => lines.slice(from, to).join('\n')
const findLine = (lines, text, label) => {
	const index = lines.indexOf(text)
	if (index < 0) throw new Error(`missing ${label}: ${JSON.stringify(text)}`)
	return index
}

const pilot = readFileSync(PILOT, 'utf8').split('\n')
const ours = readFileSync(OURS, 'utf8').split('\n')

// ── the pilot's region ───────────────────────────────────────────────────────
const pilotStart = findLine(pilot, "const root = new URL('../', import.meta.url)", 'pilot root')
const pilotLoop = findLine(pilot, 'for (const entry of manifest) {', 'pilot loop')
let pilotEnd = pilotLoop
while (pilot[pilotEnd] !== '}') pilotEnd += 1
const pilotRegion = cut(pilot, pilotStart, pilotEnd + 1)

// ── our own blocks, lifted verbatim ──────────────────────────────────────────
const refusalStart = findLine(ours, ' * The names each face must refuse from its neighbouring face.', 'refusal doc') - 1
const refusalEnd = findLine(ours, '/**\n * Declarations'.split('\n')[0], 'x') // placeholder
const internalsDoc = ours.indexOf(' * Declarations deliberately kept out of a barrel, as `computeSymbolKey` strings, keyed by the face whose')
const refusalStop = internalsDoc - 1 // the `/**` line opening the INTERNALS block
const refusals = cut(ours, refusalStart, refusalStop)

const facesStart = findLine(ours, '// The published faces in one table. `SOURCES`, the refusal rows, and the live population rows', 'faces comment')
const facesStop = findLine(ours, ')', 'x') // unused
const sourcesEnd = ours.indexOf(')', facesStart)
const facesBlock = cut(ours, facesStart, findLine(ours, "it('manifest lists at least one guide', () => {", 'manifest case') - 1)

const facesDescribeStart = findLine(ours, "describe('public package faces', () => {", 'faces describe')
const populationsLoopStart = findLine(ours, 'for (const entry of POPULATIONS) {', 'populations loop')
let populationsEnd = populationsLoopStart
while (ours[populationsEnd] !== '}') populationsEnd += 1
const ownBlock = cut(ours, facesDescribeStart, populationsEnd + 1)

writeFileSync('tmp/d7n-process-converge-fix/refusals.txt', refusals + '\n')
writeFileSync('tmp/d7n-process-converge-fix/faces.txt', facesBlock + '\n')
writeFileSync('tmp/d7n-process-converge-fix/own.txt', ownBlock + '\n')
writeFileSync('tmp/d7n-process-converge-fix/pilot-region-exact.txt', pilotRegion + '\n')
console.log('refusals', refusalStart + 1, refusalStop)
console.log('faces', facesStart + 1)
console.log('own', facesDescribeStart + 1, populationsEnd + 1)
