import { createStorage } from '@orkestrel/test/browser'
import type { JourneyVariant } from '@orkestrel/test'
import { afterAll, afterEach, beforeAll, describe, expect, inject, it } from 'vitest'
import { commands } from 'vitest/browser'
import { createRecorder, requireValue, waitForCondition, waitForText } from '@orkestrel/test'
import {
	build,
	buildCensus,
	buildContrast,
	buildEscapes,
	clearStorage,
	clickAccessible,
	createJournal,
	createPortfolio,
	describeFocus,
	describeTree,
	expandCaptures,
	extractStyles,
	fillAccessible,
	mount,
	readContrast,
	readCensus,
	readHit,
	readRefusal,
	waitForAnimations,
	readFrame,
	readPage,
	readPerception,
	readRootToken,
	readRing,
	readStates,
	resolveAccessible,
	resolveRendered,
	traverseAccessible,
	waitForFrame,
} from '@orkestrel/test/browser'
import {
	COPY,
	THEME_DARK,
	THEME_LIGHT,
	THEME_STORAGE,
	CONTACT_PATH,
	MAGAZINE_PATH,
	PAYMENT_PATH,
	SUBSCRIBE_PATH,
	buildName,
	hashHref,
	skuHref,
} from '@app/browser'
import type { MatrixControl, MatrixRole } from '../../setupBrowser.js'
import {
	COMMIT_CONTROL,
	ARRIVAL_CASES,
	EMPTY_CASES,
	MISSING_CASES,
	applyTheme,
	resizeViewport,
	readGradientContrast,
	CONTENT_CONTROL,
	HOME_HEADING,
	HOME_ROLES,
	LISTING_ROLES,
	MARK_CONTRAST,
	NOTICE_ROLES,
	REFUSED_ROLES,
	SELECTED_CONTROL,
	SHELL_ROLES,
	SIGN_IN_ABSENT,
	SUMMARY_CONTROL,
	TEXT_CONTRAST,
	UNINDEXED_SKU,
	UNSELECTED_CONTROL,
	clearSurface,
	closeSite,
	followSite,
	openSite,
	openSurface,
	readIsland,
	readThemeControl,
	waitForOrigin,
	readFileName,
	readOpeningTag,
	selectRole,
	startSubscription,
	toggleThemeControl,
} from '../../setupBrowser.js'

// Every screen a person reaches, in each data state a journey drives it to. A screen with no row
// here writes no frame, and a design review that cannot see a screen cannot judge it.
const STATES: readonly string[] = [
	'home',
	'navigation',
	'product-listing',
	'product-detail',
	'publications',
	'magazine-listing',
	'magazine-empty',
	'magazine-detail',
	'marketplace-listing',
	'marketplace-miss',
	'subscribe',
	'subscribe-refused',
	'subscribe-accepted',
	'about',
	'newsletter',
	'newsletter-accepted',
	'media',
	'shop-listing',
	'shop-filtered',
	'shop-miss',
	'shop-detail',
	'contact',
	'contact-refused',
	'contact-accepted',
	'payment',
	'payment-refused',
	'payment-accepted',
	'unknown-route-home',
	...EMPTY_CASES.map((entry) => entry.state),
	...MISSING_CASES.map((entry) => entry.state),
]

// `configs/app/vite.journey.config.ts` declares the variants and gives each its own project, so
// the set and current name arrive through Vitest's per-project channel.
const VARIANTS: readonly JourneyVariant[] = inject('variants')
const VARIANT = inject('variant')
const CAPTURING = inject('capture')
const FAMILIES: readonly string[] = [
	'journey',
	'refusal',
	'matrix',
	'transport',
	...(CAPTURING ? ['capture'] : []),
]
const CURRENT = requireValue(
	VARIANTS.find((candidate) => candidate.name === VARIANT),
	`Capture variant "${VARIANT}" is not declared`,
)

const ESCAPE_DECLARATION = 'color: rgb(1, 2, 3)'
const JOURNEY_BUDGET = 30_000
const MATRIX_BUDGET = 180_000
const TRANSPORT_BUDGET = 30_000
const ARTIFACT_PATH = `tmp/journeys/${VARIANT}.txt`
const FRAMES_HEADING = '## capture frames'
const FORBIDDEN: readonly string[] = [
	'ApplicationController',
	'Navigator',
	'Orkestrel',
	'hashchange',
	'slug',
]

const portfolio = createPortfolio({
	states: STATES,
	variants: VARIANTS,
	variant: VARIANT,
	directory: '../../../tmp/capture/states',
	enabled: CAPTURING,
})

// What the contrast matrix walked in the variant being read. The coverage row reports it, and the
// loop clears it before the next variant, so each row states the scope of that variant's readings.
const WALKED = { members: 0, screens: new Set<string>() }
const PLACED = new Set<string>()
const PROVEN = new Set<string>()
const MATRIX_ROWS: string[] = []
const JOURNAL = createJournal()
const SHOTS = new Map<string, { readonly height: number }>()
let TREE = ''
let FOCUS = ''

async function place(state: string): Promise<void> {
	expect(readRefusal('Sign In')).toBe(SIGN_IN_ABSENT)
	await waitForAnimations(document.body, { budget: 4_000 })
	PLACED.add(state)
	SHOTS.set(`${state}--${VARIANT}.png`, { height: document.documentElement.scrollHeight })
	await portfolio.place(state)
}

async function followField(id: string, name: string, path: string): Promise<void> {
	const target = resolveAccessible('link', name)
	const box = target.getBoundingClientRect()
	const centre = readHit(target)
	// A wrapped inline link spans two line boxes with a gap between them, and its bounding-box
	// centre falls in that gap. A pointer aimed at the centre lands on the list item instead, so
	// the reading names what the centre actually hits.
	const reading = `viewport ${String(window.innerWidth)}x${String(window.innerHeight)} | link box ${String(Math.round(box.width))}x${String(Math.round(box.height))} | centre hits ${centre?.tagName ?? 'nothing'} | reaches link ${String(centre !== undefined && target.contains(centre))}`
	await clickAccessible('link', name)
	expect(`${document.activeElement?.id ?? 'nothing'} | ${reading}`).toBe(`${id} | ${reading}`)
	expect(window.location.hash).toBe(hashHref(path))
}

/**
 * Measures one group of a role's population and holds its worst member to the role's bar.
 *
 * @param label - The screen, the role, and the scope the group was read in
 * @param members - The elements the group holds
 * @param bar - The ratio every member must clear
 * @param report - Whether this variant owns the written artifact
 */
function readGroup(label: string, members: readonly Element[], bar: number, report: boolean): void {
	if (members.length === 0) return
	WALKED.members += members.length
	const lowest = Math.min(...members.map(readGradientContrast))
	expect(
		lowest,
		`${label} reads ${lowest.toFixed(3)} across ${String(members.length)} against a ${String(bar)} bar`,
	).toBeGreaterThanOrEqual(bar)
	if (report) {
		MATRIX_ROWS.push(
			`contrast | ${label} | ${lowest.toFixed(3)} | ${String(members.length)} read | bar ${String(bar)}`,
		)
	}
}

/**
 * Reads one role's whole population on the screen, split by page surface and mode island.
 *
 * @param screen - The screen and data state the population was drawn from
 * @param role - The role whose membership rule selects the population
 * @param root - The subtree to read
 * @param report - Whether this variant owns the written artifact
 */
function assertRole(screen: string, role: MatrixRole, root: ParentNode, report: boolean): void {
	WALKED.screens.add(screen)
	const members = selectRole(root, role)
	expect(members.length, `${screen} | ${role.label} selects nothing`).toBeGreaterThan(0)
	readGroup(
		`${screen} | ${role.label} | page surface`,
		members.filter((node) => !readIsland(node)),
		role.bar,
		report,
	)
	readGroup(`${screen} | ${role.label} | mode island`, members.filter(readIsland), role.bar, report)
}

/**
 * Reads one control's label against its fill, then the ring it wears under keyboard focus.
 *
 * @param screen - The screen the control sits on
 * @param control - The control to resolve, read, and focus
 * @param report - Whether this variant owns the written artifact
 */
async function readControl(screen: string, control: MatrixControl, report: boolean): Promise<void> {
	WALKED.members += 1
	WALKED.screens.add(screen)
	const node = resolveRendered(control.role, control.name)
	await waitForAnimations(node, { budget: 4_000 })
	const fill = readContrast(node)
	expect(
		fill,
		`${screen} | ${control.label} reads ${fill.toFixed(3)} against a ${String(TEXT_CONTRAST)} bar`,
	).toBeGreaterThanOrEqual(TEXT_CONTRAST)
	await traverseAccessible(control.name)
	const ring = requireValue(
		readRing(resolveRendered(control.role, control.name)),
		`${screen} | ${control.label} paints no focus chrome`,
	)
	expect(
		ring,
		`${screen} | ${control.label} ring reads ${ring.toFixed(3)} against a ${String(MARK_CONTRAST)} bar`,
	).toBeGreaterThanOrEqual(MARK_CONTRAST)
	if (report) {
		MATRIX_ROWS.push(`contrast | ${screen} | ${control.label} | ${fill.toFixed(3)}`)
		MATRIX_ROWS.push(`ring | ${screen} | ${control.label} | ${ring.toFixed(3)}`)
	}
}

/**
 * Reads one screen's authored-class census and records the population it walked.
 *
 * @param variant - The variant the screen was painted in
 * @param screen - The screen and data state the population is drawn from
 * @param root - The mounted subtree to walk
 */
function readScreenCensus(variant: string, screen: string, root: ParentNode): void {
	const control = buildCensus()
	root.append(control.root)
	const census = readCensus(root)
	control.root.remove()
	expect(census.elements, `${variant} | ${screen} | the census population`).toBeGreaterThan(0)
	MATRIX_ROWS.push(
		`census | ${variant} | ${screen} | every class token the mounted subtree carries, against every loaded stylesheet | walked ${String(census.elements)} elements carrying ${String(census.tokens.length)} tokens | undeclared ${census.undeclared.join(', ')}`,
	)
	expect(
		census.tokens.length,
		`${variant} | ${screen} | the census walked no class token`,
	).toBeGreaterThan(0)
	expect(
		census.undeclared,
		`${variant} | ${screen} | authored tokens no loaded stylesheet declares`,
	).toEqual([control.token, control.mark].sort())
}

/**
 * Feeds both style-escape branches on one variant's surface and records what the reading walked.
 *
 * @param variant - The variant the surface was painted in
 * @param host - The mounted surface, which is the population
 */
function readEscapes(variant: string, host: HTMLElement): void {
	const fixtures = buildEscapes('roughnotes-stylesheet')
	document.head.append(fixtures.permitted)
	host.append(fixtures.root)
	const walked = readCensus(host).elements
	const escapes = extractStyles(host).map(readOpeningTag)
	const head = extractStyles(document.head).map(readOpeningTag)
	fixtures.root.remove()
	fixtures.permitted.remove()
	const permitted = readOpeningTag(fixtures.permitted.outerHTML)
	MATRIX_ROWS.push(
		`escape | ${variant} | inline attributes and style elements on the mounted surface, read on home before a journey drives it | walked ${String(walked)} elements | reported ${String(escapes.length)} | the permitted head block left alone`,
	)
	expect(escapes, `${variant} | style escapes on the mounted surface`).toEqual([
		readOpeningTag(fixtures.inline.outerHTML),
		readOpeningTag(fixtures.embedded.outerHTML),
	])
	expect(head, `${variant} | the same reader over the document head`).toContain(permitted)
	expect(
		escapes,
		`${variant} | the permitted block sits outside the surface population`,
	).not.toContain(permitted)
}

/**
 * Reads a translucent stack through the matrix reader and through the flat reading it excludes.
 *
 * @param variant - The variant the stack was composed in
 * @param host - The mounted surface the stack is appended to
 */
function readComposite(variant: string, host: HTMLElement): void {
	const control = buildContrast(TEXT_CONTRAST)
	host.append(control.root)
	const refused = readContrast(control.refused)
	const accepted = readContrast(control.accepted)
	control.root.remove()
	MATRIX_ROWS.push(
		`composite | ${variant} | refused ${refused.toFixed(6)} | accepted ${accepted.toFixed(6)} | bar ${String(TEXT_CONTRAST)}`,
	)
	expect(refused).toBeLessThan(TEXT_CONTRAST)
	expect(accepted).toBeGreaterThanOrEqual(TEXT_CONTRAST)
}

async function readWrittenFrames(): Promise<readonly string[]> {
	try {
		const written = await commands.readFile(ARTIFACT_PATH)
		const [, listed] = written.split(`${FRAMES_HEADING}\n`)
		if (listed === undefined) return []
		return listed
			.split(/\r\n|\n/)
			.map((line) => line.trim())
			.filter((line) => line.length > 0)
	} catch {
		return []
	}
}

async function writeArtifact(): Promise<void> {
	JOURNAL.stop()
	const frames = CAPTURING ? portfolio.paths.map(readFileName) : await readWrittenFrames()
	const lines: readonly string[] = [
		`variant: ${VARIANT}`,
		`viewport: ${String(CURRENT.width)}x${String(CURRENT.height)}`,
		`capturing: ${String(CAPTURING)}`,
		'',
		'## accessible tree',
		TREE,
		'',
		'## focus order',
		FOCUS,
		'',
		'## resolved styles',
		...MATRIX_ROWS,
		'',
		'## journal steps',
		...JOURNAL.steps.map((step) => `${step.action} | ${step.trigger} | ${step.result}`),
		'',
		'## page output',
		...JOURNAL.output,
		'',
		FRAMES_HEADING,
		...frames,
	]
	await commands.writeFile(ARTIFACT_PATH, `${lines.join('\n')}\n`)
}

beforeAll(() => {
	JOURNAL.start()
})

afterEach(() => {
	clearSurface()
	clearStorage()
})

afterAll(async () => {
	await writeArtifact()
})

describe('knowledge site journeys', () => {
	for (const entry of ARRIVAL_CASES) {
		it(
			`arrives at ${entry.path} and reaches its own ${entry.control} control by keyboard`,
			async () => {
				PROVEN.add('journey')
				await resizeViewport(CURRENT.width, CURRENT.height)
				await openSurface({ path: entry.path })
				await applyTheme(VARIANT)
				await waitForText(`${entry.path} paints its own screen`, readPage, entry.heading)
				expect(readPage()).toContain(entry.heading)
				expect(
					entry.region === undefined ? readPage().length : readPerception(entry.region).length,
				).toBeGreaterThan(0)
				await traverseAccessible(entry.control)
				expect(readRefusal(entry.control)).toBeUndefined()
				MATRIX_ROWS.push(`document | ${entry.path} | Browser Mode host title ${document.title}`)
			},
			JOURNEY_BUDGET,
		)
	}

	it(
		'lands an unknown bookmark on the guide fallback with no missing-route notice',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface({ path: '/no-such-route' })
			await applyTheme(VARIANT)
			expect(readPerception(COPY.introduction)).toContain(HOME_HEADING)
			expect(readPage()).not.toContain(COPY.missing)
			await traverseAccessible(COPY.explore)
			await place('unknown-route-home')
		},
		JOURNEY_BUDGET,
	)

	for (const entry of EMPTY_CASES) {
		it(
			`arrives at the empty ${entry.path} collection and reaches its recovery`,
			async () => {
				PROVEN.add('journey')
				await resizeViewport(CURRENT.width, CURRENT.height)
				await openSurface({ path: entry.path, catalog: entry.catalog })
				await applyTheme(VARIANT)
				await waitForText(`${entry.path} reports its absent catalog`, readPage, entry.text)
				await traverseAccessible(entry.control)
				expect(readRefusal(entry.control)).toBeUndefined()
				await place(entry.state)
				await clickAccessible('link', entry.control)
				await waitForText(
					'the recovery replaces the empty collection',
					readPage,
					entry.destination,
					{ absent: entry.text },
				)
			},
			JOURNEY_BUDGET,
		)
	}

	for (const entry of MISSING_CASES) {
		it(
			`recovers the missing ${entry.path} bookmark to its listing`,
			async () => {
				PROVEN.add('journey')
				await resizeViewport(CURRENT.width, CURRENT.height)
				await openSurface({ path: entry.path })
				await applyTheme(VARIANT)
				await waitForText(`${entry.path} reports the missing record`, readPage, entry.text)
				await traverseAccessible(entry.control)
				expect(readRefusal(entry.control)).toBeUndefined()
				await place(entry.state)
				await clickAccessible('link', entry.control)
				await waitForText(
					'the listing replaces its missing-record notice',
					readPage,
					entry.destination,
					{ absent: entry.text },
				)
			},
			JOURNEY_BUDGET,
		)
	}
	it(
		'lands on home and reaches subscribe through the content Get started control',
		async () => {
			const rejected = createRecorder<readonly [PromiseRejectionEvent]>()
			window.addEventListener('unhandledrejection', rejected.handler)
			try {
				PROVEN.add('journey')
				await resizeViewport(CURRENT.width, CURRENT.height)
				const { host } = await openSurface()
				await applyTheme(VARIANT)
				expect(readPage()).toContain(HOME_HEADING)
				expect(readPage()).toContain('RoughNotes-Pro')
				expect(
					readRefusal(VARIANT.startsWith(`${THEME_DARK}-`) ? COPY.light : COPY.dark),
				).toBeUndefined()
				for (const word of FORBIDDEN) {
					expect(readPage()).not.toContain(word)
				}
				TREE = describeTree(host)
				FOCUS = describeFocus(host)
				await place('home')
				// Home's own continuation, not a shell destination: a walk that only ever reaches the
				// masthead proves the shell's tab order and says nothing about the screen under it.
				await traverseAccessible(COPY.explore)
				await openSite()
				await traverseAccessible(buildName(COPY.shop, COPY.site))
				await place('navigation')
				await closeSite()
				await startSubscription()
				await waitForText('the subscribe view paints', readPage, 'Free print and digital delivery')
				expect(readPage()).toContain('Subscribe')
				expect(readPage()).not.toContain(HOME_HEADING)
				await traverseAccessible(COPY.subscribe)
				await place('subscribe')
				JOURNAL.record('click', COPY.started, 'subscribe')
				expect(
					rejected.calls,
					'the content and navigation journey emits no unhandled rejection',
				).toEqual([])
			} finally {
				window.removeEventListener('unhandledrejection', rejected.handler)
			}
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens the featured product from the site navigation',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.products, COPY.site))
			await waitForText(
				'the products listing paints',
				readPage,
				'Choose the desk your agency needs',
			)
			await traverseAccessible(COPY.skip)
			await clickAccessible('link', COPY.skip)
			expect(document.activeElement?.id).toBe('main')
			expect(readPage()).toContain('Choose the desk your agency needs')
			await place('product-listing')
			// The listing entry owns the desk's name: the footer destination carrying the same label
			// announces the footer column it sits in, so the bare name reaches the entry alone.
			expect(readRefusal('RoughNotes-Pro')).toBeUndefined()
			await traverseAccessible('PF&M Online')
			await clickAccessible('link', 'RoughNotes-Pro')
			// The desk's audience sentence is the detail's own: the listing paints every summary,
			// and one of those summaries names PF&M, so both of those read the same on either screen.
			await waitForText(
				'the product page paints',
				readPage,
				'Individual producers who need the full technical desk on every device.',
			)
			expect(readPage()).toContain('Who it is for')
			expect(readPage()).not.toContain('Choose the desk your agency needs')
			await traverseAccessible(COPY.ask)
			await place('product-detail')
			JOURNAL.record('click', 'RoughNotes-Pro', 'product')
		},
		JOURNEY_BUDGET,
	)

	it(
		'filters the magazine to an empty category, shows every article again, and opens one',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.publications, COPY.site))
			await waitForText(
				'the publications hub paints',
				readPage,
				'The magazine and the Insurance Marketplace',
			)
			await place('publications')
			await traverseAccessible('Rough Notes magazine')
			await clickAccessible('link', 'Rough Notes magazine')
			await waitForText('the magazine paints', readPage, 'Coverage, markets, and agency practice')
			expect(readRefusal(COPY.all)).toBe(
				`No interactive element has the accessible name "${COPY.all}"`,
			)
			expect(readStates(resolveAccessible('button', 'All articles'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'Program business'))).toContain('pressed=false')
			await place('magazine-listing')
			await traverseAccessible('Program business')
			await clickAccessible('button', 'Program business')
			await waitForText('the empty category paints', readPage, COPY.none)
			expect(readStates(resolveAccessible('button', 'Program business'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'All articles'))).toContain('pressed=false')
			await place('magazine-empty')
			await clickAccessible('button', COPY.all)
			await waitForText('the full listing returns', readPage, 'Mass shootings; mass confusion?')
			expect(readPage()).not.toContain(COPY.none)
			expect(readStates(resolveAccessible('button', 'All articles'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'Program business'))).toContain('pressed=false')
			await clickAccessible('link', 'Mass shootings; mass confusion?')
			await waitForText(
				'the article paints',
				readPage,
				'Court readings of occurrence continue to split insurers',
			)
			expect(readPage()).not.toContain('Coverage, markets, and agency practice')
			await traverseAccessible(COPY.magazine)
			await place('magazine-detail')
			JOURNAL.record('click', 'Program business', COPY.none)
		},
		JOURNEY_BUDGET,
	)

	it(
		'searches the marketplace sample, reports a miss, and restores the directory',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.publications, COPY.site))
			await waitForText(
				'the publications hub paints',
				readPage,
				'The magazine and the Insurance Marketplace',
			)
			await clickAccessible('link', 'The Insurance Marketplace')
			await waitForText(
				'the marketplace paints',
				readPage,
				'Search a fixture sample of specialty markets',
			)
			expect(readPage()).toContain('Restaurant general liability')
			expect(readRefusal(COPY.clear)).toBe(
				`No interactive element has the accessible name "${COPY.clear}"`,
			)
			await place('marketplace-listing')
			await traverseAccessible(COPY.query)
			await fillAccessible(COPY.query, 'zzzz-no-such-market')
			await clickAccessible('button', COPY.search)
			await waitForText('the miss paints', readPage, COPY.empty)
			await place('marketplace-miss')
			await clickAccessible('button', COPY.clear)
			await waitForText('the directory returns', readPage, 'Restaurant general liability')
			expect(readPage()).not.toContain(COPY.empty)
			JOURNAL.record('click', COPY.search, COPY.empty)
		},
		JOURNEY_BUDGET,
	)

	it(
		'keeps subscribe enabled, announces a refusal, and accepts a valid request',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await startSubscription()
			await waitForText('the subscribe view paints', readPage, 'Subscribe')
			const send = resolveAccessible('button', COPY.subscribe)
			expect(send.hasAttribute('disabled')).toBe(false)
			await clickAccessible('button', COPY.subscribe)
			await waitForText('the error summary paints', readPage, COPY.summary)
			const nameField = resolveAccessible('textbox', COPY.name)
			expect(nameField.getAttribute('aria-invalid')).toBe('true')
			expect(readStates(nameField)).toContain('invalid')
			await followField('subscribe-name', `${COPY.name} is required.`, SUBSCRIBE_PATH)
			await followField('subscribe-email', `${COPY.mail} must be an email address.`, SUBSCRIBE_PATH)
			await place('subscribe-refused')
			await fillAccessible(COPY.name, 'Ada Lovelace')
			await fillAccessible(COPY.mail, 'ada@agency.com')
			// Repairing the fields commits nothing: the control is still reachable and no
			// acceptance has painted. A form that submits itself while the reader types removes
			// the control and paints the acceptance here, so both reads go red before the click.
			expect(readRefusal(COPY.subscribe)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.accepted)
			await clickAccessible('button', COPY.subscribe)
			await waitForText('the accepted status paints', readPage, COPY.accepted)
			expect(readPage()).not.toContain(COPY.summary)
			await place('subscribe-accepted')
			JOURNAL.record('click', COPY.subscribe, COPY.accepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens about from the site navigation',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.about, COPY.site))
			await waitForText('the about view paints', readPage, 'About Rough Notes')
			await waitForOrigin()
			expect(readPage()).toContain('Serve the independent agent market')
			expect(readPage()).not.toContain(HOME_HEADING)
			await place('about')
			await traverseAccessible(COPY.explore)
			JOURNAL.record('click', 'About', 'about')
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens the newsletter from the publications hub and joins the list',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.publications, COPY.site))
			await waitForText(
				'the publications hub paints',
				readPage,
				'The magazine and the Insurance Marketplace',
			)
			await clickAccessible('link', COPY.newsletter)
			await waitForText('the newsletter view paints', readPage, 'It is about you, the customer')
			expect(readPage()).toContain('Rough Notes newsletters')
			await place('newsletter')
			await traverseAccessible(COPY.subscribe)
			await fillAccessible(COPY.name, 'Ada Lovelace')
			await fillAccessible(COPY.mail, 'ada@agency.com')
			expect(readRefusal(COPY.subscribe)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.accepted)
			await clickAccessible('button', COPY.subscribe)
			await waitForText('the newsletter acceptance paints', readPage, COPY.accepted)
			await place('newsletter-accepted')
			JOURNAL.record('click', COPY.subscribe, COPY.accepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens media kits and keeps the PDF destinations external',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await clickAccessible('link', buildName(COPY.media, COPY.company))
			await waitForText(
				'the media view paints',
				readPage,
				'Files open on Rough Notes. They are not stored in this application.',
			)
			const rate = resolveAccessible('link', '2027 Rough Notes magazine rate card')
			expect(rate.getAttribute('href')).toContain('roughnotes.com/wp-content/uploads')
			expect(rate.getAttribute('rel')).toBe('noreferrer')
			await place('media')
			await traverseAccessible('2027 Rough Notes magazine rate card')
			JOURNAL.record('click', COPY.media, 'media')
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens the shop catalog, narrows it to a department, and opens a SKU detail',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.shop, COPY.site))
			await waitForText('the shop paints', readPage, 'A fixture sample of books')
			const live = resolveAccessible('link', COPY.live)
			expect(live.getAttribute('href')).toContain('shoppingcart.roughnotes.com')
			expect(live.getAttribute('rel')).toBe('noreferrer')
			expect(readStates(resolveAccessible('button', 'All items'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'Calculator wheels'))).toContain(
				'pressed=false',
			)
			await place('shop-listing')
			await traverseAccessible(COPY.live)
			await clickAccessible('button', 'Calculator wheels')
			await waitForText('the wheels department paints', readPage, 'RONOCO online calculator wheel')
			expect(readPage()).not.toContain('Coverages Applicable')
			expect(readStates(resolveAccessible('button', 'Calculator wheels'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'All items'))).toContain('pressed=false')
			await place('shop-filtered')
			await clickAccessible('button', 'All items')
			await waitForText('the whole catalog returns', readPage, 'Coverages Applicable')
			expect(readStates(resolveAccessible('button', 'All items'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'Calculator wheels'))).toContain(
				'pressed=false',
			)
			await clickAccessible('link', 'Coverages Applicable')
			// The catalog code and the price are printed on the listing entry too, so the record
			// heading and the shipping line are what tell the two screens apart.
			await waitForText('the SKU paints', readPage, 'Catalog record')
			expect(readPage()).toContain('Plus shipping and handling on a live order.')
			expect(readPage()).not.toContain('A fixture sample of books')
			await traverseAccessible(COPY.live)
			await place('shop-detail')
			JOURNAL.record('click', 'Coverages Applicable', 'item')
		},
		JOURNEY_BUDGET,
	)

	it(
		'reports a department this catalog cannot fill and restores the whole listing',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			// Every shipped department holds items, so the `miss` the filter row paints is
			// unreachable until a catalog reports one department. The application is the real one;
			// only the catalog is smaller.
			await openSurface({ catalog: { skus: [UNINDEXED_SKU] } })
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.shop, COPY.site))
			await waitForText('the shop paints', readPage, UNINDEXED_SKU.name)
			expect(readRefusal(COPY.every)).toBe(
				`No interactive element has the accessible name "${COPY.every}"`,
			)
			await clickAccessible('button', 'Calculator wheels')
			await waitForText('the vacant department paints', readPage, COPY.vacant)
			expect(readPage()).not.toContain(UNINDEXED_SKU.name)
			expect(readStates(resolveAccessible('button', 'Calculator wheels'))).toContain('pressed=true')
			expect(readStates(resolveAccessible('button', 'All items'))).toContain('pressed=false')
			await place('shop-miss')
			await clickAccessible('button', COPY.every)
			await waitForText('the whole catalog returns', readPage, UNINDEXED_SKU.name)
			expect(readPage()).not.toContain(COPY.vacant)
			expect(readStates(resolveAccessible('button', 'All items'))).toContain('pressed=true')
			JOURNAL.record('click', 'Calculator wheels', COPY.vacant)
		},
		JOURNEY_BUDGET,
	)

	it(
		'keeps contact enabled, announces a refusal, and accepts a valid inquiry',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await clickAccessible('link', buildName(COPY.write, COPY.company))
			await waitForText('the contact view paints', readPage, 'Write the Indianapolis office')
			await waitForOrigin()
			expect(readPage()).not.toContain(HOME_HEADING)
			await place('contact')
			await traverseAccessible(COPY.send)
			const send = resolveAccessible('button', COPY.send)
			expect(send.hasAttribute('disabled')).toBe(false)
			await clickAccessible('button', COPY.send)
			await waitForText('the inquiry summary paints', readPage, COPY.inquirySummary)
			await followField('inquiry-name', `${COPY.name} is required.`, CONTACT_PATH)
			await followField('inquiry-company', `${COPY.company} is required.`, CONTACT_PATH)
			await followField('inquiry-email', `${COPY.mail} must be an email address.`, CONTACT_PATH)
			await followField('inquiry-phone', `${COPY.phoneLabel} must include a number.`, CONTACT_PATH)
			await place('contact-refused')
			await fillAccessible(COPY.name, 'Ada Lovelace')
			await fillAccessible(COPY.company, 'Agency')
			await fillAccessible(COPY.mail, 'ada@agency.com')
			await fillAccessible(COPY.phoneLabel, '800-428-4384')
			expect(readRefusal(COPY.send)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.inquiryAccepted)
			await clickAccessible('button', COPY.send)
			await waitForText('the inquiry status paints', readPage, COPY.inquiryAccepted, {
				absent: COPY.inquirySummary,
			})
			expect(readRefusal(COPY.send)).toBe(
				`No interactive element has the accessible name "${COPY.send}"`,
			)
			await place('contact-accepted')
			JOURNAL.record('click', COPY.send, COPY.inquiryAccepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'keeps invoice review enabled, announces a refusal, and accepts a valid amount',
		async () => {
			PROVEN.add('journey')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			await followSite(buildName(COPY.shop, COPY.site))
			await waitForText('the shop paints', readPage, 'A fixture sample of books')
			await clickAccessible('link', COPY.payment)
			// The shop's own continuation carries the words `Pay a bill`, so the desk's instruction
			// is what proves the desk opened.
			await waitForText(
				'the payment view paints',
				readPage,
				'Enter the customer number, the invoice number, and the full invoice amount.',
			)
			await waitForOrigin()
			expect(readPage()).not.toContain('A fixture sample of books')
			await place('payment')
			await traverseAccessible(COPY.customer)
			const send = resolveAccessible('button', COPY.pay)
			expect(send.hasAttribute('disabled')).toBe(false)
			await clickAccessible('button', COPY.pay)
			await waitForText('the payment summary paints', readPage, COPY.paymentSummary)
			await followField('payment-customer', `${COPY.customer} is required.`, PAYMENT_PATH)
			await followField('payment-number', `${COPY.invoice} is required.`, PAYMENT_PATH)
			await followField(
				'payment-amount',
				`${COPY.amount} must be a positive dollar amount.`,
				PAYMENT_PATH,
			)
			await place('payment-refused')
			await fillAccessible(COPY.customer, '1001')
			await fillAccessible(COPY.invoice, '1001')
			await fillAccessible(COPY.amount, '78.00')
			expect(readRefusal(COPY.pay)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.paymentAccepted)
			await clickAccessible('button', COPY.pay)
			await waitForText('the payment status paints', readPage, COPY.paymentAccepted, {
				absent: COPY.paymentSummary,
			})
			expect(readRefusal(COPY.pay)).toBe(
				`No interactive element has the accessible name "${COPY.pay}"`,
			)
			await place('payment-accepted')
			JOURNAL.record('click', COPY.pay, COPY.paymentAccepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'leaves Sign In absent and keeps live logins as external links',
		async () => {
			PROVEN.add('refusal')
			await resizeViewport(CURRENT.width, CURRENT.height)
			await openSurface()
			await applyTheme(VARIANT)
			expect(readRefusal('Sign In')).toBe(SIGN_IN_ABSENT)
			const pro = resolveAccessible('link', buildName(COPY.pro, COPY.logins))
			expect(pro.getAttribute('href')).toContain('shoppingcart.roughnotes.com')
			expect(pro.getAttribute('rel')).toBe('noreferrer')
			await openSite()
			const shop = resolveAccessible('link', buildName(COPY.shop, COPY.site))
			expect(shop.getAttribute('href')).toBe('#/shop')
			expect(readRefusal('PF&M database')).toBe(
				'No interactive element has the accessible name "PF&M database"',
			)
			JOURNAL.record('read', COPY.pro, 'external')
			await closeSite()
		},
		JOURNEY_BUDGET,
	)

	it(
		'reads contrast, focus chrome, authored classes, and style escapes in every variant',
		async () => {
			PROVEN.add('matrix')
			clearSurface()
			const holder = mount(
				build('div', { attributes: { style: 'background-color: rgb(120,120,120)' } }),
			)
			const origin = build('button', {
				text: 'Focus origin control',
				attributes: { type: 'button' },
			})
			const ringControl = build('button', {
				text: 'Focus ring control',
				attributes: { type: 'button', style: 'outline: 3px solid rgb(120,120,120)' },
			})
			const contrastControl = build('p', {
				text: 'Contrast control',
				attributes: { style: 'color: rgb(130,130,130); background-color: rgb(120,120,120)' },
			})
			holder.append(origin, ringControl, contrastControl)
			await clickAccessible('Focus origin control')
			await traverseAccessible('Focus ring control')
			expect(readRing(ringControl)).toBeLessThan(MARK_CONTRAST)
			expect(readContrast(contrastControl)).toBeLessThan(TEXT_CONTRAST)
			expect(
				extractStyles(build('div', { attributes: { style: ESCAPE_DECLARATION } })),
			).toHaveLength(1)

			// A gradient leaves `background-color` transparent, so a walk up the ancestors reads
			// past it to the fill underneath and reports a ratio against a surface nobody sees.
			// These two fixtures carry the same declared gradient and differ only in foreground, so
			// a reader that passed every gradient and one that failed every gradient are both caught.
			const gradientControl = build('p', {
				text: 'Gradient contrast control',
				attributes: { class: 'hero', style: 'color: rgb(24, 66, 110)' },
			})
			const gradientSurvivor = build('p', {
				text: 'Gradient contrast survivor',
				attributes: { class: 'hero', style: 'color: rgb(255, 255, 255)' },
			})
			holder.append(gradientControl, gradientSurvivor)
			expect(readGradientContrast(gradientControl)).toBeLessThan(TEXT_CONTRAST)
			expect(readGradientContrast(gradientSurvivor)).toBeGreaterThanOrEqual(TEXT_CONTRAST)
			gradientControl.remove()
			gradientSurvivor.remove()

			// A control transitions its fill and its label color whenever the pointer crosses it, and
			// a reading taken inside that window reports an interpolated frame no state of the
			// application paints. This fixture is read twice — once while its transition runs, and
			// once through the settling reader — so a reader that stopped waiting fails the first read.
			const movingControl = build('p', {
				text: 'Settling contrast control',
				attributes: {
					style:
						'color: rgb(120, 120, 120); background-color: rgb(120, 120, 120); transition: color 1s linear',
				},
			})
			holder.append(movingControl)
			expect(readGradientContrast(movingControl)).toBeLessThan(TEXT_CONTRAST)
			movingControl.style.color = 'rgb(0, 0, 0)'
			await waitForFrame()
			expect(
				movingControl.getAnimations().some((animation) => animation.playState === 'running'),
			).toBe(true)
			expect(readGradientContrast(movingControl)).toBeLessThan(TEXT_CONTRAST)
			await waitForAnimations(movingControl, { budget: 4_000 })
			expect(readContrast(movingControl)).toBeGreaterThanOrEqual(TEXT_CONTRAST)
			movingControl.remove()

			const read: string[] = []
			const tokens = new Map<string, readonly string[]>()
			for (const variant of VARIANTS) {
				await resizeViewport(variant.width, variant.height)
				const { host } = await openSurface()
				await applyTheme(variant.name)
				read.push(variant.name)
				const colors = [readRootToken('--bs-body-bg'), readRootToken('--bs-body-color')]
				tokens.set(variant.name, colors)
				if (variant.name === VARIANT)
					MATRIX_ROWS.push(`tokens | body background ${colors[0]} | body foreground ${colors[1]}`)

				// The escape fixtures are fed and removed before the census runs. The `<style>` block
				// that feeds the element branch declares a rule while it sits in the document, and
				// the census reads that cascade.
				readEscapes(variant.name, host)
				readComposite(variant.name, host)
				readScreenCensus(variant.name, 'home', host)

				const report = variant.name === VARIANT
				for (const role of SHELL_ROLES) assertRole('shell', role, host, report)
				for (const role of HOME_ROLES) assertRole('home', role, host, report)
				await readControl('home', CONTENT_CONTROL, report)
				await readControl(
					'home',
					readThemeControl(variant.name.startsWith(`${THEME_DARK}-`)),
					report,
				)

				await startSubscription()
				await waitForText('subscribe is on screen', readPage, COPY.subscribe)
				readScreenCensus(variant.name, 'subscribe', host)
				await readControl('subscribe', COMMIT_CONTROL, report)

				await clickAccessible('link', buildName(COPY.issue, COPY.resources))
				await waitForText(
					'the magazine is on screen',
					readPage,
					'Coverage, markets, and agency practice',
				)
				readScreenCensus(variant.name, 'magazine', host)
				for (const role of LISTING_ROLES) assertRole('magazine', role, host, report)
				await readControl('magazine', SELECTED_CONTROL, report)
				await readControl('magazine', UNSELECTED_CONTROL, report)
				await clickAccessible('button', UNSELECTED_CONTROL.name)
				await waitForText('the filtered miss is on screen', readPage, COPY.none)
				readScreenCensus(variant.name, 'magazine miss', host)
				for (const role of NOTICE_ROLES) assertRole('magazine miss', role, host, report)

				await clickAccessible('link', buildName(COPY.write, COPY.company))
				await waitForText(
					'the contact desk is on screen',
					readPage,
					'Write the Indianapolis office',
				)
				await clickAccessible('button', COPY.send)
				await waitForText('the inquiry summary is on screen', readPage, COPY.inquirySummary)
				readScreenCensus(variant.name, 'contact refused', host)
				for (const role of REFUSED_ROLES) assertRole('contact refused', role, host, report)
				await readControl('contact refused', SUMMARY_CONTROL, report)

				await fillAccessible(COPY.name, 'Ada Lovelace')
				await fillAccessible(COPY.company, 'Agency')
				await fillAccessible(COPY.mail, 'ada@agency.com')
				await fillAccessible(COPY.phoneLabel, '800-428-4384')
				await clickAccessible('button', COPY.send)
				await waitForText('the partial inquiry is on screen', readPage, COPY.inquiryAccepted)
				readScreenCensus(variant.name, 'contact partial', host)
				for (const role of NOTICE_ROLES) assertRole('contact partial', role, host, report)

				// The shipped fixtures fill every collection, so the `empty` category is unreachable
				// without reducing one. The application is the real one; only the catalog is smaller.
				const empty = await openSurface({ path: MAGAZINE_PATH, catalog: { articles: [] } })
				await applyTheme(variant.name)
				await waitForText(
					'the empty issue is on screen',
					readPage,
					'No articles in this issue yet.',
				)
				readScreenCensus(variant.name, 'magazine empty', empty.host)
				for (const role of NOTICE_ROLES) assertRole('magazine empty', role, empty.host, report)

				const unindexed = await openSurface({
					path: skuHref(UNINDEXED_SKU.id),
					catalog: { skus: [UNINDEXED_SKU] },
				})
				await applyTheme(variant.name)
				await waitForText('the unindexed book is on screen', readPage, 'No published ISBN')
				readScreenCensus(variant.name, 'item partial', unindexed.host)
				for (const role of NOTICE_ROLES) assertRole('item partial', role, unindexed.host, report)

				MATRIX_ROWS.push(
					`contrast | ${variant.name} | coverage | ${[...WALKED.screens].join(', ')} | ${String(WALKED.members)} members read | bars ${String(TEXT_CONTRAST)} text and ${String(MARK_CONTRAST)} mark`,
				)
				WALKED.members = 0
				WALKED.screens.clear()
			}
			expect(read).toEqual(VARIANTS.map((variant) => variant.name))
			expect(tokens.get('light-1280')).not.toEqual(tokens.get('dark-1280'))
			expect(tokens.get('light-390')).not.toEqual(tokens.get('dark-390'))
		},
		MATRIX_BUDGET,
	)

	describe('theme persistence transport', () => {
		it(
			'hands the persisted theme to a second session over the same storage',
			async () => {
				PROVEN.add('transport')
				await resizeViewport(CURRENT.width, CURRENT.height)
				const first = await openSurface()
				expect(readStates(resolveAccessible('button', COPY.dark))).toContain('pressed=false')
				await toggleThemeControl()
				await waitForCondition(
					'the first session paints dark',
					() => document.documentElement.getAttribute('data-bs-theme') === THEME_DARK,
					{ budget: 4_000, interval: 25 },
				)
				expect(readStates(resolveAccessible('button', COPY.light))).toContain('pressed=true')
				expect(first.storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)

				const second = await openSurface({ storage: first.storage })
				await waitForCondition(
					'the second session restores dark',
					() => document.documentElement.getAttribute('data-bs-theme') === THEME_DARK,
					{ budget: 4_000, interval: 25 },
				)
				expect(second.app.dark.value).toBe(true)
				JOURNAL.record('theme', THEME_DARK, 'restored')
			},
			TRANSPORT_BUDGET,
		)

		it(
			'paints the mode the store refuses to keep, and reaches the window with no error',
			async () => {
				PROVEN.add('transport')
				await resizeViewport(CURRENT.width, CURRENT.height)
				// `start` spends the quota on the write that applies the stored mode, so the control a
				// person presses next makes the first write this store refuses.
				const storage = createStorage({ quota: 1 })
				const escaped = createRecorder<readonly [ErrorEvent]>()
				window.addEventListener('error', escaped.handler)
				try {
					await openSurface({ storage })
					expect(storage.getItem(THEME_STORAGE)).toBe(THEME_LIGHT)
					expect(readStates(resolveAccessible('button', COPY.dark))).toContain('pressed=false')
					const before = readPage()
					await toggleThemeControl()
					await waitForCondition(
						'the document paints the mode the control was pressed for',
						() => document.documentElement.getAttribute('data-bs-theme') === THEME_DARK,
						{ budget: 4_000, interval: 25 },
					)
					// What a person is left with: the mode they asked for, a control that announces it,
					// and no sentence about the store. The preference is unremembered, which is what the
					// second session below reads.
					expect(readStates(resolveAccessible('button', COPY.light))).toContain('pressed=true')
					expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_DARK)
					expect(storage.getItem(THEME_STORAGE)).toBe(THEME_LIGHT)
					expect(readPage()).toBe(before)
					expect(escaped.calls.map((call) => call[0].message)).toEqual([])

					const second = await openSurface({ storage })
					expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_LIGHT)
					expect(second.app.dark.value).toBe(false)
					expect(readStates(resolveAccessible('button', COPY.dark))).toContain('pressed=false')
					expect(escaped.calls.map((call) => call[0].message)).toEqual([])
				} finally {
					window.removeEventListener('error', escaped.handler)
				}
				JOURNAL.record('theme', 'quota spent', 'painted and unremembered')
			},
			TRANSPORT_BUDGET,
		)
	})

	it('expands the registry across every declared variant into unique filenames', () => {
		if (CAPTURING) PROVEN.add('capture')
		const files = expandCaptures(STATES, VARIANTS)
		expect(files).toEqual(portfolio.files)
		expect(new Set(files).size).toBe(files.length)
	})

	it.runIf(CAPTURING)('writes every frame this run owes', async () => {
		const expected = expandCaptures(STATES, [CURRENT])
		const written = portfolio.paths.map(readFileName)
		expect([...written].sort()).toEqual([...expected].sort())
		for (const path of portfolio.paths) {
			const file = readFileName(path)
			const shot = requireValue(SHOTS.get(file), `No shot was recorded for ${file}`)
			const frame = await readFrame(path)
			expect(frame.width).toBe(CURRENT.width)
			expect(frame.height).toBeGreaterThanOrEqual(shot.height)
		}
	})

	it('proves every declared family and claims no family it did not prove', () => {
		expect([...PROVEN].sort()).toEqual([...FAMILIES].sort())
	})

	it('places every registered state and places nothing else', () => {
		expect([...PLACED].sort()).toEqual([...STATES].sort())
	})
})
