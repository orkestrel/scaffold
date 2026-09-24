# J-DROPDOWN — round 2 brief (successor to `j-dropdown-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-dropdown-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-dropdown-audit-verdict.md` reads `FAIL 2, 3, 5, 6, 7`. This brief carries each finding to one item and names its source beside it. Everything else in the round-1 brief binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the dropdown worktree so that every gate is green again and the round-2 instrument reddens every named case, including the new proofs red first.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown`, branch `unit/dropdown` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit. The Orchestrator's replay of your round-1 instrument ran in this tree before you resume and restored every byte (`j-dropdown-mutations-orchestrator.log.txt`).
- Sources, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-dropdown-audit-verdict.md` (the rulings), `j-dropdown-audit-objective-verdict.md` (claims 2, 3, 5, 6, 7: the vectors items A, B, C, and E rest on), `j-dropdown-audit-subjective-verdict.md` (claim 7, F1 to F5, Ref1 to Ref4, the bounds), `j-dropdown-audit-checker-verdict.md`. Read the three verdicts before editing.
- Rulings you implement rather than re-decide: D1 stands (engine-owned dismissal; `types.ts` gains no `hide(click?)` and no readable `dismiss`); D4 stands (`position: fixed`); D5 is replaced by item B; `entry` is a delegate-only key (item C); the disabled-toggle order is not a defect and stays; the § Delegation hunk stays out of your guide edits (W5 carries it).
- E16 (`../decisions.md`): one `disabled` reading for every route, Bootstrap's `isDisabled` semantics, lands as one helper in the landing rounds; do not add it here.

## Unknowns

- How `Placement` reports a cancelled promotion to its owner is fixed by item A (a thrown `AppError`); whether the code belongs in an existing error-code union in `types.ts` or `src/core` you settle as the unit did for `DROPDOWN_MENU_MISSING`, and report where.

## Items

**A. A cancelled promotion refuses the show (claim 2).** After `showPopover()`, `Placement` reads whether the element matches `:popover-open`; when it does not (a `beforetoggle` listener cancelled the opening), it restores every attribute and declaration it wrote and throws an `AppError` carrying `PLACEMENT_PROMOTION_REFUSED`. `Dropdown.#reveal` (or `show`, after item F) catches that code alone, drops the placement, and resolves `false` with no focus, no `aria-expanded`, no token, and no `shown.vn.dropdown`. Also read the door (`#holds(change, false)`) between destroying an old placement and constructing the new one. Red-first proof: a `beforetoggle` listener that calls `preventDefault()` on the opening; `show()` resolves `false`, the menu is not `:popover-open`, carries no `shown`, the toggle carries no `aria-expanded="true"`, no `shown` event fires, and the menu's inline style and the reference's `anchor-name` read what they read before. Instrument rows: "a cancelled promotion completes the show" and "the old placement is destroyed with no door".

**B. `PlacementOptions.signal` (claim 3; Ref1).** Add `signal?: AbortSignal` to `PlacementOptions` in `types.ts` (TSDoc in the form the other options use). `Placement` reads the signal after it writes the `popover` attribute and after `showPopover()` returns; when aborted at either read, it restores what it wrote and stops (no inline positioning, no anchor name, no observer, no listener). `Dropdown` passes its controller's signal. The guide's D5 sentence (the placement runs to completion) becomes the new behaviour. Red-first proof: a `beforetoggle` listener that destroys the dropdown, with a `MutationObserver` armed inside the listener over the menu and the reference: after `show()` resolves `false`, the observer recorded no attribute or style write after the destruction. Instrument row: "the placement ignores its signal".

**C. The key route (claim 5; F1; Ref4).** Entries pass `checkVisibility({ visibilityProperty: true })` (Bootstrap's `isVisible`); red-first proof with a `visibility: hidden` entry between visible ones. After `engine.hide()` on Escape, re-read the delegate's lifetime before `toggle.focus()`; red-first proof: a `hide.vn.dropdown` listener that destroys the delegate and focuses another connected control; the toggle takes no focus. Rewrite the nested-roots case so a prevented hide makes the key mark observable, and add the instrument row that drops the key mark. Add the listener-count row that drops the `keydown` `addEventListener` (the round-1 row changed the event name and kept the count). State on `DropdownOptions.selectors` and `DropdownSelectorMap` in `types.ts`, in the `ButtonOptions.selectors` form, that the delegate routes and navigates by the `trigger`, `entry`, and `navbar` selectors while a dropdown constructed directly matches with `menu` and `navbar` alone; keep the vocabulary case honest about which keys the engine reads. Add the departure that a dropdown constructed directly answers no key: the delegate carries Escape and the arrows.

**D. Sentences the source makes false (claim 7; F5; Ref2).** In `#### Dropdown`: scope the alignment sentence to the `up` token and the default downward case (a centered menu aligns neither edge); describe the cancelled promotion (item A) in the show paragraph and the "promotes every other menu" sentence; qualify the keyboard sentence by the visibility read; replace the D5 sentence with item B's behaviour; strike "and shifts" from the viewport-boundary departure; restore the commas of the sentence beginning "A click whose dropdown toggle is also its button host". The `Dropdown` class summary and its § Surface row: "Opens and closes a menu from its toggle, anchoring the open menu to its reference." The class `@remarks`: "a click or a Tab key release that the `dismiss` option allows hides it; a Tab release inside the menu never does." Apply the round-1 shared patch's `types.ts` and Methods-row hunks in the tree (`types.ts` is granted for items B, C, D, and F), rewording the two `@returns` so no token is given a faculty (the takeover is what the call reads).

**E. Instrument rows (claim 6).** Add rows that redden, by name: the positive offset case (reverse the returned pair), the invalid static-value case (accept an unknown display value), and the frozen `Placement` tables (unfreeze `PLACEMENT_DEFAULTS.offset`).

**F. Names and types (F2, F3, F4; the bounds).** Fold `#reveal`'s body into the `try` block of `show()`, keeping `#conceal(click)` as the whole hide that `hide()` and `#lightDismiss` call. Rename `#toggleOf` to a lookup name (for example `#locateToggle`) and `#toggles` to a name that says it returns a selector (for example `#toggleSelector`); rename `#refer` for what it resolves. Add `DropdownVocabulary` to `types.ts` (mirroring `CollapseVocabulary`, with its § Surface row) and type `Delegate.#dropdown` with it; declare a named readonly type in `types.ts` for the dismissal and placement defaults and annotate `DROPDOWN_DEFAULTS` with it.

Not yours: `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file, the § Delegation hunk (W5), the shared `disabled` helper (E16, the landing rounds), reconciling `computeNeighbor` with the Tab unit (the landing).

## Scope

Owned: `src/browser/Dropdown.ts`, `src/browser/Placement.ts`, `src/browser/Delegate.ts`, `src/browser/constants.ts`, `src/browser/parsers.ts`, `src/browser/validators.ts`, `src/browser/helpers.ts`, `src/browser/index.ts`, `src/browser/types.ts` (items B, C, D, F only), `tests/src/browser/Dropdown.test.ts`, `tests/src/browser/Placement.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/parsers.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/browser/index.test.ts`, `guides/veneer.md` (the Dropdown and Placement § Surface rows, the `DropdownInterface` and `DelegateInterface` Methods rows, the Dropdown fence, `#### Dropdown`, and the `plugin` row), `tmp/j-dropdown/**`. Off-limits: everything else. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument (`tmp/j-dropdown/mutations-2.py`, `tmp/j-dropdown/mutations-2.log.txt`, every round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the names items C and F ask for within their constraints, the fixtures of the new proofs, the instrument row titles, where each new case sits, and where the new error code is declared. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
