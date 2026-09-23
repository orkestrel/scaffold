# J-ENGINE-SHAPE — the subjective lane's proposal (returned 2026-09-23 by planner on Opus 5.5, native subagent, 41 tool uses, 808 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

**Lane: subjective** (`planner` on Opus 5.5): shape, naming, ergonomics, and the feel of the API a consumer reads. Question 2 is recorded as the user ruled it. I worked from the brief and the coordinator's later message and saw no answer from the other lane.

## Question 1: the override shape

**Proposal.** Each entity takes up to one option group per kind of name, and adds a group only where it has members of that kind:
- `classes`: every class token the entity writes, removes, or tests. The defaults are Bootstrap's `CLASS_NAME_*` tokens, which are also the tokens the styles select on.
- `attributes`: every Bootstrap-owned attribute name the entity reads or writes. That covers the option attributes, `data-bs-target`, and the attributes the styles select on (`data-bs-popper`, `data-popper-placement`, `data-bs-theme`).
- `selectors`: every composite selector the entity matches with. The defaults are Bootstrap's `SELECTOR_*` strings verbatim.

Four rules keep the table short and checkable:
- **Derived selectors are not members.** A selector built only from the entity's own tokens (Bootstrap's `SELECTOR_ACTIVES`, `SELECTOR_DATA_TOGGLE_SHOWN`) is derived with `:is()` and `CSS.escape`. The Chromium-only floor makes `:is()` safe. It is never a member.
- **Platform names are not members.** ARIA attributes, `role`, `tabindex`, `inert`, `popover`, and `href` belong to the platform and cannot be replaced.
- **Keys name the fact or the option.** A class key names the fact its token marks. Where the interface has a getter for that fact, they share the word: `shown` with `shown`, and Button's `pressed: 'active'` with its `pressed` getter. An attribute key names the option leaf it feeds (`static: 'data-bs-display'`) or the fact it carries (`side: 'data-popper-placement'`).
- **Constructor only.** The groups cannot be read from markup, because they name the markup.

`DelegateOptions` takes one group per routed entity, keyed by the entity noun. It routes by those entities' resolved `selectors`, so the delegate has no routing table of its own. The object a consumer passes to the delegate is the app-wide vocabulary, and a manual construction spreads the same group.

```ts
/** Names the class tokens a collapse writes and tests; each default is the token the cascade selects on. */
export interface CollapseClassMap {
	/** Marks the panel. Default: `collapse`. */
	readonly host: string
	/** Marks a shown panel. Default: `show`. */
	readonly shown: string
	/** Marks a panel while its size transitions. Default: `collapsing`. */
	readonly transition: string
	/** Marks a panel that transitions its width. Default: `collapse-horizontal`. */
	readonly horizontal: string
	/** Marks a trigger whose panel is hidden. Default: `collapsed`. */
	readonly collapsed: string
}
/** Names the attributes a collapse reads; each default is Bootstrap's data attribute. */
export interface CollapseAttributeMap {
	/** Names the trigger attribute that selects its panel, read before `href`. Default: `data-bs-target`. */
	readonly target: string
	/** Names the panel attribute the `parent` option reads. Default: `data-bs-parent`. */
	readonly parent: string
}
/** Names the selectors a collapse matches with; each default is Bootstrap's data-API selector. */
export interface CollapseSelectorMap {
	/** Selects the triggers that toggle a panel. Default: `[data-bs-toggle="collapse"]`. */
	readonly trigger: string
}
export interface CollapseOptions {
	readonly parent?: HTMLElement
	/** Replaces class tokens, read from the constructor alone; an absent key keeps its default. */
	readonly classes?: Partial<CollapseClassMap>
	/** Replaces attribute names, read from the constructor alone; an absent key keeps its default. */
	readonly attributes?: Partial<CollapseAttributeMap>
	/** Replaces selectors, read from the constructor alone; an absent key keeps its default. */
	readonly selectors?: Partial<CollapseSelectorMap>
	readonly on?: CollapseHooks
	readonly signal?: AbortSignal
}
export interface ButtonClassMap {
	/** Marks a pressed button. Default: `active`. */
	readonly pressed: string
}
export interface ButtonSelectorMap {
	/** Selects the buttons a click toggles. Default: `[data-bs-toggle="button"]`. */
	readonly trigger: string
}
export interface DelegateOptions {
	readonly root?: ParentNode
	/** Carries the vocabulary each button engine the delegate constructs receives and routes by. */
	readonly button?: Pick<ButtonOptions, 'classes' | 'selectors'>
	readonly collapse?: Pick<CollapseOptions, 'classes' | 'attributes' | 'selectors'>
	// dropdown, tab, modal, offcanvas, alert, toast, carousel, scrollspy follow the same form
}
// constants.ts (R13): frozen default tables, one per kind per entity
export const COLLAPSE_CLASSES: CollapseClassMap = Object.freeze({
	host: 'collapse',
	shown: 'show',
	transition: 'collapsing',
	horizontal: 'collapse-horizontal',
	collapsed: 'collapsed',
})
// consumer
const vocabulary = { collapse: { classes: { shown: 'is-open' } } } satisfies DelegateOptions
new Delegate({ ...vocabulary, root: document })
new Collapse(panel, { ...vocabulary.collapse, parent: accordion })
```

**Proposed keys for the other entities.** Each default is taken verbatim from the Bootstrap line cited. The objective lane checks each one.

| Entity | `classes` | `attributes` | `selectors` |
| --- | --- | --- | --- |
| Button (`button.js:21-22`) | `pressed` | — | `trigger` |
| ColorMode (`constants.ts:2`) | — | `theme` | — |
| Dropdown (`dropdown.js:48-60`) | `shown`, `up`, `end`, `start`, `center: { down, up }` | `dismiss` (`data-bs-auto-close`), `offset`, `static` (`data-bs-display`), `reference`, `popper`, `side` | `trigger`, `menu`, `item`, `navbar`, `nav` |
| Tab (`tab.js:36-51`) | `active`, `shown`, `fade` | `target` | `trigger` (the three-value list), `list`, `item`, `link`, `toggle`, `menu`, `dropdown` |
| ScrollSpy (`scrollspy.js:28-39`) | `active`, `item` | `target`, `margin`, `threshold`, `smooth` | `host` (`[data-bs-spy="scroll"]`), `link`, `list`, `item`, `dropdown`, `toggle` |
| Modal (`modal.js:40-48`) | `shown`, `fade`, `open`, `static`, `backdrop` | `target`, `backdrop`, `escape` (`data-bs-keyboard`), `focus` | `trigger`, `dismiss`, `dialog`, `body` |
| Offcanvas (`offcanvas.js:32-47`) | `shown`, `showing`, `hiding`, `backdrop` | `target`, `backdrop`, `escape`, `scroll` | `trigger`, `dismiss`, `host` (`.offcanvas`) |
| Alert (`alert.js:23-24`) | `shown`, `fade` | `target` | `dismiss`, `host` (`.alert`) |
| Toast (`toast.js:30-33`) | `shown`, `showing`, `fade` | `animated`, `autohide`, `delay` | `dismiss` |
| Carousel (`carousel.js:49-63`) | `active`, `slide`, `start`, `end`, `next`, `previous` | `slide`, `to`, `ride`, `interval`, `keyboard`, `pause`, `touch`, `wrap` | `host` (`[data-bs-ride="carousel"]`), `control`, `item`, `image`, `indicators` |
| Tooltip (`tooltip.js:25-30`, `:313`) | `shown`, `fade`, `auto` (`bs-tooltip-auto`) | `animated`, `delay`, `trigger`, `title`, `html`, `template`, `class`, `container`, `position`, `offset`, `fallbacks`, `selector`, `side` | `title` (`.tooltip-inner`), `modal` |
| Popover (`popover.js:17-18`) | the Tooltip keys, with `auto` defaulting to `bs-popover-auto` | the Tooltip keys plus `content` | `title` (`.popover-header`), `content` (`.popover-body`), `modal` |
| Backdrop, ScrollLock, Swipe | Backdrop `host`, `shown`, `fade`; Swipe `pointer` | — | ScrollLock `fixed`, `sticky` |

**How the parts connect.**
- **Readers.** `parse{Entity}Attributes` takes the resolved attribute table as its parameter and reads `host.getAttribute(attributes.parent)`. A renamed attribute reaches it with no parser change.
- **Renamed routes.** When a consumer renames `data-bs-toggle`, the delegate routes by the replaced selector alone. The default is not an alias (E6).
- **Validation.** Construction checks each replacing value with `isClassToken`, `isAttributeName`, or `isSelector`, total guards in `validators.ts`. A refused value throws `{ENTITY}_OPTION_INVALID`.
- **Replacing `BackdropOptions.class`.** `BackdropOptions.classes` replaces it (`types.ts:216`). Modal passes its own `classes.backdrop` in as Backdrop's `host`.
- **Where parity binds.** The default tables in `constants.ts` must equal the cascade's tokens, because the styles are the parity (E9). The options accept any well-formed value. An override is outside the compatibility claim, and the consumer's stylesheet must then select on the replacing tokens.

**Evidence.**
- E9 (`decisions.md:41`).
- The seed's single-parameter precedent: `BUTTON_SELECTOR` at `constants.ts:11`, read at `Delegate.ts:59`, and `BUTTON_ACTIVE` read at `Button.ts:65`, `:70`.
- Group by noun: `names.md:40-49`. Two-level option groups: `patterns.md:22-28`.
- Prior art: Mailbox and Elements keep their vocabulary as fixed constants split by kind, such as `FADE_CLASS` and `DROPDOWN_ITEM_SELECTOR` (`mailbox/src/browser/constants.ts:32`, `:99`, `:116`) and `TAB_TRIGGER_SELECTOR` (`elements/src/browser/constants.ts:163`). This proposal keeps their kind split and adds a per-entity override on top.

**Alternatives refused.**
- **One shared vocabulary object passed to every class.** Button's options would then name Tooltip's slots, which breaks "Keep interfaces to the smallest primitives" (`architecture.md` § System constraints). The `DelegateOptions` object already acts as the shared object, with no new type.
- **A package-level default set once.** It is module-level mutable state, which breaks R1's side-effect-free import. Two embeddings on one page would overwrite each other.
- **One `prefix` for every data attribute.** It is refused as speculative (§ System constraints: build with the first consumer). It also cannot express `target: 'aria-controls'`.

**Amended rulings:** R1, R5, R11, R13, and a new R19 (see question 5).

## Question 2: wire event names (ruled by the user)

**Ruling.** Every wire event takes the form `{verb}.vn.{entity}`, such as `show.vn.collapse`. A page carrying Bootstrap's scripts beside this engine never crosses events.

**What `.vn.` changes in the contracts.**
- **Event-map doc blocks.** Each `{Entity}EventMap` interface doc becomes "Maps each collapse event to the verb that names it." Each member becomes "Names the `show.vn.collapse` event, whose prevention refuses the show." This replaces "Mirrors the `show.bs.collapse` event", for example at `types.ts:467-476`.
- **`EventWire` takes the entity, so a table cannot drift:**

```ts
/** Maps each event of an entity's event map to the wire name its bubbling DOM event carries. */
export type EventWire<TMap, TEntity extends string> = {
	readonly [TKey in keyof TMap]: `${TKey & string}.vn.${TEntity}`
}
export const COLLAPSE_EVENTS: EventWire<CollapseEventMap, 'collapse'> = Object.freeze({
	show: 'show.vn.collapse',
	shown: 'shown.vn.collapse',
	hide: 'hide.vn.collapse',
	hidden: 'hidden.vn.collapse',
})
export const BUTTON_EVENTS: EventWire<ButtonEventMap, 'button'> = Object.freeze({ toggle: 'toggle.vn.button' })
```

  A table that names `.bs.` or the wrong entity then fails to compile. Today's template allows either (`types.ts:98`). Mailbox and Elements publish the same per-verb table form (`mailbox/src/browser/constants.ts:126-238`).

- **Event shape.** The own-property mirroring of detail fields (R2) loses its only consumer, Bootstrap listener code, so remove it. Pre-change events stay cancelable. Completed events become non-cancelable, so Button's `toggle` event is no longer a special case.
- **Event map keys.** The keys are unchanged, with one exception I recommend: `hidePrevented` (`types.ts:790`, `:885`) breaks the one-word event rule (`names.md:31`) once the Bootstrap-mirror reason is gone. I recommend renaming it `prevent`, the name Mailbox and Elements emit for the same refusal (distillate, lines 94-96).
- **Detail fields.** `DropdownDetail.clickEvent` becomes `click` (`types.ts:545`). `relatedTarget` stays as the DOM's own name. I propose dropping `DropdownDetail.relatedTarget` because it repeats `event.target`: the toggle is the host (`types.ts:543`, `:590`). The objective lane must confirm which element dispatches.

**Amended rulings:** R2, R3, R15 (the identity row and the paired-events row).

## Question 3: the sanitizer port

**Proposal.** One port with one method that writes into an element.

The native `setHTML` path is an element write. A port that returned a string would force a sanitize-into-detached, serialize, reparse round trip. That costs a second parse and is the classic mutation-XSS shape. A string-based `@orkestrel/html` adapter does its one extra parse inside its own `write`, and the native path pays nothing.

```ts
/** Writes markup into an element through a sanitizing policy the engine does not own. */
export interface SanitizerInterface {
	/**
	 * Replaces the element's children with the markup the sanitizer keeps.
	 *
	 * @param element - The element to fill.
	 * @param html - The markup to sanitize and write.
	 * @example
	 * ```ts
	 * sanitizer.write(slot, '<b>Saved</b>')
	 * ```
	 */
	write(element: Element, html: string): void
}
export interface TooltipOptions {
	// replaces `sanitize?: SanitizeOptions` (types.ts:1013-1014)
	/** Writes markup content and the template through this sanitizer, read from the constructor alone. Default: the platform's `setHTML` over Bootstrap's allowlist. */
	readonly sanitizer?: SanitizerInterface
}
// J-TOOLTIP: src/browser/sanitizers/NativeSanitizer.ts (architecture.md § Extension categories)
export class NativeSanitizer implements SanitizerInterface {
	readonly #config: SanitizerConfig
	constructor(config: SanitizerConfig = SANITIZER_ALLOWLIST) {
		this.#config = config
	}
	write(element: Element, html: string): void {
		/* narrows through isSanitizeTarget, then element.setHTML(html, { sanitizer: this.#config }) */
	}
}
```

**What lands now and what lands later.**
- **J-TYPES round 5 lands now:**
  - `SanitizerInterface`.
  - `TooltipOptions.sanitizer`.
  - Deletes `SanitizeOptions` and `SanitizeAllowlist` (`types.ts:377-394`).
  - Keeps `SanitizerConfig`, `SanitizerElementNamespaceWithAttributes`, `SetHTMLOptions`, and `SanitizeTargetInterface` (`types.ts:396-461`), which are the adapter's inputs.

  The option's doc must not name `NativeSanitizer` until that class exists, or guide parity reddens.
- **J-TOOLTIP lands later:** the `NativeSanitizer` class, `SANITIZER_ALLOWLIST` (a `SanitizerConfig`), and `isSanitizeTarget`, alongside its first consumer.

**Why the default config must be explicit.** The probes show the platform's own defaults cannot stand in for it:
- With no options, the platform keeps only `title` (`j-types-4-probe-sanitizer-4.log.txt:2`).
- An empty dictionary keeps `href`, `data-*`, `class`, `id`, and `aria-*` (same line).
- `dataAttributes` is refused unless `attributes` is present (`j-types-3-probe-sanitizer-3.log.txt:2`).

**Proposed change to the ARIA handling.** List every WAI-ARIA attribute by name in `SANITIZER_ALLOWLIST`, rather than scanning each input for `aria-*` names. The config then becomes a constant, and `buildSanitizer` goes.

**Departures from Bootstrap.**
- Bootstrap's `sanitize: false` has no Veneer equivalent. A consumer who wants unsanitized content supplies its own `SanitizerInterface` that calls `setHTMLUnsafe`. Veneer ships no unsafe writer, because that choice is product policy.
- `sanitizeFn` becomes the port itself.
- Record both in the guide's `### Content` subsection and in the `engine` accessibility row.

**Plugging in `@orkestrel/html` later.** Any object with `write(element, html)` fits the port structurally. `@orkestrel/html`'s future adapter can be passed directly with no Veneer shim. If that package later publishes an identical port, Veneer deletes its own and imports it (`names.md` § Fleet name ownership, rule 1).

**Amended rulings:** R10, R14's `html` ground, and exit criterion 3.

## Question 4: options that survive only because Bootstrap had them

The default answer is keep. These are the rulings that change something:

1. **`CollapseOptions.toggle`: remove** (`types.ts:485-486`). Construction flipping the panel goes against R1's explicit construction, and the `toggle()` method already does the job. The delegate constructs and then calls `toggle()`.
2. **`data-bs-config` JSON: remove from R11.** It is a second channel for one option set ("One concept, one term"). The per-option attributes stay.
3. **`TooltipOptions.animation` and `ToastOptions.animation`: rename to `animated`** (`types.ts:974`, `:1298`). The name then matches `BackdropOptions.animated` (`types.ts:219-220`) and reads as an assertion (`names.md:115`).
4. **`TooltipOptions.sanitize`: replace with `sanitizer`** (question 3).
5. **ScrollSpy's `data-bs-offset` conversion: remove from R11.** Bootstrap marks it deprecated (`scrollspy.js:42`, `:50`, `:117-118`), and E6 refuses it.
6. **Toast's `hide` class and Tooltip's `data-bs-original-title` attribute: never write them.**
   - Bootstrap keeps both only for backward compatibility (`toast.js:31`, `:95`, `:114`; `tooltip.js:497`, "DO NOT USE IT").
   - The styles never select `hide` (`bootstrap/scss/_toasts.scss:31`, `:35`).
   - `Snapshot` restores `title` instead.
7. **Popper's `boundary` and `popperConfig`: stop accepting them.** R9 accepts and ignores both, which is a compatibility shim under E6. The guide lists them as excluded.

Kept, with the reason:
- `TipContent` stays: string or element are the DOM's two forms of content, and the function form serves `selector`.
- `delay`, `trigger`, `dismiss`, `placement`, `container`, and `ride` stay: each is already reshaped.
- `autohide`, `html`, `selector`, and `pause` stay.

**Amended rulings:** R9, R11.

## Question 5: verdict edits

- **R1.** Replace the title and the first sentence with: "**R1 The styles are Bootstrap's; the engine is Veneer's.** The cascade's class tokens and the attributes it selects on are the parity, and the engine's default vocabulary equals them. Every class token, attribute name, and selector the engine reads or writes is a default a consumer replaces per entity (R19). Wire event names, option paths, members, and event details follow Veneer's naming law." The rest of R1 stands.
- **R2.** Replace with: "**R2 Wire events.** Each entity dispatches `{verb}.vn.{entity}` (`show.vn.collapse`, `slid.vn.carousel`, `toggle.vn.button`), bubbling, on its host, so a page running Bootstrap's scripts beside the engine never crosses events (the user, 2026-09-23). A pre-change event (`show`, `hide`, `close`, `slide`) is cancelable, and `preventDefault()` refuses the change. A completed event is not cancelable. The detail travels in `detail` alone, with no mirrored own property. A handler's return value refuses nothing. `emitEvent` takes the cancelable flag and returns `!defaultPrevented`."
- **R3.** Replace with: "**R3 Event-map keys are the entity's verbs.** `{Entity}EventMap` keys are `show`, `shown`, `hide`, `hidden`, `prevent`, `inserted`, `close`, `closed`, `slide`, `slid`, `activate`, and `toggle`, and each key's TSDoc names the wire event it carries. The frozen `{ENTITY}_EVENTS` table is typed `EventWire<{Entity}EventMap, '{entity}'>` (`COLLAPSE_EVENTS.shown === 'shown.vn.collapse'`), so a table naming another suffix or entity fails to compile. The analyst's translated vocabulary stays refused on its original ground."
- **R5.** Replace its first sentence with: "`Delegate` routes by the `selectors` of the entities it serves, resolved from its per-entity groups (`DelegateOptions.collapse` and the rest) over each entity's default table. It constructs each engine with that entity's group and drives one a consumer constructed through `find`. A delegate routes by one name per route: a replaced default is not an alias and routes nothing. An event drives at most one delegate: the first delegate its propagation reaches that routes it records it, and every other delegate skips it." The release sentences stand.
- **R9.** Replace its last sentence with: "`boundary` and `popperConfig` are neither options nor attributes, and the guide records both as excluded. `data-bs-popper` and `data-popper-placement` are written through the owning entity's `attributes.popper` and `attributes.side`."
- **R10.** Replace with question 3's ruling. The sentence: "`html: false` writes `textContent`. `html: true` writes string content and the template through `TooltipOptions.sanitizer`, a `SanitizerInterface` whose `write(element, html)` replaces the element's children. Its absence means a `NativeSanitizer` over `SANITIZER_ALLOWLIST`, which calls `setHTML` with a `SanitizerConfig` built from Bootstrap's `DefaultAllowlist` (`util/sanitizer.js:11-46`). That config keeps the listed elements with their per-element attributes; `class`, `dir`, `id`, `lang`, and `role` on every element; every WAI-ARIA attribute by name; and `dataAttributes: false`. `sanitize: false` and `sanitizeFn` have no option: a consumer supplies its own `SanitizerInterface`, and the guide records the departure." The template, slot, `destroy`, and `tip.class` clauses stand.
- **R11.** Replace the merge sentence with: "Each class merges `{ENTITY}_DEFAULTS`, then the attributes its resolved `attributes` table names (`parse{Entity}Attributes` takes that table as a parameter), then the constructor object. No `data-bs-config` is read." Replace the Tooltip clause with: "the vocabulary groups and `sanitizer` are read from the constructor alone." In the option-path list:
  - strike `toggle` and `animation`;
  - add `animated`;
  - replace `sanitize: { enabled, allow, filter }` with `sanitizer`;
  - strike "with `data-bs-offset` converted by Bootstrap's formula".
- **R12.** In the `profile` parenthesis, replace "slots" with "the class, attribute, and selector tables". Slot selectors become `selectors.title` and `selectors.content`.
- **R13.** Add to the `constants.ts` list: "the `{ENTITY}_CLASSES`, `{ENTITY}_ATTRIBUTES`, and `{ENTITY}_SELECTORS` default tables, `SANITIZER_ALLOWLIST`". Add to `validators.ts`: `isClassToken`, `isAttributeName`, `isSelector`, `isSanitizeTarget`. Add: "`NativeSanitizer` sits in `src/browser/sanitizers/` under `architecture.md` § Extension categories, the one category folder."
- **R14.** Replace the `html` clause with: "`html` is not a dependency: its `sanitize` cannot express Bootstrap's allowlist (E7 addendum), and it enters later, if at all, as a `SanitizerInterface` after its own campaign, with no engine change."
- **R15.** Make these row changes:
  - identity row: "the `.vn.` suffix replaces `EVENT_KEY`";
  - `Manipulator.getDataAttributes` row: "through the entity's attribute table; no `data-bs-config`";
  - move "the sanitizer allowlist and `sanitizeFn`" to "carried with a recorded departure (the port)";
  - paired-events row: "completed events non-cancelable; no mirrored properties".
- **R17.** Add: "Each entity's proof adds one vocabulary case: with every group replaced, the entity writes and matches only the replacing values, which the mutation 'the group is ignored' reddens. `Delegate` routes by a replaced selector and not by the default."
- **R18.** Add a `### Vocabulary` subsection. Each `####` component lists its default tables beside the data-attribute table.
- **R19 (new).** "**R19 Markup vocabulary.** Each entity's `classes`, `attributes`, and `selectors` groups and their default tables follow question 1's rules for kinds, keys, derivation, validation, and the parity boundary."
- **Units table.** Make these changes:
  - J-TOOLTIP owns `sanitizers/NativeSanitizer.ts`, `SANITIZER_ALLOWLIST`, and `isSanitizeTarget`, and `buildSanitizer` and `SANITIZE_ALLOWLIST` are struck.
  - Add a J-BINDER successor on `opus` (Opus 5.5). It turns Button's and ColorMode's constants into the default tables and `BUTTON_TOGGLE` into `BUTTON_EVENTS`. It threads each resolved table through the one parameter J-BINDER already reads and adds the delegate groups and the routed-once rule. It deletes the `data-bs-config` branch, the own-property mirroring, and their proofs.
- **Exit criteria.** Criterion 3 reads "the sanitizer port and its native adapter". Criterion 2 adds R19.

## Unknowns answered

- **Can an override break the styles' parity proofs?** No. The override is a runtime concern only. `tests/src/styles/**` and `tests/conformance.test.ts` test the cascade and construct no engine. Each component's proofs prove the defaults, because they run on the shipped cascade and read the paint each token drives. The override needs one mechanism proof per entity (R17) and no parity proof. The `plugin` rows describe default markup only.
- **Can `Delegate` route both the default and an overridden name in one document?** A delegate routes by one name per route. Two vocabularies need two delegates. Ambiguity cannot occur, because a `static` `WeakSet<Event>` records each routed event and every later delegate skips it. On nested roots the innermost delegate routes first. On one root, the delegate constructed first routes first.
- **Does `.vn.` change `ButtonEventMap` and `BUTTON_TOGGLE`?** `ButtonEventMap` is unchanged, and the value `toggle.vn.button` is unchanged. The single constant becomes the `BUTTON_EVENTS` table typed `EventWire<ButtonEventMap, 'button'>`, which is an E6 rename for the J-BINDER successor. The Button proof that the event is non-cancelable stays true.

## Risks

- **A token in the wrong kind** makes an override half-apply, for example a written class filed under `selectors`. The objective lane must check each key against Bootstrap's `CLASS_NAME_*` and `SELECTOR_*` lines before J-TYPES round 5.
- **J-TYPES round 5 grows large.** Every map interface needs a § Surface row and a doc block. Settle the size by drafting it, and split the round by entity group if it passes one review sitting.
- **The static WAI-ARIA list drops non-standard `aria-*` names** that Bootstrap's pattern keeps. That needs an Orchestrator probe of a non-standard name through the adapter, plus a guide departure sentence.
- **Future name collisions.** `SanitizerInterface` and `NativeSanitizer` can collide with a future `@orkestrel/html` port. The `names.md` § Fleet name ownership rules would then force a reuse or a rename under E6.
- **Renaming `hidePrevented` to `prevent`** rests on my reading of the naming law. The user can rule to keep the Bootstrap word.
- **Units already in flight.** J-BINDER is building the `data-bs-config` merge and the own-property mirroring, and both go under these amendments. The untracked `j-collapse-brief.md` assumes the Collapse `toggle` option and `.bs.` names. Each needs the decision sent before it lands, or a successor brief.
- **Markup copied from Bootstrap's docs** that uses `data-bs-config` JSON stops configuring. The guide's departure sentence is the mitigation.

## Files read

- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-shape-brief.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-guides-distillate.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-distillate.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-3-probe-sanitizer.log.txt, j-types-3-probe-sanitizer-2.log.txt, j-types-3-probe-sanitizer-3.log.txt, j-types-4-probe-sanitizer-4.log.txt
- C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md, .agents/orchestration.md, .claude/rules/names.md, patterns.md, architecture.md, documentation.md, writing.md
- C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts, constants.ts, Button.ts, Delegate.ts
- C:/Users/mikes/WebstormProjects/veneer-types/src/styles/components/_collapse.scss, _dropdown.scss, _nav.scss, _alert.scss
- C:/Users/mikes/WebstormProjects/veneer-types/guides/veneer.md (§ Compatibility, around lines 4680-4730)
- C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/collapse.js, alert.js, button.js, dropdown.js, tab.js, modal.js, offcanvas.js, tooltip.js, popover.js, toast.js, carousel.js, scrollspy.js
- C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/scss/_toasts.scss
- C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/html/dist/src/core/index.d.ts
- C:/Users/mikes/WebstormProjects/mailbox/src/browser/constants.ts
- C:/Users/mikes/WebstormProjects/elements/src/browser/constants.ts, types.ts
