import type { BoundaryBuildOutput } from '../../setupE2E.js'
import { Console } from 'node:console'
import {
	lstatSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	readlinkSync,
	statSync,
	symlinkSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { Writable } from 'node:stream'
import { parseJSON } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import { createLogger } from 'vite'
import { ScaffoldError } from '@src/core'
import {
	ACTION_LABEL,
	CANCELLED_MESSAGE,
	CATALOG_UNRESOLVED_NOTE,
	DRIFT_LABEL,
	EXIT_CODES,
	FOREIGN_HINT,
	FRESHNESS_LABEL,
	KNOWN_VERBS,
	ORIGIN_LABEL,
	ORKESTREL_DEPS_PROMPT,
	PRUNE_EMPTY,
	PRUNE_SKIPPED,
	REPAIR_GENERATED_SCOPE,
	REPAIR_SCOPE,
	SCAN_SKIPPED,
	ENVIRONMENT_CHOICES,
	VERB_FLAGS,
	VERB_FLAG_HELP,
} from '../../../src/bin/constants.js'
import {
	applyConfirmMessage,
	auditLiveNote,
	auditTable,
	auditVerdict,
	bucketText,
	catalogShrinkWarning,
	catalogTable,
	catalogVerdict,
	comparisonLine,
	containDestination,
	describeError,
	didYouMean,
	editDistance,
	fleetRepoLine,
	fleetTotals,
	fullHelp,
	generatedNote,
	invalidName,
	missingInput,
	mergeServiceManifest,
	nearest,
	newPlanPreview,
	orkestrelTokenIssue,
	prunePreview,
	pruneConfirmMessage,
	syncRows,
	syncVerdict,
	repairHandoff,
	repairSuccess,
	repairVerdict,
	replacementNote,
	renderComputedNotes,
	scopeNote,
	shortUsage,
	unknownOrkestrelToken,
	unresolvedVersion,
	verbHelp,
} from '../../../src/bin/helpers.js'
import {
	auditToRepairResult,
	catalogResultOf,
	errorEnvelopeOf,
	fleetEntryOf,
	partitionFindings,
	summaryToNewResult,
} from '../../../src/bin/shapers.js'
import type { CatalogEntry, Plan, SyncReport } from '../../../src/core/index.js'
import {
	AUDIT_FINDINGS,
	AUDIT_PLAN,
	buildAudit,
	cloneGeneratedConsumer,
	cloneGeneratedModules,
} from '../../setupBin.js'
import {
	buildBoundaryCases,
	BOUNDARY_PLUGIN,
	classifyBoundaryBuild,
	extractBoundaryIdentity,
	mergeBoundaryOutput,
	renderBoundaryDifference,
	renderBoundaryDriverExit,
	resolveBoundaryConfig,
	selectBoundaryCases,
} from '../../setupE2E.js'
import {
	buildTempDirectory,
	canDirectoryLink,
	canSymlink,
	createDirectoryLink,
} from '../../setupServer.js'

describe('generated consumer clones', () => {
	it('copies workspace files, farms dependency hardlinks, preserves symlinks, and isolates Vite caches', async () => {
		const registry = await buildTempDirectory()
		const destination = await buildTempDirectory()
		try {
			const template = join(registry.path, 'full', 'app', 'server', 'consumer-proof')
			const modules = join(template, 'node_modules')
			const dependency = join(modules, 'fixture', 'nested')
			mkdirSync(dependency, { recursive: true })
			writeFileSync(join(template, 'package.json'), '{"name":"fixture"}\n', 'utf8')
			writeFileSync(join(template, 'package-lock.json'), '{"lockfileVersion":3}\n', 'utf8')
			writeFileSync(join(template, 'source.ts'), "export const value = 'fixture'\n", 'utf8')
			writeFileSync(join(dependency, 'index.js'), "export default 'fixture'\n", 'utf8')
			mkdirSync(join(modules, '.vite'))
			writeFileSync(join(modules, '.vite', 'stale.js'), 'stale\n', 'utf8')
			if (canSymlink) {
				symlinkSync('nested/index.js', join(modules, 'fixture', 'entry.js'))
			}

			const copiedModules = join(destination.path, 'copied')
			cloneGeneratedModules(modules, copiedModules, false)
			expect(readFileSync(join(copiedModules, 'fixture', 'nested', 'index.js'), 'utf8')).toBe(
				"export default 'fixture'\n",
			)
			expect(statSync(join(copiedModules, 'fixture', 'nested', 'index.js')).ino).not.toBe(
				statSync(join(dependency, 'index.js')).ino,
			)
			expect(lstatSync(join(copiedModules, 'fixture')).isDirectory()).toBe(true)
			expect(readdirSync(copiedModules)).not.toContain('.vite')
			const copiedLink = canSymlink
				? {
						symlink: lstatSync(join(copiedModules, 'fixture', 'entry.js')).isSymbolicLink(),
						target: readlinkSync(join(copiedModules, 'fixture', 'entry.js')),
					}
				: undefined
			expect(copiedLink).toEqual(
				canSymlink ? { symlink: true, target: 'nested/index.js' } : undefined,
			)

			const clone = cloneGeneratedConsumer(registry.path, 'full', destination.path)
			expect(readFileSync(join(clone, 'package.json'))).toEqual(
				readFileSync(join(template, 'package.json')),
			)
			expect(readFileSync(join(clone, 'package-lock.json'))).toEqual(
				readFileSync(join(template, 'package-lock.json')),
			)
			expect(statSync(join(clone, 'source.ts')).ino).not.toBe(
				statSync(join(template, 'source.ts')).ino,
			)
			expect(statSync(join(clone, 'node_modules', 'fixture', 'nested', 'index.js')).ino).toBe(
				statSync(join(dependency, 'index.js')).ino,
			)
			const cache = join(clone, 'node_modules', '.vite')
			expect(lstatSync(cache).isDirectory()).toBe(true)
			expect(lstatSync(cache).isSymbolicLink()).toBe(false)
			expect(readdirSync(cache)).toEqual([])
		} finally {
			await destination.cleanup()
			await registry.cleanup()
		}
	})

	it('partitions every boundary case exactly once across two deterministic shards', async () => {
		const workspace = await buildTempDirectory()
		try {
			for (const path of [
				'app/browser/ApplicationView.vue',
				'app/browser/main.ts',
				'app/browser/index.html',
				'configs/app/vite.browser.config.ts',
				'app/server/main.ts',
				'src/core/index.ts',
				'src/browser/index.ts',
				'src/server/index.ts',
			]) {
				const target = join(workspace.path, path)
				mkdirSync(dirname(target), { recursive: true })
				writeFileSync(
					target,
					path.endsWith('index.html')
						? '<html><head>\n\t\t<meta charset="UTF-8">\n</head></html>\n'
						: `// ${path}\n`,
					'utf8',
				)
			}
			const cases = buildBoundaryCases(workspace.path)
			const first = selectBoundaryCases(cases, 0)
			const second = selectBoundaryCases(cases, 1)
			const rawHtml =
				'<!doctype html><html><body><img src="../server/boundary.txt"></body></html>\n'

			expect(cases).toHaveLength(128)
			expect(first).toHaveLength(64)
			expect(second).toHaveLength(64)
			expect([...first, ...second]).toEqual(cases)
			expect(cases.some((testCase) => testCase.content === rawHtml)).toBe(true)
			expect(
				cases.some(
					(testCase) => testCase.content !== rawHtml && testCase.content.includes(rawHtml),
				),
			).toBe(false)
		} finally {
			await workspace.cleanup()
		}
	})

	it('maps boundary scripts and compares the original boundary contract exactly', () => {
		expect(resolveBoundaryConfig('build:app:browser')).toBe('configs/app/vite.browser.config.ts')
		expect(resolveBoundaryConfig('build:app:server')).toBe('configs/app/vite.server.config.ts')
		expect(resolveBoundaryConfig('build:src:browser')).toBe('configs/src/vite.browser.config.ts')
		expect(resolveBoundaryConfig('build:src:core')).toBe('configs/src/vite.core.config.ts')
		expect(resolveBoundaryConfig('build:src:server')).toBe('configs/src/vite.server.config.ts')
		expect(() => resolveBoundaryConfig('build')).toThrow('unsupported boundary build script')

		const boundary = '[orkestrel-environment-boundary] Browser cannot import server'
		const reference = {
			status: 1,
			stdout: '',
			stderr: `\u001B[31mError: ${boundary}\u001B[39m\r\n`,
			signal: null,
		}
		const equivalent = {
			status: 1,
			stdout: `Error: ${boundary}\n`,
			stderr: '',
			signal: null,
		}
		const failed: BoundaryBuildOutput = {
			status: null,
			stdout: '',
			stderr: 'timed out\n',
			error: new Error('timeout'),
			signal: 'SIGTERM',
		}

		expect(classifyBoundaryBuild({ ...equivalent, status: 0 })).toBe('accepted')
		expect(classifyBoundaryBuild(reference)).toBe('rejected')
		expect(classifyBoundaryBuild(failed)).toBe('rejected')
		expect(BOUNDARY_PLUGIN).toBe('orkestrel-environment-boundary')
		expect(mergeBoundaryOutput('shared\n', 'shared\n')).toBe('shared\n')
		expect(mergeBoundaryOutput('captured\nshared\n', 'shared\npiped\n')).toBe(
			'captured\nshared\npiped\n',
		)
		expect(extractBoundaryIdentity(reference.stderr)).toBe(boundary)
		expect(extractBoundaryIdentity('ordinary build failure\n')).toBeUndefined()
		expect(renderBoundaryDifference(reference, equivalent, 'Browser cannot import server')).toBe(
			undefined,
		)
		expect(renderBoundaryDifference(reference, failed, 'Browser cannot import server')).toBe(
			[
				'spawn verdict: rejected',
				'driver verdict: rejected',
				`spawn boundary: ${boundary}`,
				'driver boundary: none',
				'spawn output:',
				reference.stderr,
				'driver output:',
				failed.stderr,
			].join('\n'),
		)
		const controls = 'Environment module URLs cannot contain ASCII controls'
		const stacked = {
			status: 1,
			stdout: '',
			stderr: `cause: Error [RolldownError]: ${controls}\nplugin: 'orkestrel-environment-boundary'\n`,
			signal: null,
		}
		const clean = {
			status: 1,
			stdout: `Error: [orkestrel-environment-boundary] ${controls}\n`,
			stderr: '',
			signal: null,
		}

		expect(extractBoundaryIdentity(stacked.stderr)).toBeUndefined()
		expect(renderBoundaryDifference(stacked, clean, controls)).toBeUndefined()
		expect(
			renderBoundaryDifference(
				reference,
				{ ...equivalent, stdout: `${equivalent.stdout.trimEnd()} with different detail\n` },
				'Browser cannot import server',
			),
		).not.toBeUndefined()
		expect(renderBoundaryDriverExit(1, null, 17, 'Error: child failed', 'stderr suffix\n')).toBe(
			[
				'boundary build driver exited 1 (no signal)',
				'case id: 17',
				'child failure:\nError: child failed',
				'stderr tail:\nstderr suffix\n',
			].join('\n'),
		)
	})

	it('keeps the complete Vite logger surface safe when plugin wrappers rebind methods', () => {
		const output: string[] = []
		const stream = new Writable({
			write(chunk: unknown, _encoding: BufferEncoding, callback: (error?: Error | null) => void) {
				output.push(String(chunk))
				callback()
			},
		})
		const logger = createLogger('info', {
			allowClearScreen: false,
			console: new Console({ stdout: stream, stderr: stream, colorMode: false }),
		})
		const logged = new Error('logged')
		const info = logger.info
		const warn = logger.warn
		const warnOnce = logger.warnOnce
		const error = logger.error
		const clearScreen = logger.clearScreen
		const hasErrorLogged = logger.hasErrorLogged

		info.call(undefined, 'info')
		warn.call(undefined, 'warn')
		warnOnce.call(undefined, 'once')
		warnOnce.call(undefined, 'once')
		error.call(undefined, 'error', { error: logged })
		clearScreen.call(undefined, 'info')

		expect(logger.hasWarned).toBe(true)
		expect(hasErrorLogged.call(undefined, logged)).toBe(true)
		expect(output).toEqual(['info\n', 'warn\n', 'once\n', 'error\n'])
	})
})

describe('render: jargon translation', () => {
	it('translates every Origin', () => {
		expect(ORIGIN_LABEL.host).toBe('host-owned')
		expect(ORIGIN_LABEL.template).toBe('starter')
		expect(ORIGIN_LABEL.computed).toBe('generated')
	})

	it('translates every Drift', () => {
		expect(DRIFT_LABEL.aligned).toBe('unchanged')
		expect(DRIFT_LABEL.stale).toBe('drifted')
		expect(DRIFT_LABEL.missing).toBe('missing')
		expect(DRIFT_LABEL.foreign).toBe('unexpected file')
	})

	it('translates every Freshness cause label', () => {
		expect(FRESHNESS_LABEL.current).toBe('unchanged')
		expect(FRESHNESS_LABEL.behind).toBe('behind')
		expect(FRESHNESS_LABEL.missing).toBe('missing upstream')
		expect(FRESHNESS_LABEL.failed).toBe('fetch failed')
	})

	it('translates materializer action words', () => {
		expect(ACTION_LABEL.copied).toBe('wrote')
		expect(ACTION_LABEL.written).toBe('wrote')
		expect(ACTION_LABEL.skipped).toBe('unchanged')
	})
})

describe('render: bucketText / verdicts', () => {
	it('reports clean when every count is zero', () => {
		expect(bucketText({ drifted: 0, missing: 0, foreign: 0 })).toBe('clean')
	})

	it('joins nonzero buckets with translated labels', () => {
		expect(bucketText({ drifted: 2, missing: 1, foreign: 0 })).toBe('2 drifted, 1 missing')
	})

	it('renders a clean audit verdict', () => {
		const audit = buildAudit([])
		expect(auditVerdict(audit, AUDIT_PLAN)).toBe('audit: 0 artifacts — clean')
	})

	it('renders a drifted audit verdict with the origin split', () => {
		const audit = buildAudit(AUDIT_FINDINGS)
		const line = auditVerdict(audit, AUDIT_PLAN)
		expect(line.startsWith('audit: 5 artifacts —')).toBe(true)
		expect(line).toContain('host-owned:')
		expect(line).toContain('generated:')
	})

	it('renders repair verdicts for clean and drifted audits', () => {
		expect(repairVerdict(buildAudit([]), false)).toBe(
			'repair: 0 host-owned artifacts aligned — nothing to write',
		)
		expect(repairVerdict(buildAudit([]), true)).toBe(
			'repair: 0 host-owned and generated artifacts aligned — nothing to write',
		)
		const missingOnly = buildAudit([
			{ path: 'src/core/index.ts', group: 'source', drift: 'missing' },
		])
		expect(repairVerdict(missingOnly, false)).toBe(
			'repair: host-owned: 1 missing — pass --apply to write',
		)
		const preserved = repairVerdict(buildAudit(AUDIT_FINDINGS), false)
		expect(preserved).toContain('repair: host-owned:')
		expect(preserved).toContain(
			'--apply restores missing files; drifted files change only with --replace, which discards local changes',
		)
		expect(repairVerdict(buildAudit(AUDIT_FINDINGS), true)).toContain(
			'repair: host-owned and generated:',
		)
		const replacing = repairVerdict(buildAudit(AUDIT_FINDINGS), true, true)
		expect(replacing).toContain(
			'--apply restores missing files and overwrites drifted ones, discarding local changes',
		)
		expect(replacing).not.toContain('--replace')
	})

	it('states the destructive opt-in in both repair scope lines, and claims nothing about the operator’s files', () => {
		for (const line of [REPAIR_SCOPE, REPAIR_GENERATED_SCOPE]) {
			expect(line).toContain('missing files are restored')
			expect(line).toContain(
				'drifted files change only with --replace, which discards local changes',
			)
			expect(line).not.toContain('hand-edited')
			expect(line).not.toContain('stale')
		}
		expect(REPAIR_SCOPE).toContain('present starter and generated files are never touched')
		expect(REPAIR_GENERATED_SCOPE).toContain(
			'present starter files and package publication metadata are never touched',
		)
	})

	it('merges generated service scripts without changing publication metadata or unrelated scripts', () => {
		const merged = mergeServiceManifest(
			JSON.stringify({
				name: '@orkestrel/router',
				homepage: 'https://consumer.example/router',
				scripts: {
					test: 'consumer-test',
					'test:service:retired': 'retired-command',
					prepublishOnly: 'consumer-publish',
				},
			}),
			JSON.stringify({
				name: '@orkestrel/router',
				scripts: {
					test: 'generated-test',
					'test:service': 'aggregate-command',
					'test:service:claude': 'claude-command',
					prepublishOnly: 'generated-publish && npm run test:service',
				},
			}),
			['claude'],
		)

		expect(parseJSON(merged)).toEqual({
			name: '@orkestrel/router',
			homepage: 'https://consumer.example/router',
			scripts: {
				test: 'consumer-test',
				'test:service': 'aggregate-command',
				'test:service:claude': 'claude-command',
				prepublishOnly: 'consumer-publish && npm run test:service',
			},
		})
	})

	it('renders the repair scope note only when there is out-of-scope drift', () => {
		expect(scopeNote(0, false)).toBeUndefined()
		expect(scopeNote(3, false)).toContain('outside host-owned repair scope')
		expect(scopeNote(3, false)).not.toContain('--generated')
		expect(scopeNote(3, true)).toContain(
			'present starter files and package publication metadata remain protected',
		)
	})

	it('partitions findings by repair ownership', () => {
		expect(partitionFindings(AUDIT_FINDINGS, AUDIT_PLAN)).toEqual({
			owned: { drifted: 1, missing: 1, foreign: 0 },
			generated: { drifted: 1, missing: 0, foreign: 1 },
		})
	})
})

describe('render: tables', () => {
	it('builds the audit findings table with translated columns and excludes aligned rows', () => {
		const table = auditTable(buildAudit(AUDIT_FINDINGS), AUDIT_PLAN)
		expect(table.columns.map((column) => column.label)).toEqual(['Status', 'Kind', 'Path'])
		expect(table.rows).toHaveLength(4)
		expect(table.rows).toContainEqual(['drifted', 'host-owned', 'AGENTS.md'])
		expect(table.rows).toContainEqual(['unexpected file', 'unexpected file', 'unexpected.txt'])
	})

	it('builds synchronization freshness rows, translated', () => {
		const report: SyncReport = {
			target: '.',
			guides: [
				{
					name: 'core',
					path: 'guides/src/core.md',
					content: '',
					freshness: 'behind',
					note: 'HTTP 404',
				},
			],
			versions: [{ name: 'emitter', range: '^1.0.0', latest: '1.2.0', freshness: 'current' }],
			clean: false,
			failed: 0,
		}
		const rows = syncRows(report)
		expect(rows).toEqual([
			['core', 'guide', 'behind'],
			['emitter', 'version', 'unchanged'],
		])
		expect(syncVerdict(report, 'pull')).toBe('pull: 2 entries — 0 failed')
		expect(syncVerdict(report, 'mirror')).toBe('mirror: 2 entries — 0 failed')
	})

	it('builds the catalog preview table with no description column', () => {
		const entries: readonly CatalogEntry[] = [
			{ name: '@orkestrel/core', version: '1.0.0', description: 'x' },
		]
		const table = catalogTable(entries)
		expect(table.columns.map((column) => column.label)).toEqual(['Package', 'Version'])
		expect(table.rows).toEqual([['@orkestrel/core', '1.0.0']])
	})

	it('warns on shrink, silent otherwise', () => {
		expect(catalogShrinkWarning(10, 8)).toContain('shrinks from 10 rows to 8')
		expect(catalogShrinkWarning(8, 10)).toBeUndefined()
		expect(catalogShrinkWarning(8, 8)).toBeUndefined()
	})
})

describe('render: fleet', () => {
	it('renders each per-repo outcome state', () => {
		expect(fleetRepoLine('widget', { state: 'clean' })).toBe('widget: clean')
		expect(fleetRepoLine('widget', { state: 'drifted', drifted: 1, missing: 0, foreign: 0 })).toBe(
			'widget: 1 drifted',
		)
		expect(fleetRepoLine('widget', { state: 'repaired', remaining: 2 })).toBe(
			'widget: repaired (2 findings remaining)',
		)
		expect(fleetRepoLine('widget', { state: 'failed', message: '[TARGET] no host' })).toBe(
			'widget: [TARGET] no host',
		)
	})

	it('renders blast-radius totals', () => {
		expect(fleetTotals(2, 1)).toBe('total: 2 drifted repos, 1 failed')
		expect(fleetTotals(1, 0)).toBe('total: 1 drifted repo, 0 failed')
	})
})

describe('render: new preview / apply', () => {
	it('renders the destination preview line', () => {
		expect(newPlanPreview('widget')).toBe('will write into ./widget')
	})
})

describe('render: prompt messages', () => {
	it('builds the apply-confirm message, singular and fleet-wide', () => {
		expect(applyConfirmMessage(3)).toBe('Apply — write 3 files? ')
		expect(applyConfirmMessage(3, 2)).toBe('Apply — write 3 files across 2 repos? ')
	})

	it('builds the prune double-confirm message', () => {
		expect(pruneConfirmMessage(4)).toBe(
			'Also delete 4 unexpected files under .claude/agents, .codex/agents, and scripts? ',
		)
	})

	it('exposes the cancelled string', () => {
		expect(CANCELLED_MESSAGE).toBe('cancelled — nothing written')
	})

	it('repairHandoff: missing-only drift asks to restore, and mentions no overwrite or deletion', () => {
		expect(repairHandoff(3, 0, 0, false)).toBe(
			'restore 3 missing host-owned files — run repair now? ',
		)
		expect(repairHandoff(1, 0, 0, false)).toBe(
			'restore 1 missing host-owned file — run repair now? ',
		)
	})

	it('repairHandoff: an authorized overwrite carries its cost inside the question itself', () => {
		expect(repairHandoff(0, 2, 0, false)).toBe(
			'overwrite 2 drifted host-owned files, discarding local changes — run repair now? ',
		)
	})

	it('repairHandoff: names every authorized action, one clause each', () => {
		expect(repairHandoff(2, 1, 1, true)).toBe(
			'restore 2 missing host-owned files; overwrite 1 drifted host-owned file, discarding local changes; delete 1 unexpected file — run repair now? ',
		)
	})

	it('repairHandoff: foreign-only drift with pruning names only the deletion clause', () => {
		expect(repairHandoff(0, 0, 2, true)).toBe('delete 2 unexpected files — run repair now? ')
	})

	it('repairHandoff: foreign present but prune false never mentions deletion (nothing would be deleted)', () => {
		expect(repairHandoff(1, 0, 2, false)).toBe(
			'restore 1 missing host-owned file — run repair now? ',
		)
	})

	it('foreignHint points at repair --prune', () => {
		expect(FOREIGN_HINT).toBe(
			"unexpected files found — run 'scaffold repair --prune' to delete them",
		)
	})

	it('scanSkipped explains the degraded audit', () => {
		expect(SCAN_SKIPPED).toBe(
			"unexpected-file scanning skipped — couldn't establish the template source",
		)
	})

	it('orkestrelDepsPrompt names short-name deps landing as dependencies', () => {
		expect(ORKESTREL_DEPS_PROMPT).toBe(
			'@orkestrel dependencies (comma-separated short names, e.g. contract, emitter — installed as dependencies)',
		)
	})

	it('unknownOrkestrelToken names the token, no suggestion', () => {
		expect(unknownOrkestrelToken('@orkestrel/nope', undefined)).toBe(
			'"@orkestrel/nope" is not a published @orkestrel package — try again',
		)
	})

	it('unknownOrkestrelToken names the token AND the nearest suggestion', () => {
		expect(unknownOrkestrelToken('@orkestrel/contrakt', '@orkestrel/contract')).toBe(
			'"@orkestrel/contrakt" is not a published @orkestrel package — did you mean "@orkestrel/contract"? try again',
		)
	})

	it('validates dependency tokens against available and unavailable catalogs', () => {
		expect(orkestrelTokenIssue('@orkestrel/contract', undefined)).toBeUndefined()
		expect(orkestrelTokenIssue('@orkestrel/contrakt', ['@orkestrel/contract'])).toContain(
			'@orkestrel/contract',
		)
	})

	it('catalogUnresolvedNote explains the shape-only degrade', () => {
		expect(CATALOG_UNRESOLVED_NOTE).toBe(
			"couldn't resolve the vendored @orkestrel catalog — validating names by shape only",
		)
	})

	it('invalidName names the offending value and the expected pattern', () => {
		expect(invalidName('Bad_Name', '^[a-z][a-z0-9-]*$')).toBe(
			'Package name "Bad_Name" must match ^[a-z][a-z0-9-]*$',
		)
	})

	it('unresolvedVersion names every unresolved package plainly', () => {
		expect(unresolvedVersion(['left-pad'])).toBe(
			'could not resolve the latest version for "left-pad" — check the name or pass name@range',
		)
		expect(unresolvedVersion(['left-pad', 'zod'])).toBe(
			'could not resolve the latest version for "left-pad", "zod" — check the name or pass name@range',
		)
	})

	it('describes each environment checkbox choice', () => {
		const choices = ENVIRONMENT_CHOICES
		expect(choices.map((choice) => choice.value)).toEqual(['core', 'browser', 'server'])
		expect(choices.find((choice) => choice.value === 'core')?.description).toBe('the pure engine')
		expect(choices.find((choice) => choice.value === 'browser')?.description).toBe(
			'DOM-facing environment',
		)
		expect(choices.find((choice) => choice.value === 'server')?.description).toBe(
			'node-facing environment',
		)
	})
})

describe('render: did-you-mean', () => {
	it('computes edit distance', () => {
		expect(editDistance('fleet', 'fleet')).toBe(0)
		expect(editDistance('flete', 'fleet')).toBe(2)
		expect(editDistance('', 'abc')).toBe(3)
	})

	it('finds the nearest candidate', () => {
		expect(nearest('flete', [...KNOWN_VERBS])).toBe('fleet')
	})

	it('renders the did-you-mean message', () => {
		expect(didYouMean('flete')).toBe('unknown command "flete" — did you mean "fleet"?')
	})

	it('lists every known verb', () => {
		expect([...KNOWN_VERBS]).toEqual([
			'new',
			'pull',
			'mirror',
			'audit',
			'repair',
			'fleet',
			'catalog',
		])
	})

	it('fuzzy-matches unknown inputs', () => {
		expect(didYouMean('flete')).toContain('did you mean "fleet"?')
	})
})

describe('bin destination containment', () => {
	it('accepts nested destinations and rejects escapes', () => {
		const root = join(process.cwd(), 'fixture-root')
		const nested = join(root, 'nested')
		expect(containDestination(root, nested)).toBe(nested)
		expect(() => containDestination(root, join(root, '..', 'outside'))).toThrow(
			/outside or traverses a linked parent/,
		)
	})

	it('accepts the real invocation root as the default dot destination', () => {
		expect(containDestination(process.cwd(), '.')).toBe(process.cwd())
	})

	it.each(['\n', '\r', '\u001b', '\u0085', '\u2028', '\u202e'])(
		'rejects terminal control %j before resolving or echoing a destination',
		(control) => {
			expect(() => containDestination(process.cwd(), `hostile${control}target`)).toThrow(
				'Target paths must not contain control characters',
			)
		},
	)

	it.skipIf(!canDirectoryLink)('rejects an internal linked parent before planning', async () => {
		const root = await buildTempDirectory()
		try {
			const physical = join(root.path, 'physical')
			const linked = join(root.path, 'linked')
			mkdirSync(physical)
			createDirectoryLink(physical, linked)

			expect(() => containDestination(root.path, join(linked, 'package'))).toThrow(
				/outside or traverses a linked parent/,
			)
		} finally {
			await root.cleanup()
		}
	})

	it('renders coded, ordinary, and non-error failures', () => {
		expect(describeError(new ScaffoldError('TARGET', 'unavailable'))).toBe('[TARGET] unavailable')
		expect(describeError(new Error('ordinary'))).toBe('ordinary')
		expect(describeError('failure')).toBe('unknown error')
	})
})

describe('render: help tiers', () => {
	it('shortUsage stays within 11 lines and names every verb', () => {
		const lines = shortUsage().split('\n')
		expect(lines.length).toBeLessThanOrEqual(11)
		for (const verb of KNOWN_VERBS) expect(shortUsage()).toContain(verb)
		expect(shortUsage()).toContain('scaffold <verb> --help')
	})

	it('fullHelp includes the exit-code table and every supported verb', () => {
		const text = fullHelp()
		for (const [code] of EXIT_CODES) expect(text).toContain(code)
		for (const verb of KNOWN_VERBS) expect(text).toContain(verb)
	})

	it('verbHelp renders one verb section', () => {
		const text = verbHelp('fleet')
		expect(text).toContain('fleet')
		expect(text).not.toContain('catalog ')
	})

	it('verbHelp includes a dry-run/confirm note and a concrete example, for every verb', () => {
		for (const verb of KNOWN_VERBS) {
			const text = verbHelp(verb)
			expect(text).toMatch(/dry run|read-only/)
			expect(text).toContain('example: scaffold')
		}
	})

	it('verbHelp emits one line per flag, matching VERB_FLAGS', () => {
		for (const verb of KNOWN_VERBS) {
			const text = verbHelp(verb)
			const flags = VERB_FLAGS[verb].split(' ').filter((token) => token.startsWith('--'))
			for (const flag of flags) expect(text).toContain(flag)
		}
	})

	it('verbHelp marks --prune as destructive wherever it appears', () => {
		expect(verbHelp('repair')).toContain(
			'also DELETE unexpected files under .claude/agents, .codex/agents, and scripts',
		)
		expect(verbHelp('fleet')).toContain(
			'also DELETE unexpected files under .claude/agents, .codex/agents, and scripts',
		)
	})
})

describe('render: VERB_FLAGS corrections', () => {
	it('never advertises --root anywhere', () => {
		for (const verb of KNOWN_VERBS) expect(VERB_FLAGS[verb]).not.toContain('--root')
	})

	it('only advertises --live under audit', () => {
		expect(VERB_FLAGS.audit).toContain('--live')
		expect(VERB_FLAGS.new).not.toContain('--live')
		expect(VERB_FLAGS.pull).not.toContain('--live')
		expect(VERB_FLAGS.mirror).not.toContain('--live')
		expect(VERB_FLAGS.repair).not.toContain('--live')
		expect(VERB_FLAGS.fleet).not.toContain('--live')
		expect(VERB_FLAGS.catalog).not.toContain('--live')
	})

	it('advertises --generated only where repair scope can inherit or widen', () => {
		expect(VERB_FLAGS.audit).toContain('--generated')
		expect(VERB_FLAGS.repair).toContain('--generated')
		expect(VERB_FLAGS.fleet).toContain('--generated')
		for (const verb of ['repair', 'fleet'] as const) {
			const help = VERB_FLAG_HELP[verb].find(([flag]) => flag === '--generated')?.[1]
			expect(help).toContain('widen the scope to generated files')
			expect(help).not.toContain('restore')
		}
		expect(VERB_FLAGS.new).not.toContain('--generated')
		expect(VERB_FLAGS.pull).not.toContain('--generated')
		expect(VERB_FLAGS.mirror).not.toContain('--generated')
		expect(VERB_FLAGS.catalog).not.toContain('--generated')
	})

	it('advertises --replace only where repair can apply or inherit byte replacement', () => {
		expect(VERB_FLAGS.audit).toContain('--replace')
		expect(VERB_FLAGS.repair).toContain('--replace')
		expect(VERB_FLAGS.fleet).toContain('--replace')
		expect(VERB_FLAG_HELP.repair.find(([flag]) => flag === '--replace')?.[1]).toContain(
			'discard local changes',
		)
		expect(VERB_FLAGS.new).not.toContain('--replace')
		expect(VERB_FLAGS.pull).not.toContain('--replace')
		expect(VERB_FLAGS.mirror).not.toContain('--replace')
		expect(VERB_FLAGS.catalog).not.toContain('--replace')
	})

	it('catalog advertises --from instead of --root', () => {
		expect(VERB_FLAGS.catalog).toContain('--from <path>')
	})

	it('no verb advertises the unsupported --extras flag', () => {
		for (const verb of KNOWN_VERBS) {
			expect(VERB_FLAGS[verb]).not.toContain('--extras')
			expect(VERB_FLAG_HELP[verb].some(([flag]) => flag.startsWith('--extras'))).toBe(false)
		}
	})
})

describe('render: repairSuccess uses ACTION_LABEL', () => {
	it('wires the materializer tally through ACTION_LABEL words', () => {
		const result = { target: '.', written: ['a'], copied: ['b'], skipped: ['c'], removed: [] }
		const line = repairSuccess(result, ['d'])
		expect(line).toBe(
			`${ACTION_LABEL.written} 2, ${ACTION_LABEL.skipped} 1, ${ACTION_LABEL.removed} 1`,
		)
	})
})

describe('render: new prune/missing/generated/audit-live/comparison/ci/catalog exports', () => {
	it('prunePreview lists one line per exact path', () => {
		expect(prunePreview(['a.ts', 'b.ts'])).toEqual(['  delete a.ts', '  delete b.ts'])
		expect(prunePreview([])).toEqual([])
	})

	it('PRUNE_EMPTY reads as a "nothing found" line', () => {
		expect(PRUNE_EMPTY).toContain('no unexpected files to delete')
	})

	it('pruneSkipped explains the non-interactive alternative without re-asking for --prune', () => {
		const line = PRUNE_SKIPPED
		expect(line).toBe(
			'prune skipped — pass --apply to authorize deletion; --yes only skips confirmation',
		)
		expect(line).not.toContain('pass --prune')
	})

	it('missingInput names what was missing and how to proceed', () => {
		const line = missingInput('a package name', 'new')
		expect(line).toContain('a package name')
		expect(line).toContain('scaffold new')
	})

	it('generatedNote says what repair does with generated drift, never how those files got there', () => {
		const line = generatedNote(3)
		expect(line).toContain('3 findings')
		expect(line).toContain('generated files')
		expect(line).toContain("run 'scaffold repair --generated' to restore missing ones")
		expect(line).toContain('add --replace to overwrite drifted ones, discarding local changes')
		expect(line).not.toContain('hand-edited')
	})

	it('replacementNote names the safe default before the destructive host-byte opt-in', () => {
		const line = replacementNote(2)
		expect(line).toContain('2 drifted host-owned files')
		expect(line).toContain('repair leaves drifted files alone')
		expect(line).toContain("'scaffold repair --replace' overwrites them, discarding local changes")
	})

	it('separates repairable generated drift from protected package.json guidance', () => {
		const plan: Plan = {
			...AUDIT_PLAN,
			artifacts: [
				...AUDIT_PLAN.artifacts,
				{
					path: 'package.json',
					group: 'manifest',
					origin: 'computed',
					content: '{}\n',
				},
			],
		}
		const generated = renderComputedNotes(
			[{ path: 'src/core/computed.ts', group: 'source', drift: 'stale' }],
			plan,
		)
		const manifest = renderComputedNotes(
			[{ path: 'package.json', group: 'manifest', drift: 'stale' }],
			plan,
		)

		expect(generated).toEqual([
			"1 finding in generated files — run 'scaffold repair --generated' to restore missing ones; add --replace to overwrite drifted ones, discarding local changes",
		])
		expect(manifest).toEqual([
			'1 finding in package.json — repair does not rewrite protected publication metadata; review and edit it directly',
		])
		expect(manifest[0]).not.toContain('repair --generated')
	})

	it('auditLiveNote reports current/behind/failed counts without pluralizing the adjectives', () => {
		expect(auditLiveNote(2, 1, 0)).toBe('live: 2 current, 1 behind, 0 failed')
		expect(auditLiveNote(1, 1, 1)).toBe('live: 1 current, 1 behind, 1 failed')
	})

	it('comparisonLine reports exact host-file comparison depth without implementation jargon', () => {
		const aware = comparisonLine(true)
		const notAware = comparisonLine(false)
		expect(aware).toBe('comparing: file contents for host-owned files')
		expect(aware.toLowerCase()).not.toContain('presence-only')
		expect(notAware).toBe(
			'comparing: file names only for host-owned files (no vendored source found)',
		)
		expect(notAware.toLowerCase()).not.toContain('presence-only')
	})

	it('catalogVerdict renders clean and drifted lines', () => {
		expect(catalogVerdict(true)).toBe('catalog: clean')
		expect(catalogVerdict(false)).toBe('catalog: drifted — pass --apply to write')
	})
})

describe('bin result shapers', () => {
	it('errorEnvelope wraps code + message', () => {
		expect(errorEnvelopeOf('INVALID', 'bad')).toEqual({
			error: { code: 'INVALID', message: 'bad' },
		})
	})

	it('newJson is deterministic and JSON-parseable', () => {
		const value = summaryToNewResult(
			{
				name: 'widget',
				src: ['core'],
				app: [],
				groups: ['manifest'],
				artifacts: 6,
				host: 1,
				template: 2,
				computed: 3,
			},
			true,
		)
		const parsed: unknown = parseJSON(JSON.stringify(value))
		expect(parsed).toEqual({
			name: 'widget',
			src: ['core'],
			app: [],
			host: 1,
			template: 2,
			computed: 3,
			applied: true,
		})
	})

	it('adds a materialization result to repair JSON', () => {
		const audit = buildAudit([])
		const result = { target: '.', written: ['a'], copied: [], skipped: [], removed: [] }
		expect(auditToRepairResult(audit, result)).toEqual({ ...audit, result })
	})

	it('creates fleet entries for audited and failed repositories', () => {
		expect(fleetEntryOf('widget', { drifted: 1, missing: 2, foreign: 3 }, false)).toEqual({
			name: 'widget',
			drifted: 1,
			missing: 2,
			foreign: 3,
			failed: false,
		})
		expect(fleetEntryOf('broken', undefined, true)).toEqual({
			name: 'broken',
			drifted: 0,
			missing: 0,
			foreign: 0,
			failed: true,
		})
	})

	it('catalogJson includes shrink only when given', () => {
		const entries: readonly CatalogEntry[] = []
		expect(catalogResultOf(entries, false)).toEqual({ entries, drift: false })
		expect(catalogResultOf(entries, true, 2)).toEqual({
			entries,
			drift: true,
			shrink: 2,
		})
	})
})
