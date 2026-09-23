# J-ENGINE-SHAPE — the objective lane's proposal (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf71-2db1-7cd2-9438-0e3c72d2ceac`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-engine-shape.jsonl` (launch copy under `tmp/codex/`); 53 commands; 612 s; usage {"input_tokens":1485236,"cached_input_tokens":1350656,"cache_write_input_tokens":0,"output_tokens":18043,"reasoning_output_tokens":6201}. Retained verbatim from the exec's last message.

---

Lane: objective (`analyst`).

## Proposal per question

### 1. The override shape

Adopt one explicit, immutable vocabulary passed through a `vocabulary` option. Scope its contents by entity, then by `classes`, `attributes`, and `selectors`. `Delegate` receives the same vocabulary that directly constructed components receive and passes it to components it constructs.

Declare the shape in `types.ts`; place the frozen default tables in `constants.ts`. Bootstrap supplies the default values, not the allowed replacement values.

The contract sketch is:

```ts
export interface VocabularySection<
	TClass extends string,
	TAttribute extends string,
	TSelector extends string,
> {
	readonly classes: Readonly<Record<TClass, string>>
	readonly attributes: Readonly<Record<TAttribute, string>>
	readonly selectors: Readonly<Record<TSelector, string>>
}

export interface Vocabulary {
	readonly delegate: VocabularySection<
		never,
		'toggle' | 'dismiss' | 'target' | 'slide' | 'index',
		| 'button'
		| 'collapse'
		| 'dropdown'
		| 'tab'
		| 'modal'
		| 'offcanvas'
		| 'dismiss'
		| 'slide'
		| 'index'
		| 'spy'
		| 'ride'
		| 'open'
	>
	readonly collapse: VocabularySection<
		'base' | 'show' | 'collapsing' | 'collapsed' | 'horizontal',
		'parent' | 'toggle',
		'triggers' | 'active' | 'nested'
	>
	// Declare the remaining scopes from the inventory below.
}

export type VocabularyOptions = {
	readonly [TScope in keyof Vocabulary]?: {
		readonly [TGroup in keyof Vocabulary[TScope]]?: {
			readonly [TKey in keyof Vocabulary[TScope][TGroup]]?: string
		}
	}
}

export interface EngineOptions {
	readonly vocabulary?: VocabularyOptions
}

export interface CollapseOptions extends EngineOptions {
	readonly parent?: HTMLElement
	readonly toggle?: boolean
	readonly on?: CollapseHooks
	readonly signal?: AbortSignal
}

export interface DelegateOptions extends EngineOptions {
	readonly root?: ParentNode
}
```

A consumer defines the replacement once and supplies it explicitly:

```ts
const vocabulary: VocabularyOptions = {
	delegate: {
		attributes: {
			toggle: 'data-ui-toggle',
			target: 'data-ui-target',
		},
	},
	collapse: {
		classes: {
			show: 'expanded',
			collapsing: 'resizing',
		},
	},
}

const delegate = new Delegate({ root: document, vocabulary })
const panel = new Collapse(element, { vocabulary, toggle: false })
```

The following inventory fixes the additional vocabulary scopes. A dash means no group members. Selectors that combine tokens use the effective tokens; they are not independently copied Bootstrap strings.

| Scope | Class keys | Attribute keys | Selector keys |
|---|---|---|---|
| `color` | — | `theme` | — |
| `button` | `active` | — | — |
| `host` | `disabled` | — | `focusable` |
| `dropdown` | `show`, `up`, `end`, `start`, `raised`, `centered` | `dismiss`, `display`, `offset`, `reference` | `menu`, `navbar`, `navigation`, `entries` |
| `tab` | `active`, `fade`, `show` | — | `group`, `outer`, `inner`, `triggers`, `dropdown`, `toggle`, `menu` |
| `scrollspy` | `active` | `spy`, `target`, `margin`, `threshold`, `smooth` | `links`, `navigation`, `link`, `entry`, `list`, `dropdown`, `toggle` |
| `modal` | `show`, `fade`, `static`, `backdrop` | `backdrop`, `keyboard`, `focus` | `host`, `dialog`, `body`, `open` |
| `offcanvas` | `show`, `showing`, `hiding`, `backdrop` | `backdrop`, `keyboard`, `scroll` | `host`, `open` |
| `tooltip` | `base`, `arrow`, `inner`, `fade`, `show` | `animation`, `container`, `class`, `delay`, `fallbacks`, `html`, `offset`, `placement`, `selector`, `template`, `title`, `trigger` | `title`, `modal`, `container` |
| `popover` | `base`, `arrow`, `header`, `body`, `fade`, `show` | Tooltip’s attribute keys, plus `content` | `title`, `content`, `modal`, `container` |
| `alert` | `show`, `fade` | — | `host` |
| `toast` | `show`, `showing`, `fade` | `animation`, `autohide`, `delay` | `host` |
| `carousel` | `base`, `active`, `slide`, `end`, `start`, `next`, `previous` | `interval`, `keyboard`, `pause`, `ride`, `touch`, `wrap` | `entries`, `active`, `images`, `indicators`, `controls` |
| `backdrop` | `fade`, `show` | — | — |
| `scroll` | `open` | — | `fixed`, `sticky` |
| `placement` | — | `popper`, `position` | — |
| `swipe` | `pointer` | — | — |

Attribute keys describe the entity’s concern. Their default values retain the external spelling: `dropdown.attributes.dismiss` is `data-bs-auto-close`, `scrollspy.attributes.margin` is `data-bs-root-margin`, `tooltip.attributes.class` is `data-bs-custom-class`, and `placement.attributes.position` is `data-popper-placement`. The guide must give the complete mapping.

Do not expose renaming of platform semantics such as `aria-expanded`, `role`, `inert`, or the HTML `popover` attribute. E9 authorizes replacement of engine class tokens, data attribute names, and selectors; it does not make browser-defined accessibility or platform attributes interchangeable.

**Resolution and routing rules**

- Resolve class and attribute overrides before deriving default selectors. An explicit selector override then replaces that selector completely.
- Keep selector defaults and their named dependencies in `constants.ts`. Put resolution behavior in `helpers.ts`; do not introduce a general selector-template language.
- Escape replacement tokens and attribute names when assembling CSS selectors. Validate a class value as a single nonempty DOM token. Validate selectors before installing listeners or acquiring ownership.
- Snapshot the resolved vocabulary at construction. Later mutation of the caller’s object does not retarget a live engine.
- When `delegate.attributes.toggle` becomes `data-ui-toggle`, default toggle routes match that attribute only. Collapse’s default trigger selector follows the same setting.
- `parseCollapseAttributes(host, vocabulary)` reads `host.getAttribute(vocabulary.collapse.attributes.parent)` and the corresponding declared names. Every parser follows this pattern. Do not enumerate `dataset.bs*`, derive names from option keys, or read the old name as a fallback.
- `readTarget` and `readTargets` receive the effective target attribute name. The existing `href` target mechanism remains available.
- `Delegate` derives its scans from the relevant component vocabulary: ScrollSpy’s `spy` attribute, Carousel’s `ride` attribute, and Offcanvas’s open selector.
- An explicit route selector replaces matching, not the route’s operation or required payload. A dismiss route still reads the effective dismiss attribute; an indexed slide still reads the effective index attribute.
- Refuse an activation that matches conflicting routes before dispatching either operation. Do not resolve ambiguity by table order.
- A delegate drives an existing owner through `find`; it does not overwrite that owner’s vocabulary. Consumers must use compatible vocabularies for cooperating owners and their delegate.
- A document-wide scroll lock must refuse an additional acquisition whose effective scroll vocabulary conflicts with the live lock. Reference counting cannot restore competing snapshots correctly.

**Alternatives ruled**

| Shape | Ruling | Reason |
|---|---|---|
| Direct `classes`, `attributes`, and `selectors` on each component’s options | Decline | Local ergonomics are good, but delegation and cross-component mechanisms need another way to receive the same names. That creates overlapping configuration paths. |
| Shared vocabulary, scoped by entity | Adopt | It gives delegation, direct construction, parsers, and shared mechanisms one explicit source. |
| Mutable package default replaced globally | Decline | It introduces ambient state, construction-order behavior, and document-to-document coupling. A caller-owned vocabulary provides reuse without a package setter. |

J-TYPES round 5 adds the vocabulary declarations and the `EngineOptions` extension to the component and mechanism options that consume vocabulary. `RegistryOptions` and `SnapshotInterface` need no vocabulary. `PopoverOptions` inherits the option through `TooltipOptions`; its implementation selects the `popover` scope.

Do not derive replacement types as `Partial<typeof DEFAULTS>` when that preserves literal default values. Replacement leaves must be `string`. Under the round’s ownership restriction, declare the finite key shape in `types.ts` first; the successor’s tables must satisfy that shape. Round 5 must not import a default table that has not landed.

The J-BINDER successor adapts its existing parameter seam: resolve vocabulary, pass it through `Delegate`, `Button`, target readers, and parsers, and replace direct constant reads with the effective values. Keep its ownership, restoration, observer release, and event mechanisms. Component units add their tables, resolution, and override proofs with their first consumer.

**Evidence and amended rulings.** The seed hardcodes the route in `src/browser/Delegate.ts:59` and the active token in `Button.ts:65`; their source constants are `constants.ts:11` and `constants.ts:14`. Bootstrap combines names into selectors in `collapse.js:32`, `collapse.js:42`, `tab.js:45`, and `dropdown.js:55`, so changing tokens without updating dependent selectors is insufficient. The cascade binds the defaults through `_collapse.scss:13`, `_dropdown.scss:167`, `_dropdown.scss:263`, `_nav.scss:93`, and `_alert.scss:45`. These amendments replace R1’s vocabulary ownership, R5’s fixed routing, R11’s attribute resolution, and R13’s default-table description.

### 2. Wire event names

Adopt `{verb}.vn.{entity}` for engine-dispatched component events. Keep the event-map keys, payloads, veto points, and Button’s non-cancelable completed toggle.

The contract sketch is:

```ts
export type EngineEntity =
	| 'button'
	| 'collapse'
	| 'dropdown'
	| 'tab'
	| 'scrollspy'
	| 'modal'
	| 'offcanvas'
	| 'tooltip'
	| 'popover'
	| 'alert'
	| 'toast'
	| 'carousel'

export type EventWire<TMap, TEntity extends EngineEntity> = {
	readonly [TKey in keyof TMap]: `${TKey & string}.vn.${TEntity}`
}

// constants.ts, in the implementation successor.
export const COLLAPSE_EVENTS = Object.freeze({
	show: 'show.vn.collapse',
	shown: 'shown.vn.collapse',
	hide: 'hide.vn.collapse',
	hidden: 'hidden.vn.collapse',
} satisfies EventWire<CollapseEventMap, 'collapse'>)
```

Update every event-map TSDoc sentence and example that currently names `.bs.`. Preserve `hidePrevented` as the explicitly documented Bootstrap event-verb spelling retained by R3; changing the namespace does not require inventing another transition vocabulary.

| Choice | Cost | Ruling |
|---|---|---|
| `.vn.` | Existing raw `show.bs.collapse` listeners must change. Hooks such as `on.show` retain their keys. Internal cross-component subscriptions must also change. | Adopt |
| `.bs.` | Existing listeners retain their spelling, but package events continue to claim Bootstrap’s namespace and Button remains a separate convention. | Decline |
| Configurable suffix | Every publisher, hook binder, cross-component subscriber, guide example, and test must agree on another configuration axis. | Decline |

E9 expressly leaves this choice for the user; it does not already command `.vn.`. Its narrowed parity boundary supports package-owned wire names, and E6 removes the argument for preserving aliases. Submit `.vn.` as the objective proposal.

`ButtonEventMap` needs no change. `BUTTON_TOGGLE` already has the chosen value. If J-BINDER replaces that scalar with `BUTTON_EVENTS.toggle`, update consumers and remove the scalar outright; that consolidation is independent of the namespace decision.

**Evidence and amended rulings.** `types.ts:98` currently checks only the leading event key and permits any suffix. `types.ts:468`, `types.ts:789`, and `types.ts:1360` name Bootstrap wires. The seed establishes `toggle.vn.button` in `constants.ts:8`. Bootstrap establishes its own namespace in `collapse.js:22` and `modal.js:24`; no style selector depends on that namespace. Amend R2, R3, R9’s tooltip dismissal subscription, and R15’s identity departure.

### 3. The sanitizer port

Use a synchronous DOM-writing port. The native implementation writes through `setHTML`; the port does not require serialization and another parse to obtain a string result.

The contract sketch is:

```ts
export interface SanitizerInterface {
	/**
	 * Replaces the element's children with sanitized markup.
	 *
	 * @remarks
	 * The implementation owns sanitization and insertion. It completes
	 * synchronously and must not retain the element or the input.
	 * A failure propagates; the engine never retries through an unsafe sink.
	 */
	write(element: Element, html: string): void
}

export interface NativeSanitizerOptions {
	/**
	 * Replaces the native configuration.
	 * Absence selects the engine's Bootstrap-derived configuration.
	 * An empty dictionary is an explicit platform configuration.
	 */
	readonly config?: SanitizerConfig
}

// Replace the existing sanitize member in TooltipOptions.
export interface TooltipOptions extends EngineOptions {
	readonly sanitizer?: SanitizerInterface
	// Retain the other options listed in question 4.
}
```

Keep `SanitizerConfig`, `SanitizerElementNamespaceWithAttributes`, `SetHTMLOptions`, and `SanitizeTargetInterface` as documented partial platform mirrors. The adapter port and the platform target are different contracts: the port exposes `write`; the narrowed platform element exposes `setHTML`.

Remove `SanitizeOptions` and `SanitizeAllowlist`. The public engine no longer needs a Bootstrap allowlist representation with regular expressions. Declare the default native dictionary directly from Bootstrap’s allowlist, with explicit global attributes and per-element entries.

The native adapter must:

- Use the explicit global attributes `class`, `dir`, `id`, `lang`, and `role`.
- Preserve Bootstrap’s per-element restrictions, including `href` on `a` and image attributes on `img`.
- Set `dataAttributes: false` alongside the explicit attributes list.
- Expand Bootstrap’s ARIA-name rule into concrete attribute names for each input; a literal `aria-*` entry does not implement it.
- Call the target’s guarded `setHTML` method with the resulting dictionary. Construct no `Sanitizer` global.

A candidate-name scan can collect case-normalized `aria-[\w-]*` substrings without parsing HTML. Extra candidate names admit no non-ARIA attribute; the browser still parses and sanitizes the markup. This is a proposed implementation technique, not a measured result. J-TOOLTIP must prove it against actual attribute names, malformed markup, casing, and irrelevant matches. Do not claim a single-parse implementation if the landed implementation instead uses a preliminary DOM parse for discovery.

A custom `config` replaces the default configuration; it does not silently inherit Bootstrap’s ARIA expansion. Native safety restrictions still apply.

Correct the round-4 documentation as part of round 5:

- `SanitizerConfig.attributes`: absence permits attributes that the platform does not remove as unsafe; it does not select the no-options default allowlist.
- `SanitizerConfig.dataAttributes`: `false` removes the general permission for data attributes; an explicitly admitted data attribute can survive.
- Either boolean value requires the applicable `attributes` list under the measured dictionary path.
- Distinguish no sanitizer option from an explicit empty dictionary.
- Replace “the ones the tip sanitizer sets” with wording describing the mirror’s supported subset.

**Content flow and later adapters**

Templates and HTML string slots pass through the selected port. Text slots use `textContent`. Existing element-valued slots remain caller-supplied DOM, moved and restored under the existing ownership contract; they are not serialized through the sanitizer.

A later HTML-backed adapter implements `SanitizerInterface.write` directly. Its environment-independent sanitization remains in `@orkestrel/html`; its DOM insertion boundary belongs in a browser adapter. Veneer needs no `sanitizeFn` compatibility bridge or dependency on that package.

The existing HTML sanitizer is not an interchangeable implementation of the native default. Its guide says “A safe element merely outside the allowlist is unwrapped to its children,” and documents an unconditional refusal of `data:` URLs. Its attribute configuration is global rather than per-element. Those differences must be resolved or explicitly accepted in that separate package campaign.

**What lands when**

| Carrier | Work |
|---|---|
| J-TYPES round 5 | Add `SanitizerInterface` and `NativeSanitizerOptions`; replace `TooltipOptions.sanitize` with `sanitizer`; remove obsolete sanitizer declarations; correct the platform-mirror sentences; update Surface rows and Methods tables. |
| J-TOOLTIP | Implement `src/browser/sanitizers/NativeSanitizer.ts`, its real browser proof, native configuration constants, capability guard, content integration, barrel export, and guide prose. |
| J-POPOVER | Reuse the port and native default through the shared tooltip implementation. |

The placeholder is the declared port and its native configuration contract. Do not land an empty implementation or a class that silently passes markup through.

Remove Bootstrap’s `sanitize: false` and `sanitizeFn` paths. A consumer selects a sanitizer implementation through the constructor; markup attributes cannot select executable adapters or disable sanitization. Record the departure in the Tooltip and Popover option tables, `Engine / Content`, and Compatibility’s sanitizer row and departure paragraph.

**Evidence and amended rulings.** The replaced group is `types.ts:387`; its consumer is `types.ts:1014`. The platform mirrors begin at `types.ts:405`, `types.ts:419`, `types.ts:437`, and `types.ts:449`. Bootstrap’s allowlist and replacement function appear in `util/sanitizer.js:11` and `util/sanitizer.js:89`. The supplied sanitizer logs establish per-element entries, wildcard failure, and the differing default paths at each log’s `:2`; `j-types-audit-4-verdict.md:8` identifies the carried sentence defects. The platform’s attribute-filtering algorithm also permits explicit attributes independently of the general data-attribute permission. See the [HTML Standard’s sanitization algorithms](https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#html-sanitization). Amend R10, R11, R13, R14, R15, and R18.

### 4. Options retained, reshaped, or removed

Keep the round-4 options except the sanitizer group. Most Bootstrap-shaped unions have already been replaced with useful Orkestrel shapes.

The retained distinctions are illustrated by this sketch:

```ts
export interface DismissOptions {
	readonly backdrop?: boolean
	readonly escape?: boolean
}

export type CarouselRide = 'load' | 'interaction'

export type TipContent =
	| string
	| Element
	| ((trigger: HTMLElement) => string | Element | undefined)

// Retained option shapes:
// CarouselOptions.pause?: boolean
// CarouselOptions.ride?: CarouselRide
// CollapseOptions.parent?: HTMLElement
// DropdownOptions.reference?: HTMLElement
// TooltipOptions.container?: HTMLElement
// TooltipOptions.selector?: string
//
// Replaced option:
// TooltipOptions.sanitizer?: SanitizerInterface
```

The following walk covers each existing options key, including shared mechanisms.

| Contract | Keys and ruling |
|---|---|
| `ColorModeOptions` | Keep `root`, `storage`; add vocabulary for the theme data attribute. |
| `ButtonOptions` | Keep `on`; add vocabulary and the `signal` lifetime option already promised for components by R11. |
| `DelegateOptions` | Keep `root`; add vocabulary. |
| `RegistryOptions` | Keep `code`; it configures the ownership error, not Bootstrap behavior. |
| `IsolationOptions` | Keep `trigger`; it identifies the focus-return element. |
| `BackdropOptions` | Keep `class`, `parent`, `animated`; these are concrete backdrop inputs. The owning overlay supplies its resolved backdrop class. Add vocabulary for the shared fade/show tokens. |
| `ScrollLockOptions` | Keep `document`; add vocabulary for the body token and compensation selectors. |
| `PlacementOptions` | Keep `position`, `offset`, `fallbacks`, `static`; add vocabulary for its data attributes. |
| `SwipeOptions` | Keep `handler`, `threshold`; add vocabulary for its pointer token. |
| `SanitizeOptions` | Remove the contract and `enabled`, `allow`, `filter`; replace with the port. |
| `SetHTMLOptions` | Keep `sanitizer`; this is a declared platform dictionary mirror. Correct its default documentation. |
| `CollapseOptions` | Keep `parent`, `toggle`, `on`, `signal`. An explicit construction-time toggle is useful behavior and already boolean. |
| `DropdownOptions` | Keep `dismiss.inside`, `dismiss.outside`, `placement.offset`, `placement.static`, `reference`, `on`, `signal`. |
| `TabOptions` | Keep `on`, `signal`. |
| `ScrollSpyOptions` | Keep `target`, `smooth`, `intersection.margin`, `intersection.threshold`, `on`, `signal`. |
| `DismissOptions` | Keep `backdrop`, `escape`; the group is shared by overlay options. |
| `ModalOptions` | Keep `backdrop`, `dismiss`, `focus`, `on`, `signal`. |
| `OffcanvasOptions` | Keep `backdrop`, `dismiss`, `scroll`, `on`, `signal`. |
| `TooltipOptions` | Keep `animation`, `delay.show`, `delay.hide`, `trigger.hover`, `trigger.focus`, `trigger.click`, `title`, `html`, `tip.template`, `tip.class`, `container`, `placement.position`, `placement.offset`, `placement.fallbacks`, `selector`, `on`, `signal`; replace `sanitize` with `sanitizer`. |
| `PopoverOptions` | Keep inherited options, `content`, and its `on` specialization. |
| `AlertOptions` | Keep `on`, `signal`. |
| `ToastOptions` | Keep `animation`, `autohide`, `delay`, `on`, `signal`. |
| `CarouselOptions` | Keep `interval`, `keyboard`, `pause`, `ride`, `touch`, `wrap`, `on`, `signal`. |

`CarouselRide` names distinct startup conditions, with absence meaning no automatic start. It is not a disguised boolean. `PlacementPosition` and `PlacementInput.popover` retain their external-value unions.

The `TipContent` union represents actual content forms. It is not Bootstrap’s selector-or-element locator ambiguity. The element references in `parent`, `reference`, `target`, and `container` already admit elements alone; retain that boundary. Attribute parsers resolve locator strings before producing typed options.

Remove the remaining compatibility-only mechanisms:

| Mechanism | Ruling and reason |
|---|---|
| `data-bs-config` JSON layer | Remove. Merge defaults, declared attributes, then constructor options. JSON configuration introduces another shape and precedence path without a required engine mechanism. |
| Popper `boundary` and `popperConfig` | Exclude from the declared attribute schema as well as TypeScript options. Undeclared attributes remain ignored; do not call that supported pass-through behavior. |
| ScrollSpy’s legacy `data-bs-offset` translation | Remove. Use the declared margin/threshold configuration. Bootstrap itself marks `offset` as retained for backward compatibility. |
| Tooltip’s `data-bs-original-title` scratch attribute | Do not introduce it. Use owned state and `Snapshot` to restore `title`. |
| Toast’s deprecated `hide` token | Do not introduce it. Its stylesheet hides a toast through absence of `show`. |

Merge nested option groups by declared leaves so an explicit `false` or `0` survives without discarding sibling defaults. Keep executable hooks, adapters, signals, and vocabulary constructor-only. Default attribute values such as `hover`, `static`, and `inside` remain input syntax projected into the boolean option groups; they do not become TypeScript behavior modes.

**Evidence and amended rulings.** The option walk comes from `types.ts:5`, `:40`, `:58`, `:101`, `:191`, `:214`, `:259`, `:302`, `:355`, `:387`, `:437`, `:482`, `:564`, `:667`, `:719`, `:766`, `:797`, `:892`, `:972`, `:1139`, `:1248`, `:1296`, and `:1373`. Bootstrap’s alternative shapes are visible in `tooltip.js:81` and `carousel.js:79`. Its JSON merge is `util/config.js:40`; the legacy markers are `scrollspy.js:42`, `tooltip.js:497`, and `toast.js:31`. Toast’s actual hiding selector is `scss/_toasts.scss:35`. Amend R9, R10, R11, and R15; retain R12’s public member names.

### 5. Exact verdict amendments

Apply the following sentence replacements to `j-engine-design-verdict.md`. The quoted opening identifies the existing sentence; the replacement text is complete. Sentences not identified remain in force, subject to R1’s definition of literal Bootstrap names as defaults.

The resulting contracts compose as follows:

```ts
const vocabulary: VocabularyOptions = {
	delegate: {
		attributes: { toggle: 'data-ui-toggle' },
	},
}

const sanitizer: SanitizerInterface = new NativeSanitizer()

const tooltip = new Tooltip(trigger, {
	vocabulary,
	sanitizer,
	html: true,
	on: {
		show: event => {
			// event.type is show.vn.tooltip.
		},
	},
})
```

**R1 — replace the heading and opening sentence.**

Heading:

> R1 Styles retain Bootstrap parity; the engine owns its API.

Replace “Markup, `data-bs-*` attributes…” with:

> The styles retain Bootstrap parity; engine class tokens, data attribute names, and selectors use Bootstrap-compatible defaults that consumers can replace through an explicit vocabulary, while TypeScript contracts follow Orkestrel’s laws and component wire events use the package-owned namespace selected in R2.

Retain the construction and lifecycle sentence.

**R2 — replace the opening dispatch sentence, the alias sentence, and the Button sentence.**

> Each component dispatches `{verb}.vn.{entity}` events using its declared event-map keys, bubbling with the existing cancellation and payload contracts; Bootstrap payload field names remain documented external field mirrors carried in `detail` and as own event properties.

> Dispatch no compatibility alias and expose no event-suffix option.

> Button retains its non-cancelable `toggle.vn.button` event.

Retain the veto and `emitEvent` sentences.

**R3 — replace the heading and the sentence beginning “`{Entity}EventMap` keys are…”.**

Heading:

> R3 Event-map keys retain their declared transition vocabulary.

Replacement:

> Event-map keys remain `show`, `shown`, `hide`, `hidden`, `hidePrevented`, `inserted`, `close`, `closed`, `slide`, `slid`, `activate`, and `toggle`; each key documents its package wire name and any retained Bootstrap verb spelling, and its frozen event table satisfies `EventWire<{Entity}EventMap, '{entity}'>`.

Retain the rejection of a second translated event vocabulary.

**R4 — no sentence replacement.**

Snapshot names are the effective names supplied by the entity.

**R5 — replace “`Delegate` routes every Bootstrap data API on its root…”.**

> Delegate resolves its routing selectors from the effective vocabulary, routes the declared toggle, dismiss, and carousel actions, handles the dropdown and tab keyboard routes, and performs the declared ScrollSpy, Carousel, and open-Offcanvas construction scans; it passes its vocabulary to engines it constructs and drives existing owners through `find` without reconfiguring them.

Add:

> A replacement attribute name replaces the default name for that delegate, and an activation matching conflicting routes is refused before either route runs.

Retain observer release and component landing ownership.

**R6 — replace its final timer sentence.**

> Tooltip delays, Toast lifetimes, and Carousel intervals use native `setTimeout` and `clearTimeout`, with pending work cleared on destruction or lifetime abort; no timeout package or transition fallback timer is introduced.

**R7 — no sentence replacement.**

**R8 — replace its final light-dismiss sentence.**

> Light dismiss uses the host `mousedown` then `click` check; with a backdrop present, `dismiss.backdrop: false` emits `hidePrevented.vn.modal` and applies the effective static token, whose default is `modal-static`.

The preceding focus, stacking, backdrop, and scroll-lock mechanisms remain. Their literal tokens and selectors denote defaults under R1.

**R9 — replace the first mechanism sentence, the hint-dismissal sentence, and the final Popper-options sentence.**

> Placement promotes menus and popover tips with `popover="manual"` and tooltip tips with `popover="hint"`, retains the existing anchor-positioning and restoration mechanism, and reads and writes effective vocabulary names for its placement data attributes, component selectors, and direction tokens; static placement remains the `static` boolean, and the default cascade property remains `--bs-position`.

> A hint tooltip bridges platform dismissal through cancelable `beforetoggle` into `hide.vn.tooltip`; manual menus and popover tips retain the declared inside/outside dismissal behavior.

> Popper’s `boundary` and `popperConfig` have no engine option or declared attribute path; the guide records their exclusion and the native placement mechanism.

Retain the computed-style proof against UA defaults.

**R10 — replace the entire ruling.**

> Text content writes through `textContent`; templates and HTML string content pass through `SanitizerInterface.write(element, html)`, selected by the constructor-only `sanitizer` option.

> Absence selects `NativeSanitizer`, which calls guarded `Element.setHTML` with a `SanitizerConfig` dictionary derived from Bootstrap’s default allowlist, including per-element attribute entries, concrete ARIA attribute names, and an explicit global attribute list with `dataAttributes: false`; no engine file constructs or references the `Sanitizer` global.

> Native configuration and URL-floor departures are documented without claiming Bootstrap sanitizer equivalence.

> A supplied adapter owns sanitization and insertion, completes synchronously, and propagates failure without an unsafe fallback.

> Templates are filled while detached; undefined or empty slot content removes the slot, element content is moved and restored under the existing ownership contract, and `tip.class` adds consumer class tokens.

> Default templates use the effective vocabulary; consumers supplying a template or selector override own their consistency.

> Remove `sanitize.enabled`, `sanitize.allow`, `sanitize.filter`, `sanitize: false`, and `sanitizeFn`; the improved HTML package can supply a separate browser adapter without becoming a Veneer runtime dependency.

**R11 — replace the merge sentence, Tooltip/Popover exception sentence, general hooks sentence, and option-path sentence.**

> Resolve constructor-supplied vocabulary first, then merge typed defaults, explicitly declared attributes read through their effective names, and constructor options by declared leaves; preserve explicit `false` and `0`, reject invalid declared attributes with the entity’s option error, and ignore undeclared keys.

> Read no `data-bs-config` JSON; hooks, signals, vocabulary, and sanitizer adapters are constructor-only.

> Component options expose their declared hooks and lifetime signal, including Button; Delegate and ColorMode retain their separately declared option contracts.

> Retain the round-4 option paths except that `sanitizer?: SanitizerInterface` replaces `sanitize`; retain element-only locator options, boolean behavioral switches, grouped delay, trigger, dismissal, placement, and intersection options, and the named Carousel startup conditions.

Add:

> Attribute tables describe Bootstrap spellings as defaults mapped to Orkestrel option paths; replacement names carry the same value grammar.

**R12 — retain the member sentences; replace the inheritance/profile sentence.**

> Popover extends Tooltip and selects its profile through `new.target`; the profile supplies its name, event table, behavioral defaults, and template structure, while effective vocabulary supplies the class tokens, attributes, and slot selectors, so the shared engine needs no protected state.

**R13 — replace “Centralized files stay at the root…”.**

> Centralized contracts remain in `src/browser/types.ts`; `constants.ts` owns frozen event tables, vocabulary defaults and selector definitions, behavioral defaults, native sanitizer configuration, and template data; `helpers.ts`, `validators.ts`, and `parsers.ts` retain their existing roles.

Add:

> The sanitizer extension category places `NativeSanitizer.ts` under `src/browser/sanitizers/`, with its contract at the browser root and its intentional exports through the browser barrel.

The category follows `architecture.md:232`; the other component and mechanism classes remain flat.

**R14 — replace the dependency-matrix sentence and “No `package.json` change…”.**

> Contract remains the sole runtime dependency; emitter, abort, queue, and template retain their stated exclusions, native timers are required by E8, and the HTML package remains outside the default runtime because its sanitization and serialization contract differs from the required native adapter.

> Make no package dependency change; E7 withdraws the alleged `node:` import, E8 closes the timeout candidate, and E9 authorizes the sanitizer port with the native implementation as default.

Retain the proof-primitives sentence.

**R15 — replace the “Carried…” and “Carried with a recorded departure…” sentences.**

> Carry typed defaults and validation, explicitly declared attribute parsing through effective names, target and focus helpers, Registry ownership, delegated dismissal, the native sanitizer default and adapter port, native selector queries, and the existing useful utility mechanisms.

> Record departures for package-owned wire names, typed defaults, constructor validation and restoration, `find`, asynchronous operation results, destruction during transitions, DOM event payloads and vetoes, the removed JSON configuration layer, constructor-only sanitizer selection, and excluded Popper configuration paths.

Extend the existing exclusions sentence with:

> Exclude ScrollSpy’s legacy offset translation, Tooltip’s original-title scratch attribute, and Toast’s deprecated hide token.

Retain the Status/Proof resolver rule. The ledger continues to describe upstream obligations; departures explain the engine’s choices rather than rewriting the upstream record as if Bootstrap behaved differently.

**R16 — no sentence replacement.**

**R17 — retain existing proofs and add:**

> Each vocabulary consumer proves default behavior and a renamed-token, renamed-attribute, or replacement-selector case that reaches its mechanism; restoration, dependent selectors, delegation, and attribute coercion must use the same effective names.

> Native sanitizer proofs distinguish omitted configuration from an empty dictionary, verify per-element restrictions and ARIA expansion, and prove the documented data-attribute behavior.

These are engine proofs; the style parity population remains unchanged.

**R18 — replace the guide-structure sentence.**

> The Engine section documents events, delegation, vocabulary resolution, ownership and restoration, motion, focus, placement, content, and component contracts; each component’s attribute table names default spellings, replacement behavior, option paths, events, and departures.

Retain Surface, Methods, and component example obligations.

**Unit-table amendments**

- J-TYPES round 5 owns only `types.ts` and the guide’s contract rows and tables.
- Add a J-BINDER successor after J-BINDER and round 5, before component integration, to adapt its existing parameter seam and land vocabulary resolution, routing, parser changes, event tables, and corresponding proofs.
- J-TOOLTIP owns `sanitizers/NativeSanitizer.ts` and its proof. Replace its `buildSanitizer` and `SANITIZE_ALLOWLIST` entries with the native adapter and native configuration work.
- Component units receive resolved vocabulary and own their default and override cases.
- Preserve the W5 release boundary.

**Evidence.** These replacements address the actual sentences at `j-engine-design-verdict.md:9` through `:26` and its unit table at `:34` through `:48`. Their governing changes are `decisions.md:27`, `:31`, `:33`, `:37`, and `:41`.

## Unknowns answered

- **Can overrides break the shipped appearance?** Yes. Renaming `show` without supplying corresponding CSS can leave a panel hidden. Default vocabulary remains covered by style parity and default engine integration proofs. Override operation needs runtime proofs; arbitrary consumer styles do not acquire Bootstrap parity obligations.
- **Can default and renamed attributes coexist in a document?** Yes, through delegates on disjoint roots, each using its own vocabulary. One delegate has one effective name per attribute role. It does not automatically accept the replaced name as an alias. Overlapping delegates with conflicting vocabularies are outside the supported configuration.
- **Must Button’s map or wire change for `.vn.`?** No. Its `toggle` map key and `toggle.vn.button` value already agree.
- **Are the sketches verified implementations?** No. This is a source-backed design proposal. No compiler probe, build, or browser test was run in this lane; the supplied platform probe receipts are the runtime evidence cited.

## Risks

- Duplicated selector strings can make an override write one token while querying another. Resolve dependent selectors from effective names.
- A process-global default can couple independent documents and tests. Keep vocabulary explicit and construction-scoped.
- Different vocabularies among cooperating owners can misroute triggers or leave shared state unrestored. Document the compatibility requirement and reject conflicting document-wide scroll-lock settings.
- A partial namespace migration can leave Tooltip subscribed to `hide.bs.modal` while Modal emits `.vn.`. Change publishers and internal subscribers together.
- A string-returning sanitizer port imposes serialization and reparsing on the native path. Keep the DOM-writing boundary.
- Flattening sanitizer attributes admits element-specific attributes globally; omitting `attributes` broadens the dictionary path. Preserve the explicit configuration and its probes.
- An empty adapter implementation would defer a security boundary behind a shipped name. Land declarations in round 5 and the functioning native adapter with J-TOOLTIP.
- Altering Compatibility obligations to hide departures would weaken the upstream record. Keep the source obligations and document the accepted engine differences.

## Files read

Paths below are rooted at `C:/Users/mikes/WebstormProjects`.

- `scaffold/tmp/codex/j-engine-shape-brief.md`
- `scaffold/AGENTS.md`
- `scaffold/.claude/rules/names.md`, `patterns.md`, `architecture.md`, `typescript.md`, `documentation.md`, `writing.md`, and `quality.md`
- `scaffold/.orkestrel/veneer/engine/decisions.md`
- `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`
- `scaffold/.orkestrel/veneer/engine/units/j-types-3-probe-sanitizer.log.txt`
- `scaffold/.orkestrel/veneer/engine/units/j-types-3-probe-sanitizer-2.log.txt`
- `scaffold/.orkestrel/veneer/engine/units/j-types-3-probe-sanitizer-3.log.txt`
- `scaffold/.orkestrel/veneer/engine/units/j-types-4-probe-sanitizer-4.log.txt`
- `scaffold/.orkestrel/veneer/engine/units/j-types-audit-4-verdict.md`
- `scaffold/.orkestrel/veneer/engine/units/j-engine-guides-distillate.md`
- `scaffold/guides/html.md` — sanitizer contracts and floor
- `veneer-types/src/browser/types.ts` — whole file
- `veneer-types/src/browser/constants.ts`, `Button.ts`, and `Delegate.ts`
- `veneer-types/guides/README.md`
- `veneer-types/guides/veneer.md` — Surface, sanitizer Methods, and Compatibility sections
- `veneer-types/ROADMAP.md` — opening scope and campaign record excerpts
- `veneer-types/src/styles/components/_collapse.scss`, `_dropdown.scss`, `_nav.scss`, and `_alert.scss`
- `veneer/node_modules/bootstrap/js/src/alert.js`, `button.js`, `carousel.js`, `collapse.js`, `dropdown.js`, `modal.js`, `offcanvas.js`, `popover.js`, `scrollspy.js`, `tab.js`, `toast.js`, and `tooltip.js` — constants, defaults, and cited behavior
- `veneer/node_modules/bootstrap/js/src/dom/selector-engine.js`; attribute/name search results from `dom/manipulator.js` and `dom/event-handler.js`
- `veneer/node_modules/bootstrap/js/src/util/sanitizer.js`, `config.js`, `backdrop.js`, and `scrollbar.js`; relevant search results from `component-functions.js`, `swipe.js`, `focustrap.js`, `template-factory.js`, and `index.js`
- `veneer/node_modules/bootstrap/scss/_toasts.scss`
