import { createHash } from 'node:crypto'
import { existsSync, lstatSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isRecord } from '@orkestrel/contract'
import { createScratch, supportsDirectoryLinks } from '@orkestrel/test/server'
import {
	appendSwapLedgerRow,
	buildSwapEnvironment,
	buildSwapInvalidNames,
	buildSwapLocalSpecs,
	buildSwapRefusals,
	buildSwapRemoteSpecs,
	buildSwapValidNames,
	checkFormatting,
	commitFiles,
	createRepository,
	createSwapSession,
	installSwapFixture,
	lockManifest,
	probeManifestLock,
	readInstalledRecord,
	readSwapEntry,
	renderPackageManifest,
	runSkillScript,
	spawnNpm,
	spawnSkillScript,
	SWAP_RANGE,
	SWAP_SCRIPT,
	trackFiles,
	unlockManifest,
	writeSwapFixture,
	writeSwapPackage,
	writeSwapSource,
} from '../../../../setupServer.js'

describe('swap.ts', () => {
	it('pins sources to absolute tarball specs, proves the install, reports status, and restores the original bytes', async () => {
		const session = await createSwapSession('orkestrel-swap-pin-')
		try {
			const { scratch, fixture, environment } = session
			await installSwapFixture(fixture.consumer, environment)
			const manifestPath = join(fixture.consumer, 'package.json')
			const original = readFileSync(manifestPath, 'utf8')
			expect(checkFormatting(manifestPath)).toBe(0)
			const pin = [
				'--pin',
				'--consumer',
				fixture.consumer,
				'--source',
				fixture.alpha,
				'--source',
				fixture.beta,
				'--override',
				'@orkestrel/swapfix-beta',
			]
			const options = { cwd: scratch.path, env: environment }
			const dry = await spawnSkillScript(SWAP_SCRIPT, [...pin, '--dry-run', '--json'], options)
			expect(dry).toMatchObject({ status: 0 })
			expect(dry.json).toMatchObject({ mode: 'pin', dry: true, build: true })
			expect(readFileSync(manifestPath, 'utf8')).toBe(original)
			expect(existsSync(join(fixture.consumer, 'tmp', 'tarballs'))).toBe(false)
			const pinned = await spawnSkillScript(SWAP_SCRIPT, [...pin, '--json'], options)
			expect(pinned).toMatchObject({ status: 0 })
			expect(pinned.json).toMatchObject({ mode: 'pin', ok: true, problems: [] })
			const alpha = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')
			const beta = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-beta')
			const tarballs = `file:${join(fixture.consumer, 'tmp', 'tarballs').split('\\').join('/')}/`
			expect(alpha).toMatchObject({
				field: 'dependencies',
				replaced: SWAP_RANGE,
				tarball: expect.stringMatching(/^orkestrel-swapfix-alpha-1\.0\.0-[0-9a-f]{12}\.tgz$/u),
				inventory: expect.stringMatching(/^[0-9a-f]{64}$/u),
			})
			expect(beta.field).toBeUndefined()
			expect(beta.replaced).toBeUndefined()
			const archive = join(fixture.consumer, 'tmp', 'tarballs', String(alpha.tarball))
			const digest = createHash('sha256').update(readFileSync(archive)).digest('hex')
			expect(alpha.sha256).toBe(digest)
			expect(String(alpha.tarball)).toContain(digest.slice(0, 12))
			expect(readInstalledRecord(fixture.consumer)).toMatchObject({
				dependencies: { '@orkestrel/swapfix-alpha': `${tarballs}${String(alpha.tarball)}` },
				devDependencies: { '@orkestrel/swapfix-gamma': SWAP_RANGE },
				overrides: { '@orkestrel/swapfix-beta': `${tarballs}${String(beta.tarball)}` },
			})
			const installed = join(fixture.consumer, 'node_modules', '@orkestrel')
			expect(lstatSync(join(installed, 'swapfix-alpha')).isSymbolicLink()).toBe(false)
			expect(lstatSync(join(installed, 'swapfix-beta')).isSymbolicLink()).toBe(false)
			expect(lstatSync(join(installed, 'swapfix-gamma')).isSymbolicLink()).toBe(false)
			expect(readFileSync(join(installed, 'swapfix-alpha', 'dist', 'index.js'), 'utf8')).toBe(
				readFileSync(join(fixture.alpha, 'src.js'), 'utf8'),
			)
			const receipt = pinned.json?.receipt
			expect(typeof receipt === 'string' && existsSync(join(scratch.path, receipt))).toBe(true)
			expect(checkFormatting(manifestPath)).toBe(0)
			const { overrides, ...rest } = readInstalledRecord(fixture.consumer)
			const appended = scratch.write(
				'appended/package.json',
				renderPackageManifest({ ...rest, overrides }),
			)
			expect(checkFormatting(appended)).not.toBe(0)
			const status = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(status).toMatchObject({ status: 0 })
			expect(status.json).toMatchObject({
				mode: 'status',
				problems: [],
				packages: [
					{
						name: '@orkestrel/swapfix-alpha',
						pinned: true,
						tarball: true,
						installed: { intact: true },
					},
					{
						name: '@orkestrel/swapfix-beta',
						pinned: true,
						tarball: true,
						installed: { intact: true },
					},
				],
				overrides: [{ name: '@orkestrel/swapfix-beta', matches: true }],
			})
			const text = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer],
				options,
			)
			expect(text.status).toBe(0)
			expect(text.stdout).toContain('swap: 2 pin(s), 0 drift(s)')
			const restored = await spawnSkillScript(
				SWAP_SCRIPT,
				['--restore', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(restored).toMatchObject({ status: 0 })
			expect(restored.json).toMatchObject({
				mode: 'restore',
				ok: true,
				restored: [
					{
						name: '@orkestrel/swapfix-alpha',
						range: SWAP_RANGE,
						version: '1.0.0',
						resolved: expect.stringContaining(session.registry.url),
					},
				],
				dropped: ['@orkestrel/swapfix-beta'],
				repin: [
					'--pin',
					'--consumer',
					fixture.consumer.split('\\').join('/'),
					'--source',
					fixture.alpha.split('\\').join('/'),
					'--source',
					fixture.beta.split('\\').join('/'),
					'--override',
					'@orkestrel/swapfix-beta',
				],
			})
			expect(readFileSync(manifestPath, 'utf8')).toBe(original)
			expect(
				JSON.parse(readFileSync(join(fixture.consumer, 'tmp', 'tarballs', 'pins.json'), 'utf8')),
			).toStrictEqual({
				packages: {},
				overrides: {},
			})
			expect(readFileSync(join(fixture.consumer, 'package-lock.json'), 'utf8')).not.toContain(
				'tmp/tarballs',
			)
			expect(lstatSync(join(installed, 'swapfix-alpha')).isSymbolicLink()).toBe(false)
			expect(existsSync(archive)).toBe(true)
		} finally {
			await session.destroy()
		}
	})

	it('keeps the first replaced range across re-pins over the absolute and the relative spec, and reports each drift', async () => {
		const session = await createSwapSession('orkestrel-swap-repin-')
		try {
			const { scratch, fixture, environment } = session
			scratch.write('alpha/.gitignore', 'node_modules\n')
			createRepository(fixture.alpha)
			trackFiles(fixture.alpha)
			commitFiles(fixture.alpha)
			await installSwapFixture(fixture.consumer, environment)
			const options = { cwd: scratch.path, env: environment }
			const first = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					fixture.consumer,
					'--source',
					fixture.alpha,
					'--source',
					fixture.beta,
					'--override',
					'@orkestrel/swapfix-beta',
					'--json',
				],
				options,
			)
			expect(first).toMatchObject({ status: 0 })
			const before = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')
			expect(before).toMatchObject({
				replaced: SWAP_RANGE,
				commit: expect.stringMatching(/^[0-9a-f]{40}$/u),
				dirty: false,
			})
			scratch.write('alpha/src.js', "export const name = 'alpha, rebuilt'\n")
			const rebuilt = await spawnSkillScript(
				SWAP_SCRIPT,
				['--pin', '--consumer', fixture.consumer, '--source', fixture.alpha, '--json'],
				options,
			)
			expect(rebuilt).toMatchObject({ status: 0 })
			const after = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')
			expect(after.tarball).not.toBe(before.tarball)
			expect(after).toMatchObject({ replaced: SWAP_RANGE, dirty: true })
			expect(existsSync(join(fixture.consumer, 'tmp', 'tarballs', String(before.tarball)))).toBe(
				true,
			)
			const installed = join(fixture.consumer, 'node_modules', '@orkestrel', 'swapfix-alpha')
			expect(readFileSync(join(installed, 'dist', 'index.js'), 'utf8')).toBe(
				"export const name = 'alpha, rebuilt'\n",
			)
			const manifestPath = join(fixture.consumer, 'package.json')
			const absolute = `file:${join(fixture.consumer, 'tmp', 'tarballs').split('\\').join('/')}/`
			writeFileSync(
				manifestPath,
				readFileSync(manifestPath, 'utf8').replace(
					`"${absolute}${String(after.tarball)}"`,
					`"file:tmp/tarballs/${String(after.tarball)}"`,
				),
			)
			expect(readInstalledRecord(fixture.consumer).dependencies).toMatchObject({
				'@orkestrel/swapfix-alpha': `file:tmp/tarballs/${String(after.tarball)}`,
			})
			const relative = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(relative).toMatchObject({ status: 0 })
			expect(relative.json).toMatchObject({
				packages: [
					{
						name: '@orkestrel/swapfix-alpha',
						pinned: true,
						manifest: `file:tmp/tarballs/${String(after.tarball)}`,
					},
					{ name: '@orkestrel/swapfix-beta', pinned: true },
				],
				problems: [],
			})
			const legacy = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					fixture.consumer,
					'--source',
					fixture.alpha,
					'--no-build',
					'--json',
				],
				options,
			)
			expect(legacy).toMatchObject({ status: 0 })
			expect(readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')).toMatchObject({
				replaced: SWAP_RANGE,
			})
			expect(readInstalledRecord(fixture.consumer).dependencies).toMatchObject({
				'@orkestrel/swapfix-alpha': `${absolute}${String(after.tarball)}`,
			})
			trackFiles(fixture.alpha)
			commitFiles(fixture.alpha)
			writeFileSync(join(installed, 'dist', 'index.js'), 'export const name = "edited in place"\n')
			const manifest = readInstalledRecord(fixture.consumer)
			const devDependencies = isRecord(manifest.devDependencies) ? manifest.devDependencies : {}
			writeFileSync(
				manifestPath,
				renderPackageManifest({
					...manifest,
					devDependencies: {
						...devDependencies,
						'@orkestrel/swapfix-gamma': 'file:tmp/tarballs/unrecorded.tgz',
					},
				}),
			)
			const drift = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(drift).toMatchObject({ status: 3 })
			const problems = drift.json?.problems
			expect(problems).toEqual(
				expect.arrayContaining([
					'@orkestrel/swapfix-alpha: the installed bytes differ from the pinned build',
					expect.stringMatching(/^@orkestrel\/swapfix-alpha: .+ moved from [0-9a-f]{40}; re-pin$/u),
					'devDependencies.@orkestrel/swapfix-gamma holds a tarball spec the ledger has no record of',
				]),
			)
			const text = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer],
				options,
			)
			expect(text.status).toBe(3)
			expect(text.stdout).toContain(
				'swap: drift: @orkestrel/swapfix-alpha: the installed bytes differ',
			)
			const refused = await spawnSkillScript(
				SWAP_SCRIPT,
				['--pin', '--consumer', fixture.consumer, '--source', fixture.gamma, '--no-build'],
				options,
			)
			expect(refused.status).toBe(64)
			expect(refused.stderr).toContain(
				'@orkestrel/swapfix-gamma holds a tarball spec the ledger has no record of',
			)
		} finally {
			await session.destroy()
		}
	})

	it('reports drift when the manifest names another directory than the ledger archive, and accepts the relative spec that resolves to it', async () => {
		const session = await createSwapSession('orkestrel-swap-location-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			await installSwapFixture(fixture.consumer, environment)
			const pinned = await spawnSkillScript(
				SWAP_SCRIPT,
				['--pin', '--consumer', fixture.consumer, '--source', fixture.alpha, '--no-build'],
				options,
			)
			expect(pinned).toMatchObject({ status: 0 })
			const alpha = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')
			const file = String(alpha.tarball)
			const manifestPath = join(fixture.consumer, 'package.json')
			const pinnedText = readFileSync(manifestPath, 'utf8')
			const archive = join(fixture.consumer, 'tmp', 'tarballs', file).split('\\').join('/')
			const held = `file:${archive}`
			expect(pinnedText).toContain(`"${held}"`)
			const root = scratch.path.split('\\').join('/')
			for (const wrong of [
				`file:${root}/absent/tmp/tarballs/${file}`,
				`file:../absent/tmp/tarballs/${file}`,
				`file:${root}/consumer-copy/tmp/tarballs/${file}`,
			]) {
				writeFileSync(manifestPath, pinnedText.replace(`"${held}"`, `"${wrong}"`))
				const drift = await spawnSkillScript(
					SWAP_SCRIPT,
					['--status', '--consumer', fixture.consumer, '--json'],
					options,
				)
				expect([wrong, drift.status]).toStrictEqual([wrong, 3])
				expect(drift.json).toMatchObject({
					packages: [{ name: '@orkestrel/swapfix-alpha', pinned: false, tarball: true }],
					problems: [`@orkestrel/swapfix-alpha: the manifest does not hold ${archive}`],
				})
			}
			writeFileSync(manifestPath, pinnedText.replace(`"${held}"`, `"file:tmp/tarballs/${file}"`))
			const legacy = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(legacy).toMatchObject({ status: 0 })
			expect(legacy.json).toMatchObject({ problems: [] })
			writeFileSync(manifestPath, pinnedText)
			const restored = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer],
				options,
			)
			expect(restored.status).toBe(0)
		} finally {
			await session.destroy()
		}
	})

	it('packs a pinned consumer that installs elsewhere, and packs a pinned source with the ranges it replaced', async () => {
		const session = await createSwapSession('orkestrel-swap-pack-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			await installSwapFixture(fixture.consumer, environment)
			const pinned = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					fixture.consumer,
					'--source',
					fixture.alpha,
					'--source',
					fixture.beta,
					'--override',
					'@orkestrel/swapfix-beta',
				],
				options,
			)
			expect(pinned).toMatchObject({ status: 0 })
			const packed = await spawnNpm(
				['pack', '--ignore-scripts', '--json', '--pack-destination', scratch.ensure('archives')],
				{ workspace: fixture.consumer, environment },
			)
			expect(packed).toMatchObject({ code: 0 })
			const archive = join(scratch.path, 'archives', 'orkestrel-swapfix-consumer-1.0.0.tgz')
			const elsewhere = writeSwapPackage(scratch.path, 'elsewhere', {
				dependencies: { '@orkestrel/swapfix-consumer': `file:${archive.split('\\').join('/')}` },
			})
			const installed = await spawnNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
				workspace: elsewhere,
				environment,
			})
			expect(installed).toMatchObject({ code: 0 })
			expect(
				existsSync(
					join(elsewhere, 'node_modules', '@orkestrel', 'swapfix-alpha', 'dist', 'index.js'),
				),
			).toBe(true)
			const manifestPath = join(fixture.consumer, 'package.json')
			const pinnedText = readFileSync(manifestPath, 'utf8')
			const alpha = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')
			const absolute = `file:${join(fixture.consumer, 'tmp', 'tarballs').split('\\').join('/')}/`
			writeFileSync(
				manifestPath,
				pinnedText.replace(
					`"${absolute}${String(alpha.tarball)}"`,
					`"file:tmp/tarballs/${String(alpha.tarball)}"`,
				),
			)
			const relative = await spawnNpm(
				['pack', '--ignore-scripts', '--json', '--pack-destination', scratch.ensure('relative')],
				{ workspace: fixture.consumer, environment },
			)
			expect(relative).toMatchObject({ code: 0 })
			writeFileSync(manifestPath, pinnedText)
			const control = writeSwapPackage(scratch.path, 'control', {
				dependencies: {
					'@orkestrel/swapfix-consumer': `file:${join(scratch.path, 'relative', 'orkestrel-swapfix-consumer-1.0.0.tgz').split('\\').join('/')}`,
				},
			})
			const refused = await spawnNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
				workspace: control,
				environment,
			})
			expect(refused.code).not.toBe(0)
		} finally {
			await session.destroy()
		}
	})

	it('packs a source that carries its own pins with the ranges its ledger replaced and leaves its manifest unchanged', async () => {
		const session = await createSwapSession('orkestrel-swap-guard-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			await installSwapFixture(fixture.consumer, environment)
			const pinned = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					fixture.consumer,
					'--source',
					fixture.alpha,
					'--source',
					fixture.beta,
					'--override',
					'@orkestrel/swapfix-beta',
				],
				options,
			)
			expect(pinned).toMatchObject({ status: 0 })
			const pinnedText = readFileSync(join(fixture.consumer, 'package.json'), 'utf8')
			const downstream = writeSwapPackage(scratch.path, 'downstream', {
				dependencies: {
					'@orkestrel/swapfix-alpha': SWAP_RANGE,
					'@orkestrel/swapfix-consumer': SWAP_RANGE,
				},
			})
			await installSwapFixture(downstream, environment)
			const guarded = await spawnSkillScript(
				SWAP_SCRIPT,
				['--pin', '--consumer', downstream, '--source', fixture.consumer, '--no-build', '--json'],
				options,
			)
			expect(guarded).toMatchObject({ status: 0 })
			expect(guarded.json).toMatchObject({ ok: true, problems: [] })
			const carried = readInstalledRecord(
				join(downstream, 'node_modules', '@orkestrel', 'swapfix-consumer'),
			)
			expect(carried.dependencies).toStrictEqual({ '@orkestrel/swapfix-alpha': SWAP_RANGE })
			expect(carried.devDependencies).toStrictEqual({ '@orkestrel/swapfix-gamma': SWAP_RANGE })
			expect(carried.overrides).toBeUndefined()
			expect(readFileSync(join(fixture.consumer, 'package.json'), 'utf8')).toBe(pinnedText)
		} finally {
			await session.destroy()
		}
	})

	it('refuses to pack a source that holds an unrecorded local dependency spec, and accepts every remote form', async () => {
		const session = await createSwapSession('orkestrel-swap-local-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			await installSwapFixture(fixture.consumer, environment)
			const manifestPath = join(fixture.consumer, 'package.json')
			const original = readFileSync(manifestPath, 'utf8')
			const missing = writeSwapSource(scratch.path, 'beta-local', {
				devDependencies: { '@orkestrel/swapfix-beta': 'file:tmp/tarballs/missing.tgz' },
			})
			const repro = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					fixture.consumer,
					'--source',
					missing,
					'--override',
					'@orkestrel/swapfix-beta-local',
					'--no-build',
					'--json',
				],
				options,
			)
			expect(repro.status).toBe(64)
			expect(repro.stderr).toContain(
				'@orkestrel/swapfix-beta-local would pack a local dependency spec: devDependencies.@orkestrel/swapfix-beta is file:tmp/tarballs/missing.tgz',
			)
			expect(readFileSync(manifestPath, 'utf8')).toBe(original)
			expect(existsSync(join(fixture.consumer, 'tmp'))).toBe(false)
			for (const [index, [field, spec]] of buildSwapLocalSpecs().entries()) {
				const source = writeSwapSource(scratch.path, `local${String(index)}`, {
					[field]: { '@orkestrel/swapfix-other': spec },
				})
				const refused = await spawnSkillScript(
					SWAP_SCRIPT,
					[
						'--pin',
						'--consumer',
						fixture.consumer,
						'--source',
						source,
						'--override',
						`@orkestrel/swapfix-local${String(index)}`,
						'--no-build',
						'--dry-run',
					],
					options,
				)
				expect([field, spec, refused.status]).toStrictEqual([field, spec, 64])
				expect(refused.stderr).toContain(
					`would pack a local dependency spec: ${field}.@orkestrel/swapfix-other is ${spec}`,
				)
			}
			for (const [index, [field, spec]] of buildSwapRemoteSpecs().entries()) {
				const source = writeSwapSource(scratch.path, `remote${String(index)}`, {
					[field]: { '@orkestrel/swapfix-other': spec },
				})
				const accepted = await spawnSkillScript(
					SWAP_SCRIPT,
					[
						'--pin',
						'--consumer',
						fixture.consumer,
						'--source',
						source,
						'--override',
						`@orkestrel/swapfix-remote${String(index)}`,
						'--no-build',
						'--dry-run',
					],
					options,
				)
				expect([field, spec, accepted.status]).toStrictEqual([field, spec, 0])
			}
			expect(existsSync(join(fixture.consumer, 'tmp'))).toBe(false)
		} finally {
			await session.destroy()
		}
	})

	it('fails a pin whose install adds an unpinned package or leaves a second copy of a pinned one', async () => {
		const session = await createSwapSession('orkestrel-swap-proof-', (root) => [
			writeSwapSource(root, 'delta'),
			writeSwapSource(root, 'beta2', { name: '@orkestrel/swapfix-beta', version: '2.0.0' }),
		])
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			await installSwapFixture(fixture.consumer, environment)
			writeFileSync(
				join(fixture.alpha, 'package.json'),
				renderPackageManifest({
					...readInstalledRecord(fixture.alpha),
					dependencies: {
						'@orkestrel/swapfix-beta': SWAP_RANGE,
						'@orkestrel/swapfix-delta': SWAP_RANGE,
					},
				}),
			)
			const added = await spawnSkillScript(
				SWAP_SCRIPT,
				['--pin', '--consumer', fixture.consumer, '--source', fixture.alpha, '--json'],
				options,
			)
			expect(added).toMatchObject({ status: 1 })
			expect(added.json).toMatchObject({
				ok: false,
				problems: ['@orkestrel/swapfix-delta was added by the install'],
			})
			const unproved = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(unproved.status).toBe(3)
			expect(unproved.json?.problems).toEqual(
				expect.arrayContaining([
					'@orkestrel/swapfix-alpha: the ledger records no proved install; re-pin',
				]),
			)
			const twice = writeSwapPackage(scratch.path, 'twice', {
				dependencies: {
					'@orkestrel/swapfix-alpha': SWAP_RANGE,
					'@orkestrel/swapfix-beta': '^2.0.0',
				},
			})
			await installSwapFixture(twice, environment)
			writeFileSync(
				join(fixture.alpha, 'package.json'),
				renderPackageManifest({
					...readInstalledRecord(fixture.alpha),
					dependencies: { '@orkestrel/swapfix-beta': SWAP_RANGE },
				}),
			)
			const nested = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					twice,
					'--source',
					fixture.alpha,
					'--source',
					join(scratch.path, 'beta2'),
					'--no-build',
					'--json',
				],
				options,
			)
			expect(nested).toMatchObject({ status: 1 })
			const problems = nested.json?.problems
			expect(problems).toEqual(
				expect.arrayContaining([
					expect.stringMatching(
						/^@orkestrel\/swapfix-beta has another copy at .+; add an --override$/u,
					),
				]),
			)
		} finally {
			await session.destroy()
		}
	})

	it('fails a pin whose override selects no installed dependency, and keeps a transitive-only override that installs one', async () => {
		const session = await createSwapSession('orkestrel-swap-override-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			const bare = writeSwapPackage(scratch.path, 'bare', { engines: { node: '>=24' } })
			await installSwapFixture(bare, environment)
			const unused = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					bare,
					'--source',
					fixture.gamma,
					'--override',
					'@orkestrel/swapfix-gamma',
					'--no-build',
					'--json',
				],
				options,
			)
			expect(unused).toMatchObject({ status: 1 })
			expect(unused.json).toMatchObject({
				ok: false,
				copies: [],
				problems: [
					'@orkestrel/swapfix-gamma is not installed at node_modules/@orkestrel/swapfix-gamma; its override selects no installed dependency',
				],
			})
			expect(existsSync(join(bare, 'node_modules', '@orkestrel', 'swapfix-gamma'))).toBe(false)
			const unproved = await spawnSkillScript(
				SWAP_SCRIPT,
				['--status', '--consumer', bare, '--json'],
				options,
			)
			expect(unproved.status).toBe(3)
			await installSwapFixture(fixture.consumer, environment)
			const transitive = await spawnSkillScript(
				SWAP_SCRIPT,
				[
					'--pin',
					'--consumer',
					fixture.consumer,
					'--source',
					fixture.beta,
					'--override',
					'@orkestrel/swapfix-beta',
					'--no-build',
					'--json',
				],
				options,
			)
			expect(transitive).toMatchObject({ status: 0 })
			expect(transitive.json).toMatchObject({ ok: true, problems: [] })
			expect(readSwapEntry(fixture.consumer, '@orkestrel/swapfix-beta')).toMatchObject({
				inventory: expect.stringMatching(/^[0-9a-f]{64}$/u),
			})
			const installed = join(fixture.consumer, 'node_modules', '@orkestrel', 'swapfix-beta')
			expect(lstatSync(installed).isSymbolicLink()).toBe(false)
			expect(readFileSync(join(installed, 'dist', 'index.js'), 'utf8')).toBe(
				readFileSync(join(fixture.beta, 'src.js'), 'utf8'),
			)
		} finally {
			await session.destroy()
		}
	})

	it('places a created overrides block where the formatter sorts it when the manifest holds no dependency block', async () => {
		const session = await createSwapSession('orkestrel-swap-placement-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			const shapes: ReadonlyArray<Readonly<Record<string, unknown>>> = [
				{ engines: { node: '>=24' } },
				{
					scripts: { test: 'node --test' },
					engines: { node: '>=24' },
					packageManager: 'npm@11.0.0',
				},
				{ config: {}, engines: { node: '>=24' } },
			]
			for (const [index, fields] of shapes.entries()) {
				const consumer = writeSwapPackage(scratch.path, `shape${String(index)}`, fields)
				const manifestPath = join(consumer, 'package.json')
				expect([consumer, checkFormatting(manifestPath)]).toStrictEqual([consumer, 0])
				await spawnSkillScript(
					SWAP_SCRIPT,
					[
						'--pin',
						'--consumer',
						consumer,
						'--source',
						fixture.gamma,
						'--override',
						'@orkestrel/swapfix-gamma',
						'--no-build',
					],
					options,
				)
				expect(readInstalledRecord(consumer).overrides).toMatchObject({
					'@orkestrel/swapfix-gamma': expect.stringContaining('file:'),
				})
				expect([consumer, checkFormatting(manifestPath)]).toStrictEqual([consumer, 0])
			}
		} finally {
			await session.destroy()
		}
	})

	it('restores the manifest bytes whether or not an empty overrides block existed before the pin', async () => {
		const session = await createSwapSession('orkestrel-swap-empty-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			const shapes: ReadonlyArray<readonly [string, Readonly<Record<string, unknown>>]> = [
				['emptied', { dependencies: { '@orkestrel/swapfix-alpha': SWAP_RANGE }, overrides: {} }],
				['absent', { dependencies: { '@orkestrel/swapfix-alpha': SWAP_RANGE } }],
			]
			for (const [directory, fields] of shapes) {
				const consumer = writeSwapPackage(scratch.path, directory, fields)
				await installSwapFixture(consumer, environment)
				const manifestPath = join(consumer, 'package.json')
				const original = readFileSync(manifestPath, 'utf8')
				const pinned = await spawnSkillScript(
					SWAP_SCRIPT,
					[
						'--pin',
						'--consumer',
						consumer,
						'--source',
						fixture.alpha,
						'--override',
						'@orkestrel/swapfix-alpha',
						'--no-build',
					],
					options,
				)
				expect([directory, pinned.status]).toStrictEqual([directory, 0])
				expect(readInstalledRecord(consumer).overrides).toStrictEqual({
					'@orkestrel/swapfix-alpha': '$@orkestrel/swapfix-alpha',
				})
				const restored = await spawnSkillScript(
					SWAP_SCRIPT,
					['--restore', '--consumer', consumer],
					options,
				)
				expect([directory, restored.status]).toStrictEqual([directory, 0])
				expect([directory, readFileSync(manifestPath, 'utf8')]).toStrictEqual([directory, original])
			}
		} finally {
			await session.destroy()
		}
	})

	it('refuses a restore whose ledger names something that is not a package, and deletes and writes nothing', async () => {
		const session = await createSwapSession('orkestrel-swap-names-')
		try {
			const { scratch, fixture, environment } = session
			const options = { cwd: scratch.path, env: environment }
			await installSwapFixture(fixture.consumer, environment)
			const pinned = await spawnSkillScript(
				SWAP_SCRIPT,
				['--pin', '--consumer', fixture.consumer, '--source', fixture.alpha, '--no-build'],
				options,
			)
			expect(pinned).toMatchObject({ status: 0 })
			const manifestPath = join(fixture.consumer, 'package.json')
			const ledgerPath = join(fixture.consumer, 'tmp', 'tarballs', 'pins.json')
			const lockPath = join(fixture.consumer, 'package-lock.json')
			const sentinel = scratch.write('consumer/closure-sentinel/keep.txt', 'keep\n')
			const unrelated = scratch.write(
				'consumer/node_modules/@orkestrel/swapfix-gamma/marker.txt',
				'keep\n',
			)
			const manifest = readFileSync(manifestPath, 'utf8')
			const ledger = readFileSync(ledgerPath, 'utf8')
			const lock = readFileSync(lockPath, 'utf8')
			const alpha = readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')
			const at = '2026-10-19T00:00:00.000Z'
			for (const block of ['packages', 'overrides'] as const) {
				for (const name of buildSwapInvalidNames(scratch.path)) {
					const row = block === 'packages' ? alpha : { value: '*', at }
					writeFileSync(ledgerPath, appendSwapLedgerRow(ledger, block, name, row))
					const refused = await spawnSkillScript(
						SWAP_SCRIPT,
						['--restore', '--consumer', fixture.consumer, '--json'],
						options,
					)
					expect([block, name, refused.status, existsSync(sentinel)]).toStrictEqual([
						block,
						name,
						64,
						true,
					])
					expect(refused.stderr).toContain(
						`The ledger ${block} key ${JSON.stringify(name)} is not a package name`,
					)
					expect(readFileSync(manifestPath, 'utf8')).toBe(manifest)
					expect(readFileSync(lockPath, 'utf8')).toBe(lock)
					expect(
						existsSync(join(fixture.consumer, 'node_modules', '@orkestrel', 'swapfix-alpha')),
					).toBe(true)
				}
			}
			const valid = buildSwapValidNames().reduce(
				(text, name) => appendSwapLedgerRow(text, 'overrides', name, { value: '*', at }),
				ledger,
			)
			writeFileSync(ledgerPath, valid)
			const restored = await spawnSkillScript(
				SWAP_SCRIPT,
				['--restore', '--consumer', fixture.consumer, '--json'],
				options,
			)
			expect(restored).toMatchObject({ status: 0 })
			expect(restored.json).toMatchObject({
				ok: true,
				restored: [
					{
						name: '@orkestrel/swapfix-alpha',
						resolved: expect.stringContaining(session.registry.url),
					},
				],
				dropped: buildSwapValidNames(),
			})
			expect(existsSync(sentinel)).toBe(true)
			expect(existsSync(unrelated)).toBe(true)
			expect(readFileSync(lockPath, 'utf8')).toContain('node_modules/@orkestrel/swapfix-gamma')
			expect(readFileSync(manifestPath, 'utf8')).not.toContain('tmp/tarballs')
		} finally {
			await session.destroy()
		}
	})

	it.skipIf(!supportsDirectoryLinks())(
		'refuses a restore whose package name is valid but whose install path leads out of node_modules through a link',
		async () => {
			const session = await createSwapSession('orkestrel-swap-contain-')
			try {
				const { scratch, fixture, environment } = session
				const options = { cwd: scratch.path, env: environment }
				await installSwapFixture(fixture.consumer, environment)
				const pinned = await spawnSkillScript(
					SWAP_SCRIPT,
					['--pin', '--consumer', fixture.consumer, '--source', fixture.alpha, '--no-build'],
					options,
				)
				expect(pinned).toMatchObject({ status: 0 })
				const scope = join(fixture.consumer, 'node_modules', '@orkestrel')
				const outside = join(scratch.path, 'outside')
				renameSync(scope, outside)
				scratch.link('consumer/node_modules/@orkestrel', outside)
				const manifestPath = join(fixture.consumer, 'package.json')
				const ledgerPath = join(fixture.consumer, 'tmp', 'tarballs', 'pins.json')
				const manifest = readFileSync(manifestPath, 'utf8')
				const ledger = readFileSync(ledgerPath, 'utf8')
				const refused = await spawnSkillScript(
					SWAP_SCRIPT,
					['--restore', '--consumer', fixture.consumer, '--json'],
					options,
				)
				expect(refused.status).toBe(64)
				expect(refused.stderr).toContain(
					'The install of @orkestrel/swapfix-alpha resolves outside node_modules',
				)
				expect(existsSync(join(outside, 'swapfix-alpha', 'package.json'))).toBe(true)
				expect(existsSync(join(outside, 'swapfix-gamma', 'package.json'))).toBe(true)
				expect(readFileSync(manifestPath, 'utf8')).toBe(manifest)
				expect(readFileSync(ledgerPath, 'utf8')).toBe(ledger)
			} finally {
				await session.destroy()
			}
		},
	)

	it.skipIf(!probeManifestLock())(
		'records the replaced range in the ledger before it writes the manifest',
		async () => {
			const session = await createSwapSession('orkestrel-swap-order-')
			try {
				const { scratch, fixture, environment } = session
				const options = { cwd: scratch.path, env: environment }
				await installSwapFixture(fixture.consumer, environment)
				const manifestPath = join(fixture.consumer, 'package.json')
				const original = readFileSync(manifestPath, 'utf8')
				scratch.ensure('consumer/tmp/tarballs')
				expect(lockManifest(manifestPath)).toBe(true)
				try {
					const interrupted = await spawnSkillScript(
						SWAP_SCRIPT,
						['--pin', '--consumer', fixture.consumer, '--source', fixture.alpha, '--no-build'],
						options,
					)
					expect(interrupted.status).toBe(1)
					expect(interrupted.stderr).toContain('swap:')
					expect(readSwapEntry(fixture.consumer, '@orkestrel/swapfix-alpha')).toMatchObject({
						field: 'dependencies',
						replaced: SWAP_RANGE,
					})
				} finally {
					unlockManifest(manifestPath)
				}
				expect(readFileSync(manifestPath, 'utf8')).toBe(original)
			} finally {
				await session.destroy()
			}
		},
	)

	it('refuses a malformed command line or an unusable request with 64 before it writes anything', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-usage-' })
		try {
			const fixture = writeSwapFixture(scratch.path)
			const options = { cwd: scratch.path, env: buildSwapEnvironment(scratch.path) }
			const manifestPath = join(fixture.consumer, 'package.json')
			const original = readFileSync(manifestPath, 'utf8')
			const consumer = ['--consumer', fixture.consumer]
			for (const [args, message] of buildSwapRefusals(fixture, scratch.ensure('empty'))) {
				const run = runSkillScript(SWAP_SCRIPT, args, options)
				expect([args, run.status]).toStrictEqual([args, 64])
				expect(run.stderr).toContain(message)
				expect(run.stderr).toContain('usage: swap.ts --pin --consumer DIR')
			}
			writeFileSync(manifestPath, JSON.stringify(JSON.parse(original), null, 2))
			const spaced = runSkillScript(
				SWAP_SCRIPT,
				['--pin', ...consumer, '--source', fixture.alpha, '--no-build'],
				options,
			)
			expect(spaced.status).toBe(64)
			expect(spaced.stderr).toContain(
				'package.json is not tab-indented JSON with a trailing newline',
			)
			expect(existsSync(join(fixture.consumer, 'tmp'))).toBe(false)
			expect(existsSync(join(scratch.path, 'tmp'))).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})
