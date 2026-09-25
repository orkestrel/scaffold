import { TOKEN_NAMES } from '@src/core'
import { requireValue } from '@orkestrel/test'
import {
	hoverAccessible,
	matchesColor,
	pressKeys,
	readHit,
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
import { collectLayer, collectMediaConditions, scene } from '../../../setupBrowser.js'
import {
	CAROUSEL_INVERSION,
	CAROUSEL_MARKS,
	CAROUSEL_SELECTORS,
	REDUCED_MOTION,
	normalizeComplexSelector,
	splitTopLevelList,
	trimCSSWhitespace,
} from '../../../setupStyles.js'

afterEach(async () => {
	await releasePointer()
	await releaseMedia()
	document.documentElement.removeAttribute('data-bs-theme')
	for (const name of [TOKEN_NAMES.factor.density, TOKEN_NAMES.factor.motion])
		document.documentElement.style.removeProperty(name)
	scene.clear()
})

describe('carousel track and slides', () => {
	// The mutation this catches is a rule the partial stops writing, or one it writes beyond the
	// release: the reading is every components-layer selector naming one of the key's own classes,
	// so a missing rule and an extra rule on the same classes each report here. The button reboot
	// the partial writes back on the controls' and the indicators' button forms is read beside the
	// key's list.
	it('writes the recorded carousel selectors and no other rule on their classes', () => {
		const written = new Set(
			collectLayer('components').flatMap((rule) =>
				rule instanceof CSSStyleRule
					? splitTopLevelList(rule.selectorText)
							.map((part) => normalizeComplexSelector(trimCSSWhitespace(part)))
							.filter((selector) => /\.(?:carousel[\w-]*|pointer-event)(?![\w-])/u.test(selector))
					: [],
			),
		)
		expect([...written].sort()).toEqual(
			[
				...CAROUSEL_SELECTORS,
				':where(button.carousel-control-prev, button.carousel-control-next)',
				':where(.carousel-indicators [data-bs-target])',
			]
				.map((selector) => normalizeComplexSelector(selector))
				.sort(),
		)
	})

	// The mutations this catches are a slide rule that displays every slide and a display rule that
	// drops the resting class or either incoming class. A plain slide and a slide carrying only a
	// direction class leave the flow, and the resting, incoming, and outgoing slides stay in it.
	it('displays only the resting slide and the incoming slides', () => {
		const host = scene.mount(
			'<div class="carousel-inner">' +
				'<div class="carousel-item">Harbor at dawn</div>' +
				'<div class="carousel-item active">Harbor at noon</div>' +
				'<div class="carousel-item carousel-item-next">Harbor at dusk</div>' +
				'<div class="carousel-item carousel-item-prev">Harbor at night</div>' +
				'<div class="carousel-item carousel-item-start">Harbor in fog</div>' +
				'<div class="carousel-item carousel-item-end">Harbor in rain</div>' +
				'</div>',
		)
		expect(
			[...host.querySelectorAll('.carousel-item')].map((slide) => readStyle(slide, 'display')),
		).toEqual(['none', 'block', 'block', 'block', 'none', 'none'])
	})

	// The mutations this catches are a slide that stops taking the whole track and a track that
	// stops clearing its floated slides. The track's hidden overflow contains the floats on its own,
	// so its height cannot tell the clearing box apart, and the clearing box is read on the
	// pseudo-element itself.
	it('lays every displayed slide over the track and clears the floats beneath it', () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 320px"><div class="carousel-inner">' +
				'<div class="carousel-item active"><div style="height: 80px">Harbor at noon</div></div>' +
				'<div class="carousel-item carousel-item-next carousel-item-start"><div style="height: 80px">Harbor at dusk</div></div>' +
				'</div></div>',
		)
		const carousel = requireValue(host.querySelector('.carousel'), 'No carousel')
		const track = requireValue(host.querySelector('.carousel-inner'), 'No track')
		const [resting, incoming] = [...track.querySelectorAll('.carousel-item')]
		const slide = requireValue(resting, 'No resting slide')
		expect(readStyle(carousel, 'position')).toBe('relative')
		expect(readStyle(track, 'position')).toBe('relative')
		expect(readStyle(track, 'overflow')).toBe('hidden')
		expect(readPixels(track, 'width')).toBe(320)
		expect(track.getBoundingClientRect().height).toBe(80)
		const clearing = getComputedStyle(track, '::after')
		expect([clearing.content, clearing.display, clearing.clear]).toEqual(['""', 'block', 'both'])
		for (const [property, value] of [
			['position', 'relative'],
			['float', 'left'],
			['width', '320px'],
			['margin-right', '-320px'],
			['backface-visibility', 'hidden'],
		] as const)
			expect({ property, value: readStyle(slide, property) }).toEqual({ property, value })
		// Both slides take one row, so the incoming slide sits where the resting slide sits until a
		// transform moves one of them.
		expect(requireValue(incoming, 'No incoming slide').getBoundingClientRect().top).toBe(
			slide.getBoundingClientRect().top,
		)
	})

	// The mutation this catches is a direction guard dropped from the transform rules: without the
	// `:not(.carousel-item-start)` guard the incoming slide stays a width to the right and the track
	// shows nothing, and the mirrored guard does the same on the other side.
	it('moves the resting slide out and paints the incoming slide in place, in each direction', () => {
		const host = scene.mount(
			'<div class="carousel-inner" style="width: 320px">' +
				'<div class="carousel-item active carousel-item-start"><div style="height: 80px">Harbor at noon</div></div>' +
				'<div class="carousel-item carousel-item-next carousel-item-start"><div style="height: 80px">Harbor at dusk</div></div>' +
				'</div>' +
				'<div class="carousel-inner" style="width: 320px">' +
				'<div class="carousel-item active carousel-item-end"><div style="height: 80px">Harbor at noon</div></div>' +
				'<div class="carousel-item carousel-item-prev carousel-item-end"><div style="height: 80px">Harbor at dawn</div></div>' +
				'</div>',
		)
		const [forward, backward] = [...host.querySelectorAll('.carousel-inner')]
		for (const [track, offset] of [
			[requireValue(forward, 'No forward track'), -320],
			[requireValue(backward, 'No backward track'), 320],
		] as const) {
			const [resting, incoming] = [...track.querySelectorAll('.carousel-item')]
			const outgoing = requireValue(resting, 'No resting slide')
			const arriving = requireValue(incoming, 'No incoming slide')
			expect(readStyle(outgoing, 'transform')).toBe(`matrix(1, 0, 0, 1, ${String(offset)}, 0)`)
			expect(readStyle(arriving, 'transform')).toBe('none')
			// The incoming slide is what the track paints: its centre sits inside the track and the hit
			// test there reaches its own content rather than the resting slide.
			const content = requireValue(arriving.firstElementChild, 'No incoming content')
			const hit = requireValue(
				readHit(content),
				'The hit test on the incoming slide reached nothing',
			)
			expect(arriving.contains(hit)).toBe(true)
		}
	})

	// A slide carrying only the incoming class is what the engine writes for one frame before it adds
	// the direction class; no specimen renders it, so its resting offset is read here instead.
	it('holds a lone incoming slide one width to the side it arrives from', () => {
		const host = scene.mount(
			'<div class="carousel-inner" style="width: 320px">' +
				'<div class="carousel-item carousel-item-next">Harbor at dusk</div>' +
				'<div class="carousel-item carousel-item-prev">Harbor at dawn</div>' +
				'</div>',
		)
		expect(
			[...host.querySelectorAll('.carousel-item')].map((slide) => readStyle(slide, 'transform')),
		).toEqual(['matrix(1, 0, 0, 1, 320, 0)', 'matrix(1, 0, 0, 1, -320, 0)'])
	})

	// The mutation this catches is a swipe class that stops restricting the gesture: the engine adds
	// the class when it binds pointer events, and no specimen renders it, so its declaration is read
	// on a carousel carrying it beside one that does not.
	it('restricts touch to vertical panning on a carousel carrying the pointer-event class', () => {
		const host = scene.mount(
			'<div class="carousel">Harbor</div><div class="carousel pointer-event">Harbor</div>',
		)
		expect(
			[...host.querySelectorAll('.carousel')].map((carousel) =>
				readStyle(carousel, 'touch-action'),
			),
		).toEqual(['auto', 'pan-y'])
	})
})

describe('carousel fade', () => {
	// The mutations this catches are a fade rule that stops hiding the other slides, which paints
	// every slide at its own opacity instead of only the resting one; a stacking rule that drops the
	// resting slide or either incoming slide, which lets a hidden slide paint over the resting one;
	// and the outgoing slide's delay dropped, which makes it vanish at once instead of holding its
	// paint for the slide duration.
	it('stacks the slides in place and crosses their opacity, holding the outgoing slide for the slide duration', () => {
		const host = scene.mount(
			'<div class="carousel carousel-fade"><div class="carousel-inner" style="width: 320px">' +
				'<div class="carousel-item">Harbor at dawn</div>' +
				'<div class="carousel-item active">Harbor at noon</div>' +
				'<div class="carousel-item carousel-item-next carousel-item-start">Harbor at dusk</div>' +
				'<div class="carousel-item carousel-item-prev carousel-item-end">Harbor at night</div>' +
				'<div class="carousel-item active carousel-item-start">Harbor in fog</div>' +
				'<div class="carousel-item active carousel-item-end">Harbor in rain</div>' +
				'</div></div>',
		)
		expect(
			[...host.querySelectorAll('.carousel-item')].map((slide) => [
				readStyle(slide, 'opacity'),
				readStyle(slide, 'z-index'),
				readStyle(slide, 'transform'),
				readStyle(slide, 'transition-property'),
				readStyle(slide, 'transition-duration'),
				readStyle(slide, 'transition-delay'),
			]),
		).toEqual([
			['0', 'auto', 'none', 'opacity', '0.6s', '0s'],
			['1', '1', 'none', 'opacity', '0.6s', '0s'],
			['1', '1', 'none', 'opacity', '0.6s', '0s'],
			['1', '1', 'none', 'opacity', '0.6s', '0s'],
			['0', '0', 'none', 'opacity', '0s', '0.6s'],
			['0', '0', 'none', 'opacity', '0s', '0.6s'],
		])
	})
})

describe('carousel motion', () => {
	// The mutation this catches is a transition written without the `transition` mixin: the bare
	// declaration keeps its duration under the reduced-motion preference, and the mixin collapses it.
	it('collapses the slide, fade, control, and indicator transitions under the reduced-motion preference', async () => {
		const host = scene.mount(
			'<div class="carousel carousel-fade"><div class="carousel-inner">' +
				'<div class="carousel-item active carousel-item-start">Harbor at noon</div>' +
				'</div>' +
				'<button class="carousel-control-prev" type="button" aria-label="Previous slide"></button>' +
				'<div class="carousel-indicators"><button type="button" data-bs-target="#harbor" aria-label="Slide 1"></button></div>' +
				'</div>' +
				'<div class="carousel-item active">Harbor at dusk</div>',
		)
		const subjects = [
			requireValue(host.querySelector(':scope > .carousel-item'), 'No slide'),
			requireValue(host.querySelector('.carousel-fade .carousel-item'), 'No fading slide'),
			requireValue(host.querySelector('.carousel-control-prev'), 'No control'),
			requireValue(host.querySelector('[data-bs-target]'), 'No indicator'),
		]
		const readings: Array<ReadonlyArray<readonly string[]>> = []
		for (const motion of [true, false]) {
			await stageMedia({ motion })
			readings.push(
				subjects.map((subject) => [
					readStyle(subject, 'transition-property'),
					readStyle(subject, 'transition-duration'),
					readStyle(subject, 'transition-delay'),
					readStyle(subject, 'transition-timing-function'),
				]),
			)
		}
		expect(readings).toEqual([
			[
				['transform', '0.6s', '0s', 'ease-in-out'],
				['opacity', '0s', '0.6s', 'ease'],
				['opacity', '0.15s', '0s', 'ease'],
				['opacity', '0.6s', '0s', 'ease'],
			],
			[
				['none', '0s', '0s', 'ease'],
				['none', '0s', '0s', 'ease'],
				['none', '0s', '0s', 'ease'],
				['none', '0s', '0s', 'ease'],
			],
		])
		const rules = collectLayer('components')
		for (const selector of [
			'.carousel-item',
			'.carousel-fade .active.carousel-item-start, .carousel-fade .active.carousel-item-end',
			'.carousel-control-prev, .carousel-control-next',
			'.carousel-indicators [data-bs-target]',
		])
			expect({ selector, conditions: collectMediaConditions(rules, selector) }).toEqual({
				selector,
				conditions: [REDUCED_MOTION],
			})
	})

	// The mutation this catches is a control transition written at the release's literal duration:
	// the literal ignores the motion factor, and the feedback token rescales with it.
	it('rescales the control transition with the published motion factor', () => {
		const host = scene.mount(
			'<button class="carousel-control-next" type="button" aria-label="Next slide"></button>',
		)
		const control = requireValue(host.querySelector('button'), 'No control')
		expect(readStyle(control, 'transition-duration')).toBe('0.15s')
		document.documentElement.style.setProperty(TOKEN_NAMES.factor.motion, '2')
		expect(readStyle(control, 'transition-duration')).toBe('0.3s')
	})
})

describe('carousel controls', () => {
	// The mutations this catches are a filter written as a literal and a side rule dropped. The
	// control reads nothing in a light scope, the recorded inversion in a dark one, and a consumer's
	// own value where a consumer sets the variable, and no one literal resolves the light, dark, and
	// consumer readings together. The
	// carousel carries an inline start padding, so a control without its side rule sits at its static
	// position inside that padding rather than at the carousel's edge.
	it('pins each control to its side over the whole carousel and reads the filter from its variable', () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 400px; height: 200px; padding-left: 40px">' +
				'<button class="carousel-control-prev" type="button" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button>' +
				'<button class="carousel-control-next" type="button" aria-label="Next slide"><span class="carousel-control-next-icon"></span></button>' +
				'</div>',
		)
		const carousel = requireValue(host.querySelector('.carousel'), 'No carousel')
		const frame = carousel.getBoundingClientRect()
		const [prev, next] = [...carousel.querySelectorAll('button')]
		const controls = [
			requireValue(prev, 'No previous control'),
			requireValue(next, 'No next control'),
		]
		for (const control of controls) {
			const box = control.getBoundingClientRect()
			expect(box.top).toBe(frame.top)
			expect(box.height).toBe(200)
			expect(box.width).toBe(60)
			expect(frame.width).toBe(400)
			for (const [property, value] of [
				['position', 'absolute'],
				['z-index', '1'],
				['display', 'flex'],
				['align-items', 'center'],
				['justify-content', 'center'],
				['text-align', 'center'],
				['padding-left', '0px'],
				['border-top-width', '0px'],
				['background-image', 'none'],
				['background-color', 'rgba(0, 0, 0, 0)'],
				['opacity', '0.5'],
				['filter', 'none'],
			] as const)
				expect({ property, value: readStyle(control, property) }).toEqual({ property, value })
			expect(
				matchesColor(readStyle(control, 'color'), readRootToken('--vn-palette-white-base')),
			).toBe(true)
			// The mark sits at the centre of its control.
			const icon = requireValue(control.firstElementChild, 'No mark').getBoundingClientRect()
			expect(icon.left + icon.width / 2).toBeCloseTo(box.left + box.width / 2, 3)
			expect(icon.top + icon.height / 2).toBeCloseTo(box.top + box.height / 2, 3)
		}
		expect(controls[0]?.getBoundingClientRect().left).toBe(frame.left)
		expect(controls[1]?.getBoundingClientRect().right).toBe(frame.right)
		// The resolved filter clamps the recorded `grayscale(100)` amount to its ceiling of one.
		document.documentElement.setAttribute('data-bs-theme', 'dark')
		for (const control of controls)
			expect(readStyle(control, 'filter')).toBe('invert(1) grayscale(1)')
		document.documentElement.removeAttribute('data-bs-theme')
		carousel.classList.add('retuned')
		scene.load('.retuned { --bs-carousel-control-icon-filter: blur(1px); }')
		for (const control of controls) expect(readStyle(control, 'filter')).toBe('blur(1px)')
	})

	// The mutation this catches is the two marks swapped: each control paints the mark the release
	// records for its own direction, and the previous mark is the chevron opening to the right.
	it('paints each control its own recorded mark at the recorded size', () => {
		const host = scene.mount(
			'<span class="carousel-control-prev-icon"></span><span class="carousel-control-next-icon"></span>',
		)
		const [prev, next] = [...host.querySelectorAll('span')]
		for (const [icon, mark] of [
			[requireValue(prev, 'No previous mark'), CAROUSEL_MARKS.prev],
			[requireValue(next, 'No next mark'), CAROUSEL_MARKS.next],
		] as const) {
			expect(readStyle(icon, 'background-image')).toBe(mark)
			expect(readStyle(icon, 'display')).toBe('inline-block')
			expect(readPixels(icon, 'width')).toBe(32)
			expect(readPixels(icon, 'height')).toBe(32)
			expect(readStyle(icon, 'background-repeat')).toBe('no-repeat')
			expect(readStyle(icon, 'background-position')).toBe('50% 50%')
			expect(readStyle(icon, 'background-size')).toBe('100% 100%')
		}
		// The previous mark's path starts at its right-hand arm and turns at its left-hand point, so it
		// points left; the next mark is the reverse.
		expect(CAROUSEL_MARKS.prev).toContain("d='M11.354 1.646")
		expect(CAROUSEL_MARKS.prev).toContain('L5.707 8')
		expect(CAROUSEL_MARKS.next).toContain("d='M4.646 1.646")
		expect(CAROUSEL_MARKS.next).toContain('L10.293 8')
	})

	// The mutation this catches is a state rule that stops reaching one of its states: the pointer and
	// focus rules share one opacity, so a rule dropping either pseudo-class leaves that state at rest.
	it('moves a control from half to nine-tenths opacity under the pointer and on focus, and back', async () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 400px; height: 200px">' +
				'<button class="carousel-control-prev" type="button" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button>' +
				'</div>',
		)
		const control = requireValue(host.querySelector('button'), 'No control')
		// The control carries an opacity transition, so each reading follows the animation rather than
		// the moment the state flips.
		expect(readStyle(control, 'opacity')).toBe('0.5')
		await hoverAccessible('button', 'Previous slide')
		expect(control.matches(':hover')).toBe(true)
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.9')
		expect(readStyle(control, 'text-decoration-line')).toBe('none')
		expect(
			matchesColor(readStyle(control, 'color'), readRootToken('--vn-palette-white-base')),
		).toBe(true)
		await releasePointer()
		control.focus()
		expect(control.matches(':focus')).toBe(true)
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.9')
		expect(readStyle(control, 'outline-style')).toBe('none')
		control.blur()
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.5')
	})

	// The recorded focus treatment is an opacity change and no ring, and forced colors keep an
	// element's opacity, so the focused control still reads brighter than the resting one there.
	it('keeps the focus opacity under forced colors, where the control draws no outline', async () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 400px; height: 200px">' +
				'<button class="carousel-control-prev" type="button" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button>' +
				'</div>',
		)
		const control = requireValue(host.querySelector('button'), 'No control')
		control.focus()
		await waitForAnimations(control)
		await stageMedia({ forced: true })
		expect(control.matches(':focus')).toBe(true)
		expect(readStyle(control, 'opacity')).toBe('0.9')
		expect(readStyle(control, 'outline-style')).toBe('none')
		control.blur()
		await waitForAnimations(control)
		expect(readStyle(control, 'opacity')).toBe('0.5')
	})
})

describe('carousel indicators and caption', () => {
	// The mutation this catches is a pip sized as a border box: the recorded pip is a 30 by 3 pixel
	// bar inside two transparent 10 pixel borders, so its target is 23 pixels tall, and a border box
	// of the same height leaves no bar inside its borders.
	it('lays the pips out as bars inside a taller transparent target, the current one at full strength', () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 400px; height: 200px"><div class="carousel-indicators">' +
				'<button type="button" data-bs-target="#harbor" class="active" aria-current="true" aria-label="Slide 1"></button>' +
				'<button type="button" data-bs-target="#harbor" aria-label="Slide 2"></button>' +
				'</div></div>',
		)
		const carousel = requireValue(host.querySelector('.carousel'), 'No carousel')
		const strip = requireValue(host.querySelector('.carousel-indicators'), 'No indicators')
		const [current, other] = [...strip.querySelectorAll('button')]
		const pip = requireValue(other, 'No pip')
		for (const [property, value] of [
			['position', 'absolute'],
			['z-index', '2'],
			['display', 'flex'],
			['justify-content', 'center'],
			['padding-left', '0px'],
			['margin-left', '60px'],
			['margin-right', '60px'],
			['margin-bottom', '16px'],
		] as const)
			expect({ property, value: readStyle(strip, property) }).toEqual({ property, value })
		expect(strip.getBoundingClientRect().bottom).toBe(carousel.getBoundingClientRect().bottom - 16)
		for (const [property, value] of [
			['box-sizing', 'content-box'],
			['width', '30px'],
			['height', '3px'],
			['padding-top', '0px'],
			['margin-left', '3px'],
			['margin-right', '3px'],
			['border-top-width', '10px'],
			['border-bottom-width', '10px'],
			['border-left-width', '0px'],
			['border-top-color', 'rgba(0, 0, 0, 0)'],
			['background-clip', 'padding-box'],
			['text-indent', '-999px'],
			['cursor', 'pointer'],
			['flex-grow', '0'],
			['flex-shrink', '1'],
			['opacity', '0.5'],
		] as const)
			expect({ property, value: readStyle(pip, property) }).toEqual({ property, value })
		expect(pip.getBoundingClientRect().height).toBe(23)
		expect(pip.getBoundingClientRect().width).toBe(30)
		expect(readStyle(requireValue(current, 'No current pip'), 'opacity')).toBe('1')
		expect(
			matchesColor(readStyle(pip, 'background-color'), readRootToken('--vn-palette-white-base')),
		).toBe(true)
	})

	// The mutation this catches is an element rule reaching a pip: the release's markup gives the
	// current pip a class and every other pip none, so a rule selecting a button by its class
	// attribute alone paints the resting pips and leaves the current one, and the two states part.
	it('squares every pip and focuses the current and a resting pip alike, with no ring', async () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 400px; height: 200px"><div class="carousel-indicators">' +
				'<button type="button" data-bs-target="#harbor" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>' +
				'<button type="button" data-bs-target="#harbor" data-bs-slide-to="1" aria-label="Slide 2"></button>' +
				'</div></div>',
		)
		const current = requireValue(
			host.querySelector<HTMLElement>('[data-bs-target].active'),
			'No current pip',
		)
		const resting = requireValue(
			host.querySelector<HTMLElement>('[data-bs-target]:not(.active)'),
			'No resting pip',
		)
		const focused: Array<{ readonly outline: string; readonly shadow: string }> = []
		for (const pip of [current, resting]) {
			expect(readPixels(pip, 'border-top-left-radius')).toBe(0)
			pip.focus()
			await pressKeys('{ArrowRight}')
			expect(pip.matches(':focus-visible')).toBe(true)
			focused.push({
				outline: readStyle(pip, 'outline-style'),
				shadow: readStyle(pip, 'box-shadow'),
			})
			pip.blur()
		}
		const [currentRing, restingRing] = focused
		expect(requireValue(currentRing, 'No current reading').shadow).toBe('none')
		expect(restingRing).toEqual(currentRing)
	})

	// The mutation this catches is the strip's bottom margin written as the release's literal: the
	// literal ignores the density factor, and the space token rescales with it.
	it('rescales the strip inset with the published density factor', () => {
		const host = scene.mount('<div class="carousel-indicators"></div>')
		const strip = requireValue(host.querySelector('.carousel-indicators'), 'No indicators')
		expect(readPixels(strip, 'margin-bottom')).toBe(16)
		document.documentElement.style.setProperty(TOKEN_NAMES.factor.density, '2')
		expect(readPixels(strip, 'margin-bottom')).toBe(32)
	})

	// The mutation this catches is a caption color written as a literal white: the caption reads its
	// variable, so a consumer's retune moves it where a literal would not.
	it('insets the caption over the lower part of the carousel and paints it from its variable', () => {
		const host = scene.mount(
			'<div class="carousel" style="width: 400px; height: 200px"><div class="carousel-caption"><p>Harbor at noon</p></div></div>',
		)
		const carousel = requireValue(host.querySelector('.carousel'), 'No carousel')
		const caption = requireValue(host.querySelector('.carousel-caption'), 'No caption')
		for (const [property, value] of [
			['position', 'absolute'],
			['left', '60px'],
			['right', '60px'],
			['bottom', '20px'],
			['padding-top', '20px'],
			['padding-bottom', '20px'],
			['text-align', 'center'],
		] as const)
			expect({ property, value: readStyle(caption, property) }).toEqual({ property, value })
		expect(caption.getBoundingClientRect().bottom).toBe(
			carousel.getBoundingClientRect().bottom - 20,
		)
		expect(
			matchesColor(readStyle(caption, 'color'), readRootToken('--vn-palette-white-base')),
		).toBe(true)
		carousel.classList.add('retuned')
		scene.load('.retuned { --bs-carousel-caption-color: rgb(10, 20, 30); }')
		expect(readStyle(caption, 'color')).toBe('rgb(10, 20, 30)')
	})
})

describe('carousel dark retune', () => {
	// The mutation this catches is a dark class that omits one of its variables: each variable is
	// read through the property it paints, so the omitted one keeps the light paint.
	it('retunes every carousel variable on the dark class and inside a dark island, and a light island restores them', () => {
		const markup =
			'<div class="carousel CLASSES" style="width: 400px; height: 200px">' +
			'<div class="carousel-indicators"><button type="button" data-bs-target="#harbor" class="active" aria-current="true" aria-label="Slide 1"></button></div>' +
			'<div class="carousel-caption">Harbor at noon</div>' +
			'<button class="carousel-control-prev" type="button" aria-label="Previous slide"><span class="carousel-control-prev-icon"></span></button>' +
			'</div>'
		const host = scene.mount(
			`<div data-scope="light">${markup.replace('CLASSES', '')}</div>` +
				`<div data-scope="class">${markup.replace('CLASSES', 'carousel-dark')}</div>` +
				`<div data-scope="island" data-bs-theme="dark">${markup.replace('CLASSES', '')}</div>` +
				`<div data-bs-theme="dark"><div data-scope="nested" data-bs-theme="light">${markup.replace('CLASSES', '')}</div></div>`,
		)
		const white = readRootToken('--vn-palette-white-base')
		const black = readRootToken('--vn-palette-black-base')
		const readings = ['light', 'class', 'island', 'nested'].map((scope) => {
			const carousel = requireValue(
				host.querySelector(`[data-scope="${scope}"] .carousel`),
				`No ${scope} carousel`,
			)
			const caption = requireValue(carousel.querySelector('.carousel-caption'), 'No caption')
			const pip = requireValue(carousel.querySelector('[data-bs-target]'), 'No pip')
			const control = requireValue(carousel.querySelector('.carousel-control-prev'), 'No control')
			return [
				scope,
				matchesColor(readStyle(caption, 'color'), white) ? 'white' : undefined,
				matchesColor(readStyle(caption, 'color'), black) ? 'black' : undefined,
				matchesColor(readStyle(pip, 'background-color'), white) ? 'white' : undefined,
				matchesColor(readStyle(pip, 'background-color'), black) ? 'black' : undefined,
				readStyle(control, 'filter'),
				readToken(control, '--bs-carousel-control-icon-filter').trim(),
			]
		})
		expect(readings).toEqual([
			['light', 'white', undefined, 'white', undefined, 'none', ''],
			[
				'class',
				undefined,
				'black',
				undefined,
				'black',
				'invert(1) grayscale(1)',
				CAROUSEL_INVERSION,
			],
			[
				'island',
				undefined,
				'black',
				undefined,
				'black',
				'invert(1) grayscale(1)',
				CAROUSEL_INVERSION,
			],
			['nested', 'white', undefined, 'white', undefined, 'none', ''],
		])
	})
})
