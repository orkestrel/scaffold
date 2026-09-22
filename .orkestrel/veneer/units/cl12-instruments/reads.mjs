// CL12: lists non-table guide sentences that assert a read, a paint, or a declaration.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const text = readFileSync(resolve(process.cwd(), 'guides/veneer.md'), 'utf8')
const prose = text
	.split('\n')
	.filter((line) => !line.startsWith('|'))
	.join('\n')
	.split(/\n\s*\n/)
	.join(' ')
const sentences = prose.split(/(?<=[.:])\s+/)
const pattern = /\b(reads|read|paints|declares|resolves|answers|carries)\b/
for (const sentence of sentences) {
	if (!pattern.test(sentence)) continue
	if (!/`--[\w-]/.test(sentence)) continue
	console.log(`- ${sentence.replaceAll('\n', ' ').trim()}`)
}
