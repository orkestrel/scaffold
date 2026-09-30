// Round 2: builds the Tab mutant that reads both selections at the take, before the sibling's blur,
// as round 1 did, and writes it to tmp/j-release-record/mutants/r2-tab-take.ts.
import { readFileSync, writeFileSync } from 'node:fs'

let text = readFileSync('src/browser/Tab.ts', 'utf8')
const anchor = "\t\tconst entering = host.getAttribute('role') === 'tab'\n"
const reads = [
	'\t\tconst deselection =',
	'\t\t\tleaving && outgoing !== undefined ? this.#selection(outgoing, false) : []',
	'\t\tconst selection = entering ? this.#selection(host, true) : []',
	'',
].join('\n')
const replacements = [
	[anchor, anchor + reads],
	['of this.#selection(outgoing, false))', 'of deselection)'],
	['of this.#selection(host, true))', 'of selection)'],
]
for (const [from, to] of replacements) {
	if (!text.includes(from)) throw new Error(`Not found: ${from}`)
	text = text.replace(from, to)
}
writeFileSync('tmp/j-release-record/mutants/r2-tab-take.ts', text)
console.log('written')
