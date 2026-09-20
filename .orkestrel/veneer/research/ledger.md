# Bootstrap 5.3.8 compatibility ledger

Sources: `.orkestrel/veneer/research/inventory.json` (the CSS inventory generated from the
installed `bootstrap.css` and `bootstrap.rtl.css`, version `5.3.8`) and
`.orkestrel/veneer/research/obligations.md` (the merged JavaScript and documentation obligations,
sourced from `.orkestrel/veneer/units/u4a-obligations-report.md`, Grok session
`df7e1e1c-0b2f-47c1-b37b-d555a2985f95`, and `.orkestrel/veneer/units/u4a-docs-report.md`). Date
`2026-09-20`.

The ledger names units, never people. `U7 Button` is the first accepted scope; its rows carry
`accepted scope`. Every other row's status is `open`. A row is never both excluded and assigned.

## Units

| Unit | Owns |
| --- | --- |
| `U3 Tokens` | Every `root` variable, every `dark` retune, every per-component `--bs-{component}-*` custom property the inventory lists under a component's `properties`, the `color-mode()` and `data-bs-theme` island contract, the `theme` component key |
| `U7 Button` | The `btn` component's selectors and the Button plugin's obligations, plus the cross-cutting engine obligations that land with the first component: `BaseComponent`, `Config`, `EventHandler`, `Data`, `Manipulator`, `SelectorEngine`, and the `data-bs-*` kebab-case option mapping |
| `Content/layout` | `reboot` (tag-only rows only, see § Exclusions), `container`, `row`, `col`, `g`, `gx`, `gy`, `offset`, `table`, `figure`, `img`, `lead`, `display`, `blockquote`, `initialism`, `mark`, `small`, `h1`–`h6`, `list-unstyled`, `list-inline`, `link`, `icon-link`, `ratio`, `vr`, and the Reboot documentation rows |
| `Passive` | `btn-close`, `badge`, `breadcrumb`, `btn-group`, `btn-toolbar`, `card`, `list-group`, `pagination`, `placeholder`, `progress`, `spinner` |
| `Forms` | `form`, `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `was-validated`, `valid-feedback`, `invalid-feedback`, `valid-tooltip`, `invalid-tooltip`, `is-valid`, `is-invalid` |
| `Disclosure/navigation` | `collapse`, `collapsing`, `accordion`, `nav`, `navbar`, `dropdown`, `scrollspy`, and the Collapse, Dropdown, Tab, and ScrollSpy plugin obligations |
| `Overlays/feedback` | `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, `carousel`, `transition`, and the Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel plugin obligations, with the utilities `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory` |
| `Helpers/utilities` | Every remaining utility root: `visually-hidden`, `stretched-link`, `text-truncate`, `d`, `flex`, `justify-content`, `align-items`, `align-self`, `align-content`, `align`, `order`, `m`, `p`, `mt`, `mb`, `ms`, `me`, `mx`, `my`, `pt`, `pb`, `ps`, `pe`, `px`, `py`, `gap`, `column-gap`, `row-gap`, `w`, `h`, `mw`, `mh`, `vw`, `vh`, `min`, `text`, `fs`, `fw`, `lh`, `font`, `fst`, `bg`, `border`, `rounded`, `shadow`, `position`, `top`, `bottom`, `start`, `end`, `translate-middle`, `overflow`, `float`, `object-fit`, `opacity`, `z`, `user-select`, `focus-ring`, `sticky`, `fixed`, `clearfix` |
| `Cross-cutting` | The `media` conditions (breakpoints, `prefers-reduced-motion`, print), the RTL mechanism (each component's `rtl` differences stay on that component's row, with the note that `Cross-cutting` owns the mechanism), `keyframes` as a group, and the `DOMContentLoaded` and `data-bs-*` auto-initialization rows (the `./browser/auto` entry) |
| `Tailwind` | Nothing from the inventory; one row noting the profiles open after Button and Card |

The inventory carries four component keys the preceding table does not name: `hstack`, `vstack`,
`visible`, and `invisible`. Each resembles the sibling utility roots and is assigned to
`Helpers/utilities`, marked `decided by builder` in its row.

## CSS rows

One row per `components` key of `inventory.json`. `Selectors`, `Declarations`, and `Properties`
come from `inventory.json`'s `counts` object; `RTL rows` is the length of the component's `rtl`
list.

| Root | Selectors | Declarations | Custom properties | Keyframes | Media | RTL rows | Unit | Status | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `theme` | 15 | 0 | 0 | 0 | 0 | 0 | U3 Tokens | open | — |
| `btn` | 103 | 478 | 34 | 0 | 0 | 6 | U7 Button | accepted scope | — |
| `blockquote` | 4 | 8 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `col` | 87 | 173 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `container` | 34 | 97 | 2 | 0 | 0 | 0 | Content/layout | open | — |
| `display` | 12 | 24 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `figure` | 3 | 5 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `g` | 72 | 72 | 2 | 0 | 0 | 0 | Content/layout | open | — |
| `gx` | 36 | 36 | 1 | 0 | 0 | 0 | Content/layout | open | — |
| `gy` | 36 | 36 | 1 | 0 | 0 | 0 | Content/layout | open | — |
| `h1` | 3 | 7 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `h2` | 3 | 7 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `h3` | 3 | 7 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `h4` | 3 | 7 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `h5` | 2 | 6 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `h6` | 2 | 6 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `icon-link` | 5 | 16 | 0 | 0 | 0 | 2 | Content/layout | open | — |
| `img` | 2 | 8 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `initialism` | 1 | 2 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `lead` | 1 | 2 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `link` | 64 | 136 | 2 | 0 | 0 | 0 | Content/layout | open | — |
| `list-inline` | 3 | 4 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `list-unstyled` | 1 | 2 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `mark` | 1 | 3 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `offset` | 71 | 71 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `ratio` | 7 | 14 | 1 | 0 | 0 | 0 | Content/layout | open | — |
| `reboot` | 117 | 0 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `row` | 80 | 133 | 2 | 0 | 0 | 0 | Content/layout | open | — |
| `small` | 1 | 1 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `table` | 29 | 140 | 14 | 0 | 0 | 0 | Content/layout | open | — |
| `vr` | 1 | 6 | 0 | 0 | 0 | 0 | Content/layout | open | — |
| `badge` | 3 | 19 | 6 | 0 | 0 | 0 | Passive | open | — |
| `breadcrumb` | 4 | 22 | 8 | 0 | 0 | 2 | Passive | open | — |
| `btn-close` | 10 | 51 | 8 | 0 | 0 | 6 | Passive | open | — |
| `btn-group` | 39 | 66 | 4 | 0 | 0 | 0 | Passive | open | — |
| `btn-toolbar` | 2 | 4 | 0 | 0 | 0 | 0 | Passive | open | — |
| `card` | 41 | 108 | 19 | 0 | 0 | 0 | Passive | open | — |
| `list-group` | 67 | 216 | 17 | 0 | 0 | 0 | Passive | open | — |
| `pagination` | 14 | 71 | 20 | 0 | 0 | 0 | Passive | open | — |
| `placeholder` | 7 | 17 | 0 | 2 | 0 | 0 | Passive | open | — |
| `progress` | 9 | 44 | 8 | 1 | 0 | 1 | Passive | open | — |
| `spinner` | 8 | 36 | 6 | 2 | 0 | 0 | Passive | open | — |
| `form` | 195 | 512 | 5 | 0 | 0 | 37 | Forms | open | — |
| `form-check` | 41 | 85 | 3 | 0 | 0 | 13 | Forms | open | — |
| `form-control` | 79 | 208 | 0 | 0 | 0 | 12 | Forms | open | — |
| `form-floating` | 42 | 94 | 0 | 0 | 0 | 6 | Forms | open | — |
| `form-range` | 16 | 53 | 0 | 0 | 0 | 0 | Forms | open | — |
| `form-select` | 41 | 114 | 2 | 0 | 0 | 11 | Forms | open | — |
| `input-group` | 44 | 97 | 0 | 0 | 0 | 0 | Forms | open | — |
| `invalid-feedback` | 5 | 11 | 0 | 0 | 0 | 0 | Forms | open | — |
| `invalid-tooltip` | 4 | 16 | 0 | 0 | 0 | 0 | Forms | open | — |
| `is-invalid` | 17 | 31 | 1 | 0 | 0 | 4 | Forms | open | — |
| `is-valid` | 17 | 31 | 1 | 0 | 0 | 4 | Forms | open | — |
| `valid-feedback` | 5 | 11 | 0 | 0 | 0 | 0 | Forms | open | — |
| `valid-tooltip` | 4 | 16 | 0 | 0 | 0 | 0 | Forms | open | — |
| `was-validated` | 34 | 62 | 1 | 0 | 0 | 8 | Forms | open | — |
| `accordion` | 24 | 78 | 21 | 0 | 0 | 1 | Disclosure/navigation | open | — |
| `collapse` | 3 | 5 | 0 | 0 | 0 | 0 | Disclosure/navigation | open | — |
| `collapsing` | 4 | 8 | 0 | 0 | 0 | 0 | Disclosure/navigation | open | — |
| `dropdown` | 85 | 238 | 27 | 0 | 0 | 31 | Disclosure/navigation | open | — |
| `nav` | 42 | 109 | 19 | 0 | 0 | 0 | Disclosure/navigation | open | — |
| `navbar` | 88 | 275 | 26 | 0 | 0 | 0 | Disclosure/navigation | open | — |
| `alert` | 13 | 57 | 9 | 0 | 0 | 0 | Overlays/feedback | open | — |
| `carousel` | 41 | 147 | 3 | 0 | 0 | 7 | Overlays/feedback | open | — |
| `modal` | 56 | 167 | 24 | 0 | 0 | 2 | Overlays/feedback | open | — |
| `offcanvas` | 112 | 475 | 12 | 0 | 0 | 14 | Overlays/feedback | open | — |
| `popover` | 49 | 149 | 20 | 0 | 0 | 0 | Overlays/feedback | open | — |
| `toast` | 8 | 49 | 15 | 0 | 0 | 2 | Overlays/feedback | open | — |
| `tooltip` | 21 | 86 | 12 | 0 | 0 | 0 | Overlays/feedback | open | — |
| `transition` | 7 | 8 | 0 | 0 | 0 | 0 | Overlays/feedback | open | — |
| `align` | 108 | 108 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `align-content` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `align-items` | 30 | 30 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `align-self` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `bg` | 28 | 42 | 1 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `border` | 38 | 48 | 1 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `bottom` | 3 | 3 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `clearfix` | 1 | 3 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `column-gap` | 36 | 72 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `d` | 77 | 77 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `end` | 3 | 3 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `fixed` | 2 | 10 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `flex` | 72 | 72 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `float` | 18 | 18 | 0 | 0 | 0 | 12 | Helpers/utilities | open | — |
| `focus-ring` | 9 | 10 | 1 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `font` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `fs` | 10 | 10 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `fst` | 2 | 2 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `fw` | 7 | 7 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `gap` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `h` | 5 | 5 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `hstack` | 1 | 4 | 0 | 0 | 0 | 0 | Helpers/utilities | open | decided by builder: resembles the sibling utility roots |
| `invisible` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | decided by builder: resembles the sibling utility roots |
| `justify-content` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `lh` | 4 | 4 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `m` | 42 | 42 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `mb` | 42 | 42 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `me` | 42 | 42 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `mh` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `min` | 2 | 2 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `ms` | 42 | 42 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `mt` | 42 | 42 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `mw` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `mx` | 42 | 84 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `my` | 42 | 84 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `object-fit` | 30 | 60 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `opacity` | 5 | 5 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `order` | 48 | 48 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `overflow` | 12 | 12 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `p` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `pb` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `pe` | 38 | 38 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `position` | 5 | 6 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `ps` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `pt` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `px` | 36 | 72 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `py` | 36 | 72 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `rounded` | 45 | 81 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `row-gap` | 36 | 36 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `shadow` | 4 | 4 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `start` | 3 | 3 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `sticky` | 12 | 48 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `stretched-link` | 1 | 7 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `text` | 66 | 95 | 1 | 0 | 0 | 12 | Helpers/utilities | open | — |
| `text-truncate` | 1 | 3 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `top` | 3 | 3 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `translate-middle` | 3 | 3 | 0 | 0 | 0 | 2 | Helpers/utilities | open | — |
| `user-select` | 3 | 9 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `vh` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `visible` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | decided by builder: resembles the sibling utility roots |
| `visually-hidden` | 6 | 20 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `vstack` | 1 | 4 | 0 | 0 | 0 | 0 | Helpers/utilities | open | decided by builder: resembles the sibling utility roots |
| `vw` | 1 | 1 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `w` | 5 | 5 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |
| `z` | 5 | 5 | 0 | 0 | 0 | 0 | Helpers/utilities | open | — |

## Token rows

One row per `root` variable and one per `dark` retune, grouped by their `--bs-` prefix family.
Every token row is `U3 Tokens`, `open`.

### Root variables

| Variable | Scope | Unit | Status |
| --- | --- | --- | --- |
| **Color palette** | | | |
| `--bs-blue` | root | U3 Tokens | open |
| `--bs-indigo` | root | U3 Tokens | open |
| `--bs-purple` | root | U3 Tokens | open |
| `--bs-pink` | root | U3 Tokens | open |
| `--bs-red` | root | U3 Tokens | open |
| `--bs-orange` | root | U3 Tokens | open |
| `--bs-yellow` | root | U3 Tokens | open |
| `--bs-green` | root | U3 Tokens | open |
| `--bs-teal` | root | U3 Tokens | open |
| `--bs-cyan` | root | U3 Tokens | open |
| `--bs-black` | root | U3 Tokens | open |
| `--bs-white` | root | U3 Tokens | open |
| `--bs-gray` | root | U3 Tokens | open |
| `--bs-gray-dark` | root | U3 Tokens | open |
| `--bs-gray-100` | root | U3 Tokens | open |
| `--bs-gray-200` | root | U3 Tokens | open |
| `--bs-gray-300` | root | U3 Tokens | open |
| `--bs-gray-400` | root | U3 Tokens | open |
| `--bs-gray-500` | root | U3 Tokens | open |
| `--bs-gray-600` | root | U3 Tokens | open |
| `--bs-gray-700` | root | U3 Tokens | open |
| `--bs-gray-800` | root | U3 Tokens | open |
| `--bs-gray-900` | root | U3 Tokens | open |
| `--bs-white-rgb` | root | U3 Tokens | open |
| `--bs-black-rgb` | root | U3 Tokens | open |
| **Theme colors** | | | |
| `--bs-primary` | root | U3 Tokens | open |
| `--bs-secondary` | root | U3 Tokens | open |
| `--bs-success` | root | U3 Tokens | open |
| `--bs-info` | root | U3 Tokens | open |
| `--bs-warning` | root | U3 Tokens | open |
| `--bs-danger` | root | U3 Tokens | open |
| `--bs-light` | root | U3 Tokens | open |
| `--bs-dark` | root | U3 Tokens | open |
| **Theme color variants (rgb, text-emphasis, bg-subtle, border-subtle)** | | | |
| `--bs-primary-rgb` | root | U3 Tokens | open |
| `--bs-secondary-rgb` | root | U3 Tokens | open |
| `--bs-success-rgb` | root | U3 Tokens | open |
| `--bs-info-rgb` | root | U3 Tokens | open |
| `--bs-warning-rgb` | root | U3 Tokens | open |
| `--bs-danger-rgb` | root | U3 Tokens | open |
| `--bs-light-rgb` | root | U3 Tokens | open |
| `--bs-dark-rgb` | root | U3 Tokens | open |
| `--bs-primary-text-emphasis` | root | U3 Tokens | open |
| `--bs-secondary-text-emphasis` | root | U3 Tokens | open |
| `--bs-success-text-emphasis` | root | U3 Tokens | open |
| `--bs-info-text-emphasis` | root | U3 Tokens | open |
| `--bs-warning-text-emphasis` | root | U3 Tokens | open |
| `--bs-danger-text-emphasis` | root | U3 Tokens | open |
| `--bs-light-text-emphasis` | root | U3 Tokens | open |
| `--bs-dark-text-emphasis` | root | U3 Tokens | open |
| `--bs-primary-bg-subtle` | root | U3 Tokens | open |
| `--bs-secondary-bg-subtle` | root | U3 Tokens | open |
| `--bs-success-bg-subtle` | root | U3 Tokens | open |
| `--bs-info-bg-subtle` | root | U3 Tokens | open |
| `--bs-warning-bg-subtle` | root | U3 Tokens | open |
| `--bs-danger-bg-subtle` | root | U3 Tokens | open |
| `--bs-light-bg-subtle` | root | U3 Tokens | open |
| `--bs-dark-bg-subtle` | root | U3 Tokens | open |
| `--bs-primary-border-subtle` | root | U3 Tokens | open |
| `--bs-secondary-border-subtle` | root | U3 Tokens | open |
| `--bs-success-border-subtle` | root | U3 Tokens | open |
| `--bs-info-border-subtle` | root | U3 Tokens | open |
| `--bs-warning-border-subtle` | root | U3 Tokens | open |
| `--bs-danger-border-subtle` | root | U3 Tokens | open |
| `--bs-light-border-subtle` | root | U3 Tokens | open |
| `--bs-dark-border-subtle` | root | U3 Tokens | open |
| **Typography** | | | |
| `--bs-font-sans-serif` | root | U3 Tokens | open |
| `--bs-font-monospace` | root | U3 Tokens | open |
| `--bs-gradient` | root | U3 Tokens | open |
| **Body** | | | |
| `--bs-body-font-family` | root | U3 Tokens | open |
| `--bs-body-font-size` | root | U3 Tokens | open |
| `--bs-body-font-weight` | root | U3 Tokens | open |
| `--bs-body-line-height` | root | U3 Tokens | open |
| `--bs-body-color` | root | U3 Tokens | open |
| `--bs-body-color-rgb` | root | U3 Tokens | open |
| `--bs-body-bg` | root | U3 Tokens | open |
| `--bs-body-bg-rgb` | root | U3 Tokens | open |
| **Emphasis, secondary, and tertiary surfaces** | | | |
| `--bs-emphasis-color` | root | U3 Tokens | open |
| `--bs-emphasis-color-rgb` | root | U3 Tokens | open |
| `--bs-secondary-color` | root | U3 Tokens | open |
| `--bs-secondary-color-rgb` | root | U3 Tokens | open |
| `--bs-secondary-bg` | root | U3 Tokens | open |
| `--bs-secondary-bg-rgb` | root | U3 Tokens | open |
| `--bs-tertiary-color` | root | U3 Tokens | open |
| `--bs-tertiary-color-rgb` | root | U3 Tokens | open |
| `--bs-tertiary-bg` | root | U3 Tokens | open |
| `--bs-tertiary-bg-rgb` | root | U3 Tokens | open |
| **Heading, link, code, and highlight content** | | | |
| `--bs-heading-color` | root | U3 Tokens | open |
| `--bs-link-color` | root | U3 Tokens | open |
| `--bs-link-color-rgb` | root | U3 Tokens | open |
| `--bs-link-decoration` | root | U3 Tokens | open |
| `--bs-link-hover-color` | root | U3 Tokens | open |
| `--bs-link-hover-color-rgb` | root | U3 Tokens | open |
| `--bs-code-color` | root | U3 Tokens | open |
| `--bs-highlight-color` | root | U3 Tokens | open |
| `--bs-highlight-bg` | root | U3 Tokens | open |
| **Border** | | | |
| `--bs-border-width` | root | U3 Tokens | open |
| `--bs-border-style` | root | U3 Tokens | open |
| `--bs-border-color` | root | U3 Tokens | open |
| `--bs-border-color-translucent` | root | U3 Tokens | open |
| `--bs-border-radius` | root | U3 Tokens | open |
| `--bs-border-radius-sm` | root | U3 Tokens | open |
| `--bs-border-radius-lg` | root | U3 Tokens | open |
| `--bs-border-radius-xl` | root | U3 Tokens | open |
| `--bs-border-radius-xxl` | root | U3 Tokens | open |
| `--bs-border-radius-2xl` | root | U3 Tokens | open |
| `--bs-border-radius-pill` | root | U3 Tokens | open |
| **Shadow** | | | |
| `--bs-box-shadow` | root | U3 Tokens | open |
| `--bs-box-shadow-sm` | root | U3 Tokens | open |
| `--bs-box-shadow-lg` | root | U3 Tokens | open |
| `--bs-box-shadow-inset` | root | U3 Tokens | open |
| **Focus ring** | | | |
| `--bs-focus-ring-width` | root | U3 Tokens | open |
| `--bs-focus-ring-opacity` | root | U3 Tokens | open |
| `--bs-focus-ring-color` | root | U3 Tokens | open |
| **Form validation** | | | |
| `--bs-form-valid-color` | root | U3 Tokens | open |
| `--bs-form-valid-border-color` | root | U3 Tokens | open |
| `--bs-form-invalid-color` | root | U3 Tokens | open |
| `--bs-form-invalid-border-color` | root | U3 Tokens | open |
| **Breakpoints** | | | |
| `--bs-breakpoint-xs` | root | U3 Tokens | open |
| `--bs-breakpoint-sm` | root | U3 Tokens | open |
| `--bs-breakpoint-md` | root | U3 Tokens | open |
| `--bs-breakpoint-lg` | root | U3 Tokens | open |
| `--bs-breakpoint-xl` | root | U3 Tokens | open |
| `--bs-breakpoint-xxl` | root | U3 Tokens | open |
| **Per-component overrides** | | | |
| `--bs-btn-close-filter` | root | U3 Tokens | open |
| `--bs-carousel-indicator-active-bg` | root | U3 Tokens | open |
| `--bs-carousel-caption-color` | root | U3 Tokens | open |
| `--bs-carousel-control-icon-filter` | root | U3 Tokens | open |

### Dark retunes

| Variable | Scope | Unit | Status |
| --- | --- | --- | --- |
| **Theme color variants (rgb, text-emphasis, bg-subtle, border-subtle)** | | | |
| `--bs-primary-text-emphasis` | dark | U3 Tokens | open |
| `--bs-secondary-text-emphasis` | dark | U3 Tokens | open |
| `--bs-success-text-emphasis` | dark | U3 Tokens | open |
| `--bs-info-text-emphasis` | dark | U3 Tokens | open |
| `--bs-warning-text-emphasis` | dark | U3 Tokens | open |
| `--bs-danger-text-emphasis` | dark | U3 Tokens | open |
| `--bs-light-text-emphasis` | dark | U3 Tokens | open |
| `--bs-dark-text-emphasis` | dark | U3 Tokens | open |
| `--bs-primary-bg-subtle` | dark | U3 Tokens | open |
| `--bs-secondary-bg-subtle` | dark | U3 Tokens | open |
| `--bs-success-bg-subtle` | dark | U3 Tokens | open |
| `--bs-info-bg-subtle` | dark | U3 Tokens | open |
| `--bs-warning-bg-subtle` | dark | U3 Tokens | open |
| `--bs-danger-bg-subtle` | dark | U3 Tokens | open |
| `--bs-light-bg-subtle` | dark | U3 Tokens | open |
| `--bs-dark-bg-subtle` | dark | U3 Tokens | open |
| `--bs-primary-border-subtle` | dark | U3 Tokens | open |
| `--bs-secondary-border-subtle` | dark | U3 Tokens | open |
| `--bs-success-border-subtle` | dark | U3 Tokens | open |
| `--bs-info-border-subtle` | dark | U3 Tokens | open |
| `--bs-warning-border-subtle` | dark | U3 Tokens | open |
| `--bs-danger-border-subtle` | dark | U3 Tokens | open |
| `--bs-light-border-subtle` | dark | U3 Tokens | open |
| `--bs-dark-border-subtle` | dark | U3 Tokens | open |
| **Body** | | | |
| `--bs-body-color` | dark | U3 Tokens | open |
| `--bs-body-color-rgb` | dark | U3 Tokens | open |
| `--bs-body-bg` | dark | U3 Tokens | open |
| `--bs-body-bg-rgb` | dark | U3 Tokens | open |
| **Emphasis, secondary, and tertiary surfaces** | | | |
| `--bs-emphasis-color` | dark | U3 Tokens | open |
| `--bs-emphasis-color-rgb` | dark | U3 Tokens | open |
| `--bs-secondary-color` | dark | U3 Tokens | open |
| `--bs-secondary-color-rgb` | dark | U3 Tokens | open |
| `--bs-secondary-bg` | dark | U3 Tokens | open |
| `--bs-secondary-bg-rgb` | dark | U3 Tokens | open |
| `--bs-tertiary-color` | dark | U3 Tokens | open |
| `--bs-tertiary-color-rgb` | dark | U3 Tokens | open |
| `--bs-tertiary-bg` | dark | U3 Tokens | open |
| `--bs-tertiary-bg-rgb` | dark | U3 Tokens | open |
| **Heading, link, code, and highlight content** | | | |
| `--bs-heading-color` | dark | U3 Tokens | open |
| `--bs-link-color` | dark | U3 Tokens | open |
| `--bs-link-hover-color` | dark | U3 Tokens | open |
| `--bs-link-color-rgb` | dark | U3 Tokens | open |
| `--bs-link-hover-color-rgb` | dark | U3 Tokens | open |
| `--bs-code-color` | dark | U3 Tokens | open |
| `--bs-highlight-color` | dark | U3 Tokens | open |
| `--bs-highlight-bg` | dark | U3 Tokens | open |
| **Border** | | | |
| `--bs-border-color` | dark | U3 Tokens | open |
| `--bs-border-color-translucent` | dark | U3 Tokens | open |
| **Form validation** | | | |
| `--bs-form-valid-color` | dark | U3 Tokens | open |
| `--bs-form-valid-border-color` | dark | U3 Tokens | open |
| `--bs-form-invalid-color` | dark | U3 Tokens | open |
| `--bs-form-invalid-border-color` | dark | U3 Tokens | open |
| `--bs-form-select-bg-img` | dark | U3 Tokens | open |
| `--bs-form-switch-bg` | dark | U3 Tokens | open |
| **Per-component overrides** | | | |
| `--bs-navbar-toggler-icon-bg` | dark | U3 Tokens | open |
| `--bs-accordion-btn-icon` | dark | U3 Tokens | open |
| `--bs-accordion-btn-active-icon` | dark | U3 Tokens | open |
| `--bs-btn-close-filter` | dark | U3 Tokens | open |
| `--bs-carousel-indicator-active-bg` | dark | U3 Tokens | open |
| `--bs-carousel-caption-color` | dark | U3 Tokens | open |
| `--bs-carousel-control-icon-filter` | dark | U3 Tokens | open |

## Obligation rows

One row per obligation in `obligations.md`.

| Component | Obligation | Kind | Unit | Status | Note |
| --- | --- | --- | --- | --- | --- |
| Cross-cutting engine | `VERSION` `'5.3.8'`; `DATA_KEY` `` `bs.${NAME}` ``; `EVENT_KEY` `` `.${DATA_KEY}` ``; `eventName(name)` returns `` `${name}${EVENT_KEY}` `` | identity | U7 Button | accepted scope | — |
| Cross-cutting engine | `Default`/`DefaultType` inherited empty from `Config` unless a component overrides | option | U7 Button | accepted scope | — |
| Cross-cutting engine | `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last | attribute | U7 Button | accepted scope | — |
| Cross-cutting engine | `constructor(element, config)` no-op when `getElement(element)` is falsy; `dispose()`; `_queueCallback` through `executeAfterTransition` | method | U7 Button | accepted scope | — |
| Cross-cutting engine | static `getInstance`, static `getOrCreateInstance(element, config = {})`, static `VERSION` | method | U7 Button | accepted scope | — |
| Cross-cutting engine | `Data.set(this._element, DATA_KEY, this)` on construction | initialization | U7 Button | accepted scope | — |
| Cross-cutting engine | All API methods are asynchronous, return to the caller before the transition ends, and a method call mid-transition is ignored | method | U7 Button | accepted scope | — |
| Cross-cutting engine | `dispose()` must not follow `hide()` immediately; wait for the completion event | method | U7 Button | accepted scope | — |
| Cross-cutting engine | Every plugin fires paired infinitive/past-participle events (`show`/`shown`, `hide`/`hidden`); `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` and hydrates the payload | event | U7 Button | accepted scope | — |
| Cross-cutting engine | Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels | event | U7 Button | accepted scope | — |
| Cross-cutting engine | `Config._mergeConfigObj`: `Default`, then `data-bs-config` JSON, then `getDataAttributes`, then the `config` object; `_typeCheckConfig` type-checks against `DefaultType` | option | U7 Button | accepted scope | — |
| Cross-cutting engine | `Manipulator.getDataAttributes` reads every `dataset` key starting `bs` except `bsConfig`, kebab-cased through `data-bs-*` | attribute | U7 Button | accepted scope | — |
| Cross-cutting engine | `SelectorEngine.getSelector` reads `data-bs-target` else `href`; `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getElementFromSelector`, `getMultipleElementsFromSelector` | method | U7 Button | accepted scope | — |
| Cross-cutting engine | `Data.set`/`get`/`remove`; one instance per element, a second key logs an error and returns | method | U7 Button | accepted scope | — |
| Cross-cutting engine | `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]` | attribute | U7 Button | accepted scope | — |
| Cross-cutting engine | `TRANSITION_END` emulation: listens `transitionend`, emulates after `getTransitionDurationFromElement` plus `5` ms padding through `executeAfterTransition` | transition | U7 Button | accepted scope | — |
| Cross-cutting engine | `onDOMContentLoaded` gates `defineJQueryPlugin`; skipped when `document.body` carries `data-bs-no-jquery` | initialization | Cross-cutting | open | decided by builder: DOMContentLoaded gating is the auto-initialization mechanism, not a component-specific obligation |
| Cross-cutting engine | Sanitizer allowlist and `sanitizeFn` override on Tooltip/Popover content | accessibility | U7 Button | accepted scope | — |
| Cross-cutting engine | Native `querySelector`/`querySelectorAll`; a CSS special character in a selector must be escaped | attribute | U7 Button | accepted scope | — |
| Alert | `NAME` `'alert'`; `DATA_KEY` `'bs.alert'`; `EVENT_KEY` `.bs.alert`; no component `Default`/`DefaultType` | identity | Overlays/feedback | open | — |
| Alert | `data-bs-dismiss="alert"` document click → `close()`; target via `data-bs-target`/`href` or closest `.alert` | attribute | Overlays/feedback | open | — |
| Alert | `close()`; no-op if `close.bs.alert` prevented | method | Overlays/feedback | open | — |
| Alert | `close.bs.alert` cancelable; then `closed.bs.alert` (not checked) | event | Overlays/feedback | open | — |
| Alert | Disabled dismiss trigger returns; `<a>`/`<area>` dismiss triggers `preventDefault` | dismissal | Overlays/feedback | open | — |
| Alert | remove `show`; animated iff `fade`; wait transition; then remove the node from the DOM | transition | Overlays/feedback | open | — |
| Alert | `enableDismissTrigger(Alert, 'close')`; `defineJQueryPlugin(Alert)`; no load auto-init | initialization | Overlays/feedback | open | — |
| Alert | Focus is lost on dismissal; recommend listening for `closed.bs.alert`, calling `.focus()`, and adding `tabindex="-1"` when the focus target is non-interactive | accessibility | Overlays/feedback | open | — |
| Alert | `--bs-alert-bg`, `--bs-alert-padding-x`, `--bs-alert-padding-y`, `--bs-alert-margin-bottom`, `--bs-alert-color`, `--bs-alert-border-color`, `--bs-alert-border`, `--bs-alert-border-radius`, `--bs-alert-link-color` | variable | Overlays/feedback | open | — |
| Button | `NAME` `'button'`; `DATA_KEY` `'bs.button'`; `EVENT_KEY` `.bs.button`; no `Default`/`DefaultType` | identity | U7 Button | accepted scope | — |
| Button | `[data-bs-toggle="button"]` document `click.bs.button.data-api`, `preventDefault`, `getOrCreateInstance` then `toggle()` | attribute | U7 Button | accepted scope | — |
| Button | `toggle()` flips class `active` and `aria-pressed`; no no-op guard | method | U7 Button | accepted scope | — |
| Button | static `jQueryInterface` runs only when `config === 'toggle'` | method | U7 Button | accepted scope | — |
| Button | `defineJQueryPlugin(Button)` | initialization | U7 Button | accepted scope | — |
| Button | Screen readers announce a toggle button as `button`/`button pressed`, not as a checkbox | accessibility | U7 Button | accepted scope | — |
| Button | Disabled `<a>` needs `.disabled`, `aria-disabled="true"`, and `tabindex="-1"`; `role="button"` required on `<a>` used as a button | accessibility | U7 Button | accepted scope | — |
| Button | `--bs-btn-*` variable set (padding, font, color, background, border, box-shadow, disabled and active states) | variable | U7 Button | accepted scope | — |
| Carousel | `NAME` `'carousel'`; `DATA_KEY` `'bs.carousel'`; `EVENT_KEY` `.bs.carousel` | identity | Overlays/feedback | open | — |
| Carousel | `interval` `5000` `(number\|boolean)`; `keyboard` `true` boolean; `pause` `'hover'` `(string\|boolean)`; `ride` `false` `(boolean\|string)`; `touch` `true` boolean; `wrap` `true` boolean | option | Overlays/feedback | open | — |
| Carousel | `[data-bs-slide], [data-bs-slide-to]` click; `data-bs-slide-to` → `to`; `data-bs-slide="next"` → `next` else `prev`; `[data-bs-ride="carousel"]` window load `getOrCreateInstance`; `data-bs-interval` on an item overrides the interval | attribute | Overlays/feedback | open | — |
| Carousel | `next`/`prev`/`to`/`cycle`/`pause`/`nextWhenVisible`; `_slide` no-op while `_isSliding` or same index | method | Overlays/feedback | open | — |
| Carousel | `slide.bs.carousel` cancelable, payload `{ relatedTarget, direction, from, to }`; then `slid.bs.carousel` (not checked), same payload | event | Overlays/feedback | open | — |
| Carousel | `ArrowLeft`/`ArrowRight` if `keyboard`, ignored in `input`/`textarea`, `preventDefault` then `_slide` | keyboard | Overlays/feedback | open | — |
| Carousel | `pause: 'hover'` pauses on `mouseenter`, resumes on `mouseleave`; touch end pauses then restarts after `500 + interval` ms | dismissal | Overlays/feedback | open | — |
| Carousel | Class `slide` animates; order next/prev classes then start/end classes; complete swaps `active` | transition | Overlays/feedback | open | — |
| Carousel | Constructs `Swipe` when `touch && Swipe.isSupported()` | initialization | Overlays/feedback | open | — |
| Carousel | `constructor(element, config)`; click data-api; load ride init; `defineJQueryPlugin(Carousel)` | initialization | Overlays/feedback | open | — |
| Carousel | Autoplaying carousels must supply a pause/stop control (WCAG 2.2 SC 2.2.2); animation gated on `prefers-reduced-motion`; touch swipe enabled by default; manual initialization required unless `data-bs-ride="carousel"` | accessibility | Overlays/feedback | open | — |
| Carousel | `.carousel-dark` deprecated in v5.3.0 for `data-bs-theme="dark"` | variable | Overlays/feedback | open | — |
| Collapse | `NAME` `'collapse'`; `DATA_KEY` `'bs.collapse'`; `EVENT_KEY` `.bs.collapse` | identity | Disclosure/navigation | open | — |
| Collapse | `parent` `null` `(null\|element)`; `toggle` `true` boolean | option | Disclosure/navigation | open | — |
| Collapse | `[data-bs-toggle="collapse"]` click → `getOrCreateInstance(..., { toggle: false }).toggle()`; target through `getMultipleElementsFromSelector` (`data-bs-target`/`href`); `A` gets `preventDefault` | attribute | Disclosure/navigation | open | — |
| Collapse | `constructor` calls `toggle()` when `config.toggle`; `toggle()` shows or hides by `_isShown()`; `show`/`hide` no-op if `_isTransitioning` or already shown/hidden | method | Disclosure/navigation | open | — |
| Collapse | `show.bs.collapse`/`hide.bs.collapse` cancelable; then `shown.bs.collapse`/`hidden.bs.collapse` | event | Disclosure/navigation | open | — |
| Collapse | Accordion: `parent` hides sibling first-level `.collapse.show, .collapse.collapsing` first | dismissal | Disclosure/navigation | open | — |
| Collapse | Show: remove `collapse`, add `collapsing`, set `style[dimension]=0`, then complete swaps to `collapse`+`show`. Hide: size from `getBoundingClientRect`, add `collapsing`, remove `collapse`+`show`, then complete restores `collapse`. Horizontal variant (`collapse-horizontal`) uses `width`; toggles trigger `collapsed` + `aria-expanded` | transition | Disclosure/navigation | open | — |
| Collapse | `constructor`; click data-api; `defineJQueryPlugin(Collapse)` | initialization | Disclosure/navigation | open | — |
| Collapse | `aria-expanded` and `aria-controls` required on the control; `role="button"` required on a non-button control; animation gated on `prefers-reduced-motion` | accessibility | Disclosure/navigation | open | — |
| Collapse | The plugin does not cover the ARIA Authoring Practices Guide accordion keyboard pattern; custom JavaScript is required for it | keyboard | Disclosure/navigation | open | — |
| Dropdown | `NAME` `'dropdown'`; `DATA_KEY` `'bs.dropdown'`; `EVENT_KEY` `.bs.dropdown` | identity | Disclosure/navigation | open | — |
| Dropdown | `autoClose` `true` `(boolean\|string)`; `boundary` `'clippingParents'` `(string\|element)`; `display` `'dynamic'` string; `offset` `[0, 2]` `(array\|string\|function)`; `popperConfig` `null` `(null\|object\|function)`; `reference` `'toggle'` `(string\|element\|object)` | option | Disclosure/navigation | open | — |
| Dropdown | `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)` click toggle; document `click`/`keyup` call `clearMenus`; document `keydown` on toggle and `.dropdown-menu`; `data-bs-popper="static"` written on the menu for navbar or `display === 'static'` | attribute | Disclosure/navigation | open | — |
| Dropdown | `toggle`/`show`/`hide` no-op if disabled or already shown/hidden; `dispose` destroys popper; `update()`; static `clearMenus`; static `dataApiKeydownHandler` | method | Disclosure/navigation | open | — |
| Dropdown | `show.bs.dropdown`/`hide.bs.dropdown` cancelable, payload `{ relatedTarget }`; then `shown.bs.dropdown`/`hidden.bs.dropdown`, same payload; `clearMenus` may add `clickEvent` | event | Disclosure/navigation | open | — |
| Dropdown | `ArrowUp`/`ArrowDown` show and focus item; `Escape` hides and focuses the toggle; `Tab` keyup may close unless inside the menu; ignored in `input`/`textarea` except `Escape`; right mouse button ignored | keyboard | Disclosure/navigation | open | — |
| Dropdown | Click-outside via `clearMenus`; `autoClose` `true`/`'inside'`/`'outside'`/`false`; click on the toggle itself skipped | dismissal | Disclosure/navigation | open | — |
| Dropdown | Immediate `show` class on menu and toggle, no CSS transition queue | transition | Disclosure/navigation | open | — |
| Dropdown | `constructor`; document click/keydown/keyup data-api; `defineJQueryPlugin(Dropdown)`; Popper required at `show`/`_createPopper` | initialization | Disclosure/navigation | open | — |
| Dropdown | Toggles on click, not hover, by design; requires Popper (bundled in `bootstrap.bundle.min.js`); touch devices get empty `mouseover` handlers on immediate children of `<body>` for an iOS event-delegation quirk | accessibility | Disclosure/navigation | open | — |
| Dropdown | `--bs-dropdown-*` variable set (added v5.2.0); `.dropdown-menu-dark` deprecated v5.3.0 for `data-bs-theme="dark"` | variable | Disclosure/navigation | open | — |
| Modal | `NAME` `'modal'`; `DATA_KEY` `'bs.modal'`; `EVENT_KEY` `.bs.modal` | identity | Overlays/feedback | open | — |
| Modal | `backdrop` `true` `(boolean\|string)`; `focus` `true` boolean; `keyboard` `true` boolean | option | Overlays/feedback | open | — |
| Modal | `[data-bs-toggle="modal"]` click `toggle`; `[data-bs-dismiss="modal"]` through `enableDismissTrigger(Modal)` → `hide`; target via `data-bs-target`/`href`; `data-bs-whatever` custom data surfaces on `event.relatedTarget` | attribute | Overlays/feedback | open | — |
| Modal | `toggle(relatedTarget)`; `show`/`hide` no-op on `_isShown`/`_isTransitioning` mismatch; `dispose()`; `handleUpdate()` | method | Overlays/feedback | open | — |
| Modal | `show.bs.modal` cancelable, `{ relatedTarget }`; `shown.bs.modal` same payload; `hide.bs.modal` cancelable; `hidden.bs.modal`; `hidePrevented.bs.modal` cancelable | event | Overlays/feedback | open | — |
| Modal | `Escape` hides if `keyboard`, else `_triggerBackdropTransition` | keyboard | Overlays/feedback | open | — |
| Modal | Backdrop click: `'static'` triggers backdrop transition, else `hide()`; `focus: true` activates `FocusTrap` after shown; body gets `modal-open`; opening one hides an already-open `.modal.show`; only one modal at a time, nested modals unsupported | dismissal | Overlays/feedback | open | — |
| Modal | Animated iff `fade`; show adds `show` after `reflow`; hide removes `show`; static backdrop adds `modal-static` then removes it | transition | Overlays/feedback | open | — |
| Modal | Constructs `Backdrop`, `FocusTrap` (`trapElement: this._element`), `ScrollBarHelper` | initialization | Overlays/feedback | open | — |
| Modal | `constructor`; click `[data-bs-toggle="modal"]` `toggle(this)`; `enableDismissTrigger(Modal)`; `defineJQueryPlugin(Modal)` | initialization | Overlays/feedback | open | — |
| Modal | `autofocus` has no effect inside a modal; focus must be set manually on `shown.bs.modal`; `aria-labelledby` required, `aria-describedby` optional | accessibility | Overlays/feedback | open | — |
| Modal | `--bs-modal-*`, `--bs-backdrop-*` variable sets | variable | Overlays/feedback | open | — |
| Offcanvas | `NAME` `'offcanvas'`; `DATA_KEY` `'bs.offcanvas'`; `EVENT_KEY` `.bs.offcanvas` | identity | Overlays/feedback | open | — |
| Offcanvas | `backdrop` `true` `(boolean\|string)`; `keyboard` `true` boolean; `scroll` `false` boolean | option | Overlays/feedback | open | — |
| Offcanvas | `[data-bs-toggle="offcanvas"]` click; window `load.bs.offcanvas.data-api` on `.offcanvas.show`; resize hides non-`fixed` `[aria-modal][class*=show][class*=offcanvas-]`; `enableDismissTrigger(Offcanvas)` on `[data-bs-dismiss="offcanvas"]` | attribute | Overlays/feedback | open | — |
| Offcanvas | `toggle(relatedTarget)`; `show`/`hide` no-op if already shown/hidden; `dispose()` | method | Overlays/feedback | open | — |
| Offcanvas | `show.bs.offcanvas`/`hide.bs.offcanvas` cancelable, `{ relatedTarget }`; then `shown.bs.offcanvas`/`hidden.bs.offcanvas`; `hidePrevented.bs.offcanvas` does not check `defaultPrevented` | event | Overlays/feedback | open | — |
| Offcanvas | `Escape` hides if `keyboard`, else triggers `hidePrevented`; `FocusTrap` handles `Tab` | keyboard | Overlays/feedback | open | — |
| Offcanvas | Backdrop clickCallback: `'static'` triggers `hidePrevented`, else `hide()`; `scroll: false` hides the scrollbar and activates `FocusTrap`; another open offcanvas is hidden first | dismissal | Overlays/feedback | open | — |
| Offcanvas | Show: add `showing`, complete swaps to `show`. Hide: add `hiding`, complete removes `show`+`hiding` | transition | Overlays/feedback | open | — |
| Offcanvas | Backdrop `className: 'offcanvas-backdrop'`, `isAnimated: true`; `FocusTrap`; `new ScrollBarHelper()` when `!scroll` | initialization | Overlays/feedback | open | — |
| Offcanvas | `constructor`; click toggle; load `.show`; `enableDismissTrigger(Offcanvas)`; `defineJQueryPlugin(Offcanvas)`; disabled trigger returns | initialization | Overlays/feedback | open | — |
| Offcanvas | `aria-labelledby` required; `role="dialog"` added by JavaScript; `margin`/`translate` must not be applied to the `.offcanvas` element | accessibility | Overlays/feedback | open | — |
| Offcanvas | `--bs-offcanvas-*` variable set (added v5.2.0); dark variant deprecated v5.3.0 | variable | Overlays/feedback | open | — |
| Popover | `NAME` `'popover'`; `DATA_KEY`/`EVENT_KEY` → `bs.popover`/`.bs.popover` | identity | Overlays/feedback | open | — |
| Popover | Tooltip options plus `content` `''` `(null\|string\|element\|function)`; `offset` `[0, 8]`; `placement` `'right'`; `trigger` `'click'`; popover template | option | Overlays/feedback | open | — |
| Popover | Same data-attribute pipeline as Tooltip; no `data-bs-toggle` document listener; template fills `.popover-header`/`.popover-body` | attribute | Overlays/feedback | open | — |
| Popover | Inherits Tooltip's public methods; `_isWithContent` checks title or content; `_getContent` | method | Overlays/feedback | open | — |
| Popover | Same namespaced events as Tooltip under `.bs.popover`, same cancelability | event | Overlays/feedback | open | — |
| Popover | Default click trigger; otherwise Tooltip's dismissal rules | dismissal | Overlays/feedback | open | — |
| Popover | `defineJQueryPlugin(Popover)` only; no data-api auto-init | initialization | Overlays/feedback | open | — |
| Popover | Only naturally focusable/interactive elements; `hover` alone must not be the sole trigger; no keyboard focus-order management | accessibility | Overlays/feedback | open | — |
| Popover | `--bs-popover-*` variable set | variable | Overlays/feedback | open | — |
| ScrollSpy | `NAME` `'scrollspy'`; `DATA_KEY` `'bs.scrollspy'`; `EVENT_KEY` `.bs.scrollspy` | identity | Disclosure/navigation | open | — |
| ScrollSpy | `offset` `null` `(number\|null)`; `rootMargin` `'0px 0px -25%'` string; `smoothScroll` `false` boolean; `target` `null` `element`; `threshold` `[0.1, 0.5, 1]` array | option | Disclosure/navigation | open | — |
| ScrollSpy | `[data-bs-spy="scroll"]` window load `getOrCreateInstance`; smooth-scroll listens clicks on `[href]` inside `config.target` | attribute | Disclosure/navigation | open | — |
| ScrollSpy | `constructor` calls `refresh()`; `refresh()`; `dispose()` disconnects the observer | method | Disclosure/navigation | open | — |
| ScrollSpy | `activate.bs.scrollspy`, `{ relatedTarget: target }`, not checked for `defaultPrevented` | event | Disclosure/navigation | open | — |
| ScrollSpy | `constructor`+`refresh`; load spy init; `defineJQueryPlugin(ScrollSpy)`; `target` defaults to `document.body`; `offset` rewrites `rootMargin`; string `threshold` splits to floats | initialization | Disclosure/navigation | open | — |
| ScrollSpy | `tabindex="0"` required on the scroll container for keyboard access | keyboard | Disclosure/navigation | open | — |
| Tab | `NAME` `'tab'`; `DATA_KEY` `'bs.tab'`; `EVENT_KEY` `.bs.tab`; no `Default`/`DefaultType` | identity | Disclosure/navigation | open | — |
| Tab | `[data-bs-toggle="tab"\|"pill"\|"list"]` click `show()`; load initializes `.active` toggles; panel via `data-bs-target`/`href` | attribute | Disclosure/navigation | open | — |
| Tab | `constructor(element)` takes no config; returns early with no `.list-group, .nav, [role="tablist"]` parent; `show()` no-op if already active or `show`/`hide` prevented | method | Disclosure/navigation | open | — |
| Tab | On the active sibling: `hide.bs.tab`, `{ relatedTarget: innerElem }` (checked); on the shown tab: `show.bs.tab`, `{ relatedTarget: active }` (checked); then `hidden.bs.tab`/`shown.bs.tab`, same payload; not fired when `role !== 'tab'` | event | Disclosure/navigation | open | — |
| Tab | `ArrowLeft`/`ArrowUp` previous, `ArrowRight`/`ArrowDown` next, `Home` first, `End` last; `stopPropagation`+`preventDefault`; skips disabled; cycles; then focus + `show()` | keyboard | Disclosure/navigation | open | — |
| Tab | Dropdown tabs toggle `active` on `.dropdown-toggle`, `show` on `.dropdown-menu`, `aria-expanded` | dismissal | Disclosure/navigation | open | — |
| Tab | Activate adds `active`; role-tab path adds aria/tabindex/dropdown state then fires `shown`; deactivate removes `active`+`blur`, role-tab path fires `hidden` | transition | Disclosure/navigation | open | — |
| Tab | Click: disabled return, `getOrCreateInstance(this).show()`; load initializes already-active toggles; `defineJQueryPlugin(Tab)`; `A`/`AREA` get `preventDefault` | initialization | Disclosure/navigation | open | — |
| Tab | `role="tablist"`/`"tab"`/`"tabpanel"`; `aria-selected`, `aria-controls`, `aria-labelledby`; roving `tabindex`; `role="tablist"` must not sit on `<nav>` | accessibility | Disclosure/navigation | open | — |
| Tab | `--bs-nav-link-*`, `--bs-nav-tabs-*`, `--bs-nav-pills-*`, `--bs-nav-underline-*` (v5.3.0+) variable sets | variable | Disclosure/navigation | open | — |
| Toast | `NAME` `'toast'`; `DATA_KEY` `'bs.toast'`; `EVENT_KEY` `.bs.toast`; `Default` `{ animation: true, autohide: true, delay: 5000 }`; `DefaultType` `{ animation: 'boolean', autohide: 'boolean', delay: 'number' }` | option | Overlays/feedback | open | — |
| Toast | `enableDismissTrigger(Toast)` binds `[data-bs-dismiss="toast"]` → `hide` | attribute | Overlays/feedback | open | — |
| Toast | `show()` no-op if `show` prevented; `hide()` no-op if not shown or `hide` prevented; `dispose()`; `isShown()` | method | Overlays/feedback | open | — |
| Toast | `show.bs.toast` (checked) then `shown.bs.toast`; `hide.bs.toast` (checked) then `hidden.bs.toast` | event | Overlays/feedback | open | — |
| Toast | `autohide: true` schedules `hide` after `delay` unless mouse or keyboard interaction; interaction clears the timeout, leaving reschedules unless `relatedTarget` is inside | dismissal | Overlays/feedback | open | — |
| Toast | Show: optional add `fade`, `reflow`, add `show`+`showing`, complete removes `showing`. Hide: add `showing`, complete adds `hide` and removes `showing`+`show` | transition | Overlays/feedback | open | — |
| Toast | `constructor`; `enableDismissTrigger(Toast)`; `defineJQueryPlugin(Toast)`; no load/click toggle auto-init | initialization | Overlays/feedback | open | — |
| Toast | Wrapped in an `aria-live` region present before generation; `aria-atomic="true"`; `role="alert" aria-live="assertive"` for important content, `role="status" aria-live="polite"` otherwise; toasts never receive focus, avoid focusable controls under autohide | accessibility | Overlays/feedback | open | — |
| Toast | `--bs-toast-*` variable set | variable | Overlays/feedback | open | — |
| Tooltip | `NAME` `'tooltip'`; `DATA_KEY`/`EVENT_KEY` → `bs.tooltip`/`.bs.tooltip` | identity | Overlays/feedback | open | — |
| Tooltip | `Default`/`DefaultType`: `allowList`, `animation` `true`, `boundary` `'clippingParents'`, `container` `false`, `customClass` `''`, `delay` `0`, `fallbackPlacements` `['top','right','bottom','left']`, `html` `false`, `offset` `[0, 6]`, `placement` `'top'`, `popperConfig` `null`, `sanitize` `true`, `sanitizeFn` `null`, `selector` `false`, `template`, `title` `''`, `trigger` `'hover focus'` | option | Overlays/feedback | open | — |
| Tooltip | `_getConfig` reads `data-bs-*` then deletes `sanitize`/`allowList`/`sanitizeFn`; `title` copies to `data-bs-original-title` and is removed, restored on dispose; hides on closest `.modal` `hide.bs.modal` | attribute | Overlays/feedback | open | — |
| Tooltip | `constructor` throws without Popper; `enable`/`disable`/`toggleEnabled`; `toggle()` no-op if disabled; `show()` throws if `display: none`, no-op without content/enabled; `hide()` no-op if not shown or prevented; `update()`; `setContent` | method | Overlays/feedback | open | — |
| Tooltip | `show.bs.tooltip` (checked) → optional `inserted.bs.tooltip` (not checked) → `shown.bs.tooltip` (not checked); `hide.bs.tooltip` (checked) → `hidden.bs.tooltip` | event | Overlays/feedback | open | — |
| Tooltip | No Escape/arrow/Tab/Space handling; focus trigger through `focusin`/`focusout` | keyboard | Overlays/feedback | open | — |
| Tooltip | `trigger` tokens `hover`/`focus`/`click`/`manual`; hover/focus use `delay.show`/`delay.hide`; modal hide forces `hide()`; no click-outside closer, Escape, backdrop, or autohide timer | dismissal | Overlays/feedback | open | — |
| Tooltip | Animated iff `animation` or the tip carries `fade`; create/show/hide toggle `fade`/`show` on the tip | transition | Overlays/feedback | open | — |
| Tooltip | `constructor` only; no document/window data-api auto-init; `defineJQueryPlugin(Tooltip)`; `selector` delegates then creates a child instance with `trigger: 'manual'` | initialization | Overlays/feedback | open | — |
| Tooltip | Only naturally focusable/interactive elements; `hover` alone must not be the sole trigger; disabled elements need a focusable wrapper (`tabindex="0"`); animation gated on `prefers-reduced-motion` | accessibility | Overlays/feedback | open | — |
| Tooltip | `--bs-tooltip-*` variable set | variable | Overlays/feedback | open | — |
| Color modes | `data-bs-theme` on `<html>` applies globally; on a component or element it scopes to that subtree and overrides the inherited global value | attribute | U3 Tokens | open | — |
| Color modes | `light` (default) and `dark` built-in modes; a custom mode value such as `data-bs-theme="blue"` is possible | option | U3 Tokens | open | — |
| Color modes | `color-mode($mode: light, $root: false)` mixin: wraps content in `@media (prefers-color-scheme: $mode)` when `$color-mode-type == "media-query"`, nested in `:root` when `$root: true`; otherwise emits `[data-bs-theme="#{$mode}"] { @content; }` | variable | U3 Tokens | open | — |
| Color modes | Documented `localStorage`-backed JavaScript toggler: reads/writes `theme`, resolves `'auto'` through `matchMedia('(prefers-color-scheme: dark)')`, sets `data-bs-theme` on `document.documentElement`, re-resolves on `change` when no explicit stored theme is set; toggle buttons carry `data-bs-theme-value` and receive `.active`+`aria-pressed` | method | U3 Tokens | open | — |
| Color modes | Dark-mode `--bs-*` override list: `--bs-body-color`, `--bs-body-bg`, `--bs-emphasis-color`, `--bs-secondary-*`, `--bs-tertiary-*`, per-color `text-emphasis`/`bg-subtle`/`border-subtle`, `--bs-heading-color`, `--bs-link-*`, `--bs-code-color`, `--bs-highlight-*`, `--bs-border-*`, `--bs-form-valid/invalid-*` | variable | U3 Tokens | open | — |
| Reboot | `box-sizing: border-box` globally; `<body>` sets `font-size: 1rem`, inherited `font-family`/`font-weight`/`line-height`/`color`, `background-color: #fff` | option | Content/layout | open | — |
| Reboot | `<h1>`–`<h6>` remove `margin-top`, set `margin-bottom: .5rem`, tighten `line-height`, color overridable through `--bs-heading-color`; `<p>` removes `margin-top`, sets `margin-bottom: 1rem` | option | Content/layout | open | — |
| Reboot | `<a>` gets a default color and underline through `--bs-link-opacity`; `<hr>` styled through `border-top`/`opacity: .25`, inherits `border-color` from `color` | option | Content/layout | open | — |
| Reboot | `<ul>`/`<ol>`/`<dl>` remove `margin-top`, set `margin-bottom: 1rem`, nested lists drop `margin-bottom`, `padding-left` reset; `<dd>` gets `margin-left: 0`+`margin-bottom: .5rem`; `<dt>` bolded | option | Content/layout | open | — |
| Reboot | `<code>`, `<pre>`, `<var>`, `<kbd>`, `<samp>` restyled; `<table>`/`<caption>` collapse borders and set `text-align`; `<fieldset>`/`<legend>`/`<label>` restyled | option | Content/layout | open | — |
| Reboot | `<input>`/`<select>`/`<textarea>`/`<button>` remove `margin`, set `line-height: inherit`; `<textarea>` resizes vertically only; button-type elements get `cursor: pointer` when `:not(:disabled)`; `role="button"` gets `cursor: pointer` | option | Content/layout | open | — |
| Reboot | `<address>` resets `font-style: normal`, inherits `line-height`, sets `margin-bottom: 1rem`; `<blockquote>` sets `margin: 0 0 1rem`; `<summary>` resets `cursor` from `text` to `pointer` | option | Content/layout | open | — |
| Reboot | `<a>` with no `href` resets `color`/`text-decoration` to default | accessibility | Content/layout | open | — |
| Reboot | `[hidden]` forces `display: none !important` | dismissal | Content/layout | open | — |
| Reboot | `--bs-heading-color`, `--bs-link-opacity`, `--bs-body-font-family`, `--bs-body-font-size`, `--bs-body-font-weight`, `--bs-body-line-height`, `--bs-body-text-align`, `--bs-body-color`, `--bs-body-color-rgb`, `--bs-body-bg`, `--bs-body-bg-rgb`, `--bs-emphasis-color`, `--bs-emphasis-color-rgb`, `--bs-secondary-color`, `--bs-secondary-color-rgb`, `--bs-secondary-bg`, `--bs-secondary-bg-rgb`, `--bs-tertiary-color`, `--bs-tertiary-color-rgb`, `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb` | variable | Content/layout | open | — |
| util/backdrop.js | `NAME` `'backdrop'`; `Default` `{ className: 'modal-backdrop', clickCallback: null, isAnimated: false, isVisible: true, rootElement: 'body' }` | option | Overlays/feedback | open | — |
| util/backdrop.js | `show`/`hide` no-op-execute the callback when `!isVisible`; `dispose`; mousedown on the element runs `clickCallback`; adds `fade` if animated, adds/removes `show` | method | Overlays/feedback | open | — |
| util/backdrop.js | Constructed by Modal and Offcanvas | initialization | Overlays/feedback | open | — |
| util/focustrap.js | `NAME` `'focustrap'`; `DATA_KEY` `'bs.focustrap'`; `Default` `{ autofocus: true, trapElement: null }` | option | Overlays/feedback | open | — |
| util/focustrap.js | `activate` no-op if already active, focuses `trapElement` if `autofocus`, listens document `focusin` + `keydown.tab`; `deactivate` no-op if inactive; `_handleKeydown` records Tab direction; `_handleFocusin` refocuses first/last focusable child or the trap | method | Overlays/feedback | open | — |
| util/focustrap.js | Constructed by Modal and Offcanvas with `{ trapElement: this._element }` | initialization | Overlays/feedback | open | — |
| util/scrollbar.js | No `Config`; `constructor()` uses `document.body`; public `getWidth()`, `hide()`, `reset()`, `isOverflowing()`; targets `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`; saves overflow/padding/margin through `Manipulator.setDataAttribute` | method | Overlays/feedback | open | — |
| util/scrollbar.js | Constructed by Modal (`this._scrollBar`) and by Offcanvas when `!scroll` | initialization | Overlays/feedback | open | — |
| util/swipe.js | `NAME` `'swipe'`; `EVENT_KEY` `.bs.swipe`; `Default` `{ endCallback: null, leftCallback: null, rightCallback: null }` | option | Overlays/feedback | open | — |
| util/swipe.js | `constructor(element, config)` returns if `!element \|\| !Swipe.isSupported()`; `dispose` unbinds `.bs.swipe`; static `isSupported()` checks `ontouchstart`/`maxTouchPoints > 0`; threshold `40`; class `pointer-event` when pointer | method | Overlays/feedback | open | — |
| util/swipe.js | Constructed by Carousel | initialization | Overlays/feedback | open | — |
| util/sanitizer.js | `sanitizeHtml(unsafeHtml, allowList, sanitizeFunction)`; URI attributes checked against `SAFE_URL_PATTERN` forbidding `javascript:`; a function `sanitizeFunction` overrides sanitization | method | Overlays/feedback | open | — |
| util/sanitizer.js | Global allowlist: `class`, `dir`, `id`, `lang`, `role`, `aria-*`; per-tag allowances documented for `a` and `img`; the allowlist is mutable through `bootstrap.Tooltip.Default.allowList` | accessibility | Overlays/feedback | open | — |
| util/template-factory.js | `NAME` `'TemplateFactory'`; `Default`/`DefaultType`/`DefaultContentType` for `allowList`, `content`, `extraClass`, `html`, `sanitize`, `sanitizeFn`, `template`, `entry`, `selector`; public `getContent`, `hasContent`, `changeContent`, `toHtml` | method | Overlays/feedback | open | — |
| util/template-factory.js | Constructed by Tooltip (`_getTemplateFactory`); inherited by Popover | initialization | Overlays/feedback | open | — |
| util/config.js | Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory` | option | U7 Button | accepted scope | — |
| util/component-functions.js | `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]`; used by Alert (`'close'`), Modal, Offcanvas, Toast (default `'hide'`) | attribute | Overlays/feedback | open | decided by builder: used exclusively by the Overlays/feedback dismiss-trigger components |
| util/index.js | `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities | method | U7 Button | accepted scope | decided by builder: shared DOM/type helpers belong with the BaseComponent engine family |
| util/index.js | `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded` | initialization | U7 Button | accepted scope | decided by builder: shared DOM/type helpers belong with the BaseComponent engine family |
| Auto-initialization | Every `defineJQueryPlugin` call gates on `onDOMContentLoaded`, which fires immediately if `document.readyState !== 'loading'` else on `DOMContentLoaded` | initialization | Cross-cutting | open | — |
| Auto-initialization | No component file calls `onDOMContentLoaded` except through `defineJQueryPlugin` | initialization | Cross-cutting | open | — |

## Exclusions

| Row | Reason |
| --- | --- |
| `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `` a > code ``, `kbd kbd`, `legend + *` (the eight `reboot` selectors that combine two or more bare element names through a combinator with no class) | Contextual Reboot rule pairing two bare tags; the product decision infers no component from tag combinations |
| `jQueryInterface` and every `$.fn` row | jQuery integration is outside the compatibility claim |
| `window.bootstrap` and the UMD global | The global namespace is outside the compatibility claim |
| Every Sass variable, map, and mixin row the documentation lists (`$alert-*`, `button-variant()`, `color-mode()` as a Sass API) | Bootstrap's Sass source API is outside the compatibility claim; the `data-bs-theme` island behavior it compiles to stays in `U3 Tokens` |
| `popperConfig`, `boundary`, `reference`, `display`, `fallbackPlacements`, `offset` options as Popper pass-through | Popper is development-only; the owning unit accepts the key on the wire body and positions through platform anchoring, recorded as an accepted difference |

`allowList`, `sanitize`, and `sanitizeFn` are not excluded: `Overlays/feedback` owns the
`Sanitizer` utility and its obligation rows.

## Accepted scope

The rows marked `accepted scope`, all under `U7 Button`.

### CSS row

| Root | Unit | Status |
| --- | --- | --- |
| `btn` | U7 Button | accepted scope |

### Obligation rows

| Component | Obligation | Kind |
| --- | --- | --- |
| Cross-cutting engine | `VERSION` `'5.3.8'`; `DATA_KEY` `` `bs.${NAME}` ``; `EVENT_KEY` `` `.${DATA_KEY}` ``; `eventName(name)` returns `` `${name}${EVENT_KEY}` `` | identity |
| Cross-cutting engine | `Default`/`DefaultType` inherited empty from `Config` unless a component overrides | option |
| Cross-cutting engine | `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last | attribute |
| Cross-cutting engine | `constructor(element, config)` no-op when `getElement(element)` is falsy; `dispose()`; `_queueCallback` through `executeAfterTransition` | method |
| Cross-cutting engine | static `getInstance`, static `getOrCreateInstance(element, config = {})`, static `VERSION` | method |
| Cross-cutting engine | `Data.set(this._element, DATA_KEY, this)` on construction | initialization |
| Cross-cutting engine | All API methods are asynchronous, return to the caller before the transition ends, and a method call mid-transition is ignored | method |
| Cross-cutting engine | `dispose()` must not follow `hide()` immediately; wait for the completion event | method |
| Cross-cutting engine | Every plugin fires paired infinitive/past-participle events; `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` and hydrates the payload | event |
| Cross-cutting engine | Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels | event |
| Cross-cutting engine | `Config._mergeConfigObj`: `Default`, then `data-bs-config` JSON, then `getDataAttributes`, then the `config` object; `_typeCheckConfig` type-checks against `DefaultType` | option |
| Cross-cutting engine | `Manipulator.getDataAttributes` reads every `dataset` key starting `bs` except `bsConfig`, kebab-cased through `data-bs-*` | attribute |
| Cross-cutting engine | `SelectorEngine.getSelector` reads `data-bs-target` else `href`; `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getElementFromSelector`, `getMultipleElementsFromSelector` | method |
| Cross-cutting engine | `Data.set`/`get`/`remove`; one instance per element, a second key logs an error and returns | method |
| Cross-cutting engine | `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]` | attribute |
| Cross-cutting engine | `TRANSITION_END` emulation: listens `transitionend`, emulates after `getTransitionDurationFromElement` plus `5` ms padding through `executeAfterTransition` | transition |
| Cross-cutting engine | Sanitizer allowlist and `sanitizeFn` override on Tooltip/Popover content | accessibility |
| Cross-cutting engine | Native `querySelector`/`querySelectorAll`; a CSS special character in a selector must be escaped | attribute |
| Button | `NAME` `'button'`; `DATA_KEY` `'bs.button'`; `EVENT_KEY` `.bs.button`; no `Default`/`DefaultType` | identity |
| Button | `[data-bs-toggle="button"]` document `click.bs.button.data-api`, `preventDefault`, `getOrCreateInstance` then `toggle()` | attribute |
| Button | `toggle()` flips class `active` and `aria-pressed`; no no-op guard | method |
| Button | static `jQueryInterface` runs only when `config === 'toggle'` | method |
| Button | `defineJQueryPlugin(Button)` | initialization |
| Button | Screen readers announce a toggle button as `button`/`button pressed`, not as a checkbox | accessibility |
| Button | Disabled `<a>` needs `.disabled`, `aria-disabled="true"`, and `tabindex="-1"`; `role="button"` required on `<a>` used as a button | accessibility |
| Button | `--bs-btn-*` variable set (padding, font, color, background, border, box-shadow, disabled and active states) | variable |
| util/config.js | Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory` | option |
| util/index.js | `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities | method |
| util/index.js | `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded` | initialization |

## Unassigned

| Root | Reason |
| --- | --- |
