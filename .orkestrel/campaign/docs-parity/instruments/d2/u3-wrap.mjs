import { readFileSync } from 'node:fs'

// Collect raw /** ... */ blocks by a simple scan, per file.
function blocks(text) {
	const out = []
	let index = text.indexOf('/**')
	while (index >= 0) {
		const end = text.indexOf('*/', index + 3)
		if (end < 0) break
		// only blocks whose opener is the first non-whitespace of its line
		const lineStart = text.lastIndexOf('\n', index) + 1
		if (text.slice(lineStart, index).trim() === '') out.push(text.slice(lineStart, end + 2))
		index = text.indexOf('/**', end + 2)
	}
	return out
}

// Description paragraph lines of a raw block: the content lines before the first tag line.
function describe(raw) {
	const lines = raw.split('\n')
	const indent = /^[ \t]*/.exec(lines[0])[0]
	const body = []
	for (let i = 0; i < lines.length; i += 1) {
		const line = lines[i]
		let content = line
		if (i === 0) content = line.slice(indent.length + 3) // after `/**`
		else content = line.replace(/^[ \t]*\*[ \t]?/, '').replace(/^[ \t]*\*\/[ \t]*$/, '')
		if (i === lines.length - 1) content = ''
		if (/^\s*@\w/.test(content)) break
		body.push({ raw: line, content })
	}
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
let total = 0
const moved = []
for (const file of files) {
	const text = readFileSync(file, 'utf8')
	for (const raw of blocks(text)) {
		const { indent, body } = describe(raw)
		// drop the leading empty from `/**` line, and trailing blanks
		const lines = body.map((b) => b.content)
		while (lines.length > 0 && lines[0].trim() === '') lines.shift()
		while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop()
		if (lines.length === 0) continue
		total += 1
		const words = lines.join(' ').trim().split(/\s+/)
		const prefix = indent + ' * '
		for (const width of [100]) {
			const rewrapped = wrap(words, width, prefix)
			if (rewrapped.join('\n') !== lines.join('\n')) {
				moved.push({ file, width, before: lines, after: rewrapped })
			}
		}
	}
}
console.log('description paragraphs read:', total)
console.log('paragraphs that move at width 100:', moved.length)
for (const m of moved.slice(0, 8)) {
	console.log('---', m.file)
	console.log('BEFORE:', JSON.stringify(m.before))
	console.log('AFTER :', JSON.stringify(m.after))
}
