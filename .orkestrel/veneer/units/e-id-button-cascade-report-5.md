# Unit E-ID-BUTTON-CASCADE round 5 — report

Item 5 ran under `ebc-brief-7.md`'s replaced plant, the third attempt this round. The two earlier
plants (`ebc-brief-5.md`'s `border-right-width` plant and `ebc-brief-6.md`'s `transition-delay`
plant) each stopped on their own control, correctly, for the reasons this report records under
item 5.

## Item 1

Retitled the case in `tests/src/styles/components/accordion.test.ts` to: `writes the recorded
accordion selectors, the dark icon rule, and the button reboot on the header's button form, and no
other rule on the accordion classes`.

## Item 2

Retitled the case in `tests/src/styles/components/carousel.test.ts` to: `writes the recorded
carousel selectors and the button reboot on the controls' and the indicators' button forms, and no
other rule on their classes`.

## Item 3

Replaced the two-line comment in `tests/src/styles/elements/button.test.ts` with the verbatim text
`ebc-brief-5.md` names, wrapped by `oxfmt` at the Execution step.

## Item 4

Copied `tmp/units/ebc-probe/revert-3.mjs` to `tmp/units/ebc-probe/revert-5.mjs`, widened the
`properties` array to the padding, font, color, all four border-side widths/styles/colors, all four
border-radius corners, outline, box-shadow, opacity, pointer-events, cursor, and all four transition
longhands `ebc-brief-5.md` lists, keeping everything else, reduced motion before the first reading
included. Ran it against `dist/src/styles/index.css`: `tmp/units/logs/ebc-5-probe-revert.log.txt`.

The widened run's every new line versus round 3's retained log
(`tmp/units/logs/ebc-3-probe-revert.log.txt`) is the same pre-existing color-notation split round 3
already reported for `color` and `outline-color` on the same form and state (veneer's token
resolves to `oklch`/`oklab`/`color(srgb ...)`, the release's fixed value resolves to `rgb`/`rgba`,
at matching numeric magnitude), never a value the button-reboot mixin itself writes as a
difference. No `border-*-width`, `border-*-style`, `border-*-radius`, `padding-*`,
`outline-width`/`style`/`offset`, `transition-property`/`duration`/`timing-function`/`delay`,
`opacity`, or `pointer-events` line appears in the diff output for any form.

## Item 5 — three plants, one that surfaced

### First plant (`ebc-brief-5.md`): `border-right-width: 5px;` after `border: revert;` — did not surface

- SHA-256 before the plant: `0eb94362739480cfd6248a49dded1a02f23f7397eca3898957c60c8010adc69e`.
- Built (exit 0), ran `revert-5.mjs`: the control log carried no `border-right-width` line.
- Direct `getComputedStyle` check on the accordion button read `border-right-width: 0px`,
  `border-right-style: none`, `border-right: 0px none oklch(0.208 0.042 265.755)`. A separate
  cascade rule sets `border-style: none`, which zeroes the computed width regardless of the
  plant's `border-right-width` declaration, on the veneer side as much as on the release side, so
  the two sides never diverge on this property.
- Restored the file; SHA-256 after restore matched the recorded value. Rebuilt (exit 0).
- Stopped per the deviation contract: the control did not surface `border-right-width`.

### Second plant (`ebc-brief-6.md`): `transition-delay: 1s;` after `transition: revert;` — did not surface

- SHA-256 before the plant: `0eb94362739480cfd6248a49dded1a02f23f7397eca3898957c60c8010adc69e`.
- Built (exit 0), ran `revert-5.mjs` overwriting the control log: no `transition-delay` line
  appeared on any form.
- The built `dist/src/styles/index.css` showed why: the minifier folded the two declarations in the
  same rule into one shorthand, `transition:revert 0s 1s`. That value is invalid — `revert` must
  be a declaration's whole value, never merged with other components — so the browser dropped the
  whole declaration and fell through to the `elements` layer's own `transition` rule on the bare
  `button` selector. `getComputedStyle` on `.btn-close` read `transition-delay: 0s, 0s, 0s, 0s, 0s`
  (the elements layer's five-item list), with no `1s` anywhere in the built stylesheet.
- Restored the file; SHA-256 after restore matched the recorded value. Rebuilt (exit 0).
- Stopped per the deviation contract: the control did not surface `transition-delay`.

### Third plant (`ebc-brief-7.md`): `transition: revert;` replaced with `transition: all 0s ease 1s;` — surfaced

- SHA-256 before the plant: `0eb94362739480cfd6248a49dded1a02f23f7397eca3898957c60c8010adc69e`.
- Built (exit 0). `grep -o ':where(button.nav-link){[^}]*}' dist/src/styles/index.css` read
  `:where(button.nav-link){padding:revert;font-family:inherit;font-size:inherit;font-weight:revert;line-height:inherit;color:revert;background-color:revert;border:revert;outline:revert;box-shadow:revert;opacity:revert;pointer-events:revert;border-radius:0;transition:all 0s 1s}`
  — the compiled rule carries the replaced value (the minifier dropped the default `ease` timing
  keyword, leaving `all 0s 1s`, which is the same value).
- Ran `revert-5.mjs` to `tmp/units/logs/ebc-5-probe-revert-control.log.txt` (overwriting the
  earlier control log). It reports a `transition-delay` difference, `veneer 1s | release 0s`, at
  every state (rest, pointer, keyboard, disabled) on the **close**, **dropdown**, and **list**
  forms — the three forms whose own component partials (`_close.scss`, `_dropdown.scss`,
  `_list-group.scss`) write no `transition` declaration of their own.
- Restored the file from the copy. SHA-256 after restore:
  `0eb94362739480cfd6248a49dded1a02f23f7397eca3898957c60c8010adc69e` — matches the recorded
  pre-plant value. Rebuilt (exit 0).

## Item 6 — mutations and kills

Ran `bash tmp/units/ebc-probe/mutations-3.sh final5 class target important spacing nav
state-spacing no-surface`, then `node tmp/units/ebc-probe/kills-3.mjs` over the resulting per-
mutation styles and service JSON reports, retained at `tmp/units/logs/ebc-5-mutations.log.txt`.
Every mutation restored byte-identical and every rebuild exited `0`.

| Mutation | Cases killed with an `AssertionError` (first line of the message) | Log path | Restore |
| --- | --- | --- | --- |
| `class` | `declaration mixins writes the button reboot back on every longhand...`; `button paints an empty-class, a utility-class, a consumer-class, and a target-attribute button...`; `button lets a consumer class win the padding and the corner...`; `the consumer pairing keeps the button surface on a button carrying a utility alone...` | `tmp/units/logs/ebc-3-mutation-class-final5.log.txt` | `restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` |
| `target` | `declaration mixins writes the button reboot back on every longhand...`; `button paints an empty-class, a utility-class, a consumer-class, and a target-attribute button...` | `tmp/units/logs/ebc-3-mutation-target-final5.log.txt` | `restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` |
| `important` | `declaration mixins writes the button reboot back on every longhand...`; `button paints an empty-class, a utility-class, a consumer-class, and a target-attribute button...`; `button lets a consumer class win the padding and the corner...`; `button resolves every .btn form on a button as the same form resolves on an anchor at rest...` (the shipped `.btn` case); `the consumer pairing overrides a component declaration with a utility Tailwind alone generates`; `the consumer pairing keeps the button surface on a button carrying a utility alone...` | `tmp/units/logs/ebc-3-mutation-important-final5.log.txt` | `restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` |
| `spacing` | `declaration mixins writes the button reboot back on every longhand...`; `button resolves every .btn form on a button as the same form resolves on an anchor at rest...` (the shipped `.btn` case) | `tmp/units/logs/ebc-3-mutation-spacing-final5.log.txt` | `restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` |
| `nav` | `declaration mixins writes the button reboot back on every longhand...`; `button writes the button reboot back on a plain nav link's button form...` | `tmp/units/logs/ebc-3-mutation-nav-final5.log.txt` | `restore: byte-identical f5b495417ef9ab7e38aec042d629fc1dd8a46ce083b788ee7ca6cb69e3564fbe` |
| `state-spacing` | `declaration mixins writes the button reboot back on every longhand...`; `button resolves every .btn form on a button as the same form resolves on an anchor at rest...` | `tmp/units/logs/ebc-3-mutation-state-spacing-final5.log.txt` | `restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` |
| `no-surface` | `declaration mixins paints the calibrated focus ring on its mounted element caller`; `declaration mixins writes the button reboot back on every longhand...`; `button paints an empty-class, a utility-class, a consumer-class, and a target-attribute button...`; `button resolves the calibrated geometry and interaction paint in light mode`; `button resolves the calibrated geometry and interaction paint in dark mode`; `button steps the surface veil in a dark island by at least the least hover step`; `the consumer pairing keeps the button surface on a button carrying a utility alone...` | `tmp/units/logs/ebc-3-mutation-no-surface-final5.log.txt` | `restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f` |

`important` and `spacing` both kill the case `button resolves every .btn form on a button as the
same form resolves on an anchor at rest, and every enabled form under hover, press, and keyboard
focus, apart from the button appearance and the user agent's focus offset on a link`, under its
shipped title.

## Gate table

| Gate | Command | Log | Exit |
| --- | --- | --- | --- |
| Format | `npm run format:check` | `tmp/units/ebc-5-format.log.txt` | `0` |
| Lint | `npm run lint:check` | `tmp/units/ebc-5-lint.log.txt` | `0` |
| Typecheck | `npm run check` | `tmp/units/ebc-5-check.log.txt` | `0` |
| Test | `npm run test:src:styles` | `tmp/units/ebc-5-test.log.txt` | `0`, 115 test files and 1500 tests passed |

## Diff and status

- `tmp/units/ebc-5.diff` (`git diff e07b3a6`)
- `tmp/units/ebc-5-status.txt` (`git status --short`)
