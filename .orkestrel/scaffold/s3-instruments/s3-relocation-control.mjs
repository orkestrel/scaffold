// The relocation control for unit S3 item 9. The S2 control appended a byte to the
// captured file, which a capture that silently emitted nothing would pass identically.
// This one perturbs one character inside the relocated showcase literal itself, so the
// comparison has to read through the generator to report anything.
//
// Coverage: every configuration artifact of every src selection crossed with every app
// selection, each with and without a showcase, plus this repository's own artifacts.
// The perturbed character sits in the showcase plugin's name, which only a showcased
// selection emits, so the control also shows the capture reaches the showcased half of
// the matrix rather than only the plain half.
// Forced termination bypasses `finally`; a killed run can leave the tree mutated.
import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'
import assert from 'node:assert/strict'

const TEMPLATE = 'src/core/templates.ts'
const ANCHOR = "name: 'orkestrel-showcase-html',"
const PERTURBED = "name: 'orkestrel-showcase-htmm',"
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

async function capture() {
	const server = await createServer({
		configFile: false,
		server: { middlewareMode: true },
		appType: 'custom',
	})
	try {
		const { blueprintToConfigArtifacts, createBlueprint } =
			await server.ssrLoadModule('/src/core/index.ts')
		const own = blueprintToConfigArtifacts(
			createBlueprint('scaffold', {
				src: ['core', 'server'],
				bin: true,
				guides: true,
				setup: true,
			}),
		)
		const captured = []
		for (const src of SELECTIONS) {
			for (const app of SELECTIONS) {
				for (const showcase of [false, true]) {
					captured.push({
						src,
						app,
						showcase,
						artifacts: blueprintToConfigArtifacts(
							createBlueprint('sample', {
								src,
								app,
								showcase,
								bin: src.length > 0,
								guides: true,
								setup: true,
								integration: true,
								conformance: true,
								service: true,
							}),
						),
					})
				}
			}
		}
		return Buffer.from(JSON.stringify({ own, captured }, null, '\t') + '\n')
	} finally {
		await server.close()
	}
}

const template = readFileSync(TEMPLATE, 'utf8')
assert.equal(template.split(ANCHOR).length - 1, 1, 'The showcase literal anchor is not unique')
const before = await capture()
console.log('Baseline captured: ' + before.length + ' bytes')

let control
try {
	writeFileSync(TEMPLATE, template.replace(ANCHOR, PERTURBED))
	control = await capture()
} finally {
	writeFileSync(TEMPLATE, template)
}
assert.equal(control.length, before.length, 'The control must preserve the captured byte length')
assert.throws(
	() => assert.deepEqual(control, before),
	'One character changed inside the relocated showcase literal left the capture identical',
)
console.log('Control captured: ' + control.length + ' bytes; the comparison against it fails.')

const after = await capture()
assert.deepEqual(after, before)
console.log('The restored tree captures the baseline bytes; the real comparison passes.')
