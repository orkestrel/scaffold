// The Orchestrator's probe of the precedence audit's claim-4 attack on Chromium 153: a proxy around a
// real SVG element whose `get` trap answers 23 for `tagName` passes `instanceof Element` and, on the
// round-1 source, escapes `readTag`'s declared `string | undefined` with a number. Copied into the
// worktree, run once, and removed.
import { readTag } from '@src/browser'
import { describe, expect, it } from 'vitest'

describe('probe: readTag under a hostile accessor', () => {
	it('records what readTag returns for a proxy whose get trap answers a number for tagName', () => {
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		const hostile: unknown = new Proxy(svg, {
			get(target, key, receiver) {
				return key === 'tagName' ? 23 : Reflect.get(target, key, receiver)
			},
		})
		const reading: unknown = readTag(hostile)
		console.log(`probe: readTag(proxy)=${JSON.stringify(reading)} type=${typeof reading} svg=${String(readTag(svg))} div=${String(readTag(document.createElement('div')))}`)
		expect(readTag(svg)).toBe('svg')
		expect(readTag(document.createElement('div'))).toBe('DIV')
		expect(typeof reading).toBe('number')
	})
})
