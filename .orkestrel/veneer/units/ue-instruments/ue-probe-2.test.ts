import { TOKEN_NAMES } from '@src/core'
import { requireValue } from '@orkestrel/test'
import { readStyle } from '@orkestrel/test/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { scene } from '../../../setupBrowser.js'

// A throwaway probe for the UTIL-EFFECT round-2 guide readings. The mutation script copies it into
// the validation copy's styles proofs, runs it, and deletes it; it never ships.

afterEach(() => {
	document.documentElement.style.removeProperty(TOKEN_NAMES.factor.elevation)
	document.documentElement.style.removeProperty(TOKEN_NAMES.shadow[2])
	scene.clear()
})

describe('ue round-2 readings', () => {
	it('reads an opacity step over the placeholder opacity and the placeholder alone', () => {
		const host = scene.mount(
			'<span class="placeholder opacity-25" aria-hidden="true"></span><span class="placeholder" aria-hidden="true"></span>',
		)
		const [bar, bare] = [...host.children]
		expect([
			readStyle(requireValue(bar, 'No bar'), 'opacity'),
			readStyle(requireValue(bare, 'No bare placeholder'), 'opacity'),
		]).toEqual(['0.25', '0.5'])
	})

	it('moves a shadow class with a root retune and not with a subtree retune, and with a subtree alias', () => {
		const host = scene.mount(
			[
				'<div class="shadow root"></div>',
				'<div class="factor"><div class="shadow"></div></div>',
				'<div class="step"><div class="shadow"></div></div>',
				'<div class="alias"><div class="shadow"></div></div>',
			].join(''),
		)
		scene.load(
			`.factor { ${TOKEN_NAMES.factor.elevation}: 2 } .step { ${TOKEN_NAMES.shadow[2]}: 0 0 0 7px rgb(4, 5, 6) } .alias { --bs-box-shadow: 0 0 0 5px rgb(7, 8, 9) }`,
		)
		const read = (selector: string) =>
			readStyle(requireValue(host.querySelector(selector), `No ${selector}`), 'box-shadow')
		const resting = read('.root')
		const readings = {
			factor: read('.factor .shadow'),
			step: read('.step .shadow'),
			alias: read('.alias .shadow'),
		}
		document.documentElement.style.setProperty(TOKEN_NAMES.factor.elevation, '2')
		const rootFactor = read('.root')
		document.documentElement.style.removeProperty(TOKEN_NAMES.factor.elevation)
		document.documentElement.style.setProperty(TOKEN_NAMES.shadow[2], '0 0 0 7px rgb(4, 5, 6)')
		const rootStep = read('.root')
		console.log(JSON.stringify({ resting, ...readings, rootFactor, rootStep }))
		expect(readings.factor).toBe(resting)
		expect(readings.step).toBe(resting)
		expect(readings.alias).toBe('rgb(7, 8, 9) 0px 0px 0px 5px')
		expect(rootFactor).not.toBe(resting)
		expect(rootStep).toBe('rgb(4, 5, 6) 0px 0px 0px 7px')
	})
})
