import { TOKEN_NAMES } from '@src/core'
import { requireValue } from '@orkestrel/test'
import {
	findRule,
	hoverAccessible,
	matchesColor,
	readPixels,
	readRootToken,
	readStyle,
	readToken,
	releaseMedia,
	releasePointer,
	stageMedia,
	waitForAnimations,
} from '@orkestrel/test/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { mountClose, scene } from '../../../setupBrowser.js'
import {
	CLOSE_INVERSION,
	CLOSE_MARK,
	CLOSE_SELECTORS,
	CLOSE_STATE_CASES,
	TEXT_MODES,
} from '../../../setupStyles.js'

afterEach(async () => {
	await releasePointer()
	await releaseMedia()
	document.documentElement.removeAttribute('data-bs-theme')
	scene.clear()
})

describe('close control geometry', () => {
	it('resolves the recorded content box, inset, and mark', () => {
		const control = mountClose()
		const em = readPixels(control, 'font-size')
		// Every recorded length is relative to the control's own text size, and the box is sized in
		// content-box terms, so the recorded padding sits outside the square rather than inside it.
		// A border-box control measures the same total width with a smaller mark.
		expect(readStyle(control, 'box-sizing')).toBe('content-box')
		expect(readPixels(control, 'width')).toBeCloseTo(em, 3)
		expect(readPixels(control, 'height')).toBeCloseTo(em, 3)
		expect(control.getBoundingClientRect().width).toBeCloseTo(em * 1.5, 1)
		for (const side of ['top', 'right', 'bottom', 'left'])
			expect(readPixels(control, `padding-${side}`)).toBeCloseTo(em * 0.25, 3)
		for (const side of ['top', 'right', 'bottom', 'left'])
			expect(readPixels(control, `border-${side}-width`)).toBe(0)
		expect(readStyle(control, 'background-image')).toBe(CLOSE_MARK)
		expect(readStyle(control, 'background-repeat')).toBe('no-repeat')
		expect(readStyle(control, 'background-position')).toBe('50% 50%')
		// A one-value `background-size` serializes as that one value on one build and as
		// `<length> auto` on another (D45), so the width is read from the leading term and the
		// second term, where a build writes one, is asserted `auto` rather than compared by string.
		const [size, height] = readStyle(control, 'background-size').split(' ')
		expect(size).toBe(`${String(em)}px`)
		expect(height === undefined || height === 'auto').toBe(true)
		// The shorthand writes a transparent color beside the mark, which is what keeps the button
		// element's own fill from painting behind it.
		expect(readStyle(control, 'background-color')).toBe('rgba(0, 0, 0, 0)')
	})

	it('paints the recorded text color from the palette token and takes a consumer override', async () => {
		const control = mountClose()
		expect(
			matchesColor(readStyle(control, 'color'), readRootToken('--vn-palette-black-base')),
		).toBe(true)
		expect(matchesColor(readToken(control, '--bs-btn-close-color'), '#000')).toBe(true)
		// The class declares the variable on the control itself, so an ancestor cannot reach it and
		// a consumer retunes it through a rule of their own, arriving after the shipped cascade.
		scene.load('.btn-close { --bs-btn-close-color: rgb(10, 20, 30); }')
		await waitForAnimations(control)
		expect(readStyle(control, 'color')).toBe('rgb(10, 20, 30)')
	})

	it('rescales the control corner with the published radius factor', () => {
		const control = mountClose()
		// The factor is set on the document element because a token's computed value carries its own
		// references already substituted, so a factor set on an ancestor moves nothing.
		expect(readPixels(control, 'border-top-left-radius')).toBeCloseTo(6, 3)
		document.documentElement.style.setProperty(TOKEN_NAMES.factor.radius, '2')
		try {
			expect(readPixels(control, 'border-top-left-radius')).toBeCloseTo(12, 3)
		} finally {
			document.documentElement.style.removeProperty(TOKEN_NAMES.factor.radius)
		}
	})

	it('carries a rule for every shipped close name', () => {
		// The lookup reads the sheet the browser resolved rather than the source. It is a
		// containment lookup and proves no completeness; the conformance ledger holds the recorded
		// set whole.
		expect(CLOSE_SELECTORS.filter((selector) => findRule(selector) === undefined)).toEqual([])
	})
})

describe('close control states', () => {
	it.each(CLOSE_STATE_CASES)(
		'reads the $name opacity from the variable the recorded rule names',
		({ property, opacity }) => {
			const control = mountClose()
			expect(Number.parseFloat(readToken(control, property))).toBe(Number.parseFloat(opacity))
		},
	)

	it('moves the opacity through rest, hover, and focus', async () => {
		const control = mountClose()
		expect(readStyle(control, 'opacity')).toBe('0.5')
		await hoverAccessible('button', 'Dismiss')
		expect(control.matches(':hover')).toBe(true)
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.75')
		expect(readStyle(control, 'text-decoration-line')).toBe('none')
		await releasePointer()
		control.focus()
		expect(control.matches(':focus')).toBe(true)
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('1')
		// The recorded focus treatment removes the outline and paints its own shadow, which is what
		// separates this control from the focus ring the button class wears.
		expect(readStyle(control, 'outline-style')).toBe('none')
		expect(readStyle(control, 'box-shadow')).toBe('rgba(13, 110, 253, 0.25) 0px 0px 0px 4px')
		control.blur()
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.5')
	})

	it('declares no transition, as the release declares none, so each state paints the moment it flips', () => {
		const control = mountClose()
		// The control carries a class, so the calibrated transition of a button no class claims stays
		// off it, and the reboot the element keeps declares none.
		expect(readStyle(control, 'transition-property')).toBe('all')
		expect(readStyle(control, 'transition-duration')).toBe('0s')
	})

	it('outlines the focused control at the focus width under forced colors, where its shadow ring is not painted', async () => {
		const control = mountClose()
		const host = requireValue(control.parentElement, 'No control host')
		host.insertAdjacentHTML(
			'beforeend',
			'<div id="focus-gauge" style="width: var(--vn-focus-width)"></div>',
		)
		const gauge = requireValue(host.querySelector('#focus-gauge'), 'No focus gauge')
		control.focus()
		expect(control.matches(':focus')).toBe(true)
		expect(readStyle(control, 'outline-style')).toBe('none')
		// A color reading cannot fail under forced colors, because the installed color reader
		// resolves each side through a probe whose color forced colors also replace, so the outline
		// is read by its style and its width rather than by its paint.
		await stageMedia({ forced: true })
		expect(readStyle(control, 'outline-style')).toBe('solid')
		expect(readPixels(control, 'outline-width')).toBe(readPixels(gauge, 'width'))
		await releaseMedia()
		expect(readStyle(control, 'outline-style')).toBe('none')
	})

	it('refuses a disabled control through the attribute and through the class alike', async () => {
		const attributed = mountClose()
		attributed.disabled = true
		const classed = mountClose(' disabled')
		for (const control of [attributed, classed]) {
			await waitForAnimations(control)
			expect(readStyle(control, 'opacity')).toBe('0.25')
			expect(readStyle(control, 'pointer-events')).toBe('none')
			expect(readStyle(control, 'user-select')).toBe('none')
		}
		// The class alone carries no disabled state, so a refusal reading the attribute would leave
		// the classed control live and reddens here.
		expect(classed.disabled).toBe(false)
	})

	it('reads the hover opacity from the variable a consumer retunes through a scope of their own', async () => {
		const control = mountClose()
		// The class declares every published variable on the control itself, so a consumer reaches
		// the hover opacity through a rule that still selects the control and scopes it to an
		// ancestor of their own. That retune is what separates the shipped binding from a hover
		// rule writing the recorded opacity as a literal: the literal resolves the same number at
		// rest and under the retune alike, so every other reading in this file passes under it.
		requireValue(control.parentElement, 'No control host').classList.add('retuned')
		scene.load('.retuned .btn-close { --bs-btn-close-hover-opacity: 0.6; }')
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.5')
		await hoverAccessible('button', 'Dismiss')
		expect(control.matches(':hover')).toBe(true)
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.6')
	})

	it('repaints each state from a consumer rule setting its own variable', async () => {
		const control = mountClose()
		scene.load('.btn-close { --bs-btn-close-opacity: 0.4; --bs-btn-close-disabled-opacity: 0.1; }')
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.4')
		control.disabled = true
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.1')
	})
})

describe('close control inversion', () => {
	it.each(TEXT_MODES)('reads the recorded filter the %s theme scope declares', (mode) => {
		document.documentElement.setAttribute('data-bs-theme', mode)
		const control = mountClose()
		expect(readRootToken('--bs-btn-close-filter').trim()).toBe(
			mode === 'dark' ? CLOSE_INVERSION : '',
		)
		// The light scope declares the filter with nothing after the colon, so the `filter`
		// declaration reading it resolves as unset and the mark paints as authored.
		expect(readStyle(control, 'filter')).toBe(
			mode === 'dark' ? 'invert(1) grayscale(1) brightness(2)' : 'none',
		)
	})

	it.each(TEXT_MODES)('inverts the mark in %s through the opt-in class', (mode) => {
		document.documentElement.setAttribute('data-bs-theme', mode)
		const control = mountClose(' btn-close-white')
		expect(readToken(control, '--bs-btn-close-filter').trim()).toBe(CLOSE_INVERSION)
		expect(readStyle(control, 'filter')).toBe('invert(1) grayscale(1) brightness(2)')
	})
})
