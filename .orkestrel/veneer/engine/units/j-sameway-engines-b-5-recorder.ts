// Probe recorder. It records every native ResizeObserver a scratch copy's code constructs: which
// observer, which targets it observes, each callback it delivers, what that callback writes to the
// document, and whether any element a live observer watches changes size across the callback. The
// native observer does all the observing; the subclass only records around it. It also records the
// window `error` event and the case running when each one fires, and writes the log beside the copy.
import { afterAll, afterEach, beforeEach } from 'vitest'
import { commands } from 'vitest/browser'

interface Entry {
	readonly event: string
	readonly test: string
	readonly frame: number | null
	readonly render: number | null
	readonly at: number
	readonly detail: unknown
}

const log: Entry[] = []
const tags = new WeakMap<Element, number>()
const live = new Map<number, Set<Element>>()
let tagCount = 0
let observerCount = 0
let current = '(module)'
// The rendering-update task an observer callback ran in. It is set at the first callback of that
// task and cleared by a message task posted then, which runs only after the rendering update, its
// microtask checkpoints, and its error dispatch have all finished. An entry carrying a render id was
// recorded inside that same task.
let render: number | null = null
let renderCount = 0

export function markRender(): void {
	if (render !== null) return
	render = ++renderCount
	const channel = new MessageChannel()
	channel.port1.onmessage = () => {
		render = null
		channel.port1.close()
	}
	channel.port2.postMessage(null)
}

export function describeElement(element: Element): string {
	let tag = tags.get(element)
	if (tag === undefined) {
		tag = ++tagCount
		tags.set(element, tag)
	}
	const id = element.id === '' ? '' : `#${element.id}`
	const classes = element.classList.length === 0 ? '' : `.${[...element.classList].join('.')}`
	return `${element.tagName.toLowerCase()}${id}${classes}@${tag}${element.isConnected ? '' : '(detached)'}`
}

export function readFrame(): number | null {
	const time = document.timeline.currentTime
	return typeof time === 'number' ? Math.round(time * 1000) / 1000 : null
}

export function recordEntry(event: string, detail: unknown): void {
	log.push({ event, test: current, frame: readFrame(), render, at: performance.now(), detail })
}

export function measureWatched(): Map<string, string> {
	const sizes = new Map<string, string>()
	for (const targets of live.values()) {
		for (const target of targets) {
			const box = target.getBoundingClientRect()
			sizes.set(describeElement(target), `${box.width}x${box.height}`)
		}
	}
	return sizes
}

export function summarizeMutation(record: MutationRecord): string {
	const target = record.target instanceof Element ? describeElement(record.target) : record.target.nodeName
	if (record.type === 'attributes') {
		const value = record.target instanceof Element ? record.target.getAttribute(record.attributeName ?? '') : null
		return `${target} [${record.attributeName}] ${JSON.stringify(record.oldValue)} -> ${JSON.stringify(value)}`
	}
	return `${target} childList +${record.addedNodes.length} -${record.removedNodes.length}`
}

const mutations = new MutationObserver(() => undefined)
mutations.observe(document, {
	subtree: true,
	attributes: true,
	attributeOldValue: true,
	childList: true,
})

const Native = window.ResizeObserver

class RecordingResizeObserver extends Native {
	readonly #id: number

	constructor(callback: ResizeObserverCallback) {
		const id = ++observerCount
		super((entries, observer) => {
			markRender()
			mutations.takeRecords()
			const before = measureWatched()
			recordEntry('callback', {
				observer: id,
				entries: entries.map((entry) => {
					const size = entry.contentBoxSize[0]
					return `${describeElement(entry.target)} ${size?.inlineSize}x${size?.blockSize}`
				}),
			})
			callback(entries, observer)
			const writes = mutations.takeRecords().map(summarizeMutation)
			const after = measureWatched()
			const changed = [...after].filter(([key, value]) => before.get(key) !== value)
			recordEntry('callback-end', {
				observer: id,
				writes,
				watched: [...after].map(([key, value]) => `${key} ${value}`),
				changed: changed.map(([key, value]) => `${key} ${before.get(key)} -> ${value}`),
			})
		})
		this.#id = id
		live.set(id, new Set())
		recordEntry('construct', { observer: id })
	}

	override observe(target: Element, options?: ResizeObserverOptions): void {
		live.get(this.#id)?.add(target)
		recordEntry('observe', { observer: this.#id, target: describeElement(target), options })
		super.observe(target, options)
	}

	override unobserve(target: Element): void {
		live.get(this.#id)?.delete(target)
		recordEntry('unobserve', { observer: this.#id, target: describeElement(target) })
		super.unobserve(target)
	}

	override disconnect(): void {
		live.get(this.#id)?.clear()
		recordEntry('disconnect', { observer: this.#id })
		super.disconnect()
	}
}

window.ResizeObserver = RecordingResizeObserver

window.addEventListener(
	'error',
	(event) => {
		recordEntry('error', {
			message: event.message,
			stamp: event.timeStamp,
			watched: [...live].flatMap(([id, targets]) => [...targets].map((target) => `${id}:${describeElement(target)}`)),
		})
	},
	{ capture: true },
)

beforeEach((context) => {
	current = context.task.name
	recordEntry('test-start', null)
})

afterEach(() => {
	recordEntry('test-end', null)
})

export function writeLog(name: string): Promise<void> {
	return commands.writeFile(`tmp/probe/${name}.json`, JSON.stringify(log, null, '\t'))
}

afterAll(async () => {
	current = '(after all)'
	await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
	await writeLog('recording')
})
