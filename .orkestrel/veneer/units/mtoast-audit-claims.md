# E-ID-MOTION-TOAST audit — claims

Subject: E-ID-MOTION-TOAST in `/home/user/veneer-mtoast` (branch `unit/mtoast`, committed as `70b1d59` over Veneer
`6586b11`), briefed by `e-id-motion-toast-brief.md` and, after its stop (`e-id-motion-toast-report.md`), by
`e-id-motion-toast-brief-2.md`. Written by `opus` on Opus 5.5 and reported in `e-id-motion-toast-report.md` and
`e-id-motion-toast-report-2.md`. Evidence: `mtoast-instruments/` (`mtoast-2.diff`, `git diff 6586b11`; `mtoast-2-status.txt`;
the red, plant, search, and gate drivers; every log; the report-only guide patch). All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. The change reads with `git -C /home/user/veneer-mtoast diff 6586b11 70b1d59`.
The design verdict that binds is `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Toast entry
and Tooltip and popover entry rows, § Proof, and § Risks). A mutation counts as a kill only when the failing case's log
names an `AssertionError`. Rule every claim.

1. **The toast motion.** An animated toast (the `fade` class) scales from `scale(0.98)` to `none` as it fades in and from
   `none` to `scale(0.98)` as it fades out, as the engine's `showing` class leaves and joins: `transform` over
   `--vn-motion-feedback` on `--vn-ease-standard`, beside `opacity` over `--vn-motion-feedback` on `--vn-ease-out`. A toast
   without the `fade` class declares no transition, a shown toast at rest reads `transform: none`, a doubled factor
   doubles each duration, a zero factor starts none, and under the reduced-motion preference none runs.
2. **The toast proofs.** Each case the report lists drives the class writes `src/browser/Toast.ts` makes and reads the
   running transition through `sampleTransition`; they failed on the base partial and pass after; the `drop-scale`,
   `move-transition`, and `ease-out` plants each fail a case with an `AssertionError` and restore identically. For each
   case, name the mutation that would make it fail, and say whether its assertions distinguish it from the passing case.
3. **The fade case and its table.** Each `FADE_COMPONENT_CASES` entry carries a frozen `transitions` list in Chromium's
   serialization order (`['opacity', 'transform']` for the toast, `['opacity']` for every other entry); the fade case
   compares each set's `transition-property` with it exactly, hidden and shown; the setup case pins every list frozen,
   non-empty, and naming `opacity`; the `fade-transitions` plant fails the fade case with an `AssertionError`.
4. **The ledger rows.** The toast's § Additions and § Departures rows equal what `npm run test:conformance` prints on the
   changed cascade, and each Reason cell is true of the declaration it records.
5. **Engine and showcase.** `tests/src/browser/Toast.test.ts` passes unchanged after `npm run build:src`, and
   `npm run test:app` passes; the search found no reading of a toast's transition list outside the owned files.
6. **The guide prose.** § Toast classes, the § Compatibility toast selector row, and the `## Engine` Toast paragraph as
   applied state the rendered motion truly, in each direction and in the order the engine writes its classes, and read
   once, in the voice `.claude/rules/writing.md` fixes; no other guide sentence the change makes false remains.
7. **The design verdict.** The change delivers the Toast entry row: the scale-in, stated per direction from the engine's
   class sequence because the `showing` class marks both directions.
8. **Scope and gates.** The status names only files the two briefs own. The oxfmt check, `npm run check`,
   `npm run lint:check`, `npm run build:src`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`,
   `npm run test:policy`, the `Toast` engine proof, `npm run test:app`, and `npm run test:src:styles` exit 0 in
   `mtoast-instruments/`.
