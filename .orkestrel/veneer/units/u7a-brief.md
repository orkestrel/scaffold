# Unit U7a — Button's CSS

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`.

## Objective

Ship Button's cascade: a bare `<button>`'s Elements default in the `elements` layer, and the
`.btn` vocabulary in the `components` layer with every official `.btn` selector the ledger assigns
to Button present in the built cascade and every official `--bs-btn-*` custom property bound to a
`--vn-*` token or a `color-mix()` over one, the deferred selectors and properties listed with
their owners, the styles proofs green on managed Chromium and Edge, and the `selector` and
`variable` rows of § Compatibility flipped to `shipped` so the presence check U7d landed fires.

## Law

Read from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/styles.md`,
`tests.md`, `documentation.md`. The design that fixes this unit is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7-design-verdict.md` (question 5)
with the planner's report beside it (`units/u7-design-planner-report.md` § 5) and the analyst's
(`units/u7-design-analyst-report.md`, "The CSS"). The calibration is
`.orkestrel/veneer/research/calibration.md`; the measured hover, active, and ring strings per
role and theme are `units/u2-run-6-extract.md`. The user's rulings: no RTL work (the twin stays
as emitted; write logical properties and nothing direction-specific); rounds focus on
implementation.

## Context

**The tree.** `HEAD` is the U7d landing commit (named in the dispatch message); the working tree
is clean except `tmp/`. `dist/` may be absent at start (`npm.cmd run build:src:styles` builds the
cascade the presence check reads).

**Measured facts.**

- `src/styles/_tokens.scss` line 3 declares `@layer theme, reset, base, elements, components,
  utilities;` and the `--vn-*` registry (`$roles` includes `tertiary`); `_theme.scss` retunes
  under `[data-bs-theme='dark']` through the `$light` and `$dark` maps and `theme-tokens`;
  `_mixins.scss` is declaration-only (`transition` with its reduced-motion pair, `reduced-motion`,
  `forced-colors`, `palette-each`, `breakpoint-down`) loaded by partials with `@use '../mixins'
  as *`; `elements/_html.scss` and `elements/_body.scss` exist; `index.scss` loads the partials
  with `@use`. `src/core/constants.ts` declares `TOKEN_NAMES` (names only; a new `--vn-*` token
  is added there and proved by the parity case in `tests/src/styles/tokens.test.ts`, which
  asserts bidirectional equality between the `--vn-` partition of the built cascade and the
  registry).
- `tests/src/styles/index.test.ts` refuses an elements-layer rule joining two bare tags outside
  the HTML-mandated pairs and refuses a physical inline-axis property anywhere; the selector
  guard reads no `:is()` or `:where()` (write every selector flat; comma lists are read).
- Calibration (bare button): padding 6px block, 12px inline; border 0; radius 6px; text
  `oklch(0.208 0.042 265.755)` light / `oklch(0.929 0.013 255.508)` dark; hover fill the text
  colour at 12% alpha (`color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` light,
  `color(srgb 1 1 1 / 0.12)` dark); active at 22%; focus-visible a 3px `box-shadow` spread in the
  primary colour at 45% alpha with `outline` suppressed; transition `color, background-color,
  border-color, box-shadow, opacity` 0.15s ease; elevation `none`; small 4/8 radius 4px, large
  8/16 radius 8px, 1px border on the class-driven family. Filled primary family: text
  `rgb(255, 255, 255)`; fill and border `oklch(0.48 0.255 264)` light / `oklch(0.7 0.15 233)`
  dark; hover `color(srgb 0.0288046 0.226321 0.817248)` light, active `color(srgb 0.0263751
  0.203249 0.734892)` light; dark active `color(srgb 0.135692 0.746684 0.940932)`; the run-6
  extract carries the strings per role (`button-secondary`, `button-tertiary`, …) and theme.
  The dark-mode bare-button hover is pure white at 12% while the dark text token is not pure
  white, so decide the mixer's end from the strings before writing the partial: a second token
  (`--vn-state-mixer`, black end in light and white end in dark, per the design) reproduces the
  bare readings; where a filled-role string cannot be reproduced from a token and a percentage,
  record the departure in the guide rather than writing a literal colour.
- The official `btn` inventory (`tests/fixtures/oracle/inventory.json`, `components.btn`) carries
  103 selectors and 34 custom properties; the ledger assigns the `.btn-close` family and
  `--bs-btn-close-*`, `.btn-group*`, `.btn-toolbar`, `.dropdown-toggle-split`, the `.input-group*`
  rules, `.btn .badge`, `.placeholder.btn::before`, and the overlay-header `.btn-close` rules to
  later units (`research/ledger.md`); `.btn-group-lg > .btn` and `.btn-group-sm > .btn` ship as
  comma-mates of the size blocks. Every official selector that ships must appear literally in the
  built cascade, modulo the combinator spacing the normalizer collapses.
- U7d landed `readDeferrals` over `### Deferred selectors` (`Name | Owner | Reason`) under
  § Styles, the `selector` and `variable` rows of § Compatibility, and the row-keyed presence
  check; the ordinary `npm.cmd run test:conformance` run proves the shipped set.

**Host.** Windows. Your exec shell is PowerShell with script execution disabled: run scripts as
`npm.cmd run <name>`; a `.ps1` file is refused. Playwright Chromium launches inside this sandbox.
The `prove` tool is blocked. Write instruments under `tmp/u7a/`.

**Controls.** `PLANT-SELECTOR`: comment out one shipped official selector's rule;
`test:conformance` must red naming it; restore. `PLANT-PHYSICAL`: write one `margin-left`
declaration; `test:src:styles` must red on the physical-axis guard; restore. `PLANT-TOKEN`: add a
`--vn-*` declaration absent from `TOKEN_NAMES`; the parity case must red; restore. Name no test
for a control.

## Scope

**Owned.** `src/styles/elements/_button.scss` (new), `src/styles/components/_button.scss` (new),
`src/styles/index.scss`, `src/styles/_tokens.scss` and `src/styles/_theme.scss` (the state-mixer
and any new button-scale tokens alone), `src/styles/_mixins.scss` (the `focus-ring` mixin alone),
`src/core/constants.ts` and `src/core/types.ts` (the new token names alone),
`tests/src/styles/elements/button.test.ts` (new), `tests/src/styles/components/button.test.ts`
(new), `tests/src/styles/mixins.test.ts` (the `focus-ring` case), `tests/src/core/index.test.ts`
(the registry cases if the names' shape changes), `guides/veneer.md` (§ Compatibility: the
`selector` and `variable` rows to `shipped`; § Styles: the `### Deferred selectors` rows and the
button partials in `### Files`; § Tokens: the `--bs-btn-*` binding rows, the mixer tokens, the
retained Bootstrap values; § Departures from Bootstrap: the tertiary role and any string a token
cannot reproduce), the report. **Off-limits.** Everything else: `src/browser/**`, `app/**`,
`tests/setup*.ts`, `tests/conformance.test.ts`, `tests/setupConformance*.ts`, the oracle
fixtures, `package.json`, every content-owned and vendored path.

## Execution

Perform the assignment directly and spawn nothing. Tokens first (the registry and the theme
closure), then the mixin, then the partials, then the proofs, then the guide; run
`npm.cmd run test:src:styles` after each item.

1. **The tokens.** Add to the registry and the theme closure: `--vn-state-mixer` (the mix end:
   the black end in light and the white end in dark), `--vn-state-hover` and `--vn-state-active`
   (the percentages the run-6 strings reproduce), and the button scale the bindings need that
   the registry lacks (read `_tokens.scss` before adding: `--vn-focus-width`, `--vn-focus-color`,
   the space and radius steps the bindings name may already exist). Every new name lands in
   `TOKEN_NAMES` and the parity case stays green.
2. **The `focus-ring` mixin.** Declaration-only in `_mixins.scss`: the 3px spread `box-shadow` in
   the primary colour at 45% alpha with `outline` suppressed, parameterized on the colour and
   width tokens; cased in `tests/src/styles/mixins.test.ts` through a mounted specimen. Two
   callers (the elements partial and the components partial).
3. **`elements/_button.scss`.** `@layer elements`; single-tag selectors only (`button`,
   `button:hover`, `button:active`, `button:focus-visible`, `button:disabled`); the bare-button
   calibration row (padding, no border, radius, body text, transparent fill, the 12% and 22%
   tints through the mixer, the ring, the feedback transition with its reduced-motion pair);
   logical properties only. Load it from `index.scss` beside the other element partials.
4. **`components/_button.scss`.** `@layer components`; `.btn` declares every official
   `--bs-btn-*` property less the deferred close family, bound as the design's table states; the
   variant loop `@each $role in tokens.$roles` writes `.btn-#{$role}` and `.btn-outline-#{$role}`
   with the role tokens (filled: role fill and border, white text; outline: role text and border
   over transparent, filled on hover); `.btn-link`; `.btn-sm` and `.btn-lg` with their
   `.btn-group-*` comma-mates; `.btn-check` with its label rules; `.active`, `.show`, `.disabled`,
   `:disabled`, `fieldset:disabled .btn`, the anchor `aria-disabled` host; the focus ring through
   the mixin; hover and active tints through the mixer; forced-colors fallbacks through the
   `forced-colors` mixin with system colours held as tokens; the transition. Every shipped
   official selector literal; nothing direction-specific.
5. **The deferral table and the rows.** (At the baseline the live presence assertion in
   `tests/conformance.test.ts` cannot fail: both Button CSS rows are `accepted` and the deferral
   table is empty, so every loop in `scanCompatibilityPresence` is skipped. Flipping the rows to
   `shipped` is what arms that gate; run `test:conformance` red on the flip before the partials
   carry every selector, and record the red.) Fill `### Deferred selectors` under § Styles with every
   official `btn` selector and property not shipped, its owner, and the reason, so the deferral
   set plus the shipped set equals the official set; flip the `selector` and `variable` rows to
   `shipped`; `npm.cmd run build:src:styles` then `npm.cmd run test:conformance` green.
6. **The proofs.** `tests/src/styles/elements/button.test.ts`: the bare button's resolved
   padding, border, radius, colour, and hover, active, and focus-visible readings against the
   calibration on the mounted specimen; `tests/src/styles/components/button.test.ts`: per role
   and theme the rest, hover, active, focus-visible, and disabled readings against the run-6
   strings (or the recorded departure), the size variants, the outline family, `.btn-link`, the
   `.btn-check` label, the disabled forms, the forced-colors fallback through `stageMedia` if
   the installed Test helper stages `forced-colors` (read its declaration; if it does not, record
   the reading as an observation naming the helper), the reduced-motion transition; every
   reading on managed Chromium, then repeated with `PLAYWRIGHT_CHANNEL=msedge`.
7. **Controls.** Run the three controls red and restore each with a byte comparison.
8. **The guide.** § Files gains the two partials; § Tokens gains the binding rows and the mixer
   tokens' rows; § Departures from Bootstrap gains the tertiary role and any string a token
   cannot reproduce; `npm.cmd run test:guides` green.
9. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:src:styles`, `npm.cmd run test:src:core`, `npm.cmd run test:conformance`,
   `npm.cmd run test:guides`, `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`; record each
   command's final lines and the cascade's SHA-256 after the build.

## Output

Write `u7a-report.md` and return its content: the diff per file; the binding table as
landed; the deferral table; the mixer decision with the strings that fixed it; each control's red
reading and restore proof; each gate's final lines on both engines; the digest; deviations in
the usual shape.

## Deviation contract

Stop and report on: a run-6 string no token and percentage reproduces on both engines (record
the departure and carry on only if the guide's departures section is in your scope, which it
is); a gate red after your own fix inside owned files; a need to edit an off-limits file; the
presence check refusing a shipped selector you believe present (report the normalized forms).
Decide, record, and carry on from: token names within the registry's grammar, mixin parameter
names, case order, wording.

## Acceptance criteria

1. Every shipped official `btn` selector and property present in the built cascade with the
   deferral set absent; the two rows `shipped`; `test:conformance` green.
2. The tag-pair and physical-axis guards green; the token parity case green with the new names.
3. Every calibrated reading green on managed Chromium and Edge, or its departure recorded.
4. The three controls reddened and are removed.
5. Every gate in item 9 exits 0.
6. `git status --porcelain` shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built cascade's
digest.
