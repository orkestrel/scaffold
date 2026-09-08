import { Probe } from '/home/user/fleet/probe/dist/src/server/index.js'
const ROOT = '/home/user/fleet/probe/'
const TEST = "import { expect, test } from 'vitest'\nimport { createGreeting } from '../../src/core/factories.js'\ntest('greets', () => expect(createGreeting()).toBe('hi'))\n"
const CLAIM = {
	project: 'configs/src/tsconfig.core.json',
	case: {
		files: [{ path: 'src/core/factories.ts', text: "export function createGreeting(): string {\n\treturn 'hi'\n}\n" }],
		test: { path: 'tmp/probe/greeting.test.ts', text: TEST },
	},
	control: {
		files: [{ path: 'src/core/factories.ts', text: "export function createGreeting(): number {\n\treturn 'hi'\n}\n" }],
		test: { path: 'tmp/probe/greeting.test.ts', text: TEST },
		stage: 'type',
		reason: 'a string returned as a number must not compile',
	},
}
const probe = new Probe({ workspace: ROOT, deadline: 120_000 })
const t0 = Date.now()
try {
	const verdict = await probe.prove(CLAIM)
	console.log(JSON.stringify(verdict, null, 2))
	console.log('elapsed', Date.now() - t0)
} finally {
	await probe.destroy?.()
}
