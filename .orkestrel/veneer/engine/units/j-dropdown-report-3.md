# J-DROPDOWN round 3 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the dropdown worktree, briefed by `j-dropdown-brief-3.md`; 25 tool uses, 1025 s; retained verbatim from the subagent's return; the tree is `veneer/tmp/worktrees/dropdown` on `unit/dropdown` from `e24e2c3`, uncommitted, `main` not merged)

Round 3 is closed in the dropdown worktree with no deviation. Every gate exits 0, and the full instrument run reddens every row's named case and ends `receipt: restored byte for byte`. I made no `prove` call; the server is not reachable from a subagent. No merge, commit, install, or discarding git command was run.

## A. Destroy called during the placement's restoration

**Red.** Command: `npm run test:src:browser -- tests/src/browser/Dropdown.test.ts tests/src/browser/Placement.test.ts tests/src/browser/Delegate.test.ts`. Full output is in `tmp/j-dropdown/red-3.log.txt`; together with B's case it read `Tests 4 failed | 90 passed (94)`. A's three cases:
- `Dropdown.test.ts:1245` "restores its placement before a destroy called from the closing promotion returns, writing nothing afterwards": `expected [ [ 'manual', 'bottom', …(1) ] ] to deeply equal [ [ null, null, null ] ]`
- `Dropdown.test.ts:1288` "completes its restoration when a destroy called from the closing promotion runs inside its own destroy": `expected [ [ 'manual', 'bottom', …(3) ] ] to deeply equal [ [ null, null, null, null, …(1) ] ]`
- `Placement.test.ts:523` "completes its restoration in a destroy called from the closing promotion, the outer destroy writing nothing more": `expected [ [ 'manual', 'bottom', …(1) ] ] to deeply equal [ [ null, null, null ] ]`

**Mechanism as landed:**
- **`#conceal`** (the whole hide) destroys the placement and only then clears `#placement`, so a destroy called from a listener inside that restoration still reaches the placement. `show()` now handles a placement left over from an earlier show the same way.
- **`Dropdown.destroy`** releases the claim and aborts only on its first call, and on every call finishes the placement's restoration, then its own. So a destroy called from inside another destroy has already restored everything when it returns, and the interrupted call resumes with nothing left to write.
- **`Placement.destroy`** aborts, disconnects, and hides the popover only on its first call, and restores its snapshot on every call. So a destroy called from the closing `beforetoggle` listener completes the restoration. When the resuming `hidePopover()` then throws `NotSupportedError` (probe: it throws once the `popover` attribute is gone), the placement ignores it as long as the attribute is absent.

`HostSnapshot.ts` needed no change.

## B. Arrow route reads the delegate's lifetime after `show()`

**Red:** `Delegate.test.ts:1387` "focuses no entry after an arrow press when a listener to the show destroys the delegate" failed with `expected <button …(2)> to be <button …(1)>`.

**Landed:** in the arrow branch of `#press`, the route returns right after `void engine.show()` when the delegate has been destroyed. A `show()` that returns `false` because the menu is already open still moves focus. The Delegate class remarks and the `#### Dropdown` keyboard sentence now say focus moves only "while the delegate is still live", matching the Escape sentence.

## C. Entry-selector row, retargeted

"the delegate navigates by the default entry selector" now changes only `` `:is(${this.#dropdown.selectors.entry}):not(` `` to `` `:is(${DROPDOWN_SELECTORS.entry}):not(` `` at the navigation site. Its named case, "routes dropdown clicks by a replaced trigger selector…", now fails at `tests/src/browser/Delegate.test.ts:1089`, `expect(document.activeElement).toBe(root.querySelector('#entry'))`, which is the focus assertion and not the acquisition assertion. The log is `tmp/j-dropdown/entry-row-line.log.txt`, produced by `entry-row-line.py`, which restores the file with a digest check.

## D. Instrument

`tmp/j-dropdown/mutations-3.py` writes `tmp/j-dropdown/mutations-3.log.txt`.
- **Rows:** 102 in total, all 97 round-2 rows kept plus 5 new. All 102 are EXACT or JOINED.
- **Re-anchored round-2 rows:**
  - "the hide leaves the menu promoted"
  - "destruction restores nothing"
  - "the old placement is destroyed with no door"
  - "destruction leaves the placement": it now drops both the signal and the explicit `this.#placement?.destroy()` in `destroy()`. The first full run showed that dropping only the signal no longer reddened the case (`mutations-3-first-run.log.txt`).
- **New rows:**
  - "the hide clears the placement before destroying it"
  - "the placement drops its nested completion"
  - "the placement drops its nested completion under a hiding dropdown"
  - "the dropdown drops its nested completion"
  - "the arrow route reads no lifetime after the show"
- **`GREEN?` rows, all 0 failed:** Dropdown 32, Placement 16, Delegate 46, validators 12, parsers 9, helpers 34, index 3.
- **Receipt:** `receipt: restored byte for byte`

## Gates (`tmp/j-dropdown/acceptance-3.sh`, logs in `tmp/j-dropdown/acceptance-3/`)

| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | 0 | 12 files, 276 passed |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm run build:src:core` / `build:src:styles` / `build:src:browser` | 0 / 0 / 0 | |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run test:setup` | 0 | 267 passed |

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
```
```
 guides/veneer.md                     |  239 +++++-
 src/browser/Delegate.ts              |  205 +++++-
 src/browser/Dropdown.ts              |  418 +++++++++++
 src/browser/Placement.ts             |  235 ++++++
 src/browser/constants.ts             |  106 +++
 src/browser/helpers.ts               |   26 +
 src/browser/index.ts                 |    2 +
 src/browser/parsers.ts               |   73 +-
 src/browser/types.ts                 |   42 +-
 src/browser/validators.ts            |   34 +-
 tests/src/browser/Delegate.test.ts   |  418 ++++++++++-
 tests/src/browser/Dropdown.test.ts   | 1332 ++++++++++++++++++++++++++++++++++
 tests/src/browser/Placement.test.ts  |  560 ++++++++++++++
 tests/src/browser/helpers.test.ts    |   32 +
 tests/src/browser/index.test.ts      |   31 +-
 tests/src/browser/parsers.test.ts    |   66 +-
 tests/src/browser/validators.test.ts |   51 ++
 17 files changed, 3823 insertions(+), 47 deletions(-)
```

## Deviation state
No deviation this round; none of the brief's stop conditions was hit. Items A and B needed no `types.ts` change, because the `destroy` summaries still hold. The only guide edit is the arrow-key qualifier. Carried to the round-4 landing, as the brief states:
- the merge of `main` at `f377579`
- the fold of `computeNeighbor`
- adopting E16's `isDisabled`
