import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	listFiles,
	normalizeSlashes,
	parseJsonRecord,
	readJsonObject,
	readList,
	readMissingFlags,
	readNumber,
	readOption,
	readOptions,
	readString,
	resolveNpm,
	runNpm,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/helpers.ts'

describe('the argument readers', () => {
	it('reads a flag value, a repeated flag, and a list up to the next flag', () => {
		const argv = ['--unit', 'demo', '--range', '^1', '--range', '^2', '--tree', 'a', 'b', '--json']
		expect(readOption(argv, '--unit')).toBe('demo')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOptions(argv, '--range')).toEqual(['^1', '^2'])
		expect(readList(argv, '--tree')).toEqual(['a', 'b'])
		expect(readList(argv, '--absent')).toEqual([])
	})

	it('treats a following flag as a missing value and keeps the first occurrence', () => {
		expect(readOption(['--journal', '--errors', 'x'], '--journal')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readOptions(['--range', '--json', '--range', '^1'], '--range')).toEqual(['^1'])
		expect(
			readMissingFlags(
				['--config', '--json', '--out', 'a', '--refs'],
				['--config', '--out', '--refs'],
			),
		).toEqual(['--config', '--refs'])
		expect(readMissingFlags(['--out', 'a'], ['--config'])).toEqual([])
	})
})

describe('the record readers', () => {
	it('reads the last JSON object line and typed members', () => {
		expect(readJsonObject('noise\n{"a":1,"b":"x"}\n\n')).toEqual({ a: 1, b: 'x' })
		expect(readJsonObject('{"a":1}\n[1]\n')).toBeUndefined()
		expect(readJsonObject('')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
		expect(readNumber({ a: 1 }, 'a')).toBe(1)
		expect(readNumber({ a: Number.NaN }, 'a')).toBeUndefined()
		expect(readNumber({ a: Number.POSITIVE_INFINITY }, 'a')).toBeUndefined()
		expect(readNumber({ a: '1' }, 'a')).toBeUndefined()
	})

	it('parses a whole formatted document where the line reader reads the last line alone', () => {
		const formatted = '{\n\t"name": "@fixture/pkg",\n\t"version": "1.0.0"\n}\n'
		expect(parseJsonRecord(formatted)).toEqual({ name: '@fixture/pkg', version: '1.0.0' })
		expect(readJsonObject(formatted)).toBeUndefined()
		expect(parseJsonRecord('[1]')).toBeUndefined()
		expect(parseJsonRecord('not json')).toBeUndefined()
		expect(parseJsonRecord('')).toBeUndefined()
	})

	it('normalizes slashes', () => {
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
	})
})

describe('the tree walk', () => {
	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-helpers-walk-' })
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
})

describe('the npm command', () => {
	it('resolves an npm command that answers', () => {
		const npm = resolveNpm()
		expect(npm.prefix.length === 0 || existsSync(npm.prefix[0] ?? '')).toBe(true)
		const result = runNpm(['--version'])
		expect(result.status).toBe(0)
		expect(/^\d+\.\d+\.\d+/u.test(result.stdout.trim())).toBe(true)
	})
})
