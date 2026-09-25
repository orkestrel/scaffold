# FACTORS-LEDGER audit — claims

Subject: FACTORS-LEDGER on the MODAL and FACTOR landing tree in `/home/user/veneer` (the session branch at `6052e25`,
committed over `c3ef630`), briefed by `factors-ledger-brief.md`, whose Item the Orchestrator wrote. Applied by `builder`
on Sonnet and reported in `factors-ledger-report.md`. Evidence: `fl-instruments/fl.diff` (`git diff c3ef630 6052e25`),
`fl-instruments/fl-delta.diff`, and the gate logs in `fl-instruments/`. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Rule every claim; compare words, not line wrapping.

1. **The Item.** `fl.diff` replaces exactly the sentence "§ Departures records each scaled duration that differs from the
   release's, such as the `.icon-link` transform's." with "§ Departures or § Additions records each scaled duration that
   differs from the release's, such as the `.icon-link` transform's in § Departures and the modal host's in
   § Additions." and changes no other word.
2. **The sentence is true.** On the landing tree, every transition duration the built cascade
   (`dist/src/styles/index.css`, rebuilt from the tree at `6052e25`) scales through a `--vn-motion-*` token and that
   resolves at the default factors to a value other than the release's
   (`node_modules/bootstrap/dist/css/bootstrap.css`) has a row in § Tokens › § Departures or § Tokens › § Additions of
   `guides/veneer.md`; the `.icon-link` transform's row is in § Departures; and the modal host's row is in § Additions.
3. **The paragraph is true.** The § Factors paragraph that holds the sentence, read whole after the edit, is true of the
   built cascade and the partials under `src/styles/`.
4. **Gates.** The oxfmt check, `npm run test:guides`, and `npm run test:policy` exit 0 in `fl-instruments/`.
