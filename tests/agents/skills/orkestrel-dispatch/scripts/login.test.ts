import { describe, expect, it } from 'vitest'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/login.ts'

describe('login.ts', () => {
	it('refuses a call that names no bench, two benches, or a cap with no value', () => {
		expect(runSkillScript(SCRIPT, []).status).toBe(64)
		expect(runSkillScript(SCRIPT, ['--codex', '--claude']).status).toBe(64)
		expect(runSkillScript(SCRIPT, ['--codex', '--cap']).status).toBe(64)
	})

	it('reports a Claude CLI that cannot start as dark with the reason', () => {
		const run = runSkillScript(SCRIPT, ['--claude'], { env: { PATH: '', Path: '' } })
		expect(run.status).toBe(3)
		expect(run.json).toMatchObject({ bench: 'claude', live: false })
		expect(typeof run.json?.status).toBe('string')
		expect(String(run.json?.status)).not.toContain('undefined')
	})
})
