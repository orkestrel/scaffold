// Compares every non-`Summary` cell of every table row against the baseline.
// Reads the baseline from stdin-supplied path and the current guide, keys each
// row by its first cell, and reports a key whose leading cells moved. The
// inserted `Shape` column is reported separately, as an addition rather than a
// change. Splits on a pipe not preceded by a backslash.
import { readFileSync } from 'node:fs'

const SPLIT = /(?<!\\)\|/

/**
 * Reads every table row of one guide, keyed by its first cell.
 *
 * @param path - The file to read.
 * @returns Each row key mapped to its cells, the final `Summary` cell dropped.
 */
function readRows(path) {
	const rows = new Map()
	for (const line of readFileSync(path, 'utf8').split('\n')) {
		if (!line.startsWith('| ')) continue
		const cells = line
			.split(SPLIT)
			.slice(1, -1)
			.map((cell) => cell.trim())
		if (cells.length < 3) continue
		if (cells[1].startsWith('---')) continue
		rows.set(cells[0], cells.slice(0, -1))
	}
	return rows
}

const before = readRows(process.argv[2])
const after = readRows(process.argv[3])
const moved = []
const gone = []
const added = []
for (const [key, cells] of before) {
	const now = after.get(key)
	if (now === undefined) {
		gone.push(key)
		continue
	}
	const kept = now.filter((cell, at) => at !== 2 || now.length === cells.length)
	if (kept.join(' | ') !== cells.join(' | ')) {
		moved.push(`${key}: before [${cells.join(' | ')}] after [${kept.join(' | ')}]`)
	}
}
for (const key of after.keys()) if (!before.has(key)) added.push(key)
process.stdout.write(`rows before: ${before.size}, rows after: ${after.size}\n`)
process.stdout.write(`rows missing after: ${gone.length}${gone.length > 0 ? ` (${gone.join(', ')})` : ''}\n`)
process.stdout.write(`rows added: ${added.length}${added.length > 0 ? ` (${added.join(', ')})` : ''}\n`)
process.stdout.write(`non-Summary cells mismatched: ${moved.length}\n`)
for (const line of moved) process.stdout.write(`  ${line}\n`)
