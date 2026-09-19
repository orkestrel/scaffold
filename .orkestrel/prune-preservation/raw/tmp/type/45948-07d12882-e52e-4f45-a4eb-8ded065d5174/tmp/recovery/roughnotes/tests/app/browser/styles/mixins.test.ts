import { describe, expect, it } from 'vitest'

describe('mixins', () => {
	it('emits reduced-motion cutoffs for transitioned chrome', () => {
		const texts: string[] = []
		for (const sheet of document.styleSheets) {
			try {
				for (const rule of sheet.cssRules) texts.push(rule.cssText)
			} catch {}
		}
		expect(texts.some((text) => text.includes('prefers-reduced-motion'))).toBe(true)
	})
})
