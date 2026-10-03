# Stage B measurements

Chromium **153.0.8010.12**, Playwright **1.63.0**, Bootstrap **5.3.8**, Windows, checkout `main` at `9885975`. The unmodified configuration resolved to empty Playwright launch options. CDP confirmed the browser version. These are browser measurements, not implementation acceptance or performance benchmarks. The raw readings and exact probe sources are in `tmp/codex/stage-b-measurements.json:1`.

The commands below ran separately and exited 0. Each section identifies its commands by key. The probes have been deleted; their source text is retained in the JSON.

| Key | Command | Result |
| --- | --- | --- |
| M | `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/stage-b-measure.probe.test.ts` | 5 passed; 14.52 s |
| S | `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/stage-b-surfaces.probe.test.ts` | 7 passed; 7.04 s |
| T | `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/stage-b-motion.probe.test.ts` | 5 passed; 14.07 s |
| C | `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/stage-b-contracts.probe.test.ts` | 3 passed; 24.56 s |
| X | `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/stage-b-controls.probe.test.ts` | 5 passed; 4.77 s |

Bootstrap comparisons use `createOracle`, which loads its own stylesheet, bundle, registry, and delegated handlers (`tests/setupBrowser.ts:3599`). D3's initial dialog, gutter, intrinsic-collapse, and manual-floating measurements were reused, not repeated (`tmp/codex/browser-stage-b-design-verdict.md:206`).

## 1. Close-request veto

**Commands: M, C.** Inputs: fresh oracle documents; `auto` and `hint` popovers; nonmodal dialogs with `closedby="any"` or `"closerequest"`; and `showModal()` dialogs. Each ran without activation and after a verified real button click, with no veto, a `cancel` veto, a closing `beforetoggle` veto, or an Escape `keydown` veto. Escape was repeated without another activation.

| Surface | No activation, `cancel.preventDefault()` | Prior activation, first Escape | Repeated Escape after the successful veto | Closing `beforetoggle` veto |
| --- | --- | --- | --- | --- |
| Auto/hint popover | Closes; no `cancel` event | Closes; no `cancel` event | Already closed | Cannot prevent close |
| Dialog `any` / `closerequest` / modal | Closes; `cancelable:false` | Stays open; `cancelable:true` | Closes; `cancelable:false` | Cannot prevent close |

Popover closing order was `beforetoggle(closed)` then queued `toggle(closed)`. Dialog closing order was `keydown`, `cancel`, `beforetoggle(closed)`, `close`, then `toggle(closed)`. A successful cancel stopped the closing sequence. **Control:** removing the veto closed the surface; cancelling Escape `keydown` kept every tested surface open on both presses, including without activation. Readings: `tmp/codex/stage-b-measurements.json:104`.

Bootstrap's own engine on native hosts produced different outcomes by family:

| Bootstrap gate | Escape outcome with the hide veto |
| --- | --- |
| `hide.bs.dropdown`, auto/hint menu | Veto survives when Escape reaches Bootstrap's dropdown route, which prevents the key's default action. Without the veto, Bootstrap removes `.show` but leaves the native popover open. |
| `hide.bs.offcanvas`, auto/hint host | `.show` remains, but the native popover closes. |
| `hide.bs.modal`, each tested dialog mode | `.show` remains, but the native dialog closes. |
| `hide.bs.popover`, auto/hint generated panel | Escape closes the native panel without firing Bootstrap hide. A subsequent vetoed Bootstrap `hide()` retains `.show`. |

Readings: `tmp/codex/stage-b-measurements.json:23147`; Bootstrap's dropdown key cancellation: `node_modules/bootstrap/js/src/dropdown.js:410`.

**Settles:** native closing events cannot universally preserve Bootstrap's hide veto. Dropdown's key interception is a specific surviving route, not a general popover guarantee. **Open:** Android Back and gesture close requests were not exercised.

## 2. Disputed default-flag features

**Commands: M, S, C, T, X.** Inputs: support queries, real focus/hover/Escape, popover stack operations, native transitions, and dialog focus candidates. The invalid CSS declaration `stage-b-invalid:yes` returned false; absent attributes and cancelled actions supplied behavioral controls.

| Feature | Reading in this browser |
| --- | --- |
| Hint model | Opening an independent hint preserves an open auto popover. Another hint replaces the earlier hint. A nested hint preserves its ancestral auto. Opening an unrelated auto closes the hints. An auto opened inside an independent hint retained that hint and closed the earlier unrelated auto. Reentrant `showPopover()` threw `InvalidStateError`. |
| `interactivity:inert` | Supported; prevented focus entering the subtree. Removing the declaration let the same button receive focus. |
| `focusgroup` | Present; `focusgroup="toolbar"` moved focus from First to Second on ArrowRight. Removing the attribute left focus on First. |
| `interestfor` / `InterestEvent` | Present. Zero-delay hover and focus opened the hint. `interest` veto prevented opening; `loseinterest` veto prevented pointer-leave closing. Escape's `loseinterest` was noncancelable and closed it. |
| `::interest-button` | Selector parses and authored `content` computes, including on the non-invoker control. CDP found no generated interest-button node in this desktop fixture. Parsing is not proof of a usable button. |
| `position-visibility` | `anchors-visible` and `no-overflow` parse; initial computed value is `anchors-visible`. `anchor-visible` and `anchors-valid` fail. |
| `TransitionEvent.animation` | Present; real opacity/display/overlay transition events referred to `CSSTransition` objects. |
| `document.activeViewTransition` | Present; equalled the active transition and returned to null after completion. |
| `ViewTransition.waitUntil` | Present; a 600 ms hold delayed completion to 618.2 ms versus 329.1 ms without the hold. |
| `:target-before` / `:target-after` | Parse and change the generated marker's computed content when its position relative to the current marker changes. |
| Dialog focusing | A first child with `tabindex="-1"` received focus ahead of a sequentially focusable button. Dialog `autofocus` did not supersede that child. With only a button, it received focus; text-only content fell back to the dialog. |

Readings: `tmp/codex/stage-b-measurements.json:58`, `:3832`, `:3874`, `:10432`, `:24387`, `:24781`. The dialog reading agrees with the research's legacy-focus-path prediction (`tmp/units/native-research-agent-9.md:51`).

**Settles:** presence and the listed default behavior, including discrepancies between parsing and generated UI. **Open:** touch-generated interest controls, every hint-stack interleaving, and exhaustive focusgroup keyboard behavior.

## 3. Native scroll lock

**Commands: S, X.** Inputs: a 2400 px page, `.fixed-top`, `.sticky-top`, an overflowing `dialog.modal`, and root/gutter, `:has(dialog:modal)`, containment, and Bootstrap Modal strategies. A separate small dialog exposed its backdrop to wheel input.

| Strategy | Wheel at overflowing dialog boundary | Wheel over exposed backdrop | Programmatic instant scroll |
| --- | --- | --- | --- |
| No lock — control | Page moved 450 px | Page moved 400 px | Reached 200 px |
| Root `overflow:hidden` + stable gutter | Page stayed at 0 | Page stayed at 0 | Reached 200 px |
| `html:has(dialog:modal){overflow:hidden}` | Page stayed at 0 | Root-rule control stayed at 0 | Reached 200 px |
| Dialog `overscroll-behavior:contain` | Page stayed at 0 | Page moved 400 px | Reached 200 px |
| Dialog containment plus backdrop `overflow:hidden;overscroll-behavior:contain` | Page stayed at 0 | Page stayed at 0 | Reached 200 px |
| Bootstrap Modal | Page stayed at 0 | Not separately sampled | Not separately sampled |

The overflowing fixture kept the body, fixed, and sticky widths at **785 px** in an **800 px** oracle viewport, with zero right padding on those elements. `innerWidth - documentElement.clientWidth` read **0** before and after these default-launch runs. Bootstrap wrote `body{overflow:hidden}` and **16 px modal right padding**; the native paths wrote no modal compensation. Native and Bootstrap modal scroll endpoints differed, so this is not a geometry-parity claim. Readings: `tmp/codex/stage-b-measurements.json:12041`, `:24683`.

D3's separate classic-scrollbar reading remains authoritative: **15 px** scrollbar; stable gutter preserved width; adding Bootstrap's ordinary lock still added **15 px body padding** (`tmp/codex/browser-stage-b-design-verdict.md:211`).

**Settles:** root overflow locks user scrolling without padding; `:has()` supplies the condition. Dialog containment alone is not a page lock. **Open:** touch scrolling and mobile viewport behavior. The early smooth-scroll samples in `scroll-lock.programmatic` are excluded; only the instant-scroll control is used here.

## 4. Accessibility mapping

**Commands: S, X.** Inputs: `Accessibility.getFullAXTree` for closed/open targets, conflicting author attributes, and a modal dialog. **Controls:** a labelled button with `aria-expanded="true"` exposed role button and expanded true; a plain labelled button exposed no expanded property.

| Subject | Native mapping | Author conflict |
| --- | --- | --- |
| `popovertarget` invoker | Expanded false → true with target state | Author false did not override native true |
| `commandfor` popover command | Expanded false → true | Author false did not override native true |
| `commandfor` modal command | No implicit expanded property | Not applicable |
| `interestfor` invoker | No implicit expanded property; visible plain hint supplied description | Author expanded false was exposed; `aria-describedby` replaced the native hint description |
| `<summary>` | DisclosureTriangle, expanded follows `open` | Author false did not override native true |
| `showModal()` dialog | Dialog, modal true; outside nodes excluded | Author `aria-modal="false"` changed the reported modal property while outside exclusion remained |

Bootstrap supplied a concrete conflict: its dropdown wrote `aria-expanded="true"` and `.show`, but its unpromoted native popover remained closed, so the invoker's AX expanded state remained false. Bootstrap's write is at `node_modules/bootstrap/js/src/dropdown.js:152`; the measured tree is `tmp/codex/stage-b-measurements.json:24861`.

**Settles:** author expanded values cannot repair contradictory native state on these invokers. Bootstrap-style description writing overrides the measured native hint description. **Open:** assistive-technology speech and navigation. Raw trees: `tmp/codex/stage-b-measurements.json:5118`, `:6342`, `:7936`, `:9550`, `:9991`.

## 5. Toasts and alerts

**Commands: S, X, T.** Inputs: a `role="status"` region inside a shown manual top-layer toast, a plain status control, a hidden status control, and overlapping toast/dropdown/tooltip/dialog surfaces.

`Element.ariaNotify` exists and accepted the notification, returning undefined. The shown toast's AX status node exposed **live polite**, **atomic true**, and **relevant additions text**. Replacing “Before update” with “After update” changed the static-text descendant while retaining those live-region properties. The plain status control was exposed; the hidden control was absent. This proves a tree change, not a spoken announcement (`tmp/codex/stage-b-measurements.json:10614`, `:10834`, `:11317`).

Inside the modal's interactive subtree, opening dropdown → tooltip → toast put toast first in hit testing. Reopening dropdown put it ahead of toast; reopening toast put it first again. For a body-level toast, CDP's top-layer list changed from toast → modal to modal → toast after reopening the toast, but hit testing still returned the modal: the outside toast remained subject to modal inertness. Readings: `tmp/codex/stage-b-measurements.json:11800`, `:25240`. D3 supplies the ordinary Bootstrap z-index control (`tmp/codex/browser-stage-b-design-verdict.md:217`).

**Settles:** manual promotion preserves the measured live-region semantics and makes insertion order significant. **Open:** actual announcements, announcement priority, and pixel compositing of the inert body-level toast. Bootstrap's toast engine comparison is included in item 9; it adds no native notification operation.

## 6. DOM APIs

**Command: S.** Inputs: connected shown tip/dialog moves, Bootstrap visibility cases in its oracle document, nested scrollers, focus options, and ARIA relation setters.

| API | Reading | Control |
| --- | --- | --- |
| `moveBefore` | Tip stayed popover-open and focused; moved dialog retained `open`, `:modal`, and inner focus | `append` closed the tip's native state and lost focus; dialog retained `open` but lost `:modal` and focus |
| `checkVisibility` | With `visibilityProperty:true`, matched Bootstrap on the sampled visible/hidden/opacity/details cases except skipped content | Default options treated `visibility:hidden` as visible; `opacityProperty:true` rejected opacity zero that Bootstrap accepts; a child of `content-visibility:hidden` was false while Bootstrap returned true |
| `scrollIntoView({container})` | `nearest`: inner 250 px, outer 0; returned a Promise | `all`: inner 250 px, outer 200 |
| `focus({focusVisible})` | True matched `:focus-visible` | False did not match |
| ARIA element reflection | Both properties resolved the initial ID reference; assigning `[target]` returned that element | The corresponding string attribute became empty, rather than retaining the target ID |

Detached and `display:none` visibility controls returned false. A disabled button remained visible under both implementations, so this API does not replace a disabled check. The move's Web Animation count remained one under both methods; this probe claims preservation of focus/native surface state, not a distinguishing animation result.

Readings: `tmp/codex/stage-b-measurements.json:11861`, `:11889`, `:11991`. The visibility comparison calls Bootstrap's real `isVisible` (`node_modules/bootstrap/js/src/util/index.js:99`). Bootstrap's append sites are `node_modules/bootstrap/js/src/modal.js:173` and `node_modules/bootstrap/js/src/tooltip.js:211`.

**Settles:** these APIs are present, with observable semantic differences. **Open:** cross-document moves and ARIA reflection across shadow boundaries.

## 7. Disclosure

**Command: T.** Inputs: fragment navigation into until-found content, a Bootstrap collapse panel, hidden controls, named details groups, Bootstrap accordion siblings, and `::details-content` height transitions.

Fragment navigation is the documented substitute: both it and find-in-page use ancestor revealing for until-found content. The browser's find UI was not driven. See the [HTML hidden-attribute specification](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute).

Navigation fired noncancelable `beforematch` and removed `hidden="until-found"`. A `.collapse` panel nevertheless stayed `display:none`, retained its class, and emitted no Bootstrap lifecycle events. With a display override, it became visible after hidden removal. The ordinary `hidden` control stayed hidden and emitted no `beforematch`. Bootstrap's `[hidden]{display:none!important}` also defeated the initial until-found layout in these fixtures (`node_modules/bootstrap/dist/css/bootstrap.css:598`; `.collapse:not(.show)` at `:3354`). Readings: `tmp/codex/stage-b-measurements.json:12577`.

Named details opened the second member and closed the first. Preventing its noncancelable `toggle` did not stop either change. Bootstrap's accordion emitted show then sibling hide; vetoing show kept the first panel open and the second closed (`tmp/codex/stage-b-measurements.json:12728`; `node_modules/bootstrap/js/src/collapse.js:129`).

With `interpolate-size:allow-keywords`, the details box sampled at **92.8 px** during opening toward its **144 px** total height, and **117.7 px** during closing. The numeric-only control jumped to **144 px** and **24 px**. Despite the intermediate geometry, `getAnimations({subtree:true})` returned empty and no transition events reached the details host during these opening/closing windows; only toggle events arrived (`tmp/codex/stage-b-measurements.json:12806`).

**Settles:** the native mechanisms do not supply Bootstrap's collapse state or veto contract; this details recipe cannot use the sampled animation/event wait as its completion signal. **Open:** actual find-in-page behavior under corrected until-found CSS and other details animation recipes.

## 8. Carousel and scrolling

**Commands: T, C.** Inputs: a three-item, 240 px snap scroller with generated markers/buttons, a `scroll-target-group:auto` navigation, and a scroll-driven opacity animation. CDP exposed the generated pseudo nodes and their boxes; real pointer clicks activated them.

Generated next/previous buttons moved the offset **0 → 240 → 0 px**. Marker activation reached **480**, **240**, then **0 px**. Computed marker content changed among current/before/after. Clicking the navigation link selected Two, set offset **240 px**, and made that link match `:target-current`. The scroll animation used a `ScrollTimeline`, read **50%**, and produced opacity **0.5**. Its initial-position control read **0%** and opacity **0**.

Generated controls emitted click, scroll-snap-changing, scroll, scroll-snap-change, and scrollend events. They emitted no `slide.bs.carousel` or `slid.bs.carousel`. Bootstrap's own carousel in item 9 emitted those lifecycle events and updated active classes/indicator `aria-current`; native marker state did not write that contract. Removing motion through reduced-motion emulation changed Bootstrap timing, not the generated-control event model.

Readings: `tmp/codex/stage-b-measurements.json:15453`, `:24436`, `:13152`. The invalid CSS support query in item 2 was the parsing control; the initial offset/current-marker states were the behavior controls.

**Settles:** the pseudo family, target-group selectors, and scroll timeline operate in this browser. **Open:** full keyboard, swipe, autoplay, and disabled-indicator parity with Bootstrap; view-timeline behavior was syntax-tested only.

## 9. Motion

**Commands: T, X.** Inputs: Bootstrap `.fade`/`.show` with no starting-state establishment, explicit reflow, or `@starting-style`; a manual toast transitioning opacity/display/overlay; Bootstrap's Toast engine; and its Carousel/Tab engines wrapped in same-document View Transitions.

The no-reflow/no-starting-style control produced **zero animations/events**. Reflow and starting-style each produced an opacity transition: measured transitionend at **176.6 ms** and **166.5 ms**, respectively. The manual-toast exit exposed **display**, **opacity**, and **overlay** transitions; awaiting their `finished` promises took **149.1 ms** and ended with display/overlay none. Native toggle occurred before visual exit completion. Bootstrap Toast's own sequence included synthetic transitionend completion, including when the immediate animation list was empty. Readings: `tmp/codex/stage-b-measurements.json:24705`, `:12874`; Bootstrap's reflow site: `node_modules/bootstrap/js/src/toast.js:95`.

| Engine operation | Without View Transition | With View Transition and 450 ms hold |
| --- | --- | --- |
| Carousel, normal motion | `slid` at 611.7 ms | Ready 27.3 ms; finished 461.7 ms; `slid` 626.6 ms |
| Tab, normal motion | `shown` at 0.8 ms; pane transition later | Ready 30.2 ms; finished 476.5 ms; `shown` 12.5 ms |
| Carousel, reduced motion | `slid` at 5.9 ms | Ready 30.5 ms; finished 463.1 ms; `slid` 20.5 ms |
| Tab, reduced motion | `shown` at 0.8 ms | Ready 24.8 ms; finished 473.5 ms; `shown` 9.3 ms |

These are elapsed samples, not timing guarantees. `updateCallbackDone`, `ready`, and `finished` were observed in order. Reduced motion removed Bootstrap's carousel transition but left the View Transition's **250 ms** pseudo animations. The separate no-hold/600 ms-hold control confirmed `waitUntil` extends the lifetime (`tmp/codex/stage-b-measurements.json:13152`, `:24781`).

**Settles:** starting-style can establish a fade; discrete exit needs its own wait; View Transition completion is independent of Bootstrap lifecycle completion and does not automatically honor reduced motion. **Open:** interaction during snapshot suppression and application-specific reduced-motion policy. The existing engine explicitly excludes pseudo-element transitions (`src/browser/helpers.ts:919`).

## 10. Invoker commands and CloseWatcher

**Commands: M, X.** Inputs: real clicks for each built-in command, command vetoes, custom/invalid command controls, mixed Bootstrap/native invokers, and three watchers established with different activation histories.

`show-modal`, `close`, `request-close`, `toggle-popover`, `show-popover`, and `hide-popover` all performed their actions. Preventing `command` stopped each action. `request-close` additionally emitted a cancelable `cancel`; `close` did not. `--measure` dispatched command without opening anything; invalid `invalid` dispatched nothing. These controls distinguish dispatch from built-in action (`tmp/codex/stage-b-measurements.json:3918`).

On a dropdown button carrying both contracts, Bootstrap emitted show/shown during its delegated click handler and prevented the click default; no command followed. On a modal button, Bootstrap show/shown preceded command and native beforetoggle/toggle. Vetoing command stopped native modality but left Bootstrap's `modal show` state intact (`tmp/codex/stage-b-measurements.json:4292`, `:24793`).

| Watcher establishment | Escape result |
| --- | --- |
| Three watchers, no activation | First Escape closed all in reverse creation order; cancel events were noncancelable |
| One activation before creating all | First Escape closed the last two; second closed the first; vetoes could not prevent either group |
| Activation before each watcher | Successive Escapes closed one watcher each, newest first |
| Activation before each, cancel veto installed | First Escape was vetoed; repeated Escape closed the newest with a noncancelable cancel, then later Escapes closed the others |

The no-veto rows are the controls. Watcher construction itself succeeded without activation; activation affected grouping and vetoability. Readings: `tmp/codex/stage-b-measurements.json:4330`.

**Settles:** command and delegated click paths can suppress or duplicate parts of a lifecycle; watcher cancellation is not an unconditional hide gate. **Open:** Android Back and watcher interactions beyond the measured groups.

## Findings table

| Item | Present in 153 | Settles | Open |
| --- | --- | --- | --- |
| Close veto | Yes, with limits | Popover hide is not vetoable there; dialog cancel can become noncancelable; dropdown key route differs | Android Back |
| Disputed features | Listed APIs present; interest-button generation unproved | Runtime support, focus, hint stacks, and interest cancellation | Touch control; exhaustive keyboard/stack cases |
| Scroll lock | Yes | Root overflow works; dialog-only containment misses backdrop scrolling | Touch/mobile behavior |
| Accessibility | Yes | Native expanded takes precedence; author description/modal overrides observed | Assistive-technology behavior |
| Toasts/alerts | `ariaNotify` and live-region mapping present | Live AX tree updates; insertion order; modal inertness distinction | Spoken announcements and pixel compositing |
| DOM APIs | Yes | Moves preserve native state; visibility/options/reflection have contract differences | Cross-document/shadow cases |
| Disclosure | Yes | Reveal needs CSS/state integration; details lacks Bootstrap veto/completion behavior | Find UI; alternative animation recipe |
| Carousel/scrolling | Yes | Generated controls, marker states, scroll events, and timeline work | Bootstrap interaction parity; view timeline behavior |
| Motion | Yes | Starting/discrete transitions work; View Transition and Bootstrap clocks differ | Snapshot interaction; reduced-motion policy |
| Commands/watchers | Yes | Command veto works; click ordering and activation-sensitive groups matter | Back gestures and broader grouping |

All temporary probes were deleted. `git status --porcelain` returned empty after cleanup.