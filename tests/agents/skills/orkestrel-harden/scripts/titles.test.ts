import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	commitFiles,
	createRepository,
	runSkillScript,
	TITLES_AMBIGUITIES,
	TITLES_EXPRESSIONS,
	TITLES_POSITIONS,
	TITLES_QUOTES,
	TITLES_REFUSED_ARGUMENTS,
	TITLES_SCRIPT,
	TITLES_STATEMENTS,
	TITLES_TABLES,
	TITLES_TERMINATORS,
	TITLES_UNBALANCED,
	trackFiles,
} from '../../../../setupServer.js'
import {
	decodeTitle,
	describeName,
	escapeCell,
	listFiles,
	normalizeSlashes,
	readMissingFlags,
	readOption,
	readRegistrations,
	readUnknownFlags,
	renderReport,
	TokenScanner,
} from '../../../../../.agents/skills/orkestrel-harden/scripts/titles.ts'

describe('titles.ts', () => {
	it.each(TITLES_TABLES)('balances each arguments over code tokens: %s', (table) => {
		const scratch = createScratch({ prefix: 'titles-balanced-each-' })
		try {
			scratch.write(
				'tests/read.test.ts',
				`describe.skip.each(${table})('groups %s', () => {})\nit.each(${table})('reads %s', () => {})\ntest.concurrent.each(${table})(\n\t\`checks %s\`, () => {})\n`,
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			const unchanged = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(unchanged.status).toBe(0)
			expect(unchanged.json).toMatchObject({ count: 3, missing: [], moved: [] })
			scratch.remove('tests/read.test.ts')
			const removed = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(removed.status).toBe(3)
			expect(removed.json).toMatchObject({
				count: 3,
				missing: [
					{ file: 'tests/read.test.ts', title: 'groups %s', deficit: 1 },
					{ file: 'tests/read.test.ts', title: 'reads %s', deficit: 1 },
					{ file: 'tests/read.test.ts', title: 'checks %s', deficit: 1 },
				],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_UNBALANCED)('refuses unbalanced each arguments in either tree: %s', (head) => {
		const scratch = createScratch({ prefix: 'titles-unbalanced-each-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', `// registration\n${head}\n`)
			const working = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(working.status).toBe(2)
			expect(working.stderr).toContain('tests/read.test.ts:2: Unbalanced each arguments')
			expect(working.stdout).toBe('')
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.remove('tests/read.test.ts')
			const baseline = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(baseline.status).toBe(2)
			expect(baseline.stderr).toContain('HEAD:tests/read.test.ts:2: Unbalanced each arguments')
			expect(baseline.stdout).toBe('')
		} finally {
			scratch.destroy()
		}
	})

	it('reports the renamed frozen distribution proof title after Object.entries', () => {
		const scratch = createScratch({ prefix: 'titles-distribution-each-' })
		try {
			scratch.write(
				'tests/src/core/templates.test.ts',
				"it.each(Object.entries(DISTRIBUTION_PROOF_TEXTS['0.0.104']))(\n\t'typechecks and imports the frozen 0.0.104 %s proof against the current harness',\n\t(variant, text) => {},\n)\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write(
				'tests/src/core/templates.test.ts',
				"it.each(Object.entries(DISTRIBUTION_PROOF_TEXTS['0.0.104']))(\n\t'renames the frozen 0.0.104 %s proof',\n\t(variant, text) => {},\n)\n",
			)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [
					{
						file: 'tests/src/core/templates.test.ts',
						title: [
							'typechecks and imports the frozen 0.0.104 %s proof',
							'against the current harness',
						].join(' '),
						deficit: 1,
					},
				],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reports the removed each title after Number arguments', () => {
		const scratch = createScratch({ prefix: 'titles-number-each-' })
		try {
			scratch.write(
				'tests/read.test.ts',
				"it.each([[Number('1')]])('reads the value %s', () => {})\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.remove('tests/read.test.ts')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [{ file: 'tests/read.test.ts', title: 'reads the value %s', deficit: 1 }],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_STATEMENTS)('excludes regex holders after statement blocks: %s', (statement) => {
		const scratch = createScratch({ prefix: 'titles-block-regex-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', `${statement}\n/'reads'/.test('other')\n`)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [{ file: 'tests/read.test.ts', title: 'reads', deficit: 1 }],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_EXPRESSIONS)('preserves division after expression braces: %s', (expression) => {
		const scratch = createScratch({ prefix: 'titles-brace-division-' })
		try {
			scratch.write('tests/read.test.ts', `it('reads', () => {})\n${expression}\n`)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({ count: 1, missing: [], moved: [] })
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_TERMINATORS)('accepts escaped string continuations: %j', (terminator) => {
		const scratch = createScratch({ prefix: 'titles-continuation-' })
		try {
			const text = `it('reads', () => {})\r\nconst label = 'rea\\${terminator}ds'\r\nconst double = "rea\\${terminator}ds"\r\n`
			scratch.write('tests/read.test.ts', text)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({ count: 1, missing: [], moved: [] })
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_TERMINATORS)('refuses unescaped string line terminators: %j', (terminator) => {
		const scratch = createScratch({ prefix: 'titles-unescaped-line-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			for (const quote of TITLES_QUOTES) {
				scratch.write(
					'tests/read.test.ts',
					`it('reads', () => {})\nconst label = ${quote}rea${terminator}ds${quote}\n`,
				)
				const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
					cwd: scratch.path,
				})
				expect(run.status).toBe(2)
				expect(run.stderr).toContain('Unclosed string token')
			}
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_AMBIGUITIES)('refuses ambiguous block slash contexts: %s', (expression) => {
		const scratch = createScratch({ prefix: 'titles-ambiguous-brace-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', `${expression}\n`)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('Ambiguous brace before slash')
		} finally {
			scratch.destroy()
		}
	})

	it('excludes registrations inside block comments', () => {
		const scratch = createScratch({ prefix: 'titles-regions-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', "/*\nit('reads', () => {})\n*/\n")
			const comment = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(comment.status).toBe(3)
			expect(comment.json?.missing).toEqual([
				{ file: 'tests/read.test.ts', title: 'reads', deficit: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('excludes registrations inside template text', () => {
		const scratch = createScratch({ prefix: 'titles-template-region-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', "const text = `\nit('reads', () => {})\n`\n")
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.missing).toEqual([
				{ file: 'tests/read.test.ts', title: 'reads', deficit: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('excludes baseline comments and template text from the title count', () => {
		const scratch = createScratch({ prefix: 'titles-baseline-regions-' })
		try {
			scratch.write(
				'tests/read.test.ts',
				"/*\nit('reads', () => {})\n*/\nconst text = `\nit('reads', () => {})\n`\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', '')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({ count: 0, missing: [], moved: [] })
		} finally {
			scratch.destroy()
		}
	})

	it('matches same-file survivors before cross-file moves', () => {
		const scratch = createScratch({ prefix: 'titles-attribution-' })
		try {
			scratch.write('tests/a.test.ts', "it('reads', () => {})\n")
			scratch.write('tests/b.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.remove('tests/a.test.ts')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.missing).toEqual([{ file: 'tests/a.test.ts', title: 'reads', deficit: 1 }])
			scratch.write('tests/c.test.ts', "it('reads', () => {})\n")
			const moved = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(moved.status).toBe(0)
			expect(moved.json).toMatchObject({ missing: [], moved: [] })
		} finally {
			scratch.destroy()
		}
	})

	it('excludes regex bodies from literal holders', () => {
		const scratch = createScratch({ prefix: 'titles-regex-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write(
				'tests/read.test.ts',
				"const pattern = /'reads'/\nif (pattern) /'reads'/.test('other')\nconst divide = (12) / 3 / 2\n",
			)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				missing: [{ file: 'tests/read.test.ts', title: 'reads', deficit: 1 }],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('retains literal holders inside template expressions', () => {
		const scratch = createScratch({ prefix: 'titles-expression-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', "it(`${'reads'}`, () => {})\n")
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				missing: [],
				moved: [{ file: 'tests/read.test.ts', title: 'reads', holder: 'tests/read.test.ts' }],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('compares complete nested template titles by raw spelling', () => {
		const scratch = createScratch({ prefix: 'titles-nested-' })
		try {
			scratch.write('tests/read.test.ts', 'it(`reads ${`file`}`, () => {})\n')
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', 'it(`reads ${`record`}`, () => {})\n')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.missing).toEqual([
				{ file: 'tests/read.test.ts', title: 'reads ${`file`}', deficit: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses unclosed lexical regions with a file diagnostic', () => {
		const scratch = createScratch({ prefix: 'titles-unclosed-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', 'it(`reads ${`file`}, () => {})\n')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('tests/read.test.ts')
			expect(run.stderr).toContain('Unclosed')
			scratch.write('tests/read.test.ts', '/* unfinished')
			const comment = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(comment).toMatchObject({
				status: 2,
				stderr: expect.stringContaining('Unclosed block'),
			})
			scratch.write('tests/read.test.ts', "const title = 'unfinished")
			const string = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(string).toMatchObject({
				status: 2,
				stderr: expect.stringContaining('Unclosed string'),
			})
			scratch.write('tests/read.test.ts', 'const pattern = /unfinished')
			const regex = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(regex).toMatchObject({ status: 2, stderr: expect.stringContaining('Unclosed regex') })
		} finally {
			scratch.destroy()
		}
	})

	it('preserves plain templates and Unicode across BOM and CRLF', () => {
		const scratch = createScratch({ prefix: 'titles-unicode-' })
		try {
			scratch.write('tests/é.test.ts', '\uFEFFit(\r\n`re\u0301ads 日本語`, () => {})\r\n')
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/é.test.ts', 'it("re\u0301ads 日本語", () => {})\n')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({ count: 1, missing: [], moved: [] })
		} finally {
			scratch.destroy()
		}
	})

	it('scans escaped regex classes and division beside template expressions', () => {
		const scratch = createScratch({ prefix: 'titles-token-boundaries-' })
		try {
			scratch.write('tests/read.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write(
				'tests/read.test.ts',
				"const pattern = /['/}]reads/giu\nconst count = 12 / 3 / 2\nconst text = `${({ title: 'reads', nested: `file ${/}/.source}` }).title}`\n",
			)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.moved).toEqual([
				{ file: 'tests/read.test.ts', title: 'reads', holder: 'tests/read.test.ts' },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('reads code registrations inside template expressions', () => {
		const scratch = createScratch({ prefix: 'titles-expression-registration-' })
		try {
			scratch.write('tests/read.test.ts', "const text = `${\nit('reads', () => {})\n}`\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/read.test.ts', '')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [{ file: 'tests/read.test.ts', title: 'reads', deficit: 1 }],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})
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
				dynamic: [],
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
				'titles: 1 baseline title(s) at HEAD, 1 missing, 0 moved, 0 dynamic\nmissing\ttests/nested/sample.test.ts\treads\t1\n',
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

	it('reports titles moved into setup data tables and exits 3', () => {
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
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [],
				moved: [{ file: 'tests/sample.test.ts', title: 'reads', holder: 'tests/setup.ts' }],
				dynamic: [{ file: 'tests/sample.test.ts', spelling: 'scenario.title', tree: 'working' }],
			})
			const text = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(text.stdout).toContain('moved\ttests/sample.test.ts\treads\ttests/setup.ts')
			scratch.remove('tests/setup.ts')
			scratch.write('tests/sample.test.ts', "it.each([{ title: 'reads' }])('$title', () => {})\n")
			const inline = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], {
				cwd: scratch.path,
			})
			expect(inline.status).toBe(3)
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

	it.each(TITLES_POSITIONS)(
		'reads the registered titles at any token position: %j',
		(text, titles) => {
			const registrations = readRegistrations(
				text,
				new TokenScanner(text, 'sample.ts').scan(),
				'sample.ts',
			)
			expect(
				registrations.map(({ token }) =>
					token === undefined ? undefined : decodeTitle(text, token),
				),
			).toEqual(titles)
		},
	)

	it('spells a dynamic title from its source and refuses an unclosed call', () => {
		const text = "it(NAME, () => {})\nit('a' +\n NAME, () => {})\nit(`x ${y}`, () => {})\n"
		const registrations = readRegistrations(
			text,
			new TokenScanner(text, 'sample.ts').scan(),
			'sample.ts',
		)
		expect(registrations.map(({ spelling }) => spelling)).toEqual([
			'NAME',
			"'a' + NAME",
			'`x ${y}`',
		])
		const open = "it('a'"
		expect(() =>
			readRegistrations(open, new TokenScanner(open, 'open.ts').scan(), 'open.ts'),
		).toThrow('open.ts:1: Unbalanced call arguments')
	})

	it('reads a registration at any position, a tagged-template table, and a skipIf title', () => {
		const scratch = createScratch({ prefix: 'titles-grammar-' })
		try {
			scratch.write(
				'tests/grammar.test.ts',
				[
					'describe("outer", () => { it("inner", () => {}) })',
					';it("semicolon", () => {})',
					'it.each`',
					' a | b',
					'`("tagged %s", () => {})',
					'it.skipIf("win32" === process.platform)("windows only", () => {})',
					'',
				].join('\n'),
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.remove('tests/grammar.test.ts')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				count: 5,
				missing: [
					{ file: 'tests/grammar.test.ts', title: 'outer', deficit: 1 },
					{ file: 'tests/grammar.test.ts', title: 'inner', deficit: 1 },
					{ file: 'tests/grammar.test.ts', title: 'semicolon', deficit: 1 },
					{ file: 'tests/grammar.test.ts', title: 'tagged %s', deficit: 1 },
					{ file: 'tests/grammar.test.ts', title: 'windows only', deficit: 1 },
				],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reports a non-literal title as a dynamic row for each tree', () => {
		const scratch = createScratch({ prefix: 'titles-dynamic-' })
		try {
			scratch.write(
				'tests/dynamic.test.ts',
				"const NAME = 'x'\nit(NAME, () => {})\nit('a' + NAME, () => {})\nit('literal', () => {})\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json).toMatchObject({
				count: 1,
				missing: [],
				moved: [],
				dynamic: [
					{ file: 'tests/dynamic.test.ts', spelling: 'NAME', tree: 'baseline' },
					{ file: 'tests/dynamic.test.ts', spelling: "'a' + NAME", tree: 'baseline' },
					{ file: 'tests/dynamic.test.ts', spelling: 'NAME', tree: 'working' },
					{ file: 'tests/dynamic.test.ts', spelling: "'a' + NAME", tree: 'working' },
				],
			})
			const text = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(text.stdout).toBe(
				[
					'titles: 1 baseline title(s) at HEAD, 0 missing, 0 moved, 4 dynamic',
					'dynamic\ttests/dynamic.test.ts\tbaseline\tNAME',
					"dynamic\ttests/dynamic.test.ts\tbaseline\t'a' + NAME",
					'dynamic\ttests/dynamic.test.ts\tworking\tNAME',
					"dynamic\ttests/dynamic.test.ts\tworking\t'a' + NAME",
					'',
				].join('\n'),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('exits 3 for a lost title that an assertion value still spells', () => {
		const scratch = createScratch({ prefix: 'titles-assertion-holder-' })
		try {
			scratch.write('tests/sample.test.ts', "it('works', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write('tests/sample.test.ts', "expect(1).toBe('works')\n")
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json).toMatchObject({
				missing: [],
				moved: [{ file: 'tests/sample.test.ts', title: 'works', holder: 'tests/sample.test.ts' }],
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reads the baseline when --root sits below the repository top', () => {
		const scratch = createScratch({ prefix: 'titles-subdirectory-' })
		try {
			scratch.write('pkg/tests/sample.test.ts', "it('reads', () => {})\n")
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			const root = join(scratch.path, 'pkg')
			const unchanged = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--root', root, '--json'])
			expect(unchanged.status).toBe(0)
			expect(unchanged.json).toMatchObject({ count: 1, missing: [], moved: [] })
			scratch.remove('pkg/tests/sample.test.ts')
			const removed = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD', '--root', root, '--json'])
			expect(removed.status).toBe(3)
			expect(removed.json).toMatchObject({
				count: 1,
				missing: [{ file: 'tests/sample.test.ts', title: 'reads', deficit: 1 }],
				moved: [],
			})
		} finally {
			scratch.destroy()
		}
	})

	it.each(TITLES_REFUSED_ARGUMENTS)(
		'refuses the equals form and an unread flag with exit 64: %j',
		(...args) => {
			const scratch = createScratch({ prefix: 'titles-unknown-flag-' })
			try {
				const run = runSkillScript(TITLES_SCRIPT, args, { cwd: scratch.path })
				expect(run.status).toBe(64)
				expect(run.stderr).toContain('is not a flag this script reads')
				expect(run.stdout).toBe('')
				expect(scratch.has('report.json')).toBe(false)
			} finally {
				scratch.destroy()
			}
		},
	)

	it('refuses a base that opens with a hyphen', () => {
		const scratch = createScratch({ prefix: 'titles-hyphen-base-' })
		try {
			const run = runSkillScript(TITLES_SCRIPT, ['--base', '-x'], { cwd: scratch.path })
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('opens with "-"')
			expect(run.stderr).toContain('"-x"')
		} finally {
			scratch.destroy()
		}
	})

	it('escapes tab and newline in text rows', () => {
		const scratch = createScratch({ prefix: 'titles-escape-' })
		try {
			scratch.write('tests/sample.test.ts', 'it(`a\nb\tc`, () => {})\n')
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.remove('tests/sample.test.ts')
			const run = runSkillScript(TITLES_SCRIPT, ['--base', 'HEAD'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.stdout).toBe(
				'titles: 1 baseline title(s) at HEAD, 1 missing, 0 moved, 0 dynamic\nmissing\ttests/sample.test.ts\ta\\nb\\tc\t1\n',
			)
		} finally {
			scratch.destroy()
		}
	})

	it('reads flag values, missing values, and unread flags', () => {
		const argv = ['--base', 'HEAD', '--root', 'pkg', '--json']
		expect(readOption(argv, '--base')).toBe('HEAD')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOption(['--base', '--json', 'x'], '--base')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(
			readMissingFlags(['--base', '--json', '--out', 'a', '--root'], ['--base', '--out', '--root']),
		).toEqual(['--base', '--root'])
		expect(readMissingFlags(['--out', 'a'], ['--base'])).toEqual([])
		expect(
			readUnknownFlags(
				['--base=HEAD', '--json', '--root', 'a', '--out', 'b'],
				['--base', '--json', '--out'],
			),
		).toEqual(['--base=HEAD', '--root'])
		expect(readUnknownFlags(['--base', 'HEAD', '--', 'node', '--watch'], ['--base'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})

	it('normalizes slashes and echoes a name JSON-encoded and capped', () => {
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
		expect(describeName('a"b')).toBe('"a\\"b"')
		expect(describeName('x'.repeat(100))).toBe(JSON.stringify(`${'x'.repeat(80)}…`))
	})

	it('decodes quote escapes, escapes row cells, and renders every row kind', () => {
		const text = "it('a\\'b \\\\ c', () => {})"
		const token = new TokenScanner(text, 'sample.ts')
			.scan()
			.find(({ category }) => category === 'string')
		expect(token === undefined ? undefined : decodeTitle(text, token)).toBe("a'b \\ c")
		expect(escapeCell('a\tb\nc\rd')).toBe('a\\tb\\nc\\rd')
		expect(
			renderReport({
				base: 'HEAD',
				root: '/repo',
				count: 3,
				missing: [{ file: 'tests/a.test.ts', title: 'gone', deficit: 2 }],
				moved: [{ file: 'tests/a.test.ts', title: 'went', holder: 'tests/b.ts' }],
				dynamic: [{ file: 'tests/a.test.ts', spelling: 'NAME', tree: 'working' }],
			}),
		).toBe(
			[
				'titles: 3 baseline title(s) at HEAD, 1 missing, 1 moved, 1 dynamic',
				'missing\ttests/a.test.ts\tgone\t2',
				'moved\ttests/a.test.ts\twent\ttests/b.ts',
				'dynamic\ttests/a.test.ts\tworking\tNAME',
			].join('\n'),
		)
	})

	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-titles-walk-' })
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
		} finally {
			scratch.destroy()
		}
	})

	it('prints the same JSON through the built JavaScript twin', () => {
		const scratch = createScratch({ prefix: 'titles-twin-' })
		try {
			scratch.write(
				'tests/sample.test.ts',
				"it('reads', () => {})\nit(`reads ${`file`}`, () => {})\nit.each([[Number('1')]])('reads the value %s', () => {})\n",
			)
			createRepository(scratch.path)
			trackFiles(scratch.path)
			commitFiles(scratch.path)
			scratch.write(
				'tests/sample.test.ts',
				"if (true) {}\n/'reads'/.test('other')\nfunction read() {}\n/'reads'/.test('other')\nconst label = 'rea\\\r\nds'\r\nit(`reads ${`record`}`, () => {})\n",
			)
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
