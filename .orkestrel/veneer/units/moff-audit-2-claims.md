# E-ID-MOTION-OFFCANVAS audit round 2 — claims

Subject: E-ID-MOTION-OFFCANVAS round 2 in `/home/user/veneer-moff` (branch `unit/moff`, committed as `32a6c28` over round
1's `73cd4f0`, which sits over Veneer `877e7c6`), briefed by `e-id-motion-offcanvas-brief-3.md` on the findings of
`moff-audit-verdict.md`. Written by `opus` on Opus 5.5 and reported in `e-id-motion-offcanvas-report-2.md`. Evidence:
`moff-instruments-2/` (`moff-2.diff`, `git diff 73cd4f0`; `moff-2-status.txt`; `moff-plants-2.sh`, `moff-gates-2.sh`, and
every log). Round 1's evidence stays in `moff-instruments/`. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. The round's change reads with `git -C /home/user/veneer-moff diff 73cd4f0
32a6c28`, and the whole unit with `git -C /home/user/veneer-moff diff 877e7c6 32a6c28`. The design verdict that binds is
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Offcanvas panel row, § Proof, and unit 7). A
mutation counts as a kill only when the failing case's log names an `AssertionError`. Rule every claim.

1. **The responsive exit (round 1's claim 3).** The responsive case drives, at each breakpoint's readings, the whole
   class sequence the engine writes (`showing` and `show` join; `showing` leaves; `hiding` joins as `show` leaves;
   `hiding` leaves) and reads through `sampleTransition` the `transform` and `opacity` transitions on entry and on exit.
   Below the boundary both moves run on the specimen's duration and curves and the panel ends transparent; at and above
   it every sample is absent and the opacity reads `1` at every step. For each case the report's coverage table lists,
   name the mutation that would make it fail, and say whether its assertions distinguish it from the passing case.
2. **The plants.** The `hiding-opaque`, `leak`, and `mixin` plants and round 1's `literal`, `opacity`, `transition`,
   and `navbar-reset` plants each fail a case with an `AssertionError` and restore their file identically
   (`moff-plants-2-summary.log.txt` and each `moff-plant-<name>.log.txt`); the `hiding-opaque` plant fails the round-1
   rules only through the extended case (`moff-plant-hiding-opaque.log.txt`), and the `mixin` plant is caught through
   the reduced-motion reading.
3. **The guide (round 1's claim 6).** § Offcanvas classes states the value each move resolves to at a factor of `1`
   (`250ms`, on the `cubic-bezier(0.32, 0.72, 0, 1)` curve for the slide and the `ease-out` curve for the fade),
   against the release's `0.3s`, and each sentence the round changed reads true against the built cascade
   (`dist/src/styles/index.css`) and once, in the voice `.claude/rules/writing.md` fixes.
4. **The comments.** The header comment of `_offcanvas.scss` and every comment line the unit wrote or changed in its
   owned files state what the code does and fit in 100 columns; the one longer line is the `.offcanvas .btn-close`
   comment, which predates the unit.
5. **No regression.** The round changes no rule: the unit's partials read as at `73cd4f0` apart from the header
   comment, so round 1's confirmed claims (the panel motion, the ledger rows, the engine and showcase readings, the
   design verdict's row) hold unchanged.
6. **Scope and gates.** The status names only files the briefs own. The oxfmt check, `npm run check`,
   `npm run lint:check`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run build:src`, the
   `Offcanvas` and `Backdrop` engine proofs, `npm run test:app`, and `npm run test:conformance` exit 0 in
   `moff-instruments-2/`.
