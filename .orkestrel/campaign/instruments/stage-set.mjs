// Print the @orkestrel/* closure a consumer must stage, one bare package name per line: every
// runtime and development dependency from the fleet's committed manifests, followed transitively
// over runtime dependencies, excluding the tooling packages (scaffold, probe) and the consumer.
// Usage: node stage-set.mjs <consumer> [--runtime-only]
import { readFileSync, existsSync } from 'node:fs'

const consumer = process.argv[2]
if (!consumer) throw new Error('consumer required')
const runtimeOnly = process.argv.includes('--runtime-only')
const EXCLUDED = new Set(['scaffold', 'probe', 'supervisor'])
const dir = (name) => (name === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${name}`)
const manifest = (name) => JSON.parse(readFileSync(`${dir(name)}/package.json`, 'utf8'))
const bare = (spec) => spec.replace('@orkestrel/', '')
const orkestrel = (record) => Object.keys(record ?? {}).filter((key) => key.startsWith('@orkestrel/')).map(bare)

const root = manifest(consumer)
const seeds = [...orkestrel(root.dependencies), ...(runtimeOnly ? [] : orkestrel(root.devDependencies))]
const closure = new Set()
const queue = seeds.filter((name) => !EXCLUDED.has(name) && name !== consumer)
while (queue.length > 0) {
	const name = queue.shift()
	if (closure.has(name)) continue
	if (!existsSync(`${dir(name)}/package.json`)) continue
	closure.add(name)
	for (const next of orkestrel(manifest(name).dependencies)) {
		if (!EXCLUDED.has(next) && next !== consumer && !closure.has(next)) queue.push(next)
	}
}
for (const name of [...closure].sort()) console.log(name)
