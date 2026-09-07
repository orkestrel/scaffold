// P15: in every fleet checkout's src tree, find a doc block carrying a titled `@example` whose
// declaration head is `export class`, `export abstract class`, or `export interface`.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
const roots = process.argv.slice(2)
function walk(dir, out) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name)
		if (name === 'node_modules' || name === 'dist') continue
		if (statSync(path).isDirectory()) walk(path, out)
		else if (name.endsWith('.ts')) out.push(path)
	}
	return out
}
let files = 0, blocks = 0, titledHeads = 0, untitledHeads = 0
for (const root of roots) {
	let paths = []
	try { paths = walk(root, []) } catch { continue }
	for (const path of paths) {
		files++
		const text = readFileSync(path, 'utf8')
		const re = /\/\*\*[\s\S]*?\*\/\s*\n(export (?:abstract )?(?:class|interface) \w+)/g
		let m
		while ((m = re.exec(text)) !== null) {
			const block = m[0]
			const tags = [...block.matchAll(/^\s*\*\s*@example[ \t]*(.*)$/gm)]
			if (tags.length === 0) continue
			blocks++
			for (const tag of tags) {
				if (tag[1].trim().length > 0) { titledHeads++; console.log(`titled: ${path} -> ${m[1]} :: ${tag[1].trim()}`) }
				else untitledHeads++
			}
		}
	}
}
console.log(`files read: ${files}, class/interface heads carrying @example: ${blocks}, titled: ${titledHeads}, untitled: ${untitledHeads}`)
