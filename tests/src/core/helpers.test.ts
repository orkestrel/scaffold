import type { Plan } from '@src/core'
import {
	alignTable,
	auditToReview,
	blueprint,
	blueprintToMembers,
	blueprintToPlan,
	dependency,
	diffPlan,
	override,
	pascalCase,
	pinPlan,
	planToReview,
	planToSummary,
	SURFACE_MATRIX,
	validateBlueprint,
} from '@src/core'
import { describe, expect, it } from 'vitest'

// Narrows a parsed package.json (or any nested JSON object field) through
// validation rather than an `as` assertion (AGENTS §1).
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readManifest(content: string | undefined): Record<string, unknown> {
	const parsed: unknown = JSON.parse(content ?? '{}')
	if (!isRecord(parsed)) throw new Error('expected package.json to parse to a JSON object')
	return parsed
}

function readRecord(value: unknown): Record<string, unknown> {
	if (!isRecord(value)) throw new Error('expected a JSON object')
	return value
}

describe('pascalCase', () => {
	it('derives PascalCase from a lowercase-hyphen name', () => {
		expect(pascalCase('my-router')).toBe('MyRouter')
	})

	it('handles a single-word name', () => {
		expect(pascalCase('router')).toBe('Router')
	})

	it('handles three-plus hyphenated words', () => {
		expect(pascalCase('my-cool-router')).toBe('MyCoolRouter')
	})

	it('drops empty segments from a doubled or trailing hyphen (edge case)', () => {
		expect(pascalCase('my--router')).toBe('MyRouter')
		expect(pascalCase('router-')).toBe('Router')
		expect(pascalCase('-router')).toBe('Router')
	})
})

describe('blueprintToMembers', () => {
	it('derives the five-member inventory for a single surface', () => {
		const members = blueprintToMembers(blueprint('router', { surfaces: ['core'] }))

		expect(members).toHaveLength(5)
		expect(members.map((entry) => entry.name)).toEqual([
			'Router',
			'RouterOptions',
			'RouterInterface',
			'createRouter',
			'ROUTER_ID',
		])
	})

	it('sets category/surface correctly per member', () => {
		const members = blueprintToMembers(blueprint('router', { surfaces: ['core'] }))

		expect(members.find((entry) => entry.name === 'Router')?.category).toBe('entity')
		expect(members.find((entry) => entry.name === 'RouterOptions')?.category).toBe('type')
		expect(members.find((entry) => entry.name === 'RouterInterface')?.category).toBe('type')
		expect(members.find((entry) => entry.name === 'createRouter')?.category).toBe('factory')
		expect(members.find((entry) => entry.name === 'ROUTER_ID')?.category).toBe('constant')
		expect(members.every((entry) => entry.surface === 'core')).toBe(true)
	})

	it('derives the SCREAMING_SNAKE constant name from a multi-word PascalCase entity', () => {
		const members = blueprintToMembers(blueprint('my-cool-router', { surfaces: ['core'] }))

		expect(members.find((entry) => entry.category === 'constant')?.name).toBe('MY_COOL_ROUTER_ID')
	})

	it('produces five members per declared surface, in surface order', () => {
		const members = blueprintToMembers(blueprint('router', { surfaces: ['core', 'server'] }))

		expect(members).toHaveLength(10)
		expect(members.slice(0, 5).every((entry) => entry.surface === 'core')).toBe(true)
		expect(members.slice(5, 10).every((entry) => entry.surface === 'server')).toBe(true)
	})
})

describe('alignTable', () => {
	it('pads cells to the widest column entry (oxfmt-style width)', () => {
		const table = alignTable(['API', 'Kind'], [['`createRouter`', 'function']])
		const lines = table.split('\n')

		expect(lines[0]).toBe('| API            | Kind     |')
		expect(lines[1]).toBe('| -------------- | -------- |')
		expect(lines[2]).toBe('| `createRouter` | function |')
	})

	it('emits a delimiter row matching each column width', () => {
		const table = alignTable(['A', 'B'], [['xx', 'yyyy']])
		const lines = table.split('\n')

		expect(lines).toHaveLength(3)
		expect(lines[1]?.startsWith('| ---')).toBe(true)
	})

	it('escapes a literal pipe in a cell', () => {
		const table = alignTable(['A'], [['a | b']])

		expect(table).toContain('\\|')
	})

	it('honors an explicit per-column alignment in the delimiter row', () => {
		const table = alignTable(['A', 'B'], [['x', 'y']], ['left', 'right'])
		const delimiter = table.split('\n')[1] ?? ''

		expect(delimiter).toContain(':--')
		expect(delimiter).toContain('--:')
	})

	it('enforces a minimum column width of 3', () => {
		const table = alignTable(['A'], [['x']])
		const lines = table.split('\n')

		expect(lines[0]).toBe('| A   |')
		expect(lines[1]).toBe('| --- |')
	})
})

describe('planToSummary', () => {
	it('tallies artifacts by origin and carries the surfaces/groups', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['source'])
		const summary = planToSummary(plan)

		expect(summary.name).toBe('router')
		expect(summary.surfaces).toEqual(['core'])
		expect(summary.groups).toEqual(['source'])
		expect(summary.artifacts).toBe(plan.artifacts.length)
		expect(summary.host + summary.template + summary.computed).toBe(summary.artifacts)
		expect(summary.template).toBe(plan.artifacts.length)
		expect(summary.host).toBe(0)
		expect(summary.computed).toBe(0)
	})
})

describe('planToReview', () => {
	it('renders the artifact table, member table, and summary section', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const review = planToReview(plan)

		expect(review).toContain('# Scaffolding router')
		expect(review).toContain('## Artifacts')
		expect(review).toContain('## Members')
		expect(review).toContain('## Summary')
		expect(review).toContain('package.json')
		expect(review).toContain('createRouter')
	})
})

describe('auditToReview', () => {
	it('elides aligned findings and groups the rest under headed sections', () => {
		const audit = diffPlan(
			blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest']),
			{},
		)
		const review = auditToReview(audit)

		expect(review).toContain('# Audit')
		expect(review).toContain('- clean: false')
		expect(review).toContain('## missing')
		expect(review).not.toContain('## aligned')
	})

	it('omits every drift-class section when the audit is clean', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const current: Record<string, string> = {}
		for (const artifact of plan.artifacts) {
			if (artifact.content !== undefined) current[artifact.path] = artifact.content
		}
		const review = auditToReview(diffPlan(plan, current))

		expect(review).toContain('- clean: true')
		expect(review).not.toContain('## stale')
		expect(review).not.toContain('## missing')
		expect(review).not.toContain('## foreign')
	})
})

describe('diffPlan — the four drift classes', () => {
	it('is missing when the target lacks the artifact', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const audit = diffPlan(plan, {})

		expect(audit.missing).toBe(1)
		expect(audit.findings[0]?.drift).toBe('missing')
	})

	it('is stale when a template/computed artifact content differs from current', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const [artifact] = plan.artifacts
		const audit = diffPlan(plan, { [artifact?.path ?? '']: 'not the real content' })

		expect(audit.drifted).toBe(1)
		expect(audit.findings.find((finding) => finding.path === artifact?.path)?.drift).toBe('stale')
	})

	it('is aligned when current content exactly matches', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const [artifact] = plan.artifacts
		const current = artifact?.content !== undefined ? { [artifact.path]: artifact.content } : {}
		const audit = diffPlan(plan, current)

		expect(audit.clean).toBe(true)
		expect(audit.findings[0]?.drift).toBe('aligned')
	})

	it('is foreign for a current path the plan does not own', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const audit = diffPlan(plan, { 'src/mystery.ts': 'huh' })

		expect(audit.foreign).toBe(1)
		expect(audit.findings.find((finding) => finding.path === 'src/mystery.ts')?.drift).toBe(
			'foreign',
		)
	})

	it('audits a host-origin artifact by presence only — never stale', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['docs'])
		const hostArtifact = plan.artifacts.find((artifact) => artifact.origin === 'host')
		const audit = diffPlan(plan, { [hostArtifact?.path ?? '']: 'ANYTHING at all, wrong bytes' })

		expect(audit.findings.find((finding) => finding.path === hostArtifact?.path)?.drift).toBe(
			'aligned',
		)
	})

	it('complete is always true for diffPlan (unlike a gated Compiler.audit)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])

		expect(diffPlan(plan, {}).complete).toBe(true)
	})
})

describe('validateBlueprint', () => {
	it('accepts a well-formed blueprint', () => {
		expect(validateBlueprint(blueprint('router')).valid).toBe(true)
	})

	it('blocks an off-NAME_PATTERN name', () => {
		const validation = validateBlueprint({ ...blueprint('router'), name: 'Router!' })

		expect(validation.valid).toBe(false)
		expect(validation.questions.some((question) => question.field === 'name')).toBe(true)
	})

	it('blocks an empty surfaces array', () => {
		const validation = validateBlueprint({ ...blueprint('router'), surfaces: [] })

		expect(validation.valid).toBe(false)
		expect(validation.questions.some((question) => question.field === 'surfaces')).toBe(true)
	})

	it('blocks repeated surfaces (would mint duplicate members)', () => {
		const validation = validateBlueprint({ ...blueprint('router'), surfaces: ['core', 'core'] })

		expect(validation.valid).toBe(false)
	})

	it('blocks an empty dependency name or range', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [dependency('', '^1'), { name: 'x', range: '' }],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.filter((question) => question.field === 'dependencies').length,
		).toBe(2)
	})

	it('blocks a duplicate dependency name', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [
				dependency('@orkestrel/contract', '^1'),
				dependency('@orkestrel/contract', '^2'),
			],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some((question) => question.text.includes('declared more than once')),
		).toBe(true)
	})

	it('returns a Validation (never throws) for a maximally malformed dependency list', () => {
		expect(() =>
			validateBlueprint({
				...blueprint('router'),
				dependencies: [dependency('', ''), dependency('', '')],
			}),
		).not.toThrow()
	})
})

describe('pinPlan', () => {
	it('fills trace and hash', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(typeof plan.hash).toBe('string')
		expect(plan.hash?.length).toBeGreaterThan(0)
		expect(plan.trace).toContain('router')
	})

	it('is deterministic — the same plan pins to the same hash every time', () => {
		const draft: Plan = { blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] }

		expect(pinPlan(draft).hash).toBe(pinPlan(draft).hash)
	})

	it('hashes content only — an already-pinned plan with a stale trace/hash re-pins identically', () => {
		const draft: Plan = { blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] }
		const once = pinPlan(draft)
		const twice = pinPlan({ ...once, trace: 'stale trace', hash: 'stale-hash' })

		expect(twice.hash).toBe(once.hash)
		expect(twice.trace).toBe(once.trace)
	})

	it('a content change (different artifacts) changes the hash', () => {
		const base: Plan = { blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] }
		const changed: Plan = {
			blueprint: blueprint('router'),
			groups: ['manifest'],
			artifacts: [{ path: 'x', group: 'manifest', origin: 'computed', content: 'y' }],
		}

		expect(pinPlan(base).hash).not.toBe(pinPlan(changed).hash)
	})
})

describe('blueprintToPlan — variant coverage + SURFACE_MATRIX wiring', () => {
	it('single-surface core: package.json main/module/types target dist/src/core', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }))
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)

		expect(parsed.main).toBe('./dist/src/core/index.cjs')
		expect(parsed.module).toBe('./dist/src/core/index.js')
		expect(parsed.types).toBe('./dist/src/core/index.d.ts')
	})

	it('single-surface server: root export retargets to dist/src/server (§4.2)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['server'] }))
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const exportsMap = readRecord(parsed.exports)

		expect(parsed.main).toBe('./dist/src/server/index.cjs')
		expect(parsed.types).toBe('./dist/src/server/index.d.ts')
		expect(exportsMap['.']).toBeDefined()
	})

	it('single-surface browser: root export retargets to dist/src/browser, single-format', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['browser'] }))
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)

		expect(parsed.main).toBe('./dist/src/browser/index.js')
		expect(parsed.types).toBe('./dist/src/browser/index.d.ts')
	})

	it('multi-surface: top-level types is OMITTED (§4.3 combination consequence)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core', 'server'] }))
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)

		expect(Object.hasOwn(parsed, 'types')).toBe(false)
		expect(parsed.main).toBe('./dist/src/core/index.cjs')
	})

	it('multi-surface: exports map carries a subpath per non-core surface, keyed by SURFACE_MATRIX.path', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core', 'server'] }))
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const exportsMap = readRecord(parsed.exports)

		expect(Object.hasOwn(exportsMap, SURFACE_MATRIX.server.path)).toBe(true)
		expect(Object.hasOwn(exportsMap, './package.json')).toBe(true)
	})

	it('emits one pair of configs/src files per declared surface, matching SURFACE_MATRIX.configs', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core', 'browser'] }), [
			'configs',
		])
		const paths = plan.artifacts.map((artifact) => artifact.path)

		for (const path of SURFACE_MATRIX.core.configs) expect(paths).toContain(path)
		for (const path of SURFACE_MATRIX.browser.configs) expect(paths).toContain(path)
		expect(paths).not.toEqual(expect.arrayContaining([...SURFACE_MATRIX.server.configs]))
	})

	it('scripts test:src wires one --project flag per SURFACE_MATRIX.project', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core', 'server'] }))
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const scripts = readRecord(parsed.scripts)

		expect(scripts['test:src']).toContain(`--project ${SURFACE_MATRIX.core.project}`)
		expect(scripts['test:src']).toContain(`--project ${SURFACE_MATRIX.server.project}`)
	})

	it('scopes the draft to the requested groups only', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['source'])

		expect(plan.artifacts.every((artifact) => artifact.group === 'source')).toBe(true)
		expect(plan.groups).toEqual(['source'])
	})

	it('template-fill origins: generated source/tests artifacts are template, fully filled (no raw {{ tokens})', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['source', 'tests'])

		expect(plan.artifacts.every((artifact) => artifact.origin === 'template')).toBe(true)
		for (const artifact of plan.artifacts) expect(artifact.content ?? '').not.toContain('{{')
	})

	it('computed origins: the structural package.json manifest never risks the token-collision boundary', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])

		expect(plan.artifacts.every((artifact) => artifact.origin === 'computed')).toBe(true)
	})

	it('host origins: the orchestration group is byte-copied HOST_PATHS only — source, no content', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['orchestration'])

		expect(plan.artifacts.length).toBeGreaterThan(0)
		expect(plan.artifacts.every((artifact) => artifact.origin === 'host')).toBe(true)
		expect(plan.artifacts.every((artifact) => artifact.content === undefined)).toBe(true)
		expect(plan.artifacts.every((artifact) => typeof artifact.source === 'string')).toBe(true)
	})

	it('a vendored dependency yields a byte-copied guides/src mirror, host-origin', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
			}),
			['guides'],
		)
		const mirror = plan.artifacts.find((artifact) => artifact.path === 'guides/src/contract.md')

		expect(mirror?.origin).toBe('host')
	})

	it('a non-vendored dependency yields NO guide mirror at the pure-compile level (Compiler adds the pointer)', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				dependencies: [dependency('@orkestrel/some-outside-thing', '^1.0.0')],
			}),
			['guides'],
		)

		expect(plan.artifacts.some((artifact) => artifact.path.includes('some-outside-thing'))).toBe(
			false,
		)
	})

	it('applies an override by replacing the matching artifact content in place', () => {
		const plan = blueprintToPlan(
			blueprint('router', { surfaces: ['core'], overrides: [override('README.md', 'CUSTOM')] }),
			['docs'],
		)
		const readme = plan.artifacts.find((artifact) => artifact.path === 'README.md')

		expect(readme?.content).toBe('CUSTOM')
	})

	it('returns a pinned plan (trace/hash filled)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])

		expect(typeof plan.hash).toBe('string')
		expect(typeof plan.trace).toBe('string')
	})
})
