# J-POPOVER — the writer's report (opus on Opus 5.5, native; retained verbatim from its final message, 2026-09-24)

Every obligation POP1–POP7 closed; the final acceptance chain green on Chromium 153.0.8010.12; every mutation row reddens its named case. No stops, no shared-file patch. One ruling to audit first: `Tooltip` is now generic, `Tooltip<TOptions>`, forced by a lint refusal (Unknowns). Worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/popover`; logs under its `tmp/j-popover/`.

## Files touched

- `src/browser/Popover.ts` (new) — `Popover extends Tooltip<PopoverOptions>` with a static `profile` (the popover name, the `POPOVER_*` tables, `isPopoverEvent`, `manual`); no constructor.
- `src/browser/Tooltip.ts` — the profile seam (the constructor reads `new.target.profile`; per-profile registry, codes, and id prefix; descendants from the constructing class; the body slot); POP6 (`#place(change, tip)` passes `owned`); POP7 (one release site, B5; `#occupy(change, …)`, B6); the TSDoc bound paragraph replaced.
- `src/browser/Placement.ts` — reads `options.owned` after the promotion; a failed read destroys and returns.
- `src/browser/types.ts` — `PlacementOptions.owned`, `TooltipDefaults`, `TooltipProfile`; the `show` bound sentence deleted; the `Popover*` mirror.
- `src/browser/constants.ts` — `TOOLTIP_DEFAULTS` typed `TooltipDefaults`; `POPOVER_EVENTS`, `POPOVER_CLASSES`, `POPOVER_ATTRIBUTES`, `POPOVER_SELECTORS`, `POPOVER_TEMPLATE`, `POPOVER_DEFAULTS`.
- `src/browser/validators.ts` — `isPopoverEvent`. `src/browser/index.ts` — the `./Popover.js` row.
- `tests/src/browser/Popover.test.ts` (new) — the POP1, POP2, registry, descendant, guard, vocabulary, and leak cases.
- `tests/src/browser/Tooltip.test.ts` — the promotion case asserts the closed behaviour; the rebuild-dispatch case pins the old placement left unrestored.
- `tests/src/browser/Placement.test.ts` — the owner-door case. `tests/src/browser/validators.test.ts`, `tests/src/browser/index.test.ts` — the guard rows and the barrel names.
- `guides/veneer.md` — the Surface rows, an Examples fence, the POP6 sentences in `#### Tooltip`, `#### Popover`, the plugin row `shipped` with Proof `tests/src/browser/Popover.test.ts` (Obligation unchanged).

## Obligations, cases, readings

- **POP1 / POP2** — nine cases in `Popover.test.ts`, including "toggles a header-and-body tip on a click, promoted as a manual popover to the right of its trigger at the popover offset, under the popover events and ids"; "fills the header from the title and the body from the content, the constructor over the attributes, and removes an empty header or body"; "claims a trigger under its own profile beside a tooltip, refuses a second popover, and reports each error under the popover name"; "drives a popover for each matching descendant from the container on a click"; "reads no content attribute and no content option for a tooltip, whose profile has no body slot". Red (a `Popover` shell inheriting the tooltip profile): `Tests  7 failed | 2 passed (9)`. Green: `Tests  9 passed (9)`.
- **POP6 (red first)** — `Tooltip.test.ts -t unpromoted and unpositioned`: `AssertionError: expected true to be false`, `Tests 1 failed | 55 skipped (56)`; `Placement.test.ts -t reads its owner door once`: `AssertionError: expected [] to deeply equal [ [ true ] ]`, `Tests 1 failed | 18 skipped (19)`. Green: `1 passed | 55 skipped (56)` and `1 passed | 18 skipped (19)`.
- **POP3** — applied against the landed `TooltipInterface` wording ("a change was in flight"; the `fill` refusal "or a change is in flight, writing nothing"); also the `hide` remarks and the event-map sentences; `PopoverEventMap.hide` keeps "prevention refuses the hide" (a `manual` tip has no platform close).
- **POP4** — `test:guides` 20; conformance and setup green.
- **POP5** — `tmp/j-popover/mutations.py` (retained as `j-popover-mutations.py`); log retained as `j-popover-mutations.log.txt`.
- **POP7** — B5 and B6 by restructure (suites green, rows still redden); B11: `TooltipDefaults` added, `TOOLTIP_DEFAULTS` and `POPOVER_DEFAULTS` typed with it; `generateId` not adopted (Unknowns).
- **Promotion-bound grep** — `grep -rn "one interval\|promoted and positioned\|until destruction restores the placement" guides/veneer.md src/browser/types.ts src/browser/Tooltip.ts` → exit 1.

## Unknowns

1. **Profile seam** — a public static frozen `profile: TooltipProfile` per class (name, events, guard, the three default tables, `TooltipDefaults`, popover value); the constructor's first read is `new.target.profile`. Registries in a private static `WeakMap` keyed by profile, each with `{NAME}_HOST_OWNED`; `static find` reads `this.profile` (an unbound call throws). A body slot exists when the profile's tables name `content`; the engine reads options through a widening assignment to `PopoverOptions` (sound, no cast). Descendants constructed from `new.target`, held in `#class`. Profiles are class statics, not `constants.ts` rows (R12 names a static member read through `new.target`; the record carries a guard function; a `TOOLTIP_PROFILE` row was outside the owned constants). **Audit first:** oxlint's `no-useless-constructor` refused a pass-through `Popover` constructor under `--deny-warnings`, so `Tooltip` became `Tooltip<TOptions extends TooltipOptions = TooltipOptions>` with `options?: NoInfer<TOptions>`; a throwaway type probe (deleted) confirmed `new Popover(h, { content })` compiles, `new Tooltip(h, { content })` and a misspelt key are refused, and a `PopoverOptions` variable passed to `Tooltip` compiles.
2. **Door** — `PlacementOptions.owned`: "The door describes the owner's hold on the element across the placement's construction, a lifetime read like `signal`, not a fact about the elements `PlacementInput` names."
3. **`generateId`** — not adopted; `#identify` stays. It is the one site generating an id no element of the owner document carries; `Placement`'s `static #count` names a CSS anchor (`--vn-placement-N`) that must be unique among placements and reads no document.

## Search bound

`tmp/j-popover/search-1.txt` and `search-2.txt` (grouped by file in the writer's message).

## `types.ts` changes

The import adds `Guard`; `PlacementOptions.owned?: () => boolean` ("Reports whether the owner still holds the element, read after the promotion returns and before the first positioning write; when it returns `false`, the placement hides the element, restores what it wrote, writes nothing more, and leaves the element where it is. Default: the owner holds the element throughout."); `TooltipDefaults` (animated, delay {show, hide}, trigger {hover, focus, click}, html, tip {template}, placement {position, offset, fallbacks}); `TooltipProfile` (name, events, guard, classes, attributes, selectors, defaults, popover `'manual' | 'hint'`); the `TooltipInterface.show` remark's bound sentence replaced by "A listener to the platform's opening `beforetoggle` event that moves the tip during the promotion also stops the placement, which hides the tip and restores what it wrote, leaving the tip where the listener put it."; the `PopoverEventMap` mirror (`shown`, `hide`, `hidden`, `inserted`); `PopoverSelectorMap.arrow` (default `.popover-arrow`); `PopoverInterface.show` `@returns` and remarks, `hide` remarks, and `fill` `@returns` mirrored. The exact hunks are in `j-popover.diff`.

## Mutation table (`tmp/j-popover/mutations.log.txt`, final run)

Every row reddens (JOINED or EXACT) its named case: the profile names, events, guard, class tokens, attribute names, selectors, defaults, and popover value; the engine reading the tooltip profile for every class; one registry for every profile; the id prefix; the descendant class; the hint promotion; the body slot; the content attribute; the empty slot; the click default; the offset; the placement's owner door (tooltip and placement); the tooltip supplying no door; the rebuild dispatch reading no container (EXACT; the token case stays green); the popover guard; the barrel. Control: the dropdown reads no owner door, HELD (0 failed of 35). Green: Popover 9, Tooltip 56, Placement 19, Dropdown 35, helpers 61, validators 32, index 3. Digest after identical; receipt `restored byte for byte`.

## Acceptance (`tmp/j-popover/acceptance.sh`, final run)

Chromium 153.0.8010.12; typecheck, lint, format exit 0; `test:src:browser` 811 passed (26 files); `test:guides` 20; `test:policy` 109 passed, 1 skipped; the three builds exit 0; `test:conformance` 26; `test:setup` 319; `check` exit 0.

Observations: an earlier acceptance run collided with the writer's own instrument run (5 failed of 811; retained as `acceptance-collided*.log.txt`), green when re-run alone; an unhandled `DOMTokenList.toggle` error printed by the deliberate throw in the off-limits `HostSnapshot.test.ts` case, exit 0; the policy skip is the vendored `it.skipIf`; no `prove` call.

## Status

`M` guides/veneer.md, src/browser/Placement.ts, src/browser/Tooltip.ts, src/browser/constants.ts, src/browser/index.ts, src/browser/types.ts, src/browser/validators.ts, tests/src/browser/Placement.test.ts, tests/src/browser/Tooltip.test.ts, tests/src/browser/index.test.ts, tests/src/browser/validators.test.ts; `??` src/browser/Popover.ts, tests/src/browser/Popover.test.ts. The guide carries most of the diff (the formatter reflowing the Surface table).

## Deviation state

No stops. Rulings recorded: profile records as class statics; the generic `Tooltip<TOptions>` in place of the refused pass-through constructor (a change to the public class signature, for the audit); the host-invalid message reads "The tooltip requires an HTMLElement host" (code unchanged); the `NativeSanitizer` import and default line byte-identical to the base (J-SANITIZER coordination); B7, B8, B10, and `#### Placement` untouched as briefed.
