import { spawn, spawnSync } from 'node:child_process'
import { copyFileSync, readFileSync } from 'node:fs'
import { basename, delimiter, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createRecorder, waitForCondition, waitForEvent } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, WORKSPACE_ROOT, runFlagRefusals } from '../../../../setupServer.js'
import {
	OPTIONS,
	parseArguments,
	buildPlan,
	CHAIN,
	collectNative,
	deriveSegments,
	formatOmission,
	formatSegment,
	mergeEnv,
	OPENERS,
	parseJson,
	parseOmission,
	parseSegment,
	quote,
	readCiOmissions,
	readDerivation,
	readHolders,
	readOmissionProblems,
	readOmissions,
	readUsageProblem,
	resolveNpm,
	selectSegments,
	STEP_NAME,
	writeJournal,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/steps.ts'

describe('steps.ts', () => {
	const script = '.agents/skills/orkestrel-publish/scripts/steps.ts'
	// A step that runs npm stays hermetic: no audit, no funding notice, no update check.
	const env = {
		npm_config_audit: 'false',
		npm_config_fund: 'false',
		npm_config_update_notifier: 'false',
	}

	it('derives exactly the seven steps of this manifest in script order', () => {
		const derivation = readDerivation(WORKSPACE_ROOT)
		expect(derivation.problems).toStrictEqual([])
		expect(derivation.segments).toStrictEqual([
			{ name: 'format-check', args: ['run', 'format:check'] },
			{ name: 'lint-check', args: ['run', 'lint:check'] },
			{ name: 'check', args: ['run', 'check'] },
			{ name: 'build', args: ['run', 'build'] },
			{ name: 'test', args: ['test'] },
			{ name: 'test-templates', args: ['run', 'test:templates'] },
			{
				name: 'test-distribution',
				args: ['run', 'test:distribution', '--', '--mode', 'release'],
			},
		])
	})

	it('prints this manifest as ci, clean, and its seven steps through --dry-run --json', () => {
		const run = runSkillScript(script, [
			'--journal',
			'tmp/units/sp-steps/none',
			'--dry-run',
			'--json',
			'--no-ci',
		])
		expect(run.status).toBe(0)
		const value = parseJson(run.stdout)
		expect(value).toMatchObject({ omitted: [{ name: 'ci', reason: '--no-ci' }] })
		expect(run.stdout.match(/"name":"[^"]+","command"/gu)).toStrictEqual(
			[
				'clean',
				'format-check',
				'lint-check',
				'check',
				'build',
				'test',
				'test-templates',
				'test-distribution',
			].map((name) => `"name":"${name}","command"`),
		)
	})

	it('names a step with the pattern the sibling chain script declares', () => {
		expect(readFileSync(CHAIN, 'utf8')).toContain(`/${STEP_NAME.source}/u`)
		expect(basename(CHAIN)).toBe('chain.ts')
	})

	it('reads the admitted language of a segment and refuses its neighbours', () => {
		expect(parseSegment('npm test')).toStrictEqual({ name: 'test', args: ['test'] })
		expect(parseSegment('  npm \t run  a:b  ')).toStrictEqual({ name: 'a-b', args: ['run', 'a:b'] })
		expect(parseSegment('npm run a:b -- --mode release')).toStrictEqual({
			name: 'a-b',
			args: ['run', 'a:b', '--', '--mode', 'release'],
		})
		expect(parseSegment('npm run a -- --mode=release')?.args).toContain('--mode=release')
		for (const refused of [
			'',
			'   ',
			'npm',
			'npm run',
			'npm install',
			'npm test -- x',
			'npm test x',
			'npm run a b',
			'npm run a --',
			'npm run -- a',
			'npm run --silent a',
			'npx vitest run',
			'node x',
			'FOO=1 npm test',
			'npm run a; npm run b',
			'npm run a || npm run b',
			'npm run a | cat',
			'npm run a > out.txt',
			'npm run a -- < in.txt',
			'npm run a &',
			'npm run "a"',
			"npm run 'a'",
			'npm run a -- `b`',
			'npm run a -- $HOME',
			'npm run a -- %PATH%',
			'npm run a -- ^b',
			'npm run a -- (b)',
			'npm run a -- b\nrm c',
			'npm run a\r\nnpm run b',
		]) {
			expect({ refused, segment: parseSegment(refused) }).toStrictEqual({
				refused,
				segment: undefined,
			})
		}
	})

	it('names every refused segment, repeat, and unnameable script in one derivation', () => {
		const derivation = deriveSegments(
			'npm test && node x && npm run a; b && npm test && npm run _x',
		)
		expect(derivation.segments).toStrictEqual([])
		expect(derivation.problems.join('\n')).toContain('"node x"')
		expect(derivation.problems.join('\n')).toContain('"npm run a; b"')
		expect(derivation.problems.join('\n')).toContain('the step name "test" repeats')
		expect(derivation.problems.join('\n')).toContain('the step name "_x"')
		expect(derivation.problems).toHaveLength(4)
		expect(deriveSegments('npm run :x').problems.join('\n')).toContain('the step name "-x"')
		expect(deriveSegments('npm test &&').problems.join('\n')).toContain('segment ""')
		expect(deriveSegments('').problems.join('\n')).toContain('segment ""')
	})

	it('refuses a repeat by its step name, across argument forms, separators, and case', () => {
		for (const repeated of [
			'npm run a -- x && npm run a -- y',
			'npm run a:b && npm run a-b',
			'npm run Build && npm run build',
			'npm run clean',
			'npm run ci',
			'npm run omitted',
		]) {
			const derivation = deriveSegments(repeated)
			expect({ repeated, problems: derivation.problems.length }).toStrictEqual({
				repeated,
				problems: 1,
			})
			expect(derivation.problems.join('\n')).toContain('repeats or is reserved')
		}
	})

	for (const [segment, named] of [
		['npm test ; npm run two', 'npm test ; npm run two'],
		['npm test || npm run two', 'npm test || npm run two'],
		['npm run "two"', 'npm run \\"two\\"'],
		['node x', 'node x'],
	]) {
		it(`exits 65 on the segment ${JSON.stringify(segment)}, names it, and writes nothing`, () => {
			const scratch = createScratch({ prefix: 'orkestrel-steps-refuse-' })
			try {
				scratch.write(
					'package.json',
					JSON.stringify({ scripts: { prepublishOnly: `npm run one && ${segment}` } }),
				)
				const run = runSkillScript(script, ['--journal', 'j'], { cwd: scratch.path })
				expect(run.status).toBe(65)
				expect(run.stderr).toContain(named)
				expect(run.stderr).toContain('no complete step list')
				expect(scratch.has('j')).toBe(false)
			} finally {
				scratch.destroy()
			}
		})
	}

	it('exits 65 on a missing manifest, a missing script, and a manifest that is not JSON', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-manifest-' })
		try {
			const cwd = { cwd: scratch.path }
			const absent = runSkillScript(script, ['--journal', 'j'], cwd)
			expect(absent.status).toBe(65)
			expect(absent.stderr).toContain('no package.json')
			for (const text of ['{', '{}', '{"scripts":{}}', '{"scripts":{"prepublishOnly":7}}']) {
				scratch.write('package.json', text)
				const run = runSkillScript(script, ['--journal', 'j'], cwd)
				expect({ text, status: run.status }).toStrictEqual({ text, status: 65 })
				expect(run.stderr).toContain('scripts.prepublishOnly')
			}
			expect(scratch.has('j')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an --omit that matches no derived step, listing the valid names, and writes nothing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-typo-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({ scripts: { prepublishOnly: 'npm run format:check && npm test' } }),
			)
			for (const name of ['format:check', 'tset', 'ci', 'clean']) {
				const run = runSkillScript(script, ['--journal', 'j', '--omit', `${name}=reason`], {
					cwd: scratch.path,
				})
				expect({ name, status: run.status }).toStrictEqual({ name, status: 65 })
				expect(run.stderr).toContain(`--omit ${JSON.stringify(name)} matches no derived step`)
				expect(run.stderr).toContain('the valid names are format-check, test')
				expect(scratch.has('j')).toBe(false)
			}
			expect(
				readOmissionProblems([{ name: 'test', reason: 'r' }], [{ name: 'test', args: ['test'] }]),
			).toStrictEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('reads --omit values and refuses a malformed or repeated one with 64', () => {
		expect(parseOmission('a=why')).toStrictEqual({ name: 'a', reason: 'why' })
		expect(parseOmission('a=b=c')).toStrictEqual({ name: 'a', reason: 'b=c' })
		expect(parseOmission('a')).toBeUndefined()
		expect(parseOmission('=why')).toBeUndefined()
		expect(parseOmission('a=')).toBeUndefined()
		expect(parseOmission('a=  ')).toBeUndefined()
		expect(parseOmission('a=one\ntwo')).toBeUndefined()
		expect(readOmissions({ omit: ['a=1', 'b=2'], 'no-ci': true })).toStrictEqual([
			{ name: 'a', reason: '1' },
			{ name: 'b', reason: '2' },
		])
		const scratch = createScratch({ prefix: 'orkestrel-steps-omit-' })
		try {
			for (const [args, named] of [
				[['--omit', 'test'], '"test"'],
				[['--omit', 'test='], '"test="'],
				[['--omit', 'test=a', '--omit', 'test=b'], 'more than once: "test"'],
				[['--omit', 'test=a', '--omit'], "'--omit"],
			] as const) {
				const run = runSkillScript(script, ['--journal', 'j', ...args], { cwd: scratch.path })
				expect({ args, status: run.status }).toStrictEqual({ args, status: 64 })
				expect(run.stderr).toContain(named)
			}
			expect(scratch.has('j')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reads flags with parseArgs and refuses an unknown flag, a stray argument, a bare -- before an argument, and a missing journal', () => {
		expect(
			readUsageProblem({ journal: 'd', omit: ['a=b'], 'no-ci': true, 'dry-run': true }),
		).toBeUndefined()
		expect(readUsageProblem({ 'dry-run': true })).toContain('usage: steps.ts --journal DIR')
		expect(parseArguments(['--journal=d', '--omit=a=b', '--omit', 'c=d'])).toEqual({
			success: true,
			value: { values: { journal: 'd', omit: ['a=b', 'c=d'] }, positionals: [] },
		})
		const scratch = createScratch({ prefix: 'orkestrel-steps-usage-' })
		try {
			scratch.write('package.json', JSON.stringify({ scripts: { prepublishOnly: 'npm test' } }))
			const cwd = { cwd: scratch.path }
			expect(runSkillScript(script, [], cwd).status).toBe(64)
			const stray = runSkillScript(script, ['--journal', 'j', 'test=why'], cwd)
			expect(stray.status).toBe(64)
			expect(stray.stderr).toContain("'test=why'")
			const bare = runSkillScript(script, ['--journal', 'j', '--', '--dry-run'], cwd)
			expect(bare.status).toBe(64)
			const unknown = runSkillScript(script, ['--journal', 'j', '--bogus'], cwd)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain("'--bogus'")
			expect(unknown.stderr).toContain('usage: steps.ts')
			const equals = runSkillScript(
				script,
				['--journal=j', '--dry-run', '--json', '--omit=test=the fixture runs no tests'],
				cwd,
			)
			expect(equals.status).toBe(0)
			expect(equals.json?.omitted).toEqual(
				expect.arrayContaining([{ name: 'test', reason: 'the fixture runs no tests' }]),
			)
			const json = runSkillScript(script, ['--journal', 'j', '--json'], cwd)
			expect(json.status).toBe(64)
			expect(json.stderr).toContain('--json reads only with --dry-run')
			expect(scratch.has('j')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('quotes an untrusted segment JSON-encoded and cut to a bounded length', () => {
		expect(quote('a"b')).toBe('"a\\"b"')
		expect(quote('x'.repeat(200))).toBe(`"${'x'.repeat(80)}…"`)
	})

	it('leaves an omitted step out of plan.json, writes it to omitted.txt, and prints it on its own line', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-omitted-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({
					scripts: {
						prepublishOnly: 'npm run one && npm run test:distribution -- --mode release',
						clean: 'node -e 0',
						one: 'node -e 0',
					},
				}),
			)
			const run = runSkillScript(
				script,
				['--journal', 'j', '--no-ci', '--omit', 'test-distribution=this host refuses the registry'],
				{ cwd: scratch.path, env },
			)
			expect(run.status).toBe(0)
			const lines = run.stdout.split(/\r\n|\n/u)
			expect(lines).toContain('omitted ci: --no-ci')
			expect(lines).toContain('omitted test-distribution: this host refuses the registry')
			const plan = parseJson(scratch.read('j/plan.json') ?? '')
			expect(plan).toMatchObject([{ name: 'clean' }, { name: 'one' }])
			expect(plan).toHaveLength(2)
			expect(scratch.read('j/omitted.txt')).toBe(
				'omitted ci: --no-ci\nomitted test-distribution: this host refuses the registry\n',
			)
			expect(scratch.has('j/test-distribution.txt')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('runs a clean reinstall, the clean, and two trivial scripts through the chain and exits 0', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-run-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({
					name: 'fixture-steps',
					version: '0.0.0',
					scripts: {
						prepublishOnly: 'npm run one && npm run two',
						clean: 'node -e 0',
						one: 'node -e "console.log(\'ran one\')"',
						two: 'node -e "console.log(\'ran two\')"',
					},
				}),
			)
			scratch.write(
				'package-lock.json',
				JSON.stringify({
					name: 'fixture-steps',
					version: '0.0.0',
					lockfileVersion: 3,
					requires: true,
					packages: { '': { name: 'fixture-steps', version: '0.0.0' } },
				}),
			)
			const run = runSkillScript(script, ['--journal', 'tmp/j'], { cwd: scratch.path, env })
			expect(run.status).toBe(0)
			expect(
				run.stdout
					.split(/\r\n|\n/u)
					.filter((line) => line !== '')
					.map((line) => line.replace(/ durationMs=\d+$/u, '')),
			).toStrictEqual(['ci exit=0', 'clean exit=0', 'one exit=0', 'two exit=0'])
			expect(scratch.read('tmp/j/one.txt')).toContain('ran one')
			expect(scratch.read('tmp/j/two.txt')).toContain('ran two')
			expect(scratch.read('tmp/j/omitted.txt')).toBe('')
			expect(parseJson(scratch.read('tmp/j/plan.json') ?? '')).toMatchObject(
				['ci', 'clean', 'one', 'two'].map((name) => ({ name })),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('exits with the code of the step that fails and runs no later step', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-stop-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({
					scripts: {
						prepublishOnly: 'npm run one && npm run two && npm run three',
						clean: 'node -e 0',
						one: 'node -e 0',
						two: 'node -e "process.exit(7)"',
						three: 'node -e 0',
					},
				}),
			)
			const run = runSkillScript(script, ['--journal', 'j', '--no-ci'], { cwd: scratch.path, env })
			expect(run.status).toBe(7)
			expect(run.stdout).toContain('two exit=7')
			expect(run.stdout).not.toContain('three')
			expect(scratch.has('j/two.txt')).toBe(true)
			expect(scratch.has('j/three.txt')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('hands each step npm_config_prefer_online=true over an inherited spelling in another case', () => {
		expect(
			mergeEnv(
				{ NPM_CONFIG_PREFER_ONLINE: 'false', KEEP: 'k' },
				{ npm_config_prefer_online: 'true' },
			),
		).toStrictEqual({
			KEEP: 'k',
			npm_config_prefer_online: 'true',
		})
		const scratch = createScratch({ prefix: 'orkestrel-steps-online-' })
		try {
			scratch.write(
				'report.js',
				"console.log('online=' + Object.keys(process.env).filter((name) => name.toLowerCase() === 'npm_config_prefer_online').map((name) => process.env[name]).join(','))",
			)
			scratch.write(
				'package.json',
				JSON.stringify({
					scripts: {
						prepublishOnly: 'npm run report',
						clean: 'node -e 0',
						report: 'node report.js',
					},
				}),
			)
			const run = runSkillScript(script, ['--journal', 'j', '--no-ci'], {
				cwd: scratch.path,
				env: { ...env, NPM_CONFIG_PREFER_ONLINE: 'false' },
			})
			expect(run.status).toBe(0)
			expect(scratch.read('j/report.txt')).toContain('online=true')
		} finally {
			scratch.destroy()
		}
	})

	it('prints the steps and omissions on --dry-run and writes and runs nothing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-dry-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({
					scripts: {
						prepublishOnly: 'npm run one && npm run two -- --flag',
						clean: "node -e \"require('node:fs').writeFileSync('ran.txt','x')\"",
						one: 'node -e 0',
						two: 'node -e 0',
					},
				}),
			)
			const args = ['--journal', 'j', '--dry-run', '--omit', 'one=why']
			const run = runSkillScript(script, args, { cwd: scratch.path, env })
			expect(run.status).toBe(0)
			expect(run.stdout.split(/\r\n|\n/u)).toStrictEqual([
				'step ci: npm ci --ignore-scripts',
				'step clean: npm run clean',
				'step two: npm run two -- --flag',
				'omitted one: why',
				'',
			])
			const json = runSkillScript(script, [...args, '--json'], { cwd: scratch.path, env })
			expect(json.status).toBe(0)
			expect(parseJson(json.stdout)).toMatchObject({
				steps: [{ name: 'ci' }, { name: 'clean' }, { name: 'two' }],
				omitted: [{ name: 'one', reason: 'why' }],
			})
			expect(scratch.has('j')).toBe(false)
			expect(scratch.has('ran.txt')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('exits 2 and runs nothing when the journal cannot be written', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-journal-' })
		try {
			scratch.write(
				'package.json',
				JSON.stringify({ scripts: { prepublishOnly: 'npm test', clean: 'node -e 0' } }),
			)
			scratch.write('taken', 'a file')
			const run = runSkillScript(script, ['--journal', 'taken', '--no-ci'], {
				cwd: scratch.path,
				env,
			})
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('cannot write the journal "taken"')
			expect(run.stdout).not.toContain('clean exit')
			expect(writeJournal(join(scratch.path, 'taken', 'deep'), [], [])).toBeTypeOf('string')
		} finally {
			scratch.destroy()
		}
	})

	it('reads a held native file from the opener and opens only regular native files', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-open-' })
		try {
			scratch.write('node_modules/a/one.node', 'x')
			scratch.write('node_modules/a/nested/node_modules/b/two.EXE', 'x')
			scratch.write('node_modules/a/three.node.txt', 'x')
			scratch.write('node_modules/a/index.js', 'x')
			scratch.write('node_modules/dir.node/inner.txt', 'x')
			const root = join(scratch.path, 'node_modules')
			const opened = createRecorder<[path: string]>()
			const held = readHolders(
				root,
				(path) => {
					opened.handler(path)
					if (path.endsWith('one.node')) throw Object.assign(new Error('held'), { code: 'EBUSY' })
					if (path.endsWith('two.EXE')) throw new Error('no code')
				},
				'win32',
			)
			const one = join(root, 'a', 'one.node')
			const two = join(root, 'a', 'nested', 'node_modules', 'b', 'two.EXE')
			expect(opened.calls.map(([path]) => path).toSorted()).toStrictEqual([one, two].toSorted())
			expect(held.toSorted((left, right) => left.path.localeCompare(right.path))).toStrictEqual(
				[
					{ path: one, code: 'EBUSY' },
					{ path: two, code: 'unknown' },
				].toSorted((left, right) => left.path.localeCompare(right.path)),
			)
			expect(readHolders(root, () => undefined, 'win32')).toStrictEqual([])
			expect(readHolders(join(scratch.path, 'absent'), () => undefined, 'win32')).toStrictEqual([])
			expect(collectNative(join(scratch.path, 'absent'))).toStrictEqual([])
			scratch.write('tree/nested/binding.DLL', '')
			expect(
				collectNative(join(scratch.path, 'tree')).some((path) => path.endsWith('binding.DLL')),
			).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('opens no file off win32, because another host unlinks a mapped file', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-posix-' })
		try {
			scratch.write('node_modules/a/one.node', 'x')
			const opened = createRecorder<[path: string]>()
			expect(
				readHolders(join(scratch.path, 'node_modules'), opened.handler, 'linux'),
			).toStrictEqual([])
			expect(opened.calls).toHaveLength(0)
		} finally {
			scratch.destroy()
		}
	})

	it('leaves ci out for --no-ci without reading a holder, and for the held paths otherwise', () => {
		const read = createRecorder<[]>()
		expect(
			readCiOmissions(true, () => {
				read.handler()
				return [{ path: 'x.node', code: 'EBUSY' }]
			}),
		).toStrictEqual([{ name: 'ci', reason: '--no-ci' }])
		expect(read.calls).toHaveLength(0)
		expect(readCiOmissions(false, () => [])).toStrictEqual([])
		expect(
			readCiOmissions(false, () => [
				{ path: 'a.node', code: 'EBUSY' },
				{ path: 'b.exe', code: 'EPERM' },
			]),
		).toStrictEqual([
			{ name: 'ci', reason: 'held by a running process: a.node (EBUSY), b.exe (EPERM)' },
		])
	})

	it('selects the openers then the derived steps and builds the plan shape the chain reads', () => {
		const segments = [{ name: 'one', args: ['run', 'one'] }]
		expect(selectSegments(segments, [])).toStrictEqual([...OPENERS, ...segments])
		const selected = selectSegments(segments, [{ name: 'ci', reason: 'r' }])
		expect(selected.map((segment) => segment.name)).toStrictEqual(['clean', 'one'])
		expect(buildPlan(selected, { file: 'node', prefix: ['cli.js'] })).toStrictEqual([
			{ name: 'clean', command: 'node', args: ['cli.js', 'run', 'clean'] },
			{ name: 'one', command: 'node', args: ['cli.js', 'run', 'one'] },
		])
		expect(formatSegment({ name: 'one', args: ['run', 'one'] })).toBe('step one: npm run one')
		expect(formatOmission({ name: 'ci', reason: 'r' })).toBe('omitted ci: r')
	})

	it('resolves npm to the entry beside the binary, else to the shim rule of the host', () => {
		const scratch = createScratch({ prefix: 'orkestrel-steps-npm-' })
		try {
			scratch.write('with/node_modules/npm/bin/npm-cli.js', '')
			const binary = join(scratch.path, 'with', 'node')
			const cli = join(scratch.path, 'with', 'node_modules', 'npm', 'bin', 'npm-cli.js')
			expect(resolveNpm(binary, 'win32')).toStrictEqual({ file: binary, prefix: [cli] })
			expect(resolveNpm(binary, 'linux')).toStrictEqual({ file: binary, prefix: [cli] })
			const bare = join(scratch.path, 'node')
			expect(resolveNpm(bare, 'linux')).toStrictEqual({ file: 'npm', prefix: [] })
			expect(resolveNpm(bare, 'win32')).toStrictEqual({
				file: 'cmd.exe',
				prefix: ['/d', '/s', '/c', 'npm'],
			})
		} finally {
			scratch.destroy()
		}
	})

	// `cmd.exe` is a Windows image and a `.cmd` file runs only through it, so no other host can start this form.
	it.skipIf(process.platform !== 'win32')(
		'starts a shim through the fallback form with no shell option',
		() => {
			const scratch = createScratch({ prefix: 'orkestrel-steps-shim-' })
			try {
				scratch.write('npm.cmd', '@exit /b 9\r\n')
				const npm = resolveNpm(join(scratch.path, 'node'), 'win32')
				const run = spawnSync(npm.file, [...npm.prefix, 'run', 'one'], {
					cwd: scratch.path,
					env: mergeEnv(process.env, {
						PATH: `${scratch.path}${delimiter}${process.env.PATH ?? ''}`,
					}),
					shell: false,
					windowsHide: true,
				})
				expect(run.status).toBe(9)
			} finally {
				scratch.destroy()
			}
		},
	)

	// Windows maps a loaded image with a sharing mode that refuses a write-mode open with `EBUSY`; another host opens the file and unlinks it while mapped, so the reading applies to `win32` alone.
	it.skipIf(process.platform !== 'win32')(
		'reads a real native copy held while a child has it loaded, and released after the child ends',
		async () => {
			const source = collectNative(join(WORKSPACE_ROOT, 'node_modules')).find((path) =>
				basename(path).startsWith('lightningcss'),
			)
			expect(source).toBeDefined()
			if (source === undefined) return
			const scratch = createScratch({ prefix: 'orkestrel-steps-held-' })
			scratch.write('package.json', JSON.stringify({ scripts: { prepublishOnly: 'npm test' } }))
			scratch.write('node_modules/held/seed.txt', 'x')
			const root = join(scratch.path, 'node_modules')
			const copy = join(root, 'held', 'held.node')
			copyFileSync(source, copy)
			expect(readHolders(root)).toStrictEqual([])
			// The child ends when its standard input closes, and its own timer bounds its life if this test dies first.
			const child = spawn(
				process.execPath,
				[
					'-e',
					`require(${JSON.stringify(copy)}); console.log('loaded'); process.stdin.on('end', () => process.exit(0)); process.stdin.resume(); setTimeout(() => process.exit(3), 30000)`,
				],
				{ stdio: ['pipe', 'pipe', 'inherit'], windowsHide: true },
			)
			try {
				const [chunk] = await waitForEvent<[unknown]>(
					(listener) => {
						child.stdout.once('data', listener)
					},
					'the child reports the native copy loaded',
					{ budget: 20_000 },
				)
				expect(String(chunk).trim()).toBe('loaded')
				expect(readHolders(root)).toStrictEqual([{ path: copy, code: 'EBUSY' }])
				const dry = runSkillScript(script, ['--journal', 'j', '--dry-run'], { cwd: scratch.path })
				expect(dry.status).toBe(0)
				expect(dry.stdout).not.toContain('step ci:')
				expect(dry.stdout).toContain('omitted ci: held by a running process:')
				expect(dry.stdout).toContain('held.node (EBUSY)')
				const closed = waitForEvent<[number | null]>(
					(listener) => {
						child.on('close', listener)
					},
					'the child ends after its standard input closes',
					{ budget: 20_000 },
				)
				child.stdin.end()
				const [code] = await closed
				expect(code).toBe(0)
				await waitForCondition(
					'the native copy opens after the child ended',
					() => readHolders(root).length === 0,
					{ budget: 20_000 },
				)
				const free = runSkillScript(script, ['--journal', 'j', '--dry-run'], { cwd: scratch.path })
				expect(free.stdout).toContain('step ci:')
			} finally {
				child.kill()
				scratch.destroy()
			}
		},
	)
})

describe('the parseArgs refusals', () => {
	it('names the flag parseArgs refuses through the source, a linked directory, and the built twin, and leaves the directory untouched', () => {
		expect(
			runFlagRefusals('.agents/skills/orkestrel-publish/scripts/steps.ts', OPTIONS),
		).toStrictEqual([])
	})
})
