# Unit E-ID-FLOW — restore Bootstrap's reboot flow margins

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-flow` (branch `unit/flow`, cut from Veneer `main`
`6882751`). Read `/home/user/scaffold/.orkestrel/veneer/units/e-id-common.md` first; it binds, with the styles project
at `configs/src/vite.styles.config.ts` and the base `6882751` wherever it says `ca83afb`.

## Objective

The user's ruling of 2026-09-24 (`/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum 2):
the headings, `.h1` to `.h6`, `p`, `address`, `ol`, and `ul` take Bootstrap 5.3.8's reboot margins, so content Bootstrap
documents spaces as Bootstrap spaces it. `dl`, `pre`, `hr`, and `figure` follow in a later unit, because the E-ID units
in flight own those partials.

## Context

- **The rows.** `guides/veneer.md`'s `reboot` ledger records each dropped margin: `h1` to `h6` (`margin-top: 0`,
  `margin-bottom: 0.5rem`), `p` (`0`, `1rem`), `address` (`margin-bottom: 1rem`, shipped today as
  `var(--vn-space-7)`), `ol` and `ul` (`0`, `1rem`). Bootstrap writes `.h1` to `.h6` with the headings. Read
  `node_modules/bootstrap/scss/_reboot.scss` and `_type.scss` for the exact selectors.
- **The mixins.** `src/styles/_mixins.scss` writes `margin: 0` in `heading-text` and `list-space`; find every caller
  before changing a mixin, because a component can include one.
- **Tokens.** The space scale carries these values (`--vn-space-4` is 0.5rem and `--vn-space-8` is 1rem at the default
  density); the blockquote row already ships `0 0 var(--vn-space-8)` as `tokenized`. Use the same form.
- **Tenets** (Veneer `ROADMAP.md` § Tenets): semantic defaults sit on individual tags, and classes keep control. The
  release's contextual list rule (`ol ol, ul ul, ol ul, ul ol { margin-bottom: 0 }`) stays Excluded.

## Unknowns

Which proofs, fixtures, specimens, and app layouts assume a zero margin. Derive the set by running the suites after the
change, not by reasoning, and report each red with its fix.

## Scope

**Owned.** `src/styles/elements/_heading.scss`, `_p.scss`, `_address.scss`, `_ol.scss`, `_ul.scss`, the `.h1`–`.h6`
partial if the classes live apart from the headings, and the element tests for them; every test the change makes false
under `tests/src/styles/**` and `tests/app/**`, each change stated in the report. **Shared**: `src/styles/_mixins.scss`,
`guides/veneer.md`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `app/browser/**`. Off-limits: `src/browser/**`,
`src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, the vendored files, and `_dl.scss`, `_pre.scss`, `_hr.scss`,
`_figure.scss`, `_blockquote.scss`.

## Execution

Perform the assignment directly and spawn nothing.

1. Write each margin through the space scale; the ledger rows move from `dropped` to `tokenized`.
2. Proofs: each tag's margins match Bootstrap's resolved values at the default density, and scale with the density
   factor; red before the change.
3. Run the owned files, then `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`,
   `npm run test:guides`, and `npx vitest run --config vite.config.ts --no-cache --project app:browser`; fix every red
   the change causes within scope, and report any red outside it.

## Output

Write `tmp/units/flow-report.md` and return the same text: the changes; the failing-first table; the list of tests the
change made false and each fix; the gate table with log paths; the shared-file hunks; `tmp/units/flow.diff`
(`git diff 6882751`) and `tmp/units/flow-status.txt`. State no count.

## Acceptance criteria

The common criteria; the ledger's heading, paragraph, address, and list margin rows read `tokenized`; `app:browser`
exits 0.
