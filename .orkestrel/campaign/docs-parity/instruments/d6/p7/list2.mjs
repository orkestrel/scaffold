import { createGuide, createSource, collectTitles, parseManifest } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const p of globSync(['guides/**/*.md', 'README.md', 'src/**/*.ts'])) files[p] = readFileSync(p, 'utf8')
const entries = parseManifest(files['guides/README.md'], 'guides')
for (const entry of entries) {
	const guide = createGuide(files[entry.spec])
	const source = createSource({ files, module: entry.source })
	const titles = collectTitles(guide, source)
	console.log('TITLES paired:', titles.size)
	for (const [k, v] of titles) console.log(' ', k, '->', v.name)
	console.log('--- source examples via source.examples? ---')
	console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(source)))
}
