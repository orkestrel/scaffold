// Settles unit S3's second unknown: whether excluding an already-taken index moves any
// emitted wrapper's effective configuration. Resolves every configuration artifact this
// repository materializes through Vite's own loader, under the guarded selection and
// under the unguarded one the fix replaced, and compares the resolved plugin names.
//
// Coverage: the four wrappers this checkout materializes. Every other emitted workspace
// is outside this instrument; the repeated-name scan beside it reads those.
// Forced termination bypasses `finally`; a killed run can leave the tree mutated.
import { readFileSync, writeFileSync } from 'node:fs'
import { loadConfigFromFile } from 'vite'
import assert from 'node:assert/strict'

const CONFIG = 'vite.config.ts'
const TEMPLATE = 'src/core/templates.ts'
const GUARDED = '!taken.has(position) && isNamedPlugin(candidate)'
const UNGUARDED = 'position >= 0 && isNamedPlugin(candidate)'
const WRAPPERS = [
	'vite.config.ts',
	'configs/src/vite.core.config.ts',
	'configs/src/vite.server.config.ts',
	'configs/src/vite.bin.config.ts',
]

async function resolve() {
	const resolved = {}
	for (const path of WRAPPERS) {
		const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' }, path)
		const plugins = loaded?.config.plugins ?? []
		resolved[path] = plugins.flat(Infinity).map((plugin) => plugin?.name ?? String(plugin))
	}
	return resolved
}

const config = readFileSync(CONFIG, 'utf8')
const template = readFileSync(TEMPLATE, 'utf8')
assert.ok(config.includes(GUARDED) && template.includes(GUARDED), 'The guarded selection is absent')
const guarded = await resolve()

let unguarded
try {
	writeFileSync(CONFIG, config.replace(GUARDED, UNGUARDED))
	writeFileSync(TEMPLATE, template.replace(GUARDED, UNGUARDED))
	unguarded = await resolve()
} finally {
	writeFileSync(CONFIG, config)
	writeFileSync(TEMPLATE, template)
}

for (const path of WRAPPERS) {
	const same = JSON.stringify(guarded[path]) === JSON.stringify(unguarded[path])
	console.log(path + ': ' + guarded[path].join(', ') + ' — unmoved by the fix = ' + same)
}
assert.deepEqual(unguarded, guarded)
console.log('No materialized wrapper changed its effective plugin selection.')
