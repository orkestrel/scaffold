# Unit E-ID-BUTTON-CASCADE round 6 — report

## Item 1

Replaced the comment block and retitled the enumeration case in
`tests/src/styles/components/accordion.test.ts`, both verbatim as `ebc-brief-8.md` gives them. The
case now reads `writes the recorded accordion selectors, the dark icon selector, and the button
reboot's selector on the header's button form, and no other components-layer selector naming an
accordion class`.

## Item 2

Replaced the comment block and retitled the enumeration case in
`tests/src/styles/components/carousel.test.ts`, both verbatim as `ebc-brief-8.md` gives them. The
case now reads `writes the recorded carousel selectors, the button reboot's selectors on the
controls' button forms and on the indicators' own selector, and no other components-layer selector
naming a carousel key class`.

## Item 3 — the four plants

Each plant copied its target file aside, recorded its SHA-256, ran the build and the targeted
test, restored from the copy, and confirmed the digest matched.

| Plant | Command | Expected | Result (quoted) | Restore digest |
| --- | --- | --- | --- | --- |
| `dup-accordion` (`.accordion-button { letter-spacing: 1px; }` appended as the last rule in `_accordion.scss`'s `@layer components`) | `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/accordion.test.ts -t "no other components-layer selector"` | The enumeration case passes | `Test Files  1 passed (1)` / `Tests  1 passed \| 29 skipped (30)` / `test exit=0` | `restore: byte-identical fcfb2c87f12453f5bb5b96da3baca81029a3946cbb5ebd1ac86f842165fcd8c4` |
| `extra-accordion` (`.accordion-button.audit-probe { letter-spacing: 1px; }` in the same place) | same command | The enumeration case fails with an `AssertionError` | `AssertionError: expected [ '.accordion', …(24) ] to deeply equal [ '.accordion', …(23) ]` / `Test Files  1 failed (1)` / `test exit=1` | `restore: byte-identical fcfb2c87f12453f5bb5b96da3baca81029a3946cbb5ebd1ac86f842165fcd8c4` |
| `dup-carousel` (`.carousel-item { letter-spacing: 1px; }` appended as the last rule in `_carousel.scss`'s `@layer components`) | `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/carousel.test.ts -t "no other components-layer selector"` | The enumeration case passes | `Test Files  1 passed (1)` / `Tests  1 passed \| 17 skipped (18)` / `test exit=0` | `restore: byte-identical d37aca34bcaa96a3ba5d1e8d6646e26f33173d8ad907d643674464c3f821eb6b` |
| `extra-carousel` (`.carousel-item.audit-probe { letter-spacing: 1px; }` in the same place) | same command | The enumeration case fails with an `AssertionError` | `AssertionError: expected [ '.active.carousel-item-end', …(33) ] to deeply equal [ '.active.carousel-item-end', …(32) ]` / `Test Files  1 failed (1)` / `test exit=1` | `restore: byte-identical d37aca34bcaa96a3ba5d1e8d6646e26f33173d8ad907d643674464c3f821eb6b` |

`npm run build:src:styles` ran again after the last restore (exit `0`), so the built cascade
reflects the restored source.

## Gate table

| Gate | Command | Log | Exit |
| --- | --- | --- | --- |
| Format | `npm run format:check` | `tmp/units/ebc-6-format.log.txt` | `0` |
| Lint | `npm run lint:check` | `tmp/units/ebc-6-lint.log.txt` | `0` |
| Typecheck | `npm run check` | `tmp/units/ebc-6-check.log.txt` | `0` |
| Test | `npm run test:src:styles` | `tmp/units/ebc-6-test.log.txt` | `0`, 115 test files and 1500 tests passed |

## Diff and status

- `tmp/units/ebc-6.diff` (`git diff e07b3a6`)
- `tmp/units/ebc-6-status.txt` (`git status --short`)
