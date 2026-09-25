# J-MOTION-PROOFS-A audit — the checker job (grok on Cursor Grok, grok-4.7-high, ask mode), retained verbatim

Brief: `units/j-motion-proofs-a-checker-brief.md` (launch copy `tmp/cursor/j-motion-proofs-a-checker-brief.md`, swept); journal `tmp/cursor/j-motion-proofs-a-checker.jsonl` (swept at acceptance); session id in the first line below.

---

<!-- Grok lane j-motion-proofs-a-checker, session 01fd0c88-e25a-47a9-a919-54bd4bb7a1e8 -->

I'll read the brief and follow it exactly.The brief limits this to claims 1, 6, and 7. I'll read the claims, decision E32, and the subject files next.Claim 1 needs every duration, easing, and transition comparison in the four tests. I'll search those files and the duration reader next.The worktree search missed `transitionDuration`. I'll search the four tests and both `veneer` trees for duration and easing literals.**Claim 1 — CONFIRMED.** No line in the four owned tests compares a duration, an easing, or a transition property name to a literal. Durations those proofs assert are `readDuration` or `getAnimations` (`Modal.test.ts:257`, `Modal.test.ts:304`, `Offcanvas.test.ts:306`, `Alert.test.ts:139`, `Alert.test.ts:165`, `Backdrop.test.ts:38`).

Lines that set a condition, with a comment that says so:
- `Modal.test.ts:259` (`${2 * shipped}ms`), comment `Modal.test.ts:243-248`
- `Offcanvas.test.ts:311` and `Offcanvas.test.ts:313` (`${2 * shipped}ms`), comment `Offcanvas.test.ts:292-298`
- `Offcanvas.test.ts:1095` (`'2s'`), comment `Offcanvas.test.ts:1094`
- `Alert.test.ts:385` (`opacity 0.15s linear`), comment `Alert.test.ts:380-382` (selector `.is-fading`; shipped fade is `opacity var(--vn-motion-feedback) linear` at `_fade.scss:19`)

`Backdrop.test.ts` has no such line.

**Claim 6 — FAIL.** `readDuration` is on the export list at `tests/setupBrowser.test.ts:922` (import `tests/setupBrowser.test.ts:63`). The only `parseFloat` of a time is inside `readDuration` at `tests/setupBrowser.ts:1808`. `transitionDuration` is also read outside that function:

- `tests/src/browser/Tooltip.test.ts:345`, `tests/src/browser/Tooltip.test.ts:361`
- `tests/src/browser/Toast.test.ts:65`, `tests/src/browser/Toast.test.ts:71`, `tests/src/browser/Toast.test.ts:74`, `tests/src/browser/Toast.test.ts:155`, `tests/src/browser/Toast.test.ts:167`, `tests/src/browser/Toast.test.ts:269`
- `tests/src/browser/Tab.test.ts:64`, `tests/src/browser/Tab.test.ts:69`, `tests/src/browser/Tab.test.ts:72`, `tests/src/browser/Tab.test.ts:484`, `tests/src/browser/Tab.test.ts:496`
- `tests/src/browser/Popover.test.ts:208`, `tests/src/browser/Popover.test.ts:255`, `tests/src/browser/Popover.test.ts:271`
- `tests/src/browser/Dropdown.test.ts:85`
- `tests/src/browser/Collapse.test.ts:57`, `tests/src/browser/Collapse.test.ts:424`, `tests/src/browser/Collapse.test.ts:456`
- `tests/src/browser/Carousel.test.ts:105`, `tests/src/browser/Carousel.test.ts:410`

`src/` and `app/` have no `transitionDuration` hit. The four owned test files have none.

**Claim 7 — CONFIRMED.** Status paths: `guides/veneer.md`, `src/browser/Modal.ts`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/src/browser/Alert.test.ts`, `tests/src/browser/Backdrop.test.ts`, `tests/src/browser/Modal.test.ts`, `tests/src/browser/Offcanvas.test.ts`. The setup hunks only add `readDuration`: import `j-motion-proofs-a.diff:135`, export-list entry `j-motion-proofs-a.diff:143`, the `describe('readDuration')` block `j-motion-proofs-a.diff:151-163`, and the function `j-motion-proofs-a.diff:176-201`.

VERDICT: FAIL 6
