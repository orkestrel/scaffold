import { describe, expect, it } from 'vitest'
import { isArray, isRecord, isString } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-dispatch/scripts/cite.ts'

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
			const run = runSkillScript(SCRIPT, ['report.md', '--json'], { cwd: scratch.path })
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
			const run = runSkillScript(SCRIPT, ['report.md'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.stdout).toContain('cite: 1 citation(s) in report.md, 0 unresolved')
			expect(runSkillScript(SCRIPT, ['absent.md'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['report.md', '--root'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
		} finally {
			scratch.destroy()
		}
	})
})
