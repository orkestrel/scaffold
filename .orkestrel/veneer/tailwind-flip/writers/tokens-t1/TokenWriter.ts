import type { TokenColor, TokenAmount, TokenMeasure, TokenRecord, PaletteRecord } from '../../../tests/setup.js'
import { readFileSync } from 'node:fs'
import { parse } from 'postcss'
import { requireValue } from '@orkestrel/test'
import { collectTokenColors, encodeTokenHex, readTokenChannels, resolveTokenPalette, evaluateTokenOrigin } from '../../../tests/setup.js'

export class TokenWriter {
	#source = parse(readFileSync('dist/src/bootstrap/index.css', 'utf8'))
	#colors: ReadonlyMap<string, string>
	#mapping = new Map<string, TokenColor>()
	#amounts: TokenAmount[] = []
	#bases = new Map<string, string>()
	#theme: ReadonlyMap<string, string>

	constructor(palette: PaletteRecord, theme: ReadonlyMap<string, string>) {
		this.#colors = resolveTokenPalette(palette, theme)
		this.#theme = theme
	}

	execute(): TokenRecord {
		const light = ':root,[data-bs-theme=light]'
		const dark = '[data-bs-theme=dark]'
		for (const [name, token] of Object.entries({ blue: 'blue-600', indigo: 'indigo-600', purple: 'purple-800', pink: 'pink-600', red: 'red-600', orange: 'orange-400', yellow: 'yellow-500', green: 'green-700', teal: 'teal-400', cyan: 'cyan-500', black: 'black', white: 'white', 'gray-100': 'gray-50', 'gray-200': 'gray-200', 'gray-300': 'gray-300', 'gray-400': 'gray-300', 'gray-500': 'gray-400', 'gray-600': 'gray-500', 'gray-700': 'gray-600', 'gray-800': 'gray-800', 'gray-900': 'gray-950' })) {
			this.#bases.set(name, this.#token(token))
			this.#addRole(light, '--bs-' + name, this.#token(token), `base(${name})`, '--color-' + token)
		}
		for (const [slot, family, step] of [['primary', 'blue', '600'], ['secondary', 'gray', '500'], ['success', 'green', '700'], ['info', 'cyan', '500'], ['warning', 'yellow', '500'], ['danger', 'red', '600'], ['light', 'gray', '50'], ['dark', 'gray', '950']] as const) {
			const base = this.#token(family + '-' + step)
			this.#bases.set(slot, base)
			const gray = slot === 'light' || slot === 'dark'
			const fill = gray ? base : this.#token(family + '-100')
			this.#bases.set('table-' + slot, fill)
			if (!gray) for (const [suffix, rank, darkRank] of [['text-emphasis', 800, 300], ['bg-subtle', 100, 950], ['border-subtle', 200, 800]] as const) {
				for (const [selector, prefix, selected] of [[light, 'light:', family + '-' + rank], [dark, 'dark:', slot === 'secondary' && suffix === 'bg-subtle' ? 'gray-900' : family + '-' + darkRank]] as const) {
					const name = prefix + slot + '-' + suffix
					this.#bases.set(name, this.#token(selected))
					this.#addRole(selector, '--bs-' + slot + '-' + suffix, this.#token(selected), `step(${name})`, '--color-' + selected)
				}
			}
			const text = this.#read('.btn-' + slot, '--bs-btn-color')
			const shade = slot === 'light' || (slot !== 'dark' && encodeTokenHex(readTokenChannels(text)) === '#ffffff')
			this.#bases.set('button-' + slot, encodeTokenHex(readTokenChannels(text)))
			for (const [property, weight] of [['hover-bg', 15], ['hover-border-color', shade ? 20 : 10], ['active-bg', 20], ['active-border-color', shade ? 25 : 10]] as const) {
				const origin = `mix(${shade ? 'black' : 'white'}, ${slot}, ${weight})`
				this.#addRole('.btn-' + slot, '--bs-btn-' + property, evaluateTokenOrigin(origin, this.#bases), origin)
			}
			const focus = `mix(button-${slot}, ${slot}, 15)`
			this.#addRole('.btn-' + slot, '--bs-btn-focus-shadow-rgb', evaluateTokenOrigin(focus, this.#bases), focus)
			this.#bases.set('table-text-' + slot, encodeTokenHex(readTokenChannels(this.#read('.table-' + slot, '--bs-table-color'))))
			for (const [property, weight] of [['border-color', 20], ['striped-bg', 5], ['active-bg', 10], ['hover-bg', 7.5]] as const) {
				const origin = `mix(table-text-${slot}, table-${slot}, ${weight})`
				this.#addRole('.table-' + slot, '--bs-table-' + property, evaluateTokenOrigin(origin, this.#bases), origin)
			}
			const origin = `mix(${encodeTokenHex(readTokenChannels(text)) === '#ffffff' ? 'black' : 'white'}, ${slot}, 20)`
			this.#addRole(`.link-${slot}:hover, .link-${slot}:focus`, 'color', evaluateTokenOrigin(origin, this.#bases), origin)
		}
		for (const [selector, property, origin] of [[light, '--bs-light-bg-subtle', 'mix(gray-100, white, 50)'], [dark, '--bs-dark-bg-subtle', 'mix(gray-800, black, 50)'], [dark, '--bs-tertiary-bg', 'mix(gray-800, gray-900, 50)'], [light, '--bs-link-hover-color', 'mix(black, primary, 20)'], [dark, '--bs-link-hover-color', 'mix(white, dark:primary-text-emphasis, 20)'], ['.form-control:focus', 'border-color', 'mix(white, primary, 50)'], ['.form-range::-webkit-slider-thumb:active', 'background-color', 'mix(white, primary, 70)']] as const) this.#addRole(selector, property, evaluateTokenOrigin(origin, this.#bases), origin)
		this.#addRole(dark, '--bs-code-color', this.#token('pink-300'), 'step(dark:code-color)', '--color-pink-300')
		for (const row of [...this.#amounts]) {
			if (row.selector.startsWith('.link-')) for (const property of ['-webkit-text-decoration-color', 'text-decoration-color']) this.#amounts.push({ ...row, property, original: this.#read(row.selector, property) })
			if (row.selector === '.form-range::-webkit-slider-thumb:active') this.#amounts.push({ ...row, selector: '.form-range::-moz-range-thumb:active' })
			if (row.selector === '.form-control:focus') this.#amounts.push({ ...row, selector: '.form-select:focus' })
		}
		const occurrences = collectTokenColors(this.#source.toString())
		for (const row of occurrences) if (!this.#mapping.has(row.lifted)) throw new Error('Unmapped literal: ' + row.literal)
		const palette = [...this.#mapping.values()].map((row) => ({ ...row, spellings: [...new Set(occurrences.filter((site) => site.lifted === row.lifted).map((site) => site.literal))].sort() }))
		const split = requireValue(palette.find((row) => row.lifted === '#dee2e6'))
		palette.push({ ...split, spellings: ['#dee2e6', '222, 226, 230'], token: '--color-gray-200', light: this.#token('gray-200'), dark: this.#token('gray-200'), origin: 'step(dark:body-color)', context: 'dark' })
		palette.sort((a, b) => (a.lifted + (a.context ?? '')).localeCompare(b.lifted + (b.context ?? '')))
		const scale: TokenMeasure[] = []
		for (const [name, pixels, container, token] of [['sm', 576, 540, 'sm'], ['md', 768, 720, 'md'], ['lg', 992, 960, 'lg'], ['xl', 1200, 1140, 'xl'], ['xxl', 1400, 1320, '2xl']] as const) {
			const reference = '--breakpoint-' + token
			const value = requireValue(this.#theme.get(reference))
			scale.push({ role: 'breakpoint-' + name, literal: pixels + 'px', value, token: reference }, { role: 'breakpoint-' + name + '-down', literal: (pixels - 0.02).toFixed(2) + 'px', value: (Number.parseFloat(value) - 0.00125) + 'rem', token: reference }, { role: 'container-' + name, literal: container + 'px', value, token: reference })
		}
		for (const [role, property, token] of [['font-sans-serif', 'font-sans-serif', 'font-sans'], ['font-monospace', 'font-monospace', 'font-mono'], ['radius', 'border-radius', 'radius-md'], ['radius-sm', 'border-radius-sm', 'radius-sm'], ['radius-lg', 'border-radius-lg', 'radius-lg'], ['radius-xl', 'border-radius-xl', 'radius-2xl'], ['radius-xxl', 'border-radius-xxl', 'radius-4xl'], ['shadow', 'box-shadow', 'shadow-md'], ['shadow-sm', 'box-shadow-sm', 'shadow-sm'], ['shadow-lg', 'box-shadow-lg', 'shadow-lg'], ['shadow-inset', 'box-shadow-inset', 'inset-shadow-xs']] as const) {
			const reference = '--' + token
			scale.push({ role, literal: this.#read(light, '--bs-' + property), value: `var(${reference}, ${requireValue(this.#theme.get(reference)).replace(/\s+/g, ' ')})`, token: reference })
		}
		const kept: TokenMeasure[] = ['transparent', 'currentcolor', '#000', '#fff'].map((literal) => ({ role: 'color', literal, value: literal }))
		const alpha = new Set<string>()
		for (const match of this.#source.toString().matchAll(/rgba(?:\(|%28)(?:0, 0, 0|255, 255, 255), [\d.]+(?:\)|%29)/giu)) alpha.add(match[0])
		for (const literal of [...alpha].sort()) kept.push({ role: 'color', literal, value: literal })
		kept.push({ role: 'radius-pill', literal: '50rem', value: '50rem' }, { role: 'rfs-cap', literal: '1200px', value: '1200px' })
		for (const selector of ['.modal', '.modal-sm', '.modal-lg, .modal-xl', '.modal-xl']) {
			const literal = this.#read(selector, '--bs-modal-width')
			kept.push({ role: selector, literal, value: literal })
		}
		return { palette, scale, kept, amounts: this.#amounts, unjoined: [] }
	}

	#token(name: string): string { return requireValue(this.#colors.get('--color-' + name), 'Missing palette ' + name) }

	#read(selector: string, property: string): string {
		let result: string | undefined
		this.#source.walkRules((rule) => {
			if (rule.selector.replace(/["'\s]/g, '') === selector.replace(/["'\s]/g, '')) rule.walkDecls(property, (declaration) => { result = declaration.value })
		})
		return requireValue(result, 'Missing declaration: ' + selector + ' / ' + property)
	}

	#addRole(selector: string, property: string, value: string, origin: string, token = ''): void {
		const original = this.#read(selector, property)
		const lifted = encodeTokenHex(readTokenChannels(original))
		const target = encodeTokenHex(readTokenChannels(value))
		const prior = this.#mapping.get(lifted)
		if (prior && prior.light !== target) throw new Error('Conflicting mapping: ' + lifted)
		if (!prior) this.#mapping.set(lifted, { lifted, spellings: [], token, light: target, dark: target, origin })
		if (origin.startsWith('mix(')) this.#amounts.push({ selector, property, original, tuned: target, origin })
	}
}
