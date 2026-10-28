import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { PATCH_SCRIPT, renderEditFile, runSkillScript } from '../../../../setupServer.js'
import {
	applyEdits,
	countOccurrences,
	isInside,
	isMissingValue,
	parseEdits,
	quote,
	readInvalidSkips,
	readMissingFlags,
	readOptions,
	readPositionals,
	readStrays,
	readTargetProblem,
	readUnknownFlags,
	resolveEdits,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/patch.ts'

describe('patch.ts', () => {
	it('parses blocks in order, with a longer fence, CRLF line breaks, and an empty replacement', () => {
		const text = [
			'Notes before the first block are ignored.',
			'',
			'### src/a.ts',
			'reason: rename the helper',
			'old:',
			'```ts',
			'const a = 1',
			'```',
			'new:',
			'```ts',
			'const b = 1',
			'```',
			'',
			'### docs/b.md',
			'reason: show a fence',
			'old:',
			'````md',
			'```ts',
			'x',
			'```',
			'````',
			'new:',
			'````md',
			'````',
			'',
		].join('\r\n')
		expect(parseEdits(text)).toStrictEqual([
			{
				number: 1,
				path: 'src/a.ts',
				reason: 'rename the helper',
				before: 'const a = 1',
				after: 'const b = 1',
			},
			{ number: 2, path: 'docs/b.md', reason: 'show a fence', before: '```ts\nx\n```', after: '' },
		])
		expect(parseEdits('no block here')).toStrictEqual([])
	})

	it('flags a line that opens no complete block and ignores a heading inside a fence', () => {
		const complete = renderEditFile([
			{ path: 'a.md', reason: 'r', before: '### not a block\nreason: nor this', after: 'x' },
		])
		expect(parseEdits(complete)).toHaveLength(1)
		expect(readStrays(complete)).toStrictEqual([])
		expect(readStrays(`${complete}\n### b.md\nreason: no old or new\n`)).toStrictEqual([
			'### b.md',
			'reason: no old or new',
		])
		expect(readStrays('old:\nnew:\n')).toStrictEqual(['old:', 'new:'])
	})

	it('counts every start position of a text, overlapping ones too, and treats regex characters literally', () => {
		expect(countOccurrences('aaa', 'aa')).toBe(2)
		expect(countOccurrences('abc', 'd')).toBe(0)
		expect(countOccurrences('abc', '')).toBe(0)
		expect(countOccurrences('a.b a+b a(b', '.')).toBe(1)
		expect(countOccurrences('a.b a+b a(b', '+')).toBe(1)
		expect(countOccurrences('a.b a+b a(b', '(')).toBe(1)
		expect(countOccurrences('x[0] x[0]', 'x[0]')).toBe(2)
	})

	it('applies a file’s edits in order against the earlier edits’ text and leaves a failing edit out', () => {
		const edits = parseEdits(
			renderEditFile([
				{ path: 'f', reason: 'first', before: 'one', after: 'two' },
				{ path: 'f', reason: 'second reads the first', before: 'two', after: 'three $& done' },
				{ path: 'f', reason: 'repeated', before: 'x', after: 'y' },
				{ path: 'f', reason: 'absent', before: 'nothing', after: 'z' },
			]),
		)
		const resolution = applyEdits('one x x', edits)
		expect(resolution.text).toBe('three $& done x x')
		expect(resolution.outcomes.map((outcome) => outcome.problem)).toStrictEqual([
			undefined,
			undefined,
			'old text occurs 2 times',
			'old text occurs 0 times',
		])
	})

	it('reads positionals, repeated values, missing values at every occurrence, and unknown flags', () => {
		expect(readPositionals(['E.md', '--skip', '2', '--plan'], ['--skip'])).toStrictEqual(['E.md'])
		expect(readPositionals(['--skip', '2', '3'], ['--skip'])).toStrictEqual(['3'])
		expect(readOptions(['--skip', '1', '--plan', '--skip', '3'], '--skip')).toStrictEqual([
			'1',
			'3',
		])
		expect(readMissingFlags(['--skip', '1', '--skip'], ['--skip'])).toStrictEqual(['--skip'])
		expect(readMissingFlags(['--skip', '1', '--skip', '--plan'], ['--skip'])).toStrictEqual([
			'--skip',
		])
		expect(readMissingFlags(['--skip', '1'], ['--skip'])).toStrictEqual([])
		expect(isMissingValue(['--skip', '--plan'], 0)).toBe(true)
		expect(isMissingValue(['--skip', '2'], 0)).toBe(false)
		expect(
			readUnknownFlags(['--plan', '--x', '--json=1', '--', '--after'], ['--plan']),
		).toStrictEqual(['--x', '--json=1'])
	})

	it('checks skips, containment, and quoting at their edges', () => {
		expect(readInvalidSkips(['0', '1', '3', '4', '01', 'x', '-1', '1.5'], 3)).toStrictEqual([
			'0',
			'4',
			'01',
			'x',
			'-1',
			'1.5',
		])
		const root = resolve('root')
		expect(isInside(root, resolve(root, 'a/b.ts'))).toBe(true)
		expect(isInside(root, root)).toBe(false)
		expect(isInside(root, resolve(root, '..', 'other.ts'))).toBe(false)
		expect(isInside(root, resolve(root, '..sibling', 'x'))).toBe(true)
		expect(quote('a"b')).toBe('"a\\"b"')
		expect(quote('x'.repeat(100))).toBe(`"${'x'.repeat(80)}…"`)
	})

	it('resolves edits across files, naming a missing file and an escaping path, and writes nothing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-patch-resolve-' })
		try {
			scratch.write('a.txt', 'alpha beta')
			scratch.write('b.txt', 'gamma')
			const edits = parseEdits(
				renderEditFile([
					{ path: 'a.txt', reason: 'a', before: 'alpha', after: 'ALPHA' },
					{ path: 'b.txt', reason: 'b', before: 'gamma', after: 'GAMMA' },
					{ path: 'none.txt', reason: 'c', before: 'x', after: 'y' },
					{ path: '../outside.txt', reason: 'd', before: 'x', after: 'y' },
				]),
			)
			const resolution = resolveEdits(scratch.path, edits)
			expect(resolution.outcomes.map((outcome) => [outcome.number, outcome.problem])).toStrictEqual(
				[
					[1, undefined],
					[2, undefined],
					[3, 'no such file'],
					[4, 'path leaves the working directory'],
				],
			)
			expect(resolution.files.map((file) => [file.path, file.text])).toStrictEqual([
				['a.txt', 'ALPHA beta'],
				['b.txt', 'GAMMA'],
			])
			expect(scratch.read('a.txt')).toBe('alpha beta')
			expect(readTargetProblem(scratch.path, scratch.path)).toBe(
				'path leaves the working directory',
			)
			scratch.write('dir/keep.txt', 'x')
			expect(readTargetProblem(scratch.path, resolve(scratch.path, 'dir'))).toBe('no such file')
		} finally {
			scratch.destroy()
		}
	})

	it('plans without writing, applies after every edit resolved, and honors a repeated skip', () => {
		const scratch = createScratch({ prefix: 'orkestrel-patch-apply-' })
		try {
			scratch.write('a.txt', 'one\ntwo\n')
			scratch.write('b.txt', 'three\n')
			scratch.write(
				'edits.md',
				renderEditFile([
					{ path: 'a.txt', reason: 'first', before: 'one', after: '1' },
					{ path: 'a.txt', reason: 'second', before: 'two', after: '2' },
					{ path: 'b.txt', reason: 'third', before: 'three', after: '3' },
				]),
			)
			const plan = runSkillScript(PATCH_SCRIPT, ['edits.md', '--plan'], { cwd: scratch.path })
			expect(plan.status).toBe(0)
			expect(plan.stdout).toContain('#1 ok a.txt — first')
			expect(plan.stdout).toContain('planned edits to 2 file(s)')
			expect(scratch.read('a.txt')).toBe('one\ntwo\n')
			const skipped = runSkillScript(
				PATCH_SCRIPT,
				['--apply', 'edits.md', '--skip', '2', '--skip', '3'],
				{ cwd: scratch.path },
			)
			expect(skipped.status).toBe(0)
			expect(skipped.stdout).toContain('#2 skipped a.txt')
			expect(skipped.stdout).toContain('applied edits to 1 file(s)')
			expect(scratch.read('a.txt')).toBe('1\ntwo\n')
			expect(scratch.read('b.txt')).toBe('three\n')
			const rest = runSkillScript(PATCH_SCRIPT, ['edits.md', '--apply', '--skip', '1'], {
				cwd: scratch.path,
			})
			expect(rest.status).toBe(0)
			expect(scratch.read('a.txt')).toBe('1\n2\n')
			expect(scratch.read('b.txt')).toBe('3\n')
		} finally {
			scratch.destroy()
		}
	})

	it('exits 1 and writes no file when one edit in another file does not occur exactly once', () => {
		const scratch = createScratch({ prefix: 'orkestrel-patch-fail-' })
		try {
			scratch.write('a.txt', 'one\n')
			scratch.write('b.txt', 'dup dup\n')
			scratch.write(
				'edits.md',
				renderEditFile([
					{ path: 'a.txt', reason: 'fine', before: 'one', after: '1' },
					{ path: 'b.txt', reason: 'ambiguous', before: 'dup', after: 'x' },
				]),
			)
			const run = runSkillScript(PATCH_SCRIPT, ['edits.md', '--apply'], { cwd: scratch.path })
			expect(run.status).toBe(1)
			expect(run.stdout).toContain('#2 FAIL b.txt: old text occurs 2 times')
			expect(run.stdout).toContain('nothing written')
			expect(scratch.read('a.txt')).toBe('one\n')
			expect(scratch.read('b.txt')).toBe('dup dup\n')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a missing edit file, no mode, two modes, a stray line, and an empty file with exit 64', () => {
		const scratch = createScratch({ prefix: 'orkestrel-patch-usage-' })
		try {
			scratch.write('a.txt', 'one\n')
			const edits = renderEditFile([{ path: 'a.txt', reason: 'r', before: 'one', after: '1' }])
			scratch.write('edits.md', edits)
			scratch.write('stray.md', `${edits}\n### b.txt\nreason: half a block\n`)
			scratch.write('empty.md', 'nothing\n')
			const cwd = { cwd: scratch.path }
			expect(runSkillScript(PATCH_SCRIPT, [], cwd).status).toBe(64)
			expect(runSkillScript(PATCH_SCRIPT, ['edits.md'], cwd).status).toBe(64)
			expect(runSkillScript(PATCH_SCRIPT, ['edits.md', '--plan', '--apply'], cwd).status).toBe(64)
			expect(runSkillScript(PATCH_SCRIPT, ['--plan'], cwd).status).toBe(64)
			const gone = runSkillScript(PATCH_SCRIPT, ['gone.md', '--plan'], cwd)
			expect(gone.status).toBe(64)
			expect(gone.stderr).toContain('"gone.md"')
			const stray = runSkillScript(PATCH_SCRIPT, ['stray.md', '--plan'], cwd)
			expect(stray.status).toBe(64)
			expect(stray.stderr).toContain('"### b.txt"')
			const empty = runSkillScript(PATCH_SCRIPT, ['empty.md', '--plan'], cwd)
			expect(empty.status).toBe(64)
			expect(empty.stderr).toContain('no complete edit block')
			expect(scratch.read('a.txt')).toBe('one\n')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown flag, the --flag=value form, a skip with no value, and a skip naming no edit', () => {
		const scratch = createScratch({ prefix: 'orkestrel-patch-flags-' })
		try {
			scratch.write('a.txt', 'one\n')
			scratch.write(
				'edits.md',
				renderEditFile([{ path: 'a.txt', reason: 'r', before: 'one', after: '1' }]),
			)
			const cwd = { cwd: scratch.path }
			const unknown = runSkillScript(PATCH_SCRIPT, ['edits.md', '--apply', '--no-such-flag'], cwd)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--no-such-flag')
			const joined = runSkillScript(PATCH_SCRIPT, ['edits.md', '--apply', '--skip=1'], cwd)
			expect(joined.status).toBe(64)
			expect(joined.stderr).toContain('--skip=1')
			const bare = runSkillScript(PATCH_SCRIPT, ['edits.md', '--skip', '--apply'], cwd)
			expect(bare.status).toBe(64)
			expect(bare.stderr).toContain('--skip given with no value')
			const range = runSkillScript(PATCH_SCRIPT, ['edits.md', '--apply', '--skip', '2'], cwd)
			expect(range.status).toBe(64)
			expect(range.stderr).toContain('edits 1 to 1')
			expect(scratch.read('a.txt')).toBe('one\n')
		} finally {
			scratch.destroy()
		}
	})
})
