import { readFileSync, writeFileSync } from 'node:fs'

const config = readFileSync('vite.config.ts', 'utf8')
const start = config.indexOf('export function mergeOverride(')
const end = config.indexOf('\n}\n', start) + 3
const merge = config.slice(start, end)
for (const path of ['src/core/templates.ts', 'tests/src/core/compilers.test.ts']) {
	const content = readFileSync(path, 'utf8')
	const offset = content.indexOf('export function mergeOverride(')
	const boundary = content.indexOf('\n}\n', offset) + 3
	writeFileSync(path, content.slice(0, offset) + merge + content.slice(boundary))
}
