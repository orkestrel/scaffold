import { createGuide, createSource, collectExamples, parseManifest } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const p of globSync(['guides/**/*.md', 'README.md', 'src/**/*.ts'])) files[p] = readFileSync(p, 'utf8')
const entries = parseManifest(files['guides/README.md'], 'guides')
for (const entry of entries) {
	const guide = createGuide(files[entry.spec])
	const source = createSource({ files, module: entry.source })
	console.log('SPEC', entry.spec, 'MODULE', entry.source)
	const fences = guide.fences()
	console.log('--- guide fences (title | lang | first code line) ---')
	for (const f of fences) console.log(JSON.stringify(f.title), '|', (f.code ?? '').split('\n').slice(0, 2).join(' / '))
	const examples = collectExamples(source)
	console.log('--- source examples (name | title | first line) ---')
	for (const e of examples) console.log(e.name, '|', JSON.stringify(e.title), '|', (e.code ?? '').split('\n').slice(0, 2).join(' / '))
}
