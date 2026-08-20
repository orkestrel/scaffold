import type { Audit, CatalogEntry } from '@src/core'
import type { MaterializeResult } from '@src/server'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Compiler, contentToHex, isFinding, WORKSPACE_OWNED_PATHS } from '@src/core'
import { listFiles, Materializer, readFileHex, readHostManifest, readSnapshot } from '@src/server'
import { describe, expect, it } from 'vitest'
import { createRecorder } from '@orkestrel/test'
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
	createWorkspace,
	readErrorCode,
	readErrorMessage,
	TARGET_MANIFEST_TEXT,
} from '../../setupServer.js'

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

	it('accepts a host with no manifest at all, including the default one', () => {
		const workspace = createWorkspace()
		try {
			const raw = workspace.ensure('raw')
			const materializer = new Materializer({ host: raw })
			expect(materializer.emitter.destroyed).toBe(false)
			materializer.destroy()
			// The packaged default resolves from this module's own location, which is
			// unbuilt in a source checkout, so it reads as a host carrying no manifest.
			const packaged = new Materializer()
			expect(packaged.emitter.destroyed).toBe(false)
			packaged.destroy()
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest that declares a file the host does not store', () => {
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			workspace.write('host/smuggled.md', '# Smuggled\n')
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a manifest whose spelling differs from the host only in case', () => {
		const workspace = createWorkspace()
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
			// could produce. Where it does not, that name is simply one the host does
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildHostManifest())
			expect(readErrorCode(() => new Materializer({ host }))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})
})

describe('Materializer materialize', () => {
	it('writes every vendored shape into a vacant target with exact bytes', () => {
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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

	it('shares one hydrated reading with a full-selection repair and bounds foreign files by owned roots', () => {
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildFleetManifest())
			const target = join(workspace.path, 'project')
			const plan = buildCompiledPlan()
			const compiler = new Compiler()
			const materializer = new Materializer({ host })
			try {
				materializer.materialize(plan, target)
				const current = readSnapshot(
					target,
					plan.artifacts.map((artifact) => artifact.path),
				)
				const compilerAudit = compiler.audit(plan.blueprint, current)
				expect(readErrorMessage(() => materializer.repair(plan, compilerAudit, target))).toContain(
					'is not covered by its audit',
				)

				writeFileSync(join(target, 'AGENTS.md'), '# Edited agents\n', 'utf8')
				rmSync(join(target, '.claude/rules/sample.md'))
				const staleCompilerAudit = compiler.audit(
					plan.blueprint,
					readSnapshot(
						target,
						plan.artifacts.map((artifact) => artifact.path),
					),
				)
				expect(
					staleCompilerAudit.findings.find((finding) => finding.path === 'AGENTS.md')?.drift,
				).toBe('aligned')

				const audit = materializer.audit(plan, target)
				expect(audit.questions).toEqual([])
				expect(audit.findings.find((finding) => finding.path === 'AGENTS.md')?.drift).toBe('stale')
				expect(
					audit.findings.find((finding) => finding.path === '.claude/rules/sample.md')?.drift,
				).toBe('missing')

				workspace.write('project/.claude/rules/foreign.md', '# Foreign rule\n')
				workspace.write('project/NOTES.md', '# Consumer notes\n')
				const discovered = materializer.audit(plan, target)
				expect(
					discovered.findings.find((finding) => finding.path === '.claude/rules/foreign.md')?.drift,
				).toBe('foreign')
				expect(discovered.findings.some((finding) => finding.path === 'NOTES.md')).toBe(false)

				const result = materializer.repair(plan, audit, target)
				expect(result.written).toContain('AGENTS.md')
				expect(result.written).toContain('.claude/rules/sample.md')
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('AGENTS.md\n')
				expect(readFileSync(join(target, '.claude/rules/foreign.md'), 'utf8')).toBe(
					'# Foreign rule\n',
				)
				expect(readFileSync(join(target, 'NOTES.md'), 'utf8')).toBe('# Consumer notes\n')
				const terminal = materializer.audit(plan, target)
				expect(
					terminal.findings.find((finding) => finding.path === '.claude/rules/foreign.md')?.drift,
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

	it('reports absent deferred paths as missing and a clean terminal audit after repair', () => {
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
						},
						{
							name: '@orkestrel/agent',
							lookup: 'found',
							version: '0.0.15',
							dependencies: [
								{ name: '@orkestrel/contract', range: '^0.0.11' },
								{ name: '@orkestrel/workflow', range: '^0.0.11' },
							],
						},
						{ name: '@orkestrel/queue', lookup: 'missing', note: 'No | release' },
					],
					target,
				)
				expect(result.written).toEqual(['.claude/agents/orkestrel.md'])
				const text = workspace.read('project/.claude/agents/orkestrel.md')
				const paddedAgentRow =
					'| `@orkestrel/agent`    | `0.0.15`      | L1    | `@orkestrel/contract` `^0.0.11`, `@orkestrel/workflow` `^0.0.11` |'
				const table = [
					'| Package               | Version       | Layer | Runtime dependencies                                             |',
					'| --------------------- | ------------- | ----- | ---------------------------------------------------------------- |',
					'| `@orkestrel/contract` | `0.0.11`      | L0    |                                                                  |',
					paddedAgentRow,
					'| `@orkestrel/queue`    | No \\| release |       |                                                                  |',
				].join('\n')
				expect(text).toBe(
					CATALOG_AGENT_TEXT.replace('| Package | Version |\n| --- | --- |', `\n${table}\n`),
				)
				const unpaddedAgentRow =
					'| `@orkestrel/agent` | `0.0.15` | L1 | `@orkestrel/contract` `^0.0.11`, `@orkestrel/workflow` `^0.0.11` |'
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
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/agents/orkestrel.md', CATALOG_AGENT_TEXT)
			const materializer = new Materializer({ host })
			try {
				const entries: readonly CatalogEntry[] = [
					{ name: '@orkestrel/router', lookup: 'found', version: '0.0.8', dependencies: [] },
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
	it('rewrites a declared range and leaves every other byte of the manifest', () => {
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/package.json', TARGET_MANIFEST_TEXT)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					[
						{ name: '@orkestrel/emitter', range: '^0.0.9' },
						{ name: '@orkestrel/guide', range: '^0.0.9' },
					],
					target,
				)
				expect(result.written).toEqual(['package.json'])
				const text = workspace.read('project/package.json')
				expect(text).toBe(
					TARGET_MANIFEST_TEXT.replace(
						'"@orkestrel/emitter": "^0.0.5"',
						'"@orkestrel/emitter": "^0.0.9"',
					),
				)
				expect(text).toContain('"description": "A sample workspace."')
				expect(text).toContain('"vite": "~8.2.0"')
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('skips a manifest already declaring every range and refuses an undeclared name', () => {
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/package.json', TARGET_MANIFEST_TEXT)
			const materializer = new Materializer({ host })
			try {
				const result = materializer.declare(
					[{ name: '@orkestrel/emitter', range: '^0.0.5' }],
					target,
				)
				expect(result.written).toEqual([])
				expect(result.skipped).toEqual(['package.json'])
				expect(
					readErrorCode(() =>
						materializer.declare([{ name: '@orkestrel/router', range: '^0.0.8' }], target),
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

describe('Materializer remove', () => {
	it('refuses a fabricated foreign verdict for a path the plan owns', () => {
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildVendoredManifest())
			const target = workspace.ensure('project')
			workspace.write('project/.claude/rules/foreign.md', '# Foreign\n')
			workspace.write('project/.claude/rules/untracked.md', '# Untracked\n')
			workspace.write('project/src/core/index.ts', 'export {}\n')
			const materializer = new Materializer({ host })
			try {
				const base = buildVendoredPlan()
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

	it('refuses a tree carrying uncommitted work and a candidate that moved', () => {
		const workspace = createWorkspace()
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
		const workspace = createWorkspace()
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
})
