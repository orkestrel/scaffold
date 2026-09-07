import { Probe } from '/home/user/fleet/probe/dist/src/server/index.js'
const ROOT = '/home/user/fleet/probe/'
const CLAIM = {
	project: 'configs/src/tsconfig.core.json',
	case: { files: [{ path: 'src/core/greeting.ts', text: "export const GREETING = 'hi'\n" }], test: { path: 'tmp/probe/greeting.test.ts', text: "import { expect, test } from 'vitest'\nimport { GREETING } from '../../src/core/greeting.js'\ntest('greets', () => expect(GREETING).toBe('hi'))\n" } },
	control: { files: [{ path: 'src/core/greeting.ts', text: "export const GREETING: number = 'hi'\n" }], test: { path: 'tmp/probe/greeting.test.ts', text: "import { expect, test } from 'vitest'\nimport { GREETING } from '../../src/core/greeting.js'\ntest('greets', () => expect(GREETING).toBe('hi'))\n" }, stage: 'type', reason: 'a string literal assigned to a number must not compile' },
}
const probe = new Probe({ workspace: ROOT, deadline: 120_000 })
const t0 = Date.now()
try { const verdict = await probe.prove(CLAIM); console.log(JSON.stringify(verdict, null, 2)); console.log('elapsed', Date.now() - t0) }
finally { await probe.destroy?.() }
