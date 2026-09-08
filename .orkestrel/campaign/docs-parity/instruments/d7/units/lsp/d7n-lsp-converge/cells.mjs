// Compares every non-`Summary` cell of every table row against the baseline guide.
// A row is keyed by its first cell; the inserted `Shape` cell is reported separately.
import { readFileSync } from 'node:fs'

/**
 * Splits one Markdown table row into its cells.
 *
 * @param line - The row, leading and trailing pipe included.
 * @returns The trimmed cells between the outer pipes.
 */
function splitRow(line) {
	const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '')
	return inner.split(/(?<!\\)\|/).map((cell) => cell.trim())
}

/**
 * Indexes every table row of one guide by its first cell.
 *
 * @param path - The guide to read.
 * @returns Each row's key mapped to its cells.
 */
function readRows(path) {
	const rows = new Map()
	for (const line of readFileSync(path, 'utf8').split('\n')) {
		if (!line.startsWith('| ')) continue
		const cells = splitRow(line)
		if (/^-+$/.test(cells[0])) continue
		if (rows.has(cells[0])) continue
		rows.set(cells[0], cells)
	}
	return rows
}

const before = readRows(process.argv[2])
const after = readRows(process.argv[3])
let compared = 0
let mismatched = 0
let missing = 0
let shaped = 0
for (const [key, cells] of before) {
	const now = after.get(key)
	if (now === undefined) {
		missing += 1
		process.stdout.write(`missing after: ${key}\n`)
		continue
	}
	const widened = now.length === cells.length + 1
	if (widened && now[2].length > 0) shaped += 1
	const kept = widened ? [now[0], now[1], ...now.slice(3)] : now
	for (let index = 0; index < kept.length - 1; index += 1) {
		compared += 1
		if (kept[index] === cells[index]) continue
		mismatched += 1
		process.stdout.write(`changed ${key} cell ${index}: ${cells[index]} -> ${kept[index]}\n`)
	}
}
process.stdout.write(
	`rows compared: ${before.size}, non-Summary cells compared: ${compared}, mismatched: ${mismatched}, missing after: ${missing}, Shape cells filled: ${shaped}\n`,
)
