// CL12: which non-table, non-link guide lines exceed the formatter's print width?
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const lines = readFileSync(resolve(root, 'guides/veneer.md'), 'utf8').split('\n')
const wide = []
for (const [index, line] of lines.entries()) {
	if (line.startsWith('|') || line.trimStart().startsWith('[')) continue
	if (line.length > 100) wide.push({ line: index + 1, length: line.length, head: line.slice(0, 60) })
}
console.log(JSON.stringify({ wide }, null, '\t'))
