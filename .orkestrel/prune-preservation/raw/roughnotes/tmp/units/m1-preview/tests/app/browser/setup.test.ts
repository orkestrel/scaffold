import { afterEach, describe, expect, it } from 'vitest'
import { buildMarkControl, readRefusal, SIGN_IN_ABSENT } from './setup.js'

afterEach(() => {
	document.body.replaceChildren()
})

describe('readRefusal', () => {
	it('returns undefined when the named control is reachable, and the layer voice when it is absent', () => {
		const button = document.createElement('button')
		button.textContent = 'Reachable control'
		document.body.append(button)
		expect(readRefusal('Reachable control')).toBeUndefined()
		expect(readRefusal('Sign In')).toBe(SIGN_IN_ABSENT)
	})
})

describe('buildMarkControl', () => {
	it('returns an SVG that carries the given class token', () => {
		const mark = buildMarkControl('roughnotes-undeclared-control')
		expect(mark.getAttribute('class')).toBe('roughnotes-undeclared-control')
	})
})
