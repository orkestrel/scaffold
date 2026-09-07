import { createSource, parseManifest } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const p of globSync(['guides/**/*.md', 'README.md', 'src/**/*.ts'])) files[p] = readFileSync(p, 'utf8')
const entries = parseManifest(files['guides/README.md'], 'guides')
const source = createSource({ files, module: entries[0].source })
const names = new Set(source.examples().map((e) => e.name))
console.log('example count', names.size)
for (const n of ['Compiler', 'Materializer', 'Upstream', 'WriteTransaction', 'ScaffoldError', 'createBlueprint'])
	console.log(n, names.has(n))
