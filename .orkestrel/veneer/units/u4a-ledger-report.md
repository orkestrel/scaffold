# U4a-ledger report (builder, native Sonnet, 2026-09-20, 510 s)

**Paths written:**
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/obligations.md`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/ledger.md`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research.md` (three new index rows)

**Row totals per unit and per status:**

| Unit | CSS rows | Token rows | Obligation rows | Status |
| --- | --- | --- | --- | --- |
| U3 Tokens | 1 | 188 (127 root + 61 dark) | 5 | open |
| U7 Button | 1 | 0 | 29 | accepted scope |
| Content/layout | 29 | 0 | 10 | open |
| Passive | 11 | 0 | 0 | open |
| Forms | 14 | 0 | 0 | open |
| Disclosure/navigation | 6 | 0 | 38 | open |
| Overlays/feedback | 8 | 0 | 90 | open |
| Helpers/utilities | 65 | 0 | 0 | open |
| Cross-cutting | 0 | 0 | 3 | open |
| Tailwind | 0 | 0 | 0 | open |

Totals: 135 CSS rows, 188 token rows, 175 obligation rows.

**Excluded reboot selectors (concrete, as written in ledger.md § Exclusions):** `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd`, `legend + *`.

**Inventory keys the unit table omitted, and the family assigned:** `hstack`, `vstack`, `visible`, `invisible` — each assigned to `Helpers/utilities`, marked `decided by builder: resembles the sibling utility roots` in its ledger row.

Two obligation rows in `obligations.md` (Tab's `data-bs-toggle` selector and `util/swipe.js`'s `!element || !Swipe.isSupported()` guard) originally contained unescaped table-cell pipes; both are now escaped with `\|` so the tables parse correctly.
