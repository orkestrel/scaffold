import {
	BIN_ENTRY_PATH,
	CONFORMANCE_TEST_PATH,
	DISTRIBUTION_TEST_PATH,
	GUIDES_TEST_PATH,
	INTEGRATION_TEST_PATH,
	SERVICE_TEST_INCLUDE,
} from './constants.js'

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
		// The manifest import and the `peers` derivation this template emits are
		// fixed, where `{{imports}}`, `{{helpers}}`, and `{{browsers}}` are selected.
		// One fixed block costs less than a fifth conditional span, and a workspace
		// that builds nothing carries one export nothing reads.
		vite: `import type { {{viteTypes}} } from 'vite'
{{imports}}import { defineConfig, mergeConfig } from 'vitest/config'
import manifest from './package.json' with { type: 'json' }
import tsconfig from './tsconfig.json' with { type: 'json' }
{{helpers}}{{browsers}}import { fileURLToPath, URL } from 'node:url'

{{options}}export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

const peerDependencies = 'peerDependencies' in manifest ? manifest.peerDependencies : undefined
if (
	peerDependencies !== undefined &&
	(typeof peerDependencies !== 'object' ||
		peerDependencies === null ||
		Array.isArray(peerDependencies))
) {
	throw new Error('package peerDependencies must be an object')
}
export const peers: readonly string[] =
	peerDependencies === undefined ? [] : Object.keys(peerDependencies)

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
				rolldownOptions: { onLog: enforceBuildLog },
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
					onLog: enforceBuildLog,
					{{external}}
{{output}}
				},
			},
			test: {
				name: { label: 'src:browser', color: 'yellow' },
				include: ['tests/src/browser/**/*.test.ts'],
{{exclude}}				setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
{{global}}
				browser: {
					enabled: true,
					provider: playwright(browserOptions),
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
					onLog: enforceBuildLog,
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
				rolldownOptions: {
					onLog: enforceBuildLog,
					external: (id: string) =>
						id.startsWith('node:') ||
						id.startsWith('@orkestrel/') ||
						id.startsWith('@src/') ||
						peers.some((peer) => id === peer || id.startsWith(peer + '/')),
				},
			},
			test: {
				name: { label: 'src:bin', color: 'yellow' },
				include: ['tests/src/bin/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
				// A bin test drives the real executable over a real temporary repository, so it
				// spends seconds in process startup and filesystem work rather than milliseconds.
				// Vitest's five-second default clears one alone and times out under a full suite.
				testTimeout: 15_000,
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
			rolldownOptions: {
				onLog: enforceBuildLog,
				input: resolveWorkspacePath('app/browser/index.html'),
			},
		},
		test: {
			name: { label: 'app:browser', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
}

export function appBrowser(): UserConfig {
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
				rolldownOptions: {
					onLog: enforceBuildLog,
					external: (id: string) => id.startsWith('node:'),
				},
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
				// A config test validates every target wrapper and runs the real linter twice with
				// 15-second child caps, so this budget clears both caps and reports their diagnostics.
				testTimeout: 45_000,
			},
		},
		options ?? {},
	)
`,
		setup: `export const setup = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'setup', color: 'white' },
				include: ['tests/setup*.test.ts'],
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
		conformance: `// Where this package drifts from the official tooling it stays compatible with.
// The subject is this package, so the proof is hermetic and stays in \`npm test\`.
export const conformance = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'conformance', color: 'magenta' },
				include: ['${CONFORMANCE_TEST_PATH}'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		options ?? {},
	)
`,
		service: `// The live external services this package drives. It starts nothing itself:
// \`scripts/service.sh\` provisions, \`tests/setupService.ts\` proves readiness, and
// the project stays out of \`npm test\` because a real service answers it.
export const service = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'service', color: 'red' },
				include: ['${SERVICE_TEST_INCLUDE}'],
				setupFiles: ['./tests/setup.ts', './tests/setupService.ts'],
				environment: 'node',
				browser: { enabled: false },
				testTimeout: 120_000,
				hookTimeout: 120_000,
				fileParallelism: false,
			},
		},
		options ?? {},
	)
`,
		distribution: `export const distribution = (options?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'distribution', color: 'cyan' },
				include: ['${DISTRIBUTION_TEST_PATH}'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				testTimeout: 120_000,
				hookTimeout: 120_000,
				fileParallelism: false,
			},
		},
		options ?? {},
	)
`,
		probe: `// A workbench, not a proof. No gate selects this project. Run in test mode by the
// \`test:probe\` script, it collects \`tmp/probe/**/*.test.ts\`. Run in benchmark mode by the
// \`test:bench\` script, the same workbench also collects \`tests/**/*.test.ts\` for a \`bench\` block,
// so a suite may carry a bench beside its ordinary tests without a second project. The mode
// guard around each \`bench\` call keeps it out of test mode, so it never executes there.
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
				fileParallelism: false,
				pool: 'threads',
				benchmark: { include: ['tmp/probe/**/*.test.ts', 'tests/**/*.test.ts'] },
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
import { peers, srcCore, resolveWorkspacePath } from '../../vite.config.ts'

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
			rolldownOptions: {
				external: (id: string) =>
					id.startsWith('node:') ||
					id.startsWith('@orkestrel/') ||
					peers.some((peer) => id === peer || id.startsWith(peer + '/')),
			},
		},
	}),
)
`,
			browser: `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { srcBrowser, resolveWorkspacePath } from '../../vite.config.ts'

// vite-plugin-dts rolls this face into one declaration, and the roll-up reaches
// src/core through a relative source path the tarball does not carry. The path
// keeps each source module's own depth, so a module in a browser subfolder emits
// one that leaves dist/src entirely. The rewrite below externalizes core through
// the package's own published root export, on the final roll-up only.
export default defineConfig(
	srcBrowser({
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.browser.json'),
				bundleTypes: true,
				beforeWriteFile: (path, content) => ({
					content: /[\\\\/]dist[\\\\/]src[\\\\/]browser[\\\\/]index\\.d\\.ts$/.test(path)
{{replacement}}
						: content,
				}),
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
// executable ships no types), with the \`#!/usr/bin/env node\` shebang re-emitted through
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
	browsers: `// A generated browser workspace resolves its own Chromium here rather than in
// \`configs/helpers.ts\`, because that leaf is vendored byte-identical to every
// workspace and most of them declare no \`playwright\` to import.

import type { PlaywrightProviderOptions } from '@vitest/browser-playwright'
import { chromium } from 'playwright'
import { accessSync, constants as FS_CONSTANTS, globSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, join, resolve as resolvePath } from 'node:path'

/**
 * Chromium executable layouts inside a \`chromium-<revision>\` browsers-directory entry, per
 * platform.
 *
 * @remarks
 * The current Playwright build ships Chrome for Testing on macOS. The trailing \`Chromium.app\`
 * layouts are what earlier builds shipped, so the list spans Playwright versions instead of
 * pinning to the installed one.
 */
export const CHROMIUM_LAYOUTS = Object.freeze([
	'chrome-linux/chrome',
	'chrome-linux64/chrome',
	'chrome-win/chrome.exe',
	'chrome-win64/chrome.exe',
	'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
	'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
	'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
	'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium',
])

/** The \`chromium-<revision>\` entry name Playwright installs one managed build into. */
export const CHROMIUM_ENTRY_PATTERN = /^chromium-\\d+$/

/** The revision number carried by any path containing a \`chromium-<revision>\` segment. */
export const CHROMIUM_REVISION_PATTERN = /chromium-(\\d+)/

/** The directory a managed Linux container installs its bundled Playwright browsers into. */
export const BUNDLED_BROWSERS_ROOT = '/opt/pw-browsers'

/**
 * Bundled Chromium layouts under the managed-container browsers root, as glob patterns.
 *
 * @remarks
 * The revision directory and its inner layout both drift across Playwright builds, and the
 * container also carries a top-level \`chromium\` alias, so every known shape is globbed.
 */
export const BUNDLED_CHROMIUM_LAYOUTS = Object.freeze([
	'chromium',
	'chromium-*/chrome-linux64/chrome',
	'chromium-*/chrome-linux/chrome',
])

/** Stable Playwright Chromium channels and their standard executable layouts. */
export const SYSTEM_BROWSER_CHANNELS = Object.freeze([
	Object.freeze({
		channel: 'chrome',
		layouts: Object.freeze({
			linux: '/opt/google/chrome/chrome',
			darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			win32: Object.freeze(['Google', 'Chrome', 'Application', 'chrome.exe']),
		}),
	}),
	Object.freeze({
		channel: 'msedge',
		layouts: Object.freeze({
			linux: '/opt/microsoft/msedge/msedge',
			darwin: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
			win32: Object.freeze(['Microsoft', 'Edge', 'Application', 'msedge.exe']),
		}),
	}),
])

/**
 * Determine whether a path identifies an executable regular file.
 *
 * @param path - The filesystem path to inspect.
 * @returns Whether the path is a regular file with execute access.
 *
 * @example
 * \`\`\`ts
 * isBrowserExecutable('/opt/google/chrome/chrome')
 * \`\`\`
 */
export function isBrowserExecutable(path: string): boolean {
	try {
		if (!statSync(path).isFile()) return false
		accessSync(path, FS_CONSTANTS.X_OK)
		return true
	} catch {
		return false
	}
}

/**
 * Order two Chromium paths so the highest revision sorts first.
 *
 * @param left - The first path or directory entry to compare.
 * @param right - The second path or directory entry to compare.
 * @returns A negative number when \`left\` sorts first, positive when \`right\` does.
 *
 * @remarks
 * Revisions are numbers, so \`chromium-1200\` outranks \`chromium-999\` despite sorting below it
 * lexically. A path carrying no revision falls back to descending name order.
 *
 * @example
 * \`\`\`ts
 * ['chromium-999', 'chromium-1200'].sort(compareRevisions)
 * \`\`\`
 */
export function compareRevisions(left: string, right: string): number {
	const leftRevision = CHROMIUM_REVISION_PATTERN.exec(left)?.[1]
	const rightRevision = CHROMIUM_REVISION_PATTERN.exec(right)?.[1]
	if (leftRevision === undefined || rightRevision === undefined) return right.localeCompare(left)
	return Number(rightRevision) - Number(leftRevision)
}

/**
 * Read the executable path of Playwright's pinned Chromium revision.
 *
 * @returns The pinned executable path, or \`undefined\` when this platform has none.
 *
 * @remarks
 * Playwright throws rather than returning a path when the current platform carries no initialized
 * executable, and an unguarded call would fail configuration evaluation for every project.
 *
 * @example
 * \`\`\`ts
 * resolvePinnedBrowser()
 * \`\`\`
 */
export function resolvePinnedBrowser(): string | undefined {
	try {
		const pinned = chromium.executablePath()
		return pinned.length === 0 ? undefined : pinned
	} catch {
		return undefined
	}
}

/**
 * Resolve a launchable Playwright-managed Chromium executable: the pinned revision when installed,
 * otherwise a \`chromium\` / \`chromium.exe\` alias or any other \`chromium-*\` revision under the same
 * Playwright browsers directory. A pinned-revision miss is not Chromium absence — managed
 * containers ship one usable build, often behind a revision-agnostic alias, for many Playwright
 * versions.
 *
 * @param pinned - The executable path for Playwright's pinned Chromium revision.
 * @returns The managed executable path, or \`undefined\` when none is executable.
 *
 * @example
 * \`\`\`ts
 * resolveManagedBrowser('/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome')
 * \`\`\`
 */
export function resolveManagedBrowser(pinned: string): string | undefined {
	if (isBrowserExecutable(pinned)) return pinned
	let revisionRoot = dirname(pinned)
	for (;;) {
		if (CHROMIUM_ENTRY_PATTERN.test(basename(revisionRoot))) break
		const parent = dirname(revisionRoot)
		if (parent === revisionRoot) return undefined
		revisionRoot = parent
	}
	const browsersRoot = dirname(revisionRoot)
	for (const alias of ['chromium', 'chromium.exe']) {
		const candidate = resolvePath(browsersRoot, alias)
		if (isBrowserExecutable(candidate)) return candidate
	}
	let entries: readonly string[]
	try {
		entries = readdirSync(browsersRoot)
	} catch {
		return undefined
	}
	const revisions = entries
		.filter((entry) => CHROMIUM_ENTRY_PATTERN.test(entry))
		.sort(compareRevisions)
	for (const revision of revisions) {
		for (const layout of CHROMIUM_LAYOUTS) {
			const candidate = resolvePath(browsersRoot, revision, layout)
			if (isBrowserExecutable(candidate)) return candidate
		}
	}
	return undefined
}

/**
 * Resolve the Chromium a managed Linux container bundles outside the Playwright cache.
 *
 * @param platform - The Node platform the container runs on.
 * @param root - The bundled browsers directory to search.
 * @returns The highest matching executable path, or \`undefined\` when none is executable.
 *
 * @example
 * \`\`\`ts
 * resolveBundledBrowser('linux', BUNDLED_BROWSERS_ROOT)
 * \`\`\`
 */
export function resolveBundledBrowser(platform: NodeJS.Platform, root: string): string | undefined {
	if (platform !== 'linux') return undefined
	for (const layout of BUNDLED_CHROMIUM_LAYOUTS) {
		let matches: readonly string[]
		try {
			matches = globSync(layout, { cwd: root })
		} catch {
			return undefined
		}
		for (const match of [...matches].sort(compareRevisions)) {
			const candidate = resolvePath(root, match)
			if (isBrowserExecutable(candidate)) return candidate
		}
	}
	return undefined
}

/**
 * Resolve the first installed stable system Chromium channel.
 *
 * @param platform - The Node platform whose standard layouts this call probes.
 * @param environment - The process environment supplying Windows installation roots.
 * @returns \`chrome\`, then \`msedge\`, or \`undefined\` when neither is executable.
 *
 * @example
 * \`\`\`ts
 * resolveSystemBrowser(process.platform, process.env)
 * \`\`\`
 */
export function resolveSystemBrowser(
	platform: NodeJS.Platform,
	environment: NodeJS.ProcessEnv,
): string | undefined {
	if (platform !== 'linux' && platform !== 'darwin' && platform !== 'win32') return undefined
	const roots = new Set<string>()
	if (platform === 'win32') {
		for (const root of [
			environment.LOCALAPPDATA,
			environment.PROGRAMFILES,
			environment['PROGRAMFILES(X86)'],
		]) {
			if (root !== undefined && root.length > 0) roots.add(root)
		}
		const homeDrive = environment.HOMEDRIVE
		if (homeDrive !== undefined && homeDrive.length > 0) {
			roots.add(join(homeDrive, 'Program Files'))
			roots.add(join(homeDrive, 'Program Files (x86)'))
		}
	}
	for (const browser of SYSTEM_BROWSER_CHANNELS) {
		if (platform === 'win32') {
			for (const root of roots) {
				if (isBrowserExecutable(join(root, ...browser.layouts.win32))) return browser.channel
			}
			continue
		}
		if (isBrowserExecutable(browser.layouts[platform])) return browser.channel
	}
	return undefined
}

/**
 * Resolve Playwright provider options for whatever browser this host can actually launch.
 *
 * @param pinned - The executable path for Playwright's pinned Chromium revision, when it has one.
 * @param platform - The Node platform whose standard layouts this call probes.
 * @param environment - The process environment supplying operator overrides and Windows roots.
 * @param root - The managed-container bundled browsers directory to search.
 * @returns Provider options naming an executable, a WebSocket endpoint, or a channel.
 *
 * @remarks
 * Precedence, most important first: \`PLAYWRIGHT_EXECUTABLE_PATH\`, \`PLAYWRIGHT_WS_ENDPOINT\`,
 * \`PLAYWRIGHT_CHANNEL\`, the managed Playwright Chromium, the container's bundled Chromium, a
 * verified system channel, then the platform default channel. An operator override outranks
 * discovery and is returned exactly as given: none of those environment values is checked
 * against the filesystem, because verifying an override would defeat the override. The pinned
 * managed revision outranks anything found on the host because it is deterministic. The installed
 * pinned revision returns empty options so Playwright keeps its own default launch semantics. Only
 * a discovered system channel is verified before it is named. The platform default is unverified
 * as well and exists only as a last resort: Windows takes \`msedge\`, which ships with the OS and
 * never collides with a foreground Chrome.
 *
 * @example
 * \`\`\`ts
 * resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)
 * \`\`\`
 */
export function resolveBrowser(
	pinned: string | undefined,
	platform: NodeJS.Platform,
	environment: NodeJS.ProcessEnv,
	root: string = BUNDLED_BROWSERS_ROOT,
): PlaywrightProviderOptions {
	const executable = environment.PLAYWRIGHT_EXECUTABLE_PATH
	if (executable !== undefined && executable.length > 0) {
		return { launchOptions: { executablePath: executable } }
	}
	const endpoint = environment.PLAYWRIGHT_WS_ENDPOINT
	if (endpoint !== undefined && endpoint.length > 0) {
		return { connectOptions: { wsEndpoint: endpoint } }
	}
	const requested = environment.PLAYWRIGHT_CHANNEL
	if (requested !== undefined && requested.length > 0) {
		return { launchOptions: { channel: requested } }
	}
	const managed = pinned === undefined ? undefined : resolveManagedBrowser(pinned)
	if (managed !== undefined) {
		return managed === pinned ? {} : { launchOptions: { executablePath: managed } }
	}
	const bundled = resolveBundledBrowser(platform, root)
	if (bundled !== undefined) return { launchOptions: { executablePath: bundled } }
	const fallback = platform === 'win32' ? 'msedge' : 'chrome'
	return { launchOptions: { channel: resolveSystemBrowser(platform, environment) ?? fallback } }
}
`,
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
		distribution: Object.freeze({
			proof: `// The artifact a consumer installs, measured rather than described. This workspace
// is packed and installed into a throwaway consumer, and every claim below is read
// off that installed tree: the exports map it publishes, the declarations it ships,
// and the module objects a real runtime hands a consumer. Nothing here names this
// package, one of its exports, or how many there are, so the proof stays true as
// the published surface moves.
{{types}}import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
{{transport}}import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
{{launcher}}import ts from 'typescript'
import { afterAll, describe, expect, it } from 'vitest'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm'
// Windows needs a shell to launch a \`.cmd\`: Node refuses one directly since the
// batch-argument hardening, and \`spawnSync\` returns \`EINVAL\` with a null status
// rather than an exit code a caller can read. Every argument below is a literal or
// a path this file built, so the shell has nothing to escape.
const SHELL = process.platform === 'win32'
// \`prepublishOnly\` runs this proof as \`npm run test:distribution -- --mode release\`.
// Release is the publish gate, so evidence it cannot obtain fails there and skips
// everywhere else: a gate that passes on missing evidence proves nothing.
const RELEASE = import.meta.env.MODE === 'release'
// The built output directory a browser face is published from. Every selection here
// reads this prefix off the export TARGET and never off the subpath name. A
// workspace whose only published face is the browser one publishes that face at the
// root subpath, so a rule keyed on the subpath name drives a browser bundle through
// Node and the miss is silent.
const BROWSER_OUTPUT = './dist/src/browser/'
const ABSENT_SUBPATH = '/no-subpath-is-published-under-this-name'
const PING = ['ping', '--fetch-retries=0', '--fetch-timeout=5000', '--loglevel=silent']
const ESM_DRIVER = 'drive.mjs'
const CJS_DRIVER = 'drive.cjs'
const CONSUMER_MANIFEST = \`{ "name": "distribution-consumer", "private": true, "type": "module" }\\n\`
const ESM_DRIVER_SOURCE = \`const entry = await import(process.argv[2])
process.stdout.write(JSON.stringify(Object.keys(entry).sort()))
\`
const CJS_DRIVER_SOURCE = \`const entry = require(process.argv[2])
process.stdout.write(JSON.stringify(Object.keys(entry).sort()))
\`

// One module resolution a consumer's own TypeScript can be configured with, paired
// with the module target that resolution requires.
const RESOLUTIONS = [
	['node16', ts.ModuleResolutionKind.Node16, ts.ModuleKind.Node16],
	['nodenext', ts.ModuleResolutionKind.NodeNext, ts.ModuleKind.NodeNext],
	['bundler', ts.ModuleResolutionKind.Bundler, ts.ModuleKind.ESNext],
] as const

// One published subpath, resolved to what this proof can drive: the specifier a
// consumer writes, the declaration its types condition names, whether its target is
// a browser bundle, and whether it answers \`require\` at all.
interface Entry {
	readonly subpath: string
	readonly specifier: string
	readonly declaration: string
	readonly browser: boolean
	readonly commonjs: boolean
}

// The installed tree every claim is read from.
interface Stage {
	readonly consumer: string
	readonly installed: string
	readonly archives: readonly string[]
	readonly entries: readonly Entry[]
	readonly targets: readonly string[]
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNames(value: unknown): value is readonly string[] {
	return Array.isArray(value) && value.every((name) => typeof name === 'string')
}

function readJson(path: string): unknown {
	const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))
	return parsed
}

function readManifestName(path: string): string {
	const manifest = readJson(path)
	if (!isRecord(manifest) || typeof manifest.name !== 'string') {
		throw new Error(\`The manifest at \${path} declares no package name\`)
	}
	return manifest.name
}

function writeFile(path: string, content: string): void {
	mkdirSync(dirname(path), { recursive: true })
	writeFileSync(path, content)
}

function readOutput(result: SpawnSyncReturns<string>): string {
	return \`\${result.stdout ?? ''}\${result.stderr ?? ''}\`.trim()
}

function runNpm(args: readonly string[], cwd: string): SpawnSyncReturns<string> {
	return spawnSync(NPM, [...args], {
		cwd,
		encoding: 'utf8',
		env: { ...process.env, npm_config_cache: CACHE },
		shell: SHELL,
		windowsHide: true,
	})
}

function runNode(args: readonly string[], cwd: string): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [...args], { cwd, encoding: 'utf8', windowsHide: true })
}

// Node's own condition matching, read in declaration order: a key answers when the
// caller requested it or when it is \`default\`, and the first branch reaching a
// string wins. Walking it recursively is what makes a flat entry and a
// condition-nested one the same shape here. An entry may declare \`types\` beside
// \`default\` at its top level rather than inside \`import\`, and a fixed
// \`entry.import.types\` lookup returns a JavaScript file there.
function resolveTarget(entry: unknown, conditions: readonly string[]): string | undefined {
	if (typeof entry === 'string') return entry
	if (!isRecord(entry)) return undefined
	for (const [condition, nested] of Object.entries(entry)) {
		if (condition !== 'default' && !conditions.includes(condition)) continue
		const resolved = resolveTarget(nested, conditions)
		if (resolved !== undefined) return resolved
	}
	return undefined
}

// Every file an entry can resolve to under any condition, which is the set the
// installed tree owes a file for.
function collectTargets(entry: unknown): readonly string[] {
	if (typeof entry === 'string') return [entry]
	if (!isRecord(entry)) return []
	return Object.values(entry).flatMap((nested) => collectTargets(nested))
}

// The value exports a declaration publishes, read through the compiler's checker
// over the module symbol rather than off the declaration text. An alias resolves to
// what it names, so a re-export counts as the thing it re-exports, and a type-only
// symbol is dropped because no runtime publishes one.
function readDeclaredExports(declaration: string): readonly string[] {
	const program = ts.createProgram([declaration], {
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.Bundler,
		noEmit: true,
		skipLibCheck: true,
		target: ts.ScriptTarget.ESNext,
	})
	const source = program.getSourceFile(declaration)
	if (source === undefined) throw new Error(\`The declaration \${declaration} was not read\`)
	const checker = program.getTypeChecker()
	const symbol = checker.getSymbolAtLocation(source)
	if (symbol === undefined) throw new Error(\`\${declaration} declares no module symbol\`)
	const values: string[] = []
	for (const exported of checker.getExportsOfModule(symbol)) {
		const direct = (exported.flags & ts.SymbolFlags.Alias) === 0
		const resolved = direct ? exported : checker.getAliasedSymbol(exported)
		if ((resolved.flags & ts.SymbolFlags.Value) !== 0) values.push(exported.getName())
	}
	return [...values].sort()
}

// The diagnostics a consumer compiling against the installed declarations reports,
// flattened to their messages so a failure names what the consumer could not do.
function compileConsumer(
	entry: string,
	resolution: ts.ModuleResolutionKind,
	module: ts.ModuleKind,
): readonly string[] {
	const program = ts.createProgram([entry], {
		module,
		moduleResolution: resolution,
		noEmit: true,
		skipLibCheck: true,
		strict: true,
		target: ts.ScriptTarget.ESNext,
	})
	return ts
		.getPreEmitDiagnostics(program)
		.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '))
}

// One consumer module importing every installed entry, written where its own
// resolution finds the installed package.
function writeConsumerProbe(stage: Stage, path: string, specifiers: readonly string[]): string {
	const names: string[] = []
	const bindings: string[] = []
	for (const [index, specifier] of specifiers.entries()) {
		const binding = \`entry\${String(index)}\`
		names.push(binding)
		bindings.push(\`import * as \${binding} from \${JSON.stringify(specifier)}\`)
	}
	const target = join(stage.consumer, path)
	writeFile(target, \`\${bindings.join('\\n')}\\nexport const surface = [\${names.join(', ')}]\\n\`)
	return target
}

// The runtime key set a real process reads off one installed entry under one
// condition. The driver is a file rather than an \`--eval\` string, so the specifier
// travels as an argument and nothing needs escaping.
function driveRuntime(stage: Stage, specifier: string, driver: string): readonly string[] {
	const result = runNode([join(stage.consumer, driver), specifier], stage.consumer)
	if (result.status !== 0) {
		throw new Error(\`Loading \${specifier} from the consumer failed: \${readOutput(result)}\`)
	}
	const published: unknown = JSON.parse(result.stdout)
	if (!isNames(published)) throw new Error(\`The driver printed no name list for \${specifier}\`)
	return published
}
{{helpers}}
// Pack this workspace, install the archive into an isolated consumer, and read the
// published surface back off the installed tree. Every later claim reads this
// result, so a failure here is raised where it happens rather than once per entry.
function buildStage(): Stage {
	const packed = join(SCRATCH, 'packed')
	const consumer = join(SCRATCH, 'consumer')
	mkdirSync(packed, { recursive: true })
	const pack = runNpm(['pack', '--ignore-scripts', '--pack-destination', packed], ROOT)
	if (pack.status !== 0) throw new Error(\`npm pack refused this workspace: \${readOutput(pack)}\`)
	const archives = readdirSync(packed).filter((name) => name.endsWith('.tgz'))
	const archive = archives[0]
	if (archives.length !== 1 || archive === undefined) {
		throw new Error(\`npm pack wrote no single archive: \${archives.join(', ')}\`)
	}
	writeFile(join(consumer, 'package.json'), CONSUMER_MANIFEST)
	writeFile(join(consumer, ESM_DRIVER), ESM_DRIVER_SOURCE)
	writeFile(join(consumer, CJS_DRIVER), CJS_DRIVER_SOURCE)
	const install = runNpm(
		['install', '--ignore-scripts', '--no-audit', '--no-fund', join(packed, archive)],
		consumer,
	)
	if (install.status !== 0) {
		throw new Error(\`Installing the packed archive failed: \${readOutput(install)}\`)
	}
	const name = readManifestName(join(ROOT, 'package.json'))
	const installed = join(consumer, 'node_modules', ...name.split('/'))
	const manifest = readJson(join(installed, 'package.json'))
	if (!isRecord(manifest) || !isRecord(manifest.exports)) {
		throw new Error('The installed manifest publishes no exports map')
	}
	const entries: Entry[] = []
	const targets: string[] = []
	for (const [subpath, entry] of Object.entries(manifest.exports)) {
		targets.push(...collectTargets(entry))
		const declaration = resolveTarget(entry, ['types', 'import'])
		if (declaration === undefined || !declaration.endsWith('.d.ts')) continue
		const module = resolveTarget(entry, ['import'])
		entries.push({
			subpath,
			specifier: subpath === '.' ? name : \`\${name}\${subpath.slice(1)}\`,
			declaration: join(installed, declaration),
			browser: module !== undefined && module.startsWith(BROWSER_OUTPUT),
			commonjs: resolveTarget(entry, ['require']) !== undefined,
		})
	}
	return { consumer, installed, archives, entries, targets }
}

const SCRATCH = mkdtempSync(join(tmpdir(), 'distribution-'))
const CACHE = join(SCRATCH, 'cache')
mkdirSync(CACHE, { recursive: true })
// Installing the packed archive resolves its own runtime dependencies, so an
// unreachable registry leaves nothing to measure. Under release that is the gate
// failing; anywhere else the suite skips and names the mechanism it wanted.
const REACHABLE = runNpm(PING, ROOT).status === 0
if (RELEASE && !REACHABLE) {
	throw new Error('The release gate requires a reachable npm registry, and npm ping did not answer')
}
const STAGE = REACHABLE ? buildStage() : undefined
const STAGED = STAGE === undefined

function requireStage(): Stage {
	if (STAGE === undefined) throw new Error('No consumer was staged')
	return STAGE
}

afterAll(() => {
	rmSync(SCRATCH, { force: true, recursive: true })
})

describe('installed package consumer', () => {
	it.skipIf(STAGED)(
		'packs one archive and installs it into an isolated consumer [requires the registry]',
		() => {
			const stage = requireStage()
			expect(stage.archives).toHaveLength(1)
			expect(existsSync(join(stage.installed, 'package.json'))).toBe(true)
			expect(stage.entries.length).toBeGreaterThan(0)
		},
	)

	it.skipIf(STAGED)('ships every relative file target its exports map names', () => {
		const stage = requireStage()
		const relative = stage.targets.filter((target) => target.startsWith('./'))
		expect(relative).not.toStrictEqual([])
		expect(relative.filter((target) => !existsSync(join(stage.installed, target)))).toStrictEqual(
			[],
		)
	})

	it.skipIf(STAGED)('refuses a subpath its exports map does not name', () => {
		const stage = requireStage()
		const name = readManifestName(join(stage.installed, 'package.json'))
		const driver = join(stage.consumer, ESM_DRIVER)
		const result = runNode([driver, \`\${name}\${ABSENT_SUBPATH}\`], stage.consumer)
		expect(result.status).not.toBe(0)
		expect(readOutput(result)).toContain('ERR_PACKAGE_PATH_NOT_EXPORTED')
	})

	// The absent subpath is the firing control: a resolution that reports nothing
	// for every published entry has not been shown to resolve anything at all.
	it.skipIf(STAGED)('compiles a consumer under every module resolution one can pick', () => {
		const stage = requireStage()
		const name = readManifestName(join(stage.installed, 'package.json'))
		const published = stage.entries.map((entry) => entry.specifier)
		const reported: string[] = []
		const silent: string[] = []
		for (const [label, resolution, module] of RESOLUTIONS) {
			const probe = writeConsumerProbe(stage, \`probe.\${label}.ts\`, published)
			for (const message of compileConsumer(probe, resolution, module)) {
				reported.push(\`\${label}: \${message}\`)
			}
			const control = writeConsumerProbe(stage, \`control.\${label}.ts\`, [\`\${name}\${ABSENT_SUBPATH}\`])
			if (compileConsumer(control, resolution, module).length === 0) silent.push(label)
		}
		expect(reported).toStrictEqual([])
		expect(silent).toStrictEqual([])
	})
})

for (const entry of STAGE?.entries ?? []) {
	describe(\`installed entry \${entry.subpath}\`, () => {
		it.runIf(!entry.browser)('publishes what it declares to a Node import, and no more', () => {
			const published = driveRuntime(requireStage(), entry.specifier, ESM_DRIVER)
			expect(published).toStrictEqual(readDeclaredExports(entry.declaration))
		})

		it.runIf(!entry.browser && entry.commonjs)(
			'publishes what it declares to a Node require, and no more',
			() => {
				const published = driveRuntime(requireStage(), entry.specifier, CJS_DRIVER)
				expect(published).toStrictEqual(readDeclaredExports(entry.declaration))
			},
		)
{{drive}}	})
}
`,
			transport: `import { createServer } from 'node:http'
`,
			types: `import type { PlaywrightProviderOptions } from '@vitest/browser-playwright'
import type { Browser } from 'playwright'
`,
			launcher: `import { chromium } from 'playwright'
import { build } from 'vite'
import { resolveBrowser, resolvePinnedBrowser } from '../configs/browsers.js'
`,
			helpers: `
const BROWSER_PAGE = \`<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Distribution</title>
	</head>
	<body>
		<script type="module" src="./main.js"></script>
	</body>
</html>
\`

function readContentType(path: string): string {
	if (path.endsWith('.html')) return 'text/html'
	if (path.endsWith('.js')) return 'text/javascript'
	if (path.endsWith('.css')) return 'text/css'
	if (path.endsWith('.json') || path.endsWith('.map')) return 'application/json'
	return 'application/octet-stream'
}

// \`resolveBrowser\` answers with provider options and never reports absence: its
// last resort is a channel nothing verified. So the launch is attempted and its
// rejection classified, rather than probed for and ruled on.
function describeBrowser(options: PlaywrightProviderOptions): string {
	const endpoint = options.connectOptions?.wsEndpoint
	if (endpoint !== undefined) return \`the browser server at \${endpoint}\`
	const executable = options.launchOptions?.executablePath
	if (executable !== undefined) return \`the executable at \${executable}\`
	const channel = options.launchOptions?.channel
	if (channel !== undefined) return \`the \${channel} channel\`
	return 'the Chromium Playwright installed for itself'
}

async function launchBrowser(options: PlaywrightProviderOptions): Promise<Browser> {
	const endpoint = options.connectOptions?.wsEndpoint
	if (endpoint !== undefined) return chromium.connect(endpoint)
	return chromium.launch({ ...options.launchOptions, headless: true })
}

// A consumer of one installed browser entry, bundled by the Vite toolchain this
// workspace already declares. Nothing is stubbed: the bundle resolves the installed
// package and its whole transitive graph as an application consuming it would.
async function bundleEntry(stage: Stage, entry: Entry): Promise<string> {
	const page = join(stage.consumer, 'pages', entry.subpath.replaceAll(/[^\\w]+/gu, '-'))
	const specifier = JSON.stringify(entry.specifier)
	writeFile(join(page, 'index.html'), BROWSER_PAGE)
	writeFile(
		join(page, 'main.js'),
		\`import * as entry from \${specifier}\\nglobalThis.subject = Object.keys(entry).sort()\\n\`,
	)
	await build({
		base: './',
		build: { emptyOutDir: true, outDir: 'bundle' },
		configFile: false,
		logLevel: 'error',
		root: page,
	})
	return join(page, 'bundle')
}

// The key set the bundled module publishes in a real browser, read off the page
// once it has loaded over a loopback server. A module that never evaluated
// publishes nothing, and a page error is raised rather than compared away.
async function readBrowserExports(browser: Browser, bundle: string): Promise<readonly string[]> {
	const server = createServer((request, response) => {
		const asked = request.url === undefined || request.url === '/' ? '/index.html' : request.url
		const path = join(bundle, decodeURIComponent(asked))
		if (!path.startsWith(bundle) || !existsSync(path)) {
			response.writeHead(404)
			response.end()
			return
		}
		response.writeHead(200, { 'content-type': readContentType(path) })
		response.end(readFileSync(path))
	})
	try {
		await new Promise<void>((settle) => {
			server.listen(0, '127.0.0.1', settle)
		})
		const address = server.address()
		if (address === null || typeof address === 'string') {
			throw new Error('The bundle server bound no port')
		}
		const page = await browser.newPage()
		const failures: string[] = []
		page.on('pageerror', (error) => failures.push(String(error)))
		await page.goto(\`http://127.0.0.1:\${String(address.port)}/\`, { waitUntil: 'load' })
		const published: unknown = await page.evaluate('globalThis.subject')
		if (failures.length > 0) throw new Error(\`The bundle raised \${failures.join(' | ')}\`)
		if (!isNames(published)) throw new Error('The bundled module published no name list')
		return published
	} finally {
		server.close()
	}
}
`,
			drive: `
		it.runIf(entry.browser)(
			'publishes what it declares to a real browser, and no more [requires a browser]',
			async (context) => {
				const stage = requireStage()
				const options = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)
				const browser = await launchBrowser(options).catch((error: unknown) => {
					const cause = \`\${describeBrowser(options)} was rejected: \${String(error)}\`
					if (RELEASE) throw new Error(\`The release gate requires a browser, and \${cause}\`)
					return context.skip(\`No browser launched. \${cause}\`)
				})
				try {
					const bundle = await bundleEntry(stage, entry)
					expect(await readBrowserExports(browser, bundle)).toStrictEqual(
						readDeclaredExports(entry.declaration),
					)
				} finally {
					await browser.close()
				}
			},
		)
`,
		}),
		integration: `{{imports}}import { describe, expect, it } from 'vitest'

describe('workspace integration', () => {
	it('loads every selected public barrel together as a composition seed', () => {
		// Replace this empty-barrel seed with one observable flow that passes one
		// environment's public result into another.
		{{actual}}{{expected}})
	})
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
{{vendors}}
`,
	}),
})
