/**
 * Extracts the part of one compound selector an element built for it must match.
 *
 * @param compound - One compound of a complex selector.
 * @returns The compound with every pseudo-element and every pseudo-class left out except an
 *   `:is()` or a `:where()`, whose alternatives are written the same way and joined by `, `, or
 *   `*` where nothing is left.
 *
 * @remarks
 * A pseudo-class names a state the element is in, a position among its siblings, or a relative it
 * has, and a pseudo-element names a box the element generates, and the {@link ValueResolver} class
 * reads the variables an element carries rather than any of those. An `:is()` or a `:where()`
 * argument is part of the selector the element matches through, so it stays, and the element must
 * match one of its alternatives. A colon inside a string or an attribute value is text rather than
 * a pseudo.
 *
 * @example
 * ```ts
 * extractMatchedCompound(':where(button.page-link):focus-visible') // ':where(button.page-link)'
 * ```
 */
export function extractMatchedCompound(compound: string): string {
	const steps = walkSelector(compound)
	let matched = ''
	let index = 0
	while (index < steps.length) {
		const step = steps[index]
		if (step === undefined) break
		if (step.char !== ':' || step.literal || step.depth !== 0) {
			matched += step.char
			index += 1
			continue
		}
		const element = steps[index + 1]?.char === ':'
		const name = readIdentifier(steps, index + (element ? 2 : 1))
		const end = name?.end ?? index + (element ? 2 : 1)
		if (steps[end]?.char !== '(' || steps[end]?.literal === true) {
			index = end
			continue
		}
		const closer = steps.find(
			(candidate) =>
				candidate.index > end &&
				candidate.char === ')' &&
				!candidate.literal &&
				candidate.depth === step.depth,
		)
		const after = closer === undefined ? steps.length : closer.index + 1
		const keyword = name?.text.toLowerCase()
		if (!element && (keyword === 'is' || keyword === 'where'))
			matched += `:${keyword}(${splitTopLevelList(compound.slice(end + 1, after - 1))
				.map((alternative) => extractMatchedCompound(alternative))
				.join(', ')})`
		index = after
	}
	return matched === '' ? '*' : matched
}

/**
 * Collects the elements that stand for one site's selector, one per compound.
 *
 * @param selector - The site's selector, normalized.
 * @returns One element per compound the {@link splitTopLevelCompounds} helper reads, in written
 *   order, each carrying the compound's tag, its own classes, its attributes, and the part of the
 *   compound it must match.
 * @throws When a compound carries an attribute selector this reader does not parse, or a form the
 *   {@link readCompoundTag} helper does not read, so a site the resolver cannot build reddens
 *   instead of resolving on the wrong elements.
 *
 * @remarks
 * A variable reaches an element by inheritance, so the {@link ValueResolver} class nests each
 * element inside the one before it and reads the last. A `+` or a `~` combinator joins a sibling
 * rather than an ancestor, so that element sits beside the one before it and inherits nothing from
 * it. An id selector is read as the `id` attribute it tests, and an attribute selector's operator
 * as the equality it narrows to, because the value it names satisfies every one of them. An
 * `:is()` or a `:where()` argument adds the tag, classes, and attributes of its first alternative
 * that is one compound, so `:where(button.page-link)` builds a `button` carrying the `page-link`
 * class. Every other pseudo-class and every pseudo-element is left out, because the resolver reads
 * the variables the element carries and not the state it is in. The resolver checks each element
 * against its `compound` member in Chromium, and a pair whose elements do not all match is
 * undecided.
 *
 * @example
 * ```ts
 * collectContextElements('.form-floating > textarea:focus ~ label::after').map((element) => element.tag)
 * // ['div', 'textarea', 'label']
 * ```
 */
export function collectContextElements(selector: string): readonly ContextElement[] {
	const elements: ContextElement[] = []
	let cursor = 0
	for (const compound of splitTopLevelCompounds(selector)) {
		const start = selector.indexOf(compound, cursor)
		if (start < 0) throw new Error(`Context element reader reads no compound: ${compound}`)
		const joint = selector.slice(cursor, start)
		cursor = start + compound.length
		const parts = [compound]
		const classes: string[] = []
		const attributes: Array<readonly [string, string]> = []
		let tag: string | undefined
		for (const part of parts) {
			tag ??= readCompoundTag(part)
			classes.push(...collectSelectorClasses(part))
			const steps = walkSelector(part)
			let open: number | undefined
			for (const step of steps) {
				if (step.literal || step.depth !== 0) continue
				if (step.char === '#') {
					const id = readIdentifier(steps, step.index + 1)
					if (id !== undefined) attributes.push(['id', id.text])
				}
				if (step.char === ':') {
					const name = readIdentifier(steps, step.index + 1)
					const keyword = name?.text.toLowerCase()
					if (
						name !== undefined &&
						steps[name.end]?.char === '(' &&
						(keyword === 'is' || keyword === 'where')
					) {
						const closer = steps.find(
							(candidate) =>
								candidate.index > name.end &&
								candidate.char === ')' &&
								!candidate.literal &&
								candidate.depth === 0,
						)
						const chosen = splitTopLevelList(
							part.slice(name.end + 1, closer?.index ?? part.length),
						).find((alternative) => splitTopLevelCompounds(alternative).length === 1)
						if (chosen !== undefined) parts.push(chosen)
					}
				}
				if (step.char === '[') open = step.index
				if (step.char !== ']' || open === undefined) continue
				const body = part.slice(open + 1, step.index)
				const match =
					/^\s*([-\w]+)\s*(?:[~|^$*]?=\s*(?:"([^"]*)"|'([^']*)'|([^\s"']+))(?:\s+[is])?\s*)?$/iu.exec(
						body,
					)
				if (match === null)
					throw new Error(`Context element reader reads no attribute selector: [${body}]`)
				attributes.push([match[1] ?? '', match[2] ?? match[3] ?? match[4] ?? ''])
				open = undefined
			}
		}
		elements.push({
			tag: tag ?? 'div',
			classes,
			attributes,
			compound: extractMatchedCompound(compound),
			nested: elements.length === 0 || !/[+~]/u.test(joint),
		})
	}
	return elements
}

/**
 * Infers the mode a site's selector places its target element in.
 * @param selector - The site's selector, normalized.
 * @returns The value of the `data-bs-theme` attribute on the innermost of the target and its
 *   ancestors that the selector gives one, or undefined where none of them carries it.
 *
 * @remarks
 * A mode reaches an element by inheritance, so only the target and the elements the
 * {@link collectContextElements} helper nests it inside decide it. An element a `+` or a `~`
 * combinator places beside the next one is that element's sibling, and its mode reaches neither
 * that element nor the target, so `[data-bs-theme=dark] + .btn` sits in no mode scope.
 *
 * @example
 * ```ts
 * inferScopeMode('[data-bs-theme=dark] .btn') // 'dark'
 * ```
 */
export function inferScopeMode(selector: string): string | undefined {
	const elements = collectContextElements(selector)
	return elements
		.filter((_element, index) => index === elements.length - 1 || elements[index + 1]?.nested)
		.flatMap((element) => element.attributes)
		.filter(([name]) => name === 'data-bs-theme')
		.at(-1)?.[1]
}

/**
 * Normalizes every sRGB color a computed value writes to the 8-bit form Chromium stores a legacy
 * color in.
 *
 * @param value - A computed value as Chromium serializes it.
 * @returns The value with every `rgb()`, `rgba()`, and `color(srgb …)` color written as `rgb()`, or
 *   as `rgba()` where it is not opaque, over channels and an alpha each rounded to the nearest of
 *   256 steps, and every other text unchanged, every string and every `url()` included.
 *
 * @remarks
 * Chromium serializes a legacy color as `rgb()` over 8-bit channels and alpha, and a mixed or
 * relative sRGB color as `color(srgb …)` at full precision, so the release's
 * `rgba(0, 0, 0, 0.175)` computes to an alpha of `0.176` while the same black mixed to 17.5%
 * computes to `0.175`. Both are one color at the precision the release writes, and this form gives
 * them one text. A channel past the sRGB gamut keeps its sign and size, so an out-of-gamut color
 * never reads as the in-gamut color it clamps to. A fully transparent color is written as
 * `rgba(0, 0, 0, 0)` whatever its channels: Chromium paints nothing for it and interpolates every
 * gradient and every mix over premultiplied channels, so the release's `rgba(255, 255, 255, 0)`
 * gradient stop and a `transparent` one paint the same gradient. An alpha is written the way
 * Chromium writes a legacy one: to two places where those round back to the same step, and to three
 * otherwise. A color in any other space is left as Chromium writes it, and so is text inside a
 * quoted string or a `url()`, which a `content` value displays or a resource address names rather
 * than paints.
 *
 * @example
 * ```ts
 * normalizeResolvedColors('color(srgb 0 0 0 / 0.175) 0px 0px 0px 4px') // 'rgba(0, 0, 0, 0.176) 0px 0px 0px 4px'
 * ```
 */
export function normalizeResolvedColors(value: string): string {
	return value.replaceAll(
		/"(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?|url\((?:[^)"'\\]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)?|rgba?\((-?[\d.]+), (-?[\d.]+), (-?[\d.]+)(?:, ([\d.]+))?\)|color\(srgb ([-+\d.e]+) ([-+\d.e]+) ([-+\d.e]+)(?: \/ ([-+\d.e]+))?\)/giu,
		(
			match: string,
			red: string | undefined,
			green: string | undefined,
			blue: string | undefined,
			opacity: string | undefined,
			x: string | undefined,
			y: string | undefined,
			z: string | undefined,
			alpha: string | undefined,
		) => {
			if (red === undefined && x === undefined) return match
			const scale = red === undefined ? 255 : 1
			const channels = (red === undefined ? [x, y, z] : [red, green, blue]).map((channel) =>
				String(Math.round(Number(channel) * scale) + 0),
			)
			const step = Math.round(Number(opacity ?? alpha ?? '1') * 255)
			if (step === 0) return 'rgba(0, 0, 0, 0)'
			if (step === 255) return `rgb(${channels.join(', ')})`
			const short = Number((step / 255).toFixed(2))
			const written = Math.round(short * 255) === step ? short : Number((step / 255).toFixed(3))
			return `rgba(${channels.join(', ')}, ${String(written)})`
		},
	)
}
