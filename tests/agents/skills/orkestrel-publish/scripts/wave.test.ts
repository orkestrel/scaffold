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
	commitFiles,
	buildCLIOptions,
	createFleet,
	createSink,
	createUpstreamServer,
	createWaveRecording,
	createWaveWorkspace,
	createWaveSession,
	readInstalledRecord,
	renderPackageManifest,
	runSkillScript,
	spawnNpm,
	spawnSkillScript,
	trackFiles,
	WAVE_REFUSALS,
	WAVE_JOURNAL_FAILURES,
	WAVE_SCRIPT,
	WAVE_STEPS,
	WORKSPACE_ROOT,
	FLEET_RELEASE_REPLIES,
} from '../../../../setupServer.js'

describe('wave.ts', () => {
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
		const server = await createUpstreamServer(FLEET_RELEASE_REPLIES)
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
		const fixture = await createWaveRecording('orkestrel-wave-manual-recovery-')
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
		const helpers = readFileSync(
			join(WORKSPACE_ROOT, '.agents/skills/orkestrel-dispatch/scripts/helpers.ts'),
			'utf8',
		)
		expect(helpers).toContain(
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
			expect(manifest.devDependencies).toEqual({ vt: '^1.0.0', bp: '^1.0.0', pr: '^1.0.1' })
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
		const fixture = await createWaveRecording('orkestrel-wave-record-')
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
		const fixture = await createWaveRecording('orkestrel-wave-stray-')
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
		const fixture = await createWaveRecording('orkestrel-wave-offline-')
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
			scratch.write('dist/bin/main.js', '')
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
				'dist/bin/main.js',
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
			scratch.write('dist/bin/main.js', '')
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
			if (lstatSync(join(scratch.path, 'dist')).isSymbolicLink())
				throw new Error('Fixture refuses to delete a link')
			scratch.remove('dist')
			expect(
				runSkillScript(WAVE_SCRIPT, ['--visit', '--dry-run'], { cwd: scratch.path }).status,
			).toBe(2)
		} finally {
			scratch.destroy()
		}
	})
})
