import { readFileSync } from 'node:fs'
const text = readFileSync('src/core/types.ts', 'utf8')
const lines = text.split('\n')
let current = null
let brace = 0
let paren = 0
const out = []
for (const raw of lines) {
	const line = raw.replace(/\/\/.*$/, '')
	if (current === null) {
		const m = /^export interface (\w+)/.exec(line)
		if (!m) continue
		current = { name: m[1], members: [] }
		brace = 0
		paren = 0
	}
	const before = { brace, paren }
	if (before.brace === 1 && before.paren === 0) {
		const t = line.trim()
		const mm = /^(readonly\s+)?(\[[^\]]+\]|\w+)(\??)\s*(\(|:|<)/.exec(t)
		if (mm) {
			const name = mm[2]
			const call = mm[4] !== ':'
			const existing = current.members.find((x) => x.name === name)
			if (existing) { if (!call) existing.call = false }
			else current.members.push({ name, optional: mm[3] === '?', call })
		}
	}
	for (const ch of line) {
		if (ch === '{') brace++
		else if (ch === '}') brace--
		else if (ch === '(') paren++
		else if (ch === ')') paren--
	}
	if (brace === 0 && /^}/.test(line)) {
		out.push(current)
		current = null
	}
}
for (const entry of out) {
	const data = entry.members.filter((m) => !m.call).map((m) => m.name + (m.optional ? '?' : ''))
	const calls = entry.members.filter((m) => m.call).map((m) => m.name + (m.optional ? '?' : ''))
	let cell = data.length > 0 ? '{ ' + data.join(', ') + ' }' : ''
	if (calls.length > 0) cell = (cell ? cell + ' plus ' : '') + calls.join(', ')
	console.log(`${entry.name}\t\`${cell}\``)
}
