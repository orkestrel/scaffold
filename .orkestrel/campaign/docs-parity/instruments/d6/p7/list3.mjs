import { createGuide, createSource, parseManifest } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const p of globSync(['guides/**/*.md', 'README.md', 'src/**/*.ts'])) files[p] = readFileSync(p, 'utf8')
const entries = parseManifest(files['guides/README.md'], 'guides')
const entry = entries[0]
const guide = createGuide(files[entry.spec])
const source = createSource({ files, module: entry.source })
console.log('=== GUIDE FENCES ===')
for (const f of guide.fences()) console.log(JSON.stringify(f.title), '||', (f.code ?? '').split('\n').slice(0,1)[0])
console.log('=== SOURCE EXAMPLES ===')
for (const e of source.examples()) console.log(e.name, '||', JSON.stringify(e.title), '||', (e.code ?? '').split('\n').slice(0,2).join(' / '))
