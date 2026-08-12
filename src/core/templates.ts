import { BIN_ENTRY_PATH, GUIDES_TEST_PATH, INTEGRATION_TEST_PATH } from './constants.js'

/**
 * Formatter-stable template text for every configuration artifact.
 *
 * @remarks
 * Builders in `compilers.ts` fill these definitions through
 * `@orkestrel/template`. Fixed `lib` and `types` rows stay in the artifact
 * template that owns their scope. Only selection-dependent spans are filled.
 * App configs are check-only, so they include their mirrored tests and exact
 * setup modules. Source configs stay source-only because they emit declarations
 * under `rootDir`; widening them would emit declarations for tests.
 *
 * @example
 * ```ts
 * import { CONFIG_TEMPLATES } from '@orkestrel/scaffold'
 *
 * CONFIG_TEMPLATES.root.tsconfig.startsWith('{') // true
 * ```
 */
export const CONFIG_TEMPLATES = Object.freeze({
	root: Object.freeze({
		tsconfig: `{
	"compilerOptions": {
		"target": "ESNext",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"lib": ["ESNext", "DOM", "DOM.Iterable"],
		"types": ["node", "vite/client", "vitest/globals"],
		"moduleDetection": "force",
		"resolveJsonModule": true,
		"strict": true,
		"verbatimModuleSyntax": true,
		"noUncheckedIndexedAccess": true,
		"noUncheckedSideEffectImports": true,
		"exactOptionalPropertyTypes": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noImplicitOverride": true,
		"noFallthroughCasesInSwitch": true,
		"forceConsistentCasingInFileNames": true,
		"skipLibCheck": true,
		"noEmit": true,
		"paths": {
{{paths}}
		}
	},
	"exclude": ["node_modules", "dist", "tmp"]
}
`,
		vite: `import type { {{viteTypes}} } from 'vite'
{{imports}}import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
{{helpers}}import { lstatSync, readdirSync, realpathSync } from 'node:fs'
import { basename, join, parse, relative, resolve as resolvePath, sep } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

// A generated root config must classify its own fixed proof without importing
// package source, so the exact-case check stays self-contained over Node APIs.
function isExactCaseFile(path: string): boolean {
	const full = resolvePath(path)
	try {
		const status = lstatSync(full)
		if (!status.isFile() || status.isSymbolicLink() || status.nlink !== 1) return false
		const root = parse(full).root
		const segments = relative(root, full).split(sep)
		let parent = root
		for (const segment of segments) {
			try {
				if (!readdirSync(parent).includes(segment)) return false
			} catch {
				if (basename(realpathSync.native(join(parent, segment))) !== segment) return false
			}
			parent = join(parent, segment)
		}
		return true
	} catch {
		return false
	}
}

const resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce((aliases, [key, values]) => {
		const [path] = values
		if (path === undefined) throw new Error('tsconfig path alias ' + key + ' has no target')
		return Object.assign(aliases, { [key]: resolveWorkspacePath(path) })
	}, {}),
}

{{factories}}export default defineConfig({
	resolve,
	test: {
{{projects}}
	},
})
`,
	}),
	factories: Object.freeze({
		src: Object.freeze({
			core: `export const srcCore = (options?: UserConfig): UserConfig =>
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
`,
			browser: `export const srcBrowser = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')],
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/browser/index.ts'),
					formats: ['es'],
					fileName: () => 'index.js',
				},
				outDir: 'dist/src/browser',
				rolldownOptions: {
					{{external}}
{{output}}
				},
			},
			test: {
				name: { label: 'src:browser', color: 'yellow' },
				include: ['tests/src/browser/**/*.test.ts'],
{{exclude}}				setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
				browser: {
					enabled: true,
					provider: playwright(),
					instances: [{ browser: 'chromium', headless: true }],
				},
				fileParallelism: false,
			},
		},
		options ?? {},
	)
`,
			server: `export const srcServer = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/src/server'), environmentBoundary('src/server')],
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/server/index.ts'),
					formats: ['es', 'cjs'],
					fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
				},
				outDir: 'dist/src/server',
				target: 'node22',
				rolldownOptions: {
					platform: 'node',
					{{external}}
{{output}}
				},
			},
			test: {
				name: { label: 'src:server', color: 'red' },
				include: ['tests/src/server/**/*.test.ts'],
{{exclude}}				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)
`,
			bin: `export const srcBin = (options?: UserConfig): UserConfig =>
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
					entry: resolveWorkspacePath('${BIN_ENTRY_PATH}'),
					formats: ['es'],
					fileName: () => 'main.js',
				},
				outDir: 'dist/bin',
				target: 'node22',
				rolldownOptions: { external: [/^node:/, /^@orkestrel\\//, /^@src\\//] },
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
`,
		}),
		app: Object.freeze({
			core: `export const appCore = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [environmentBoundary('app/core')],
			test: {
				name: { label: 'app:core', color: 'cyan' },
				include: ['tests/app/core/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)
`,
			browser: `function applicationBrowser(showcase: boolean): UserConfig {
	const output = showcase ? 'dist/showcase' : 'dist/app/browser'
{{showcasePlugins}}	return {
		resolve,
{{plugins}}		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		build: {
{{showcaseBuild}}			emptyOutDir: true,
			outDir: resolveWorkspacePath(output),
			rolldownOptions: { input: resolveWorkspacePath('app/browser/index.html') },
		},
		test: {
			name: { label: 'app:browser', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
}

export function appBrowser(...options: never[]): UserConfig {
	if (options.length > 0) throw new Error('Browser configuration overrides are not permitted')
	return applicationBrowser(false)
}
{{showcaseFactory}}`,
			server: `export const appServer = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/app/server'), environmentBoundary('app/server')],
			build: {
				emptyOutDir: true,
				lib: {
					entry: resolveWorkspacePath('app/server/main.ts'),
					formats: ['cjs'],
					fileName: () => 'main.cjs',
				},
				outDir: resolveWorkspacePath('dist/app/server'),
				target: 'node22',
				rolldownOptions: { external: (id: string) => id.startsWith('node:') },
			},
			test: {
				name: { label: 'app:server', color: 'green' },
				include: ['tests/app/server/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)
`,
		}),
		policy: `export const policy = (options?: UserConfig): UserConfig =>
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
`,
		config: `export const config = (options?: UserConfig): UserConfig =>
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
`,
		guides: `export const guides = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'guides', color: 'green' },
				include: ['${GUIDES_TEST_PATH}'],
				exclude: ['tests/src/**/*.test.ts', 'tests/app/**/*.test.ts', 'tests/setup.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)
`,
		probe: `// A workbench, not a proof. No gate selects this project.
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
`,
		integration: `export const integration = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'integration', color: 'blue' },
				include: ['${INTEGRATION_TEST_PATH}'],
				setupFiles: ['./tests/setup.ts'],
{{global}}				environment: 'node',
				testTimeout: 120_000,
				hookTimeout: 120_000,
				fileParallelism: false,
			},
		},
		options ?? {},
	)
`,
	}),
	tsconfigs: Object.freeze({
		src: Object.freeze({
			core: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext", "WebWorker"],
		"types": [],
		"noEmit": false,
		"declaration": true,
		"emitDeclarationOnly": true,
		"rootDir": "../../src/core",
		"outDir": "../../dist/src/core"
	},
	"include": [
		"../../src/core/**/*.cts",
		"../../src/core/**/*.mts",
		"../../src/core/**/*.ts",
		"../../src/core/**/*.tsx"
	]
}
`,
			browser: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext", "DOM", "DOM.Iterable"],
		"types": ["vite/client"],
		"noEmit": false,
		"declaration": true,
		"emitDeclarationOnly": true,
		"rootDir": "../../src",
		"outDir": "../../dist/src"
	},
	"include": [
		"../../src/browser/**/*.cts",
		"../../src/browser/**/*.mts",
		"../../src/browser/**/*.ts",
		"../../src/browser/**/*.tsx"
	]
}
`,
			server: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext"],
		"types": ["node"],
		"noEmit": false,
		"declaration": true,
		"emitDeclarationOnly": true,
		"rootDir": "../../src",
		"outDir": "../../dist/src"
	},
	"include": [
		"../../src/server/**/*.cts",
		"../../src/server/**/*.mts",
		"../../src/server/**/*.ts",
		"../../src/server/**/*.tsx"
	]
}
`,
		}),
		app: Object.freeze({
			core: `{
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
`,
			browser: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext", "DOM", "DOM.Iterable"],
		"types": ["vite/client", "vue"]
	},
	"include": [
{{include}}
	]
}
`,
			server: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext"],
		"types": ["node"]
	},
	"include": [
{{include}}
	]
}
`,
		}),
		bin: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext"],
		"types": ["node"],
		"noEmit": false,
		"declaration": true,
		"emitDeclarationOnly": true,
		"rootDir": "../../src",
		"outDir": "../../dist/bin"
	},
	"include": [
		"../../src/bin/**/*.cts",
		"../../src/bin/**/*.mts",
		"../../src/bin/**/*.ts",
		"../../src/bin/**/*.tsx"
	]
}
`,
	}),
	vites: Object.freeze({
		src: Object.freeze({
			core: `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { environmentBoundary, outputBoundary } from '../helpers.js'
import { srcCore, resolveWorkspacePath } from '../../vite.config.ts'

export default defineConfig(
	srcCore({
		publicDir: false,
		plugins: [
			outputBoundary('dist/src/core'),
			environmentBoundary('src/core'),
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
				bundleTypes: {
					extractorConfig: {
						compiler: {
							overrideTsconfig: {
								compilerOptions: { types: ['node'] },
							},
						},
					},
				},
			}),
		],
		build: {
			lib: {
				entry: resolveWorkspacePath('src/core/index.ts'),
				formats: ['es', 'cjs'],
				fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
			},
			outDir: 'dist/src/core',
			rolldownOptions: { external: [/^node:/, /^@orkestrel\\//] },
		},
	}),
)
`,
			browser: `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { srcBrowser, resolveWorkspacePath } from '../../vite.config.ts'

export default defineConfig(
	srcBrowser({
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.browser.json'),
				bundleTypes: true,
			}),
		],
	}),
)
`,
			server: `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { srcServer, resolveWorkspacePath } from '../../vite.config.ts'

// vite-plugin-dts rolls this face into one declaration, and the roll-up reaches
// src/core through a relative source path the tarball does not carry. The rewrite
// below externalizes core through the package's own published root export, on the
// final roll-up only.
export default defineConfig(
	srcServer({
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.server.json'),
				bundleTypes: true,
				beforeWriteFile: (path, content) => ({
					content: /[\\\\/]dist[\\\\/]src[\\\\/]server[\\\\/]index\\.d\\.ts$/.test(path)
{{replacement}}
						: content,
				}),
			}),
		],
	}),
)
`,
		}),
		bin: `import { defineConfig } from 'vite'
import { srcBin } from '../../vite.config.ts'

// The \`scaffold\` executable build — a single ESM lib file, no declarations (an
// executable ships no types), with the \`#!/usr/bin/env node\` shebang re-emitted via
// \`output.banner\` (rolldown strips shebangs from source during bundling), and
// \`output.paths\` rewriting the externalized \`@src/*\` specifiers to the built sibling
// src environments (relative to \`dist/bin/\`), so the emitted bin resolves at runtime.
export default defineConfig(
	srcBin({
		build: {
			rolldownOptions: {
				output: {
					banner: '#!/usr/bin/env node',
{{paths}}
				},
			},
		},
	}),
)
`,
		app: Object.freeze({
			browser: `import { defineConfig } from 'vite'
import { appBrowser } from '../../vite.config.ts'

export default defineConfig(appBrowser())
`,
			server: `import { defineConfig } from 'vite'
import { appServer } from '../../vite.config.ts'

export default defineConfig(appServer())
`,
			showcase: `import { defineConfig } from 'vite'
import { appShowcase } from '../../vite.config.ts'

export default defineConfig(appShowcase())
`,
		}),
	}),
})

/**
 * Formatter-stable template text for source, test, document, guide, and service artifacts.
 *
 * @remarks
 * Builders in `compilers.ts` fill every varying span through
 * `@orkestrel/template`. Empty barrels, entries, and setup modules are
 * intentional: the generated workspace starts with no sample domain API, while
 * each selected Vitest project gets a real test that proves its barrel has no
 * starter exports. An entry starts empty for the same reason its barrel does,
 * and because the vendored lint config refuses an unassigned import outside a
 * stylesheet, so a starter `import './index.js'` would fail the workspace's own
 * `lint:check` on the day it is written.
 *
 * @example
 * ```ts
 * import { ARTIFACT_TEMPLATES } from '@orkestrel/scaffold'
 *
 * ARTIFACT_TEMPLATES.source.empty // ''
 * ```
 */
export const ARTIFACT_TEMPLATES = Object.freeze({
	source: Object.freeze({
		empty: '',
		browser: `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Application</title>
	</head>
	<body>
		<script type="module" src="/main.ts"></script>
	</body>
</html>
`,
	}),
	tests: Object.freeze({
		setup: '',
		global: `export function setup(): void {}
`,
		entry: `import * as entry from {{specifier}}
import { describe, expect, it } from 'vitest'

describe({{label}}, () => {
	it('has no starter exports', () => {
		expect(Object.keys(entry)).toStrictEqual([])
	})
})
`,
		bin: `import { describe, expect, it } from 'vitest'

describe('bin entry', () => {
	it('has no starter exports', async () => {
{{import}}
		expect(Object.keys(entry)).toStrictEqual([])
	})
})
`,
		integration: `import { spawnSync } from 'node:child_process'
import { globSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const registry =
	spawnSync(npm, ['ping', '--fetch-retries=0', '--fetch-timeout=1000', '--loglevel=silent'], {
		cwd: root,
		stdio: 'ignore',
		timeout: 5_000,
		windowsHide: true,
	}).status === 0

describe('installed package consumer', () => {
	it('loads the built package from a process outside the workspace', () => {
		const workspace = mkdtempSync(join(tmpdir(), 'orkestrel-integration-driver-'))
		try {
			const manifest: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
			if (typeof manifest !== 'object' || manifest === null) {
				throw new Error('The package manifest is not a record')
			}
			const module: unknown = Object.getOwnPropertyDescriptor(manifest, 'module')?.value
			if (typeof module !== 'string')
				throw new Error('The package manifest carries no module entry')
			const entry = pathToFileURL(resolve(root, module)).href
			const missing = pathToFileURL(resolve(root, 'dist/outside-integration-control.js')).href
			const control = spawnSync(
				process.execPath,
				['--input-type=module', '--eval', 'await import(' + JSON.stringify(missing) + ')'],
				{ cwd: workspace, encoding: 'utf8', windowsHide: true },
			)
			expect(control.status).not.toBe(0)
			const driven = spawnSync(
				process.execPath,
				['--input-type=module', '--eval', 'await import(' + JSON.stringify(entry) + ')'],
				{ cwd: workspace, encoding: 'utf8', windowsHide: true },
			)
			expect(driven.status).toBe(0)
			expect(driven.stderr).toBe('')
		} finally {
			rmSync(workspace, { recursive: true, force: true })
		}
	})

	it.skipIf(!registry)(
		'installs the packed package into an outside consumer [requires a reachable npm registry]',
		() => {
			const workspace = mkdtempSync(join(tmpdir(), 'orkestrel-integration-install-'))
			const packed = join(workspace, 'packed')
			const consumer = join(workspace, 'consumer')
			try {
				mkdirSync(packed, { recursive: true })
				mkdirSync(consumer, { recursive: true })
				const pack = spawnSync(
					npm,
					['pack', '--json', '--ignore-scripts', '--pack-destination', packed],
					{ cwd: root, encoding: 'utf8', windowsHide: true },
				)
				expect(pack.status).toBe(0)
				const archives = globSync('*.tgz', { cwd: packed })
				expect(archives).toHaveLength(1)
				const archive = archives[0]
				if (archive === undefined) throw new Error('The package archive was not written')
				writeFileSync(
					join(consumer, 'package.json'),
					'{"name":"outside-consumer","private":true,"type":"module"}\\n',
				)
				const install = spawnSync(
					npm,
					['install', '--ignore-scripts', '--no-audit', '--no-fund', join(packed, archive)],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(install.status).toBe(0)
				const manifest: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
				if (typeof manifest !== 'object' || manifest === null) {
					throw new Error('The package manifest is not a record')
				}
				const name: unknown = Object.getOwnPropertyDescriptor(manifest, 'name')?.value
				if (typeof name !== 'string') throw new Error('The package manifest carries no name')
				const control = spawnSync(
					process.execPath,
					[
						'--input-type=module',
						'--eval',
						'await import(' + JSON.stringify(name + '/outside-integration-control') + ')',
					],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(control.status).not.toBe(0)
				const driven = spawnSync(
					process.execPath,
					['--input-type=module', '--eval', 'await import(' + JSON.stringify(name) + ')'],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(driven.status).toBe(0)
				expect(driven.stderr).toBe('')
			} finally {
				rmSync(workspace, { recursive: true, force: true })
			}
		},
		300_000,
	)
})
`,
	}),
	docs: Object.freeze({
		readme: `# {{package}}

{{description}}

## Development

\`\`\`sh
npm install
npm test
\`\`\`
`,
	}),
	guides: Object.freeze({
		readme: `# Guides

## By concept

- Package
  - Spec: Not created. Create this file when the workspace has a public surface:
    \`guides/{{guide}}.md\`
  - Source:
{{source}}
  - Tests:
{{tests}}

## By directory

{{directories}}
`,
	}),
	orchestration: Object.freeze({
		service: `#!/usr/bin/env sh
set -eu

printf '%s\\n' \\
{{services}}
`,
	}),
})
