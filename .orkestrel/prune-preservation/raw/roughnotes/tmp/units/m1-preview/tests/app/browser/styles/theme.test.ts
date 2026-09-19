import { afterEach, describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { nextTick } from 'vue'
import { requireValue, waitForCondition } from '@orkestrel/test'
import {
	FOCUSABLE_SELECTOR,
	isRendered,
	measureContrast,
	parseColor,
	readContrast,
	readLayers,
	readRing,
	readRootToken,
	releasePane,
	stagePane,
} from '@orkestrel/test/browser'
import { CONTACT_PATH, HOME_PATH, PAYMENT_PATH } from '@app/browser'
import { clearSurface, closeSite, openSite, openSurface } from '../setup.js'

afterEach(async () => {
	await releasePane()
	clearSurface()
})

describe('theme', () => {
	it.each(['primary', 'outline-primary', 'outline-secondary'])(
		'keeps %s button paint local to its nearest color-mode scope',
		async (variant) => {
			const baseline = new Map<string, readonly string[]>()
			for (const path of ['light', 'dark', 'dark/light', 'light/dark/light', 'dark/light/dark']) {
				clearSurface()
				const modes = path.split('/')
				const mode = requireValue(modes.at(-1))
				document.documentElement.dataset.bsTheme = requireValue(modes[0])
				let surface = document.body
				for (const nested of modes.slice(1)) {
					const scope = document.createElement('div')
					scope.dataset.bsTheme = nested
					scope.className = 'bg-body text-body p-3'
					surface.append(scope)
					surface = scope
				}
				const button = document.createElement('button')
				button.className = `btn btn-${variant}`
				button.textContent = 'Continue'
				surface.append(button)
				const ratios: number[] = []
				const rings: number[] = []
				const outlines: string[] = []
				for (const state of ['rest', 'hover', 'active', 'focus', 'disabled']) {
					if (state === 'hover') await userEvent.hover(button)
					if (state === 'active') button.classList.add('active')
					if (state === 'focus') {
						await userEvent.unhover(button)
						button.classList.remove('active')
						await userEvent.keyboard('{Tab}')
						button.focus()
					}
					if (state === 'disabled') {
						button.blur()
						button.disabled = true
					}
					await Promise.all(button.getAnimations().map((animation) => animation.finished))
					const style = getComputedStyle(button)
					const paint = [style.color, style.backgroundColor, style.borderColor, style.opacity]
					const ratio = readContrast(button)
					const reading = `${variant} ${path} ${state}: ${JSON.stringify(paint)}, layers ${JSON.stringify(readLayers(button))}, contrast ${ratio}`
					if (state !== 'disabled') ratios.push(ratio)
					if (modes.length === 1) baseline.set(`${mode}/${state}`, paint)
					expect.soft(paint, reading).toEqual(requireValue(baseline.get(`${mode}/${state}`)))
					if (state === 'focus') {
						outlines.push(style.outlineStyle)
						rings.push(requireValue(readRing(button)))
					}
				}
				expect.soft(Math.min(...ratios), `${variant} ${path}`).toBeGreaterThanOrEqual(4.5)
				expect.soft(outlines).toEqual(['solid'])
				expect.soft(requireValue(rings[0])).toBeGreaterThanOrEqual(3)
			}
		},
	)

	it('keeps accent, card paint, and focus rings local through nested mode changes', async () => {
		document.documentElement.dataset.bsTheme = 'dark'
		const outer = document.createElement('div')
		outer.dataset.bsTheme = 'dark'
		outer.className = 'card bg-body text-body p-3'
		const island = document.createElement('div')
		island.className = 'card bg-body text-body p-3'
		outer.append(island)
		document.body.append(outer)
		const accent = document.createElement('span')
		accent.className = 'accent'
		accent.textContent = 'Scope'
		island.append(accent)
		const rings: number[] = []
		await userEvent.keyboard('{Tab}')
		for (const mode of ['light', 'dark', 'light']) {
			island.dataset.bsTheme = mode
			const dark = mode === 'dark'
			const card = getComputedStyle(island)
			const hairline = getComputedStyle(accent, '::before').backgroundColor
			expect(hairline).toBe(dark ? 'rgb(231, 198, 122)' : 'rgb(200, 149, 43)')
			expect(card.backgroundColor).toBe(dark ? 'rgb(10, 37, 64)' : 'rgb(255, 255, 255)')
			expect(card.backgroundImage).toBe(dark ? getComputedStyle(outer).backgroundImage : 'none')
			expect(getComputedStyle(outer).backgroundImage).toContain('linear-gradient(')
			console.info(
				`${mode} card: ${card.backgroundColor}; image: ${card.backgroundImage}; accent: ${hairline}`,
			)
			for (const [tag, name] of [
				['button', ''],
				['button', 'btn btn-primary'],
				['button', 'btn-close'],
				['input', 'form-control'],
				['select', 'form-select'],
				['a', 'nav-link'],
				['button', 'navbar-toggler'],
			]) {
				const control = document.createElement(requireValue(tag))
				control.className = requireValue(name)
				control.tabIndex = 0
				island.append(control)
				control.focus()
				const ring = getComputedStyle(control)
				expect(ring.outlineColor).toBe(dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)')
				expect(ring.outlineStyle).toBe('solid')
				expect(ring.outlineWidth).toBe('2px')
				expect(ring.outlineOffset).toBe('2px')
				// The light card is opaque; the existing screenshot proof owns dark gradients.
				if (!dark) rings.push(requireValue(readRing(control)))
				control.remove()
			}
		}
		expect(requireValue(rings[0])).toBe(21)
		expect(Math.min(...rings)).toBe(21)
	})

	it('detects a fixed foreground that fails on the dark surface outside the repaired variants', () => {
		document.documentElement.dataset.bsTheme = 'dark'
		const control = document.createElement('span')
		control.className = 'text-primary bg-body'
		control.textContent = 'Unreadable control'
		document.body.append(control)
		expect(readContrast(control)).toBe(1)
	})

	it('measures focus against the rendered hero gradient and marketplace glow', async () => {
		for (const width of [1280, 390]) {
			await releasePane()
			await page.viewport(width, 844)
			await stagePane(width, 844)
			const { host, app } = await openSurface()
			for (const dark of [false, true]) {
				app.theme(dark)
				await nextTick()
				await userEvent.keyboard('{Tab}')
				for (const region of ['hero', 'panel']) {
					const surface = requireValue(host.querySelector(`.${region}`))
					const control = requireValue(surface.querySelector('.btn-warning'))
					if (!(control instanceof HTMLElement)) throw new Error('The commit must be focusable')
					const pixels: string[] = []
					for (const focused of [false, true]) {
						if (focused) control.focus()
						else control.blur()
						const capture = await page.screenshot({
							element: surface,
							base64: true,
							path: `../../../../tmp/codex/u4-${region}-${width}-${dark}-${focused}.png`,
						})
						const picture = new Image()
						picture.src = `data:image/png;base64,${capture.base64}`
						await picture.decode()
						const canvas = document.createElement('canvas')
						canvas.width = picture.width
						canvas.height = picture.height
						const context = requireValue(canvas.getContext('2d'))
						context.drawImage(picture, 0, 0)
						const outer = surface.getBoundingClientRect()
						const inner = control.getBoundingClientRect()
						const scale = picture.width / outer.width
						const [red, green, blue] = context.getImageData(
							Math.floor((inner.x + inner.width / 2 - outer.x) * scale),
							Math.floor((inner.y - 3 - outer.y) * scale),
							1,
							1,
						).data
						pixels.push(`rgb(${red}, ${green}, ${blue})`)
					}
					const background = requireValue(parseColor(requireValue(pixels[0])))
					const outline = requireValue(parseColor(requireValue(pixels[1])))
					expect(pixels[1]).toBe(getComputedStyle(control).outlineColor)
					expect(measureContrast(background, background)).toBeLessThan(3)
					const ratio = measureContrast(outline, background)
					expect(ratio).toBeGreaterThanOrEqual(3)
				}
			}
		}
	})

	it('paints an authored focus ring on links, form controls, and drawer controls in each mode and width', async () => {
		for (const width of [1280, 390]) {
			await page.viewport(width, 844)
			const { host, app } = await openSurface()
			for (const dark of [false, true]) {
				app.theme(dark)
				await nextTick()
				const measured = new Set<string>()
				for (const path of [HOME_PATH, CONTACT_PATH, PAYMENT_PATH]) {
					app.open(path)
					await nextTick()
					await userEvent.keyboard('{Tab}')
					for (const control of host.querySelectorAll(FOCUSABLE_SELECTOR)) {
						if (!(control instanceof HTMLElement) || !isRendered(control)) continue
						control.focus()
						const style = getComputedStyle(control)
						expect(style.outlineStyle).toBe('solid')
						expect(style.outlineWidth).toBe('2px')
						expect(style.outlineOffset).toBe('2px')
						const ratio = requireValue(readRing(control), control.outerHTML)
						expect(ratio).toBeGreaterThanOrEqual(3)
						measured.add(control.tagName)
					}
				}
				expect([...measured]).toEqual(expect.arrayContaining(['A', 'BUTTON', 'INPUT', 'TEXTAREA']))
				await openSite()
				await userEvent.keyboard('{Tab}')
				const drawer = requireValue(host.querySelector('#site-menu'))
				const controls = [...drawer.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isRendered)
				expect(controls.length > 0).toBe(width === 390)
				for (const control of controls) {
					if (!(control instanceof HTMLElement)) continue
					control.focus()
					expect(getComputedStyle(control).outlineStyle).toBe('solid')
					expect(requireValue(readRing(control))).toBeGreaterThanOrEqual(3)
				}
				await closeSite()
			}
		}
	})

	it('repaints the mounted masthead through a live color-mode round trip', async () => {
		await page.viewport(1280, 800)
		const { host, app } = await openSurface()
		const link = requireValue(host.querySelector('.masthead .nav-link'))
		const readings: string[] = []
		for (const dark of [false, true, false]) {
			app.theme(dark)
			await nextTick()
			await waitForCondition(
				'masthead foreground follows the live mode',
				() =>
					getComputedStyle(link).color ===
					(dark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'),
			)
			readings.push(getComputedStyle(link).color)
			expect(host.querySelector('.masthead .nav-link')).toBe(link)
			expect(document.documentElement.dataset.bsTheme).toBe(dark ? 'dark' : 'light')
		}
		expect(readings).toEqual([
			'rgba(0, 0, 0, 0.65)',
			'rgba(255, 255, 255, 0.65)',
			'rgba(0, 0, 0, 0.65)',
		])
	})

	it('retunes the accent token when the Bootstrap theme flag changes', () => {
		const root = document.documentElement
		root.setAttribute('data-bs-theme', 'light')
		const light = readRootToken('--rn-accent')
		root.setAttribute('data-bs-theme', 'dark')
		const dark = readRootToken('--rn-accent')
		expect(light.length).toBeGreaterThan(0)
		expect(dark.length).toBeGreaterThan(0)
		expect(dark).not.toBe(light)
		root.setAttribute('data-bs-theme', 'light')
	})
})
