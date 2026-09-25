# E-ID-FLOW audit — claims

Subject: E-ID-FLOW in `/home/user/veneer-flow` (branch `unit/flow`, uncommitted over Veneer `6882751`), briefed by
`e-id-flow-brief.md` under `e-id-common.md` and `../e-identity-design-verdict.md` § Addendum 2, written by `opus` on
Opus 5.5, and reported in `e-id-flow-report.md`. The diff is `flow.diff`, the status `flow-status.txt`, and the
instruments and logs `flow-instruments/` (the unit's under `flow-instruments/logs/`; the Orchestrator's component probe
and its log are `flow-instruments/orchestrator-components-probe.{mjs,log.txt}`). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. The unit's compiled cascade is
`/home/user/veneer-flow/dist/src/styles/index.css`; Bootstrap 5.3.8 is
`/home/user/veneer-flow/node_modules/bootstrap/dist/css/bootstrap.css` and its sources
`/home/user/veneer-flow/node_modules/bootstrap/scss/`. A unit report's prose is not a claim subject. Each claim is
falsifiable; rule every one.

1. **Scope.** The status lists only the brief's owned and shared files, and the diff touches no `_dl.scss`,
   `_pre.scss`, `_hr.scss`, `_figure.scss`, `_blockquote.scss`, `src/browser/**`, or vendored file.
2. **Values.** In the compiled cascade, `h1` to `h6` and `.h1` to `.h6` write `margin-top: 0` and
   `margin-bottom: var(--vn-space-4)`; `p`, `ol`, and `ul` write `margin-top: 0` and `margin-bottom: var(--vn-space-8)`;
   `address` writes `margin-bottom: var(--vn-space-8)`; at the default density these resolve to Bootstrap's `0.5rem` and
   `1rem`; the `heading-text` and `list-space` mixins have no caller outside those tags and classes.
3. **Proofs.** Each added proof reddened on the base (`owned-red.log.txt`); each density case distinguishes a literal
   `rem` from the token (`mutation-*-literal` logs), the heading case distinguishes the `--vn-space-8` step, the address
   case the old `--vn-space-7`, and the list case a non-zero top margin; each title states what the case proves.
4. **Made false.** Every calibration expectation the diff changes was made false by the margin change and now states the
   value Bootstrap renders for the same markup; the `card.test.ts` pills change keeps the assertion separating the pills
   from the tabs.
5. **Components.** Under Bootstrap's documented markup for nav, navbar, list group, breadcrumb, pagination, dropdown,
   card, modal, offcanvas, popover, accordion, alert, blockquote, carousel, toast, and the type classes, every marked
   element's margins in the unit's cascade equal Bootstrap's, except an inner list inside a list, which keeps its
   `1rem` because the release's `ol ol, ul ul, ol ul, ul ol` rule stays Excluded
   (`orchestrator-components-probe.log.txt`).
6. **Records.** The guide's `reboot` and per-class ledger rows for those margins read `tokenized`, the matching
   `margin-top` and `{ margin }` addition rows are gone, the nested-list Excluded rows stay, and
   `npm run test:conformance` passed (`conformance-2.log.txt`).
7. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden
   helper; `HEADING_MARGIN` and `FLOW_MARGIN` sit in `tests/setupStyles.ts` with TSDoc and in its export inventory; no
   added prose states a count.
