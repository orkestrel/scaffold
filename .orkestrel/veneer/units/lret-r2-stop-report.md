# LEDGER-RETUNE round 2 report: stopped on a deviation

**State: stopped.** The deviation contract's stop condition "a `bootstrap` token has no witness" fired. `--vn-shadow-inset` loses its only witness because the resolver now varies the root font size, which a `rem` length reads. Items 1 to 5 are implemented and the setup suite is green. The conformance gate is red, on this finding and on member drift I have not applied to the guide. Items 6 and 7, the timing reading, and the acceptance gates are not done. Item 8 is done in the test file. The same text is in `/home/user/veneer-lret/tmp/units/r2/lret-report-2.md`.

## The deviation

- **Expected.** Every `bootstrap` token keeps a witness after Item 1's context rule and Item 2's token-alone rule.
- **Found.** The witness scan names `--vn-shadow-inset`. The log `tmp/units/r2/lret-conformance-drift1.log.txt` shows `AssertionError: expected [ '--vn-shadow-inset' ] to deeply equal []`.
  - Only one row reads the token: `theme | :root | --bs-box-shadow-inset`, release `inset 0 1px 2px rgba(0, 0, 0, 0.075)`, Veneer `var(--vn-shadow-inset)`.
  - The token is `inset 0 calc(0.0625rem * var(--vn-factor-elevation)) calc(0.125rem * …) …`.
  - At a 20px root font size, the token side computes `1.25px 2.5px` and the release side `1px 2px`. So the row reads `retuned`, and the token alone resolves apart from the release value.
- **Cause, isolated by a run.** Item 1 lists these contexts to vary: font size, containing block, parent value, `currentColor`, and direction. It does not list the root font size (`rem`) or the viewport (`vw`). Its closing rule makes a pair undecided wherever the resolver cannot vary a context a term reads. The resolver can vary both, so I added a `root` setting (20px) and a `viewport` setting (800×600).
  - `tmp/units/r2/lret-experiment-noroot.log.txt` reruns conformance with the `root` setting removed. `tests/setupServer.ts` was restored byte-identically afterwards (`cmp`).
  - In that run the witness case passes, and `.col-form-label` is the only member drift left.
  - The `viewport` setting changes no row.
- **The fork, for you to decide:**
  - **Keep the `root` setting.** `--vn-shadow-inset` then needs a change outside my files. Either `src/styles/_tokens.scss` writes the shadow in px, or its § Reference map row stops sourcing it from `bootstrap`. The display and legend rows also change to `retuned`.
  - **Drop the `root` setting.** The rule "undecided wherever the resolver cannot vary a context a term reads" then no longer holds for `rem`. The brief must say that the root font size stays at the browser default, like the factors.
  - **Hypothesis:** dropping it is what the brief meant, because its context list leaves out `rem`. Veneer writes rem where the release writes px or a fluid rem-plus-vw value, and every such row would otherwise change member.

## Rows whose member changes, as the gate printed them

These rows come from `lret-conformance-drift1.log.txt`, taken with the `root` setting in place. None is applied to the guide yet.

- `col | .col-form-label | font-size | — | inherit | var(--vn-size-3) | retuned`, was `tokenized`. The parent-value reading changes it, so it changes under either option.
- `display | .display-1` to `.display-6` `| font-size | — | calc(…rem + …vw) | calc(var(--vn-display-N) - max(…) * (1 - 100vw / 1200px)) | retuned`, was `tokenized`. The `root` setting alone changes these.
- `reboot | legend | font-size | — | calc(1.275rem + 0.3vw) | calc(var(--vn-size-6) - …) | retuned`, was `tokenized`. The `root` setting alone changes it.
- `theme | :root | --bs-box-shadow-inset | — | inset 0 1px 2px rgba(0, 0, 0, 0.075) | var(--vn-shadow-inset) | retuned`, was `tokenized`. The `root` setting alone changes it.

No real pair is undecided: the undecided case and the repaint case both pass on the real tree. The canonical scan names nothing with Item 2's changes in place.

## Evidence re-readings

The readings are in `tmp/units/r2/lret-evidence.txt`, taken at `7952712` on a clean tree. All match the brief except these:
- `normalizeDeclaration` has a second pair of cases around line 3607 of `tests/setupStyles.test.ts`, besides the ones around line 3258.
- `normalizeDeclarationValue` is in `tests/setupServer.ts`.

## Done, by item and symbol

- **Item 1** (`tests/setupServer.ts`):
  - `normalizeResolvedColors` leaves quoted strings and `url()` untouched.
  - `inferScopeMode` replaces `matchesDarkScope` and reads the mode from the target and its ancestors only.
  - `collectContextElements` reads an id as the `id` attribute, and builds from the first single-compound alternative of an `:is()` or `:where()`.
  - The new `extractMatchedCompound` writes what each element must match. `#substitute` checks each element with `matches()`, and a pair whose elements don't match is undecided.
  - `ValueResolver` computes every pair in each setting of the new `RESOLVER_SETTINGS` constant: `base`, `font`, `block`, `color`, `direction`, `root`, and `viewport`. A regular property is also computed under a parent set to the first `PARENT_VALUES` entry that changes it.
  - `Resolution` carries the first reading whose sides differ, or else the base reading.
  - A pair is undecided when a side calls a `UNVARIED_FUNCTIONS` function. It is also undecided when a side is a CSS-wide keyword that reads the parent and no parent value changes the property.
  - New type: `ResolverSetting`.
- **R2 (b), how CSS-wide keywords compute:**
  - A regular property's `inherit`, `unset`, `revert`, or `revert-layer` computes under the base host and under the varied parent. A concrete value never matches both, so a keyword against a concrete value reads `retuned`. Where no parent value parses, the pair is undecided.
  - A custom property's keyword resolves in its own stylesheet at the site, as before.
- **Probe syntaxes.** `PROBE_SYNTAXES` keeps `<number>#`, `<length-percentage>+`, `<time>`, `<angle>`, and `<color>`. Every syntax I removed computes the same as a kept syntax or the `font-family` rung, so removing it could never fail the case. Real rows show no member drift from this change.
- **Item 2** (`scanCanonicalValues` and `scanWitnesses`):
  - A site outside every mode scope is compared with the light cell, and again as `[data-bs-theme=dark] <selector>` with the dark cell.
  - Where both sides resolve empty, the scan compares the written text.
  - `scanWitnesses` is async and takes the resolver. A row witnesses a token only where `var(<token>)` alone resolves alike to the row's release value.
- **Item 3.** The conformance setup keeps both repaint `undecided` lists. A new case, "decides every repainted value difference, with the theme key shipped and withheld", expects `[[], []]`.
- **Item 4.** `ContextElement.sibling` is now `nested`, true for the first element, and the type gains a `compound` member.
- **Item 5.** `normalizeDeclaration` is retired with its import, its export row, and both of its case pairs. A new case, "compares a duration and a percentage as the values Chromium computes, whatever their notation", replaces them.
- **Item 8:**
  - The text-only case's title now names its `dropped` row.
  - The retuned case's `restated` control has a comment.
  - The mode proof is its own case, and its title names `inferScopeMode`.
  - The witness fixture's `--vn-gray-3000` has a comment saying it is a near-miss name.
  - The `--vn-container-sm` row reads `tokenized`.
- **Knock-on effect in the planted world.** `reboot | body | text-align` now reads `retuned`: the release's undeclared variable computes as `unset`, which reads the parent. The text-only case's `fallback` example now uses `color: var(--bs-body-color)`.

## Failing-first and green readings

Command: `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`.

- **Red** (`tmp/units/r2/lret-red-setup.log.txt`): `Tests 14 failed | 285 passed (299)`.
  - Every new or changed case failed with `AssertionError`, except the `inferScopeMode` and `extractMatchedCompound` cases. Those failed with `TypeError` because the functions did not exist yet.
  - Item 5's resolver case passed red, because the resolver already computed those values. Item 6 was to bind it by mutation.
- **Green** (`tmp/units/r2/lret-dev-2.log.txt`): `Tests 297 passed (297)`.
- **Conformance** (`lret-conformance-drift1.log.txt`, load 5.68): `Tests 4 failed | 30 passed (34)`.
  - The dark-component, unrecorded, and stale cases fail on the member drift listed earlier.
  - The witness case fails on the stop.
  - The repaint, undecided, and canonical cases pass.

## Not done

Each of these waits on the root-font-size ruling, because the ruling changes the rows, the witness set, and the resolver's time:
- Applying the § Departures drift to the guide, and the guide prose of Item 7.
- Item 6's mutation driver, and the `radius`, `witness`, `undecided`, `pill`, `initial`, and `scoped` plants.
- The contended timing reading and the new `LEDGER_TIMEOUT`.
- The acceptance gates.

## Files

- Touched, all under `/home/user/veneer-lret`: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`. `guides/veneer.md` is untouched.
- `git diff --stat 7952712`: 5 files changed, 1010 insertions(+), 296 deletions(-).
- Diffs: `tmp/units/r2/lret-2.diff` (`git diff 7952712`) and `tmp/units/r2/lret-2-full.diff` (`git diff 73326c7`). Status: `tmp/units/r2/lret-2-status.txt`.
- Shared-file patches: none.
