import {
	blueprintToDocumentArtifacts,
	blueprintToGuideArtifacts,
	blueprintToOrchestrationArtifacts,
	blueprintToScripts,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	ORKESTREL_RANGE_PATTERN,
} from '@src/core'
import { buildBlueprint } from '../../setup.js'
import { describe, expect, it } from 'vitest'

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
			'src/bin/widget.ts',
		])
		expect(
			artifacts.every(
				({ group, origin, ownership }) =>
					group === 'source' && origin === 'template' && ownership === 'birth',
			),
		).toBe(true)
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
			'tests/src/bin/widget.test.ts',
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
