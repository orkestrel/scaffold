<!-- The J-SAMEWAY-ENGINES-B checker lane (checker on Sonnet, native read-only subagent a1c5738ee3478b76e, resumed once with the evidence files' absolute paths after it searched the scaffold checkout for them), retained verbatim; brief: units/j-sameway-engines-b-audit-checker-brief.md; subject Veneer b8a8805. -->

## B4 rows against source

**Dropdown show** (`src/browser/Dropdown.ts`)

| Write | Entry | Return or rule | file:line | Match |
|---|---|---|---|---|
| Snapshot records | `#save()` | destruction restores (E13/E25) | entry 254; return (`destroy`) 317 | yes |
| Placement | `#place()` | destruction; refused promotion restores itself | entry 257; return via `#rehide` 376-397 (destroys placement) | yes |
| Focus to toggle | `host.focus()` | not returned | entry 261; no write in `#rehide`/`#reshow` | yes |
| `aria-expanded="true"` | write | `#rehide` writes `false` | entry 264; return 376-393 (`aria-expanded` branch → `'false'`) | yes |
| Menu `shown` token (token step) | write | host's move; skipped when host wrote it | entry 268-269 | yes |
| Toggle `shown` token | conditional write | removed | entry 272-277; return 376-393 (`toggle` branch) | yes |
| `placement.update()` | write | returned by placement's destruction | entry 280; covered by `placement` return | yes |

**Dropdown hide** (`src/browser/Dropdown.ts`)

| Write | Entry | Return or rule | file:line | Match |
|---|---|---|---|---|
| Placement destruction | `this.#placement?.destroy()` | release stays released (E22 amendment 3) | entry 461-462; no reversal in `#reshow` 399-413 | yes |
| Menu `shown` token removal | write | host's move; skipped when host removed it | entry 465-466 | yes |
| Toggle token removal | conditional write | added back | entry 470-471; return `#reshow` 399-413 | yes |
| `aria-expanded="false"` | write | `#reshow` writes `true` | entry 474; return `#reshow` 399-413 | yes |

**Tooltip and Popover show/hide** (`src/browser/Tooltip.ts`) — checked against `show` at lines 425-482, `#conceal` at lines 875-914. Every row (rebuild discard, build writes, container insertion `connection` at 454, `aria-describedby` link at 455, placement at 459, token step at 469-470 for show; token step at 896-897, discard at 905 for hide) resolves at the cited entries, and returns match `#rehide` (609-628) and the discard-only hide rule. Match: yes for every row.

## Writes no row names

- **`src/browser/Dropdown.ts:457`** — `this.#save()` inside `#conceal` (hide). The report's "Dropdown hide" table names no snapshot-records row, though the identical write is named in the "Dropdown show" table for the same method (`Dropdown.ts:254`) and returned identically by `destroy()` (`Dropdown.ts:317`). This write happens on every hide and is absent from the enumeration.

No other unnamed write found in the Tooltip/Popover show or hide paths.

## Claims 6 and 9 reading

- **Status file.** `j-sameway-engines-b-status.txt` lists exactly ten paths: `guides/veneer.md`, `src/browser/Dropdown.ts`, `src/browser/Popover.ts`, `src/browser/Tooltip.ts`, `src/browser/types.ts`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/src/browser/Dropdown.test.ts`, `tests/src/browser/Popover.test.ts`, `tests/src/browser/Tooltip.test.ts`. That is the eight unit paths (`Dropdown.ts`, `Popover.ts`, `Tooltip.ts`, `setupBrowser.ts`, `setupBrowser.test.ts`, and the three `.test.ts` files) plus `types.ts` and `guides/veneer.md`. CONFIRMED.
- **No door/reversal table this unit wrote sits in the three test files.** `Dropdown.test.ts` imports `DROPDOWN_HIDE_DOORS`, `DROPDOWN_HIDE_REVERSALS`, `DROPDOWN_SHOW_DOORS`, `DROPDOWN_SHOW_REVERSALS`, `PLATFORM_CLOSES` from `../../setupBrowser.js` (diff lines 1091-1099) rather than declaring them inline; the one inline table the round-2 report names (`Dropdown.test.ts:1157`) is identical at `8bc940d` per that report's `compare-titles.py` run, so it is not a table this unit wrote. CONFIRMED.
- **No `'none'` in an exported table.** `tests/setupBrowser.ts`'s new exports (`DROPDOWN_SHOW_REVERSALS`, `DROPDOWN_HIDE_REVERSALS`, etc.) use `undefined` for "no early door" (diff lines 989-1010), never the string `'none'`. CONFIRMED.
- **Private method/field use.** Every added private in `Dropdown.ts` (`#promoted`, `#changing`, `#halted`, `#owns`, `#rehide`, `#reshow`, `#revert`, `#follow`, `#closed`) has a call or read site (`Dropdown.ts:107,194,245,260-281,376,399,418-419,492-517`). Every added private in `Tooltip.ts` (`#owns`, `#rehide`, `#revert`) has a call site (`Tooltip.ts:442,472,475,573,583,609,612-625,632-633`). All confirmed used.

## Titles not found

None. Every case title the B4 tables quote resolves in its test file: `Dropdown.test.ts:962,1149,1190,1333,1440,1591,1718,1858`; `Tooltip.test.ts:2041,2182,2267,2425,2973,3012`; `Popover.test.ts:608,723,826`.

CHECK: FAIL unnamed-write-Dropdown.ts:457-#save-in-hide
