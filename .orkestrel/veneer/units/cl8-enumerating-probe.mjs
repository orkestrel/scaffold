// Find every assertion that enumerates the component-key set as a literal, so a unit shipping a new
// key can be granted each file it makes false. Reads the test tree under the Veneer root.
// Read-only, bounded output.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const known = ['container', 'blockquote', 'figure', 'display', 'engine', 'btn', 'link', 'img']
const hits = []

function walk(directory) {
	for (const entry of readdirSync(directory)) {
		if (entry === 'node_modules' || entry === 'fixtures' || entry === 'tmp') continue
		const path = join(directory, entry)
		if (statSync(path).isDirectory()) {
			walk(path)
			continue
		}
		if (!/\.(ts|mts)$/.test(entry)) continue
		const lines = readFileSync(path, 'utf8').split('\n')
		lines.forEach((line, index) => {
			const quoted = [...line.matchAll(/'([a-z][a-z0-9-]*)'/g)].map((match) => match[1])
			const overlap = quoted.filter((name) => known.includes(name))
			if (overlap.length > 0) hits.push({ path, line: index + 1, overlap, text: line.trim() })
		})
	}
}

walk('tests')

// Group by file, and report only files where a known key appears in a literal list context.
const byFile = new Map()
for (const hit of hits) {
	const rows = byFile.get(hit.path) ?? []
	rows.push(hit)
	byFile.set(hit.path, rows)
}
for (const [path, rows] of [...byFile].sort()) {
	console.log(`\n== ${path} (${String(rows.length)} lines naming a known key)`)
	for (const row of rows.slice(0, 6))
		console.log(`   :${String(row.line)}  ${row.text.slice(0, 110)}`)
	if (rows.length > 6) console.log(`   … and more`)
}
