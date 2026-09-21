// Content/layout calibration instrument: opens Elements' built showcase, reads the content
// specimens (paragraphs, headings, lists, blockquote, hr, anchors, tables, figures, images, the
// code family, small/mark/abbr/address/sub/sup) per mode on managed Chromium and Edge, and writes
// the readings under `.orkestrel/veneer/research/calibration-content/<browser>/` plus a rendered
// record `calibration-content.md`. Sibling of the accepted `calibration.mjs`; mirrors its digest
// check, viewport, root font size, settle wait, browsers, modes, and `setMode`.
//
// Run: node .orkestrel/veneer/research/calibration-content.mjs
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SHOWCASE_PATH = 'C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html'
const SHOWCASE_DIGEST = 'cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792'
const SHOWCASE_URL = 'file:///' + SHOWCASE_PATH.replaceAll('\\', '/')
const OUTPUT_ROOT = path.join(HERE, 'calibration-content')
const RECORD_PATH = path.join(HERE, 'calibration-content.md')
const VIEWPORT = Object.freeze({ width: 1100, height: 800 })
const ROOT_FONT_SIZE_CSS = 'html { font-size: 16px !important; }'
// Longest declared transition touching an anchor's hover paint is 150ms (`_a.scss:111-118`,
// `--set-transition-duration`); the accepted instrument's 500ms settle already exceeds it.
const SETTLE_MS = 500

const MODES = Object.freeze(['light', 'dark'])

const BROWSERS = Object.freeze([
	Object.freeze({ id: 'chromium', launch: {} }),
	Object.freeze({ id: 'msedge', launch: { channel: 'msedge' } }),
])

// Every resolved CSS property read on a content specimen, per state per mode. A superset read on
// every specimen: an inapplicable property (for example `list-style-type` on a `<p>`) resolves to
// its inherited or initial value and costs nothing to carry.
const PROPERTIES = Object.freeze([
	'font-family',
	'font-size',
	'line-height',
	'font-weight',
	'font-style',
	'letter-spacing',
	'color',
	'background-color',
	'margin-top',
	'margin-right',
	'margin-bottom',
	'margin-left',
	'margin-block-start',
	'margin-block-end',
	'margin-inline-start',
	'margin-inline-end',
	'padding-top',
	'padding-right',
	'padding-bottom',
	'padding-left',
	'border-top-width',
	'border-top-style',
	'border-top-color',
	'border-inline-start-width',
	'border-inline-start-style',
	'border-inline-start-color',
	'border-block-start-width',
	'border-block-start-style',
	'border-block-start-color',
	'border-block-end-width',
	'border-block-end-style',
	'border-block-end-color',
	'border-collapse',
	'border-spacing',
	'text-decoration-line',
	'text-decoration-style',
	'text-decoration-color',
	'text-decoration-thickness',
	'text-underline-offset',
	'list-style-type',
	'display',
	'gap',
	'row-gap',
	'column-gap',
	'grid-template-columns',
	'vertical-align',
	'cursor',
	'text-wrap',
	'caption-side',
	'text-align',
	'max-width',
	'max-inline-size',
	'width',
	'height',
	'opacity',
])

// Custom properties every specimen reads, plus the surface-specific tokens the scout report
// names. Read on the specimen element itself: a computed custom property is visible wherever it
// is inherited from its declaring scope.
const COMMON_TOKENS = Object.freeze([
	'--color-canvas',
	'--color-text',
	'--color-text-muted',
	'--color-border',
	'--color-surface-raised',
	'--color-primary',
	'--color-primary-on-canvas',
	'--color-text-strong',
])

const SURFACE_TOKENS = Object.freeze({
	paragraph: Object.freeze([]),
	heading: Object.freeze(['--set-heading-color']),
	'list-ul': Object.freeze(['--set-marker-color']),
	'list-ol': Object.freeze(['--set-marker-color']),
	'list-dl': Object.freeze(['--set-dl-row-gap', '--set-dl-column-gap']),
	blockquote: Object.freeze([
		'--set-blockquote-color',
		'--set-blockquote-bar-width',
		'--set-blockquote-padding-inline',
		'--set-blockquote-margin-block-end',
	]),
	hr: Object.freeze(['--set-hr-color', '--set-hr-opacity']),
	anchor: Object.freeze(['--set-a-color', '--set-a-text-decoration']),
	'table-bare': Object.freeze([
		'--set-table-header-background-color',
		'--set-table-row-hover-background-color',
		'--set-table-row-striped-background-color',
		'--set-table-border-color',
		'--set-table-cell-padding-inline',
		'--set-table-cell-padding-block',
	]),
	'table-striped': Object.freeze([
		'--set-table-header-background-color',
		'--set-table-row-hover-background-color',
		'--set-table-row-striped-background-color',
		'--set-table-border-color',
	]),
	'table-bordered': Object.freeze(['--set-table-border-color', '--set-table-row-hover-background-color']),
	figure: Object.freeze(['--set-figure-gap']),
	img: Object.freeze([]),
	'code-family': Object.freeze([
		'--set-code-background-color',
		'--set-kbd-background-color',
		'--set-kbd-border-color',
		'--set-pre-background-color',
		'--set-samp-background-color',
		'--set-var-background-color',
	]),
	'small-mark': Object.freeze(['--set-mark-color', '--set-mark-background-color']),
	abbr: Object.freeze([]),
	address: Object.freeze([]),
	'sub-sup': Object.freeze([]),
})

// Every content specimen the CL0 scout mapped, keyed by surface for the record's grouping. `css`
// is a selector resolved with `.first()`; `states` names `rest`, or `rest` and `hover` where the
// scout found a hover rule.
const SPECIMENS = Object.freeze([
	Object.freeze({
		id: 'paragraph-first',
		surface: 'paragraph',
		route: '#/typography/typography-paragraph',
		css: 'section#typography-paragraph p:first-of-type',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'paragraph-second',
		surface: 'paragraph',
		route: '#/typography/typography-paragraph',
		css: 'section#typography-paragraph p:nth-of-type(2)',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'paragraph-section-gap',
		surface: 'paragraph',
		route: '#/typography/typography-paragraph',
		css: 'section#typography-paragraph',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h1',
		surface: 'heading',
		route: '#/headings/headings-cascade',
		css: 'div.stack h1',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h2',
		surface: 'heading',
		route: '#/headings/headings-cascade',
		css: 'div.stack h2',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h3',
		surface: 'heading',
		route: '#/headings/headings-cascade',
		css: 'div.stack h3',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h4',
		surface: 'heading',
		route: '#/headings/headings-cascade',
		css: 'div.stack h4',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h5',
		surface: 'heading',
		route: '#/headings/headings-cascade',
		css: 'div.stack h5',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h6',
		surface: 'heading',
		route: '#/headings/headings-cascade',
		css: 'div.stack h6',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-ul-outer',
		surface: 'list-ul',
		route: '#/lists/lists-bare',
		css: 'section#lists-bare > div.stack > ul',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-ul-nested',
		surface: 'list-ul',
		route: '#/lists/lists-bare',
		css: 'section#lists-bare > div.stack > ul li ul',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-ol-outer',
		surface: 'list-ol',
		route: '#/lists/lists-bare',
		css: 'section#lists-bare > div.stack > ol',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-ol-nested',
		surface: 'list-ol',
		route: '#/lists/lists-bare',
		css: 'section#lists-bare > div.stack > ol li ol',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-dl',
		surface: 'list-dl',
		route: '#/lists/lists-definition',
		css: 'section#lists-definition > dl',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-dl-dt',
		surface: 'list-dl',
		route: '#/lists/lists-definition',
		css: 'section#lists-definition > dl dt',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'list-dl-dd',
		surface: 'list-dl',
		route: '#/lists/lists-definition',
		css: 'section#lists-definition > dl dd',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'blockquote',
		surface: 'blockquote',
		route: '#/typography/typography-quotations',
		css: 'section#typography-quotations > blockquote',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'hr',
		surface: 'hr',
		route: '#/typography/typography-hr',
		css: 'section#typography-hr > hr',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'anchor',
		surface: 'anchor',
		route: '#/anchor/anchor-bare',
		css: 'section#anchor-bare > p > a[href="#anchor-bare"]',
		states: Object.freeze(['rest', 'hover']),
	}),
	Object.freeze({
		id: 'table-bare',
		surface: 'table-bare',
		route: '#/tables/tables-bare',
		css: 'section#tables-bare > table',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'table-bare-caption',
		surface: 'table-bare',
		route: '#/tables/tables-bare',
		css: 'section#tables-bare > table caption',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'table-bare-th',
		surface: 'table-bare',
		route: '#/tables/tables-bare',
		css: 'section#tables-bare > table th',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'table-bare-td',
		surface: 'table-bare',
		route: '#/tables/tables-bare',
		css: 'section#tables-bare > table td',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'table-striped-row',
		surface: 'table-striped',
		route: '#/tables/tables-striped',
		css: 'section#tables-striped > table.striped tbody tr',
		states: Object.freeze(['rest', 'hover']),
	}),
	Object.freeze({
		id: 'table-striped-cell',
		surface: 'table-striped',
		route: '#/tables/tables-striped',
		css: 'section#tables-striped > table.striped tbody tr td',
		states: Object.freeze(['rest', 'hover']),
	}),
	Object.freeze({
		id: 'table-bordered',
		surface: 'table-bordered',
		route: '#/tables/tables-bordered',
		css: 'section#tables-bordered > table.bordered',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'table-bordered-caption',
		surface: 'table-bordered',
		route: '#/tables/tables-bordered',
		css: 'section#tables-bordered > table.bordered caption',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'figure',
		surface: 'figure',
		route: '#/figures/figures-image',
		css: 'section#figures-image > figure',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'figcaption',
		surface: 'figure',
		route: '#/figures/figures-image',
		css: 'section#figures-image > figure figcaption',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'img-block',
		surface: 'img',
		route: '#/media/media-img',
		css: 'section#media-img > img',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'img-inline',
		surface: 'img',
		route: '#/media/media-img',
		css: 'section#media-img > p > img.inline',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'code-inline',
		surface: 'code-family',
		route: '#/typography/typography-code',
		css: 'section#typography-code li > code',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'pre',
		surface: 'code-family',
		route: '#/typography/typography-code',
		css: 'section#typography-code > pre',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'pre-code',
		surface: 'code-family',
		route: '#/typography/typography-code',
		css: 'section#typography-code > pre > code',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'kbd',
		surface: 'code-family',
		route: '#/typography/typography-code',
		css: 'section#typography-code kbd:first-of-type',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'samp',
		surface: 'code-family',
		route: '#/typography/typography-code',
		css: 'section#typography-code samp',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'var',
		surface: 'code-family',
		route: '#/typography/typography-code',
		css: 'section#typography-code var',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'small',
		surface: 'small-mark',
		route: '#/typography/typography-emphasis',
		css: 'section#typography-emphasis p > small',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'mark',
		surface: 'small-mark',
		route: '#/typography/typography-emphasis',
		css: 'section#typography-emphasis p > mark',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'abbr',
		surface: 'abbr',
		route: '#/typography/typography-meta',
		css: 'section#typography-meta abbr[title]',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'address',
		surface: 'address',
		route: '#/typography/typography-address',
		css: 'section#typography-address > address',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'sub',
		surface: 'sub-sup',
		route: '#/typography/typography-position',
		css: 'section#typography-position p > sub',
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'sup',
		surface: 'sub-sup',
		route: '#/typography/typography-position',
		css: 'section#typography-position p > sup',
		states: Object.freeze(['rest']),
	}),
])

// Order the record's surfaces once, so the rendered `.md` reads in one stable sequence rather
// than object-insertion order.
const SURFACE_ORDER = Object.freeze([
	'paragraph',
	'heading',
	'list-ul',
	'list-ol',
	'list-dl',
	'blockquote',
	'hr',
	'anchor',
	'table-bare',
	'table-striped',
	'table-bordered',
	'figure',
	'img',
	'code-family',
	'small-mark',
	'abbr',
	'address',
	'sub-sup',
])

async function verifyDigest() {
	const buffer = await readFile(SHOWCASE_PATH)
	const digest = createHash('sha256').update(buffer).digest('hex')
	if (digest !== SHOWCASE_DIGEST) {
		throw new Error(`showcase digest mismatch: expected ${SHOWCASE_DIGEST}, read ${digest}`)
	}
}

function resolveLocator(page, css) {
	return page.locator(css).first()
}

async function setMode(page, mode) {
	const button = page.getByRole('button', { name: /Switch theme \(currently (light|dark)\)/ })
	const label = await button.getAttribute('aria-label').catch(() => null)
	const current = (label ?? (await button.textContent().catch(() => ''))).includes('dark') ? 'dark' : 'light'
	if (current !== mode) await button.click()
	// The showcase writes `data-mode="dark"` and removes the attribute for light on the default
	// `'system'` boot, so an absent attribute reads as light (accepted instrument, 2026-09-20). A
	// post-toggle write sets `data-mode` explicitly for both modes, so this check still holds.
	await page.waitForFunction(
		(expected) => (document.documentElement.getAttribute('data-mode') ?? 'light') === expected,
		mode,
		{ timeout: 5000 },
	)
}

async function readElementStyle(locator, tokens, unknowns, context) {
	try {
		return await locator.evaluate(
			(element, args) => {
				const computed = getComputedStyle(element)
				const style = {}
				for (const property of args.properties) style[property] = computed.getPropertyValue(property)
				const custom = {}
				for (const token of args.tokens) custom[token] = computed.getPropertyValue(token)
				const rect = element.getBoundingClientRect()
				return { style, custom, rect: { width: rect.width, height: rect.height } }
			},
			{ properties: PROPERTIES, tokens },
		)
	} catch (error) {
		unknowns.push({ context, reason: 'element unreachable for style read', message: String(error) })
		return null
	}
}

async function driveHover(page, locator) {
	await locator.hover()
	return () => page.mouse.move(0, 0)
}

async function readSpecimen(page, specimen, unknowns) {
	const readings = {}
	await page.goto(SHOWCASE_URL + specimen.route, { waitUntil: 'load' })
	await page.reload({ waitUntil: 'load' })
	await page.addStyleTag({ content: ROOT_FONT_SIZE_CSS })
	const locator = resolveLocator(page, specimen.css)
	try {
		await locator.waitFor({ state: 'attached', timeout: 10000 })
	} catch (error) {
		unknowns.push({ context: specimen.id, reason: 'absent: selector not attached in showcase', message: `route ${specimen.route} css ${specimen.css}` })
		return null
	}
	const tokens = [...COMMON_TOKENS, ...(SURFACE_TOKENS[specimen.surface] ?? [])]
	for (const mode of MODES) {
		await setMode(page, mode)
		await page.waitForTimeout(SETTLE_MS)
		readings[mode] = {}
		for (const state of specimen.states) {
			let cleanup = async () => {}
			if (state === 'hover') cleanup = await driveHover(page, locator)
			await page.waitForTimeout(SETTLE_MS)
			readings[mode][state] = await readElementStyle(locator, tokens, unknowns, `${specimen.id}:${state}:${mode}`)
			await cleanup()
			await page.waitForTimeout(SETTLE_MS)
		}
	}
	return readings
}

async function runBrowser(browserConfig) {
	const outputDir = path.join(OUTPUT_ROOT, browserConfig.id)
	await mkdir(outputDir, { recursive: true })
	const unknowns = []
	const browser = await chromium.launch(browserConfig.launch)
	const version = browser.version()
	const page = await browser.newPage({ viewport: VIEWPORT })

	const specimenReadings = {}
	for (const specimen of SPECIMENS) {
		specimenReadings[specimen.id] = await readSpecimen(page, specimen, unknowns)
	}

	await browser.close()

	const output = {
		browser: browserConfig.id,
		version,
		date: new Date().toISOString(),
		showcaseDigest: SHOWCASE_DIGEST,
		specimens: specimenReadings,
		unknowns,
	}
	await writeFile(path.join(outputDir, 'readings.json'), JSON.stringify(output, null, 2))
	return output
}

function formatValue(value) {
	if (value === undefined || value === null || value === '') return '—'
	return `\`${value}\``
}

function renderSurfaceTable(surface, specimens, outputsByBrowser) {
	const rows = []
	for (const specimen of specimens.filter((candidate) => candidate.surface === surface)) {
		for (const state of specimen.states) {
			const propertyNames = [...PROPERTIES, ...[...COMMON_TOKENS, ...(SURFACE_TOKENS[surface] ?? [])]]
			for (const property of propertyNames) {
				const cells = []
				for (const browserId of Object.keys(outputsByBrowser)) {
					const output = outputsByBrowser[browserId]
					const reading = output.specimens[specimen.id]
					if (!reading) {
						cells.push('absent', 'absent')
						continue
					}
					for (const mode of MODES) {
						const stateReading = reading[mode]?.[state]
						if (!stateReading) {
							cells.push('absent')
							continue
						}
						const value = stateReading.style[property] ?? stateReading.custom[property]
						cells.push(formatValue(value))
					}
				}
				rows.push(`| \`${specimen.id}\` | ${state} | \`${property}\` | ${cells.join(' | ')} |`)
			}
		}
	}
	if (rows.length === 0) return null
	const browserIds = Object.keys(outputsByBrowser)
	const header = ['Specimen', 'State', 'Property']
	for (const browserId of browserIds) {
		header.push(`${browserId} light`, `${browserId} dark`)
	}
	const divider = header.map(() => '---')
	return [`### ${surface}`, '', `| ${header.join(' | ')} |`, `| ${divider.join(' | ')} |`, ...rows, ''].join('\n')
}

function renderAbsent(outputsByBrowser) {
	const lines = ['## Absent', '']
	let any = false
	for (const browserId of Object.keys(outputsByBrowser)) {
		for (const unknown of outputsByBrowser[browserId].unknowns) {
			any = true
			lines.push(`- \`${unknown.context}\` (${browserId}): ${unknown.reason} — ${unknown.message ?? ''}`)
		}
	}
	if (!any) lines.push('- none: every specimen selector was attached on both browsers.')
	lines.push('')
	return lines.join('\n')
}

async function renderRecord(outputsByBrowser) {
	const date = new Date().toISOString()
	const lines = [
		'# Content/layout calibration record',
		'',
		`Run date: ${date}. Showcase digest: \`${SHOWCASE_DIGEST}\`.`,
		'',
		'One table per surface: specimen, state, property, then light and dark readings per browser.',
		'',
	]
	for (const surface of SURFACE_ORDER) {
		const table = renderSurfaceTable(surface, SPECIMENS, outputsByBrowser)
		if (table) lines.push(table, '')
	}
	lines.push(renderAbsent(outputsByBrowser))
	await writeFile(RECORD_PATH, lines.join('\n'))
}

async function main() {
	await verifyDigest()
	await mkdir(OUTPUT_ROOT, { recursive: true })
	const outputsByBrowser = {}
	for (const browserConfig of BROWSERS) {
		try {
			outputsByBrowser[browserConfig.id] = await runBrowser(browserConfig)
		} catch (error) {
			console.error(`browser ${browserConfig.id} failed to launch or run: ${String(error)}`)
			process.exitCode = 1
		}
	}
	await renderRecord(outputsByBrowser)
}

main().catch((error) => {
	console.error(String(error && error.stack ? error.stack : error))
	process.exitCode = 1
})
