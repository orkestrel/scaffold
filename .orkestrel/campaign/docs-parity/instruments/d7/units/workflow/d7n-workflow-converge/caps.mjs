// Lists every compared description whose text carries an all-caps emphasis word,
// so the doc block behind it is rewritten before the cell carries the shout.
import { readFileSync } from 'node:fs'

const KEEP = new Set([
	'JSON',
	'API',
	'APIS',
	'UI',
	'LLM',
	'TTL',
	'HTML',
	'CRUD',
	'SQL',
	'IDE',
	'UUID',
	'TS2589',
	'W',
])
const text = readFileSync(process.argv[2], 'utf8')
for (const line of text.split('\n')) {
	const at = line.indexOf(' source "')
	if (at === -1) continue
	const key = line.slice('guides/workflow.md '.length, at)
	const source = line.slice(at + ' source "'.length, -1)
	const bare = source.replace(/`[^`]*`/g, '')
	const shouts = [...bare.matchAll(/\b[A-Z][A-Z-]+\b/g)]
		.map((match) => match[0])
		.filter((word) => !KEEP.has(word))
	if (shouts.length > 0) process.stdout.write(`${key} :: ${[...new Set(shouts)].join(' ')}\n`)
}
