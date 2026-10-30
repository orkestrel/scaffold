import { spawnSync } from 'node:child_process'
import {
	existsSync,
	globSync,
	lstatSync,
	readFileSync,
	renameSync,
	symlinkSync,
	unlinkSync,
	writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord, isString } from '@orkestrel/contract'
import { createScratch, readInventory, supportsDirectoryLinks } from '@orkestrel/test/server'
import { CLI } from '../../../../../src/bin/CLI.js'
import {
	collectSpecs,
	compareRanges,
	computeRanges,
	moveRange,
	describeFailure,
	describeChange,
	extractConflict,
	failed,
	isRecord as isScriptRecord,
	judgeOverwrite,
	judgePin,
	judgeVerify,
	matchesLocalSpec,
	normalizeSlashes,
	parseJsonRecord,
	readDirtyPaths,
	parseJsonLine,
	readLayers,
	readManifest,
	readMissingFlags,
	readOption,
	readRanges,
	readReceipt,
	readReleases,
	readString,
	readUnknownFlags,
	readVerdict,
	removeTree,
	renderCommand,
	renderVisit,
	resolveNpm,
	resolveScaffold,
	runNpm,
	scanLocalSpecs,
	validateWavePath,
	writeRanges,
	RANGE_FIELDS,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/wave.ts'
import type {
	Release,
	StepResult,
	Visit,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/wave.ts'
import {
	buildDirtyStatus,
	buildSpawnResult,
	commitFiles,
	buildCLIOptions,
	buildPackument,
	createFleet,
	createSink,
	createRepository,
	createUpstreamServer,
	createWaveRecorder,
	createWaveWorkspace,
	createWaveSession,
	readInstalledRecord,
	renderPackageManifest,
	runSkillScript,
	spawnNpm,
	spawnSkillScript,
	trackFiles,
	WAVE_FAILURE_ROWS,
	WAVE_REFUSALS,
	WAVE_JOURNAL_FAILURES,
	WAVE_SCRIPT,
	WAVE_STEPS,
	WAVE_IDENTITY,
	WORKSPACE_ROOT,
	FLEET_RELEASE_REPLIES,
} from '../../../../setupServer.js'

describe('wave.ts', () => {
	it.each(['same run', 'resume', 'unrelated', 'missing version', 'format failure', 'format only'])(
		'attributes formatter rewrites from the visit evidence: %s',
		(condition) => {
			const scratch = createScratch({
				parent: join(WORKSPACE_ROOT, 'tmp', 'units'),
				prefix: 'wave-format-',
			})
			try {
				scratch.write('.gitignore', 'tmp/\nnode_modules/\n')
				scratch.write(
					'package.json',
					renderPackageManifest({
						name: '@fixture/format',
						version: '1.0.0',
						type: 'module',
						scripts: { format: 'node format.ts' },
					}),
				)
				scratch.write('node_modules/@orkestrel/scaffold/dist/bin/main.js', '')
				const formatter = readInstalledRecord(join(WORKSPACE_ROOT, 'node_modules', 'oxfmt'))
				scratch.write('node_modules/oxfmt/package.json', JSON.stringify(formatter))
				scratch.write('owned.ts', 'export const value={answer:42};\n')
				scratch.write('overwritten.txt', 'before\n')
				scratch.write(
					'format.ts',
					[
						"import { spawnSync } from 'node:child_process'",
						"import { readFileSync, writeFileSync } from 'node:fs'",
						`const formatted = spawnSync(process.execPath, ${JSON.stringify([join(WORKSPACE_ROOT, 'node_modules', 'oxfmt', 'bin', 'oxfmt'), '--stdin-filepath', 'owned.ts'])}, { encoding: 'utf8', input: readFileSync('owned.ts', 'utf8') })`,
						'if (formatted.status !== 0) throw new Error(formatted.stderr)',
						"writeFileSync('owned.ts', formatted.stdout)",
						...(condition === 'format failure' ? ['process.exitCode = 1'] : []),
					].join('\n'),
				)
				createRepository(scratch.path)
				trackFiles(scratch.path)
				commitFiles(scratch.path)
				const head = spawnSync('git', ['rev-parse', 'HEAD'], {
					cwd: scratch.path,
					encoding: 'utf8',
				}).stdout.trim()
				scratch.write(
					'tmp/units/wave/overwrite.json',
					JSON.stringify({
						head,
						version: '1.2.3',
						offline: false,
						written: ['overwritten.txt'],
						removed: [],
					}),
				)
				if (condition !== 'format only') scratch.write('overwritten.txt', 'after\n')
				if (condition === 'unrelated') scratch.write('stray.txt', 'unrelated\n')
				if (condition === 'missing version') {
					scratch.remove('node_modules/oxfmt/package.json')
				}
				const options = { cwd: scratch.path, env: WAVE_IDENTITY }
				const format =
					condition === 'resume'
						? runSkillScript(
								WAVE_SCRIPT,
								['--visit', '--from', 'format', '--to', 'format', '--json'],
								options,
							)
						: undefined
				expect(format?.status).toBe(condition === 'resume' ? 0 : undefined)
				const run = runSkillScript(
					WAVE_SCRIPT,
					[
						'--visit',
						'--from',
						condition === 'resume' ? 'record' : 'format',
						'--to',
						'record',
						'--json',
					],
					options,
				)
				const success = condition === 'same run' || condition === 'format only'
				expect(run.status).toBe(success ? 0 : 1)
				const commits = spawnSync(
					'git',
					['log', '--reverse', '--format=%s', '--name-only', `${head}..HEAD`],
					options,
				)
					.stdout.toString()
					.split(/\r\n|\n/u)
					.filter(Boolean)
				expect(commits).toEqual(
					success
						? [
								...(condition === 'same run'
									? ['Overwrite with scaffold 1.2.3', 'overwritten.txt']
									: []),
								`Format with oxfmt ${String(formatter.version)}`,
								'owned.ts',
							]
						: [],
				)
				expect(spawnSync('git', ['status', '--porcelain'], options).stdout.toString() === '').toBe(
					success,
				)
				expect(run.stdout).toContain(
					condition === 'resume'
						? 'format evidence is absent in this run'
						: condition === 'unrelated'
							? 'stray.txt'
							: condition === 'missing version'
								? 'oxfmt/package.json'
								: condition === 'format failure'
									? '"step":"format"'
									: `Format with oxfmt ${String(formatter.version)}`,
				)
			} finally {
				scratch.destroy()
			}
		},
		30_000,
	)

	it('refuses another bin package without an installed scaffold and never executes its own bin', () => {
		const scratch = createScratch({
			parent: join(WORKSPACE_ROOT, 'tmp', 'units'),
			prefix: 'wave-bin-',
		})
		try {
			scratch.write('package.json', '{"name":"@fixture/tool","version":"1.0.0"}')
			scratch.write('dist/bin/main.js', "require('node:fs').writeFileSync('called.txt', 'called')")
			const run = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'verify', '--to', 'verify', '--json'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(2)
			expect(run.stderr.trim()).toBe(
				`wave: no @orkestrel/scaffold executable under ${scratch.path}, and its manifest declares none; run npm install --save-dev @orkestrel/scaffold first`,
			)
			expect(scratch.has('called.txt')).toBe(false)
			scratch.write(
				'package.json',
				'{"name":"@fixture/tool","version":"1.0.0","devDependencies":{"@orkestrel/scaffold":"^1.0.0"}}',
			)
			const declared = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'verify', '--to', 'verify', '--json'],
				{ cwd: scratch.path },
			)
			expect(declared.status).toBe(2)
			expect(declared.stderr.trim()).toBe(
				`wave: no @orkestrel/scaffold executable under ${scratch.path}; run npm install to install its declared @orkestrel/scaffold dependency first`,
			)
			expect(scratch.has('called.txt')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('F20 refuses an unreported descendant of a reported file and preserves HEAD', () => {
		const fixture = createWaveWorkspace('orkestrel-wave-descendant-')
		try {
			fixture.scratch.write('.editorconfig', 'stale\n')
			trackFiles(fixture.target)
			commitFiles(fixture.target)
			const repaired = runSkillScript(
				'dist/bin/main.js',
				['repair', '--offline', '--target', fixture.target, '--json'],
				{ env: fixture.environment },
			)
			expect(repaired.status).toBe(0)
			expect(repaired.json?.written).toEqual(['.editorconfig'])
			const head = spawnSync('git', ['rev-parse', 'HEAD'], {
				cwd: fixture.target,
				encoding: 'utf8',
			}).stdout
			fixture.scratch.write(
				'tmp/units/wave/overwrite.json',
				JSON.stringify({
					head: head.trim(),
					version: readInstalledRecord(WORKSPACE_ROOT).version,
					offline: false,
					written: repaired.json?.written,
					removed: repaired.json?.removed,
				}),
			)
			if (lstatSync(join(fixture.target, '.editorconfig')).isSymbolicLink())
				throw new Error('Fixture refuses to delete a link')
			unlinkSync(join(fixture.target, '.editorconfig'))
			fixture.scratch.write('.editorconfig/unreported.txt', 'unreported\n')
			const run = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(run.status).toBe(1)
			expect(run.stdout).toContain(
				'dirty paths outside the overwrite: .editorconfig/unreported.txt',
			)
			expect(
				spawnSync('git', ['rev-parse', 'HEAD'], { cwd: fixture.target, encoding: 'utf8' }).stdout,
			).toBe(head)
			expect(
				spawnSync('git', ['diff', '--cached', '--name-only'], {
					cwd: fixture.target,
					encoding: 'utf8',
				}).stdout,
			).toBe('')
		} finally {
			fixture.scratch.destroy()
		}
	}, 30_000)

	it('F2 executes the documented peer-only and tilde audit examples', async () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-scope-' })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			'/vite': { status: 200, body: buildPackument('8.3.4') },
		})
		try {
			const fleet = createFleet(scratch)
			const manifest = readInstalledRecord(fleet.target)
			scratch.write(
				'target/package.json',
				renderPackageManifest({
					...manifest,
					peerDependencies: { '@orkestrel/peer-only': '^0.0.1' },
				}),
			)
			const sink = createSink()
			await new CLI(buildCLIOptions(sink, server.base)).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const answer: unknown = JSON.parse(sink.output[0] ?? '')
			if (!isRecord(answer) || !isArray(answer.releases)) throw new Error('No audit releases')
			const vite = answer.releases.find((entry) => isRecord(entry) && entry.name === 'vite')
			expect(vite).toMatchObject({ range: '~8.2.0', latest: '8.3.4' })
			expect(
				answer.releases.some((entry) => isRecord(entry) && entry.name === '@orkestrel/peer-only'),
			).toBe(false)
			const wave = readFileSync(
				join(WORKSPACE_ROOT, '.agents/skills/orkestrel-publish/references/wave.md'),
				'utf8',
			)
			if (!isRecord(vite)) throw new Error('No vite reading')
			expect(wave).toContain(`vite: ${String(vite.range)} -> ^${String(vite.latest)}`)
			expect(wave).toContain('Peer-only dependencies produce no release reading')
			expect(wave).toContain('Force-verify the same audit population and lookup bounds')
		} finally {
			await server.destroy()
			scratch.destroy()
		}
	}, 30_000)

	it.each(WAVE_JOURNAL_FAILURES)(
		'F1 preserves the installation when completion journaling fails, restored=%s',
		async (restored) => {
			const session = await createWaveSession('orkestrel-wave-journal-failure-')
			try {
				session.scratch.write(
					'consumer/hook.ts',
					[
						"import { readdirSync, mkdirSync } from 'node:fs'",
						"import { join } from 'node:path'",
						"for (const name of readdirSync('tmp/units/wave')) mkdirSync(join('tmp/units/wave', name, '08-pin.log'))",
						`process.exitCode = ${restored ? 1 : 0}`,
					].join('\n'),
				)
				writeFileSync(
					join(session.target, 'package.json'),
					renderPackageManifest({
						...readInstalledRecord(session.target),
						scripts: { postinstall: 'node hook.ts' },
					}),
				)
				const lock = readFileSync(join(session.target, 'package-lock.json'))
				const inventory = readInventory(session.target, ['node_modules'])
				const run = await spawnSkillScript(
					WAVE_SCRIPT,
					['--visit', '--regenerate', '--to', 'pin', '--json'],
					{ cwd: session.target, env: session.environment },
				)
				expect(existsSync(join(session.target, 'node_modules'))).toBe(true)
				expect(run.status).toBe(1)
				expect(JSON.stringify(run.json)).toContain('journal failed')
				expect(run.stdout).toContain(restored ? 'tree and lock restored' : 'installed ')
				expect(restored ? readFileSync(join(session.target, 'package-lock.json')) : lock).toEqual(
					lock,
				)
				expect(restored ? readInventory(session.target, ['node_modules']) : inventory).toEqual(
					inventory,
				)
				for (const name of ['vt', 'bp', 'br', 'pr'])
					expect(readInstalledRecord(join(session.target, 'node_modules', name)).version).toBe(
						restored ? '1.0.0' : '1.0.1',
					)
				expect(
					(
						await spawnNpm(['ls', '--all'], {
							workspace: session.target,
							environment: session.environment,
						})
					).code,
				).toBe(restored ? 1 : 0)
			} finally {
				await session.destroy()
			}
		},
		60_000,
	)

	it.skipIf(!supportsDirectoryLinks())(
		'O1 refuses a destination ancestor junction before writes and preserves the outside sentinel',
		async () => {
			const session = await createWaveSession('orkestrel-wave-destination-')
			const link = join(session.target, 'tmp', 'units')
			try {
				const outside = session.scratch.ensure('outside-target')
				const sentinel = session.scratch.write('outside-target/keep.txt', 'keep\n')
				symlinkSync(outside, link, 'junction')
				const lock = readFileSync(join(session.target, 'package-lock.json'))
				const inventory = readInventory(session.target, ['node_modules'])
				const run = await spawnSkillScript(
					WAVE_SCRIPT,
					['--visit', '--regenerate', '--to', 'pin', '--json'],
					{ cwd: session.target, env: session.environment },
				)
				expect(session.scratch.names('outside-target')).toEqual(['keep.txt'])
				expect(readFileSync(sentinel, 'utf8')).toBe('keep\n')
				expect(run.status).toBe(1)
				expect(`${run.stdout}${run.stderr}`).toContain('unsafe wave path')
				expect(readFileSync(join(session.target, 'package-lock.json'))).toEqual(lock)
				expect(readInventory(session.target, ['node_modules'])).toEqual(inventory)
			} finally {
				if (lstatSync(link, { throwIfNoEntry: false })?.isSymbolicLink()) unlinkSync(link)
				await session.destroy()
			}
		},
		60_000,
	)

	it('F1 keeps the active installation when the rollback backup is unavailable', async () => {
		const session = await createWaveSession('orkestrel-wave-missing-backup-')
		try {
			session.scratch.write(
				'consumer/hook.ts',
				[
					"import { readdirSync, renameSync } from 'node:fs'",
					"import { join } from 'node:path'",
					"for (const name of readdirSync('tmp/units/wave')) renameSync(join('tmp/units/wave', name, 'node_modules.before'), join('tmp/units/wave', name, 'node_modules.saved'))",
					'process.exitCode = 1',
				].join('\n'),
			)
			writeFileSync(
				join(session.target, 'package.json'),
				renderPackageManifest({
					...readInstalledRecord(session.target),
					scripts: { postinstall: 'node hook.ts' },
				}),
			)
			const run = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--regenerate', '--to', 'pin', '--json'],
				{ cwd: session.target, env: session.environment },
			)
			expect(existsSync(join(session.target, 'node_modules'))).toBe(true)
			expect(run.status).toBe(1)
			expect(run.stdout).toContain('rollback failed')
			expect(readInstalledRecord(join(session.target, 'node_modules', 'pr')).version).toBe('1.0.1')
		} finally {
			await session.destroy()
		}
	}, 60_000)

	it.skipIf(!supportsDirectoryLinks())(
		'O1 revalidates cleanup ancestry and keeps the proved installation on backup cleanup failure',
		async () => {
			const session = await createWaveSession('orkestrel-wave-cleanup-ancestor-')
			const link = join(session.target, 'tmp', 'units', 'wave')
			try {
				const outside = session.scratch.ensure('outside-target')
				const sentinel = session.scratch.write('outside-target/keep.txt', 'keep\n')
				session.scratch.write(
					'consumer/hook.ts',
					[
						"import { renameSync, symlinkSync } from 'node:fs'",
						"renameSync('tmp/units/wave', 'tmp/units/wave.saved')",
						`symlinkSync(${JSON.stringify(outside)}, 'tmp/units/wave', 'junction')`,
					].join('\n'),
				)
				writeFileSync(
					join(session.target, 'package.json'),
					renderPackageManifest({
						...readInstalledRecord(session.target),
						scripts: { postinstall: 'node hook.ts' },
					}),
				)
				const run = await spawnSkillScript(
					WAVE_SCRIPT,
					['--visit', '--regenerate', '--to', 'pin', '--json'],
					{ cwd: session.target, env: session.environment },
				)
				expect(run.status).toBe(1)
				expect(run.stdout).toContain('backup cleanup failed')
				expect(run.stdout).toContain('unsafe wave path')
				expect(session.scratch.names('outside-target')).toEqual(['keep.txt'])
				expect(readFileSync(sentinel, 'utf8')).toBe('keep\n')
				expect(
					globSync('tmp/units/wave.saved/**/node_modules.before', { cwd: session.target }),
				).toHaveLength(1)
				for (const name of ['vt', 'bp', 'br', 'pr'])
					expect(readInstalledRecord(join(session.target, 'node_modules', name)).version).toBe(
						'1.0.1',
					)
				expect(
					(
						await spawnNpm(['ls', '--all'], {
							workspace: session.target,
							environment: session.environment,
						})
					).code,
				).toBe(0)
			} finally {
				if (lstatSync(link, { throwIfNoEntry: false })?.isSymbolicLink()) unlinkSync(link)
				await session.destroy()
			}
		},
		60_000,
	)

	it('O2 completes the overwrite commit manually after an unrelated commit and resumes at gates', async () => {
		const fixture = await createWaveRecorder('orkestrel-wave-manual-recovery-')
		try {
			fixture.scratch.write('gate.js', "process.stdout.write('recovery gate reached\\n')\n")
			trackFiles(fixture.target)
			commitFiles(fixture.target)
			const options = { cwd: fixture.target, env: fixture.environment }
			expect(
				(
					await spawnSkillScript(
						WAVE_SCRIPT,
						['--visit', '--from', 'overwrite', '--to', 'overwrite', '--json'],
						options,
					)
				).status,
			).toBe(0)
			fixture.scratch.write(
				'package.json',
				renderPackageManifest({
					...readInstalledRecord(fixture.target),
					scripts: {
						'format:check': 'node gate.js',
						'lint:check': 'node gate.js',
						check: 'node gate.js',
						build: 'node gate.js',
						test: 'node gate.js',
					},
				}),
			)
			fixture.scratch.write('src/stray.ts', 'unreported\n')
			fixture.scratch.write('package-lock.json', '{"lockfileVersion":3}\n')
			const refused = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				options,
			)
			expect(refused.status).toBe(1)
			expect(refused.stdout).toContain('dirty paths outside the overwrite: src/stray.ts')
			expect(spawnSync('git', ['add', '--', 'src/stray.ts'], { cwd: fixture.target }).status).toBe(
				0,
			)
			commitFiles(fixture.target)
			const receipt = fixture.scratch.read('tmp/units/wave/overwrite.json')
			const head = spawnSync('git', ['rev-parse', 'HEAD'], {
				cwd: fixture.target,
				encoding: 'utf8',
			}).stdout
			const stale = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				options,
			)
			expect(stale.status).toBe(1)
			expect(stale.stdout).toContain('cannot attribute to an overwrite at HEAD')
			expect(
				spawnSync('git', ['rev-parse', 'HEAD'], { cwd: fixture.target, encoding: 'utf8' }).stdout,
			).toBe(head)
			expect(
				spawnSync(
					'git',
					[
						'add',
						'-A',
						'--',
						'.editorconfig',
						'.claude/rules/removed.md',
						'package.json',
						'package-lock.json',
					],
					{
						cwd: fixture.target,
					},
				).status,
			).toBe(0)
			expect(
				spawnSync(
					'git',
					[
						'commit',
						'-m',
						`Overwrite with scaffold ${String(readInstalledRecord(WORKSPACE_ROOT).version)}`,
					],
					{
						cwd: fixture.target,
						env: { ...process.env, ...fixture.environment },
					},
				).status,
			).toBe(0)
			expect(
				spawnSync('git', ['show', '--format=', '--name-only', 'HEAD'], {
					cwd: fixture.target,
					encoding: 'utf8',
				})
					.stdout.split(/\r\n|\n/)
					.filter(Boolean)
					.sort(),
			).toEqual(['.claude/rules/removed.md', '.editorconfig', 'package-lock.json', 'package.json'])
			expect(
				spawnSync('git', ['status', '--porcelain'], { cwd: fixture.target, encoding: 'utf8' })
					.stdout,
			).toBe('')
			expect(fixture.scratch.read('tmp/units/wave/overwrite.json')).toBe(receipt)
			const gates = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'gates', '--to', 'gates', '--json'],
				options,
			)
			expect(gates.status).toBe(0)
			if (!isArray(gates.json?.steps)) throw new Error('No recovery gate rows')
			expect(gates.json.steps.map((row) => (isRecord(row) ? row.command : undefined))).toEqual([
				'npm run format:check',
				'npm run lint:check',
				'npm run check',
				'npm run build',
				'npm run test',
			])
			expect(gates.stdout).not.toContain('cannot attribute')
			const wave = readFileSync(
				join(WORKSPACE_ROOT, '.agents/skills/orkestrel-publish/references/wave.md'),
				'utf8',
			)
			expect(wave).toContain('complete the intended overwrite commit by hand')
			expect(wave).toContain('resume with `--from gates`')
		} finally {
			await fixture.destroy()
		}
	}, 30_000)

	it('documents the audit release pin scope and the npm route with the declared step order', () => {
		const wave = readFileSync(
			join(WORKSPACE_ROOT, '.agents/skills/orkestrel-publish/references/wave.md'),
			'utf8',
		)
		expect(wave).toContain("Re-pin every range the audit's release readings name")
		expect(wave).toContain('Force-verify the same audit population and lookup bounds')
		expect(wave).toContain('scripts spawn the npm CLI beside the running')
		const skill = readFileSync(
			join(WORKSPACE_ROOT, '.agents/skills/orkestrel-publish/SKILL.md'),
			'utf8',
		)
		const row = skill.split(/\r\n|\n/).find((line) => line.startsWith('| `scripts/wave.ts`'))
		expect(row).toContain(`(${WAVE_STEPS.join(', ')})`)
		const script = readFileSync(
			join(WORKSPACE_ROOT, '.agents/skills/orkestrel-publish/scripts/wave.ts'),
			'utf8',
		)
		expect(script).toContain(
			"join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')",
		)
	})
	it('refuses ERESOLVE without regeneration and preserves the locked tree', async () => {
		const session = await createWaveSession('orkestrel-wave-refuse-')
		try {
			const lock = readFileSync(join(session.target, 'package-lock.json'))
			const inventory = readInventory(session.target, ['node_modules'])
			const run = await spawnSkillScript(WAVE_SCRIPT, ['--visit', '--to', 'commit', '--json'], {
				cwd: session.target,
				env: session.environment,
			})
			expect(run.status).toBe(1)
			expect(run.json?.steps).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						command: 'npm install',
						exit: 1,
						note: expect.stringContaining('ERESOLVE ('),
					}),
				]),
			)
			expect(JSON.stringify(run.json)).toContain('--regenerate and resume with --from pin')
			const manifest = readInstalledRecord(session.target)
			expect(manifest.devDependencies).toEqual({
				'@orkestrel/scaffold': '1.0.0',
				vt: '^1.0.0',
				bp: '^1.0.0',
				pr: '^1.0.1',
			})
			expect(readFileSync(join(session.target, 'package-lock.json'))).toEqual(lock)
			expect(readInventory(session.target, ['node_modules'])).toEqual(inventory)
			expect(globSync('tmp/units/wave/**/node_modules.before', { cwd: session.target })).toEqual([])
		} finally {
			await session.destroy()
		}
	}, 60_000)

	it.skipIf(!supportsDirectoryLinks())(
		'regenerates the peer cluster and preserves a junction target when deleting the moved tree',
		async () => {
			const session = await createWaveSession('orkestrel-wave-regenerate-')
			try {
				const sentinel = session.scratch.write('sentinel/keep.txt', 'keep\n')
				symlinkSync(
					join(session.scratch.path, 'sentinel'),
					join(session.target, 'node_modules', 'sentinel'),
					'junction',
				)
				const run = await spawnSkillScript(
					WAVE_SCRIPT,
					['--visit', '--regenerate', '--to', 'commit', '--json'],
					{ cwd: session.target, env: session.environment },
				)
				expect(run.status).toBe(0)
				expect(run.json?.steps).toEqual(
					expect.arrayContaining([
						expect.objectContaining({ command: 'npm install', exit: 1, superseded: true }),
						expect.objectContaining({ command: 'npm install (regenerated)', exit: 0 }),
						expect.objectContaining({ command: 'npm ls --all --json', exit: 0 }),
					]),
				)
				for (const name of ['vt', 'bp', 'br', 'pr'])
					expect(readInstalledRecord(join(session.target, 'node_modules', name)).version).toBe(
						'1.0.1',
					)
				expect(
					(
						await spawnNpm(['ls', '--all'], {
							workspace: session.target,
							environment: session.environment,
						})
					).code,
				).toBe(0)
				const committed = spawnSync('git', ['show', 'HEAD:package-lock.json'], {
					cwd: session.target,
					encoding: 'utf8',
				})
				expect(committed.stdout).toContain('"version": "1.0.1"')
				expect(globSync('tmp/units/wave/**/node_modules.before', { cwd: session.target })).toEqual(
					[],
				)
				expect(readFileSync(sentinel, 'utf8')).toBe('keep\n')
				expect(resolveScaffold(session.target)).toEqual([
					process.execPath,
					join(session.target, 'node_modules', '@orkestrel', 'scaffold', 'dist', 'bin', 'main.js'),
				])
				const audit = spawnSync(
					process.execPath,
					[
						join(
							session.target,
							'node_modules',
							'@orkestrel',
							'scaffold',
							'dist',
							'bin',
							'main.js',
						),
						'audit',
						'--json',
					],
					{ cwd: session.target, encoding: 'utf8' },
				)
				expect(audit.status, `${audit.stdout}${audit.stderr}`).toBe(0)
				expect(session.scratch.read('consumer/tmp/calls.txt')).toBe('audit --json\naudit --json\n')
			} finally {
				await session.destroy()
			}
		},
		60_000,
	)

	it('restores the tree and lock when a regenerated peer cluster is unsatisfiable', async () => {
		const session = await createWaveSession('orkestrel-wave-rollback-')
		try {
			const manifest = readInstalledRecord(session.target)
			if (!isRecord(manifest.devDependencies)) throw new Error('No wave dependencies')
			writeFileSync(
				join(session.target, 'package.json'),
				renderPackageManifest({
					...manifest,
					devDependencies: { ...manifest.devDependencies, bp: '1.0.0' },
				}),
			)
			const lock = readFileSync(join(session.target, 'package-lock.json'))
			const inventory = readInventory(session.target, ['node_modules'])
			const run = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--regenerate', '--to', 'pin', '--json'],
				{ cwd: session.target, env: session.environment },
			)
			expect(run.status).toBe(1)
			expect(JSON.stringify(run.json)).toContain('tree and lock restored')
			expect(readFileSync(join(session.target, 'package-lock.json'))).toEqual(lock)
			expect(readInventory(session.target, ['node_modules'])).toEqual(inventory)
		} finally {
			await session.destroy()
		}
	}, 60_000)

	it.each(WAVE_REFUSALS)(
		'refuses regeneration before moving anything: %s',
		async (condition, reason) => {
			const session = await createWaveSession('orkestrel-wave-guard-')
			try {
				const target =
					condition === 'nested' ? session.scratch.ensure('consumer/nested') : session.target
				if (condition === 'link') {
					const moved = join(session.scratch.path, 'linked-modules')
					renameSync(join(target, 'node_modules'), moved)
					symlinkSync(moved, join(target, 'node_modules'), 'junction')
					session.scratch.write('linked-modules/sentinel.txt', 'keep\n')
				}
				if (condition === 'untracked')
					spawnSync('git', ['rm', '--cached', 'package-lock.json'], { cwd: target })
				if (condition === 'dirty')
					writeFileSync(
						join(target, 'package-lock.json'),
						`${readFileSync(join(target, 'package-lock.json'), 'utf8')}\n`,
					)
				if (condition === 'local' || condition === 'workspaces')
					writeFileSync(
						join(target, 'package.json'),
						renderPackageManifest({
							...readInstalledRecord(target),
							...(condition === 'local'
								? { overrides: { unused: 'file:../vt-1.0.0' } }
								: { workspaces: [] }),
						}),
					)
				if (condition === 'ignored') writeFileSync(join(target, '.gitignore'), 'node_modules/\n')
				if (condition === 'nested') {
					for (const entry of session.scratch
						.names('consumer')
						.filter((name) => name !== '.git' && name !== 'nested'))
						renameSync(join(session.target, entry), join(target, entry))
					trackFiles(session.target)
					commitFiles(session.target)
				}
				const lock = readFileSync(join(target, 'package-lock.json'))
				const run = await spawnSkillScript(
					WAVE_SCRIPT,
					['--visit', '--regenerate', '--to', 'pin', '--json'],
					{ cwd: target, env: session.environment },
				)
				expect(run.status).toBe(1)
				expect(JSON.stringify(run.json)).toContain(`ERESOLVE; regeneration refused: ${reason}`)
				expect(readFileSync(join(target, 'package-lock.json'))).toEqual(lock)
				expect(globSync('tmp/units/wave/**/node_modules.before', { cwd: target })).toEqual([])
				expect(
					condition === 'link' ? session.scratch.read('linked-modules/sentinel.txt') : 'keep\n',
				).toBe('keep\n')
			} finally {
				await session.destroy()
			}
		},
		60_000,
	)

	it('records exactly the reported overwrite paths in a clean commit', async () => {
		const fixture = await createWaveRecorder('orkestrel-wave-record-')
		try {
			const overwrite = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'overwrite', '--to', 'overwrite', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(overwrite.status).toBe(0)
			expect(JSON.parse(fixture.scratch.read('tmp/units/wave/overwrite.json') ?? '')).toMatchObject(
				{
					version: readInstalledRecord(WORKSPACE_ROOT).version,
					offline: false,
					written: ['.editorconfig'],
					removed: ['.claude/rules/removed.md'],
				},
			)
			fixture.scratch.write(
				'package.json',
				renderPackageManifest({
					...readInstalledRecord(fixture.target),
					description: 'Converged manifest.',
				}),
			)
			fixture.scratch.write('package-lock.json', '{"lockfileVersion":3}\n')
			const run = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(run.status).toBe(0)
			expect(
				spawnSync('git', ['log', '-1', '--format=%s'], {
					cwd: fixture.target,
					encoding: 'utf8',
				}).stdout.trim(),
			).toBe(`Overwrite with scaffold ${String(readInstalledRecord(WORKSPACE_ROOT).version)}`)
			expect(
				spawnSync('git', ['show', '--format=', '--name-only', 'HEAD'], {
					cwd: fixture.target,
					encoding: 'utf8',
				})
					.stdout.split(/\r\n|\n/)
					.filter(Boolean)
					.sort(),
			).toEqual(['.claude/rules/removed.md', '.editorconfig', 'package-lock.json', 'package.json'])
			expect(
				spawnSync('git', ['status', '--porcelain'], { cwd: fixture.target, encoding: 'utf8' })
					.stdout,
			).toBe('')
		} finally {
			await fixture.destroy()
		}
	}, 30_000)

	it('refuses an unreported dirty path and preserves HEAD', async () => {
		const fixture = await createWaveRecorder('orkestrel-wave-stray-')
		try {
			const head = spawnSync('git', ['rev-parse', 'HEAD'], {
				cwd: fixture.target,
				encoding: 'utf8',
			}).stdout
			const overwrite = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'overwrite', '--to', 'overwrite', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(overwrite.status).toBe(0)
			fixture.scratch.write('src/stray.ts', 'unreported\n')
			const run = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(run.status).toBe(1)
			expect(JSON.stringify(run.json)).toContain('dirty paths outside the overwrite: src/stray.ts')
			expect(
				spawnSync('git', ['rev-parse', 'HEAD'], { cwd: fixture.target, encoding: 'utf8' }).stdout,
			).toBe(head)
		} finally {
			await fixture.destroy()
		}
	}, 30_000)

	it('leaves an offline overwrite uncommitted', async () => {
		const fixture = await createWaveRecorder('orkestrel-wave-offline-')
		try {
			const head = spawnSync('git', ['rev-parse', 'HEAD'], {
				cwd: fixture.target,
				encoding: 'utf8',
			}).stdout
			const overwrite = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--offline', '--from', 'overwrite', '--to', 'overwrite', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(overwrite.status).toBe(0)
			const run = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(run.status).toBe(0)
			expect(JSON.stringify(run.json)).toContain(
				'an offline overwrite stays uncommitted until scaffold publishes',
			)
			expect(
				spawnSync('git', ['rev-parse', 'HEAD'], { cwd: fixture.target, encoding: 'utf8' }).stdout,
			).toBe(head)
		} finally {
			await fixture.destroy()
		}
	}, 30_000)

	it('refuses a stale or absent receipt for dirty paths and accepts a clean tree', async () => {
		const fixture = createWaveWorkspace('orkestrel-wave-stale-')
		try {
			fixture.scratch.write('configs/fixture.ts', 'dirty\n')
			const options = { cwd: fixture.target, env: fixture.environment }
			const missing = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				options,
			)
			expect(missing.status).toBe(1)
			expect(JSON.stringify(missing.json)).toContain(
				'cannot attribute to an overwrite at HEAD: configs/fixture.ts',
			)
			fixture.scratch.write(
				'tmp/units/wave/overwrite.json',
				JSON.stringify({
					head: 'stale',
					version: '9.9.9',
					offline: false,
					written: ['configs/fixture.ts'],
					removed: [],
				}),
			)
			const stale = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				options,
			)
			expect(stale.status).toBe(1)
			expect(JSON.stringify(stale.json)).toContain(
				'cannot attribute to an overwrite at HEAD: configs/fixture.ts',
			)
			trackFiles(fixture.target)
			commitFiles(fixture.target)
			const clean = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				options,
			)
			expect(clean.status).toBe(0)
			expect(JSON.stringify(clean.json)).toContain('nothing to commit')
		} finally {
			fixture.scratch.destroy()
		}
	}, 30_000)

	it('journals full failed-gate output while keeping the stderr tail in the note', async () => {
		const fixture = createWaveWorkspace('orkestrel-wave-journal-')
		try {
			fixture.scratch.write(
				'gate.js',
				"process.stderr.write(Array.from({length:10},(_,index)=>'gate line '+index).join('\\n')+'\\n');process.exitCode=1\n",
			)
			fixture.scratch.write(
				'package.json',
				renderPackageManifest({
					...readInstalledRecord(fixture.target),
					scripts: { 'format:check': 'node gate.js' },
				}),
			)
			const run = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'gates', '--to', 'gates', '--json'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(run.status).toBe(1)
			if (!isArray(run.json?.steps)) throw new Error('No gate rows')
			const row = run.json.steps.find((entry) => isRecord(entry) && entry.step === 'gates')
			if (!isRecord(row) || !isString(row.journal)) throw new Error('No gate journal')
			const journal = readFileSync(row.journal, 'utf8')
			for (const index of Array.from({ length: 10 }, (_, value) => value))
				expect(journal).toContain(`gate line ${index}\n`)
			expect(row.note).toContain('gate line 7 | gate line 8 | gate line 9')
			expect(journal).toContain('command: npm run format:check\nexit: 1\nstdout:')
			const text = await spawnSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'gates', '--to', 'gates'],
				{ cwd: fixture.target, env: fixture.environment },
			)
			expect(text.status).toBe(1)
			expect(text.stdout).toContain('journal=')
		} finally {
			fixture.scratch.destroy()
		}
	}, 30_000)

	it.each(['commit', 'record'])('refuses local manifest specs at %s', (step) => {
		const fixture = createWaveWorkspace('orkestrel-wave-spec-')
		try {
			fixture.scratch.write(
				'package.json',
				renderPackageManifest({
					...readInstalledRecord(fixture.target),
					overrides: { x: { y: 'file:../archive.tgz' } },
				}),
			)
			const run = runSkillScript(WAVE_SCRIPT, ['--visit', '--from', step, '--to', step, '--json'], {
				cwd: fixture.target,
				env: fixture.environment,
			})
			expect(run.status).toBe(1)
			expect(JSON.stringify(run.json)).toContain('overrides.x.y: file:../archive.tgz')
		} finally {
			fixture.scratch.destroy()
		}
	})
	it('prints the layer order from the catalog table and refuses a table it cannot find', () => {
		const plan = runSkillScript(WAVE_SCRIPT, ['--plan', '--json'], { cwd: WORKSPACE_ROOT })
		expect(plan.status).toBe(0)
		expect(
			isRecord(plan.json) &&
				isArray(plan.json.L0) &&
				plan.json.L0.some((entry) => isString(entry) && entry.startsWith('@orkestrel/contract')),
		).toBe(true)
		const text = runSkillScript(WAVE_SCRIPT, ['--plan'], { cwd: WORKSPACE_ROOT })
		expect(text.status).toBe(0)
		expect(text.stdout.startsWith('L0\t@orkestrel/contract')).toBe(true)
		const scratch = createScratch({ prefix: 'orkestrel-wave-plan-' })
		try {
			expect(runSkillScript(WAVE_SCRIPT, ['--plan'], { cwd: scratch.path }).status).toBe(2)
			scratch.write(
				'table.md',
				'<!-- orkestrel:catalog -->\n| `@orkestrel/one` | `1.0.0` | L1 | | |\n| `@orkestrel/zero` | `0.1.0` | L0 | | |\n<!-- /orkestrel:catalog -->\n',
			)
			const custom = runSkillScript(WAVE_SCRIPT, ['--plan', '--catalog', 'table.md', '--json'], {
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
			scratch.write('node_modules/@orkestrel/scaffold/dist/bin/main.js', '')
			const run = runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			const regeneration = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--dry-run', '--regenerate', '--json'],
				{ cwd: scratch.path },
			)
			expect(regeneration.status).toBe(0)
			if (!isArray(regeneration.json?.steps)) throw new Error('No regeneration plan')
			expect(
				regeneration.json.steps.filter((row) => isRecord(row) && row.command === 'npm install'),
			).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ step: 'pin', note: 'dry run (regenerates on ERESOLVE)' }),
					expect.objectContaining({ step: 'install', note: 'dry run (regenerates on ERESOLVE)' }),
				]),
			)
			const steps = run.json?.steps
			if (!isArray(steps)) throw new Error('The visit carries no steps')
			const names = steps.map((step) => (isRecord(step) ? step.step : ''))
			expect([...new Set(names)]).toEqual(WAVE_STEPS)
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
			const text = runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path })
			expect(text.status).toBe(0)
			expect(text.stdout).toContain(
				'git commit --only -m Re-pin the @orkestrel ranges for the release visit -- package.json package-lock.json',
			)
			for (const message of ['Overwrite with scaffold <version>', 'Format with oxfmt <version>'])
				expect(text.stdout).toContain(
					`git --literal-pathspecs commit --only -m ${message} --pathspec-from-file=- --pathspec-file-nul`,
				)
			expect(text.stdout).toContain('audit --json')
			expect(text.stdout).toContain('--version 1.0.0')
			expect(text.stdout).toContain(`${join('orkestrel-publish', 'scripts', 'pins.ts')} --version`)
			expect(text.stdout).toContain('npm view @fixture/pkg --json')
			expect(text.stdout).toContain('wave: ruling dist unanswered, ranges unanswered')
			const prior = runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--prior', '0.9.0'], {
				cwd: scratch.path,
			})
			expect(prior.status).toBe(0)
			expect(prior.stdout).toContain('--version 0.9.0')
			expect(prior.stdout).not.toContain('--version 1.0.0')
			const offline = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--dry-run', '--offline', '--from', 'overwrite', '--to', 'overwrite'],
				{ cwd: scratch.path },
			)
			expect(offline.status).toBe(0)
			expect(offline.stdout).toContain('overwrite --json --offline')
			expect(offline.stdout).toContain('audit --offline')
			const sliced = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--dry-run', '--from', 'format', '--to', 'gates', '--json'],
				{ cwd: scratch.path },
			)
			const slice = sliced.json?.steps
			if (!isArray(slice)) throw new Error('The sliced visit carries no steps')
			expect(new Set(slice.map((step) => (isRecord(step) ? step.step : '')))).toEqual(
				new Set(['format', 'record', 'gates']),
			)
			const written = runSkillScript(
				WAVE_SCRIPT,
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
			const planned = runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--json'], {
				cwd: scratch.path,
			})
			expect(planned.status).toBe(0)
			const steps = planned.json?.steps
			if (!isArray(steps)) throw new Error('The visit carries no steps')
			expect([...new Set(steps.map((step) => (isRecord(step) ? step.step : '')))]).toEqual(
				WAVE_STEPS,
			)
			const skipped = steps.filter((step) => isRecord(step) && step.step === 'overwrite')
			expect(skipped).toEqual([
				{
					step: 'overwrite',
					command: expect.stringContaining('overwrite --json'),
					durationMs: 0,
					note: 'skipped with its audit: @orkestrel/scaffold is the package whose checkout the vendored host is staged from',
				},
			])
			const own = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'overwrite', '--to', 'verify'],
				{
					cwd: scratch.path,
				},
			)
			expect(own.status).toBe(0)
			const record = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'record', '--to', 'record', '--json'],
				{ cwd: scratch.path },
			)
			expect(record.status).toBe(0)
			expect(record.json?.steps).toEqual([
				expect.objectContaining({ step: 'record', note: 'skipped: @orkestrel/scaffold' }),
			])
			expect(scratch.read('calls.txt')).toBe('audit --json\n')
			if (lstatSync(join(scratch.path, 'calls.txt')).isSymbolicLink())
				throw new Error('Fixture refuses to delete a link')
			scratch.remove('calls.txt')
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			scratch.write(
				'node_modules/@orkestrel/scaffold/dist/bin/main.js',
				scratch.read('dist/bin/main.js') ?? '',
			)
			const other = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'overwrite', '--to', 'verify'],
				{
					cwd: scratch.path,
				},
			)
			expect(other.status).toBe(1)
			expect(scratch.read('calls.txt')).toBe('overwrite --json\naudit\naudit --json\n')
		} finally {
			scratch.destroy()
		}
	})

	it('carries the refusal a JSON verb writes on stdout into its step row, online and offline, and the stderr tail otherwise', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-refusal-' })
		const message =
			'The manifest at . does not declare a planned dependency: @orkestrel/browser. The configs and tests groups are blocked.'
		const cases: ReadonlyArray<readonly [answer: string, flags: readonly string[], note: string]> =
			[
				[JSON.stringify({ error: { code: 'TARGET', message } }), [], `TARGET: ${message}`],
				[
					JSON.stringify({ error: { code: 'TARGET', message } }),
					['--offline'],
					`TARGET: ${message}`,
				],
				[
					JSON.stringify({
						note: 'The catalog step did not complete: FETCH: the registry refused.',
					}),
					[],
					'The catalog step did not complete: FETCH: the registry refused.',
				],
				['not a JSON value', [], 'second | third | last'],
				['not a JSON value', ['--offline'], 'second | third | last'],
			]
		try {
			// The recorder stands in for the scaffold executable: every verb prints the
			// answer file on stdout and four lines on stderr, then exits 1.
			scratch.write(
				'node_modules/@orkestrel/scaffold/dist/bin/main.js',
				[
					"const { readFileSync } = require('node:fs')",
					"process.stdout.write(readFileSync('answer.txt', 'utf8'))",
					"process.stderr.write('first\\nsecond\\nthird\\nlast\\n')",
					'process.exitCode = 1',
					'',
				].join('\n'),
			)
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			const notes = cases.map(([answer, flags]): unknown => {
				scratch.write('answer.txt', `${answer}\n`)
				const run = runSkillScript(
					WAVE_SCRIPT,
					['--visit', '--from', 'overwrite', '--to', 'overwrite', '--json', ...flags],
					{ cwd: scratch.path },
				)
				expect(run.status).toBe(1)
				const steps = run.json?.steps
				if (!isArray(steps)) throw new Error('The visit carries no steps')
				const row = steps.find((step) => isRecord(step) && step.step === 'overwrite')
				return isRecord(row) ? row.note : undefined
			})
			expect(notes).toStrictEqual(cases.map(([, , note]) => note))
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown or inverted step range, a flag with no value, a malformed prior version, no mode, two modes, and reports an unreadable target as 2', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-usage-' })
		try {
			scratch.write('node_modules/@orkestrel/scaffold/dist/bin/main.js', '')
			expect(runSkillScript(WAVE_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--plan', '--regenerate'], { cwd: scratch.path }).status,
			).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--plan', '--visit', '--dry-run'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--from', 'bogus'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--from', 'gates', '--to', 'pin'], {
					cwd: scratch.path,
				}).status,
			).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--target'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status,
			).toBe(2)
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--prior', 'x'], { cwd: scratch.path })
					.status,
			).toBe(64)
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run', '--prior'], { cwd: scratch.path })
					.status,
			).toBe(64)
			scratch.write('package.json', '{ this is not json')
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status,
			).toBe(2)
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			if (lstatSync(join(scratch.path, 'node_modules')).isSymbolicLink())
				throw new Error('Fixture refuses to delete a link')
			scratch.remove('node_modules')
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status,
			).toBe(2)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a flag it does not read, the equals form included, before it runs a step', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-unknown-' })
		try {
			scratch.write('node_modules/@orkestrel/scaffold/dist/bin/main.js', '')
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			for (const argv of [
				['--visit', '--dry-run', '--bogus'],
				['--visit', '--dry-run', '--from=pin'],
				['--visit', '--target=.', '--dry-run'],
				['--visit', '--dry-run', '--json=1'],
				['--plan', '--json=1'],
				['--plan', '--catalog=table.md'],
				['--bogus'],
			]) {
				const run = runSkillScript(WAVE_SCRIPT, argv, { cwd: scratch.path })
				expect([argv, run.status]).toStrictEqual([argv, 64])
				expect(run.stderr).toContain('wave: unknown flag')
				expect(run.stderr).toContain('usage: wave.ts --visit')
				expect(run.stdout).toBe('')
			}
		} finally {
			scratch.destroy()
		}
	})

	it('reports a sweep hit as a reading and keeps the exit at zero', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-reading-' })
		try {
			scratch.write('node_modules/@orkestrel/scaffold/dist/bin/main.js', '')
			scratch.write('package.json', '{"name":"@fixture/pkg","version":"1.0.0"}')
			scratch.write('src/a.ts', '"1.0.0"\n')
			const run = runSkillScript(
				WAVE_SCRIPT,
				['--visit', '--from', 'pins', '--to', 'pins', '--json'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(run.json?.steps).toEqual([expect.objectContaining({ step: 'pins', exit: 3 })])
			expect(run.json?.ruling).toMatchObject({ hits: 1 })
		} finally {
			scratch.destroy()
		}
	})
})

describe('the failure predicate', () => {
	it('reads a nonzero exit as a failure unless it is superseded, a dry run, or a pins or compare reading', () => {
		for (const [label, rows, expected] of WAVE_FAILURE_ROWS) {
			const steps = rows.map(([step, exit, superseded]): StepResult => ({
				step,
				command: step,
				exit,
				durationMs: 0,
				note: undefined,
				...(superseded ? { superseded: true as const } : {}),
			}))
			expect([label, failed(steps)]).toStrictEqual([label, expected])
		}
	})
})

describe('the dirty paths', () => {
	it('reads each entry once and a rename or copy with its original path', () => {
		expect(readDirtyPaths('')).toEqual([])
		expect(readDirtyPaths('?? a.ts\0')).toEqual(['a.ts'])
		expect(readDirtyPaths(' M src/b.ts\0A  c.ts\0')).toEqual(['src/b.ts', 'c.ts'])
		expect(readDirtyPaths('R  new.ts\0M  old name.ts\0?? other.ts\0')).toEqual([
			'new.ts',
			'M  old name.ts',
			'other.ts',
		])
		expect(readDirtyPaths('C  copy.ts\0src.ts\0')).toEqual(['copy.ts', 'src.ts'])
		expect(readDirtyPaths(' R new.ts\0old.ts\0')).toEqual(['new.ts', 'old.ts'])
		expect(readDirtyPaths('?? a\nb.ts\0')).toEqual(['a\nb.ts'])
		expect(readDirtyPaths('?? Copy.ts\0?? Rename.ts\0')).toEqual(['Copy.ts', 'Rename.ts'])
		expect(readDirtyPaths('?? last.ts')).toEqual(['last.ts'])
	})

	it('reads a status of many entries without recursing once per path', () => {
		const paths = readDirtyPaths(buildDirtyStatus(50_000))
		expect(paths).toHaveLength(50_000)
		expect(paths[0]).toBe('src/file0.ts')
		expect(paths.at(-1)).toBe('src/file49999.ts')
	})
})

describe('the command rendering', () => {
	it('names the running Node binary as node and joins the arguments', () => {
		expect(renderCommand(process.execPath, ['x.js', '--a'])).toBe('node x.js --a')
		expect(renderCommand('git', ['status', '--porcelain'])).toBe('git status --porcelain')
		expect(renderCommand('git', [])).toBe('git')
	})

	it('renders a visit as one line per step, the ruling, each moved range, and the release row', () => {
		const visit: Visit = {
			target: '/t',
			name: '@fixture/pkg',
			version: '1.0.0',
			steps: [
				{ step: 'pin', command: 'npm install', exit: 0, durationMs: 12, note: 'done' },
				{
					step: 'compare',
					command: 'x',
					exit: undefined,
					durationMs: 0,
					note: undefined,
					journal: 'j.log',
				},
			],
			ruling: { distMoved: true, rangesMoved: false, ranges: ['r1'], hits: 2 },
			row: '| @fixture/pkg | 1.0.0 | bump | reading | round |',
		}
		const lines = renderVisit(visit).split('\n')
		expect(lines[0]).toMatch(/^wave: pin +exit=0 +12 ms {2}npm install {2}\(done\)$/u)
		expect(lines[1]).toMatch(/^wave: compare +exit=dry +0 ms {2}x {2}journal=j\.log$/u)
		expect(lines.slice(2)).toEqual([
			'wave: ruling dist moved, ranges same, 2 self-pin hit(s)',
			'wave: range r1',
			'| @fixture/pkg | 1.0.0 | bump | reading | round |',
			'',
		])
		expect(describeChange(undefined, 'moved', 'same')).toBe('unanswered')
		expect(describeChange(true, 'moved', 'same')).toBe('moved')
		expect(describeChange(false, 'moved', 'same')).toBe('same')
	})
})

describe('the audit readings', () => {
	it('reads the release readings out of an audit envelope and refuses one that carries none', () => {
		const envelope =
			'noise\n{"releases":[{"name":"a","range":"^1.0.0","latest":"1.2.0"},{"name":"b"},5,{"name":"c","range":"1.0.0"}]}\n'
		expect(readReleases(envelope)).toEqual([
			{ name: 'a', range: '^1.0.0', latest: '1.2.0' },
			{ name: 'c', range: '1.0.0', latest: undefined },
		])
		expect(readReleases('{"releases":[]}')).toEqual([])
		expect(readReleases('{}')).toBeUndefined()
		expect(readReleases('{"releases":"x"}')).toBeUndefined()
		expect(readReleases('')).toBeUndefined()
	})

	it('names a failure by its envelope, its note, or the tail of its standard error', () => {
		expect(describeFailure(buildSpawnResult(0, '{"note":"n"}', 'e'))).toBeUndefined()
		expect(
			describeFailure(buildSpawnResult(1, '{"error":{"code":"TARGET","message":"m"}}', 'e')),
		).toBe('TARGET: m')
		expect(describeFailure(buildSpawnResult(1, '{"note":"n"}', 'e'))).toBe('n')
		expect(describeFailure(buildSpawnResult(1, '', 'a\nb\n\nc\nd\n'))).toBe('b | c | d')
		expect(describeFailure(buildSpawnResult(1, '{"error":{"code":"X"}}', 'e1\n'))).toBe('e1')
		expect(readVerdict(buildSpawnResult(null))).toEqual({ exit: undefined, note: '' })
		expect(readVerdict(buildSpawnResult(0))).toEqual({ exit: 0, note: undefined })
	})

	it('reads the pin audit exit 1 as the drift the step closes and refuses an audit with no envelope', () => {
		const envelope = '{"releases":[{"name":"a","range":"^1.0.0","latest":"1.2.0"}]}'
		expect(judgePin(buildSpawnResult(0, envelope))).toEqual({
			exit: 0,
			note: '1 release reading(s)',
		})
		expect(judgePin(buildSpawnResult(1, envelope))).toEqual({
			exit: 0,
			note: '1 release reading(s)',
		})
		expect(judgePin(buildSpawnResult(2, envelope, 'bad\n'))).toEqual({ exit: 2, note: 'bad' })
		expect(judgePin(buildSpawnResult(0, ''))).toEqual({
			exit: 2,
			note: 'the audit printed no releases envelope',
		})
		expect(judgePin(buildSpawnResult(3, ''))).toEqual({
			exit: 3,
			note: 'the audit printed no releases envelope',
		})
		expect(judgePin(buildSpawnResult(null, ''))).toMatchObject({ exit: 2 })
	})

	it('reads the offline catalog refusal as a pass and every other overwrite exit by its code', () => {
		const refusal = '{"note":"\'catalog\' does not take --offline"}'
		expect(judgeOverwrite(buildSpawnResult(1, refusal), true)).toEqual({
			exit: 0,
			note: 'offline overwrite skipped the catalog step by design',
		})
		expect(judgeOverwrite(buildSpawnResult(1, '{"note":"other"}'), true)).toEqual({
			exit: 1,
			note: 'other',
		})
		expect(judgeOverwrite(buildSpawnResult(1, refusal), false)).toEqual({
			exit: 1,
			note: expect.any(String),
		})
		expect(judgeOverwrite(buildSpawnResult(0), true)).toEqual({ exit: 0, note: undefined })
		expect(judgeOverwrite(buildSpawnResult(2, refusal), true).exit).toBe(2)
	})

	it('reads the verify audit exit 1 as expected on the scaffold checkout alone', () => {
		const envelope = '{"releases":[]}'
		expect(judgeVerify(buildSpawnResult(1, envelope), true)).toEqual({
			exit: 0,
			note: 'foreign-path findings are expected on the scaffold checkout',
		})
		expect(judgeVerify(buildSpawnResult(1, envelope, 'drift\n'), false)).toEqual({
			exit: 1,
			note: 'drift',
		})
		expect(judgeVerify(buildSpawnResult(0, envelope), false)).toEqual({ exit: 0, note: undefined })
		expect(judgeVerify(buildSpawnResult(2, envelope), true).exit).toBe(2)
		expect(judgeVerify(buildSpawnResult(1, ''), true)).toEqual({
			exit: 1,
			note: 'the audit printed no releases envelope',
		})
		expect(judgeVerify(buildSpawnResult(0, ''), false).exit).toBe(2)
	})

	it('reads the conflict an ERESOLVE install names and nothing from another failure', () => {
		const code = 'npm error code ERESOLVE\n'
		expect(
			extractConflict(
				buildSpawnResult(
					1,
					'',
					`${code}npm error Could not resolve dependency:\nnpm error Conflicting peer dependency: x@1\n`,
				),
			),
		).toBe('Conflicting peer dependency: x@1')
		expect(
			extractConflict(buildSpawnResult(1, '', `${code}npm ERR! Could not resolve dependency:\n`)),
		).toBe('Could not resolve dependency:')
		expect(extractConflict(buildSpawnResult(1, '', code))).toBe(
			'the install could not move a locked peer',
		)
		expect(extractConflict(buildSpawnResult(1, '', 'npm error code E404\n'))).toBeUndefined()
		expect(extractConflict(buildSpawnResult(0, '', 'ERESOLVEX'))).toBeUndefined()
	})
})

describe('the manifest ranges', () => {
	it('reads a manifest, the string ranges of its fields, and refuses an absent or unreadable one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-ranges-' })
		try {
			expect(readManifest(scratch.path)).toBeUndefined()
			scratch.write('package.json', '{ this is not json')
			expect(readManifest(scratch.path)).toBeUndefined()
			scratch.write(
				'package.json',
				JSON.stringify({
					dependencies: { a: '^1.0.0' },
					devDependencies: { b: '~2.0.0', n: 1 },
					peerDependencies: 'x',
				}),
			)
			const manifest = readManifest(scratch.path)
			if (manifest === undefined) throw new Error('The manifest did not read')
			expect([...readRanges(manifest, RANGE_FIELDS)]).toEqual([
				['dependencies a', '^1.0.0'],
				['devDependencies b', '~2.0.0'],
			])
		} finally {
			scratch.destroy()
		}
	})

	it('lists each range the final set added, removed, or changed against the published set, sorted', () => {
		expect(
			compareRanges(
				new Map([
					['dependencies a', '^1.0.0'],
					['dependencies c', '^1.0.0'],
					['dependencies d', '^1.0.0'],
				]),
				new Map([
					['dependencies a', '^1.1.0'],
					['dependencies b', '^1.0.0'],
					['dependencies d', '^1.0.0'],
				]),
			),
		).toEqual([
			'dependencies a ^1.0.0 -> ^1.1.0',
			'dependencies b ^1.0.0 added',
			'dependencies c ^1.0.0 removed',
		])
		expect(compareRanges(new Map(), new Map())).toEqual([])
	})

	it('moves each named dependency to the caret of its latest release, once per name', () => {
		const releases: readonly Release[] = [
			{ name: 'a', range: '^1.0.0', latest: '1.2.0' },
			{ name: 'a', range: '^1.0.0', latest: '1.2.0' },
			{ name: 'b', range: '^1.0.0', latest: undefined },
			{ name: 'c', range: '^1.0.0', latest: '3.0.0' },
		]
		expect(computeRanges({ a: '^1.0.0', b: '^1.0.0', n: 1 }, releases)).toEqual({
			ranges: { a: '^1.2.0', b: '^1.0.0', n: 1 },
			moved: ['a ^1.0.0 -> ^1.2.0'],
		})
		expect(computeRanges({ a: '^1.2.0' }, releases)).toEqual({ ranges: { a: '^1.2.0' }, moved: [] })
	})

	it('moves only the arm of a disjunctive range in the release major and keeps every other arm', () => {
		expect(moveRange('^4.1.11', '4.1.12')).toBe('^4.1.12')
		expect(moveRange('^4.1.11 || ^5.0.4', '5.0.5')).toBe('^4.1.11 || ^5.0.5')
		expect(moveRange('^6.0.3 || ^7.0.2', '6.0.3')).toBe('^6.0.3 || ^7.0.2')
		expect(moveRange('^6.0.2||~7.0.1', '6.0.3')).toBe('^6.0.3 || ~7.0.1')
		expect(moveRange('^4.1.12 || ^5.0.5', '6.0.0')).toBe('^4.1.12 || ^5.0.5')
		expect(moveRange(undefined, '1.2.0')).toBe('^1.2.0')
		const releases: readonly Release[] = [{ name: 'vitest', range: '^4.1.11', latest: '4.1.12' }]
		expect(computeRanges({ vitest: '^4.1.11 || ^5.0.5' }, releases)).toEqual({
			ranges: { vitest: '^4.1.12 || ^5.0.5' },
			moved: ['vitest ^4.1.11 || ^5.0.5 -> ^4.1.12 || ^5.0.5'],
		})
		expect(computeRanges({ vitest: '^4.1.12 || ^5.0.5' }, releases)).toEqual({
			ranges: { vitest: '^4.1.12 || ^5.0.5' },
			moved: [],
		})
	})

	it('rewrites the manifest only when a range moved', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-write-' })
		try {
			expect(writeRanges(scratch.path, [])).toEqual([])
			const original = `{\n  "name": "x",\n  "dependencies": { "a": "^1.2.0" }\n}\n`
			scratch.write('package.json', original)
			const same: readonly Release[] = [{ name: 'a', range: '^1.2.0', latest: '1.2.0' }]
			expect(writeRanges(scratch.path, same)).toEqual([])
			expect(scratch.read('package.json')).toBe(original)
			scratch.write(
				'package.json',
				JSON.stringify({
					name: 'x',
					dependencies: { a: '^1.0.0' },
					peerDependencies: { a: '^1.0.0' },
					devDependencies: { a: '^1.0.0' },
				}),
			)
			const moved: readonly Release[] = [{ name: 'a', range: '^1.0.0', latest: '1.2.0' }]
			expect(writeRanges(scratch.path, moved)).toEqual([
				'a ^1.0.0 -> ^1.2.0',
				'a ^1.0.0 -> ^1.2.0',
				'a ^1.0.0 -> ^1.2.0',
			])
			expect(scratch.read('package.json')).toBe(
				`${JSON.stringify(
					{
						name: 'x',
						dependencies: { a: '^1.2.0' },
						peerDependencies: { a: '^1.2.0' },
						devDependencies: { a: '^1.2.0' },
					},
					null,
					'\t',
				)}\n`,
			)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the scaffold executable, the receipt, and the catalog', () => {
	it('prefers the installed scaffold entry and permits an own build only for the scaffold manifest', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-scaffold-' })
		try {
			expect(resolveScaffold(scratch.path)).toEqual([])
			const own = scratch.write('dist/bin/main.js', '')
			expect(resolveScaffold(scratch.path)).toEqual([])
			scratch.write('package.json', '{"name":"@fixture/tool"}')
			expect(resolveScaffold(scratch.path)).toEqual([])
			scratch.write('package.json', '{"name":"@orkestrel/scaffold"}')
			expect(resolveScaffold(scratch.path).map((path) => normalizeSlashes(path))).toEqual(
				[process.execPath, own].map((path) => normalizeSlashes(path)),
			)
			const installed = scratch.write('node_modules/@orkestrel/scaffold/dist/bin/main.js', '')
			expect(resolveScaffold(scratch.path).map((path) => normalizeSlashes(path))).toEqual(
				[process.execPath, installed].map((path) => normalizeSlashes(path)),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('reads the overwrite receipt and refuses one that is absent, unreadable, or short a field', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-receipt-' })
		try {
			expect(readReceipt(scratch.path)).toBeUndefined()
			const receipt = { head: 'abc', version: '1.0.0', offline: false, written: ['a'], removed: [] }
			scratch.write('tmp/units/wave/overwrite.json', JSON.stringify(receipt))
			expect(readReceipt(scratch.path)).toEqual(receipt)
			for (const bad of [
				'not json',
				'[]',
				JSON.stringify({ ...receipt, head: 1 }),
				JSON.stringify({ ...receipt, version: undefined }),
				JSON.stringify({ ...receipt, offline: 'no' }),
				JSON.stringify({ ...receipt, written: 'a' }),
				JSON.stringify({ ...receipt, written: [1] }),
				JSON.stringify({ ...receipt, removed: [null] }),
			]) {
				scratch.write('tmp/units/wave/overwrite.json', bad)
				expect([bad, readReceipt(scratch.path)]).toStrictEqual([bad, undefined])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('reads the catalog table by layer in numeric order and refuses a file with no table', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-catalog-' })
		try {
			expect(readLayers(join(scratch.path, 'absent.md'))).toBeUndefined()
			const bare = scratch.write('bare.md', '| `@orkestrel/a` | `1.0.0` | L0 | |\n')
			expect(readLayers(bare)).toBeUndefined()
			const table = scratch.write(
				'table.md',
				[
					'<!-- orkestrel:catalog -->',
					'| `@orkestrel/b` | `1.0.0` | L10 | x |',
					'| `@orkestrel/a` | `0.1.0` | L2 | |',
					'| `@orkestrel/c` | `0.2.0` | L2 | |',
					'| not a row |',
					'<!-- /orkestrel:catalog -->',
					'| `@orkestrel/d` | `0.3.0` | L0 | |',
				].join('\n'),
			)
			const layers = readLayers(table)
			expect([...(layers ?? [])]).toEqual([
				['L2', ['@orkestrel/a 0.1.0', '@orkestrel/c 0.2.0']],
				['L10', ['@orkestrel/b 1.0.0']],
			])
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a wave path inside the target, off links, and under directories', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-path-' })
		try {
			expect(() => {
				validateWavePath(scratch.path, join(scratch.path, 'tmp', 'units', 'wave', 'x.log'))
			}).not.toThrow()
			expect(() => {
				validateWavePath(scratch.path, scratch.path)
			}).not.toThrow()
			expect(() => {
				validateWavePath(scratch.path, join(scratch.path, '..', 'outside'))
			}).toThrow('unsafe wave path')
			expect(() => {
				validateWavePath(scratch.path, join(scratch.path, '..'))
			}).toThrow('resolves outside')
			const file = scratch.write('file.txt', 'x')
			expect(() => {
				validateWavePath(scratch.path, join(file, 'child'))
			}).toThrow('is not a directory')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the copied helpers', () => {
	it('reads a flag value, treats a following flag as a missing value, and keeps the first occurrence', () => {
		expect(readOption(['--target', 'dir', '--json'], '--target')).toBe('dir')
		expect(readOption(['--target', 'dir'], '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOption(['--from', '--to', 'x'], '--from')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(
			readMissingFlags(
				['--target', '--json', '--out', 'a', '--from'],
				['--target', '--out', '--from'],
			),
		).toEqual(['--target', '--from'])
		expect(readMissingFlags(['--out', 'a'], ['--target'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(
			readUnknownFlags(
				['--target=dir', '--json', '--prior', '1.0.0', '--prio', 'x'],
				['--target', '--json', '--prior'],
			),
		).toEqual(['--target=dir', '--prio'])
		expect(readUnknownFlags(['--from', 'pin', '--', 'node', '--watch'], ['--from'])).toEqual([])
		expect(readUnknownFlags(['--from', 'pin', 'path', '-x'], ['--from'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})

	it('reads the last JSON object line and a whole document, and typed members', () => {
		expect(parseJsonLine('noise\n{"a":1,"b":"x"}\n\n')).toEqual({ a: 1, b: 'x' })
		expect(parseJsonLine('{"a":1}\n[1]\n')).toBeUndefined()
		expect(parseJsonLine('')).toBeUndefined()
		const formatted = '{\n\t"name": "@fixture/pkg",\n\t"version": "1.0.0"\n}\n'
		expect(parseJsonRecord(formatted)).toEqual({ name: '@fixture/pkg', version: '1.0.0' })
		expect(parseJsonLine(formatted)).toBeUndefined()
		expect(parseJsonRecord('[1]')).toBeUndefined()
		expect(parseJsonRecord('not json')).toBeUndefined()
		expect(parseJsonRecord('')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
		expect(isScriptRecord({})).toBe(true)
		expect(isScriptRecord(Object.create(null))).toBe(true)
		expect(isScriptRecord(null)).toBe(false)
		expect(isScriptRecord([])).toBe(false)
		expect(isScriptRecord('record')).toBe(false)
	})

	it('matches the local specs, collects nested specs, and names the local ones by path', () => {
		for (const spec of [
			'file:../other',
			'link:../other',
			'./peer',
			'../up',
			'/abs',
			'C:/x',
			'a.tgz',
		]) {
			expect([spec, matchesLocalSpec(spec)]).toStrictEqual([spec, true])
		}
		for (const spec of [
			'^1.0.0',
			'npm:other@^1.0.0',
			'owner/other.tgz',
			'github:orkestrel/other',
			'',
		]) {
			expect([spec, matchesLocalSpec(spec)]).toStrictEqual([spec, false])
		}
		expect(collectSpecs('overrides', { a: { b: 'file:../other' }, c: '^1.0.0' })).toEqual([
			['overrides.a.b', 'file:../other'],
			['overrides.c', '^1.0.0'],
		])
		expect(collectSpecs('overrides', { a: null, b: ['file:../other'], c: 1 })).toEqual([])
		expect(
			scanLocalSpecs({
				dependencies: { local: 'file:../dependency', remote: '^1.0.0' },
				overrides: { a: { b: 'file:../override' } },
			}),
		).toEqual([
			['dependencies.local', 'file:../dependency'],
			['overrides.a.b', 'file:../override'],
		])
		expect(scanLocalSpecs({})).toEqual([])
	})

	it('removes a nested tree, preserves its sibling, and accepts a missing tree', () => {
		const scratch = createScratch({ prefix: 'orkestrel-wave-removal-' })
		try {
			scratch.write('owned/deep/file.txt', 'remove')
			scratch.write('sibling/file.txt', 'keep')
			const owned = scratch.ensure('owned')
			removeTree(owned)
			expect(scratch.has('owned')).toBe(false)
			expect(scratch.read('sibling/file.txt')).toBe('keep')
			removeTree(owned)
			expect(scratch.has('owned')).toBe(false)
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
