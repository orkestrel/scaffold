# E-ID-MOTION-COLLAPSE audit — claims

Subject: E-ID-MOTION-COLLAPSE in `/home/user/veneer-mcol` (branch `unit/mcol`, committed as `9e1fe4e` over Veneer
`877e7c6`), briefed by `e-id-motion-collapse-brief.md` and, after its stop (`e-id-motion-collapse-stop-report.md`), by
`e-id-motion-collapse-brief-2.md`. Written by `opus` on Opus 5.5 and reported in `e-id-motion-collapse-report.md`.
Evidence: `mcol-instruments/` (`mcol.diff`, `git diff 877e7c6`; `mcol-status.txt`; the edit, plant, and gate scripts;
every log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The live change reads with
`git -C /home/user/veneer-mcol diff 877e7c6 9e1fe4e`. The design verdict that binds is
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Collapse panel and Accordion chevron rows,
§ Proof, and unit 3), and the engine decisions are E27 and E32 in `/home/user/scaffold/.orkestrel/veneer/engine/decisions.md`.
A mutation counts as a kill only when the failing case's log names an `AssertionError`. Rule every claim.

1. **The panel motion.** A vertical panel carrying `collapsing` moves its `height`, and a horizontal panel its `width`,
   over the resolved `--vn-motion-panel` token on `--vn-ease-panel`, and moves no other property; no root
   `interpolate-size` is written; under the reduced-motion preference and at a zero motion factor no transition runs and
   the panel still reaches its end size.
2. **The chevron motion.** The accordion button's `::after` chevron turns its `transform` over the resolved
   `--vn-motion-feedback` token on `--vn-ease-standard` as the button takes and loses the `collapsed` class, ending at
   the release's `rotate(-180deg)` on an expanded button; the button's own transition is unchanged.
3. **The proofs.** Each case the report lists under Failing first failed on the base rules (`mcol-red.log.txt`) and
   passes after (`mcol-green.log.txt`). The chevron case proves the turn's timing and curve through the pseudo-element's
   resolved longhands and its frames, as the report states, because the installed `sampleTransition` reader takes no
   pseudo-element; rule whether that proof distinguishes a chevron that turns over another duration or curve, and one
   that does not turn at all. The rewritten fade case proves the load order without pinning the collapse timing. The
   `collapse-literal`, `chevron-literal`, `collapse-opacity`, and `fade-order` plants each fail a case with an
   `AssertionError` and restore their file identically. For each case, name the mutation that would make it fail, and
   say whether its assertions distinguish that mutation from the passing case.
4. **The ledger rows.** The three § Departures rows the report lists equal what `npm run test:conformance` prints on the
   changed cascade (`mcol-conformance.log.txt`), and no § Additions row applies. Say which rows LEDGER-RETUNE's resolver
   would reclassify.
5. **Engine and showcase.** No proof under `tests/src/browser` or `tests/app` pins a value this change moves (the
   report's Searches), and the `Collapse` engine proofs and `npm run test:app` pass on the changed cascade
   (`mcol-collapse-browser.log.txt`, `mcol-app.log.txt`), as E32 requires; J-COLLAPSE-SIZE's size mechanism (E27) is
   untouched.
6. **The guide prose.** The § Collapse classes and § Accordion classes paragraphs and departure bullets and the § Factors
   exception list state the rendered motion truly and read once, and no other guide sentence the change makes false
   remains.
7. **The design verdict.** The change delivers the design verdict's Collapse panel and Accordion chevron rows and unit 3.
8. **Scope and gates.** The status names only files the two briefs own. The oxfmt check, `npm run check`,
   `npm run lint:check`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`,
   `npm run build:src`, the engine proofs, and `npm run test:app` exit 0 in `mcol-instruments/`.
