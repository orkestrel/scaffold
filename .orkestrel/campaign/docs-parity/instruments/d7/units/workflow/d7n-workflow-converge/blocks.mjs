// Prints each doc block's description paragraph with the line range it occupies, so a
// rewrite is composed against the file's own text rather than the compared form.
import { readFileSync } from 'node:fs'

for (const path of process.argv.slice(2)) {
	const lines = readFileSync(path, 'utf8').split('\n')
	for (let at = 0; at < lines.length; at += 1) {
		if (lines[at].trim() !== '/**') continue
		const body = []
		let end = at + 1
		while (end < lines.length && !lines[end].trim().startsWith('*/')) {
			const text = lines[end].trim().replace(/^\*\s?/, '')
			if (text.startsWith('@') || text.length === 0) break
			body.push(text)
			end += 1
		}
		if (body.length === 0) continue
		const declaration = (() => {
			let scan = at + 1
			while (scan < lines.length && !lines[scan].trim().startsWith('*/')) scan += 1
			return (lines[scan + 1] ?? '').trim()
		})()
		process.stdout.write(
			`--- ${path}:${at + 2}-${end} :: ${declaration.slice(0, 70)}\n${body.join(' ')}\n`,
		)
	}
}
