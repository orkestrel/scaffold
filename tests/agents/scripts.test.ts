import { readFileSync } from 'node:fs'
import { join } from 'node:path'
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

	it('builds the parseArgs refusals from an options table and refuses an empty table', () => {
		expect(
			buildFlagRefusals({ plan: { type: 'string' }, json: { type: 'boolean' } }),
		).toStrictEqual([
			[['--no-such-flag'], "'--no-such-flag'"],
			[['--plan', '--no-such-flag'], "'--plan'"],
			[['--no-such=1', '--plan'], "'--no-such'"],
		])
		expect(() => buildFlagRefusals({})).toThrow('declared options table')
	})

	for (const script of readSkillScripts()) {
		it(`${script} has a proof that runs the parseArgs refusals against its own options table`, () => {
			const proof = readFileSync(
				join(
					WORKSPACE_ROOT,
					'tests',
					script.replace(/^\.agents\//u, 'agents/').replace(/\.ts$/u, '.test.ts'),
				),
				'utf8',
			)
			expect(proof).toMatch(/runFlagRefusals\([^,]+, OPTIONS\)/u)
		})

		it(`${script} refuses an unknown flag and a value given to a switch or an unknown flag with exit 64, naming the flag`, () => {
			const scratch = createScratch({ prefix: 'orkestrel-script-flags-' })
			try {
				const cwd = { cwd: scratch.path }
				const unknown = runSkillScript(script, ['--no-such-flag'], cwd)
				expect(unknown.status).toBe(64)
				expect(unknown.stderr).toContain("'--no-such-flag'")
				const joined = runSkillScript(script, ['--json=1'], cwd)
				expect(joined.status).toBe(64)
				expect(joined.stderr).toContain("'--json'")
			} finally {
				scratch.destroy()
			}
		})

		it(`${script} reads no flag after --, and leaves the directory untouched`, () => {
			const scratch = createScratch({ prefix: 'orkestrel-script-refusal-' })
			try {
				scratch.write('seed.txt', 'seed')
				const before = readTreeDigest(scratch.path)
				const after = runScriptFile(join(WORKSPACE_ROOT, script), ['--', '--no-such-flag'], {
					cwd: scratch.path,
				})
				expect(after.stderr).not.toContain("Unknown option '--no-such-flag'")
				expect(readTreeDigest(scratch.path)).toBe(before)
			} finally {
				scratch.destroy()
			}
		})
	}
})
