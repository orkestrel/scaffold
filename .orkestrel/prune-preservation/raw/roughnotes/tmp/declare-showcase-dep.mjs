import { readFileSync, writeFileSync } from 'node:fs'

// scaffold's SHOWCASE_DEV_DEPENDENCIES names exactly this range, at
// src/core/constants.ts. Declare it at that range rather than at whatever
// the registry currently serves, so the target matches the generator.
const RANGE = '^2.3.3'
const NAME = 'vite-plugin-singlefile'

const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
const dev = manifest.devDependencies
if (dev === undefined) throw new Error('The manifest declares no devDependencies')

if (dev[NAME] === RANGE) {
	console.log(`${NAME} already declared at ${RANGE}`)
} else {
	const previous = dev[NAME]
	dev[NAME] = RANGE
	// Keep the block sorted, which is the shape the manifest already carries.
	manifest.devDependencies = Object.fromEntries(
		Object.entries(dev).sort(([a], [b]) => a.localeCompare(b)),
	)
	writeFileSync('package.json', `${JSON.stringify(manifest, undefined, '\t')}\n`)
	console.log(`${NAME}: ${previous ?? '(absent)'} -> ${RANGE}`)
}
