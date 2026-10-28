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
import {
	describeFinding,
	formatDay,
	isCovered,
	listFiles,
	listFindings,
	normalizeSlashes,
	probeOf,
	readCitation,
	readMissingFlags,
	readOption,
	readThreshold,
	readUnknownFlags,
	removeEmptyDirectories,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/sweep.ts'

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

	it('refuses an unknown flag and the equals form before it sweeps or deletes anything', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-flags-' })
		try {
			scratch.ensure('.git')
			scratch.write('tmp/units/keep-brief.md', '')
			const past = Date.now() / 1000 - SWEEP_HOURS_AGO
			utimesSync(join(scratch.path, 'tmp/units/keep-brief.md'), past, past)
			for (const argv of [
				['--tmp', '--bogus'],
				['--tmp', '--older-than=5'],
				['--unit=keep', '--delete'],
				['--report', '--delete=yes'],
			]) {
				const run = runSkillScript(SWEEP_SCRIPT, argv, { cwd: scratch.path })
				expect({ argv, status: run.status }).toEqual({ argv, status: 64 })
				expect(run.stdout).toBe('')
			}
			expect(scratch.has('tmp/units/keep-brief.md')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('reports a citation of an ignored path once per line however many times the line repeats it', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-repeat-' })
		try {
			createRepository(scratch.path)
			scratch.write('.gitignore', 'tmp/\n')
			scratch.write('tmp/other/scratch.md', '')
			scratch.write(
				'.orkestrel/pkg/plan.md',
				'Read `tmp/other/scratch.md` and `tmp/other/scratch.md` again.\nRead `tmp/other/scratch.md` once more.\n',
			)
			const report = runSkillScript(SWEEP_SCRIPT, ['--report'], { cwd: scratch.path })
			expect(report.status).toBe(0)
			expect(report.stdout.match(/cites ignored path tmp\/other\/scratch\.md/gu)).toHaveLength(2)
			expect(report.stdout).toMatch(/plan\.md:1 cites ignored path/u)
			expect(report.stdout).toMatch(/plan\.md:2 cites ignored path/u)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the citation reader', () => {
	it('reads a backticked repository path, cutting a glob or placeholder and marking a directory', () => {
		expect(readCitation('tmp/other/scratch.md')).toEqual({
			path: 'tmp/other/scratch.md',
			directory: false,
			prefix: undefined,
		})
		expect(readCitation('./tmp/x/y.md')).toEqual({
			path: 'tmp/x/y.md',
			directory: false,
			prefix: undefined,
		})
		expect(readCitation('tmp/units/')).toEqual({
			path: 'tmp/units',
			directory: true,
			prefix: undefined,
		})
		expect(readCitation('tmp/units/*.ts')).toEqual({
			path: 'tmp/units',
			directory: true,
			prefix: 'tmp/units/',
		})
		expect(readCitation('tmp/units/<unit>-brief.md')).toEqual({
			path: 'tmp/units',
			directory: true,
			prefix: 'tmp/units/',
		})
	})

	it('refuses a URL, a bare name, a spaced token, a machine path, a path outside the repository, and a backslash path', () => {
		for (const token of [
			'https://example.test/a/b',
			'NO_SLASH',
			'two words/x',
			'/abs/path/x',
			'~/x/y',
			'../x/y',
			'-flag/x',
			'C:/x/y',
			'a\\b/c',
			'*/x',
			'',
		]) {
			expect({ token, citation: readCitation(token) }).toEqual({ token, citation: undefined })
		}
	})

	it('probes a directory with a trailing slash and covers a citation by a tracked path, a file beneath it, or a glob prefix', () => {
		expect(probeOf({ path: 'a/b', directory: true, prefix: undefined })).toBe('a/b/')
		expect(probeOf({ path: 'a/b.md', directory: false, prefix: undefined })).toBe('a/b.md')
		const file = { path: 'tmp/units/runner.ts', directory: false, prefix: undefined }
		const directory = { path: 'tmp/units', directory: true, prefix: undefined }
		const glob = { path: 'tmp/units/ru', directory: false, prefix: 'tmp/units/ru' }
		const tracked = ['tmp/units/runner.ts']
		expect(isCovered(file, tracked)).toBe(true)
		expect(isCovered(directory, tracked)).toBe(true)
		expect(isCovered(glob, tracked)).toBe(true)
		expect(isCovered(file, ['src/a.ts'])).toBe(false)
		expect(isCovered(directory, ['tmp/units-other/a.ts'])).toBe(false)
		expect(isCovered(file, [])).toBe(false)
	})
})

describe('the finding reader', () => {
	it('lists a machine path before the citations of its line, with each finding carrying its file and line', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-findings-' })
		try {
			const file = scratch.write(
				'n.md',
				'Opens plain.\nRead `tmp/a.md` first.\nLives at /home/someone/work and `src/x.ts`.\n',
			)
			expect(listFindings(file)).toEqual([
				{ file, line: 2, citation: { path: 'tmp/a.md', directory: false, prefix: undefined } },
				{ file, line: 3, citation: undefined },
				{ file, line: 3, citation: { path: 'src/x.ts', directory: false, prefix: undefined } },
			])
			expect(listFindings(scratch.write('empty.md', ''))).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('describes a machine path always, and an ignored citation only when git does not track it', () => {
		const citation = { path: 'tmp/a.md', directory: false, prefix: undefined }
		const ignored = new Set(['tmp/a.md'])
		expect(describeFinding({ file: 'f', line: 1, citation: undefined }, new Set(), [])).toBe(
			'names a machine path',
		)
		expect(describeFinding({ file: 'f', line: 1, citation }, ignored, [])).toBe(
			'cites ignored path tmp/a.md',
		)
		expect(describeFinding({ file: 'f', line: 1, citation }, ignored, ['tmp/a.md'])).toBeUndefined()
		expect(describeFinding({ file: 'f', line: 1, citation }, new Set(), [])).toBeUndefined()
	})
})

describe('the threshold and the directory sweep', () => {
	it('reads the threshold in minutes and refuses a value that is not a positive number', () => {
		expect(readThreshold([])).toBe(60)
		expect(readThreshold(['--older-than', '5'])).toBe(5)
		expect(readThreshold(['--older-than', '0.5'])).toBe(0.5)
		for (const value of ['abc', '0', '-5', 'Infinity']) {
			expect({ value, minutes: readThreshold(['--older-than', value]) }).toEqual({
				value,
				minutes: undefined,
			})
		}
		expect(readThreshold(['--older-than'])).toBeUndefined()
	})

	it('formats a modification time as its UTC day', () => {
		expect(formatDay(Date.UTC(2026, 0, 2, 23, 59))).toBe('2026-01-02')
		expect(formatDay(0)).toBe('1970-01-01')
	})

	it('removes every emptied directory beneath a root, keeps one that holds a file, and keeps the root', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-empty-' })
		try {
			scratch.ensure('a/b/c')
			scratch.write('a/keep/f.txt', 'x')
			scratch.ensure('z')
			removeEmptyDirectories(scratch.path)
			expect(scratch.has('a/b')).toBe(false)
			expect(scratch.has('a/b/c')).toBe(false)
			expect(scratch.has('z')).toBe(false)
			expect(scratch.has('a/keep/f.txt')).toBe(true)
			expect(existsSync(scratch.path)).toBe(true)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the argument readers', () => {
	it('reads a flag value and treats a following flag as a missing value, keeping the first occurrence', () => {
		const argv = ['--unit', 'demo', '--older-than']
		expect(readOption(argv, '--unit')).toBe('demo')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--unit', '--delete'], '--unit')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readMissingFlags(argv, ['--unit', '--older-than'])).toEqual(['--older-than'])
		expect(readMissingFlags(['--unit', 'a'], ['--older-than'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(['--unit=demo', '--delete', '--bogus'], ['--unit', '--delete']),
		).toEqual(['--unit=demo', '--bogus'])
		expect(readUnknownFlags(['--unit', 'a', '--', '--watch'], ['--unit'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})

describe('the tree walk', () => {
	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-sweep-walk-' })
		try {
			scratch.write('src/a.ts', '')
			scratch.write('src/deep/b.ts', '')
			scratch.write('src/dist/c.ts', '')
			scratch.write('node_modules/pkg/index.js', '')
			scratch.write('tmp/probe.ts', '')
			const root = normalizeSlashes(scratch.path)
			const paths = listFiles(scratch.path).map((file) => file.path.slice(root.length + 1))
			expect(paths.every((path) => !path.includes('\\'))).toBe(true)
			expect(paths.sort()).toEqual(['src/a.ts', 'src/deep/b.ts'])
			expect(listFiles(scratch.path, new Set()).length).toBe(5)
			expect(listFiles(scratch.path).every((file) => typeof file.modified === 'number')).toBe(true)
			expect(() => listFiles(`${scratch.path}/absent`)).toThrow(/ENOENT/u)
			expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		} finally {
			scratch.destroy()
		}
	})
})
