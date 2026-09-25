# LEDGER-RETUNE round 2 report: stopped on a deviation

**State: stopped.** The deviation contract's stop condition "a `bootstrap` token has no witness"
fired. `--vn-shadow-inset` loses its only witness because the resolver now varies the root font
size, which a `rem` length reads. Items 1 to 5 are implemented and the setup suite is green. The
conformance gate is red on this finding and on member drift I have not applied to the guide.
Items 6 and 7, the timing reading, and the acceptance gates are not done. Item 8 is done in the test
file.

## The deviation

- **Expected.** Every `bootstrap` token keeps a witness after Item 1's context rule and Item 2's
  token-alone rule.
- **Found.** The witness scan names `--vn-shadow-inset`
  (`tmp/units/r2/lret-conformance-drift1.log.txt`, `AssertionError: expected [ '--vn-shadow-inset' ]
  to deeply equal []`). The only row that reads the token is `theme | :root | --bs-box-shadow-inset`,
  release `inset 0 1px 2px rgba(0, 0, 0, 0.075)`, Veneer `var(--vn-shadow-inset)`. The token is
  `inset 0 calc(0.0625rem * var(--vn-factor-elevation)) calc(0.125rem * var(--vn-factor-elevation))
  …`. At a 20px root font size the two sides compute `1.25px 2.5px` and `1px 2px`, so the row reads
  `retuned` and the token alone resolves apart from the release value.
- **Cause, isolated by a run.** Item 1 lists the contexts to vary: font size, containing block,
  parent value, `currentColor`, and direction. It does not list the root font size (`rem`) or the
  viewport (`vw`). Its closing rule says a pair is undecided wherever the resolver cannot vary a
  context a term reads. The resolver can vary both, so I added a `root` setting (20px) and a
  `viewport` setting (800×600). `tmp/units/r2/lret-experiment-noroot.log.txt` reruns conformance
  with the `root` setting removed and `tests/setupServer.ts` restored byte-identically afterwards:
  the witness case passes, and the only member drift left is `.col-form-label`. The `viewport`
  setting changes no row.
- **The fork, for the Orchestrator.**
  - Keep the `root` setting. Cost: `--vn-shadow-inset` needs an unowned change. Either
    `src/styles/_tokens.scss` writes the shadow in px, or the § Reference map row stops sourcing it
    from `bootstrap`. The display and legend rows also change to `retuned`.
  - Drop the `root` setting. Cost: the rule "undecided wherever the resolver cannot vary a context
    a term reads" no longer holds for `rem`. The brief must then say that the root font size stays
    at the user agent's default, like the factors.
  - Hypothesis: the second option is what the brief intended, because its context list omits
    `rem`. Veneer writes rem where the release writes px or fluid rem-plus-vw, and every one of
    those rows would otherwise change member.

## Rows whose member changes, as the gate printed them

These come from `tmp/units/r2/lret-conformance-drift1.log.txt`, with the `root` setting in place.
They are not applied to the guide:

- `col | .col-form-label | font-size | — | inherit | var(--vn-size-3) | retuned` (was `tokenized`;
  the parent-value reading. This row changes under either option.)
- `display | .display-1` to `.display-6` `| font-size | — | calc(… + …vw) | calc(var(--vn-display-N) - max(…) * (1 - 100vw / 1200px)) | retuned`
  (was `tokenized`; the `root` setting only)
- `reboot | legend | font-size | — | calc(1.275rem + 0.3vw) | calc(var(--vn-size-6) - …) | retuned`
  (was `tokenized`; the `root` setting only)
- `theme | :root | --bs-box-shadow-inset | — | inset 0 1px 2px rgba(0, 0, 0, 0.075) | var(--vn-shadow-inset) | retuned`
  (was `tokenized`; the `root` setting only)

No real pair is undecided: the undecided case and the repaint case both pass on the real tree.
The canonical scan names nothing with Item 2's changes in place.

## Evidence re-readings

`tmp/units/r2/lret-evidence.txt`, taken at `7952712` on a clean tree. Every reading matches the
brief, with these differences:

- `normalizeDeclaration` has a second pair of cases around line 3607 of
  `tests/setupStyles.test.ts` ("compares a percentage as its own number written in full"), besides
  the cases around line 3258.
- `normalizeDeclarationValue` lives in `tests/setupServer.ts`, not in `tests/setupStyles.ts`.

## Done, by item and symbol

- **Item 1.** `tests/setupServer.ts`:
  - `normalizeResolvedColors` leaves quoted strings and `url()` untouched.
  - `inferScopeMode` replaces `matchesDarkScope`. It reads the mode from the target and its
    ancestors only.
  - `collectContextElements` reads an id as the `id` attribute. It builds the first one-compound
    alternative of an `:is()` or `:where()`.
  - The new `extractMatchedCompound` writes what each element must match. `#substitute` checks each
    element with `matches()` and leaves a pair undecided when one does not match.
  - `ValueResolver` computes every pair in each `RESOLVER_SETTINGS` setting (`base`, `font`,
    `block`, `color`, `direction`, `root`, `viewport`). For a regular property it also computes
    under a parent set to the first `PARENT_VALUES` entry that changes that property.
  - `Resolution` carries the first reading whose sides differ, or the base reading.
  - A pair is undecided when a side calls a `UNVARIED_FUNCTIONS` function. It is also undecided
    when a CSS-wide keyword that reads the parent has no parent value to vary.
  - New type: `ResolverSetting`.
- **R2 (b).** A regular property's `inherit`, `unset`, `revert`, or `revert-layer` computes on the
  neutral twin under the base host and under the varied parent. It is alike only where the other
  side computes the same under both, which a concrete value never does. So a keyword against a
  concrete value reads `retuned`, or undecided where no parent value parses. A custom property's
  keyword resolves in its own stylesheet at the site, as before.
- **Probe syntaxes.** `PROBE_SYNTAXES` keeps `<number>#`, `<length-percentage>+`, `<time>`,
  `<angle>`, and `<color>`. The syntaxes I removed compute the same as a kept syntax or the
  `font-family` rung, so removing one could never fail the case. Real rows show no member drift
  from this change.
- **Item 2.** `scanCanonicalValues`:
  - A site outside every mode scope compares with the light cell and, as
    `[data-bs-theme=dark] <selector>`, with the dark cell.
  - Where both sides resolve empty, it compares the written text.
  - `scanWitnesses` is async and takes the resolver. It keeps a row only where `var(<token>)` alone
    resolves alike to the row's release value.
- **Item 3.** The conformance setup keeps both repaint `undecided` lists. The case "decides every
  repainted value difference, with the theme key shipped and withheld" expects `[[], []]`.
- **Item 4.** `ContextElement.sibling` becomes `nested`, which is true for the first element. It
  gains `compound`.
- **Item 5.** `normalizeDeclaration`, its import, its export row, and both of its case pairs are
  gone. The new case is "compares a duration and a percentage as the values Chromium computes,
  whatever their notation".
- **Item 8.**
  - The text-only case is retitled to name its `dropped` row.
  - The retuned case's `restated` control has a comment.
  - The mode proof is its own case, which names `inferScopeMode`.
  - The witness fixture comments `--vn-gray-3000` as a near-miss name.
  - The `--vn-container-sm` row reads `tokenized`.
- **Consequence in the planted world.** `reboot | body | text-align` reads `retuned`. The release's
  undeclared variable computes as `unset`, which reads the parent. The text-only case's `fallback`
  example now uses `color: var(--bs-body-color)`.

## Failing-first and green readings

The command is
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`.

- Red, before implementation (`tmp/units/r2/lret-red-setup.log.txt`): `Tests 14 failed | 285 passed (299)`.
  - `inferScopeMode` and `extractMatchedCompound` fail with `TypeError`, because they did not exist
    yet.
  - Every other new or changed case fails with `AssertionError`.
  - Item 5's resolver case passed red, because the resolver already computed those values. Item 6
    was to bind that case by mutation.
- Green, after implementation (`tmp/units/r2/lret-dev-2.log.txt`): `Tests 297 passed (297)`.
- Conformance (`tmp/units/r2/lret-conformance-drift1.log.txt`, load 5.68): `Tests 4 failed | 30 passed (34)`.
  - The dark-component case, the unrecorded case, and the stale case fail on the member drift
    listed earlier.
  - The witness case fails on the stop.
  - The repaint case passes. The undecided case passes. The canonical case passes.

## Not done

- Applying the § Departures drift, and the guide prose of Item 7.
- Item 6's driver and plants: `radius`, `witness`, `undecided`, `pill`, `initial`, and `scoped`.
- The contended timing reading, and the `LEDGER_TIMEOUT` re-derivation.
- The acceptance gates.

Each of these waits on the root-font-size ruling, because the ruling changes the rows, the witness
set, and the resolver's time.

## Files

- Touched: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
  `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`. `guides/veneer.md` is untouched.
- Diffs: `tmp/units/r2/lret-2.diff` (`git diff 7952712`) and `tmp/units/r2/lret-2-full.diff`
  (`git diff 73326c7`). Status: `tmp/units/r2/lret-2-status.txt`.
- Shared-file patches: none.
