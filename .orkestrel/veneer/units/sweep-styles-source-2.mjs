// The shared-block sweep with no dependency beyond node, grouped by block. Each partial's SCSS
// text is scanned with a brace stack, so the declarations compared are the ones written together
// inside one pair of braces rather than every declaration the file writes. The styles rule is
// about a block written in two partials, and a declaration a mixin supplies is never written
// here, so it is never read here. Run from the Veneer checkout root.
import { readdirSync, readFileSync } from 'node:fs'

const folders = ['src/styles/elements', 'src/styles/components']
const DECLARATION = /^\s*(-{2}[\w-]+|[a-z-]+)\s*:\s*([^;{}]+);\s*$/

function readBlocks(text) {
	const finished = []
	const stack = []
	for (const line of text.split(/\r?\n/)) {
		const declaration = DECLARATION.exec(line)
		if (declaration !== null && stack.length > 0) {
			stack[stack.length - 1].add(
				`${declaration[1]}: ${declaration[2].replace(/\s+/g, ' ').trim()}`,
			)
			continue
		}
		for (const character of line) {
			if (character === '{') stack.push(new Set())
			else if (character === '}') {
				const block = stack.pop()
				if (block !== undefined && block.size > 0) finished.push(block)
			}
		}
	}
	return finished
}

const members = []
for (const folder of folders) {
	for (const name of readdirSync(folder)
		.filter((entry) => entry.startsWith('_') && entry.endsWith('.scss'))
		.sort()) {
		const path = `${folder}/${name}`
		members.push({ path, blocks: readBlocks(readFileSync(path, 'utf8')) })
	}
}

let pairs = 0
const hits = []
for (let a = 0; a < members.length; a += 1) {
	for (let b = a + 1; b < members.length; b += 1) {
		pairs += 1
		for (const left of members[a].blocks) {
			for (const right of members[b].blocks) {
				const shared = [...left].filter((entry) => right.has(entry))
				if (shared.length >= 2) {
					hits.push({ pair: [members[a].path, members[b].path], shared })
				}
			}
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
