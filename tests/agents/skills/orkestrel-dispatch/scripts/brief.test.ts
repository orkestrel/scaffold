import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/brief.ts'

describe('brief.ts', () => {
	it('writes a brief from the template and numbers a successor instead of overwriting', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-' })
		try {
			const first = runSkillScript(
				SCRIPT,
				['--unit', 'demo', '--lane', 'units', '--subject', 'a subject'],
				{ cwd: scratch.path },
			)
			expect(first.status).toBe(0)
			expect(scratch.read('tmp/units/demo-brief.md')).toContain('# Unit demo — a subject')
			expect(scratch.read('tmp/units/demo-brief.md')).not.toContain('UNIT_ID')
			const second = runSkillScript(SCRIPT, ['--unit', 'demo', '--lane', 'units'], {
				cwd: scratch.path,
			})
			expect(second.status).toBe(0)
			expect(scratch.has('tmp/units/demo-brief-2.md')).toBe(true)
			expect(scratch.read('tmp/units/demo-brief.md')).toContain('a subject')
			const bench = runSkillScript(SCRIPT, ['--unit', 'lane', '--lane', 'codex'], {
				cwd: scratch.path,
			})
			expect(bench.status).toBe(0)
			expect(scratch.has('tmp/codex/lane-brief.md')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('checks the slash-bearing paths a brief names, reading a backslash as a slash and stripping a line suffix', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-check-' })
		try {
			scratch.write('src/present.ts', '')
			scratch.write('src/other.ts', '')
			scratch.write(
				'b.md',
				'Read `src/present.ts:3`, `src\\other.ts`, and `src/missing.ts:12–14`, not `https://example.test/a/b`, `tmp/<lane>/x.md`, `OWNED_FILES/x`, or `README.md`.\n',
			)
			const check = runSkillScript(SCRIPT, ['--check', 'b.md'], { cwd: scratch.path })
			expect(check.status).toBe(3)
			expect(check.json).toMatchObject({ checked: 3, missing: ['src/missing.ts'] })
			scratch.write('src/missing.ts', '')
			expect(runSkillScript(SCRIPT, ['--check', 'b.md'], { cwd: scratch.path }).status).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown lane, a malformed unit, a directory as the check target, a flag with no value, and two modes', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-usage-' })
		try {
			scratch.ensure('adir')
			expect(
				runSkillScript(SCRIPT, ['--unit', 'demo', '--lane', 'moon'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--unit', 'no/slash', '--lane', 'units'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, ['--check', 'adir'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--check', 'absent.md'], { cwd: scratch.path }).status).toBe(
				64,
			)
			expect(
				runSkillScript(SCRIPT, ['--unit', '--lane', 'units'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--check', 'absent.md', '--unit', 'demo', '--lane', 'units'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})
