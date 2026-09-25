<!-- The J-SAMEWAY-ENGINES-B writer's final message (opus on Opus 5.5, native subagent a87c701530b05375c), retained verbatim from its completion notification because its transcript file was empty; brief: units/j-sameway-engines-b-brief.md with the decision units/j-holders-decision-2.md; worktree tmp/worktrees/engines-b on unit/engines-b from 8bc940d. Its report-only patches are retained as units/j-sameway-engines-b-types.patch and units/j-sameway-engines-b-guide.patch, and its instrument as units/j-sameway-engines-b-mutations.py with its log. -->

## J-SAMEWAY-ENGINES-B report

All six criteria are met, with two exceptions to the red-first rule (deviation 1). `Dropdown`, `Tooltip`, and `Popover` now follow E24: a host write toward the change's end completes the change, and a write against it after the token step returns that change's writes. All three engines complete the hide when the platform closes their promoted overlay. The acceptance chain exits 0, the instrument reads `rows 43, missed 0`, and nothing is committed.

### Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/`.
- **`src/browser/Dropdown.ts`**: now follows E24.
  - Adds `#changing`, a persistent `#change`, `#halted`, `#owns`, a `#holds` that can skip the token read, `#revert`, `#rehide` (entries `placement`, `aria-expanded`, `toggle`) and `#reshow` (entries `toggle`, `aria-expanded`).
  - Bridges the platform's close through a menu `toggle` listener, `#follow`, `#closed`, and `#promoted`.
  - `#conceal` gains a `forced` parameter.
  - The show-start restore of a placement a stopped show left is deleted: a stopped show now returns its placement itself (E6).
  - The TSDoc is rewritten.
- **`src/browser/Tooltip.ts`**:
  - Adds `#owns`. `#holds` now reads the container whenever a tip is held and reads the token only when given a boolean.
  - The pre-token show doors now pass `undefined`, and the `owned` door too.
  - The token steps skip a write the host already made.
  - Adds `#rehide` (placement, then tip removal, then `aria-describedby`) behind a precondition that only the token moved, plus `#revert`.
  - The TSDoc and comments are updated.
- **`src/browser/Popover.ts`**: a TSDoc sentence on the invoker close.
- **`tests/src/browser/Dropdown.test.ts`**: 7 new cases. Three old cases are folded or replaced (deviation 5), and the listener-target list gains `menu`.
- **`tests/src/browser/Tooltip.test.ts`**: 6 new cases. "stops a show before the promotion when an inserted listener marks the tip shown…" is folded into the B1 `inserted` row.
- **`tests/src/browser/Popover.test.ts`**: 4 new cases.
- **Unchanged**: `Placement.ts` and `Placement.test.ts` needed no change.
- **Instruments in `tmp/j-engines-b/`**: `mutations.py` (log `mutations.log.txt`), `base-red.py` (log `base-red.log.txt`), `acceptance.sh`, plus `splice.py`, `append-cases.py`, `isolate-rows.py`, `isolate-again.py`, `endings.py`, and `shared/` (patches, edited copies, `edit-types.py`, `make-patches.py`).

Diffstat: `6 files changed, 1929 insertions(+), 174 deletions(-)`. Every touched file reads LF.

### B4 table
Key to the case names:
- **DB1S / DB1H**: the Dropdown agreement cases for show and hide. **DB2S / DB2H**: the Dropdown return cases for show and hide.
- **TB1S / TB1H**: the Tooltip agreement cases. **TB2**: the Tooltip return case.
- **TMOVED**: "leaves a tip a reaction moves during the show fade…". **TLIFE**: "writes nothing more of a stopped show returning step when a reaction inside its tip removal…".
- **PB1 / PB2 / PB3**: the Popover agreement, return, and invoker cases.
- A name in parentheses is the instrument row that kills that case.

**Dropdown show**

| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Snapshot records | — | E13/E25; destruction restores them | "closes the open menu without events on destruction…" |
| Placement (promotion, `popover`, inline declarations, `anchor-name`, side, arrow) | `placement` | The placement's destruction; a refused promotion restores itself (not a takeover) | DB2S (B2-dropdown-return-placement); "refuses the show when a listener cancels the menu promotion…" |
| Focus to the toggle | — | Not returned: no hide moves focus back (as Modal, J-SAMEWAY D1) | DB1S `focused` |
| `aria-expanded="true"` | `aria-expanded` | Writes `false`, the value a hide writes | DB2S rows (B2-dropdown-return-aria) |
| Menu `shown` token (token step) | — | The host's move; skipped when the host wrote it | DB1S `echoes` (B1-dropdown-show-skip) |
| Toggle `shown` token | `toggle`, recorded only when the call added it | Removed | DB2S `none/toggle`, `none/side` (B2-dropdown-return-toggle, B2-dropdown-record-toggle) |
| `placement.update()` | Part of `placement` | Returned by the placement's destruction | DB2S `none/side` |

**Dropdown hide**

| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Placement destruction, before the token step | — | A release that stays released: placing the menu again is an acquisition (E22 amendment 3; E24 J-SAMEWAY amendment item 2) | DB2H `promoted: false`, `display: block` |
| Menu `shown` token removal (token step) | — | The host's move; skipped when the host removed it | DB1H `echoes` (B1-dropdown-hide-skip) |
| Toggle token removal | `toggle`, when the call removed it | Added back | DB2H (B2-dropdown-reshow-toggle, B2-dropdown-record-hide-toggle) |
| `aria-expanded="false"` | `aria-expanded` | Writes `true`, the value the show wrote | DB2H (B2-dropdown-reshow-aria) |

**Tooltip and Popover show**

| Write | Entry | Return or rule | Case |
|---|---|---|---|
| A rebuild's discard of the old tip | — | E18 release; the rebuilt tip replaces it | existing rebuild cases |
| Build writes on the unpublished tip, and slot moves | — | The tip leaves through its container return. Slot elements return on destruction, `fill`, or rebuild, as after a completed hide (E18) | existing build cases |
| Insertion into the container | `connection` | Removed while still there without the token; the tooltip forgets the tip | TB2 `tips: 0` (B2-tooltip-return-connection) |
| `aria-describedby` link | `aria-describedby` | Id taken out | TB2 (B2-tooltip-return-link) |
| Placement | `placement` | Destroyed | TB2, PB2 (B2-tooltip-return-placement, B2-popover-return-placement) |
| Tip `shown` token (token step) | — | The host's move; skipped when the host wrote it | TB1S, PB1 (B1-tooltip-show-skip) |

The Tooltip show returns only after its token step, so all three entries are always written. `#rehide` runs each one as its own guarded write, and only when the token alone moved (TMOVED, B2-tooltip-precondition). It reads the tooltip's lifetime before each write (TLIFE, B2-tooltip-lifetime).

**Tooltip and Popover hide**

| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Tip `shown` token removal (token step) | — | The host's move; skipped when the host removed it | TB1H, PB1 (B1-tooltip-hide-skip) |
| Discard: placement destruction | — | Released, not rebuilt | existing "…closing beforetoggle listener adds its shown token back" case |
| Discard: tip removal | — | E18: only while in its container without the token | same |
| Discard: unlink | — | E18: always, while the tooltip is live | same |

A hide writes nothing but its token before its discard, so a hide taken over has nothing to return (TB2 and PB2 hide rows).

### B3: the platform's close
All three engines complete the hide. E24's rule is that the host's chosen state stands: a consumer's invoker or `hidePopover` call moved the platform's open state to the hide's end, so the engine completes that hide with its events.

A listener that prevents that hide keeps the overlay once, because the engine promotes it again (the E17 model). The next close of the same placement or tip is forced, so no two listeners can loop.

How each engine observes the close:
- **Dropdown**: a new menu `toggle` listener. It acts only on a close while the menu reads shown, holds a placement, carries `popover`, is connected, and is not open.
- **Tooltip and Popover**: the E17 `toggle` listener already on every tip, whatever the profile.

### Red and green readings
Red: `python tmp/j-engines-b/base-red.py` runs the finished tests against `8bc940d`'s source bytes and restores them byte for byte. It reads `Tests 14 failed | 133 passed (147)`, and every red names an `AssertionError`. The red cases:
- **Dropdown**:
  - the agreement show and hide cases
  - the two return cases
  - the invoker case
  - the prevented-close case
  - the returning-step lifetime case
  - the listener-list case
- **Tooltip**:
  - TB1S
  - TB1H
  - TB2
  - TLIFE (`expected 'help vn-tooltip-109' to be 'help'`)
- **Popover**: PB1 and PB2.

Green on the finished sources: `owned-files exit 0 |      Tests  147 passed (147)`.

### Mutation table (`tmp/j-engines-b/mutations.log.txt`)
The log ends with `restored byte for byte` and `rows 43, missed 0`. Every KILLED row's failure starts with `AssertionError`.
- **B1, KILLED** (15 rows): the Dropdown show and hide refusal, door, and skip rows; the Tooltip connection, link, inserted, and owned doors; the Tooltip show skip, hide refusal, and hide skip; the Popover inserted door and hide refusal.
- **B2, KILLED** (20 rows): the Dropdown expected-end, return, record, identity, and lifetime rows; the Tooltip return, rehide, precondition, and lifetime rows; the Popover placement return.
- **B3, KILLED** (6 rows): the observe row for each engine, plus the Dropdown re-promote and bound rows.
- **CONTROL-dropdown and CONTROL-tooltip**: HELD.
- **BOOM**: REFUSED (`Error: boom`). **UNBOUND**: REFUSED (`ReferenceError: unbound is not defined`).

### Report-only patches
Both pass `git apply --check`:
- `tmp/j-engines-b/shared/types.patch` (114 lines): `@returns` and remarks sentences only, no type change. It covers `DropdownEventMap.hide`, `DropdownInterface.show` and `.hide`, `TooltipInterface.show` and `.hide`, `PopoverEventMap.hide`, and `PopoverInterface.show` and `.hide`.
- `tmp/j-engines-b/shared/guide.patch` (167 lines):
  - § Dropdown: the event table's `hide` row, the door paragraphs rewritten to E24, the platform-close paragraph, and a departure bullet.
  - § Tooltip: the platform-close sentence, the door paragraph, and a new agreement and return paragraph.
  - § Popover: the invoker sentence.
- `tests/setupBrowser*`: no patch (deviation 3).

### Acceptance output (`bash tmp/j-engines-b/acceptance.sh`)
```
check-src-browser exit 0
lint-check exit 0
format-check exit 0
owned-files exit 0 |      Tests  147 passed (147)
test-guides exit 0 |      Tests  20 passed (20)
test-src-browser exit 0 |      Tests  987 passed (987)
done
```
The last two lines are observations, not criteria.

### `git status --short`
```
 M src/browser/Dropdown.ts
 M src/browser/Popover.ts
 M src/browser/Tooltip.ts
 M tests/src/browser/Dropdown.test.ts
 M tests/src/browser/Popover.test.ts
 M tests/src/browser/Tooltip.test.ts
```

### Deviation state
No stop. These need your attention:

1. **Some cases read green on base.** The Tooltip and Popover B3 cases and the Popover prevented-close case already pass on `8bc940d`, because the E17 `toggle` bridge covers every tip whatever its profile. They pin that behaviour, and the observe rows kill them. The Tooltip and Popover B2 hide rows are also green on base, because the hide has nothing to return. Each combined case still reads red on its show rows.
2. **I broke the brief's rule once.** One command carried a stray `python -` and a heredoc. It hung with no input, and I killed it by PID (bash 28880, python 28882). It read and wrote nothing, and `splice.py` stayed intact at 24 lines.
3. **Row tables are inline in the test files.** The brief bars editing `tests/setupBrowser.ts`, so the door tables sit in the cases, as the file's existing `doors` loop does. This departs from tests.md, which places data tables in a setup file. I can return a move patch if you want one.
4. **Choices I made within E24:**
   - **Tooltip identity.** Tooltip keeps its E18 identity-before-dispatch, so a nested show inside `show.vn.tooltip` is refused as in flight rather than superseding the outer call. A nested hide still supersedes.
   - **Tooltip returning step.** It holds the change until it ends, so a show a reaction starts inside it is refused.
   - **Dropdown hide.** A hide's placement is not rebuilt when the host takes the hide over, so the menu shows in flow. The TSDoc and the guide patch state this.
5. **Existing cases folded or replaced:**
   - The Dropdown "stops a show/hide whose menu token…" cases are now the B2 `menu` rows.
   - The Dropdown "reads its lifetime after restoring the placement a taken-over show left…" case is replaced by DLIFE, because no leftover placement remains.
   - The Tooltip "…inserted listener marks the tip shown…" case is now the B1 `inserted` row.
6. **Observations:**
   - Showing a tooltip twice in one frame makes Chromium report a ResizeObserver loop, on base as well. The TB2 and PB2 cases wait one frame before their second call for this reason.
   - `HostSnapshot.test.ts` prints an unhandled `DOMTokenList.toggle` SyntaxError. It prints the same on base.
7. **J-HOLDERS decision:** none of my new cases asserts an emptied `class` or `style` attribute while another holder lives. The existing owned cases with two engines on one trigger assert `aria-describedby`, `title`, the label, or the final markup only, so none asserts the old rule.
