import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, BRIEF_SCRIPT } from '../../../../setupServer.js'
import {
	extractPaths,
	extractSection,
	LANES,
	readMissingFlags,
	readOption,
	readsAsPath,
	readUnknownFlags,
	REQUIREMENTS,
	resolveBriefPath,
	scanOmissions,
	TEMPLATE,
} from '../../../../../.agents/skills/orkestrel-dispatch/scripts/brief.ts'

const SECTIONS =
	'## Role and engine\n\n`opus` on Opus 5.5.\n\n## Execution\n\nPerform the assignment yourself and spawn nothing.\n'

describe('brief.ts', () => {
	it('refuses an unknown flag and the equals form before it writes or reads anything', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-flags-' })
		try {
			scratch.write('b.md', 'Read `src/present.ts`.\n')
			const unknown = runSkillScript(
				BRIEF_SCRIPT,
				['--unit', 'demo', '--lane', 'units', '--bogus'],
				{ cwd: scratch.path },
			)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--bogus')
			const equals = runSkillScript(BRIEF_SCRIPT, ['--unit=demo', '--lane', 'units'], {
				cwd: scratch.path,
			})
			expect(equals.status).toBe(64)
			expect(equals.stderr).toContain('--unit=demo')
			const check = runSkillScript(BRIEF_SCRIPT, ['--check=b.md'], { cwd: scratch.path })
			expect(check.status).toBe(64)
			expect(check.stdout).toBe('')
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('writes a brief from the template and numbers a successor instead of overwriting', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-' })
		try {
			const first = runSkillScript(
				BRIEF_SCRIPT,
				['--unit', 'demo', '--lane', 'units', '--subject', 'a subject'],
				{ cwd: scratch.path },
			)
			expect(first.status).toBe(0)
			expect(scratch.read('tmp/units/demo-brief.md')).toContain('# Unit demo — a subject')
			expect(scratch.read('tmp/units/demo-brief.md')).not.toContain('UNIT_ID')
			const second = runSkillScript(BRIEF_SCRIPT, ['--unit', 'demo', '--lane', 'units'], {
				cwd: scratch.path,
			})
			expect(second.status).toBe(0)
			expect(scratch.has('tmp/units/demo-brief-2.md')).toBe(true)
			expect(scratch.read('tmp/units/demo-brief.md')).toContain('a subject')
			const bench = runSkillScript(BRIEF_SCRIPT, ['--unit', 'lane', '--lane', 'codex'], {
				cwd: scratch.path,
			})
			expect(bench.status).toBe(0)
			expect(scratch.has('tmp/codex/lane-brief.md')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('checks the slash-bearing paths a brief names, reading a backslash as a slash and stripping a line suffix', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-check-' })
		try {
			scratch.write('src/present.ts', '')
			scratch.write('src/other.ts', '')
			scratch.write(
				'b.md',
				`${SECTIONS}\nRead \`src/present.ts:3\`, \`src\\other.ts\`, and \`src/missing.ts:12–14\`, not \`https://example.test/a/b\`, \`tmp/<lane>/x.md\`, \`OWNED_FILES/x\`, or \`README.md\`.\n`,
			)
			const check = runSkillScript(BRIEF_SCRIPT, ['--check', 'b.md'], { cwd: scratch.path })
			expect(check.status).toBe(3)
			expect(check.json).toMatchObject({ checked: 3, missing: ['src/missing.ts'], omitted: [] })
			scratch.write('src/missing.ts', '')
			expect(runSkillScript(BRIEF_SCRIPT, ['--check', 'b.md'], { cwd: scratch.path }).status).toBe(
				0,
			)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a brief that omits the role section or the spawn-nothing sentence, naming each omission', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-sections-' })
		try {
			scratch.write('bare.md', '# Unit x\n\n## Objective\n\nOne outcome.\n')
			const bare = runSkillScript(BRIEF_SCRIPT, ['--check', 'bare.md'], { cwd: scratch.path })
			expect(bare.status).toBe(3)
			expect(bare.json).toMatchObject({
				checked: 0,
				missing: [],
				omitted: [
					'the "## Role and engine" section',
					'the "## Execution" section with the sentence "Perform the assignment yourself and spawn nothing."',
				],
			})
			expect(bare.stderr).toContain('omits the "## Role and engine" section')
			scratch.write(
				'spawn.md',
				'## Role and engine\n\n`opus`.\n\n## Execution\n\nDelegate the work.\n\n## Output\n\nPerform the assignment yourself and spawn nothing.\n',
			)
			const spawn = runSkillScript(BRIEF_SCRIPT, ['--check', 'spawn.md'], { cwd: scratch.path })
			expect(spawn.status).toBe(3)
			expect(spawn.json).toMatchObject({
				omitted: [
					'the sentence "Perform the assignment yourself and spawn nothing." under "## Execution"',
				],
			})
			scratch.write('whole.md', SECTIONS.replace(/\n/gu, '\r\n'))
			const whole = runSkillScript(BRIEF_SCRIPT, ['--check', 'whole.md'], { cwd: scratch.path })
			expect(whole.status).toBe(0)
			expect(whole.json).toMatchObject({ checked: 0, missing: [], omitted: [] })
		} finally {
			scratch.destroy()
		}
	})

	it('accepts a brief written from the template on the sections it requires', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-template-' })
		try {
			expect(
				runSkillScript(BRIEF_SCRIPT, ['--unit', 'demo', '--lane', 'units'], { cwd: scratch.path })
					.status,
			).toBe(0)
			const check = runSkillScript(BRIEF_SCRIPT, ['--check', 'tmp/units/demo-brief.md'], {
				cwd: scratch.path,
			})
			expect(check.json).toMatchObject({ omitted: [] })
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown lane, a malformed unit, a directory as the check target, a flag with no value, and two modes', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-usage-' })
		try {
			scratch.ensure('adir')
			expect(
				runSkillScript(BRIEF_SCRIPT, ['--unit', 'demo', '--lane', 'moon'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(BRIEF_SCRIPT, ['--unit', 'no/slash', '--lane', 'units'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(runSkillScript(BRIEF_SCRIPT, ['--check', 'adir'], { cwd: scratch.path }).status).toBe(
				64,
			)
			expect(
				runSkillScript(BRIEF_SCRIPT, ['--check', 'absent.md'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(BRIEF_SCRIPT, ['--unit', '--lane', 'units'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(BRIEF_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(
					BRIEF_SCRIPT,
					['--check', 'absent.md', '--unit', 'demo', '--lane', 'units'],
					{
						cwd: scratch.path,
					},
				).status,
			).toBe(64)
			expect(scratch.has('tmp/units')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the path reader', () => {
	it('reads a slash-bearing repository path and refuses a URL, a placeholder, a glob, and a flag form', () => {
		for (const token of ['src/a.ts', 'tmp/units/x-brief.md', '.agents/skills/x', '~/a/b']) {
			expect({ token, path: readsAsPath(token) }).toEqual({ token, path: true })
		}
		for (const token of [
			'https://example.test/a/b',
			'tmp/<lane>/x.md',
			'src/*.ts',
			'a/{b}',
			'with space/x',
			'OWNED_FILES/x',
			'@orkestrel/contract/server',
			'-x/y',
			'$HOME/x',
			'README.md',
			'a/b:c',
			'',
		]) {
			expect({ token, path: readsAsPath(token) }).toEqual({ token, path: false })
		}
	})

	it('extracts each distinct path once, sorted, reading a backslash as a slash and dropping a line suffix', () => {
		const content =
			'Read `src/b.ts`, `src\\a.ts:3`, `src/b.ts:1-2`, `src/c.ts:4–6`, `plain`, and `https://x.test/y/z`.\n'
		expect(extractPaths(content)).toEqual(['src/a.ts', 'src/b.ts', 'src/c.ts'])
		expect(extractPaths('no backticks src/a.ts here')).toEqual([])
		expect(extractPaths('')).toEqual([])
	})
})

describe('the section reader', () => {
	it('reads a level-two section up to the next one, across line endings, and nothing for an absent heading', () => {
		const content = '# T\r\n## Execution  \r\nfirst\r\n### Sub\r\nsecond\r\n## Output\r\nlater\r\n'
		expect(extractSection(content, '## Execution')).toBe('first\n### Sub\nsecond')
		expect(extractSection(content, '## Output')).toBe('later\n')
		expect(extractSection(content, '## Role and engine')).toBeUndefined()
		expect(extractSection('## Executions\n', '## Execution')).toBeUndefined()
		expect(extractSection('', '## Execution')).toBeUndefined()
	})

	it('names each omission in requirement order and reads a sentence wrapped across lines', () => {
		expect(scanOmissions(SECTIONS, REQUIREMENTS)).toEqual([])
		expect(
			scanOmissions(
				'## Role and engine\n\n## Execution\n\nPerform the assignment\nyourself and spawn nothing.\n',
				REQUIREMENTS,
			),
		).toEqual([])
		expect(scanOmissions('## Execution\n', REQUIREMENTS)).toEqual([
			'the "## Role and engine" section',
			'the sentence "Perform the assignment yourself and spawn nothing." under "## Execution"',
		])
		expect(scanOmissions('anything', [])).toEqual([])
	})

	it('requires the sections the template carries, with the sentence written as the template writes it', () => {
		const template = readFileSync(TEMPLATE, 'utf8')
		expect(scanOmissions(template, REQUIREMENTS)).toEqual([])
	})
})

describe('the brief path', () => {
	it('names the first brief, then numbers each successor, and keeps the lane directories and template real', () => {
		const scratch = createScratch({ prefix: 'orkestrel-brief-path-' })
		try {
			expect(resolveBriefPath(scratch.path, 'u')).toBe(join(scratch.path, 'u-brief.md'))
			scratch.write('u-brief.md', '')
			expect(resolveBriefPath(scratch.path, 'u')).toBe(join(scratch.path, 'u-brief-2.md'))
			scratch.write('u-brief-2.md', '')
			expect(resolveBriefPath(scratch.path, 'u')).toBe(join(scratch.path, 'u-brief-3.md'))
			expect(resolveBriefPath(scratch.path, 'other')).toBe(join(scratch.path, 'other-brief.md'))
		} finally {
			scratch.destroy()
		}
		expect(Object.keys(LANES)).toEqual(['units', 'cursor', 'codex', 'claude'])
		expect(existsSync(TEMPLATE)).toBe(true)
	})
})

describe('the argument readers', () => {
	it('reads a flag value and treats a following flag as a missing value, keeping the first occurrence', () => {
		const argv = ['--unit', 'demo', '--lane', 'units', '--check']
		expect(readOption(argv, '--unit')).toBe('demo')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--unit', '--lane', 'x'], '--unit')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readMissingFlags(argv, ['--unit', '--lane', '--check'])).toEqual(['--check'])
		expect(readMissingFlags(['--unit', 'a'], ['--lane'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(['--unit=demo', '--lane', 'units', '--bogus'], ['--unit', '--lane']),
		).toEqual(['--unit=demo', '--bogus'])
		expect(readUnknownFlags(['--unit', 'a', '--', '--watch'], ['--unit'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})
