import type { Audit, Question } from '@src/core'
import type { MaterializeResult } from '@src/server'
import type {
	AuditResult,
	CatalogResult,
	CLIOptions,
	NewResult,
	OverwriteResult,
	RepairResult,
} from '../../../src/bin/types.js'
import { SCRATCH_PREFIX, type TestUpstreamReply } from '../../setupServer.js'
import { afterAll, describe, expect, it } from 'vitest'
import {
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_DEV_DEPENDENCIES,
	ARTIFACT_TEMPLATES,
	BASE_DEV_DEPENDENCIES,
	blueprintToDevDependencies,
	blueprintToManifest,
	blueprintToScripts,
	blueprintToWritableScripts,
	CATALOG_AGENT_PATH,
	createBlueprint,
	DECLARATION_DEV_DEPENDENCIES,
	GROUPS,
	isCanonPath,
	RELEASE_PROOF_COMMAND,
	replaceManifestScripts,
	SHOWCASE_DEV_DEPENDENCIES,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
} from '@src/core'
import { readFileHex } from '@src/server'
import { requireValue } from '@orkestrel/test'
import {
	EXIT_CLEAN,
	EXIT_DRIFT,
	EXIT_USAGE,
	FAILED_CODE,
	USAGE_CODE,
	VERBS,
} from '../../../src/bin/constants.js'
import { renderUsage } from '../../../src/bin/helpers.js'
import { CLI } from '../../../src/bin/CLI.js'
import {
	buildCLIOptions,
	buildFleetManifest,
	buildHostManifest,
	buildInstalledHostReplies,
	buildOrganization,
	buildPackument,
	buildTargetManifest as buildTargetManifestFixture,
	commitFiles,
	createCatalogFleet,
	createFleet,
	createHostRoot,
	createRepository,
	createSink,
	createStagedHost,
	createUpstreamServer,
	FLEET_ARTIFACT_COUNT,
	FLEET_BIRTH_COUNT,
	FLEET_BIRTH_PATHS,
	FLEET_UPSTREAM_PATHS,
	HOSTILE_ARGUMENT,
	HOSTILE_BYTES,
	omitDependencies,
	REFUSED_MANIFEST_TEXT,
	TARGET_DEV_DEPENDENCIES,
	TARGET_MANIFEST_TEXT as TARGET_MANIFEST_FIXTURE,
	trackFiles,
	USAGE_CASES,
} from '../../setupServer.js'
import { createScratch } from '@orkestrel/test/server'

// A setup module a maintainer wrote into. What separates it from what scaffold
// seeds at that path is that its text is not the seed's.
const FILLED_SETUP_TEXT = "export const SAMPLE_FIXTURE = 'sample'\n"
// The other half of that population: a setup module a maintainer wrote into that
// exports nothing and only registers a hook. The question reads text, so this
// module reaches it exactly as the exporting one does, and the fleet ships this
// shape. Its remedy must be one this maintainer can carry out.
const HOOK_SETUP_TEXT = [
	"import { afterEach } from 'vitest'",
	'',
	'afterEach(() => {',
	'\tSAMPLE_REGISTRY.clear()',
	'})',
	'',
].join('\n')
const FLEET_NAMES: readonly string[] = Object.freeze([
	'@orkestrel/emitter',
	'@orkestrel/guide',
	'@orkestrel/probe',
	'@orkestrel/scaffold',
	'@orkestrel/test',
])
const TARGET_MANIFEST_TEXT = TARGET_MANIFEST_FIXTURE.replace('~8.2.0', '~8.2.2')

const FLEET_RELEASE_REPLIES: Readonly<Record<string, TestUpstreamReply>> = Object.freeze({
	[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.5') },
	[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.0.9') },
	[FLEET_UPSTREAM_PATHS.packages.probe]: {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/probe']?.slice(1) ?? ''),
	},
	[FLEET_UPSTREAM_PATHS.packages.scaffold]: {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']?.slice(1) ?? ''),
	},
	[FLEET_UPSTREAM_PATHS.packages.test]: {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/test']?.slice(1) ?? ''),
	},
	'/@microsoft%2Fapi-extractor': {
		status: 200,
		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? ''),
	},
	'/@types%2Fnode': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
	},
	'/oxfmt': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
	},
	'/oxlint': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
	},
	'/typescript': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
	},
	'/vite': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vite?.slice(1) ?? ''),
	},
	'/vite-plugin-dts': {
		status: 200,
		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['vite-plugin-dts']?.slice(1) ?? ''),
	},
	'/vitest': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
	},
})

const FLEET_MIRROR_REPLIES: Readonly<Record<string, TestUpstreamReply>> = Object.freeze({
	[FLEET_UPSTREAM_PATHS.mirrors.emitter]: { status: 200, body: '# Emitter\n', type: 'text/plain' },
	[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
	[FLEET_UPSTREAM_PATHS.mirrors.probe]: { status: 200, body: '# Probe\n', type: 'text/plain' },
	[FLEET_UPSTREAM_PATHS.mirrors.scaffold]: {
		status: 200,
		body: '# Scaffold\n',
		type: 'text/plain',
	},
	[FLEET_UPSTREAM_PATHS.mirrors.test]: { status: 200, body: '# Test\n', type: 'text/plain' },
})

function buildTargetManifest(
	blueprint = createBlueprint('sample', { src: ['core'] }),
	dependencies?: unknown,
	development?: unknown,
	scripts?: unknown,
): string {
	const dependenciesAligned =
		dependencies === undefined ? { '@orkestrel/emitter': '^0.0.5', vite: '~8.2.2' } : dependencies
	const declared = development === undefined ? blueprintToDevDependencies(blueprint) : development
	const aligned =
		typeof declared === 'object' && declared !== null && !Array.isArray(declared)
			? { ...declared, '@orkestrel/guide': '^0.0.9' }
			: declared
	return buildTargetManifestFixture(blueprint, dependenciesAligned, aligned, scripts)
}

// The advisory audit raises over one filled setup module no proof covers.
// Several fixtures carry such a module to reach another subject, and each of
// them has to state this question exactly rather than loosen its assertion. The
// proof is derived from the module the same way the question derives it, so a
// fixture naming a module other than `tests/setup.ts` states the remedy that
// module actually wants.
function buildSetupQuestion(target: string, module: string): Question {
	const proof = `${module.slice(0, -'.ts'.length)}.test.ts`
	return {
		field: 'setup',
		message: `The target at ${target} carries a test setup module that no proof covers: ${module}. Add ${proof} to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.`,
		blocking: false,
	}
}

const AUDIT_REGISTRY = await createUpstreamServer({
	'/@orkestrel%2Fcontract': { status: 200, body: buildPackument('0.0.13') },
	'/@orkestrel%2Femitter': { status: 200, body: buildPackument('0.0.5') },
	'/@orkestrel%2Fguide': { status: 200, body: buildPackument('0.0.9') },
	'/@orkestrel%2Fhtml': { status: 200, body: buildPackument('0.0.4') },
	'/@orkestrel%2Fmiddleware': { status: 200, body: buildPackument('0.0.16') },
	'/@orkestrel%2Fprobe': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/probe']?.slice(1) ?? ''),
	},
	'/@orkestrel%2Frouter': { status: 200, body: buildPackument('0.0.10') },
	'/@orkestrel%2Fscaffold': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']?.slice(1) ?? ''),
	},
	'/@orkestrel%2Fserver': { status: 200, body: buildPackument('0.0.14') },
	'/@orkestrel%2Ftest': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@orkestrel/test']?.slice(1) ?? ''),
	},
	'/@microsoft%2Fapi-extractor': {
		status: 200,
		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? ''),
	},
	'/@types%2Fnode': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
	},
	'/@vitejs%2Fplugin-vue': {
		status: 200,
		body: buildPackument(APP_BROWSER_DEV_DEPENDENCIES['@vitejs/plugin-vue']?.slice(1) ?? ''),
	},
	'/@vitest%2Fbrowser-playwright': {
		status: 200,
		body: buildPackument(
			SOURCE_BROWSER_DEV_DEPENDENCIES['@vitest/browser-playwright']?.slice(1) ?? '',
		),
	},
	'/oxfmt': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
	},
	'/oxlint': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
	},
	'/playwright': {
		status: 200,
		body: buildPackument(SOURCE_BROWSER_DEV_DEPENDENCIES.playwright?.slice(1) ?? ''),
	},
	'/typescript': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
	},
	'/vite': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vite?.slice(1) ?? ''),
	},
	'/vite-plugin-dts': {
		status: 200,
		body: buildPackument(DECLARATION_DEV_DEPENDENCIES['vite-plugin-dts']?.slice(1) ?? ''),
	},
	'/vite-plugin-singlefile': {
		status: 200,
		body: buildPackument(SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile']?.slice(1) ?? ''),
	},
	'/vitest': {
		status: 200,
		body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
	},
	'/vue': {
		status: 200,
		body: buildPackument(APP_BROWSER_DEV_DEPENDENCIES.vue?.slice(1) ?? ''),
	},
	'/vue-tsc': {
		status: 200,
		body: buildPackument(APP_BROWSER_DEV_DEPENDENCIES['vue-tsc']?.slice(1) ?? ''),
	},
})
const REGISTRY_OPTIONS: CLIOptions = {
	upstream: { registry: { base: AUDIT_REGISTRY.base }, repository: { base: AUDIT_REGISTRY.base } },
}

afterAll(async () => AUDIT_REGISTRY.destroy())

describe('CLI usage', () => {
	it('refuses --bin by name on every reading verb', async () => {
		for (const verb of ['audit', 'repair', 'catalog', 'overwrite']) {
			const sink = createSink()
			expect(await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([verb, '--bin'])).toBe(
				EXIT_USAGE,
			)
			expect(sink.diagnostic).toStrictEqual([`USAGE: '${verb}' does not take --bin.`])
		}
	})

	it('answers a request for usage instead of running, and writes nothing to the diagnostic', async () => {
		const sink = createSink()
		expect(await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute(['--help'])).toBe(
			EXIT_CLEAN,
		)
		expect(sink.output).toStrictEqual(renderUsage())
		expect(sink.diagnostic).toStrictEqual([])
	})

	it('answers a request for usage on a verb, because usage replaces the run', async () => {
		for (const verb of VERBS) {
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([verb, '--help']),
			).toBe(EXIT_CLEAN)
			expect(sink.output).toStrictEqual(renderUsage())
		}
	})

	for (const usageCase of USAGE_CASES) {
		it(`refuses ${usageCase.label} on the diagnostic, with the usage code`, async () => {
			const sink = createSink()
			expect(await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute(usageCase.argv)).toBe(
				EXIT_USAGE,
			)
			expect(sink.output).toStrictEqual([])
			expect(sink.diagnostic).toHaveLength(1)
			expect(sink.diagnostic[0] ?? '').toContain(usageCase.mention)
			expect(sink.diagnostic[0] ?? '').toContain(USAGE_CODE)
		})
	}

	it('refuses a group no plan has, naming what it does take', async () => {
		const sink = createSink()
		expect(
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--groups',
				'readme',
			]),
		).toBe(EXIT_USAGE)
		expect(sink.diagnostic[0] ?? '').toContain('readme')
		for (const group of GROUPS) expect(sink.diagnostic[0] ?? '').toContain(group)
	})

	it('accepts every group some plan has', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			for (const group of GROUPS) {
				const sink = createSink()
				const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--groups',
					group,
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				])
				expect(code).not.toBe(EXIT_USAGE)
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an environment no workspace has, on each axis it is offered to', async () => {
		for (const axis of ['src', 'app']) {
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'widget',
				`--${axis}`,
				'native',
			])
			expect(code).toBe(EXIT_USAGE)
			expect(sink.diagnostic[0] ?? '').toContain('native')
		}
	})

	it('refuses a dependency that is not a published fleet package', async () => {
		const sink = createSink()
		expect(
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'widget',
				'--deps',
				'left-pad',
			]),
		).toBe(EXIT_USAGE)
		expect(sink.diagnostic[0] ?? '').toContain('left-pad')
	})

	it('reports a usage refusal as the one machine-readable value when --json was given', async () => {
		const sink = createSink()
		const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
			'audit',
			'--groups',
			'readme',
			'--json',
		])
		expect(code).toBe(EXIT_USAGE)
		expect(sink.diagnostic).toStrictEqual([])
		expect(sink.output).toHaveLength(1)
		expect(JSON.parse(sink.output[0] ?? '')).toStrictEqual({
			error: { code: USAGE_CODE, message: expect.stringContaining('readme') },
		})
	})
})

describe('CLI sanitization', () => {
	it('carries every hostile byte before it is written, which is what makes the check below able to fail', () => {
		for (const byte of HOSTILE_BYTES) expect(HOSTILE_ARGUMENT).toContain(byte)
	})

	it('passes on no hostile byte from a command line it refuses', async () => {
		const sink = createSink()
		expect(
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([HOSTILE_ARGUMENT]),
		).toBe(EXIT_USAGE)
		expect(sink.diagnostic).toHaveLength(1)
		for (const byte of HOSTILE_BYTES) expect(sink.diagnostic[0] ?? '').not.toContain(byte)
	})

	it('forges no second line out of a line break in an argument', async () => {
		const sink = createSink()
		await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([HOSTILE_ARGUMENT])
		expect(sink.diagnostic).toHaveLength(1)
		expect(sink.diagnostic[0] ?? '').toContain('pull forged')
	})

	it('keeps the visible word the refusal is about', async () => {
		const sink = createSink()
		await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([HOSTILE_ARGUMENT])
		expect(sink.diagnostic[0] ?? '').toContain('pull')
	})

	it('passes on no hostile byte through the machine-readable path either', async () => {
		const sink = createSink()
		const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
			'audit',
			'--groups',
			HOSTILE_ARGUMENT,
			'--json',
		])
		expect(code).toBe(EXIT_USAGE)
		expect(sink.output).toHaveLength(1)
		for (const byte of HOSTILE_BYTES) expect(sink.output[0] ?? '').not.toContain(byte)
		expect(JSON.parse(sink.output[0] ?? '')).toHaveProperty('error.code', USAGE_CODE)
	})
})

describe('CLI new', () => {
	it('creates a bin workspace that round-trips through audit', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			const created = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...created.options }).execute([
					'new',
					'widget',
					'--src',
					'core,server',
					'--bin',
					'--from',
					fleet.host,
					'--target',
					fresh,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const result: MaterializeResult = JSON.parse(created.output[0] ?? '')
			for (const path of [
				'src/bin/main.ts',
				'tests/src/bin/main.test.ts',
				'configs/src/vite.bin.config.ts',
				'configs/src/tsconfig.bin.json',
			]) {
				expect(result.written).toContain(path)
			}
			expect(JSON.parse(requireValue(workspace.read('fresh/package.json')))).toHaveProperty('bin', {
				widget: './dist/bin/main.js',
			})

			const audited = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...audited.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fresh,
				]),
			).toBe(EXIT_CLEAN)
		} finally {
			workspace.destroy()
		}
	})

	it('writes every planned path into a vacant target and reports what it wrote', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(sink.diagnostic).toStrictEqual([])
			expect(workspace.read('fresh/package.json')).toContain('widget')
			expect(sink.output.join('\n')).toContain(String(FLEET_ARTIFACT_COUNT))
		} finally {
			workspace.destroy()
		}
	})

	it('emits one machine-readable value naming every path it wrote', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--from',
				fleet.host,
				'--target',
				fresh,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(sink.output).toHaveLength(1)
			const result: NewResult = JSON.parse(sink.output[0] ?? '')
			expect(result.written).toHaveLength(FLEET_ARTIFACT_COUNT)
			expect(result.written).toContain('package.json')
			expect(result.removed).toStrictEqual([])
			expect(result.provenance).toStrictEqual({ versions: 'live' })
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a workspace that declares no environment at all', async () => {
		const sink = createSink()
		expect(await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute(['new', 'widget'])).toBe(
			EXIT_DRIFT,
		)
		expect(sink.diagnostic[0] ?? '').toContain('src')
	})

	it('refuses a name the gate will not generate', async () => {
		const sink = createSink()
		expect(
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'Widget',
				'--src',
				'core',
			]),
		).toBe(EXIT_DRIFT)
		expect(sink.diagnostic[0] ?? '').toContain('Widget')
	})

	it('refuses a target that already holds a workspace', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	// The gate answers this shape with an advisory, because the verbs that read an
	// existing workspace need the plan it used to refuse. `new` is the verb that
	// chooses the shape, so it is the one that refuses: the manifest it would write
	// names a core build the workspace never runs.
	it('refuses to create a published axis of several environments without core', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('refused-shape')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'new',
				'widget',
				'--src',
				'browser,server',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.output).toStrictEqual([])
			expect(sink.diagnostic.join('\n')).toContain('BLOCKED')
			expect(sink.diagnostic.join('\n')).toContain('core at the package root')
			expect(readFileHex(fresh, 'package.json')).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	// `BLOCKED` names one fact — this blueprint will not be built — so every
	// refusal a creating verb can meet carries it, and the question quoted beside it
	// is what tells them apart. The advisory refusal above is the other half of
	// this pair; splitting the code would give one fact more than one name.
	it('refuses a blocking and a non-blocking question under the one refusal code', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blocked = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...blocked.options }).execute([
				'new',
				'Widget',
				'--src',
				'core',
				'--from',
				fleet.host,
				'--target',
				workspace.ensure('refused-name'),
			])

			expect(code).toBe(EXIT_DRIFT)
			expect(blocked.diagnostic.join('\n')).toContain('BLOCKED')
			expect(blocked.diagnostic.join('\n')).toContain('lowercase alphanumeric name')
		} finally {
			workspace.destroy()
		}
	})

	// `#derive` reconstructs `src` from the directories on disk, so a workspace
	// publishing browser and server without core is a shape the reading verbs meet
	// whatever `new` will create. While the gate refused it, `audit` compared
	// nothing and `repair` could not reach the paths that needed repairing.
	it('compares a target whose published axis lacks core', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const lacking = workspace.ensure('lacking')
			workspace.write('lacking/package.json', TARGET_MANIFEST_TEXT)
			workspace.ensure('lacking/src/browser')
			workspace.ensure('lacking/src/server')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				lacking,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.findings.length).toBeGreaterThan(20)
			expect(audit.findings.some(({ drift }) => drift === 'missing')).toBe(true)
			expect(audit.questions.every(({ blocking }) => !blocking)).toBe(true)
			expect(audit.questions.some(({ field }) => field === 'src')).toBe(true)
		} finally {
			workspace.destroy()
		}
	})
})

describe('CLI upstream baselines', () => {
	it('reports catalog offline as a usage error', async () => {
		const sink = createSink()
		expect(await new CLI(sink.options).execute(['catalog', '--offline'])).toBe(EXIT_USAGE)
		expect(sink.diagnostic).toStrictEqual(["USAGE: 'catalog' does not take --offline."])
	})

	it('takes the host live when every declared digest matches and takes the floor when the repository is dark', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const live = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...buildInstalledHostReplies(),
		})
		const dark = await createUpstreamServer({})
		const repository = dark.base
		await dark.destroy()
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('host-baseline')
			const created = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...created.options }).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)

			const aligned = createSink()
			expect(
				await new CLI(buildCLIOptions(aligned, live.base)).execute([
					'repair',
					'--groups',
					'docs',
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const alignedResult: RepairResult = JSON.parse(aligned.output[0] ?? '')
			expect.soft(alignedResult).toHaveProperty('provenance.host', 'live')
			expect
				.soft(live.paths.filter((path) => path.startsWith('/orkestrel/scaffold/refs/heads/main/')))
				.toStrictEqual(['/orkestrel/scaffold/refs/heads/main/host.json'])

			workspace.write('host-baseline/AGENTS.md', '# Drifted\n')
			const forced = createSink()
			expect(
				await new CLI({
					...forced.options,
					upstream: {
						registry: { base: live.base },
						repository: { base: repository },
					},
				}).execute(['repair', '--groups', 'docs', '--target', target, '--json']),
			).toBe(EXIT_DRIFT)
			const forcedResult: RepairResult = JSON.parse(forced.output[0] ?? '')
			expect(forcedResult).toHaveProperty('provenance.host', 'floor')
			expect(forcedResult).toHaveProperty('provenance.versions', 'live')
			expect(forced.diagnostic.join('\n')).toContain('host=floor')
			// The restore landed. `AGENTS.md` is the planned pointer rather than a
			// vendored file, so the bytes come from the compiler; which baseline the
			// host took is the `provenance.host` reading above.
			expect(workspace.read('host-baseline/AGENTS.md')).toBe(ARTIFACT_TEMPLATES.docs.agents)
		} finally {
			await live.destroy()
			workspace.destroy()
		}
	})

	// A canon path is staged for reading, and the one such path a plan claims is
	// owned by presence, so no run places bytes fetched for either. Asking the
	// repository for one spends a round trip on bytes nothing writes. The drifted
	// vendored path is the control: the same run still fetches what a target does
	// receive, so an empty canon list is a filter rather than a fetch that never ran.
	it('asks the repository for no canon path while fetching a drifted vendored one', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const live = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...buildInstalledHostReplies(),
		})
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('canon-fetch')
			const created = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...created.options }).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			workspace.write('canon-fetch/.claude/settings.json', '{ "drifted": true }\n')
			const sink = createSink()
			await new CLI(buildCLIOptions(sink, live.base)).execute([
				'audit',
				'--target',
				target,
				'--json',
			])
			const prefix = '/orkestrel/scaffold/refs/heads/main/'
			const requested = live.paths
				.filter((path) => path.startsWith(prefix))
				.map((path) => path.slice(prefix.length))
			expect(requested.filter((path) => isCanonPath(path))).toStrictEqual([])
			expect(requested).toContain('.claude/settings.json')
		} finally {
			await live.destroy()
			workspace.destroy()
		}
	})

	it('writes the same distributed new baseline when transport forces it and when offline selects it', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const dark = await createUpstreamServer({})
		const base = dark.base
		await dark.destroy()
		try {
			const forcedTarget = workspace.ensure('forced-new')
			const forced = createSink()
			expect(
				await new CLI(buildCLIOptions(forced, base)).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--target',
					forcedTarget,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const forcedResult: MaterializeResult = JSON.parse(forced.output[0] ?? '')
			expect(forcedResult).toHaveProperty('provenance', {
				versions: 'floor',
				host: 'floor',
			})
			expect(forced.diagnostic.join('\n')).toContain('versions=floor')
			expect(forced.diagnostic.join('\n')).toContain('host=floor')

			const offlineTarget = workspace.ensure('offline-new')
			const offline = createSink()
			expect(
				await new CLI(offline.options).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--offline',
					'--target',
					offlineTarget,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const offlineResult: MaterializeResult = JSON.parse(offline.output[0] ?? '')
			expect(offlineResult).toHaveProperty('provenance', {
				versions: 'floor',
				host: 'floor',
			})
			expect(offline.diagnostic).toStrictEqual([])
			expect(offlineResult.written).toStrictEqual(forcedResult.written)
			for (const path of forcedResult.written) {
				expect(readFileHex(offlineTarget, path)).toBe(readFileHex(forcedTarget, path))
			}
		} finally {
			workspace.destroy()
		}
	})

	it('makes offline audit answer drift alone and offline repair match a forced floor write', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const dark = await createUpstreamServer({})
		const base = dark.base
		await dark.destroy()
		try {
			const host = createStagedHost(workspace)
			for (const name of ['audit-floor', 'forced-repair', 'offline-repair']) {
				const sink = createSink()
				expect(
					await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
						'new',
						'widget',
						'--src',
						'core',
						'--from',
						host,
						'--target',
						workspace.ensure(name),
					]),
				).toBe(EXIT_CLEAN)
				workspace.write(`${name}/AGENTS.md`, '# Drifted\n')
			}

			const audited = createSink()
			expect(
				await new CLI(audited.options).execute([
					'audit',
					'--offline',
					'--groups',
					'docs',
					'--target',
					workspace.ensure('audit-floor'),
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: AuditResult = JSON.parse(audited.output[0] ?? '')
			expect(audit.provenance).toStrictEqual({ versions: 'floor', host: 'floor' })
			expect(audited.diagnostic).toStrictEqual([])

			const forced = createSink()
			expect(
				await new CLI(buildCLIOptions(forced, base)).execute([
					'repair',
					'--groups',
					'docs',
					'--target',
					workspace.ensure('forced-repair'),
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const forcedResult: RepairResult = JSON.parse(forced.output[0] ?? '')

			const offline = createSink()
			expect(
				await new CLI(offline.options).execute([
					'repair',
					'--offline',
					'--groups',
					'docs',
					'--target',
					workspace.ensure('offline-repair'),
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const offlineResult: RepairResult = JSON.parse(offline.output[0] ?? '')
			expect(offlineResult.provenance).toStrictEqual({ versions: 'floor', host: 'floor' })
			expect(offline.diagnostic).toStrictEqual([])
			expect(offlineResult.written).toStrictEqual(forcedResult.written)
			for (const path of forcedResult.written) {
				expect(readFileHex(workspace.ensure('offline-repair'), path)).toBe(
					readFileHex(workspace.ensure('forced-repair'), path),
				)
			}
		} finally {
			workspace.destroy()
		}
	})

	it('runs the overwrite floor half offline and refuses its catalog half', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('offline-overwrite')
			const created = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...created.options }).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			createRepository(target)
			trackFiles(target)
			const sink = createSink()
			expect(
				await new CLI(sink.options).execute([
					'overwrite',
					'--offline',
					'--dirty',
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
			expect(result.provenance).toStrictEqual({ versions: 'floor', host: 'floor' })
			expect(result.note ?? '').toContain("USAGE: 'catalog' does not take --offline")
			expect(result.entries).toStrictEqual([])
			expect(result.mirrors).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a dark catalog membership endpoint without writing the target', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const dark = await createUpstreamServer({})
		const base = dark.base
		await dark.destroy()
		try {
			const fleet = createCatalogFleet(workspace)
			const before = readFileHex(fleet.target, CATALOG_AGENT_PATH)
			const sink = createSink()
			expect(
				await new CLI(buildCLIOptions(sink, base)).execute([
					'catalog',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			expect(JSON.parse(sink.output[0] ?? '')).toHaveProperty('error.code', 'FETCH')
			expect(readFileHex(fleet.target, CATALOG_AGENT_PATH)).toBe(before)
		} finally {
			workspace.destroy()
		}
	})
})

describe('CLI audit', () => {
	it('reports a stale planned foreign floor as a non-blocking dependency question', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				{
					field: 'dependencies',
					message:
						'vite declares the floor ~8.2.0, while the registry serves 8.2.2 within major 8.',
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('reports no dependency question for library tools omitted by an app-only workspace', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = workspace.ensure('target')
			const blueprint = createBlueprint('sample', { src: [], app: ['core', 'browser'] })
			workspace.ensure('target/app/core')
			workspace.ensure('target/app/browser')
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					blueprint,
					undefined,
					omitDependencies(
						{
							...TARGET_DEV_DEPENDENCIES,
							...APP_DEV_DEPENDENCIES,
							...APP_BROWSER_DEV_DEPENDENCIES,
						},
						['@microsoft/api-extractor', 'vite-plugin-dts'],
					),
				),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions.filter(({ field }) => field === 'dependencies')).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('reports only the missing shared test tool for an app-only workspace', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = workspace.ensure('target')
			const blueprint = createBlueprint('sample', { src: [], app: ['core', 'browser'] })
			workspace.ensure('target/app/core')
			workspace.ensure('target/app/browser')
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					blueprint,
					undefined,
					omitDependencies(
						{
							...TARGET_DEV_DEPENDENCIES,
							...APP_DEV_DEPENDENCIES,
							...APP_BROWSER_DEV_DEPENDENCIES,
						},
						['@microsoft/api-extractor', '@orkestrel/test', 'vite-plugin-dts'],
					),
				),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions.filter(({ field }) => field === 'dependencies')).toStrictEqual([
				{
					field: 'dependencies',
					// The range quoted back is the planned one, stated here rather than read
					// back from the table the advisory read: a message built from that table
					// reads correctly for whatever the table happens to hold. A floor raise
					// moves this line, which is where a consumer meets the raise.
					message: `The manifest at ${target} does not declare a planned dependency: @orkestrel/test. Add this exact dependency line to dependencies or devDependencies in package.json: "@orkestrel/test": "^0.0.11",`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('reports one missing planned dependency and its exact manifest line', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					undefined,
					undefined,
					omitDependencies(TARGET_DEV_DEPENDENCIES, ['typescript']),
				),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				{
					field: 'dependencies',
					message: `The manifest at ${fleet.target} does not declare a planned dependency: typescript. Add this exact dependency line to dependencies or devDependencies in package.json: "typescript": "^6.0.3",`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('reports every missing planned dependency in stable order', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					undefined,
					{ '@orkestrel/emitter': '^0.0.5' },
					omitDependencies(TARGET_DEV_DEPENDENCIES, ['vitest', 'typescript', 'vite']),
				),
			)
			const sink = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				{
					field: 'dependencies',
					message: `The manifest at ${fleet.target} does not declare planned dependencies: typescript, vite, vitest. Add these exact dependency lines to dependencies or devDependencies in package.json: "typescript": "^6.0.3", "vite": "^8.2.2", "vitest": "^4.1.11",`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a planned foreign dependency range on the served major', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, {
					...TARGET_DEV_DEPENDENCIES,
					typescript: '^6.0.3',
				}),
			)
			const sink = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('reports a stale foreign floor and a crossed major without rewriting', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			'/typescript': {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: '7.0.0' },
					versions: { '6.0.3': {}, '6.0.4': {}, '7.0.0': {} },
				}),
			},
		})
		try {
			const fleet = createFleet(workspace)
			const manifest = buildTargetManifest(undefined, undefined, {
				...TARGET_DEV_DEPENDENCIES,
				typescript: '^6.0.3',
			})
			workspace.write('target/package.json', manifest)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const result: AuditResult = JSON.parse(sink.output[0] ?? '')
			expect(result.provenance).toStrictEqual({ versions: 'live' })
			expect(result.questions).toContainEqual({
				field: 'dependencies',
				message:
					'typescript declares the floor ^6.0.3, while the registry serves 6.0.4 within major 6.',
				blocking: false,
			})
			expect(result.questions).toContainEqual({
				field: 'dependencies',
				message: 'typescript declares major 6, while the registry serves major 7.',
				blocking: false,
			})
			expect(result.releases).toContainEqual({
				name: 'typescript',
				range: '^6.0.3',
				lookup: 'found',
				latest: '6.0.4',
				major: 7,
			})
			expect(server.paths.filter((path) => path === '/typescript')).toHaveLength(1)
			expect(workspace.read('target/package.json')).toBe(manifest)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('reports a major-zero floor below the newest stable release in that major', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		// The scenario needs a stable release above the declared floor within major
		// zero, so the served release derives from the floor the manifest states and
		// the premise survives a floor raise.
		const floor = BASE_DEV_DEPENDENCIES.oxfmt ?? ''
		const minor = Number(floor.split('.')[1] ?? '')
		const served = `0.${minor + 1}.0`
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			'/oxfmt': {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: served },
					versions: { [`0.${minor}.9`]: {}, [served]: {} },
				}),
			},
		})
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const result: AuditResult = JSON.parse(sink.output[0] ?? '')
			expect(result.questions).toContainEqual({
				field: 'dependencies',
				message: `oxfmt declares the floor ${floor}, while the registry serves ${served} within major 0.`,
				blocking: false,
			})
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('ignores dependencies the workspace owns beyond the planned set', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, {
					...TARGET_DEV_DEPENDENCIES,
					leftpad: '^1.0.0',
				}),
			)
			const sink = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a planned tool declared in dependencies instead of devDependencies', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					undefined,
					{ typescript: '~6.4.0' },
					omitDependencies(TARGET_DEV_DEPENDENCIES, ['typescript']),
				),
			)
			const sink = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('reports a non-object devDependencies section instead of crashing', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest(undefined, undefined, 'invalid'))
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				{
					field: 'dependencies',
					message: `The manifest at ${fleet.target} declares devDependencies as a value that is not an object. Replace it with an object before relying on the planned dependency set.`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('scopes a planned-dependency refusal to repair selections', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					undefined,
					undefined,
					omitDependencies(TARGET_DEV_DEPENDENCIES, ['typescript']),
				),
			)
			workspace.write('target/vite.config.ts', 'configuration marker\n')
			const manifest = workspace.read('target/package.json')
			const configuration = workspace.read('target/vite.config.ts')
			const blocked = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...blocked.options }).execute([
					'repair',
					'--groups',
					'tests',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			expect(JSON.parse(blocked.output[0] ?? '')).toHaveProperty('error.code', 'TARGET')
			expect(JSON.parse(blocked.output[0] ?? '')).toHaveProperty(
				'error.message',
				expect.stringContaining('typescript'),
			)
			expect(workspace.read('target/package.json')).toBe(manifest)
			expect(workspace.read('target/vite.config.ts')).toBe(configuration)

			const selected = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...selected.options }).execute([
					'repair',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			expect(JSON.parse(selected.output[0] ?? '')).toMatchObject({
				target: fleet.target,
				written: expect.arrayContaining(['AGENTS.md']),
			})
		} finally {
			workspace.destroy()
		}
	})

	it('filters target questions from audit selections', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					undefined,
					undefined,
					omitDependencies(TARGET_DEV_DEPENDENCIES, ['typescript']),
				),
			)
			const excluded = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...excluded.options }).execute([
				'audit',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const excludedAudit: Audit = JSON.parse(excluded.output[0] ?? '')
			expect(excludedAudit.questions).toStrictEqual([])

			const included = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...included.options }).execute([
				'audit',
				'--groups',
				'tests',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const includedAudit: Audit = JSON.parse(included.output[0] ?? '')
			expect(includedAudit.questions).toStrictEqual([
				{
					field: 'dependencies',
					message: `The manifest at ${fleet.target} does not declare a planned dependency: typescript. Add this exact dependency line to dependencies or devDependencies in package.json: "typescript": "^6.0.3",`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('rejects wrong-case structural paths while deriving every exact fact', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.ensure('target/src/bin')
			workspace.ensure('target/tests')
			workspace.write('target/configs/app/other.config.ts', 'export {}\n')
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--groups',
					'configs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			const absent = workspace.read('target/vite.config.ts')
			expect(absent).not.toContain("label: 'src:bin'")
			expect(absent).not.toContain("label: 'guides'")
			expect(absent).not.toContain("label: 'integration'")
			expect(absent).not.toContain("label: 'conformance'")
			expect(absent).not.toContain("label: 'service'")
			expect(absent).not.toContain('globalSetup:')
			expect(absent).not.toContain('appShowcase')

			workspace.write('target/src/bin/Main.ts', 'export {}\n')
			workspace.write('target/tests/Guides.test.ts', 'export {}\n')
			workspace.write('target/tests/Setup.test.ts', 'export {}\n')
			workspace.write('target/tests/nested/setup.test.ts', 'export {}\n')
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--groups',
					'configs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			expect(workspace.read('target/vite.config.ts')).not.toContain("label: 'src:bin'")
			expect(workspace.read('target/vite.config.ts')).not.toContain("label: 'guides'")
			expect(workspace.read('target/vite.config.ts')).not.toContain("label: 'setup'")
			workspace.remove('target/src/bin/Main.ts')
			workspace.remove('target/tests/Guides.test.ts')
			workspace.remove('target/tests/Setup.test.ts')

			workspace.write('target/src/bin/main.ts', 'export {}\n')
			workspace.write('target/tests/setup.test.ts', 'export {}\n')
			workspace.write('target/tests/guides.test.ts', 'export {}\n')
			workspace.write('target/tests/integration.test.ts', 'export {}\n')
			workspace.write('target/tests/conformance.test.ts', 'export {}\n')
			workspace.write('target/tests/setupService.ts', 'export {}\n')
			workspace.write('target/tests/setupGlobal.ts', 'export {}\n')
			workspace.ensure('target/app/browser')
			workspace.write('target/configs/app/vite.showcase.config.ts', 'export {}\n')
			const blueprint = createBlueprint('sample', {
				src: ['core'],
				app: ['browser'],
				bin: true,
				setup: true,
				guides: true,
				integration: true,
				conformance: true,
				service: true,
				global: true,
				showcase: true,
			})
			workspace.write('target/package.json', buildTargetManifest(blueprint))
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--groups',
					'configs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			const present = workspace.read('target/vite.config.ts')
			expect(present).toContain("label: 'src:bin'")
			expect(present).toContain("label: 'setup'")
			expect(present).toContain("label: 'guides'")
			expect(present).toContain("label: 'integration'")
			expect(present).toContain("label: 'conformance'")
			expect(present).toContain("label: 'service'")
			expect(present).toContain("globalSetup: ['./tests/setupGlobal.ts']")
			expect(present).toContain('appShowcase')
		} finally {
			workspace.destroy()
		}
	})

	// Publishing is what selects the distribution project, and nothing else does.
	// Reading the proof's own presence back off the target was a loop: a target
	// lacking the file was compiled as a workspace that wanted no file, so the
	// artifact could never be written to the targets that needed it.
	it('registers the distribution project for a target that publishes no proof yet', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			expect(workspace.read('target/tests/distribution.test.ts')).toBeUndefined()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--groups',
					'configs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			expect(workspace.read('target/vite.config.ts')).toContain("label: 'distribution'")
		} finally {
			workspace.destroy()
		}
	})

	// The private control. A workspace that packs no published source has nothing
	// for the proof to read, so the project is absent however the target is written.
	it('withholds the distribution project from a target that publishes nothing', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.remove('target/src')
			workspace.ensure('target/app/core')
			const blueprint = createBlueprint('sample', { app: ['core'] })
			workspace.write('target/package.json', buildTargetManifest(blueprint))
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--groups',
					'configs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			expect(workspace.read('target/vite.config.ts')).not.toContain("label: 'distribution'")
			const manifest: unknown = JSON.parse(requireValue(workspace.read('target/package.json')))
			expect(manifest).not.toHaveProperty('scripts.test:distribution')
		} finally {
			workspace.destroy()
		}
	})

	it('reports every unregistered manifest project as one non-blocking question', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest run --project src:core "--project=missing"',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.findings.length).toBeGreaterThan(0)
			expect(audit.questions).toStrictEqual([
				{
					field: 'projects',
					message: `The manifest at ${fleet.target} names a Vitest project the planned configuration does not register: missing. Add the project to vite.config.ts or remove the script that names it.`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest setup project when no root setup proof selects it', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, {
					test: 'npm run test:setup',
					'test:setup':
						'vitest run --config vite.config.ts --no-cache --reporter=dot --project setup',
				}),
			)
			workspace.write('target/vite.config.ts', 'marker\n')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			expect(JSON.parse(sink.output[0] ?? '')).toStrictEqual({
				error: {
					code: 'TARGET',
					message: `The configs group is blocked because the manifest at ${fleet.target} names a Vitest project the planned vite.config.ts does not register: setup. Remove the script that names it before selecting configs, or exclude configs from --groups.`,
				},
			})
			expect(workspace.read('target/vite.config.ts')).toBe('marker\n')
		} finally {
			workspace.destroy()
		}
	})

	it('reports a writable project script missing from the manifest', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = { ...blueprintToScripts(createBlueprint('sample', { src: ['core'] })) }
			delete scripts['test:config']
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toHaveLength(1)
			expect(audit.questions[0]).toMatchObject({ field: 'scripts', blocking: false })
			expect(audit.questions[0]?.message).toContain('test:config')
			expect(audit.questions[0]?.message).toContain(
				'"test:config": "vitest run --config vite.config.ts --no-cache --reporter=dot --project config",',
			)
			const repaired = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...repaired.options }).execute([
					'repair',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--offline',
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			expect(workspace.read('target/package.json')).toContain(
				'"test:config": "vitest run --config vite.config.ts --no-cache --reporter=dot --project config"',
			)
		} finally {
			workspace.destroy()
		}
	})

	it('audits and repairs the writable scripts without moving target-owned manifest bytes', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('html', { src: ['core', 'browser'] })
			workspace.ensure('target/src/browser')
			const scripts: Record<string, string> = {
				...blueprintToScripts(blueprint),
				deploy: 'npm run build && npm publish',
			}
			delete scripts['test:probe']
			delete scripts['test:bench']
			delete scripts.prepack
			const manifest = buildTargetManifest(blueprint, undefined, undefined, scripts)
			workspace.write('target/package.json', manifest)
			const question: Question = {
				field: 'scripts',
				message: `The manifest at ${fleet.target} does not declare planned scripts: test:probe, test:bench, prepack. Add these exact script lines to package.json: "test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe", "test:bench": "vitest bench --config vite.config.ts --no-cache --project probe", "prepack": "npm run build",`,
				blocking: false,
			}

			const before = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...before.options }).execute([
					'audit',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const initial: Audit = JSON.parse(before.output[0] ?? '')
			expect(initial.questions).toStrictEqual([question])

			const repaired = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...repaired.options }).execute([
					'repair',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--offline',
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const outcome: RepairResult = JSON.parse(repaired.output[0] ?? '')
			expect(outcome.audit.questions.filter(({ field }) => field === 'scripts')).toStrictEqual([])
			const written = requireValue(workspace.read('target/package.json'))
			// The qualified pair joins the `test:` family it belongs to. The
			// lifecycle script carries no family, so it closes the section instead.
			const family = [
				',',
				'\t\t"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe",',
				'\t\t"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe"',
			].join('\n')
			const lifecycle = ',\n\t\t"prepack": "npm run build"'
			// Removing only the appended regions recovers every original byte. This
			// covers the custom script's value and the order of every original key.
			expect(written.replace(family, '').replace(lifecycle, '')).toBe(manifest)
			expect(written).toContain('"deploy": "npm run build && npm publish"')

			const after = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...after.options }).execute([
					'audit',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const terminal: Audit = JSON.parse(after.output[0] ?? '')
			expect(terminal.questions.filter(({ field }) => field === 'scripts')).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('appends absent scripts while retaining and reporting a differing html script', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('html', {
				src: ['core', 'browser'],
				guides: true,
			})
			workspace.ensure('target/src/browser')
			workspace.write('target/tests/guides.test.ts', "export const HTML_GUIDE_PROOF = 'html'\n")
			const planned = blueprintToScripts(blueprint)
			const plannedGuides = requireValue(planned['test:guides'])
			const declaredGuides = plannedGuides.replace(' --no-cache', '')
			const scripts: Record<string, string> = {
				...planned,
				'test:guides': declaredGuides,
			}
			delete scripts['test:probe']
			delete scripts['test:bench']
			delete scripts.prepack
			const manifest = buildTargetManifest(blueprint, undefined, undefined, scripts)
			workspace.write('target/package.json', manifest)
			const sink = createSink()

			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--offline',
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const outcome: RepairResult = JSON.parse(sink.output[0] ?? '')
			expect(outcome.audit.questions).toStrictEqual([
				{
					field: 'scripts',
					message: `The manifest at ${fleet.target} declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares ${JSON.stringify(declaredGuides)}; planned ${JSON.stringify(plannedGuides)}.`,
					blocking: false,
				},
			])
			const written = requireValue(workspace.read('target/package.json'))
			expect(written).toContain(
				'"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe"',
			)
			expect(written).toContain(
				'"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe"',
			)
			expect(written).toContain('"prepack": "npm run build"')
			expect(written).toContain(`"test:guides": ${JSON.stringify(declaredGuides)}`)
			expect(written).not.toContain(`"test:guides": ${JSON.stringify(plannedGuides)}`)
		} finally {
			workspace.destroy()
		}
	})

	it('keeps the scripts question when the real projection omits a writable script', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('html', { src: ['core', 'browser'] })
			workspace.ensure('target/src/browser')
			const scripts = { ...blueprintToScripts(blueprint) }
			delete scripts['test:probe']
			delete scripts['test:bench']
			const manifest = buildTargetManifest(blueprint, undefined, undefined, scripts)
			const projection = blueprintToWritableScripts(blueprint).filter(
				(script) => script.name !== 'test:bench',
			)
			const projected = replaceManifestScripts(manifest, projection)
			if (projected === undefined) throw new Error('The script projection was refused')
			workspace.write('target/package.json', projected)
			const sink = createSink()

			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				{
					field: 'scripts',
					message: `The manifest at ${fleet.target} does not declare a planned script: test:bench. Add this exact script line to package.json: "test:bench": "vitest bench --config vite.config.ts --no-cache --project probe",`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('accepts every planned project when each is reachable from a gate', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = blueprintToScripts(createBlueprint('sample', { src: ['core'] }))
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('uses only gates the target manifest can run for project reachability', async () => {
		const privateWorkspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(privateWorkspace)
			const blueprint = createBlueprint('sample', { app: ['core'], service: true })
			privateWorkspace.remove('target/src/core')
			privateWorkspace.ensure('target/app/core')
			privateWorkspace.write('target/tests/setupService.ts', 'export {}\n')
			privateWorkspace.write('target/package.json', blueprintToManifest(blueprint))
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			// Reachability is silent, which is the subject here. The service setup
			// module this fixture needs draws its own advisory, and nothing else does.
			expect(audit.questions.filter((question) => question.field === 'projects')).toStrictEqual([])
			expect(audit.questions).toStrictEqual([
				buildSetupQuestion(fleet.target, 'tests/setupService.ts'),
			])
		} finally {
			privateWorkspace.destroy()
		}

		const publishedWorkspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(publishedWorkspace)
			const blueprint = createBlueprint('sample', { src: ['core'], service: true })
			publishedWorkspace.write('target/tests/setupService.ts', 'export {}\n')
			publishedWorkspace.write('target/package.json', blueprintToManifest(blueprint))
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				buildSetupQuestion(fleet.target, 'tests/setupService.ts'),
			])
		} finally {
			publishedWorkspace.destroy()
		}
	})

	it('reports a private project reached only from a dead publish lifecycle', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('sample', { app: ['core'], service: true })
			const planned = blueprintToScripts(blueprint)
			const test = planned.test
			if (test === undefined) throw new Error('The private workspace carries no test gate')
			const scripts = {
				...planned,
				test: test.replace(' && npm run test:service', ''),
				prepublishOnly: 'npm run test:service',
			}
			const manifest = buildTargetManifest(blueprint, undefined, undefined, scripts).replace(
				'"name": "@orkestrel/sample",',
				'"name": "sample",\n\t"private": true,',
			)
			workspace.remove('target/src/core')
			workspace.ensure('target/app/core')
			workspace.write('target/tests/setupService.ts', 'export {}\n')
			workspace.write('target/package.json', manifest)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toHaveLength(2)
			expect(audit.questions[1]).toStrictEqual(
				buildSetupQuestion(fleet.target, 'tests/setupService.ts'),
			)
			expect(audit.questions[0]).toMatchObject({ field: 'projects', blocking: false })
			expect(audit.questions[0]?.message).toContain(
				'does not reach a Vitest project the planned configuration registers: service. No chain from test invokes it.',
			)
			// The remedy is the half that has to be right. This manifest already
			// declares `test:service`, so prescribing that script line would name a
			// line already present and leave the question firing forever.
			expect(audit.questions[0]?.message).toContain(
				'test:service is already declared, so the gate is missing rather than the script: invoke it by name from the test chain.',
			)
			expect(audit.questions[0]?.message).not.toContain('exact script line')
		} finally {
			workspace.destroy()
		}
	})

	it('separates a missing writable script from its ungated project', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('sample', { app: ['core'], service: true })
			const planned = blueprintToScripts(blueprint)
			const test = planned.test
			if (test === undefined) throw new Error('The private workspace carries no test gate')
			// The opposite state from the case above: the direct script is gone
			// entirely, so the script line is the repair that closes it.
			const scripts: Record<string, string> = {
				...planned,
				test: test.replace(' && npm run test:service', ''),
			}
			delete scripts['test:service']
			const manifest = buildTargetManifest(blueprint, undefined, undefined, scripts).replace(
				'"name": "@orkestrel/sample",',
				'"name": "sample",\n\t"private": true,',
			)
			workspace.remove('target/src/core')
			workspace.ensure('target/app/core')
			workspace.write('target/tests/setupService.ts', 'export {}\n')
			workspace.write('target/package.json', manifest)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toHaveLength(3)
			expect(audit.questions[2]).toStrictEqual(
				buildSetupQuestion(fleet.target, 'tests/setupService.ts'),
			)
			expect(audit.questions[0]).toMatchObject({ field: 'scripts', blocking: false })
			expect(audit.questions[0]?.message).toContain('this exact script line to package.json:')
			expect(audit.questions[0]?.message).toContain('"test:service":')
			expect(audit.questions[1]).toMatchObject({ field: 'projects', blocking: false })
			// The projected region would declare the script, but the manifest the
			// developer is reading does not. The advisory states the manifest's own
			// state, so it never contradicts the `scripts` question beside it.
			expect(audit.questions[1]?.message).toContain(
				'test:service is not declared, so the script is missing as well as the gate: declare it and invoke it by name from the test chain.',
			)
			expect(audit.questions[1]?.message).not.toContain('already declared')
		} finally {
			workspace.destroy()
		}
	})

	it('states an undeclared script as missing when the write is blocked', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			// The proof selects the planned `setup` project. The manifest predates it,
			// so it declares neither `test:setup` nor a chain that reaches the project.
			workspace.write('target/tests/setup.test.ts', 'export {}\n')
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					undefined,
					undefined,
					undefined,
					blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const refusal: { readonly error: { readonly code: string; readonly message: string } } =
				JSON.parse(sink.output[0] ?? '')
			expect(refusal.error.code).toBe('TARGET')
			expect(refusal.error.message).toContain('The configs group is blocked because')
			expect(refusal.error.message).toContain(
				'test:setup is not declared, so the script is missing as well as the gate: declare it and invoke it by name from the test or prepublishOnly chain.',
			)
			expect(refusal.error.message).not.toContain('already declared')
		} finally {
			workspace.destroy()
		}
	})

	it('accepts an integration project reached by the default test chain', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/tests/integration.test.ts', 'export {}\n')
			const scripts = blueprintToScripts(
				createBlueprint('sample', { src: ['core'], integration: true }),
			)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					createBlueprint('sample', { src: ['core'], integration: true }),
					undefined,
					undefined,
					scripts,
				),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			// The target publishes one environment, so the seed this flag registers has
			// nothing to compose across. The gate says so, and the audit still reports
			// drift rather than refusing: the advisory rides the comparison without
			// reaching the exit code.
			expect(audit.questions).toStrictEqual([
				{
					field: 'integration',
					message:
						'integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.',
					blocking: false,
				},
			])
			expect(scripts.test).toContain('npm run test:integration')
			expect(scripts.prepublishOnly).not.toContain('npm run test:integration')
		} finally {
			workspace.destroy()
		}
	})

	// The refusal these scripts used to draw is what kept a workspace driving a
	// live service or measuring official tooling out of every writing verb. Each
	// direction is measured: the script alone still draws the question, and the
	// structural file beside it clears the same script.
	it('accepts the conformance and live-service scripts after their structural file is there', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.ensure('target/tests')
			const scripts = blueprintToScripts(
				createBlueprint('sample', { src: ['core'], conformance: true, service: true }),
			)
			workspace.write(
				'target/package.json',
				buildTargetManifest(
					createBlueprint('sample', { src: ['core'], conformance: true, service: true }),
					undefined,
					undefined,
					scripts,
				),
			)
			const refused = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...refused.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const before: Audit = JSON.parse(refused.output[0] ?? '')
			// Before the structural files exist the derived blueprint plans the base
			// chain, so the declared service-bearing prepublishOnly reports as differing.
			expect(before.questions).toStrictEqual([
				{
					field: 'scripts',
					message: `The manifest at ${fleet.target} declares a planned script with a differing value: prepublishOnly. Keep the declared value unchanged or replace it with the planned value: ${JSON.stringify('prepublishOnly')} declares ${JSON.stringify(scripts.prepublishOnly)}; planned ${JSON.stringify(blueprintToScripts(createBlueprint('sample', { src: ['core'] })).prepublishOnly)}.`,
					blocking: false,
				},
				{
					field: 'projects',
					message: `The manifest at ${fleet.target} names Vitest projects the planned configuration does not register: conformance, service. Add each project to vite.config.ts or remove the scripts that name them.`,
					blocking: false,
				},
			])

			workspace.write('target/tests/conformance.test.ts', 'export {}\n')
			workspace.write('target/tests/setupService.ts', 'export {}\n')
			const accepted = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...accepted.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const after: Audit = JSON.parse(accepted.output[0] ?? '')
			expect(after.questions).toStrictEqual([
				buildSetupQuestion(fleet.target, 'tests/setupService.ts'),
			])
		} finally {
			workspace.destroy()
		}
	})

	// The seed and the filled module are the two sides of this question. Scaffold
	// materializes `tests/setup.ts` and `tests/setupServer.ts` empty and vendors
	// `tests/setupPolicy.ts` with real bytes, so an advisory that fired on either
	// would fire in every workspace and name nothing a maintainer can act on.
	// Both readings are taken against one fresh workspace, so the module's bytes
	// are the only thing that moved between them, and the exit code answers for
	// the advisory being non-blocking.
	it('reports a setup module a maintainer filled and stays silent on the ones scaffold wrote', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'new',
					'widget',
					'--src',
					'core,server',
					'--from',
					fleet.host,
					'--target',
					fresh,
				]),
			).toBe(EXIT_CLEAN)
			expect(workspace.read('fresh/tests/setup.ts')).toBe('')
			expect(workspace.read('fresh/tests/setupServer.ts')).toBe('')
			expect(requireValue(workspace.read('fresh/tests/setupPolicy.ts')).trim()).not.toBe('')
			const seeded = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...seeded.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fresh,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const before: Audit = JSON.parse(seeded.output[0] ?? '')
			expect(before.questions).toStrictEqual([])

			workspace.write('fresh/tests/setup.ts', FILLED_SETUP_TEXT)
			const filled = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...filled.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fresh,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const after: Audit = JSON.parse(filled.output[0] ?? '')
			expect(after.questions).toStrictEqual([buildSetupQuestion(fresh, 'tests/setup.ts')])
		} finally {
			workspace.destroy()
		}
	})

	it('names every filled setup module no proof covers', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			workspace.write('target/tests/setup.ts', FILLED_SETUP_TEXT)
			workspace.write('target/tests/setupServer.ts', FILLED_SETUP_TEXT)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				{
					field: 'setup',
					message: `The target at ${fleet.target} carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	// The question reads text, so it reaches a filled module that exports
	// nothing. Its remedy has to stay inside what that reading knows: asking this
	// maintainer for a proof of exported behavior leaves them a permanent advisory
	// or a proof asserting nothing, and the message is what has to be actionable
	// for the whole population the predicate admits rather than for part of it.
	it('asks a hook-only setup module for coverage rather than for a proof of its exports', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			workspace.write('target/tests/setup.ts', HOOK_SETUP_TEXT)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([buildSetupQuestion(fleet.target, 'tests/setup.ts')])
			// Stated as the property as well as the literal, because a wording change
			// moves the literal and this assertion together only if it is deliberate.
			// Scanning scaffold's own message is not the source-language scan the
			// predicate refuses: the subject here is the sentence, not a module.
			expect(requireValue(audit.questions[0]).message).not.toContain('export')
		} finally {
			workspace.destroy()
		}
	})

	// A target that predates the canon split still carries the copies scaffold once
	// vendored. The release stages those paths for reading now, so a copy of one
	// sitting in a target is a file the plan does not own, and the audit reports it
	// the way it reports any other: as drift a verb can act on.
	it('reports each superseded canon copy as a foreign finding in its own group', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createCatalogFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			workspace.write('target/.agents/orchestration.md', '# Orchestration\n')
			workspace.write('target/.claude/rules/names.md', '# Names\n')
			workspace.write('target/.claude/agents/planner.md', '# Planner\n')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			const foreign = audit.findings.filter((finding) => finding.drift === 'foreign')
			expect(foreign.map((finding) => finding.path).toSorted()).toStrictEqual([
				'.agents/orchestration.md',
				'.claude/agents/planner.md',
				'.claude/rules/names.md',
			])
			expect(foreign.every((finding) => finding.group === 'orchestration')).toBe(true)
			// The catalog file sits beneath the same canon directory as the role file
			// beside it, and the plan claims it, so it is compared rather than found. A
			// run that deleted it would delete what the next repair restores.
			expect(audit.findings.find((finding) => finding.path === CATALOG_AGENT_PATH)?.drift).toBe(
				'aligned',
			)
			// The advisory this reading replaced is gone, and nothing raises its field.
			expect(audit.questions.map(({ field }) => field)).not.toContain('canon')
		} finally {
			workspace.destroy()
		}
	})

	it('reads no canon path outside the groups the run selects', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			workspace.write('target/.claude/rules/names.md', '# Names\n')
			const scoped = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...scoped.options }).execute([
					'audit',
					'--groups',
					'tests',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const narrow: Audit = JSON.parse(scoped.output[0] ?? '')
			expect(narrow.findings.some((finding) => finding.drift === 'foreign')).toBe(false)
			// The control: the same leftover in the same target, read by a run whose
			// selection admits its group. A silent scoped audit is the selection rather
			// than a reading that never fires.
			const whole = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...whole.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const wide: Audit = JSON.parse(whole.output[0] ?? '')
			expect(
				wide.findings
					.filter((finding) => finding.drift === 'foreign')
					.map((finding) => finding.path),
			).toStrictEqual(['.claude/rules/names.md'])
		} finally {
			workspace.destroy()
		}
	})

	// The verb split, at the one path where it is easy to lose: `repair` restores
	// what the plan claims and removes nothing, so a superseded copy survives it and
	// is still reported. Deleting is `overwrite`'s half alone.
	it('deletes no superseded canon copy on a repair and reports it afterwards', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			workspace.write('target/.claude/rules/names.md', '# Names\n')
			const repaired = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...repaired.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const result: RepairResult = JSON.parse(repaired.output[0] ?? '')
			expect(result.removed).toStrictEqual([])
			expect(
				result.audit.findings
					.filter((finding) => finding.drift === 'foreign')
					.map((finding) => finding.path),
			).toStrictEqual(['.claude/rules/names.md'])
			expect(workspace.read('target/.claude/rules/names.md')).toBe('# Names\n')
			// The control: the paths the same run did restore, which is what separates
			// "removes nothing" from "wrote nothing at all".
			expect(result.written).toContain('AGENTS.md')
		} finally {
			workspace.destroy()
		}
	})

	// Scaffold seeds `tests/setupGlobal.ts` with a `setup` function body rather
	// than with nothing, so a module carrying those exact bytes is a module a
	// maintainer has not written into. The seed is read from the template the
	// materializer writes, so the reading follows the seed if the seed moves.
	it('stays silent on a global setup module carrying the bytes scaffold seeds', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			workspace.write('target/tests/setupGlobal.ts', ARTIFACT_TEMPLATES.tests.global)
			const seeded = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...seeded.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const before: Audit = JSON.parse(seeded.output[0] ?? '')
			expect(before.questions).toStrictEqual([])

			workspace.write(
				'target/tests/setupGlobal.ts',
				`${ARTIFACT_TEMPLATES.tests.global}${FILLED_SETUP_TEXT}`,
			)
			const filled = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...filled.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const after: Audit = JSON.parse(filled.output[0] ?? '')
			expect(after.questions).toStrictEqual([
				buildSetupQuestion(fleet.target, 'tests/setupGlobal.ts'),
			])
		} finally {
			workspace.destroy()
		}
	})

	// A proof retires the module it is named for and no other. The maintainer who
	// follows the advice writes one of the proofs it names, and the question has
	// to keep naming what is still uncovered instead of going quiet on the rest.
	it('keeps naming the setup modules the written proof does not cover', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('sample', { src: ['core'], setup: true })
			workspace.write(
				'target/package.json',
				buildTargetManifest(blueprint, undefined, undefined, blueprintToScripts(blueprint)),
			)
			workspace.write('target/tests/setup.ts', FILLED_SETUP_TEXT)
			workspace.write('target/tests/setupServer.ts', FILLED_SETUP_TEXT)
			workspace.write('target/tests/setup.test.ts', 'export {}\n')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([
				buildSetupQuestion(fleet.target, 'tests/setupServer.ts'),
			])
		} finally {
			workspace.destroy()
		}
	})

	it('stops reporting a filled setup module once a proof covers it', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const blueprint = createBlueprint('sample', { src: ['core'], setup: true })
			workspace.write(
				'target/package.json',
				buildTargetManifest(blueprint, undefined, undefined, blueprintToScripts(blueprint)),
			)
			workspace.write('target/tests/setup.ts', FILLED_SETUP_TEXT)
			workspace.write('target/tests/setup.test.ts', 'export {}\n')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.questions).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('prints findings and an unregistered-project question in the human report', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest run --project=missing --project "absent"',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.output.join('\n')).toContain('AGENTS.md')
			expect(sink.diagnostic).toStrictEqual([
				`projects: The manifest at ${fleet.target} names Vitest projects the planned configuration does not register: absent, missing. Add each project to vite.config.ts or remove the scripts that name them.`,
			])
		} finally {
			workspace.destroy()
		}
	})

	it('does not let a non-blocking project question make an aligned audit drift', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const created = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...created.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest run --project missing',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			const json = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...json.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const audit: Audit = JSON.parse(json.output[0] ?? '')
			const planned = audit.findings.filter((finding) => finding.drift !== 'foreign')
			const drifted = planned.filter((finding) => finding.drift !== 'aligned')
			const bytes = planned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const existence = planned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const nothing = planned.filter((finding) => finding.ownership === 'birth')
			// The membership the counts are drawn from: every finding names a
			// tier, every tier is named, and none is proven by an empty population.
			expect([...new Set(audit.findings.map((finding) => finding.ownership))].sort()).toStrictEqual(
				['birth', 'content', 'presence'],
			)
			expect(bytes.length + existence.length + nothing.length).toBe(planned.length)
			expect(sink.output.at(-1)).toBe(
				`${String(drifted.length)} of ${String(planned.length)} planned paths drifted from the plan. Audit compared bytes at ${String(bytes.length)}, existence at ${String(existence.length)}, and nothing at ${String(nothing.length)}.`,
			)
			expect(sink.diagnostic).toHaveLength(1)
		} finally {
			workspace.destroy()
		}
	})

	it('reports drift against a target that carries none of its planned paths', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.output.join('\n')).toContain('AGENTS.md')
			expect(sink.output.at(-1) ?? '').toContain(`of ${String(FLEET_ARTIFACT_COUNT)} planned`)
		} finally {
			workspace.destroy()
		}
	})

	it('reports one aligned manifest path with one noun inflection', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('fresh')
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'new',
					'sample',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--groups',
					'manifest',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			const json = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...json.options }).execute([
					'audit',
					'--groups',
					'manifest',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const audit: Audit = JSON.parse(json.output[0] ?? '')
			const planned = audit.findings.filter((finding) => finding.drift !== 'foreign')
			const bytes = planned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const existence = planned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const nothing = planned.filter((finding) => finding.ownership === 'birth')
			expect(bytes.length + existence.length + nothing.length).toBe(planned.length)
			expect(bytes).toStrictEqual([])
			expect(existence).toStrictEqual([])
			expect(nothing).toStrictEqual(planned)
			expect(sink.output.at(-1)).toBe(
				'0 of 1 planned path drifted from the plan. Audit compared bytes at 0, existence at 0, and nothing at 1.',
			)
		} finally {
			workspace.destroy()
		}
	})

	it('emits one audit as the machine-readable value, every finding on a hydrated path', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.output).toHaveLength(1)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.findings).toHaveLength(FLEET_ARTIFACT_COUNT)
			expect(audit.findings.some((finding) => finding.drift === 'missing')).toBe(true)
			// Every finding sits on a file the host stores, which is the comparison a
			// repair is about to make. The one path the plan claims inside the canon is
			// reported at that file, and the directory holding it is not a planned path.
			expect(audit.findings.some((finding) => finding.path === CATALOG_AGENT_PATH)).toBe(true)
			expect(audit.findings.some((finding) => finding.path === '.claude/agents')).toBe(false)
			expect(audit.questions).toStrictEqual([
				{
					field: 'dependencies',
					message:
						'vite declares the floor ~8.2.0, while the registry serves 8.2.2 within major 8.',
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('reports the grounds that decided every verdict in a vacant target', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('target')
			workspace.write('target/package.json', TARGET_MANIFEST_TEXT)
			workspace.ensure('target/src/core')
			const report = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...report.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_DRIFT)
			const json = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...json.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(json.output[0] ?? '')
			const planned = audit.findings.filter((finding) => finding.drift !== 'foreign')
			const drifted = planned.filter((finding) => finding.drift !== 'aligned')
			const bytes = planned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const existence = planned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const nothing = planned.filter((finding) => finding.ownership === 'birth')
			// The membership the counts are drawn from: every finding names a
			// tier, every tier is named, and none is proven by an empty population.
			expect([...new Set(audit.findings.map((finding) => finding.ownership))].sort()).toStrictEqual(
				['birth', 'content', 'presence'],
			)
			expect(bytes).toStrictEqual([])
			expect(existence.length).toBeGreaterThan(planned.length / 2)
			expect(nothing.length).toBeGreaterThan(0)
			expect(bytes.length + existence.length + nothing.length).toBe(planned.length)
			expect(
				planned.every(
					(finding) =>
						bytes.includes(finding) || existence.includes(finding) || nothing.includes(finding),
				),
			).toBe(true)
			expect(report.output.at(-1)).toBe(
				`${String(drifted.length)} of ${String(planned.length)} planned paths drifted from the plan. Audit compared bytes at ${String(bytes.length)}, existence at ${String(existence.length)}, and nothing at ${String(nothing.length)}.`,
			)
		} finally {
			workspace.destroy()
		}
	})

	it('counts a foreign path apart from the planned paths it reports on', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			workspace.write('target/.claude/agents/stray.md', 'stray\n')
			const report = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...report.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_DRIFT)
			const json = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...json.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(json.output[0] ?? '')
			const planned = audit.findings.filter((finding) => finding.drift !== 'foreign')
			const drifted = planned.filter((finding) => finding.drift !== 'aligned')
			const bytes = planned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const existence = planned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const nothing = planned.filter((finding) => finding.ownership === 'birth')
			const foreign = audit.findings.filter((finding) => finding.drift === 'foreign')
			// The populations by membership rather than by arithmetic: the
			// findings carrying no tier are exactly the foreign ones, and every
			// remaining finding names one of the tiers the counts are drawn from.
			expect(
				audit.findings
					.filter((finding) => finding.ownership === undefined)
					.map((finding) => finding.path),
			).toStrictEqual(['.claude/agents/stray.md'])
			expect([...new Set(planned.map((finding) => finding.ownership))].sort()).toStrictEqual([
				'birth',
				'content',
				'presence',
			])
			expect(planned).toHaveLength(FLEET_ARTIFACT_COUNT)
			expect(bytes.length + existence.length + nothing.length).toBe(planned.length)
			expect(report.output.at(-1)).toBe(
				`${String(drifted.length)} of ${String(planned.length)} planned paths drifted from the plan. Audit compared bytes at ${String(bytes.length)}, existence at ${String(existence.length)}, and nothing at ${String(nothing.length)}. The plan does not own ${String(foreign.length)} further path beneath its groups.`,
			)
			workspace.write('target/.codex/agents/stray.md', 'stray\n')
			const second = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...second.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_DRIFT)
			expect(second.output.at(-1) ?? '').toContain(
				'The plan does not own 2 further paths beneath its groups.',
			)
		} finally {
			workspace.destroy()
		}
	})

	it('agrees with itself about one differing path, count and verb alike', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			workspace.remove('target/.editorconfig')
			const report = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...report.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--groups',
					'configs',
				]),
			).toBe(EXIT_DRIFT)
			const json = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...json.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--groups',
					'configs',
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(json.output[0] ?? '')
			const planned = audit.findings.filter((finding) => finding.drift !== 'foreign')
			const drifted = planned.filter((finding) => finding.drift !== 'aligned')
			const bytes = planned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const existence = planned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const nothing = planned.filter((finding) => finding.ownership === 'birth')
			expect(
				audit.findings
					.filter((finding) => finding.drift !== 'aligned')
					.map((finding) => finding.path),
			).toStrictEqual(['.editorconfig'])
			expect([...new Set(audit.findings.map((finding) => finding.ownership))]).toStrictEqual([
				'content',
				'presence',
			])
			expect(
				planned
					.filter((finding) => finding.ownership === 'presence')
					.map((finding) => finding.path),
			).toStrictEqual(['.gitignore'])
			expect(bytes.length + existence.length + nothing.length).toBe(planned.length)
			expect(report.output.at(-1)).toBe(
				`${String(drifted.length)} of ${String(planned.length)} planned paths drifted from the plan. Audit compared bytes at ${String(bytes.length)}, existence at ${String(existence.length)}, and nothing at ${String(nothing.length)}.`,
			)
		} finally {
			workspace.destroy()
		}
	})

	it('moves deleted content paths from bytes to existence', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('fresh')
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'new',
					'sample',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			const repaired = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...repaired.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			const repairedJSON = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...repairedJSON.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const repairedAudit: Audit = JSON.parse(repairedJSON.output[0] ?? '')
			const repairedPlanned = repairedAudit.findings.filter(
				(finding) => finding.drift !== 'foreign',
			)
			const repairedDrifted = repairedPlanned.filter((finding) => finding.drift !== 'aligned')
			const repairedBytes = repairedPlanned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const repairedExistence = repairedPlanned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const repairedNothing = repairedPlanned.filter((finding) => finding.ownership === 'birth')
			expect(repairedBytes.length).toBeGreaterThan(0)
			expect(repairedExistence.length).toBeGreaterThan(0)
			expect(repairedBytes.length).toBeGreaterThan(repairedExistence.length)
			expect(repairedNothing.length).toBeGreaterThan(0)
			expect(repairedBytes.length + repairedExistence.length + repairedNothing.length).toBe(
				repairedPlanned.length,
			)
			expect(
				repairedPlanned.every(
					(finding) =>
						repairedBytes.includes(finding) ||
						repairedExistence.includes(finding) ||
						repairedNothing.includes(finding),
				),
			).toBe(true)
			expect(repaired.output.at(-1)).toBe(
				`${String(repairedDrifted.length)} of ${String(repairedPlanned.length)} planned paths drifted from the plan. Audit compared bytes at ${String(repairedBytes.length)}, existence at ${String(repairedExistence.length)}, and nothing at ${String(repairedNothing.length)}.`,
			)

			const deleted = repairedBytes
				.filter((finding) => finding.group === 'orchestration')
				.map((finding) => finding.path)
			expect(deleted.length).toBeGreaterThan(1)
			for (const path of deleted) workspace.remove(`fresh/${path}`)
			const report = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...report.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_DRIFT)
			const deletedJSON = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...deletedJSON.options }).execute([
					'audit',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const deletedAudit: Audit = JSON.parse(deletedJSON.output[0] ?? '')
			const deletedPlanned = deletedAudit.findings.filter((finding) => finding.drift !== 'foreign')
			const deletedDrifted = deletedPlanned.filter((finding) => finding.drift !== 'aligned')
			const deletedBytes = deletedPlanned.filter(
				(finding) => finding.ownership === 'content' && finding.observed !== undefined,
			)
			const deletedExistence = deletedPlanned.filter(
				(finding) =>
					finding.ownership === 'presence' ||
					(finding.ownership === 'content' && finding.drift === 'missing'),
			)
			const deletedNothing = deletedPlanned.filter((finding) => finding.ownership === 'birth')
			expect(deletedBytes.length + deletedExistence.length + deletedNothing.length).toBe(
				deletedPlanned.length,
			)
			expect(
				deletedPlanned.every(
					(finding) =>
						deletedBytes.includes(finding) ||
						deletedExistence.includes(finding) ||
						deletedNothing.includes(finding),
				),
			).toBe(true)
			expect(report.output.at(-1)).toBe(
				`${String(deletedDrifted.length)} of ${String(deletedPlanned.length)} planned paths drifted from the plan. Audit compared bytes at ${String(deletedBytes.length)}, existence at ${String(deletedExistence.length)}, and nothing at ${String(deletedNothing.length)}.`,
			)

			const removed = new Set(deleted)
			expect(deletedBytes.filter((finding) => removed.has(finding.path))).toStrictEqual([])
			expect(
				deletedExistence
					.filter((finding) => removed.has(finding.path))
					.map((finding) => finding.path)
					.sort(),
			).toStrictEqual([...deleted].sort())
			expect(deletedBytes.length).toBe(repairedBytes.length - deleted.length)
			expect(deletedExistence.length).toBe(repairedExistence.length + deleted.length)
			expect(deletedNothing.map((finding) => finding.path)).toStrictEqual(
				repairedNothing.map((finding) => finding.path),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a clean run against the workspace new just wrote, and writes nothing itself', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			workspace.ensure('fresh/src/core')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(sink.output.at(-1) ?? '').toContain(`0 of ${String(FLEET_ARTIFACT_COUNT)}`)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a canon file a consumer edited as stale, and the same file as aligned before the edit', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			const before = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...before.options }).execute([
					'audit',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const aligned: Audit = JSON.parse(before.output[0] ?? '')
			expect(aligned.findings.find((finding) => finding.path === 'AGENTS.md')?.drift).toBe(
				'aligned',
			)
			workspace.write('target/AGENTS.md', 'A line a consumer added.\n')
			const after = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...after.options }).execute([
					'audit',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const drifted: Audit = JSON.parse(after.output[0] ?? '')
			expect(drifted.findings.find((finding) => finding.path === 'AGENTS.md')?.drift).toBe('stale')
		} finally {
			workspace.destroy()
		}
	})

	it('reads the audit host --from names, so one target answers differently against two hosts', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const other = createHostRoot(workspace, 'other', buildFleetManifest())
			workspace.write('other/LICENSE', 'A licence the other host ships.\n')
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			const matched = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...matched.options }).execute([
					'audit',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			const differing = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...differing.options }).execute([
					'audit',
					'--groups',
					'docs',
					'--from',
					other,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(differing.output[0] ?? '')
			expect(audit.findings.find((finding) => finding.path === 'LICENSE')?.drift).toBe('stale')
		} finally {
			workspace.destroy()
		}
	})

	it('reports a file the plan does not own beneath an owned vendored root, and no file at the target root', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			workspace.write('target/.cursor/rules/stray.md', '# A rule nobody planned\n')
			workspace.write('target/NOTES.md', '# Notes a consumer keeps\n')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(
				audit.findings.filter((finding) => finding.drift === 'foreign').map(({ path }) => path),
			).toStrictEqual(['.cursor/rules/stray.md'])
			// The control, drawn from outside the population the finding covers: a
			// root file the selection's own group would admit, which the owned-root
			// bound excludes. Widening the bound to the group would make a
			// consumer's own notes a deletion candidate.
			expect(audit.findings.some((finding) => finding.path === 'NOTES.md')).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a target that carries no manifest to read itself out of', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const bare = workspace.ensure('bare')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'audit',
					'--target',
					bare,
				]),
			).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses to read a target through a vendored host whose manifest does not verify', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const broken = createHostRoot(workspace, 'broken', buildHostManifest())
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				broken,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(JSON.parse(sink.output[0] ?? '')).toHaveProperty('error.code', 'TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('reports the questions that closed the gate and nothing about the target', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const refused = workspace.ensure('refused')
			workspace.write('refused/package.json', REFUSED_MANIFEST_TEXT)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				refused,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(sink.output[0] ?? '')
			expect(audit.findings).toStrictEqual([])
			expect(audit.questions.some((question) => question.blocking)).toBe(true)
			const report = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...report.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					refused,
				]),
			).toBe(EXIT_DRIFT)
			expect(report.output[report.output.length - 1]).toBe(
				'Audit did not compare the target because the blueprint was refused.',
			)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a clean run over the one group the workspace owns its own bytes of', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'audit',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--groups',
				'manifest',
			])
			expect(code).toBe(EXIT_CLEAN)
		} finally {
			workspace.destroy()
		}
	})
})

describe('CLI repair', () => {
	it('raises a major-zero floor to the newest stable release in its declared major', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			'/oxfmt': {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: '0.65.0' },
					versions: { '0.64.9': {}, '0.65.0': {} },
				}),
			},
		})
		try {
			const fleet = createFleet(workspace)
			workspace.write('target/package.json', buildTargetManifest())
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(workspace.read('target/package.json')).toContain('"oxfmt": "^0.65.0"')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('reconciles the declared ranges whatever group selection the run names', async () => {
		// A release above every declared pin, so the rewrite stays visible whatever
		// the fleet pins today and a version bump moves no literal here.
		const published = '9.9.9'
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			[FLEET_UPSTREAM_PATHS.packages.scaffold]: { status: 200, body: buildPackument(published) },
		})
		try {
			const fleet = createFleet(workspace)
			// The proof selects the planned `setup` project, so this run has a script
			// to write as well as a range to reconcile.
			workspace.write('target/tests/setup.test.ts', 'export {}\n')
			workspace.write('target/package.json', buildTargetManifest())
			const before = requireValue(workspace.read('target/package.json'))
			const sink = createSink()

			expect(before).not.toContain('"test:setup"')
			expect(before).not.toContain(`"@orkestrel/scaffold": "^${published}"`)
			expect(
				await new CLI(buildCLIOptions(sink, server.base)).execute([
					'repair',
					'--groups',
					'manifest',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const after = requireValue(workspace.read('target/package.json'))
			const keys = Object.keys(JSON.parse(after).scripts)

			// `package.json` is birth-owned, so no group selection carries it into the
			// plan. The range and the script regions share the manifest write on every repair,
			// whatever the selection names, and a caller scoping a run to the manifest
			// for its script takes the reconciled ranges with it.
			expect(after).toContain(`"@orkestrel/scaffold": "^${published}"`)
			expect(keys).toContain('test:setup')
			expect(keys.indexOf('test:setup')).toBe(keys.indexOf('test:distribution') + 1)

			// The other direction of the same ruling: a selection naming no manifest
			// group reconciles the ranges too, because the selection never reached them.
			workspace.write(
				'target/package.json',
				after.replace(`"@orkestrel/scaffold": "^${published}"`, '"@orkestrel/scaffold": "^0.0.1"'),
			)
			const scoped = createSink()
			await new CLI(buildCLIOptions(scoped, server.base)).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(requireValue(workspace.read('target/package.json'))).toContain(
				`"@orkestrel/scaffold": "^${published}"`,
			)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('writes the publishing rows a target scaffolded before them is missing', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer(FLEET_RELEASE_REPLIES)
		try {
			const fleet = createFleet(workspace)
			const previous = buildTargetManifest()
				.replaceAll(/\t\t"prepack": .*\n/gu, '')
				.replaceAll(/\t\t"test:distribution": .*\n/gu, '')
				.replace(` && ${RELEASE_PROOF_COMMAND}`, '')
			workspace.write('target/package.json', previous)
			const sink = createSink()

			expect(previous).not.toContain('prepack')
			expect(previous).not.toContain('test:distribution')
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])

			// The advisory that used to stop this verb is what the write closes: a
			// target receiving the generated proof needs no hand edit to reach it.
			expect(code).toBe(EXIT_CLEAN)
			const written = workspace.read('target/package.json')
			expect(written).toContain('"prepack": "npm run build"')
			expect(written).toContain(
				'"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"',
			)
			expect(written).toContain(RELEASE_PROOF_COMMAND)
			expect(written).toContain('"description": "A sample workspace."')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('repairs other paths while a customized script region stays reported', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			// The customization keeps the release proof so the projected manifest still
			// gates the distribution project: a customization that removed the gate
			// would block the verb at the planned-project boundary instead.
			const customized = buildTargetManifest()
				.replaceAll(/\t\t"test:distribution": .*\n/gu, '')
				.replace(` && ${RELEASE_PROOF_COMMAND}`, ` && ${RELEASE_PROOF_COMMAND} && npm run verify`)
			workspace.write('target/package.json', customized)
			workspace.write('target/vite.config.ts', 'marker\n')
			const sink = createSink()

			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const outcome: RepairResult = JSON.parse(sink.output[0] ?? '')
			expect(outcome.audit.questions).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						field: 'scripts',
						blocking: false,
						message: expect.stringContaining('prepublishOnly'),
					}),
				]),
			)
			// The differing release-proof command stays byte-identical while the absent
			// distribution script appends and the other planned regions repair.
			const written = workspace.read('target/package.json') ?? ''
			expect(written).toContain(
				'"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"',
			)
			expect(written).toContain(
				'"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release && npm run verify"',
			)
			expect(written).toContain('"vite": "^8.2.2"')
			expect(workspace.read('target/vite.config.ts')).not.toBe('marker\n')

			const audited = createSink()
			// A non-blocking question rides a complete result without drifting the exit,
			// so the standing scripts advisory reports inside a clean audit.
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...audited.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const reported: unknown = JSON.parse(audited.output[0] ?? '')
			expect(reported).toHaveProperty(
				'questions',
				expect.arrayContaining([expect.objectContaining({ field: 'scripts', blocking: false })]),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses repair when a manifest script names an unregistered project', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest run "--project=missing"',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			workspace.write('target/vite.config.ts', 'marker\n')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const refusal: unknown = JSON.parse(sink.output[0] ?? '')
			expect(refusal).toHaveProperty('error.code', 'TARGET')
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('missing'))
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('Remove the script'))
			expect(refusal).toHaveProperty(
				'error.message',
				expect.not.stringContaining('Add the project to vite.config.ts'),
			)
			expect(workspace.read('target/vite.config.ts')).toBe('marker\n')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an unresolved quoted project expression before writing', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest run "--project=$ROGUE"',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			workspace.write('target/vite.config.ts', 'marker\n')
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const refusal: unknown = JSON.parse(sink.output[0] ?? '')
			expect(refusal).toHaveProperty('error.code', 'TARGET')
			expect(refusal).toHaveProperty(
				'error.message',
				expect.stringContaining('cannot be resolved statically'),
			)
			expect(workspace.read('target/vite.config.ts')).toBe('marker\n')

			const audited = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...audited.options }).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const audit: Audit = JSON.parse(audited.output[0] ?? '')
			expect(audit.questions).toHaveLength(1)
			expect(audit.questions[0]?.message).toContain('cannot be resolved statically')
		} finally {
			workspace.destroy()
		}
	})

	it('gives a writing refusal only remedies that survive the verb', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest --project missing',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const refusal: unknown = JSON.parse(sink.output[0] ?? '')
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('configs group'))
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('exclude configs'))
			expect(refusal).toHaveProperty(
				'error.message',
				expect.not.stringContaining('Add the project to vite.config.ts'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('writes each planned path the target is missing, over a group of vendored files', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(workspace.read('target/AGENTS.md')).toContain('AGENTS.md')
			expect(sink.output.at(-1) ?? '').toContain('written')
		} finally {
			workspace.destroy()
		}
	})

	it('emits the write and the audit taken after it as one value', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(sink.output).toHaveLength(1)
			const result: RepairResult = JSON.parse(sink.output[0] ?? '')
			expect(result.written.length).toBeGreaterThan(0)
			expect(result.audit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
			expect(result.provenance).toStrictEqual({ versions: 'live' })
		} finally {
			workspace.destroy()
		}
	})

	it('leaves a repaired group clean on the second run, writing nothing the second time', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			for (const group of GROUPS) {
				await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
					'repair',
					'--groups',
					group,
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				])
				const sink = createSink()
				const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--groups',
					group,
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				])
				expect(code).toBe(EXIT_CLEAN)
				const result: RepairResult = JSON.parse(sink.output[0] ?? '')
				expect(result.written).toStrictEqual([])
			}
		} finally {
			workspace.destroy()
		}
	})

	it('restores a vendored file the target lost, and reports it as written', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			workspace.remove('target/AGENTS.md')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: RepairResult = JSON.parse(sink.output[0] ?? '')
			expect(result.written).toContain('AGENTS.md')
			expect(workspace.read('target/AGENTS.md')).toBe(ARTIFACT_TEMPLATES.docs.agents)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a stale content-owned file as replaced with its line delta', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			// The delta is derived from the planned bytes rather than written down, so
			// a wording change in the pointer moves the expectation with it.
			const consumer = 'A consumer line.\nA second consumer line.\n'
			const delta = ARTIFACT_TEMPLATES.docs.agents.split('\n').length - consumer.split('\n').length
			expect(delta).toBeGreaterThan(0)
			workspace.write('target/AGENTS.md', consumer)
			const sink = createSink()

			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			expect(sink.output).toContain(`AGENTS.md replaced (${String(delta)} lines added).`)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a missing content-owned file as created rather than replaced', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			workspace.remove('target/AGENTS.md')
			const sink = createSink()

			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'repair',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			expect(sink.output.some((line) => line.includes('AGENTS.md replaced'))).toBe(false)
			expect(sink.output.at(-1) ?? '').toContain('written')
		} finally {
			workspace.destroy()
		}
	})

	it('repairs at its default selection and earns a clean exit, the canon claim included', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: RepairResult = JSON.parse(sink.output[0] ?? '')
			// Every hydrated path but the manifest, which is claimed by birth and
			// therefore never rewritten.
			expect(result.written).toHaveLength(FLEET_ARTIFACT_COUNT - FLEET_BIRTH_COUNT + 1)
			expect(result.skipped).toStrictEqual(FLEET_BIRTH_PATHS)
			expect(result.audit.findings).toHaveLength(FLEET_ARTIFACT_COUNT)
			expect(result.audit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
			// The one path a plan claims inside the canon is restored like any other
			// vendored file, which is what keeps the catalog verb a file to rewrite.
			expect(workspace.read(`target/${CATALOG_AGENT_PATH}`)).toBe(`${CATALOG_AGENT_PATH}\n`)
		} finally {
			workspace.destroy()
		}
	})

	it('writes nothing when the blueprint the target describes is refused', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const refused = workspace.ensure('refused')
			workspace.write('refused/package.json', REFUSED_MANIFEST_TEXT)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				refused,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic.join('\n')).toContain('Sample')
			expect(readFileHex(refused, 'AGENTS.md')).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('repairs a canon file a consumer edited back to the bytes the host ships', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			workspace.write('target/AGENTS.md', 'A line a consumer added.\n')
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'repair',
				'--groups',
				'docs',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: RepairResult = JSON.parse(sink.output[0] ?? '')
			expect(result.written).toStrictEqual(['AGENTS.md'])
			expect(workspace.read('target/AGENTS.md')).toBe(ARTIFACT_TEMPLATES.docs.agents)
		} finally {
			workspace.destroy()
		}
	})
})

describe('CLI overwrite', () => {
	it('reports replacements, creations, and file deletions as distinct outcomes', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({})
		try {
			const fleet = createCatalogFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			const previous = '# Custom configuration\n'.repeat(500)
			workspace.write('target/vite.config.ts', previous)
			workspace.remove('target/.oxlintrc.json')
			workspace.write('target/.cursor/rules/stray.md', '# Stray\n')
			createRepository(fleet.target)
			trackFiles(fleet.target)

			const sink = createSink()
			await new CLI(buildCLIOptions(sink, server.base)).execute([
				'overwrite',
				'--dirty',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])

			const current = requireValue(workspace.read('target/vite.config.ts'))
			const removed = previous.split('\n').length - current.split('\n').length
			expect(sink.output.some((line) => line.includes('.oxlintrc.json replaced'))).toBe(false)
			expect(workspace.read('target/.oxlintrc.json')).toBe('.oxlintrc.json\n')
			expect(sink.output.some((line) => line.includes('1 removed in'))).toBe(true)
			expect(readFileHex(fleet.target, '.cursor/rules/stray.md')).toBeUndefined()
			expect(sink.output).toContain(`vite.config.ts replaced (${String(removed)} lines removed).`)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('scopes a custom-project refusal to overwrite selections', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const scripts = {
				...blueprintToScripts(createBlueprint('sample', { src: ['core'] })),
				test: 'vitest run "--project=missing"',
			}
			workspace.write(
				'target/package.json',
				buildTargetManifest(undefined, undefined, undefined, scripts),
			)
			const sink = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
					'overwrite',
					'--dirty',
					'--groups',
					'configs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const refusal: unknown = JSON.parse(sink.output[0] ?? '')
			expect(refusal).toHaveProperty('error.code', 'TARGET')
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('missing'))
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('Remove the script'))
			expect(refusal).toHaveProperty(
				'error.message',
				expect.not.stringContaining('Add the project to vite.config.ts'),
			)

			createRepository(fleet.target)
			trackFiles(fleet.target)
			const selected = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...selected.options }).execute([
					'overwrite',
					'--dirty',
					'--offline',
					'--groups',
					'docs',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			expect(JSON.parse(selected.output[0] ?? '')).toMatchObject({
				target: fleet.target,
				written: expect.arrayContaining(['AGENTS.md']),
				note: expect.stringContaining('catalog'),
			})
		} finally {
			workspace.destroy()
		}
	})

	it('overwrites a freshly scaffolded repository without deleting untracked files', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: {
				status: 200,
				body: '# Guide\n',
				type: 'text/plain',
			},
		})
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('fresh')
			const created = createSink()
			expect(
				await new CLI(buildCLIOptions(created, server.base)).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			createRepository(target)

			const overwritten = createSink()
			expect(
				await new CLI(buildCLIOptions(overwritten, server.base)).execute([
					'overwrite',
					'--dirty',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			const result: OverwriteResult = JSON.parse(overwritten.output[0] ?? '')
			expect(result.removed).toStrictEqual([])
			expect(result.provenance).toStrictEqual({ versions: 'live', guides: 'live' })

			const controlTarget = workspace.ensure('control')
			const controlCreated = createSink()
			expect(
				await new CLI(buildCLIOptions(controlCreated, server.base)).execute([
					'new',
					'control',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					controlTarget,
				]),
			).toBe(EXIT_CLEAN)
			workspace.write('control/.cursor/rules/untracked.md', '# Untracked\n')
			createRepository(controlTarget)
			const controlled = createSink()
			expect(
				await new CLI(buildCLIOptions(controlled, server.base)).execute([
					'overwrite',
					'--dirty',
					'--from',
					host,
					'--target',
					controlTarget,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const control: OverwriteResult = JSON.parse(controlled.output[0] ?? '')
			expect(control.removed).not.toContain('.cursor/rules/untracked.md')
			expect(workspace.read('control/.cursor/rules/untracked.md')).toBe('# Untracked\n')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('refuses a target git cannot recover, because deletion has no other undo', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'overwrite',
				'--target',
				fleet.target,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('git')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a tree carrying uncommitted work, and names the waiver that clears it', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			createRepository(fleet.target)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'overwrite',
				'--target',
				fleet.target,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('--dirty')
			expect(sink.diagnostic[0] ?? '').toContain('uncommitted')
		} finally {
			workspace.destroy()
		}
	})

	it('reports the refusal as one machine-readable value under --json', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			createRepository(fleet.target)
			const sink = createSink()
			const code = await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'overwrite',
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic).toStrictEqual([])
			expect(JSON.parse(sink.output[0] ?? '')).toHaveProperty('error.code', 'TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('does not report a refusal it can name under the uncoded code', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'overwrite',
				'--target',
				fleet.target,
				'--json',
			])
			expect(sink.output[0] ?? '').not.toContain(FAILED_CODE)
		} finally {
			workspace.destroy()
		}
	})

	// The destructive verb, driven end to end through both of its halves against a
	// target an earlier release left behind: the pointer drifted, the copies
	// scaffold once vendored still beside it, and a registration the maintainer
	// keeps out of git. One run repairs and sweeps, and the exit code it earns is
	// the fleet visit's success condition. The tree is committed rather than
	// waived, so the ignored file's survival is the dirty set's own answer.
	it('repairs the pointer and sweeps every tracked canon leftover in one run', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.packages.scaffold]: {
				status: 200,
				body: buildPackument('0.0.31'),
			},
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
			[FLEET_UPSTREAM_PATHS.mirrors.scaffold]: {
				status: 200,
				body: '# Scaffold\n',
				type: 'text/plain',
			},
		})
		try {
			const fleet = createCatalogFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			const pointer = requireValue(workspace.read('target/AGENTS.md'))
			workspace.write('target/AGENTS.md', '# The pointer an earlier release wrote\n')
			workspace.write('target/.claude/rules/names.md', '# Superseded rule\n')
			workspace.write('target/.claude/agents/planner.md', '# Superseded role\n')
			workspace.write('target/.cursor/rules/stray.md', '# A rule nobody planned\n')
			workspace.write('target/NOTES.md', '# Notes a consumer keeps\n')
			createRepository(fleet.target)
			trackFiles(fleet.target)
			commitFiles(fleet.target)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'overwrite',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
			expect(result.note).toBe(undefined)
			expect(result.removed.toSorted()).toStrictEqual([
				'.claude/agents/planner.md',
				'.claude/rules/names.md',
				'.cursor/rules/stray.md',
			])
			expect(readFileHex(fleet.target, '.cursor/rules/stray.md')).toBeUndefined()
			// The pointer sits at a canon path too, and the same run that deleted its
			// neighbours restored it instead, because the plan claims it.
			expect(result.written).toContain('AGENTS.md')
			expect(result.removed).not.toContain('AGENTS.md')
			expect(workspace.read('target/AGENTS.md')).toBe(pointer)
			// The controls, drawn from outside the population the deletion covers: a
			// tracked root file the plan does not own, and the catalog file the plan
			// claims inside the swept canon directory, whose own prose survives the run
			// that rewrites its table.
			expect(workspace.read('target/NOTES.md')).toContain('Notes a consumer keeps')
			const agent = requireValue(workspace.read(`target/${CATALOG_AGENT_PATH}`))
			expect(agent).toContain('Prose a consumer wrote above the table.')
			expect(agent).toContain('Prose a consumer wrote below the table.')
			expect(agent).toContain('| `@orkestrel/guide`')
			expect(result.audit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
			// The visit's success condition, taken by a second run rather than by the
			// first run's own report.
			const terminal = createSink()
			expect(
				await new CLI(buildCLIOptions(terminal, server.base)).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	// The maintainer's seam. A target that ignores a canon path and writes its own
	// copy there keeps it through every visit: the deletion draws on what git
	// tracks, and the dirty refusal reads a status that omits an ignored file. The
	// cost is stated here rather than assumed — the copy stays a foreign finding,
	// because membership is a path and git has never seen this one.
	it('leaves a git-ignored registration outside the dirty refusal and outside the deletion', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createCatalogFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			workspace.write('target/.gitignore', '.mcp.json\n')
			workspace.write('target/.mcp.json', '{ "mcpServers": {} }\n')
			createRepository(fleet.target)
			trackFiles(fleet.target)
			commitFiles(fleet.target)
			const sink = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...sink.options }).execute([
				'overwrite',
				'--offline',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			// The run was not refused. A dirty refusal reports an error envelope and
			// writes nothing, so the audit this result carries is the proof it ran.
			expect(sink.output[0] ?? '').not.toContain('"error"')
			const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
			expect(result.removed).toStrictEqual([])
			expect(workspace.read('target/.mcp.json')).toBe('{ "mcpServers": {} }\n')
			expect(
				result.audit.findings
					.filter((finding) => finding.drift === 'foreign')
					.map((finding) => finding.path),
			).toStrictEqual(['.mcp.json'])
		} finally {
			workspace.destroy()
		}
	})

	// The untracked half of the same law. Git is the recovery mechanism, so a copy
	// git has never seen is never deleted — and an unignored one is uncommitted
	// work, which the verb refuses whole until the waiver clears it.
	it('refuses an untracked canon leftover as uncommitted work and leaves it standing under the waiver', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const fleet = createCatalogFleet(workspace)
			await new CLI({ ...REGISTRY_OPTIONS, ...createSink().options }).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			createRepository(fleet.target)
			trackFiles(fleet.target)
			commitFiles(fleet.target)
			workspace.write('target/.claude/rules/names.md', '# Superseded rule\n')
			const refused = createSink()
			expect(
				await new CLI({ ...REGISTRY_OPTIONS, ...refused.options }).execute([
					'overwrite',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_DRIFT)
			expect(refused.diagnostic[0] ?? '').toContain('uncommitted')
			expect(workspace.read('target/.claude/rules/names.md')).toBe('# Superseded rule\n')

			const waived = createSink()
			await new CLI({ ...REGISTRY_OPTIONS, ...waived.options }).execute([
				'overwrite',
				'--dirty',
				'--offline',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			const result: OverwriteResult = JSON.parse(waived.output[0] ?? '')
			expect(result.removed).toStrictEqual([])
			expect(workspace.read('target/.claude/rules/names.md')).toBe('# Superseded rule\n')
			expect(
				result.audit.findings
					.filter((finding) => finding.drift === 'foreign')
					.map((finding) => finding.path),
			).toStrictEqual(['.claude/rules/names.md'])
		} finally {
			workspace.destroy()
		}
	})

	it('rewrites each declared range to the release the registry it was given names', async () => {
		// The rows carrying ranges this repository itself declares move on a fleet
		// bump. The registry here is a fixture, and a rewrite only needs the published
		// release to be greater than the declared one, so each row is served a
		// version above every pin and compared against the declaration that owns it.
		// A literal on either side turns an ordinary version bump into a red gate.
		const published = '9.9.9'
		const pinnedProbe = BASE_DEV_DEPENDENCIES['@orkestrel/probe']
		const pinnedScaffold = BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']
		const pinnedTest = BASE_DEV_DEPENDENCIES['@orkestrel/test']
		if (pinnedProbe === undefined || pinnedScaffold === undefined || pinnedTest === undefined) {
			throw new Error('The base development dependencies carry no probe, scaffold, or test pin')
		}
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.packages.probe]: { status: 200, body: buildPackument(published) },
			[FLEET_UPSTREAM_PATHS.packages.scaffold]: {
				status: 200,
				body: buildPackument(published),
			},
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
			[FLEET_UPSTREAM_PATHS.mirrors.probe]: { status: 200, body: '# Probe\n', type: 'text/plain' },
			[FLEET_UPSTREAM_PATHS.mirrors.scaffold]: {
				status: 200,
				body: '# Scaffold\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.packages.test]: { status: 200, body: buildPackument(published) },
			[FLEET_UPSTREAM_PATHS.mirrors.test]: { status: 200, body: '# Test\n', type: 'text/plain' },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			createRepository(fleet.target)
			trackFiles(fleet.target)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'overwrite',
				'--dirty',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
			expect(result.releases).toContainEqual({
				name: '@orkestrel/emitter',
				range: '^0.0.5',
				lookup: 'found',
				latest: '0.0.6',
				major: 0,
			})
			expect(result.releases).toContainEqual({
				name: '@orkestrel/guide',
				range: '^0.0.9',
				lookup: 'found',
				latest: '0.1.0',
				major: 0,
			})
			expect(result.releases).toContainEqual({
				name: '@orkestrel/probe',
				range: pinnedProbe,
				lookup: 'found',
				latest: published,
				major: 9,
			})
			expect(result.releases).toContainEqual({
				name: '@orkestrel/scaffold',
				range: pinnedScaffold,
				lookup: 'found',
				latest: published,
				major: 9,
			})
			expect(result.releases).toContainEqual({
				name: '@orkestrel/test',
				range: pinnedTest,
				lookup: 'found',
				latest: published,
				major: 9,
			})
			expect(result.releases).toContainEqual({
				name: 'vite',
				range: '~8.2.0',
				lookup: 'found',
				latest: '8.2.2',
				major: 8,
			})
			const manifest = workspace.read('target/package.json')
			expect(manifest).toContain('"@orkestrel/emitter": "^0.0.6"')
			expect(manifest).toContain('"@orkestrel/guide": "^0.1.0"')
			expect(manifest).toContain(`"@orkestrel/scaffold": "^${published}"`)
			// Nothing else in the manifest moved, which is the whole promise of
			// rewriting a range in place rather than re-serializing the file.
			expect(manifest).toContain('"vite": "^8.2.2"')
			expect(manifest).toContain('"description": "A sample workspace."')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('persists the offline half and reports the online step it could not complete', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({})
		try {
			const fleet = createCatalogFleet(workspace)
			createRepository(fleet.target)
			trackFiles(fleet.target)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'overwrite',
				'--dirty',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
			expect(result.note ?? '').toContain('The catalog step did not complete')
			// The destructive half is the one that already ran, so what it wrote
			// stays written even though the run ends non-zero.
			expect(workspace.read('target/AGENTS.md')).toBe(ARTIFACT_TEMPLATES.docs.agents)
			expect(result.releases.every((release) => release.lookup === 'missing')).toBe(true)
			expect(result.releases.map((release) => release.name)).toContain('vite')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('keeps the floor ranges when one release read does not complete', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			'/vite': { status: 503, body: '{"error":"Unavailable"}' },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			createRepository(fleet.target)
			trackFiles(fleet.target)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'overwrite',
				'--dirty',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
			expect(result.note ?? '').toContain('The versions step used the distributed floor')
			expect(result.provenance).toStrictEqual({ versions: 'floor', guides: 'live' })
			expect(result.releases).toContainEqual({
				name: 'vite',
				range: '~8.2.0',
				lookup: 'failed',
				note: 'HTTP 503',
			})
			expect(workspace.read('target/package.json')).toContain('"vite": "~8.2.0"')
			expect(workspace.read('target/AGENTS.md')).toBe(ARTIFACT_TEMPLATES.docs.agents)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})
})

describe('CLI catalog', () => {
	it('catalogs a freshly scaffolded workspace through the markers the host vendors', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: {
				status: 200,
				body: '# Guide\n',
				type: 'text/plain',
			},
		})
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('fresh')
			const created = createSink()
			expect(
				await new CLI(buildCLIOptions(created, server.base)).execute([
					'new',
					'widget',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				]),
			).toBe(EXIT_CLEAN)
			const agent = requireValue(workspace.read(`fresh/${CATALOG_AGENT_PATH}`))
			expect(agent.split('<!-- orkestrel:catalog -->')).toHaveLength(2)
			expect(agent.split('<!-- /orkestrel:catalog -->')).toHaveLength(2)
			expect(workspace.read('fresh/AGENTS.md')).not.toContain('orkestrel:catalog')

			const sink = createSink()
			expect(
				await new CLI(buildCLIOptions(sink, server.base)).execute([
					'catalog',
					'--from',
					host,
					'--target',
					target,
					'--json',
				]),
			).toBe(EXIT_CLEAN)
			expect(workspace.read(`fresh/${CATALOG_AGENT_PATH}`)).toContain(
				'| `@orkestrel/guide`    | `0.1.0`',
			)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('regenerates the package table and the guide mirrors from the endpoints it was given', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: {
				status: 200,
				// One runtime edge inside the fleet and one development edge, so the
				// order the table prints is proven end to end through the real registry
				// reader rather than only against the helper that derives it.
				body: buildPackument('0.1.0', {
					dependencies: { '@orkestrel/emitter': '^0.0.6' },
					development: { '@orkestrel/scaffold': '^0.0.26' },
				}),
			},
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
			[FLEET_UPSTREAM_PATHS.packages.probe]: { status: 200, body: buildPackument('0.0.1') },
			[FLEET_UPSTREAM_PATHS.mirrors.probe]: { status: 200, body: '# Probe\n', type: 'text/plain' },
			// A fictional release, like every packument this scenario serves, so the
			// table the test pins does not move with scaffold's own version.
			[FLEET_UPSTREAM_PATHS.packages.scaffold]: { status: 200, body: buildPackument('0.0.26') },
			[FLEET_UPSTREAM_PATHS.mirrors.scaffold]: {
				status: 200,
				body: '# Scaffold\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.packages.test]: { status: 200, body: buildPackument('0.0.2') },
			[FLEET_UPSTREAM_PATHS.mirrors.test]: { status: 200, body: '# Test\n', type: 'text/plain' },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'catalog',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: CatalogResult = JSON.parse(sink.output[0] ?? '')
			expect(result.provenance).toStrictEqual({ versions: 'live', guides: 'live' })
			expect(result.entries).toStrictEqual([
				{ name: '@orkestrel/emitter', lookup: 'found', version: '0.0.6', dependencies: [] },
				{
					name: '@orkestrel/guide',
					lookup: 'found',
					version: '0.1.0',
					dependencies: [{ name: '@orkestrel/emitter', range: '^0.0.6' }],
				},
				{ name: '@orkestrel/probe', lookup: 'found', version: '0.0.1', dependencies: [] },
				{ name: '@orkestrel/scaffold', lookup: 'found', version: '0.0.26', dependencies: [] },
				{ name: '@orkestrel/test', lookup: 'found', version: '0.0.2', dependencies: [] },
			])
			expect(result.mirrors.map((mirror) => mirror.path)).toStrictEqual([
				'guides/emitter.md',
				'guides/guide.md',
				'guides/probe.md',
				'guides/scaffold.md',
				'guides/test.md',
			])
			expect(result.dropped).toStrictEqual([])
			expect(workspace.read('target/guides/emitter.md')).toBe('# Emitter\n')
			expect(workspace.read('target/guides/scaffold.md')).toBe('# Scaffold\n')
			const agent = workspace.read(`target/${CATALOG_AGENT_PATH}`)
			expect(agent).toContain(
				'| `@orkestrel/emitter`  | `0.0.6`  | L0    |                               |',
			)
			expect(agent).toContain(
				'| `@orkestrel/guide`    | `0.1.0`  | L1    | `@orkestrel/emitter` `^0.0.6` |',
			)
			// Only the marked region moved, so every word a consumer wrote around
			// the table is still there.
			expect(agent).toContain('Prose a consumer wrote above the table.')
			expect(agent).toContain('Prose a consumer wrote below the table.')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('widens the fetch to the organization list under --all, and never to the target itself', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization([...FLEET_NAMES, '@orkestrel/router', '@orkestrel/sample']),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.router]: { status: 200, body: buildPackument('0.0.8') },
			[FLEET_UPSTREAM_PATHS.packages.sample]: { status: 200, body: buildPackument('0.0.1') },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.router]: {
				status: 200,
				body: '# Router\n',
				type: 'text/plain',
			},
		})
		try {
			const fleet = createCatalogFleet(workspace)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'catalog',
				'--all',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			const result: CatalogResult = JSON.parse(sink.output[0] ?? '')
			expect(result.entries.map((entry) => entry.name)).toStrictEqual([
				'@orkestrel/emitter',
				'@orkestrel/guide',
				'@orkestrel/probe',
				'@orkestrel/router',
				'@orkestrel/sample',
				'@orkestrel/scaffold',
				'@orkestrel/test',
			])
			// A package the organization lists and the target never declared is
			// fetched, which is the whole difference `--all` makes.
			expect(workspace.read('target/guides/router.md')).toBe('# Router\n')
			// The target's own guide remains outside the population `--all` covers.
			expect(result.mirrors.some((mirror) => mirror.name === '@orkestrel/sample')).toBe(false)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('reports a guide the host could not answer for as drift, naming the package', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: { status: 500, body: '{"error":"Internal"}' },
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			workspace.write('target/guides/emitter.md', '# Existing emitter\n')
			const existing = readFileHex(fleet.target, 'guides/emitter.md')
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'catalog',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const result: CatalogResult = JSON.parse(sink.output[0] ?? '')
			expect(result.provenance).toStrictEqual({ versions: 'live', guides: 'floor' })
			expect(result.mirrors).toContainEqual({
				name: '@orkestrel/emitter',
				path: 'guides/emitter.md',
				lookup: 'failed',
				note: 'HTTP 500',
				observed: existing,
			})
			expect(readFileHex(fleet.target, 'guides/emitter.md')).toBe(existing)
			expect(workspace.read('target/guides/guide.md')).toBe('# Guide\n')
			expect(workspace.read(`target/${CATALOG_AGENT_PATH}`)).toContain('@orkestrel/emitter')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('skips a guide the host does not publish and completes the catalog', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			// A published package whose repository is private answers its guide fetch
			// with the same absence a deleted guide answers with. The mirror it could
			// not replace is skipped and reported rather than refusing every other
			// write, because one unreachable package never costs the caller the rest
			// of the fetch.
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: { status: 404, body: 'Not found' },
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			workspace.write('target/guides/emitter.md', '# Existing emitter\n')
			const existing = readFileHex(fleet.target, 'guides/emitter.md')
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'catalog',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			const result: CatalogResult = JSON.parse(sink.output[0] ?? '')
			expect(result.provenance).toStrictEqual({ versions: 'live', guides: 'floor' })
			expect(result.mirrors).toContainEqual({
				name: '@orkestrel/emitter',
				path: 'guides/emitter.md',
				lookup: 'missing',
				note: 'HTTP 404',
				observed: existing,
			})
			expect(readFileHex(fleet.target, 'guides/emitter.md')).toBe(existing)
			expect(workspace.read('target/guides/guide.md')).toBe('# Guide\n')
			expect(workspace.read(`target/${CATALOG_AGENT_PATH}`)).toContain('@orkestrel/emitter')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('addresses only the endpoint it was given, so an unscripted fixture fails the run', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({})
		try {
			const fleet = createCatalogFleet(workspace)
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'catalog',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(JSON.parse(sink.output[0] ?? '')).toHaveProperty('error.code', 'FETCH')
			// The control for every catalog claim above, and for the whole seam: the
			// run addressed the fixture and nothing else, so an option that failed to
			// reach the reader would have been answered by the published registry
			// instead and this list would be empty.
			expect(server.paths).toStrictEqual([FLEET_UPSTREAM_PATHS.organization])
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	// `--from` is declared repeatable on this verb alone, and only the first entry
	// reaches the materializer, which takes exactly one vendored host. Closing that
	// means a materializer that reads several roots, which is a capability this
	// verb does not have; until it does, the run says so on the diagnostic where a
	// reader meets it, and this is the proof that it does.
	it('warns that a second local root reaches nothing, and reads the first', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			...FLEET_MIRROR_REPLIES,
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(FLEET_NAMES),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			const other = createHostRoot(workspace, 'other', buildFleetManifest())
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'catalog',
				'--from',
				fleet.host,
				'--from',
				other,
				'--target',
				fleet.target,
				'--json',
			])
			expect(code).toBe(EXIT_CLEAN)
			expect(sink.diagnostic).toHaveLength(1)
			expect(sink.diagnostic[0] ?? '').toContain(fleet.host)
			expect(sink.diagnostic[0] ?? '').toContain('reach nothing this run does')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})
})

describe('CLI new dependencies', () => {
	it('pins each named package to the latest release the registry it was given states', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.router]: { status: 200, body: buildPackument('0.0.8') },
		})
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--deps',
				'@orkestrel/emitter,@orkestrel/router',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			expect(code).toBe(EXIT_CLEAN)
			const manifest = workspace.read('fresh/package.json')
			expect(manifest).toContain('"@orkestrel/emitter": "^0.0.6"')
			expect(manifest).toContain('"@orkestrel/router": "^0.0.8"')
			expect(server.paths).toStrictEqual([
				FLEET_UPSTREAM_PATHS.packages.emitter,
				FLEET_UPSTREAM_PATHS.packages.router,
				FLEET_UPSTREAM_PATHS.packages.guide,
				FLEET_UPSTREAM_PATHS.packages.probe,
				FLEET_UPSTREAM_PATHS.packages.scaffold,
				FLEET_UPSTREAM_PATHS.packages.test,
			])
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('refuses a package the registry it was given names no release for', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const server = await createUpstreamServer({
			...FLEET_RELEASE_REPLIES,
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
		})
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.ensure('fresh')
			const sink = createSink()
			const code = await new CLI(buildCLIOptions(sink, server.base)).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--deps',
				'@orkestrel/emitter,@orkestrel/router',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('@orkestrel/router')
			// Nothing was written, because a workspace pinned to a range that does
			// not resolve is worse than no workspace at all.
			expect(readFileHex(fresh, 'package.json')).toBeUndefined()
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})
})
