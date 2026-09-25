# E-ID-BUTTON-CLASSES audit round 2 — claims

Subject: E-ID-BUTTON-CLASSES round 2 in `/home/user/veneer-ebcl` (branch `unit/ebcl`, uncommitted over Veneer
`2376710`), briefed by `e-id-button-classes-brief-2.md`, which carries the findings `ebcl-audit-verdict.md` failed and the
Chromium 153 row. Written by `opus` on Opus 5.5 and reported in `e-id-button-classes-report-2.md`. Evidence: `ebcl-2.diff`
(`git diff 2376710`, both rounds), `ebcl-2-status.txt`, and `ebcl-instruments/r2/` (the release reading, the plant and
gate drivers, and every log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a
kill only when the failing case's message names an assertion failure. Rule every claim.

1. **The release maps.** On Chromium 141.0.7390.37 the release's button-versus-anchor map for each `.btn` form and state
   equals the fixed list round 1 held in `BUTTON_FORM_DIFFERENCES`, and the Veneer map equals the release map in every
   form and state (`ebcl-2-btn-release.log.txt`).
2. **The reader.** `readFormDifferences` in `tests/setupBrowser.ts` mounts a button form and its counterpart under the
   holder in the Veneer document and in a shadow root holding the release's `bootstrap.css`; drives each state with real
   input on each element; checks each element's entry per state (`:hover`, `:active`, `:focus-visible`; `:disabled` for
   the button; `.disabled` for a paired counterpart; `*` for rest and for an unpaired counterpart) and throws one error
   naming every miss; reads rest with motion allowed and every later state with motion reduced; releases pointer and
   media in `finally`; and returns each cascade's map of differing longhands with the button's value, custom properties
   left out. Its cases in `tests/setupBrowser.test.ts` distinguish a planted longhand in one state from a control, the
   motion staging from its absence, the disabled entry of a paired from an unpaired counterpart, and a missed entry
   from a reached one.
3. **The `.btn` proof.** In `tests/src/styles/elements/button.test.ts`, each `.btn` form's case calls the reader and
   asserts that the Veneer map equals the release map in every state, after the `appearance` guard; no site in the tree
   reads `BUTTON_FORM_DIFFERENCES`; and the `btn-leak` plant fails every enabled form with an `AssertionError` while the
   disabled form stays green for the reason the report gives.
4. **The reboot proofs.** Each class's reboot case sits in the test file of the partial that writes its include
   (`close`, `navbar`, `accordion`, `dropdown`, `nav`, `list-group`, `pagination`, and `carousel` for its controls and
   indicator), calls the reader over its `BUTTON_REBOOT_CASES` entry, and asserts the `appearance` guard and the
   Veneer-equals-release equality; `button.test.ts` keeps only the `.btn` proof and the nav-link case; and the `include`
   plant fails the close case with an `AssertionError`.
5. **The default-moving plant.** The brief's `both-default` rule, `outline-width: 3px` alone, changes no computed value on
   Chromium 141, because an anchor whose `outline-style` is `none` computes `outline-width` as `0px`, so its green
   reading in the document alone proves nothing. The unit's added rule, `outline-width: 3px` with `outline-style: solid`
   on the anchor form in the pressed state, is a faithful stand-in for a user-agent default that moves both cascades:
   with both cascades moved the `.btn` proof stays green, and with the document alone every enabled form fails with an
   `AssertionError` (`ebcl-2-plant-both-default.log.txt`). The injection is removed.
6. **R3.** The case in `tests/setupStyles.test.ts` asserts that `BUTTON_REBOOT_CASES` names exactly the classes the
   `BUTTON_REBOOT_SELECTORS` selectors reset, reading each selector through `collectSelectorClasses` and
   `splitTopLevelList`, and the `r3` plant fails it with an `AssertionError`.
7. **F1, F2, and claim 10.** `BUTTON_RETUNED_HOLDER_STYLE` is renamed `BUTTON_REBOOT_HOLDER_STYLE` at every site; the
   readings are `buttonReading` and `counterpartReading`; every comment and TSDoc the round touched states what the code
   does; and the § Outside the ledger paragraph is true of the code, saying "outside forced colors" and "no `:disabled`
   rule" and naming where each reboot case sits and the reader.
8. **Shape and law.** The reader, its types (`FormState`, `FormPair`, `FormDifference`, `FormComparison`), and
   `FORM_ENTRIES` follow `.claude/rules/tests.md` § Shared test infrastructure, `.claude/rules/names.md`, and `AGENTS.md`
   (no nested function beyond an anonymous callback passed directly, readonly members, one concept one term, no
   assertion or `as`), each export is in the export-list case, and the round changes nothing else in
   `tests/setupBrowser.ts` or `tests/setupBrowser.test.ts`.
9. **Scope and gates.** The status names only owned files and `git diff 2376710 -- src` is empty; the oxfmt check,
   `npm run check`, `npm run lint:check`, the styles build, the owned styles files, the setup-browser file, the setup
   styles file, `npm run test:guides`, and `npm run test:policy` exit 0 in `ebcl-instruments/r2/`; `npm run
   test:conformance` timed out once at load 16 and passed on a re-run, and the landing chain takes the deciding
   reading.
