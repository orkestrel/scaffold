import { readFileSync, writeFileSync } from 'node:fs'

const path = 'tmp/codex/s1-report-5.md'
const report = readFileSync(path, 'utf8')
writeFileSync(path, report.split(/\r\n|\n/).map((line) => line.startsWith('|')
	? line.replace(/`[^`]*`/g, (span) => span.replaceAll('|', '\\|'))
	: line).join('\n'))
