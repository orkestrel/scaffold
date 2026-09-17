// Bounds unit S3's second unknown beyond this checkout. Emits the root configuration for
// every src selection crossed with every app selection, with and without a showcase, and
// prints the distinct set of declared `plugins:` arrays across that whole population, so
// a base repeating one plugin name is readable rather than inferred.
//
// Coverage: the `plugins:` arrays a root configuration declares. A wrapper's own override
// array is outside it; `tmp/units/s3-effective.mjs` reads those for this checkout.
import { createServer } from 'vite'

const SELECTIONS = [
	[],
	['core'],
	['browser'],
	['server'],
	['core', 'browser'],
	['core', 'server'],
	['browser', 'server'],
	['core', 'browser', 'server'],
]
const ARRAY = /\n\t*plugins: \[[\S\s]*?\],\n/gu

const server = await createServer({
	configFile: false,
	server: { middlewareMode: true },
	appType: 'custom',
})
try {
	const { blueprintToRootVite, createBlueprint } = await server.ssrLoadModule('/src/core/index.ts')
	const arrays = new Set()
	let emitted = 0
	for (const src of SELECTIONS) {
		for (const app of SELECTIONS) {
			for (const showcase of [false, true]) {
				const configuration = blueprintToRootVite(
					createBlueprint('sample', { src, app, showcase, bin: src.length > 0 }),
				)
				emitted += 1
				for (const match of configuration.matchAll(ARRAY)) arrays.add(match[0].trim())
			}
		}
	}
	console.log('Root configurations emitted: ' + emitted)
	console.log('Distinct declared plugin arrays:')
	for (const array of arrays) console.log('\n' + array)
} finally {
	await server.close()
}
