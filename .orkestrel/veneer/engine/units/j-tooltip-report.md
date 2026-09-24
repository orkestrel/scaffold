# J-TOOLTIP round 1 — the writer's returned report (retained verbatim 2026-09-24)

Writer: `opus` on Opus 5.5, native subagent `a48b1f17b0f574e7a`, in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip` cut from `main` `e8251cf`). Brief: `j-tooltip-brief.md`. Instrument: `j-tooltip-mutations.py` with its log `j-tooltip-mutations.log.txt`, the baseline-red instrument `j-tooltip-red.py` with `j-tooltip-red.log.txt`, the chain `j-tooltip-acceptance.sh`, the platform probe `j-tooltip-probe-platform.test.ts.txt` with its log `j-tooltip-probe-1.log.txt`, and the placement proposal `j-tooltip-placement-arrow.patch.txt`, retained beside this file. The unit stopped on Unknown 3 as briefed; the Orchestrator's rulings on the stop and on D1 to D5 are in `j-tooltip-brief-2.md`. The mutation table the report quotes is the retained log, row for row; the report's long table is elided here to that reference.

---

I did not finish the unit: the Unknown 3 stop fired. The shipped cascade does not center the tooltip arrow. I did not implement the arrow patch: it needs a change to `Placement.ts`, which the brief marks report-only, so it is returned as a proposal. Everything else is built and every acceptance command exits 0 on Chromium 153.0.8010.12. The mutation instrument reddens a named case on every row and ends `restored byte for byte`. I also went outside the owned file list once (deviation D1): I created `NativeSanitizer`.

## Files touched
All under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/`.

- `src/browser/Tooltip.ts` (new): the engine.
- `src/browser/sanitizers/NativeSanitizer.ts` (new, **not in the owned list**, see D1): the default sanitizer, writing through `setHTML` over `SANITIZER_ALLOWLIST`.
- `src/browser/constants.ts`: `TOOLTIP_EVENTS`, `TOOLTIP_CLASSES`, `TOOLTIP_ATTRIBUTES`, `TOOLTIP_SELECTORS`, `TOOLTIP_TEMPLATE`, `TOOLTIP_DEFAULTS`, `SANITIZER_ALLOWLIST`, all frozen.
- `src/browser/helpers.ts`: `buildTip`, `fillSlot`, `writeContent`.
- `src/browser/validators.ts`: `isTooltipEvent`, and `isSanitizeTarget` (D1).
- `src/browser/parsers.ts`: `parseDelay`, `parseTrigger`, `parsePosition`, `parseFallbacks`. `offset` reuses `parseOffset`.
- `src/browser/index.ts`: exports `sanitizers/NativeSanitizer.js` and `Tooltip.js`.
- `src/browser/types.ts`: carried contract sentences only (diff below).
- `tests/src/browser/Tooltip.test.ts` (new, 27 cases) and `tests/src/browser/sanitizers/NativeSanitizer.test.ts` (new, D1).
- `tests/src/browser/helpers.test.ts`, `parsers.test.ts`, `validators.test.ts`, `index.test.ts`: cases for each new export, and the grown export list.
- `guides/veneer.md`: the § Surface rows, the Tooltip fence, `#### Tooltip` after `#### Toast`, and the Tooltip `plugin` row (Status `shipped`, Proof `tests/src/browser/Tooltip.test.ts`, Obligation wording unchanged).
- `tmp/j-tooltip/**`: the instruments, logs, and probe listed at the end.

Diffstat of tracked files (the new files are 630, 45, 1161, and 99 lines):
```
 guides/veneer.md                     | 255 ++++++++++++++++++++++++++++++++++-
 src/browser/constants.ts             | 180 +++++++++++++++++++++++++
 src/browser/helpers.ts               | 108 ++++++++++++++-
 src/browser/index.ts                 |   2 +
 src/browser/parsers.ts               | 143 +++++++++++++++++++-
 src/browser/types.ts                 |  19 +--
 src/browser/validators.ts            |  55 ++++++++
 tests/src/browser/helpers.test.ts    | 115 +++++++++++++++-
 tests/src/browser/index.test.ts      |  18 +++
 tests/src/browser/parsers.test.ts    |  95 +++++++++++++
 tests/src/browser/validators.test.ts |  75 +++++++++++
 11 files changed, 1051 insertions(+), 14 deletions(-)
```
```
 M guides/veneer.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Tooltip.ts
?? src/browser/sanitizers/
?? tests/src/browser/Tooltip.test.ts
?? tests/src/browser/sanitizers/
```

## Red and green readings
**Red.** `python tmp/j-tooltip/red.py` writes the owned sources back to their HEAD bytes, sets the new sources aside, runs each proof file, then restores everything (`receipt: restored byte for byte`). Verbatim:
```
RED exit=1 | tests/src/browser/Tooltip.test.ts | 0 failed of 0 cases | 1 failed of 1 suites | suite messages: ['Failed to import test file …/tests/src/browser/Tooltip.test.ts']
RED exit=1 | tests/src/browser/sanitizers/NativeSanitizer.test.ts | 0 failed of 0 cases | 1 failed of 1 suites | …
RED exit=1 | tests/src/browser/helpers.test.ts | 0 failed of 0 cases | 1 failed of 1 suites | …
RED exit=1 | tests/src/browser/parsers.test.ts | 0 failed of 0 cases | 1 failed of 1 suites | …
RED exit=1 | tests/src/browser/validators.test.ts | 0 failed of 0 cases | 1 failed of 1 suites | …
RED exit=1 | tests/src/browser/index.test.ts | 1 failed of 3 cases | 2 failed of 2 suites | suite messages: ['']
```
That red is an import failure, because the exports did not exist at baseline. The per-behaviour red for each case is its mutation row in the table later in this report.

**Green**, from the same instrument's final lines:
```
GREEN? exit=0 | tests/src/browser/Tooltip.test.ts | 0 failed of 27 | []
GREEN? exit=0 | tests/src/browser/sanitizers/NativeSanitizer.test.ts | 0 failed of 4 | []
GREEN? exit=0 | tests/src/browser/helpers.test.ts | 0 failed of 45 | []
GREEN? exit=0 | tests/src/browser/validators.test.ts | 0 failed of 28 | []
GREEN? exit=0 | tests/src/browser/parsers.test.ts | 0 failed of 24 | []
GREEN? exit=0 | tests/src/browser/index.test.ts | 0 failed of 3 | []
```

## Obligations and the cases that pin them
- **TIP1 construction and options.** Options resolve in the contract order: constructor, then attributes, then defaults. Construction moves the `title` attribute into the tip content (Unknown 1). A disabled tooltip refuses `show` and `toggle`.
  - Cases: "resolves the options from the constructor over the attributes over the defaults"; "moves a title into the tip content at construction…"; "refuses an invalid host, a group value, a descendants selector, or an attribute that fails validation, and a second owner"; "publishes frozen default tables…".
  - Mutation rows: `the title is not moved` (JOINED), `the default offset is zero` (EXACT).
- **TIP2 the tip.** The template and markup go through the sanitizer; the default is `NativeSanitizer` over `SANITIZER_ALLOWLIST`. The tip carries the `auto` token, `fade` when animated, the `tip.class` tokens, and a generated `vn-tooltip-N` id. While the tip is shown, the trigger's `aria-describedby` names it and keeps the other ids.
  - Cases: "writes markup through the default sanitizer when html is true"; "writes the template and markup through a supplied sanitizer…"; "fills a slot from a function of the trigger, moves an element in, removes an empty slot, and rebuilds a shown tip"; the `buildTip`, `fillSlot`, and `writeContent` cases.
  - Mutation rows: the sanitizer and describedby rows (EXACT or JOINED).
- **TIP3 show and hide.** The sequences run as briefed. The container is the option, else the nearest `aria-modal="true"` ancestor, else the body. The placement is `{ reference: host, element: tip, popover: 'hint' }` with position, offset, fallbacks, side, and the tooltip's signal. A hide takes over a show in flight. A show refuses while any change is in flight, and for a trigger whose inline `display` is `none`.
  - Cases: "shows the tip in the top layer above its trigger…"; "reads the same border, padding, …" (the UA-leak proof R9 requires); "waits for the fade in and the fade out…"; "inserts the tip into the container option…"; "refuses to show when disabled, empty, disconnected, hidden inline, prevented, in flight, or destroyed"; "refuses to hide a hidden tip…"; "rebuilds a settled shown tip on show, and a hide takes over a show in flight"; "places the tip at the position, offset, and fallbacks…"; "refuses the show when a listener cancels the tip promotion…".
- **TIP4 interactions and delays.**
  - The trigger listens for `mouseover` and `mouseout` with a related-target check, `focusin` and `focusout`, and `click`.
  - One native timer runs at a time.
  - Hover, focus, and click are recorded separately, as Bootstrap's `_activeTrigger` does. A leave hides the tip only when none of them still holds it.
  - An ask during a hide in flight shows the tip again after the hide completes.
  - A manual tooltip binds nothing.
  - `descendants` works as Unknown 2 describes.
  - Cases: "shows on hover after the show delay … and a leave clears a pending show"; "shows the tip again when the pointer returns while it fades out…"; "keeps the tip while focus still holds it…"; "toggles on a click with the click trigger, and binds no listener as a manual tooltip"; "drives a tooltip for each matching descendant…".
- **TIP5 modal and lifetime.** The tooltip hides on the enclosing modal's `hide.vn.modal`. `destroy` releases the claim, aborts, clears the timer, removes the tip and placement, and restores through `HostSnapshot`. The `signal` works when already aborted, when it aborts later, and when it aborts during construction; a custom element's `title` reaction proves the last.
  - Cases: "hides when the modal it sits in dispatches its hide event"; "destroys the tooltip when its signal aborts…"; "abandons a show in flight on destruction…"; "stops a show whose inserted listener destroys it…"; "refuses a show a show listener starts…".
- **TIP6 declarations.** Every declaration is a frozen constant, a guard, a parser, or a barrel export, and each is in the export list.
- **TIP7 guide.** `#### Tooltip` has the construction, sequences, content, sanitizer, placement, arrow, hint-dismissal, interaction, delegation, and modal paragraphs, the five tables, the door paragraph, and the departures list. It also says there is no data API route.
- **TIP8 instrument.** `tmp/j-tooltip/mutations.py`; its full log is `j-tooltip-mutations.log.txt`.

## Unknowns
1. **The `title` handling.** When the trigger's `title` attribute is present and not empty, construction removes it for the tooltip's life, and its value becomes the default content of the title slot. Construction writes `aria-label` only when the trigger has neither a non-empty `aria-label` nor text, as Bootstrap's `_fixTitle` does. A tooltip with `descendants` set keeps its `title`. No `data-bs-original-title` attribute is written. `HostSnapshot` restores both attributes. The guide states this in `#### Tooltip`.
2. **The `descendants` shape.**
   - The container's listeners find the closest descendant matching the selector, other than the container. `Tooltip.find` returns that descendant's tooltip if one exists; otherwise one is constructed on first interaction.
   - The constructed tooltip takes the constructor options minus `descendants`, `on`, and `signal`, with all interactions off and `signal` set to the container's lifetime.
   - Its events bubble to the container's hooks. It is destroyed with the container. The container's own data attributes do not transfer, which the guide records as a departure.
3. **The arrow is not centered: the stop fired.** The probe (`tmp/j-tooltip/probe-1.log.txt`) shows `arrowPos=static` on every side. The arrow sits at the tip's start, and its `::before` resolves against the tip. The proposal (`position: absolute` with the along-axis centre) measured `centerX=239 refCenterX=239` for top and bottom and `centerY=130 refCenterY=131` for right and left. The proposal follows, and the guide states the limit.
4. **The `aria-*` pattern.** Chromium 153's `setHTML` cannot express it; see `sanitizer.custom.ariaWildcard` in the terrain record. `SANITIZER_ALLOWLIST` therefore lists `class`, `dir`, `id`, `lang`, `role`, and every attribute WAI-ARIA 1.2 defines plus those the 1.3 draft adds, by name. The `a` and `img` elements get their own attribute entries, and `dataAttributes` is `false`. It cannot keep a non-standard `aria-*` name, which Bootstrap keeps; the proof shows `aria-vendor` dropped, and the guide states it.

## `types.ts` changes (applied, owned declarations; the carried findings)
```diff
@@ -537,7 +537,7 @@ export interface PlacementInput {
-	/** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a popover tip, `hint` for a tooltip tip. Default: `manual`. */
+	/** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a Popover component's tip, `hint` for a tooltip tip. Default: `manual`. */
@@ -1577,11 +1577,11 @@ export interface TooltipOptions {
-		/** If `true`, pointer hover shows the tip; if `false`, it does not. Default: `true`. */
+		/** If `true`, pointer hover shows the tip; if `false`, it does not. Default: `true`, and `false` for a popover. */
-		/** If `true`, focus shows the tip; if `false`, it does not. Default: `true`. */
+		/** If `true`, focus shows the tip; if `false`, it does not. Default: `true`, and `false` for a popover. */
-		/** If `true`, a click toggles the tip; if `false`, it does not. Default: `false`. */
+		/** If `true`, a click toggles the tip; if `false`, it does not. Default: `false`, and `true` for a popover. */
@@ -1590,7 +1590,7 @@ export interface TooltipOptions {
-		/** Sets the markup the tip is built from, mirroring Bootstrap's `template` option. Default: Bootstrap's tooltip template. */
+		/** Sets the markup the tip is built from, mirroring Bootstrap's `template` option. Default: Bootstrap's tooltip template, and its popover template for a popover. */
@@ -1633,10 +1633,11 @@ export interface TooltipInterface {
-	 * @returns Resolves true after the `shown` event; false when the tooltip is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the tooltip is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the tooltip is disabled or has no content, the trigger is not connected to its document, a transition was in flight, a listener prevented `show`, or the tooltip is destroyed.
 	 * @remarks
-	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger
-	 * whose inline `display` is `none`; this contract resolves false there instead.
+	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap's `show` also runs
+	 * again while a transition is in flight; this contract resolves false there. Bootstrap throws for a
+	 * trigger whose inline `display` is `none`; this contract resolves false there instead.
@@ -1685,7 +1686,7 @@ export interface TooltipInterface {
-	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the tooltip is destroyed, or when the tip is shown and the rebuild's `show` is refused because the tooltip is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.
+	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the tooltip is destroyed, or when a shown tip's rebuild is refused because the tooltip is disabled or has no content, the trigger is not connected to its document or its inline `display` is `none`, a listener prevented `show`, or a transition is in flight.
```

## Shared and report-only patches
**Popover mirror of the carried findings (not applied; `Popover*` is outside the owned set):**
```diff
--- a/src/browser/types.ts   (PopoverInterface.show)
-	 * @returns Resolves true after the `shown` event; false when the popover is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the popover is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the popover is disabled or has no content, the trigger is not connected to its document, a transition was in flight, a listener prevented `show`, or the popover is destroyed.
 	 * @remarks
-	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger
-	 * whose inline `display` is `none`; this contract resolves false there instead.
+	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap's `show` also runs
+	 * again while a transition is in flight; this contract resolves false there. Bootstrap throws for a
+	 * trigger whose inline `display` is `none`; this contract resolves false there instead.
--- a/src/browser/types.ts   (PopoverInterface.fill)
-	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the popover is destroyed, or when the tip is shown and the rebuild's `show` is refused because the popover is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.
+	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the popover is destroyed, or when a shown tip's rebuild is refused because the popover is disabled or has no content, the trigger is not connected to its document or its inline `display` is `none`, a listener prevented `show`, or a transition is in flight.
```

**Unknown 3 proposal: `Placement.ts` (shared) with its types (not applied, not run):** retained as `j-tooltip-placement-arrow.patch.txt` beside this file. Its proof, for each side under the shipped cascade: the arrow's along-axis centre is within 1px of the trigger's, the arrow sits outside the facing edge, and destruction removes the arrow's inline declarations.

`tests/setupBrowser.ts` and `ROADMAP.md` need no change.

## Mutation table

The retained `j-tooltip-mutations.log.txt`: twenty-nine mutation rows each `EXACT` or `JOINED` over `Tooltip.test.ts` (27 cases), `validators.test.ts`, `parsers.test.ts`, and `index.test.ts`, the six `GREEN?` rows at 0 failed (Tooltip 27, NativeSanitizer 4, helpers 45, validators 28, parsers 24, index 3), the digests before and after equal, and `receipt: restored byte for byte`. An earlier run (`mutations-1.log.txt`) missed `the one timer is not cleared`; the hover case's show delay was lengthened and a return step added, and the row now reddens.

## Acceptance (`bash tmp/j-tooltip/acceptance.sh`, summary verbatim; full logs in `tmp/j-tooltip/acceptance-*.log.txt`)
```
chromium 153.0.8010.12
check exit=0 | npm run check:src:browser
lint exit=0 | npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
format exit=0 | npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
browser exit=0 | npm run test:src:browser
guides exit=0 | npm run test:guides
policy exit=0 | npm run test:policy
core exit=0 | npm run build:src:core
styles exit=0 | npm run build:src:styles
build exit=0 | npm run build:src:browser
conformance exit=0 | npm run test:conformance
setup exit=0 | npm run test:setup
```
Each command's result, verbatim:
- `check` and `lint` print only the command banners.
- `format`: `All matched files use the correct format.`
- `browser`: `Test Files  24 passed (24)` / `Tests  666 passed (666)`.
- `guides`: `Test Files  1 passed (1)` / `Tests  19 passed (19)`.
- `policy`: `Tests  109 passed | 1 skipped (110)`.
- builds: `✓ built in …` each.
- `conformance`: `Tests  22 passed (22)`.
- `setup`: `Test Files  4 passed (4)` / `Tests  281 passed (281)`.

The browser log carries one unhandled `DOMTokenList.toggle` error. It comes from `HostSnapshot.test.ts` "withdraws an overlapping earliest recording when its restoration throws inside a reaction", and the same error is in the earlier `browser-1.log.txt` run; it is not from the tooltip files.

Two further readings:
- The root `npx tsc --noEmit --project tsconfig.json` exits 0.
- I made no `prove` call, because the server is not reachable to a subagent.

## Deviation state
**Stopped: Unknown 3.** The Placement arrow patch is proposed in the preceding section, not implemented. The guide states that the arrow paints at a corner of the tip. Everything else is done.

Choices I made that you need to rule on:
- **D1 – unowned files created.** I created `src/browser/sanitizers/NativeSanitizer.ts`, its proof, and `isSanitizeTarget`. The brief's owned list omits them, and the distillate (which the brief says wins) and verdict R10 and R13 as amended (`j-engine-design-verdict.md:100`) assign them to J-TOOLTIP. Without the class, the default `sanitizer` and the declared `NativeSanitizerOptions` have no implementation. You can drop them if you rule otherwise.
- **D2 – contract over brief on disable.** `hide` still works while the tooltip is disabled, and a leave still hides the tip. The `hide` `@returns` in `types.ts` and Bootstrap both do this. TIP1 and TIP3 say to refuse `hide` when disabled; I followed the contract.
- **D3 – R9's letter cannot be met.** R9 says the hint's closing is bridged through a cancelable `beforetoggle`, but Chromium 153 dispatches the closing `beforetoggle` with `cancelable=false` (`probe-1.log.txt`). The platform closes the tip on Escape, on an outside click, and when another hint opens. The tooltip then runs its hide sequence, and if a listener prevents that hide it promotes the tip again. This contradicts R9, not the terrain record.
- **D4 – no move-back.** An element placed in a slot is moved in and not moved back on destroy. The brief says "moved in"; R10's "moved back on destroy()" clause is not implemented. The guide states it.
- **D5 – extra parsers.** I added `parseDelay` and `parsePosition` beyond TIP6's list, because the `delay` group and `placement.position` need attribute coercers. `buildTip` throws an `AppError` with the code `TIP_TEMPLATE_INVALID`.

Retained under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/tmp/j-tooltip/`:
- Instruments: `mutations.py`, `red.py`, `acceptance.sh`, `chromium.mjs`.
- Logs: `mutations.log.txt`, `mutations-1.log.txt`, `red.log.txt`, `acceptance*.log.txt`, `probe-1.log.txt`.
- The platform probe: `probe-platform.test.ts.txt`.
- The Placement proposal: `placement-arrow.patch.txt`.
