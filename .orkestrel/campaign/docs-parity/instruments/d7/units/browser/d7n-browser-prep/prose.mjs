// d7n-browser-prep item 3: apply the substitution-table row at each line the prose sweep
// names in `guides/**`, keeping the table cell's padding so the row's pipes stay aligned.
import { readFileSync, writeFileSync } from 'node:fs'

const file = 'guides/browser.md'
const targets = [1228, 1604]
const lines = readFileSync(file, 'utf8').split('\n')
for (const number of targets) {
	const line = lines[number - 1]
	if (!line.includes(' currently')) throw new Error(`${file}:${number} carries no ' currently'`)
	const next = line.replace(' currently', '')
	lines[number - 1] = next.replace(/\|$/, `${' '.repeat(line.length - next.length)}|`)
	console.log(`${number}: ${lines[number - 1].length === line.length ? 'padded' : 'LENGTH MOVED'}`)
}
writeFileSync(file, lines.join('\n'))
