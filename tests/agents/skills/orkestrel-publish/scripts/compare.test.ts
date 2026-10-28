import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	differs,
	fetchTarball,
	isMaterial,
	listFiles,
	normalizeSlashes,
	parseJsonRecord,
	readField,
	readHeaderText,
	readManifest,
	readMissingFlags,
	readOption,
	readPaxPath,
	readString,
	readTar,
	readUnknownFlags,
	resolveNpm,
	runNpm,
	unpackTar,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/compare.ts'
import {
	buildPaxRecord,
	buildSwapEnvironment,
	buildTarEntry,
	COMPARE_SCRIPT,
	createSwapRegistry,
	runSkillScript,
	spawnSkillScript,
	TAR_END,
	writeSwapPackage,
} from '../../../../setupServer.js'

describe('compare.ts', () => {
	it('rules the material difference between a rebuilt dist and a packed tarball', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({ name: '@fixture/pkg', version: '1.0.0', files: ['dist'] }),
			)
			scratch.write('dist/index.js', 'export const a = 1\n')
			scratch.write('dist/index.js.map', '{"version":3}')
			scratch.write('dist/nested/data.bin', 'b\u0000c')
			const packed = runNpm(['pack', '--pack-destination', scratch.path, '--json'], scratch.path)
			expect(packed.status).toBe(0)
			const tarball = join(scratch.path, 'fixture-pkg-1.0.0.tgz')
			expect(existsSync(tarball)).toBe(true)
			const same = runSkillScript(COMPARE_SCRIPT, ['--tarball', tarball, '--json'], {
				cwd: scratch.path,
			})
			expect(same.status).toBe(0)
			expect(same.json).toMatchObject({
				compared: 2,
				added: [],
				removed: [],
				changed: [],
				material: false,
			})
			scratch.write('dist/index.js', 'export  const a = 1\n\n')
			expect(
				runSkillScript(COMPARE_SCRIPT, ['--tarball', tarball], { cwd: scratch.path }).status,
			).toBe(0)
			// A whitespace-only change to a file that holds a NUL byte is material: `differs` compares
			// such a file on every byte.
			scratch.write('dist/nested/data.bin', 'b\u0000 c')
			const binary = runSkillScript(COMPARE_SCRIPT, ['--tarball', tarball, '--json'], {
				cwd: scratch.path,
			})
			expect(binary.status).toBe(3)
			expect(binary.json).toMatchObject({
				added: [],
				removed: [],
				changed: ['nested/data.bin'],
				material: true,
			})
			scratch.write('dist/nested/data.bin', 'b\u0000c')
			scratch.write('dist/index.js', 'export const a = 2\n')
			scratch.write('dist/extra.js', '')
			scratch.remove('dist/nested/data.bin')
			const moved = runSkillScript(COMPARE_SCRIPT, ['--tarball', tarball, '--json'], {
				cwd: scratch.path,
			})
			expect(moved.status).toBe(3)
			expect(moved.json).toMatchObject({
				added: ['extra.js'],
				removed: ['nested/data.bin'],
				changed: ['index.js'],
				material: true,
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reads the long paths npm writes into a pax header and a ustar prefix', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-long-' })
		try {
			const pax = `${'n'.repeat(120)}.js`
			const prefixed = `${'a'.repeat(60)}/${'b'.repeat(60)}/deep.js`
			scratch.write(
				'package.json',
				JSON.stringify({ name: '@fixture/pkg', version: '1.0.0', files: ['dist'] }),
			)
			scratch.write('dist/index.js', 'export const a = 1\n')
			scratch.write(`dist/${pax}`, 'export const b = 1\n')
			scratch.write(`dist/${prefixed}`, 'export const c = 1\n')
			const packed = runNpm(['pack', '--pack-destination', scratch.path, '--json'], scratch.path)
			expect(packed.status).toBe(0)
			const tarball = join(scratch.path, 'fixture-pkg-1.0.0.tgz')
			const same = runSkillScript(COMPARE_SCRIPT, ['--tarball', tarball, '--json'], {
				cwd: scratch.path,
			})
			expect(same.status).toBe(0)
			expect(same.json).toMatchObject({
				compared: 3,
				added: [],
				removed: [],
				changed: [],
				material: false,
			})
			scratch.write(`dist/${pax}`, 'export const b = 2\n')
			scratch.write(`dist/${prefixed}`, 'export const c = 2\n')
			const moved = runSkillScript(COMPARE_SCRIPT, ['--tarball', tarball, '--json'], {
				cwd: scratch.path,
			})
			expect(moved.status).toBe(3)
			expect(moved.json).toMatchObject({
				added: [],
				removed: [],
				changed: [prefixed, pax],
				material: true,
			})
		} finally {
			scratch.destroy()
		}
	})

	it('reads the published tarball through the registry when no tarball file is given', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-registry-' })
		try {
			const directory = writeSwapPackage(scratch.path, 'alpha', {})
			const registry = await createSwapRegistry(scratch.path, [directory])
			try {
				const env = buildSwapEnvironment(scratch.path, registry.url)
				const same = await spawnSkillScript(COMPARE_SCRIPT, ['--json'], { cwd: directory, env })
				expect(same.status).toBe(0)
				expect(same.json).toMatchObject({
					package: '@orkestrel/swapfix-alpha',
					version: '1.0.0',
					compared: 1,
					material: false,
				})
				writeFileSync(join(directory, 'dist', 'index.js'), "export const name = 'rebuilt'\n")
				const moved = await spawnSkillScript(COMPARE_SCRIPT, ['--version', '1.0.0', '--json'], {
					cwd: directory,
					env,
				})
				expect(moved.status).toBe(3)
				expect(moved.json).toMatchObject({
					version: '1.0.0',
					changed: ['index.js'],
					material: true,
				})
				const absent = await spawnSkillScript(COMPARE_SCRIPT, ['--version', '9.9.9'], {
					cwd: directory,
					env,
				})
				expect(absent.status).toBe(2)
				expect(absent.stderr).toContain(
					'the registry served no tarball for @orkestrel/swapfix-alpha@9.9.9',
				)
				const named = await spawnSkillScript(
					COMPARE_SCRIPT,
					['--package', '@orkestrel/swapfix-missing', '--json'],
					{ cwd: directory, env },
				)
				expect(named.status).toBe(2)
				expect(named.stderr).toContain(
					'the registry served no tarball for @orkestrel/swapfix-missing',
				)
			} finally {
				await registry.destroy()
			}
		} finally {
			scratch.destroy()
		}
	})

	it('reports an unreadable or missing tarball as 2 and refuses a malformed manifest, a missing dist, or a tarball flag with no path', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-usage-' })
		try {
			scratch.write('package.json', JSON.stringify({ name: '@fixture/pkg', version: '1.0.0' }))
			scratch.write('dist/index.js', '')
			scratch.write('bad.tgz', 'garbage')
			expect(
				runSkillScript(COMPARE_SCRIPT, ['--tarball', 'bad.tgz'], { cwd: scratch.path }).status,
			).toBe(2)
			expect(
				runSkillScript(COMPARE_SCRIPT, ['--tarball', 'absent.tgz'], { cwd: scratch.path }).status,
			).toBe(2)
			expect(runSkillScript(COMPARE_SCRIPT, ['--tarball'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(COMPARE_SCRIPT, ['--tarball', 'bad.tgz', '--dist', 'nowhere'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			scratch.write('package.json', '{ this is not json')
			expect(
				runSkillScript(COMPARE_SCRIPT, ['--tarball', 'bad.tgz'], { cwd: scratch.path }).status,
			).toBe(64)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a flag it does not read, the equals form included, before any work', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-unknown-' })
		try {
			scratch.write('package.json', JSON.stringify({ name: '@fixture/pkg', version: '1.0.0' }))
			scratch.write('dist/index.js', '')
			scratch.write('bad.tgz', 'garbage')
			for (const argv of [
				['--bogus'],
				['--tarball=bad.tgz'],
				['--json=true'],
				['--tarball', 'bad.tgz', '--dist=dist'],
				['--package=@fixture/pkg'],
			]) {
				const run = runSkillScript(COMPARE_SCRIPT, argv, { cwd: scratch.path })
				expect([argv, run.status]).toStrictEqual([argv, 64])
				expect(run.stderr).toContain('compare: unknown flag')
				expect(run.stderr).toContain('usage: compare.ts')
				expect(run.stdout).toBe('')
			}
		} finally {
			scratch.destroy()
		}
	})
})

describe('the material rule', () => {
	it('rules a text file by its non-whitespace content and a file holding a NUL by its bytes', () => {
		expect(differs(Buffer.from('a b\n'), Buffer.from('a  b'))).toBe(false)
		expect(differs(Buffer.from('ab'), Buffer.from('ac'))).toBe(true)
		expect(differs(Buffer.from('b\0c'), Buffer.from('b\0c'))).toBe(false)
		expect(differs(Buffer.from('b\0c'), Buffer.from('b\0 c'))).toBe(true)
		expect(differs(Buffer.from('b\0c'), Buffer.from('b c'))).toBe(true)
		expect(differs(Buffer.alloc(0), Buffer.alloc(0))).toBe(false)
	})

	it('leaves sourcemaps out of the comparison and nothing else', () => {
		expect(isMaterial('index.js')).toBe(true)
		expect(isMaterial('index.js.map')).toBe(false)
		expect(isMaterial('maps/index.js')).toBe(true)
		expect(isMaterial('map')).toBe(true)
	})
})

describe('the tar reader', () => {
	it('reads npm values and header fields', () => {
		expect(readField('"1.2.3"')).toBe('1.2.3')
		expect(readField('1.2.3')).toBe('1.2.3')
		expect(readField('""')).toBeUndefined()
		expect(readField('')).toBeUndefined()
		const header = Buffer.alloc(16)
		header.write('abc', 4)
		expect(readHeaderText(header, 4, 8)).toBe('abc')
		expect(readHeaderText(Buffer.from('abcdef'), 0, 3)).toBe('abc')
		expect(readHeaderText(header, 0, 4)).toBe('')
	})

	it('reads the path record of a pax header, past records it skips, and refuses a malformed one', () => {
		const value = 'x'.repeat(120)
		expect(readPaxPath(buildPaxRecord('path', value))).toBe(value)
		const skipped = Buffer.concat([buildPaxRecord('mtime', '1.5'), buildPaxRecord('path', value)])
		expect(readPaxPath(skipped)).toBe(value)
		expect(readPaxPath(buildPaxRecord('mtime', '1.5'))).toBeUndefined()
		expect(readPaxPath(Buffer.alloc(0))).toBeUndefined()
		expect(readPaxPath(Buffer.from('zz path=x\n'))).toBeUndefined()
		expect(readPaxPath(Buffer.from('0 path=x\n'))).toBeUndefined()
		for (const length of [1, 85, 90, 91, 92, 100, 1000]) {
			const sized = 'y'.repeat(length)
			expect([length, readPaxPath(buildPaxRecord('path', sized))]).toStrictEqual([length, sized])
		}
	})

	it('reads regular files from a ustar name, a ustar prefix, a pax path, and a GNU long name', () => {
		const long = 'p'.repeat(120)
		const archive = Buffer.concat([
			buildTarEntry('package/a.txt', Buffer.from('a')),
			buildTarEntry('b.txt', Buffer.from('b'), '0', 'package/dist/deep'),
			buildTarEntry('pax-header', buildPaxRecord('path', `package/dist/${long}.js`), 'x'),
			buildTarEntry('truncated-name', Buffer.from('c')),
			buildTarEntry('././@LongLink', Buffer.from(`package/dist/${long}.cjs\0`), 'L'),
			buildTarEntry('truncated-too', Buffer.from('d')),
			buildTarEntry('package/dir/', Buffer.alloc(0), '5'),
			buildTarEntry('package/after.txt', Buffer.from('e')),
			TAR_END,
			buildTarEntry('package/past-the-end.txt', Buffer.from('f')),
		])
		const files = readTar(archive)
		expect([...files.keys()]).toStrictEqual([
			'package/a.txt',
			'package/dist/deep/b.txt',
			`package/dist/${long}.js`,
			`package/dist/${long}.cjs`,
			'package/after.txt',
		])
		expect(files.get(`package/dist/${long}.js`)?.toString()).toBe('c')
		expect(files.get(`package/dist/${long}.cjs`)?.toString()).toBe('d')
	})

	it('lets a later entry replace an earlier one at the earlier position', () => {
		const files = readTar(
			Buffer.concat([
				buildTarEntry('package/x', Buffer.from('1')),
				buildTarEntry('package/y', Buffer.from('y')),
				buildTarEntry('package/x', Buffer.from('2')),
				TAR_END,
			]),
		)
		expect([...files.keys()]).toStrictEqual(['package/x', 'package/y'])
		expect(files.get('package/x')?.toString()).toBe('2')
	})

	it('unpacks a gzip archive and returns the error that stopped an unreadable one', () => {
		const packed = unpackTar(
			gzipSync(Buffer.concat([buildTarEntry('package/a.txt', Buffer.from('a')), TAR_END])),
		)
		if (packed instanceof Error) throw packed
		expect([...packed.keys()]).toStrictEqual(['package/a.txt'])
		expect(unpackTar(Buffer.from('garbage'))).toBeInstanceOf(Error)
	})

	it('reports a fetch that cannot connect as no archive', async () => {
		expect(await fetchTarball('http://127.0.0.1:1/missing.tgz')).toBeUndefined()
	})
})

describe('the copied helpers', () => {
	it('reads a flag value, treats a following flag as a missing value, and keeps the first occurrence', () => {
		expect(readOption(['--package', 'demo', '--json'], '--package')).toBe('demo')
		expect(readOption(['--package', 'demo'], '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOption(['--dist', '--json', 'x'], '--dist')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(
			readMissingFlags(
				['--package', '--json', '--version', 'a', '--dist'],
				['--package', '--version', '--dist'],
			),
		).toEqual(['--package', '--dist'])
		expect(readMissingFlags(['--version', 'a'], ['--package'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(
				['--package=@fixture/pkg', '--json', '--project', 'a', '--version', '1'],
				['--package', '--json', '--version'],
			),
		).toEqual(['--package=@fixture/pkg', '--project'])
		expect(readUnknownFlags(['--package', 'x', '--', 'node', '--watch'], ['--package'])).toEqual([])
		expect(readUnknownFlags(['--package', 'x', 'path', '-x'], ['--package'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})

	it('normalizes slashes and parses a whole document as one record', () => {
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
		expect(parseJsonRecord('{\n\t"name": "@fixture/pkg"\n}\n')).toEqual({ name: '@fixture/pkg' })
		expect(parseJsonRecord('[1]')).toBeUndefined()
		expect(parseJsonRecord('not json')).toBeUndefined()
		expect(parseJsonRecord('')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
	})

	it('reads the name and version a manifest declares and answers undefined for an absent or unreadable one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-manifest-' })
		try {
			expect(readManifest(scratch.path)).toEqual({ name: undefined, version: undefined })
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			expect(readManifest(scratch.path)).toEqual({ name: '@fixture/pkg', version: '1.0.0' })
			scratch.write('package.json', '{"name":"@fixture/pkg"}')
			expect(readManifest(scratch.path)).toEqual({ name: '@fixture/pkg', version: undefined })
			scratch.write('package.json', '{ this is not json')
			expect(readManifest(scratch.path)).toEqual({ name: undefined, version: undefined })
		} finally {
			scratch.destroy()
		}
	})

	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-walk-' })
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

	it('resolves an npm command that answers', () => {
		const npm = resolveNpm()
		expect(npm.prefix.length === 0 || existsSync(npm.prefix[0] ?? '')).toBe(true)
		const result = runNpm(['--version'])
		expect(result.status).toBe(0)
		expect(/^\d+\.\d+\.\d+/u.test(result.stdout.trim())).toBe(true)
	})
})
