import type { ManifestScript, Ownership } from '@src/core'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
	artifactToFinding,
	blueprintToConfigArtifacts,
	blueprintToDevDependencies,
	blueprintToDocumentArtifacts,
	blueprintToGuideArtifacts,
	blueprintToManifest,
	blueprintToOrchestrationArtifacts,
	blueprintToQuestions,
	blueprintToRootVite,
	blueprintToScripts,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	blueprintToWritableScripts,
	CONFIG_TEMPLATES,
	contentToHex,
	createBlueprint,
	ENVIRONMENTS,
	FLOOR_RANGE_PATTERN,
	isFinding,
	ORKESTREL_RANGE_PATTERN,
	RELEASE_PROOF_COMMAND,
	replaceManifestRanges,
	replaceManifestScripts,
} from '@src/core'
import { buildBlueprint, buildContentArtifact } from '../../setup.js'
import { describe, expect, it } from 'vitest'

const OWNERSHIPS: readonly Ownership[] = ['content', 'presence', 'birth']
const PLANNED = '# Sample\n'
const MATCHING = contentToHex(PLANNED)
const DIFFERING = contentToHex('# Edited\n')

describe('FLOOR_RANGE_PATTERN', () => {
	it('accepts a canonical major.minor.patch floor', () => {
		expect(FLOOR_RANGE_PATTERN.test('>=6.0.0')).toBe(true)
	})

	it('refuses every other range form', () => {
		expect(FLOOR_RANGE_PATTERN.test('>=6')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('>=6.0')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('>6.0.0')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('>= 6.0.0')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('^6.0.3')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('~8.2.0')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('6.0.0')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('>=6.0.0-beta.1')).toBe(false)
		expect(FLOOR_RANGE_PATTERN.test('>=6.0.0 <7.0.0')).toBe(false)
	})
})

describe('ORKESTREL_RANGE_PATTERN', () => {
	// Pre-1.0 is any `0.x`. The pattern once accepted `0.0.x` alone, which would
	// have refused the first fleet package to publish a minor release — and
	// because `catalog` pins to whatever the registry names, one such release
	// would block every later run against a workspace already pinned to it.
	it('accepts a caret-pinned range at any pre-1.0 minor', () => {
		expect(ORKESTREL_RANGE_PATTERN.test('^0.0.23')).toBe(true)
		expect(ORKESTREL_RANGE_PATTERN.test('^0.1.0')).toBe(true)
		expect(ORKESTREL_RANGE_PATTERN.test('^0.12.4')).toBe(true)
	})

	it('refuses a range that is not caret-pinned below 1.0', () => {
		expect(ORKESTREL_RANGE_PATTERN.test('^1.0.0')).toBe(false)
		expect(ORKESTREL_RANGE_PATTERN.test('~0.1.0')).toBe(false)
		expect(ORKESTREL_RANGE_PATTERN.test('0.1.0')).toBe(false)
		expect(ORKESTREL_RANGE_PATTERN.test('^0.1')).toBe(false)
	})
})

describe('replaceManifestRanges', () => {
	it('raises writable declarations while preserving peer declarations and metadata', () => {
		const manifest = `{
	"dependencies": {
		"typescript": "^6.0.3"
	},
	"devDependencies": {
		"typescript": "^6.0.3"
	},
	"peerDependencies": {
		"typescript": ">=6.0.0"
	},
	"peerDependenciesMeta": {
		"typescript": {
			"optional": true
		}
	},
	"overrides": {
		"typescript": "6.0.3"
	},
	"resolutions": {
		"typescript": "6.0.2"
	}
}
`
		const replaced = replaceManifestRanges(manifest, {
			runtime: [{ name: 'typescript', range: '^6.0.4' }],
			development: [{ name: 'typescript', range: '^6.0.4' }],
		})
		expect(replaced).toBe(
			manifest
				.replace('"typescript": "^6.0.3"', '"typescript": "^6.0.4"')
				.replace('"typescript": "^6.0.3"', '"typescript": "^6.0.4"'),
		)
		// A name shared with a writable declaration does not grant ownership of
		// its peer range or metadata.
		expect(replaced).toContain('"typescript": ">=6.0.0"')
		expect(replaced).toContain('"optional": true')
		expect(replaced).toContain('"overrides": {\n\t\t"typescript": "6.0.3"')
		expect(replaced).toContain('"resolutions": {\n\t\t"typescript": "6.0.2"')
	})
})

const SCRIPT_MANIFEST = `{
	"name": "@orkestrel/sample",
	"description": "Kept exactly as written, punctuation and all.",
	"scripts": {
		"test": "vitest run",
		"prepublishOnly": "npm test"
	},
	"dependencies": {
		"@orkestrel/emitter": "^0.0.5"
	}
}
`

const SCRIPT_SECTION = `"scripts": {
		"test": "vitest run",
		"prepublishOnly": "npm test"
	}`

const SCRIPT_PROOF: ManifestScript = {
	name: 'test:distribution',
	command: 'vitest run --project distribution',
	accepted: [],
}

const SCRIPT_REGION: readonly ManifestScript[] = [
	{
		name: 'prepublishOnly',
		command: `npm test && ${RELEASE_PROOF_COMMAND}`,
		accepted: ['npm test'],
	},
	SCRIPT_PROOF,
]

describe('blueprintToWritableScripts', () => {
	it('names the scripts the packed-package proof needs, and the chain that predates them', () => {
		const blueprint = buildBlueprint({ src: ['core'] })
		const region = blueprintToWritableScripts(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(region.map((script) => script.name)).toEqual(['test:distribution', 'prepublishOnly'])
		expect(region.map((script) => script.command)).toEqual([
			scripts['test:distribution'],
			scripts.prepublishOnly,
		])
		// The predecessor is the same chain without the release row, which is what
		// a target scaffolded before the proof existed still holds.
		expect(region[0]?.accepted).toEqual([])
		expect(region[1]?.accepted).toEqual([
			`${scripts.prepublishOnly ?? ''}`.replace(` && ${RELEASE_PROOF_COMMAND}`, ''),
		])
		expect(region[1]?.accepted[0]).not.toContain(RELEASE_PROOF_COMMAND)
	})

	it('names nothing for a workspace that publishes no source', () => {
		expect(blueprintToWritableScripts(buildBlueprint({ src: [], app: ['core'] }))).toEqual([])
	})
})

describe('replaceManifestScripts', () => {
	it('replaces a recognized predecessor and appends an absent script, moving no other byte', () => {
		const written = replaceManifestScripts(SCRIPT_MANIFEST, SCRIPT_REGION)

		// The expectation is the input with exactly the replaced ranges edited, so
		// the assertion is byte identity everywhere else rather than a spot check.
		expect(written).toBe(
			SCRIPT_MANIFEST.replace(
				'\t\t"prepublishOnly": "npm test"\n',
				`\t\t"prepublishOnly": "npm test && ${RELEASE_PROOF_COMMAND}",\n\t\t"test:distribution": "vitest run --project distribution"\n`,
			),
		)
		expect(written).toContain('"description": "Kept exactly as written, punctuation and all."')
		expect(written).toContain('"test": "vitest run"')
		expect(written).toContain('"@orkestrel/emitter": "^0.0.5"')
	})

	it('accepts the chain the generated manifest carried before the proof existed', () => {
		const blueprint = buildBlueprint({ src: ['core'] })
		const region = blueprintToWritableScripts(blueprint)
		const current = blueprintToManifest(blueprint)
		const previous = current
			.replaceAll(/\t\t"test:distribution": .*\n/gu, '')
			.replace(` && ${RELEASE_PROOF_COMMAND}`, '')
		const written = replaceManifestScripts(previous, region)

		expect(previous).not.toContain('test:distribution')
		expect(written).toBeDefined()
		expect(written).toContain(RELEASE_PROOF_COMMAND)
		expect(JSON.parse(written ?? '')).toMatchObject({
			scripts: {
				'test:distribution': region[0]?.command,
				prepublishOnly: region[1]?.command,
			},
		})
	})

	it('leaves a manifest that already carries every command exactly as it found it', () => {
		const written = replaceManifestScripts(SCRIPT_MANIFEST, SCRIPT_REGION)

		expect(replaceManifestScripts(written ?? '', SCRIPT_REGION)).toBe(written)
	})

	it('refuses a customized value and writes nothing at all', () => {
		const customized = SCRIPT_MANIFEST.replace(
			'"prepublishOnly": "npm test"',
			'"prepublishOnly": "npm test && npm run verify"',
		)

		expect(replaceManifestScripts(customized, SCRIPT_REGION)).toBeUndefined()
		// The refusal is whole: the recognized member of the region is not written
		// either, so no manifest ends up half converted.
		expect(customized).not.toContain('test:distribution')
	})

	it('refuses a script declared as something other than a string', () => {
		const malformed = SCRIPT_MANIFEST.replace('"prepublishOnly": "npm test"', '"prepublishOnly": 1')

		expect(replaceManifestScripts(malformed, SCRIPT_REGION)).toBeUndefined()
	})

	it('refuses text carrying no readable scripts object', () => {
		expect(replaceManifestScripts('{\n\t"name": "sample"\n}\n', SCRIPT_REGION)).toBeUndefined()
		expect(replaceManifestScripts('not json', SCRIPT_REGION)).toBeUndefined()
	})

	// Every named script is absent from an empty region, and `ManifestScript` says an
	// absent script is always writable. The region therefore takes the whole set as its
	// first entries rather than refusing the write.
	it('writes every named script into an empty region, moving no byte outside it', () => {
		const empty = SCRIPT_MANIFEST.replace(SCRIPT_SECTION, '"scripts": {}')

		// The expectation is the emptied manifest with exactly the region's interior
		// filled, so the assertion is byte identity everywhere else rather than a spot
		// check. The first entry carries no leading comma.
		expect(replaceManifestScripts(empty, SCRIPT_REGION)).toBe(
			empty.replace(
				'"scripts": {}',
				`"scripts": {\n\t\t"prepublishOnly": "npm test && ${RELEASE_PROOF_COMMAND}",\n\t\t"test:distribution": "vitest run --project distribution"\n\t}`,
			),
		)
	})

	// The indentation comes from the region's own opening line, because no sibling entry
	// exists to copy it from. A top-level key sits one level in, so that line's leading
	// whitespace is one level and an entry inside the region sits at two.
	it('derives an empty region indentation from the line its own brace opens on', () => {
		const spaced = '{\n  "scripts": {}\n}\n'

		expect(replaceManifestScripts(spaced, [SCRIPT_PROOF])).toBe(
			'{\n  "scripts": {\n    "test:distribution": "vitest run --project distribution"\n  }\n}\n',
		)
		// The region's interior is the write's own range, so a brace pair already split
		// over lines lands the same bytes as a closed one rather than keeping whatever
		// whitespace sat between the braces.
		expect(replaceManifestScripts('{\n\t"scripts": {\n\t}\n}\n', [SCRIPT_PROOF])).toBe(
			'{\n\t"scripts": {\n\t\t"test:distribution": "vitest run --project distribution"\n\t}\n}\n',
		)
	})

	// A manifest carrying no line break before the region is written on one line, exactly
	// as the append path writes a one-line region it finds already populated.
	it('writes an empty region inline when no line break precedes it', () => {
		const inline = '{"name":"sample","scripts":{}}\n'

		expect(replaceManifestScripts(inline, [SCRIPT_PROOF])).toBe(
			'{"name":"sample","scripts":{"test:distribution": "vitest run --project distribution"}}\n',
		)
	})

	it('reads only the top-level scripts object', () => {
		const nested = `{
	"workspaces": {
		"scripts": {
			"prepublishOnly": "echo nested"
		}
	},
	"scripts": {
		"test": "vitest run",
		"prepublishOnly": "npm test"
	}
}
`
		const written = replaceManifestScripts(nested, SCRIPT_REGION)

		expect(written).toContain('"prepublishOnly": "echo nested"')
		expect(written).toContain(`"prepublishOnly": "npm test && ${RELEASE_PROOF_COMMAND}"`)
	})

	it('returns the text untouched when the region names nothing', () => {
		expect(replaceManifestScripts(SCRIPT_MANIFEST, [])).toBe(SCRIPT_MANIFEST)
	})
})

describe('blueprintToDevDependencies compile tooling', () => {
	it('keeps library publishing tools in a source workspace', () => {
		const planned = blueprintToDevDependencies(buildBlueprint({ src: ['core'], app: [] }))

		expect(planned['@microsoft/api-extractor']).toBe('^7.59.0')
		expect(planned['vite-plugin-dts']).toBe('^5.0.3')
	})

	it('omits library publishing tools from an app-only workspace', () => {
		const planned = blueprintToDevDependencies(
			buildBlueprint({ src: [], app: ['core', 'browser'], bin: false }),
		)

		expect(planned['@microsoft/api-extractor']).toBeUndefined()
		expect(planned['vite-plugin-dts']).toBeUndefined()
	})

	it('keeps library publishing tools in an executable workspace', () => {
		const planned = blueprintToDevDependencies(buildBlueprint({ src: [], app: [], bin: true }))

		expect(planned['@microsoft/api-extractor']).toBe('^7.59.0')
		expect(planned['vite-plugin-dts']).toBe('^5.0.3')
	})

	it('keeps the browser application toolchain in an app-only workspace', () => {
		const planned = blueprintToDevDependencies(
			buildBlueprint({ src: [], app: ['core', 'browser'], bin: false }),
		)

		// The claim is membership: an app-only workspace keeps the browser toolchain
		// and the shared base. Each range is stated here rather than read back from
		// the table the emitter read, which would pass for whatever that table said.
		// A floor raise moves these lines, which is the point: the raise is a
		// deliberate step and this is where a workspace receives it.
		expect(planned['@orkestrel/html']).toBe('^0.0.5')
		expect(planned.vue).toBe('^3.5.40')
		expect(planned['@orkestrel/test']).toBe('^0.0.11')
	})

	it('keeps a shared toolchain pin when a foreign peer declares its floor', () => {
		const planned = blueprintToDevDependencies(
			buildBlueprint({ peers: [{ name: 'typescript', range: '>=6.0.0' }] }),
		)

		expect(planned.typescript).toBe('^6.0.3')
	})

	it('emits a conditional toolchain pin beside a foreign peer floor', () => {
		const manifest = blueprintToManifest(
			buildBlueprint({
				app: ['browser'],
				peers: [{ name: 'vue', range: '>=3.5.0' }],
			}),
		)

		expect(manifest).toContain('"vue": "^3.5.40"')
		expect(manifest).toContain('"peerDependencies": {\n\t\t"vue": ">=3.5.0"\n\t}')
	})

	it('adds a fleet peer that the shared toolchain does not pin', () => {
		const planned = blueprintToDevDependencies(
			buildBlueprint({ peers: [{ name: '@orkestrel/router', range: '^0.0.10' }] }),
		)

		expect(planned['@orkestrel/router']).toBe('^0.0.10')
	})

	it('emits a foreign peer floor while keeping its shared development pin', () => {
		const manifest = blueprintToManifest(
			buildBlueprint({ peers: [{ name: 'typescript', range: '>=6.0.0' }] }),
		)

		expect(manifest).toContain('"typescript": "^6.0.3"')
		expect(manifest).toContain('"peerDependencies": {\n\t\t"typescript": ">=6.0.0"\n\t}')
	})

	it('keeps a generated source workspace manifest byte-stable', async () => {
		const manifest = blueprintToManifest(createBlueprint('sample', { src: ['core'] }))
		const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(manifest))
		const hex = [...new Uint8Array(digest)]
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('')

		// The digest covers the self-pin, so a release moves it. Update it with the
		// version bump in the same change; it is the tripwire for every other byte.
		expect(hex).toBe('335fc68666ccf43bffceb5b8a2e2a10e9b454b5834712a0995c43e0b8c63fcfe')
	})
})

describe('blueprintToScripts config projects', () => {
	it('registers and gates setup proofs only when the blueprint selects them', () => {
		const fixture = readFileSync(
			resolve('tests/src/core/fixtures/setup-false-manifest.txt'),
			'utf8',
		)
		const absent = createBlueprint('sample', { src: ['core'], setup: false })
		const present = createBlueprint('sample', { src: ['core'], setup: true })
		const configuration = blueprintToRootVite(present)
		const scripts = blueprintToScripts(present)

		expect(blueprintToManifest(absent)).toBe(fixture)
		expect(blueprintToRootVite(absent)).not.toContain("name: { label: 'setup',")
		expect(blueprintToScripts(absent)).not.toHaveProperty('test:setup')
		expect(blueprintToScripts(absent).test).not.toContain('test:setup')
		expect(configuration).toContain('export const setup = (options?: UserConfig): UserConfig =>')
		expect(configuration).toContain("name: { label: 'setup', color: 'white' }")
		expect(configuration).toContain("include: ['tests/setup*.test.ts']")
		expect(configuration).toContain("setupFiles: ['./tests/setup.ts']")
		expect(configuration).toContain("environment: 'node'")
		expect(configuration).toContain('browser: { enabled: false }')
		expect(scripts['test:setup']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project setup',
		)
		expect(scripts.test).toContain('npm run test:setup')
	})

	it('emits the probe workbench outside every gate', () => {
		const scripts = blueprintToScripts(buildBlueprint())
		expect(scripts['test:bench']).toBe(
			'vitest bench --config vite.config.ts --no-cache --project probe',
		)
		expect(scripts['test:probe']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe',
		)
		expect(scripts.test).not.toContain('test:bench')
		expect(scripts.test).not.toContain('test:probe')
		expect(scripts.prepublishOnly).not.toContain('test:bench')
		expect(scripts.prepublishOnly).not.toContain('test:probe')
	})

	it('rebuilds publishing workspaces before packing', () => {
		const published = blueprintToScripts(buildBlueprint())
		const application = blueprintToScripts(createBlueprint('demo', { src: [], app: ['core'] }))

		expect(published.prepack).toBe(published.build)
		expect(application.prepack).toBeUndefined()
		expect(published.test).not.toContain('prepack')
		expect(published.prepublishOnly).not.toContain('prepack')
	})

	it('does not invent test projects from vendor names alone', () => {
		const scripts = blueprintToScripts(buildBlueprint({ vendors: ['ollama'] }))
		expect(scripts['test:service']).toBeUndefined()
		expect(scripts['test:service:ollama']).toBeUndefined()
		expect(scripts.prepublishOnly).not.toContain('test:service')
	})

	// The vendor list and the live-service axis are separate facts, so each is measured
	// against the other's absence rather than only against its own presence.
	it('gates the live-service proof on its readiness module rather than on a vendor list', () => {
		const live = blueprintToScripts(buildBlueprint({ service: true }))
		expect(live['test:service']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project service',
		)
		expect(live.test).not.toContain('test:service')
		expect(live.prepublishOnly).toContain('npm run test:service')

		const vendors = blueprintToScripts(buildBlueprint({ vendors: ['ollama'], service: false }))
		expect(vendors['test:service']).toBeUndefined()
		expect(vendors.prepublishOnly).not.toContain('test:service')
	})

	// The one proof that leaves `integration`'s gate rather than joining it: it
	// measures this package against official tooling and drives nothing external,
	// so it costs a hermetic run and belongs to `test`.
	it('runs the conformance proof from the default gate and never from the publish gate alone', () => {
		const measured = blueprintToScripts(buildBlueprint({ conformance: true }))
		expect(measured['test:conformance']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance',
		)
		expect(measured.test).toContain('npm run test:conformance')
		expect(measured.prepublishOnly).toContain('npm test')
		expect(measured.prepublishOnly).not.toContain('npm run test:conformance')

		const absent = blueprintToScripts(buildBlueprint())
		expect(absent['test:conformance']).toBeUndefined()
		expect(absent.test).not.toContain('test:conformance')
	})

	it('registers and gates the planned guides proof', () => {
		const blueprint = buildBlueprint({ guides: true })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).toContain('export const guides = (options?: UserConfig): UserConfig =>')
		expect(configuration).toContain("include: ['tests/guides.test.ts']")
		expect(configuration).toContain(
			'projects: [srcCore, policy, config, guides, distribution, probe]',
		)
		expect(configuration).not.toContain('isExactCaseFile')
		expect(scripts['test:guides']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project guides',
		)
		expect(scripts.test).toContain('npm run test:guides')
	})

	it('omits the unplanned guides proof', () => {
		const blueprint = createBlueprint('sample', { src: ['core'] })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(blueprint.guides).toBe(false)
		expect(configuration).not.toContain("name: { label: 'guides',")
		expect(scripts['test:guides']).toBeUndefined()
		expect(scripts.test).not.toContain('test:guides')
	})

	it('registers the distribution proof only in the release-mode publish gate', () => {
		const blueprint = buildBlueprint({ src: ['core'] })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).toContain(
			'export const distribution = (options?: UserConfig): UserConfig =>',
		)
		expect(configuration).toContain("include: ['tests/distribution.test.ts']")
		expect(configuration).toContain('projects: [srcCore, policy, config, distribution, probe]')
		expect(scripts['test:distribution']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution',
		)
		expect(scripts.test).not.toContain('test:distribution')
		expect(scripts.prepublishOnly).toContain('npm run test:distribution -- --mode release')
	})

	it('withholds publish-only machinery from a private workspace', () => {
		const blueprint = createBlueprint('demo', { app: ['core'], service: true })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).toContain("name: { label: 'service', color: 'red' }")
		expect(configuration).not.toContain("name: { label: 'distribution',")
		expect(scripts).not.toHaveProperty('prepublishOnly')
		expect(scripts).not.toHaveProperty('test:distribution')
		expect(scripts.test).toContain('npm run test:service')
		expect(scripts['test:service']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project service',
		)
	})

	it('keeps publish proofs in the publish gate for a source workspace', () => {
		const blueprint = createBlueprint('demo', { src: ['core'], service: true })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).toContain("name: { label: 'distribution', color: 'cyan' }")
		expect(scripts.test).not.toContain('test:service')
		expect(scripts.prepublishOnly).toContain('npm run test:distribution -- --mode release')
		expect(scripts.prepublishOnly).toContain('npm run test:service')
	})

	it('omits the distribution proof from a workspace that packs no published source', () => {
		const blueprint = buildBlueprint({ src: [], app: ['core'] })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).not.toContain("name: { label: 'distribution',")
		expect(scripts['test:distribution']).toBeUndefined()
		expect(scripts.test).not.toContain('test:distribution')
		expect(scripts).not.toHaveProperty('prepublishOnly')
	})

	// Publishing decides the artifact exactly as it decides the project, so the two
	// cannot disagree: a workspace registering the project always receives a proof
	// for it to run, and a workspace registering neither receives no orphan file.
	it('plans the packed-package proof for a publishing workspace and for no other', () => {
		const planned = blueprintToTestArtifacts(buildBlueprint({ src: ['core'] })).filter(
			({ path }) => path === 'tests/distribution.test.ts',
		)

		expect(planned).toHaveLength(1)
		expect(planned[0]?.ownership).toBe('presence')
		expect(planned[0]?.origin).toBe('template')
		expect(planned[0]?.group).toBe('tests')
		expect(
			blueprintToTestArtifacts(buildBlueprint({ src: [], app: ['core'] })).map(({ path }) => path),
		).not.toContain('tests/distribution.test.ts')
	})

	// Selection inside the generated proof reads the export TARGET, because
	// `@orkestrel/indexeddb` publishes its browser face at the root subpath and a
	// rule keyed on the subpath name drives that bundle through Node instead.
	it('writes a proof that selects a browser entry by its target rather than its name', () => {
		const [proof] = blueprintToTestArtifacts(buildBlueprint({ src: ['browser'] })).filter(
			({ path }) => path === 'tests/distribution.test.ts',
		)
		const content = proof?.content ?? ''

		expect(content).toContain("const BROWSER_OUTPUT = './dist/src/browser/'")
		expect(content).toContain('module !== undefined && module.startsWith(BROWSER_OUTPUT)')
		expect(content).toMatch(/never off the subpath name/u)
		// The falsifying shape, stated as the whole class rather than as the one
		// spelling: any comparison of a subpath against a `./` literal is a rule keyed
		// on the name. Building a specifier from the root subpath is not one, so
		// `subpath === '.'` stays and every `'./…'` comparison is refused.
		expect(
			[...content.matchAll(/subpath\s*(?:===|!==|\.startsWith|\.includes)\s*\(?'[^']*'/gu)].map(
				([match]) => match,
			),
		).toStrictEqual(["subpath === '.'"])
		expect(content).toContain(
			"import { resolveBrowser, resolvePinnedBrowser } from '../configs/browsers.js'",
		)
		// Each consumer format resolves its own declaration, because TypeScript decides a
		// consumer's format from the declaration rather than from the runtime target: a
		// `.d.cts` declaration over an ES module target is accepted and a `.d.mts` one over
		// a CommonJS target is refused. The Node resolutions carry `node` between `types`
		// and the format condition and the bundler resolution does not, so a browser drive
		// compares against the declaration a bundler consumer reads. The locator takes the
		// installed root because a `.d.ts` declaration's format comes from the nearest
		// manifest above the declaration itself. `tests/src/core/templates.test.ts` drives
		// what it answers.
		expect(content).toContain("module: ['types', 'node', 'import'],")
		expect(content).toContain("commonjs: ['types', 'node', 'require'],")
		expect(content).toContain('const declaration = readDeclaration(entry, installed)')
		// The workspace that publishes no browser face carries neither the launcher
		// nor its imports, so its own `lint:check` sees no binding it never uses.
		const [core] = blueprintToTestArtifacts(buildBlueprint({ src: ['core'] })).filter(
			({ path }) => path === 'tests/distribution.test.ts',
		)
		const plain = core?.content ?? ''

		expect(plain).toContain("const BROWSER_OUTPUT = './dist/src/browser/'")
		expect(plain).not.toContain('playwright')
		expect(plain).not.toContain('configs/browsers.js')
	})

	// A subpath the loop skips leaves no trace of its own: no runtime test, no
	// declaration comparison, and no place in the resolution compile. So the proof
	// partitions every published subpath into what it drives, what it excludes, and
	// what it reports. The `./package.json` manifest pointer and a stylesheet target
	// are published for a reader rather than an importer, so what reddens is a target
	// a runtime loads for its names carrying no declaration. The extension on the
	// target's own file name decides which of those it is, and
	// `tests/src/core/templates.test.ts` drives that reading against real targets.
	it('writes a proof that partitions every published subpath rather than dropping one', () => {
		const [proof] = blueprintToTestArtifacts(buildBlueprint({ src: ['core'] })).filter(
			({ path }) => path === 'tests/distribution.test.ts',
		)
		const content = proof?.content ?? ''

		expect(content).toContain("const MODULE_EXTENSIONS = ['.js', '.mjs', '.cjs']")
		expect(content).toContain('return dot === -1 || MODULE_EXTENSIONS.includes(name.slice(dot))')
		expect(content).toContain('subpaths.push(subpath)')
		expect(content).toContain('if (files.some(isModule)) undeclared.push(subpath)')
		expect(content).toContain('else excluded.push(subpath)')
		expect(content).toContain('expect(stage.undeclared).toStrictEqual([])')
		expect(content).toContain(
			'expect(partitioned.sort()).toStrictEqual([...stage.subpaths].sort())',
		)
		// The falsifying shape: a declaration test that leaves the loop with no bucket
		// for the subpath it walked past.
		expect(content).not.toContain("!declaration.endsWith('.d.ts')) continue")
		// The other falsifying shape: a walker that answers nothing for a fallback
		// list. Node reads an array in an exports entry as one, so a walker refusing it
		// collects no target, and the subpath is filed as excluded and never measured
		// while the totality assertion stays green.
		expect(content).toContain('if (isList(entry)) return entry.flatMap')
		expect(content).toContain('if (isList(entry)) {')
	})

	// Each Node drive's `it.runIf` predicate requires `!entry.browser`, so both the Node
	// import and the Node require retire for a browser entry, and a workspace publishing
	// no browser face carries no branch that drives one. Presence ownership never rewrites the proof, so a face published
	// later meets whichever variant was written: the guard reddens on it, and the
	// browser branch drives it. Every selection carries exactly one of them.
	it('writes a core-only proof that reddens on a browser face it cannot drive', () => {
		const guarded: string[] = []
		const driven: string[] = []
		const selections: string[] = []
		for (let mask = 1; mask < 2 ** ENVIRONMENTS.length; mask += 1) {
			const src = ENVIRONMENTS.filter((_, index) => (mask & (1 << index)) !== 0)
			const [artifact] = blueprintToTestArtifacts(buildBlueprint({ src })).filter(
				({ path }) => path === 'tests/distribution.test.ts',
			)
			const content = artifact?.content ?? ''
			const selection = src.join('+')
			selections.push(selection)
			if (content.includes('publishes no browser face this proof cannot drive')) {
				guarded.push(selection)
			}
			if (content.includes('publishes what it declares to a real browser')) {
				driven.push(selection)
			}
		}

		expect(guarded).toStrictEqual(['core', 'server', 'core+server'])
		expect(driven).toStrictEqual([
			'browser',
			'core+browser',
			'browser+server',
			'core+browser+server',
		])
		expect([...guarded, ...driven].sort()).toStrictEqual([...selections].sort())
	})

	it('registers an application-only integration proof in the default test gate', () => {
		const blueprint = buildBlueprint({
			src: [],
			app: ['core', 'browser', 'server'],
			integration: true,
		})
		const scripts = blueprintToScripts(blueprint)
		const integration = blueprintToTestArtifacts(blueprint).find(
			({ path }) => path === 'tests/integration.test.ts',
		)

		expect(blueprintToRootVite(blueprint)).toContain(
			'projects: [appCore, appBrowser, appServer, policy, config, integration, probe]',
		)
		expect(integration?.content).toContain("import * as appCore from '@app/core'")
		expect(integration?.content).toContain("import * as appBrowser from '@app/browser'")
		expect(integration?.content).toContain("import * as appServer from '@app/server'")
		expect(integration?.content).toContain('Object.keys(appCore)')
		expect(integration?.content).not.toContain('spawnSync')
		expect(integration?.content).not.toContain('install')
		expect(integration?.content).not.toContain('tarball')
		expect(scripts['test:integration']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration',
		)
		expect(scripts.test).toContain('npm run test:integration')
		expect(scripts).not.toHaveProperty('prepublishOnly')
	})

	it('runs a published integration project in the default test gate', () => {
		const blueprint = buildBlueprint({ src: ['core'], integration: true })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).toContain("name: { label: 'integration', color: 'blue' }")
		expect(configuration).toContain("include: ['tests/integration.test.ts']")
		expect(configuration).toContain(
			'projects: [srcCore, policy, config, distribution, integration, probe]',
		)
		expect(scripts['test:integration']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration',
		)
		expect(scripts.test).toContain('npm run test:integration')
		expect(scripts.prepublishOnly).not.toContain('npm run test:integration')
	})

	it('emits a cross-environment composition seed without a packaging process', () => {
		const artifacts = blueprintToTestArtifacts(
			buildBlueprint({ src: [], app: ['core', 'browser', 'server'], integration: true }),
		)
		const proof = artifacts.find(({ path }) => path === 'tests/integration.test.ts')

		expect(artifacts.map(({ path }) => path)).toContain('tests/integration.test.ts')
		expect(proof?.content).toContain("import * as appCore from '@app/core'")
		expect(proof?.content).toContain("import * as appBrowser from '@app/browser'")
		expect(proof?.content).toContain("import * as appServer from '@app/server'")
		expect(proof?.content).toContain('Object.keys(appCore)')
		expect(proof?.content).not.toContain('spawnSync')
		expect(proof?.content).not.toContain('install')
		expect(proof?.content).not.toContain('tarball')
	})

	it('registers an app-core-only integration seed in the default test gate', () => {
		const blueprint = buildBlueprint({ src: [], app: ['core'], integration: true })
		const scripts = blueprintToScripts(blueprint)
		const integration = blueprintToTestArtifacts(blueprint).find(
			({ path }) => path === 'tests/integration.test.ts',
		)

		expect(integration?.content).toContain("import * as appCore from '@app/core'")
		expect(integration?.content).toContain('expect([Object.keys(appCore)]).toStrictEqual([[]])')
		expect(integration?.content).not.toContain('@src/')
		expect(integration?.content).not.toContain('@app/browser')
		expect(integration?.content).not.toContain('@app/server')
		expect(scripts['test:integration']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration',
		)
		expect(scripts.test).toContain('npm run test:integration')
		expect(scripts).not.toHaveProperty('prepublishOnly')
	})

	// Vitest reads the command line's `--mode` as `import.meta.env.MODE` only inside a
	// project it calls, so an evaluated row turns the release-mode publish gate into a
	// skip while every suite stays green. The vendored `config` proof refuses such a row,
	// and this reads the emitted rows the same way over the selections that produce both
	// printed layouts. The control is the evaluated row the generator once emitted for a
	// browser application.
	it('registers every project as the factory itself rather than a call of it', () => {
		const block = /projects: \[([^\]]*)\]/u
		const identifier = /^[A-Za-z][A-Za-z0-9]*$/u
		const emitted = [
			buildBlueprint({
				src: ['core', 'browser', 'server'],
				app: ['core', 'browser', 'server'],
				bin: true,
				setup: true,
				guides: true,
				conformance: true,
				service: true,
				integration: true,
				showcase: true,
			}),
			buildBlueprint({ src: [], app: ['browser'] }),
			buildBlueprint({ src: ['core'], app: ['browser'] }),
		].map((blueprint) => blueprintToRootVite(blueprint))
		const control = 'projects: [appBrowser(), policy, config, probe],'
		const readings = [...emitted, control].map((configuration) =>
			(block.exec(configuration)?.[1] ?? '')
				.split(',')
				.map((row) => row.trim())
				.filter((row) => row.length > 0),
		)

		// The population answers both ways before either answer counts: every reading
		// carries rows, every emitted reading carries the browser row, and the control's
		// row is the one the pattern refuses.
		expect(readings.map((rows) => rows.length > 0)).toStrictEqual([true, true, true, true])
		expect(readings.map((rows) => rows.includes('appBrowser'))).toStrictEqual([
			true,
			true,
			true,
			false,
		])
		expect(readings.map((rows) => rows.filter((row) => !identifier.test(row)))).toStrictEqual([
			[],
			[],
			[],
			['appBrowser()'],
		])
	})
})

describe('blueprint gate laws', () => {
	it('admits a foreign peer at a floor range', () => {
		expect(
			blueprintToQuestions(buildBlueprint({ peers: [{ name: 'typescript', range: '>=6.0.0' }] })),
		).toStrictEqual([])
	})

	it('admits a scoped foreign peer at a floor range', () => {
		expect(
			blueprintToQuestions(buildBlueprint({ peers: [{ name: '@types/node', range: '>=26.0.0' }] })),
		).toStrictEqual([])
	})

	it('refuses a floor range for a fleet peer', () => {
		expect(
			blueprintToQuestions(
				buildBlueprint({ peers: [{ name: '@orkestrel/router', range: '>=0.0.10' }] }),
			),
		).toStrictEqual([
			{
				field: 'peers',
				message: '@orkestrel/router declares the range >=0.0.10, which peers does not accept.',
				blocking: true,
			},
		])
	})

	it('refuses a caret pin for a foreign peer', () => {
		expect(
			blueprintToQuestions(buildBlueprint({ peers: [{ name: 'typescript', range: '^6.0.3' }] })),
		).toStrictEqual([
			{
				field: 'peers',
				message: 'typescript declares the range ^6.0.3, which peers does not accept.',
				blocking: true,
			},
		])
	})

	it('keeps a malformed fleet name on the fleet branch', () => {
		expect(
			blueprintToQuestions(
				buildBlueprint({
					peers: [{ name: '@orkestrel/router.core', range: '^0.0.10' }],
				}),
			),
		).toStrictEqual([
			{
				field: 'peers',
				message: '@orkestrel/router.core is not a package name peers accepts.',
				blocking: true,
			},
		])
	})

	it('keeps a second malformed fleet name on the fleet branch', () => {
		const questions = blueprintToQuestions(
			buildBlueprint({ peers: [{ name: '@orkestrel/../etc', range: '>=1.0.0' }] }),
		)

		expect(questions).toContainEqual({
			field: 'peers',
			message: '@orkestrel/../etc is not a package name peers accepts.',
			blocking: true,
		})
	})

	it('refuses a parent segment as a foreign peer name', () => {
		expect(
			blueprintToQuestions(buildBlueprint({ peers: [{ name: '../etc', range: '>=1.0.0' }] })),
		).toContainEqual({
			field: 'peers',
			message: '../etc is not a package name peers accepts.',
			blocking: true,
		})
	})

	it('refuses a scoped parent segment as a foreign peer name', () => {
		expect(
			blueprintToQuestions(
				buildBlueprint({ peers: [{ name: '@vendor/../etc', range: '>=1.0.0' }] }),
			),
		).toContainEqual({
			field: 'peers',
			message: '@vendor/../etc is not a package name peers accepts.',
			blocking: true,
		})
	})

	it('refuses a nested parent segment as a foreign peer name', () => {
		expect(
			blueprintToQuestions(buildBlueprint({ peers: [{ name: 'foo/../bar', range: '>=1.0.0' }] })),
		).toContainEqual({
			field: 'peers',
			message: 'foo/../bar is not a package name peers accepts.',
			blocking: true,
		})
	})

	// The shape is chosen once, when the workspace is created, and read by every
	// verb afterwards. A refusal here left an existing workspace of that shape
	// undescribable by the verbs whose whole job is to describe and repair it, so
	// the gate advises and the creating verb refuses the advisory.
	it('advises a multi-environment published axis without core rather than refusing it', () => {
		const questions = blueprintToQuestions(buildBlueprint({ src: ['browser', 'server'] }))
		expect(questions).toStrictEqual([
			{
				field: 'src',
				message:
					'Several published environments put core at the package root, so this manifest names a core build the workspace never runs. Declare core on src, or publish one environment.',
				blocking: false,
				candidates: ['core', 'browser', 'server'],
			},
		])
	})

	it('projects integration on either workspace axis and advises only an absent showcase axis', () => {
		const integration = buildBlueprint({ src: [], app: ['core', 'server'], integration: true })
		const showcase = buildBlueprint({ src: ['core'], app: [], showcase: true })

		expect(blueprintToQuestions(integration)).toStrictEqual([])
		expect(blueprintToTestArtifacts(integration).map(({ path }) => path)).toContain(
			'tests/integration.test.ts',
		)
		expect(blueprintToScripts(integration)['test:integration']).toContain('--project integration')
		expect(blueprintToQuestions(showcase)).toStrictEqual([
			{
				field: 'showcase',
				message:
					'showcase projects a browser app, and this workspace declares none, so it emits nothing.',
				blocking: false,
			},
		])
		expect(blueprintToConfigArtifacts(showcase).map(({ path }) => path)).not.toContain(
			'configs/app/vite.showcase.config.ts',
		)
		expect(blueprintToScripts(showcase).showcase).toBeUndefined()
		expect(blueprintToDevDependencies(showcase)['vite-plugin-singlefile']).toBeUndefined()
	})

	it('raises no showcase question after the browser axis is present', () => {
		expect(
			blueprintToQuestions(buildBlueprint({ app: ['browser'], showcase: true })),
		).toStrictEqual([])
	})

	// `appBrowser` is a project row, so Vitest calls it and the signature has to accept
	// the argument it is called with. `appShowcase` is registered nowhere and is reached
	// only by the showcase wrapper's own call, so it stays argument-free. The seal is the
	// signature rather than a runtime refusal beside it. `appShowcase` is generated inline
	// here while `appBrowser` comes from the template, so one spelling drifting from the
	// other is the failure this catches.
	it('opens the registered browser factory and seals the unregistered showcase one', () => {
		const config = blueprintToRootVite(buildBlueprint({ app: ['browser'], showcase: true }))
		expect(config).toContain('export function appShowcase(): UserConfig {')
		expect(config).toContain('export function appBrowser(options?: UserConfig): UserConfig {')
		expect(config).toContain('return mergeConfig(applicationBrowser(false), options ?? {})')
		expect(config).not.toContain('never[]')
		expect(config).not.toContain('overrides are not permitted')
	})

	// The seed loads every declared environment through its public barrel, so one
	// declared environment buys a proof with nothing to compose across. The flag
	// still registers its project, its script, and its place in the publish chain,
	// because workspaces of exactly that shape already ship: this reports what the
	// flag bought and refuses nothing.
	it('advises an integration flag that has fewer than two environments to compose across', () => {
		const advisory = {
			field: 'integration',
			message:
				'integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.',
			blocking: false,
		}
		const published = buildBlueprint({ src: ['core'], app: [], integration: true })
		const applied = buildBlueprint({ src: [], app: ['core'], integration: true })

		expect(blueprintToQuestions(published)).toStrictEqual([advisory])
		expect(blueprintToQuestions(applied)).toStrictEqual([advisory])
		expect(blueprintToQuestions(buildBlueprint({ src: [], app: ['core'] }))).toStrictEqual([])
	})

	// The advisory counts both axes together. Reading either one alone withdraws
	// the proof from a workspace that does compose across environments, which is
	// the refusal this gate was corrected to stop making.
	it('raises no integration question after two environments are there to compose across', () => {
		const applied = buildBlueprint({ src: [], app: ['core', 'browser'], integration: true })
		const spanning = buildBlueprint({ src: ['core'], app: ['core'], integration: true })
		const published = buildBlueprint({ src: ['core', 'server'], integration: true })

		expect(blueprintToQuestions(applied)).toStrictEqual([])
		expect(blueprintToQuestions(spanning)).toStrictEqual([])
		expect(blueprintToQuestions(published)).toStrictEqual([])
		expect(blueprintToRootVite(applied)).toContain("name: { label: 'integration', color: 'blue' }")
		expect(blueprintToScripts(applied)['test:integration']).toContain('--project integration')
		expect(blueprintToScripts(applied).test).toContain('npm run test:integration')
		expect(blueprintToScripts(applied)).not.toHaveProperty('prepublishOnly')
		expect(blueprintToTestArtifacts(applied).map(({ path }) => path)).toContain(
			'tests/integration.test.ts',
		)
	})
})

describe('blueprintToRootVite fixed proofs', () => {
	it('gives every bin project its contended-suite timeout and reason', () => {
		const configuration = blueprintToRootVite(buildBlueprint({ bin: true }))
		const start = configuration.indexOf('export const srcBin')
		const end = configuration.indexOf('export const policy')
		const bin = configuration.slice(start, end)

		expect(start).toBeGreaterThan(-1)
		expect(end).toBeGreaterThan(start)
		expect(bin).toContain("name: { label: 'src:bin', color: 'yellow' }")
		expect(bin).toContain('testTimeout: 15_000,')
		expect(bin).toContain('spends seconds in process startup and filesystem work')
		expect(bin).toContain("Vitest's five-second default")
	})

	it('keeps only packing and live-service proofs on expensive-project budgets', () => {
		const integration = CONFIG_TEMPLATES.factories.integration
		const distribution = CONFIG_TEMPLATES.factories.distribution
		const service = CONFIG_TEMPLATES.factories.service

		expect(integration).not.toContain('testTimeout')
		expect(integration).not.toContain('hookTimeout')
		expect(integration).not.toContain('fileParallelism')
		for (const isolated of [distribution, service]) {
			expect(isolated).toContain('testTimeout: 120_000,')
			expect(isolated).toContain('hookTimeout: 120_000,')
			expect(isolated).toContain('fileParallelism: false,')
		}
	})

	// Scaffold generates the configuration every target runs on, and it runs on its
	// own generated copy. The root config alone leaves each `configs/src` face free
	// to fall behind the template that emits it, which is a drift no other gate can
	// see, so the comparison covers every configuration artifact this repository
	// materializes rather than one of them.
	it('keeps this repository byte-identical to every configuration it generates', () => {
		const blueprint = createBlueprint('scaffold', {
			src: ['core', 'server'],
			bin: true,
			guides: true,
		})
		const artifacts = blueprintToConfigArtifacts(blueprint)

		// The population, stated before the comparison drawn from it, because an empty
		// artifact list satisfies a loop of assertions in exactly the same way a clean
		// one does.
		expect(artifacts.map(({ path }) => path)).toStrictEqual([
			'tsconfig.json',
			'vite.config.ts',
			'configs/src/vite.core.config.ts',
			'configs/src/tsconfig.core.json',
			'configs/src/vite.server.config.ts',
			'configs/src/tsconfig.server.json',
			'configs/src/vite.bin.config.ts',
			'configs/src/tsconfig.bin.json',
		])
		const current = new Map<string, string>()
		const generated = new Map<string, string>()
		for (const artifact of artifacts) {
			if (artifact.origin === 'host') throw new Error('Expected configuration content')
			current.set(artifact.path, readFileSync(resolve(artifact.path), 'utf8'))
			generated.set(artifact.path, artifact.content)
		}
		// Compared as one relation rather than file by file, so a failure names the
		// path that drifted beside the bytes that moved.
		expect(Object.fromEntries(current)).toStrictEqual(Object.fromEntries(generated))

		// The control: the same repository compiled from a blueprint missing facts
		// this checkout declares emits a root configuration this checkout does not hold, so the
		// comparison above discriminates rather than reporting agreement by shape.
		expect(readFileSync(resolve('vite.config.ts'), 'utf8')).not.toBe(
			blueprintToRootVite(createBlueprint('scaffold', { src: ['core', 'server'] })),
		)
	})

	// This measures emitted text. That a build actually leaves a declared peer
	// external is a different claim, and `tests/src/core/templates.test.ts` proves
	// it by building both published faces of a staged workspace for real.
	it('emits the peer clause in every published build face', () => {
		// The emitted configuration reads the live manifest rather than compiling a
		// Blueprint fact. A peer added there by hand therefore stays external and
		// survives `overwrite`, because the manifest artifact is `ownership: 'birth'`
		// and `overwrite` rewrites only the `@orkestrel/*` range set.
		const peer = { name: 'vitest', range: '>=4.0.0' }
		const selected = buildBlueprint({
			src: ['core', 'browser', 'server'],
			app: ['browser', 'server'],
			peers: [peer],
			bin: true,
		})
		const absent = buildBlueprint({
			src: ['core', 'browser', 'server'],
			app: ['browser', 'server'],
			bin: true,
		})
		const configuration = blueprintToRootVite(selected)
		const contents = blueprintToConfigArtifacts(selected)
			.filter(({ path }) => path === 'vite.config.ts' || path === 'configs/src/vite.core.config.ts')
			.map(({ content }) => content)
			.join('\n')
		const clause = "peers.some((peer) => id === peer || id.startsWith(peer + '/'))"

		expect(blueprintToManifest(selected)).toContain('"peerDependencies": {')
		expect(blueprintToManifest(absent)).not.toContain('"peerDependencies": {')
		expect(configuration).toBe(blueprintToRootVite(absent))
		expect(configuration).toContain("import manifest from './package.json' with { type: 'json' }")
		expect(configuration).toContain("throw new Error('package peerDependencies must be an object')")
		expect(contents.split(clause)).toHaveLength(5)
		expect(configuration).not.toContain(peer.range)
	})

	it('registers the conformance and live-service projects only when their fact is set', () => {
		const bare = blueprintToRootVite(buildBlueprint())
		expect(bare).not.toContain("name: { label: 'conformance',")
		expect(bare).not.toContain("name: { label: 'service',")

		const measured = blueprintToRootVite(buildBlueprint({ conformance: true }))
		expect(measured).toContain(
			'export const conformance = (options?: UserConfig): UserConfig =>\n\tmergeConfig(\n',
		)
		expect(measured).toContain("include: ['tests/conformance.test.ts']")
		expect(measured).toContain("setupFiles: ['./tests/setup.ts'],\n\t\t\t\tenvironment: 'node',")
		expect(measured).toContain(
			'projects: [srcCore, policy, config, conformance, distribution, probe]',
		)

		// The live project names its readiness module by path, so the registration
		// and the emitted setup module have to agree on that exact path.
		const live = blueprintToRootVite(buildBlueprint({ service: true }))
		expect(live).toContain(
			'export const service = (options?: UserConfig): UserConfig =>\n\tmergeConfig(\n',
		)
		expect(live).toContain("include: ['tests/service/**/*.test.ts']")
		expect(live).toContain("setupFiles: ['./tests/setup.ts', './tests/setupService.ts'],")
		expect(live).toContain('\t\t\t\tfileParallelism: false,\n')
		expect(live).toContain('projects: [srcCore, policy, config, service, distribution, probe]')
		expect(
			blueprintToTestArtifacts(buildBlueprint({ service: true })).map(({ path }) => path),
		).toContain('tests/setupService.ts')

		// A vendor list is not the axis. It emits the provisioner and nothing that
		// runs against it.
		const vendors = blueprintToRootVite(buildBlueprint({ vendors: ['ollama'] }))
		expect(vendors).not.toContain("name: { label: 'service',")
		expect(
			blueprintToTestArtifacts(buildBlueprint({ vendors: ['ollama'] })).map(({ path }) => path),
		).not.toContain('tests/setupService.ts')
	})

	// A generated workspace runs the `lint:check` and `format:check` it was given on
	// the bytes `new` wrote, so each span below is pinned to the text those gates
	// accept. Each covers the selections that reach both sides of its branch, because
	// one selection per span reads as covered while measuring one side.
	it('imports the configuration helpers a selection actually reaches', () => {
		// The memberships the helper symbols have: a core build enforces logs,
		// `bin` also bounds its output, an application core only bounds its
		// environment, and a published server reaches every helper.
		expect(blueprintToRootVite(buildBlueprint({ src: ['core'] }))).toContain(
			"import { enforceBuildLog } from './configs/helpers.js'\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core'], bin: true }))).toContain(
			"import { enforceBuildLog, outputBoundary } from './configs/helpers.js'\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: [], app: ['core'] }))).toContain(
			"import { environmentBoundary } from './configs/helpers.js'\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'server'] }))).toContain(
			"import { enforceBuildLog, environmentBoundary, outputBoundary } from './configs/helpers.js'\n",
		)
		// The removed runtime filesystem classifier leaves the URL import directly
		// after the imports every root configuration makes.
		expect(blueprintToRootVite(buildBlueprint({ src: ['core'] }))).toContain(
			"import type { UserConfig } from 'vite'\nimport { defineConfig, mergeConfig } from 'vitest/config'\nimport manifest from './package.json' with { type: 'json' }\nimport tsconfig from './tsconfig.json' with { type: 'json' }\nimport { enforceBuildLog } from './configs/helpers.js'\nimport { fileURLToPath, URL } from 'node:url'",
		)
	})

	it('wires the build-log guard into every bundle-emitting factory', () => {
		const configuration = blueprintToRootVite(
			buildBlueprint({
				src: ['core', 'browser', 'server'],
				app: ['core', 'browser', 'server'],
				bin: true,
				showcase: true,
			}),
		)
		const appCoreStart = configuration.indexOf('export const appCore')
		const appCoreEnd = configuration.indexOf('function applicationBrowser')

		expect(configuration.split('onLog: enforceBuildLog')).toHaveLength(7)
		expect(configuration).toContain('export function appShowcase(): UserConfig {')
		expect(appCoreStart).toBeGreaterThan(-1)
		expect(appCoreEnd).toBeGreaterThan(appCoreStart)
		expect(configuration.slice(appCoreStart, appCoreEnd)).not.toContain('enforceBuildLog')
	})

	// A generated workspace launches Chromium through the resolver it was given, so
	// the emission and the spans that reach it are pinned beside the selections
	// that produce them. The membership is a browser on either axis.
	it('emits the browser resolver for exactly the selections that launch one', () => {
		for (const blueprint of [
			buildBlueprint({ src: ['core', 'browser'] }),
			buildBlueprint({ src: [], app: ['browser'] }),
			buildBlueprint({ src: ['browser'], app: ['browser'] }),
		]) {
			expect(blueprintToConfigArtifacts(blueprint).map(({ path }) => path)).toContain(
				'configs/browsers.ts',
			)
		}
		for (const blueprint of [
			buildBlueprint({ src: ['core'] }),
			buildBlueprint({ src: ['core', 'server'], bin: true }),
			buildBlueprint({ src: [], app: ['core', 'server'] }),
		]) {
			const artifacts = blueprintToConfigArtifacts(blueprint)
			expect(artifacts.map(({ path }) => path)).not.toContain('configs/browsers.ts')
			// A workspace with no browser declares no `playwright`, so no configuration
			// it receives may name one either.
			for (const artifact of artifacts) {
				if (artifact.origin === 'host') throw new Error('Expected configuration content')
				expect(artifact.content).not.toContain('playwright')
			}
		}
	})

	it('wires the emitted root configuration to the resolver beside it', () => {
		const published = blueprintToRootVite(buildBlueprint({ src: ['core', 'browser'] }))
		const application = blueprintToRootVite(buildBlueprint({ src: [], app: ['browser'] }))
		for (const content of [published, application]) {
			expect(content).toContain(
				"import { resolveBrowser, resolvePinnedBrowser } from './configs/browsers.js'\n",
			)
			// Resolved once, above every factory that reads it, because a provider
			// resolved per project would probe the filesystem once per project.
			expect(content).toContain(
				'\nconst browserOptions = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)\n\n',
			)
		}
		expect(published).toContain('\t\t\t\t\tprovider: playwright(browserOptions),\n')
		expect(application).toContain('\t\t\t\tprovider: playwright(browserOptions),\n')
		// The control: neither span is part of the skeleton, so a selection that emits
		// no resolver names nothing that would fail to resolve.
		const core = blueprintToRootVite(buildBlueprint({ src: ['core'] }))
		expect(core).not.toContain('./configs/browsers.js')
		expect(core).not.toContain('browserOptions')
	})

	it('writes each selection-dependent span the way the formatter leaves it', () => {
		// The peer matcher holds every published predicate open — the browser
		// face and the server face, each with the core alias present only when the
		// selected source graph reaches it. Both faces carry the clause on both
		// sides of their own branch, so neither side can lose it unseen.
		expect(blueprintToRootVite(buildBlueprint({ src: ['browser'] }))).toContain(
			"\t\t\t\t\texternal: (id: string) =>\n\t\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'browser'] }))).toContain(
			"\t\t\t\t\texternal: (id: string) =>\n\t\t\t\t\t\tid === '@src/core' ||\n\t\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['server'] }))).toContain(
			"\t\t\t\t\texternal: (id: string) =>\n\t\t\t\t\t\tid.startsWith('node:') ||\n\t\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'server'] }))).toContain(
			"\t\t\t\t\texternal: (id: string) =>\n\t\t\t\t\t\tid === '@src/core' ||\n\t\t\t\t\t\tid.startsWith('node:') ||\n\t\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		// The browser plugin array has no conditional tail without a showcase, so
		// the formatter emits its fixed entries joined.
		expect(blueprintToRootVite(buildBlueprint({ app: ['browser'] }))).toContain(
			"\t\tplugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],\n",
		)
		const showcase = blueprintToRootVite(buildBlueprint({ app: ['browser'], showcase: true }))
		expect(showcase).toContain('\tconst showcasePlugins: PluginOption[] = showcase\n\t\t? [\n')
		expect(showcase).toContain(
			"\t\tplugins: [\n\t\t\toutputBoundary(output),\n\t\t\tenvironmentBoundary('app/browser'),\n\t\t\tvue(),\n\t\t\t...showcasePlugins,\n",
		)
		expect(showcase).toContain('\t\t: []\n\treturn {\n')
	})

	// Both published faces are rolled up by vite-plugin-dts and both reach core
	// through a relative source path, so each carries the rewrite and each explains
	// it where a reader of that file meets it.
	it('explains the declaration rewrite in every emitted published face', () => {
		const artifacts = blueprintToConfigArtifacts(
			buildBlueprint({ src: ['core', 'browser', 'server'] }),
		)
		for (const path of [
			'configs/src/vite.browser.config.ts',
			'configs/src/vite.server.config.ts',
		]) {
			const face = artifacts.find((artifact) => artifact.path === path)
			expect(face?.content).toContain(
				'vite-plugin-dts rolls this face into one declaration, and the roll-up reaches',
			)
			expect(face?.content).toContain('final roll-up only')
			expect(face?.content).toContain('beforeWriteFile: (path, content) => ({')
		}
		const browser = artifacts.find(
			({ path }) => path === 'configs/src/vite.browser.config.ts',
		)?.content
		const server = artifacts.find(
			({ path }) => path === 'configs/src/vite.server.config.ts',
		)?.content
		// Each face guards its own roll-up, so neither rewrite can fire on the other's
		// declaration. The browser comment names the nested case as well, because a
		// browser subfolder is where the escaping path actually comes from.
		expect(browser).toContain(
			'content: /[\\\\/]dist[\\\\/]src[\\\\/]browser[\\\\/]index\\.d\\.ts$/.test(path)\n',
		)
		expect(server).toContain(
			'content: /[\\\\/]dist[\\\\/]src[\\\\/]server[\\\\/]index\\.d\\.ts$/.test(path)\n',
		)
		expect(browser).toContain('a module in a browser subfolder emits')
	})

	it('joins the declaration rewrite only while the line it prints fits the width', () => {
		// The names either side of the width: at 19 characters the joined call
		// prints exactly on the vendored 100 columns and at 20 it prints one past, so
		// the branch is observable only at that pair. Every longer name the gate
		// admits, up to `MAX_NAME_LENGTH`, takes the wrapped form. Both faces fill the
		// same span from one derivation, so the pair is asserted on both.
		for (const path of [
			'configs/src/vite.browser.config.ts',
			'configs/src/vite.server.config.ts',
		]) {
			const fitted = blueprintToConfigArtifacts(
				buildBlueprint({ name: 'a'.repeat(19), src: ['core', 'browser', 'server'] }),
			).find((artifact) => artifact.path === path)
			expect(fitted?.content).toContain(
				`\t\t\t\t\t\t? content.replaceAll(/(?:\\.\\.\\/)+core\\/index\\.[jt]s/g, '@orkestrel/${'a'.repeat(19)}')\n`,
			)
			const wrapped = blueprintToConfigArtifacts(
				buildBlueprint({ name: 'a'.repeat(20), src: ['core', 'browser', 'server'] }),
			).find((artifact) => artifact.path === path)
			expect(wrapped?.content).toContain(
				`\t\t\t\t\t\t? content.replaceAll(\n\t\t\t\t\t\t\t\t/(?:\\.\\.\\/)+core\\/index\\.[jt]s/g,\n\t\t\t\t\t\t\t\t'@orkestrel/${'a'.repeat(20)}',\n\t\t\t\t\t\t\t)\n`,
			)
		}
	})

	it('explains the executable build in every emitted bin workspace', () => {
		const bin = blueprintToConfigArtifacts(buildBlueprint({ bin: true })).find(
			({ path }) => path === 'configs/src/vite.bin.config.ts',
		)
		expect(bin?.content).toContain('a single ESM lib file, no declarations')
		expect(bin?.content).toContain('rolldown strips shebangs from source during bundling')
		expect(bin?.content).toContain('relative to `dist/bin/`')
	})
})

describe('blueprintToConfigArtifacts app matrix', () => {
	it('emits exactly the core app config', () => {
		expect(
			blueprintToConfigArtifacts(buildBlueprint({ app: ['core'] }))
				.filter(({ path }) => path.startsWith('configs/app/'))
				.map(({ path }) => path),
		).toStrictEqual(['configs/app/tsconfig.core.json'])
	})

	it('emits exactly the browser app configs', () => {
		expect(
			blueprintToConfigArtifacts(buildBlueprint({ app: ['browser'] }))
				.filter(({ path }) => path.startsWith('configs/app/'))
				.map(({ path }) => path),
		).toStrictEqual(['configs/app/vite.browser.config.ts', 'configs/app/tsconfig.browser.json'])
	})

	it('emits exactly the server app configs', () => {
		expect(
			blueprintToConfigArtifacts(buildBlueprint({ app: ['server'] }))
				.filter(({ path }) => path.startsWith('configs/app/'))
				.map(({ path }) => path),
		).toStrictEqual(['configs/app/vite.server.config.ts', 'configs/app/tsconfig.server.json'])
	})

	it('emits exactly the full app config matrix', () => {
		expect(
			blueprintToConfigArtifacts(buildBlueprint({ app: ['core', 'browser', 'server'] }))
				.filter(({ path }) => path.startsWith('configs/app/'))
				.map(({ path }) => path),
		).toStrictEqual([
			'configs/app/tsconfig.core.json',
			'configs/app/vite.browser.config.ts',
			'configs/app/tsconfig.browser.json',
			'configs/app/vite.server.config.ts',
			'configs/app/tsconfig.server.json',
		])
	})

	it('emits the same exact app matrix without a src axis', () => {
		expect(
			blueprintToConfigArtifacts(
				buildBlueprint({ src: [], app: ['core', 'browser', 'server'] }),
			).map(({ path }) => path),
		).toStrictEqual([
			'tsconfig.json',
			'vite.config.ts',
			'configs/browsers.ts',
			'configs/app/tsconfig.core.json',
			'configs/app/vite.browser.config.ts',
			'configs/app/tsconfig.browser.json',
			'configs/app/vite.server.config.ts',
			'configs/app/tsconfig.server.json',
		])
	})

	it('emits no app config for the empty app axis', () => {
		expect(
			blueprintToConfigArtifacts(buildBlueprint({ app: [] }))
				.filter(({ path }) => path.startsWith('configs/app/'))
				.map(({ path }) => path),
		).toStrictEqual([])
	})
})

describe('blueprintToConfigArtifacts app check scopes', () => {
	it('includes core tests and the host-independent setup explicitly', () => {
		const core = blueprintToConfigArtifacts(buildBlueprint({ app: ['core'] })).find(
			({ path }) => path === 'configs/app/tsconfig.core.json',
		)
		if (core === undefined || core.origin === 'host') {
			throw new Error('Expected the core app TypeScript config')
		}
		expect(core.content).toBe(`{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext", "WebWorker"],
		"types": []
	},
	"include": [
		"../../app/core/**/*.cts",
		"../../app/core/**/*.mts",
		"../../app/core/**/*.ts",
		"../../app/core/**/*.tsx",
		"../../tests/app/core/**/*.cts",
		"../../tests/app/core/**/*.mts",
		"../../tests/app/core/**/*.ts",
		"../../tests/app/core/**/*.tsx",
		"../../tests/setup.ts"
	]
}
`)
	})

	it('includes browser tests and only the browser setup explicitly', () => {
		const browser = blueprintToConfigArtifacts(
			buildBlueprint({ app: ['core', 'browser', 'server'] }),
		).find(({ path }) => path === 'configs/app/tsconfig.browser.json')
		if (browser === undefined || browser.origin === 'host') {
			throw new Error('Expected the browser app TypeScript config')
		}
		expect(browser.content).toBe(`{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext", "DOM", "DOM.Iterable"],
		"types": ["vite/client", "vue"]
	},
	"include": [
		"../../app/browser/**/*.cts",
		"../../app/browser/**/*.mts",
		"../../app/browser/**/*.ts",
		"../../app/browser/**/*.tsx",
		"../../app/browser/**/*.vue",
		"../../app/core/**/*.cts",
		"../../app/core/**/*.mts",
		"../../app/core/**/*.ts",
		"../../app/core/**/*.tsx",
		"../../tests/app/browser/**/*.cts",
		"../../tests/app/browser/**/*.mts",
		"../../tests/app/browser/**/*.ts",
		"../../tests/app/browser/**/*.tsx",
		"../../tests/app/browser/**/*.vue",
		"../../tests/setup.ts",
		"../../tests/setupBrowser.ts"
	]
}
`)
	})

	it('includes server tests and only the server setup explicitly', () => {
		const server = blueprintToConfigArtifacts(
			buildBlueprint({ app: ['core', 'browser', 'server'] }),
		).find(({ path }) => path === 'configs/app/tsconfig.server.json')
		if (server === undefined || server.origin === 'host') {
			throw new Error('Expected the server app TypeScript config')
		}
		expect(server.content).toBe(`{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext"],
		"types": ["node"]
	},
	"include": [
		"../../app/server/**/*.cts",
		"../../app/server/**/*.mts",
		"../../app/server/**/*.ts",
		"../../app/server/**/*.tsx",
		"../../app/core/**/*.cts",
		"../../app/core/**/*.mts",
		"../../app/core/**/*.ts",
		"../../app/core/**/*.tsx",
		"../../tests/app/server/**/*.cts",
		"../../tests/app/server/**/*.mts",
		"../../tests/app/server/**/*.ts",
		"../../tests/app/server/**/*.tsx",
		"../../tests/setup.ts",
		"../../tests/setupServer.ts"
	]
}
`)
	})
})

describe('content artifact compilers', () => {
	it('emits every selected source entry without a starter entity', () => {
		const artifacts = blueprintToSourceArtifacts(
			buildBlueprint({
				name: 'widget',
				src: ['core', 'browser', 'server'],
				app: ['core', 'browser', 'server'],
				bin: true,
			}),
		)
		expect(artifacts.map(({ path }) => path)).toStrictEqual([
			'src/core/index.ts',
			'src/browser/index.ts',
			'src/server/index.ts',
			'app/core/index.ts',
			'app/browser/index.ts',
			'app/browser/main.ts',
			'app/browser/index.html',
			'app/server/index.ts',
			'app/server/main.ts',
			'src/bin/main.ts',
		])
		expect(
			artifacts.every(
				({ group, origin, ownership }) =>
					group === 'source' && origin === 'template' && ownership === 'birth',
			),
		).toBe(true)
		// Every emitted module is empty, entries included. An entry that started by
		// importing its barrel for effect would be refused by the `lint:check` the
		// same command vendors, and it would carry starter content besides.
		expect(
			artifacts
				.filter(({ path }) => path.endsWith('.ts'))
				.map(({ path, content }) => [path, content]),
		).toStrictEqual([
			['src/core/index.ts', ''],
			['src/browser/index.ts', ''],
			['src/server/index.ts', ''],
			['app/core/index.ts', ''],
			['app/browser/index.ts', ''],
			['app/browser/main.ts', ''],
			['app/server/index.ts', ''],
			['app/server/main.ts', ''],
			['src/bin/main.ts', ''],
		])
		expect(artifacts.map(({ content }) => content).join('\n')).not.toMatch(
			/\b(?:class|interface)\s+Widget\b/u,
		)
	})

	it('emits one empty-barrel assertion per selected Vitest axis project', () => {
		const artifacts = blueprintToTestArtifacts(
			buildBlueprint({
				name: 'widget',
				src: ['core', 'browser', 'server'],
				app: ['core', 'browser', 'server'],
				bin: true,
				global: true,
				integration: true,
			}),
		)
		expect(artifacts.map(({ path }) => path)).toStrictEqual([
			'tests/setup.ts',
			'tests/setupBrowser.ts',
			'tests/setupServer.ts',
			'tests/setupGlobal.ts',
			'tests/src/core/index.test.ts',
			'tests/src/browser/index.test.ts',
			'tests/src/server/index.test.ts',
			'tests/src/bin/main.test.ts',
			'tests/app/core/index.test.ts',
			'tests/app/browser/index.test.ts',
			'tests/app/server/index.test.ts',
			'tests/distribution.test.ts',
			'tests/integration.test.ts',
		])
		const tests = artifacts.filter(({ path }) => path.endsWith('.test.ts'))
		expect(tests).toHaveLength(9)
		const seeded = ['tests/distribution.test.ts', 'tests/integration.test.ts']
		for (const artifact of tests.filter(({ path }) => !seeded.includes(path))) {
			expect(artifact.content).toContain('Object.keys(entry)')
			expect(artifact.content).toContain('toStrictEqual([])')
		}
		expect(tests.at(-1)?.content).toContain('workspace integration')
		expect(tests.at(-1)?.content).toContain('Object.keys(srcCore)')
		expect(tests.at(-1)?.content).not.toContain('spawnSync')
	})

	it('emits the package front page and every required guide index', () => {
		const blueprint = buildBlueprint({
			name: 'widget',
			description: 'A focused widget package.',
			src: ['core', 'server'],
			app: ['core'],
		})
		const [document] = blueprintToDocumentArtifacts(blueprint)
		const [guide] = blueprintToGuideArtifacts(blueprint)
		expect(document?.path).toBe('README.md')
		expect(document?.content).toContain('# @orkestrel/widget')
		expect(document?.content).toContain('A focused widget package.')
		expect(guide?.path).toBe('guides/README.md')
		expect(guide?.content).toContain('## By concept')
		expect(guide?.content).toContain('## By directory')
		expect(guide?.content).toContain('[`src/server`](../src/server)')
		expect(guide?.content).toContain('[`app/core`](../app/core)')
	})

	it('names the unwritten package guide without linking to it', () => {
		const [guide] = blueprintToGuideArtifacts(buildBlueprint({ name: 'widget' }))
		expect(guide?.content).toContain(
			'  - Spec: Not created. Create this file when the workspace has a public surface:\n    `guides/widget.md`',
		)
		expect(guide?.content).toContain(
			'  - Guide: Not created. Create this file when the workspace has a public surface:\n    `guides/widget.md`',
		)
		expect(guide?.content).not.toContain('[Package guide]')
		expect(guide?.content).not.toContain('[package-guide]')
	})

	it('emits only the honest vendor inventory skeleton when vendors are declared', () => {
		expect(blueprintToOrchestrationArtifacts(buildBlueprint())).toStrictEqual([])
		const [artifact] = blueprintToOrchestrationArtifacts(
			buildBlueprint({ vendors: ['ollama', 'postgres'] }),
		)
		expect(artifact?.path).toBe('scripts/service.sh')
		expect(artifact?.content).toContain("'ollama'")
		expect(artifact?.content).toContain("'postgres'")
		expect(artifact?.content).not.toContain('test:service')
	})
})

describe('artifactToFinding producer matrix', () => {
	// The instrument's population is every finding the producer can reach: every
	// ownership tier by every observation state a target can present.
	// Its control is drawn from outside that population, because a control sampled
	// from inside it could only show the producer disagreeing with itself, and the
	// question here is what the producer never reaches at all.
	it('reaches every verdict shape, and the guard admits one it never reaches', () => {
		const cells: string[] = []
		const verdicts: string[] = []
		for (const ownership of OWNERSHIPS) {
			for (const [state, observed] of [
				['absent', undefined],
				['matching', MATCHING],
				['differing', DIFFERING],
			] as const) {
				const finding = artifactToFinding(
					buildContentArtifact({ ownership, content: PLANNED }),
					observed,
				)
				// Soundness in the direction the guard does promise: the producer never
				// emits a finding the guard rejects.
				expect(isFinding(finding)).toBe(true)
				const verdict = `${finding.ownership}/${finding.drift}/${finding.observed === undefined ? 'no observed' : 'observed'}`
				cells.push(`${ownership} ${state} -> ${verdict}`)
				verdicts.push(verdict)
			}
		}
		expect(cells).toStrictEqual([
			'content absent -> content/missing/no observed',
			'content matching -> content/aligned/observed',
			'content differing -> content/stale/observed',
			'presence absent -> presence/missing/no observed',
			'presence matching -> presence/aligned/observed',
			'presence differing -> presence/aligned/observed',
			'birth absent -> birth/aligned/no observed',
			'birth matching -> birth/aligned/observed',
			'birth differing -> birth/aligned/observed',
		])
		expect([...new Set(verdicts)].sort()).toStrictEqual([
			'birth/aligned/no observed',
			'birth/aligned/observed',
			'content/aligned/observed',
			'content/missing/no observed',
			'content/stale/observed',
			'presence/aligned/observed',
			'presence/missing/no observed',
		])

		// The control. A birth-owned path reported stale is outside the population
		// above: birth ownership is never compared, so the producer reports it
		// aligned whatever the target holds.
		const control = {
			path: 'package.json',
			group: 'manifest',
			ownership: 'birth',
			drift: 'stale',
			observed: MATCHING,
		}
		expect(isFinding(control)).toBe(true)
		expect(verdicts).not.toContain('birth/stale/observed')

		// What the control established: the guard's population is strictly wider
		// than the producer's, so the gap the `Finding` and `isFinding` remarks
		// describe is measured rather than assumed, and a consumer that treats a
		// guarded finding as a verdict some audit reached is wrong on real input.
		// What it did not establish: nothing about what happens next. It does not
		// show this verdict reaching a write, because `repair` re-derives every
		// finding and refuses a caller's audit that disagrees, and it names one
		// member of the gap rather than enumerating it.
	})
})
