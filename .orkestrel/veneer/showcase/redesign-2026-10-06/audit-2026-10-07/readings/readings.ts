import type { Locator, Page } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { mkdirSync, writeFileSync } from 'node:fs'
// Usage: node readings.ts OUT_DIR WIDTH THEME PAGE_HTML — under the Bootstrap face and the Tailwind + layer face, takes the audit readings E1 to E13 on a fresh page each, writes each reading's computed values as one entry in OUT_DIR/log.json, and screenshots each reading into OUT_DIR/FACE/. Exits 1 when a reading records an error or is missing.
const [out, widthText, theme, file] = process.argv.slice(2)
const width = Number(widthText)
const FACES = ['Bootstrap', 'Tailwind + layer']
const HEIGHT = 844

interface Context {
	readonly page: Page
	readonly face: string
	readonly dir: string
	readonly shot: (name: string) => Promise<string>
}
type Values = Record<string, unknown>

const slug = (text: string): string =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')

async function center(locator: Locator): Promise<void> {
	// Bootstrap's reboot sets smooth scrolling on the root; an instant scroll keeps every read after it settled.
	await locator.evaluate((element) =>
		element.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' }),
	)
	await locator.page().waitForTimeout(150)
}

// A focus scroll follows the root's smooth scrolling, so reads wait until the page stops moving.
async function still(page: Page): Promise<void> {
	await page.evaluate(
		() =>
			new Promise<void>((resolve) => {
				let last = Number.NaN
				let same = 0
				let frames = 0
				const tick = () => {
					const position = window.scrollY
					same = position === last ? same + 1 : 0
					last = position
					frames += 1
					if (same >= 3 || frames > 120) resolve()
					else requestAnimationFrame(tick)
				}
				requestAnimationFrame(tick)
			}),
	)
}

async function styles(locator: Locator, names: readonly string[]): Promise<Record<string, string>> {
	return locator.evaluate((element, list) => {
		const style = getComputedStyle(element)
		return Object.fromEntries(list.map((name) => [name, style.getPropertyValue(name).trim()]))
	}, names)
}

async function box(locator: Locator): Promise<Values> {
	return locator.evaluate((element) => {
		const round = (value: number) => Math.round(value * 10) / 10
		const rect = element.getBoundingClientRect()
		return {
			x: round(rect.x),
			y: round(rect.y),
			width: round(rect.width),
			height: round(rect.height),
		}
	})
}

// Shift+Tab then Tab lands keyboard focus on the target, so :focus-visible matches as it does for a person tabbing.
async function tabTo(page: Page, locator: Locator): Promise<Values> {
	await locator.focus()
	await page.keyboard.press('Shift+Tab')
	await page.keyboard.press('Tab')
	await still(page)
	await page.waitForTimeout(400)
	return locator.evaluate((element) => ({
		focused: document.activeElement === element,
		focusVisible: element.matches(':focus-visible'),
	}))
}

async function counts(page: Page): Promise<Values> {
	return page.evaluate(() => ({
		modal: document.querySelectorAll('.modal.show').length,
		offcanvas: document.querySelectorAll('.offcanvas.show').length,
		dropdown: document.querySelectorAll('.dropdown-menu.show').length,
		collapse: document.querySelectorAll('.collapse.show').length,
		tips: document.querySelectorAll('.tooltip.show, .popover.show').length,
		backdrop: document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop').length,
	}))
}

async function tip(trigger: Locator): Promise<Values> {
	return trigger.evaluate((element) => {
		const round = (value: number) => Math.round(value * 10) / 10
		const rect = (target: Element) => {
			const area = target.getBoundingClientRect()
			return {
				x: round(area.x),
				y: round(area.y),
				width: round(area.width),
				height: round(area.height),
			}
		}
		const tooltips = document.querySelectorAll('.tooltip[id]').length
		const panel = (element.getAttribute('aria-describedby') ?? '')
			.split(/\s+/)
			.map((id) => (id ? document.getElementById(id) : null))
			.find((node) => node?.classList.contains('tooltip'))
		if (!panel || !panel.classList.contains('show')) return { open: false, liveTooltips: tooltips }
		const near = element.getBoundingClientRect()
		const far = panel.getBoundingClientRect()
		const side =
			far.top >= near.bottom - 1
				? 'below'
				: far.bottom <= near.top + 1
					? 'above'
					: far.left >= near.right - 1
						? 'right'
						: far.right <= near.left + 1
							? 'left'
							: 'overlapping'
		return {
			open: true,
			liveTooltips: tooltips,
			text: panel.textContent?.trim(),
			placement: panel.getAttribute('data-popper-placement'),
			classes: panel.className,
			side,
			panel: rect(panel),
			trigger: rect(element),
		}
	})
}

// The section holds frozen tooltip previews, so the wait follows the panel that the trigger names.
async function settled(trigger: Locator, timeout: number): Promise<boolean> {
	const handle = await trigger.elementHandle()
	return trigger
		.page()
		.waitForFunction(
			(element) =>
				!(element.getAttribute('aria-describedby') ?? '')
					.split(/\s+/)
					.some((id) => {
						const panel = id ? document.getElementById(id) : null
						return panel?.classList.contains('tooltip') && panel.classList.contains('show')
					}),
			handle,
			{ timeout },
		)
		.then(
			() => true,
			() => false,
		)
}

interface ProtocolNode {
	readonly nodeId: number
	readonly attributes?: readonly string[]
	readonly children?: readonly ProtocolNode[]
	readonly shadowRoots?: readonly ProtocolNode[]
}

function find(
	node: ProtocolNode,
	test: (candidate: ProtocolNode) => boolean,
): ProtocolNode | undefined {
	if (test(node)) return node
	for (const child of [...(node.children ?? []), ...(node.shadowRoots ?? [])]) {
		const found = find(child, test)
		if (found) return found
	}
	return undefined
}

function attribute(node: ProtocolNode, name: string): string | undefined {
	const list = node.attributes ?? []
	for (let index = 0; index < list.length; index += 2) if (list[index] === name) return list[index + 1]
	return undefined
}

// getComputedStyle returns the input's own style for ::-webkit-slider-thumb, so the thumb is read from its user-agent shadow node.
async function thumb(page: Page, selector: string, names: readonly string[]): Promise<Values> {
	const session = await page.context().newCDPSession(page)
	try {
		await session.send('DOM.enable')
		await session.send('CSS.enable')
		const { root } = await session.send('DOM.getDocument', { depth: -1, pierce: true })
		const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector })
		const input = find(root, (node) => node.nodeId === nodeId)
		const target =
			input &&
			find(
				input,
				(node) =>
					node.nodeId !== nodeId &&
					(attribute(node, 'pseudo') === '-webkit-slider-thumb' || attribute(node, 'id') === 'thumb'),
			)
		if (!target) return { unresolved: 'no slider thumb node in the user-agent shadow tree' }
		const { computedStyle } = await session.send('CSS.getComputedStyleForNode', { nodeId: target.nodeId })
		const style = computedStyle as readonly { readonly name: string; readonly value: string }[]
		return Object.fromEntries(names.map((name) => [name, style.find((entry) => entry.name === name)?.value ?? '']))
	} catch (error) {
		return { unresolved: String(error).slice(0, 200) }
	} finally {
		await session.detach()
	}
}

async function tables({ page, shot }: Context): Promise<Values> {
	const table = page.locator('#tables-striped table')
	const row = table.locator('tbody tr').nth(1)
	const names = [
		'background-color',
		'box-shadow',
		'color',
		'--bs-table-bg-state',
		'--bs-table-bg-type',
		'--bs-table-bg',
		'--bs-table-hover-bg',
	]
	const cells = () =>
		row.evaluate(
			(element, list) =>
				[...element.children].map((cell) => {
					const style = getComputedStyle(cell)
					return {
						cell: cell.textContent?.trim(),
						...Object.fromEntries(list.map((name) => [name, style.getPropertyValue(name).trim()])),
					}
				}),
			names,
		)
	await center(table)
	const rest = await cells()
	await row.hover()
	await page.waitForTimeout(400)
	const hovered = await row.evaluate((element) => element.matches(':hover'))
	const hover = await cells()
	const shots = [await shot('E1-row-hover')]
	await page.mouse.move(0, 0)
	const region = page.locator('#tables div.table-responsive[role="region"]')
	const outline = ['outline-style', 'outline-width', 'outline-color', 'outline-offset', 'box-shadow']
	await center(region)
	const regionRest = await styles(region, outline)
	const focus = await tabTo(page, region)
	await center(region)
	const regionFocus = await styles(region, outline)
	shots.push(await shot('E1-region-focus'))
	return {
		row: { table: '#tables-striped table', bodyRow: 2, hovered, rest, hover },
		region: { rest: regionRest, ...focus, focus: regionFocus },
		shots,
	}
}

const CONTROLS = [
	['text input', '#form-controls-email'],
	['select', '#select-port'],
	['checkbox', '#checks-radios-insured'],
	['switch', '#checks-radios-alerts'],
	['range', '#range-pallets'],
	['is-invalid input', '#validation-weight'],
] as const

async function forms({ page, shot }: Context): Promise<Values> {
	const names = [
		'box-shadow',
		'border-color',
		'border-width',
		'outline-style',
		'outline-width',
		'outline-color',
		'background-color',
	]
	const thumbNames = ['box-shadow', 'background-color', 'border-color', 'width', 'height']
	const controls: Values[] = []
	const shots: string[] = []
	for (const [kind, selector] of CONTROLS) {
		const control = page.locator(selector)
		await center(control)
		const rest = await styles(control, names)
		const thumbRest = kind === 'range' ? await thumb(page, selector, thumbNames) : undefined
		const focus = await tabTo(page, control)
		await center(control)
		const entry: Values = { kind, selector, rest, ...focus, focus: await styles(control, names) }
		if (thumbRest) {
			entry.thumbRest = thumbRest
			entry.thumbFocus = await thumb(page, selector, thumbNames)
		}
		controls.push(entry)
		shots.push(await shot(`E2-${slug(kind)}-focus`))
	}
	return { controls, shots }
}

async function alerts({ page, shot }: Context): Promise<Values> {
	const alert = page.locator('#alerts .alert-dismissible', { hasText: 'Unsaved changes.' })
	await center(alert)
	const handle = await alert.elementHandle()
	const before = {
		count: await alert.count(),
		classes: await alert.getAttribute('class'),
		box: await box(alert),
	}
	const started = Date.now()
	await alert.locator('.btn-close').click()
	const removed = await page
		.waitForFunction((element) => !element.isConnected, handle, { timeout: 3000 })
		.then(
			() => true,
			() => false,
		)
	const elapsed = Date.now() - started
	await page.waitForTimeout(200)
	const after = await handle.evaluate((element) => ({
		connected: element.isConnected,
		classes: element.className,
		opacity: getComputedStyle(element).opacity,
	}))
	const shots = [await shot('E3-after-dismiss')]
	return {
		alert: '#alerts .alert-warning.alert-dismissible (Unsaved changes)',
		before,
		removed,
		removedWithinMs: removed ? elapsed : undefined,
		after: { ...after, count: await alert.count() },
		shots,
	}
}

async function caption({ page, shot }: Context): Promise<Values> {
	const carousel = page.locator('#carousel-slides')
	const node = carousel.locator('.carousel-item.active .carousel-caption')
	await center(carousel)
	const names = ['font-size', 'font-weight', 'line-height', 'margin-bottom', 'color']
	const read = (selector: string) =>
		node.evaluate(
			(element, [target, list]) => {
				const found = element.querySelector(target)
				if (!found) return null
				const style = getComputedStyle(found)
				return {
					tag: found.tagName.toLowerCase(),
					className: found.className,
					text: found.textContent?.trim(),
					...Object.fromEntries(list.map((name) => [name, style.getPropertyValue(name).trim()])),
				}
			},
			[selector, names] as const,
		)
	const captionDisplay = await node.evaluate((element) => getComputedStyle(element).display)
	const bareSpecimen = await page.evaluate(
		() => document.querySelector('#carousel .carousel-caption > h5:not([class])') !== null,
	)
	const shipped = { heading: await read('h4, h5'), paragraph: await read('p') }
	// The build holds no bare h5 caption, so the reading swaps one into the active slide and restores the shipped heading after the screenshot.
	const original = await node.evaluateHandle((element) => element.querySelector('h4'))
	await node.evaluate((element, heading) => {
		if (!heading) return
		const bare = document.createElement('h5')
		bare.textContent = heading.textContent
		heading.replaceWith(bare)
	}, original)
	const bare = { heading: await read('h5'), paragraph: await read('p') }
	const shots = [await shot('E4-bare-h5-caption')]
	await node.evaluate((element, heading) => {
		if (heading) element.querySelector('h5')?.replaceWith(heading)
	}, original)
	return {
		caption: '#carousel-slides .carousel-item.active .carousel-caption',
		captionDisplay,
		bareSpecimenInBuild: bareSpecimen,
		shipped,
		bare,
		shots,
	}
}

async function sliding({ page, shot }: Context): Promise<Values> {
	const carousel = page.locator('#carousel-slides')
	await center(carousel)
	const state = () =>
		carousel.evaluate((element) => {
			const items = [...element.querySelectorAll('.carousel-item')]
			const indicators = [...element.querySelectorAll('[data-bs-slide-to]')]
			const active = items.findIndex((item) => item.classList.contains('active'))
			return {
				active,
				heading: items[active]?.querySelector('h4, h5')?.textContent?.trim(),
				sliding: items.some((item) => /carousel-item-(next|prev|start|end)/.test(item.className)),
				indicator: indicators.findIndex((item) => item.classList.contains('active')),
				indicatorCurrent: indicators.findIndex((item) => item.getAttribute('aria-current') === 'true'),
				indicatorOpacity: indicators.map((item) => getComputedStyle(item).opacity),
			}
		})
	const settle = (index: number) =>
		page
			.waitForFunction(
				(target) => {
					const items = [...document.querySelectorAll('#carousel-slides .carousel-item')]
					return (
						items[target]?.classList.contains('active') &&
						!items.some((item) => /carousel-item-(next|prev|start|end)/.test(item.className))
					)
				},
				index,
				{ timeout: 4000 },
			)
			.then(
				() => true,
				() => false,
			)
	const before = await state()
	await page.locator('[data-bs-target="#carousel-slides"][data-bs-slide="next"]').click()
	const nextSettled = await settle(1)
	await page.waitForTimeout(200)
	const afterNext = await state()
	const shots = [await shot('E5-after-next')]
	await page.locator('[data-bs-target="#carousel-slides"][data-bs-slide-to="2"]').click()
	const slideToSettled = await settle(2)
	await page.waitForTimeout(200)
	const afterSlideTo = await state()
	shots.push(await shot('E5-after-slide-to-2'))
	return {
		carousel: '#carousel-slides',
		before,
		next: { settled: nextSettled, ...afterNext },
		slideTo2: { settled: slideToSettled, ...afterSlideTo },
		shots,
	}
}

async function toast({ page, shot }: Context): Promise<Values> {
	const button = page.getByRole('button', { name: 'Show the upload toast', exact: true })
	const panel = page.locator('#toasts-live-toast')
	await center(button)
	const state = () =>
		panel.evaluate((element) => {
			const round = (value: number) => Math.round(value * 10) / 10
			const rect = element.getBoundingClientRect()
			const root = document.documentElement
			const close = element.querySelector('.btn-close')?.getBoundingClientRect()
			const container = element.parentElement ? getComputedStyle(element.parentElement) : undefined
			return {
				classes: element.className,
				display: getComputedStyle(element).display,
				opacity: getComputedStyle(element).opacity,
				box: { x: round(rect.x), y: round(rect.y), width: round(rect.width), height: round(rect.height) },
				gapEnd: round(root.clientWidth - rect.right),
				gapBottom: round(root.clientHeight - rect.bottom),
				containerPadding: container?.padding,
				header: element.querySelector('.toast-header strong')?.textContent?.trim(),
				timestamp: element.querySelector('.toast-header small')?.textContent?.trim(),
				body: element.querySelector('.toast-body')?.textContent?.trim(),
				closeBox: close
					? { x: round(close.x), y: round(close.y), width: round(close.width), height: round(close.height) }
					: null,
			}
		})
	const before = await state()
	await button.click()
	const shown = await page
		.waitForFunction(
			() => {
				const element = document.getElementById('toasts-live-toast')
				return element?.classList.contains('show') && !element.classList.contains('showing')
			},
			null,
			{ timeout: 3000 },
		)
		.then(
			() => true,
			() => false,
		)
	await page.waitForTimeout(500)
	const after = await state()
	const shots = [await shot('E6-toast-shown')]
	return { toast: '#toasts-live-toast', before, shown, after, shots }
}

async function tooltips({ page, shot }: Context): Promise<Values> {
	const right = page.getByRole('button', { name: 'Hint to the right', exact: true })
	const below = page.getByRole('button', { name: 'Hint below', exact: true })
	await center(right)
	await right.click()
	await page.waitForTimeout(500)
	const previous = await tip(right)
	const blocked = await below.evaluate((element) => {
		const rect = element.getBoundingClientRect()
		const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
		return {
			hitIsTrigger: hit !== null && element.contains(hit),
			hit: hit ? `${hit.tagName.toLowerCase()}.${String(hit.className).trim().split(/\s+/).join('.')}` : null,
		}
	})
	await page.keyboard.press('Escape')
	const escapeSettled = await settled(right, 1500)
	let settledBy = escapeSettled ? 'Escape' : ''
	if (!settledBy) {
		// The engine's tooltip ignores Escape, so a click on the caption takes the pointer and focus off the trigger.
		await page.locator('#tooltips figcaption').first().click({ position: { x: 4, y: 4 } })
		settledBy = (await settled(right, 2000)) ? 'click on the Live tooltips figure caption' : ''
	}
	// The panel loses show before its fade ends, and the fading panel still covers Hint below.
	await page.waitForTimeout(300)
	const previousAfterSettle = await tip(right)
	const clear = await below.evaluate((element) => {
		const rect = element.getBoundingClientRect()
		const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
		return hit !== null && element.contains(hit)
	})
	const clickError = await below.click({ timeout: 3000 }).then(
		() => undefined,
		(error: unknown) => String(error).slice(0, 200),
	)
	await page.waitForTimeout(600)
	const hint = await tip(below)
	const shots = [await shot('E7-hint-below')]
	const values: Values = {
		previous: { trigger: 'Hint to the right', ...previous, hintBelowCenter: blocked },
		escapeSettled,
		settled: settledBy !== '',
		settledBy,
		previousAfterSettle,
		hintBelowCenterIsTriggerAfterSettle: clear,
		hintBelow: hint,
		shots,
	}
	if (!settledBy) values.error = 'the Hint to the right tooltip did not leave'
	if (clickError) values.error = `Hint below click: ${clickError}`
	return values
}

async function focusRing({ page, shot }: Context): Promise<Values> {
	const links = page.locator('#focus-ring a.focus-ring')
	const total = await links.count()
	const names = [
		'box-shadow',
		'outline-style',
		'outline-width',
		'outline-color',
		'border-color',
		'--bs-focus-ring-color',
	]
	const entries: Values[] = []
	const shots: string[] = []
	for (let index = 0; index < total; index += 1) {
		const link = links.nth(index)
		const text = ((await link.textContent()) ?? '').trim()
		await center(link)
		const rest = await styles(link, ['box-shadow'])
		const focus = await tabTo(page, link)
		await center(link)
		entries.push({ text, restBoxShadow: rest['box-shadow'], ...focus, focus: await styles(link, names) })
		shots.push(await shot(`E8-${String(index).padStart(2, '0')}-${slug(text)}`))
	}
	return { links: entries, shots }
}

async function iconLink({ page, shot }: Context): Promise<Values> {
	const entries: Values[] = []
	const shots: string[] = []
	for (const text of ['Continue to billing', 'Confirm the pickup']) {
		const link = page.locator('#icon-link a.icon-link-hover', { hasText: text })
		const icon = link.locator('svg.bi')
		await center(link)
		const rest = await styles(icon, ['transform', 'transition-property', 'transition-duration'])
		await link.hover()
		await page.waitForTimeout(500)
		const hovered = await link.evaluate((element) => element.matches(':hover'))
		const hover = (await styles(icon, ['transform'])).transform
		shots.push(await shot(`E9-${slug(text)}-hover`))
		await page.mouse.move(0, 0)
		await page.waitForTimeout(500)
		const afterLeave = (await styles(icon, ['transform'])).transform
		const focus = await tabTo(page, link)
		await center(link)
		const focused = (await styles(icon, ['transform'])).transform
		shots.push(await shot(`E9-${slug(text)}-focus`))
		entries.push({ text, rest, hovered, hover, afterLeave, ...focus, focus: focused })
	}
	return { links: entries, shots }
}

const SPECIMENS = [
	['card image', '#stretched-link-card .card-body > .card', 'img.card-img-top'],
	['media thumbnail', '#stretched-link-media .position-relative', 'img'],
] as const

async function stretched({ page, shot }: Context): Promise<Values> {
	const specimens: Values[] = []
	const shots: string[] = []
	for (const [name, root, target] of SPECIMENS) {
		const container = page.locator(root)
		await center(container)
		const reading = await container.evaluate((element, selector) => {
			const round = (value: number) => Math.round(value * 10) / 10
			const describe = (node: Element | null) =>
				node
					? `${node.tagName.toLowerCase()}${String(node.className).trim() ? `.${String(node.className).trim().split(/\s+/).join('.')}` : ''}`
					: null
			const link = element.querySelector('a.stretched-link')
			const image = element.querySelector(selector)
			const inset = 2
			const corners = (rect: DOMRect) => ({
				topLeft: [rect.left + inset, rect.top + inset],
				topRight: [rect.right - inset, rect.top + inset],
				bottomLeft: [rect.left + inset, rect.bottom - inset],
				bottomRight: [rect.right - inset, rect.bottom - inset],
			})
			const hits = (rect: DOMRect) =>
				Object.fromEntries(
					Object.entries(corners(rect)).map(([corner, [x, y]]) => {
						const hit = document.elementFromPoint(x, y)
						return [corner, { x: round(x), y: round(y), hit: describe(hit), isLink: hit === link }]
					}),
				)
			const after = link ? getComputedStyle(link, '::after') : undefined
			return {
				link: describe(link),
				linkText: link?.textContent?.trim(),
				linkPosition: link ? getComputedStyle(link).position : null,
				after: after
					? {
							content: after.content,
							position: after.position,
							inset: after.inset,
							zIndex: after.zIndex,
						}
					: null,
				containerPosition: getComputedStyle(element).position,
				image: image ? hits(image.getBoundingClientRect()) : null,
				container: hits(element.getBoundingClientRect()),
			}
		}, target)
		specimens.push({ specimen: name, root, ...reading })
		shots.push(await shot(`E10-${slug(name)}`))
	}
	return { specimens, shots }
}

async function skipLink({ page, shot }: Context): Promise<Values> {
	const link = page.locator('#visually-hidden-focusable a.visually-hidden-focusable')
	const names = [
		'position',
		'width',
		'height',
		'clip',
		'clip-path',
		'overflow',
		'white-space',
		'color',
		'text-decoration-line',
		'text-decoration-color',
		'box-shadow',
		'outline-style',
		'outline-width',
		'outline-color',
	]
	await center(link.locator('xpath=..'))
	const rest = { box: await box(link), ...(await styles(link, names)) }
	const focus = await tabTo(page, link)
	await center(link)
	const focused = { box: await box(link), ...(await styles(link, names)) }
	const shots = [await shot('E11-skip-link-focus')]
	return { link: 'Skip to the shipment list', rest, ...focus, focus: focused, shots }
}

async function scrollspy({ page, face, dir }: Context): Promise<Values> {
	const state = () =>
		page.evaluate(() => {
			const region = document.getElementById('engine-demo')
			const record = window as unknown as { __intersections?: unknown[] }
			return {
				active: [...document.querySelectorAll('#example-navigation .nav-link.active')].map((link) =>
					link.textContent?.trim(),
				),
				scrollTop: region?.scrollTop,
				scrollHeight: region?.scrollHeight,
				clientHeight: region?.clientHeight,
				offsetTop: Object.fromEntries(
					['feedback', 'disclosure', 'overlays', 'motion'].map((id) => [
						id,
						document.getElementById(id)?.offsetTop,
					]),
				),
				entries: record.__intersections?.splice(0) ?? null,
			}
		})
	const steps: Values[] = [{ step: 'load under Bootstrap', ...(await state()) }]
	// The Bootstrap face's reading returns from the layer, so both faces read the state after a real switch.
	const switches = face === 'Bootstrap' ? ['Tailwind + layer', 'Bootstrap'] : ['Tailwind + layer']
	for (const target of switches) {
		await page.getByRole('button', { name: target, exact: true }).first().click()
		await page.waitForTimeout(1000)
		steps.push({ step: `switch to ${target}`, ...(await state()) })
	}
	// The section capture replays capture-faces.ts, whose element screenshot sends the delivery that D19 names.
	const section = page.locator('section[id="live-components"]')
	await section.scrollIntoViewIfNeeded()
	const name = 'E12-section-capture'
	await section.screenshot({ path: `${dir}/${name}.png`, animations: 'disabled', timeout: 30000 })
	await page.waitForTimeout(1000)
	steps.push({ step: 'section capture', ...(await state()) })
	return { switches, steps, shots: [`${dir.split('/').pop()}/${name}.png`] }
}

// Records what the scrollspy's observer receives without changing what the engine does with it.
function recordIntersections(): void {
	const Native = window.IntersectionObserver
	const entries: unknown[] = []
	Object.defineProperty(window, '__intersections', { value: entries })
	window.IntersectionObserver = class extends Native {
		constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
			super((list, observer) => {
				const region = document.getElementById('engine-demo')
				for (const entry of list) {
					if (!region?.contains(entry.target)) continue
					entries.push({
						target: entry.target.id,
						intersecting: entry.isIntersecting,
						ratio: Math.round(entry.intersectionRatio * 1000) / 1000,
						top: Math.round(entry.boundingClientRect.top),
						offsetTop: (entry.target as HTMLElement).offsetTop,
						scrollTop: region.scrollTop,
					})
				}
				callback(list, observer)
			}, options)
		}
	}
}

async function live({ page, shot }: Context): Promise<Values> {
	// A role locator skips the hidden Details pane, and the reading reads the button while the Notes tab hides it.
	const expand = page.locator('#details-pane button[data-bs-target="#example-collapse"]')
	const menu = page.locator('#example-dropdown')
	const hint = page.locator('#example-tooltip')
	const visible = (locator: Locator) => locator.evaluate((element) => element.checkVisibility())
	await center(page.locator('#engine-demo'))
	const hiddenAtRest = { menu: await visible(menu), hint: await visible(hint) }
	await page.locator('#notes-tab').click()
	await page.waitForTimeout(500)
	const afterNotes = await visible(expand)
	await page.locator('#details-tab').click()
	await page.waitForTimeout(500)
	const afterDetails = await visible(expand)
	await expand.click()
	await page.waitForTimeout(700)
	const details = {
		expandVisibleAfterNotes: afterNotes,
		expandVisibleAfterDetails: afterDetails,
		ariaExpanded: await expand.getAttribute('aria-expanded'),
		collapseShown: await page.locator('#example-collapse').evaluate((element) => element.classList.contains('show')),
		collapseBox: await box(page.locator('#example-collapse')),
		counts: await counts(page),
	}
	const shots = [await shot('E13-expand-details')]
	await page.locator('#overlays').getByRole('button', { name: 'Open dialog', exact: true }).click()
	const dialogOpen = await page
		.waitForFunction(() => document.getElementById('example-modal')?.classList.contains('show'), null, {
			timeout: 3000,
		})
		.then(
			() => true,
			() => false,
		)
	await page.waitForTimeout(500)
	await menu.click()
	await page.waitForTimeout(500)
	const dropdown = page.locator('#example-modal .dropdown-menu')
	const menuState = {
		visibleInDialog: await visible(menu),
		ariaExpanded: await menu.getAttribute('aria-expanded'),
		menuShown: await dropdown.evaluate((element) => element.classList.contains('show')),
		placement: await dropdown.getAttribute('data-popper-placement'),
		menuBox: await box(dropdown),
		buttonBox: await box(menu),
		counts: await counts(page),
	}
	shots.push(await shot('E13-example-menu'))
	await menu.click()
	await page.waitForTimeout(400)
	await hint.click()
	await page.waitForTimeout(500)
	const hintState = { visibleInDialog: await visible(hint), ...(await tip(hint)), counts: await counts(page) }
	shots.push(await shot('E13-show-hint'))
	return {
		visibleBeforeDialog: hiddenAtRest,
		details,
		dialogOpen,
		exampleMenu: menuState,
		showHint: hintState,
		shots,
	}
}

const READINGS = [
	['E1', 'tables: hovered striped row and focused scroll region', tables],
	['E2', 'form controls: focus ring and border after Tab', forms],
	['E3', 'alerts: dismissal removes the alert', alerts],
	['E4', 'carousel caption heading: shipped h4.h5 and a bare h5', caption],
	['E5', 'carousel sliding: next control and slide-to indicator', sliding],
	['E6', 'live toast: shown at the window corner', toast],
	['E7', 'tooltips: Hint below after settling Hint to the right', tooltips],
	['E8', 'focus ring: box-shadow after Tab', focusRing],
	['E9', 'icon link: svg.bi transform on hover and focus', iconLink],
	['E10', 'stretched link: elementFromPoint at the corners', stretched],
	['E11', 'visually hidden: skip link after Tab', skipLink],
	['E12', 'live-components scrollspy after a face switch', scrollspy],
	['E13', 'live-components hidden triggers after reselecting and opening', live],
] as const

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const log: Values[] = []
for (const face of FACES) {
	const folder = face.replace(/[^a-z]+/gi, '-').toLowerCase()
	const dir = `${out}/${folder}`
	mkdirSync(dir, { recursive: true })
	for (const [reading, title, take] of READINGS) {
		const page = await browser.newPage({ viewport: { width, height: HEIGHT }, deviceScaleFactor: 1 })
		page.setDefaultTimeout(5000)
		const errors: string[] = []
		page.on('pageerror', (error: unknown) => errors.push(String(error)))
		const shot = async (name: string) => {
			await page.screenshot({ path: `${dir}/${name}.png` })
			return `${folder}/${name}.png`
		}
		const entry: Values = { reading, face, title }
		try {
			if (reading === 'E12') await page.addInitScript(recordIntersections)
			await page.goto(`file://${file}`)
			await page.waitForTimeout(800)
			if (theme === 'dark') {
				await page.getByRole('button', { name: 'Dark', exact: true }).first().click()
				await page.waitForTimeout(300)
			}
			// E12 reads the page before the switch, so it drives its own face buttons.
			if (reading !== 'E12') {
				await page.getByRole('button', { name: face, exact: true }).first().click()
				await page.waitForTimeout(800)
			}
			Object.assign(entry, await take({ page, face, dir, shot }))
		} catch (error) {
			entry.error = String(error).slice(0, 400)
		}
		entry.pageErrors = errors
		log.push(entry)
		writeFileSync(`${out}/log.json`, JSON.stringify(log, null, 1) + '\n')
		await page.close()
	}
}
await browser.close()
const failed = log.filter((entry) => entry.error !== undefined).map((entry) => `${entry.reading} ${entry.face}: ${entry.error}`)
const missing = FACES.flatMap((face) =>
	READINGS.filter(([reading]) => !log.some((entry) => entry.reading === reading && entry.face === face)).map(
		([reading]) => `${reading} ${face}`,
	),
)
console.log(JSON.stringify({ entries: log.length, failed, missing }))
if (failed.length > 0 || missing.length > 0) process.exitCode = 1
