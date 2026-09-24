# J-TAB round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the same worktree, 62 tool uses, 1182 s; retained verbatim from the subagent's return; the tree is the worktree `veneer/tmp/worktrees/tab` on `unit/tab` from `e24e2c3`, uncommitted, `main` not merged)

## J-TAB round 2 report

All eight items are closed in the tab worktree and every acceptance command exits 0. The instrument's full run reddens all 84 rows' named cases and ends `receipt: restored byte for byte`. Item A adds one behaviour you did not ask for: a list whose markup marks two controls `active` now never swaps. It is documented, proven, and flagged under Deviation state.

### Files touched (worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab`, uncommitted, `main` not merged)
- `src/browser/Tab.ts`:
  - **A:** every door reads that no other control of the list is `active`.
  - **E:** uses `readControls`; `#controls` is deleted.
  - **H:** the door parameters are `host`/`pane`, and `#select` takes `control`. Renames: `#record`→`#save`, `#planRoles`/`#writeRoles`→`#planInitial`/`#writeInitial`. It now uses the new `TabInitialWrite` and `TabDropdown` types.
- `src/browser/Delegate.ts`:
  - **B:** `#routeTab` reads the delegate's lifetime before it prevents or marks. A new `#construct` destroys a tab built while the delegate was destroyed.
  - **C:** one `#conflicts` in the Alert unit's `Set` form, a shared `#closest`, and `#contends` deleted.
  - **E:** `#tab` is typed `TabVocabulary`, and the key route uses `readControls`.
  - **F:** `destroy` and `#release` run in the reverse of acquisition; the class remarks state this.
  - **G:** the class summary and the `#activate` comment are corrected.
- `src/browser/types.ts`:
  - **E:** adds `TabVocabulary`.
  - **H:** adds `TabInitialWrite` and `TabDropdown`.
  - **G:** rewrites the `TabInterface` summary, the `show` `@returns`, `TabInterface.destroy`, `DelegateInterface.destroy`, `DelegateOptions.root`, and `TabClassMap.disabled`.
- `src/browser/helpers.ts`: adds `readControls`; `computeNeighbor` takes `(list, current: T | undefined, forward, wrap)`.
- `src/browser/constants.ts`, `validators.ts`, `index.ts`: unchanged since round 1.
- Tests:
  - `tests/src/browser/Tab.test.ts`: 35 cases, 5 of them new.
  - `Delegate.test.ts`: 4 new cases, and the B(1) case also checks that the list takes no writes.
  - `helpers.test.ts`: `readControls` cases and an undefined-`current` case.
  - `index.test.ts`: `readControls` in the export list and a `TabVocabulary` type check.
- `guides/veneer.md`:
  - § Surface: new rows for `TabVocabulary`, `readControls`, `TabInitialWrite` and `TabDropdown`; the `Delegate` and `TabInterface` rows updated.
  - § Methods: the `DelegateInterface` and `TabInterface` tables updated.
  - § Delegation: the two sentences only; the `tab` option sentence stays out for W5.
  - `#### Tab`: `readControls`, the `_nav.scss` sentence, the `false` reasons, the door paragraph with the list read and the restoration bound, and the `hidden.bs.tab` departure.

### Red and green readings
All four red readings come from one run on the round-1 source, before any fix: `npm run test:src:browser -- tests/src/browser/Tab.test.ts tests/src/browser/Delegate.test.ts` → `Tests  4 failed | 72 passed (76)` (log `tmp/j-tab/r2-red-1.log.txt`).

- **A (i)** `resolves false for a swap whose sibling blur a listener answers by showing that sibling again, writing nothing after the blur`. Red: `AssertionError: expected true to be false`.
- **A (ii)** `resolves false for a swap whose sibling token write a reaction answers by showing a third control, which ends alone active`. Red: `expected true to be false`.
- **B (1)** `marks, constructs, and shows nothing for the tab route after a button listener destroys the delegate inside the click`. Red: `expected [ [ 'show.vn.tab' ] ] to deeply equal []`.
- **B (2)** `destroys and drives nothing of a tab whose construction a reaction answers by destroying the delegate`. Red: `expected Tab{} to be undefined`.

Green, same scope: `npm run test:src:browser` → `Tests  259 passed (259)`.

- **C:** the existing refusal and route cases pass under the one `#conflicts`. Scoped run over `Tab`, `validators`, `helpers`, `index` and `Delegate`: `Test Files  5 passed (5)` / `Tests  128 passed (128)`. That count was taken before three later cases were added; the final full run is in the acceptance chain.
- **D:** the row "the root registers no key listener" reddens `registers one click and one key listener on the root…` by name (JOINED: 4 cases fail).
- **E:** the helper cases are pinned by the rows "the controls keep a toggle", "the controls keep an element that is not HTML" and "an undefined current value is looked up".
- **F:** patch C's proof and a new removal proof are pinned by "the delegate destroys in acquisition order" and "the observer releases in acquisition order", both EXACT.
  - Unknown answered: "the live abort subscription is dropped" reddens `destroys the tab when its signal aborts, and at construction when it arrived aborted` (JOINED: 2 cases fail), so that case needed no strengthening.
- **G:** each prose change that states behaviour has an executed assertion.
  - The shipped `_nav.scss` sentence: the nav-declarations case now reads the control's `transitionProperty` as `color, background-color, border-color` and its `transitionDuration` as `0.15s, 0.15s, 0.15s`.
  - The two-active-controls sentence: `never swaps a list whose markup marks two controls active, stopping after the first removal`.

### Instrument
- Files: `tmp/j-tab/mutations-2.py` and `tmp/j-tab/mutations-2.log.txt`.
- **Rows:** 84 in all, each EXACT or JOINED, none MISSED, ERR or NOREPORT. That is all 72 round-1 rows plus 12 new ones. A row can now name several cases, and it counts only when every named case fails.
- **Baseline:** the five `GREEN?` rows read 0 failed (Tab 35, Delegate 46, validators 12, helpers 36, index 3).
- **Receipt:** `restored byte for byte`.
- **Round-1 rows re-anchored:** 16 rows had anchors that round 2 moved (renamed methods, `#construct`, the `Set`-form `#conflicts`, the `forward` parameter). Their titles and the mutations they make are unchanged.
- **Round-1 rows with new named cases:** two round-1 rows now name new cases, because item A's list read made the old named cases pass under their mutations. Both new cases were added for this:
  - "the active sibling is not read again after the events" → `resolves false and writes nothing when a listener to its pre-change events deactivates the sibling itself`
  - "the control token is not read" → `stops a swap whose control-activation write a reaction answers by removing the active token, with no other control active`
- **First run:** the first full round-2 run missed 3 rows; it is kept at `tmp/j-tab/mutations-2-first.log.txt`. The third miss, "the tab route reads no lifetime…", was closed by making the B(1) case check that the list takes no `role`, `aria-selected` or `tabindex` writes.

Round-2 rows from the final run (joined lists shortened; the full text is in the log):
```
JOINED exit=1 | the outgoing phase reads no sibling | tests/src/browser/Tab.test.ts | 3 failed of 35 | named: ['resolves false for a swap whose sibling blur a listener answers by showing that sibling again, writing nothing after the blur', 'resolves false for a swap whose sibling token write a reaction answers by showing a third control, which ends alone active'] | joined: …
EXACT exit=1 | the tab route reads no lifetime before it prevents or marks | tests/src/browser/Delegate.test.ts | 1 failed of 46 | named: ['marks, constructs, and shows nothing for the tab route after a button listener destroys the delegate inside the click']
EXACT exit=1 | the tab route keeps an engine constructed while the delegate was destroyed | tests/src/browser/Delegate.test.ts | 1 failed of 46 | named: ['destroys and drives nothing of a tab whose construction a reaction answers by destroying the delegate']
JOINED exit=1 | the one refusal omits the panels | tests/src/browser/Delegate.test.ts | 2 failed of 46 | named: ['refuses a click whose button host is a panel the collapse trigger names when neither engine exists, driving neither route'] | joined: …
EXACT exit=1 | the shared closest match ignores the root | tests/src/browser/Delegate.test.ts | 1 failed of 46 | named: ['ignores unmatched targets and a closest host outside the root']
JOINED exit=1 | the root registers no key listener | tests/src/browser/Delegate.test.ts | 4 failed of 46 | named: ['registers one click and one key listener on the root and releases both and its engines'] | joined: …
JOINED exit=1 | the controls keep a toggle | tests/src/browser/helpers.test.ts | 2 failed of 36 | named: ['returns the links and entries that are not toggles, and every trigger, in document order'] | joined: …
EXACT exit=1 | the controls keep an element that is not HTML | tests/src/browser/helpers.test.ts | 1 failed of 36 | named: ['matches only the selectors it is given and leaves out an element that is not HTML']
EXACT exit=1 | an undefined current value is looked up | tests/src/browser/helpers.test.ts | 1 failed of 36 | named: ['reads an undefined current value as one the list does not hold']
JOINED exit=1 | the live abort subscription is dropped | tests/src/browser/Tab.test.ts | 2 failed of 35 | named: ['destroys the tab when its signal aborts, and at construction when it arrived aborted'] | joined: …
EXACT exit=1 | the delegate destroys in acquisition order | tests/src/browser/Delegate.test.ts | 1 failed of 46 | named: ['restores a list whose controls it drove through several tabs to the markup the list carried']
EXACT exit=1 | the observer releases in acquisition order | tests/src/browser/Delegate.test.ts | 1 failed of 46 | named: ['restores a removed list whose controls it drove through several tabs at the observer delivery after the removal']
receipt: restored byte for byte
```

### Acceptance (from `tmp/j-tab/acceptance-2.log.txt`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | no diagnostic |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | no output |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | `All matched files use the correct format.` |
| `npm run test:src:browser` | 0 | `Test Files  11 passed (11)` / `Tests  259 passed (259)`, on Chromium 153.0.8010.12 |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run build:src:core` | 0 | built |
| `npm run build:src:styles` | 0 | built |
| `npm run build:src:browser` | 0 | built |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:setup` | 0 | `Test Files  4 passed (4)` / `Tests  267 passed (267)` |

- The `test:src:browser` run prints the expected `HostSnapshot` `SyntaxError` diagnostic.
- The one skipped policy case is the vendored `denylist currency` case, skipped in round 1 too.

### Status and diffstat
`git diff HEAD --stat` (the new files were already staged as intent-to-add):
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 A src/browser/Tab.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Tab.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```
```
 guides/veneer.md                     |  226 +++++-
 src/browser/Delegate.ts              |  220 +++++-
 src/browser/Tab.ts                   |  412 ++++++++++
 src/browser/constants.ts             |   37 +
 src/browser/helpers.ts               |   57 +-
 src/browser/index.ts                 |    1 +
 src/browser/types.ts                 |   42 +-
 src/browser/validators.ts            |   32 +-
 tests/src/browser/Delegate.test.ts   |  485 +++++++++++-
 tests/src/browser/Tab.test.ts        | 1424 ++++++++++++++++++++++++++++++++++
 tests/src/browser/helpers.test.ts    |   83 ++
 tests/src/browser/index.test.ts      |   21 +-
 tests/src/browser/validators.test.ts |   58 ++
 13 files changed, 3027 insertions(+), 71 deletions(-)
```

### Deviation state
I did not stop. These are the choices I made within the brief:
- **Two-active markup:** item A's list read makes a list whose markup marks two controls `active` never swap. The guide states this and the new case above proves it; this is the one behaviour change beyond the brief's text.
- **Names (item H):** `#planInitial` and `#writeInitial`, `TabInitialWrite`, `TabDropdown`. `test:guides` asked for § Surface rows for the two new types, so they have rows.
- **Merge overlap:** the `Delegate` class remarks were rewrapped whole. They will overlap the Alert unit's remarks at landing, the same fold item C expects for `#conflicts`.
- **Round-1 red readings:** the four red readings above were taken on round-1 source before any fix. The three extra cases (sibling deactivated by a listener, host token removed, and the observer-release order) were written after the fixes to separate reads that item A's list read had hidden. Their red evidence is their instrument rows.
- No `prove` call was made; the MCP server is not reachable from this subagent.
- No install, commit, merge, or discarding git command was run.

Logs and instruments are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/tmp/j-tab/`.

---

The Orchestrator's retention note: the round-2 instrument and its logs are retained as `j-tab-mutations-2.py`, `j-tab-mutations-2.log.txt`, and `j-tab-mutations-2-first-run.log.txt`; the review evidence is `j-tab-2.diff` and `j-tab-2-status.txt`, captured by `w2-gates.sh tab 2`, whose log is `j-tab-gates-2.log.txt`.
