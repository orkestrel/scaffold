import type { Plugin, UserConfig } from 'vite'
import { existsSync, lstatSync, realpathSync } from 'node:fs'
import { isAbsolute, relative, resolve as resolvePath, sep } from 'node:path'
import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { fileURLToPath, URL } from 'node:url'

export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

/** The physical repository root that owns every build output. */
export const WORKSPACE_ROOT = realpathSync.native(resolveWorkspacePath('.'))

/** Reject a configured output whose path or existing ancestry can escape the repository. */
export function enforceOutputPath(configured: string, expected: string): void {
	if (relative(expected, configured) !== '') {
		throw new Error(
			'[orkestrel-output-boundary] Build output must use its exact configured workspace directory',
		)
	}
	const workspaceRelative = relative(WORKSPACE_ROOT, expected)
	if (
		workspaceRelative === '..' ||
		workspaceRelative.startsWith(`..${sep}`) ||
		isAbsolute(workspaceRelative)
	) {
		throw new Error('[orkestrel-output-boundary] Build output must remain inside the workspace')
	}
	let current = WORKSPACE_ROOT
	for (const segment of workspaceRelative.split(sep)) {
		if (segment.length === 0) continue
		current = resolvePath(current, segment)
		if (!existsSync(current)) continue
		const status = lstatSync(current)
		if (status.isSymbolicLink() || !status.isDirectory()) {
			throw new Error(
				'[orkestrel-output-boundary] Build output and its existing parents must be real directories',
			)
		}
		const physical = realpathSync.native(current)
		const physicalRelative = relative(WORKSPACE_ROOT, physical)
		if (
			physicalRelative === '..' ||
			physicalRelative.startsWith(`..${sep}`) ||
			isAbsolute(physicalRelative)
		) {
			throw new Error('[orkestrel-output-boundary] Build output must remain inside the workspace')
		}
	}
}

/** Create a Vite pre-build guard for one exact repository-owned output. */
export function outputBoundary(output: string): Plugin {
	const expected = resolvePath(WORKSPACE_ROOT, output)
	let configured = expected
	let build = false
	return {
		name: 'orkestrel-output-boundary',
		enforce: 'pre',
		configResolved(config) {
			build = config.command === 'build'
			configured = resolvePath(config.root, config.build.outDir)
		},
		buildStart() {
			if (build) enforceOutputPath(configured, expected)
		},
	}
}

/** TypeScript-owned aliases translated to Vite resolution entries. */
export const RESOLVE = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce((a, [k, v]) => {
		const [path] = v
		if (path === undefined) throw new Error(`tsconfig path alias ${k} has no target`)
		return Object.assign(a, { [k]: resolveWorkspacePath(path) })
	}, {}),
}

export const srcCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve: RESOLVE,
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
		config ?? {},
	)

export const guides = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				test: {
					name: { label: 'guides', color: 'green' },
					include: ['tests/guides/**/*.test.ts'],
					exclude: ['tests/src/**/*.test.ts', 'tests/setup.test.ts'],
				},
			},
			config ?? {},
		),
	)

export const srcServer = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				plugins: [outputBoundary('dist/src/server')],
				build: {
					lib: {
						entry: resolveWorkspacePath('src/server/index.ts'),
						fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
					},
					outDir: 'dist/src/server',
					target: 'node22',
					rolldownOptions: {
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
			config ?? {},
		),
	)

export const srcBin = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				plugins: [outputBoundary('dist/bin')],
				build: {
					lib: {
						entry: resolveWorkspacePath('src/bin/scaffold.ts'),
						formats: ['es'],
						fileName: () => 'scaffold.js',
					},
					outDir: 'dist/bin',
					target: 'node22',
					rolldownOptions: {
						external: [/^node:/, /^@orkestrel\//, /^@src\//],
					},
				},
				test: {
					name: { label: 'src:bin', color: 'yellow' },
					include: ['tests/src/bin/**/*.test.ts'],
					exclude: ['tests/src/core/**/*.test.ts', 'tests/src/server/**/*.test.ts'],
					setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				},
			},
			config ?? {},
		),
	)

/** External-install consumer proof, intentionally excluded from default source tests. */
export const integration = (config?: UserConfig): UserConfig =>
	srcBin(
		mergeConfig(
			{
				test: {
					name: { label: 'integration', color: 'blue' },
					include: ['tests/integration/**/*.test.ts'],
					exclude: ['tests/src/**/*.test.ts', 'tests/guides/**/*.test.ts'],
				},
			},
			config ?? {},
		),
	)

export default defineConfig({
	resolve: RESOLVE,
	test: {
		projects: [srcCore, srcServer, guides, srcBin, integration],
	},
})
