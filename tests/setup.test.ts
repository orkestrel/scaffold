import { describe, expect, it } from 'vitest'
import { contentToHex, isHex, PRINT_WIDTH, RELEASE_PROOF_COMMAND, TAB_WIDTH } from '@src/core'
import {
	BENIGN_ACCESSOR_DESCRIPTOR,
	BROWSER_PLUGIN_DECLARATIONS,
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
	buildModules,
	buildOverride,
	buildParserCases,
	buildPlan,
	buildPurityCases,
	buildQuestion,
	buildResolveCall,
	buildSelections,
	buildSetupQuestion,
	buildSnapshot,
	buildUnionCases,
	CLASSIFIER_CASES,
	CLASSIFIER_DECLARATIONS,
	collectWrappers,
	countEmitters,
	DEPENDENCY_TABLES,
	DIFFERING_HEX,
	DOCUMENTED_OPTIONS,
	ENTRY_AUTHORED_TEST,
	ENTRY_AUTHORED_VITE,
	ENTRY_BARREL,
	ENTRY_FAILING_TEST,
	ENTRY_FILES,
	ENTRY_FRESH_TEST,
	ENTRY_GUIDE,
	ENTRY_GUIDE_WRITTEN,
	ENTRY_INDEX,
	ENTRY_MANIFEST,
	ENTRY_NAMELESS,
	ENTRY_NAMELESS_MANIFEST,
	ENTRY_OBSERVATION_PATH,
	ENTRY_OVERLAP,
	ENTRY_OVERLAP_CHILD,
	ENTRY_OVERLAP_INDEX,
	ENTRY_OVERLAP_PARENT,
	ENTRY_OVERLAP_SOURCE,
	ENTRY_OVERLAP_WRITTEN,
	ENTRY_PASSING_TEST,
	ENTRY_PATH,
	ENTRY_PITCH,
	ENTRY_README,
	ENTRY_REPORTED,
	ENTRY_REPORTED_GUIDE,
	ENTRY_RUN_TIMEOUT,
	ENTRY_SOURCE,
	ENTRY_START_TEST,
	ENTRY_UNCARRIED,
	ENTRY_UNDOCUMENTED,
	ENTRY_UNHANDLED_TEST,
	ENTRY_UNINDEXED,
	ENTRY_UNOWNED,
	ENTRY_UNOWNED_INDEX,
	ENTRY_VITE,
	ENVIRONMENT_SELECTIONS,
	extractBindings,
	extractImports,
	FILLED_SETUP_TEXT,
	findStrays,
	findUnassigned,
	findWide,
	FLEET_NAMES,
	HOOK_SETUP_TEXT,
	INSERTION_MANIFEST,
	MANIFEST_SAMPLE,
	MATCHING_HEX,
	MATERIALIZED_PATHS,
	measureWidth,
	MODULE_EMITTERS,
	mutateSeed,
	OWNERSHIPS,
	PATH_CASES,
	PEER_FIXTURE_PACKAGES,
	PLANNED_GLOBAL_SEED,
	PLANNED_SETUP_SEED,
	PLANNED_TEXT,
	PUBLISHED_FACES,
	RANGE_CASES,
	readKeyCount,
	SCRIPT_MANIFEST,
	SCRIPT_PROOF,
	SCRIPT_REGION,
	SCRIPT_SECTION,
	sealParameter,
	selectHostileCase,
	STYLE_IMPORT,
	TAB_COLUMNS,
	TestHolder,
	TestSample,
	THROWING_ACCESSOR_DESCRIPTOR,
	THROWING_GET_TRAP,
	THROWING_KEYS_TRAP,
	THROWING_PROTOTYPE_TRAP,
	TOOLCHAIN_RANGE_PATTERN,
	UNDOCUMENTED_OPTIONS,
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
		expect(base.setup).toStrictEqual([])
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

describe('the entry workspace fixtures', () => {
	it('names the files of the entry workspace and varies each reported workspace by the files it plants', () => {
		expect(Object.keys(ENTRY_FILES).toSorted()).toStrictEqual([
			'README.md',
			'guides/README.md',
			'guides/widget.md',
			'package.json',
			'src/core/index.ts',
			'src/core/widget.ts',
		])
		expect(Object.isFrozen(ENTRY_FILES)).toBe(true)
		const differing = (other: Readonly<Record<string, string>>): readonly string[] =>
			Object.keys(ENTRY_FILES).filter((path) => other[path] !== ENTRY_FILES[path])
		expect(differing(ENTRY_REPORTED).toSorted()).toStrictEqual([
			'README.md',
			'guides/widget.md',
			'src/core/widget.ts',
		])
		expect(differing(ENTRY_NAMELESS).toSorted()).toStrictEqual([
			'README.md',
			'guides/widget.md',
			'package.json',
			'src/core/widget.ts',
		])
		expect(Object.keys(ENTRY_UNINDEXED)).not.toContain('guides/README.md')
		expect(Object.keys(ENTRY_UNOWNED)).toContain('guides/component.md')
		expect(Object.keys(ENTRY_UNOWNED)).not.toContain('guides/widget.md')
		expect(ENTRY_UNCARRIED['guides/README.md']).toContain('[`panel.md`](panel.md)')
		expect(Object.keys(ENTRY_OVERLAP)).toContain('src/core/panels/panel.ts')
		expect(ENTRY_REPORTED['src/core/widget.ts']).toBe(`${ENTRY_SOURCE}${ENTRY_UNDOCUMENTED}`)
	})

	it('declares the guides script in a named manifest and drops the name from the nameless one', () => {
		expect(JSON.parse(ENTRY_MANIFEST)).toMatchObject({
			name: '@sample/widget',
			scripts: { 'test:guides': expect.stringContaining(ENTRY_PATH) },
		})
		const nameless: unknown = JSON.parse(ENTRY_NAMELESS_MANIFEST)
		expect(nameless).not.toHaveProperty('name')
		expect(nameless).toHaveProperty('scripts')
	})

	it('differs between the pitch and the tagline, and between the guide and what a write must produce', () => {
		expect(ENTRY_README).not.toBe(ENTRY_PITCH)
		expect(ENTRY_GUIDE).toContain('> A widget toolkit the sample workspace publishes.')
		const before = ENTRY_GUIDE.split('\n')
		const after = ENTRY_GUIDE_WRITTEN.split('\n')
		expect(after).toHaveLength(before.length)
		// The write owes exactly the three planted cells, so every other line is unmoved.
		expect(before.filter((line, index) => line !== after[index])).toHaveLength(3)
		const frame = ENTRY_OVERLAP_SOURCE.split('\n')
		const written = ENTRY_OVERLAP_WRITTEN.split('\n')
		expect(written).toHaveLength(frame.length)
		expect(frame.filter((line, index) => line !== written[index])).toHaveLength(2)
		expect(ENTRY_OVERLAP_INDEX).toContain('panel.md')
		expect(ENTRY_OVERLAP_PARENT).toContain('`frame`')
		expect(ENTRY_OVERLAP_CHILD).toContain('`frame`')
		expect(ENTRY_REPORTED_GUIDE).toContain('`measure`')
		expect(ENTRY_UNOWNED_INDEX).not.toContain('[`widget.md`]')
		expect(ENTRY_INDEX).toContain('[`widget.md`](widget.md)')
		expect(ENTRY_BARREL).toBe("export * from './widget.js'\n")
	})

	it('points the configuration at the observation path and the authored one at the entry', () => {
		expect(ENTRY_VITE).toContain(ENTRY_OBSERVATION_PATH)
		expect(ENTRY_VITE).not.toContain(ENTRY_PATH)
		expect(ENTRY_AUTHORED_VITE).toContain(ENTRY_PATH)
		expect(ENTRY_AUTHORED_VITE).not.toContain(ENTRY_OBSERVATION_PATH)
		expect(ENTRY_RUN_TIMEOUT).toBeGreaterThan(5_000)
	})

	it('registers one case in every guides project the entry runs', () => {
		for (const project of [
			ENTRY_AUTHORED_TEST,
			ENTRY_PASSING_TEST,
			ENTRY_FRESH_TEST,
			ENTRY_FAILING_TEST,
			ENTRY_START_TEST,
			ENTRY_UNHANDLED_TEST,
		]) {
			expect(project).toMatch(/\bit\(/u)
			expect(project.endsWith('\n')).toBe(true)
		}
		expect(ENTRY_AUTHORED_TEST).toContain('new GuideCommand(')
		expect(ENTRY_FAILING_TEST).toContain("toBe('passed')")
		expect(ENTRY_START_TEST).toContain('vitest-started')
		expect(ENTRY_UNHANDLED_TEST).toContain('Promise.reject')
	})
})

describe('the manifest fixtures', () => {
	it('carries every dependency section the insertion proofs read', () => {
		expect(JSON.parse(INSERTION_MANIFEST)).toMatchObject({
			dependencies: expect.any(Object),
			devDependencies: expect.any(Object),
			peerDependencies: expect.any(Object),
		})
	})

	it('holds the scripts section verbatim and the region that adds the proof to the release command', () => {
		expect(SCRIPT_MANIFEST).toContain(SCRIPT_SECTION)
		expect(JSON.parse(SCRIPT_MANIFEST)).toMatchObject({ scripts: { test: 'vitest run' } })
		expect(SCRIPT_REGION).toContain(SCRIPT_PROOF)
		expect(SCRIPT_REGION[0]?.command).toContain(RELEASE_PROOF_COMMAND)
		expect(SCRIPT_PROOF.accepted).toStrictEqual([])
	})
})

describe('the emitted-template fixtures', () => {
	it('measures a tab as the columns the formatter prints it in', () => {
		expect(TAB_COLUMNS).toBe(' '.repeat(TAB_WIDTH))
		expect(measureWidth('\tx')).toBe(TAB_WIDTH + 1)
		expect(measureWidth('xx')).toBe(2)
	})

	it('matches a stylesheet import and refuses every other import', () => {
		expect(STYLE_IMPORT.test("import './a.css'")).toBe(true)
		expect(STYLE_IMPORT.test("import './a.scss'")).toBe(true)
		expect(STYLE_IMPORT.test("import './a.ts'")).toBe(false)
		expect(STYLE_IMPORT.test("import { a } from './a.css'")).toBe(false)
	})

	it('declares both plugin modules the emitted browser configuration names', () => {
		expect(BROWSER_PLUGIN_DECLARATIONS).toContain("declare module '@vitejs/plugin-vue'")
		expect(BROWSER_PLUGIN_DECLARATIONS).toContain("declare module 'vite-plugin-singlefile'")
	})

	it('enumerates each environment selection once, the empty one and the full one included', () => {
		const labels = ENVIRONMENT_SELECTIONS.map((selection) => selection.join('+'))
		expect(new Set(labels).size).toBe(labels.length)
		expect(labels).toContain('')
		expect(labels).toContain('core+browser+server')
	})

	it('builds a blueprint for every non-empty selection pair in both structural states', () => {
		const blueprints = buildSelections()
		expect(blueprints).toHaveLength((ENVIRONMENT_SELECTIONS.length ** 2 - 1) * 2)
		expect(blueprints.some(({ src, app }) => src.length === 0 && app.length === 0)).toBe(false)
		expect(blueprints.filter(({ bin }) => bin)).toHaveLength(blueprints.length / 2)
		expect(blueprints.every(({ name }) => name === 'sample')).toBe(true)
	})

	it('maps the typescript modules a selection emits and no other file', () => {
		const modules = buildModules(buildBlueprint({ src: ['core'] }))
		expect([...modules.keys()]).toContain('src/core/index.ts')
		expect([...modules.keys()]).toContain('vite.config.ts')
		expect([...modules.keys()].every((path) => path.endsWith('.ts'))).toBe(true)
		expect([...modules.keys()]).not.toContain('package.json')
	})

	it('collects the configuration wrappers a selection writes, keyed by path, and no other file', () => {
		const wrappers = collectWrappers(buildBlueprint({ src: ['core'], app: ['browser'] }))
		expect(Object.keys(wrappers)).toStrictEqual([
			'configs/src/vite.core.config.ts',
			'configs/app/vite.browser.config.ts',
		])
		expect(wrappers['configs/app/vite.browser.config.ts']).toContain('appBrowser()')
		// The control: a selection without the browser environment writes no browser wrapper.
		expect(Object.keys(collectWrappers(buildBlueprint({ src: ['core'] })))).toStrictEqual([
			'configs/src/vite.core.config.ts',
		])
	})

	it('counts, per path, the blueprints that emit it', () => {
		const plain = buildBlueprint({ src: ['core'] })
		const binned = buildBlueprint({ src: ['core'], bin: true })
		const counts = countEmitters([plain, binned])
		expect(counts['src/core/index.ts']).toBe(2)
		expect(counts['src/bin/main.ts']).toBe(1)
		expect(countEmitters([])).toStrictEqual({})
		expect(Object.values(MODULE_EMITTERS).every((count) => count > 0)).toBe(true)
		expect(Object.isFrozen(MODULE_EMITTERS)).toBe(true)
	})

	it('names each peer fixture package once and each published face once', () => {
		expect(new Set(PEER_FIXTURE_PACKAGES.map(([name]) => name)).size).toBe(
			PEER_FIXTURE_PACKAGES.length,
		)
		expect(Object.isFrozen(PEER_FIXTURE_PACKAGES)).toBe(true)
		expect(new Set(PUBLISHED_FACES.map(([factory]) => factory)).size).toBe(PUBLISHED_FACES.length)
		expect(Object.isFrozen(PUBLISHED_FACES)).toBe(true)
	})

	it('lifts each named classifier declaration once and drives each case through the lifted module', () => {
		expect(new Set(CLASSIFIER_DECLARATIONS).size).toBe(CLASSIFIER_DECLARATIONS.length)
		expect(CLASSIFIER_CASES.every(([call]) => call.startsWith('classifier.'))).toBe(true)
		expect(new Set(CLASSIFIER_CASES.map(([call]) => call)).size).toBe(CLASSIFIER_CASES.length)
	})

	it('writes the browser resolver call with the platform fixed', () => {
		expect(buildResolveCall(undefined, { PLAYWRIGHT_BROWSERS_PATH: '/b' }, '/r')).toBe(
			'resolver.resolveBrowser(undefined, \'linux\', {"PLAYWRIGHT_BROWSERS_PATH":"/b"}, "/r")',
		)
		expect(buildResolveCall('chromium-1', {}, '/r')).toBe(
			'resolver.resolveBrowser("chromium-1", \'linux\', {}, "/r")',
		)
	})

	it('reads the names one import clause binds', () => {
		expect(extractBindings('{ a, b as c }')).toStrictEqual(['a', 'c'])
		expect(extractBindings('* as ns')).toStrictEqual(['ns'])
		expect(extractBindings('main')).toStrictEqual(['main'])
		expect(extractBindings('type { x }')).toStrictEqual(['x'])
		expect(extractBindings('')).toStrictEqual([])
	})

	it('reads every import statement whole, across the lines the formatter used', () => {
		const content = "import { a,\n\tb } from 'x'\nimport './s.css'\nconst z = 1\n"
		expect(extractImports(content)).toStrictEqual([
			"import { a,\n\tb } from 'x'",
			"import './s.css'",
		])
		expect(extractImports('const z = 1\n')).toStrictEqual([])
	})

	it('finds the imports a module never mentions, the unassigned imports, and the lines too wide', () => {
		expect(
			findStrays("import { used, unused } from 'x'\nimport * as ns from 'y'\nconsole.log(used)\n"),
		).toStrictEqual(['unused', 'ns'])
		expect(findStrays("import { used } from 'x'\nvoid used\n")).toStrictEqual([])
		expect(
			findUnassigned("import 'effect'\nimport './s.css'\nimport { a } from 'x'\n"),
		).toStrictEqual(["import 'effect'"])
		expect(findWide(`${'a'.repeat(PRINT_WIDTH + 1)}`)).toHaveLength(1)
		expect(findWide(`${'a'.repeat(PRINT_WIDTH)}`)).toStrictEqual([])
		expect(findWide(`\t'${'a'.repeat(PRINT_WIDTH * 2)}',`)).toStrictEqual([])
	})

	it('changes the trailing byte of a seed and plants the sealed declaration', () => {
		expect(mutateSeed('abc')).toBe('ab ')
		expect(mutateSeed('')).toBe(' ')
		expect(PLANNED_SETUP_SEED).toBe('')
		expect(PLANNED_GLOBAL_SEED).toContain('export function setup')
		const open = 'export function policy(override?: UserConfig): UserConfig {'
		expect(sealParameter(`before\n${open}\nafter`)).toBe(
			'before\nexport function policy(): UserConfig {\nafter',
		)
		expect(sealParameter('nothing to seal')).toBe('nothing to seal')
	})
})

describe('the holder', () => {
	it('holds a value, refuses a second, and gives the first up once', () => {
		const holder = new TestHolder<string>()
		expect(() => holder.value).toThrow('The holder holds no value')
		expect(holder.hold('first')).toBe('first')
		expect(holder.value).toBe('first')
		expect(() => holder.hold('second')).toThrow('The holder already holds a value')
		expect(holder.value).toBe('first')
		expect(holder.clear()).toBe('first')
		expect(holder.clear()).toBe(undefined)
		expect(() => holder.value).toThrow('The holder holds no value')
		// A cleared holder binds again, because `clear` released the first value.
		expect(holder.hold('third')).toBe('third')
		expect(holder.value).toBe('third')
	})
})

describe('the command fixtures', () => {
	it('keeps a filled setup module apart from a hook-only one', () => {
		expect(FILLED_SETUP_TEXT).toMatch(/^export const /u)
		expect(HOOK_SETUP_TEXT).not.toMatch(/^export /mu)
		expect(HOOK_SETUP_TEXT).toContain('afterEach')
	})

	it('lists the fleet packages in sorted order under the fleet scope', () => {
		expect(Object.isFrozen(FLEET_NAMES)).toBe(true)
		expect(FLEET_NAMES.every((name) => name.startsWith('@orkestrel/'))).toBe(true)
		expect(FLEET_NAMES.toSorted()).toStrictEqual([...FLEET_NAMES])
	})

	it('states the advisory question with the proof the module wants', () => {
		expect(buildSetupQuestion('/target', 'tests/setupGlobal.ts')).toStrictEqual({
			field: 'setup',
			message:
				"The target at /target carries a test setup module that no proof covers: tests/setupGlobal.ts. Add tests/setupGlobal.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.",
			blocking: false,
		})
	})

	it('lists every documented option once and keeps the undocumented controls outside it', () => {
		expect(new Set(DOCUMENTED_OPTIONS).size).toBe(DOCUMENTED_OPTIONS.length)
		expect(DOCUMENTED_OPTIONS.length).toBeGreaterThan(0)
		expect(UNDOCUMENTED_OPTIONS.some((option) => DOCUMENTED_OPTIONS.includes(option))).toBe(false)
	})
})

describe('the dependency fixtures', () => {
	it('accepts a full-triple caret and refuses a lazy floor', () => {
		expect(TOOLCHAIN_RANGE_PATTERN.test('^0.64.0')).toBe(true)
		expect(TOOLCHAIN_RANGE_PATTERN.test('^6')).toBe(false)
		expect(TOOLCHAIN_RANGE_PATTERN.test('~8.2.2')).toBe(false)
	})

	it('labels each shared table once and holds only string ranges in it', () => {
		const labels = DEPENDENCY_TABLES.map(([label]) => label)
		expect(new Set(labels).size).toBe(labels.length)
		for (const [, table] of DEPENDENCY_TABLES) {
			expect(Object.keys(table).length).toBeGreaterThan(0)
			expect(Object.values(table).every((range) => typeof range === 'string')).toBe(true)
		}
	})
})

describe('the artifact fixtures', () => {
	it('names every ownership tier once and derives the matching and differing bytes from the planned text', () => {
		expect(new Set(OWNERSHIPS).size).toBe(OWNERSHIPS.length)
		expect(MATCHING_HEX).toBe(contentToHex(PLANNED_TEXT))
		expect(isHex(DIFFERING_HEX)).toBe(true)
		expect(DIFFERING_HEX).not.toBe(MATCHING_HEX)
	})

	it('lists the first materialized paths once each, the manifest among them', () => {
		expect(new Set(MATERIALIZED_PATHS).size).toBe(MATERIALIZED_PATHS.length)
		expect(MATERIALIZED_PATHS).toContain('package.json')
	})
})
