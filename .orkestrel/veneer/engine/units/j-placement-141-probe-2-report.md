# J-PLACEMENT-141-PROBE-2 — the writer's report (opus on Opus 5.5, 2026-09-25)

The probe file is written and ran green three times on Chromium 153. The brief's run command could not load the file, so I ran it through a config of my own inside the owned `tmp/j-placement-141/` directory (Deviation 1 below).

**File:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b/tmp/probe/j-placement-141-probe-2.test.ts`
**SHA-256:** `2f07fa2765295955a17cf91e2d85577e14a0503417c20f1f77b3edd0b207b163`

## Variant table

Every variant keeps the `baseline` preparation, including the trusted pre-show click. Each one runs on a fresh fixture under `candidate` and `always`, with full clipping, partial clipping, and restoration. Each then takes the trusted Escape, `hide()`, and a second show that gets the same clip and restore readings.

| Variant | Preparation | Emulates |
| --- | --- | --- |
| `baseline` | none | the unfixed engine; the first probe's `ROUND3` pin still applies |
| `tokenFirst` | a `show.vn.dropdown` listener adds the menu's `show` token before the placement runs, with no layout read, on every show | design A |
| `tokenFirstLayout` | the same listener, plus a `menu.offsetWidth` read after the token | `display` done through the token |
| `deferAnchor` | runs by hand outside `Dropdown`, in this order: promotion while hidden, focus, `aria-expanded`, both tokens, then the closing update reads `checkVisibility()` and `getBoundingClientRect()` and writes the anchoring for the first time | the deferred design, in the order the analyst's proposal keeps |
| `display` | copied unchanged from the first probe | the reading both builds already hold, kept as a comparison (my addition) |
| `missingAnchor` | copied unchanged: `position-anchor` points at a missing name after the first show | negative control |

**Controls:**
- Carried over: `control.V.hitTest`, `control.baseline.round3.chromium<major>` (the `141` pin stays `[2,2,2]`), `control.baseline.always.full.clippedHitIsOverlay`, `control.missingAnchor.lost` (first show only), and `control.coverage`.
- Added, to check that each vector actually reached the engine:
  - `control.shows.resolved`: every show in every run returned `true`.
  - `control.tokenFirst.beforePromotion`: every token write found the token absent and the menu not yet promoted.
  - `control.deferAnchor.renderedBeforeAnchoring`: the menu was not rendered at promotion, and the anchoring was written first by the show's closing update, with the menu rendered, `display: block`, and no earlier inline `position-anchor`.

## Chromium 153 runs (HeadlessChrome/153.0.8010.12)

All three runs printed identical variant lines. Each exited 0 with `Tests 8 passed (8)`, in 36.51s, 36.61s, and 36.92s. Every `CONTROL` line read `ok`, and no run printed `VOID`.

```
VARIANT baseline pass=true anchored=true
VARIANT baseline.second pass=true anchored=true
VARIANT tokenFirst pass=true anchored=true
VARIANT tokenFirst.second pass=true anchored=true
VARIANT tokenFirstLayout pass=true anchored=true
VARIANT tokenFirstLayout.second pass=true anchored=true
VARIANT deferAnchor pass=true anchored=true
VARIANT deferAnchor.second pass=true anchored=true
VARIANT display pass=true anchored=true
VARIANT display.second pass=true anchored=true
VARIANT missingAnchor pass=false anchored=false
VARIANT missingAnchor.second pass=true anchored=true
```

- `baseline` reproduced the first probe: `control.baseline.round3.chromium153 ok`, actual `[283,182,283]` and `[283,212,283]` under both rules.
- `missingAnchor` still fails to anchor on the first show.
- Its second show anchors because destroying the placement restores `position-anchor`.
- The logs are `tmp/j-placement-141/run-1.log.txt`, `run-2.log.txt`, and `run-3.log.txt` in the worktree.

## `deferAnchor` declarations and their `Placement.ts` sources

The probe computes each value from `Placement`'s own expressions. It uses the options `Dropdown` `#place` passes: position `bottom-start` from `#position`, and offset `[0, 2]` from `DROPDOWN_DEFAULTS.placement.offset`.

| Target | Property | Value | Source |
| --- | --- | --- | --- |
| promotion | `popover` attribute, `showPopover()`, write-back of changed `POPOVER_PROPERTIES` | `manual` | `Placement.ts:130-133`, `:138`, `:160-165` |
| menu | `position` | `fixed` | `:167` |
| menu | `top`, `right`, `bottom`, `left` | `auto` | `:168` |
| menu | `margin-top` | `2px` | `:169` |
| menu | `margin-right` | `0px` | `:170` |
| menu | `margin-bottom` | `0px` | `:171` |
| menu | `margin-left` | `0px` | `:172` |
| menu | `position-anchor` | `--vn-probe-deferred-<n>` | `:173`, name as at `:166` |
| menu | `position-area` | `bottom span-right` | `:174`, `PLACEMENT_AREAS` at `:107` |
| menu | `position-try-fallbacks` | `flip-block` | `:175`, `tries` at `:112-119` |
| menu | `position-try-order` | `normal` | `:176` |
| reference | `anchor-name` | the anchor name (computed was `none`) | `:177-178` |
| menu | `data-popper-placement` | the measured side | `:200-216`, also on scroll end and on resize |

The brief's unknown is answered by the run. `deferAnchor` produced the same menu inline style as the engine's `baseline`, apart from the generated name: `overflow: visible; position: fixed; inset: auto; margin: 2px 0px 0px; position-anchor: …; position-area: span-right bottom; position-try: flip-block;`. The `side` attribute also matched (`bottom`). The brief's list left out `position` and `position-try-order`. I included both because the analyst's proposal defers everything from `:166` on.

## `git status --short`

The command printed nothing and exited 0, so no tracked file changed. Everything I wrote sits under the ignored `tmp/` directory.

## Deviation state

The unit is complete. I resolved three choices inside the owned scope; you need to act on the fourth item.

1. **The brief's command cannot run in this worktree.** `vite.probe-worktree.config.ts` imports `srcBrowser` from `tmp/worktrees/probe/vite.config.ts`, so `@src` resolves into that worktree's sources at `21c821a`. Vite then refuses the run: `Resolved dependencies must remain inside their physical package root` (log: `tmp/j-placement-141/brief-config-run.log.txt`). My config `tmp/j-placement-141/vite.probe-141b.config.ts` is that file with only the import pointed at `probe-141b`, so `@src` resolves to `d33b27c`. The runs used `tmp/j-placement-141/run-probe-2.sh`.
2. **`tokenFirst` adds the token inside the `show.vn.dropdown` dispatch, not before `show()` is called.** A token added before the call makes `Dropdown.show` refuse at `#refused(true, true)`. The run confirms this: `ROW D.tokenBeforeCall {"result":false,"open":false,"popover":null,"events":[]}`. A `show` listener that adds the token is the engine's documented agreement path. It still writes the token before the promotion, which `control.tokenFirst.beforePromotion` confirms.
3. **`display` is my addition.** It gives the 141 run a variant that anchored there in the first probe.
4. **For the styles session:** its checkout must carry `d33b27c`'s `Dropdown`. At `21c821a`, `show` re-reads the refusal after the `show` dispatch. From reading the source (I did not run this), that would refuse both token variants. `control.shows.resolved` would then fail and the run would print `VOID`. Its config must also resolve `@src` to its own checkout.
