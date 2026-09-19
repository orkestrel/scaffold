import { readFileSync, writeFileSync } from 'node:fs'

const path = 'vite.config.ts'
let source = readFileSync(path, 'utf8')

function splice(anchor, replacement, label) {
	if (!source.includes(anchor)) throw new Error('anchor missing: ' + label)
	if (source.indexOf(anchor) !== source.lastIndexOf(anchor)) {
		throw new Error('anchor not unique: ' + label)
	}
	source = source.replace(anchor, replacement)
	console.log('spliced:', label)
}

// 1. The journey declarations, ahead of the factory that reads JOURNEY_INCLUDE.
const declarationsAnchor = `// Merges a caller's override onto the configuration a factory declares, so a`
splice(
	declarationsAnchor,
	`/** Describes one journey variant: a color mode paired with the viewport it renders at. */
export interface JourneyVariant {
	readonly name: string
	readonly width: number
	readonly height: number
}

/**
 * Pairs a color mode with a viewport for one journey run.
 *
 * @remarks
 * This is the single declaration of the journey variants. Each becomes its own Vitest project,
 * and the integration suite reads the set from \`VITE_VARIANTS\` rather than repeating it.
 */
export const VARIANTS: readonly JourneyVariant[] = Object.freeze([
	Object.freeze({ name: 'light-1280', width: 1280, height: 800 }),
	Object.freeze({ name: 'dark-1280', width: 1280, height: 800 }),
	Object.freeze({ name: 'light-390', width: 390, height: 844 }),
	Object.freeze({ name: 'dark-390', width: 390, height: 844 }),
])

/** Names the suite every journey variant drives. */
export const JOURNEY_INCLUDE = 'tests/app/browser/integration.test.ts'

` + declarationsAnchor,
	'JourneyVariant, VARIANTS, JOURNEY_INCLUDE',
)

// 2. This workspace's own Sass and pre-bundling declarations on the browser configuration.
splice(
	`		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
		root: resolveWorkspacePath('app/browser'),`,
	`		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
		// Bootstrap reaches its partials through \`@import\`, calls the global built-in and colour
		// functions, and uses the deprecated \`if()\` form. This workspace cannot act on any of them —
		// its own entry already uses \`@use\` — and unsilenced they bury a warning that is actionable.
		// This is the set the build emits, not the set Bootstrap's Vite page documents: that page
		// predates \`if-function\`, which Dart Sass activated in 1.95.0, and lists \`mixed-decls\`, which
		// 5.3.8 no longer raises and Dart Sass has marked obsolete, so naming it raises its own warning.
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ['import', 'color-functions', 'global-builtin', 'if-function'],
				},
			},
		},
		optimizeDeps: {
			include: ['vue', 'bootstrap', '@popperjs/core', '@orkestrel/test', '@orkestrel/test/browser'],
		},
		root: resolveWorkspacePath('app/browser'),`,
	'appBrowser css.silenceDeprecations and optimizeDeps.include',
)

// 3. The exclusion that leaves the journey suite to its own projects.
splice(
	`			include: ['tests/app/browser/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],`,
	`			include: ['tests/app/browser/**/*.test.ts'],
			// Every journey variant owns its own project, so the shared browser project
			// leaves that suite alone rather than running its default variant a fifth time.
			exclude: [JOURNEY_INCLUDE],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],`,
	'appBrowser exclude',
)

// 4. The journey factory, after the plan's own factories.
const exportAnchor = `export default defineConfig({`
splice(
	exportAnchor,
	`/**
 * Builds the Vitest project that drives every journey at one variant.
 *
 * @param variant - The color mode and viewport this project renders
 * @returns The project configuration, labelled by the variant name
 *
 * @remarks
 * The suite reads its own variant from \`VITE_VARIANT\` and the declared set from \`VITE_VARIANTS\`,
 * so the variants have one home here and the manifest needs no loop to enumerate them.
 *
 * A journey replaces the browser test block rather than passing it as an override, because
 * \`mergeOverride\` concatenates arrays: an override would add the journey suite beside the browser
 * include and keep the exclusion that leaves that suite out.
 *
 * @example
 * \`\`\`ts
 * journey({ name: 'light-1280', width: 1280, height: 800 })
 * \`\`\`
 */
export function journey(variant: JourneyVariant): UserConfig {
	const browser = appBrowser()
	return {
		...browser,
		test: {
			...browser.test,
			name: { label: \`journey:\${variant.name}\`, color: 'green' },
			include: [JOURNEY_INCLUDE],
			exclude: [],
			// \`provide\` is the per-project channel. \`define\` would not do: it substitutes at
			// transform time, and these projects share one module graph, so the last project's
			// value would reach every one of them.
			provide: { variant: variant.name, variants: VARIANTS },
		},
	}
}

` + exportAnchor,
	'journey factory',
)

// 5. The fan-out registration.
splice(
	`		projects: [appCore, appBrowser, policy, config, setup, conformance, probe],`,
	`		projects: [
			appCore,
			appBrowser,
			...VARIANTS.map((variant) => () => journey(variant)),
			policy,
			config,
			setup,
			conformance,
			probe,
		],`,
	'projects fan-out spread',
)

writeFileSync(path, source)
console.log('wrote', path)
