import { isAbsolute, join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	MEASURE_SCRIPT,
	WORKSPACE_ROOT,
	renderLinterFixture,
	runSkillScript,
} from '../../../../setupServer.js'
import {
	anchorPlugin,
	anchorSpecifier,
	buildVariant,
	describeDiagnostic,
	formatHits,
	isHit,
	isRecord,
	nameProbe,
	namesRule,
	normalizeSlashes,
	parseJson,
	quote,
	readCodeScopes,
	readHits,
	readMissingFlags,
	readOption,
	readPositionals,
	readRuleOptions,
	readUnknownFlags,
} from '../../../../../.agents/skills/orkestrel-harden/scripts/measure.ts'

describe('measure.ts', () => {
	it('names a variant directory from a rule id and quotes an untrusted text to a bounded length', () => {
		expect(nameProbe('policy/no-let')).toBe('policy-no-let')
		expect(nameProbe('@scope/rule:x y')).toBe('-scope-rule-x-y')
		expect(nameProbe('no-debugger')).toBe('no-debugger')
		expect(quote('a"b')).toBe('"a\\"b"')
		expect(quote('x'.repeat(100))).toBe(`"${'x'.repeat(80)}…"`)
		expect(normalizeSlashes('a\\b/c')).toBe('a/b/c')
		expect(isRecord([])).toBe(false)
		expect(isRecord(null)).toBe(false)
		expect(isRecord({})).toBe(true)
		expect(parseJson('{"a":1}')).toStrictEqual({ a: 1 })
		expect(parseJson('{')).toBeUndefined()
	})

	it('makes a relative plugin specifier absolute with forward slashes and leaves the rest alone', () => {
		const root = resolve('root')
		const anchored = anchorSpecifier(root, './configs/policy.ts')
		expect(isAbsolute(anchored)).toBe(true)
		expect(anchored.endsWith('/root/configs/policy.ts')).toBe(true)
		expect(anchored).not.toContain('\\')
		expect(anchorSpecifier(root, '../up.ts').endsWith('/up.ts')).toBe(true)
		expect(anchorSpecifier(root, 'some-package')).toBe('some-package')
		expect(anchorSpecifier(root, '@scope/plugin')).toBe('@scope/plugin')
		expect(anchorSpecifier(root, '/already/absolute.ts')).toBe('/already/absolute.ts')
		expect(anchorPlugin(root, './p.ts')).toStrictEqual(anchorSpecifier(root, './p.ts'))
		expect(anchorPlugin(root, { name: 'policy', specifier: './p.ts' })).toStrictEqual({
			name: 'policy',
			specifier: anchorSpecifier(root, './p.ts'),
		})
		expect(anchorPlugin(root, { name: 'policy' })).toStrictEqual({ name: 'policy' })
		expect(anchorPlugin(root, 7)).toBe(7)
	})

	it('builds a variant that enables one rule beside the workspace plugins and carries nothing else', () => {
		const root = resolve('root')
		const workspace = {
			plugins: ['typescript'],
			jsPlugins: [{ name: 'policy', specifier: './configs/policy.ts' }],
			rules: { 'no-var': 'error' },
			overrides: [{ files: ['x'], rules: {} }],
			ignorePatterns: ['tmp/'],
		}
		const bare = buildVariant(root, workspace, 'policy/no-let', [])
		expect(bare).toStrictEqual({
			plugins: ['typescript'],
			jsPlugins: [{ name: 'policy', specifier: anchorSpecifier(root, './configs/policy.ts') }],
			categories: { correctness: 'off', suspicious: 'off' },
			rules: { 'policy/no-let': 'error' },
		})
		expect(buildVariant(root, workspace, 'no-console', [{ allow: ['warn'] }]).rules).toStrictEqual({
			'no-console': ['error', { allow: ['warn'] }],
		})
		expect(Object.keys(buildVariant(root, {}, 'no-var', []))).toStrictEqual(['categories', 'rules'])
	})

	it('reads the rule options as the arguments after error and refuses text that is not JSON', () => {
		expect(readRuleOptions(undefined)).toStrictEqual([])
		expect(readRuleOptions('[1,"a"]')).toStrictEqual([1, 'a'])
		expect(readRuleOptions('{"allow":["warn"]}')).toStrictEqual([{ allow: ['warn'] }])
		expect(readRuleOptions('"text"')).toStrictEqual(['text'])
		expect(readRuleOptions('allow')).toBeUndefined()
		expect(readRuleOptions('')).toBeUndefined()
	})

	it('lists the code scopes a rule id may print under, and matches a diagnostic code to the rule', () => {
		expect(readCodeScopes('no-debugger')).toStrictEqual(['eslint'])
		expect(readCodeScopes('policy/no-let')).toStrictEqual(['policy', 'eslint-plugin-policy'])
		expect(readCodeScopes('typescript/no-explicit-any')).toStrictEqual([
			'typescript',
			'eslint-plugin-typescript',
			'typescript-eslint',
		])
		expect(readCodeScopes('node/no-process-exit')).toContain('eslint-plugin-n')
		expect(namesRule('eslint(no-debugger)', 'no-debugger')).toBe(true)
		expect(namesRule('policy(no-let)', 'policy/no-let')).toBe(true)
		expect(namesRule('typescript-eslint(no-explicit-any)', 'typescript/no-explicit-any')).toBe(true)
		expect(namesRule('eslint-plugin-import(no-cycle)', 'import/no-cycle')).toBe(true)
		expect(namesRule('policy(no-var)', 'policy/no-let')).toBe(false)
		expect(namesRule('eslint(no-let)', 'policy/no-let')).toBe(false)
		expect(namesRule('policy(no-let)', 'no-let')).toBe(false)
		expect(namesRule('no-debugger', 'no-debugger')).toBe(false)
		expect(namesRule('', 'no-debugger')).toBe(false)
		expect(namesRule(undefined, 'no-debugger')).toBe(false)
		expect(isHit({ filename: 'a.ts', code: 'eslint(no-debugger)' }, 'no-debugger')).toBe(true)
		expect(isHit({ code: 'eslint(no-debugger)' }, 'no-debugger')).toBe(false)
		expect(isHit({ filename: 'a.ts' }, 'no-debugger')).toBe(false)
		expect(describeDiagnostic({ code: 'eslint(x)', message: 'm' })).toBe('eslint(x)')
		expect(describeDiagnostic({ code: '', message: 'Unexpected token' })).toBe('Unexpected token')
		expect(describeDiagnostic({})).toBe('a diagnostic with no code')
	})

	it('reads the hits of one rule per file, most first with ties by path, and sets every other diagnostic apart', () => {
		const output = JSON.stringify({
			diagnostics: [
				...['b/c.ts', 'a.ts', 'b\\c.ts', 'a.ts', 'z.ts'].map((filename) => ({
					filename,
					code: 'eslint(no-debugger)',
				})),
				{ filename: 'p.ts', code: '', message: 'Unexpected token' },
				{ filename: 'q.ts', code: 'eslint(no-var)' },
				{ filename: 'r.ts', code: 'eslint(no-var)' },
				{ message: 'no filename' },
				'text',
			],
		})
		expect(readHits(output, 'no-debugger')).toStrictEqual({
			total: 5,
			files: [
				['a.ts', 2],
				['b/c.ts', 2],
				['z.ts', 1],
			],
			foreign: ['Unexpected token', 'eslint(no-var)', 'no filename'],
		})
		expect(readHits('{"diagnostics":[]}', 'no-debugger')).toStrictEqual({
			total: 0,
			files: [],
			foreign: [],
		})
		expect(readHits('', 'no-debugger')).toBeUndefined()
		expect(readHits('{}', 'no-debugger')).toBeUndefined()
		expect(readHits('{"diagnostics":5}', 'no-debugger')).toBeUndefined()
		expect(readHits('[]', 'no-debugger')).toBeUndefined()
	})

	it('formats a summary line and one tab-separated line per file', () => {
		expect(
			formatHits('no-var', {
				total: 3,
				files: [
					['a.ts', 2],
					['b.ts', 1],
				],
				foreign: [],
			}),
		).toBe('rule=no-var hits=3 files=2\n2\ta.ts\n1\tb.ts')
		expect(formatHits('no-var', { total: 0, files: [], foreign: [] })).toBe(
			'rule=no-var hits=0 files=0',
		)
	})

	it('reads flags and positionals, and names every missing or unknown flag', () => {
		expect(readOption(['--rule', 'x'], '--rule')).toBe('x')
		expect(readOption(['--rule', '--options'], '--rule')).toBeUndefined()
		expect(readMissingFlags(['--options'], ['--rule', '--options'])).toStrictEqual(['--options'])
		expect(
			readPositionals(['--rule', 'x', 'a.ts', '--options', '[]', 'b.ts'], ['--rule', '--options']),
		).toStrictEqual(['a.ts', 'b.ts'])
		expect(
			readUnknownFlags(['--rule', 'x', '--bad', '--rule=y', '--', '--after'], ['--rule']),
		).toStrictEqual(['--bad', '--rule=y'])
	})

	it('counts a rule’s hits per file with the installed linter, writes the variant, and exits 3', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-hits-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write('.oxlintrc.json', JSON.stringify({ plugins: ['typescript'] }))
			scratch.write('a.ts', 'debugger\ndebugger\n')
			scratch.write('b.ts', 'debugger\n')
			scratch.write('c.ts', 'export const clean = 1\n')
			const run = runSkillScript(
				MEASURE_SCRIPT,
				['--rule', 'no-debugger', 'a.ts', 'b.ts', 'c.ts'],
				{
					cwd: scratch.path,
				},
			)
			expect(run.status).toBe(3)
			expect(run.stdout.split(/\r\n|\n/u).filter((line) => line !== '')).toStrictEqual([
				'rule=no-debugger hits=3 files=2',
				'2\ta.ts',
				'1\tb.ts',
			])
			expect(scratch.read('tmp/probes/lint/no-debugger/.oxlintrc.json')).toContain(
				'"no-debugger": "error"',
			)
			const clean = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-debugger', 'c.ts'], {
				cwd: scratch.path,
			})
			expect(clean.status).toBe(0)
			expect(clean.stdout.trim()).toBe('rule=no-debugger hits=0 files=0')
		} finally {
			scratch.destroy()
		}
	})

	it('gives the rule its options, so the same paths count fewer hits', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-options-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write('.oxlintrc.json', JSON.stringify({ plugins: ['typescript'] }))
			scratch.write('a.ts', "console.log('x')\nconsole.warn('y')\n")
			const cwd = { cwd: scratch.path }
			const all = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-console', 'a.ts'], cwd)
			expect(all.status).toBe(3)
			expect(all.stdout).toContain('hits=2')
			const allowed = runSkillScript(
				MEASURE_SCRIPT,
				['--rule', 'no-console', '--options', '{"allow":["warn"]}', 'a.ts'],
				cwd,
			)
			expect(allowed.status).toBe(3)
			expect(allowed.stdout).toContain('hits=1')
		} finally {
			scratch.destroy()
		}
	})

	it('loads the workspace plugin from the variant directory by making its relative specifier absolute', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-plugin-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'.oxlintrc.json',
				JSON.stringify({ jsPlugins: [{ name: 'probe', specifier: './probe-plugin.mjs' }] }),
			)
			scratch.write(
				'probe-plugin.mjs',
				[
					'export default {',
					"\tmeta: { name: 'probe' },",
					'\trules: {',
					"\t\t'no-foo': {",
					'\t\t\tcreate(context) {',
					'\t\t\t\treturn {',
					"\t\t\t\t\tIdentifier(node) { if (node.name === 'foo') context.report({ node, message: 'no foo' }) },",
					'\t\t\t\t}',
					'\t\t\t},',
					'\t\t},',
					'\t},',
					'}',
				].join('\n'),
			)
			scratch.write('a.ts', 'export const foo = 1\nexport const bar = foo\n')
			const run = runSkillScript(MEASURE_SCRIPT, ['--rule', 'probe/no-foo', 'a.ts'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			expect(run.stdout).toContain('rule=probe/no-foo hits=2 files=1')
			expect(scratch.has('tmp/probes/lint/probe-no-foo/.oxlintrc.json')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('exits 2 when the workspace config or the installed linter is missing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-missing-' })
		try {
			scratch.write('a.ts', 'debugger\n')
			const cwd = { cwd: scratch.path }
			const none = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-debugger', 'a.ts'], cwd)
			expect(none.status).toBe(2)
			expect(none.stderr).toContain('".oxlintrc.json"')
			scratch.write('.oxlintrc.json', '{}')
			const unlinked = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-debugger', 'a.ts'], cwd)
			expect(unlinked.status).toBe(2)
			expect(unlinked.stderr).toContain('node_modules/oxlint/bin/oxlint')
			scratch.write('.oxlintrc.json', '{')
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			const broken = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-debugger', 'a.ts'], cwd)
			expect(broken.status).toBe(2)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses no rule, no path, options that are not JSON, an unknown flag, the --flag=value form, and a bare flag with exit 64', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-usage-' })
		try {
			const cwd = { cwd: scratch.path }
			expect(runSkillScript(MEASURE_SCRIPT, [], cwd).status).toBe(64)
			expect(runSkillScript(MEASURE_SCRIPT, ['a.ts'], cwd).status).toBe(64)
			expect(runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-var'], cwd).status).toBe(64)
			const options = runSkillScript(
				MEASURE_SCRIPT,
				['--rule', 'no-var', '--options', 'allow', 'a.ts'],
				cwd,
			)
			expect(options.status).toBe(64)
			expect(options.stderr).toContain('"allow" is not JSON')
			const unknown = runSkillScript(
				MEASURE_SCRIPT,
				['--rule', 'no-var', '--no-such-flag', 'a.ts'],
				cwd,
			)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--no-such-flag')
			const joined = runSkillScript(MEASURE_SCRIPT, ['--rule=no-var', 'a.ts'], cwd)
			expect(joined.status).toBe(64)
			expect(joined.stderr).toContain('--rule=no-var')
			const bare = runSkillScript(MEASURE_SCRIPT, ['a.ts', '--rule'], cwd)
			expect(bare.status).toBe(64)
			expect(bare.stderr).toContain('--rule given with no value')
			const both = runSkillScript(MEASURE_SCRIPT, ['--rule', '--no-such-flag', 'a.ts'], cwd)
			expect(both.status).toBe(64)
			expect(both.stderr).toContain('--no-such-flag')
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a measurement when the linter reports a diagnostic beside the rule, a parse error included', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-parse-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write('.oxlintrc.json', JSON.stringify({ plugins: ['typescript'] }))
			scratch.write('broken.ts', 'const =\n')
			scratch.write('b.ts', 'debugger\n')
			scratch.write('c.ts', 'export const clean = 1\n')
			const cwd = { cwd: scratch.path }
			const run = runSkillScript(
				MEASURE_SCRIPT,
				['--rule', 'no-debugger', 'broken.ts', 'b.ts'],
				cwd,
			)
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('a diagnostic beside the rule')
			expect(run.stdout).toBe('')
			const alone = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-debugger', 'broken.ts'], cwd)
			expect(alone.status).toBe(2)
			const clean = runSkillScript(MEASURE_SCRIPT, ['--rule', 'no-debugger', 'b.ts', 'c.ts'], cwd)
			expect(clean.status).toBe(3)
			expect(clean.stdout).toContain('hits=1 files=1')
		} finally {
			scratch.destroy()
		}
	})

	it('reads the linter’s exit status: only 0 or 1 is a measurement, and 1 needs a diagnostic', () => {
		const scratch = createScratch({ prefix: 'orkestrel-measure-status-' })
		try {
			scratch.write('.oxlintrc.json', '{}')
			scratch.write('a.ts', 'debugger\n')
			const cwd = { cwd: scratch.path }
			const hit = JSON.stringify({
				diagnostics: [{ filename: 'a.ts', code: 'eslint(no-debugger)' }],
			})
			const empty = JSON.stringify({ diagnostics: [] })
			const args = ['--rule', 'no-debugger', 'a.ts']
			scratch.write('node_modules/oxlint/bin/oxlint', renderLinterFixture(hit, 1, ''))
			const counted = runSkillScript(MEASURE_SCRIPT, args, cwd)
			expect(counted.status).toBe(3)
			expect(counted.stdout).toContain('hits=1 files=1')
			scratch.write('node_modules/oxlint/bin/oxlint', renderLinterFixture(empty, 0, ''))
			expect(runSkillScript(MEASURE_SCRIPT, args, cwd).status).toBe(0)
			scratch.write(
				'node_modules/oxlint/bin/oxlint',
				renderLinterFixture(empty, 7, 'plugin failed'),
			)
			const crashed = runSkillScript(MEASURE_SCRIPT, args, cwd)
			expect(crashed.status).toBe(2)
			expect(crashed.stderr).toContain('exited 7')
			expect(crashed.stderr).toContain('plugin failed')
			expect(crashed.stdout).toBe('')
			scratch.write(
				'node_modules/oxlint/bin/oxlint',
				renderLinterFixture(empty, 1, 'could not load'),
			)
			const silent = runSkillScript(MEASURE_SCRIPT, args, cwd)
			expect(silent.status).toBe(2)
			expect(silent.stderr).toContain('exited 1 with no diagnostic')
			expect(silent.stdout).toBe('')
		} finally {
			scratch.destroy()
		}
	})
})
