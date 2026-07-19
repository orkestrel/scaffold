import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { fileURLToPath, URL } from 'node:url'

export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

const resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce(
		(a, [k, v]) => Object.assign(a, { [k]: resolveWorkspacePath(v[0]) }),
		{},
	),
}

// Base: shared resolve + build defaults + src:core tests.
export const srcCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
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

// Extends srcCore: the guides-parity suite. Node env — it reads the real
// guides/*.md and the documented source modules off disk — but resolves like core tests.
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

// Extends srcCore: server-only library (`src/server`, the node-only materialization
// face over the pure core — the sole impure step, `node:fs` writes behind an
// explicit call). Builds dual ESM+CJS libs for Node and runs its tests in the node
// environment. Externalizes `node:*` (so node:fs is never bundled), `@orkestrel/*`
// (so runtime @orkestrel deps are never bundled), AND `@src/core` → the sibling
// `dist/src/core` build, exactly as core ships dual-format (core and server ship as
// two subpaths of one package). Build-only — the test project resolves `@src/core`
// from source through the shared `resolve` alias.
export const srcServer = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				build: {
					lib: {
						entry: resolveWorkspacePath('src/server/index.ts'),
						formats: ['es', 'cjs'],
						fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
					},
					outDir: 'dist/src/server',
					target: 'node24',
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

// Extends srcCore: the `scaffold` bin — an executable build target, not a barrel
// (no public exports). Builds a single ESM lib file (`dist/bin/scaffold.js`),
// externalizing `node:*`, `@orkestrel/*`, and `@src/*` (the bin links against the
// sibling core/server builds at runtime, never bundling them). Runs its tests in
// the node environment.
export const srcBin = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				build: {
					lib: {
						entry: resolveWorkspacePath('src/bin/scaffold.ts'),
						formats: ['es'],
						fileName: () => 'scaffold.js',
					},
					outDir: 'dist/bin',
					target: 'node24',
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

export default defineConfig({
	resolve,
	test: {
		projects: [srcCore, srcServer, guides, srcBin],
	},
})
