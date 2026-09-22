// CL12: reports any table row whose cell widths differ from its separator row.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const lines = readFileSync(resolve(process.cwd(), 'guides/veneer.md'), 'utf8').split('\n')
let widths
for (const [index, line] of lines.entries()) {
	if (!line.startsWith('|')) {
		widths = undefined
		continue
	}
	const cells = line.split('|').slice(1, -1).map((cell) => cell.length)
	if (/^\|\s*-{3,}/.test(line)) {
		widths = cells
		continue
	}
	if (widths === undefined) continue
	if (cells.length !== widths.length || cells.some((width, column) => width !== widths[column])) {
		console.log(`${String(index + 1)}: ${cells.join(',')} vs ${widths.join(',')}`)
	}
}
console.log('done')
