import type { Ownership } from '@src/core'
import {
	artifactToFinding,
	blueprintToConfigArtifacts,
	blueprintToDevDependencies,
	blueprintToDocumentArtifacts,
	blueprintToGuideArtifacts,
	blueprintToOrchestrationArtifacts,
	blueprintToQuestions,
	blueprintToRootVite,
	blueprintToScripts,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	contentToHex,
	isFinding,
	ORKESTREL_RANGE_PATTERN,
} from '@src/core'
import { buildBlueprint, buildContentArtifact } from '../../setup.js'
import { describe, expect, it } from 'vitest'

const OWNERSHIPS: readonly Ownership[] = ['content', 'presence', 'birth']
const PLANNED = '# Sample\n'
const MATCHING = contentToHex(PLANNED)
const DIFFERING = contentToHex('# Edited\n')

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

describe('blueprintToScripts config projects', () => {
	it('emits the probe workbench outside every gate', () => {
		const scripts = blueprintToScripts(buildBlueprint())
		expect(scripts['test:probe']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe',
		)
		expect(scripts.test).not.toContain('test:probe')
		expect(scripts.prepublishOnly).not.toContain('test:probe')
	})

	it('does not invent test projects from service names alone', () => {
		const scripts = blueprintToScripts(buildBlueprint({ services: ['ollama'] }))
		expect(scripts['test:service']).toBeUndefined()
		expect(scripts['test:service:ollama']).toBeUndefined()
		expect(scripts.prepublishOnly).not.toContain('test:service')
	})

	it('emits only proofs that can pass in a fresh workspace', () => {
		const published = blueprintToScripts(buildBlueprint({ integration: true }))
		expect(published.test).toContain('test:config')
		expect(published['test:config']).toContain('--project config')
		expect(published['test:guides']).toBeUndefined()
		expect(published.test).not.toContain('test:guides')
		expect(published['test:integration']).toContain('--project integration')
		expect(published.test).not.toContain('test:integration')
		expect(published.prepublishOnly).toContain('test:integration')

		const application = blueprintToScripts(
			buildBlueprint({ src: [], app: ['core'], integration: true }),
		)
		expect(application['test:integration']).toBeUndefined()
		expect(application.prepublishOnly).not.toContain('test:integration')
	})
})

describe('blueprint gate laws', () => {
	it('blocks a multi-environment published axis without core', () => {
		const questions = blueprintToQuestions(buildBlueprint({ src: ['browser', 'server'] }))
		expect(questions).toContainEqual({
			field: 'src',
			message: 'Several published environments require core at the package root.',
			blocking: true,
			candidates: ['core', 'browser', 'server'],
		})
	})

	it('drops axis-dependent structural flags when their required axes are absent', () => {
		const integration = buildBlueprint({ src: [], app: ['server'], integration: true })
		const showcase = buildBlueprint({ src: ['core'], app: [], showcase: true })

		expect(blueprintToQuestions(integration)).toStrictEqual([])
		expect(blueprintToTestArtifacts(integration).map(({ path }) => path)).not.toContain(
			'tests/integration.test.ts',
		)
		expect(blueprintToScripts(integration)['test:integration']).toBeUndefined()
		expect(blueprintToQuestions(showcase)).toStrictEqual([])
		expect(blueprintToConfigArtifacts(showcase).map(({ path }) => path)).not.toContain(
			'configs/app/vite.showcase.config.ts',
		)
		expect(blueprintToScripts(showcase).showcase).toBeUndefined()
		expect(blueprintToDevDependencies(showcase)['vite-plugin-singlefile']).toBeUndefined()
	})
})

describe('blueprintToRootVite fixed proofs', () => {
	it('selects guides only when its exact proof path exists', () => {
		const configuration = blueprintToRootVite(buildBlueprint())
		expect(configuration).toContain('export const guides = (options?: UserConfig): UserConfig =>')
		expect(configuration).toContain("include: ['tests/guides.test.ts']")
		expect(configuration).toContain('function isExactCaseFile(path: string): boolean')
		expect(configuration).toContain(
			"...(isExactCaseFile(resolveWorkspacePath('tests/guides.test.ts')) ? [guides] : []),",
		)
		expect(configuration).not.toContain('projects: [guides]')
	})

	// A generated workspace runs the `lint:check` and `format:check` it was given on
	// the bytes `new` wrote, so each span below is pinned to the text those two gates
	// accept. Each covers the selections that reach both sides of its branch, because
	// one selection per span reads as covered while measuring one side.
	it('imports the boundary plugins a selection actually reaches', () => {
		// The four memberships the two symbols have: a core-only workspace builds
		// nothing and bounds nothing, `bin` bounds only its output, an application
		// core bounds only its environment, and a published server does both.
		expect(blueprintToRootVite(buildBlueprint({ src: ['core'] }))).not.toContain(
			"from './configs/helpers.js'",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core'], bin: true }))).toContain(
			"import { outputBoundary } from './configs/helpers.js'\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: [], app: ['core'] }))).toContain(
			"import { environmentBoundary } from './configs/helpers.js'\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'server'] }))).toContain(
			"import { environmentBoundary, outputBoundary } from './configs/helpers.js'\n",
		)
		// The unused import sat between two imports the config always makes, so the
		// span it left behind is pinned too.
		expect(blueprintToRootVite(buildBlueprint({ src: ['core'] }))).toContain(
			"import type { UserConfig } from 'vite'\nimport { defineConfig, mergeConfig } from 'vitest/config'\nimport tsconfig from './tsconfig.json' with { type: 'json' }\nimport { lstatSync",
		)
	})

	it('writes each selection-dependent span the way the formatter leaves it', () => {
		// The server predicate carries a third test with core beside it and passes
		// the vendored width; without core it fits the line it starts on, and a
		// formatter that reprints from the syntax tree joins it back either way.
		expect(blueprintToRootVite(buildBlueprint({ src: ['server'] }))).toContain(
			"\t\t\t\t\texternal: (id: string) => id.startsWith('node:') || id.startsWith('@orkestrel/'),\n",
		)
		expect(blueprintToRootVite(buildBlueprint({ src: ['core', 'server'] }))).toContain(
			"\t\t\t\t\texternal: (id: string) =>\n\t\t\t\t\t\tid === '@src/core' || id.startsWith('node:') || id.startsWith('@orkestrel/'),\n",
		)
		// The browser plugin array is held open by the showcase spread and by
		// nothing else, so without a showcase it is emitted joined.
		expect(blueprintToRootVite(buildBlueprint({ app: ['browser'] }))).toContain(
			"\t\tplugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],\n",
		)
		const showcase = blueprintToRootVite(buildBlueprint({ app: ['browser'], showcase: true }))
		expect(showcase).toContain(
			"\t\tplugins: [\n\t\t\toutputBoundary(output),\n\t\t\tenvironmentBoundary('app/browser'),\n\t\t\tvue(),\n\t\t\t...(showcase\n",
		)
		expect(showcase).toContain('\t\t\t\t: []),\n\t\t],\n')
	})

	it('explains the server declaration rewrite in every emitted workspace', () => {
		const server = blueprintToConfigArtifacts(buildBlueprint({ src: ['server'] })).find(
			({ path }) => path === 'configs/src/vite.server.config.ts',
		)
		expect(server?.content).toContain(
			'vite-plugin-dts rolls this face into one declaration, and the roll-up reaches',
		)
		expect(server?.content).toContain('final roll-up only')
	})

	it('joins the declaration rewrite only while the line it prints fits the width', () => {
		// The two names either side of the width: at 22 characters the joined call
		// prints exactly on the vendored 100 columns and at 23 it prints one past, so
		// the branch is observable only at that pair. Every longer name the gate
		// admits, up to `MAX_NAME_LENGTH`, takes the wrapped form.
		const fitted = blueprintToConfigArtifacts(
			buildBlueprint({ name: 'a'.repeat(22), src: ['core', 'server'] }),
		).find(({ path }) => path === 'configs/src/vite.server.config.ts')
		expect(fitted?.content).toContain(
			`\t\t\t\t\t\t? content.replaceAll(/(?:\\.\\.\\/)+core\\/index\\.ts/g, '@orkestrel/${'a'.repeat(22)}')\n`,
		)
		const wrapped = blueprintToConfigArtifacts(
			buildBlueprint({ name: 'a'.repeat(23), src: ['core', 'server'] }),
		).find(({ path }) => path === 'configs/src/vite.server.config.ts')
		expect(wrapped?.content).toContain(
			`\t\t\t\t\t\t? content.replaceAll(\n\t\t\t\t\t\t\t\t/(?:\\.\\.\\/)+core\\/index\\.ts/g,\n\t\t\t\t\t\t\t\t'@orkestrel/${'a'.repeat(23)}',\n\t\t\t\t\t\t\t)\n`,
		)
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
			'tests/integration.test.ts',
		])
		const tests = artifacts.filter(({ path }) => path.endsWith('.test.ts'))
		expect(tests).toHaveLength(8)
		for (const artifact of tests.filter(({ path }) => path !== 'tests/integration.test.ts')) {
			expect(artifact.content).toContain('Object.keys(entry)')
			expect(artifact.content).toContain('toStrictEqual([])')
		}
		expect(tests.at(-1)?.content).toContain('outside consumer')
	})

	it('emits the package front page and both required guide indexes', () => {
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

	it('emits only the honest service inventory skeleton when services are declared', () => {
		expect(blueprintToOrchestrationArtifacts(buildBlueprint())).toStrictEqual([])
		const [artifact] = blueprintToOrchestrationArtifacts(
			buildBlueprint({ services: ['ollama', 'postgres'] }),
		)
		expect(artifact?.path).toBe('scripts/service.sh')
		expect(artifact?.content).toContain("'ollama'")
		expect(artifact?.content).toContain("'postgres'")
		expect(artifact?.content).not.toContain('test:service')
	})
})

describe('artifactToFinding producer matrix', () => {
	// The instrument's population is every finding the producer can reach: all
	// three ownership tiers by the three observation states a target can present.
	// Its control is drawn from outside that population, because a control sampled
	// from inside it could only show the producer disagreeing with itself, and the
	// question here is what the producer never reaches at all.
	it('reaches four verdict shapes, and the guard admits one it never reaches', () => {
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
