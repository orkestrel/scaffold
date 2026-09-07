import { createSource, parseManifest } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const p of globSync(['guides/**/*.md', 'README.md', 'src/**/*.ts'])) files[p] = readFileSync(p, 'utf8')
const entries = parseManifest(files['guides/README.md'], 'guides')
const source = createSource({ files, module: entries[0].source })
for (const owner of ['Compiler', 'Materializer', 'Upstream', 'WriteTransaction', 'ScaffoldError', 'CompilerInterface', 'MaterializerInterface', 'UpstreamInterface']) {
	const ex = source.examples(owner)
	console.log(owner, '->', ex.map((e) => `${e.name}:${JSON.stringify(e.title)}`).join(', ') || '(none)')
}
