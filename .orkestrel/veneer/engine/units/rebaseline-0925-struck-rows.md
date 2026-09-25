# REBASELINE STRUCK-ROWS — Cursor Grok lane (grok-4.7-high, ask mode), retained verbatim

Brief: `rebaseline-0925-struck-rows-brief.md` (launch copy `tmp/cursor/struck-rows-brief.md`, swept); journal `tmp/cursor/struck-rows.jsonl` (swept at acceptance); session id in the first line below.

---

<!-- Grok lane struck-rows, session aeedf5f9-89d2-4a66-9900-e18a545cbbcd -->

I'll read the brief and follow it exactly.The brief is a read-only evidence search. I'll start with the struck rows, their close text, and decisions E24 and E25.The close text is in the records. Next I’ll search the unit files and Veneer tests named for each row.## 1. Same-direction takeover, Offcanvas hide and Modal show

Close: "a case per door per engine, each read red first on Veneer `7fd28dc`."

**partly met**

- Door rows: `veneer/tests/setupBrowser.ts:2774` (`MODAL_SHOW_DOORS`: event, lock, open, adjust, backdrop, append, display, aria-hidden, aria-modal, role) and `veneer/tests/setupBrowser.ts:2821` (`OFFCANVAS_HIDE_DOORS`: event, isolation, hiding).
- One test walks each of those doors: `veneer/tests/src/browser/Modal.test.ts:2005` and `veneer/tests/src/browser/Offcanvas.test.ts:2550`.
- Those two tests are among the failures in `scaffold/.orkestrel/veneer/engine/units/j-sameway-red-orchestrator.log.txt:4` and `:12`. The log header at `:1` names the base `4b62bca`, not `7fd28dc`. `scaffold/.orkestrel/veneer/engine/units/j-sameway-audit-verdict.md:3` records that same base. No report, red log, mutation log, or verdict names a red reading at `7fd28dc`. `scaffold/.orkestrel/veneer/engine/units/j-sameway-report.md:21` records the red shape as every row `resolved: false` and no completed event.
- Round 3 still kills the same cases: `scaffold/.orkestrel/veneer/engine/units/j-sameway-report-3.md:114` and `:117`.

Missing: a retained red-first reading whose base is `7fd28dc`, with a failure named per door.

## 2. Construction that leaves a holder

Close: "each engine's construction releases what it saved and claimed when a later construction step throws, with a case per engine."

**partly met**

- Modal and Offcanvas, and the B5 kill: `veneer/tests/src/browser/Modal.test.ts:3227`, `veneer/tests/src/browser/Offcanvas.test.ts:3472`, `scaffold/.orkestrel/veneer/engine/units/j-sameway-report-2.md:21`, `scaffold/.orkestrel/veneer/engine/units/j-sameway-report-3.md:129`.
- Other claim sites and their cases: `veneer/src/browser/Alert.ts:86` with `veneer/tests/src/browser/Alert.test.ts:414`; `Button.ts:56` with `Button.test.ts:11`; `Carousel.ts:163` with `Carousel.test.ts:2204`; `Collapse.ts:119` with `Collapse.test.ts:664`; `Dropdown.ts:153` with `Dropdown.test.ts:867`; `ScrollSpy.ts:154` with `ScrollSpy.test.ts:655`; `Tab.ts:115` with `Tab.test.ts:99`; `Toast.ts:112` with `Toast.test.ts:786`; `Tooltip.ts:348` with `Tooltip.test.ts:2476`.
- Similar titles, not a claim release: `veneer/tests/src/browser/Placement.test.ts:87` and `:106`; `veneer/tests/src/browser/ColorMode.test.ts:28`.
- `veneer/src/browser/Popover.ts:42` extends `Tooltip` and has no case of its own. No matching title in `Isolation.test.ts`, `ScrollLock.test.ts`, `Backdrop.test.ts`, `Delegate.test.ts`, `Swipe.test.ts`, or `HostSnapshot.test.ts`.

Missing: a case per remaining engine that saves or claims during construction (Popover’s own construction, and any of Isolation, ScrollLock, Backdrop, Delegate, Swipe, and HostSnapshot that do).

## 3. Modal `#holdOpen` and `#releaseOpen`, Isolation's claims, and ScrollLock's holder set

Close: "each routes through the shared record, or a ruling says why one stays."

**met**

- `scaffold/.orkestrel/veneer/engine/units/j-holders-audit-claims.md:9` (Modal’s open token through the snapshot; no `#holdOpen` or `#releaseOpen`), `:14` (Isolation’s write-back through the snapshot, claim order kept), `:19` (ScrollLock’s holder group stays, because only the first lock’s measurement is valid).
- `scaffold/.orkestrel/veneer/engine/units/j-holders-audit-verdict.md:19` carries the presence defect on claim 1; `:22` rules ScrollLock body replacement outside the contract. `scaffold/.orkestrel/veneer/engine/units/j-holders-audit-2-verdict.md:25` says round 1’s H1 to H5 hold and the unit lands.
- No `#holdOpen` or `#releaseOpen` remains under `veneer/src/browser/`.

## 4. `HostSnapshot`'s inline held-target shape

Close: "each shape is named once in `src/browser/types.ts`."

**met**

- One declaration each: `veneer/src/browser/types.ts:423` `HostSnapshotEntry`, `:431` `HostSnapshotRecord`, `:445` `HostSnapshotHolding`, `:453` `HostSnapshotPresence`.
- The claim that those four are declared once: `scaffold/.orkestrel/veneer/engine/units/j-holders-audit-claims.md:20`. `HostSnapshot.ts` imports them (`veneer/src/browser/HostSnapshot.ts:2`).

## 5. The ScrollLock signal case and the ColorMode persist case

Close: "a signal case and a present-value case asserting `toBe(error)`, each read red under a mutation."

**met**

- Signal case: `veneer/tests/src/browser/ScrollLock.test.ts:36`. Mutation log line: `scaffold/.orkestrel/veneer/engine/units/j-holders-mutations.log.txt:11` (`H5-SIGNAL`, `expected 2 to be 1`). Same row in `scaffold/.orkestrel/veneer/engine/units/j-holders-mutations-2.log.txt:12`.
- Present-value case with `toBe(error)`: `veneer/tests/src/browser/ColorMode.test.ts:28`, assertions at `:47` and `:48`, present value at `:49` and `:50`. Mutation log lines: `j-holders-mutations.log.txt:12` (`H5-PRESENT`, `expected null to be 'light'`) and `:13` (`H5-IDENTITY`, `expected Error: stop to be Error: stop`). Round 2 repeats them at `j-holders-mutations-2.log.txt:13` and `:14`.

## 6. A stopped show after `isolation.destroy()`, and `backdrop.show()` after a reaction started `hide()`

Close: "each incoherent sweep point reads red first, under one invariant."

**met**

- One invariant, E24’s reentry amendment, two classes: `scaffold/.orkestrel/veneer/engine/decisions.md:165`.
- Stopped show after `isolation.destroy()`: incoherent points `scaffold/.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:25` through `:29` (MS-1, MS-2, MS-3, MS-68, MS-4) and `scaffold/.orkestrel/veneer/engine/units/j-reentry-sweep-offcanvas-show-report.md:16` (OS-1, OS-5, OS-84). Landed rows `veneer/tests/setupBrowser.ts:2843`. Cases `veneer/tests/src/browser/Modal.test.ts:2727` and `veneer/tests/src/browser/Offcanvas.test.ts:3012`, both failed in `j-sameway-red-orchestrator.log.txt:9` and `:17`.
- `backdrop.show()` after a reaction started `hide()`: `scaffold/.orkestrel/veneer/engine/units/j-reentry-sweep-modal-hide-report.md:21` through `:25` and `:108` (MH-S1 to MH-S5, MH-57); `scaffold/.orkestrel/veneer/engine/units/j-reentry-sweep-offcanvas-hide-report.md:19`, `:25`, `:79`, and `:80` (OH-1, OH-2, OH-76, OH-81). Rows `veneer/tests/setupBrowser.ts:2858`. Cases `veneer/tests/src/browser/Modal.test.ts:2864` and `veneer/tests/src/browser/Offcanvas.test.ts:3139`, both failed in `j-sameway-red-orchestrator.log.txt:10` and `:18`.

## 7. Fixture lookups

Close: "one lookup helper, or the lookups' removal."

**partly met**

- The roadmap marks the row closed by routing the one-match step through `requireMatch`: `scaffold/tmp/cursor/evidence/veneer-roadmap.md:548`.
- `requireMatch` is `veneer/tests/setupBrowser.ts:469`. The four lookups are still declared: `readButton` at `:519` (calls `requireMatch` at `:523`), `readSpecimen` at `:554` (`:558`), `readSubject` at `:619` (`:632`), `readOracleButton` at `:1402` (calls `readButton` at `:1403`).
- `readElement` at `veneer/tests/setupBrowser.ts:584` still takes the first `querySelector` through `requireValue`, not `requireMatch`.
- Other fixture queries: the `querySelector` / `getByRole` pattern on specimen or button fixtures matches 159 lines under `veneer/tests/app/` (58 files, from `TypeSection.test.ts` through `SpecimenSection.test.ts`) and 1 line in `veneer/tests/setupBrowser.test.ts`. Those lines were not collapsed to distinct `it` blocks.

Missing: removal of `readButton`, `readSpecimen`, `readSubject`, and `readOracleButton`, or their replacement by one lookup. The distinct `it` count of the other queries is not in what was read.

## 8. J-CASCADE's part of the fade row

Close: "the shipped sheets, the false comments gone, a Popover `animated: true` case, a motion-factor case per fade engine and Offcanvas, and a trusted touch drag."

**partly met**

- Shipped sheets and a motion-factor case: `veneer/tests/src/browser/Alert.test.ts:117` (loads at `:118`), `veneer/tests/src/browser/Tab.test.ts:448`, `veneer/tests/src/browser/Toast.test.ts:129`, `veneer/tests/src/browser/Tooltip.test.ts:316`, `veneer/tests/src/browser/Popover.test.ts:226`.
- Popover `animated: true` under the shipped cascade: `veneer/tests/src/browser/Popover.test.ts:166` (default `animated: true` at `:60`).
- Trusted touch drag: `veneer/tests/src/browser/Carousel.test.ts:1371`, `Input.dispatchTouchEvent` at `:1408`.
- False comments in the owned files: `scaffold/.orkestrel/veneer/engine/units/j-cascade-audit-verdict.md:19` and `:23`; the writer’s carry of Delegate and of Modal and Offcanvas motion-factor cases is `scaffold/.orkestrel/veneer/engine/units/j-cascade-report.md:217`. Round 2 bounds the five motion-factor cases: `scaffold/.orkestrel/veneer/engine/units/j-cascade-audit-claims-2.md:9`.
- A local fade rule remains at `veneer/tests/src/browser/Delegate.test.ts:1376` and `veneer/tests/src/browser/Offcanvas.test.ts:283`.

Missing: a motion-factor case for Offcanvas.

## 9. `ConfigSanitizer`'s walk on Chromium 141

Close: "a Chromium 141 reading of the sanitizer suite."

**met**

- `scaffold/.orkestrel/veneer/engine/units/rebaseline-0925-styles-141-sanitizer.txt:3` through `:7`: head `6d27028`, Chromium `141.0.7390.37`, file `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`, `ConfigSanitizer alone exit=0`.
- `:15` through `:16`: `Test Files  1 passed (1)`, `Tests  70 passed | 2 skipped (72)`.

## Distillate

1. Modal show and Offcanvas hide walk every listed door and failed on `4b62bca`. Nothing read names `7fd28dc` as that base.
2. Every `registry.claim` class except Popover has a throwing-construction case. Popover subclasses Tooltip. Six other browser classes have no such title.
3. Modal and Isolation go through the snapshot. ScrollLock’s holder group stays for the measurement reason. Round 2 says H1 to H5 hold.
4. `HostSnapshotEntry`, `HostSnapshotRecord`, `HostSnapshotHolding`, and `HostSnapshotPresence` are each declared once in `types.ts`.
5. The signal case is `H5-SIGNAL` at `j-holders-mutations.log.txt:11`. The present-value case is `H5-PRESENT` at `:12` and `H5-IDENTITY` at `:13`.
6. Both sweep classes are marked incoherent in the four reentry reports and fail again as the Modal and Offcanvas cases on `4b62bca`, under E24.
7. `requireMatch` is the shared match step. The four named lookups are still there, and 159 other fixture-query lines sit under `tests/app/`.
8. Alert, Tab, Toast, Tooltip, and Popover have shipped-sheet motion-factor cases, Popover has the default animated case, and Carousel has the trusted drag. Offcanvas has no motion-factor case.
9. Chromium 141 at `6d27028` ran `ConfigSanitizer.test.ts` alone: 70 passed and 2 skipped, exit 0.

## Unknowns

- Whether `4b62bca`’s Modal and Offcanvas bytes for this defect are the `7fd28dc` bytes. The red log does not say so.
- Whether Isolation, ScrollLock, Backdrop, Delegate, Swipe, and HostSnapshot save or claim during construction. Their tests were searched by title only.
- The distinct `it` count behind the 159 fixture-query lines.
