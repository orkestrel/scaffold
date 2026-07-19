import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { blueprint, blueprintToPlan, createCompiler, dependency, diffPlan } from '@src/core'
import { createMaterializer, readTarget } from '@src/server'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

// ── Full round-trip: compile → materialize → audit → mutate → audit → repair ──

describe('server integration: compile → materialize → audit → repair', () => {
	it('audits clean after materialize, reports exact stale+missing after a mutation+deletion, and repair restores exactly those', async () => {
		const directory = await buildTempDirectory()
		try {
			const spec = blueprint('gadget', { surfaces: ['core'] })
			const plan = blueprintToPlan(spec)
			const paths = plan.artifacts.map((artifact) => artifact.path)

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			materializer.materialize(plan, directory.path)

			// 1. Audit immediately after materialize: clean — every finding `aligned`.
			const cleanAudit = diffPlan(plan, readTarget(directory.path, paths))
			expect(cleanAudit.clean).toBe(true)
			expect(cleanAudit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
			expect(cleanAudit.findings).toHaveLength(plan.artifacts.length)
			expect(cleanAudit.drifted).toBe(0)
			expect(cleanAudit.missing).toBe(0)

			// 2. Mutate one rendered artifact's content, delete another entirely.
			const renderedArtifacts = plan.artifacts.filter(
				(artifact) => artifact.origin === 'template' || artifact.origin === 'computed',
			)
			const mutated = renderedArtifacts[0]
			const deleted = renderedArtifacts[1]
			if (mutated === undefined || deleted === undefined) {
				throw new Error('expected at least two rendered artifacts to mutate/delete')
			}
			writeFileSync(join(directory.path, mutated.path), 'MUTATED CONTENT — drifted', 'utf8')
			rmSync(join(directory.path, deleted.path))

			// 3. Audit again: exactly one stale, one missing, nothing else.
			const driftedAudit = diffPlan(plan, readTarget(directory.path, paths))
			expect(driftedAudit.clean).toBe(false)
			const staleFindings = driftedAudit.findings.filter((finding) => finding.drift === 'stale')
			const missingFindings = driftedAudit.findings.filter((finding) => finding.drift === 'missing')
			expect(staleFindings.map((finding) => finding.path)).toEqual([mutated.path])
			expect(missingFindings.map((finding) => finding.path)).toEqual([deleted.path])
			expect(driftedAudit.drifted).toBe(1)
			expect(driftedAudit.missing).toBe(1)

			// 4. Repair: writes exactly the mutated + deleted paths, nothing else.
			const result = materializer.repair(plan, driftedAudit, directory.path)
			expect([...result.written].sort()).toEqual([mutated.path, deleted.path].sort())
			expect(readFileSync(join(directory.path, mutated.path), 'utf8')).toBe(mutated.content ?? '')
			expect(readFileSync(join(directory.path, deleted.path), 'utf8')).toBe(deleted.content ?? '')

			// 5. Audit once more: clean again — every finding `aligned`.
			const repairedAudit = diffPlan(plan, readTarget(directory.path, paths))
			expect(repairedAudit.clean).toBe(true)
			expect(repairedAudit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)

			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('a fully-vendored dependency set compiles complete with zero questions; a non-vendored dependency yields a host-origin pointer artifact plus a non-blocking Question', async () => {
		const vendoredDirectory = await buildTempDirectory()
		try {
			const compiler = createCompiler()

			// Every runtime dep this repo itself vendors (contract / emitter /
			// markdown / template / terminal / console) — the package's own gates
			// run green by construction, zero questions.
			const vendoredScaffolding = compiler.compile(
				blueprint('widget', {
					surfaces: ['core'],
					dependencies: [
						dependency('@orkestrel/contract', '^0.0.5'),
						dependency('@orkestrel/emitter', '^0.0.5'),
						dependency('@orkestrel/markdown', '^0.0.5'),
						dependency('@orkestrel/template', '^0.0.5'),
						dependency('@orkestrel/terminal', '^0.0.5'),
						dependency('@orkestrel/console', '^0.0.5'),
					],
				}),
			)
			expect(vendoredScaffolding.complete).toBe(true)
			expect(vendoredScaffolding.questions).toEqual([])
			const vendoredMirror = vendoredScaffolding.plan?.artifacts.find(
				(artifact) => artifact.path === 'guides/src/contract.md',
			)
			if (vendoredMirror === undefined) throw new Error('expected a vendored contract.md mirror')
			expect(vendoredMirror.origin).toBe('host')

			if (vendoredScaffolding.plan === undefined) throw new Error('expected a pinned plan')
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			materializer.materialize(vendoredScaffolding.plan, vendoredDirectory.path)
			materializer.destroy()

			// A dependency OUTSIDE the vendored set: complete result (non-blocking),
			// a host-origin POINTER artifact instead of a fabricated mirror, and the
			// advisory Question surfaced on `Scaffolding.questions`.
			const foreignScaffolding = compiler.compile(
				blueprint('gizmo', {
					surfaces: ['core'],
					dependencies: [dependency('@orkestrel/router', '^0.0.1')],
				}),
			)
			expect(foreignScaffolding.complete).toBe(true)
			const advisory = foreignScaffolding.questions.find((question) =>
				question.text.includes('@orkestrel/router'),
			)
			if (advisory === undefined)
				throw new Error('expected an advisory Question for the non-vendored dep')
			expect(advisory.field).toBe('dependencies')
			expect(advisory.blocking).toBe(false)
			const foreignMirror = foreignScaffolding.plan?.artifacts.find(
				(artifact) => artifact.path === 'guides/src/router.md',
			)
			if (foreignMirror === undefined) throw new Error('expected a router.md pointer artifact')
			expect(foreignMirror.origin).toBe('host')

			compiler.destroy()
		} finally {
			await vendoredDirectory.cleanup()
		}
	})

	it('compiles a multi-surface (core+server) blueprint UNSCOPED, materializes clean, and the disk package.json carries the ./server subpath with no top-level types', async () => {
		const directory = await buildTempDirectory()
		try {
			const compiler = createCompiler()
			const scaffolding = compiler.compile(blueprint('multitool', { surfaces: ['core', 'server'] }))
			expect(scaffolding.complete).toBe(true)
			if (scaffolding.plan === undefined) throw new Error('expected a pinned plan')
			const plan = scaffolding.plan
			const paths = plan.artifacts.map((artifact) => artifact.path)

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			materializer.materialize(plan, directory.path)

			const audit = diffPlan(plan, readTarget(directory.path, paths))
			expect(audit.clean).toBe(true)

			function isRecord(value: unknown): value is Record<string, unknown> {
				return typeof value === 'object' && value !== null && !Array.isArray(value)
			}
			const manifest: unknown = JSON.parse(
				readFileSync(join(directory.path, 'package.json'), 'utf8'),
			)
			if (!isRecord(manifest)) throw new Error('expected package.json to parse to a JSON object')
			expect(Object.prototype.hasOwnProperty.call(manifest, 'types')).toBe(false)
			const exportsMap = manifest.exports
			if (!isRecord(exportsMap)) {
				throw new Error('expected package.json exports to parse to a JSON object')
			}
			expect(Object.prototype.hasOwnProperty.call(exportsMap, './server')).toBe(true)

			materializer.destroy()
			compiler.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})
