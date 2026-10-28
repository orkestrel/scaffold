import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord, isString } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, CITE_SCRIPT } from '../../../../setupServer.js'
import {
	countLines,
	extractCitations,
	indexBasenames,
	judgeLines,
	listFiles,
	needsIndex,
	normalizeSlashes,
	readMissingFlags,
	readOption,
	readUnknownFlags,
	resolveDirect,
	resolveFile,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/cite.ts'

describe('cite.ts', () => {
	it('resolves direct, backslash, unique-basename, and dot-prefixed citations, and names each failure', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-' })
		try {
			scratch.write('docs/a.md', 'one\ntwo\nthree\n')
			scratch.write('deep/one/name.md', 'x\n')
			scratch.write('deep/two/name.md', 'x\n')
			scratch.write('onlyone/unique.md', 'x\n')
			scratch.write('.agents/x.md', 'x\n')
			scratch.write('empty.md', '')
			scratch.write(
				'report.md',
				[
					'See `docs/a.md:2`, `docs\\a.md:3`, `a.md:9`, `name.md:1`, `.agents/x.md:1`, `gone.md:1`, `docs/a.md:1-3`,',
					'`docs/a.md:4` (the phantom line after the trailing break), `empty.md:1`, and `wrongfolder\\unique.md:1`.',
				].join('\n'),
			)
			const run = runSkillScript(CITE_SCRIPT, ['report.md', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.citations).toBe(10)
			const unresolved = run.json?.unresolved
			if (!isArray(unresolved)) throw new Error('The summary carries no unresolved list')
			const reasons = unresolved.map((entry) =>
				isRecord(entry) && isString(entry.reason) ? entry.reason : '',
			)
			expect(reasons).toHaveLength(6)
			expect(reasons.filter((reason) => reason.startsWith('line 9 is outside 1-3'))).toHaveLength(1)
			expect(reasons.filter((reason) => reason === 'line 4 is outside 1-3')).toHaveLength(1)
			expect(reasons.filter((reason) => reason === 'line 1 is outside 1-0')).toHaveLength(1)
			expect(reasons.filter((reason) => reason.startsWith('ambiguous basename:'))).toHaveLength(1)
			expect(reasons.filter((reason) => reason === 'file does not exist')).toHaveLength(2)
		} finally {
			scratch.destroy()
		}
	})

	it('prints a text summary and refuses a missing path or a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-usage-' })
		try {
			scratch.write('docs/a.md', 'one\n')
			scratch.write('report.md', 'See `docs/a.md:1`.\n')
			const run = runSkillScript(CITE_SCRIPT, ['report.md'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.stdout).toContain('cite: 1 citation(s) in report.md, 0 unresolved')
			expect(runSkillScript(CITE_SCRIPT, ['absent.md'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(CITE_SCRIPT, ['report.md', '--root'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(CITE_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
		} finally {
			scratch.destroy()
		}
	})

	it('names a range end past the file and a reversed range, and resolves a range inside the file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-range-' })
		try {
			scratch.write('docs/a.md', 'one\ntwo\nthree\n')
			scratch.write('report.md', 'See `docs/a.md:1-9`, `docs/a.md:3-1`, and `docs/a.md:2-3`.\n')
			const run = runSkillScript(CITE_SCRIPT, ['report.md', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.citations).toBe(3)
			expect(run.json?.unresolved).toEqual([
				{ citation: 'docs/a.md:1-9', reason: 'range end 9 is outside 1-3' },
				{ citation: 'docs/a.md:3-1', reason: 'range end 1 is outside 3-3' },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('resolves a citation under --root and fails the same citation under the working directory', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-root-' })
		try {
			scratch.write('sub/docs/a.md', 'one\ntwo\n')
			scratch.write('report.md', 'See `docs/a.md:2`.\n')
			const rooted = runSkillScript(CITE_SCRIPT, ['report.md', '--root', 'sub', '--json'], {
				cwd: scratch.path,
			})
			expect(rooted.status).toBe(0)
			expect(rooted.json).toMatchObject({
				path: 'report.md',
				root: 'sub',
				citations: 1,
				unresolved: [],
			})
			const unrooted = runSkillScript(CITE_SCRIPT, ['report.md', '--json'], { cwd: scratch.path })
			expect(unrooted.status).toBe(3)
			expect(unrooted.json?.unresolved).toEqual([
				{ citation: 'docs/a.md:2', reason: 'file does not exist' },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown flag and the equals form before it reads the report', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-flags-' })
		try {
			scratch.write('docs/a.md', 'one\n')
			scratch.write('report.md', 'See `docs/a.md:1`.\n')
			for (const flag of ['--bogus', '--root=sub', '--json=true']) {
				const run = runSkillScript(CITE_SCRIPT, ['report.md', flag], { cwd: scratch.path })
				expect({ flag, status: run.status }).toEqual({ flag, status: 64 })
				expect(run.stderr).toContain(flag)
				expect(run.stdout).toBe('')
			}
		} finally {
			scratch.destroy()
		}
	})
})

describe('the citation reader', () => {
	it('extracts a file, a line, and the end of a range, reading a backslash path and an en dash', () => {
		expect(
			extractCitations('See `docs/a.md:2`, `docs\\a.md:3-5`, and name.md:1–4, then src/x.ts:9.'),
		).toEqual([
			{ citation: 'docs/a.md:2', file: 'docs/a.md', line: 2, end: undefined },
			{ citation: 'docs\\a.md:3-5', file: 'docs\\a.md', line: 3, end: 5 },
			{ citation: 'name.md:1–4', file: 'name.md', line: 1, end: 4 },
			{ citation: 'src/x.ts:9', file: 'src/x.ts', line: 9, end: undefined },
		])
		expect(extractCitations('')).toEqual([])
		expect(extractCitations('a line and column such as a.md:2:5 is no citation')).toEqual([])
	})
})

describe('the line judgment', () => {
	it('counts lines where a trailing break ends the last line and an empty file has none', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-count-' })
		try {
			const cases: ReadonlyArray<readonly [string, number]> = [
				['', 0],
				['a', 1],
				['a\n', 1],
				['a\n\n', 2],
				['a\r\nb\r\n', 2],
			]
			for (const [index, [text, lines]] of cases.entries()) {
				const path = scratch.write(`count-${index}.txt`, text)
				expect({ text, lines: countLines(path) }).toEqual({ text, lines })
			}
		} finally {
			scratch.destroy()
		}
	})

	it('judges a line and a range against the file length at each edge', () => {
		const counts = new Map([['f', 3]])
		expect(judgeLines('f', 1, undefined, counts)).toBeUndefined()
		expect(judgeLines('f', 3, undefined, counts)).toBeUndefined()
		expect(judgeLines('f', 1, 3, counts)).toBeUndefined()
		expect(judgeLines('f', 3, 3, counts)).toBeUndefined()
		expect(judgeLines('f', 0, undefined, counts)).toBe('line 0 is outside 1-3')
		expect(judgeLines('f', 4, undefined, counts)).toBe('line 4 is outside 1-3')
		expect(judgeLines('f', 1, 4, counts)).toBe('range end 4 is outside 1-3')
		expect(judgeLines('f', 2, 1, counts)).toBe('range end 1 is outside 2-3')
	})
})

describe('the file resolution', () => {
	it('resolves a regular file directly, reading a backslash as a slash, and refuses a directory or a miss', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-direct-' })
		try {
			scratch.write('docs/a.md', 'one\n')
			const expected = resolve(scratch.path, 'docs', 'a.md')
			expect(resolveDirect(scratch.path, 'docs/a.md')).toBe(expected)
			expect(resolveDirect(scratch.path, 'docs\\a.md')).toBe(expected)
			expect(resolveDirect(scratch.path, 'docs')).toBeUndefined()
			expect(resolveDirect(scratch.path, 'docs/gone.md')).toBeUndefined()
			expect(needsIndex(scratch.path, 'a.md')).toBe(true)
			expect(needsIndex(scratch.path, 'docs/a.md')).toBe(false)
			scratch.write('top.md', '')
			expect(needsIndex(scratch.path, 'top.md')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('resolves a unique basename, names an ambiguous one, and refuses a missing one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-index-' })
		try {
			scratch.write('deep/one/name.md', 'x\n')
			scratch.write('deep/two/name.md', 'x\n')
			scratch.write('only/unique.md', 'x\n')
			const index = indexBasenames(scratch.path)
			expect([...(index.get('name.md') ?? [])].sort()).toEqual([
				'deep/one/name.md',
				'deep/two/name.md',
			])
			expect(index.get('unique.md')).toEqual(['only/unique.md'])
			expect(resolveFile(scratch.path, 'unique.md', index)).toEqual({
				path: resolve(scratch.path, 'only/unique.md'),
				reason: undefined,
			})
			expect(resolveFile(scratch.path, 'only/unique.md', undefined).reason).toBeUndefined()
			expect(resolveFile(scratch.path, 'name.md', index).reason).toMatch(/^ambiguous basename: /u)
			expect(resolveFile(scratch.path, 'gone.md', index).reason).toBe('file does not exist')
			expect(resolveFile(scratch.path, 'wrong/unique.md', index).reason).toBe('file does not exist')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the argument readers', () => {
	it('reads a flag value and treats a following flag as a missing value, keeping the first occurrence', () => {
		const argv = ['report.md', '--root', 'sub', '--json']
		expect(readOption(argv, '--root')).toBe('sub')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--root', '--json'], '--root')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readMissingFlags(['report.md', '--root'], ['--root'])).toEqual(['--root'])
		expect(readMissingFlags(argv, ['--root'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(['a.md', '--root=sub', '--json', '--bogus'], ['--root', '--json']),
		).toEqual(['--root=sub', '--bogus'])
		expect(readUnknownFlags(['a.md', '--', '--watch'], ['--root'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})

describe('the tree walk', () => {
	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-cite-walk-' })
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
			expect(normalizeSlashes('a/b')).toBe('a/b')
		} finally {
			scratch.destroy()
		}
	})
})
