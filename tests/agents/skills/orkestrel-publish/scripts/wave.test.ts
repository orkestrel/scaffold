import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord, isString } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, WORKSPACE_ROOT } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-publish/scripts/wave.ts'
const STEPS = [
	'pin',
	'commit',
	'overwrite',
	'verify',
	'install',
	'pins',
	'format',
	'gates',
	'compare',
]

describe('wave.ts', () => {
	it('prints the layer order from the catalog table and refuses a table it cannot find', () => {
		const plan = runSkillScript(SCRIPT, ['--plan', '--json'], { cwd: WORKSPACE_ROOT })
		expect(plan.status).toBe(0)
		expect(
			isRecord(plan.json) &&
				isArray(plan.json.L0) &&
				plan.json.L0.some((entry) => isString(entry) && entry.startsWith('@orkestrel/contract')),
		).toBe(true)
		const text = runSkillScript(SCRIPT, ['--plan'], { cwd: WORKSPACE_ROOT })
		expect(text.status).toBe(0)
		expect(text.stdout.startsWith('L0\t@orkestrel/contract')).toBe(true)
		const scratch = createScratch({ prefix: 'orkestrel-wave-plan-' })
		try {
			expect(runSkillScript(SCRIPT, ['--plan'], { cwd: scratch.path }).status).toBe(2)
			scratch.write(
				'table.md',
				'<!-- orkestrel:catalog -->\n| `@orkestrel/one` | `1.0.0` | L1 | | |\n| `@orkestrel/zero` | `0.1.0` | L0 | | |\n<!-- /orkestrel:catalog -->\n',
			)
			const custom = runSkillScript(SCRIPT, ['--plan', '--catalog', 'table.md', '--json'], {
				cwd: scratch.path,
			})
			expect(custom.status).toBe(0)
			expect(custom.json).toEqual({ L0: ['@orkestrel/zero 0.1.0'], L1: ['@orkestrel/one 1.0.0'] })
		} finally {
			scratch.destroy()
		}
	})

	it('dry-runs a visit as the ordered command list without running a command, and slices it with --from and --to', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-visit-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify(
					{
						name: '@fixture/pkg',
						version: '1.0.0',
						dependencies: { '@orkestrel/contract': '^0.0.1' },
					},
					null,
					'\t',
				),
			)
			scratch.write('dist/bin/main.js', '')
			const run = runSkillScript(SCRIPT, ['--visit', '--dry-run', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			const steps = run.json?.steps
			if (!isArray(steps)) throw new Error('The visit carries no steps')
			const names = steps.map((step) => (isRecord(step) ? step.step : ''))
			expect([...new Set(names)]).toEqual(STEPS)
			expect(
				steps.every((step) => isRecord(step) && (step.exit === undefined || step.exit === 0)),
			).toBe(true)
			expect(
				steps.filter((step) => isRecord(step) && step.note === 'dry run').length,
			).toBeGreaterThan(8)
			expect(isRecord(run.json?.ruling) && run.json.ruling.rangesMoved === undefined).toBe(true)
			expect(
				isString(run.json?.row) && run.json.row.startsWith('| @fixture/pkg | 1.0.0 | unanswered |'),
			).toBe(true)
			const text = runSkillScript(SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path })
			expect(text.status).toBe(0)
			expect(text.stdout).toContain(
				'git commit --only -m Re-pin the @orkestrel ranges for the release visit -- package.json package-lock.json',
			)
			expect(text.stdout).toContain('audit --json')
			expect(text.stdout).toContain('--version 1.0.0')
			expect(text.stdout).toContain(`${join('orkestrel-publish', 'scripts', 'pins.ts')} --version`)
			expect(text.stdout).toContain('npm view @fixture/pkg --json')
			expect(text.stdout).toContain('wave: ruling dist unanswered, ranges unanswered')
			const prior = runSkillScript(SCRIPT, ['--visit', '--dry-run', '--prior', '0.9.0'], {
				cwd: scratch.path,
			})
			expect(prior.status).toBe(0)
			expect(prior.stdout).toContain('--version 0.9.0')
			expect(prior.stdout).not.toContain('--version 1.0.0')
			const offline = runSkillScript(
				SCRIPT,
				['--visit', '--dry-run', '--offline', '--from', 'overwrite', '--to', 'overwrite'],
				{ cwd: scratch.path },
			)
			expect(offline.status).toBe(0)
			expect(offline.stdout).toContain('overwrite --json --offline')
			expect(offline.stdout).toContain('audit --offline')
			const sliced = runSkillScript(
				SCRIPT,
				['--visit', '--dry-run', '--from', 'format', '--to', 'gates', '--json'],
				{ cwd: scratch.path },
			)
			const slice = sliced.json?.steps
			if (!isArray(slice)) throw new Error('The sliced visit carries no steps')
			expect(new Set(slice.map((step) => (isRecord(step) ? step.step : '')))).toEqual(
				new Set(['format', 'gates']),
			)
			const written = runSkillScript(
				SCRIPT,
				['--visit', '--dry-run', '--out', 'tmp/units/visit.txt'],
				{ cwd: scratch.path },
			)
			expect(written.status).toBe(0)
			expect(scratch.read('tmp/units/visit.txt')).toContain('wave: ruling')
		} finally {
			scratch.destroy()
		}
	})

	it('skips the overwrite on the scaffold package and reads exit 1 of the verify audit as expected, and fails verify on that exit for any other target', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-self-' })
		try {
			// The recorder stands in for the scaffold executable: it logs each command
			// line and answers a JSON audit with an empty releases envelope and exit 1, the
			// drift exit scaffold's own checkout always reports.
			scratch.write(
				'dist/bin/main.js',
				[
					"const { appendFileSync } = require('node:fs')",
					"const args = process.argv.slice(2).join(' ')",
					"appendFileSync('calls.txt', `${args}\\n`)",
					"if (args.startsWith('audit --json')) {",
					'	process.stdout.write(\'{"releases":[]}\')',
					'	process.exitCode = 1',
					'}',
					'',
				].join('\n'),
			)
			scratch.write('package.json', '{"name":"@orkestrel/scaffold","version":"1.0.0"}')
			const planned = runSkillScript(SCRIPT, ['--visit', '--dry-run', '--json'], {
				cwd: scratch.path,
			})
			expect(planned.status).toBe(0)
			const steps = planned.json?.steps
			if (!isArray(steps)) throw new Error('The visit carries no steps')
			expect([...new Set(steps.map((step) => (isRecord(step) ? step.step : '')))]).toEqual(STEPS)
			const skipped = steps.filter((step) => isRecord(step) && step.step === 'overwrite')
			expect(skipped).toEqual([
				{
					step: 'overwrite',
					command: expect.stringContaining('overwrite --json'),
					durationMs: 0,
					note: 'skipped with its audit: @orkestrel/scaffold is the package whose checkout the vendored host is staged from',
				},
			])
			const own = runSkillScript(SCRIPT, ['--visit', '--from', 'overwrite', '--to', 'verify'], {
				cwd: scratch.path,
			})
			expect(own.status).toBe(0)
			expect(scratch.read('calls.txt')).toBe('audit --json\n')
			scratch.remove('calls.txt')
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const other = runSkillScript(SCRIPT, ['--visit', '--from', 'overwrite', '--to', 'verify'], {
				cwd: scratch.path,
			})
			expect(other.status).toBe(1)
			expect(scratch.read('calls.txt')).toBe('overwrite --json\naudit\naudit --json\n')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown or inverted step range, a flag with no value, a malformed prior version, no mode, two modes, and reports an unreadable target as 2', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-usage-' })
		try {
			scratch.write('dist/bin/main.js', '')
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--plan', '--visit', '--dry-run'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--visit', '--dry-run', '--from', 'bogus'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--visit', '--dry-run', '--from', 'gates', '--to', 'pin'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--visit', '--dry-run', '--target'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status).toBe(2)
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			expect(
				runSkillScript(SCRIPT, ['--visit', '--dry-run', '--prior', 'x'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(SCRIPT, ['--visit', '--dry-run', '--prior'], { cwd: scratch.path }).status,
			).toBe(64)
			scratch.write('package.json', '{ this is not json')
			expect(runSkillScript(SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status).toBe(2)
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			scratch.remove('dist')
			expect(runSkillScript(SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status).toBe(2)
		} finally {
			scratch.destroy()
		}
	})
})
