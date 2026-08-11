import type { Audit, Group } from '@src/core'
import type { MaterializeResult } from '@src/server'
import type { CatalogResult, OverwriteResult, RepairResult } from '../../../src/bin/types.js'
import { describe, expect, it } from 'vitest'
import { CATALOG_AGENT_PATH, GROUPS } from '@src/core'
import { readFileHex } from '@src/server'
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
	buildOrganization,
	buildPackument,
	createCatalogFleet,
	createFleet,
	createHostRoot,
	createRepository,
	createSink,
	createStagedHost,
	createUpstreamServer,
	createWorkspace,
	FLEET_ARTIFACT_COUNT,
	FLEET_BIRTH_COUNT,
	FLEET_BIRTH_PATHS,
	FLEET_WRITE_COUNT,
	FLEET_UPSTREAM_PATHS,
	HOSTILE_ARGUMENT,
	HOSTILE_BYTES,
	REFUSED_MANIFEST_TEXT,
	trackFiles,
	USAGE_CASES,
} from '../../setupServer.js'

// The groups whose vendored paths are all files. A vendored directory is a
// single planned path the materializer expands into one artifact per file it
// holds, and every one of them is `orchestration`, so these are the groups a
// write can be measured over end to end today.
const FILE_GROUPS: readonly Group[] = ['manifest', 'configs', 'tests', 'guides', 'docs']

describe('CLI usage', () => {
	it('refuses --bin by name on every reading verb', async () => {
		for (const verb of ['audit', 'repair', 'catalog', 'overwrite']) {
			const sink = createSink()
			expect(await new CLI(sink.options).execute([verb, '--bin'])).toBe(EXIT_USAGE)
			expect(sink.diagnostic).toStrictEqual([`USAGE: '${verb}' does not take --bin.`])
		}
	})

	it('answers a request for usage instead of running, and writes nothing to the diagnostic', async () => {
		const sink = createSink()
		expect(await new CLI(sink.options).execute(['--help'])).toBe(EXIT_CLEAN)
		expect(sink.output).toStrictEqual(renderUsage())
		expect(sink.diagnostic).toStrictEqual([])
	})

	it('answers a request for usage on a verb, because usage replaces the run', async () => {
		for (const verb of VERBS) {
			const sink = createSink()
			expect(await new CLI(sink.options).execute([verb, '--help'])).toBe(EXIT_CLEAN)
			expect(sink.output).toStrictEqual(renderUsage())
		}
	})

	for (const usageCase of USAGE_CASES) {
		it(`refuses ${usageCase.label} on the diagnostic, with the usage code`, async () => {
			const sink = createSink()
			expect(await new CLI(sink.options).execute(usageCase.argv)).toBe(EXIT_USAGE)
			expect(sink.output).toStrictEqual([])
			expect(sink.diagnostic).toHaveLength(1)
			expect(sink.diagnostic[0] ?? '').toContain(usageCase.mention)
			expect(sink.diagnostic[0] ?? '').toContain(USAGE_CODE)
		})
	}

	it('refuses a group no plan has, naming what it does take', async () => {
		const sink = createSink()
		expect(await new CLI(sink.options).execute(['audit', '--groups', 'readme'])).toBe(EXIT_USAGE)
		expect(sink.diagnostic[0] ?? '').toContain('readme')
		for (const group of GROUPS) expect(sink.diagnostic[0] ?? '').toContain(group)
	})

	it('accepts every group some plan has', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			for (const group of GROUPS) {
				const sink = createSink()
				const code = await new CLI(sink.options).execute([
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
			const code = await new CLI(sink.options).execute(['new', 'widget', `--${axis}`, 'native'])
			expect(code).toBe(EXIT_USAGE)
			expect(sink.diagnostic[0] ?? '').toContain('native')
		}
	})

	it('refuses a dependency that is not a published fleet package', async () => {
		const sink = createSink()
		expect(await new CLI(sink.options).execute(['new', 'widget', '--deps', 'left-pad'])).toBe(
			EXIT_USAGE,
		)
		expect(sink.diagnostic[0] ?? '').toContain('left-pad')
	})

	it('reports a usage refusal as the one machine-readable value when --json was given', async () => {
		const sink = createSink()
		const code = await new CLI(sink.options).execute(['audit', '--groups', 'readme', '--json'])
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
		expect(await new CLI(sink.options).execute([HOSTILE_ARGUMENT])).toBe(EXIT_USAGE)
		expect(sink.diagnostic).toHaveLength(1)
		for (const byte of HOSTILE_BYTES) expect(sink.diagnostic[0] ?? '').not.toContain(byte)
	})

	it('forges no second line out of a line break in an argument', async () => {
		const sink = createSink()
		await new CLI(sink.options).execute([HOSTILE_ARGUMENT])
		expect(sink.diagnostic).toHaveLength(1)
		expect(sink.diagnostic[0] ?? '').toContain('pull forged')
	})

	it('keeps the visible word the refusal is about', async () => {
		const sink = createSink()
		await new CLI(sink.options).execute([HOSTILE_ARGUMENT])
		expect(sink.diagnostic[0] ?? '').toContain('pull')
	})

	it('passes on no hostile byte through the machine-readable path either', async () => {
		const sink = createSink()
		const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.directory('fresh')
			const created = createSink()
			expect(
				await new CLI(created.options).execute([
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
			expect(JSON.parse(workspace.read('fresh/package.json'))).toHaveProperty('bin', {
				widget: './dist/bin/main.js',
			})

			const audited = createSink()
			expect(
				await new CLI(audited.options).execute(['audit', '--from', fleet.host, '--target', fresh]),
			).toBe(EXIT_CLEAN)
		} finally {
			workspace.destroy()
		}
	})

	it('writes every planned path into a vacant target and reports what it wrote', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.directory('fresh')
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
			expect(sink.output.join('\n')).toContain(String(FLEET_WRITE_COUNT))
		} finally {
			workspace.destroy()
		}
	})

	it('emits one machine-readable value naming every path it wrote', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.directory('fresh')
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
			const result: MaterializeResult = JSON.parse(sink.output[0] ?? '')
			expect(result.written).toHaveLength(FLEET_WRITE_COUNT)
			expect(result.written).toContain('package.json')
			expect(result.removed).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a workspace that declares no environment at all', async () => {
		const sink = createSink()
		expect(await new CLI(sink.options).execute(['new', 'widget'])).toBe(EXIT_DRIFT)
		expect(sink.diagnostic[0] ?? '').toContain('src')
	})

	it('refuses a name the gate will not generate', async () => {
		const sink = createSink()
		expect(await new CLI(sink.options).execute(['new', 'Widget', '--src', 'core'])).toBe(EXIT_DRIFT)
		expect(sink.diagnostic[0] ?? '').toContain('Widget')
	})

	it('refuses a target that already holds a workspace', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
})

describe('CLI audit', () => {
	it('derives every exact structural fact in both directions', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.directory('target/src/bin')
			workspace.directory('target/tests')
			workspace.write('target/configs/app/other.config.ts', 'export {}\n')
			expect(
				await new CLI(createSink().options).execute([
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
			expect(absent).not.toContain("label: 'integration'")
			expect(absent).not.toContain('globalSetup:')
			expect(absent).not.toContain('appShowcase')

			workspace.write('target/src/bin/Main.ts', 'export {}\n')
			expect(
				await new CLI(createSink().options).execute([
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
			workspace.remove('target/src/bin/Main.ts')

			workspace.write('target/src/bin/main.ts', 'export {}\n')
			workspace.write('target/tests/integration.test.ts', 'export {}\n')
			workspace.write('target/tests/setupGlobal.ts', 'export {}\n')
			workspace.directory('target/app/browser')
			workspace.write('target/configs/app/vite.showcase.config.ts', 'export {}\n')
			expect(
				await new CLI(createSink().options).execute([
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
			expect(present).toContain("label: 'integration'")
			expect(present).toContain("globalSetup: ['./tests/setupGlobal.ts']")
			expect(present).toContain('appShowcase')
		} finally {
			workspace.destroy()
		}
	})

	it('reports every unregistered manifest project as one non-blocking question', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: {
						test: 'vitest run --project src:core "--project=missing"',
					},
				})}\n`,
			)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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

	it('prints findings and an unregistered-project question in the human report', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: {
						test: 'vitest run --project=missing --project "absent"',
					},
				})}\n`,
			)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const created = createSink()
			expect(
				await new CLI(created.options).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: { test: 'vitest run --project missing' },
				})}\n`,
			)
			const sink = createSink()
			expect(
				await new CLI(sink.options).execute([
					'audit',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				]),
			).toBe(EXIT_CLEAN)
			expect(sink.output.at(-1)).toBe(
				`0 of ${String(FLEET_ARTIFACT_COUNT)} planned paths differ from the plan.`,
			)
			expect(sink.diagnostic).toHaveLength(1)
		} finally {
			workspace.destroy()
		}
	})

	it('reports drift against a target that carries none of its planned paths', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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

	it('emits one audit as the machine-readable value, every finding on a hydrated path', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
			// The vendored directory the plan claims as one path is reported as the
			// files the host stores beneath it, which is the comparison a repair is
			// about to make and the one the pure compile cannot state.
			expect(audit.findings.some((finding) => finding.path === '.claude/rules/sample.md')).toBe(
				true,
			)
			expect(audit.findings.some((finding) => finding.path === '.claude/rules')).toBe(false)
			expect(audit.questions).toStrictEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('reports a clean run against the workspace new just wrote, and writes nothing itself', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.directory('fresh')
			await new CLI(createSink().options).execute([
				'new',
				'widget',
				'--src',
				'core',
				'--from',
				fleet.host,
				'--target',
				fresh,
			])
			workspace.directory('fresh/src/core')
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			await new CLI(createSink().options).execute([
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
				await new CLI(before.options).execute([
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
				await new CLI(after.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const other = createHostRoot(workspace, 'other', buildFleetManifest())
			workspace.write('other/AGENTS.md', 'A canon the other host ships.\n')
			await new CLI(createSink().options).execute([
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
				await new CLI(matched.options).execute([
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
				await new CLI(differing.options).execute([
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
			expect(audit.findings.find((finding) => finding.path === 'AGENTS.md')?.drift).toBe('stale')
		} finally {
			workspace.destroy()
		}
	})

	it('reports a file the plan does not own beneath an owned canon root, and no file at the target root', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			await new CLI(createSink().options).execute([
				'repair',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			])
			workspace.write('target/.claude/rules/stray.md', '# A rule nobody planned\n')
			workspace.write('target/NOTES.md', '# Notes a consumer keeps\n')
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
			).toStrictEqual(['.claude/rules/stray.md'])
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
		const workspace = createWorkspace()
		try {
			const bare = workspace.directory('bare')
			const sink = createSink()
			expect(await new CLI(sink.options).execute(['audit', '--target', bare])).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses to read a target through a vendored host whose manifest does not verify', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const broken = createHostRoot(workspace, 'broken', buildHostManifest())
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const refused = workspace.directory('refused')
			workspace.write('refused/package.json', REFUSED_MANIFEST_TEXT)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		} finally {
			workspace.destroy()
		}
	})

	it('reports a clean run over the one group the workspace owns its own bytes of', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
	it('refuses to write when a manifest script names an unregistered project', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: { test: 'vitest run "--project=missing"' },
				})}\n`,
			)
			workspace.write('target/vite.config.ts', 'marker\n')
			const sink = createSink()
			expect(
				await new CLI(sink.options).execute([
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
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('remove the script'))
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: { test: 'vitest run "--project=$ROGUE"' },
				})}\n`,
			)
			workspace.write('target/vite.config.ts', 'marker\n')
			const sink = createSink()
			expect(
				await new CLI(sink.options).execute([
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
				await new CLI(audited.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: { test: 'vitest --project missing' },
				})}\n`,
			)
			const sink = createSink()
			expect(
				await new CLI(sink.options).execute([
					'repair',
					'--from',
					fleet.host,
					'--target',
					fleet.target,
					'--json',
				]),
			).toBe(EXIT_DRIFT)
			const refusal: unknown = JSON.parse(sink.output[0] ?? '')
			expect(refusal).toHaveProperty(
				'error.message',
				expect.stringContaining('do not use scaffold writing verbs'),
			)
			expect(refusal).toHaveProperty(
				'error.message',
				expect.not.stringContaining('Add the project to vite.config.ts'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('writes each planned path the target is missing, over a group of vendored files', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		} finally {
			workspace.destroy()
		}
	})

	it('leaves a repaired group clean on the second run, writing nothing the second time', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			for (const group of FILE_GROUPS) {
				await new CLI(createSink().options).execute([
					'repair',
					'--groups',
					group,
					'--from',
					fleet.host,
					'--target',
					fleet.target,
				])
				const sink = createSink()
				const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			await new CLI(createSink().options).execute([
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
			const code = await new CLI(sink.options).execute([
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
			expect(workspace.read('target/AGENTS.md')).toBe('AGENTS.md\n')
		} finally {
			workspace.destroy()
		}
	})

	it('repairs at its default selection and earns a clean exit, vendored directories included', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
			expect(result.written).toHaveLength(FLEET_ARTIFACT_COUNT - FLEET_BIRTH_COUNT)
			expect(result.skipped).toStrictEqual(FLEET_BIRTH_PATHS)
			expect(result.audit.findings).toHaveLength(FLEET_ARTIFACT_COUNT)
			expect(result.audit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
			expect(workspace.read('target/.claude/rules/sample.md')).toBe('.claude/rules/sample.md\n')
		} finally {
			workspace.destroy()
		}
	})

	it('writes nothing when the blueprint the target describes is refused', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const refused = workspace.directory('refused')
			workspace.write('refused/package.json', REFUSED_MANIFEST_TEXT)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			await new CLI(createSink().options).execute([
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
			const code = await new CLI(sink.options).execute([
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
			expect(workspace.read('target/AGENTS.md')).toBe('AGENTS.md\n')
		} finally {
			workspace.destroy()
		}
	})
})

describe('CLI overwrite', () => {
	it('refuses to write when a manifest script names an unregistered project', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			workspace.write(
				'target/package.json',
				`${JSON.stringify({
					name: '@orkestrel/sample',
					scripts: { test: 'vitest run "--project=missing"' },
				})}\n`,
			)
			const sink = createSink()
			expect(
				await new CLI(sink.options).execute([
					'overwrite',
					'--dirty',
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
			expect(refusal).toHaveProperty('error.message', expect.stringContaining('remove the script'))
			expect(refusal).toHaveProperty(
				'error.message',
				expect.not.stringContaining('Add the project to vite.config.ts'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('overwrites a freshly scaffolded repository without deleting untracked files', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/guide']),
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
			const target = workspace.directory('fresh')
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

			const controlTarget = workspace.directory('control')
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
			workspace.write('control/.claude/rules/untracked.md', '# Untracked\n')
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
			expect(control.removed).not.toContain('.claude/rules/untracked.md')
			expect(workspace.read('control/.claude/rules/untracked.md')).toBe('# Untracked\n')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('refuses a target git cannot recover, because deletion has no other undo', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			const code = await new CLI(sink.options).execute(['overwrite', '--target', fleet.target])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('git')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a tree carrying uncommitted work, and names the waiver that clears it', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			createRepository(fleet.target)
			const sink = createSink()
			const code = await new CLI(sink.options).execute(['overwrite', '--target', fleet.target])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic[0] ?? '').toContain('--dirty')
			expect(sink.diagnostic[0] ?? '').toContain('uncommitted')
		} finally {
			workspace.destroy()
		}
	})

	it('reports the refusal as one machine-readable value under --json', async () => {
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			createRepository(fleet.target)
			const sink = createSink()
			const code = await new CLI(sink.options).execute([
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
		const workspace = createWorkspace()
		try {
			const fleet = createFleet(workspace)
			const sink = createSink()
			await new CLI(sink.options).execute(['overwrite', '--target', fleet.target, '--json'])
			expect(sink.output[0] ?? '').not.toContain(FAILED_CODE)
		} finally {
			workspace.destroy()
		}
	})

	// The destructive verb, driven end to end through both of its halves. The
	// offline half deletes; the online half reads the registry and the guide host
	// through the loopback fixture the run was pointed at, so the exit code this
	// asserts is the same one an offline machine earns.
	it('deletes a tracked stray beneath an owned canon root and leaves a root file', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/emitter', '@orkestrel/guide']),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
		})
		try {
			const fleet = createCatalogFleet(workspace)
			workspace.write('target/.claude/rules/stray.md', '# A rule nobody planned\n')
			workspace.write('target/NOTES.md', '# Notes a consumer keeps\n')
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
			expect(result.note).toBe(undefined)
			expect(result.removed).toStrictEqual(['.claude/rules/stray.md'])
			expect(readFileHex(fleet.target, '.claude/rules/stray.md')).toBeUndefined()
			// The control, drawn from outside the population the deletion covers: a
			// tracked root file the plan does not own either, which the owned-root
			// bound excludes. It is still there, so the deletion is bounded by the
			// root rather than by what git happens to track.
			expect(workspace.read('target/NOTES.md')).toContain('Notes a consumer keeps')
			expect(result.audit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('rewrites each declared range to the release the registry it was given names', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/emitter', '@orkestrel/guide']),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
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
			expect(result.releases).toStrictEqual([
				{ name: '@orkestrel/emitter', range: '^0.0.5', lookup: 'found', latest: '0.0.6' },
				{ name: '@orkestrel/guide', range: '^0.0.9', lookup: 'found', latest: '0.1.0' },
			])
			const manifest = workspace.read('target/package.json')
			expect(manifest).toContain('"@orkestrel/emitter": "^0.0.6"')
			expect(manifest).toContain('"@orkestrel/guide": "^0.1.0"')
			// Nothing else in the manifest moved, which is the whole promise of
			// rewriting a range in place rather than re-serializing the file.
			expect(manifest).toContain('"vite": "~8.2.0"')
			expect(manifest).toContain('"description": "A sample workspace."')
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('persists the offline half and reports the online step it could not complete', async () => {
		const workspace = createWorkspace()
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
			expect(workspace.read('target/AGENTS.md')).toBe('AGENTS.md\n')
			expect(result.releases).toStrictEqual([])
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})
})

describe('CLI catalog', () => {
	it('catalogs a freshly scaffolded workspace through the markers the host vendors', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/guide']),
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
			const target = workspace.directory('fresh')
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
			const agent = workspace.read(`fresh/${CATALOG_AGENT_PATH}`)
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
				'| `@orkestrel/guide` | `0.1.0` |',
			)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('regenerates the package table and the guide mirrors from the endpoints it was given', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/emitter', '@orkestrel/guide']),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: {
				status: 200,
				body: '# Emitter\n',
				type: 'text/plain',
			},
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
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
			expect(result.entries).toStrictEqual([
				{ name: '@orkestrel/emitter', lookup: 'found', version: '0.0.6' },
				{ name: '@orkestrel/guide', lookup: 'found', version: '0.1.0' },
			])
			expect(result.mirrors.map((mirror) => mirror.path)).toStrictEqual([
				'guides/emitter.md',
				'guides/guide.md',
			])
			expect(result.dropped).toStrictEqual([])
			expect(workspace.read('target/guides/emitter.md')).toBe('# Emitter\n')
			const agent = workspace.read(`target/${CATALOG_AGENT_PATH}`)
			expect(agent).toContain('| `@orkestrel/emitter` | `0.0.6` |')
			expect(agent).toContain('| `@orkestrel/guide` | `0.1.0` |')
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
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/emitter', '@orkestrel/router', '@orkestrel/sample']),
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
				'@orkestrel/router',
				'@orkestrel/sample',
			])
			// A package the organization lists and the target never declared is
			// fetched, which is the whole difference `--all` makes.
			expect(workspace.read('target/guides/router.md')).toBe('# Router\n')
			// Two controls, each drawn from outside the population `--all` covers: a
			// package the target declares but the organization does not list is not
			// fetched, and neither is the target's own guide.
			expect(readFileHex(fleet.target, 'guides/guide.md')).toBeUndefined()
			expect(server.paths).not.toContain(FLEET_UPSTREAM_PATHS.mirrors.guide)
			expect(result.mirrors.some((mirror) => mirror.name === '@orkestrel/sample')).toBe(false)
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('reports a guide the host could not answer for as drift, naming the package', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/emitter', '@orkestrel/guide']),
			},
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.guide]: { status: 200, body: buildPackument('0.1.0') },
			[FLEET_UPSTREAM_PATHS.mirrors.emitter]: { status: 500, body: '{"error":"Internal"}' },
			[FLEET_UPSTREAM_PATHS.mirrors.guide]: { status: 200, body: '# Guide\n', type: 'text/plain' },
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
			])
			expect(code).toBe(EXIT_DRIFT)
			expect(sink.diagnostic.join('\n')).toContain('@orkestrel/emitter: HTTP 500')
			// The half that did answer is still written, because one unreachable
			// package never costs the caller the rest of the fetch.
			expect(workspace.read('target/guides/guide.md')).toBe('# Guide\n')
			expect(readFileHex(fleet.target, 'guides/emitter.md')).toBeUndefined()
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('addresses only the endpoint it was given, so an unscripted fixture fails the run', async () => {
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.organization]: {
				status: 200,
				body: buildOrganization(['@orkestrel/emitter']),
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
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
			[FLEET_UPSTREAM_PATHS.packages.router]: { status: 200, body: buildPackument('0.0.8') },
		})
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.directory('fresh')
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
			])
		} finally {
			await server.destroy()
			workspace.destroy()
		}
	})

	it('refuses a package the registry it was given names no release for', async () => {
		const workspace = createWorkspace()
		const server = await createUpstreamServer({
			[FLEET_UPSTREAM_PATHS.packages.emitter]: { status: 200, body: buildPackument('0.0.6') },
		})
		try {
			const fleet = createFleet(workspace)
			const fresh = workspace.directory('fresh')
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
