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
		vite: `import type { {{viteTypes}} } from 'vite'
{{imports}}import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
{{helpers}}{{browsers}}import { fileURLToPath, URL } from 'node:url'

{{options}}export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
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
 * @param platform - The Node platform whose standard layouts should be probed.
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
 * @param platform - The Node platform whose standard layouts should be probed.
 * @param environment - The process environment supplying operator overrides and Windows roots.
 * @param root - The managed-container bundled browsers directory to search.
 * @returns Provider options naming an executable, a WebSocket endpoint, or a channel.
 *
 * @remarks
 * Precedence, most important first: \`PLAYWRIGHT_EXECUTABLE_PATH\`, \`PLAYWRIGHT_WS_ENDPOINT\`,
 * \`PLAYWRIGHT_CHANNEL\`, the managed Playwright Chromium, the container's bundled Chromium, a
 * verified system channel, then the platform default channel. An operator override outranks
 * discovery and is returned exactly as given: none of those three environment values is checked
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
