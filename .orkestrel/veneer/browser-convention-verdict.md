# Browser convention verdict — the engine's plugin seam and the browser surface

The user's instruction of 2026-10-02: `TipRenderer` is not convention; `Engine` matters most, because listing the adapters in a type limits it and accepting adapters as `install(plugin, adapter)` is awkward; map the ecosystem with Grok, run an Opus and an Astra pass over the candidates, read the focused set, and bring `Engine` and all of `src/browser` up to par under `AGENTS.md` and the rules. Later the same day the user ruled four more times:

- `@orkestrel/contract` is a runtime dependency used throughout.
- The three open rulings are agreed ("Agreed on all").
- The built-in plugins are extracted so a caller composes them individually or as a default collection into the engine explicitly.
- The plugin wrapping lives apart from the classes in a `plugins.ts` kind file, with a naming convention for its functions. The user offered `register*` and asked to be pushed back where the evidence disagrees.

## Evidence

- **The map.** Twelve Grok 4.7 Extra High lanes covered every project under `WebstormProjects`, and one synthesis lane reconciled them: veneer `tmp/units/convention-<family>-distillate.md` and `tmp/units/convention-synthesis-distillate.md`. Every citation resolves except one harness citation past its file's end, which was discarded.
  - The shared conventions, by package count: `{Entity}Interface` 51; `create*` returning the entity 50; a package error with `code` and an `is*` guard 37; one-word option leaves 25; emitter event maps with an `on` record 25; `string` registry keys 19.
  - The registry precedents: mcp's `add(name, handler)` with a noun lookup and replace-by-name, built-ins on the same seam; reason's `register(reasoner)`, where the record carries its own key and the method mutates the manager.
  - No package installs an adapter keyed by a closed union, none registers from a static block, and none renders a template with slots. Template's `fill` and html's `sanitize` are the nearest.
  - The rules' own precedent for a host-composed value: middleware factories live in `middlewares.ts` as `createX(options)`, distinct from entity factories (scaffold `.claude/rules/architecture.md`, § Middleware).
- **The lanes.** Both proposals are kept verbatim beside this verdict's inputs.
  - `planner` (Claude Opus 5.5, subjective): veneer `tmp/units/browser-convention-planner-proposal.md`.
  - `analyst` (GPT-6 Astra, objective, with probes): `tmp/units/browser-convention-analyst-proposal.md`.
- **The analyst's measurements (2026-10-02).**
  - A closed `BrowserPlugin` union refuses a consumer family (TS2345, TS2322).
  - An erased map cannot recover a typed component without an assertion (TS2322).
  - `NoInfer` makes a plugin fix the component type it accepts.
  - Under Vite 8.3.2, a source consumer exporting only `createEngine` keeps none of the 12 static-block registrations of the landed engine, because the bundler drops them.
- **The Orchestrator's measurements (2026-10-02).** A deleted probe in `src/browser` typechecked under `configs/src/tsconfig.browser.json` with exit 0.
  - A stored plugin that carries its component type only in return positions joins `readonly PluginInterface[]` without an assertion or method bivariance.
  - `NoInfer<T>` holds on a typed registry method.
  - The nested-function lint admits arrows in a call's arguments outside any function (`configs/policy.ts:596-609`).
  - Lint requires `ReadonlyArray<X<T>>` for a non-simple element type.
- **Bootstrap's own registry use.** Bootstrap's base component stores itself in its `Data` registry, so the instance registry is component infrastructure. Its data API wiring sits apart, at the bottom of each module. Three components consult their own kind's registry from inside: the collapse accordion's siblings (`collapse.js:122`), the tab's keyboard target (`tab.js:175`), and a tooltip's delegated children (`tooltip.js:362`). Only collapse's data API constructs with a config, `{ toggle: false }` (`collapse.js:287`). Every other `getOrCreateInstance(this, config)` call is the jQuery entry.
- **Fleet names.** Every published name is free in the hosted guides except router's `RouteInput`, `RouteHandler`, `RouteContext`, and `RouteRecord`. Routes are router's subject, so the engine's route types take the `Plugin` qualifier.

## Rulings

1. **The plugin.** A Bootstrap family is one value that carries its own name: `PluginInterface<T>`.
   - The name is an open `string`: the registry key and the `.bs.<name>` namespace.
   - The closed `BrowserPlugin` union, `EngineAdapter`, `EngineRoute`, `ENGINE_ROUTES`, and `Engine.install` go.
   - A plugin is authored as `PluginInput<T>` and built by `buildPlugin(input)`, a class-free helper in `helpers.ts` ("factory glue extracts to `helpers.ts`").
   - The binder turns each typed route handler into a stored route that does this, in order: resolves the hosts; applies the gate; prevents the default on a click where the route says so or the trigger is an `A` or `AREA`; skips a disabled trigger where the route says so; gets or creates the component through the registry, narrowed by the plugin's `is` guard; runs the handler with a `PluginInteraction<T>` that carries the plugin's typed `ComponentContext<T>`.
   - It binds `create` the same way: the stored `create(element, registry)` hands the authored `create` the plugin's context.
   - The stored form carries `T` only in return positions, so plugins of different components share one list soundly (measured).
2. **Plugin factories in `plugins.ts`, composed explicitly.** The user ruled that the wrapping lives apart from the classes, and the plugin-factory form is now in scaffold's rules (scaffold `65eb6f0eb`, carried by hand in veneer until the next scaffold release).
   - `plugins.ts` holds one factory per family: `createAlertPlugin`, `createButtonPlugin`, `createCarouselPlugin`, `createCollapsePlugin`, `createDropdownPlugin`, `createModalPlugin`, `createOffcanvasPlugin`, `createPopoverPlugin`, `createScrollspyPlugin`, `createTabPlugin`, `createToastPlugin`, and `createTooltipPlugin`.
   - The default collection is `createBootstrapPlugins()`, which returns the twelve in Bootstrap's bundle order: alert, button, carousel, collapse, dropdown, modal, offcanvas, popover, scrollspy, tab, toast, tooltip.
   - Each plugin factory builds the value from the entity class through its public interface and constructor. It registers, installs, and boots nothing.
   - The classes carry no plugin record, no static block, and no data API wiring.
   - `createEngine(root?, options?)` routes exactly `options.plugins`, which defaults to `createBootstrapPlugins()`.
   - When one list names a plugin twice, the later replaces the earlier in the earlier's position. `resolvePlugins(plugins)` in `helpers.ts` applies the rule, and `Engine` applies it, so `new Engine(root, plugins)` agrees with `createEngine`.
   - A repeated `createEngine` over a live root returns the live scope and ignores its options. To change a scope's plugins, destroy it and create it again.
   - A scope's listeners derive from its plugins' route and clear events, all in the capture phase on the document.
   - No global registration remains, and `createEngine` reaches every built-in it boots, which closes the tree-shaking defect.
   - **The naming, `create*Plugin` and not `register*`.** The user's `register*` offer is refused on the evidence:
     - These functions return a value and register nothing; registration happens when the list reaches `createEngine`. A `register*` name would claim a side effect the function lacks, and it would bring back the global-registration model the bundler measurement condemned.
     - `register` names a mutation on a registry, such as reason's `register(reasoner)` method.
     - The fleet's form for a host-composed value is the factory form in its own kind file, as the middleware factories are.
     - The enforced `Plugin` suffix makes each name say what it returns and keeps it distinct from the entity factory `createModal`.
3. **Routes, boot, and clearing belong to the plugin.**
   - `action` and `target` (literals that select an algorithm) become the `execute` and `hosts` functions.
   - `guard` becomes `disabled`. Its default is `true`, where the route serves a disabled trigger; `false` skips one. The rename is needed because "guard" names a type guard across the fleet.
   - `prevent` replaces the engine's plugin-name check, and `gate` stays.
   - Boot is not an event. A plugin's `boot` entry names the selector the boot pass scans under the root, nearest live scope only, plus an optional handler: offcanvas shows, and the others create.
   - The dropdown's outside-click and Tab-release closing is the plugin's `clear` entry. It runs in every live scope, with a context that resolves a component only where that scope is the element's nearest live scope.
   - Per event, the engine walks the scope's plugins in order. For each plugin it runs `clear` (when the event is one of its events) and then the plugin's routes for that event. That follows Bootstrap's module registration order.
   - The family proofs measure the order against the oracle. Where a transcript changes, the oracle wins.
4. **The registry and the component context.**
   - `Registry` implements `RegistryInterface` as a view over per-document storage in its static private map, so `new Registry(document)` from any caller reads the one document registry. Its methods:
     - `component(plugin, element)`, a typed lookup narrowed by the plugin's guard;
     - `context(plugin)`, which returns the plugin's `ComponentContext<T>`;
     - `settle(plugin, element, options, build)`. `settle` returns the registered component, or builds one through `build(context)`. Explicit options replace a component built from markup alone, and later calls return the configured one.
   - A component never sees a plugin or the registry. It receives `ComponentContext<T>`, its view of its own kind, which carries:
     - `component(element)` for a sibling of its kind;
     - `own(component)`, which throws `VeneerError` `REGISTRY_CONFLICT` when a different live component holds the plugin's name on that host;
     - `release(component)`.
   - Collapse's accordion siblings, the tab's keyboard target, and the tip's delegated children use the context exactly where Bootstrap consults its registry.
   - The scope's registry view returns contexts whose `own` records ownership by creator. A factory's settlement uses the plain registry, so the creator owns the component.
   - `Engine` implements `EngineInterface` alone. Its constructor never returns another instance, and it throws `VeneerError` `ENGINE_ROOT` over a root that already has a live scope. `Engine.resolve(root, plugins)` returns the live scope or creates one.
   - `Engine.registry`, `EngineScopeInterface`, and `EngineRegistryInterface` go.
5. **The tip renderer is a helper.** `TipRenderer`, `TipRendererOptions`, and `TipRendererInterface` go.
   - `renderTip(document, options: TipRenderOptions): HTMLElement | undefined` in `helpers.ts` keeps every behavior: it sanitizes template and HTML strings; it moves element content under HTML and reads it as text otherwise; it removes a falsy slot, as Bootstrap's `TemplateFactory` does; it returns a fresh detached root.
   - It takes the owner document as a parameter.
   - `content` maps selectors to `string | HTMLElement | undefined`; `null` leaves the type.
6. **Markup input parses once, in the constructor.**
   - `readInput(element, plugin)` goes: it coerces under a `read*` name and branches on a plugin name.
   - `parseInput(element)` and `parseTipInput(element)` take its place in `parsers.ts`. The tip variant reads no `data-bs-config` and strips `allowList`, `sanitize`, and `sanitizeFn`.
   - Each constructor resolves its options once, as in `resolveModalOptions(parseInput(element), options)`.
   - Factories pass the caller's typed options. A plugin's `create` passes the config Bootstrap's data API passes for that family: `{ toggle: false }` for collapse, and none for every other family.
   - `resolvePopper` becomes `parsePopper`; the unit names `resolveSerializable` for its kind.
7. **Errors.** `VeneerError`, `VeneerErrorCode`, and `isVeneerError` stay in core. `isVeneerError` narrows through contract's `isInstance`.
   - `context` becomes `Readonly<Record<string, unknown>> | undefined`, assigned only when given.
   - `ENGINE_DESTROY` carries `{ errors }`, collected through `attempt`.
   - The code union gains `ENGINE_ROOT` and `REGISTRY_CONFLICT`. No throw becomes a `Result`.
8. **Events and hooks.** The DOM event model stays.
   - The twelve `*Hooks` aliases go; options use `on?: ComponentHooks<ModalEventMap>`.
   - `WIRE_EVENTS` splits into one constant per family, typed `Readonly<Record<keyof XEventMap, string>>`: `ALERT_EVENTS`, `BUTTON_EVENTS`, `CAROUSEL_EVENTS`, `COLLAPSE_EVENTS`, `DROPDOWN_EVENTS`, `MODAL_EVENTS`, `OFFCANVAS_EVENTS`, `SCROLLSPY_EVENTS`, `TAB_EVENTS`, `TOAST_EVENTS`, and `TIP_EVENTS`, keyed by `TipProfile`.
   - `bindEventMap<TMap>` is typed by the map.
9. **The dropdown's data API moves to its plugin; the component gains `dismiss`.**
   - Bootstrap's keydown handler and its menu clearing are module-level data API code that drives the instance (`dropdown.js:364`, `dropdown.js:419`). In the engine they are the dropdown plugin's keydown route and its `clear` entry. They use `show`, `hide`, `visible`, `menu`, and `element`, plus the item-focus and predicate helpers.
   - The dismiss policy (`dismiss.inside`, `dismiss.outside`) is the component's own configuration. The interface gains `dismiss(event: Event): void`, which closes the open menu when the event falls where those options close it, and carries a click as the hide event's `clickEvent`.
   - Every other family's data API already uses public members only.
10. **The tips.** `Tooltip` and `Popover` only choose a profile, so they go. The user kept the deletion on 2026-10-02 and ruled that `Tip` is typed per profile, that the plugins and the engine never confuse the two profiles, and that both work together on one page, in one container, and on one host as Bootstrap's do.
    - Bootstrap's `Popover` subclasses `Tooltip` and changes only data: the defaults (click and right against hover, focus, and top; an 8 px against a 6 px offset), the template's header and body slots against one inner slot, the show condition (a title or a body against a title), and the name behind the event namespace, the auto class, and the id prefix (`node_modules/bootstrap/js/src/popover.js:20-71`, `node_modules/bootstrap/js/src/tooltip.js:67-78`).
    - `Tip<P extends TipProfile = TipProfile>` implements `TipInterface<P>`. `TipProfile = 'tooltip' | 'popover'` is a real discriminant: defaults, template, slots, wire names.
    - The constructor is `(element, context: ComponentContext<Tip<NoInfer<P>>>, options: TipProfileMap[NoInfer<P>]['options'], profile: P)`, so the profile argument alone fixes `P`. A tooltip refuses popover options, a tooltip context refuses the popover profile, and a tooltip refuses a body in `write`. A deleted probe measured each refusal at compile time, and the sound uses typechecked with exit 0 (2026-10-02).
    - `TipInterface<P>` carries `readonly profile: P` and `write(content: TipProfileMap[P]['content'])`. `TooltipInterface` extends `TipInterface<'tooltip'>`, and `PopoverInterface` extends `TipInterface<'popover'>`.
    - `createTooltipPlugin(): PluginInterface<Tip<'tooltip'>>` and `createPopoverPlugin(): PluginInterface<Tip<'popover'>>` guard with `isInstance(value, Tip)` and the profile, so a lookup under either name returns only its own profile.
    - `createTooltip` and `createPopover` settle against those plugins and return `TooltipInterface` and `PopoverInterface` with no assertion.
    - The engine carries no tip branch. The tooltip plugin declares no route, and the popover plugin's click route only creates its own profile.
    - The family proofs measure coexistence against the oracle: one page with both profiles, one container delegating both, one host carrying both in either creation order, a modal holding both, and the disposal of one while the other lives. Where a transcript differs, the oracle wins.
11. **The rest of the surface.**
    - `isDisabled` and `isVisible` become predicates on `HTMLElement` in `helpers.ts`, and `isTrigger` folds into the binder.
    - `BROWSER_DEFAULTS` splits into one constant per family, plus `TIP_DEFAULTS` keyed by profile.
    - `BackdropOptions.visible` becomes `enabled`.
    - Internal snapshots store `undefined` for an absent attribute and keep `null` only where Bootstrap's wire carries it.
    - Every published placement type gets member TSDoc.
12. **Contract throughout.** This ruling follows the analyst's table.
    - The DOM guards stay and use contract's primitives inside.
    - `isBrowserRecord` keeps its own-data-property invariant.
    - `parseDatum` keeps Bootstrap's `normalizeData` semantics, with contract's `parseJSON`, `attempt`, and `isString` inside.
    - `resolveScalar` keeps its strict match.
    - The partial Popper projection stays a projection.
    - The plugin guards use `isInstance`.
    - No local copy of a contract primitive remains.
13. **The barrel.** The construction test governs.
    - The component classes take `(element, context, options)`, and a consumer holds a context through `new Registry(document).context(plugin)`, so the classes stay barrelled.
    - `Engine` and `Registry` are barrelled, and every plugin factory is exported.
    - This amends design ruling 2's interning sentence.
    - `Tooltip`, `Popover`, and `TipRenderer` leave the barrel because they leave the package.
14. **The user's open rulings, ruled 2026-10-02.**
    - Stage B is a later chunk, built as same-named plugin replacements in a caller's list.
    - Tip auto-start stays: it is the `boot` entry of the tooltip and popover plugins, which the default collection carries, with the `tip-boot` departure row. A caller turns it off by composing a list without those plugins, or with replacements that declare no `boot`. The engine carries no branch for it.
    - The name `Engine` stays.

## Declarations

The implementation unit writes this contract first, in `src/browser/types.ts` and `src/core/types.ts`. The doc sentences are the unit's to write under `writing.md`.

```ts
import type { Guard } from '@orkestrel/contract'

/** Carries a component's view of its own kind in the document registry. */
export interface ComponentContext<T extends ComponentInterface> {
	component(element: HTMLElement): T | undefined
	own(component: T): void
	release(component: T): void
}

/** Carries a routed trigger, its native event, and the dispatching scope's registry to a stored route. */
export interface EngineInteraction {
	readonly trigger: HTMLElement
	readonly event?: Event
	readonly registry: RegistryInterface
}

/** Carries a routed trigger, its native event, and the plugin's context to a typed handler. */
export interface PluginInteraction<T extends ComponentInterface> {
	readonly trigger: HTMLElement
	readonly event?: Event
	readonly context: ComponentContext<T>
}

export interface PluginRouteInput<T extends ComponentInterface> {
	readonly event: string
	readonly selector: string
	readonly gate?: string
	readonly disabled?: boolean
	readonly prevent?: boolean
	readonly hosts?: (trigger: HTMLElement) => readonly HTMLElement[]
	readonly execute?: (component: T, interaction: PluginInteraction<T>) => void
}

export interface PluginBootInput<T extends ComponentInterface> {
	readonly selector: string
	readonly execute?: (component: T, interaction: PluginInteraction<T>) => void
}

export interface PluginClearInput<T extends ComponentInterface> {
	readonly events: readonly string[]
	readonly execute: (event: Event, context: ComponentContext<T>) => void
}

export interface PluginInput<T extends ComponentInterface> {
	readonly name: string
	readonly is: Guard<T>
	readonly create: (element: HTMLElement, context: ComponentContext<T>) => T
	readonly routes?: ReadonlyArray<PluginRouteInput<T>>
	readonly boot?: PluginBootInput<T>
	readonly clear?: PluginClearInput<T>
}

export interface PluginRouteInterface {
	readonly event: string
	readonly selector: string
	readonly execute: (interaction: EngineInteraction) => void
}

export interface PluginBootInterface {
	readonly selector: string
	readonly execute: (interaction: EngineInteraction) => void
}

export interface PluginClearInterface {
	readonly events: readonly string[]
	readonly execute: (event: Event, registry: RegistryInterface) => void
}

export interface PluginInterface<T extends ComponentInterface = ComponentInterface> {
	readonly name: string
	readonly is: Guard<T>
	readonly create: (element: HTMLElement, registry: RegistryInterface) => T
	readonly routes: readonly PluginRouteInterface[]
	readonly boot?: PluginBootInterface
	readonly clear?: PluginClearInterface
}

export interface RegistryInterface {
	component<T extends ComponentInterface>(plugin: PluginInterface<T>, element: HTMLElement): T | undefined
	context<T extends ComponentInterface>(plugin: PluginInterface<T>): ComponentContext<T>
	settle<T extends ComponentInterface>(
		plugin: PluginInterface<T>,
		element: HTMLElement,
		options: object,
		build: (context: ComponentContext<T>) => NoInfer<T>,
	): T
}

export interface EngineOptions {
	readonly plugins?: readonly PluginInterface[]
}

export interface TipRenderOptions {
	readonly template: string
	readonly content: Readonly<Record<string, string | HTMLElement | undefined>>
	readonly html?: boolean
	readonly class?: string
	readonly sanitize?: TipSanitizeOptions
}

export type TipProfile = 'tooltip' | 'popover'

export interface TipProfileMap {
	readonly tooltip: { readonly options: TooltipOptions; readonly content: TooltipContent }
	readonly popover: { readonly options: PopoverOptions; readonly content: PopoverContent }
}

// TipInterface becomes TipInterface<P extends TipProfile = TipProfile> and gains:
// readonly profile: P
// write(content: TipProfileMap[P]['content']): void
// TooltipInterface extends TipInterface<'tooltip'>; PopoverInterface extends TipInterface<'popover'>.

// DropdownInterface gains:
// dismiss(event: Event): void

// src/core/types.ts
export type VeneerErrorCode =
	| 'ENGINE_DESTROY'
	| 'ENGINE_ROOT'
	| 'REGISTRY_CONFLICT'
	| 'TIP_HIDDEN'
	| 'DROPDOWN_MENU'
```

The functions are these.

- **`factories.ts`.**
  - `createEngine(root?: Document | HTMLElement, options?: EngineOptions): EngineInterface`.
  - The twelve entity factories, each in the form `createModal(element, options) => new Registry(element.ownerDocument).settle(createModalPlugin(), element, options, (context) => new Modal(element, context, options))`.
- **`plugins.ts`.** The twelve `create{Entity}Plugin(): PluginInterface<X>` and `createBootstrapPlugins(): readonly PluginInterface[]`.
- **`helpers.ts`.** `buildPlugin`, `resolvePlugins`, `renderTip`, `resolveTargets`, the dismiss and dropdown-toggle host resolvers, and the item-focus helper.
- **`parsers.ts`.** `parseInput`, `parseTipInput`, `parseDatum`, and `parsePopper`.

## Not carried

- **The planner's names and handlers.** `RouteInterface`, `RouteEvent`, `Interaction`, and method-bivariant handlers are not carried: the names collide with router's subject or carry no qualifier, and the binder measured sound without bivariance.
- **The analyst's global install.** `Engine.install(family)`, registration after boot, and an `EngineComponentManagerInterface` on `EngineInterface` are not carried. Per-scope composition needs no global state and fixes the tree-shaking defect, and a public manager on the scope widens the API with no consumer.
- **Static `plugin` records on the classes.** Not carried, by the user's ruling: a class stays unaware of its wrapping, and the dropdown's data API moves to its plugin through `dismiss` and public members.
- **`register*` as the plugin-factory prefix.** Not carried, for the reasons in ruling 2.
- **Interning the component classes.** Not carried: the construction test keeps them public.
- **A `placement` module split.** Not carried: no rule requires it.

## Units

1. **`browser-convention` (GPT-6 Astra).** It runs in the worktree `veneer-wt-browser-convention`, rebased onto veneer `main` at `0738ccf`, carrying the first two runs' work uncommitted. It implements rulings 1 to 13 in one tree: types first, the oracle proofs as the measure, the consumer migration, guide parity, and the roadmap counts.
   - The first run stopped on ruling 6's unmeasured premise, since corrected.
   - The second run was stopped by the Orchestrator when the user moved the plugin wrapping to `plugins.ts`.
   - The third run (brief veneer `tmp/codex/browser-convention-3-brief.md`) stopped on the application's unbound `destroy` callback, which the class rewrite makes false. The Orchestrator ruled the consumer change: the application holds the engine and passes an arrow.
   - The fourth run (brief veneer `tmp/codex/browser-convention-4-brief.md`) finishes the third, applies ruling 10's typed profile and profile guards, and runs the full ladder.
2. **`browser-tips` (GPT-6 Astra).** It runs on veneer `main` after the pick of the first unit and proves ruling 10's coexistence against the oracle. Its scenarios come from a map of Bootstrap's tooltip and popover sources that the Orchestrator verifies before the brief prescribes any of them. Brief: veneer `tmp/codex/browser-tips-brief.md`.
3. **One `orkestrel-falsify` round.**
   - The reviewer runs on Claude Opus 5.5, for the Astra-written mechanism and for scaffold's plugin kind.
   - The analyst runs on GPT-6 Astra, for the contract this verdict wrote.
4. **The tree-wide gates.** After them, this verdict and the audit verdict close.
