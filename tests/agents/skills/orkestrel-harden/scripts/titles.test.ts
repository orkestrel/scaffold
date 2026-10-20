import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	commitFiles,
	createRepository,
	runSkillScript,
	TITLES_SCRIPT,
	trackFiles,
} from '../../../../setupServer.js'

describe('titles.ts', () => {
	it('keeps unchanged titles with no missing or moved rows', () => {
		const scratch = createScratch({ prefix: 'titles-unchanged-' })
		try {
			scratch.write(
				'tests/sample.test.ts',
				"describe('reader', () => {\n it('reads', () => {})\n})\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toEqual({
				base: 'HEAD',
				root: scratch.path.split('\\').join('/'),
				count: 2,
				missing: [],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reports a removed title with its baseline file and exits 3', () => {
		const scratch = createScratch({ prefix: 'titles-removed-' })
		try {
			scratch.write('tests/nested/sample.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.remove('tests/nested/sample.test.ts')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [{ file: 'tests/nested/sample.test.ts', title: 'reads', deficit: 1 }],
				moved: [],
			})
			const text = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(text.status).toBe(3)
			expect(text.stdout).toBe(
				'titles: 1 baseline title(s) at HEAD, 1 missing, 0 moved\nmissing\ttests/nested/sample.test.ts\treads\t1\n',
			)
		} finally {
			scratch.destroy()
		}
	})

	it('compares exact titles rather than substrings', () => {
		const scratch = createScratch({ prefix: 'titles-substring-' })
		try {
			scratch.write('tests/sample.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write(
				'tests/sample.test.ts',
				"it('reads the file', () => {})\n// 'reads'\n/* \"reads\" */\n",
			)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.missing).toEqual([
				{ file: 'tests/sample.test.ts', title: 'reads', deficit: 1 },
			])
			expect(run.json?.moved).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('reports a duplicate deficit without treating the surviving registration as moved', () => {
		const scratch = createScratch({ prefix: 'titles-duplicates-' })
		try {
			scratch.write('tests/a.test.ts', "it('reads', () => {})\n")
			scratch.write('tests/b.test.ts', "it('reads', () => {})\nit('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/b.test.ts', "it('reads', () => {})\n")
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 3,
				missing: [{ file: 'tests/b.test.ts', title: 'reads', deficit: 1 }],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reports titles moved into setup data tables and exits 0', () => {
		const scratch = createScratch({ prefix: 'titles-moved-' })
		try {
			scratch.write('tests/sample.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/setup.ts', 'export const scenario = { title: "reads" }\n')
			scratch.write(
				'tests/sample.test.ts',
				"import { scenario } from './setup.js'\nit(scenario.title, () => {})\n",
			)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [],
				moved: [{ file: 'tests/sample.test.ts', title: 'reads', holder: 'tests/setup.ts' }],
			})
			const text = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(text.stdout).toContain('moved\ttests/sample.test.ts\treads\ttests/setup.ts')
			scratch.remove('tests/setup.ts')
			scratch.write('tests/sample.test.ts', "it.each([{ title: 'reads' }])('$title', () => {})\n")
			const inline = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(inline.status).toBe(0)
			expect(inline.json).toMatchObject({
				missing: [],
				moved: [{ file: 'tests/sample.test.ts', title: 'reads', holder: 'tests/sample.test.ts' }],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reads registration forms and restricts titles to proof files under tests', () => {
		const scratch = createScratch({ prefix: 'titles-forms-' })
		try {
			scratch.write(
				'tests/forms.test.ts',
				[
					"describe.skip('suite', () => {})",
					'it.only("double", () => {})',
					'test.skip(`template`, () => {})',
					"it.each([1, 2])('each %s', () => {})",
					"test.concurrent.each([1])('chained %s', () => {})",
				].join('\r\n'),
			)
			scratch.write('outside.test.ts', "it('outside', () => {})\n")
			scratch.write('tests/helper.ts', "it('helper', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/forms.test.ts', '')
			scratch.write('outside.test.ts', "it('suite', () => {})\n")
			scratch.write('tests/helper.ts', "it('helper changed', () => {})\n")
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 5,
				missing: [
					{ file: 'tests/forms.test.ts', title: 'suite', deficit: 1 },
					{ file: 'tests/forms.test.ts', title: 'double', deficit: 1 },
					{ file: 'tests/forms.test.ts', title: 'template', deficit: 1 },
					{ file: 'tests/forms.test.ts', title: 'each %s', deficit: 1 },
					{ file: 'tests/forms.test.ts', title: 'chained %s', deficit: 1 },
				],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('decodes quote and backslash escapes while preserving other escapes', () => {
		const scratch = createScratch({ prefix: 'titles-escapes-' })
		try {
			scratch.write(
				'tests/escapes.test.ts',
				"it('reader\\'s \"quote\" and \\` mark \\\\ path \\n', () => {})\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write(
				'tests/escapes.test.ts',
				'it("reader\'s \\"quote\\" and ` mark \\\\ path \\n", () => {})\n',
			)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({ count: 1, missing: [], moved: [] })
			scratch.write('tests/escapes.test.ts', '')
			const removed = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(removed.json?.missing).toEqual([
				{
					file: 'tests/escapes.test.ts',
					title: 'reader\'s "quote" and ` mark \\ path \\n',
					deficit: 1,
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses usage and git errors and writes JSON and text output', () => {
		const scratch = createScratch({ prefix: 'titles-usage-' })
		try {
			expect(runSkillScript(TITLES_SCRIPT, [], { cwd: scratch.path })).toMatchObject({
				status: 64,
				stderr: expect.stringContaining('--base REV'),
			})
			expect(runSkillScript(TITLES_SCRIPT, ['--base'], { cwd: scratch.path })).toMatchObject({
				status: 64,
				stderr: expect.stringContaining('--base'),
			})
			expect(
				runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--root', '--json'], {
					cwd: scratch.path,
				}),
			).toMatchObject({ status: 64, stderr: expect.stringContaining('--root') })
			expect(
				runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--out'], { cwd: scratch.path }),
			).toMatchObject({ status: 64, stderr: expect.stringContaining('--out') })
			expect(
				runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path }),
			).toMatchObject({ status: 2, stderr: expect.stringContaining('git:') })
			scratch.write('tests/sample.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			expect(
				runSkillScript(TITLES_SCRIPT, ['--base', 'unknown-revision'], { cwd: scratch.path }),
			).toMatchObject({ status: 2, stderr: expect.stringContaining('git:') })
			const run = runSkillScript(TITLES_SCRIPT, [
				'--base',
				'HEAD',
				'--root',
				scratch.path,
				'--json',
				'--out',
				join(scratch.path, 'report', 'titles.json'),
			])
			expect(run.status).toBe(0)
			expect(JSON.parse(scratch.read('report/titles.json') ?? '')).toEqual(run.json)
			const text = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--out', 'report/titles.txt'], {
				cwd: scratch.path,
			})
			expect(text.status).toBe(0)
			expect(scratch.read('report/titles.txt')).toBe(text.stdout)
		} finally {
			scratch.destroy()
		}
	})

	it('prints the same JSON through the built JavaScript twin', () => {
		const scratch = createScratch({ prefix: 'titles-twin-' })
		try {
			scratch.write('tests/sample.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/sample.test.ts', '')
			const source = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			const twin = runSkillScript(
				'dist/agents/skills/orkestrel-harden/scripts/titles.js',
				['--base', 'HEAD', '--json'],
				{ cwd: scratch.path },
			)
			expect(source.status).toBe(3)
			expect(twin.status).toBe(3)
			expect(twin.json).toEqual(source.json)
		} finally {
			scratch.destroy()
		}
	})
})
