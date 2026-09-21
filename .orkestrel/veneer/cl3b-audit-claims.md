# CL3b audit — claims (round 1)

Subject: unit CL3b (the muted text and raised surface tokens), written by `opus` on native Opus 5
in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base `9bb306e` (the
CL3 landing), under the effective brief
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-brief-2.md` over
`units/cl3b-brief.md` beneath it; the scope read that corrected brief 1 is
`units/cl3b-scope-read-report.md`. Report: `units/cl3b-report.md`. Evidence: the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-diff.patch.txt` and status
`tmp/audit/cl3b-status.txt`, the live tree, the built `dist/src/styles/index.css`, and the
calibration record `.orkestrel/veneer/research/calibration-content.md`. Audits cover
implementation only: correctness, rule compliance, test sufficiency, scope honesty. Rule on every
claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence; a report-only claim (a
red-then-green run, a measurement the unit took) is recorded as report-only; add an
implementation-defect finding only after the last claim, with a site and a one-line failure
scenario, saying whether it forces another round.

1. The anchor hazard was measured and the pin holds. `src/styles/_tokens.scss`'s `$dark` map
   declares `'anchor': 'oklch(0.235 0.013 256)'` — the literal the raised key held at `9bb306e` —
   with the reason recorded beside it, while `'raised'` now carries the record's
   `oklch(0.265 0.014 256)`; `$light`'s anchor still reads the body surface. Every dark role
   border tier resolves to the value it had at `9bb306e` (the report tabulates all nine before,
   unpinned, and pinned; the unpinned column differs and the pinned column is identical:
   report-only), and `tests/src/styles/integration.test.ts` is unedited and absent from the diff,
   its dark border reading unchanged. A proof in `tests/src/styles/tokens.test.ts` asserts the
   dark role border tiers stay on the anchor, red when the anchor is set back to the token
   (report-only).

2. `--vn-text-muted` lands whole. A `muted` key carries `oklch(0.446 0.043 257.281)` in `$light`
   and `oklch(0.704 0.04 256.788)` in `$dark` — the record's `address` and `dd` colour rows — the
   theme closure in `src/styles/_mixins.scss` emits it beside `--vn-text-tertiary`,
   `src/core/constants.ts` carries the leaf `text.muted`, `tests/src/styles/tokens.test.ts`
   resolves it in both modes on both receipts, and `guides/veneer.md` § Tokens carries its row
   with the source `elements`. It is distinct from `--vn-text-secondary`, which remains the
   75 % mix answering `--bs-secondary-color`.

3. `--vn-surface-raised` and `--vn-surface-code`. The `raised` key carries the record's
   `oklch(0.968 0.007 247.896)` light and `oklch(0.265 0.014 256)` dark; `--vn-surface-code` moved
   from a literal in the emitter into a `surface-code` key in both maps with the emitter reading
   `map.get($values, 'surface-code')`, its expression and therefore its resolved readings
   unchanged (the code and keyboard surfaces still read
   `oklab(0.208 -0.00310889 -0.0418848 / 0.12)` light and
   `oklab(0.929 -0.00325318 -0.0125864 / 0.12)` dark). The registry's `surface.raised` and
   `surface.code` leaves are unchanged, and the registry still agrees bidirectionally with the
   cascade.

4. The `font.mono` group and the rename. `--vn-font-mono` became `--vn-font-mono-base` and a
   sibling `--vn-font-mono-short` (`SFMono-Regular, Menlo, monospace`) joined it, because
   `tests/src/core/index.test.ts` requires a leaf's value to equal `--vn-` plus its registry path
   joined with `-`, so a second monospace name forces `font.mono` to become a group whose own
   value takes the `base` member; `guides/veneer.md` § Tokens states that law and its `-base`
   consequence, and `.claude/rules/names.md` prescribes grouping when one word is insufficient.
   The rename is complete: no `--vn-font-mono` that is not `-base` or `-short` remains anywhere
   under `src/`, `tests/`, `app/`, or `guides/`; every consumer moved in the same change (the
   `code-text` mixin, the `--bs-font-monospace` alias whose value is unchanged, the registry, the
   guide row, one TSDoc sentence in `tests/setupStyles.ts`); no test asserts the old name as a
   string; and the rendered stacks are unchanged (`ui-monospace` plus the retained families for
   the code family, and the record's shorter stack for `var`).

5. `--vn-line-code` lands as `1.6` beside `--vn-line-body` and `--vn-line-heading`, with the leaf
   `line.code`, a proof reading it, and a guide row; `_pre.scss` reads it instead of the literal,
   and the resolved line height is unchanged at `19.6px`.

6. The members are rebound to the tokens at the record's readings. `_address.scss` and
   `_dl.scss`'s `dd` read `--vn-text-muted`; `_pre.scss`, `_samp.scss`, and `_var.scss` read
   `--vn-surface-raised` for their background (each was transparent before); `_var.scss` reads
   `ui-monospace, var(--vn-font-mono-short)`; `_pre.scss` reads `var(--vn-line-code)`. Each
   member's case table in `tests/setupStyles.ts` pins the new reading, and each proof reddened on
   a planted wrong binding and restored (report-only). No export was added to or removed from
   `tests/setupStyles.ts`, so `tests/setupStyles.test.ts` is unedited and absent from the diff.

7. The untested radii are closed (CL3 round 3, reviewer 6). `TEXT_CODE_CASES`, `TEXT_KBD_CASES`,
   and `TEXT_PRE_CASES` carry a radius field their proofs read with `readPixels` on
   `border-start-start-radius`, pinning `4px` for the code and keyboard surfaces and `6px` for the
   preformatted block; deleting the declaration from the `code-surface` mixin and from
   `_pre.scss` reddens those three proofs (report-only). The record carries no radius row, so
   these pin Veneer's own `--vn-radius-small` and `--vn-radius-base`, recorded as such.

8. The guide states what the code does. § Tokens' role-tier table gives the dark border expression
   as a mix against the literal rather than against `--vn-surface-raised`, with a sentence naming
   why and where the literal lives; the text and surface table carries the `--vn-text-muted` row
   and the raised row's new values and source; the type table carries the renamed
   `--vn-font-mono-base`, the new `--vn-font-mono-short`, and `--vn-line-code`; § Departures names
   `--vn-font-mono-base` in its agreement sentence; § Compatibility is untouched. Each row is
   judged on its facts alone. `test:guides` exits 0 (verifier).

9. `[mechanical]` Scope, law, and gates. `tmp/audit/cl3b-status.txt` lists exactly the eighteen
   modified paths the brief owns (`guides/veneer.md`, `src/core/constants.ts`,
   `src/styles/_mixins.scss`, `_tokens.scss`, the five rebound partials, `tests/setupStyles.ts`,
   the seven rebound proofs under `tests/src/styles/elements/`, and
   `tests/src/styles/tokens.test.ts`) and nothing untracked outside the ignored `tmp/`;
   `tests/setupStyles.test.ts`, `tests/src/styles/integration.test.ts`, `tests/conformance.test.ts`,
   `src/styles/_theme.scss`, `src/styles/components/**`, `src/browser/**`, `app/**`,
   `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from the
   diff. The added lines carry no `any`, no type assertion outside `as const`, no non-null
   assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no
   default export, no skipped case, and no case named for a control; no measurement plant or
   `console` call remains (the unit's own sweep names only the pre-existing TSDoc example in
   `src/browser/helpers.ts`); `_mixins.scss` still emits no top-level CSS; the layer order is
   unchanged. Every gate in the brief's item 8 exits 0 on managed Chromium and Edge, and the
   independent verifier's chain (including `npm test`, the journeys, and `scaffold audit`) is
   green with the status identical before and after.
