import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-publish/scripts/pins.ts'

describe('pins.ts', () => {
	it('bounds a version literal by digits and dots and a range literal by range operators too', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-' })
		try {
			scratch.write(
				'src/a.ts',
				['"~0.0.7"', '"0.0.770"', '"^0.0.16"', '"^0.0.160"', '"~0.0.16"', '"0.0.7"'].join('\n'),
			)
			scratch.write('tests/b.ts', '// nothing\n')
			const run = runSkillScript(SCRIPT, ['--version', '0.0.7', '--range', '^0.0.16', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits.map((hit) => (isRecord(hit) ? hit.line : undefined))).toEqual([1, 3, 6])
			expect(run.json?.skipped).toEqual([])
			const text = runSkillScript(SCRIPT, ['--version', '0.0.7', '--paths', 'src'], {
				cwd: scratch.path,
			})
			expect(text.status).toBe(3)
			expect(text.stdout).toContain('pins: 2 hit(s) for 0.0.7 under src')
			expect(runSkillScript(SCRIPT, ['--version', '9.9.9'], { cwd: scratch.path }).status).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('names a requested path that is not a directory and refuses a call with no literal or a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-usage-' })
		try {
			scratch.write('src/a.ts', '"0.0.7"\n')
			const skipped = runSkillScript(
				SCRIPT,
				['--version', '0.0.7', '--paths', 'src,nowhere', '--json'],
				{ cwd: scratch.path },
			)
			expect(skipped.status).toBe(3)
			expect(skipped.json?.skipped).toEqual(['nowhere'])
			expect(skipped.stderr).toContain('nowhere is not a directory; skipped')
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--version'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--range', '--json'], { cwd: scratch.path }).status).toBe(64)
		} finally {
			scratch.destroy()
		}
	})
})
