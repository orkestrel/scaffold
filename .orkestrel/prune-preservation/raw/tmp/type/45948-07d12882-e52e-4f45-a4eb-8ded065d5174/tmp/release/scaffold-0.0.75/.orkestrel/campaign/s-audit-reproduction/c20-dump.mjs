// Print each line of the file at argv[2] as hex code points, so a cp1252 round-trip shows as a
// replaced code point rather than as an invisible glyph change.
import { readFileSync } from 'node:fs'

const text = readFileSync(process.argv[2], 'utf8')
for (const [index, line] of text.split('\n').entries()) {
	const points = [...line].map((character) => character.codePointAt(0)?.toString(16) ?? '?')
	console.log(`${index + 1}: ${line} | ${points.join(' ')}`)
}
