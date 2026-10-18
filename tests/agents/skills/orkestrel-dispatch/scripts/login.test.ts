import { describe, expect, it } from 'vitest'
import { runSkillScript, LOGIN_SCRIPT } from '../../../../setupServer.js'

describe('login.ts', () => {
	it('refuses a call that names no bench, two benches, or a cap with no value', () => {
		expect(runSkillScript(LOGIN_SCRIPT, []).status).toBe(64)
		expect(runSkillScript(LOGIN_SCRIPT, ['--codex', '--claude']).status).toBe(64)
		expect(runSkillScript(LOGIN_SCRIPT, ['--codex', '--cap']).status).toBe(64)
	})

	it('reports a Claude CLI that cannot start as dark with the reason', () => {
		const run = runSkillScript(LOGIN_SCRIPT, ['--claude'], { env: { PATH: '', Path: '' } })
		expect(run.status).toBe(3)
		expect(run.json).toMatchObject({ bench: 'claude', live: false })
		expect(typeof run.json?.status).toBe('string')
		expect(String(run.json?.status)).not.toContain('undefined')
	})
})
