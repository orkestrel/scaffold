# J-MOTION-PROOFS-A rounds 1 and 2 — audit verdict (2026-09-25)

**Subject.** Veneer `beb7cd8` on `unit/motion-proofs-a`. The claims are `units/j-motion-proofs-a-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6fb-2fd8-7932-b400-e2ada766686f` (`units/j-motion-proofs-a-audit-objective-verdict.md`): `VERDICT: FAIL 2 3`, with claim 5 UNRESOLVED.
- **Checker job:** Grok, session `01fd0c88-e25a-47a9-a919-54bd4bb7a1e8`, on claims 1, 6, and 7 (`units/j-motion-proofs-a-audit-checker-verdict.md`): `VERDICT: FAIL 6`.
- **Subjective:** not run. The unit adds no public shape: a private `#settle` in `Modal` and a test reader.

**Rulings.**
- **Claim 1: CONFIRMED** (the checker).
- **Claim 2: FAIL, upheld.** `Modal` selects its dialog once, at construction. A dialog inserted afterwards is moved by the show's `.show` token and never settled, so `shown.vn.modal` can fire before it finishes.
  - Bootstrap caches its dialog the same way (`modal.js` around line 70). E32 still binds, because the engine follows the longest motion it moves: `#settle` reads the dialog live, at each settle.
  - A red-first case constructs the modal before inserting its dialog.
- **Claim 3: FAIL, upheld.**
  - The Modal hide and order proofs keep no reading of the backdrop's hide animation, so a mutation that stops awaiting the backdrop's hide would pass. They keep that reading, as the Offcanvas order proof does.
  - The Alert proofs read connection at `closed`, not the animations, so they read the moved element's animations fresh at `closed`.
- **Claim 4: CONFIRMED.**
- **Claim 5: UNRESOLVED, closed by retention and a replay.** The plant's Python half (`units/j-motion-proofs-a-plant.py`) was not retained, and the replay never ran the plant. The Orchestrator retains it now, and round 3's replay runs it.
- **Claim 6: FAIL on its wording, and the defect's carrier is named.** The claim said "the only reading … in `tests`", but the pins the checker lists sit in `Toast`, `Tab`, `Collapse`, `Carousel`, `Tooltip`, `Popover`, and `Dropdown` tests. J-MOTION-PROOFS-B and -C own and convert those files. Within this unit's files, `readDuration` is the only reader. J-MOTION-PROOFS-B's brief already requires `readDuration`, and J-MOTION-PROOFS-C takes `Dropdown.test.ts` beside `Tooltip.test.ts` and `Popover.test.ts`.
- **Claim 7: CONFIRMED** (the checker).
- **Claim 8: CONFIRMED.** The `AbortError` in four mutated runs sits beside a named assertion failure in each, and the unmutated control reports none.
- **Outside the claims: a lost regression check, upheld.** Backdrop's replacement-token case now loads no transition, so a wait gated on the literal `fade` class would escape it. It loads a transition for the replacing classes, with a comment naming it the consumer's own rule.
- **Outside the claims: a stopped overlay show writes a prior attribute back wrongly.** Take a connected Offcanvas host carrying `role="region"`, with `backdrop: false, scroll: true`, and a show that is stopped: the return removes the role instead of writing `"region"` back. Modal has the same shape. This is E24's prior-value rule in Modal and Offcanvas, which J-OVERLAYS already carries. The witness is added to its row.

**Carried.** Claims 2 and 3, the Backdrop regression check, and the plant replay go to `units/j-motion-proofs-a-brief-3.md`, their one carrier. The E24 witness goes to J-OVERLAYS, and claim 6's files go to J-MOTION-PROOFS-B and -C.

VERDICT: FAIL 2, 3 — round 3 (`units/j-motion-proofs-a-brief-3.md`)
