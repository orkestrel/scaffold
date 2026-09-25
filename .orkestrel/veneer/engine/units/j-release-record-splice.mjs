// Replaces the inclusive line range [first, last] of a file with the text of another file, after
// checking that the range still holds the expected old text. Usage:
// node splice.mjs <target> <first> <last> <old-file> <new-file>
import { readFileSync, writeFileSync } from 'node:fs'

const [target, first, last, oldFile, newFile] = process.argv.slice(2)
const text = readFileSync(target, 'utf8')
const lines = text.split('\n')
const start = Number(first) - 1
const end = Number(last)
const current = lines.slice(start, end).join('\n')
const expected = readFileSync(oldFile, 'utf8').replace(/\n$/, '')
if (current !== expected) {
	console.error('The range no longer holds the expected text')
	process.exit(1)
}
const replacement = readFileSync(newFile, 'utf8').replace(/\n$/, '').split('\n')
lines.splice(start, end - start, ...replacement)
writeFileSync(target, lines.join('\n'))
console.log(`replaced ${end - start} lines with ${replacement.length}`)
