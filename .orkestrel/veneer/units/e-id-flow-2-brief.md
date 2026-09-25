# Unit E-ID-FLOW-2 — restore Bootstrap's reboot margins on `dl`, `pre`, `hr`, and `figure`

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-flow2` (branch `unit/flow2`, cut from the session
branch at the E-ID landing, `LANDING_HEAD`). Read `/home/user/scaffold/.orkestrel/veneer/units/e-id-common.md` first;
it binds, with the styles project at `configs/src/vite.styles.config.ts` and the base `LANDING_HEAD` wherever it says
`ca83afb`. Read Veneer `ROADMAP.md` § Tenets in the worktree.

## Objective

The user's ruling of 2026-09-24 (`/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum 2),
second half: `dl`, `pre`, `hr`, and `figure` take Bootstrap 5.3.8's reboot margins, so content Bootstrap documents
spaces as Bootstrap spaces it. E-ID-FLOW restored the headings, `p`, `address`, `ol`, and `ul`
(`/home/user/scaffold/.orkestrel/veneer/units/e-id-flow-report.md`); follow its form.

## Context

- **The rows.** `guides/veneer.md`'s `reboot` ledger: `dl` `margin-top` and `margin-bottom` read `dropped`; `pre`
  `margin-top` and `margin-bottom` read `dropped`; `hr` `margin` reads `1rem 0` against `0`, `declared`; `figure`
  `margin` reads `0 0 1rem` against `0`, `declared`. Read `node_modules/bootstrap/scss/_reboot.scss` for the exact
  declarations.
- **The partials.** `src/styles/elements/_dl.scss` (`margin: 0` on a grid `dl`), `_pre.scss` (`margin: 0`),
  `_hr.scss` (the `box-reset` mixin in `src/styles/_mixins.scss`), `_figure.scss` (`display: flex`,
  `flex-direction: column`, `margin: 0`). Find every caller of a mixin before changing it.
- **Form.** E-ID-FLOW wrote longhands through the space scale (`margin-top: 0; margin-bottom: var(--vn-space-8)`), so
  each ledger row reads `tokenized`; `--vn-space-8` is 1rem at the default density. Match the release's form for each
  tag: `hr` writes `margin: 1rem 0` in the release.
- **Tenets.** Semantic defaults sit on individual tags; classes keep control; no contextual tag pairs, no
  `:not([class])`, no `:has()`.
- **Observation from E-ID-LAYOUT round 3** (`/home/user/scaffold/.orkestrel/veneer/units/e-id-layout-report-3.md`
  § Observations): a flex `figure` keeps its children's margins inside it. In the attributed quotation
  (`figure > blockquote.blockquote + figcaption.blockquote-footer`), the footer's 1rem end margin sits inside the
  figure, so once `figure` writes a 1rem bottom margin the next content lands 32px below the footer where Bootstrap's
  block figure collapses the two to 16px.
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH` and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; launch Chromium in a probe with
  `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`; format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Rebuild the styles with `npm run build:src:styles` before a
  styles run. Other worktrees run suites at the same time; a timing failure under load is an observation with its
  reading.

## Unknowns

- Whether `figure` stays a flex column. Settle it by reading, in both cascades at 390 and 1280 pixels, a bare captioned
  image, the attributed quotation followed by a `p`, and Bootstrap's `.figure` pattern followed by a `p`. Report the
  readings and the choice. The attributed quotation and the `.figure` pattern must place the following `p` where
  Bootstrap's cascade places it; the bare captioned image keeps Veneer's 8px caption space.
- Which proofs, fixtures, specimens, and app layouts assume a zero margin. Derive the set by running the suites after
  the change, not by reasoning, and report each red with its fix.

## Scope

**Owned.** `src/styles/elements/_dl.scss`, `_pre.scss`, `_hr.scss`, `_figure.scss`, and their element tests; every test
the change makes false under `tests/src/styles/**` and `tests/app/**`, each change stated in the report. **Shared**:
`src/styles/_mixins.scss`, `guides/veneer.md`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `app/browser/**`.
Off-limits: `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), and every partial outside the owned set. No
git command that writes, no install, no `npm run format`; `npm run build:src:styles` and `npm run build:src` are
allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Write each margin through the space scale; each ledger row moves to `tokenized`, or is struck where both sides write
   the same value.
2. Proofs: each tag's margins match Bootstrap's resolved values at the default density and scale with the density
   factor; each red before the change. A proof that the attributed quotation and the `.figure` pattern place the
   following content where Bootstrap does, red before the change if the figure question needs one.
3. Run the owned files, then `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`,
   `npm run test:guides`, and `npx vitest run --config vite.config.ts --no-cache --project app:browser`; fix every red
   the change causes within scope, and report any red outside it.

## Output

Write `tmp/units/flow2-report.md` and return the same text: the changes; the figure reading and choice; the
failing-first table; the mutation table (a literal `rem` for the token, the old zero margin, and any figure mutation);
the list of tests the change made false and each fix; the gate table with log paths; the shared-file hunks;
`tmp/units/flow2.diff` (`git diff LANDING_HEAD`) and `tmp/units/flow2-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the figure choice, the proof
fixtures, and the guide wording itself. Stop and report if the figure question needs a selector the tenets forbid.

## Acceptance criteria

The common criteria; the ledger's `dl`, `pre`, `hr`, and `figure` margin rows read `tokenized` or are struck; the
attributed quotation and the `.figure` pattern place the following content where Bootstrap does at 390 and 1280
pixels; `app:browser` exits 0.
