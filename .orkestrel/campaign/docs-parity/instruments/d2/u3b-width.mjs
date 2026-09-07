import { readFileSync } from 'node:fs'
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
function describe(raw) {
	const lines = raw.split('\n')
	const indent = /^[ \t]*/.exec(lines[0])[0]
	const body = []
	for (let i = 0; i < lines.length; i += 1) {
		let content = i === 0 ? lines[i].slice(indent.length + 3)
			: lines[i].replace(/^[ \t]*\*[ \t]?/, '').replace(/^[ \t]*\*\/[ \t]*$/, '')
		if (i === lines.length - 1) content = ''
		if (/^\s*@\w/.test(content)) break
		body.push(content)
	}
	while (body.length > 0 && body[0].trim() === '') body.shift()
	while (body.length > 0 && body[body.length - 1].trim() === '') body.pop()
	return { indent, body }
}
function wrap(words, width, prefix) {
	const lines = []
	let current = ''
	for (const word of words) {
		if (current === '') current = word
		else if ((prefix + current + ' ' + word).length <= width) current += ' ' + word
		else { lines.push(current); current = word }
	}
	if (current !== '') lines.push(current)
	return lines
}
const files = process.argv.slice(2)
const paras = []
for (const file of files) {
	for (const raw of blocks(readFileSync(file, 'utf8'))) {
		const { indent, body } = describe(raw)
		if (body.length === 0) continue
		paras.push({ file, indent, body })
	}
}
const tally = new Map()
for (const p of paras) {
	const words = p.body.join(' ').trim().split(/\s+/)
	const prefix = p.indent + ' * '
	const hits = []
	for (let w = 40; w <= 130; w += 1) {
		if (wrap(words, w, prefix).join('\n') === p.body.join('\n')) hits.push(w)
	}
	p.hits = hits
	for (const w of hits) tally.set(w, (tally.get(w) ?? 0) + 1)
}
console.log('paragraphs:', paras.length)
console.log('single-line paragraphs:', paras.filter((p) => p.body.length === 1).length)
const multi = paras.filter((p) => p.body.length > 1)
console.log('multi-line paragraphs:', multi.length)
console.log('multi-line paragraphs reproduced by SOME greedy width:', multi.filter((p) => p.hits.length > 0).length)
const best = [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
console.log('best widths (width, paragraphs reproduced):', JSON.stringify(best))
// longest physical description line seen
let max = 0
for (const p of paras) for (const l of p.body) max = Math.max(max, (p.indent + ' * ' + l).length)
console.log('longest physical description line:', max)
