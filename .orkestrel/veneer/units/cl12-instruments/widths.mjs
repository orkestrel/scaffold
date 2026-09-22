// CL12: report the separator widths of the tables this unit edits.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const lines = readFileSync(resolve(process.cwd(), 'guides/veneer.md'), 'utf8').split('\n')
for (const [index, line] of lines.entries()) {
	if (!/^\|\s*-{3,}/.test(line)) continue
	const cells = line.split('|').slice(1, -1)
	console.log(`${String(index + 1)}: ${cells.map((cell) => String(cell.length)).join(',')}`)
}
