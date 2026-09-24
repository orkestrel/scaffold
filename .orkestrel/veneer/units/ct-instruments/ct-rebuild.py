"""Replays every shared and unscoped edit of the THEME unit onto a fresh 2bf1142 extract.

Run from the scratch copy's root (tmp/probe/ct-copy). The guide edits run through ct-guide.py and
ct-guide-2.py, with the prose corrections between them replayed here, and the formatter runs on each
touched file where the unit ran it. Every site must be found exactly once, or the replay stops. The
owned files are copied in from the worktree afterwards, so this script writes none of them.
"""

import subprocess
import sys

UNITS = '../../units'


def edit(path, pairs):
    text = open(path).read()
    for old, new in pairs:
        count = text.count(old)
        if count != 1:
            sys.exit(f'{path}: site found {count} times: {old[:100]!r}')
        text = text.replace(old, new, 1)
    open(path, 'w').write(text)


def fmt(*paths):
    subprocess.run(['npx', 'oxfmt', '--config', '.oxfmtrc.json', *paths], check=True, capture_output=True)


# app/browser/constants.ts
def island(mode, stem, words, inner):
    return (
        f'<div class="bg-body text-body border rounded p-3" data-bs-theme="{mode}">'
        f'<p class="mb-2">{words}</p>'
        f'<div class="d-flex flex-wrap align-items-center gap-2 mb-2">'
        f'<button class="btn btn-outline-secondary" type="button">{stem} action</button>'
        f'<select class="form-select w-auto" aria-label="{stem} berth"><option>{stem} berth 4</option></select>'
        f'<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" aria-label="{stem} alerts"></div>'
        f'<nav class="navbar" aria-label="{stem} bar"><button class="navbar-toggler" type="button" aria-label="Toggle the {stem.lower()} bar links"><span class="navbar-toggler-icon"></span></button></nav>'
        f'</div>'
        f'<div class="accordion mb-2"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" aria-expanded="false">{stem} manifest</button></h2></div></div>'
        f'{inner}</div>'
    )


inner = island('light', 'Nested', 'Nested light island: the berth list reads in the light closure again.', '')
dark = island('dark', 'Island', 'Dark island: every token beneath this attribute takes its dark value.', inner)
outer = island('light', 'Surface', 'Light surface: the page closure every island sits on.', dark)
constants = open('app/browser/constants.ts').read()
constants = constants.rstrip('\n') + '\n' + """
/** Holds the Color modes section's visible copy and accessible name. */
export const COLOR_MODE_COPY = Object.freeze({
	region: 'Color modes',
	paragraph:
		'Compare one set of controls on a light surface, in a dark island inside it, and in a light island nested in the dark one, each mode set by the data-bs-theme attribute in markup.',
})

/**
 * Lists the color mode specimens the section renders, in render order.
 *
 * @remarks
 * The specimen nests the surfaces, so a frame of it shows each mode beside the others. Each
 * surface declares its own mode, so the specimen renders the same arrangement whichever mode the
 * page is in. Each carries body text, a button, a select, a switch, a navbar toggler, and an
 * accordion button: the select's caret, the unchecked switch's knob, the toggler's icon, and the
 * accordion's chevron are the images the release retunes on a dark component rule, and a surface
 * paints its own fill and text through the body utilities, because the mode attribute retunes
 * tokens and paints nothing.
 */
export const COLOR_MODE_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
	Object.freeze({
		name: 'Nested islands',
		markup:
			'%s',
	}),
])
""" % outer
open('app/browser/constants.ts', 'w').write(constants)

# app/browser/Showcase.ts and app/browser/index.ts
edit('app/browser/Showcase.ts', [
    ("import { ColorSection } from './sections/ColorSection.js'\n", "import { ColorModeSection } from './sections/ColorModeSection.js'\nimport { ColorSection } from './sections/ColorSection.js'\n"),
    ('\t\t\tnew NavbarSection(this.#main),\n\t\t]', '\t\t\tnew NavbarSection(this.#main),\n\t\t\tnew ColorModeSection(this.#main),\n\t\t]'),
])
edit('app/browser/index.ts', [
    ("export * from './sections/NavbarSection.js'\n", "export * from './sections/NavbarSection.js'\nexport * from './sections/ColorModeSection.js'\n"),
])

# tests/app/browser
edit('tests/app/browser/Showcase.test.ts', [
    ('\tCLOSE_SPECIMENS,\n', '\tCLOSE_SPECIMENS,\n\tCOLOR_MODE_SPECIMENS,\n'),
    ("\t\t\t\t'Interaction',\n\t\t\t\t'Navbar',\n\t\t\t])", "\t\t\t\t'Interaction',\n\t\t\t\t'Navbar',\n\t\t\t\t'Color modes',\n\t\t\t])"),
    ('\t\t\t\t\t...INTERACTION_SPECIMENS,\n\t\t\t\t\t...NAVBAR_SPECIMENS,\n\t\t\t\t].map', '\t\t\t\t\t...INTERACTION_SPECIMENS,\n\t\t\t\t\t...NAVBAR_SPECIMENS,\n\t\t\t\t\t...COLOR_MODE_SPECIMENS,\n\t\t\t\t].map'),
])
edit('tests/app/browser/index.test.ts', [
    ("\t\t\t'COLOR_COPY',\n", "\t\t\t'COLOR_COPY',\n\t\t\t'COLOR_MODE_COPY',\n\t\t\t'COLOR_MODE_SPECIMENS',\n"),
    ("\t\t\t'CollapseSection',\n", "\t\t\t'CollapseSection',\n\t\t\t'ColorModeSection',\n"),
])
edit('tests/app/browser/integration.test.ts', [
    ('\tCOLLAPSE_SPECIMENS,\n\tCONTENT_SPECIMENS,\n', '\tCOLLAPSE_SPECIMENS,\n\tCOLOR_MODE_SPECIMENS,\n\tCONTENT_SPECIMENS,\n'),
    ('\t\t\t\tNAVBAR_SPECIMENS,\n\t\t\t\tOFFCANVAS_SPECIMENS,\n\t\t\t\tPAGINATION_SPECIMENS,\n\t\t\t\tBUTTON_GROUP_SPECIMENS,', '\t\t\t\tNAVBAR_SPECIMENS,\n\t\t\t\tCOLOR_MODE_SPECIMENS,\n\t\t\t\tOFFCANVAS_SPECIMENS,\n\t\t\t\tPAGINATION_SPECIMENS,\n\t\t\t\tBUTTON_GROUP_SPECIMENS,'),
])

# tests/setup.ts
edit('tests/setup.ts', [
    ("\t| 'Navbar with offcanvas'\n", "\t| 'Navbar with offcanvas'\n\t| 'Nested islands'\n"),
    ("""		selector: '.navbar-expand-lg .offcanvas',
		property: 'position',
	}),
""", """		selector: '.navbar-expand-lg .offcanvas',
		property: 'position',
	}),
	Object.freeze({
		scenario: 'nested-islands',
		subject: 'Nested islands',
		selector: ".bg-body[data-bs-theme='dark']",
		property: 'color-scheme',
	}),
"""),
    (""" * A key whose recorded rule clips its element to one pixel names the element's positioned host""", """ * The theme key's frame is the `Nested islands` specimen: a light surface holding a dark island
 * that holds a light island. Its row names the dark island and reads the island's `color-scheme`
 * property, which the theme key's mode scope sets, and the frame covers the whole specimen, so it
 * shows each mode beside the others. Each surface declares its own mode, so the specimen renders
 * the same arrangement in the light and the dark page mode.
 *
 * A key whose recorded rule clips its element to one pixel names the element's positioned host"""),
])

# tests/conformance.test.ts
edit('tests/conformance.test.ts', [
    ("\t\t\t'text-truncate',\n", "\t\t\t'text-truncate',\n\t\t\t'theme',\n"),
    ("""	it('carries every shipped component selector, custom property, and recorded animation in the built cascade', () => {""", """	it('reports an omitted dark component rule the theme key records even when its component ships', () => {
		const cascade = readBuiltCascade()
		const selector = '[data-bs-theme=dark] .navbar-toggler-icon'
		expect(cascade).toContain(selector)
		expect(
			scanCompatibilityPresence(
				readCompatibility(),
				readOracleInventory(),
				readDeferrals(),
				cascade.replaceAll(selector, '[data-bs-theme=dark] .omitted-toggler-icon'),
			),
		).toContain(selector)
	})
	it('carries every shipped component selector, custom property, and recorded animation in the built cascade', () => {"""),
    ("""	const additions = scanLedgerDrift(measured.additions, recorded, describeAddition)
""", """	const additions = scanLedgerDrift(measured.additions, recorded, describeAddition)
	// The theme key records the dark caret, knob, toggler icon, and chevrons each component's own
	// partial declares under a dark selector, so a value planted on those rules reads as a theme
	// departure after the key ships, and as nothing while it is withheld, whatever partial writes it.
	const dark = [
		['[data-bs-theme=dark] .form-select', '--bs-form-select-bg-img'],
		[
			'[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)',
			'--bs-form-switch-bg',
		],
		['[data-bs-theme=dark] .navbar-toggler-icon', '--bs-navbar-toggler-icon-bg'],
		['[data-bs-theme=dark] .accordion-button::after', '--bs-accordion-btn-icon'],
		['[data-bs-theme=dark] .accordion-button::after', '--bs-accordion-btn-active-icon'],
	]
	const repainted = `${cascade}\\n@layer components { ${dark.map(([selector, property]) => `${selector} { ${property}: none }`).join(' ')} }\\n`
	const darkened = [shipped, shipped.filter((key) => key !== 'theme')].map((keys) =>
		scanLedgerDrift(
			collectLedger(repainted, inventory, keys).departures,
			readDepartures(),
			describeDeparture,
		).unrecorded.map((line) => line.split(' | ').slice(0, 3).join(' | ')),
	)
"""),
    ("""	it('records every measured value difference in the guide ledger', () => {""", """	it('measures the dark component rules under the theme key, and leaves them unmeasured while it is withheld', () => {
		expect(darkened).toEqual([
			dark.map(([selector, property]) => `theme | ${selector} | ${property}`),
			[],
		])
		expect(departures.unrecorded).toEqual([])
	})

	it('records every measured value difference in the guide ledger', () => {"""),
])

# tests/setupStyles.ts
edit('tests/setupStyles.ts', [
    ("""export const COMPONENT_DARK_ASSETS: readonly string[] = Object.freeze([
	'--bs-form-select-bg-img',
	'--bs-form-switch-bg',
	'--bs-accordion-btn-icon',
	'--bs-accordion-btn-active-icon',
	'--bs-navbar-toggler-icon-bg',
])
""", """export const COMPONENT_DARK_ASSETS: readonly string[] = Object.freeze([
	'--bs-form-select-bg-img',
	'--bs-form-switch-bg',
	'--bs-accordion-btn-icon',
	'--bs-accordion-btn-active-icon',
	'--bs-navbar-toggler-icon-bg',
])

/**
 * Records the secondary fill the release paints in a dark island and the dark page it paints on.
 *
 * @remarks
 * The release declares the `--bs-secondary` variable at the document scope alone, so its dark
 * island paints the same `#6c757d` fill it paints in light, over the `--bs-body-bg` value its dark
 * scope declares. The `tests/setupStyles.test.ts` proof reads the fill and the page back from the
 * installed stylesheet, and the `tests/src/styles/theme.test.ts` proof holds the dark secondary
 * role to this fill and to at least the contrast this pair gives.
 */
export const THEME_SECONDARY_CASE = Object.freeze({ fill: '#6c757d', page: '#212529' })

/**
 * Records the tiers the release gives its `light` and `dark` roles in each mode.
 *
 * @remarks
 * Each row is a role, a mode, a tier, and the value the release declares for that tier's alias:
 * the `subtle` tier answers `--bs-{role}-bg-subtle`, the `emphasis` tier answers
 * `--bs-{role}-text-emphasis`, and the `border` tier answers `--bs-{role}-border-subtle`. The
 * release writes these roles' tiers from the gray ramp rather than from the mix its other roles
 * take, because each role's fill sits beside the surface or the text. The
 * `tests/setupStyles.test.ts` proof reads every value back from the installed stylesheet's
 * document scope and dark scope, and the `tests/src/styles/theme.test.ts` proof resolves each
 * Veneer tier against it.
 */
export const THEME_GRAY_TIERS: ReadonlyArray<
	readonly [role: string, mode: string, tier: string, value: string]
> = Object.freeze([
	Object.freeze(['light', 'light', 'emphasis', '#495057'] as const),
	Object.freeze(['light', 'light', 'subtle', '#fcfcfd'] as const),
	Object.freeze(['light', 'light', 'border', '#e9ecef'] as const),
	Object.freeze(['dark', 'light', 'emphasis', '#495057'] as const),
	Object.freeze(['dark', 'light', 'subtle', '#ced4da'] as const),
	Object.freeze(['dark', 'light', 'border', '#adb5bd'] as const),
	Object.freeze(['light', 'dark', 'emphasis', '#f8f9fa'] as const),
	Object.freeze(['light', 'dark', 'subtle', '#343a40'] as const),
	Object.freeze(['light', 'dark', 'border', '#495057'] as const),
	Object.freeze(['dark', 'dark', 'emphasis', '#dee2e6'] as const),
	Object.freeze(['dark', 'dark', 'subtle', '#1a1d20'] as const),
	Object.freeze(['dark', 'dark', 'border', '#343a40'] as const),
])

/**
 * Records the resting and hover link colors the release declares in each mode.
 *
 * @remarks
 * The release shades its light link 20% toward black on hover and tints its dark link 20% toward
 * white. The `tests/setupStyles.test.ts` proof reads each pair back from the installed
 * stylesheet's document scope and dark scope, and the `tests/src/styles/theme.test.ts` proof
 * holds each mode's hover to the release's direction and to at least the contrast step this pair
 * gives.
 */
export const THEME_LINK_CASES = Object.freeze([
	Object.freeze({ mode: 'light', rest: '#0d6efd', hover: '#0a58ca' } as const),
	Object.freeze({ mode: 'dark', rest: '#6ea8fe', hover: '#8bb9fe' } as const),
])
"""),
    ("\tObject.freeze(['secondary', 'dark', 'base', 'oklch(0.446 0.043 257.281)'] as const),\n", ''),
    ("\tObject.freeze(['secondary', 'dark', 'subtle', 'oklab(0.2454 -0.00409333 -0.0170135)'] as const),\n", ''),
    ("\tObject.freeze(['secondary', 'dark', 'emphasis', 'oklab(0.5909 -0.00760306 -0.0331373)'] as const),\n", ''),
    ("\tObject.freeze(['secondary', 'dark', 'border', 'oklab(0.3405 -0.00630614 -0.0272793)'] as const),\n", ''),
    (""" * `information` is the Elements name of the role Bootstrap calls `info`. The `light` and `dark`
 * roles Bootstrap names have no Elements specimen, so no row measures them and their tiers follow
 * the same expressions unmeasured.
 */""", """ * `information` is the Elements name of the role Bootstrap calls `info`. The `light` and `dark`
 * roles Bootstrap names have no Elements specimen, so no row measures them and their tiers follow
 * the same expressions unmeasured. The dark secondary fill is the release's rather than Elements',
 * because Elements' slate reads about 2.3 to 1 against the dark canvas, so no row measures the
 * dark secondary tiers either; the `tests/src/styles/theme.test.ts` proof reads that fill against
 * the release's own.
 */"""),
    ("""/**
 * Names the dark-scope variables Veneer declares that Bootstrap does not retune in dark.
 *
 * @remarks
 * Bootstrap's primary fill is one color in light and in dark, so Bootstrap retunes neither the
 * fill, its channel triplet, nor the focus ring built from it. Veneer's primary does retune, and
 * a custom property carries its `var()` references already substituted, so each of these must be
 * re-declared inside every scope that selects a mode.
 */
export const THEME_DARK_ADDITIONS: readonly string[] = Object.freeze([
	'--bs-focus-ring-color',
	'--bs-primary',
	'--bs-primary-rgb',
])""", """/**
 * Names the dark-scope variables Veneer declares that Bootstrap does not retune in dark.
 *
 * @remarks
 * Bootstrap's primary and secondary fills are one color each in light and in dark, so Bootstrap
 * retunes neither fill, its channel triplet, nor the focus ring built from the primary. Veneer's
 * primary and secondary do retune, and a custom property carries its `var()` references already
 * substituted, so each of these must be re-declared inside every scope that selects a mode.
 */
export const THEME_DARK_ADDITIONS: readonly string[] = Object.freeze([
	'--bs-focus-ring-color',
	'--bs-primary',
	'--bs-primary-rgb',
	'--bs-secondary',
	'--bs-secondary-rgb',
])"""),
    ("""	Object.freeze([
		'secondary',
		'dark',
		'oklch(0.446 0.043 257.281)',
		'color(srgb 0.35843 0.414009 0.493312)',
		'color(srgb 0.431336 0.480599 0.55089)',
		'oklab(0.7 -0.0902723 -0.119795 / 0.45)',
	] as const),""", """	Object.freeze([
		'secondary',
		'dark',
		'rgb(108, 117, 125)',
		'color(srgb 0.492706 0.523765 0.551373)',
		'color(srgb 0.550353 0.577882 0.602353)',
		'oklab(0.7 -0.0902723 -0.119795 / 0.45)',
	] as const),"""),
    (""" * The role readings are transcribed from Elements run 6; light and dark retain Bootstrap gray fills.
 */""", """ * The role readings are transcribed from Elements run 6; light and dark retain Bootstrap gray fills,
 * and the dark secondary row reads the release's gray fill the dark scope takes in place of
 * Elements' slate.
 */"""),
    ("""	Object.freeze([
		'secondary',
		'dark',
		'white',
		Object.freeze([
			7.563537438028161, 5.5363095204346084, 4.325054548528514, 7.563537438028161,
			4.325054548528514,
		] as const),
	] as const),""", """	Object.freeze([
		'secondary',
		'dark',
		'white',
		Object.freeze([
			4.689301797380369, 3.7170327165791863, 3.0969457800207363, 4.689301797380369,
			3.0969457800207363,
		] as const),
	] as const),"""),
    ("""			hover:
				mode === 'light'
					? 'color(srgb 0.0407929 0.170295 0.538144)'
					: 'color(srgb 0.248988 0.580565 0.745237)',""", """			hover:
				mode === 'light'
					? 'color(srgb 0.0331634 0.138386 0.437272)'
					: 'color(srgb 0.552338 0.821735 0.955544)',"""),
])

# tests/setupStyles.test.ts
edit('tests/setupStyles.test.ts', [
    ("\t\t\t\t'THEME_DARK_ADDITIONS',\n\t\t\t\t'TOAST_CLOSE_GEOMETRY',", "\t\t\t\t'THEME_DARK_ADDITIONS',\n\t\t\t\t'THEME_GRAY_TIERS',\n\t\t\t\t'THEME_LINK_CASES',\n\t\t\t\t'THEME_SECONDARY_CASE',\n\t\t\t\t'TOAST_CLOSE_GEOMETRY',"),
    ('\tTHEME_DARK_ADDITIONS,\n\tTOAST_CLOSE_GEOMETRY,', '\tTHEME_DARK_ADDITIONS,\n\tTHEME_GRAY_TIERS,\n\tTHEME_LINK_CASES,\n\tTHEME_SECONDARY_CASE,\n\tTOAST_CLOSE_GEOMETRY,'),
    ("""	it('names the Veneer dark additions outside the Bootstrap dark scope and inside its root scope', () => {""", """	it('reads the release secondary and link cases back from the installed stylesheet', () => {
		const cascade = readBootstrapCascade()
		const root = new Map(extractBootstrapVariables(cascade, 'root'))
		const dark = new Map(extractBootstrapVariables(cascade, 'dark'))
		// The dark scope declares no secondary fill, so a dark island paints the document's.
		expect(dark.has('--bs-secondary')).toBe(false)
		expect(THEME_SECONDARY_CASE).toEqual({
			fill: root.get('--bs-secondary'),
			page: dark.get('--bs-body-bg'),
		})
		expect(THEME_LINK_CASES).toEqual([
			{ mode: 'light', rest: root.get('--bs-link-color'), hover: root.get('--bs-link-hover-color') },
			{ mode: 'dark', rest: dark.get('--bs-link-color'), hover: dark.get('--bs-link-hover-color') },
		])
		expect(Object.isFrozen(THEME_SECONDARY_CASE)).toBe(true)
		expect(Object.isFrozen(THEME_LINK_CASES)).toBe(true)
		expect(THEME_LINK_CASES.every((entry) => Object.isFrozen(entry))).toBe(true)
	})
	it('reads every light and dark role tier back from the installed stylesheet', () => {
		const cascade = readBootstrapCascade()
		const scopes = new Map([
			['light', new Map(extractBootstrapVariables(cascade, 'root'))],
			['dark', new Map(extractBootstrapVariables(cascade, 'dark'))],
		])
		const aliases = new Map([
			['subtle', 'bg-subtle'],
			['emphasis', 'text-emphasis'],
			['border', 'border-subtle'],
		])
		expect(
			THEME_GRAY_TIERS.map(([role, mode, tier]) => [
				role,
				mode,
				tier,
				scopes.get(mode)?.get(`--bs-${role}-${aliases.get(tier) ?? tier}`),
			]),
		).toEqual(THEME_GRAY_TIERS.map((row) => [...row]))
		// Every role, mode, and tier is named once, so a row dropped from the table reddens here.
		expect(
			[...new Set(THEME_GRAY_TIERS.map(([role, mode, tier]) => `${role} ${mode} ${tier}`))].sort(),
		).toEqual(
			['light', 'dark']
				.flatMap((role) =>
					['light', 'dark'].flatMap((mode) =>
						[...aliases.keys()].map((tier) => `${role} ${mode} ${tier}`),
					),
				)
				.sort(),
		)
		expect(Object.isFrozen(THEME_GRAY_TIERS)).toBe(true)
		expect(THEME_GRAY_TIERS.every((row) => Object.isFrozen(row))).toBe(true)
	})
	it('names the Veneer dark additions outside the Bootstrap dark scope and inside its root scope', () => {"""),
])

# The unscoped test files.
edit('tests/src/styles/components/button.test.ts', [
    ("			matchesColor(readStyle(button, 'color'), 'color(srgb 0.0407929 0.170295 0.538144)'),", "			matchesColor(readStyle(button, 'color'), 'color(srgb 0.0331634 0.138386 0.437272)'),"),
])
edit('tests/src/styles/elements/a.test.ts', [
    ('\t// The record measures the primary-over-canvas mix and its sRGB black hover mix.\n', '\t// The record measures the primary-over-canvas mix, and its hover mix toward black in light and\n\t// toward white in dark.\n'),
])
edit('tests/src/styles/components/alert.test.ts', [
    ("""	ALERT_SPACE_CASES,
	TEXT_MODES,
} from '../../../setupStyles.js'""", """	ALERT_SPACE_CASES,
	TEXT_MODES,
	THEME_GRAY_TIERS,
} from '../../../setupStyles.js'"""),
    ("""			const [text, fill, edge] = aliases
			const resolved = aliases.map((name) => readToken(island, name))
			// A variant reading another role's alias reddens here only where the two roles resolve
			// apart, so every other role is first held apart from this one on each alias the variant
			// reads, in the mode the island names.
			for (const other of ALERT_ROLES.filter((name) => name !== role))
				for (const [index, name] of aliases.entries())
					expect(
						matchesColor(readToken(island, name.replace(role, other)), resolved[index] ?? ''),
					).toBe(false)
""", """			const [text, fill, edge] = aliases
			const resolved = aliases.map((name) => readToken(island, name))
			// A variant reading another role's alias reddens here only where the two roles resolve
			// apart, so every other role is first held apart from this one on each alias the variant
			// reads, in the mode the island names. The release gives the light and dark roles one
			// text emphasis in light mode, so a pair the release itself writes alike is not held
			// apart; the retune that follows separates that routing.
			const release = new Map(
				THEME_GRAY_TIERS.filter(([, scope]) => scope === mode).map(([name, , tier, value]) => [
					`${name} ${tier}`,
					value,
				]),
			)
			const tiers = ['emphasis', 'subtle', 'border']
			expect(
				ALERT_ROLES.filter((name) => name !== role).flatMap((other) =>
					aliases.flatMap((name, index) =>
						release.get(`${role} ${tiers[index] ?? ''}`) !== undefined &&
						release.get(`${role} ${tiers[index] ?? ''}`) ===
							release.get(`${other} ${tiers[index] ?? ''}`)
							? []
							: matchesColor(readToken(island, name.replace(role, other)), resolved[index] ?? '')
								? [[other, name]]
								: [],
					),
				),
			).toEqual([])
"""),
])
fmt('tests/setupStyles.ts', 'tests/setupStyles.test.ts', 'tests/src/styles/components/alert.test.ts')

# guides/veneer.md: the round-1 script, the prose corrections, then the brief-2 script.
subprocess.run(['python3', f'{UNITS}/ct-guide.py'], check=True)
fmt('guides/veneer.md')
edit('guides/veneer.md', [
    ("document reads the light closure from `:root` until the `ColorMode` controller writes the\n`data-bs-theme` attribute on its root.", "document reads the light closure from the `:root` selector until the `ColorMode` controller writes\nthe `data-bs-theme` attribute on its root."),
    ('declared at `:root` alone, and every island inherits it from there.', 'declared at the `:root` selector alone, and every island inherits it from there.'),
    ('The Color modes region renders one specimen: a light surface holding a dark island that holds a\nnested light island.', 'The Color modes region renders the `Nested islands` specimen: a light surface holding a dark island\nthat holds a nested light island.'),
    ('and each name the light scope leaves to `:root` inside a\nnested island.', 'and each name the light scope leaves to the `:root` selector\ninside a nested island.'),
    ('The theme scopes declare `--bs-btn-close-filter` the same way,', 'The theme scopes declare the `--bs-btn-close-filter` variable the same way,'),
    ('Veneer declares each of them at `:root`\nalone, and a light island inherits each one from `:root` through every island around it,', 'Veneer declares each of them at the\n`:root` selector alone, and a light island inherits each one from that selector through every island\naround it,'),
    ('mode, so the specimen renders the same arrangement in both page modes.', 'mode, so the specimen renders the same arrangement in the light and the dark page mode.'),
    ('and records an alias reading a canonical token as\n`tokenized`.', 'and records an alias reading a canonical token as a\n`tokenized` row.'),
])
guide = open('guides/veneer.md').read()
old = 'an alias declared at `:root` alone keeps the light fill inside a dark island, so the dark scope declares it again'
if guide.count(old) != 2:
    sys.exit('the additions alias sentence is not found twice')
open('guides/veneer.md', 'w').write(guide.replace(old, 'an alias declared at the `:root` selector alone keeps the light fill inside a dark island, so the dark scope declares it again'))
fmt('guides/veneer.md')
edit('guides/veneer.md', [
    ("""way. Veneer's resting link is darker than the release's in light, so a 20% step there reads as no
step; at 35%, each mode's hover and resting colors differ by at least the contrast between the
release's own hover and resting colors.""", """way. Veneer's resting link is darker than the release's in light, so a 20% step there leaves the
hover closer to the resting color than the release's hover is to its own; at 35%, each mode's hover
and resting colors differ by at least the contrast between the release's own hover and resting
colors."""),
])
subprocess.run(['python3', f'{UNITS}/ct-guide-2.py'], check=True)
fmt('guides/veneer.md')
# The calibration remark the brief-2 row made false, corrected after the evidence runs.
edit('tests/setupStyles.ts', [
    (""" * roles Bootstrap names have no Elements specimen, so no row measures them and their tiers follow
 * the same expressions unmeasured. The dark secondary fill is the release's rather than Elements',
 * because Elements' slate reads about 2.3 to 1 against the dark canvas, so no row measures the
 * dark secondary tiers either; the `tests/src/styles/theme.test.ts` proof reads that fill against
 * the release's own.""", """ * roles Bootstrap names have no Elements specimen, so no row measures them; their tiers are the
 * release's gray steps, which the {@link THEME_GRAY_TIERS} constant records. The dark secondary
 * fill is the release's rather than Elements', because Elements' slate reads about 2.3 to 1 against
 * the dark canvas, so no row measures the dark secondary tiers either; the
 * `tests/src/styles/theme.test.ts` proof reads that fill against the release's own."""),
])
print('replayed')
