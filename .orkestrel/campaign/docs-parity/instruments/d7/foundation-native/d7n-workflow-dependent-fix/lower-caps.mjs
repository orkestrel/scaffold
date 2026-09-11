import { globSync, readFileSync, writeFileSync } from 'node:fs'

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

function lowerSegment(segment) {
	return segment.replace(/\b[A-Z]{2,}(?:-[A-Z]+)*\b/g, (token, offset) => {
		if (allowed.has(token)) return token
		const lowered = token.toLowerCase()
		const prefix = segment.slice(0, offset).trimEnd()
		if (/[.!?][\s*>)\]]*$/.test(prefix)) return lowered[0].toUpperCase() + lowered.slice(1)
		return lowered
	})
}

function lowerLine(line) {
	let output = ''
	let index = 0
	for (const match of line.matchAll(/`[^`]*`|\]\([^)]*\)/g)) {
		if (match.index === undefined) continue
		output += lowerSegment(line.slice(index, match.index))
		output += match[0]
		index = match.index + match[0].length
	}
	return output + lowerSegment(line.slice(index))
}

for (const file of files) {
	const lines = readFileSync(file, 'utf8').split('\n')
	let comment = false
	let fence = false
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index]
		if (file.endsWith('.md') && /^```/.test(line.trim())) {
			fence = !fence
			continue
		}
		if (file.endsWith('.ts')) {
			const lineComment = line.trimStart().startsWith('//')
			if (line.includes('/**')) comment = true
			if (comment && /^\s*\*\s*```/.test(line)) {
				fence = !fence
				continue
			}
			if (!comment && !lineComment) continue
		}
		if (!fence) lines[index] = lowerLine(line)
		if (file.endsWith('.ts') && line.includes('*/')) comment = false
	}
	writeFileSync(file, lines.join('\n'))
}
