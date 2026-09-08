import { Probe } from '/home/user/fleet/probe/dist/src/server/index.js'
const ROOT = '/home/user/fleet/probe/'
const id = 'diagnostic'
const test = {
	path: `tmp/probe/probe-project-${id}.test.ts`,
	text: "import { test } from 'vitest'\ntest('passes', () => {})\n",
}
const clean = { path: `src/core/probe-project-${id}.ts`, text: "export const VALUE = 'ok'\n" }
const broken = { path: `src/core/probe-project-${id}.ts`, text: "export const VALUE: number = 'bad'\n" }
const claim = {
	project: 'configs/src/tsconfig.core.json',
	case: { files: [clean], test },
	control: { files: [broken], test, stage: 'type', reason: 'the source assigns a string to a number' },
}
const probe = new Probe({ workspace: ROOT, deadline: 120_000 })
try {
	const verdict = await probe.prove(claim)
	console.log('receipt:', verdict.receipt)
	for (const phase of ['case', 'control']) {
		for (const check of verdict[phase]) {
			for (const issue of check.issues) {
				console.log(phase, check.stage, JSON.stringify(issue))
			}
		}
	}
} finally {
	await probe.destroy?.()
}
