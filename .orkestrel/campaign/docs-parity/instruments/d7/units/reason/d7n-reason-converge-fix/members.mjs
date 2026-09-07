// Reads src/core/types.ts and prints, per exported interface, its data members
// and its call-signature members, so a `Shape` cell can be written from the
// declaration rather than from the guide's existing cell.
import { readFileSync } from 'node:fs'

const text = readFileSync(new URL('../../src/core/types.ts', import.meta.url), 'utf8')
const lines = text.split('\n')
const report = []
let name
let depth = 0
let data = []
let calls = []
let block = false
let parens = 0
for (const line of lines) {
	if (block) {
		if (line.includes('*/')) block = false
		continue
	}
	if (/^\s*\/\*\*/.test(line) && !line.includes('*/')) {
		block = true
		continue
	}
	if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue
	if (name === undefined) {
		const open = /^export interface (\w+)[^{]*\{/.exec(line)
		if (open !== null) {
			name = open[1]
			depth = 1
			data = []
			calls = []
		}
		continue
	}
	if (parens > 0) {
		parens += (line.match(/\(/g) ?? []).length - (line.match(/\)/g) ?? []).length
		continue
	}
	const trimmed = line.trim()
	if (trimmed === '}') {
		depth -= 1
		if (depth === 0) {
			report.push({ name, data, calls })
			name = undefined
		}
		continue
	}
	if (depth === 1 && parens === 0) {
		const member = /^(readonly )?(\[?[\w.[\]]+\]?)(\?)?\s*(\(|<|:)/.exec(trimmed)
		if (member === null) continue
		const label = `${member[2]}${member[3] ?? ''}`
		if (member[4] === ':') {
			if (!data.includes(label)) data.push(label)
		} else if (!calls.includes(label)) calls.push(label)
	}
	depth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length
	parens += (line.match(/\(/g) ?? []).length - (line.match(/\)/g) ?? []).length
}
for (const entry of report) {
	const shape = `{ ${entry.data.join(', ')} }` + (entry.calls.length > 0 ? ` plus ${entry.calls.join(', ')}` : '')
	console.log(`${entry.name}\t${shape}`)
}
