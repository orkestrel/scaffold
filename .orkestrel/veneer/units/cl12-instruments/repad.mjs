// CL12: shortens the one over-wide cell, then re-pads every row to its separator widths.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const path = resolve(process.cwd(), 'guides/veneer.md')
let text = readFileSync(path, 'utf8')
const before =
	'The container family, its breakpoint caps, and the navigation combinators in the components layer.'
const after = 'The container family, its breakpoint caps, and navigation combinators in the components layer.'
if (text.split(before).length - 1 !== 1) throw new Error('Container role cell anchor is not unique')
text = text.replace(before, after)

const lines = text.split('\n')
let widths
for (const [index, line] of lines.entries()) {
	if (!line.startsWith('|')) {
		widths = undefined
		continue
	}
	if (/^\|\s*-{3,}/.test(line)) {
		widths = line.split('|').slice(1, -1).map((cell) => cell.length - 2)
		continue
	}
	if (widths === undefined) continue
	const cells = line.split('|').slice(1, -1).map((cell) => cell.trim())
	if (cells.length !== widths.length) throw new Error(`Row ${String(index + 1)} has an unexpected cell count`)
	lines[index] = `| ${cells.map((cell, column) => cell.padEnd(widths[column])).join(' | ')} |`
}
writeFileSync(path, lines.join('\n'))
console.log('repadded')
