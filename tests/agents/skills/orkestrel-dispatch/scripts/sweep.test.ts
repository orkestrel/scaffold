import { existsSync, utimesSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	createRepository,
	runSkillScript,
	SWEEP_HOURS_AGO,
	SWEEP_MINUTES_AGO,
	SWEEP_SCRIPT,
	trackFiles,
} from '../../../../setupServer.js'

describe('sweep.ts', () => {
	it('reports leftovers by directory and ecosystem file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-report-' })
		try {
			expect(runSkillScript(SWEEP_SCRIPT, ['--report'], { cwd: scratch.path }).status).toBe(64)
			scratch.ensure('.git')
			scratch.write('tmp/units/old-brief.md', '')
			scratch.write('tmp/units/fresh-report.md', '')
			scratch.write('.orkestrel/pkg/plan.md', '')
			scratch.write('.orkestrel/release.md', '')
			const report = runSkillScript(SWEEP_SCRIPT, ['--report'], { cwd: scratch.path })
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
			const past = Date.now() / 1000 - SWEEP_HOURS_AGO
			utimesSync(old, past, past)
			utimesSync(oldJournal, past, past)
			const listed = runSkillScript(SWEEP_SCRIPT, ['--unit', 'old'], { cwd: scratch.path })
			expect(listed.status).toBe(0)
			expect(listed.stdout).toContain('2 file(s) for old')
			expect(scratch.has('tmp/units/old-brief.md')).toBe(true)
			expect(runSkillScript(SWEEP_SCRIPT, ['--tmp'], { cwd: scratch.path }).status).toBe(2)
			const settled = Date.now() / 1000 - SWEEP_MINUTES_AGO
			utimesSync(fresh, settled, settled)
			const swept = runSkillScript(SWEEP_SCRIPT, ['--tmp', '--older-than', '60'], {
				cwd: scratch.path,
			})
			expect(swept.status).toBe(0)
			expect(scratch.has('tmp/units/old-brief.md')).toBe(false)
			expect(scratch.has('tmp/cursor/nested/old.jsonl')).toBe(false)
			expect(existsSync(join(scratch.path, 'tmp/cursor/nested'))).toBe(false)
			expect(scratch.has('tmp/units/fresh-report.md')).toBe(true)
			const deleted = runSkillScript(SWEEP_SCRIPT, ['--unit', 'fresh', '--delete'], {
				cwd: scratch.path,
			})
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
			const settled = Date.now() / 1000 - SWEEP_MINUTES_AGO
			utimesSync(pid, settled, settled)
			const past = Date.now() / 1000 - SWEEP_HOURS_AGO
			utimesSync(stale, past, past)
			const listed = runSkillScript(SWEEP_SCRIPT, ['--unit', 'UNIT'], { cwd: scratch.path })
			expect(listed.status).toBe(0)
			expect(listed.stdout).toContain('1 file(s) for UNIT')
			expect(listed.stdout).toContain('UNIT.jsonl.pid')
			const deleted = runSkillScript(SWEEP_SCRIPT, ['--unit', 'UNIT', '--delete'], {
				cwd: scratch.path,
			})
			expect(deleted.status).toBe(0)
			expect(scratch.has('tmp/codex/UNIT.jsonl.pid')).toBe(false)
			expect(scratch.has('tmp/claude/OLD.jsonl.pid')).toBe(true)
			const swept = runSkillScript(SWEEP_SCRIPT, ['--tmp', '--older-than', '60'], {
				cwd: scratch.path,
			})
			expect(swept.status).toBe(0)
			expect(scratch.has('tmp/claude/OLD.jsonl.pid')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('keeps an old tracked launch file and deletes an old untracked one beside it', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-tracked-tmp-' })
		try {
			createRepository(scratch.path)
			const tracked = scratch.write('tmp/units/runner.ts', '')
			trackFiles(scratch.path)
			const untracked = scratch.write('tmp/units/old-brief.md', '')
			const past = Date.now() / 1000 - SWEEP_HOURS_AGO
			utimesSync(tracked, past, past)
			utimesSync(untracked, past, past)
			const swept = runSkillScript(SWEEP_SCRIPT, ['--tmp'], { cwd: scratch.path })
			expect(swept.status).toBe(0)
			expect(swept.stdout).toContain('sweep: kept tracked tmp/units/runner.ts')
			expect(swept.stdout).toContain('sweep: deleted tmp/units/old-brief.md')
			expect(scratch.has('tmp/units/runner.ts')).toBe(true)
			expect(scratch.has('tmp/units/old-brief.md')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('lists a tracked unit file as tracked and keeps it on --delete while deleting an untracked one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-tracked-unit-' })
		try {
			createRepository(scratch.path)
			scratch.write('tmp/units/UNIT-runner.ts', '')
			trackFiles(scratch.path)
			const untracked = scratch.write('tmp/units/UNIT-brief.md', '')
			const past = Date.now() / 1000 - SWEEP_HOURS_AGO
			utimesSync(untracked, past, past)
			const listed = runSkillScript(SWEEP_SCRIPT, ['--unit', 'UNIT'], { cwd: scratch.path })
			expect(listed.status).toBe(0)
			expect(listed.stdout).toContain('sweep: found tmp/units/UNIT-runner.ts (tracked)')
			expect(listed.stdout).toContain('sweep: found tmp/units/UNIT-brief.md\n')
			const deleted = runSkillScript(SWEEP_SCRIPT, ['--unit', 'UNIT', '--delete'], {
				cwd: scratch.path,
			})
			expect(deleted.status).toBe(0)
			expect(deleted.stdout).toContain('sweep: kept tracked tmp/units/UNIT-runner.ts')
			expect(deleted.stdout).toContain('sweep: deleted tmp/units/UNIT-brief.md')
			expect(scratch.has('tmp/units/UNIT-runner.ts')).toBe(true)
			expect(scratch.has('tmp/units/UNIT-brief.md')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reports a backticked citation of an ignored untracked path and stays silent for a tracked, URL, or tracked-prefix citation', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-cites-' })
		try {
			createRepository(scratch.path)
			scratch.write('tmp/units/runner.ts', '')
			trackFiles(scratch.path)
			scratch.write('.gitignore', 'tmp/\n')
			scratch.write('tmp/other/scratch.md', '')
			scratch.write(
				'.orkestrel/pkg/plan.md',
				[
					'Opens with a plain line.',
					'Read `tmp/other/scratch.md` first.',
					'Run `tmp/units/runner.ts` after it.',
					'See `https://example.com/tmp/other/scratch.md` for it.',
					'Glob `tmp/units/*.ts` and `tmp/units/<unit>-brief.md`.',
					'Cite `src/index.ts` and `NO_SLASH` too.',
					'',
				].join('\n'),
			)
			const report = runSkillScript(SWEEP_SCRIPT, ['--report'], { cwd: scratch.path })
			expect(report.status).toBe(0)
			expect(report.stdout).toMatch(
				/sweep: \.orkestrel[\\/]pkg[\\/]plan\.md:2 cites ignored path tmp\/other\/scratch\.md\n/u,
			)
			expect(report.stdout.match(/cites ignored path/gu)).toHaveLength(1)
			expect(report.stdout).not.toContain('names a machine path')
		} finally {
			scratch.destroy()
		}
	})

	it('reports a drive-letter path and a home path as machine paths, once per line', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-machine-' })
		try {
			createRepository(scratch.path)
			scratch.write(
				'.orkestrel/ledger.md',
				[
					'Opens with a plain line.',
					'Lives at C:\\Users\\someone\\work and `D:/work/repo`.',
					'Lives at /home/someone/work.',
					'Lives at https://example.com/home/someone and src/home/someone.',
					'',
				].join('\n'),
			)
			const report = runSkillScript(SWEEP_SCRIPT, ['--report'], { cwd: scratch.path })
			expect(report.status).toBe(0)
			expect(report.stdout).toMatch(/ledger\.md:2 names a machine path\n/u)
			expect(report.stdout).toMatch(/ledger\.md:3 names a machine path\n/u)
			expect(report.stdout.match(/names a machine path/gu)).toHaveLength(2)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a unit that opens with a hyphen, a missing unit, a threshold that is not a positive number, and two modes', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-usage-' })
		try {
			scratch.ensure('.git')
			scratch.write('tmp/units/keep-brief.md', '')
			expect(runSkillScript(SWEEP_SCRIPT, ['--unit'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SWEEP_SCRIPT, ['--unit', '--delete'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SWEEP_SCRIPT, ['--tmp', '--older-than', 'abc'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(SWEEP_SCRIPT, ['--tmp', '--older-than', '-5'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(SWEEP_SCRIPT, ['--elsewhere'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SWEEP_SCRIPT, ['--tmp', '--unit', 'keep'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SWEEP_SCRIPT, ['--tmp', '--older-than'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SWEEP_SCRIPT, ['--report', '--unit', 'keep'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(scratch.has('tmp/units/keep-brief.md')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})
})
