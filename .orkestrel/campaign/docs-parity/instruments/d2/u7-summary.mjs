import { readFileSync } from 'node:fs'
const WIDTH = 100
function unwrapComment(c) {
	const body = /^[ \t]*\/\*([\s\S]*?)\*\/[ \t]*$/.exec(c)?.[1] ?? c
	return body.split('\n').map((l) => l.replace(/^[ \t]*\*[ \t]?/, '').replace(/[ \t]+$/, ''))
}
function maskFences(text) {
	const masked = []; let marker
	for (const line of text.split('\n')) {
		const fence = /^[ \t]*(`{3,}|~{3,})/.exec(line)?.[1]
		if (marker === undefined) { masked.push(line); marker = fence; continue }
		const closing = fence !== undefined && fence.startsWith(marker)
		masked.push(closing ? line : ' '.repeat(line.length))
		if (closing) marker = undefined
	}
	return masked.join('\n')
}
function normalizeSummary(t) {
	return t.replace(/\{@link\s+[^}|]*\|\s*([^}]*?)\s*\}/g, '`$1`').replace(/\{@link\s+([^}|]*?)\s*\}/g, '`$1`').replace(/\s+/g, ' ').trim()
}
function wrapText(text, width) {
	const lines = []; let current = ''
	for (const word of text.split(/\s+/).filter((p) => p.length > 0)) {
		if (current.length === 0) current = word
		else if (current.length + 1 + word.length <= width) current += ' ' + word
		else { lines.push(current); current = word }
	}
	if (current.length > 0) lines.push(current)
	return lines
}
function markerLine(indent, text) { return text.length === 0 ? indent + ' *' : indent + ' * ' + text }
function replaceSummary(comment, summary, shortCircuit = true) {
	const content = unwrapComment(comment)
	const masked = maskFences(content.join('\n')).split('\n')
	let tag = masked.findIndex((l) => /^[ \t]*@\w/.test(l))
	const describedEnd = tag < 0 ? content.length : tag
	const description = content.slice(0, describedEnd).join('\n')
	if (shortCircuit && normalizeSummary(description) === normalizeSummary(summary)) return comment
	const indent = /^[ \t]*/.exec(comment)?.[0] ?? ''
	const wrapped = wrapText(summary, WIDTH - indent.length - 3)
	const tail = []
	if (tag >= 0) for (let i = tag; i < content.length; i += 1) tail.push(content[i])
	while (tail.length > 0 && tail[tail.length - 1].length === 0) tail.pop()
	if (tail.length === 0 && wrapped.length <= 1) {
		const single = indent + '/** ' + wrapped.join('') + ' */'
		if (content.length === 1 && single.length <= WIDTH) return single
	}
	const out = [indent + '/**']
	for (const line of wrapped) out.push(markerLine(indent, line))
	if (tail.length > 0) {
		if (wrapped.length > 0) out.push(markerLine(indent, ''))
		for (const line of tail) out.push(markerLine(indent, line))
	}
	out.push(indent + ' */')
	return out.join('\n')
}
function blocks(text) {
	const out = []; let i = text.indexOf('/**')
	while (i >= 0) {
		const e = text.indexOf('*/', i + 3); if (e < 0) break
		const s = text.lastIndexOf('\n', i) + 1
		if (text.slice(s, i).trim() === '') out.push(text.slice(s, e + 2))
		i = text.indexOf('/**', e + 2)
	}
	return out
}
function summaryOf(comment) {
	const content = unwrapComment(comment)
	const masked = maskFences(content.join('\n')).split('\n')
	const tag = masked.findIndex((l) => /^[ \t]*@\w/.test(l))
	return normalizeSummary(content.slice(0, tag < 0 ? content.length : tag).join('\n'))
}
const files = process.argv.slice(2)
let total = 0, movedWith = 0, movedWithout = 0, reread = 0
const samples = []
for (const file of files) {
	for (const raw of blocks(readFileSync(file, 'utf8'))) {
		total += 1
		const s = summaryOf(raw)
		if (replaceSummary(raw, s, true) !== raw) { movedWith += 1; if (samples.length < 3) samples.push([file, raw, replaceSummary(raw, s, true)]) }
		if (replaceSummary(raw, s, false) !== raw) movedWithout += 1
		// a genuine replacement must re-read to the new summary
		const other = 'Replaces the described paragraph with a longer sentence that must wrap across more than one physical line to prove the wrap, the marker, and the separator all survive the rewrite.'
		if (summaryOf(replaceSummary(raw, other)) !== normalizeSummary(other)) reread += 1
	}
}
console.log('blocks:', total)
console.log('identity case moves (with the equality short circuit):', movedWith)
console.log('identity case moves (forced re-wrap at width 100):', movedWithout)
console.log('genuine replacements that do not re-read to the new summary:', reread)
for (const [f, raw, out] of samples) { console.log('---', f); console.log('RAW:', JSON.stringify(raw)); console.log('OUT:', JSON.stringify(out)) }
