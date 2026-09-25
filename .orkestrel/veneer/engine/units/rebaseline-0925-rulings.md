# Re-baseline 2026-09-25 — the Orchestrator's rulings on REBASELINE-CHECK and STRUCK-ROWS

This file rules on the two Grok lanes that checked the re-baseline of 2026-09-25:
- `units/rebaseline-0925-rebaseline-check.md` checked the Orchestrator's edits;
- `units/rebaseline-0925-struck-rows.md` found the evidence for each carried finding that `units/rebaseline-0925.md` struck.

Where this file and `units/rebaseline-0925.md` disagree, this file wins.

## The struck rows

| Row | Ruling | The evidence that closes it |
| --- | --- | --- |
| Same-direction takeover, Offcanvas hide and Modal show | **Closed**, citation corrected | `Modal.test.ts` walks `MODAL_SHOW_DOORS`, and `Offcanvas.test.ts` walks `OFFCANVAS_HIDE_DOORS`, both defined in `tests/setupBrowser.ts`. Both cases read red on J-SAMEWAY's base `4b62bca` (`units/j-sameway-red-orchestrator.log.txt`) and are killed again in round 3 (`units/j-sameway-report-3.md`). The row's close named `7fd28dc`, the commit where the finding was read. The red-first obligation binds to the unit's base, which is `4b62bca`. |
| Construction that leaves a holder | **Closed**, citation corrected | Every class that calls `registry.claim` has a case where an option read throws during construction: Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, ScrollSpy, Tab, Toast, and Tooltip. The Modal and Offcanvas cases are J-SAMEWAY's B5 (`units/j-sameway-report-2.md`, `units/j-sameway-report-3.md`). `Popover` declares no constructor, so its construction is Tooltip's, and Tooltip's case covers it (`git grep` of `0865c67:src/browser/Popover.ts` finds no `constructor`). The utility classes claim no host through the registry. |
| Modal `#holdOpen` and `#releaseOpen`, Isolation's claims, and ScrollLock's holder set | **Closed**, citation corrected | `units/j-holders-audit-claims.md` H1 to H3 (Modal and Isolation route through the snapshot; ScrollLock's holder group stays because only the first lock's measurement is valid), and `units/j-holders-audit-2-verdict.md` (H1 to H5 hold). |
| `HostSnapshot`'s inline held-target shape | **Closed**, citation corrected | `HostSnapshotEntry`, `HostSnapshotRecord`, `HostSnapshotHolding`, and `HostSnapshotPresence` are each declared once in `src/browser/types.ts` (`units/j-holders-audit-claims.md`, `units/j-holders-audit-2-verdict.md`). |
| The ScrollLock signal case and the ColorMode persist case | **Closed**, citation corrected | The rows `H5-SIGNAL`, `H5-PRESENT`, and `H5-IDENTITY` in `units/j-holders-mutations.log.txt` and `units/j-holders-mutations-2.log.txt` each fail on an assertion. |
| A stopped show after `isolation.destroy()`, and `backdrop.show()` after a reaction started `hide()` | **Closed**, citation corrected | E24's reentry amendment is the one invariant. The four `units/j-reentry-sweep-*-report.md` files mark the incoherent points. The Modal and Offcanvas cases read red on `4b62bca` (`units/j-sameway-red-orchestrator.log.txt`). |
| Fixture lookups | **Reopened** | `requireMatch` in `tests/setupBrowser.ts` is the one match step, and `readButton`, `readSpecimen`, and `readSubject` route through it. `readElement` still takes the first `querySelector` match through `requireValue`, and `readOracleButton` only forwards to `readButton`. The carrier is J-TESTRULES: route `readElement` through `requireMatch` or rule why it takes the first match, and fold or justify `readOracleButton` under `AGENTS.md`'s wrapper rule. |
| J-CASCADE's part of the fade row | **Closed for J-CASCADE's part**, citation corrected | The round-1 verdict (`units/j-cascade-audit-verdict.md`: Popover `animated: true`, the trusted touch drag) and the round-2 verdict (`units/j-cascade-audit-2-verdict.md`: the motion-factor cases). The rest of the row stays with J-OVERLAYS, which already carries it: the Delegate stand-in `.fade` and the Modal and Offcanvas motion-factor cases, written under E32. |
| `ConfigSanitizer`'s walk on Chromium 141 | **Closed**, citation corrected | The styles session's Chromium `141.0.7390.37` read at Veneer `6d27028` (`units/rebaseline-0925-styles-141-sanitizer.txt`, from scaffold `b9b95685^`): the sanitizer suite alone read `70 passed | 2 skipped (72)`, and the whole `test:src:browser` read `891 passed | 2 skipped (893)`. The same reading closes the `Placement.test.ts` failure at `7e96cf8`. |

## REBASELINE-CHECK's other findings

- **The ScrollSpy cascade.** The landed-key list has no `scrollspy` key, because ScrollSpy paints through `nav`. NAV landed as `c43fc7b`, and `ScrollSpy.test.ts` proves that the engine writes the token the shipped nav cascade paints as the active pill. The ROADMAP's Depends cell holds for ScrollSpy through `nav`.
- **The five stale `plan.md` lines.** The plan update of 2026-09-25 rewrote or removed each one:
  - the marker's pointer at the 02:35 UTC styles note, replaced by the 03:25 UTC note it read;
  - the `Placement.test.ts` close, removed from the note, with its evidence in this file's `ConfigSanitizer` row;
  - EXIT-EVIDENCE in flight, removed;
  - J-OVERLAYS' prerequisite, now J-SAMEWAY-ENGINES-B;
  - the ROADMAP cell's carrier list, which closes at the `roadmap-0925` landing because the rewritten cell points at the plan instead of listing units.
