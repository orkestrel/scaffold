// Probe: when does Chromium report `ResizeObserver loop completed with undelivered notifications`?
// Platform rows use only native observers and no Veneer code. Placement rows build a real Placement.
import { Placement } from '@src/browser'
import { waitForFrame } from '@orkestrel/test/browser'
import { afterEach, describe, expect, it, onTestFinished } from 'vitest'

const LOOP = 'ResizeObserver loop completed with undelivered notifications.'

function countLoops(): { readonly count: () => number } {
	let count = 0
	const listener = (event: ErrorEvent): void => {
		if (event.message === LOOP) count++
	}
	window.addEventListener('error', listener)
	onTestFinished(() => window.removeEventListener('error', listener))
	return { count: () => count }
}

function mountPair(nested: boolean): { readonly first: HTMLElement; readonly second: HTMLElement } {
	const root = document.createElement('div')
	const first = document.createElement('div')
	first.textContent = 'first'
	const second = document.createElement('div')
	second.textContent = 'second'
	if (nested) {
		const inner = document.createElement('div')
		inner.append(second)
		first.append(inner)
		root.append(first)
	} else {
		root.append(first, second)
	}
	document.body.append(root)
	onTestFinished(() => root.remove())
	return { first, second }
}

function mountTrigger(): { readonly trigger: HTMLElement; readonly tip: HTMLElement } {
	const root = document.createElement('div')
	const trigger = document.createElement('button')
	trigger.type = 'button'
	trigger.textContent = 'Save'
	const tip = document.createElement('div')
	tip.textContent = 'Saves the draft'
	root.append(trigger, tip)
	document.body.append(root)
	onTestFinished(() => root.remove())
	return { trigger, tip }
}

async function settle(): Promise<void> {
	await waitForFrame()
	await waitForFrame()
	await waitForFrame()
}

afterEach(async () => {
	await settle()
})

describe('platform only', () => {
	it('reports the loop when an observation starts in the microtask after a delivery, at the same depth', async () => {
		const loops = countLoops()
		const { first, second } = mountPair(false)
		const late = new ResizeObserver(() => undefined)
		onTestFinished(() => late.disconnect())
		const early = new ResizeObserver(() => {
			early.disconnect()
			queueMicrotask(() => late.observe(second))
		})
		early.observe(first)
		await settle()
		expect(loops.count()).toBe(1)
	})

	it('reports the loop when an observation starts inside the delivering callback itself', async () => {
		const loops = countLoops()
		const { first, second } = mountPair(false)
		const late = new ResizeObserver(() => undefined)
		onTestFinished(() => late.disconnect())
		const early = new ResizeObserver(() => {
			early.disconnect()
			late.observe(second)
		})
		early.observe(first)
		await settle()
		expect(loops.count()).toBe(1)
	})

	it('reports nothing when the same observation starts in the next task', async () => {
		const loops = countLoops()
		const { first, second } = mountPair(false)
		const late = new ResizeObserver(() => undefined)
		onTestFinished(() => late.disconnect())
		const early = new ResizeObserver(() => {
			early.disconnect()
			setTimeout(() => late.observe(second), 0)
		})
		early.observe(first)
		await settle()
		expect(loops.count()).toBe(0)
	})

	it('reports nothing when the late observation targets a deeper element', async () => {
		const loops = countLoops()
		const { first, second } = mountPair(true)
		const late = new ResizeObserver(() => undefined)
		onTestFinished(() => late.disconnect())
		const early = new ResizeObserver(() => {
			early.disconnect()
			queueMicrotask(() => late.observe(second))
		})
		early.observe(first)
		await settle()
		expect(loops.count()).toBe(0)
	})

	it('reads whether an observation started and ended within the delivery still reports', async () => {
		const loops = countLoops()
		const { first, second } = mountPair(false)
		const late = new ResizeObserver(() => undefined)
		const early = new ResizeObserver(() => {
			early.disconnect()
			queueMicrotask(() => {
				late.observe(second)
				late.disconnect()
			})
		})
		early.observe(first)
		await settle()
		expect({ loops: loops.count() }).toEqual({ loops: loops.count() })
		console.log(`started-and-ended-within-delivery loops=${loops.count()}`)
	})
})

describe('placement', () => {
	it('reports nothing for one placement on a fresh trigger, twenty times', async () => {
		const loops = countLoops()
		for (let index = 0; index < 20; index++) {
			const { trigger, tip } = mountTrigger()
			const placement = new Placement({ reference: trigger, element: tip })
			await settle()
			placement.destroy()
			trigger.parentElement?.remove()
		}
		expect(loops.count()).toBe(0)
	})

	it('reports nothing for a second placement of the same trigger built a frame later', async () => {
		const loops = countLoops()
		const { trigger, tip } = mountTrigger()
		const first = new Placement({ reference: trigger, element: tip })
		await waitForFrame()
		first.destroy()
		await waitForFrame()
		const second = new Placement({ reference: trigger, element: tip })
		onTestFinished(() => second.destroy())
		await settle()
		expect(loops.count()).toBe(0)
	})

	it('reports the loop for one placement on a fresh trigger built in the microtask after a native delivery', async () => {
		const loops = countLoops()
		const { first } = mountPair(false)
		const { trigger, tip } = mountTrigger()
		const built: Placement[] = []
		onTestFinished(() => built.forEach((placement) => placement.destroy()))
		const early = new ResizeObserver(() => {
			early.disconnect()
			queueMicrotask(() => built.push(new Placement({ reference: trigger, element: tip })))
		})
		early.observe(first)
		await settle()
		expect({ loops: loops.count(), built: built.length }).toEqual({ loops: 1, built: 1 })
	})
})
