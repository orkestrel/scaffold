/**
 * Resolves pairs of declaration values in Chromium, each side against its own stylesheet.
 *
 * @remarks
 * The resolver holds three pages of one launched browser: one carrying the stylesheet the
 * recorded values read, one carrying the stylesheet the emitted values read, and a neutral one
 * carrying neither, with the probes the {@link PROBE_SYNTAXES} constant maps registered in it.
 *
 * Each side's values are read first in its own page, on elements the
 * {@link collectContextElements} helper builds from the site's selector, so every variable a value
 * reads takes the value that stylesheet gives it at that site, and a custom property takes its
 * declared value there, `inherit` included. Each element must match the part of its compound the
 * `compound` member names, and a pair whose elements do not all match is undecided. A regular
 * property's value that reads a variable the stylesheet never gives computes as `unset`, the way
 * Chromium treats a declaration invalid at computed-value time.
 *
 * Both substituted values then compute on twin elements of the neutral page, under the color
 * scheme of the mode the {@link inferScopeMode} helper infers, so neither stylesheet's element
 * styles take part. The twins compute in every setting the {@link RESOLVER_SETTINGS} constant
 * maps, each of which varies one context a term can read, and a regular property computes once
 * more under a parent that sets the property itself to the first of the {@link PARENT_VALUES}
 * constant's values that changes it. Two sides compute alike only where they compute alike in
 * every one of those readings. A pair whose sides differ is undecided where either side calls a
 * function the {@link UNVARIED_FUNCTIONS} constant names, and where a regular property's side is
 * `inherit`, `unset`, `revert`, or `revert-layer` and no parent value changes the property. Each
 * stylesheet's factors stay at the values it declares.
 *
 * A regular property computes as itself, from the last value each side writes that Chromium
 * parses. A custom property computes from the last value each side writes, through the first
 * syntax the {@link PROBE_SYNTAXES} constant maps that parses both values, and after every syntax
 * refuses one, through the first of the {@link PROBE_PROPERTIES} constant's properties that parses
 * both. A custom property that is empty or guaranteed-invalid on either side reads as the empty
 * string on that side. Every resolved value is written through the
 * {@link normalizeResolvedColors} helper.
 *
 * A pair resolves to nothing where a side writes no value, where Chromium parses none of a regular
 * property's values on one side, where no syntax and no property parses both values of a custom
 * property, or where Chromium serializes the computed value as empty. The resolver keeps every
 * answer for the pair it read, so a comparison repeated over the same pairs reads each one once.
 * Every `resolve` call rebuilds the pages' elements and sets the neutral page's viewport, so await
 * each call before making the next.
 */
export class ValueResolver {
	readonly #browser: Browser
	readonly #recorded: Page
	readonly #emitted: Page
	readonly #neutral: Page
	readonly #resolved = new Map<string, Resolution | undefined>()

	/**
	 * Wraps three pages of one launched browser, as the {@link createValueResolver} helper opens
	 * them.
	 * @param browser - The browser the pages belong to, which the `destroy` method closes.
	 * @param recorded - The page carrying the stylesheet the recorded values read.
	 * @param emitted - The page carrying the stylesheet the emitted values read.
	 * @param neutral - The page carrying no stylesheet, with every probe registered.
	 */
	constructor(browser: Browser, recorded: Page, emitted: Page, neutral: Page) {
		this.#browser = browser
		this.#recorded = recorded
		this.#emitted = emitted
		this.#neutral = neutral
	}

	/**
	 * Resolves each pair's two values in Chromium.
	 * @param pairs - The pairs to resolve.
	 * @returns Each pair's resolution in the order given, or undefined for a pair the resolver
	 *   cannot decide.
	 */
	async resolve(pairs: readonly ValuePair[]): Promise<ReadonlyArray<Resolution | undefined>> {
		const keys = pairs.map((pair) =>
			JSON.stringify([pair.selector, pair.property, pair.recorded, pair.emitted]),
		)
		const pending = new Map<string, ValuePair>()
		for (const [index, pair] of pairs.entries()) {
			const key = keys[index] ?? ''
			if (this.#resolved.has(key)) continue
			if (pair.recorded.length === 0 || pair.emitted.length === 0)
				this.#resolved.set(key, undefined)
			else pending.set(key, pair)
		}
		const batch = [...pending.entries()]
		if (batch.length === 0) return keys.map((key) => this.#resolved.get(key))
		const contexts = batch.map(([, pair]) => collectContextElements(pair.selector))
		const [recorded, emitted] = await Promise.all([
			this.#substitute(
				this.#recorded,
				batch.map(([, pair]) => pair),
				contexts,
				batch.map(([, pair]) => pair.recorded),
			),
			this.#substitute(
				this.#emitted,
				batch.map(([, pair]) => pair),
				contexts,
				batch.map(([, pair]) => pair.emitted),
			),
		])
		const built = batch.flatMap(([key, pair], index) => {
			const left = recorded[index]
			const right = emitted[index]
			if (left === undefined || right === undefined) {
				this.#resolved.set(key, undefined)
				return []
			}
			return [
				{
					key,
					property: pair.property,
					dark: inferScopeMode(pair.selector) === 'dark',
					recorded: left,
					emitted: right,
				},
			]
		})
		const readings = await this.#compute(built)
		for (const [index, item] of built.entries()) {
			const read = readings[index]
			const normalized = read?.map(
				([left, right]) => [normalizeResolvedColors(left), normalizeResolvedColors(right)] as const,
			)
			const [chosen = ['', ''] as const] = [
				normalized?.find(([left, right]) => left !== right) ?? normalized?.[0],
			].filter((entry) => entry !== undefined)
			this.#resolved.set(
				item.key,
				normalized === undefined ? undefined : { recorded: chosen[0], emitted: chosen[1] },
			)
		}
		return keys.map((key) => this.#resolved.get(key))
	}

	/** Closes the browser, and every page with it. */
	async destroy(): Promise<void> {
		await this.#browser.close()
	}

	// Computes each substituted pair on the neutral page in every setting, one pass per root font
	// size and viewport, and returns each pair's readings in setting order with the parent reading
	// last, or undefined for a pair no reading decides.
	async #compute(
		items: ReadonlyArray<{
			readonly property: string
			readonly dark: boolean
			readonly recorded: readonly string[]
			readonly emitted: readonly string[]
		}>,
	): Promise<ReadonlyArray<ReadonlyArray<readonly [string, string]> | undefined>> {
		const passes = new Map<string, ResolverSetting[]>()
		for (const setting of Object.values(RESOLVER_SETTINGS)) {
			const key = JSON.stringify([setting.root, setting.viewport])
			passes.set(key, [...(passes.get(key) ?? []), setting])
		}
		const settings: Array<ReadonlyArray<ReadonlyArray<readonly [string, string]>> | undefined> =
			items.map(() => [])
		const parents: Array<readonly [string, string] | undefined> = items.map(() => undefined)
		for (const [pass, group] of [...passes.values()].entries()) {
			const [first] = group
			if (first === undefined) continue
			await this.#neutral.setViewportSize({ width: first.viewport[0], height: first.viewport[1] })
			const computed = await this.#neutral.evaluate(
				({ batch, hosts, root, parent, prefix, count, properties, candidates, unvaried }) => {
					document.documentElement.style.setProperty('font-size', root)
					document.body.replaceChildren()
					const probes = Array.from(
						{ length: count },
						(_probe, index) => `${prefix}-${String(index)}`,
					)
					const calls = new RegExp(`(?<![-\\w])(?:${unvaried.join('|')})\\(`, 'iu')
					const inheriting = /^(?:inherit|unset|revert|revert-layer)$/iu
					const scopes = hosts.map((styles) =>
						['light', 'dark'].map((scheme) => {
							const host = document.createElement('div')
							host.style.setProperty('color-scheme', scheme)
							for (const [name, value] of Object.entries(styles))
								host.style.setProperty(name, value)
							document.body.append(host)
							return host
						}),
					)
					const chosen = batch.map((item) =>
						[item.recorded, item.emitted].map((values) =>
							item.property.startsWith('--')
								? values.at(-1)
								: values.findLast((value) => CSS.supports(item.property, value)),
						),
					)
					// Each regular property's parent value is the first candidate Chromium parses for it and
					// computes apart from the base host's own value, tried on children of that host.
					const regular = [
						...new Set(
							batch.map((item) => item.property).filter((name) => !name.startsWith('--')),
						),
					]
					const base = scopes[0]?.[0] ?? document.body
					const trials = (parent ? regular : []).map((name) =>
						candidates
							.filter((candidate) => CSS.supports(name, candidate))
							.map((candidate) => {
								const element = document.createElement('div')
								element.style.setProperty(name, candidate)
								base.append(element)
								return [candidate, element] as const
							}),
					)
					const alternates = new Map(
						regular.map((name, index) => {
							const own = getComputedStyle(base).getPropertyValue(name)
							return [
								name,
								(trials[index] ?? []).find(
									([, element]) => getComputedStyle(element).getPropertyValue(name) !== own,
								)?.[0],
							] as const
						}),
					)
					for (const element of trials.flat()) element[1].remove()
					const inheritors = new Map(
						[...alternates.entries()].flatMap(([name, alternate]) =>
							alternate === undefined
								? []
								: ['light', 'dark'].map((scheme) => {
										const host = document.createElement('div')
										host.style.setProperty('color-scheme', scheme)
										for (const [style, value] of Object.entries(hosts[0] ?? {}))
											host.style.setProperty(style, value)
										host.style.setProperty(name, alternate)
										document.body.append(host)
										return [`${name} ${scheme}`, host] as const
									}),
						),
					)
					const twins = batch.map((item, index) =>
						[
							...scopes.map((pair) => (item.dark ? pair[1] : pair[0])),
							parent ? inheritors.get(`${item.property} ${item.dark ? 'dark' : 'light'}`) : undefined,
						].map((host) =>
							host === undefined
								? undefined
								: (chosen[index] ?? []).map((value) => {
										const element = document.createElement('div')
										host.append(element)
										if (value === undefined || value === '') return element
										if (!item.property.startsWith('--')) {
											element.style.setProperty(item.property, value)
											return element
										}
										for (const probe of probes) {
											element.style.setProperty(probe, value)
											element.style.setProperty(`${probe}-control`, value)
										}
										for (const name of properties)
											if (CSS.supports(name, value)) element.style.setProperty(name, value)
										return element
									}),
						),
					)
					return batch.map((item, index) => {
						const [left, right] = chosen[index] ?? []
						if (left === undefined || right === undefined) return undefined
						const custom = item.property.startsWith('--')
						if (custom && (left === '' || right === ''))
							return { settings: hosts.map(() => [left, right] as const), parent: undefined }
						const differ = left !== right
						if (differ && (calls.test(left) || calls.test(right))) return undefined
						if (
							parent &&
							!custom &&
							differ &&
							alternates.get(item.property) === undefined &&
							(inheriting.test(left.trim()) || inheriting.test(right.trim()))
						)
							return undefined
						const groups = twins[index] ?? []
						const styles = (groups[0] ?? []).map((element) => getComputedStyle(element))
						const name = !custom
							? item.property
							: (probes.find((probe) =>
									styles.every(
										(style) =>
											style.getPropertyValue(probe) === style.getPropertyValue(`${probe}-control`),
									),
								) ??
								properties.find(
									(candidate) => CSS.supports(candidate, left) && CSS.supports(candidate, right),
								))
						if (name === undefined) return undefined
						const readings = groups.map((group) =>
							group?.map((element) => getComputedStyle(element).getPropertyValue(name).trim()),
						)
						const pairs = readings.flatMap((reading) =>
							reading === undefined ? [] : [[reading[0] ?? '', reading[1] ?? ''] as const],
						)
						if (pairs.some(([first, second]) => first === '' || second === '')) return undefined
						return {
							settings: pairs.slice(0, hosts.length),
							parent: pairs[hosts.length],
						}
					})
				},
				{
					batch: items,
					hosts: group.map((setting) => setting.host),
					root: first.root,
					parent: pass === 0,
					prefix: PROBE_PREFIX,
					count: Object.keys(PROBE_SYNTAXES).length,
					properties: PROBE_PROPERTIES,
					candidates: PARENT_VALUES,
					unvaried: UNVARIED_FUNCTIONS,
				},
			)
			for (const [index, result] of computed.entries()) {
				const earlier = settings[index]
				settings[index] =
					earlier === undefined || result === undefined
						? undefined
						: [...earlier, ...result.settings]
				if (result?.parent !== undefined) parents[index] = result.parent
			}
		}
		return settings.map((readings, index) => {
			const parent = parents[index]
			return readings === undefined ? undefined : [...readings, ...(parent === undefined ? [] : [parent])]
		})
	}

	// Reads each side's values in its own page, with every variable substituted at the site, or
	// undefined for a pair whose elements do not all match their compounds.
	async #substitute(
		page: Page,
		pairs: readonly ValuePair[],
		contexts: ReadonlyArray<readonly ContextElement[]>,
		sides: ReadonlyArray<readonly string[]>,
	): Promise<ReadonlyArray<readonly string[] | undefined>> {
		const items = pairs.flatMap((pair, index) =>
			(sides[index] ?? []).map((value) => ({
				elements: contexts[index] ?? [],
				property: pair.property,
				value,
			})),
		)
		const read = await page.evaluate(
			({ batch, raw }) => {
				document.body.replaceChildren()
				const subjects = batch.map((item) => {
					let subject: HTMLElement = document.body
					let matched = true
					for (const described of item.elements) {
						const element = document.createElement(described.tag)
						for (const name of described.classes) element.classList.add(name)
						for (const [name, value] of described.attributes) element.setAttribute(name, value)
						const host = described.nested ? subject : (subject.parentElement ?? document.body)
						host.append(element)
						try {
							matched &&= element.matches(described.compound)
						} catch {
							matched = false
						}
						subject = element
					}
					if (matched && item.value.trim() !== '')
						subject.style.setProperty(
							item.property.startsWith('--') ? item.property : raw,
							item.value,
						)
					return matched ? subject : undefined
				})
				return batch.map((item, index) => {
					const subject = subjects[index]
					if (subject === undefined) return undefined
					if (item.value.trim() === '') return item.value.trim()
					const style = getComputedStyle(subject)
					if (item.property.startsWith('--')) return style.getPropertyValue(item.property).trim()
					if (!/var\(/iu.test(item.value)) return item.value
					const substituted = style.getPropertyValue(raw).trim()
					return substituted === '' ? 'unset' : substituted
				})
			},
			{ batch: items, raw: `${PROBE_PREFIX}-raw` },
		)
		let offset = 0
		return sides.map((values) => {
			const slice = read.slice(offset, offset + values.length)
			offset += values.length
			return slice.every((value) => value !== undefined)
				? slice.flatMap((value) => (value === undefined ? [] : [value]))
				: undefined
		})
	}
}
