// Compares every non-`Summary` cell of the rewritten guide against the committed baseline,
// so a cut cell in a hand-rebuilt row is caught where no gate reads it.
import { readFileSync } from 'node:fs'

/** Splits one table row into its cells, keeping an escaped pipe inside a cell. */
function splitRow(line) {
	return line
		.replace(/^\|\s?/, '')
		.replace(/\s?\|$/, '')
		.split(/(?<!\\)\|/)
		.map((cell) => cell.trim())
}

/** Reads every table row of one guide, keyed by its first cell. */
function readRows(path) {
	const lines = readFileSync(path, 'utf8').split('\n')
	const rows = new Map()
	let columns
	for (let at = 0; at < lines.length; at += 1) {
		const line = lines[at]
		if (!line.startsWith('| ')) {
			columns = undefined
			continue
		}
		const cells = splitRow(line)
		if (cells.every((cell) => /^-+$/.test(cell))) continue
		if (columns === undefined) {
			columns = cells
			continue
		}
		const key = `${columns[0]}:${cells[0]}`
		const carried = rows.get(key) ?? []
		carried.push(Object.fromEntries(cells.map((cell, index) => [columns[index] ?? index, cell])))
		rows.set(key, carried)
	}
	return rows
}

const before = readRows(process.argv[2])
const after = readRows(process.argv[3])
let compared = 0
let missing = 0
const changes = []
for (const [key, rowsBefore] of before) {
	const rowsAfter = after.get(key)
	if (rowsAfter === undefined) {
		missing += 1
		changes.push(`missing after: ${key}`)
		continue
	}
	for (const [index, row] of rowsBefore.entries()) {
		const next = rowsAfter[index]
		if (next === undefined) continue
		compared += 1
		for (const [column, value] of Object.entries(row)) {
			if (['Summary', 'Behavior', 'Role', 'Value'].includes(column)) continue
			if (next[column] !== value) changes.push(`${key} [${column}]: ${value} -> ${next[column]}`)
		}
	}
}
process.stdout.write(
	`rows compared: ${compared}, rows missing after: ${missing}\n${changes.join('\n')}\n`,
)
