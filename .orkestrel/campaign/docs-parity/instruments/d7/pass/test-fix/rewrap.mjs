import { readFileSync, writeFileSync } from 'node:fs'

const path = '/home/user/fleet/test/guides/test.md'
const lines = readFileSync(path, 'utf8').split('\n')
const start = lines.findIndex((l) => l.startsWith('- [`tests/guides.test.ts`]'))
if (start < 0) throw new Error('bullet not found')
let end = start
while (end + 1 < lines.length && lines[end + 1].startsWith('  ')) end += 1
const text = lines.slice(start, end + 1).map((l) => l.trim()).join(' ').slice(2)

// Merge words so a code span never straddles a line break.
const words = []
for (const word of text.split(' ')) {
	const open = words.length > 0 && (words[words.length - 1].split('`').length - 1) % 2 === 1
	if (open) words[words.length - 1] += ' ' + word
	else words.push(word)
}
const out = []
let line = '  '
for (const word of words) {
	if (line !== '  ' && (line + ' ' + word).length > 100) {
		out.push(line)
		line = '  ' + word
	} else line = line === '  ' ? line + word : line + ' ' + word
}
out.push(line)
out[0] = out[0].replace(/^ {2}/, '- ')
lines.splice(start, end - start + 1, ...out)
writeFileSync(path, lines.join('\n'))
console.log(out.join('\n'))
