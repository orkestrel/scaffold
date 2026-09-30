import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { runNpm } from '../../../../../.agents/skills/orkestrel-dispatch/scripts/helpers.ts'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-publish/scripts/compare.ts'

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
			const same = runSkillScript(SCRIPT, ['--tarball', tarball, '--json'], { cwd: scratch.path })
			expect(same.status).toBe(0)
			expect(same.json).toMatchObject({
				compared: 2,
				added: [],
				removed: [],
				changed: [],
				material: false,
			})
			scratch.write('dist/index.js', 'export  const a = 1\n\n')
			expect(runSkillScript(SCRIPT, ['--tarball', tarball], { cwd: scratch.path }).status).toBe(0)
			scratch.write('dist/index.js', 'export const a = 2\n')
			scratch.write('dist/extra.js', '')
			scratch.remove('dist/nested/data.bin')
			const moved = runSkillScript(SCRIPT, ['--tarball', tarball, '--json'], { cwd: scratch.path })
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

	it('reports an unreadable or missing tarball as 2 and refuses a malformed manifest, a missing dist, or a tarball flag with no path', () => {
		const scratch = createScratch({ prefix: 'orkestrel-compare-usage-' })
		try {
			scratch.write('package.json', JSON.stringify({ name: '@fixture/pkg', version: '1.0.0' }))
			scratch.write('dist/index.js', '')
			scratch.write('bad.tgz', 'garbage')
			expect(runSkillScript(SCRIPT, ['--tarball', 'bad.tgz'], { cwd: scratch.path }).status).toBe(2)
			expect(
				runSkillScript(SCRIPT, ['--tarball', 'absent.tgz'], { cwd: scratch.path }).status,
			).toBe(2)
			expect(runSkillScript(SCRIPT, ['--tarball'], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--tarball', 'bad.tgz', '--dist', 'nowhere'], { cwd: scratch.path })
					.status,
			).toBe(64)
			scratch.write('package.json', '{ this is not json')
			expect(runSkillScript(SCRIPT, ['--tarball', 'bad.tgz'], { cwd: scratch.path }).status).toBe(
				64,
			)
		} finally {
			scratch.destroy()
		}
	})
})
