import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const files = [...globSync('src/**/*.ts'), 'guides/workflow.md', 'README.md']
const allowed = new Set([
	'AGENTS',
	'API',
	'CJS',
	'CLI',
	'CPU',
	'DAG',
	'DOM',
	'DSL',
	'ESM',
	'FIFO',
	'HTTP',
	'INVARIANT',
	'JSON',
	'JSONL',
	'LLM',
	'LICENSE',
	'MCP',
	'MIT',
	'MUTATION',
	'README',
	'RESTORE',
	'SCHEDULE',
	'SQL',
	'TRANSITION',
	'TS2589',
	'TTL',
	'UI',
	'URL',
	'UUID',
])
for (const file of files) {
	const lines = readFileSync(file, 'utf8').split(/\r?\n/)
	let comment = false
	let fence = false
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index]
		if (file.endsWith('.md') && /^```/.test(line.trim())) {
			fence = !fence
			continue
		}
		if (fence) continue
		if (file.endsWith('.ts')) {
			const lineComment = line.trimStart().startsWith('//')
			if (line.includes('/**')) comment = true
			if (!comment && !lineComment) continue
		}
		const prose = line.replace(/`[^`]*`/g, '').replace(/\[[^\]]+\]\([^)]*\)/g, '')
		const hits = prose.match(/\b[A-Z]{2,}(?:-[A-Z]+)*\b/g)?.filter((hit) => !allowed.has(hit))
		if (hits && hits.length > 0)
			console.log(`${file}:${index + 1}: ${hits.join(', ')} :: ${line.trim()}`)
		if (file.endsWith('.ts') && line.includes('*/')) comment = false
	}
}
