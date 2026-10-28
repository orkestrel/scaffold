import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	BENCH_SCRIPT,
	CASES_SCRIPT,
	MEASURE_SCRIPT,
	MUTATE_SCRIPT,
	PATCH_SCRIPT,
	readSkillScripts,
	runSkillScript,
} from '../setupServer.js'

describe('skill scripts', () => {
	it('lists the scripts of every skill that carries them', () => {
		const scripts = readSkillScripts()
		for (const script of [
			BENCH_SCRIPT,
			CASES_SCRIPT,
			MEASURE_SCRIPT,
			MUTATE_SCRIPT,
			PATCH_SCRIPT,
		]) {
			expect(scripts).toContain(script)
		}
		expect(
			scripts.every((script) => /^\.agents\/skills\/[^/]+\/scripts\/[^/]+\.ts$/u.test(script)),
		).toBe(true)
	})

	for (const script of readSkillScripts()) {
		it(`${script} refuses an unknown flag and the --flag=value form with exit 64, naming the flag`, () => {
			const scratch = createScratch({ prefix: 'orkestrel-script-flags-' })
			try {
				const cwd = { cwd: scratch.path }
				const unknown = runSkillScript(script, ['--no-such-flag'], cwd)
				expect(unknown.status).toBe(64)
				expect(unknown.stderr).toContain('--no-such-flag')
				const joined = runSkillScript(script, ['--json=1'], cwd)
				expect(joined.status).toBe(64)
				expect(joined.stderr).toContain('--json=1')
			} finally {
				scratch.destroy()
			}
		})
	}
})
