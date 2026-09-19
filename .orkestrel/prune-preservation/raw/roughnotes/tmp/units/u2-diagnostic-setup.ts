import type { ApplicationInterface } from '@app/browser'
import type { Component } from 'vue'
import { createApp, defineComponent, h } from 'vue'
import { waitForCondition } from '@orkestrel/test'
import {
	clickAccessible,
	clickAccessibleWithin,
	readPage,
	resolveRendered,
} from '@orkestrel/test/browser'
import {
	APPLICATION_KEY,
	App,
	COPY,
	createApplication,
	createMemoryStorage,
	useTheme,
} from '@app/browser'

/** How long a surface may take to paint a heading after a hash change, in ms. */
export const SETTLE_BUDGET = 4_000

/** How often a settle poll may re-read the page, in ms. */
export const SETTLE_INTERVAL = 25

/** The heading the home view paints. */
export const HOME_HEADING = 'The knowledge that makes independent agents unstoppable.'

/** The voice the layer uses when Sign In is absent. */
export const SIGN_IN_ABSENT = 'No interactive element has the accessible name "Sign In"'

/** The host one journey mounted and the application it provided. */
export interface JourneySurface {
	readonly host: HTMLElement
	readonly app: ApplicationInterface
	readonly storage: Storage
}

const TEARDOWNS: Array<() => void> = []

/**
 * Reads the layer's exact refusal voice for `name`, or `undefined` when it resolves.
 *
 * @param name - The control's accessible name
 * @returns The refusal sentence, or `undefined`
 */
export function readRefusal(name: string): string | undefined {
	try {
		resolveRendered(name)
		return undefined
	} catch (error) {
		return error instanceof Error ? error.message : String(error)
	}
}

/**
 * Tears down whatever the page is holding so the next journey meets a clean document.
 */
export function clearSurface(): void {
	while (TEARDOWNS.length > 0) TEARDOWNS.pop()?.()
	document.body.replaceChildren()
	window.location.hash = ''
	document.documentElement.setAttribute('data-bs-theme', 'light')
}

/**
 * Mounts the shipped root over an isolated memory store and waits until home has painted.
 *
 * @param storage - Optional storage to reuse across sessions
 * @returns The host, controller, and storage
 */
export async function openSurface(storage?: Storage): Promise<JourneySurface> {
	clearSurface()
	const store = storage ?? createMemoryStorage()
	const app = createApplication({ storage: store })
	const host = document.createElement('div')
	document.body.append(host)
	host.addEventListener('focusin', (event) => console.log('U2 focus', event.target instanceof HTMLElement ? event.target.id || event.target.textContent?.trim().slice(0, 24) : '', document.getElementById('site-menu')?.className))
	host.addEventListener('hidden.bs.offcanvas', () => console.log('U2 menu hidden', document.activeElement?.id))
	const vue = createApp(App, { application: app })
	vue.mount(host)
	TEARDOWNS.push(() => {
		vue.unmount()
		host.remove()
		app.destroy()
	})
	await waitForCondition('home has painted', () => readPage().includes(HOME_HEADING), {
		budget: SETTLE_BUDGET,
		interval: SETTLE_INTERVAL,
	})
	return { host, app, storage: store }
}

/**
 * Opens subscribe through the home Introduction Get started control.
 */
export async function startSubscription(): Promise<void> {
	await clickAccessibleWithin(COPY.introduction, 'link', COPY.started)
}

/**
 * Follows an in-app destination from the header, opening the compact menu when it is reachable.
 *
 * @param name - The destination's accessible name
 */
export async function followSite(name: string): Promise<void> {
	if (readRefusal(COPY.menu) === undefined) {
		await clickAccessible('button', COPY.menu)
		await waitForCondition(
			'the compact menu is open',
			() => readRefusal(COPY.close) === undefined,
			{
				budget: SETTLE_BUDGET,
				interval: SETTLE_INTERVAL,
			},
		)
		await clickAccessible('link', name)
		return
	}
	await clickAccessible('link', name)
}

/**
 * Toggles color mode through the control a person can currently reach.
 */
export async function toggleThemeControl(): Promise<void> {
	if (readRefusal(COPY.dark) === undefined) {
		await clickAccessible('button', COPY.dark)
		return
	}
	await clickAccessible('button', COPY.light)
}

/**
 * Builds an SVG carrying an undefined class token for the census extractor control.
 *
 * @param name - The class token no stylesheet declares
 * @returns The SVG element
 */
export function buildMarkControl(name: string): SVGElement {
	const mark = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	mark.setAttribute('class', name)
	return mark
}

/** Maps detail views to a fixture slug the catalog actually holds. */
export const DETAIL_SLUGS: Readonly<Record<string, string>> = Object.freeze({
	product: 'roughnotes-pro',
	article: 'local-landscape',
	item: 'coverages-applicable',
})

/**
 * Mounts a view that injects {@link APPLICATION_KEY} over an isolated application.
 *
 * @param component - The view or form to mount
 * @returns The host, controller, and storage
 */
export function mountView(component: Component): JourneySurface {
	clearSurface()
	const store = createMemoryStorage()
	const app = createApplication({ storage: store })
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(component)
	vue.provide(APPLICATION_KEY, app)
	vue.mount(host)
	TEARDOWNS.push(() => {
		vue.unmount()
		host.remove()
		app.destroy()
	})
	return { host, app, storage: store }
}

/**
 * Renders the theme composable so tests can drive `toggle` without the shell.
 */
export const THEME_PROBE = defineComponent({
	setup() {
		const theme = useTheme()
		return () =>
			h(
				'button',
				{
					type: 'button',
					'aria-pressed': theme.dark.value,
					'aria-label': theme.dark.value ? COPY.light : COPY.dark,
					onClick: theme.toggle,
				},
				'theme',
			)
	},
})
