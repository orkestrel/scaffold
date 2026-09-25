# E-ID-BUTTON-CASCADE report

Unit `opus` on Opus 5.5, native, sole writer in `/home/user/veneer-ebc` (branch `unit/ebc`, baseline `e07b3a6`).

**Deviation state: stopped on one unowned change.** Every owned change is in place. Every gate in step 4
exits 0 except `npm run test:src:styles`, which exits 1. Two unowned proofs enumerate every
`components`-layer selector on their component's classes, and each one reports the new `:where()` reset
as an extra rule. The fix is a ready patch that has not been applied (see § Unowned patch). Its patched
copies run green.

## Changes

- `src/styles/elements/_button.scss`: the surface and its states move to `button` from
  `button:not([class], [data-bs-target])`. The surface loses its unconditional `cursor: pointer`
  and declares nothing important. The reboot rule keeps `margin`, `text-transform`, and
  `-webkit-appearance`. It no longer writes the `font-family`, `font-size`, `line-height`, and
  `border-radius` declarations, because the surface overrode them in the same layer.
- `src/styles/_mixins.scss`: the `button-reboot` mixin writes back every property the surface writes.
  It writes `inherit` for font family, size, and line height, `0` for `border-radius`, and `revert`
  for `padding`, `font-weight`, `color`, `background-color`, `border`, `outline`, `box-shadow`,
  `opacity`, `pointer-events`, and `transition`.
- Component partials: each one gets one include and its comment, in the `components` layer.
  - `_close.scss`: `:where(button.btn-close)`
  - `_navbar.scss`: `:where(button.navbar-toggler)`
  - `_accordion.scss`: `:where(button.accordion-button)`
  - `_dropdown.scss`: `:where(button.dropdown-item)`
  - `_nav.scss`: `:where(button.nav-link)`
  - `_list-group.scss`: `:where(button.list-group-item)`
  - `_pagination.scss`: `:where(button.page-link)`
  - `_carousel.scss`: `:where(button.carousel-control-prev, button.carousel-control-next)` and
    `:where(.carousel-indicators [data-bs-target])`
  - `.btn` has no include.
- `tests/src/styles/elements/button.test.ts`: the describe block is renamed to `button`, and the
  proofs from Execution step 2 are added. The earlier case "leaves a classed, an empty-class, and a
  slide-target button to the reboot alone" is replaced.
- `tests/src/styles/mixins.test.ts`: adds the property-set and no-important proof for the mixin.
- `tests/fixtures/tailwind/markup.html` and `tests/service/tailwind/consumer.test.ts`: add a plain
  button and a `px-8`-only button, and the utility-button pairing case.
- `tests/conformance.test.ts`: the forced-colors key reads `button:focus-visible @media (forced-colors: active)`.
- `tests/src/styles/components/close.test.ts`: the transition-case comment names the reset.
- `app/browser/styles/_shell.scss`, `tests/app/browser/Showcase.test.ts`,
  `tests/app/browser/integration.test.ts`, and `tests/app/browser/sections/BadgeSection.test.ts`: the
  "bare button" wording is retired. `_shell.scss` also drops the obsolete reason for the attribute hook.
- Shared, edited in the worktree and returned as hunks (see § Shared-file hunks): `tests/setupStyles.ts`,
  `tests/setupStyles.test.ts`, and `guides/veneer.md`.

## `revert` readings

Instrument: `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-probe/revert.mjs`. Log: `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-probe-revert.log.txt`.

The instrument mounts identical markup under the holder on two pages, one with the built cascade and
one with `node_modules/bootstrap/dist/css/bootstrap.css`. It reads each class's button form at rest,
under pointer focus, under keyboard focus (`:focus-visible` confirmed true), and disabled. States are
read with reduced motion. Each cell gives the Veneer reading, then the release reading.

| Form               | `font-weight` | Keyboard `outline-style` | `transition` at rest         | Disabled `pointer-events` | `color` at rest   |
| ------------------ | ------------- | ------------------------ | ---------------------------- | ------------------------- | ----------------- |
| `.btn-close`       | 400 / 400     | none / none              | all 0s / all 0s              | none / none               | black / black     |
| `.navbar-toggler`  | 400 / 400     | none / none              | box-shadow 0.15s / same      | auto / auto               | class-written     |
| `.accordion-button`| 400 / 400     | none / none              | class-written, equal         | auto / auto               | class-written     |
| `.dropdown-item`   | 700 / 400 †   | auto / auto              | all 0s / all 0s              | none / none               | class-written     |
| `.nav-link`        | 600 / 600     | none / none              | class-written, equal         | none / none               | class-written     |
| `.list-group-item` | 400 / 400     | auto / auto              | all 0s / all 0s              | none / none               | class-written     |
| `.page-link`       | 400 / 400     | none / none              | class-written, equal         | auto / auto               | class-written     |
| carousel control   | 400 / 400     | none / none              | opacity 0.15s / same         | auto / auto               | white / white     |
| carousel indicator | 400 / 400     | auto / auto              | opacity 0.6s / same          | auto / auto               | black / black     |

- Every `revert` reads the release's value, so the mixin has no literal in place of a `revert`.
- Every remaining difference between the pages is a value the class itself writes: palette colors in
  Veneer's serialization, and the same focus-shadow color in another notation.
- † The `.dropdown-item` rule writes `font-weight: var(--vn-weight-body)`, which the holder retunes to
  700. The class writes this value itself, so the reset does not cause it. See § Findings.
- The earlier readings in the same log that ran without reduced motion show mid-transition values
  only.

## Failing-first

| Proof (case title)                                                                                                                              | Command                                                                                                                              | Before the change                         | After                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------ |
| button › shows the pointer over an enabled button and the default cursor over a disabled one                                                    | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts` | red (`Tests 4 failed \| 55 passed (59)`)  | green (`Tests 59 passed (59)`)       |
| button › paints an empty-class, a utility-class, a consumer-class, and a target-attribute button with the surface a classless button wears, at rest and in every state | same                                                                                                                                 | red                                       | green                                |
| button › lets a consumer class win the padding and the corner, unlayered and inside the components layer, and keeps every other surface value   | same                                                                                                                                 | red                                       | green                                |
| declaration mixins › writes the button reboot back on every longhand the button surface writes, …, and the surface writes none of them important | same                                                                                                                                 | red                                       | green                                |
| the consumer pairing › keeps the button surface on a button carrying a utility alone, and lets the utility win the padding it declares          | `npx vitest run --config vite.config.ts --no-cache --project service tests/service/tailwind/consumer.test.ts`                        | red (`Tests 1 failed \| 8 passed (9)`)    | green (`Tests 9 passed (9)`)         |

Logs: `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-red-owned.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-red-tailwind.log.txt`,
`/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-green-owned.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-owned-service.log.txt`.

Two proofs are green before the change by design, and each one reddens under its named mutation:

- "resolves every .btn form on a button as the same form resolves on an anchor, apart from the
  button appearance" reads the pre-change readings. The anchor form is the oracle, and its
  instrument is `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-probe/btn-forms.mjs`. Against the pre-change cascade, `appearance` is
  the only longhand that differs.
- "writes the button reboot back on a plain nav link's button form, which takes the release's
  corner, type, and shadow".

## Mutations

Driver: `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-probe/mutate.sh <name>`. Each run records the diff it applied and the digest
check of the restore. Every restore is byte-identical.

| Mutation                                                    | Log                                                | Cases it reddens                                                                                            |
| ----------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `class`: surface selector back to `button:not([class])`     | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-mutation-class.log.txt`        | tag proof; consumer proof; mixin property-set proof; Tailwind pairing case (`service exit=1`)               |
| `target`: surface selector back to `button:not([data-bs-target])` | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-mutation-target.log.txt` | tag proof (the targeted case); mixin property-set proof                                                     |
| `important`: surface `padding` marked `!important`          | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-mutation-important.log.txt`    | consumer proof; mixin proof (important refusal); tag proof (utility case); `.btn` forms proof               |
| `spacing`: surface gains `letter-spacing: 0.05em`           | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-mutation-spacing.log.txt`      | mixin property-set proof; `.btn` forms proof                                                                |
| `nav`: the `_nav.scss` include removed                      | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-mutation-nav.log.txt`          | nav link proof; mixin property-set proof (the selector list)                                                |

Every extra red in this table comes from behavior the mutation changes. For example, an important
surface padding outranks the utility's padding and the `.btn` class padding. No harness breaks.

## Unknowns answered

- **`:where()` through the gates.** No gate refuses the selector.
  - `normalizeComplexSelector` returns the selector unchanged. The accordion and carousel diffs
    show this.
  - The positional scan (`scanPositionalPairs`, run from `tests/src/styles/index.test.ts`) reads
    only the `elements` layer and passes.
  - `npm run test:policy` passes.
  - The ledger does not measure the resets. The `collectSelectorClasses` function reads no class
    inside a functional argument, so `attributeSelector` claims no shipped component for the rule,
    and `collectAdditions` skips it. The guide records this in § Outside the ledger.
- **`transition: revert` without its reduced-motion pair.** The policy sweep and the styles suite
  accept it. The value hands the property back to the browser's `all 0s`, so the reset adds no
  motion for reduced motion to remove.

## Gates

| Gate                                                                                   | Exit | Reading                                        | Log                                                |
| -------------------------------------------------------------------------------------- | ---- | ---------------------------------------------- | -------------------------------------------------- |
| scoped `oxfmt --check` over the touched files                                          | 0    | all matched files formatted                    | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-format-scoped.log.txt`    |
| scoped `oxlint --deny-warnings` over the touched `.ts` files                           | 0    | —                                              | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-lint-scoped.log.txt`      |
| `npm run check`                                                                        | 0    | —                                              | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-check.log.txt`            |
| `npm run build:src` (conformance's runtime-entry case reads `dist/src/core`)           | 0    | —                                              | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-build-src.log.txt`             |
| owned styles files (button, mixins, close)                                             | 0    | `Tests 77 passed (77)`                         | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-owned-styles.log.txt`     |
| owned service file (Tailwind consumer)                                                 | 0    | `Tests 9 passed (9)`                           | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-owned-service.log.txt`    |
| `npm run test:src:styles`                                                              | **1**| `Tests 2 failed \| 1498 passed (1500)`; the failures are the accordion and carousel enumerations alone | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-test-src-styles.log.txt` |
| `npm run test:setup`                                                                   | 0    | `Tests 321 passed (321)`                       | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-test-setup.log.txt`       |
| `npm run test:conformance`                                                             | 0    | `Tests 26 passed (26)`                         | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-test-conformance.log.txt` |
| `npm run test:guides`                                                                  | 0    | `Tests 20 passed (20)`                         | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-test-guides.log.txt`      |
| `npm run test:policy`                                                                  | 0    | `Tests 109 passed \| 1 skipped (110)`; the skip is the vendored `skipIf` in `tests/policy.test.ts` | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-test-policy.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser`              | 0    | `Tests 223 passed (223)`                       | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-gate-app-browser.log.txt`      |
| patched copies of the unowned enumerations (verification only)                         | 0    | `Tests 48 passed (48)`                         | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-verify-unowned-patch.log.txt`  |

Gate driver: `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-probe/gates.sh`.

## Unowned patch

The patch is `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-unowned-enumerations.patch`. It has not been applied, and
`git apply --check` passes. It covers two cases:

- `tests/src/styles/components/accordion.test.ts`, case "writes the recorded accordion selectors
  and the dark icon rule, and no other rule on the accordion classes": the patch adds
  `':where(button.accordion-button)'` beside the dark icon rule.
- `tests/src/styles/components/carousel.test.ts`, case "writes the recorded carousel selectors and
  no other rule on their classes": the patch adds
  `':where(button.carousel-control-prev, button.carousel-control-next)'` and
  `':where(.carousel-indicators [data-bs-target])'` beside `CAROUSEL_SELECTORS`.

The patch leaves the `ACCORDION_SELECTORS` and `CAROUSEL_SELECTORS` constants alone. They are the
release's record, and `tests/setupStyles.test.ts` holds each one against the inventory.

Verification: the instrument is `.orkestrel/veneer/units/ebc-instruments/ebc-verify/vitest.config.ts`. It runs the patched copies
from `.orkestrel/veneer/units/ebc-instruments/ebc-verify/src/styles/components/` and reads the real setup modules through symlinks.

Expected: the owned scope covers every file the widened tag makes false. Found: these two unowned
proofs enumerate rules by class. Done: all owned work. Not done: applying this patch. Hypothesis: the
brief's owned set came from a search for the old selector, and it did not search for the
enumerating proofs of the components that receive a reset.

## Shared-file hunks

| File                           | Patch                                          | Hunks                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/setupStyles.ts`         | `.orkestrel/veneer/units/ebc-instruments/ebc-shared-setupStyles.patch`       | The docs on `BUTTON_BARE_VALUES` and `BUTTON_BARE_CASES` lose the "bare-button" wording. The patch adds `BUTTON_HOLDER_STYLE`, `BUTTON_SURFACE_LONGHANDS`, `BUTTON_TAG_CASES`, `BUTTON_CONSUMER_RULES`, `BUTTON_FORM_CASES`, `BUTTON_FORM_DIFFERENCES`, `BUTTON_SURFACE_SELECTORS`, `BUTTON_REBOOT_LONGHANDS`, and `BUTTON_REBOOT_SELECTORS` before `BUTTON_FILLED_CASES`. |
| `tests/setupStyles.test.ts`    | `.orkestrel/veneer/units/ebc-instruments/ebc-shared-setupStyles-test.patch`  | The export list gains the new names in sorted positions.                                                                                                                                                                                                                                                                              |
| `guides/veneer.md`             | `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-shared-veneer.patch`            | The `_button.scss` inventory row. The § Styles paragraph that began "A bare button is a `button` element" now states the tag rule, the reboot, the class list, and consumer control. The Tailwind paragraph now states that utilities keep the surface. The `#### reboot` departures gain `button` `border-radius`, `font-family`, `font-size`, and `line-height` (tokenized) after the `th` row. In § Additions, the retired `button:not([class], [data-bs-target])` rows are replaced by `button { padding \| font-weight \| color \| background-color \| border \| box-shadow \| transition }` declarations, the reduced-motion `transition` row, and the `button:hover`, `:active`, `:focus-visible`, forced-colors `:focus-visible`, and `:disabled` selectors. § Outside the ledger gains the button reboot rules in its opening sentence and a paragraph of their own. The Showcase paragraph drops the "stays a bare button" sentence. |

## Findings for the next unit

- **Identifiers keep "BARE".** `BUTTON_BARE_VALUES` and `BUTTON_BARE_CASES` keep their names,
  because `tests/src/styles/components/button.test.ts` (unowned) imports `BUTTON_BARE_VALUES.step`.
  A rename to `BUTTON_SURFACE_*` touches that file, `tests/setupStyles.ts`,
  `tests/setupStyles.test.ts`, and `tests/src/styles/elements/button.test.ts`. The next unit that
  owns the component button proof carries it: E-ID-BUTTON-CLASSES.
- **`.dropdown-item` weight.** The `.dropdown-item` weight reads `var(--vn-weight-body)`, where the
  release writes `400`. Under the retuned holder, both the button form and the anchor form read
  700. This is a class-level value, not a leak through the button form. Carrier: E-ID-BUTTON-CLASSES.
- **Unmeasured resets.** The ledger does not measure the `:where()` resets (§ Unknowns answered). A
  reset that drifted from the surface stays visible to `tests/src/styles/mixins.test.ts`, but no
  ledger row records it. Changing that needs an edit to `tests/setupServer.ts`, which this unit does
  not own. The carrier is not yet known, so the Orchestrator must assign it.
- **ROADMAP wording.** `ROADMAP.md` names the landed unit BARE-BUTTON and its scope "no class and no
  data-bs-target attribute" in the B-CROSS record. That is a historical record, and this unit does
  not own the file.

## Artifacts

- Diff: `/home/user/scaffold/.orkestrel/veneer/units/ebc.diff` (`git diff e07b3a6`)
- Status: `/home/user/scaffold/.orkestrel/veneer/units/ebc-status.txt`
- Instruments: `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/ebc-probe/` (`revert.mjs`, `btn-forms.mjs`, `mutate.sh`, `gates.sh`, `before.css`, `after.css`)
