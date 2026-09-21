# CL3 audit — claims (round 2, the fix round under brief 4)

Subject: the whole CL3 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `9f5ffda`, after the fix round `sol` on Astra ran under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-brief-4.md` (over
`units/cl3-brief-3.md` and `units/cl3-brief-2.md`, in force beneath it). Round 1's verdict is
`.orkestrel/veneer/cl3-audit-verdict.md` (the analyst and the reviewer confirmed every claim of
`cl3-audit-claims.md`; the checker and the verifier did not run, so this round's mechanical and
gate claims are ruled for the first time); the fix report is `units/cl3-report-3.md`. Evidence:
the rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-diff-2.patch.txt` (tracked
changes plus a no-index rendering of every new file) and status `tmp/audit/cl3-status-2.txt`,
round 1's `units/cl3-diff.patch.txt` for comparison, the live tree, and the built
`dist/src/styles/index.css`. Audits cover implementation only. Rule on every claim with
CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence; a report-only claim (a
red-then-green run) is recorded as report-only; add an implementation-defect finding only after
the last claim, with a site and a one-line failure scenario, saying whether it forces another
round. Round 1's two wording refutations are corrected here: `_abbr.scss` selects `abbr[title]`
alone (Bootstrap's own Reboot selector), and `_var.scss` carries the record's shorter mono stack
as a literal (carried to CL3b for a token).

1. Finding 1 closed (analyst 10). `app/browser/Showcase.ts` assigns `id = 'main'` to the shell's
   main region at creation; `tests/app/browser/Showcase.test.ts` proves
   `document.getElementById('main')` is that region while mounted and `null` after `destroy`
   (red on the id-less shell: report-only, `1 failed, 3 passed` then `4 passed`); the content
   specimen `<a href="#main">Return to content</a>` in `app/browser/constants.ts` is unchanged
   and now resolves.

2. Finding 2 closed (analyst 11). `src/styles/_mixins.scss` defines one mixin
   `code-text($size: 90%, $padding: 0.125em 0.25em)` emitting the code family's shared font
   family, size, padding, and text colour, and emits no top-level CSS; `_code.scss` and
   `_samp.scss` include it with the defaults, `_kbd.scss` and `_pre.scss` with their own size and
   padding, each keeping its partial, its surface, and its distinct declarations; `_var.scss` is
   unchanged because its stack and padding differ; no two partials under `src/styles/elements/`
   declare the same code-family text block; every code-family resolved reading (font family,
   size, padding, colour, background for `code`, `samp`, `kbd`, `pre`, `var`) is unchanged
   before and after on both receipts (report-only readings; the live values are checkable
   against the round-1 case tables now in `tests/setupStyles.ts`).

3. Finding 3 closed (analyst 12). No proof under `tests/src/styles/elements/` declares a mode
   matrix or an expected-value table: `tests/setupStyles.ts` exports the frozen
   host-independent tables `TEXT_MODES` and `TEXT_<TAG>_CASES` for every text tag partial, plus
   `BUTTON_BARE_VALUES` moved from `button.test.ts` (a proof in the granted folder), each listed
   in the inventory assertion of `tests/setupStyles.test.ts`, and the proofs import them while
   keeping `it.each` as test registration; `npm run test:setup` reddened on the inventory
   (report-only, twice: the `TEXT_*` set and `BUTTON_BARE_VALUES`) and passed once listed.

4. Finding 4 closed (reviewer 10). No `console` call remains in
   `tests/src/styles/tokens.test.ts` or under `tests/src/styles/elements/`; the value assertions
   beside the removed call stand.

5. Finding 5 closed (reviewer 13). `tests/src/styles/reset.test.ts` plants an unlayered
   `display: inline-flex !important` competitor beside the component-normal, unlayered-normal,
   and later-layer-important ones, reads `none` for every competitor while `hidden` is present
   and the competitor's display after it is removed, and the fixture leaves the document through
   `specimens.clear()` in `afterEach`; no planted rule exists under `src/` or `app/`.

6. `[mechanical]` Scope, law, and gates. `tmp/audit/cl3-status-2.txt` lists the seventeen
   modified paths (round 1's fourteen plus `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
   and `tests/src/styles/elements/button.test.ts`) and the same forty-four untracked paths as
   round 1, and nothing else; the round-2 diff differs from round 1's only in brief 4's owned
   files (`app/browser/Showcase.ts`, `tests/app/browser/Showcase.test.ts`, `src/styles/_mixins.scss`,
   `_code.scss`, `_samp.scss`, `_kbd.scss`, `_pre.scss`, the setup pair, the proofs under
   `tests/src/styles/elements/`, `tests/src/styles/tokens.test.ts`, `tests/src/styles/reset.test.ts`);
   `_tokens.scss`, `src/core/**`, `tests/setupBrowser.ts`, `tests/setupConformance*.ts`,
   `tests/conformance.test.ts`, `src/styles/components/**`, `tests/fixtures/**`, `package.json`,
   `configs/**`, and the vendored files are absent from the diff. The added lines carry no
   `any`, no type assertion outside `as const`, no non-null assertion, no suppression comment,
   no `public`/`private`/`protected`, no parameter property, no default export, no skipped
   case, and no case named for a control; no `CL3_READING`, `CL3 code tokens`, or `console.`
   residue remains; `git diff --check` is clean. Every gate in brief 4's item 4 exits 0 on
   managed Chromium and Edge, `npm test` exits 0, and `scaffold audit` reports only the
   pre-existing `setupListeners` note and the three registry majors (verifier, first run for
   this unit). The registry and the cascade still agree on every name and the guide's
   Compatibility table and `listed` (`['btn']`) are unchanged.
