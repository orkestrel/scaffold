// Compares the key and Kind cells of every guide table row between two files.
import { readFileSync } from 'node:fs'

function splitRow(line) {
	const parts = []
	let cell = ''
	for (let at = 0; at < line.length; at += 1) {
		const char = line[at]
		if (char === '|' && line[at - 1] !== '\\') {
			parts.push(cell.trim())
			cell = ''
			continue
		}
		cell += char
	}
	parts.push(cell.trim())
	return parts.slice(1, -1)
}

function readTables(path) {
	const lines = readFileSync(path, 'utf8').split('\n')
	const rows = new Map()
	for (let at = 0; at < lines.length; at += 1) {
		const line = lines[at]
		if (!line.startsWith('| ')) continue
		if (/^\|\s*-+\s*\|/.test(line)) continue
		const cells = splitRow(line)
		if (cells.length < 2) continue
		if (cells[1] === 'Kind' || cells[0] === 'Type' || cells[0] === 'API' || cells[0] === 'Method') continue
		rows.set(cells[0], cells[1])
	}
	return rows
}

const before = readTables(process.argv[2])
const after = readTables(process.argv[3])
let moved = 0
for (const [key, kind] of before) {
	const now = after.get(key)
	if (now === undefined) { console.log(`missing after: ${key}`); moved += 1; continue }
	if (now !== kind) { console.log(`kind moved: ${key}: ${kind} -> ${now}`); moved += 1 }
}
for (const key of after.keys()) {
	if (!before.has(key)) { console.log(`added: ${key}`); moved += 1 }
}
console.log(`rows before: ${before.size}, rows after: ${after.size}, moved: ${moved}`)
