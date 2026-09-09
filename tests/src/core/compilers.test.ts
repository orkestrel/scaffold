import type { ManifestScript } from '@src/core'
import type { ScratchInterface } from '@orkestrel/test/server'
import { createScratch, destroyScratch } from '@orkestrel/test/server'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, symlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import {
	blueprintToConfigArtifacts,
	blueprintToDevDependencies,
	blueprintToDocumentArtifacts,
	blueprintToGuideArtifacts,
	blueprintToHostArtifacts,
	blueprintToManifest,
	blueprintToOrchestrationArtifacts,
	blueprintToQuestions,
	blueprintToRootTsconfig,
	blueprintToRootVite,
	blueprintToScripts,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	blueprintToWritableScripts,
	CONFIG_TEMPLATES,
	createBlueprint,
	ENVIRONMENTS,
	FLOOR_RANGE_PATTERN,
	isCanonPath,
	ORKESTREL_RANGE_PATTERN,
	RELEASE_PROOF_COMMAND,
	replaceManifestRanges,
	replaceManifestScripts,
	srcToExports,
} from '@src/core'
import { buildBlueprint } from '../../setup.js'
import { readStatements } from '../../setupServer.js'
import { describe, expect, it } from 'vitest'

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
	it('names direct project scripts and lifecycle scripts without taking gate chains', () => {
		const blueprint = buildBlueprint({ src: ['core'] })
		const region = blueprintToWritableScripts(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(region.map((script) => script.name)).toEqual([
			'test:src:core',
			'test:policy',
			'test:config',
			'test:probe',
			'test:bench',
			'test:distribution',
			'prepack',
			'prepublishOnly',
		])
		expect(region.map((script) => script.command)).toEqual([
			scripts['test:src:core'],
			scripts['test:policy'],
			scripts['test:config'],
			scripts['test:probe'],
			scripts['test:bench'],
			scripts['test:distribution'],
			scripts.prepack,
			scripts.prepublishOnly,
		])
		for (const script of region.slice(0, 6)) expect(script.accepted).toEqual([])
		// The generated predecessor copied the build chain instead of delegating to
		// it, so the region accepts that value while moving targets to the delegate.
		expect(region[6]?.accepted).toEqual([scripts.build])
		// The publish predecessor is the same chain without the release row, which
		// is what a target scaffolded before the proof existed still holds.
		expect(region[7]?.accepted).toEqual([
			`${scripts.prepublishOnly ?? ''}`.replace(` && ${RELEASE_PROOF_COMMAND}`, ''),
		])
		expect(region[7]?.accepted[0]).not.toContain(RELEASE_PROOF_COMMAND)
		for (const name of [
			'test',
			'test:src',
			'check',
			'build',
			'format',
			'format:check',
			'lint',
			'lint:check',
			'clean',
			'copy',
		]) {
			expect(region.map((script) => script.name)).not.toContain(name)
		}
	})

	it('names direct project and workbench scripts for a private application', () => {
		expect(
			blueprintToWritableScripts(buildBlueprint({ src: [], app: ['core'] })).map(
				(script) => script.name,
			),
		).toEqual(['test:app:core', 'test:policy', 'test:config', 'test:probe', 'test:bench'])
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
		const legacyBuild = blueprintToScripts(blueprint).build
		if (legacyBuild === undefined)
			throw new Error('The publishing blueprint carries no build script')
		const previous = current
			.replace('"prepack": "npm run build"', `"prepack": ${JSON.stringify(legacyBuild)}`)
			.replaceAll(/\t\t"test:distribution": .*\n/gu, '')
			.replace(` && ${RELEASE_PROOF_COMMAND}`, '')
		const written = replaceManifestScripts(previous, region)
		const distribution = region.find((script) => script.name === 'test:distribution')
		const prepublish = region.find((script) => script.name === 'prepublishOnly')

		expect(previous).not.toContain('test:distribution')
		expect(previous).toContain(`"prepack": ${JSON.stringify(legacyBuild)}`)
		expect(written).toBeDefined()
		expect(written).toContain(RELEASE_PROOF_COMMAND)
		expect(JSON.parse(written ?? '')).toMatchObject({
			scripts: {
				prepack: 'npm run build',
				'test:distribution': distribution?.command,
				prepublishOnly: prepublish?.command,
			},
		})
	})

	it('leaves a manifest that already carries every command exactly as it found it', () => {
		const written = replaceManifestScripts(SCRIPT_MANIFEST, SCRIPT_REGION)

		expect(replaceManifestScripts(written ?? '', SCRIPT_REGION)).toBe(written)
	})

	it('retains a differing value while appending an absent script', () => {
		const customized = SCRIPT_MANIFEST.replace(
			'"prepublishOnly": "npm test"',
			'"prepublishOnly": "npm test && npm run verify"',
		)
		const written = replaceManifestScripts(customized, SCRIPT_REGION)

		expect(written).toBe(
			customized.replace(
				'"prepublishOnly": "npm test && npm run verify"\n',
				'"prepublishOnly": "npm test && npm run verify",\n\t\t"test:distribution": "vitest run --project distribution"\n',
			),
		)
		expect(written).toContain('"prepublishOnly": "npm test && npm run verify"')
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

	// A qualified name belongs to the family its prefix names, and the developer
	// reading the manifest afterwards expects to find it among its siblings rather
	// than behind the lifecycle scripts that close the section.
	it('appends a qualified script after the last declared member of its own family', () => {
		const declared = buildBlueprint({ src: ['core'] })
		const manifest = blueprintToManifest(declared)
		const region = blueprintToWritableScripts(buildBlueprint({ src: ['core'], setup: true }))
		const written = replaceManifestScripts(manifest, region)
		const proof = region.find((script) => script.name === 'test:setup')

		expect(Object.keys(JSON.parse(manifest).scripts)).not.toContain('test:setup')
		expect(JSON.parse(written ?? '').scripts['test:setup']).toBe(proof?.command)
		expect(Object.keys(JSON.parse(written ?? '').scripts)).toEqual([
			'clean',
			'copy',
			'format',
			'format:check',
			'lint',
			'lint:check',
			'check',
			'check:src',
			'check:src:core',
			'test',
			'test:src',
			'test:src:core',
			'test:policy',
			'test:config',
			'test:probe',
			'test:bench',
			'test:distribution',
			'test:setup',
			'build',
			'build:src',
			'build:src:core',
			'prepack',
			'prepublishOnly',
		])
	})

	// The fallback is the section's own end, and an unqualified name has no family
	// to join, so both keep the placement the append path always had.
	it('appends at the section end when no declared key shares the family', () => {
		const written = replaceManifestScripts(SCRIPT_MANIFEST, SCRIPT_REGION)

		expect(Object.keys(JSON.parse(SCRIPT_MANIFEST).scripts)).toEqual(['test', 'prepublishOnly'])
		expect(Object.keys(JSON.parse(written ?? '').scripts)).toEqual([
			'test',
			'prepublishOnly',
			'test:distribution',
		])
	})

	it('returns the text untouched when the region names nothing', () => {
		expect(replaceManifestScripts(SCRIPT_MANIFEST, [])).toBe(SCRIPT_MANIFEST)
	})
})

describe('blueprintToDevDependencies compile tooling', () => {
	it('keeps library publishing tools in a source workspace', () => {
		const planned = blueprintToDevDependencies(buildBlueprint({ src: ['core'], app: [] }))

		expect(planned['@microsoft/api-extractor']).toBe('^7.59.0')
	})

	it('omits library publishing tools from an app-only workspace', () => {
		const planned = blueprintToDevDependencies(
			buildBlueprint({ src: [], app: ['core', 'browser'], bin: false }),
		)

		expect(planned['@microsoft/api-extractor']).toBeUndefined()
	})

	it('keeps library publishing tools in an executable workspace', () => {
		const planned = blueprintToDevDependencies(buildBlueprint({ src: [], app: [], bin: true }))

		expect(planned['@microsoft/api-extractor']).toBe('^7.59.0')
	})

	it('keeps the browser application toolchain in an app-only workspace', async () => {
		const planned = blueprintToDevDependencies(
			buildBlueprint({ src: [], app: ['core', 'browser'], bin: false }),
		)

		// The claim is membership: an app-only workspace keeps the browser toolchain
		// and the shared base. The names are pinned here because membership is the
		// claim; the ranges live in the fixture, which states every name and range
		// rather than reading them back from the table the emitter read. A floor
		// raise moves the fixture, which is the point: regenerate it with
		// `npm run test:src:core -- -u` and review the diff, which is where a
		// workspace receives the raise.
		expect(Object.keys(planned)).toEqual(
			expect.arrayContaining(['@orkestrel/html', 'vue', '@orkestrel/test']),
		)
		await expect(JSON.stringify(planned, undefined, '\t')).toMatchFileSnapshot(
			'fixtures/app-only-toolchain.txt',
		)
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

		// The fixture covers every emitted byte, the self-pin included, so a release
		// moves it. Regenerate it with `npm run test:src:core -- -u` and review the
		// diff; it is the tripwire for every other byte.
		await expect(manifest).toMatchFileSnapshot('fixtures/source-manifest.txt')
	})
})

describe('blueprintToScripts config projects', () => {
	it('registers and gates setup proofs only when the blueprint selects them', async () => {
		const absent = createBlueprint('sample', { src: ['core'], setup: false })
		const present = createBlueprint('sample', { src: ['core'], setup: true })
		const configuration = blueprintToRootVite(present)
		const scripts = blueprintToScripts(present)

		// A release moves the fixture through its floors and self-pin; regenerate it
		// with `npm run test:src:core -- -u` and review the diff.
		await expect(blueprintToManifest(absent)).toMatchFileSnapshot(
			'fixtures/setup-false-manifest.txt',
		)
		expect(blueprintToRootVite(absent)).not.toContain("name: { label: 'setup',")
		expect(blueprintToScripts(absent)).not.toHaveProperty('test:setup')
		expect(blueprintToScripts(absent).test).not.toContain('test:setup')
		expect(configuration).toContain('export const setup = (): UserConfig => ({')
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

		expect(published.prepack).toBe('npm run build')
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

		expect(configuration).toContain('export const guides = (): UserConfig => ({')
		expect(configuration).toContain("include: ['tests/guides.test.ts']")
		expect(configuration).toContain(
			'projects: [srcCore, policy, config, guides, distribution, probe]',
		)
		expect(configuration).not.toContain('isExactCaseFile')
		expect(scripts['test:guides']).toBe('node --experimental-strip-types tests/guides.test.ts')
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

	// The package-owned proof joins the writable script region. Its accepted predecessor
	// admits the released generated command without admitting a customized value.
	it('emits the guides command and accepts its generated predecessor', () => {
		const documented = buildBlueprint({ guides: true })
		const undocumented = buildBlueprint({ guides: false })
		const scripts = blueprintToScripts(documented)
		const writable = blueprintToWritableScripts(documented)
		const entry = writable.filter(({ name }) => name === 'test:guides')

		expect(entry).toEqual([
			{
				name: 'test:guides',
				command: 'node --experimental-strip-types tests/guides.test.ts',
				accepted: ['vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'],
			},
		])
		const previous =
			'{\n\t"scripts": {\n\t\t"test:guides": "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides"\n\t}\n}\n'
		const customized = previous.replace(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project guides',
			'node scripts/custom-guides.js',
		)
		expect(replaceManifestScripts(previous, entry)).toContain(
			'"test:guides": "node --experimental-strip-types tests/guides.test.ts"',
		)
		expect(replaceManifestScripts(customized, entry)).toBe(customized)
		expect(scripts).not.toHaveProperty('docs')
		expect(blueprintToScripts(undocumented)).not.toHaveProperty('docs')
		expect(blueprintToWritableScripts(undocumented).map((script) => script.name)).not.toContain(
			'docs',
		)
		expect(scripts.test).not.toContain('npm run docs')
		expect(scripts.prepublishOnly).not.toContain('npm run docs')
	})

	it('registers the distribution proof only in the release-mode publish gate', () => {
		const blueprint = buildBlueprint({ src: ['core'] })
		const configuration = blueprintToRootVite(blueprint)
		const scripts = blueprintToScripts(blueprint)

		expect(configuration).toContain('export const distribution = (): UserConfig => ({')
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

	// Neither factory takes an argument. `appBrowser` is a project row, so Vitest calls
	// it with its own environment record, and a parameter there merged those fields into
	// the configuration it returned. `appShowcase` is registered nowhere and is reached
	// only by the showcase wrapper's own call. `appShowcase` is generated inline here
	// while `appBrowser` comes from the template, so one spelling drifting from the other
	// is the failure this catches.
	it('seals every application browser factory against a caller argument', () => {
		const config = blueprintToRootVite(buildBlueprint({ app: ['browser'], showcase: true }))
		expect(config).toContain('export function appShowcase(): UserConfig {')
		expect(config).toContain('export function appBrowser(): UserConfig {')
		expect(config).toContain('return applicationBrowser(false)')
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
			setup: true,
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
		expect(measured).toContain('export const conformance = (): UserConfig => ({\n\tresolve,\n')
		expect(measured).toContain("include: ['tests/conformance.test.ts']")
		expect(measured).toContain("setupFiles: ['./tests/setup.ts'],\n\t\tenvironment: 'node',")
		expect(measured).toContain(
			'projects: [srcCore, policy, config, conformance, distribution, probe]',
		)

		// The live project names its readiness module by path, so the registration
		// and the emitted setup module have to agree on that exact path.
		const live = blueprintToRootVite(buildBlueprint({ service: true }))
		expect(live).toContain('export const service = (): UserConfig => ({\n\tresolve,\n')
		expect(live).toContain("include: ['tests/service/**/*.test.ts']")
		expect(live).toContain("setupFiles: ['./tests/setup.ts', './tests/setupService.ts'],")
		expect(live).toContain('\t\tfileParallelism: false,\n')
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
			"import type { UserConfig } from 'vite'\nimport { defineConfig } from 'vitest/config'\nimport manifest from './package.json' with { type: 'json' }\nimport tsconfig from './tsconfig.json' with { type: 'json' }\nimport { enforceBuildLog } from './configs/helpers.js'\nimport { fileURLToPath, URL } from 'node:url'",
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
		expect(published).toContain('\t\t\tprovider: playwright(browserOptions),\n')
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
			"\t\t\texternal: (id: string) =>\n\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'browser'] }))).toContain(
			"\t\t\texternal: (id: string) =>\n\t\t\t\tid === '@src/core' ||\n\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['server'] }))).toContain(
			"\t\t\texternal: (id: string) =>\n\t\t\t\tid.startsWith('node:') ||\n\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'server'] }))).toContain(
			"\t\t\texternal: (id: string) =>\n\t\t\t\tid === '@src/core' ||\n\t\t\t\tid.startsWith('node:') ||\n\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n",
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

	// Both published faces roll up through `declarationRollup`, and both reach core
	// through the shared `rewriteCoreSpecifier`, so each carries the same call and
	// comment where a reader of that file meets it.
	it('reaches core through the rewrite in every emitted published face', () => {
		const artifacts = blueprintToConfigArtifacts(
			buildBlueprint({ src: ['core', 'browser', 'server'] }),
		)
		for (const path of [
			'configs/src/vite.browser.config.ts',
			'configs/src/vite.server.config.ts',
		]) {
			const face = artifacts.find((artifact) => artifact.path === path)
			expect(face?.content).toContain('declarationRollup({')
			expect(face?.content).toContain('rewrite: rewriteCoreSpecifier,')
			expect(face?.content).toContain(
				"// The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite\n// externalizes core through the package's own published root export, on the final roll-up alone.",
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

	// The front page is the workspace's own prose, written once. The pointers are
	// scaffold's, so they are content-owned and restored whenever they drift.
	it('emits the front page beside the two root instruction pointers', () => {
		const documents = blueprintToDocumentArtifacts(buildBlueprint({ name: 'widget' }))
		expect(documents.map(({ path }) => path)).toStrictEqual(['README.md', 'AGENTS.md', 'CLAUDE.md'])
		expect(documents.map(({ ownership }) => ownership)).toStrictEqual([
			'birth',
			'content',
			'content',
		])
		expect(documents.every(({ group, origin }) => group === 'docs' && origin === 'template')).toBe(
			true,
		)
		const [, agents, claude] = documents
		expect(agents?.content).toContain('`../scaffold/.agents/orchestration.md`')
		expect(agents?.content).toContain('`node_modules/@orkestrel/scaffold/dist/host/AGENTS.md`')
		expect(claude?.content).toContain('`AGENTS.md`')
		// The pointer carries no varying span, so the blueprint's own name never
		// reaches it. A body that named the workspace would need a fill.
		expect(agents?.content).not.toContain('widget')
		expect(claude?.content).not.toContain('widget')
	})

	// Every host artifact is a path the target receives bytes for. The catalog file
	// sits inside the canon and is planned anyway, because `catalog` refuses a
	// target that lacks it and `repair` restores its absence. This names the
	// vendored neighbours the moved wiring left behind, so a removal that took a
	// sibling with it is visible.
	it('plans the catalog file inside the canon and none of the moved wiring', () => {
		const artifacts = blueprintToHostArtifacts(buildBlueprint({ name: 'router', guides: true }))
		const paths = artifacts.map(({ path }) => path)
		const canon = paths.filter((path) => isCanonPath(path))
		expect(canon).toStrictEqual(['.claude/agents/orkestrel.md'])
		expect(artifacts).toContainEqual({
			path: '.claude/agents/orkestrel.md',
			group: 'orchestration',
			ownership: 'presence',
			origin: 'host',
		})
		for (const path of [
			'.claude/agents',
			'.codex/agents',
			'.codex/config.toml',
			'.cursor/mcp.json',
			'.cursor/rules',
			'.mcp.json',
		]) {
			expect(paths).not.toContain(path)
		}
		expect(paths).toContain('.claude/settings.json')
		expect(paths).toContain('scripts')
		expect(
			artifacts.every(({ ownership, origin }) => ownership === 'presence' && origin === 'host'),
		).toBe(true)
	})

	// The package owns the guides proof. Scaffold emits its command and Vitest
	// project only when guides are selected; it never vendors the authored entry.
	it('runs the package-owned guides proof only when selected', () => {
		const indexed = buildBlueprint({ name: 'widget', guides: true })
		const bare = buildBlueprint({ name: 'widget', guides: false })
		const planned = blueprintToHostArtifacts(indexed).map(({ path }) => path)
		const withheld = blueprintToHostArtifacts(bare).map(({ path }) => path)

		expect(planned).not.toContain('scripts/guides.ts')
		expect(withheld).not.toContain('scripts/guides.ts')
		expect(blueprintToScripts(indexed)['test:guides']).toBe(
			'node --experimental-strip-types tests/guides.test.ts',
		)
		expect(blueprintToScripts(bare)).not.toHaveProperty('test:guides')
		expect(withheld).toStrictEqual(planned)
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

// The package-owned entry is driven as the process a workspace runs. The synthetic
// guides project collects its observation at a separate path, so it never replaces
// the entry's Guide behavior.
const ENTRY_PATH = 'tests/guides.test.ts'
const ENTRY_OBSERVATION_PATH = 'tests/fixture.test.ts'

const ENTRY_MANIFEST = [
	'{',
	'\t"name": "@sample/widget",',
	'\t"private": true,',
	'\t"type": "module",',
	'\t"scripts": {',
	'\t\t"test:guides": "node --experimental-strip-types tests/guides.test.ts"',
	'\t}',
	'}',
	'',
].join('\n')

const ENTRY_README = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
].join('\n')

// The pair the entry reports and never writes: the README pitch against the
// guide tagline. Ruling 6 keeps the README authored by hand.
const ENTRY_PITCH = ['# Widget', '', '> A widget kit the sample workspace publishes.', ''].join(
	'\n',
)

const ENTRY_INDEX = [
	'# Guides',
	'',
	'## By concept',
	'',
	'| Concept | Spec | Source | Tests |',
	'| --- | --- | --- | --- |',
	'| Widget | [`widget.md`](widget.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
	'',
].join('\n')

const ENTRY_BARREL = ["export * from './widget.js'", ''].join('\n')

// Surface and Methods cells and a titled fence, each planted against
// the source beneath. Every other byte of this file is what a write must leave.
const ENTRY_GUIDE = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `shape` | function | Shapes a widget from its parts. |',
	'| `Widget` | interface | One widget the workspace renders. |',
	'',
	'## Methods',
	'',
	'#### `Widget`',
	'',
	'| Method | Summary |',
	'| --- | --- |',
	'| `paint` | Paints the widget onto the surface. |',
	'',
	'## Examples',
	'',
	'### Shape a widget',
	'',
	'```ts',
	"shape('round')",
	'```',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
	'',
].join('\n')

// What `--to guide` owes: the planted cells carrying the source text and
// every other byte of `ENTRY_GUIDE` unmoved. A sampled reading cannot see a row
// the table re-render drops, a heading it disturbs, or padding it re-aligns,
// which is the class the claim exists to catch, so the write is compared whole.
const ENTRY_GUIDE_WRITTEN = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `shape` | function | Shapes a widget from the parts it is given. |',
	'| `Widget` | interface | One widget the workspace renders. |',
	'',
	'## Methods',
	'',
	'#### `Widget`',
	'',
	'| Method | Summary |',
	'| --- | --- |',
	'| `paint` | Paints the widget onto the frame. |',
	'',
	'## Examples',
	'',
	'### Shape a widget',
	'',
	'```ts',
	"shape('square')",
	'```',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
	'',
].join('\n')

const ENTRY_SOURCE = [
	'/**',
	' * Shapes a widget from the parts it is given.',
	' *',
	' * @param parts - The parts to shape.',
	' * @returns The shaped widget.',
	' *',
	' * @example Shape a widget',
	' * ```ts',
	" * shape('square')",
	' * ```',
	' */',
	'export function shape(parts: string): string {',
	'\treturn parts',
	'}',
	'',
	'/** One widget the workspace renders. */',
	'export interface Widget {',
	'\t/** Paints the widget onto the frame. */',
	'\tpaint(): void',
	'}',
	'',
].join('\n')

// The reported workspace: every summary and example already agrees, the guide
// documents one export carrying no doc block, and the pitch differs. Neither
// disagreement has a side a write can take.
const ENTRY_REPORTED_GUIDE = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `shape` | function | Shapes a widget from the parts it is given. |',
	'| `measure` | function | Measures a widget against the frame it fills. |',
	'| `Widget` | interface | One widget the workspace renders. |',
	'',
	'## Methods',
	'',
	'#### `Widget`',
	'',
	'| Method | Summary |',
	'| --- | --- |',
	'| `paint` | Paints the widget onto the frame. |',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
	'',
].join('\n')

const ENTRY_UNDOCUMENTED = [
	'',
	'export function measure(parts: string): number {',
	'\treturn parts.length',
	'}',
	'',
].join('\n')

const ENTRY_FILES: Readonly<Record<string, string>> = Object.freeze({
	'package.json': ENTRY_MANIFEST,
	'README.md': ENTRY_README,
	'guides/README.md': ENTRY_INDEX,
	'guides/widget.md': ENTRY_GUIDE,
	'src/core/index.ts': ENTRY_BARREL,
	'src/core/widget.ts': ENTRY_SOURCE,
})

const ENTRY_VITE = [
	"import { defineConfig } from 'vitest/config'",
	'',
	'export default defineConfig({',
	'\ttest: {',
	'\t\tprojects: [',
	'\t\t\t{',
	"\t\t\t\ttest: { name: { label: 'guides', color: 'green' }, include: ['tests/fixture.test.ts'], environment: 'node' },",
	'\t\t\t},',
	'\t\t],',
	'\t},',
	'})',
	'',
].join('\n')

const ENTRY_AUTHORED_VITE = ENTRY_VITE.replace(ENTRY_OBSERVATION_PATH, ENTRY_PATH)

const ENTRY_AUTHORED_TEST = [
	"import { GuideCommand } from '@orkestrel/guide/server'",
	"import { readInventory } from '@orkestrel/test/server'",
	"import { createVitest } from 'vitest/node'",
	'',
	'await new GuideCommand({',
	"\troot: new URL('../', import.meta.url),",
	"\tpatterns: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'],",
	"\tmodules: { '@sample/widget': 'src/core' },",
	"\tlanguages: ['ts'],",
	"\tlanguage: 'ts',",
	'\treader: readInventory,',
	'\trunner: createVitest,',
	'}).execute(async ({ report }) => {',
	"\tconst { expect, it } = await import('vitest')",
	'',
	"\tit('runs the authored worker callback', () => {",
	'\t\texpect(report.input).toEqual([])',
	'\t})',
	'})',
	'',
].join('\n')

const ENTRY_PASSING_TEST = [
	"import { expect, it } from 'vitest'",
	'',
	"it('runs the generated guides project', () => {",
	'\texpect(true).toBe(true)',
	'})',
	'',
].join('\n')

const ENTRY_FRESH_TEST = [
	"import { readFileSync } from 'node:fs'",
	"import { resolve } from 'node:path'",
	"import { expect, it } from 'vitest'",
	'',
	"const source = readFileSync(resolve('src/core/widget.ts'), 'utf8')",
	'',
	"it('reads source bytes written before Vitest starts', () => {",
	"\texpect(source).toContain(' * Shapes a widget from its parts.')",
	'})',
	'',
].join('\n')

const ENTRY_FAILING_TEST = [
	"import { expect, it } from 'vitest'",
	'',
	"it('propagates a guides-project failure', () => {",
	"\texpect('failed').toBe('passed')",
	'})',
	'',
].join('\n')

const ENTRY_START_TEST = [
	"import { writeFileSync } from 'node:fs'",
	"import { expect, it } from 'vitest'",
	'',
	"writeFileSync('vitest-started', 'started\\n', 'utf8')",
	'',
	"it('records project startup', () => {",
	'\texpect(true).toBe(true)',
	'})',
	'',
].join('\n')

const ENTRY_UNHANDLED_TEST = [
	"import { expect, it } from 'vitest'",
	'',
	"Promise.reject(new Error('unhandled guides error'))",
	'',
	"it('passes while the project reports an unhandled error', () => {",
	'\texpect(true).toBe(true)',
	'})',
	'',
].join('\n')

const ENTRY_REPORTED: Readonly<Record<string, string>> = Object.freeze({
	...ENTRY_FILES,
	'README.md': ENTRY_PITCH,
	'guides/widget.md': ENTRY_REPORTED_GUIDE,
	'src/core/widget.ts': `${ENTRY_SOURCE}${ENTRY_UNDOCUMENTED}`,
})

// A manifest declaring no `name`, so native own-guide selection finds no package
// guide: the standing drift still prints, and no pitch line ever joins it.
const ENTRY_NAMELESS_MANIFEST = [
	'{',
	'\t"private": true,',
	'\t"type": "module",',
	'\t"scripts": {',
	'\t\t"test:guides": "node --experimental-strip-types tests/guides.test.ts"',
	'\t}',
	'}',
	'',
].join('\n')

const ENTRY_NAMELESS: Readonly<Record<string, string>> = Object.freeze({
	...ENTRY_REPORTED,
	'package.json': ENTRY_NAMELESS_MANIFEST,
})

// The index the whole run reads from, naming a guide under a spec other than
// this workspace's own: the manifest still names `widget`, but no row's `spec`
// is `guides/widget.md`, so native own-guide selection finds nothing and the
// pitch block never runs even though the manifest names one.
const ENTRY_UNOWNED_INDEX = [
	'# Guides',
	'',
	'## By concept',
	'',
	'| Concept | Spec | Source | Tests |',
	'| --- | --- | --- | --- |',
	'| Widget | [`component.md`](component.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
	'',
].join('\n')

const ENTRY_UNOWNED: Readonly<Record<string, string>> = Object.freeze({
	'package.json': ENTRY_MANIFEST,
	'README.md': ENTRY_PITCH,
	'guides/README.md': ENTRY_UNOWNED_INDEX,
	'guides/component.md': ENTRY_REPORTED_GUIDE,
	'src/core/index.ts': ENTRY_BARREL,
	'src/core/widget.ts': `${ENTRY_SOURCE}${ENTRY_UNDOCUMENTED}`,
})

// The overlapping workspace: a parent row over `src/core` and a child row over
// `src/core/panels`, each documenting one declaration of the same source file.
// A module scope selects every file beneath it, so each row reaches
// `src/core/panels/panel.ts`, and a run that seeds its texts per row from the
// frozen inventory writes that file once per row and keeps the later rewrite
// alone.
const ENTRY_OVERLAP_INDEX = [
	'# Guides',
	'',
	'## By concept',
	'',
	'| Concept | Spec | Source | Tests |',
	'| --- | --- | --- | --- |',
	'| Widget | [`widget.md`](widget.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
	'| Panel | [`panel.md`](panel.md) | [`src/core/panels`](../src/core/panels) | [`tests/src/core/panels`](../tests/src/core/panels) |',
	'',
].join('\n')

const ENTRY_OVERLAP_PARENT = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `frame` | function | Frames a widget for the panel. |',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/panels/panel.test.ts`](../tests/src/core/panels/panel.test.ts)',
	'',
].join('\n')

// A third row duplicating the parent's `frame` declaration with the parent's
// cell text byte-identical: after the parent row's rewrite, the child row's
// rewrite of that same block is a no-op, which is the shape that exercises
// the written-count no-op limb.
const ENTRY_OVERLAP_CHILD = [
	'# Panel',
	'',
	'> A panel the widget toolkit renders into.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `paint` | function | Paints the panel onto the frame. |',
	'| `frame` | function | Frames a widget for the panel. |',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/panels/panel.test.ts`](../tests/src/core/panels/panel.test.ts)',
	'',
].join('\n')

const ENTRY_OVERLAP_SOURCE = [
	'/**',
	' * Frames a widget for the panel it sits in.',
	' *',
	' * @param widget - The widget to frame.',
	' * @returns The framed widget.',
	' */',
	'export function frame(widget: string): string {',
	'\treturn widget',
	'}',
	'',
	'/**',
	' * Paints the panel onto the frame it was given.',
	' *',
	' * @param panel - The panel to paint.',
	' * @returns The painted panel.',
	' */',
	'export function paint(panel: string): string {',
	'\treturn panel',
	'}',
	'',
].join('\n')

const ENTRY_OVERLAP_WRITTEN = [
	'/**',
	' * Frames a widget for the panel.',
	' *',
	' * @param widget - The widget to frame.',
	' * @returns The framed widget.',
	' */',
	'export function frame(widget: string): string {',
	'\treturn widget',
	'}',
	'',
	'/**',
	' * Paints the panel onto the frame.',
	' *',
	' * @param panel - The panel to paint.',
	' * @returns The painted panel.',
	' */',
	'export function paint(panel: string): string {',
	'\treturn panel',
	'}',
	'',
].join('\n')

const ENTRY_OVERLAP: Readonly<Record<string, string>> = Object.freeze({
	'package.json': ENTRY_MANIFEST,
	'README.md': ENTRY_README,
	'guides/README.md': ENTRY_OVERLAP_INDEX,
	'guides/widget.md': ENTRY_OVERLAP_PARENT,
	'guides/panel.md': ENTRY_OVERLAP_CHILD,
	'src/core/index.ts': ["export * from './panels/index.js'", ''].join('\n'),
	'src/core/panels/index.ts': ["export * from './panel.js'", ''].join('\n'),
	'src/core/panels/panel.ts': ENTRY_OVERLAP_SOURCE,
})

// The index the whole run reads from, absent.
const ENTRY_UNINDEXED: Readonly<Record<string, string>> = Object.freeze(
	Object.fromEntries(Object.entries(ENTRY_FILES).filter(([path]) => path !== 'guides/README.md')),
)

// An index row naming a guide the workspace does not carry.
const ENTRY_UNCARRIED: Readonly<Record<string, string>> = Object.freeze({
	...ENTRY_FILES,
	'guides/README.md': [
		ENTRY_INDEX.trimEnd(),
		'| Panel | [`panel.md`](panel.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
		'',
	].join('\n'),
})

/**
 * Links an installed package into the fixture workspace without installing.
 *
 * @param scratch - The fixture workspace to receive the package.
 * @param name - The installed package name to link.
 * @returns Nothing.
 */
function linkPackage(scratch: ScratchInterface, name: string): void {
	const destination = join(scratch.path, 'node_modules', ...name.split('/'))
	mkdirSync(dirname(destination), { recursive: true })
	symlinkSync(resolve('node_modules', ...name.split('/')), destination, 'junction')
}

/**
 * Builds a workspace carrying the entry, its readers, and the planted disagreements.
 *
 * @param files - The workspace files to write, keyed root-relative.
 * @param test - The guides-project module to run.
 * @returns The allocated scratch workspace.
 */
function buildEntryWorkspace(
	files: Readonly<Record<string, string>>,
	test = ENTRY_PASSING_TEST,
): ScratchInterface {
	const scratch = createScratch({ prefix: 'scaffold guides ' })
	for (const [path, text] of Object.entries(files)) scratch.write(path, text)
	scratch.write(ENTRY_PATH, readFileSync(resolve(ENTRY_PATH), 'utf8'))
	scratch.write('vite.config.ts', ENTRY_VITE)
	scratch.write(ENTRY_OBSERVATION_PATH, test)
	linkPackage(scratch, '@orkestrel/contract')
	linkPackage(scratch, '@orkestrel/guide')
	linkPackage(scratch, '@orkestrel/test')
	linkPackage(scratch, 'vite')
	linkPackage(scratch, 'vitest')
	return scratch
}

/**
 * Runs the entry through npm and reads what the process reported.
 *
 * @param scratch - The workspace to run in.
 * @param args - The arguments forwarded to `test:guides`.
 * @param vitest - The optional `VITEST` value supplied to the child process.
 * @returns The exit status, the lines the run printed without the trailing blank, and its error stream.
 */
function runEntry(
	scratch: ScratchInterface,
	args: readonly string[],
	vitest?: string,
): { readonly status: number | null; readonly lines: readonly string[]; readonly stderr: string } {
	const adjacent = resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js')
	const npm = process.env.npm_execpath ?? (existsSync(adjacent) ? adjacent : undefined)
	if (npm === undefined) throw new Error('The npm CLI module is unavailable.')
	const forwarded = args.length === 0 ? [] : ['--', ...args]
	const env = { ...process.env }
	if (vitest === undefined) delete env.VITEST
	else env.VITEST = vitest
	const run = spawnSync(
		process.execPath,
		[npm, '--loglevel=error', 'run', 'test:guides', ...forwarded],
		{
			cwd: scratch.path,
			encoding: 'utf8',
			env,
			windowsHide: true,
		},
	)
	return {
		status: run.status,
		lines: run.stdout
			.split(/\r\n|\n/)
			.filter(
				(line) =>
					line.startsWith('guides/') ||
					line.startsWith('wrote ') ||
					line.startsWith('next: ') ||
					line.startsWith('usage: '),
			),
		stderr: run.stderr,
	}
}

describe('blueprintToRootTsconfig own specifiers', () => {
	// The generated root program resolves the workspace's own published names to
	// source. Left to the package's own `exports` map they resolve to `dist/`, which
	// would hold `npm run check` behind `npm run build` in the package that publishes
	// the module a vendored file imports.
	it('maps every published subpath before the bare specifier and maps no app entry', () => {
		const published = blueprintToRootTsconfig(
			buildBlueprint({ name: 'router', src: ['core', 'browser', 'server'], app: ['core'] }),
		)

		// The whole block, so membership and order are read together: an alias record
		// is matched in declaration order and a bare specifier also matches its own
		// subpaths, so a bare entry written first would answer every subpath import.
		expect(published).toContain(`\t\t"paths": {
\t\t\t"@src/core": ["./src/core/index.ts"],
\t\t\t"@src/browser": ["./src/browser/index.ts"],
\t\t\t"@src/server": ["./src/server/index.ts"],
\t\t\t"@app/core": ["./app/core/index.ts"],
\t\t\t"@orkestrel/router/browser": ["./src/browser/index.ts"],
\t\t\t"@orkestrel/router/server": ["./src/server/index.ts"],
\t\t\t"@orkestrel/router": ["./src/core/index.ts"]
\t\t}`)
		// The published set this mirrors belongs to the manifest builder, so the
		// subpaths are read from there rather than restated: a map that gains one and a
		// `paths` block that does not report here.
		expect(
			Object.keys(srcToExports(['core', 'browser', 'server'])).filter(
				(subpath) => subpath !== './package.json',
			),
		).toStrictEqual(['.', './browser', './server'])
	})

	it('maps a single published environment at the bare specifier alone', () => {
		const published = blueprintToRootTsconfig(buildBlueprint({ name: 'router', src: ['browser'] }))

		expect(published).toContain('"@orkestrel/router": ["./src/browser/index.ts"]')
		expect(published).not.toContain('"@orkestrel/router/browser"')
		expect(
			Object.keys(srcToExports(['browser'])).filter((subpath) => subpath !== './package.json'),
		).toStrictEqual(['.'])
	})

	it('maps no own specifier for a workspace that publishes nothing', () => {
		const published = blueprintToRootTsconfig(
			buildBlueprint({ name: 'router', src: [], app: ['server'] }),
		)

		expect(published).toContain('"@app/server": ["./app/server/index.ts"]')
		expect(published).not.toContain('@orkestrel/router')
		expect(srcToExports([])).toStrictEqual({})
	})
})

describe('the guides entry', () => {
	it('keeps the package-owned entry free of named local command functions', () => {
		const functions = readStatements(readFileSync(resolve(ENTRY_PATH), 'utf8'), ENTRY_PATH).flatMap(
			(statement) =>
				statement.syntax === 'FunctionDeclaration'
					? statement.declarations.map(({ name }) => name)
					: [],
		)
		const control = readStatements(
			'function localGuideCommand(): void {}\nnew GuideCommand().execute(async () => {})\n',
			'guide-command-control.ts',
		).flatMap((statement) =>
			statement.syntax === 'FunctionDeclaration'
				? statement.declarations.map(({ name }) => name)
				: [],
		)

		expect(control).toStrictEqual(['localGuideCommand'])
		expect(functions).toStrictEqual([])
	})

	it('runs the native command when VITEST is false', async () => {
		const scratch = buildEntryWorkspace(ENTRY_FILES)
		try {
			const run = runEntry(scratch, ['--to', 'guide'], 'false')
			expect(scratch.read('guides/widget.md')).toBe(ENTRY_GUIDE_WRITTEN)
			expect(run.status).toBe(0)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('registers assertions from an authored entry in the guides worker', async () => {
		const passing = buildEntryWorkspace(ENTRY_FILES)
		const failing = buildEntryWorkspace(ENTRY_FILES)
		try {
			passing.write(ENTRY_PATH, ENTRY_AUTHORED_TEST)
			passing.write('vite.config.ts', ENTRY_AUTHORED_VITE)
			failing.write(
				ENTRY_PATH,
				ENTRY_AUTHORED_TEST.replace(
					'expect(report.input).toEqual([])',
					"expect(report.input).toEqual([{ text: 'unreachable' }])",
				),
			)
			failing.write('vite.config.ts', ENTRY_AUTHORED_VITE)

			expect(runEntry(passing, []).status).toBe(0)
			expect(runEntry(failing, []).status).toBe(1)
		} finally {
			await destroyScratch(passing, { budget: 5000 })
			await destroyScratch(failing, { budget: 5000 })
		}
	})

	it.each(['guide', 'source'])(
		'keeps summary and example namespaces distinct toward %s',
		async (direction) => {
			const guide = ENTRY_GUIDE_WRITTEN.replace(
				'Shapes a widget from the parts it is given.',
				'Shapes a widget from its parts.',
			)
				.replace('Shape a widget', 'function shape')
				.replace("shape('square')", "shape('round')")
			const source = ENTRY_SOURCE.replace('Shape a widget', 'function shape')
			const expectedGuide = guide
				.replace('Shapes a widget from its parts.', 'Shapes a widget from the parts it is given.')
				.replace("shape('round')", "shape('square')")
			const expectedSource = source
				.replace('Shapes a widget from the parts it is given.', 'Shapes a widget from its parts.')
				.replace("shape('square')", "shape('round')")
			const scratch = buildEntryWorkspace({
				...ENTRY_FILES,
				'guides/widget.md': guide,
				'src/core/widget.ts': source,
			})
			try {
				const run = runEntry(scratch, ['--to', direction])
				expect(scratch.read('guides/widget.md')).toBe(direction === 'guide' ? expectedGuide : guide)
				expect(scratch.read('src/core/widget.ts')).toBe(
					direction === 'source' ? expectedSource : source,
				)
				expect(run.status).toBe(0)
			} finally {
				await destroyScratch(scratch, { budget: 5000 })
			}
		},
	)

	it('keeps the first matched title and absent-language comparison boundaries', async () => {
		const repeatedGuide = `${ENTRY_GUIDE_WRITTEN}\n### Shape a widget\n\n\`\`\`ts\nshape('later')\n\`\`\`\n`
		const repeated = buildEntryWorkspace({
			...ENTRY_FILES,
			'guides/widget.md': repeatedGuide,
		})
		const absentGuide = ENTRY_GUIDE_WRITTEN.replace('```ts', '```').replace(
			"shape('square')",
			"shape('round')",
		)
		const absentSource = ENTRY_SOURCE.replace(' * ```ts', ' * ```')
		const absent = buildEntryWorkspace({
			...ENTRY_FILES,
			'guides/widget.md': absentGuide,
			'src/core/widget.ts': absentSource,
		})
		try {
			expect(runEntry(repeated, ['--to', 'guide']).status).toBe(0)
			expect(repeated.read('guides/widget.md')).toBe(repeatedGuide)
			expect(runEntry(absent, ['--to', 'guide']).status).toBe(0)
			expect(absent.read('guides/widget.md')).toBe(
				absentGuide.replace("shape('round')", "shape('square')"),
			)
		} finally {
			await destroyScratch(repeated, { budget: 5000 })
			await destroyScratch(absent, { budget: 5000 })
		}
	})

	it('runs assertion-owned parity without a parent report or write', async () => {
		const scratch = buildEntryWorkspace(ENTRY_FILES)
		try {
			const run = runEntry(scratch, [])

			expect(run.lines).toEqual([])
			expect(run.status).toBe(0)
			// Only a direction writes.
			for (const [path, text] of Object.entries(ENTRY_FILES)) {
				expect(scratch.read(path)).toBe(text)
			}
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('carries every summary and example to the guide and leaves every other byte', async () => {
		const scratch = buildEntryWorkspace(ENTRY_FILES)
		try {
			const run = runEntry(scratch, ['--to', 'guide'])
			const guide = scratch.read('guides/widget.md') ?? ''

			expect(run.lines).toEqual(['wrote guides/widget.md', 'next: npm run format'])
			expect(run.status).toBe(0)
			// The whole file, so a dropped row, a disturbed heading, and re-aligned
			// padding each report here. The landmarks beneath name what the comparison
			// is about: the rewritten cells, and the fence, the tagline, and the link
			// that travel unchanged.
			expect(guide).toBe(ENTRY_GUIDE_WRITTEN)
			expect(guide).toContain(
				'| `shape` | function | Shapes a widget from the parts it is given. |',
			)
			expect(guide).toContain('| `paint` | Paints the widget onto the frame. |')
			expect(guide).toContain("```ts\nshape('square')\n```")
			expect(guide).toContain('> A widget toolkit the sample workspace publishes.')
			expect(guide).toContain(
				'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
			)
			expect(scratch.read('src/core/widget.ts')).toBe(ENTRY_SOURCE)
			expect(scratch.read('README.md')).toBe(ENTRY_README)
			expect(scratch.read('guides/README.md')).toBe(ENTRY_INDEX)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('carries every summary and example to the source, and reads back clean', async () => {
		const scratch = buildEntryWorkspace(ENTRY_FILES, ENTRY_FRESH_TEST)
		try {
			const written = runEntry(scratch, ['--to', 'source'])
			const source = scratch.read('src/core/widget.ts') ?? ''
			const again = runEntry(scratch, [])

			expect(written.lines).toEqual(['wrote src/core/widget.ts', 'next: npm run format'])
			expect(written.status).toBe(0)
			expect(source).toContain(' * Shapes a widget from its parts.')
			expect(source).toContain(" * shape('round')")
			expect(source).toContain('\t/** Paints the widget onto the surface. */')
			// The doc block's own frame survives the rewrite: its tags, its
			// continuation markers, and the member's indentation.
			expect(source).toContain(' * @param parts - The parts to shape.')
			expect(source).toContain(' * @example Shape a widget')
			expect(scratch.read('guides/widget.md')).toBe(ENTRY_GUIDE)
			expect(again.lines).toEqual([])
			expect(again.status).toBe(0)
			scratch.write(ENTRY_OBSERVATION_PATH, ENTRY_FAILING_TEST)
			const failed = runEntry(scratch, [])
			expect(failed.lines).toEqual([])
			expect(failed.status).toBe(1)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('reports a key no doc block carries and the pitch, and leaves both files', async () => {
		const scratch = buildEntryWorkspace(ENTRY_REPORTED)
		try {
			const run = runEntry(scratch, ['--to', 'source'])

			expect(run.lines).toEqual([
				'guides/widget.md summary function measure: guide "Measures a widget against the frame it fills." source absent; the source doc block or its provenance is unavailable',
				'guides/widget.md pitch: README "A widget kit the sample workspace publishes." guide "A widget toolkit the sample workspace publishes.".',
			])
			expect(run.status).toBe(1)
			// Nothing was written, so no file moved and no formatter step is named.
			expect(run.lines).not.toContain('next: npm run format')
			expect(scratch.read('src/core/widget.ts')).toBe(`${ENTRY_SOURCE}${ENTRY_UNDOCUMENTED}`)
			expect(scratch.read('README.md')).toBe(ENTRY_PITCH)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('carries no pitch line for a manifest declaring no name', async () => {
		const scratch = buildEntryWorkspace(ENTRY_NAMELESS)
		try {
			const run = runEntry(scratch, ['--to', 'source'])

			expect(run.lines).toEqual([
				'guides/widget.md summary function measure: guide "Measures a widget against the frame it fills." source absent; the source doc block or its provenance is unavailable',
			])
			expect(run.status).toBe(1)
			expect(scratch.read('README.md')).toBe(ENTRY_PITCH)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('carries no pitch line for a manifest naming a guide the index does not index under its own spec', async () => {
		const scratch = buildEntryWorkspace(ENTRY_UNOWNED)
		try {
			const run = runEntry(scratch, ['--to', 'source'])

			expect(run.lines).toEqual([
				'guides/component.md summary function measure: guide "Measures a widget against the frame it fills." source absent; the source doc block or its provenance is unavailable',
			])
			expect(run.status).toBe(1)
			expect(scratch.read('README.md')).toBe(ENTRY_PITCH)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('prints one usage line and takes exit 2 for an argument outside its option', async () => {
		const scratch = buildEntryWorkspace(ENTRY_FILES, ENTRY_START_TEST)
		try {
			const unknown = runEntry(scratch, ['--to', 'sideways'])
			const stray = runEntry(scratch, ['--write'])

			expect(unknown.lines).toEqual(['usage: npm run test:guides [-- --to guide|--to source]'])
			expect(unknown.status).toBe(2)
			expect(stray.lines).toEqual(['usage: npm run test:guides [-- --to guide|--to source]'])
			expect(stray.status).toBe(2)
			expect(scratch.read('guides/widget.md')).toBe(ENTRY_GUIDE)
			expect(scratch.has('vitest-started')).toBe(false)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	// A parent scope and a child scope reach one file, and the run holds one
	// current text per file so the later row rewrites what the earlier row left
	// rather than the bytes the run started from. A file that moved is written
	// once, after every row has run.
	it('carries every overlapping row into one source file and writes that file once', async () => {
		const scratch = buildEntryWorkspace(ENTRY_OVERLAP)
		try {
			const reported = runEntry(scratch, [])
			const written = runEntry(scratch, ['--to', 'source'])
			const source = scratch.read('src/core/panels/panel.ts') ?? ''

			expect(reported.lines).toEqual([])
			expect(reported.status).toBe(0)
			expect(written.lines).toEqual(['wrote src/core/panels/panel.ts', 'next: npm run format'])
			expect(written.stderr).toBe('')
			expect(written.status).toBe(0)
			// Every rewrite in one file, and the file named once: a run that re-seeded
			// its texts per row keeps the later rewrite alone and names the file again.
			expect(source).toBe(ENTRY_OVERLAP_WRITTEN)
			expect(written.lines.filter((line) => line.startsWith('wrote '))).toHaveLength(1)
			expect(runEntry(scratch, []).lines).toEqual([])
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	// The index is the run's own input, so a workspace that carries none and an
	// index naming a guide the workspace lacks are argument faults rather than
	// disagreements. An uncaught throw would exit 1 with a stack trace, which is
	// the code a standing disagreement already means.
	it('names the concept index it cannot read and takes exit 2', async () => {
		const scratch = buildEntryWorkspace(ENTRY_UNINDEXED, ENTRY_START_TEST)
		try {
			const run = runEntry(scratch, ['--to', 'source'])

			expect(run.lines).toEqual([
				'guides/README.md: the workspace carries no concept index to read',
			])
			expect(run.status).toBe(2)
			expect(run.stderr).toBe('')
			expect(scratch.read('src/core/widget.ts')).toBe(ENTRY_SOURCE)
			expect(scratch.has('vitest-started')).toBe(false)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('names the indexed guide the workspace does not carry and takes exit 2', async () => {
		const scratch = buildEntryWorkspace(ENTRY_UNCARRIED, ENTRY_START_TEST)
		try {
			const run = runEntry(scratch, ['--to', 'guide'])

			expect(run.lines).toEqual(['guides/panel.md is absent from the inventory.'])
			expect(run.status).toBe(2)
			expect(run.stderr).toBe('')
			expect(scratch.read('guides/widget.md')).toBe(ENTRY_GUIDE)
			expect(scratch.has('vitest-started')).toBe(false)
		} finally {
			await destroyScratch(scratch, { budget: 5000 })
		}
	})

	it('rejects an empty guides project and an unhandled project error', async () => {
		const empty = buildEntryWorkspace(ENTRY_FILES)
		const unhandled = buildEntryWorkspace(ENTRY_FILES, ENTRY_UNHANDLED_TEST)
		try {
			empty.remove(ENTRY_OBSERVATION_PATH)
			expect(runEntry(empty, []).status).toBe(1)
			expect(runEntry(unhandled, []).status).toBe(1)
		} finally {
			await destroyScratch(empty, { budget: 5000 })
			await destroyScratch(unhandled, { budget: 5000 })
		}
	})
})
