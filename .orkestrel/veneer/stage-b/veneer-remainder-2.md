Slice 2 is the browser chunk. I’ll read the design verdict, the plan, the roadmap, the guide, and the two recipe records.# Slice 2 — the browser chunk at dc4654b

## Stage A

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| Twelve plugins on Bootstrap markup, classes, and `data-bs-*`, equal to the oracle under the departure table | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:17`; `ROADMAP.md:145`; `guides/veneer.md:939`; `guides/veneer.md:606` | |
| Bootstrap `*.bs.*` names are the wire events, as bubbling `CustomEvent`s with the legacy properties; `toggle.vn.button` is the only `.vn.` event | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:8`; `guides/veneer.md:596`; `src/browser/constants.ts:45`; `guides/veneer.md:696` | |
| `createEngine` is the boot entry; one factory per plugin; capture routes; load-time ride, spy, offcanvas, and active-tab init | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:18`; `guides/veneer.md:578`; `src/browser/Engine.ts:70`; `src/browser/plugins.ts:100` | |
| Implementation classes stay out of the barrel | moot | `scaffold:.orkestrel/veneer/browser-design-verdict.md:18`; `scaffold:.orkestrel/veneer/browser-convention-verdict.md:124`; `src/browser/index.ts:8` | |
| `Placement` replaces Popper for the dropdown, tooltip, and popover in the ordinary layer, with no `popover` attribute | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:11`; `guides/veneer.md:604`; `src/browser/Placement.ts:205` | |
| The refused substitutions stay out: `<details>`, `popover="auto"`, invoker commands, `interestfor`, `inert`, View Transitions, `@starting-style`, toast top layer, and `showModal()` on a `div` | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:12`; `src/browser` has none of those calls | |
| Scrollspy stays on `IntersectionObserver`; carousel swipe stays on pointer events | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:13`; `src/browser/Scrollspy.ts:52`; `src/browser/Swipe.ts:32` | |
| Transition waits use `getAnimations()` and dispatch no synthetic `transitionend`; backdrops stay `div` nodes; scroll lock keeps Bootstrap's padding compensation | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:23`; `guides/veneer.md:600`; `src/browser/helpers.ts:913`; `src/browser/Lock.ts:72` | |
| Tooltip and popover hosts present at boot are initialized | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:25`; `src/browser/plugins.ts:284`; `src/browser/plugins.ts:364`; `guides/veneer.md:689` | |
| `@orkestrel/contract` is the runtime dependency; the packed graph has no Bootstrap, Popper, or Vue; the guide names Chromium 153.0.8010.12 through Playwright 1.63.0 | done | `scaffold:.orkestrel/veneer/browser-design-verdict.md:26`; `guides/veneer.md:576`; `guides/veneer.md:606` | |

## Stage B

The tip has none of these. `plan.md:17` places them in chunk 4 now, before chunk 3. `guides/veneer.md:939` still calls stage B a later chunk of same-named plugin replacements.

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| `<dialog class="modal">` beside `div.modal` | open | Verdict: neutralization recipe of `dialog-modal`, `closedby="none"` with Bootstrap's keydown path, the `div` backdrop kept, the Tab limit named (`scaffold:.orkestrel/veneer/browser-design-verdict.md:17`). Recorded neutralization: `dialog.modal { margin:0; border:0; padding:0; max-width:none; max-height:none; color:inherit; background:transparent }` and `dialog.modal[open] { display:block }` matched the div control; Escape closed the dialog; Tab reached the Vitest frame (`tmp/units/browser-feasibility-report.md:13`, `:35`). Analyst prior row `dialog-modal` and fresh `dialog-contract`: `showModal` on a `div` throws (`tmp/units/browser-design-analyst-proposal.md:167`, `:174`). `closedby="none"` is unverified: the census only shows `closedBy` and `closedby="any"` (`tmp/units/browser-feasibility-report.md:11`); the planner asks it as P6 (`tmp/units/browser-design-planner-proposal.md:408`). | Accept an author-opted `dialog.modal`, keep the `div` backdrop, and add departure rows. The `closedby="none"` Escape reading is not in the recorded probes. |
| `scrollbar-gutter: stable` scroll lock | open | A 15 px scrollbar: uncompensated overflow widened 399 px boxes to 414 px; Bootstrap padded 15 px; a stable gutter kept 399 px and zero padding, while `clientWidth` still went from 399 to 414 (`tmp/units/browser-feasibility-report.md:25`). Analyst: not an equivalent default (`tmp/units/browser-design-analyst-proposal.md:72`, `:180`). | Optional lock beside Bootstrap's padding compensation, with its own departure rows. |
| `interpolate-size` vertical collapse | open | `interpolate-size: allow-keywords` and a pixel height both reached 120 px, at about 349 ms and 368 ms against a 350 ms duration; `details::details-content` did not animate (`tmp/units/browser-feasibility-report.md:21`). Fresh `horizontal-intrinsic`: auto width resolved to 300 px while `scrollWidth` was 120 px (`tmp/units/browser-design-analyst-proposal.md:95`, `:166`). | Vertical opt-in only. Horizontal collapse stays numeric. |
| `popover="manual"` floating parts | open | Manual popovers stayed open on outside click and Escape; auto popovers closed; closing `beforetoggle` was not cancelable; dismissal left `.dropdown-menu.show` at 160 × 82 (`tmp/units/browser-feasibility-report.md:15`). Fresh `close-veto`: auto closes with `cancelable: false` and stays `display:block`; a vetoed manual popover stays open (`tmp/units/browser-design-analyst-proposal.md:164`, `:175`). | Author-opted manual popovers for floating parts, with departure rows. `popover="auto"` stays refused. |

## Rulings

| item | status | evidence | decision |
| --- | --- | --- | --- |
| Stage B's timing | open | Ruled at `scaffold:.orkestrel/veneer/plan.md:17`. Still open at `scaffold:.orkestrel/veneer/browser-design-verdict.md:63`, `ROADMAP.md:145`, and `guides/veneer.md:939`. | Stage B runs now inside chunk 4, before chunk 3. The tip has no stage B host. The guide's "later chunk" sentence blocks that reading. |
| Tooltip and popover start at boot | open | Ruled at `scaffold:.orkestrel/veneer/plan.md:17`. The tip still boots both (`src/browser/plugins.ts:284`, `:364`, `:374`) and `createEngine` defaults to that list (`guides/veneer.md:578`, `:939`). | Boot is a blank slate: tip start leaves the default and becomes a separate opt-in, and no default forces behavior. The current default list blocks that. |
| Boot-scope name | open | Ruled at `scaffold:.orkestrel/veneer/plan.md:17`. The tip exports `createEngine` and `Engine` (`src/browser/index.ts:8`; `guides/veneer.md:580`, `:939`). The design fallback was `createVeneer` (`scaffold:.orkestrel/veneer/browser-design-verdict.md:65`). | Rename the boot scope to `createVeneer`. `Engine` and `createEngine` are still the published names. |

## Plugins

None of the twelve uses the Popover API, `<dialog>`, or `<details>` and `<summary>`.

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| Alert | scripted | Dismiss and `getAnimations()` wait (`guides/veneer.md:608`) | |
| Button | scripted | Delegated click, `active`, `aria-pressed`, `toggle.vn.button` (`src/browser/constants.ts:45`) | |
| Carousel | scripted | Items, intervals, and pointer swipe (`src/browser/Swipe.ts:32`) | |
| Collapse | scripted | Measured height and width (`src/browser/Collapse.ts:53`) | |
| Dropdown | scripted | Menu classes and `Placement` on the dynamic path (`src/browser/Dropdown.ts:137`) | |
| Modal | scripted | `div.modal`, `div` backdrop, trap, and padding lock (`src/browser/Modal.ts:46`) | |
| Offcanvas | scripted | Show classes, parent backdrop, and conditional lock (`src/browser/Offcanvas.ts:123`) | |
| Popover | scripted | Tip profile and `Placement`; template is a `div` (`src/browser/constants.ts:249`) | |
| Scrollspy | scripted | `IntersectionObserver` (`src/browser/Scrollspy.ts:52`) | |
| Tab | scripted | Roles, ARIA, and class toggles (`src/browser/Tab.ts:51`) | |
| Toast | scripted | Show classes, autohide, and holds (`guides/veneer.md:608`) | |
| Tooltip | scripted | Title migration, generated tip, and `Placement` (`src/browser/Tip.ts:99`) | |