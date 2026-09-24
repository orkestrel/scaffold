# J-TOOLTIP terrain — the Grok distillate (retained 2026-09-24)

Lane: `grok` on Cursor Grok (`grok-4.7-high`, print mode, `--mode=ask`), working directory `C:/Users/mikes/WebstormProjects`. Brief: `j-tooltip-terrain-brief.md` beside this file (the launch copy sat at `tmp/cursor/j-tooltip-terrain-brief.md`). Journal: `tmp/cursor/j-tooltip-terrain.jsonl` (swept at acceptance). Session id: `857941b3-ba57-4a98-80c5-0b665e32b5c2`. Duration: 298831 ms.

I'll read the brief and follow it exactly.The brief is a read-only terrain pass. I'll read Bootstrap's tooltip and popover, Veneer's contracts, and the landed engine, then return the specified shape.Question: What must the Tooltip engine (and the Popover engine that extends it) do to satisfy Veneer's declared contracts and Bootstrap 5.3.8's behaviour, and which landed Veneer mechanisms already carry each part?

Evidence:

1. Obligation matrix. Bootstrap source, the contract member that names it, and the landed carrier (`Placement`, `HostSnapshot`, `emitEvent`, `settleAnimations`, `matchesReducedMotion`, or `none`).

| Behaviour | Bootstrap | Contract | Carrier |
| --- | --- | --- | --- |
| Construction and defaults | `tooltip.js:58` `const Default` (`animation: true`, `boundary: 'clippingParents'`, `container: false`, `delay: 0`, `fallbackPlacements: ['top','right','bottom','left']`, `html: false`, `offset: [0, 6]`, `placement: 'top'`, `sanitize: true`, `template` tooltip markup, `title: ''`, `trigger: 'hover focus'`); constructor `tooltip.js:106` requires Popper, sets `_isEnabled = true`, calls `_setListeners`, and `_fixTitle` when `selector` is absent (`tooltip.js:127`) | `TooltipOptions` `types.ts:1558` | `none` |
| `trigger` into hover, focus, click, manual | `tooltip.js:445` `this._config.trigger.split(' ')`; click toggles (`tooltip.js:448`), hover/focus enter and leave (`tooltip.js:455`), `manual` binds nothing (`tooltip.js:454`) | `TooltipOptions.trigger` `types.ts:1568` (`hover`/`focus` default true, `click` default false, all three `false` is `manual`) | `none` |
| `show` / `hide`, events, `fade` | `show` throws when inline `display` is `none` (`tooltip.js:185`), returns unless content and enabled (`tooltip.js:189`), fires cancelable `show` (`tooltip.js:193`), bails if prevented or not in the document (`tooltip.js:197`), disposes the popper (`tooltip.js:202`), sets `aria-describedby` (`tooltip.js:206`), appends and fires `inserted` (`tooltip.js:212`), adds `show` (`tooltip.js:217`), then `_queueCallback` fires `shown` (`tooltip.js:229`). `hide` returns unless shown (`tooltip.js:243`), fires cancelable `hide` (`tooltip.js:247`), removes `show` (`tooltip.js:253`), clears triggers (`tooltip.js:263`), then on completion removes the tip, removes `aria-describedby`, and fires `hidden` (`tooltip.js:268`). `fade` is added in `_createTipElement` when animated (`tooltip.js:319`); `_queueCallback` is `executeAfterTransition` (`base-component.js:49`, `util/index.js:229`, cancelable events at `event-handler.js:282`) | `show` `types.ts:1623`, `hide` `types.ts:1636`, `TooltipEventMap` `types.ts:1493` (`show`/`hide` preventable; `shown`/`hidden`/`inserted` "not cancelable"), `TooltipClassMap.fade` `types.ts:1514`, `shown` `types.ts:1512` | events `emitEvent` (`helpers.ts:21`); fade wait `settleAnimations` (`helpers.ts:85`, sequenced in `Modal.ts:272` as add `shown`, then if `fade` await). `matchesReducedMotion` (`helpers.ts:392`) is not on this path |
| `toggle` | `tooltip.js:158` returns if disabled; shown calls `_leave`, else `_enter` | `toggle` `types.ts:1646` | `none` |
| `enable` | `tooltip.js:146` `_isEnabled = true` | `enable` `types.ts:1656` | `none` |
| `disable` | `tooltip.js:150` `_isEnabled = false` | `disable` `types.ts:1665` | `none` |
| `toggleEnabled` | `tooltip.js:154` flips `_isEnabled` | `unnamed` (`enabled` `types.ts:1622` only reads) | `none` |
| `update` | `tooltip.js:284` `this._popper.update()` | `update` `types.ts:1685` | `Placement` (`Placement.ts:179` writes `attributes.side`; `Dropdown.ts:238` forwards) |
| `setContent` | `tooltip.js:326` stores content and, if shown, disposes the popper and calls `show` | `fill` `types.ts:1674` | `none` |
| Title from `title` and `data-bs-original-title` | `tooltip.js:356` function of `config.title`, else `getAttribute('data-bs-original-title')` | `TooltipOptions.title` `types.ts:1577` names `title`; `data-bs-original-title` `unnamed` | `none` |
| `aria-describedby` and `id` | `tooltip.js:315` `tip.setAttribute('id', getUID(...))` (`util/index.js:39`); `tooltip.js:206` sets `aria-describedby`; `tooltip.js:277` removes it | `unnamed` | `none` |
| Tip through `TemplateFactory` and sanitizing | `tooltip.js:303` `toHtml()`; factory gets config plus content (`tooltip.js:338`); template sanitized when `sanitize` (`template-factory.js:86`, `template-factory.js:141`) | `tip.template` `types.ts:1583`, `html` `types.ts:1579`, `sanitizer` `types.ts:1599` | `none` |
| `_createPopper`, `bs-tooltip-auto`, `data-popper-placement` | class `bs-${NAME}-auto` `tooltip.js:313`; `Popper.createPopper` `tooltip.js:373`; attribute set in `preSetPlacement` `tooltip.js:432` | `TooltipClassMap.auto` `types.ts:1515`, `TooltipAttributeMap.side` `types.ts:1547`, `placement` `types.ts:1590` | side attribute `Placement` (`Placement.ts:179`); auto class and Popper `none` |
| `_getDelegateConfig` | `tooltip.js:579` copies keys that differ from `Default`, then `selector: false` and `trigger: 'manual'` (`tooltip.js:588`) | `descendants` `types.ts:1601` names the selector; the manual copy is `unnamed` | `none` |
| `dispose` | `tooltip.js:171` clears the timeout, restores `title` from `data-bs-original-title` (`tooltip.js:176`), `_disposePopper` removes the tip (`tooltip.js:597`), `super.dispose` drops data and listeners (`base-component.js:39`) | `destroy` `types.ts:1694` | `HostSnapshot` (`HostSnapshot.ts:73` `save`, `HostSnapshot.ts:124` `restore`) |
| Hover and leave timers | `_enter` `tooltip.js:501` waits `delay.show` (`tooltip.js:513`); `_leave` `tooltip.js:516` returns if a trigger is active, else waits `delay.hide` (`tooltip.js:527`) | `delay` `types.ts:1562` | `none` |
| `_isWithActiveTrigger` | `tooltip.js:535` any `_activeTrigger` value is `true` | `unnamed` | `none` |
| `_fixTitle` | `tooltip.js:486` copies `title` to `aria-label` when the trigger has no label and no text, stores `data-bs-original-title`, removes `title` | `unnamed` | `none` |
| `_setTimeout` show and hide halves | `tooltip.js:530` one timer, cleared then set; a number delay becomes `{show, hide}` (`tooltip.js:561`) | `delay.show` `types.ts:1563`, `delay.hide` `types.ts:1565` | `none` |

Modal-hide is Bootstrap (`tooltip.js:477` hides the tip) and is named by `TooltipClassMap.modal` `types.ts:1517`. It is not one of the nineteen rows. `constants.ts` declares `PLACEMENT_*` (`constants.ts:240`) and `POPOVER_PROPERTIES` (`constants.ts:272`) and no `TOOLTIP_*` or `POPOVER_*` template.

2. Popover delta. `popover.js` has no `_getTipFactory`. The override that fills the factory is `_getContentForTemplate`.

| Difference | Bootstrap | Contract |
| --- | --- | --- |
| Defaults | `popover.js:20` spreads `Tooltip.Default`, then `content: ''`, `offset: [0, 8]`, `placement: 'right'`, popover `template`, `trigger: 'click'` | `PopoverOptions` remarks `types.ts:1746` (click, not hover or focus; popover template; `right` at `[0, 8]`); `content` `types.ts:1752`. `TooltipOptions.trigger` leaves `types.ts:1570` and `tip.template` `types.ts:1583` do not restate those popover defaults |
| Content getter | `popover.js:69` `_getContent` resolves `config.content` | `PopoverOptions.content` `types.ts:1752` |
| `_isWithContent` | `popover.js:57` title or content | `PopoverInterface.show` `types.ts:1773` (empty header or body slot removed; refusal when it has no content `types.ts:1775`) |
| Template | `popover.js:25` `.popover` / `.popover-arrow` / `.popover-header` / `.popover-body` | remarks `types.ts:1747`; `PopoverSelectorMap.title` `types.ts:1736`, `.content` `types.ts:1738`; `PopoverClassMap.auto` default `bs-popover-auto` `types.ts:1724` |
| Factory fill | `popover.js:62` `_getContentForTemplate` maps `.popover-header` to the title and `.popover-body` to the content | `PopoverSelectorMap` `types.ts:1735`; `fill` example `types.ts:1830` |

3. Sanitizer and template surface.

| Bootstrap | Shape | Verdict name and `types.ts` |
| --- | --- | --- |
| `DefaultAllowlist` `sanitizer.js:11` | `'*': ['class','dir','id','lang','role', aria regex]`, then the tag list through `ul` `sanitizer.js:45` | Amended R10: `SANITIZER_ALLOWLIST`, a `SanitizerConfig` from this list (`j-engine-design-verdict.md:91`). `buildSanitizer` and `SANITIZE_ALLOWLIST` are struck (`j-engine-design-verdict.md:100`). Neither name is in `veneer/src`. Contract: `SanitizerConfig` `types.ts:644` |
| `sanitizeHtml` `sanitizer.js:84` | Empty string returned; a `sanitizeFunction` replaces the parser (`sanitizer.js:89`); otherwise `DOMParser`, drop tags not in the list (`sanitizer.js:100`), drop attributes that fail `allowedAttribute` (`sanitizer.js:109`), URI attributes must match `SAFE_URL_PATTERN` (`sanitizer.js:66`) | `sanitize: false` and `sanitizeFn` have no option (`j-engine-design-verdict.md:91`). Contract writer is `SanitizerInterface.write` `types.ts:612`, not `sanitizeHtml` |
| `_resolvePossibleFunction` `template-factory.js:145` | `execute(arg, [undefined, this])` | No `types.ts` member. Tooltip's own resolver passes the element twice (`tooltip.js:393`) |
| `_setContent` `template-factory.js:114` | Missing selector returns; a resolved empty value removes the slot (`template-factory.js:123`); an element goes through `_putElementInTemplate`; `html` writes sanitized `innerHTML` (`template-factory.js:133`); otherwise `textContent` | `fill` `types.ts:1674` (undefined or empty removes the slot). `buildTip`, `fillSlot`, `writeContent` are named on the J-TOOLTIP unit row (`j-engine-design-verdict.md:48`) and are not in `veneer/src` |
| `_putElementInTemplate` `template-factory.js:149` | `html` clears the slot and appends the element; otherwise writes `element.textContent` | `TipContent` `types.ts:688` includes `Element`. No landed helper |

`TOOLTIP_TEMPLATE` and `POPOVER_TEMPLATE` are named at `j-engine-design-verdict.md:48` and `j-engine-design-verdict.md:49` and are not in `constants.ts`.

4. Placement seam. `Dropdown.ts:290` constructs `new Placement({ reference, element }, { attributes: { popper, side }, position, offset, static, signal })`. It does not pass `fallbacks` or `popover` (so `Placement.ts:101` writes `popover="manual"`). `update` runs after the `shown` token (`Dropdown.ts:221`) and from `Dropdown.update` (`Dropdown.ts:238`). `destroy` runs before a new placement (`Dropdown.ts:206`), on hide (`Dropdown.ts:321`), and on dropdown `destroy` (`Dropdown.ts:253`). The `signal` is the dropdown controller (`Dropdown.ts:297`); `Placement.ts:89` destroys on abort.

`PlacementInput` offers `reference` `types.ts:527`, `element` `types.ts:529`, `popover` `manual` or `hint` `types.ts:531`. `PlacementOptions` offers `position` `types.ts:513`, `offset` as a number pair `types.ts:515`, `fallbacks` `types.ts:517`, `static` `types.ts:519`, `signal` `types.ts:521`. `Placement.update` writes the side attribute `Placement.ts:179`.

A tooltip needs, and the placement contract does not declare: `boundary` (`tooltip.js:61`, Popper `tooltip.js:416`); `popperConfig` (`tooltip.js:69`, merged at `tooltip.js:440`); an arrow element (`tooltip.js:421`); a function `placement` (`tooltip.js:91`, called at `tooltip.js:374`); a string or function `offset` (`tooltip.js:90`, parsed at `tooltip.js:382`); the `bs-tooltip-auto` class (`tooltip.js:313`); the RTL swap of left and right (`tooltip.js:53`).

5. Contract sentences on a Tooltip or Popover member that the matrix could not map to a Bootstrap behaviour.

- `types.ts:1496` `shown` "it is not cancelable" (Bootstrap sets `cancelable: true` for every trigger, `event-handler.js:282`). The same clause is on `hidden` `types.ts:1500`, `inserted` `types.ts:1502`, and the popover copies `types.ts:1709`, `types.ts:1713`, `types.ts:1715`.
- `types.ts:1588` container default is the nearest `aria-modal="true"` ancestor, else the body. Bootstrap uses `document.body` when `container` is false (`tooltip.js:559`).
- `types.ts:1599` markup and the template go through `SanitizerInterface` and, by default, `setHTML` over the allowlist. Bootstrap parses with `sanitizeHtml` (`sanitizer.js:84`).
- `types.ts:1604`, `types.ts:1606`, `types.ts:1608` replace class, attribute, and selector vocabulary from the constructor. Popover restates them at `types.ts:1754`, `types.ts:1756`, `types.ts:1758`. Bootstrap has no such groups.
- `types.ts:1610` `on` subscribes until destroy. Popover `types.ts:1761`. Bootstrap has no constructor hooks.
- `types.ts:1612` an aborted `signal` destroys the tooltip. Bootstrap has no signal.
- `types.ts:1626` `show` resolves false when a transition was in flight or the tooltip is destroyed. Bootstrap's `show` disposes the popper and continues (`tooltip.js:202`) and returns no promise.
- `types.ts:1628` a settled shown tip is rebuilt, as Bootstrap does; a trigger whose inline `display` is `none` resolves false instead of throwing (`tooltip.js:185`). Popover copy `types.ts:1777`.
- `types.ts:1639` `hide` resolves false when the tooltip is destroyed. Popover `types.ts:1788`.
- `types.ts:1678` `fill` resolves false when the tooltip is destroyed. Popover `types.ts:1827`.
- `types.ts:1764` the popover is the tooltip contract under `.vn.popover` names. Bootstrap's names are `.bs.popover` (`popover.js` inherits `eventName`).

Guide. Compatibility plugin rows: Tooltip `veneer.md:7723` (no data API; `placement: 'top'`, `trigger: 'hover focus'`, `sanitize: true`; `show`, `hide`, `setContent`; cancelable `show.bs.tooltip` and `hide.bs.tooltip`; `id` and `aria-describedby`; `bs-tooltip-auto` and `data-popper-placement`; `show`, and `fade` when animated). Popover `veneer.md:7724` (extends Tooltip; `content: ''`, `offset: [0, 8]`, `placement: 'right'`, `trigger: 'click'`; falsy title or content removes `.popover-header` or `.popover-body`; `bs-popover-auto`). Methods tables: `PlacementInterface` `veneer.md:339`, `TooltipInterface` `veneer.md:416`, `PopoverInterface` `veneer.md:429`. Surface: `SanitizerInterface` `veneer.md:107`, `SanitizerElementNamespaceWithAttributes` `veneer.md:109`, `SanitizerConfig` `veneer.md:110`, `SanitizeTargetInterface` `veneer.md:112`, `TooltipEventMap` through `TooltipInterface` `veneer.md:207`, `PopoverEventMap` through `PopoverInterface` `veneer.md:214`. No `Template*` surface row. No `#### Tooltip`, `#### Popover`, or `#### Placement` section under `### Components` (`veneer.md:842` runs through Modal).

Records. Units: J-TOOLTIP after J-DROPDOWN owns `Tooltip.ts` and the struck helper names (`j-engine-design-verdict.md:48`); the amendment gives it `NativeSanitizer.ts`, `SANITIZER_ALLOWLIST`, and `isSanitizeTarget` (`j-engine-design-verdict.md:100`). J-POPOVER owns `Popover.ts` and `POPOVER_TEMPLATE` (`j-engine-design-verdict.md:49`). E7 (`decisions.md:29`) types the sanitizer as `SanitizerConfig` and forbids the `Sanitizer` global. E8 (`decisions.md:35`) keeps the tooltip delay on native timers. E9 (`decisions.md:39`) makes the sanitizer a port with a native adapter. E13's amendment (`decisions.md:77`) names placement restoration re-entry. Carried findings: `fill` `@returns` (`plan.md:37`) and the popover-default clauses on `trigger` and `tip.template` (`plan.md:39`), both carried by J-TOOLTIP.

Distillate: Nineteen Bootstrap rows. Carriers: `none` for construction, triggers, toggle, enable, disable, `toggleEnabled`, `setContent`/`fill`, title, id and `aria-describedby`, tip sanitizing, the auto class, delegate config, both timers, `_isWithActiveTrigger`, and `_fixTitle`; `emitEvent` plus `settleAnimations` for show/hide and `fade`; `Placement` for `update` and the side attribute; `HostSnapshot` for `destroy`'s restoration; `matchesReducedMotion` carries none. Unnamed: `toggleEnabled`, `data-bs-original-title`, `aria-describedby` and `id`, the delegate config's `manual` copy, `_isWithActiveTrigger`, `_fixTitle`. Placement lacks `boundary`, `popperConfig`, an arrow, a function placement, a string or function offset, the auto class, and the RTL side swap. Departures in the contract sentences: non-cancelable completed events, the `aria-modal` container, `setHTML` instead of `sanitizeHtml`, vocabulary groups, `on`, `signal`, in-flight and destroyed refusals, `display: none` resolving false, and `.vn.popover` names. `buildSanitizer`, `SANITIZE_ALLOWLIST`, `buildTip`, `fillSlot`, `writeContent`, `TOOLTIP_TEMPLATE`, and `POPOVER_TEMPLATE` are not in the landed tree.

Unknowns: `veneer/src/browser/Toast.ts` (scoped; no such file). `findShadowRoot` in `util/index.js` (imported at `tooltip.js:13`; body not read). `Config._mergeConfigObj`, which `tooltip.js:552` calls, lives in `util/config.js`, outside the named file list.

Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/j-tooltip-terrain.jsonl`, session `857941b3-ba57-4a98-80c5-0b665e32b5c2`.

Deviation: One shell listing of `veneer/node_modules/bootstrap` was rejected; the same files were read by path. `Toast.ts` could not be read because it is not on disk.
