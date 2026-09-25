import { TOKEN_NAMES } from '@src/core'
import { requireValue } from '@orkestrel/test'
import {
	hoverAccessible,
	matchesColor,
	readPixels,
	readStyle,
	readToken,
	releaseMedia,
	releasePointer,
	stageMedia,
	waitForAnimations,
} from '@orkestrel/test/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { collectLayer, collectMediaConditions, scene } from '../../../setupBrowser.js'
import {
	ACCORDION_COLOR_CASES,
	ACCORDION_LENGTH_CASES,
	ACCORDION_MARKUP,
	ACCORDION_SELECTORS,
	BUTTON_GROUP_CORNERS,
	extractShadowLayers,
	normalizeComplexSelector,
	REDUCED_MOTION,
	splitTopLevelList,
	TEXT_MODES,
	trimCSSWhitespace,
} from '../../../setupStyles.js'

afterEach(async () => {
	await releasePointer()
	await releaseMedia()
	scene.clear()
})

describe('accordion classes', () => {
	// The mutation this catches is a rule the partial stops writing, or one it writes beyond the
	// release: the reading is every components-layer selector naming an accordion class, so a
	// missing rule and an extra rule on the same classes each report here. The dark icon rule is
	// the release's own, recorded under the theme key, so it is read beside the key's list, and so is
	// the button reboot the partial writes back on the header's button form.
	it('writes the recorded accordion selectors and the dark icon rule, and no other rule on the accordion classes', () => {
		const written = new Set(
			collectLayer('components').flatMap((rule) =>
				rule instanceof CSSStyleRule
					? splitTopLevelList(rule.selectorText)
							.map((part) => normalizeComplexSelector(trimCSSWhitespace(part)))
							.filter((selector) => /\.accordion(?:-[\w-]+)?(?![\w-])/u.test(selector))
					: [],
			),
		)
		expect([...written].sort()).toEqual(
			[
				...ACCORDION_SELECTORS,
				'[data-bs-theme="dark"] .accordion-button::after',
				':where(button.accordion-button)',
			].sort(),
		)
	})

	// The mutation this catches is a transition written outside the mixin, or one that stopped
	// reading its published slot: the reading is each rule's own declaration at rest and under the
	// reduced-motion condition, so a literal written in place of the slot and a twin that kept its
	// transition each report here beside the resolved readings the motion case takes.
	it('declares the button and chevron transitions through their slots and no transition under the reduced-motion condition', () => {
		const rules = collectLayer('components').flatMap((rule) =>
			rule instanceof CSSStyleRule ? [rule] : [],
		)
		expect(
			['.accordion-button', '.accordion-button::after'].map((selector) =>
				rules
					.filter(
						(rule) => normalizeComplexSelector(trimCSSWhitespace(rule.selectorText)) === selector,
					)
					.map((rule) => [
						rule.parentRule instanceof CSSMediaRule ? rule.parentRule.conditionText : undefined,
						rule.style.getPropertyValue('transition'),
					]),
			),
		).toEqual([
			[
				[undefined, 'var(--bs-accordion-transition)'],
				[REDUCED_MOTION, 'none'],
			],
			[
				[undefined, 'var(--bs-accordion-btn-icon-transition)'],
				[REDUCED_MOTION, 'none'],
			],
		])
	})

	it('lays each button out as a full-width row with its chevron at the end, and zeroes the header margin', () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const item = requireValue(host.querySelector('.accordion-item'), 'No item')
		const header = requireValue(item.querySelector('.accordion-header'), 'No header')
		const button = requireValue(item.querySelector('.accordion-button'), 'No button')
		expect(readPixels(header, 'margin-bottom')).toBe(0)
		expect(readStyle(button, 'position')).toBe('relative')
		expect(readStyle(button, 'display')).toBe('flex')
		expect(readStyle(button, 'align-items')).toBe('center')
		expect(readStyle(button, 'text-align')).toBe('left')
		expect(readStyle(button, 'overflow-anchor')).toBe('none')
		expect(readPixels(button, 'font-size')).toBe(16)
		expect(readPixels(button, 'border-left-width')).toBe(0)
		// The button spans the item's inner box, the width between the item's own side borders.
		expect(button.getBoundingClientRect().width).toBeCloseTo(
			item.getBoundingClientRect().width - 2 * readPixels(item, 'border-left-width'),
			1,
		)
		expect(readStyle(item, 'border-left-style')).toBe('solid')
		expect(readStyle(button, 'content', '::after')).toBe('""')
		expect(readStyle(button, 'flex-shrink', '::after')).toBe('0')
		expect(readPixels(button, 'height', '::after')).toBe(20)
		expect(readStyle(button, 'background-repeat', '::after')).toBe('no-repeat')
		// A one-value `background-size` serializes as that one value on one build and as
		// `<length> auto` on another (D45), so the width is read from the leading term and the
		// second term, where a build writes one, is asserted `auto` rather than compared by string.
		const [chevronSize, chevronHeight] = readStyle(button, 'background-size', '::after').split(' ')
		expect(chevronSize).toBe('20px')
		expect(chevronHeight === undefined || chevronHeight === 'auto').toBe(true)
		// The chevron's automatic start margin takes the row's free space, so it resolves to a
		// positive length on a button whose label is shorter than the row.
		expect(readPixels(button, 'margin-left', '::after')).toBeGreaterThan(0)
	})

	it.each(ACCORDION_LENGTH_CASES)(
		'reads $reads from $property and moves it only from the accordion that declares it',
		async ({ property, target, pseudo, reads, pixels }) => {
			const host = scene.mount(`<div>${ACCORDION_MARKUP}</div>`)
			const wrapper = requireValue(host.querySelector<HTMLElement>('div'), 'No wrapper')
			const element = requireValue(host.querySelector(target), `No ${target}`)
			const accordion = requireValue(element.closest<HTMLElement>('.accordion'), 'No accordion')
			// The button transitions its corners, so the preference is staged first and every reading
			// here is the settled value the declaration resolves to.
			await stageMedia({ motion: false })
			expect(readPixels(element, reads, pseudo)).toBe(pixels)
			// The accordion declares the property itself, so a declaration on an ancestor is outranked
			// and the accordion is where a consumer retunes it. Reading the shadowed wrapper first is
			// what makes the accordion's own override the thing under test.
			wrapper.style.setProperty(property, '19px')
			expect(readPixels(element, reads, pseudo)).toBe(pixels)
			accordion.style.setProperty(property, '19px')
			expect(readPixels(element, reads, pseudo)).toBe(19)
		},
	)

	it.each(ACCORDION_COLOR_CASES)(
		'paints $reads from $property, the value $source gives it, and moves it only from the accordion that declares it',
		async ({ property, target, reads, source }) => {
			const host = scene.mount(`<div>${ACCORDION_MARKUP}</div>`)
			const wrapper = requireValue(host.querySelector<HTMLElement>('div'), 'No wrapper')
			const element = requireValue(host.querySelector(target), `No ${target}`)
			const accordion = requireValue(element.closest<HTMLElement>('.accordion'), 'No accordion')
			// The button transitions its paint, so the preference is staged first and every reading
			// here is the settled value the declaration resolves to.
			await stageMedia({ motion: false })
			expect(matchesColor(readStyle(element, reads), readToken(element, source))).toBe(true)
			expect(matchesColor(readStyle(element, reads), 'rebeccapurple')).toBe(false)
			wrapper.style.setProperty(property, 'rebeccapurple')
			expect(matchesColor(readStyle(element, reads), 'rebeccapurple')).toBe(false)
			accordion.style.setProperty(property, 'rebeccapurple')
			expect(matchesColor(readStyle(element, reads), 'rebeccapurple')).toBe(true)
		},
	)

	// The mutation this catches is the `:not(.collapsed)` qualifier inverted or dropped: the expanded
	// and the collapsed button sit in one group, so a rule that reached the other state paints the
	// collapsed button with the active slots, and a rule that reached neither leaves the expanded
	// button resting.
	it('paints an expanded button from the active slots with its inset rule and turned chevron, and a collapsed button from the resting ones', async () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const group = requireValue(host.querySelector('.accordion'), 'No accordion')
		const expanded = requireValue(
			group.querySelector('.accordion-button:not(.collapsed)'),
			'No expanded button',
		)
		const collapsed = requireValue(
			group.querySelector('.accordion-button.collapsed'),
			'No collapsed button',
		)
		await stageMedia({ motion: false })
		const active = [
			readToken(expanded, '--bs-primary-text-emphasis'),
			readToken(expanded, '--bs-primary-bg-subtle'),
		]
		const resting = [readToken(collapsed, '--bs-body-color'), readToken(collapsed, '--bs-body-bg')]
		expect(
			[expanded, collapsed].map((button) => [
				matchesColor(readStyle(button, 'color'), requireValue(active[0], 'No active color')),
				matchesColor(readStyle(button, 'background-color'), requireValue(active[1], 'No fill')),
				matchesColor(readStyle(button, 'color'), requireValue(resting[0], 'No resting color')),
				matchesColor(readStyle(button, 'background-color'), requireValue(resting[1], 'No bg')),
			]),
		).toEqual([
			[true, true, false, false],
			[false, false, true, true],
		])
		// The inset rule is one border width drawn along the button's bottom edge in the border
		// color, with no blur and no spread, which is the line between the expanded button and its
		// panel.
		const layers = extractShadowLayers(readStyle(expanded, 'box-shadow'))
		expect(layers.map(({ inset, lengths }) => ({ inset, lengths }))).toEqual([
			{ inset: true, lengths: [0, -1, 0, 0] },
		])
		expect(
			matchesColor(
				requireValue(layers[0], 'No inset layer').color,
				readToken(expanded, '--bs-border-color'),
			),
		).toBe(true)
		expect(readStyle(collapsed, 'box-shadow')).toBe('none')
		// The chevron turns half a revolution on the expanded button alone.
		const turned = new DOMMatrix(readStyle(expanded, 'transform', '::after'))
		expect([turned.a, turned.d].map((value) => Math.round(value))).toEqual([-1, -1])
		expect(readStyle(collapsed, 'transform', '::after')).toBe('none')
	})

	// The mutation this catches is one icon slot read for both states: the release draws the resting
	// chevron in the body text color and the expanded one in the primary emphasis color, so each
	// state's image carries its own stroke.
	it('draws the resting chevron on a collapsed button and the active chevron on an expanded one', () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const group = requireValue(host.querySelector('.accordion'), 'No accordion')
		const expanded = requireValue(
			group.querySelector('.accordion-button:not(.collapsed)'),
			'No expanded button',
		)
		const collapsed = requireValue(
			group.querySelector('.accordion-button.collapsed'),
			'No collapsed button',
		)
		const open = readStyle(expanded, 'background-image', '::after')
		const shut = readStyle(collapsed, 'background-image', '::after')
		expect(open).not.toBe(shut)
		expect(open).toContain('data:image/svg+xml')
		expect(open).toContain('052c65')
		expect(shut).toContain('data:image/svg+xml')
		expect(shut).toContain('212529')
	})

	// The mutation this catches is each seam rule dropped: the first item's top corners, the border
	// each later item gives up, the last item's bottom corners, and the inner corners of the buttons
	// at the two ends each read a length only its own rule gives.
	it("rounds the group's outer corners on its boundary items, drops the top border of every later item, and squares the rest", async () => {
		const host = scene.mount(ACCORDION_MARKUP)
		// The button transitions its corners, so the class change later in this case is read settled.
		await stageMedia({ motion: false })
		const group = requireValue(host.querySelector('.accordion'), 'No accordion')
		const items = [...group.querySelectorAll(':scope > .accordion-item')]
		const buttons = items.map((item) =>
			requireValue(item.querySelector('.accordion-button'), 'No item button'),
		)
		expect(items.map((item) => readPixels(item, 'border-top-width'))).toEqual([1, 0, 0])
		expect(items.map((item) => readPixels(item, 'border-bottom-width'))).toEqual([1, 1, 1])
		expect(
			items.map((item) => BUTTON_GROUP_CORNERS.map((corner) => readPixels(item, corner))),
		).toEqual([
			[6, 6, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 6, 6],
		])
		// The expanded first button rounds its top corners inside the item's border, and the
		// collapsed last button rounds its bottom corners the same way.
		expect(
			buttons.map((button) => BUTTON_GROUP_CORNERS.map((corner) => readPixels(button, corner))),
		).toEqual([
			[5, 5, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 5, 5],
		])
		// Opened in markup, the last button squares its bottom corners and its panel takes the
		// group's outer radius instead, because the button meets the panel rather than the edge.
		const last = requireValue(buttons[2], 'No last button')
		const panel = requireValue(
			requireValue(items[2], 'No last item').querySelector('.accordion-collapse'),
			'No last panel',
		)
		last.classList.remove('collapsed')
		panel.classList.add('show')
		expect(BUTTON_GROUP_CORNERS.map((corner) => readPixels(last, corner))).toEqual([0, 0, 0, 0])
		expect(BUTTON_GROUP_CORNERS.map((corner) => readPixels(panel, corner))).toEqual([0, 0, 6, 6])
		expect(panel.getBoundingClientRect().height).toBeGreaterThan(0)
	})

	// The mutation this catches is each flush rule dropped: the flush group reads zero where the
	// ordinary group beside it reads the border or the radius the dropped rule would leave.
	it('squares every corner and drops the side and outer borders of a flush group', () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const group = requireValue(host.querySelector('.accordion-flush'), 'No flush accordion')
		const items = [...group.querySelectorAll(':scope > .accordion-item')]
		expect(
			items.map((item) =>
				['top', 'right', 'bottom', 'left'].map((side) => readPixels(item, `border-${side}-width`)),
			),
		).toEqual([
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0],
		])
		const radii = [
			...items,
			...group.querySelectorAll('.accordion-button'),
			...group.querySelectorAll('.accordion-collapse'),
		].flatMap((element) => BUTTON_GROUP_CORNERS.map((corner) => readPixels(element, corner)))
		expect(radii).toHaveLength(36)
		expect(radii.filter((radius) => radius !== 0)).toEqual([])
		// The collapsed first and last buttons are the ones the boundary rules would round, so the
		// flush group squares them against those rules rather than against a button nothing rounds.
		const [first, , last] = group.querySelectorAll('.accordion-button')
		expect(requireValue(first, 'No first button').classList.contains('collapsed')).toBe(true)
		expect(requireValue(last, 'No last button').classList.contains('collapsed')).toBe(true)
	})

	it('rings a focused button with the published shadow, lifts it over its neighbours, and lifts a hovered one a step lower', async () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const group = requireValue(host.querySelector('.accordion'), 'No accordion')
		const [expanded, middle, last] = group.querySelectorAll<HTMLElement>('.accordion-button')
		const button = requireValue(middle, 'No middle button')
		await stageMedia({ motion: false })
		expect(readStyle(button, 'z-index')).toBe('auto')
		button.focus()
		expect(button.matches(':focus')).toBe(true)
		expect(readStyle(button, 'z-index')).toBe('3')
		expect(readStyle(button, 'outline-style')).toBe('none')
		// The spread is the recorded quarter-rem ring at a quarter of the release blue, read as the
		// painted layer rather than as the declared text.
		const ring = extractShadowLayers(readStyle(button, 'box-shadow'))
		expect(ring.map(({ inset, lengths }) => ({ inset, lengths }))).toEqual([
			{ inset: false, lengths: [0, 0, 0, 4] },
		])
		expect(
			matchesColor(requireValue(ring[0], 'No ring layer').color, 'rgba(13, 110, 253, 0.25)'),
		).toBe(true)
		expect(readStyle(requireValue(last, 'No last button'), 'z-index')).toBe('auto')
		// The focus rule follows the expanded rule, so a focused expanded button wears the ring in
		// place of its inset rule.
		const open = requireValue(expanded, 'No expanded button')
		open.focus()
		expect(extractShadowLayers(readStyle(open, 'box-shadow')).map(({ inset }) => inset)).toEqual([
			false,
		])
		open.blur()
		expect(readStyle(button, 'box-shadow')).toBe('none')
		await hoverAccessible('button', 'Returns')
		expect(button.matches(':hover')).toBe(true)
		expect(readStyle(button, 'z-index')).toBe('2')
	})

	it('outlines the focused button at the focus width under forced colors, where its shadow ring is not painted', async () => {
		const host = scene.mount(
			`${ACCORDION_MARKUP}<div id="focus-gauge" style="width: var(--vn-focus-width)"></div>`,
		)
		const button = requireValue(
			host.querySelector<HTMLElement>('.accordion-button.collapsed'),
			'No collapsed button',
		)
		const gauge = requireValue(host.querySelector('#focus-gauge'), 'No focus gauge')
		button.focus()
		expect(readStyle(button, 'outline-style')).toBe('none')
		// A color reading cannot fail under forced colors, because the installed color reader
		// resolves each side through a probe whose color forced colors also replace, so the outline
		// is read by its style and its width rather than by its paint.
		await stageMedia({ forced: true })
		expect(readStyle(button, 'outline-style')).toBe('solid')
		expect(readPixels(button, 'outline-width')).toBe(readPixels(gauge, 'width'))
		await releaseMedia()
		expect(readStyle(button, 'outline-style')).toBe('none')
	})

	// The mutation this catches is the dark icon left at theme scope: the theme scope then carries
	// the slot to every element in the island, and the accordion's own light declaration outranks it
	// on the button, so the chevron paints the light stroke while a plain element reads a value.
	it('draws the dark chevrons on a button inside a dark island and leaves the theme scope without them', () => {
		const host = scene.mount(
			`<div data-bs-theme="light" id="lit">${ACCORDION_MARKUP}</div><div data-bs-theme="dark" id="dim">${ACCORDION_MARKUP}<div id="plain"></div><div data-bs-theme="light" id="nested">${ACCORDION_MARKUP}</div></div>`,
		)
		const [lit, dim, nested] = ['lit', 'dim', 'nested'].map((scope) =>
			['.accordion-button:not(.collapsed)', '.accordion-button.collapsed'].map((selector) =>
				readStyle(
					requireValue(host.querySelector(`#${scope} > .accordion ${selector}`), `No ${selector}`),
					'background-image',
					'::after',
				),
			),
		)
		expect(requireValue(dim, 'No dark reading').map((image) => image.includes('6ea8fe'))).toEqual([
			true,
			true,
		])
		expect(requireValue(lit, 'No light reading').map((image) => image.includes('6ea8fe'))).toEqual([
			false,
			false,
		])
		// The release's rule selects any button under a dark scope, so a light island nested inside a
		// dark one keeps the dark chevrons the way the release does.
		expect(nested).toEqual(dim)
		const plain = requireValue(host.querySelector('#plain'), 'No plain element')
		expect(readToken(plain, '--bs-accordion-btn-icon')).toBe('')
		expect(readToken(plain, '--bs-accordion-btn-active-icon')).toBe('')
	})

	it.each(TEXT_MODES)(
		'resolves the item, the collapsed button, and the expanded button from the %s theme',
		async (mode) => {
			const host = scene.mount(`<div data-bs-theme="${mode}">${ACCORDION_MARKUP}</div>`)
			const item = requireValue(host.querySelector('.accordion-item'), 'No item')
			const collapsed = requireValue(host.querySelector('.accordion-button.collapsed'), 'No btn')
			const expanded = requireValue(
				host.querySelector('.accordion-button:not(.collapsed)'),
				'No expanded button',
			)
			await stageMedia({ motion: false })
			expect(matchesColor(readStyle(item, 'color'), readToken(item, '--bs-body-color'))).toBe(true)
			expect(
				matchesColor(readStyle(collapsed, 'background-color'), readToken(item, '--bs-body-bg')),
			).toBe(true)
			expect(
				matchesColor(
					readStyle(expanded, 'background-color'),
					readToken(item, '--bs-primary-bg-subtle'),
				),
			).toBe(true)
		},
	)

	it('reads one item, button, and chevron paint in light and another in dark', async () => {
		const light = scene.mount(`<div data-bs-theme="light">${ACCORDION_MARKUP}</div>`)
		const dark = scene.mount(`<div data-bs-theme="dark">${ACCORDION_MARKUP}</div>`)
		await stageMedia({ motion: false })
		for (const [selector, property, pseudo] of [
			['.accordion-item', 'background-color', undefined],
			['.accordion-item', 'border-top-color', undefined],
			['.accordion-button.collapsed', 'color', undefined],
			['.accordion-button:not(.collapsed)', 'color', undefined],
			['.accordion-button:not(.collapsed)', 'background-color', undefined],
			['.accordion-button.collapsed', 'background-image', '::after'],
		] as const) {
			const lit = requireValue(light.querySelector(selector), `No light ${selector}`)
			const dim = requireValue(dark.querySelector(selector), `No dark ${selector}`)
			expect({ selector, property, value: readStyle(lit, property, pseudo) }).not.toEqual({
				selector,
				property,
				value: readStyle(dim, property, pseudo),
			})
		}
	})

	it('drives the block padding of the button and the body from the density factor and leaves the inline padding and the chevron fixed', () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const button = requireValue(host.querySelector('.accordion-button.collapsed'), 'No button')
		const body = requireValue(
			host.querySelector('.accordion-collapse.show > .accordion-body'),
			'No body',
		)
		// The factors are declared on the document element, where the scale tokens are, so an
		// override on the accordion itself would leave the already-resolved lengths untouched.
		document.documentElement.style.setProperty(TOKEN_NAMES.factor.density, '2')
		try {
			expect(readPixels(button, 'padding-top')).toBe(32)
			expect(readPixels(body, 'padding-top')).toBe(32)
			expect(readPixels(button, 'padding-left')).toBe(20)
			expect(readPixels(body, 'padding-left')).toBe(20)
			expect(readPixels(button, 'width', '::after')).toBe(20)
		} finally {
			document.documentElement.style.removeProperty(TOKEN_NAMES.factor.density)
		}
		expect(readPixels(button, 'padding-top')).toBe(16)
		expect(readPixels(body, 'padding-top')).toBe(16)
	})

	// The mutation this catches is either transition written outside the mixin: the staged reading
	// is taken on the same elements as the resting one, so a declaration that kept its duration
	// under the preference reports here, and so does one that dropped its reduced-motion twin.
	it('transitions the button paint and the chevron turn and collapses both under the reduced-motion preference', async () => {
		const host = scene.mount(ACCORDION_MARKUP)
		const button = requireValue(host.querySelector('.accordion-button'), 'No button')
		const slots = [
			['transition-property', undefined],
			['transition-duration', undefined],
			['transition-timing-function', undefined],
			['transition-property', '::after'],
			['transition-duration', '::after'],
			['transition-timing-function', '::after'],
		] as const
		const recorded = [
			'color, background-color, border-color, box-shadow, border-radius',
			'0.15s, 0.15s, 0.15s, 0.15s, 0.15s',
			'ease-in-out, ease-in-out, ease-in-out, ease-in-out, ease',
			'transform',
			'0.2s',
			'ease-in-out',
		]
		expect(slots.map(([property, pseudo]) => readStyle(button, property, pseudo))).toEqual(recorded)
		await stageMedia({ motion: false })
		expect(readStyle(button, 'transition-duration')).toBe('0s')
		expect(readStyle(button, 'transition-duration', '::after')).toBe('0s')
		await waitForAnimations(button)
		await releaseMedia()
		expect(slots.map(([property, pseudo]) => readStyle(button, property, pseudo))).toEqual(recorded)
		const rules = collectLayer('components')
		for (const selector of ['.accordion-button', '.accordion-button::after'])
			expect(collectMediaConditions(rules, selector)).toEqual([REDUCED_MOTION])
	})
})
