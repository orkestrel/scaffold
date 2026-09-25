# E-ID-CODE round 3 audit — claims

Subject: E-ID-CODE round 3 in `/home/user/veneer-eic` (branch `unit/eic`, uncommitted over Veneer `ca83afb`), briefed
by `e-id-code-brief-3.md` under `e-id-common.md` and `../e-identity-design-verdict.md` § Addendum 2, written by `opus`
on Opus 5.5, and reported in `e-id-code-report-3.md`. The diff is `eic-3.diff`, the status `eic-3-status.txt`, and the
instruments and logs `eic-instruments/r3/` (earlier rounds' under `eic-instruments/`). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. The unit's compiled cascade is
`/home/user/veneer-eic/dist/src/styles/index.css`; Bootstrap 5.3.8 is
`/home/user/veneer-eic/node_modules/bootstrap/dist/css/bootstrap.css`. A unit report's prose is not a claim subject.
Each claim is falsifiable; rule every one.

1. **Scope.** The status lists only files the round-1 to round-3 briefs grant, and `_code.scss`, `code.test.ts`,
   `tests/src/styles/index.test.ts`, and `tests/setupStyles.test.ts` are byte-identical to `ca83afb`.
2. **Withdrawal.** No rule whose selector pairs two tags (`pre code`, `a > code`, `kbd kbd`, or any other) ships from
   `_code.scss`, `_pre.scss`, `_kbd.scss`, or `_samp.scss` in the compiled cascade, and `RELEASE_TAG_PAIRS` appears in no
   tracked source, test, or guide file.
3. **Positional law.** The positional scan in `tests/src/styles/index.test.ts` reddens when any of the three pairs is
   re-added (`r3-mutation-m18`, `-m19`, `-m20` logs), and its assertion distinguishes each re-added pair from the passing
   tree.
4. **Hooks.** The `kbd` and `pre` borders read `--bs-border-width`, so a scope retuning it moves each; each case reddens
   when its partial reads `--vn-border-width` (`m13`, `m14`), and the case's title states what it proves.
5. **Corner.** `samp` draws the code surface with the `samp` radius the `TEXT_SAMP_CASES` row pins, and the case reddens
   when `_samp.scss` restores its bare `background-color` line (`m15`).
6. **Records.** The guide's Excluded rows for `pre code`, `a > code`, and `kbd kbd` match `ca83afb` plus a reason that
   is true of the shipped cascade; the addition rows for those pairs are gone; the `samp { border-radius }` addition row
   matches the cascade; `npm run test:conformance` passed (`r3-gate-test-conformance.log.txt`).
7. **Specimens.** The `Linked code`, `Code block`, and `Key combination` Content specimens render each tag's own
   treatment, and `ContentSection.test.ts` asserts their presence by name.
8. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden
   helper; every added or retitled test is named for what it proves; no added prose states a count.
