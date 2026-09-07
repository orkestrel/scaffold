// tmp/timing.mjs — reads @orkestrel/contract's checkout read-only and times the
// guide reader over it. Run: node tmp/timing.mjs [repeats]
import { collectTitles, createGuide, createSource, findDrift } from '@orkestrel/guide'
import { globSync, readFileSync } from 'node:fs'

const ROOT = '/home/user/fleet/contract'
const repeats = Number(process.argv[2] ?? '3')

const files = {}
for (const key of globSync(['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'], { cwd: ROOT })) {
	files[key.replaceAll('\\', '/')] = readFileSync(`${ROOT}/${key}`, 'utf8')
}

function measure(label, run) {
	const readings = []
	let value
	for (let index = 0; index < repeats; index += 1) {
		const start = performance.now()
		value = run()
		readings.push(performance.now() - start)
	}
	const best = Math.min(...readings)
	const worst = Math.max(...readings)
	console.log(`${label.padEnd(28)} ${best.toFixed(1).padStart(8)} ms best  ${worst.toFixed(1).padStart(8)} ms worst`)
	return value
}

console.log(`files ${Object.keys(files).length}, repeats ${repeats}`)

const guide = measure('createGuide', () => createGuide(files['guides/contract.md']))
measure('createSource', () => createSource({ files, module: 'src/core' }))
measure('findDrift (cold source)', () => findDrift(guide, createSource({ files, module: 'src/core' })))

const groups = guide.methods().map((group) => group.interface)
const owners = guide
	.surface()
	.filter((symbol) => symbol.keyword === 'class' || symbol.keyword === 'interface')
	.map((symbol) => symbol.name)
console.log(`method groups ${groups.length}, example owners ${owners.length}`)

measure('  source.surface()', () => createSource({ files, module: 'src/core' }).surface())
measure('  source.examples()', () => createSource({ files, module: 'src/core' }).examples())
measure('  source.methods() x groups', () => {
	const source = createSource({ files, module: 'src/core' })
	for (const name of groups) source.methods(name)
})
measure('  source.examples(name) x owners', () => {
	const source = createSource({ files, module: 'src/core' })
	for (const name of owners) source.examples(name)
})
measure('  collectTitles', () => collectTitles(guide, createSource({ files, module: 'src/core' })))

const source = createSource({ files, module: 'src/core' })
const drift = findDrift(guide, source)
console.log(`drift ${drift.length}`)
measure('findDrift (warm source)', () => findDrift(guide, source))
