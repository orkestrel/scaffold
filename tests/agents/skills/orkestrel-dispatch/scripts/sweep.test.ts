import { existsSync, utimesSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/sweep.ts'
const HOURS_AGO = 3 * 60 * 60
const MINUTES_AGO = 10 * 60

describe('sweep.ts', () => {
	it('reports leftovers by directory and ecosystem file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-report-' })
		try {
			expect(runSkillScript(SCRIPT, ['--report'], { cwd: scratch.path }).status).toBe(64)
			scratch.ensure('.git')
			scratch.write('tmp/units/old-brief.md', '')
			scratch.write('tmp/units/fresh-report.md', '')
			scratch.write('.orkestrel/pkg/plan.md', '')
			scratch.write('.orkestrel/release.md', '')
			const report = runSkillScript(SCRIPT, ['--report'], { cwd: scratch.path })
			expect(report.status).toBe(0)
			expect(report.stdout).toContain('tmp/units holds 2 file(s)')
			expect(report.stdout).toMatch(/\.orkestrel[\\/]pkg holds 1 file\(s\)/u)
			expect(report.stdout).toContain('.orkestrel holds 1 ecosystem file(s): release.md')
		} finally {
			scratch.destroy()
		}
	})

	it('lists and deletes one unit, deletes stale launch files only, and removes emptied nested directories', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-' })
		try {
			scratch.ensure('.git')
			const old = scratch.write('tmp/units/old-brief.md', '')
			const oldJournal = scratch.write('tmp/cursor/nested/old.jsonl', '')
			const fresh = scratch.write('tmp/units/fresh-report.md', '')
			const past = Date.now() / 1000 - HOURS_AGO
			utimesSync(old, past, past)
			utimesSync(oldJournal, past, past)
			const listed = runSkillScript(SCRIPT, ['--unit', 'old'], { cwd: scratch.path })
			expect(listed.status).toBe(0)
			expect(listed.stdout).toContain('2 file(s) for old')
			expect(scratch.has('tmp/units/old-brief.md')).toBe(true)
			expect(runSkillScript(SCRIPT, ['--tmp'], { cwd: scratch.path }).status).toBe(2)
			const settled = Date.now() / 1000 - MINUTES_AGO
			utimesSync(fresh, settled, settled)
			const swept = runSkillScript(SCRIPT, ['--tmp', '--older-than', '60'], { cwd: scratch.path })
			expect(swept.status).toBe(0)
			expect(scratch.has('tmp/units/old-brief.md')).toBe(false)
			expect(scratch.has('tmp/cursor/nested/old.jsonl')).toBe(false)
			expect(existsSync(join(scratch.path, 'tmp/cursor/nested'))).toBe(false)
			expect(scratch.has('tmp/units/fresh-report.md')).toBe(true)
			const deleted = runSkillScript(SCRIPT, ['--unit', 'fresh', '--delete'], { cwd: scratch.path })
			expect(deleted.status).toBe(0)
			expect(scratch.has('tmp/units/fresh-report.md')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('lists and deletes the pid file launch.ts writes beside a unit journal, and sweeps a stale one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-pid-' })
		try {
			scratch.ensure('.git')
			const pid = scratch.write('tmp/codex/UNIT.jsonl.pid', '4242\n')
			const stale = scratch.write('tmp/claude/OLD.jsonl.pid', '4343\n')
			const settled = Date.now() / 1000 - MINUTES_AGO
			utimesSync(pid, settled, settled)
			const past = Date.now() / 1000 - HOURS_AGO
			utimesSync(stale, past, past)
			const listed = runSkillScript(SCRIPT, ['--unit', 'UNIT'], { cwd: scratch.path })
			expect(listed.status).toBe(0)
			expect(listed.stdout).toContain('1 file(s) for UNIT')
			expect(listed.stdout).toContain('UNIT.jsonl.pid')
			const deleted = runSkillScript(SCRIPT, ['--unit', 'UNIT', '--delete'], { cwd: scratch.path })
			expect(deleted.status).toBe(0)
			expect(scratch.has('tmp/codex/UNIT.jsonl.pid')).toBe(false)
			expect(scratch.has('tmp/claude/OLD.jsonl.pid')).toBe(true)
			const swept = runSkillScript(SCRIPT, ['--tmp', '--older-than', '60'], { cwd: scratch.path })
			expect(swept.status).toBe(0)
			expect(scratch.has('tmp/claude/OLD.jsonl.pid')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a unit that opens with a hyphen, a missing unit, a threshold that is not a positive number, and two modes', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-usage-' })
		try {
			scratch.ensure('.git')
			scratch.write('tmp/units/keep-brief.md', '')
			expect(runSkillScript(SCRIPT, ['--unit'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--unit', '--delete'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--tmp', '--older-than', 'abc'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--tmp', '--older-than', '-5'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, ['--elsewhere'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--tmp', '--unit', 'keep'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, ['--tmp', '--older-than'], { cwd: scratch.path }).status).toBe(
				64,
			)
			expect(
				runSkillScript(SCRIPT, ['--report', '--unit', 'keep'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(scratch.has('tmp/units/keep-brief.md')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})
})
