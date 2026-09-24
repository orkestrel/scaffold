# J-DEMO report: the `opus` unit on Opus 5.5, worktree `tmp/worktrees/demo`

Retained 2026-09-24 from the writer's returned report (agent a07a3a9f350c76c84, under `j-demo-brief.md`). The two returned patches (the journey's `scrollIntoView` and the guide's § Tests link) were applied by the Orchestrator after the report, per the integration note at the end.

The J-DEMO Engine region is built, and the acceptance chain exits 0 on every gate. One deviation is open for you: the journey's `refuses a covered host` case now fails, because putting the Engine region first pushes the Buttons region below the 1280×800 viewport. The journey is outside this unit's chain and the fix sits in an off-limits file; the patch is under Deviation state.

## Touched files
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/demo/`.
- `app/browser/sections/EngineSection.ts` (new): extends `SpecimenSection`. After the markup mounts it constructs one `Tooltip` over the region with `descendants: ENGINE_TOOLTIP_TRIGGER`, and one `Toast` per `.toast`. Every button whose `aria-controls` names the toast calls `toast.show()` on click. `destroy()` removes those listeners, destroys the engines in construction order, then calls `super.destroy()`.
- `app/browser/constants.ts`: adds `ENGINE_COPY` (region `Engine`), `ENGINE_TOOLTIP_TRIGGER`, and `ENGINE_SPECIMENS`. The specimens are, in order: Live collapse, accordion, dropdown, tabs, alert, modal, offcanvas, toast, tooltips, carousel, scrollspy. The TSDoc lists each departure from Bootstrap's examples.
- `app/browser/Showcase.ts`: `EngineSection` mounts first.
- `app/browser/index.ts`: exports the section.
- `tests/app/browser/sections/EngineSection.test.ts` (new): real-journey proofs.
- `tests/app/browser/Showcase.test.ts`: `'Engine'` is the first region and `...ENGINE_SPECIMENS` the first specimens.
- `tests/app/browser/index.test.ts`: gains `ENGINE_COPY`, `ENGINE_SPECIMENS`, `ENGINE_TOOLTIP_TRIGGER`, and `EngineSection`.
- `guides/veneer.md` § Showcase: the Engine paragraph, plus the `viewport` and `scroller` sentence, which would otherwise be false.
- `tmp/j-demo/**`: the acceptance script, gate logs, and instruments.

Diffstat for tracked files: 6 files changed, 226 insertions, 7 deletions. The two new files are untracked (68 and 469 lines).

## Specimens and their engines
- **The page's `Delegate` drives these through Bootstrap's own attributes:**
  - collapse (`data-bs-toggle="collapse"`)
  - accordion (`data-bs-parent`)
  - dropdown
  - tabs
  - alert dismiss
  - modal trigger and dismiss
  - offcanvas toggle and dismiss
  - toast dismiss
  - carousel `data-bs-slide` and `data-bs-slide-to`
- **Scrollspy:** the delegate's construction scan starts it, because `main.ts` constructs the delegate after the showcase. The section constructs none of its own.
- **Section-constructed:** the toast and the tooltips. The toast dismiss route reaches the section's toast through `Toast.find`, so no host carries two engines (E12).
- **No added attributes were needed** for any route.

## Proofs
`npm run test:app -- tests/app/browser/sections/EngineSection.test.ts`: 15 passed. Each case and what it reads:
- **renders every engine specimen, in table order…:** the names and markup match the table, every id starts with `engine-`, there are no `[style]` attributes, and the data is frozen.
- **carries only class tokens the loaded cascade declares:** the list of classes the cascade does not declare is `[]`.
- **constructs the tooltip over the region and the toast over its host, and leaves the scrollspy to the delegate:** `Tooltip.find(region)`, `Toast.find(toast)` and `ScrollSpy.find(panel)` return those hosts.
- **opens the collapse panel from its toggle and closes it again:** `show`, `display: block`, `aria-expanded="true"`, then `display: none`.
- **opens the second accordion item and closes the first through the shared parent:** `aria-expanded` reads `['false','true']`.
- **opens the dropdown menu from its toggle and closes it with Escape:** the menu shows, `aria-expanded` flips; after Escape focus is back on the toggle.
- **switches to the second tab and shows its pane in place of the first:** `aria-selected` reads `['false','true','false']`.
- **dismisses the alert…:** the alert leaves the document.
- **opens the modal…:** `display: block`, `aria-modal`, body `modal-open` and `overflow: hidden`, backdrop present. It closes from the footer button with focus back on the trigger, reopens with focus on the modal, and Escape closes it.
- **opens the offcanvas panel…:** `visibility: visible`, `aria-modal`; after the close control, hidden with focus back on the trigger.
- **shows the toast from its button and hides it…:** `display: block`, then `none`; `Toast.find` is still the section's engine.
- **shows a tooltip under the pointer and under focus…:** hover shows a `role=tooltip` tip named by `aria-describedby`; leaving removes it. Tab moves the tip to the next trigger, and Escape removes it.
- **slides the carousel…:** Next twice reaches slide 3 with `aria-current` on it; indicator "Stop 2" returns to slide 2.
- **marks the link of the section in view…:** Pickup is active first; End activates Delivery; clicking Transit activates Transit and leaves `location.hash` unchanged.
- **destroys the tooltip, then the toast, then removes the region…:** the MutationObserver order is tip removal, then toast class restore, then region removal; both hosts can then take fresh engines.

**Failing-first:** this is a feature unit, so I proved the tests can fail by mutating owned files and restoring them afterwards (`tmp/j-demo/mutate.mjs`), same command as above:
- Delegate rooted elsewhere: 11 failed, 4 passed.
- Tooltip construction removed: 3 failed (constructs, tooltip, destroy).
- Toast binding changed to `dblclick`: 2 failed (toast, destroy).
- The class case returned `['slide']` while the carousel still carried `slide`.

I made no `prove` call; that MCP server is not reachable from this subagent.

## The guide paragraph
§ Showcase, after the paragraph on the application barrel:
> The Engine region leads the regions, and its specimens react. Each one is Bootstrap 5.3's documented markup for a component the engine drives … The data API starts no toast and no tooltip, so the `EngineSection` class constructs them: one `Tooltip` instance over the region, whose `descendants` option gives each `[data-bs-toggle="tooltip"]` trigger a tooltip of its own, and one `Toast` instance over the toast, which the button whose `aria-controls` attribute names the toast shows. … see [engine specimens](../tests/app/browser/sections/EngineSection.test.ts).

## Chain (`tmp/j-demo/acceptance.sh`)
```
npm run format:check -> exit 0
npm run lint:check -> exit 0
npm run check -> exit 0
npm run test:guides -> exit 0   (20 passed)
npm run test:policy -> exit 0   (109 passed, 1 skipped)
npm run test:app -> exit 0      (61 files, 222 passed)
npm run build:app -> exit 0
```
The policy skip was not added by this unit.

`git status --short`: owned files only.
```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
?? app/browser/sections/EngineSection.ts
?? tests/app/browser/sections/EngineSection.test.ts
```

## Deviation state
1. **Journey red, open for your decision.** `npm run test:journey` is not in the chain; I ran one project, `--project journey:light-1280`, as an observation: 1 failed, 61 passed.
   - **Failing case:** `refuses a covered host, then activates it once the cover is out of the way` (`integration.test.ts`, off-limits). The Toggle button's box top is 1733.69px, outside the 800px-tall viewport, so `readHit` returns `undefined`.
   - **Cause confirmed:** with the Engine region moved last temporarily, `-t "refuses a covered host"` passed (exit 0). `Showcase.ts` is restored.
   - **Hypothesis patch, not run** (the file is off-limits):
   ```diff
    		const host = readButton(mounted.section, 'Toggle')
   +		host.scrollIntoView({ block: 'center' })
    		const box = host.getBoundingClientRect()
   ```
2. **`slide` dropped from the carousel (departs from D2.10).** The journey's class census refused `slide`, because no rule in the cascade declares it. I removed the class rather than widen the gate, and the TSDoc states the departure. The cost: the live carousel changes slides without the sliding motion. Restore `slide` only together with a census decision.
3. **Other departures stated in the `ENGINE_SPECIMENS` TSDoc:**
   - the toast's show button names the toast through `aria-controls`, and its header has no image;
   - the toast uses `role="status"` with a polite live region;
   - the dropdown entries are buttons;
   - the scrollspy panel is the shell's `.viewport > .scroller`, with headings as the sections.

   The modal keeps Bootstrap's `h1.modal-title.fs-5`.
4. **Report-only patch for `guides/veneer.md` § Tests,** which is not owned. Add after the `[display specimens]` line:
   ```
   [engine specimens](../tests/app/browser/sections/EngineSection.test.ts),
   ```
5. **Untested throw.** `EngineSection` throws an `AppError` with code `ENGINE_REGION_MISSING` if the host's last element is not an HTMLElement after mounting. The type check requires the narrowing, and nothing that can run reaches it, so no test covers it. It could go away if `SpecimenSection` exposed its region, but that file is not owned.

## The Orchestrator's integration note (2026-09-24)

Both returned patches were applied as exact patches: `host.scrollIntoView({ block: 'center' })` before the box read in the covered-host case of `tests/app/browser/integration.test.ts` (the second `readButton(mounted.section, 'Toggle')` site, the photograph case, is untouched), and the `[engine specimens]` link after the display specimens line in the guide's § Tests. The landing chain adds `test:journey` to its gates so the patched case runs before the fast-forward. The carousel's dropped `slide` class is carried to J-INTEGRATION with the census question (the cascade declares no `.slide` rule; the demo's carousel changes slides without the motion until it does).
