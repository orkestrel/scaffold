describe('ValueResolver', () => {
	// The release side reads the installed stylesheet. The emitted side reads a small sheet that
	// declares only the names the planted values read, with a mode scope that retunes one of them,
	// so each classification in the following cases turns on a value this proof chose rather than
	// on the shipped cascade. The canonical side reads one sheet for both values, as the ledger gate
	// does.
	const emitted = [
		':root { --vn-factor-density: 1; --vn-space-8: calc(1rem * var(--vn-factor-density)); --vn-size-2: 0.875rem; --vn-link: #0d6efd; --vn-color-primary-base: oklch(0.48 0.255 264); --vn-button-face: #fff; --vn-font-sans: serif; --bs-btn-disabled-opacity: 0.65; --bs-body-color: #212529; --vn-gray-100: #f8f9fa; --vn-gray-200: #e9ecef; --vn-container-sm: 540px; --vn-radius-pill: 40rem }',
		'[data-bs-theme=dark] { --vn-link: #6ea8fe }',
		'#sample { --vn-sample-id: 3px }',
		':where(button.page-link) { --vn-sample-where: 5px }',
	].join('\n')
	const canonical = ':root { --vn-factor-radius: 1 }'
	let resolver: ValueResolver | undefined
	let tokens: ValueResolver | undefined

	beforeAll(async () => {
		resolver = await createValueResolver(readBootstrapCascade(), emitted)
		tokens = await createValueResolver(canonical, canonical)
	}, LEDGER_TIMEOUT)

	afterAll(async () => {
		await resolver?.destroy()
		await tokens?.destroy()
	})

	it('classifies a pair whose values differ in text and resolve alike as its text-only member, and an unwritten declaration as dropped', async () => {
		const gaps = [
			['accordion', '.accordion', '--bs-accordion-btn-padding-y', ['1rem'], 'var(--vn-space-8)'],
			['btn', '.btn', 'opacity', ['0.65'], 'var(--bs-btn-disabled-opacity)'],
			['reboot', 'small', 'font-size', ['0.875em'], '87.5%'],
			['sticky', '.sticky-top', 'position', ['-webkit-sticky', 'sticky'], 'sticky'],
			['reboot', 'body', 'color', ['var(--bs-body-color)'], 'var(--bs-body-color, red)'],
			['theme', ':root', '--bs-link-color', ['#0d6efd'], 'var(--vn-link)'],
			['theme', '[data-bs-theme=dark]', '--bs-link-color', ['#6ea8fe'], 'var(--vn-link)'],
			['btn', '.btn', 'filter', ['none'], undefined],
		] as const
		const ledger = await classifyValueGaps(
			gaps.map(([component, selector, property, written, value]) => ({
				component,
				selector,
				property,
				condition: undefined,
				recorded: written[0],
				emitted: value,
				written,
			})),
			requireValue(resolver, 'No resolver launched'),
		)
		expect(ledger.departures.map(describeDeparture)).toEqual([
			'accordion | .accordion | --bs-accordion-btn-padding-y | — | 1rem | var(--vn-space-8) | tokenized',
			'btn | .btn | opacity | — | 0.65 | var(--bs-btn-disabled-opacity) | aliased',
			'reboot | small | font-size | — | 0.875em | 87.5% | restated',
			'sticky | .sticky-top | position | — | -webkit-sticky | sticky | restated',
			'reboot | body | color | — | var(--bs-body-color) | var(--bs-body-color, red) | fallback',
			'theme | :root | --bs-link-color | — | #0d6efd | var(--vn-link) | tokenized',
			'theme | [data-bs-theme=dark] | --bs-link-color | — | #6ea8fe | var(--vn-link) | tokenized',
			'btn | .btn | filter | — | none | — | dropped',
		])
		expect(ledger.undecided).toEqual([])
	})

	it('classifies a pair whose values resolve apart as retuned, whatever its text reads', async () => {
		const gaps = [
			['btn', '.btn', '--bs-btn-font-size', '1rem', 'var(--vn-size-2)'],
			['theme', ':root', '--bs-primary', '#0d6efd', 'var(--vn-color-primary-base)'],
			['reboot', 'hr', 'opacity', '0.25', '0.2'],
			['theme', '[data-bs-theme=dark]', '--bs-link-color', '#0d6efd', 'var(--vn-link)'],
			[
				'btn',
				'[data-bs-theme=dark] .btn-primary',
				'--bs-btn-color',
				'#fff',
				'light-dark(#fff, #000)',
			],
			['btn', '.btn-primary', '--bs-btn-color', '#fff', 'light-dark(#fff, #000)'],
		] as const
		const ledger = await classifyValueGaps(
			gaps.map(([component, selector, property, recorded, value]) => ({
				component,
				selector,
				property,
				condition: undefined,
				recorded,
				emitted: value,
				written: [recorded],
			})),
			requireValue(resolver, 'No resolver launched'),
		)
		// The last pair is the control: the same `light-dark()` value outside the dark scope resolves
		// to the release's `#fff`, so its member is the text-only one, and the dark row above it is
		// retuned by its mode alone.
		expect(ledger.departures.map((row) => row.departure)).toEqual([
			'retuned',
			'retuned',
			'retuned',
			'retuned',
			'retuned',
			'restated',
		])
		expect(ledger.undecided).toEqual([])
	})

	it('names each pair the resolver cannot decide, and classifies none of them', async () => {
		// No typed probe parses both a length and a color, and Chromium parses no declaration of a
		// position the release writes only in its prefixed form.
		const gaps = [
			{
				component: 'btn',
				selector: '.btn',
				property: '--bs-btn-padding-x',
				condition: undefined,
				recorded: '1px',
				emitted: 'red',
				written: ['1px'],
			},
			{
				component: 'sticky',
				selector: '.sticky-top',
				property: 'position',
				condition: '@media print',
				recorded: '-webkit-sticky',
				emitted: 'sticky',
				written: ['-webkit-sticky'],
			},
		]
		const ledger = await classifyValueGaps(gaps, requireValue(resolver, 'No resolver launched'))
		expect(ledger.undecided).toEqual([
			'btn | .btn | --bs-btn-padding-x | — | 1px | red',
			'sticky | .sticky-top | position | @media print | -webkit-sticky | sticky',
		])
		expect(ledger.undecided).toEqual(gaps.map(describeValueGap))
		expect(ledger.departures).toEqual([])
	})

	it('resolves each side in its own stylesheet, a custom property through the first typed probe both values parse', async () => {
		const read = await requireValue(resolver, 'No resolver launched').resolve([
			{
				selector: '.accordion',
				property: '--bs-accordion-btn-padding-y',
				recorded: ['1rem'],
				emitted: ['var(--vn-space-8)'],
			},
			{
				selector: ':root',
				property: '--bs-border-color-translucent',
				recorded: ['rgba(0, 0, 0, 0.175)'],
				emitted: ['color-mix(in srgb, #000 17.5%, transparent)'],
			},
			{
				selector: ':root',
				property: '--bs-heading-color-rgb',
				recorded: ['var(--bs-body-color-rgb)'],
				emitted: ['33, 37, 41'],
			},
			{ selector: '.btn', property: '--bs-btn-font-family', recorded: [''], emitted: ['serif'] },
			{ selector: '.btn', property: 'filter', recorded: ['none'], emitted: [] },
			{
				selector: '.btn',
				property: '--bs-btn-focus-box-shadow',
				recorded: ['0 0 0 0.25rem rgba(13, 110, 253, 0.25)'],
				emitted: ['0 0 0 4px color-mix(in srgb, #0d6efd 25%, transparent)'],
			},
			{
				selector: ':root',
				property: '--bs-font-sans-serif',
				recorded: ['system-ui, "Segoe UI"'],
				emitted: ["system-ui, 'Segoe UI'"],
			},
			{
				selector: ':root',
				property: '--bs-ease',
				recorded: ['cubic-bezier(0.32, 0.72, 0, 1)'],
				emitted: ['cubic-bezier(.32,.72,0,1)'],
			},
			{ selector: 'small', property: 'font-size', recorded: ['0.875em'], emitted: ['87.5%'] },
			{
				selector: ':root',
				property: '--bs-gradient',
				recorded: ['linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))'],
				emitted: [
					'linear-gradient(180deg, color-mix(in srgb, #fff 15%, transparent), transparent)',
				],
			},
		])
		expect(read).toEqual([
			{ recorded: '16px', emitted: '16px' },
			{ recorded: 'rgba(0, 0, 0, 0.176)', emitted: 'rgba(0, 0, 0, 0.176)' },
			{ recorded: '33, 37, 41', emitted: '33, 37, 41' },
			{ recorded: '', emitted: 'serif' },
			undefined,
			{
				recorded: 'rgba(13, 110, 253, 0.25) 0px 0px 0px 4px',
				emitted: 'rgba(13, 110, 253, 0.25) 0px 0px 0px 4px',
			},
			{ recorded: 'system-ui, "Segoe UI"', emitted: 'system-ui, "Segoe UI"' },
			{ recorded: 'cubic-bezier(0.32, 0.72, 0, 1)', emitted: 'cubic-bezier(0.32, 0.72, 0, 1)' },
			{ recorded: '14px', emitted: '14px' },
			{
				recorded: 'linear-gradient(rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0))',
				emitted: 'linear-gradient(rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0))',
			},
		])
	})

	it('compares a duration and a percentage as the values Chromium computes, whatever their notation', async () => {
		const read = await requireValue(resolver, 'No resolver launched').resolve(
			[
				['150ms', '0.15s'],
				['15%', '15.0%'],
				['15%', '16%'],
			].map(([recorded = '', value = '']) => ({
				selector: ':root',
				property: '--vn-sample',
				recorded: [recorded],
				emitted: [value],
			})),
		)
		expect(read).toEqual([
			{ recorded: '0.15s', emitted: '0.15s' },
			{ recorded: '15%', emitted: '15%' },
			{ recorded: '15%', emitted: '16%' },
		])
	})

	it('types a custom property through each probe syntax an input no syntax tried before it parses', async () => {
		// Each input pair is written two ways that only its own syntax computes alike, and no probe
		// tried before it parses both values, so a syntax missing from the table leaves its pair to
		// a later probe that refuses it and the pair reads undecided.
		const inputs: Readonly<Record<string, readonly [string, string, string]>> = {
			'<number>#': ['1, 2.0', '1,2', '1, 2'],
			'<length-percentage>+': ['1in 50%', '96px 50.0%', '96px 50%'],
			'<time>': ['150ms', '0.15s', '0.15s'],
			'<angle>': ['0.5turn', '180deg', '180deg'],
			'<color>': ['#ff0000', 'red', 'rgb(255, 0, 0)'],
		}
		expect(Object.keys(inputs)).toEqual(Object.keys(PROBE_SYNTAXES))
		const reader = requireValue(resolver, 'No resolver launched')
		const read = await reader.resolve(
			Object.values(inputs).map(([recorded, value]) => ({
				selector: ':root',
				property: '--vn-sample',
				recorded: [recorded],
				emitted: [value],
			})),
		)
		expect(read).toEqual(
			Object.values(inputs).map(([, , computed]) => ({ recorded: computed, emitted: computed })),
		)
		// Each syntax's two registrations must compute apart, or a refused value would read as parsed.
		const controls = await reader.resolve(
			Object.values(PROBE_SYNTAXES).map(([initial, control]) => ({
				selector: ':root',
				property: '--vn-sample',
				recorded: [initial],
				emitted: [control],
			})),
		)
		expect(controls.map((resolution) => resolution?.recorded !== resolution?.emitted)).toEqual(
			Object.keys(PROBE_SYNTAXES).map(() => true),
		)
	})

	it('decides a pair alike only where both sides compute alike in every context their terms read', async () => {
		const pairs = [
			['margin-left', '0.5em', 'calc(1em / 2)'],
			['margin-left', '1em', '16px'],
			['width', '50%', '500px'],
			['padding-left', 'calc(50% - 1px)', '499px'],
			['background-color', 'currentColor', 'red'],
			['background-color', 'currentColor', '#000'],
			['font-size', 'inherit', '20px'],
			['font-size', 'inherit', '16px'],
			['line-height', 'inherit', 'normal'],
			['text-align', '-webkit-match-parent', 'left'],
			['margin-left', '1rem', '16px'],
			['margin-left', '1vw', '12.8px'],
			['--vn-sample', '1em', '16px'],
		] as const
		const read = await requireValue(resolver, 'No resolver launched').resolve(
			pairs.map(([property, recorded, value]) => ({
				selector: '.btn',
				property,
				recorded: [recorded],
				emitted: [value],
			})),
		)
		// The first pair computes alike in every context, and reads its base values. Each other pair
		// computes alike in the base context and apart in the one context its term reads: the font
		// size, the containing block, the color, the parent's value, the direction, the root font
		// size, or the viewport. The brief's inputs that differ in the base context read there.
		expect(read).toEqual([
			{ recorded: '8px', emitted: '8px' },
			{ recorded: '20px', emitted: '16px' },
			{ recorded: '200px', emitted: '500px' },
			{ recorded: '199px', emitted: '499px' },
			{ recorded: 'rgb(0, 0, 0)', emitted: 'rgb(255, 0, 0)' },
			{ recorded: 'rgb(1, 2, 3)', emitted: 'rgb(0, 0, 0)' },
			{ recorded: '16px', emitted: '20px' },
			{ recorded: '20px', emitted: '16px' },
			{ recorded: '1px', emitted: 'normal' },
			{ recorded: 'right', emitted: 'left' },
			{ recorded: '20px', emitted: '16px' },
			{ recorded: '8px', emitted: '12.8px' },
			{ recorded: '20px', emitted: '16px' },
		])
	})

	it('names undecided a pair whose term reads a context the resolver cannot vary', async () => {
		// No setting varies the environment an `env()` reads, and no value the resolver tries as a
		// parent parses for the feature settings, so the inherited side has one parent to read.
		const read = await requireValue(resolver, 'No resolver launched').resolve([
			{
				selector: '.btn',
				property: 'padding-top',
				recorded: ['env(safe-area-inset-top, 0px)'],
				emitted: ['0px'],
			},
			{
				selector: '.btn',
				property: 'font-feature-settings',
				recorded: ['inherit'],
				emitted: ['normal'],
			},
			{ selector: '.btn', property: 'padding-top', recorded: ['0px'], emitted: ['0'] },
		])
		expect(read).toEqual([undefined, undefined, { recorded: '0px', emitted: '0px' }])
	})

	it('reads the mode from the target and its ancestors, never from a sibling', async () => {
		const selectors = [
			'[data-bs-theme=dark] + .btn',
			'[data-bs-theme=dark] ~ .btn',
			'[data-bs-theme=dark] .btn',
			'[data-bs-theme=dark] > .btn',
		]
		expect(selectors.map(inferScopeMode)).toEqual([undefined, undefined, 'dark', 'dark'])
		expect(inferScopeMode('[data-bs-theme=dark] [data-bs-theme=light] .btn')).toBe('light')
		expect(inferScopeMode('[data-bs-theme=light] [data-bs-theme=dark]')).toBe('dark')
		expect(inferScopeMode('[data-bs-theme=dark] > .nav + .btn')).toBe('dark')
		expect(inferScopeMode('[data-bs-theme=dark] + .nav > .btn')).toBeUndefined()
		expect(inferScopeMode(':root')).toBeUndefined()
		const read = await requireValue(resolver, 'No resolver launched').resolve(
			selectors.map((selector) => ({
				selector,
				property: 'color',
				recorded: ['light-dark(red, blue)'],
				emitted: ['red'],
			})),
		)
		expect(read).toEqual([
			{ recorded: 'rgb(255, 0, 0)', emitted: 'rgb(255, 0, 0)' },
			{ recorded: 'rgb(255, 0, 0)', emitted: 'rgb(255, 0, 0)' },
			{ recorded: 'rgb(0, 0, 255)', emitted: 'rgb(255, 0, 0)' },
			{ recorded: 'rgb(0, 0, 255)', emitted: 'rgb(255, 0, 0)' },
		])
	})

	it('builds one element per compound that matches it, nested or beside the one before it', () => {
		expect(collectContextElements('.form-floating > textarea:focus ~ label::after')).toEqual([
			{
				tag: 'div',
				classes: ['form-floating'],
				attributes: [],
				compound: '.form-floating',
				nested: true,
			},
			{ tag: 'textarea', classes: [], attributes: [], compound: 'textarea', nested: true },
			{ tag: 'label', classes: [], attributes: [], compound: 'label', nested: false },
		])
		expect(
			collectContextElements('[data-bs-theme=dark] .btn-check:checked + .btn:not(.active)'),
		).toEqual([
			{
				tag: 'div',
				classes: [],
				attributes: [['data-bs-theme', 'dark']],
				compound: '[data-bs-theme=dark]',
				nested: true,
			},
			{ tag: 'div', classes: ['btn-check'], attributes: [], compound: '.btn-check', nested: true },
			{ tag: 'div', classes: ['btn'], attributes: [], compound: '.btn', nested: false },
		])
		expect(
			collectContextElements('select.form-select[size="1"][data-popper-placement^=top]'),
		).toEqual([
			{
				tag: 'select',
				classes: ['form-select'],
				attributes: [
					['size', '1'],
					['data-popper-placement', 'top'],
				],
				compound: 'select.form-select[size="1"][data-popper-placement^=top]',
				nested: true,
			},
		])
		expect(collectContextElements('#sample')).toEqual([
			{ tag: 'div', classes: [], attributes: [['id', 'sample']], compound: '#sample', nested: true },
		])
		expect(collectContextElements(':where(button.page-link):hover')).toEqual([
			{
				tag: 'button',
				classes: ['page-link'],
				attributes: [],
				compound: ':where(button.page-link)',
				nested: true,
			},
		])
		expect(collectContextElements(':root')).toEqual([
			{ tag: 'div', classes: [], attributes: [], compound: '*', nested: true },
		])
		expect(() => collectContextElements('.btn[data-x~=]')).toThrow(
			'Context element reader reads no attribute selector: [data-x~=]',
		)
	})

	it('writes the part of a compound an element must match, without its state or its pseudo-elements', () => {
		expect(extractMatchedCompound('.btn:hover::after')).toBe('.btn')
		expect(extractMatchedCompound('a:not([href]):not([class])')).toBe('a')
		expect(extractMatchedCompound(':where(button.page-link):focus-visible')).toBe(
			':where(button.page-link)',
		)
		expect(extractMatchedCompound(':is(h1:hover, .h1)::before')).toBe(':is(h1, .h1)')
		expect(extractMatchedCompound('.form-range::-webkit-slider-thumb:active')).toBe(
			'.form-range',
		)
		expect(extractMatchedCompound('[data-x=":hover"]:checked')).toBe('[data-x=":hover"]')
		expect(extractMatchedCompound(':disabled')).toBe('*')
	})

	it('reads every variable at an element that matches its compound, and names a compound it cannot build undecided', async () => {
		const read = await requireValue(resolver, 'No resolver launched').resolve([
			{
				selector: '#sample',
				property: 'padding-top',
				recorded: ['3px'],
				emitted: ['var(--vn-sample-id)'],
			},
			{
				selector: ':where(button.page-link)',
				property: 'padding-top',
				recorded: ['5px'],
				emitted: ['var(--vn-sample-where)'],
			},
			{ selector: 'a:is(button)', property: 'padding-top', recorded: ['1px'], emitted: ['2px'] },
			{
				selector: ':is(.alpha > .beta)',
				property: 'padding-top',
				recorded: ['1px'],
				emitted: ['2px'],
			},
		])
		expect(read).toEqual([
			{ recorded: '3px', emitted: '3px' },
			{ recorded: '5px', emitted: '5px' },
			undefined,
			undefined,
		])
	})

	it('names a planted unrecorded departure, a planted stale row, and each planted difference it cannot decide', async () => {
		const scratch = createScratch()
		try {
			const path = scratch.write('ledger.md', LEDGER_GUIDE)
			const measured = await classifyValueGaps(
				collectLedger(LEDGER_CASCADE, LEDGER_INVENTORY, LEDGER_SHIPPED).gaps,
				requireValue(resolver, 'No resolver launched'),
			)
			const carried = scanLedgerDrift(measured.departures, readDepartures(path), describeDeparture)
			// The release's `var()` names a variable it never declares, so its side computes as
			// `unset` and inherits a parent the cascade's `start` fallback does not read.
			expect(carried.unrecorded).toEqual([
				'btn | .btn | opacity | — | 0.65 | var(--bs-btn-disabled-opacity) | aliased',
				'btn | .btn | padding | @media (width >= 576px) | 1rem | 0 | retuned',
				'reboot | body | text-align | — | var(--bs-body-text-align) | var(--bs-body-text-align, start) | retuned',
				'reboot | body | color | — | #000 | red | retuned',
				'table | .caption-top | caption-side | — | top | — | dropped',
			])
			expect(carried.stale).toEqual([])
			// Chromium parses no empty font family, and no probe types both an inversion and `none`,
			// so the planted world carries two differences no resolution decides.
			expect(measured.undecided).toEqual([
				'btn | .btn | font-family | — | (empty) | var(--vn-font-sans)',
				'btn | :root | --bs-btn-close-filter | — | invert(1) | none',
			])
			scratch.write('ledger.md', LEDGER_GUIDE.replaceAll('| `#fff` |', '| `#eee` |'))
			expect(
				scanLedgerDrift(measured.departures, readDepartures(path), describeDeparture).stale,
			).toEqual(['btn | .btn | color | — | #eee | var(--vn-button-face) | tokenized'])
			expect(measured.departures.map(describeDeparture)).toEqual(
				measured.departures.map((row) => `${describeValueGap(row)} | ${row.departure}`),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('normalizes a color only where it stands as a color value, never inside a string or a URL', async () => {
		expect(normalizeResolvedColors('"color(srgb 1 0 0)"')).toBe('"color(srgb 1 0 0)"')
		expect(normalizeResolvedColors("'rgba(0, 0, 0, 0.5)' color(srgb 1 0 0)")).toBe(
			"'rgba(0, 0, 0, 0.5)' rgb(255, 0, 0)",
		)
		expect(normalizeResolvedColors('url("color(srgb 1 0 0).svg") color(srgb 0 0 1)')).toBe(
			'url("color(srgb 1 0 0).svg") rgb(0, 0, 255)',
		)
		expect(normalizeResolvedColors('url(rgb(1,2,3).svg)')).toBe('url(rgb(1,2,3).svg)')
		expect(normalizeResolvedColors('"a \\" color(srgb 1 0 0)"')).toBe('"a \\" color(srgb 1 0 0)"')
		const read = await requireValue(resolver, 'No resolver launched').resolve([
			{
				selector: '.sample::before',
				property: 'content',
				recorded: ['"color(srgb 1 0 0)"'],
				emitted: ['"rgb(255, 0, 0)"'],
			},
		])
		expect(read).toEqual([{ recorded: '"color(srgb 1 0 0)"', emitted: '"rgb(255, 0, 0)"' }])
	})

	it('writes every sRGB color at the 8-bit precision a legacy color computes to, and leaves every other color alone', () => {
		expect(normalizeResolvedColors('rgba(0, 0, 0, 0.176)')).toBe('rgba(0, 0, 0, 0.176)')
		expect(normalizeResolvedColors('color(srgb 0 0 0 / 0.175)')).toBe('rgba(0, 0, 0, 0.176)')
		expect(
			normalizeResolvedColors('color(srgb 0.0509804 0.431373 0.992157 / 0.25) 0px 0px 0px 4px'),
		).toBe('rgba(13, 110, 253, 0.25) 0px 0px 0px 4px')
		expect(normalizeResolvedColors('rgb(13, 110, 253)')).toBe('rgb(13, 110, 253)')
		expect(normalizeResolvedColors('color(srgb 0.0509804 0.431373 0.992157)')).toBe(
			'rgb(13, 110, 253)',
		)
		expect(normalizeResolvedColors('color(srgb -0.0789361 0.451636 0.195783)')).toBe(
			'rgb(-20, 115, 50)',
		)
		expect(normalizeResolvedColors('color(srgb 1e-06 1 1 / 0.5)')).toBe('rgba(0, 255, 255, 0.5)')
		expect(normalizeResolvedColors('rgba(0, 0, 0, 0)')).toBe('rgba(0, 0, 0, 0)')
		expect(
			normalizeResolvedColors(
				'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))',
			),
		).toBe('linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0))')
		expect(normalizeResolvedColors('color(srgb 1 1 1 / 0)')).toBe('rgba(0, 0, 0, 0)')
		expect(normalizeResolvedColors('oklch(0.48 0.255 264)')).toBe('oklch(0.48 0.255 264)')
		expect(normalizeResolvedColors('color(display-p3 1 0 0)')).toBe('color(display-p3 1 0 0)')
	})

	it('names a canonical token whose declaration resolves apart from its reference cell, at every site that declares it', async () => {
		const references = [
			{
				token: '--vn-radius-base',
				light: 'calc(0.375rem * var(--vn-factor-radius))',
				dark: 'calc(0.375rem * var(--vn-factor-radius))',
				source: 'elements',
			},
		]
		const declared = ':root { --vn-radius-base: calc(0.375rem * var(--vn-factor-radius)) }'
		const doubled = ':root { --vn-radius-base: calc(0.75rem * var(--vn-factor-radius)) }'
		const sited = `${declared}\n.btn { --vn-radius-base: 1rem }`
		const reader = requireValue(tokens, 'No resolver launched')
		expect(await scanCanonicalValues(readCascadeBlocks(declared), references, reader)).toEqual([])
		expect(await scanCanonicalValues(readCascadeBlocks(doubled), references, reader)).toEqual([
			'--vn-radius-base | :root | — | calc(0.375rem * var(--vn-factor-radius)) | calc(0.75rem * var(--vn-factor-radius)) | 6px | 12px',
			'--vn-radius-base | [data-bs-theme=dark] | — | calc(0.375rem * var(--vn-factor-radius)) | calc(0.75rem * var(--vn-factor-radius)) | 6px | 12px',
		])
		expect(await scanCanonicalValues(readCascadeBlocks(sited), references, reader)).toEqual([
			'--vn-radius-base | .btn | — | calc(0.375rem * var(--vn-factor-radius)) | 1rem | 6px | 16px',
			'--vn-radius-base | [data-bs-theme=dark] .btn | — | calc(0.375rem * var(--vn-factor-radius)) | 1rem | 6px | 16px',
		])
		expect(
			await scanCanonicalValues(readCascadeBlocks('.btn { color: red }'), references, reader),
		).toEqual(['--vn-radius-base | :root | — | calc(0.375rem * var(--vn-factor-radius)) | —'])
	})

	it('compares a declaration outside every mode scope with the cell of each mode, and one inside a scope with that mode alone', async () => {
		const references = [
			{ token: '--vn-text-body-base', light: 'red', dark: 'blue', source: 'elements' },
		]
		const scoped = ':root { --vn-text-body-base: red }\n[data-bs-theme=dark] { --vn-text-body-base: blue }'
		const reader = requireValue(tokens, 'No resolver launched')
		expect(
			await scanCanonicalValues(
				readCascadeBlocks(`${scoped}\n.btn { --vn-text-body-base: red }`),
				references,
				reader,
			),
		).toEqual([
			'--vn-text-body-base | [data-bs-theme=dark] .btn | — | blue | red | rgb(0, 0, 255) | rgb(255, 0, 0)',
		])
		expect(
			await scanCanonicalValues(
				readCascadeBlocks(
					`${scoped}\n[data-bs-theme=dark] .btn { --vn-text-body-base: blue }\n[data-bs-theme=light] .btn { --vn-text-body-base: red }`,
				),
				references,
				reader,
			),
		).toEqual([])
	})

	it('compares the written text of a canonical token and its cell where both resolve to nothing', async () => {
		const references = [
			{ token: '--vn-text-heading', light: 'inherit', dark: 'inherit', source: 'elements' },
		]
		const reader = requireValue(tokens, 'No resolver launched')
		expect(
			await scanCanonicalValues(
				readCascadeBlocks(':root { --vn-text-heading: inherit }'),
				references,
				reader,
			),
		).toEqual([])
		expect(
			await scanCanonicalValues(
				readCascadeBlocks(':root { --vn-text-heading: initial }'),
				references,
				reader,
			),
		).toEqual([
			'--vn-text-heading | :root | — | inherit | initial | (empty) | (empty)',
			'--vn-text-heading | [data-bs-theme=dark] | — | inherit | initial | (empty) | (empty)',
		])
	})

	it('names each bootstrap token no departure row reads at the release value, by the token alone', async () => {
		const references = [
			{ token: '--vn-gray-100', light: '#f8f9fa', dark: '#f8f9fa', source: 'bootstrap' },
			{ token: '--vn-gray-200', light: '#e9ecef', dark: '#e9ecef', source: 'bootstrap' },
			{ token: '--vn-container-sm', light: '540px', dark: '540px', source: 'bootstrap' },
			{ token: '--vn-gray-300', light: '#dee2e6', dark: '#dee2e6', source: 'bootstrap' },
			{ token: '--vn-radius-pill', light: '40rem', dark: '40rem', source: 'bootstrap' },
			{ token: '--vn-color-primary-base', light: 'red', dark: 'red', source: 'elements' },
		]
		const departures = [
			['theme', ':root', '--bs-gray-100', '#f8f9fa', 'var(--vn-gray-100)', 'tokenized'],
			// A retuned row reads the token and still witnesses nothing.
			['theme', ':root', '--bs-gray-200', '#e9ecef', 'var(--vn-gray-200)', 'retuned'],
			[
				'container',
				'.container-sm',
				'max-width',
				'540px',
				'calc(var(--vn-container-sm) * 1)',
				'tokenized',
			],
			// A near-miss name reads another token, so the gray-300 token has no row reading it.
			['theme', ':root', '--bs-gray-300', '#dee2e6', 'var(--vn-gray-3000)', 'tokenized'],
			// The alias reaches the release's `50rem` only through arithmetic on the token, whose own
			// value is `40rem`, so the row does not witness it.
			[
				'theme',
				':root',
				'--bs-border-radius-pill',
				'50rem',
				'calc(var(--vn-radius-pill) * 1.25)',
				'tokenized',
			],
			['theme', ':root', '--bs-primary', '#0d6efd', 'var(--vn-color-primary-base)', 'retuned'],
		] as const
		expect(
			await scanWitnesses(
				departures.map(([component, selector, property, recorded, value, departure]) => ({
					component,
					selector,
					property,
					condition: undefined,
					recorded,
					emitted: value,
					departure,
				})),
				references,
				requireValue(resolver, 'No resolver launched'),
			),
		).toEqual(['--vn-gray-200', '--vn-gray-300', '--vn-radius-pill'])
	})
})
