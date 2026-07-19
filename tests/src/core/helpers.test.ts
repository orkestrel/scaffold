import type { Blueprint, Plan, SyncReport } from '@src/core'
import { fillTemplate } from '@orkestrel/template'
import {
	alignTable,
	auditToReview,
	blueprint,
	blueprintToMembers,
	blueprintToPlan,
	catalogToBlock,
	dependency,
	diffPlan,
	manifestToDependencies,
	override,
	parseBlueprint,
	pascalCase,
	pinPlan,
	planToReview,
	planToSummary,
	rangeToFreshness,
	SCAFFOLD_RANGE,
	SURFACE_MATRIX,
	syncToReview,
	TEMPLATES,
	validateBlueprint,
} from '@src/core'
import ts from 'typescript'
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

describe('catalogToBlock', () => {
	it('renders a Package/Version/Description table, trailing-newline terminated', () => {
		const block = catalogToBlock([
			{ name: '@orkestrel/router', version: '0.0.5', description: 'A tiny hash-router.' },
		])

		expect(block.endsWith('\n')).toBe(true)
		const lines = block.trimEnd().split('\n')
		expect(lines[0]).toContain('Package')
		expect(lines[0]).toContain('Version')
		expect(lines[0]).toContain('Description')
		expect(lines[2]).toContain('@orkestrel/router')
		expect(lines[2]).toContain('0.0.5')
		expect(lines[2]).toContain('A tiny hash-router.')
	})

	it('renders an empty description as an em dash, never a blank cell', () => {
		const block = catalogToBlock([
			{ name: '@orkestrel/contract', version: '0.0.5', description: '' },
		])
		const row = block.trimEnd().split('\n')[2] ?? ''

		expect(row).toContain('—')
	})

	it('code-unit sorts by name regardless of input order', () => {
		const block = catalogToBlock([
			{ name: '@orkestrel/zeta', version: '0.0.1', description: 'z' },
			{ name: '@orkestrel/alpha', version: '0.0.1', description: 'a' },
		])
		const rows = block.trimEnd().split('\n').slice(2)

		expect(rows[0]).toContain('@orkestrel/alpha')
		expect(rows[1]).toContain('@orkestrel/zeta')
	})

	it('dedupes by name — a later entry for a repeated name wins', () => {
		const block = catalogToBlock([
			{ name: '@orkestrel/router', version: '0.0.1', description: 'stale' },
			{ name: '@orkestrel/router', version: '0.0.2', description: 'fresh' },
		])
		const rows = block.trimEnd().split('\n').slice(2)

		expect(rows).toHaveLength(1)
		expect(rows[0]).toContain('0.0.2')
		expect(rows[0]).toContain('fresh')
		expect(rows[0]).not.toContain('stale')
	})

	it('is deterministic — identical input yields byte-identical output', () => {
		const entries = [
			{ name: '@orkestrel/router', version: '0.0.5', description: 'A tiny hash-router.' },
			{ name: '@orkestrel/contract', version: '0.0.5', description: '' },
		]

		expect(catalogToBlock(entries)).toBe(catalogToBlock(entries))
	})

	it('renders an empty entries list as the header + delimiter only', () => {
		const block = catalogToBlock([])
		const lines = block.trimEnd().split('\n')

		expect(lines).toHaveLength(2)
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

	it('infers a root-level, prefix-less foreign path as configs, except the two manifest files', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), [])
		const audit = diffPlan(plan, { 'mystery.config.ts': 'x', 'package-lock.json': 'y' })

		expect(audit.findings.find((finding) => finding.path === 'mystery.config.ts')?.group).toBe(
			'configs',
		)
		const packageLockFinding = audit.findings.find(
			(finding) => finding.path === 'package-lock.json',
		)
		expect(packageLockFinding?.drift).toBe('foreign')
		expect(packageLockFinding?.group).toBe('manifest')
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
		// 'x' is a non-empty but off-DEPENDENCY_NAME_PATTERN name, plus its empty
		// range — 3 dependency-field questions total, not 2.
		expect(
			validation.questions.filter((question) => question.field === 'dependencies').length,
		).toBe(3)
	})

	it('blocks a non-empty dependency name off DEPENDENCY_NAME_PATTERN (the traversal-name gate)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [dependency('@orkestrel/../evil', '^1')],
		})

		expect(validation.valid).toBe(false)
		expect(validation.questions.some((question) => question.field === 'dependencies')).toBe(true)
		expect(validation.questions.every((question) => question.blocking)).toBe(true)
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

	it('accepts a well-formed version and rejects an off-shape version (M2)', () => {
		expect(validateBlueprint({ ...blueprint('router'), version: '1.2.3' }).valid).toBe(true)

		const validation = validateBlueprint({ ...blueprint('router'), version: '1.2' })
		expect(validation.valid).toBe(false)
		expect(validation.questions.some((question) => question.field === 'version')).toBe(true)
		expect(validation.questions.every((question) => question.blocking)).toBe(true)
	})

	it('accepts a well-formed engines range and rejects an off-shape one (M2)', () => {
		expect(validateBlueprint({ ...blueprint('router'), engines: '>=24' }).valid).toBe(true)

		const validation = validateBlueprint({ ...blueprint('router'), engines: '22' })
		expect(validation.valid).toBe(false)
		expect(validation.questions.some((question) => question.field === 'engines')).toBe(true)
		expect(validation.questions.every((question) => question.blocking)).toBe(true)
	})

	it('accepts non-duplicate override paths and blocks a duplicate override path (M3)', () => {
		expect(
			validateBlueprint({
				...blueprint('router'),
				overrides: [override('a.ts', 'x'), override('b.ts', 'y')],
			}).valid,
		).toBe(true)

		const validation = validateBlueprint({
			...blueprint('router'),
			overrides: [override('a.ts', 'x'), override('a.ts', 'y')],
		})
		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) => question.field === 'overrides' && question.text.includes('more than once'),
			),
		).toBe(true)
	})

	it('accepts non-empty override content and blocks empty override content (M4)', () => {
		expect(
			validateBlueprint({ ...blueprint('router'), overrides: [override('a.ts', 'x')] }).valid,
		).toBe(true)

		const validation = validateBlueprint({
			...blueprint('router'),
			overrides: [override('a.ts', '')],
		})
		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) => question.field === 'overrides' && question.text.includes('empty content'),
			),
		).toBe(true)
	})

	it('accepts a name at the 203-char bound and blocks one past it (M6)', () => {
		const atBound = 'a'.repeat(203)
		const overBound = 'a'.repeat(204)

		expect(validateBlueprint({ ...blueprint('router'), name: atBound }).valid).toBe(true)

		const validation = validateBlueprint({ ...blueprint('router'), name: overBound })
		expect(validation.valid).toBe(false)
		expect(validation.questions.some((question) => question.field === 'name')).toBe(true)
	})

	it('accepts NAME_PATTERN-shaped trailing/doubled-hyphen names, matching pascalCase (L4)', () => {
		expect(validateBlueprint({ ...blueprint('router'), name: 'router-' }).valid).toBe(true)
		expect(validateBlueprint({ ...blueprint('router'), name: 'my--router' }).valid).toBe(true)
		expect(pascalCase('router-')).toBe('Router')
		expect(pascalCase('my--router')).toBe('MyRouter')
	})
})

describe('validateBlueprint — peers/extras (per-array rules + cross-array overlap)', () => {
	it('applies the same empty-name/off-pattern/empty-range rules to peers as to dependencies', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			peers: [dependency('', '^1'), { name: 'x', range: '' }],
		})

		expect(validation.valid).toBe(false)
		// Same shape as the dependencies case: empty name (1) + off-pattern name (1) +
		// empty range (1) = 3 peers-field questions.
		expect(validation.questions.filter((question) => question.field === 'peers').length).toBe(3)
	})

	it('blocks a duplicate peer name', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			peers: [dependency('@orkestrel/contract', '^1'), dependency('@orkestrel/contract', '^2')],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) =>
					question.field === 'peers' && question.text.includes('declared more than once'),
			),
		).toBe(true)
	})

	it('applies the same empty-name/off-pattern/empty-range rules to extras as to dependencies', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			extras: [dependency('', '^1'), { name: 'x', range: '' }],
		})

		expect(validation.valid).toBe(false)
		expect(validation.questions.filter((question) => question.field === 'extras').length).toBe(3)
	})

	it('blocks a duplicate extra name', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			extras: [dependency('@orkestrel/contract', '^1'), dependency('@orkestrel/contract', '^2')],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) =>
					question.field === 'extras' && question.text.includes('declared more than once'),
			),
		).toBe(true)
	})

	it('blocks a name declared in both dependencies and peers (positive)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [dependency('@orkestrel/contract', '^1')],
			peers: [dependency('@orkestrel/contract', '^1')],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) =>
					question.field === 'peers' && question.text.includes('both "dependencies" and "peers"'),
			),
		).toBe(true)
	})

	it('accepts distinct names across dependencies and peers (negative)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [dependency('@orkestrel/contract', '^1')],
			peers: [dependency('@orkestrel/emitter', '^1')],
		})

		expect(validation.valid).toBe(true)
	})

	it('blocks a name declared in both dependencies and extras (positive)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [dependency('@orkestrel/contract', '^1')],
			extras: [dependency('@orkestrel/contract', '^1')],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) =>
					question.field === 'extras' && question.text.includes('both "dependencies" and "extras"'),
			),
		).toBe(true)
	})

	it('accepts distinct names across dependencies and extras (negative)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			dependencies: [dependency('@orkestrel/contract', '^1')],
			extras: [dependency('@orkestrel/emitter', '^1')],
		})

		expect(validation.valid).toBe(true)
	})

	it('blocks a name declared in both peers and extras (positive)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			peers: [dependency('@orkestrel/contract', '^1')],
			extras: [dependency('@orkestrel/contract', '^1')],
		})

		expect(validation.valid).toBe(false)
		expect(
			validation.questions.some(
				(question) =>
					question.field === 'extras' && question.text.includes('both "peers" and "extras"'),
			),
		).toBe(true)
	})

	it('accepts distinct names across peers and extras (negative)', () => {
		const validation = validateBlueprint({
			...blueprint('router'),
			peers: [dependency('@orkestrel/contract', '^1')],
			extras: [dependency('@orkestrel/emitter', '^1')],
		})

		expect(validation.valid).toBe(true)
	})
})

describe('manifestToDependencies', () => {
	it('collects @orkestrel deps across dependencies/devDependencies/peerDependencies', () => {
		const manifest = JSON.stringify({
			dependencies: { '@orkestrel/contract': '^0.0.5' },
			devDependencies: { '@orkestrel/emitter': '^0.0.2' },
			peerDependencies: { '@orkestrel/markdown': '^0.0.1' },
		})

		const deps = manifestToDependencies(manifest)

		expect(deps).toEqual([
			{ name: '@orkestrel/contract', range: '^0.0.5' },
			{ name: '@orkestrel/emitter', range: '^0.0.2' },
			{ name: '@orkestrel/markdown', range: '^0.0.1' },
		])
	})

	it('filters out non-@orkestrel and off-pattern names', () => {
		const manifest = JSON.stringify({
			dependencies: { vitest: '^1.0.0', '@orkestrel/../evil': '^1.0.0' },
		})

		expect(manifestToDependencies(manifest)).toEqual([])
	})

	it('deduplicates a name across sections, first occurrence winning', () => {
		const manifest = JSON.stringify({
			dependencies: { '@orkestrel/contract': '^0.0.5' },
			devDependencies: { '@orkestrel/contract': '^0.0.9' },
		})

		expect(manifestToDependencies(manifest)).toEqual([
			{ name: '@orkestrel/contract', range: '^0.0.5' },
		])
	})

	it('returns an empty list for malformed JSON, never throws', () => {
		expect(() => manifestToDependencies('{not json')).not.toThrow()
		expect(manifestToDependencies('{not json')).toEqual([])
	})

	it('returns an empty list for a non-object root or a missing/malformed section', () => {
		expect(manifestToDependencies('[]')).toEqual([])
		expect(manifestToDependencies('{}')).toEqual([])
		expect(manifestToDependencies(JSON.stringify({ dependencies: 'not an object' }))).toEqual([])
	})
})

describe('rangeToFreshness', () => {
	it('is current when the exact pin equals latest', () => {
		expect(rangeToFreshness('^0.0.5', '0.0.5')).toBe('current')
	})

	it('is behind when a newer patch is published', () => {
		expect(rangeToFreshness('^0.0.5', '0.0.7')).toBe('behind')
	})
})

describe('syncToReview', () => {
	function report(overrides: Partial<SyncReport>): SyncReport {
		return {
			target: '.',
			guides: [],
			versions: [],
			clean: true,
			failed: 0,
			...overrides,
		}
	}

	it('titles the report with the behind count across guides and versions', () => {
		const review = syncToReview(
			report({
				guides: [
					{
						name: '@orkestrel/contract',
						path: 'guides/src/contract.md',
						content: 'x',
						freshness: 'behind',
					},
				],
				versions: [
					{ name: '@orkestrel/emitter', range: '^0.0.1', latest: '0.0.2', freshness: 'behind' },
				],
				clean: false,
			}),
		)

		expect(review).toContain('# Sync — 2 behind')
		expect(review).toContain('## Guides')
		expect(review).toContain('## Versions')
	})

	it('elides the Guides/Versions sections when empty', () => {
		const review = syncToReview(report({}))

		expect(review).not.toContain('## Guides')
		expect(review).not.toContain('## Versions')
		expect(review).toContain('# Sync — 0 behind')
		expect(review).toContain('- clean: true')
		expect(review).toContain('- failed: 0')
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

	it('is order-INSENSITIVE — equal content built with fields in a different key order hashes identically (H1)', () => {
		const descriptionLast = blueprint('router', { description: 'A router.' })
		const descriptionFirst: Blueprint = {
			description: descriptionLast.description,
			overrides: descriptionLast.overrides,
			engines: descriptionLast.engines,
			version: descriptionLast.version,
			extras: descriptionLast.extras,
			peers: descriptionLast.peers,
			dependencies: descriptionLast.dependencies,
			surfaces: descriptionLast.surfaces,
			keywords: descriptionLast.keywords,
			name: descriptionLast.name,
		}

		const a = pinPlan({ blueprint: descriptionLast, groups: ['manifest'], artifacts: [] })
		const b = pinPlan({ blueprint: descriptionFirst, groups: ['manifest'], artifacts: [] })

		expect(a.hash).toBe(b.hash)
	})

	it('a parseBlueprint round-trip of a built blueprint pins to the same hash as the builder output (H1)', () => {
		const built = blueprint('router', {
			description: 'A router.',
			dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
		})
		const parsed = parseBlueprint(built)
		expect(parsed).toBeDefined()

		const fromBuilder = pinPlan({ blueprint: built, groups: ['manifest'], artifacts: [] })
		const fromParsed = pinPlan({
			blueprint: parsed ?? built,
			groups: ['manifest'],
			artifacts: [],
		})

		expect(fromParsed.hash).toBe(fromBuilder.hash)
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

	it('an empty groups selection compiles every group — the same artifact set as unscoped (L3)', () => {
		const spec = blueprint('router', { surfaces: ['core'] })
		const scoped = blueprintToPlan(spec, [])
		const unscoped = blueprintToPlan(spec)

		expect(scoped.groups).toEqual(unscoped.groups)
		expect([...scoped.artifacts.map((artifact) => artifact.path)].sort()).toEqual(
			[...unscoped.artifacts.map((artifact) => artifact.path)].sort(),
		)
	})

	it('sorts dependencies in the package.json by a code-unit (not locale-sensitive) comparator (M7)', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				dependencies: [
					dependency('@orkestrel/zebra', '^1'),
					dependency('@orkestrel/Apple', '^1'),
					dependency('@orkestrel/apple', '^1'),
				],
			}),
			['manifest'],
		)
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const dependencies = readRecord(parsed.dependencies)

		expect(Object.keys(dependencies)).toEqual([
			'@orkestrel/Apple',
			'@orkestrel/apple',
			'@orkestrel/zebra',
		])
	})
})

describe('fillTemplate — the delegated missing-placeholder gate (L7)', () => {
	it('throws when a values map omits a placeholder TEMPLATES declares, missing: "error"', () => {
		const definition = TEMPLATES.entity
		expect(definition).toBeDefined()
		if (definition === undefined) return

		expect(() =>
			fillTemplate(
				definition.content,
				{},
				{ missing: 'error', placeholders: definition.placeholders },
			),
		).toThrow(/pascal/)
	})
})

describe('blueprintToPlan — content validation across variants (R1/R2)', () => {
	const PACKAGE_JSON_FIELDS = [
		'name',
		'version',
		'description',
		'keywords',
		'homepage',
		'bugs',
		'license',
		'repository',
		'files',
		'type',
		'sideEffects',
		'main',
		'module',
		'exports',
		'publishConfig',
		'scripts',
		'devDependencies',
		'engines',
	] as const

	const SCRIPT_KEYS = [
		'clean',
		'copy',
		'scaffold',
		'check',
		'check:src',
		'format',
		'format:check',
		'lint:check',
		'test',
		'test:src',
		'test:guides',
		'build',
		'build:src',
		'prepublishOnly',
	] as const

	const variants: readonly { readonly label: string; readonly spec: Blueprint }[] = [
		{ label: 'core-only', spec: blueprint('router', { surfaces: ['core'] }) },
		{ label: 'core+server', spec: blueprint('router', { surfaces: ['core', 'server'] }) },
		{
			label: 'core+browser+server',
			spec: blueprint('router', { surfaces: ['core', 'browser', 'server'] }),
		},
		{ label: 'server-only', spec: blueprint('router', { surfaces: ['server'] }) },
		{ label: 'browser-only', spec: blueprint('router', { surfaces: ['browser'] }) },
	]

	describe.each(variants)('$label', ({ spec }) => {
		it('every computed .json artifact parses, and package.json carries the full documented field set', () => {
			const plan = blueprintToPlan(spec)
			const jsonArtifacts = plan.artifacts.filter(
				(artifact) => artifact.origin === 'computed' && artifact.path.endsWith('.json'),
			)
			expect(jsonArtifacts.length).toBeGreaterThan(0)
			for (const artifact of jsonArtifacts) {
				expect(() => JSON.parse(artifact.content ?? '')).not.toThrow()
			}

			const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
			const parsed = readManifest(manifest?.content)
			for (const field of PACKAGE_JSON_FIELDS) {
				expect(Object.hasOwn(parsed, field)).toBe(true)
			}
			// `types` is present for a single-surface variant, omitted for multi (§4.3).
			expect(Object.hasOwn(parsed, 'types')).toBe(spec.surfaces.length === 1)

			const scripts = readRecord(parsed.scripts)
			for (const key of SCRIPT_KEYS) expect(Object.hasOwn(scripts, key)).toBe(true)
			for (const surface of spec.surfaces) {
				expect(Object.hasOwn(scripts, `check:src:${surface}`)).toBe(true)
				expect(Object.hasOwn(scripts, `build:src:${surface}`)).toBe(true)
				expect(Object.hasOwn(scripts, `test:src:${surface}`)).toBe(true)
			}
		})

		it('every computed .ts artifact parses with zero syntactic diagnostics', () => {
			const plan = blueprintToPlan(spec)
			const tsArtifacts = plan.artifacts.filter(
				(artifact) => artifact.origin === 'computed' && artifact.path.endsWith('.ts'),
			)
			expect(tsArtifacts.length).toBeGreaterThan(0)

			for (const artifact of tsArtifacts) {
				const { diagnostics } = ts.transpileModule(artifact.content ?? '', {
					reportDiagnostics: true,
					compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
				})
				expect(diagnostics ?? []).toHaveLength(0)
			}
		})
	})
})

describe('blueprintToPlan — packageManifest peers/extras', () => {
	it('emits no peerDependencies/peerDependenciesMeta fields when peers is empty', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)

		expect(Object.hasOwn(parsed, 'peerDependencies')).toBe(false)
		expect(Object.hasOwn(parsed, 'peerDependenciesMeta')).toBe(false)
	})

	it('emits peerDependencies sorted code-unit, with peerDependenciesMeta only for optional peers', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				peers: [dependency('@orkestrel/zebra', '^1'), dependency('@orkestrel/apple', '^1', true)],
			}),
			['manifest'],
		)
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const peerDependencies = readRecord(parsed.peerDependencies)
		const peerDependenciesMeta = readRecord(parsed.peerDependenciesMeta)

		expect(Object.keys(peerDependencies)).toEqual(['@orkestrel/apple', '@orkestrel/zebra'])
		expect(peerDependenciesMeta).toEqual({ '@orkestrel/apple': { optional: true } })
		expect(Object.hasOwn(peerDependenciesMeta, '@orkestrel/zebra')).toBe(false)
	})

	it('emits peerDependencies with NO peerDependenciesMeta when no peer is optional', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				peers: [dependency('@orkestrel/contract', '^0.0.5')],
			}),
			['manifest'],
		)
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)

		expect(Object.hasOwn(parsed, 'peerDependencies')).toBe(true)
		expect(Object.hasOwn(parsed, 'peerDependenciesMeta')).toBe(false)
	})

	it('merges extras into devDependencies, the extra range winning on a baseline name collision', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				extras: [dependency('@orkestrel/guide', '^9.9.9')],
			}),
			['manifest'],
		)
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const devDependencies = readRecord(parsed.devDependencies)

		expect(devDependencies['@orkestrel/guide']).toBe('^9.9.9')
	})

	it('carries the scaffold script and pins @orkestrel/scaffold at SCAFFOLD_RANGE', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['manifest'])
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const scripts = readRecord(parsed.scripts)
		const devDependencies = readRecord(parsed.devDependencies)

		expect(scripts.scaffold).toBe('scaffold')
		expect(devDependencies['@orkestrel/scaffold']).toBe(SCAFFOLD_RANGE)
	})

	it('field order: dependencies → devDependencies → peerDependencies → peerDependenciesMeta → engines', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				surfaces: ['core'],
				peers: [dependency('@orkestrel/contract', '^0.0.5', true)],
			}),
			['manifest'],
		)
		const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
		const parsed = readManifest(manifest?.content)
		const orderedKeys = [
			'dependencies',
			'devDependencies',
			'peerDependencies',
			'peerDependenciesMeta',
			'engines',
		]
		const seen = Object.keys(parsed).filter((key) => orderedKeys.includes(key))

		expect(seen).toEqual(orderedKeys)
	})
})

describe('blueprintToPlan — HOST_PATHS retirement + group mapping', () => {
	it('never emits the retired scaffold/mirror script artifacts', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }))
		const paths = plan.artifacts.map((artifact) => artifact.path)

		expect(paths).not.toContain('SCAFFOLD.md')
		expect(paths).not.toContain('scripts/scaffold.sh')
		expect(paths).not.toContain('scripts/mirror.sh')
	})

	it('emits the current SessionStart hook scripts, grouped orchestration', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['orchestration'])

		for (const path of ['scripts/deps.sh', 'scripts/cursor.sh', 'scripts/ollama.sh']) {
			const artifact = plan.artifacts.find((entry) => entry.path === path)
			expect(artifact?.group).toBe('orchestration')
			expect(artifact?.origin).toBe('host')
		}
	})

	it('emits the vendored guide.md mirror, grouped guides', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }), ['guides'])
		const guideMirror = plan.artifacts.find((artifact) => artifact.path === 'guides/src/guide.md')

		expect(guideMirror?.group).toBe('guides')
		expect(guideMirror?.origin).toBe('host')
	})
})

describe('blueprintToPlan — root vite.config.ts content (surface-shape)', () => {
	it('server-only: no srcCore export and no @src/core remap (no sibling core build)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['server'] }), ['configs'])
		const vite = plan.artifacts.find((artifact) => artifact.path === 'vite.config.ts')

		expect(vite?.content).not.toContain('srcCore')
		expect(vite?.content).not.toContain('@src/core')
	})

	it('browser-only: ships Playwright (the sole surface must run in a real browser)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['browser'] }), ['configs'])
		const vite = plan.artifacts.find((artifact) => artifact.path === 'vite.config.ts')

		expect(vite?.content).toContain('@vitest/browser-playwright')
		expect(vite?.content).toContain('createBrowserProvider')
	})

	it('server-only: ships NO Playwright (no browser surface to run)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['server'] }), ['configs'])
		const vite = plan.artifacts.find((artifact) => artifact.path === 'vite.config.ts')

		expect(vite?.content).not.toContain('@vitest/browser-playwright')
		expect(vite?.content).not.toContain('createBrowserProvider')
	})
})

describe('blueprintToPlan — parity test SELF_SPECIFIERS/SPECIFIER_MODULES (surface-shape)', () => {
	it('core+server: specifiers cover the package specifier (primary=core) plus one per declared surface', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core', 'server'] }), ['tests'])
		const parity = plan.artifacts.find(
			(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
		)
		const content = parity?.content ?? ''

		expect(content).toContain(
			"const SELF_SPECIFIERS = ['@orkestrel/router', '@src/core', '@src/server']",
		)
		expect(content).toContain("'@orkestrel/router': 'src/core'")
		expect(content).toContain("'@src/core': 'src/core'")
		expect(content).toContain("'@src/server': 'src/server'")
	})

	it('server-only: the bare package specifier resolves to the sole declared surface (no core to be primary)', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['server'] }), ['tests'])
		const parity = plan.artifacts.find(
			(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
		)
		const content = parity?.content ?? ''

		expect(content).toContain("const SELF_SPECIFIERS = ['@orkestrel/router', '@src/server']")
		expect(content).toContain("'@orkestrel/router': 'src/server'")
	})

	it('browser-only: the bare package specifier resolves to browser', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['browser'] }), ['tests'])
		const parity = plan.artifacts.find(
			(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
		)
		const content = parity?.content ?? ''

		expect(content).toContain("const SELF_SPECIFIERS = ['@orkestrel/router', '@src/browser']")
		expect(content).toContain("'@orkestrel/router': 'src/browser'")
	})
})

describe('blueprintToPlan — guide artifact memberTable dedupe (multi-surface)', () => {
	it('does not duplicate a member row shared by two surfaces', () => {
		const plan = blueprintToPlan(blueprint('router', { surfaces: ['core', 'server'] }), ['guides'])
		const guide = plan.artifacts.find((artifact) => artifact.path === 'guides/src/router.md')
		const content = guide?.content ?? ''
		const factoriesSection =
			(content.split('### Factories')[1] ?? '').split('### Entities')[0] ?? ''
		const entitiesSection = (content.split('### Entities')[1] ?? '').split('### Types')[0] ?? ''

		expect(factoriesSection.split('`createRouter`').length - 1).toBe(1)
		expect(entitiesSection.split('`Router`').length - 1).toBe(1)
	})
})
