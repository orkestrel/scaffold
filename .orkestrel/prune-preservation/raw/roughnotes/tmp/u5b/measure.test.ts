import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { requireValue } from '@orkestrel/test'
import { clearSurface, openSurface } from '../../tests/app/browser/setup.js'

function readHit(control: Element): string {
	const box = control.getBoundingClientRect()
	const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
	const inside = hit !== null && control.contains(hit)
	return `top=${Math.round(box.top)} inside=${String(inside)} hit=${hit?.tagName ?? 'none'}.${hit?.className ?? ''}`
}

describe('measure', () => {
	it('reports masthead geometry and scroll behaviour', async () => {
		const readings: string[] = []
		for (const [width, height] of [
			[1280, 800],
			[390, 844],
		] as ReadonlyArray<readonly [number, number]>) {
			await page.viewport(width, height)
			const { host } = await openSurface()
			const masthead = requireValue(host.querySelector('.masthead'))
			const style = getComputedStyle(masthead)
			const box = masthead.getBoundingClientRect()
			readings.push(
				`${String(width)}: position=${style.position} height=${String(Math.round(box.height))} bottom=${String(Math.round(box.bottom))} scrollPadding=${getComputedStyle(document.documentElement).scrollPaddingTop} scrollBehavior=${getComputedStyle(document.documentElement).scrollBehavior}`,
			)
			const main = requireValue(host.querySelector('#main'))
			const control = requireValue([...main.querySelectorAll('.btn')][2])
			control.scrollIntoView({ behavior: 'instant', block: 'start' })
			readings.push(`${String(width)} plain start: ${readHit(control)}`)
			document.documentElement.style.scrollPaddingTop = `${String(Math.round(box.height))}px`
			window.scrollTo({ top: 0, behavior: 'instant' })
			control.scrollIntoView({ behavior: 'instant', block: 'start' })
			readings.push(`${String(width)} padded start: ${readHit(control)}`)
			window.scrollTo({ top: 0, behavior: 'instant' })
			const node: Record<string, unknown> = Object(control)
			const needed = node.scrollIntoViewIfNeeded
			if (typeof needed === 'function') {
				Reflect.apply(needed, control, [])
				readings.push(`${String(width)} padded ifNeeded from top: ${readHit(control)}`)
			}
			control.scrollIntoView({ behavior: 'instant', block: 'center' })
			if (typeof needed === 'function') {
				Reflect.apply(needed, control, [])
				readings.push(`${String(width)} padded ifNeeded already visible: ${readHit(control)}`)
			}
			document.documentElement.style.scrollPaddingTop = ''
			clearSurface()
		}
		expect(readings.join('\n')).toBe('')
	})
})
