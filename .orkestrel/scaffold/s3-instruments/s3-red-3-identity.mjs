// Re-produces the red for unit S3 item 6. Mutates the emitted selection into the rival
// reading the objective lane named — keep the base entry, discard the override entry —
// and reads both assertion forms of the replacement case's factory-driven half against
// the real mutated factory. The mapped-name form admits the rival reading; the identity
// form refuses it. Restores both files, then reads the real factory again.
// Forced termination bypasses `finally`; a killed run can leave the tree mutated.
import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

const TEMPLATE = 'src/core/templates.ts'
const CONFIG = 'vite.config.ts'
const KEPT = `		} else {
			selected.push(replacement)
			taken.add(index)`
const RIVAL = `		} else {
			selected.push(plugin)
			taken.add(index)`
const NAMES = ['orkestrel-output-boundary', 'orkestrel-environment-boundary']

async function read(label) {
	const server = await createServer({
		configFile: false,
		server: { middlewareMode: true },
		appType: 'custom',
	})
	try {
		const { outputBoundary } = await server.ssrLoadModule('/configs/helpers.ts')
		const { srcServer } = await server.ssrLoadModule('/vite.config.ts')
		const replacement = outputBoundary('dist/showcase')
		const plugins = srcServer({ plugins: [replacement] }).plugins
		const mapped = plugins.map((plugin) => plugin?.name)
		const named = JSON.stringify(mapped) === JSON.stringify(NAMES)
		const identical = plugins[0] === replacement
		console.log(
			label +
				': mapped names pass = ' +
				named +
				'; identity at the base position passes = ' +
				identical,
		)
		return { named, identical }
	} finally {
		await server.close()
	}
}

const template = readFileSync(TEMPLATE, 'utf8')
const config = readFileSync(CONFIG, 'utf8')
if (!template.includes(KEPT) || !config.includes(KEPT)) {
	throw new Error('The selection is not in the tree; nothing to mutate')
}
let mutated
try {
	writeFileSync(TEMPLATE, template.replace(KEPT, RIVAL))
	writeFileSync(CONFIG, config.replace(KEPT, RIVAL))
	mutated = await read('rival reading')
} finally {
	writeFileSync(TEMPLATE, template)
	writeFileSync(CONFIG, config)
}
if (!mutated.named) throw new Error('The mapped-name form already refused the rival reading')
if (mutated.identical) throw new Error('The rival reading did not discard the override entry')
const restored = await read('real selection')
if (!restored.named || !restored.identical) throw new Error('The restored selection failed a form')
