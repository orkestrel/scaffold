# E-ID-BUTTON-CASCADE round 3 report

Unit `opus` on Opus 5.5, native, sole writer in `/home/user/veneer-ebc`, over `e07b3a6` with rounds 1 and 2 uncommitted.
Brief: `.orkestrel/veneer/units/ebc-brief-3.md`.

## Deviation state: stopped on item 3, every other item done

Item 3 hit the brief's stop condition: `.btn` reads differently from the anchor form in a state. Under keyboard focus,
every enabled `.btn` form differs from its anchor in `outline-offset` (`0px` on the button, `1px` on the link). Items
1, 2, and 4 to 9 are independent of item 3 and are done.

- **Expected:** each enabled `.btn` form resolves as its anchor form under hover, press, and keyboard focus, apart
  from `appearance`.
- **Found:** hover and press match. Keyboard focus adds `outline-offset` on every enabled form. Log:
  `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-btn-states-first.log.txt`.
- **Evidence the surface does not cause it:** `.orkestrel/veneer/units/ebc-instruments/r3/probe/btn-focus-3.mjs`, log
  `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-probe-btn-focus.log.txt`. A keyboard-focused `button.btn` reads offset `0px` and `a.btn` reads
  `1px` under the built cascade, under the pre-change cascade (`before.css`), under Bootstrap 5.3.8's own stylesheet,
  and under no stylesheet at all. The difference comes from the Chromium user agent. The surface and its
  `focus-ring` mixin write no `outline-offset`, and the outline style reads `none` on both elements, so the offset
  paints nothing.
- **Done:** the state reads are written and verified as a ready patch, `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-btn-states.patch`. The
  patch is not applied. `git apply --check` passes on the final tree.
- **Not done:** in the tree, the `.btn` case keeps its round-2 form (rest, disabled, and checked only). As a result,
  `state-spacing` does not kill the case in the tree. It kills the patched case.
- **Hypothesis:** the brief expected `appearance` to be the only difference in every state. It did not account for
  the user agent's link focus offset.

The patch makes these changes:

- `BUTTON_FORM_CASES` gains a `name` field (`Harbor <form>`) and a `disabled` field, so each element can be reached by
  role and name.
- `BUTTON_FORM_DIFFERENCES` becomes a frozen record keyed by state: `rest`, `hovered`, and `pressed` hold
  `['appearance']`, and `focused` holds `['appearance', 'outline-offset']`. Its TSDoc names the user-agent cause.
- The case reads every form at rest and each enabled form hovered, pressed, and keyboard-focused. It compares each
  element with its pair in the same state, and parks the pointer before each keyboard reading. Its title becomes
  `resolves every .btn form on a button as the same form resolves on an anchor at rest, and every enabled form under
  hover, press, and keyboard focus, apart from the button appearance and the user agent's focus offset on a link`.

The patch was verified on the final tree: applied, then format, lint, the `configs/src/tsconfig.styles.json`
typecheck, and the `button.test.ts` run, then reverted byte-identically. Log:
`.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-btn-states-patch-verify.log.txt`. The `state-spacing` kill on the patched case is recorded in
`.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-mutation-state-spacing-item3-patch.log.txt`:
`AssertionError: expected [ { form: 'filled', …(2) }, …(24) ] to deeply equal [ { form: 'filled', …(2) }, …(24) ]`.
The diff shows `letter-spacing` added to each enabled form's hovered and pressed readings.

The Orchestrator must rule between these options:

- **Apply the patch.** The oracle then records the user agent's link focus offset as an expected difference under
  focus.
- **Rule otherwise.** The `.btn` case stays in its round-2 form until the ruling lands.

## Items

1. **Kills name an assertion.** `.orkestrel/veneer/units/ebc-instruments/r3/probe/mutate-3.sh` is a copy of `mutate.sh`. It drops the `grep`
   filter, strips only the colour codes, and keeps the whole run in the log. Every mutation runs the owned styles
   proofs and the Tailwind consumer file. A JSON report per run feeds `.orkestrel/veneer/units/ebc-instruments/r3/probe/kills-3.mjs`, which lists
   each failing case with the first line of its failure message. It marks the case `KILL` only when that line starts
   with `AssertionError`. The driver is `.orkestrel/veneer/units/ebc-instruments/r3/probe/mutations-3.sh`. It ran as follows:
   - `initial`, before any edit, over the briefed mutations (`.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-mutations-initial.log.txt`).
   - `final`, over the finished tree and every mutation (`.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-mutations-final.log.txt`).

   In the `initial` and `final` runs, every failing case is an assertion failure. The following mutation table is the `final` run.
2. **Rest readings under reduced motion.** `.orkestrel/veneer/units/ebc-instruments/r3/probe/revert-3.mjs` turns reduced motion on before
   `setContent`, so it applies before the first reading. It records `rest reduced: true / true` for every form. See
   § Revert readings.
3. **`.btn` in every state.** Stopped. See § Deviation state.
4. **The Tailwind pairing anchors the surface.** In `tests/service/tailwind/consumer.test.ts`, the case mounts its
   own holder with `BUTTON_HOLDER_STYLE` (retuned weight and shadow) around a plain button and a `px-8` button. It
   then anchors the plain reading to the surface: padding `6px`/`12px`, weight `700`, and a `box-shadow` other than
   `none`. Next it holds the utility button to that reading apart from the utility's padding. Because the case mounts
   its own buttons, `tests/fixtures/tailwind/markup.html` returns to its `e07b3a6` content. That fixture still
   carries `btn px-8`, which is what makes Tailwind generate `px-8`. The `no-surface` mutation kills the case (see the
   mutation table).
5. **"Bare" retired from the button surface.** Reworded sites:
   - `guides/veneer.md` § Button states and bindings: "the button surface's hover fill" and "the button surface's
     hover and active fills".
   - The `--vn-state-mixer` row: "`elements` — the button surface's hover and active endpoints" and "The `button`
     rule's and the `.btn` class's hover and active veils".
   - The `--vn-button-transparent` row: "`elements` — the button surface's resting fill".
   - The outline paragraph: "Only the `button` rule's and the `.btn` class's own hover and active backgrounds read
     the `--vn-state-mixer` token".
   - The `src/styles/_tokens.scss` comment: "the mixer of the button surface's light veil".

   The constants are renamed: `BUTTON_BARE_VALUES` to `BUTTON_SURFACE_VALUES`, and `BUTTON_BARE_CASES` to
   `BUTTON_SURFACE_CASES`. The consumers are updated in `tests/setupStyles.test.ts` (sorted positions),
   `tests/src/styles/elements/button.test.ts`, and `tests/src/styles/components/button.test.ts`. The sweep ran
   `grep -rn -i bare` over `src/`, `tests/`, `app/`, and `guides/`, minus `isBareEvent`. Log:
   `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-bare-sweep.log.txt`. No remaining hit names the button surface. The hits that name other
   things stay:
   - a bare import;
   - a bare tag, element, part, `mark`, heading, or table cell;
   - a bare panel or placeholder;
   - a bare `#`, identifier, or name;
   - the section hosts that "render bare";
   - a boolean attribute "written bare".

   Hits that name the `.btn` class alone, not the surface, also stay:
   - `src/styles/components/_button.scss` "The bare `.btn` rule". This file is not owned.
   - The `tests/src/styles/components/button.test.ts` title `steps the bare class veil in a dark island…`. This file
     is granted for the rename only.

   Either can be reworded to "the `.btn` class alone" in a later unit.
6. **The tag proof's title.** The title becomes `paints an empty-class, a utility-class, a consumer-class, and a
   target-attribute button with the surface a classless button wears, at rest and in every state, apart from the
   longhands a utility class writes over the surface`.
7. **The reboot comment.** The comment in `src/styles/elements/_button.scss` becomes: "Every button keeps the
   release's margin, text transform, and button appearance, whatever class it carries."
8. **One prefix, one meaning.** `BUTTON_REBOOT_LONGHANDS` is renamed `BUTTON_KEPT_LONGHANDS`. Its TSDoc now reads:
   "Lists the longhands every button keeps from the release: the margin, the text transform, and the button
   appearance…; the button reboot writes none of them back". The sites are updated in
   `tests/src/styles/mixins.test.ts` and `tests/setupStyles.test.ts`.
9. **The badge comment.** Probe `.orkestrel/veneer/units/ebc-instruments/r3/probe/badge-3.mjs`, log `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-probe-badge.log.txt`.
   On the specimen's dark cell (`rgb(33, 37, 41)`), `btn` alone reads color `oklch(0.208 0.042 265.755)`, which
   equals `--vn-text-body-base`, and background `rgba(0, 0, 0, 0)`. `btn btn-primary` reads white on the primary
   fill. The comment now states this: "the `btn` class alone paints its label in the page's body-text color, the
   `--vn-text-body-base` token, over the dark cell, with a transparent background."

## Mutation table

This table is the `final` run over the finished tree. Every log is `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-mutation-<name>-final.log.txt`,
with the JSON reports beside it. Restore digest:

- `94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` for `src/styles/elements/_button.scss`.
- `f5b495417ef9ab7e38aec042d629fc1dd8a46ce083b788ee7ca6cb69e3564fbe` for `src/styles/components/_nav.scss`.

Every restore reads `byte-identical`, and every rebuild exits 0.

| Mutation | Cases killed, with the failure message | Restore |
| --- | --- | --- |
| `class` (surface selector `button:not([class])`) | mixin property-set case: `AssertionError: expected { …(2) } to deeply equal { …(2) }`; tag proof: `AssertionError: expected { name: 'Emptied control', …(1) } to deeply equal { name: 'Emptied control', …(1) }`; consumer-class case: `AssertionError: expected { …(2) } to deeply equal { …(2) }`; Tailwind pairing: `AssertionError: expected { 'padding-top': '1px', …(18) } to deeply equal { 'padding-top': '6px', …(18) }` | `_button.scss` byte-identical |
| `target` (surface selector `button:not([data-bs-target])`) | mixin property-set case: `AssertionError: expected { …(2) } to deeply equal { …(2) }`; tag proof: `AssertionError: expected { name: 'Targeted control', …(1) } to deeply equal { name: 'Targeted control', …(1) }` | `_button.scss` byte-identical |
| `important` (surface padding `!important`) | mixin case: `AssertionError: expected [ Array(4) ] to deeply equal []`; tag proof: `AssertionError: expected { name: 'Spaced control', …(1) } to deeply equal { name: 'Spaced control', …(1) }`; consumer-class case: `AssertionError: expected { …(2) } to deeply equal { …(2) }`; `.btn` forms case: `AssertionError: expected [ { form: 'filled', …(1) }, …(6) ] to deeply equal [ { form: 'filled', …(1) }, …(6) ]`; Tailwind `overrides a component declaration with a utility Tailwind alone generates`: `AssertionError: expected [ '12px', '12px' ] to deeply equal [ '32px', '32px' ]`; Tailwind pairing: `AssertionError: expected { 'padding-top': '6px', …(18) } to deeply equal { 'padding-top': '6px', …(18) }` | `_button.scss` byte-identical |
| `spacing` (surface gains `letter-spacing: 0.05em`) | mixin property-set case: `AssertionError: expected { …(2) } to deeply equal { …(2) }`; `.btn` forms case: `AssertionError: expected [ { form: 'filled', …(1) }, …(6) ] to deeply equal [ { form: 'filled', …(1) }, …(6) ]` | `_button.scss` byte-identical |
| `nav` (the `_nav.scss` include removed) | mixin property-set case: `AssertionError: expected [ …(8) ] to deeply equal [ …(9) ]`; nav link case: `AssertionError: expected { radius: 6, …(5) } to deeply equal { radius: +0, shadow: 'none', …(4) }` | `_nav.scss` byte-identical |
| `state-spacing` (`letter-spacing: 0.05em` inside the surface's `&:hover`) | tree: mixin property-set case only, `AssertionError: expected { …(2) } to deeply equal { …(2) }`. The round-2 `.btn` case stays green, which reproduces the claim 6 break. With the item 3 patch applied, the `.btn` case also dies: `AssertionError: expected [ { form: 'filled', …(2) }, …(24) ] to deeply equal [ { form: 'filled', …(2) }, …(24) ]` (`ebc-3-mutation-state-spacing-item3-patch.log.txt`) | `_button.scss` byte-identical |
| `no-surface` (surface selector `button:not(button)`) | Tailwind pairing: `AssertionError: expected { top: '1px', left: '6px', …(1) } to deeply equal { top: '6px', left: '12px', …(1) }`; tag proof: `AssertionError: expected '400' to be '700' // Object.is equality`; mixin property-set case: `AssertionError: expected { …(2) } to deeply equal { …(2) }`; mixin `paints the calibrated focus ring on its mounted element caller`: `AssertionError: expected 'auto' to be 'none' // Object.is equality`; geometry cases in light and dark mode: `AssertionError: expected 1 to be 6 // Object.is equality`; surface veil case: `AssertionError: expected 1 to be greater than or equal to 1.4` | `_button.scss` byte-identical |

## Revert readings

Instrument: `.orkestrel/veneer/units/ebc-instruments/r3/probe/revert-3.mjs`. Log: `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-probe-revert.log.txt` (exit 0).

Every reading is taken under reduced motion. `rest reduced` reads `true` on both pages for every form. Each cell gives
the Veneer reading, then the release reading.

| Form | `font-weight` | Keyboard `outline-style` | `transition` at rest | Disabled `pointer-events` | `color` at rest |
| --- | --- | --- | --- | --- | --- |
| `.btn-close` | 400 / 400 | none / none | all 0s / all 0s | none / none | black / black |
| `.navbar-toggler` | 400 / 400 | none / none | none 0s / none 0s | auto / auto | `rgba(0, 0, 0, 0.65)` / same |
| `.accordion-button` | 400 / 400 | none / none | none 0s / none 0s | auto / auto | class-written |
| `.dropdown-item` | 700 / 400 | auto / auto | all 0s / all 0s | none / none | class-written |
| `.nav-link` | 600 / 600 | none / none | none 0s / none 0s | none / none | class-written |
| `.list-group-item` | 400 / 400 | auto / auto | all 0s / all 0s | none / none | class-written |
| `.page-link` | 400 / 400 | none / none | none 0s / none 0s | auto / auto | class-written |
| carousel control | 400 / 400 | none / none | none 0s / none 0s | auto / auto | white / white |
| carousel indicator | 400 / 400 | auto / auto | none 0s / none 0s | auto / auto | black / black |

- The close button, the toggler, the carousel control, and the carousel indicator show no difference in any property
  or state.
- The remaining differences are values the class writes itself. They are palette colors in Veneer's serialization,
  and the same focus-shadow color in another notation. The accordion, dropdown, nav, list, and page forms show them.
- The `.dropdown-item` weight comes from the class's own `font-weight: var(--vn-weight-body)`, which the holder
  retunes to 700. It reads 700 in every state.
- Under reduced motion, the `transition` of every class that writes one reads `none 0s` on both pages. The release's
  own reduced-motion rule writes that value.

## Gates

The driver is `.orkestrel/veneer/units/ebc-instruments/r3/probe/gates-3.sh`, with its summary in `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-gates.log.txt`. Each log ends
with `exit=<code>`.

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run build:src:styles` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-build-styles.log.txt` |
| owned styles files (`elements/button`, `mixins`, `components/close`, `components/button`, `components/accordion`, `components/carousel`) | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-owned-styles.log.txt` |
| Tailwind consumer file | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-owned-service.log.txt` |
| `npm run format:check` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-format-check.log.txt` |
| `npm run lint:check` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-lint-check.log.txt` |
| `npm run check` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-check.log.txt` |
| `npm run test:src:styles` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-test-guides.log.txt` |
| `npm run test:policy` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-test-policy.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project service` | 0 | `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-service.log.txt` |

These gates ran on the tree without the item 3 patch.

## Touched files this round

- `src/styles/elements/_button.scss`: the reboot comment names the margin, text transform, and button appearance.
- `src/styles/_tokens.scss`: the endpoints comment names the button surface's light veil.
- `guides/veneer.md`: § Button states and bindings prose, the `--vn-state-mixer` and `--vn-button-transparent`
  rows, and the outline-paragraph sentence.
- `tests/setupStyles.ts`: the renames `BUTTON_SURFACE_VALUES`, `BUTTON_SURFACE_CASES`, and `BUTTON_KEPT_LONGHANDS`,
  and the new TSDoc on the kept longhands.
- `tests/setupStyles.test.ts`: the renamed export names, in sorted positions.
- `tests/src/styles/elements/button.test.ts`: the renamed imports and the tag proof's title.
- `tests/src/styles/components/button.test.ts`: the renamed import and site.
- `tests/src/styles/mixins.test.ts`: the renamed import and sites.
- `tests/service/tailwind/consumer.test.ts`: the pairing case mounts its own holder and anchors the plain button to
  the surface.
- `tests/fixtures/tailwind/markup.html`: back to its `e07b3a6` content.
- `tests/app/browser/sections/BadgeSection.test.ts`: the comment beside `btn-primary` states what the probe reads.
- Instruments: `.orkestrel/veneer/units/ebc-instruments/r3/probe/{mutate-3.sh, mutations-3.sh, kills-3.mjs, revert-3.mjs, btn-focus-3.mjs,
  badge-3.mjs, gates-3.sh}`.
- Unapplied patch: `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-btn-states.patch`, with its source copies in `.orkestrel/veneer/units/ebc-instruments/r3/ebc-3-item3/`.

## Artifacts

- Diff: `.orkestrel/veneer/units/ebc-3.diff` (`git diff e07b3a6`; diffstat across rounds 1 to 3: 26 files changed, 639
  insertions, 172 deletions).
- Status: `.orkestrel/veneer/units/ebc-3-status.txt`.
- Failing-first reading for item 3: `.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-btn-states-first.log.txt`, taken with the state reads
  expecting `appearance` alone. It is red on `outline-offset` under focus.
