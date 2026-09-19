import { describe, expect, it } from 'vitest'
import { VIEWS } from '@app/core'
import { ROUTES } from '@app/browser'

describe('ROUTES', () => {
	it('registers one path for every declared view', () => {
		const views = ROUTES.map((route) => route.meta.view)
		for (const view of VIEWS) {
			expect(views).toContain(view)
		}
		for (const view of views) {
			expect(VIEWS).toContain(view)
		}
	})
})
