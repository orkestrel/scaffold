// Probe: dumps every code point above 0x7F in the restored normalizer case, and sweeps the
// campaign diff for a removed line whose replacement dropped one.
import { readFileSync } from 'node:fs'

function dumpLine(path, text, number) {
	const points = [...text]
		.map((character, index) => ({ character, index, code: character.codePointAt(0) ?? 0 }))
		.filter((entry) => entry.code > 0x7f)
		.map((entry) => `U+${entry.code.toString(16).toUpperCase().padStart(4, '0')} ${entry.character}`)
	console.log(`${path}:${number}: ${points.length === 0 ? 'ascii only' : points.join(', ')}`)
}

function readNonASCII(text) {
	return [...text].filter((character) => (character.codePointAt(0) ?? 0) > 0x7f).join('')
}

const target = 'tests/setupPolicy.test.ts'
const lines = readFileSync(target, 'utf8').split(/\r\n|\n/u)
for (const [index, text] of lines.entries()) {
	if (text.includes('literal%20')) dumpLine(target, text, index + 1)
}

const diff = readFileSync(process.argv[2] ?? 'tmp/probe/s2-4.diff', 'utf8').split(/\r\n|\n/u)
const removed = []
const added = []
for (const line of diff) {
	if (line.startsWith('-') && !line.startsWith('---') && readNonASCII(line) !== '') removed.push(line)
	if (line.startsWith('+') && !line.startsWith('+++') && readNonASCII(line) !== '') added.push(line)
}
const carried = readNonASCII(added.join('\n'))
const lost = removed.filter((line) => {
	const points = new Set(readNonASCII(line))
	return [...points].some((character) => !carried.includes(character))
})
console.log(`diff removed lines carrying a code point above 0x7F: ${removed.length}`)
for (const line of removed) dumpLine('removed', line, 0)
console.log(`removed lines whose code points no added line carries: ${lost.length}`)
for (const line of lost) dumpLine('lost', line, 0)
