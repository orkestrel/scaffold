// Corroboration only: re-runs the retained comparator's split, mapping the renamed header
// Signature -> Shape for the two Constants tables, so the cell VALUES are compared rather than
// reported as an absent column.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
const root = '/home/user/fleet/test', guide = 'guides/test.md'
const before = execFileSync('git', ['-C', root, 'show', `HEAD:${guide}`], { encoding: 'utf8' })
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
const changed = []
for (const [key, row] of a) {
	const now = b.get(key); if (!now) continue
	for (let c = 0; c < row.header.length; c += 1) {
		const col = row.header[c]; if (col === 'Summary') continue
		const mapped = col === 'Signature' && now.header.indexOf(col) < 0 ? 'Shape' : col
		const nowIndex = now.header.indexOf(mapped)
		const was = row.cells[c] ?? '', is = nowIndex < 0 ? '(column absent)' : now.cells[nowIndex]
		if (was !== is) changed.push({ key, col, mapped, was, is })
	}
}
console.log(JSON.stringify({ rowsBefore: a.size, rowsAfter: b.size, changedUnderMappedHeader: changed }, null, 1))
