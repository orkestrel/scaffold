import type { SurfaceRow, Departure, ComponentSelector, AttributionRule } from './types.ts'
import type { Page } from '/home/user/veneer/node_modules/playwright/types/test.d.ts'
import { readSheet } from './lib.ts'

export async function mountPage(page: Page, url: string, width: number, theme = 'light', face = 'bootstrap') {
	await page.setViewportSize({ width, height: width === 390 ? 844 : 800 })
	await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' })
	await page.goto(url)
	await page.waitForSelector('main figure.card')
	await page.evaluate((theme) => { document.documentElement.setAttribute('data-bs-theme', theme) }, theme)
	await page.evaluate(() => document.fonts.ready)
	await setFace(page, face)
}
export async function setFace(page: Page, face: string) {
	await page.evaluate(({ face, css, raw }) => {
		const bootstrap = document.querySelector('#veneer-bootstrap')
		if (!(bootstrap instanceof HTMLStyleElement)) throw new Error('Bootstrap sheet absent')
		if (!bootstrap.dataset.original) bootstrap.dataset.original = bootstrap.textContent ?? ''
		bootstrap.textContent = face === 'tailwindcss' ? css : bootstrap.dataset.original
		document.querySelector('#flip-unexcluded')?.remove()
		if (face === 'unexcluded') {
			const style = document.createElement('style')
			style.id = 'flip-unexcluded'
			style.textContent = raw
			bootstrap.before(style)
		}
	}, { face, css: readSheet('recipe.css'), raw: readSheet('unexcluded.css') })
	await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
}
export function readSurface(input: { baseline?: boolean; components?: string[]; scope?: string; compare?: boolean; utilities?: string[]; lifted?: string; selectors?: readonly ComponentSelector[] }) {
	window.scrollTo(0, 0)
	for (const animation of document.getAnimations()) {
		if (animation.effect?.getTiming().iterations === Infinity) { animation.pause(); animation.currentTime = 0 }
		else { try { animation.finish() } catch {} }
	}
	const elements = [...document.querySelectorAll(input.scope ?? 'main, main *, body > .tooltip, body > .tooltip *, body > .popover, body > .popover *')]
	const names = new Map<Element, string>()
	for (const [index, element] of elements.entries()) names.set(element, `${index} ${element.localName} in #${element.parentElement?.closest('[id]')?.id ?? ''}`)
	const rows: SurfaceRow[] = []
	for (const element of elements) {
		const pseudos = ['']
		const style = getComputedStyle(element)
		if (element.getClientRects().length) {
			for (const pseudo of ['::before', '::after']) {
				const computed = getComputedStyle(element, pseudo)
				if (computed.content !== 'none' && computed.content !== 'normal' && computed.display !== 'none') pseudos.push(pseudo)
			}
			if (style.display.includes('list-item')) pseudos.push('::marker')
			if (element.matches(':placeholder-shown')) pseudos.push('::placeholder')
			if (element.matches(':modal, :popover-open')) pseudos.push('::backdrop')
		}
		for (const pseudo of pseudos) {
			const computed = pseudo ? getComputedStyle(element, pseudo) : style
			const values: Record<string, string> = {}
			for (let i = 0; i < computed.length; i++) {
				const name = computed[i]
				if (!name.startsWith('--')) values[name] = computed.getPropertyValue(name)
			}
			const box = element.getBoundingClientRect()
			rows.push({ key: `${names.get(element)}${pseudo}`, tag: element.localName, classes: [...element.classList], parent: names.get(element.parentElement ?? element) ?? '', pseudo, values, box: element.getClientRects().length ? [box.x, box.y, box.width, box.height] : null, markup: element.outerHTML.split('>')[0] + '>' })
		}
	}
	if (input.baseline) { window.flipBaseline = rows; return { elements: elements.length, subjects: rows.length, longhands: Object.keys(rows[0]?.values ?? {}).length } }
	if (!input.compare) return rows
	const baseline = window.flipBaseline
	if (!baseline) throw new Error('No baseline')
	const before = new Map(baseline.map((row) => [row.key, row]))
	const after = new Map(rows.map((row) => [row.key, row]))
	const rules: AttributionRule[] = []
	const exact = new Set(input.utilities?.map((name) => `.${CSS.escape(name)}`))
	const pending = [...document.styleSheets].filter((sheet) => sheet.ownerNode instanceof Element && sheet.ownerNode.id === 'veneer-bootstrap').flatMap((sheet) => [...sheet.cssRules].map((rule) => ({ rule, layer: '', selector: '' })))
	const withheld = new CSSStyleSheet()
	withheld.replaceSync(input.lifted ?? '')
	pending.push(...[...withheld.cssRules].map((rule) => ({ rule, layer: 'withheld', selector: '' })))
	while (pending.length) {
		const entry = pending.shift()
		if (!entry) continue
		const { rule, layer } = entry
		if (rule instanceof CSSStyleRule) {
			const selector = rule.selectorText.includes('&') ? rule.selectorText.replaceAll('&', entry.selector) : rule.selectorText
			if (['base', 'utilities', 'reset', 'withheld', 'bootstrap', ''].includes(layer) && (!['utilities', 'withheld'].includes(layer) || exact.has(selector))) rules.push({ selector, names: [...rule.style], layer })
			pending.unshift(...[...rule.cssRules].map((child) => ({ rule: child, layer, selector })))
		} else if (rule instanceof CSSLayerBlockRule) pending.unshift(...[...rule.cssRules].map((child) => ({ rule: child, layer: layer === 'withheld' ? layer : rule.name, selector: entry.selector })))
		else if (rule instanceof CSSMediaRule && matchMedia(rule.conditionText).matches || rule instanceof CSSSupportsRule && CSS.supports(rule.conditionText)) pending.unshift(...[...rule.cssRules].map((child) => ({ rule: child, layer, selector: entry.selector })))
		else if ('style' in rule && rule.style instanceof CSSStyleDeclaration && ['base', 'utilities', 'reset', 'bootstrap', ''].includes(layer)) rules.push({ selector: entry.selector, names: [...rule.style], layer })
	}
	// Initial values let CSSOM expand declarations even when their authored value contains var().
	const expansion = document.createElement('span').style
	for (const rule of rules) {
		const names = new Set(rule.names)
		for (const name of rule.names) {
			expansion.cssText = ''
			expansion.setProperty(name, 'initial')
			for (const longhand of expansion) names.add(longhand)
			if (name === 'border') for (const side of ['top', 'right', 'bottom', 'left', 'block-start', 'block-end', 'inline-start', 'inline-end']) for (const suffix of ['width', 'style', 'color']) names.add(`border-${side}-${suffix}`)
			if (name === 'border-radius') for (const corner of ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'start-start', 'start-end', 'end-start', 'end-end']) names.add(`border-${corner}-radius`)
			if (['margin', 'padding', 'inset'].includes(name)) for (const side of ['top', 'right', 'bottom', 'left', 'block-start', 'block-end', 'inline-start', 'inline-end']) names.add(name === 'inset' && ['top', 'right', 'bottom', 'left'].includes(side) ? side : `${name}-${side}`)
			if (name === 'gap') { names.add('row-gap'); names.add('column-gap') }
		}
		rule.names = [...names]
	}
	const classes = new Map<string, AttributionRule[]>()
	const broad: AttributionRule[] = []
	for (const rule of rules) {
		const name = rule.selector.match(/^\.([a-zA-Z0-9_-]+)$/)?.[1]
		if (name) {
			const entries = classes.get(name) ?? []
			entries.push(rule)
			classes.set(name, entries)
		} else broad.push(rule)
	}
	const departures: Departure[] = []
	const counts: Record<string, number> = { utility: 0, resolved: 0, preflight: 0, inherited: 0, unattributed: 0, layout: 0, invisible: 0, admitted: 0 }
	const widened = new Map<Element, string>()
	const roots: Record<string, number> = {}
	for (const element of elements) {
		if ([...element.classList].some((name) => input.components?.includes(name))) continue
		if (!input.selectors?.some((rule) => { try { return element.matches(rule.selector) } catch { return false } })) continue
		let ancestor = element.parentElement
		while (ancestor) {
			const root = [...ancestor.classList].find((name) => input.components?.includes(name))
			if (root) { widened.set(element, root); roots[root] = (roots[root] ?? 0) + 1; break }
			ancestor = ancestor.parentElement
		}
	}
	const absorbed: Record<string, number> = { preflight: 0, inherited: 0, unattributed: 0 }
	for (const row of rows) {
		const previous = before.get(row.key)
		if (!previous) continue
		const element = elements[Number.parseInt(row.key)]
		if (!element) continue
		if (input.components && !row.classes.some((name) => input.components?.includes(name)) && !widened.has(element)) continue
		const candidates = [...broad, ...row.classes.flatMap((name) => classes.get(name) ?? [])]
		const matched = candidates.filter((rule) => {
			if (!['base', 'utilities', 'reset', 'withheld', 'bootstrap', ''].includes(rule.layer)) return false
			if (['utilities', 'withheld'].includes(rule.layer) && (row.pseudo || !row.classes.some((name) => input.utilities?.includes(name) && rule.selector === `.${CSS.escape(name)}`))) return false
			try {
				if (!row.pseudo) return element.matches(rule.selector)
				if (!rule.selector.includes(row.pseudo)) return false
				return element.matches(rule.selector.replaceAll(row.pseudo, ''))
			} catch { return false }
		})
		for (const [property, F] of Object.entries(row.values)) {
			const A = previous.values[property] ?? ''
			if (A === F) continue
			const aliases = [property]
			const sides: Record<string, string> = row.values.direction === 'rtl' ? { top: 'block-start', bottom: 'block-end', left: 'inline-end', right: 'inline-start' } : { top: 'block-start', bottom: 'block-end', left: 'inline-start', right: 'inline-end' }
			for (const [physical, logical] of Object.entries(sides)) {
				if (property.includes(`-${physical}`)) aliases.push(property.replace(`-${physical}`, `-${logical}`))
				if (property.includes(`-${logical}`)) aliases.push(property.replace(`-${logical}`, `-${physical}`))
			}
			const corners: Record<string, string> = row.values.direction === 'rtl' ? { 'top-left': 'start-end', 'top-right': 'start-start', 'bottom-left': 'end-end', 'bottom-right': 'end-start' } : { 'top-left': 'start-start', 'top-right': 'start-end', 'bottom-left': 'end-start', 'bottom-right': 'end-end' }
			for (const [physical, logical] of Object.entries(corners)) {
				if (property === `border-${physical}-radius`) aliases.push(`border-${logical}-radius`)
				if (property === `border-${logical}-radius`) aliases.push(`border-${physical}-radius`)
			}
			let inherited = false
			if (/^(color|font-.+|line-height|letter-spacing|word-spacing|text-align|text-indent|text-transform|white-space|visibility|cursor|list-style-.+|quotes|tab-size)$/.test(property)) {
				let ancestor = row.pseudo ? element : element.parentElement
				while (ancestor) {
					const key = names.get(ancestor)
					const A = key ? before.get(key)?.values[property] : undefined
					const F = key ? after.get(key)?.values[property] : undefined
					if (A !== undefined && F !== undefined && A !== F) { inherited = true; break }
					ancestor = ancestor.parentElement
				}
			}
			let attribution = ''
			if (property === 'height' && row.tag === 'img' && element.hasAttribute('height')) attribution = 'admitted'
			else if (/^(width|height|inline-size|block-size|top|right|bottom|left|inset.*|perspective-origin|transform-origin)$/.test(property)) attribution = 'layout'
			else if (property === 'tab-size' || property === 'text-decoration' || property === 'line-height' && previous.values['font-size'] !== row.values['font-size'] || property.startsWith('list-style-') && !row.values.display.includes('list-item') || /^border-.*-style$/.test(property) && A === 'none' && F === 'solid' && row.values[property.replace(/style$/, 'width')] === '0px') attribution = 'invisible'
			else if (matched.some((rule) => ['utilities', 'withheld'].includes(rule.layer) && aliases.some((name) => rule.names.includes(name)))) attribution = 'utility'
			else if (matched.some((rule) => ['bootstrap', ''].includes(rule.layer) && aliases.some((name) => rule.names.includes(name)))) {
				attribution = 'resolved'
				const prior = matched.some((rule) => rule.layer === 'base' && aliases.some((name) => rule.names.includes(name))) ? 'preflight' : inherited ? 'inherited' : 'unattributed'
				absorbed[prior]++
			}
			else if (matched.some((rule) => rule.layer === 'base' && aliases.some((name) => rule.names.includes(name)))) attribution = 'preflight'
			else if (inherited) attribution = 'inherited'
			else attribution = 'unattributed'
			counts[attribution] = (counts[attribution] ?? 0) + 1
			if (['preflight', 'unattributed', 'admitted'].includes(attribution)) departures.push({ key: row.key, tag: row.tag, classes: row.classes, pseudo: row.pseudo, property, A, F, attribution, reboot: matched.some((rule) => rule.layer === 'reset' && aliases.some((name) => rule.names.includes(name))), markup: row.markup, ...(widened.has(element) ? { root: widened.get(element) } : {}) })
		}
	}
	return { elements: elements.length, subjects: rows.length, counts, departures, widened: widened.size, roots, absorbed }
}
export async function openFamily(page: Page, family: string) {
	const selectors: Record<string, string> = {
		tooltip: '#tooltips [data-bs-toggle="tooltip"]', popover: '#popovers [data-bs-toggle="popover"]', dropdown: '#dropdowns [data-bs-toggle="dropdown"]', modal: '[data-bs-target="#modal-live-archive"]', offcanvas: '[data-bs-target="#offcanvas-live-start"]', toast: '[aria-controls="toasts-live-toast"]',
	}
	const selector = selectors[family]
	if (!selector) throw new Error(`Unknown family ${family}`)
	await page.evaluate((family) => {
		window.flipEvents = []
		document.addEventListener(`shown.bs.${family}`, (event) => { window.flipEvents?.push(event.type) }, { once: true })
	}, family)
	const trigger = page.locator(selector).first()
	await trigger.click()
	await page.waitForFunction((family) => window.flipEvents?.includes(`shown.bs.${family}`), family, { timeout: 10000 })
	await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
	return `shown.bs.${family}`
}
