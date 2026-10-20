import {
	BIN_ENTRY_PATH,
	CONFORMANCE_TEST_PATH,
	DISTRIBUTION_TEST_PATH,
	GUIDES_TEST_PATH,
	INTEGRATION_TEST_PATH,
	SERVICE_TEST_INCLUDE,
	STUDIES_TEST_INCLUDE,
} from './constants.js'

/**
 * Holds formatter-stable template text for every configuration artifact.
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
{{paths}}
	},
	"exclude": ["node_modules", "dist", "tmp"]
}
`,
		// The manifest import and the `peers` derivation this template emits are
		// fixed, where `{{imports}}`, `{{helpers}}`, and `{{browsers}}` are selected.
		// One fixed block costs less than a fifth conditional span, and a workspace
		// that builds nothing carries one export nothing reads.
		vite: `{{journey}}import type { PluginOption, UserConfig } from 'vite'
import { mergeConfig } from 'vite'
{{imports}}import { defineConfig } from 'vitest/config'
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
	alias: Object.fromEntries(
		Object.entries(tsconfig.compilerOptions.paths).map(([key, values]) => {
			const [path] = values
			if (path === undefined) throw new Error('tsconfig path alias ' + key + ' has no target')
			return [key, resolveWorkspacePath(path)]
		}),
	),
}

// Merges a caller's override onto the configuration a factory declares, so a
// package's own configuration reaches the factory through its parameter instead of
// wrapping the call from outside.
//
// Vitest calls every registered project factory with its own invocation record —
// \`command\`, \`mode\`, \`isSsrBuild\`, \`isPreview\` — so a factory that also takes an
// override receives that record in the same position. A \`UserConfig\` declares \`mode\`
// but not \`command\`, and the invocation record always carries both, so a value
// carrying the pair is that record rather than an override. The merge returns the
// base in the record's \`mode\` and carries none of the record's other fields. Vitest
// runs a project that declares no \`mode\` in its own run mode, \`test\`, rather than in
// the \`--mode\` value it was invoked with, so a distribution proof run with
// \`--mode release\` would read \`test\` and skip where it must fail. A record whose
// \`mode\` is not a string throws. The \`tests/config.test.ts\` file drives every
// registered factory through it.
//
// \`mergeConfig\` concatenates arrays, so an override carrying \`plugins\` would otherwise
// add a second copy of a plugin the base already declares. Only named top-level
// objects replace a base plugin of the same name, in the base's position, and one
// override entry is taken at most once. An entry no base position took appends in its
// written order; the caller's own entries never merge with each other. Nested arrays,
// promises, falsy entries, and anonymous objects pass through unchanged. An override
// cannot remove a base plugin. Every key other than \`plugins\` merges as \`mergeConfig\`
// merges it, so an override's arrays elsewhere concatenate with the base's rather than
// replacing them.
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (
		override !== undefined &&
		'command' in override &&
		'mode' in override &&
		typeof override.mode !== 'string'
	) {
		throw new Error('The project invocation carries no string mode')
	}
	const effective: UserConfig | undefined =
		override !== undefined && 'command' in override && typeof override.mode === 'string'
			? { mode: override.mode }
			: override
	const merged: UserConfig = effective === undefined ? { ...base } : mergeConfig(base, effective)
	const name = merged.test?.name
	const label = typeof name === 'string' ? name : name?.label
	const browser = merged.test?.browser
	const named: UserConfig =
		label !== undefined && browser?.instances !== undefined
			? {
					...merged,
					test: {
						...merged.test,
						browser: {
							...browser,
							instances: browser.instances.map((instance) => ({
								...instance,
								name: instance.name ?? \`\${label} (\${instance.browser})\`,
							})),
						},
					},
				}
			: merged
	if (named.plugins === undefined || effective === undefined) return named
	const candidates = [...(effective.plugins ?? [])]
	const bases = [...(base.plugins ?? [])]
	// A base plugin takes the first candidate of its own name that no earlier base plugin took, and
	// candidates of other names never compete for it, so its pick is the candidate whose rank among
	// its name equals the number of earlier base plugins sharing that name.
	const chosen = bases.map((plugin, position) =>
		isNamedPlugin(plugin)
			? candidates
					.flatMap((candidate, index) =>
						isNamedPlugin(candidate) && candidate.name === plugin.name ? [index] : [],
					)
					.at(
						bases
							.slice(0, position)
							.filter((earlier) => isNamedPlugin(earlier) && earlier.name === plugin.name).length,
					)
			: undefined,
	)
	return {
		...named,
		plugins: [
			...bases.map((plugin, position) => {
				const index = chosen[position]
				return index === undefined ? plugin : (candidates[index] ?? plugin)
			}),
			...candidates.filter((_, index) => !chosen.includes(index)),
		],
	}
}

function isNamedPlugin(plugin: PluginOption): plugin is { name: string } {
	return (
		typeof plugin === 'object' &&
		plugin !== null &&
		!Array.isArray(plugin) &&
		!('then' in plugin && typeof plugin.then === 'function') &&
		'name' in plugin &&
		typeof plugin.name === 'string'
	)
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
		sheet: `export function sheetProject(name: string, override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		optimizeDeps,
		publicDir: false,
		test: {
			name: { label: name, color: 'magenta' },
			root: resolveWorkspacePath('.'),
			isolate: false,
			setupFiles: [
				'./tests/setup.ts',
				'./tests/setupBrowser.ts',
				...(existsSync(resolveWorkspacePath('tests/setupStyles.ts'))
					? ['./tests/setupStyles.ts']
					: []),
			],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				commands,
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
`,
		src: Object.freeze({
			core: `export function srcCore(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
	}
	return mergeOverride(project, override)
}
`,
			vue: `function resolveVueFilename(): string {
	return 'index.js'
}

export function srcVue(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		optimizeDeps: { include: [...optimizeDeps.include, 'vue'] },
		publicDir: false,
		plugins: [outputBoundary('dist/src/vue'), environmentBoundary('src/vue'), vue()],
		build: {
			emptyOutDir: true,
			sourcemap: true,
			minify: false,
			lib: {
				entry: resolveWorkspacePath('src/vue/index.ts'),
				formats: ['es'],
				fileName: resolveVueFilename,
			},
			outDir: 'dist/src/vue',
			rolldownOptions: { onLog: enforceBuildLog },
		},
		test: {
			name: { label: 'src:vue', color: 'green' },
			include: ['tests/src/vue/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				commands,
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
`,
			browser: `function resolveBrowserFilename(): string {
	return 'index.js'
}

export function srcBrowser(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		optimizeDeps,
		publicDir: false,
		plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')],
		build: {
			emptyOutDir: true,
			sourcemap: true,
			minify: false,
			lib: {
				entry: resolveWorkspacePath('src/browser/index.ts'),
				formats: ['es'],
				fileName: resolveBrowserFilename,
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
{{exclude}}			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
{{global}}
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				commands,
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
`,
			server: `function resolveServerFilename(format: string): string {
	return format === 'es' ? 'index.js' : 'index.cjs'
}

export function srcServer(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
				fileName: resolveServerFilename,
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
{{exclude}}			setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}
`,
			bin: `function resolveBinFilename(): string {
	return 'main.js'
}

function resolveBinExternal(id: string): boolean {
	return id.startsWith('@src/') || resolveExternal(id, { peers, refused: [], siblings: [] })
}

export function srcBin(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
				fileName: resolveBinFilename,
			},
			outDir: 'dist/bin',
			target: 'node22',
			rolldownOptions: {
				onLog: enforceBuildLog,
				external: resolveBinExternal,
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
	}
	return mergeOverride(project, override)
}
`,
		}),
		app: Object.freeze({
			core: `export function appCore(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
	}
	return mergeOverride(project, override)
}
`,
			browser: `export function appBrowser(override?: UserConfig): UserConfig {
	const output = 'dist/app/browser'
	const project: UserConfig = {
		resolve,
		optimizeDeps,
		plugins: [outputBoundary(output), environmentBoundary('app/browser')],
		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		build: {
			assetsInlineLimit: 0,
			emptyOutDir: true,
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
{{journeyExclude}}			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				commands,
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
{{showcaseFactory}}{{journeyFactory}}`,
			vue: `export function appVue(override?: UserConfig): UserConfig {
	const output = 'dist/app/vue'
	const browser = appBrowser()
	const project: UserConfig = {
		...browser,
		optimizeDeps: { include: [...optimizeDeps.include, 'vue'] },
		plugins: [outputBoundary(output), environmentBoundary('app/vue'), vue()],
		root: resolveWorkspacePath('app/vue'),
		build: {
			...browser.build,
			outDir: resolveWorkspacePath(output),
			rolldownOptions: {
				...browser.build?.rolldownOptions,
				input: resolveWorkspacePath('app/vue/index.html'),
			},
		},
		test: {
			...browser.test,
			name: { label: 'app:vue', color: 'magenta' },
			browser: {
				...browser.test?.browser,
				instances: (browser.test?.browser?.instances ?? []).map(
					({ name: _name, ...instance }) => instance,
				),
			},
			include: ['tests/app/vue/**/*.test.ts'],
{{journeyExclude}}		},
	}
	return mergeOverride(project, override)
}
`,
			journey: `
// Replace the journey fields directly: merging would concatenate the ordinary include
// and retain the exclusion of the journey suite.
export function appJourney(
	variant: JourneyVariant,
	variants: readonly JourneyVariant[],
	mode?: string,
): UserConfig {
	const application = resolveApplication(mode, applications)
	const browser = applications[application]()
	const project: UserConfig = {
		...browser,
		test: {
			...browser.test,
			name: { label: \`journey:\${variant.name}\`, color: 'green' },
			include: [\`tests/app/\${application}/integration.test.ts\`],
			exclude: [],
			provide: { variant: variant.name, variants, capture },
			browser: {
				...browser.test?.browser,
				enabled: true,
				viewport: { width: variant.width, height: variant.height },
				instances: (browser.test?.browser?.instances ?? []).map(
					({ name: _name, ...instance }) => instance,
				),
			},
		},
	}
	return mergeOverride(project)
}
`,
			// A showcase is the browser application written to its own output, so it composes
			// on `appBrowser` and declares only what it changes. Its output boundary carries
			// the plugin name the browser boundary carries, so the merge replaces that
			// boundary rather than adding a second one.
			showcase: `
const showcaseStamp: PluginOption = {
	name: 'orkestrel-showcase-html',
	enforce: 'post',
	generateBundle(_, bundle) {
		for (const file of Object.values(bundle)) {
			if (
				file.type === 'asset' &&
				typeof file.source === 'string' &&
				file.fileName.endsWith('.html')
			) {
				file.source = stampPage(file.source)
			}
		}
	},
}

function createShowcaseNaming(application: string): PluginOption {
	return {
		name: 'orkestrel-showcase-name',
		enforce: 'post',
		writeBundle(options) {
			if (options.dir === undefined) throw new Error('The showcase output is absent.')
			renameSync(
				resolvePath(options.dir, 'index.html'),
				resolvePath(options.dir, application + '.html'),
			)
		},
	}
}

export function appShowcase(mode: string, override?: UserConfig): UserConfig {
	const application = resolveApplication(mode, applications)
	const output = 'showcase'
	const showcase: UserConfig = {
		plugins: [
			outputBoundary(output),
			viteSingleFile({
				removeViteModuleLoader: true,
				useRecommendedBuildConfig: true,
			}),
			showcaseStamp,
			createShowcaseNaming(application),
		],
		build: {
			// The \`appBrowser\` factory sets \`assetsInlineLimit\` to 0, so every asset becomes
			// its own file, and 4096 is Vite's own default put back. The \`viteSingleFile\`
			// plugin overwrites the value while the \`useRecommendedBuildConfig\` option stays
			// true, so this line takes effect only in a workspace that turns that option off.
			assetsInlineLimit: 4096,
			cssMinify: 'lightningcss',
			emptyOutDir: false,
			minify: 'oxc',
			modulePreload: false,
			outDir: resolveWorkspacePath(output),
			reportCompressedSize: false,
			sourcemap: false,
			target: 'esnext',
		},
	}
	return applications[application](mergeOverride(showcase, override))
}
`,
			server: `function resolveAppFilename(): string {
	return 'main.cjs'
}

function resolveAppExternal(id: string): boolean {
	return id.startsWith('node:')
}

export function appServer(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		publicDir: false,
		plugins: [outputBoundary('dist/app/server'), environmentBoundary('app/server')],
		build: {
			emptyOutDir: true,
			lib: {
				entry: resolveWorkspacePath('app/server/main.ts'),
				formats: ['cjs'],
				fileName: resolveAppFilename,
			},
			outDir: resolveWorkspacePath('dist/app/server'),
			target: 'node22',
			rolldownOptions: {
				onLog: enforceBuildLog,
				external: resolveAppExternal,
			},
		},
		test: {
			name: { label: 'app:server', color: 'green' },
			include: ['tests/app/server/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}
`,
		}),
		policy: `export function policy(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'policy', color: 'white' },
			include: ['tests/policy.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}
`,
		config: `export function config(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'config', color: 'yellow' },
			include: ['tests/config.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
			// A config test validates every target wrapper, spawns the real linter twice under
			// 15-second child caps, and rolls one face up through the compiler and the extractor it
			// spawns, so this budget clears the capped pair with room for a contended host.
			testTimeout: 60_000,
		},
	}
	return mergeOverride(project, override)
}
`,
		setup: `export function setup(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'setup', color: 'white' },
			include: ['tests/setup*.test.ts'],
			exclude: ['tests/setupBrowser.test.ts', 'tests/setupStyles.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			pool: 'threads',
			isolate: false,
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}
`,
		browser: `export function setupBrowser(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		{{optimization}},
{{plugins}}		test: {
			name: { label: 'setup:browser', color: 'blue' },
			include: ['tests/setupBrowser.test.ts', 'tests/setupStyles.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
{{global}}			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				commands,
				instances: [{ browser: 'chromium', headless: true }],
			},
		},
	}
	return mergeOverride(project, override)
}
`,
		guides: `export function guides(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'guides', color: 'green' },
			include: ['${GUIDES_TEST_PATH}'],
			exclude: ['tests/src/**/*.test.ts', 'tests/app/**/*.test.ts', 'tests/setup.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}
`,
		skills: `// The skill scripts this package ships as canon, each driven as a child process against a
// scratch fixture from its mirrored proof under \`tests/agents/skills/<skill>/scripts/\`. The
// \`configs/agents/tsconfig.skills.json\` wrapper selects the project.
export function skills(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'skills', color: 'blue' },
			include: ['tests/agents/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
			// Each case spawns node on a script; a census case runs \`vitest list\` over this checkout.
			testTimeout: 60_000,
		},
	}
	return mergeOverride(project, override)
}
`,
		conformance: `// Where this package drifts from the official tooling it stays compatible with.
// The subject is this package, so the proof is hermetic and stays in \`npm test\`.
export function conformance(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'conformance', color: 'magenta' },
			include: ['${CONFORMANCE_TEST_PATH}'],
			setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
			pool: 'threads',
			isolate: false,
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}
`,
		service: `// The caller prepares the live external services before this project.
// \`tests/setupService.ts\` verifies readiness, and the project stays out of \`npm test\`
// because a real service answers it.
export function service(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
`,
		studies: `// Authored study proofs run installed packages through bounded subprocesses and protocol fixtures,
// so this project is isolated in its own gate script, test:studies.
export function studies(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'studies', color: 'red' },
			include: ['${STUDIES_TEST_INCLUDE}'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
			testTimeout: 120_000,
			hookTimeout: 120_000,
			fileParallelism: false,
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
`,
		distribution: `export function distribution(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'distribution', color: 'cyan' },
			include: ['${DISTRIBUTION_TEST_PATH}'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			testTimeout: 120_000,
			hookTimeout: 120_000,
			fileParallelism: false,
			sequence: { groupOrder: 1 },
		},
	}
	return mergeOverride(project, override)
}
`,
		probe: `// A workbench, not a proof. No gate selects this project. Run in test mode by the
// \`test:probe\` script, it collects \`tmp/probes/**/*.test.ts\`. Run in benchmark mode by the
// \`test:bench\` script, the same workbench also collects \`tests/**/*.test.ts\` for a \`bench\` block,
// so a suite may carry a bench beside its ordinary tests without a second project. The mode
// guard around each \`bench\` call keeps it out of test mode, so it never executes there.
export function probe(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'probe', color: 'black' },
			include: ['tmp/probes/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
			fileParallelism: false,
			sequence: { groupOrder: 1 },
			pool: 'threads',
			benchmark: { include: ['tmp/probes/**/*.test.ts', 'tests/**/*.test.ts'] },
		},
	}
	return mergeOverride(project, override)
}
`,
		integration: Object.freeze({
			sheet: `export function integration(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		test: {
			include: ['tests/integration.test.ts'],
{{global}}		},
	}
	return sheetProject('integration', mergeOverride(project, override))
}
`,
			module: `export function integration(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'integration', color: 'blue' },
			include: ['${INTEGRATION_TEST_PATH}'],
			setupFiles: ['./tests/setup.ts'],
{{global}}			environment: 'node',
		},
	}
	return mergeOverride(project, override)
}
`,
		}),
	}),
	tsconfigs: Object.freeze({
		vue: Object.freeze({
			src: `{
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
		"../../src/vue/**/*.cts",
		"../../src/vue/**/*.mts",
		"../../src/vue/**/*.ts",
		"../../src/vue/**/*.tsx"
	]
}
`,
			app: `{
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
		}),
		sheet: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext"],
		"types": ["vite/client"],
		"noEmit": true
	},
	"include": ["../../src/{{name}}/**/*.ts"]
}
`,
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
		"types": ["vite/client"]
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
		skills: `{
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["ESNext"],
		"types": ["node"]
	},
	"include": ["../../.agents/skills/*/scripts/*.ts"],
	"exclude": ["../../node_modules"]
}
`,
	}),
	vites: Object.freeze({
		sheet: `import { defineConfig } from 'vitest/config'
import { outputBoundary } from '../helpers.js'
import { resolveWorkspacePath, sheetProject } from '../../vite.config.ts'

export default defineConfig((invocation) => {
	const project = sheetProject('src:{{label}}', {
		plugins: [outputBoundary('dist/src/{{name}}')],
		build: {
			outDir: 'dist/src/{{name}}',
			emptyOutDir: true,
			// Preserve the authored layer-order statement in the published sheet.
			cssMinify: false,
			lib: {
				entry: resolveWorkspacePath('src/{{name}}/sheet.ts'),
				formats: ['es'],
				fileName: 'index',
				cssFileName: 'index',
			},
		},
		test: { include: ['tests/src/{{name}}/**/*.test.ts'] },
	})
	return { ...project, mode: invocation.mode }
})
`,
		src: Object.freeze({
			core: `import { defineConfig } from 'vite'
import {
	declarationRollup,
	environmentBoundary,
	outputBoundary,
	resolveExternal,
} from '../helpers.js'
import { peers, srcCore, resolveWorkspacePath } from '../../vite.config.ts'

export default defineConfig(
	srcCore({
		publicDir: false,
		plugins: [
			outputBoundary('dist/src/core'),
			environmentBoundary('src/core'),
			declarationRollup({
				project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
				types: ['node'],
			}),
		],
		build: {
			lib: {
				entry: resolveWorkspacePath('src/core/index.ts'),
				formats: ['es', 'cjs'],
				fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
			},
			outDir: 'dist/src/core',
			rolldownOptions: {
				external: (id: string) => resolveExternal(id, { peers, refused: [], siblings: [] }),
			},
		},
	}),
)
`,
			vue: `import { defineConfig } from 'vite'
import {
	declarationRollup,
	resolveExternal,
	rewriteBrowserSpecifier,
	rewriteCoreSpecifier,
} from '../helpers.js'
import { peers, srcVue, resolveWorkspacePath } from '../../vite.config.ts'

const siblings = {
{{siblings}}
}

export default defineConfig(
	srcVue({
		plugins: [
			declarationRollup({
				project: resolveWorkspacePath('configs/src/tsconfig.vue.json'),
				rewrite: (content) => rewriteBrowserSpecifier(rewriteCoreSpecifier(content)),
			}),
		],
		build: {
			rolldownOptions: {
				external: (id: string) =>
					resolveExternal(id, {
						peers,
						refused: {{refused}},
						siblings: Object.keys(siblings),
					}),
				output: { paths: siblings },
			},
		},
	}),
)
`,
			browser: `import { defineConfig } from 'vite'
import { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'
import { srcBrowser, resolveWorkspacePath } from '../../vite.config.ts'

// The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite
// externalizes core through the package's own published root export, on the final roll-up alone.
export default defineConfig(
	srcBrowser({
		plugins: [
			declarationRollup({
				project: resolveWorkspacePath('configs/src/tsconfig.browser.json'),
				rewrite: rewriteCoreSpecifier,
			}),
		],
	}),
)
`,
			server: `import { defineConfig } from 'vite'
import { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'
import { srcServer, resolveWorkspacePath } from '../../vite.config.ts'

// The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite
// externalizes core through the package's own published root export, on the final roll-up alone.
export default defineConfig(
	srcServer({
		plugins: [
			declarationRollup({
				project: resolveWorkspacePath('configs/src/tsconfig.server.json'),
				rewrite: rewriteCoreSpecifier,
			}),
		],
	}),
)
`,
		}),
		bin: `import { defineConfig } from 'vite'
import { resolveExternal } from '../helpers.js'
import { peers, srcBin } from '../../vite.config.ts'

// The \`scaffold\` executable build — a single ESM lib file, no declarations (an
// executable ships no types), with the \`#!/usr/bin/env node\` shebang re-emitted through
// \`output.banner\` (rolldown strips shebangs from source during bundling), and
// \`output.paths\` rewriting the externalized \`@src/*\` specifiers to the built sibling
// src environments (relative to \`dist/bin/\`), so the emitted bin resolves at runtime.
export default defineConfig(
	srcBin({
		build: {
			rolldownOptions: {
				external: (id: string) =>
					id.startsWith('@src/') || resolveExternal(id, { peers, refused: [], siblings: [] }),
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
			vue: `import { defineConfig } from 'vite'
import { appVue } from '../../vite.config.ts'

export default defineConfig(appVue())
`,
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

export default defineConfig(({ mode }) => appShowcase(mode))
`,
			journey: `import type { JourneyVariant } from '@orkestrel/test'
import { defineConfig } from 'vitest/config'
import { appJourney } from '../../vite.config.ts'

// Rename and extend these viewports for the application. Apply themes through its interface.
const VARIANTS: readonly JourneyVariant[] = Object.freeze([
	{ name: 'desktop', width: 1280, height: 800 },
	{ name: 'compact', width: 390, height: 844 },
])

export default defineConfig(({ mode }) => ({
	test: {
		projects: VARIANTS.map((variant) => () => appJourney(variant, VARIANTS, mode)),
	},
}))
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
 * Lists the Chromium executable layouts inside a \`chromium-<revision>\` browsers-directory
 * entry, per platform.
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

/** Matches the \`chromium-<revision>\` entry name Playwright installs one managed build into. */
export const CHROMIUM_ENTRY_PATTERN = /^chromium-\\d+$/

/** Matches the revision number carried by any path containing a \`chromium-<revision>\` segment. */
export const CHROMIUM_REVISION_PATTERN = /chromium-(\\d+)/

/** Names the directory a managed Linux container installs its bundled Playwright browsers into. */
export const BUNDLED_BROWSERS_ROOT = '/opt/pw-browsers'

/**
 * Lists the bundled Chromium layouts under the managed-container browsers root, as glob patterns.
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

/** Lists the stable Playwright Chromium channels and their standard executable layouts. */
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
 * Determines whether a path identifies an executable regular file.
 *
 * @param path - The filesystem path to inspect.
 * @returns True if the path is a regular file with execute access; false otherwise.
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
 * Orders two Chromium paths so the highest revision sorts first.
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
 * Reads the executable path of Playwright's pinned Chromium revision.
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
 * Resolves a launchable Playwright-managed Chromium executable: the pinned revision when installed,
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
	// One \`dirname\` per path segment reaches the root from any path, and the nearest
	// ancestor named \`chromium-<revision>\` is the revision directory this build sits in.
	const directory = dirname(pinned)
	const ancestors = directory
		.split(/[\\\\/]/u)
		.reduce<string[]>((chain) => [...chain, dirname(chain.at(-1) ?? directory)], [directory])
	const revisionRoot = ancestors.find((ancestor) => CHROMIUM_ENTRY_PATTERN.test(basename(ancestor)))
	if (revisionRoot === undefined) return undefined
	const browsersRoot = dirname(revisionRoot)
	for (const alias of ['chromium', 'chromium.exe']) {
		const candidate = resolvePath(browsersRoot, alias)
		if (isBrowserExecutable(candidate)) return candidate
	}
	try {
		const revisions = readdirSync(browsersRoot)
			.filter((entry) => CHROMIUM_ENTRY_PATTERN.test(entry))
			.sort(compareRevisions)
		for (const revision of revisions) {
			for (const layout of CHROMIUM_LAYOUTS) {
				const candidate = resolvePath(browsersRoot, revision, layout)
				if (isBrowserExecutable(candidate)) return candidate
			}
		}
		return undefined
	} catch {
		return undefined
	}
}

/**
 * Resolves the Chromium a managed Linux container bundles outside the Playwright cache.
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
		try {
			for (const match of globSync(layout, { cwd: root }).sort(compareRevisions)) {
				const candidate = resolvePath(root, match)
				if (isBrowserExecutable(candidate)) return candidate
			}
		} catch {
			return undefined
		}
	}
	return undefined
}

/**
 * Resolves the first installed stable system Chromium channel.
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
	const roots = new Set(
		platform === 'win32'
			? [
					...[
						environment.LOCALAPPDATA,
						environment.PROGRAMFILES,
						environment['PROGRAMFILES(X86)'],
					].flatMap((root) => (root !== undefined && root.length > 0 ? [root] : [])),
					...[environment.HOMEDRIVE].flatMap((homeDrive) =>
						homeDrive !== undefined && homeDrive.length > 0
							? [join(homeDrive, 'Program Files'), join(homeDrive, 'Program Files (x86)')]
							: [],
					),
				]
			: [],
	)
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
 * Resolves Playwright provider options for Chromium on this host.
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
 * pinned revision returns empty options unless \`PLAYWRIGHT_SCROLLBARS=classic\` is set. Only a
 * discovered system channel is verified before it is named. The platform default is unverified
 * as well and exists only as a last resort: Windows takes \`msedge\`, which ships with the OS and
 * never collides with a foreground Chrome.
 *
 * Set \`PLAYWRIGHT_SCROLLBARS=classic\` only for runs that measure scrollbar compensation, never
 * for a standing gate. Every Chromium launch in that run omits Playwright's \`--hide-scrollbars\`
 * default argument so classic scrollbars can take layout space in every case. An empty or unset
 * value preserves the launch defaults; any other value throws an \`Error\`. Pairing \`classic\`
 * with \`PLAYWRIGHT_WS_ENDPOINT\` throws an \`Error\`, even with an executable override, because the
 * server owns the launch.
 *
 * The resolver and the gate cover Chromium alone. Reopen engine selection when another
 * Playwright engine is installed and launches on the host with a \`captureFrame\` reading
 * back at its declared size, or when a journey or style divergence is recorded.
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
	const scrollbars = environment.PLAYWRIGHT_SCROLLBARS
	if (scrollbars !== undefined && scrollbars.length > 0 && scrollbars !== 'classic') {
		throw new Error('PLAYWRIGHT_SCROLLBARS must be classic or empty')
	}
	const endpoint = environment.PLAYWRIGHT_WS_ENDPOINT
	if (scrollbars === 'classic' && endpoint !== undefined && endpoint.length > 0) {
		throw new Error('PLAYWRIGHT_SCROLLBARS=classic cannot be used with PLAYWRIGHT_WS_ENDPOINT')
	}
	const launch: PlaywrightProviderOptions['launchOptions'] =
		scrollbars === 'classic' ? { ignoreDefaultArgs: ['--hide-scrollbars'] } : {}
	const executable = environment.PLAYWRIGHT_EXECUTABLE_PATH
	if (executable !== undefined && executable.length > 0) {
		return { launchOptions: { executablePath: executable, ...launch } }
	}
	if (endpoint !== undefined && endpoint.length > 0) {
		return { connectOptions: { wsEndpoint: endpoint } }
	}
	const requested = environment.PLAYWRIGHT_CHANNEL
	if (requested !== undefined && requested.length > 0) {
		return { launchOptions: { channel: requested, ...launch } }
	}
	const managed = pinned === undefined ? undefined : resolveManagedBrowser(pinned)
	if (managed !== undefined) {
		if (managed === pinned) return scrollbars === 'classic' ? { launchOptions: launch } : {}
		return { launchOptions: { executablePath: managed, ...launch } }
	}
	const bundled = resolveBundledBrowser(platform, root)
	if (bundled !== undefined) return { launchOptions: { executablePath: bundled, ...launch } }
	const fallback = platform === 'win32' ? 'msedge' : 'chrome'
	return {
		launchOptions: { channel: resolveSystemBrowser(platform, environment) ?? fallback, ...launch },
	}
}
`,
	commands: `import type { BrowserConfigOptions } from 'vitest/node'

export const commands: Readonly<NonNullable<BrowserConfigOptions['commands']>> = Object.freeze({})
`,
})

/**
 * Holds formatter-stable template text for source, test, document, guide, and service artifacts.
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
		sheet: Object.freeze({
			'index.scss': "@use 'tokens';\n@use 'elements';\n@use 'components';\n@use 'utilities';\n",
			'_tokens.scss': '@layer theme, reset, base, elements, components, utilities;\n',
			'_mixins.scss': '',
			'elements/_index.scss': '',
			'components/_index.scss': '',
			'utilities/_index.scss': '',
			'sheet.ts': "import './index.scss'\n",
			'index.ts': "export * from './sheet.js'\n",
		}),
		themes: Object.freeze({
			'index.scss': "@use '../tokens';\n@use 'default';\n",
			'_default.scss': '',
			'sheet.ts': "import './index.scss'\n",
		}),
		empty: '',
		barrel: '// TODO: [Feature] Export the browser extension API.\n',
		main: `document.body
	.appendChild(document.createElement('main'))
	.appendChild(document.createElement('h1')).textContent ={{heading}}
`,
		vue: Object.freeze({
			'main.ts': `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount(document.body.appendChild(document.createElement('main')))
`,
			'App.vue': `<template>
	<h1>{{heading}}</h1>
</template>
`,
		}),
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
		journey: `import {
	ACCESSIBLE_ROLES,
	createPortfolio,
	expandCaptures,
	isRendered,
	readRefusal,
	readStyle,
} from '@orkestrel/test/browser'
{{imports}}import { page } from 'vitest/browser'
import { describe, expect, inject, it } from 'vitest'

const VARIANT = inject('variant')
const VARIANTS = inject('variants')
const CAPTURE = inject('capture')

describe('{{application}} arrival journey', () => {
	it('proves the declared arrival families', async () => {
		const families = ['Journey', 'Refusal', 'Matrix', ...(CAPTURE ? ['Capture'] : [])]
		const proven: string[] = []
		const states = ['{{application}}-arrival']
		const placed: string[] = []
		const portfolio = createPortfolio({
			states,
			variants: VARIANTS,
			variant: VARIANT,
			directory: '../../../tmp/captures/states',
			enabled: CAPTURE,
		})
{{mount}}		try {
{{arrival}}			const heading = page
				.getByRole('heading', {
					name: {{heading}},
					exact: true,
					level: 1,
				})
				.element()
			expect(isRendered(heading)).toBe(true)
			proven.push('Journey')
			await portfolio.place('{{application}}-arrival')
			placed.push('{{application}}-arrival')

			for (const role of ACCESSIBLE_ROLES) expect(page.getByRole(role).elements()).toEqual([])
			expect(readRefusal('Continue')).toBe(
				'No interactive element has the accessible name "Continue"',
			)
			proven.push('Refusal')

			const measured: string[] = []
			for (const variant of VARIANTS) {
				await page.viewport(variant.width, variant.height)
				expect(readStyle(heading, 'display')).toBe('block')
				expect(window.innerWidth).toBe(variant.width)
				measured.push(variant.name)
			}
			expect(measured).toEqual(VARIANTS.map(({ name }) => name))
			proven.push('Matrix')

			const files = expandCaptures(states, VARIANTS)
			expect(portfolio.files).toEqual(files)
			expect(new Set(files).size).toBe(states.length * VARIANTS.length)
			expect(placed).toEqual(states)
			const expected = CAPTURE
				? expandCaptures(
						states,
						VARIANTS.filter(({ name }) => name === VARIANT),
					)
				: []
			expect(portfolio.paths.map((path) => path.replaceAll('\\\\', '/').split('/').at(-1))).toEqual(
				expected,
			)
			if (CAPTURE) proven.push('Capture')
			expect(proven).toEqual(families)
		} finally {
{{cleanup}}			const variant = VARIANTS.find(({ name }) => name === VARIANT)
			if (variant !== undefined) await page.viewport(variant.width, variant.height)
		}
	})
})
`,
		browser: `import type { JourneyVariant } from '@orkestrel/test'

declare module 'vitest' {
	export interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly JourneyVariant[]
		readonly capture: boolean
	}
}
`,
		sheet: `import sheet from '{{root}}dist/src/{{name}}/index.css?raw'
import { adoptSheet, readLayerNames } from '@orkestrel/test/browser'
import { describe, expect, it } from 'vitest'

describe('{{name}} entry', () => {
	it('opens with the declared cascade order', () => {
		const adopted = adoptSheet(sheet)
		try {
			expect(adopted.sheet.cssRules[0]?.cssText).toBe(
				'@layer theme, reset, base, elements, components, utilities;',
			)
			expect(readLayerNames(adopted.sheet).slice(0, 6)).toEqual([
				'theme',
				'reset',
				'base',
				'elements',
				'components',
				'utilities',
			])
		} finally {
			adopted.release()
		}
	})
})
`,
		styles: Object.freeze({
			module: '',
			proof: '',
		}),
		setup: '',
		global: Object.freeze({
			module: `export function setup(): void {}
`,
			proof: `import { describe, expect, it } from 'vitest'
import { setup } from './setupGlobal.js'

describe('global setup', () => {
	it('runs without producing a teardown', () => {
		expect(setup()).toBeUndefined()
		expect(setup()).toBeUndefined()
	})
})
`,
		}),
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
			module: `{{types}}import type { SpawnSyncReturns } from 'node:child_process'
import type { TestContext } from 'vitest'
import { spawnSync } from 'node:child_process'
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from 'node:fs'
{{transport}}import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
{{launcher}}
/** Defines the lifecycle and installed consumer read by a distribution proof. */
export interface DistributionSuiteInterface {
	readonly scratch: string
	start(): void
	read(context: TestContext): DistributionStage
	destroy(): void
}

/** Holds the observed and required values for one distribution assertion. */
export interface DistributionObservation {
	readonly actual: unknown
	readonly expected: unknown
}

/** Defines one independently registered distribution observation. */
export interface DistributionCase {
	readonly label: string
	readonly observe: (
		context: TestContext,
	) => DistributionObservation | Promise<DistributionObservation>
}

/** Holds the installed export map's classified publications. */
export interface DistributionClassification {
	readonly entries: readonly DistributionEntry[]
	readonly subpaths: readonly string[]
	readonly undeclared: readonly string[]
	readonly excluded: readonly string[]
	readonly targets: readonly string[]
}

/** Names the workspace whose packed artifact the proof consumes. */
export const DISTRIBUTION_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
/** Names the npm executable on the running host. */
export const DISTRIBUTION_NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm'
// The compiler this workspace installs, run as a command rather than called in
// process: the command and its plain-text diagnostics are the same across the
// compiler majors this toolchain supports, and its in-process API is not. It is
// resolved from the workspace under proof, so a consumer of the packed artifact is
// checked by the same compiler that workspace's own \`check\` script runs.
/** Names the compiler installed by the workspace under proof. */
export const DISTRIBUTION_COMPILER = createRequire(join(DISTRIBUTION_ROOT, 'package.json')).resolve(
	'typescript/bin/tsc',
)
// Windows needs a shell to launch a \`.cmd\`: Node refuses one directly since the
// batch-argument hardening, and \`spawnSync\` returns \`EINVAL\` with a null status
// rather than an exit code a caller can read. Every following argument is a literal or
// a path this file built, so the shell has nothing to escape.
/** Selects the Windows command-shell route required by the npm shim. */
export const DISTRIBUTION_SHELL = process.platform === 'win32'
// \`prepublishOnly\` runs this proof as \`npm run test:distribution -- --mode release\`,
// and the root configuration's project factories carry that mode into this project.
// Release is the publish gate, so evidence it cannot obtain fails there and skips
// everywhere else: a gate that passes on missing evidence proves nothing.
/** Indicates whether missing prerequisites must fail the publish gate. */
export const DISTRIBUTION_RELEASE = import.meta.env?.MODE === 'release'
// The built output directory convention a browser face may publish from. Every
// selection reads this prefix off the export target and never off the subpath name. A
// workspace whose only published face is the browser one publishes that face at the
// root subpath, so a rule keyed on the subpath name drives a browser bundle through
// Node and the miss is silent.
/** Names the conventional output prefix for a browser publication. */
export const DISTRIBUTION_BROWSER_OUTPUT = './dist/src/browser/'
/** Names the unpublished subpath used as a resolution control. */
export const DISTRIBUTION_ABSENT_SUBPATH = '/no-subpath-is-published-under-this-name'
// A compiler diagnostic that says where it is: the path relative to the directory
// the compiler ran in, the 1-based line and column, the code, and the message. The
// diagnostics are the verdict rather than the exit code, which differs between the
// compiler majors this toolchain supports, so a reported line matching nothing here
// came from something other than a check of a consumer module.
/** Matches the location prefix of a consumer compiler diagnostic. */
export const DISTRIBUTION_DIAGNOSTIC_PATTERN = /^(.+?)\\(\\d+,\\d+\\): error TS\\d+: /u
/** Lists the bounded registry-readiness command arguments. */
export const DISTRIBUTION_PING = Object.freeze([
	'ping',
	'--fetch-retries=0',
	'--fetch-timeout=5000',
	'--loglevel=silent',
])
/** Names the consumer entry that imports an installed module. */
export const DISTRIBUTION_ESM_DRIVER = 'drive.mjs'
/** Names the consumer entry that requires an installed module. */
export const DISTRIBUTION_CJS_DRIVER = 'drive.cjs'
/** Defines the isolated consumer package manifest. */
export const DISTRIBUTION_CONSUMER_MANIFEST =
	'{ "name": "distribution-consumer", "private": true, "type": "module" }\\n'
/** Reads the names exported by an installed ESM entry. */
export const DISTRIBUTION_ESM_DRIVER_SOURCE = \`const entry = await import(process.argv[2])
process.stdout.write(JSON.stringify(Object.keys(entry).sort()))
\`
/** Reads the names exported by an installed CommonJS entry. */
export const DISTRIBUTION_CJS_DRIVER_SOURCE = \`const entry = require(process.argv[2])
process.stdout.write(JSON.stringify(Object.keys(entry).sort()))
\`

// The extensions a JavaScript handler loads as modules. Node loads a native addon
// through its addon handler instead, so that extension is named separately.
/** Lists extensions loaded as JavaScript modules. */
export const DISTRIBUTION_MODULE_EXTENSIONS = Object.freeze(['.js', '.mjs', '.cjs'])
/** Names the extension loaded by the native-addon handler. */
export const DISTRIBUTION_ADDON_EXTENSION = '.node'
// The extensions a declaration file carries. A \`require\` condition declares
// \`.d.cts\` and an ESM-only one \`.d.mts\`, so the \`.d.ts\` spelling alone does not
// name them.
/** Lists the supported TypeScript declaration extensions. */
export const DISTRIBUTION_DECLARATION_EXTENSIONS = Object.freeze(['.d.ts', '.d.cts', '.d.mts'])
/** Names the module format of a typed consumer. */
export type DistributionFormat = 'module' | 'commonjs'

// The Node import target is resolved with the conditions that driver supplies. The
// CommonJS compile probe is selected from its declaration's format, and its runtime
// drive loads the same subpath through Node's require resolver. Vite's production
// client build enables its module and browser conditions.
/** Defines the conditions each runtime uses to resolve an entry. */
export const DISTRIBUTION_RUNTIME_CONDITIONS = Object.freeze({
	module: Object.freeze(['node-addons', 'node', 'import', 'module-sync']),
	commonjs: Object.freeze(['node-addons', 'node', 'require', 'module-sync']),
	browser: Object.freeze(['module', 'browser', 'production', 'import']),
})
// TypeScript's Node resolutions add \`node\` to the format condition. Its bundler
// resolution does not, so a browser drive compares against the declaration a bundler
// consumer reads rather than borrowing the Node declaration.
/** Defines the declaration conditions used by bundler consumers. */
export const DISTRIBUTION_BUNDLER_CONDITIONS = Object.freeze({
	module: Object.freeze(['types', 'import']),
	commonjs: Object.freeze(['types', 'require']),
})
/** Defines the declaration conditions paired with each runtime. */
export const DISTRIBUTION_DECLARATION_CONDITIONS = Object.freeze({
	module: Object.freeze(['types', 'node', 'import']),
	commonjs: Object.freeze(['types', 'node', 'require']),
	browser: DISTRIBUTION_BUNDLER_CONDITIONS.module,
})

/** Describes the compiler options and conditions for one consumer resolution. */
export interface DistributionResolution {
	readonly label: string
	readonly resolution: string
	readonly module: string
	readonly conditions: Readonly<Record<DistributionFormat, readonly string[]>>
}

/** Holds the target selected by package condition resolution. */
export interface DistributionTargetResult {
	readonly target: string
}

// Each compile driver carries the compiler options its scratch project sets and
// the conditions TypeScript applies for that resolution and importing format. A
// \`require\`-only subpath therefore stays in each CommonJS probe that can resolve it.
// The option values are the spellings the project file takes, so nothing here needs
// the compiler's own API to name them.
/** Lists the compiler resolutions driven against installed declarations. */
export const DISTRIBUTION_RESOLUTIONS: readonly DistributionResolution[] = Object.freeze([
	{
		label: 'node16',
		resolution: 'node16',
		module: 'node16',
		conditions: DISTRIBUTION_DECLARATION_CONDITIONS,
	},
	{
		label: 'nodenext',
		resolution: 'nodenext',
		module: 'nodenext',
		conditions: DISTRIBUTION_DECLARATION_CONDITIONS,
	},
	{
		label: 'bundler',
		resolution: 'bundler',
		module: 'esnext',
		conditions: DISTRIBUTION_BUNDLER_CONDITIONS,
	},
])

// The driver a bundled consumer reads declarations under. A browser application
// compiles through a bundler, so the browser drive answers under this one alone,
// and naming it here is what keeps that selection tied to the driver it selects.
/** Selects the compiler resolution used by a browser consumer. */
export const DISTRIBUTION_BROWSER_RESOLUTION = DISTRIBUTION_RESOLUTIONS.find(
	(candidate) => candidate.label === 'bundler',
)
if (DISTRIBUTION_BROWSER_RESOLUTION === undefined)
	throw new Error("DISTRIBUTION_RESOLUTIONS carries no 'bundler' row")

/** Pairs consumer source extensions with their module formats. */
export const DISTRIBUTION_FORMATS: ReadonlyArray<
	readonly [extension: string, format: DistributionFormat]
> = Object.freeze([
	['ts', 'module'],
	['cts', 'commonjs'],
])

// One published subpath, resolved to what this proof can drive: the specifier a
// consumer writes, whether the declarations its consumer formats resolve at all,
// whether the exports map answers the browser condition with a target of its own,
// whether it answers \`import\` and \`require\` at all, and whether the target that
// \`require\` answers with is one that a CommonJS consumer loads.
/** Describes one published subpath and its runtime and declaration capabilities. */
export interface DistributionEntry {
	readonly subpath: string
	readonly specifier: string
	readonly mapping: unknown
	readonly declaration: {
		readonly importable: boolean
		readonly requirable: boolean
		readonly browsable: boolean
	}
	readonly browsable: boolean
	readonly importable: boolean
	readonly requirable: boolean
	readonly loadable: boolean
}

// The installed tree every claim is read from. Every subpath the exports map names
// lands in exactly one of \`entries\`, \`undeclared\`, and \`excluded\`, so a subpath this
// proof cannot drive is reported rather than dropped.
/** Holds the installed consumer and the partition of its published subpaths. */
export interface DistributionStage {
	readonly consumer: string
	readonly installed: string
	readonly archives: readonly string[]
	readonly entries: readonly DistributionEntry[]
	readonly subpaths: readonly string[]
	readonly undeclared: readonly string[]
	readonly excluded: readonly string[]
	readonly targets: readonly string[]
}

/**
 * Checks whether a value is a non-null object other than an array.
 *
 * @param value - The value to inspect.
 * @returns True if the value is a record; false otherwise.
 */
export function isDistributionRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Checks whether a value is an array of strings.
 *
 * @param value - The value to inspect.
 * @returns True if every array member is a string; false otherwise.
 */
export function isDistributionNames(value: unknown): value is readonly string[] {
	return Array.isArray(value) && value.every((name) => typeof name === 'string')
}

// A fallback list, which is what Node reads an array in an exports entry as. The
// narrowing is what the following walkers need: \`Array.isArray\` widens an \`unknown\`
// member to \`any\`, and an entry read that way is not read at all.
/**
 * Checks whether a value is a fallback array.
 *
 * @param value - The value to inspect.
 * @returns True if the value is an array; false otherwise.
 */
export function isDistributionList(value: unknown): value is readonly unknown[] {
	return Array.isArray(value)
}

// Whether a string is a valid package target. Node rejects a target outside the
// package and a target containing a dot, parent, or node_modules segment during
// package-target resolution. A later module-resolution failure is not the same
// thing: an array falls through the former and keeps the latter.
/**
 * Checks whether a relative package target contains only admitted segments.
 *
 * @param target - The package-relative target.
 * @returns True if the target passes package-target validation; false otherwise.
 */
export function matchesDistributionPackageTarget(target: string): boolean {
	if (!target.startsWith('./')) return false
	const refused = ['.', '..', 'node_modules']
	return target
		.slice(2)
		.split(/[\\\\/]/u)
		.every((segment) => {
			try {
				return !refused.includes(decodeURIComponent(segment).toLowerCase())
			} catch {
				return !refused.includes(segment.toLowerCase())
			}
		})
}

/**
 * Reads and parses a JSON file.
 *
 * @param path - The file to read.
 * @returns The parsed value. Throws when reading or parsing fails.
 */
export function readDistributionJSON(path: string): unknown {
	const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))
	return parsed
}

/**
 * Reads the package name from a manifest.
 *
 * @param path - The manifest to read.
 * @returns The package name. Throws when the manifest has no string name.
 */
export function readDistributionManifestName(path: string): string {
	const manifest = readDistributionJSON(path)
	if (!isDistributionRecord(manifest) || typeof manifest.name !== 'string') {
		throw new Error(\`The manifest at \${path} declares no package name\`)
	}
	return manifest.name
}

/**
 * Writes a consumer file after creating its parent directory.
 *
 * @param path - The file to write.
 * @param content - The text to write.
 */
export function writeDistributionFile(path: string, content: string): void {
	mkdirSync(dirname(path), { recursive: true })
	writeFileSync(path, content)
}

/**
 * Combines the output streams of a completed command.
 *
 * @param result - The completed command.
 * @returns The trimmed diagnostic text.
 */
export function readDistributionOutput(result: SpawnSyncReturns<string>): string {
	return \`\${result.stdout ?? ''}\${result.stderr ?? ''}\`.trim()
}

/**
 * Runs npm with a cache inside the owned scratch directory.
 *
 * @param args - The npm arguments.
 * @param cwd - The working directory.
 * @param scratch - The owned scratch root.
 * @returns The command status and captured streams.
 */
export function runDistributionNpm(
	args: readonly string[],
	cwd: string,
	scratch: string,
): SpawnSyncReturns<string> {
	return spawnSync(DISTRIBUTION_NPM, [...args], {
		cwd,
		encoding: 'utf8',
		env: { ...process.env, npm_config_cache: join(scratch, 'cache') },
		shell: DISTRIBUTION_SHELL,
		windowsHide: true,
	})
}

/**
 * Runs a JavaScript entry with the running Node executable.
 *
 * @param args - The Node arguments.
 * @param cwd - The working directory.
 * @returns The command status and captured streams.
 */
export function runDistributionNode(
	args: readonly string[],
	cwd: string,
): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [...args], { cwd, encoding: 'utf8', windowsHide: true })
}

// Node's own condition matching, read in declaration order.
/**
 * Resolves a package target through conditions and fallback arrays.
 *
 * @param entry - The exports-map entry.
 * @param conditions - The active resolution conditions.
 * @returns The selected target, or undefined when no branch resolves.
 */
export function resolveDistributionPackageTarget(
	entry: unknown,
	conditions: readonly string[],
): DistributionTargetResult | undefined {
	if (typeof entry === 'string') return { target: entry }
	if (isDistributionList(entry)) {
		for (const member of entry) {
			const resolved = resolveDistributionPackageTarget(member, conditions)
			if (resolved !== undefined && matchesDistributionPackageTarget(resolved.target))
				return resolved
		}
		return undefined
	}
	if (!isDistributionRecord(entry)) return undefined
	for (const [condition, nested] of Object.entries(entry)) {
		if (condition !== 'default' && !conditions.includes(condition)) continue
		const resolved = resolveDistributionPackageTarget(nested, conditions)
		if (resolved !== undefined) return resolved
	}
	return undefined
}

// A flat entry, a condition-nested entry, and a fallback list all resolve through
// one walker. An entry may declare \`types\` beside \`default\` at its top level
// rather than inside \`import\`, so a fixed \`entry.import.types\` lookup is not
// equivalent to condition resolution.
/**
 * Resolves the path selected by an exports-map entry.
 *
 * @param entry - The exports-map entry.
 * @param conditions - The active resolution conditions.
 * @returns The selected path, or undefined when no branch resolves.
 */
export function resolveDistributionTarget(
	entry: unknown,
	conditions: readonly string[],
): string | undefined {
	return resolveDistributionPackageTarget(entry, conditions)?.target
}

// Whether a path is a physical file. TypeScript's file-existence check refuses a
// directory at the same spelling and continues to the outer package scope.
/**
 * Checks whether a path names a physical file.
 *
 * @param path - The filesystem path.
 * @returns True if the path names a file; false otherwise.
 */
export function matchesDistributionFile(path: string): boolean {
	try {
		return statSync(path).isFile()
	} catch {
		return false
	}
}

// TypeScript resolves a declaration target by accepting an existing declaration
// directly or by substituting beside a JavaScript target. A missing target leaves
// the containing condition or fallback list unresolved, so the walk continues.
/**
 * Resolves an existing declaration beside a package target.
 *
 * @param target - The package-relative target.
 * @param installed - The installed package root.
 * @returns The declaration target, or undefined when no declaration exists.
 */
export function targetToDistributionDeclaration(
	target: string,
	installed: string,
): string | undefined {
	if (!matchesDistributionPackageTarget(target)) return undefined
	const declaration = target.endsWith('.cjs')
		? \`\${target.slice(0, -4)}.d.cts\`
		: target.endsWith('.mjs')
			? \`\${target.slice(0, -4)}.d.mts\`
			: target.endsWith('.js')
				? \`\${target.slice(0, -3)}.d.ts\`
				: target
	if (declaration === target && !matchesDistributionDeclaration(target)) return undefined
	return matchesDistributionFile(join(installed, declaration)) ? declaration : undefined
}

// The declaration TypeScript resolves through one importing format's conditions.
// Condition objects keep manifest order, and arrays keep fallback order.
/**
 * Resolves an existing declaration through consumer conditions.
 *
 * @param entry - The exports-map entry.
 * @param conditions - The active declaration conditions.
 * @param installed - The installed package root.
 * @returns The declaration target, or undefined when no branch resolves.
 */
export function resolveDistributionDeclaration(
	entry: unknown,
	conditions: readonly string[],
	installed: string,
): string | undefined {
	if (typeof entry === 'string') return targetToDistributionDeclaration(entry, installed)
	if (isDistributionList(entry)) {
		for (const member of entry) {
			const resolved = resolveDistributionDeclaration(member, conditions, installed)
			if (resolved !== undefined) return resolved
		}
		return undefined
	}
	if (!isDistributionRecord(entry)) return undefined
	for (const [condition, nested] of Object.entries(entry)) {
		if (condition !== 'default' && !conditions.includes(condition)) continue
		const resolved = resolveDistributionDeclaration(nested, conditions, installed)
		if (resolved !== undefined) return resolved
	}
	return undefined
}

// The nearest package scope that decides a \`.d.ts\` declaration's module format. A
// physical nested manifest starts a scope even when it omits \`type\` or cannot be
// parsed. A directory at that spelling is not a manifest, so the walk continues.
/**
 * Reads the nearest package scope for a target inside an installed package.
 *
 * @param installed - The installed package root.
 * @param target - The package-relative target.
 * @returns The manifest type, or undefined when the nearest scope omits it or cannot be read.
 */
export function readDistributionPackageType(installed: string, target: string): unknown {
	// One \`dirname\` per path segment reaches the root from any path. The walk ends at the
	// installed package, so no scope above it is consulted.
	const start = dirname(join(installed, target))
	const chain = start
		.split(/[\\\\/]/u)
		.reduce<string[]>((climbed) => [...climbed, dirname(climbed.at(-1) ?? start)], [start])
	const end = chain.indexOf(installed)
	const scope = chain
		.slice(0, end === -1 ? chain.length : end + 1)
		.find((directory) => matchesDistributionFile(join(directory, 'package.json')))
	if (scope === undefined) return undefined
	try {
		const manifest = readDistributionJSON(join(scope, 'package.json'))
		return isDistributionRecord(manifest) ? manifest.type : undefined
	} catch {
		return undefined
	}
}

/**
 * Checks whether an entry publishes a distinct or conventional browser target.
 *
 * @param entry - The exports-map entry.
 * @returns True if the entry requires a browser drive; false otherwise.
 */
export function resolvesDistributionBrowser(entry: unknown): boolean {
	const module = resolveDistributionTarget(entry, DISTRIBUTION_RUNTIME_CONDITIONS.browser)
	if (module !== undefined && module.startsWith(DISTRIBUTION_BROWSER_OUTPUT)) return true
	if (module === undefined) return false
	const imported = resolveDistributionTarget(entry, DISTRIBUTION_RUNTIME_CONDITIONS.module)
	const required = resolveDistributionTarget(entry, DISTRIBUTION_RUNTIME_CONDITIONS.commonjs)
	return module !== imported && module !== required
}

// Whether the target selected by Node's CommonJS conditions is a module require can
// load. A JavaScript target takes its own nearest package scope. Native addons and
// extensionless targets have their own CommonJS handlers.
/**
 * Checks whether Node require can load an entry selected by its conditions.
 *
 * @param entry - The exports-map entry.
 * @param installed - The installed package root.
 * @returns True if the target has a CommonJS-compatible format; false otherwise.
 */
export function resolvesDistributionCommonJS(entry: unknown, installed: string): boolean {
	const target = resolveDistributionTarget(entry, DISTRIBUTION_RUNTIME_CONDITIONS.commonjs)
	if (target === undefined) return false
	const name = target.slice(target.lastIndexOf('/') + 1)
	if (name.endsWith('.cjs')) return true
	if (name.endsWith('.mjs')) return false
	if (name.endsWith('.node')) return true
	if (!name.includes('.')) return true
	return name.endsWith('.js') && readDistributionPackageType(installed, target) !== 'module'
}

// Whether the declaration selected by a typed CommonJS consumer admits that entry.
// A \`.d.cts\` declaration admits and a \`.d.mts\` declaration refuses. A \`.d.ts\`
// declaration takes its own nearest package scope.
/**
 * Checks whether an entry resolves a CommonJS-compatible declaration.
 *
 * @param entry - The exports-map entry.
 * @param installed - The installed package root.
 * @returns True if the selected declaration admits CommonJS consumption; false otherwise.
 */
export function declaresDistributionCommonJS(entry: unknown, installed: string): boolean {
	const declaration = resolveDistributionDeclaration(
		entry,
		DISTRIBUTION_DECLARATION_CONDITIONS.commonjs,
		installed,
	)
	if (declaration === undefined) return false
	if (declaration.endsWith('.d.cts')) return true
	if (declaration.endsWith('.d.mts')) return false
	return (
		declaration.endsWith('.d.ts') &&
		readDistributionPackageType(installed, declaration) !== 'module'
	)
}

// Every target an entry names under any condition. A fallback list omits members
// Node rejects during package-target validation, because no reader can take them.
/**
 * Collects the targets an entry publishes under every condition.
 *
 * @param entry - The exports-map entry.
 * @returns The targets, excluding invalid members of fallback arrays.
 */
export function collectDistributionTargets(entry: unknown): readonly string[] {
	if (typeof entry === 'string') return [entry]
	if (isDistributionList(entry))
		return entry.flatMap(collectDistributionTargets).filter(matchesDistributionPackageTarget)
	if (!isDistributionRecord(entry)) return []
	return Object.values(entry).flatMap((nested) => collectDistributionTargets(nested))
}

// Whether a target is a file a runtime loads for its names, which is what a
// declaration is owed for. The extension on the target's own file name decides it,
// and a name carrying no extension is code: \`require\` reads such a file through its
// JavaScript handler, so an extensionless target loads and publishes names. Node
// loads \`.node\` through its native-addon handler. Every other extension is an asset
// a consumer reads rather than imports — a stylesheet, a WebAssembly binary, the
// \`"./package.json"\` manifest pointer, and a declaration alike.
// The cost is an extensionless file published for a reader, such as a \`LICENSE\`:
// that target reports undeclared until it is given an extension or a declaration.
/**
 * Checks whether a target names a runtime module rather than an asset.
 *
 * @param target - The package-relative target.
 * @returns True if the target has a module extension or no extension; false otherwise.
 */
export function matchesDistributionModule(target: string): boolean {
	const name = target.slice(target.lastIndexOf('/') + 1)
	const dot = name.lastIndexOf('.')
	if (name.endsWith(DISTRIBUTION_ADDON_EXTENSION)) return true
	return dot === -1 || DISTRIBUTION_MODULE_EXTENSIONS.includes(name.slice(dot))
}

// Whether a resolved target is a declaration rather than the JavaScript a
// \`default\` branch answers with when the entry declares no \`types\` condition.
/**
 * Checks whether a target names a TypeScript declaration.
 *
 * @param target - The package-relative target.
 * @returns True if the target has a declaration extension; false otherwise.
 */
export function matchesDistributionDeclaration(target: string): boolean {
	return DISTRIBUTION_DECLARATION_EXTENSIONS.some((extension) => target.endsWith(extension))
}

// The declarations the Node module, Node CommonJS, and browser drives compare
// against. Each field uses the conditions of the TypeScript consumer paired with
// that runtime. A JavaScript target resolves through TypeScript's adjacent
// declaration substitution rather than standing in for the declaration itself.
/**
 * Reads the declarations paired with Node and browser consumers.
 *
 * @param entry - The exports-map entry.
 * @param installed - The installed package root.
 * @returns The declaration selected by each consumer format.
 */
export function readDistributionDeclaration(
	entry: unknown,
	installed: string,
): {
	readonly module: string | undefined
	readonly commonjs: string | undefined
	readonly browser: string | undefined
} {
	return {
		module: resolveDistributionDeclaration(
			entry,
			DISTRIBUTION_DECLARATION_CONDITIONS.module,
			installed,
		),
		commonjs: resolveDistributionDeclaration(
			entry,
			DISTRIBUTION_DECLARATION_CONDITIONS.commonjs,
			installed,
		),
		browser: resolveDistributionDeclaration(
			entry,
			DISTRIBUTION_DECLARATION_CONDITIONS.browser,
			installed,
		),
	}
}

// The entries one compile driver can resolve under its own conditions.
/**
 * Filters entries to those a consumer can resolve.
 *
 * @param entries - The installed entries.
 * @param conditions - The active consumer conditions.
 * @returns The matching entries in their original order.
 */
export function filterDistributionEntries(
	entries: readonly DistributionEntry[],
	conditions: readonly string[],
): readonly DistributionEntry[] {
	return entries.filter(
		(entry) =>
			resolveDistributionTarget(entry.mapping, conditions) !== undefined &&
			(!conditions.includes('require') || entry.loadable),
	)
}

// The compile drivers whose conditions reach one entry under one importing format.
// A driver that resolves no target for that entry compiles nothing, so a consumer
// written under it would report a resolution failure this package never made.
/**
 * Filters compiler resolutions to those that can read an entry.
 *
 * @param entry - The installed entry.
 * @param format - The consumer module format.
 * @returns The matching compiler resolutions.
 */
export function filterDistributionResolutions(
	entry: DistributionEntry,
	format: DistributionFormat,
): readonly DistributionResolution[] {
	return DISTRIBUTION_RESOLUTIONS.filter(
		(driver) => filterDistributionEntries([entry], driver.conditions[format]).length > 0,
	)
}

// Requirable entries that declare CommonJS support but a typed CommonJS consumer
// cannot compile against. A default branch resolving under the require condition
// set makes no CommonJS claim.
/**
 * Filters entries whose require target lacks a compatible declaration.
 *
 * @param entries - The installed entries.
 * @param installed - The installed package root.
 * @returns The entries a CommonJS consumer cannot typecheck.
 */
export function filterDistributionUntypable(
	entries: readonly DistributionEntry[],
	installed: string,
): readonly DistributionEntry[] {
	return entries.filter(
		(entry) =>
			entry.requirable &&
			isDistributionRecord(entry.mapping) &&
			Object.hasOwn(entry.mapping, 'require') &&
			!declaresDistributionCommonJS(entry.mapping, installed),
	)
}

// One surface comparison, written as the consumer module that proves it: the
// installed entry that consumer imports, the file extension fixing its importing
// format, the names a real runtime published off it, and the driver whose scratch
// project compiles it.
/** Describes the runtime names and declaration resolution compared for one entry. */
export interface DistributionSurface {
	readonly entry: DistributionEntry
	readonly extension: string
	readonly published: readonly string[]
	readonly driver: DistributionResolution
}

// A scratch project over named consumer modules, written beside them so their own
// resolution reaches the installed package. Nothing is emitted and no ambient types
// are pulled in, so what the check reads is the installed declarations alone.
/**
 * Writes a compiler project for a consumer probe.
 *
 * @param stage - The installed consumer.
 * @param name - The project filename suffix.
 * @param driver - The compiler resolution.
 * @param files - The consumer source files.
 * @returns The absolute project path.
 */
export function writeDistributionProject(
	stage: DistributionStage,
	name: string,
	driver: DistributionResolution,
	files: readonly string[],
): string {
	const path = join(stage.consumer, \`tsconfig.\${name}.json\`)
	const project = {
		compilerOptions: {
			module: driver.module,
			moduleResolution: driver.resolution,
			noEmit: true,
			skipLibCheck: true,
			strict: true,
			target: 'esnext',
			types: [],
		},
		files: [...files],
	}
	writeDistributionFile(path, \`\${JSON.stringify(project, undefined, '\\t')}\\n\`)
	return path
}

// The diagnostics the compiler this workspace installs reports for one scratch
// project. The compiler runs as a command, so nothing here reaches an API that
// moves between its majors, and the located lines it prints are the verdict rather
// than the exit code, which moves between them. A line carrying no location, a line
// naming the scratch project rather than a consumer module, and anything at all on
// the error stream are faults of this proof rather than of the package under proof,
// so each is raised where it happens instead of counted against the package.
/**
 * Checks a consumer project with the installed TypeScript compiler.
 *
 * @param stage - The installed consumer.
 * @param project - The compiler project path.
 * @returns The located compiler diagnostics. Throws on a tool or project failure.
 */
export function checkDistributionProject(
	stage: DistributionStage,
	project: string,
): readonly string[] {
	const result = runDistributionNode(
		[DISTRIBUTION_COMPILER, '--noEmit', '--pretty', 'false', '-p', project],
		stage.consumer,
	)
	const refused = \`\${result.stderr ?? ''}\`.trim()
	if (refused.length > 0) {
		throw new Error(\`The consumer compiler wrote \${refused} to its error stream\`)
	}
	const lines = \`\${result.stdout ?? ''}\`.split(/\\r\\n|\\n/u).filter((line) => line.trim().length > 0)
	// An elaborated diagnostic prints its detail on indented lines under its own
	// first line, so each of those joins the diagnostic it elaborates. The first line
	// has no diagnostic above it to join, so it opens one whatever its indentation.
	const heads = lines.flatMap((line, index) => (index === 0 || !/^\\s/u.test(line) ? [index] : []))
	const reported = heads.map((head, position) => {
		const line = lines[head] ?? ''
		const located = DISTRIBUTION_DIAGNOSTIC_PATTERN.exec(line)?.[1]
		if (located === undefined) {
			throw new Error(\`The consumer compiler reported \${line}, which names no location\`)
		}
		if (resolve(stage.consumer, located) === project) {
			throw new Error(\`The scratch project is itself at fault: \${line}\`)
		}
		return [
			line,
			...lines.slice(head + 1, heads[position + 1] ?? lines.length).map((detail) => detail.trim()),
		].join(' ')
	})
	if (reported.length === 0 && result.status !== 0) {
		throw new Error(\`The consumer compiler refused the project: \${readDistributionOutput(result)}\`)
	}
	return reported
}

// One installed entry's published names checked against its own declarations by
// the compiler this workspace installs, in the direction each divergence surfaces
// under. The runtime's key list is written into the consumer as a literal, so the
// published side comes from a real process and the declared side from the
// declarations that process's package ships, and the two can disagree. A name the
// declarations carry and the runtime does not lands on \`declared\`. A name the
// runtime carries and the declarations do not, and a name the declarations publish
// as a type alone, land on \`surfaced\`: a variable widens into the type
// \`declared\` annotates, and only \`surfaced\` reads the literal's own keys back.
// Each names the member it is about, so the failure says which export moved.
/**
 * Checks runtime export names against their installed declarations.
 *
 * @param stage - The installed consumer.
 * @param surface - The publication and declaration pair.
 * @returns The diagnostics labelled by compiler resolution.
 */
export function checkDistributionSurface(
	stage: DistributionStage,
	surface: DistributionSurface,
): readonly string[] {
	const slug = surface.entry.subpath.replaceAll(/[^\\w]+/gu, '-')
	const name = \`surface.\${surface.driver.label}\${slug}.\${surface.extension}\`
	const module = \`\${name}\`
	const keys = surface.published.map((key) => \`\${JSON.stringify(key)}: true\`).join(', ')
	writeDistributionFile(
		join(stage.consumer, module),
		\`import * as entry from \${JSON.stringify(surface.entry.specifier)}
export const published = {\${keys.length === 0 ? '' : \` \${keys} \`}} as const
export const declared: Record<keyof typeof entry, true> = published
export const surfaced: Record<keyof typeof published, true> = declared
\`,
	)
	const project = writeDistributionProject(stage, name, surface.driver, [\`./\${module}\`])
	return checkDistributionProject(stage, project).map((line) => \`\${surface.driver.label}: \${line}\`)
}

// One consumer module importing every installed entry, written where its own
// resolution finds the installed package.
/**
 * Writes a consumer importing the requested public specifiers.
 *
 * @param stage - The installed consumer.
 * @param path - The consumer-relative source path.
 * @param specifiers - The public imports to resolve.
 */
export function writeDistributionConsumerProbe(
	stage: DistributionStage,
	path: string,
	specifiers: readonly string[],
): void {
	const modules = specifiers.map((specifier, index) => ({
		binding: \`entry\${String(index)}\`,
		specifier,
	}))
	const bindings = modules.map(
		({ binding, specifier }) => \`import * as \${binding} from \${JSON.stringify(specifier)}\`,
	)
	const names = modules.map(({ binding }) => binding)
	const source = \`\${bindings.join('\\n')}\\nexport const surface = [\${names.join(', ')}]\\n\`
	writeDistributionFile(join(stage.consumer, path), source)
}

// The runtime key set a real process reads off one installed entry under one
// condition. The driver is a file rather than an \`--eval\` string, so the specifier
// travels as an argument and nothing needs escaping.
/**
 * Reads the names a real Node process loads from an installed entry.
 *
 * @param stage - The installed consumer.
 * @param specifier - The public package specifier.
 * @param driver - The consumer driver filename.
 * @returns The exported names. Throws when loading or decoding fails.
 */
export function driveDistributionRuntime(
	stage: DistributionStage,
	specifier: string,
	driver: string,
): readonly string[] {
	const result = runDistributionNode([join(stage.consumer, driver), specifier], stage.consumer)
	if (result.status !== 0) {
		throw new Error(
			\`Loading \${specifier} from the consumer failed: \${readDistributionOutput(result)}\`,
		)
	}
	const published: unknown = JSON.parse(result.stdout)
	if (!isDistributionNames(published))
		throw new Error(\`The driver printed no name list for \${specifier}\`)
	return published
}
{{helpers}}
// Pack this workspace, install the archive into an isolated consumer, and read the
// published surface back off the installed tree. Every later claim reads this
// result, so a failure here is raised where it happens rather than once per entry.
/**
 * Packs the workspace and installs its archive into an isolated consumer.
 *
 * @param scratch - The owned scratch root.
 * @returns The installed consumer and classified exports.
 * @throws Thrown when packing or installation fails.
 */
export function buildDistributionStage(scratch: string): DistributionStage {
	const packed = join(scratch, 'packed')
	const consumer = join(scratch, 'consumer')
	mkdirSync(packed, { recursive: true })
	const pack = runDistributionNpm(
		['pack', '--ignore-scripts', '--pack-destination', packed],
		DISTRIBUTION_ROOT,
		scratch,
	)
	if (pack.status !== 0)
		throw new Error(\`npm pack refused this workspace: \${readDistributionOutput(pack)}\`)
	const archives = readdirSync(packed).filter((name) => name.endsWith('.tgz'))
	const archive = archives[0]
	if (archives.length !== 1 || archive === undefined) {
		throw new Error(\`npm pack wrote no single archive: \${archives.join(', ')}\`)
	}
	writeDistributionFile(join(consumer, 'package.json'), DISTRIBUTION_CONSUMER_MANIFEST)
	writeDistributionFile(join(consumer, DISTRIBUTION_ESM_DRIVER), DISTRIBUTION_ESM_DRIVER_SOURCE)
	writeDistributionFile(join(consumer, DISTRIBUTION_CJS_DRIVER), DISTRIBUTION_CJS_DRIVER_SOURCE)
	const install = runDistributionNpm(
		['install', '--ignore-scripts', '--no-audit', '--no-fund', join(packed, archive)],
		consumer,
		scratch,
	)
	if (install.status !== 0) {
		throw new Error(\`Installing the packed archive failed: \${readDistributionOutput(install)}\`)
	}
	const name = readDistributionManifestName(join(DISTRIBUTION_ROOT, 'package.json'))
	const installed = join(consumer, 'node_modules', ...name.split('/'))
	const manifest = readDistributionJSON(join(installed, 'package.json'))
	if (!isDistributionRecord(manifest) || !isDistributionRecord(manifest.exports)) {
		throw new Error('The installed manifest publishes no exports map')
	}
	return { consumer, installed, archives, ...classifyDistributionStage(manifest, installed, name) }
}

// One file's run: the scratch directory and the staged consumer, which is absent when the
// registry could not be reached.
/** Binds an owned scratch directory to its optional installed consumer. */
export interface DistributionRun {
	readonly scratch: string
	readonly stage: DistributionStage | undefined
}

// The run the start hook binds once for this file and the stop hook releases.
/** Owns the staged consumer shared by one distribution proof. */
export class DistributionSuite implements DistributionSuiteInterface {
	#run: DistributionRun | undefined

	get scratch(): string {
		if (this.#run === undefined) {
			throw new Error('The distribution setup has not allocated its scratch directory')
		}
		return this.#run.scratch
	}

	read(context: TestContext): DistributionStage {
		const stage = this.#run?.stage
		if (stage === undefined) {
			return context.skip('\`npm ping\` did not answer, so nothing was packed or installed')
		}
		return stage
	}

	start(): void {
		if (this.#run !== undefined) {
			throw new Error('The distribution setup has already allocated its scratch directory')
		}
		const scratch = mkdtempSync(join(tmpdir(), 'distribution-'))
		this.#run = { scratch, stage: openDistributionStage(scratch) }
	}

	destroy(): void {
		if (this.#run !== undefined) {
			rmSync(this.#run.scratch, { force: true, recursive: true, maxRetries: 3, retryDelay: 100 })
		}
		this.#run = undefined
	}
}

// Installing the packed archive resolves its own runtime dependencies, so an
// unreachable registry leaves nothing to measure. Under release that is the gate
// failing; anywhere else the suite skips and names the mechanism it wanted.
/**
 * Opens an installed consumer after checking registry readiness.
 *
 * @param scratch - The owned scratch root.
 * @returns The installed consumer, or undefined when an ordinary run cannot reach the registry.
 * @throws Thrown in release mode or when staging fails, after removing scratch.
 */
export function openDistributionStage(scratch: string): DistributionStage | undefined {
	try {
		mkdirSync(join(scratch, 'cache'), { recursive: true })
		if (runDistributionNpm(DISTRIBUTION_PING, DISTRIBUTION_ROOT, scratch).status !== 0) {
			if (!DISTRIBUTION_RELEASE) return undefined
			throw new Error(
				'The release gate requires a reachable npm registry, and npm ping did not answer',
			)
		}
		return buildDistributionStage(scratch)
	} catch (error) {
		rmSync(scratch, {
			force: true,
			recursive: true,
			maxRetries: 3,
			retryDelay: 100,
		})
		throw error
	}
}

/**
 * Partitions an installed exports map into driven, undeclared, and excluded subpaths.
 *
 * @param manifest - The installed package manifest.
 * @param installed - The installed package root.
 * @param name - The published package name.
 * @returns The classified entries and complete target population.
 * @throws Thrown when the exports map is absent.
 */
export function classifyDistributionStage(
	manifest: Readonly<Record<string, unknown>>,
	installed: string,
	name: string,
): DistributionClassification {
	if (!isDistributionRecord(manifest.exports))
		throw new Error('The installed manifest publishes no exports map')
	const readings = Object.entries(manifest.exports).map(([subpath, mapping]) => {
		const files = collectDistributionTargets(mapping)
		const declaration = readDistributionDeclaration(mapping, installed)
		// A subpath resolving no declaration is partitioned rather than dropped. It is a
		// defect when a runtime loads one of its targets for names, because a consumer
		// importing it compiles against nothing under \`node16\`. It is an excluded
		// publication otherwise: the \`"./package.json"\` manifest pointer and a stylesheet
		// are published for a reader rather than an importer.
		if (
			declaration.module === undefined &&
			declaration.commonjs === undefined &&
			declaration.browser === undefined
		) {
			return { subpath, files, entry: undefined }
		}
		const importTarget = resolveDistributionTarget(mapping, DISTRIBUTION_RUNTIME_CONDITIONS.module)
		const requireTarget = resolveDistributionTarget(
			mapping,
			DISTRIBUTION_RUNTIME_CONDITIONS.commonjs,
		)
		const browserTarget = resolveDistributionTarget(
			mapping,
			DISTRIBUTION_RUNTIME_CONDITIONS.browser,
		)
		const browsable = resolvesDistributionBrowser(mapping)
		const shadowed = browsable && requireTarget === browserTarget
		const requirable = requireTarget !== undefined && !shadowed
		const loadable = requirable && resolvesDistributionCommonJS(mapping, installed)
		const entry: DistributionEntry = {
			subpath,
			specifier: subpath === '.' ? name : \`\${name}\${subpath.slice(1)}\`,
			mapping,
			declaration: {
				importable: declaration.module !== undefined,
				requirable: declaration.commonjs !== undefined,
				browsable: declaration.browser !== undefined,
			},
			browsable,
			importable: importTarget !== undefined && !(browsable && importTarget === browserTarget),
			requirable,
			loadable,
		}
		return { subpath, files, entry }
	})
	const entries = readings.flatMap(({ entry }) => (entry === undefined ? [] : [entry]))
	const targets = readings.flatMap(({ files }) => files)
	const subpaths = readings.map(({ subpath }) => subpath)
	const undeclared = readings
		.filter(({ entry, files }) => entry === undefined && files.some(matchesDistributionModule))
		.map(({ subpath }) => subpath)
	const excluded = readings
		.filter(({ entry, files }) => entry === undefined && !files.some(matchesDistributionModule))
		.map(({ subpath }) => subpath)
	return { entries, subpaths, undeclared, excluded, targets }
}

/**
 * Creates the lifecycle boundary used by generated distribution proofs.
 * @returns The suite interface backed by an owned run.
 */
export function createDistributionSuite(): DistributionSuiteInterface {
	return new DistributionSuite()
}

/**
 * Builds independently registered observations over the suite's installed consumer.
 * @param suite - The lifecycle shared by the proof's hooks and observations.
 * @returns The case rows whose observations each require one assertion.
 */
export function buildDistributionCases(
	suite: DistributionSuiteInterface,
): readonly DistributionCase[] {
	return [
		{
			label: 'classifies synthetic export mappings without a registry stage',
			observe: () => {
				const root = join(suite.scratch, 'classifiers')
				writeDistributionFile(
					join(root, 'package.json'),
					JSON.stringify({
						type: 'commonjs',
						exports: {
							condition: { browser: './b.js', default: './n.js' },
							convention: { default: './dist/src/browser/index.js' },
							universal: { default: './shared.js' },
							'import-shared': {
								browser: './shared.mjs',
								import: './shared.mjs',
								default: './node.js',
							},
							'require-shared': {
								browser: './shared.cjs',
								require: './shared.cjs',
								default: './node.js',
							},
							node: { node: './node.js', default: './node.js' },
							silent: { 'module-sync': './x.cjs', import: './x.mjs' },
							module: { require: './x.mjs' },
							'nested-module': { require: './module/x.js' },
							'nested-commonjs': { require: './commonjs/x.js' },
							esm: { import: './x.mjs' },
						},
					}),
				)
				writeDistributionFile(join(root, 'module/package.json'), '{ "type": "module" }\\n')
				writeDistributionFile(join(root, 'commonjs/package.json'), '{ "type": "commonjs" }\\n')
				const manifest = readDistributionJSON(join(root, 'package.json'))
				if (!isDistributionRecord(manifest) || !isDistributionRecord(manifest.exports)) {
					throw new Error('The classifier fixture declares no exports map')
				}
				const mappings = manifest.exports

				return {
					actual: {
						browser: {
							condition: resolvesDistributionBrowser(mappings.condition),
							convention: resolvesDistributionBrowser(mappings.convention),
							universal: resolvesDistributionBrowser(mappings.universal),
							import: resolvesDistributionBrowser(mappings['import-shared']),
							require: resolvesDistributionBrowser(mappings['require-shared']),
							node: resolvesDistributionBrowser(mappings.node),
						},
						commonjs: {
							silent: resolvesDistributionCommonJS(mappings.silent, root),
							module: resolvesDistributionCommonJS(mappings.module, root),
							nestedModule: resolvesDistributionCommonJS(mappings['nested-module'], root),
							nestedCommonJS: resolvesDistributionCommonJS(mappings['nested-commonjs'], root),
							esm: resolvesDistributionCommonJS(mappings.esm, root),
						},
					},
					expected: {
						browser: {
							condition: true,
							convention: true,
							universal: false,
							import: false,
							require: false,
							node: false,
						},
						commonjs: {
							silent: true,
							module: false,
							nestedModule: false,
							nestedCommonJS: true,
							esm: false,
						},
					},
				}
			},
		},
		{
			label: 'packs one archive and installs it in isolation [requires the registry]',
			observe: (context) => {
				const stage = suite.read(context)
				return {
					actual: {
						archives: stage.archives.length,
						installed: existsSync(join(stage.installed, 'package.json')),
						entries: stage.entries.length > 0,
					},
					expected: { archives: 1, installed: true, entries: true },
				}
			},
		},
		{
			label: 'ships every relative target its exports map names [requires the registry]',
			observe: (context) => {
				const stage = suite.read(context)
				const relative = stage.targets.filter((target) => target.startsWith('./'))
				return {
					actual: {
						populated: relative.length > 0,
						missing: relative.filter((target) => !existsSync(join(stage.installed, target))),
					},
					expected: { populated: true, missing: [] },
				}
			},
		},
		{
			label: 'declares types for every module it publishes [requires the registry]',
			observe: (context) => {
				const stage = suite.read(context)
				const partitioned = [
					...stage.entries.map((entry) => entry.subpath),
					...stage.undeclared,
					...stage.excluded,
				]
				return {
					actual: {
						undeclared: stage.undeclared,
						partitioned: partitioned.sort(),
						unreachable: stage.entries
							.filter((entry) => !entry.importable && !entry.requirable && !entry.browsable)
							.map((entry) => entry.subpath),
						untypable: filterDistributionUntypable(stage.entries, stage.installed).map(
							(entry) => entry.subpath,
						),
					},
					expected: {
						undeclared: [],
						partitioned: [...stage.subpaths].sort(),
						unreachable: [],
						untypable: [],
					},
				}
			},
		},
		{
			label: 'refuses a subpath its exports map does not name [requires the registry]',
			observe: (context) => {
				const stage = suite.read(context)
				const name = readDistributionManifestName(join(stage.installed, 'package.json'))
				const result = runDistributionNode(
					[join(stage.consumer, DISTRIBUTION_ESM_DRIVER), \`\${name}\${DISTRIBUTION_ABSENT_SUBPATH}\`],
					stage.consumer,
				)
				return {
					actual: {
						refused: result.status !== 0,
						coded: readDistributionOutput(result).includes('ERR_PACKAGE_PATH_NOT_EXPORTED'),
					},
					expected: { refused: true, coded: true },
				}
			},
		},
		{
			label: 'compiles a consumer under every module resolution [requires the registry]',
			observe: (context) => {
				const stage = suite.read(context)
				const name = readDistributionManifestName(join(stage.installed, 'package.json'))
				const readings = DISTRIBUTION_RESOLUTIONS.flatMap((driver) =>
					DISTRIBUTION_FORMATS.flatMap(([extension, format]) => {
						const written = filterDistributionEntries(stage.entries, driver.conditions[format])
						if (written.length === 0) return []
						const label = \`\${driver.label}.\${extension}\`
						const probe = \`probe.\${label}\`
						const specifiers = written.map((entry) => entry.specifier)
						writeDistributionConsumerProbe(stage, probe, specifiers)
						const project = writeDistributionProject(stage, probe, driver, [\`./\${probe}\`])
						const messages = checkDistributionProject(stage, project).map(
							(message) => \`\${label}: \${message}\`,
						)
						const control = \`control.\${label}\`
						writeDistributionConsumerProbe(stage, control, [
							\`\${name}\${DISTRIBUTION_ABSENT_SUBPATH}\`,
						])
						const refused = writeDistributionProject(stage, control, driver, [\`./\${control}\`])
						return [
							{
								messages,
								silent: checkDistributionProject(stage, refused).length === 0 ? [label] : [],
							},
						]
					}),
				)
				return {
					actual: {
						messages: readings.flatMap(({ messages }) => messages),
						silent: readings.flatMap(({ silent }) => silent),
					},
					expected: { messages: [], silent: [] },
				}
			},
		},
		{
			label: 'publishes what it declares to a Node import, and no more',
			observe: (context) => {
				const stage = suite.read(context)
				const entries = stage.entries.filter((entry) => entry.importable)
				if (entries.length === 0) return context.skip('No installed entry supports Node import')
				const readings = entries.map((entry) => {
					if (!entry.declaration.importable)
						throw new Error(\`\${entry.subpath} publishes no import declaration\`)
					const published = driveDistributionRuntime(
						stage,
						entry.specifier,
						DISTRIBUTION_ESM_DRIVER,
					)
					const drivers = filterDistributionResolutions(entry, 'module')
					return {
						entry: entry.subpath,
						driven: drivers.length > 0,
						reported: drivers.flatMap((driver) =>
							checkDistributionSurface(stage, { entry, extension: 'ts', published, driver }),
						),
					}
				})
				return {
					actual: readings,
					expected: entries.map((entry) => ({ entry: entry.subpath, driven: true, reported: [] })),
				}
			},
		},
		{
			label: 'publishes what it declares to a Node require, and no more',
			observe: (context) => {
				const stage = suite.read(context)
				const entries = stage.entries.filter((entry) => entry.requirable)
				if (entries.length === 0) return context.skip('No installed entry supports Node require')
				const readings = entries.map((entry) => {
					if (!entry.declaration.requirable)
						throw new Error(\`\${entry.subpath} publishes no require declaration\`)
					const published = driveDistributionRuntime(
						stage,
						entry.specifier,
						DISTRIBUTION_CJS_DRIVER,
					)
					const drivers = filterDistributionResolutions(entry, 'commonjs')
					return {
						entry: entry.subpath,
						driven: drivers.length > 0,
						reported: drivers.flatMap((driver) =>
							checkDistributionSurface(stage, { entry, extension: 'cts', published, driver }),
						),
					}
				})
				return {
					actual: readings,
					expected: entries.map((entry) => ({ entry: entry.subpath, driven: true, reported: [] })),
				}
			},
		},
	]
}
`,
			proof: `import {
	// These exports remain available to proofs emitted by earlier scaffold releases.
	buildDistributionCases,
	{{import}}createDistributionSuite,
} from './setupDistribution.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const DISTRIBUTION_SUITE = createDistributionSuite()

beforeAll(() => DISTRIBUTION_SUITE.start())

afterAll(() => DISTRIBUTION_SUITE.destroy())

describe('installed package consumer', () => {
	for (const row of buildDistributionCases(DISTRIBUTION_SUITE)) {
		it(\`\${row.label}\`, async (context) => {
			const observation = await row.observe(context)
			expect(observation.actual).toStrictEqual(observation.expected)
		})
	}
{{guard}}{{drive}}})
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
			import: 'checkDistributionBrowser,\n\t',
			helpers: `/** Defines the page that loads a bundled browser consumer. */
export const DISTRIBUTION_BROWSER_PAGE = \`<!doctype html>
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

/**
 * Infers the response media type from a bundle filename.
 *
 * @param path - The requested bundle path.
 * @returns The media type, defaulting to application/octet-stream.
 */
export function inferDistributionContentType(path: string): string {
	if (path.endsWith('.html')) return 'text/html'
	if (path.endsWith('.js')) return 'text/javascript'
	if (path.endsWith('.css')) return 'text/css'
	if (path.endsWith('.json') || path.endsWith('.map')) return 'application/json'
	return 'application/octet-stream'
}

// \`resolveBrowser\` answers with provider options and never reports absence: its
// last resort is a channel nothing verified. So the launch is attempted and its
// rejection classified, rather than probed for and ruled on.
/**
 * Renders the browser endpoint selected by provider options.
 *
 * @param options - The browser provider options.
 * @returns The endpoint, executable, channel, or bundled-browser description.
 */
export function renderDistributionBrowser(options: PlaywrightProviderOptions): string {
	const endpoint = options.connectOptions?.wsEndpoint
	if (endpoint !== undefined) return \`the browser server at \${endpoint}\`
	const executable = options.launchOptions?.executablePath
	if (executable !== undefined) return \`the executable at \${executable}\`
	const channel = options.launchOptions?.channel
	if (channel !== undefined) return \`the \${channel} channel\`
	return 'the Chromium Playwright installed for itself'
}

/**
 * Launches or connects to the selected Chromium browser.
 *
 * @param options - The browser provider options.
 * @returns The real browser. Rejects when the selected browser is unavailable.
 */
export async function launchDistributionBrowser(
	options: PlaywrightProviderOptions,
): Promise<Browser> {
	const endpoint = options.connectOptions?.wsEndpoint
	if (endpoint !== undefined) return chromium.connect(endpoint)
	return chromium.launch({ ...options.launchOptions, headless: true })
}

// A consumer of one installed browser entry, bundled by the Vite toolchain this
// workspace already declares. Nothing is stubbed: the bundle resolves the installed
// package and its whole transitive graph as an application consuming it would.
/**
 * Bundles a browser consumer against an installed public entry.
 *
 * @param stage - The installed consumer.
 * @param entry - The browser publication.
 * @returns The bundle directory. Rejects when Vite cannot build the consumer.
 */
export async function bundleDistributionEntry(
	stage: DistributionStage,
	entry: DistributionEntry,
): Promise<string> {
	const page = join(stage.consumer, 'pages', entry.subpath.replaceAll(/[^\\w]+/gu, '-'))
	const specifier = JSON.stringify(entry.specifier)
	writeDistributionFile(join(page, 'index.html'), DISTRIBUTION_BROWSER_PAGE)
	writeDistributionFile(
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
/**
 * Reads the names a real browser publishes from a served bundle.
 *
 * @param browser - The browser to drive.
 * @param bundle - The built consumer directory.
 * @returns The exported names. Rejects on a page error or an invalid name list.
 */
export async function readDistributionBrowserExports(
	browser: Browser,
	bundle: string,
): Promise<readonly string[]> {
	const server = createServer((request, response) => {
		const asked = request.url === undefined || request.url === '/' ? '/index.html' : request.url
		const path = join(bundle, decodeURIComponent(asked))
		if (!path.startsWith(bundle) || !existsSync(path)) {
			response.writeHead(404)
			response.end()
			return
		}
		response.writeHead(200, { 'content-type': inferDistributionContentType(path) })
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
		if (!isDistributionNames(published))
			throw new Error('The bundled module published no name list')
		return published
	} finally {
		server.close()
	}
}
/**
 * Checks each browser publication against its installed declarations in a real browser.
 * @param stage - The installed consumer to drive.
 * @param context - The proof context that reports unavailable browser prerequisites.
 * @returns The compiler diagnostics each browser publication reports.
 */
export async function checkDistributionBrowser(
	stage: DistributionStage,
	context: TestContext,
): Promise<readonly string[]> {
	const driver = DISTRIBUTION_BROWSER_RESOLUTION
	if (driver === undefined) throw new Error("DISTRIBUTION_RESOLUTIONS carries no 'bundler' row")
	const entries = stage.entries.filter((entry) => entry.browsable)
	if (entries.length === 0) return context.skip('No installed entry supports a browser')
	const readings: Array<readonly string[]> = []
	for (const entry of entries) {
		if (!entry.declaration.browsable) {
			throw new Error(\`\${entry.subpath} publishes no browser declaration\`)
		}
		const options = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)
		const browser = await launchDistributionBrowser(options).catch((error: unknown) => {
			const cause = \`\${renderDistributionBrowser(options)} was rejected: \${String(error)}\`
			if (DISTRIBUTION_RELEASE) throw new Error(\`The release gate requires a browser, and \${cause}\`)
			return context.skip(\`No browser launched. \${cause}\`)
		})
		try {
			const bundle = await bundleDistributionEntry(stage, entry)
			const published = await readDistributionBrowserExports(browser, bundle)
			// A browser consumer reads the installed declarations through a bundler, so
			// that is the one driver this face answers under.
			const reported = checkDistributionSurface(stage, {
				entry,
				extension: 'ts',
				published,
				driver,
			})
			readings.push(reported)
		} finally {
			await browser.close()
		}
	}
	return readings.flat()
}
`,
			drive: `	it('publishes what it declares to a real browser [requires a browser]', async (context) => {
		expect(await checkDistributionBrowser(DISTRIBUTION_SUITE.read(context), context)).toStrictEqual(
			[],
		)
	})
`,
			guard: `	it('publishes no browser face this proof cannot drive [requires the registry]', (context) => {
		const faces = DISTRIBUTION_SUITE.read(context).entries.filter((entry) => entry.browsable)
		expect(faces.map((entry) => entry.subpath)).toStrictEqual([])
	})
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
		agents: `# AGENTS.md

The \`@orkestrel/scaffold\` package is this repository's coding and orchestration authority. This
file points at it and states no law of its own.

Read these before working: the \`AGENTS.md\` coding contract, the \`.agents/orchestration.md\`
agent-operation contract, every applicable rule the contract's rule map names under
\`.claude/rules/\`, and the dispatch-named skill under \`.agents/skills/\` with the references it
requires.

Resolve every one of those paths against scaffold, never against this repository:

- When a scaffold checkout sits beside this repository, read \`../scaffold/AGENTS.md\`, the
  \`../scaffold/.agents/orchestration.md\` file, the \`../scaffold/.claude/rules/\` directory, and
  the \`../scaffold/.agents/skills/\` directory.
- Otherwise read the installed copy, whose paths drop the dot that opens each segment: the
  \`node_modules/@orkestrel/scaffold/dist/host/AGENTS.md\` file, the
  \`node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md\` file, the
  \`node_modules/@orkestrel/scaffold/dist/host/claude/rules/\` directory, and the
  \`node_modules/@orkestrel/scaffold/dist/host/agents/skills/\` directory.

Every path a scaffold-supplied file names resolves the same way. Run a script such a file names
through its built twin: replace \`node .agents/skills/\` with
\`node node_modules/@orkestrel/scaffold/dist/agents/skills/\` and the \`.ts\` extension with \`.js\`,
because Node runs no \`.ts\` file under \`node_modules\`. The files this repository carries
— the \`.claude/agents/orkestrel.md\` catalog file, the \`.claude/settings.json\` permission file,
the bench scripts under \`scripts/\`, and the skill pointers under \`.agents/skills/\` and
\`.claude/skills/\`, which name the canonical skills and how to run their scripts — are this
repository's own copies and resolve here.

In Claude Code, also read the Claude bridge: \`../scaffold/.claude/AGENTS.md\` beside a checkout, or
\`node_modules/@orkestrel/scaffold/dist/host/claude/AGENTS.md\` from the installed copy. Keep no
\`CLAUDE.md\` in this repository; one stops Claude Code from reading this file.

Edit none of the scaffold-owned files here. The \`scaffold repair\` command restores them, so a
change to one is a commit in the scaffold repository followed by a release.
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
		skill: `
# Load the canonical skill

This file is a pointer the \`@orkestrel/scaffold\` package writes into every fleet workspace; the
skill itself ships with that package. Read the canonical \`SKILL.md\` completely and follow it:

- beside a scaffold checkout, \`../scaffold/.agents/skills/{{name}}/SKILL.md\`;
- otherwise, \`node_modules/@orkestrel/scaffold/dist/host/agents/skills/{{name}}/SKILL.md\`.

Resolve every path the canonical skill names against the same root; under \`node_modules\` each
segment drops its opening dot. Run a script the skill names through its built twin, as this
repository's \`AGENTS.md\` states. This pointer carries no process of its own; \`AGENTS.md\`, the applicable
rules, and the canonical skill remain authoritative in that order.
`,
		service: `#!/usr/bin/env sh
set -eu

printf '%s\\n' \\
{{vendors}}
`,
	}),
})
