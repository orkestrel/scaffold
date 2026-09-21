# U7e audit claims

Subject: unit U7e in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), written by
`opus` on native Opus 5 under `units/u7e-brief.md` (retained under `.orkestrel/veneer/units/`),
report `units/u7e-report.md`, over the U7c landing `92aad70`. Evidence rendered by the
Orchestrator: `units/u7e-diff.patch.txt` (`git diff 92aad70`, the guide alone) and
`tmp/audit/u7e-status.txt`. Under the user's rulings (audits cover implementation only; guides
are the parity minimum) the round runs one judging lane, the objective analyst on Astra, and the
verifier: it rules whether each changed sentence, row, and cell is true of the landed tree and
whether each change is the minimum its falsity required; no wording, register, or style finding.
An extra finding is a changed sentence that is false of the tree, or a sentence one of the
brief's bounds names that is false and was left unedited, numbered from 9.

1. § Showcase (bound 1): the corrected paragraph is true — the shell renders a `Buttons` region
   carrying every declared specimen (`app/browser/Showcase.ts` constructs `ButtonSection`;
   `BUTTON_COPY.region` is `'Buttons'`; `ButtonSection` renders every `BUTTON_SPECIMENS` row) and
   `app/browser/main.ts` constructs a `Delegate` instance beside the showcase; nothing else in the
   paragraph changed.
2. § Tests (bound 2): the added link resolves to `tests/app/browser/sections/ButtonSection.test.ts`,
   and that proof covers what the link text names (specimen rendering, engine ownership); the
   sentence's other links are unchanged.
3. § Compatibility (bound 3, the unknown): ruled true as written with no edit — every Button
   row's Proof cell names a recording step or carries an em dash, and the prose about that
   column (the conformance suite comparing named steps with the recording; the forced-colors
   reading open because the installed `MediaOptions` stages `print` and `motion` only) holds on
   the tree.
4. § Departures from Bootstrap (bound 4): the added `--bs-btn-focus-shadow-rgb` row is true —
   `src/styles/components/_button.scss` declares it as `var(--vn-color-primary-rgb)` on `.btn`,
   no Veneer rule reads it (the built `dist/src/styles/index.css` carries no
   `var(--bs-btn-focus-shadow-rgb)`), `--bs-btn-focus-box-shadow` carries its own ring expression,
   and Bootstrap 5.3.8 reads the variable in its `.btn` focus shadow with each role's own
   triplet; the row keeps the table's column shape.
5. § Styles and § Departures from the workspace rows (bounds 5a and 5b): the narrowed
   proof-subject sentence is true (`tests/src/styles/tokens.test.ts` reads a second built
   stylesheet through a raw import, so only a case reading the loaded file reads resolved rules),
   and the narrowed workspace sentence is true (`.claude/rules/workspace.md` carries a styles row
   in each table keyed by environment and none in its workspace-proof and script-intent tables);
   the rewrap changed no wording.
6. The correction outside the bounds (§ Showcase, the styles-entry paragraph): the corrected
   sentence is true — `src/styles/index.scss` loads `elements/button` and `components/button`,
   the `components/` directory holds `_button.scss` alone, the `elements/` directory holds
   `_html.scss`, `_body.scss`, and `_button.scss`, so the entry ships the bare button treatment
   and the `.btn` treatments and no treatment for another component; the prior sentence ("It
   ships no component treatments.") was false since U7a, and the correction sits inside the
   unit's objective and its one owned file.
7. The four observations the report lists as incomplete enumerations (§ Tests' browser-proofs
   sentence, § Surface's intro, § Tokens' mixin parameters, § Departures' proof list) are
   incomplete rather than false, so leaving them unedited is consistent with the parity-minimum
   ruling; none is a sentence a bound names.
8. Scope and gates: the diff touches `guides/veneer.md` alone, at the six sites and the rewrap;
   the status shows that file alone; the report records `format:check`, `test:guides`,
   `test:policy`, `test:conformance`, and `npm test` exit 0, and the verifier's re-run on the
   host rules the gate half of this claim.
