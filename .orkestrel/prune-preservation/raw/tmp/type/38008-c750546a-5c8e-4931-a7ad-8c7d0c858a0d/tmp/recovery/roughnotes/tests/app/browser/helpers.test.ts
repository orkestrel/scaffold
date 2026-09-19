import { createStorage } from '@orkestrel/test/browser'
import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import {
	COPY,
	MONTHS,
	THEME_DARK,
	THEME_LIGHT,
	THEME_STORAGE,
	articleHref,
	buildName,
	createApplication,
	createMemoryStorage,
	formatIssued,
	hashHref,
	includesField,
	isCurrent,
	productHref,
	readHost,
	shellHref,
	skuHref,
	readRoot,
	readStorage,
	readTheme,
	toggleDark,
	bindToggle,
	writeTheme,
	focusNode,
	revealView,
} from '@app/browser'

describe('path helpers', () => {
	it('builds hash hrefs and record paths', () => {
		expect(hashHref('/products')).toBe('#/products')
		expect(productHref('roughnotes-pro')).toBe('/products/roughnotes-pro')
		expect(articleHref('local-landscape')).toBe('/magazine/local-landscape')
		expect(skuHref('coverages-applicable')).toBe('/shop/coverages-applicable')
	})

	it('treats a detail pattern as current for its listing', () => {
		expect(isCurrent('/products', '/products/:slug')).toBe(true)
		expect(isCurrent('/magazine', '/products/:slug')).toBe(false)
		expect(isCurrent('/', '/')).toBe(true)
		expect(isCurrent('/', undefined)).toBe(true)
	})
})

describe('buildName', () => {
	it('leads with the rendered label and follows it with the region after one separator', () => {
		expect(buildName('RoughNotes-Pro', COPY.products)).toBe('RoughNotes-Pro, Products')
		expect(buildName(COPY.started, COPY.site)).toBe('Get started, Site')
		expect(buildName(COPY.phone, COPY.contact)).toBe('800-428-4384, Contact')
		expect(buildName('Label', 'Region').split(', ')).toEqual(['Label', 'Region'])
		expect(buildName('Label', 'Region').startsWith('Label')).toBe(true)
	})
})

describe('formatIssued', () => {
	it('formats a calendar date and returns the input when the month is out of range', () => {
		expect(formatIssued('2026-09-01', MONTHS)).toBe('September 2026')
		expect(formatIssued('2026-01-01', MONTHS)).toBe('January 2026')
		expect(formatIssued('2026-13-01', MONTHS)).toBe('2026-13-01')
		expect(formatIssued('bad', MONTHS)).toBe('bad')
	})
})

describe('theme helpers', () => {
	it('reads and writes the color-mode flag', () => {
		const storage = createMemoryStorage()
		const root = document.createElement('html')
		expect(readTheme(storage, THEME_STORAGE)).toBe(false)
		writeTheme(storage, THEME_STORAGE, root, true)
		expect(storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)
		expect(root.getAttribute('data-bs-theme')).toBe(THEME_DARK)
		writeTheme(storage, THEME_STORAGE, root, false)
		expect(storage.getItem(THEME_STORAGE)).toBe(THEME_LIGHT)
	})

	it('answers light when the store refuses the read, and keeps a later write', () => {
		// A browser holding storage behind a permission raises from `getItem`, so the read answers
		// with the mode a reader who has stored no preference already gets, and the write boundary
		// beside it still remembers what the person picks next.
		const storage = createStorage({ reads: false, writes: true })
		const root = document.createElement('html')
		expect(() => storage.getItem(THEME_STORAGE)).toThrow(
			new DOMException(`Access is denied for getItem "${THEME_STORAGE}"`, 'SecurityError'),
		)
		expect(readTheme(storage, THEME_STORAGE)).toBe(false)
		writeTheme(storage, THEME_STORAGE, root, true)
		expect(root.getAttribute('data-bs-theme')).toBe(THEME_DARK)
		storage.permit()
		expect(storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)
		expect(readTheme(storage, THEME_STORAGE)).toBe(true)
	})
})

describe('readRoot', () => {
	it('returns the document element in the browser', () => {
		expect(readRoot()).toBe(document.documentElement)
	})
})

describe('readStorage', () => {
	it('returns localStorage in the browser', () => {
		expect(readStorage()).toBe(localStorage)
	})

	it('answers undefined when the host refuses the localStorage property', () => {
		// A denied origin does not hide `localStorage`; it raises from the property itself, and
		// `typeof` reads that property rather than guarding it. A permitted page cannot be denied
		// from inside itself, so the refusing accessor the host would install is installed here and
		// restored after: the host condition, not a replacement of the store behind it.
		const saved = requireValue(
			Object.getOwnPropertyDescriptor(window, 'localStorage'),
			'window declares no localStorage property',
		)
		Object.defineProperty(window, 'localStorage', {
			configurable: true,
			get(): never {
				throw new DOMException('Access is denied for this document', 'SecurityError')
			},
		})
		try {
			expect(readStorage()).toBeUndefined()
		} finally {
			Object.defineProperty(window, 'localStorage', saved)
		}
		expect(readStorage()).toBe(localStorage)
	})
})

describe('includesField', () => {
	it('reports whether a failed field is present', () => {
		expect(includesField(['email'], 'email')).toBe(true)
		expect(includesField(['email'], 'name')).toBe(false)
		expect(includesField(undefined, 'name')).toBe(false)
	})
})

describe('toggleDark', () => {
	it('flips the application theme flag', () => {
		const app = createApplication({ storage: createMemoryStorage() })
		app.start()
		expect(app.dark.value).toBe(false)
		toggleDark(app)
		expect(app.dark.value).toBe(true)
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_DARK)
		app.destroy()
	})
})

describe('bindToggle', () => {
	it('returns a function that flips the application theme flag', () => {
		const app = createApplication({ storage: createMemoryStorage() })
		app.start()
		bindToggle(app)()
		expect(app.dark.value).toBe(true)
		app.destroy()
	})
})

describe('focusNode', () => {
	it('focuses the matching element and ignores a missing id', () => {
		const input = document.createElement('input')
		input.id = 'probe-field'
		document.body.append(input)
		focusNode('probe-field')
		expect(document.activeElement).toBe(input)
		const prior = document.activeElement
		focusNode('missing-control')
		expect(document.activeElement).toBe(prior)
		input.remove()
	})
})

describe('revealView', () => {
	it('focuses main', () => {
		const main = document.createElement('main')
		main.id = 'main'
		main.tabIndex = -1
		document.body.append(main)
		revealView()
		expect(document.activeElement).toBe(main)
		main.remove()
	})
})

describe('readHost', () => {
	it('reads the host a destination opens on and resolves a relative one against the page', () => {
		expect(readHost('https://shoppingcart.roughnotes.com/Catalog.php')).toBe(
			'shoppingcart.roughnotes.com',
		)
		expect(readHost('https://www.roughnotes.com/wp-content/uploads/kit.pdf')).toBe(
			'www.roughnotes.com',
		)
		expect(readHost('/local/file.pdf')).toBe(window.location.hostname)
	})
})

describe('shellHref', () => {
	it('hashes an in-app destination and leaves an external or protocol URL alone', () => {
		expect(shellHref('/products')).toBe('#/products')
		expect(shellHref('/')).toBe('#/')
		expect(shellHref('https://shoppingcart.roughnotes.com/Catalog.php')).toBe(
			'https://shoppingcart.roughnotes.com/Catalog.php',
		)
		expect(shellHref('tel:800-428-4384')).toBe('tel:800-428-4384')
		expect(shellHref('mailto:rnc@roughnotes.com')).toBe('mailto:rnc@roughnotes.com')
	})
})
