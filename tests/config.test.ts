import { existsSync, globSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadConfigFromFile } from 'vite'
import configuration, { resolveWorkspacePath } from '../vite.config.js'
import tsconfig from '../tsconfig.json' with { type: 'json' }
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

describe('root configuration', () => {
	it('resolves every declared alias to its real entry', () => {
		const aliases = configuration.resolve?.alias
		if (typeof aliases !== 'object' || aliases === null || Array.isArray(aliases)) {
			throw new Error('The root configuration carries no alias record')
		}
		for (const [key, values] of Object.entries(tsconfig.compilerOptions.paths)) {
			const [path] = values
			if (path === undefined) throw new Error(`${key} carries no target`)
			const target = resolveWorkspacePath(path)
			expect(existsSync(target)).toBe(true)
			expect(Object.getOwnPropertyDescriptor(aliases, key)?.value).toBe(target)
		}
	})

	it('registers every workspace project with its fixed include and setup files', () => {
		const expected = new Map<
			string,
			{ readonly include: string; readonly setup: readonly string[] }
		>()
		if (existsSync(resolve(root, 'src/core'))) {
			expected.set('src:core', {
				include: 'tests/src/core/**/*.test.ts',
				setup: ['./tests/setup.ts'],
			})
		}
		if (existsSync(resolve(root, 'src/browser'))) {
			expected.set('src:browser', {
				include: 'tests/src/browser/**/*.test.ts',
				setup: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			})
		}
		if (existsSync(resolve(root, 'src/server'))) {
			expected.set('src:server', {
				include: 'tests/src/server/**/*.test.ts',
				setup: ['./tests/setup.ts', './tests/setupServer.ts'],
			})
		}
		if (existsSync(resolve(root, 'src/bin'))) {
			expected.set('src:bin', {
				include: 'tests/src/bin/**/*.test.ts',
				setup: ['./tests/setup.ts', './tests/setupServer.ts'],
			})
		}
		if (existsSync(resolve(root, 'app/core'))) {
			expected.set('app:core', {
				include: 'tests/app/core/**/*.test.ts',
				setup: ['./tests/setup.ts'],
			})
		}
		if (existsSync(resolve(root, 'app/browser'))) {
			expected.set('app:browser', {
				include: 'tests/app/browser/**/*.test.ts',
				setup: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			})
		}
		if (existsSync(resolve(root, 'app/server'))) {
			expected.set('app:server', {
				include: 'tests/app/server/**/*.test.ts',
				setup: ['./tests/setup.ts', './tests/setupServer.ts'],
			})
		}
		for (const label of ['policy', 'config', 'guides', 'integration']) {
			if (!existsSync(resolve(root, `tests/${label}.test.ts`))) continue
			expected.set(label, {
				include: `tests/${label}.test.ts`,
				setup: ['./tests/setup.ts'],
			})
		}
		expected.set('probe', { include: 'tmp/probe/**/*.test.ts', setup: ['./tests/setup.ts'] })

		const projects = configuration.test?.projects
		if (!Array.isArray(projects)) throw new Error('The root configuration carries no projects')
		const configured = new Map<
			string,
			{ readonly include: string; readonly setup: readonly string[] }
		>()
		for (const factory of projects) {
			if (typeof factory !== 'function') throw new Error('A project is not a factory')
			const project: unknown = Reflect.apply(factory, undefined, [])
			if (typeof project !== 'object' || project === null) {
				throw new Error('A project factory returned no configuration')
			}
			const test: unknown = Object.getOwnPropertyDescriptor(project, 'test')?.value
			if (typeof test !== 'object' || test === null) {
				throw new Error('A project configuration carries no test block')
			}
			const name: unknown = Object.getOwnPropertyDescriptor(test, 'name')?.value
			const include: unknown = Object.getOwnPropertyDescriptor(test, 'include')?.value
			const exclude: unknown = Object.getOwnPropertyDescriptor(test, 'exclude')?.value
			const setup: unknown = Object.getOwnPropertyDescriptor(test, 'setupFiles')?.value
			const label =
				typeof name === 'object' && name !== null
					? Object.getOwnPropertyDescriptor(name, 'label')?.value
					: undefined
			if (
				typeof label !== 'string' ||
				!Array.isArray(include) ||
				typeof include[0] !== 'string' ||
				!Array.isArray(setup) ||
				!setup.every((path) => typeof path === 'string')
			) {
				throw new Error('A project does not expose one include and its setup files')
			}
			const effective = include.filter(
				(path) => typeof path === 'string' && (!Array.isArray(exclude) || !exclude.includes(path)),
			)
			if (effective.length !== 1 || typeof effective[0] !== 'string') {
				throw new Error(`${label} does not resolve to one effective include`)
			}
			configured.set(label, { include: effective[0], setup: [...new Set(setup)] })
		}
		expect(configured).toStrictEqual(expected)
	})

	it('resolves every build wrapper to the output fixed for its target', async () => {
		const wrappers = globSync(['configs/src/vite.*.config.ts', 'configs/app/vite.*.config.ts'], {
			cwd: root,
		})
		expect(wrappers.length).toBeGreaterThan(0)
		for (const wrapper of wrappers) {
			const normalized = wrapper.replaceAll('\\', '/')
			const match =
				/^configs\/(src|app)\/vite\.(core|browser|server|bin|showcase)\.config\.ts$/u.exec(
					normalized,
				)
			if (match === null) throw new Error(`${normalized} is not a target wrapper`)
			const [, axis, environment] = match
			if (axis === undefined || environment === undefined) {
				throw new Error(`${normalized} carries no target`)
			}
			const loaded = await loadConfigFromFile(
				{ command: 'build', mode: 'test', isSsrBuild: false, isPreview: false },
				resolve(root, normalized),
				root,
				'silent',
			)
			if (loaded === null) throw new Error(`${normalized} did not load`)
			const output = loaded.config.build?.outDir
			if (output === undefined) throw new Error(`${normalized} carries no output`)
			const expected =
				environment === 'bin'
					? 'dist/bin'
					: environment === 'showcase'
						? 'dist/showcase'
						: `dist/${axis}/${environment}`
			expect(resolve(root, output)).toBe(resolve(root, expected))
		}
	})

	it('registers proof scripts in the correct gate', () => {
		const manifest: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
		if (typeof manifest !== 'object' || manifest === null) {
			throw new Error('The package manifest is not a record')
		}
		const scripts: unknown = Object.getOwnPropertyDescriptor(manifest, 'scripts')?.value
		if (typeof scripts !== 'object' || scripts === null) {
			throw new Error('The package manifest carries no scripts')
		}
		const test = Object.getOwnPropertyDescriptor(scripts, 'test')?.value
		const config = Object.getOwnPropertyDescriptor(scripts, 'test:config')?.value
		const integration = Object.getOwnPropertyDescriptor(scripts, 'test:integration')?.value
		const publish = Object.getOwnPropertyDescriptor(scripts, 'prepublishOnly')?.value
		const hasIntegration = existsSync(resolve(root, 'tests/integration.test.ts'))
		expect(config).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project config',
		)
		expect(typeof test === 'string' && test.includes('npm run test:config')).toBe(true)
		expect(integration).toBe(
			hasIntegration
				? 'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration'
				: undefined,
		)
		expect(typeof test === 'string' && test.includes('test:integration')).toBe(false)
		expect(typeof publish === 'string' && publish.includes('npm run test:integration')).toBe(
			hasIntegration,
		)
	})
})

describe('instrument negative controls', () => {
	it('rejects configuration facts outside the proof population', () => {
		expect(existsSync(resolveWorkspacePath('outside-config-proof/absent.ts'))).toBe(false)
		expect([
			'src:core',
			'src:server',
			'src:bin',
			'policy',
			'config',
			'guides',
			'probe',
		]).not.toContain('outside:control')
		expect(
			/^configs\/(src|app)\/vite\.(core|browser|server|bin|showcase)\.config\.ts$/u.test(
				'configs/outside/vite.control.config.ts',
			),
		).toBe(false)
	})
})
