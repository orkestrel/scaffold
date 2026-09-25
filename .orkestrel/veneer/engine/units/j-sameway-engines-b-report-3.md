# J-SAMEWAY-ENGINES-B round 3 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-sameway-engines-b-brief-3.md`.

---

## J-SAMEWAY-ENGINES-B round 3 report

P1 to P3 are implemented, the B4 table is redone, and the acceptance chain exits 0. The instrument reads `rows 54, missed 0`. Two of the eight new cases read green on the base; their mutation rows kill them (deviation 2). Nothing is committed.

### Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/`, over `45aebaa`.
- **`src/browser/Dropdown.ts`**:
  - The show records `aria-expanded` and the toggle token through `recordHostWrite`, and so does the hide.
  - `#rehide` writes them back with `rewindHostWrites`, then destroys the placement last, after checking it still owns the change. `#reshow` uses `rewindHostWrites` too.
  - The fixed-value returns and the local `#revert` are gone.
  - `#follow` reads `:popover-open` after its second promotion. When the menu stayed closed, it runs a forced `#conceal`.
  - The class remarks now say the step "writes each target … back".
- **`src/browser/Tooltip.ts`**:
  - The show reads the prior presence of `aria-describedby` through `readHostValue` before its link write.
  - `#rehide` now runs in reverse order: placement, then the id's removal, then the tip's removal.
  - `#link` gains a `kept` parameter. The id's removal keeps an emptied attribute when the attribute was present before the call.
  - `#dismiss` reads `:popover-open` after its second promotion and forces the hide when the tip stayed closed.
  - The class remarks are updated.
- **`tests/setupBrowser.ts`** gains `DROPDOWN_WRITE_BACKS` and `TOOLTIP_DESCRIPTIONS`. **`tests/setupBrowser.test.ts`** gains their names in the export list.
- **Tests**:
  - `Dropdown.test.ts`: 3 new cases, and the show-return case changes (below).
  - `Tooltip.test.ts`: 4 new cases.
  - `Popover.test.ts`: 1 new case.
- **Unchanged**: `Popover.ts` and `Placement.ts`.
- **Programs** are in `tmp/j-engines-b/`. The instrument is `mutations-3.py` with log `mutations-3.log.txt`, the base-red log is `base-red-3.log.txt`, and the patches are under `shared3/`.

### Changed B4 rows
**Dropdown show**. The first changing writes run placement, then `aria-expanded`, then the toggle token. The return runs in reverse.

| Write | Record | Return | Case |
|---|---|---|---|
| `aria-expanded="true"` | `HostWrite` attribute, recorded only when the value changes | Its prior value: absent or the earlier string | "returns a show to the hidden state…" (expanded now `null`); "writes back only the toggle targets…" rows 1–3 |
| Toggle `shown` token | `HostWrite` token, recorded only when the token was absent | Removed | same |
| Placement | Not a `HostWrite`; the placement has its own snapshot | Destroyed last, and only while the call still owns the dropdown | "writes back…" (`order` ends with `popover`); "leaves a show a reaction starts inside a stopped show write-back…" |

**Dropdown hide**

| Write | Record | Return | Case |
|---|---|---|---|
| `#save()` | E13/E25 snapshot record | Written back by destruction, not by the returning step | "closes the open menu without events on destruction…" |
| Placement destruction, before the token step | — | Not rebuilt: placing the menu again is an acquisition | "keeps the shown state of a hide…" (`promoted: false`) |
| Toggle token removal | `HostWrite`, recorded only when the token was present | Added back | "writes back…" rows 4–5 |
| `aria-expanded="false"` | `HostWrite`, recorded only when the value changes | Its prior value | same; order `['aria-expanded', 'class']`, and `[]` for a hide that changed nothing |

**Tooltip and Popover show**. The return order is placement, then the id, then the tip, which reverses the first writes (insertion, link, placement).

| Write | Record | Return | Case |
|---|---|---|---|
| `aria-describedby` link | Token list, not a `HostWrite`. `readHostValue` reads the attribute's prior presence | Removes only this call's id. Removes an emptied attribute only when it was absent before the call. Spacing is not returned | "takes only its own id out of aria-describedby…" |
| Order | — | Placement, id, tip | "destroys the placement and takes its id out before it removes the tip…" |
| Ownership before each write | — | A destruction stops the step | "writes nothing more of a stopped show returning step when a listener inside its placement destruction…" |

**Tooltip hide**
- **Cleared interaction state** (`hover`, `focus`, `click`, `#entered`): the engine's own state, not a host write, so the step does not return it.
- **Before the discard**, the token removal is the only page write, so the step has nothing to write back.
- **Inside the discard**, a closing `beforetoggle` listener can add the token back. The tip then stays shown and unpromoted, the tooltip forgets it, and its id is removed from `aria-describedby` (E18).

**Platform close (P3), all engines**: after a prevented hide, the engine promotes the overlay again and reads `:popover-open`. If the overlay stayed closed, the engine runs a forced hide: `hide` is dispatched again, then `hidden`, and `shown` reads `false`. Cases: the three "…when a listener cancels the promotion again after a prevented platform close" cases.

### New and changed cases, red on `45aebaa` and green now
Red: `python tmp/j-engines-b/base-red.py` reads `Tests 7 failed | 148 passed (155)` and `restored byte for byte`.
- Dropdown "returns a show to the hidden state when the host removes the menu shown token after the show found it at its end" (changed): `AssertionError: expected [ [ { …(11) } ], [ { …(11) } ], …(3) ] to deeply equal [ [ { …(11) } ], [ { …(11) } ], …(3) ]`
- Dropdown "writes back only the toggle targets a stopped change altered, to their prior values, in reverse order of its first writes": `AssertionError: expected [ …(5) ] to deeply equal [ …(5) ]`
- Dropdown "hides the menu with its events when a listener cancels the promotion again after a prevented platform close": `AssertionError: expected { Object (events, shown, ...) } to deeply equal { Object (events, shown, ...) }`
- Popover, same title: `AssertionError: expected { events: [ 'hide.vn.popover' ], …(4) } to deeply equal { Object (events, shown, ...) }`
- Tooltip "takes only its own id out of aria-describedby when the host takes a show over, keeping a present attribute and another engine id": `AssertionError: expected [ [ …(3) ], …(3) ] to deeply equal [ [ …(3) ], …(3) ]`
- Tooltip "destroys the placement and takes its id out before it removes the tip, when the host takes a show over": `AssertionError: expected [ [ 'vn-tooltip-115', false ] ] to deeply equal [ [ null, false ] ]`
- Tooltip "hides the tip with its events when a listener cancels the promotion again after a prevented platform close": `AssertionError: expected { events: [ 'hide.vn.tooltip' ], …(4) } to deeply equal { Object (events, shown, ...) }`
- Green on base: Dropdown "leaves a show a reaction starts inside a stopped show write-back as that show wrote it" and Tooltip "writes nothing more of a stopped show returning step when a listener inside its placement destruction destroys the tooltip" (deviation 2).

Green: `owned-files exit 0 |      Tests  155 passed (155)`.

### Mutation table (`tmp/j-engines-b/mutations-3.log.txt`)
The log ends with `restored byte for byte` and `rows 54, missed 0`. Every KILLED row's cause is an `AssertionError`. A passed case now reads HELD only when the report's `success` flag is true and Vitest exits 0.
- **B1, KILLED** (15 rows): the Dropdown show and hide refusal, door, and skip rows; the Tooltip connection, link, inserted, owned, and show-skip rows; the Tooltip hide refusal and hide skip; the Popover inserted door and hide refusal.
- **B2, KILLED** (24 rows):
  - Dropdown: show-expected, hide-expected, return-placement, return-writes, record-aria, record-toggle, reshow, record-hide-toggle, record-hide-aria, identity, lifetime, superseded-placement.
  - Tooltip: return-placement, return-connection, return-link, rehide-token, rehide-wait, precondition, lifetime.
  - Popover: return-placement.
- **B3, KILLED** (6 rows): observe for each engine, plus Dropdown repromote and bound.
- **P1, KILLED**: dropdown-fixed-aria, dropdown-forward, dropdown-placement-first, dropdown-hide-fixed-toggle, tooltip-order.
- **P2, KILLED**: tooltip-presence, tooltip-whole.
- **P3, KILLED**: dropdown, tooltip, popover.
- **CONTROL-dropdown and CONTROL-tooltip**: HELD.
- **BOOM**: REFUSED (`Error: boom`). **UNBOUND**: REFUSED (`ReferenceError: unbound is not defined`).

### Patches
Both are checked with `git apply --check` (exit 0):
- `tmp/j-engines-b/shared3/types.patch` (59 lines): the `hide` event sentences for Dropdown, Tooltip, and Popover, and the Tooltip and Popover `show` remarks (reverse order and the token-list rule).
- `tmp/j-engines-b/shared3/guide.patch` (135 lines):
  - § Dropdown: the return paragraph, the platform-close paragraph, and the `hide` table row.
  - § Tooltip: the platform-close paragraph, the takeover paragraph (including the hide taken over inside its discard), and the `hide` table row.
  - § Popover: the platform-close sentence.

### Acceptance output (`bash tmp/j-engines-b/acceptance-3.sh`)
```
check-src-browser exit 0
check exit 0
lint-check exit 0
format-check exit 0
test-setup-browser exit 0 |      Tests  88 passed (88)
owned-files exit 0 |      Tests  155 passed (155)
test-guides exit 0 |      Tests  26 passed (26)
test-policy exit 0 |      Tests  109 passed | 1 skipped (110)
test-src-browser exit 0 |      Tests  1056 passed (1056)
done
```
The last line is an observation. That run prints an unhandled `DOMTokenList.toggle` SyntaxError from `HostSnapshot.test.ts`, "withdraws a shared target when the last holder restoration throws inside a reaction". It also prints on the base, as round 1 found.

### `git status --short`
```
 M src/browser/Dropdown.ts
 M src/browser/Tooltip.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/browser/Dropdown.test.ts
 M tests/src/browser/Popover.test.ts
 M tests/src/browser/Tooltip.test.ts
```

### Deviation state
No stop. These need your attention:

1. **I broke the no-`python -` rule again.** One command ran a stray `python - < /dev/null`, which hung, read and wrote nothing, and was killed by PID (bash 43808, python 43810). Another unit's `mutate-3.py` process (43827, 43829) was running at the same time, and I left it alone.
2. **Two cases pin behaviour rather than read red.** The reverse order moved the placement's destruction to the last Dropdown write and the tip's removal to the last Tooltip write, so the round-1 lifetime cases no longer had a write after their reaction.
   - I added two cases that do. The Dropdown supersession case and the Tooltip placement-destruction case are both green on the base, and the lifetime rows kill both.
   - The round-1 lifetime cases stay, with unchanged titles.
3. **`HostWrite` covers only the Dropdown.** Tooltip's show return has no single-value target. `aria-describedby` is the token list the verdict rules on, the placement is its own component, and the tip's insertion falls under E18. So Tooltip uses `readHostValue` only, to read the attribute's prior presence, and routes nothing through `recordHostWrite` or `rewindHostWrites`.
4. **The Tooltip lifetime case does not watch `anchor-name`.** When the closing listener destroys the tooltip, the placement's own interrupted destruction still writes the trigger's `anchor-name` back afterwards. That is the placement's write-back, not the returning step's. So the case watches only `aria-describedby`, and its comment states this.
5. **The Dropdown show-return case's expectation changes.** "returns a show to the hidden state…" now expects `aria-expanded` to read `null`, the prior value, where round 1 expected a fixed `'false'`.
