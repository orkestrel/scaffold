# J-DROPDOWN round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the same worktree, 58 tool uses, 1323 s; retained verbatim from the subagent's return; the tree is the worktree `veneer/tmp/worktrees/dropdown` on `unit/dropdown` from `e24e2c3`, uncommitted, `main` not merged)

Round 2 is done in the worktree and every gate in the brief's order exits 0. The instrument's full run reddens each of its 97 rows' named case and ends `receipt: restored byte for byte`. Three round-1 rows changed what they bind or mutate; see "Rows retargeted" before you rule on it. No call was made to the `prove` MCP server, because it is not reachable from a subagent.

## Files touched (worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown`)

| File | Round-2 change |
|---|---|
| `src/browser/Placement.ts` | Adds the `signal` option. It reads the signal after the `popover` write and after `showPopover()`, and a destroyed placement writes nothing more. A refused promotion restores what it wrote and throws `PLACEMENT_PROMOTION_REFUSED` (with `cause` when `showPopover()` itself threw). |
| `src/browser/Dropdown.ts` | Folds `#reveal` into `show()`. Adds a door after restoring a leftover placement and `#place()`, which catches only `PLACEMENT_PROMOTION_REFUSED` and returns `undefined`. Passes its signal to the placement. `#refer` becomes `#resolveReference`. `destroy()` now releases the claim before the abort, and the abort restores the placement. Summary and `@remarks` rewritten as the brief asked. |
| `src/browser/Delegate.ts` | `#dropdown` is typed `DropdownVocabulary`. Entries use `checkVisibility({ visibilityProperty: true })`. The lifetime is re-read before the Escape focus. `#toggleOf` becomes `#locateToggle` and `#toggles` becomes `#toggleSelector`. |
| `src/browser/types.ts` | Adds `DropdownVocabulary`, `DropdownDefaults`, and `PlacementOptions.signal`. States the delegate-only keys on `DropdownSelectorMap` and `DropdownOptions.selectors`. Applies the round-1 hunks for `DelegateOptions.root` and `DelegateInterface.destroy`, and rewords both `@returns` so the takeover is what the call reads. |
| `src/browser/constants.ts` | `DROPDOWN_DEFAULTS` is now typed `DropdownDefaults`. |
| `tests/src/browser/Dropdown.test.ts` | Three new cases. One refocus assertion added to the focus/promotion case. The `entry` key is dropped from the engine vocabulary case. The `as const` tables are replaced with typed declarations. |
| `tests/src/browser/Placement.test.ts` | Two new cases. One case title renamed (`once` → `after`). |
| `tests/src/browser/Delegate.test.ts` | Adds the Escape-lifetime case and a `visibility: hidden` entry. Rewrites the nested-roots case around a prevented hide. The replaced-selector case now navigates by `entry`. Listener case retitled; `as const` removed. |
| `tests/src/browser/parsers.test.ts` | Two titles made distinct (they were identical). |
| `tests/src/browser/index.test.ts` | Adds an `expectTypeOf` row for `DropdownVocabulary`. |
| `guides/veneer.md` | § Surface: the `Dropdown` and `DropdownSelectorMap` rows, plus new `DropdownDefaults` and `DropdownVocabulary` rows. The `DelegateInterface` Methods row. Every item-D edit in `#### Dropdown`. |

## Items: red and green readings

**Red.** Command:
`npm run test:src:browser -- tests/src/browser/Dropdown.test.ts tests/src/browser/Placement.test.ts tests/src/browser/Delegate.test.ts`
It ran with the new proofs in place and no source changes.
```
 FAIL  … Delegate.test.ts:1094:2 > Delegate > opens the menu on a trusted arrow key from its toggle and moves focus among the enabled visible entries, wrapping only from outside them
 FAIL  … Delegate.test.ts:1177:2 > Delegate > focuses no toggle after Escape when a listener to the hide destroys the delegate
 FAIL  … Dropdown.test.ts:1121:2 > Dropdown > refuses the show when a listener cancels the menu promotion, keeping nothing it wrote and dispatching no shown event
 FAIL  … Dropdown.test.ts:1161:2 > Dropdown > writes nothing after a listener to the menu promotion destroys it, resolving false
 FAIL  … Dropdown.test.ts:1193:2 > Dropdown > reads its lifetime after restoring the placement a taken-over show left, writing nothing more when that restoration destroys it
 FAIL  … Placement.test.ts:462:2 > Placement > restores what it wrote and throws the promotion-refused code when a listener cancels the promotion
 FAIL  … Placement.test.ts:487:2 > Placement > restores what it wrote and stops when its signal aborts inside the promotion, and destroys itself when the signal aborts later
 Test Files  3 failed (3)
      Tests  7 failed | 83 passed (90)
```
The rewritten nested-roots case and the delegate `entry`-navigation assertion passed before the fix, because both mechanisms already existed. Their bindings are rows 90 and 92.

**Green.** `npm run test:src:browser` reports `Test Files 12 passed (12)`, `Tests 272 passed (272)`.

Rows below are numbered by `mutations-2.log.txt` line.

- **A.** Pinned by the refused-show case, the Placement refused-code case, and the leftover-placement door case. Rows 82–85: a cancelled promotion completes the show; the placement reports no cancelled promotion; the dropdown lets the refused promotion escape; the old placement is destroyed with no door. The new code is declared inline in `Placement.ts`, the way `DROPDOWN_MENU_MISSING` is, because no error-code union exists in `types.ts` or `src/core`.
- **B.** Pinned by "writes nothing after a listener to the menu promotion destroys it" and the Placement signal case. Rows 86 and 87. Probe reading: removing `popover` inside `beforetoggle` makes `showPopover()` throw `NotSupportedError`. `Placement` catches that and, finding its signal aborted, stops without writing anything more.
- **C.** Rows 88–92: the visibility property, the Escape lifetime, the key mark, the listener registration dropped outright, and delegate `entry` navigation. The no-key departure is in the guide and the class `@remarks`. `DropdownSelectorMap` states the keys accurately: the delegate routes by `trigger` and `menu` and moves focus by `entry`; a dropdown constructed directly reads only `menu` and `navbar`. That wording departs from the brief's "trigger, entry, and navbar": the delegate never reads `navbar` itself, and it does read `menu`.
- **D.** All the listed sentences, the class summary and its § Surface row, and the `@remarks` Tab rule are done. `test:guides` passes 19 of 19. As briefed, the § Delegation and Compatibility hunks from the round-1 patch are not applied.
- **E.** Rows 93–95. I added four rows beyond the brief's three for gaps the round-1 audit named: update forwarding (96), a later signal abort (97), hint mode (98), and the refused-code escape (84).
- **F.** `#reveal` is folded into `show()`, the renames are done, `DropdownVocabulary` and `DropdownDefaults` are added, and no `as const` remains in `src/browser` or `tests/src/browser`.

## Instrument
`tmp/j-dropdown/mutations-2.py` writes `tmp/j-dropdown/mutations-2.log.txt` (retained as `j-dropdown-mutations-2.py` and `j-dropdown-mutations-2.log.txt`). It keeps all 80 round-1 rows, with their source texts updated to the round-2 code, and adds 17 rows. The final full run:
- every one of the 97 rows is EXACT or JOINED;
- all 7 `GREEN?` rows show 0 failed (30, 15, 45, 12, 9, 34, and 3 cases);
- digests match before and after: `receipt: restored byte for byte`.

**Rows retargeted.** The first full run (`mutations-2-first-run.log.txt`, retained as `j-dropdown-mutations-2-first-run.log.txt`) missed three rows. I changed them as follows:
- **"destruction leaves the placement".** The placement now restores itself through the signal, so the explicit `placement?.destroy()` in `destroy()` was dead and I removed it. The row now drops the signal from `#place()`, and it reddens the same destruction case.
- **"the show dispatch is not followed by a read".** Its round-1 named case now also stops at the new door, so that case no longer tells the mutant apart. It is renamed to the nested-show case, which does.
- **"the placement door is not read".** It now removes the door after assigning the placement. The focus/promotion case gained an `activeElement` assertion that reddens it.

## Acceptance (logs in `tmp/j-dropdown/acceptance-2/`, run by `acceptance-2.sh`, retained as `j-dropdown-acceptance-2.sh`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | — |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | — |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | 0 | 12 files passed, 272 tests passed |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm run build:src:core`, `build:src:styles`, `build:src:browser` | 0 each | — |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run test:setup` | 0 | 267 passed |

The tree typecheck `npx tsc --noEmit --project tsconfig.json` also exits 0.

## Status and diffstat
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 A src/browser/Dropdown.ts
 A src/browser/Placement.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Dropdown.test.ts
 A tests/src/browser/Placement.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
 17 files changed, 3642 insertions(+), 47 deletions(-)
```

## Deviation state
- D1 and D4 stand as ruled, and item B replaces D5.
- **`Dropdown.destroy()` order changed.** It now releases the claim, then aborts; the abort restores the placement through the signal, then the dropdown's own snapshot is restored. This keeps the rule that the claim goes before any restoration.
- **Placement signal reads.** `Placement` reads its signal only at the two points the brief names. A placement constructed with an already-aborted signal writes the `popover` attribute and then restores it; the dropdown's new door keeps that path unreachable. `#write` and the observer and listener registration also skip once the placement is destroyed.
- **Carried to the landing:** `computeNeighbor` in `helpers.ts` still duplicates the Tab unit's; reconciling them is the landing's job.
- No commit, merge, install, or discarding git command was run.

---

The Orchestrator's retention note: the review evidence for this round is `j-dropdown-2.diff` and `j-dropdown-2-status.txt`, captured by `w2-gates.sh dropdown 2`, whose log is `j-dropdown-gates-2.log.txt`.
