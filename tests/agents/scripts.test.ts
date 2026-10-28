import { existsSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	BENCH_SCRIPT,
	buildFlagRefusals,
	CASES_SCRIPT,
	MEASURE_SCRIPT,
	MUTATE_SCRIPT,
	PATCH_SCRIPT,
	readBuiltScript,
	readScriptValueFlags,
	readSkillScripts,
	readTreeDigest,
	runScriptFile,
	runSkillScript,
	WORKSPACE_ROOT,
} from '../setupServer.js'

describe('skill scripts', () => {
	it('lists the scripts of every skill that carries them', () => {
		const scripts = readSkillScripts()
		for (const script of [
			BENCH_SCRIPT,
			CASES_SCRIPT,
			MEASURE_SCRIPT,
			MUTATE_SCRIPT,
			PATCH_SCRIPT,
		]) {
			expect(scripts).toContain(script)
		}
		expect(
			scripts.every((script) => /^\.agents\/skills\/[^/]+\/scripts\/[^/]+\.ts$/u.test(script)),
		).toBe(true)
	})

	it('names the built twin of a script under dist/agents', () => {
		expect(readBuiltScript(BENCH_SCRIPT)).toBe(
			'dist/agents/skills/orkestrel-dispatch/scripts/bench.js',
		)
	})

	it('reads the value flags a script declares', () => {
		expect(readScriptValueFlags(BENCH_SCRIPT)).toEqual(['--model', '--cap', '--sandbox'])
		expect(readScriptValueFlags(PATCH_SCRIPT)).toEqual(['--skip'])
	})

	for (const script of readSkillScripts()) {
		it(`${script} refuses an unknown flag and the --flag=value form with exit 64, naming the flag`, () => {
			const scratch = createScratch({ prefix: 'orkestrel-script-flags-' })
			try {
				const cwd = { cwd: scratch.path }
				const unknown = runSkillScript(script, ['--no-such-flag'], cwd)
				expect(unknown.status).toBe(64)
				expect(unknown.stderr).toContain('--no-such-flag')
				const joined = runSkillScript(script, ['--json=1'], cwd)
				expect(joined.status).toBe(64)
				expect(joined.stderr).toContain('--json=1')
			} finally {
				scratch.destroy()
			}
		})

		it(`${script} names the unknown flag beside a flag with no value, reads nothing after --, and leaves the directory untouched`, () => {
			const scratch = createScratch({ prefix: 'orkestrel-script-refusal-' })
			try {
				scratch.write('seed.txt', 'seed')
				scratch.write('nested/seed.json', '{}')
				const before = readTreeDigest(scratch.path)
				const file = join(WORKSPACE_ROOT, script)
				for (const [args, named] of buildFlagRefusals(readScriptValueFlags(script))) {
					const run = runScriptFile(file, args, { cwd: scratch.path })
					expect({ args, status: run.status }).toEqual({ args, status: 64 })
					expect(run.stderr).toContain(named)
					expect(readTreeDigest(scratch.path)).toBe(before)
				}
				const after = runScriptFile(file, ['--', '--no-such-flag'], { cwd: scratch.path })
				expect(after.stderr).not.toContain('--no-such-flag')
				expect(readTreeDigest(scratch.path)).toBe(before)
			} finally {
				scratch.destroy()
			}
		})

		// The build writes the twin under `dist/`, which git ignores, so a checkout that has not built
		// has no twin to refuse through; the build runs before the tests in the gate order.
		it.skipIf(!existsSync(join(WORKSPACE_ROOT, readBuiltScript(script))))(
			`${readBuiltScript(script)} refuses the same calls as its source, naming the unknown flag`,
			() => {
				const scratch = createScratch({ prefix: 'orkestrel-script-twin-' })
				try {
					scratch.write('seed.txt', 'seed')
					const before = readTreeDigest(scratch.path)
					const file = join(WORKSPACE_ROOT, readBuiltScript(script))
					for (const [args, named] of buildFlagRefusals(readScriptValueFlags(script))) {
						const run = runScriptFile(file, args, { cwd: scratch.path })
						expect({ args, status: run.status }).toEqual({ args, status: 64 })
						expect(run.stderr).toContain(named)
						expect(readTreeDigest(scratch.path)).toBe(before)
					}
				} finally {
					scratch.destroy()
				}
			},
		)

		it(`${script} still runs when a link reaches it, so the entry guard reads the real path`, () => {
			const work = createScratch({ prefix: 'orkestrel-script-work-' })
			const links = createScratch({ prefix: 'orkestrel-script-links-' })
			try {
				work.write('seed.txt', 'seed')
				const before = readTreeDigest(work.path)
				links.link('scripts', dirname(join(WORKSPACE_ROOT, script)))
				const file = join(links.path, 'scripts', basename(script))
				for (const [args, named] of buildFlagRefusals(readScriptValueFlags(script))) {
					const run = runScriptFile(file, args, { cwd: work.path })
					expect({ args, status: run.status }).toEqual({ args, status: 64 })
					expect(run.stderr).toContain(named)
					expect(readTreeDigest(work.path)).toBe(before)
				}
			} finally {
				links.destroy()
				work.destroy()
			}
		})
	}
})
