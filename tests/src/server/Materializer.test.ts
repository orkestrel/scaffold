import type { Audit, CatalogEntry } from '@src/core'
import type { MaterializeResult } from '@src/server'
import { readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
	blueprintToWritableScripts,
	CATALOG_AGENT_PATH,
	Compiler,
	contentToHex,
	createBlueprint,
	isFinding,
	RELEASE_PROOF_COMMAND,
	WORKSPACE_OWNED_PATHS,
} from '@src/core'
import {
	computeDigest,
	computeManifestDigest,
	listDirectories,
	listFiles,
	Materializer,
	readFileHex,
	readHostManifest,
	readSnapshot,
} from '@src/server'
import { describe, expect, it } from 'vitest'
import { createRecorder, requireValue } from '@orkestrel/test'
import { buildBlueprint, buildHostArtifact } from '../../setup.js'
import {
	buildHostManifest,
	buildCompiledPlan,
	buildFleetManifest,
	buildManifestEntry,
	buildTargetAudit,
	buildVendoredManifest,
	buildVendoredPlan,
	CASE_FOLDING,
	CATALOG_AGENT_TEXT,
	createHostRoot,
	readErrorCode,
	readErrorMessage,
	TARGET_MANIFEST_TEXT,
	SCRATCH_PREFIX,
} from '../../setupServer.js'
import { createScratch } from '@orkestrel/test/server'

const MATERIALIZED = [
	'package.json',
	'AGENTS.md',
	'.claude/agents/orkestrel.md',
	'.claude/rules/names.md',
	'guides/guide.md',
	'scripts/codex.sh',
]

describe('Materializer construction', () => {
	it('refuses an option bag that is not the exact shape', () => {
		// The unknown-key and misspelled-event refusals are the option guard's own
		// law and are measured against it in `validators.test.ts`; what is measured
		// here is that the constructor consults that guard at all, which only a
		// type-valid but contract-invalid value can show.
		expect(readErrorCode(() => new Materializer({ host: 'dist/host*' }))).toBe('INVALID')
		expect(readErrorCode(() => new Materializer({ host: '' }))).toBe('INVALID')
	})

	it('accepts an explicit host with no manifest at all', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const raw = workspace.ensure('raw')
			const materializer = new Materializer({ host: raw })
			expect(materializer.emitter.destroyed).toBe(false)
			materializer.destroy()
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest that declares a file the host does not store', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			expect(readErrorCode(() => new Materializer({ host }))).toBe(undefined)
			rmSync(join(host, 'AGENTS.md'))
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a host that stores a file its manifest never declared', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			workspace.write('host/smuggled.md', '# Smuggled\n')
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest whose spelling differs from the host only in case', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const membership = buildVendoredManifest()
			const recased = buildVendoredManifest({
				entries: [
					buildManifestEntry({ storage: 'agents.md', destination: 'AGENTS.md' }),
					...membership.entries.slice(1),
				],
			})
			workspace.write('host/manifest.json', `${JSON.stringify(recased, null, '\t')}\n`)
			// The control: the host stores the exact name the manifest recases, so
			// absence cannot explain the case-only difference between the names.
			expect(readFileHex(host, 'AGENTS.md')).not.toBe(undefined)
			// The limit, executable rather than stated in prose, and stated against the
			// host this run measured rather than the host the suite was written on.
			// Where the directory folds case the recased storage name resolves to the
			// stored bytes, so the refusal below is a case verdict no membership check
			// could produce. Where it does not, that name is one the host does
			// not store, and the verdicts coincide.
			expect(readFileHex(host, 'agents.md')).toBe(
				CASE_FOLDING ? readFileHex(host, 'AGENTS.md') : undefined,
			)
			expect(readHostManifest(host)?.digest).toBe(recased.digest)
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest mapping two stored files to one destination', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const membership = buildVendoredManifest()
			const collided = buildVendoredManifest({
				entries: [
					...membership.entries,
					buildManifestEntry({ storage: 'alternate.md', destination: 'AGENTS.md' }),
				],
			})
			const host = createHostRoot(workspace, 'host', collided)
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest that does not match its own membership digest', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildHostManifest())
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer value host', () => {
	it('reads and writes a value host as the staged root holding the same bytes', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const host = createHostRoot(workspace, 'host', manifest)
			const value = {
				manifest,
				bytes: Object.fromEntries(
					manifest.entries.map((entry) => [
						entry.destination,
						contentToHex(`${entry.destination}\n`),
					]),
				),
			}
			const rooted = new Materializer({ host })
			const valued = new Materializer({ host: value })
			try {
				const rootedTarget = join(workspace.path, 'rooted')
				const valuedTarget = join(workspace.path, 'valued')
				const fromRoot = rooted.materialize(buildVendoredPlan(), rootedTarget)
				const fromValue = valued.materialize(buildVendoredPlan(), valuedTarget)
				expect(fromValue.written).toEqual(fromRoot.written)
				expect(fromValue.skipped).toEqual(fromRoot.skipped)
				expect(readSnapshot(valuedTarget, MATERIALIZED)).toEqual(
					readSnapshot(rootedTarget, MATERIALIZED),
				)
				// The modes agree too, because a value host is filled into a private
				// root and copied from it: the write path is the one a directory host
				// takes, so the executable declaration survives either representation.
				for (const path of MATERIALIZED) {
					expect(statSync(join(valuedTarget, path)).mode).toBe(
						statSync(join(rootedTarget, path)).mode,
					)
				}
				// The read side agrees over one target, which is hydration equality
				// stated where a caller can see it.
				expect(valued.audit(buildVendoredPlan(), rootedTarget)).toEqual(
					rooted.audit(buildVendoredPlan(), rootedTarget),
				)
			} finally {
				rooted.destroy()
				valued.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reports stale on exactly the path a value host differs from the target by one byte at', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const host = createHostRoot(workspace, 'host', manifest)
			const target = join(workspace.path, 'project')
			const entries = manifest.entries.map((entry) =>
				entry.destination === 'AGENTS.md'
					? { ...entry, digest: computeDigest('AGENTS.md ') }
					: entry,
			)
			const value = {
				manifest: {
					entries,
					roots: manifest.roots,
					digest: computeManifestDigest(entries, manifest.roots),
				},
				bytes: Object.fromEntries(
					entries.map((entry) => [
						entry.destination,
						contentToHex(
							entry.destination === 'AGENTS.md' ? 'AGENTS.md ' : `${entry.destination}\n`,
						),
					]),
				),
			}
			const rooted = new Materializer({ host })
			const valued = new Materializer({ host: value })
			try {
				rooted.materialize(buildVendoredPlan(), target)
				// The control: the root the target was written from reports no drift at
				// all, so the single verdict below is the one byte and nothing else.
				expect(
					rooted
						.audit(buildVendoredPlan(), target)
						.findings.filter((finding) => finding.drift === 'stale'),
				).toEqual([])
				expect(
					valued
						.audit(buildVendoredPlan(), target)
						.findings.filter((finding) => finding.drift === 'stale')
						.map((finding) => finding.path),
				).toEqual(['AGENTS.md'])
			} finally {
				rooted.destroy()
				valued.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a value host whose digest does not cover the membership beside it', () => {
		const manifest = buildVendoredManifest()
		const bytes = Object.fromEntries(
			manifest.entries.map((entry) => [entry.destination, contentToHex(`${entry.destination}\n`)]),
		)
		expect(readErrorCode(() => new Materializer({ host: { manifest, bytes } }))).toBe(undefined)
		expect(
			readErrorCode(
				() =>
					new Materializer({
						host: { manifest: { ...manifest, roots: [...manifest.roots, 'extra'] }, bytes },
					}),
			),
		).toBe('TARGET')
	})

	it('refuses a value host that does not carry the bytes its manifest declares', () => {
		const manifest = buildVendoredManifest()
		const bytes = Object.fromEntries(
			manifest.entries.map((entry) => [entry.destination, contentToHex(`${entry.destination}\n`)]),
		)
		const thinned = Object.fromEntries(
			Object.entries(bytes).filter(([destination]) => destination !== 'AGENTS.md'),
		)
		expect(readErrorCode(() => new Materializer({ host: { manifest, bytes: thinned } }))).toBe(
			'TARGET',
		)
		expect(
			readErrorCode(
				() =>
					new Materializer({
						host: { manifest, bytes: { ...bytes, 'smuggled.md': contentToHex('smuggled\n') } },
					}),
			),
		).toBe('TARGET')
	})

	it('refuses a value host whose manifest maps two destinations to one stored file', () => {
		const manifest = buildVendoredManifest()
		const entries = manifest.entries.map((entry) => ({ ...entry, storage: 'AGENTS.md' }))
		const collided = {
			entries,
			roots: manifest.roots,
			digest: computeManifestDigest(entries, manifest.roots),
		}
		const bytes = Object.fromEntries(
			entries.map((entry) => [entry.destination, contentToHex(`${entry.destination}\n`)]),
		)
		expect(readErrorCode(() => new Materializer({ host: { manifest: collided, bytes } }))).toBe(
			'TARGET',
		)
	})

	it('refuses a value host whose bytes miss the digest their entry declares', () => {
		const manifest = buildVendoredManifest()
		const bytes = Object.fromEntries(
			manifest.entries.map((entry) => [entry.destination, contentToHex(`${entry.destination}\n`)]),
		)
		expect(
			readErrorCode(
				() =>
					new Materializer({
						host: { manifest, bytes: { ...bytes, 'AGENTS.md': contentToHex('AGENTS.md ') } },
					}),
			),
		).toBe('TARGET')
	})

	it('owns the value it was given, so a later edit to that value changes nothing', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const bytes: Record<string, string> = Object.fromEntries(
				manifest.entries.map((entry) => [
					entry.destination,
					contentToHex(`${entry.destination}\n`),
				]),
			)
			const materializer = new Materializer({ host: { manifest, bytes } })
			try {
				bytes['AGENTS.md'] = contentToHex('# Swapped\n')
				const target = join(workspace.path, 'project')
				materializer.materialize(buildVendoredPlan(), target)
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('AGENTS.md\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer materialize', () => {
	it('writes every vendored shape into a vacant target with exact bytes', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				const result = materializer.materialize(buildVendoredPlan(), target)
				expect(result.written).toEqual([...MATERIALIZED, '.claude/skills'])
				expect(result.skipped).toEqual([])
				expect(result.removed).toEqual([])
				expect([...listFiles(target)].sort()).toEqual([...MATERIALIZED].sort())
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('AGENTS.md\n')
				expect(readFileSync(join(target, '.claude/rules/names.md'), 'utf8')).toBe(
					'.claude/rules/names.md\n',
				)
				expect(readFileSync(join(target, 'package.json'), 'utf8')).toBe(
					'{ "name": "@orkestrel/sample" }\n',
				)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('creates the one vendored directory that holds no file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(buildVendoredPlan(), target)
				expect(readFileHex(target, '.claude/skills')).toBe(undefined)
				expect(listFiles(join(target, '.claude/skills'))).toEqual([])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reads the vendored root rather than the bytes the plan claimed', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const plan = buildVendoredPlan({
				artifacts: [
					{
						path: 'AGENTS.md',
						group: 'docs',
						ownership: 'content',
						origin: 'host',
						hex: contentToHex('# Forged\n'),
					},
				],
			})
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('AGENTS.md\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a target that is not vacant and a plan the host cannot answer', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/README.md', '# Sample\n')
			const materializer = new Materializer({ host })
			try {
				expect(readErrorCode(() => materializer.materialize(buildVendoredPlan(), target))).toBe(
					'TARGET',
				)
				const other = join(workspace.path, 'other')
				const plan = buildVendoredPlan({
					artifacts: [{ path: 'LICENSE', group: 'docs', ownership: 'presence', origin: 'host' }],
				})
				expect(readErrorCode(() => materializer.materialize(plan, other))).toBe('TARGET')
				expect(listFiles(other)).toEqual([])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an argument that is not the exact shape and publishes every refusal', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const errors = createRecorder<readonly [unknown]>()
			const materializer = new Materializer({ host, on: { error: errors.handler } })
			try {
				expect(readErrorCode(() => materializer.materialize(buildVendoredPlan(), ''))).toBe(
					'INVALID',
				)
				expect(
					readErrorCode(() =>
						materializer.materialize(
							buildVendoredPlan({ blueprint: buildBlueprint({ name: '' }) }),
							join(workspace.path, 'project'),
						),
					),
				).toBe('INVALID')
				expect(errors.count).toBe(2)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reports each write and the whole outcome on its observation channel', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const writes = createRecorder<readonly [string]>()
			const finishes = createRecorder<readonly [MaterializeResult]>()
			const materializer = new Materializer({
				host,
				on: { write: writes.handler, finish: finishes.handler },
			})
			try {
				const result = materializer.materialize(
					buildVendoredPlan(),
					join(workspace.path, 'project'),
				)
				expect(writes.calls.map(([path]) => path)).toEqual(result.written)
				expect(finishes.calls).toEqual([[result]])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('maps a host with no manifest onto the target one to one', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('raw/AGENTS.md', '# Raw agents\n')
			workspace.write('raw/.claude/rules/names.md', '# Raw names\n')
			const host = workspace.ensure('raw')
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				const plan = buildVendoredPlan({
					artifacts: [
						{ path: 'AGENTS.md', group: 'docs', ownership: 'presence', origin: 'host' },
						{
							path: '.claude/rules',
							group: 'orchestration',
							ownership: 'presence',
							origin: 'host',
						},
					],
				})
				const result = materializer.materialize(plan, target)
				expect(result.written).toEqual(['AGENTS.md', '.claude/rules/names.md'])
				expect(readFileSync(join(target, '.claude/rules/names.md'), 'utf8')).toBe('# Raw names\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('throws after teardown and tears down once', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const destroys = createRecorder<readonly []>()
			const materializer = new Materializer({ host, on: { destroy: destroys.handler } })
			materializer.destroy()
			materializer.destroy()
			expect(destroys.count).toBe(1)
			expect(materializer.emitter.destroyed).toBe(true)
			expect(
				readErrorCode(() => materializer.materialize(buildVendoredPlan(), workspace.path)),
			).toBe('DESTROYED')
			expect(readErrorCode(() => materializer.audit(buildVendoredPlan(), workspace.path))).toBe(
				'DESTROYED',
			)
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer audit', () => {
	it('preserves workspace-owned ignore bytes while detecting other vendored drift', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.gitignore', 'dist\nlocal-cache\n')
			workspace.write('project/.oxlintrc.json', '{ "rules": {} }\n')
			const plan = buildCompiledPlan()
			const materializer = new Materializer({ host })
			try {
				expect(WORKSPACE_OWNED_PATHS).toStrictEqual(['.gitignore'])
				const audit = materializer.audit(plan, target)
				const ignore = audit.findings.find((finding) => finding.path === '.gitignore')
				const lint = audit.findings.find((finding) => finding.path === '.oxlintrc.json')
				expect(lint).toMatchObject({ ownership: 'content', drift: 'stale' })
				expect(ignore).toMatchObject({ ownership: 'presence', drift: 'aligned' })

				const result = materializer.repair(plan, audit, target)
				expect(result.written).not.toContain('.gitignore')
				expect(result.written).toContain('.oxlintrc.json')
				expect(workspace.read('project/.gitignore')).toBe('dist\nlocal-cache\n')
				expect(workspace.read('project/.oxlintrc.json')).toBe('.oxlintrc.json\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('restores an absent workspace-owned ignore file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = workspace.ensure('project')
			const plan = buildCompiledPlan()
			const materializer = new Materializer({ host })
			try {
				const audit = materializer.audit(plan, target)
				expect(audit.findings.find((finding) => finding.path === '.gitignore')?.drift).toBe(
					'missing',
				)
				const result = materializer.repair(plan, audit, target)
				expect(result.written).toContain('.gitignore')
				expect(workspace.read('project/.gitignore')).toBe('.gitignore\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('preserves workspace-owned ignore bytes through a raw vendored root', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('raw/.gitignore', 'dist\n')
			workspace.write('project/.gitignore', 'dist\nlocal-cache\n')
			const plan = buildVendoredPlan({
				groups: ['configs'],
				artifacts: [
					{ path: '.gitignore', group: 'configs', ownership: 'presence', origin: 'host' },
				],
			})
			const materializer = new Materializer({ host: workspace.ensure('raw') })
			try {
				const audit = materializer.audit(plan, workspace.ensure('project'))
				expect(audit.findings).toHaveLength(1)
				expect(audit.findings[0]).toMatchObject({
					path: '.gitignore',
					group: 'configs',
					ownership: 'presence',
					drift: 'aligned',
				})
				const result = materializer.repair(plan, audit, workspace.ensure('project'))
				expect(result.written).toStrictEqual([])
				expect(workspace.read('project/.gitignore')).toBe('dist\nlocal-cache\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reads the host bytes a compiler audit cannot, and leaves a foreign file to the deletion verb', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = join(workspace.path, 'project')
			const plan = buildCompiledPlan()
			const compiler = new Compiler()
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				writeFileSync(join(target, '.claude/settings.json'), '{ "edited": true }\n', 'utf8')
				rmSync(join(target, '.oxlintrc.json'))
				// The compiler never holds a vendored path's bytes, so it claims presence
				// there and reports an edited file aligned. The materializer reads the
				// host it was constructed over, which is the whole reason the writing
				// verbs take their audit from here rather than from a compiled comparison.
				const compilerAudit = compiler.audit(
					plan.blueprint,
					readSnapshot(
						target,
						plan.artifacts.map((artifact) => artifact.path),
					),
				)
				expect(
					compilerAudit.findings.find((finding) => finding.path === '.claude/settings.json')?.drift,
				).toBe('aligned')

				const audit = materializer.audit(plan, target)
				expect(audit.questions).toEqual([])
				expect(
					audit.findings.find((finding) => finding.path === '.claude/settings.json')?.drift,
				).toBe('stale')
				expect(audit.findings.find((finding) => finding.path === '.oxlintrc.json')?.drift).toBe(
					'missing',
				)

				workspace.write('project/.cursor/rules/foreign.md', '# Foreign rule\n')
				workspace.write('project/NOTES.md', '# Consumer notes\n')
				const discovered = materializer.audit(plan, target)
				expect(
					discovered.findings.find((finding) => finding.path === '.cursor/rules/foreign.md')?.drift,
				).toBe('foreign')
				// The control, drawn from outside the population the reading covers: a
				// root file that is neither planned nor canon is not a finding at all.
				expect(discovered.findings.some((finding) => finding.path === 'NOTES.md')).toBe(false)

				const result = materializer.repair(plan, audit, target)
				expect(result.written).toContain('.claude/settings.json')
				expect(result.written).toContain('.oxlintrc.json')
				expect(readFileSync(join(target, '.claude/settings.json'), 'utf8')).toBe(
					'.claude/settings.json\n',
				)
				expect(readFileSync(join(target, '.cursor/rules/foreign.md'), 'utf8')).toBe(
					'# Foreign rule\n',
				)
				expect(readFileSync(join(target, 'NOTES.md'), 'utf8')).toBe('# Consumer notes\n')
				const terminal = materializer.audit(plan, target)
				expect(
					terminal.findings.find((finding) => finding.path === '.cursor/rules/foreign.md')?.drift,
				).toBe('foreign')
				expect(materializer.repair(plan, terminal, target).written).toEqual([])
			} finally {
				materializer.destroy()
				compiler.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	// The manifest this host carries declares no root, so the plan expands no
	// directory and the owned-root arm of the reading has nothing to report. Every
	// foreign path below therefore arrives through the canon, which is the rival
	// reading this fixture exists to exclude.
	it('reports an unplanned canon path as foreign and pairs a planned one with its artifact', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = join(workspace.path, 'project')
			const plan = buildCompiledPlan()
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				workspace.write('project/.claude/rules/names.md', '# Superseded rule\n')
				workspace.write('project/.claude/agents/planner.md', '# Superseded role\n')
				workspace.write('project/.mcp.json', '{ "mcpServers": {} }\n')
				workspace.write('project/NOTES.md', '# Consumer notes\n')
				const audit = materializer.audit(plan, target)
				expect(
					audit.findings
						.filter((finding) => finding.drift === 'foreign')
						.map((finding) => finding.path)
						.toSorted(),
				).toStrictEqual([
					'.claude/agents/planner.md',
					'.claude/rules/names.md',
					'.mcp.json',
					// The directory member and the file member of the canon both report,
					// and a file the canon does not name reports through neither.
				])
				expect(
					audit.findings.find((finding) => finding.path === '.claude/agents/planner.md')?.group,
				).toBe('orchestration')
				// The catalog file sits beneath the same canon directory as the role file
				// beside it. The plan claims it, so it pairs with its artifact and the
				// deletion verb never sees it.
				expect(
					audit.findings.find((finding) => finding.path === '.claude/agents/orkestrel.md')?.drift,
				).toBe('aligned')
				expect(audit.findings.find((finding) => finding.path === 'AGENTS.md')?.drift).toBe(
					'aligned',
				)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reads no canon path outside the groups the plan selects', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = workspace.ensure('project')
			const compiler = new Compiler()
			const materializer = new Materializer({ host })
			try {
				const scoped = compiler.compile(buildBlueprint(), ['tests']).plan
				const whole = compiler.compile(buildBlueprint()).plan
				if (scoped === undefined || whole === undefined) {
					throw new Error('Expected the default blueprint to compile at either selection')
				}
				workspace.write('project/.claude/rules/names.md', '# Superseded rule\n')
				expect(
					materializer
						.audit(scoped, target)
						.findings.some((finding) => finding.drift === 'foreign'),
				).toBe(false)
				// The control: the same leftover in the same target, read by a plan whose
				// selection admits its group. A silent scoped audit is the selection
				// rather than a reading that never fires.
				expect(
					materializer
						.audit(whole, target)
						.findings.filter((finding) => finding.drift === 'foreign')
						.map((finding) => finding.path),
				).toStrictEqual(['.claude/rules/names.md'])
			} finally {
				materializer.destroy()
				compiler.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reports absent deferred paths as missing and a clean terminal audit after repair', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			const plan = buildVendoredPlan()
			const materializer = new Materializer({ host })
			try {
				const audit = materializer.audit(plan, target)
				expect(
					audit.findings.find((finding) => finding.path === '.claude/agents/orkestrel.md')?.drift,
				).toBe('missing')
				expect(audit.findings.find((finding) => finding.path === 'guides/guide.md')?.drift).toBe(
					'missing',
				)
				const result = materializer.repair(plan, audit, target)
				expect(result.written).toContain('.claude/agents/orkestrel.md')
				expect(result.written).toContain('guides/guide.md')
				expect(
					materializer.audit(plan, target).findings.every((finding) => finding.drift === 'aligned'),
				).toBe(true)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('does not inspect a vendored root outside the plan selection', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/AGENTS.md', 'AGENTS.md\n')
			workspace.write('project/.claude/rules/foreign.md', '# Foreign rule\n')
			const plan = buildVendoredPlan({
				groups: ['docs'],
				artifacts: [{ path: 'AGENTS.md', group: 'docs', ownership: 'presence', origin: 'host' }],
			})
			const materializer = new Materializer({ host })
			try {
				expect(materializer.audit(plan, target).findings.map((finding) => finding.path)).toEqual([
					'AGENTS.md',
				])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer repair', () => {
	it('restores a missing file, replaces a stale owned one, and leaves the rest alone', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(buildVendoredPlan(), target)
				rmSync(join(target, '.claude/rules/names.md'))
				writeFileSync(join(target, 'AGENTS.md'), '# Edited agents\n', 'utf8')
				writeFileSync(join(target, 'guides/guide.md'), '# Edited guide\n', 'utf8')
				const audit = buildTargetAudit(target, MATERIALIZED, ['AGENTS.md'])
				const result = materializer.repair(buildVendoredPlan(), audit, target)
				expect(result.written).toEqual(['AGENTS.md', '.claude/rules/names.md'])
				expect(result.skipped).toEqual([
					'package.json',
					'.claude/agents/orkestrel.md',
					'guides/guide.md',
					'scripts/codex.sh',
				])
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('AGENTS.md\n')
				expect(readFileSync(join(target, '.claude/rules/names.md'), 'utf8')).toBe(
					'.claude/rules/names.md\n',
				)
				// A guide mirror is presence-owned, so a consumer's edit survives repair.
				expect(readFileSync(join(target, 'guides/guide.md'), 'utf8')).toBe('# Edited guide\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses the whole call when the target moved after its audit', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(buildVendoredPlan(), target)
				rmSync(join(target, '.claude/rules/names.md'))
				const audit = buildTargetAudit(target, MATERIALIZED, [])
				writeFileSync(join(target, 'AGENTS.md'), '# Moved after the audit\n', 'utf8')
				expect(readErrorCode(() => materializer.repair(buildVendoredPlan(), audit, target))).toBe(
					'TARGET',
				)
				expect(readFileHex(target, '.claude/rules/names.md')).toBe(undefined)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a host path added after the audit as uncovered', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('raw/.claude/rules/names.md', '# Names\n')
			const host = workspace.ensure('raw')
			const target = join(workspace.path, 'project')
			const plan = buildVendoredPlan({
				groups: ['orchestration'],
				artifacts: [
					{
						path: '.claude/rules',
						group: 'orchestration',
						ownership: 'presence',
						origin: 'host',
					},
				],
			})
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				const audit = materializer.audit(plan, target)
				workspace.write('raw/.claude/rules/added.md', '# Added after audit\n')
				expect(readErrorMessage(() => materializer.repair(plan, audit, target))).toContain(
					'is not covered by its audit',
				)
				expect(readFileHex(target, '.claude/rules/added.md')).toBe(undefined)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a byte change even when the drift verdict stays stale', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const plan = buildVendoredPlan({
				groups: ['docs'],
				artifacts: [{ path: 'AGENTS.md', group: 'docs', ownership: 'presence', origin: 'host' }],
			})
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				writeFileSync(join(target, 'AGENTS.md'), '# First stale value\n', 'utf8')
				const audit = materializer.audit(plan, target)
				expect(audit.findings[0]?.drift).toBe('stale')
				writeFileSync(join(target, 'AGENTS.md'), '# Second stale value\n', 'utf8')
				expect(readErrorMessage(() => materializer.repair(plan, audit, target))).toContain(
					'moved since its audit',
				)
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('# Second stale value\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('tells a verdict the plan could not produce apart from a target that moved', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(buildVendoredPlan(), target)
				const audit = materializer.audit(buildVendoredPlan(), target)
				const manifest = audit.findings.find((finding) => finding.path === 'package.json')
				// `package.json` is this plan's one birth-owned path, and birth ownership is
				// never compared, so `stale` is a verdict no audit of this plan could have
				// reached for it. The guard admits it anyway, which is why the refusal has to
				// tell an impossible verdict apart from a target that moved.
				expect(manifest?.ownership).toBe('birth')
				expect(manifest?.drift).toBe('aligned')
				expect(manifest?.observed).not.toBe(undefined)
				const unreachable: Audit = {
					findings: audit.findings.map((finding) =>
						finding.path === 'package.json' && finding.observed !== undefined
							? {
									path: finding.path,
									group: finding.group,
									ownership: 'birth',
									drift: 'stale',
									observed: finding.observed,
								}
							: finding,
					),
					questions: [],
				}
				expect(unreachable.findings.every((finding) => isFinding(finding))).toBe(true)
				expect(
					readErrorCode(() => materializer.repair(buildVendoredPlan(), unreachable, target)),
				).toBe('TARGET')
				const impossible = readErrorMessage(() =>
					materializer.repair(buildVendoredPlan(), unreachable, target),
				)
				expect(impossible).toContain('could not produce')
				expect(impossible).not.toContain('moved since its audit')

				// The same code, for a verdict the comparison could have produced and no
				// longer does. Nothing was written by either refusal.
				writeFileSync(join(target, 'AGENTS.md'), '# Moved after the audit\n', 'utf8')
				expect(readErrorCode(() => materializer.repair(buildVendoredPlan(), audit, target))).toBe(
					'TARGET',
				)
				const moved = readErrorMessage(() =>
					materializer.repair(buildVendoredPlan(), audit, target),
				)
				expect(moved).toContain('moved since its audit')
				expect(moved).not.toContain('could not produce')
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('# Moved after the audit\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('writes nothing when the audit reports every path aligned', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = join(workspace.path, 'project')
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(buildVendoredPlan(), target)
				const audit = buildTargetAudit(target, MATERIALIZED, [])
				const result = materializer.repair(buildVendoredPlan(), audit, target)
				expect(result.written).toEqual([])
				expect(result.skipped).toEqual(MATERIALIZED)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer mirror', () => {
	it('writes a mirror whose bytes moved and skips one that is current or failed', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/guides/router.md', '# Old router\n')
			workspace.write('project/guides/emitter.md', '# Emitter\n')
			const materializer = new Materializer({ host })
			try {
				const result = materializer.mirror(
					[
						{
							name: '@orkestrel/router',
							path: 'guides/router.md',
							lookup: 'found',
							content: '# New router\n',
							observed: contentToHex('# Old router\n'),
						},
						{
							name: '@orkestrel/emitter',
							path: 'guides/emitter.md',
							lookup: 'found',
							content: '# Emitter\n',
							observed: contentToHex('# Emitter\n'),
						},
						{
							name: '@orkestrel/queue',
							path: 'guides/queue.md',
							lookup: 'failed',
							note: 'The host did not answer.',
						},
					],
					target,
				)
				expect(result.written).toEqual(['guides/router.md'])
				expect(result.skipped).toEqual(['guides/emitter.md', 'guides/queue.md'])
				expect(readFileSync(join(target, 'guides/router.md'), 'utf8')).toBe('# New router\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('creates a mirror that was never there and refuses one that moved', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			const materializer = new Materializer({ host })
			try {
				const created = materializer.mirror(
					[
						{
							name: '@orkestrel/router',
							path: 'guides/router.md',
							lookup: 'found',
							content: '# Router\n',
						},
					],
					target,
				)
				expect(created.written).toEqual(['guides/router.md'])
				expect(
					readErrorCode(() =>
						materializer.mirror(
							[
								{
									name: '@orkestrel/router',
									path: 'guides/router.md',
									lookup: 'found',
									content: '# Newer\n',
									observed: contentToHex('# Stale observation\n'),
								},
							],
							target,
						),
					),
				).toBe('TARGET')
				expect(readFileSync(join(target, 'guides/router.md'), 'utf8')).toBe('# Router\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer catalog', () => {
	it('writes the oxfmt-padded table and leaves every word around it', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/agents/orkestrel.md', CATALOG_AGENT_TEXT)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.catalog(
					[
						{
							name: '@orkestrel/contract',
							lookup: 'found',
							version: '0.0.11',
							dependencies: [],
							peers: [],
						},
						{
							name: '@orkestrel/agent',
							lookup: 'found',
							version: '0.0.15',
							dependencies: [
								{ name: '@orkestrel/contract', range: '^0.0.11' },
								{ name: '@orkestrel/workflow', range: '^0.0.11' },
							],
							peers: [{ name: '@orkestrel/reason', range: '^0.0.8' }],
						},
						{ name: '@orkestrel/queue', lookup: 'missing', note: 'No | release' },
					],
					target,
				)
				expect(result.written).toEqual(['.claude/agents/orkestrel.md'])
				const text = workspace.read('project/.claude/agents/orkestrel.md')
				const paddedAgentRow =
					'| `@orkestrel/agent`    | `0.0.15`      | L1    | `@orkestrel/contract` `^0.0.11`, `@orkestrel/workflow` `^0.0.11` | `@orkestrel/reason` `^0.0.8` |'
				const table = [
					'| Package               | Version       | Layer | Runtime dependencies                                             | Peer dependencies            |',
					'| --------------------- | ------------- | ----- | ---------------------------------------------------------------- | ---------------------------- |',
					'| `@orkestrel/contract` | `0.0.11`      | L0    |                                                                  |                              |',
					paddedAgentRow,
					'| `@orkestrel/queue`    | No \\| release |       |                                                                  |                              |',
				].join('\n')
				expect(text).toBe(
					CATALOG_AGENT_TEXT.replace('| Package | Version |\n| --- | --- |', `\n${table}\n`),
				)
				const unpaddedAgentRow =
					'| `@orkestrel/agent` | `0.0.15` | L1 | `@orkestrel/contract` `^0.0.11`, `@orkestrel/workflow` `^0.0.11` | `@orkestrel/reason` `^0.0.8` |'
				expect(unpaddedAgentRow).not.toBe(paddedAgentRow)
				expect(text).not.toContain(unpaddedAgentRow)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('skips a table that already matches and refuses a file with no marked region', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/agents/orkestrel.md', CATALOG_AGENT_TEXT)
			const materializer = new Materializer({ host })
			try {
				const entries: readonly CatalogEntry[] = [
					{
						name: '@orkestrel/router',
						lookup: 'found',
						version: '0.0.8',
						dependencies: [],
						peers: [],
					},
				]
				materializer.catalog(entries, target)
				const result = materializer.catalog(entries, target)
				expect(result.written).toEqual([])
				expect(result.skipped).toEqual(['.claude/agents/orkestrel.md'])
				workspace.write('project/.claude/agents/orkestrel.md', '# Orkestrel\n\nNo markers.\n')
				expect(readErrorCode(() => materializer.catalog(entries, target))).toBe('TARGET')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer declare', () => {
	it('raises writable ranges while preserving a shared peer declaration', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			const manifest = TARGET_MANIFEST_TEXT.replace(
				'"@orkestrel/guide": "^0.0.9"',
				'"@orkestrel/guide": "^0.0.9",\n\t\t"@orkestrel/router": "^0.0.8"',
			).replace(
				'\n}',
				',\n\t"peerDependencies": {\n\t\t"@orkestrel/router": ">=0.0.8"\n\t},\n\t"peerDependenciesMeta": {\n\t\t"@orkestrel/router": {\n\t\t\t"optional": true\n\t\t}\n\t}\n}',
			)
			workspace.write('project/package.json', manifest)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					{
						pins: {
							runtime: [{ name: '@orkestrel/emitter', range: '^0.0.9' }],
							development: [
								{ name: '@orkestrel/guide', range: '^0.0.9' },
								{ name: '@orkestrel/router', range: '^0.0.9' },
							],
						},
						scripts: [],
					},
					target,
				)
				expect(result.written).toEqual(['package.json'])
				const text = workspace.read('project/package.json')
				// The development floor moves, while the caller-owned peer bytes do not.
				expect(text).toBe(
					manifest
						.replace('"@orkestrel/emitter": "^0.0.5"', '"@orkestrel/emitter": "^0.0.9"')
						.replace('"@orkestrel/router": "^0.0.8"', '"@orkestrel/router": "^0.0.9"'),
				)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('skips a manifest already declaring every range and refuses an undeclared name', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/package.json', TARGET_MANIFEST_TEXT)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					{
						pins: { runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }], development: [] },
						scripts: [],
					},
					target,
				)
				expect(result.written).toEqual([])
				expect(result.skipped).toEqual(['package.json'])
				expect(
					readErrorCode(() =>
						materializer.declare(
							{
								pins: {
									runtime: [{ name: '@orkestrel/router', range: '^0.0.8' }],
									development: [],
								},
								scripts: [],
							},
							target,
						),
					),
				).toBe('INVALID')
				expect(workspace.read('project/package.json')).toBe(TARGET_MANIFEST_TEXT)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer declare scripts', () => {
	it('writes the script region a target scaffolded before the proof is missing', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			const previous = TARGET_MANIFEST_TEXT.replaceAll(
				/\t\t"test:distribution": .*\n/gu,
				'',
			).replace(` && ${RELEASE_PROOF_COMMAND}`, '')
			workspace.write('project/package.json', previous)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					{
						pins: { runtime: [], development: [] },
						scripts: blueprintToWritableScripts(createBlueprint('sample', { src: ['core'] })),
					},
					target,
				)

				expect(result.written).toEqual(['package.json'])
				// The expectation is the input with exactly the named script ranges
				// edited, so nothing outside them can have moved.
				expect(workspace.read('project/package.json')).toBe(
					previous
						.replace(
							'"npm run format:check && npm run lint:check && npm run check && npm run build && npm test"',
							`"npm run format:check && npm run lint:check && npm run check && npm run build && npm test && ${RELEASE_PROOF_COMMAND}"`,
						)
						// The absent script joins its own key family, so it lands after the
						// last declared `test:` key rather than closing the section.
						.replace(
							/(\t\t"test:bench": ".*",)\n/u,
							'$1\n\t\t"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution",\n',
						),
				)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('retains a customized chain byte-identically while the absent sibling appends', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			const customized = TARGET_MANIFEST_TEXT.replaceAll(
				/\t\t"test:distribution": .*\n/gu,
				'',
			).replace(` && ${RELEASE_PROOF_COMMAND}`, ' && npm run verify')
			workspace.write('project/package.json', customized)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					{
						pins: {
							runtime: [{ name: '@orkestrel/emitter', range: '^0.0.9' }],
							development: [],
						},
						scripts: blueprintToWritableScripts(createBlueprint('sample', { src: ['core'] })),
					},
					target,
				)

				expect(result.written).toEqual(['package.json'])
				// The write is per-script: the customized chain stays exactly as its
				// author left it while the absent distribution script appends among the
				// `test:` keys it belongs to, and the range moves.
				const appended =
					'"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"'
				expect(workspace.read('project/package.json')).toBe(
					customized
						.replace('"@orkestrel/emitter": "^0.0.5"', '"@orkestrel/emitter": "^0.0.9"')
						.replace(/("test:bench": "[^"]+",)\n/u, `$1\n\t\t${appended},\n`),
				)
				expect(workspace.read('project/package.json')).toContain('npm run verify')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('leaves a manifest untouched when the script region alone is refused', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			const customized = TARGET_MANIFEST_TEXT.replace(
				` && ${RELEASE_PROOF_COMMAND}`,
				' && npm run verify',
			)
			workspace.write('project/package.json', customized)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					{
						pins: { runtime: [], development: [] },
						scripts: blueprintToWritableScripts(createBlueprint('sample', { src: ['core'] })),
					},
					target,
				)

				expect(result.written).toEqual([])
				expect(result.skipped).toEqual(['package.json'])
				expect(workspace.read('project/package.json')).toBe(customized)
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer remove', () => {
	it('refuses a fabricated foreign verdict for a path the plan owns', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/AGENTS.md', 'AGENTS.md\n')
			const materializer = new Materializer({ host })
			try {
				const plan = buildVendoredPlan()
				const audit: Audit = {
					findings: [
						{
							path: 'AGENTS.md',
							group: 'docs',
							drift: 'foreign',
							observed: contentToHex('AGENTS.md\n'),
						},
					],
					questions: [],
				}
				expect(
					readErrorCode(() =>
						materializer.remove(plan, audit, { tracked: ['AGENTS.md'], dirty: [] }, target),
					),
				).toBe('TARGET')
				expect(workspace.read('project/AGENTS.md')).toBe('AGENTS.md\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('deletes a tracked foreign file and never a protected or untracked one', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/rules/foreign.md', '# Foreign\n')
			workspace.write('project/.claude/rules/untracked.md', '# Untracked\n')
			workspace.write('project/src/core/index.ts', 'export {}\n')
			const materializer = new Materializer({ host })
			try {
				const base = buildVendoredPlan()
				// Caller-authored-plan seam: no compiler emits a plan that maps a
				// protected root such as `src/core`, but the public contract still
				// admits one, so this shape is what exercises the protected-path
				// guard rather than the derivation alone.
				const plan = buildVendoredPlan({
					groups: [...base.groups, 'source'],
					artifacts: [
						...base.artifacts,
						buildHostArtifact({
							path: 'src/core',
							source: '.claude/rules',
							group: 'source',
						}),
					],
				})
				const audit = materializer.audit(plan, target)
				const result = materializer.remove(
					plan,
					audit,
					{ tracked: ['.claude/rules/foreign.md', 'src/core/index.ts'], dirty: [] },
					target,
				)
				expect(result.removed).toEqual(['.claude/rules/foreign.md'])
				expect(result.skipped).toEqual(['.claude/rules/untracked.md', 'src/core/index.ts'])
				expect([...listFiles(target)].sort()).toEqual([
					'.claude/rules/untracked.md',
					'src/core/index.ts',
				])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('takes the tracked canon leftovers through the one transaction and spares the planned file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = join(workspace.path, 'project')
			const plan = buildCompiledPlan()
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				const catalog = requireValue(workspace.read(`project/${CATALOG_AGENT_PATH}`))
				workspace.write('project/.claude/rules/names.md', '# Superseded rule\n')
				workspace.write('project/.claude/agents/planner.md', '# Superseded role\n')
				workspace.write('project/.mcp.json', '{ "mcpServers": {} }\n')
				const audit = materializer.audit(plan, target)
				const result = materializer.remove(
					plan,
					audit,
					{
						tracked: [
							'.claude/agents/planner.md',
							'.claude/rules/names.md',
							CATALOG_AGENT_PATH,
							'AGENTS.md',
						],
						dirty: [],
					},
					target,
				)
				expect(result.removed.toSorted()).toStrictEqual([
					'.claude/agents/planner.md',
					'.claude/rules/names.md',
				])
				// Untracked, so git cannot restore it and this verb does not take it.
				expect(result.skipped).toStrictEqual(['.mcp.json'])
				expect(readFileHex(target, '.claude/rules/names.md')).toBeUndefined()
				expect(readFileHex(target, '.claude/agents/planner.md')).toBeUndefined()
				expect(workspace.read(`project/${CATALOG_AGENT_PATH}`)).toBe(catalog)
				expect(workspace.read('project/.mcp.json')).toBe('{ "mcpServers": {} }\n')
				expect(
					materializer
						.audit(plan, target)
						.findings.filter((finding) => finding.drift === 'foreign')
						.map((finding) => finding.path),
				).toStrictEqual(['.mcp.json'])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a tree carrying uncommitted work and a candidate that moved', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/rules/foreign.md', '# Foreign\n')
			const materializer = new Materializer({ host })
			try {
				const plan = buildVendoredPlan()
				const audit = materializer.audit(plan, target)
				expect(
					readErrorCode(() =>
						materializer.remove(
							plan,
							audit,
							{
								tracked: ['.claude/rules/foreign.md'],
								dirty: ['.claude/rules/foreign.md'],
							},
							target,
						),
					),
				).toBe('TARGET')
				writeFileSync(join(target, '.claude/rules/foreign.md'), '# Moved\n', 'utf8')
				expect(
					readErrorCode(() =>
						materializer.remove(
							plan,
							audit,
							{ tracked: ['.claude/rules/foreign.md'], dirty: [] },
							target,
						),
					),
				).toBe('TARGET')
				expect(readFileSync(join(target, '.claude/rules/foreign.md'), 'utf8')).toBe('# Moved\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('reports each removal on its observation channel', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/rules/foreign.md', '# Foreign\n')
			const removals = createRecorder<readonly [string]>()
			const materializer = new Materializer({ host, on: { remove: removals.handler } })
			try {
				const plan = buildVendoredPlan()
				const audit = materializer.audit(plan, target)
				materializer.remove(
					plan,
					audit,
					{ tracked: ['.claude/rules/foreign.md'], dirty: [] },
					target,
				)
				expect(removals.calls).toEqual([['.claude/rules/foreign.md']])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('takes the directories its deletions emptied and leaves a filled one standing', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/skills/orkestrel-falsify/references/brief.md', '# Brief\n')
			workspace.write('project/.claude/rules/kept.md', '# Kept\n')
			const materializer = new Materializer({ host })
			try {
				const plan = buildVendoredPlan()
				const audit = materializer.audit(plan, target)
				const result = materializer.remove(
					plan,
					audit,
					{ tracked: ['.claude/skills/orkestrel-falsify/references/brief.md'], dirty: [] },
					target,
				)
				expect(result.removed).toEqual(['.claude/skills/orkestrel-falsify/references/brief.md'])
				// The emptied chain goes whole, and `.claude` survives because the
				// untracked file this verb spared keeps `.claude/rules` filled.
				expect(listDirectories(target)).toEqual(['.claude', '.claude/rules'])
				expect(workspace.read('project/.claude/rules/kept.md')).toBe('# Kept\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})
})
