import { strict as assert } from 'node:assert'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const guide = resolve(root, '../../../../guide')
const { createVitest } = await import(pathToFileURL(resolve(guide, 'node_modules/vitest/dist/node.js')).href)
const runner = await createVitest('test', {
	root,
	config: false,
	watch: false,
	cache: false,
	reporters: ['dot'],
	include: ['direction.test.mjs'],
	provide: { direction: 'guide' },
}, { resolve: { alias: { vitest: resolve(guide, 'node_modules/vitest/dist/index.js') } } })
try {
	const result = await runner.start()
	assert.equal(result.unhandledErrors.length, 0)
	assert.equal(result.testModules.length, 1)
	assert.equal(result.testModules[0]?.state(), 'passed')
	console.log('Public Vitest launch, provided direction and result inspection passed.')
} finally {
	await runner.close()
}
