# Unit CL3 — the reset partial and the text Reboot tags (brief 3)

Succeeds `cl3-brief-2.md`, which stays in force for everything this brief does not
name and is left unedited. What changed and why: the unit stopped under brief 2
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-report.md`) on a
conflict it could not settle inside its owned files: brief 2 bound the code family's paint to
`--vn-text-code`, whose value is Bootstrap's pink, while the calibration record reads Elements'
inline code text as `oklch(0.208 0.042 265.755)` light and `oklch(0.929 0.013 255.508)` dark on a
12 % tint of that colour. This brief rules the conflict and grants the files the ruling needs.
The scroll-behaviour probe is done: it passed the journey suite on managed Chromium and Edge with
the rule planted (`units/cl3-report.md`, the probe table), so item 1's probe is not repeated; the
journey gate still runs after the implementation lands.

## Ruling

Elements' code text colour equals Veneer's body text: `src/styles/_tokens.scss` carries
`'text': 'oklch(0.208 0.042 265.755)'` in `$light` (line 29) and `'text': 'oklch(0.929 0.013 255.508)'`
in `$dark` (line 71), the values the record's `code-inline` colour rows read on both browsers.
Elements' code surface is that text colour at 12 % alpha (the record's `background-color` rows,
`oklab(0.208 -0.0031 -0.0419 / 0.12)` light and `oklab(0.929 -0.0033 -0.0126 / 0.12)` dark). The
design's rule (adapt values, never selectors; Elements' values are adopted where a rendered
reading supports them, and CL0 recorded this one) therefore fixes:

- `--vn-text-code` resolves to the body text in both modes. `_mixins.scss:152` already writes
  `--vn-text-highlight: var(--vn-text-body-base)`; give `--vn-text-code` the same shape (settle
  whether the `'code'` map key becomes `var(--vn-text-body-base)` in both maps or the closure
  line reads it directly, and record the choice). `--bs-code-color` keeps aliasing
  `--vn-text-code` (`_mixins.scss:199`); its value now departs from Bootstrap's `$code-color`,
  which is one `### Departures from Bootstrap` row.
- A new token `--vn-surface-code` lands in the theme closure beside `--vn-surface-highlight`
  (`_mixins.scss:160`), valued as the text colour at 12 % alpha
  (`color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)` or the equivalent you prove
  resolves to the record's reading), with the registry leaf `surface.code` beside
  `surface.highlight` (`src/core/constants.ts:148`) and one guide row (value and source
  `elements`). The code family (`code`, `kbd`, `samp`, `var`, `pre`) paints on that surface where
  the record reads a surface and reads its text through `--vn-text-code`; where the record reads
  a member differently (a `kbd` inversion, a `pre` block), bind the record's value or record
  the member as retained, as brief 2's item 2 already states.
- `RETAINED_COLOR_ALIASES` in `tests/setupStyles.ts` does not pin `--bs-code-color` (verified:
  no `code` row in that table); `--bs-code-color` appears only in the presence name lists
  (`tests/setupStyles.ts:827`, `:922`), which the alias still satisfies.

## Scope

Brief 2's owned set, plus: `src/styles/_tokens.scss` (only the `'code'` values in `$light` and
`$dark`, and a surface entry if you route the new token through the maps), `src/styles/_mixins.scss`
(only the `--vn-text-code` line and the new `--vn-surface-code` line inside `theme-tokens`),
`src/core/constants.ts` (only the `surface.code` leaf), `tests/src/styles/tokens.test.ts` (the
value proofs for the two tokens in both modes on both receipts; the registry equality proof
covers the leaf without an edit), `guides/veneer.md` § Tokens (the `--vn-text-code` value cell
and one `--vn-surface-code` row). Everything else brief 2 lists as off-limits stays off-limits,
`tests/setup*.ts` and their proofs included: the styles setup's export inventory is unchanged
because no setup export is added.

## Execution

Brief 2's items 2 to 6, with these amendments:

- Item 2, the code family: text through `--vn-text-code` (now the body text), surface through
  `--vn-surface-code`, the font family, size, and padding from the record's `code-inline` rows
  through the tokens the ramps carry (`--vn-size-*`, `--vn-space-*`) where a ramp step matches
  the reading, otherwise the record's value with the step named as absent in the report.
- Item 3, the token proofs: `tokens.test.ts` reads `--vn-text-code` equal to
  `--vn-text-body-base` and `--vn-surface-code` equal to the record's surface reading in each
  mode on both receipts, red on a planted wrong value and restored.
- Item 5, the guide: the `--vn-text-code` value cell, the `--vn-surface-code` row, and one more
  departure row (the code colour departs from Bootstrap's `$code-color`).

## Output

Write `cl3-report-2.md` in the Veneer checkout and return it, in brief 2's Output
shape, plus the token choices under the ruling and the resolved readings of both tokens in
both modes on both receipts.

## Deviation contract

Brief 2's, with the stop "a token the calibration needs that CL2 did not land" narrowed to "a
token the calibration needs that neither CL2 nor this brief grants": report the token, the
record row, and the member that needs it, and continue with every other member.

## Acceptance criteria

Brief 2's, plus: `--vn-text-code` resolves to the body text and `--vn-surface-code` to the
record's surface in both modes on both receipts, proven red then green; the registry and the
cascade still agree on every name; the guide rows carry the values.
