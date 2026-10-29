import { createHash } from 'node:crypto'
import { existsSync, lstatSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isRecord } from '@orkestrel/contract'
import { createScratch, supportsDirectoryLinks } from '@orkestrel/test/server'
import {
	buildLedgerEntry,
	buildRepin,
	buildTarballName,
	buildTarballSpec,
	collectSpecs,
	compareKeys,
	comparePrerelease,
	compareVersions,
	computeHash,
	describeMoved,
	describeStatus,
	diffManifests,
	findDeclaration,
	hasPins,
	isContained,
	isLedgerEntry,
	isManifestField,
	isOverrideEntry,
	isPackageName,
	isRecord as isScriptRecord,
	isTarballSpec,
	listRemovals,
	locateInstalled,
	locateSpecTarget,
	matchesComparator,
	matchesLocalSpec,
	matchesRange,
	mergeEntries,
	normalizeSlashes,
	OVERRIDE_PRECEDERS,
	parseCommand,
	parseComparators,
	parseJsonRecord,
	parseLedger,
	parseVersion,
	placeBlock,
	planPin,
	planRestore,
	readBlock,
	readMissingFlags,
	readOption,
	readOptions,
	readPack,
	readString,
	removeTree,
	renderChange,
	renderStamp,
	renderValue,
	resolveNpm,
	rewriteBlock,
	runNpm,
	scanLedgerNames,
	scanLocalSpecs,
	scanNames,
	scanPinRequest,
	serializeJSON,
	supportsRange,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/swap.ts'
import type {
	Ledger,
	LedgerEntry,
	Tarball,
} from '../../../../../.agents/skills/orkestrel-publish/scripts/swap.ts'
import {
	appendSwapLedgerRow,
	buildSwapEnvironment,
	buildSwapInvalidNames,
	buildSwapKeyValue,
	buildSwapLocalSpecs,
	buildSwapRefusals,
	buildSwapRemoteSpecs,
	buildSwapValidNames,
	checkFormat,
	commitFiles,
	createRepository,
	createSwapSession,
	installSwapFixture,
	lockManifest,
	probeManifestLock,
	readFormattedKeys,
	readInstalledRecord,
	readSwapEntry,
	renderPackageManifest,
	runSkillScript,
	spawnNpm,
	spawnSkillScript,
	SWAP_FOLLOWER_KEYS,
	SWAP_RANGE,
	SWAP_RANGE_CASES,
	SWAP_READ_RANGES,
	SWAP_SCRIPT,
	SWAP_UNREAD_RANGES,
	SWAP_VERSION_ORDER,
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
			expect(checkFormat(manifestPath)).toBe(0)
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
			expect(checkFormat(manifestPath)).toBe(0)
			const { overrides, ...rest } = readInstalledRecord(fixture.consumer)
			const appended = scratch.write(
				'appended/package.json',
				renderPackageManifest({ ...rest, overrides }),
			)
			expect(checkFormat(appended)).not.toBe(0)
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
				expect([consumer, checkFormat(manifestPath)]).toStrictEqual([consumer, 0])
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
				expect([consumer, checkFormat(manifestPath)]).toStrictEqual([consumer, 0])
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

	it('refuses a flag the mode does not read, the equals form and a stray argument included, before it writes anything', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-unknown-' })
		try {
			const fixture = writeSwapFixture(scratch.path)
			const options = { cwd: scratch.path, env: buildSwapEnvironment(scratch.path) }
			const consumer = ['--consumer', fixture.consumer]
			const cases: ReadonlyArray<readonly [readonly string[], string]> = [
				[['--status', `--consumer=${fixture.consumer}`], 'is not a flag this script reads'],
				[['--status', ...consumer, '--bogus'], '--bogus is not a flag this script reads'],
				[['--status', ...consumer, 'stray'], '--status does not read stray'],
				[['--restore', ...consumer, '--json=1'], '--json=1 is not a flag this script reads'],
				[['--restore', ...consumer, '--source', fixture.alpha], '--restore does not read --source'],
				[
					['--pin', ...consumer, '--source', fixture.alpha, '--bogus'],
					'--bogus is not a flag this script reads',
				],
				[['--pin', ...consumer, `--source=${fixture.alpha}`], 'is not a flag this script reads'],
			]
			for (const [args, message] of cases) {
				const run = runSkillScript(SWAP_SCRIPT, args, options)
				expect([args, run.status]).toStrictEqual([args, 64])
				expect(run.stderr).toContain(message)
				expect(run.stderr).toContain('usage: swap.ts --pin --consumer DIR')
				expect(run.stdout).toBe('')
			}
			expect(existsSync(join(fixture.consumer, 'tmp'))).toBe(false)
			expect(existsSync(join(scratch.path, 'tmp'))).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
})

describe('the manifest key order', () => {
	it('places a created overrides block where the installed formatter sorts it, for every key the table names', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-keys-' })
		try {
			const preceding = Object.fromEntries(
				OVERRIDE_PRECEDERS.map((key) => [key, buildSwapKeyValue(key)]),
			)
			const following = Object.fromEntries(
				SWAP_FOLLOWER_KEYS.map((key) => [key, buildSwapKeyValue(key)]),
			)
			const placed = placeBlock({ ...preceding, ...following }, 'overrides', { a: 'b' })
			const keys = Object.keys(placed)
			const block = keys.indexOf('overrides')
			expect(keys.slice(0, block)).toStrictEqual(OVERRIDE_PRECEDERS)
			expect(keys.slice(block + 1)).toStrictEqual(SWAP_FOLLOWER_KEYS)
			const formatted = readFormattedKeys(
				scratch.write('placed/package.json', renderPackageManifest(placed)),
			)
			const overrides = formatted.indexOf('overrides')
			expect(overrides).toBeGreaterThan(-1)
			for (const key of OVERRIDE_PRECEDERS) {
				expect([key, formatted.includes(key) && formatted.indexOf(key) < overrides]).toStrictEqual([
					key,
					true,
				])
			}
			for (const key of SWAP_FOLLOWER_KEYS) {
				expect([key, formatted.indexOf(key) > overrides]).toStrictEqual([key, true])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('moves an overrides block written first behind every key the table names, so the formatter proof is not vacuous', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-control-' })
		try {
			const scrambled = {
				overrides: { a: 'b' },
				...Object.fromEntries(
					[...SWAP_FOLLOWER_KEYS, ...OVERRIDE_PRECEDERS.toReversed()].map((key) => [
						key,
						buildSwapKeyValue(key),
					]),
				),
			}
			const formatted = readFormattedKeys(
				scratch.write('scrambled/package.json', renderPackageManifest(scrambled)),
			)
			expect(formatted).not.toStrictEqual(Object.keys(scrambled))
			const overrides = formatted.indexOf('overrides')
			expect(overrides).toBeGreaterThan(0)
			for (const key of OVERRIDE_PRECEDERS) {
				expect([key, formatted.indexOf(key) < overrides]).toStrictEqual([key, true])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('lands a created block last when every key sorts ahead of it and before the first follower otherwise', () => {
		expect(Object.keys(placeBlock({ name: 'x', version: '1.0.0' }, 'overrides', {}))).toStrictEqual(
			['name', 'version', 'overrides'],
		)
		expect(
			Object.keys(placeBlock({ name: 'x', engines: {}, zzz: 1 }, 'overrides', {})),
		).toStrictEqual(['name', 'overrides', 'engines', 'zzz'])
		expect(Object.keys(placeBlock({}, 'overrides', {}))).toStrictEqual(['overrides'])
	})
})

describe('the semver subset', () => {
	it('answers each range with a version just inside and just outside each bound', () => {
		for (const [range, version, answer] of SWAP_RANGE_CASES) {
			expect([range, version, matchesRange(version, range)]).toStrictEqual([range, version, answer])
		}
		expect(matchesRange('not-a-version', '*')).toBe(false)
		expect(matchesRange('1.2', '*')).toBe(false)
	})

	it('reads the ranges in its subset and refuses every other, so no unread range is satisfied', () => {
		for (const range of SWAP_READ_RANGES) {
			expect([range, supportsRange(range)]).toStrictEqual([range, true])
		}
		for (const range of SWAP_UNREAD_RANGES) {
			expect([range, supportsRange(range)]).toStrictEqual([range, false])
		}
		// A union of read ranges can still match, so only the unread ranges without `||` are held to it.
		for (const range of SWAP_UNREAD_RANGES.filter((candidate) => !candidate.includes('||'))) {
			expect([range, matchesRange('1.5.0', range)]).toStrictEqual([range, false])
		}
	})

	it('parses a full version and refuses a partial one', () => {
		expect(parseVersion('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3, pre: undefined })
		expect(parseVersion(' v1.2.3-rc.1 ')).toEqual({ major: 1, minor: 2, patch: 3, pre: 'rc.1' })
		expect(parseVersion('1.2.3+build.5')).toEqual({ major: 1, minor: 2, patch: 3, pre: undefined })
		expect(parseVersion('1.2.3-rc.1+build')).toEqual({ major: 1, minor: 2, patch: 3, pre: 'rc.1' })
		for (const text of ['1.2', '1.2.3.4', '1.2.x', '', 'latest', '^1.2.3']) {
			expect([text, parseVersion(text)]).toStrictEqual([text, undefined])
		}
	})

	it('orders every version of the prerelease ladder below the next, and ignores build metadata', () => {
		const versions = SWAP_VERSION_ORDER.flatMap((text) => {
			const version = parseVersion(text)
			return version === undefined ? [] : [version]
		})
		expect(versions).toHaveLength(SWAP_VERSION_ORDER.length)
		for (const [index, left] of versions.entries()) {
			for (const [other, right] of versions.entries()) {
				const order = compareVersions(left, right)
				expect([
					SWAP_VERSION_ORDER[index],
					SWAP_VERSION_ORDER[other],
					order < 0,
					order > 0,
				]).toStrictEqual([
					SWAP_VERSION_ORDER[index],
					SWAP_VERSION_ORDER[other],
					index < other,
					index > other,
				])
			}
		}
		const first = parseVersion('1.2.3+a')
		const second = parseVersion('1.2.3+b')
		if (first === undefined || second === undefined) throw new Error('A version did not parse')
		expect(compareVersions(first, second)).toBe(0)
	})

	it('orders prerelease identifiers numerically, numbers before words, and a prefix before its extension', () => {
		expect(comparePrerelease('alpha.1', 'alpha.beta')).toBeLessThan(0)
		expect(comparePrerelease('alpha', 'alpha.1')).toBeLessThan(0)
		expect(comparePrerelease('alpha.1', 'alpha')).toBeGreaterThan(0)
		expect(comparePrerelease('beta.2', 'beta.11')).toBeLessThan(0)
		expect(comparePrerelease('beta.11', 'beta.2')).toBeGreaterThan(0)
		expect(comparePrerelease('rc.1', 'rc.1')).toBe(0)
		expect(comparePrerelease('beta', 'rc')).toBeLessThan(0)
		expect(compareKeys('a', 'b')).toBe(-1)
		expect(compareKeys('b', 'a')).toBe(1)
		expect(compareKeys('a', 'a')).toBe(0)
	})

	it('parses a token into its comparators and refuses a token outside the subset', () => {
		for (const token of ['*', 'x', 'X', '']) expect(parseComparators(token)).toEqual([])
		expect(parseComparators('^0.0.3')).toEqual([
			{ operator: '>=', version: { major: 0, minor: 0, patch: 3, pre: undefined } },
			{ operator: '<', version: { major: 0, minor: 0, patch: 4, pre: undefined } },
		])
		expect(parseComparators('^1.2.3')?.[1]?.version).toEqual({
			major: 2,
			minor: 0,
			patch: 0,
			pre: undefined,
		})
		expect(parseComparators('^0.2.3')?.[1]?.version).toEqual({
			major: 0,
			minor: 3,
			patch: 0,
			pre: undefined,
		})
		expect(parseComparators('~1.2.3')?.[1]?.version).toEqual({
			major: 1,
			minor: 3,
			patch: 0,
			pre: undefined,
		})
		expect(parseComparators('>=1.2.3')).toEqual([
			{ operator: '>=', version: { major: 1, minor: 2, patch: 3, pre: undefined } },
		])
		expect(parseComparators('1.2.3')).toEqual([
			{ operator: '=', version: { major: 1, minor: 2, patch: 3, pre: undefined } },
		])
		for (const token of ['>=', '1.x', '^1.2', 'latest', '-']) {
			expect([token, parseComparators(token)]).toStrictEqual([token, undefined])
		}
	})

	it('answers a comparator by the relation of a version to its bound', () => {
		const bound = parseVersion('1.2.3')
		const below = parseVersion('1.2.2')
		const above = parseVersion('1.2.4')
		if (bound === undefined || below === undefined || above === undefined) {
			throw new Error('A version did not parse')
		}
		for (const [operator, expected] of [
			['>=', [false, true, true]],
			['>', [false, false, true]],
			['<=', [true, true, false]],
			['<', [true, false, false]],
			['=', [false, true, false]],
		] as const) {
			expect([
				operator,
				[below, bound, above].map((version) =>
					matchesComparator(version, { operator, version: bound }),
				),
			]).toStrictEqual([operator, expected])
		}
	})
})

describe('the manifest rewriting', () => {
	it('keeps a changed key in place, removes a key mapped to undefined, and keeps a sorted block sorted', () => {
		const manifest = {
			name: 'x',
			dependencies: { a: '^1.0.0', b: '^1.0.0' },
			engines: { node: '>=24' },
		}
		const changed = rewriteBlock(manifest, 'dependencies', new Map([['a', 'file:a.tgz']]), true)
		expect(changed).toEqual({
			name: 'x',
			dependencies: { a: 'file:a.tgz', b: '^1.0.0' },
			engines: { node: '>=24' },
		})
		expect(Object.keys(readBlock(changed, 'dependencies'))).toStrictEqual(['a', 'b'])
		expect(
			readBlock(
				rewriteBlock(manifest, 'dependencies', new Map([['a', undefined]]), true),
				'dependencies',
			),
		).toEqual({ b: '^1.0.0' })
		expect(
			Object.keys(
				readBlock(
					rewriteBlock(manifest, 'dependencies', new Map([['aa', '1.0.0']]), true),
					'dependencies',
				),
			),
		).toStrictEqual(['a', 'aa', 'b'])
		expect(
			Object.keys(
				readBlock(
					rewriteBlock(
						{ dependencies: { b: '1', a: '1' } },
						'dependencies',
						new Map([['c', '1']]),
						true,
					),
					'dependencies',
				),
			),
		).toStrictEqual(['b', 'a', 'c'])
		expect(
			mergeEntries(
				[
					['b', 1],
					['a', 1],
				],
				[['c', 1]],
			).map(([name]) => name),
		).toStrictEqual(['b', 'a', 'c'])
		expect(
			mergeEntries(
				[
					['a', 1],
					['c', 1],
				],
				[['b', 1]],
			).map(([name]) => name),
		).toStrictEqual(['a', 'b', 'c'])
	})

	it('creates an absent block where the formatter sorts it, leaves an absent block that gains nothing, and drops an emptied overrides block unless told to keep it', () => {
		const created = rewriteBlock(
			{ name: 'x', engines: {} },
			'overrides',
			new Map([['a', '$a']]),
			true,
		)
		expect(Object.keys(created)).toStrictEqual(['name', 'overrides', 'engines'])
		const bare = { name: 'x' }
		expect(rewriteBlock(bare, 'overrides', new Map(), true)).toBe(bare)
		expect(rewriteBlock(bare, 'overrides', new Map([['a', undefined]]), true)).toBe(bare)
		const held = { name: 'x', overrides: { a: '1' } }
		const emptied = new Map<string, string | undefined>([['a', undefined]])
		expect(rewriteBlock(held, 'overrides', emptied, false)).toEqual({ name: 'x' })
		expect(rewriteBlock(held, 'overrides', emptied, true)).toEqual({ name: 'x', overrides: {} })
		expect(rewriteBlock({ dependencies: { a: '1' } }, 'dependencies', emptied, false)).toEqual({
			dependencies: {},
		})
	})

	it('reads a block, finds the field that declares a package, and lists each entry a rewrite changed', () => {
		const manifest = {
			dependencies: { a: '^1.0.0', n: 1 },
			devDependencies: { a: '^2.0.0', b: '^1.0.0' },
		}
		expect(readBlock(manifest, 'dependencies')).toEqual({ a: '^1.0.0', n: 1 })
		expect(readBlock(manifest, 'overrides')).toEqual({})
		expect(readBlock({ dependencies: [] }, 'dependencies')).toEqual({})
		expect(findDeclaration(manifest, 'a')).toEqual({ field: 'dependencies', spec: '^1.0.0' })
		expect(findDeclaration(manifest, 'b')).toEqual({ field: 'devDependencies', spec: '^1.0.0' })
		expect(findDeclaration(manifest, 'n')).toBeUndefined()
		expect(findDeclaration(manifest, 'absent')).toBeUndefined()
		expect(
			diffManifests(
				{ dependencies: { a: '1' }, overrides: {} },
				{ dependencies: { a: '2' }, overrides: { x: 'y' } },
			),
		).toEqual([
			{ block: 'dependencies', name: 'a', from: '1', to: '2' },
			{ block: 'overrides', name: 'x', from: undefined, to: 'y' },
		])
		expect(diffManifests({ dependencies: { a: '1' } }, { dependencies: { a: '1' } })).toEqual([])
		expect(renderValue(undefined)).toBeUndefined()
		expect(renderValue('a')).toBe('a')
		expect(renderValue({ a: 1 })).toBe('{"a":1}')
		expect(renderChange({ block: 'overrides', name: 'x', from: undefined, to: 'y' })).toBe(
			'swap: overrides.x (absent) -> y',
		)
		expect(serializeJSON({ a: 1 })).toBe('{\n\t"a": 1\n}\n')
	})
})

describe('the pin and restore plans', () => {
	const tarball: Tarball = {
		source: { directory: '/s/alpha', name: '@o/alpha', version: '1.0.0' },
		file: 'o-alpha-1.0.0-abc.tgz',
		spec: 'file:/c/tmp/tarballs/o-alpha-1.0.0-abc.tgz',
		sha256: 'abc',
		files: ['package.json'],
		commit: undefined,
		dirty: undefined,
	}
	const empty: Ledger = { packages: {}, overrides: {} }

	it('pins a declared package to its tarball spec and an override to its dollar form, and restores the manifest it started from', () => {
		const manifest = {
			name: 'consumer',
			dependencies: { '@o/alpha': '^1.0.0' },
			devDependencies: { '@o/gamma': '^1.0.0' },
			overrides: {},
			engines: { node: '>=24' },
		}
		const plan = planPin(manifest, empty, [tarball], ['@o/alpha'], 'at')
		expect(plan.manifest).toEqual({
			...manifest,
			dependencies: { '@o/alpha': tarball.spec },
			overrides: { '@o/alpha': '$@o/alpha' },
		})
		expect(plan.ledger.packages['@o/alpha']).toMatchObject({
			field: 'dependencies',
			replaced: '^1.0.0',
			tarball: tarball.file,
			sha256: 'abc',
			source: '/s/alpha',
			at: 'at',
		})
		expect(plan.ledger.overrides['@o/alpha']).toEqual({ value: '$@o/alpha', at: 'at' })
		expect(plan.ledger.blockExisted).toBe(true)
		expect(plan.changes).toEqual([
			{ block: 'dependencies', name: '@o/alpha', from: '^1.0.0', to: tarball.spec },
			{ block: 'overrides', name: '@o/alpha', from: undefined, to: '$@o/alpha' },
		])
		expect(hasPins(empty)).toBe(false)
		expect(hasPins(plan.ledger)).toBe(true)
		const restored = planRestore(plan.manifest, plan.ledger, [])
		expect(restored.manifest).toEqual(manifest)
		expect(restored.ledger).toEqual(empty)
		expect(restored.dropped).toEqual(['@o/alpha'])
		expect(restored.rows.map((row) => row.name)).toEqual(['@o/alpha'])
		expect(listRemovals(restored)).toEqual(['@o/alpha'])
		expect(buildRepin('/c', restored)).toEqual([
			'--pin',
			'--consumer',
			'/c',
			'--source',
			'/s/alpha',
			'--override',
			'@o/alpha',
		])
	})

	it('removes an overrides block the pin created, keeps the replaced range across a re-pin, and records an override-only package without a field', () => {
		const manifest = { name: 'consumer', dependencies: { '@o/alpha': '^1.0.0' } }
		const plan = planPin(manifest, empty, [tarball], ['@o/alpha'], 'at')
		expect(plan.ledger.blockExisted).toBe(false)
		expect(planRestore(plan.manifest, plan.ledger, []).manifest).toEqual(manifest)
		const second = {
			...tarball,
			file: 'o-alpha-1.0.0-def.tgz',
			spec: 'file:/c/tmp/tarballs/o-alpha-1.0.0-def.tgz',
		}
		const again = planPin(plan.manifest, plan.ledger, [second], [], 'at2')
		expect(again.ledger.packages['@o/alpha']).toMatchObject({
			replaced: '^1.0.0',
			tarball: second.file,
		})
		const only = planPin({ name: 'consumer' }, empty, [tarball], ['@o/alpha'], 'at')
		expect(only.ledger.packages['@o/alpha']?.field).toBeUndefined()
		expect(only.ledger.packages['@o/alpha']?.replaced).toBeUndefined()
		expect(only.manifest).toEqual({ name: 'consumer', overrides: { '@o/alpha': tarball.spec } })
		const entry = buildLedgerEntry(manifest, empty, tarball, 'at')
		expect(entry).toMatchObject({ field: 'dependencies', replaced: '^1.0.0', source: '/s/alpha' })
		expect('commit' in entry).toBe(false)
	})

	it('names each problem that refuses a pin request', () => {
		const manifest = { name: 'consumer', dependencies: { '@o/alpha': '^1.0.0' } }
		const text = serializeJSON(manifest)
		const alpha = tarball.source
		const beta = { directory: '/s/beta', name: '@o/beta', version: '1.0.0' }
		expect(scanPinRequest(text, manifest, empty, [alpha], [])).toEqual([])
		expect(scanPinRequest(`${text}\n`, manifest, empty, [alpha], [])).toEqual([
			expect.stringContaining('tab-indented JSON'),
		])
		expect(scanPinRequest(text, manifest, empty, [alpha, alpha], [])).toEqual([
			'@o/alpha is named by more than one --source',
		])
		expect(scanPinRequest(text, manifest, empty, [beta], [])).toEqual([
			'@o/beta is declared by no dependencies field and named by no --override',
		])
		expect(scanPinRequest(text, manifest, empty, [beta], ['@o/beta'])).toEqual([])
		expect(scanPinRequest(text, manifest, empty, [alpha], ['@o/zeta'])).toEqual([
			'override @o/zeta is declared by the consumer and built by no --source',
		])
		const held = { name: 'consumer', dependencies: { '@o/alpha': 'file:tmp/tarballs/x.tgz' } }
		expect(scanPinRequest(serializeJSON(held), held, empty, [alpha], [])).toEqual([
			'@o/alpha holds a tarball spec the ledger has no record of; restore its range by hand first',
		])
		const nested = { ...manifest, overrides: { '@o/alpha': { nested: 'x' } } }
		expect(scanPinRequest(serializeJSON(nested), nested, empty, [alpha], ['@o/alpha'])).toEqual([
			'overrides.@o/alpha is not a string and the script would overwrite it',
		])
	})
})

describe('the ledger', () => {
	const row = { tarball: 'a.tgz', sha256: 'x', source: 's', at: 't' }

	it('parses a ledger whole and refuses it when a block is missing or any row is malformed', () => {
		const ledger = {
			packages: { a: row },
			overrides: { b: { value: 'v', at: 't' } },
			blockExisted: true,
		}
		expect(parseLedger(ledger)).toEqual(ledger)
		expect(parseLedger({ packages: {}, overrides: {} })).toEqual({ packages: {}, overrides: {} })
		for (const bad of [
			undefined,
			'text',
			[],
			{ packages: {} },
			{ overrides: {} },
			{ packages: { a: { ...row, tarball: 1 } }, overrides: {} },
			{ packages: { a: { ...row, field: 'peerDependencies' } }, overrides: {} },
			{ packages: { a: { ...row, dirty: 'yes' } }, overrides: {} },
			{ packages: { good: row, a: { ...row, at: 1 } }, overrides: {} },
			{ packages: {}, overrides: { b: { value: 1, at: 't' } } },
			{ packages: {}, overrides: { b: { value: 'v', at: 't', replaced: 1 } } },
			{ packages: {}, overrides: {}, blockExisted: 'yes' },
		]) {
			expect([bad, parseLedger(bad)]).toStrictEqual([bad, undefined])
		}
	})

	it('checks a ledger row, an override row, and a manifest field', () => {
		expect(isLedgerEntry(row)).toBe(true)
		expect(
			isLedgerEntry({ ...row, field: 'devDependencies', replaced: '^1.0.0', dirty: false }),
		).toBe(true)
		expect(isLedgerEntry({ ...row, source: undefined })).toBe(false)
		expect(isLedgerEntry(null)).toBe(false)
		expect(isOverrideEntry({ value: 'v', at: 't' })).toBe(true)
		expect(isOverrideEntry({ value: 'v', at: 't', replaced: '*' })).toBe(true)
		expect(isOverrideEntry({ value: 'v' })).toBe(false)
		expect(isManifestField('dependencies')).toBe(true)
		expect(isManifestField('devDependencies')).toBe(true)
		expect(isManifestField('peerDependencies')).toBe(false)
	})

	it('names each ledger key that is not a package name, JSON-encoded', () => {
		expect(scanNames('packages', ['@o/a', '../x'])).toEqual([
			'The ledger packages key "../x" is not a package name',
		])
		expect(
			scanLedgerNames({
				packages: { '../a': row },
				overrides: { 'b c': { value: 'v', at: 't' } },
			}),
		).toEqual([
			'The ledger packages key "../a" is not a package name',
			'The ledger overrides key "b c" is not a package name',
		])
		expect(scanLedgerNames({ packages: { '@o/a': row }, overrides: {} })).toEqual([])
	})

	it('accepts the valid package names and refuses every name that climbs out of node_modules', () => {
		for (const name of buildSwapValidNames())
			expect([name, isPackageName(name)]).toStrictEqual([name, true])
		for (const name of buildSwapInvalidNames('C:/scratch')) {
			expect([name, isPackageName(name)]).toStrictEqual([name, false])
		}
		expect(isPackageName('a'.repeat(214))).toBe(true)
		expect(isPackageName('a'.repeat(215))).toBe(false)
	})

	it('names each drift one pin reports', () => {
		const entry: LedgerEntry = { ...row, source: '/s/alpha', commit: 'abc' }
		const clean = {
			pinned: true,
			tarball: true,
			installed: { link: false, intact: true },
			moved: false,
		}
		expect(describeStatus('@o/a', entry, '/c/a.tgz', clean)).toEqual([])
		expect(
			describeStatus('@o/a', entry, '/c/a.tgz', {
				pinned: false,
				tarball: false,
				installed: undefined,
				moved: true,
			}),
		).toEqual([
			'@o/a: the manifest does not hold /c/a.tgz',
			'@o/a: a.tgz is missing or does not match its recorded SHA-256',
			'@o/a: not installed',
			'@o/a: /s/alpha moved from abc; re-pin',
		])
		expect(
			describeStatus('@o/a', entry, '/c/a.tgz', {
				...clean,
				installed: { link: true, intact: undefined },
			}),
		).toEqual(['@o/a: installed as a link'])
		expect(
			describeStatus('@o/a', entry, '/c/a.tgz', {
				...clean,
				installed: { link: false, intact: undefined },
			}),
		).toEqual(['@o/a: the ledger records no proved install; re-pin'])
		expect(
			describeStatus('@o/a', entry, '/c/a.tgz', {
				...clean,
				installed: { link: false, intact: false },
			}),
		).toEqual(['@o/a: the installed bytes differ from the pinned build'])
	})

	it('names the packages an install added, removed, or changed', () => {
		expect(describeMoved({ a: '1', b: '2' }, { a: '1', b: '3', c: '4' })).toEqual([
			'b was changed by the install',
			'c was added by the install',
		])
		expect(describeMoved({ a: '1' }, {})).toEqual(['a was removed by the install'])
		expect(describeMoved({}, {})).toEqual([])
	})
})

describe('the tarball names and specs', () => {
	it('names a tarball by scope, name, version, and the first twelve digits of its digest', () => {
		expect(buildTarballName('@orkestrel/alpha', '1.0.0', '0123456789abcdef')).toBe(
			'orkestrel-alpha-1.0.0-0123456789ab.tgz',
		)
		expect(buildTarballName('left-pad', '1.0.0', '0123456789abcdef')).toBe(
			'left-pad-1.0.0-0123456789ab.tgz',
		)
		expect(computeHash(Buffer.from('abc'))).toBe(
			'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
		)
	})

	it('builds an absolute file spec with forward slashes and reads a tarball spec in either location form', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-spec-' })
		try {
			const spec = buildTarballSpec(scratch.path, 'a.tgz')
			expect(spec).toBe(`file:${normalizeSlashes(join(scratch.path, 'tmp', 'tarballs', 'a.tgz'))}`)
			expect(spec.includes('\\')).toBe(false)
			expect(isTarballSpec(spec)).toBe(true)
			expect(isTarballSpec('file:tmp/tarballs/a.tgz')).toBe(true)
			expect(isTarballSpec('file:/x/tmp/tarballs/a.tgz')).toBe(true)
			for (const text of [
				'file:../other',
				'file:tmp/other/a.tgz',
				'file:/x/tmp/tarballsx/a.tgz',
				'^1.0.0',
				'tmp/tarballs/a.tgz',
			]) {
				expect([text, isTarballSpec(text)]).toStrictEqual([text, false])
			}
			const target = normalizeSlashes(join(scratch.path, 'tmp', 'tarballs', 'a.tgz'))
			expect(locateSpecTarget(scratch.path, 'file:tmp/tarballs/a.tgz')).toBe(target)
			expect(locateSpecTarget(scratch.path, `file:${target}`)).toBe(target)
			expect(normalizeSlashes(locateInstalled('/c', '@o/alpha'))).toBe('/c/node_modules/@o/alpha')
			expect(normalizeSlashes(locateInstalled('/c', 'left-pad'))).toBe('/c/node_modules/left-pad')
		} finally {
			scratch.destroy()
		}
	})

	it('keeps an install path inside node_modules and refuses the root itself and any path that leaves it', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-contain-direct-' })
		try {
			const root = scratch.ensure('node_modules')
			scratch.ensure('node_modules/@o')
			expect(isContained(root, join(root, 'left-pad'))).toBe(true)
			expect(isContained(root, join(root, '@o', 'alpha'))).toBe(true)
			expect(isContained(root, root)).toBe(false)
			expect(isContained(root, join(root, '..', 'outside'))).toBe(false)
			expect(isContained(root, join(scratch.path, 'sibling'))).toBe(false)
			expect(isContained(join(scratch.path, 'absent'), join(scratch.path, 'absent', 'x'))).toBe(
				true,
			)
		} finally {
			scratch.destroy()
		}
	})

	it('reads the archive name and file list out of the pack output of either npm major', () => {
		const files = [{ path: 'dist\\b.js' }, { path: 'package.json' }]
		const expected = { filename: 'a-1.0.0.tgz', files: ['dist/b.js', 'package.json'] }
		expect(readPack(JSON.stringify([{ filename: 'a-1.0.0.tgz', files }]))).toEqual(expected)
		expect(readPack(JSON.stringify({ '@o/a': { filename: 'a-1.0.0.tgz', files } }))).toEqual(
			expected,
		)
		expect(() => readPack('[]')).toThrow('Unreadable npm pack output')
		expect(() => readPack('{}')).toThrow('Unreadable npm pack output')
		expect(() => readPack(JSON.stringify([{ filename: 1, files }]))).toThrow(
			'Unreadable npm pack output',
		)
		expect(() => readPack(JSON.stringify([{ filename: 'a.tgz', files: [{}] }]))).toThrow(
			'Unreadable npm pack file entry',
		)
		expect(() => readPack('not json')).toThrow(SyntaxError)
	})

	it('renders a time as a file-name stamp', () => {
		expect(renderStamp('2026-10-19T00:00:00.000Z')).toBe('2026-10-19T00-00-00-000Z')
	})
})

describe('the command line', () => {
	it('parses each mode into a command and names the refusal for a line it cannot parse', () => {
		const pin = parseCommand([
			'--pin',
			'--consumer',
			'c',
			'--source',
			's',
			'--source',
			't',
			'--override',
			'n',
			'--no-build',
			'--dry-run',
			'--json',
		])
		if (!pin.ok) throw new Error(pin.message)
		expect(pin.command).toMatchObject({
			mode: 'pin',
			build: false,
			dry: true,
			json: true,
			overrides: ['n'],
			packages: [],
		})
		expect(pin.command.sources).toHaveLength(2)
		expect(pin.command.consumer.endsWith('c')).toBe(true)
		const restore = parseCommand([
			'--restore',
			'--consumer',
			'c',
			'--package',
			'a',
			'--package',
			'b',
		])
		if (!restore.ok) throw new Error(restore.message)
		expect(restore.command).toMatchObject({
			mode: 'restore',
			packages: ['a', 'b'],
			build: true,
			dry: false,
		})
		const refusals: ReadonlyArray<readonly [readonly string[], string]> = [
			[[], 'Give one of --pin, --restore, and --status'],
			[['--pin', '--restore'], 'Give one mode, not --pin and --restore'],
			[['--status', '--consumer=x'], '--consumer=x is not a flag this script reads'],
			[['--bogus'], '--bogus is not a flag this script reads'],
			[['--status', '--consumer', 'c', 'stray'], '--status does not read stray'],
			[['--pin', '--consumer', 'c', '--package', 'a'], '--pin does not read --package, a'],
			[['--status', '--consumer'], '--consumer given with no value'],
			[['--status'], '--consumer DIR is required'],
			[['--pin', '--consumer', 'c'], '--pin takes at least one --source DIR'],
		]
		for (const [argv, message] of refusals) {
			expect([argv, parseCommand(argv)]).toStrictEqual([argv, { ok: false, message }])
		}
	})
})

describe('the copied helpers', () => {
	it('B4.1 matches the local swap specs and rejects the remote swap specs', () => {
		for (const [, spec] of buildSwapLocalSpecs()) {
			expect({ spec, local: matchesLocalSpec(spec) }).toEqual({ spec, local: true })
		}
		for (const [, spec] of buildSwapRemoteSpecs()) {
			expect({ spec, local: matchesLocalSpec(spec) }).toEqual({ spec, local: false })
		}
		expect(matchesLocalSpec(' \tfile:../other')).toBe(true)
		expect(matchesLocalSpec('')).toBe(false)
		expect(matchesLocalSpec(' \t')).toBe(false)
	})

	it('collects strings recursively and ignores non-record values', () => {
		expect(collectSpecs('overrides', { a: { b: 'file:../other' }, c: '^1.0.0' })).toEqual([
			['overrides.a.b', 'file:../other'],
			['overrides.c', '^1.0.0'],
		])
		expect(collectSpecs('dependencies', 'file:../other')).toEqual([
			['dependencies', 'file:../other'],
		])
		expect(collectSpecs('overrides', { a: null, b: ['file:../other'], c: 1 })).toEqual([])
		expect(collectSpecs('overrides', undefined)).toEqual([])
		expect(collectSpecs('overrides', {})).toEqual([])
	})

	it('B4.2 scans each spec field and names nested override paths', () => {
		expect(
			scanLocalSpecs({
				name: 'file:../ignored',
				dependencies: { local: 'file:../dependency', remote: '^1.0.0' },
				devDependencies: { local: 'link:../development' },
				peerDependencies: { local: './peer' },
				optionalDependencies: { local: 'optional.tgz' },
				overrides: { a: { '.': '^1.0.0', b: 'file:../override' }, remote: 'owner/other.tgz' },
			}),
		).toEqual([
			['dependencies.local', 'file:../dependency'],
			['devDependencies.local', 'link:../development'],
			['peerDependencies.local', './peer'],
			['optionalDependencies.local', 'optional.tgz'],
			['overrides.a.b', 'file:../override'],
		])
		expect(scanLocalSpecs({})).toEqual([])
		expect(scanLocalSpecs({ dependencies: null, overrides: ['file:../ignored'] })).toEqual([])
	})

	it('recognizes non-null non-array objects without reading their members', () => {
		expect(isScriptRecord({})).toBe(true)
		expect(isScriptRecord(Object.create(null))).toBe(true)
		expect(isScriptRecord(null)).toBe(false)
		expect(isScriptRecord(undefined)).toBe(false)
		expect(isScriptRecord([])).toBe(false)
		expect(isScriptRecord('record')).toBe(false)
		expect(isScriptRecord(1)).toBe(false)
	})

	it('removes a nested tree, preserves its sibling, and accepts a missing tree', () => {
		const scratch = createScratch({ prefix: 'orkestrel-swap-removal-' })
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

	it('reads a flag value, a repeated flag, and treats a following flag as a missing value', () => {
		const argv = ['--consumer', 'c', '--source', 'a', '--source', 'b', '--json']
		expect(readOption(argv, '--consumer')).toBe('c')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOptions(argv, '--source')).toEqual(['a', 'b'])
		expect(readOption(['--consumer', '--json', 'x'], '--consumer')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readOptions(['--source', '--json', '--source', 'b'], '--source')).toEqual(['b'])
		expect(
			readMissingFlags(
				['--consumer', '--json', '--source', 'a', '--package'],
				['--consumer', '--source', '--package'],
			),
		).toEqual(['--consumer', '--package'])
		expect(readMissingFlags(['--source', 'a'], ['--consumer'])).toEqual([])
	})

	it('normalizes slashes, parses a whole document as one record, and reads its string members', () => {
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
		expect(parseJsonRecord('{\n\t"name": "@fixture/pkg"\n}\n')).toEqual({ name: '@fixture/pkg' })
		expect(parseJsonRecord('[1]')).toBeUndefined()
		expect(parseJsonRecord('not json')).toBeUndefined()
		expect(parseJsonRecord('')).toBeUndefined()
		expect(readString({ b: 'x' }, 'b')).toBe('x')
		expect(readString({ b: 1 }, 'b')).toBeUndefined()
		expect(readString(undefined, 'b')).toBeUndefined()
	})

	it('resolves an npm command that answers', () => {
		const npm = resolveNpm()
		expect(npm.prefix.length === 0 || existsSync(npm.prefix[0] ?? '')).toBe(true)
		const result = runNpm(['--version'])
		expect(result.status).toBe(0)
		expect(/^\d+\.\d+\.\d+/u.test(result.stdout.trim())).toBe(true)
	})
})
