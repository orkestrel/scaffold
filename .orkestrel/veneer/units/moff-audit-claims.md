# E-ID-MOTION-OFFCANVAS audit — claims

Subject: E-ID-MOTION-OFFCANVAS in `/home/user/veneer-moff` (branch `unit/moff`, committed as `73cd4f0` over Veneer
`877e7c6`), briefed by `e-id-motion-offcanvas-brief.md` and, after its stop (`e-id-motion-offcanvas-stop-report.md`), by
`e-id-motion-offcanvas-brief-2.md`. Written by `opus` on Opus 5.5 and reported in `e-id-motion-offcanvas-report.md`.
Evidence: `moff-instruments/` (`moff.diff`, `git diff 877e7c6`; `moff-status.txt`; the plant and gate drivers; every
log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The live change reads with
`git -C /home/user/veneer-moff diff 877e7c6 73cd4f0`. The design verdict that binds is
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Offcanvas panel row, § Proof, § Risks, and
unit 7), and the engine decision is E32 in `/home/user/scaffold/.orkestrel/veneer/engine/decisions.md`. A mutation
counts as a kill only when the failing case's log names an `AssertionError`. Rule every claim.

1. **The panel motion.** A fixed panel (the bare `.offcanvas` class, and each `.offcanvas-{bp}` class below its
   boundary) rests transparent and slid out; as the `showing` and `show` classes join, then `showing` leaves, it moves
   its `transform` to `none` over the resolved `--vn-motion-panel` token on `--vn-ease-panel` and its `opacity` to `1`
   over the same token on `--vn-ease-out`; as `hiding` joins and `show` leaves, it moves back out and to `0` on the same
   timing. Bootstrap's `±100%` travel stays. Under the reduced-motion preference no transition runs.
2. **The in-flow ranges.** A responsive panel at and above its boundary is opaque and runs no transition, whatever
   state class it carries. A panel inside `.navbar-expand` or `.navbar-expand-{bp}` above the bar's boundary is opaque,
   and the navbar rule's `opacity: 1` wins over the offcanvas rest for the reason the navbar partial's comment states.
   Below the bar's boundary the panel keeps the fixed panel's motion. No other element changes opacity or transition.
3. **The proofs.** Each case the report lists under Failing-first drives the class writes the engine makes and reads the
   running transition through `sampleTransition`; each failed on the base cascade (`moff-red-final.log.txt`) and
   passes after (`moff-green.log.txt`). The factor case asserts the doubled duration as a ratio to the resting one and a
   zero factor as no transition. The `literal`, `opacity`, `transition`, and `navbar-reset` plants each fail a case with
   an `AssertionError` and restore their file identically. For each case, name the mutation that would make it fail,
   and say whether its assertions distinguish that mutation from the passing case.
4. **The ledger rows.** The § Departures and § Additions rows the report lists equal what `npm run test:conformance`
   prints on the changed cascade (`moff-conformance.log.txt`), and each Reason cell is true of the declaration it
   records. Say which rows LEDGER-RETUNE's resolver would reclassify.
5. **Engine and showcase.** No proof under `tests/src/browser` or `tests/app` pins a value this change moves (the
   report's Searches). The `Offcanvas` and `Backdrop` engine proofs and `npm run test:app` pass on the changed cascade
   (`moff-browser.log.txt`, `moff-app.log.txt`), as E32 requires; the showcase's navbar specimen that puts `show` on its
   panel renders the panel opaque.
6. **The guide prose.** The § Offcanvas classes paragraphs and departure bullet, the § Navbar classes paragraph, the
   § Factors exception list, and the `## Engine` Offcanvas sentence the report quotes state the rendered motion truly and
   read once, and no other guide sentence the change makes false remains.
7. **The design verdict.** The change delivers the design verdict's Offcanvas panel row and unit 7: the slide and fade
   timings and curves, the `±100%` travel, opacity `0` on the hidden and `.hiding` states and `1` on `.showing` and
   `.show:not(.hiding)`, and full opacity for a responsive panel inside its in-flow range.
8. **Scope and gates.** The status names only files the two briefs own. The oxfmt check, `npm run check`,
   `npm run lint:check`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`,
   `npm run build:src`, the engine proofs, and `npm run test:app` exit 0 in `moff-instruments/`.
