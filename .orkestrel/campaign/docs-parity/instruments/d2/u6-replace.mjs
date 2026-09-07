import { readFileSync } from 'node:fs'
const WIDTH = 100

function unwrapComment(comment) {
	const body = /^[ \t]*\/\*([\s\S]*?)\*\/[ \t]*$/.exec(comment)?.[1] ?? comment
	return body.split('\n').map((line) => line.replace(/^[ \t]*\*[ \t]?/, '').replace(/[ \t]+$/, ''))
}
function maskFences(text) {
	const masked = []
	let marker
	for (const line of text.split('\n')) {
		const fence = /^[ \t]*(`{3,}|~{3,})/.exec(line)?.[1]
		if (marker === undefined) { masked.push(line); marker = fence; continue }
		const closing = fence !== undefined && fence.startsWith(marker)
		masked.push(closing ? line : ' '.repeat(line.length))
		if (closing) marker = undefined
	}
	return masked.join('\n')
}
function normalizeSummary(text) {
	return text.replace(/\{@link\s+[^}|]*\|\s*([^}]*?)\s*\}/g, '`$1`').replace(/\{@link\s+([^}|]*?)\s*\}/g, '`$1`').replace(/\s+/g, ' ').trim()
}
function wrapText(text, width) {
	const lines = []
	let current = ''
	for (const word of text.split(/\s+/).filter((p) => p.length > 0)) {
		if (current.length === 0) current = word
		else if (current.length + 1 + word.length <= width) current += ' ' + word
		else { lines.push(current); current = word }
	}
	if (current.length > 0) lines.push(current)
	return lines
}
// candidate: rebuild the whole block from its own content lines, unchanged
function rebuild(comment) {
	const content = unwrapComment(comment)
	const indent = /^[ \t]*/.exec(comment)?.[0] ?? ''
	if (content.length === 1) return `${indent}/** ${content[0]} */`
	const out = [`${indent}/**`]
	for (let i = 1; i < content.length - 1; i += 1) {
		out.push(content[i].length === 0 ? `${indent} *` : `${indent} * ${content[i]}`)
	}
	out.push(`${indent} */`)
	return out.join('\n')
}
function blocks(text) {
	const out = []
	let index = text.indexOf('/**')
	while (index >= 0) {
		const end = text.indexOf('*/', index + 3)
		if (end < 0) break
		const lineStart = text.lastIndexOf('\n', index) + 1
		if (text.slice(lineStart, index).trim() === '') out.push(text.slice(lineStart, end + 2))
		index = text.indexOf('/**', end + 2)
	}
	return out
}
const files = process.argv.slice(2)
let total = 0, moved = 0
const samples = []
for (const file of files) {
	for (const raw of blocks(readFileSync(file, 'utf8'))) {
		total += 1
		const back = rebuild(raw)
		if (back !== raw) { moved += 1; if (samples.length < 4) samples.push([file, raw, back]) }
	}
}
console.log('blocks read:', total)
console.log('blocks whose marker re-emission moves a byte:', moved)
for (const [file, raw, back] of samples) {
	console.log('---', file)
	console.log('RAW :', JSON.stringify(raw.split('\n').slice(0, 6)))
	console.log('BACK:', JSON.stringify(back.split('\n').slice(0, 6)))
}
