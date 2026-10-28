import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	CASES_ROWS,
	CASES_SCRIPT,
	renderCasesReport,
	renderUncollectedReport,
	runSkillScript,
} from '../../../../setupServer.js'
import {
	countStatus,
	describeFile,
	isUnsuccessful,
	judgeCases,
	judgeFailures,
	matchesCase,
	readCase,
	readCases,
	readFailedFiles,
	readMissingFlags,
	readOptions,
	readPositionals,
	readUnknownFlags,
	relativeFile,
} from '../../../../../.agents/skills/orkestrel-parallel/scripts/cases.ts'

describe('cases.ts', () => {
	it('reads a case from its title, status, and full name, building the full name from its ancestors', () => {
		expect(
			readCase('f.ts', {
				title: 't',
				status: 'passed',
				ancestorTitles: ['a', 'b'],
				fullName: 'a b t',
			}),
		).toStrictEqual([{ file: 'f.ts', title: 't', status: 'passed', fullName: 'a b t' }])
		expect(
			readCase('f.ts', { title: 't', status: 'failed', ancestorTitles: ['a', 7] }),
		).toStrictEqual([{ file: 'f.ts', title: 't', status: 'failed', fullName: 'a t' }])
		expect(readCase('f.ts', { title: 't' })).toStrictEqual([])
		expect(readCase('f.ts', 'text')).toStrictEqual([])
	})

	it('reads every case of a report in file order and refuses a value that is not a report', () => {
		const cases = readCases(JSON.parse(renderCasesReport('/root', CASES_ROWS)))
		expect(cases?.map((entry) => entry.fullName)).toStrictEqual([
			'alpha holds',
			'alpha breaks',
			'beta inner holds',
			'later',
		])
		expect(readCases({ testResults: [] })).toStrictEqual([])
		expect(readCases({ testResults: [{ name: 'f.ts' }, 3] })).toStrictEqual([])
		expect(readCases({})).toBeUndefined()
		expect(readCases([])).toBeUndefined()
		expect(readCases({ testResults: 'x' })).toBeUndefined()
	})

	it('matches a name to a full name or a title exactly, and counts by status', () => {
		const entry = { file: 'f', title: 'holds', status: 'passed', fullName: 'alpha holds' }
		expect(matchesCase(entry, 'holds')).toBe(true)
		expect(matchesCase(entry, 'alpha holds')).toBe(true)
		expect(matchesCase(entry, 'alpha')).toBe(false)
		expect(matchesCase(entry, 'hold')).toBe(false)
		expect(countStatus([entry, { ...entry, status: 'failed' }, entry], 'passed')).toBe(2)
		expect(countStatus([], 'passed')).toBe(0)
	})

	it('judges named cases: missing, wrong status, a title shared by two files, and an unnamed failure', () => {
		const cases = readCases(JSON.parse(renderCasesReport('/root', CASES_ROWS))) ?? []
		expect(judgeCases(cases, ['alpha holds'], ['breaks'], '/root')).toStrictEqual([])
		expect(judgeCases(cases, ['nothing'], [], '/root')).toStrictEqual([
			'missing: "nothing" matches no case',
			'unnamed failure: "alpha breaks" in tests/a.test.ts',
		])
		expect(judgeCases(cases, ['alpha holds', 'breaks'], [], '/root')).toStrictEqual([
			'status: "alpha breaks" is failed, expected passed in tests/a.test.ts',
		])
		expect(judgeCases(cases, ['alpha holds'], [], '/root')).toStrictEqual([
			'unnamed failure: "alpha breaks" in tests/a.test.ts',
		])
		expect(judgeCases(cases, [], ['holds', 'breaks'], '/root')).toStrictEqual([
			'status: "alpha holds" is passed, expected failed in tests/a.test.ts',
			'status: "beta inner holds" is passed, expected failed in tests/b.test.ts',
		])
		expect(judgeCases(cases, ['later'], ['breaks'], '/root')).toStrictEqual([
			'status: "later" is pending, expected passed in tests/b.test.ts',
		])
		expect(judgeCases([], [], [], '/root')).toStrictEqual([])
	})

	it('reads flags, repeated values, positionals, and missing values at every occurrence', () => {
		expect(
			readOptions(['--passed', 'a', '--failed', 'b', '--passed', 'c'], '--passed'),
		).toStrictEqual(['a', 'c'])
		expect(readMissingFlags(['--passed', 'a', '--passed'], ['--passed'])).toStrictEqual([
			'--passed',
		])
		expect(readMissingFlags(['--failed', '--passed', 'a'], ['--passed', '--failed'])).toStrictEqual(
			['--failed'],
		)
		expect(readPositionals(['--report', 'r.json', 'extra'], ['--report'])).toStrictEqual(['extra'])
		expect(readUnknownFlags(['--report', 'r', '--x=1', '--', '--y'], ['--report'])).toStrictEqual([
			'--x=1',
		])
		expect(describeFile('/root', '')).toBe('')
	})

	it('prints the summary and ok when the report matches, and exits 0', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cases-ok-' })
		try {
			scratch.write('report.json', renderCasesReport(scratch.path, CASES_ROWS))
			const run = runSkillScript(
				CASES_SCRIPT,
				[
					'--report',
					'report.json',
					'--passed',
					'alpha holds',
					'--passed',
					'beta inner holds',
					'--failed',
					'breaks',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(run.stdout.split(/\r\n|\n/u).filter((line) => line !== '')).toStrictEqual([
				'cases total=4 passed=2 failed=1 other=1',
				'ok',
			])
		} finally {
			scratch.destroy()
		}
	})

	it('prints each difference and exits 3 for a missing name, a wrong status, and an unnamed failure', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cases-diff-' })
		try {
			scratch.write('report.json', renderCasesReport(scratch.path, CASES_ROWS))
			const run = runSkillScript(
				CASES_SCRIPT,
				['--report', 'report.json', '--passed', 'renamed', '--failed', 'holds'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(3)
			expect(run.stdout).toContain('missing: "renamed" matches no case')
			expect(run.stdout).toContain(
				'status: "alpha holds" is passed, expected failed in tests/a.test.ts',
			)
			expect(run.stdout).toContain('unnamed failure: "alpha breaks" in tests/a.test.ts')
			expect(run.stdout).toContain('differences=4')
			const unnamed = runSkillScript(CASES_SCRIPT, ['--report', 'report.json'], {
				cwd: scratch.path,
			})
			expect(unnamed.status).toBe(3)
			expect(unnamed.stdout).toContain('differences=1')
		} finally {
			scratch.destroy()
		}
	})

	it('exits 0 for a report with no failure when no case is named', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cases-green-' })
		try {
			scratch.write(
				'report.json',
				renderCasesReport(
					scratch.path,
					CASES_ROWS.filter((row) => row.status !== 'failed'),
				),
			)
			const run = runSkillScript(CASES_SCRIPT, ['--report', 'report.json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.stdout).toContain('failed=0')
		} finally {
			scratch.destroy()
		}
	})

	it('exits 2 when the report is missing, is not JSON, or is not a Vitest report', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cases-unreadable-' })
		try {
			scratch.write('text.json', 'not json')
			scratch.write('other.json', '{"results":[]}')
			const cwd = { cwd: scratch.path }
			const gone = runSkillScript(CASES_SCRIPT, ['--report', 'gone.json'], cwd)
			expect(gone.status).toBe(2)
			expect(gone.stderr).toContain('"gone.json"')
			expect(runSkillScript(CASES_SCRIPT, ['--report', 'text.json'], cwd).status).toBe(2)
			const other = runSkillScript(CASES_SCRIPT, ['--report', 'other.json'], cwd)
			expect(other.status).toBe(2)
			expect(other.stderr).toContain('"testResults" array')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses no report, a name given to both flags, an unknown flag, the --flag=value form, and a bare flag with exit 64', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cases-usage-' })
		try {
			scratch.write('report.json', renderCasesReport(scratch.path, CASES_ROWS))
			const cwd = { cwd: scratch.path }
			expect(runSkillScript(CASES_SCRIPT, [], cwd).status).toBe(64)
			expect(runSkillScript(CASES_SCRIPT, ['--passed', 'a'], cwd).status).toBe(64)
			expect(runSkillScript(CASES_SCRIPT, ['--report', 'report.json', 'extra'], cwd).status).toBe(
				64,
			)
			const both = runSkillScript(
				CASES_SCRIPT,
				['--report', 'report.json', '--passed', 'a', '--failed', 'a'],
				cwd,
			)
			expect(both.status).toBe(64)
			expect(both.stderr).toContain('"a" given to both')
			const unknown = runSkillScript(
				CASES_SCRIPT,
				['--report', 'report.json', '--no-such-flag'],
				cwd,
			)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--no-such-flag')
			const joined = runSkillScript(CASES_SCRIPT, ['--report=report.json'], cwd)
			expect(joined.status).toBe(64)
			expect(joined.stderr).toContain('--report=report.json')
			const bare = runSkillScript(CASES_SCRIPT, ['--report', 'report.json', '--passed'], cwd)
			expect(bare.status).toBe(64)
			expect(bare.stderr).toContain('--passed given with no value')
			const missingBesideUnknown = runSkillScript(CASES_SCRIPT, ['--report', '--no-such-flag'], cwd)
			expect(missingBesideUnknown.status).toBe(64)
			expect(missingBesideUnknown.stderr).toContain('--no-such-flag')
		} finally {
			scratch.destroy()
		}
	})

	it('reads the test files that failed with no failed case, and whether the report says the run failed', () => {
		const root = join('root', 'dir')
		expect(readFailedFiles(JSON.parse(renderUncollectedReport(root)))).toStrictEqual([
			join(root, 'tests/x.test.ts'),
		])
		expect(readFailedFiles(JSON.parse(renderCasesReport(root, CASES_ROWS)))).toStrictEqual([])
		expect(
			readFailedFiles({
				testResults: [
					{ name: 'a', status: 'failed', assertionResults: [{ title: 't', status: 'failed' }] },
					{ name: 'b', status: 'failed', assertionResults: [{ title: 't', status: 'passed' }] },
					{ name: 'c', status: 'failed' },
					{ status: 'failed', assertionResults: [] },
					{ name: 'd', status: 'passed', assertionResults: [] },
					'text',
				],
			}),
		).toStrictEqual(['b', 'c', ''])
		expect(readFailedFiles({})).toStrictEqual([])
		expect(readFailedFiles([])).toStrictEqual([])
		expect(isUnsuccessful({ success: false })).toBe(true)
		expect(isUnsuccessful({ success: true })).toBe(false)
		expect(isUnsuccessful({})).toBe(false)
		expect(isUnsuccessful(null)).toBe(false)
		expect(relativeFile('/root', '/root/tests/a.test.ts')).toBe('tests/a.test.ts')
	})

	it('judges a failed file as an unnamed failure, and a report that failed with nothing named as one', () => {
		const cases = readCases(JSON.parse(renderCasesReport('/root', CASES_ROWS))) ?? []
		const passing = cases.filter((entry) => entry.status !== 'failed')
		expect(judgeFailures(passing, [join('/root', 'tests/x.test.ts')], true, '/root')).toStrictEqual(
			['unnamed failure: "tests/x.test.ts" failed with no failed case'],
		)
		expect(judgeFailures(passing, [''], false, '/root')).toStrictEqual([
			'unnamed failure: a test file failed with no failed case',
		])
		expect(judgeFailures(passing, [], true, '/root')).toStrictEqual([
			'unnamed failure: the report is not successful, yet no case and no file in it failed',
		])
		expect(judgeFailures(cases, [], true, '/root')).toStrictEqual([])
		expect(judgeFailures(passing, [], false, '/root')).toStrictEqual([])
		expect(judgeFailures([], [], false, '/root')).toStrictEqual([])
	})

	it('exits 3 for a test file that failed to collect, however the cases read, and for a failed report that names no failure', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cases-uncollected-' })
		try {
			scratch.write('uncollected.json', renderUncollectedReport(scratch.path))
			scratch.write('silent.json', JSON.stringify({ success: false, testResults: [] }))
			const cwd = { cwd: scratch.path }
			const uncollected = runSkillScript(CASES_SCRIPT, ['--report', 'uncollected.json'], cwd)
			expect(uncollected.status).toBe(3)
			expect(uncollected.stdout).toContain(
				'unnamed failure: "tests/x.test.ts" failed with no failed case',
			)
			expect(uncollected.stdout).toContain('differences=1')
			const named = runSkillScript(
				CASES_SCRIPT,
				['--report', 'uncollected.json', '--passed', 'alpha holds'],
				cwd,
			)
			expect(named.status).toBe(3)
			const silent = runSkillScript(CASES_SCRIPT, ['--report', 'silent.json'], cwd)
			expect(silent.status).toBe(3)
			expect(silent.stdout).toContain('the report is not successful')
			scratch.write('report.json', renderCasesReport(scratch.path, CASES_ROWS))
			const expected = runSkillScript(
				CASES_SCRIPT,
				['--report', 'report.json', '--passed', 'alpha holds', '--failed', 'breaks'],
				cwd,
			)
			expect(expected.status).toBe(0)
		} finally {
			scratch.destroy()
		}
	})
})
