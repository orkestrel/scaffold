import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fillTemplate, isTemplateError } from '@orkestrel/template'
import {
	ARTIFACT_TEMPLATES,
	blueprintToConfigArtifacts,
	blueprintToDevDependencies,
	blueprintToTestArtifacts,
	CONFIG_TEMPLATES,
	createBlueprint,
	createCompiler,
	MAX_NAME_LENGTH,
} from '@src/core'
import { describe, expect, it } from 'vitest'

describe('configuration templates', () => {
	it('uses the dependency fill boundary with missing placeholders closed', () => {
		for (const template of [CONFIG_TEMPLATES.root.tsconfig, ARTIFACT_TEMPLATES.docs.readme]) {
			let caught: unknown
			try {
				fillTemplate(template, {})
			} catch (error) {
				caught = error
			}
			expect(isTemplateError(caught)).toBe(true)
			if (!isTemplateError(caught)) throw new Error('Expected the template fill to fail closed')
			expect(caught.code).toBe('MISSING')
		}
	})

	it('fills every selected artifact without leaving a template token', () => {
		const blueprint = createBlueprint('widget', {
			src: ['core', 'browser', 'server'],
			app: ['core', 'browser', 'server'],
			bin: true,
			integration: true,
			global: true,
			showcase: true,
		})
		const artifacts = blueprintToConfigArtifacts(blueprint)
		expect(artifacts).toHaveLength(16)
		for (const artifact of artifacts) {
			expect(artifact.origin).toBe('template')
			if (artifact.origin === 'host') throw new Error('Expected a content artifact')
			expect(artifact.content).not.toMatch(/{{[^{}]+}}/)
		}
		const rootVite = artifacts.find(({ path }) => path === 'vite.config.ts')
		const coreConfig = artifacts.find(({ path }) => path === 'configs/src/tsconfig.core.json')
		const browserConfig = artifacts.find(({ path }) => path === 'configs/app/tsconfig.browser.json')
		if (
			rootVite?.origin === 'host' ||
			coreConfig?.origin === 'host' ||
			browserConfig?.origin === 'host'
		) {
			throw new Error('Expected configuration template content')
		}
		expect(rootVite?.content).toContain('projects: [')
		expect(rootVite?.content).toContain('\t\t\tprobe,')
		expect(coreConfig?.content).toContain('"lib": ["ESNext", "WebWorker"]')
		expect(coreConfig?.content).toContain('"types": []')
		expect(browserConfig?.content).toContain('"types": ["vite/client", "vue"]')
		expect(blueprintToDevDependencies(blueprint)['vite-plugin-singlefile']).toBe('^2.3.3')
	})

	it('is an oxfmt fixed point across the emitted content corpus', () => {
		const root = mkdtempSync(join(tmpdir(), 'scaffold-e2-format-'))
		const control = join(root, 'control')
		const corpus = join(root, 'corpus')
		const formatter = resolve('node_modules/oxfmt/bin/oxfmt')
		const config = resolve('.oxfmtrc.json')
		try {
			mkdirSync(control, { recursive: true })
			const controlPath = join(control, 'outside-emitted-population.ts')
			const controlBefore = 'export const projects = [\n\tone,\n]\n'
			writeFileSync(controlPath, controlBefore)
			execFileSync(process.execPath, [formatter, '--config', config, '--write', control], {
				stdio: 'pipe',
			})
			expect(readFileSync(controlPath, 'utf8')).not.toBe(controlBefore)

			const blueprints = [
				createBlueprint('core-only', { src: ['core'] }),
				createBlueprint('published', {
					src: ['core', 'browser', 'server'],
					bin: true,
					services: ['ollama'],
				}),
				createBlueprint('application', {
					app: ['core', 'browser', 'server'],
					integration: true,
					global: true,
					showcase: true,
				}),
				createBlueprint('a'.repeat(MAX_NAME_LENGTH), {
					src: ['core', 'server'],
					app: ['core', 'browser', 'server'],
					bin: true,
					integration: true,
					global: true,
					showcase: true,
					services: ['ollama', 'postgres'],
				}),
			]
			const expected = new Map<string, string>()
			for (const [index, blueprint] of blueprints.entries()) {
				const compiler = createCompiler()
				const plan = compiler.compile(blueprint).plan
				compiler.destroy()
				if (plan === undefined) throw new Error('The format corpus blueprint was blocked')
				for (const artifact of plan.artifacts) {
					if (artifact.origin === 'host') continue
					expect(artifact.content).not.toMatch(/\{\{[^{}]+\}\}/u)
					const path = join(corpus, String(index), artifact.path)
					mkdirSync(dirname(path), { recursive: true })
					writeFileSync(path, artifact.content)
					expected.set(path, artifact.content)
				}
			}
			for (const length of [46, 47]) {
				const blueprint = createBlueprint('a'.repeat(length), { src: ['core'], bin: true })
				for (const artifact of blueprintToTestArtifacts(blueprint)) {
					const path = join(corpus, `bin-boundary-${length}`, artifact.path)
					mkdirSync(dirname(path), { recursive: true })
					writeFileSync(path, artifact.content)
					expected.set(path, artifact.content)
				}
			}
			execFileSync(process.execPath, [formatter, '--config', config, '--write', corpus], {
				stdio: 'pipe',
			})
			for (const [path, content] of expected) {
				expect(readFileSync(path, 'utf8')).toBe(content)
			}
		} finally {
			rmSync(root, { recursive: true, force: true })
		}
	})
})
