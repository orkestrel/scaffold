# J-DROPDOWN round 4 (the landing round) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the dropdown worktree, briefed by `j-dropdown-brief-4.md`; 45 tool uses, 780 s; retained verbatim from the subagent's return; the merge of Veneer `main` `7dd4e17` into `unit/dropdown` was left open for the Orchestrator to commit after its replay; the instrument is `j-dropdown-mutations-4.py` with `j-dropdown-mutations-4.log.txt`, the gates `j-dropdown-acceptance-4.log.txt`, the status `j-dropdown-4-status.txt`)

The merge is resolved in the dropdown worktree and nothing is committed. All 13 conflicted files are resolved and staged (`git diff --name-only --diff-filter=U` prints nothing). One delegate now carries all six entities. Every gate in the chain exits 0, and `mutations-4.py` ran in full: all 103 rows EXACT or JOINED, ending `receipt: restored byte for byte`. I made no `prove` call; the server is not reachable from a subagent. There was no install, commit, or discarding git command.

## Conflict resolution per file
| File | Resolution |
|---|---|
| `src/browser/constants.ts` | Imports merged alphabetically. The Alert, Tab, and ScrollSpy tables come first, then the Dropdown and Placement tables. |
| `src/browser/index.ts` | Order: Alert, Tab, ScrollSpy, then Placement, Dropdown, Delegate. |
| `src/browser/parsers.ts` | Rebuilt as `main`'s file plus the `DropdownOptions` import, with `parseDismiss`, `parseOffset`, and `parseStatic` appended. Git's hunk alignment had split `parseThreshold`. |
| `src/browser/validators.ts` | Import list merged; `isDropdownEvent` sits after `isScrollSpyEvent`. |
| `src/browser/types.ts` | `AlertVocabulary` and `TabVocabulary` first, then `DropdownVocabulary`. `DelegateOptions.root` and `DelegateInterface.destroy` take `main`'s wording, which includes the scrollspies. |
| `src/browser/helpers.ts` | `main`'s `computeNeighbor` kept (same signature) and mine deleted. `isDisabled` and `readControls` kept. |
| `tests/src/browser/helpers.test.ts` | `main`'s neighbor cases kept and mine deleted. I kept one case of mine, because `main`'s cases lack that reading: "returns the one member of a single-member list without wrap, in both directions". |
| `tests/src/browser/index.test.ts` | Tab and Dropdown vocabulary type rows both kept. The export list is the sorted union, 71 names. |
| `tests/src/browser/parsers.test.ts`, `validators.test.ts` | `main`'s file with the dropdown `describe` blocks appended and the imports merged. |
| `tests/src/browser/Delegate.test.ts` | `main`'s file with my 13 dropdown cases appended. `main`'s listener-count case (click and key listener, once each) replaces mine. I added one case: "leaves a key the tab route took to the tab route alone, driving no dropdown for a tab entry inside a menu". |
| `guides/veneer.md` | The `DelegateInterface` Methods row takes `main`'s text. The Dropdown fence follows the ScrollSpy fence, and `#### Dropdown` follows `#### ScrollSpy`. The Alert, Tab, ScrollSpy, and Dropdown `plugin` rows all read `shipped` with their `tests/src/browser/*.test.ts` Proof paths. |

## Delegate fold (`src/browser/Delegate.ts`, rebuilt from `main`'s landed file)
- **Kept and widened:**
  - `#driven`, `#mark`, `#owned`, `#acquire`, and `#construct` all cover Button, Collapse, Alert, Tab, ScrollSpy, and Dropdown.
  - `#discard` reads every registry.
  - The one `#conflicts` also counts the dropdown toggle, reached through `#closest`, when it is not disabled and `Dropdown.find` returns nothing.
  - `#activate` runs every click route; `#routeDropdown` is last.
  - `#dropdown` is typed `DropdownVocabulary`.
- **Deleted from my side:** `#within` (folded into `#closest`), `#toggleSelector`, my `#acquire`-based construction path (routes now use `#construct(...)?.`), my `#press` body, and my `computeNeighbor`.
- **Key-route order: tab first.** `#press` runs `#routeTabKey`, which now returns whether it took the key, and runs `#routeDropdownKey` only when it did not. Bootstrap's tab handler sits on the control and stops propagation, so its document-level dropdown handler never hears a key a tab control took. The new Delegate case proves this, and the instrument row "the dropdown route runs after the tab route took the key" reddens it.
- **Disabled reading:**
  - The click route, `#locateToggle` (for the toggle itself and each sibling or parent candidate), and `#conflicts` now read `isDisabled(element, classes.disabled)` from `helpers.ts`, per E16.
  - The entries filter keeps the selector `:is(entry):not(.disabled, :disabled)`. That is Bootstrap's `SELECTOR_VISIBLE_ITEMS`, the reading Bootstrap applies to entries; `isDisabled` is Bootstrap's reading for triggers.
- **Class remarks:** `main`'s description is kept. My dropdown text is added: the click route, the dropdown keyboard (for keys the tab keyboard leaves alone), the dropdown toggle in the conflict set, the once-per-key rule under nested roots, and the light-dismissal note.
- **One guide qualifier:** the `#### Dropdown` keyboard sentence now reads "…that the tab route leaves alone…", so it stays true under the new order.

## The bound sentence (item C), as written
Added at the end of the restoration paragraph under `#### Dropdown`:

> A `destroy` call made from a custom element's reaction to one of that restoration's own attribute writes returns before the restoration's remaining writes land, because a nested call on the shared snapshot restores only the records saved since; J-SNAPSHOT-SHARED closes that bound.

No mechanism changed, and `HostSnapshot.ts` is untouched.

## Gates (`tmp/j-dropdown/acceptance-4.sh`, logs in `tmp/j-dropdown/acceptance-4/`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 | tables re-padded |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | 0 | 15 files, 407 passed (plus the expected `HostSnapshot` `SyntaxError` diagnostic) |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm run build:src:core` / `build:src:styles` / `build:src:browser` | 0 / 0 / 0 | |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run test:setup` | 0 | 281 passed |

## Instrument (`tmp/j-dropdown/mutations-4.py` → `tmp/j-dropdown/mutations-4.log.txt`, one full run)
- **Rows:** 103, which is every round-3 row plus 1 new; all EXACT or JOINED.
- **Re-anchored to the merged `Delegate.ts`:**
  - "the dropdown route prevents nothing"
  - "a disabled toggle is routed" (now drops the two `isDisabled` reads)
  - "a key inside a menu looks after the menu alone" (the `PREVIOUS_TOGGLE` text)
  - "the dropdown mark is dropped"
  - "the dropdown toggle joins no conflict"
  - "the key mark is dropped"
- **Re-anchored to the merged `validators.ts`:** "the event guard admits a payload-less event" and "the dropdown event guard reads detail uncontained". The tab guard shares their lines, so each anchor now reaches the next line.
- **Re-aimed at `main`'s shared `computeNeighbor` and its cases** (my cases went with my deleted declaration):
  - "the neighbour never wraps" → "…wrapping past either end when wrap is true"
  - "the neighbour of an absent member is always the first" → "returns an end member for a current value outside the list"
  - "the neighbour is not clamped" → "stays on the end member when wrap is false"
- **New row:** "the dropdown route runs after the tab route took the key".
- **`GREEN?` rows, all 0 failed:** Dropdown 32, Placement 16, Delegate 80, validators 18, parsers 13, helpers 39, index 3.
- **Receipt:** `receipt: restored byte for byte`.

## `git status --short` (the unit's paths; all staged)
```
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
A  src/browser/ScrollSpy.ts
A  src/browser/Tab.ts
M  src/browser/constants.ts
M  src/browser/helpers.ts
M  src/browser/index.ts
M  src/browser/parsers.ts
M  src/browser/types.ts
M  src/browser/validators.ts
A  tests/src/browser/Alert.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/ScrollSpy.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/parsers.test.ts
M  tests/src/browser/validators.test.ts
```
The full status has 88 staged entries: the merge's own additions and modifications from `main`, plus these. Nothing is unstaged or unmerged.

## Deviation state
No stop condition was met. `Dropdown.ts`, `Placement.ts`, `HostSnapshot.ts`, and every other off-limits file are unchanged. I settled these myself, within the brief:
- The tab-first key order.
- The entries filter keeping its selector.
- The bound sentence at the end of the restoration paragraph.
- One qualifier on the keyboard sentence, so it stays true under the tab-first order.

One change reaches `main`'s code: `#routeTabKey` now returns a boolean saying whether it took the key. Its behaviour is unchanged, and the Tab suites pass.
