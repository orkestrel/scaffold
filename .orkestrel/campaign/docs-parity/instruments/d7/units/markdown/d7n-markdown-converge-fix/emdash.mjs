// Rewrites a spaced hyphen joining two clauses into the spaced em dash, inside
// authored comment prose only. Masks backtick code spans, keeps a TSDoc tag's
// `name - description` separator, and keeps a comment bullet's leading marker.
import { readFileSync, writeFileSync } from 'node:fs'

const TAG = /^\s*\*?\s*@(param|returns|typeParam|throws|see|defaultValue)\b/
const BULLET = /^(\s*\*)?\s*-\s/
const FENCE = /^\s*\*?\s*`{3,}[a-z]*\s*$/
const DASH = ' — '
const HYPHEN = ' - '
const write = process.argv.includes('--write')
const files = process.argv.slice(2).filter((one) => one !== '--write')

/** Replaces every backtick code span with an equal-length filler so a scan skips it. */
function maskSpans(line) {
	let masked = ''
	let inside = false
	let at = 0
	while (at < line.length) {
		if (line[at] === '`') {
			let run = 0
			while (line[at + run] === '`') run += 1
			masked += '`'.repeat(run)
			at += run
			inside = !inside
			continue
		}
		masked += inside ? ' ' : line[at]
		at += 1
	}
	return masked
}

for (const file of files) {
	const text = readFileSync(file, 'utf8')
	const lines = text.split('\n')
	const out = []
	let open = false
	let fenced = false
	for (const [index, line] of lines.entries()) {
		const trimmed = line.trimStart()
		const comment = trimmed.startsWith('//') || open || trimmed.startsWith('/*')
		if (line.includes('/*')) open = true
		if (line.includes('*/')) {
			open = false
			fenced = false
		}
		if (comment && FENCE.test(line)) {
			fenced = !fenced
			out.push(line)
			continue
		}
		if (!comment || fenced || !line.includes(HYPHEN)) {
			out.push(line)
			continue
		}
		const masked = maskSpans(line)
		const tag = TAG.test(line)
		const bullet = BULLET.test(line)
		let result = ''
		let cursor = 0
		let first = true
		while (cursor < line.length) {
			const at = masked.indexOf(HYPHEN, cursor)
			if (at === -1) {
				result += line.slice(cursor)
				break
			}
			const separator = (tag && first) || (bullet && at <= line.indexOf('- '))
			result += line.slice(cursor, at) + (separator ? HYPHEN : DASH)
			cursor = at + HYPHEN.length
			first = false
		}
		if (result !== line) process.stdout.write(`${file}:${index + 1}\n  ${line}\n  ${result}\n`)
		out.push(result)
	}
	if (write) writeFileSync(file, out.join('\n'))
}
