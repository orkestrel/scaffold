// The shared-block sweep with no dependency beyond node: it reads each partial's own SCSS text
// and compares the declarations that partial writes. The styles rule is about a block written in
// two partials, so the written text is the faithful subject; a declaration a mixin supplies is
// never read here because it is not written here. Run from the Veneer checkout root.
import { readdirSync, readFileSync } from 'node:fs'

const folders = ['src/styles/elements', 'src/styles/components']
const DECLARATION = /^\s*(-{2}[\w-]+|[a-z-]+)\s*:\s*([^;{}]+);\s*$/

const members = []
for (const folder of folders) {
	for (const name of readdirSync(folder)
		.filter((entry) => entry.startsWith('_') && entry.endsWith('.scss'))
		.sort()) {
		const path = `${folder}/${name}`
		const written = new Set()
		for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
			const match = DECLARATION.exec(line)
			if (match === null) continue
			written.add(`${match[1]}: ${match[2].replace(/\s+/g, ' ').trim()}`)
		}
		members.push({ path, written })
	}
}

let pairs = 0
const hits = []
for (let a = 0; a < members.length; a += 1) {
	for (let b = a + 1; b < members.length; b += 1) {
		pairs += 1
		const shared = [...members[a].written].filter((entry) => members[b].written.has(entry))
		if (shared.length >= 2) {
			hits.push({ pair: [members[a].path, members[b].path], shared })
		}
	}
}

console.log(`population: ${String(members.length)} partials over ${folders.join(' and ')}`)
console.log(`pairs compared: ${String(pairs)}`)
console.log(`hits: ${String(hits.length)}`)
for (const hit of hits) {
	console.log(`\n${hit.pair[0]} and ${hit.pair[1]}`)
	console.log(`  shared: ${hit.shared.join(' ; ')}`)
}
