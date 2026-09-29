import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-publish/scripts/pins.ts'

describe('pins.ts', () => {
	it('bounds a version literal and a single-comparator range version by digits and dots', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-' })
		try {
			scratch.write(
				'src/a.ts',
				['"~0.0.7"', '"0.0.770"', '"^0.0.16"', '"^0.0.160"', '"~0.0.16"', '"0.0.7"'].join('\n'),
			)
			scratch.write('tests/b.ts', '// nothing\n')
			const run = runSkillScript(SCRIPT, ['--version', '0.0.7', '--range', '^0.0.16', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits.map((hit) => (isRecord(hit) ? hit.line : undefined))).toEqual([1, 3, 5, 6])
			expect(run.json?.skipped).toEqual([])
			const text = runSkillScript(SCRIPT, ['--version', '0.0.7', '--paths', 'src'], {
				cwd: scratch.path,
			})
			expect(text.status).toBe(3)
			expect(text.stdout).toContain('pins: 2 hit(s) for 0.0.7 under src')
			expect(runSkillScript(SCRIPT, ['--version', '9.9.9'], { cwd: scratch.path }).status).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('names a requested path that is not a directory and refuses a call with no literal or a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-pins-usage-' })
		try {
			scratch.write('src/a.ts', '"0.0.7"\n')
			const skipped = runSkillScript(
				SCRIPT,
				['--version', '0.0.7', '--paths', 'src,nowhere', '--json'],
				{ cwd: scratch.path },
			)
			expect(skipped.status).toBe(3)
			expect(skipped.json?.skipped).toEqual(['nowhere'])
			expect(skipped.stderr).toContain('nowhere is not a directory; skipped')
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--version'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--range', '--json'], { cwd: scratch.path }).status).toBe(64)
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
			const run = runSkillScript(SCRIPT, ['--range', '^8.3.0', '--json'], { cwd: scratch.path })
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
			const near = runSkillScript(SCRIPT, ['--range', '^8.3.0', '--paths', 'src'], {
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
			const run = runSkillScript(SCRIPT, ['--range', '>=1.2.0 <2.0.0', '--json'], {
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
			const run = runSkillScript(SCRIPT, ['--range', '8.x', '--json'], { cwd: scratch.path })
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
			const run = runSkillScript(SCRIPT, ['--version', '8.3.0', '--range', '^8.3.0', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			expect(run.json?.literals).toEqual(['8.3.0', '^8.3.0'])
			const hits = run.json?.hits
			if (!isArray(hits)) throw new Error('The summary carries no hits')
			expect(hits).toEqual([{ path: 'src/a.ts', line: 1, literal: '8.3.0', text: '"^8.3.0"' }])
			const text = runSkillScript(SCRIPT, ['--version', '8.3.0', '--range', '^8.3.0'], {
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
