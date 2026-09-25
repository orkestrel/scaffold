# E-ID-LAYOUT round 3 audit — claims

Subject: E-ID-LAYOUT round 3 in `/home/user/veneer-eil` (branch `unit/eil`, uncommitted over Veneer `ca83afb`),
briefed by `e-id-layout-brief-3.md` under `e-id-common.md` and `../e-identity-design-verdict.md` § Addendum 2, written by
`opus` on Opus 5.5, and reported in `e-id-layout-report-3.md`. The diff is `eil-3.diff`, the status `eil-3-status.txt`,
and the instruments and logs `eil-instruments/r3/` (earlier rounds' under `eil-instruments/`). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. The unit's compiled cascade is
`/home/user/veneer-eil/dist/src/styles/index.css`; Bootstrap 5.3.8 is
`/home/user/veneer-eil/node_modules/bootstrap/dist/css/bootstrap.css` and its sources
`/home/user/veneer-eil/node_modules/bootstrap/scss/`. The tenets are Veneer `ROADMAP.md` § Tenets in the worktree. A
unit report's prose is not a claim subject. Each claim is falsifiable; rule every one.

1. **Scope.** The status lists only files the round-1 to round-3 briefs grant (round 3 adds `_quote.scss`, the `.figure`
   component partial `_image.scss`, and their tests), and `_blockquote.scss` is byte-identical to `ca83afb`.
2. **Tag-only.** No selector in `_dl.scss`, `_blockquote.scss`, `_figure.scss`, `_quote.scss`, or `_image.scss` reads a
   tag's context, a sibling, or the presence of a class (no `:not(`, `:has(`, and no combinator between tags); a `dl`,
   `blockquote`, or `figure` carrying any utility class keeps the tag's default.
3. **Bootstrap's patterns.** Under Bootstrap's own markup, `dl.row` with `dt.col-sm-3` and `dd.col-sm-9`, the
   `.blockquote` quotation, the attributed quotation (`figure` > `blockquote.blockquote` + `figcaption.blockquote-footer`,
   bare, `.text-center`, `.text-end`), and the `.figure` pattern (`img.figure-img` + `figcaption.figure-caption`) place
   their boxes where Bootstrap's cascade places them at 390 and 1280 pixels, except where the report names a
   line-height difference (`eil-3-probe.log.txt`).
4. **Proofs.** Each added or kept proof reddens under the mutation the report names for it (`eil-3-mutation-*.log.txt`),
   and each assertion distinguishes that mutation from the passing tree: `classless-grid`, `restored-gap`,
   `no-term-padding`, `classless-blockquote`, `no-quote-resets`, `restored-figure-gap`, `no-caption-margin`,
   `no-figure-display`, `no-caption-reset`.
5. **The caption reset.** `.figure-caption { margin-top: 0 }` is needed: without it a `.figure` holding a box without the
   image class puts its caption 8px lower than Bootstrap does, and with it the caption sits where Bootstrap's does.
6. **Records.** The guide's `reboot` departure and addition rows and the `.blockquote` and `.figure-caption` addition
   rows match the shipped cascade, and `npm run test:conformance` passed (`eil-3-test-conformance.log.txt`).
7. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden
   helper; each added or retitled test is named for what it proves; no added prose states a count.
