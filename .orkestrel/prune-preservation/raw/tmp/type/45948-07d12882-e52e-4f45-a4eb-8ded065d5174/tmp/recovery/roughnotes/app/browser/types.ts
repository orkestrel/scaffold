import type {
	CatalogInterface,
	Category,
	Department,
	Inquiry,
	InquiryField,
	Invoice,
	InvoiceField,
	Subscription,
	SubscriptionField,
	View,
} from '@app/core'
import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
import type { RouterMatch } from '@orkestrel/router'
import type { NavigatorInterface } from '@orkestrel/router/browser'
import type { Ref, ShallowRef } from 'vue'

/**
 * Holds the per-route payload the navigator matches back.
 */
export interface RouteMeta {
	readonly view: View
}

/**
 * Holds one header navigation destination.
 */
export interface NavItem {
	readonly path: string
	readonly label: string
}

/**
 * Names events the application controller emits.
 *
 * @remarks
 * `navigate` forwards a successful navigator match. `theme` reports the
 * persisted dark flag. `subscribe` reports an accepted subscription.
 * `inquire` reports an accepted contact inquiry. `pay` reports an accepted
 * fixture invoice. Declared as a type alias so the literal satisfies the
 * emitter `EventMap` constraint.
 */
export type ApplicationEventMap = {
	readonly navigate: readonly [match: RouterMatch<RouteMeta>]
	readonly theme: readonly [dark: boolean]
	readonly subscribe: readonly [subscription: Subscription]
	readonly inquire: readonly [inquiry: Inquiry]
	readonly pay: readonly [invoice: Invoice]
}

/**
 * Represents optional seams for {@link ApplicationInterface}.
 *
 * @remarks
 * `storage` defaults to `localStorage` when the host has one. Tests pass a
 * memory storage so theme persistence does not touch the shared page store.
 */
export interface ApplicationOptions {
	readonly catalog?: CatalogInterface | undefined
	readonly storage?: Storage | undefined
	readonly on?: EmitterHooks<ApplicationEventMap>
	readonly error?: EmitterErrorHandler
}

/**
 * Owns the validation and acceptance boundary for one request.
 *
 * @remarks
 * The owning noun supplies the domain: subscription, inquiry, or payment.
 * Grouping its accepted value, issues, and operations prevents ambiguous or
 * prefixed issue members. Checking updates feedback without accepting a record
 * or emitting an event; only submission crosses that boundary.
 */
export interface RequestInterface<Value, Field> {
	readonly accepted: Readonly<ShallowRef<Value | undefined>>
	/**
	 * Names the fields the last check refused.
	 *
	 * @remarks
	 * `undefined` means the draft is unchecked, or accepted: submission clears the collection
	 * so an accepted request carries no feedback. An empty collection means a checked draft is
	 * valid, which is what keeps a later edit revalidating. An empty collection is truthy, so
	 * paint a summary from the named fields rather than from the ref holding a value.
	 */
	readonly issues: Readonly<ShallowRef<readonly Field[] | undefined>>
	/**
	 * Updates validation feedback without accepting the draft.
	 * @param input - The unknown request payload
	 * @returns True if valid; false otherwise
	 */
	check(input: unknown): boolean
	/**
	 * Validates and accepts the request, emitting its application event on success.
	 * @param input - The unknown request payload
	 * @returns True if accepted; false otherwise
	 */
	submit(input: unknown): boolean
}

/**
 * Represents the composition root for the knowledge site.
 *
 * @remarks
 * `location` tracks the navigator's `active` match as a Vue ref so the shell
 * can render without polling. `dark` is the boolean theme switch persisted to
 * storage as `light` / `dark` for `data-bs-theme`.
 */
export interface ApplicationInterface {
	readonly catalog: CatalogInterface
	readonly navigator: NavigatorInterface<RouteMeta>
	readonly emitter: EmitterInterface<ApplicationEventMap>
	readonly location: ShallowRef<RouterMatch<RouteMeta> | undefined>
	readonly dark: Ref<boolean>
	readonly subscription: RequestInterface<Subscription, SubscriptionField>
	readonly inquiry: RequestInterface<Inquiry, InquiryField>
	readonly payment: RequestInterface<Invoice, InvoiceField>
	start(): void
	open(path: string): void
	theme(dark: boolean): void
	destroy(): void
}

/**
 * Represents the injected application plus its theme flag.
 */
export interface ThemeView {
	readonly dark: Readonly<Ref<boolean>>
	toggle(): void
}

/**
 * Represents a magazine-filter choice, including the unfiltered listing.
 *
 * @remarks
 * `category` is `undefined` for the All articles control.
 */
export interface FilterChoice {
	readonly category: Category | undefined
	readonly label: string
}

/**
 * Represents a shop-department filter choice, including the unfiltered listing.
 *
 * @remarks
 * `department` is `undefined` for the All items control.
 */
export interface DepartmentChoice {
	readonly department: Department | undefined
	readonly label: string
}

/**
 * Holds one quiet shell destination.
 *
 * @remarks
 * `destination` is an in-app navigator path when it starts with `/`, and a complete external or
 * protocol URL otherwise. `mark` is the Bootstrap Icons class the link paints beside its label,
 * and is `undefined` for a link that carries no icon.
 */
export interface ShellLink {
	readonly label: string
	readonly destination: string
	readonly mark?: string | undefined
}

/**
 * Holds one titled cluster of shell destinations.
 *
 * @remarks
 * The footer paints `title` as a heading and the utility bar paints it as the list's accessible
 * name, so every cluster of shell links carries a name whichever region renders it.
 */
export interface ShellGroup {
	readonly title: string
	readonly links: readonly ShellLink[]
}

/**
 * Holds one step of a page's trail.
 *
 * @remarks
 * `path` is `undefined` for the page the reader is on, which the trail marks as current rather
 * than links.
 */
export interface TrailStep {
	readonly label: string
	readonly path?: string | undefined
}

/**
 * Represents the page frame every screen composes from.
 *
 * @remarks
 * `title` is the screen's only `h1`. `lead` is the bounded introduction under it. `trail` renders
 * exactly the steps it receives, so the frame invents no root step and no level the caller did not
 * declare. The default slot carries the screen's sections and the frame spaces them; the `next`
 * slot carries the continuation the screen ends in.
 */
export interface FrameOptions {
	readonly title: string
	readonly lead?: string | undefined
	readonly trail?: readonly TrailStep[] | undefined
}

/**
 * Represents a primary region beside an independent supporting region.
 *
 * @remarks
 * `span` is how many of the twelve grid columns the primary region takes from 992 px, and the
 * supporting region takes the rest. Default: 7. Below 992 px the regions stack in reading order.
 * The regions are independent, so they align to their top edge and neither stretches to the
 * other's height.
 */
export interface SplitOptions {
	readonly span?: number
}

/**
 * Holds one supporting fact on a collection entry.
 */
export interface EntryFact {
	readonly label: string
	readonly value: string
}

/**
 * Represents one repeated collection entry.
 *
 * @remarks
 * `href` is the entry's single real destination and the title carries it, so the entry holds one
 * interactive element and nothing nested inside its stretched link. An entry renders only the
 * facts it receives and looks nothing up for itself. `rank` is the entry's standing among the
 * records it sits with, painted above the title as a marker; an entry with no standing to state
 * omits it. The marker is text rather than a control, so the one-link invariant holds.
 */
export interface EntryOptions {
	readonly title: string
	readonly href: string
	readonly rank?: string | undefined
	readonly summary?: string | undefined
	readonly facts?: readonly EntryFact[] | undefined
}

/**
 * Names the contextual states a notice presents.
 *
 * @remarks
 * `empty` is a collection with no members, `miss` a search that matched nothing, and `partial` a
 * collection reduced by a filter. The union carries no success and no progress member: a notice
 * reports neither an outcome nor a wait it did not receive.
 */
export type NoticeCategory = 'empty' | 'miss' | 'partial'

/**
 * Represents one contextual notice and its recovery.
 *
 * @remarks
 * The default slot carries the real recovery control.
 */
export interface NoticeOptions {
	readonly category: NoticeCategory
	readonly title: string
	readonly detail?: string | undefined
}
