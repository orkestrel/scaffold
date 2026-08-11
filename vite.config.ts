import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { environmentBoundary, outputBoundary } from './configs/helpers.js'
import { fileURLToPath, URL } from 'node:url'

export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

const resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce((a, [k, v]) => {
		const [path] = v
		if (path === undefined) throw new Error(`tsconfig path alias ${k} has no target`)
		return Object.assign(a, { [k]: resolveWorkspacePath(path) })
	}, {}),
}

export const srcCore = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
			},
			test: {
				name: { label: 'src:core', color: 'magenta' },
				include: ['tests/src/core/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)

export const srcServer = (options?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				publicDir: false,
				plugins: [outputBoundary('dist/src/server'), environmentBoundary('src/server')],
				build: {
					lib: {
						entry: resolveWorkspacePath('src/server/index.ts'),
						fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
					},
					outDir: 'dist/src/server',
					target: 'node22',
					rolldownOptions: {
						platform: 'node',
						external: (id: string) =>
							id === '@src/core' || id.startsWith('node:') || id.startsWith('@orkestrel/'),
						output: [
							{
								format: 'es',
								entryFileNames: 'index.js',
								paths: { '@src/core': '../core/index.js' },
							},
							{
								format: 'cjs',
								entryFileNames: 'index.cjs',
								paths: { '@src/core': '../core/index.cjs' },
							},
						],
					},
				},
				test: {
					name: { label: 'src:server', color: 'red' },
					include: ['tests/src/server/**/*.test.ts'],
					exclude: ['tests/src/core/**/*.test.ts'],
					setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				},
			},
			options ?? {},
		),
	)

export const policy = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'policy', color: 'white' },
				include: ['tests/policy.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)

// A workbench, not a proof: agents run throwaway probes here instead of in the
// mirrored suite. `tmp/` is gitignored, so a probe cannot be committed, and the
// project is never in `test` or `prepublishOnly`, so one cannot fail a gate.
export const probe = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'probe', color: 'gray' },
				include: ['tmp/probe/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)

export const config = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'config', color: 'yellow' },
				include: ['tests/config.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)

export const guides = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'guides', color: 'green' },
				include: ['tests/guides.test.ts'],
				exclude: ['tests/src/**/*.test.ts', 'tests/app/**/*.test.ts', 'tests/setup.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)

export const srcBin = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/bin')],
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/bin/scaffold.ts'),
					formats: ['es'],
					fileName: () => 'scaffold.js',
				},
				outDir: 'dist/bin',
				target: 'node22',
				rolldownOptions: { external: [/^node:/, /^@orkestrel\//, /^@src\//] },
			},
			test: {
				name: { label: 'src:bin', color: 'yellow' },
				include: ['tests/src/bin/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)

export const integration = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'integration', color: 'blue' },
				include: ['tests/integration.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				testTimeout: 1_200_000,
				hookTimeout: 1_200_000,
				fileParallelism: false,
			},
		},
		options ?? {},
	)

export default defineConfig({
	resolve,
	test: {
		projects: [srcCore, srcServer, srcBin, policy, config, guides, integration, probe],
	},
})
