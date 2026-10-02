# Browser convention verdict — the engine's plugin seam and the browser surface

The user's instruction of 2026-10-02: `TipRenderer` is not convention; `Engine` matters most, because listing the adapters in a type limits it and accepting adapters as `install(plugin, adapter)` is awkward; map the ecosystem with Grok, run an Opus and an Astra pass over the candidates, read the focused set, and bring `Engine` and all of `src/browser` up to par under `AGENTS.md` and the rules. Later the same day: `@orkestrel/contract` is a runtime dependency used throughout.

## Evidence

- **The map.** Twelve Grok 4.7 Extra High lanes over every project under `WebstormProjects` and one synthesis lane: veneer `tmp/units/convention-<family>-distillate.md` and `tmp/units/convention-synthesis-distillate.md`, every citation resolving (one harness citation past its file's end discarded). The shared conventions by package count: `{Entity}Interface` 51; `create*` returning the entity 50; a package error with `code` and an `is*` guard 37; one-word option leaves 25; emitter event maps with an `on` record 25; `string` registry keys 19 (mcp's `add(name, handler)` with a noun lookup and replace-by-name, built-ins on the same seam; reason's `register(reasoner)` where the record carries its own key). No package installs an adapter keyed by a closed union, none registers from a static block, and none renders a template with slots (template's `fill` and html's `sanitize` are the nearest).
- **The lanes.** `planner` (Claude Opus 5.5, subjective; veneer `tmp/units/browser-convention-planner-proposal.md`, 169 citations, 3 resolving only against the veneer root) and `analyst` (GPT-6 Astra, objective with probes; `tmp/units/browser-convention-analyst-proposal.md`, 206 citations, the veneer-relative ones resolving against the veneer root, probes deleted, tree clean). Both proposals are kept verbatim beside this verdict's inputs.
- **The analyst's measurements (2026-10-02).** A closed `BrowserPlugin` union refuses a consumer family (TS2345, TS2322); an erased map cannot recover a typed component without an assertion (TS2322); `NoInfer` makes a plugin fix the component type its registry accepts. Under Vite 8.3.2 and the library settings, a source consumer exporting only `createEngine` keeps **0** of the 12 static-block registrations, `createDropdown` keeps 1, the full barrel keeps 12: the landed engine's self-registration is shaken away from a source consumer (the manifest's `sideEffects` lists CSS and SCSS only).
- **The Orchestrator's measurements (2026-10-02, on veneer `4eeb089`).** A probe in `src/browser` (deleted, tree clean) typechecked under `configs/src/tsconfig.browser.json` with exit 0: a stored plugin that carries its component type only in return positions (`is`, `create`) joins `readonly PluginInterface[]` without an assertion or method bivariance; an arrow in a `static readonly plugin = buildPlugin<X>({ ... })` initializer reaches the class's private method; `NoInfer<T>` on the registry's `own` holds. `oxlint --deny-warnings` raised no `policy/no-nested-functions` report on those arrows, which the rule's implementation confirms (`configs/policy.ts:596-609`: a static field initializer has no function ancestor). The lint does require `ReadonlyArray<X<T>>` for a non-simple element type. Fleet names: every name this verdict publishes is free in the hosted guides except `RouteInput`, `RouteHandler`, `RouteContext`, and `RouteRecord`, which router owns; routes are router's subject, so the engine's route types take the `Plugin` qualifier.

## Rulings

1. **The plugin descriptor.** A Bootstrap family declares itself as one value that carries its own name: `PluginInterface<T>`. The name is an open `string` (the registry key and the `.bs.<name>` namespace); the closed `BrowserPlugin` union, `EngineAdapter`, `EngineRoute`, `ENGINE_ROUTES`, and `Engine.install` go. A family is authored as `PluginInput<T>` and built by `buildPlugin(input)`, a class-free helper that binds each typed route handler into a stored route: it resolves the hosts, applies the gate, prevents the default, skips a disabled trigger where the route says so, gets or creates the component through the registry (narrowed by the plugin's `is` guard), and runs the handler, in that order. The stored form carries `T` only in return positions, so plugins of different components share one list soundly; the lanes' disagreement on method bivariance is ruled for the binder (measured).
2. **Registration is explicit and per scope; the built-ins are values the caller composes.** Amended by the user on 2026-10-02: the default Bootstrap plugins are extracted so a caller registers them individually or as a default collection and puts them into the engine explicitly.
   - **Individually.** Each class carries its record: `Alert.plugin`, `Button.plugin`, `Carousel.plugin`, `Collapse.plugin`, `Dropdown.plugin`, `Modal.plugin`, `Offcanvas.plugin`, `Scrollspy.plugin`, `Tab.plugin`, `Toast.plugin`, `Tip.tooltip`, `Tip.popover` (each `static readonly … = buildPlugin<X>({ ... })`, a value; loading it changes no state).
   - **As the default collection.** `createPlugins(): readonly PluginInterface[]` in `factories.ts` returns the twelve in Bootstrap's bundle order (alert, button, carousel, collapse, dropdown, modal, offcanvas, popover, scrollspy, tab, toast, tooltip). It is a factory, not a constant, because the records reference classes and `constants.ts` imports none (`architecture.md`: leaf files import no class; function-bearing data is not constant data).
   - **Into the engine.** `createEngine(root?, options?)` routes exactly `options.plugins`, which defaults to `createPlugins()`, so a markup-only page still boots with no code and an explicit list is the whole configuration.
   - **Same-named replacement.** When one list names a plugin twice, the later replaces the earlier in the earlier's position (`resolvePlugins(plugins)` in `helpers.ts`, applied by `Engine` so `new Engine(root, plugins)` agrees): `[...createPlugins(), dialogModal]` swaps the built-in modal in place, which is stage B's path.
   - **Repeated boot.** A repeated `createEngine` over a live root returns the live scope and ignores its options, as a configured component ignores later options; to change a scope's plugins, destroy it and create it again.
   - **No global state.** No global registry and no definition-time registration remain: the static blocks go, and `createEngine` reaches every built-in through `createPlugins`, which closes the tree-shaking defect. A scope's listeners derive from its plugins' route and clear events (all in the capture phase on the document).
3. **Routes belong to their plugin.** `action` and `target` (algorithm-selecting literals) become `execute` and `hosts` functions; `guard` becomes `disabled` (default `true`: the route serves a disabled trigger; `false` skips it), because "guard" names a type guard across the fleet; `prevent` replaces the engine's plugin-name check; `gate` stays. Boot is not an event: a plugin's `boot` entry names the selector the boot pass scans under the root (nearest live scope only) and an optional handler (offcanvas shows; the others create). The dropdown's outside-click and Tab-release closing is the plugin's `clear` entry (its events and its handler), run in every live scope with a registry view that resolves a component only where that scope is the element's nearest live scope (the responsibility rule of 2026-10-02, unchanged). For each event the engine walks the scope's plugins in order and, per plugin, runs its `clear` (when the event is one of its events) and then its routes for that event, which follows Bootstrap's module registration order: alert, button, carousel, and collapse handlers precede dropdown clearing, and the modal toggle precedes the modal dismiss. The family proofs measure the order against the oracle; where a transcript changes, the oracle wins and the unit names the row.
4. **The registry is its own class.** `Registry` implements `RegistryInterface` as a view over per-document storage held in its static private map, so `new Registry(document)` from any caller reads the one document registry; every member takes the plugin first: `component(plugin, element)`, `own(plugin, component)`, `release(plugin, component)`, `settle(plugin, element, options, build)`. A live entry the plugin's guard refuses reads as absent; `own` throws `VeneerError` `REGISTRY_CONFLICT` when a different live component holds the plugin's name on the host. The scope's view records ownership by creator around the same storage; the registry logic is written once. `Engine` implements `EngineInterface` alone; its constructor never returns another instance and throws `VeneerError` `ENGINE_ROOT` over a root that already has a live scope; `Engine.resolve(root, plugins)` returns the live scope or creates one, and `createEngine` merges and resolves. `Engine.registry`, `EngineScopeInterface`, and `EngineRegistryInterface` go.
5. **The tip renderer is a helper.** `TipRenderer`, `TipRendererOptions`, and `TipRendererInterface` go; `renderTip(document, options: TipRenderOptions): HTMLElement | undefined` in `helpers.ts` keeps every behavior (sanitized template and HTML strings, element content moved under HTML and read as text otherwise, a falsy slot removed as Bootstrap's `TemplateFactory` removes it, a fresh detached root) and takes the owner document instead of the ambient one. `content` maps selectors to `string | HTMLElement | undefined`; `null` leaves the type.
6. **Markup input parses once, in the constructor.** `readInput(element, plugin)` goes (it coerces under a `read*` name and branches on a plugin name): `parseInput(element)` and `parseTipInput(element)` in `parsers.ts` (`parse*` is the coercing read from a live host object, `names.md`), the tip variant reading no `data-bs-config` and stripping `allowList`, `sanitize`, and `sanitizeFn`. Each constructor resolves its options once (`resolveModalOptions(parseInput(element), options)`); factories pass the caller's typed options and a plugin's `create` passes the config Bootstrap's data API passes for that family: `{ toggle: false }` for collapse (`collapse.js:287`), none for every other family (amended 2026-10-02 after the first implementation run measured the double show; the Orchestrator read every Bootstrap construction call). `resolvePopper` becomes `parsePopper`; the unit names `resolveSerializable` for its kind.
7. **Errors.** `VeneerError`, `VeneerErrorCode`, and `isVeneerError` stay in core (the fleet's package-named shape, 37 packages). `context` becomes `Readonly<Record<string, unknown>> | undefined`, assigned only when given; `ENGINE_DESTROY` carries `{ errors }`, collected through contract's `attempt`. The code union gains `ENGINE_ROOT` and `REGISTRY_CONFLICT`. No throw becomes a `Result`: each is a programmer error or a teardown aggregate.
8. **Events and hooks.** The DOM variant stays (`patterns.md`: one event model per environment; the drop-in contract fixes Bootstrap's names). The twelve `*Hooks` aliases go (`on?: ComponentHooks<ModalEventMap>`); `WIRE_EVENTS` splits into one constant per family typed `Readonly<Record<keyof XEventMap, string>>` (`ALERT_EVENTS`, `BUTTON_EVENTS`, `CAROUSEL_EVENTS`, `COLLAPSE_EVENTS`, `DROPDOWN_EVENTS`, `MODAL_EVENTS`, `OFFCANVAS_EVENTS`, `SCROLLSPY_EVENTS`, `TAB_EVENTS`, `TOAST_EVENTS`, and `TIP_EVENTS` keyed by `TipProfile`), so a hook key and its wire name cannot drift; `bindEventMap<TMap>(element, names, hooks)` is typed by the map.
9. **The tips.** `Tooltip` and `Popover` only choose a profile and install an adapter, so they go; `Tip` takes `TipProfile = 'tooltip' | 'popover'` (a real discriminant: defaults, template, slots, wire names) and carries `static readonly tooltip` and `static readonly popover` plugin records; `createTooltip` and `createPopover` settle against `Tip` and return `TooltipInterface` and `PopoverInterface`.
10. **The rest of the surface.** `isDisabled` and `isVisible` move to `helpers.ts` as predicates on `HTMLElement` (neither is a total `Guard<T>`; `isVisible`'s narrowing drops `HTMLElement` from a hidden element); `isTrigger` folds into the binder; `BROWSER_DEFAULTS` splits into one defaults constant per family and `TIP_DEFAULTS` keyed by profile; `BackdropOptions.visible` becomes `enabled` (one concept, one term: `visible` is a component's open state); internal snapshots store `undefined` for an absent attribute (`getAttribute(name) ?? undefined`) and keep `null` only where Bootstrap's wire carries it (`relatedTarget: null`); every published placement type gets member TSDoc. `helpers.ts` stays one file: its length breaks no rule.
11. **Contract throughout.** As the analyst's table rules: the DOM guards stay and use contract's primitives inside (`isObject`, `isFunction`, `isString`, `isArray`, `isInstance`); `isBrowserRecord` keeps its own-data-property invariant over contract's checks; `parseDatum` keeps Bootstrap's `normalizeData` semantics with contract's `parseJSON`, `attempt`, and `isString` inside; `resolveScalar` keeps its strict type match; the partial Popper projection stays a projection; `Engine.destroy` collects with `attempt`; plugin guards and `isVeneerError` use `isInstance`. No local copy of a contract primitive remains.
12. **The barrel.** The construction test of `architecture.md` governs: a class stays barrelled when a consumer can construct it from values it holds. The component classes take `(element, registry, options)` and `new Registry(document)` is constructible, so they stay barrelled with their `plugin` records, which is the extension surface ("developers receive the same supported mechanisms the package uses"); `Engine` and `Registry` are barrelled. This amends design ruling 2's interning sentence. `Tooltip`, `Popover`, and `TipRenderer` leave the barrel because they leave the package.
13. **The user's open rulings, ruled 2026-10-02 ("Agreed on all").** Stage B is a later chunk, built as same-named plugin replacements through this seam (`<dialog class="modal">` as a `modal` plugin in a caller's list). Tip auto-start stays: it is the `boot` entry of `Tip.tooltip` and `Tip.popover`, carried by the default collection, with the `tip-boot` departure row; a caller turns it off by composing a list without those records or with same-named replacements that declare no `boot`, and the engine carries no branch for it. The name `Engine` stays (free in the fleet; it names the mechanism).

## Declarations

These are the contract the implementation unit writes first (`src/browser/types.ts`, `src/core/types.ts`).

```ts
import type { Guard } from '@orkestrel/contract'

/** Carries a routed trigger, its native event, and the dispatching scope's registry to a plugin handler. */
export interface EngineInteraction {
	readonly trigger: HTMLElement
	readonly event?: Event
	readonly registry: RegistryInterface
}

/** Describes a typed data API route a plugin declares; `buildPlugin` binds it into a stored route. */
export interface PluginRouteInput<T extends ComponentInterface> {
	readonly event: string
	readonly selector: string
	readonly gate?: string
	readonly disabled?: boolean
	readonly prevent?: boolean
	readonly hosts?: (trigger: HTMLElement) => readonly HTMLElement[]
	readonly execute?: (component: T, interaction: EngineInteraction) => void
}

/** Describes the hosts a plugin initializes when its scope boots, and the work it performs on each. */
export interface PluginBootInput<T extends ComponentInterface> {
	readonly selector: string
	readonly execute?: (component: T, interaction: EngineInteraction) => void
}

/** Describes document-wide closing a plugin runs in every live scope on its events. */
export interface PluginClearInterface {
	readonly events: readonly string[]
	readonly execute: (event: Event, registry: RegistryInterface) => void
}

/** Describes a plugin as its author writes it: name, guard, constructor, routes, boot, and clearing. */
export interface PluginInput<T extends ComponentInterface> {
	readonly name: string
	readonly is: Guard<T>
	readonly create: (element: HTMLElement, registry: RegistryInterface) => T
	readonly routes?: ReadonlyArray<PluginRouteInput<T>>
	readonly boot?: PluginBootInput<T>
	readonly clear?: PluginClearInterface
}

/** Describes a bound route the engine dispatches. */
export interface PluginRouteInterface {
	readonly event: string
	readonly selector: string
	readonly execute: (interaction: EngineInteraction) => void
}

/** Describes bound boot work the engine runs over the root. */
export interface PluginBootInterface {
	readonly selector: string
	readonly execute: (interaction: EngineInteraction) => void
}

/** Describes a built plugin: the value a scope routes and a registry keys. */
export interface PluginInterface<T extends ComponentInterface = ComponentInterface> {
	readonly name: string
	readonly is: Guard<T>
	readonly create: (element: HTMLElement, registry: RegistryInterface) => T
	readonly routes: readonly PluginRouteInterface[]
	readonly boot?: PluginBootInterface
	readonly clear?: PluginClearInterface
}

/** Describes the document-wide component registry, keyed by plugin name and host element. */
export interface RegistryInterface {
	component<T extends ComponentInterface>(plugin: PluginInterface<T>, element: HTMLElement): T | undefined
	own<T extends ComponentInterface>(plugin: PluginInterface<T>, component: NoInfer<T>): void
	release<T extends ComponentInterface>(plugin: PluginInterface<T>, component: NoInfer<T>): void
	settle<T extends ComponentInterface>(
		plugin: PluginInterface<T>,
		element: HTMLElement,
		options: object,
		build: () => NoInfer<T>,
	): T
}

/** Configures a boot scope at creation. */
export interface EngineOptions {
	readonly plugins?: readonly PluginInterface[]
}

/** Configures the markup a tip renders. */
export interface TipRenderOptions {
	readonly template: string
	readonly content: Readonly<Record<string, string | HTMLElement | undefined>>
	readonly html?: boolean
	readonly class?: string
	readonly sanitize?: TipSanitizeOptions
}

/** Names a tip's Bootstrap profile. */
export type TipProfile = 'tooltip' | 'popover'

// src/core/types.ts
export type VeneerErrorCode =
	| 'ENGINE_DESTROY'
	| 'ENGINE_ROOT'
	| 'REGISTRY_CONFLICT'
	| 'TIP_HIDDEN'
	| 'DROPDOWN_MENU'
```

The functions: `createEngine(root?: Document | HTMLElement, options?: EngineOptions): EngineInterface`, `createPlugins(): readonly PluginInterface[]`, and the twelve factories in `factories.ts`; `resolvePlugins(plugins: readonly PluginInterface[]): readonly PluginInterface[]` in `helpers.ts` (each `new Registry(element.ownerDocument).settle(X.plugin, element, options, () => new X(element, registry, options))`); `buildPlugin<T>(input: PluginInput<T>): PluginInterface<T>`, `renderTip`, `resolveTargets`, and the dismiss and dropdown-toggle host resolvers in `helpers.ts`; `parseInput`, `parseTipInput`, `parseDatum`, and `parsePopper` in `parsers.ts`.

## Not carried

- The planner's `RouteInterface`, `RouteEvent`, `Interaction`, and method-bivariant handlers: the names collide with router's subject or carry no qualifier, and the binder measured sound without bivariance.
- The analyst's global `Engine.install(family)` with refusal of a second descriptor and registration after boot, and its `EngineComponentManagerInterface` noun on `EngineInterface`: per-scope composition is the ecosystem's instance-scoped shape, needs no global state, and fixes the tree-shaking defect; a public manager on the scope widens the API with no consumer.
- The analyst's `routes.ts` and `handlers.ts` tables: the dropdown's keyboard handling reaches a private member, so routes live in the class's `plugin` record.
- Interning the component classes (planner, and design ruling 2): the construction test keeps them public with a constructible `Registry`.
- A `placement` module split: no rule requires it.

## Units

1. `browser-convention` (GPT-6 Astra, worktree `veneer-wt-browser-convention` from veneer `main`): rulings 1 to 12 in one tree, types first, the oracle proofs as the measure, the consumer migration (`app/browser/Showcase.ts`, `tests/setupBrowser.ts`, the family proofs), guide parity (every surface and method row), the roadmap counts; brief at veneer `tmp/codex/browser-convention-brief.md`.
2. One `orkestrel-falsify` round over the landing (reviewer Claude Opus 5.5 for the Astra-written mechanism; analyst GPT-6 Astra for the contract this verdict wrote).
3. The tree-wide gates, then this verdict and the audit verdict close.
