// P16: compare every table row's non-final cells between two renderings of guides/guide.md.
// Usage: node p16-cells.mjs <before.md> <after.md>
import { readFileSync } from 'node:fs'
const [before, after] = process.argv.slice(2).map((path) => readFileSync(path, 'utf8').split('\n'))
function cells(line) {
	// split on unescaped pipes, trim, collapse whitespace
	const out = []
	let cur = ''
	for (let i = 0; i < line.length; i++) {
		const ch = line[i]
		if (ch === '\\' && line[i + 1] === '|') { cur += '\\|'; i++; continue }
		if (ch === '|') { out.push(cur.trim().replace(/\s+/g, ' ')); cur = ''; continue }
		cur += ch
	}
	out.push(cur.trim())
	return out.slice(1, -1)
}
function rows(lines) {
	const map = new Map()
	let table = 0
	let inTable = false
	for (const line of lines) {
		if (line.startsWith('|')) {
			if (!inTable) { inTable = true; table++ }
			const c = cells(line)
			if (c.every((cell) => /^-+$/.test(cell))) continue
			map.set(`${table}:${c[0]}`, c)
		} else inTable = false
	}
	return map
}
const a = rows(before), b = rows(after)
let compared = 0, mismatched = 0, missing = 0
for (const [key, cellsA] of a) {
	const cellsB = b.get(key)
	if (!cellsB) { missing++; console.log(`missing after: ${key}`); continue }
	compared++
	const head = cellsA.slice(0, -1).join(' | '), headB = cellsB.slice(0, -1).join(' | ')
	if (head !== headB || cellsA.length !== cellsB.length) { mismatched++; console.log(`MISMATCH ${key}\n  before: ${head}\n  after:  ${headB}`) }
}
console.log(`rows compared: ${compared}, non-final cells mismatched: ${mismatched}, rows missing after: ${missing}, rows after: ${b.size}`)
