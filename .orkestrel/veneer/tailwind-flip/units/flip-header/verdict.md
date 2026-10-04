# flip-header: verdict

The header unit (R12) is accepted with one correction by the showcase session, committed on veneer `ccr-d15a48b1-yyyll6` as `ca2c90e` on 2026-10-04.

## What the unit delivered

- `app/browser/factories.ts`: the header is `position-sticky top-0 z-3 bg-body border-bottom`; the bar is `container-xxl d-flex flex-wrap flex-md-nowrap align-items-center justify-content-md-between row-gap-2 column-gap-2 py-2`; the brand line is `Veneer` (an `h6` heading) beside `Bootstrap 5.3.8`; the status paragraph is `visually-hidden` with `role="status"`.
- `app/browser/constants.ts`: labels `Bootstrap`, `Tailwind, no layer`, `Tailwind + layer`.
- `app/browser/Showcase.ts`: a `ResizeObserver` on the header writes the root's `scroll-padding-top` (height + 8 px) and the sticky contents' `top` and `max-height`; `destroy` disconnects it and restores the root's inline style.
- Tests: labels throughout; J1 reads the header at or under 30 % of the viewport height at 390 px and each of the five buttons one line box tall; the neutrality case (`keeps the compact sticky header neutral under every face at narrow and wide viewports`) with the ruled exclusions; the landing case (`lands first and deep contents headings below the sticky header after a viewport resize`); the matrix case admits the sticky contents' two inline longhands.
- `showcase/browser.html` rebuilt: digest `db52837f85eead1457a0504e85e551dd981245c7fabbf1c1d464eec1241e48e4`, stamp `4e30051b2b309cfef02bc0dafbc528adf2f9ebc1ebe14d302c1522fd6b8df3e1`. `dist/src/bootstrap/index.css` unchanged at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

## Measurements (Chromium 141.0.7390.37, 2026-10-04)

| Viewport | Header height | Rows | Content share |
| --- | ---: | --- | ---: |
| 390 × 844 | 116 px | brand; Stylesheets; Color mode | 86.26 % |
| 768 × 1024 | 48 px | one row, brand left, groups right | 94 % |
| 1280 × 800 | 48 px | one row, brand left, groups right | 94 % |

Button widths at every width: `Bootstrap` 86.23, `Tailwind, no layer` 139.61, `Tailwind + layer` 129.45, `Light` 52.95, `Dark` 51.23 px; height 31 px, no label wraps. The 768 reading is `header-768.json` beside this file (the unit's `medium.json`).

P4 (the unit's `tmp/units/flip-header/p4.ts`), run twice by the showcase session with `cmp` equal: zero box departures and zero remaining longhand departures in the chrome between faces at 390 and 1280; excluded longhands under each Tailwind face at 390: `tab-size` 16, zero-width border styles 78.

## The stopping failure and its correction

The unit's second run stopped on `compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover` at dark-1280: the dropdown menu read `data-popper-placement="top-start"` under the `tailwindcss` face and `bottom-start` under the other two.

Diagnosis (a probe logging the trigger's box after the act): under `bootstrap` and `unexcluded` the `Export` toggle sat at y ≈ 409 px (the click centered it, because the anchor landing left it partly outside the viewport); under `tailwindcss` it sat at y 761.5 px with its bottom at 799.5 px, inside the 800 px viewport by half a pixel, so the click scrolled nothing and the engine's `position-try-fallbacks` flipped the menu upward. The faces' specimen heights differ by fractions of a pixel, and the header's scroll padding moved the anchor landing across that edge for two faces. The engine behaves alike under every face; the case's input differed.

Correction (showcase session, `tests/app/browser/integration.test.ts`): before the act, the case centers the row's trigger (`context.buttons` or `context.tabs` by control name) with `scrollIntoView({ block: 'center' })` and settles the scroll. The single case passes at dark-1280 (57.6 s). The guide's paired engine states sentence names the centering and its reason.

## Gates read by the showcase session

| Command | Exit | Result |
| --- | ---: | --- |
| `npm run check` | 0 | passed |
| `npm run lint:check` | 0 | passed |
| `npm run format:check` | 0 | passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run test:guides` | 0 | 15 passed |
| P4 twice + `cmp` | 0 | equal, zero departures |
| `npm run test:journey` | 1 | 85 passed, 4 failed, 3 skipped, 480.37 s wall (Vitest); the 4 failures are § Host-bound set titles (J8 and the accordion motion=false table at light-390, the tooltip motion=true and collapse motion=false tables at dark-390); the paired engine states case passes in all four variants with 18 equality rows of 3 faces; the partition passes at both widths (its other three variants are the skips) |
| `npm run test:app:browser` | 0 | 236 passed |
| `npm run test:setup:browser` | 0 | 134 passed (re-run after a container restart cut the first run at 101) |
| `npm run build:showcase` | 0 | rebuilt to the same digest `db52837f…` as the unit's build |

The unit's own run recorded `test:app:browser` 236 passed and `test:setup:browser` 134 passed on the same tree before the correction, which touches only the journey file.

## Guide and copy

The showcase session applied the U7b strings: `guides/veneer.md` § Showcase gains a Header subsection (toolbar, brand, hidden status, the three measurements, the scroll reservation, the two cases), the Faces intro and table and the readings table carry the labels, the J1 and J2 prose carries the header readings and the labels, the matrix prose admits the sticky contents' two longhands, and the component tables run on the `Bootstrap` face. `units/flip-copy/copy.md` carries R12 in § 1, § 5, § 7.19, and the § 8 titles; the § 3.0 caption forms keep `Bootstrap only` as prose for the face.
