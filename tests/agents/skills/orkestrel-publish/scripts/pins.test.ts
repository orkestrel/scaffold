import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import {
	BINARY,
	buildRangeLiteral,
	buildVersionLiteral,
	buildVersionPattern,
	COMPARATOR,
	escapePattern,
	listFiles,
	normalizeSlashes,
	readMissingFlags,
	readOption,
	readOptions,
	readUnknownFlags,
	sweepFile,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/pins.ts'
import { runSkillScript, PINS_SCRIPT } from '../../../../setupServer.js'

describe('pins.ts', () => {
	it('bounds a version literal and a single-comparator range version by digits and dots', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-' })
		try {
			scratch.write(
				'src/a.ts',
				['"~0.0.7"', '"0.0.770"', '"^0.0.16"', '"^0.0.160"', '"~0.0.16"', '"0.0.7"'].join('\n'),
			)
			scratch.write('tests/b.ts', '// nothing\n')
			scratch.write('guides/c.md', 'nothing\n')
			const run = runSkillScript(
				PINS_SCRIPT,
				['--version', '0.0.7', '--range', '^0.0.16', '--json'],
				{
					cwd: scratch.path,
				},
			)
			expect(run.status).toBe(3)
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits.map((hit) => (isRecord(hit) ? hit.line : undefined))).toEqual([1, 3, 5, 6])
			expect(run.json?.skipped).toEqual([])
			const text = runSkillScript(PINS_SCRIPT, ['--version', '0.0.7', '--paths', 'src'], {
				cwd: scratch.path,
			})
			expect(text.status).toBe(3)
			expect(text.stdout).toContain('pins: 2 hit(s) for 0.0.7 under src')
			expect(
				runSkillScript(PINS_SCRIPT, ['--version', '9.9.9'], { cwd: scratch.path }).status,
			).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('sweeps guides beside source and tests by default, so a guide fence keeps no prior version', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-guides-' })
		try {
			scratch.write('src/server/constants.ts', "export const VERSION = '0.0.31'\n")
			scratch.write('tests/a.test.ts', '// nothing\n')
			scratch.write('guides/browser.md', '```ts\nconst creator = { version: "0.0.30" }\n```\n')
			const run = runSkillScript(PINS_SCRIPT, ['--version', '0.0.30', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			expect(run.json?.paths).toEqual(['src', 'tests', 'guides'])
			expect(run.json?.hits).toEqual([
				{
					path: 'guides/browser.md',
					line: 2,
					literal: '0.0.30',
					text: 'const creator = { version: "0.0.30" }',
				},
			])
			const scoped = runSkillScript(PINS_SCRIPT, ['--version', '0.0.30', '--paths', 'src,tests'], {
				cwd: scratch.path,
			})
			expect(scoped.status).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('names a requested path that is not a directory and refuses a call with no literal or a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-usage-' })
		try {
			scratch.write('src/a.ts', '"0.0.7"\n')
			const skipped = runSkillScript(
				PINS_SCRIPT,
				['--version', '0.0.7', '--paths', 'src,nowhere', '--json'],
				{ cwd: scratch.path },
			)
			expect(skipped.status).toBe(3)
			expect(skipped.json?.skipped).toEqual(['nowhere'])
			expect(skipped.stderr).toContain('nowhere is not a directory; skipped')
			expect(runSkillScript(PINS_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(PINS_SCRIPT, ['--version'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(PINS_SCRIPT, ['--range', '--json'], { cwd: scratch.path }).status).toBe(
				64,
			)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a flag it does not read, the equals form included, before it sweeps', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-unknown-' })
		try {
			scratch.write('src/a.ts', '"0.0.7"\n')
			for (const argv of [
				['--version', '0.0.7', '--bogus'],
				['--version=0.0.7'],
				['--version', '0.0.7', '--json=1'],
				['--version', '0.0.7', '--paths=src'],
				['--version', '0.0.7', '--range=^0.0.7'],
			]) {
				const run = runSkillScript(PINS_SCRIPT, argv, { cwd: scratch.path })
				expect([argv, run.status]).toStrictEqual([argv, 64])
				expect(run.stderr).toContain('pins: unknown flag')
				expect(run.stderr).toContain('usage: pins.ts')
				expect(run.stdout).toBe('')
			}
		} finally {
			scratch.destroy()
		}
	})

	it('sweeps a single-comparator range for its bare version in any form', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-forms-' })
		try {
			scratch.write(
				'tests/CLI.test.ts',
				[
					'"vite": "^8.3.0",',
					"expect(range).toBe('~8.3.0')",
					"'while the registry serves 8.3.0 within major 8.'",
					"latest: '8.3.0',",
				].join('\n'),
			)
			scratch.write('src/near.ts', ['"18.3.0"', '"8.3.01"', '"8.3.0.1"', '"^8.3.1"'].join('\n'))
			const run = runSkillScript(PINS_SCRIPT, ['--range', '^8.3.0', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(
				hits.map((hit) => (isRecord(hit) ? `${String(hit.path)}:${String(hit.line)}` : undefined)),
			).toEqual([
				'tests/CLI.test.ts:1',
				'tests/CLI.test.ts:2',
				'tests/CLI.test.ts:3',
				'tests/CLI.test.ts:4',
			])
			expect(hits.map((hit) => (isRecord(hit) ? hit.literal : undefined))).toEqual([
				'^8.3.0',
				'^8.3.0',
				'^8.3.0',
				'^8.3.0',
			])
			const near = runSkillScript(PINS_SCRIPT, ['--range', '^8.3.0', '--paths', 'src'], {
				cwd: scratch.path,
			})
			expect(near.status).toBe(0)
			expect(near.stdout).toContain('pins: 0 hit(s) for ^8.3.0 under src')
		} finally {
			scratch.destroy()
		}
	})

	it('sweeps a compound range as its literal', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-compound-' })
		try {
			scratch.write(
				'src/a.ts',
				['"range": ">=1.2.0 <2.0.0"', '"floor": "1.2.0"', '"range": ">=1.2.0 <2.0.00"'].join('\n'),
			)
			const run = runSkillScript(PINS_SCRIPT, ['--range', '>=1.2.0 <2.0.0', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits.map((hit) => (isRecord(hit) ? hit.line : undefined))).toEqual([1])
		} finally {
			scratch.destroy()
		}
	})

	it('sweeps an x-range as its literal and misses it after another range operator', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-operator-' })
		try {
			scratch.write(
				'src/a.ts',
				['"range": "8.x"', '"range": "^8.x"', '"range": ">=8.x"'].join('\n'),
			)
			const run = runSkillScript(PINS_SCRIPT, ['--range', '8.x', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits.map((hit) => (isRecord(hit) ? hit.line : undefined))).toEqual([1])
		} finally {
			scratch.destroy()
		}
	})

	it('prints a line matched by both the version and a range once and names the version literal', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-once-' })
		try {
			scratch.write('src/a.ts', ['"^8.3.0"', '"0.0.7"'].join('\n'))
			const run = runSkillScript(
				PINS_SCRIPT,
				['--version', '8.3.0', '--range', '^8.3.0', '--json'],
				{
					cwd: scratch.path,
				},
			)
			expect(run.status).toBe(3)
			expect(run.json?.literals).toEqual(['8.3.0', '^8.3.0'])
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits).toEqual([{ path: 'src/a.ts', line: 1, literal: '8.3.0', text: '"^8.3.0"' }])
			const text = runSkillScript(PINS_SCRIPT, ['--version', '8.3.0', '--range', '^8.3.0'], {
				cwd: scratch.path,
			})
			expect(text.status).toBe(3)
			expect(text.stdout.split(/\r?\n/u).filter((line) => /^\S+:\d+: /u.test(line))).toEqual([
				'src/a.ts:1: "^8.3.0"',
			])
			expect(text.stdout).toContain('pins: 1 hit(s) for 8.3.0, ^8.3.0 under src')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the literal patterns', () => {
	it('escapes every regular expression metacharacter', () => {
		expect(escapePattern('1.0.0')).toBe('1\\.0\\.0')
		expect(escapePattern('a*b+c?d')).toBe('a\\*b\\+c\\?d')
		expect(escapePattern('^[x]$(y){z}|\\')).toBe('\\^\\[x\\]\\$\\(y\\)\\{z\\}\\|\\\\')
		expect(new RegExp(escapePattern('1.0.0'), 'u').test('1x0x0')).toBe(false)
	})

	it('bounds a version by characters other than digits and dots', () => {
		const { pattern } = buildVersionLiteral('0.0.7')
		expect(pattern.source).toBe(buildVersionPattern('0.0.7').source)
		for (const line of ['"~0.0.7"', '0.0.7', 'v0.0.7', ' 0.0.7,', 'serves 0.0.7 today']) {
			expect([line, pattern.test(line)]).toStrictEqual([line, true])
		}
		for (const line of ['0.0.770', '10.0.7', '0.0.7.1', '1.0.0.7', '0.0.70']) {
			expect([line, pattern.test(line)]).toStrictEqual([line, false])
		}
	})

	it('matches a one-comparator range by its bare version and any other range by its text', () => {
		expect(COMPARATOR.exec('^8.3.0')?.[1]).toBe('8.3.0')
		expect(COMPARATOR.exec('v8.3.0')?.[1]).toBe('8.3.0')
		expect(COMPARATOR.exec('>=8.3.0')?.[1]).toBe('8.3.0')
		expect(COMPARATOR.exec('8.3.0-rc.1')?.[1]).toBe('8.3.0-rc.1')
		expect(COMPARATOR.exec('>=1.2.0 <2.0.0')).toBeNull()
		expect(COMPARATOR.exec('8.x')).toBeNull()
		const caret = buildRangeLiteral('^8.3.0')
		expect(caret.literal).toBe('^8.3.0')
		for (const line of ['"^8.3.0"', '~8.3.0', 'serves 8.3.0']) {
			expect([line, caret.pattern.test(line)]).toStrictEqual([line, true])
		}
		for (const line of ['^8.3.1', '18.3.0', '8.3.01']) {
			expect([line, caret.pattern.test(line)]).toStrictEqual([line, false])
		}
		const compound = buildRangeLiteral('>=1.2.0 <2.0.0')
		expect(compound.pattern.test('"range": ">=1.2.0 <2.0.0"')).toBe(true)
		expect(compound.pattern.test('=>=1.2.0 <2.0.0')).toBe(false)
		expect(compound.pattern.test('>=1.2.0 <2.0.00')).toBe(false)
		expect(compound.pattern.test('1.2.0')).toBe(false)
	})

	it('skips the extensions it reads as binary and no other', () => {
		expect(BINARY.test('logo.png')).toBe(true)
		expect(BINARY.test('dist/app.wasm')).toBe(true)
		expect(BINARY.test('archive.tgz')).toBe(true)
		expect(BINARY.test('png')).toBe(false)
		expect(BINARY.test('notes.png.md')).toBe(false)
		expect(BINARY.test('index.ts')).toBe(false)
	})

	it('finds the lines of a file, names the first literal that matched, and skips a file holding a NUL', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-sweep-' })
		try {
			const text = scratch.write('a.ts', '  "^1.0.0"  \r\nplain\r\n"2.0.0" and "^1.0.0"\n')
			const literals = [buildVersionLiteral('2.0.0'), buildRangeLiteral('^1.0.0')]
			expect(sweepFile(text, literals)).toEqual([
				{ path: text, line: 1, literal: '^1.0.0', text: '"^1.0.0"' },
				{ path: text, line: 3, literal: '2.0.0', text: '"2.0.0" and "^1.0.0"' },
			])
			const binary = scratch.write('b.bin', '"2.0.0"\0')
			expect(sweepFile(binary, literals)).toEqual([])
			expect(sweepFile(scratch.write('c.ts', ''), literals)).toEqual([])
		} finally {
			scratch.destroy()
		}
	})
})

describe('the copied helpers', () => {
	it('reads a flag value, a repeated flag, and treats a following flag as a missing value', () => {
		const argv = ['--version', '1', '--range', '^1', '--range', '^2', '--paths', 'src', '--json']
		expect(readOption(argv, '--paths')).toBe('src')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOptions(argv, '--range')).toEqual(['^1', '^2'])
		expect(readOption(['--paths', '--json', 'x'], '--paths')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readOptions(['--range', '--json', '--range', '^1'], '--range')).toEqual(['^1'])
		expect(
			readMissingFlags(
				['--version', '--json', '--range', 'a', '--paths'],
				['--version', '--range', '--paths'],
			),
		).toEqual(['--version', '--paths'])
		expect(readMissingFlags(['--range', 'a'], ['--version'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(
				['--version=1.0.0', '--json', '--path', 'a', '--paths', 'a'],
				['--version', '--json', '--paths'],
			),
		).toEqual(['--version=1.0.0', '--path'])
		expect(readUnknownFlags(['--version', '5', '--', 'node', '--watch'], ['--version'])).toEqual([])
		expect(readUnknownFlags(['--version', '5', 'path', '-x'], ['--version'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})

	it('normalizes slashes and lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
		const scratch = createScratch({ prefix: 'orkestrel-pins-walk-' })
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
			expect(listFiles(join(scratch.path, 'src')).length).toBe(2)
			expect(listFiles(scratch.path).every((file) => typeof file.modified === 'number')).toBe(true)
			expect(() => listFiles(`${scratch.path}/absent`)).toThrow(/ENOENT/u)
		} finally {
			scratch.destroy()
		}
	})
})
