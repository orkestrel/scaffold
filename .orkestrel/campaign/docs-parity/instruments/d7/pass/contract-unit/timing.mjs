import { createGuide, createSource, findDrift, parseManifest } from '@orkestrel/guide'
import { globSync, readFileSync } from 'node:fs'
const files = {}
for (const key of globSync(['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'])) {
	files[key.replaceAll('\\', '/')] = readFileSync(key, 'utf8')
}
let t = performance.now()
const guide = createGuide(files['guides/contract.md'])
console.log('createGuide', (performance.now() - t).toFixed(0), 'ms')
t = performance.now()
const source = createSource({ files, module: 'src/core' })
console.log('createSource', (performance.now() - t).toFixed(0), 'ms')
t = performance.now()
const drift = findDrift(guide, source)
console.log('findDrift', (performance.now() - t).toFixed(0), 'ms', drift.length)
