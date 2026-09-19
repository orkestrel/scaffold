import type {
	CatalogInterface,
	Inquiry,
	InquiryField,
	Invoice,
	InvoiceField,
	Subscription,
	SubscriptionField,
} from '@app/core'
import type { Result } from '@orkestrel/contract'
import type { EmitterInterface } from '@orkestrel/emitter'
import type { RouterMatch } from '@orkestrel/router'
import type { NavigatorInterface } from '@orkestrel/router/browser'
import type { ShallowRef } from 'vue'
import type {
	ApplicationEventMap,
	ApplicationInterface,
	ApplicationOptions,
	RequestInterface,
	RouteMeta,
} from '../types.js'
import { createCatalog, parseInquiry, parseInvoice, parseSubscription } from '@app/core'
import { Emitter } from '@orkestrel/emitter'
import { createNavigator } from '@orkestrel/router/browser'
import { ref, shallowRef } from 'vue'
import { HOME_PATH, THEME_STORAGE } from '../constants.js'
import { readRoot, readStorage, readTheme, rememberTheme, writeTheme } from '../helpers.js'
import { MemoryStorage } from '../MemoryStorage.js'
import { ROUTES } from '../routes.js'

/**
 * Owns the catalog, hash navigator, theme persistence, and request acceptance.
 *
 * @remarks
 * `start` applies the stored theme and begins hash dispatch. `destroy` stops
 * the navigator and the emitter last.
 */
export class ApplicationController implements ApplicationInterface {
	readonly #storage: Storage
	readonly #emitter: Emitter<ApplicationEventMap>
	readonly #subscription = {
		accepted: shallowRef<Subscription | undefined>(),
		issues: shallowRef<readonly SubscriptionField[] | undefined>(),
	}
	readonly #inquiry = {
		accepted: shallowRef<Inquiry | undefined>(),
		issues: shallowRef<readonly InquiryField[] | undefined>(),
	}
	readonly #payment = {
		accepted: shallowRef<Invoice | undefined>(),
		issues: shallowRef<readonly InvoiceField[] | undefined>(),
	}
	readonly catalog: CatalogInterface
	readonly navigator: NavigatorInterface<RouteMeta>
	readonly location = shallowRef<RouterMatch<RouteMeta> | undefined>()
	readonly dark = ref(false)
	readonly subscription: RequestInterface<Subscription, SubscriptionField> = {
		accepted: this.#subscription.accepted,
		issues: this.#subscription.issues,
		check: this.#subscribe.bind(this, false),
		submit: this.#subscribe.bind(this, true),
	}
	readonly inquiry: RequestInterface<Inquiry, InquiryField> = {
		accepted: this.#inquiry.accepted,
		issues: this.#inquiry.issues,
		check: this.#inquire.bind(this, false),
		submit: this.#inquire.bind(this, true),
	}
	readonly payment: RequestInterface<Invoice, InvoiceField> = {
		accepted: this.#payment.accepted,
		issues: this.#payment.issues,
		check: this.#pay.bind(this, false),
		submit: this.#pay.bind(this, true),
	}

	/**
	 * Creates the composition root.
	 *
	 * @param options - Optional catalog, storage, and emitter hooks
	 */
	constructor(options?: ApplicationOptions) {
		this.#emitter = new Emitter<ApplicationEventMap>({
			...(options?.on === undefined ? {} : { on: options.on }),
			...(options?.error === undefined ? {} : { error: options.error }),
		})
		this.catalog = options?.catalog ?? createCatalog()
		this.#storage = options?.storage ?? readStorage() ?? new MemoryStorage()
		this.dark.value = readTheme(this.#storage, THEME_STORAGE)
		this.navigator = createNavigator({
			routes: ROUTES,
			history: false,
			fallback: HOME_PATH,
			on: {
				navigate: this.#arrive.bind(this),
			},
		})
	}

	get emitter(): EmitterInterface<ApplicationEventMap> {
		return this.#emitter
	}

	/**
	 * Applies the stored theme and starts hash dispatch.
	 */
	start(): void {
		const root = readRoot()
		if (root !== undefined) writeTheme(this.#storage, THEME_STORAGE, root, this.dark.value)
		this.navigator.start()
	}

	/**
	 * Navigates to `path` through the hash navigator.
	 *
	 * @param path - The `/`-prefixed path
	 */
	open(path: string): void {
		this.navigator.navigate(path)
	}

	/**
	 * Paints `data-bs-theme`, persists `dark`, and reports the mode.
	 *
	 * @param dark - The theme flag
	 *
	 * @remarks
	 * The document is painted before the flag moves, so the control reading `dark` never
	 * announces a mode the page is not in. A store that refuses the write leaves the mode painted
	 * and unremembered; `rememberTheme` owns that refusal.
	 */
	theme(dark: boolean): void {
		const root = readRoot()
		if (root === undefined) rememberTheme(this.#storage, THEME_STORAGE, dark)
		else writeTheme(this.#storage, THEME_STORAGE, root, dark)
		this.dark.value = dark
		this.#emitter.emit('theme', dark)
	}

	/**
	 * Stops the navigator and destroys the emitter.
	 */
	destroy(): void {
		this.navigator.destroy()
		this.#emitter.destroy()
	}

	#subscribe(commit: boolean, input: unknown): boolean {
		const value = this.#validate(parseSubscription(input), this.#subscription.issues, commit)
		if (value === undefined) return false
		if (commit) {
			this.#subscription.accepted.value = value
			this.#emitter.emit('subscribe', value)
		}
		return true
	}

	#inquire(commit: boolean, input: unknown): boolean {
		const value = this.#validate(parseInquiry(input), this.#inquiry.issues, commit)
		if (value === undefined) return false
		if (commit) {
			this.#inquiry.accepted.value = value
			this.#emitter.emit('inquire', value)
		}
		return true
	}

	#pay(commit: boolean, input: unknown): boolean {
		const value = this.#validate(parseInvoice(input), this.#payment.issues, commit)
		if (value === undefined) return false
		if (commit) {
			this.#payment.accepted.value = value
			this.#emitter.emit('pay', value)
		}
		return true
	}

	#validate<Value, Field>(
		result: Result<Value, readonly Field[]>,
		issues: ShallowRef<readonly Field[] | undefined>,
		commit: boolean,
	): Value | undefined {
		issues.value = result.success ? (commit ? undefined : []) : result.error
		return result.success ? result.value : undefined
	}

	#arrive(match: RouterMatch<RouteMeta>): void {
		this.location.value = match
		this.#emitter.emit('navigate', match)
	}
}
