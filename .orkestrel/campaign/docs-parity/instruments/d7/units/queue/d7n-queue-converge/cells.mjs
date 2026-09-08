// Compares every non-Summary cell of every table row between two guide texts, keyed by
// the row's first cell. Splits on a pipe not preceded by a backslash.
import { readFileSync } from 'node:fs'

function readRows(text) {
	const rows = new Map()
	const lines = text.split('\n')
	let header
	let table = 0
	for (const line of lines) {
		if (!line.startsWith('| ')) {
			header = undefined
			continue
		}
		const cells = line
			.slice(1, line.endsWith('|') ? -1 : undefined)
			.split(/(?<!\\)\|/)
			.map((cell) => cell.trim())
		if (cells.every((cell) => /^-+$/.test(cell))) continue
		if (header === undefined) {
			header = cells
			table += 1
			continue
		}
		const compared = new Set(['Summary', 'Behavior'])
		const kept = cells.filter((_, index) => !compared.has(header[index]))
		rows.set(`${table}:${header[0]}:${cells[0]}`, kept.join(' | '))
	}
	return rows
}

const before = readRows(readFileSync(process.argv[2], 'utf8'))
const after = readRows(readFileSync(process.argv[3], 'utf8'))
const changed = []
const missing = []
for (const [key, value] of before) {
	if (!after.has(key)) missing.push(key)
	else if (after.get(key) !== value) changed.push(`${key}\n  before: ${value}\n  after:  ${after.get(key)}`)
}
console.log(`rows before: ${before.size}, rows after: ${after.size}`)
console.log(`rows missing after: ${missing.length}${missing.length > 0 ? `\n  ${missing.join('\n  ')}` : ''}`)
console.log(`non-Summary cells changed: ${changed.length}${changed.length > 0 ? `\n${changed.join('\n')}` : ''}`)
