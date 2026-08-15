# U5 checker report (mechanical conformance, native lane)

Subject: commit 7c0ddd3. Verdict line: CHECK: 4 findings (all judgment items, no violations).

1. **Touched set** — conforms. Six files: the five owned plus `tests/app/browser/seeders.test.ts`
   (out-of-owned, exactly 3 assertion lines: `#workflow`→`#rail`, `.badge` text →
   `[aria-controls="rail"]` aria-label, throw message). Report-only; Orchestrator rules.
2. **Forbidden constructs** — conforms across the full diff: no `any`/`as`/`!`/suppressions,
   no mocks/spies/fake clocks, no `style` attributes, no polling architecture, no new deps, no
   default exports. `waitForDelay` uses the existing shared helper pattern; the keyboard
   journey's bounded loop is real-input-driven (24 real Tab presses), not timer polling.
3. **Class tokens** — conforms. All added tokens are standard Bootstrap 5 offcanvas/utility or
   Bootstrap Icons vocabulary already in use; no invented tokens.
4. **Caption law** — sweep allowance exactly `['Open by id']` (conforms). JUDGMENT: below-lg
   control's visible caption is the count ("2") while `aria-label="Runs: 2 live, 1 paused"`
   contains "2" as a substring of a longer sentence — does that satisfy the sweep's containment
   law? → reviewer.
5. **Naming** — conforms. `drawer`, `refusal`, `fleet`, `fallback`, `dismiss`, `reveal`,
   `conceal` single words; `renderFleet`/`driveApplication` are {verb}{Noun}; no new
   discriminants; `reveal`/`conceal` distinct from existing `disclose`.
6. **tests.md letter** — REPORT-ONLY ×2: (a) `halfmoon/css/halfmoon.min.css` imported in
   `ApplicationView.test.ts` (u5.diff:435) while tests.md:56 places setup CSS in
   `tests/setupBrowser.ts` (writer flagged it, file not owned); (b) `renderFleet` is a local
   single-use helper in the test file — extraction trigger ("could serve another test") is a
   judgment call → reviewer.
7. **aria additions** — conforms. No live-region attribute added anywhere; the shell's old
   `role="status"` span is REMOVED so the one status region is RunList's; the restore-notice
   paragraph carries no role/aria-live; login refusal's `role="alert"` unchanged in kind.

Needs the reviewer: caption containment (4), renderFleet extraction (6b).
Needs the Orchestrator: seeders ratify-or-revert (1), cascade-import placement ruling (6a).
