// compare-cells.mjs <checkout> <base-ref> <guide-path>: every table row of the guide at <base-ref> against the tree,
// split on a pipe not preceded by a backslash; reports rows missing, rows added, and every non-Summary cell that
// changed (by row key and column header), so a hand rebuild that cut an escaped pipe or moved a data cell is named.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
const [root, base, guide] = process.argv.slice(2)
const before = execFileSync('git', ['-C', root, 'show', `${base}:${guide}`], { encoding: 'utf8' })
const after = readFileSync(`${root}/${guide}`, 'utf8')
const split = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim())
function tables(text) {
	const rows = new Map(); const lines = text.split('\n'); let header = null
	for (let i = 0; i < lines.length; i += 1) {
		const line = lines[i]
		if (!line.startsWith('|')) { header = null; continue }
		const cells = split(line)
		if (/^-+$/.test(cells[0] ?? '')) continue
		if (header === null || (lines[i + 1] ?? '').startsWith('| -') || /^-+$/.test(split(lines[i + 1] ?? '|')[0] ?? '')) { header = cells; continue }
		rows.set(cells[0], { header, cells })
	}
	return rows
}
const a = tables(before), b = tables(after)
const missing = [...a.keys()].filter((k) => !b.has(k)), added = [...b.keys()].filter((k) => !a.has(k))
const changed = []
for (const [key, row] of a) {
	const now = b.get(key); if (!now) continue
	for (let c = 0; c < row.header.length; c += 1) {
		const col = row.header[c]; if (col === 'Summary') continue
		const nowIndex = now.header.indexOf(col)
		const was = row.cells[c] ?? '', is = nowIndex < 0 ? undefined : now.cells[nowIndex]
		if (is === undefined) changed.push({ key, col, was, is: '(column absent)' })
		else if (was !== is) changed.push({ key, col, was, is })
	}
}
console.log(JSON.stringify({ rowsBefore: a.size, rowsAfter: b.size, missing, added, changed }, null, 1))
