import { describe, expect, it } from 'vitest'
import {
	BENIGN_ACCESSOR_DESCRIPTOR,
	BROWSER_RESOLVER_EXPORTS,
	buildAudit,
	buildBlueprint,
	buildCompilerOptions,
	buildContentArtifact,
	buildDependency,
	buildFinding,
	buildGuardCases,
	buildHooks,
	buildHostArtifact,
	buildHostileCases,
	buildHydratedArtifact,
	buildOverride,
	buildParserCases,
	buildPlan,
	buildPurityCases,
	buildQuestion,
	buildSnapshot,
	buildUnionCases,
	MANIFEST_SAMPLE,
	PATH_CASES,
	RANGE_CASES,
	readKeyCount,
	selectHostileCase,
	TestSample,
	THROWING_ACCESSOR_DESCRIPTOR,
	THROWING_GET_TRAP,
	THROWING_KEYS_TRAP,
	THROWING_PROTOTYPE_TRAP,
} from './setup.js'

// The subject is the host-independent test infrastructure `tests/setup.ts` exports,
// read the way the consuming suites read it. Production law is not restated here: a
// case fails when a fixture stopped supplying what it declares, and the mirrored
// suites under `tests/src` own what the guards, parsers, and helpers themselves do.

describe('buildBlueprint', () => {
	it('returns the minimal published workspace and replaces only the fields the caller names', () => {
		const base = buildBlueprint()
		expect(base.name).toBe('sample')
		expect(base.src).toStrictEqual(['core'])
		expect(base.app).toStrictEqual([])
		expect(base.dependencies).toStrictEqual([])
		expect(base.bin).toBe(false)
		expect(base.setup).toBe(false)
		expect(base.showcase).toBe(false)
		expect('description' in base).toBe(false)
		const replaced = buildBlueprint({ src: ['core', 'server'], bin: true })
		expect(replaced.src).toStrictEqual(['core', 'server'])
		expect(replaced.bin).toBe(true)
		// Every field the caller did not name survives, so a replacement is focused
		// rather than a second blueprint written beside the default.
		expect({ ...replaced, src: base.src, bin: base.bin }).toStrictEqual(base)
	})

	it('answers each call with a record of its own that no earlier caller can reach', () => {
		expect(buildBlueprint()).not.toBe(buildBlueprint())
		expect(buildBlueprint()).toStrictEqual(buildBlueprint())
	})
})

describe('the inert value builders', () => {
	it('replaces only the named fields on the dependency, override, and question builders', () => {
		expect(buildDependency()).toStrictEqual({ name: '@orkestrel/emitter', range: '^0.0.5' })
		expect(buildDependency({ optional: true })).toStrictEqual({
			name: '@orkestrel/emitter',
			range: '^0.0.5',
			optional: true,
		})
		expect(buildOverride()).toStrictEqual({ path: 'README.md', content: '# Sample\n' })
		expect(buildOverride({ path: 'NOTES.md' })).toStrictEqual({
			path: 'NOTES.md',
			content: '# Sample\n',
		})
		expect(buildQuestion()).toStrictEqual({
			field: 'src',
			message: 'Unknown environment',
			blocking: true,
		})
		expect(buildQuestion({ blocking: false })).toStrictEqual({
			field: 'src',
			message: 'Unknown environment',
			blocking: false,
		})
	})

	it('gives each artifact the keys its own origin owns and none the other branches own', () => {
		const host = buildHostArtifact()
		const hydrated = buildHydratedArtifact()
		const content = buildContentArtifact()
		expect(host.origin).toBe('host')
		expect(host.ownership).toBe('presence')
		expect('hex' in host).toBe(false)
		expect('content' in host).toBe(false)
		expect(hydrated.origin).toBe('host')
		expect(hydrated.ownership).toBe('content')
		expect(hydrated.hex).toMatch(/^(?:[0-9a-f]{2})+$/u)
		expect('content' in hydrated).toBe(false)
		expect(content.origin).toBe('computed')
		expect(content.content).toBe('# Sample\n')
		expect('hex' in content).toBe(false)
		expect(buildHostArtifact({ path: 'LICENSE' })).toStrictEqual({ ...host, path: 'LICENSE' })
	})

	it('composes the plan from the same blueprint and artifact builders', () => {
		const plan = buildPlan()
		expect(plan.blueprint).toStrictEqual(buildBlueprint())
		expect(plan.groups).toStrictEqual(['manifest'])
		expect(plan.artifacts).toStrictEqual([buildContentArtifact()])
		expect('hash' in plan).toBe(false)
		const replaced = buildPlan({ groups: ['docs'] })
		expect(replaced.groups).toStrictEqual(['docs'])
		expect({ ...replaced, groups: plan.groups }).toStrictEqual(plan)
	})

	it('keys the snapshot to the hexadecimal bytes of the one destination it declares', () => {
		const snapshot = buildSnapshot()
		expect(Object.keys(snapshot)).toStrictEqual(['AGENTS.md'])
		expect(snapshot['AGENTS.md']).toMatch(/^(?:[0-9a-f]{2})+$/u)
	})

	it('records no observed bytes on the one drift branch that reads none', () => {
		const finding = buildFinding()
		expect(finding.path).toBe('AGENTS.md')
		expect(finding.drift).toBe('missing')
		expect('observed' in finding).toBe(false)
		const audit = buildAudit()
		expect(audit.findings).toStrictEqual([buildFinding()])
		expect(audit.questions).toStrictEqual([buildQuestion()])
	})

	it('wires one live listener into the compiler hooks and declares no error handler', () => {
		const hooks = buildHooks()
		expect(Object.keys(hooks)).toStrictEqual(['compile'])
		expect(typeof hooks.compile).toBe('function')
		// A fresh recorder per call, so one suite's recorded calls cannot reach another's.
		expect(buildHooks().compile).not.toBe(hooks.compile)
		const options = buildCompilerOptions()
		expect(Object.keys(options)).toStrictEqual(['on'])
		expect(Object.keys(options.on ?? {})).toStrictEqual(['compile'])
	})
})

describe('the hostile matrix', () => {
	it('rebuilds every value fresh, under labels no two cases share', () => {
		const labels = buildHostileCases().map((hostile) => hostile.label)
		expect(labels.length).toBeGreaterThan(0)
		expect(new Set(labels).size).toBe(labels.length)
		expect(buildHostileCases().map((hostile) => hostile.label)).toStrictEqual(labels)
		// One test's read of a cyclic record or a revoked proxy cannot reach another's,
		// which is the whole reason the matrix is a builder rather than a constant.
		expect(selectHostileCase('cyclic record').value).not.toBe(
			selectHostileCase('cyclic record').value,
		)
	})

	it('selects a labelled case and refuses a label the matrix does not carry', () => {
		expect(selectHostileCase('revoked proxy').label).toBe('revoked proxy')
		expect(selectHostileCase('null-prototype record').owned).toBe(true)
		expect(selectHostileCase('cyclic record').owned).toBe(false)
		expect(() => selectHostileCase('a label no case carries')).toThrow(
			/No hostile case is labelled a label no case carries/u,
		)
	})

	it('counts keys naively, and fails on the reflective hostility a total guard survives', () => {
		expect(readKeyCount({ first: 1, second: 2 })).toBe(2)
		expect(readKeyCount(selectHostileCase('null-prototype record').value)).toBe(1)
		expect(() => readKeyCount(selectHostileCase('throwing ownKeys proxy').value)).toThrow(
			/ownKeys trap/u,
		)
		expect(() => readKeyCount(selectHostileCase('revoked proxy').value)).toThrow(/revoked/u)
	})

	it('throws from each trap the matrix installs and answers from the benign descriptor', () => {
		expect(() => Object.keys(new Proxy({}, THROWING_KEYS_TRAP))).toThrow(/ownKeys trap/u)
		expect(() => Reflect.get(new Proxy({}, THROWING_GET_TRAP), 'hostile')).toThrow(/get trap/u)
		expect(() => Object.getPrototypeOf(new Proxy({}, THROWING_PROTOTYPE_TRAP))).toThrow(
			/getPrototypeOf trap/u,
		)
		const throwing: Record<string, unknown> = {}
		Object.defineProperty(throwing, 'name', THROWING_ACCESSOR_DESCRIPTOR)
		expect(() => throwing.name).toThrow(/accessor/u)
		const benign: Record<string, unknown> = {}
		Object.defineProperty(benign, 'name', BENIGN_ACCESSOR_DESCRIPTOR)
		expect(benign.name).toBe('sample')
	})

	it('constructs a real instance whose prototype the reparented case severs', () => {
		const sample = new TestSample()
		expect(sample.hostile).toBe('x')
		expect(Object.getPrototypeOf(sample)).toBe(TestSample.prototype)
		const reparented = selectHostileCase('reparented instance').value
		expect(Object.getPrototypeOf(reparented)).toBe(null)
		expect(readKeyCount(reparented)).toBe(1)
	})
})

describe('the case tables', () => {
	it('names every guard case once, accepting only values that guard admits', () => {
		const cases = buildGuardCases()
		const names = cases.map((guardCase) => guardCase.name)
		expect(names.length).toBeGreaterThan(0)
		expect(new Set(names).size).toBe(names.length)
		for (const guardCase of cases) {
			expect(guardCase.accepted.length).toBeGreaterThan(0)
			for (const value of guardCase.accepted) expect(guardCase.guard(value)).toBe(true)
			expect(new Set(guardCase.admits).size).toBe(guardCase.admits.length)
			// An escape hatch naming a case the matrix does not carry would exempt a guard
			// from nothing and read as an exemption, so every label is resolved here.
			for (const label of guardCase.admits) expect(selectHostileCase(label).label).toBe(label)
		}
	})

	it('names every parser case once, beside a guard that agrees with it on both sets', () => {
		const cases = buildParserCases()
		const names = cases.map((parserCase) => parserCase.name)
		expect(names.length).toBeGreaterThan(0)
		expect(new Set(names).size).toBe(names.length)
		for (const parserCase of cases) {
			expect(parserCase.accepted.length).toBeGreaterThan(0)
			expect(parserCase.refused.length).toBeGreaterThan(0)
			for (const value of parserCase.accepted) {
				expect(parserCase.guard(value)).toBe(true)
				expect(parserCase.parse(value)).not.toBe(undefined)
			}
			for (const value of parserCase.refused) {
				expect(parserCase.guard(value)).toBe(false)
				expect(parserCase.parse(value)).toBe(undefined)
			}
		}
	})

	it('pairs every union case with a twin that differs by exactly one key', () => {
		const cases = buildUnionCases()
		const labels = cases.map((unionCase) => unionCase.label)
		expect(labels.length).toBeGreaterThan(0)
		expect(new Set(labels).size).toBe(labels.length)
		for (const unionCase of cases) {
			expect(unionCase.guard(unionCase.accepted)).toBe(true)
			expect(unionCase.guard(unionCase.refused)).toBe(false)
			const keys = new Set([...Object.keys(unionCase.accepted), ...Object.keys(unionCase.refused)])
			// A refusal caused by two differences would prove nothing about either, so the
			// pair is held to one, which is what the case's own remarks promise.
			const differing = [...keys].filter(
				(key) => unionCase.accepted[key] !== unionCase.refused[key],
			)
			expect(differing).toHaveLength(1)
		}
	})

	it('names every purity case once and passes it only inputs a mutation could reach', () => {
		const cases = buildPurityCases()
		const helpers = cases.map((purityCase) => purityCase.helper)
		expect(helpers.length).toBeGreaterThan(0)
		expect(new Set(helpers).size).toBe(helpers.length)
		for (const purityCase of cases) {
			expect(() => purityCase.call()).not.toThrow()
			// A primitive records no mutation, so an input list carrying one would let a
			// mutating helper pass the suite that reads this table.
			for (const input of purityCase.inputs) expect(typeof input).toBe('object')
		}
	})

	it('labels every portable-path row once and states both verdicts', () => {
		const labels = PATH_CASES.map((pathCase) => pathCase.label)
		expect(new Set(labels).size).toBe(labels.length)
		expect(new Set(PATH_CASES.map((pathCase) => pathCase.path)).size).toBe(PATH_CASES.length)
		expect(PATH_CASES.some((pathCase) => pathCase.accepted)).toBe(true)
		expect(PATH_CASES.some((pathCase) => !pathCase.accepted)).toBe(true)
	})

	it('states every declared range against its reported version once, in both verdicts', () => {
		const rows = RANGE_CASES.map((rangeCase) => `${rangeCase.range} ${rangeCase.latest}`)
		expect(new Set(rows).size).toBe(rows.length)
		expect(RANGE_CASES.some((rangeCase) => rangeCase.satisfied)).toBe(true)
		expect(RANGE_CASES.some((rangeCase) => !rangeCase.satisfied)).toBe(true)
	})
})

describe('the published fixtures', () => {
	it('freezes the browser resolver surface and names each of its exports once', () => {
		expect(Object.isFrozen(BROWSER_RESOLVER_EXPORTS)).toBe(true)
		expect(new Set(BROWSER_RESOLVER_EXPORTS).size).toBe(BROWSER_RESOLVER_EXPORTS.length)
		expect(BROWSER_RESOLVER_EXPORTS).toContain('resolveBrowser')
		expect(BROWSER_RESOLVER_EXPORTS).toContain('resolvePinnedBrowser')
	})

	it('declares one fleet package and one foreign name in each manifest section', () => {
		expect(JSON.parse(MANIFEST_SAMPLE)).toStrictEqual({
			name: '@orkestrel/sample',
			dependencies: { '@orkestrel/emitter': '^0.0.5', vite: '~8.2.0' },
			devDependencies: { '@orkestrel/emitter': '^9.9.9', '@orkestrel/guide': '^0.0.9' },
		})
	})
})
